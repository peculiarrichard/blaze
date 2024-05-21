import { fetchWrapper } from "@/helpers/fetchWrapperFunction";
import { ScheduleFormProps } from "@/models/api/schedule/scheduleModel";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ToastOption } from "@/models/props/commons/toastOption";
export const scheduleNewMessageService = async (
  values: ScheduleFormProps,
  setLoading: (value: boolean) => void,
  setErrMsg: (value: string) => void,
  router: AppRouterInstance,
  toast: (value: ToastOption) => void
) => {
  if (Object.keys(values).length === 0) {
    setErrMsg("Please fill all the fields");
    return;
  }
  setLoading(true);
  try {
    const url = "/api/schedule/scheduleNew";
    const response = await fetchWrapper(url, "POST", values);
    toast({
      title: "Success",
      description: response.message,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
    router.push("/dashboard")
    return response;
  } catch (err: any) {
    setErrMsg(err.message || "Something went wrong");
    console.error(err);
  } finally {
    setLoading(false);
  }
};
