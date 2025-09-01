interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
  }
  
  interface CheckoutSessionResponse {
    id?: string;
    url?: string;
    error?: string;
  }
  
  export const createCheckoutSession = async (products: Product[]): Promise<CheckoutSessionResponse> => {
    try {
      const res = await fetch(`${process.env.BASE_URL}/api/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Checkout session creation error:', error);
      return { 
        error: error instanceof Error ? error.message : 'Failed to create checkout session' 
      };
    }
  }