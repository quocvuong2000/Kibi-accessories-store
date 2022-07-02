import * as yup from "yup";
export const PasswordSchema = () => {
  return yup.object().shape({
    password: yup.string().required("This field is required"),
    confirmpassword: yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Both password need to be the same"),
    }),
  });
};
