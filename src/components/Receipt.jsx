import React from "react";
import Artists from "./Artists";
import Tracks from "./Tracks";
import html2canvas from "html2canvas";

const Receipt = ({ list, type, length, user }) => {
  const getDate = () => {
    const date = new Date();
    const weekday = date.toLocaleString("en-us", { weekday: "long" });
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${weekday}, ${month} ${day}, ${year}`;
  };

  const termLength = (length) => {
    if (length === "short_term") {
      return "Last Month";
    }
    if (length === "medium_term") {
      return "6 Months";
    }
    if (length === "long_term") {
      return "All Time";
    }
  };

  const exportImage = async () => {
    const canvas = await html2canvas(document.querySelector("#download"));
    const image = canvas.toDataURL("image/png", 1.0);
    downloadImage(image);
  };

  const downloadImage = (blob) => {
    const link = window.document.createElement("a");
    link.style = "display: none";
    link.download = `${user}-${type}-${length}.jpg`;
    link.href = blob;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link.remove();
  };

  const today = getDate();
  return (
    <>
      <div
        className=" p-4 font-mono bg-paperbg bg-cover text-black w-[22rem]"
        id="download"
      >
        <div className="w-full text-center uppercase my-6">
          <h1 className="text-3xl">Receptify</h1>
          <h2 className="text-xl">{termLength(length)}</h2>
        </div>
        <div className="uppercase">
          <h3 className="text-lg">Recepit #001 for {user}</h3>
          <h3>{today}</h3>
        </div>
        {type === "tracks" ? <Tracks list={list} /> : <Artists list={list} />}
        <div className="flex flex-col uppercase">
          <span>card #: **** **** **** {new Date().getFullYear()}</span>
          <span>AUTH CODE: 1234</span>
          <span>CARDHOLDER: {user}</span>
        </div>
        <div className="flex justify-center uppercase my-6">
          thanks for visiting!
        </div>
      </div>
      <div className="w-full bg-slate-600 py-6 flex justify-center mt-4 mb-10">
        <button
          className="text-xs uppercase bg-slate-700 p-2 rounded hover:bg-slate-900"
          onClick={exportImage}
        >
          download image
        </button>
      </div>
    </>
  );
};

export default Receipt;
