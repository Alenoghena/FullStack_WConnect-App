import { getData } from "..";
import Cookies from "js-cookie";

const options = {
  headers: {
    authorization: `Bearer ${Cookies.get("jwt")}`,
    // email: localStorage.getItem("email"),
  },
};

export const postsReq = async () => {
  try {
    const resp = await getData("controller/posts/getPosts", options);

    return resp;
  } catch (err) {
    const message = `Home handlePost-Unauthorized! ${err.message}`;
  }
};

export const postReq = async (postId) => {
  try {
    const resp = await getData(`controller/posts/getPosts/${postId}`, options);

    return resp;
  } catch (err) {
    const message = `Home handlePost-Unauthorized! ${err.message}`;
  }
};

export const usersReq = async (email) => {
  try {
    const options = {
      headers: {
        authorization: `Bearer ${Cookies.get("jwt")}`,
        email,
      },
    };
    const resp = await getData("controller/users/getUser", options);
    return resp;
  } catch (err) {
    const message = `User handleUsers-Unauthorized! ${err.message}`;
  }
};

export const photosReq = async (userId) => {
  const options = {
    headers: {
      authorization: `Bearer ${Cookies.get("jwt")}`,
      userId,
    },
  };
  try {
    const resp = await getData("/controller/photo/getPhotos", options);

    return resp;
  } catch (err) {
    const message = `Post profile picture-Unauthorized! ${err.message}`;
  }
};

export const photoReq = async (id) => {
  try {
    const options = {
      headers: {
        authorization: `Bearer ${Cookies.get("jwt")}`,
        userId: id,
      },
    };

    const resp = await getData("/controller/photo/getPhoto", options);

    return resp?.profilePhoto;
  } catch (err) {
    const message = `Post profile picture-Unauthorized! ${err.message}`;
  }
};

export const commentsReq = async (postId) => {
  const options = {
    headers: {
      authorization: `Bearer ${Cookies.get("jwt")}`,
    },
  };
  try {
    const resps = await getData(
      `controller/comments/getPostComments/${postId}`,
      options
    );

    return resps;
  } catch (err) {
    const message = `Post handleComments-Unauthorized! ${err.message}`;
    setErrMsg(message);
  }
};

export const likesReq = async (postId, userId) => {
  const options = {
    headers: {
      authorization: `Bearer ${Cookies.get("jwt")}`,
      userId,
    },
  };
  try {
    const resps = await getData(
      `controller/like/getPostLikes/${postId}`,
      options
    );

    return resps;
  } catch (err) {
    const message = `Post handleLikes-Unauthorized! ${err.message}`;
    setErrMsg(message);
  }
};
