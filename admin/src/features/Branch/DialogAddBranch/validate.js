import * as yup from "yup";

const AddBranchSchema = () => {
  return yup.object({
    address: yup.string().required("You must enter title blog"),
  });
};

export { AddBranchSchema };
