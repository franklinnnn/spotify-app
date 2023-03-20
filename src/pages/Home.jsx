import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../components/Menu";
import Receipt from "../components/Receipt";
import { getUserTopItems, getUserProfile } from "../util/spotify";

const Home = ({ setToken, token }) => {
  const [list, setList] = useState([]);
  const [type, setType] = useState("tracks");
  const [length, setLength] = useState("short_term");
  const [user, setUser] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);

  const handleGetList = (type, length) => {
    getUserTopItems(type, length);
    setType(type);
    setLength(length);
    setShowReceipt(true);
    console.log(list);
  };

  const getUserTopItems = async (type, length) => {
    axios
      .get(
        `https://api.spotify.com/v1/me/top/${type}?time_range=${length}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setList(response.data.items);
      });
  };

  const getUserProfile = async () => {
    axios
      .get(`https://api.spotify.com/v1/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.display_name);
      });
  };

  useEffect(() => {
    getUserProfile();
    getUserTopItems(type, length);
    setType(type);
    setLength(length);
    setShowReceipt(true);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
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
