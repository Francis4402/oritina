import { db } from "@/db/db";
import { ratingTable } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const rating =  db.select().from(ratingTable);

        return NextResponse.json(rating);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch rating' }, { status: 500 });
    }
}