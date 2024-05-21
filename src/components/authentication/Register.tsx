"use client";

import { useState } from "react";
import { TextInput } from "../form-elements/TextInput";
import { PrimaryButton } from "@/utils/Buttons";
import { UserInterface } from "@/models/api/auth/userModel";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/api-service/auth/registerService";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import Link from "next/link";

export const RegisterForm = () => {
  const [values, setValues] = useState<UserInterface>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const toast = useToast();
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await registerUser(
      values,
      setLoading,
      setErrorMsg,
      router,
      toast,
      setFormErrors
    );
  };

  return (
    <>
      <div className="flex  flex-col gap-y-4 w-[90%] lg:w-[60%] m-auto my-10 lg:my-20">
        <p className="text-header-200 text-center text-lg lg:text-xs font-semibold leading-[2.375rem] mb-4">
          {" "}
          Create an account
        </p>
        <form className="" onSubmit={handleSubmit}>
          <TextInput
            label="First Name"
            type="text"
            name="firstName"
            placeholder="Enter your First Name"
            value={values.firstName}
            onChange={(e) =>
              setValues({ ...values, firstName: e.target.value })
            }
          />
          {formErrors.firstName && (
            <p className="text-red-500">{formErrors.firstName}</p>
          )}
          <TextInput
            label="Last Name"
            type="text"
            name="lastName"
            placeholder="Enter your Last Name"
            value={values.lastName}
            onChange={(e) => setValues({ ...values, lastName: e.target.value })}
          />
          {formErrors.lastName && (
            <p className="text-red-500">{formErrors.lastName}</p>
          )}
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
            label="Phone Number"
            type="tel"
            name="phone"
            placeholder="Enter your phone number with country code"
            value={values.phone}
            onChange={(e) => setValues({ ...values, phone: e.target.value })}
          />
          {formErrors.phone && (
            <p className="text-red-500">{formErrors.phone}</p>
          )}
          <TextInput
            label="Create Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter strong password"
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

          <PrimaryButton
            type="submit"
            buttonText="Register"
            isLoading={loading}
          />
        </form>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <p className="lg:w-[70%] text-center m-auto mt-6">
          Already have an account?{" "}
          <span className="text-green-900 ">
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          </span>
        </p>
      </div>
    </>
  );
};
