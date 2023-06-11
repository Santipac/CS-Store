import React, { useState } from "react";
import { formatPriceToActualCurrency } from "@/helpers/currency";
import { useCartStore } from "@/store/cartStore";
import { BsBagX } from "react-icons/bs";
import NextLink from "next/link";
import { shallow } from "zustand/shallow";
import dynamic from "next/dynamic";
import { Toaster, toast } from "react-hot-toast";
import { ShopLayout } from "@/components/layouts/ShopLayout";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { PaymentButtonGroup } from "@/components/ui/PaymentButtonGroup";
import useStore from "@/store/useStore";

const ProductSummary = dynamic(
  () => import("@/components/cart/ProductSummary")
);

export default function CartPage() {
  const items = useStore(useCartStore, (state) => state.items) ?? [];
  const count = useStore(useCartStore, (state) => state.count) ?? 0;
  const isEmpty = useStore(useCartStore, (state) => state.isEmpty) ?? true;
  const total = useStore(useCartStore, (state) => state.total) ?? 0;
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
  const { mutateAsync: createOrder } = api.order.createOrder.useMutation({
    onError: ({ data, message }) => {
      if (data?.code === "FORBIDDEN") {
        toast.error("You need to Sign in before purchasing", {
          duration: 3000,
        });
      } else {
        toast.error(message, { duration: 3000 });
      }
    },
  });

  const orderItems = items.map((item) => {
    return {
      ...item,
      quantity: item.quantity,
      productId: item.id,
    };
  });

  const onOrderCreation = async (service: "mercadopago" | "stripe") => {
    setIsLoading(true);
    const order = await createOrder({
      total,
      numberOfItems: count,
      orderItems,
    });
    if (service === "stripe") {
      await checkoutWithStripe(order);
      setIsLoading(false);
    } else {
      await checkoutWithMercadoPago(order);
      setIsLoading(false);
    }
  };
  const { clear } = useCartStore((cart) => ({
    clear: cart.removeAll,
  }));

  if (isEmpty) {
    return (
      <ShopLayout
        title="CS Store - Cart Page"
        description="Cart Page for CS STORE"
      >
        <section className="mx-auto mt-12 flex max-w-7xl flex-col px-4 sm:px-6">
          <div className="flex h-[50vh] w-full flex-col items-center justify-center space-y-4">
            <BsBagX size="6rem" className="text-gray-200" />
            <h2 className="text-center text-xl font-medium text-gray-400">
              There is not any product in the cart
            </h2>
            <NextLink href="/" className="text-gray-400 underline">
              Back to home
            </NextLink>
          </div>
        </section>
      </ShopLayout>
    );
  }

  return (
    <ShopLayout
      title="CS Store - Cart Page"
      description="Cart Page for CS STORE"
    >
      <section className="py-8">
        <h2 className="text-4xl font-bold text-gray-200">Cart</h2>
        <Toaster />
        <div className="grid min-h-min w-full auto-rows-min gap-4 md:grid-cols-2 md:grid-rows-1">
          <div className="mt-8 flex w-full max-w-3xl flex-col space-y-4">
            <section className="space-y-2">
              {items.map((item) => (
                <ProductSummary item={item} key={item.id} />
              ))}
            </section>
            <span
              onClick={() => clear()}
              className="font-regular cursor-pointer text-center text-sm text-red-700 hover:text-red-800"
            >
              Remove all products
            </span>
          </div>
          <div className="my-8 flex h-min w-full max-w-3xl flex-col space-y-4 bg-slate-800 px-4 py-4">
            <h2 className="text-lg font-semibold text-gray-200">
              Order Summary
            </h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  className="flex w-full items-center justify-between"
                  key={item.id}
                >
                  <h2 className="font-regular text-sm text-gray-300">
                    {item.name}
                  </h2>
                  <h2 className="text-sm font-medium text-gray-400">
                    {item.quantity} item(s)
                  </h2>
                </div>
              ))}
              <div className="mt-2 h-px w-full bg-slate-600" />
            </div>
            <div className="flex w-full items-center justify-between ">
              <h2 className="font-regular text-sm text-gray-300">Subtotal</h2>
              <h2 className="text-sm font-medium text-blue-400">
                {formatPriceToActualCurrency(total)}
              </h2>
            </div>
            <div className="mt-2 h-px w-full bg-slate-600" />
            <PaymentButtonGroup
              isLoading={isLoading}
              onOrderCreation={onOrderCreation}
            />
          </div>
        </div>
      </section>
    </ShopLayout>
  );
}
