import React from "react";
import { LucideIcon, Quote, Clock } from "lucide-react";
import { cn } from "../lib/utils";
import { useLanguage } from "../i18n";
import { PAGE_HEADER_DATA, PageHeaderItem } from "../data/pageHeaderData";

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

  const defaultData: PageHeaderItem | undefined = pageId ? PAGE_HEADER_DATA[pageId] : undefined;

  const IconComponent = customIcon || defaultData?.icon;
  const displayTitle = customTitle || (defaultData ? (isVi ? defaultData.titleVi : defaultData.titleEn) : "");
  const displayQuote = customQuote || (defaultData ? (isVi ? defaultData.quoteVi : defaultData.quoteEn) : "");
  const displayReadingTime = customReadingTime || (defaultData ? (isVi ? defaultData.readingTimeVi : defaultData.readingTimeEn) : "");
  const accentClass = customAccent || defaultData?.accentColorClass || "text-blue-600 dark:text-blue-400";
  const lineClass = customLine || defaultData?.lineColorClass || "bg-blue-500/30 dark:bg-blue-500/20";

  return (
    <div
      id={id || (pageId ? `page-card-header-${pageId}` : undefined)}
      className={cn("w-full flex flex-col gap-2 pb-1 shrink-0 font-['Play',sans-serif]", className)}
    >
      {/* Dòng 1 : Bên trái Tiêu đề 2 chữ (H4) + Thời gian đọc - Bên phải: Câu nói hay về trang đó và/hoặc action */}
      <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
        {/* Bên trái: Icon & Tiêu đề H4 (2 chữ) & Badge Thời gian đọc */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap">
          {IconComponent && (
            <div className={cn("flex items-center justify-center shrink-0", accentClass)}>
              <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </div>
          )}
          <h4 className={cn("text-h4 tracking-tight font-bold", accentClass)}>
            {displayTitle}
          </h4>
          {displayReadingTime && (
            <div 
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 text-caption font-mono font-medium text-slate-700 dark:text-slate-300 shadow-2xs transition-transform hover:scale-105"
              title={isVi ? `Thời gian đọc ước tính: ${displayReadingTime}` : `Estimated reading time: ${displayReadingTime}`}
            >
              <Clock className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400 shrink-0" />
              <span className="whitespace-nowrap">{displayReadingTime}</span>
            </div>
          )}
        </div>

        {/* Bên phải: Câu nói hay & Nút hành động */}
        <div className="flex items-center gap-2 sm:ml-auto min-w-0 max-w-full">
          {actionRight}
          {displayQuote && (
            <div
              className={cn(
                "px-3.5 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 text-body-sm font-bold italic flex items-center gap-2 max-w-full transition-colors",
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
  );
}
