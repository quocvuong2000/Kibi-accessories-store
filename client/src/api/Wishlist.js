import { message } from "antd";
import { callAPIWithToken } from "../services/jwt-axios";

export const getAllWishlist = async (username) => {
  const res = await callAPIWithToken.get(`/api/wishlist/${username}`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const addToWishList = async (username, productId) => {
  await callAPIWithToken
    .post("/api/wishlist/", {
      username: username,
      productId: productId,
    })
    .then((res) => {
      res.status === 200 && message.success(res.data);
      res.status === 201 && message.error(res.data);
    });
};

export const checkExistsWishlist = async (username, productId) => {
  let status = 0;
  await callAPIWithToken
    .post("/api/wishlist/exist", {
      username: username,
      productId: productId,
    })
    .then((res) => {
      if (res.status === 200) {
        status = 200;
      } else {
        status = 201;
      }
    });

  return status;
};

export const deleteWishList = async (username, productId) => {
  await callAPIWithToken
    .post("/api/wishlist/delete", {
      username: username,
      productId: productId,
    })
    .then((res) => {
      res.status === 200 && message.success(res.data);
      res.status === 201 && message.error(res.data);
    });
};
