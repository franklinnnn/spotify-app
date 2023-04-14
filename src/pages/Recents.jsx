import React, { useContext, useEffect, useState } from "react";
import CardsContainer from "../components/CardsContainer";
import {
  getRecentlyPlayed,
  getRandomTrackRecommendations,
} from "../util/spotify";

import { useNavigate } from "react-router-dom";
import { MainContext } from "./Home";
import { motion } from "framer-motion";
import { FaRandom } from "react-icons/fa";

const Recents = () => {
  const { list, setList, showDetails } = useContext(MainContext);

  const navigate = useNavigate();

  useEffect(() => {
    handleGetRecents();
  }, []);

  const handleGetRecents = () => {
    setList([]);
    getRecentlyPlayed().then(setList);
  };

  const handleGetRandomCards = () => {
    setList([]);
    getRandomTrackRecommendations().then(setList);
    navigate("/recommendations");
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
    <div className="relative w-full my-6">
      <motion.div
        className={`relative flex items-center justify-between gap-6 px-6 ${
          showDetails ? "opacity-60 blur-sm pointer-events-none" : "opacity-100"
        } max-sm:flex-col max-sm:gap-2`}
        variants={pageMenu}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <h1 className="text-2xl max-sm:text-xl">Recently Played</h1>

        <div
          className="flex gap-2 items-center px-2 py-1 rounded-sm  bg-slate-700 hover:bg-primary hover:cursor-pointer max-sm:text-sm"
          onClick={handleGetRandomCards}
        >
          <FaRandom />
          Get Random Cards
        </div>
      </motion.div>
      <CardsContainer list={list} />
    </div>
  );
};

export default Recents;
