import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "../components/Nav";
import { getUserProfile, getUserTopItems } from "../util/spotify";
import Artists from "./Artists";
import Deck from "./Deck";
import Recents from "./Recents";
import Recommendations from "./Recommendations";
import Tracks from "./Tracks";
import RelatedArtists from "./RelatedArtists";
import About from "./About";
import Footer from "../components/Footer";
import { useContext } from "react";
import { MainContext } from "../MainContext";
import Search from "./Search";

const Home = ({ setToken }) => {
  const { list, setList, type, setType, length, setLength, setUser } =
    useContext(MainContext);

  const handleGetList = async (type, length) => {
    setList([]);
    setType(type);
    setLength(length);
    getUserTopItems(type, length).then(setList);
    console.log(`type: ${type}, length: ${length}`);
  };

  useEffect(() => {
    getUserProfile().then(setUser);
  }, []);

  return (
    <div
      className="relative flex flex-col items-center w-full font-mono"
      role="container"
    >
      <Nav setToken={setToken} />
      <main className="md:w-[900px] min-h-[calc(100vh-10rem)] pb-4 over">
        <Routes>
          <Route path="/" element={<Tracks handleGetList={handleGetList} />} />
          <Route
            path="top-tracks"
            element={<Tracks handleGetList={handleGetList} />}
          />
          <Route
            path="top-artists"
            element={<Artists handleGetList={handleGetList} />}
          />
          <Route path="recently-played" element={<Recents />} />
          <Route
            path="deck"
            element={<Deck list={list} setList={setList} type={type} />}
          />
          <Route path="search" element={<Search />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="related-artists" element={<RelatedArtists />} />
          <Route path="about" element={<About />} />
        </Routes>
      </main>
      <footer className="absolute bottom-0 w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
