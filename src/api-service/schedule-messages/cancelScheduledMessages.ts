import { fetchWrapper } from "@/helpers/fetchWrapperFunction";
import { ToastOption } from "@/models/props/commons/toastOption";

export const cancelScheduledMessages = async (
  messageId: string,
  toast: (value: ToastOption) => void,
  setLoading: (value: boolean) => void,
  setErrMsg: (value: string) => void,
  onClose: () => void
) => {
  setLoading(true);
  try {
    const url = `/api/schedule/cancelScheduledJob`;
    const response = await fetchWrapper(url, "POST", { messageId });
    toast({
      title: "Success",
      description: response.message,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  } catch (err: any) {
    setErrMsg(err.message || "Something went wrong");
    console.error(err);
  } finally {
    setLoading(false);
  }
};
