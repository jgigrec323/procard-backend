import { Product } from "@prisma/client";
import ProductClient from "./components/client";

const ProductsPage = () => {
  const formattedProducts: any = [];
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts}></ProductClient>
      </div>
    </div>
  );
};

export default ProductsPage;
