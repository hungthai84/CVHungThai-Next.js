import React, { useState, useRef, useCallback, useMemo } from "react";
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
  Filter,
  Info,
  Copy,
  Layers,
  Sparkles,
  ShieldCheck,
  Activity,
  Globe2,
  ArrowUpRight,
  Headphones,
  BarChart3,
  GraduationCap,
  Check,
  ChevronDown
} from "lucide-react";

export function Systems() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";

  // Filter & search states
  const [activeCategory, setActiveCategory] = useState<SystemCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSystem, setSelectedSystem] = useState<SystemItem | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    return SYSTEMS_DATA.filter((item) => {
      const matchCategory = activeCategory === "all" || item.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchCategory;

      const matchSearch =
        item.code.toLowerCase().includes(query) ||
        item.nameVi.toLowerCase().includes(query) ||
        item.nameEn.toLowerCase().includes(query) ||
        item.descVi.toLowerCase().includes(query) ||
        item.descEn.toLowerCase().includes(query);

      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

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

              {/* Right Side: Category Filter Dropdown */}
              <div className="flex items-center gap-2 md:ml-auto shrink-0">
                {/* ICON FILTER DROPDOWN */}
                <div className="relative flex items-center gap-1.5 shrink-0">
                  {/* Category Icon Selector Dropdown Trigger */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        try { playUiSound("click"); } catch {}
                        setIsFilterOpen(!isFilterOpen);
                      }}
                      className={cn(
                        "h-8 px-3 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer border shadow-xs",
                        activeCategory !== "all"
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-indigo-500/25"
                          : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200/90 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-slate-700"
                      )}
                      title={isVi ? "Bộ lọc danh mục hệ thống" : "Filter system category"}
                    >
                      <Filter className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="truncate max-w-[130px]">
                        {(() => {
                          const current = SYSTEM_CATEGORIES.find(c => c.id === activeCategory);
                          return isVi ? current?.labelVi : current?.labelEn;
                        })()}
                      </span>
                      <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", isFilterOpen && "rotate-180")} />
                    </button>

                    {/* Filter Dropdown Popover */}
                    <AnimatePresence>
                      {isFilterOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.95 }}
                          transition={{ duration: 0.18 }}
                          className="absolute right-0 top-full mt-2 w-64 p-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-white/15 shadow-2xl backdrop-blur-2xl z-50 flex flex-col gap-1 text-left"
                        >
                          <div className="px-2.5 py-1 text-3xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-200/50 dark:border-white/10 mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <SlidersHorizontal className="w-3 h-3 text-indigo-500" />
                              <span>{isVi ? "Lọc theo nhóm hệ thống" : "Filter by domain"}</span>
                            </span>
                            <span className="font-mono">{SYSTEM_CATEGORIES.length} nhóm</span>
                          </div>

                          {SYSTEM_CATEGORIES.map((cat) => {
                            const isSelected = activeCategory === cat.id;
                            const getCatIcon = (id: string) => {
                              switch (id) {
                                case "cx": return Headphones;
                                case "operations": return Server;
                                case "training": return GraduationCap;
                                case "analytics": return BarChart3;
                                default: return Layers;
                              }
                            };
                            const CatIcon = getCatIcon(cat.id);

                            return (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => {
                                  try { playUiSound("click"); } catch {}
                                  setActiveCategory(cat.id);
                                  setIsFilterOpen(false);
                                }}
                                className={cn(
                                  "w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer border text-left",
                                  isSelected
                                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                                    : "bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 border-transparent text-slate-700 dark:text-slate-300"
                                )}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div className={cn(
                                    "w-6 h-6 rounded-lg flex items-center justify-center shrink-0",
                                    isSelected ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-indigo-500 dark:text-cyan-400"
                                  )}>
                                    <CatIcon className="w-3.5 h-3.5" />
                                  </div>
                                  <span className="truncate">{isVi ? cat.labelVi : cat.labelEn}</span>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                  <span className={cn(
                                    "px-1.5 py-0.5 rounded-full text-3xs font-mono font-bold",
                                    isSelected ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                                  )}>
                                    {cat.count}
                                  </span>
                                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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
        <IndustrialSubSection className="flex-1 flex flex-col">
          <div className="w-full flex-grow rounded-[24px] p-0 border-0 bg-transparent shadow-none backdrop-blur-none flex flex-col justify-center items-center">
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
                    setActiveCategory("all");
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
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 w-full h-full auto-rows-fr items-stretch"
                >
                  {filteredSystems.map((item, index) => {
                    const IconComponent = item.icon;

                    // 12 unique path configurations for moving background lines
                    const linePaths = [
                      "M 10,140 Q 60,110 120,130 T 240,110 T 310,140",
                      "M 10,20 Q 80,80 160,20 T 310,120",
                      "M 10,160 C 80,100 120,40 240,80 T 310,30",
                      "M 300,10 Q 200,90 100,10 T 10,150",
                      "M 10,10 Q 150,150 290,10",
                      "M 10,80 C 100,10 150,150 290,80",
                      "M 50,160 Q 150,30 250,160",
                      "M 10,50 L 120,50 L 240,130 L 310,130",
                      "M 20,20 C 120,20 120,150 290,150",
                      "M 10,120 Q 90,40 180,120 T 310,40",
                      "M 10,150 L 290,20",
                      "M 10,10 C 140,80 140,120 290,160"
                    ];
                    const activePath = linePaths[index % linePaths.length];

                    // 12 unique icon movement classes to make each icon animate uniquely
                    const iconAnimations = [
                      "animate-[float_3s_infinite_ease-in-out]",
                      "animate-[float_2.5s_infinite_ease-in-out_0.2s]",
                      "hover:rotate-12 transition-transform duration-300",
                      "animate-[float_4s_infinite_ease-in-out_0.4s]",
                      "animate-[float_3s_infinite_ease-in-out_0.1s]",
                      "hover:-translate-y-1 transition-transform duration-300",
                      "animate-[float_2.5s_infinite_ease-in-out_0.3s]",
                      "animate-[float_2.5s_infinite_ease-in-out_0.5s]",
                      "hover:scale-110 transition-transform duration-300",
                      "animate-[float_3.5s_infinite_ease-in-out_0.2s]",
                      "animate-[float_3.5s_infinite_ease-in-out_0.6s]",
                      "hover:rotate-6 transition-transform duration-300"
                    ];
                    const activeAnimation = iconAnimations[index % iconAnimations.length];

                    // Unique stroke color matching gradient styles
                    const getLineColor = (gradClass: string) => {
                      if (gradClass.includes("blue") || gradClass.includes("cyan")) return "#3b82f6";
                      if (gradClass.includes("purple") || gradClass.includes("violet")) return "#8b5cf6";
                      if (gradClass.includes("emerald") || gradClass.includes("teal")) return "#10b981";
                      if (gradClass.includes("orange") || gradClass.includes("amber") || gradClass.includes("rose")) return "#f97316";
                      return "#6366f1";
                    };
                    const strokeColor = getLineColor(item.gradientClass);

                    return (
                      <MagneticBentoWrapper key={item.id} className="h-full w-full">
                        <div 
                          onClick={() => handleCardClick(item)}
                          className="w-full h-[180px] sm:h-[190px] [perspective:1000px] group cursor-pointer"
                        >
                          <div 
                            className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
                          >
                            {/* FRONT SIDE */}
                            <motion.article
                              layout
                              variants={industrialSubSectionVariants}
                              style={{ borderRadius: "var(--theme-radius-card, 16px)" }}
                              className={cn(
                                "absolute inset-0 [backface-visibility:hidden] p-4 sm:p-4.5 flex flex-col justify-between h-full w-full shadow-md border text-left bg-white/75 dark:bg-[#121218]/80 overflow-hidden",
                                getGlassCardClass()
                              )}
                            >
                              {/* Animated unique background line */}
                              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 dark:opacity-30" viewBox="0 0 300 180" preserveAspectRatio="none">
                                <path
                                  d={activePath}
                                  fill="none"
                                  stroke={strokeColor}
                                  strokeWidth="2"
                                  strokeDasharray="8 4"
                                  className="animate-[flowLine_4s_linear_infinite]"
                                />
                              </svg>

                              <div className="relative z-10 flex-1 flex flex-col justify-between h-full w-full">
                                {/* Dòng 1 : Tên hệ thống */}
                                <div className="w-full text-left mb-1.5 flex items-center justify-between">
                                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 tracking-wide leading-snug truncate font-play">
                                    {isVi ? item.nameVi : item.nameEn}
                                  </p>
                                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider font-mono">
                                    {isVi ? "Xem thêm" : "SOP"}
                                  </span>
                                </div>

                                {/* Dòng 2 : Bên trái chữ viết tắt, bên phải icon unframed & animated */}
                                <div className="flex items-center justify-between gap-2 my-auto py-1">
                                  <div>
                                    <h3 className="text-xl sm:text-2xl font-black tracking-wider text-slate-900 dark:text-white font-mono select-none leading-none truncate">
                                      {item.code}
                                    </h3>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium italic tracking-tight leading-tight truncate font-play mt-1 max-w-[160px] sm:max-w-[180px]">
                                      {item.nameEn}
                                    </p>
                                  </div>

                                  {/* UNFRAMED & ANIMATED ICON */}
                                  <div className={cn("p-1 shrink-0 flex items-center justify-center", activeAnimation)}>
                                    <IconComponent 
                                      className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2] drop-shadow-[0_2px_8px_rgba(59,130,246,0.3)]" 
                                      style={{ color: strokeColor }}
                                    />
                                  </div>
                                </div>

                                {/* Dòng 3 : Indicator to flip */}
                                <div className="w-full text-left pt-2 border-t border-slate-200/60 dark:border-slate-800/80 mt-2 flex items-center justify-between gap-2 text-slate-400 dark:text-slate-500 text-[10px]">
                                  <span>{isVi ? "Rê chuột để lật thẻ" : "Hover to flip card"}</span>
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </div>
                              </div>
                            </motion.article>

                            {/* BACK SIDE */}
                            <div
                              style={{ 
                                borderRadius: "var(--theme-radius-card, 16px)",
                                transform: "rotateY(180deg)" 
                              }}
                              className={cn(
                                "absolute inset-0 [backface-visibility:hidden] p-4 sm:p-4.5 flex flex-col justify-between h-full w-full shadow-md border text-left bg-slate-50/95 dark:bg-[#181824]/95 overflow-hidden",
                                getGlassCardClass()
                              )}
                            >
                              <div className="flex-1 flex flex-col justify-between h-full w-full relative z-10">
                                {/* Title on back */}
                                <div className="w-full flex items-center gap-1.5 pb-1.5 border-b border-slate-200/60 dark:border-slate-800/80 shrink-0">
                                  <IconComponent className="w-4 h-4 shrink-0 animate-pulse" style={{ color: strokeColor }} />
                                  <span className="text-xs font-bold text-slate-900 dark:text-white font-play truncate">
                                    {isVi ? item.nameVi : item.nameEn}
                                  </span>
                                </div>

                                {/* Business Description */}
                                <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 font-normal leading-relaxed line-clamp-4 font-play my-2 text-left flex-1 flex items-center">
                                  {isVi ? item.descVi : item.descEn}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
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
