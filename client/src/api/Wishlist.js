import { message } from "antd";
import { callAPIWithToken, jwtAxios } from "../services/jwt-axios";

export const getAllWishlist = async (username) => {
  const res = await jwtAxios.get(`/api/wishlist/${username}`);
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
      console.log(res.status);
      res.status === 200 && message.success(res.data);
      res.status === 201 && message.error(res.data);
    });
};
