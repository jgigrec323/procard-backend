"use client";
import { Separator } from "@/components/ui/separator";
import { columns, CardColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";

interface CardClientProps {
  data: CardColumn[]; // Data specific to cards
}

const CardClient: React.FC<CardClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Cards (${data.length})`}
          description="Manage cards associated with your users"
        />
      </div>
      <Separator />
      <DataTable columns={columns} searchKey="type" data={data} />
    </>
  );
};

export default CardClient;
