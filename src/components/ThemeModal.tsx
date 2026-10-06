import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Palette, 
  X, 
  Check, 
  Sparkles, 
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  Eye,
  LayoutGrid,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
  Monitor
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../i18n";
import { THEME_LIST } from "../data/themesData";
import SoftFloatingBentoVisualPreview from "./SoftFloatingBentoVisualPreview";

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme, resetTheme, themeMode, setThemeMode } = useTheme();
  const { lang } = useLanguage();
  const [showBentoPreview, setShowBentoPreview] = useState(true);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const activeThemeConfig = THEME_LIST.find((t) => t.id === theme) || THEME_LIST[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Semi-transparent Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Slide-out Side-Panel Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 h-full w-full max-w-md sm:max-w-lg z-10 bg-white/95 dark:bg-slate-900/95 border-l border-slate-200/80 dark:border-white/15 shadow-2xl flex flex-col backdrop-blur-2xl"
          >
            {/* Side-Panel Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-200/60 dark:border-white/10 shrink-0 bg-slate-50/50 dark:bg-slate-950/40">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-md shadow-blue-500/20 shrink-0">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                      {lang === "vi" ? "Chủ đề Giao diện" : "UI Themes Panel"}
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-3xs font-extrabold uppercase bg-indigo-500/10 dark:bg-cyan-500/10 text-indigo-600 dark:text-cyan-400 border border-indigo-500/20 dark:border-cyan-500/20">
                      {THEME_LIST.length} Themes
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {lang === "vi" 
                      ? "Chuyển đổi tức thì • Áp dụng data-theme & lưu localStorage" 
                      : "Instant switch • Applied via data-theme & saved in localStorage"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetTheme}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-3xs sm:text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/60 dark:border-white/10 transition-colors cursor-pointer"
                  title={lang === "vi" ? "Khôi phục mặc định" : "Reset default"}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{lang === "vi" ? "Khôi phục" : "Reset"}</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center justify-center w-8 h-8 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close side-panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Side-Panel Content Body */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-1 custom-scrollbar space-y-4">
              
              {/* Quick Light / Dark Mode Switcher */}
              <div className="p-3 rounded-2xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-2 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white flex items-center justify-center text-xs">
                    <Sun className="w-4 h-4 dark:hidden text-amber-300" />
                    <Moon className="w-4 h-4 hidden dark:block text-cyan-300" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-white block">
                      {lang === "vi" ? "Chế độ hiển thị" : "Display Mode"}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      {lang === "vi" ? "Giao diện Sáng / Tối" : "Light / Dark Interface"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 p-0.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-white/10 shadow-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setThemeMode("light");
                      setTheme("glass-light-multicolor");
                    }}
                    className={`px-2.5 py-1 rounded-lg text-2xs font-extrabold flex items-center gap-1 transition-all cursor-pointer ${
                      themeMode === "light" || theme === "glass-light-multicolor"
                        ? "bg-amber-500 text-white shadow-xs"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                    }`}
                  >
                    <Sun className="w-3 h-3" />
                    <span>{lang === "vi" ? "Sáng" : "Light"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setThemeMode("dark");
                      setTheme("glass-dark-neon");
                    }}
                    className={`px-2.5 py-1 rounded-lg text-2xs font-extrabold flex items-center gap-1 transition-all cursor-pointer ${
                      themeMode === "dark" || theme === "glass-dark-neon"
                        ? "bg-cyan-600 text-white shadow-xs"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                    }`}
                  >
                    <Moon className="w-3 h-3" />
                    <span>{lang === "vi" ? "Tối" : "Dark"}</span>
                  </button>
                </div>
              </div>

              {/* Soft Floating Bento Visual Preview Showcase Banner / Card */}
              <div className="rounded-3xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 p-3 sm:p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#5865E8] to-[#7C5CDB] text-white flex items-center justify-center shadow-xs">
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                        {lang === "vi" ? "Trực Quan Theme: Soft Floating Bento" : "Visual Preview: Soft Floating Bento"}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {lang === "vi" ? "Bố cục mẫu Bento Kính Mờ Nổi & Nền Pastel" : "Dummy Bento Layout with Soft Floating Cards"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {theme !== "soft-floating-bento" && (
                      <button
                        type="button"
                        onClick={() => setTheme("soft-floating-bento" as any)}
                        className="px-2.5 py-1 rounded-xl text-3xs font-extrabold bg-[#5865E8] text-white hover:bg-[#4752c4] shadow-xs transition-all cursor-pointer"
                      >
                        {lang === "vi" ? "Áp dụng" : "Apply"}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowBentoPreview(!showBentoPreview)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
                      title={showBentoPreview ? "Thu gọn preview" : "Mở rộng preview"}
                    >
                      {showBentoPreview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {showBentoPreview && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <SoftFloatingBentoVisualPreview showDetails={false} className="mt-1" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Section Title */}
              <div className="flex items-center justify-between text-3xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1 pt-1">
                <span>{lang === "vi" ? "Danh sách phong cách UI" : "Defined UI Themes"}</span>
                <span className="flex items-center gap-1 text-emerald-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>data-theme active</span>
                </span>
              </div>

              {/* Theme Cards Vertical Stack inside Side Panel */}
              <div className="space-y-3">
                {THEME_LIST.map((themeItem) => {
                  const isSelected = theme === themeItem.id;
                  const isBento = themeItem.id === "soft-floating-bento";

                  return (
                    <div
                      key={themeItem.id}
                      onClick={() => setTheme(themeItem.id as any)}
                      className={`group relative rounded-2xl p-3.5 transition-all duration-200 cursor-pointer border flex flex-col justify-between ${
                        isSelected
                          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white ring-2 ring-blue-500/50 shadow-xl scale-[1.01]"
                          : "bg-slate-50/80 dark:bg-white/5 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 shadow-xs"
                      }`}
                    >
                      {/* Active Indicator Badge */}
                      {isSelected && (
                        <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-3xs font-black uppercase tracking-wider flex items-center gap-1 shadow-md shadow-blue-600/30">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>{lang === "vi" ? "Đang chọn" : "Active"}</span>
                        </div>
                      )}

                      {/* Top Header info */}
                      <div className="flex items-start justify-between gap-2 pr-20">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-mono font-black ${isSelected ? "text-blue-400 dark:text-blue-600" : "text-slate-400 dark:text-slate-500"}`}>
                            {themeItem.num}
                          </span>
                          <h3 className="text-sm font-bold tracking-tight">
                            {lang === "vi" ? themeItem.nameVi : themeItem.name}
                          </h3>
                        </div>
                      </div>

                      <p className={`text-xs mt-1 mb-2.5 leading-relaxed ${
                        isSelected ? "text-slate-300 dark:text-slate-600" : "text-slate-500 dark:text-slate-400"
                      }`}>
                        {lang === "vi" ? themeItem.taglineVi : themeItem.tagline}
                      </p>

                      {/* Mini Layout Thumbnail Preview */}
                      {isBento ? (
                        <div className="mb-2">
                          <SoftFloatingBentoVisualPreview compact />
                        </div>
                      ) : (
                        <div 
                          className="w-full h-20 rounded-xl p-2 mb-2 flex flex-col justify-between border transition-all duration-200 overflow-hidden relative"
                          style={{ 
                            backgroundColor: themeItem.colors.background,
                            borderColor: themeItem.colors.border,
                          }}
                        >
                          {/* Mini Header Bar */}
                          <div 
                            className="w-full h-4 rounded px-1.5 flex items-center justify-between border shadow-2xs"
                            style={{ 
                              backgroundColor: themeItem.colors.surface,
                              borderColor: themeItem.colors.border
                            }}
                          >
                            <div className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeItem.colors.primary }} />
                              <span className="w-8 h-1 rounded-full" style={{ backgroundColor: themeItem.colors.textSecondary, opacity: 0.4 }} />
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-3 h-1 rounded-full" style={{ backgroundColor: themeItem.colors.secondary }} />
                              <span className="w-2 h-1 rounded-full" style={{ backgroundColor: themeItem.colors.accent }} />
                            </div>
                          </div>

                          {/* Mini Hero Grid */}
                          <div className="grid grid-cols-3 gap-1 flex-1 mt-1">
                            <div 
                              className="col-span-2 rounded p-1 flex flex-col justify-between border"
                              style={{ 
                                backgroundColor: themeItem.colors.surface,
                                borderColor: themeItem.colors.border
                              }}
                            >
                              <span className="block w-12 h-1.5 rounded" style={{ backgroundColor: themeItem.colors.text }} />
                              <span className="block w-8 h-1.5 rounded" style={{ backgroundColor: themeItem.colors.primary }} />
                            </div>
                            <div 
                              className="col-span-1 rounded p-1 flex flex-col justify-between border"
                              style={{ 
                                backgroundColor: themeItem.colors.surfaceSecondary,
                                borderColor: themeItem.colors.border
                              }}
                            >
                              <span className="block w-4 h-1 rounded" style={{ backgroundColor: themeItem.colors.accent }} />
                            </div>
                          </div>

                          {/* Theme Style Tag Pill */}
                          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider backdrop-blur-md bg-slate-950/70 text-white">
                            {themeItem.badge}
                          </div>
                        </div>
                      )}

                      {/* Swatches & Features Footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-white/10 text-3xs">
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full border border-white/60" style={{ backgroundColor: themeItem.colors.primary }} title="Primary" />
                          <span className="w-3 h-3 rounded-full border border-white/60" style={{ backgroundColor: themeItem.colors.secondary }} title="Secondary" />
                          <span className="w-3 h-3 rounded-full border border-white/60" style={{ backgroundColor: themeItem.colors.accent }} title="Accent" />
                          <span className="w-3 h-3 rounded-full border border-white/60" style={{ backgroundColor: themeItem.colors.background }} title="Background" />
                        </div>
                        <span className={`font-mono font-bold ${isSelected ? "text-blue-400 dark:text-blue-600" : "text-slate-400"}`}>
                          [data-theme="{themeItem.id}"]
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Status Guarantee Card */}
              <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/10 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                <div className="text-3xs text-slate-500 dark:text-slate-400">
                  <p className="font-bold text-slate-700 dark:text-slate-200">
                    {lang === "vi" ? "Lưu tự động vào LocalStorage" : "Auto-saved in LocalStorage"}
                  </p>
                  <p>{lang === "vi" ? "Thuộc tính data-theme tự đồng bộ khi tải lại trang." : "data-theme attribute automatically restores on reload."}</p>
                </div>
              </div>
            </div>

            {/* Side-Panel Footer */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 bg-slate-50/90 dark:bg-slate-950/90 border-t border-slate-200/60 dark:border-white/10 shrink-0">
              <div className="text-3xs text-slate-400 font-mono">
                Active: <span className="font-bold text-blue-500 dark:text-cyan-400">{activeThemeConfig.name}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:opacity-90 active:scale-98 transition-all cursor-pointer shadow-md"
              >
                {lang === "vi" ? "Đóng bảng chọn" : "Close Panel"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ThemeModal;
