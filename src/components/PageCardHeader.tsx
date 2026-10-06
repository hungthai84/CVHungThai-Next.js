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
  textColor: string;
  lineBg: string;
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
    iconColor: "text-indigo-500 dark:text-indigo-400 drop-shadow-[0_2px_8px_rgba(99,102,241,0.4)]",
    textColor: "text-indigo-500 dark:text-indigo-400",
    lineBg: "bg-indigo-500 dark:bg-indigo-400",
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
    iconColor: "text-cyan-500 dark:text-cyan-400 drop-shadow-[0_2px_8px_rgba(6,182,212,0.4)]",
    textColor: "text-cyan-500 dark:text-cyan-400",
    lineBg: "bg-cyan-500 dark:bg-cyan-400",
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
    iconColor: "text-emerald-500 dark:text-emerald-400 drop-shadow-[0_2px_8px_rgba(16,185,129,0.4)]",
    textColor: "text-emerald-500 dark:text-emerald-400",
    lineBg: "bg-emerald-500 dark:bg-emerald-400",
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
    iconColor: "text-purple-500 dark:text-purple-400 drop-shadow-[0_2px_8px_rgba(168,85,247,0.4)]",
    textColor: "text-purple-500 dark:text-purple-400",
    lineBg: "bg-purple-500 dark:bg-purple-400",
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
    iconColor: "text-amber-500 dark:text-amber-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.4)]",
    textColor: "text-amber-500 dark:text-amber-400",
    lineBg: "bg-amber-500 dark:bg-amber-400",
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
    iconColor: "text-rose-500 dark:text-rose-400 drop-shadow-[0_2px_8px_rgba(244,63,94,0.4)]",
    textColor: "text-rose-500 dark:text-rose-400",
    lineBg: "bg-rose-500 dark:bg-rose-400",
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
    iconColor: "text-blue-500 dark:text-blue-400 drop-shadow-[0_2px_8px_rgba(59,130,246,0.4)]",
    textColor: "text-blue-500 dark:text-blue-400",
    lineBg: "bg-blue-500 dark:bg-blue-400",
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
    iconColor: "text-teal-500 dark:text-teal-400 drop-shadow-[0_2px_8px_rgba(20,184,166,0.4)]",
    textColor: "text-teal-500 dark:text-teal-400",
    lineBg: "bg-teal-500 dark:bg-teal-400",
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
    iconColor: "text-violet-500 dark:text-violet-400 drop-shadow-[0_2px_8px_rgba(139,92,246,0.4)]",
    textColor: "text-violet-500 dark:text-violet-400",
    lineBg: "bg-violet-500 dark:bg-violet-400",
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

  // Format tiêu đề chính: Đúng 4 chữ, viết hoa chữ đầu còn lại viết thường
  const displayTitle = useMemo(() => {
    if (!rawTitle) return "";
    const trimmed = rawTitle.trim();
    const words = trimmed.split(/\s+/);
    // Lọc lấy tối đa đúng 4 từ
    const fourWords = words.length > 4 ? words.slice(0, 4) : words;
    const joined = fourWords.join(" ");
    const lower = joined.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }, [rawTitle]);

  // Phân bổ bảng màu hài hòa theo seed của thẻ chính (mỗi trang / mỗi thẻ có màu sắc khác nhau)
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
  const finalLineClass = customLine || currentTheme.lineBg;

  return (
    <div
      id={id || (pageId ? `page-card-header-${pageId}` : undefined)}
      className={cn(
        "w-full flex flex-col gap-2 p-[5px] shrink-0 font-play border-0 border-none shadow-none bg-transparent backdrop-blur-none transition-all duration-300 relative",
        className
      )}
    >
      {/* Dòng 1 : Bên trái Tiêu đề thẻ (Icon & Tiêu đề chính) - Bên phải: Câu nói hay & actions */}
      <div className="flex items-center justify-between gap-3 flex-wrap lg:flex-nowrap relative z-10">
        
        {/* Bên trái: Icon chuyển động tại chỗ (không đóng khung) & Tiêu đề chính 4 chữ */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap">
          {IconComponent && (
            <motion.div
              animate={{
                y: [0, -3, 0],
                rotate: [0, 2.5, -2.5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.18, rotate: 6 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (pageId !== "customization") {
                  try { playUiSound("click"); } catch {}
                }
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0 transition-all duration-300 bg-transparent border-0 p-0 shadow-none cursor-pointer select-none"
              title={displayTitle}
            >
              <IconComponent
                className={cn(
                  "w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2] transition-all duration-300",
                  currentTheme.iconColor
                )}
              />
            </motion.div>
          )}

          <motion.h2
            whileHover={{ x: 2 }}
            className="text-h5 tracking-tight font-bold font-play flex items-center gap-2 cursor-default select-none leading-tight"
          >
            <span
              className={cn(
                "font-play font-bold text-h5 transition-all duration-300 drop-shadow-2xs",
                currentTheme.textColor
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
                "px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-[14px] border text-[15px] font-bold italic flex items-center gap-2 max-w-full transition-all shadow-2xs backdrop-blur-md",
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
              <span className="truncate max-w-[240px] xs:max-w-[300px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[580px] xl:max-w-[680px] font-play text-[15px] font-bold">
                "{displayQuote}"
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Dòng 2 : Đường line xuống dòng có màu đồng bộ giống icon */}
      <div className={cn("h-[2px] w-full rounded-full shadow-2xs transition-all duration-300 relative z-10", finalLineClass)} />

      {/* Dòng 3 : Nội dung / Tiện ích / Phân mục bên dưới line */}
      {children && (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5 w-full text-body-sm font-normal text-slate-600 dark:text-slate-300 relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}

export default PageCardHeader;
