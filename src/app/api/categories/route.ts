import { db } from "@/db/db";
import { categoriesTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {
        const category = await db.select().from(categoriesTable);

        return NextResponse.json(category);
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const newCategory = await db.insert(categoriesTable).values({
            category: body.category,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return NextResponse.json(newCategory, {status: 201});
    } catch (error) {
        console.log(error);
    }
}