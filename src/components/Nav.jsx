import React, { useContext, useState } from "react";
import { MainContext } from "../pages/Home";
import { NavLink } from "react-router-dom";
import {
  HiMusicalNote,
  HiOutlineMusicalNote,
  HiMicrophone,
  HiOutlineMicrophone,
  HiClock,
  HiOutlineClock,
} from "react-icons/hi2";
import { RiStackLine, RiStackFill } from "react-icons/ri";
import { BiMenu } from "react-icons/bi";

const Nav = () => {
  const { setToken } = useContext(MainContext);

  const [activePage, setActivePage] = useState("tracks");
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    const url = "https://accounts.spotify.com/en/status";
    const logoutWindow = window.open(
      url,
      "Spotify Logout",
      "width=700, height=500, top=40, left=40"
    );
    setTimeout(() => logoutWindow.close(), 2000);
  };

  return (
    <div className="flex w-full bg-slate-800 p-2 px-4 justify-between items-center capitalize rounded-t-sm">
      <div className="flex flex-col capitalize text-sm">
        <span className="text-2xl flex">
          <span className="max-sm:hidden">Cardify</span> 🎴
        </span>
        <span className="text-xs max-sm:hidden">top track generator</span>
      </div>
      <div className="flex items-center justify-evenly gap-6 py-1 max-sm:gap-2">
        <NavLink
          to="/top-tracks"
          className="flex flex-col justify-center items-center gap-1 text-3xl w-28 hover:cursor-pointer max-sm:w-10"
          onClick={() => setActivePage("tracks")}
        >
          {activePage === "tracks" ? (
            <HiMusicalNote />
          ) : (
            <HiOutlineMusicalNote className="hover:scale-110 easy-in-out duration-300" />
          )}{" "}
          <span className="text-xs max-sm:hidden">Top Tracks</span>
        </NavLink>
        <NavLink
          to="/top-artists"
          className="flex flex-col justify-center items-center gap-1 text-3xl w-28 hover:cursor-pointer max-sm:w-10"
          onClick={() => setActivePage("artists")}
        >
          {activePage === "artists" ? (
            <HiMicrophone />
          ) : (
            <HiOutlineMicrophone className="hover:scale-110 easy-in-out duration-300" />
          )}{" "}
          <span className="text-xs max-sm:hidden">Top Artists</span>
        </NavLink>
        <NavLink
          to="/recently-played"
          className="flex flex-col justify-center items-center gap-1 text-3xl w-28 hover:cursor-pointer max-sm:w-10"
          onClick={() => setActivePage("recents")}
        >
          {activePage === "recents" ? (
            <HiClock />
          ) : (
            <HiOutlineClock className="hover:scale-110 easy-in-out duration-300" />
          )}{" "}
          <span className="text-xs max-sm:hidden">Recently Played</span>
        </NavLink>
        <NavLink
          to="/deck"
          className="flex flex-col justify-center items-center gap-1 text-3xl w-28 hover:cursor-pointer max-sm:w-10"
          onClick={() => setActivePage("deck")}
        >
          {activePage === "deck" ? (
            <RiStackFill />
          ) : (
            <RiStackLine className="hover:scale-110 easy-in-out duration-300" />
          )}{" "}
          <span className="text-xs max-sm:hidden">Deck</span>
        </NavLink>
      </div>
      <div className="flex gap-4 items-center text-xs ">
        <NavLink
          to="/about"
          className="hover:text-primary"
          onClick={() => setActivePage("")}
        >
          About
        </NavLink>
        <button
          className="capitalize bg-slate-900 p-2 rounded hover:bg-slate-600"
          onClick={logout}
        >
          <span className="max-sm:hidden">logout</span>
          <span className="text-xl md:hidden">
            <BiMenu />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Nav;
