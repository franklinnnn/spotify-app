import React from "react";
import { BsSpotify } from "react-icons/bs";
import { loginUrl } from "../util/spotify";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2  h-[100vh]">
      <h1 className="text-2xl">Card... ify 🎴 or something</h1>
      <span className="text-xs">title pending</span>
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
    </div>
  );
};

export default Login;
