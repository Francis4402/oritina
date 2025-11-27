"use server"

import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";



const baseUrl = process.env.BASE_URL;


export const getAllProductComments = async () => {
    try {
        const res = await fetch(`${baseUrl}/product-comment`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: "no-store",
            next: {
                tags: ['productcomment']
            }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

export const postproductComment = async (data: { comment: string; productId: string }) => {
    try {
        const session = await getServerSession(authOptions);

        const res = await fetch(`${baseUrl}/product-comment/${data.productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.accessToken}`
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        revalidateTag('productcomment');

        return await res.json();

    } catch (error) {
        console.log(error);
    }
}

export const getProductComment = async (id: string) => {
    try {
        const res = await fetch(`${baseUrl}/product-comment/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
            next: {
                tags: ['productcomment']
            }
        });

        if (!res.ok) {
            throw new Error('Failed to fetch likes');
        }

        const data = await res.json();

        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteProductComment = async (id: string) => {
    try {
        const session = await getServerSession(authOptions);

        const res = await fetch(`${baseUrl}/product-comment/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.accessToken}`
            },
            cache: 'no-store'
        });

        revalidateTag('productcomment');
        return res.json();
    } catch (error) {
        console.log(error);
    }
}