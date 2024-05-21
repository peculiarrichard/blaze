"use client";
import { PageTitle } from "@/components/commons/PageTitle";
import TopBar from "@/components/navigation/Topbar";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";

const Feedback: React.FC = () => {
  return (
    <>
      <TopBar title="Give Feedback" />
      <PageTitle text="What do you think about this application?" />
      <FeedbackForm />
    </>
  );
};

export default Feedback;
