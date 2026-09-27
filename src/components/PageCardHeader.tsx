import React, { useMemo } from "react";
import { LucideIcon, Quote, Clock, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { useLanguage } from "../i18n";
import { PAGE_HEADER_DATA, PageHeaderItem } from "../data/pageHeaderData";
import { useTheme } from "../context/ThemeContext";
import { playUiSound } from "../lib/sound";

export interface HeaderColorTheme {
  name: string;
  iconColor: string;
  iconBg: string;
  titleGradient: string;
  lineGradient: string;
  quoteBg: string;
  quoteBorder: string;
  quoteText: string;
  quoteIconBg: string;
  quoteIconText: string;
  badgeBg: string;
  badgeText: string;
}

export const HEADER_COLOR_THEMES: HeaderColorTheme[] = [
  {
    name: "indigo-violet",
    iconColor: "text-indigo-500 dark:text-indigo-400 drop-shadow-[0_2px_8px_rgba(99,102,241,0.45)]",
    iconBg: "bg-indigo-500/10 dark:bg-indigo-500/20 border-indigo-200/60 dark:border-indigo-500/30",
    titleGradient: "bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 dark:from-indigo-400 dark:via-violet-300 dark:to-indigo-200",
    lineGradient: "bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400/40",
    quoteBg: "bg-indigo-500/10 dark:bg-indigo-950/40",
    quoteBorder: "border-indigo-300/60 dark:border-indigo-700/60",
    quoteText: "text-indigo-900 dark:text-indigo-200",
    quoteIconBg: "bg-indigo-500/20",
    quoteIconText: "text-indigo-600 dark:text-indigo-400",
    badgeBg: "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200/80 dark:border-indigo-700/40",
    badgeText: "text-indigo-700 dark:text-indigo-300"
  },
  {
    name: "cyan-sky",
    iconColor: "text-cyan-500 dark:text-cyan-400 drop-shadow-[0_2px_8px_rgba(6,182,212,0.45)]",
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20 border-cyan-200/60 dark:border-cyan-500/30",
    titleGradient: "bg-gradient-to-r from-cyan-600 via-sky-600 to-teal-500 dark:from-cyan-400 dark:via-sky-300 dark:to-teal-200",
    lineGradient: "bg-gradient-to-r from-cyan-500 via-sky-400 to-teal-400/40",
    quoteBg: "bg-cyan-500/10 dark:bg-cyan-950/40",
    quoteBorder: "border-cyan-300/60 dark:border-cyan-700/60",
    quoteText: "text-cyan-900 dark:text-cyan-200",
    quoteIconBg: "bg-cyan-500/20",
    quoteIconText: "text-cyan-600 dark:text-cyan-400",
    badgeBg: "bg-cyan-50 dark:bg-cyan-900/30 border-cyan-200/80 dark:border-cyan-700/40",
    badgeText: "text-cyan-700 dark:text-cyan-300"
  },
  {
    name: "emerald-mint",
    iconColor: "text-emerald-500 dark:text-emerald-400 drop-shadow-[0_2px_8px_rgba(16,185,129,0.45)]",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-200/60 dark:border-emerald-500/30",
    titleGradient: "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-200",
    lineGradient: "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400/40",
    quoteBg: "bg-emerald-500/10 dark:bg-emerald-950/40",
    quoteBorder: "border-emerald-300/60 dark:border-emerald-700/60",
    quoteText: "text-emerald-900 dark:text-emerald-200",
    quoteIconBg: "bg-emerald-500/20",
    quoteIconText: "text-emerald-600 dark:text-emerald-400",
    badgeBg: "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200/80 dark:border-emerald-700/40",
    badgeText: "text-emerald-700 dark:text-emerald-300"
  },
  {
    name: "purple-fuchsia",
    iconColor: "text-purple-500 dark:text-purple-400 drop-shadow-[0_2px_8px_rgba(168,85,247,0.45)]",
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20 border-purple-200/60 dark:border-purple-500/30",
    titleGradient: "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 dark:from-purple-400 dark:via-fuchsia-300 dark:to-pink-200",
    lineGradient: "bg-gradient-to-r from-purple-500 via-fuchsia-400 to-pink-400/40",
    quoteBg: "bg-purple-500/10 dark:bg-purple-950/40",
    quoteBorder: "border-purple-300/60 dark:border-purple-700/60",
    quoteText: "text-purple-900 dark:text-purple-200",
    quoteIconBg: "bg-purple-500/20",
    quoteIconText: "text-purple-600 dark:text-purple-400",
    badgeBg: "bg-purple-50 dark:bg-purple-900/30 border-purple-200/80 dark:border-purple-700/40",
    badgeText: "text-purple-700 dark:text-purple-300"
  },
  {
    name: "amber-orange",
    iconColor: "text-amber-500 dark:text-amber-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.45)]",
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20 border-amber-200/60 dark:border-amber-500/30",
    titleGradient: "bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 dark:from-amber-400 dark:via-orange-300 dark:to-amber-200",
    lineGradient: "bg-gradient-to-r from-amber-500 via-orange-400 to-amber-400/40",
    quoteBg: "bg-amber-500/10 dark:bg-amber-950/40",
    quoteBorder: "border-amber-300/60 dark:border-amber-700/60",
    quoteText: "text-amber-900 dark:text-amber-200",
    quoteIconBg: "bg-amber-500/20",
    quoteIconText: "text-amber-600 dark:text-amber-400",
    badgeBg: "bg-amber-50 dark:bg-amber-900/30 border-amber-200/80 dark:border-amber-700/40",
    badgeText: "text-amber-700 dark:text-amber-300"
  },
  {
    name: "rose-coral",
    iconColor: "text-rose-500 dark:text-rose-400 drop-shadow-[0_2px_8px_rgba(244,63,94,0.45)]",
    iconBg: "bg-rose-500/10 dark:bg-rose-500/20 border-rose-200/60 dark:border-rose-500/30",
    titleGradient: "bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 dark:from-rose-400 dark:via-pink-300 dark:to-rose-200",
    lineGradient: "bg-gradient-to-r from-rose-500 via-pink-400 to-rose-400/40",
    quoteBg: "bg-rose-500/10 dark:bg-rose-950/40",
    quoteBorder: "border-rose-300/60 dark:border-rose-700/60",
    quoteText: "text-rose-900 dark:text-rose-200",
    quoteIconBg: "bg-rose-500/20",
    quoteIconText: "text-rose-600 dark:text-rose-400",
    badgeBg: "bg-rose-50 dark:bg-rose-900/30 border-rose-200/80 dark:border-rose-700/40",
    badgeText: "text-rose-700 dark:text-rose-300"
  },
  {
    name: "blue-sapphire",
    iconColor: "text-blue-500 dark:text-blue-400 drop-shadow-[0_2px_8px_rgba(59,130,246,0.45)]",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20 border-blue-200/60 dark:border-blue-500/30",
    titleGradient: "bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 dark:from-blue-400 dark:via-indigo-300 dark:to-sky-200",
    lineGradient: "bg-gradient-to-r from-blue-500 via-indigo-400 to-sky-400/40",
    quoteBg: "bg-blue-500/10 dark:bg-blue-950/40",
    quoteBorder: "border-blue-300/60 dark:border-blue-700/60",
    quoteText: "text-blue-900 dark:text-blue-200",
    quoteIconBg: "bg-blue-500/20",
    quoteIconText: "text-blue-600 dark:text-blue-400",
    badgeBg: "bg-blue-50 dark:bg-blue-900/30 border-blue-200/80 dark:border-blue-700/40",
    badgeText: "text-blue-700 dark:text-blue-300"
  },
  {
    name: "teal-ocean",
    iconColor: "text-teal-500 dark:text-teal-400 drop-shadow-[0_2px_8px_rgba(20,184,166,0.45)]",
    iconBg: "bg-teal-500/10 dark:bg-teal-500/20 border-teal-200/60 dark:border-teal-500/30",
    titleGradient: "bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-500 dark:from-teal-400 dark:via-emerald-300 dark:to-cyan-200",
    lineGradient: "bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-400/40",
    quoteBg: "bg-teal-500/10 dark:bg-teal-950/40",
    quoteBorder: "border-teal-300/60 dark:border-teal-700/60",
    quoteText: "text-teal-900 dark:text-teal-200",
    quoteIconBg: "bg-teal-500/20",
    quoteIconText: "text-teal-600 dark:text-teal-400",
    badgeBg: "bg-teal-50 dark:bg-teal-900/30 border-teal-200/80 dark:border-teal-700/40",
    badgeText: "text-teal-700 dark:text-teal-300"
  },
  {
    name: "violet-magenta",
    iconColor: "text-violet-500 dark:text-violet-400 drop-shadow-[0_2px_8px_rgba(139,92,246,0.45)]",
    iconBg: "bg-violet-500/10 dark:bg-violet-500/20 border-violet-200/60 dark:border-violet-500/30",
    titleGradient: "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-500 dark:from-violet-400 dark:via-purple-300 dark:to-indigo-200",
    lineGradient: "bg-gradient-to-r from-violet-500 via-purple-400 to-indigo-400/40",
    quoteBg: "bg-violet-500/10 dark:bg-violet-950/40",
    quoteBorder: "border-violet-300/60 dark:border-violet-700/60",
    quoteText: "text-violet-900 dark:text-violet-200",
    quoteIconBg: "bg-violet-500/20",
    quoteIconText: "text-violet-600 dark:text-violet-400",
    badgeBg: "bg-violet-50 dark:bg-violet-900/30 border-violet-200/80 dark:border-violet-700/40",
    badgeText: "text-violet-700 dark:text-violet-300"
  }
];

export interface PageCardHeaderProps {
  pageId?: string;
  id?: string;
  icon?: LucideIcon;
  title?: string;
  quote?: string;
  readingTime?: string;
  accentColorClass?: string;
  lineColorClass?: string;
  actionRight?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function PageCardHeader({
  pageId,
  id,
  icon: customIcon,
  title: customTitle,
  quote: customQuote,
  readingTime: customReadingTime,
  accentColorClass: customAccent,
  lineColorClass: customLine,
  actionRight,
  children,
  className,
}: PageCardHeaderProps) {
  const { lang } = useLanguage();
  const isVi = lang === "vi";
  const { theme } = useTheme();

  const defaultData: PageHeaderItem | undefined = pageId ? PAGE_HEADER_DATA[pageId] : undefined;

  const IconComponent = customIcon || defaultData?.icon;
  const rawTitle = customTitle || (defaultData ? (isVi ? defaultData.titleVi : defaultData.titleEn) : "");
  const displayQuote = customQuote || (defaultData ? (isVi ? defaultData.quoteVi : defaultData.quoteEn) : "");
  const displayReadingTime = customReadingTime || (defaultData ? (isVi ? defaultData.readingTimeVi : defaultData.readingTimeEn) : "");

  // Đảm bảo tiêu đề không viết hoa toàn bộ chữ (Sentence case)
  const displayTitle = useMemo(() => {
    if (!rawTitle) return "";
    const trimmed = rawTitle.trim();
    if (trimmed === trimmed.toUpperCase() && trimmed.length > 3) {
      const lower = trimmed.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return trimmed;
  }, [rawTitle]);

  // Phân bổ bảng màu hài hòa theo seed của thẻ chính
  const themeIndex = useMemo(() => {
    const seedString = `${pageId || ""}-${displayTitle || ""}-${id || ""}`;
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
      hash = (hash << 5) - hash + seedString.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % HEADER_COLOR_THEMES.length;
  }, [pageId, displayTitle, id]);

  const currentTheme = HEADER_COLOR_THEMES[themeIndex];
  const lineClass = customLine || currentTheme.lineGradient;

  return (
    <div
      id={id || (pageId ? `page-card-header-${pageId}` : undefined)}
      style={{ borderRadius: "var(--theme-radius-card, 14px)" }}
      className={cn(
        "w-full flex flex-col gap-3 p-3.5 sm:p-4.5 shrink-0 font-play border border-white/70 dark:border-white/10 shadow-sm hover:shadow-md backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 transition-all duration-300 relative overflow-hidden",
        className
      )}
    >
      {/* Subtle Top-right Ambient Glow Accent */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

      {/* Dòng 1 : Bên trái Tiêu đề thẻ (Icon + Tiêu đề) - Bên phải: Reading Time, Câu nói hay & actions */}
      <div className="flex items-center justify-between gap-3 flex-wrap lg:flex-nowrap relative z-10">
        
        {/* Bên trái: Icon nổi bật & Tiêu đề chuyên nghiệp */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap">
          {IconComponent && (
            <motion.div
              animate={{
                y: [0, -2.5, 0],
                rotate: [0, 2, -2, 0],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.12, rotate: 6 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                try { playUiSound("click"); } catch {}
              }}
               className={cn(
                "w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0 cursor-pointer transition-all duration-300"
              )}
              title={displayTitle}
            >
              <IconComponent
                className={cn(
                  "w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.2] transition-all duration-300",
                  currentTheme.iconColor
                )}
              />
            </motion.div>
          )}

          <motion.h2
            whileHover={{ x: 2 }}
            className="text-base sm:text-lg lg:text-xl tracking-tight font-bold font-play flex items-center gap-2 cursor-default select-none leading-tight"
          >
            <span
              className={cn(
                "bg-clip-text text-transparent font-play font-bold transition-all duration-300 drop-shadow-2xs",
                currentTheme.titleGradient
              )}
            >
              {displayTitle}
            </span>
          </motion.h2>
        </div>

        {/* Bên phải: Câu nói hay & Nút hành động */}
        <div className="flex items-center gap-2 sm:ml-auto min-w-0 max-w-full flex-wrap sm:flex-nowrap">
          {actionRight}

          {displayQuote && (
            <motion.div
              whileHover={{ scale: 1.01 }}
              className={cn(
                "px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border text-xs sm:text-[13px] font-medium italic flex items-center gap-2 max-w-full transition-all shadow-2xs backdrop-blur-md",
                currentTheme.quoteBg,
                currentTheme.quoteBorder,
                currentTheme.quoteText
              )}
              title={displayQuote}
            >
              <div
                className={cn(
                  "w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full flex items-center justify-center shrink-0 shadow-2xs",
                  currentTheme.quoteIconBg,
                  currentTheme.quoteIconText
                )}
              >
                <Quote className="w-2.5 h-2.5 not-italic stroke-[2.2]" />
              </div>
              <span className="truncate max-w-[240px] xs:max-w-[300px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[580px] xl:max-w-[680px] font-play">
                "{displayQuote}"
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Dòng 2 : Đường line gạch ngang phân cách có dải màu gradient sắc sảo */}
      <div className={cn("h-[2px] w-full rounded-full shadow-2xs transition-colors duration-300 relative z-10", lineClass)} />

      {/* Dòng 3 : Nội dung / Tiện ích / Phân mục bên dưới line */}
      {children && (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5 w-full text-xs font-medium text-slate-600 dark:text-slate-300 relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}

export default PageCardHeader;
