import * as yup from "yup";

const AddExistingProductSchema = () => {
  return yup.object({
    productId: yup.object().nullable().required("Please select product"),
    quantityEnter: yup
      .number()
      .required()
      .moreThan(0, "Quantity should not be zero or less than zero"),
  });
};

export { AddExistingProductSchema };
