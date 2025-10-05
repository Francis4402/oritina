"use server"

import { messageType } from "@/app/types/Types";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";


export const sendMessage = async (messages: messageType) => {
    try {
        const session = await getServerSession(authOptions);

        const res = await fetch(`${process.env.BASE_URL}/contactus`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`
            },
            body: JSON.stringify(messages),
            cache: 'no-store'
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Failed to create post');
        }

        revalidateTag('message');

        return messages;
    } catch (error) {
        console.error("Error creating messages:", error);
        throw error;
    }
}