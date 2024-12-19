import prismadb from "@/lib/prismadb";
import OrderClient from "./components/client";
import { OrderColumn } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

const OrdersPage = async () => {
  const orders = await prismadb.order.findMany({
    include: {
      orderItems: {
        include: {
          product: true, // Include product details from OrderItem
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.shippingAddress || "N/A", // Handle optional address
    products: order.orderItems
      .map((item) => item.product?.name || "Unknown Product") // Collect product names
      .join(", "), // Combine product names into a single string
    totalPrice: formatter.format(
      order.orderItems.reduce((total, item) => {
        return total + Number(item.product?.price || 0) * item.quantity;
      }, 0)
    ), // Calculate total price from all order items
    status: order.status, // Include the order status
    isPaid: order.isPaid,
    createdAt: format(order.createdAt, "MMMM do, yyyy"), // Format the creation date
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders}></OrderClient>
      </div>
    </div>
  );
};

export default OrdersPage;
