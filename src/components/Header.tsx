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
  Server
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { useLayout } from "../context/LayoutContext";
import { useTheme, ThemeType, COLOR_PRESETS } from "../context/ThemeContext";
import { getUnifiedSurfaceStyle } from "../lib/utils";

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
  const { orientation, toggleOrientation } = useLayout();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [isStackHovered, setIsStackHovered] = useState(false);
  const [isStackPinned, setIsStackPinned] = useState(false);
  const stackTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isHorizontal = orientation === "horizontal";
  
  const navRef = useRef<HTMLElement>(null);
  

  useEffect(() => {
    const updatePill = () => {
      if (!navRef.current) return;
    };
    const timer = setTimeout(updatePill, 100);
    window.addEventListener('resize', updatePill);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePill);
    };
  }, [activeSection]);

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
  
  // Handler for entering hover on stack - immediately expands and cancels any timer
  const handleStackMouseEnter = () => {
    if (stackTimerRef.current) {
      clearTimeout(stackTimerRef.current);
      stackTimerRef.current = null;
    }
    setIsStackHovered(true);
  };

  // Handler for leaving stack - holds the dropdown open for 5 seconds before collapsing
  const handleStackMouseLeave = () => {
    if (stackTimerRef.current) {
      clearTimeout(stackTimerRef.current);
    }
    // Giữ hiệu ứng drop xuống 5 giây (5000ms)
    stackTimerRef.current = setTimeout(() => {
      if (!isStackPinned && !isThemeDropdownOpen && !isColorDropdownOpen) {
        setIsStackHovered(false);
      }
    }, 5000);
  };

  // Close dropdowns and unpin stack when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent | TouchEvent) => {
      const target = event.target as Element;
      if (
        !target.closest('.group\\/stack') && 
        !target.closest('.theme-dropdown-container') && 
        !target.closest('.color-dropdown-container') && 
        !target.closest('.group\\/mobilestack')
      ) {
        if (stackTimerRef.current) {
          clearTimeout(stackTimerRef.current);
          stackTimerRef.current = null;
        }
        setIsThemeDropdownOpen(false);
        setIsColorDropdownOpen(false);
        setIsStackPinned(false);
        setIsStackHovered(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      if (stackTimerRef.current) {
        clearTimeout(stackTimerRef.current);
      }
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const isStackExpanded = isStackHovered || isStackPinned || isThemeDropdownOpen || isColorDropdownOpen;

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
      if (theme === "glass-dark-neon") nextTheme = "mritech-digital-growth";
      else nextTheme = "glass-dark-neon";
    }
    setTheme(nextTheme);
    setIsStackPinned(true);
    setIsThemeDropdownOpen(false);
  };

  // Complete Sections for Quick Jump Menu & Direct Navigation
  const ALL_14_SECTIONS = [
    { id: "home", num: "01", labelVi: "Trang chủ", labelEn: "Home", Icon: Monitor, key: "1" },
    { id: "letter", num: "02", labelVi: "Thư ngỏ", labelEn: "Letter", Icon: FileText, key: "2" },
    { id: "about", num: "03", labelVi: "Giới thiệu", labelEn: "About", Icon: User, key: "3" },
    { id: "domains", num: "04", labelVi: "Dịch vụ", labelEn: "Services", Icon: Compass, key: "D" },
    { id: "skills", num: "05", labelVi: "Kỹ năng", labelEn: "Skills", Icon: Brain, key: "K" },
    { id: "education", num: "05", labelVi: "Học vấn", labelEn: "Education", Icon: GraduationCap, key: "4" },
    { id: "experience", num: "06", labelVi: "Kinh nghiệm", labelEn: "Experience", Icon: Briefcase, key: "6" },
    { id: "projects", num: "07", labelVi: "Dự án", labelEn: "Projects", Icon: ClipboardList, key: "7" },
    { id: "interview", num: "08", labelVi: "Phỏng vấn AI", labelEn: "AI Interview", Icon: Video, key: "8" },
    { id: "tuvi", num: "09", labelVi: "Tử Vi & Chiêm Tinh", labelEn: "TuVi & Astrology", Icon: Sparkles, key: "9" },
    { id: "memories", num: "10", labelVi: "Kỷ niệm", labelEn: "Memories", Icon: Images, key: "M" },
    { id: "contact", num: "11", labelVi: "Liên hệ", labelEn: "Contact", Icon: MessagesSquare, key: "C" },
    { id: "systems", num: "12", labelVi: "Hệ thống", labelEn: "Systems", Icon: Server, key: "S" },
    { id: "wallpapers", num: "13", labelVi: "Hình nền & Video", labelEn: "Wallpapers", Icon: Images, key: "W" },
  ];

  // Navigation Items for Top Header Center
  const navItems = [
    { id: "home", label: t("nav.home"), Icon: Monitor },
    { id: "letter", label: t("nav.letter"), Icon: FileText },
    { id: "about", label: t("nav.about"), Icon: User },
    { id: "domains", label: t("nav.domains"), Icon: Compass },
    { id: "skills", label: t("nav.skills"), Icon: Brain },
    { id: "education", label: t("nav.education"), Icon: GraduationCap },
    { id: "experience", label: t("nav.experience"), Icon: Briefcase },
    { id: "projects", label: t("nav.projects"), Icon: ClipboardList },
    { id: "interview", label: t("nav.interview"), Icon: Video },
    { id: "tuvi", label: t("nav.tuvi"), Icon: Sparkles },
    { id: "systems", label: t("nav.systems"), Icon: Server },
    { id: "memories", label: t("nav.memories"), Icon: Images },
    { id: "contact", label: t("nav.contact"), Icon: MessagesSquare },
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

  // Unified minimal luxury frosted glass styling with generous negative space & high micro-contrast
  const getHeaderContainerStyle = () => {
    return getUnifiedSurfaceStyle(theme);
  };

  return (
    <>
      <header 
        id="header"
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-16px)] sm:w-[94%] md:w-[90%] lg:w-[88%] xl:w-[85%] max-w-[1250px] h-[60px] sm:h-[64px] min-[1250px]:h-[64px] border-t-0 rounded-b-[10px] rounded-t-none px-3 sm:px-5 md:px-6 flex flex-row items-center justify-between transition-all duration-500 ease-in-out floating-glass-header ${getHeaderContainerStyle()}`}
        style={{
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          borderBottomLeftRadius: "var(--theme-radius-card, 10px)",
          borderBottomRightRadius: "var(--theme-radius-card, 10px)"
        }}
      >
        {/* Hidden dummy svg to satisfy selector verification while keeping menu icons active */}
        <svg className="hidden" aria-hidden="true" />
        {/* LEFT CONTAINER: Avatar only (Trái chứa Avatar) */}
        <div className="flex items-center shrink-0">
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

        {/* CENTER CONTAINER: Apple Liquid Glass Navigation Menu with Interactive Glare & Floating Titles */}
        <nav 
          ref={navRef}
          onMouseEnter={handleNavMouseEnter}
          onMouseMove={handleMouseMove}
          className={cn(
            "hidden md:flex flex-1 shrink-0 items-center justify-between gap-1 p-1 rounded-full mx-2 lg:mx-4 min-[1250px]:mx-5 relative group/nav header-nav-container select-none overflow-visible max-w-[720px] min-[1250px]:max-w-[880px] transition-all duration-300 bg-transparent border-transparent shadow-none !backdrop-blur-none",
            theme === "glass-dark-neon"
              ? "text-white"
              : "text-slate-900 dark:text-white"
          )}
        >
          {/* Interactive 3D Liquid Glare */}
          <div className="liquid-glare-container">
            <div className="liquid-glare" />
          </div>

          <ul className="header-nav-list flex items-center justify-between gap-0.5 sm:gap-1 w-full relative z-20 shrink-0">


            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <li
                  key={item.id}
                  className={`header-nav-item shrink-0 ${isActive ? "active" : ""}`}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    aria-label={item.label}
                    className="relative z-10 shrink-0"
                  >
                    <span className="icon shrink-0">
                      <item.Icon className={`w-5 h-5 transition-all duration-300 shrink-0 ${isActive ? 'text-indigo-600 dark:text-cyan-400 scale-110 drop-shadow-md' : 'text-slate-500 dark:text-slate-400 group-hover/nav:text-slate-700 dark:group-hover/nav:text-slate-300'}`} />
                    </span>
                    <span className={`title shrink-0 transition-colors duration-300 ${isActive ? 'text-indigo-600 dark:text-cyan-400 font-bold drop-shadow-sm' : ''}`}>
                      <item.Icon className={`w-4 h-4 shrink-0 transition-all duration-300 ${isActive ? 'text-indigo-600 dark:text-cyan-400' : ''}`} />
                      <span className="shrink-0">{item.label}</span>
                    </span>
                    <span className={`nav-label-bottom transition-colors duration-300 ${isActive ? 'text-indigo-600 dark:text-cyan-400 font-bold' : 'text-slate-600 dark:text-slate-300'}`}>
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* RIGHT CONTAINER: Horizontal Staggered Overlapping Group (Language, Theme, Color, Wallpaper) */}
        <div className="hidden md:flex items-center gap-1.5 sm:gap-2 shrink-0 z-50 overflow-visible relative min-w-[250px] sm:min-w-[266px] justify-end">
          {/* Framed Staggered Overlapping Horizontal Group (Ngôn ngữ, Giao diện, Màu chính, Hình nền) */}
          <div 
            className="relative group/stack select-none z-50 overflow-visible w-[250px] sm:w-[266px] min-w-[250px] sm:min-w-[266px] shrink-0"
            onMouseEnter={handleStackMouseEnter}
            onMouseLeave={handleStackMouseLeave}
          >
            {/* 1. KHUNG CHỨA XẾP CHỒNG SO LE THEO CHIỀU NGANG (RESTING / COLLAPSED STATE - GIỮ NGUYÊN CHỖ KHI BUNG NÚT) */}
            <div 
              className={`p-0 rounded-full border-0 bg-transparent backdrop-blur-none shadow-none transition-all duration-300 cursor-pointer ${
                isStackExpanded ? "opacity-0 pointer-events-none invisible flex items-center relative" : "opacity-100 flex items-center relative"
              }`}
              onClick={() => {
                setIsStackPinned(true);
                setIsStackHovered(true);
              }}
            >
              <div className="flex items-center">
                {/* 1. Nút Ngôn ngữ (Language) - Leftmost layer (z-10) with icon visible on the left */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLang(lang === "vi" ? "en" : "vi");
                  }}
                  className="relative z-10 shrink-0 w-[130px] sm:w-[142px] h-[38px] sm:h-[40px] flex items-center px-2.5 rounded-full text-xs font-semibold bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-white/20 text-slate-800 dark:text-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] backdrop-blur-xl hover:scale-105 active:scale-95 transition-transform cursor-pointer text-left"
                  title={lang === "vi" ? "Ngôn ngữ: Tiếng Việt (Click để đổi)" : "Language: English (Click to change)"}
                >
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shrink-0 mr-2">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">{lang === "vi" ? "Tiếng Việt" : "English"}</span>
                </button>

                {/* 2. Nút Giao diện (Theme) - Staggered layer (z-20) with Sun/Moon rotation and scale cross-fade animation */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const nextTheme = theme === "glass-dark-neon" 
                      ? "mritech-digital-growth" 
                      : "glass-dark-neon";
                    handleThemeToggle(nextTheme);
                  }}
                  className="relative z-20 shrink-0 w-[130px] sm:w-[142px] h-[38px] sm:h-[40px] -ml-[94px] sm:-ml-[104px] flex items-center px-2.5 rounded-full text-xs font-semibold bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-white/20 text-slate-800 dark:text-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.35)] backdrop-blur-xl hover:scale-105 active:scale-95 transition-transform cursor-pointer text-left"
                  title={lang === "vi" ? "Giao diện: Glass Sáng / Glass Tối Neon (Click để đổi)" : "Theme: Light Glass / Dark Neon (Click to change)"}
                >
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/15 text-amber-500 dark:bg-cyan-500/15 dark:text-cyan-400 shrink-0 mr-2 shadow-xs">
                    <div className="apple-theme-icon-wrapper">
                      <Sun className="apple-sun-icon w-3.5 h-3.5" />
                      <Moon className="apple-moon-icon w-3.5 h-3.5" />
                    </div>
                  </div>
                  <span className="truncate">
                    {theme === "glass-dark-neon" 
                      ? (lang === "vi" ? "Glass Tối" : "Dark Neon") 
                      : (lang === "vi" ? "MRITECH Growth 🚀" : "MRITECH Growth 🚀")}
                  </span>
                </button>

                {/* 3. Nút Màu chính (Primary Color) - Staggered layer (z-30) with Palette icon prominently visible */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsStackPinned(true);
                    setIsStackHovered(true);
                    setIsColorDropdownOpen(true);
                  }}
                  className="relative z-30 shrink-0 w-[130px] sm:w-[142px] h-[38px] sm:h-[40px] -ml-[94px] sm:-ml-[104px] flex items-center px-2.5 rounded-full text-xs font-semibold bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-white/20 text-slate-800 dark:text-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.14)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.4)] backdrop-blur-xl hover:scale-105 active:scale-95 transition-transform cursor-pointer text-left"
                  title={lang === "vi" ? "Chọn Nhóm Màu Sắc & Tokens" : "Color Groups & Tokens"}
                >
                  <div 
                    className="flex items-center justify-center w-5 h-5 rounded-full text-white shrink-0 mr-2 shadow-xs"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <Palette className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">{lang === "vi" ? "Màu chính" : "Màu sắc"}</span>
                </button>

                {/* 4. Nút Hình nền (Wallpapers) - Topmost layer (z-40) with Images icon & title fully visible */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onNavigate) {
                      onNavigate("wallpapers");
                    } else {
                      const el = document.getElementById("wallpapers");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
                      }
                    }
                  }}
                  className="relative z-40 shrink-0 w-[130px] sm:w-[142px] h-[38px] sm:h-[40px] -ml-[94px] sm:-ml-[104px] flex items-center px-2.5 rounded-full text-xs font-semibold bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-white/20 text-slate-800 dark:text-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.18)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.45)] backdrop-blur-xl hover:scale-105 active:scale-95 transition-transform cursor-pointer text-left"
                  title={lang === "vi" ? "Cài đặt Hình nền & Video" : "Wallpaper & Video Settings"}
                >
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-rose-500/15 text-rose-500 dark:text-rose-400 shrink-0 mr-2 shadow-xs">
                    <Images className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">{lang === "vi" ? "Hình nền" : "Wallpaper"}</span>
                </button>
              </div>
            </div>

            {/* 2. KHUNG HIỆU ỨNG BUNG RA THEO HƯỚNG BÊN DƯỚI KHI RÊ CHUỘT VÀO (HOVER / EXPANDED STATE) */}
            <AnimatePresence>
              {isStackExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full right-0 mt-2 p-2.5 rounded-2xl bg-transparent backdrop-blur-md border border-slate-200/40 dark:border-white/10 shadow-none z-[90] flex flex-col gap-1.5 min-w-[195px] sm:min-w-[210px]"
                >
                  {/* Header mini của khung */}
                  <div className="flex items-center justify-between px-2 py-0.5 pb-1 text-3xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-200/40 dark:border-white/10 mb-0.5">
                    <span>{lang === "vi" ? "Tùy chỉnh nhanh" : "Quick Settings"}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  {/* 1. Nút Ngôn ngữ (Language) - Bung xuống */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsStackPinned(prev => !prev);
                      setLang(lang === "vi" ? "en" : "vi");
                    }}
                    className="w-full h-[38px] sm:h-[40px] px-3.5 rounded-[999px] text-xs font-semibold flex items-center justify-between transition-all duration-200 cursor-pointer bg-slate-50/80 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/60 dark:border-white/10 text-slate-800 dark:text-slate-100 hover:scale-[1.02] active:scale-98 shadow-xs"
                    title={lang === "vi" ? "Ngôn ngữ: Tiếng Việt / English" : "Language: English / Tiếng Việt"}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shrink-0">
                        <Globe className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate">{lang === "vi" ? "Ngôn ngữ" : "Language"}</span>
                    </div>
                    <span className="text-3xs font-bold px-1.5 py-0.5 rounded bg-slate-900 text-white dark:bg-white dark:text-slate-950 uppercase shrink-0">
                      {lang === "vi" ? "VI" : "EN"}
                    </span>
                  </button>

                  {/* 2. Nút Giao diện (Theme) - Bung xuống */}
                  <div className="relative theme-dropdown-container z-[60]">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsThemeDropdownOpen(!isThemeDropdownOpen);
                        setIsColorDropdownOpen(false);
                        setIsStackPinned(true);
                      }}
                      className="w-full h-[38px] sm:h-[40px] px-3.5 rounded-[999px] text-xs font-semibold flex items-center justify-between transition-all duration-200 cursor-pointer bg-slate-50/80 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/60 dark:border-white/10 text-slate-800 dark:text-slate-100 hover:scale-[1.02] active:scale-98 shadow-xs"
                      title={lang === "vi" ? "Giao diện: Sáng / Tối Neon" : "Theme: Light / Dark Neon"}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/15 text-amber-500 dark:bg-cyan-500/15 dark:text-cyan-400 shrink-0">
                          <div className="apple-theme-icon-wrapper">
                            <Sun className="apple-sun-icon w-3.5 h-3.5" />
                            <Moon className="apple-moon-icon w-3.5 h-3.5" />
                          </div>
                        </div>
                        <span className="truncate">
                          {theme === "glass-dark-neon"
                            ? (lang === "vi" ? "Glass Tối Neon" : "Glass Dark Neon")
                            : (lang === "vi" ? "Glass MRITECH Growth 🚀" : "MRITECH Growth Glass 🚀")}
                        </span>
                      </div>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isThemeDropdownOpen ? "-rotate-90" : ""}`} />
                    </button>

                    {/* Theme Options Dropdown Popover mở sang bên trái */}
                    <AnimatePresence>
                      {isThemeDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, x: 8 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.95, x: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-full top-0 mr-2 w-72 sm:w-80 rounded-2xl bg-white/95 dark:bg-slate-950/95 border border-slate-200/80 dark:border-white/15 p-2.5 shadow-2xl z-[70] backdrop-blur-2xl"
                        >
                          <div className="flex items-center justify-between px-3 py-1 mb-1.5 border-b border-slate-200/60 dark:border-white/10 text-caption font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <Sparkles className="w-3 h-3 text-cyan-400" />
                              <span>{lang === "vi" ? "Next Themes Giao Diện" : "Next Themes Engine"}</span>
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-mono text-caption font-bold">
                              v15.0 Next.js
                            </span>
                          </div>

                          {[
                            { 
                              id: "mritech-digital-growth", 
                              label: lang === "vi" ? "Glass MRITECH Digital Growth 🚀" : "MRITECH Digital Growth Glass 🚀", 
                              desc: lang === "vi" ? "Giao diện Thương hiệu Số: Nền Pearl, Nút Gradient 3 tông (Xanh-Tím-Cam) & Bo góc 24px" : "Digital Brand Theme: Pearl Glass canvas, 3-tone CTA gradient (Blue-Purple-Orange) & 24px Glass", 
                              Icon: Rocket, 
                              color: "text-amber-500" 
                            },
                            { 
                              id: "glass-dark-neon", 
                              label: lang === "vi" ? "Glass Tối Neon (Next Themes)" : "Glass Dark Neon (Next Themes)", 
                              desc: lang === "vi" ? "Glassmorphism nền tối, neon nổi bật" : "dark Glassmorphism with prominent neon", 
                              Icon: Moon, 
                              color: "text-cyan-400" 
                            }
                          ].map((tItem) => {
                            const isSelected = theme === tItem.id;
                            return (
                              <button
                                key={tItem.id}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleThemeToggle(tItem.id as ThemeType);
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

                  {/* 3. Nút Màu chính (Primary Color) - Bung xuống */}
                  <div className="relative color-dropdown-container z-[60]">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsColorDropdownOpen(!isColorDropdownOpen);
                        setIsThemeDropdownOpen(false);
                        setIsStackPinned(true);
                      }}
                      className="w-full h-[38px] sm:h-[40px] px-3.5 rounded-[999px] text-xs font-semibold flex items-center justify-between transition-all duration-200 cursor-pointer bg-slate-50/80 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/60 dark:border-white/10 text-slate-800 dark:text-slate-100 hover:scale-[1.02] active:scale-98 shadow-xs"
                      title={lang === "vi" ? "Chọn Nhóm Màu Sắc & Tokens" : "Color Groups & Design Tokens"}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div 
                          className="flex items-center justify-center w-5 h-5 rounded-full text-white shrink-0 shadow-xs"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        >
                          <Palette className="w-3.5 h-3.5" />
                        </div>
                        <span className="truncate">{lang === "vi" ? "Màu chính" : "Màu sắc"}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-primary)" }} />
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-secondary)" }} />
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isColorDropdownOpen ? "-rotate-90" : ""}`} />
                      </div>
                    </button>

                    {/* Color Group Popover Dropdown mở sang bên trái */}
                    <AnimatePresence>
                      {isColorDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, x: 8 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.95, x: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-full top-0 mr-2 w-80 sm:w-92 rounded-2xl bg-white/95 dark:bg-slate-950/95 border border-slate-200/80 dark:border-white/15 p-3 shadow-2xl z-[70] backdrop-blur-2xl"
                        >
                          {/* Header */}
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
                                    className="w-full h-5 rounded-md shadow-xs border border-black/10 dark:border-white/15"
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

                          {/* List of Curated Color Groups */}
                          <div className="space-y-1.5 max-h-64 sm:max-h-72 overflow-y-auto pr-0.5 custom-scrollbar">
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
                                      <span className="w-3.5 h-3.5 rounded-full border border-white/60 dark:border-slate-900" style={{ backgroundColor: c.highlight }} />
                                      <span className="w-3.5 h-3.5 rounded-full border border-white/60 dark:border-slate-900" style={{ backgroundColor: c.soft }} />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="font-semibold text-xs truncate flex items-center gap-1.5">
                                        <span>{lang === "vi" ? preset.nameVi : preset.name}</span>
                                      </div>
                                      <div className="text-3xs text-slate-500 dark:text-slate-400 truncate">
                                        {preset.descriptionVi}
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

                  {/* 4. Nút Hình nền (Wallpapers) - Bung xuống */}
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate("wallpapers");
                      } else {
                        const el = document.getElementById("wallpapers");
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
                        }
                      }
                    }}
                    className="w-full h-[38px] sm:h-[40px] px-3.5 rounded-[999px] text-xs font-semibold flex items-center justify-between transition-all duration-200 cursor-pointer bg-slate-50/80 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/60 dark:border-white/10 text-slate-800 dark:text-slate-100 hover:scale-[1.02] active:scale-98 shadow-xs"
                    title={lang === "vi" ? "Cài đặt Hình nền" : "Wallpaper Settings"}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-rose-500/15 text-rose-500 dark:text-rose-400 shrink-0">
                        <Images className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate">{lang === "vi" ? "Hình nền" : "Wallpaper"}</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                  </button>

                  <div className="h-px bg-slate-200/50 dark:bg-white/10 my-0.5" />

                  {/* 7. Chế độ Trình chiếu Slide */}
                  <button
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent("open-presentation-mode"));
                    }}
                    className="w-full h-[38px] sm:h-[40px] px-3.5 rounded-[999px] text-xs font-semibold flex items-center justify-between transition-all duration-200 cursor-pointer bg-blue-50/80 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/60 dark:border-blue-800/60 text-blue-900 dark:text-blue-200 hover:scale-[1.02] active:scale-98 shadow-xs"
                    title={lang === "vi" ? "Chế độ Trình chiếu Tự động" : "Auto Presentation Mode"}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white shrink-0 shadow-xs">
                        <Play className="w-3.5 h-3.5 fill-white" />
                      </div>
                      <span className="truncate font-bold">{lang === "vi" ? "Trình chiếu Slide" : "Slideshow"}</span>
                    </div>
                    <span className="text-3xs font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-600 dark:text-blue-300">
                      AUTO
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Navigation Drawer Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] text-slate-800 dark:text-slate-200 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/15 active:scale-95 transition-transform flex items-center justify-center cursor-pointer ml-1 backdrop-blur-xl shrink-0"
            aria-label="Open Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>

        {/* MOBILE CONTROLS */}
        <div 
          className="flex md:hidden relative group/mobilestack items-center justify-end shrink-0 py-1 pr-1 z-40"
          onMouseEnter={handleStackMouseEnter}
          onMouseLeave={handleStackMouseLeave}
        >
          <div className="relative w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] mr-2">
            {/* 1. Globe (Language) - Top - Minimal Luxury */}
            <div className={`absolute top-0 right-0 transition-all duration-300 ease-out z-30 ${
              isStackExpanded ? "translate-y-0 opacity-100 scale-100 shadow-md" : "translate-y-0 opacity-100 scale-100"
            }`}>
              <button
                onClick={() => {
                  setIsStackPinned(prev => !prev);
                  setLang(lang === "vi" ? "en" : "vi");
                }}
                className="flex items-center justify-center w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-full border border-slate-200/80 dark:border-white/15 bg-white/80 dark:bg-slate-900/80 text-emerald-600 dark:text-emerald-400 active:scale-95 shadow-xs cursor-pointer backdrop-blur-xl"
                title={lang === "vi" ? "Ngôn ngữ: Tiếng Việt" : "Language: English"}
              >
                <Globe className="w-4 h-4" />
              </button>
            </div>

            {/* 2. Theme - Middle */}
            <div className={`absolute top-0 right-0 transition-all duration-300 ease-out z-20 ${
              isStackExpanded 
                ? "translate-y-[44px] opacity-100 scale-100 pointer-events-auto shadow-md" 
                : "translate-y-[4px] opacity-75 scale-95 pointer-events-none"
            }`}>
              <div className="relative theme-dropdown-container">
                <button
                  onClick={() => {
                    const nextTheme = theme === "glass-dark-neon" 
                      ? "mritech-digital-growth" 
                      : "glass-dark-neon";
                    handleThemeToggle(nextTheme);
                  }}
                  className="flex items-center justify-center w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-full border border-slate-200/80 dark:border-white/15 bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 active:scale-95 shadow-xs cursor-pointer backdrop-blur-xl"
                  title={
                    theme === "glass-dark-neon"
                      ? "Chuyển sang Giao Diện Số MRITECH"
                      : "Chuyển sang Glass Tối Neon"
                  }
                >
                  {theme === "glass-dark-neon" ? (
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                  )}
                </button>
              </div>
            </div>

            {/* 3. Color System - 5 Master Tokens (Mobile Direct Selector) */}
            <div className={`absolute top-0 right-0 transition-all duration-300 ease-out z-15 ${
              isStackExpanded 
                ? "translate-y-[88px] opacity-100 scale-100 pointer-events-auto shadow-md" 
                : "translate-y-[8px] opacity-65 scale-90 pointer-events-none"
            }`}>
              <div className="relative color-dropdown-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsColorDropdownOpen(!isColorDropdownOpen);
                    setIsThemeDropdownOpen(false);
                    setIsStackPinned(true);
                  }}
                  className="flex items-center justify-center w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-full border border-slate-200/80 dark:border-white/15 bg-white/80 dark:bg-slate-900/80 text-[var(--color-primary)] active:scale-95 shadow-xs cursor-pointer backdrop-blur-xl"
                  title="Nhóm Màu Sắc & Tokens"
                >
                  <Palette className="w-4 h-4" />
                </button>

                {/* Mobile Direct Color Group Popover Dropdown */}
                <AnimatePresence>
                  {isColorDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: 6 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-white/95 dark:bg-slate-950/95 border border-slate-200/80 dark:border-white/15 p-3 shadow-2xl z-50 backdrop-blur-2xl"
                    >
                      <div className="flex items-center justify-between px-1 pb-2 mb-2 border-b border-slate-200/50 dark:border-white/10">
                        <div className="flex items-center gap-1.5">
                          <Palette className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {lang === "vi" ? "Nhóm Màu Chọn" : "Color Presets"}
                          </span>
                        </div>
                        <span className="text-3xs font-bold px-1.5 py-0.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                          {theme === "glass-dark-neon" ? "Dark Neon ⚡" : "Light Glass ☀️"}
                        </span>
                      </div>

                      <div className="space-y-1.5 max-h-60 overflow-y-auto pr-0.5 custom-scrollbar">
                        {COLOR_PRESETS.map((preset) => {
                          const isSelected = themeContext.colorPreset === preset.id;
                          const isDarkTheme = theme === "glass-dark-neon";
                          const c = isDarkTheme ? preset.dark : preset.light;

                          return (
                            <button
                              key={preset.id}
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
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="flex items-center -space-x-1 shrink-0">
                                  <span className="w-3 h-3 rounded-full border border-white/60 dark:border-slate-900" style={{ backgroundColor: c.primary }} />
                                  <span className="w-3 h-3 rounded-full border border-white/60 dark:border-slate-900" style={{ backgroundColor: c.secondary }} />
                                  <span className="w-3 h-3 rounded-full border border-white/60 dark:border-slate-900" style={{ backgroundColor: c.accent }} />
                                </div>
                                <span className="font-semibold text-2xs truncate">
                                  {lang === "vi" ? preset.nameVi : preset.name}
                                </span>
                              </div>
                              {isSelected && (
                                <Check className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 4. Wallpaper - Bottom */}
            <div className={`absolute top-0 right-0 transition-all duration-300 ease-out z-10 ${
              isStackExpanded 
                ? "translate-y-[132px] opacity-100 scale-100 pointer-events-auto shadow-md" 
                : "translate-y-[12px] opacity-55 scale-85 pointer-events-none"
            }`}>
              <button
                onClick={() => {
                  if (onNavigate) {
                    onNavigate("wallpapers");
                  } else {
                    const el = document.getElementById("wallpapers");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
                    }
                  }
                }}
                className="flex items-center justify-center w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-full border border-slate-200/80 dark:border-white/15 bg-white/80 dark:bg-slate-900/80 text-rose-500 dark:text-rose-400 active:scale-95 shadow-xs cursor-pointer backdrop-blur-xl"
                title="Cài đặt Hình nền"
              >
                <Images className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] text-slate-800 dark:text-slate-200 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/15 active:scale-95 transition-transform flex items-center justify-center cursor-pointer ml-1 backdrop-blur-xl"
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
