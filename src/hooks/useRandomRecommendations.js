import { useEffect, useState } from "react";
import { getRandomTrackRecommendations } from "../util/spotify";
import { useNavigate } from "react-router-dom";

const useRandomRecommendations = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setList([]);
    getRandomTrackRecommendations().then(setList);
    setLoading(false);
  }, []);

  const getRandomTracks = () => {
    setLoading(true);
    setList([]);
    getRandomTrackRecommendations().then(setList);
    navigate("/recommendations");
    setLoading(false);
  };

  return {
    list,
    loading,
    getRandomTracks,
  };
};

export default useRandomRecommendations;
