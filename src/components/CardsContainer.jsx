import { useContext, useEffect, useState } from "react";
import { MainContext } from "../MainContext";

import CardSpread from "./CardSpread";
import CardFanned from "./CardFanned";
import ArtistDetails from "./card/ArtistDetails";
import TrackDetails from "./card/TrackDetails";
import { motion } from "framer-motion";
import CardDetailView from "./CardDetailView";
import { Dialog } from "@headlessui/react";

const CardsContainer = ({ list, type }) => {
  const { setList, showDetails, setShowDetails, cardHand, setCardHand } =
    useContext(MainContext);
  const [cardDetails, setCardDetails] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  const handleMobileSize = () => {
    if (window.innerWidth < 640) {
      setIsMobile(true);
      if (cardHand === "fanned") {
        setCardHand("spread");
      }
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleMobileSize();
    window.addEventListener("mobile size", handleMobileSize);
  });

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
    <section className="relative w-full mb-20 md:mb-10">
      <Dialog
        open={showDetails}
        onClose={() => {
          setShowDetails(false);
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-slate-500/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel>
            <div className="-mt-12 text-white">
              {type === "artists" ? (
                <ArtistDetails cardDetails={cardDetails} setList={setList} />
              ) : (
                <TrackDetails cardDetails={cardDetails} />
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <div className="w-full my-4 grid items-center justify-center">
        {/* CARD HAND VIEW OPTIONS */}
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
            } ${
              list.length > 7 || isMobile
                ? "text-light/50 hover:border-b-transparent"
                : "text-white"
            }`}
            onClick={() => setCardHand("fanned")}
            disabled={list.length > 7 || isMobile}
          >
            fanned
          </button>
          <button
            className={`capitalize text-lg border-b-2 hover:border-b-primary ${
              cardHand === "spread"
                ? "border-b-primary"
                : "border-b-transparent"
            } ${list.length > 7 && "text-light/50 hover:border-b-transparent"}`}
            onClick={() => setCardHand("spread")}
            disabled={list.length > 7}
          >
            spread
          </button>
          <button
            className={`capitalize text-lg border-b-2 hover:border-b-primary ${
              cardHand === "detail"
                ? "border-b-primary"
                : "border-b-transparent"
            }`}
            onClick={() => setCardHand("detail")}
          >
            Detail
          </button>
        </motion.div>

        {/* CARD HAND VIEW */}
        <div
          className={`
            ${
              cardHand === "fanned" || cardHand === "detail"
                ? "whitespace-nowrap"
                : "grid grid-cols-4 justify-center"
            } max-sm:grid-cols-1`}
        >
          {list.length > 7
            ? list.map((item, index) => {
                setCardHand("detail");
                const image =
                  item.type === "track"
                    ? item.album.images[0].url
                    : item.images[0].url;
                return (
                  <>
                    {cardHand === "detail" && (
                      <CardDetailView
                        item={item}
                        index={index}
                        image={image}
                        setList={setList}
                        setCardDetails={setCardDetails}
                      />
                    )}
                  </>
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
                      {cardHand === "fanned" && (
                        <CardFanned
                          item={item}
                          index={index}
                          image={image}
                          setList={setList}
                          setCardDetails={setCardDetails}
                        />
                      )}
                      {cardHand === "spread" && (
                        <CardSpread
                          item={item}
                          index={index}
                          image={image}
                          setList={setList}
                          setCardDetails={setCardDetails}
                        />
                      )}
                      {cardHand === "detail" && (
                        <CardDetailView
                          item={item}
                          index={index}
                          image={image}
                          setList={setList}
                          setCardDetails={setCardDetails}
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

export default CardsContainer;
