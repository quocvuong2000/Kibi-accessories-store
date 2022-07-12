import * as yup from "yup";

const AddProductSchema = () => {
  return yup.object({
    product: yup.string().required("You must enter product name"),
    price: yup
      .string()
      .required("You must enter product price")
      .matches(/^-?\d*$/, "Price is not valid"),
    category: yup.string().required("You must choose the category"),
    brand: yup.string().required("You must choose the brand"),
    quantity: yup
      .string()
      .required("You must enter the quantity")
      .matches(/^-?\d*$/, "Quantity is not valid"),
    sale: yup
      .string()
      .required("You must enter the quantity")
      .matches(/^-?\d*$/, "Quantity is not valid"),
    warranty: yup
      .string()
      .required("You must enter the quantity")
      .matches(/^-?\d*$/, "Quantity is not valid"),
  });
};

export { AddProductSchema };
