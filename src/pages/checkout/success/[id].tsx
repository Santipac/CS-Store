import { Navbar, Spinner } from "@/components";
import { prisma } from "@/server/db";
import { useCartStore } from "@/store/cartStore";
import type { Order } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React, { Suspense, useEffect } from "react";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import NextLink from "next/link";
import { api } from "@/utils/api";
interface Props {
  order: Order;
}

const SuccessOrderPage: NextPage<Props> = ({ order }) => {
  const { mutateAsync: updateOrderStatus } =
    api.order.updateOrderStatus.useMutation();
  useCartStore((state) => state.removeAll)();
  useEffect(() => {
    const checkPaymentStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const status = urlParams.get("status");
      if (status === "approved") {
        await updateOrderStatus({ orderId: order.id });
        return;
      }
    };
    checkPaymentStatus();
  }, []);
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
          <Spinner
            width="w-12"
            height="h-12"
            colorText="text-gray-200"
            fill="fill-blue-600"
          />
        </div>
      }
    >
      <Head>
        <title>CS Store Argentina</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-slate-950">
        <Navbar />
        <section className="flex h-[70vh] w-full items-center justify-center">
          <article className="flex w-11/12 justify-center p-2 md:w-3/4">
            <section className="flex min-h-min w-full max-w-[600px] flex-col items-center space-y-4 rounded bg-slate-800 px-4 py-8">
              <CheckBadgeIcon className="h-12 w-12 text-gray-300" />
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-medium tracking-tighter text-gray-300">
                  Purchase successful
                </h2>
                <p className="text-sm text-gray-500">
                  Now it&apos;s time to wait! We will ship your order as soon as
                  possible.
                </p>
              </div>
              <div className="space-x-4">
                <NextLink className="text-gray-400 underline" href="/">
                  Home
                </NextLink>
                <NextLink
                  className="text-gray-400 underline"
                  href={`/orders/${order.id}`}
                >
                  View Order
                </NextLink>
              </div>
            </section>
          </article>
        </section>
      </main>
    </Suspense>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id = "" } = params as { id: string };
  const order = await prisma.order.update({
    where: { id },
    data: {
      isPaid: true,
    },
    select: {
      updatedAt: false,
      createdAt: false,
      id: true,
      numberOfItems: true,
      status: true,
      total: true,
      isPaid: true,
      user: true,
      orderItems: {
        select: {
          productId: true,
          quantity: true,
        },
      },
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
  return {
    props: { order },
  };
};
export default SuccessOrderPage;
