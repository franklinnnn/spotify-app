import { useEffect, useState } from "react";
import { getAudioFeatures } from "../util/spotify";
import { setCardColor } from "../util/color";

const useTrack = (details) => {
  const [artists, setArtists] = useState([]);
  const [artistId, setArtistId] = useState("");
  const [trackId, setTrackId] = useState("");
  const [bpm, setBpm] = useState(0);
  const [ms, setMs] = useState(new Date());
  const [length, setLength] = useState("");
  const [energy, setEnergy] = useState(0);
  const [trackPreview, setTrackPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const getFeatures = () => {
    setLoading(true);
    getAudioFeatures(details.type === "track" && details.id).then((data) => {
      setBpm(Math.round(data.tempo));
      setEnergy(Math.round(data.energy * 100) / 100);
    });
    setLoading(false);
  };

  const getLength = () => {
    const ms = new Date(details.duration_ms);
    setLength(`${ms.getMinutes()}.${ms.getSeconds()}`);
  };

  useEffect(() => {
    setArtists(
      details.artists?.map((artist, index) => (index ? ", " : "") + artist.name)
    );
    setArtistId(details.artists ? details.artists[0].id : null);
    setTrackId(details.id);
    getFeatures();
    getLength();
    setCardColor(details.popularity);
    setTrackPreview(details.preview_url);
  }, [details]);

  //   console.log(
  //     `artists: ${artists}, artistId; ${artistId}, trackId: ${trackId},  bpm: ${bpm}, length: ${length}, energy: ${energy}`
  //   );

  return {
    artists,
    artistId,
    trackId,
    bpm,
    ms,
    length,
    energy,
    trackPreview,
    loading,
  };
};

export default useTrack;
