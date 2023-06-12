import React, { useContext, useEffect, useRef, useState } from "react";
import { getRecommendations, getAudioFeatures } from "../../util/spotify";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../pages/Home";
import CardButtons from "./CardButtons";
import VanillaTilt from "vanilla-tilt";

import { FaBolt } from "react-icons/fa";
import { BsDiscFill } from "react-icons/bs";
import { MdAccessTimeFilled, MdStars } from "react-icons/md";
import { RiRunFill } from "react-icons/ri";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

const TrackDetails = ({ cardDetails }) => {
  const { setList, setShowDetails, deck, setDeck } = useContext(MainContext);

  const [features, setFeatures] = useState({});
  const [isInDeck, setIsInDeck] = useState(false);
  const [showConfirmRecommend, setShowConfirmRecommend] = useState(false);
  const [cardAdded, setCardAdded] = useState(false);

  const navigate = useNavigate();

  const handleGetNewList = () => {
    //   isPlaying && audio.pause();
    setShowConfirmRecommend(false);
    setList([]);
    getRecommendations(artistId, trackId).then(setList);
    setShowDetails(false);
    navigate("/recommendations");
  };

  const handleAddCardToDeck = () => {
    !isInDeck && setDeck((prevDeck) => [...prevDeck, cardDetails]);

    console.log("card saved to deck");
    setCardAdded(true);
    setTimeout(() => {
      setCardAdded(false);
    }, 1600);
    setIsInDeck(true);
  };

  const handleGetAudioFeatures = () => {
    setFeatures({});
    getAudioFeatures(trackId).then(setFeatures);
  };

  useEffect(() => {
    handleGetAudioFeatures();
    handleMainColor(cardDetails.popularity);
    const cardInDeck = deck.some((track) => track.id === cardDetails.id);
    if (cardInDeck) {
      setIsInDeck(true);
    }
  }, []);

  const handleMainColor = (popularity) => {
    let color = "";
    if (popularity >= 81 && popularity <= 100) {
      color = "#d97706";
      document.documentElement.style.setProperty("--popularity", color);
    } else if (popularity >= 61 && popularity <= 80) {
      color = "#7c3aed";
      document.documentElement.style.setProperty("--popularity", color);
    } else if (popularity >= 41 && popularity <= 60) {
      color = "#0284c7";
      document.documentElement.style.setProperty("--popularity", color);
    } else if (popularity >= 21 && popularity <= 40) {
      color = "#059669";
      document.documentElement.style.setProperty("--popularity", color);
    } else if (popularity >= 0 && popularity <= 20) {
      color = "#475569";
      document.documentElement.style.setProperty("--popularity", color);
    }
    return color;
  };

  const Tilt = (props) => {
    const { options, ...rest } = props;
    const tilt = useRef(null);
    useEffect(() => {
      VanillaTilt.init(tilt.current, options);
    }, [options]);
    return <div ref={tilt} {...rest} />;
  };

  const container = {
    scale: 1.02,
    speed: 1000,
    perspective: 5000,
    max: 12,
  };

  const artistId = cardDetails.artists ? cardDetails.artists[0].id : null;
  const trackId = cardDetails.id;
  const artists = cardDetails.artists?.map(
    (artist, index) => (index ? ", " : "") + artist.name
  );

  const bpm = Math.round(features.tempo);
  const ms = new Date(cardDetails.duration_ms);
  const length = `${ms.getMinutes()}.${ms.getSeconds()}`;
  const energy = Math.round(features.energy * 100) / 100;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [30, -30]);

  return (
    <Tilt
      options={container}
      className="group flex justify-center items-start"
      id="card"
    >
      <div
        className="bg-cover bg-center rounded-lg w-[30rem] h-[45rem]"
        style={{ backgroundImage: `url(${cardDetails.album.images[0].url})` }}
        role="content container"
      >
        <article
          className="bg-gradient-to-t from-black to-transparent backdrop-blur-sm rounded-lg duration-300 group-hover:backdrop-blur-md box-border overflow-hidden"
          id="border"
        >
          {/* TOP BAR */}
          <header className="relative flex justify-between px-2 py-1 z-10 font-num">
            <span
              className="uppercase flex items-center gap-2 px-1 rounded-md text-2xl  bg-slate-500/[0.6] ease-in-out duration-300 group-hover:scale-110 group-hover:translate-x-[-0.5rem] group-hover:translate-y-[-0.2rem] group-hover:shadow-[0_0.2rem_1rem_0_rgba(0,0,0,0.5)]"
              id="top"
            >
              <span className="text-lg">
                <BsDiscFill />
              </span>
              {cardDetails.type}
            </span>
            <span
              className="flex items-center gap-2 px-1 rounded-md text-2xl  bg-slate-500/[0.6] ease-in-out duration-300 group-hover:scale-110 group-hover:translate-x-[0.5rem] group-hover:translate-y-[-0.2rem] group-hover:shadow-[0_0.2rem_1rem_0_rgba(0,0,0,0.5)]"
              id="top"
            >
              <span className="text-lg">
                <MdStars />
              </span>
              {cardDetails.popularity}
            </span>
          </header>

          {/* IMAGE */}
          <section className="flex justify-center items-center py-2 ease-in-out duration-500 group-hover:translate-y-[0.4rem] group-hover:scale-105">
            <img
              src={cardDetails.album.images[0].url}
              alt="cover"
              className="w-5/6 h-5/6 ease-in-out duration-700 group-hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)]"
            />
          </section>

          {/* TRACK INFO */}
          <section className="p-4 flex flex-col justify-between mb-4 ">
            <div className="flex flex-col w-full h-full px-4 font-disp ease-in-out duration-500 group-hover:translate-y-2 group-hover:z-10 group-hover:scale-105">
              <span className="text-center text-4xl mt-4 mb-2">
                {cardDetails.name}
              </span>
              <div
                className="flex flex-col gap-2 text-2xl text-slate-300 items-center border-b-[1px]
               border-slate-500/20 pb-4"
              >
                <span className="text-center truncate">{artists}</span>
                <span className="text-base text-center text-slate-400">
                  {cardDetails.album.name}
                  {" ("}
                  {cardDetails.album.release_date.substring(0, 4)}
                  {")"}
                </span>
              </div>

              <div className="flex justify-evenly text-slate-200 text-3xl mt-4 mb-8 ">
                <div
                  className="flex items-center justify-center gap-2 w-[5rem] p-1 rounded-md font-num  bg-slate-500/[0.4] ease-in-out duration-300 group-hover:shadow-[0_0.2rem_1rem_0_rgba(0,0,0,0.5)]"
                  id="stat"
                  title="Tempo"
                >
                  <span className="text-[1.4rem]">
                    <RiRunFill />
                  </span>

                  <span>{bpm}</span>
                </div>
                <div
                  className="flex items-center justify-center gap-2 w-[5rem] p-1 rounded-md font-num  bg-slate-500/[0.4] ease-in-out duration-300 group-hover:shadow-[0_0.2rem_1rem_0_rgba(0,0,0,0.5)]"
                  id="stat"
                  title="Length"
                >
                  <span className="text-lg">
                    <MdAccessTimeFilled />
                  </span>
                  <span>{length}</span>
                </div>
                <div
                  className="flex items-center justify-center gap-2 w-[5rem] p-1 rounded-md font-num  bg-slate-500/[0.4] ease-in-out duration-300 group-hover:shadow-[0_0.2rem_1rem_0_rgba(0,0,0,0.5)]"
                  id="stat"
                  title="Energy"
                >
                  <span className="text-lg">
                    <FaBolt />
                  </span>
                  <span>{energy}</span>
                </div>
              </div>
            </div>
          </section>
          <footer className="pt-8 ">
            <CardButtons
              cardDetails={cardDetails}
              handleAddCardToDeck={handleAddCardToDeck}
              setShowConfirmRecommend={setShowConfirmRecommend}
              isInDeck={isInDeck}
            />
          </footer>
          <ConfirmRecommend
            showConfirmRecommend={showConfirmRecommend}
            setShowConfirmRecommend={setShowConfirmRecommend}
            name={cardDetails.name}
            handleGetNewList={handleGetNewList}
          />
          <ConfirmAddedToDeck cardAdded={cardAdded} />
        </article>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="colored"
        limit={1}
      />
    </Tilt>
  );
};

const ConfirmRecommend = ({
  showConfirmRecommend,
  setShowConfirmRecommend,
  name,
  handleGetNewList,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className={`absolute left-0 bottom-0 flex flex-col w-full bg-gradient-to-t from-black to-transparent text-sm px-4 py-2 gap-2 rounded-b-sm ${
          showConfirmRecommend ? "block" : "hidden"
        }`}
        id="confirm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
      >
        <span className="text-center">
          Get new cards based on <span className="font-bold">{name}</span>?
        </span>
        <div className="flex justify-center gap-2 text-white">
          <button
            className="px-2  rounded-sm bg-slate-800/60 hover:bg-slate-500"
            onClick={handleGetNewList}
          >
            Yes
          </button>
          <button
            className="px-2 rounded-sm bg-slate-800/60 hover:bg-slate-500"
            onClick={() => setShowConfirmRecommend(false)}
          >
            No
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const ConfirmAddedToDeck = ({ cardAdded }) => {
  return (
    <AnimatePresence>
      <motion.div
        className={`absolute left-0 bottom-0 flex flex-col w-full bg-gradient-to-t from-black to-transparent text-sm px-4 py-6 gap-2 ${
          cardAdded ? "block" : "hidden"
        }`}
        id="confirm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
      >
        <span className="text-center">Card saved to deck</span>
      </motion.div>
    </AnimatePresence>
  );
};

export default TrackDetails;
