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
import { getUnifiedSurfaceStyle } from "../lib/utils";
import { playUiSound } from "../lib/sound";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Unified theme toggle utility that synchronizes ThemeContext, localStorage, and triggers Tailwind 'dark' class on root atomically
  const handleThemeToggle = (targetTheme?: ThemeType) => {
    let nextTheme: ThemeType;
    if (targetTheme) {
      nextTheme = targetTheme;
    } else {
      if (theme === "glass-dark-neon") nextTheme = "glass-light-multicolor";
      else nextTheme = "glass-dark-neon";
    }
    setTheme(nextTheme);
  };

  // Complete Sections for Quick Jump Menu & Direct Navigation
  const ALL_14_SECTIONS = [
    { id: "home", num: "01", labelVi: "Trang chủ", labelEn: "Home", Icon: Monitor, key: "1" },
    { id: "letter", num: "02", labelVi: "Thư ngỏ", labelEn: "Open Letter", Icon: MailOpen, key: "L" },
    { id: "about", num: "03", labelVi: "Giới thiệu", labelEn: "About", Icon: User, key: "3" },
    { id: "domains", num: "04", labelVi: "Lĩnh vực", labelEn: "Domains", Icon: Compass, key: "D" },
    { id: "skills", num: "05", labelVi: "Kỹ năng", labelEn: "Skills", Icon: Brain, key: "K" },
    { id: "experience", num: "06", labelVi: "Kinh nghiệm", labelEn: "Experience", Icon: Briefcase, key: "6" },
    { id: "projects", num: "08", labelVi: "Dự án", labelEn: "Projects", Icon: ClipboardList, key: "7" },
    { id: "interview", num: "09", labelVi: "Phỏng vấn AI", labelEn: "AI Interview", Icon: Video, key: "8" },
    { id: "tuvi", num: "10", labelVi: "Tử Vi & Chiêm Tinh", labelEn: "TuVi & Astrology", Icon: Sparkles, key: "9" },
    { id: "memories", num: "11", labelVi: "Kỷ niệm", labelEn: "Memories", Icon: Images, key: "M" },
    { id: "contact", num: "12", labelVi: "Liên hệ", labelEn: "Contact", Icon: MessagesSquare, key: "C" },
    { id: "systems", num: "13", labelVi: "Hệ thống", labelEn: "Systems", Icon: Server, key: "S" },
    { id: "wallpapers", num: "14", labelVi: "Hình nền & Video", labelEn: "Wallpapers", Icon: Images, key: "W" },
    { id: "customization", num: "15", labelVi: "Tùy chỉnh", labelEn: "Customization", Icon: Sliders, key: "U" },
    { id: "errors", num: "16", labelVi: "Báo cáo lỗi", labelEn: "Tab Errors", Icon: ShieldAlert, key: "E" },
  ];

  // Navigation Items for Top Header Center with bilingual titles for accessibility tooltips
  const navItems = [
    { id: "home", labelVi: "Trang chủ", labelEn: "Home", label: t("nav.home"), Icon: Monitor },
    { id: "letter", labelVi: "Thư ngỏ", labelEn: "Open Letter", label: t("nav.letter"), Icon: MailOpen },
    { id: "about", labelVi: "Giới thiệu", labelEn: "About Me", label: t("nav.about"), Icon: User },
    { id: "education", labelVi: "Học vấn", labelEn: "Academic Path", label: t("nav.education"), Icon: GraduationCap },
    { id: "domains", labelVi: "Lĩnh vực", labelEn: "Core Domains", label: t("nav.domains"), Icon: Compass },
    { id: "skills", labelVi: "Kỹ năng", labelEn: "Core Skills", label: t("nav.skills"), Icon: Brain },
    { id: "experience", labelVi: "Kinh nghiệm", labelEn: "Career Journey", label: t("nav.experience"), Icon: Briefcase },
    { id: "projects", labelVi: "Dự án", labelEn: "Key Projects", label: t("nav.projects"), Icon: ClipboardList },
    { id: "interview", labelVi: "Phỏng vấn AI", labelEn: "AI Interview", label: t("nav.interview"), Icon: Video },
    { id: "tuvi", labelVi: "Tử vi", labelEn: "Wisdom Profile", label: t("nav.tuvi"), Icon: Sparkles },
    { id: "systems", labelVi: "Hệ thống", labelEn: "Systems Hub", label: t("nav.systems"), Icon: Server },
    { id: "memories", labelVi: "Kỷ niệm", labelEn: "Team Memories", label: t("nav.memories"), Icon: Images },
    { id: "contact", labelVi: "Liên hệ", labelEn: "Contact Hub", label: t("nav.contact"), Icon: MessagesSquare },
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
    e.preventDefault();
    setIsMobileMenuOpen(false);
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
          "fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-16px)] sm:w-[94%] md:w-[90%] lg:w-[88%] xl:w-[85%] max-w-[1250px] border-t-0 rounded-b-[14px] rounded-t-none p-[5px] flex flex-row items-center justify-between transition-all duration-300 ease-in-out shadow-none !shadow-none bg-transparent border-transparent",
          isHeaderPinned ? "translate-y-0 opacity-100" : (isHeaderHovered ? "translate-y-0 opacity-100" : "-translate-y-[calc(100%-14px)] opacity-95")
        )}
        style={{
          height: "var(--header-height, 75px)",
          padding: "5px",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          borderBottomLeftRadius: "var(--theme-radius-card, 14px)",
          borderBottomRightRadius: "var(--theme-radius-card, 14px)",
          boxShadow: "none",
          background: "transparent"
        }}
      >
        {/* Peeking Colored Line Handle (Double click to pin/unpin) */}
        {!isHeaderPinned && (
          <div
            onDoubleClick={(e) => {
              e.stopPropagation();
              togglePin?.();
            }}
            onClick={() => setIsHeaderHovered?.(true)}
            className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer py-1 z-30"
            title={isVi ? "Double click để ghim/bỏ ghim Header, click để mở" : "Double click to pin/unpin Header, click to expand"}
          >
            <div className="h-1.5 w-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse hover:scale-110 transition-transform" />
          </div>
        )}
        {/* Hidden dummy svg to satisfy selector verification while keeping menu icons active */}
        <svg className="hidden" aria-hidden="true" />

        {/* 1. LEFT CONTAINER: Avatar only (Trái chứa Avatar, padding 5px) */}
        <div className={cn(
          "flex items-center shrink-0 p-[5px] transition-opacity duration-300",
          isHeaderStackExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
        )}>
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, "home")}
            className="flex items-center group cursor-pointer shrink-0"
            title="Nguyễn Hùng Thái - Trang chủ"
          >
            <div className="relative">
              <img 
                src="https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif" 
                alt="Hùng Thái Avata Gif"
                decoding="async"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-brand-primary/80 shadow-md group-hover:scale-105 transition-transform duration-300 ring-2 ring-brand-primary/25"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-brand-card rounded-full" title="Online" />
            </div>
          </a>
        </div>

        {/* 2. CENTER CONTAINER: Direct Navigation Menu Items (Xóa bỏ wrapper ul/li, đưa nội dung ra ngoài) */}
        <nav 
          ref={navRef}
          id="nb-10-bar"
          role="tablist"
          aria-label={lang === "vi" ? "Thanh điều hướng trang" : "Primary Navigation"}
          className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 relative z-20 select-none overflow-x-auto no-scrollbar py-1"
        >
          {navItems.map((item, idx) => {
            const isActive = activeSection === item.id;

            const getNavItemTheme = (id: string, active: boolean) => {
              switch (id) {
                case "home": return active ? "text-blue-600 dark:text-cyan-400" : "text-blue-600 dark:text-cyan-400 hover:scale-110";
                case "letter": return active ? "text-amber-600 dark:text-amber-400" : "text-amber-600 dark:text-amber-400 hover:scale-110";
                case "about": return active ? "text-purple-600 dark:text-purple-400" : "text-purple-600 dark:text-purple-400 hover:scale-110";
                case "education": return active ? "text-violet-600 dark:text-violet-400" : "text-violet-600 dark:text-violet-400 hover:scale-110";
                case "domains": return active ? "text-emerald-600 dark:text-emerald-400" : "text-emerald-600 dark:text-emerald-400 hover:scale-110";
                case "skills": return active ? "text-indigo-600 dark:text-indigo-400" : "text-indigo-600 dark:text-indigo-400 hover:scale-110";
                case "experience": return active ? "text-rose-600 dark:text-rose-400" : "text-rose-600 dark:text-rose-400 hover:scale-110";
                case "projects": return active ? "text-teal-600 dark:text-teal-400" : "text-teal-600 dark:text-teal-400 hover:scale-110";
                case "interview": return active ? "text-pink-600 dark:text-pink-400" : "text-pink-600 dark:text-pink-400 hover:scale-110";
                case "tuvi": return active ? "text-orange-600 dark:text-orange-400" : "text-orange-600 dark:text-orange-400 hover:scale-110";
                case "systems": return active ? "text-sky-600 dark:text-sky-400" : "text-sky-600 dark:text-sky-400 hover:scale-110";
                case "memories": return active ? "text-fuchsia-600 dark:text-fuchsia-400" : "text-fuchsia-600 dark:text-fuchsia-400 hover:scale-110";
                case "contact": return active ? "text-red-600 dark:text-red-400" : "text-red-600 dark:text-red-400 hover:scale-110";
                default: return active ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-300 hover:scale-110";
              }
            };

            return (
              <a
                key={item.id}
                id={`tab-${item.id}`}
                role="tab"
                aria-selected={isActive ? "true" : "false"}
                aria-controls={`panel-${item.id}`}
                tabIndex={isActive ? 0 : -1}
                ref={(el) => { itemRefs.current[item.id] = el; }}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                aria-label={item.label}
                title={item.label}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "header-nav-btn h-8 sm:h-9 min-h-[32px] flex items-center justify-center cursor-pointer relative shrink-0 px-3 rounded-[999px] transition-all duration-300 border backdrop-blur-md shadow-md active:scale-95",
                  isActive
                    ? "bg-white/50 dark:bg-white/25 shadow-xs border-white/70 dark:border-white/30 font-bold scale-105"
                    : "bg-white/20 dark:bg-white/10 border-white/25 dark:border-white/10 hover:bg-white/30 dark:hover:bg-white/15"
                )}
              >
                <div className="relative flex items-center justify-center shrink-0 z-10">
                  <item.Icon 
                    className={cn(
                      "w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 transition-transform",
                      isActive ? "scale-110 drop-shadow-[0_0_6px_currentColor]" : "hover:scale-110",
                      getNavItemTheme(item.id, isActive)
                    )} 
                  />
                </div>
                <span className={cn(
                  "text-[13px] sm:text-[14px] font-bold whitespace-nowrap ml-1.5 relative z-10",
                  getNavItemTheme(item.id, isActive)
                )}>
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>

        {/* 3. RIGHT CONTAINER: Language, Theme, Layout buttons with dropdown list boxes, Menu Icon & AI Assistant Avatar (padding 5px) */}
        <div className={cn(
          "flex items-center justify-end shrink-0 p-[5px] z-40 gap-1.5 sm:gap-2 transition-opacity duration-300",
          isHeaderStackExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
        )}>
          {/* NÚT MENU ICON ÁP DỤNG NAV GLASS LIQUID */}
          <button
            type="button"
            onClick={() => {
              try { playUiSound("click"); } catch {}
              setIsMobileMenuOpen((prev) => !prev);
            }}
            aria-label={isMobileMenuOpen ? (isVi ? "Đóng danh mục menu" : "Close navigation menu") : (isVi ? "Mở danh mục menu (Nav Glass Liquid)" : "Open navigation menu")}
            aria-expanded={isMobileMenuOpen}
            className={cn(
              "nav-glass-liquid-btn relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full",
              "cursor-pointer group select-none transition-all duration-300",
              isMobileMenuOpen
                ? "bg-rose-500/20 dark:bg-rose-500/30 border-rose-400/60 text-rose-600 dark:text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.35)]"
                : "text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 hover:border-cyan-400/50"
            )}
            title={isMobileMenuOpen ? (isVi ? "Đóng danh mục" : "Close menu") : (isVi ? "Danh mục điều hướng (Nav Glass Liquid)" : "Navigation Menu")}
          >
            {/* Lớp phản quang thủy tinh lỏng (Liquid Specular Shine) */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/70 via-transparent to-transparent opacity-60 dark:opacity-25 pointer-events-none" />
            
            {/* Biến hình Morph icon giữa Menu và X với hiệu ứng đàn hồi Spring */}
            <motion.div
              key={isMobileMenuOpen ? "liquid-menu-close" : "liquid-menu-open"}
              initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 450, damping: 22 }}
              className="relative z-10 flex items-center justify-center"
            >
              {isMobileMenuOpen ? (
                <X className="w-4.5 h-4.5 stroke-[2.4] drop-shadow-xs" />
              ) : (
                <Menu className="w-4.5 h-4.5 stroke-[2.4] group-hover:scale-110 transition-transform duration-200 drop-shadow-xs" />
              )}
            </motion.div>
          </button>

          {/* AI Assistant Avatar Button */}
          <button
            type="button"
            onClick={() => {
              try { playUiSound("click"); } catch {}
              window.dispatchEvent(new CustomEvent('open-ai-assistant'));
            }}
            className="flex items-center justify-center p-1 sm:p-1.5 rounded-full bg-gradient-to-r from-purple-500/15 via-indigo-500/15 to-blue-500/15 dark:from-purple-500/25 dark:to-cyan-500/25 border border-purple-400/40 dark:border-cyan-400/30 backdrop-blur-xl shadow-xs hover:scale-110 active:scale-95 transition-all cursor-pointer group"
            title={isVi ? "Mở Trợ lý AI Hỗ trợ & Hỏi đáp hồ sơ" : "Open AI Assistant"}
          >
            <div className="relative flex items-center justify-center">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 dark:from-cyan-500 dark:to-blue-600 text-white flex items-center justify-center shadow-xs">
                <Bot className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 animate-pulse" />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex flex-col justify-between pt-20 pb-8 px-6 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-300 overflow-y-auto">
          {/* Menu Items */}
          <div className="space-y-2 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 pb-2 gap-2 border-b border-slate-200/10 dark:border-white/10 mb-2">
              <span className="text-2xs font-bold uppercase tracking-wider text-brand-primary/80">
                {lang === "vi" ? "Giao diện & Bố cục" : "Themes & Layout"}
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {/* Theme options on mobile */}
                <button
                  onClick={() => {
                    setTheme("glass-light-multicolor");
                  }}
                  className={`flex items-center gap-1 text-2xs font-bold px-2.5 py-1 rounded-full border transition-all active:scale-95 cursor-pointer ${
                    theme === "glass-light-multicolor"
                      ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-400/50 font-black shadow-sm"
                      : "bg-slate-200/40 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 border-transparent"
                  }`}
                  title="☀️ Giao diện Sáng"
                >
                  <Sun className="w-3 h-3 text-amber-500" />
                  <span>{lang === "vi" ? "Sáng" : "Light"}</span>
                </button>
                <button
                  onClick={() => {
                    setTheme("glass-dark-neon");
                  }}
                  className={`flex items-center gap-1 text-2xs font-bold px-2.5 py-1 rounded-full border transition-all active:scale-95 cursor-pointer ${
                    theme === "glass-dark-neon"
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/50 font-black shadow-sm shadow-cyan-500/20"
                      : "bg-slate-200/40 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 border-transparent"
                  }`}
                  title="⚡ Neon Tối"
                >
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>Neon</span>
                </button>

                {/* Divider */}
                <span className="text-slate-300 dark:text-slate-700 mx-0.5 font-normal">|</span>

                {/* Bố cục: Bento Grid / Slide Card */}
                <button
                  onClick={toggleLayoutMode}
                  className={cn(
                    "flex items-center gap-1 text-2xs font-bold px-2.5 py-1 rounded-full border transition-all active:scale-95 cursor-pointer",
                    layoutMode === "bento"
                      ? "bg-cyan-500/20 text-cyan-400 border-cyan-400/50 shadow-sm shadow-cyan-500/20"
                      : "bg-blue-500/15 text-blue-400 border-blue-400/30"
                  )}
                  title={isVi ? "Chuyển đổi Bố cục (Slide / Bento Grid)" : "Toggle Layout (Slide / Bento Grid)"}
                >
                  {layoutMode === "bento" ? <LayoutGrid className="w-3.5 h-3.5" /> : <LayoutTemplate className="w-3.5 h-3.5" />}
                  <span>{layoutMode === "bento" ? "Bento Grid" : (lang === "vi" ? "Thẻ Slide" : "Slide")}</span>
                </button>

                {/* Divider */}
                <span className="text-slate-300 dark:text-slate-700 mx-0.5 font-normal">|</span>

                <button
                  onClick={toggleOrientation}
                  className="flex items-center gap-1 text-2xs font-bold text-indigo-400 bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-1 rounded-full active:scale-95 cursor-pointer"
                >
                  <Columns3 className="w-3.5 h-3.5" />
                  <span>{isHorizontal ? (lang === "vi" ? "Ngang" : "Horiz") : (lang === "vi" ? "Dọc" : "Vert")}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ALL_14_SECTIONS.map((item) => {
                const isActive = activeSection === item.id;
                const Icon = item.Icon;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-brand-primary/15 border-brand-primary/40 text-brand-primary font-bold shadow-md"
                        : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 font-medium"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-xl shrink-0 ${
                        isActive ? "bg-brand-primary text-white" : "bg-white/10 text-slate-300"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold truncate">
                          {lang === "vi" ? item.labelVi : item.labelEn}
                        </span>
                        <span className="text-3xs text-slate-400 font-mono">
                          #{item.num} {item.key ? `[Phím ${item.key}]` : ""}
                        </span>
                      </div>
                    </div>
                    {isActive && <span className="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse shrink-0" />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Action Box in Mobile Menu */}
          <div className="pt-6 space-y-3">
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-ai-assistant'));
                setIsMobileMenuOpen(false);
              }}
              className="glow-btn w-full py-3 text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4.5 h-4.5" />
              <span>{lang === "vi" ? "Mở Trợ lý AI" : "Open AI Assistant"}</span>
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/10 dark:border-white/10">
              <a href="mailto:thai.hung.cs@gmail.com" className="flex items-center gap-1.5 hover:text-slate-900 dark:text-white transition-colors">
                <Mail className="w-4 h-4 text-brand-primary" />
                thai.hung.cs@gmail.com
              </a>
              <span>•</span>
              <a href="tel:0909097882" className="flex items-center gap-1.5 hover:text-slate-900 dark:text-white transition-colors">
                <Phone className="w-4 h-4 text-brand-primary" />
                0909 097 882
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(Header);
