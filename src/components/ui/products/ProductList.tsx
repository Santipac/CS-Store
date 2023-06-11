import React from "react";
import NextLink from "next/link";
import { CardProductSkeleton } from "./CardProductSkeleton";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import { api } from "@/utils/api";
import { motion as m } from "framer-motion";
import dynamic from "next/dynamic";
const ProductCard = dynamic(() => import("./ProductCard"));
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
export default function ProductList() {
  const {
    data: products,
    isLoading,
    isError,
  } = api.product.getProducts.useQuery();

  if (isError) {
    return (
      <div className="bg-slate-950">
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
      <div className="bg-slate-950">
        <div className="my-12">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tighter text-gray-200">
              New Products
            </h2>
            <NextLink href="/products" className="font-medium text-gray-200 ">
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
    <div className="bg-slate-950">
      <div className="my-12">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tighter text-gray-200">
            New Products
          </h2>
          <NextLink href="/products" className="font-medium text-gray-300 ">
            View All
          </NextLink>
        </div>

        <m.div
          className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {products.length === 0 ? (
            <>
              <div className="bg-slate-950">
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
                <m.div key={product.slug} variants={item}>
                  <NextLink href={`/products/${product.slug}`}>
                    <ProductCard product={product} />
                  </NextLink>
                </m.div>
              ))}
            </>
          )}
        </m.div>
      </div>
    </div>
  );
}
