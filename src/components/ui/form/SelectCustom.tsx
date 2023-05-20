/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { Option, ProductForm } from "@/interfaces/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/primitives/select";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../primitives/form";
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
  placeholder: string;
  listOptions: Option[];
  form: UseFormReturn<ProductForm, any>;
}

export const SelectCustom: React.FC<Props> = ({
  form,
  name,
  label,
  placeholder,
  listOptions,
  required,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className="bg-slate-50">
                <SelectValue
                  placeholder={placeholder}
                  className=" placeholder:text-gray-400"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {listOptions.map((option, i) => (
                <SelectItem key={i} value={option.value}>
                  {option.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
