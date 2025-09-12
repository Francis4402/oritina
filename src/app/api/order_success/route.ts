import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/db/db";
import { orderTable } from "@/db/schema";
import jwt from "jsonwebtoken";


export async function POST(req: NextRequest) {
  const session_id = req.nextUrl.searchParams.get("session_id");

  if (!session_id) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.AUTH_SECRET as string);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = (decoded as any).id || (decoded as any).sub;

    const stripeSession = await stripe.checkout.sessions.retrieve(session_id);

    // Get custom delivery location from Stripe custom_fields
    let shippingAddress = "";
    if (stripeSession.custom_fields && Array.isArray(stripeSession.custom_fields)) {
      const locationField = stripeSession.custom_fields.find(
        (field: any) => field.key === "location"
      );
      shippingAddress = locationField?.text?.value || "";
    }

    const cart_items = JSON.parse(stripeSession.metadata?.cart_items || "[]");
    const total = stripeSession.amount_total || 0;
    const shipping = stripeSession.metadata?.shipping_amount
      ? Math.round(parseFloat(stripeSession.metadata.shipping_amount) * 100)
      : 0;
    const tax = stripeSession.metadata?.tax_amount
      ? Math.round(parseFloat(stripeSession.metadata.tax_amount) * 100)
      : 0;

    // Store order in DB
    const [order] = await db
      .insert(orderTable)
      .values({
        userId,
        products: JSON.stringify(cart_items),
        total,
        shipping,
        tax,
        shippingAddress,
      })
      .returning();

    return NextResponse.json({ order });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not save order" }, { status: 500 });
  }
}