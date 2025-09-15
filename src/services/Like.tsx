"use server"

import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";


const baseUrl = process.env.BASE_URL;
export const postLike = async (id: string) => {
    try {
        const session = await getServerSession(authOptions);

        const res = await fetch(`${baseUrl}/like/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.accessToken}`
            },
            cache: 'no-store',
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Failed to create post');
        }

        revalidateTag('like');

        return data;
    } catch (error) {
        console.log(error);
    }
}


export const getLikes = async () => {
    try {
        const res = await fetch(`${baseUrl}/like`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',                
            },
            cache: 'no-store',
            next: { tags: ['like'] }
        });

        if (!res.ok) {
            throw new Error('Failed to fetch likes');
        }

        const data = await res.json();
        return data.likes;
    } catch (error) {
        console.log(error);
    }
}