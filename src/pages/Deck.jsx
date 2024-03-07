import { useState } from "react";
import CardsContainer from "../components/CardsContainer";

import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import SavePlaylist from "../components/SavePlaylist";
import useDeck from "../util/useDeck";

const Deck = () => {
  const { deck, deleteDeck } = useDeck();
  const [showSavePlaylist, setShowSavePlaylist] = useState(false);
  const [showDeletePlaylist, setShowDeletePlaylist] = useState(false);

  const type = "tracks";

  const handleDeleteDeck = () => {
    deleteDeck();
    toast.success("Deck deleted");
    setShowDeletePlaylist(false);
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
      <Dialog
        open={showSavePlaylist}
        onClose={() => {
          setShowSavePlaylist(false);
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-slate-500/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel>
            <div className="-mt-12 text-white">
              <SavePlaylist />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <Dialog
        open={showDeletePlaylist}
        onClose={() => {
          setShowDeletePlaylist(false);
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-slate-500/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel>
            <div className="-mt-12 text-white">
              <motion.div
                className="flex flex-col gap-2 p-4 w-[20rem] max-w-[20rem] rounded-md bg-slate-500 shadow-[0_2rem_4rem_1rem_rgba(0,0,0,0.5)] font-mono"
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
                    onClick={() => setShowDeletePlaylist(false)}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <motion.header
        className="relative flex items-center justify-between gap-6 px-6 max-sm:flex-col"
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
            deck?.length < 1 ? "hidden" : "visible"
          } max-sm:justify-center`}
        >
          <button
            className="p-2 rounded-sm bg-slate-700 hover:bg-primary hover:cursor-pointer  max-sm:text-sm"
            onClick={() => setShowSavePlaylist(true)}
          >
            Save to Playlist
          </button>
          <button
            className="p-2 rounded-sm bg-slate-700 hover:bg-primary hover:cursor-pointer  max-sm:text-sm"
            onClick={() => setShowDeletePlaylist(true)}
          >
            Delete Deck
          </button>
        </div>
      </motion.header>
      {deck?.length < 1 ? (
        <div className="text-center mt-6">
          <h1 className="text-2xl">Deck is empty!</h1>{" "}
          <span>Add cards from your top tracks or get recommendations</span>
        </div>
      ) : (
        <CardsContainer list={deck} type={type} />
      )}

      {/* <div>
        <h1 className="text-xl">Test Deck</h1>
        <button
          onClick={() => addSongToDeck(testSong)}
          className="border-2 border-primary px-4 hover:bg-primary"
        >
          Test Add object
        </button>
        <button
          onClick={deleteDeck}
          className="border-2 border-primary px-4 hover:bg-primary"
        >
          Delete Deck
        </button>
      </div> */}
    </section>
  );
};

export default Deck;
