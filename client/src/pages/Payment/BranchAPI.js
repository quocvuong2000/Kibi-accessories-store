import { callAPIWithToken } from "../../services/jwt-axios";

export const getAllBranch = async () => {
  const res = await callAPIWithToken({
    url: `/api/branch/`,
    method: "GET",
  });
  if (res && res.status !== 200)
    throw Error(`Something went wrong with status code ${res.status}`);
  return res.data;
};

export const getBranchById = async (id) => {
  const res = await callAPIWithToken({
    url: `/api/branch/get/${id}`,
    method: "GET",
  });
  if (res && res.status !== 200)
    throw Error(`Something went wrong with status code ${res.status}`);
  return res.data;
};
