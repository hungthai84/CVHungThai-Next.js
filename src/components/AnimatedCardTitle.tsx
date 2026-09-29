import React, { useMemo } from "react";
import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";

export type ColorPresetType = "emerald" | "indigo" | "purple" | "cyan" | "orange" | "rose" | "blue" | "amber" | "teal" | "auto";

export interface AnimatedCardTitleProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  colorPreset?: ColorPresetType;
  indexForAutoColor?: number;
  actionRight?: React.ReactNode;
  className?: string;
}

const COLOR_PRESETS = [
  {
    name: "emerald",
    iconBg: "bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-emerald-600/25",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    titleColor: "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-300 bg-clip-text text-transparent",
    lineGradient: "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600/20",
    border: "border-emerald-200/60 dark:border-emerald-800/60",
  },
  {
    name: "indigo",
    iconBg: "bg-gradient-to-br from-indigo-500/20 via-blue-500/15 to-indigo-600/25",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    titleColor: "bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-500 dark:from-indigo-400 dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent",
    lineGradient: "bg-gradient-to-r from-indigo-500 via-blue-400 to-indigo-600/20",
    border: "border-indigo-200/60 dark:border-indigo-800/60",
  },
  {
    name: "purple",
    iconBg: "bg-gradient-to-br from-purple-500/20 via-fuchsia-500/15 to-purple-600/25",
    iconColor: "text-purple-600 dark:text-purple-400",
    titleColor: "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-500 dark:from-purple-400 dark:via-fuchsia-300 dark:to-purple-300 bg-clip-text text-transparent",
    lineGradient: "bg-gradient-to-r from-purple-500 via-fuchsia-400 to-purple-600/20",
    border: "border-purple-200/60 dark:border-purple-800/60",
  },
  {
    name: "cyan",
    iconBg: "bg-gradient-to-br from-cyan-500/20 via-sky-500/15 to-cyan-600/25",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    titleColor: "bg-gradient-to-r from-cyan-600 via-sky-600 to-cyan-500 dark:from-cyan-400 dark:via-sky-300 dark:to-cyan-300 bg-clip-text text-transparent",
    lineGradient: "bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-600/20",
    border: "border-cyan-200/60 dark:border-cyan-800/60",
  },
  {
    name: "orange",
    iconBg: "bg-gradient-to-br from-orange-500/20 via-amber-500/15 to-orange-600/25",
    iconColor: "text-orange-600 dark:text-orange-400",
    titleColor: "bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 dark:from-orange-400 dark:via-amber-300 dark:to-orange-300 bg-clip-text text-transparent",
    lineGradient: "bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600/20",
    border: "border-orange-200/60 dark:border-orange-800/60",
  },
  {
    name: "rose",
    iconBg: "bg-gradient-to-br from-rose-500/20 via-pink-500/15 to-rose-600/25",
    iconColor: "text-rose-600 dark:text-rose-400",
    titleColor: "bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 dark:from-rose-400 dark:via-pink-300 dark:to-rose-300 bg-clip-text text-transparent",
    lineGradient: "bg-gradient-to-r from-rose-500 via-pink-400 to-rose-600/20",
    border: "border-rose-200/60 dark:border-rose-800/60",
  },
  {
    name: "blue",
    iconBg: "bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-blue-600/25",
    iconColor: "text-blue-600 dark:text-blue-400",
    titleColor: "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 dark:from-blue-400 dark:via-indigo-300 dark:to-blue-300 bg-clip-text text-transparent",
    lineGradient: "bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-600/20",
    border: "border-blue-200/60 dark:border-blue-800/60",
  },
  {
    name: "amber",
    iconBg: "bg-gradient-to-br from-amber-500/20 via-yellow-500/15 to-amber-600/25",
    iconColor: "text-amber-600 dark:text-amber-400",
    titleColor: "bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-500 dark:from-amber-400 dark:via-yellow-300 dark:to-amber-300 bg-clip-text text-transparent",
    lineGradient: "bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600/20",
    border: "border-amber-200/60 dark:border-amber-800/60",
  }
];

export function AnimatedCardTitle({
  icon: IconComponent,
  title,
  subtitle,
  colorPreset = "auto",
  indexForAutoColor = 0,
  actionRight,
  className,
}: AnimatedCardTitleProps) {
  const selectedTheme = useMemo(() => {
    if (colorPreset !== "auto") {
      const match = COLOR_PRESETS.find((p) => p.name === colorPreset);
      if (match) return match;
    }
    // Pick based on string hash or index
    const seed = indexForAutoColor + title.length;
    return COLOR_PRESETS[seed % COLOR_PRESETS.length];
  }, [colorPreset, indexForAutoColor, title]);

  return (
    <div className={cn("w-full flex flex-col gap-2 mb-3.5", className)}>
      {/* Upper Title Row */}
      <div className="w-full flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Animated Icon (Không đóng khung icon, kích thước đồng bộ bằng tiêu đề) */}
          <motion.div
            animate={{
              y: [0, -3, 0],
              rotate: [0, 3, -3, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.25, rotate: 10 }}
            className="relative flex items-center justify-center shrink-0 cursor-pointer select-none"
          >
            <IconComponent className={cn("w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.2] drop-shadow-sm transition-transform duration-300", selectedTheme.iconColor)} />
          </motion.div>

          {/* Title Text */}
          <div className="flex flex-col min-w-0">
            <h3 className={cn("text-h6 font-bold tracking-tight font-play truncate", selectedTheme.titleColor)}>
              {title}
            </h3>
            {subtitle && (
              <span className="text-3xs sm:text-2xs font-semibold text-slate-500 dark:text-slate-400 truncate">
                {subtitle}
              </span>
            )}
          </div>
        </div>

        {actionRight && <div className="shrink-0">{actionRight}</div>}
      </div>

      {/* Dynamic Colored Gradient Line Below */}
      <div className={cn("h-[2px] sm:h-[2.5px] w-full rounded-full shadow-2xs transition-all duration-300", selectedTheme.lineGradient)} />
    </div>
  );
}
