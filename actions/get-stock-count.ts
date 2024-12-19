import prismadb from "@/lib/prismadb";

export const getStockCount = async () => {
  const stockCount = await prismadb.product.count({
    where: {
      isArchived: false, // Count only non-archived products
    },
  });

  return stockCount;
};
