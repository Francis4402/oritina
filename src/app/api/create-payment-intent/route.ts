import { CartItem } from "@/lib/store";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.SECRET_KEYSTRIPE as string);

export async function POST(req: NextRequest) {
    try {
        const data: CartItem[] = await req.json();

        const customer = await stripe.customers.create({
            email: "francisleonado@gmail.com",
            address: {
                city: 'New York',
                country: 'US',
                line1: '123 Main St',
                postal_code: '12345',
                state: 'NY'
            },
            name: 'John Doe',
        });

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        product_data: {
                            name: data[0].name,
                        },
                        currency: 'usd',
                        unit_amount: data[0].price * 100
                    }
                }
            ]
        });

        console.log({checkoutSession});
        
        return NextResponse.json(
            {msg: checkoutSession, url: checkoutSession.url},
            {status: 500}
        );
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}