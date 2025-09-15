import { db } from "@/db/db";
import { likeTable } from "@/db/schema";
import { NextResponse } from "next/server";


export async function GET() {
    try {    
        const likes = await db.select().from(likeTable);

        return NextResponse.json({ likes }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}