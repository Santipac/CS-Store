import React, { useEffect, useState } from "react";
import { InputNumber, InputText, Select, Spinner } from "@/components/ui";
import { statTrak, type, wear } from "@/constants/product";
import { type ProductForm } from "@/interfaces/form";
import { useForm } from "react-hook-form";
import { useFileSelected } from "./helpers";
import { api } from "@/utils/api";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormValidation } from "@/common/validation/product";
import { ErrorMessage } from "@hookform/error-message";
import { Toaster, toast } from "react-hot-toast";
interface Input {
  file: undefined | File;
}
const initialInput = {
  file: undefined,
};
export const FormProduct = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>("");
  const [input, setInput] = useState<Input>(initialInput);
  const [error, setError] = useState<string>("The image is required");
  const { handleFileSelect, handleImageUpload } = useFileSelected({
    input,
    setInput,
    setError,
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProductForm>({ resolver: zodResolver(productFormValidation) });
  const { mutateAsync: createProduct } =
    api.product.createProduct.useMutation();
  const onDeleteLocalImage = () => {
    setPreview("");
    setInput(initialInput);
  };

  useEffect(() => {
    if (!input.file) return setError("The image is required");
    const objectUrl = URL.createObjectURL(input.file);
    setPreview(objectUrl);
    setError("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [input.file]);

  const onSubmit = async (data: ProductForm) => {
    try {
      setIsLoading(true);
      const key = await handleImageUpload();
      if (!key) {
        setError("Image upload failed. Please try again");
        return;
      }
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
      toast.success("Producto created successfully", { duration: 2000 });
      setPreview("");
      setInput(initialInput);
      reset();
      setIsLoading(false);
    } catch (error) {
      toast.error("Error creating product. Please try again");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <form
        className="flex flex-col gap-4 md:flex-row"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full  flex-col space-y-4 md:w-1/2">
          <InputText
            name="name"
            label="Name"
            register={register}
            type="text"
            required
            errors={errors}
          />

          <InputText
            name="tradelock"
            label="Tradelock"
            register={register}
            type="text"
            required
            errors={errors}
          />

          <div className="flex w-full  space-x-2">
            <InputNumber
              name="price"
              label="Price"
              register={register}
              required
              errors={errors}
            />
            <InputNumber
              name="inStock"
              label="In Stock"
              register={register}
              required
              errors={errors}
            />
          </div>
          <Select
            label="Type"
            name="type"
            listOptions={type}
            register={register}
            required
            errors={errors}
          />
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-gray-600">Float</span>
            </label>
            <input
              type="number"
              min={0}
              step="0.0000000001"
              placeholder="1"
              className="input-bordered input w-full  bg-slate-50 text-black"
              {...register("float")}
            />
            <div className="mt-1">
              {errors["float"] && (
                <ErrorMessage
                  errors={errors}
                  name="float"
                  render={({ message }) => (
                    <span className="text-xs font-semibold text-red-500">
                      {message}
                    </span>
                  )}
                />
              )}
            </div>
          </div>

          <div className="flex w-full space-x-2">
            <Select
              label="Wear"
              name="wear"
              listOptions={wear}
              register={register}
              required={false}
              errors={errors}
            />

            <Select
              label="StatTrak™"
              name="statTrak"
              listOptions={statTrak}
              register={register}
              required={false}
              errors={errors}
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
        <div className="flex w-full  flex-col md:w-1/2">
          {preview ? (
            <div className="flex flex-col">
              <Image
                src={preview}
                width={250}
                height={150}
                alt="Product Image"
              />
              <button
                onClick={onDeleteLocalImage}
                className="btn-block btn mt-4 border-none bg-red-500 text-white hover:bg-red-900"
              >
                Delete Image
              </button>
            </div>
          ) : (
            <>
              <input
                type="file"
                className="file-input w-full cursor-pointer bg-slate-50"
                onChange={handleFileSelect}
                accept="image/jpeg image/png image/jpg"
              />
            </>
          )}
          <p className="mt-2 text-red-500">{error}</p>
          <button
            type="submit"
            className="btn-block btn mt-4 border-none  text-white disabled:cursor-not-allowed disabled:bg-black disabled:text-gray-400"
            disabled={!isValid || error.length > 0 || isLoading}
          >
            {isLoading ? (
              <Spinner
                width="w-8"
                height="h-8"
                fill="fill-gold"
                colorText="text-white"
              />
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
    </>
  );
};
