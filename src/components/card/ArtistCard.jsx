import React, { useState } from "react";
import { CgDetailsMore } from "react-icons/cg";

const ArtistCard = ({ item, setShowDetails, setCardDetails }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const handleCardDetails = () => {
    // console.log(`setting card details to ${item.name}`);
    setCardDetails(item);
    setShowDetails(true);
  };

  const artistImg = item.images ? item.images[1].url : null;

  return (
    <div className="relative m-2 p-1 bg-white rounded-sm hover:scale-[1.02] hover:shadow-xl hover:z-10">
      <div className="flex justify-center items-center">
        <div className="absolute top-0 left-0 right-0 bottom-20 flex justify-center items-center "></div>

        <img
          src={artistImg}
          alt="artist image"
          className={`${imgLoaded ? "block" : "hidden"}`}
          onLoad={() => setImgLoaded(true)}
        />
      </div>
      <div className="flex flex-col text-sm text-red-600">
        <span>{item.name}</span>
      </div>
      <button className="text-black text-2xl" onClick={handleCardDetails}>
        <CgDetailsMore />
      </button>
    </div>
  );
};

export default ArtistCard;
