"use server"

import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";


const baseUrl = process.env.BASE_URL;
export const postLike = async (blogId: string) => {
    try {
        const session = await getServerSession(authOptions);
        
        const res = await fetch(`${baseUrl}/like/${blogId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.accessToken}`
            },
            body: JSON.stringify({ blogId }),
            cache: 'no-store',
        });
        
        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.error || 'Failed to update like');
        }
        
        revalidateTag('like');
        
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const getLikesById = async (id: string) => {
    try {
        const res = await fetch(`${baseUrl}/like/${id}`, {
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
        return data.data;
    } catch (error) {
        console.log(error);
    }
}