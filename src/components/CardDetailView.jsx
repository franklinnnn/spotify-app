import { useContext, useEffect, useState } from "react";
import { getAudioFeatures } from "../util/spotify";
import { FaBolt } from "react-icons/fa";
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

const CardDetailView = ({ item, index, image, setCardDetails }) => {
  const { setShowDetails } = useContext(MainContext);
  const { deck, addSongToDeck } = useDeck();
  const [isPlaying, setIsPlaying] = useState(false);
  const [features, setFeatures] = useState({});
  const [loading, setLoading] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isInDeck, setIsInDeck] = useState(false);
  const [cardAdded, setCardAdded] = useState(false);

  const trackPreview = item.preview_url;
  const title = item.name;
  const artist = item.artists ? item.artists[0].name : null;
  const artistGenres = item.genres ? item.genres : null;

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

  const handleGetAudioFeatures = () => {
    setFeatures({});
    if (item.type === "track") {
      getAudioFeatures(item.id).then(setFeatures);
    } else return;
  };

  useEffect(() => {
    handleGetAudioFeatures();
    const cardInDeck = deck.some((track) => track.name === item.name);
    if (cardInDeck) {
      setIsInDeck(true);
    }
  }, [item.type, item.id]);

  const bpm = Math.round(features.tempo);
  const ms = new Date(item.duration_ms);
  const length = `${ms.getMinutes()}.${ms.getSeconds()}`;
  const energy = Math.round(features.energy * 100) / 100;

  const handleCardDetails = () => {
    setCardDetails(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowDetails(true);
  };

  const handleMainColor = (popularity) => {
    let color = "";
    if (popularity >= 81 && popularity <= 100) {
      color = "#d97706";
    } else if (popularity >= 61 && popularity <= 80) {
      color = "#7c3aed";
    } else if (popularity >= 41 && popularity <= 60) {
      color = "#0284c7";
    } else if (popularity >= 21 && popularity <= 40) {
      color = "#059669";
    } else if (popularity >= 0 && popularity <= 20) {
      color = "#475569";
    }
    return color;
  };

  const handleMouseOver = () => {
    setIsHover(true);
  };
  const handleMouseOut = () => {
    setIsHover(false);
  };

  const cardStyle = {
    border: isHover
      ? `2px solid ${handleMainColor(item.popularity)}`
      : "2px solid transparent",
  };

  const statStyle = {
    backgroundColor: isHover
      ? `${handleMainColor(item.popularity)}`
      : "rgba(100, 116, 139, 0.4)",
  };

  const handleAddCardToDeck = () => {
    // !isInDeck && setDeck((prevDeck) => [...prevDeck, item]);
    !isInDeck && addSongToDeck(item);
    toast.success("Card saved to deck");
    setCardAdded(true);
    setTimeout(() => {
      setCardAdded(false);
    }, 1600);
    setIsInDeck(true);
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
        {item.type === "artist" ? null : (
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
        <div className="flex flex-col gap-1 truncate md:max-w-[500px] p-1 md:p-2 text-sm md:text-xl">
          <span>{title}</span>
          <span>{artist}</span>
        </div>
        {loading ? (
          <div>loading...</div>
        ) : (
          <>
            {item.type === "artist" ? (
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
            ) : (
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
                  <span className="text-sm md:text-lg">
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
            )}
          </>
        )}
      </div>
      {/* add to deck */}
      {item.type === "track" ? (
        <button className="relative flex items-center justify-center m-2 group/add">
          <div className="absolute right-0 -top-6 z-10 hidden group-hover/add:block bg-zinc-500 text-xs rounded-md p-1">
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
      ) : null}
    </motion.div>
  );
};

export default CardDetailView;
