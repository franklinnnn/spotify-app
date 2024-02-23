import React, { useContext, useEffect, useState } from "react";
import CardsContainer from "../components/CardsContainer";
import { MainContext } from "../MainContext";
import { motion } from "framer-motion";
import { BiSearch } from "react-icons/bi";
import { getRandomTrackRecommendations, searchForTrack } from "../util/spotify";

const Search = () => {
  const { list, setList, showDetails, loading, setLoading } =
    useContext(MainContext);
  const [searchList, setSearchList] = useState([]);
  const [query, setQuery] = useState("");
  const type = "tracks";

  //   useEffect(() => {
  //     setList([]);
  //     getRandomTrackRecommendations().then(setList);
  //   }, []);

  const handleSearchQuery = (e) => {
    e.preventDefault();
    setLoading(true);
    setList([]);
    searchForTrack(query).then((res) => {
      setTimeout(() => {
        setSearchList(res.tracks.items), 1;
      }, 500);
      setLoading(false);
    });
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
    <section className="relative w-full my-6">
      <motion.header
        className="relative flex items-center justify-between gap-6 px-6 max-sm:flex-col max-sm:gap-2"
        variants={pageMenu}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <h1 className="text-2xl max-sm:text-xl">Search</h1>
      </motion.header>
      <motion.form
        onSubmit={handleSearchQuery}
        className="w-full flex items-center justify-between bg-slate-800/40 my-4 border-2 px-4 border-primary/60 focus-within:border-primary rounded-md transition"
        variants={pageMenu}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <input
          type="text"
          placeholder="Look for tracks or artists"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-6 py-2 bg-transparent outline-none rounded-md transition duration-300"
        />
        <button type="submit" className="flex items-center justify-center">
          <BiSearch size={24} className="text-primary" />
        </button>
      </motion.form>
      {loading ? (
        <div className="flex items-center justify-center w-full mt-6 text-xl">
          Loading...
        </div>
      ) : (
        <CardsContainer
          list={searchList.length > 1 ? searchList : list}
          type={type}
        />
      )}
    </section>
  );
};

export default Search;
