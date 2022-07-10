import { callAPIWithToken } from "../../services/jwt-axios";

//GET LIST CUSTOMER
const doGetListCustomer = async (page) => {
  const res = await callAPIWithToken({
    url: "/api/customer/",
    params: { page },
    method: "get",
  });
  if (res && res.status !== 200)
    throw Error(`something went wrong with code status ${res.status}`);
  return res.data;
};

//GET DETAIL CUSTOMER
const doGetDetailCustomer = async (id) => {
  const res = await callAPIWithToken({
    url: `/api/customer/detail/${id}`,
    method: "GET",
  });
  if (res && res.status !== 200)
    throw Error(`something went wrong with code status ${res.status}`);
  return res.data;
};
//UPDATE CUSTOMER
const doUpdateCustomer = async (id, data) => {
  const res = await callAPIWithToken({
    url: `/api/customer/update/user/${id}`,
    method: "put",
    data: data,
  });
  if (res && res.status !== 200)
    throw Error(`something went wrong with code status ${res.status}`);
  return res.data;
};

export { doGetListCustomer, doGetDetailCustomer, doUpdateCustomer };
