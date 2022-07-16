import { message } from "antd";
import { callAPIWithToken, jwtAxios } from "../services/jwt-axios";

export const createComment = async (
  username,
  productId,
  comment,
  rating,
  name,
  avatar,
  productImage
) => {
  const res = await callAPIWithToken.post("/api/comment/create", {
    username: username,
    productId: productId,
    comment: comment,
    rating: rating,
    name: name,
    avatar: avatar,
    productImage: productImage,
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

export const deleteComment = async (id, productId) => {
  const res = await callAPIWithToken.post(`/api/comment/delete`, {
    commentId: id,
    productId: productId,
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};

export const checkLike = async (id, username) => {
  const res = await callAPIWithToken.get(
    `/api/comment/liked?id=${id}&username=${username}`
  );
  if (res && res.status !== 200 && res.status !== 201)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};

export const likeComment = async (id, username) => {
  const res = await callAPIWithToken.post(
    `/api/comment/likecomment?id=${id}&username=${username}`
  );
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};
