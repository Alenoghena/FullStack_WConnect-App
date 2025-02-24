import React from "react";
import { MdPersonOutline } from "react-icons/md";

function AuthHeader() {
  return (
    <header className="flex flex-col  top-0 justify-between items-center gap-2 text-lg bg-slate-900 mx-auto px-4 py-1 w-screen md:flex-row  drop-shadow-xl z-10">
      <button className="p-4 mx-2">Home</button>

      <div className="text-6xl pr-4 mx-2" onClick={() => handleShowFile()}>
        <MdPersonOutline />
      </div>
    </header>
  );
}

export default AuthHeader;
