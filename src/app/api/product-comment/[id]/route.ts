

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { productCommentTable, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import jwt, { JwtPayload } from "jsonwebtoken";

interface MyJwtPayload extends JwtPayload {
    role: string;
    userId: string;
}


export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    
        const token = authHeader.split(" ")[1];
    
        let decoded: MyJwtPayload;

        try {
            decoded = jwt.verify(
                token,
                process.env.AUTH_SECRET as string
            ) as MyJwtPayload;
        } catch {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

    
        const userId = (decoded as any).id || (decoded as any).sub;

        const body = await req.json();
        const { productId, comment } = body;

        if (!productId) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }

        if (!comment || comment.trim().length === 0) {
            return NextResponse.json({ error: "Comment cannot be empty" }, { status: 400 });
        }

        const [newComment] = await db.insert(productCommentTable).values({
            userId: userId,
            productId: productId,
            comment: comment.trim()
        }).returning();

        return NextResponse.json({ 
            message: "Comment added successfully",
            comment: newComment 
        }, { status: 201 });
    } catch (error) {
        console.error("comment error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
        }

        const data = await db
            .select({
                id: productCommentTable.id,
                comment: productCommentTable.comment,
                createdAt: productCommentTable.createdAt,
                user: {
                    id: usersTable.id,
                    name: usersTable.name,
                    image: usersTable.image,
                    email: usersTable.email,
                }
            })
            .from(productCommentTable)
            .leftJoin(usersTable, eq(productCommentTable.userId, usersTable.id))
            .where(eq(productCommentTable.productId, id));

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error("Fetch comments error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest) {
    try {

        const authHeader = req.headers.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];

        let decoded: MyJwtPayload;
        
        try {
            decoded = jwt.verify(
                token,
                process.env.AUTH_SECRET as string
            ) as MyJwtPayload;
        } catch {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }


        const id = req.nextUrl.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({error: 'No Comment Id Provided'}, {status: 400});
        }

        const deleted = await db.delete(productCommentTable).where(eq(productCommentTable.id, id));

        return NextResponse.json({success: true, deleted});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Failed to delete comment'}, {status: 500});
    }
}