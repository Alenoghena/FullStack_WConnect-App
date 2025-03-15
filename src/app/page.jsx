"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import HomePage from "./(frontend)/post/page";
import { photoReq, photosReq, usersReq } from "@/lib/reqAPI/apiRequests";
import Autheticate from "./(frontend)/auth/page";
import Cookies from "js-cookie";
// import { deleteCookie, getCookie } from "cookies-next/client";
import Link from "next/link.js";

export default function Home() {
  const [user, setUser] = useState({});
  const [postUserId, setpostUserId] = useState(0);
  const [show, setShow] = useState(false);
  const [isShowCreatePost, setIsshowCreatePost] = useState(false);
  const [isShowCreateComment, setIsshowCreateComment] = useState(false);
  const [isShowHome, setIsShowHome] = useState(false);
  const [isShowComment, setIsShowComment] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);

  const [userPhoto, setUserPhoto] = useState({});
  const [userPhotos, setUserPhotos] = useState([]);
  const [showFile, setShowFile] = useState(false);
  const [image, setImage] = useState("img__header");
  const [auth, setAuth] = useState(Cookies.get("jwt"));
  // console.log(auth);
  // console.log(getCookie("jwt"));
  const router = useRouter();

  const handleShowFile = () => {
    const imageSize =
      image === "img__header-size" ? "img__header" : "img__header-size";
    if (showFile === false && image === "img__header") {
      setShowFile(!showFile);
      setImage(imageSize);
    } else {
      setShowFile(!showFile);
      setImage(imageSize);
    }
  };

  function userPhotoLink(id) {
    const userPhoto = userPhotos?.map((val) => {
      let photo;
      if (val.userId === id) {
        photo = val?.profilePhoto;
      }

      return photo;
    });
    return userPhoto?.join("");
  }

  const handleCreatePost = () => {
    setIsshowCreateComment(false);
    setIsshowCreatePost(!isShowCreatePost);
  };

  const handleCreateComment = () => {
    setIsshowCreateComment(!isShowCreateComment);
    setIsshowCreatePost(false);
  };

  function handleCommentsNav(id, postUserId) {
    setpostUserId(postUserId);
    setIsShowHome(false);
    setIsShowComment(true);
    router.push(`/post/${id}`);
    // router.push("/post");
  }

  function handleHomeNav() {
    setIsShowHome(true);
    setIsShowComment(false);
    router.push("/");
  }

  const handleShowTrash = () => {
    if (isShowDelete === true) {
      setIsShowDelete(false);
    }
  };

  const handleGetPhoto = async (id) => {
    try {
      const resp = await photoReq(id);

      localStorage.setItem("photo", resp);
      setUserPhoto(resp);
    } catch (err) {
      const message = `Post profile picture-Unauthorized! ${err.message}`;
    }
  };

  const handleGetPhotos = async () => {
    try {
      const resp = await photosReq();

      localStorage.setItem("photos", resp);
      setUserPhotos(resp);
    } catch (err) {
      const message = `Post profile picture-Unauthorized! ${err.message}`;
    }
  };

  useEffect(() => {
    if (show) {
      handleGetPhoto(user?.id);

      handleGetPhotos();
    }
  }, [user, show]);

  const handleUsers = useCallback(async () => {
    try {
      if (auth !== null) {
        const email = localStorage.getItem("email");

        const resp = await usersReq(email);

        setUser(resp);
      }
    } catch (err) {
      const message = `User handleUsers-Unauthorized! ${err.message}`;
      // setErrMsgUser(message);
    }
  }, [setUser, auth]);

  useEffect(() => {
    setIsShowHome(true);
  }, []);
  useEffect(() => {
    if (handleUsers) {
      handleUsers();
    }
    if (auth) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [auth, handleUsers]);

  return (
    <div
      className="flex flex-col justify-center items-start min-w-full "
      onClick={() => handleShowTrash()}
    >
      <main className="flex flex-col gap-8 items-start w-full md:items-center">
        {!show && (
          <Link href={"/auth"}>
            <Autheticate setAuth={setAuth} />
          </Link>
        )}
        {show && (
          <>
            <div className="main">
              <div className="routes">
                <HomePage
                  isShowHome={isShowHome}
                  postUserId={postUserId}
                  image={image}
                  isShowComment={isShowComment}
                  handleCreatePost={handleCreatePost}
                  handleCreateComment={handleCreateComment}
                  handleShowFile={handleShowFile}
                  handleHomeNav={handleHomeNav}
                  show={show}
                  isShowCreatePost={isShowCreatePost}
                  handleCommentsNav={handleCommentsNav}
                  userPhotoLink={userPhotoLink}
                  userPhoto={userPhoto}
                  isShowCreateComment={isShowCreateComment}
                />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
