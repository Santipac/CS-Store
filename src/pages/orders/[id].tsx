import { ShopLayout } from "@/components/layouts/ShopLayout";
import CheckoutDialog from "@/components/orders/CheckoutDialog";
import { Badge } from "@/components/ui/badge";
import { formatPriceToActualCurrency } from "@/helpers/currency";
import { s3 } from "@/lib/s3";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import type { OrderItem, OrderStatus, User } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import React from "react";

export type Order = {
  id: string;
  userId: string;
  orderItems: OrderItem[];
  numberOfItems: number;
  status: OrderStatus;
  total: number;
  isPaid: boolean;
  user: User;
};

interface Props {
  order: Order;
}

const OrderSummaryPage: NextPage<Props> = ({ order }) => {
  return (
    <ShopLayout
      title="CS Store | Order Page"
      description="Order Summary Page for complete or check status of the order"
    >
      <h2 className="text-2xl font-bold text-gray-800 md:text-4xl">
        Order Summary
      </h2>

      <div className="grid h-full w-full auto-rows-min gap-4 md:grid-cols-2 md:grid-rows-1">
        <div className="mt-8 flex w-full max-w-3xl flex-col space-y-4">
          <section className="space-y-2">
            {order.orderItems.map((item) => (
              <article
                key={item.id}
                className="flex rounded-sm border-2 border-gray-200"
              >
                <Image
                  src={item.image}
                  alt={`Image Product for ${item.name}`}
                  width={130}
                  height={100}
                  className=" bg-gray-100 object-fill"
                />

                <div className="flex w-full flex-col space-y-1 p-2">
                  <div className="flex w-full items-center justify-between">
                    <h2 className="text-sm font-semibold text-gray-800">
                      {item.name}
                    </h2>
                  </div>
                  {item.wear && (
                    <div>
                      <h2 className="font-regular text-xs text-gray-500">
                        {item.wear}
                      </h2>
                    </div>
                  )}
                  <div>
                    <h2 className="text-sm font-semibold text-gray-800">
                      {formatPriceToActualCurrency(item.price)}
                    </h2>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="font-regular text-xs text-gray-500">
                      Quantity
                    </h2>
                    <div className="mt-2 flex items-center gap-4">
                      <span className="font-medium text-gray-800">
                        {item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
        <div className="my-8 flex w-full max-w-3xl flex-col space-y-4 bg-gray-100 px-4 py-4">
          <div className="flex flex-wrap justify-between">
            <h2 className="text-md font-semibold text-gray-800 sm:text-lg">
              Order Summary
            </h2>
            <span>
              {order.isPaid ? (
                <>
                  {order.status === "DELIVERED" ? (
                    <Badge className="bg-green-100 text-green-800">
                      Delivered
                    </Badge>
                  ) : (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      Pending of Delivery
                    </Badge>
                  )}
                </>
              ) : (
                <Badge className=" bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800">
                  Pay Pending
                </Badge>
              )}
            </span>
          </div>
          <div className="space-y-4">
            {order.orderItems.map((item) => (
              <div
                className="flex w-full items-center justify-between"
                key={item.id}
              >
                <h2 className="font-regular text-sm text-gray-500">
                  {item.name}
                </h2>
                <h2 className="text-sm font-medium text-gray-800">
                  {item.quantity} item(s)
                </h2>
              </div>
            ))}
            <hr className="mt-2" />
          </div>
          <div className="flex w-full items-center justify-between ">
            <h2 className="font-regular text-sm text-gray-500">Total</h2>
            <h2 className="text-sm font-medium text-gray-800">
              {formatPriceToActualCurrency(order.total)}
            </h2>
          </div>
          <hr className="mt-2" />
          {order.isPaid ? (
            <Badge className="flex h-12 w-full justify-center rounded-sm bg-emerald-600 text-center text-lg hover:bg-emerald-600 hover:text-white">
              Order is Paid
            </Badge>
          ) : (
            <>
              <CheckoutDialog
                title="You are about to be redirected to the payment page."
                description="Make sure to complete the payment correctly so that we can deliver the order."
                label="Pay"
                order={order}
              />
            </>
          )}
        </div>
      </div>
    </ShopLayout>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id = "" } = ctx.params as { id: string };
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const order = await prisma.order.findUnique({
    where: { id },
    select: {
      id: true,
      isPaid: true,
      numberOfItems: true,
      orderItems: true,
      total: true,
      status: true,
      userId: true,
      user: true,
      createdAt: false,
      updatedAt: false,
    },
  });
  if (!order) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  order.orderItems.map(async (item) => {
    const imageUrl = await s3.getSignedUrlPromise("getObject", {
      Bucket: "cs-store-arg",
      Key: item.image,
    });
    return { ...item, image: imageUrl };
  });
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });

  if (order.userId === session.user.id || user!.role === "ADMIN") {
    return {
      props: { order },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};
export default OrderSummaryPage;
