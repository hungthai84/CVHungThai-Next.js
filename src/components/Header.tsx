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
  MessagesSquare,
  Mail,
  MailOpen,
  FileText,
  Phone,
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
  Pin,
  Server,
  LayoutTemplate
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { useLayout } from "../context/LayoutContext";
import { useTheme, ThemeType, COLOR_PRESETS } from "../context/ThemeContext";
import { useHeader } from "../context/HeaderContext";

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

  const { lang, setLang, t } = useLanguage();
  const isVi = lang === "vi";
  const { orientation, toggleOrientation } = useLayout();
  const isHorizontal = orientation === "horizontal";

  // Global Header Pinning Context
  const { 
    togglePin, 
    isHeaderPinned, 
    isHeaderHovered, 
    setIsHeaderHovered, 
    isHeaderSlidUp 
  } = useHeader();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [hoveredNavId, setHoveredNavId] = useState<string | null>(null);
  const [hoveredHeaderIcon, setHoveredHeaderIcon] = useState<string | null>(null);

  const navRef = useRef<HTMLElement>(null);
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

  // Close unpinned header on click outside when expanded
  useEffect(() => {
    if (isHeaderPinned || !isHeaderHovered) return;
    const handleOutsideInteraction = (e: globalThis.MouseEvent | TouchEvent) => {
      const headerEl = document.getElementById("header");
      if (headerEl && !headerEl.contains(e.target as Node)) {
        setIsHeaderHovered(false);
        setIsThemeDropdownOpen(false);
        setIsColorDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideInteraction);
    document.addEventListener("touchstart", handleOutsideInteraction);
    return () => {
      document.removeEventListener("mousedown", handleOutsideInteraction);
      document.removeEventListener("touchstart", handleOutsideInteraction);
    };
  }, [isHeaderPinned, isHeaderHovered, setIsHeaderHovered]);

  // Close dropdown popovers when clicking outside dropdown containers
  useEffect(() => {
    const handleClickOutsideDropdowns = (e: globalThis.MouseEvent | TouchEvent) => {
      const target = e.target as Element;
      if (!target.closest('.theme-dropdown-container') && !target.closest('.color-dropdown-container')) {
        setIsThemeDropdownOpen(false);
        setIsColorDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideDropdowns);
    document.addEventListener("touchstart", handleClickOutsideDropdowns);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdowns);
      document.removeEventListener("touchstart", handleClickOutsideDropdowns);
    };
  }, []);

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

  const handleTogglePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isHeaderPinned) {
      togglePin();
      setIsHeaderHovered(false);
    } else {
      togglePin();
      setIsHeaderHovered(true);
    }
  };

  // Complete Sections for Quick Jump Menu & Mobile Drawer
  const ALL_14_SECTIONS = [
    { id: "home", num: "01", labelVi: "Trang chủ", labelEn: "Home", Icon: Monitor, key: "1" },
    { id: "letter", num: "02", labelVi: "Thư ngỏ", labelEn: "Open Letter", Icon: FileText, key: "L" },
    { id: "about", num: "03", labelVi: "Giới thiệu", labelEn: "About", Icon: User, key: "3" },
    { id: "domains", num: "04", labelVi: "Lĩnh vực", labelEn: "Domains", Icon: Compass, key: "D" },
    { id: "skills", num: "05", labelVi: "Kỹ năng", labelEn: "Skills", Icon: Brain, key: "K" },
    { id: "education", num: "06", labelVi: "Học vấn", labelEn: "Education", Icon: GraduationCap, key: "4" },
    { id: "experience", num: "07", labelVi: "Kinh nghiệm", labelEn: "Experience", Icon: Briefcase, key: "6" },
    { id: "projects", num: "08", labelVi: "Dự án", labelEn: "Projects", Icon: ClipboardList, key: "7" },
    { id: "interview", num: "09", labelVi: "Phỏng vấn AI", labelEn: "AI Interview", Icon: Video, key: "8" },
    { id: "tuvi", num: "10", labelVi: "Tử Vi & Chiêm Tinh", labelEn: "TuVi & Astrology", Icon: Sparkles, key: "9" },
    { id: "memories", num: "11", labelVi: "Kỷ niệm", labelEn: "Memories", Icon: Images, key: "M" },
    { id: "contact", num: "12", labelVi: "Liên hệ", labelEn: "Contact", Icon: MessagesSquare, key: "C" },
    { id: "systems", num: "13", labelVi: "Hệ thống", labelEn: "Systems", Icon: Server, key: "S" },
    { id: "wallpapers", num: "14", labelVi: "Hình nền & Video", labelEn: "Wallpapers", Icon: Images, key: "W" },
    { id: "customization", num: "15", labelVi: "Tùy chỉnh", labelEn: "Customization", Icon: Sliders, key: "U" },
    { id: "template", num: "16", labelVi: "Trang mẫu", labelEn: "Template", Icon: LayoutTemplate, key: "T" },
  ];

  // Navigation Items for Top Header Center with bilingual titles for accessibility tooltips
  const navItems = [
    { id: "home", labelVi: "Trang chủ", labelEn: "Home", label: t("nav.home"), Icon: Monitor },
    { id: "letter", labelVi: "Thư ngỏ", labelEn: "Open Letter", label: t("nav.letter"), Icon: FileText },
    { id: "about", labelVi: "Giới thiệu", labelEn: "About Me", label: t("nav.about"), Icon: User },
    { id: "domains", labelVi: "Lĩnh vực", labelEn: "Core Domains", label: t("nav.domains"), Icon: Compass },
    { id: "skills", labelVi: "Kỹ năng", labelEn: "Core Skills", label: t("nav.skills"), Icon: Brain },
    { id: "education", labelVi: "Học vấn", labelEn: "Academic Path", label: t("nav.education"), Icon: GraduationCap },
    { id: "experience", labelVi: "Kinh nghiệm", labelEn: "Career Journey", label: t("nav.experience"), Icon: Briefcase },
    { id: "projects", labelVi: "Dự án", labelEn: "Key Projects", label: t("nav.projects"), Icon: ClipboardList },
    { id: "interview", labelVi: "Phỏng vấn AI", labelEn: "AI Interview", label: t("nav.interview"), Icon: Video },
    { id: "tuvi", labelVi: "Tử vi", labelEn: "Wisdom Profile", label: t("nav.tuvi"), Icon: Sparkles },
    { id: "systems", labelVi: "Hệ thống", labelEn: "Systems Hub", label: t("nav.systems"), Icon: Server },
    { id: "memories", labelVi: "Kỷ niệm", labelEn: "Team Memories", label: t("nav.memories"), Icon: Images },
    { id: "contact", labelVi: "Liên hệ", labelEn: "Contact Hub", label: t("nav.contact"), Icon: MessagesSquare },
  ];

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

  const getHeaderContainerStyle = () => {
    switch (theme) {
      case "glass-dark-neon":
        return "bg-[#121218]/85 dark:bg-[#121218]/85 border-b border-x border-t-0 border-white/20 text-slate-100 backdrop-blur-2xl backdrop-saturate-[180%] shadow-[0_10px_35px_0_rgba(0,0,0,0.4)]";
      case "mritech-digital-growth":
      default:
        return "bg-white/75 dark:bg-[#121218]/85 border-b border-x border-t-0 border-white/60 dark:border-white/20 text-slate-800 dark:text-slate-100 backdrop-blur-2xl backdrop-saturate-[180%] shadow-[0_10px_35px_0_rgba(31,38,135,0.12)] dark:shadow-[0_10px_35px_0_rgba(0,0,0,0.4)]";
    }
  };

  // Placement class resolver with slide-up unpinned animation identical to Footer's slide-down animation
  const getHeaderPlacementClass = () => {
    return cn(
      "fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-16px)] sm:w-[94%] md:w-[90%] lg:w-[88%] xl:w-[85%] max-w-[1250px] h-[60px] sm:h-[64px] min-[1250px]:h-[64px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-none !shadow-none",
      isHeaderSlidUp
        ? "-translate-y-[calc(100%-14px)] opacity-90 hover:translate-y-0 hover:opacity-100"
        : "translate-y-0 opacity-100"
    );
  };

  return (
    <>
      <header 
        id="header"
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
        className={`group border-t-0 rounded-b-[10px] rounded-t-none px-3 sm:px-5 md:px-6 flex flex-row items-center justify-between cursor-default ${getHeaderPlacementClass()} ${getHeaderContainerStyle()}`}
        style={{
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          borderBottomLeftRadius: "var(--theme-radius-card, 10px)",
          borderBottomRightRadius: "var(--theme-radius-card, 10px)",
          boxShadow: "none"
        }}
      >
        {/* Unpinned Grab Handle & Peek Indicator at bottom of Header */}
        {!isHeaderPinned && (
          <div 
            onClick={() => setIsHeaderHovered((prev) => !prev)}
            className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer group/handle py-0.5 z-20"
            title={isHeaderSlidUp ? (isVi ? "Rê chuột hoặc chạm để mở header" : "Hover or tap to expand header") : undefined}
          >
            <div className={cn(
              "h-1 sm:h-1.5 rounded-full transition-all duration-300",
              isHeaderSlidUp 
                ? "w-14 sm:w-18 bg-blue-500/80 dark:bg-cyan-400/80 shadow-[0_0_10px_rgba(59,130,246,0.6)] animate-pulse" 
                : "w-8 bg-slate-300/80 dark:bg-slate-600/80 hover:bg-slate-400 dark:hover:bg-slate-500"
            )} />
          </div>
        )}

        {/* Extended Hover Trigger Zone right below header when slid up */}
        {isHeaderSlidUp && (
          <div 
            className="absolute -bottom-4 left-0 right-0 h-5 pointer-events-auto cursor-pointer" 
            aria-hidden="true"
          />
        )}

        {/* LEFT CONTAINER: Left Sidebar Menu Button & Avatar */}
        <div className="flex items-center gap-2.5 shrink-0 z-10">
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("open-left-sidebar"));
            }}
            className="md:hidden flex w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 items-center justify-center transition-all cursor-pointer shadow-2xs"
            title={isVi ? "Mở danh mục (Left Sidebar)" : "Open Left Sidebar"}
          >
            <Menu className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </button>

          {/* Ngăn chứa Avatar (Avatar Drawer Capsule) */}
          <div className="flex items-center p-1 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/15 shadow-sm backdrop-blur-2xl relative shrink-0">
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

          {/* Line vách ngăn Avatar (Avatar Divider Line) */}
          <div className="hidden sm:block w-[1.5px] h-5 sm:h-6 bg-slate-300 dark:bg-slate-700/80 mx-0.5 rounded-full shrink-0" />
        </div>

        {/* CENTER CONTAINER: Navigation Menu with exact height matching controls capsule */}
        <nav 
          ref={navRef}
          onMouseEnter={handleNavMouseEnter}
          onMouseMove={handleMouseMove}
          className={cn(
            "hidden md:flex flex-1 shrink-0 items-center justify-center h-11 sm:h-12 p-1 rounded-full mx-2 lg:mx-3 xl:mx-4 relative group/nav header-nav-container select-none overflow-visible max-w-[760px] min-[1250px]:max-w-[880px] transition-all duration-300 bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/15 shadow-sm backdrop-blur-2xl",
            theme === "glass-dark-neon"
              ? "text-white"
              : "text-slate-900 dark:text-white"
          )}
        >
          {/* Interactive 3D Liquid Glare */}
          <div className="liquid-glare-container">
            <div className="liquid-glare" />
          </div>

          <ul className="header-nav-list flex items-center justify-between gap-0.5 lg:gap-1 xl:gap-1.5 w-full h-full relative z-20 shrink-0 px-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const isHovered = hoveredNavId === item.id;

              return (
                <li
                  key={item.id}
                  className="shrink-0 relative group/navitem flex items-center h-full"
                  onMouseEnter={() => setHoveredNavId(item.id)}
                  onMouseLeave={() => setHoveredNavId(null)}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    aria-label={item.label}
                    title={item.label}
                    className={cn(
                      "w-8 h-8 md:w-8.5 md:h-8.5 lg:w-9 lg:h-9 min-[1250px]:w-10 min-[1250px]:h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer relative shrink-0 overflow-hidden p-1",
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105"
                        : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-blue-500/15"
                    )}
                  >
                    <item.Icon 
                      className={cn(
                        "w-3.5 h-3.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5 transition-transform shrink-0",
                        isActive 
                          ? "text-white stroke-[2.2]" 
                          : "group-hover/navitem:scale-110"
                      )} 
                    />
                    {/* Floating Tooltip in exact Footer style */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.span 
                          initial={{ opacity: 0, y: 6, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.9 }}
                          className="absolute top-full mt-2.5 px-2.5 py-1 rounded-lg text-3xs font-extrabold whitespace-nowrap bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-lg pointer-events-none z-50 uppercase tracking-wider"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* RIGHT CONTAINER: Controls & Actions (Format exactly matching Nav capsule height) */}
        <div className="hidden md:flex items-center justify-end gap-1.5 sm:gap-2 ml-auto shrink-0 z-50 relative">
          
          {/* Main Controls Drawer Capsule: Theme, Color, Wallpaper, Customization, Utilities & Language (VI/EN) */}
          <div className="flex items-center gap-1 h-11 sm:h-12 p-1 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/15 shadow-sm backdrop-blur-2xl relative">
            
            {/* 1. Theme Toggle / Dropdown Popover Button */}
            <div className="relative theme-dropdown-container">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsThemeDropdownOpen(!isThemeDropdownOpen);
                  setIsColorDropdownOpen(false);
                }}
                onMouseEnter={() => setHoveredHeaderIcon("theme")}
                onMouseLeave={() => setHoveredHeaderIcon(null)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-amber-500 dark:text-cyan-400 hover:bg-amber-500/15 dark:hover:bg-cyan-500/15 transition-all cursor-pointer relative group/headicon"
                title={lang === "vi" ? "Giao diện: Sáng / Tối Neon" : "Theme: Light / Dark Neon"}
              >
                <div className="apple-theme-icon-wrapper">
                  <Sun className="apple-sun-icon w-4.5 h-4.5 sm:w-5 sm:h-5 group-hover/headicon:scale-110 transition-transform" />
                  <Moon className="apple-moon-icon w-4.5 h-4.5 sm:w-5 sm:h-5 group-hover/headicon:scale-110 transition-transform" />
                </div>
                <AnimatePresence>
                  {hoveredHeaderIcon === "theme" && !isThemeDropdownOpen && (
                    <motion.span 
                      initial={{ opacity: 0, y: 6, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.9 }}
                      className="absolute top-full mt-2.5 px-2.5 py-1 rounded-lg text-3xs font-extrabold whitespace-nowrap bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-lg pointer-events-none z-50 uppercase tracking-wider"
                    >
                      {lang === "vi" ? "Giao diện" : "Theme"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Theme Dropdown Popover */}
              <AnimatePresence>
                {isThemeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl bg-white/95 dark:bg-slate-950/95 border border-slate-200/80 dark:border-white/15 p-2.5 shadow-2xl z-[70] backdrop-blur-2xl"
                  >
                    <div className="flex items-center justify-between px-3 py-1 mb-1.5 border-b border-slate-200/60 dark:border-white/10 text-caption font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        <span>{lang === "vi" ? "Tùy chọn giao diện" : "Theme Options"}</span>
                      </span>
                    </div>

                    {[
                      { 
                        id: "system", 
                        label: lang === "vi" ? "Hệ thống (Auto)" : "System (Auto)", 
                        desc: lang === "vi" ? "Tự động theo cấu hình OS" : "Auto adjust to OS setting", 
                        Icon: Monitor, 
                        color: "text-indigo-500 dark:text-cyan-400",
                        isSystem: true
                      },
                      { 
                        id: "mritech-digital-growth", 
                        label: lang === "vi" ? "Sáng (Light)" : "Light Mode", 
                        desc: lang === "vi" ? "Kính mờ Light Mode sang trọng" : "Modern Light Glass", 
                        Icon: Sun, 
                        color: "text-amber-500",
                        isSystem: false
                      },
                      { 
                        id: "glass-dark-neon", 
                        label: lang === "vi" ? "Tối Neon (Dark)" : "Dark Neon", 
                        desc: lang === "vi" ? "Kính mờ Dark Mode phát sáng Neon" : "Modern Dark Neon", 
                        Icon: Moon, 
                        color: "text-cyan-400",
                        isSystem: false
                      }
                    ].map((tItem) => {
                      const isSelected = tItem.isSystem 
                        ? themeContext.themeMode === "system" 
                        : (themeContext.themeMode !== "system" && theme === tItem.id);
                      return (
                        <button
                          key={tItem.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (tItem.isSystem) {
                              themeContext.setThemeMode("system");
                            } else {
                              themeContext.setThemeMode(tItem.id === "glass-dark-neon" ? "dark" : "light");
                            }
                            setIsThemeDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-start gap-2.5 cursor-pointer mb-1 last:mb-0 ${
                            isSelected
                              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold shadow-xs"
                              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-white/10"
                          }`}
                        >
                          <tItem.Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? "text-white dark:text-slate-950" : tItem.color}`} />
                          <div className="flex-1 min-w-0 flex flex-col text-left">
                            <span className="text-xs font-bold leading-tight">{tItem.label}</span>
                            <span className={`text-caption mt-0.5 leading-normal ${isSelected ? "text-slate-300 dark:text-slate-400" : "text-slate-500 dark:text-slate-400"}`}>
                              {tItem.desc}
                            </span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-white dark:text-slate-950" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Color Preset Button */}
            <div className="relative color-dropdown-container">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsColorDropdownOpen(!isColorDropdownOpen);
                  setIsThemeDropdownOpen(false);
                }}
                onMouseEnter={() => setHoveredHeaderIcon("color")}
                onMouseLeave={() => setHoveredHeaderIcon(null)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-slate-200/50 dark:hover:bg-white/10 transition-all cursor-pointer relative group/headicon"
                title={lang === "vi" ? "Chọn Nhóm Màu Sắc" : "Color Presets"}
              >
                <Palette 
                  className="w-4.5 h-4.5 sm:w-5 sm:h-5 group-hover/headicon:scale-110 transition-transform" 
                  style={{ color: "var(--color-primary)" }}
                />
                <span 
                  className="absolute bottom-1 right-1 w-2 h-2 rounded-full border border-white dark:border-slate-900 shadow-xs"
                  style={{ backgroundColor: "var(--color-primary)" }}
                />
                <AnimatePresence>
                  {hoveredHeaderIcon === "color" && !isColorDropdownOpen && (
                    <motion.span 
                      initial={{ opacity: 0, y: 6, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.9 }}
                      className="absolute top-full mt-2.5 px-2.5 py-1 rounded-lg text-3xs font-extrabold whitespace-nowrap bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-lg pointer-events-none z-50 uppercase tracking-wider"
                    >
                      {lang === "vi" ? "Màu sắc" : "Colors"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Color Preset Popover Dropdown */}
              <AnimatePresence>
                {isColorDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-80 sm:w-88 rounded-2xl bg-white/95 dark:bg-slate-950/95 border border-slate-200/80 dark:border-white/15 p-3 shadow-2xl z-[70] backdrop-blur-2xl"
                  >
                    <div className="flex items-center justify-between px-1 pb-2 mb-2 border-b border-slate-200/50 dark:border-white/10">
                      <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-[var(--color-primary)]" />
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {lang === "vi" ? "Chọn Nhóm Màu Sắc" : "Select Color Group"}
                        </span>
                      </div>
                      <span className="text-3xs font-bold px-2 py-0.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20">
                        {theme === "glass-dark-neon" ? "Dark Neon ⚡" : "Light Glass ☀️"}
                      </span>
                    </div>

                    {/* Current 5 Colors Preview Bar */}
                    <div className="p-2 mb-2 rounded-xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/40 dark:border-white/5">
                      <div className="text-3xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 flex items-center justify-between">
                        <span>{lang === "vi" ? "Bộ 5 Màu Đang Dùng:" : "Current 5 Colors:"}</span>
                        <span className="font-mono text-3xs text-[var(--color-primary)] font-bold">5 Tokens</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5">
                        {themeContext.activePalette.map((tok) => (
                          <div key={tok.id} className="flex flex-col items-center gap-0.5">
                            <span 
                              className="w-full h-4.5 rounded-md shadow-xs border border-black/10 dark:border-white/15"
                              style={{ backgroundColor: tok.hex }}
                              title={`${tok.nameVi} (${tok.hex})`}
                            />
                            <span className="text-3xs font-mono text-slate-400 truncate w-full text-center">
                              {tok.hex}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5 max-h-60 overflow-y-auto pr-0.5 custom-scrollbar">
                      {COLOR_PRESETS.map((preset) => {
                        const isSelected = themeContext.colorPreset === preset.id;
                        const isDarkTheme = theme === "glass-dark-neon";
                        const c = isDarkTheme ? preset.dark : preset.light;

                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              themeContext.setColorPreset(preset.id);
                            }}
                            className={`w-full text-left p-2 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer border ${
                              isSelected
                                ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)] text-slate-900 dark:text-white font-semibold shadow-xs"
                                : "bg-transparent border-slate-200/40 dark:border-white/5 hover:bg-slate-100/60 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="flex items-center -space-x-1 shrink-0">
                                <span className="w-3.5 h-3.5 rounded-full border border-white/60 dark:border-slate-900" style={{ backgroundColor: c.primary }} />
                                <span className="w-3.5 h-3.5 rounded-full border border-white/60 dark:border-slate-900" style={{ backgroundColor: c.secondary }} />
                                <span className="w-3.5 h-3.5 rounded-full border border-white/60 dark:border-slate-900" style={{ backgroundColor: c.accent }} />
                              </div>
                              <div className="min-w-0">
                                <div className="font-semibold text-xs truncate flex items-center gap-1.5">
                                  <span>{lang === "vi" ? preset.nameVi : preset.name}</span>
                                </div>
                              </div>
                            </div>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shrink-0 shadow-xs">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Wallpaper Button */}
            <button
              type="button"
              onClick={() => {
                if (onNavigate) {
                  onNavigate("wallpapers");
                } else {
                  const el = document.getElementById("wallpapers");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              onMouseEnter={() => setHoveredHeaderIcon("wallpapers")}
              onMouseLeave={() => setHoveredHeaderIcon(null)}
              className={cn(
                "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer relative group/headicon",
                activeSection === "wallpapers"
                  ? "bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105"
                  : "text-rose-500 dark:text-rose-400 hover:bg-rose-500/15"
              )}
              title={lang === "vi" ? "Cài đặt Hình nền & Video" : "Wallpaper & Video Settings"}
            >
              <Images className="w-4.5 h-4.5 sm:w-5 sm:h-5 group-hover/headicon:scale-110 transition-transform" />
              <AnimatePresence>
                {hoveredHeaderIcon === "wallpapers" && (
                  <motion.span 
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.9 }}
                    className="absolute top-full mt-2.5 px-2.5 py-1 rounded-lg text-3xs font-extrabold whitespace-nowrap bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-lg pointer-events-none z-50 uppercase tracking-wider"
                  >
                    {lang === "vi" ? "Hình nền" : "Wallpaper"}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* 4. Customization Page Button */}
            <button
              type="button"
              onClick={() => {
                if (onNavigate) {
                  onNavigate("customization");
                } else {
                  const el = document.getElementById("customization");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              onMouseEnter={() => setHoveredHeaderIcon("customization")}
              onMouseLeave={() => setHoveredHeaderIcon(null)}
              className={cn(
                "h-9 sm:h-10 px-3.5 rounded-full flex flex-row items-center gap-1.5 transition-all cursor-pointer relative group/headicon font-extrabold text-3xs sm:text-2xs uppercase tracking-wider shrink-0",
                activeSection === "customization"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/30 scale-105"
                  : "text-purple-600 dark:text-purple-400 hover:bg-purple-500/15"
              )}
              title={isVi ? "Tùy chỉnh giao diện" : "UI Customization"}
            >
              <Sliders className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover/headicon:scale-110 transition-transform shrink-0" />
              <span className="font-mono font-black">{isVi ? "TÙY CHỈNH" : "CUSTOMIZE"}</span>
            </button>

            {/* 5. Right Sidebar / Utilities Toggle Button */}
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-right-sidebar"));
              }}
              onMouseEnter={() => setHoveredHeaderIcon("rightsidebar")}
              onMouseLeave={() => setHoveredHeaderIcon(null)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-indigo-600 dark:text-cyan-400 hover:bg-indigo-500/15 transition-all cursor-pointer relative group/headicon"
              title={isVi ? "Mở bảng tiện ích (Right Sidebar)" : "Open Right Sidebar"}
            >
              <Columns3 className="w-4.5 h-4.5 sm:w-5 sm:h-5 group-hover/headicon:scale-110 transition-transform" />
              <AnimatePresence>
                {hoveredHeaderIcon === "rightsidebar" && (
                  <motion.span 
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.9 }}
                    className="absolute top-full mt-2.5 px-2.5 py-1 rounded-lg text-3xs font-extrabold whitespace-nowrap bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-lg pointer-events-none z-50 uppercase tracking-wider"
                  >
                    {isVi ? "Tiện ích" : "Utilities"}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* 6. Language Toggle Button (VI / EN) */}
            <button
              type="button"
              onClick={() => setLang(lang === "vi" ? "en" : "vi")}
              onMouseEnter={() => setHoveredHeaderIcon("lang")}
              onMouseLeave={() => setHoveredHeaderIcon(null)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15 transition-all cursor-pointer relative group/headicon"
              title={lang === "vi" ? "Đổi sang Tiếng Anh (English)" : "Switch to Vietnamese (Tiếng Việt)"}
            >
              <Globe className="w-4.5 h-4.5 sm:w-5 sm:h-5 group-hover/headicon:scale-110 transition-transform" />
              <span className="absolute -top-0.5 -right-0.5 px-1 py-0.2 rounded-full text-[9px] font-mono font-black bg-emerald-500 text-white shadow-xs">
                {lang === "vi" ? "VI" : "EN"}
              </span>
              <AnimatePresence>
                {hoveredHeaderIcon === "lang" && (
                  <motion.span 
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.9 }}
                    className="absolute top-full mt-2.5 px-2.5 py-1 rounded-lg text-3xs font-extrabold whitespace-nowrap bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-lg pointer-events-none z-50 uppercase tracking-wider"
                  >
                    {lang === "vi" ? "Ngôn ngữ" : "Language"}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* 7. PIN Button (Nút Ghim) - Tách riêng khung nhóm ghim */}
          <div className="flex items-center p-1 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/15 shadow-sm backdrop-blur-2xl">
            <button
              type="button"
              onClick={handleTogglePin}
              onMouseEnter={() => setHoveredHeaderIcon("pin")}
              onMouseLeave={() => setHoveredHeaderIcon(null)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer border shadow-2xs relative group/headicon ${
                isHeaderPinned
                  ? "bg-blue-600/20 dark:bg-cyan-500/20 text-blue-600 dark:text-cyan-400 border-blue-500/50 dark:border-cyan-400/60 shadow-md scale-105"
                  : "bg-slate-100/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border-slate-200 dark:border-slate-700"
              }`}
              title={
                isHeaderPinned
                  ? (isVi ? "Đã ghim header (Click để bỏ ghim & tự động trượt ẩn)" : "Header pinned (Click to unpin & auto-hide)")
                  : (isVi ? "Đang bỏ ghim (Click để ghim giữ cố định)" : "Header unpinned (Click to pin fixed)")
              }
            >
              <Pin className={`w-4.5 h-4.5 sm:w-5 sm:h-5 transition-all duration-300 ${isHeaderPinned ? "rotate-45 text-blue-600 dark:text-cyan-400 fill-blue-500/30 dark:fill-cyan-400/30 stroke-[2.5]" : "stroke-[2]"}`} />
              <AnimatePresence>
                {hoveredHeaderIcon === "pin" && (
                  <motion.span 
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.9 }}
                    className="absolute top-full mt-2.5 px-2.5 py-1 rounded-lg text-3xs font-extrabold whitespace-nowrap bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-lg pointer-events-none z-50 uppercase tracking-wider"
                  >
                    {isHeaderPinned ? (isVi ? "Bỏ ghim" : "Unpin") : (isVi ? "Ghim" : "Pin")}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* MOBILE CONTROLS (Identical circular button format with separated Pin capsule) */}
        <div className="flex md:hidden items-center justify-end gap-1.5 z-40">
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/15 shadow-sm backdrop-blur-2xl">
            {/* Mobile Lang Button */}
            <button
              onClick={() => setLang(lang === "vi" ? "en" : "vi")}
              className="w-8 h-8 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15 active:scale-95 transition-all cursor-pointer relative"
              title={lang === "vi" ? "Tiếng Việt / English" : "English / Tiếng Việt"}
            >
              <Globe className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 px-0.8 py-0.1 rounded-full text-[8px] font-mono font-black bg-emerald-500 text-white">
                {lang === "vi" ? "VI" : "EN"}
              </span>
            </button>

            {/* Mobile Theme Toggle */}
            <button
              onClick={() => {
                const nextTheme = theme === "glass-dark-neon" 
                  ? "mritech-digital-growth" 
                  : "glass-dark-neon";
                setTheme(nextTheme);
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-amber-500 dark:text-cyan-400 hover:bg-amber-500/15 dark:hover:bg-cyan-500/15 active:scale-95 transition-all cursor-pointer"
              title="Toggle Theme"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile PIN Capsule Separate */}
          <div className="p-1 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/15 shadow-sm backdrop-blur-2xl">
            <button
              onClick={handleTogglePin}
              className={`w-8 h-8 rounded-full flex items-center justify-center active:scale-95 transition-all cursor-pointer border ${
                isHeaderPinned
                  ? "bg-blue-600/20 text-blue-600 dark:text-cyan-400 border-blue-500/40"
                  : "bg-slate-100/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"
              }`}
              title={isHeaderPinned ? "Header Pinned" : "Header Unpinned"}
            >
              <Pin className={`w-3.5 h-3.5 transition-all ${isHeaderPinned ? "rotate-45 text-blue-600 dark:text-cyan-400 fill-blue-500/30 stroke-[2.5]" : "stroke-[2]"}`} />
            </button>
          </div>

          {/* Mobile Navigation Drawer Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-9 h-9 text-slate-800 dark:text-slate-200 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/15 active:scale-95 transition-transform flex items-center justify-center cursor-pointer backdrop-blur-xl shrink-0"
            aria-label="Open Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
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
                    setTheme("mritech-digital-growth");
                  }}
                  className={`flex items-center gap-1 text-2xs font-bold px-2.5 py-1 rounded-full border transition-all active:scale-95 cursor-pointer ${
                    theme === "mritech-digital-growth"
                      ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-400/50 font-black shadow-sm"
                      : "bg-slate-200/40 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 border-transparent"
                  }`}
                  title="☀️ MRITECH"
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
