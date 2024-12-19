import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { UserColumn } from "./components/columns";
import UserClient from "./components/client";
const UsersPage = async () => {
  const users = await prismadb.user.findMany({
    include: {
      cards: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedUsers: UserColumn[] = users.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone?.toString() || "N/A",
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    cards: item.cards,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserClient data={formattedUsers}></UserClient>
      </div>
    </div>
  );
};

export default UsersPage;
