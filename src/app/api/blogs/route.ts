import { db } from "@/db/db";
import { blogsTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {
        const blogs = await db.select().from(blogsTable);

        return NextResponse.json(blogs);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {

        const body = await req.json();

        const existingblog = await db.select().from(blogsTable).where(and(eq(blogsTable.title, body.title), eq(blogsTable.description, body.description)));

        if (existingblog.length > 0) {
            return NextResponse.json(
                { error: 'Blog already exists' },
                { status: 400 }
            )
        }

        const newBlog = await db.insert(blogsTable).values({
            title: body.title,
            description: body.description,
            blogImage: body.blogImage,
            blogtype: body.blogtype,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return NextResponse.json(newBlog, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
}