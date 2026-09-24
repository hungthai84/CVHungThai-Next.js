import React from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "../lib/utils";

/**
 * Industrial-grade motion variants providing precision mechanical timing,
 * depth layering, and staggered cascading entrance for sub-sections.
 */
export const industrialContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
      when: "beforeChildren",
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
      duration: 0.2,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

export const industrialSubSectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.985,
    filter: "blur(4px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 340,
      damping: 26,
      mass: 0.85,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.985,
    filter: "blur(3px)",
    transition: {
      duration: 0.18,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export interface IndustrialStaggerContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function IndustrialStaggerContainer({
  children,
  className,
  delay = 0.04,
  staggerDelay = 0.08,
  ...props
}: IndustrialStaggerContainerProps) {
  const customContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
        duration: 0.18,
      },
    },
  };

  return (
    <motion.div
      variants={customContainerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className={cn("w-full relative flex flex-col gap-4 sm:gap-6", className)}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}

export interface IndustrialSubSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hasIndustrialAccent?: boolean;
}

export function IndustrialSubSection({
  children,
  className,
  hasIndustrialAccent = false,
  ...props
}: IndustrialSubSectionProps) {
  return (
    <motion.div
      variants={industrialSubSectionVariants}
      className={cn(
        "w-full relative transition-shadow duration-300",
        hasIndustrialAccent && "before:absolute before:top-0 before:left-0 before:w-2 before:h-2 before:border-t-2 before:border-l-2 before:border-cyan-400/70 before:rounded-tl-sm after:absolute after:bottom-0 after:right-0 after:w-2 after:h-2 after:border-b-2 after:border-r-2 after:border-cyan-400/70 after:rounded-br-sm",
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}

export default IndustrialStaggerContainer;
