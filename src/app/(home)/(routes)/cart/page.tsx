"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  Tag,
  Truck,
  Shield,
  Heart,
  Star,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import Image from 'next/image'
import { toast } from 'sonner'
import BuyButton from '@/components/BuyButton'

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getSubtotal,
    getTax,
    getShipping,
    getPromoDiscount,
    getTotal,
    getFreeShippingProgress,
    getAmountToFreeShipping,
    getTotalItems
  } = useCartStore()

  // Calculate values from the store
  const subtotal = getSubtotal()
  const tax = getTax()
  const shipping = getShipping()
  const promoDiscount = getPromoDiscount()
  const total = getTotal()
  const freeShippingProgress = getFreeShippingProgress()
  const amountToFreeShipping = getAmountToFreeShipping()
  const totalItems = getTotalItems()


  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ))
  }

  const handleQuantityChange = (id: string, newQuantity: number, selectedColor?: string, selectedSize?: string) => {
    if (newQuantity === 0) {
      removeFromCart(id, selectedColor, selectedSize)
      toast.success('Item removed from cart')
    } else {
      updateQuantity(id, newQuantity, selectedColor, selectedSize)
    }
  }

  const handleRemoveItem = (id: string, name: string, selectedColor?: string, selectedSize?: string) => {
    removeFromCart(id, selectedColor, selectedSize)
    toast.success(`${name} removed from cart`)
  }

  const handleClearCart = () => {
    clearCart()
    toast.success('Cart cleared')
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-xl text-gray-600 mb-8">Add some items to get started!</p>
            <Link href="/shop">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 2xl:px-16 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <Link href="/">
                <Button size="lg" className="mb-4">
                  <ArrowLeft className="h-5 w-5 mr-3" />
                  Continue Shopping
                </Button>
              </Link>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
              <p className="text-xl text-gray-600">{totalItems} items • ${subtotal.toFixed(2)} subtotal</p>
            </div>
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleClearCart}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          </div>

          {/* Progress Bar for Free Shipping */}
          <Card>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Free shipping progress</span>
                <span className="text-sm text-blue-600">
                  {subtotal >= 75 ? 'Free shipping unlocked! 🎉' : `$${amountToFreeShipping.toFixed(2)} to go`}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {/* Cart Items */}
          <div className="xl:col-span-3 2xl:col-span-3 space-y-6">
            {/* Table Header for Desktop */}
            <Card className="hidden lg:block">
              <CardHeader className="p-6 pb-4">
                <div className="grid grid-cols-12 gap-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="p-0">
                <div>
                  {cart.map((item) => (
                    <div 
                      key={`${item.id}-${item.selectedColor || 'no-color'}-${item.selectedSize || 'no-size'}`} 
                      className="grid grid-cols-12 gap-6 p-6 items-center"
                    >
                      <div className="col-span-6 flex items-center gap-4">
                        <div className="relative">
                          <Image
                            src={item.productImage[0]}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="w-20 h-20 object-cover rounded-xl shadow-sm"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg text-gray-900 mb-1">{item.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {renderStars(4.7)}
                            </div>
                            <span className="text-sm text-gray-500">(67)</span>
                          </div>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                            {item.selectedSize && (
                              <span className='flex gap-1'>Size: <span className='uppercase font-medium'>{item.selectedSize}</span></span>
                            )}
                            {item.selectedColor && (
                              <span className="flex items-center gap-1">
                                Color: 
                                <div 
                                  className="w-4 h-4 rounded-full border"
                                  style={{ backgroundColor: item.selectedColor }}
                                  title={item.selectedColor}
                                />
                                <span className="font-medium">{item.selectedColor}</span>
                              </span>
                            )}
                          </div>
                          <div className="flex gap-3 mt-3">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0 h-auto">
                              <Heart className="h-3 w-3 mr-1" />
                              Save
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500 hover:text-red-700 p-0 h-auto"
                              onClick={() => handleRemoveItem(item.id, item.name, item.selectedColor, item.selectedSize)}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 text-center">
                        <div className="font-semibold text-lg">${item.price.toFixed(2)}</div>
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <div className="flex items-center gap-2 rounded-lg p-1">
                          <Button 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input 
                            value={item.quantity} 
                            className="w-12 h-8 text-center border-0" 
                            readOnly
                          />
                          <Button 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="col-span-2 text-right">
                        <div className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {cart.map((item) => (
                <Card key={`${item.id}-${item.selectedColor || 'no-color'}-${item.selectedSize || 'no-size'}`} className="overflow-hidden shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative">
                        <Image
                          src={item.productImage[0]}
                          alt={item.name}
                          width={96}
                          height={96}
                          sizes='(max-width: 768px) 100vw, 33vw'
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <div className="flex flex-col gap-2 text-sm text-gray-500 mt-2">
                              {item.selectedSize && (
                                <div className='flex items-center gap-2'>
                                  <span className='font-medium'>Size:</span> 
                                  <Badge variant="outline" className="uppercase">{item.selectedSize}</Badge>
                                </div>
                              )}
                              {item.selectedColor && (
                                <div className='flex items-center gap-2'>
                                  <span className='font-medium'>Color:</span> 
                                  <div 
                                    className="w-6 h-6 rounded-full border"
                                    style={{ backgroundColor: item.selectedColor }}
                                    title={item.selectedColor}
                                  />
                                  <span className="font-medium">{item.selectedColor}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveItem(item.id, item.name, item.selectedColor, item.selectedSize)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="font-semibold text-lg">${item.price.toFixed(2)}</div>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input value={item.quantity} className="w-16 text-center" readOnly />
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total: ${(item.price * item.quantity).toFixed(2)}</span>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                            <Heart className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="xl:col-span-1 2xl:col-span-2">
            <div className="sticky top-8 space-y-6">
              {/* Promo Code */}
              <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Tag className="h-5 w-5" />
                    Promo Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {promoDiscount > 0 ? (
                    <div className="flex items-center justify-between p-4 rounded-xl border ">
                      <div>
                        <Badge variant="secondary" className="mb-2 text-green-800">SAVE10</Badge>
                        <p className="text-sm text-green-700 font-medium">10% discount applied!</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 text-center">
                      Add promo code at checkout
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg">
                      <span>Subtotal ({totalItems} items)</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-2">
                        Shipping
                      </span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    {promoDiscount > 0 && (
                      <div className="flex justify-between text-green-600 font-medium">
                        <span>Promo discount</span>
                        <span>-${promoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Checkout Buttons */}
              <div className="space-y-4">
                <BuyButton cart={cart} total={total} />
                <Link href="/">
                  <Button variant="outline" size="lg" className="w-full">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <Card>
                <CardContent>
                  <h3 className="font-semibold mb-4 text-center">Why Shop With Us?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Shield className="h-4 w-4 text-green-600" />
                      </div>
                      <span>Secure checkout with SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Truck className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>Free shipping on orders over $75</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <Heart className="h-4 w-4 text-red-600" />
                      </div>
                      <span>30-day hassle-free returns</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage