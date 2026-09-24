import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { LucideIcon, Quote, Sparkles, X, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "../lib/utils";
import { useLanguage } from "../i18n";
import { PAGE_HEADER_DATA, PageHeaderItem } from "../data/pageHeaderData";

export interface PageCardHeaderProps {
  pageId?: string;
  id?: string;
  icon?: LucideIcon;
  title?: string;
  quote?: string;
  accentColorClass?: string;
  lineColorClass?: string;
  actionRight?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export function PageCardHeader({
  pageId,
  id,
  icon: customIcon,
  title: customTitle,
  quote: customQuote,
  accentColorClass: customAccent,
  lineColorClass: customLine,
  actionRight,
  children,
  className,
  interactive = true,
}: PageCardHeaderProps) {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  const defaultData: PageHeaderItem | undefined = pageId ? PAGE_HEADER_DATA[pageId] : undefined;

  const IconComponent = customIcon || defaultData?.icon;
  const displayTitle = customTitle || (defaultData ? (isVi ? defaultData.titleVi : defaultData.titleEn) : "");
  const displayQuote = customQuote || (defaultData ? (isVi ? defaultData.quoteVi : defaultData.quoteEn) : "");
  const accentClass = customAccent || defaultData?.accentColorClass || "text-blue-600 dark:text-cyan-400";
  const lineClass = customLine || defaultData?.lineColorClass || "bg-blue-500/30 dark:bg-cyan-500/20";

  const tag = isVi ? defaultData?.tagVi : defaultData?.tagEn;
  const description = isVi ? defaultData?.descriptionVi : defaultData?.descriptionEn;
  const highlights = isVi ? defaultData?.highlightsVi : defaultData?.highlightsEn;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Trigger 300ms skeleton shimmer loading effect when expanded
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isExpanded) {
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
  }, [isExpanded]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    if (!isExpanded) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  return (
    <>
      <div
        id={id || (pageId ? `page-card-header-${pageId}` : undefined)}
        className={cn("w-full flex flex-col gap-2 pb-1 shrink-0 font-['Play',sans-serif]", className)}
      >
        {/* Dòng 1 : Bên trái Tiêu đề 2 chữ (H4) - Bên phải: Câu nói hay về trang đó và/hoặc action */}
        <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
          {/* Bên trái: Icon & Tiêu đề H4 với 3D tilt và border glow khi hover */}
          <div
            onClick={() => {
              if (interactive && defaultData) {
                setIsExpanded(true);
              }
            }}
            className={cn(
              "pointer-events-auto flex items-center gap-2.5 sm:gap-3 shrink-0 px-2 py-1 rounded-xl transition-all duration-300",
              interactive && "cursor-pointer group hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
            )}
            title={interactive ? (isVi ? "Nhấp để xem tổng quan chuyên sâu" : "Click to view in-depth overview") : undefined}
          >
            {IconComponent && (
              <div className={cn("flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", accentClass)}>
                <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
              </div>
            )}
            <div className="flex items-center gap-2">
              <h4 className={cn("text-h4 tracking-tight font-bold", accentClass)}>
                {displayTitle}
              </h4>
              {interactive && defaultData && (
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-3xs font-mono px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 border border-blue-500/20">
                  {isVi ? "Xem" : "View"}
                </span>
              )}
            </div>
          </div>

          {/* Bên phải: Câu nói hay & Nút hành động */}
          <div className="flex items-center gap-2 sm:ml-auto min-w-0 max-w-full">
            {actionRight}
            {displayQuote && (
              <div
                onClick={() => {
                  if (interactive && defaultData) {
                    setIsExpanded(true);
                  }
                }}
                className={cn(
                  "pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 text-body-sm font-bold italic max-w-full transition-all duration-300",
                  interactive && "cursor-pointer hover:border-blue-500/40 dark:hover:border-cyan-400/40 hover:shadow-xs",
                  accentClass
                )}
                title={displayQuote}
              >
                <div className="w-5 h-5 rounded-full bg-slate-200/80 dark:bg-slate-800/80 flex items-center justify-center shrink-0">
                  <Quote className={cn("w-3 h-3 not-italic stroke-[2.5]", accentClass)} />
                </div>
                <span className={cn("truncate font-bold max-w-[260px] xs:max-w-[320px] sm:max-w-[420px] md:max-w-[540px] lg:max-w-[660px]", accentClass)}>
                  {displayQuote}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Dòng 2 : Đường line gạch ngang phân cách cùng màu icon */}
        <div className={cn("h-[2px] w-full", lineClass)} />

        {/* Dòng 3 : Nội dung / Tiện ích / Phân mục bên dưới line (Caption / Label Token: 12px – 13px) */}
        {children && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 w-full text-caption text-label font-semibold text-subcontent">
            {children}
          </div>
        )}
      </div>

      {/* Render Centered Expanded Modal view via createPortal with 300ms Skeleton Shimmer */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isExpanded && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
                {/* Backdrop Blur Layer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsExpanded(false)}
                  className="fixed inset-0 bg-slate-950/70 dark:bg-slate-950/85 backdrop-blur-md cursor-pointer"
                />

                {/* Modal Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 16 }}
                  transition={{ type: "spring", damping: 26, stiffness: 320 }}
                  role="dialog"
                  aria-modal="true"
                  className={cn(
                    "no-tilt-card relative z-10 w-full max-w-2xl rounded-2xl md:rounded-3xl p-5 sm:p-7 md:p-8 overflow-hidden",
                    "glass-surface backdrop-blur-2xl border border-slate-200/90 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-slate-100",
                    "shadow-[0_24px_64px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.1)] my-auto"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      /* Skeleton Shimmer Loading State (300ms) */
                      <motion.div
                        key="skeleton-loading-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-6"
                      >
                        {/* Skeleton Top Bar */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-800/80">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-5 rounded-full bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer-fast" />
                            <div className="w-32 h-5 rounded-full bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer-fast" />
                          </div>
                          <div className="w-8 h-8 rounded-full bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer-fast" />
                        </div>

                        {/* Skeleton Hero Title Header */}
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 shrink-0 animate-shimmer-fast" />
                          <div className="space-y-2 flex-1">
                            <div className="w-48 h-7 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer-fast" />
                            <div className="w-36 h-4 rounded-md bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer-fast" />
                          </div>
                        </div>

                        {/* Skeleton Quote Box */}
                        <div className="p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-slate-100/50 dark:bg-slate-800/40 space-y-2">
                          <div className="w-full h-4 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer-fast" />
                          <div className="w-4/5 h-4 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer-fast" />
                        </div>

                        {/* Skeleton Description Area */}
                        <div className="space-y-2">
                          <div className="w-28 h-4 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer-fast" />
                          <div className="w-full h-3 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer-fast" />
                          <div className="w-5/6 h-3 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer-fast" />
                        </div>

                        {/* Skeleton Highlights List */}
                        <div className="space-y-2.5 pt-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60">
                              <div className="w-4 h-4 rounded-full bg-slate-200/80 dark:bg-slate-800/80 shrink-0 animate-shimmer-fast" />
                              <div className="w-3/4 h-3.5 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer-fast" />
                            </div>
                          ))}
                        </div>

                        {/* Skeleton Footer Bar */}
                        <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between">
                          <div className="w-32 h-4 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer-fast" />
                          <div className="w-24 h-9 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer-fast" />
                        </div>
                      </motion.div>
                    ) : (
                      /* Real Content Display (after 300ms) */
                      <motion.div
                        key="loaded-content-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Top Bar with Badges and Close Button */}
                        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200/70 dark:border-slate-800/80">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-blue-500/10 text-blue-600 dark:text-cyan-400 border border-blue-500/20">
                              <Sparkles className="w-3 h-3 fill-current shrink-0" />
                              <span>{tag || (isVi ? "Chuyên mục" : "Section")}</span>
                            </span>
                            {defaultData?.shortcut && (
                              <span className="px-2 py-0.5 rounded-md text-3xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                {isVi ? `Phím tắt: [${defaultData.shortcut}]` : `Shortcut: [${defaultData.shortcut}]`}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => setIsExpanded(false)}
                            aria-label="Close details"
                            className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Hero Header Area of the Card */}
                        <div className="mt-4 flex items-start gap-4">
                          {IconComponent && (
                            <div className={cn(
                              "w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md",
                              "bg-gradient-to-br from-blue-500/15 to-indigo-500/15 border border-blue-500/30 text-blue-600 dark:text-cyan-400"
                            )}>
                              <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-['Play',sans-serif]">
                              {displayTitle}
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                              {tag || (isVi ? "Chuyên mục hồ sơ chuyên nghiệp" : "Professional Portfolio Pillar")}
                            </p>
                          </div>
                        </div>

                        {/* Section Quote Banner */}
                        {displayQuote && (
                          <div className="mt-4 p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-2.5">
                            <Quote className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                            <p className="text-xs sm:text-sm italic font-medium text-slate-700 dark:text-slate-200">
                              "{displayQuote}"
                            </p>
                          </div>
                        )}

                        {/* Section Overview / Description */}
                        {description && (
                          <div className="mt-4 space-y-1.5">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                              {isVi ? "Mục tiêu & Định hướng chiến lược" : "Overview & Strategic Purpose"}
                            </h3>
                            <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                              {description}
                            </p>
                          </div>
                        )}

                        {/* Key Highlights */}
                        {highlights && highlights.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                              {isVi ? "Điểm nhấn cốt lõi" : "Key Highlights"}
                            </h3>
                            <div className="grid grid-cols-1 gap-2">
                              {highlights.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-2.5 p-2 sm:p-2.5 rounded-lg bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/40 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                                  <span className="font-medium">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Bottom Actions Area */}
                        <div className="mt-6 pt-4 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between gap-3">
                          <span className="text-3xs sm:text-2xs text-slate-600 dark:text-slate-400 font-mono">
                            {isVi ? "Nhấn ESC để đóng cửa sổ" : "Press ESC to close"}
                          </span>

                          <button
                            onClick={() => setIsExpanded(false)}
                            className={cn(
                              "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm",
                              "bg-blue-600 hover:bg-blue-700 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950",
                              "hover:scale-[1.02] active:scale-[0.98]"
                            )}
                          >
                            <span>{isVi ? "Tiếp tục khám phá" : "Continue Exploring"}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

