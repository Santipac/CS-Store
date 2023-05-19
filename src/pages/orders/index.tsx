import { ShopLayout } from "@/components/layouts/ShopLayout";
import React from "react";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { requireAuth } from "@/common/HOFs/requireAuth";
import { Badge } from "@/components/ui/primitives/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/primitives/table";
import { formatPriceToActualCurrency } from "@/helpers/currency";
const OrdersPage = () => {
  const { data: session } = useSession({ required: true });
  const { data: orders } = api.order.getOrderByUser.useQuery({
    id: session ? session.user.id : "",
  });
  return (
    <ShopLayout
      title="CS Store | Orders"
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
          <div className="rounded-md border-2 p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Status</TableHead>
                  {/* <TableHead>Resume</TableHead> */}
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="text-gray-600">{order.id}</TableCell>
                    <TableCell className="text-gray-600">
                      {order.numberOfItems}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {formatPriceToActualCurrency(order.total)}
                    </TableCell>
                    <TableCell className="text-gray-600">
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
                          className="bg-red-100 text-red-800  hover:bg-red-100 hover:text-red-800"
                        >
                          NO
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {order.status === "PENDING" ? (
                        <Badge className="bg-yellow-100 text-yellow-800  hover:bg-yellow-100 hover:text-yellow-800">
                          {order.status}
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800  hover:bg-green-100 hover:text-green-800">
                          {order.status}
                        </Badge>
                      )}
                    </TableCell>
                    {/* <TableCell>
                      <NextLink
                        href={`/orders/${order.id}`}
                        className="text-blue-500 underline"
                      >
                        View Order
                      </NextLink>
                    </TableCell> */}
                    <TableCell className="text-gray-600">{`${new Date(
                      order.createdAt
                    ).toLocaleString()}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </ShopLayout>
  );
};
export const getServerSideProps = requireAuth(async (_ctx) => {
  return { props: {} };
});
export default OrdersPage;
