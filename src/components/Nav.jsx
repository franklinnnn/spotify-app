import React, { useContext, useEffect, useRef, useState } from "react";
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
import { AiOutlineClose } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";

const Nav = () => {
  const { setToken } = useContext(MainContext);
  const {
    mobileMenuRef,
    isMobileMenuComponentVisible,
    setIsMobileMenuComponentVisible,
  } = mobileMenuComponentVisible(false);
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
    <div
      className="flex w-full bg-slate-800 p-2 px-4 justify-between items-center capitalize rounded-t-sm"
      ref={mobileMenuRef}
    >
      <div className="flex flex-col capitalize text-sm">
        <span className="text-2xl flex">
          <span className="max-sm:hidden">Cardify</span> 🎴
        </span>
        <span className="text-xs max-sm:hidden">top track generator</span>
      </div>
      <div
        className={`flex items-center justify-evenly gap-6 py-1 max-sm:gap-2
        }`}
      >
        <NavLink
          to="/top-tracks"
          className="flex flex-col justify-center items-center gap-1 text-3xl w-28 hover:cursor-pointer max-sm:w-8 max-sm:text-2xl"
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
          className="flex flex-col justify-center items-center gap-1 text-3xl w-28 hover:cursor-pointer max-sm:w-8 max-sm:text-2xl"
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
          className="flex flex-col justify-center items-center gap-1 text-3xl w-28 hover:cursor-pointer max-sm:w-8 max-sm:text-2xl"
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
          className="flex flex-col justify-center items-center gap-1 text-3xl w-28 hover:cursor-pointer max-sm:w-8 max-sm:text-2xl"
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
      <div className="flex gap-4 items-center text-xs max-sm:hidden">
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
          <span>logout</span>
        </button>
      </div>
      <div
        className=" bg-slate-900 p-2 rounded hover:bg-slate-600  md:hidden"
        onClick={() => setIsMobileMenuComponentVisible(true)}
      >
        <span className="text-xl">
          <BiMenu />
        </span>
      </div>
      <AnimatePresence>
        {isMobileMenuComponentVisible && (
          <motion.div
            className="absolute top-2 right-4 flex flex-col items-end gap-2 p-2 w-[5rem] bg-slate-600 rounded text-sm md:hidden overflow-hidden z-20 shadow-[0_0.2rem_1rem_0.6rem_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, width: "5rem", height: 0 }}
            animate={{
              opacity: 1,
              width: "5rem",
              height: "auto",
              transition: { duration: 0.15 },
            }}
            exit={{
              opacity: 0,
              width: "4rem",
              height: 0,
            }}
          >
            <span
              className="text-xl text-white"
              onClick={() => setIsMobileMenuComponentVisible(false)}
            >
              <AiOutlineClose />
            </span>
            <motion.div
              className="flex flex-col text-right gap-2"
              initial={{ opacity: 0, y: -1, width: 0 }}
              animate={{
                opacity: 1,
                y: 0,
                width: "auto",
                transition: { duration: 0.25 },
              }}
              exit={{ opacity: 0, y: -1 }}
            >
              <span>
                <NavLink
                  to="/about"
                  onClick={() => {
                    setActivePage("");
                    setIsMobileMenuComponentVisible(false);
                  }}
                >
                  About
                </NavLink>
              </span>
              <button onClick={logout}>Logout</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const mobileMenuComponentVisible = (initialVisible) => {
  const [isMobileMenuComponentVisible, setIsMobileMenuComponentVisible] =
    useState(initialVisible);

  const mobileMenuRef = useRef();
  const handleClickOutside = (e) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
      setIsMobileMenuComponentVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return {
    mobileMenuRef,
    isMobileMenuComponentVisible,
    setIsMobileMenuComponentVisible,
  };
};

export default Nav;
