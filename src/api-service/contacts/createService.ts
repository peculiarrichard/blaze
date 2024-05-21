import { fetchWrapper } from "@/helpers/fetchWrapperFunction";
import { ContactInterface } from "@/models/api/contacts/contactModel";
import { ToastOption } from "@/models/props/commons/toastOption";
import { createContactValidationSchema } from "@/validations/addContactValidation";
import * as Yup from "yup";
import { AllContactsInterface } from "@/models/api/contacts/allContacts";
export const createContactService = async (
  values: ContactInterface,
  setLoading: (value: boolean) => void,
  onClose: () => void,
  toast: (val: ToastOption) => void,
  setErrMsg: (value: string) => void,
  setFormErrors: (errors: { [key: string]: string }) => void,
  setContacts: React.Dispatch<React.SetStateAction<AllContactsInterface[]>>
) => {
  try {
    await createContactValidationSchema.validate(values, {
      abortEarly: false,
    });
    setLoading(true);
    const url = "/api/contacts/create";
    const res = await fetchWrapper(url, "POST", values);
    if (res) {
      toast({
        title: res.message,
        description: res.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      setContacts((prev: AllContactsInterface[]) => [res.contact, ...prev]);
    } else {
      setErrMsg(res.error);
    }
    return res;
  } catch (err: any) {
    if (err.name === "ValidationError") {
      const validationErrors: { [key: string]: string } = {};
      (err.inner as Array<Yup.ValidationError>).forEach((e) => {
        if (e.path) {
          validationErrors[e.path] = e.errors[0];
        }
      });
      setFormErrors(validationErrors);
    } else {
      setErrMsg(err.message || "Something went wrong. Please try again.");
    }
    console.error(err);
  } finally {
    setLoading(false);
  }
};
