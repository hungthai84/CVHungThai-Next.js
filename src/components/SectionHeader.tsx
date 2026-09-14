import React, { useMemo, lazy, Suspense } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { useSection } from "../context/SectionContext";
import { useTheme } from "../context/ThemeContext";
import { Sparkles } from "lucide-react";

// Lazy load 3D banner icon component for performance code-splitting
const BannerIcon3D = lazy(() => import("./BannerIcon3D").then((m) => ({ default: m.BannerIcon3D })));

export interface SectionHeaderProps {
  sectionId?: string;
  title?: string;
  subtitle?: string;
  tag?: string;
  iconType?: string;
  Icon?: React.ComponentType<{ className?: string }>;
  rightContent?: React.ReactNode;
  utilities?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  accentColorClass?: string;
  flat?: boolean;
  gradient?: string;
  glowColor?: string;
  unwrap?: boolean;
  level?: "h1" | "h2" | "h3" | "h4" | "h5";
}

/**
 * Unified Section Header Component
 * Automatically pulls section title, icon, and subtitle from SectionContext if not explicitly provided.
 * Enforces Sentence case typography, glassmorphism styling, and shared element layoutId transitions.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = React.memo(({
  sectionId,
  title: overrideTitle,
  subtitle: overrideSubtitle,
  tag: overrideTag,
  iconType,
  Icon: overrideIcon,
  rightContent,
  utilities,
  children,
  className,
  accentColorClass,
  flat = true,
  level = "h2",
}) => {
  const { theme } = useTheme();
  const sectionCtx = useSection();

  const activeSectionId = sectionId || sectionCtx.activeSection;
  const ctxTitle = sectionCtx ? sectionCtx.getSectionTitle(activeSectionId) : "";
  const ctxSubtitle = sectionCtx ? sectionCtx.getSectionSubtitle(activeSectionId) : "";
  const currentSec = sectionCtx?.sections.find((s) => s.id === activeSectionId) || sectionCtx?.currentSection;

  const rawTitle = overrideTitle || ctxTitle || currentSec?.id || "Section";
  const subtitle = overrideSubtitle || ctxSubtitle || "";
  const IconComponent = overrideIcon || currentSec?.Icon;
  const tag = overrideTag || currentSec?.tag;

  // Format tiêu đề chuẩn Sentence case và giới hạn 4 chữ theo quy định hệ thống
  const formattedTitle = useMemo(() => {
    if (!rawTitle) return "";
    const trimmed = rawTitle.trim();
    const words = trimmed.split(/\s+/);
    const titleWords = words.length > 4 ? words.slice(0, 4).join(" ") : trimmed;
    return titleWords.charAt(0).toUpperCase() + titleWords.slice(1).toLowerCase();
  }, [rawTitle]);

  const colorStyle = accentColorClass || "text-indigo-600 dark:text-cyan-400";
  const hasUtilities = Boolean(rightContent || utilities || children);

  const getGlassStyle = () => {
    if (flat) {
      return "bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 text-slate-900 dark:text-slate-100 shadow-sm backdrop-blur-md";
    }
    switch (theme as any) {
      case "light":
        return "glass-surface backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800/80 text-slate-900 dark:text-white shadow-[0_10px_30px_rgba(59,130,246,0.08)]";
      case "modern-light-glass":
        return "glass-surface backdrop-blur-2xl border border-indigo-200/80 dark:border-white/20 text-slate-900 dark:text-white shadow-[0_16px_40px_rgba(99,102,241,0.14)]";
      case "glass-dark-neon":
      default:
        return "glass-surface backdrop-blur-2xl border border-indigo-400/40 dark:border-cyan-400/40 text-slate-100 dark:text-cyan-50 shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(0,240,255,0.15)]";
    }
  };

  return (
    <motion.div
      layoutId={`section-header-card-${activeSectionId || "default"}`}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative rounded-[10px] py-3.5 px-4 sm:py-4 sm:px-6 overflow-hidden transition-all duration-300 group flex flex-col justify-between w-full mb-4 sm:mb-6 select-none",
        getGlassStyle(),
        className
      )}
    >
      {/* Background Subtle Gradient Glow */}
      {!flat && (
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full blur-[80px] pointer-events-none opacity-30 bg-indigo-500/20 dark:bg-cyan-500/20" />
      )}

      {/* Main Container */}
      <div className="relative z-10 w-full flex flex-col gap-1.5">
        {/* LINE 1: Icon Badge & Section Title & Badge */}
        <div className="w-full flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {/* Shared Element Icon Badge */}
            <motion.div
              layoutId="section-header-icon-badge"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative shrink-0 flex items-center justify-center p-0.5"
            >
              {iconType ? (
                <Suspense fallback={<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[14px] bg-slate-200/50 dark:bg-slate-800/50 animate-pulse" />}>
                  <BannerIcon3D iconType={iconType} className="w-10 h-10 sm:w-12 sm:h-12" />
                </Suspense>
              ) : IconComponent ? (
                <div
                  className={cn(
                    "w-10 h-10 sm:w-12 sm:h-12 rounded-[14px] border flex items-center justify-center transition-all duration-300",
                    flat
                      ? "bg-slate-200/80 dark:bg-slate-800/80 border-slate-300/80 dark:border-slate-700/80 shadow-xs"
                      : "backdrop-blur-md border-indigo-400/40 dark:border-cyan-400/40 shadow-lg bg-gradient-to-tr from-indigo-500/20 to-cyan-400/20",
                    colorStyle
                  )}
                >
                  <IconComponent className={cn("w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]", colorStyle)} />
                </div>
              ) : (
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[14px] bg-indigo-500/10 dark:bg-cyan-400/10 border border-indigo-500/20 dark:border-cyan-400/20 flex items-center justify-center text-indigo-600 dark:text-cyan-400">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              )}
            </motion.div>

            {/* Title & Tag */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {level === "h1" && (
                <motion.h1
                  layoutId={`section-header-title-${activeSectionId || "default"}`}
                  className={cn(
                    "text-h1 font-bold tracking-tight leading-tight flex items-center gap-2",
                    colorStyle
                  )}
                >
                  <span>{formattedTitle}</span>
                </motion.h1>
              )}
              {level === "h2" && (
                <motion.h2
                  layoutId={`section-header-title-${activeSectionId || "default"}`}
                  className={cn(
                    "text-h2 font-bold tracking-tight leading-tight flex items-center gap-2",
                    colorStyle
                  )}
                >
                  <span>{formattedTitle}</span>
                </motion.h2>
              )}
              {level === "h3" && (
                <motion.h3
                  layoutId={`section-header-title-${activeSectionId || "default"}`}
                  className={cn(
                    "text-h3 font-bold tracking-tight leading-tight flex items-center gap-2",
                    colorStyle
                  )}
                >
                  <span>{formattedTitle}</span>
                </motion.h3>
              )}
              {level === "h4" && (
                <motion.h4
                  layoutId={`section-header-title-${activeSectionId || "default"}`}
                  className={cn(
                    "text-h4 font-bold tracking-tight leading-tight flex items-center gap-2",
                    colorStyle
                  )}
                >
                  <span>{formattedTitle}</span>
                </motion.h4>
              )}
              {level === "h5" && (
                <motion.h5
                  layoutId={`section-header-title-${activeSectionId || "default"}`}
                  className={cn(
                    "text-h5 font-bold tracking-tight leading-tight flex items-center gap-2",
                    colorStyle
                  )}
                >
                  <span>{formattedTitle}</span>
                </motion.h5>
              )}

              {tag && (
                <span className="inline-block px-2.5 py-0.5 rounded-full text-3xs font-black uppercase tracking-wider bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-300/80 dark:border-slate-700/80">
                  {tag}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* LINE 2: Subtitle Quote - Đã xóa Sub tiêu đề theo yêu cầu của tất cả các trang */}

        {/* LINE 3 & 4: Filter/Utilities */}
        {hasUtilities && (
          <div className="w-full pt-2 flex flex-wrap items-center justify-between gap-2.5 border-t border-slate-200/60 dark:border-slate-800/60 mt-1">
            {rightContent}
            {utilities}
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
});

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
