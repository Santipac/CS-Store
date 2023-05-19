import React, { useState } from "react";
import { Navbar } from "@/components";
import { prisma } from "@/server/db";
import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { api } from "@/utils/api";
import { formatPriceToActualCurrency } from "@/helpers/currency";
import NextLink from "next/link";
interface Props {
  slug: string;
}
const ProductPage: NextPage<Props> = ({ slug }) => {
  const { data: product, isLoading } = api.product.getProductBySlug.useQuery({
    slug,
  });
  const { AddProduct } = useCartStore();
  const [quantity, setQuantity] = useState<number>(1);

  if (isLoading) {
    return <ProductSkeleton />;
  }
  if (!product)
    return (
      <section className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
        <h2 className="text-xl font-medium text-gray-800">
          Something went wrong with this product. Please comeback later.
        </h2>
        <NextLink href="/" className="text-gray-500 underline">
          Back to home
        </NextLink>
      </section>
    );

  const increment = () => {
    if (quantity < product.inStock) {
      setQuantity(quantity + 1);
    }
    if (quantity === product.inStock) {
      return setQuantity(quantity);
    }
  };
  const decrement = () => {
    if (quantity <= 1) {
      return setQuantity(1);
    }
    setQuantity(quantity - 1);
  };

  return (
    <section className="min-h-screen bg-white">
      <Navbar />
      <div className="flex h-full w-full justify-center">
        <div className="mt-8 flex w-11/12 flex-col md:w-3/4 lg:flex-row">
          <div className="relative flex min-h-[40vh] w-full items-center  justify-center rounded-md bg-gray-200 lg:w-1/2">
            <Image
              src={product.image}
              alt="Product Image"
              width={360}
              height={200}
              className="object-contain"
            />
            {product.statTrak && (
              <span className="absolute right-0 top-0 mr-2 mt-2 inline-flex items-center rounded-md bg-black px-2 py-1 text-sm font-medium text-white ring-1 ring-inset ring-orange-600/20">
                StatTrak™
              </span>
            )}
          </div>
          <div className="flex w-full flex-col space-y-4 sm:px-4 lg:w-1/2">
            <div className="mt-2 flex items-center justify-between lg:mt-0">
              <h2 className="text-lg font-medium text-black sm:text-xl">
                {product.name}
              </h2>
              <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
                {formatPriceToActualCurrency(product.price)}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {product.wear && product.wear !== "-" && (
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                  {product.wear}
                </span>
              )}
              {!product.float || product.float === 0 ? null : (
                <div>
                  <span className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-1 text-sm font-medium text-zinc-700 ring-1 ring-inset ring-zinc-600/20">
                    Float: {product.float}
                  </span>
                </div>
              )}
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                TradeLock: {product.tradelock}
              </span>
            </div>

            <div className="flex flex-col space-y-2">
              <h2 className="font-regular text-md text-gray-600">Quantity:</h2>
              <div className="flex items-center space-x-5">
                <button
                  onClick={decrement}
                  className="font-semibold text-gray-800"
                >
                  -
                </button>
                <p className="text-blach bg-gray-100 px-2 py-1 text-zinc-500">
                  {quantity}
                </p>
                <button
                  onClick={increment}
                  className="font-semibold text-gray-800"
                >
                  +
                </button>
              </div>
            </div>

            <div className="w-full">
              <button
                className="h-12 w-full rounded border-none bg-zinc-800 font-medium text-white disabled:cursor-not-allowed disabled:bg-zinc-600 disabled:text-gray-300"
                disabled={product.inStock === 0}
                onClick={() => AddProduct({ ...product, quantity })}
              >
                Add to Cart
              </button>
            </div>

            {product.description && (
              <div className="flex flex-col">
                <h2 className="text-md font-medium text-gray-700">
                  Description
                </h2>
                <p className="font-regular text-sm text-gray-500">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export async function getStaticPaths() {
  // Obtener todos los IDs de productos desde la API
  const products = await prisma.product.findMany({ select: { slug: true } });
  if (!products) return { paths: [], fallback: false };
  // Generar las rutas para cada ID de producto
  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));
  // Devolver las rutas pre-generadas
  return { paths, fallback: "blocking" };
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  return {
    props: { slug },
    revalidate: 60,
  };
};

const ProductSkeleton = () => {
  return (
    <section className="min-h-screen bg-white">
      <Navbar />
      <div className="flex h-full w-full justify-center">
        <div className="mt-8 flex w-11/12 flex-col md:w-3/4 lg:flex-row">
          <div className="flex min-h-[40vh] w-full animate-pulse items-center justify-center rounded-3xl bg-gray-300 lg:w-1/2 " />
          <div className="mt-4 flex w-full flex-col space-y-8 sm:px-4 lg:mt-0 lg:w-1/2">
            <div className="mt-2 flex items-center justify-between lg:mt-0">
              <div className="h-6 w-36 animate-pulse rounded-full bg-gray-200" />
              <div className="h-6 w-12 animate-pulse rounded-full bg-gray-200" />
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="h-6 w-28 animate-pulse rounded-xl bg-gray-200" />
              <div className="h-6 w-28 animate-pulse rounded-xl bg-gray-200" />
              <div className="h-6 w-28 animate-pulse rounded-xl bg-gray-200" />
            </div>
            <div className="mt-16">
              <div className="h-12 w-full animate-pulse rounded-xl bg-gray-200" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-4 w-16 animate-pulse rounded-full bg-gray-200" />
              <div className="h-4 w-72 animate-pulse rounded-full bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
