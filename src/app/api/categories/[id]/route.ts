import { db } from "@/db/db";
import { categoriesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";



export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const deleted = await db.delete(categoriesTable).where(
            eq(categoriesTable.id, id)
        );

        return NextResponse.json({success: true, deleted});
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}