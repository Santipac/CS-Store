import React from "react";
import Image from "next/image";
import NextLink from "next/link";
import { CardProductSkeleton } from "./CardProductSkeleton";
import { formatPriceToActualCurrency } from "@/helpers/currency";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import { api } from "@/utils/api";
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
          <div className="flex h-96 w-full flex-col items-center justify-center">
            <NoSymbolIcon className="h-24 w-24 text-red-400" />
            <span className="mt-4 font-medium text-gray-500">
              We couldn&apos;t find any product
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white">
        <div className="my-12">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              New Products
            </h2>
            <NextLink href="/products" className="text-gray-600 ">
              View All
            </NextLink>
          </div>
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
        <div className="flex w-full items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            New Products
          </h2>
          <NextLink href="/products" className="text-gray-600 ">
            View All
          </NextLink>
        </div>

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
              {products.slice(0, 4).map((product) => (
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
                      {product.inStock === 0 && (
                        <span className="absolute bottom-0 left-0 mb-2 ml-2 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                          Not Available
                        </span>
                      )}
                      {product.statTrak && (
                        <span className="absolute right-0 top-0 mr-2 mt-2 rounded-full bg-zinc-200 px-2 py-1 text-xs font-medium text-black">
                          StatTrak™
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex w-full justify-between  gap-4 px-2">
                      <h2 className="text-sm font-medium text-gray-700">
                        {product.name}
                      </h2>
                      <h2 className="font-regular text-sm text-gray-700">
                        {formatPriceToActualCurrency(product.price)}
                      </h2>
                    </div>
                    <div className="w-full px-2 text-start">
                      {product.wear && product.wear !== "-" && (
                        <p className="font-regular text-left text-xs text-gray-500">
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
