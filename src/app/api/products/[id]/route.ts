import { db } from "@/db/db";
import { productsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({error: "No Post Id Provided"}, {status: 400})
        }

        const data = await db.select().from(productsTable).where(
            eq(productsTable.id, id)
        );

        return NextResponse.json({success: true, data});
    
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to get product' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: 'No post ID provided' }, { status: 400 });
        }

        const body = await req.json();

        const updated = await db.update(productsTable).set({
            name: body.name,
            description: body.description,
            price: body.price,
            productImage: body.productImage,
            category: body.category,
            totalRating: body.totalRating,
            reviews: body.reviews,
        }).where(eq(productsTable.id, id));

        return NextResponse.json({success: true, updated});
    
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const deleted = await db.delete(productsTable).where(
            eq(productsTable.id, id)
        );

        return NextResponse.json({success: true, deleted});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}