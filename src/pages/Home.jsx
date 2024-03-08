import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";

import { MainContext } from "../MainContext";
import { getUserProfile } from "../util/spotify";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

import Tracks from "./Tracks";
import Artists from "./Artists";
import Recents from "./Recents";
import Deck from "./Deck";
import Recommendations from "./Recommendations";
import RelatedArtists from "./RelatedArtists";
import About from "./About";
import Search from "./Search";

const Home = ({ setToken }) => {
  const { setUser } = useContext(MainContext);

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
          <Route path="/" element={<Tracks />} />
          <Route path="top-tracks" element={<Tracks />} />
          <Route path="top-artists" element={<Artists />} />
          <Route path="recently-played" element={<Recents />} />
          <Route path="deck" element={<Deck />} />
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
