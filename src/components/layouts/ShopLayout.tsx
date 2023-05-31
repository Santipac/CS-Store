import React, { Suspense } from "react";
import { Spinner } from "../ui";
import Head from "next/head";
import dynamic from "next/dynamic";
import NextLink from "next/link";
const Navbar = dynamic(() => import("@/components/ui/Navbar"), { ssr: false });
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
          <div className="flex w-full max-w-7xl flex-col px-4">{children}</div>
        </div>
      </main>
      <footer className="flex w-full flex-col items-center space-y-4 py-8">
        <h2 className="text-xl font-bold tracking-tighter">
          This is a side project, NOT a real ecommerce for CSGO Skins.
        </h2>
        <span className="text-sm font-medium text-gray-600">
          This project is developed by{" "}
          <NextLink
            href="https://github.com/Santipac"
            className="text-blue-600 underline"
          >
            Santiago
          </NextLink>
          .
        </span>
      </footer>
    </Suspense>
  );
};
