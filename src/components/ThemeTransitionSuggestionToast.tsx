import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Sparkles, X, Check, Compass, Clock, Sliders, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../i18n";
import { cn } from "../lib/utils";

export const ThemeTransitionSuggestionToast: React.FC = () => {
  const { 
    theme, 
    setTheme, 
    autoThemeMode, 
    setAutoThemeMode, 
    themeSuggestion, 
    dismissThemeSuggestion, 
    solarInfo,
    requestLocationAccess
  } = useTheme();
  
  const { lang } = useLanguage();
  const isVi = lang === "vi";
  const [isDismissedPermanentlyForSession, setIsDismissedPermanentlyForSession] = useState(false);

  if (autoThemeMode || !themeSuggestion || isDismissedPermanentlyForSession) {
    return null;
  }

  const isTargetDay = themeSuggestion.period === "day";

  const handleApplyNow = () => {
    setTheme(themeSuggestion.targetTheme);
    dismissThemeSuggestion();
  };

  const handleEnableAuto = () => {
    setAutoThemeMode(true);
    dismissThemeSuggestion();
  };

  const handleDismiss = () => {
    setIsDismissedPermanentlyForSession(true);
    dismissThemeSuggestion();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-20 left-4 sm:left-6 z-[80] max-w-sm sm:max-w-md w-[calc(100vw-32px)] sm:w-auto select-none pointer-events-auto"
      >
        <div 
          className={cn(
            "p-4 rounded-2xl md:rounded-3xl border shadow-2xl backdrop-blur-2xl transition-all duration-300",
            theme === "glass-dark-neon"
              ? "bg-slate-950/90 border-cyan-500/30 text-white shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(0,240,255,0.2)]"
              : "bg-white/95 border-amber-300/60 text-slate-900 shadow-[0_15px_40px_rgba(0,0,0,0.12)]"
          )}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-slate-200/50 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <div 
                className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                  isTargetDay
                    ? "bg-amber-500/15 text-amber-500 border border-amber-400/30"
                    : "bg-cyan-500/15 text-cyan-400 border border-cyan-400/30"
                )}
              >
                {isTargetDay ? <Sun className="w-4.5 h-4.5 animate-spin-slow" /> : <Moon className="w-4.5 h-4.5" />}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black tracking-tight leading-snug">
                  {isVi ? themeSuggestion.titleVi : themeSuggestion.titleEn}
                </h4>
                <div className="flex items-center gap-1.5 text-3xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  <Clock className="w-3 h-3" />
                  <span>
                    {solarInfo.source === "geolocation"
                      ? (isVi ? "Theo tọa độ thực tế" : "Based on GPS Solar")
                      : (isVi ? "Theo giờ hệ điều hành" : "Based on OS Time")}
                    {` • ${isTargetDay ? `Bình minh: ${themeSuggestion.sunriseTimeStr}` : `Hoàng hôn: ${themeSuggestion.sunsetTimeStr}`}`}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDismiss}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              title={isVi ? "Đóng" : "Close"}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <p className="text-2xs sm:text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
            {isVi ? themeSuggestion.messageVi : themeSuggestion.messageEn}
          </p>

          {/* Action buttons */}
          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleApplyNow}
              className={cn(
                "flex-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95",
                isTargetDay
                  ? "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/30"
                  : "bg-cyan-500 hover:bg-cyan-600 text-slate-950 shadow-cyan-500/30 font-black"
              )}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isVi ? "Chuyển ngay" : "Switch Now"}</span>
            </button>

            <button
              type="button"
              onClick={handleEnableAuto}
              className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-300/80 dark:border-white/20 bg-slate-100/80 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-slate-100 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
              title={isVi ? "Tự động đổi theo giờ mặt trời" : "Auto-switch based on solar cycle"}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isVi ? "Bật Auto" : "Enable Auto"}</span>
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
            >
              {isVi ? "Để sau" : "Later"}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeTransitionSuggestionToast;
