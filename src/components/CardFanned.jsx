import React, { useContext, useEffect, useRef, useState } from "react";
import { MdMusicOff } from "react-icons/md";
// import { MainContext } from "../pages/Home";
import { MainContext } from "../MainContext";

import { BsPlayFill } from "react-icons/bs";
import { HiArrowLongRight } from "react-icons/hi2";
import { motion } from "framer-motion";
import { dealFannedAnimation } from "../util/motion";
import { setCardColor } from "../util/color";

const CardFanned = ({ item, index, image, setCardDetails }) => {
  const { setShowDetails } = useContext(MainContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [popularityTag, setPopularityTag] = useState(null);
  const [showPopularityTag, setShowPopularityTag] = useState(false);

  const imgRef = useRef();

  useEffect(() => {
    handlePopularityTag();
  }, []);

  const trackPreview = item.preview_url;
  // const albumImg = item.album.images ? item.album.images[1].url : null;
  // const artistImg = item.images ? item.images[1].url : null;
  const title = item.name;
  const subtitle = item.artists ? item.artists[0].name : null;

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

  const handleCardDetails = () => {
    setCardDetails(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowDetails(true);
  };

  const handlePopularityTag = () => {
    if (item.popularity >= 81 && item.popularity <= 100) {
      setPopularityTag("Popular track!");
      setShowPopularityTag(true);
    }
    if (item.popularity >= 1 && item.popularity <= 20) {
      setPopularityTag("Underground find!");
      setShowPopularityTag(true);
    }
    if (
      item.type === "artist" &&
      item.popularity >= 61 &&
      item.popularity <= 100
    ) {
      setPopularityTag("Popular artist!");
      setShowPopularityTag(true);
    }
    setTimeout(() => {
      setShowPopularityTag(false);
    }, 3000);
  };

  const handleImgLoading = () => {
    setImgLoaded(true);
  };

  const imgVariant = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  const tagVariant = {
    hidden: {
      scale: 0,
      rotate: 0,
    },
    visible: {
      scale: 1,
      rotate: -12,
      transition: {
        type: "spring",
        delay: 0.25,
      },
    },
    exit: {
      width: 0,
      scale: 0,
      rotate: 0,
    },
  };

  return (
    <motion.div
      className="cardfan inline-block aspect-[2/3] w-[11rem] rounded-md cursor-pointer group"
      style={
        imgLoaded
          ? {
              backgroundImage: `url(${image})`,
            }
          : { backgroundImage: null }
      }
      key="card"
      {...dealFannedAnimation(index)}
    >
      <div
        className="h-full font-disp p-2 bg-slate-300/60 rounded-md bg-gradient-to-t from-black/60 to-transparent backdrop-blur-sm box-border duration-300"
        id="card_border"
        style={{
          border: `3px solid ${setCardColor(
            item.popularity ? item.popularity : "0"
          )}`,
        }}
      >
        <div
          className="group/preview flex justify-center items-center aspect-square bg-cover hover:cursor-pointer"
          onClick={item.type === "artist" ? handleCardDetails : preview}
        >
          {item.type === "artist" || item.type === "album" ? null : (
            <div className="absolute top-0 left-0 right-0 bottom-20 flex justify-center items-center ">
              {!trackPreview ? (
                <span className="hidden group-hover/preview:block rounded-full bg-primary text-4xl p-4">
                  <MdMusicOff />
                </span>
              ) : (
                <span
                  className={`${
                    isPlaying ? "block" : "hidden group-hover/preview:block"
                  } text-4xl text-white bg-primary rounded-full p-4 text-center`}
                >
                  <BsPlayFill />
                </span>
              )}
            </div>
          )}

          {showPopularityTag && (
            <motion.span
              className="absolute top-0 z-100 left-0 p-1 flex items-center text-center rounded-md bg-primary shadow-[0_0.2rem_1rem_0_rgba(0,0,0,0.5)]"
              key="popularity tag"
              variants={tagVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {popularityTag}
            </motion.span>
          )}

          <motion.img
            src={image}
            alt="album cover"
            ref={imgRef}
            className={`box-border object-cover ${
              item.type === "artist" ? "aspect-[5/6]" : "aspect-square"
            }`}
            style={
              imgLoaded ? { display: "inline-block" } : { display: "none" }
            }
            onLoad={handleImgLoading}
            variants={imgVariant}
            initial="hidden"
            animate="visible"
          />
        </div>
        <div
          className="flex flex-col text-xl text-slate-200 my-2 mr-2 p-1 duration-300"
          onClick={handleCardDetails}
        >
          <span className="md:text-xl truncate">{title}</span>
          <span className="text-lg text-slate-300 truncate">{subtitle}</span>
        </div>
        <button
          className="absolute bottom-0 right-4 flex justify-end w-full p-1 text-2xl text-right group-hover:text-primary group-hover:text-3xl group-hover:right-2 easy-in-out duration-300 "
          onClick={handleCardDetails}
          // ref={refCard}
        >
          <HiArrowLongRight />
        </button>
      </div>
    </motion.div>
  );
};

export default CardFanned;
