import * as yup from "yup";

export const phoneSchema = () => {
  return yup.object({
    phone: yup
      .string()
      .required("Please enter your phone")
      .matches(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
        "Phone not valid"
      ),
  });
};

export const otpSchema = () => {
  return yup.object({
    otp: yup.string().required("Please enter otp"),
  });
};
