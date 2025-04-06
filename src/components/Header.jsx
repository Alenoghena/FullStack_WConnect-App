import React from "react";
import { MdPersonOutline } from "react-icons/md";
// import Image from "next/image";
// const API_PHOTO_URLHeader =
//   "https://full-stack-w-connect-app.vercel.app/images/";
const API_PHOTO_URLHeader = "http://localhost:3000/images/";
// const API_PHOTO_URLHeader =
// "https://res.cloudinary.com/di3pz1oyv/image/upload/";
function Header({
  handleHomeNav,
  handleNewsFeedNav,
  handlePoliticsNav,
  handleCreatePost,
  handleLogout,
  handleShowFile,
  userPhoto,
}) {
  return (
    <header className="flex flex-col justify-between items-center gap-2 text-lg bg-slate-900 mx-auto px-4 py-1 w-screen md:flex-row sticky top-0 drop-shadow-xl z-10">
      <button className="p-4 mx-2" onClick={handleHomeNav}>
        Home
      </button>

      <button
        type="button"
        onClick={handleCreatePost}
        className="cursor-pointer header__btn"
      >
        Create A Post
      </button>

      <button
        type="button"
        onClick={handleLogout}
        className="cursor-pointer header__btn"
      >
        Logout
      </button>
      <button
        type="button"
        className="cursor-pointer header__btn"
        onClick={handleNewsFeedNav}
      >
        NewsFeed
      </button>
      <button
        type="button"
        className="cursor-pointer header__btn"
        onClick={handlePoliticsNav}
      >
        Politics
      </button>
      <button type="button" className="cursor-pointer header__btn">
        Chat
      </button>

      {userPhoto && (
        <img
          src={`${userPhoto.profilePhoto}`}
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

export default Header;
