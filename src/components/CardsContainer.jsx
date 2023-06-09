import React, { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../pages/Home";
import CardSpread from "./CardSpread";
import CardFanned from "./CardFanned";
import ArtistDetails from "./card/ArtistDetails";
import TrackDetails from "./card/TrackDetails";
import { motion } from "framer-motion";

const CardsContainer = ({
  list,
  type,
  isSaveComponentVisible,
  isDelComponentVisible,
}) => {
  const { setList, showDetails, setShowDetails, cardHand, setCardHand } =
    useContext(MainContext);
  const [cardDetails, setCardDetails] = useState({});

  const { cardDetailsRef, isCardDetailsVisible, setIsCardDetailsVisible } =
    cardDetailsVisible(false);

  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseCoords = (e) => {
      setMouseCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("click", handleMouseCoords);

    return () => {
      window.removeEventListener("click", handleMouseCoords);
    };
  }, []);

  const cardShow = {
    hidden: {
      scale: 0.4,
      opacity: 0,
      rotateY: 180,
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 350,
      transition: { duration: 0.5 },
    },
    exit: {
      scale: 0.6,
      opacity: 0,
      originY: -2,
    },
  };

  const cardHandOptions = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        mass: 0.5,
        delay: 0.75,
      },
    },
  };

  return (
    <section className="relative w-full">
      <AnimatePresence>
        {isCardDetailsVisible && showDetails && (
          <div
            className="relative flex justify-center max-sm:h-screen"
            ref={cardDetailsRef}
          >
            <motion.div
              className="absolute top-[-3rem] mx-auto flex flex-col justify-start items-center z-20"
              key="card detail"
              variants={cardShow}
              initial="hidden"
              animate="visible"
              exit="exit"
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

      <div className="w-full my-4 grid items-center justify-center">
        <motion.div
          className={`flex justify-center items-center text-sm gap-4 my-8`}
          key={list}
          variants={cardHandOptions}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <button
            className={`capitalize text-lg border-b-2 hover:border-b-primary ${
              cardHand === "fanned"
                ? "border-b-primary"
                : "border-b-transparent"
            } ${list.length > 7 && "text-light/50 hover:border-b-transparent"}`}
            onClick={() => setCardHand("fanned")}
            disabled={list.length > 7}
          >
            fanned
          </button>
          <button
            className={`capitalize text-lg border-b-2 hover:border-b-primary ${
              cardHand === "spread"
                ? "border-b-primary"
                : "border-b-transparent"
            }`}
            onClick={() => setCardHand("spread")}
          >
            spread
          </button>
        </motion.div>
        <div
          className={`${
            cardHand === "fanned"
              ? "whitespace-nowrap"
              : "grid grid-cols-4 justify-center"
          } ${
            (isCardDetailsVisible && showDetails) ||
            isSaveComponentVisible ||
            isDelComponentVisible
              ? "opacity-50 blur-sm pointer-events-none"
              : "opacity-100"
          } max-sm:grid-cols-1`}
        >
          {list.length > 7
            ? list.map((item, index) => {
                setCardHand("spread");
                const image =
                  item.type === "track"
                    ? item.album.images[0].url
                    : item.images[0].url;
                return (
                  <CardSpread
                    item={item}
                    index={index}
                    image={image}
                    setList={setList}
                    setCardDetails={setCardDetails}
                    setIsCardDetailsVisible={setIsCardDetailsVisible}
                  />
                );
              })
            : list
                .map((item, index) => {
                  const image =
                    item.type === "track"
                      ? item.album.images[0].url
                      : item.images[0].url;

                  return (
                    <>
                      {cardHand === "fanned" ? (
                        <CardFanned
                          item={item}
                          index={index}
                          image={image}
                          setList={setList}
                          setCardDetails={setCardDetails}
                          setIsCardDetailsVisible={setIsCardDetailsVisible}
                        />
                      ) : (
                        <CardSpread
                          item={item}
                          index={index}
                          image={image}
                          setList={setList}
                          setCardDetails={setCardDetails}
                          setIsCardDetailsVisible={setIsCardDetailsVisible}
                        />
                      )}
                    </>
                  );
                })
                .slice(0, 7)}
        </div>
      </div>
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
