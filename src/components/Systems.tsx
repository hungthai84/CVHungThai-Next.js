import React, { useState, useMemo, useEffect } from "react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "motion/react";
import { PageCardHeader } from "./PageCardHeader";
import { 
  Search, 
  X, 
  ExternalLink, 
  Sun, 
  Moon, 
  Play, 
  CircleCheck, 
  Server,
  Network,
  Share2,
  Printer,
  ShieldCheck,
  Pin,
  LayoutGrid,
  Layers,
  List,
  Info,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { playUiSound } from "../lib/sound";
import { POWER_SYSTEMS_12, SYSTEM_CATEGORIES, PowerSystemItem } from "../data/systemsData";
import { cn } from "../lib/utils";

export const SYSTEMS_12_DATA = POWER_SYSTEMS_12.map((item) => ({
  id: item.id,
  cls: item.code.toLowerCase(),
  titleVi: item.nameVi,
  titleEn: item.nameEn,
  descVi: item.descVi,
  descEn: item.descEn,
  url: item.url,
  featuresVi: item.featuresVi,
  featuresEn: item.featuresEn,
  svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`,
  bg: `linear-gradient(105deg,#3e79ec 0%,#75a2f7 100%)`,
  shadow: `rgba(65,112,238,.18)`,
  code: item.code,
  fullNameEn: item.fullNameEn,
  badgeVi: item.badgeVi,
  badgeEn: item.badgeEn
}));

const MP4_VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

export function Systems() {
  const { lang } = useLanguage();
  const { theme, setTheme } = useTheme();
  const isVi = lang === "vi";
  const isDark = theme === "dark" || (typeof theme === "string" && theme.includes("dark"));

  // View format: strictly compact-grid
  const [viewFormat, setViewFormat] = useState<"compact-grid">("compact-grid");

  useEffect(() => {
    try {
      localStorage.setItem("systems_view_format", viewFormat);
    } catch {}
  }, [viewFormat]);

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSystem, setSelectedSystem] = useState<PowerSystemItem | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  const filteredSystems = useMemo(() => {
    let list = POWER_SYSTEMS_12;
    if (activeCategory !== "all") {
      list = list.filter((item) => item.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((item) => {
        const matchVi = item.nameVi.toLowerCase().includes(q) || item.descVi.toLowerCase().includes(q);
        const matchEn = item.nameEn.toLowerCase().includes(q) || item.descEn.toLowerCase().includes(q);
        const matchCode = item.code.toLowerCase().includes(q) || item.fullNameEn.toLowerCase().includes(q);
        return matchVi || matchEn || matchCode;
      });
    }
    return list;
  }, [activeCategory, searchQuery]);

  const handleCardClick = (item: PowerSystemItem) => {
    try { playUiSound("click"); } catch {}
    if (item.id === "bi") {
      showToast(isVi ? "Hệ thống BI Dashboard đang được hoàn thiện tích hợp kết nối API thời gian thực!" : "BI Dashboard is completing real-time API integration!");
      setSelectedSystem(item);
      return;
    }
    setSelectedSystem(item);
  };

  const handleOpenUrl = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    try { playUiSound("click"); } catch {}
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleThemeToggle = () => {
    try { playUiSound("click"); } catch {}
    setTheme(isDark ? "glass-light-multicolor" : "dark");
    showToast(isDark ? (isVi ? "Đã chuyển sang giao diện sáng" : "Switched to Light mode") : (isVi ? "Đã chuyển sang giao diện tối" : "Switched to Dark mode"));
  };

  const handleShare = () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
      }
      showToast(isVi ? "Đã sao chép liên kết Cổng Hệ Thống vào clipboard!" : "System Portal link copied to clipboard!");
    } catch {
      showToast(isVi ? "Chia sẻ liên kết thành công!" : "Link shared successfully!");
    }
  };

  // Format date string for live clock
  const formattedTime = currentTime.toTimeString().split(" ")[0];
  const dayNames = ["CHỦ NHẬT", "THỨ 2", "THỨ 3", "THỨ 4", "THỨ 5", "THỨ 6", "THỨ 7"];
  const formattedDate = `${dayNames[currentTime.getDay()]}, ${currentTime.getDate()} THG ${currentTime.getMonth() + 1}`;

  return (
    <section
      id="systems"
      className="relative w-full h-auto overflow-y-auto flex flex-col justify-start items-stretch p-2.5 sm:p-5 font-sans text-slate-800 dark:text-slate-100 transition-colors duration-500 select-none bg-transparent"
    >
      {/* 100% Exact Matching Animation CSS Rules */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes watermark-drift {
          0%, 100% {
            transform: rotate(-12deg) translate(0px, 0px) scale(1);
          }
          33% {
            transform: rotate(-6deg) translate(-8px, -10px) scale(1.05);
          }
          66% {
            transform: rotate(-16deg) translate(6px, -5px) scale(0.97);
          }
        }

        .card-watermark {
          position: absolute;
          right: -8px;
          bottom: -14px;
          opacity: 0.12;
          pointer-events: none;
          transform-origin: center center;
          animation: watermark-drift 8.5s ease-in-out infinite;
          transition: opacity 0.45s ease;
        }

        .system-item:hover .card-watermark {
          opacity: 0.25;
          animation-duration: 4s;
        }

        @keyframes icon-floating {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-5px) rotate(2deg) scale(1.07);
          }
        }

        .animated-service-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          animation: icon-floating 3.2s ease-in-out infinite;
          filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.28));
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .system-item:hover .animated-service-icon {
          transform: scale(1.15) translateY(-3px);
          filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.4));
        }

        .system-item {
          border-radius: 16px !important;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1) !important;
          backdrop-filter: blur(10.1px) !important;
          -webkit-backdrop-filter: blur(10.1px) !important;
          border: 1px solid rgba(255, 255, 255, 0.5) !important;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .system-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.22) !important;
          border-color: rgba(255, 255, 255, 0.8) !important;
        }

        .dark .system-item {
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5) !important;
        }

        .dark .system-item:hover {
          box-shadow: 0 20px 42px rgba(0, 0, 0, 0.75), 0 0 20px rgba(255, 255, 255, 0.1) !important;
        }

        @keyframes ring-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.5);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(99, 102, 241, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
          }
        }

        .video-circle-halo {
          animation: ring-pulse 2.2s infinite;
        }
      `}} />

      <div className="w-full max-w-full h-full min-h-full flex-grow flex-1 flex flex-col gap-4 mx-auto justify-start relative z-10">
        
        {/* Page Card Header with System Title & Mode Switch */}
        <div className="relative w-full">
          <PageCardHeader pageId="systems">
            <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-0.5">
              {/* Left Badge */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-2 h-4 bg-indigo-600 dark:bg-indigo-400 rounded-full shrink-0" />
                <span className="text-caption font-semibold font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-500/15 px-2.5 py-0.5 rounded-full border border-indigo-500/30 shadow-2xs">
                  {isVi ? "12 Hệ thống Vận hành Tập trung" : "12 Centralized Operations Systems"}
                </span>
              </div>

              {/* Right View Switcher & Theme Toggle */}
              <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-center flex-wrap">
                {/* Compact Grid View Mode Indicator */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-white/10 text-xs font-extrabold text-indigo-600 dark:text-cyan-400 shadow-2xs">
                  <List className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span className="font-play">{isVi ? "Thẻ Gọn Nhẹ" : "Compact Card Grid"}</span>
                </div>

                {/* Theme Toggle Button */}
                <button
                  type="button"
                  onClick={handleThemeToggle}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer border bg-white/70 dark:bg-slate-800/70 border-slate-200/80 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:scale-105 active:scale-95 shadow-2xs shrink-0"
                  title={isVi ? "Chuyển đổi Giao diện Sáng / Tối" : "Toggle Light / Dark Theme"}
                >
                  {isDark ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span className="hidden sm:inline-block">{isVi ? "Sáng" : "Light"}</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="hidden sm:inline-block">{isVi ? "Tối" : "Dark"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </PageCardHeader>
        </div>

        {/* HERO TITLE & VIDEO CIRCLE WIDGET (100% HTML MATCHING) */}
        <div className="w-full rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-[0_15px_45px_rgba(15,23,42,0.06)] flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          
          {/* Left Title & Subtitle */}
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border-2 border-indigo-500/90 flex items-center justify-center text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 shadow-sm shrink-0">
              <Server className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight font-play">
                  {isVi ? "Hệ Thống" : "Enterprise Systems"}
                </h1>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-300/60 font-bold uppercase tracking-wider">
                  PowerService
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {isVi 
                  ? "Hạ tầng công nghệ và cổng phần mềm quản trị số hoá tập trung" 
                  : "Centralized technology infrastructure & digital management portals"}
              </p>
            </div>
          </div>

          {/* Right: Tagline badge + GIF Circle with Play Button */}
          <div className="flex items-center gap-4 sm:gap-6 self-start sm:self-end lg:self-center flex-wrap sm:flex-nowrap justify-end">
            
            {/* Multi-industry Info Badge */}
            <div className="hidden sm:inline-flex items-center gap-2 bg-emerald-50/90 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium shadow-xs">
              <Network className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                {isVi ? "Hệ thống vận hành:" : "Operating Systems:"} <strong className="font-bold">{isVi ? "12 Cổng CSKH & Quản trị tập trung." : "12 Centralized CSKH Portals."}</strong>
              </span>
            </div>

            {/* VÒNG TRÒN CHỨA GIF ĐỘNG + NÚT PLAY */}
            <div className="flex flex-col items-center justify-center shrink-0">
              <div 
                onClick={() => {
                  try { playUiSound("click"); } catch {}
                  setIsVideoModalOpen(true);
                  showToast(isVi ? "Đang phát video giới thiệu hệ thống MP4..." : "Playing system overview MP4 video...");
                }}
                title={isVi ? "Bấm để xem video giới thiệu hệ thống" : "Click to watch system intro video"} 
                className="video-circle-halo group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-indigo-600 via-purple-500 to-rose-500 shadow-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center"
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-white/90 dark:border-slate-800 relative">
                  <img 
                    src="https://i.ibb.co/BKHcWL5R/Logo-VED.gif" 
                    alt="System GIF Avatar" 
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/20 pointer-events-none rounded-full" />
                </div>

                {/* Chấm nháy trạng thái Live */}
                <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500 border-2 border-white" />
                </span>
              </div>

              {/* Nút Play nằm ngay dưới hình tròn */}
              <button 
                type="button"
                onClick={() => {
                  try { playUiSound("click"); } catch {}
                  setIsVideoModalOpen(true);
                  showToast(isVi ? "Đang phát video giới thiệu hệ thống MP4..." : "Playing system overview MP4 video...");
                }}
                title={isVi ? "Bấm để phát video MP4" : "Click to play MP4 video"}
                className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 text-white text-[11px] font-extrabold shadow-md hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-white/40 font-play"
              >
                <Play className="w-2.5 h-2.5 fill-yellow-300 text-yellow-300 animate-pulse" />
                <span className="tracking-wide uppercase">Play Video</span>
              </button>
            </div>

          </div>
        </div>

        {/* FILTER PILLS & SEARCH BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {SYSTEM_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    try { playUiSound("click"); } catch {}
                    setActiveCategory(cat.id);
                  }}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer",
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30 scale-[1.02]"
                      : "bg-white/80 hover:bg-slate-100 text-slate-700 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-white/10"
                  )}
                >
                  {isVi ? cat.vi : cat.en}
                </button>
              );
            })}
          </div>

          {/* Real-time Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isVi ? "Tìm kiếm mã hoặc tên hệ thống..." : "Search system code or name..."}
              className="w-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl pl-9 pr-8 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-play"
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* 12 SYSTEMS RESPONSIVE VIEW: CARD GRID / BENTO GRID / COMPACT GRID */}
        {filteredSystems.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-slate-200/80 dark:border-white/10 backdrop-blur-md">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Search className="w-8 h-8" />
            </div>
            <p className="text-base font-bold text-slate-700 dark:text-slate-200 font-play">
              {isVi ? "Không tìm thấy hệ thống phù hợp" : "No matching systems found"}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {isVi 
                ? 'Hãy thử nhập từ khóa khác như "CRM", "ERP", "LMS" hoặc "CSKH"...' 
                : 'Try searching with "CRM", "ERP", "LMS", or "CSKH"...'}
            </p>
            <button 
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 px-5 py-2 rounded-full text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer"
            >
              {isVi ? "Xem lại tất cả 12 hệ thống" : "View all 12 systems"}
            </button>
          </div>
        ) : (
          /* COMPACT CARD GRID (CHẾ ĐỘ GỌN NHẸ DUY NHẤT) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 items-stretch transition-all duration-300">
            {filteredSystems.map((item) => {
              const ServiceIcon = item.icon;
              const WatermarkIcon = item.watermarkIcon;

              return (
                <article
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  title={isVi ? `Nhấp xem chi tiết ${item.code}` : `View ${item.code}`}
                  className={cn(
                    "system-item cursor-pointer relative overflow-hidden p-4 text-white flex flex-col justify-between min-h-[155px] select-none rounded-2xl group transition-all duration-300",
                    `bg-gradient-to-br ${item.gradient}`
                  )}
                >
                  <div className="card-watermark opacity-20 group-hover:opacity-30">
                    <WatermarkIcon className="w-16 h-16 stroke-[1.2]" />
                  </div>

                  <div className="relative z-10 flex flex-col justify-between h-full">
                    {/* DÒNG 1: Tên tiếng Việt bên trái + Badge bên phải */}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-bold text-white/95 font-play truncate">
                        {isVi ? item.nameVi : item.nameEn}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/30 text-white/90 font-mono font-bold shrink-0 border border-white/10 flex items-center gap-1">
                        <span 
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            item.badgeType === "pending" 
                              ? "bg-amber-400 animate-ping" 
                              : item.badgeType === "ai" 
                              ? "bg-fuchsia-400 animate-pulse" 
                              : "bg-emerald-400 animate-pulse"
                          )} 
                        />
                        {isVi ? item.badgeVi : item.badgeEn}
                      </span>
                    </div>

                    {/* DÒNG 2: Mã viết tắt lớn bên trái + Icon bên phải */}
                    <div className="flex items-center justify-between my-auto py-1">
                      <span className="text-2xl font-extrabold font-play tracking-wider text-white drop-shadow-sm">
                        {item.code}
                      </span>
                      <div className="animated-service-icon text-white text-2xl" style={{ animationDelay: `${item.delay || 0}s` }}>
                        <ServiceIcon className="w-7 h-7 stroke-[2.2]" />
                      </div>
                    </div>

                    {/* DÒNG 3: Tên tiếng Anh đầy đủ + Nút chuyển link */}
                    <div className="flex items-center justify-between text-2xs text-white/90 italic font-play pt-1.5 border-t border-white/15">
                      <span className="truncate max-w-[82%] font-medium">{item.fullNameEn}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/90 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* BOTTOM STATUS BAR (100% HTML MATCHING) */}
        <footer className="w-full mt-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          {/* Left: Brand + Realtime Digital Clock + Status */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button 
              type="button"
              onClick={() => setIsAuthorModalOpen(true)}
              className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-md hover:rotate-12 transition-transform cursor-pointer ring-2 ring-slate-200 dark:ring-slate-700"
              title={isVi ? "Xem thông tin kiến trúc sư hệ thống" : "View system architect info"}
            >
              P
            </button>

            {/* Real-time Digital Clock like HTML */}
            <div className="px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-white/10 flex items-center gap-2 font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400 shadow-2xs">
              <span>{formattedTime}</span>
              <span className="w-1 h-3 bg-slate-300 dark:bg-slate-700 rounded-full" />
              <span className="text-slate-600 dark:text-slate-300 uppercase">{formattedDate}</span>
            </div>

            <div className="px-3 py-1.5 rounded-full bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-white/10 flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isVi ? "12 Cổng Kết Nối Tập Trung" : "12 Connected Portals"}</span>
            </div>

            <div className="px-3 py-1.5 rounded-full bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-white/10 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              {isVi ? "Chuẩn Single Sign-On (SSO)" : "Single Sign-On (SSO) Ready"}
            </div>
          </div>

          {/* Right Action Pills */}
          <div className="px-2 py-1 rounded-full bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-white/10 flex items-center gap-1.5">
            <button 
              type="button"
              onClick={handleShare}
              className="w-7 h-7 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-slate-700 transition" 
              title={isVi ? "Chia sẻ trang hệ thống" : "Share systems page"}
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            <button 
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") window.print();
              }}
              className="w-7 h-7 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-700 transition" 
              title={isVi ? "In danh mục hệ thống" : "Print system directory"}
            >
              <Printer className="w-3.5 h-3.5" />
            </button>

            <button 
              type="button"
              onClick={() => showToast(isVi ? "Tất cả 12 hệ thống đã được đồng bộ bảo mật ISO 27001 & SSO" : "All 12 systems are ISO 27001 & SSO compliant")}
              className="w-7 h-7 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-700 transition" 
              title={isVi ? "Chứng chỉ bảo mật" : "Security compliance"}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
            </button>

            <button 
              type="button"
              onClick={() => {
                setIsPinned(!isPinned);
                showToast(isPinned ? (isVi ? "Đã bỏ ghim bảng điều khiển" : "Dashboard unpinned") : (isVi ? "Đã ghim bảng điều khiển hệ thống!" : "Dashboard pinned!"));
              }}
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center transition text-white shadow-xs cursor-pointer",
                isPinned ? "bg-emerald-600 hover:bg-emerald-700" : "bg-indigo-600 hover:bg-indigo-700"
              )}
              title={isVi ? "Ghim bảng điều khiển" : "Pin dashboard"}
            >
              <Pin className="w-3.5 h-3.5" />
            </button>
          </div>
        </footer>

      </div>

      {/* VIDEO PLAYER LIGHTBOX MODAL (PHÁT LINK MP4) */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoModalOpen(false)}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col text-left"
            >
              {/* Video Header */}
              <div className="p-3.5 sm:p-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-400/50 flex items-center justify-center text-indigo-400 text-xs">
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wide font-play">
                      {isVi ? "Video Giới Thiệu Hệ Thống Vận Hành" : "Centralized Systems Video Showcase"}
                    </h4>
                    <p className="text-[11px] text-slate-400">PowerService Enterprise Digital Architecture</p>
                  </div>
                </div>
                
                <button 
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)} 
                  className="w-8 h-8 rounded-full bg-slate-700 text-slate-300 hover:text-white hover:bg-slate-600 flex items-center justify-center text-sm transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* HTML5 MP4 Video Player Frame */}
              <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                <video 
                  controls 
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-contain"
                  poster="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
                >
                  <source src={MP4_VIDEO_URL} type="video/mp4" />
                  {isVi ? "Trình duyệt của bạn không hỗ trợ thẻ phát video HTML5." : "Your browser does not support HTML5 video."}
                </video>
              </div>

              {/* Video Footer */}
              <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CircleCheck className="w-4 h-4 text-emerald-400" /> 
                  <span>{isVi ? "Định dạng: MP4 Full HD 1080p" : "Format: MP4 Full HD 1080p"}</span>
                </span>
                <button 
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)} 
                  className="px-4 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer"
                >
                  {isVi ? "Đóng Video" : "Close Video"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SYSTEM DETAIL MODAL */}
      <AnimatePresence>
        {selectedSystem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSystem(null)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col relative z-50 text-left"
            >
              {/* Modal Header Banner */}
              <div
                className={cn(
                  "p-5 text-white flex items-center justify-between relative overflow-hidden",
                  `bg-gradient-to-r ${selectedSystem.gradient}`
                )}
              >
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-inner p-1">
                    <selectedSystem.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-2xs font-extrabold px-2 py-0.5 rounded-md bg-black/25 text-white uppercase tracking-wider font-mono">
                      {selectedSystem.code}
                    </span>
                    <h3 className="text-lg font-bold font-play leading-tight mt-0.5">
                      {isVi ? selectedSystem.nameVi : selectedSystem.nameEn}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedSystem(null)}
                  className="relative z-10 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto font-play">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 font-mono">
                    {isVi ? "Tên đầy đủ quốc tế" : "Full Name"}
                  </h4>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 italic">
                    {selectedSystem.fullNameEn}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 font-mono">
                    {isVi ? "Mô tả tổng quan" : "Overview"}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isVi ? selectedSystem.descVi : selectedSystem.descEn}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 font-mono">
                    {isVi ? "Các tính năng & Ưu điểm cốt lõi" : "Core Capabilities & Features"}
                  </h4>
                  <ul className="space-y-2">
                    {(isVi ? selectedSystem.featuresVi : selectedSystem.featuresEn).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {selectedSystem.id === "bi" 
                    ? (isVi ? "Đang hoàn thiện kết nối API" : "API Integration in progress") 
                    : (isVi ? "Cổng hoạt động chính thức" : "Official portal live")}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSystem(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                  >
                    {isVi ? "Đóng" : "Close"}
                  </button>

                  {selectedSystem.url && selectedSystem.url !== "#" && (
                    <button
                      type="button"
                      onClick={(e) => handleOpenUrl(e, selectedSystem.url)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shadow-md shadow-indigo-500/20 transition cursor-pointer"
                    >
                      <span>{isVi ? "Mở Cổng Vận Hành" : "Access Portal"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AUTHOR ARCHITECT INFO MODAL */}
      <AnimatePresence>
        {isAuthorModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAuthorModalOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl relative"
            >
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden ring-4 ring-indigo-500/30 mb-3 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80" 
                  alt="Chuyên gia" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white font-play">
                {isVi ? "Kiến Trúc Sư Hệ Thống CX/CSKH" : "CX/CSKH Solutions Architect"}
              </h3>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-3">
                PowerService Enterprise Suite
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {isVi
                  ? "Hệ sinh thái gồm 12 phân hệ tích hợp toàn diện, chuẩn hóa dữ liệu tập trung theo mô hình Omnichannel, tự động hóa quy trình nghiệp vụ và tích hợp Trợ lý Trí tuệ Nhân tạo 24/7."
                  : "Comprehensive ecosystem of 12 integrated enterprise modules, centralizing data in an omnichannel framework, automating business workflows, and embedding 24/7 AI Assistants."}
              </p>
              <button 
                type="button"
                onClick={() => setIsAuthorModalOpen(false)} 
                className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 transition cursor-pointer"
              >
                {isVi ? "Đóng" : "Close"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-14 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 dark:bg-slate-800/95 text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-white/10 backdrop-blur-md pointer-events-none"
          >
            <CircleCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Systems;
