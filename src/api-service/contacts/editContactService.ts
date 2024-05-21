import { fetchWrapper } from "@/helpers/fetchWrapperFunction";
import { ToastOption } from "@/models/props/commons/toastOption";
import { AllContactsInterface } from "@/models/api/contacts/allContacts";

interface EditPayload {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export const editContactService = async (
  values: EditPayload,
  toast: (value: ToastOption) => void,
  setLoading: (value: boolean) => void,
  setErrMsg: (value: string) => void,
  onClose: () => void,
  contacts: AllContactsInterface[],
  setContacts: (value: React.SetStateAction<AllContactsInterface[]>) => void
) => {
  setLoading(true);
  try {
    const url = "/api/contacts/update";
    const res = await fetchWrapper(url, "PUT", values);
    toast({
      title: res.message,
      description: res.message,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    const newContacts = contacts.map((contact) => {
      if (contact._id === values._id) {
        return res.contact;
      }
      return contact;
    });
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
