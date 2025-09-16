import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/db/db";
import { likeTable } from "@/db/schema";
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
        const blogId = body.blogId;

        if (!blogId) {
          return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
        }


        const existingLike = await db
          .select()
          .from(likeTable)
          .where(and(eq(likeTable.userId, userId), eq(likeTable.blogId, blogId)));

        if (existingLike.length > 0) {
          
          await db.delete(likeTable).where(and(eq(likeTable.userId, userId), eq(likeTable.blogId, blogId)));
          
          const likeCount = await db
                .select()
                .from(likeTable)
                .where(eq(likeTable.blogId, blogId));

          return NextResponse.json({ liked: false, likeCount: likeCount.length });
        } else {
          
          await db.insert(likeTable).values({ 
            userId: userId, 
            blogId: blogId,
           });

          const likeCount = await db
              .select()
              .from(likeTable)
              .where(eq(likeTable.blogId, blogId));

          return NextResponse.json({ 
              liked: true, 
              likeCount: likeCount.length 
          });
        }
        
    } catch (error) {
        console.error("Like error:", error);
        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ error: "No Post Id Provided" }, { status: 400 });
    }

    const data = await db.select().from(likeTable).where(
      eq(likeTable.blogId, id)
    );

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error("Error fetching likes:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}