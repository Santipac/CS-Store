/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import NextLink from "next/link";
import { requireBeAdmin } from "@/common/HOFs/requireBeAdmin";
import { type NextPage } from "next";
import { FormProduct } from "@/components/admin/products/FormProduct";

const CreateProductPage: NextPage = () => {
  return (
    <main className="flex min-h-screen justify-center bg-slate-100">
      <div className="flex  w-11/12 flex-col space-y-8 py-6 lg:w-3/4">
        <NextLink
          href="/admin/products"
          className="link font-semibold text-gray-600"
        >
          Back to Products
        </NextLink>
        <h2 className="text-4xl font-bold text-gray-800">Create Product</h2>
        <div className="h-full w-full">
          <FormProduct />
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps = requireBeAdmin(async (_ctx) => {
  return { props: {} };
});
export default CreateProductPage;
