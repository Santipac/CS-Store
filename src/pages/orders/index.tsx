import React from "react";
import { ShopLayout } from "@/components/layouts/ShopLayout";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { requireAuth } from "@/common/HOFs/requireAuth";
import { columns } from "@/components/orders/columns";
import { DataTable } from "@/components/ui/DataTable";
const OrdersPage = () => {
  const { data: session } = useSession({ required: true });
  const { data: orders } = api.order.getOrderByUser.useQuery({
    id: session ? session.user.id : "",
  });
  return (
    <ShopLayout
      title="CS Store - Orders"
      description="Page for check all the orders of the Customer"
    >
      <div className="flex w-full flex-col space-y-4 overflow-hidden">
        <h2 className="mt-8 text-4xl font-bold text-gray-800 ">My Orders</h2>
        {orders === undefined || orders.length === 0 ? (
          <div className="flex h-96 w-full flex-col items-center justify-center">
            <NoSymbolIcon className="h-24 w-24 text-red-400" />
            <span className="mt-4 font-medium text-gray-500">
              We couldn&apos;t find any order
            </span>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={orders}
            inputFilter="id"
            inputPlaceHolder="Filter by Order ID"
          />
        )}
      </div>
    </ShopLayout>
  );
};
export const getServerSideProps = requireAuth(async (_ctx) => {
  return { props: {} };
});
export default OrdersPage;
