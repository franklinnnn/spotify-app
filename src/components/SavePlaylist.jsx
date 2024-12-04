import { useContext, useEffect, useState } from "react";
import {
  addToPlaylist,
  createPlaylist,
  getUserPlaylists,
} from "../util/spotify";
import { IoClose } from "react-icons/io5";
import playlistPlaceholder from "../assets/playlist-placeholder.png";
import { MainContext } from "../MainContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { myPlaylistsAnimation } from "../util/motion";
import { useNavigate } from "react-router-dom";

const SavePlaylist = ({ deck, setShowSavePlaylist }) => {
  const { user } = useContext(MainContext);
  const [playlists, setPlaylists] = useState([]);
  const [selectPlaylistId, setSelectPlaylistId] = useState("");

  const navigate = useNavigate();

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

  const handleViewPlaylistTracks = (playlistId) => {
    navigate(`/playlist/${playlistId}`);
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
      className="flex flex-col gap-2 py w-screen h-screen md:w-[750px] md:h-[50vh] rounded-md bg-slate-800 shadow-[0_2rem_4rem_1rem_rgba(0,0,0,0.5)] overflow-x-hidden"
      variants={confirmBox}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="w-full flex justify-end pt-6 md:pt-0">
        <IoClose
          size={28}
          onClick={() => setShowSavePlaylist(false)}
          className="opacity-60 hover:cursor-pointer hover:opacity-100 transition"
        />{" "}
      </div>
      <div className="flex items-center justify-between px-4">
        <h1 className="font-mono md:text-2xl">Your Playlists</h1>
        <button
          className="p-2 w-48 bg-slate-600 hover:bg-primary rounded-sm font-mono"
          onClick={handleSaveToNewPlaylist}
        >
          Save to new playlist
        </button>
      </div>
      <div className="overflow-y-scroll overflow-x-hidden">
        {playlists.items?.map((playlist, index) => {
          if (!playlist) return;
          return (
            <motion.div
              className={`group/button flex gap-2 items-center justify-between m-2 p-2 rounded-sm hover:bg-slate-600/40 border-2 transition ${
                selectPlaylistId === playlist.id
                  ? "border-primary bg-slate-600/20"
                  : "border-transparent"
              }`}
              key={playlist.id}
              {...myPlaylistsAnimation(index)}
            >
              <img
                src={
                  playlist.images[2]?.url
                    ? playlist.images[2].url
                    : playlistPlaceholder
                }
                alt="Playlist image"
                className="h-12 w-12 md:h-24 md:w-24"
              />
              <div className="w-full truncate">
                <p className="font-disp md:text-2xl truncate">
                  {playlist.name}
                </p>
                <p className="font-mono text-sm">{playlist.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="p-2 w-24 bg-slate-600 hover:bg-primary rounded-sm font-mono text-sm  hover:cursor-pointer transition"
                  onClick={() => handleViewPlaylistTracks(playlist.id)}
                >
                  View Tracks
                </button>
                <button
                  className="p-2 w-24 bg-slate-600 hover:bg-primary rounded-sm font-mono text-sm  hover:cursor-pointer transition"
                  onClick={() =>
                    handleSaveToPlaylist(playlist.id, playlist.name)
                  }
                >
                  Save to playlist
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SavePlaylist;
