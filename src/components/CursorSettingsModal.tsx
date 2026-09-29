import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MousePointer, Sparkles, Check, RotateCcw } from "lucide-react";
import { useCursor } from "../context/CursorContext";
import { useLanguage } from "../i18n";
import { CURSOR_STYLE_OPTIONS, CURSOR_COLOR_OPTIONS } from "../data/cursorData";
import { cn } from "../lib/utils";
import { playUiSound } from "../lib/sound";

export default function CursorSettingsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  const {
    cursorConfig,
    setCursorStyle,
    setCursorSize,
    setCursorColor,
    setEnableTrail,
    setEnableMagnetic,
    resetCursorDefaults,
  } = useCursor();

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-cursor-modal", handleOpen);
    window.addEventListener("open-cursor-settings", handleOpen);
    return () => {
      window.removeEventListener("open-cursor-modal", handleOpen);
      window.removeEventListener("open-cursor-settings", handleOpen);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="relative w-full max-w-xl rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 p-6 shadow-2xl z-10 text-slate-900 dark:text-slate-100 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 flex items-center justify-center">
                <MousePointer className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-play">
                  {isVi ? "Tùy Chỉnh Con Trỏ (Cursor FX)" : "Cursor FX Settings"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isVi ? "Cấu hình phong cách & hiệu ứng tương tác con trỏ" : "Customize mouse cursor style & visual FX"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                playUiSound("click");
                setIsOpen(false);
              }}
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cursor Style Presets */}
          <div className="space-y-4 mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {isVi ? "Phong cách con trỏ" : "Cursor Style Preset"}
            </div>
            <div className="grid grid-cols-2 gap-2.5 max-h-56 overflow-y-auto no-scrollbar p-1">
              {CURSOR_STYLE_OPTIONS.map((opt) => {
                const isSelected = cursorConfig.style === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      setCursorStyle(opt.id);
                    }}
                    className={cn(
                      "p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between",
                      isSelected
                        ? "bg-indigo-500/10 dark:bg-cyan-500/10 border-indigo-500 dark:border-cyan-400 text-indigo-900 dark:text-cyan-300 font-bold"
                        : "bg-slate-50/50 dark:bg-white/5 border-slate-200/80 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10"
                    )}
                  >
                    <div>
                      <div className="text-xs">{isVi ? opt.nameVi : opt.nameEn}</div>
                      <div className="text-3xs text-slate-500 dark:text-slate-400 font-normal">
                        {isVi ? opt.descVi : opt.descEn}
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-indigo-600 dark:text-cyan-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls: Size, Trail & Color */}
          <div className="space-y-4 pt-4 border-t border-slate-200/60 dark:border-white/10">
            {/* Trail Toggle */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-500 dark:text-cyan-400" />
                <div>
                  <div className="text-xs font-bold">{isVi ? "Hiệu ứng Vệt sáng (Comet Trail)" : "Comet Trail FX"}</div>
                  <div className="text-3xs text-slate-500">{isVi ? "Vệt sáng theo dõi chuyển động chuột" : "Glow trail following mouse path"}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  setEnableTrail(!cursorConfig.enableTrail);
                }}
                className={cn(
                  "w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer flex items-center",
                  cursorConfig.enableTrail ? "bg-indigo-600 dark:bg-cyan-400 justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
                )}
              >
                <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* Size Options */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10">
              <span className="text-xs font-bold">{isVi ? "Kích thước" : "Cursor Size"}</span>
              <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-800 p-1 rounded-xl">
                {(["small", "medium", "large"] as const).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      setCursorSize(sz);
                    }}
                    className={cn(
                      "px-3 py-1 rounded-lg text-3xs font-bold capitalize transition-all cursor-pointer",
                      cursorConfig.size === sz
                        ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-cyan-400 shadow-xs"
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Presets */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10">
              <span className="text-xs font-bold">{isVi ? "Tông màu phát quang" : "Luminescent Color"}</span>
              <div className="flex items-center gap-1.5">
                {CURSOR_COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      setCursorColor(c.id);
                    }}
                    className={cn(
                      "w-5 h-5 rounded-full transition-transform cursor-pointer border border-black/10",
                      cursorConfig.colorPreset === c.id ? "scale-125 ring-2 ring-indigo-500 dark:ring-cyan-400" : "opacity-70 hover:opacity-100"
                    )}
                    style={{ backgroundColor: c.hex }}
                    title={isVi ? c.nameVi : c.nameEn}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-200/60 dark:border-white/10">
            <button
              type="button"
              onClick={() => {
                playUiSound("click");
                resetCursorDefaults();
              }}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isVi ? "Đặt lại mặc định" : "Reset Defaults"}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playUiSound("click");
                setIsOpen(false);
              }}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-cyan-500 dark:hover:bg-cyan-600 dark:text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              {isVi ? "Hoàn tất" : "Done"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
