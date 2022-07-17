import * as yup from "yup";

export const registerSchema = () => {
  return yup.object({
    name: yup.string().required("Please enter name"),
    email: yup.string().required("Please enter email").email("Invalid email!"),
    password: yup
      .string()
      .required("Please enter password")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum eight characters"
      ),
    address: yup.string().required("Please enter address"),
    phone: yup
      .string()
      .required("Please enter your phone")
      .matches(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
        "Phone not valid"
      ),
  });
};
