import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MousePointer, 
  X, 
  Sparkles, 
  CircleDot, 
  Crosshair, 
  Dot, 
  Flame, 
  RotateCcw, 
  Check, 
  Sliders 
} from "lucide-react";
import { useCursor } from "../context/CursorContext";
import { useLanguage } from "../i18n";
import { useSound } from "../context/SoundContext";
import { CURSOR_STYLE_OPTIONS, CURSOR_COLOR_OPTIONS } from "../data/cursorData";
import { CursorStyleType } from "../types/cursor";
import { cn } from "../lib/utils";

export default function CursorSettingsModal() {
  const { 
    isCursorModalOpen, 
    setIsCursorModalOpen, 
    cursorConfig, 
    setCursorStyle, 
    setCursorSize, 
    setEnableTrail, 
    resetCursorConfig 
  } = useCursor();
  const { lang } = useLanguage();
  const { playClick, playSuccess } = useSound();
  const isVi = lang === "vi";

  if (!isCursorModalOpen) return null;

  const getCursorStyleIcon = (style: CursorStyleType) => {
    switch (style) {
      case "neon-ring": return Sparkles;
      case "minimal-dot": return CircleDot;
      case "crosshair": return Crosshair;
      case "liquid-bubble": return Dot;
      case "trailing-comet": return Flame;
      case "system": return MousePointer;
      default: return Sparkles;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCursorModalOpen(false)}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col text-left"
        >
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                <MousePointer className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-play">
                  {isVi ? "Tùy Chỉnh Con Trỏ Chuột (Cursor FX)" : "Cursor FX Customization"}
                </h3>
                <p className="text-xs text-cyan-100">
                  {isVi ? "Hiệu ứng con trỏ chuột độc đáo tạo trải nghiệm công nghệ cao" : "Interactive pointer styles and glowing comet trails"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                playClick();
                setIsCursorModalOpen(false);
              }}
              className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Style Picker */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block mb-2.5">
                {isVi ? "Kiểu Dáng Con Trỏ" : "Cursor Style"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CURSOR_STYLE_OPTIONS.map((opt) => {
                  const isSelected = cursorConfig.style === opt.id;
                  const Icon = getCursorStyleIcon(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setCursorStyle(opt.id);
                        playClick();
                      }}
                      className={cn(
                        "p-3 rounded-xl border text-left flex items-start justify-between gap-2 transition-all cursor-pointer",
                        isSelected
                          ? "bg-cyan-500/10 border-cyan-500 ring-2 ring-cyan-400/50 shadow-sm"
                          : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={cn("p-1.5 rounded-lg mt-0.5", isSelected ? "bg-cyan-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500")}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">
                            {isVi ? opt.nameVi : opt.nameEn}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                            {isVi ? opt.descVi : opt.descEn}
                          </div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trail & Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {isVi ? "Vệt sáng sao băng (Trail)" : "Comet Trail"}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {isVi ? "Vệt sáng lướt theo chuột" : "Smooth comet trail follows movement"}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEnableTrail(!cursorConfig.enableTrail);
                    playClick();
                  }}
                  className={cn(
                    "w-11 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center",
                    cursorConfig.enableTrail ? "bg-cyan-600 dark:bg-cyan-500 justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
                  )}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {isVi ? "Kích thước con trỏ" : "Cursor Size"}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {isVi ? "Quy mô vòng sáng" : "Pointer radius scale"}
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-white/10 p-1 rounded-lg">
                  {(["small", "medium", "large"] as const).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setCursorSize(size);
                        playClick();
                      }}
                      className={cn(
                        "px-2.5 py-1 rounded text-2xs font-bold capitalize transition-all cursor-pointer",
                        cursorConfig.size === size
                          ? "bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-xs"
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                resetCursorConfig();
                playSuccess();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isVi ? "Khôi phục mặc định" : "Reset Default"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playSuccess();
                setIsCursorModalOpen(false);
              }}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-md transition cursor-pointer"
            >
              {isVi ? "Hoàn Tất" : "Done"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
