import { db } from "@/db/db";
import { commentTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";



export async function GET() {
    try {
        const comment = await db.select().from(commentTable);

        return NextResponse.json(comment);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch comment' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const newComment = await db.insert(commentTable).values({
            userId: body.userId,
            comment: body.comment,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return NextResponse.json(newComment, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
    }
}