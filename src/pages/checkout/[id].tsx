import { prisma } from "@/server/db";
import type { OrderItem } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";

type Order = {
  id: string;
  user: {
    name: string;
    email: string;
  };
  orderItems: OrderItem[];
  numberOfItems: number;
  total: number;
  isPaid: boolean;
};

interface Props {
  order: Order;
}
const CheckoutOrder: NextPage<Props> = ({ order }) => {
  return (
    <section>
      <Head>
        <title>CS Store | Checkout Page for Order {order.id}</title>
        <meta
          name="description"
          content={`Checkout Page for Order created by ${order.user.name}`}
        />
      </Head>
      <section className="min-h-screen bg-white">
        <h2>Items: {order.numberOfItems}</h2>
        <h2>Total to Paid: {order.total}</h2>
      </section>
    </section>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id = "" } = ctx.params as { id: string };
  const order = await prisma.order.findFirst({
    where: { id },
    select: {
      id: true,
      isPaid: true,
      numberOfItems: true,
      orderItems: true,
      total: true,
      user: true,
      status: true,
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
export default CheckoutOrder;
