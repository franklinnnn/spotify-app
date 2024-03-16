import { useContext, useEffect, useState } from "react";
import { MainContext } from "../MainContext";
import {
  addToPlaylist,
  createPlaylist,
  getUserPlaylists,
} from "../util/spotify";
import { toast } from "react-toastify";

const usePlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const { user } = useContext(MainContext);

  useEffect(() => {
    getUserPlaylists().then(setPlaylists);
  }, []);

  const saveToNewPlaylist = (uris) => {
    createPlaylist(user.id).then((response) => {
      addToPlaylist(response.id, uris);
    });
    console.log(`Playlist created successfully with ${uris.length} tracks`);
    // toast.success(`Playlist created successfully with ${uris.length} tracks`);
  };

  const saveToPlaylist = (id, name, uris) => {
    addToPlaylist(id, uris);
  };

  return {
    playlists,
    saveToNewPlaylist,
    saveToPlaylist,
  };
};

export default usePlaylists;
