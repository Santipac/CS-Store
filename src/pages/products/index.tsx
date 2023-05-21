import React, { useState } from "react";
import { type NextPage } from "next";
import { api } from "@/utils/api";
import Image from "next/image";
import NextLink from "next/link";
import { formatPriceToActualCurrency } from "@/helpers/currency";
import { ShopLayout } from "@/components/layouts/ShopLayout";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/primitives/select";

import type { z } from "zod";
import type { getProductsFilterSchema } from "@/common/validation/product";
import { CardProductSkeleton } from "@/components/ui/products/CardProductSkeleton";

const ProductsPage: NextPage = () => {
  const [filter, setFilter] =
    useState<z.infer<typeof getProductsFilterSchema>>("NEWEST");
  const { data: products, isLoading } =
    api.product.getProducts.useQuery(filter);

  const onHandleSelect = (e: z.infer<typeof getProductsFilterSchema>) => {
    if (e === filter) return;
    setFilter(e);
  };

  if (isLoading) {
    return (
      <ShopLayout
        title="CS Store | Products Page"
        description="Page for all the products in the store"
      >
        <div className="my-6 flex items-center justify-between">
          <h2 className=" text-4xl font-bold text-gray-800">Products</h2>
        </div>
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <CardProductSkeleton />
          <CardProductSkeleton />
          <CardProductSkeleton />
          <CardProductSkeleton />
        </div>
      </ShopLayout>
    );
  }

  if (!products || products.length === 0)
    return (
      <ShopLayout
        title="CS Store | Products Page"
        description="Page for all the products in the store"
      >
        <div className="flex h-96 w-full flex-col items-center justify-center">
          <NoSymbolIcon className="h-24 w-24 text-red-400" />
          <span className="mt-4 font-medium text-gray-500">
            We couldn&apos;t find any product
          </span>
        </div>
      </ShopLayout>
    );

  return (
    <ShopLayout
      title="CS Store | Products Page"
      description="Page for all the products in the store"
    >
      <div className="my-6 flex items-center justify-between">
        <h2 className=" text-4xl font-bold text-gray-800">Products</h2>
        <Select
          onValueChange={(e: z.infer<typeof getProductsFilterSchema>) => {
            if (e === undefined) return;
            onHandleSelect(e);
          }}
        >
          <SelectTrigger className="w-[180px] focus:ring-transparent">
            <SelectValue
              placeholder={
                filter === "NEWEST"
                  ? "Newest"
                  : filter === "OLDEST"
                  ? "Oldest"
                  : filter === "CHEAP_FIRST"
                  ? "Low to High"
                  : "Hight to Low"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NEWEST">Order By: Newest</SelectItem>
            <SelectItem value="OLDEST">Order By: Oldest</SelectItem>
            <SelectItem value="CHEAP_FIRST">Price: Low to High</SelectItem>
            <SelectItem value="EXPENSIVE_FIRST">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
      </section>
    </ShopLayout>
  );
};

export default ProductsPage;
