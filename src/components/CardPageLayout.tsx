import React, { useState, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Sparkles, Layers, Palette } from "lucide-react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { cn, getUnifiedSurfaceStyle } from "../lib/utils";
import { playUiSound } from "../lib/sound";
import { SECTIONS } from "../data/sections";

interface CardPageLayoutProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
}

export const CardPageLayout: React.FC<CardPageLayoutProps> = ({
  activeSection = "home",
  onNavigate
}) => {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";

  // 3 Dynamic Card Background Presets
  const [bgPreset, setBgPreset] = useState<"neon" | "crystal" | "sunset">("neon");

  const activeIndex = Math.max(
    0,
    SECTIONS.findIndex((s) => s.id === activeSection)
  );
  const currentSection = SECTIONS[activeIndex] || SECTIONS[0];
  const ActiveComponent = currentSection.Component;

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + SECTIONS.length) % SECTIONS.length;
    playUiSound("click");
    if (onNavigate) onNavigate(SECTIONS[prevIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % SECTIONS.length;
    playUiSound("click");
    if (onNavigate) onNavigate(SECTIONS[nextIdx].id);
  };

  // Preset background styles
  const getPresetBgClass = () => {
    switch (bgPreset) {
      case "crystal":
        return "bg-gradient-to-br from-emerald-950/40 via-teal-900/30 to-cyan-950/40 border-emerald-400/30 text-emerald-100 shadow-[0_0_30px_rgba(16,185,129,0.15)]";
      case "sunset":
        return "bg-gradient-to-br from-pink-950/40 via-rose-900/30 to-amber-950/40 border-pink-400/30 text-pink-100 shadow-[0_0_30px_rgba(244,63,94,0.15)]";
      case "neon":
      default:
        return "bg-gradient-to-br from-cyan-950/40 via-blue-900/30 to-purple-950/40 border-cyan-400/30 text-cyan-100 shadow-[0_0_30px_rgba(6,182,212,0.15)]";
    }
  };

  return (
    <div className="fixed top-[83px] bottom-[83px] left-1/2 -translate-x-1/2 w-[calc(100%-50px)] max-w-[1280px] h-[calc(100vh-166px)] z-30 flex flex-col justify-between overflow-hidden select-none font-play box-border">
      {/* Background Ambient Glow for Card Page */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-[24px]">
        <div className="absolute -top-[20%] left-[10%] w-[45vw] h-[45vw] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      {/* Main Single Fit-100vh Center Card */}
      <div
        className={cn(
          "relative z-10 w-full h-full rounded-[24px] border flex flex-col overflow-hidden shadow-2xl transition-all duration-500 box-border",
          getUnifiedSurfaceStyle(theme)
        )}
        style={{
          borderRadius: "24px",
          boxSizing: "border-box"
        }}
      >
        {/* Center Card Top Navigation Bar - Hidden per focus mode request */}
        <div className="hidden px-4 sm:px-6 py-3 border-b border-white/20 dark:border-white/10 flex items-center justify-between bg-white/30 dark:bg-black/30 shrink-0 backdrop-blur-md" style={{ display: "none" }}>
          {/* Left Title & Status */}
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center text-xs font-mono font-bold shadow-md shrink-0">
              #{activeIndex + 1}
            </span>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-black font-play text-slate-900 dark:text-white truncate leading-tight">
                {isVi ? currentSection.labelVi : currentSection.labelEn}
              </h3>
              <span className="text-[10px] text-slate-500 dark:text-cyan-200/70 font-mono block truncate">
                {isVi ? "Trải nghiệm 1 trang nguyên khối" : "100vh Integrated Card View"}
              </span>
            </div>
          </div>

          {/* Right Controls: 3 Dynamic Background Theme Switcher + Nav Arrows */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* 3 Background Presets Switcher */}
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-black/20 border border-white/10 backdrop-blur-md">
              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  setBgPreset("neon");
                }}
                className={cn(
                  "px-2 py-1 rounded-lg text-3xs font-bold transition-all cursor-pointer flex items-center gap-1",
                  bgPreset === "neon"
                    ? "bg-cyan-500 text-slate-950 font-black shadow-xs"
                    : "text-slate-300 hover:text-white"
                )}
                title={isVi ? "Giao diện Cyan Neon" : "Cyan Neon Glass"}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Neon</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  setBgPreset("crystal");
                }}
                className={cn(
                  "px-2 py-1 rounded-lg text-3xs font-bold transition-all cursor-pointer flex items-center gap-1",
                  bgPreset === "crystal"
                    ? "bg-emerald-500 text-slate-950 font-black shadow-xs"
                    : "text-slate-300 hover:text-white"
                )}
                title={isVi ? "Giao diện Crystal Emerald" : "Crystal Emerald Glass"}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Crystal</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  setBgPreset("sunset");
                }}
                className={cn(
                  "px-2 py-1 rounded-lg text-3xs font-bold transition-all cursor-pointer flex items-center gap-1",
                  bgPreset === "sunset"
                    ? "bg-pink-500 text-slate-950 font-black shadow-xs"
                    : "text-slate-300 hover:text-white"
                )}
                title={isVi ? "Giao diện Cyber Sunset" : "Cyber Sunset Glass"}
              >
                <span className="w-2 h-2 rounded-full bg-pink-400" />
                <span>Sunset</span>
              </button>
            </div>

            {/* Custom Navigation Pill: Large Center Button + 2 Smaller Circular Buttons attached directly */}
            <div className="flex items-center gap-0.5 p-1 rounded-full bg-black/30 dark:bg-black/50 border border-white/20 backdrop-blur-xl shadow-lg shrink-0">
              {/* Nút Tròn Nhỏ Bên Trái (Lùi) */}
              <button
                type="button"
                onClick={handlePrev}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-cyan-500 hover:text-slate-950 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-xs active:scale-90 shrink-0"
                title={isVi ? "Trang trước (Lùi)" : "Previous page"}
              >
                <ChevronLeft className="w-4 h-4 shrink-0" />
              </button>

              {/* Nút Chính Giữa TO */}
              <div className="px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-mono font-black text-xs sm:text-sm shadow-md border border-cyan-300/40 flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping shrink-0" />
                <span>#{activeIndex + 1} / {SECTIONS.length}</span>
              </div>

              {/* Nút Tròn Nhỏ Bên Phải (Tới) */}
              <button
                type="button"
                onClick={handleNext}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-cyan-500 hover:text-slate-950 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-xs active:scale-90 shrink-0"
                title={isVi ? "Trang tiếp (Tới)" : "Next page"}
              >
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Center Card Active Content - Full slide card fill */}
        <div className="relative flex-1 w-full h-full min-h-0 overflow-y-auto custom-scrollbar p-0 text-left box-border">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Suspense fallback={null}>
                <ActiveComponent />
              </Suspense>
            </motion.div>
          </AnimatePresence>

          {/* Floating Bottom Center Nav Dock - Hidden per focus mode request */}
          <div className="hidden absolute bottom-3 left-1/2 -translate-x-1/2 z-40 items-center gap-0.5 p-1 rounded-full bg-slate-950/85 border border-cyan-400/40 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(0,240,255,0.25)] pointer-events-auto" style={{ display: "none" }}>
            {/* Nút Tròn Nhỏ Bên Trái (Lùi) */}
            <button
              type="button"
              onClick={handlePrev}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/15 hover:bg-cyan-400 hover:text-slate-950 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-md active:scale-90 shrink-0"
              title={isVi ? "Trang trước (Lùi)" : "Previous page"}
            >
              <ChevronLeft className="w-4 h-4 shrink-0" />
            </button>

            {/* Nút Chính Giữa TO */}
            <div className="px-4 py-1.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-mono font-black text-xs sm:text-sm shadow-md border border-cyan-300/40 flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping shrink-0" />
              <span>{isVi ? `Trang ${activeIndex + 1} / ${SECTIONS.length}` : `Page ${activeIndex + 1} / ${SECTIONS.length}`}</span>
            </div>

            {/* Nút Tròn Nhỏ Bên Phải (Tới) */}
            <button
              type="button"
              onClick={handleNext}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/15 hover:bg-cyan-400 hover:text-slate-950 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-md active:scale-90 shrink-0"
              title={isVi ? "Trang tiếp (Tới)" : "Next page"}
            >
              <ChevronRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPageLayout;
