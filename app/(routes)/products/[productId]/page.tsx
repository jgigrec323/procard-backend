import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
  });

  const colors = await prismadb.color.findMany({});
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <ProductForm colors={colors} initialData={product}></ProductForm>
      </div>
    </div>
  );
};

export default ProductPage;
