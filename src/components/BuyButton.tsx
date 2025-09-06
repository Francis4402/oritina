'use client'

import { CreditCard, Loader2 } from 'lucide-react'

import { useState } from 'react'
import { CartItem } from '@/lib/store'
import { paymentService } from '@/services/Payment'
import { toast } from 'sonner'
import { Button } from './ui/button'

const BuyButton = ({ cart }: { cart: CartItem[] }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const data = await paymentService(cart)

      console.log(data);

      if (data && data.url) {
        toast.success('Redirecting to checkout...')
        
        // window.location.href = data.url;
      } else {
        toast.error("No checkout URL found. Please try again.")
      }
    } catch (error: any) {
      console.error('Checkout error:', error)
      toast.error(error.message || 'Error processing checkout. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      onClick={handleCheckout} 
      disabled={isLoading || cart.length === 0}
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