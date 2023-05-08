import React from "react";
import { BsSpotify } from "react-icons/bs";
import { loginUrl } from "../util/spotify";
import logo from "../assets/logo.png";

const Login = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-2 h-[100vh]">
      <h1 className="flex items-center text-2xl text-light font-disp">
        <div className="flex justify-center items-center w-12 h-12 mr-2 p-1 rounded-md bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/50 to-secondary/50">
          <img
            src={logo}
            alt="SpotiDecks logo"
            className="w-12 invert"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(40%) sepia(92%) saturate(2553%) hue-rotate(337deg) brightness(91%) contrast(88%)",
            }}
          />
        </div>

        <span className="text-[3rem]">SpotiDecks</span>
      </h1>
      <span className="text-xs my-1 capitalize">spotify playlist builder</span>
      <div>
        <a
          href={loginUrl}
          className="flex justify-center items-center gap-2 p-2 my-2 rounded-sm bg-slate-500 hover:bg-[#1DB954]"
        >
          Login with
          <span className="flex items-center gap-1">
            <BsSpotify /> Spotify
          </span>
        </a>
      </div>
      {/* <div>Get your top tracks and artists as a card hand</div> */}
    </section>
  );
};

export default Login;
