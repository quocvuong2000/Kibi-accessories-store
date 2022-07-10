import { callAPIWithToken } from "../../services/jwt-axios";

//GET LIST
export const doGetstaffList = async (page) => {
  const res = await callAPIWithToken({
    url: `/api/staff/`,
    params: {
      page,
    },
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

//CREATE STAFF
export const doCreateStaff = async (data) => {
  const res = await callAPIWithToken({
    url: `/api/staff/register`,
    method : "POST",
    data : data
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

//DELETE STAFF
export const doDeleteStaff = async (id) => {
  const res = await callAPIWithToken({
    url: `/api/staff/delete/${id}`,
    method : "DELETE",
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
}

//UPDATE STAFF
export const doUpdateStaff = async (id,data) => {
  const res = await callAPIWithToken({
    url: `/api/staff/update/${id}`,
    method : "PUT",
    data : data
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
}

//GET STAFF DETAIL
export const doGetDetailStaff = async (id) => {
  const res = await callAPIWithToken({
    url: `/api/staff/detail/${id}`,
    method : "GET",
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
}