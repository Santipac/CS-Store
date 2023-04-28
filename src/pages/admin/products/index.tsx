import React from "react";
import NextLink from "next/link";
import type { NextPage } from "next";

import { requireBeAdmin } from "@/common/HOFs/requireBeAdmin";
const ProductsAdminPage: NextPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <NextLink href="/admin/products/create" className="btn">
        Create Product
      </NextLink>
    </div>
  );
};

export const getServerSideProps = requireBeAdmin(async (_ctx) => {
  return { props: {} };
});
export default ProductsAdminPage;
