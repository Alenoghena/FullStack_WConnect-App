// "use client";
// import React, { useCallback, useEffect, useState } from "react";
// import { FaRegThumbsUp } from "react-icons/fa";
// import { MdPersonOutline } from "react-icons/md";
// import CreateComment from "@/app/createComment/page";
// import Header from "@/components/Header";
// import { getData } from "@/lib/index";
// import { useParams } from "next/navigation";
// import Cookies from "js-cookie";
// import { likesPutReq } from "@/lib/reqAPI/postRequests";
// import {
//   commentsReq,
//   likesReq,
//   photoReq,
//   usersReq,
// } from "@/lib/reqAPI/apiRequests";

// const API_PHOTO_URL = "http://localhost:3000/images/";

// const PostPage = ({
//   post,
//   handleCreateComment,
//   handleLogout,
//   handleShowFile,
//   isShowHome,
//   deletepath,
//   handleHomeNav,
//   isShowComment,
//   handleDelete,
//   isShowCreateComment,
//   setDeletePath,
//   isShowDelete,
//   setIsShowDelete,
//   deleteMsg,
//   userPhotoLink,
//   // image,
//   postUserId,
// }) => {
//   const [errMsg, setErrMsg] = useState("");
//   const [comments, setComments] = useState([]);
//   const [postComments, setPostComments] = useState([]);
//   const [likePost, setLikePost] = useState([]);
//   const [likeResp, setLikeResp] = useState({});
//   const [isthumbUp, setIsThumbUp] = useState(false);
//   //   const [post, setPost] = useState({});
//   const [user, setUser] = useState({});
//   const [pix, setPix] = useState(null);

//   const postText = post?.postText;
//   const username = post?.username;
//   const title = post?.title;

//   //   const { postId } = useParams();
//   const postId = post.id;

//   const foundColor = (postId, userId) =>
//     likePost.find(
//       (like) =>
//         like.PostId === postId &&
//         like.UserId === userId &&
//         like.likeStatus === true
//     );

//   const count = (data) => {
//     const count = data.reduce(
//       (count, item) => (item.likeStatus ? ++count : count),
//       0
//     );
//     return count;
//   };

//   const foundLike = (postId, userId) =>
//     likePost.reduce(
//       (count, like) =>
//         like.PostId === postId && like.UserId === userId ? ++count : count,
//       0
//     );

//   const handleUser = useCallback(async () => {
//     try {
//       // const options = {
//       //   headers: {
//       //     authorization: `Bearer ${Cookies.get("jwt")}`,
//       //     email: localStorage.getItem("email"),
//       //   },
//       // };
//       const email = localStorage.getItem("email");
//       const resp = await usersReq(email);
//       console.log(resp);
//       setUser(resp);
//     } catch (err) {
//       const message = `User handleUsers-Unauthorized! ${err.message}`;
//     }
//   }, [setUser]);

//   const handlePost = useCallback(
//     async (postId) => {
//       try {
//         const options = {
//           headers: {
//             authorization: `Bearer ${Cookies.get("jwt")}`,
//           },
//         };

//         const resp = await getData(
//           `controller/posts/getPosts/${postId}`,
//           options
//         );
//         console.log(resp);
//         setPost(resp);
//       } catch (err) {
//         const message = `Home handlePost-Unauthorized! ${err.message}`;
//         setErrMsg(message);
//       }
//     },
//     [setPost, setErrMsg]
//   );

//   const handleLikes = async (id) => {
//     const status = likeResp?.likeStatus;

//     if (likeResp.likeStatus && foundLike(id, user.id) > 0) {
//       const resp = await likesPutReq(id, status);

//       setLikeResp(resp);
//       localStorage.setItem("resp", JSON.stringify(resp));
//       localStorage.setItem("thumbup", JSON.stringify(!isthumbUp));
//       setIsThumbUp(!isthumbUp);
//     } else if (!likeResp.likeStatus && foundLike(id, user?.id) > 0) {
//       const resp = await likesPutReq(id, status);

//       setLikeResp(resp);

//       setIsThumbUp(!isthumbUp);
//     } else if (foundLike(id, user.id) === 0) {
//       // console.log(foundLike(id, user?.id));
//       const resp = await likesCreateReq(id, status);
//       setLikeResp(resp);

//       setIsThumbUp(!isthumbUp);
//     }
//   };

//   const handleComments = async (ID) => {
//     try {
//       const resps = await commentsReq(ID);

//       setPostComments(resps);
//     } catch (err) {
//       const message = `Post handleComments-Unauthorized! ${err.message}`;
//       setErrMsg(message);
//     }
//   };

//   const handleGetLikes = async (postId) => {
//     try {
//       const userId = user?.id;
//       const resps = await likesReq(postId, userId);

//       setLikePost(resps);
//     } catch (err) {
//       const message = `Post handleLikes-Unauthorized! ${err.message}`;
//       setErrMsg(message);
//     }
//   };

//   const userPix = async (userId) => {
//     try {
//       const resp = await photoReq(userId);
//       setPix(resp);
//     } catch (err) {
//       const message = `Post profile picture-Unauthorized! ${err.message}`;
//     }
//   };

//   useEffect(() => {
//     if (handlePost) {
//       handlePost(postId);
//     }
//     if (handleUser) {
//       handleUser();
//     }
//   }, [handlePost, handleUser]);

//   useEffect(() => {
//     if (post) {
//       userPix(post?.userId);
//     }
//     if (comments) {
//       handleComments(post?.id);
//     }
//     if (likeResp) {
//       handleGetLikes(post?.id);
//     }
//   }, [post, comments, deleteMsg, likeResp]);

//   return (
//     <div className="flex flex-col justify-center items-center gap-4">
//       <Header
//         handleHomeNav={handleHomeNav}
//         handleCreateComment={handleCreateComment}
//         handleDelete={handleDelete}
//         handleLogout={handleLogout}
//         handleShowFile={handleShowFile}
//         isShowComment={isShowComment}
//         isShowDelete={isShowDelete}
//         isShowHome={isShowHome}
//         userPhoto={pix}
//         userPhotoLink={userPhotoLink}
//         user={user}
//         deletepath={deletepath}
//         postUserId={postUserId}
//       />
//       {errMsg && <p>{errMsg}</p>}
//       <main className="mt-20">
//         <section
//           className="post post--comment"
//           data-id={postId}
//           onClick={() => setIsShowDelete(!isShowDelete)}
//         >
//           <div className="flex justify-between w-[500px] rounded-t-md bg-blue-500 py-2 px-4">
//             <div className="flex justify-between items-center w-[300px] ">
//               {!pix && (
//                 <span className="userIcon">
//                   <MdPersonOutline />{" "}
//                 </span>
//               )}
//               {pix && (
//                 <img
//                   src={`${API_PHOTO_URL}${pix}`}
//                   alt="UserPix"
//                   style={{ width: 60, height: 60, borderRadius: 50 }}
//                   className="img-user"
//                 />
//               )}
//               <span className="user">{username}</span>
//             </div>
//             <span className="titleBox--title">{title}</span>
//           </div>
//           <div
//             className="w-[500px] h-40 mx-auto text-white text-xl bg-gray-500 px-2"
//             onClick={() =>
//               setDeletePath({
//                 path: `deletePost/${+postId}`,
//                 UserId: user.id,
//               })
//             }
//           >
//             {postText}
//           </div>
//           <div className="userBox">
//             <div className="flex justify-between w-[500px] rounded-b-md bg-blue-500 py-2 px-4">
//               <FaRegThumbsUp
//                 onClick={() => handleLikes(postId)}
//                 role="button"
//                 className={
//                   foundColor(postId, user?.id) ? "thumbColor" : "white"
//                 }
//               />

//               <span className="likeCount"> {count(likePost)}</span>
//             </div>
//           </div>
//         </section>

//         <section className="comments">
//           <h1>Comment Section</h1>

//           {postComments.map((comment) => {
//             const commentId = comment.id;
//             const name = comment.username;
//             return (
//               <div
//                 key={comment.id}
//                 data-id={comment.id}
//                 className="commentContainer"
//                 onClick={() => setIsShowDelete(!isShowDelete)}
//               >
//                 <div
//                   className=" commentBody"
//                   onClick={() =>
//                     setDeletePath({
//                       path: `deleteComment/${commentId}`,
//                       name,
//                       postId,
//                     })
//                   }
//                 >
//                   {comment.commentBody}
//                 </div>
//                 <div className="commentUser">{comment.username}</div>
//               </div>
//             );
//           })}
//         </section>
//         {isShowCreateComment && (
//           <CreateComment
//             user={user}
//             post={post}
//             comments={comments}
//             setComments={setComments}
//           />
//         )}
//       </main>
//     </div>
//   );
// };

// export default PostPage;
