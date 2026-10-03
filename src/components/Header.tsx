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
  Home,
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
  LayoutTemplate,
  Film,
  Bot
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
  const [isCompact, setIsCompact] = useState(false);

  // iOS 26 Floating Tab Bar: Auto-collapse on scroll-down, expand on scroll-up / hover / idle
  useEffect(() => {
    const THRESHOLD = 10;
    let lastScrollY = 0;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;

    const handleScroll = (e?: Event) => {
      const target = (e?.target as HTMLElement) || document.documentElement;
      const currentScrollY = target.scrollTop !== undefined && target.scrollTop > 0 
        ? target.scrollTop 
        : window.scrollY || document.documentElement.scrollTop;

      if (currentScrollY > lastScrollY + THRESHOLD && currentScrollY > 40) {
        setIsCompact(true);
      } else if (currentScrollY < lastScrollY - THRESHOLD) {
        setIsCompact(false);
      }
      lastScrollY = currentScrollY;

      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setIsCompact(false);
      }, 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true, capture: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll, { capture: true });
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);

  const navRef = useRef<HTMLElement>(null);
  const navRectRef = useRef<DOMRect | null>(null);
  const activeNavRef = useRef<HTMLAnchorElement>(null);

  // Auto-scroll active nav item into view smoothly on all device screen sizes
  useEffect(() => {
    if (activeNavRef.current && navRef.current) {
      activeNavRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeSection]);

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

  // Helper: Format title with only first letter uppercase, rest lowercase
  const formatTitleCase = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Complete Sections for Quick Jump Menu & Mobile Drawer
  const ALL_14_SECTIONS = [
    { id: "home", num: "01", labelVi: "Trang chủ", labelEn: "Home", Icon: Home, key: "1" },
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
  ];

  // Navigation Items for Top Header Center with bilingual titles for accessibility tooltips (HIỂN THỊ TẤT CẢ CÁC TRANG ĐANG CÓ - MỖI ICON MỘT MÀU SẮC ĐẶC TRƯNG)
  const navItems = [
    { id: "home", labelVi: "Trang chủ", labelEn: "Home", label: t("nav.home"), Icon: Home, iconColor: "text-blue-500 dark:text-blue-400 group-hover:text-blue-600" },
    { id: "letter", labelVi: "Thư ngỏ", labelEn: "Open Letter", label: t("nav.letter"), Icon: FileText, iconColor: "text-indigo-500 dark:text-indigo-400 group-hover:text-indigo-600" },
    { id: "about", labelVi: "Giới thiệu", labelEn: "About Me", label: t("nav.about"), Icon: User, iconColor: "text-cyan-500 dark:text-cyan-400 group-hover:text-cyan-600" },
    { id: "domains", labelVi: "Lĩnh vực", labelEn: "Core Domains", label: t("nav.domains"), Icon: Compass, iconColor: "text-amber-500 dark:text-amber-400 group-hover:text-amber-600" },
    { id: "skills", labelVi: "Kỹ năng", labelEn: "Core Skills", label: t("nav.skills"), Icon: Brain, iconColor: "text-purple-500 dark:text-purple-400 group-hover:text-purple-600" },
    { id: "education", labelVi: "Học vấn", labelEn: "Academic Path", label: t("nav.education"), Icon: GraduationCap, iconColor: "text-emerald-500 dark:text-emerald-400 group-hover:text-emerald-600" },
    { id: "experience", labelVi: "Kinh nghiệm", labelEn: "Career Journey", label: t("nav.experience"), Icon: Briefcase, iconColor: "text-sky-500 dark:text-sky-400 group-hover:text-sky-600" },
    { id: "projects", labelVi: "Dự án", labelEn: "Key Projects", label: t("nav.projects"), Icon: ClipboardList, iconColor: "text-rose-500 dark:text-rose-400 group-hover:text-rose-600" },
    { id: "interview", labelVi: "Phỏng vấn", labelEn: "AI Interview", label: t("nav.interview"), Icon: Video, iconColor: "text-red-500 dark:text-red-400 group-hover:text-red-600" },
    { id: "tuvi", labelVi: "Tử vi", labelEn: "Wisdom Profile", label: t("nav.tuvi"), Icon: Sparkles, iconColor: "text-yellow-500 dark:text-yellow-400 group-hover:text-yellow-600" },
    { id: "systems", labelVi: "Hệ thống", labelEn: "Systems Hub", label: t("nav.systems"), Icon: Server, iconColor: "text-teal-500 dark:text-teal-400 group-hover:text-teal-600" },
    { id: "memories", labelVi: "Kỷ niệm", labelEn: "Team Memories", label: t("nav.memories"), Icon: Images, iconColor: "text-pink-500 dark:text-pink-400 group-hover:text-pink-600" },
    { id: "contact", labelVi: "Liên hệ", labelEn: "Contact Hub", label: t("nav.contact"), Icon: MessagesSquare, iconColor: "text-violet-500 dark:text-violet-400 group-hover:text-violet-600" },
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
        className={`group border-t-0 rounded-b-[10px] rounded-t-none p-[15px] flex flex-row items-center justify-between cursor-default ${getHeaderPlacementClass()} ${getHeaderContainerStyle()}`}
        style={{
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          borderBottomLeftRadius: "var(--theme-radius-card, 10px)",
          borderBottomRightRadius: "var(--theme-radius-card, 10px)",
          padding: "15px",
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
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 z-10">
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("open-left-sidebar"));
            }}
            className="md:hidden flex w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 items-center justify-center transition-all cursor-pointer shadow-2xs"
            title={isVi ? "Mở danh mục (Left Sidebar)" : "Open Left Sidebar"}
          >
            <Menu className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
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
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full object-cover border-2 border-brand-primary/80 shadow-md group-hover:scale-105 transition-transform duration-300 ring-2 ring-brand-primary/25"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-brand-card rounded-full" title="Online" />
              </div>
            </a>
          </div>

          {/* Line vách ngăn Avatar (Avatar Divider Line) - Hiển thị ở mọi kích thước thiết bị */}
          <div className="w-[1.5px] h-5 sm:h-6 bg-slate-300 dark:bg-slate-700/80 mx-0.5 rounded-full shrink-0" />
        </div>

        {/* CENTER CONTAINER: Menu Icon Bar - Full chiều dài đến line vách ngăn ở mọi kích thước thiết bị */}
        <nav 
          ref={navRef}
          data-compact={isCompact ? "true" : "false"}
          onMouseEnter={(e) => {
            handleNavMouseEnter();
            setIsCompact(false);
          }}
          onPointerEnter={() => setIsCompact(false)}
          onFocusCapture={() => setIsCompact(false)}
          onMouseMove={handleMouseMove}
          className={cn(
            "group flex w-full flex-1 min-w-0 items-center justify-between h-10 sm:h-11 md:h-12 px-2 sm:px-3 md:px-4 py-1.5 rounded-full mx-1.5 sm:mx-2 md:mx-2.5 relative group/nav header-nav-container select-none overflow-x-auto no-scrollbar scroll-smooth max-w-full",
            "isolate bg-white/50 dark:bg-slate-950/50 border border-white/80 dark:border-white/20",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_10px_30px_0_rgba(100,110,140,0.08)] backdrop-blur-[20px] backdrop-saturate-[180%]",
            "transition-[padding,gap] duration-[450ms] ease-[cubic-bezier(0.34,1.4,0.5,1)] motion-reduce:transition-none",
            "gap-1 data-[compact=true]:gap-0.5 data-[compact=true]:p-1",
            theme === "glass-dark-neon"
              ? "text-white"
              : "text-slate-900 dark:text-white"
          )}
          aria-label="Primary"
        >
          {/* Interactive 3D Liquid Glare */}
          <div className="liquid-glare-container pointer-events-none">
            <div className="liquid-glare" />
          </div>

          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredNavId === item.id;

            return (
              <a
                key={item.id}
                ref={isActive ? activeNavRef : undefined}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
                title={item.label}
                onMouseEnter={() => setHoveredNavId(item.id)}
                onMouseLeave={() => setHoveredNavId(null)}
                className={cn(
                  "flex items-center gap-1.5 h-7.5 sm:h-8 md:h-9 rounded-full no-underline transition-all duration-300 cursor-pointer relative shrink-0 z-20 border",
                  "focus-visible:outline-3 focus-visible:outline-blue-500 focus-visible:outline-offset-2",
                  isActive
                    ? "px-2.5 sm:px-3 bg-gradient-to-r from-blue-600/95 to-indigo-600/95 dark:from-blue-500/95 dark:to-cyan-500/95 text-white border-white/45 dark:border-cyan-400/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_6px_20px_-4px_rgba(37,99,235,0.5)] backdrop-blur-xl group-data-[compact=true]:px-2 font-bold scale-100"
                    : cn(
                        "px-2 sm:px-2.5 border-transparent text-slate-700 dark:text-slate-200 group-data-[compact=true]:px-1.5 font-medium",
                        isHovered 
                          ? "bg-white/80 dark:bg-white/15 border-white/60 dark:border-white/20 text-blue-600 dark:text-cyan-400 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_12px_rgba(0,0,0,0.06)] scale-[1.03]" 
                          : "hover:bg-white/40 dark:hover:bg-white/10"
                      )
                )}
              >
                <item.Icon 
                  className={cn(
                    "w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-all duration-300",
                    isActive 
                      ? "text-white stroke-[2.2] drop-shadow-xs" 
                      : cn(item.iconColor, "group-hover:scale-115 drop-shadow-2xs")
                  )} 
                />
                {/* Chỉ hiển thị tiêu đề của tab đang chọn (isActive), không hiển thị toàn bộ khi rê chuột vào thanh */}
                <span className={cn(
                  "overflow-hidden whitespace-nowrap text-xs font-semibold tracking-normal transition-[max-width,opacity] duration-[400ms] ease-[cubic-bezier(0.34,1.4,0.5,1)] font-play",
                  isActive
                    ? "max-w-24 sm:max-w-28 opacity-100 group-data-[compact=true]:max-w-0 group-data-[compact=true]:opacity-0 ml-0.5"
                    : "max-w-0 opacity-0"
                )}>
                  {formatTitleCase(item.label)}
                </span>

                {/* Floating Tooltip khi rê chuột vào từng item riêng biệt */}
                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.span 
                      initial={{ opacity: 0, y: 6, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.9 }}
                      className="absolute top-full mt-2.5 px-2.5 py-1 rounded-lg text-3xs font-extrabold whitespace-nowrap bg-slate-900/90 text-white dark:bg-white/95 dark:text-slate-950 backdrop-blur-md border border-white/20 dark:border-slate-800/20 shadow-lg pointer-events-none z-50 tracking-wider"
                    >
                      {formatTitleCase(item.label)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </a>
            );
          })}
        </nav>

        {/* RIGHT CONTAINER: Controls & Actions (Responsive at every device size) */}
        <div className="flex items-center justify-end gap-1 shrink-0 z-50 relative">
          {/* Line vách ngăn giữa menu và Controls - Hiển thị ở mọi kích thước thiết bị */}
          <div className="w-[1.5px] h-5 sm:h-6 bg-slate-300 dark:bg-slate-700/80 mr-1 sm:mr-1.5 rounded-full shrink-0" />

          {/* Quick Tablet Lang & Theme Capsule */}
          <div className="hidden sm:flex md:hidden items-center gap-1 p-0.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/15 shadow-sm backdrop-blur-2xl">
            {/* Mobile Lang Button */}
            <button
              onClick={() => setLang(lang === "vi" ? "en" : "vi")}
              className="w-7 h-7 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15 active:scale-95 transition-all cursor-pointer relative"
              title={lang === "vi" ? "Tiếng Việt / English" : "English / Tiếng Việt"}
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="absolute -top-0.5 -right-0.5 px-0.5 rounded-full text-[7px] font-mono font-black bg-emerald-500 text-white leading-none">
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
              className="w-7 h-7 rounded-full flex items-center justify-center text-amber-500 dark:text-cyan-400 hover:bg-amber-500/15 dark:hover:bg-cyan-500/15 active:scale-95 transition-all cursor-pointer"
              title="Toggle Theme"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Chat AI Button (Accessible on all devices) */}
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('toggle-ai-assistant'));
            }}
            onMouseEnter={() => setHoveredHeaderIcon("chatai")}
            onMouseLeave={() => setHoveredHeaderIcon(null)}
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/15 shadow-sm backdrop-blur-2xl flex items-center justify-center transition-all duration-300 cursor-pointer text-blue-600 hover:text-blue-700 dark:text-cyan-400 dark:hover:text-cyan-300 relative group/headicon shrink-0 active:scale-95"
            title={isVi ? "Trợ lý Chat AI" : "Chat AI Assistant"}
          >
            <Bot className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 stroke-[2.2] animate-pulse" />
            <AnimatePresence>
              {hoveredHeaderIcon === "chatai" && (
                <motion.span 
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.9 }}
                  className="hidden md:block absolute top-full mt-2.5 px-2.5 py-1 rounded-lg text-3xs font-extrabold whitespace-nowrap bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-lg pointer-events-none z-50 tracking-wider"
                >
                  Chat AI
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile PIN Button */}
          <button
            onClick={handleTogglePin}
            className="md:hidden p-1.5 flex items-center justify-center active:scale-90 transition-all cursor-pointer text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white shrink-0"
            title={
              isHeaderPinned
                ? (isVi ? "Đã ghim header (Click để bỏ ghim)" : "Header pinned (Click to unpin)")
                : (isVi ? "Bỏ ghim header (Click để ghim)" : "Header unpinned (Click to pin)")
            }
          >
            <Pin className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all ${isHeaderPinned ? "rotate-45 text-blue-600 dark:text-cyan-400 fill-blue-500/30 stroke-[2.5]" : "stroke-[2]"}`} />
          </button>

          {/* Mobile Navigation Drawer Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-8 h-8 sm:w-9 sm:h-9 text-slate-800 dark:text-slate-200 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/15 active:scale-95 transition-transform flex items-center justify-center cursor-pointer backdrop-blur-xl shrink-0"
            aria-label="Open Navigation Menu"
            title={isVi ? "Mở menu chi tiết" : "Open Drawer"}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* 7. PIN Button (Nút Ghim) - Đem ra ngoài header nằm bên phải cách 10px */}
        <div className="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 hidden md:flex items-center z-50 pointer-events-auto">
          <button
            type="button"
            onClick={handleTogglePin}
            onMouseEnter={() => setHoveredHeaderIcon("pin")}
            onMouseLeave={() => setHoveredHeaderIcon(null)}
            style={{ borderRadius: "var(--theme-radius-card, 14px)" }}
            className="p-1.5 flex items-center justify-center transition-all duration-300 cursor-pointer bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl border border-white/60 dark:border-white/20 shadow-md hover:shadow-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white relative group/headicon shrink-0 hover:scale-105 active:scale-95"
            title={
              isHeaderPinned
                ? (isVi ? "Đã ghim header (Click để bỏ ghim & tự động trượt ẩn)" : "Header pinned (Click to unpin & auto-hide)")
                : (isVi ? "Đang bỏ ghim (Click để ghim giữ cố định)" : "Header unpinned (Click to pin fixed)")
            }
          >
            <Pin className={`w-5 h-5 transition-all duration-300 ${isHeaderPinned ? "rotate-45 text-blue-600 dark:text-cyan-400 fill-blue-500/30 dark:fill-cyan-400/30 stroke-[2.5]" : "stroke-[2]"}`} />
            <AnimatePresence>
              {hoveredHeaderIcon === "pin" && (
                <motion.span 
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.9 }}
                  className="absolute top-full mt-2.5 px-2.5 py-1 rounded-lg text-3xs font-extrabold whitespace-nowrap bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-lg pointer-events-none z-50 tracking-wider"
                >
                  {isHeaderPinned ? (isVi ? "Bỏ ghim" : "Unpin") : (isVi ? "Ghim" : "Pin")}
                </motion.span>
              )}
            </AnimatePresence>
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
