import { useEffect, useState } from "react";
import {
  getRandomTrackRecommendations,
  getRecentlyPlayed,
} from "../util/spotify";
import { useNavigate } from "react-router-dom";

const useHistory = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRecentlyPlayed().then(setList);
  }, []);

  const getRandomTracks = () => {
    setList([]);
    getRandomTrackRecommendations().then(setList);
    navigate("/recommendations");
  };

  return {
    list,
    getRandomTracks,
  };
};

export default useHistory;
