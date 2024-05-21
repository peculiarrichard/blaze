import React from "react";
import { TextAreaProps } from "@/models/props/form-elements/TextAreaProps";

export const TextAreaInput: React.FC<TextAreaProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="mb-4 text-gray-900 w-full">
      <label
        className="block text-sm font-[500] mb-2 leading-normal text-paragraph-200"
        htmlFor={name}>
        {label}
      </label>
      <div
        className={`bg-white border-gray-200 flex items-center justify-between border rounded-[0.5rem] w-full py-[0.875rem] px-[0.75rem] text-gray-700`}>
        <div className="flex items-center gap-1 w-full">
          <textarea
            className="bg-transparent focus:outline-none appearance-none text-gray-900 w-full"
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            maxLength={500}
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};
