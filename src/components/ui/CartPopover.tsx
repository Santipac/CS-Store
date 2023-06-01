import React from "react";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { formatPriceToActualCurrency } from "@/helpers/currency";
import NextLink from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/primitives/popover";
import { Button } from "./primitives/button";

export const CartPopover: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const computed = useCartStore((state) => ({
    count: state.count,
    isEmpty: state.isEmpty,
    total: state.total,
  }));
  return (
    <Popover>
      <PopoverTrigger>
        <span className="relative flex items-center justify-center">
          <ShoppingBagIcon
            className="z-20 mt-2 h-6 w-6 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
          <span className="absolute -right-3 top-0 z-20 rounded-full bg-zinc-700 px-1 text-xs font-medium text-white">
            {computed.count}
          </span>
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-80 border-slate-800 bg-slate-900 sm:w-96">
        {computed.isEmpty ? (
          <span className="flex justify-center text-gray-400"> Empty Cart</span>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.id} className="  border-b border-gray-200 p-1">
                <div className="flex">
                  <Image
                    src={item.image}
                    alt="Image Product for Cart"
                    width={70}
                    height={70}
                    className="object-contain"
                  />
                  <div className="flex h-full w-full flex-col space-y-2 px-2">
                    <div className="flex justify-between gap-4">
                      <h2 className="text-sm font-medium text-gray-200">
                        {item.name}
                      </h2>
                      <h2 className="text-sm font-medium text-gray-200">
                        {formatPriceToActualCurrency(item.price)}
                      </h2>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-regular text-xs text-gray-400">
                        Quantity: {item.quantity}
                      </p>
                      <span
                        className="font-regular cursor-pointer text-xs text-red-500 hover:text-red-700"
                        onClick={() => remove(item.id)}
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex w-full items-center justify-between  p-2">
              <p className="text-sm font-medium text-gray-300">Total</p>
              <p className="text-sm font-medium text-gray-300">
                {formatPriceToActualCurrency(computed.total)}
              </p>
            </div>
            <NextLink href="/cart">
              <Button className="w-full bg-slate-950 hover:bg-slate-800">
                Go to Cart
              </Button>
            </NextLink>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};
export default CartPopover;
