import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  PanelBottom, 
  X, 
  Maximize2, 
  Columns, 
  EyeOff, 
  RotateCcw, 
  Check, 
  Pin,
  Sliders
} from "lucide-react";
import { useFooter } from "../context/FooterContext";
import { useLanguage } from "../i18n";
import { useSound } from "../context/SoundContext";
import { FOOTER_PLACEMENT_OPTIONS } from "../data/footerData";
import { FooterPlacement } from "../types/footer";
import { cn } from "../lib/utils";

export default function FooterSettingsModal() {
  const { 
    isFooterModalOpen, 
    setIsFooterModalOpen, 
    footerConfig, 
    setPlacement, 
    togglePin, 
    toggleElementVisibility, 
    resetFooterConfig 
  } = useFooter();
  const { lang } = useLanguage();
  const { playClick, playSuccess } = useSound();
  const isVi = lang === "vi";

  if (!isFooterModalOpen) return null;

  const getPlacementIcon = (id: FooterPlacement) => {
    switch (id) {
      case "fixed-bottom": return PanelBottom;
      case "floating-pill": return Maximize2;
      case "full-width": return Columns;
      case "auto-hide": return EyeOff;
      default: return PanelBottom;
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
          onClick={() => setIsFooterModalOpen(false)}
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
          <div className="p-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                <PanelBottom className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-play">
                  {isVi ? "Cài Đặt Chân Trang (Footer Dock)" : "Footer Dock Settings"}
                </h3>
                <p className="text-xs text-blue-100">
                  {isVi ? "Tùy biến vị trí hiển thị, ghim thanh điều hướng và biểu tượng" : "Customize dock placement, pin status, and quick icons"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                playClick();
                setIsFooterModalOpen(false);
              }}
              className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Placement Options */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block mb-2.5">
                {isVi ? "Vị Trí Hiển Thị Dock" : "Dock Placement"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FOOTER_PLACEMENT_OPTIONS.map((opt) => {
                  const isSelected = footerConfig.placement === opt.id;
                  const Icon = getPlacementIcon(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setPlacement(opt.id);
                        playClick();
                      }}
                      className={cn(
                        "p-3 rounded-xl border text-left flex items-start justify-between gap-2 transition-all cursor-pointer",
                        isSelected
                          ? "bg-blue-500/10 border-blue-500 ring-2 ring-blue-400/50 shadow-sm"
                          : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={cn("p-1.5 rounded-lg mt-0.5", isSelected ? "bg-blue-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500")}>
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
                      {isSelected && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pin Toggle */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <Pin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {isVi ? "Ghim Footer cố định (Pin Dock)" : "Pin Footer Dock"}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {isVi ? "Giữ footer luôn hiển thị cố định ở chân trang" : "Keep dock always visible at bottom edge"}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  togglePin();
                  playClick();
                }}
                className={cn(
                  "w-11 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center",
                  footerConfig.isPinned !== false ? "bg-blue-600 dark:bg-blue-500 justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
                )}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                resetFooterConfig();
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
                setIsFooterModalOpen(false);
              }}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition cursor-pointer"
            >
              {isVi ? "Hoàn Tất" : "Done"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
