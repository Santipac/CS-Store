import React from "react";
import type { FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  name: string;
  type: string;
  required: boolean;
  register: UseFormRegister<FieldValues>;
}

export const InputText: React.FC<Props> = ({
  name,
  type,
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
