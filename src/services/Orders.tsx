"use server"

import { authOptions } from "@/app/utils/authOptions"
import { getServerSession } from "next-auth"
import { revalidateTag } from "next/cache";

export const getAllOrders = async () => {
    try {
        const session = await getServerSession(authOptions);

        const res = await fetch(`${process.env.BASE_URL}/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.accessToken}`
            },
            cache: "no-store",
            next: {tags: ['orders']}
        });

        return res.json();
    } catch (error) {
        console.log(error);
    }
}

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
            next: {
                tags: ['orders']
            }
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

        revalidateTag('orders');

        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}


export const UpdateOrderStatus = async (id: string, status: string) => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/order/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, status }),
            cache: 'no-store',
        });

        revalidateTag('orders');

        if (!response.ok) {
            throw new Error('Failed to update order status');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const deleteOrder = async (id: string) => {
    try {
        const session = await getServerSession(authOptions);

        const res = await fetch(`${process.env.BASE_URL}/order/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.accessToken}`
            },
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error);
        }

        revalidateTag('orders');

        return data;

    } catch (error) {
        console.log(error);
    }
}