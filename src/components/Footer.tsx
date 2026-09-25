import React, { useState, useEffect, memo, MouseEvent } from "react";
import {
  ChevronDown,
  ChevronUp,
  Bot,
  Volume2,
  VolumeX,
  Pin,
  MousePointer,
  Sliders,
  Printer
} from "lucide-react";
import { useLanguage } from "../i18n";
import { useTheme, ThemeType } from "../context/ThemeContext";
import { useFooter } from "../context/FooterContext";
import { useSound } from "../context/SoundContext";
import { useCursor } from "../context/CursorContext";
import FooterWeather from "./FooterWeather";
import { cn, getUnifiedSurfaceStyle } from "../lib/utils";

interface FooterProps {
  theme?: ThemeType;
  activeSection?: string;
  onNavigate?: (id: string) => void;
}

const SECTION_ORDER = [
  "home",
  "about",
  "skills",
  "education",
  "experience",
  "projects",
  "interview",
  "tuvi",
  "systems",
  "contact",
  "wallpapers"
];

function Footer({ theme: propTheme, activeSection = "home", onNavigate }: FooterProps) {
  const themeContext = useTheme();
  const theme = propTheme || themeContext.theme;
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  // Global Contexts
  const { 
    footerConfig, 
    togglePin, 
    setIsFooterModalOpen, 
    openFooterModal,
    isFooterHovered: isHovered, 
    setIsFooterHovered: setIsHovered 
  } = useFooter();
  const { soundConfig, toggleMute, setIsSoundModalOpen } = useSound();
  const { setIsCursorModalOpen } = useCursor();

  const [currentTime, setCurrentTime] = useState(new Date());

  // Unpin & slide-down state logic
  const isPinned = footerConfig.isPinned !== false;
  const isSlidDown = !isPinned && !isHovered;

  // Collapse footer if clicked outside when unpinned and currently expanded
  useEffect(() => {
    if (isPinned || !isHovered) return;
    const handleOutsideInteraction = (e: MouseEvent | TouchEvent) => {
      const footerEl = document.getElementById("footer");
      if (footerEl && !footerEl.contains(e.target as Node)) {
        setIsHovered(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideInteraction as any);
    document.addEventListener("touchstart", handleOutsideInteraction as any);
    return () => {
      document.removeEventListener("mousedown", handleOutsideInteraction as any);
      document.removeEventListener("touchstart", handleOutsideInteraction as any);
    };
  }, [isPinned, isHovered]);

  const handleTogglePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (footerConfig.isPinned) {
      // Khi bấm bỏ ghim: trượt xuống ẩn ngay lập tức, chỉ chừa 1 phần nhỏ
      togglePin();
      setIsHovered(false);
    } else {
      // Khi bấm ghim: ghim cố định và hiển thị đầy đủ
      togglePin();
      setIsHovered(true);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString(lang === "vi" ? "vi-VN" : "en-US", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateString = currentTime.toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US", { weekday: 'short', day: 'numeric', month: 'short' });

  const currentIndex = SECTION_ORDER.indexOf(activeSection);

  const handleNextPage = () => {
    const nextIdx = currentIndex < SECTION_ORDER.length - 1 ? currentIndex + 1 : 0;
    const nextId = SECTION_ORDER[nextIdx];
    if (onNavigate) {
      onNavigate(nextId);
    } else {
      const el = document.getElementById(nextId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenAIAssistant = () => {
    window.dispatchEvent(new CustomEvent('open-ai-assistant'));
    const btn = document.getElementById("btn-open-ai-assistant");
    if (btn) btn.click();
  };

  // Base container styles based on theme and style variant
  const getFooterSurfaceStyle = () => {
    if (footerConfig.styleVariant === "solid") {
      if (theme === "glass-dark-neon") {
        return "bg-slate-900/95 text-white shadow-2xl backdrop-blur-xl";
      }
      return "bg-slate-50/95 text-slate-900 shadow-xl backdrop-blur-xl";
    }
    if (footerConfig.styleVariant === "minimal") {
      return "bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl shadow-xl";
    }
    return cn(getUnifiedSurfaceStyle(theme), "shadow-xl");
  };

  // Placement class resolver (Xóa khung viền bao quanh thô cứng, bo cong mượt mà 10px)
  const getPlacementClass = () => {
    switch (footerConfig.placement) {
      case "floating-pill":
        return cn(
          "fixed left-1/2 -translate-x-1/2 z-40 w-[calc(100%-20px)] sm:w-[92%] md:w-[86%] lg:w-[82%] xl:w-[78%] max-w-[1180px] h-[58px] sm:h-[62px] floating-glass-footer transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isPinned
            ? "bottom-2.5 sm:bottom-3.5 rounded-[10px] translate-y-0 opacity-100 ring-1 ring-black/5 dark:ring-white/10"
            : cn(
                "bottom-0 rounded-t-[10px] rounded-b-none ring-1 ring-black/5 dark:ring-white/10",
                isSlidDown 
                  ? "translate-y-[calc(100%-14px)] opacity-90 hover:translate-y-0 hover:opacity-100" 
                  : "translate-y-0 opacity-100"
              )
        );
      case "full-width":
        return cn(
          "fixed bottom-0 left-0 right-0 z-40 w-full h-[60px] sm:h-[64px] rounded-none floating-glass-footer transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isSlidDown
            ? "translate-y-[calc(100%-14px)] opacity-90 hover:translate-y-0 hover:opacity-100"
            : "translate-y-0 opacity-100"
        );
      case "auto-hide":
      case "fixed-bottom":
      default:
        return cn(
          "fixed bottom-0 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-16px)] sm:w-[94%] md:w-[90%] lg:w-[88%] xl:w-[85%] max-w-[1250px] h-[60px] sm:h-[64px] rounded-t-[10px] rounded-b-none floating-glass-footer ring-1 ring-black/5 dark:ring-white/10 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isSlidDown
            ? "translate-y-[calc(100%-14px)] opacity-90 hover:translate-y-0 hover:opacity-100"
            : "translate-y-0 opacity-100"
        );
    }
  };

  const getActionCircleStyle = (_type?: "ai" | "sound" | "cursor" | "settings") => {
    switch (theme as any) {
      case "glass-dark-neon":
        return "bg-slate-950/70 hover:bg-slate-900 border border-cyan-400/40 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.2)] hover:border-pink-500 hover:shadow-[0_0_18px_rgba(0,240,255,0.4)] backdrop-blur-md hover:scale-108 transition-all";
      case "modern-light-glass":
        return "bg-white/85 hover:bg-white border border-indigo-200 text-indigo-700 shadow-xs hover:scale-108";
      case "light":
      default:
        return "bg-slate-100/90 hover:bg-white border border-slate-300 text-slate-800 shadow-xs hover:scale-108";
    }
  };

  return (
    <>
      {/* Main Footer Dock Container */}
      <footer 
        id="footer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group py-1 footer-bento-container px-3 sm:px-5 md:px-6 flex flex-col justify-center cursor-default ${getPlacementClass()} ${getFooterSurfaceStyle()} !rounded-bl-none !rounded-br-none`}
      >
        {/* Unpinned / Auto-hide Grab Handle & Peek Indicator */}
        {(!isPinned || footerConfig.placement === "auto-hide") && (
          <div 
            onClick={() => setIsHovered((prev) => !prev)}
            className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer group/handle py-0.5 z-20"
            title={isSlidDown ? (isVi ? "Rê chuột hoặc chạm để mở footer" : "Hover or tap to expand footer") : undefined}
          >
            <div className={cn(
              "h-1 sm:h-1.5 rounded-full transition-all duration-300",
              isSlidDown 
                ? "w-14 sm:w-18 bg-blue-500/80 dark:bg-cyan-400/80 shadow-[0_0_10px_rgba(59,130,246,0.6)] animate-pulse" 
                : "w-8 bg-slate-300/80 dark:bg-slate-600/80 hover:bg-slate-400 dark:hover:bg-slate-500"
            )} />
          </div>
        )}

        {/* Extended Hover Trigger Zone (Invisible hit-area slightly above edge when slid down) */}
        {isSlidDown && (
          <div 
            className="absolute -top-4 left-0 right-0 h-5 pointer-events-auto cursor-pointer" 
            aria-hidden="true"
          />
        )}

      <div className="w-full flex flex-row justify-between items-center gap-2 relative">
        {/* LEFT CONTAINER: Time/Date & Weather Widget + Nhóm Icon Cursor & Âm thanh */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 z-10">
          {(footerConfig.showWeather || footerConfig.showClock) && (
            <FooterWeather layoutMode="vertical" timeString={timeString} dateString={dateString} />
          )}
        </div>

        {/* CENTER CONTAINER: Nút chuyển trang tích hợp trực tiếp vào thanh Footer */}
        {footerConfig.showNextPageButton && (
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10 pointer-events-auto">
            <button
              type="button"
              onClick={currentIndex === SECTION_ORDER.length - 1 ? () => {
                if (onNavigate) {
                  onNavigate("home");
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              } : handleNextPage}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:via-blue-500 hover:to-indigo-500 text-white border border-sky-300/90 shadow-md hover:shadow-sky-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group/nextbtn relative shrink-0"
              title={currentIndex === SECTION_ORDER.length - 1 ? (isVi ? "Lên đầu trang" : "To top") : (isVi ? "Tới trang tiếp theo" : "Next page")}
            >
              <span className="absolute -inset-0.5 rounded-full bg-sky-400/40 blur-xs group-hover/nextbtn:opacity-100 opacity-60 transition-opacity pointer-events-none -z-10" />
              {currentIndex === SECTION_ORDER.length - 1 ? (
                <ChevronUp className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white group-hover/nextbtn:-translate-y-0.5 transition-transform duration-200" />
              ) : (
                <ChevronDown className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white group-hover/nextbtn:translate-y-0.5 transition-transform duration-200 animate-pulse" />
              )}
            </button>
          </div>
        )}

        {/* RIGHT CONTAINER: Controls & Actions (AI, Cài đặt footer, Pin) */}
        <div className="flex items-center justify-end gap-1.5 sm:gap-2 ml-auto shrink-0 z-10">
          {/* 3. AI Assistant Action Button */}
          {footerConfig.showAIAssistant && (
            <button
              type="button"
              onClick={handleOpenAIAssistant}
              className={cn("w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all cursor-pointer relative group/aibtn", getActionCircleStyle("ai"))}
              title={isVi ? "Trợ lý AI Hỗ trợ" : "AI Assistant"}
            >
              <Bot className="w-4 h-4 text-purple-500 dark:text-purple-400" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            </button>
          )}

          {/* Export PDF Bento Action Button */}
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("open-resume-export"));
            }}
            className={cn("w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all cursor-pointer relative group/pdfbtn", getActionCircleStyle("settings"))}
            title={isVi ? "Xuất Hồ sơ PDF Bento" : "Export Executive Resume PDF"}
          >
            <Printer className="w-4 h-4 text-red-500 dark:text-red-400 group-hover/pdfbtn:scale-110 transition-transform duration-200" />
          </button>

          {/* Vách ngăn / Vertical Separator Divider */}
          <div className="w-[1.5px] h-5 sm:h-6 bg-slate-300 dark:bg-slate-700/80 mx-0.5 sm:mx-1 rounded-full shrink-0" />

          {/* 4. Tùy chỉnh đặt Footer Button (Footer Settings) */}
          <button
            type="button"
            onClick={() => openFooterModal("footer")}
            className={cn(
              "w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all cursor-pointer relative",
              getActionCircleStyle("settings")
            )}
            title={isVi ? "Tùy chỉnh đặt chân trang (Footer)" : "Footer Customization Settings"}
          >
            <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400" />
          </button>

          {/* 5. Nút Ghim (Pin Button) */}
          {footerConfig.isPinned !== undefined && (
            <button
              type="button"
              onClick={handleTogglePin}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer border shadow-2xs ${
                footerConfig.isPinned
                  ? "bg-blue-600/20 dark:bg-cyan-500/20 text-blue-600 dark:text-cyan-400 border-blue-500/50 dark:border-cyan-400/60 shadow-md scale-105"
                  : "bg-slate-100/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border-slate-200 dark:border-slate-700"
              }`}
              title={
                footerConfig.isPinned
                  ? (isVi ? "Đã ghim footer (Click để bỏ ghim & tự động trượt ẩn)" : "Footer pinned (Click to unpin & auto-hide)")
                  : (isVi ? "Đang bỏ ghim (Click để ghim giữ cố định)" : "Footer unpinned (Click to pin fixed)")
              }
            >
              <Pin className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300 ${footerConfig.isPinned ? "rotate-45 text-blue-600 dark:text-cyan-400 fill-blue-500/30 dark:fill-cyan-400/30 stroke-[2.5]" : "stroke-[2]"}`} />
            </button>
          )}
        </div>
      </div>
    </footer>
    </>
  );
}

export default memo(Footer);
