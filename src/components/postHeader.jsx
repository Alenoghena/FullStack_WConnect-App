import React from "react";
import { MdPersonOutline } from "react-icons/md";

const API_PHOTO_URLHeader =
  "https://full-stack-w-connect-app.vercel.app/images/";
// const API_PHOTO_URLHeader = "http://localhost:3000/images/";
function PostHeader({
  handleHomeNav,
  handleCreateComment,
  handleDelete,
  handleLogout,
  handleShowFile,
  showDelete,
  userPhoto,
}) {
  return (
    <header className="flex flex-col justify-between items-center gap-2 text-lg bg-slate-900 mx-auto px-4 py-1 w-screen md:flex-row sticky top-0 drop-shadow-xl z-10">
      <button className="p-4 mx-2" onClick={handleHomeNav}>
        Home
      </button>

      <button
        type="button"
        onClick={handleCreateComment}
        className="header__btn-comment"
      >
        Create A Comment
      </button>

      <button type="button" onClick={handleLogout} className="header__btn">
        Logout
      </button>
      <button type="button" className="header__btn">
        NewsFeed
      </button>
      <button type="button" className="header__btn">
        Politics
      </button>
      <button type="button" className="header__btn">
        Chat
      </button>
      {((showDelete.name === "post" && showDelete.show) ||
        (showDelete.name === "comment" && showDelete.show)) && (
        <button
          type="button"
          onClick={() => handleDelete()}
          className="header__btn overlay"
        >
          Delete Item
        </button>
      )}
      {userPhoto && (
        <img
          src={`${API_PHOTO_URLHeader}${userPhoto}`}
          alt="UserPix"
          width={50}
          height={50}
          className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black w-20 h-20 rounded-full mx-2"
          onClick={() => handleShowFile()}
        />
      )}
      {!userPhoto && (
        <div className="text-6xl pr-4 mx-2" onClick={() => handleShowFile()}>
          <MdPersonOutline />
        </div>
      )}
    </header>
  );
}

export default PostHeader;
