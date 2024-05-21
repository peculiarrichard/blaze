import { fetchWrapper } from "@/helpers/fetchWrapperFunction";
import { AllContactsInterface } from "@/models/api/contacts/allContacts";

export async function getAllContactsService(): Promise<AllContactsInterface[]> {
  try {
    const url = "/api/contacts/getAll";
    const res = await fetchWrapper(url, "GET");
    return res.userContacts;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
