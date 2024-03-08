import { useState } from "react";
import { motion } from "framer-motion";

import useArtists from "../hooks/useArtists";
import { pageMenu } from "../util/motion";
import CardsContainer from "../components/CardsContainer";

const Artists = () => {
  const { list, getTopArtists } = useArtists();
  const [activeTab, setActiveTab] = useState("short");
  const type = "artists";

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
                getTopArtists("artists", "short_term");
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
                getTopArtists("artists", "medium_term");
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
                getTopArtists("artists", "long_term");
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
