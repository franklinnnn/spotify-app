import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";

import { MainContext } from "../MainContext";
import { getUserProfile } from "../util/spotify";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

import TracksPage from "./TracksPage";
import ArtistsPage from "./ArtistsPage";
import HistoryPage from "./HistoryPage";
import DeckPage from "./DeckPage";
import RecommendationsPage from "./RecommendationsPage";
import RelatedArtistsPage from "./RelatedArtistsPage";
import AboutPage from "./AboutPage";
import SearchPage from "./SearchPage";
import SongRecommendationsPage from "./SongRecommendationsPage";

const HomePage = ({ setToken }) => {
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
          <Route path="/" element={<TracksPage />} />
          <Route path="top-tracks" element={<TracksPage />} />
          <Route path="top-artists" element={<ArtistsPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="deck" element={<DeckPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="recommendations" element={<RecommendationsPage />} />
          <Route
            path="recommendations/:artistId/:trackId"
            element={<SongRecommendationsPage />}
          />
          <Route
            path="related-artists/:artistId"
            element={<RelatedArtistsPage />}
          />
          <Route path="about" element={<AboutPage />} />
        </Routes>
      </main>
      <footer className="absolute bottom-0 w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
