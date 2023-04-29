import type { ProductForm } from "@/interfaces/form";
import React from "react";
import type { UseFormRegister } from "react-hook-form";

interface Props {
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
  minValue?: number;
  required: boolean;
  register: UseFormRegister<ProductForm>;
}
export const InputNumber: React.FC<Props> = ({
  label,
  name,
  minValue,
  required,
  register,
}) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text text-gray-600">{label}</span>
        {required && (
          <span className="label-text text-red-500">Required *</span>
        )}{" "}
      </label>
      <input
        type="number"
        min={minValue || 0}
        placeholder="1"
        className="input-bordered input w-full  bg-slate-50 text-black"
        {...register(name)}
      />
    </div>
  );
};
