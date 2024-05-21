import { fetchWrapper } from "@/helpers/fetchWrapperFunction";
import { AllMessages } from "@/models/api/schedule/allMessages";

export async function getAllScheduledMessages(): Promise <AllMessages[]> {
  try {
    const url = "/api/schedule/getAllMessages";
    const res = await fetchWrapper(url, "GET");
    return res.userMessages;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
