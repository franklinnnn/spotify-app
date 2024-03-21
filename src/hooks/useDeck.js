import { useContext, useEffect, useState } from "react";
import { MainContext } from "../MainContext";

const useDeck = () => {
  // const { deck, setDeck } = useContext(MainContext);
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

  // useEffect(() => {
  //   const storedDeck = localStorage.getItem("deck");
  //   if (!storedDeck || storedDeck === null || storedDeck.length < 1) {
  //     localStorage.setItem("deck", JSON.stringify(deck));
  //   }
  //   setList(JSON.parse(localStorage.getItem("deck")));
  // }, []);

  // const addSongToDeck = (song) => {
  //   setDeck((prev) => [...prev, song]);
  // };

  const deleteDeck = () => {
    setDeck([]);
    localStorage.removeItem("deck");
  };

  return { deck, addSongToDeck, deleteDeck };
};

export default useDeck;
