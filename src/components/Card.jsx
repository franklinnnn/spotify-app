import React, { useContext, useEffect, useRef, useState } from "react";
import { MdMusicOff } from "react-icons/md";
import { MainContext } from "../pages/Home";
import { BsPlayFill } from "react-icons/bs";
import { HiArrowLongRight } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";

const Card = ({ item, image, setCardDetails, setIsCardDetailsVisible }) => {
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
    setIsCardDetailsVisible(true);
    setShowDetails(true);
    // setTimeout(() => {
    //   window.scrollTo({ top: 0, behavior: "smooth" });
    //   setIsCardDetailsVisible(true);
    // }, 200);
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

  const releaseDate = item.album ? item.album.release_date : null;
  // console.log("release date", Date.parse(releaseDate));
  const today = new Date();
  // console.log("now", Date.now());
  const lastWeek = new Date(Date.now() - 604800000);
  // console.log("last week", Date.parse(lastWeek));

  // if (releaseDate < lastWeek && releaseDate > today) {
  //   console.log(item.name, releaseDate, "in between");
  // } else {
  //   console.log(item.name, releaseDate, "outside");
  // }

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
    <div
      className="group relative box-border m-1 ease-in-out duration-150 hover:scale-105 hover:shadow-[0_0.2rem_1rem_0.6rem_rgba(0,0,0,0.5)] hover:z-10 hover:cursor-pointer rounded-md bg-center
      "
      style={
        imgLoaded
          ? {
              backgroundImage: `url(${image})`,
            }
          : { backgroundImage: null }
      }
    >
      <div className="max-w-[16rem] aspect-[3/4] font-disp p-2 bg-slate-300/60 rounded-md bg-gradient-to-t from-black/60 to-transparent backdrop-blur-sm box-border duration-300">
        <div
          className="group/preview flex justify-center items-center aspect-square bg-cover hover:cursor-pointer"
          onClick={item.type === "artist" ? handleCardDetails : preview}
        >
          {item.type === "artist" ? null : (
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

          <AnimatePresence>
            {showPopularityTag && (
              <motion.span
                className="absolute top-0 z-100 left-0 p-1 flex items-center text-center rounded-md bg-primary shadow-[0_0.2rem_1rem_0_rgba(0,0,0,0.5)]"
                variants={tagVariant}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {popularityTag}
              </motion.span>
            )}
          </AnimatePresence>

          <motion.img
            src={image}
            alt="album cover"
            ref={imgRef}
            className="box-border aspect-square object-cover"
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
          className=" flex flex-col text-xl text-slate-200 my-2 mr-2 p-1 overflow-hidden group-hover:translate-x-2 duration-300"
          onClick={handleCardDetails}
        >
          <span className="whitespace-nowrap md:text-2xl">{title}</span>
          <span className="whitespace-nowrap text-lg text-slate-300">
            {subtitle}
          </span>
        </div>
        <button
          className="absolute bottom-2 right-4 flex justify-end w-full p-1 text-2xl text-right group-hover:text-primary group-hover:text-3xl group-hover:right-2 easy-in-out duration-300 "
          onClick={handleCardDetails}
          // ref={refCard}
        >
          <HiArrowLongRight />
        </button>
      </div>
    </div>
  );
};

export default Card;
