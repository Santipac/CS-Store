import React from "react";
import { Navbar } from "@/components";
import { s3 } from "@/lib/s3";
import { prisma } from "@/server/db";
import type { Product } from "@prisma/client";
import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";

interface Props {
  product: Product;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  return (
    <section className="min-h-screen bg-white">
      <Navbar />
      <div className="flex h-full w-full justify-center">
        <div className="mt-8 flex w-11/12 flex-col md:w-3/4 lg:flex-row">
          <div className="flex min-h-[40vh] w-full items-center justify-center  rounded-md bg-gray-200 lg:w-1/2">
            <Image
              src={product.image}
              alt="Product Image"
              width={350}
              height={200}
              className="object-contain"
            />
          </div>
          <div className="flex w-full flex-col space-y-4 px-4 lg:w-1/2">
            <div className="flex items-center">
              <h2 className="text-xl font-medium text-black">{product.name}</h2>
              {product.statTrak && (
                <span className="ml-2 inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-sm font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20">
                  StakTrak
                </span>
              )}
            </div>
            <div>
              {product.wear && product.wear !== "-" && (
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                  {product.wear}
                </span>
              )}
            </div>

            {!product.float || product.float === 0 ? null : (
              <div>
                <span className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-1 text-sm font-medium text-zinc-700 ring-1 ring-inset ring-zinc-600/20">
                  Float: {product.float}
                </span>
              </div>
            )}

            <div>
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                TradeLock: {product.tradelock}
              </span>
            </div>
            <div className="w-full">
              <button
                className="btn-block btn cursor-not-allowed border-none bg-zinc-800 font-medium text-white disabled:bg-zinc-800 disabled:text-white"
                disabled
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
  const products = await prisma.product.findMany({ select: { id: true } });
  if (!products) return { paths: [], fallback: false };
  // Generar las rutas para cada ID de producto
  const paths = products.map((product) => ({
    params: { id: product.id },
  }));
  // Devolver las rutas pre-generadas
  return { paths, fallback: false };
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id = "" } = params as { id: string };
  const productDB = await prisma.product.findFirst({
    where: { id },
    select: {
      createdAt: false,
      _count: false,
      updatedAt: false,
      id: true,
      name: true,
      wear: true,
      type: true,
      description: true,
      float: true,
      statTrak: true,
      image: true,
      price: true,
      inStock: true,
      tradelock: true,
      OrderItem: true,
    },
  });
  if (!productDB) {
    return {
      props: {},
    };
  }
  const imageUrl = await s3.getSignedUrlPromise("getObject", {
    Bucket: "cs-store-arg",
    Key: productDB.image,
  });
  const product = { ...productDB, image: imageUrl };

  return {
    props: { product },
  };
};

export default ProductPage;
