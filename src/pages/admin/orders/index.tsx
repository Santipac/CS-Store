import React from "react";
import type { NextPage } from "next";
import { requireBeAdmin } from "@/common/HOFs/requireBeAdmin";
import { AdminLayout } from "@/components/layouts";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/primitives";
import { DataTable } from "@/components/ui/DataTable";
import { columns } from "@/components/admin/orders/columns";

const OrdersAdminPage: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession({ required: true });
  const { data: isAdmin } = api.admin.userIsAdmin.useQuery({
    id: sessionData ? sessionData.user.id : null,
  });
  if (isAdmin === false || isAdmin === null) {
    router.replace("/");
  }
  const { data: orders } = api.order.getAllOrders.useQuery();

  return (
    <AdminLayout sessionData={sessionData} title="Products">
      <Toaster />
      <div className="flex w-full flex-col">
        <div>
          <Button
            variant="default"
            type="button"
            onClick={() => router.push("/admin/products/create")}
          >
            Create
          </Button>
        </div>
        <>
          {orders === undefined || orders.length === 0 ? (
            <div className="flex h-96 w-full flex-col items-center justify-center">
              <NoSymbolIcon className="h-24 w-24 text-red-400" />
              <span className="mt-4 font-medium text-gray-500">
                We couldn&apos;t find any product
              </span>
            </div>
          ) : (
            <div className="overflow-hidden">
              <DataTable
                columns={columns}
                data={orders}
                inputFilter="id"
                inputPlaceHolder="Filter by Order ID"
              />
            </div>
          )}
        </>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps = requireBeAdmin(async (_ctx) => {
  return { props: {} };
});
export default OrdersAdminPage;
