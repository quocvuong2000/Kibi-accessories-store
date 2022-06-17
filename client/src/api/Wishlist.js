import { jwtAxios } from "../services/jwt-axios";
export const getAllWishlist = async (username) => {
  const res = await jwtAxios.get(`/api/wishlist/${username}`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
