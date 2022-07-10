import * as yup from "yup";

const ResetPasswordSchema = () => {
  return yup.object({
    password: yup.string().required("You must enter password"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password confirm must match")
      .required("Confirm password must match password"),
  });
};

export {ResetPasswordSchema};
