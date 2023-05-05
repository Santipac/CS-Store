import { api } from "@/utils/api";
import Image from "next/image";
import NextLink from "next/link";

export default function ProductList() {
  const {
    data: products,
    isLoading,
    isError,
  } = api.product.getProducts.useQuery();

  if (isError) {
    return (
      <div className="bg-white">
        <div className="my-12 text-center ">
          <h2 className="text-2xl font-medium text-gray-700">
            Something went wrong...
          </h2>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white">
        <div className="my-12">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <CardProductSkeleton />
            <CardProductSkeleton />
            <CardProductSkeleton />
            <CardProductSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="my-12">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.length === 0 ? (
            <>
              <div className="bg-white">
                <div className="my-12">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    We could not find any product available.
                  </h2>
                </div>
              </div>
            </>
          ) : (
            <>
              {products.map((product) => (
                <NextLink href={`/products/${product.slug}`} key={product.slug}>
                  <div className="flex flex-col items-center  pb-2 ">
                    <div className="relative flex w-full items-center justify-center bg-slate-50">
                      <Image
                        src={product.image}
                        alt={`Product image for ${product.name}`}
                        className="object-contain"
                        width={200}
                        height={200}
                      />
                      {product.statTrak && (
                        <span className="absolute right-0 top-0 mr-2 mt-2 rounded-full bg-black px-2 py-1 text-xs text-white">
                          StatTrak™
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex w-full items-center justify-between  px-2">
                      <h2 className="text-md font-medium text-gray-700">
                        {product.name}
                      </h2>
                      <h2 className="font-regular text-md text-gray-700">
                        {formatPriceToActualCurrency(product.price)}
                      </h2>
                    </div>
                    <div className="w-full px-2 text-start">
                      {product.wear && product.wear !== "-" && (
                        <p className="font-regular text-left text-sm text-gray-500">
                          {product.wear}
                        </p>
                      )}
                    </div>
                  </div>
                </NextLink>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { CardProductSkeleton } from "./CardProductSkeleton";
import { formatPriceToActualCurrency } from "@/helpers/currency";
