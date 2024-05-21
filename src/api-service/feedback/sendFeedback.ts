import { fetchWrapper } from "@/helpers/fetchWrapperFunction";
import { FeedbackFormProps } from "@/models/api/feedback/Feedback";
import { ToastOption } from "@/models/props/commons/toastOption";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const sendFeedback = async (
  values: FeedbackFormProps,
  setLoading: (value: boolean) => void,
  setErrMsg: (value: string) => void,
  onOpen: () => void
) => {
  if (!values.rating) {
    setErrMsg("Please select a rating");
    return;
  }

  setLoading(true);
  try {
    const url = "/api/feedback/";
    const response = await fetchWrapper(url, "POST", values);
    onOpen();
    return response;
  } catch (err: any) {
    setErrMsg(err.message || "Something went wrong");
    console.error(err);
  } finally {
    setLoading(false);
  }
};
