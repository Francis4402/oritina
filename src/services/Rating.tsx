"use server"

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


export const fetchRatings = async (productId: string) => {
    const response = await fetch(`/api/rating/${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: {
            tags: ['rating']
        }
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch ratings');
    }
    
    return response.json();
};

// export const calculateAverageRating = (ratings: any[]): number => {
//     if (!ratings.length) return 0;
//     const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
//     return Number((sum / ratings.length).toFixed(1));
// };

// export const getUserRating = (ratings: any[], userId: string) => {
//     return ratings.find(rating => rating.user.id === userId);
// };