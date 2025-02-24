import Cookies from "js-cookie";
import { logOutUser } from "..";

export const logoutReq = async (email) => {
  const options = {
    headers: {
      authorization: `Bearer ${Cookies.get("jwt")}`,
      email,
    },
  };

  const resp = await logOutUser("logout", options);

  return resp;
};
