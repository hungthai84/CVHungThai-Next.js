import React from "react";
import { LucideIcon, Quote } from "lucide-react";
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
}: PageCardHeaderProps) {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  const defaultData: PageHeaderItem | undefined = pageId ? PAGE_HEADER_DATA[pageId] : undefined;

  const IconComponent = customIcon || defaultData?.icon;
  const displayTitle = customTitle || (defaultData ? (isVi ? defaultData.titleVi : defaultData.titleEn) : "");
  const displayQuote = customQuote || (defaultData ? (isVi ? defaultData.quoteVi : defaultData.quoteEn) : "");
  const accentClass = customAccent || defaultData?.accentColorClass || "text-blue-600 dark:text-blue-400";
  const lineClass = customLine || defaultData?.lineColorClass || "bg-blue-500/30 dark:bg-blue-500/20";

  return (
    <div
      id={id || (pageId ? `page-card-header-${pageId}` : undefined)}
      className={cn("w-full flex flex-col gap-2 pb-1 shrink-0 font-['Play',sans-serif]", className)}
    >
      {/* Dòng 1 : Bên trái Tiêu đề 2 chữ (H4) - Bên phải: Câu nói hay về trang đó và/hoặc action */}
      <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
        {/* Bên trái: Icon & Tiêu đề H4 (2 chữ) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {IconComponent && (
            <div className={cn("flex items-center justify-center shrink-0", accentClass)}>
              <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </div>
          )}
          <h4 className={cn("text-h4 tracking-tight", accentClass)}>
            {displayTitle}
          </h4>
        </div>

        {/* Bên phải: Câu nói hay & Nút hành động */}
        <div className="flex items-center gap-2 sm:ml-auto min-w-0 max-w-full">
          {actionRight}
          {displayQuote && (
            <div
              className="px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 text-body-sm font-bold text-slate-800 dark:text-slate-200 italic shadow-2xs flex items-center gap-2 max-w-full"
              title={displayQuote}
            >
              <Quote className={cn("w-3.5 h-3.5 shrink-0 not-italic", accentClass)} />
              <span className="truncate max-w-[260px] xs:max-w-[320px] sm:max-w-[420px] md:max-w-[540px] lg:max-w-[660px]">
                {displayQuote}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Dòng 2 : Đường line gạch ngang phân cách cùng màu icon */}
      <div className={cn("h-[2px] w-full", lineClass)} />

      {/* Dòng 3 : Nội dung / Tiện ích / Phân mục bên dưới line (Caption / Label: 12px – 13px) */}
      {children && (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 w-full text-caption">
          {children}
        </div>
      )}
    </div>
  );
}
