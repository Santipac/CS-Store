import React, { useState } from "react";
import { ShopLayout } from "@/components/layouts/ShopLayout";
import { PaymentButtonGroup } from "@/components/ui/PaymentButtonGroup";
import { Badge } from "@/components/ui/primitives/badge";
import { formatPriceToActualCurrency } from "@/helpers/currency";
import { s3 } from "@/lib/s3";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import type { OrderItem, OrderStatus, User } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const { mutateAsync: checkoutWithMercadoPago } =
    api.checkout.checkoutWithMercadoPago.useMutation({
      onSuccess: ({ url }: { url: string }) => {
        router.push(url);
      },
    });
  const { mutateAsync: checkoutWithStripe } =
    api.checkout.checkoutWithStripe.useMutation({
      onSuccess: ({ url }: { url: string }) => {
        router.push(url);
      },
    });
  const onOrderCreation = async (service: "mercadopago" | "stripe") => {
    setIsLoading(true);
    if (service === "stripe") {
      await checkoutWithStripe(order);
      setIsLoading(false);
    } else {
      await checkoutWithMercadoPago(order);
      setIsLoading(false);
    }
  };

  return (
    <ShopLayout
      title="CS Store - Order Page"
      description="Order Summary Page for complete or check status of the order"
    >
      <section className="py-8">
        <h2 className="text-2xl font-bold tracking-tighter text-gray-200 md:text-4xl">
          Order Summary
        </h2>

        <div className="grid h-full w-full auto-rows-min gap-4 md:grid-cols-2 md:grid-rows-1">
          <div className="mt-8 flex w-full max-w-3xl flex-col space-y-4">
            <section className="space-y-2">
              {order.orderItems.map((item) => (
                <article
                  key={item.id}
                  className="flex rounded-sm border-2 border-slate-800"
                >
                  <Image
                    src={item.image}
                    alt={`Image Product for ${item.name}`}
                    width={160}
                    height={100}
                    className=" bg-gray-100 object-fill"
                  />

                  <div className="flex w-full flex-col space-y-1 p-2">
                    <div className="flex w-full items-center justify-between">
                      <h2 className="text-sm font-semibold text-gray-200">
                        {item.name}
                      </h2>
                    </div>
                    {item.wear && (
                      <div>
                        <h2 className="font-regular text-xs text-gray-400">
                          {item.wear}
                        </h2>
                      </div>
                    )}
                    <div>
                      <h2 className="text-sm font-semibold text-blue-400">
                        {formatPriceToActualCurrency(item.price)}
                      </h2>
                    </div>
                    <div className="flex flex-col">
                      <h2 className="font-regular text-xs text-gray-400">
                        Quantity
                      </h2>
                      <div className="mt-2 flex items-center gap-4">
                        <span className="font-medium text-gray-400">
                          {item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </div>
          <div className="my-8 flex w-full max-w-3xl flex-col space-y-4 bg-slate-900 px-4 py-4 ">
            <div className="flex flex-wrap justify-between">
              <h2 className="text-md font-semibold text-gray-300 sm:text-lg">
                Order Summary
              </h2>
              <span>
                {order.isPaid ? (
                  <>
                    {order.status === "DELIVERED" ? (
                      <Badge className="bg-green-600 text-white">
                        Delivered
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-300 text-zinc-800 hover:bg-yellow-400 hover:text-zinc-800">
                        Pending of Delivery
                      </Badge>
                    )}
                  </>
                ) : (
                  <Badge className=" bg-red-800 text-white hover:bg-red-800 hover:text-white">
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
                  <h2 className="font-regular text-sm text-gray-400">
                    {item.name}
                  </h2>
                  <h2 className="text-sm font-medium text-gray-400">
                    {item.quantity} item(s)
                  </h2>
                </div>
              ))}
              <div className="h-px bg-slate-600" />
            </div>
            <div className="flex w-full items-center justify-between ">
              <h2 className="font-regular text-sm text-gray-300">Total</h2>
              <h2 className="text-sm font-medium text-gray-300">
                {formatPriceToActualCurrency(order.total)}
              </h2>
            </div>
            <div className="h-px bg-slate-600" />
            {order.isPaid ? (
              <Badge className="flex h-12 w-full justify-center rounded-sm bg-emerald-600 text-center text-lg hover:bg-emerald-600 hover:text-white">
                Order is Paid
              </Badge>
            ) : (
              <>
                <PaymentButtonGroup
                  isLoading={isLoading}
                  onOrderCreation={onOrderCreation}
                />
              </>
            )}
          </div>
        </div>
      </section>
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
