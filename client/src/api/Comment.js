import { message } from "antd";
import { callAPIWithToken, jwtAxios } from "../services/jwt-axios";

export const createComment = async (
  username,
  productId,
  comment,
  rating,
  name,
  avatar
) => {
  const res = await callAPIWithToken.post("/api/comment/create", {
    username: username,
    productId: productId,
    comment: comment,
    rating: rating,
    name: name,
    avatar: avatar,
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};

export const getCommentByProduct = async (productId, page) => {
  const res = await callAPIWithToken.get(
    `/api/comment/product/${productId}?page=${page}`
  );
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};

export const getCommentByUser = async (username, page) => {
  const res = await callAPIWithToken.get(
    `/api/comment/user/${username}?page=${page}`
  );
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};

export const deleteComment = async (id) => {
  const res = await callAPIWithToken.post(`/api/comment/delete`, {
    commentId: id,
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};
