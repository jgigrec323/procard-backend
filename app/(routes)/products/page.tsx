import prismadb from "@/lib/prismadb";
import ProductClient from "./components/client";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import { ProductColumn } from "./components/columns";
const ProductsPage = async () => {
  const products = await prismadb.product.findMany({
    include: {
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    price: formatter.format(item.price.toNumber()),
    color: item.color.value,
    quantity: item.quantity.toString(), // Fixed issue with toString
    description: item.description,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts}></ProductClient>
      </div>
    </div>
  );
};

export default ProductsPage;
