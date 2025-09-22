"use server"

import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";



const baseUrl = process.env.BASE_URL;


export const getAllBlogComments = async () => {
    try {
        const res = await fetch(`${baseUrl}/comment`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                tags: ['comment']
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

export const postblogcomment = async (data: { comment: string; blogId: string }) => {
    try {
        const session = await getServerSession(authOptions);

        const res = await fetch(`${baseUrl}/comment/${data.blogId}`, {
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

        revalidateTag('comment');

        return await res.json();

    } catch (error) {
        console.log(error);
    }
}

export const getblogComments = async (id: string) => {
    try {
        const res = await fetch(`${baseUrl}/comment/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
            next: {
                tags: ['comment']
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

export const deleteblogComment = async (id: string) => {
    try {
        
        const res = await fetch(`${baseUrl}/comment/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        revalidateTag('comment');
        return res.json();
    } catch (error) {
        console.log(error);
    }
}