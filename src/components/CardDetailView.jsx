import { useContext, useEffect, useState } from "react";
import { getAudioFeatures } from "../util/spotify";
import { FaBolt, FaCalendar, FaListOl } from "react-icons/fa";
import { BsPlayFill } from "react-icons/bs";
import { MdAccessTimeFilled, MdMusicOff } from "react-icons/md";
import { RiRunFill } from "react-icons/ri";
import { MainContext } from "../MainContext";

import { motion } from "framer-motion";
import { dealDetailViewAnimation } from "../util/motion";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import albumPlaceholder from "../assets/album-placeholder.jpg";
import useDeck from "../hooks/useDeck";
import useAlbum from "../hooks/useAlbum";
import useTrack from "../hooks/useTrack";
import { setCardColor } from "../util/color";
import useArtist from "../hooks/useArtist";

const CardDetailView = ({ item, index, image, setCardDetails }) => {
  const { setShowDetails } = useContext(MainContext);
  const { deck, addSongToDeck, removeSongFromDeck } = useDeck();
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isInDeck, setIsInDeck] = useState(false);
  const [cardAdded, setCardAdded] = useState(false);

  // console.log(item);

  // item === "track"
  const trackPreview = item.preview_url;
  const title = item.name;
  const artist = item.artists ? item.artists[0].name : null;

  const [audio] = useState(
    typeof Audio !== "undefined" && new Audio(trackPreview)
  );

  const preview = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.volume = 0.2;
      audio.load();
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  audio.onended = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    const cardInDeck = deck?.some((track) => track.name === item.name);
    if (cardInDeck) {
      setIsInDeck(true);
    }
  }, [deck]);

  const handleCardDetails = () => {
    setCardDetails(item);
    // window.scrollTo({ top: 0, behavior: "smooth" });
    setShowDetails(true);
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

  const handleAddCardToDeck = () => {
    !isInDeck && addSongToDeck(item);
    toast.success("Card saved to deck");
    setCardAdded(true);
    // setTimeout(() => {
    //   setCardAdded(false);
    // }, 1600);
    setIsInDeck(true);
  };

  const handleRemoveCardFromDeck = () => {
    isInDeck && removeSongFromDeck(item);
    toast.success("Card removed from deck");
    setCardAdded(false);
    setTimeout(() => {
      setCardAdded(true);
    }, 1600);
    setIsInDeck(false);
    location.reload();
  };

  return (
    <motion.div
      className="flex items-center w-full md:w-[900px] bg-zinc-500/20 m-1 md:m-2 md:pr-2 rounded-md transition group"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={cardStyle}
      {...dealDetailViewAnimation(index)}
    >
      {/* album cover */}
      <div
        className="relative group/preview flex justify-center items-center"
        onClick={item.type === "artist" ? handleCardDetails : preview}
      >
        {item.type === "artist" || item.type === "album" ? null : (
          <div className="absolute">
            {!trackPreview ? (
              <span className="hidden group-hover/preview:block rounded-full bg-primary text-3xl text-center p-2">
                <MdMusicOff />
              </span>
            ) : (
              <span
                className={`${
                  isPlaying ? "block" : "hidden group-hover/preview:block"
                } text-3xl text-white bg-primary rounded-full text-center p-2`}
              >
                <BsPlayFill />
              </span>
            )}
          </div>
        )}
        <img
          src={image ? image : albumPlaceholder}
          alt="Album cover"
          className="w-28 md:w-24 rounded-l-md"
        />
      </div>

      {/* details */}
      <div
        className="flex flex-col md:flex-row md:justify-between w-[200px] md:w-full pb-1 ml-1 md:ml-2 hover:cursor-pointer"
        onClick={handleCardDetails}
      >
        {/* <div className="flex flex-col gap-1 truncate md:max-w-[500px] p-1 md:p-2 text-sm md:text-xl">
          <span>{title}</span>
          <span>{artist}</span>
        </div> */}
        {loading ? (
          <div>loading...</div>
        ) : (
          <>
            {item.type === "artist" && (
              <Artist item={item} statStyle={statStyle} />
            )}
            {item.type === "track" && (
              <Track item={item} statStyle={statStyle} />
            )}
            {item.type === "album" && (
              <Album item={item} statStyle={statStyle} />
            )}
          </>
        )}
      </div>
      {/* add to deck */}
      {item.type === "track" ? (
        <button className="relative flex items-center justify-center m-2 group/add">
          <div className="absolute right-0 -top-6 z-10 hidden group-hover/add:block bg-zinc-500 text-xs rounded-md p-1">
            {isInDeck ? <p>Remove from deck</p> : <p>Quick add to deck</p>}
          </div>
          {isInDeck ? (
            <AiOutlineCheck
              onClick={handleRemoveCardFromDeck}
              size={20}
              className="text-green-500"
            />
          ) : (
            <AiOutlinePlus
              onClick={handleAddCardToDeck}
              size={20}
              className="hover:text-primary"
            />
          )}
        </button>
      ) : null}
    </motion.div>
  );
};

export default CardDetailView;

const Track = ({ item, statStyle }) => {
  const { artists, bpm, length, energy } = useTrack(item);
  return (
    <>
      <div className="flex flex-col gap-1 truncate md:max-w-[500px] p-1 md:p-2 text-sm md:text-xl">
        <span>{item.name}</span>
        <span>{artists}</span>
      </div>
      <div className="flex items-center gap-1 md:gap-2 text-base md:text-xl">
        <div
          className="flex items-center justify-center gap-2 w-[5rem] p-1 rounded-md font-num bg-slate-500/[0.4] ease-in-out duration-300"
          style={statStyle}
          title="Tempo"
        >
          <span className="text-sm md:text-[1.4rem]">
            <RiRunFill />
          </span>
          <span>{bpm ? bpm : "--"}</span>
        </div>
        <div
          className="flex items-center justify-center gap-2 w-[5rem] p-1 rounded-md font-num bg-slate-500/[0.4] ease-in-out duration-300"
          style={statStyle}
          title="Length"
        >
          <span className="text-smj md:text-lg">
            <MdAccessTimeFilled />
          </span>
          <span>{length}</span>
        </div>
        <div
          className="flex items-center justify-center gap-2 w-[5rem] p-1 rounded-md font-num bg-slate-500/[0.4] ease-in-out duration-300"
          style={statStyle}
          title="Energy"
        >
          <span className="text-sm md:text-lg">
            <FaBolt />
          </span>
          <span>{energy ? energy : "--"}</span>
        </div>
      </div>
    </>
  );
};

const Artist = ({ item, statStyle }) => {
  const { artist, artistGenres } = useArtist(item);
  return (
    <>
      <div className="flex flex-col gap-1 truncate md:max-w-[500px] p-1 md:p-2 text-sm md:text-xl">
        <span>{artist}</span>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center">
        {artistGenres
          .map((genre) => (
            <span
              key={genre}
              className="mx-1 my-2 text-xs px-2 md:py-1 bg-slate-500/[0.6] rounded-md duration-300"
              style={statStyle}
            >
              {genre}
            </span>
          ))
          .splice(0, 3)}
      </div>
    </>
  );
};

const Album = ({ item, statStyle }) => {
  const { artists, releaseDate, tracks, albumLength } = useAlbum(item);
  return (
    <>
      <div className="flex flex-col gap-1 truncate md:max-w-[500px] p-1 md:p-2 text-sm md:text-xl">
        <span>{item.name}</span>
        <span>{artists}</span>
      </div>
      <div className="flex items-center gap-1 md:gap-2 text-base md:text-xl">
        <div
          className="flex items-center justify-center gap-2 w-[5rem] p-1 rounded-md font-num bg-slate-500/[0.4] ease-in-out duration-300"
          style={statStyle}
          title="Tempo"
        >
          <span className="text-sm md:text-[1.4rem]">
            <FaListOl />
          </span>
          <span>{tracks ? tracks : "--"}</span>
        </div>
        <div
          className="flex items-center justify-center gap-2 w-[5rem] p-1 rounded-md font-num bg-slate-500/[0.4] ease-in-out duration-300"
          style={statStyle}
          title="Length"
        >
          <span className="text-sm md:text-lg">
            <MdAccessTimeFilled />
          </span>
          <span>{albumLength ? albumLength : "--"}</span>
        </div>
        <div
          className="flex items-center justify-center gap-2 w-[5rem] p-1 rounded-md font-num bg-slate-500/[0.4] ease-in-out duration-300"
          style={statStyle}
          title="Release Date"
        >
          <span className="text-sm md:text-lg">
            <FaCalendar />
          </span>
          <span>{releaseDate ? releaseDate.substring(0, 4) : "--"}</span>
        </div>
      </div>
    </>
  );
};
