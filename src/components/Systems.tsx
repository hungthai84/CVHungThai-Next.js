import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { playUiSound } from "../lib/sound";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { PageCardHeader } from "./PageCardHeader";
import { IndustrialSubSection, industrialContainerVariants, industrialSubSectionVariants } from "./IndustrialStaggerContainer";
import { MagneticBentoWrapper } from "./MagneticBentoWrapper";
import {
  SYSTEMS_DATA,
  SYSTEM_CATEGORIES,
  SystemItem,
  SystemCategory
} from "../data/systems";
import {
  Server,
  Play,
  X,
  CheckCircle2,
  ExternalLink,
  Search,
  SlidersHorizontal,
  Info,
  Copy,
  Layers,
  Sparkles,
  ShieldCheck,
  Activity,
  Globe2,
  ArrowUpRight,
  Filter,
  ChevronDown,
  Headset,
  Bot
} from "lucide-react";

export function Systems() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";

  // Search & system modal states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSystem, setSelectedSystem] = useState<SystemItem | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Video lightbox & feedback state
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic theme-aware Glass Card classes
  const getGlassCardClass = useCallback(() => {
    switch (theme as string) {
      case "glass-dark-neon":
        return "bg-[#121218]/85 dark:bg-[#121218]/85 border-cyan-400/25 dark:border-white/15 backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[0_0_20px_rgba(0,240,255,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.25)]";
      case "modern-light-glass":
        return "bg-white/70 dark:bg-slate-900/75 border-white/80 dark:border-white/15 backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[0_10px_30px_0_rgba(100,110,140,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_14px_40px_0_rgba(100,110,140,0.15)]";
      case "mritech-digital-growth":
      default:
        return "bg-white/75 dark:bg-[#121218]/80 border-white/70 dark:border-white/12 backdrop-blur-[18px] backdrop-saturate-[180%] shadow-[0_8px_32px_0_rgba(31,38,135,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.12)]";
    }
  }, [theme]);

  const triggerToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleCardClick = (item: SystemItem) => {
    if (!item.url) {
      try { playUiSound("alert"); } catch {}
      setSelectedSystem(item);
      triggerToast(
        isVi
          ? `Hệ thống ${item.nameVi} đang được hoàn thiện tích hợp kết nối API thời gian thực!`
          : `${item.nameEn} is integrating real-time API integrations!`
      );
      return;
    }
    try { playUiSound("click"); } catch {}
    window.open(item.url, "_blank", "noopener,noreferrer");
  };

  const handleOpenDetail = (e: React.MouseEvent, item: SystemItem) => {
    e.stopPropagation();
    try { playUiSound("click"); } catch {}
    setSelectedSystem(item);
  };

  const handleCopyLink = (url: string | null) => {
    if (!url) {
      triggerToast(isVi ? "Hệ thống chưa công khai liên kết bên ngoài." : "No external link available.");
      return;
    }
    try {
      navigator.clipboard.writeText(url);
      try { playUiSound("click"); } catch {}
      triggerToast(isVi ? "Đã sao chép liên kết vào bộ nhớ tạm!" : "Copied URL to clipboard!");
    } catch {
      triggerToast(url);
    }
  };

  const openVideo = () => {
    try { playUiSound("click"); } catch {}
    setIsVideoOpen(true);
    triggerToast(isVi ? "Đang phát video giới thiệu hệ thống..." : "Playing system presentation video...");
    setTimeout(() => {
      if (videoPlayerRef.current) {
        videoPlayerRef.current.play().catch(() => {});
      }
    }, 150);
  };

  const closeVideo = () => {
    try { playUiSound("click"); } catch {}
    if (videoPlayerRef.current) {
      videoPlayerRef.current.pause();
    }
    setIsVideoOpen(false);
  };

  // Filter systems list
  const filteredSystems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return SYSTEMS_DATA;

    return SYSTEMS_DATA.filter(
      (item) =>
        item.code.toLowerCase().includes(query) ||
        item.nameVi.toLowerCase().includes(query) ||
        item.nameEn.toLowerCase().includes(query) ||
        item.descVi.toLowerCase().includes(query) ||
        item.descEn.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <section
      id="systems"
      className="relative w-full h-auto overflow-hidden flex flex-col justify-start items-stretch p-3.5 sm:p-5 font-sans text-slate-800 dark:text-slate-100 transition-colors duration-500 select-none"
    >
      <div className="w-full flex-grow flex flex-col gap-4 sm:gap-5 max-w-7xl mx-auto justify-start relative z-10">
        
        {/* Top Header Card */}
        <div className="relative w-full">
          <PageCardHeader pageId="systems">
            <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-0.5 w-full">
              {/* Left Side: Editorial subtitle */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-2 h-4 bg-indigo-600 dark:bg-indigo-400 rounded-full shrink-0" />
                <span className="text-caption font-semibold font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-500/15 px-2.5 py-0.5 rounded-full border border-indigo-500/30 shadow-2xs">
                  {isVi ? "Vận hành & Tự động hoá" : "Governance & Operations Hub"}
                </span>
              </div>

              {/* Middle Side: Summary Stats */}
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-white/10 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                <span>{isVi ? `Hiển thị ${filteredSystems.length}/12` : `Showing ${filteredSystems.length}/12`}</span>
              </div>

              {/* Right Side: Quick Search Bar */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:ml-auto w-full md:w-auto">
                <div className="relative flex-1 sm:w-56 shrink-0">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isVi ? "Tìm mã, tên hệ thống..." : "Search code, name..."}
                    className="w-full pl-9 pr-9 h-11 min-h-[44px] rounded-2xl text-xs bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-play"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="w-11 h-11 min-h-[44px] min-w-[44px] absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center justify-center cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </PageCardHeader>

          {/* Integrated Video Play Badge */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-4 z-30 flex items-center gap-2">
            <button
              type="button"
              onClick={openVideo}
              className="group relative flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 dark:bg-slate-800/90 dark:hover:bg-slate-800 text-white border border-indigo-500/40 shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 cursor-pointer backdrop-blur-md"
              title={isVi ? "Xem video giới thiệu hệ thống" : "Watch system presentation video"}
            >
              <div className="relative w-6 h-6 rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center shrink-0">
                <img
                  src="https://i.ibb.co/BKHcWL5R/Logo-VED.gif"
                  alt="Video Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80";
                  }}
                />
                <span className="absolute inset-0 bg-indigo-500/20 animate-ping rounded-full pointer-events-none" />
              </div>
              <div className="flex items-center gap-1.5">
                <Play className="w-3 h-3 text-amber-300 fill-amber-300 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold tracking-wide font-play text-slate-100">
                  {isVi ? "Video Giới thiệu" : "Watch Video"}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* 12 SYSTEMS BENTO GRID */}
        <IndustrialSubSection className="h-auto shrink-0 flex flex-col justify-start">
          <div className="w-full h-auto rounded-[24px] p-0 border-0 bg-transparent shadow-none backdrop-blur-none flex flex-col justify-start items-center">
            {filteredSystems.length === 0 ? (
              <div
                style={{ borderRadius: "var(--theme-radius-card, 16px)" }}
                className={cn(
                  "w-full py-12 px-6 flex flex-col items-center justify-center text-center gap-3 border",
                  getGlassCardClass()
                )}
              >
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 font-play">
                  {isVi ? "Không tìm thấy hệ thống phù hợp" : "No matching system found"}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                  {isVi
                    ? "Vui lòng thử lại với từ khóa khác hoặc chuyển sang danh mục tất cả hệ thống."
                    : "Please try another search keyword or switch back to all systems category."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                  }}
                  className="mt-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  {isVi ? "Xem tất cả 12 hệ thống" : "View all 12 systems"}
                </button>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.div
                  layout
                  variants={industrialContainerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 w-full h-auto auto-rows-fr items-stretch"
                >
                  {filteredSystems.map((item, idx) => {
                    const IconComponent = item.icon;
                    const isFlipped = !!flippedCards[item.id];
                    const cardThemes = [
                      { bg: "bg-gradient-to-br from-blue-500/15 via-blue-500/5 to-cyan-500/10 dark:from-blue-950/60 dark:to-cyan-950/40 border-blue-300/60 dark:border-blue-500/35", line: "from-blue-500 via-cyan-400 to-indigo-500", iconColor: "text-blue-600 dark:text-cyan-400" },
                      { bg: "bg-gradient-to-br from-emerald-500/15 via-teal-500/5 to-emerald-500/10 dark:from-emerald-950/60 dark:to-teal-950/40 border-emerald-300/60 dark:border-emerald-500/35", line: "from-emerald-400 via-teal-400 to-cyan-500", iconColor: "text-emerald-600 dark:text-emerald-400" },
                      { bg: "bg-gradient-to-br from-purple-500/15 via-fuchsia-500/5 to-purple-500/10 dark:from-purple-950/60 dark:to-fuchsia-950/40 border-purple-300/60 dark:border-purple-500/35", line: "from-purple-500 via-fuchsia-400 to-pink-500", iconColor: "text-purple-600 dark:text-purple-400" },
                      { bg: "bg-gradient-to-br from-amber-500/15 via-orange-500/5 to-amber-500/10 dark:from-amber-950/60 dark:to-orange-950/40 border-amber-300/60 dark:border-amber-500/35", line: "from-amber-400 via-orange-400 to-yellow-500", iconColor: "text-amber-600 dark:text-amber-400" },
                      { bg: "bg-gradient-to-br from-rose-500/15 via-pink-500/5 to-rose-500/10 dark:from-rose-950/60 dark:to-red-950/40 border-rose-300/60 dark:border-rose-500/35", line: "from-rose-500 via-pink-400 to-red-500", iconColor: "text-rose-600 dark:text-rose-400" },
                      { bg: "bg-gradient-to-br from-cyan-500/15 via-sky-500/5 to-cyan-500/10 dark:from-cyan-950/60 dark:to-sky-950/40 border-cyan-300/60 dark:border-cyan-500/35", line: "from-cyan-400 via-sky-400 to-blue-500", iconColor: "text-cyan-600 dark:text-cyan-300" },
                      { bg: "bg-gradient-to-br from-teal-500/15 via-emerald-500/5 to-teal-500/10 dark:from-teal-950/60 dark:to-green-950/40 border-teal-300/60 dark:border-teal-500/35", line: "from-teal-400 via-emerald-400 to-green-500", iconColor: "text-teal-600 dark:text-teal-400" },
                      { bg: "bg-gradient-to-br from-indigo-500/15 via-blue-500/5 to-indigo-500/10 dark:from-indigo-950/60 dark:to-purple-950/40 border-indigo-300/60 dark:border-indigo-500/35", line: "from-indigo-500 via-blue-400 to-purple-500", iconColor: "text-indigo-600 dark:text-indigo-400" },
                      { bg: "bg-gradient-to-br from-violet-500/15 via-purple-500/5 to-violet-500/10 dark:from-violet-950/60 dark:to-indigo-950/40 border-violet-300/60 dark:border-violet-500/35", line: "from-violet-500 via-purple-400 to-indigo-500", iconColor: "text-violet-600 dark:text-violet-400" },
                      { bg: "bg-gradient-to-br from-fuchsia-500/15 via-rose-500/5 to-fuchsia-500/10 dark:from-fuchsia-950/60 dark:to-pink-950/40 border-fuchsia-300/60 dark:border-fuchsia-500/35", line: "from-fuchsia-500 via-pink-400 to-rose-500", iconColor: "text-fuchsia-600 dark:text-fuchsia-400" },
                      { bg: "bg-gradient-to-br from-orange-500/15 via-amber-500/5 to-orange-500/10 dark:from-orange-950/60 dark:to-yellow-950/40 border-orange-300/60 dark:border-orange-500/35", line: "from-orange-500 via-amber-400 to-yellow-500", iconColor: "text-orange-600 dark:text-orange-400" },
                      { bg: "bg-gradient-to-br from-sky-500/15 via-indigo-500/5 to-sky-500/10 dark:from-sky-950/60 dark:to-blue-950/40 border-sky-300/60 dark:border-sky-500/35", line: "from-sky-400 via-blue-400 to-indigo-500", iconColor: "text-sky-600 dark:text-sky-400" },
                    ];
                    const activeTheme = cardThemes[idx % cardThemes.length];

                    return (
                      <MagneticBentoWrapper key={item.id} className="h-full w-full">
                        <motion.article
                          layout
                          variants={industrialSubSectionVariants}
                          onClick={() => handleCardClick(item)}
                          onDoubleClick={(e) => {
                            e.stopPropagation();
                            try { playUiSound("click"); } catch {}
                            setFlippedCards((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
                          }}
                          onMouseEnter={() => {
                            try { playUiSound("hover"); } catch {}
                          }}
                          style={{ borderRadius: "var(--theme-radius-card, 16px)" }}
                          className={cn(
                            "group cursor-pointer relative overflow-hidden p-4 sm:p-4.5 flex flex-col justify-between h-full min-h-[160px] sm:min-h-[170px] w-full shadow-md hover:shadow-xl transition-all duration-300 border text-left",
                            activeTheme.bg,
                            "backdrop-blur-xl"
                          )}
                          title={isVi ? "Click để truy cập • Double-click để lật thẻ xem chi tiết" : "Click to enter • Double-click to flip card"}
                        >
                          {/* Moving Animated Glowing Accent Line */}
                          <motion.div 
                            animate={{ x: ["-100%", "100%"] }} 
                            transition={{ duration: 2.8 + (idx % 3) * 0.4, repeat: Infinity, ease: "linear" }}
                            className={cn("absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r z-20 pointer-events-none", activeTheme.line)}
                          />

                          {isFlipped ? (
                            /* Back Side of Card */
                            <div className="relative z-10 flex-1 flex flex-col justify-between h-full w-full bg-slate-900/90 text-white p-2 rounded-xl border border-indigo-500/30">
                              <div className="flex items-center justify-between pb-1 border-b border-white/10">
                                <span className="text-[10px] font-bold text-amber-300 font-mono">
                                  {isVi ? "MẶT SAU • MÔ TẢ CHI TIẾT" : "BACK SIDE • DESCRIPTION"}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFlippedCards((prev) => ({ ...prev, [item.id]: false }));
                                  }}
                                  className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 hover:bg-white/20"
                                >
                                  {isVi ? "Xoay lại" : "Flip back"}
                                </button>
                              </div>
                              <p className="text-[11px] text-slate-200 leading-snug my-1 font-play line-clamp-3">
                                {isVi ? item.descVi : item.descEn}
                              </p>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCardClick(item);
                                }}
                                className="w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
                              >
                                <span>{isVi ? "Vào Cổng Hệ Thống" : "Enter System Portal"}</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            /* Front Side of Card */
                            <div className="relative z-10 flex-1 flex flex-col justify-between h-full w-full">
                              {/* Dòng 1 : Header có animated unframed icon & tiêu đề */}
                              <div className="w-full text-left mb-2 flex items-center justify-between gap-2 pb-1.5 border-b border-slate-200/60 dark:border-slate-800/80">
                                <div className="flex items-center gap-2 min-w-0">
                                  <motion.div
                                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 0.95, 1], y: [0, -3, 0] }}
                                    transition={{ duration: 3.2 + (idx % 3) * 0.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="shrink-0"
                                  >
                                    <IconComponent className={cn("w-4.5 h-4.5 stroke-[2.2] drop-shadow-sm", activeTheme.iconColor)} />
                                  </motion.div>
                                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-snug truncate font-play">
                                    <span className={cn("bg-clip-text text-transparent bg-gradient-to-r", item.gradientClass)}>
                                      {isVi ? item.nameVi : item.nameEn}
                                    </span>
                                  </p>
                                </div>
                              </div>

                              {/* Dòng 2 : Tên & icon avatar tương tác */}
                              <div className="flex items-center justify-between gap-2 my-auto py-1">
                                <div>
                                  <h3 className="text-xl sm:text-2xl font-black tracking-wider text-slate-900 dark:text-white font-mono select-none leading-none truncate">
                                    {item.code}
                                  </h3>
                                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium italic tracking-tight leading-tight truncate font-play mt-1 max-w-[160px] sm:max-w-[180px]">
                                    {item.nameEn}
                                  </p>
                                </div>

                                <motion.div 
                                  animate={{ y: [0, -4, 0], scale: [1, 1.08, 1] }}
                                  transition={{ duration: 2.5 + (idx % 4) * 0.4, repeat: Infinity, ease: "easeInOut" }}
                                  className="shrink-0 flex items-center justify-center transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-300"
                                >
                                  <IconComponent className={cn("w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2] drop-shadow-sm", activeTheme.iconColor)} />
                                </motion.div>
                              </div>

                              {/* Dòng 3 : Mô tả nghiệp vụ tóm tắt */}
                              <div className="w-full text-left pt-2 border-t border-slate-200/60 dark:border-slate-800/80 mt-2 flex items-center justify-between gap-2">
                                <p className="text-[11px] text-slate-600 dark:text-slate-300 font-normal leading-relaxed line-clamp-2 font-play flex-1">
                                  {isVi ? item.descVi : item.descEn}
                                </p>
                                {item.url && (
                                  <div className="shrink-0 text-indigo-500 dark:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                                    <ArrowUpRight className="w-4 h-4" />
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </motion.article>
                      </MagneticBentoWrapper>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </IndustrialSubSection>

      </div>

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
                  "p-5 text-white bg-gradient-to-r flex items-center justify-between relative overflow-hidden",
                  selectedSystem.gradientClass
                )}
              >
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-inner">
                    <selectedSystem.icon className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/20 border border-white/30">
                      {selectedSystem.code}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-play mt-1">
                      {isVi ? selectedSystem.nameVi : selectedSystem.nameEn}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedSystem(null)}
                  className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition cursor-pointer relative z-10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 flex flex-col gap-4 text-slate-700 dark:text-slate-200 font-play">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    {isVi ? "Tên tiếng Anh quốc tế" : "International System Name"}
                  </label>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                    {selectedSystem.nameEn}
                  </p>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    {isVi ? "Mô tả chức năng & quy trình" : "Functional Description"}
                  </label>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                    {isVi ? selectedSystem.descVi : selectedSystem.descEn}
                  </p>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    {isVi ? "Cổng truy cập hệ thống" : "System Access Portal"}
                  </label>
                  <div className="mt-1.5 flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono break-all text-slate-600 dark:text-slate-300">
                    <Globe2 className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span className="flex-1 truncate">
                      {selectedSystem.url || (isVi ? "Đang cấu hình liên kết nội bộ..." : "Internal API endpoint...")}
                    </span>
                    {selectedSystem.url && (
                      <button
                        type="button"
                        onClick={() => handleCopyLink(selectedSystem.url)}
                        className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition cursor-pointer"
                        title={isVi ? "Sao chép liên kết" : "Copy Link"}
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedSystem(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    {isVi ? "Đóng" : "Close"}
                  </button>

                  {selectedSystem.url ? (
                    <a
                      href={selectedSystem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md hover:shadow-indigo-500/25 flex items-center gap-1.5 transition"
                    >
                      <span>{isVi ? "Truy cập cổng làm việc" : "Launch Portal"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                    >
                      {isVi ? "Đang đồng bộ API" : "Syncing API"}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIDEO PLAYER LIGHTBOX MODAL */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideo}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col relative z-50 text-left"
            >
              {/* Lightbox Header */}
              <div className="p-4 bg-slate-800/90 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-400/50 flex items-center justify-center text-indigo-400">
                    <Play className="w-3.5 h-3.5 fill-indigo-400 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wide font-play">
                      {isVi ? "Video Giới Thiệu Hệ Thống Vận Hành" : "System Operations Overview"}
                    </h4>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                      PowerService Enterprise Digital Architecture
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeVideo}
                  className="w-8 h-8 rounded-full bg-slate-700 text-slate-300 hover:text-white hover:bg-slate-600 flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Responsive Video Canvas Frame */}
              <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                <video
                  ref={videoPlayerRef}
                  controls
                  playsInline
                  preload="auto"
                  className="w-full h-full object-contain"
                  poster="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
                >
                  <source
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                    type="video/mp4"
                  />
                  {isVi
                    ? "Trình duyệt của bạn không hỗ trợ thẻ phát video HTML5."
                    : "Your browser does not support the HTML5 video tag."}
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Feedback Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white border border-indigo-500/50 px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 backdrop-blur-md text-xs font-bold font-play"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Systems;
