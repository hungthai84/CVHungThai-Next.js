import React, { ReactNode } from "react";
import { motion, Variants } from "motion/react";
import { cn } from "../lib/utils";
import { useTheme } from "../context/ThemeContext";
import { 
  bentoStaggerContainerVariants, 
  bentoFloatInCardVariants 
} from "../lib/bentoAnimation";

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
  const { theme } = useTheme();
  const isBento = theme === "soft-floating-bento";

  return (
    <motion.div
      variants={isBento ? bentoFloatInCardVariants : industrialSubSectionVariants}
      className={cn("w-full", hasIndustrialAccent && "relative", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function BentoStaggerContainer({
  children,
  className,
  ...props
}: {
  children?: ReactNode;
  className?: string;
  [key: string]: any;
}) {
  const { theme } = useTheme();
  const isBento = theme === "soft-floating-bento";

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={isBento ? bentoStaggerContainerVariants : industrialContainerVariants}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default IndustrialSubSection;

