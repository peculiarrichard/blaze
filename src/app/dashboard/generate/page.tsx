"use client";
import { PageTitle } from "@/components/commons/PageTitle";
import TopBar from "@/components/navigation/Topbar";
import { Prompt } from "@/components/aigenerate/Prompt";

const Generate: React.FC = () => {
  return (
    <>
      <TopBar title="AI Love Messages Generator" />
      <PageTitle text="Have words failed you? Use our in-built AI to generate the best" />
      <Prompt />
    </>
  );
};

export default Generate;
