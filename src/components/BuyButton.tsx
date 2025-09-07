'use client'

import { CreditCard, Loader2 } from 'lucide-react'

import { useState } from 'react'
import { CartItem } from '@/lib/store'
import { paymentService } from '@/services/Payment'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const BuyButton = ({ cart, total }: { cart: CartItem[], total: number }) => {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const {url} = await paymentService(cart)

      if (url) {
        toast.success('Redirecting to checkout...')
        
        router.push(url)
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