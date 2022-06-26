import * as yup from "yup";

export const CreateAddressSchema = () => {
  return yup.object({
    address: yup.string().required("Please enter address"),
    recipientName: yup.string().required("Please enter name"),
    recipientPhone: yup
      .string()
      .required("Please enter phone")
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Phone not valid"),
  });
};
