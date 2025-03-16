"use client";
import React, { useCallback, useEffect, useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { MdPersonOutline } from "react-icons/md";
import CreateComment from "@/app/(frontend)/createComment/page";
import PostHeader from "@/components/postHeader";
import { logoutReq } from "@/lib/reqAPI/logout";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { likesPutReq } from "@/lib/reqAPI/postRequests";
import {
  commentsReq,
  likesReq,
  photoReq,
  postReq,
  usersReq,
} from "@/lib/reqAPI/apiRequests";
import { deletePostReq, deleteCommentReq } from "@/lib/reqAPI/delete";
import ProfilePicture from "@/app/(frontend)/profilePicture/page";

const API_PHOTO_URL = "https://full-stack-w-connect-app.vercel.app/images/";
// const API_PHOTO_URL = "http://localhost:3000/images/";

const PostPage = ({ userPhotoLink }) => {
  const [errMsg, setErrMsg] = useState("");
  const [comments, setComments] = useState([]);
  const [likePost, setLikePost] = useState([]);
  const [likeResp, setLikeResp] = useState({});
  const [isthumbUp, setIsThumbUp] = useState(false);
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [pix, setPix] = useState(null);
  const [postPix, setPostPix] = useState(null);
  const [postUserId, setpostUserId] = useState(0);
  const [isShowCreatePost, setIsshowCreatePost] = useState(false);
  const [isShowCreateComment, setIsshowCreateComment] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showDelete, setShowDelete] = useState({
    id: null,
    name: "",
    show: false,
  });
  const [deleteMsg, setDeleteMsg] = useState("");

  const postText = post?.postText;
  const username = post?.username;
  const title = post?.title;

  const { postId } = useParams();
  const router = useRouter();

  const handleLogout = async () => {
    const email = user?.email;
    const resp = await logoutReq(email);

    if (resp.status === 201 || resp.status === 204) {
      Cookies.remove("jwt");

      router.push("/auth");
    }
  };

  const handleDelete = async () => {
    if (showDelete.name === "post") {
      const deleteResp = await deletePostReq(
        `posts/deletePost/${showDelete.id}`,
        user.id
      );

      setDeleteMsg(deleteResp);
      router.push("/");
    } else {
      const deleteResp = await deleteCommentReq(
        `comments/deleteComment/${showDelete.id}`,
        postId
      );
      setDeleteMsg(deleteResp);
    }
  };

  const handleShowPhoto = () => {
    const isShowPix = showPhoto ? false : true;
    setShowPhoto(isShowPix);
  };

  const foundColor = (postId, userId) =>
    likePost.find(
      (like) =>
        like.PostId === postId &&
        like.UserId === userId &&
        like.likeStatus === true
    );

  const count = (data) => {
    const count = data.reduce(
      (count, item) => (item.likeStatus ? ++count : count),
      0
    );
    return count;
  };

  const foundLike = (postId, userId) =>
    likePost.reduce(
      (count, like) =>
        like.PostId === postId && like.UserId === userId ? ++count : count,
      0
    );

  const handleUser = useCallback(async () => {
    try {
      const email = localStorage.getItem("email");
      const resp = await usersReq(email);

      setUser(resp);
    } catch (err) {
      const message = `User handleUsers-Unauthorized! ${err.message}`;
    }
  }, [setUser]);

  const handlePost = useCallback(
    async (postId) => {
      try {
        const resp = await postReq(postId);

        setPost(resp);
      } catch (err) {
        const message = `Home handlePost-Unauthorized! ${err.message}`;
        setErrMsg(message);
      }
    },
    [setPost, setErrMsg]
  );

  const handleLikes = async (id) => {
    const status = likeResp?.likeStatus;

    if (likeResp.likeStatus && foundLike(id, user.id) > 0) {
      const resp = await likesPutReq(id, status);

      setLikeResp(resp);
      localStorage.setItem("resp", JSON.stringify(resp));
      localStorage.setItem("thumbup", JSON.stringify(!isthumbUp));
      setIsThumbUp(!isthumbUp);
    } else if (!likeResp.likeStatus && foundLike(id, user?.id) > 0) {
      const resp = await likesPutReq(id, status);

      setLikeResp(resp);

      setIsThumbUp(!isthumbUp);
    } else if (foundLike(id, user.id) === 0) {
      const resp = await likesCreateReq(id, status);
      setLikeResp(resp);

      setIsThumbUp(!isthumbUp);
    }
  };

  const handleComments = useCallback(
    async (ID) => {
      try {
        const resps = await commentsReq(ID);

        setComments(resps);
      } catch (err) {
        const message = `Post handleComments-Unauthorized! ${err.message}`;
        setErrMsg(message);
      }
    },
    [setComments, setErrMsg]
  );

  const handleGetLikes = async (postId) => {
    try {
      const userId = user?.id;
      const resps = await likesReq(postId, userId);

      setLikePost(resps);
    } catch (err) {
      const message = `Post handleLikes-Unauthorized! ${err.message}`;
      setErrMsg(message);
    }
  };

  const userPix = async (userId) => {
    try {
      const resp = await photoReq(userId);
      setPix(resp);
    } catch (err) {
      const message = `Post profile picture-Unauthorized! ${err.message}`;
    }
  };
  const postPhoto = async (postId) => {
    try {
      const resp = await photoReq(postId);
      setPostPix(resp);
    } catch (err) {
      const message = `Post profile picture-Unauthorized! ${err.message}`;
    }
  };

  const handleCreateComment = () => {
    setIsshowCreateComment(!isShowCreateComment);
    setIsshowCreatePost(false);
  };

  function handleHomeNav() {
    router.push("/");
  }

  useEffect(() => {
    if (handlePost || deleteMsg) {
      handlePost(postId);
    }
    if (handleUser) {
      handleUser();
    }
    if (handleComments || deleteMsg) {
      handleComments(postId);
    }
  }, [handlePost, handleUser, handleComments, deleteMsg]);

  useEffect(() => {
    if (post) {
      userPix(user?.id);
    }
    if (post) {
      postPhoto(post?.userId);
    }

    if (likeResp) {
      handleGetLikes(post?.id);
    }
  }, [post, deleteMsg, likeResp]);

  return (
    <div
      key={postId}
      className="flex flex-col justify-center items-center gap-4"
    >
      <PostHeader
        handleHomeNav={handleHomeNav}
        handleCreateComment={handleCreateComment}
        handleDelete={handleDelete}
        handleLogout={handleLogout}
        handleShowFile={handleShowPhoto}
        showDelete={showDelete}
        isShowCreatePost={isShowCreatePost}
        userPhoto={pix}
        userPhotoLink={userPhotoLink}
        user={user}
        postUserId={postUserId}
      />
      {errMsg && <p>{errMsg}</p>}

      <section className="post post--comment" data-id={postId}>
        <div className="flex justify-between w-[500px] rounded-t-md bg-blue-500 py-2 px-4">
          <div className="flex justify-between items-center w-[500px] ">
            {!postPix && (
              <span className="userIcon">
                <MdPersonOutline />
              </span>
            )}
            {postPix && (
              <img
                src={`${API_PHOTO_URL}${postPix}`}
                alt="UserPix"
                style={{ width: 60, height: 60, borderRadius: 50 }}
                className="img-user"
              />
            )}
            <span className="user">{username}</span>
            <span className="font-bold">{title}</span>
          </div>
        </div>
        <div
          className="w-[500px] h-40 mx-auto text-white text-xl bg-gray-500 px-2"
          onClick={() =>
            setShowDelete({ id: postId, name: "post", show: !showDelete.show })
          }
        >
          {postText}
        </div>
        <div className="userBox">
          <div className="flex justify-between w-[500px] rounded-b-md bg-blue-500 py-2 px-4">
            <FaRegThumbsUp
              onClick={() => handleLikes(postId)}
              role="button"
              className={foundColor(postId, user?.id) ? "thumbColor" : "white"}
            />

            <span className="likeCount"> {count(likePost)}</span>
          </div>
        </div>
      </section>

      <h1>Comment Section</h1>

      {comments.map((comment) => {
        const commentId = comment.id;

        return (
          <div
            key={comment.id}
            data-id={comment.id}
            className="commentContainer"
            onClick={() =>
              setShowDelete({
                id: commentId,
                name: "comment",
                show: !showDelete.show,
              })
            }
          >
            <div className="w-[300px] h-40 mx-auto text-white rounded-t-md text-xl bg-slate-500 px-2">
              {comment.commentBody}
            </div>
            <div className="w-[300px]  text-white text-2xl text-center rounded-b-md bg-blue-400">
              {comment.username}
            </div>
          </div>
        );
      })}

      {isShowCreateComment && (
        <CreateComment
          user={user}
          postId={postId}
          comments={comments}
          setComments={setComments}
        />
      )}
      {showPhoto && (
        <ProfilePicture
          userId={user.id}
          userPhoto={pix}
          setUserPhoto={setPix}
        />
      )}
    </div>
  );
};

export default PostPage;
