import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GetOrders, PostOrder } from "@/services/Orders";
import { CheckCircle, Download, Printer, Clock, Truck, Home } from "lucide-react";
import Link from "next/link";

export default async function Success({ searchParams }: { searchParams: { session_id?: string } }) {
  const searchparam = await searchParams;
  const sessionId = searchparam.session_id;
  let orders: any[] = [];

  if (sessionId) {
    await PostOrder(sessionId);
    orders = await GetOrders();
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="text-center max-w-md">
          <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Processing Your Order</h1>
          <p className="text-gray-600 mb-6">
            Your payment was successful but we're still processing your order details. 
            Please check back in a few moments.
          </p>
          <Button asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been confirmed and is being processed.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Order confirmation email has been sent to your email address.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Orders</h2>
        
        {/* Map through all orders */}
        {orders.map((order) => (
          <Card key={order.id} className="mb-6">
            <CardHeader className="pb-4">
              <CardTitle className="flex justify-between items-center">
                <span>Order #{order.id}</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Confirmed
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
                  <p className="font-semibold">{new Date(order.createdAt || Date.now()).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
                  <p className="font-semibold">${(order.total / 100).toFixed(2)}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Items</h3>
                <div className="space-y-3">
                  {JSON.parse(order.products).map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-start border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${((order.total - order.shipping - order.tax) / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${(order.shipping / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(order.tax / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>${(order.total / 100).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>

            {/* Delivery Information for each order */}
            <CardHeader className="pb-4 border-t">
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Shipping Address</h3>
                  <p className="font-medium">{order.shippingAddress}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Estimated Delivery</h3>
                  <p className="font-medium">3-5 business days</p>
                  <p className="text-sm text-gray-600">You will receive a tracking number once your order ships.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print Receipt
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Invoice
          </Button>
          <Button asChild>
            <Link href="/shop" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}