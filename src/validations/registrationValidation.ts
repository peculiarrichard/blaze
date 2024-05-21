import * as Yup from "yup";

export const registrationValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^\+\d{1,3}\d{6,14}$/,
      "Phone number must start with a country code (+)"
    ),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must not exceed 20 characters")
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_])/,
      "Password must contain at least one number, one letter, and one special character, and be at least 8 characters long"
    ),
});
