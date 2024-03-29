import { useState } from "react";
import { motion } from "framer-motion";
import { FaRandom } from "react-icons/fa";

import useTracks from "../hooks/useTracks";
import { pageMenu } from "../util/motion";
import CardsContainer from "../components/CardsContainer";

const TracksPage = () => {
  const [activeTab, setActiveTab] = useState("short");

  const { list, getTopTracks, getRandomTracks } = useTracks();

  return (
    <section className="relative w-full my-6">
      <motion.header
        className="relative flex items-center justify-between px-6 max-sm:flex-col"
        key="tracks page"
        variants={pageMenu}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <div className="flex items-center gap-6 max-sm:flex-col max-sm:gap-2 max-sm:mb-2">
          <h1 className="text-2xl max-sm:text-xl">Top Tracks</h1>
          <div className="flex gap-4 max-sm:text-sm">
            <button
              onClick={() => {
                getTopTracks("tracks", "short_term");
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
                getTopTracks("tracks", "medium_term");
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
                getTopTracks("tracks", "long_term");
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
        <div
          className="flex gap-2 items-center px-2 py-1 rounded-sm bg-slate-700 hover:bg-primary hover:cursor-pointer max-sm:text-sm"
          onClick={getRandomTracks}
        >
          <FaRandom />
          Recommend Cards
        </div>
      </motion.header>
      <CardsContainer list={list} type="tracks" />
    </section>
  );
};

export default TracksPage;
