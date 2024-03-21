import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { RiRunFill } from "react-icons/ri";
import { MdAccessTimeFilled } from "react-icons/md";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { FaBolt } from "react-icons/fa";
import { setCardColor } from "../../util/color";
import { dealDetailViewAnimation } from "../../util/motion";

import useDeck from "../../hooks/useDeck";
import useTrack from "../../hooks/useTrack";

const AlbumTracks = ({ list }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="absolute left-0 top-10 w-full h-[75%] md:h-[35rem] overflow-y-scroll overflow-x-hidden z-20 bg-zinc-800/95 p-2 bg-gradient-to-t from-black to-transparent backdrop-blur-sm"
        id="tracklist"
        initial={{ opacity: 1, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
      >
        <div className="fixed left-0 w-full bg-zinc-800">
          <h1 className="text-2xl text-center font-num uppercase px-1 pb-1 border-b-2 border-zinc-700">
            Tracklist
          </h1>
        </div>
        <div className="mt-12 flex-flex col justify-between w-full">
          {list.map((item, index) => (
            <Track item={item} index={index} />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const Track = ({ item, index }) => {
  const { bpm, length, energy, trackId, loading } = useTrack(item);
  const { addSongToDeck } = useDeck();
  const [cardAdded, setCardAdded] = useState(false);
  const [isInDeck, setIsInDeck] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleAddCardToDeck = () => {
    !isInDeck && addSongToDeck(item);
    toast.success(`Card ${item.name} saved to deck`);
    setCardAdded(true);
    setTimeout(() => {
      setCardAdded(false);
    }, 1600);
    setIsInDeck(true);
  };

  const handleMouseOver = () => {
    setIsHover(true);
  };
  const handleMouseOut = () => {
    setIsHover(false);
  };
  const cardStyle = {
    border: isHover
      ? `2px solid ${setCardColor(item.popularity ? item.popularity : 0)}`
      : "2px solid transparent",
  };

  const statStyle = {
    backgroundColor: isHover
      ? `${setCardColor(item.popularity)}`
      : "rgba(100, 116, 139, 0.4)",
  };

  return (
    <motion.div
      key={item.id}
      className="flex items-start justify-between gap-4 font-mono rounded-md my-2 p-1 w-full border-2 border-zinc-700"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={cardStyle}
      {...dealDetailViewAnimation(index)}
    >
      <div className="flex gap-4">
        <span className="text-sm pl-1 pt-1">{index + 1}</span>
        <div>
          <div className="flex flex-col mb-1 truncate md:max-w-[500px] text-sm md:text-lg w-full">
            <span>{item.name}</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2 text-sm md:text-base">
            <div
              className="flex items-center justify-center gap-2 w-[5rem] p-1 rounded-md font-num bg-slate-500/[0.4] ease-in-out duration-300"
              style={statStyle}
              title="Tempo"
            >
              <span className="text-sm md:text-[1.4rem]">
                <RiRunFill />
              </span>
              <span>{loading ? "--" : bpm}</span>
            </div>
            <div
              className="flex items-center justify-center gap-2 w-[5rem] p-1 rounded-md font-num bg-slate-500/[0.4] ease-in-out duration-300"
              style={statStyle}
              title="Length"
            >
              <span className="text-smj md:text-lg">
                <MdAccessTimeFilled />
              </span>
              <span>{loading ? "--" : length}</span>
            </div>
            <div
              className="flex items-center justify-center gap-2 w-[5rem] p-1 rounded-md font-num bg-slate-500/[0.4] ease-in-out duration-300"
              style={statStyle}
              title="Energy"
            >
              <span className="text-sm md:text-lg">
                <FaBolt />
              </span>
              <span>{loading ? "--" : energy}</span>
            </div>
          </div>
        </div>
      </div>
      <button className="relative flex items-center justify-center m-2 group/add">
        <div className="absolute right-6 -top-6 z-10 hidden group-hover/add:block bg-zinc-500 text-xs rounded-md w-20 p-1">
          {isInDeck ? <p>Card added</p> : <p>Quick add to deck</p>}
        </div>
        {isInDeck ? (
          <AiOutlineCheck size={20} className="text-green-500" />
        ) : (
          <AiOutlinePlus
            onClick={handleAddCardToDeck}
            size={20}
            className="hover:text-primary"
          />
        )}
      </button>
    </motion.div>
  );
};

export default AlbumTracks;
