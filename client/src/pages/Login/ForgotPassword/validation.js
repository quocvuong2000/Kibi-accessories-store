import * as yup from "yup";

export const emailSchema = () => {
  return yup.object({
    email: yup
      .string()
      .required("Please enter your email")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Email not valid"),
  });
};
