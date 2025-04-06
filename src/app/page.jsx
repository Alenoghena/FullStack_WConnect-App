"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import HomePage from "./(frontend)/post/page";
import { photoReq, photosReq, usersReq } from "@/lib/reqAPI/apiRequests";
import Autheticate from "./(frontend)/auth/page";
import Cookies from "js-cookie";

import Link from "next/link.js";

export default function Home() {
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [isShowCreatePost, setIsshowCreatePost] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [userPhotos, setUserPhotos] = useState([]);
  const [auth, setAuth] = useState(Cookies.get("jwt"));

  const router = useRouter();

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
    // setIsshowCreateComment(false);
    setIsshowCreatePost(!isShowCreatePost);
  };

  function handleHomeNav() {
    router.push("/");
  }

  const handleShowTrash = () => {
    if (isShowDelete === true) {
      setIsShowDelete(false);
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
      // handleGetPhoto(user?.id);

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
    }
  }, [setUser, auth]);

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
                  handleGetPhotos={handleGetPhotos}
                  handleCreatePost={handleCreatePost}
                  handleHomeNav={handleHomeNav}
                  isShowCreatePost={isShowCreatePost}
                  userPhotoLink={userPhotoLink}
                />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
