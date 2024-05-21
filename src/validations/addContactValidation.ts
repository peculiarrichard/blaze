import * as Yup from "yup";

export const createContactValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^\+\d{1,3}\d{6,14}$/,
      "Phone number must start with a country code (+)"
    ),
  isOnWhatsapp: Yup.boolean().required("You must select one"),
});
