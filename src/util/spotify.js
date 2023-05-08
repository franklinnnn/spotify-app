import axios from "axios";
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
// export const REDIRECT_URI = "http://127.0.0.1:5173/";
export const REDIRECT_URI = "https://spotidecks.vercel.app/";
export const ACCESS_TOKEN = "https://accounts.spotify.com/api/token";
export const AUTH_URL = "https://accounts.spotify.com/authorize";
export const SCOPE =
  "user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-modify-public playlist-modify-private";
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
    `https://api.spotify.com/v1/me/top/${type}?time_range=${length}&limit=9`,
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
  return response.data;
};

export const getNew = async () => {
  const token = getUserToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/search?q=tag:new&type=album,track&market=JP&limit=50&`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getRelatedArtists = async (artistId) => {
  const token = getUserToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.artists;
};

export const getArtistGenre = async (artistId) => {
  const token = getUserToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const genres = response.data.genres.slice(0, 3);
  return genres.join(",");
};

export const getArtistAlbums = async (artistId) => {
  const token = getUserToken();
  const market = await getUserProfile().then((response) => response.country);
  const response = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}/albums?market=${market}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.items;
};

export const getArtistTracks = async (artistId) => {
  const token = getUserToken();
  const market = await getUserProfile().then((response) => response.country);
  const response = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${market}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.tracks;
};

export const getRecommendations = async (artistId, trackId) => {
  const token = getUserToken();
  const genres = getArtistGenre(artistId);
  const response = await axios.get(
    `https://api.spotify.com/v1/recommendations?seed_artists=${artistId}&seed_genres=${genres}&seed_tracks=${trackId}&limit=9`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.tracks;
};

export const getRandomTrackRecommendations = async () => {
  const token = getUserToken();
  const term = ["short_term", "medium_term", "long_term"];
  const length = Math.floor(Math.random() * term.length);

  // Get list of top tracks from random time range
  const response = await axios.get(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${term[length]}&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const randomTrackList = response.data.items;

  // Get one random track seed from results
  const randomTrack = Math.floor(Math.random() * randomTrackList.length);
  const seed = randomTrackList[randomTrack];

  // Track seed ID
  const trackId = seed.id;

  // Get random artist from track if there is more than one artist
  const seedArtists = seed.artists;
  const artist = Math.floor(Math.random() * seedArtists.length);

  // Artist seed ID
  const artistId = seedArtists[artist].id;

  // Get recommendations based on random track and artist IDs
  const tracks = await getRecommendations(artistId, trackId).then(
    (response) => {
      // console.log("recommended tracks", response);
      return response;
    }
  );
  return tracks;
};

export const getRecentlyPlayed = async () => {
  const token = getUserToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/me/player/recently-played/?limit=9`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const recentlyPlayed = [];
  response.data.items.map((item) => {
    recentlyPlayed.push(item.track);
  });
  return recentlyPlayed;
};

export const getAudioFeatures = async (id) => {
  const token = getUserToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/audio-features/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const createPlaylist = async (userId) => {
  const token = getUserToken();
  const date = new Date().toLocaleDateString();
  const data = {
    name: `Cardify Deck ${date}`,
    description: "Playlist created from Cardify deck build",
  };
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    data,
    config
  );

  return response.data;
};

export const addToPlaylist = async (playlistId, uris) => {
  const token = getUserToken();
  const data = {
    uris: uris,
    position: 0,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.post(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    data,
    config
  );
};

export const followArtist = async (artistId) => {
  const token = getUserToken();
  const data = {
    type: "artist",
    ids: artistId,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.put(
    `https://api.spotify.com/v1/me/following/?type=artist&ids=${artistId}`,
    data,
    config
  );
};

export const isFollowingCheck = async (artistId) => {
  const token = getUserToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `https://api.spotify.com/v1/me/following/contains/?type=artist&ids=${artistId}`,
    config
  );
  return response.data;
};
