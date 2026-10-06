import React, { useState, useEffect, useRef, memo, MouseEvent } from "react";
import {
  ChevronDown,
  ChevronUp,
  Bot,
  Volume2,
  VolumeX,
  Pin,
  MousePointer,
  Sliders,
  Printer,
  LayoutGrid,
  LayoutTemplate,
  Globe,
  Palette,
  Sun,
  Moon,
  Check,
  Sparkles,
  Images
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { useTheme, ThemeType, COLOR_PRESETS } from "../context/ThemeContext";
import { THEME_LIST } from "../data/themesData";
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
  "experience",
  "projects",
  "interview",
  "tuvi",
  "systems",
  "contact",
  "wallpapers",
  "customization"
];

function Footer({ theme: propTheme, activeSection = "home", onNavigate }: FooterProps) {
  const themeContext = useTheme();
  const theme = propTheme || themeContext.theme;
  const borderRadius = themeContext.borderRadius ?? 10;
  const { lang, setLang } = useLanguage();
  const isVi = lang === "vi";

  // Quick settings state variables
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [isStackHovered, setIsStackHovered] = useState(false);
  const [isStackPinned, setIsStackPinned] = useState(false);
  const stackTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isStackExpanded = isStackHovered || isStackPinned || isThemeDropdownOpen || isColorDropdownOpen;

  const handleStackMouseEnter = () => {
    if (stackTimerRef.current) {
      clearTimeout(stackTimerRef.current);
      stackTimerRef.current = null;
    }
    setIsStackHovered(true);
  };

  const handleStackMouseLeave = () => {
    stackTimerRef.current = setTimeout(() => {
      setIsStackHovered(false);
      setIsStackPinned(false);
      setIsThemeDropdownOpen(false);
      setIsColorDropdownOpen(false);
    }, 450);
  };

  // Global Contexts
  const { 
    footerConfig, 
    togglePin, 
    setIsFooterModalOpen, 
    openFooterModal,
    isFooterHovered: isHovered, 
    setIsFooterHovered: setIsHovered 
  } = useFooter();
  const { soundConfig, toggleMute, setIsSoundModalOpen, playClick } = useSound();
  const { setIsCursorModalOpen } = useCursor();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredFooterIcon, setHoveredFooterIcon] = useState<string | null>(null);

  // Unpin & slide-down state logic
  const isPinned = footerConfig.isPinned !== false;
  const isSlidDown = !isPinned && !isHovered;

  // Collapse footer & dropdowns if clicked outside
  useEffect(() => {
    const handleOutsideInteraction = (e: MouseEvent | TouchEvent) => {
      const footerEl = document.getElementById("footer");
      const themePopupEl = document.getElementById("footer-theme-popover");
      const target = e.target as Node;
      
      if (themePopupEl && !themePopupEl.contains(target) && !footerEl?.contains(target)) {
        setIsThemeDropdownOpen(false);
      }
      if (isPinned || !isHovered) return;
      if (footerEl && !footerEl.contains(target)) {
        setIsHovered(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideInteraction as any);
    document.addEventListener("touchstart", handleOutsideInteraction as any);
    return () => {
      document.removeEventListener("mousedown", handleOutsideInteraction as any);
      document.removeEventListener("touchstart", handleOutsideInteraction as any);
    };
  }, [isPinned, isHovered, isThemeDropdownOpen]);

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

  const handleNavigate = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      }
      window.dispatchEvent(new CustomEvent("app-navigate", { detail: sectionId }));
    }
  };

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

  // Base container styles matched exactly to Header's glass container styling with enhanced dark mode
  const getFooterSurfaceStyle = () => {
    return cn(
      "border-t border-x border-b-0",
      getUnifiedSurfaceStyle(theme)
    );
  };

  // Placement class resolver (Áp dụng linh hoạt bo cong góc từ Tùy chỉnh độ bo cong)
  const getPlacementClass = () => {
    switch (footerConfig.placement) {
      case "floating-pill":
        return cn(
          "fixed left-1/2 -translate-x-1/2 z-40 w-[calc(100%-16px)] sm:w-[94%] md:w-[90%] lg:w-[88%] xl:w-[85%] max-w-[1250px] h-[60px] sm:h-[64px] min-[1250px]:h-[64px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-none !shadow-none",
          isPinned
            ? "bottom-2.5 sm:bottom-3.5 translate-y-0 opacity-100"
            : cn(
                "bottom-0",
                isSlidDown 
                  ? "translate-y-[calc(100%-14px)] opacity-90 hover:translate-y-0 hover:opacity-100" 
                  : "translate-y-0 opacity-100"
              )
        );
      case "full-width":
        return cn(
          "fixed bottom-0 left-0 right-0 z-40 w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-none !shadow-none !overflow-visible",
          isThemeDropdownOpen || isColorDropdownOpen ? "!z-[999] !opacity-100 !translate-y-0" : "",
          isSlidDown && !isThemeDropdownOpen && !isColorDropdownOpen
            ? "translate-y-[calc(100%-14px)] opacity-90 hover:translate-y-0 hover:opacity-100"
            : "translate-y-0 opacity-100"
        );
      case "auto-hide":
      case "fixed-bottom":
      default:
        return cn(
          "fixed bottom-0 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-16px)] sm:w-[94%] md:w-[90%] lg:w-[88%] xl:w-[85%] max-w-[1250px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-none !shadow-none !overflow-visible",
          isThemeDropdownOpen || isColorDropdownOpen ? "!z-[999] !opacity-100 !translate-y-0" : "",
          isSlidDown && !isThemeDropdownOpen && !isColorDropdownOpen
            ? "translate-y-[calc(100%-14px)] opacity-90 hover:translate-y-0 hover:opacity-100"
            : "translate-y-0 opacity-100"
        );
    }
  };

  const isFloatingPillPinned = footerConfig.placement === "floating-pill" && isPinned;

  const footerCustomStyle: React.CSSProperties = {
    height: "var(--header-height, 75px)",
    padding: "5px",
    borderTopLeftRadius: "var(--theme-radius-card, 14px)",
    borderTopRightRadius: "var(--theme-radius-card, 14px)",
    borderBottomLeftRadius: isFloatingPillPinned ? "var(--theme-radius-card, 14px)" : "0px",
    borderBottomRightRadius: isFloatingPillPinned ? "var(--theme-radius-card, 14px)" : "0px",
    overflow: "visible"
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
        onMouseLeave={() => {
          if (!isThemeDropdownOpen && !isColorDropdownOpen) {
            setIsHovered(false);
          }
        }}
        style={footerCustomStyle}
        className={`group p-[5px] footer-bento-container flex flex-col justify-center cursor-default !overflow-visible ${getPlacementClass()} ${getFooterSurfaceStyle()}`}
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

      <div className="w-full h-full flex flex-row items-center justify-between relative px-0.5 sm:px-1">
        {/* 1. BÊN TRÁI: Ngày giờ và thời tiết (padding 5px, co giãn tự động theo nội dung) */}
        <div className="flex-1 flex items-center justify-start gap-1.5 sm:gap-2 min-w-0 p-[5px] z-10">
          {(footerConfig.showWeather || footerConfig.showClock) && (
            <FooterWeather layoutMode="vertical" timeString={timeString} dateString={dateString} />
          )}
        </div>

        {/* LINE VÁCH NGĂN 1 (Giữa Bên Trái và Chính Giữa) */}
        <div className="h-6 w-[1px] bg-slate-300/80 dark:bg-white/20 mx-1 sm:mx-1.5 shrink-0" aria-hidden="true" />

        {/* 2. CHÍNH GIỮA: Nút tới trang và Nút hướng dẫn (Luôn nằm chính giữa Footer ở mọi kích thước thiết bị, padding 5px) */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 shrink-0 p-[5px] z-10 pointer-events-auto">
          {footerConfig.showNextPageButton && (
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
                <ChevronUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white group-hover/nextbtn:-translate-y-0.5 transition-transform duration-200" />
              ) : (
                <ChevronDown className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white group-hover/nextbtn:translate-y-0.5 transition-transform duration-200 animate-pulse" />
              )}
            </button>
          )}
        </div>

        {/* LINE VÁCH NGĂN 2 (Giữa Chính Giữa và Bên Phải) */}
        <div className="h-6 w-[1px] bg-slate-300/80 dark:bg-white/20 mx-1 sm:mx-1.5 shrink-0" aria-hidden="true" />

        {/* 3. BÊN PHẢI: Menu icon Nav Bar Glass xếp chồng theo chiều ngang, vẫn thấy icon, nút bo cong 999px */}
        <div className="flex-1 flex items-center justify-end -space-x-4 sm:-space-x-5 hover:space-x-1.5 sm:hover:space-x-2 transition-all duration-300 min-w-0 p-[5px] z-10 select-none overflow-x-auto no-scrollbar group/footerstack">
          {/* 1. Nút In PDF */}
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("open-resume-export"));
            }}
            className="w-[98px] sm:w-[106px] h-8 sm:h-8.5 pl-2.5 pr-2 py-1 rounded-[999px] flex items-center justify-start gap-1.5 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-600 dark:text-rose-400 backdrop-blur-md shadow-md transition-all duration-200 cursor-pointer active:scale-95 shrink-0 relative z-10 hover:z-50 hover:-translate-y-1 hover:scale-105"
            title={isVi ? "In PDF" : "Print PDF"}
          >
            <Printer className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
            <span className="text-[14px] sm:text-[15px] font-bold text-rose-600 dark:text-rose-400 whitespace-nowrap">
              {isVi ? "In PDF" : "Print PDF"}
            </span>
          </button>

          {/* 2. Nút Ngôn ngữ */}
          <button
            type="button"
            onClick={() => {
              setLang(lang === "vi" ? "en" : "vi");
            }}
            className="w-[98px] sm:w-[106px] h-8 sm:h-8.5 pl-2.5 pr-2 py-1 rounded-[999px] flex items-center justify-start gap-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 backdrop-blur-md shadow-md transition-all duration-200 cursor-pointer active:scale-95 shrink-0 relative z-20 hover:z-50 hover:-translate-y-1 hover:scale-105"
            title={isVi ? "Ngôn ngữ" : "Language"}
          >
            <Globe className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span className="text-[14px] sm:text-[15px] font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
              {isVi ? "Ngôn ngữ" : "Language"}
            </span>
          </button>

            {/* 3. Nút Giao diện (Theme) */}
            <div className="relative z-30 hover:z-50 shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsThemeDropdownOpen((prev) => !prev);
                }}
                className={cn(
                  "w-[98px] sm:w-[106px] h-8 sm:h-8.5 pl-2.5 pr-2 py-1 rounded-[999px] flex items-center justify-start gap-1.5 border backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md active:scale-95 shrink-0 hover:-translate-y-1 hover:scale-105",
                  isThemeDropdownOpen
                    ? "border-indigo-500 bg-indigo-500/30 text-indigo-600 dark:text-cyan-400 font-bold z-50 scale-105"
                    : "border-indigo-500/40 bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-600 dark:text-cyan-400"
                )}
                title={isVi ? "Giao diện" : "Select Theme"}
              >
                <Palette className="w-4 h-4 shrink-0 text-indigo-600 dark:text-cyan-400" />
                <span className="text-[14px] sm:text-[15px] font-bold text-indigo-600 dark:text-cyan-400 whitespace-nowrap">
                  {isVi ? "Giao diện" : "Theme"}
                </span>
              </button>

              {/* FLOATING THEME SELECTION POPOVER */}
              <AnimatePresence>
                {isThemeDropdownOpen && (
                  <motion.div
                    id="footer-theme-popover"
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 w-[300px] sm:w-[330px] max-w-[92vw] max-h-[440px] overflow-hidden rounded-2xl bg-white/95 dark:bg-[#0c101d]/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_20px_rgba(0,240,255,0.15)] z-[100] flex flex-col text-left font-sans"
                  >
                    {/* Header */}
                    <div className="p-3 border-b border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-2 bg-slate-50/70 dark:bg-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-500 text-white flex items-center justify-center shadow-xs">
                          <Palette className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                            {isVi ? "Chọn Giao diện" : "Select UI Theme"}
                          </h4>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            {THEME_LIST.length} {isVi ? "phong cách thiết kế" : "design styles"}
                          </span>
                        </div>
                      </div>

                      {/* Quick Light/Dark Toggle */}
                      <div className="flex items-center gap-1 p-0.5 bg-slate-200/60 dark:bg-white/10 rounded-lg">
                        <button
                          type="button"
                          onClick={() => {
                            themeContext.setThemeMode("light");
                            themeContext.setTheme("glass-light-multicolor");
                          }}
                          className={cn(
                            "p-1 rounded-md text-3xs font-bold transition-all cursor-pointer",
                            themeContext.themeMode === "light" || theme === "glass-light-multicolor"
                              ? "bg-white dark:bg-slate-800 text-amber-600 shadow-xs"
                              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          )}
                          title={isVi ? "Giao diện Sáng" : "Light Theme"}
                        >
                          <Sun className="w-3 h-3 text-amber-500" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            themeContext.setThemeMode("dark");
                            themeContext.setTheme("glass-dark-neon");
                          }}
                          className={cn(
                            "p-1 rounded-md text-3xs font-bold transition-all cursor-pointer",
                            themeContext.themeMode === "dark" || theme === "glass-dark-neon"
                              ? "bg-white dark:bg-slate-800 text-cyan-400 shadow-xs"
                              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          )}
                          title={isVi ? "Giao diện Tối Neon" : "Dark Neon Theme"}
                        >
                          <Moon className="w-3 h-3 text-cyan-400" />
                        </button>
                      </div>
                    </div>

                    {/* Scrollable Themes List */}
                    <div className="p-2 space-y-1.5 overflow-y-auto max-h-[300px] custom-scrollbar">
                      {THEME_LIST.map((item) => {
                        const isSelected = theme === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              themeContext.setTheme(item.id as any);
                            }}
                            className={cn(
                              "p-2.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-2.5 group",
                              isSelected
                                ? "bg-blue-600 text-white dark:bg-cyan-500/20 dark:text-white border-blue-600 dark:border-cyan-400 shadow-md scale-[1.01]"
                                : "bg-slate-50/60 dark:bg-white/5 border-slate-200/60 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200"
                            )}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <span className={cn(
                                  "text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md",
                                  isSelected ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400"
                                )}>
                                  {item.num}
                                </span>
                                <h5 className="text-xs font-bold truncate">
                                  {isVi ? item.nameVi : item.name}
                                </h5>
                              </div>
                              <p className={cn(
                                "text-[10px] truncate",
                                isSelected ? "text-white/80 dark:text-cyan-200" : "text-slate-500 dark:text-slate-400"
                              )}>
                                {isVi ? item.taglineVi : item.tagline}
                              </p>

                              {/* Mini Swatches */}
                              <div className="flex items-center gap-1 mt-1.5">
                                {[item.colors.primary, item.colors.secondary, item.colors.accent, item.colors.background].map((hex, i) => (
                                  <span
                                    key={i}
                                    className="w-2.5 h-2.5 rounded-full border border-black/15 shadow-2xs"
                                    style={{ backgroundColor: hex }}
                                  />
                                ))}
                              </div>
                            </div>

                            {isSelected ? (
                              <span className="w-5 h-5 rounded-full bg-white text-blue-600 dark:bg-cyan-400 dark:text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </span>
                            ) : (
                              <span className="text-[10px] text-slate-400 group-hover:text-blue-500 dark:group-hover:text-cyan-400 font-bold shrink-0">
                                {isVi ? "Chọn" : "Select"}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Footer Options in Popover */}
                    <div className="p-2 border-t border-slate-200/60 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 flex items-center justify-between gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setIsThemeDropdownOpen(false);
                          themeContext.openThemeModal();
                        }}
                        className="text-3xs font-bold text-indigo-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer py-1 px-1.5 rounded-lg hover:bg-indigo-500/10"
                        title={isVi ? "Mở Studio Tùy chỉnh toàn diện" : "Open Theme Customization Studio"}
                      >
                        <span>{isVi ? "Mở Studio Tùy chỉnh →" : "Open Theme Studio →"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsThemeDropdownOpen(false)}
                        className="text-3xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white px-2 py-1 rounded-lg hover:bg-slate-200/60 dark:hover:bg-white/10 cursor-pointer"
                        title={isVi ? "Đóng trình chọn giao diện" : "Close Theme Selector"}
                      >
                        {isVi ? "Đóng" : "Close"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          {/* 4. Nút Hình nền */}
          <button
            type="button"
            onClick={() => handleNavigate("wallpapers")}
            className={cn(
              "w-[98px] sm:w-[106px] h-8 sm:h-8.5 pl-2.5 pr-2 py-1 rounded-[999px] flex items-center justify-start gap-1.5 border backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md active:scale-95 shrink-0 relative z-40 hover:z-50 hover:-translate-y-1 hover:scale-105",
              activeSection === "wallpapers"
                ? "border-sky-500 bg-sky-500/25 text-sky-600 dark:text-sky-400 font-bold z-50 scale-105"
                : "border-sky-500/40 bg-sky-500/15 hover:bg-sky-500/25 text-sky-600 dark:text-sky-400"
            )}
            title={isVi ? "Hình nền" : "Wallpapers"}
          >
            <Images className="w-4 h-4 shrink-0 text-sky-600 dark:text-sky-400" />
            <span className="text-[14px] sm:text-[15px] font-bold text-sky-600 dark:text-sky-400 whitespace-nowrap">
              {isVi ? "Hình nền" : "Wallpapers"}
            </span>
          </button>

          {/* 5. Nút Tùy chỉnh */}
          <button
            type="button"
            onClick={() => handleNavigate("customization")}
            className={cn(
              "w-[98px] sm:w-[106px] h-8 sm:h-8.5 pl-2.5 pr-2 py-1 rounded-[999px] flex items-center justify-start gap-1.5 border backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md active:scale-95 shrink-0 relative z-50 hover:z-50 hover:-translate-y-1 hover:scale-105",
              activeSection === "customization"
                ? "border-amber-500 bg-amber-500/25 text-amber-600 dark:text-amber-400 font-bold z-50 scale-105"
                : "border-amber-500/40 bg-amber-500/15 hover:bg-amber-500/25 text-amber-600 dark:text-amber-400"
            )}
            title={isVi ? "Tùy chỉnh" : "Settings"}
          >
            <Sliders className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <span className="text-[14px] sm:text-[15px] font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">
              {isVi ? "Tùy chỉnh" : "Settings"}
            </span>
          </button>
        </div>
      </div>
    </footer>

    {/* Floating Pin Button (Nằm ngoài footer, bên phải cách header 10px) */}
    {footerConfig.isPinned !== undefined && (
      <div 
        className="fixed top-3 right-3 sm:right-4 z-50 flex items-center pointer-events-auto"
        style={{
          top: "12px",
          right: "12px"
        }}
      >
        <button
          type="button"
          onClick={handleTogglePin}
          onMouseEnter={() => setHoveredFooterIcon("pin")}
          onMouseLeave={() => setHoveredFooterIcon(null)}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer border shadow-lg backdrop-blur-2xl relative group/pinbtn ${
            footerConfig.isPinned
              ? "bg-blue-600/20 dark:bg-cyan-500/20 text-blue-600 dark:text-cyan-400 border-blue-500/60 dark:border-cyan-400/60 shadow-blue-500/20 scale-105"
              : "bg-white/85 dark:bg-slate-900/85 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 border-slate-200/90 dark:border-white/15"
          }`}
          title={
            footerConfig.isPinned
              ? (isVi ? "Đã ghim footer (Click để bỏ ghim & tự động trượt ẩn)" : "Footer pinned (Click to unpin & auto-hide)")
              : (isVi ? "Đang bỏ ghim (Click để ghim giữ cố định)" : "Footer unpinned (Click to pin fixed)")
          }
        >
          <Pin className={`w-4.5 h-4.5 sm:w-5 sm:h-5 transition-all duration-300 ${footerConfig.isPinned ? "rotate-45 text-blue-600 dark:text-cyan-400 fill-blue-500/30 dark:fill-cyan-400/30 stroke-[2.5]" : "stroke-[2]"}`} />
          <AnimatePresence>
            {hoveredFooterIcon === "pin" && (
              <motion.span 
                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.9 }}
                className="absolute top-full mt-2 right-0 px-2.5 py-1 rounded-lg text-3xs font-extrabold whitespace-nowrap bg-slate-900/95 dark:bg-[#0c101d]/95 text-white dark:text-cyan-300 shadow-[0_8px_25px_rgba(0,0,0,0.6)] pointer-events-none z-50 uppercase tracking-wider border border-white/10 dark:border-cyan-400/30 backdrop-blur-md"
              >
                {footerConfig.isPinned ? (isVi ? "Bỏ ghim" : "Unpin") : (isVi ? "Ghim" : "Pin")}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    )}
    </>
  );
}

export default memo(Footer);
