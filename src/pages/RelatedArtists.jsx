import React, { useContext } from "react";
import CardsContainer from "../components/CardsContainer";
import { MainContext } from "./Home";
import { motion } from "framer-motion";

const RelatedArtists = () => {
  const { list, showDetails } = useContext(MainContext);
  const type = "artists";

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

export default RelatedArtists;
