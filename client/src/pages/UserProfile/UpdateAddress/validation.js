import * as yup from "yup";

export const CreateAddressSchema = () => {
  return yup.object({
    address: yup.string().required("Please enter address"),
    recipientName: yup.string().required("Please enter name"),
    recipientPhone: yup
      .string()
      .required("Please enter phone")
      .matches(/^-?\d*$/, "Phone not valid"),
  });
};
