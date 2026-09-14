import React from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

export interface BentoSkeletonProps {
  className?: string;
  count?: number;
  layout?: "grid" | "dashboard" | "columns";
}

const skeletonVariants: any = {
  hidden: { opacity: 0, scale: 0.98, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: -10,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

const cardItemVariants: any = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

export const BentoSkeleton: React.FC<BentoSkeletonProps> = React.memo(({
  className,
  layout = "grid",
}) => {
  return (
    <motion.div
      variants={skeletonVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        "w-full h-full p-3 sm:p-5 flex flex-col justify-start gap-4 sm:gap-5 select-none pointer-events-none overflow-hidden relative",
        className
      )}
    >
      {/* Shimmer Light Bar Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-[10px]">
        <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 dark:via-cyan-400/10 to-transparent -skew-x-12 animate-[shimmer_1.4s_infinite_linear]" />
      </div>

      {/* Top Banner Skeleton Header (Matches SectionHeader layout) */}
      <motion.div
        variants={cardItemVariants}
        className="w-full flex items-center justify-between p-4 sm:p-5 rounded-[10px] bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 backdrop-blur-md shadow-xs"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[14px] bg-slate-300/60 dark:bg-slate-800/80 border border-slate-300/80 dark:border-slate-700/80 shrink-0 animate-pulse" />
          <div className="space-y-2">
            <div className="w-36 sm:w-52 h-5 rounded-md bg-slate-300/70 dark:bg-slate-700/70 animate-pulse" />
            <div className="w-24 sm:w-36 h-3.5 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-20 h-7 rounded-full bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
          <div className="w-28 h-7 rounded-full bg-slate-300/70 dark:bg-slate-700/70 animate-pulse" />
        </div>
      </motion.div>

      {/* Grid Cards Skeleton */}
      {layout === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full flex-1">
          {/* Card 1 - Large / Featured */}
          <motion.div
            variants={cardItemVariants}
            className="col-span-1 md:col-span-2 rounded-[10px] p-5 sm:p-6 bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="w-20 h-3 rounded bg-blue-500/40 dark:bg-cyan-400/30 animate-pulse" />
                <div className="w-48 sm:w-64 h-6 rounded-lg bg-slate-300/70 dark:bg-slate-700/70 animate-pulse" />
              </div>
              <div className="w-9 h-9 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
            </div>
            <div className="space-y-2 py-2">
              <div className="w-full h-3.5 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
              <div className="w-4/5 h-3.5 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
              <div className="w-2/3 h-3.5 rounded bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
              <div className="w-16 h-6 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
              <div className="w-20 h-6 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
              <div className="w-14 h-6 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={cardItemVariants}
            className="col-span-1 rounded-[10px] p-5 sm:p-6 bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="w-28 h-5 rounded-lg bg-slate-300/70 dark:bg-slate-700/70 animate-pulse" />
              <div className="w-8 h-8 rounded-full bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
            </div>
            <div className="space-y-2.5">
              <div className="w-full h-3 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
              <div className="w-5/6 h-3 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
              <div className="w-3/4 h-3 rounded bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
            </div>
            <div className="w-full h-8 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={cardItemVariants}
            className="col-span-1 rounded-[10px] p-5 sm:p-6 bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div className="space-y-2">
              <div className="w-24 h-4 rounded bg-slate-300/70 dark:bg-slate-700/70 animate-pulse" />
              <div className="w-full h-3 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-14 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
              <div className="h-14 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            variants={cardItemVariants}
            className="col-span-1 md:col-span-2 rounded-[10px] p-5 sm:p-6 bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="w-40 h-5 rounded-lg bg-slate-300/70 dark:bg-slate-700/70 animate-pulse" />
              <div className="w-20 h-5 rounded-full bg-indigo-500/20 dark:bg-indigo-400/20 animate-pulse" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="h-16 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
              <div className="h-16 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
              <div className="h-16 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
});

BentoSkeleton.displayName = "BentoSkeleton";

export default BentoSkeleton;
