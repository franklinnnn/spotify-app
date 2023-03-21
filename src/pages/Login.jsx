import React from "react";
import { BsSpotify } from "react-icons/bs";
import { loginUrl } from "../util/spotify";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2  h-[100vh]">
      <h1 className="text-2xl mb-2">Copy of Receiptify</h1>
      <div>
        <a
          href={loginUrl}
          className="flex justify-center items-center gap-2 p-2 rounded-sm bg-slate-500 hover:bg-slate-600"
        >
          Login to
          <span className="flex items-center gap-1">
            <BsSpotify /> Spotify
          </span>
        </a>
      </div>
    </div>
  );
};

export default Login;
