import { formatPriceToActualCurrency } from "@/helpers/currency";
import type { Product } from "@prisma/client";
import Image from "next/image";
import React from "react";
interface Props {
  product: Product;
}
const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex flex-col items-center space-y-2 rounded-lg  bg-slate-900 pb-2">
      <div className="relative mb-2 flex  w-full items-center justify-center rounded-t-md bg-slate-800">
        <Image
          src={product.image}
          alt={`Product image for ${product.name}`}
          className="object-contain"
          width={200}
          height={200}
        />
        {product.inStock === 0 && (
          <span className="absolute bottom-0 left-0 mb-2 ml-2 rounded-full bg-red-800 px-2 py-1 text-xs font-medium text-red-100">
            Not Available
          </span>
        )}
        {product.statTrak && (
          <span className="absolute right-0 top-0 mr-2 mt-2 rounded-full bg-amber-700 px-2 py-1 text-xs font-medium text-white">
            StatTrak™
          </span>
        )}
      </div>
      <div className="mt-4 flex w-full justify-between  gap-4 px-2">
        <h2 className="text-sm font-medium text-gray-300 truncate">{product.name}</h2>
      </div>
      <div className="flex w-full items-center justify-between px-2 text-start">
        {product.wear && product.wear !== "-" && (
          <p className="font-regular text-left text-xs text-gray-400">
            {product.wear}
          </p>
        )}
        <h2 className="font-regular text-sm text-blue-400">
          {formatPriceToActualCurrency(product.price)}
        </h2>
      </div>
    </div>
  );
};

export default ProductCard;
