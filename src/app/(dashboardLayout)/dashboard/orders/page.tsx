import { TOrder } from "@/app/types/Types";
import { GetOrders } from "@/services/Orders";
import OrderTable from "./OrderTable";


const Orders = async () => {

    const orders: TOrder[] = await GetOrders();

  return (
    <div>
        <OrderTable orders={orders} />
    </div>
  )
}

export default Orders