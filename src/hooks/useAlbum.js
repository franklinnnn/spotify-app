import { useEffect, useState } from "react";
import { getAlbum } from "../util/spotify";

const useAlbum = (details) => {
  const [albumType, setAlbumType] = useState("");
  const [album, setAlbum] = useState("");
  const [albumImg, setAlbumImg] = useState("");
  const [artists, setArtists] = useState([]);
  const [releaseDate, setReleaseDate] = useState("");
  const [tracks, setTracks] = useState("");
  const [albumLength, setAlbumLength] = useState("");

  const getAlbumInfo = () => {
    getAlbum(details.id).then((data) => {
      // console.log(details);
      // setAlbumType(data.album_type);
      // setAlbum(data.name);
      // setAlbumImg(data.images[0].url);
      // setArtists(data.artists.map((artist) => artist.name).join(", "));
      // setReleaseDate(data.release_date);
      setTracks(data.tracks.items.length);
      calculateAlbumLength(data.tracks.items);
    });
  };

  const calculateAlbumLength = () => {
    getAlbum(details.id).then((data) => {
      const totalMs = data.tracks.items.reduce(
        (n, { duration_ms }) => n + duration_ms,
        0
      );
      const ms = new Date(totalMs);
      setTracks(data.tracks.items.length);
      setAlbumLength(`${ms.getMinutes()}.${ms.getSeconds()}`);
    });
  };

  useEffect(() => {
    setAlbumType(details.album_type);
    setAlbum(details.name);
    setAlbumImg(details.images[0].url);
    setArtists(details.artists.map((artist) => artist.name).join(", "));
    setReleaseDate(details.release_date);
    calculateAlbumLength();
  }, [details]);

  // console.log(
  //   albumType,
  //   album,
  //   albumImg,
  //   artists,
  //   releaseDate,
  //   tracks,
  //   albumLength
  // );

  return {
    albumType,
    album,
    albumImg,
    artists,
    releaseDate,
    tracks,
    albumLength,
    calculateAlbumLength,
  };
};

export default useAlbum;
