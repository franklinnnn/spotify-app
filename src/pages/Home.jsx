import React, { createContext, useEffect, useRef, useState } from "react";
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

export const MainContext = createContext("");

const Home = ({ setToken }) => {
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [deck, setDeck] = useState([]);
  const [type, setType] = useState("tracks");
  const [length, setLength] = useState("short_term");
  const [showDetails, setShowDetails] = useState(false);
  const [cardHand, setCardHand] = useState("fanned");

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
      <MainContext.Provider
        value={{
          user,
          setToken,
          list,
          setList,
          type,
          setType,
          deck,
          setDeck,
          showDetails,
          setShowDetails,
          cardHand,
          setCardHand,
        }}
      >
        <Nav />
        <main className="md:w-[900px] min-h-[calc(100vh-10rem)] pb-4 over">
          <Routes>
            <Route
              path="/"
              element={<Tracks handleGetList={handleGetList} />}
            />
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
            <Route path="recommendations" element={<Recommendations />} />
            <Route path="related-artists" element={<RelatedArtists />} />
            <Route path="about" element={<About />} />
          </Routes>
        </main>
        <footer className="absolute bottom-0 w-full">
          <Footer />
        </footer>
      </MainContext.Provider>
    </div>
  );
};

export default Home;
