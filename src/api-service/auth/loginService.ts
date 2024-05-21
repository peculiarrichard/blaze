import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { LoginInterface } from "@/models/api/auth/loginModel";
import { loginValidationSchema } from "@/validations/loginValidation";
import { ToastOption } from "@/models/props/commons/toastOption";
import * as Yup from "yup";

export const loginUser = async (
  values: LoginInterface,
  router: AppRouterInstance,
  toast: (val: ToastOption) => void,
  setErrorMsg: (msg: string) => void,
  setLoading: (value: boolean) => void,
  setFormErrors: (errors: { [key: string]: string }) => void
) => {
  try {
    await loginValidationSchema.validate(values, {
      abortEarly: false,
    });
    setLoading(true);
    const res = await fetch("/api/auth/login", {
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
      if (typeof window !== "undefined") {
        localStorage.setItem("blazeUser", JSON.stringify(data.userDetails));
      }
      router.push("/dashboard");
    } else {
      setErrorMsg(data.message);
    }
    return data;
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const validationErrors: { [key: string]: string } = {};
      (error.inner as Array<Yup.ValidationError>).forEach((e) => {
        if (e.path) {
          validationErrors[e.path] = e.errors[0];
        }
      });
      setFormErrors(validationErrors);
    } else {
      setErrorMsg(error.message || "Something went wrong. Please try again.");
    }
    console.error(error);
  } finally {
    setLoading(false);
  }
};
