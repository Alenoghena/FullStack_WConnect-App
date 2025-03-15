"use server";
import Cookies from "js-cookie";
import { postData, getData } from "@/lib";

export async function createPost(
  formData: FormData,
  userId: number,
  username: string
) {
  const option = {
    title: formData.get("title"),
    postText: formData.get("postText"),
    username,
    userId,
    headers: {
      authorization: `Bearer ${Cookies.get("jwt")}`,
    },
  };
  await postData("/controller/posts/createNewPost", option);
  const posts = await getData("controller/posts/getPosts", option);
  return posts;
}
