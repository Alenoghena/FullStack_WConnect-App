"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { MdPersonOutline } from "react-icons/md";
import Cookies from "js-cookie";
import CreatePosts from "../createPost/page";
import { usersReq, postsReq, photoReq } from "@/lib/reqAPI/apiRequests";
import { logoutReq } from "@/lib/reqAPI/logout";
import ProfilePicture from "../profilePicture/page";

// const API_PHOTO_URL = "https://full-stack-w-connect-app.vercel.app/images/";
const API_PHOTO_URL = "http://localhost:3000/images/";
// const API_PHOTO_URL = "https://res.cloudinary.com/di3pz1oyv/image/upload/";
//uploadpreset => wconnectstore
const HomePage = ({
  isShowCreatePost,
  userPhotoLink,
  handleCreatePost,
  handleHomeNav,
  handleGetPhotos,
}) => {
  const [posts, setPosts] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [user, setUser] = useState({});
  const [showPhoto, setShowPhoto] = useState(false);
  const [pix, setPix] = useState(null);

  const router = useRouter();

  const handleLogout = async () => {
    const email = user?.email;
    const resp = await logoutReq(email);

    if (resp.status === 204 || resp.status === 201) {
      Cookies.remove("jwt");

      router.push("/auth");
    }
  };

  const handleShowPhoto = () => {
    const isShowPix = showPhoto ? false : true;
    setShowPhoto(isShowPix);
  };

  function handleCommentsNav(id) {
    router.push(`/post/${id}`);
  }
  function handleNewsFeedNav() {
    router.push("/newsFeed");
  }
  function handlePoliticsNav(id) {
    router.push("/politics");
  }

  const handlePosts = useCallback(async () => {
    try {
      const resp = await postsReq();

      setPosts(resp);
    } catch (err) {
      const message = `Home handlePost-Unauthorized! ${err.message}`;
      setErrMsg(message);
    }
  }, [setPosts, setErrMsg]);

  const handleUsers = useCallback(async () => {
    try {
      const email = localStorage.getItem("email");
      const resp = await usersReq(email);
      setUser(resp);
    } catch (err) {
      const message = `User handleUsers-Unauthorized! ${err.message}`;
    }
  }, [setUser]);

  const userPix = async (userId) => {
    try {
      const resp = await photoReq(userId);
      setPix(resp);
      console.log("resp", resp);
    } catch (err) {
      const message = `Post profile picture-Unauthorized! ${err.message}`;
    }
  };

  useEffect(() => {
    handleUsers();
  }, [handleUsers]);

  useEffect(() => {
    if (user) {
      userPix(user?.id);
    }

    if (handlePosts) {
      handlePosts();
    }
    if (pix) {
      console.log("picture..", pix);
      handleGetPhotos();
    }
  }, [handlePosts, user]);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Header
        handleHomeNav={handleHomeNav}
        handleNewsFeedNav={handleNewsFeedNav}
        handlePoliticsNav={handlePoliticsNav}
        handleCreatePost={handleCreatePost}
        handleLogout={handleLogout}
        handleShowFile={handleShowPhoto}
        userPhoto={pix}
      />
      <div className="flex flex-col gap-8 items-start w-32 md:items-center">
        <div>
          <h1 className="text-3xl text-center my-8">
            Welcome to Wconnect App, {user?.username}
          </h1>
          {posts?.map((post) => {
            return (
              <div
                key={post.id}
                data-id={post.id}
                className="mb-10"
                onClick={() => handleCommentsNav(post.id)}
              >
                {errMsg && <p>{errMsg}</p>}
                <div className="flex flex-col justify-center items-center">
                  <div className="flex justify-between items-center w-[500px] rounded-t-md bg-blue-500 py-2 px-4">
                    {!userPhotoLink(post.userId) && (
                      <span className="userIcon">
                        <MdPersonOutline />
                      </span>
                    )}

                    {userPhotoLink(post.userId) && (
                      <img
                        src={`${userPhotoLink(post.userId)}`}
                        alt="UserPix"
                        style={{ width: 60, height: 60, borderRadius: 50 }}
                        className="img-user"
                      />
                    )}
                    {post.title}
                  </div>
                  <div className="w-[500px] h-40 mx-auto text-white text-xl bg-gray-500 px-2">
                    {post.postText}
                  </div>
                  <div className="w-[500px] h-20 text-white text-2xl text-center rounded-b-md bg-blue-500">
                    {post.username}
                  </div>
                </div>
              </div>
            );
          })}

          {isShowCreatePost && (
            <CreatePosts user={user} posts={posts} setPosts={setPosts} />
          )}
          {showPhoto && (
            <ProfilePicture
              userId={user?.id}
              userPhoto={pix}
              setUserPhoto={setPix}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
