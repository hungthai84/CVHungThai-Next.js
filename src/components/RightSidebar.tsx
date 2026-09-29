import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Bot, 
  Volume2, 
  VolumeX, 
  Printer, 
  Sliders, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  Clock, 
  HeartHandshake, 
  ExternalLink,
  Zap,
  Globe,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { useSound } from "../context/SoundContext";
import { cn } from "../lib/utils";
import { playUiSound } from "../lib/sound";

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
  onPrev?: () => void;
  onNext?: () => void;
  isHeaderSlidUp?: boolean;
  isFooterSlidDown?: boolean;
}

export default function RightSidebar({ 
  isOpen, 
  onClose, 
  onNavigate, 
  onPrev, 
  onNext,
  isHeaderSlidUp = false,
  isFooterSlidDown = false 
}: RightSidebarProps) {
  const { lang, setLang } = useLanguage();
  const isVi = lang === "vi";
  const { theme, setTheme } = useTheme();
  const { soundConfig, toggleMute } = useSound();

  const handleOpenAIAssistant = () => {
    window.dispatchEvent(new CustomEvent('open-ai-assistant'));
    const btn = document.getElementById("btn-open-ai-assistant");
    if (btn) btn.click();
    onClose();
  };

  const handleExportPDF = () => {
    window.dispatchEvent(new CustomEvent("open-resume-export"));
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden"
          />

          {/* Sidebar Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className={cn(
              "fixed z-50 flex flex-col flex-grow shadow-2xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isHeaderSlidUp ? "top-[24px]" : "top-[70px] sm:top-[74px]",
              isFooterSlidDown ? "bottom-[24px]" : "bottom-[70px] sm:bottom-[74px]",
              "bg-white/80 dark:bg-slate-900/80 border-y border-l border-slate-200/90 dark:border-white/15 border-r-0 text-slate-800 dark:text-slate-100 backdrop-blur-2xl shadow-[0_10px_35px_0_rgba(31,38,135,0.12)] dark:shadow-[0_10px_35px_0_rgba(0,0,0,0.4)]"
            )}
            style={{
              right: 0,
              left: "calc(min(100vw - 16px, 50vw + 640px) + 10px)",
              borderTopLeftRadius: "var(--theme-radius-card, 16px)",
              borderBottomLeftRadius: "var(--theme-radius-card, 16px)",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px"
            }}
          >
            {/* Header section matching Header capsule bar */}
            <div className="flex items-center justify-between p-3.5 border-b border-slate-200/90 dark:border-white/15 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center ring-2 ring-purple-500/30">
                  <Activity className="w-4 h-4 animate-pulse" />
                </div>
                <span className="text-xs font-black font-play tracking-tight">
                  {isVi ? "Bảng điều khiển nhanh" : "Quick Utility Hub"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  onClose();
                }}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shadow-2xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 flex-grow overflow-y-auto no-scrollbar p-4 space-y-4 text-left">
              
              {/* Quick Slide Navigation Buttons Bar */}
              <div className="space-y-2">
                <span className="text-3xs font-black uppercase tracking-widest text-slate-400 font-mono">
                  {isVi ? "Điều hướng slide" : "Slide Navigation"}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      onPrev?.();
                    }}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bento-sidebar-btn text-slate-700 dark:text-slate-200 text-3xs font-extrabold cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span>{isVi ? "Slide trước" : "Prev Slide"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      onNext?.();
                    }}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bento-sidebar-btn text-slate-700 dark:text-slate-200 text-3xs font-extrabold cursor-pointer"
                  >
                    <span>{isVi ? "Slide sau" : "Next Slide"}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  </button>
                </div>
              </div>
              
              {/* 1. Quick AI & PDF Actions */}
              <div className="space-y-2">
                <span className="text-3xs font-black uppercase tracking-widest text-slate-400 font-mono">
                  {isVi ? "Tác vụ thông minh" : "Smart Actions"}
                </span>
                
                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={handleOpenAIAssistant}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-700 dark:text-purple-300 font-extrabold text-xs transition-all cursor-pointer shadow-2xs group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-md shrink-0">
                      <Bot className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="truncate">{isVi ? "Trò chuyện Trợ lý AI" : "AI Assistant Chat"}</span>
                      <span className="text-3xs text-slate-500 dark:text-slate-400 font-normal">
                        {isVi ? "Hỏi đáp & hỗ trợ 24/7" : "Interactive Copilot"}
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportPDF}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-700 dark:text-rose-300 font-extrabold text-xs transition-all cursor-pointer shadow-2xs group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center shadow-md shrink-0">
                      <Printer className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="truncate">{isVi ? "Xuất Hồ sơ PDF Bento" : "Export Resume PDF"}</span>
                      <span className="text-3xs text-slate-500 dark:text-slate-400 font-normal">
                        {isVi ? "Tải xuống tài liệu CV" : "Download CV format"}
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* 2. Audio & Language Settings */}
              <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-white/10">
                <span className="text-3xs font-black uppercase tracking-widest text-slate-400 font-mono">
                  {isVi ? "Cài đặt & Tiện ích" : "Settings & Utilities"}
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {/* Language Toggle */}
                  <button
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      setLang(isVi ? "en" : "vi");
                    }}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Globe className="w-4 h-4 mb-1 text-blue-500" />
                    <span>{isVi ? "Tiếng Việt" : "English"}</span>
                  </button>

                  {/* Sound Toggle */}
                  <button
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      toggleMute();
                    }}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    {soundConfig.isMuted ? (
                      <VolumeX className="w-4 h-4 mb-1 text-rose-500" />
                    ) : (
                      <Volume2 className="w-4 h-4 mb-1 text-emerald-500" />
                    )}
                    <span>{soundConfig.isMuted ? (isVi ? "Đã tắt âm" : "Muted") : (isVi ? "Âm thanh Bật" : "Sound On")}</span>
                  </button>
                </div>
              </div>

              {/* 3. System Status Widget */}
              <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-white/10">
                <span className="text-3xs font-black uppercase tracking-widest text-slate-400 font-mono">
                  {isVi ? "Trạng thái hệ thống" : "System Status"}
                </span>
                
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-2xs">
                    <span className="text-slate-500">{isVi ? "Môi trường" : "Environment"}</span>
                    <span className="font-mono font-bold text-emerald-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Online 99.9%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-2xs">
                    <span className="text-slate-500">{isVi ? "Giao diện" : "UI Theme"}</span>
                    <span className="font-bold text-indigo-500 uppercase">{theme}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200/60 dark:border-white/10 shrink-0 bg-slate-50/50 dark:bg-slate-950/50 text-center">
              <button
                type="button"
                onClick={() => {
                  onNavigate("customization");
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{isVi ? "Mở tùy chỉnh nâng cao" : "Open Customization"}</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
