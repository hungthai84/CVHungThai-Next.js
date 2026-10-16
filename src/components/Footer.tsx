import React, { useState, useEffect, useRef, memo, MouseEvent } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Bot,
  Volume2,
  VolumeX,
  MousePointer,
  Sliders,
  Printer,
  LayoutGrid,
  LayoutTemplate,
  LayoutDashboard,
  Layers,
  Globe,
  Palette,
  Sun,
  Moon,
  Check,
  Sparkles,
  Images,
  FileText,
  Settings,
  Monitor,
  MailOpen,
  User,
  GraduationCap,
  Compass,
  Brain,
  Briefcase,
  ClipboardList,
  Video,
  Server,
  MessagesSquare,
  Eye,
  Contrast,
  Focus
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { useTheme, ThemeType, COLOR_PRESETS } from "../context/ThemeContext";
import { useLayout, LAYOUT_OPTIONS } from "../context/LayoutContext";
import { THEME_LIST } from "../data/themesData";
import { useFooter } from "../context/FooterContext";
import { useSound } from "../context/SoundContext";
import { playUiSound } from "../lib/sound";
import FooterWeather from "./FooterWeather";
import { cn, getUnifiedSurfaceStyle } from "../lib/utils";

interface FooterProps {
  theme?: ThemeType;
  activeSection?: string;
  onNavigate?: (id: string) => void;
  showScrollReminder?: boolean;
  onScrollReminderClick?: () => void;
}

const SECTION_ORDER = [
  "home",
  "letter",
  "about",
  "experience",
  "domains",
  "skills",
  "projects",
  "systems",
  "tuvi",
  "contact",
  "memories",
  "wallpapers",
  "customization"
];

function Footer({ 
  theme: propTheme, 
  activeSection = "home", 
  onNavigate,
  showScrollReminder = false,
  onScrollReminderClick
}: FooterProps) {
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
  const [isSharpnessDropdownOpen, setIsSharpnessDropdownOpen] = useState(false);
  const [isBreadcrumbOpen, setIsBreadcrumbOpen] = useState(false);

  const { sharpness, setSharpness, contrastLevel, setContrastLevel } = themeContext as any;

  const [visitedHistory, setVisitedHistory] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem("page_breadcrumb_history");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return ["home"];
  });

  useEffect(() => {
    if (!activeSection) return;
    setVisitedHistory((prev) => {
      if (prev[prev.length - 1] === activeSection) return prev;
      const updated = [...prev, activeSection];
      try {
        sessionStorage.setItem("page_breadcrumb_history", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, [activeSection]);

  const [isStackHovered, setIsStackHovered] = useState(false);
  const [isStackPinned, setIsStackPinned] = useState(false);
  const stackTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { layoutMode, setLayoutMode } = useLayout();

  const isStackExpanded = isStackHovered || isStackPinned || isPdfDropdownOpen || isLangDropdownOpen || isThemeDropdownOpen || isLayoutDropdownOpen || isColorDropdownOpen || isWallpaperDropdownOpen || isSettingsDropdownOpen || isBreadcrumbOpen;

  const handleStackMouseEnter = () => {
    if (stackTimerRef.current) {
      clearTimeout(stackTimerRef.current);
      stackTimerRef.current = null;
    }
    setIsStackHovered(true);
    playUiSound("haptic");
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

  const handlePrevPage = () => {
    const prevIdx = currentIndex > 0 ? currentIndex - 1 : SECTION_ORDER.length - 1;
    const prevId = SECTION_ORDER[prevIdx];
    if (onNavigate) {
      onNavigate(prevId);
    } else {
      const el = document.getElementById(prevId);
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

  // Helper lấy thông tin icon và tên 2 chữ của trang hiện tại
  const getActiveSectionInfo = (id: string) => {
    switch (id) {
      case "home": return { label: isVi ? "Trang Chủ" : "Home", icon: Monitor };
      case "letter": return { label: isVi ? "Thư Ngỏ" : "Letter", icon: MailOpen };
      case "about": return { label: isVi ? "Giới Thiệu" : "About", icon: User };

      case "domains": return { label: isVi ? "Lĩnh Vực" : "Domains", icon: Compass };
      case "skills": return { label: isVi ? "Kỹ Năng" : "Skills", icon: Brain };
      case "experience": return { label: isVi ? "Kinh Nghiệm" : "Exp", icon: Briefcase };
      case "projects": return { label: isVi ? "Dự Án" : "Projects", icon: ClipboardList };
      case "interview": return { label: isVi ? "Phỏng Vấn" : "Interview", icon: Video };
      case "tuvi": return { label: isVi ? "Tử Vi" : "TuVi", icon: Sparkles };
      case "systems": return { label: isVi ? "Hệ Thống" : "Systems", icon: Server };
      case "memories": return { label: isVi ? "Kỷ Niệm" : "Memories", icon: Images };
      case "contact": return { label: isVi ? "Liên Hệ" : "Contact", icon: MessagesSquare };
      default: return { label: isVi ? "Trang Chủ" : "Home", icon: Monitor };
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
  // Placement class resolver: Footer bám sát phía dưới website cách 2 bên 25px
  const getPlacementClass = () => {
    return cn(
      "fixed bottom-0 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-50px)] max-w-[1280px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none box-border"
    );
  };

  const footerCustomStyle: React.CSSProperties = {
    borderRadius: "24px 24px 0 0",
    boxSizing: "border-box"
  };

  return (
    <>
      {/* Main Footer Dock Container bám sát mép đáy, bo cong góc trên trái & phải, đồng bộ nền glass với Header và Center Card */}
      <footer 
        id="footer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          if (!isThemeDropdownOpen && !isColorDropdownOpen) {
            setIsHovered(false);
          }
        }}
        style={footerCustomStyle}
        className={cn(
          "group p-[5px] footer-bento-container flex flex-col justify-center cursor-default !overflow-visible border border-b-0 backdrop-blur-2xl transition-all duration-300 rounded-t-[18px] rounded-b-none",
          getUnifiedSurfaceStyle(theme),
          getPlacementClass()
        )}
      >
        {/* Auto-hide Grab Handle & Peek Indicator */}
        {!isPinned && (
          <span 
            onClick={() => setIsHovered((prev) => !prev)}
            className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer group/handle py-1 z-30"
            title={isVi ? "Click để mở/đóng Footer" : "Click to expand/collapse Footer"}
          >
            <span className="h-1.5 w-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse hover:scale-110 transition-transform block" />
          </span>
        )}

        {/* Extended Hover Trigger Zone (Invisible hit-area slightly above edge when slid down) */}
        {isSlidDown && (
          <span 
            className="absolute -top-4 left-0 right-0 h-5 pointer-events-auto cursor-pointer block" 
            aria-hidden="true"
          />
        )}

      <div className="w-full h-full flex flex-row items-center justify-between relative p-[5px]">
        {/* KHU VỰC 1 - BÊN TRÁI: 40% chiều dài chứa Card thời tiết lấp đầy khu vực */}
        <div className="basis-[40%] w-[40%] min-w-[160px] max-w-[40%] h-full flex items-center justify-start p-[5px] overflow-hidden shrink-0">
          <FooterWeather layoutMode="vertical" timeString={timeString} dateString={dateString} />
        </div>

        {/* KHU VỰC 2 - CHÍNH GIỮA: Cụm nút chuyển trang với nút tròn giữa hiển thị icon trang hiện tại, 2 nút mũi tên trái/phải bám sát chặt chẽ vào nút giữa */}
        <div className="basis-[20%] w-[20%] min-w-[140px] max-w-[20%] h-full flex items-center justify-center shrink-0 p-1 z-30 pointer-events-auto">
          <div className="inline-flex items-center justify-center relative select-none -space-x-1">
            {/* 1. Nút Lùi Trang: hình dài, bám sát chặt chẽ phía trái nút tròn giữa */}
            <button
              type="button"
              onClick={handlePrevPage}
              onMouseEnter={() => playUiSound("haptic")}
              className={cn(
                "group/btn relative h-9 sm:h-10 px-3.5 rounded-l-[999px] rounded-r-none border flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md shrink-0 overflow-hidden z-10 hover:z-30 active:scale-95",
                theme === "glass-dark-neon" || theme?.includes("dark")
                  ? "bg-slate-900/90 border-cyan-500/40 text-cyan-200 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-300 shadow-cyan-500/20"
                  : "bg-white/90 border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-400 shadow-indigo-500/10"
              )}
              title={isVi ? "Trang trước" : "Previous page"}
              aria-label={isVi ? "Trang trước" : "Previous page"}
            >
              <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden z-0">
                <div className="absolute -inset-[150%] animate-border-beam bg-[conic-gradient(from_0deg,transparent_0_220deg,#06b6d4_360deg)]" />
              </div>
              <ChevronLeft className="w-5 h-5 shrink-0 relative z-10 drop-shadow-xs" />
            </button>

            {/* 2. Nút Tròn Chính Giữa: hiển thị Icon trang hiện tại + Breadcrumb Mini Map Popover */}
            {(() => {
              const currentInfo = getActiveSectionInfo(activeSection || "home");
              const CurrentIcon = currentInfo.icon;
              return (
                <div className="relative z-20 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      setIsBreadcrumbOpen((prev) => !prev);
                    }}
                    onMouseEnter={() => playUiSound("haptic")}
                    className={cn(
                      "group/btn relative w-10 h-10 sm:w-11 sm:h-11 rounded-full text-white border-2 shadow-lg flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-105 cursor-pointer z-20 overflow-hidden",
                      theme === "glass-dark-neon" || theme?.includes("dark")
                        ? "bg-cyan-600 hover:bg-cyan-500 border-cyan-300 shadow-cyan-500/40"
                        : "bg-indigo-600 hover:bg-indigo-500 border-indigo-300 shadow-indigo-500/40"
                    )}
                    title={isVi ? `Trang hiện tại: ${currentInfo.label} (Bấm xem lịch sử hành trình)` : `Current: ${currentInfo.label}`}
                    aria-label={currentInfo.label}
                  >
                    {/* Rotating Border Beam on Hover */}
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden z-0">
                      <div className="absolute -inset-[150%] animate-border-beam bg-[conic-gradient(from_0deg,transparent_0_220deg,#06b6d4_360deg)]" />
                      <div className="absolute inset-[1.5px] rounded-full bg-slate-900/90 dark:bg-slate-950/90" />
                    </div>
                    <CurrentIcon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-white drop-shadow-md relative z-10" />
                  </button>

                  {/* Breadcrumb Mini Map Dropdown Popover */}
                  {isBreadcrumbOpen && (
                    <div 
                      id="footer-breadcrumb-popover"
                      className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 p-3 rounded-2xl bg-slate-900/95 text-white border border-slate-700/80 backdrop-blur-xl shadow-2xl z-[100] animate-in fade-in slide-in-from-bottom-2 duration-200"
                    >
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs font-bold text-slate-200">
                        <span className="flex items-center gap-1.5 text-cyan-400">
                          <Compass className="w-4 h-4" />
                          <span>{isVi ? "Lịch sử hành trình" : "Breadcrumb Map"}</span>
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setVisitedHistory([activeSection || "home"]);
                            try { sessionStorage.removeItem("page_breadcrumb_history"); } catch {}
                          }}
                          className="text-[10px] text-slate-400 hover:text-rose-400 underline cursor-pointer"
                        >
                          {isVi ? "Xóa" : "Clear"}
                        </button>
                      </div>
                      <div className="max-h-52 overflow-y-auto space-y-1 custom-scrollbar text-xs">
                        {visitedHistory.map((secId, idx) => {
                          const secInfo = getActiveSectionInfo(secId);
                          const SecIcon = secInfo.icon;
                          const isCurrent = activeSection === secId;
                          return (
                            <button
                              key={`${secId}-${idx}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                playUiSound("click");
                                setIsBreadcrumbOpen(false);
                                handleNavigate(secId);
                              }}
                              className={cn(
                                "w-full flex items-center justify-between p-2 rounded-xl transition-all text-left cursor-pointer",
                                isCurrent
                                  ? "bg-brand-primary text-white font-bold shadow-sm"
                                  : "hover:bg-slate-800/80 text-slate-300"
                              )}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <span className="text-[10px] font-mono opacity-60 w-4">{idx + 1}.</span>
                                <SecIcon className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">{secInfo.label}</span>
                              </div>
                              {isCurrent && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-mono shrink-0">Đang xem</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* 3. Nút Tới Trang / Khám Phá Tiếp: Khi showScrollReminder bật, nút Khám Phá Tiếp sẽ ẩn nút Tới Trang và nằm đúng vị trí này */}
            <AnimatePresence mode="wait">
              {showScrollReminder ? (
                <motion.button
                  key="scroll-reminder-btn"
                  initial={{ opacity: 0, scale: 0.85, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.85, x: 10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  type="button"
                  onClick={() => {
                    playUiSound("click");
                    if (onScrollReminderClick) {
                      onScrollReminderClick();
                    } else {
                      handleNextPage();
                    }
                  }}
                  onMouseEnter={() => playUiSound("haptic")}
                  className={cn(
                    "group/btn relative h-9 sm:h-10 px-3 sm:px-4 rounded-r-[999px] rounded-l-none border flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer shadow-lg shrink-0 overflow-hidden z-20 active:scale-95",
                    "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-cyan-300/80 shadow-[0_0_20px_rgba(99,102,241,0.6)]"
                  )}
                  title={isVi ? "Khám phá trang tiếp theo" : "Explore next page"}
                  aria-label={isVi ? "Khám phá tiếp" : "Explore More"}
                >
                  <div className="absolute inset-0 opacity-100 pointer-events-none overflow-hidden z-0">
                    <div className="absolute -inset-[150%] animate-border-beam bg-[conic-gradient(from_0deg,transparent_0_180deg,#06b6d4_240deg,#d946ef_300deg,#ffffff_360deg)] opacity-90" />
                  </div>
                  <span className="relative flex h-2 w-2 z-10 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-80" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-200" />
                  </span>
                  <span className="relative z-10 text-xs font-black tracking-wide uppercase whitespace-nowrap text-white drop-shadow-xs">
                    {isVi ? "Khám phá tiếp" : "Explore More"}
                  </span>
                  <ChevronRight className="w-4 h-4 text-cyan-200 animate-bounce z-10 shrink-0 drop-shadow-xs" />
                </motion.button>
              ) : (
                <button
                  key="next-page-btn"
                  type="button"
                  onClick={handleNextPage}
                  onMouseEnter={() => playUiSound("haptic")}
                  className={cn(
                    "group/btn relative h-9 sm:h-10 px-3.5 rounded-r-[999px] rounded-l-none border flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md shrink-0 overflow-hidden z-10 hover:z-30 active:scale-95",
                    theme === "glass-dark-neon" || theme?.includes("dark")
                      ? "bg-slate-900/90 border-cyan-500/40 text-cyan-200 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-300 shadow-cyan-500/20"
                      : "bg-white/90 border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-400 shadow-indigo-500/10"
                  )}
                  title={isVi ? "Trang kế tiếp" : "Next page"}
                  aria-label={isVi ? "Trang kế tiếp" : "Next page"}
                >
                  <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden z-0">
                    <div className="absolute -inset-[150%] animate-border-beam bg-[conic-gradient(from_0deg,transparent_0_220deg,#06b6d4_360deg)]" />
                  </div>
                  <ChevronRight className="w-5 h-5 shrink-0 relative z-10 drop-shadow-xs" />
                </button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* KHU VỰC 3 - BÊN PHẢI: 40% chứa Nút tiện ích */}
        <div className="basis-[40%] w-[40%] min-w-[160px] max-w-[40%] h-full flex items-center justify-end z-20 shrink-0 overflow-visible p-[5px]">
          <div 
            onMouseEnter={handleStackMouseEnter}
            onMouseLeave={handleStackMouseLeave}
            className="flex items-center justify-end transition-all duration-300 min-w-0 p-[5px] select-none overflow-visible group/footerstack space-x-1.5 sm:space-x-2.5"
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
              className="group/btn relative h-9 min-h-[36px] w-[106px] sm:w-[112px] px-2.5 rounded-[999px] flex items-center justify-start gap-1.5 border backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md active:scale-95 shrink-0 overflow-hidden bg-rose-500/80 border-rose-400/50 text-rose-100 z-10 hover:z-50 hover:-translate-y-1 hover:scale-105"
              title={isVi ? "In PDF & Xuất hồ sơ" : "Print PDF & Export Resume"}
            >
              {/* Rotating Border Beam on Hover */}
              <div className="absolute inset-0 rounded-[999px] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden z-0">
                <div className="absolute -inset-[150%] animate-border-beam bg-[conic-gradient(from_0deg,transparent_0_220deg,#f43f5e_360deg)]" />
                <div className="absolute inset-[1.5px] rounded-[999px] bg-rose-950/80 dark:bg-rose-950/90" />
              </div>
              <div className="relative flex items-center justify-center shrink-0 w-5 h-5 ml-0.5 z-10">
                <Printer className="w-4 h-4 shrink-0 text-rose-100 drop-shadow-[0_0_6px_currentColor]" />
              </div>
              <span className="relative z-10 text-[12px] sm:text-[13px] font-bold text-rose-100 whitespace-nowrap drop-shadow-xs truncate">
                {isVi ? "In PDF" : "Print"}
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
              className="group/btn relative h-9 min-h-[36px] w-[106px] sm:w-[112px] px-2.5 rounded-[999px] flex items-center justify-start gap-1.5 border backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md active:scale-95 shrink-0 overflow-hidden bg-emerald-500/80 border-emerald-400/50 text-emerald-100 z-20 hover:z-50 hover:-translate-y-1 hover:scale-105"
              title={isVi ? "Chọn ngôn ngữ hiển thị" : "Select language"}
            >
              {/* Rotating Border Beam on Hover */}
              <div className="absolute inset-0 rounded-[999px] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden z-0">
                <div className="absolute -inset-[150%] animate-border-beam bg-[conic-gradient(from_0deg,transparent_0_220deg,#10b981_360deg)]" />
                <div className="absolute inset-[1.5px] rounded-[999px] bg-emerald-950/80 dark:bg-emerald-950/90" />
              </div>
              <div className="relative flex items-center justify-center shrink-0 w-5 h-5 ml-0.5 z-10">
                <Globe className="w-4 h-4 shrink-0 text-emerald-100 drop-shadow-[0_0_6px_currentColor]" />
              </div>
              <span className="relative z-10 text-[12px] sm:text-[13px] font-bold text-emerald-100 whitespace-nowrap drop-shadow-xs truncate">
                {isVi ? "Ngôn Ngữ" : "Lang"}
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
                className="group/btn relative h-9 min-h-[36px] w-[106px] sm:w-[112px] px-2.5 rounded-[999px] flex items-center justify-start gap-1.5 border backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md active:scale-95 shrink-0 overflow-hidden bg-indigo-500/80 border-indigo-400/50 text-indigo-100 z-30 hover:z-50 hover:-translate-y-1 hover:scale-105"
                title={isVi ? "Giao diện" : "Select Theme"}
              >
                {/* Rotating Border Beam on Hover */}
                <div className="absolute inset-0 rounded-[999px] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden z-0">
                  <div className="absolute -inset-[150%] animate-border-beam bg-[conic-gradient(from_0deg,transparent_0_220deg,#6366f1_360deg)]" />
                  <div className="absolute inset-[1.5px] rounded-[999px] bg-indigo-950/80 dark:bg-indigo-950/90" />
                </div>
                <div className="relative flex items-center justify-center shrink-0 w-5 h-5 ml-0.5 z-10">
                  <Palette className="w-4 h-4 shrink-0 text-indigo-100 drop-shadow-[0_0_6px_currentColor]" />
                </div>
                <span className="relative z-10 text-[12px] sm:text-[13px] font-bold text-indigo-100 whitespace-nowrap drop-shadow-xs truncate">
                  {isVi ? "Giao Diện" : "Theme"}
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
                className="group/btn relative h-9 min-h-[36px] w-[106px] sm:w-[112px] px-2.5 rounded-[999px] flex items-center justify-start gap-1.5 border backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md active:scale-95 shrink-0 overflow-hidden bg-purple-500/80 border-purple-400/50 text-purple-100 z-35 hover:z-50 hover:-translate-y-1 hover:scale-105"
                title={isVi ? "Bố cục website" : "Select Layout Mode"}
              >
                {/* Rotating Border Beam on Hover */}
                <div className="absolute inset-0 rounded-[999px] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden z-0">
                  <div className="absolute -inset-[150%] animate-border-beam bg-[conic-gradient(from_0deg,transparent_0_220deg,#a855f7_360deg)]" />
                  <div className="absolute inset-[1.5px] rounded-[999px] bg-purple-950/80 dark:bg-purple-950/90" />
                </div>
                <div className="relative flex items-center justify-center shrink-0 w-5 h-5 ml-0.5 z-10">
                  {layoutMode === "bento-pinterest" ? (
                    <LayoutGrid className="w-4 h-4 shrink-0 text-purple-100 drop-shadow-[0_0_6px_currentColor]" />
                  ) : layoutMode === "dashboard" ? (
                    <LayoutDashboard className="w-4 h-4 shrink-0 text-purple-100 drop-shadow-[0_0_6px_currentColor]" />
                  ) : layoutMode === "slide-stack" ? (
                    <Layers className="w-4 h-4 shrink-0 text-purple-100 drop-shadow-[0_0_6px_currentColor]" />
                  ) : layoutMode === "landing" ? (
                    <FileText className="w-4 h-4 shrink-0 text-purple-100 drop-shadow-[0_0_6px_currentColor]" />
                  ) : (
                    <LayoutTemplate className="w-4 h-4 shrink-0 text-purple-100 drop-shadow-[0_0_6px_currentColor]" />
                  )}
                </div>
                <span className="relative z-10 text-[12px] sm:text-[13px] font-bold text-purple-100 whitespace-nowrap drop-shadow-xs truncate">
                  {isVi ? "Bố Cục" : "Layout"}
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
                    className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 w-[300px] sm:w-[330px] max-w-[92vw] overflow-hidden rounded-2xl bg-white/95 dark:bg-[#0c101d]/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_20px_rgba(0,240,255,0.15)] z-[100] flex flex-col text-left font-sans"
                  >
                    {/* Header */}
                    <div className="p-3 border-b border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-2 bg-slate-50/70 dark:bg-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-xs">
                          <LayoutGrid className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                            {isVi ? "5 Bố Cục Chuyên Nghiệp" : "5 Professional Layouts"}
                          </h4>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            {isVi ? "Chuyển đổi giao diện tức thì" : "Instant layout morphing"}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 font-bold">
                        {layoutMode === "bento-pinterest" ? "Bento" : layoutMode === "dashboard" ? "Dashboard" : layoutMode === "slide-stack" ? "Stack" : layoutMode === "landing" ? "Landing" : "Card"}
                      </span>
                    </div>

                    {/* Options list */}
                    <div className="p-2 space-y-1.5">
                      {LAYOUT_OPTIONS.map((opt) => {
                        const isSelected = layoutMode === opt.id;
                        const Icon = opt.id === "dashboard" 
                          ? LayoutDashboard 
                          : opt.id === "slide-stack" 
                          ? Layers 
                          : opt.id === "landing" 
                          ? FileText 
                          : opt.id === "bento-pinterest" 
                          ? LayoutGrid 
                          : LayoutTemplate;
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
              className="group/btn relative h-9 min-h-[36px] w-[106px] sm:w-[112px] px-2.5 rounded-[999px] flex items-center justify-start gap-1.5 border backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md active:scale-95 shrink-0 overflow-hidden bg-sky-500/80 border-sky-400/50 text-sky-100 z-40 hover:z-50 hover:-translate-y-1 hover:scale-105"
              title={isVi ? "Bộ sưu tập Hình nền & Background" : "Wallpapers & Backgrounds"}
            >
              {/* Rotating Border Beam on Hover */}
              <div className="absolute inset-0 rounded-[999px] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden z-0">
                <div className="absolute -inset-[150%] animate-border-beam bg-[conic-gradient(from_0deg,transparent_0_220deg,#0ea5e9_360deg)]" />
                <div className="absolute inset-[1.5px] rounded-[999px] bg-sky-950/80 dark:bg-sky-950/90" />
              </div>
              <div className="relative flex items-center justify-center shrink-0 w-5 h-5 ml-0.5 z-10">
                <Images className="w-4 h-4 shrink-0 text-sky-100 drop-shadow-[0_0_6px_currentColor]" />
              </div>
              <span className="relative z-10 text-[12px] sm:text-[13px] font-bold text-sky-100 whitespace-nowrap drop-shadow-xs truncate">
                {isVi ? "Hình Nền" : "Wallpaper"}
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
              className="group/btn relative h-9 min-h-[36px] w-[106px] sm:w-[112px] px-2.5 rounded-[999px] flex items-center justify-start gap-1.5 border backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md active:scale-95 shrink-0 overflow-hidden bg-amber-500/80 border-amber-400/50 text-amber-100 z-50 hover:z-50 hover:-translate-y-1 hover:scale-105"
              title={isVi ? "Tùy chỉnh hệ thống & Giao diện" : "System Customization & Settings"}
            >
              {/* Rotating Border Beam on Hover */}
              <div className="absolute inset-0 rounded-[999px] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden z-0">
                <div className="absolute -inset-[150%] animate-border-beam bg-[conic-gradient(from_0deg,transparent_0_220deg,#f59e0b_360deg)]" />
                <div className="absolute inset-[1.5px] rounded-[999px] bg-amber-950/80 dark:bg-amber-950/90" />
              </div>
              <div className="relative flex items-center justify-center shrink-0 w-5 h-5 ml-0.5 z-10">
                <Sliders className="w-4 h-4 shrink-0 text-amber-100 drop-shadow-[0_0_6px_currentColor]" />
              </div>
              <span className="relative z-10 text-[12px] sm:text-[13px] font-bold text-amber-100 whitespace-nowrap drop-shadow-xs truncate">
                {isVi ? "Tùy chỉnh" : "Customization"}
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
                          <Sliders className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold truncate">
                            {isVi ? "Vị trí Thanh Chân trang" : "Footer Dock Placement"}
                          </h5>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            {isVi ? "Tùy chọn vị trí, tự động ẩn, thanh nổi tròn" : "Placement, auto-hide, floating pill"}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 group-hover:text-purple-500 font-bold shrink-0">{isVi ? "Cấu hình" : "Config"}</span>
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
    </div>
  </footer>

    </>
  );
}

export default memo(Footer);
