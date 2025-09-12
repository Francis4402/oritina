"use server"

import { authOptions } from "@/app/utils/authOptions"
import { getServerSession } from "next-auth"

export const GetOrders = async () => {
    try {
        const session = await getServerSession(authOptions);

        const res = await fetch(`${process.env.BASE_URL}/order`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.accessToken}`
            },
            cache: 'no-store',
        });

        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export const PostOrder = async (sessionId: string) => {
    try {
        const session = await getServerSession(authOptions);

        const res = await fetch(`${process.env.BASE_URL}/order_success?session_id=${sessionId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.accessToken}`
            },
            cache: 'no-store',
        });

        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}