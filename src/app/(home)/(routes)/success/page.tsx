"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PostOrder, GetOrders } from "@/services/Orders";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Download, Printer, Truck, Home, Calendar, DollarSign, Package, Circle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Success = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleOrder = async () => {
      if (sessionId) {
        await PostOrder(sessionId);
        const userOrders = await GetOrders();
        setOrders(userOrders);
      }
      setLoading(false);
    };
    handleOrder();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 w-64 mx-auto mb-2" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          
          <Skeleton className="h-8 w-40 mb-6" />
          
          {[1, 2].map((item) => (
            <Card key={item} className="mb-6">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Skeleton className="h-4 w-20 mb-1" />
                    <Skeleton className="h-5 w-28" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-20 mb-1" />
                    <Skeleton className="h-5 w-28" />
                  </div>
                </div>
                
                <div>
                  <Skeleton className="h-4 w-16 mb-2" />
                  <div className="space-y-3">
                    {[1, 2].map((item) => (
                      <div key={item} className="flex justify-between items-start border-b pb-3">
                        <div className="flex gap-3">
                          <Skeleton className="h-16 w-16 rounded-md" />
                          <div className="space-y-1">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                        </div>
                        <Skeleton className="h-5 w-16" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>No orders found</CardTitle>
            <CardDescription>
              We couldn't find any orders associated with your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Thank you for your purchase. Your order has been confirmed and is
            being processed.
          </p>
          <p className="text-sm text-gray-500 mt-3">
            Order confirmation email has been sent to your email address.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Package className="h-6 w-6" />
          Your Orders
        </h2>

        {/* Map through all orders */}
        {orders.map((order) => (
          <Card key={order.id} className="mb-8 overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <CardTitle className="text-xl">Order #{order.id}</CardTitle>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 px-3 py-1">
                    <Circle className="h-4 w-4 mr-1" />
                    {order.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
                    <p className="font-semibold">
                      {new Date(order.createdAt || Date.now()).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
                    <p className="font-semibold">${(order.total / 100).toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />
              
              <h3 className="text-lg font-medium text-gray-900 mb-4">Items</h3>
              <div className="space-y-4">
                {JSON.parse(order.products).map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between items-start pb-4 last:pb-0"
                  >
                    <div className="flex gap-4">
                      <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-100">
                        <Image 
                          src={item.image} 
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm">Size: {item.size}</p>
                        <p className="text-sm">Color: {item.color}</p>
                        <p className="text-sm">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    ${((order.total - order.shipping - order.tax) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">${(order.shipping / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-medium">${(order.tax / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t">
                  <span>Total</span>
                  <span>${(order.total / 100).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>

            {/* Delivery Information for each order */}
            <div className="px-6 py-4 border-t">
              <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                <Truck className="h-5 w-5" />
                Delivery Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Shipping Address
                  </h4>
                  <p className="font-medium">{order.shippingAddress}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Estimated Delivery
                  </h4>
                  <p className="font-medium">3-5 business days</p>
                  <p className="text-sm text-gray-600 mt-1">
                    You will receive a tracking number once your order ships.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print Receipt
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Invoice
          </Button>
          <Button asChild className="flex items-center gap-2">
            <Link href="/shop">
              <Home className="h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;