import React from "react";
import { TextInputProps } from "@/models/props/form-elements/TextInputProps";

export const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  placeholder,
  hasButton = false,
  buttonName,
  type,
  hasleftIcon = false,
  leftIcon = null,
  hasIconAsButton = false,
  iconAsButton = null,
  onClick,
  hasDescription = false,
  description,
  value,
  onChange,
  readonly = false,
  min,
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
          {hasleftIcon && React.createElement(leftIcon, { size: 25 })}
          <input
            className="bg-transparent focus:outline-none appearance-none text-gray-900 w-full"
            id={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readonly}
            min={min}
          />
        </div>
        {hasButton && (
          <button
            type="button"
            onClick={onClick}
            className="text-ss font-bold text-right text-green-800">
            {" "}
            {hasIconAsButton
              ? React.createElement(iconAsButton, { size: 25 })
              : buttonName}{" "}
          </button>
        )}
      </div>
      <p className="text-sb leading-normal">{hasDescription && description}</p>
    </div>
  );
};
