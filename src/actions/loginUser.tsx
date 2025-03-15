"use server";

import { postData } from "@/lib";

export async function loginUser(formData: FormData) {
  const loginUser = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const resp = await postData("controller/auth", loginUser);

  return resp;
}
