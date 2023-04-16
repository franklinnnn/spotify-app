import React, { useContext, useEffect, useRef, useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { MdStars } from "react-icons/md";
import { MainContext } from "../../pages/Home";
import {
  getRelatedArtists,
  getArtistAlbums,
  getArtistTracks,
  followArtist,
  isFollowingCheck,
} from "../../util/spotify";
import CardButtons from "./CardButtons";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ArtistDetails = ({ cardDetails }) => {
  const { setList, setShowDetails } = useContext(MainContext);
  const [showConfirmRecommend, setShowConfirmRecommend] = useState(false);
  const [topAlbums, setTopAlbums] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [followedArtist, setFollowedArtist] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const navigate = useNavigate();

  const artistId = cardDetails.id;
  const artistGenres = cardDetails.genres ? cardDetails.genres : null;
  const artistImg = cardDetails.images ? cardDetails.images[0].url : null;

  const handleGetRelatedArtists = async () => {
    setShowConfirmRecommend(false);
    setList([]);
    getRelatedArtists(artistId).then(setList);
    setShowDetails(false);
    navigate("/related-artists");
  };

  const handleFollowArtist = async () => {
    followArtist(cardDetails.id);
    console.log(`followed ${cardDetails.name}`);
    setFollowedArtist(true);
    setTimeout(() => {
      setFollowedArtist(false);
    }, 1600);
    setIsFollowed(true);
  };

  useEffect(() => {
    handleMainColor(cardDetails.popularity);
    getArtistAlbums(artistId).then(setTopAlbums);
    getArtistTracks(artistId).then(setTopTracks);
    isFollowingCheck(cardDetails.id).then((res) => {
      res[0] === true && setIsFollowed(true);
    });
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

  // const artists = cardDetails.artists.map((artist) => artist.name);

  return (
    <Tilt
      options={container}
      className="group flex justify-center items-start box-border md:aspect-[2/3] md:h-[44rem]"
      id="card"
    >
      <div
        className="bg-cover bg-center rounded-lg hover:cursor-default"
        style={{ backgroundImage: `url(${artistImg})` }}
      >
        <div
          className="bg-gradient-to-t from-black to-transparent backdrop-blur-sm rounded-lg duration-300 group-hover:backdrop-blur-md "
          id="border"
        >
          {/* TOP BAR */}
          <div className="relative flex justify-between px-2 py-1 z-10">
            <span
              className="uppercase flex items-center gap-2 pl-1 pr-2 rounded-md font-num text-2xl  bg-slate-500/[0.6] ease-in-out duration-300 group-hover:scale-110 group-hover:translate-x-[-0.5rem] group-hover:translate-y-[-0.2rem] group-hover:shadow-[0_0.2rem_1rem_0_rgba(0,0,0,0.5)]"
              id="top"
            >
              <span className="text-lg">
                <BsPersonFill />
              </span>
              {cardDetails.type}
            </span>
            <span
              className="flex items-center gap-2 pl-1 pr-2 rounded-md font-num text-2xl  bg-slate-500/[0.6] ease-in-out duration-300 group-hover:scale-110 group-hover:translate-x-[0.5rem] group-hover:translate-y-[-0.2rem] group-hover:shadow-[0_0.2rem_1rem_0_rgba(0,0,0,0.5)]"
              id="top"
            >
              <span className="text-lg">
                <MdStars />
              </span>
              {cardDetails.popularity}
            </span>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center items-center py-2 ease-in-out duration-500 group-hover:translate-y-[0.4rem] group-hover:scale-105">
            <img
              src={artistImg}
              alt="cover"
              className="w-5/6 h-5/6 ease-in-out duration-700 group-hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)]"
              id="img"
            />
          </div>

          {/* ARTIST INFO */}
          <div className="px-4 flex flex-col justify-between mb-6">
            <div className="flex flex-col w-full h-full px-4 font-disp ease-in-out duration-500 group-hover:translate-y-2 group-hover:z-10 group-hover:scale-105 ">
              <span className="text-center text-4xl mt-4 mb-2">
                {cardDetails.name}
              </span>
            </div>
            <div className="w-full flex justify-center">
              <div>
                {artistGenres
                  .map((genre) => (
                    <span
                      key={genre}
                      className="mx-1 my-2 text-xs px-2 py-1 bg-slate-500/[0.6] rounded-md duration-300"
                      id="genres"
                    >
                      {genre}
                    </span>
                  ))
                  .splice(0, 3)}
              </div>
            </div>

            <div
              className="mx-4 my-2 border-b-[1px]
               border-slate-500/20"
            ></div>

            {/* TRACKS AND ALBUMS */}
            <div className="m-2">
              <ArtistTopTracks tracks={topTracks} />
              <ArtistTopAlbums albums={topAlbums} artistId={artistId} />
            </div>
          </div>

          <div className="pt-8">
            <CardButtons
              cardDetails={cardDetails}
              setShowConfirmRecommend={setShowConfirmRecommend}
              handleFollowArtist={handleFollowArtist}
              isFollowed={isFollowed}
            />
          </div>
          <ConfirmRecommend
            showConfirmRecommend={showConfirmRecommend}
            setShowConfirmRecommend={setShowConfirmRecommend}
            name={cardDetails.name}
            handleGetRelatedArtists={handleGetRelatedArtists}
          />
          <ConfirmFollowedArtist followedArtist={followedArtist} />
        </div>
      </div>
    </Tilt>
  );
};

const ConfirmRecommend = ({
  showConfirmRecommend,
  setShowConfirmRecommend,
  name,
  handleGetRelatedArtists,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className={`absolute left-0 bottom-0 flex flex-col w-full bg-gradient-to-t from-black to-transparent text-sm px-4 py-2 gap-2 rounded-b-lg ${
          showConfirmRecommend ? "block" : "hidden"
        }`}
        id="confirm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
      >
        <span className="text-center">
          Get new cards related to <span className="font-bold">{name}</span>?
        </span>
        <div className="flex justify-center gap-2 text-white">
          <button
            className="px-2  rounded-sm bg-slate-800/60 hover:bg-slate-500"
            onClick={handleGetRelatedArtists}
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

const ConfirmFollowedArtist = ({ followedArtist }) => {
  return (
    <AnimatePresence>
      <motion.div
        className={`absolute left-0 bottom-0 flex flex-col w-full bg-gradient-to-t from-black to-transparent text-sm px-4 py-6 gap-2 rounded-b-lg ${
          followedArtist ? "block" : "hidden"
        }`}
        id="confirm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
      >
        <span className="text-center">Artist followed!</span>
      </motion.div>
    </AnimatePresence>
  );
};

const ArtistTopTracks = ({ tracks }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      <span className="pl-6">Top Tracks</span>
      <div className="grid grid-cols-4 px-4 text-sm">
        {tracks
          .sort((a, b) => b.popularity - a.popularity)
          .map((track) => (
            <a
              href={track.external_urls.spotify}
              key={track.id}
              target="_blank"
            >
              <div className="group/album relative flex  gap-2 m-1  box-border items-center justify-center  rounded-md hover:scale-105 ease-in-out duration-300">
                <img
                  src={track.album?.images[1].url}
                  className="w-16 h-16 group-hover/album:scale-110"
                  alt="album cover"
                  onLoad={() => setLoaded(true)}
                />
                <div className="absolute top-[-1.6rem] left-4  whitespace-nowrap font-disp rounded-md bg-slate-600 p-1  hidden group-hover/album:block">
                  <p className="text-[1.2rem]">{track.name}</p>
                </div>
              </div>
            </a>
          ))
          .slice(0, 4)}
      </div>
    </div>
  );
};
const ArtistTopAlbums = ({ albums, artistId }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="mt-2">
      <span className="ml-6">Latest Album</span>
      <div className="grid grid-rows-1 px-4 text-sm">
        {albums
          .filter((type) => type.album_type.includes("al"))
          .map((album) => (
            <a
              href={album.external_urls.spotify}
              key={album.id}
              target="_blank"
            >
              <div className="group/album relative flex justify-between gap-2 m-1 p-1 box-border items-center bg-slate-500/[0.6] rounded-md hover:scale-105 ease-in-out duration-300 ">
                <div className="flex items-center max-w-[20rem] gap-2 overflow-hidden">
                  <img
                    src={album.images[2]?.url}
                    className="w-8 h-8"
                    alt="album cover"
                    onLoad={() => setLoaded(true)}
                  />
                  <span className="text-xl font-disp  whitespace-nowrap">
                    {album.name}
                  </span>
                </div>
                <span>{album.release_date.substring(0, 4)}</span>
              </div>
            </a>
          ))
          .slice(0, 1)}
      </div>
      <div className="text-center text-sm m-1 mb-2">
        <a
          className="hover:underline"
          href={`https://open.spotify.com/artist/${artistId}/discography/all`}
          target="_blank"
        >
          more albums
        </a>
      </div>
    </div>
  );
};

export default ArtistDetails;
