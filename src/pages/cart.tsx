import { Navbar } from "@/components";
import { formatPriceToActualCurrency } from "@/helpers/currency";
import { useCartStore } from "@/store/cartStore";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import { BsBagX } from "react-icons/bs";
import NextLink from "next/link";
import { shallow } from "zustand/shallow";
import AlertDialog from "@/components/ui/AlertDialog";

export default function CartPage() {
  const { items, isEmpty, total } = useCartStore(
    (cart) => ({
      items: cart.items,
      isEmpty: cart.computed.isEmpty,
      total: cart.computed.total,
      count: cart.computed.count,
    }),
    shallow
  );

  const { increase, decrease, remove, clear } = useCartStore((cart) => ({
    increase: cart.increase,
    decrease: cart.decrease,
    remove: cart.remove,
    clear: cart.removeAll,
  }));

  if (isEmpty) {
    return (
      <section className="min-h-screen bg-white">
        <Navbar />
        <section className="mx-auto mt-12 flex max-w-7xl flex-col px-4 sm:px-6">
          <div className="flex h-[50vh] w-full flex-col items-center justify-center space-y-4">
            <BsBagX size="6rem" />
            <h2 className="text-center text-xl font-medium text-gray-600">
              There is not any product in the cart
            </h2>
            <NextLink href="/" className="text-gray-600 underline">
              Back to home
            </NextLink>
          </div>
        </section>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white">
      <Navbar />
      <section className="mx-auto mt-12 flex max-w-7xl flex-col px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-gray-800">Shopping Cart</h2>
        <div className="grid h-full w-full auto-rows-min gap-4 md:grid-cols-2 md:grid-rows-1">
          <div className="mt-8 flex w-full max-w-3xl flex-col space-y-4">
            <section>
              {items.map((item) => (
                <article
                  key={item.id}
                  className="flex rounded-sm border-2 border-gray-200"
                >
                  <Image
                    src={item.image}
                    alt="Image for Product"
                    width={130}
                    height={100}
                    className=" bg-gray-100 object-fill"
                  />

                  <div className="flex w-full flex-col space-y-1 p-2">
                    <div className="flex w-full items-center justify-between">
                      <h2 className="text-sm font-semibold text-gray-800">
                        {item.name}
                      </h2>
                      <XMarkIcon
                        className="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-800"
                        aria-hidden="true"
                        onClick={() => remove(item.id)}
                      />
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
                        <button
                          className="rounded-xl bg-gray-200 px-4 py-1 text-gray-600 "
                          onClick={() => decrease(item.id)}
                        >
                          -
                        </button>
                        <span className="font-medium text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          className="rounded-xl bg-gray-200 px-4 py-1 text-gray-600 disabled:cursor-not-allowed"
                          onClick={() => increase(item.id)}
                          disabled={item.quantity === item.inStock}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>
            <span
              onClick={() => clear()}
              className="font-regular cursor-pointer text-center text-sm text-red-500 hover:text-red-800"
            >
              Remove all products
            </span>
          </div>
          <div className="my-8 flex w-full max-w-3xl flex-col space-y-4 bg-gray-100 px-4 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Order Summary
            </h2>
            <div className="space-y-4">
              {items.map((item) => (
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
              <h2 className="font-regular text-sm text-gray-500">Subtotal</h2>
              <h2 className="text-sm font-medium text-gray-800">
                {formatPriceToActualCurrency(total)}
              </h2>
            </div>
            <hr className="mt-2" />
            {/* <NextLink href="/checkout" className="btn-block btn">
              Checkout
            </NextLink> */}
            <AlertDialog
              label="Checkout"
              title="Are you sure to confirm the order?"
              description="Once you confirm the order, you cannot go back to add or remove products."
            />
          </div>
        </div>
      </section>
    </section>
  );
}
