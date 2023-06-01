import NextLink from "next/link";
import type { Order } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge, Button } from "../ui/primitives";
import { formatPriceToActualCurrency } from "@/helpers/currency";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => <p className="text-gray-400">{row.getValue("id")}</p>,
  },

  {
    accessorKey: "numberOfItems",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            className="text-gray-200 hover:bg-transparent hover:text-blue-400"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Products
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium text-gray-400">
          {row.getValue("numberOfItems")}
        </p>
      );
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            className="text-gray-200 hover:bg-transparent hover:text-blue-400"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const total = parseFloat(row.getValue("total"));
      const formatted = formatPriceToActualCurrency(total);

      return (
        <p className="text-center font-medium text-gray-400">{formatted}</p>
      );
    },
  },
  {
    accessorKey: "isPaid",
    header: () => <p className="text-center">Paid</p>,
    cell: ({ row }) => {
      const order = row.original;
      return (
        <p className="text-center">
          {" "}
          {order.isPaid ? (
            <Badge
              variant="default"
              className="bg-emerald-700 text-white hover:bg-emerald-700 hover:text-white"
            >
              YES
            </Badge>
          ) : (
            <Badge
              variant="default"
              className="bg-red-900 text-white hover:bg-red-600 hover:text-white"
            >
              NO
            </Badge>
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <p className="text-center">Status</p>,
    cell: ({ row }) => {
      const order = row.original;
      return (
        <p className="text-center">
          {" "}
          {order.status === "PENDING" ? (
            <Badge className="bg-yellow-400 text-zinc-800  hover:bg-yellow-400 hover:text-zinc-800">
              {order.status}
            </Badge>
          ) : (
            <Badge className="bg-emerald-700 text-white hover:bg-emerald-700 hover:text-white">
              {order.status}
            </Badge>
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "view",
    header: "View",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <NextLink className="text-blue-400" href={`/orders/${order.id}`}>
          View Order
        </NextLink>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-gray-200 hover:bg-transparent hover:text-blue-400"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-left font-medium text-gray-400">
          {new Date(row.getValue("createdAt")).toLocaleString()}
        </p>
      );
    },
  },
];
