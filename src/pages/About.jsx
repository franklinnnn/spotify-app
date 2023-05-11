import React from "react";
import { motion } from "framer-motion";
import trackCardImg from "../assets/card_track.png";
import artistCardImg from "../assets/card_artist.png";
import deckImg from "../assets/deck.png";

const About = () => {
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
  return (
    <article className="relative w-full my-6 pb-12 max-sm:px-2">
      <motion.div
        className="relative flex flex-col gap-6"
        variants={pageMenu}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <header>
          <h1 className="text-2xl max-sm:text-xl">About Decksio</h1>
          <p className="mb-6">
            SpotiDeck is an app to keep track of your top listened tracks and
            artists, along with your most recently played tracks on Spotify.
          </p>
        </header>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl">Features</h2>
            <p>
              Top tracks and artists can be filtered from the last month, last 6
              months, or all time. Inspired by card collecting and deck building
              games, the hand of tracks and artists are generated 9 at a time.
              Details are are displayed in a card design with colors denoting
              the level of popularity.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl">Recommendations</h2>
            <p>
              A new hand of tracks can be generated through the
              <span className="p-1 mx-1 rounded-sm bg-slate-500/20">
                Get Random Cards
              </span>
              button, or through the
              <span className="p-1 mx-1 rounded-sm bg-slate-500/20">
                Recommend
              </span>
              button in the menu of the detailed card itself.
            </p>
            <p>
              The
              <span className="p-1 mx-1 rounded-sm bg-slate-500/20">
                Get Random Cards
              </span>
              button generates a new hand from a randomly chosen track out of
              50, from a randomly chosen term length &#40;last month, 6 months,
              or all time&#41;. The
              <span className="p-1 mx-1 rounded-sm bg-slate-500/20">
                Recommend
              </span>
              button in the card generates a new hand from that specific card.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl">Deck</h2>
            <img
              src={deckImg}
              alt="deck example image"
              className=" border-2 border-slate-600 rounded-md"
            />
            <p>
              Aside from viewing your top tracks and artists, this app can be
              used to discover new music. Cards from recommendations and your
              top listens can be previewed from the hand, which can then be
              added to a the deck like a playlist. The deck can then be saved to
              an actual playlist on Spotify.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl">Track Card</h2>
            <div className="md:flex gap-4">
              <img
                src={trackCardImg}
                alt="track card example image"
                className="md:w-1/3"
              />
              <p className="md:w-2/3">
                Top icons have the card's type and the popularity. Cover image
                with the track title, artist, and album sits under that. The
                three values denote the track's tempo, length, and energy from
                Spotify's audio analysis metric. The bottom menu has the
                <span className="p-1 rounded-sm bg-slate-500/20">
                  Recommend
                </span>{" "}
                button to generate a new hand of 9 cards, external links to
                Spotify, YouTube, and the option to add the current card to your
                deck.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl">Artist Card</h2>
            <div className="md:flex gap-4">
              <p className="md:w-2/3">
                Icons on the top is the same as the track card with the type and
                popularity. Artist image, then name and genre&#40;s&#41; under
                it. The top four tracks are based on their popularity values,
                and link to their Spotify pages. Artist's latest album can be
                accessed similarly to the tracks. The bottom menu 'Recommend'
                button will generate the artist's related artists. Option to
                follow the artist is here, instead of the 'Add to Deck' button.
              </p>
              <img
                src={artistCardImg}
                alt="artist card example image"
                className="md:w-1/3"
              />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 my-4">
          <h1 className="text-xl">FAQ</h1>
          <div>
            <h2 className="text-lg">Why isn't this working?</h2>
            <p>
              If you have signed in but not seeing anything show up, it maybe
              because you're already signed in on Spotify on the browser. Try
              relogging in, or using a private browser window.
            </p>
          </div>
          <div>
            <h2 className="text-lg">My top lists don't seem right? 🤔</h2>
            <p>
              This app uses purely Spotify's API, so all the data comes from
              Spotify. Unfortunately, Spotify does not provide the actual count
              of how many times a track or an artist was listened to, so we just
              have to trust them on this one.
            </p>
          </div>
          <div>
            <h2 className="text-lg">Why this app?</h2>
            <p>
              At first it was an attempt to see if I could recreate other apps
              that use Spotify's API, like Receiptify. Decided to see what else
              I can access with the Spotify API. I'm not too fond of the way the
              actual Spotify app handles new recommendations, so I'm trying to
              make something that I at least like. Also I wanted access to
              certain song features like tempo, which I use on running
              playlists.
            </p>
          </div>
          <div>
            <h2 className="text-lg">Why cards?</h2>
            <p>I been playing too much Marvel Snap.</p>
          </div>
          <div>
            <h2 className="text-lg">How did you make this?</h2>
            <p>
              <a
                href="https://github.com/franklinnnn/spotify-app"
                target="_blank"
                className="underline hover:text-primary"
              >
                I used React with Vite. Repository can be found here
              </a>
              .
            </p>
          </div>
        </section>
      </motion.div>
    </article>
  );
};

export default About;
