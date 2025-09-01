import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.SECRET_KEYSTRIPE as string)

export async function POST(req: NextRequest) {
    try {
        
        const body = await req.json();
        const { products } = body;
    
        
        if (!products || !Array.isArray(products)) {
          return NextResponse.json(
            { error: "Products array is required" },
            { status: 400 }
          );
        }
    
        
        const line_items = products.map((product) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              images: [product.image],
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: product.quantity || 1,
        }));
    
        
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items,
          mode: "payment",
          success_url: `${process.env.BASE_URL}/success`,
          cancel_url: `${process.env.BASE_URL}/cancel`,
        });
    
        
        return NextResponse.json({ id: session.id, url: session.url });
      } catch (error) {
        console.error("Stripe checkout error:", error);
        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
        );
    }
}