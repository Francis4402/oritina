import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/db/db";
import { blogsTable, likeTable } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";


export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
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
        const blogId = params.id;

        const existingLike = await db
          .select()
          .from(likeTable)
          .where(and(eq(likeTable.userId, userId), eq(likeTable.blogId, blogId)));

        if (existingLike.length > 0) {
          // User already liked, so remove like
          await db.delete(likeTable).where(and(eq(likeTable.userId, userId), eq(likeTable.blogId, blogId)));
          await db
            .update(blogsTable)
            .set({ likes: sql`${blogsTable.likes} - 1` })
            .where(eq(blogsTable.id, blogId));
          return NextResponse.json({ liked: false });
        } else {
          // User has not liked, so add like
          await db.insert(likeTable).values({ userId, blogId });
          await db
            .update(blogsTable)
            .set({ likes: sql`${blogsTable.likes} + 1` })
            .where(eq(blogsTable.id, blogId));
          return NextResponse.json({ liked: true });
        }
        
    } catch (error) {
        console.error("Like error:", error);
        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
        );
    }
}


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
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
    const blogId = params.id;

    // Check if user liked this blog
    const userLike = await db
      .select()
      .from(likeTable)
      .where(and(eq(likeTable.userId, userId), eq(likeTable.blogId, blogId)));

    // Get total likes
    const blog = await db
      .select({ likes: blogsTable.likes })
      .from(blogsTable)
      .where(eq(blogsTable.id, blogId));

    return NextResponse.json({ 
      likes: blog[0]?.likes || 0, 
      userLiked: userLike.length > 0 
    });
  } catch (error) {
    console.error("Get likes error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}