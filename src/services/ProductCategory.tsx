"use server"


import { category } from "@/app/types/Types";
import { revalidateTag } from "next/cache";


const baseurl = process.env.BASE_URL;

export const getProductCategory = async () => {
    try {
        const res = await fetch(`${baseurl}/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
            next: {
                tags: ['category']
            }
        });

        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export const createProductCategory = async (categories: category) => {
    try {
        const res = await fetch(`${baseurl}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categories),
            cache: 'no-store',
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error);
        }

        revalidateTag('category');

        return data;
    } catch (error) {
        console.log(error);
    }
}


export const deleteProductCategory = async (id: string) => {
    try {
        const res = await fetch(`${baseurl}/categories/${id}`, {
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

        revalidateTag('category');

        return data;
    } catch (error) {
        console.log(error);
    }
}