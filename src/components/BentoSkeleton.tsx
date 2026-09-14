import React, { useMemo } from "react";
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
      staggerChildren: 0.05,
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
    transition: { duration: 0.22, ease: "easeOut" },
  },
};

// Shimmer configs with variable intensities and animation rates for dynamic placeholder depth
interface ItemShimmerConfig {
  shimmerOpacityLight: string;
  shimmerOpacityDark: string;
  shimmerDuration: string;
  shimmerDelay: string;
  pulseDuration: string;
  accentOpacity: string;
  tiltAngle: string;
}

const BASE_SHIMMER_CONFIGS: ItemShimmerConfig[] = [
  {
    shimmerOpacityLight: "via-white/35",
    shimmerOpacityDark: "via-cyan-400/25",
    shimmerDuration: "1.3s",
    shimmerDelay: "0s",
    pulseDuration: "1.4s",
    accentOpacity: "bg-blue-500/35 dark:bg-cyan-400/30",
    tiltAngle: "-skew-x-12",
  },
  {
    shimmerOpacityLight: "via-white/20",
    shimmerOpacityDark: "via-purple-400/20",
    shimmerDuration: "1.8s",
    shimmerDelay: "0.2s",
    pulseDuration: "1.9s",
    accentOpacity: "bg-purple-500/30 dark:bg-purple-400/25",
    tiltAngle: "-skew-x-6",
  },
  {
    shimmerOpacityLight: "via-white/40",
    shimmerOpacityDark: "via-emerald-400/30",
    shimmerDuration: "1.5s",
    shimmerDelay: "0.4s",
    pulseDuration: "1.6s",
    accentOpacity: "bg-emerald-500/35 dark:bg-emerald-400/30",
    tiltAngle: "-skew-x-15",
  },
  {
    shimmerOpacityLight: "via-white/25",
    shimmerOpacityDark: "via-pink-400/20",
    shimmerDuration: "2.1s",
    shimmerDelay: "0.15s",
    pulseDuration: "2.2s",
    accentOpacity: "bg-pink-500/30 dark:bg-pink-400/25",
    tiltAngle: "-skew-x-9",
  },
  {
    shimmerOpacityLight: "via-white/30",
    shimmerOpacityDark: "via-amber-400/25",
    shimmerDuration: "1.6s",
    shimmerDelay: "0.35s",
    pulseDuration: "1.7s",
    accentOpacity: "bg-amber-500/35 dark:bg-amber-400/30",
    tiltAngle: "-skew-x-12",
  },
  {
    shimmerOpacityLight: "via-white/22",
    shimmerOpacityDark: "via-indigo-400/20",
    shimmerDuration: "1.9s",
    shimmerDelay: "0.5s",
    pulseDuration: "2.0s",
    accentOpacity: "bg-indigo-500/30 dark:bg-indigo-400/25",
    tiltAngle: "-skew-x-8",
  },
];

export const BentoSkeleton: React.FC<BentoSkeletonProps> = React.memo(({
  className,
  layout = "grid",
  count = 4,
}) => {
  // Generate randomized but stable per-render shimmer parameters for each grid item
  const itemConfigs = useMemo(() => {
    return Array.from({ length: Math.max(count, 6) }, (_, idx) => {
      const base = BASE_SHIMMER_CONFIGS[idx % BASE_SHIMMER_CONFIGS.length];
      return base;
    });
  }, [count]);

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
      {/* Global Shimmer Sweep */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-[10px]">
        <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 dark:via-cyan-400/15 to-transparent -skew-x-12 animate-[shimmer_1.6s_infinite_linear]" />
      </div>

      {/* Top Banner Skeleton Header (Matches SectionHeader layout) */}
      <motion.div
        variants={cardItemVariants}
        className="w-full relative overflow-hidden flex items-center justify-between p-4 sm:p-5 rounded-[10px] bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 backdrop-blur-md shadow-xs"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="w-2/3 h-full bg-gradient-to-r from-transparent via-white/30 dark:via-cyan-400/20 to-transparent -skew-x-12 animate-[shimmer_1.4s_infinite_linear]"
            style={{ animationDelay: "0.1s" }}
          />
        </div>
        <div className="flex items-center gap-3 sm:gap-4 relative z-10">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[14px] bg-slate-300/70 dark:bg-slate-800/90 border border-slate-300/80 dark:border-slate-700/80 shrink-0 animate-pulse" />
          <div className="space-y-2">
            <div className="w-36 sm:w-52 h-5 rounded-md bg-slate-300/80 dark:bg-slate-700/80 animate-pulse" />
            <div className="w-24 sm:w-36 h-3.5 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 relative z-10">
          <div className="w-20 h-7 rounded-full bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
          <div className="w-28 h-7 rounded-full bg-slate-300/70 dark:bg-slate-700/70 animate-pulse" />
        </div>
      </motion.div>

      {/* Grid Cards Skeleton with individualized variable shimmer intensities */}
      {layout === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full flex-1">
          {/* Card 1 - Large / Featured */}
          <motion.div
            variants={cardItemVariants}
            className="col-span-1 md:col-span-2 rounded-[10px] p-5 sm:p-6 bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md flex flex-col justify-between space-y-4 shadow-sm relative overflow-hidden"
          >
            {/* Localized Shimmer Bar with unique intensity & tilt */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div 
                className={cn(
                  "w-1/2 h-full bg-gradient-to-r from-transparent to-transparent animate-[shimmer_infinite_linear]",
                  itemConfigs[0].shimmerOpacityLight,
                  itemConfigs[0].shimmerOpacityDark,
                  itemConfigs[0].tiltAngle
                )}
                style={{
                  animationDuration: itemConfigs[0].shimmerDuration,
                  animationDelay: itemConfigs[0].shimmerDelay,
                }}
              />
            </div>

            <div className="flex items-start justify-between relative z-10">
              <div className="space-y-2">
                <div className={cn("w-20 h-3 rounded animate-pulse", itemConfigs[0].accentOpacity)} />
                <div className="w-48 sm:w-64 h-6 rounded-lg bg-slate-300/75 dark:bg-slate-700/75 animate-pulse" />
              </div>
              <div className="w-9 h-9 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
            </div>
            <div className="space-y-2 py-2 relative z-10">
              <div className="w-full h-3.5 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
              <div className="w-4/5 h-3.5 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
              <div className="w-2/3 h-3.5 rounded bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 relative z-10">
              <div className="w-16 h-6 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
              <div className="w-20 h-6 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
              <div className="w-14 h-6 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={cardItemVariants}
            className="col-span-1 rounded-[10px] p-5 sm:p-6 bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md flex flex-col justify-between space-y-4 shadow-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div 
                className={cn(
                  "w-2/3 h-full bg-gradient-to-r from-transparent to-transparent animate-[shimmer_infinite_linear]",
                  itemConfigs[1].shimmerOpacityLight,
                  itemConfigs[1].shimmerOpacityDark,
                  itemConfigs[1].tiltAngle
                )}
                style={{
                  animationDuration: itemConfigs[1].shimmerDuration,
                  animationDelay: itemConfigs[1].shimmerDelay,
                }}
              />
            </div>

            <div className="flex items-center justify-between relative z-10">
              <div className="w-28 h-5 rounded-lg bg-slate-300/70 dark:bg-slate-700/70 animate-pulse" />
              <div className="w-8 h-8 rounded-full bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
            </div>
            <div className="space-y-2.5 relative z-10">
              <div className="w-full h-3 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
              <div className="w-5/6 h-3 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
              <div className="w-3/4 h-3 rounded bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
            </div>
            <div className="w-full h-8 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 animate-pulse relative z-10" />
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={cardItemVariants}
            className="col-span-1 rounded-[10px] p-5 sm:p-6 bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md flex flex-col justify-between space-y-4 shadow-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div 
                className={cn(
                  "w-1/2 h-full bg-gradient-to-r from-transparent to-transparent animate-[shimmer_infinite_linear]",
                  itemConfigs[2].shimmerOpacityLight,
                  itemConfigs[2].shimmerOpacityDark,
                  itemConfigs[2].tiltAngle
                )}
                style={{
                  animationDuration: itemConfigs[2].shimmerDuration,
                  animationDelay: itemConfigs[2].shimmerDelay,
                }}
              />
            </div>

            <div className="space-y-2 relative z-10">
              <div className="w-24 h-4 rounded bg-slate-300/70 dark:bg-slate-700/70 animate-pulse" />
              <div className="w-full h-3 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-2 relative z-10">
              <div className="h-14 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
              <div className="h-14 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            variants={cardItemVariants}
            className="col-span-1 md:col-span-2 rounded-[10px] p-5 sm:p-6 bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md flex flex-col justify-between space-y-4 shadow-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div 
                className={cn(
                  "w-2/3 h-full bg-gradient-to-r from-transparent to-transparent animate-[shimmer_infinite_linear]",
                  itemConfigs[3].shimmerOpacityLight,
                  itemConfigs[3].shimmerOpacityDark,
                  itemConfigs[3].tiltAngle
                )}
                style={{
                  animationDuration: itemConfigs[3].shimmerDuration,
                  animationDelay: itemConfigs[3].shimmerDelay,
                }}
              />
            </div>

            <div className="flex items-center justify-between relative z-10">
              <div className="w-40 h-5 rounded-lg bg-slate-300/70 dark:bg-slate-700/70 animate-pulse" />
              <div className={cn("w-20 h-5 rounded-full animate-pulse", itemConfigs[3].accentOpacity)} />
            </div>
            <div className="grid grid-cols-3 gap-3 relative z-10">
              <div className="h-16 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
              <div className="h-16 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
              <div className="h-16 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
            </div>
          </motion.div>
        </div>
      )}

      {/* Dashboard Layout Skeleton */}
      {layout === "dashboard" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full flex-1">
          {itemConfigs.slice(0, count).map((cfg, idx) => (
            <motion.div
              key={idx}
              variants={cardItemVariants}
              className="rounded-[10px] p-5 bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden flex flex-col justify-between space-y-3"
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div 
                  className={cn(
                    "w-1/2 h-full bg-gradient-to-r from-transparent to-transparent animate-[shimmer_infinite_linear]",
                    cfg.shimmerOpacityLight,
                    cfg.shimmerOpacityDark,
                    cfg.tiltAngle
                  )}
                  style={{ animationDuration: cfg.shimmerDuration, animationDelay: cfg.shimmerDelay }}
                />
              </div>
              <div className="w-1/3 h-4 rounded bg-slate-300/70 dark:bg-slate-700/70 animate-pulse relative z-10" />
              <div className="w-full h-12 rounded-lg bg-slate-200/60 dark:bg-slate-800/60 animate-pulse relative z-10" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Columns Layout Skeleton */}
      {layout === "columns" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full flex-1">
          {itemConfigs.slice(0, count).map((cfg, idx) => (
            <motion.div
              key={idx}
              variants={cardItemVariants}
              className="rounded-[10px] p-5 bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden space-y-3"
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div 
                  className={cn(
                    "w-2/3 h-full bg-gradient-to-r from-transparent to-transparent animate-[shimmer_infinite_linear]",
                    cfg.shimmerOpacityLight,
                    cfg.shimmerOpacityDark,
                    cfg.tiltAngle
                  )}
                  style={{ animationDuration: cfg.shimmerDuration, animationDelay: cfg.shimmerDelay }}
                />
              </div>
              <div className="w-1/2 h-5 rounded bg-slate-300/70 dark:bg-slate-700/70 animate-pulse relative z-10" />
              <div className="w-full h-24 rounded-lg bg-slate-200/60 dark:bg-slate-800/60 animate-pulse relative z-10" />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
});

BentoSkeleton.displayName = "BentoSkeleton";

export default BentoSkeleton;

