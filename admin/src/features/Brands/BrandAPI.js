import { callAPIWithToken } from "../../services/jwt-axios";

//ADD NEW BRAND
export const addNewBrand = async (brandInfo) => {
  const res = await callAPIWithToken.post("/api/brand/", { brand: brandInfo });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

//GET BRAND LIST
export const getBrandList = async (page) => {
  const res = await callAPIWithToken({
    url: `/api/brand/`,
    params: { page: page },
    method: "GET",
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

//UPDATE BRAND

//DELETE BRAND
