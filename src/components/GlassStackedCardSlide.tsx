import React, { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Layers, Sparkles } from "lucide-react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { cn, getUnifiedSurfaceStyle } from "../lib/utils";
import { playUiSound } from "../lib/sound";
import { SECTIONS, SectionItem } from "../data/sections";

interface GlassStackedCardSlideProps {
  onNavigate?: (sectionId: string) => void;
  activeSection?: string;
}

export const GlassStackedCardSlide: React.FC<GlassStackedCardSlideProps> = ({ 
  onNavigate,
  activeSection 
}) => {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";

  const totalSlides = SECTIONS.length;

  const [currentIndex, setCurrentIndex] = useState(() => {
    if (activeSection) {
      const found = SECTIONS.findIndex((s) => s.id === activeSection);
      if (found !== -1) return found;
    }
    return 0;
  });

  // Sync if activeSection changes from outside
  useEffect(() => {
    if (activeSection) {
      const found = SECTIONS.findIndex((s) => s.id === activeSection);
      if (found !== -1 && found !== currentIndex) {
        setCurrentIndex(found);
      }
    }
  }, [activeSection]);

  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  const handleSelect = (idx: number) => {
    if (idx === currentIndex) return;
    try { playUiSound("click"); } catch {}
    const safeIdx = (idx + totalSlides) % totalSlides;
    setCurrentIndex(safeIdx);
    if (onNavigate) {
      onNavigate(SECTIONS[safeIdx].id);
    }
  };

  const handlePrev = () => handleSelect(currentIndex - 1);
  const handleNext = () => handleSelect(currentIndex + 1);
  const handleTop = () => handleSelect(currentIndex - 2);
  const handleBottom = () => handleSelect(currentIndex + 2);

  // Keyboard navigation: 4 directions
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
      if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowUp") handleTop();
      else if (e.key === "ArrowDown") handleBottom();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  // Touch Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;
    const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > 40) {
        if (deltaX > 0) handleNext();
        else handlePrev();
      }
    } else {
      if (Math.abs(deltaY) > 40) {
        if (deltaY > 0) handleBottom();
        else handleTop();
      }
    }
  };

  // 4 Surrounding Adjacent Slides (15px gap)
  const currentSlide = SECTIONS[currentIndex];
  const leftIdx = (currentIndex - 1 + totalSlides) % totalSlides;
  const rightIdx = (currentIndex + 1) % totalSlides;
  const topIdx = (currentIndex - 2 + totalSlides) % totalSlides;
  const bottomIdx = (currentIndex + 2) % totalSlides;

  const leftSlide = SECTIONS[leftIdx];
  const rightSlide = SECTIONS[rightIdx];
  const topSlide = SECTIONS[topIdx];
  const bottomSlide = SECTIONS[bottomIdx];

  const ActiveComponent = currentSlide.Component;

  // Header is shown on slide 0 ("home"), Footer is shown on slide N-1 (last slide)
  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === totalSlides - 1;

  const dynamicBoundsClass = isFirstSlide
    ? "top-[80px] bottom-[20px] h-[calc(100vh-100px)]"
    : isLastSlide
    ? "top-[20px] bottom-[72px] h-[calc(100vh-92px)]"
    : "top-[20px] bottom-[20px] h-[calc(100vh-40px)]";

  return (
    <div 
      className={cn(
        "fixed left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[1280px] z-30 flex flex-col items-center justify-center select-none font-sans overflow-hidden box-border transition-all duration-300",
        dynamicBoundsClass
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-[28px]">
        <div className="absolute top-[8%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-500/12 dark:bg-cyan-500/10 blur-[130px]" />
        <div className="absolute bottom-[8%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-violet-500/12 dark:bg-purple-600/10 blur-[130px]" />
      </div>

      {/* Main Slide Stack Stage Container with 15px Gap Peaking Area */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-3 sm:p-5 box-border">

        {/* ========================================================================= */}
        {/* 1. SLIDE PHÍA TRÊN (TOP PEAKING SLIDE - Cách tâm 15px)                     */}
        {/* ========================================================================= */}
        <motion.div
          key={`top-${topIdx}`}
          onClick={handleTop}
          initial={{ opacity: 0, y: -20, scale: 0.94 }}
          animate={{ opacity: 0.78, y: 0, scale: 0.96 }}
          whileHover={{ opacity: 0.98, scale: 0.98, y: 3 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 w-[70%] max-w-[760px] h-[46px] sm:h-[54px] rounded-[18px] border cursor-pointer z-20 flex items-center justify-between px-4 sm:px-5 py-2 backdrop-blur-xl shadow-lg transition-all overflow-hidden",
            "bg-gradient-to-b from-violet-600/35 via-purple-600/25 to-transparent border-violet-400/40 text-violet-100 dark:text-violet-200"
          )}
          style={{
            marginBottom: "15px"
          }}
          title={isVi ? `Slide phía trên: ${topSlide.labelVi}` : `Top slide: ${topSlide.labelEn}`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-5.5 h-5.5 rounded-lg bg-violet-500/35 border border-violet-400/40 flex items-center justify-center text-[11px] font-mono font-bold text-violet-200 shrink-0">
              #{topIdx + 1}
            </span>
            <span className="text-xs font-bold truncate">
              {isVi ? topSlide.labelVi : topSlide.labelEn}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-3xs font-mono font-bold text-violet-200 shrink-0">
            <ChevronUp className="w-4 h-4 animate-bounce" />
            <span className="hidden sm:inline">{isVi ? "Slide trên (▲)" : "Click to view"}</span>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 2. SLIDE BÊN TRÁI (LEFT PEAKING SLIDE - Cách tâm 15px)                    */}
        {/* ========================================================================= */}
        <motion.div
          key={`left-${leftIdx}`}
          onClick={handlePrev}
          initial={{ opacity: 0, x: -30, scale: 0.88 }}
          animate={{ opacity: 0.75, x: 0, scale: 0.92 }}
          whileHover={{ opacity: 0.98, scale: 0.95, x: 6 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 w-[110px] sm:w-[160px] md:w-[200px] h-[72%] max-h-[500px] rounded-[22px] border cursor-pointer z-20 hidden sm:flex flex-col justify-between p-3 sm:p-3.5 backdrop-blur-xl shadow-xl transition-all overflow-hidden",
            "bg-gradient-to-r from-blue-600/35 via-sky-600/25 to-transparent border-blue-400/40 text-sky-100 dark:text-sky-200"
          )}
          style={{
            marginRight: "15px"
          }}
          title={isVi ? `Slide bên trái: ${leftSlide.labelVi}` : `Previous: ${leftSlide.labelEn}`}
        >
          <div className="flex items-center justify-between">
            <span className="w-5.5 h-5.5 rounded-lg bg-sky-500/35 border border-sky-400/40 flex items-center justify-center text-[11px] font-mono font-bold text-sky-200">
              #{leftIdx + 1}
            </span>
            <ChevronLeft className="w-4 h-4 text-sky-300 animate-pulse" />
          </div>
          <div className="my-auto text-left py-2">
            <h4 className="text-xs sm:text-sm font-black font-play text-white truncate">
              {isVi ? leftSlide.labelVi : leftSlide.labelEn}
            </h4>
            <span className="text-[10px] text-sky-200/80 block mt-0.5">
              {isVi ? "‹ Trượt trái" : "‹ Slide left"}
            </span>
          </div>
          <div className="w-full h-1 bg-sky-400/30 rounded-full overflow-hidden">
            <div className="h-full bg-sky-400 rounded-full w-2/3" />
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 3. SLIDE TRUNG TÂM (CENTER ACTIVE MAIN SLIDE)                             */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative z-30 w-full h-full rounded-[24px] border flex flex-col overflow-hidden shadow-2xl backdrop-blur-2xl box-border",
              getUnifiedSurfaceStyle(theme)
            )}
            style={{
              borderRadius: "var(--theme-radius-card, 24px)",
              boxSizing: "border-box"
            }}
          >
            {/* Scrollable Slide Content Body - Full slide card fill */}
            <div className="relative flex-1 w-full h-full min-h-0 overflow-y-auto no-scrollbar scroll-smooth p-0 text-left box-border">
              <Suspense fallback={null}>
                <ActiveComponent />
              </Suspense>

              {/* Floating Bottom Center Nav Dock */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-0.5 p-1 rounded-full bg-slate-950/85 border border-cyan-400/40 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(0,240,255,0.25)] pointer-events-auto">
                {/* Nút Tròn Nhỏ Bên Trái (Lùi) */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/15 hover:bg-cyan-400 hover:text-slate-950 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-md active:scale-90 shrink-0"
                  title={isVi ? "Slide trước (Lùi)" : "Previous slide"}
                >
                  <ChevronLeft className="w-4 h-4 shrink-0" />
                </button>

                {/* Nút Chính Giữa TO */}
                <div className="px-3.5 sm:px-4 py-1.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-mono font-black text-xs sm:text-sm shadow-md border border-cyan-300/40 flex items-center gap-2 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping shrink-0" />
                  <span>{isVi ? `Slide ${currentIndex + 1} / ${totalSlides}` : `Slide ${currentIndex + 1} / ${totalSlides}`}</span>
                </div>

                {/* Nút Tròn Nhỏ Bên Phải (Tới) */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/15 hover:bg-cyan-400 hover:text-slate-950 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-md active:scale-90 shrink-0"
                  title={isVi ? "Slide tiếp (Tới)" : "Next slide"}
                >
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 4. SLIDE BÊN PHẢI (RIGHT PEAKING SLIDE - Cách tâm 15px)                   */}
        {/* ========================================================================= */}
        <motion.div
          key={`right-${rightIdx}`}
          onClick={handleNext}
          initial={{ opacity: 0, x: 30, scale: 0.88 }}
          animate={{ opacity: 0.75, x: 0, scale: 0.92 }}
          whileHover={{ opacity: 0.98, scale: 0.95, x: -6 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 w-[110px] sm:w-[160px] md:w-[200px] h-[72%] max-h-[500px] rounded-[22px] border cursor-pointer z-20 hidden sm:flex flex-col justify-between p-3 sm:p-3.5 backdrop-blur-xl shadow-xl transition-all overflow-hidden",
            "bg-gradient-to-l from-indigo-600/35 via-purple-600/25 to-transparent border-indigo-400/40 text-indigo-100 dark:text-indigo-200"
          )}
          style={{
            marginLeft: "15px"
          }}
          title={isVi ? `Slide bên phải: ${rightSlide.labelVi}` : `Next: ${rightSlide.labelEn}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-indigo-200/80 font-mono">Next</span>
            <span className="w-5.5 h-5.5 rounded-lg bg-indigo-500/35 border border-indigo-400/40 flex items-center justify-center text-[11px] font-mono font-bold text-indigo-200">
              #{rightIdx + 1}
            </span>
          </div>
          <div className="my-auto text-right py-2">
            <h4 className="text-xs sm:text-sm font-black font-play text-white truncate">
              {isVi ? rightSlide.labelVi : rightSlide.labelEn}
            </h4>
            <span className="text-[10px] text-indigo-200/80 block mt-0.5">
              {isVi ? "Trượt phải ›" : "Slide right ›"}
            </span>
          </div>
          <div className="w-full h-1 bg-indigo-400/30 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-400 rounded-full w-2/3 ml-auto" />
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 5. SLIDE PHÍA DƯỚI (BOTTOM PEAKING SLIDE - Cách tâm 15px)                 */}
        {/* ========================================================================= */}
        <motion.div
          key={`bottom-${bottomIdx}`}
          onClick={handleBottom}
          initial={{ opacity: 0, y: 20, scale: 0.94 }}
          animate={{ opacity: 0.78, y: 0, scale: 0.96 }}
          whileHover={{ opacity: 0.98, scale: 0.98, y: -3 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 w-[70%] max-w-[760px] h-[46px] sm:h-[54px] rounded-[18px] border cursor-pointer z-20 flex items-center justify-between px-4 sm:px-5 py-2 backdrop-blur-xl shadow-lg transition-all overflow-hidden",
            "bg-gradient-to-t from-pink-600/35 via-rose-600/25 to-transparent border-pink-400/40 text-pink-100 dark:text-pink-200"
          )}
          style={{
            marginTop: "15px"
          }}
          title={isVi ? `Slide phía dưới: ${bottomSlide.labelVi}` : `Bottom slide: ${bottomSlide.labelEn}`}
        >
          <div className="flex items-center gap-1.5 text-3xs font-mono font-bold text-pink-200 shrink-0">
            <ChevronDown className="w-4 h-4 animate-bounce" />
            <span className="hidden sm:inline">{isVi ? "Slide dưới (▼)" : "Click to view"}</span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-bold truncate">
              {isVi ? bottomSlide.labelVi : bottomSlide.labelEn}
            </span>
            <span className="w-5.5 h-5.5 rounded-lg bg-pink-500/35 border border-pink-400/40 flex items-center justify-center text-[11px] font-mono font-bold text-pink-200 shrink-0">
              #{bottomIdx + 1}
            </span>
          </div>
        </motion.div>

      </div>

      {/* Dãy nút chấm chuyển Slide phía dưới */}
      <div className="relative z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/40 dark:bg-black/30 border border-white/20 backdrop-blur-lg mt-1.5 overflow-x-auto no-scrollbar max-w-full">
        {SECTIONS.map((sec, idx) => (
          <button
            key={sec.id}
            type="button"
            onClick={() => handleSelect(idx)}
            className={cn(
              "rounded-full transition-all cursor-pointer",
              idx === currentIndex
                ? "w-6 h-2.5 bg-gradient-to-r from-blue-500 to-cyan-400 shadow-sm"
                : "w-2.5 h-2.5 bg-slate-300 dark:bg-white/20 hover:bg-slate-400"
            )}
            title={isVi ? sec.labelVi : sec.labelEn}
          />
        ))}
      </div>
    </div>
  );
};

export default GlassStackedCardSlide;
