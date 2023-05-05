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
        <div className=" overflow-scroll rounded-lg border border-gray-200 p-1 md:overflow-auto">
          {products === undefined || products.length === 0 ? (
            <div className="flex h-96 w-full flex-col items-center justify-center">
              <NoSymbolIcon className="h-24 w-24 text-red-400" />
              <span className="mt-4 font-medium text-gray-500">
                We couldn&apos;t find any product
              </span>
            </div>
          ) : (
            <table className="  table-compact w-full ">
              <thead className="border-b-2 border-gray-300">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>In Stock</th>
                  <th>Type</th>
                  <th>TradeLock</th>
                  <th>Float</th>
                  <th>StatTrak</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, i) => (
                  <tr
                    key={i}
                    className="text-gray-500 odd:bg-white even:bg-slate-100"
                  >
                    <td>
                      <Image
                        src={product.image}
                        width={50}
                        height={50}
                        alt="Image for product"
                        className="object-contain"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{formatPriceToActualCurrency(product.price)}</td>
                    <td>{product.inStock}</td>
                    <td>{product.type}</td>
                    <td>{product.tradelock}</td>
                    <td>{product.float}</td>
                    <td>
                      {product.statTrak === true ? (
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                          No
                        </span>
                      )}
                    </td>
                    <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                    <td>
                      <NextLink
                        className="text-gray-500"
                        href={`/products/${product.id}`}
                      >
                        Edit
                      </NextLink>
                    </td>
                    <td>
                      <span
                        className="cursor-pointer text-red-500"
                        onClick={() => onDeleteProduct(product.id)}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps = requireBeAdmin(async (_ctx) => {
  return { props: {} };
});
export default ProductsAdminPage;
