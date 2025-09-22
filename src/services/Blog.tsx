"use server"


import { blog } from "@/app/types/Types";
import { revalidateTag } from "next/cache";

const baseurl = process.env.BASE_URL;

export const getBlogs = async () => {
    try {
        const res = await fetch(`${baseurl}/blogs`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                tags: ['blogs']
            }
        });

        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export const getBlogsbyId = async (id: string) => {
    try {
        const res = await fetch(`${baseurl}/blogs/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            next: {
                tags: ['blogs']
            }
        });

        return res.json();
    } catch (error) {
        console.log(error);
    }
}


export const createBlog = async (blog: blog) => {
    try {
        const res = await fetch(`${baseurl}/blogs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blog),
            cache: 'no-store',
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error);
        }

        revalidateTag('blogs');

        return data;
    } catch (error) {
        console.log(error);
    }
}

export const updateBlog = async (blog: blog) => {
    try {
        const res = await fetch(`${baseurl}/blogs/${blog.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blog),
            cache: 'no-store',
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error);
        }

        revalidateTag('blogs');

        return data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteBlog = async (id: string) => {
    try {
        const res = await fetch(`${baseurl}/blogs/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error);
        }

        revalidateTag('blogs');

        return data;
    } catch (error) {
        console.log(error);
    }
}