import { db } from "@/db/db";
import { usersTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface MyJwtPayload extends JwtPayload {
    role: string;
    userId: string;
}

export async function GET(req: NextRequest) {
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

        if (decoded.role !== "Admin") {
            return NextResponse.json(
                { error: "Forbidden: Only admins can create projects" },
                { status: 403 }
            );
        }
    
        const users = await db.select().from(usersTable);

        return NextResponse.json(users, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}