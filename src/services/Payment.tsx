"use server"

import { authOptions } from "@/app/utils/authOptions";
import { CartItem } from "@/lib/store";
import { getServerSession } from "next-auth";


export const paymentService = async (cart: CartItem[]) => {
  try {

    const session = await getServerSession(authOptions);

    const res = await fetch('http://localhost:3000/api/create-payment-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify({ cart }),
    })

    const data = await res.json();

    console.log(data);
} catch (error) {
    console.log(error);
}
}