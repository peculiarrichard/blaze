import { fetchWrapper } from "@/helpers/fetchWrapperFunction";
import { ToastOption } from "@/models/props/commons/toastOption";
import { AllContactsInterface } from "@/models/api/contacts/allContacts";

export const deleteContactService = async (
  _id: string,
  toast: (value: ToastOption) => void,
  setLoading: (value: boolean) => void,
  setErrMsg: (value: string) => void,
  contacts: AllContactsInterface[],
  setContacts: (value: React.SetStateAction<AllContactsInterface[]>) => void,
  onClose: () => void
) => {
  try {
    setLoading(true);
    const url = "/api/contacts/delete";
    const res = await fetchWrapper(url, "DELETE", { _id });
    toast({
      title: res.message,
      description: res.message,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    const newContacts = contacts.filter((contact) => contact._id !== _id);
    setContacts(newContacts);
    onClose();
    return res;
  } catch (error: any) {
    setErrMsg(error.message || "Something went wrong");
    console.error(error);
  } finally {
    setLoading(false);
  }
};
