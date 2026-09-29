import React, { useState, useRef, useCallback, useEffect, memo } from "react";
import { 
  User, 
  Heart, 
  Target, 
  TrendingUp, 
  Building2,
  Bot, 
  MapPin, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  Send, 
  BarChart3, 
  MessagesSquare, 
  Sparkles, 
  Mail, 
  Phone, 
  Globe, 
  Linkedin, 
  ExternalLink, 
  X, 
  Navigation,
  Calendar,
  Home,
  Users,
  ShieldCheck,
  Zap,
  Layers,
  Award,
  Sliders,
  Video as VideoIcon,
  UserCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { playUiSound } from "../lib/sound";
import { HeroIntroButton } from "./HeroIntroButton";
import { DynamicVideoStoryOverlay } from "./DynamicVideoStoryOverlay";
import { cn } from "../lib/utils";
import { 
  ABOUT_PROFILE_STATS, 
  PERSONAL_DEMOGRAPHICS, 
  SERVICE_PHILOSOPHY_VALUES,
  PersonalInfoItem
} from "../data/aboutData";

const ABOUT_IDLE_VIDEO_URL = "https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4";
const ABOUT_INTRO_VIDEO_URL = "https://cdn.scena.ai/project/8606/5f84521bf5c51ff234fb0f4029fb9fba29e7e386f13912a56bc7ee25aebcbc10.mp4";

// Map icon string name to Lucide component
const getLucideIcon = (name: string) => {
  switch (name) {
    case "BarChart3": return BarChart3;
    case "Building2": return Building2;
    case "Bot": return Bot;
    case "TrendingUp": return TrendingUp;
    case "User": return User;
    case "Users": return Users;
    case "Heart": return Heart;
    case "Calendar": return Calendar;
    case "MapPin": return MapPin;
    case "Home": return Home;
    case "Mail": return Mail;
    case "Phone": return Phone;
    case "Globe": return Globe;
    case "Linkedin": return Linkedin;
    default: return User;
  }
};

function About() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";

  // Active Card: 1 = Thẻ 01 (Hồ sơ & Trợ lý ảo & Thông tin cá nhân), 2 = Thẻ 02 (Ba trụ cột & Triết lý), 3 = Thẻ 03 (Giới thiệu)
  const [activeCard, setActiveCard] = useState<1 | 2 | 3>(1);

  // Dynamic theme-aware Glass Card classes for both Light and Dark modes
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

  // Google Maps Location Modal State
  const [selectedMapLocation, setSelectedMapLocation] = useState<{
    isOpen: boolean;
    type: "tam_tru" | "cu_tru";
    title: string;
    address: string;
    query: string;
  } | null>(null);

  // Video State & Controls
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingIntro, setIsPlayingIntro] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [isVideoPaused, setIsVideoPaused] = useState(false);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setVideoCurrentTime(videoRef.current.currentTime);
    }
  };

  const handlePlayIntro = () => {
    setIsPlayingIntro(true);
    setIsVideoMuted(false);
    setIsVideoPaused(false);
    if (videoRef.current) {
      videoRef.current.src = ABOUT_INTRO_VIDEO_URL;
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleCancelIntro = () => {
    setIsPlayingIntro(false);
    setIsVideoMuted(true);
    setIsVideoPaused(false);
    setVideoCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.src = ABOUT_IDLE_VIDEO_URL;
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleVideoEnded = () => {
    if (isPlayingIntro) {
      handleCancelIntro();
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isVideoMuted;
    videoRef.current.muted = nextMuted;
    setIsVideoMuted(nextMuted);
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsVideoPaused(false);
    } else {
      videoRef.current.pause();
      setIsVideoPaused(true);
    }
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setVideoCurrentTime(time);
    }
  };

  const handleNavigate = (sectionId: string) => {
    window.dispatchEvent(new CustomEvent("app-navigate", { detail: sectionId }));
  };

  return (
    <div 
      id="about" 
      className="relative w-full max-w-[1400px] mx-auto h-full flex flex-col gap-[15px] justify-start items-stretch p-[var(--grid-margin,15px)] font-sans text-slate-800 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar select-none"
      style={{ '--grid-margin': '15px', '--grid-gutter': '16px' } as React.CSSProperties}
    >
          {/* ========================================================================= */}
          {/* THẺ CHÍNH 01: TRỢ LÝ ẢO, VIDEO & HỒ SƠ CÁ NHÂN (ABOUT CARD 1)              */}
          {/* ========================================================================= */}
          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.28, ease: "easeOut" } }}
            className="w-full relative overflow-hidden rounded-[10px] border border-slate-200/50 dark:border-white/10 bg-white/75 dark:bg-slate-900/75 backdrop-blur-[20px] shadow-xs hover:shadow-xl dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.4)] hover:border-blue-400/40 dark:hover:border-cyan-400/30 transition-all duration-300 p-4 sm:p-5 flex flex-col gap-4"
          >
                {/* Tiêu đề trang Giới thiệu: Icon chuyển động không đóng khung + Tiêu đề 4 chữ cùng màu icon + Line gạch dưới */}
                <div className="w-full flex flex-col gap-2.5 pb-1">
                  <div className="flex items-center gap-3">
                    {/* Icon chuyển động xóa đóng khung icon */}
                    <motion.div
                      animate={{ 
                        y: [0, -4, 0],
                        scale: [1, 1.06, 1]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 3, 
                        ease: "easeInOut" 
                      }}
                      className="text-blue-600 dark:text-cyan-400 shrink-0 select-none"
                    >
                      <UserCheck className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.4]" />
                    </motion.div>

                    {/* Tiêu đề 4 chữ có màu giống màu icon, viết hoa chữ đầu còn lại viết thường, có line gạch dưới */}
                    <h2 className="text-base sm:text-lg md:text-xl font-bold font-play tracking-wide text-blue-600 dark:text-cyan-400 capitalize">
                      {isVi ? "Hồ sơ giới thiệu" : "Executive profile overview details"}
                    </h2>
                  </div>

                  {/* Line gạch dưới */}
                  <div className="w-full h-[2px] bg-gradient-to-r from-blue-600 via-cyan-400 to-transparent dark:from-cyan-400 dark:via-blue-500 dark:to-transparent rounded-full opacity-80 mt-1" />
                </div>

                {/* Main Video & Profile Content Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch w-full">
                  {/* Left Video Column (7/12) */}
                  <motion.div 
                    style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
                    className="lg:col-span-7 relative overflow-hidden border border-white/60 dark:border-white/15 bg-slate-950/90 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.15)] min-h-[360px] sm:min-h-[460px] lg:min-h-[500px] flex items-center justify-center group"
                  >
                    <video
                      ref={videoRef}
                      src={isPlayingIntro ? ABOUT_INTRO_VIDEO_URL : ABOUT_IDLE_VIDEO_URL}
                      className="w-full h-full object-cover object-center absolute inset-0 brightness-105"
                      autoPlay
                      loop={!isPlayingIntro}
                      muted={isVideoMuted}
                      playsInline
                      onTimeUpdate={handleTimeUpdate}
                      onEnded={handleVideoEnded}
                    />

                    {isPlayingIntro && (
                      <DynamicVideoStoryOverlay
                        currentTime={videoCurrentTime}
                        duration={videoRef.current?.duration || 210}
                        isPlaying={!isVideoPaused}
                        isMuted={isVideoMuted}
                        onToggleMute={toggleVideoMute}
                        onTogglePlay={togglePlayPause}
                        onClose={handleCancelIntro}
                        onSeek={handleSeek}
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                    {/* Floating Metric Badges from Data */}
                    {ABOUT_PROFILE_STATS.map((stat) => {
                      const StatIcon = getLucideIcon(stat.iconName);
                      return (
                        <motion.div
                          key={stat.id}
                          animate={{ y: [0, stat.id === "environments" || stat.id === "csat" ? 4 : -4, 0] }}
                          transition={{ repeat: Infinity, duration: 4.2 + stat.animationDelay, ease: "easeInOut", delay: stat.animationDelay }}
                          className={cn(
                            "absolute z-20 pointer-events-auto bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-white/80 dark:border-white/20 p-2 sm:p-2.5 md:p-3 shadow-lg hover:scale-105 transition-all flex items-center gap-2.5 sm:gap-3 max-w-[135px] xs:max-w-[155px] sm:max-w-[185px] md:max-w-[210px]",
                            "rounded-[var(--theme-radius-inner,14px)]",
                            stat.positionClass
                          )}
                        >
                          <div 
                            className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 shadow-inner"
                            style={{ backgroundColor: `${stat.color}18`, color: stat.color }}
                          >
                            <StatIcon className="w-4 h-4 sm:w-5.5 sm:h-5.5 stroke-[2.5]" />
                          </div>
                          <div className="flex flex-col min-w-0 text-left">
                            <span className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs font-extrabold text-slate-500 dark:text-slate-400 truncate leading-none uppercase">
                              {isVi ? stat.labelVi : stat.labelEn}
                            </span>
                            <div className="flex items-baseline gap-1 mt-0.5 sm:mt-1">
                              <span className="text-sm xs:text-base sm:text-lg md:text-xl font-black tracking-tight leading-none" style={{ color: stat.color }}>
                                {stat.metric}
                              </span>
                              <span className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs font-bold tracking-wider" style={{ color: stat.color }}>
                                {isVi ? stat.unitVi : stat.unitEn}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}

                    <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 z-20 pointer-events-auto">
                      <HeroIntroButton
                        isPlayingIntro={isPlayingIntro}
                        isAudioOn={!isVideoMuted}
                        onToggleAudio={toggleVideoMute}
                        onPlayIntro={handlePlayIntro}
                        onCancelIntro={handleCancelIntro}
                        lang={lang}
                        className="shadow-[0_8px_30px_rgba(78,86,246,0.6)]"
                      />
                    </div>
                  </motion.div>

                  {/* Right Demographics Column (5/12) */}
                  <motion.div 
                    style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
                    className={cn(
                      "lg:col-span-5 h-full p-[16px] sm:p-5 transition-all duration-300 flex flex-col justify-start gap-3.5 min-w-0 border text-left",
                      "rounded-[var(--theme-radius-card,10px)]",
                      getGlassCardClass()
                    )}
                  >
                    <div className="w-full flex items-center justify-between gap-3 pb-2.5 border-b border-slate-200/80 dark:border-white/10 mb-0.5">
                      <div className="flex items-center gap-2 sm:gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-cyan-400 shrink-0">
                          <User className="w-4.5 h-4.5 stroke-[2.2]" />
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight font-play">
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300">
                            {isVi ? "Thông tin cá nhân & Nhân trắc học" : "Personal Profile & Demographics"}
                          </span>
                        </h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pr-0.5">
                      {PERSONAL_DEMOGRAPHICS.map((item) => {
                        const ItemIcon = getLucideIcon(item.iconName);

                        if (item.type === "map") {
                          return (
                            <div 
                              key={item.id}
                              onClick={() => {
                                try { playUiSound("click"); } catch {}
                                setSelectedMapLocation({
                                  isOpen: true,
                                  type: item.id === "perm_address" ? "cu_tru" : "tam_tru",
                                  title: item.mapTitle || item.labelVi,
                                  address: item.href || item.valueVi,
                                  query: item.mapQuery || item.valueVi
                                });
                              }}
                              className={cn(
                                "p-2.5 sm:p-3 border flex items-center justify-between transition-all min-w-0 group/item cursor-pointer shadow-2xs hover:scale-[1.01]",
                                item.colorTheme.bg,
                                item.colorTheme.border
                              )}
                              style={{ borderRadius: "var(--theme-radius, 12px)" }}
                              title={isVi ? `Click để xem bản đồ Google Maps: ${item.href}` : "Click to view Google Maps"}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className={cn("w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs group-hover/item:scale-105 transition-transform", item.colorTheme.iconBg, item.colorTheme.iconColor)}>
                                  <ItemIcon className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <span className={cn("text-[10px] font-bold tracking-wider flex items-center gap-1 truncate", item.colorTheme.labelColor)}>
                                    <span>{isVi ? item.labelVi : item.labelEn}</span>
                                    <span className="text-[8px] px-1 py-0.2 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300 font-normal">Map 📍</span>
                                  </span>
                                  <span className={cn("text-xs font-black truncate", item.colorTheme.valueColor)} title={isVi ? item.valueVi : item.valueEn}>
                                    {isVi ? item.valueVi : item.valueEn}
                                  </span>
                                </div>
                              </div>
                              <ChevronRight className={cn("w-3.5 h-3.5 group-hover/item:translate-x-1 transition-transform shrink-0 ml-1", item.colorTheme.arrowColor)} />
                            </div>
                          );
                        }

                        if (item.type === "email" || item.type === "phone" || item.type === "link") {
                          return (
                            <a 
                              key={item.id}
                              href={item.href}
                              target={item.type === "link" ? "_blank" : undefined}
                              rel={item.type === "link" ? "noopener noreferrer" : undefined}
                              className={cn(
                                "col-span-1 sm:col-span-2 p-2.5 sm:p-3 border flex items-center justify-between transition-all min-w-0 group/item hover:shadow-xs hover:scale-[1.01]",
                                item.colorTheme.bg,
                                item.colorTheme.border
                              )}
                              style={{ borderRadius: "var(--theme-radius, 12px)" }}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className={cn("w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs", item.colorTheme.iconBg, item.colorTheme.iconColor)}>
                                  <ItemIcon className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <span className={cn("text-[10px] font-bold tracking-wider truncate", item.colorTheme.labelColor)}>
                                    {isVi ? item.labelVi : item.labelEn}
                                  </span>
                                  <span className={cn("text-xs font-black truncate", item.colorTheme.valueColor)}>
                                    {isVi ? item.valueVi : item.valueEn}
                                  </span>
                                </div>
                              </div>
                              {item.type === "link" ? (
                                <ExternalLink className={cn("w-3.5 h-3.5 group-hover/item:translate-x-1 transition-transform shrink-0 ml-1", item.colorTheme.arrowColor)} />
                              ) : (
                                <ArrowRight className={cn("w-3.5 h-3.5 group-hover/item:translate-x-1 transition-transform shrink-0 ml-1", item.colorTheme.arrowColor)} />
                              )}
                            </a>
                          );
                        }

                        return (
                          <div 
                            key={item.id}
                            className={cn(
                              "p-2.5 sm:p-3 border flex items-center justify-between transition-all min-w-0 group/item",
                              item.colorTheme.bg,
                              item.colorTheme.border
                            )}
                            style={{ borderRadius: "var(--theme-radius, 12px)" }}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className={cn("w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs", item.colorTheme.iconBg, item.colorTheme.iconColor)}>
                                  <ItemIcon className="w-4 h-4" />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className={cn("text-[10px] font-bold tracking-wider truncate", item.colorTheme.labelColor)}>
                                  {isVi ? item.labelVi : item.labelEn}
                                </span>
                                <span className={cn("text-xs font-black truncate", item.colorTheme.valueColor)}>
                                  {isVi ? item.valueVi : item.valueEn}
                                </span>
                              </div>
                            </div>
                            <ChevronRight className={cn("w-3.5 h-3.5 group-hover/item:translate-x-1 transition-transform shrink-0 ml-1", item.colorTheme.arrowColor)} />
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* THẺ CHÍNH 02: BA TRỤ CỘT, GIÁ TRỊ CỐT LÕI & TRIẾT LÝ HỢP TÁC (ABOUT CARD 2)*/}
          {/* ========================================================================= */}
          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.28, ease: "easeOut" } }}
            className="w-full relative overflow-hidden rounded-[10px] border border-slate-200/50 dark:border-white/10 bg-white/75 dark:bg-slate-900/75 backdrop-blur-[20px] shadow-xs hover:shadow-xl dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.4)] hover:border-blue-400/40 dark:hover:border-cyan-400/30 transition-all duration-300 p-4 sm:p-5 flex flex-col gap-4"
          >
            {/* Narrative Summary & Three Operational Pillars */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch w-full">
              {/* Left Column: About myself story */}
              <motion.div
                style={{ borderRadius: "var(--theme-radius-card, 14px)" }}
                className={cn(
                  "xl:col-span-4 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden border text-left bg-gradient-to-br from-[#F5F8FF] to-[#E9F0FE] dark:from-[#131B2E] dark:to-[#1B2845]",
                  theme === "glass-dark-neon"
                    ? "border-cyan-500/30 shadow-[0_12px_40px_rgba(0,240,255,0.08)]"
                    : "border-blue-100 dark:border-white/10 shadow-[0_12px_40px_rgba(31,38,135,0.06)]"
                )}
              >
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-blue-200/40 dark:border-white/10">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-600/10 text-blue-600 dark:bg-cyan-500/10 dark:text-cyan-400 shrink-0">
                      <User className="w-4.5 h-4.5 stroke-[2.2]" />
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-play tracking-tight">
                      {isVi ? "Giới thiệu bản thân & Triết lý" : "About myself & Leadership"}
                    </h4>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {isVi ? (
                      <>
                        Một chuyên gia dịch vụ khách hàng với hơn{" "}
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-cyan-300 font-extrabold text-xs border border-blue-200/40 dark:cyan-500/20">
                          22 năm kinh nghiệm
                        </span>{" "}
                        thực chiến. Với tôi, Chăm Sóc Khách Hàng không chỉ là phục vụ, mà là sự đồng hành. Mỗi cuộc trò chuyện là một cơ hội quý giá để lắng nghe, thấu hiểu và tạo ra những trải nghiệm vượt trên cả mong đợi.
                      </>
                    ) : (
                      <>
                        A customer service leader with over{" "}
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-cyan-300 font-extrabold text-xs border border-blue-200/40 dark:border-cyan-500/20">
                          22 years of experience
                        </span>
                        . For me, customer care is true partnership—listening, empathizing and exceeding expectations at every touchpoint.
                      </>
                    )}
                  </p>
                </div>

                <div className="flex items-end justify-between mt-6 pt-3 border-t border-blue-200/30 relative z-10">
                  <div className="pb-1">
                    <span className="block font-[Caveat,cursive] text-[#1E56EC] dark:text-cyan-400 text-xl tracking-wide select-none transform -rotate-3 leading-none">
                      Luôn bên bạn ♡
                    </span>
                    <div className="w-16 h-0.5 bg-[#1E56EC]/30 dark:bg-cyan-400/30 rounded-full mt-1" />
                  </div>
                  <span className="text-3xs font-mono font-bold uppercase text-slate-400 dark:text-slate-500">
                    Nguyễn Hùng Thái
                  </span>
                </div>
              </motion.div>

              {/* Right Column: Three operational pillars (8/12) */}
              <div className="xl:col-span-8 flex flex-col gap-4">
                <motion.div
                  style={{ borderRadius: "var(--theme-radius-card, 14px)" }}
                  className={cn(
                    "p-4 sm:p-5 flex flex-col gap-3.5 border text-left bg-white/70 dark:bg-slate-900/60",
                    theme === "glass-dark-neon" ? "border-cyan-500/20" : "border-slate-200/80 dark:border-white/10"
                  )}
                >
                  <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200/60 dark:border-white/10">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-600/10 text-blue-600 dark:bg-cyan-500/10 dark:text-cyan-400 shrink-0">
                      <Target className="w-4.5 h-4.5 stroke-[2.2]" />
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-play tracking-tight">
                      {isVi ? "Ba trụ cột vận hành cốt lõi" : "Three Core Operational Pillars"}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Trụ cột 1 */}
                    <div className="bg-gradient-to-b from-[#1E82FF] to-[#125CE6] border border-blue-400/20 text-white p-4 rounded-2xl flex flex-col justify-between min-h-[190px] shadow-sm group hover:-translate-y-1 transition-all">
                      <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                        <MessagesSquare className="w-4.5 h-4.5 text-white" />
                      </div>
                      <div className="my-2 text-left">
                        <h5 className="text-xs font-black uppercase font-play tracking-wide">01. HIỆU QUẢ</h5>
                        <p className="text-3xs text-blue-100 font-bold uppercase mt-0.5">Tối ưu & Kết quả</p>
                        <p className="text-2xs text-white/95 mt-1 leading-snug">Tối ưu hiệu suất, tạo kết quả đo lường được rõ ràng.</p>
                      </div>
                      <div className="text-right text-3xs font-mono font-bold text-blue-200">KPI / CSAT 94.5%</div>
                    </div>

                    {/* Trụ cột 2 */}
                    <div className="bg-gradient-to-b from-[#FF568A] to-[#A838F5] border border-pink-400/20 text-white p-4 rounded-2xl flex flex-col justify-between min-h-[190px] shadow-sm group hover:-translate-y-1 transition-all">
                      <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                        <Heart className="w-4.5 h-4.5 text-white" />
                      </div>
                      <div className="my-2 text-left">
                        <h5 className="text-xs font-black uppercase font-play tracking-wide">02. NHÂN VĂN</h5>
                        <p className="text-3xs text-pink-100 font-bold uppercase mt-0.5">Đồng cảm & Thấu hiểu</p>
                        <p className="text-2xs text-white/95 mt-1 leading-snug">Lắng nghe, thấu hiểu và đặt con người làm trung tâm.</p>
                      </div>
                      <div className="text-right text-3xs font-mono font-bold text-pink-200">Empathy First</div>
                    </div>

                    {/* Trụ cột 3 */}
                    <div className="bg-gradient-to-b from-[#0FC271] to-[#109B53] border border-emerald-400/20 text-white p-4 rounded-2xl flex flex-col justify-between min-h-[190px] shadow-sm group hover:-translate-y-1 transition-all">
                      <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                        <TrendingUp className="w-4.5 h-4.5 text-white" />
                      </div>
                      <div className="my-2 text-left">
                        <h5 className="text-xs font-black uppercase font-play tracking-wide">03. BỀN VỮNG</h5>
                        <p className="text-3xs text-emerald-100 font-bold uppercase mt-0.5">Giá trị & Tin cậy</p>
                        <p className="text-2xs text-white/95 mt-1 leading-snug">Xây dựng niềm tin vững chắc và gia tăng giá trị thương hiệu.</p>
                      </div>
                      <div className="text-right text-3xs font-mono font-bold text-emerald-200">Long-term Value</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Core Values & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                style={{ borderRadius: "var(--theme-radius-card, 14px)" }}
                className="p-4 sm:p-5 flex flex-col justify-between border text-left bg-[#FFF9F2] dark:bg-[#201712] border-orange-200/60 dark:border-orange-950/40 min-h-[170px]"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-orange-200/30">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    <h5 className="text-xs sm:text-sm font-extrabold text-orange-950 dark:text-orange-200 font-play">
                      {isVi ? "Giá trị cốt lõi" : "Core Values"}
                    </h5>
                  </div>
                  <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                    {isVi ? (
                      <>
                        Tôi tin rằng sự hài lòng không đến từ sự hoàn hảo tuyệt đối, mà đến từ{" "}
                        <span className="font-extrabold text-[#D95F1A] dark:text-orange-400">sự tận tâm kịp thời</span> và{" "}
                        <span className="font-extrabold text-[#D95F1A] dark:text-orange-400">đồng cảm chân thành</span>.
                      </>
                    ) : (
                      "I believe customer satisfaction comes from timely dedication and sincere empathy."
                    )}
                  </p>
                </div>
                <div className="self-end mt-2">
                  <span className="font-[Caveat,cursive] text-amber-700 dark:text-amber-400 text-lg">
                    Khách hàng là trọng tâm ♡
                  </span>
                </div>
              </div>

              <div 
                style={{ borderRadius: "var(--theme-radius-card, 14px)" }}
                className="p-4 sm:p-5 flex flex-col justify-between border text-left bg-[#F2F7FF] dark:bg-[#121B2D] border-blue-200/60 dark:border-blue-950/40 min-h-[170px]"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-blue-200/30">
                    <Users className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                    <h5 className="text-xs sm:text-sm font-extrabold text-blue-950 dark:text-cyan-200 font-play">
                      {isVi ? "Triết lý và tầm nhìn" : "Philosophy & Vision"}
                    </h5>
                  </div>
                  <div className="py-1 px-2 rounded bg-blue-100/30 dark:bg-blue-900/20 text-center">
                    <h5 className="text-xs sm:text-sm font-black italic text-blue-700 dark:text-cyan-300">
                      “Tận Tâm & Đồng Hành Cùng Trải Nghiệm Khách Hàng”
                    </h5>
                  </div>
                  <p className="text-xs sm:text-sm md:text-[14.5px] text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                    {isVi 
                      ? "Nỗ lực mang lại dịch vụ chất lượng cao với chi phí hợp lý để mỗi khách hàng luôn cảm nhận được sự lắng nghe trọn vẹn."
                      : "Striving to deliver high quality services with optimal costs so every customer feels genuinely heard."}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Collaboration CTA */}
            <motion.div 
              style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
              className={cn(
                "w-full relative overflow-hidden p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border text-left",
                getGlassCardClass()
              )}
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-cyan-300 shrink-0">
                  <Send className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-play leading-tight">
                    {isVi ? "Cùng tạo ra trải nghiệm khách hàng tốt hơn" : "Let's create better customer experiences"}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-normal font-normal">
                    {isVi ? "Sẵn sàng kết nối xây dựng hệ thống CX hiệu quả, nhân văn và bền vững." : "Ready to partner with enterprises for sustainable CX systems."}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleNavigate("contact")}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 text-white font-bold text-xs hover:brightness-105 shadow-md flex items-center gap-2 cursor-pointer shrink-0 active:scale-95"
              >
                <span>{isVi ? "Kết nối với tôi" : "Connect with me"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </motion.div>

          {/* ========================================================================= */}
          {/* THẺ CHÍNH 03: GIỚI THIỆU, THÀNH TÍCH & KỸ NĂNG (ABOUT CARD 3)             */}
          {/* ========================================================================= */}
          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.28, ease: "easeOut" } }}
            className="w-full relative overflow-hidden rounded-[10px] border border-slate-200/50 dark:border-white/10 bg-white/75 dark:bg-slate-900/75 backdrop-blur-[20px] shadow-xs hover:shadow-xl dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.4)] hover:border-blue-400/40 dark:hover:border-cyan-400/30 transition-all duration-300 p-4 sm:p-5 flex flex-col gap-4"
          >
              {/* Bento Grid layout for achievements and skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch w-full">
                {/* Left side: Achievements */}
                <motion.div
                  style={{ borderRadius: "var(--theme-radius-card, 14px)" }}
                  className={cn(
                    "p-5 sm:p-6 flex flex-col gap-4 border text-left",
                    getGlassCardClass()
                  )}
                >
                  <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200/80 dark:border-white/10 shrink-0">
                    <Award className="w-4.5 h-4.5 text-blue-600 dark:text-cyan-400" />
                    <span className="text-sm font-bold text-slate-900 dark:text-white font-play truncate">
                      {isVi ? "Thành tích nổi bật" : "Key Achievements"}
                    </span>
                  </div>

                  <div className="relative pl-3.5 space-y-4 border-l-2 border-blue-600/30 dark:border-cyan-400/20 py-1 text-left">
                    <div className="relative">
                      <span className="absolute -left-[20px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cyan-400 border-2 border-white dark:border-slate-900 shadow-2xs" />
                      <h6 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 leading-tight">
                        {isVi ? "Top 10% Nhân sự xuất sắc" : "Top 10% Excellent Talent"}
                      </h6>
                      <p className="text-2xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                        {isVi ? "Công ty CP Digital Solutions" : "Digital Solutions JSC"}
                      </p>
                      <span className="text-[9px] text-slate-400 font-bold block mt-0.5">2019 - 2018</span>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[20px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cyan-400 border-2 border-white dark:border-slate-900 shadow-2xs" />
                      <h6 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 leading-tight">
                        {isVi ? "Dẫn dắt đội nhóm đạt 120% KPI" : "Led Teams to Achieve 120% KPI"}
                      </h6>
                      <p className="text-2xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                        {isVi ? "Công ty CP TMDV XYZ" : "XYZ Trading & Services JSC"}
                      </p>
                      <span className="text-[9px] text-slate-400 font-bold block mt-0.5">2018 - 2020</span>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[20px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cyan-400 border-2 border-white dark:border-slate-900 shadow-2xs" />
                      <h6 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 leading-tight">
                        {isVi ? "Triển khai thành công hệ thống CSKH" : "Successfully Deployed CRM/CX"}
                      </h6>
                      <p className="text-2xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                        {isVi ? "Bưu chính TP.HCM" : "HCMC Post Office"}
                      </p>
                      <span className="text-[9px] text-slate-400 font-bold block mt-0.5">2019 - 2021</span>
                    </div>
                  </div>
                </motion.div>

                {/* Right side: Skills, Languages & Certs */}
                <div className="flex flex-col gap-4">
                  {/* Skills & Languages */}
                  <motion.div
                    style={{ borderRadius: "var(--theme-radius-card, 14px)" }}
                    className={cn(
                      "p-5 sm:p-6 flex flex-col gap-3.5 border text-left",
                      getGlassCardClass()
                    )}
                  >
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200/60 dark:border-white/10">
                      <Sliders className="w-4.5 h-4.5 text-blue-600 dark:text-cyan-400" />
                      <span className="text-sm font-bold text-slate-900 dark:text-white font-play truncate">
                        {isVi ? "Kỹ năng & Chuyên môn" : "Skills & Expertise"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 py-1">
                      {["Quản trị vận hành", "Chăm sóc khách hàng", "Phân tích dữ liệu", "Lãnh đạo đội nhóm", "Tối ưu quy trình"].map((skill, sIdx) => (
                        <span 
                          key={sIdx}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-500/10 text-blue-700 dark:text-cyan-300 border border-blue-500/15 tracking-wide hover:scale-105 transition-all"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-2 mt-2 pt-2 border-t border-slate-200/60 dark:border-white/10">
                      <h5 className="text-xs font-extrabold text-slate-950 dark:text-cyan-400 tracking-wider uppercase">
                        {isVi ? "Ngôn ngữ" : "Languages"}
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5">
                          <span className="font-extrabold text-slate-700 dark:text-slate-300">{isVi ? "Tiếng Việt" : "Vietnamese"}</span>
                          <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-3xs">Native</span>
                        </div>
                        <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5">
                          <span className="font-extrabold text-slate-700 dark:text-slate-300">{isVi ? "Tiếng Anh" : "English"}</span>
                          <span className="px-1.5 py-0.2 rounded bg-blue-500/15 text-blue-600 dark:text-cyan-400 font-bold text-3xs">B2</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Certifications */}
                  <motion.div
                    style={{ borderRadius: "var(--theme-radius-card, 14px)" }}
                    className={cn(
                      "p-5 sm:p-6 flex flex-col gap-3.5 border text-left",
                      getGlassCardClass()
                    )}
                  >
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200/60 dark:border-white/10">
                      <Award className="w-4.5 h-4.5 text-blue-600 dark:text-cyan-400" />
                      <span className="text-sm font-bold text-slate-900 dark:text-white font-play truncate">
                        {isVi ? "Chứng chỉ & Bằng cấp" : "Certificates & Degrees"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="p-2.5 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 flex items-center gap-2 text-left hover:scale-[1.01] transition-transform">
                        <div className="min-w-0">
                          <h6 className="text-[11px] font-extrabold text-slate-800 dark:text-slate-100 leading-tight truncate">PMP - Quản lý dự án</h6>
                          <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">PMI - 2019</p>
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 flex items-center gap-2 text-left hover:scale-[1.01] transition-transform">
                        <div className="min-w-0">
                          <h6 className="text-[11px] font-extrabold text-slate-800 dark:text-slate-100 leading-tight truncate">ITIL Foundation</h6>
                          <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">AXELOS - 2018</p>
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 flex items-center gap-2 text-left hover:scale-[1.01] transition-transform">
                        <div className="min-w-0">
                          <h6 className="text-[11px] font-extrabold text-slate-800 dark:text-slate-100 leading-tight truncate">MBA - Quản trị KD</h6>
                          <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">ĐH Kinh tế - 2015</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
          </motion.div>

      {/* Google Maps Location Popup Modal */}
      <AnimatePresence>
        {selectedMapLocation && selectedMapLocation.isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMapLocation(null)}
              className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ borderRadius: "var(--theme-radius-card, 14px)" }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 p-5 sm:p-6 shadow-2xl z-10 flex flex-col gap-4 text-slate-800 dark:text-slate-100 font-play overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shadow-md ${
                    selectedMapLocation.type === "cu_tru" ? "bg-emerald-600 shadow-emerald-500/30" : "bg-purple-600 shadow-purple-500/30"
                  }`}>
                    {selectedMapLocation.type === "cu_tru" ? <Home className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight font-play">
                      {selectedMapLocation.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {selectedMapLocation.address}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedMapLocation(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner bg-slate-100 dark:bg-slate-950">
                <iframe
                  title={selectedMapLocation.title}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedMapLocation.query)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span className="truncate">{selectedMapLocation.address}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedMapLocation.query)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{isVi ? "Mở Google Maps" : "Open in Google Maps"}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedMapLocation(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
                  >
                    {isVi ? "Đóng" : "Close"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(About);
