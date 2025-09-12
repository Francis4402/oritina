import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetOrders, PostOrder } from "@/services/Orders";

export default async function Success({ searchParams }: { searchParams: { session_id?: string } }) {
  
  const searchparam = await searchParams;
  
  const sessionId = searchparam.session_id;
  let orders: any[] = [];

  if (sessionId) {
    await PostOrder(sessionId);
    orders = await GetOrders();
  }

  if (!orders || orders.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">No orders found.</div>;
  }

  return (
    <div className="flex items-center justify-center my-20">
      <Card className="max-w-xl w-full">
        <CardHeader>
          <CardTitle>Your Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.map((order: any) => (
            <div key={order.id} className="mb-6 border-b pb-4">
              <div><strong>Order ID:</strong> {order.id}</div>
              <div><strong>Total Paid:</strong> ${(order.total / 100).toFixed(2)}</div>
              <div><strong>Shipping:</strong> ${(order.shipping / 100).toFixed(2)}</div>
              <div><strong>Tax:</strong> ${(order.tax / 100).toFixed(2)}</div>
              <div><strong>Products:</strong>
                <ul className="list-disc ml-6">
                  {JSON.parse(order.products).map((item: any, idx: number) => (
                    <li key={idx}>
                      {item.name} x {item.quantity} (${item.price} each)
                    </li>
                  ))}
                </ul>
              </div>
              <div><strong>Order:</strong> {(order.order)}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}