import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { orderTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import jwt, { JwtPayload } from "jsonwebtoken";

interface MyJwtPayload extends JwtPayload {
    role: string;
    userId: string;
}

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


export async function DELETE(req: NextRequest) {
    try {

        const authHeader = req.headers.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];

        let decoded: MyJwtPayload;
        
        try {
            decoded = jwt.verify(
                token,
                process.env.AUTH_SECRET as string
            ) as MyJwtPayload;
        } catch {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        if (decoded.role !== "Admin") {
            return NextResponse.json(
                { error: "Forbidden: Only admins can create projects" },
                { status: 403 }
            );
        }

        const id = req.nextUrl.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const deleted = await db.delete(orderTable).where(
            eq(orderTable.id, id)
        );

        return NextResponse.json({success: true, deleted});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}