import React, { useState } from "react";
import { Navbar } from "@/components";
import { prisma } from "@/server/db";
import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { api } from "@/utils/api";
import { formatPriceToActualCurrency } from "@/helpers/currency";
import NextLink from "next/link";
import { ssgHelper } from "@/server/api/ssgHelper";
import { ShopLayout } from "@/components/layouts/ShopLayout";
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
      <section className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950">
        <h2 className="text-xl font-medium text-gray-300">
          Something went wrong with this product. Please comeback later.
        </h2>
        <NextLink href="/" className="text-gray-400 underline">
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
    <ShopLayout
      title="CS Store - Product Page"
      description={`Product page for ${product.name}`}
    >
      <div className="mt-8 flex max-w-7xl flex-col bg-slate-900 lg:flex-row">
        <div className="relative flex min-h-[40vh] w-full items-center  justify-center rounded-md bg-slate-800 lg:w-1/2">
          <Image
            src={product.image}
            alt="Product Image"
            width={360}
            height={200}
            className="object-fill"
            priority
          />
          {product.statTrak && (
            <span className="absolute right-0 top-0 mr-2 mt-2 rounded-full bg-amber-700 px-2 py-1 text-xs font-medium text-white">
              StatTrak™
            </span>
          )}
        </div>
        <div className="flex w-full flex-col justify-between space-y-4 p-4 lg:w-1/2">
          <div className="mt-2 flex items-center justify-between lg:mt-0">
            <h2 className="text-lg font-medium text-gray-200 sm:text-xl">
              {product.name}
            </h2>
            <h2 className="text-lg font-semibold text-blue-400 sm:text-xl">
              {formatPriceToActualCurrency(product.price)}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {product.wear && product.wear !== "-" && (
              <span className="text-md font-medium text-gray-400">
                {product.wear}
              </span>
            )}
          </div>
          {!product.float || product.float === 0 ? null : (
            <span className="text-sm font-medium text-gray-400 ">
              Float: <span className="text-blue-400">{product.float}</span>
            </span>
          )}
          <span className="text-md font-medium text-gray-400">
            Tradelock:{" "}
            <span className="text-emerald-400">{product.tradelock}</span>
          </span>
          {product.inStock === 0 ? (
            <span className="text-red-500">
              We don&apos;t have stock for this product{" "}
            </span>
          ) : (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                {" "}
                <h2 className="font-regular text-md text-gray-200">Quantity</h2>
                <span className="mt-1 text-sm font-medium text-gray-500">
                  ({product.inStock}) in stock
                </span>
              </div>
              <div className="flex items-center space-x-5">
                <button
                  onClick={decrement}
                  className="font-semibold text-gray-300"
                >
                  -
                </button>
                <p className="rounded-full bg-slate-800 px-2 py-1 text-blue-400 ">
                  {quantity}
                </p>
                <button
                  onClick={increment}
                  className="font-semibold text-gray-300"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div className="w-full">
            <button
              className="h-12 w-full rounded border-none bg-slate-950 font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-900 disabled:text-gray-600"
              disabled={product.inStock === 0}
              onClick={() => {
                AddProduct({ ...product, quantity });
                setQuantity(1);
              }}
            >
              Add to Cart
            </button>
          </div>

          {product.description && (
            <div className="flex flex-col">
              <h2 className="text-md font-medium text-gray-700">Description</h2>
              <p className="font-regular text-sm text-gray-500">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </ShopLayout>
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
  const ssg = ssgHelper();
  await ssg.product.getProductBySlug.prefetch({ slug });
  return {
    props: { slug },
  };
};

const ProductSkeleton = () => {
  return (
    <section className="min-h-screen bg-slate-950">
      <Navbar />
      <div className="flex h-full w-full justify-center">
        <div className="mt-8 flex w-11/12 flex-col md:w-3/4 lg:flex-row">
          <div className="flex min-h-[40vh] w-full animate-pulse items-center justify-center rounded-3xl bg-slate-900 lg:w-1/2 " />
          <div className="mt-4 flex w-full flex-col space-y-8 sm:px-4 lg:mt-0 lg:w-1/2">
            <div className="mt-2 flex items-center justify-between lg:mt-0">
              <div className="h-6 w-36 animate-pulse rounded-full bg-slate-800" />
              <div className="h-6 w-12 animate-pulse rounded-full bg-slate-800" />
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="h-6 w-28 animate-pulse rounded-xl bg-slate-800" />
              <div className="h-6 w-28 animate-pulse rounded-xl bg-slate-800" />
              <div className="h-6 w-28 animate-pulse rounded-xl bg-slate-800" />
            </div>
            <div className="mt-16">
              <div className="h-12 w-full animate-pulse rounded-xl bg-slate-800" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-4 w-16 animate-pulse rounded-full bg-slate-800" />
              <div className="h-4 w-72 animate-pulse rounded-full bg-slate-800" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
