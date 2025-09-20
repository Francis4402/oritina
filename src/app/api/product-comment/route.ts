import { db } from "@/db/db";
import { productCommentTable } from "@/db/schema";
import { NextResponse } from "next/server";



export async function GET() {
    try {
        const comment = await db.select().from(productCommentTable);

        return NextResponse.json(comment);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }
}