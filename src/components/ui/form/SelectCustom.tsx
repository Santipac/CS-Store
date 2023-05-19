import React from "react";
import type { Option, ProductForm } from "@/interfaces/form";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/primitives/select";
import { Label } from "../primitives/label";
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
  listOptions: Option[];
  register: UseFormRegister<ProductForm>;
  errors: FieldErrors<ProductForm>;
}

export const SelectCustom: React.FC<Props> = ({
  label,
  name,
  listOptions,
  required,
  register,
  errors,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-gray-600">
        {label} {required && <span className="label-text text-red-500">*</span>}
      </Label>
      <Select required={required} {...register(name)}>
        <SelectTrigger className="w-full bg-slate-50 text-gray-800">
          <SelectValue placeholder="Pick One" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {listOptions.map((option, i) => (
              <SelectItem
                key={i}
                value={option.value}
                className="text-gray-800"
              >
                {option.description}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="mt-1">
        {errors[name] && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <span className="text-xs font-semibold text-red-500">
                {message}
              </span>
            )}
          />
        )}
      </div>
    </div>
    // <div className="form-control w-full">
    //   <label className="label">
    //     <span className="label-text text-gray-600">{label}</span>
    //
    //   </label>
    //   <select
    //     className="select-bordered select bg-slate-50 text-black"
    //     {...register(name)}
    //   >
    //     {listOptions.map((option, i) => (
    //       <option key={i} value={option.value} className="text-black">
    //         {option.description}
    //       </option>
    //     ))}
    //   </select>
    //
    // </div>
  );
};
