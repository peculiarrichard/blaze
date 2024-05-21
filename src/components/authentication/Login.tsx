"use client";

import { TextInput } from "../form-elements/TextInput";
import { PrimaryButton } from "@/utils/Buttons";
import { useState } from "react";
import Link from "next/link";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { loginUser } from "@/api-service/auth/loginService";
import { LoginInterface } from "@/models/api/auth/loginModel";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

export const LoginForm = () => {
  const router = useRouter();
  const toast = useToast();
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [errMsg, setErrMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [values, setValues] = useState<LoginInterface>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginUser(
      values,
      router,
      toast,
      setErrMsg,
      setLoading,
      setFormErrors
    );
  };
  return (
    <>
      <div className="flex flex-col gap-y-4 w-[90%] lg:w-[60%] m-auto my-10 lg:my-20">
        <p className="text-header-200 text-center text-lg lg:text-xs font-semibold leading-[2.375rem] mb-4">
          {" "}
          Welcome back, please login to access your dashboard
        </p>
        <form
          className="flex flex-col gap-y-4 w-full lg:w-[70%] m-auto"
          onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          {formErrors.email && (
            <p className="text-red-500">{formErrors.email}</p>
          )}
          <TextInput
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            hasButton={true}
            hasIconAsButton={true}
            iconAsButton={
              showPassword ? MdOutlineVisibility : MdOutlineVisibilityOff
            }
            onClick={toggleShowPassword}
          />
          {formErrors.password && (
            <p className="text-red-500">{formErrors.password}</p>
          )}
          <PrimaryButton type="submit" buttonText="Login" isLoading={loading} />
        </form>
        {errMsg && <p className="text-red-500 lg:w-[70%] m-auto">{errMsg}</p>}
        <p className="lg:w-[70%] text-center m-auto mt-6">
          Don&apos;t have an account?{" "}
          <span className="text-green-900 ">
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </span>
        </p>
      </div>
    </>
  );
};
