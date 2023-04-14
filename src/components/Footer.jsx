import React from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Footer = () => {
  const year = new Date().getFullYear();

  const pageMenu = {
    hidden: {
      y: 10,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        mass: 0.5,
        delay: 0.5,
      },
    },
  };
  return (
    <AnimatePresence>
      <motion.div
        className="flex justify-center mt-6 mb-2 w-full px-4 text-xs  text-slate-400"
        variants={pageMenu}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {year}
        <span className="mx-4">
          Cardify made by{" "}
          <a
            href="https://franklinnn.com"
            target="_blank"
            className="text-slate-200 hover:text-primary"
          >
            Franklin Assa
          </a>
        </span>
        <span className="flex mx-6 gap-4">
          <NavLink to="/" className="text-slate-200 hover:text-primary">
            Home
          </NavLink>
          |
          <NavLink to="/about" className="text-slate-200 hover:text-primary">
            About
          </NavLink>
        </span>
      </motion.div>
    </AnimatePresence>
  );
};

export default Footer;
