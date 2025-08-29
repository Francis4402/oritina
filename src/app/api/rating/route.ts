import { db } from "@/db/db";
import { ratingTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        const newRating = await db.insert(ratingTable).values({
            productId: body.productId,
            userId: body.userId,
            rating: body.rating,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return NextResponse.json(newRating, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}