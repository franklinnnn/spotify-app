import axios from "axios";
import React, { useContext } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsSpotify, BsYoutube } from "react-icons/bs";
import { HiSaveAs } from "react-icons/hi";
import { MdRecommend } from "react-icons/md";
// import { MainContext } from "../../pages/Home";

const CardButtons = ({
  cardDetails,
  handleAddCardToDeck,
  handleFollowArtist,
  setShowConfirmRecommend,
  setShowConfirmAddToDeck,
  isInDeck,
  isFollowed,
}) => {
  const ytQuery = cardDetails.artists
    ? `${cardDetails.name}+${cardDetails.artists[0].name}`
    : `${cardDetails.name}`;

  return (
    <div className="absolute left-0 bottom-4 right-0 w-5/6 mx-auto p-2 flex justify-around rounded-md text-2xl ease-in-out duration-700 bg-slate-500/25 group-hover:bottom-6 group-hover:bg-slate-500/[.35]">
      <button
        className="group/button relative"
        onClick={() => setShowConfirmRecommend(true)}
      >
        <MdRecommend className="text-slate-600  group-hover:text-slate-200 group-hover/button:hover:text-primary easy-in-out duration-150" />
        <span className="absolute left-[-2rem] top-[-1.6rem] ml-6 text-xs whitespace-nowrap bg-slate-600 p-1 rounded hidden group-hover/button:block group-hover/button:z-10">
          Recommend
        </span>
      </button>
      <button
        className="group/button relative"
        onClick={() => window.open(cardDetails.external_urls.spotify)}
      >
        <BsSpotify className="text-slate-600  group-hover:text-slate-200 group-hover/button:hover:text-[#1DB954] easy-in-out duration-150 " />
        <span className="absolute left-[-2rem] top-[-1.6rem] ml-6 text-xs whitespace-nowrap bg-slate-600 p-1 rounded hidden group-hover/button:block group-hover/button:z-10">
          Listen on Spotify
        </span>
      </button>
      <button
        className="group/button relative"
        onClick={() =>
          window.open(`https://www.youtube.com/results?search_query=${ytQuery}`)
        }
      >
        <BsYoutube className="text-slate-600  group-hover:text-slate-200 group-hover/button:hover:text-[#FF0000] easy-in-out duration-150" />
        <span className="absolute left-[-2rem] top-[-1.6rem] ml-6 text-xs whitespace-nowrap bg-slate-600 p-1 rounded hidden group-hover/button:block group-hover/button:z-10">
          Watch on YouTube
        </span>
      </button>

      {cardDetails.type === "track" && (
        <button
          className="group/button relative"
          onClick={handleAddCardToDeck}
          disabled={isInDeck}
        >
          <HiSaveAs className="text-slate-600  group-hover:text-slate-200 group-hover/button:hover:text-primary easy-in-out duration-150" />
          <span className="absolute left-[-2rem] top-[-1.6rem] ml-6 text-xs whitespace-nowrap bg-slate-600 p-1 rounded hidden group-hover/button:block group-hover/button:z-10">
            {isInDeck ? "Already in deck" : "Add to deck"}
          </span>
        </button>
      )}

      {cardDetails.type === "artist" && (
        <button
          className="group/button relative"
          onClick={handleFollowArtist}
          disabled={isFollowed}
        >
          <AiFillHeart className="text-slate-600  group-hover:text-slate-200 group-hover/button:hover:text-primary easy-in-out duration-150" />
          <span className="absolute left-[-2rem] top-[-1.6rem] ml-6 text-xs whitespace-nowrap bg-slate-600 p-1 rounded hidden group-hover/button:block group-hover/button:z-10">
            {isFollowed ? "Artist in followed list" : "Follow artist"}
          </span>
        </button>
      )}

      {cardDetails.type === "album" && (
        <button
          className="group/button relative hidden"
          onClick={() => setShowConfirmAddToDeck(true)}
        >
          <HiSaveAs className="text-slate-600  group-hover:text-slate-200 group-hover/button:hover:text-primary easy-in-out duration-150" />
          {/* <span className="absolute left-[-2rem] top-[-1.6rem] ml-6 text-xs whitespace-nowrap bg-slate-600 p-1 rounded hidden group-hover/button:block group-hover/button:z-10">
          {isInDeck ? "Already in deck" : "Add to deck"}
        </span> */}
        </button>
      )}
    </div>
  );
};

export default CardButtons;
