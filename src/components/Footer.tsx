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
  Printer,
  LayoutGrid,
  LayoutTemplate,
  Sun,
  Moon,
  Globe,
  Palette,
  Check,
  Images,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { useTheme, ThemeType, COLOR_PRESETS } from "../context/ThemeContext";
import { useFooter } from "../context/FooterContext";
import { useSound } from "../context/SoundContext";
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
  "wallpapers",
  "customization",
  "template"
];

function Footer({ theme: propTheme, activeSection = "home", onNavigate }: FooterProps) {
  const themeContext = useTheme();
  const theme = propTheme || themeContext.theme;
  const borderRadius = themeContext.borderRadius ?? 10;
  const borderRadiusCard = themeContext.borderRadiusCard ?? 14;
  const { lang, setLang } = useLanguage();
  const isVi = lang === "vi";

  // Dropdown states for Theme & Color presets in Footer
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);

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

  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredFooterIcon, setHoveredFooterIcon] = useState<string | null>(null);

  // Unpin & slide-down state logic
  const isPinned = footerConfig.isPinned !== false;
  const isLastPage = activeSection === SECTION_ORDER[SECTION_ORDER.length - 1];
  const shouldShowFooter = isPinned || isLastPage;

  if (!shouldShowFooter) {
    return null;
  }

  const isSlidDown = !isPinned && !isHovered && !isThemeDropdownOpen && !isColorDropdownOpen;

  // Close footer dropdown popovers when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent | TouchEvent) => {
      const target = e.target as Element;
      if (!target.closest('.footer-theme-dropdown') && !target.closest('.footer-color-dropdown')) {
        setIsThemeDropdownOpen(false);
        setIsColorDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Collapse footer if clicked outside when unpinned and currently expanded
  useEffect(() => {
    if (isPinned || !isHovered || isThemeDropdownOpen || isColorDropdownOpen) return;
    const handleOutsideInteraction = (e: globalThis.MouseEvent | TouchEvent) => {
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
  }, [isPinned, isHovered, isThemeDropdownOpen, isColorDropdownOpen]);

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

  // Base container styles matched exactly to Header's glass container styling
  const getFooterSurfaceStyle = () => {
    switch (theme) {
      case "glass-dark-neon":
        return "bg-[#121218]/85 dark:bg-[#121218]/85 border-t border-x border-b-0 border-white/20 text-slate-100 backdrop-blur-2xl backdrop-saturate-[180%] shadow-[0_10px_35px_0_rgba(0,0,0,0.4)]";
      case "mritech-digital-growth":
      default:
        return "bg-white/75 dark:bg-[#121218]/85 border-t border-x border-b-0 border-white/60 dark:border-white/20 text-slate-800 dark:text-slate-100 backdrop-blur-2xl backdrop-saturate-[180%] shadow-[0_10px_35px_0_rgba(31,38,135,0.12)] dark:shadow-[0_10px_35px_0_rgba(0,0,0,0.4)]";
    }
  };

  // Placement class resolver (Áp dụng linh hoạt bo cong góc từ Tùy chỉnh độ bo cong)
  const getPlacementClass = () => {
    switch (footerConfig.placement) {
      case "floating-pill":
        return cn(
          "fixed left-1/2 -translate-x-1/2 z-50 w-[calc(100%-20px)] sm:w-[92%] md:w-[86%] lg:w-[82%] xl:w-[78%] max-w-[1180px] h-[60px] sm:h-[64px] min-[1250px]:h-[64px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-none !shadow-none",
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
          "fixed bottom-0 left-0 right-0 z-50 w-full h-[60px] sm:h-[64px] min-[1250px]:h-[64px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-none !shadow-none",
          isSlidDown
            ? "translate-y-[calc(100%-14px)] opacity-90 hover:translate-y-0 hover:opacity-100"
            : "translate-y-0 opacity-100"
        );
      case "auto-hide":
      case "fixed-bottom":
      default:
        return cn(
          "fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-16px)] sm:w-[94%] md:w-[90%] lg:w-[88%] xl:w-[85%] max-w-[1250px] h-[60px] sm:h-[64px] min-[1250px]:h-[64px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-none !shadow-none",
          isSlidDown
            ? "translate-y-[calc(100%-14px)] opacity-90 hover:translate-y-0 hover:opacity-100"
            : "translate-y-0 opacity-100"
        );
    }
  };

  const isFloatingPillPinned = footerConfig.placement === "floating-pill" && isPinned;

  const footerCustomStyle: React.CSSProperties = {
    borderTopLeftRadius: `var(--theme-radius-card, ${borderRadiusCard}px)`,
    borderTopRightRadius: `var(--theme-radius-card, ${borderRadiusCard}px)`,
    borderBottomLeftRadius: isFloatingPillPinned ? `var(--theme-radius-card, ${borderRadiusCard}px)` : "0px",
    borderBottomRightRadius: isFloatingPillPinned ? `var(--theme-radius-card, ${borderRadiusCard}px)` : "0px",
    transition: "border-radius 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
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
        style={footerCustomStyle}
        className={`group py-1 footer-bento-container px-3 sm:px-5 md:px-6 flex flex-col justify-center cursor-default ${getPlacementClass()} ${getFooterSurfaceStyle()}`}
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
        {/* LEFT CONTAINER: Time/Date & Weather Widget Capsule Drawer */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 z-10">
          {(footerConfig.showWeather || footerConfig.showClock) && (
            <div className="flex items-center p-0 rounded-full bg-transparent border-0 shadow-none relative shrink-0">
              <FooterWeather layoutMode="vertical" timeString={timeString} dateString={dateString} />
            </div>
          )}
          {/* Line vách ngăn thời tiết (Weather Divider Line) */}
          <div className="hidden sm:block w-[1.5px] h-5 sm:h-6 bg-slate-300 dark:bg-slate-700/80 mx-0.5 rounded-full shrink-0" />
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
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:via-blue-500 hover:to-indigo-500 text-white border border-sky-300/90 shadow-md hover:shadow-sky-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group/nextbtn relative shrink-0"
              title={currentIndex === SECTION_ORDER.length - 1 ? (isVi ? "Lên đầu trang" : "To top") : (isVi ? "Tới trang tiếp theo" : "Next page")}
            >
              <span className="absolute -inset-0.5 rounded-full bg-sky-400/40 blur-xs group-hover/nextbtn:opacity-100 opacity-60 transition-opacity pointer-events-none -z-10" />
              {currentIndex === SECTION_ORDER.length - 1 ? (
                <ChevronUp className="w-4 h-4 md:w-4.5 md:h-4.5 min-[1250px]:w-5 min-[1250px]:h-5 text-white group-hover/nextbtn:-translate-y-0.5 transition-transform duration-200" />
              ) : (
                <ChevronDown className="w-4 h-4 md:w-4.5 md:h-4.5 min-[1250px]:w-5 min-[1250px]:h-5 text-white group-hover/nextbtn:translate-y-0.5 transition-transform duration-200 animate-pulse" />
              )}
            </button>
          </div>
        )}

        {/* RIGHT CONTAINER: Controls & Actions */}
        <div className="flex items-center justify-end gap-1.5 sm:gap-2 ml-auto shrink-0 z-50 relative">
          
          {/* Main Controls Drawer Capsule: Theme, Color, Wallpaper, Customization & Language */}
          <div 
            style={{ borderRadius: "999px" }}
            className="flex items-center gap-1 p-1 rounded-[999px] bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/15 shadow-sm backdrop-blur-2xl relative z-50"
          >
            
            {/* 1. Theme Toggle / Dropdown Popover Button */}
            <div className="relative theme-dropdown-container footer-theme-dropdown">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsThemeDropdownOpen(!isThemeDropdownOpen);
                  setIsColorDropdownOpen(false);
                }}
                onMouseEnter={() => setHoveredFooterIcon("theme")}
                onMouseLeave={() => setHoveredFooterIcon(null)}
                className={cn(
                  "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer relative group/footericon shrink-0",
                  "text-amber-500 dark:text-cyan-400 hover:bg-amber-500/15 dark:hover:bg-cyan-500/15"
                )}
                title={lang === "vi" ? "Giao diện: Sáng / Tối Neon" : "Theme: Light / Dark Neon"}
              >
                <div className="apple-theme-icon-wrapper shrink-0">
                  <Sun className="apple-sun-icon w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover/footericon:scale-110 transition-transform" />
                  <Moon className="apple-moon-icon w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover/footericon:scale-110 transition-transform" />
                </div>
              </button>

              {/* Theme Dropdown Popover (Opens Upwards in Footer) */}
              <AnimatePresence>
                {isThemeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 bottom-full mb-2.5 w-72 sm:w-80 rounded-2xl bg-white/95 dark:bg-slate-950/95 border border-slate-200/80 dark:border-white/15 p-2.5 shadow-2xl z-[100] backdrop-blur-2xl"
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
                        Icon: Sparkles, 
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
                              themeContext.setTheme(tItem.id as ThemeType);
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
            <div className="relative color-dropdown-container footer-color-dropdown">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsColorDropdownOpen(!isColorDropdownOpen);
                  setIsThemeDropdownOpen(false);
                }}
                onMouseEnter={() => setHoveredFooterIcon("color")}
                onMouseLeave={() => setHoveredFooterIcon(null)}
                className={cn(
                  "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer relative group/footericon shrink-0",
                  "hover:bg-slate-200/50 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200"
                )}
                title={lang === "vi" ? "Chọn Nhóm Màu Sắc" : "Color Presets"}
              >
                <div className="relative shrink-0 flex items-center justify-center">
                  <Palette 
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover/footericon:scale-110 transition-transform" 
                    style={{ color: "var(--color-primary)" }}
                  />
                  <span 
                    className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white dark:border-slate-900 shadow-xs"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  />
                </div>
              </button>

              {/* Color Preset Popover Dropdown (Opens Upwards in Footer) */}
              <AnimatePresence>
                {isColorDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 bottom-full mb-2.5 w-80 sm:w-88 rounded-2xl bg-white/95 dark:bg-slate-950/95 border border-slate-200/80 dark:border-white/15 p-3 shadow-2xl z-[100] backdrop-blur-2xl pointer-events-auto"
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
                  window.dispatchEvent(new CustomEvent("app-navigate", { detail: "wallpapers" }));
                }
              }}
              onMouseEnter={() => setHoveredFooterIcon("wallpapers")}
              onMouseLeave={() => setHoveredFooterIcon(null)}
              className={cn(
                "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer relative group/footericon shrink-0",
                activeSection === "wallpapers"
                  ? "bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105"
                  : "text-rose-500 dark:text-rose-400 hover:bg-rose-500/15"
              )}
              title={isVi ? "Cài đặt Hình nền & Video" : "Wallpaper & Video Settings"}
            >
              <Images className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover/footericon:scale-110 transition-transform shrink-0" />
            </button>

            {/* 4. Customization Page Button */}
            <button
              type="button"
              onClick={() => {
                if (onNavigate) {
                  onNavigate("customization");
                } else {
                  window.dispatchEvent(new CustomEvent("app-navigate", { detail: "customization" }));
                }
              }}
              onMouseEnter={() => setHoveredFooterIcon("customization")}
              onMouseLeave={() => setHoveredFooterIcon(null)}
              className={cn(
                "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer relative group/footericon shrink-0",
                activeSection === "customization"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/30 scale-105"
                  : "text-purple-600 dark:text-purple-400 hover:bg-purple-500/15"
              )}
              title={isVi ? "Tùy chỉnh giao diện" : "UI Customization"}
            >
              <Sliders className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover/footericon:scale-110 transition-transform shrink-0" />
            </button>

            {/* 5. Language Toggle Button (VI / EN) */}
            <button
              type="button"
              onClick={() => setLang(lang === "vi" ? "en" : "vi")}
              onMouseEnter={() => setHoveredFooterIcon("lang")}
              onMouseLeave={() => setHoveredFooterIcon(null)}
              className={cn(
                "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer relative group/footericon shrink-0",
                "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15"
              )}
              title={lang === "vi" ? "Đổi sang Tiếng Anh (English)" : "Switch to Vietnamese (Tiếng Việt)"}
            >
              <Globe className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover/footericon:scale-110 transition-transform shrink-0" />
            </button>

          </div>

          {/* 6. PIN Button (Nút Ghim) - Chỉ hiển thị icon, xóa bỏ khung */}
          {footerConfig.isPinned !== undefined && (
            <button
              type="button"
              onClick={handleTogglePin}
              onMouseEnter={() => setHoveredFooterIcon("pin")}
              onMouseLeave={() => setHoveredFooterIcon(null)}
              className="p-1.5 flex items-center justify-center transition-all duration-300 cursor-pointer text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white relative shrink-0"
              title={
                footerConfig.isPinned
                  ? (isVi ? "Đã ghim footer (Click để bỏ ghim & tự động trượt ẩn)" : "Footer pinned (Click to unpin & auto-hide)")
                  : (isVi ? "Đang bỏ ghim (Click để ghim giữ cố định)" : "Footer unpinned (Click to pin fixed)")
              }
            >
              <Pin className={`w-5 h-5 transition-all duration-300 ${footerConfig.isPinned ? "rotate-45 text-blue-600 dark:text-cyan-400 fill-blue-500/30 dark:fill-cyan-400/30 stroke-[2.5]" : "stroke-[2]"}`} />
              <AnimatePresence>
                {hoveredFooterIcon === "pin" && (
                  <motion.span 
                    initial={{ opacity: 0, y: -6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.9 }}
                    className="absolute bottom-full mb-2.5 px-2.5 py-1 rounded-lg text-3xs font-extrabold whitespace-nowrap bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-lg pointer-events-none z-50 uppercase tracking-wider"
                  >
                    {footerConfig.isPinned ? (isVi ? "Bỏ ghim" : "Unpin") : (isVi ? "Ghim" : "Pin")}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          )}

        </div>
      </div>
    </footer>
    </>
  );
}

export default memo(Footer);
