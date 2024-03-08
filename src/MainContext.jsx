import React, { createContext, useState } from "react";

export const MainContext = createContext("");

const MainProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [type, setType] = useState("tracks");
  const [length, setLength] = useState("short_term");
  const [showDetails, setShowDetails] = useState(false);
  const [cardHand, setCardHand] = useState("fanned");

  const [loading, setLoading] = useState(false);

  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
        list,
        setList,
        type,
        setType,
        length,
        setLength,
        showDetails,
        setShowDetails,
        cardHand,
        setCardHand,
        loading,
        setLoading,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
