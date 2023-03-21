import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../components/Menu";
import Receipt from "../components/Receipt";
import { getUserTopItems, getUserProfile } from "../util/spotify";

const Home = ({ setToken }) => {
  const [list, setList] = useState([]);
  const [type, setType] = useState("tracks");
  const [length, setLength] = useState("short_term");
  const [user, setUser] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);

  const handleGetList = async (type, length) => {
    setType(type);
    setLength(length);
    getUserTopItems(type, length).then(setList);
    setShowReceipt(true);
    console.log(`type: ${type}, length: ${length}`);
  };

  useEffect(() => {
    getUserProfile().then(setUser);
    setType(type);
    setLength(length);
    getUserTopItems(type, length);
    setShowReceipt(true);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    const url = "https://accounts.spotify.com/en/status";
    const logoutWindow = window.open(
      url,
      "Spotify Logout",
      "width=700, height=500, top=40, left=40"
    );
    setTimeout(() => logoutWindow.close(), 2000);
  };

  return (
    <div className="flex flex-col items-center h-full w-[24rem] my-4 ">
      <div className="flex w-full bg-slate-800 p-2 justify-between items-center capitalize rounded-t-sm">
        <div className="flex flex-col capitalize text-sm">
          <span>Receiptify Not really</span>
          <span className="text-xs">top track generator</span>
        </div>
        <button
          className="text-xs capitalize bg-slate-900 p-2 rounded hover:bg-slate-600"
          onClick={logout}
        >
          logout
        </button>
      </div>
      <Menu type={type} length={length} handleGetList={handleGetList} />
      {showReceipt && (
        <Receipt list={list} type={type} length={length} user={user} />
      )}
    </div>
  );
};

export default Home;
