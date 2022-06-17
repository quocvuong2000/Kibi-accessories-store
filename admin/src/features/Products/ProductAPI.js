import { callAPIWithToken } from "../../services/jwt-axios";

export const addNewProduct = async (productInfo) => {
  const res = await callAPIWithToken.post("/api/product/", productInfo);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const getProductList = async (page) => {
  const res = await callAPIWithToken({
    url: `/api/product/`,
    params: { page: page },
    method: "GET",
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const doDeleteProduct = async (id) => {
  const res = await callAPIWithToken({
    url: `/api/product/${id}`,
    method: "DELETE",
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
