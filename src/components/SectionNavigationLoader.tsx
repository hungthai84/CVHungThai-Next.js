import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { LucideIcon, Sparkles } from "lucide-react";
import BentoSkeleton from "./BentoSkeleton";

export interface ThemeGradientConfig {
  gradient: string;
  glowColor: string;
  ambientColor: string;
  sparkColor: string;
  twGradient: string;
  accentText: string;
  trackBg: string;
  trackBorder: string;
}

export function getThemeGradientConfig(theme: string): ThemeGradientConfig {
  switch (theme) {
    case "glass-dark-neon":
      return {
        gradient: "linear-gradient(90deg, #00F5FF 0%, #FF007F 50%, #8B5CF6 100%)",
        glowColor: "rgba(0, 245, 255, 0.7)",
        ambientColor: "rgba(255, 0, 127, 0.4)",
        sparkColor: "#00F5FF",
        twGradient: "from-[#00F5FF] via-[#FF007F] to-[#8B5CF6]",
        accentText: "text-[#00F5FF]",
        trackBg: "bg-slate-900/60 dark:bg-[#060a16]/80",
        trackBorder: "border-cyan-500/20",
      };
    case "mritech-digital-growth":
      return {
        gradient: "linear-gradient(90deg, #10B981 0%, #06B6D4 50%, #3B82F6 100%)",
        glowColor: "rgba(16, 185, 129, 0.7)",
        ambientColor: "rgba(6, 182, 212, 0.4)",
        sparkColor: "#10B981",
        twGradient: "from-emerald-400 via-cyan-500 to-blue-500",
        accentText: "text-emerald-500 dark:text-emerald-400",
        trackBg: "bg-slate-100/70 dark:bg-slate-900/70",
        trackBorder: "border-emerald-500/20",
      };
    case "fintech-soft-glass":
      return {
        gradient: "linear-gradient(90deg, #2563EB 0%, #6366F1 50%, #FB923C 100%)",
        glowColor: "rgba(37, 99, 235, 0.7)",
        ambientColor: "rgba(251, 146, 60, 0.4)",
        sparkColor: "#3B82F6",
        twGradient: "from-blue-600 via-indigo-500 to-orange-400",
        accentText: "text-blue-600 dark:text-blue-400",
        trackBg: "bg-slate-100/70 dark:bg-slate-900/70",
        trackBorder: "border-blue-500/20",
      };
    case "glass-soft-clay":
      return {
        gradient: "linear-gradient(90deg, #5850EC 0%, #7C3AED 50%, #FF8A65 100%)",
        glowColor: "rgba(124, 58, 237, 0.7)",
        ambientColor: "rgba(255, 138, 101, 0.4)",
        sparkColor: "#8B5CF6",
        twGradient: "from-indigo-500 via-purple-600 to-rose-400",
        accentText: "text-purple-600 dark:text-purple-400",
        trackBg: "bg-purple-950/20 dark:bg-slate-900/70",
        trackBorder: "border-purple-500/20",
      };
    default:
      return {
        gradient: "linear-gradient(90deg, #00F5FF 0%, #FF007F 50%, #8B5CF6 100%)",
        glowColor: "rgba(0, 245, 255, 0.7)",
        ambientColor: "rgba(255, 0, 127, 0.4)",
        sparkColor: "#00F5FF",
        twGradient: "from-[#00F5FF] via-[#FF007F] to-[#8B5CF6]",
        accentText: "text-cyan-400",
        trackBg: "bg-slate-900/60",
        trackBorder: "border-cyan-500/20",
      };
  }
}

/**
 * Top-rim progress bar attached to the header or main card container
 * Animated smoothly during section navigation.
 */
export interface SectionProgressBarProps {
  isLoading: boolean;
  progress?: number; // 0 to 100
  theme?: string;
  className?: string;
}

export const SectionProgressBar: React.FC<SectionProgressBarProps> = ({
  isLoading,
  progress = 0,
  theme = "glass-dark-neon",
  className,
}) => {
  const themeConfig = getThemeGradientConfig(theme);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="section-top-progress-bar"
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -2 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute top-0 left-0 right-0 z-40 h-[3.5px] w-full overflow-hidden pointer-events-none rounded-t-2xl",
            className
          )}
        >
          {/* Subtle track background */}
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm" />

          {/* Animated fill bar */}
          <motion.div
            className="h-full relative transition-all"
            style={{
              background: themeConfig.gradient,
              boxShadow: `0 0 14px ${themeConfig.glowColor}, 0 0 28px ${themeConfig.ambientColor}`,
              width: `${Math.min(100, Math.max(8, progress))}%`,
            }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.28 }}
          >
            {/* Travelling specular highlight (light sweep) */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent w-full"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
              }}
            />

            {/* Glowing head spark particle */}
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: `0 0 10px 3px ${themeConfig.sparkColor}, 0 0 18px 5px ${themeConfig.ambientColor}`,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Detailed, visually engaging loading animation for section navigation
 * Replaces the simple spinner with an informative holographic glass card,
 * dynamic theme-gradient progress bar, section icon aura, and live percentage.
 */
export interface SectionNavigationLoaderProps {
  theme?: string;
  targetSectionTitle?: string;
  targetSectionSubtitle?: string;
  TargetIcon?: LucideIcon;
  lang?: "vi" | "en";
  progress?: number;
}

export const SectionNavigationLoader: React.FC<SectionNavigationLoaderProps> = ({
  theme = "glass-dark-neon",
  targetSectionTitle = "Đang tải dữ liệu...",
  targetSectionSubtitle,
  TargetIcon = Sparkles,
  lang = "vi",
  progress: externalProgress,
}) => {
  const themeConfig = getThemeGradientConfig(theme);
  const [internalProgress, setInternalProgress] = useState(externalProgress ?? 18);

  useEffect(() => {
    if (typeof externalProgress === "number") {
      setInternalProgress(externalProgress);
      return;
    }

    // Auto-advance progress animation smoothly if no external progress provided
    const timer1 = setTimeout(() => setInternalProgress(45), 40);
    const timer2 = setTimeout(() => setInternalProgress(78), 120);
    const timer3 = setTimeout(() => setInternalProgress(96), 220);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [externalProgress]);

  const displayProgress = typeof externalProgress === "number" ? externalProgress : internalProgress;

  return (
    <div className="relative w-full h-full min-h-[460px] flex flex-col items-center justify-center overflow-hidden p-4 sm:p-6 select-none">
      {/* Background Bento Skeleton layer to preserve layout rhythm */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30 pointer-events-none filter blur-[1.5px] scale-[0.99] transition-opacity">
        <BentoSkeleton count={4} />
      </div>

      {/* Floating Center Holographic Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -12 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "relative z-20 flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl",
          "w-full max-w-[380px] sm:max-w-[420px]",
          "backdrop-blur-2xl border shadow-2xl transition-all",
          theme === "glass-dark-neon"
            ? "bg-[#080d1e]/85 border-cyan-500/30 text-white shadow-[0_24px_60px_rgba(0,0,0,0.6),0_0_36px_rgba(0,245,255,0.18)]"
            : "bg-white/85 dark:bg-slate-900/85 border-white/60 dark:border-slate-800/80 text-slate-800 dark:text-slate-100 shadow-[0_24px_50px_rgba(15,23,42,0.12),0_0_30px_rgba(0,0,0,0.06)]"
        )}
      >
        {/* Ambient Gradient Halo behind Icon */}
        <div className="relative mb-5 flex items-center justify-center">
          <motion.div
            className="absolute -inset-4 rounded-full filter blur-xl opacity-60 pointer-events-none"
            style={{
              background: themeConfig.gradient,
            }}
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut",
            }}
          />

          {/* Section Icon Frame */}
          <div
            className={cn(
              "relative z-10 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center",
              "border backdrop-blur-xl shadow-lg transition-transform",
              theme === "glass-dark-neon"
                ? "bg-[#0b142c]/90 border-cyan-400/40 text-cyan-300 shadow-[0_0_20px_rgba(0,245,255,0.25)]"
                : "bg-white/90 dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 shadow-md",
              themeConfig.accentText
            )}
          >
            <TargetIcon className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.8] animate-pulse" />
          </div>
        </div>

        {/* Section Title */}
        <div className="space-y-1 mb-6">
          <motion.h3
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            {targetSectionTitle}
          </motion.h3>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
            {targetSectionSubtitle ||
              (lang === "vi"
                ? "Đang khởi tạo giao diện & dữ liệu chuyên sâu..."
                : "Loading section modules & interactive experience...")}
          </p>
        </div>

        {/* The Theme-Matching Gradient Progress Bar */}
        <div className="w-full space-y-2.5">
          {/* Progress track */}
          <div
            className={cn(
              "w-full h-2.5 sm:h-3 rounded-full p-[2px] border overflow-hidden relative shadow-inner",
              themeConfig.trackBg,
              themeConfig.trackBorder
            )}
          >
            <motion.div
              className="h-full rounded-full relative overflow-hidden transition-all"
              style={{
                width: `${Math.min(100, Math.max(12, displayProgress))}%`,
                background: themeConfig.gradient,
                boxShadow: `0 0 12px ${themeConfig.glowColor}, 0 0 20px ${themeConfig.ambientColor}`,
              }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
            >
              {/* Internal travelling light beam */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent w-full"
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.1,
                  ease: "easeInOut",
                }}
              />

              {/* Glowing spark head */}
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                style={{
                  backgroundColor: "#ffffff",
                  boxShadow: `0 0 8px 2px ${themeConfig.sparkColor}`,
                }}
              />
            </motion.div>
          </div>

          {/* Micro-Readout Footer */}
          <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-slate-400 dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-sans">
              <span
                className="w-1.5 h-1.5 rounded-full animate-ping"
                style={{ backgroundColor: themeConfig.sparkColor }}
              />
              <span className="font-medium text-slate-600 dark:text-slate-300">
                {displayProgress < 50
                  ? lang === "vi"
                    ? "Đang kết nối tài nguyên"
                    : "Fetching components"
                  : displayProgress < 90
                  ? lang === "vi"
                    ? "Chuẩn bị thành phần"
                    : "Mounting layout"
                  : lang === "vi"
                  ? "Sẵn sàng hiển thị"
                  : "Finalizing"}
              </span>
            </span>

            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {Math.round(displayProgress)}%
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionNavigationLoader;
