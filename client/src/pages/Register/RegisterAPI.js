import { jwtAxios } from "../../services/jwt-axios";

export const doSignUp = async (user) => {
  const res = await jwtAxios.post("/api/auth/register", {
    ...user,
    type: "customer",
  });
  if (res && res.status !== 201)
    throw new Error("something wrongs with code status");
  return res.data;
};
