import React from "react";
import { SelectInputProps } from "@/models/props/form-elements/SelectInputProps";

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  options,
  placeholder,
  iconAsButton,
  onChange,
  value,
}) => {
  return (
    <div className="mb-4 w-full">
      <label
        className="block text-paragraph-200 text-sm font-[500] mb-2 leading-normal"
        htmlFor={name}>
        {label}
      </label>
      <div className="bg-white border-gray-200 flex items-center justify-between border rounded-[0.5rem] w-full py-[0.875rem] px-[0.75rem] text-gray-700">
        <select
          className="bg-transparent focus:outline-none focus:shadow-outline appearance-none text-paragraph-300 w-full"
          id={name}
          name={name}
          value={value}
          onChange={onChange}>
          {placeholder && (
            <option value={placeholder} disabled>
              {placeholder}
            </option>
          )}
          {options.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {React.createElement(iconAsButton, { size: 25 })}
      </div>
    </div>
  );
};
