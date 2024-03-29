import React, { useContext } from "react";
import { motion } from "framer-motion";
import { MainContext } from "../MainContext";
import { pageMenu } from "../util/motion";
import CardsContainer from "../components/CardsContainer";

const RelatedArtistsPage = () => {
  const { list, showDetails } = useContext(MainContext);
  const type = "artists";

  return (
    <section className="w-full my-6">
      <motion.header
        className={`relative flex items-center justify-left gap-6 px-6 ${
          showDetails ? "opacity-60 blur-sm pointer-events-none" : "opacity-100"
        }`}
        variants={pageMenu}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <h1 className="text-2xl">Related Artists</h1>
      </motion.header>
      <CardsContainer list={list} type={type} />
    </section>
  );
};

export default RelatedArtistsPage;
