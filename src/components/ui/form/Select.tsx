import React from "react";
import type { Option, ProductForm } from "@/interfaces/form";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

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

export const Select: React.FC<Props> = ({
  label,
  name,
  listOptions,
  required,
  register,
  errors,
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
        {listOptions.map((option, i) => (
          <option key={i} value={option.value} className="text-black">
            {option.description}
          </option>
        ))}
      </select>
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
  );
};
