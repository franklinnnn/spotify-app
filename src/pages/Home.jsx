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
    <div className="relative flex flex-col items-center w-full ">
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
        }}
      >
        <Nav />
        <div className="md:w-[768px] min-h-[calc(100vh-5rem)] pb-4">
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
        </div>
        {/* <div className="absolute bottom-0 w-full">
          <Footer />
        </div> */}
      </MainContext.Provider>
    </div>
  );
};

export default Home;
