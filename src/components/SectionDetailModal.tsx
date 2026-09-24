import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Sparkles,
  Quote,
  CheckCircle2,
  ArrowRight,
  Command,
  LucideIcon,
} from "lucide-react";
import { cn } from "../lib/utils";
import { PAGE_HEADER_DATA } from "../data/pageHeaderData";
import { SECTION_EXTRA_DETAILS } from "../data/sectionExtraDetails";
import { ThemeType as ThemeId } from "../context/ThemeContext";
import { Language } from "../i18n";

export interface SectionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionId: string;
  sectionTitle?: string;
  sectionIndex?: number;
  totalSections?: number;
  Icon?: LucideIcon;
  theme?: ThemeId;
  lang?: Language;
}

export function SectionDetailModal({
  isOpen,
  onClose,
  sectionId,
  sectionTitle: customTitle,
  sectionIndex = 1,
  totalSections = 11,
  Icon: customIcon,
  theme = "glass-dark-neon",
  lang = "vi",
}: SectionDetailModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Trigger 300ms delayed content loading shimmer whenever modal opens
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      setIsLoading(true);
      timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
    } else {
      setIsLoading(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, sectionId]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const headerItem = PAGE_HEADER_DATA[sectionId];
  const extraDetails = SECTION_EXTRA_DETAILS[sectionId] || {
    tagVi: "Chuyên mục danh mục",
    tagEn: "Portfolio Section",
    shortcut: undefined,
    descriptionVi:
      "Nội dung chuyên sâu thuộc hồ sơ năng lực của Nguyễn Hùng Thái với định hướng tối ưu hóa hiệu quả thực thi.",
    descriptionEn:
      "Strategic focus area within the executive portfolio of Nguyen Hung Thai with high-impact operational orientation.",
    highlightsVi: [
      "Quản trị trải nghiệm và chuẩn hóa quy trình",
      "Ứng dụng công nghệ nâng cao hiệu suất",
      "Định hướng phát triển bền vững",
    ],
    highlightsEn: [
      "Experience Management & Standardization",
      "Technology Integration & High Efficiency",
      "Sustainable Strategic Development",
    ],
  };

  const Icon = customIcon || headerItem?.icon;
  const resolvedTitle =
    customTitle ||
    (headerItem ? (lang === "vi" ? headerItem.titleVi : headerItem.titleEn) : "Chi tiết");

  const quote = headerItem ? (lang === "vi" ? headerItem.quoteVi : headerItem.quoteEn) : "";
  const tag = lang === "vi" ? extraDetails.tagVi : extraDetails.tagEn;
  const description =
    lang === "vi" ? extraDetails.descriptionVi : extraDetails.descriptionEn;
  const highlights =
    lang === "vi" ? extraDetails.highlightsVi : extraDetails.highlightsEn;

  const formattedIndex = String(sectionIndex).padStart(2, "0");
  const formattedTotal = String(totalSections).padStart(2, "0");

  const getThemeGradient = (t: string) => {
    switch (t) {
      case "glass-dark-neon":
        return {
          gradient: "linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)",
          sparkColor: "#00f0ff",
        };
      case "mritech-digital-growth":
        return {
          gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
          sparkColor: "#10b981",
        };
      case "fintech-soft-glass":
        return {
          gradient: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
          sparkColor: "#3b82f6",
        };
      case "glass-soft-clay":
        return {
          gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
          sparkColor: "#f59e0b",
        };
      default:
        return {
          gradient: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
          sparkColor: "#3b82f6",
        };
    }
  };

  const themeConfig = getThemeGradient(theme);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-8 no-tilt-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="expanded-card-title"
        >
          {/* Backdrop with smooth blur & dismiss click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Centered Expanded Modal Card */}
          <motion.div
            layoutId="expandable-section-card-container"
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "relative w-full max-w-xl sm:max-w-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden no-tilt-card border z-10",
              theme === "glass-dark-neon"
                ? "bg-[#070d1d]/95 border-cyan-500/40 text-white shadow-[0_24px_64px_rgba(0,0,0,0.85),0_0_32px_rgba(6,182,212,0.2)]"
                : "bg-white/95 dark:bg-slate-900/95 border-slate-200/90 dark:border-slate-800/90 text-slate-900 dark:text-slate-100 shadow-[0_24px_64px_rgba(0,0,0,0.3)]"
            )}
          >
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ backgroundColor: themeConfig.sparkColor }}
            />
            <div
              className="absolute -bottom-24 -left-24 w-56 h-56 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: themeConfig.sparkColor }}
            />

            {/* Top Bar: Badges + Close Button */}
            <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-200/60 dark:border-slate-800/60">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: themeConfig.sparkColor }}
                  />
                  {lang === "vi" ? "MỤC" : "SECTION"} {formattedIndex} / {formattedTotal}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50">
                  {tag}
                </span>
                {extraDetails.shortcut && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 dark:text-slate-500 px-2 py-0.5 rounded bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-slate-700/40">
                    <Command className="w-2.5 h-2.5" /> {extraDetails.shortcut}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100/70 dark:bg-slate-800/60 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-all group cursor-pointer"
                aria-label="Đóng chi tiết thẻ"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>

            {/* Content Container: Skeleton Loading Transition (300ms) vs Real Details */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="skeleton-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="flex-1 flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Shimmer sweep effect overlay */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                    <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 dark:via-cyan-400/15 to-transparent -skew-x-12 animate-shimmer-fast" />
                  </div>

                  {/* Skeleton Header */}
                  <div className="flex items-start gap-4 sm:gap-5 mb-5">
                    <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-slate-200/80 dark:bg-slate-800/90 border border-slate-300/60 dark:border-slate-700/60 shrink-0 relative overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 dark:via-cyan-400/20 to-transparent -skew-x-12 animate-shimmer-fast" />
                    </div>
                    <div className="flex-1 space-y-2.5 pt-1">
                      <div className="h-3 w-28 rounded-full bg-slate-200 dark:bg-slate-800/80 animate-pulse" />
                      <div className="h-6 w-3/4 max-w-[260px] rounded-lg bg-slate-200 dark:bg-slate-800/80 animate-pulse" />
                      <div className="h-3.5 w-1/2 max-w-[180px] rounded-md bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
                    </div>
                  </div>

                  {/* Skeleton Quote */}
                  <div className="relative mb-5 p-4 rounded-xl sm:rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 flex items-start gap-3 overflow-hidden">
                    <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700/70 shrink-0 animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3.5 w-full rounded bg-slate-200 dark:bg-slate-700/60 animate-pulse" />
                      <div className="h-3.5 w-4/5 rounded bg-slate-200 dark:bg-slate-700/60 animate-pulse" />
                    </div>
                  </div>

                  {/* Skeleton Overview */}
                  <div className="mb-5 space-y-2.5">
                    <div className="h-3 w-36 rounded-full bg-slate-200 dark:bg-slate-800/80 animate-pulse" />
                    <div className="h-3.5 w-full rounded bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
                    <div className="h-3.5 w-5/6 rounded bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
                  </div>

                  {/* Skeleton Highlights */}
                  <div className="mb-6">
                    <div className="h-3 w-28 rounded-full bg-slate-200 dark:bg-slate-800/80 mb-2.5 animate-pulse" />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[1, 2, 3].map((idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
                        >
                          <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0 animate-pulse mt-0.5" />
                          <div className="flex-1 space-y-1.5">
                            <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-700/70 animate-pulse" />
                            <div className="h-2.5 w-2/3 rounded bg-slate-200 dark:bg-slate-700/60 animate-pulse" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skeleton Footer */}
                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex-wrap">
                    <div className="h-3 w-40 rounded bg-slate-100 dark:bg-slate-800/60 hidden sm:block animate-pulse" />
                    <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                      <div className="h-9 w-20 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
                      <div className="h-9 w-36 rounded-xl bg-cyan-500/20 border border-cyan-500/30 animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="detailed-content-view"
                  initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 flex flex-col justify-between"
                >
                  {/* Header Title with Glowing Icon */}
                  <div className="flex items-start gap-4 sm:gap-5 mb-5">
                    {Icon && (
                      <div
                        className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border border-white/20 dark:border-cyan-500/30"
                        style={{
                          background: themeConfig.gradient,
                        }}
                      >
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white stroke-[2.2]" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                          {lang === "vi" ? "Chi tiết chuyên mục" : "Section Insights"}
                        </span>
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
                      </div>
                      <h2
                        id="expanded-card-title"
                        className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-0.5"
                      >
                        {resolvedTitle}
                      </h2>
                      {headerItem && (
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                          {lang === "vi" ? headerItem.titleEn : headerItem.titleVi}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Inspiring Section Quote Box */}
                  {quote && (
                    <div className="relative mb-5 p-4 rounded-xl sm:rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 flex items-start gap-3">
                      <Quote className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5 opacity-80" />
                      <p className="text-xs sm:text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed">
                        "{quote}"
                      </p>
                    </div>
                  )}

                  {/* Section Overview / Role in Portfolio */}
                  <div className="mb-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                      {lang === "vi" ? "Tổng quan mục tiêu & Nội dung" : "Overview & Strategic Purpose"}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {description}
                    </p>
                  </div>

                  {/* Key Highlights / Pillars */}
                  <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                      {lang === "vi" ? "Điểm nhấn & Trọng tâm" : "Core Highlights"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {highlights.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 hover:border-cyan-500/40 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-700 dark:text-slate-200 font-medium leading-snug">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex-wrap">
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 hidden sm:inline-block">
                      {lang === "vi" ? "Nhấn [ESC] hoặc nhấp ra ngoài để đóng" : "Press [ESC] or click outside to dismiss"}
                    </span>

                    <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        {lang === "vi" ? "Đóng" : "Close"}
                      </button>

                      <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white shadow-lg transition-transform active:scale-95 cursor-pointer"
                        style={{
                          background: themeConfig.gradient,
                        }}
                      >
                        <span>{lang === "vi" ? "Tiếp tục khám phá" : "Continue Exploring"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default SectionDetailModal;
