import { callAPIWithToken } from "../../services/jwt-axios";

export const getListCommentByStatus = async (page, status) => {
  const res = await callAPIWithToken.get(
    `/api/comment/getbystatus?page=${page}&status=${status}`
  );
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};

export const updateStatusComment = async (id, status) => {
  const res = await callAPIWithToken.patch(`/api/comment/updatestatus/${id}`, {
    status: status,
  });
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
