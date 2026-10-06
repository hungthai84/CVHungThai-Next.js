import { Variants } from "motion/react";

/**
 * Framer Motion variants specifically tailored for "Soft Floating Bento" Theme.
 * Delivers a subtle, organic "float-in" entrance with spring physics, scale elevation,
 * soft blur dissolve, and staggered delays for child cards.
 */

export const bentoStaggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

export const bentoFloatInCardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 28, 
    scale: 0.96,
    filter: "blur(8px)" 
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 240,
      mass: 0.85,
    },
  },
  hover: {
    y: -4,
    scale: 1.012,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export const getBentoVariants = (isBento: boolean): { container: Variants; item: Variants } => {
  if (isBento) {
    return {
      container: bentoStaggerContainerVariants,
      item: bentoFloatInCardVariants,
    };
  }

  return {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
          delayChildren: 0.02,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 14 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.35,
          ease: "easeOut",
        },
      },
    },
  };
};
