import axios from "axios";
export const REDIRECT_URI = "http://127.0.0.1:5173/";
export const ACCESS_TOKEN = "https://accounts.spotify.com/api/token";
export const AUTH_URL = "https://accounts.spotify.com/authorize";
export const SCOPE =
  "user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-recently-played user-top-read";
export const RESPONSE_TYPE = "token";

export const getUserTopItems = async (type, length, token) => {
  axios
    .get(
      `https://api.spotify.com/v1/me/top/${type}?time_range=${length}&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      return response.data.items;
      console.log(response.data.items);
    });
};

export const getUserProfile = async (token) => {
  axios
    .get(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.display_name;
    });
};
