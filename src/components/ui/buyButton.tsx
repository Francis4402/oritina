'use client'

import { CreditCard, Loader2 } from 'lucide-react'
import { Button } from './button'
import { useState } from 'react'
import { CartItem } from '@/lib/store'
import { toast } from 'sonner'

interface BuyButtonProps {
    cart: CartItem[]
}

const BuyButton = ({ cart }: BuyButtonProps) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleCheckout = async () => {
        try {
            setIsLoading(true)
            
            if (!cart || cart.length === 0) {
                toast.error("Cart is empty")
                return
            }

            // Get JWT token from localStorage or your auth system
            const token = localStorage.getItem('token') // Adjust based on your auth implementation
            
            if (!token) {
                toast.error("Please log in to continue")
                // Redirect to login page
                window.location.href = '/login'
                return
            }

            console.log('Creating checkout session with cart:', cart)

            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(cart), // Send cart array directly
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to create checkout session')
            }

            const { url, sessionId } = await response.json()
            
            if (!url) {
                throw new Error('No checkout URL received')
            }

            // Redirect to Stripe Checkout
            window.location.href = url

        } catch (error) {
            console.error('Checkout error:', error)
            const errorMessage = error instanceof Error ? error.message : 'Failed to start checkout'
            toast.error(errorMessage)
        } finally {
            setIsLoading(false)
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