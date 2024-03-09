import { useContext, useEffect, useState } from "react";
import {
  addToPlaylist,
  createPlaylist,
  getUserPlaylists,
} from "../util/spotify";
import playlistPlaceholder from "../assets/playlist-placeholder.png";
import { MainContext } from "../MainContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { myPlaylistsAnimation } from "../util/motion";

const SavePlaylist = ({ deck }) => {
  const { user, showDetails, cardDetailsVisible } = useContext(MainContext);
  const [playlists, setPlaylists] = useState([]);
  const [selectPlaylistId, setSelectPlaylistId] = useState("");

  const uris = deck.map((track) => track.uri);

  const handleSaveToNewPlaylist = () => {
    createPlaylist(user.id).then((response) => {
      addToPlaylist(response.id, uris);
      console.log(`${deck.length} tracks added to playlist ${response.name}`);
    });
    toast.success("Playlist created successfully!");
  };

  const handleSaveToPlaylist = (id, name) => {
    addToPlaylist(id, uris);
    console.log(`${deck.length} tracks added to playlist ${name}`);
    toast.success(`${deck.length} tracks added to playlist ${name}`);
  };

  useEffect(() => {
    setPlaylists([]);
    setSelectPlaylistId("");
    getUserPlaylists().then(setPlaylists);
  }, []);

  const confirmBox = {
    hidden: {
      y: -10,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col gap-2 p-4 w-screen md:w-[750px] h-96 rounded-md bg-slate-800 shadow-[0_2rem_4rem_1rem_rgba(0,0,0,0.5)] overflow-y-scroll overflow-x-hidden"
      variants={confirmBox}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="flex items-center justify-between">
        <h1 className="font-mono text-2xl">Your Playlists</h1>
        <button
          className="p-2 w-48 bg-slate-600 hover:bg-primary rounded-sm font-mono"
          onClick={handleSaveToNewPlaylist}
        >
          Save to new playlist
        </button>
      </div>
      <div>
        {playlists.items?.map((playlist, index) => (
          <motion.div
            className={`group/button flex gap-2 items-center justify-between my-2 p-2 rounded-sm hover:bg-slate-600 border-2 transition hover:cursor-pointer ${
              selectPlaylistId === playlist.id
                ? "border-primary bg-slate-600/80"
                : "border-transparent"
            }`}
            key={playlist.id}
            onClick={() => handleSaveToPlaylist(playlist.id, playlist.name)}
            {...myPlaylistsAnimation(index)}
          >
            <img
              src={
                playlist.images[2]?.url
                  ? playlist.images[2].url
                  : playlistPlaceholder
              }
              alt="Playlist image"
              className="h-24 w-24"
            />
            <div className="w-full">
              <p className="font-disp text-2xl">{playlist.name}</p>
              <p className="font-mono text-sm">{playlist.description}</p>
            </div>
            <button className="p-2 w-24 bg-slate-600 group-hover/button:bg-primary rounded-sm font-mono text-sm transition">
              Save to playlist
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SavePlaylist;
