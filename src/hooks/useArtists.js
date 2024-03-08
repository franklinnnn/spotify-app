import { useEffect, useState } from "react";
import { getUserTopItems } from "../util/spotify";

const useArtists = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getUserTopItems("artists", "short_term").then(setList);
  }, []);

  const getTopArtists = (type, length) => {
    setList([]);
    getUserTopItems(type, length).then(setList);
  };

  return {
    list,
    getTopArtists,
  };
};

export default useArtists;
