import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { db } from "@/db/db";
import { messageTable } from "@/db/schema";
import nodemailer from "nodemailer";

interface MyJwtPayload extends JwtPayload {
    role: string;
    userId: string;
}

export async function POST(req: NextRequest){
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

        const body = await req.json();

        const newMessages = await db.insert(messageTable).values({
            name: body.name,
            phone: body.phone,
            message: body.message,
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Contact Form" <${body.email}>`,
            to: process.env.SMTP_FROM,
            subject: `New Contact Message from ${body.name}`,
            text: body.message,
            html: `
              <h3>New Message</h3>
              <p><strong>Name:</strong> ${body.name}</p>
              <p><strong>Email:</strong> ${body.email}</p>
              <p><strong>Phone:</strong> ${body.phone}</p>
              <p><strong>Message:</strong> ${body.message}</p>
            `,
        });

        return NextResponse.json(newMessages, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}