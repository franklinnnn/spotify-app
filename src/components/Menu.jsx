import React from "react";

const Menu = ({ type, length, handleGetList }) => {
  return (
    <div className="w-full grid gap-1 p-2 mb-4 text-sm bg-slate-600 rounded-b-sm">
      <div className="grid grid-cols-2">
        <button
          className={
            type === "tracks"
              ? "bg-slate-500"
              : "bg-slate-600 hover:bg-slate-700"
          }
          onClick={() =>
            handleGetList(type !== "tracks" ? "tracks" : type, length)
          }
        >
          Tracks
        </button>
        <button
          className={
            type === "artists"
              ? "bg-slate-500"
              : "bg-slate-600 hover:bg-slate-700"
          }
          onClick={() =>
            handleGetList(type !== "artists" ? "artists" : type, length)
          }
        >
          Artists
        </button>
      </div>
      <div className="grid grid-cols-3">
        <button
          className={
            length === "short_term"
              ? "bg-slate-500"
              : "bg-slate-600 hover:bg-slate-700"
          }
          onClick={() =>
            handleGetList(type, length !== "short_term" ? "short_term" : length)
          }
        >
          Month
        </button>
        <button
          className={
            length === "medium_term"
              ? "bg-slate-500"
              : "bg-slate-600 hover:bg-slate-700"
          }
          onClick={() =>
            handleGetList(
              type,
              length !== "medium_term" ? "medium_term" : length
            )
          }
        >
          6 Months
        </button>
        <button
          className={
            length === "long_term"
              ? "bg-slate-500"
              : "bg-slate-600 hover:bg-slate-700"
          }
          onClick={() =>
            handleGetList(type, length !== "long_term" ? "long_term" : length)
          }
        >
          All Time
        </button>
      </div>
    </div>
  );
};

export default Menu;
