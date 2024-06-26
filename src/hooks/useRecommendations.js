import { useEffect, useState } from "react";
import {
  getRandomTrackRecommendations,
  getRecommendations,
} from "../util/spotify";
import { useNavigate } from "react-router-dom";

const useRecommendations = (artistId, trackId) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRecommendations(artistId, trackId).then(setList);
    setLoading(false);
  }, []);

  return {
    list,
    loading,
  };
};

export default useRecommendations;
