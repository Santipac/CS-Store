import React from "react";
import NextLink from "next/link";
import { InputNumber, InputText, Select } from "@/components";
import { statTrak, type, wear } from "@/constants/product";
import { requireBeAdmin } from "@/common/HOFs/requireBeAdmin";
import { type FieldValues, useForm } from "react-hook-form";
import type { NextPage } from "next";

const CreateProductPage: NextPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log({ data });
  };

  return (
    <main className="flex min-h-screen justify-center bg-slate-100">
      <div className="flex  w-11/12 flex-col space-y-8 py-6 md:w-3/4">
        <NextLink
          href="/admin/products"
          className="link font-semibold text-gray-600"
        >
          Back to Products
        </NextLink>
        <h2 className="text-4xl font-bold text-gray-800">Create Product</h2>
        <div className="h-full w-full">
          <form className="flex" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-1/2 flex-col space-y-6">
              <InputText
                name="name"
                register={register}
                required={true}
                type="text"
              />
              <InputText
                name="description"
                register={register}
                required={false}
                type="text"
              />
              <InputNumber
                name="price"
                register={register}
                required={true}
                minValue={1}
              />
              <InputNumber
                name="In Stock"
                register={register}
                required={true}
                minValue={0}
              />
              <Select
                name="Type"
                listOptions={type}
                required={true}
                register={register}
              />
              <div className="flex space-x-4">
                <Select
                  name="StatTrak™"
                  listOptions={statTrak}
                  required={false}
                  register={register}
                />
                <Select
                  name="Wear"
                  listOptions={wear}
                  required={false}
                  register={register}
                />
              </div>
            </div>
            <div>
              <button type="submit" className="btn ml-4 mt-3">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps = requireBeAdmin(async (_ctx) => {
  return { props: {} };
});
export default CreateProductPage;
