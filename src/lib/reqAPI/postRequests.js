import { postFormData, putFormData } from "..";
import Cookies from "js-cookie";

export const photoPost = async (file, userId) => {
  try {
    const options = {
      headers: {
        authorization: `Bearer ${Cookies.get("jwt")}`,

        userId,
      },
    };

    const result = await postFormData(
      "/controller/photo/createNewPhoto",
      file,

      options
    );

    return result;
  } catch (error) {
    console.error(error);
    setStatus(error);
  }
};

export const photoPut = async (file, userId) => {
  try {
    const options = {
      headers: {
        authorization: `Bearer ${Cookies.get("jwt")}`,

        userId,
      },
    };
    const result = await putFormData(
      "/controller/photo/updatePhoto",
      file,

      options
    );

    return result;
  } catch (error) {
    console.error(error);
    setStatus(error);
  }
};

export const likesPutReq = async (postId, likeStatus) => {
  const options = {
    headers: {
      authorization: `Bearer ${Cookies.get("jwt")}`,
    },
    postId,
    likeStatus,
  };

  const resp = await putData("controller/like/putLike", options);
  return resp;
};

export const likesCreateReq = async (postId, likeStatus) => {
  const options = {
    headers: {
      authorization: `Bearer ${Cookies.get("jwt")}`,
    },
    postId,
    likeStatus,
  };

  const resp = await postData("controller/like/createNewLike", options);
  return resp;
};
