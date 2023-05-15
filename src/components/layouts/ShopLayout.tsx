import React, { Suspense } from "react";
import { Spinner, Navbar } from "../ui";
import Head from "next/head";

interface Props {
  children: JSX.Element | JSX.Element[];
  title: string;
  description: string;
}

export const ShopLayout: React.FC<Props> = ({
  children,
  title,
  description,
}) => {
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
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="flex h-full w-full justify-center">
          <div className="flex w-full flex-col px-4 md:w-3/4">{children}</div>
        </div>
      </main>
    </Suspense>
  );
};
