import { jwtAxios } from "../../services/jwt-axios";

export const doSignUp = async (user, message) => {
  const [res, err] = await jwtAxios.post("/api/auth/register", {
    ...user,
    type: "customer",
  });
  if (res) {
    return message.success("Sign up success");
  }
  if (err) {
    return message.error("Sign up failure");
  }
};
