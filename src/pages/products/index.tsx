import React, { useState } from "react";
import { type NextPage } from "next";
import { api } from "@/utils/api";
import NextLink from "next/link";
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
import dynamic from "next/dynamic";
const ProductCard = dynamic(
  () => import("@/components/ui/products/ProductCard")
);
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
          <h2 className=" text-4xl font-bold  tracking-tighter text-gray-200">
            Products
          </h2>
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
        title="CS Store - Products Page"
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
        <h2 className=" text-4xl font-bold tracking-tighter text-gray-200">
          Products
        </h2>
        <Select
          onValueChange={(e: z.infer<typeof getProductsFilterSchema>) => {
            if (e === undefined) return;
            onHandleSelect(e);
          }}
        >
          <SelectTrigger className="w-[180px] border-none bg-slate-800 text-gray-200 focus:ring-transparent">
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
          <SelectContent className="border-none bg-slate-900 text-gray-200">
            <SelectItem value="NEWEST">Order By: Newest</SelectItem>
            <SelectItem value="OLDEST">Order By: Oldest</SelectItem>
            <SelectItem value="CHEAP_FIRST">Price: Low to High</SelectItem>
            <SelectItem value="EXPENSIVE_FIRST">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
        {products.map((product) => (
          <NextLink href={`/products/${product.slug}`} key={product.slug}>
            <ProductCard product={product} />
          </NextLink>
        ))}
      </section>
    </ShopLayout>
  );
};

export default ProductsPage;
