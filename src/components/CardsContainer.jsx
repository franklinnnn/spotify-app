import React, { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../pages/Home";
import Card from "./Card";
import ArtistDetails from "./card/ArtistDetails";
import TrackDetails from "./card/TrackDetails";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

const CardsContainer = ({
  list,
  type,
  isSaveComponentVisible,
  isDelComponentVisible,
}) => {
  const { setList, showDetails, setShowDetails } = useContext(MainContext);

  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({});

  const { cardDetailsRef, isCardDetailsVisible, setIsCardDetailsVisible } =
    cardDetailsVisible(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [-30, 30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const cardList = {
    hidden: {
      y: 10,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        mass: 0.5,
        delay: 0.25,
      },
    },
  };

  return (
    <section className="relative w-full">
      <AnimatePresence>
        {isCardDetailsVisible && showDetails && (
          <div className="relative flex justify-center" ref={cardDetailsRef}>
            <motion.div
              className="absolute top-[-3rem] mx-auto flex flex-col justify-start items-center z-20"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{ x, y, rotateX, rotateY, z: 100 }}
              drag
              dragElastic={0.08}
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              whileTap={{ cursor: "grabbing" }}
            >
              <div className="w-full flex justify-end">
                <button
                  onClick={() => {
                    setShowDetails(false);
                    setIsCardDetailsVisible(false);
                  }}
                  className="flex justify-center items-center text-lg h-6 w-6 p-4 m-4 text-light bg-slate-500/50 hover:bg-primary rounded-full"
                >
                  X
                </button>
              </div>
              {type === "artists" ? (
                <ArtistDetails cardDetails={cardDetails} setList={setList} />
              ) : (
                <TrackDetails cardDetails={cardDetails} />
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        <div
          className={` grid grid-cols-3 p-4 ${
            (isCardDetailsVisible && showDetails) ||
            isSaveComponentVisible ||
            isDelComponentVisible
              ? "opacity-50 blur-sm pointer-events-none"
              : "opacity-100"
          } max-sm:grid-cols-1`}
        >
          {list.map((item, index) => {
            const image =
              item.type === "track"
                ? item.album.images[0].url
                : item.images[0].url;
            return (
              <motion.div
                key={index}
                variants={cardList}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Card
                  item={item}
                  image={image}
                  setList={setList}
                  setCardDetails={setCardDetails}
                  setIsCardDetailsVisible={setIsCardDetailsVisible}
                />
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>
    </section>
  );
};

const cardDetailsVisible = (initialVisible) => {
  const [isCardDetailsVisible, setIsCardDetailsVisible] =
    useState(initialVisible);
  const { setShowDetails } = useContext(MainContext);

  const cardDetailsRef = useRef();
  const handleClickOutside = (e) => {
    if (cardDetailsRef.current && !cardDetailsRef.current.contains(e.target)) {
      setIsCardDetailsVisible(false);
      setShowDetails(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return { cardDetailsRef, isCardDetailsVisible, setIsCardDetailsVisible };
};

export default CardsContainer;
