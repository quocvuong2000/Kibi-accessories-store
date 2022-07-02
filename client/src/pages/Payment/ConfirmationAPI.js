import { callAPIWithToken } from "../../services/jwt-axios";

const doGetDetailOrder = async (id) => {
  const res = await callAPIWithToken({
    url: `/api/order/detail/get/${id}`,
    method: "GET",
  });
  if (res && res.status !== 200)
    throw Error(`Something went wrong with status code ${res.status}`);
  return res.data;
};

const doGetDetailOrderCard = async (id) => {
  const res = await callAPIWithToken({
    url: `/api/order/detail/get/${id}`,
    method: "GET",
  });
  if (res && res.status !== 200)
    throw Error(`Something went wrong with status code ${res.status}`);
  return res.data;
};

export { doGetDetailOrder,doGetDetailOrderCard };
