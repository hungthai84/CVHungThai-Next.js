import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutTemplate,
  LayoutDashboard,
  Layers,
  FileText,
  LayoutGrid,
  ChevronDown,
  Check,
  Sparkles,
  Sliders
} from "lucide-react";
import { useLayout, LAYOUT_OPTIONS, LayoutMode } from "../context/LayoutContext";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { useSound } from "../context/SoundContext";
import { cn, getUnifiedSurfaceStyle } from "../lib/utils";

const LAYOUT_ICONS: Record<LayoutMode, React.ComponentType<{ className?: string }>> = {
  "card-page": LayoutTemplate,
  dashboard: LayoutDashboard,
  "slide-stack": Layers,
  landing: FileText,
  "bento-pinterest": LayoutGrid,
};

const SHORT_LAYOUT_NAMES: Record<LayoutMode, { en: string; vi: string }> = {
  "card-page": { en: "Card Page", vi: "Trang Thẻ" },
  dashboard: { en: "Dashboard", vi: "Dashboard" },
  "slide-stack": { en: "Stack", vi: "Slide Stack" },
  landing: { en: "Landing", vi: "Landing" },
  "bento-pinterest": { en: "Bento", vi: "Bento" },
};

export default function TopRightLayoutSwitcher() {
  const { layoutMode, setLayoutMode, isSwitching } = useLayout();
  const { lang } = useLanguage();
  const isVi = lang === "vi";
  const { theme, themeMode } = useTheme();
  const { playClick, playHover } = useSound();

  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const currentLayoutOption = LAYOUT_OPTIONS.find((opt) => opt.id === layoutMode) || LAYOUT_OPTIONS[0];
  const CurrentIcon = LAYOUT_ICONS[layoutMode] || LayoutTemplate;
  const shortName = SHORT_LAYOUT_NAMES[layoutMode]?.[isVi ? "vi" : "en"] || currentLayoutOption.nameEn;

  const handleSelectLayout = (mode: LayoutMode) => {
    try {
      playClick();
    } catch {}
    setLayoutMode(mode);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative group/layoutbtn">
        {/* Ambient Glowing Border Aura */}
        <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-cyan-500/50 via-indigo-500/50 to-fuchsia-500/50 opacity-60 blur-[3px] group-hover/layoutbtn:opacity-100 transition-opacity duration-300 pointer-events-none animate-pulse" />

        {/* Trigger Button - Icon only by default, expands from left-to-right on hover revealing 2-word title */}
        <button
          type="button"
          onClick={() => {
            try {
              playClick();
            } catch {}
            setIsOpen((prev) => !prev);
          }}
          onMouseEnter={() => {
            try {
              playHover();
            } catch {}
          }}
          aria-label={isVi ? `Thay đổi bố cục giao diện` : `Switch layout mode`}
          aria-expanded={isOpen}
          className={cn(
            "relative z-10 flex items-center h-10 pl-3 pr-2 rounded-l-full rounded-r-none border-r-0",
            "bg-slate-900/85 dark:bg-slate-950/90 text-white border border-white/25 shadow-[0_8px_25px_rgba(0,0,0,0.35)] backdrop-blur-2xl",
            "transition-all duration-300 ease-out hover:pl-3.5 hover:brightness-110 active:scale-95 cursor-pointer overflow-hidden group/layoutbtn",
            isOpen && "ring-2 ring-cyan-400/80 border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          )}
        >
          {/* Active Layout Icon */}
          <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 text-white shrink-0 shadow-sm">
            <CurrentIcon className={cn("w-3.5 h-3.5 transition-transform duration-300", isSwitching && "animate-spin")} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-slate-900 animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-slate-900" />
          </div>

          {/* Expandable 2-Word Title on Hover (Push from left to right) */}
          <div className="max-w-0 opacity-0 group-hover/layoutbtn:max-w-32 group-hover/layoutbtn:opacity-100 group-hover/layoutbtn:ml-2 transition-all duration-300 ease-out flex items-center overflow-hidden whitespace-nowrap">
            <span className="text-xs font-bold text-cyan-200 tracking-wide drop-shadow-xs">
              {isVi ? "Bố Cục" : "Layout Mode"}
            </span>
          </div>

          {/* Chevron Arrow */}
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 text-cyan-300 transition-transform duration-300 ml-1 shrink-0 opacity-60 group-hover/layoutbtn:opacity-100",
              isOpen && "rotate-180 text-white"
            )}
          />
        </button>

        {/* Hover Tooltip - Pulsing Active Badge when hovered (when dropdown is closed) */}
        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 4, scale: 0.92, filter: "blur(4px)" }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute top-full right-0 mt-2 pointer-events-none z-[110] flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/95 border border-cyan-400/50 shadow-[0_8px_25px_rgba(6,182,212,0.35)] backdrop-blur-2xl text-white whitespace-nowrap"
            >
              {/* Pulsing indicator light */}
              <span className="relative flex h-2 h-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>

              <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-300">
                {isVi ? "Đang bật:" : "Active:"}
              </span>

              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/30 to-indigo-500/30 border border-cyan-400/60 text-cyan-200 text-xs font-black tracking-wide animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                {shortName}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dropdown Popup Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.92, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, scale: 0.92, filter: "blur(6px)" }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full right-0 mt-2.5 w-[280px] sm:w-[320px] rounded-2xl p-2.5 z-[100] shadow-[0_15px_45px_rgba(0,0,0,0.6),0_0_25px_rgba(6,182,212,0.25)] border border-white/20 dark:border-white/10 bg-slate-900/90 dark:bg-slate-950/95 backdrop-blur-2xl text-white overflow-hidden"
            >
              {/* Header inside popup */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-1.5">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-black uppercase tracking-wider text-cyan-300">
                    {isVi ? "Chọn Bố Cục Website" : "Select Website Layout"}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  5 {isVi ? "giao diện" : "styles"}
                </span>
              </div>

              {/* Layout Options List */}
              <div className="flex flex-col gap-1 max-h-[340px] overflow-y-auto no-scrollbar py-0.5">
                {LAYOUT_OPTIONS.map((opt) => {
                  const IconComp = LAYOUT_ICONS[opt.id] || LayoutTemplate;
                  const isSelected = opt.id === layoutMode;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectLayout(opt.id)}
                      onMouseEnter={() => {
                        try {
                          playHover();
                        } catch {}
                      }}
                      className={cn(
                        "w-full text-left flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 cursor-pointer group/item relative overflow-hidden",
                        isSelected
                          ? "bg-gradient-to-r from-cyan-600/30 via-indigo-600/30 to-purple-600/30 border border-cyan-400/50 shadow-[0_4px_15px_rgba(6,182,212,0.2)]"
                          : "hover:bg-white/10 dark:hover:bg-white/5 border border-transparent hover:border-white/10"
                      )}
                    >
                      {/* Left Icon Badge */}
                      <div
                        className={cn(
                          "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/item:scale-110",
                          isSelected
                            ? "bg-gradient-to-br from-cyan-400 to-indigo-600 text-white shadow-md shadow-cyan-500/30"
                            : "bg-white/10 text-slate-300 group-hover/item:bg-white/20 group-hover/item:text-white"
                        )}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={cn(
                              "text-xs font-bold truncate",
                              isSelected ? "text-cyan-200 font-extrabold" : "text-white"
                            )}
                          >
                            {isVi ? opt.nameVi : opt.nameEn}
                          </span>
                          {isSelected && (
                            <span className="inline-flex items-center px-1.5 py-0.2 text-[9px] font-black rounded-full bg-cyan-400 text-slate-950 uppercase tracking-wider animate-pulse">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-300 dark:text-slate-400 line-clamp-1 mt-0.5 leading-snug">
                          {isVi ? opt.taglineVi : opt.taglineEn}
                        </p>
                      </div>

                      {/* Right Checkmark */}
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0 self-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Bottom Quick Switch Note */}
              <div className="mt-1.5 pt-2 border-t border-white/10 text-center">
                <p className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
                  <span>
                    {isVi
                      ? "Chuyển đổi tức thì — Giữ nguyên 100% Dữ liệu"
                      : "Instant Switch — Keeps 100% Data"}
                  </span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

