import { callAPIWithToken } from "../../services/jwt-axios";

export const addNewProduct = async (productInfo) => {
  const res = await callAPIWithToken.post("/api/product/", productInfo);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const getProductList = async (page, branch) => {
  const res = await callAPIWithToken({
    url: `/api/product/`,
    params: { page, branch },
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

export const doGetDetailProduct = async (id) => {
  const res = await callAPIWithToken({
    url: `/api/product/get/${id}`,
    method: "GET",
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const doUpdateProduct = async (id, productData) => {
  const res = await callAPIWithToken({
    url: `/api/product/update/${id}`,
    method: "PUT",
    data: productData,
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const deleteWishList = async (productId) => {
  const res = await callAPIWithToken.post("/api/wishlist/deleteallproduct", {
    productId: productId,
  });

  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const doGetAllProduct = async () => {
  const res = await callAPIWithToken.get("/api/product/getall/all");
  if(res && res.status !== 200) throw Error("Something wrongs with code status");
  return res.data
}