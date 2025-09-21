import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { orderTable } from "@/db/schema";

export async function GET(req: NextRequest) {

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

    const order = await db.select().from(orderTable).where(eq(orderTable.userId, userId))
    
    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not fetch order" }, { status: 500 });
  }
}