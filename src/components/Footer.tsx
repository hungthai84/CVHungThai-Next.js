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
  Images,
  FileText,
  Settings
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { useTheme, ThemeType, COLOR_PRESETS } from "../context/ThemeContext";
import { useLayout, LAYOUT_OPTIONS } from "../context/LayoutContext";
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
  const [isPdfDropdownOpen, setIsPdfDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isWallpaperDropdownOpen, setIsWallpaperDropdownOpen] = useState(false);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isLayoutDropdownOpen, setIsLayoutDropdownOpen] = useState(false);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [isStackHovered, setIsStackHovered] = useState(false);
  const [isStackPinned, setIsStackPinned] = useState(false);
  const stackTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { layoutMode, setLayoutMode } = useLayout();

  const isStackExpanded = isStackHovered || isStackPinned || isPdfDropdownOpen || isLangDropdownOpen || isThemeDropdownOpen || isLayoutDropdownOpen || isColorDropdownOpen || isWallpaperDropdownOpen || isSettingsDropdownOpen;

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
      setIsPdfDropdownOpen(false);
      setIsLangDropdownOpen(false);
      setIsThemeDropdownOpen(false);
      setIsLayoutDropdownOpen(false);
      setIsColorDropdownOpen(false);
      setIsWallpaperDropdownOpen(false);
      setIsSettingsDropdownOpen(false);
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
      const layoutPopupEl = document.getElementById("footer-layout-popover");
      const target = e.target as Node;
      
      const pdfPopupEl = document.getElementById("footer-pdf-popover");
      const langPopupEl = document.getElementById("footer-lang-popover");
      const wallpaperPopupEl = document.getElementById("footer-wallpaper-popover");
      const settingsPopupEl = document.getElementById("footer-settings-popover");

      if (pdfPopupEl && !pdfPopupEl.contains(target) && !footerEl?.contains(target)) {
        setIsPdfDropdownOpen(false);
      }
      if (langPopupEl && !langPopupEl.contains(target) && !footerEl?.contains(target)) {
        setIsLangDropdownOpen(false);
      }
      if (themePopupEl && !themePopupEl.contains(target) && !footerEl?.contains(target)) {
        setIsThemeDropdownOpen(false);
      }
      if (layoutPopupEl && !layoutPopupEl.contains(target) && !footerEl?.contains(target)) {
        setIsLayoutDropdownOpen(false);
      }
      if (wallpaperPopupEl && !wallpaperPopupEl.contains(target) && !footerEl?.contains(target)) {
        setIsWallpaperDropdownOpen(false);
      }
      if (settingsPopupEl && !settingsPopupEl.contains(target) && !footerEl?.contains(target)) {
        setIsSettingsDropdownOpen(false);
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
  }, [isPinned, isHovered, isThemeDropdownOpen, isLayoutDropdownOpen]);

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
          "fixed left-1/2 -translate-x-1/2 z-40 w-[calc(100%-16px)] sm:w-[94%] md:w-[90%] lg:w-[88%] xl:w-[85%] max-w-[1250px] min-h-[56px] sm:min-h-[64px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-none !shadow-none",
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
          isPdfDropdownOpen || isLangDropdownOpen || isThemeDropdownOpen || isLayoutDropdownOpen || isColorDropdownOpen || isWallpaperDropdownOpen || isSettingsDropdownOpen ? "!z-[999] !opacity-100 !translate-y-0" : "",
          isSlidDown && !isThemeDropdownOpen && !isColorDropdownOpen
            ? "translate-y-[calc(100%-14px)] opacity-90 hover:translate-y-0 hover:opacity-100"
            : "translate-y-0 opacity-100"
        );
      case "auto-hide":
      case "fixed-bottom":
      default:
        return cn(
          "fixed bottom-0 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-16px)] sm:w-[94%] md:w-[90%] lg:w-[88%] xl:w-[85%] max-w-[1250px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-none !shadow-none !overflow-visible",
          isPdfDropdownOpen || isLangDropdownOpen || isThemeDropdownOpen || isLayoutDropdownOpen || isColorDropdownOpen || isWallpaperDropdownOpen || isSettingsDropdownOpen ? "!z-[999] !opacity-100 !translate-y-0" : "",
          isSlidDown && !isThemeDropdownOpen && !isColorDropdownOpen
            ? "translate-y-[calc(100%-14px)] opacity-90 hover:translate-y-0 hover:opacity-100"
            : "translate-y-0 opacity-100"
        );
    }
  };

  const isFloatingPillPinned = footerConfig.placement === "floating-pill" && isPinned;

  const footerCustomStyle: React.CSSProperties = {
    minHeight: "var(--header-height, 64px)",
    height: "auto",
    padding: "6px 8px",
    borderTopLeftRadius: "var(--theme-radius-card, 14px)",
    borderTopRightRadius: "var(--theme-radius-card, 14px)",
    borderBottomLeftRadius: isFloatingPillPinned ? "var(--theme-radius-card, 14px)" : "0px",
    borderBottomRightRadius: isFloatingPillPinned ? "var(--theme-radius-card, 14px)" : "0px",
    overflow: "visible",
    background: "transparent",
    boxShadow: "none"
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
        className={`group p-[5px] footer-bento-container flex flex-col justify-center cursor-default !overflow-visible bg-transparent border-transparent shadow-none ${getPlacementClass()}`}
      >
        {/* Unpinned / Auto-hide Grab Handle & Peek Indicator with double click to pin */}
        {!isPinned && (
          <div 
            onDoubleClick={(e) => {
              e.stopPropagation();
              togglePin();
            }}
            onClick={() => setIsHovered((prev) => !prev)}
            className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer group/handle py-1 z-30"
            title={isVi ? "Double click để ghim/bỏ ghim Footer, click để mở" : "Double click to pin/unpin Footer, click to expand"}
          >
            <div className="h-1.5 w-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse hover:scale-110 transition-transform" />
          </div>
        )}

        {/* Extended Hover Trigger Zone (Invisible hit-area slightly above edge when slid down) */}
        {isSlidDown && (
          <div 
            className="absolute -top-4 left-0 right-0 h-5 pointer-events-auto cursor-pointer" 
            aria-hidden="true"
          />
        )}

      <div className="w-full h-full flex flex-row items-center justify-end relative px-2 sm:px-4">
        {/* FOOTER STACK CONTAINER: Print PDF, Ngôn ngữ, Giao diện, Bố cục xếp chồng ngang nằm bên phải */}
        <div 
          onMouseEnter={handleStackMouseEnter}
          onMouseLeave={handleStackMouseLeave}
          className={cn(
            "flex items-center justify-end ml-auto transition-all duration-300 min-w-0 p-[5px] z-10 select-none overflow-visible group/footerstack",
            isStackExpanded ? "space-x-1.5 sm:space-x-2" : "-space-x-[74px] sm:-space-x-[78px]"
          )}
        >
          {/* 1. Nút In PDF kèm Menu lựa chọn */}
          <div className="relative z-10 hover:z-50 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsLangDropdownOpen(false);
                setIsThemeDropdownOpen(false);
                setIsLayoutDropdownOpen(false);
                setIsWallpaperDropdownOpen(false);
                setIsSettingsDropdownOpen(false);
                setIsPdfDropdownOpen((prev) => !prev);
              }}
              className={cn(
                "h-8 sm:h-8.5 pl-2.5 pr-2 py-1 rounded-[999px] flex items-center justify-start gap-1.5 border backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md active:scale-95 shrink-0 overflow-hidden",
                isStackExpanded
                  ? "w-[98px] sm:w-[106px] z-50 scale-105"
                  : "w-10 sm:w-11 group-hover/footerstack:w-[98px] group-hover/footerstack:sm:w-[106px]",
                isPdfDropdownOpen
                  ? "border-rose-500 bg-rose-500/30 text-rose-600 dark:text-rose-400 font-bold z-50 scale-105"
                  : "border-rose-500/40 bg-rose-500/15 hover:bg-rose-500/25 text-rose-600 dark:text-rose-400"
              )}
              title={isVi ? "In PDF & Xuất hồ sơ" : "Print PDF & Export Resume"}
            >
              <Printer className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
              <span className={cn(
                "text-[14px] sm:text-[15px] font-bold text-rose-600 dark:text-rose-400 whitespace-nowrap transition-opacity duration-300",
                isStackExpanded ? "opacity-100" : "opacity-0 group-hover/footerstack:opacity-100"
              )}>
                {isVi ? "In PDF" : "Print PDF"}
              </span>
            </button>

            {/* FLOATING PDF EXPORT POPOVER */}
            <AnimatePresence>
              {isPdfDropdownOpen && (
                <motion.div
                  id="footer-pdf-popover"
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 w-[290px] sm:w-[320px] max-w-[92vw] overflow-hidden rounded-2xl bg-white/95 dark:bg-[#0c101d]/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_20px_rgba(244,63,94,0.15)] z-[100] flex flex-col text-left font-sans"
                >
                  <div className="p-3 border-b border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-2 bg-slate-50/70 dark:bg-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-600 text-white flex items-center justify-center shadow-xs">
                        <Printer className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                          {isVi ? "Tùy chọn Xuất & In PDF" : "PDF Export Options"}
                        </h4>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          {isVi ? "Hồ sơ Executive C-Level" : "C-Level Executive Resume"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 space-y-1.5">
                    <div
                      onClick={() => {
                        setIsPdfDropdownOpen(false);
                        window.dispatchEvent(new CustomEvent("open-resume-export"));
                      }}
                      className="p-2.5 rounded-xl border border-slate-200/60 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 hover:bg-rose-500/10 dark:hover:bg-rose-500/15 hover:border-rose-500/40 text-slate-800 dark:text-slate-200 transition-all cursor-pointer flex items-center justify-between gap-2.5 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold truncate group-hover:text-rose-600 dark:group-hover:text-rose-400">
                            {isVi ? "Hồ sơ Giám đốc Điều hành (A4 Chuẩn)" : "Executive Resume (Standard A4)"}
                          </h5>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            {isVi ? "Tùy chỉnh font, màu, bố cục chuyên nghiệp" : "Full customization & print styling"}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-rose-500 font-bold shrink-0">{isVi ? "Mở" : "Open"}</span>
                    </div>

                    <div
                      onClick={() => {
                        setIsPdfDropdownOpen(false);
                        window.print();
                      }}
                      className="p-2.5 rounded-xl border border-slate-200/60 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 transition-all cursor-pointer flex items-center justify-between gap-2.5 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                          <Printer className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold truncate">
                            {isVi ? "In nhanh trang hiện tại (Trình duyệt)" : "Quick Browser Print"}
                          </h5>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            {isVi ? "Lệnh Ctrl + P chuẩn trình duyệt" : "Native browser print dialog"}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 group-hover:text-slate-600 font-bold shrink-0">{isVi ? "In" : "Print"}</span>
                    </div>
                  </div>

                  <div className="p-2 border-t border-slate-200/60 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 flex items-center justify-between">
                    <span className="text-3xs text-slate-500 dark:text-slate-400">{isVi ? "Định dạng PDF chuyên nghiệp" : "Professional PDF"}</span>
                    <button
                      type="button"
                      onClick={() => setIsPdfDropdownOpen(false)}
                      className="text-3xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white px-2 py-1 rounded-lg hover:bg-slate-200/60 dark:hover:bg-white/10 cursor-pointer"
                    >
                      {isVi ? "Đóng" : "Close"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. Nút Ngôn ngữ kèm Menu lựa chọn */}
          <div className="relative z-20 hover:z-50 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPdfDropdownOpen(false);
                setIsThemeDropdownOpen(false);
                setIsLayoutDropdownOpen(false);
                setIsWallpaperDropdownOpen(false);
                setIsSettingsDropdownOpen(false);
                setIsLangDropdownOpen((prev) => !prev);
              }}
              className={cn(
                "h-8 sm:h-8.5 pl-2.5 pr-2 py-1 rounded-[999px] flex items-center justify-start gap-1.5 border backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md active:scale-95 shrink-0 overflow-hidden",
                isStackExpanded
                  ? "w-[98px] sm:w-[106px] z-50 scale-105"
                  : "w-10 sm:w-11 group-hover/footerstack:w-[98px] group-hover/footerstack:sm:w-[106px]",
                isLangDropdownOpen
                  ? "border-emerald-500 bg-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold z-50 scale-105"
                  : "border-emerald-500/40 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400"
              )}
              title={isVi ? "Chọn ngôn ngữ hiển thị" : "Select language"}
            >
              <Globe className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span className={cn(
                "text-[14px] sm:text-[15px] font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap transition-opacity duration-300",
                isStackExpanded ? "opacity-100" : "opacity-0 group-hover/footerstack:opacity-100"
              )}>
                {isVi ? "Ngôn ngữ" : "Language"}
              </span>
            </button>

            {/* FLOATING LANGUAGE POPOVER */}
            <AnimatePresence>
              {isLangDropdownOpen && (
                <motion.div
                  id="footer-lang-popover"
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 w-[270px] sm:w-[290px] max-w-[92vw] overflow-hidden rounded-2xl bg-white/95 dark:bg-[#0c101d]/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_20px_rgba(16,185,129,0.15)] z-[100] flex flex-col text-left font-sans"
                >
                  <div className="p-3 border-b border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-2 bg-slate-50/70 dark:bg-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-xs">
                        <Globe className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                          {isVi ? "Chọn Ngôn ngữ" : "Select Language"}
                        </h4>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          {isVi ? "Hỗ trợ Tiếng Việt & English" : "Vietnamese & English"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 space-y-1.5">
                    {/* Tiếng Việt */}
                    <div
                      onClick={() => {
                        setLang("vi");
                        setIsLangDropdownOpen(false);
                      }}
                      className={cn(
                        "p-2.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-2.5 group",
                        lang === "vi"
                          ? "bg-emerald-600 text-white dark:bg-emerald-500/25 dark:text-white border-emerald-600 dark:border-emerald-400 shadow-md scale-[1.01]"
                          : "bg-slate-50/60 dark:bg-white/5 border-slate-200/60 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200"
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-lg">🇻🇳</span>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold truncate">Tiếng Việt</h5>
                          <p className={cn("text-[10px] truncate", lang === "vi" ? "text-white/80 dark:text-emerald-200" : "text-slate-500 dark:text-slate-400")}>
                            Ngôn ngữ mặc định
                          </p>
                        </div>
                      </div>
                      {lang === "vi" ? (
                        <span className="w-5 h-5 rounded-full bg-white text-emerald-600 dark:bg-emerald-400 dark:text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 group-hover:text-emerald-500 font-bold shrink-0">Chọn</span>
                      )}
                    </div>

                    {/* English */}
                    <div
                      onClick={() => {
                        setLang("en");
                        setIsLangDropdownOpen(false);
                      }}
                      className={cn(
                        "p-2.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-2.5 group",
                        lang === "en"
                          ? "bg-emerald-600 text-white dark:bg-emerald-500/25 dark:text-white border-emerald-600 dark:border-emerald-400 shadow-md scale-[1.01]"
                          : "bg-slate-50/60 dark:bg-white/5 border-slate-200/60 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200"
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-lg">🇬🇧</span>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold truncate">English</h5>
                          <p className={cn("text-[10px] truncate", lang === "en" ? "text-white/80 dark:text-emerald-200" : "text-slate-500 dark:text-slate-400")}>
                            International language
                          </p>
                        </div>
                      </div>
                      {lang === "en" ? (
                        <span className="w-5 h-5 rounded-full bg-white text-emerald-600 dark:bg-emerald-400 dark:text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 group-hover:text-emerald-500 font-bold shrink-0">Select</span>
                      )}
                    </div>
                  </div>

                  <div className="p-2 border-t border-slate-200/60 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 flex items-center justify-between">
                    <span className="text-3xs text-slate-500 dark:text-slate-400">{isVi ? "Tự động dịch tức thì" : "Instant switch"}</span>
                    <button
                      type="button"
                      onClick={() => setIsLangDropdownOpen(false)}
                      className="text-3xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white px-2 py-1 rounded-lg hover:bg-slate-200/60 dark:hover:bg-white/10 cursor-pointer"
                    >
                      {isVi ? "Đóng" : "Close"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

            {/* 3. Nút Giao diện (Theme) */}
            <div className="relative z-30 hover:z-50 shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsThemeDropdownOpen((prev) => !prev);
                }}
                className={cn(
                  "h-8 sm:h-8.5 pl-2.5 pr-2 py-1 rounded-[999px] flex items-center justify-start gap-1.5 border backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md active:scale-95 shrink-0 overflow-hidden",
                  isStackExpanded
                    ? "w-[98px] sm:w-[106px] z-50 scale-105"
                    : "w-10 sm:w-11 group-hover/footerstack:w-[98px] group-hover/footerstack:sm:w-[106px]",
                  isThemeDropdownOpen
                    ? "border-indigo-500 bg-indigo-500/30 text-indigo-600 dark:text-cyan-400 font-bold z-50 scale-105"
                    : "border-indigo-500/40 bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-600 dark:text-cyan-400"
                )}
                title={isVi ? "Giao diện" : "Select Theme"}
              >
                <Palette className="w-4 h-4 shrink-0 text-indigo-600 dark:text-cyan-400" />
                <span className={cn(
                  "text-[14px] sm:text-[15px] font-bold text-indigo-600 dark:text-cyan-400 whitespace-nowrap transition-opacity duration-300",
                  isStackExpanded ? "opacity-100" : "opacity-0 group-hover/footerstack:opacity-100"
                )}>
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

            {/* 4. Nút Bố cục (Layout: Slide vs Bento Grid) */}
            <div className="relative z-35 hover:z-50 shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsThemeDropdownOpen(false);
                  setIsLayoutDropdownOpen((prev) => !prev);
                }}
                className={cn(
                  "h-8 sm:h-8.5 pl-2.5 pr-2 py-1 rounded-[999px] flex items-center justify-start gap-1.5 border backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md active:scale-95 shrink-0 overflow-hidden",
                  isStackExpanded
                    ? "w-[98px] sm:w-[106px] z-50 scale-105"
                    : "w-10 sm:w-11 group-hover/footerstack:w-[98px] group-hover/footerstack:sm:w-[106px]",
                  isLayoutDropdownOpen
                    ? "border-cyan-500 bg-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-bold z-50 scale-105"
                    : layoutMode === "bento"
                    ? "border-cyan-500/50 bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold"
                    : "border-blue-500/40 bg-blue-500/15 hover:bg-blue-500/25 text-blue-600 dark:text-cyan-400"
                )}
                title={isVi ? "Bố cục website" : "Select Layout Mode"}
              >
                {layoutMode === "bento" ? (
                  <LayoutGrid className="w-4 h-4 shrink-0 text-cyan-600 dark:text-cyan-400" />
                ) : (
                  <LayoutTemplate className="w-4 h-4 shrink-0 text-blue-600 dark:text-cyan-400" />
                )}
                <span className={cn(
                  "text-[14px] sm:text-[15px] font-bold text-blue-600 dark:text-cyan-400 whitespace-nowrap transition-opacity duration-300",
                  isStackExpanded ? "opacity-100" : "opacity-0 group-hover/footerstack:opacity-100"
                )}>
                  {isVi ? "Bố cục" : "Layout"}
                </span>
              </button>

              {/* FLOATING LAYOUT SELECTION POPOVER */}
              <AnimatePresence>
                {isLayoutDropdownOpen && (
                  <motion.div
                    id="footer-layout-popover"
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 w-[290px] sm:w-[320px] max-w-[92vw] overflow-hidden rounded-2xl bg-white/95 dark:bg-[#0c101d]/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_20px_rgba(0,240,255,0.15)] z-[100] flex flex-col text-left font-sans"
                  >
                    {/* Header */}
                    <div className="p-3 border-b border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-2 bg-slate-50/70 dark:bg-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-xs">
                          <LayoutGrid className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                            {isVi ? "Chọn Bố cục" : "Select Layout Mode"}
                          </h4>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            {isVi ? "2 phong cách hiển thị" : "2 presentation styles"}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 font-bold">
                        {layoutMode === "bento" ? "Bento Grid" : "Slide Card"}
                      </span>
                    </div>

                    {/* Options list */}
                    <div className="p-2 space-y-1.5">
                      {LAYOUT_OPTIONS.map((opt) => {
                        const isSelected = layoutMode === opt.id;
                        const Icon = opt.id === "bento" ? LayoutGrid : LayoutTemplate;
                        return (
                          <div
                            key={opt.id}
                            onClick={() => {
                              try { playClick(); } catch {}
                              setLayoutMode(opt.id);
                              setIsLayoutDropdownOpen(false);
                            }}
                            className={cn(
                              "p-2.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-2.5 group",
                              isSelected
                                ? "bg-cyan-600 text-white dark:bg-cyan-500/25 dark:text-white border-cyan-600 dark:border-cyan-400 shadow-md scale-[1.01]"
                                : "bg-slate-50/60 dark:bg-white/5 border-slate-200/60 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200"
                            )}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className={cn(
                                "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs",
                                isSelected ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-white/10 text-cyan-600 dark:text-cyan-400"
                              )}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <h5 className="text-xs font-bold truncate">
                                  {isVi ? opt.nameVi : opt.nameEn}
                                </h5>
                                <p className={cn(
                                  "text-[10px] truncate",
                                  isSelected ? "text-white/80 dark:text-cyan-200" : "text-slate-500 dark:text-slate-400"
                                )}>
                                  {isVi ? opt.taglineVi : opt.taglineEn}
                                </p>
                              </div>
                            </div>
                            {isSelected ? (
                              <span className="w-5 h-5 rounded-full bg-white text-cyan-600 dark:bg-cyan-400 dark:text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </span>
                            ) : (
                              <span className="text-[10px] text-slate-400 group-hover:text-cyan-500 font-bold shrink-0">
                                {isVi ? "Chọn" : "Select"}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Footer in popover */}
                    <div className="p-2 border-t border-slate-200/60 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 flex items-center justify-between">
                      <span className="text-3xs text-slate-500 dark:text-slate-400">
                        {isVi ? "Độc lập với Light/Dark Mode" : "Independent of theme"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsLayoutDropdownOpen(false)}
                        className="text-3xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white px-2 py-1 rounded-lg hover:bg-slate-200/60 dark:hover:bg-white/10 cursor-pointer"
                      >
                        {isVi ? "Đóng" : "Close"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          {/* 5. Nút Hình nền kèm Menu chọn nhanh */}
          <div className="relative z-40 hover:z-50 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPdfDropdownOpen(false);
                setIsLangDropdownOpen(false);
                setIsThemeDropdownOpen(false);
                setIsLayoutDropdownOpen(false);
                setIsSettingsDropdownOpen(false);
                setIsWallpaperDropdownOpen((prev) => !prev);
              }}
              className={cn(
                "h-8 sm:h-8.5 pl-2.5 pr-2 py-1 rounded-[999px] flex items-center justify-start gap-1.5 border backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md active:scale-95 shrink-0 overflow-hidden",
                isStackExpanded
                  ? "w-[98px] sm:w-[106px] z-50 scale-105"
                  : "w-10 sm:w-11 group-hover/footerstack:w-[98px] group-hover/footerstack:sm:w-[106px]",
                isWallpaperDropdownOpen
                  ? "border-sky-500 bg-sky-500/30 text-sky-600 dark:text-sky-400 font-bold z-50 scale-105"
                  : activeSection === "wallpapers"
                  ? "border-sky-500 bg-sky-500/25 text-sky-600 dark:text-sky-400 font-bold"
                  : "border-sky-500/40 bg-sky-500/15 hover:bg-sky-500/25 text-sky-600 dark:text-sky-400"
              )}
              title={isVi ? "Bộ sưu tập Hình nền & Background" : "Wallpapers & Backgrounds"}
            >
              <Images className="w-4 h-4 shrink-0 text-sky-600 dark:text-sky-400" />
              <span className={cn(
                "text-[14px] sm:text-[15px] font-bold text-sky-600 dark:text-sky-400 whitespace-nowrap transition-opacity duration-300",
                isStackExpanded ? "opacity-100" : "opacity-0 group-hover/footerstack:opacity-100"
              )}>
                {isVi ? "Hình nền" : "Wallpapers"}
              </span>
            </button>

            {/* FLOATING WALLPAPERS POPOVER */}
            <AnimatePresence>
              {isWallpaperDropdownOpen && (
                <motion.div
                  id="footer-wallpaper-popover"
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 w-[300px] sm:w-[330px] max-w-[92vw] overflow-hidden rounded-2xl bg-white/95 dark:bg-[#0c101d]/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_20px_rgba(14,165,233,0.15)] z-[100] flex flex-col text-left font-sans"
                >
                  <div className="p-3 border-b border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-2 bg-slate-50/70 dark:bg-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-xs">
                        <Images className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                          {isVi ? "Tùy chọn Hình nền" : "Wallpaper Selector"}
                        </h4>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          {isVi ? "Kho shader, video & ảnh 4K" : "Shaders, video & 4K arts"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 space-y-1.5">
                    <div
                      onClick={() => {
                        setIsWallpaperDropdownOpen(false);
                        handleNavigate("wallpapers");
                      }}
                      className="p-2.5 rounded-xl border border-slate-200/60 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 hover:bg-sky-500/10 dark:hover:bg-sky-500/15 hover:border-sky-500/40 text-slate-800 dark:text-slate-200 transition-all cursor-pointer flex items-center justify-between gap-2.5 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                          <Images className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold truncate group-hover:text-sky-600 dark:group-hover:text-sky-400">
                            {isVi ? "Thư viện Hình nền Đầy đủ" : "Full Wallpaper Gallery"}
                          </h5>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            {isVi ? "Mở trang Hình nền để chọn chi tiết" : "Go to section #wallpapers"}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-sky-500 font-bold shrink-0">{isVi ? "Xem" : "View"}</span>
                    </div>

                    <div
                      onClick={() => {
                        setIsWallpaperDropdownOpen(false);
                        themeContext.openColorModal();
                      }}
                      className="p-2.5 rounded-xl border border-slate-200/60 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 transition-all cursor-pointer flex items-center justify-between gap-2.5 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                          <Palette className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold truncate">
                            {isVi ? "Bảng màu Gradient Nền (15 Mẫu)" : "15 Gradient Presets"}
                          </h5>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            {isVi ? "Bảng pha màu gradient chuẩn Glass" : "Select ambient glass gradient"}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 group-hover:text-indigo-500 font-bold shrink-0">{isVi ? "Mở" : "Open"}</span>
                    </div>
                  </div>

                  <div className="p-2 border-t border-slate-200/60 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 flex items-center justify-between">
                    <span className="text-3xs text-slate-500 dark:text-slate-400">{isVi ? "Hiệu ứng Glass mềm mại" : "Soft Glass Background"}</span>
                    <button
                      type="button"
                      onClick={() => setIsWallpaperDropdownOpen(false)}
                      className="text-3xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white px-2 py-1 rounded-lg hover:bg-slate-200/60 dark:hover:bg-white/10 cursor-pointer"
                    >
                      {isVi ? "Đóng" : "Close"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 6. Nút Tùy chỉnh kèm Menu chọn nhanh */}
          <div className="relative z-50 hover:z-50 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPdfDropdownOpen(false);
                setIsLangDropdownOpen(false);
                setIsThemeDropdownOpen(false);
                setIsLayoutDropdownOpen(false);
                setIsWallpaperDropdownOpen(false);
                setIsSettingsDropdownOpen((prev) => !prev);
              }}
              className={cn(
                "h-8 sm:h-8.5 pl-2.5 pr-2 py-1 rounded-[999px] flex items-center justify-start gap-1.5 border backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md active:scale-95 shrink-0 overflow-hidden",
                isStackExpanded
                  ? "w-[98px] sm:w-[106px] z-50 scale-105"
                  : "w-10 sm:w-11 group-hover/footerstack:w-[98px] group-hover/footerstack:sm:w-[106px]",
                isSettingsDropdownOpen
                  ? "border-amber-500 bg-amber-500/30 text-amber-600 dark:text-amber-400 font-bold z-50 scale-105"
                  : activeSection === "customization"
                  ? "border-amber-500 bg-amber-500/25 text-amber-600 dark:text-amber-400 font-bold"
                  : "border-amber-500/40 bg-amber-500/15 hover:bg-amber-500/25 text-amber-600 dark:text-amber-400"
              )}
              title={isVi ? "Tùy chỉnh hệ thống & Giao diện" : "System Settings & Studio"}
            >
              <Sliders className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <span className={cn(
                "text-[14px] sm:text-[15px] font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap transition-opacity duration-300",
                isStackExpanded ? "opacity-100" : "opacity-0 group-hover/footerstack:opacity-100"
              )}>
                {isVi ? "Tùy chỉnh" : "Settings"}
              </span>
            </button>

            {/* FLOATING SETTINGS POPOVER */}
            <AnimatePresence>
              {isSettingsDropdownOpen && (
                <motion.div
                  id="footer-settings-popover"
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-full mb-3 right-0 w-[300px] sm:w-[330px] max-w-[92vw] overflow-hidden rounded-2xl bg-white/95 dark:bg-[#0c101d]/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_20px_rgba(245,158,11,0.15)] z-[100] flex flex-col text-left font-sans"
                >
                  <div className="p-3 border-b border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-2 bg-slate-50/70 dark:bg-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-xs">
                        <Sliders className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                          {isVi ? "Bảng Điều khiển Tùy chỉnh" : "Customization Control"}
                        </h4>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          {isVi ? "Chọn mục cần thiết lập" : "Choose configuration category"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 space-y-1.5 max-h-[320px] overflow-y-auto custom-scrollbar">
                    {/* Mục 1: Studio Tùy chỉnh toàn diện */}
                    <div
                      onClick={() => {
                        setIsSettingsDropdownOpen(false);
                        handleNavigate("customization");
                      }}
                      className="p-2.5 rounded-xl border border-slate-200/60 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 hover:bg-amber-500/10 dark:hover:bg-amber-500/15 hover:border-amber-500/40 text-slate-800 dark:text-slate-200 transition-all cursor-pointer flex items-center justify-between gap-2.5 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                          <Sliders className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold truncate group-hover:text-amber-600 dark:group-hover:text-amber-400">
                            {isVi ? "Studio Tùy chỉnh Toàn diện" : "Full Customization Page"}
                          </h5>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            {isVi ? "Mở đầy đủ trang Tùy chỉnh #customization" : "Open #customization page"}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-amber-500 font-bold shrink-0">{isVi ? "Mở" : "Open"}</span>
                    </div>

                    {/* Mục 2: Tùy chỉnh Cỡ chữ & Typography */}
                    <div
                      onClick={() => {
                        setIsSettingsDropdownOpen(false);
                        themeContext.openTypographyModal();
                      }}
                      className="p-2.5 rounded-xl border border-slate-200/60 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 transition-all cursor-pointer flex items-center justify-between gap-2.5 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                          <span className="font-serif font-black text-xs">Aa</span>
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold truncate">
                            {isVi ? "Cỡ chữ & Typography Font Play" : "Font & Typography Sizes"}
                          </h5>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            {isVi ? "Tỷ lệ co giãn font-scale & 20 thẻ text" : "Adjust font sizes & line-height"}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 group-hover:text-blue-500 font-bold shrink-0">{isVi ? "Chỉnh" : "Edit"}</span>
                    </div>

                    {/* Mục 3: Cài đặt Thanh Chân trang (Footer Settings) */}
                    <div
                      onClick={() => {
                        setIsSettingsDropdownOpen(false);
                        openFooterModal();
                      }}
                      className="p-2.5 rounded-xl border border-slate-200/60 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 transition-all cursor-pointer flex items-center justify-between gap-2.5 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                          <Pin className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold truncate">
                            {isVi ? "Vị trí & Ghim Thanh Chân trang" : "Footer Dock Placement"}
                          </h5>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            {isVi ? "Ghim, tự động ẩn, thanh nổi tròn" : "Pin, auto-hide, floating pill"}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 group-hover:text-purple-500 font-bold shrink-0">{isVi ? "Cấu hình" : "Config"}</span>
                    </div>

                    {/* Mục 4: Con trỏ chuột tương tác */}
                    <div
                      onClick={() => {
                        setIsSettingsDropdownOpen(false);
                        setIsCursorModalOpen(true);
                      }}
                      className="p-2.5 rounded-xl border border-slate-200/60 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 transition-all cursor-pointer flex items-center justify-between gap-2.5 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-pink-500/15 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                          <MousePointer className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold truncate">
                            {isVi ? "Hiệu ứng Con trỏ Chuột" : "Custom Interactive Cursor"}
                          </h5>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            {isVi ? "Neon Trail, Vệt sáng mờ, Kính lúp" : "Cursor styles & particle trail"}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 group-hover:text-pink-500 font-bold shrink-0">{isVi ? "Chọn" : "Select"}</span>
                    </div>

                    {/* Mục 5: Âm thanh & Nhạc nền Ambient */}
                    <div
                      onClick={() => {
                        setIsSettingsDropdownOpen(false);
                        setIsSoundModalOpen(true);
                      }}
                      className="p-2.5 rounded-xl border border-slate-200/60 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 transition-all cursor-pointer flex items-center justify-between gap-2.5 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                          <Volume2 className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold truncate">
                            {isVi ? "Âm thanh Tương tác & Âm nền" : "Sound FX & Ambient Audio"}
                          </h5>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            {isVi ? "Hiệu ứng click, phím đàn, sóng biển" : "Click feedback & ambient pack"}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 group-hover:text-cyan-500 font-bold shrink-0">{isVi ? "Bật/Tắt" : "Toggle"}</span>
                    </div>
                  </div>

                  <div className="p-2 border-t border-slate-200/60 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 flex items-center justify-between">
                    <span className="text-3xs text-slate-500 dark:text-slate-400">{isVi ? "Lưu cài đặt tức thì" : "Auto-saved settings"}</span>
                    <button
                      type="button"
                      onClick={() => setIsSettingsDropdownOpen(false)}
                      className="text-3xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white px-2 py-1 rounded-lg hover:bg-slate-200/60 dark:hover:bg-white/10 cursor-pointer"
                    >
                      {isVi ? "Đóng" : "Close"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
