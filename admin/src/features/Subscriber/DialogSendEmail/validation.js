import * as yup from "yup";

const SendEmailSchema = () => {
  return yup.object({
    content: yup.string().required("You must enter content blog"),
  });
};

export { SendEmailSchema };
