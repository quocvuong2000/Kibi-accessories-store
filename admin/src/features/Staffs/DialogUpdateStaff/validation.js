import * as yup from "yup";

const UpdateStaffSchema = () => {
  return yup.object({
    email: yup.string().required("Please enter email"),
    name: yup.string().required("Please enter name"),
    phone: yup
      .string()
      .required("Please enter gender")
      .matches(/^-?\d*$/, "phone not valid"),
    address: yup.string().required("Please enter address"),
    dob: yup.string().required("Please enter date of birth"),
    gender: yup.string().required("Please enter gender"),
    role: yup.string().required("Please enter role"),
  });
};

export { UpdateStaffSchema };
