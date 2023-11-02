import { useContext, useState } from "react";
import { MainContext } from "../MainContext";
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
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import { ToastContainer } from "react-toastify";
import { Menu } from "@headlessui/react";

const Nav = ({ setToken }) => {
  const { setCardHand } = useContext(MainContext);
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
    <nav className="flex w-full md:w-[900px] bg-slate-800/40 p-4 my-4 justify-between items-center capitalize rounded-md">
      <header className="flex flex-col capitalize text-sm">
        <NavLink
          to="/top-tracks"
          className="text-2xl flex items-center"
          onClick={() => setActivePage("tracks")}
        >
          <div className="flex justify-center items-center w-10 h-10 mr-2 p-1 rounded-md bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/50 to-secondary/50">
            <img
              src={logo}
              alt="logo"
              className="w-10 invert"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(40%) sepia(92%) saturate(2553%) hue-rotate(337deg) brightness(91%) contrast(88%)",
              }}
            />
          </div>
          <span className="max-sm:hidden font-disp tracking-wide uppercase text-[2.4rem]">
            Decksio
          </span>
        </NavLink>
      </header>
      <div
        className="flex items-center justify-evenly gap-2 md:gap-3 py-1 text-light/60
         w-full"
      >
        <NavLink
          to="/top-tracks"
          className="group/nav flex flex-col justify-center items-center gap-1 text-3xl w-28 hover:cursor-pointer  duration-150 ease-in-out max-sm:w-8 max-sm:text-2xl"
          onClick={() => setActivePage("tracks")}
        >
          {activePage === "tracks" ? (
            <HiMusicalNote className="text-light" />
          ) : (
            <HiOutlineMusicalNote className="group-hover/nav:text-light/80 group-hover/nav:scale-110 easy-in-out duration-300" />
          )}{" "}
          <span
            className={
              activePage === "tracks"
                ? "text-light text-xs max-sm:hidden"
                : "text-light/70 text-xs max-sm:hidden group-hover/nav:text-light/80 "
            }
          >
            Top Tracks
          </span>
        </NavLink>
        <NavLink
          to="/top-artists"
          className="group/nav flex flex-col justify-center items-center gap-1 text-3xl w-28 hover:cursor-pointer max-sm:w-8 max-sm:text-2xl"
          onClick={() => setActivePage("artists")}
        >
          {activePage === "artists" ? (
            <HiMicrophone className="text-light" />
          ) : (
            <HiOutlineMicrophone className="group-hover/nav:text-light/80 group-hover/nav:scale-110 easy-in-out duration-300" />
          )}{" "}
          <span
            className={
              activePage === "artists"
                ? "text-light text-xs max-sm:hidden"
                : "text-light/70 text-xs max-sm:hidden group-hover/nav:text-light/80 "
            }
          >
            Top Artists
          </span>
        </NavLink>
        <NavLink
          to="/recently-played"
          className="group/nav flex flex-col justify-center items-center gap-1 text-3xl w-28 hover:cursor-pointer max-sm:w-8 max-sm:text-2xl"
          onClick={() => setActivePage("recents")}
        >
          {activePage === "recents" ? (
            <HiClock className="text-light" />
          ) : (
            <HiOutlineClock className="group-hover/nav:text-light/80 group-hover/nav:scale-110  easy-in-out duration-300" />
          )}{" "}
          <span
            className={
              activePage === "recents"
                ? "text-light text-xs max-sm:hidden"
                : "text-light/70 text-xs max-sm:hidden group-hover/nav:text-light/80 "
            }
          >
            Recently Played
          </span>
        </NavLink>
        <NavLink
          to="/deck"
          className="group/nav flex flex-col justify-center items-center gap-1 text-3xl w-28 hover:cursor-pointer max-sm:w-8 max-sm:text-2xl"
          onClick={() => {
            setActivePage("deck");
            setCardHand("spread");
          }}
        >
          {activePage === "deck" ? (
            <RiStackFill className="text-light" />
          ) : (
            <RiStackLine className="group-hover/nav:text-light/80 group-hover/nav:scale-110  easy-in-out duration-300" />
          )}{" "}
          <span
            className={
              activePage === "deck"
                ? "text-light text-xs max-sm:hidden"
                : "text-light/70 text-xs max-sm:hidden group-hover/nav:text-light/80"
            }
          >
            Deck
          </span>
        </NavLink>
      </div>
      <div className="flex gap-4 items-center text-xs text-light/60 max-sm:hidden">
        <NavLink
          to="/about"
          className="hover:text-primary"
          onClick={() => setActivePage("about")}
        >
          <span
            className={
              activePage === "about"
                ? "text-light"
                : "text-light/60 hover:text-light"
            }
          >
            About
          </span>
        </NavLink>
        <button
          className="capitalize p-2 rounded border-2 border-light/40 hover:bg-slate-600 hover:text-light"
          onClick={logout}
        >
          <span>logout</span>
        </button>
      </div>

      <div className="block md:hidden mt-1">
        <Menu>
          <Menu.Button>
            <BiMenu
              size={28}
              className="rounded-full hover:bg-slate-600 px-1 w-8 transition"
            />
          </Menu.Button>
          <Menu.Items>
            <motion.div
              className="absolute right-4 top-9 flex flex-col items-end gap-1 bg-slate-600 rounded-md overflow-hidden"
              initial={{ opacity: 0, y: -1, width: 0 }}
              animate={{
                opacity: 1,
                y: 0,
                width: "auto",
                transition: { duration: 0.25 },
              }}
              exit={{ opacity: 0, y: -1 }}
            >
              <Menu.Item>
                {({ active }) => (
                  <NavLink
                    className={`${
                      active && "bg-slate-700/50"
                    } w-full text-right py-1 px-2`}
                    to="/about"
                  >
                    About
                  </NavLink>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-slate-700/50"
                    } w-full text-right py-1 px-2`}
                    onClick={logout}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </motion.div>
          </Menu.Items>
        </Menu>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="colored"
        limit={1}
      />
    </nav>
  );
};

export default Nav;
