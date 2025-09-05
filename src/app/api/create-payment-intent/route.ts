import { NextRequest, NextResponse } from "next/server";
import { CartItem } from "@/lib/store";
import Stripe from "stripe";
import jwt from "jsonwebtoken";
import { db } from "@/db/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const stripe = new Stripe(process.env.SECRET_KEYSTRIPE as string);

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        let decoded: any;

        try {
            decoded = jwt.verify(
                token,
                process.env.AUTH_SECRET as string
            );
        } catch {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const data: CartItem[] = await req.json();

        if (!data || data.length === 0) {
            return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
        }

        const user = await db.select().from(usersTable).where(eq(usersTable.id, decoded.id)).limit(1);

        if (user.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const currentUser = user[0];
        let customer: Stripe.Customer;

        
        if (currentUser.id) {
            try {
                customer = await stripe.customers.retrieve(currentUser.id) as Stripe.Customer;
                
                // Check if customer was deleted
                if (customer.deleted) {
                    throw new Error('Customer deleted');
                }
            } catch (error) {
                
                customer = await stripe.customers.create({
                    email: currentUser.email,
                    name: `${currentUser.name}`,
                    metadata: {
                        userId: currentUser.id,
                    },
                });
                
            }
        } else {
            // Create new Stripe customer
            customer = await stripe.customers.create({
                email: currentUser.email,
                name: `${currentUser.name}`,
                metadata: {
                    userId: currentUser.id,
                },
            });

        }

        
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = data.map((item: CartItem) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    
                    images: item.productImage && item.productImage.length > 0 ? [item.productImage[0]] : [],
                    metadata: {
                        product_id: item.id,
                        selected_color: item.selectedColor || '',
                        selected_size: item.selectedSize || '',
                    },
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity || 1,
        }));

        // Create checkout session
        const checkoutSession = await stripe.checkout.sessions.create({
            mode: "payment",
            customer: customer.id,
            success_url: `http://localhost:3000/api/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000/api/cancel?session_id={CHECKOUT_SESSION_ID}`,
            payment_method_types: ["card"],
            line_items: lineItems,
            automatic_tax: { enabled: true },
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
            },
            metadata: {
                userId: currentUser.id,
                cartItems: JSON.stringify(data.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    selectedColor: item.selectedColor,
                    selectedSize: item.selectedSize,
                }))),
            },
        });

        console.log("Checkout session created:", checkoutSession.id);

        return NextResponse.json(
            { 
                url: checkoutSession.url, 
                sessionId: checkoutSession.id,
                customerId: customer.id
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error creating checkout session:", error);
        
        // More detailed error logging
        if (error instanceof Stripe.errors.StripeError) {
            console.error("Stripe error:", error.message);
            return NextResponse.json(
                { error: `Stripe error: ${error.message}` },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: "Failed to create checkout session" },
            { status: 500 }
        );
    }
}