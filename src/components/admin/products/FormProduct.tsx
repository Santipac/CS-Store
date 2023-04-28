import React, { useEffect, useState } from "react";
import { InputNumber, InputText, Select } from "@/components/ui";
import { statTrak, type, wear } from "@/constants/product";
import { type ProductForm } from "@/interfaces/form";
import { useForm } from "react-hook-form";
import { useFileSelected } from "./helpers";
import { api } from "@/utils/api";
import Image from "next/image";
interface Input {
  file: undefined | File;
}
const initialInput = {
  file: undefined,
};
export const FormProduct = () => {
  const [preview, setPreview] = useState<string>("");
  const [input, setInput] = useState<Input>(initialInput);
  const [error, setError] = useState<string>("");
  const { handleFileSelect, handleImageUpload } = useFileSelected({
    input,
    setInput,
    setError,
  });
  const { register, handleSubmit } = useForm<ProductForm>();

  const { mutateAsync: createProduct } =
    api.product.createProduct.useMutation();

  const onDeleteLocalImage = () => {
    setPreview("");
    setInput(initialInput);
  };

  useEffect(() => {
    if (!input.file) return;
    const objectUrl = URL.createObjectURL(input.file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [input.file]);

  const onSubmit = async (data: ProductForm) => {
    const key = await handleImageUpload();
    if (!key) throw new Error("The key does not exist");

    await createProduct({
      ...data,
      image: key,
      name: data.name,
      float: Number(data.float),
      inStock: Number(data.inStock),
      price: Number(data.price),
      tradelock: data.tradelock,
      type: data.type,
    });
  };

  return (
    <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-1/2 flex-col space-y-4">
        <InputText
          name="name"
          label="Name"
          register={register}
          type="text"
          required
        />
        <InputText
          name="tradelock"
          label="Tradelock"
          register={register}
          type="text"
          required
        />

        <div className="flex w-full  space-x-2">
          <InputNumber
            name="price"
            label="Price"
            register={register}
            required
          />
          <InputNumber
            name="inStock"
            label="In Stock"
            register={register}
            required
          />
        </div>
        <Select
          label="Type"
          name="type"
          listOptions={type}
          register={register}
          required
        />
        <InputText
          name="float"
          label="Float"
          type="text"
          register={register}
          required={false}
        />

        <div className="flex w-full space-x-2">
          <Select
            label="Wear"
            name="wear"
            listOptions={wear}
            register={register}
            required={false}
          />

          <Select
            label="StatTrak™"
            name="statTrak"
            listOptions={statTrak}
            register={register}
            required={false}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-gray-600">Description</span>
          </label>
          <textarea
            className="textarea-bordered textarea h-24 bg-slate-50 text-black"
            placeholder="Description of the product"
            {...register("description")}
          ></textarea>
        </div>
      </div>
      <div className="flex w-1/2 flex-col">
        {preview ? (
          <div className="flex flex-col">
            <Image src={preview} width={250} height={150} alt="Product Image" />
            <button
              onClick={onDeleteLocalImage}
              className="btn-block btn mt-4 border-none bg-red-500 text-white hover:bg-red-900"
            >
              Delete Image
            </button>
          </div>
        ) : (
          <input
            type="file"
            className="file-input w-full cursor-pointer"
            onChange={handleFileSelect}
            accept="image/jpeg image/png image/jpg"
          />
        )}

        <button type="submit" className="btn-block btn mt-4">
          Submit
        </button>
      </div>
    </form>
  );
};
