import { formatPriceToActualCurrency } from "@/helpers/currency";
import type { ProductCart } from "@/interfaces/product";
import { useCartStore } from "@/store/cartStore";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

interface Props {
  item: ProductCart;
}

const ProductSummary: React.FC<Props> = ({ item }) => {
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);
  const remove = useCartStore((state) => state.remove);

  return (
    <article
      key={item.id}
      className="flex rounded-sm border-2 border-slate-800"
    >
      <Image
        src={item.image}
        alt={`Image Product for ${item.name}`}
        width={160}
        height={100}
        className="bg-slate-800 object-fill p-2"
      />

      <div className="flex w-full flex-col justify-center space-y-1 p-2 pl-4">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-200">{item.name}</h2>
          <XMarkIcon
            className="h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-200"
            aria-hidden="true"
            onClick={() => remove(item.id)}
          />
        </div>
        {item.wear && (
          <div>
            <h2 className="font-regular text-xs text-gray-400">{item.wear}</h2>
          </div>
        )}
        <div>
          <h2 className="text-sm font-semibold text-blue-400">
            {formatPriceToActualCurrency(item.price)}
          </h2>
        </div>
        <div className="flex flex-col">
          <h2 className="font-regular text-xs text-gray-400">Quantity</h2>
          <div className="mt-2 flex items-center gap-4">
            <button
              className="rounded-xl bg-slate-800 px-4 py-1 text-gray-400 "
              onClick={() => decrease(item.id)}
            >
              -
            </button>
            <span className="font-medium text-blue-400">{item.quantity}</span>
            <button
              className="rounded-xl bg-slate-800 px-4 py-1 text-gray-400 disabled:cursor-not-allowed"
              onClick={() => increase(item.id)}
              disabled={item.quantity === item.inStock}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductSummary;
