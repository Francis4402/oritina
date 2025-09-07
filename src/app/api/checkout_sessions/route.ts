import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { CartItem } from '@/lib/store'
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { cart, total }: { cart: CartItem[], total: number } = await req.json();

    if (!cart || cart.length === 0) {
        return NextResponse.json(
          { error: "Cart is empty" },
          { status: 400 }
        );
    }

    const headersList = await headers()
    const origin = headersList.get('origin') || 'http://localhost:3000'

    const line_items = cart.map((item: CartItem) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description || undefined,
            images: item.productImage ? [item.productImage[0]] : undefined,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/?canceled=true`,
        metadata: {
          cart_items: JSON.stringify(cart),
        },
        custom_fields: [
          {
            key: "name",
            label: {type: "custom", custom: "Name"},
            type: "text",
          },
          {
            key: "location",
            label: {type: "custom", custom: "Delivery Location"},
            type: "text",
          }
        ],
      });

      console.log(session.url);

    return NextResponse.json({url: session.url});
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    )
  }
}