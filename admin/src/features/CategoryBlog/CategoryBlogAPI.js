import { callAPIWithToken } from "../../services/jwt-axios";

export const createCategoryblog = async (title) => {
  const res = await callAPIWithToken.post("/api/categoryblog/", {
    title: title,
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const getCategoryBlogList = async (page) => {
  const res = await callAPIWithToken({
    url: `/api/categoryblog/`,
    params: { page: page },
    method: "GET",
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const deleteCategoryBlog = async (id) => {
  const res = await callAPIWithToken.delete(`/api/categoryblog/${id}`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const updateCategoryBlog = async (id, title) => {
  const res = await callAPIWithToken.patch(`/api/categoryblog/${id}`, {
    title: title,
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
