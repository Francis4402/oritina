"use server"

import { RatingResponse } from "@/app/types/Types";
import { authOptions } from "@/app/utils/authOptions"
import { getServerSession } from "next-auth"
import { revalidateTag } from "next/cache";

const baseUrl = process.env.BASE_URL;

export const postRating = async (data: {ratings: number; productId: string}) => {
    try {
        const session = await getServerSession(authOptions);

        const res = await fetch(`${baseUrl}/rating/${data.productId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.accessToken}`
            },
            body: JSON.stringify({
                rating: data.ratings,
                productId: data.productId
            }),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        revalidateTag('rating');

        return await res.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const fetchRatings = async (productId: string): Promise<RatingResponse> => {
    try {
        
        const response = await fetch(`${baseUrl}/rating/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: "no-store",
            next: {
                tags: ['rating']
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch ratings`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching ratings:', error);
        
        return {
            ratings: [],
            averageRating: 0,
            totalRatings: 0,
            ratingDistribution: [0, 0, 0, 0, 0]
        };
    }
};