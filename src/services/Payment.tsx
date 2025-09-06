"use server"


import { CartItem } from "@/lib/store";


export const paymentService = async (cart: CartItem[]) => {
  try {

    
    const res = await fetch('http://localhost:3000/api/create-payment-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify({ cart }),
    })

    const data = await res.json();

    return data;
} catch (error) {
    console.log(error);
}
}