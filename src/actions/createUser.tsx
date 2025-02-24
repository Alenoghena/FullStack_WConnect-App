"use server";
import Cookies from "js-cookie";
import { postData } from "@/lib";

export async function createUser(formData: FormData) {
  const newUser = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const resp = await postData("createNewUser", newUser);

  // localStorage.setItem("jwt", user.accessToken);

  //   Cookies.set("jwt", user.accessToken, {
  //     expires: 7,
  //     secure: true,
  //   });
  //   localStorage.setItem("email", newUser.email);
  return resp;
}
