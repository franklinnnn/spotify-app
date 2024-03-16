import { useEffect, useState } from "react";
import {
  followArtist,
  getArtistAlbums,
  getArtistTracks,
  isFollowingCheck,
} from "../util/spotify";
import { setCardColor } from "../util/color";

const useArtist = (details) => {
  const [artist, setArtist] = useState("");
  const [artistId, setArtistId] = useState("");
  const [artistGenres, setArtistGenres] = useState([]);
  const [artistImg, setArtistImg] = useState("");
  const [topAlbums, setTopAlbums] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [followedArtist, setFollowedArtist] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollowArtist = async () => {
    followArtist(details.id);
    console.log(`followed ${details.name}`);
    setFollowedArtist(true);
    setTimeout(() => {
      setFollowedArtist(false);
    }, 1600);
    setIsFollowed(true);
  };

  useEffect(() => {
    setArtist(details.name);
    setArtistId(details.id);
    setArtistGenres(details.genres ? details.genres : null);
    setArtistImg(details.images ? details.images[0].url : null);
    getArtistAlbums(details.id).then(setTopAlbums);
    getArtistTracks(details.id).then(setTopTracks);
    isFollowingCheck(details.id).then((res) => {
      res[0] === true && setIsFollowed(true);
    });
    setCardColor(details.popularity);
  }, [details]);

  return {
    artist,
    artistId,
    artistGenres,
    artistImg,
    topAlbums,
    topTracks,
    followedArtist,
    isFollowed,
    handleFollowArtist,
  };
};

export default useArtist;
