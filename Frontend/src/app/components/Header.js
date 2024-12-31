import React, { useState } from "react";
import { TiHome } from "react-icons/ti";
import { FaRegSquarePlus, FaRegHeart } from "react-icons/fa6";
import CreatePost from "./Home/CreatePost";
import { MdLogout } from "react-icons/md";

function Header() {
  const [openModal, setOpenModal] = useState(false);
  const toggle = () => {
    setOpenModal(!openModal);
  };

  const handleLogOut = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <header className="text-gray-600 body-font px-[200px] border-b border-[#393939]">
      <div className="container mx-auto flex p-4 justify-between items-center">
        <a
          href="/"
          className="flex title-font font-medium items-center text-gray-900"
        >
          {/* <img
            src="/Instagram_logo.svg.png"
            className="w-[150px] mx-auto invert"
          /> */}
          <h1 className="text-white text-3xl font-[cursive]">Socials</h1>
        </a>
        <div>
          <input
            type="text"
            placeholder="Search"
            className="w-[400px] placeholder:text-sm px-4 py-2 border border-[#393939] bg-[#161616] rounded focus:outline-none"
          />
        </div>
        <div className="text-white flex items-center gap-5  text-2xl">
          <TiHome className="cursor-pointer" />
          <FaRegSquarePlus className="cursor-pointer" onClick={toggle} />
          <FaRegHeart className="cursor-pointer" />
          <div className="w-[40px] h-[40px] cursor-pointer flex items-center justify-center text-lg rounded-full bg-black">
            {localStorage.getItem("username").split("")[0]}
          </div>
          <MdLogout onClick={handleLogOut} className="cursor-pointer" />
        </div>
      </div>
      <CreatePost toggle={toggle} openModal={openModal} />
    </header>
  );
}

export default Header;
