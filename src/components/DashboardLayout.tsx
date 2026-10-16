import React, { useState, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bot, 
  ChevronLeft, 
  ChevronRight, 
  Globe, 
  Printer, 
  Palette, 
  Sliders, 
  Image as ImageIcon, 
  Sparkles,
  LayoutGrid,
  Menu,
  X,
  Compass,
  Briefcase,
  Brain,
  GraduationCap,
  ClipboardList,
  Video,
  Layers,
  Phone,
  BookOpen,
  Calendar,
  Settings,
  Flame,
  CheckCircle2,
  FileText
} from "lucide-react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { useLayout } from "../context/LayoutContext";
import { cn, getUnifiedSurfaceStyle } from "../lib/utils";
import { playUiSound } from "../lib/sound";
import FooterWeather from "./FooterWeather";
import { SECTIONS, SectionItem } from "../data/sections";

interface DashboardLayoutProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  CurrentComponent?: React.ComponentType;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  activeSection,
  onNavigate,
  CurrentComponent,
}) => {
  const { lang, setLang } = useLanguage();
  const { theme, setThemeMode, themeMode, openThemeModal } = useTheme();
  const toggleThemeMode = () => setThemeMode("light");
  const { setLayoutMode } = useLayout();
  const isVi = lang === "vi";

  // Mobile sidebars toggles
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isLayoutMenuOpen, setIsLayoutMenuOpen] = useState(false);

  // Time / Date strings for weather widget
  const [currentTime, setCurrentTime] = useState(() => new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString(isVi ? "vi-VN" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const dateString = currentTime.toLocaleDateString(isVi ? "vi-VN" : "en-US", {
    weekday: "short",
    day: "numeric",
    month: "numeric",
  });

  const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
  const currentSection = SECTIONS[currentIndex] || SECTIONS[0];
  const ComponentToRender = CurrentComponent || currentSection.Component;

  const handlePrevPage = () => {
    try { playUiSound("click"); } catch {}
    const prevIdx = (currentIndex - 1 + SECTIONS.length) % SECTIONS.length;
    onNavigate(SECTIONS[prevIdx].id);
  };

  const handleNextPage = () => {
    try { playUiSound("click"); } catch {}
    const nextIdx = (currentIndex + 1) % SECTIONS.length;
    onNavigate(SECTIONS[nextIdx].id);
  };

  const handleOpenAi = () => {
    try { playUiSound("click"); } catch {}
    window.dispatchEvent(new CustomEvent("open-ai-assistant"));
  };

  const handleOpenColorSystem = () => {
    try { playUiSound("click"); } catch {}
    window.dispatchEvent(new CustomEvent("open-color-system"));
  };

  const handleOpenWallpaper = () => {
    try { playUiSound("click"); } catch {}
    onNavigate("wallpapers");
  };

  const handleOpenSettings = () => {
    try { playUiSound("click"); } catch {}
    window.dispatchEvent(new CustomEvent("open-footer-settings"));
  };

  const handleOpenResumeExport = () => {
    try { playUiSound("click"); } catch {}
    window.dispatchEvent(new CustomEvent("open-resume-export"));
  };

  return (
    <div className="w-full h-screen h-dvh max-w-[1530px] mx-auto p-3 sm:p-6 md:p-[45px] box-border relative z-20 flex flex-col justify-center">
      {/* THẺ CHÍNH BAO BỌC CHUNG: Bo tròn 4 góc, padding 1px, 3 khu vực bám sát nhau */}
      <div 
        className={cn(
          "w-full h-full rounded-[22px] p-[1px] flex flex-row items-stretch overflow-hidden relative box-border backdrop-blur-2xl border transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(0,229,255,0.12)]",
          getUnifiedSurfaceStyle(theme)
        )}
        style={{
          borderRadius: "var(--theme-radius-card, 22px)",
          boxSizing: "border-box"
        }}
      >
        {/* ========================================================================= */}
        {/* 1. SIDEBAR TRÁI: Đưa toàn bộ chức năng & điều hướng của Header xuống đây    */}
        {/* ========================================================================= */}
        <aside 
          className={cn(
            "w-[240px] lg:w-[255px] h-full shrink-0 flex flex-col justify-between p-3.5 border-r border-white/20 dark:border-white/10 bg-white/40 dark:bg-[#070b18]/65 backdrop-blur-xl relative z-30 transition-all duration-300 box-border overflow-hidden",
            "hidden md:flex"
          )}
        >
          {/* Top: Avatar Hùng Thái to lấp đầy, online badge & title */}
          <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 shrink-0">
            <a 
              href="#home"
              onClick={(e) => { e.preventDefault(); onNavigate("home"); }}
              className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-brand-primary/80 shadow-md group cursor-pointer block"
              title="Nguyễn Hùng Thái - Trang Chủ"
            >
              <img 
                src="https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif"
                alt="Hùng Thái Avatar"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
            </a>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs font-black text-slate-900 dark:text-white truncate font-play">
                Nguyễn Hùng Thái
              </h3>
              <p className="text-[10px] text-cyan-700 dark:text-cyan-400 font-semibold truncate">
                {isVi ? "Giám Đốc CX / CS" : "CX & CS Director"}
              </p>
              <span className="inline-flex items-center gap-1 text-[9px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </span>
            </div>
          </div>

          {/* Middle: 14 mục điều hướng Header với Icon, Label, Active State */}
          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar py-2.5 my-1.5 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 block">
              {isVi ? "Điều Hướng Hồ Sơ" : "Navigation"}
            </span>
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              const Icon = sec.Icon;
              const label = isVi ? sec.labelVi : sec.labelEn;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => {
                    try { playUiSound("click"); } catch {}
                    onNavigate(sec.id);
                  }}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold transition-all duration-200 cursor-pointer group relative overflow-hidden",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md font-black translate-x-1"
                      : "text-slate-700 dark:text-slate-200 hover:bg-white/60 dark:hover:bg-white/10 hover:text-blue-600 dark:hover:text-cyan-300"
                  )}
                  title={label}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                    isActive ? "text-white" : "text-blue-600 dark:text-cyan-400"
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="truncate flex-1">{label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom: Nút Trợ lý AI Assistant (từ Header bên phải) */}
          <div className="shrink-0 pt-2 border-t border-white/20 dark:border-white/10">
            <button
              type="button"
              onClick={handleOpenAi}
              className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-cyan-500/20 hover:from-purple-600/35 hover:to-cyan-500/35 border border-purple-400/40 text-purple-700 dark:text-cyan-300 transition-all cursor-pointer shadow-sm group"
              title={isVi ? "Mở Trợ lý AI Hỗ trợ & Hỏi đáp hồ sơ" : "Open AI Assistant"}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Bot className="w-4 h-4 animate-pulse" />
                </div>
                <div className="text-left min-w-0">
                  <h4 className="text-xs font-bold leading-tight truncate">
                    {isVi ? "Trợ Lý AI Thái" : "AI Assistant"}
                  </h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight block">
                    {isVi ? "Hỏi đáp hồ sơ 24/7" : "Ask questions"}
                  </span>
                </div>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* 2. CENTER CARD: Vùng nội dung chính, co giãn tối đa, cuộn độc lập          */}
        {/* ========================================================================= */}
        <main className="flex-1 min-w-0 h-full flex flex-col overflow-hidden relative z-10 box-border bg-white/20 dark:bg-black/15">
          {/* Mobile Top Bar (Khi ở tablet/mobile: nút mở Sidebar trái & phải) */}
          <div className="md:hidden flex items-center justify-between px-3 py-2 border-b border-white/15 bg-white/40 dark:bg-[#070b18]/60 backdrop-blur-xl shrink-0">
            <button
              type="button"
              onClick={() => setIsLeftSidebarOpen(true)}
              className="p-1.5 rounded-xl bg-white/50 dark:bg-white/10 text-slate-800 dark:text-white border border-white/20 flex items-center gap-1.5 text-xs font-bold"
            >
              <Menu className="w-4 h-4 text-blue-500" />
              <span>{isVi ? "Menu" : "Nav"}</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black font-play text-slate-900 dark:text-white">
                {isVi ? currentSection.labelVi : currentSection.labelEn}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsRightSidebarOpen(true)}
              className="p-1.5 rounded-xl bg-white/50 dark:bg-white/10 text-slate-800 dark:text-white border border-white/20 flex items-center gap-1.5 text-xs font-bold"
            >
              <Sliders className="w-4 h-4 text-cyan-500" />
              <span>{isVi ? "Tiện ích" : "Tools"}</span>
            </button>
          </div>

          {/* Vùng hiển thị Component Section (cuộn độc lập khi nội dung dài) */}
          <div className="flex-1 w-full h-full min-h-0 overflow-y-auto no-scrollbar scroll-smooth p-2.5 sm:p-5 text-left box-border">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-full min-h-full"
              >
                <Suspense fallback={null}>
                  <ComponentToRender />
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ========================================================================= */}
          {/* DASHBOARD BOTTOM CONTROL DOCK: 40% Thời tiết | 40% Tiện ích | 20% Lùi/Tới  */}
          {/* ========================================================================= */}
          <div className="w-full h-[58px] sm:h-[64px] border-t border-white/20 dark:border-white/10 bg-white/40 dark:bg-[#070b18]/75 backdrop-blur-2xl px-2 sm:px-4 py-1.5 flex flex-row items-center justify-between gap-2 shrink-0 z-30 overflow-hidden select-none box-border">
            {/* 1. BÊN TRÁI: 40% chiều dài chứa Card thời tiết co giãn full khu vực */}
            <div className="basis-[40%] w-[40%] min-w-0 h-full flex items-center justify-start overflow-hidden shrink-0">
              <div className="w-full h-full flex items-center overflow-hidden">
                <FooterWeather layoutMode="vertical" timeString={timeString} dateString={dateString} />
              </div>
            </div>

            {/* 2. CHÍNH GIỮA: 40% chiều dài chứa Nút tiện ích */}
            <div className="basis-[40%] w-[40%] min-w-0 h-full flex items-center justify-center gap-1 sm:gap-1.5 shrink-0 overflow-x-auto no-scrollbar py-0.5">
              {/* In PDF */}
              <button
                type="button"
                onClick={handleOpenResumeExport}
                className="group/btn relative h-8 sm:h-8.5 px-2 sm:px-2.5 rounded-[999px] flex items-center gap-1 border backdrop-blur-md bg-rose-500/20 dark:bg-rose-500/25 border-rose-400/40 text-rose-700 dark:text-rose-200 text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer shadow-xs hover:scale-105 shrink-0"
                title={isVi ? "In PDF & Xuất hồ sơ" : "Print & Export Resume"}
              >
                <Printer className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{isVi ? "In PDF" : "PDF"}</span>
              </button>

              {/* Ngôn ngữ */}
              <button
                type="button"
                onClick={() => {
                  try { playUiSound("click"); } catch {}
                  setLang(isVi ? "en" : "vi");
                }}
                className="group/btn relative h-8 sm:h-8.5 px-2 sm:px-2.5 rounded-[999px] flex items-center gap-1 border backdrop-blur-md bg-emerald-500/20 dark:bg-emerald-500/25 border-emerald-400/40 text-emerald-700 dark:text-emerald-200 text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer shadow-xs hover:scale-105 shrink-0"
                title={isVi ? "Đổi ngôn ngữ" : "Language"}
              >
                <Globe className="w-3.5 h-3.5 shrink-0" />
                <span className="uppercase font-mono text-[9px] sm:text-[10px]">{lang}</span>
              </button>

              {/* Giao diện Theme */}
              <button
                type="button"
                onClick={() => {
                  try { playUiSound("click"); } catch {}
                  openThemeModal();
                }}
                className="group/btn relative h-8 sm:h-8.5 px-2 sm:px-2.5 rounded-[999px] flex items-center gap-1 border backdrop-blur-md bg-indigo-500/20 dark:bg-indigo-500/25 border-indigo-400/40 text-indigo-700 dark:text-indigo-200 text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer shadow-xs hover:scale-105 shrink-0"
                title={isVi ? "Chọn Giao diện Theme" : "Theme Switcher"}
              >
                <Palette className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{isVi ? "Theme" : "Theme"}</span>
              </button>

              {/* Bố cục Layout */}
              <button
                type="button"
                onClick={() => setIsLayoutMenuOpen((prev) => !prev)}
                className="group/btn relative h-8 sm:h-8.5 px-2 sm:px-2.5 rounded-[999px] flex items-center gap-1 border backdrop-blur-md bg-purple-500/20 dark:bg-purple-500/25 border-purple-400/40 text-purple-700 dark:text-purple-200 text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer shadow-xs hover:scale-105 shrink-0"
                title={isVi ? "Đổi bố cục website" : "Layout Modes"}
              >
                <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{isVi ? "Bố Cục" : "Layout"}</span>
              </button>

              {/* Bảng màu Colors */}
              <button
                type="button"
                onClick={handleOpenColorSystem}
                className="group/btn relative h-8 sm:h-8.5 px-2 sm:px-2.5 rounded-[999px] flex items-center gap-1 border backdrop-blur-md bg-amber-500/20 dark:bg-amber-500/25 border-amber-400/40 text-amber-700 dark:text-amber-200 text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer shadow-xs hover:scale-105 shrink-0"
                title={isVi ? "Bảng màu" : "Colors"}
              >
                <Flame className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{isVi ? "Màu" : "Color"}</span>
              </button>

              {/* Hình nền Wallpaper */}
              <button
                type="button"
                onClick={handleOpenWallpaper}
                className="group/btn relative h-8 sm:h-8.5 px-2 sm:px-2.5 rounded-[999px] flex items-center gap-1 border backdrop-blur-md bg-teal-500/20 dark:bg-teal-500/25 border-teal-400/40 text-teal-700 dark:text-teal-200 text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer shadow-xs hover:scale-105 shrink-0"
                title={isVi ? "Hình nền" : "Wallpapers"}
              >
                <ImageIcon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{isVi ? "Nền" : "Wall"}</span>
              </button>

              {/* Cài đặt Settings */}
              <button
                type="button"
                onClick={handleOpenSettings}
                className="group/btn relative h-8 sm:h-8.5 px-2 sm:px-2.5 rounded-[999px] flex items-center gap-1 border backdrop-blur-md bg-slate-500/20 dark:bg-slate-500/25 border-slate-400/40 text-slate-700 dark:text-slate-200 text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer shadow-xs hover:scale-105 shrink-0"
                title={isVi ? "Cài đặt" : "Settings"}
              >
                <Settings className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{isVi ? "Cài Đặt" : "Set"}</span>
              </button>
            </div>

            {/* 3. BÊN PHẢI: 20% chiều dài chứa nút tới và lùi trang */}
            <div className="basis-[20%] w-[20%] min-w-0 h-full flex items-center justify-end gap-1 sm:gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handlePrevPage}
                className="h-8 sm:h-8.5 px-2 sm:px-2.5 rounded-[999px] bg-sky-500/20 hover:bg-sky-500/35 text-sky-700 dark:text-sky-300 border border-sky-400/40 text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
                title={isVi ? "Trang trước" : "Previous page"}
              >
                <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden lg:inline text-[11px]">{isVi ? "Lùi" : "Prev"}</span>
              </button>

              <div className="px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-400/30 text-[10px] font-mono font-bold shrink-0">
                #{currentIndex + 1}
              </div>

              <button
                type="button"
                onClick={handleNextPage}
                className="h-8 sm:h-8.5 px-2 sm:px-2.5 rounded-[999px] bg-blue-500/20 hover:bg-blue-500/35 text-blue-700 dark:text-blue-300 border border-blue-400/40 text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
                title={isVi ? "Trang tiếp theo" : "Next page"}
              >
                <span className="hidden lg:inline text-[11px]">{isVi ? "Tới" : "Next"}</span>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>
          </div>
        </main>

        {/* ========================================================================= */}
        {/* 3. SIDEBAR PHẢI: Chứa toàn bộ nội dung & tiện ích của Footer                */}
        {/* ========================================================================= */}
        <aside 
          className={cn(
            "w-[245px] lg:w-[260px] h-full shrink-0 flex flex-col justify-between p-3.5 border-l border-white/20 dark:border-white/10 bg-white/40 dark:bg-[#070b18]/65 backdrop-blur-xl relative z-30 transition-all duration-300 box-border overflow-hidden",
            "hidden md:flex"
          )}
        >
          {/* Top: Avatar Hùng Thái + Thời tiết & Đồng hồ thời gian thực */}
          <div className="p-2.5 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <img 
                src="https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif"
                alt="Avatar GIF"
                className="w-8 h-8 rounded-full object-cover border border-cyan-400/50 shadow-sm shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0">
                <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 block leading-tight">
                  {isVi ? "Thời Tiết & Giờ" : "Clock & Weather"}
                </span>
                <span className="text-xs font-mono font-black text-cyan-600 dark:text-cyan-300 block leading-tight">
                  {timeString}
                </span>
              </div>
            </div>
            <div className="overflow-hidden">
              <FooterWeather layoutMode="vertical" timeString={timeString} dateString={dateString} />
            </div>
          </div>

          {/* Middle: Cụm nút điều hướng trang (Lùi, Hiện tại, Tới) */}
          <div className="my-2 p-2.5 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 shrink-0">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
              {isVi ? "Chuyển Đổi Trang" : "Page Navigation"}
            </span>
            <div className="flex items-center justify-between gap-1.5">
              <button
                type="button"
                onClick={handlePrevPage}
                className="flex-1 py-1.5 px-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/30 text-sky-700 dark:text-sky-300 border border-sky-400/30 text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
                title={isVi ? "Lùi trang" : "Prev Page"}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>{isVi ? "Lùi" : "Prev"}</span>
              </button>
              <div className="px-2 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-400/30 text-[11px] font-mono font-bold shrink-0">
                #{currentIndex + 1} / {SECTIONS.length}
              </div>
              <button
                type="button"
                onClick={handleNextPage}
                className="flex-1 py-1.5 px-2 rounded-xl bg-blue-500/15 hover:bg-blue-500/30 text-blue-700 dark:text-blue-300 border border-blue-400/30 text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
                title={isVi ? "Tới trang" : "Next Page"}
              >
                <span>{isVi ? "Tới" : "Next"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom: Tiện ích từ Footer (In PDF, Ngôn ngữ, Theme, Layout, Color, Wallpaper, Cài đặt) */}
          <div className="space-y-1.5 shrink-0 pt-2 border-t border-white/20 dark:border-white/10">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1 block">
              {isVi ? "Hộp Tiện Ích" : "Utility Dock"}
            </span>

            {/* In PDF */}
            <button
              type="button"
              onClick={handleOpenResumeExport}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/30 text-rose-700 dark:text-rose-300 text-xs font-bold transition-all cursor-pointer"
              title={isVi ? "In PDF & Xuất hồ sơ" : "Print & Export Resume"}
            >
              <div className="flex items-center gap-2">
                <Printer className="w-3.5 h-3.5" />
                <span>{isVi ? "In PDF Hồ Sơ" : "Print PDF"}</span>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase">A4</span>
            </button>

            {/* Ngôn ngữ */}
            <button
              type="button"
              onClick={() => {
                try { playUiSound("click"); } catch {}
                setLang(isVi ? "en" : "vi");
              }}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition-all cursor-pointer"
              title={isVi ? "Đổi ngôn ngữ" : "Switch Language"}
            >
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" />
                <span>{isVi ? "Ngôn Ngữ" : "Language"}</span>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-white/40 dark:bg-black/30">
                {lang.toUpperCase()}
              </span>
            </button>

            {/* Giao diện Theme */}
            <button
              type="button"
              onClick={() => {
                try { playUiSound("click"); } catch {}
                openThemeModal();
              }}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-400/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-all cursor-pointer"
              title={isVi ? "Chọn Giao diện Theme" : "Theme Switcher"}
            >
              <div className="flex items-center gap-2">
                <Palette className="w-3.5 h-3.5" />
                <span>{isVi ? "Giao Diện Theme" : "Themes"}</span>
              </div>
              <Sparkles className="w-3 h-3 text-cyan-400" />
            </button>

            {/* Đổi Bố Cục (Layout Switcher) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLayoutMenuOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/30 text-purple-700 dark:text-purple-300 text-xs font-bold transition-all cursor-pointer"
                title={isVi ? "Đổi bố cục website" : "Layout Modes"}
              >
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>{isVi ? "Bố Cục (Dashboard)" : "Layout"}</span>
                </div>
                <span className="text-[10px] font-mono text-purple-600 dark:text-purple-300">5 Modes</span>
              </button>

              {/* Popover Bố cục nhanh */}
              {isLayoutMenuOpen && (
                <div 
                  className="absolute bottom-full mb-2 right-0 w-[230px] rounded-2xl bg-white/95 dark:bg-[#0c101d]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/15 p-2 shadow-2xl z-50 text-left space-y-1"
                >
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 px-2 block">
                    {isVi ? "Chọn 5 Bố Cục:" : "Choose 5 Layouts:"}
                  </span>
                  <button
                    type="button"
                    onClick={() => { setLayoutMode("card-page"); setIsLayoutMenuOpen(false); }}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-500/15 text-slate-800 dark:text-white flex items-center justify-between"
                  >
                    <span>1. Card Page</span>
                    <span className="text-[9px] text-blue-500">{isVi ? "Mặc định" : "Default"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLayoutMode("dashboard"); setIsLayoutMenuOpen(false); }}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-bold bg-purple-500/20 text-purple-600 dark:text-purple-300 flex items-center justify-between"
                  >
                    <span>2. Dashboard</span>
                    <CheckCircle2 className="w-3 h-3 text-purple-500" />
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLayoutMode("slide-stack"); setIsLayoutMenuOpen(false); }}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-500/15 text-slate-800 dark:text-white"
                  >
                    3. Slide Stack
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLayoutMode("landing"); setIsLayoutMenuOpen(false); }}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-500/15 text-slate-800 dark:text-white"
                  >
                    4. Landing Page
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLayoutMode("bento-pinterest"); setIsLayoutMenuOpen(false); }}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-500/15 text-slate-800 dark:text-white"
                  >
                    5. Bento Pinterest
                  </button>
                </div>
              )}
            </div>

            {/* Quick Tools Grid: Màu sắc, Hình nền, Cài đặt */}
            <div className="grid grid-cols-3 gap-1 pt-1">
              <button
                type="button"
                onClick={handleOpenColorSystem}
                className="py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-700 dark:text-amber-300 flex flex-col items-center justify-center text-[10px] font-bold transition-all cursor-pointer"
                title={isVi ? "Bảng màu" : "Colors"}
              >
                <Flame className="w-3.5 h-3.5 mb-0.5" />
                <span>{isVi ? "Màu" : "Color"}</span>
              </button>
              <button
                type="button"
                onClick={handleOpenWallpaper}
                className="py-1.5 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 border border-teal-400/30 text-teal-700 dark:text-teal-300 flex flex-col items-center justify-center text-[10px] font-bold transition-all cursor-pointer"
                title={isVi ? "Hình nền" : "Wallpapers"}
              >
                <ImageIcon className="w-3.5 h-3.5 mb-0.5" />
                <span>{isVi ? "Nền" : "Wall"}</span>
              </button>
              <button
                type="button"
                onClick={handleOpenSettings}
                className="py-1.5 rounded-lg bg-slate-500/15 hover:bg-slate-500/25 border border-slate-400/30 text-slate-700 dark:text-slate-300 flex flex-col items-center justify-center text-[10px] font-bold transition-all cursor-pointer"
                title={isVi ? "Cài đặt" : "Settings"}
              >
                <Settings className="w-3.5 h-3.5 mb-0.5" />
                <span>{isVi ? "Cài Đặt" : "Set"}</span>
              </button>
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* MOBILE OVERLAYS: Left & Right Drawers khi ở mobile                           */}
        {/* ========================================================================= */}
        {isLeftSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex">
            <div className="w-[82%] max-w-[300px] h-full bg-slate-900 border-r border-white/15 p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold font-play text-white">Menu Điều Hướng</span>
                <button type="button" onClick={() => setIsLeftSidebarOpen(false)} className="text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto no-scrollbar py-3 space-y-1">
                {SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => { onNavigate(sec.id); setIsLeftSidebarOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs font-bold text-white hover:bg-white/10"
                  >
                    <sec.Icon className="w-4 h-4 text-cyan-400" />
                    <span>{isVi ? sec.labelVi : sec.labelEn}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => { handleOpenAi(); setIsLeftSidebarOpen(false); }}
                className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4" />
                <span>Trợ Lý AI Assistant</span>
              </button>
            </div>
            <div className="flex-1" onClick={() => setIsLeftSidebarOpen(false)} />
          </div>
        )}

        {isRightSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex justify-end">
            <div className="flex-1" onClick={() => setIsRightSidebarOpen(false)} />
            <div className="w-[82%] max-w-[300px] h-full bg-slate-900 border-l border-white/15 p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold font-play text-white">Hộp Tiện Ích</span>
                <button type="button" onClick={() => setIsRightSidebarOpen(false)} className="text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto no-scrollbar py-3 space-y-2">
                <button
                  type="button"
                  onClick={() => { handleOpenResumeExport(); setIsRightSidebarOpen(false); }}
                  className="w-full p-2.5 rounded-xl bg-rose-500/20 text-rose-300 font-bold text-xs flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>In PDF Hồ Sơ</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setLang(isVi ? "en" : "vi"); setIsRightSidebarOpen(false); }}
                  className="w-full p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  <span>Đổi Ngôn Ngữ ({lang.toUpperCase()})</span>
                </button>
                <button
                  type="button"
                  onClick={() => { openThemeModal(); setIsRightSidebarOpen(false); }}
                  className="w-full p-2.5 rounded-xl bg-indigo-500/20 text-indigo-300 font-bold text-xs flex items-center gap-2"
                >
                  <Palette className="w-4 h-4" />
                  <span>Chọn Giao Diện Theme</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setLayoutMode("card-page"); setIsRightSidebarOpen(false); }}
                  className="w-full p-2.5 rounded-xl bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center gap-2"
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span>Về Bố Cục Card Page</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
