import { CartItem } from "@/lib/store";

export const paymentService = async (cart: CartItem[]) => {
  try {
    const res = await fetch('http://localhost:3000/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    })

    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log('Payment service error:', error);
    throw error;
  }
}