import React, { useState, useEffect, useRef, memo, MouseEvent } from "react";
import { cn } from "../lib/utils";
import {
  User,
  Briefcase,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  Monitor,
  GraduationCap,
  LayoutGrid,
  MessagesSquare,
  Mail,
  MailOpen,
  Phone,
  FileText,
  Compass,
  Brain,
  ClipboardList,
  Columns3,
  Images,
  Video,
  Palette,
  Check,
  ChevronDown,
  Sliders,
  Sparkles,
  Printer,
  Play,
  Rocket,
  Type,
  Server,
  CreditCard,
  LayoutTemplate,
  ShieldAlert,
  Bot
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { useLayout } from "../context/LayoutContext";
import { useTheme, ThemeType, COLOR_PRESETS } from "../context/ThemeContext";
import { useHeader } from "../context/HeaderContext";
import { THEME_LIST } from "../data/themesData";
import { playUiSound } from "../lib/sound";
import { getUnifiedSurfaceStyle } from "../lib/utils";
import NotchedTabBar from "./NotchedTabBar";

interface HeaderProps {
  theme?: ThemeType;
  setTheme?: (theme: ThemeType) => void;
  activeSection?: string;
  onNavigate?: (id: string) => void;
}

function Header({ theme: propTheme, setTheme: propSetTheme, activeSection = "home", onNavigate }: HeaderProps) {
  const themeContext = useTheme();
  const theme = propTheme || themeContext.theme;
  const setTheme = propSetTheme || themeContext.setTheme;

  let isHeaderSlidUp = false;
  let isHeaderPinned = false;
  let togglePin: (() => void) | undefined;
  let isHeaderHovered = false;
  let setIsHeaderHovered: ((hovered: boolean) => void) | undefined;
  let contextPillStyle: React.CSSProperties = { opacity: 0 };
  let setContextPillStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>> | undefined;

  try {
    const headerCtx = useHeader();
    isHeaderSlidUp = headerCtx.isHeaderSlidUp;
    isHeaderPinned = headerCtx.isHeaderPinned;
    togglePin = headerCtx.togglePin;
    isHeaderHovered = headerCtx.isHeaderHovered;
    setIsHeaderHovered = headerCtx.setIsHeaderHovered;
    contextPillStyle = headerCtx.persistedPillStyle;
    setContextPillStyle = headerCtx.setPersistedPillStyle;
  } catch (e) {
    // Graceful fallback if HeaderProvider is absent
  }

  const { lang, setLang, t } = useLanguage();
  const isVi = lang === "vi";
  const { orientation, toggleOrientation, layoutMode, toggleLayoutMode } = useLayout();
  const [hoveredNavId, setHoveredNavId] = useState<string | null>(null);
  
  const [isHeaderThemeOpen, setIsHeaderThemeOpen] = useState(false);
  const [isHeaderLayoutOpen, setIsHeaderLayoutOpen] = useState(false);
  const [isHeaderLangOpen, setIsHeaderLangOpen] = useState(false);
  const [isHeaderStackExpanded, setIsHeaderStackExpanded] = useState(false);

  useEffect(() => {
    const handleOutside = (e: any) => {
      const target = e.target as HTMLElement;
      const headerEl = document.getElementById("header");
      if (headerEl && !headerEl.contains(target)) {
        setIsHeaderThemeOpen(false);
        setIsHeaderLayoutOpen(false);
        setIsHeaderLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const isHorizontal = orientation === "horizontal";
  
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  
  const [localPillStyle, setLocalPillStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const pillStyle = setContextPillStyle ? contextPillStyle : localPillStyle;
  const setPillStyle = setContextPillStyle || setLocalPillStyle;

  const updatePill = () => {
    const bar = navRef.current;
    if (!bar) return;
    const targetId = hoveredNavId || activeSection;
    const targetEl = itemRefs.current[targetId] || itemRefs.current[activeSection];
    if (targetEl) {
      const b = bar.getBoundingClientRect();
      const r = targetEl.getBoundingClientRect();
      if (r.width > 0) {
        setPillStyle({
          left: `${r.left - b.left}px`,
          width: `${r.width}px`,
          opacity: 1
        });
      }
    }
  };

  useEffect(() => {
    updatePill();
    const timer1 = setTimeout(updatePill, 50);
    const timer2 = setTimeout(updatePill, 300);
    window.addEventListener('resize', updatePill);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', updatePill);
    };
  }, [activeSection, hoveredNavId, lang, theme]);

  const navRectRef = useRef<DOMRect | null>(null);

  const handleNavMouseEnter = () => {
    if (navRef.current) {
      navRectRef.current = navRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const nav = navRef.current;
    if (!nav) return;
    if (!navRectRef.current) {
      navRectRef.current = nav.getBoundingClientRect();
    }
    const rect = navRectRef.current;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    nav.style.setProperty("--x", `${x}px`);
    nav.style.setProperty("--y", `${y}px`);
  };





  const isDark = themeContext.resolvedTheme === "dark" || theme === "dark";

  // Unified theme toggle utility that synchronizes ThemeContext and triggers Tailwind 'dark' class
  const handleThemeToggle = (targetTheme?: ThemeType) => {
    let nextTheme: ThemeType;
    if (targetTheme) {
      nextTheme = targetTheme;
    } else {
      nextTheme = isDark ? "glass-light-multicolor" : "dark";
    }
    setTheme(nextTheme);
  };

  // Complete Sections for Quick Jump Menu & Direct Navigation
  const ALL_14_SECTIONS = [
    { id: "home", num: "01", labelVi: "Trang chủ", labelEn: "Home", Icon: Monitor, key: "1" },
    { id: "letter", num: "02", labelVi: "Thư ngỏ", labelEn: "Open Letter", Icon: MailOpen, key: "L" },
    { id: "about", num: "03", labelVi: "Giới thiệu", labelEn: "About", Icon: User, key: "3" },
    { id: "education", num: "04", labelVi: "Học vấn", labelEn: "Education", Icon: GraduationCap, key: "4" },
    { id: "domains", num: "05", labelVi: "Lĩnh vực", labelEn: "Domains", Icon: Compass, key: "D" },
    { id: "experience", num: "06", labelVi: "Kinh nghiệm", labelEn: "Experience", Icon: Briefcase, key: "6" },
    { id: "skills", num: "07", labelVi: "Kỹ năng", labelEn: "Skills", Icon: Brain, key: "K" },
    { id: "projects", num: "08", labelVi: "Dự án", labelEn: "Projects", Icon: ClipboardList, key: "7" },
    { id: "systems", num: "09", labelVi: "Hệ thống", labelEn: "Systems", Icon: Server, key: "S" },
    { id: "interview", num: "10", labelVi: "Phỏng vấn AI", labelEn: "AI Interview", Icon: Video, key: "8" },
    { id: "tuvi", num: "11", labelVi: "Tử Vi & Chiêm Tinh", labelEn: "TuVi & Astrology", Icon: Sparkles, key: "9" },
    { id: "memories", num: "12", labelVi: "Kỷ niệm", labelEn: "Memories", Icon: Images, key: "M" },
    { id: "contact", num: "13", labelVi: "Liên hệ", labelEn: "Contact", Icon: MessagesSquare, key: "C" },
    { id: "wallpapers", num: "14", labelVi: "Hình nền & Video", labelEn: "Wallpapers", Icon: Images, key: "W" },
    { id: "customization", num: "15", labelVi: "Tùy chỉnh", labelEn: "Customization", Icon: Sliders, key: "U" },
    { id: "errors", num: "16", labelVi: "Báo cáo lỗi", labelEn: "Tab Errors", Icon: ShieldAlert, key: "E" },
  ];

  // Navigation Items for Top Header Center with distinct colors and hover-expand title
  const navItems = [
    { 
      id: "home", 
      labelVi: "Trang chủ", 
      labelEn: "Home", 
      Icon: Monitor, 
      activeBg: "bg-white/40 dark:bg-[#0c101d]/40 border-sky-400/50 text-sky-700 dark:text-sky-300 backdrop-blur-md shadow-[0_0_15px_rgba(14,165,233,0.3)]", 
      hoverBorder: "hover:border-sky-400/60 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-white/50 dark:hover:bg-[#0c101d]/50",
      themeColor: "#0ea5e9" 
    },
    { 
      id: "letter", 
      labelVi: "Thư Ngỏ", 
      labelEn: "Letter", 
      Icon: MailOpen, 
      activeBg: "bg-white/40 dark:bg-[#0c101d]/40 border-emerald-400/50 text-emerald-700 dark:text-emerald-300 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.3)]", 
      hoverBorder: "hover:border-emerald-400/60 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white/50 dark:hover:bg-[#0c101d]/50",
      themeColor: "#10b981" 
    },
    { 
      id: "about", 
      labelVi: "Giới thiệu", 
      labelEn: "About", 
      Icon: User, 
      activeBg: "bg-white/40 dark:bg-[#0c101d]/40 border-blue-400/50 text-blue-700 dark:text-blue-300 backdrop-blur-md shadow-[0_0_15px_rgba(37,99,235,0.3)]", 
      hoverBorder: "hover:border-blue-400/60 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/50 dark:hover:bg-[#0c101d]/50",
      themeColor: "#2563eb" 
    },
    { 
      id: "education", 
      labelVi: "Học vấn", 
      labelEn: "Education", 
      Icon: GraduationCap, 
      activeBg: "bg-white/40 dark:bg-[#0c101d]/40 border-indigo-400/50 text-indigo-700 dark:text-indigo-300 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.3)]", 
      hoverBorder: "hover:border-indigo-400/60 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/50 dark:hover:bg-[#0c101d]/50",
      themeColor: "#6366f1" 
    },
    { 
      id: "domains", 
      labelVi: "Lĩnh vực", 
      labelEn: "Domains", 
      Icon: Compass, 
      activeBg: "bg-white/40 dark:bg-[#0c101d]/40 border-amber-400/50 text-amber-700 dark:text-amber-300 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.3)]", 
      hoverBorder: "hover:border-amber-400/60 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-white/50 dark:hover:bg-[#0c101d]/50",
      themeColor: "#f59e0b" 
    },
    { 
      id: "experience", 
      labelVi: "Kinh nghiệm", 
      labelEn: "Experience", 
      Icon: Briefcase, 
      activeBg: "bg-gradient-to-r from-orange-500 to-amber-600 text-white border-orange-300 dark:border-orange-400 shadow-[0_0_18px_rgba(249,115,22,0.65)] ring-2 ring-orange-400/40", 
      hoverBorder: "hover:border-orange-400/60 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-500/10",
      themeColor: "#f97316" 
    },
    { 
      id: "skills", 
      labelVi: "Kỹ năng", 
      labelEn: "Skills", 
      Icon: Brain, 
      activeBg: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-violet-300 dark:border-violet-400 shadow-[0_0_18px_rgba(124,58,237,0.65)] ring-2 ring-violet-400/40", 
      hoverBorder: "hover:border-violet-400/60 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-500/10",
      themeColor: "#7c3aed" 
    },
    { 
      id: "projects", 
      labelVi: "Dự án", 
      labelEn: "Projects", 
      Icon: ClipboardList, 
      activeBg: "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white border-purple-300 dark:border-purple-400 shadow-[0_0_18px_rgba(168,85,247,0.65)] ring-2 ring-purple-400/40", 
      hoverBorder: "hover:border-purple-400/60 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-500/10",
      themeColor: "#a855f7" 
    },
    { 
      id: "systems", 
      labelVi: "Hệ thống", 
      labelEn: "Systems", 
      Icon: Server, 
      activeBg: "bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 font-black border-teal-300 dark:border-teal-400 shadow-[0_0_18px_rgba(20,184,166,0.65)] ring-2 ring-teal-400/40", 
      hoverBorder: "hover:border-teal-400/60 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-500/10",
      themeColor: "#14b8a6" 
    },
    { 
      id: "interview", 
      labelVi: "Phỏng vấn", 
      labelEn: "Interview", 
      Icon: Video, 
      activeBg: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-cyan-300 dark:border-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.65)] ring-2 ring-cyan-400/40", 
      hoverBorder: "hover:border-cyan-400/60 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10",
      themeColor: "#06b6d4" 
    },
    { 
      id: "tuvi", 
      labelVi: "Tử vi", 
      labelEn: "Astrology", 
      Icon: Sparkles, 
      activeBg: "bg-gradient-to-r from-pink-500 to-rose-600 text-white border-pink-300 dark:border-pink-400 shadow-[0_0_18px_rgba(236,72,153,0.65)] ring-2 ring-pink-400/40", 
      hoverBorder: "hover:border-pink-400/60 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-500/10",
      themeColor: "#ec4899" 
    },
    { 
      id: "memories", 
      labelVi: "Kỷ niệm", 
      labelEn: "Memories", 
      Icon: Images, 
      activeBg: "bg-gradient-to-r from-rose-500 to-pink-600 text-white border-rose-300 dark:border-rose-400 shadow-[0_0_18px_rgba(244,63,94,0.65)] ring-2 ring-rose-400/40", 
      hoverBorder: "hover:border-rose-400/60 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10",
      themeColor: "#f43f5e" 
    },
    { 
      id: "contact", 
      labelVi: "Liên hệ", 
      labelEn: "Contact", 
      Icon: MessagesSquare, 
      activeBg: "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white border-fuchsia-300 dark:border-fuchsia-400 shadow-[0_0_18px_rgba(217,70,239,0.65)] ring-2 ring-fuchsia-400/40", 
      hoverBorder: "hover:border-fuchsia-400/60 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 hover:bg-fuchsia-500/10",
      themeColor: "#d946ef" 
    },
  ];

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % navItems.length;
      const nextItem = navItems[nextIndex];
      const el = itemRefs.current[nextItem.id];
      if (el) {
        el.focus();
        if (onNavigate) {
          onNavigate(nextItem.id);
        } else {
          const sec = document.getElementById(nextItem.id);
          sec?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + navItems.length) % navItems.length;
      const prevItem = navItems[prevIndex];
      const el = itemRefs.current[prevItem.id];
      if (el) {
        el.focus();
        if (onNavigate) {
          onNavigate(prevItem.id);
        } else {
          const sec = document.getElementById(prevItem.id);
          sec?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }
    } else if (e.key === "Home") {
      e.preventDefault();
      const firstItem = navItems[0];
      const el = itemRefs.current[firstItem.id];
      if (el) {
        el.focus();
        if (onNavigate) onNavigate(firstItem.id);
      }
    } else if (e.key === "End") {
      e.preventDefault();
      const lastItem = navItems[navItems.length - 1];
      const el = itemRefs.current[lastItem.id];
      if (el) {
        el.focus();
        if (onNavigate) onNavigate(lastItem.id);
      }
    }
  };

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e?.preventDefault?.();
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      }
    }
  };

  // Dedicated clean flat styling for header with glassmorphism standard
  const getHeaderContainerStyle = () => {
    return cn(
      "border-b border-x border-t-0",
      getUnifiedSurfaceStyle(theme)
    );
  };

  return (
    <>
      <header
        id="header"
        onMouseEnter={() => setIsHeaderHovered?.(true)}
        onMouseLeave={() => setIsHeaderHovered?.(false)}
        className={cn(
          "fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-50px)] max-w-[1280px] rounded-b-[24px] rounded-t-none backdrop-blur-[20px] transition-all duration-300 flex items-center justify-between border-x border-b border-t-0 border-white/20 dark:border-white/10 shadow-xl px-2 sm:px-4 py-1.5 h-[68px] select-none box-border",
          getHeaderContainerStyle()
        )}
      >
        {/* 1. KHU VỰC TRÁI: 10% chứa Avatar Hùng Thái - Bấm vào sẽ mở vCard QR */}
        <div className="basis-[10%] w-[10%] min-w-[56px] max-w-[10%] h-full flex items-center justify-center p-1 z-40 shrink-0">
          <div
            className="relative h-full flex items-center justify-center cursor-pointer group"
            title={isVi ? "Anh Nguyễn Hùng Thái - Bấm xem danh thiếp vCard & Mã QR" : "Mr. Nguyen Hung Thai - Click for vCard QR"}
            onClick={() => {
              try { playUiSound("click"); } catch {}
              window.dispatchEvent(new CustomEvent('open-vcard-qr'));
            }}
          >
            <div className="relative h-[48px] w-[48px] sm:h-[54px] sm:w-[54px] rounded-full p-[2.5px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 shadow-lg shadow-cyan-500/30 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
              <img
                src="https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif"
                alt="Hùng Thái Avata Gif"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 animate-pulse shadow-sm z-10" title="Online" />
          </div>
        </div>

        {/* 2. KHU VỰC GIỮA: Menu icon với hiệu ứng Over Mouse & Chọn trang màu sắc riêng biệt */}
        <nav
          ref={navRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleNavMouseEnter}
          className="flex-1 flex items-center justify-center h-full px-1 overflow-x-auto no-scrollbar scroll-smooth py-1 w-full max-w-full z-30"
          aria-label="Navigation Header Menu"
        >
          <div className="flex items-center h-full justify-center gap-1 sm:gap-1.5 min-w-0 p-[2px] select-none">
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;
              const displayTitle = isVi ? item.labelVi : item.labelEn;

              return (
                <a
                  key={item.id}
                  ref={(el) => { itemRefs.current[item.id] = el; }}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  title={displayTitle}
                  className={cn(
                    "group/btn relative h-9 min-h-[36px] rounded-full flex items-center transition-all duration-300 cursor-pointer select-none shrink-0 border outline-none",
                    isActive
                      ? cn(
                          "px-3 z-30 font-bold scale-[1.03]",
                          item.activeBg
                        )
                      : cn(
                          "px-2.5 z-10 bg-white/50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200/70 dark:border-white/10 shadow-2xs backdrop-blur-md",
                          item.hoverBorder,
                          "hover:z-20 hover:scale-[1.04] hover:shadow-md hover:px-3"
                        )
                  )}
                  style={{
                    boxSizing: "border-box"
                  }}
                >
                  {/* Icon with glow */}
                  <div className="relative flex items-center justify-center shrink-0 w-4 h-4 z-10">
                    <item.Icon className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform duration-300 group-hover/btn:scale-110", isActive && "drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]")} />
                  </div>

                  {/* Tiêu đề bên phải icon: Luôn hiển thị khi chọn trang (active), hoặc trượt mở rộng hiển thị khi over mouse (hover) */}
                  <span 
                    className={cn(
                      "relative z-10 text-[11px] sm:text-[12px] font-bold whitespace-nowrap transition-all duration-300 ease-out font-play tracking-tight",
                      isActive 
                        ? "max-w-[140px] opacity-100 ml-1.5" 
                        : "max-w-0 opacity-0 overflow-hidden ml-0 group-hover/btn:max-w-[130px] group-hover/btn:opacity-100 group-hover/btn:ml-1.5"
                    )}
                  >
                    {displayTitle}
                  </span>
                </a>
              );
            })}
          </div>
        </nav>

        {/* 3. KHU VỰC PHẢI: 10% chứa Avatar AI hỗ trợ */}
        <div className="basis-[10%] w-[10%] min-w-[56px] max-w-[10%] h-full flex items-center justify-center p-1 z-40 shrink-0">
          <button
            type="button"
            onClick={() => {
              try { playUiSound("click"); } catch {}
              window.dispatchEvent(new CustomEvent('open-ai-assistant'));
              window.dispatchEvent(new CustomEvent('toggle-ai-chat'));
            }}
            className="h-full flex items-center justify-center cursor-pointer group p-0.5"
            title={isVi ? "Mở Trợ lý AI Hỗ trợ - Trao đổi thông minh" : "Open AI Support Assistant"}
          >
            <div className="relative h-full flex items-center justify-center">
              <div className="relative h-[48px] w-[48px] sm:h-[54px] sm:w-[54px] rounded-full p-[2.5px] bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 shadow-lg shadow-purple-500/30 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
                <img
                  src="https://i.ibb.co/YqTwLXG/Avata-Ti-chuoi-2.gif"
                  alt="Avata Ti chuoi 2"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-white dark:border-slate-900 animate-pulse shadow-sm z-10" title="AI Support Ready" />
            </div>
          </button>
        </div>
      </header>
    </>
  );
}

export default memo(Header);

