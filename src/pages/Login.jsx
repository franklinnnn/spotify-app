import React from "react";
import { REDIRECT_URI, AUTH_URL, RESPONSE_TYPE, SCOPE } from "../util/spotify";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h1 className="text-2xl mb-2">Login to Spotify</h1>
      <div>
        <a
          href={`${AUTH_URL}?client_id=${
            import.meta.env.VITE_CLIENT_ID
          }&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
          className="p-2 bg-slate-500 hover:bg-slate-600"
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default Login;
