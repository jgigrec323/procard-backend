import prismadb from "@/lib/prismadb";
import { UserForm } from "./components/user-form";

const ProductPage = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params; // Removed unnecessary `await` for `params`
  const user = await prismadb.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      cards: true,
    },
  });

  const formattedProduct = user
    ? {
        ...user,
        cards: user.cards, // Directly map `cards` from `user`
      }
    : null;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <UserForm initialData={formattedProduct}></UserForm>
      </div>
    </div>
  );
};

export default ProductPage;
