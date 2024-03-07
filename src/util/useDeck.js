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

  const deleteDeck = () => {
    setDeck([]);
    localStorage.removeItem("deck");
  };

  return { deck, addSongToDeck, deleteDeck };
};

export default useDeck;
