import { TOrder } from "@/app/types/Types";
import { getAllOrders } from "@/services/Orders";
import OrderTable from "./OrderTable";


const Orders = async () => {

    const orders: TOrder[] = await getAllOrders();

  return (
    <div>
        <OrderTable orders={orders} />
    </div>
  )
}

export default Orders