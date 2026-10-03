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
  Bot,
  Minimize2,
  Volume2,
  VolumeX,
  Pause
} from "lucide-react";

export function Systems() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";

  // System selection & flip states
  const [selectedSystem, setSelectedSystem] = useState<SystemItem | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Expandable Special GIF Video Card State (starts normal, expands to 4 cards on click and plays video)
  const [isSpecialCardExpanded, setIsSpecialCardExpanded] = useState(false);
  const [isSpecialVideoMuted, setIsSpecialVideoMuted] = useState(false);
  const [isSpecialVideoPlaying, setIsSpecialVideoPlaying] = useState(true);
  const [activeSpecialVideoIndex, setActiveSpecialVideoIndex] = useState<0 | 1>(0);
  const specialVideoRef = useRef<HTMLVideoElement>(null);

  const VIDEO_HUB_URLS = [
    "https://cdn.scena.ai/project/8606/581097478f9de72616d982e302e1c8d0aab6d66cbee040430c610424c0c72a44.mp4",
    "https://cdn.scena.ai/project/8606/ac120a105730c378447fd67f5e8b6aeb9557b5e4e8854ac2e21148d5316f780b.mp4"
  ];

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

  // Systems list
  const filteredSystems = SYSTEMS_DATA;

  return (
    <section
      id="systems"
      className="relative w-full h-auto overflow-hidden flex flex-col justify-start items-stretch p-3.5 sm:p-5 font-sans text-slate-800 dark:text-slate-100 transition-colors duration-500 select-none"
    >
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
            </div>
          </PageCardHeader>
        </div>

        {/* 12 SYSTEMS BENTO GRID */}
        <IndustrialSubSection className="h-auto shrink-0 flex flex-col justify-start">
          <div className="w-full h-auto rounded-[24px] p-0 border-0 bg-transparent shadow-none backdrop-blur-none flex flex-col justify-start items-center">
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                variants={industrialContainerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 w-full h-auto auto-rows-fr items-stretch"
              >
                   {/* Special High-Tech Expanding GIF & Video Card */}
                   <motion.div
                     layout
                     transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
                     className={cn(
                       "relative overflow-hidden transition-all duration-500 border shadow-lg group",
                       isSpecialCardExpanded 
                         ? "col-span-1 sm:col-span-2 md:col-span-2 xl:col-span-4 min-h-[380px] sm:min-h-[440px] z-30 ring-2 ring-indigo-500/50" 
                         : "col-span-1 min-h-[160px] sm:min-h-[170px] cursor-pointer hover:shadow-xl hover:scale-[1.02]"
                     )}
                     style={{
                       borderRadius: "var(--theme-radius-card, 16px)"
                     }}
                     onClick={() => {
                       if (!isSpecialCardExpanded) {
                         try { playUiSound("click"); } catch {}
                         setIsSpecialCardExpanded(true);
                       }
                     }}
                   >
                     {/* Background Video playing Video 1 when collapsed */}
                     {!isSpecialCardExpanded && (
                       <video
                         src="https://cdn.scena.ai/project/8606/581097478f9de72616d982e302e1c8d0aab6d66cbee040430c610424c0c72a44.mp4"
                         autoPlay
                         loop
                         muted
                         playsInline
                         className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
                       />
                     )}

                     {/* If Expanded: Full Interactive Video Player */}
                     {isSpecialCardExpanded ? (
                      <div className="relative w-full h-full flex flex-col justify-between bg-slate-950 text-white p-4 sm:p-5">
                        {/* Top Bar with title & close / minimize button */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-3 border-b border-white/15 z-20">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center shrink-0 border border-indigo-400">
                              <img src="https://i.ibb.co/BKHcWL5R/Logo-VED.gif" alt="GIF Logo" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h4 className="text-sm sm:text-base font-bold text-white font-play">
                                {isVi ? "Hạ Tầng Nền Tảng & Video Trình Diễn Hệ Thống" : "Enterprise Infrastructure & System Presentation"}
                              </h4>
                              <p className="text-[11px] text-slate-300 font-mono">
                                {isVi ? "Tích hợp đa nền tảng · Real-time Workflow" : "Cross-platform Integration · Real-time Workflow"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap">
                            {/* Video 1 & Video 2 Selector Buttons */}
                            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white/10 border border-white/15">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveSpecialVideoIndex(0);
                                  setIsSpecialVideoPlaying(true);
                                }}
                                className={cn(
                                  "px-2 py-0.5 rounded-md text-[11px] font-mono font-bold transition-all cursor-pointer",
                                  activeSpecialVideoIndex === 0
                                    ? "bg-indigo-600 text-white shadow-xs"
                                    : "text-slate-300 hover:text-white hover:bg-white/10"
                                )}
                              >
                                {isVi ? "Video 01" : "Video 01"}
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveSpecialVideoIndex(1);
                                  setIsSpecialVideoPlaying(true);
                                }}
                                className={cn(
                                  "px-2 py-0.5 rounded-md text-[11px] font-mono font-bold transition-all cursor-pointer",
                                  activeSpecialVideoIndex === 1
                                    ? "bg-indigo-600 text-white shadow-xs"
                                    : "text-slate-300 hover:text-white hover:bg-white/10"
                                )}
                              >
                                {isVi ? "Video 02" : "Video 02"}
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (specialVideoRef.current) {
                                  if (isSpecialVideoPlaying) {
                                    specialVideoRef.current.pause();
                                    setIsSpecialVideoPlaying(false);
                                  } else {
                                    specialVideoRef.current.play();
                                    setIsSpecialVideoPlaying(true);
                                  }
                                }
                              }}
                              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                            >
                              {isSpecialVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                              <span>{isSpecialVideoPlaying ? (isVi ? "Tạm dừng" : "Pause") : (isVi ? "Phát" : "Play")}</span>
                            </button>
                            
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (specialVideoRef.current) {
                                  specialVideoRef.current.muted = !isSpecialVideoMuted;
                                  setIsSpecialVideoMuted(!isSpecialVideoMuted);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer"
                              title={isSpecialVideoMuted ? (isVi ? "Bật âm thanh" : "Unmute") : (isVi ? "Tắt âm thanh" : "Mute")}
                            >
                              {isSpecialVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                try { playUiSound("click"); } catch {}
                                if (specialVideoRef.current) {
                                  specialVideoRef.current.pause();
                                }
                                setIsSpecialCardExpanded(false);
                              }}
                              className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-md"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>{isVi ? "Thu nhỏ" : "Minimize"}</span>
                            </button>
                          </div>
                        </div>

                        {/* Embedded Video Player with Active Video URL */}
                        <div className="relative w-full flex-1 my-3 rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-white/10 shadow-inner min-h-[240px]">
                          <video
                            key={VIDEO_HUB_URLS[activeSpecialVideoIndex]}
                            ref={specialVideoRef}
                            src={VIDEO_HUB_URLS[activeSpecialVideoIndex]}
                            autoPlay
                            playsInline
                            loop
                            muted={isSpecialVideoMuted}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-1">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            {isVi ? "Đang phát video hệ thống trực tiếp từ máy chủ VED" : "Live Streaming from VED Infrastructure"}
                          </span>
                          <span className="text-[11px] text-slate-400">1080p · 60fps</span>
                        </div>
                      </div>
                    ) : (
                      /* Collapsed state with GIF background */
                      <div className="relative w-full h-full p-4 flex flex-col justify-between bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/30 text-white">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/80 text-white shadow-xs">
                            GIF · VIDEO HUB
                          </span>
                          <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-3 h-3 text-amber-300 fill-amber-300" />
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs sm:text-sm font-bold font-play text-white leading-snug group-hover:text-indigo-300 transition-colors">
                            {isVi ? "Trình Diễn Video Hạ Tầng Vận Hành" : "Infrastructure Video Showcase"}
                          </h4>
                          <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                            {isVi ? "Bấm vào để mở rộng 4 thẻ & phát video" : "Click to expand (4x) & stream video"}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {filteredSystems.map((item, idx) => {
                    const IconComponent = item.icon;
                    const isFlipped = !!flippedCards[item.id];
                    
                    // 5 Radial Gradient Palettes extracted directly from CodePen
                    const cardThemes = [
                      // Card 1: #1fe4f5 -> #3fbafe (Aqua Cyan / Sky Blue)
                      {
                        radialBg: "radial-gradient(125% 125% at 20% 20%, rgba(31, 228, 245, 0.26) 0%, rgba(63, 186, 254, 0.14) 100%)",
                        borderClass: "border-[#1fe4f5]/55 dark:border-[#3fbafe]/40",
                        glowShadow: "hover:shadow-[0_12px_28px_-5px_rgba(31,228,245,0.35)]",
                        iconColor: "text-[#0284c7] dark:text-[#38bdf8]",
                        tagClass: "bg-[#1fe4f5]/20 text-[#0369a1] dark:text-[#38bdf8] border-[#1fe4f5]/40",
                      },
                      // Card 2: #fbc1cc -> #fa99b2 (Pastel Rose / Peach Pink)
                      {
                        radialBg: "radial-gradient(125% 125% at 20% 20%, rgba(251, 193, 204, 0.35) 0%, rgba(250, 153, 178, 0.20) 100%)",
                        borderClass: "border-[#fa99b2]/55 dark:border-[#fa99b2]/40",
                        glowShadow: "hover:shadow-[0_12px_28px_-5px_rgba(250,153,178,0.35)]",
                        iconColor: "text-[#e11d48] dark:text-[#fb7185]",
                        tagClass: "bg-[#fa99b2]/20 text-[#be123c] dark:text-[#fb7185] border-[#fa99b2]/40",
                      },
                      // Card 3: #76b2fe -> #b69efe (Periwinkle Blue / Lavender)
                      {
                        radialBg: "radial-gradient(125% 125% at 20% 20%, rgba(118, 178, 254, 0.28) 0%, rgba(182, 158, 254, 0.18) 100%)",
                        borderClass: "border-[#76b2fe]/55 dark:border-[#b69efe]/40",
                        glowShadow: "hover:shadow-[0_12px_28px_-5px_rgba(118,178,254,0.35)]",
                        iconColor: "text-[#4f46e5] dark:text-[#a5b4fc]",
                        tagClass: "bg-[#76b2fe]/20 text-[#4338ca] dark:text-[#a5b4fc] border-[#76b2fe]/40",
                      },
                      // Card 4: #60efbc -> #58d5c9 (Mint Green / Seafoam Teal)
                      {
                        radialBg: "radial-gradient(125% 125% at 20% 20%, rgba(96, 239, 188, 0.28) 0%, rgba(88, 213, 201, 0.18) 100%)",
                        borderClass: "border-[#60efbc]/55 dark:border-[#58d5c9]/40",
                        glowShadow: "hover:shadow-[0_12px_28px_-5px_rgba(96,239,188,0.35)]",
                        iconColor: "text-[#059669] dark:text-[#34d399]",
                        tagClass: "bg-[#60efbc]/20 text-[#047857] dark:text-[#34d399] border-[#60efbc]/40",
                      },
                      // Card 5: #f588d8 -> #c0a3e5 (Fuchsia Pink / Orchid Violet)
                      {
                        radialBg: "radial-gradient(125% 125% at 20% 20%, rgba(245, 136, 216, 0.28) 0%, rgba(192, 163, 229, 0.18) 100%)",
                        borderClass: "border-[#f588d8]/55 dark:border-[#c0a3e5]/40",
                        glowShadow: "hover:shadow-[0_12px_28px_-5px_rgba(245,136,216,0.35)]",
                        iconColor: "text-[#c026d3] dark:text-[#f0abfc]",
                        tagClass: "bg-[#f588d8]/20 text-[#a21caf] dark:text-[#f0abfc] border-[#f588d8]/40",
                      },
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
                          style={{ 
                            borderRadius: "var(--theme-radius-card, 16px)",
                            background: activeTheme.radialBg
                          }}
                          className={cn(
                            "group cursor-pointer relative overflow-hidden p-4 sm:p-4.5 flex flex-col justify-between h-full min-h-[160px] sm:min-h-[170px] w-full shadow-md hover:scale-[1.01] transition-all duration-300 border text-left backdrop-blur-xl",
                            activeTheme.borderClass,
                            activeTheme.glowShadow
                          )}
                          title={isVi ? "Click để truy cập • Double-click để lật thẻ xem chi tiết" : "Click to enter • Double-click to flip card"}
                        >
                          {isFlipped ? (
                            /* Back Side of Card - Holds Detail Title Header & Full Description */
                            <div className="relative z-10 flex-1 flex flex-col justify-between h-full w-full bg-slate-900/95 text-white p-3 rounded-xl border border-indigo-500/40 shadow-inner">
                              <div className="flex items-center justify-between pb-1.5 border-b border-white/15">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <IconComponent className={cn("w-4 h-4 shrink-0", activeTheme.iconColor)} />
                                  <span className="text-xs font-bold text-amber-300 truncate font-play">
                                    {isVi ? item.nameVi : item.nameEn}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFlippedCards((prev) => ({ ...prev, [item.id]: false }));
                                  }}
                                  className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/15 text-slate-200 hover:bg-white/25 shrink-0 cursor-pointer"
                                >
                                  {isVi ? "Mặt trước ↺" : "Front ↺"}
                                </button>
                              </div>

                              {/* Description Text Component Moved to Back Side */}
                              <div className="w-full text-left my-2 space-y-1">
                                <p className="text-[10px] font-mono text-indigo-300 font-semibold uppercase tracking-wider">
                                  {item.nameEn}
                                </p>
                                <p className="text-xs text-slate-200 leading-relaxed font-play line-clamp-4">
                                  {isVi ? item.descVi : item.descEn}
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCardClick(item);
                                }}
                                className="w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md mt-auto cursor-pointer"
                              >
                                <span>{isVi ? "Truy Cập Cổng Hệ Thống" : "Enter Portal"}</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            /* Front Side of Card - Clean & Prominent Code View */
                            <div className="relative z-10 flex-1 flex flex-col justify-between h-full w-full">
                              {/* Dòng 1 : Top badge with animated icon */}
                              <div className="w-full text-left mb-2 flex items-center justify-between gap-2 pb-1.5 border-b border-slate-200/50 dark:border-white/10">
                                <div className="flex items-center gap-2 min-w-0">
                                  <motion.div
                                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 0.95, 1], y: [0, -3, 0] }}
                                    transition={{ duration: 3.2 + (idx % 3) * 0.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="shrink-0"
                                  >
                                    <IconComponent className={cn("w-4.5 h-4.5 stroke-[2.2] drop-shadow-sm", activeTheme.iconColor)} />
                                  </motion.div>
                                  <span className={cn("text-2xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border", activeTheme.tagClass)}>
                                    {item.category.toUpperCase()}
                                  </span>
                                </div>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFlippedCards((prev) => ({ ...prev, [item.id]: true }));
                                  }}
                                  className="text-[10px] font-mono font-bold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-cyan-400 underline decoration-dotted"
                                  title={isVi ? "Xem mô tả chi tiết mặt sau" : "View description on back side"}
                                >
                                  {isVi ? "Chi tiết ↻" : "Details ↻"}
                                </button>
                              </div>

                              {/* Dòng 2 : Code & Icon lớn */}
                              <div className="flex items-center justify-between gap-2 my-auto py-2">
                                <div>
                                  <h3 className="text-2xl sm:text-3xl font-black tracking-wider text-slate-900 dark:text-white font-mono select-none leading-none truncate">
                                    {item.code}
                                  </h3>
                                  <p className="text-xs text-slate-600 dark:text-slate-300 font-bold tracking-tight leading-tight truncate font-play mt-1 max-w-[160px] sm:max-w-[180px]">
                                    {isVi ? item.nameVi : item.nameEn}
                                  </p>
                                </div>

                                <motion.div 
                                  animate={{ y: [0, -4, 0], scale: [1, 1.08, 1] }}
                                  transition={{ duration: 2.5 + (idx % 4) * 0.4, repeat: Infinity, ease: "easeInOut" }}
                                  className="shrink-0 flex items-center justify-center transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-300"
                                >
                                  <IconComponent className={cn("w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2] drop-shadow-sm", activeTheme.iconColor)} />
                                </motion.div>
                              </div>
                              {/* Bottom spacing */}
                              <div className="h-2" />
                            </div>
                          )}
                        </motion.article>
                      </MagneticBentoWrapper>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
          </div>
        </IndustrialSubSection>

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
                    src={VIDEO_HUB_URLS[activeSpecialVideoIndex] || "https://cdn.scena.ai/project/8606/ac120a105730c378447fd67f5e8b6aeb9557b5e4e8854ac2e21148d5316f780b.mp4"}
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
