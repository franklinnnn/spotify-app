import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useTracks from "../hooks/useTracks";
import CardsContainer from "../components/CardsContainer";
import { pageMenu } from "../util/motion";
import { useParams } from "react-router-dom";
import usePlaylist from "../hooks/usePlaylist";
import useDeck from "../hooks/useDeck";
import { addToPlaylist } from "../util/spotify";

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const { name, list } = usePlaylist(playlistId);
  const { deck } = useDeck();

  const uris = deck.map((track) => track.uri);

  const handleSaveToPlaylist = (id, name) => {
    addToPlaylist(id, uris);
    console.log(`${deck.length} tracks added to playlist ${name}`);
    toast.success(`${deck.length} tracks added to playlist ${name}`);
  };

  const type = "tracks";
  return (
    <section className="w-full my-6">
      <motion.header
        className="relative flex items-start justify-between gap-6 px-6 max-sm:flex-col"
        variants={pageMenu}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <div>
          <h1 className="text-2xl">{name}</h1>
          <span className="text-light/50 text-lg">{list.length} songs</span>
        </div>
        <div
          className="flex gap-2 items-center px-2 py-1 rounded-sm bg-slate-700 hover:bg-primary hover:cursor-pointer max-sm:text-sm"
          onClick={() => handleSaveToPlaylist(playlistId, name)}
        >
          Save Deck to Playlist
        </div>
      </motion.header>
      {list.length < 1 ? (
        <div className="flex justify-center items-center w-full p-4 text-2xl text-white font-mono">
          Getting songs...
        </div>
      ) : (
        <CardsContainer list={list} type={type} />
      )}
    </section>
  );
};

export default PlaylistPage;
