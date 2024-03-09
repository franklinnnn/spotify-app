import { motion } from "framer-motion";
import { FaRandom } from "react-icons/fa";

import { pageMenu } from "../util/motion";
import useRecommend from "../hooks/useRecommend";
import CardsContainer from "../components/CardsContainer";
import { useContext } from "react";
import { MainContext } from "../MainContext";

const Recommendations = () => {
  // const { list } = useContext(MainContext);
  const { list, loading, getRandomTracks } = useRecommend();
  const type = "tracks";

  return (
    <section className="w-full my-6">
      <motion.header
        className="relative flex items-center justify-between gap-6 px-6 max-sm:flex-col"
        variants={pageMenu}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <h1 className="text-2xl">Recommended</h1>
        <div
          className="flex gap-2 items-center px-2 py-1 rounded-sm bg-slate-700 hover:bg-primary hover:cursor-pointer max-sm:text-sm"
          onClick={getRandomTracks}
        >
          <FaRandom />
          Recommend Cards
        </div>
      </motion.header>
      {loading ? (
        <div className="flex justify-center items-center w-full p-4 text-2xl text-white font-mono">
          Getting songs...
        </div>
      ) : (
        <CardsContainer list={list} type={type} />
      )}
    </section>
  );
};

export default Recommendations;
