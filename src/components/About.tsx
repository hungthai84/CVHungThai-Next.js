import React, { useState, useRef, useCallback } from "react";
import { 
  User, 
  Heart, 
  Target, 
  TrendingUp, 
  Building2,
  Bot, 
  MapPin, 
  ChevronRight, 
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
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { playUiSound } from "../lib/sound";
import { HeroIntroButton } from "./HeroIntroButton";
import { PageCardHeader } from "./PageCardHeader";
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

export default function About() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";

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
    <section 
      id="about" 
      className="relative w-full h-full flex flex-col justify-start items-stretch p-[15px] font-sans text-slate-800 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar"
    >
      <div className="w-full flex-grow flex flex-col gap-[15px] max-w-7xl mx-auto justify-start">

        {/* 1. TOP HEADER BANNER CARD */}
        <PageCardHeader pageId="about">
          <div className="flex items-center gap-2">
            <span className="w-2 h-4 bg-blue-600 dark:bg-cyan-400 rounded-full shrink-0" />
            <span className="text-caption font-semibold font-mono text-blue-700 dark:text-cyan-300 bg-blue-500/15 px-2.5 py-0.5 rounded-full border border-blue-500/30 shadow-2xs">
              {isVi ? "22+ Năm kinh nghiệm CX & CS" : "22+ Years CX & Operations Experience"}
            </span>
          </div>
        </PageCardHeader>

        {/* 2. HERO PROFILE VIDEO & PERSONAL INFORMATION ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[15px] items-stretch w-full">
          
          {/* Left Column: Video Card (7 columns out of 12) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
            className="lg:col-span-7 relative overflow-hidden border border-white/60 dark:border-white/15 bg-slate-950/90 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.15)] min-h-[360px] sm:min-h-[480px] lg:min-h-[520px] flex items-center justify-center group"
          >
            {/* The Portrait Video */}
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

            {/* Dynamic Video Story Overlay when intro video is active */}
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

            {/* Subtle Gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* ========================================================================= */}
            {/* CÁC THẺ DẤU ẤN VẬN HÀNH LƠ LỬNG XUNG QUANH VIDEO TỪ DATA                */}
            {/* ========================================================================= */}
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

            {/* Bottom Left Video Intro Controls */}
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

          {/* Right Column: Contact & Demographics Card (5 columns out of 12) */}
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
            className={cn(
              "lg:col-span-5 h-full p-[16px] sm:p-5 transition-all duration-300 flex flex-col justify-start gap-3.5 min-w-0 border text-left",
              "rounded-[var(--theme-radius-card,10px)]",
              getGlassCardClass()
            )}
          >
            {/* Header with Title & Animated Floating Icon (Không đóng khung, đồng bộ kích thước tiêu đề) */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-2.5 border-b border-slate-200/80 dark:border-white/10 mb-0.5">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <motion.div
                  animate={{
                    y: [0, -3.5, 0],
                    rotate: [0, 3.5, -3.5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.18, rotate: 10 }}
                  className="relative flex items-center justify-center shrink-0 cursor-pointer select-none"
                >
                  <User className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-blue-600 dark:text-cyan-400 stroke-[2.2] drop-shadow-sm" />
                </motion.div>
                <motion.h6 
                  animate={{ opacity: [0.96, 1, 0.96] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-h6 font-bold text-slate-900 dark:text-white tracking-tight font-play"
                >
                  <span className="bg-clip-text text-transparent font-play font-bold text-h6 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300">
                    {isVi ? "Thông tin cá nhân" : "Personal Profile"}
                  </span>
                </motion.h6>
              </div>
            </div>

            {/* Sub card view 2 cột (Grid 2 columns) for demographic info from DATA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pr-0.5">
              {PERSONAL_DEMOGRAPHICS.map((item) => {
                const ItemIcon = getLucideIcon(item.iconName);

                if (item.type === "map") {
                  return (
                    <div 
                      key={item.id}
                      onClick={() => {
                        playUiSound("click");
                        setSelectedMapLocation({
                          isOpen: true,
                          type: item.id === "perm_address" ? "cu_tru" : "tam_tru",
                          title: item.mapTitle || item.labelVi,
                          address: item.href || item.valueVi,
                          query: item.mapQuery || item.valueVi
                        });
                      }}
                      className={cn(
                        "p-2.5 sm:p-3 rounded-2xl border flex items-center justify-between transition-all min-w-0 group/item cursor-pointer shadow-2xs",
                        item.colorTheme.bg,
                        item.colorTheme.border
                      )}
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
                        "col-span-1 sm:col-span-2 p-2.5 sm:p-3 rounded-2xl border flex items-center justify-between transition-all min-w-0 group/item hover:shadow-xs",
                        item.colorTheme.bg,
                        item.colorTheme.border
                      )}
                      title={isVi ? `${item.labelVi}: ${item.valueVi}` : `${item.labelEn}: ${item.valueEn}`}
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

                // Default text item
                return (
                  <div 
                    key={item.id}
                    className={cn(
                      "p-2.5 sm:p-3 rounded-2xl border flex items-center justify-between transition-all min-w-0 group/item",
                      item.colorTheme.bg,
                      item.colorTheme.border
                    )}
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

        {/* 3. HERO HIGHLIGHT LANDSCAPE BANNER - GIỚI THIỆU CHUYÊN GIA */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
          className={cn(
            "w-full relative overflow-hidden p-[15px] flex flex-col gap-4 transition-all duration-300 border text-left",
            "rounded-[var(--theme-radius-card,10px)]",
            getGlassCardClass()
          )}
        >
          {/* Header Block (Section Title with Animated Floating Icon) */}
          <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-white/10">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <motion.div
                animate={{
                  y: [0, -3.5, 0],
                  rotate: [0, 3.5, -3.5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.18, rotate: 10 }}
                className="relative flex items-center justify-center shrink-0 cursor-pointer select-none"
              >
                <Target className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-indigo-600 dark:text-cyan-400 stroke-[2.2] drop-shadow-sm" />
              </motion.div>
              <div className="text-left">
                <motion.h6 
                  animate={{ opacity: [0.96, 1, 0.96] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-h6 font-bold tracking-tight font-play flex items-center"
                >
                  <span className="bg-clip-text text-transparent font-play font-bold text-h6 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 dark:from-indigo-400 dark:via-purple-300 dark:to-rose-300">
                    {isVi ? "Giới thiệu bản thân" : "Personal Executive Profile"}
                  </span>
                </motion.h6>
                <p className="text-2xs font-mono font-bold text-indigo-600 dark:text-cyan-400 uppercase tracking-wider mt-0.5">
                  {isVi ? "Hồ sơ chuyên môn thực chiến" : "Professional executive profile"}
                </p>
              </div>
            </div>
            <span className="self-start sm:self-center text-3xs font-mono font-black text-indigo-600 dark:text-cyan-300 bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20 shadow-2xs tracking-wide">
              {isVi ? "22+ Năm kinh nghiệm thực chiến" : "22+ Years Hands-on Experience"}
            </span>
          </div>

          {/* Grid Layout splits body text on left, core values on right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Left Column: Narrative paragraphs (lg:col-span-7) */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-5 text-left">
              <div className="space-y-4">
                {/* Paragraph 1 */}
                <p className="text-sm sm:text-base md:text-[16px] text-[#0B2546] dark:text-slate-100 font-medium leading-relaxed">
                  {isVi ? (
                    <>
                      Một chuyên gia dịch vụ khách hàng với hơn{" "}
                      <span className="font-extrabold text-[#0057FF] dark:text-cyan-400 bg-blue-500/10 px-2 py-0.5 rounded-lg border border-blue-500/20">
                        22 năm kinh nghiệm thực chiến
                      </span>
                      . Với tôi, Chăm Sóc Khách Hàng không chỉ là phục vụ, mà là{" "}
                      <span className="font-bold text-[#0057FF] dark:text-cyan-300">sự đồng hành</span>. 
                      Mỗi cuộc trò chuyện, mỗi khoảnh khắc, dù là nhỏ nhất, đều là một cơ hội quý giá: để lắng nghe, để thấu hiểu, và để tạo ra những trải nghiệm vượt trên cả sự mong đợi.
                    </>
                  ) : (
                    "A customer service expert with over 22 years of hands-on experience. For me, Customer Care is not just service, but true companionship. Every conversation, every single moment is a precious opportunity: to listen, to understand, and to create experiences that exceed expectations."
                  )}
                </p>

                {/* Paragraph 2 */}
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  {isVi ? (
                    <>
                      Tôi tin rằng sự hài lòng không đến từ sự hoàn hảo tuyệt đối, mà đến từ{" "}
                      <span className="font-bold text-slate-900 dark:text-white underline decoration-blue-500/60 decoration-2 underline-offset-4">
                        sự tận tâm kịp thời
                      </span>{" "}
                      và{" "}
                      <span className="font-bold text-slate-900 dark:text-white underline decoration-cyan-500/60 decoration-2 underline-offset-4">
                        đồng cảm chân thành
                      </span>
                      . Trong suốt sự nghiệp, tôi đã trực tiếp thiết kế và tối ưu hóa hàng chục quy trình, hệ thống Chăm Sóc Khách Hàng, luôn đặt trên nền tảng ba giá trị cốt lõi:
                    </>
                  ) : (
                    "I believe satisfaction comes not from absolute perfection, but from timely dedication and sincere empathy. Throughout my career, I have directly designed and optimized dozens of Customer Care processes and systems, always grounded on three core values:"
                  )}
                </p>
              </div>

              {/* Highlight callout box (Bottom Left) */}
              <div className="p-4 rounded-2xl bg-blue-500/5 dark:bg-cyan-500/5 border border-blue-200/50 dark:border-cyan-500/20 flex items-start gap-3 mt-1 shadow-2xs">
                <span className="text-2xl text-blue-600 dark:text-cyan-400 select-none">“</span>
                <p className="text-sm text-slate-800 dark:text-slate-200 font-bold leading-relaxed">
                  {isVi ? (
                    <>
                      Tôi luôn nỗ lực để mang lại sản phẩm, dịch vụ chất lượng cao với chi phí hợp lý. Và trên hết, để mỗi khách hàng cảm nhận được một điều đơn giản mà cốt lõi:{" "}
                      <span className="font-black text-[#0057FF] dark:text-cyan-300 bg-blue-500/10 px-2.5 py-0.5 rounded-lg border border-blue-500/30">
                        Họ luôn được lắng nghe.
                      </span>
                    </>
                  ) : (
                    <>
                      I always strive to deliver high-quality products and services at reasonable costs. And above all, so that every customer feels one simple yet core truth:{" "}
                      <span className="font-black text-[#0057FF] dark:text-cyan-300 bg-blue-500/10 px-2.5 py-0.5 rounded-lg border border-blue-500/30">
                        They are always listened to.
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Right Column: Values Widget Block (lg:col-span-5) from DATA */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200/80 dark:border-slate-800 shadow-md flex flex-col gap-4 h-full justify-between">
                <div className="flex flex-col gap-1 text-left pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-3xs font-mono font-black text-blue-600 dark:text-cyan-400 tracking-widest uppercase">
                    {isVi ? "Ba giá trị cốt lõi" : "Three Core Values"}
                  </span>
                  <h5 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 font-play">
                    {isVi ? "Nền tảng triết lý dịch vụ" : "Foundation of service philosophy"}
                  </h5>
                </div>

                <div className="flex flex-col gap-3 my-1">
                  {SERVICE_PHILOSOPHY_VALUES.map((val) => (
                    <div 
                      key={val.id}
                      className={cn(
                        "flex items-center gap-3.5 p-2.5 rounded-xl border hover:scale-[1.015] transition-all duration-200 text-left",
                        val.bgGradient,
                        val.borderClass
                      )}
                    >
                      <span className={cn("w-8.5 h-8.5 rounded-lg flex items-center justify-center font-mono font-black text-sm shadow-sm shrink-0", val.badgeBg)}>
                        {val.number}
                      </span>
                      <div>
                        <span className={cn("text-sm font-black tracking-wide uppercase block font-play", val.titleColor)}>
                          {isVi ? val.titleVi : val.titleEn}
                        </span>
                        <span className="text-3xs text-slate-500 dark:text-slate-400 font-medium">
                          {isVi ? val.descVi : val.descEn}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* 4. BOTTOM CTA COLLABORATION BANNER */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
          className={cn(
            "w-full relative overflow-hidden p-[15px] flex flex-col lg:flex-row items-center justify-between gap-4 group/ctabanner border text-left",
            "rounded-[var(--theme-radius-card,10px)]",
            getGlassCardClass()
          )}
        >
          {/* Ambient glow decoration */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-rose-500 rounded-3xl blur-xl opacity-10 group-hover/ctabanner:opacity-20 transition-opacity duration-700 pointer-events-none" />
          
          {/* Left Portion: Icon + Badge + Title + Subtitle */}
          <div className="relative z-10 flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-blue-500/30 dark:border-cyan-400/30 bg-blue-500/10 dark:bg-cyan-500/20 backdrop-blur-md flex items-center justify-center text-blue-600 dark:text-cyan-300 shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-transform duration-300 group-hover/ctabanner:scale-110">
              <Send className="w-5.5 h-5.5 sm:w-6.5 sm:h-6.5 stroke-[2] text-blue-600 dark:text-cyan-300" />
            </div>

            <div className="flex flex-col min-w-0 text-left">
              {/* Top Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-cyan-500/20 border border-blue-500/20 dark:border-cyan-400/30 text-blue-700 dark:text-cyan-200 text-[10px] font-bold tracking-wider mb-2 self-start uppercase font-mono">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-300 animate-pulse" />
                <span>{isVi ? "Hợp tác & Đồng hành" : "Collaboration & Partnership"}</span>
              </div>

              {/* Title and subtitle */}
              <h3 className="text-base sm:text-lg md:text-xl font-black tracking-tight text-blue-950 dark:text-white leading-tight font-play">
                {isVi ? "Cùng tạo ra trải nghiệm khách hàng tốt hơn" : "Let's shape better customer experiences"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 mt-1.5 max-w-2xl font-medium">
                {isVi 
                  ? "Tôi luôn sẵn sàng kết nối để cùng doanh nghiệp xây dựng hệ thống Customer Experience hiệu quả, nhân văn và bền vững."
                  : "Always ready to partner with forward-thinking enterprises to architect sustainable, human-centric CX ecosystems."}
              </p>
            </div>
          </div>

          {/* Right Portion: Connect button */}
          <div className="relative z-10 flex items-center shrink-0 lg:ml-auto">
            <button
              type="button"
              onClick={() => handleNavigate("contact")}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 hover:brightness-105 hover:shadow-[0_8px_30px_rgba(244,63,94,0.3)] transition-all flex items-center gap-3.5 active:scale-95 cursor-pointer text-left border border-white/20 shadow-md group/btn shrink-0"
            >
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
                <MessagesSquare className="w-5 h-5 text-white" />
              </div>

              <div className="flex flex-col pr-1 min-w-0">
                <span className="text-sm font-black text-white leading-none tracking-wide whitespace-nowrap uppercase font-play">
                  {isVi ? "Kết nối với tôi" : "Connect with me"}
                </span>
                <span className="text-[10px] text-white/80 font-bold leading-none whitespace-nowrap mt-1">
                  {isVi ? "Trao đổi, chia sẻ cơ hội hợp tác" : "Explore partnership options"}
                </span>
              </div>

              <div className="w-7 h-7 rounded-full bg-white text-orange-600 flex items-center justify-center shrink-0 shadow-md group-hover/btn:translate-x-1 transition-transform">
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </div>
            </button>
          </div>
        </motion.div>

      </div>

      {/* Google Maps Location Popup Modal */}
      <AnimatePresence>
        {selectedMapLocation && selectedMapLocation.isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMapLocation(null)}
              className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ borderRadius: "var(--theme-radius-card, 14px)" }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 p-5 sm:p-6 shadow-2xl z-10 flex flex-col gap-4 text-slate-800 dark:text-slate-100 font-play overflow-hidden"
            >
              {/* Header */}
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

              {/* Interactive Google Maps Iframe Embed */}
              <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner bg-slate-100 dark:bg-slate-950">
                <iframe
                  title={selectedMapLocation.title}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedMapLocation.query)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              {/* Footer Actions */}
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
    </section>
  );
}
