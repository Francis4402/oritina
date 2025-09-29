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
            cache: "no-store",
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


export const UpdateOrderStatus = async (id: string) => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/order/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Failed to update order status');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}