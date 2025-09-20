import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/db/db";
import { ratingTable, usersTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function PATCH(req: NextRequest) {
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

        const body = await req.json();

        const {productId, rating} = body;

        if (!productId || rating === undefined) {
            return NextResponse.json(
                { error: "Product ID and rating are required" }, 
                { status: 400 }
            );
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { error: "Rating must be between 1 and 5" }, 
                { status: 400 }
            );
        }

        const existingRating = await db.select().from(ratingTable).where(and(eq(ratingTable.userId, userId), eq(ratingTable.productId, productId)));

        let newRating;

        if (existingRating.length > 0) {
            [newRating] = await db.update(ratingTable).set({rating: rating, updatedAt: new Date()})
            .where(and(eq(ratingTable.userId, userId), eq(ratingTable.productId, productId))).returning();
        } else {
            [newRating] = await db.insert(ratingTable).values({
                userId: userId,
                productId: productId,
                rating: rating
            }).returning();
        }

        return NextResponse.json({
            message: "Rating updated successfully",
            rating: newRating
        }, { status: 200 });

    } catch (error) {
        console.error("rating error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: "rating ID is required" }, { status: 400 });
        }

        const data = await db
            .select({
                id: ratingTable.id,
                rating: ratingTable.rating,
                createdAt: ratingTable.createdAt,
                user: {
                    id: usersTable.id,
                    name: usersTable.name,
                    image: usersTable.image,
                    email: usersTable.email,
                }
            })
            .from(ratingTable)
            .leftJoin(usersTable, eq(ratingTable.userId, usersTable.id))
            .where(eq(ratingTable.productId, id));

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error("Fetch rating error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}