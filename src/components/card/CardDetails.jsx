import React, { useEffect, useRef, useState } from "react";
import VanillaTilt from "vanilla-tilt";

import { FaMusic } from "react-icons/fa";
import { BsFillPersonFill, BsDiscFill } from "react-icons/bs";

import { getArtistGenre, getRecommendations } from "../../util/spotify";
import CardButtons from "./CardButtons";

const CardDetails = ({ details, setList, setShowDetails, setDeck }) => {
  const [confirm, setConfirm] = useState(false);

  const artistId = details.artists[0].id;
  const trackId = details.id;
  const image =
    details.type === "track"
      ? details.album.images[0].url
      : details.images[0].url;

  // console.log(details);

  const handleGetNewList = () => {
    //   isPlaying && audio.pause();
    setConfirm(false);
    setList([]);
    getRecommendations(artistId, trackId).then(setList);
    setShowDetails(false);
  };

  const handleAddCardToDeck = () => {
    setDeck((prevDeck) => [...prevDeck, details]);
    console.log("card added to deck");
  };

  // useEffect(() => {
  //   getArtistGenre(artistId).then((res) => {
  //     console.log(res);
  //   });
  // });

  const Tilt = (props) => {
    const { options, ...rest } = props;
    const tilt = useRef(null);
    useEffect(() => {
      VanillaTilt.init(tilt.current, options);
    }, [options]);
    return <div ref={tilt} {...rest} />;
  };

  const container = {
    scale: 1.1,
    speed: 1200,
    perspective: 5000,
    max: 20,
  };

  const cover = {
    speed: 600,
    perspective: 1200,
    max: 5,
  };

  const artists = details.artists.map((artist) => artist.name);
  return (
    <Tilt
      options={container}
      className="group flex justify-center items-start h-max box-border"
    >
      <div
        className="bg-cover backdrop-blur-sm rounded-lg mt-10"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="max-w-[25rem] max-h-[37rem] h-[37rem]  bg-gradient-to-t from-black to-transparent backdrop-blur-sm rounded-lg">
          <div className="flex justify-center items-center py-2 ease-in-out duration-500 group-hover:translate-y-[-0.6rem] group-hover:translate-x-1 group-hover:scale-105">
            <img
              src={image}
              alt="cover"
              className="w-5/6 h-5/6 ease-in-out duration-700 group-hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)]"
            />
          </div>
          <div className="p-4 flex flex-col justify-between">
            <div className="group-hover:z-10">
              <div className="flex items-center gap-2">
                <FaMusic />
                <span className="ease-in-out duration-[600ms] group-hover:text-xl group-hover:translate-y-[-0.2rem] group-hover:font-bold">
                  {details.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BsFillPersonFill />
                <span className="ease-in-out duration-[700ms] group-hover:text-xl group-hover:translate-y-[-0.2rem] group-hover:font-bold">
                  {artists.join(", ")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BsDiscFill />
                <span className="ease-in-out duration-[750ms] group-hover:font-bold">
                  {details.album.name}
                  {" ("}
                  {details.album.release_date.substring(0, 4)}
                  {")"}
                </span>
              </div>
            </div>
            <CardButtons
              details={details}
              handleAddCardToDeck={handleAddCardToDeck}
              setConfirm={setConfirm}
            />
          </div>
          <ConfirmRecommend
            confirm={confirm}
            setConfirm={setConfirm}
            name={details.name}
            handleGetNewList={handleGetNewList}
          />
        </div>
      </div>
    </Tilt>
  );
};

const ConfirmRecommend = ({ confirm, setConfirm, name, handleGetNewList }) => {
  return (
    <div
      className={`absolute left-0 bottom-0 flex flex-col w-full text-black  bg-gradient-to-t from-cyan-500 to-blue-500 text-sm p-4 gap-2 rounded-b-lg ${
        confirm ? "block" : "hidden"
      }`}
    >
      <span>Get new cards based on {name}?</span>
      <div className="flex justify-center gap-2 text-white">
        <button
          className="bg-slate-600 px-2  hover:bg-slate-700"
          onClick={handleGetNewList}
        >
          Yes
        </button>
        <button
          className="bg-slate-600 px-2 hover:bg-slate-700"
          onClick={() => setConfirm(false)}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default CardDetails;
