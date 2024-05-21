import React from "react";
import { sidebarItems } from "@/data/sidebar";
import Link from "next/link";
import Image from "next/image";
import { VscFeedback } from "react-icons/vsc";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { logoutUser } from "@/api-service/auth/logoutService";

export const SideBar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <aside
      className={`sidebar | fixed w-4/5 md:w-2/5 lg:w-[15rem] xl:w-[17.5rem] bg-white h-screen z-10 top-0 lg:left-0 pt-6 border-r-2 lg:flex flex-col gap-6 items-start px-2 ${
        isSidebarOpen ? "flex" : "hidden"
      }`}>
      <Link
        href="/dashboard"
        className="flex gap-x-2 items-center justify-center px-4">
        <Image src="/assets/logo.png" alt="logo" width={32} height={32} />
        <p className="text-header-300 text-[1.40975rem] font-semibold tracking-[-0.0423125rem]">
          Blaze
        </p>
      </Link>

      <ul className="flex flex-col justify-between gap-y-3 mt-1 mb-12 w-[90%]">
        {sidebarItems.map((item) => (
          <li key={item.id}>
            <Link
              href={item.path}
              className={`${
                pathname === item.path
                  ? "rounded-[0.375rem] border border-green-600 bg-green-700 text-green-800 font-[500]"
                  : "text-paragraph-100"
              } flex gap-x-3 items-center text-sm leading-[1.5rem] px-4 py-2`}
              data-testid={`sidebar-item-${item.id}`}>
              {" "}
              {React.createElement(item.icon, { size: 25 })}{" "}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex flex-col justify-between gap-y-4 w-[90%]">
        <Link
          href="/dashboard/feedback"
          className={`${
            pathname === "/dashboard/feedback"
              ? "rounded-[0.375rem] border border-green-600 bg-green-700 text-green-800 font-[500]"
              : "text-paragraph-100"
          } flex gap-x-3 items-center text-sm leading-[1.5rem] px-4 py-2`}
          data-testid="support-link">
          {" "}
          <VscFeedback size={25} /> <span>Feedback</span>
        </Link>
        <button
          className="flex gap-x-3 items-center text-sm text-paragraph-100 leading-[1.5rem] px-4"
          onClick={() => logoutUser(router)}>
          <RiLogoutCircleRLine size={25} /> Logout
        </button>
      </div>

      <div className="w-full flex gap-x-3 text-paragraph-100 text-ss px-2 border-t pt-1 items-start self-end">
        <FaRegUserCircle size={25} />
        <div>
          <p className="font-semibold text-paragraph-300">Contact Developer</p>
          <p className=" ">pecullozie@gmail.com</p>
        </div>
      </div>
    </aside>
  );
};
