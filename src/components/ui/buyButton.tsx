'use client'

import { CreditCard, Loader2 } from 'lucide-react'
import { Button } from './button'
import { useState } from 'react'
import { CartItem } from '@/lib/store'
import { paymentService } from '@/services/Payment'
import { toast } from 'sonner'



const BuyButton = ({ cart }: {cart: CartItem[]}) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleCheckout = async () => {
        try {
            const data = await paymentService(cart)

            if (data.status === 200) {
                toast.success('Processing checkout...')
            } else {
                toast.error('Error processing checkout. Please try again later.')
            }
            
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    if (!cart || cart.length === 0) {
        return (
            <Button disabled className='w-full'>
                <CreditCard className="mr-2 h-5 w-5" />
                Cart is Empty
            </Button>
        )
    }

    return (
        <Button 
            onClick={handleCheckout} 
            disabled={isLoading}
            className='w-full'
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                </>
            ) : (
                <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Checkout
                </>
            )}
        </Button>
    )
}

export default BuyButton