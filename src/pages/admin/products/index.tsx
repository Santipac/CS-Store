import React from "react";
import NextLink from "next/link";
import type { NextPage } from "next";
import { requireBeAdmin } from "@/common/HOFs/requireBeAdmin";
import { AdminLayout } from "@/components/layouts";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import { formatPriceToActualCurrency } from "@/helpers/currency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const ProductsAdminPage: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession({ required: true });
  const { data: isAdmin } = api.admin.userIsAdmin.useQuery({
    id: sessionData ? sessionData.user.id : null,
  });
  if (isAdmin === false || isAdmin === null) {
    router.replace("/");
  }
  const { data: products, refetch } = api.product.getProducts.useQuery();
  const { mutateAsync: deleteProduct } =
    api.product.deleteProduct.useMutation();

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
    <AdminLayout sessionData={sessionData} title="Products">
      <Toaster />
      <div className="flex w-full flex-col overflow-hidden">
        <NextLink
          href="/admin/products/create"
          className="mb-2 text-end text-gray-500"
        >
          Create product
        </NextLink>

        {products === undefined || products.length === 0 ? (
          <div className="flex h-96 w-full flex-col items-center justify-center">
            <NoSymbolIcon className="h-24 w-24 text-red-400" />
            <span className="mt-4 font-medium text-gray-500">
              We couldn&apos;t find any product
            </span>
          </div>
        ) : (
          <>
            <div className="rounded-md border-2 p-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>TradeLock</TableHead>
                    <TableHead>Float</TableHead>
                    <TableHead>StatTrak</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products?.map((product, i) => (
                    <TableRow
                      key={i}
                      className="text-gray-500 odd:bg-white even:bg-slate-100"
                    >
                      <TableCell>
                        <Image
                          src={product.image}
                          width={50}
                          height={50}
                          alt="Image for product"
                          className="object-contain"
                        />
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        {formatPriceToActualCurrency(product.price)}
                      </TableCell>
                      <TableCell>{product.inStock}</TableCell>
                      <TableCell>{product.type}</TableCell>
                      <TableCell>{product.tradelock}</TableCell>
                      <TableCell>{product.float}</TableCell>
                      <TableCell>
                        {product.statTrak === true ? (
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
                      </TableCell>
                      <TableCell>
                        {new Date(product.createdAt).toLocaleString()}
                      </TableCell>

                      <TableCell>
                        <span
                          className="cursor-pointer text-red-500"
                          onClick={() => onDeleteProduct(product.id)}
                        >
                          Delete
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps = requireBeAdmin(async (_ctx) => {
  return { props: {} };
});
export default ProductsAdminPage;
