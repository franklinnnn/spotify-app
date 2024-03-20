import { useEffect, useState } from "react";

const useDeck = () => {
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    const storedDeck = localStorage.getItem("deck");
    if (storedDeck) {
      setDeck(JSON.parse(storedDeck));
    }
  }, []);

  const addSongToDeck = (song) => {
    let storedDeck = localStorage.getItem("deck");
    if (!storedDeck || storedDeck === null) {
      let newDeck = [...deck, song];
      localStorage.setItem("deck", JSON.stringify(newDeck));
    }
    const updatedDeck = [...deck, song];
    localStorage.setItem("deck", JSON.stringify(updatedDeck));
  };

  const addSongsToDeck = (songs) => {
    let storedDeck = localStorage.getItem("deck");
    if (!storedDeck || storedDeck === null) {
      console.log("no stored deck, creating new deck");
      console.log(songs);
      let newDeck = [...deck, songs[0]];
      localStorage.setItem("deck", JSON.stringify(newDeck));
      console.log(`new deck created with ${songs.length} cards`);
    }
    songs.map((song) => {
      const updateDeck = [...deck, song];
      localStorage.setItem("deck", JSON.stringify(updateDeck));
    });
  };

  const deleteDeck = () => {
    setDeck([]);
    localStorage.removeItem("deck");
  };

  return { deck, addSongToDeck, addSongsToDeck, deleteDeck };
};

export default useDeck;
