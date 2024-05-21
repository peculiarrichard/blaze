import React from "react";
import { RadioButtonProps } from "@/models/props/form-elements/RadioInputProps";
import { FaRegCheckCircle } from "react-icons/fa";

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  name,
  checked,
  value,
  onChange,
}) => {
  return (
    <>
      <label className={`cursor-pointer`}>
        <input
          type="radio"
          value={value}
          checked={checked}
          onChange={onChange}
          name={name}
          className="hidden"></input>
        <p
          className={`${
            checked ? "border-green-100" : "border-gray-100"
          } text-sm w-max text-center font-semibold text-paragraph-300 border-2 rounded-full p-3`}>
          {label}
        </p>
      </label>
    </>
  );
};
