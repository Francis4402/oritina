import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { orderTable } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function PATCH(req: NextRequest) {
    try {
        
        const body = await req.json();
        
        const { id, status } = body;
        
        if (!id || !status) {
            return NextResponse.json(
                { error: "Order ID and status are required" },
                { status: 400 }
            );
        }
        
        if (status !== "Pending" && status !== "Shipped" && status !== "Delivered" && status !== "Canceled") {
            return NextResponse.json(
                {error: "Invalid status"},
                {status: 400}
            );
        }


        const updatedOrder = await db.update(orderTable).set({ status}).where(eq(orderTable.id, id)).returning();

        if (updatedOrder.length === 0) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Order status updated successfully", order: updatedOrder[0] },
            { status: 200 }
        );
        
    } catch (error) {
        console.error("rating error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}