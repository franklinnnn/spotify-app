export const pageMenu = {
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

export const drawFannedInitial = { opacity: 0, translateY: 150 };
export const drawFannedAnimate = { opacity: 1, translateY: 0 };
export const drawFannedExit = { opacity: 0, translateY: 150 };
export const transition = (index) => {
  return {
    type: "spring",
    duration: 0.1,
    delay: index * 0.1,
  };
};
export const cardHover = {
  scale: 1.25,
  transition: { type: "spring", duration: 0.05 },
};

export const dealFannedAnimation = (index) => {
  if (index === 0) {
    return {
      initial: { ...drawFannedInitial, rotate: "-24deg" },
      animate: {
        ...drawFannedAnimate,
        transition: { ...transition(index) },
      },
      exit: { ...drawFannedExit },
      whileHover: { ...cardHover },
    };
  }
  if (index === 1) {
    return {
      initial: {
        ...drawFannedInitial,
        rotate: "-16deg",
      },
      animate: {
        ...drawFannedAnimate,
        transition: { ...transition(index) },
      },
      exit: { ...drawFannedExit },
      whileHover: { ...cardHover },
    };
  }
  if (index === 2) {
    return {
      initial: {
        ...drawFannedInitial,
        rotate: "-8deg",
      },
      animate: {
        ...drawFannedAnimate,
        transition: { ...transition(index) },
      },
      exit: { ...drawFannedExit },
      whileHover: { ...cardHover },
    };
  }
  if (index === 3) {
    return {
      initial: {
        ...drawFannedInitial,
        rotate: "0deg",
      },
      animate: {
        ...drawFannedAnimate,
        transition: { ...transition(index) },
      },
      exit: { ...drawFannedExit },
      whileHover: { ...cardHover },
    };
  }
  if (index === 4) {
    return {
      initial: {
        ...drawFannedInitial,
        rotate: "8deg",
      },
      animate: {
        ...drawFannedAnimate,
        transition: { ...transition(index) },
      },
      exit: { ...drawFannedExit },
      whileHover: { ...cardHover },
    };
  }
  if (index === 5) {
    return {
      initial: {
        ...drawFannedInitial,
        rotate: "16deg",
      },
      animate: {
        ...drawFannedAnimate,
        transition: { ...transition(index) },
      },
      exit: { ...drawFannedExit },
      whileHover: { ...cardHover },
    };
  }
  if (index === 6) {
    return {
      initial: {
        ...drawFannedInitial,
        rotate: "24deg",
      },
      animate: {
        ...drawFannedAnimate,
        transition: { ...transition(index) },
      },
      exit: { ...drawFannedExit },
      whileHover: { ...cardHover },
    };
  }
};

export const dealSpreadAnimation = (index) => {
  return {
    initial: {
      opacity: 0,
      x: -150,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", duration: 0.1, delay: index * 0.15 },
    },
    exit: {
      opacity: 0,
    },
    whileHover: { ...cardHover },
  };
};

export const dealDetailViewAnimation = (index) => {
  return {
    initial: {
      opacity: 0,
      y: -150,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", duration: 0.15, delay: index * 0.075 },
    },
    exit: {
      opacity: 0,
    },
    whileHover: { scale: 1.02, transition: { type: "spring", duration: 0.05 } },
  };
};

export const myPlaylistsAnimation = (index) => {
  return {
    initial: {
      opacity: 0,
      x: -150,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", duration: 0.25, delay: index * 0.1 },
    },
    exit: {
      opacity: 0,
    },
    whileHover: { scale: 1.02, transition: { type: "spring", duration: 0.05 } },
  };
};
