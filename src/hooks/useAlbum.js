import { useEffect, useState } from "react";
import { getAlbum, getTracks } from "../util/spotify";

const useAlbum = (details) => {
  const [albumType, setAlbumType] = useState("");
  const [album, setAlbum] = useState("");
  const [albumImg, setAlbumImg] = useState("");
  const [artists, setArtists] = useState([]);
  const [artistIds, setArtistIds] = useState([]);
  const [releaseDate, setReleaseDate] = useState("");
  const [tracks, setTracks] = useState("");
  const [albumTracks, setAlbumTracks] = useState([]);
  const [albumLength, setAlbumLength] = useState("");

  const getAlbumTracks = () => {
    getAlbum(details.id).then((data) => {
      const ids = [];
      data.tracks.items.map((track) => ids.push(track.id));

      getTracks(ids.join(",")).then((data) => {
        const tracks = [];
        data.map((track) => tracks.push(track));
        setAlbumTracks(tracks);
      });
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
    setAlbumImg(details.images[0]?.url);
    setArtists(details.artists.map((artist) => artist.name).join(", "));
    const ids = [];
    details.artists.map((artist) => ids.push(artist.id));
    setArtistIds(ids);
    setReleaseDate(details.release_date);
    getAlbumTracks();
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
    artistIds,
    releaseDate,
    tracks,
    albumTracks,
    albumLength,
  };
};

export default useAlbum;
