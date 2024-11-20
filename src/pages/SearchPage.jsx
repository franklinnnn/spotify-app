import { useContext, useEffect, useState } from "react";
import CardsContainer from "../components/CardsContainer";
import { MainContext } from "../MainContext";
import { motion } from "framer-motion";
import { BiSearch } from "react-icons/bi";
import { getNew, searchForTrack } from "../util/spotify";
import { pageMenu } from "../util/motion";

const SearchPage = () => {
  const { list, setList, cardHand, loading, setLoading } =
    useContext(MainContext);
  const [searchList, setSearchList] = useState([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("albums");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setList([]);
    getNew(offset).then((data) => {
      setList(data);
    });
  }, [offset]);

  console.log(list);

  const handleSearchQuery = (e) => {
    e.preventDefault();
    setLoading(true);
    setList([]);
    searchForTrack(query).then((res) => {
      setTimeout(() => {
        setSearchList(res.tracks.items), 1;
        setType("tracks");
      }, 500);
      setLoading(false);
    });
  };

  const handleMoreNewReleases = () => {
    setOffset(offset + 20);
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
        <>
          <CardsContainer
            list={searchList.length > 1 ? searchList : list}
            type={type}
          />
          {type === "albums" && (
            <div
              className={`w-full flex justify-center my-12 ${
                cardHand === "fanned" && "mt-24"
              }`}
            >
              <button
                onClick={handleMoreNewReleases}
                className="flex gap-2 items-center px-2 py-1 rounded-sm bg-slate-700 hover:bg-primary hover:cursor-pointer max-sm:text-s"
              >
                More new releases
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default SearchPage;
