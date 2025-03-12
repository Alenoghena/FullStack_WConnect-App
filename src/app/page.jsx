"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import HomePage from "./(frontend)/post/page";
import { photoReq, photosReq, usersReq } from "@/lib/reqAPI/apiRequests";
import Auth from "./(frontend)/auth/page";
import Cookies from "js-cookie";
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
  const [auth, setAuth] = useState(localStorage.getItem("jwt"));
  console.log(Cookies.get("jwt"));
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
      console.log(message);
    }
  };

  const handleGetPhotos = async () => {
    try {
      const resp = await photosReq();

      localStorage.setItem("photos", resp);
      setUserPhotos(resp);
    } catch (err) {
      const message = `Post profile picture-Unauthorized! ${err.message}`;
      console.log(message);
    }
  };

  useEffect(() => {
    if (show) {
      handleGetPhoto(user?.id);

      handleGetPhotos();
    }
  }, [user, show]);
  ///////////////////////////////
  useEffect(() => {
    if (auth) {
      const jwt = Cookies.get("jwt");
      console.log(jwt);
    }
  }, [auth]);
  /////////////////////////////////
  const handleUsers = useCallback(async () => {
    try {
      const email = localStorage.getItem("email");
      const resp = await usersReq(email);
      console.log("user", resp);
      setUser(resp);
    } catch (err) {
      const message = `User handleUsers-Unauthorized! ${err.message}`;
      // setErrMsgUser(message);
    }
  }, [setUser]);

  useEffect(() => {
    setIsShowHome(true);
  }, []);
  useEffect(() => {
    if (handleUsers) {
      handleUsers();
    }
    if (auth) {
      console.log(auth);
      setShow(true);
    } else {
      setShow(false);
      console.log("auth is false");
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
            <Auth setAuth={setAuth} />
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

//grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]
// const handleFileChange = (e) => {
//   if (e.target.files) {
//     setStatus({ message: "initial" });
//     setFile(e.target.files[0]);
//   }
// };
// const handleUpload = async (file) => {
//   if (file) {
//     setStatus({ message: "uploading" });
//     const formData = new FormData();
//     formData.append("file", file);
//     const userId = user.id;
//     try {
//       if (!userPhotoLink(userId)) {
//         const result = await photoPost(formData, userId);
//         setStatus(result);
//         router.push("/");
//       } else {
//         const result = await photoPut(formData, userId);

//         setStatus(result);
//         router.push("/");
//       }
//     } catch (error) {
//       console.error(error);
//       setStatus(error);
//     }
//   }
// };
// const handleDelete = async (path) => {
//   if (path.path.includes("deleteComment")) {
//     const deleteResp = await deleteReq(path);

//     setDeleteMsg(deleteResp);
//   } else {
//     const deleteResp = await deleteReq(path);
//     setDeleteMsg(deleteResp);
//     router.push("/");
//   }
// };

{
  /* {showFile && (
                <ProfilePicture
                  userId={user.id}
                  userPhoto={userPhoto}
                  setUserPhoto={setUserPhoto}
                  file={file}
                  status={status}
                  handleFileChange={handleFileChange}
                  handleUpload={handleUpload}
                  showFile={showFile}
                />
              )} */
}
