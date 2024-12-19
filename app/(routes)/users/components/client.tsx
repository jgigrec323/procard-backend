"use client";
import { Separator } from "@/components/ui/separator";
import { columns, UserColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ProductClientProps {
  data: UserColumn[];
}

const UserClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Users (${data.length})`}
          description="Manage users for your store"
        ></Heading>
        <Button
          onClick={() => {
            router.push(`/users/new`);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator></Separator>
      <DataTable columns={columns} searchKey="name" data={data}></DataTable>
    </>
  );
};

export default UserClient;
