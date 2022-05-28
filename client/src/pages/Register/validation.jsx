import * as yup from "yup";

export const registerSchema = () => {
  return yup.object({
    username: yup.string().required("Please enter username"),
    email: yup.string().required("Please enter email").email("Invalid email!"),
    password: yup.string().required("Please enter password"),
  });
};
