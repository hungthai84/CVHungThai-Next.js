import React, { ReactNode } from "react";
import { motion, Variants } from "motion/react";
import { cn } from "../lib/utils";

export const industrialContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

export const industrialSubSectionVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

interface IndustrialSubSectionProps {
  children?: ReactNode;
  className?: string;
  hasIndustrialAccent?: boolean;
  [key: string]: any;
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
      className={cn("w-full", hasIndustrialAccent && "relative", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default IndustrialSubSection;
