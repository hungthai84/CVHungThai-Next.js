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
  Users,
  Clock,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ShieldCheck,
  CheckCircle2,
  Zap
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

// Cute 3D Pixar Mouse Mascot Component (Both paws raised high waving, joyful expression, rosy cheeks)
function CuteMouseMascot({ className = "" }: { className?: string }) {
  return (
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      className={cn("relative select-none pointer-events-none filter drop-shadow-2xl", className)}
    >
      <svg viewBox="0 0 160 160" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36">
        <defs>
          <radialGradient id="mouseHeadGrad" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#E2E5EC" />
            <stop offset="70%" stopColor="#B4B9C7" />
            <stop offset="100%" stopColor="#959BAA" />
          </radialGradient>
          <radialGradient id="mouseBodyGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#E6E9F0" />
            <stop offset="70%" stopColor="#BAC0CE" />
            <stop offset="100%" stopColor="#9CA3B4" />
          </radialGradient>
          <radialGradient id="earInnerGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFAEC9" />
            <stop offset="85%" stopColor="#FF7B9E" />
            <stop offset="100%" stopColor="#E85D83" />
          </radialGradient>
          <radialGradient id="eyeGrad" cx="35%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#2A2F3D" />
            <stop offset="80%" stopColor="#12151C" />
            <stop offset="100%" stopColor="#08090C" />
          </radialGradient>
          <radialGradient id="cheekGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF7A95" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#FF8DA4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFA6B8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Radiating Greeting Rays Left (\\ | /) */}
        <g stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" opacity="0.9">
          <line x1="22" y1="42" x2="11" y2="33" />
          <line x1="17" y1="56" x2="6" y2="56" />
          <line x1="22" y1="70" x2="11" y2="79" />
        </g>
        {/* Radiating Greeting Rays Right (\\ | /) */}
        <g stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" opacity="0.9">
          <line x1="138" y1="42" x2="149" y2="33" />
          <line x1="143" y1="56" x2="154" y2="56" />
          <line x1="138" y1="70" x2="149" y2="79" />
        </g>

        {/* Left Ear */}
        <circle cx="44" cy="46" r="22" fill="url(#mouseHeadGrad)" stroke="#8A90A0" strokeWidth="1" />
        <circle cx="44" cy="46" r="14" fill="url(#earInnerGrad)" opacity="0.95" />

        {/* Right Ear */}
        <circle cx="116" cy="46" r="22" fill="url(#mouseHeadGrad)" stroke="#8A90A0" strokeWidth="1" />
        <circle cx="116" cy="46" r="14" fill="url(#earInnerGrad)" opacity="0.95" />

        {/* Body */}
        <ellipse cx="80" cy="116" rx="34" ry="32" fill="url(#mouseBodyGrad)" />
        {/* White belly tummy patch */}
        <ellipse cx="80" cy="120" rx="20" ry="22" fill="#F8FAFC" opacity="0.9" />

        {/* Head */}
        <ellipse cx="80" cy="80" rx="36" ry="32" fill="url(#mouseHeadGrad)" stroke="#8A90A0" strokeWidth="0.8" />

        {/* Rosy Blushing Cheeks */}
        <ellipse cx="54" cy="86" rx="9" ry="6" fill="url(#cheekGrad)" />
        <ellipse cx="106" cy="86" rx="9" ry="6" fill="url(#cheekGrad)" />

        {/* Left Eye with specular sparkles */}
        <ellipse cx="64" cy="74" rx="6.5" ry="8" fill="url(#eyeGrad)" />
        <ellipse cx="62" cy="71" rx="2.5" ry="3" fill="#FFFFFF" />
        <circle cx="66" cy="77" r="1.2" fill="#FFFFFF" opacity="0.9" />

        {/* Right Eye with specular sparkles */}
        <ellipse cx="96" cy="74" rx="6.5" ry="8" fill="url(#eyeGrad)" />
        <ellipse cx="94" cy="71" rx="2.5" ry="3" fill="#FFFFFF" />
        <circle cx="98" cy="77" r="1.2" fill="#FFFFFF" opacity="0.9" />

        {/* Tiny Pink Button Nose */}
        <ellipse cx="80" cy="84" rx="4" ry="3" fill="#FF4E6B" />
        <ellipse cx="79.5" cy="83.2" rx="1.5" ry="1" fill="#FFFFFF" opacity="0.8" />

        {/* Happy Smiling Mouth with White Tooth */}
        <path d="M72 89 Q80 97 88 89" fill="#991B1B" stroke="#881337" strokeWidth="1" />
        <path d="M75 92 Q80 96 85 92" fill="#FF6B8B" />
        <rect x="78" y="89" width="4" height="2.5" rx="1" fill="#FFFFFF" />

        {/* Whiskers */}
        <g stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" opacity="0.8">
          <line x1="48" y1="84" x2="30" y2="82" />
          <line x1="48" y1="88" x2="28" y2="90" />
          <line x1="112" y1="84" x2="130" y2="82" />
          <line x1="112" y1="88" x2="132" y2="90" />
        </g>

        {/* Left Paw Waving High (Both paws raised high with pink pads) */}
        <motion.g
          animate={{ rotate: [-6, 8, -6], y: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "42px 108px" }}
        >
          <ellipse cx="40" cy="98" rx="9" ry="10" fill="url(#mouseHeadGrad)" stroke="#8A90A0" strokeWidth="0.8" />
          <ellipse cx="40" cy="99" rx="4.5" ry="4" fill="#FFAEC9" />
          <circle cx="35" cy="93" r="1.8" fill="#FFAEC9" />
          <circle cx="40" cy="91.5" r="1.8" fill="#FFAEC9" />
          <circle cx="45" cy="93" r="1.8" fill="#FFAEC9" />
        </motion.g>

        {/* Right Paw Waving High */}
        <motion.g
          animate={{ rotate: [6, -8, 6], y: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
          style={{ transformOrigin: "118px 108px" }}
        >
          <ellipse cx="120" cy="98" rx="9" ry="10" fill="url(#mouseHeadGrad)" stroke="#8A90A0" strokeWidth="0.8" />
          <ellipse cx="120" cy="99" rx="4.5" ry="4" fill="#FFAEC9" />
          <circle cx="115" cy="93" r="1.8" fill="#FFAEC9" />
          <circle cx="120" cy="91.5" r="1.8" fill="#FFAEC9" />
          <circle cx="125" cy="93" r="1.8" fill="#FFAEC9" />
        </motion.g>
      </svg>
    </motion.div>
  );
}

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
    case "Clock": return Clock;
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
    <>
      <section 
        id="about" 
        className="relative w-full h-full flex flex-col justify-start items-stretch p-3 sm:p-4 md:p-5 font-sans text-slate-800 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar"
      >
      {/* 1. TOP PINNED HEADER CHO TRANG GIỚI THIỆU - CARD BOX TIÊU ĐỀ THẺ (CHIỀU NGANG BẰNG HEADER, BO CONG 4 GÓC, NỀN HEADER) */}
      <div className="w-full shrink-0 mb-3 relative z-30 max-w-7xl mx-auto">
        <PageCardHeader 
          pageId="about" 
          className="w-full h-full rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-white/70 dark:border-white/10 backdrop-blur-2xl shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center justify-between w-full text-2xs sm:text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 text-blue-600 dark:text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              {isVi ? "Thực chiến: 22+ Năm" : "Track Record: 22+ Years"}
            </span>
            <span className="text-slate-600 dark:text-slate-300 font-medium">
              {isVi ? "Lãnh đạo Vận hành • Trải nghiệm Khách hàng (CX) • Tối ưu hóa hiệu suất" : "CX Leadership • Operations • High Performance"}
            </span>
          </div>
        </PageCardHeader>
      </div>

      <div className="w-full flex-grow flex flex-col gap-[15px] max-w-7xl mx-auto justify-start">

        {/* ========================================================================= */}
        {/* HÀNG 1: UPPER HERO & THÔNG TIN CÁ NHÂN (1:1 THEO HÌNH ẢNH MINH HỌA)     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 w-full items-stretch">
          
          {/* Main Hero Video Card (lg:col-span-8) - Thẻ chính Giới thiệu có hỗ trợ Giao Diện Sáng & Tối Neon */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{ borderRadius: "var(--theme-radius-card, 24px)" }}
            className={cn(
              "lg:col-span-8 w-full relative overflow-hidden border shadow-[0_12px_32px_rgba(0,0,0,0.12)] min-h-[460px] p-5 sm:p-7 md:p-8 flex flex-col justify-between group rounded-3xl transition-colors duration-300",
              theme === "glass-dark-neon"
                ? "border-white/15 bg-gradient-to-br from-[#0c1329] via-[#0f172a] to-[#080d1e]"
                : "border-slate-200/90 dark:border-white/15 bg-gradient-to-br from-white/95 via-sky-50/80 to-blue-50/60 dark:from-[#0c1329] dark:via-[#0f172a] dark:to-[#080d1e]"
            )}
          >
            {/* Ambient background glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full filter blur-[100px] pointer-events-none" />

            {/* Embedded Video (Nền trong suốt 100% để thấy rõ video hình nền) */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-transparent">
              <video
                ref={videoRef}
                src={isPlayingIntro ? ABOUT_INTRO_VIDEO_URL : ABOUT_IDLE_VIDEO_URL}
                className="w-full h-full object-cover object-center transition-all duration-500 opacity-100 brightness-100 contrast-100 bg-transparent"
                autoPlay
                loop={!isPlayingIntro}
                muted={isVideoMuted}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
              />
              <div 
                className="absolute inset-0 pointer-events-none transition-colors duration-300 bg-gradient-to-t from-black/40 via-transparent to-transparent" 
              />
            </div>

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

            {/* Content Inside Hero: Left text & CTA, Right 4 Bento Stat Cards */}
            <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-5 items-center flex-grow pt-4">
              
              {/* Left Zone: Text & Action Button */}
              <div className="md:col-span-7 flex flex-col justify-center items-start text-left space-y-3.5">
                <h3 className={cn(
                  "text-2xl sm:text-3xl md:text-[34px] font-black font-play tracking-tight leading-tight transition-colors",
                  theme === "glass-dark-neon" ? "text-white" : "text-slate-900 dark:text-white"
                )}>
                  {isVi ? (
                    <>
                      Xin chào,
                      <br />
                      <span>Tôi là trợ lý ảo</span>
                      <br />
                      <span>của bạn!</span>
                    </>
                  ) : (
                    <>
                      Hello,
                      <br />
                      <span>I am your virtual</span>
                      <br />
                      <span>assistant!</span>
                    </>
                  )}
                </h3>

                <p className={cn(
                  "text-xs sm:text-[13px] font-medium leading-relaxed max-w-sm transition-colors",
                  theme === "glass-dark-neon" ? "text-slate-200/90" : "text-slate-700 dark:text-slate-200"
                )}>
                  {isVi 
                    ? "Tôi luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi về các dịch vụ ngân hàng và tài chính."
                    : "I am always ready to assist you anytime, anywhere with customer experience and digital services."}
                </p>

                {/* Primary CTA Button: Bắt đầu trò chuyện + Video Controls */}
                <div className="pt-2 flex items-center gap-2.5 flex-wrap">
                  <HeroIntroButton
                    isPlayingIntro={isPlayingIntro}
                    isAudioOn={!isVideoMuted}
                    onToggleAudio={toggleVideoMute}
                    onPlayIntro={handlePlayIntro}
                    onCancelIntro={handleCancelIntro}
                    lang={lang}
                    label={isVi ? "Bắt đầu trò chuyện" : "Start conversation"}
                    className="h-[44px]"
                  />
                </div>
              </div>

              {/* Right Zone inside Hero: 4 Compact Bento Stat Badges (Light & Dark adaptive) */}
              <div className="md:col-span-5 flex flex-col gap-1.5 sm:gap-2 w-full max-w-[185px] sm:max-w-[200px] ml-auto">
                
                {/* Stat 1: 22+ Năm kinh nghiệm CX & CS */}
                <motion.div 
                  whileHover={{ scale: 1.03, x: 2 }}
                  className={cn(
                    "backdrop-blur-md border p-1.5 sm:p-2 rounded-xl shadow-md flex items-center gap-2.5 text-left group/card transition-all",
                    theme === "glass-dark-neon"
                      ? "bg-black/45 dark:bg-black/55 hover:bg-black/65 border-white/20 hover:border-white/40"
                      : "bg-white/85 dark:bg-black/55 hover:bg-white dark:hover:bg-black/65 border-slate-200/80 dark:border-white/20"
                  )}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-500/25 border border-blue-400/40 flex items-center justify-center text-blue-600 dark:text-cyan-300 shrink-0 shadow-2xs">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] font-semibold text-slate-600 dark:text-slate-300 truncate">
                      {isVi ? "Kinh nghiệm CX & CS" : "Experience CX & CS"}
                    </span>
                    <span className="text-xs sm:text-[13px] font-black text-blue-600 dark:text-cyan-300 font-play leading-none">
                      22+ {isVi ? "NĂM" : "YEARS"}
                    </span>
                  </div>
                </motion.div>

                {/* Stat 2: Quy mô lớn 8+ MÔI TRƯỜNG */}
                <motion.div 
                  whileHover={{ scale: 1.03, x: 2 }}
                  className={cn(
                    "backdrop-blur-md border p-1.5 sm:p-2 rounded-xl shadow-md flex items-center gap-2.5 text-left group/card transition-all",
                    theme === "glass-dark-neon"
                      ? "bg-black/45 dark:bg-black/55 hover:bg-black/65 border-white/20 hover:border-white/40"
                      : "bg-white/85 dark:bg-black/55 hover:bg-white dark:hover:bg-black/65 border-slate-200/80 dark:border-white/20"
                  )}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/25 border border-purple-400/40 flex items-center justify-center text-purple-600 dark:text-purple-300 shrink-0 shadow-2xs">
                    <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] font-semibold text-slate-600 dark:text-slate-300 truncate">
                      {isVi ? "Quy mô lớn" : "Large Scale"}
                    </span>
                    <span className="text-xs sm:text-[13px] font-black text-purple-600 dark:text-purple-300 font-play leading-none">
                      8+ {isVi ? "MÔI TRƯỜNG" : "ENVIRONMENTS"}
                    </span>
                  </div>
                </motion.div>

                {/* Stat 3: Tự động hoá 24/7 AI CRM */}
                <motion.div 
                  whileHover={{ scale: 1.03, x: 2 }}
                  className={cn(
                    "backdrop-blur-md border p-1.5 sm:p-2 rounded-xl shadow-md flex items-center gap-2.5 text-left group/card transition-all",
                    theme === "glass-dark-neon"
                      ? "bg-black/45 dark:bg-black/55 hover:bg-black/65 border-white/20 hover:border-white/40"
                      : "bg-white/85 dark:bg-black/55 hover:bg-white dark:hover:bg-black/65 border-slate-200/80 dark:border-white/20"
                  )}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/25 border border-emerald-400/40 flex items-center justify-center text-emerald-600 dark:text-emerald-300 shrink-0 shadow-2xs">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] font-semibold text-slate-600 dark:text-slate-300 truncate">
                      {isVi ? "Tự động hoá" : "Automation"}
                    </span>
                    <span className="text-xs sm:text-[13px] font-black text-emerald-600 dark:text-emerald-300 font-play leading-none">
                      24/7 AI CRM
                    </span>
                  </div>
                </motion.div>

                {/* Stat 4: Tỷ lệ hài lòng KH 99% */}
                <motion.div 
                  whileHover={{ scale: 1.03, x: 2 }}
                  className={cn(
                    "backdrop-blur-md border p-1.5 sm:p-2 rounded-xl shadow-md flex items-center gap-2.5 text-left group/card transition-all",
                    theme === "glass-dark-neon"
                      ? "bg-black/45 dark:bg-black/55 hover:bg-black/65 border-white/20 hover:border-white/40"
                      : "bg-white/85 dark:bg-black/55 hover:bg-white dark:hover:bg-black/65 border-slate-200/80 dark:border-white/20"
                  )}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-500/25 border border-rose-400/40 flex items-center justify-center text-rose-600 dark:text-rose-300 shrink-0 shadow-2xs">
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] font-semibold text-slate-600 dark:text-slate-300 truncate">
                      {isVi ? "Tỷ lệ hài lòng KH" : "CSAT Score"}
                    </span>
                    <span className="text-xs sm:text-[13px] font-black text-rose-600 dark:text-rose-300 font-play leading-none">
                      99%
                    </span>
                  </div>
                </motion.div>

              </div>

            </div>
          </motion.div>

          {/* Right Card: Thông tin cá nhân (lg:col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            style={{ borderRadius: "var(--theme-radius-card, 24px)" }}
            className={cn(
              "lg:col-span-4 w-full p-4 sm:p-5 border transition-all duration-300 flex flex-col justify-between gap-3 text-left rounded-3xl",
              getGlassCardClass()
            )}
          >
            {/* Header: Icon (không đóng khung) + Tiêu đề 4 chữ format hiệu ứng chuyển động & màu sắc bên trái */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/50 dark:border-white/10 w-full text-left gap-2 flex-wrap">
              <div className="flex items-center gap-2.5 min-w-0">
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 0.95, 1], y: [0, -2, 2, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="shrink-0"
                >
                  <User className="w-5.5 h-5.5 text-blue-600 dark:text-cyan-400 stroke-[2.2] drop-shadow-sm" />
                </motion.div>
                <motion.h3 
                  animate={{ opacity: [0.92, 1, 0.92] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-base font-black font-play tracking-tight truncate"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-cyan-300 dark:via-blue-300 dark:to-indigo-300">
                    {isVi ? "Thông Tin Cá Nhân" : "Personal Information"}
                  </span>
                </motion.h3>
              </div>
            </div>

            {/* List All 10 Personal Info Items */}
            <div className="flex flex-col gap-2 w-full flex-grow max-h-[460px] overflow-y-auto pr-1">
              {PERSONAL_DEMOGRAPHICS.map((item) => {
                const ItemIcon = getLucideIcon(item.iconName);

                if (item.type === "map") {
                  return (
                    <div 
                      key={item.id}
                      onClick={() => {
                        setSelectedMapLocation({
                          isOpen: true,
                          type: item.id === "perm_address" ? "cu_tru" : "tam_tru",
                          title: item.mapTitle || item.labelVi,
                          address: item.href || item.valueVi,
                          query: item.mapQuery || item.valueVi
                        });
                      }}
                      className="bg-white/80 dark:bg-slate-800/60 border border-slate-100 dark:border-white/10 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between transition-all cursor-pointer shadow-2xs hover:shadow-xs hover:-translate-y-0.5"
                      title={isVi ? `Click để xem bản đồ: ${item.href}` : "Click to view Map"}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={cn("w-8 h-8 rounded-full border flex items-center justify-center shrink-0 shadow-2xs", item.colorTheme.iconBg, item.colorTheme.iconColor)}>
                          <ItemIcon className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 truncate">
                            {isVi ? item.labelVi : item.labelEn}
                          </span>
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {isVi ? item.valueVi : item.valueEn}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </div>
                  );
                }

                if (item.type === "email" || item.type === "phone" || item.type === "link") {
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      target={item.type === "link" || item.type === "phone" ? "_blank" : undefined}
                      rel={item.type === "link" || item.type === "phone" ? "noopener noreferrer" : undefined}
                      className="bg-white/80 dark:bg-slate-800/60 border border-slate-100 dark:border-white/10 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between transition-all cursor-pointer shadow-2xs hover:shadow-xs hover:-translate-y-0.5 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={cn("w-8 h-8 rounded-full border flex items-center justify-center shrink-0 shadow-2xs", item.colorTheme.iconBg, item.colorTheme.iconColor)}>
                          <ItemIcon className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 truncate">
                            {isVi ? item.labelVi : item.labelEn}
                          </span>
                          <span className="text-xs font-bold text-blue-600 dark:text-cyan-400 group-hover:underline truncate">
                            {isVi ? item.valueVi : item.valueEn}
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 shrink-0 transition-colors" />
                    </a>
                  );
                }

                return (
                  <div 
                    key={item.id}
                    className="bg-white/80 dark:bg-slate-800/60 border border-slate-100 dark:border-white/10 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between transition-all shadow-2xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={cn("w-8 h-8 rounded-full border flex items-center justify-center shrink-0 shadow-2xs", item.colorTheme.iconBg, item.colorTheme.iconColor)}>
                        <ItemIcon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 truncate">
                          {isVi ? item.labelVi : item.labelEn}
                        </span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {isVi ? item.valueVi : item.valueEn}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* HÀNG 2: THẺ CARD BOX GIỚI THIỆU BẢN THÂN (TÁCH RIÊNG ĐA NĂNG RA NGOÀI)   */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ borderRadius: "var(--theme-radius-card, 24px)" }}
          className="w-full rounded-3xl bg-gradient-to-r from-[#F0F6FF] via-[#E8F1FD] to-[#F0F6FF] dark:from-slate-900/90 dark:via-slate-900/95 dark:to-slate-950/90 border border-blue-200/80 dark:border-white/15 p-5 sm:p-6 md:p-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 relative shadow-md text-left transition-all backdrop-blur-xl"
        >
          <div className="space-y-3 max-w-4xl min-w-0">
            <div className="flex items-center gap-2.5 min-w-0 pb-1 border-b border-blue-200/50 dark:border-white/10 w-fit">
              <motion.div
                animate={{ rotate: [-6, 6, -6], scale: [1, 1.1, 1], y: [0, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="shrink-0 drop-shadow-[0_2px_8px_rgba(37,99,235,0.4)]"
              >
                <User className="w-5.5 h-5.5 text-blue-600 dark:text-cyan-400 stroke-[2.3]" />
              </motion.div>
              <motion.h5 
                animate={{ opacity: [0.92, 1, 0.92] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="text-base font-black font-play tracking-tight truncate"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-500 dark:from-cyan-300 dark:via-blue-300 dark:to-indigo-300">
                  {isVi ? "Giới Thiệu Bản Thân" : "About Myself"}
                </span>
              </motion.h5>
            </div>

            <p className="text-xs sm:text-[13px] md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {isVi ? (
                <>
                  Một chuyên gia dịch vụ khách hàng với hơn{" "}
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-700 dark:text-cyan-300 font-bold border border-blue-400/30 text-xs inline-block">
                    22 năm kinh nghiệm
                  </span>{" "}
                  thực chiến. Với tôi, Chăm Sóc Khách Hàng không chỉ là phục vụ, mà là sự đồng hành. Mỗi cuộc trò chuyện, mỗi khoảnh khắc, dù là nhỏ nhất, đều là một cơ hội quý giá để lắng nghe, để thấu hiểu, và để tạo ra những trải nghiệm vượt trên cả sự mong đợi.
                </>
              ) : (
                <>
                  A customer service expert with over{" "}
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-700 dark:text-cyan-300 font-bold border border-blue-400/30 text-xs inline-block">
                    22 years of experience
                  </span>{" "}
                  hands-on. For me, Customer Care is not just service, but true companionship. Every conversation, every single moment is a precious opportunity: to listen, to understand, and to create experiences that exceed expectations.
                </>
              )}
            </p>
          </div>

          {/* Bottom/Right: Handwritten signature & Mascot */}
          <div className="flex items-center gap-4 shrink-0 self-end md:self-center pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-blue-200/60 dark:border-white/10 md:pl-6">
            <span className="font-[Caveat,cursive] text-blue-600 dark:text-cyan-400 text-2xl font-bold select-none transform -rotate-3 block whitespace-nowrap">
              Luôn bên bạn ♡
            </span>
            <div className="transform scale-90 select-none pointer-events-none shrink-0">
              <CuteMouseMascot className="scale-90" />
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* HÀNG 3: TRIẾT LÝ VẬN HÀNH & BA TRỤ CỘT                                     */}
        {/* ========================================================================= */}
        <div className="w-full">
          
          {/* Cột Triết Lý Vận Hành & Ba Trụ Cột */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            style={{ borderRadius: "var(--theme-radius-card, 24px)" }}
            className="w-full rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/15 p-5 sm:p-6 flex flex-col gap-4 shadow-md backdrop-blur-2xl relative transition-all duration-300 hover:shadow-lg text-left"
          >
            
            {/* Header: Triết Lý Vận Hành & Ba Trụ Cột */}
            <div className="flex items-center gap-3 min-w-0 pb-2 border-b border-slate-200/60 dark:border-white/10">
              <motion.div
                animate={{ 
                  rotate: [-8, 8, -6, 6, 0], 
                  scale: [1, 1.15, 1, 1.1, 1], 
                  y: [0, -3, 0, -2, 0] 
                }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                className="shrink-0"
              >
                <MessagesSquare className="w-6 h-6 text-blue-600 dark:text-cyan-400 stroke-[2.3] drop-shadow-[0_2px_10px_rgba(37,99,235,0.45)]" />
              </motion.div>
              <motion.h4 
                animate={{ opacity: [0.94, 1, 0.94], scale: [1, 1.01, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-base sm:text-lg font-black font-play tracking-tight truncate text-left"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-cyan-300 dark:via-purple-300 dark:to-pink-300 bg-[length:200%_auto] animate-gradient">
                  {isVi ? "Triết Lý Vận Hành & Ba Trụ Cột" : "Operational Philosophy & 3 Pillars"}
                </span>
              </motion.h4>
            </div>

            {/* 3 Pillar Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* 01. Hiệu quả */}
              <div 
                className="bg-gradient-to-b from-[#1E82FF] to-[#0A58CA] text-white p-4.5 flex flex-col items-center text-center justify-between min-h-[250px] shadow-sm rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-full border border-white/35 bg-white/20 flex items-center justify-center shadow-xs">
                  <div className="w-9 h-9 rounded-full border border-white/40 bg-white/20 flex items-center justify-center">
                    <MessagesSquare className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="my-2 space-y-1 flex-1 flex flex-col justify-center">
                  <h6 className="text-sm font-black uppercase tracking-wide font-play">
                    01. {isVi ? "HIỆU QUẢ" : "EFFICIENCY"}
                  </h6>
                  <span className="text-[10px] font-bold text-blue-100 uppercase tracking-wider">
                    {isVi ? "Tối ưu & Kết quả" : "Optimization & Results"}
                  </span>
                  <p className="text-2xs text-white/95 leading-relaxed font-medium pt-1">
                    {isVi ? "Tối ưu hiệu suất, tạo kết quả đo lường được." : "Optimizing performance, creating measurable results."}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full border border-white/25 bg-white/15 flex items-center justify-center shadow-xs">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* 02. Nhân văn */}
              <div 
                className="bg-gradient-to-b from-[#FF4081] to-[#7C4DFF] text-white p-4.5 flex flex-col items-center text-center justify-between min-h-[250px] shadow-sm rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-full border border-white/35 bg-white/20 flex items-center justify-center shadow-xs">
                  <div className="w-9 h-9 rounded-full border border-white/40 bg-white/20 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="my-2 space-y-1 flex-1 flex flex-col justify-center">
                  <h6 className="text-sm font-black uppercase tracking-wide font-play">
                    02. {isVi ? "NHÂN VĂN" : "HUMANITY"}
                  </h6>
                  <span className="text-[10px] font-bold text-pink-100 uppercase tracking-wider">
                    {isVi ? "Đồng cảm & Thấu hiểu" : "Empathy & Understanding"}
                  </span>
                  <p className="text-2xs text-white/95 leading-relaxed font-medium pt-1">
                    {isVi ? "Lắng nghe, thấu hiểu và đặt con người làm trung tâm." : "Listening, understanding and putting people at center."}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full border border-white/25 bg-white/15 flex items-center justify-center shadow-xs">
                  <Users className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* 03. Bền vững */}
              <div 
                className="bg-gradient-to-b from-[#00C853] to-[#007E33] text-white p-4.5 flex flex-col items-center text-center justify-between min-h-[250px] shadow-sm rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-full border border-white/35 bg-white/20 flex items-center justify-center shadow-xs">
                  <div className="w-9 h-9 rounded-full border border-white/40 bg-white/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="my-2 space-y-1 flex-1 flex flex-col justify-center">
                  <h6 className="text-sm font-black uppercase tracking-wide font-play">
                    03. {isVi ? "BỀN VỮNG" : "SUSTAINABILITY"}
                  </h6>
                  <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-wider">
                    {isVi ? "Giá trị & Tin cậy" : "Value & Reliability"}
                  </span>
                  <p className="text-2xs text-white/95 leading-relaxed font-medium pt-1">
                    {isVi ? "Xây dựng niềm tin và giá trị bền vững." : "Building sustainable trust and lasting value."}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full border border-white/25 bg-white/15 flex items-center justify-center shadow-xs">
                  <Globe className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* 2 Subcards: Giá trị cốt lõi & Triết lý và tầm nhìn */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Giá trị cốt lõi */}
              <div className="bg-[#FFF9F2] dark:bg-[#201815] border border-orange-200/80 dark:border-orange-950/40 rounded-2xl p-4 flex flex-col justify-between min-h-[170px] shadow-2xs text-left">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <motion.div
                      animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 0.95, 1], y: [0, -1.5, 1.5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="shrink-0"
                    >
                      <Sparkles className="w-5 h-5 text-orange-500 dark:text-orange-400 stroke-[2.2] drop-shadow-sm" />
                    </motion.div>
                    <motion.h6 
                      animate={{ opacity: [0.92, 1, 0.92] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                      className="text-xs sm:text-sm font-black font-play tracking-tight truncate"
                    >
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-300 dark:via-amber-300 dark:to-yellow-300">
                        {isVi ? "Giá Trị Cốt Lõi" : "Core Value Pillars"}
                      </span>
                    </motion.h6>
                  </div>
                  <p className="text-2xs sm:text-xs text-slate-800 dark:text-slate-300 font-medium leading-relaxed">
                    {isVi ? (
                      <>
                        Tôi tin rằng sự hài lòng không đến từ sự hoàn hảo tuyệt đối, mà đến từ{" "}
                        <span className="font-extrabold text-[#D95F1A] dark:text-orange-400 underline decoration-orange-500/40 decoration-2 underline-offset-2">
                          sự tận tâm kịp thời
                        </span>{" "}
                        và{" "}
                        <span className="font-extrabold text-[#D95F1A] dark:text-orange-400 underline decoration-orange-500/40 decoration-2 underline-offset-2">
                          đồng cảm chân thành
                        </span>
                        .
                      </>
                    ) : (
                      <>
                        I believe satisfaction comes not from absolute perfection, but from{" "}
                        <span className="font-extrabold text-[#D95F1A] dark:text-orange-400 underline decoration-orange-500/40 decoration-2 underline-offset-2">
                          timely dedication
                        </span>{" "}
                        and{" "}
                        <span className="font-extrabold text-[#D95F1A] dark:text-orange-400 underline decoration-orange-500/40 decoration-2 underline-offset-2">
                          sincere empathy
                        </span>
                        .
                      </>
                    )}
                  </p>
                </div>
                <div className="self-end mt-2">
                  <span className="font-[Caveat,cursive] text-amber-700 dark:text-amber-400 text-base sm:text-lg select-none transform -rotate-2 block leading-none">
                    Khách hàng là trọng tâm ♡
                  </span>
                </div>
              </div>

              {/* Triết lý và tầm nhìn */}
              <div className="bg-[#F2F7FF] dark:bg-[#121B2D] border border-blue-200/80 dark:border-blue-950/40 rounded-2xl p-4 flex flex-col justify-between min-h-[170px] shadow-2xs text-left">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <motion.div
                      animate={{ rotate: [0, -7, 7, 0], scale: [1, 1.08, 0.95, 1], y: [0, -1.5, 1.5, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                      className="shrink-0"
                    >
                      <Users className="w-5 h-5 text-blue-600 dark:text-cyan-400 stroke-[2.2] drop-shadow-sm" />
                    </motion.div>
                    <motion.h6 
                      animate={{ opacity: [0.92, 1, 0.92] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                      className="text-xs sm:text-sm font-black font-play tracking-tight truncate"
                    >
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 dark:from-cyan-300 dark:via-blue-300 dark:to-indigo-300">
                        {isVi ? "Triết Lý Tầm Nhìn" : "Vision & Philosophy"}
                      </span>
                    </motion.h6>
                  </div>
                  <div className="relative text-center py-1.5 px-3 rounded-lg bg-blue-100/30 dark:bg-blue-900/20 border border-blue-200/30">
                    <h6 className="text-2xs sm:text-xs font-black italic text-blue-700 dark:text-cyan-300 leading-snug">
                      “Tận Tâm & Đồng Hành Cùng Trải Nghiệm Khách Hàng”
                    </h6>
                  </div>
                  <p className="text-3xs sm:text-2xs text-slate-700 dark:text-slate-350 leading-relaxed font-medium">
                    {isVi ? (
                      "Tôi luôn nỗ lực để mang lại sản phẩm, dịch vụ chất lượng cao với chi phí hợp lý. Và trên hết, để mỗi khách hàng cảm nhận được một điều đơn giản mà cốt lõi: Họ luôn được lắng nghe."
                    ) : (
                      "I always strive to deliver high-quality products and services at reasonable costs. And above all, so that every customer feels one simple yet core truth: They are always listened to."
                    )}
                  </p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

        {/* COLLABORATION BANNER (CÙNG TẠO TRẢI NGHIỆM) */}
        <div 
          style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 16px))" }}
          className={cn(
            "w-full relative overflow-hidden p-4 sm:p-5 lg:p-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 group/ctabanner border text-left bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-cyan-50/40 dark:from-slate-900/90 dark:via-slate-900/80 dark:to-indigo-950/50 border-blue-200/80 dark:border-white/12 backdrop-blur-2xl shadow-sm hover:shadow-md transition-all duration-300"
          )}
        >
              {/* Subtle Ambient Glow */}
              <div className="absolute -top-12 -left-12 w-40 h-40 bg-blue-500/15 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-indigo-500/15 dark:bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

              {/* Left Portion: Icon + Badge + Title + Subtitle */}
              <div className="relative z-10 flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 0.96, 1], y: [0, -2, 2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="shrink-0 p-2.5 rounded-2xl bg-blue-600/10 dark:bg-cyan-500/15 border border-blue-400/30 dark:border-cyan-400/30 shadow-xs"
                >
                  <Send className="w-6 h-6 text-blue-600 dark:text-cyan-400 stroke-[2.2] drop-shadow-sm" />
                </motion.div>

                <div className="flex flex-col min-w-0 text-left space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 dark:bg-cyan-500/20 text-blue-700 dark:text-cyan-200 text-[10px] sm:text-[11px] font-bold tracking-wider self-start font-mono border border-blue-500/20">
                    <Sparkles className="w-3 h-3 text-blue-600 dark:text-cyan-400" />
                    <span>{isVi ? "Hợp tác & Đồng hành" : "Collaboration & Partnership"}</span>
                  </div>

                  <motion.h3 
                    animate={{ opacity: [0.94, 1, 0.94] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-base sm:text-lg font-bold tracking-tight text-blue-950 dark:text-white leading-tight font-play"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 dark:from-cyan-300 dark:via-blue-300 dark:to-indigo-300">
                      {isVi ? "Cùng Tạo Trải Nghiệm" : "Shaping Customer Experience"}
                    </span>
                  </motion.h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 max-w-2xl font-medium leading-relaxed font-play">
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
                  style={{ borderRadius: "var(--theme-radius-button, 14px)" }}
                  className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white hover:shadow-[0_8px_25px_rgba(37,99,235,0.4)] transition-all flex items-center justify-between sm:justify-center gap-3 active:scale-95 cursor-pointer text-left shadow-md group/btn shrink-0 border border-white/20"
                >
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0 shadow-xs">
                    <MessagesSquare className="w-3.5 h-3.5 text-white" />
                  </div>

                  <div className="flex flex-col pr-1 min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-white leading-none tracking-wide whitespace-nowrap font-play">
                      {isVi ? "Kết nối với tôi" : "Connect with me"}
                    </span>
                    <span className="text-[10px] text-white/85 font-medium leading-none whitespace-nowrap mt-1 font-play">
                      {isVi ? "Trao đổi, chia sẻ cơ hội hợp tác" : "Explore partnership options"}
                    </span>
                  </div>

                  <ChevronRight className="w-4 h-4 stroke-[3] group-hover/btn:translate-x-1 transition-transform ml-1" />
                </button>
              </div>
            </div>

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
        {/* Extra Card Section: Tầm Nhìn & Giá Trị Cốt Lõi Lãnh Đạo */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{ borderRadius: "var(--theme-radius-card, 24px)" }}
          className="w-full rounded-3xl bg-gradient-to-br from-white/95 via-indigo-50/40 to-blue-50/50 dark:from-slate-900/90 dark:via-slate-900/95 dark:to-indigo-950/40 border border-indigo-200/80 dark:border-white/15 p-5 sm:p-6 md:p-7 flex flex-col gap-4 relative shadow-md text-left transition-all backdrop-blur-xl mt-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-indigo-200/60 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="text-base font-black font-play text-slate-900 dark:text-white">
                  {isVi ? "Tầm Nhìn & Giá Trị Cốt Lõi Lãnh Đạo" : "Leadership Vision & Core Values"}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isVi ? "Định hướng chiến lược phát triển dịch vụ khách hàng 2026+" : "Strategic guidance for CS operations 2026+"}
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-2xs font-mono font-bold bg-indigo-500/15 text-indigo-700 dark:text-cyan-300 border border-indigo-500/30">
              {isVi ? "Độc quyền • Chuẩn Quốc Tế" : "Exclusive • International Standard"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-indigo-100 dark:border-white/10 space-y-1.5 shadow-2xs">
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-cyan-400">01</span>
              <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                {isVi ? "Thấu Cảm Khách Hàng" : "Customer Empathy"}
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {isVi ? "Lắng nghe sâu sắc để chuyển hóa mọi điểm chạm thành lòng trung thành." : "Deep listening to turn every touchpoint into lasting loyalty."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-indigo-100 dark:border-white/10 space-y-1.5 shadow-2xs">
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-cyan-400">02</span>
              <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                {isVi ? "Vận Hành Bằng Dữ Liệu" : "Data-Driven Operations"}
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {isVi ? "Sử dụng Dashboard & AI phân tích thời gian thực để tối ưu năng suất." : "Real-time analytics and AI Dashboards for maximum productivity."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-indigo-100 dark:border-white/10 space-y-1.5 shadow-2xs">
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-cyan-400">03</span>
              <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                {isVi ? "Phát Triển Đội Ngũ Kế Thừa" : "Succession & Team Growth"}
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {isVi ? "Xây dựng hệ thống đào tạo quản lý cấp trung vững mạnh, bền vững." : "Building robust, self-sustaining middle management layers."}
              </p>
            </div>
          </div>
        </motion.div>

      </AnimatePresence>
    </section>

    {/* BẢN SAO THỨ 2 CỦA TRANG GIỚI THIỆU (DUPLICATED ABOUT SECTION INSTANCE) */}
    <section 
      id="about-instance-2" 
      className="relative w-full h-full flex flex-col justify-start items-stretch p-3 sm:p-4 md:p-5 font-sans text-slate-800 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar border-t border-slate-200/50 dark:border-white/10 pt-8"
    >
      <div className="w-full shrink-0 mb-3 relative z-30 max-w-7xl mx-auto">
        <PageCardHeader 
          pageId="about" 
          className="w-full h-full rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-white/70 dark:border-white/10 backdrop-blur-2xl shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center justify-between w-full text-2xs sm:text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 text-blue-600 dark:text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              {isVi ? "Thực chiến: 22+ Năm (Bản sao 2)" : "Track Record: 22+ Years (Copy 2)"}
            </span>
            <span className="text-slate-600 dark:text-slate-300 font-medium">
              {isVi ? "Lãnh đạo Vận hành • Trải nghiệm Khách hàng (CX) • Tối ưu hóa hiệu suất" : "CX Leadership • Operations • High Performance"}
            </span>
          </div>
        </PageCardHeader>
      </div>

      <div className="w-full flex-grow flex flex-col gap-[15px] max-w-7xl mx-auto justify-start">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ borderRadius: "var(--theme-radius-card, 24px)" }}
          className="w-full rounded-3xl bg-gradient-to-r from-[#F0F6FF] via-[#E8F1FD] to-[#F0F6FF] dark:from-slate-900/90 dark:via-slate-900/95 dark:to-slate-950/90 border border-blue-200/80 dark:border-white/15 p-5 sm:p-6 md:p-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 relative shadow-md text-left transition-all backdrop-blur-xl"
        >
          <div className="space-y-3 max-w-4xl min-w-0">
            <div className="flex items-center gap-2.5 min-w-0 pb-1 border-b border-blue-200/50 dark:border-white/10 w-fit">
              <User className="w-5.5 h-5.5 text-blue-600 dark:text-cyan-400 stroke-[2.3]" />
              <h5 className="text-base font-black font-play tracking-tight truncate">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-500 dark:from-cyan-300 dark:via-blue-300 dark:to-indigo-300">
                  {isVi ? "Giới Thiệu Bản Thân (Bản Sao 2)" : "About Myself (Copy 2)"}
                </span>
              </h5>
            </div>
            <p className="text-xs sm:text-[13px] md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {isVi ? (
                <>
                  Một chuyên gia dịch vụ khách hàng với hơn{" "}
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-700 dark:text-cyan-300 font-bold border border-blue-400/30 text-xs inline-block">
                    22 năm kinh nghiệm
                  </span>{" "}
                  thực chiến. Với tôi, Chăm Sóc Khách Hàng không chỉ là phục vụ, mà là sự đồng hành. Mỗi cuộc trò chuyện, mỗi khoảnh khắc, dù là nhỏ nhất, đều là một cơ hội quý giá để lắng nghe, để thấu hiểu, và để tạo ra những trải nghiệm vượt trên cả sự mong đợi.
                </>
              ) : (
                <>
                  A customer service expert with over{" "}
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-700 dark:text-cyan-300 font-bold border border-blue-400/30 text-xs inline-block">
                    22 years of experience
                  </span>{" "}
                  hands-on. For me, Customer Care is not just service, but true companionship.
                </>
              )}
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0 self-end md:self-center pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-blue-200/60 dark:border-white/10 md:pl-6">
            <span className="font-[Caveat,cursive] text-blue-600 dark:text-cyan-400 text-2xl font-bold select-none transform -rotate-3 block whitespace-nowrap">
              Luôn bên bạn ♡
            </span>
            <div className="transform scale-90 select-none pointer-events-none shrink-0">
              <CuteMouseMascot className="scale-90" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
}
