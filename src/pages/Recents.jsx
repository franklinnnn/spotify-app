import { motion } from "framer-motion";
import { FaRandom } from "react-icons/fa";

import useHistory from "../hooks/useHistory";
import { pageMenu } from "../util/motion";
import CardsContainer from "../components/CardsContainer";

const Recents = () => {
  const { list, getRandomTracks } = useHistory();

  return (
    <section className="relative w-full my-6">
      <motion.header
        className="relative flex items-center justify-between gap-6 px-6 max-sm:flex-col max-sm:gap-2"
        variants={pageMenu}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <h1 className="text-2xl max-sm:text-xl">Recently Played</h1>

        <div
          className="flex gap-2 items-center px-2 py-1 rounded-sm  bg-slate-700 hover:bg-primary hover:cursor-pointer max-sm:text-sm"
          onClick={getRandomTracks}
        >
          <FaRandom />
          Recommend Cards
        </div>
      </motion.header>
      <CardsContainer list={list} />
    </section>
  );
};

export default Recents;
