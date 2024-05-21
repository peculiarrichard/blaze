"use client";

import { SideBar } from "@/components/navigation/Sidebar";
import { useState } from "react";
import { MobileNav } from "@/components/navigation/MobileNav";
import { UserProvider } from "@/context/UserContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <main>
        <UserProvider>
          <MobileNav
            onToggleSidebar={handleToggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
          <SideBar isSidebarOpen={isSidebarOpen} />
          <div className="lg:ms-[15rem] xl:ms-[17.5rem] px-4 pt-5">
            {children}
          </div>
        </UserProvider>
      </main>
    </>
  );
}
