import React, { useState, useEffect } from "react";
import { 
  Clock, 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  Pin,
  Settings,
  Sparkles,
  Bot
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { useSound } from "../context/SoundContext";
import { useFooter } from "../context/FooterContext";
import { FooterWeather } from "./FooterWeather";
import { cn } from "../lib/utils";

interface FooterProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
}

export function Footer({ activeSection, onNavigate }: FooterProps) {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const { soundConfig, toggleMute, playClick } = useSound();
  const { 
    footerConfig, 
    togglePin, 
    isFooterHovered, 
    setIsFooterHovered, 
    setIsFooterModalOpen,
    footerRadiusTopLeft,
    footerRadiusTopRight
  } = useFooter();

  const isMuted = soundConfig.isMuted;
  const isVi = lang === "vi";

  // Time & Date State
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString(isVi ? "vi-VN" : "en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [isVi]);

  const handleNavClick = (sectionId: string) => {
    try { playClick(); } catch {}
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      window.dispatchEvent(new CustomEvent("app-navigate", { detail: sectionId }));
    }
  };

  const isPinned = footerConfig.isPinned !== false;
  const isSlidDown = !isPinned && !isFooterHovered;

  const navLinks = [
    { id: "about", labelVi: "Giới thiệu", labelEn: "About" },
    { id: "experience", labelVi: "Kinh nghiệm", labelEn: "Experience" },
    { id: "skills", labelVi: "Kỹ năng", labelEn: "Skills" },
    { id: "projects", labelVi: "Dự án", labelEn: "Projects" },
    { id: "contact", labelVi: "Liên hệ", labelEn: "Contact" },
  ];

  // Placement class helper
  const getPlacementClass = () => {
    switch (footerConfig.placement) {
      case "floating-pill":
        return "w-[calc(100%-24px)] max-w-[1220px] mx-auto mb-3 rounded-2xl shadow-2xl";
      case "full-width":
        return "w-full rounded-none border-x-0";
      case "auto-hide":
      case "fixed-bottom":
      default:
        return "w-full max-w-[1250px] mx-auto";
    }
  };

  return (
    <footer 
      id="footer"
      onMouseEnter={() => setIsFooterHovered(true)}
      onMouseLeave={() => setIsFooterHovered(false)}
      className={cn(
        "relative z-40 transition-all duration-300 select-none",
        isSlidDown ? "translate-y-[calc(100%-12px)] opacity-85 hover:opacity-100" : "translate-y-0 opacity-100"
      )}
    >
      <div 
        style={{ 
          borderTopLeftRadius: `${footerRadiusTopLeft}px`,
          borderTopRightRadius: `${footerRadiusTopRight}px`,
        }}
        className={cn(
          "px-3 sm:px-5 py-2.5 border transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-2.5 text-xs",
          "bg-white/80 dark:bg-slate-900/85 border-slate-200/90 dark:border-white/12 backdrop-blur-xl shadow-xl",
          getPlacementClass()
        )}
      >
        {/* Left Section: Weather & Clock */}
        <div className="flex items-center gap-2 shrink-0">
          <FooterWeather 
            showWeather={footerConfig.showWeather} 
            timeString={footerConfig.showClock ? currentTime : undefined} 
          />

          {/* Status Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-[10.5px]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{isVi ? "Sẵn sàng hợp tác" : "Available"}</span>
          </div>
        </div>

        {/* Center Section: Quick Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={cn(
                  "px-2.5 py-1 rounded-lg transition-all duration-200 text-[11.5px] font-medium cursor-pointer",
                  isActive
                    ? "bg-blue-600 text-white shadow-xs font-bold scale-105"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70"
                )}
              >
                {isVi ? link.labelVi : link.labelEn}
              </button>
            );
          })}
        </div>

        {/* Right Section: Sound, Pin & Footer Settings */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleMute}
            title={isMuted ? (isVi ? "Bật âm thanh" : "Unmute") : (isVi ? "Tắt âm thanh" : "Mute")}
            className="p-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />}
          </button>

          {/* Pin / Unpin Toggle */}
          <button
            type="button"
            onClick={togglePin}
            title={isPinned ? (isVi ? "Bỏ ghim Footer" : "Unpin Footer") : (isVi ? "Ghim Footer" : "Pin Footer")}
            className={cn(
              "p-1.5 rounded-xl border transition-colors cursor-pointer",
              isPinned 
                ? "bg-blue-600/10 border-blue-500/40 text-blue-600 dark:text-cyan-400" 
                : "bg-slate-100/90 dark:bg-slate-800/90 border-slate-200/80 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            )}
          >
            <Pin className={cn("w-3.5 h-3.5", isPinned && "rotate-45")} />
          </button>

          {/* Footer Settings Modal Trigger */}
          <button
            type="button"
            onClick={() => setIsFooterModalOpen(true)}
            title={isVi ? "Cấu hình chân trang" : "Footer Settings"}
            className="p-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>

          <span className="text-[10.5px] text-slate-400 font-mono hidden sm:inline ml-1">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
