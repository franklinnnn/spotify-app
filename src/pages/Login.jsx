import React from "react";
import { BsSpotify } from "react-icons/bs";
import { loginUrl } from "../util/spotify";

const Login = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-2  h-[100vh]">
      <h1 className="flex items-center text-2xl text-light font-disp">
        🎴<span className="text-[3rem]">SpotiDeck</span>
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
