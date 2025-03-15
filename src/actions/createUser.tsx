"use server";
import { postData } from "@/lib";

export async function createUser(formData: FormData) {
  const newUser = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const resp = await postData("createNewUser", newUser);

  return resp;
}
