import type { ProductForm } from "@/interfaces/form";
import React from "react";
import type { UseFormRegister } from "react-hook-form";

interface Props {
  label: string;
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
  type: string;
  required: boolean;
  register: UseFormRegister<ProductForm>;
}

export const InputText: React.FC<Props> = ({
  label,
  name,
  type,
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
      <input
        type={type}
        placeholder="Type here"
        className="input-bordered input w-full bg-slate-50 text-black"
        {...register(name)}
      />
    </div>
  );
};
