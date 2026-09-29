import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  PanelBottom, 
  Clock, 
  CloudSun, 
  Pin, 
  ChevronDown, 
  RotateCcw,
  Check
} from "lucide-react";
import { useLanguage } from "../i18n";
import { useFooter } from "../context/FooterContext";
import { FOOTER_PLACEMENT_OPTIONS } from "../data/footerData";
import { cn } from "../lib/utils";

export function FooterSettingsModal() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  const {
    footerConfig,
    resetFooterConfig,
    togglePin,
    setPlacement,
    toggleElementVisibility,
    isFooterModalOpen,
    setIsFooterModalOpen,
    footerRadiusTopLeft,
    setFooterRadiusTopLeft,
    footerRadiusTopRight,
    setFooterRadiusTopRight
  } = useFooter();

  if (!isFooterModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 select-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsFooterModalOpen(false)}
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 p-5 sm:p-6 shadow-2xl z-10 flex flex-col gap-4 text-slate-800 dark:text-slate-100 rounded-3xl overflow-hidden font-play"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-blue-600/10 dark:bg-cyan-400/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                <PanelBottom className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                  {isVi ? "Cấu hình thanh chân trang (Footer Dock)" : "Footer Dock Settings"}
                </h3>
                <p className="text-2xs text-slate-500 dark:text-slate-400">
                  {isVi ? "Tùy chỉnh vị trí ghim, độ bo cong và widget hiển thị" : "Configure dock placement, curvature and widget toggles"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetFooterConfig}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                title={isVi ? "Khôi phục mặc định" : "Reset defaults"}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsFooterModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Placement Grid */}
          <div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
              {isVi ? "Kiểu dáng & Vị trí hiển thị:" : "Placement Mode:"}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {FOOTER_PLACEMENT_OPTIONS.map((opt) => {
                const isActive = footerConfig.placement === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPlacement(opt.id)}
                    className={cn(
                      "p-3 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer",
                      isActive
                        ? "bg-blue-600/10 border-blue-600 text-blue-600 dark:text-cyan-400 font-bold"
                        : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{isVi ? opt.nameVi : opt.nameEn}</span>
                      {isActive && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />}
                    </div>
                    <span className="text-3xs text-slate-500 dark:text-slate-400 mt-1">{isVi ? opt.descVi : opt.descEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Curvature Sliders */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
            <div>
              <div className="flex justify-between items-center text-xs font-bold mb-1">
                <span>{isVi ? "Góc trên trái:" : "Top-Left Radius:"}</span>
                <span className="font-mono text-blue-600 dark:text-cyan-400">{footerRadiusTopLeft}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                value={footerRadiusTopLeft}
                onChange={(e) => setFooterRadiusTopLeft(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-cyan-400"
              />
            </div>
            <div>
              <div className="flex justify-between items-center text-xs font-bold mb-1">
                <span>{isVi ? "Góc trên phải:" : "Top-Right Radius:"}</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{footerRadiusTopRight}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                value={footerRadiusTopRight}
                onChange={(e) => setFooterRadiusTopRight(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400"
              />
            </div>
          </div>

          {/* Widget Toggles */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              {isVi ? "Thành phần hiển thị:" : "Widget Toggles:"}
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { key: "isPinned" as const, label: isVi ? "Ghim cố định" : "Pin Footer", icon: Pin, val: footerConfig.isPinned !== false, toggle: togglePin },
                { key: "showClock" as const, label: isVi ? "Đồng hồ" : "Clock Widget", icon: Clock, val: footerConfig.showClock, toggle: () => toggleElementVisibility("showClock") },
                { key: "showWeather" as const, label: isVi ? "Thời tiết" : "Weather Widget", icon: CloudSun, val: footerConfig.showWeather, toggle: () => toggleElementVisibility("showWeather") },
                { key: "showNextPageButton" as const, label: isVi ? "Chuyển trang" : "Next Page Btn", icon: ChevronDown, val: footerConfig.showNextPageButton, toggle: () => toggleElementVisibility("showNextPageButton") },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={item.toggle}
                  className={cn(
                    "p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all",
                    item.val
                      ? "bg-blue-600/10 border-blue-600 text-blue-600 dark:text-cyan-400 font-bold"
                      : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </div>
                  {item.val && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsFooterModalOpen(false)}
              className="w-full py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-md cursor-pointer"
            >
              {isVi ? "Hoàn tất cài đặt" : "Save Settings"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default FooterSettingsModal;
