'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, ArrowLeft, Package } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { toast } from 'sonner'

const PaymentSuccessPage = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { clearCart } = useCartStore()
    const [sessionId, setSessionId] = useState<string | null>(null)
    const [isVerified, setIsVerified] = useState(false)

    useEffect(() => {
        const session_id = searchParams.get('session_id')
        
        if (session_id) {
            setSessionId(session_id)
            verifyPayment(session_id)
        } else {
            // Redirect to home if no session ID
            router.push('/')
        }
    }, [searchParams, router])

    const verifyPayment = async (sessionId: string) => {
        try {
            const response = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ session_id: sessionId }),
            })

            if (response.ok) {
                const data = await response.json()
                if (data.verified) {
                    setIsVerified(true)
                    clearCart() // Clear the cart after successful payment
                    toast.success('Payment successful! Your order has been confirmed.')
                }
            }
        } catch (error) {
            console.error('Error verifying payment:', error)
            toast.error('Error verifying payment. Please contact support if you were charged.')
        }
    }

    if (!sessionId) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p>Redirecting...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center pb-2">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                        Payment Successful!
                    </CardTitle>
                    <p className="text-gray-600 mt-2">
                        Thank you for your purchase. Your order has been confirmed.
                    </p>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Session ID:</span>
                            <span className="font-mono text-xs bg-white px-2 py-1 rounded">
                                {sessionId.slice(-12)}...
                            </span>
                        </div>
                        {isVerified && (
                            <div className="flex items-center justify-between text-sm mt-2">
                                <span className="text-gray-600">Status:</span>
                                <span className="text-green-600 font-medium">Verified</span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Package className="w-4 h-4" />
                            <span>You will receive an email confirmation shortly</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Package className="w-4 h-4" />
                            <span>Your order will be processed within 1-2 business days</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Link href="/orders" className="w-full">
                            <Button className="w-full">
                                <Package className="w-4 h-4 mr-2" />
                                View Orders
                            </Button>
                        </Link>
                        <Link href="/" className="w-full">
                            <Button variant="outline" className="w-full">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default PaymentSuccessPage