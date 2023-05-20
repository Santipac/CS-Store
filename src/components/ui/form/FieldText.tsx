/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../primitives/form";
import { Input } from "../primitives/input";
import type { ProductForm } from "@/interfaces/form";
import type { UseFormReturn } from "react-hook-form";

interface Props {
  required: boolean;
  name:
    | "name"
    | "type"
    | "tradelock"
    | "description"
    | "price"
    | "inStock"
    | "float"
    | "statTrak"
    | "wear";
  label: string;
  placeholder?: string;
  form: UseFormReturn<ProductForm, any>;
}

export const FieldText: React.FC<Props> = ({
  form,
  required,
  label,
  name,
  placeholder,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              className="bg-slate-50"
              type="text"
              placeholder={placeholder}
              {...form.register(name)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
