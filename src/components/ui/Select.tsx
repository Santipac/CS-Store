import React from "react";
import type { Option } from "@/interfaces/form";
import type { FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  required: boolean;
  name: string;
  listOptions: Option[];
  register: UseFormRegister<FieldValues>;
}

export const Select: React.FC<Props> = ({
  name,
  listOptions,
  required,
  register,
}) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text text-gray-600">{name}</span>
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
