import React, { useContext, useEffect, useRef, useState } from "react";
import CardsContainer from "../components/CardsContainer";
import { addToPlaylist, createPlaylist } from "../util/spotify";
import { MainContext } from "./Home";
import { ToastContainer, toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

const Deck = () => {
  const { user, deck, setDeck, showDetails, cardDetailsVisible } =
    useContext(MainContext);

  const { saveRef, isSaveComponentVisible, setIsSaveComponentVisible } =
    saveComponentVisible(false);
  const { delRef, isDelComponentVisible, setIsDelComponentVisible } =
    delComponentVisible(false);

  const type = "tracks";

  const uris = deck.map((track) => track.uri);

  const handleSaveToPlaylist = () => {
    createPlaylist(user.id).then((response) => {
      addToPlaylist(response.id, uris);
      console.log(`${deck.length} tracks added to playlist ${response.name}`);
    });
    const notify = () => toast("playlist created successfully!");
    notify();
    setTimeout(() => {
      setIsSaveComponentVisible(false);
    }, 2000);
  };

  const handleDeleteDeck = () => {
    setDeck([]);
    const notify = () => toast("Deck deleted");
    notify();
    setIsDelComponentVisible(false);
  };

  const pageMenu = {
    hidden: {
      x: -10,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        mass: 0.5,
      },
    },
  };

  const confirmBox = {
    hidden: {
      y: -10,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
      },
    },
  };

  return (
    <section className="relative w-full my-6">
      <div className="w-full flex justify-center">
        <div
          className="absolute top-1/3 mx-auto flex justify-center items-center hover:scale-105 ease-in-out duration-300 z-20"
          ref={saveRef}
        >
          <AnimatePresence>
            {isSaveComponentVisible && (
              <motion.div
                className="flex flex-col gap-2 p-4 w-[20rem] max-w-[20rem] rounded-md bg-slate-500 shadow-[0_2rem_4rem_1rem_rgba(0,0,0,0.5)]"
                key={isSaveComponentVisible}
                variants={confirmBox}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <h1 className="text-2xl">Save deck?</h1>
                <span>
                  This will create a new playlist with your saved tracks
                </span>
                <div className="my-2 flex justify-evenly">
                  <button
                    className="p-2 w-1/4 bg-slate-600 hover:bg-primary rounded-sm"
                    onClick={handleSaveToPlaylist}
                  >
                    Save
                  </button>
                  <button
                    className="p-2 w-1/4 bg-slate-600 hover:bg-slate-700 rounded-sm"
                    onClick={() => setIsSaveComponentVisible(false)}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div
          className="absolute top-1/3 mx-auto flex justify-center items-center hover:scale-105 ease-in-out duration-300 z-20"
          ref={delRef}
        >
          <AnimatePresence>
            {isDelComponentVisible && (
              <motion.div
                className="flex flex-col gap-2 p-4 w-[20rem] max-w-[20rem] rounded-md bg-slate-500 shadow-[0_2rem_4rem_1rem_rgba(0,0,0,0.5)]"
                key={isDelComponentVisible}
                variants={confirmBox}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <h1 className="text-2xl">Delete deck?</h1>
                <span>This will clear all tracks saved.</span>
                <div className="my-2 flex justify-evenly">
                  <button
                    className="p-2 w-1/4 bg-slate-600 hover:bg-red-500 rounded-sm"
                    onClick={handleDeleteDeck}
                  >
                    Delete
                  </button>
                  <button
                    className="p-2 w-1/4 bg-slate-600 hover:bg-slate-700 rounded-sm"
                    onClick={() => setIsDelComponentVisible(false)}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.header
        className={`relative flex items-center justify-between gap-6 px-6 ${
          showDetails || isSaveComponentVisible || isDelComponentVisible
            ? "opacity-60 blur-sm pointer-events-none"
            : "opacity-100"
        } max-sm:flex-col`}
        key="header"
        variants={pageMenu}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <h1 className="text-2xl w-1/4 max-sm:text-xl max-sm:w-full max-sm:text-center">
          My Deck
        </h1>

        <div
          className={`w-full  flex justify-end gap-2 ${
            deck.length < 1 ? "hidden" : "visible"
          } max-sm:justify-center`}
        >
          <button
            className="p-2 rounded-sm bg-slate-700 hover:bg-primary hover:cursor-pointer  max-sm:text-sm"
            onClick={() => setIsSaveComponentVisible(true)}
          >
            Save to Playlist
          </button>
          <button
            className="p-2 rounded-sm bg-slate-700 hover:bg-primary hover:cursor-pointer  max-sm:text-sm"
            onClick={() => setIsDelComponentVisible(true)}
          >
            Delete Deck
          </button>
        </div>
      </motion.header>
      {deck.length < 1 ? (
        <div className="text-center mt-6">
          <h1 className="text-2xl">Deck is empty!</h1>{" "}
          <span>Add cards from your top tracks or get recommendations</span>
        </div>
      ) : (
        <CardsContainer
          list={deck}
          type={type}
          isSaveComponentVisible={isSaveComponentVisible}
          isDelComponentVisible={isDelComponentVisible}
        />
      )}

      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="colored"
        limit={1}
      />

      {/* card flip */}
    </section>
  );
};

const saveComponentVisible = (initialVisible) => {
  const [isSaveComponentVisible, setIsSaveComponentVisible] =
    useState(initialVisible);

  const saveRef = useRef();
  const handleClickOutside = (e) => {
    if (saveRef.current && !saveRef.current.contains(e.target)) {
      setIsSaveComponentVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return { saveRef, isSaveComponentVisible, setIsSaveComponentVisible };
};

const delComponentVisible = (initialVisible) => {
  const [isDelComponentVisible, setIsDelComponentVisible] =
    useState(initialVisible);

  const delRef = useRef();
  const handleClickOutside = (e) => {
    if (delRef.current && !delRef.current.contains(e.target)) {
      setIsDelComponentVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return { delRef, isDelComponentVisible, setIsDelComponentVisible };
};

export default Deck;
