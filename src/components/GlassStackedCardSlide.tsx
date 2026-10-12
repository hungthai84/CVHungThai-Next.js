import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Layers, Sparkles } from "lucide-react";
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

export const STACKED_SLIDES = [
  { id: "home", titleVi: "Trang Chủ", titleEn: "Home", Component: Hero, icon: Sparkles },
  { id: "letter", titleVi: "Thư Ngỏ", titleEn: "Open Letter", Component: Letter, icon: Layers },
  { id: "about", titleVi: "Giới Thiệu", titleEn: "About", Component: About, icon: Sparkles },
  { id: "domains", titleVi: "Lĩnh Vực", titleEn: "Domains", Component: Domains, icon: Layers },
  { id: "skills", titleVi: "Kỹ Năng", titleEn: "Skills", Component: Skills, icon: Sparkles },
  { id: "education", titleVi: "Học Vấn", titleEn: "Education", Component: Education, icon: Layers },
  { id: "experience", titleVi: "Kinh Nghiệm", titleEn: "Experience", Component: Experience, icon: Sparkles },
  { id: "projects", titleVi: "Dự Án", titleEn: "Projects", Component: Projects, icon: Layers },
  { id: "interview", titleVi: "Phỏng Vấn AI", titleEn: "AI Interview", Component: Interview, icon: Sparkles },
  { id: "tuvi", titleVi: "Tử Vi", titleEn: "TuVi & Astrology", Component: TuVi, icon: Layers },
  { id: "memories", titleVi: "Kỷ Niệm", titleEn: "Memories", Component: Memories, icon: Sparkles },
  { id: "systems", titleVi: "Hệ Thống", titleEn: "Systems", Component: Systems, icon: Layers },
  { id: "contact", titleVi: "Liên Hệ", titleEn: "Contact", Component: Contact, icon: Sparkles },
  { id: "wallpapers", titleVi: "Hình Nền", titleEn: "Wallpapers", Component: Wallpapers, icon: Layers },
  { id: "customization", titleVi: "Tùy Chỉnh", titleEn: "Customization", Component: Customization, icon: Sparkles },
  { id: "errors", titleVi: "Nhật Ký Lỗi", titleEn: "Tab Errors", Component: TabErrorsPage, icon: Layers },
];

interface GlassStackedCardSlideProps {
  onNavigate?: (sectionId: string) => void;
}

export const GlassStackedCardSlide: React.FC<GlassStackedCardSlideProps> = ({ onNavigate }) => {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const totalSlides = STACKED_SLIDES.length;

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

  const currentSlide = STACKED_SLIDES[currentIndex];
  const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  const nextIndex = (currentIndex + 1) % totalSlides;
  const prevSlide = STACKED_SLIDES[prevIndex];
  const nextSlide = STACKED_SLIDES[nextIndex];

  const ActiveComponent = currentSlide.Component;
  const PrevComponent = prevSlide.Component;
  const NextComponent = nextSlide.Component;

  // Glass card style
  const getGlassCardStyle = () => {
    switch (theme as string) {
      case "glass-dark-neon":
        return "bg-slate-950/85 border-cyan-400/30 dark:border-white/15 backdrop-blur-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,240,255,0.15)]";
      case "modern-light-glass":
        return "bg-white/85 dark:bg-slate-900/90 border-white/80 dark:border-white/15 backdrop-blur-[24px] shadow-[0_20px_45px_0_rgba(100,110,140,0.12)]";
      case "glass-light-multicolor":
      default:
        return "bg-white/85 dark:bg-[#0e1322]/90 border-white/75 dark:border-white/12 backdrop-blur-[24px] shadow-[0_20px_45px_0_rgba(31,38,135,0.12)]";
    }
  };

  return (
    <div 
      className="relative w-full h-full min-h-[calc(100vh-140px)] flex flex-col items-center justify-between p-3 sm:p-6 overflow-hidden select-none font-sans"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[15%] w-[45vw] h-[45vw] rounded-full bg-blue-500/10 dark:bg-cyan-500/8 blur-[130px]" />
        <div className="absolute bottom-[10%] right-[15%] w-[45vw] h-[45vw] rounded-full bg-purple-500/10 dark:bg-purple-600/8 blur-[130px]" />
      </div>

      {/* Top Header & Slide Info */}
      <div className="relative z-20 w-full max-w-6xl flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/15 dark:bg-cyan-500/15 border border-blue-500/30 dark:border-cyan-400/30 flex items-center justify-center text-blue-600 dark:text-cyan-300 shadow-sm">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-3xs uppercase font-mono font-bold tracking-wider text-blue-600 dark:text-cyan-400">
              {isVi ? `Thẻ Slide #${currentIndex + 1} / ${totalSlides}` : `Slide Card #${currentIndex + 1} / ${totalSlides}`}
            </span>
            <h2 className="text-base sm:text-lg font-black font-play text-slate-900 dark:text-white">
              {isVi ? currentSlide.titleVi : currentSlide.titleEn}
            </h2>
          </div>
        </div>

        {/* Previous / Next controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="w-10 h-10 rounded-2xl bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-slate-200/80 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-white shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
            title={isVi ? "Slide trước" : "Previous slide"}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="w-10 h-10 rounded-2xl bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-slate-200/80 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-white shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
            title={isVi ? "Slide tiếp" : "Next slide"}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stacked Card Carousel Viewport */}
      <div className="relative z-10 w-full max-w-6xl flex-1 flex items-center justify-center py-2 min-h-[520px] sm:min-h-[580px]">
        
        {/* Left Adjacent Preview Card (Nhô ra bên trái) */}
        <motion.div
          key={`prev-${prevIndex}`}
          onClick={() => handleSelect(prevIndex)}
          initial={{ opacity: 0, x: -60, scale: 0.85 }}
          animate={{ opacity: 0.55, x: -40, scale: 0.88, rotateY: 8 }}
          transition={{ duration: 0.4 }}
          className={cn(
            "absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 w-[280px] sm:w-[340px] h-[460px] sm:h-[500px] rounded-3xl p-5 border cursor-pointer overflow-hidden z-10 hidden md:flex flex-col justify-between transition-all hover:opacity-75 hover:scale-90",
            getGlassCardStyle()
          )}
        >
          <div className="opacity-50 pointer-events-none w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-3xs font-mono font-bold uppercase text-slate-500">#{prevIndex + 1}</span>
              <span className="text-xs font-bold font-play text-slate-700 dark:text-slate-300">{isVi ? prevSlide.titleVi : prevSlide.titleEn}</span>
            </div>
            <div className="flex-1 overflow-hidden py-4 blur-[2px]">
              <PrevComponent />
            </div>
            <div className="text-center text-3xs font-mono text-slate-400">‹ {isVi ? "Bấm để chọn" : "Click to view"}</div>
          </div>
        </motion.div>

        {/* Center Active Main Card (Thẻ trung tâm nổi bật nhất) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ borderRadius: "var(--theme-radius-card, 28px)" }}
            className={cn(
              "relative z-30 w-full max-w-4xl h-[520px] sm:h-[590px] border flex flex-col overflow-hidden shadow-2xl",
              getGlassCardStyle()
            )}
          >
            {/* Top Bar inside Center Card */}
            <div className="px-5 py-3.5 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-cyan-300">
                  {isVi ? currentSlide.titleVi : currentSlide.titleEn}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xs font-mono px-2 py-0.5 rounded-full bg-blue-500/15 dark:bg-cyan-500/15 text-blue-600 dark:text-cyan-300 border border-blue-500/30">
                  {isVi ? "Thẻ Trung Tâm" : "Active Center Card"}
                </span>
              </div>
            </div>

            {/* Component Body (Scrollable Content) */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-3 sm:p-5 text-left">
              <ActiveComponent />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right Adjacent Preview Card (Nhô ra bên phải) */}
        <motion.div
          key={`next-${nextIndex}`}
          onClick={() => handleSelect(nextIndex)}
          initial={{ opacity: 0, x: 60, scale: 0.85 }}
          animate={{ opacity: 0.55, x: 40, scale: 0.88, rotateY: -8 }}
          transition={{ duration: 0.4 }}
          className={cn(
            "absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 w-[280px] sm:w-[340px] h-[460px] sm:h-[500px] rounded-3xl p-5 border cursor-pointer overflow-hidden z-10 hidden md:flex flex-col justify-between transition-all hover:opacity-75 hover:scale-90",
            getGlassCardStyle()
          )}
        >
          <div className="opacity-50 pointer-events-none w-full h-full flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-3xs font-mono font-bold uppercase text-slate-500">#{nextIndex + 1}</span>
              <span className="text-xs font-bold font-play text-slate-700 dark:text-slate-300">{isVi ? nextSlide.titleVi : nextSlide.titleEn}</span>
            </div>
            <div className="flex-1 overflow-hidden py-4 blur-[2px]">
              <NextComponent />
            </div>
            <div className="text-center text-3xs font-mono text-slate-400">{isVi ? "Bấm để chọn" : "Click to view"} ›</div>
          </div>
        </motion.div>

      </div>

      {/* Horizontal List of Clickable Indicator Dots below the cards */}
      <div className="relative z-20 w-full flex items-center justify-center pt-3 pb-1">
        <div className="flex items-center gap-1.5 sm:gap-2 px-4 py-2 rounded-2xl bg-white/75 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/15 backdrop-blur-xl shadow-lg overflow-x-auto no-scrollbar max-w-full">
          {STACKED_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => handleSelect(idx)}
                className={cn(
                  "group relative transition-all duration-300 cursor-pointer flex items-center justify-center rounded-full",
                  isActive 
                    ? "w-8 h-3 bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md ring-2 ring-blue-400/40" 
                    : "w-3 h-3 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40"
                )}
                title={isVi ? slide.titleVi : slide.titleEn}
              >
                {isActive && (
                  <span className="absolute -top-7 px-1.5 py-0.5 rounded-md bg-slate-900 dark:bg-slate-950 text-white text-[10px] font-bold font-mono shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
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

export default GlassStackedCardSlide;
