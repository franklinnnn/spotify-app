import { useEffect, useState } from "react";
import { getUserPlaylist } from "../util/spotify";

const usePlaylist = (playlistId) => {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    setName("");
    setList([]);
    getUserPlaylist(playlistId).then((response) => {
      setName(response.name);
      let playlistTracks = [];
      response.tracks.items.map((item) => {
        playlistTracks.push(item.track);
      });
      setList(playlistTracks);
    });
  }, []);

  return {
    name,
    list,
  };
};

export default usePlaylist;
