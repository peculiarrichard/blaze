import React from "react";
import { IconType } from "react-icons";

interface FeaturesProps {
  icon: IconType;
  title: string;
  description: string;
}
export const Features: React.FC<FeaturesProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <>
      <div className="flex flex-col gap-y-3 w-full lg:w-[17rem]">
        <div className="flex gap-3 items-center">
          <div className="bg-green-200 border-green-300 p-3 rounded-full text-white">
            {React.createElement(icon, { size: 20 })}
          </div>
          <p className="text-green-900 font-bold text-base">{title}</p>
        </div>
        <p className="text-paragraph-400 text-ss">{description}</p>
      </div>
    </>
  );
};
