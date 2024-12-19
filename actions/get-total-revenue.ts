import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async () => {
  // Fetch all paid orders
  const paidOrders = await prismadb.order.findMany({
    where: {
      isPaid: true, // Only consider paid orders
    },
    include: {
      orderItems: {
        include: {
          product: true, // Include product details for each order item
        },
      },
    },
  });

  // Calculate total revenue
  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderRevenue = order.orderItems.reduce((itemTotal, item) => {
      const itemPrice = item.price?.toNumber() || 0; // Convert Decimal to number
      const itemQuantity = item.quantity || 1; // Ensure quantity defaults to 1
      return itemTotal + itemPrice * itemQuantity;
    }, 0);

    return total + orderRevenue;
  }, 0);

  return totalRevenue;
};
