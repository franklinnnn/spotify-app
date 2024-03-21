import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BsDiscFill } from "react-icons/bs";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaCalendar, FaListOl } from "react-icons/fa";

import CardButtons from "./CardButtons";

import useAlbum from "../../hooks/useAlbum";
import { MainContext } from "../../MainContext";
import AlbumTracks from "./AlbumTracks";

const AlbumDetails = ({ cardDetails }) => {
  const {
    albumType,
    album,
    albumImg,
    artists,
    artistIds,
    releaseDate,
    tracks,
    albumTracks,
    albumLength,
  } = useAlbum(cardDetails);
  const { setList, setShowDetails } = useContext(MainContext);
  const [showConfirmRecommend, setShowConfirmRecommend] = useState(false);
  const [showConfirmAddToDeck, setShowConfirmAddToDeck] = useState(false);
  const [cardAdded, setCardAdded] = useState(false);

  const [showAlbumTracks, setShowAlbumTracks] = useState(false);

  const toggleAlbumTracks = () => {
    setShowAlbumTracks((showAlbumTracks) => !showAlbumTracks);
  };

  const navigate = useNavigate();

  const handleGetNewList = () => {
    setShowConfirmRecommend(false);
    setList([]);
    setShowDetails(false);
    navigate(`/recommendations/${artistIds[0]}/${cardDetails.id}`);
  };

  const Tilt = (props) => {
    const { options, ...rest } = props;
    const tilt = useRef(null);
    useEffect(() => {
      VanillaTilt.init(tilt.current, options);
    }, [options]);
    return <div ref={tilt} {...rest} />;
  };

  const container = {
    scale: 1.02,
    speed: 1000,
    perspective: 5000,
    max: 12,
  };

  return (
    <Tilt
      options={container}
      className="group flex justify-center items-start box-border"
      id="card"
    >
      <div
        className="bg-cover bg-center rounded-lg w-[98%] md:w-[30rem] md:max-h-[45rem] hover:cursor-default"
        style={{ backgroundImage: `url(${albumImg})` }}
        role="content container"
      >
        <article
          className="relative bg-gradient-to-t from-black to-transparent backdrop-blur-sm rounded-lg duration-300 group-hover:backdrop-blur-md "
          id="border"
        >
          {/* TOP BAR */}
          <header className="relative flex justify-between px-2 py-1 z-10">
            <span
              className="uppercase flex items-center gap-2 pl-1 pr-2 rounded-md font-num text-2xl  bg-slate-500/[0.6] ease-in-out duration-300 group-hover:scale-110 group-hover:translate-x-[-0.5rem] group-hover:translate-y-[-0.2rem] group-hover:shadow-[0_0.2rem_1rem_0_rgba(0,0,0,0.5)]"
              id="top"
            >
              <span className="text-lg">
                <BsDiscFill />
              </span>
              {albumType}
            </span>
            <span
              className="flex items-center gap-2 pl-1 pr-2 rounded-md font-num text-2xl  bg-slate-500/[0.6] ease-in-out duration-300 group-hover:scale-110 group-hover:translate-x-[0.5rem] group-hover:translate-y-[-0.2rem] group-hover:shadow-[0_0.2rem_1rem_0_rgba(0,0,0,0.5)]"
              id="top"
            >
              <span className="text-lg">
                <FaCalendar />
              </span>
              {releaseDate.substring(0, 4)}
            </span>
          </header>

          {/* IMAGE */}
          <section className="flex justify-center items-center py-2 ease-in-out duration-500 group-hover:translate-y-[0.4rem] group-hover:scale-105">
            <img
              src={albumImg}
              alt="cover"
              className="w-5/6 h-5/6 object-cover ease-in-out duration-700 group-hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)]"
              id="img"
            />
          </section>

          {/* ALBUM INFO */}
          <section className=" px-4 flex flex-col justify-between mb-6">
            <div className="flex flex-col w-full h-full px-4 font-disp ease-in-out duration-500 group-hover:translate-y-2 group-hover:z-10 group-hover:scale-105 ">
              <span className="text-center text-4xl mt-4 mb-2 truncate">
                {album}
              </span>
              <div
                className="flex flex-col gap-2 text-2xl text-slate-300 items-center border-b-[1px]
               border-slate-500/20 pb-4"
              >
                <span className="text-center ">{artists}</span>
                <span className="text-base text-center text-slate-400">
                  {releaseDate}
                </span>
              </div>
            </div>

            {showAlbumTracks && <AlbumTracks list={albumTracks} />}
            <div className="flex justify-evenly text-slate-200 text-3xl mt-4 mb-8">
              <div
                onClick={toggleAlbumTracks}
                className="flex items-center justify-center gap-2 w-24 p-1 rounded-md font-num  bg-slate-500/[0.4] ease-in-out duration-300 group-hover:shadow-[0_0.2rem_1rem_0_rgba(0,0,0,0.5)] hover:cursor-pointer"
                id="stat"
                title="Tracks"
              >
                <span className="text-[1.4rem]">
                  <FaListOl />
                </span>

                <span>{tracks}</span>
              </div>
              <div
                className="flex items-center justify-center gap-2 w-24 p-1 rounded-md font-num  bg-slate-500/[0.4] ease-in-out duration-300 group-hover:shadow-[0_0.2rem_1rem_0_rgba(0,0,0,0.5)]"
                id="stat"
                title="Length"
              >
                <span className="text-lg">
                  <MdAccessTimeFilled />
                </span>
                <span>{albumLength}</span>
              </div>
            </div>
          </section>

          <footer className="pt-8">
            <CardButtons
              cardDetails={cardDetails}
              setShowConfirmRecommend={setShowConfirmRecommend}
              setShowConfirmAddToDeck={setShowConfirmAddToDeck}
              //   isFollowed={isFollowed}
            />
          </footer>
          <ConfirmRecommend
            showConfirmRecommend={showConfirmRecommend}
            setShowConfirmRecommend={setShowConfirmRecommend}
            name={cardDetails.name}
            handleGetNewList={handleGetNewList}
          />
          {/* <ConfirmAddToDeck
            showConfirmAddToDeck={showConfirmAddToDeck}
            setShowConfirmAddToDeck={setShowConfirmAddToDeck}
            tracks={tracks}
          /> */}
          <ConfirmAddedToDeck cardAdded={cardAdded} />
        </article>
      </div>
    </Tilt>
  );
};

const ConfirmRecommend = ({
  showConfirmRecommend,
  setShowConfirmRecommend,
  name,
  handleGetNewList,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className={`absolute left-0 bottom-0 flex flex-col w-full bg-gradient-to-t from-black to-transparent text-sm px-4 py-2 gap-2 rounded-b-sm ${
          showConfirmRecommend ? "block" : "hidden"
        }`}
        id="confirm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
      >
        <span className="text-center">
          Get new cards related to <span className="font-bold">{name}</span>?
        </span>
        <div className="flex justify-center gap-2 text-white">
          <button
            className="px-2  rounded-sm bg-slate-800/60 hover:bg-slate-500"
            onClick={handleGetNewList}
          >
            Yes
          </button>
          <button
            className="px-2 rounded-sm bg-slate-800/60 hover:bg-slate-500"
            onClick={() => setShowConfirmRecommend(false)}
          >
            No
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// const ConfirmAddToDeck = ({
//   showConfirmAddToDeck,
//   setShowConfirmAddToDeck,
//   tracks,
// }) => {
//   return (
//     <AnimatePresence>
//       <motion.div
//         className={`absolute left-0 bottom-0 flex flex-col w-full bg-gradient-to-t from-black to-transparent text-sm px-4 py-2 gap-2 rounded-b-sm ${
//           showConfirmAddToDeck ? "block" : "hidden"
//         }`}
//         id="confirm"
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 10 }}
//       >
//         <div className="text-center">
//           Add <span className="font-bold">{tracks}</span> cards to deck?
//         </div>
//         <div className="flex justify-center gap-2 text-white">
//           <button
//             className="px-2  rounded-sm bg-slate-800/60 hover:bg-slate-500"
//             onClick={handleAddTracksToDeck}
//           >
//             Yes
//           </button>
//           <button
//             className="px-2 rounded-sm bg-slate-800/60 hover:bg-slate-500"
//             onClick={() => setShowConfirmAddToDeck(false)}
//           >
//             No
//           </button>
//         </div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

const ConfirmAddedToDeck = ({ cardAdded }) => {
  return (
    <AnimatePresence>
      <motion.div
        className={`absolute left-0 bottom-0 flex flex-col w-full bg-gradient-to-t from-black to-transparent text-sm px-4 py-6 gap-2 ${
          cardAdded ? "block" : "hidden"
        }`}
        id="confirm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
      >
        <span className="text-center">Cards saved to deck</span>
      </motion.div>
    </AnimatePresence>
  );
};

// const AlbumTracks = ({ list }) => {
//   const { addSongToDeck } = useDeck();
//   const [cardAdded, setCardAdded] = useState(false);
//   const [isInDeck, setIsInDeck] = useState(false);

//   const handleAddCardToDeck = (item) => {
//     !isInDeck && addSongToDeck(item);

//     toast.success(`Card ${item.name} saved to deck`);
//     setCardAdded(true);
//     setTimeout(() => {
//       setCardAdded(false);
//     }, 1600);
//     setIsInDeck(true);
//   };
//   return (
//     <AnimatePresence>
//       <motion.div
//         className="absolute left-0 top-10 w-full h-[75%] md:h-[35rem] overflow-y-scroll z-20 bg-zinc-800/95 p-2 bg-gradient-to-t from-black to-transparent backdrop-blur-sm"
//         id="tracklist"
//         initial={{ opacity: 1, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 10 }}
//       >
//         <div className="fixed left-0 w-full bg-zinc-800 ">
//           <h1 className="text-2xl text-center font-num uppercase px-1 pb-1 border-b-2 border-zinc-700">
//             Tracklist
//           </h1>
//         </div>
//         <div className="mt-12 flex flex-col justify-between w-full">
//           {list.map((item, index) => {
//             const { bpm, length, energy, trackId, loading } = useTrack(item);
//             return (
//               <div
//                 key={item.id}
//                 className="flex items-start justify-between gap-4 font-mono rounded-md my-2 p-1 w-full border-2 border-zinc-700 "
//               >
//                 <div className="flex gap-4">
//                   <span className="text-sm pl-1 pt-1">{index + 1}</span>
//                   <div>
//                     <div className="flex flex-col mb-1 truncate md:max-w-[500px] text-sm md:text-lg w-full">
//                       <span>{item.name}</span>
//                     </div>
//                     <div className="flex items-center gap-1 md:gap-2 text-sm md:text-base">
//                       <div
//                         className="flex items-center justify-center gap-2 w-[5rem] p-1 rounded-md font-num bg-slate-500/[0.4] ease-in-out duration-300"
//                         // style={statStyle}
//                         title="Tempo"
//                       >
//                         <span className="text-sm md:text-[1.4rem]">
//                           <RiRunFill />
//                         </span>
//                         <span>{loading ? "--" : bpm}</span>
//                       </div>
//                       <div
//                         className="flex items-center justify-center gap-2 w-[5rem] p-1 rounded-md font-num bg-slate-500/[0.4] ease-in-out duration-300"
//                         // style={statStyle}
//                         title="Length"
//                       >
//                         <span className="text-smj md:text-lg">
//                           <MdAccessTimeFilled />
//                         </span>
//                         <span>{loading ? "--" : length}</span>
//                       </div>
//                       <div
//                         className="flex items-center justify-center gap-2 w-[5rem] p-1 rounded-md font-num bg-slate-500/[0.4] ease-in-out duration-300"
//                         // style={statStyle}
//                         title="Energy"
//                       >
//                         <span className="text-sm md:text-lg">
//                           <FaBolt />
//                         </span>
//                         <span>{loading ? "--" : energy}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <button className="relative flex items-center justify-center m-2 group/add">
//                   <div className="absolute right-6 -top-6 z-10 hidden group-hover/add:block bg-zinc-500 text-xs rounded-md w-20 p-1">
//                     {isInDeck ? <p>Card added</p> : <p>Quick add to deck</p>}
//                   </div>
//                   {isInDeck ? (
//                     <AiOutlineCheck size={20} className="text-green-500" />
//                   ) : (
//                     <AiOutlinePlus
//                       onClick={() => {
//                         handleAddCardToDeck(item);
//                       }}
//                       size={20}
//                       className="hover:text-primary"
//                     />
//                   )}
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

export default AlbumDetails;
