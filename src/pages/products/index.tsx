import React from "react";
import Head from "next/head";
import { type NextPage } from "next";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { Navbar } from "@/components";
import { api } from "@/utils/api";
import Image from "next/image";
import NextLink from "next/link";
import { formatPriceToActualCurrency } from "@/helpers/currency";

const ProductsPage: NextPage = () => {
  const { data: products } = api.product.getProducts.useQuery();

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
          <Spinner
            width="w-12"
            height="h-12"
            colorText="text-gray-200"
            fill="fill-blue-600"
          />
        </div>
      }
    >
      <Head>
        <title>CS Store | Products Page</title>
        <meta name="description" content="Products Page of the CS Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="flex h-full w-full justify-center">
          <section className="grid min-h-[80vh] w-11/12 grid-cols-12 md:w-3/4">
            <div className="col-start-1 col-end-3 h-full rounded bg-gray-100"></div>
            <section className="col-start-3 col-end-13 px-4">
              {products === undefined || products.length === 0 ? (
                <div className="bg-white">
                  <div className="my-12">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                      We could not find any product available.
                    </h2>
                  </div>
                </div>
              ) : (
                <section className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {products.map((product) => (
                    <NextLink
                      href={`/products/${product.slug}`}
                      key={product.slug}
                    >
                      <div className="flex flex-col items-center pb-2 ">
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
                </section>
              )}
            </section>
          </section>
        </div>
      </main>
    </Suspense>
  );
};

export default ProductsPage;
