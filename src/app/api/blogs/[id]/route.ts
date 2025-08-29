import { db } from "@/db/db";
import { blogsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({error: "No Post Id Provided"}, {status: 400})
        }

        const data = await db.select().from(blogsTable).where(
            eq(blogsTable.id, id)
        );

        return NextResponse.json({success: true, data})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to get projects' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {

        const id = req.nextUrl.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: 'No post ID provided' }, { status: 400 });
        }

        const body = await req.json();

        const updated = await db.update(blogsTable).set({
            title: body.title,
            description: body.description,
            blogImage: body.blogImage,
            blogtype: body.blogtype,
        }).where(eq(blogsTable.id, id));

        return NextResponse.json({success: true, updated});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const deleted = await db.delete(blogsTable).where(
            eq(blogsTable.id, id)
        );

        return NextResponse.json({success: true, deleted});
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}