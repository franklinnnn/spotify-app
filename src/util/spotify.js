import axios from "axios";
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
// export const REDIRECT_URI = "http://127.0.0.1:5173/";
export const REDIRECT_URI = "https://spotify-app-franklinnn.vercel.app/";
export const ACCESS_TOKEN = "https://accounts.spotify.com/api/token";
export const AUTH_URL = "https://accounts.spotify.com/authorize";
export const SCOPE =
  "user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-recently-played user-top-read";
export const RESPONSE_TYPE = "token";

export const loginUrl = `${AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

export const getUserToken = () => {
  const hash = window.location.hash;
  let token = window.localStorage.getItem("token");

  if (!token && hash) {
    token = hash
      .substring(1)
      .split("&")
      .find((element) => element.startsWith("access_token"))
      .split("=")[1];
    window.location.hash = "";
    window.localStorage.setItem("token", token);
  }
  return token;
};

export const getUserTopItems = async (type, length) => {
  const token = getUserToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/me/top/${type}?time_range=${length}&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.items;
};

export const getUserProfile = async () => {
  const token = getUserToken();
  const response = await axios.get(`https://api.spotify.com/v1/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.display_name;
};
