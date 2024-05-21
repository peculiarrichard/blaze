"use client";
import { PageTitle } from "@/components/commons/PageTitle";
import { ScheduleForm } from "@/components/commons/ScheduleForm";
import TopBar from "@/components/navigation/Topbar";

const ScheduleMessages: React.FC = () => {
  return (
    <>
      <TopBar title="Schedule Messages" />
      <PageTitle text="Schedule messages with romantic content to your lover" />
      <ScheduleForm />
    </>
  );
};

export default ScheduleMessages;
