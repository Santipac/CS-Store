import NextLink from "next/link";
import type { Order, User } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

import { formatPriceToActualCurrency } from "@/helpers/currency";
import { ArrowUpDown } from "lucide-react";
import { Badge, Button } from "@/components/ui/primitives";

interface OrderUser extends Order {
  user: Partial<User>;
}

export const columns: ColumnDef<OrderUser>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "user",
    header: "Customer",
    cell: ({ row }) => {
      const order = row.original;

      return <p className="text-center font-medium">{order.user.email}</p>;
    },
  },

  {
    accessorKey: "numberOfItems",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Products
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
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

      return <p className="text-center font-medium">{formatted}</p>;
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
              className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
            >
              YES
            </Badge>
          ) : (
            <Badge
              variant="default"
              className="bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800"
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
            <Badge className="bg-yellow-100 text-yellow-800  hover:bg-yellow-100 hover:text-yellow-800">
              {order.status}
            </Badge>
          ) : (
            <Badge className="bg-green-100 text-green-800  hover:bg-green-100 hover:text-green-800">
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
        <NextLink className="text-blue-600" href={`/orders/${order.id}`}>
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-left font-medium">
          {new Date(row.getValue("createdAt")).toLocaleString()}
        </p>
      );
    },
  },
];
