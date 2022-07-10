import * as yup from "yup";

const AddBlogSchema = () => {
  return yup.object({
    title: yup.string().required("You must enter title blog"),
    author: yup.string().required("You must enter your name"),
    content: yup.string().required("You must enter content blog"),
    categoryBlog: yup.string().required("You must choose the category"),
  });
};

export { AddBlogSchema };
