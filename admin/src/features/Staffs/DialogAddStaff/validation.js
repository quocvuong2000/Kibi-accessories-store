import * as yup from "yup";

const CreateStaffSchema = () => {
  return yup.object({
    email: yup.string().required("Please enter email"),
    password: yup.string().required("Please enter password"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password confirm must match ")
      .required("Confirm password must match password"),
    name: yup.string().required("Please enter name"),
    phone: yup.string().required("Please enter gender").matches(/^-?\d*$/,"phone not valid"),
    address: yup.string().required("Please enter address"),
    dob: yup.string().required("Please enter date of birth"),
    gender: yup.string().required("Please enter gender"),
    role: yup.string().required("Please enter role"),
  });
};

export { CreateStaffSchema };
