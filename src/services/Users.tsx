"use server"

import { authOptions } from "@/app/utils/authOptions"
import { getServerSession } from "next-auth"


export const getAllUsers = async () => {
    try {

        const session = await getServerSession(authOptions);

        const res = await fetch(`${process.env.BASE_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.accessToken}`
            },
            cache: "no-store",
            next: {tags: ['users']}
        });

        return res.json();
    } catch (error) {
        console.log(error);
    }
}

