"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type CardColumn = {
  id: string;
  type: string;
  status: string;
  isActivated: boolean;
  activationDate: string | null; // Nullable since cards might not be activated yet
  uniqueURL: string;
  createdAt: string;
};

export const columns: ColumnDef<CardColumn>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "isActivated",
    header: "Activated",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded ${
          row.original.isActivated
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {row.original.isActivated ? "Yes" : "No"}
      </span>
    ),
  },
  {
    accessorKey: "activationDate",
    header: "Activation Date",
    cell: ({ row }) =>
      row.original.activationDate || <span className="text-gray-500">N/A</span>,
  },
  {
    accessorKey: "uniqueURL",
    header: "Unique URL",
    cell: ({ row }) => (
      <a
        href={row.original.uniqueURL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        {row.original.uniqueURL}
      </a>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
