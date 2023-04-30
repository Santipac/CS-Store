import type { ProductForm } from "@/interfaces/form";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";

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
  errors: FieldErrors<ProductForm>;
}

export const InputText: React.FC<Props> = ({
  label,
  name,
  type,
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
      <input
        type={type}
        placeholder="Type here"
        className="input-bordered input w-full bg-slate-50 text-black"
        {...register(name)}
      />
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
