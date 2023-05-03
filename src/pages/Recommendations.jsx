import React, { useContext } from "react";
import { FaRandom } from "react-icons/fa";
import CardsContainer from "../components/CardsContainer";
import { getRandomTrackRecommendations } from "../util/spotify";
import { MainContext } from "./Home";
import { motion } from "framer-motion";

const Recommendations = () => {
  const { list, setList, showDetails } = useContext(MainContext);
  const type = "tracks";
  const handleGetRandomCards = () => {
    setList([]);
    getRandomTrackRecommendations().then(setList);
  };

  const pageMenu = {
    hidden: {
      x: -10,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        mass: 0.5,
      },
    },
  };

  return (
    <section className="w-full my-6">
      <motion.header
        className={`relative flex items-center justify-between gap-6 px-6 ${
          showDetails ? "opacity-60 blur-sm pointer-events-none" : "opacity-100"
        } max-sm:flex-col max-sm:gap-2`}
        variants={pageMenu}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <h1 className="text-2xl">Random cards</h1>
        <div
          className="flex gap-2 items-center px-2 py-1 rounded-sm bg-slate-700 hover:bg-primary hover:cursor-pointer max-sm:text-sm"
          onClick={handleGetRandomCards}
        >
          <FaRandom /> Get Random Cards
        </div>
      </motion.header>
      <CardsContainer list={list} type={type} />
    </section>
  );
};

export default Recommendations;
