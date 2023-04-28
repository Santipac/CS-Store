import React from "react";
import type { FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  name: string;
  minValue?: number;
  required: boolean;
  register: UseFormRegister<FieldValues>;
}
export const InputNumber: React.FC<Props> = ({
  name,
  minValue,
  required,
  register,
}) => {
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text text-gray-600">{nameCapitalized}</span>
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
