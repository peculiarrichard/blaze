import { fetchWrapper } from "@/helpers/fetchWrapperFunction";
import { AllGeneratedText } from "@/models/api/aigenerate/aigeneratedtextmodel";

export async function getAllGeneratedTexts(): Promise<AllGeneratedText[]> {
  try {
    const url = "/api/generate/getTexts";
    const res = await fetchWrapper(url, "GET");
    return res.userAiGeneratedTexts;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
