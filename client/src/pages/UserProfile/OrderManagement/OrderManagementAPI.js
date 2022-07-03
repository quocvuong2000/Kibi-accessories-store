import { callAPIWithToken } from "../../../services/jwt-axios";

const doGetListOrderByCustomer = async (page, status, username) => {
  const res = await callAPIWithToken({
    url: `/api/order/customer/status/get`,
    method: "GET",
    params: {
      page,
      status,
      username,
    },
  });
  if (res && res.status !== 200)
    throw Error(`Something went wrong with status code ${res.status}`);
  return res.data;
};

export { doGetListOrderByCustomer };
