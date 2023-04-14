import React, { useRef, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { MdMusicOff } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";

const TrackCard = ({ item, setShowDetails, setCardDetails }) => {
  const trackPreview = item ? item.preview_url : null;
  const audioRef = useRef();
  const [audio, setAudio] = useState(
    typeof Audio !== "undefined" && new Audio(trackPreview)
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const trackImg = item.album ? item.album.images[1].url : null;
  const trackArtist = item.artists ? item.artists[0].name : null;

  const preview = () => {
    if (isPlaying) {
      audio.pause();
      // console.log(`paused ${item.name} by ${item.artists[0].name}`);
    } else {
      audio.volume = 0.2;
      audio.load();
      audio.play();
      // console.log(`playing ${item.name} by ${item.artists[0].name}`);
    }
    setIsPlaying(!isPlaying);
  };
  audio.onended = () => {
    setIsPlaying(false);
  };

  const handleCardDetails = () => {
    // console.log(`setting card details to ${item.name}`);
    setCardDetails(item);
    setShowDetails(true);
  };

  return (
    <div className="relative m-2 p-1 bg-white rounded-sm hover:scale-[1.02] hover:shadow-xl hover:z-10">
      <div className="flex justify-center items-center" onClick={preview}>
        <div className="absolute top-0 left-0 right-0 bottom-20 flex justify-center items-center ">
          {isPlaying && (
            <span className="text-6xl opacity-70">
              <AiFillPlayCircle />
            </span>
          )}
          {isPlaying && !item.preview_url ? (
            <span className="text-6xl opacity-70">
              <MdMusicOff />
            </span>
          ) : null}
        </div>

        <img
          src={trackImg}
          alt="album cover"
          className={`${imgLoaded ? "block" : "hidden"}`}
          onLoad={() => setImgLoaded(true)}
        />
      </div>
      <div className="flex flex-col text-sm text-red-600">
        <span>{item.name}</span>
        <span>{trackArtist}</span>
      </div>
      <button className="text-black text-2xl" onClick={handleCardDetails}>
        <CgDetailsMore />
      </button>
      <audio ref={audioRef} key={item.id}>
        <source src={item.preview_url} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default TrackCard;
