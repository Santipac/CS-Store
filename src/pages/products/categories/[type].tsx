import React from "react";
import NextLink from "next/link";
import { ShopLayout } from "@/components/layouts/ShopLayout";
import { api } from "@/utils/api";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import type { GetServerSideProps, NextPage } from "next";
import { CardProductSkeleton } from "@/components/ui/products/CardProductSkeleton";
import dynamic from "next/dynamic";
const ProductCard = dynamic(
  () => import("@/components/ui/products/ProductCard")
);

interface Props {
  category: string;
}
const CategoryProductPage: NextPage<Props> = ({ category }) => {
  const {
    data: products,
    isLoading,
    isError,
  } = api.product.getProductsByCategory.useQuery({
    type: category,
  });

  if (isError) {
    return (
      <ShopLayout
        title="CS Store | Products Page"
        description="Page for all the products in the store"
      >
        <div className="flex h-96 w-full flex-col items-center justify-center">
          <NoSymbolIcon className="h-24 w-24 text-red-400" />
          <span className="mt-4 font-medium text-gray-200">
            We couldn&apos;t find any product
          </span>
        </div>
      </ShopLayout>
    );
  }
  if (isLoading) {
    return (
      <ShopLayout
        title="CS Store | Products Page"
        description="Page for all the products in the store"
      >
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <CardProductSkeleton />
          <CardProductSkeleton />
          <CardProductSkeleton />
          <CardProductSkeleton />
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
          <span className="mt-4 font-medium text-gray-200">
            We couldn&apos;t find any product
          </span>
        </div>
      </ShopLayout>
    );
  const categoryLowerCase = category.toLowerCase();
  const categoryCapitalized =
    categoryLowerCase.charAt(0).toUpperCase() + categoryLowerCase.slice(1);

  return (
    <ShopLayout
      title={`CS Store - Page for ${categoryCapitalized} Skins`}
      description={`Page for products with category ${categoryCapitalized}`}
    >
      <h2 className="my-6 text-4xl font-bold tracking-tighter text-gray-200">
        Products{" "}
        <span className="text-lg font-medium italic text-gray-400">
          ({category})
        </span>
      </h2>
      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <NextLink href={`/products/${product.slug}`} key={product.slug}>
            <ProductCard product={product} />
          </NextLink>
        ))}
      </section>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { type = "" } = params as { type: string };
  return {
    props: { category: type },
  };
};

export default CategoryProductPage;
