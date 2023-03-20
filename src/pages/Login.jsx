import React from "react";
import { REDIRECT_URI, AUTH_URL, RESPONSE_TYPE, SCOPE } from "../util/spotify";
import { BsSpotify } from "react-icons/bs";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2  h-[100vh]">
      <h1 className="text-2xl mb-2">Copy of Receiptify</h1>
      <div>
        <a
          href={`${AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
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
