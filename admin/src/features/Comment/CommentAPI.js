import { callAPIWithToken } from "../../services/jwt-axios";

export const getListComment = async (page) => {
  const res = await callAPIWithToken.get(`/api/comment/get?page=${page}`);
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
