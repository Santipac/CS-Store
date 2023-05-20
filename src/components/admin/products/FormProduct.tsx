import React, { useEffect, useState } from "react";
import Image from "next/image";
import { statTrak, type, wear } from "@/constants/product";
import { api } from "@/utils/api";
import { useForm } from "react-hook-form";
import { useFileSelected } from "./helpers";
import { Toaster, toast } from "react-hot-toast";
import { Input, Label, Textarea, Button } from "@/components/ui/primitives";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/primitives/form";
import { FieldText, FieldNumber, SelectCustom } from "@/components/ui/form";
import { Spinner } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormValidation } from "@/common/validation/product";
import type { ProductForm } from "@/interfaces/form";

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
  const [error, setError] = useState<string>("");
  const { handleFileSelect, handleImageUpload } = useFileSelected({
    input,
    setInput,
    setError,
  });
  const form = useForm<ProductForm>({
    resolver: zodResolver(productFormValidation),
  });
  const { mutateAsync: createProduct } =
    api.product.createProduct.useMutation();
  const onDeleteLocalImage = () => {
    setPreview("");
    setInput(initialInput);
  };

  useEffect(() => {
    if (!input.file) return setError("The image is always required");
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
      form.reset();
      setIsLoading(false);
    } catch (error) {
      toast.error("Error creating product. Please try again");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <Form {...form}>
        <form
          className="flex flex-col gap-4 md:flex-row"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex w-1/2 flex-col space-y-4">
            <div className="flex w-full  flex-col space-y-2 ">
              <FieldText name="name" label="Name" form={form} required />
            </div>
            <div className="flex w-full  flex-col space-y-2 ">
              <FieldText
                name="tradelock"
                label="Tradelock"
                form={form}
                placeholder="12/12/23"
                required
              />
            </div>
            <div className="flex w-full gap-2">
              <div className="flex w-full flex-col space-y-2 md:w-1/2">
                <FieldNumber
                  name="price"
                  label="Price"
                  form={form}
                  step="0.01"
                  required
                />
              </div>
              <div className="flex w-full flex-col space-y-2 md:w-1/2">
                <FieldNumber
                  name="inStock"
                  label="In Stock"
                  form={form}
                  step="0"
                  required
                />
              </div>
            </div>
            <SelectCustom
              label="Type"
              name="type"
              placeholder="Select Type of Item"
              listOptions={type}
              form={form}
              required
            />
            <div className="flex w-full flex-col space-y-2">
              <FieldNumber
                name="float"
                label="Float"
                form={form}
                step="0.0000001"
                required={false}
              />
            </div>
            <section className="flex w-full space-x-2">
              <article className="w-1/2">
                <SelectCustom
                  label="Wear"
                  name="wear"
                  listOptions={wear}
                  placeholder="Optional"
                  required={false}
                  form={form}
                />
              </article>

              <article className="w-1/2">
                <SelectCustom
                  label="StatTrak™"
                  name="statTrak"
                  placeholder="Optional"
                  listOptions={statTrak}
                  required={false}
                  form={form}
                />
              </article>
            </section>
            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add all the product information what you want"
                        className="bg-slate-50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex w-full flex-col md:w-1/2">
            {preview ? (
              <div className="flex flex-col">
                <Image
                  src={preview}
                  width={250}
                  height={150}
                  alt="Product Image"
                />
                <Button
                  onClick={onDeleteLocalImage}
                  className="mt-4 border-none bg-red-800 text-white  hover:bg-red-900 disabled:cursor-not-allowed disabled:bg-red-900 disabled:text-gray-300"
                >
                  Delete Image
                </Button>
              </div>
            ) : (
              <div className="grid w-full max-w-sm items-center space-y-2">
                <Label htmlFor="image" className="text-gray-600">
                  Image <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="image"
                  type="file"
                  onChange={handleFileSelect}
                  accept="image/jpeg image/png image/jpg"
                  className="w-full cursor-pointer bg-slate-50 file:text-gray-600 "
                />
                <p className="mt-2 text-sm text-red-500">{error}</p>
              </div>
            )}
            <Button
              type="submit"
              className="mt-4 border-none bg-black  text-white disabled:cursor-not-allowed disabled:bg-black disabled:text-gray-400"
              disabled={
                !form.formState.isValid || error.length > 0 || isLoading
              }
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
      </Form>
    </>
  );
};
