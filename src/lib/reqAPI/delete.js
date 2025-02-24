import { deleteData } from "..";
import Cookies from "js-cookie";

export const deletePostReq = async (path, userId) => {
  const options = {
    headers: {
      authorization: `Bearer ${Cookies.get("jwt")}`,
      userId,
    },
  };
  const deleteResp = await deleteData(`/controller/${path}`, options);

  return deleteResp;
};

export const deleteCommentReq = async (path, postId) => {
  const options = {
    headers: {
      authorization: `Bearer ${Cookies.get("jwt")}`,
      postId,
    },
  };
  const deleteResp = await deleteData(`/controller/${path}`, options);

  return deleteResp;
};
