import { useEffect, useState } from "react";
import {
  getRandomTrackRecommendations,
  getUserTopItems,
} from "../util/spotify";
import { useNavigate } from "react-router-dom";

const useTracks = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserTopItems("tracks", "short_term").then(setList);
  }, []);

  const getTopTracks = (type, length) => {
    setList([]);
    getUserTopItems(type, length).then(setList);
  };

  const getRandomTracks = () => {
    setList([]);
    getRandomTrackRecommendations().then(setList);
    navigate("/recommendations");
  };

  return {
    list,
    getTopTracks,
    getRandomTracks,
  };
};

export default useTracks;
