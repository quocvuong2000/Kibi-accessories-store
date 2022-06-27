import { callAPIWithToken } from "../services/jwt-axios";

export const createAddress = async (
  username,
  recipientname,
  recipientphone,
  address,
  ward,
  district,
  city
) => {
  const res = await callAPIWithToken.post(`/api/address/create`, {
    username: username,
    receiverName: recipientname,
    recipientPhone: recipientphone,
    address: address,
    ward: ward,
    district: district,
    city: city,
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

//DELETE ADDRESS
export const deleteAddress = async (id, itemid) => {
  const res = await callAPIWithToken.put(`/api/address/delete/`, {
    addressId: id,
    addressItemId: itemid,
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

//UPDATE ADDRESS
export const updateAddress = async (
  id,
  itemid,
  address,
  ward,
  district,
  city
) => {
  const res = await callAPIWithToken.put(`/api/address/update/`, {
    addressId: id,
    addressItemId: itemid,
    address: address,
    ward: ward,
    district: district,
    city: city,
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

//GET ADDRESS
export const getAddress = async (username) => {
  const res = await callAPIWithToken.get(`/api/address/get/${username}`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
