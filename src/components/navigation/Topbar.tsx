import { HiMiniPlusCircle } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";

export default function TopBar({ title }: { title: string }) {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-start mt-20 lg:mt-0 lg:top-0 justify-between m-auto w-full">
        <p className="text-header-200 text-lg xl:text-xs font-semibold leading-[2.375rem] mb-2">
          {title}
        </p>
      </div>
    </>
  );
}
