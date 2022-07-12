import { callAPIWithToken } from "../../services/jwt-axios";

//CREATE
export const addNewCategory = async (categoryInfo) => {
  const res = await callAPIWithToken.post("/api/category/", {
    category: categoryInfo,
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

//GET
export const getCategoryList = async (page) => {
  const res = await callAPIWithToken({
    url: `/api/category/`,
    params: { page: page },
    method: "GET",
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

//DELETE
export const deleteCategory = async (id) => {
  const res = await callAPIWithToken.delete(`/api/category/delete/${id}`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

//UPDATE
export const updateCategory = async (id, category) => {
  const res = await callAPIWithToken.patch(`/api/category/${id}`, {
    category: category,
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

//get product related
export const doGetProductRelatedCat = async (id) => {
  const res = await callAPIWithToken({
    url: `/api/product/category/${id}`,
    method: "GET",
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
