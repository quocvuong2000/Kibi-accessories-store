import * as yup from "yup";

export const registerSchema = () => {
  return yup.object({
    username: yup.string().required("Please enter username"),
    email: yup.string().required("Please enter email").email("Invalid email!"),
    password: yup.string().required("Please enter password"),
    address: yup.string().required("Please enter address"),
    phone: yup
      .string()
      .required("Please enter your phone")
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        "Phone not valid"
      ),
  });
};
