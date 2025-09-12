import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { CartItem } from '@/app/types/Types';

export async function POST(req: NextRequest) {
  try {
    const { cart }: { cart: CartItem[] } = await req.json();

    if (!cart || cart.length === 0) {
        return NextResponse.json(
          { error: "Cart is empty" },
          { status: 400 }
        );
    }

    const headersList = await headers()
    const origin = headersList.get('origin') || 'http://localhost:3000'

    // Calculate subtotal from cart
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 75 ? 0 : 1;
    const tax = +(subtotal * 0.08).toFixed(2);
    // If you have promo discount logic, add it here
    const promoDiscount = subtotal >= 75 ? +(subtotal * 0.1).toFixed(2) : 0;
    const total = subtotal + tax + shipping - promoDiscount;

    const line_items = [
      ...cart.map((item: CartItem) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description || `Color: ${item.selectedColor || 'N/A'}, Size: ${item.selectedSize || 'N/A'}`,
            images: item.productImage && item.productImage.length > 0 ? [item.productImage[0]] : undefined,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      // Shipping line item if applicable
      ...(shipping > 0
        ? [{
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Shipping',
                description: 'Standard shipping fee',
              },
              unit_amount: Math.round(shipping * 100),
            },
            quantity: 1,
          }]
        : []),
      // Tax line item
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Tax',
            description: 'Sales tax',
          },
          unit_amount: Math.round(tax * 100),
        },
        quantity: 1,
      },
      // Promo discount as negative line item if applicable
      ...(promoDiscount > 0
        ? [{
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Promo Discount',
                description: '10% off order',
              },
              unit_amount: -Math.round(promoDiscount * 100),
            },
            quantity: 1,
          }]
        : []),
    ];

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/cart?canceled=true`,
        metadata: {
          cart_items: JSON.stringify(cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.productImage && item.productImage.length > 0 ? item.productImage[0] : null,
            color: item.selectedColor,
            size: item.selectedSize
          }))),
          total_amount: total.toFixed(2),
          shipping_amount: shipping.toFixed(2),
          tax_amount: tax.toFixed(2),
          item_count: cart.reduce((sum, item) => sum + item.quantity, 0).toString(),
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

    return NextResponse.json({url: session.url});
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}