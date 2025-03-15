"use server";
import Cookies from "js-cookie";
import { postData, getData } from "@/lib";

export async function createComments(
  formData: FormData,
  postId: number,
  username: string
) {
  const option = {
    commentBody: formData.get("commentBody"),
    username,
    postId,
    headers: {
      authorization: `Bearer ${Cookies.get("jwt")}`,
    },
  };
  await postData("/controller/comments/createComment", option);

  const postComments = await getData(
    `/controller/comments/getPostComments/${postId}`
  );
  return postComments;
}
