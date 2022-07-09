import { callAPIWithToken } from "../../services/jwt-axios";

export const rejectOrder = async (id) => {
  const res = await callAPIWithToken.patch(`/api/order/reject/${id}`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};

export const acceptOrder = async (id) => {
  const res = await callAPIWithToken.patch(`/api/order/accept/${id}`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};

export const completeOrder = async (id) => {
  const res = await callAPIWithToken.patch(`/api/order/complete/${id}`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};

export const getByStatus = async (status, page) => {
  const res = await callAPIWithToken.get(
    `/api/order/status/get?status=${status}&page=${page}`
  );
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};
