import { db } from "@/db/db";
import { productsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";



export async function GET() {
    try {
        const products = await db.select().from(productsTable);

        return NextResponse.json(products);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const existingProduct = await db.select().from(productsTable).where(eq(productsTable.name, body.name))

        if (existingProduct.length > 0) {
            return NextResponse.json(
                { error: 'Product already exists' },
                { status: 400 }
            )
        }

        const newProduct = await db.insert(productsTable).values({
            name: body.name,
            description: body.description,
            price: body.price,
            productImage: body.productImage,
            category: body.category,
            producttype: body.producttype,
            color: body.color,
            totalRating: body.totalRating || "0",
            reviews: body.reviews || "0",
            createdAt: new Date(),
            updatedAt: new Date()
        }).returning();

        return NextResponse.json(newProduct, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}