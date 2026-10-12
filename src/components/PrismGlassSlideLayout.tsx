import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Sparkles, Layers, Compass, Palette } from "lucide-react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/utils";
import { playUiSound } from "../lib/sound";

import Hero from "./Hero";
import Letter from "./Letter";
import About from "./About";
import Domains from "./Domains";
import Skills from "./Skills";
import Education from "./Education";
import Experience from "./Experience";
import Projects from "./Projects";
import Interview from "./Interview";
import TuVi from "./TuVi";
import Memories from "./Memories";
import Systems from "./Systems";
import Contact from "./Contact";
import Wallpapers from "./Wallpapers";
import Customization from "./Customization";
import TabErrorsPage from "./TabErrorsPage";

export const PRISM_SLIDES = [
  { id: "home", titleVi: "Trang Chủ", titleEn: "Home", Component: Hero, icon: Sparkles, accent: "from-blue-500/20 to-indigo-500/20" },
  { id: "letter", titleVi: "Thư Ngỏ", titleEn: "Open Letter", Component: Letter, icon: Layers, accent: "from-purple-500/20 to-pink-500/20" },
  { id: "about", titleVi: "Giới Thiệu", titleEn: "About", Component: About, icon: Compass, accent: "from-emerald-500/20 to-teal-500/20" },
  { id: "domains", titleVi: "Lĩnh Vực", titleEn: "Domains", Component: Domains, icon: Layers, accent: "from-blue-400/20 to-cyan-500/20" },
  { id: "skills", titleVi: "Kỹ Năng", titleEn: "Skills", Component: Skills, icon: Sparkles, accent: "from-amber-500/20 to-yellow-500/20" },
  { id: "education", titleVi: "Học Vấn", titleEn: "Education", Component: Education, icon: Layers, accent: "from-violet-500/20 to-purple-500/20" },
  { id: "experience", titleVi: "Kinh Nghiệm", titleEn: "Experience", Component: Experience, icon: Sparkles, accent: "from-blue-600/20 to-indigo-600/20" },
  { id: "projects", titleVi: "Dự Án", titleEn: "Projects", Component: Projects, icon: Layers, accent: "from-rose-500/20 to-pink-500/20" },
  { id: "interview", titleVi: "Phỏng Vấn AI", titleEn: "AI Interview", Component: Interview, icon: Sparkles, accent: "from-cyan-500/20 to-blue-500/20" },
  { id: "tuvi", titleVi: "Tử Vi", titleEn: "TuVi & Astrology", Component: TuVi, icon: Layers, accent: "from-purple-500/20 to-indigo-500/20" },
  { id: "memories", titleVi: "Kỷ Niệm", titleEn: "Memories", Component: Memories, icon: Sparkles, accent: "from-pink-500/20 to-rose-500/20" },
  { id: "systems", titleVi: "Hệ Thống", titleEn: "Systems", Component: Systems, icon: Layers, accent: "from-emerald-600/20 to-teal-600/20" },
  { id: "contact", titleVi: "Liên Hệ", titleEn: "Contact", Component: Contact, icon: Sparkles, accent: "from-blue-500/20 to-sky-500/20" },
  { id: "wallpapers", titleVi: "Hình Nền", titleEn: "Wallpapers", Component: Wallpapers, icon: Palette, accent: "from-violet-600/20 to-fuchsia-600/20" },
  { id: "customization", titleVi: "Tùy Chỉnh", titleEn: "Customization", Component: Customization, icon: Sparkles, accent: "from-amber-600/20 to-orange-600/20" },
  { id: "errors", titleVi: "Nhật Ký Lỗi", titleEn: "Tab Errors", Component: TabErrorsPage, icon: Layers, accent: "from-red-500/20 to-rose-500/20" },
];

interface PrismGlassSlideLayoutProps {
  onNavigate?: (sectionId: string) => void;
}

export const PrismGlassSlideLayout: React.FC<PrismGlassSlideLayoutProps> = ({ onNavigate }) => {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const totalSlides = PRISM_SLIDES.length;

  const handlePrev = () => {
    try { playUiSound("click"); } catch {}
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNext = () => {
    try { playUiSound("click"); } catch {}
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const handleSelect = (idx: number) => {
    if (idx === currentIndex) return;
    try { playUiSound("click"); } catch {}
    setCurrentIndex(idx);
    if (onNavigate) {
      onNavigate(PRISM_SLIDES[idx].id);
    }
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.tagName === "SELECT" ||
          (activeEl as HTMLElement).isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const currentSlide = PRISM_SLIDES[currentIndex];
  const ActiveComponent = currentSlide.Component;

  // Prism Glass card style
  const getPrismCardStyle = () => {
    switch (theme as string) {
      case "glass-dark-neon":
        return "bg-slate-950/85 border-cyan-400/30 dark:border-white/15 backdrop-blur-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,240,255,0.15)]";
      case "modern-light-glass":
        return "bg-white/85 dark:bg-slate-900/90 border-white/80 dark:border-white/15 backdrop-blur-[24px] shadow-[0_20px_45px_0_rgba(100,110,140,0.12)]";
      case "glass-light-multicolor":
      default:
        return "bg-gradient-to-br from-white/90 via-[#F5F3FF]/70 to-white/85 dark:from-[#0e1322]/95 dark:via-[#13112c]/90 dark:to-[#0e1322]/95 border-white/80 dark:border-white/15 backdrop-blur-[24px] shadow-[0_20px_45px_0_rgba(107,70,193,0.12)]";
    }
  };

  return (
    <div 
      className="relative w-full h-full min-h-[calc(100vh-140px)] flex flex-col items-center justify-between p-3 sm:p-6 overflow-hidden select-text font-sans"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Prism Multi-Color Ambient Glow Backgrounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[5%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-[#60A5FA]/12 dark:bg-cyan-500/10 blur-[140px]" />
        <div className="absolute top-[20%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-[#A78BFA]/12 dark:bg-purple-600/10 blur-[140px]" />
        <div className="absolute bottom-[5%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-[#34D399]/10 dark:bg-emerald-500/8 blur-[140px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-[#FB7185]/10 dark:bg-rose-500/8 blur-[140px]" />
      </div>

      {/* Top Header & Slide Prism Controls */}
      <div className="relative z-20 w-full max-w-6xl flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-300 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xs uppercase font-mono font-bold tracking-wider text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                Prism Glass Slide #{currentIndex + 1} / {totalSlides}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black font-play text-slate-900 dark:text-white">
              {isVi ? currentSlide.titleVi : currentSlide.titleEn}
            </h2>
          </div>
        </div>

        {/* Previous / Next buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="w-10 h-10 rounded-2xl bg-white/90 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-indigo-200/60 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-white shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
            title={isVi ? "Slide trước" : "Previous slide"}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="w-10 h-10 rounded-2xl bg-white/90 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-indigo-200/60 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-white shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
            title={isVi ? "Slide tiếp" : "Next slide"}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Prism Glass Center Slide */}
      <div className="relative z-10 w-full max-w-5xl flex-1 flex items-center justify-center py-1 min-h-[500px] sm:min-h-[570px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 0.95, y: 15, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, y: -15, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ borderRadius: "var(--theme-radius-card, 28px)" }}
            className={cn(
              "relative z-30 w-full max-w-5xl h-[520px] sm:h-[600px] border flex flex-col overflow-hidden shadow-2xl",
              getPrismCardStyle()
            )}
          >
            {/* Prism Top Bar Accent */}
            <div className={cn("px-5 py-3 border-b border-indigo-100/50 dark:border-white/10 flex items-center justify-between bg-gradient-to-r", currentSlide.accent)}>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-slate-800 dark:text-indigo-200">
                  {isVi ? currentSlide.titleVi : currentSlide.titleEn}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xs font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/15 dark:bg-indigo-500/25 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                  Prism Glassmorphism
                </span>
              </div>
            </div>

            {/* Scrollable Active Component Body */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-3 sm:p-6 text-left select-text">
              <ActiveComponent />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Horizontal Clickable Indicator Dots Footer */}
      <div className="relative z-20 w-full flex items-center justify-center pt-2 pb-1">
        <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white/85 dark:bg-slate-900/85 border border-indigo-200/50 dark:border-white/15 backdrop-blur-xl shadow-lg overflow-x-auto no-scrollbar max-w-full">
          {PRISM_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => handleSelect(idx)}
                className={cn(
                  "group relative transition-all duration-300 cursor-pointer flex items-center justify-center rounded-full",
                  isActive 
                    ? "w-8 h-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-md ring-2 ring-indigo-400/40" 
                    : "w-3 h-3 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40"
                )}
                title={isVi ? slide.titleVi : slide.titleEn}
              >
                {isActive && (
                  <span className="absolute -top-7 px-2 py-0.5 rounded-md bg-slate-900 dark:bg-slate-950 text-white text-[10px] font-bold font-mono shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {isVi ? slide.titleVi : slide.titleEn}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PrismGlassSlideLayout;
