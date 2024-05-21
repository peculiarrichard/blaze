import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { UserInterface } from "@/models/api/auth/userModel";
import { ToastOption } from "@/models/props/commons/toastOption";
import { registrationValidationSchema } from "@/validations/registrationValidation";
import * as Yup from "yup";

export const registerUser = async (
  values: UserInterface,
  setLoading: (value: boolean) => void,
  setErrorMsg: (msg: string) => void,
  router: AppRouterInstance,
  toast: (val: ToastOption) => void,
  setFormErrors: (errors: { [key: string]: string }) => void
) => {
  try {
    await registrationValidationSchema.validate(values, {
      abortEarly: false,
    });

    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (res.ok) {
      toast({
        title: data.message,
        description: data.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push("/login");
    } else {
      setErrorMsg(data.message);
    }
    return data;
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
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
    console.error(err);
  } finally {
    setLoading(false);
  }
};
