import Image from "next/image";
import type { Product } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/primitives/dropdown-menu";
import { Badge } from "@/components/ui/primitives/badge";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import NextLink from "next/link";
import { api } from "@/utils/api";
import { toast } from "react-hot-toast";
import { formatPriceToActualCurrency } from "@/helpers/currency";
export const columns: ColumnDef<Product>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      const { mutateAsync: deleteProduct } =
        api.product.deleteProduct.useMutation();
      const { refetch } = api.product.getProducts.useQuery();
      const onDeleteProduct = async (id: string) => {
        try {
          toast.loading("Deleting Product...", { duration: 2000 });
          await deleteProduct({ id });
          refetch();
          toast.success("Product deleted successfully");
        } catch (error) {
          toast.error("Could not delete product. Please try again");
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="font-medium text-red-500 focus:bg-red-500 focus:text-white"
              onClick={() => onDeleteProduct(product.id)}
            >
              Delete Product
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copy Product ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <NextLink href={`/products/${product.slug}`}>
                View Product Page
              </NextLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <Image
          src={row.getValue("image")}
          alt="Image for product"
          width={50}
          height={50}
          className="object-contain"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = formatPriceToActualCurrency(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "inStock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("inStock")}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "tradelock",
    header: "Tradelock",
  },
  {
    accessorKey: "float",
    header: "Float",
  },
  {
    accessorKey: "statTrak",
    header: "StatTrak",
    cell: ({ row }) => {
      const isStatTrak = row.getValue("statTrak");
      return (
        <div className="text-center">
          {isStatTrak ? (
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
        </div>
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
          className="text-center"
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{new Date(row.getValue("createdAt")).toLocaleString()}</div>;
    },
  },
];
