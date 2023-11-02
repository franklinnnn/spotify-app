import React, { useContext, useEffect, useState } from "react";
import CardsContainer from "../components/CardsContainer";
import { getUserTopItems } from "../util/spotify";
// import { MainContext } from "./Home";

import { MainContext } from "../MainContext";
import { motion } from "framer-motion";

const Artists = () => {
  const { list, setList } = useContext(MainContext);
  const [activeTab, setActiveTab] = useState("short");
  const type = "artists";
  useEffect(() => {
    handleGetTopArtists("artists", "short_term");
  }, []);

  const handleGetTopArtists = (type, length) => {
    setList([]);
    getUserTopItems(type, length).then(setList);
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
        className="relative flex items-center justify-left px-6 max-sm:flex-col"
        variants={pageMenu}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <div className="flex items-center gap-6 max-sm:flex-col max-sm:gap-2 max-sm:mb-2">
          <h1 className="text-2xl max-sm:text-xl">Top Artists</h1>
          <div className="flex gap-4 max-sm:text-sm">
            <button
              onClick={() => {
                handleGetTopArtists("artists", "short_term");
                setActiveTab("short");
              }}
              className={`border-b-2 hover:border-b-primary ${
                activeTab === "short"
                  ? "border-b-primary"
                  : "border-transparent"
              }`}
            >
              Last Month
            </button>
            <button
              onClick={() => {
                handleGetTopArtists("artists", "medium_term");
                setActiveTab("medium");
              }}
              className={`border-b-2 hover:border-b-primary ${
                activeTab === "medium"
                  ? "border-b-primary"
                  : "border-transparent"
              }`}
            >
              6 Months
            </button>
            <button
              onClick={() => {
                handleGetTopArtists("artists", "long_term");
                setActiveTab("long");
              }}
              className={`border-b-2 hover:border-b-primary ${
                activeTab === "long" ? "border-b-primary" : "border-transparent"
              }`}
            >
              All Time
            </button>
          </div>
        </div>
      </motion.header>
      <CardsContainer list={list} type={type} />
    </section>
  );
};

export default Artists;
