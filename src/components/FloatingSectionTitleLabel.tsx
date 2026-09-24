import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { LucideIcon } from "lucide-react";

export interface FloatingSectionTitleLabelProps {
  sectionId: string;
  sectionTitle: string;
  sectionIndex: number;
  totalSections: number;
  Icon?: LucideIcon;
  theme?: string;
  lang?: "vi" | "en";
  className?: string;
}

function getLabelThemeConfig(theme: string) {
  switch (theme) {
    case "glass-dark-neon":
      return {
        gradient: "linear-gradient(90deg, #00F5FF 0%, #FF007F 50%, #8B5CF6 100%)",
        glowColor: "rgba(0, 245, 255, 0.7)",
        sparkColor: "#00F5FF",
        accentText: "text-[#00F5FF]",
      };
    case "mritech-digital-growth":
      return {
        gradient: "linear-gradient(90deg, #10B981 0%, #06B6D4 50%, #3B82F6 100%)",
        glowColor: "rgba(16, 185, 129, 0.7)",
        sparkColor: "#10B981",
        accentText: "text-emerald-500 dark:text-emerald-400",
      };
    case "fintech-soft-glass":
      return {
        gradient: "linear-gradient(90deg, #2563EB 0%, #6366F1 50%, #FB923C 100%)",
        glowColor: "rgba(37, 99, 235, 0.7)",
        sparkColor: "#3B82F6",
        accentText: "text-blue-600 dark:text-blue-400",
      };
    case "glass-soft-clay":
      return {
        gradient: "linear-gradient(90deg, #5850EC 0%, #7C3AED 50%, #FF8A65 100%)",
        glowColor: "rgba(124, 58, 237, 0.7)",
        sparkColor: "#8B5CF6",
        accentText: "text-purple-600 dark:text-purple-400",
      };
    default:
      return {
        gradient: "linear-gradient(90deg, #00F5FF 0%, #FF007F 50%, #8B5CF6 100%)",
        glowColor: "rgba(0, 245, 255, 0.7)",
        sparkColor: "#00F5FF",
        accentText: "text-cyan-400",
      };
  }
}

/**
 * Floating, auto-fading title label positioned at the top-left of the main card container.
 * Automatically appears upon section navigation, remains visible for ~3 seconds for user
 * spatial orientation, then smoothly fades out. Can be re-revealed on mouse hover.
 */
export const FloatingSectionTitleLabel: React.FC<FloatingSectionTitleLabelProps> = ({
  sectionId,
  sectionTitle,
  sectionIndex,
  totalSections,
  Icon,
  theme = "glass-dark-neon",
  lang = "vi",
  className,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const themeConfig = getLabelThemeConfig(theme);

  // Trigger auto-fade on section transition
  useEffect(() => {
    setIsVisible(true);

    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    hideTimerRef.current = setTimeout(() => {
      if (!isHovered) {
        setIsVisible(false);
      }
    }, 3200); // Visible for 3.2s before fading

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [sectionId, isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsVisible(true);
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 1800);
  };

  // Human-readable 2-digit index (e.g. 01 / 14)
  const formattedIndex = String(sectionIndex + 1).padStart(2, "0");
  const formattedTotal = String(totalSections).padStart(2, "0");

  return (
    <div
      className={cn(
        "absolute top-3 left-3 sm:top-4 sm:left-4 z-30 pointer-events-none select-none",
        className
      )}
      aria-live="polite"
      aria-label={`Mục hiện tại: ${sectionTitle}`}
    >
      <AnimatePresence>
        {(isVisible || isHovered) && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, scale: 0.96, filter: "blur(4px)" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
              "pointer-events-auto flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl",
              "border backdrop-blur-xl transition-all duration-300 shadow-lg cursor-default group",
              theme === "glass-dark-neon"
                ? "bg-[#060b18]/85 border-cyan-500/30 text-white shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_16px_rgba(0,245,255,0.15)] hover:border-cyan-400/50"
                : "bg-white/85 dark:bg-slate-900/85 border-slate-200/80 dark:border-slate-800/80 text-slate-800 dark:text-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.08)] hover:border-slate-300 dark:hover:border-slate-700"
            )}
          >
            {/* Ambient theme glow indicator */}
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
              style={{
                backgroundColor: themeConfig.sparkColor,
                boxShadow: `0 0 8px 1px ${themeConfig.glowColor}`,
              }}
            />

            {/* Section Index metadata */}
            <span className="text-[10px] sm:text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 tracking-wider">
              {formattedIndex}
              <span className="opacity-40 mx-0.5">/</span>
              {formattedTotal}
            </span>

            {/* Separator line */}
            <span className="w-px h-3 bg-slate-300 dark:bg-slate-700/80" />

            {/* Section Icon if provided */}
            {Icon && (
              <span
                className={cn(
                  "p-0.5 rounded-md flex items-center justify-center transition-colors",
                  themeConfig.accentText
                )}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
              </span>
            )}

            {/* Dynamic Section Title */}
            <span className="text-xs sm:text-sm font-semibold tracking-tight text-slate-900 dark:text-white truncate max-w-[160px] sm:max-w-[220px]">
              {sectionTitle}
            </span>

            {/* Subtle bottom theme-gradient accent line */}
            <div
              className="absolute bottom-0 left-3 right-3 h-[1.5px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ background: themeConfig.gradient }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingSectionTitleLabel;
