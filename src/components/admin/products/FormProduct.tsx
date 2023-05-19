import React, { useEffect, useState } from "react";
import { SelectCustom, Spinner } from "@/components/ui";
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
import { Label } from "@/components/ui/primitives/label";
import { Input } from "@/components/ui/primitives/input";
import { Textarea } from "@/components/ui/primitives/textarea";
import { Button } from "@/components/ui/primitives/button";
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
      toast.success("Product created successfully", { duration: 2000 });
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
        <div className="flex w-full  flex-col space-y-2 md:w-1/2">
          <Label htmlFor="name" className="text-gray-600">
            Name <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            {...register("name")}
            required
            className="bg-slate-50 text-gray-800"
          />
          <div className="mt-1">
            {errors["name"] && (
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <span className="text-xs font-semibold text-red-500">
                    {message}
                  </span>
                )}
              />
            )}
          </div>
          <div className="flex w-full  flex-col space-y-2 ">
            <Label htmlFor="tradelock" className="text-gray-600">
              Tradelock <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              {...register("tradelock")}
              required
              className=" bg-slate-50 text-gray-800"
            />
            <div className="mt-1">
              {errors["tradelock"] && (
                <ErrorMessage
                  errors={errors}
                  name="tradelock"
                  render={({ message }) => (
                    <span className="text-xs font-semibold text-red-500">
                      {message}
                    </span>
                  )}
                />
              )}
            </div>
          </div>

          <div className="flex w-full  space-x-2">
            <div className="flex w-full  flex-col space-y-2 ">
              <Label htmlFor="price" className="text-gray-600">
                Price <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                {...register("price")}
                required
                className=" bg-slate-50 text-gray-800"
                min={0}
                placeholder="1"
              />
              <div className="mt-1">
                {errors["price"] && (
                  <ErrorMessage
                    errors={errors}
                    name="price"
                    render={({ message }) => (
                      <span className="text-xs font-semibold text-red-500">
                        {message}
                      </span>
                    )}
                  />
                )}
              </div>
            </div>
            <div className="flex w-full  flex-col space-y-2 ">
              <Label htmlFor="inStock" className="text-gray-600">
                Stock <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                {...register("inStock")}
                required
                className="bg-slate-50 text-gray-800"
                min={0}
                placeholder="1"
              />
              <div className="mt-1">
                {errors["inStock"] && (
                  <ErrorMessage
                    errors={errors}
                    name="inStock"
                    render={({ message }) => (
                      <span className="text-xs font-semibold text-red-500">
                        {message}
                      </span>
                    )}
                  />
                )}
              </div>
            </div>
          </div>
          <SelectCustom
            label="Type"
            name="type"
            listOptions={type}
            register={register}
            required
            errors={errors}
          />
          <div className="flex w-full  flex-col space-y-2 ">
            <Label htmlFor="float" className="text-gray-600">
              Float
            </Label>
            <Input
              type="number"
              {...register("float")}
              required
              className=" bg-slate-50 text-gray-800"
              min={0}
              placeholder="1"
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

          <section className="flex w-full space-x-2">
            <article className="w-1/2">
              <SelectCustom
                label="Wear"
                name="wear"
                listOptions={wear}
                register={register}
                required={false}
                errors={errors}
              />
            </article>

            <article className="w-1/2">
              <SelectCustom
                label="StatTrak™"
                name="statTrak"
                listOptions={statTrak}
                register={register}
                required={false}
                errors={errors}
              />
            </article>
          </section>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-600">
              Description
            </Label>
            <Textarea
              className="bg-slate-50 text-gray-800"
              placeholder="Description of the product"
              {...register("description")}
            />
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
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="image" className="text-gray-600">
                  Image
                </Label>
                <Input
                  id="image"
                  type="file"
                  onChange={handleFileSelect}
                  accept="image/jpeg image/png image/jpg"
                  className="w-full cursor-pointer bg-slate-50 file:text-gray-600 "
                />
              </div>
            </>
          )}
          <p className="mt-2 text-red-500">{error}</p>
          <Button
            type="submit"
            className="mt-4 border-none bg-black  text-white disabled:cursor-not-allowed disabled:bg-black disabled:text-gray-400"
            disabled={!isValid || error.length > 0 || isLoading}
          >
            {isLoading ? (
              <Spinner
                width="w-8"
                height="h-8"
                fill="fill-gray-600"
                colorText="text-white"
              />
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </>
  );
};
