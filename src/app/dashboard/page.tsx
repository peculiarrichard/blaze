"use client";
import TopBar from "@/components/navigation/Topbar";
import { useUser } from "@/context/UserContext";
import { MessagesTable } from "@/components/dashboard-home/MessagesTable";

const DashBoard: React.FC = () => {
  const user = useUser();
  return (
    <>
      <TopBar title={`Welcome back, ${user?.firstName}!`} />
      <MessagesTable />
    </>
  );
};

export default DashBoard;
