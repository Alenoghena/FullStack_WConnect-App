"use server";
import Cookies from "js-cookie";
import { postData } from "@/lib";

export async function loginUser(formData: FormData) {
  const loginUser = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const resp = await postData("controller/auth", loginUser);

  // localStorage.setItem("jwt", resp.accessToken);

  return resp;
}
