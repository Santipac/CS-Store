import React from "react";
import type { Option, ProductForm } from "@/interfaces/form";
import type { UseFormRegister } from "react-hook-form";

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
}

export const Select: React.FC<Props> = ({
  label,
  name,
  listOptions,
  required,
  register,
}) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text text-gray-600">{label}</span>
        {required && (
          <span className="label-text text-red-500">Required *</span>
        )}
      </label>
      <select
        className="select-bordered select bg-slate-50 text-black"
        {...register(name)}
      >
        <option disabled selected>
          Pick one
        </option>
        {listOptions.map((option, i) => (
          <option key={i} value={option.value} className="text-black">
            {option.description}
          </option>
        ))}
      </select>
    </div>
  );
};
