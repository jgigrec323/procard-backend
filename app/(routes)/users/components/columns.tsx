"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Card } from "@prisma/client";

export type UserColumn = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  cards: Card[];
};
export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "cards",
    header: "Cards",
    cell: ({ row }) => {
      const cardNames = row.original.cards.map((card) => card.type).join(", "); // Extract card names and join them
      return <span>{cardNames}</span>;
    },
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
