import React, { useState, useRef, useCallback, useEffect } from "react";
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
  Clock,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Award
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

        {/* Radiating Greeting Rays Left */}
        <g stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" opacity="0.9">
          <line x1="22" y1="42" x2="11" y2="33" />
          <line x1="17" y1="56" x2="6" y2="56" />
          <line x1="22" y1="70" x2="11" y2="79" />
        </g>
        {/* Radiating Greeting Rays Right */}
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
        <ellipse cx="80" cy="120" rx="20" ry="22" fill="#F8FAFC" opacity="0.9" />

        {/* Head */}
        <ellipse cx="80" cy="80" rx="36" ry="32" fill="url(#mouseHeadGrad)" stroke="#8A90A0" strokeWidth="0.8" />

        {/* Rosy Blushing Cheeks */}
        <ellipse cx="54" cy="86" rx="9" ry="6" fill="url(#cheekGrad)" />
        <ellipse cx="106" cy="86" rx="9" ry="6" fill="url(#cheekGrad)" />

        {/* Eyes */}
        <ellipse cx="64" cy="74" rx="6.5" ry="8" fill="url(#eyeGrad)" />
        <ellipse cx="62" cy="71" rx="2.5" ry="3" fill="#FFFFFF" />
        <circle cx="66" cy="77" r="1.2" fill="#FFFFFF" opacity="0.9" />

        <ellipse cx="96" cy="74" rx="6.5" ry="8" fill="url(#eyeGrad)" />
        <ellipse cx="94" cy="71" rx="2.5" ry="3" fill="#FFFFFF" />
        <circle cx="98" cy="77" r="1.2" fill="#FFFFFF" opacity="0.9" />

        {/* Nose */}
        <ellipse cx="80" cy="84" rx="4" ry="3" fill="#FF4E6B" />
        <ellipse cx="79.5" cy="83.2" rx="1.5" ry="1" fill="#FFFFFF" opacity="0.8" />

        {/* Smile */}
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

        {/* Paws */}
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

  // Slide state management (4 Slides)
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL_SLIDES = 4;

  const handleNextSlide = useCallback(() => {
    playUiSound("click");
    setCurrentSlide((prev) => (prev < TOTAL_SLIDES - 1 ? prev + 1 : 0));
  }, []);

  const handlePrevSlide = useCallback(() => {
    playUiSound("click");
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : TOTAL_SLIDES - 1));
  }, []);

  // Listen to global slide navigation events (fired by edge navigation buttons)
  useEffect(() => {
    const handleNext = () => handleNextSlide();
    const handlePrev = () => handlePrevSlide();

    window.addEventListener("app-slide-next", handleNext);
    window.addEventListener("app-slide-prev", handlePrev);

    return () => {
      window.removeEventListener("app-slide-next", handleNext);
      window.removeEventListener("app-slide-prev", handlePrev);
    };
  }, [handleNextSlide, handlePrevSlide]);

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

  const SLIDE_TITLES = [
    { vi: "Slide 01 • Hồ sơ Lãnh đạo", en: "Slide 01 • Leader Profile" },
    { vi: "Slide 02 • Nhân khẩu học & Liên hệ", en: "Slide 02 • Demographics & Contact" },
    { vi: "Slide 03 • Triết lý & Giá trị cốt lõi", en: "Slide 03 • Philosophy & Values" },
    { vi: "Slide 04 • Năng lực Vận hành", en: "Slide 04 • Operational Mastery" }
  ];

  return (
    <section 
      id="about" 
      className="relative w-full h-full flex flex-col justify-start items-stretch p-[12px] sm:p-[15px] font-sans text-slate-800 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar"
    >
      <div className="w-full flex-grow flex flex-col gap-[12px] sm:gap-[15px] max-w-7xl mx-auto justify-start">

        {/* Page Header */}
        <PageCardHeader pageId="about" />

        {/* Slide Presentation Sub-Header Controls */}
        <div className="w-full flex items-center justify-between gap-2 p-2 sm:p-2.5 rounded-2xl bg-white/70 dark:bg-slate-900/80 border border-white/60 dark:border-white/15 backdrop-blur-xl shadow-sm">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-blue-500/15 text-blue-600 dark:text-cyan-400 font-bold text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>{isVi ? SLIDE_TITLES[currentSlide].vi : SLIDE_TITLES[currentSlide].en}</span>
            </span>
          </div>

          {/* Slide Switch Controls */}
          <div className="flex items-center gap-2">
            <span className="text-2xs sm:text-xs font-mono font-black text-cyan-500 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
              0{currentSlide + 1} / 0{TOTAL_SLIDES}
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevSlide}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-200/80 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                title={isVi ? "Slide trước" : "Previous slide"}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-200/80 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                title={isVi ? "Slide tiếp" : "Next slide"}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Slide Dots Indicator Bar */}
        <div className="w-full flex items-center justify-center gap-2 py-0.5">
          {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                playUiSound("click");
                setCurrentSlide(idx);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                idx === currentSlide 
                  ? "w-8 bg-blue-600 dark:bg-cyan-400 shadow-sm" 
                  : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
              )}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* SLIDE CONTENT CONTAINER WITH ANIMATE PRESENCE */}
        <AnimatePresence mode="wait">
          
          {/* SLIDE 0: HỒ SƠ LÃNH ĐẠO & TỔNG QUAN */}
          {currentSlide === 0 && (
            <motion.div
              key="slide-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 w-full items-stretch"
            >
              {/* Main Hero Video Card */}
              <div 
                style={{ borderRadius: "var(--theme-radius-card, 24px)" }}
                className="lg:col-span-8 w-full relative overflow-hidden border border-white/60 dark:border-white/15 bg-gradient-to-br from-[#0c1329] via-[#0f172a] to-[#080d1e] shadow-xl min-h-[440px] p-5 sm:p-7 md:p-8 flex flex-col justify-between group rounded-3xl"
              >
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full filter blur-[100px] pointer-events-none" />

                <div className="absolute inset-0 z-0 overflow-hidden">
                  <video
                    ref={videoRef}
                    src={isPlayingIntro ? ABOUT_INTRO_VIDEO_URL : ABOUT_IDLE_VIDEO_URL}
                    className="w-full h-full object-cover object-center brightness-105 opacity-65 sm:opacity-80 transition-opacity duration-500"
                    autoPlay
                    loop={!isPlayingIntro}
                    muted={isVideoMuted}
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleVideoEnded}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0c1329]/95 via-[#0c1329]/65 to-transparent pointer-events-none" />
                </div>

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

                <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-5 items-center flex-grow">
                  <div className="md:col-span-7 flex flex-col justify-center items-start text-left space-y-3">
                    <div className="flex flex-col items-start w-full gap-1.5 pb-2">
                      <div className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-cyan-300 stroke-[2.2]" />
                        <h4 className="text-sm sm:text-base font-extrabold text-cyan-300 font-play tracking-wide">
                          {isVi ? "Trợ lý ảo thông minh" : "Smart virtual assistant"}
                        </h4>
                      </div>
                      <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent rounded-full" />
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-[32px] font-black text-white font-play tracking-tight leading-tight">
                      {isVi ? (
                        <>
                          Xin chào,
                          <br />
                          <span className="text-white">Tôi là Nguyễn Hùng Thái</span>
                          <br />
                          <span className="text-cyan-400">CX & CS Executive Leader</span>
                        </>
                      ) : (
                        <>
                          Hello,
                          <br />
                          <span className="text-white">I am Nguyen Hung Thai</span>
                          <br />
                          <span className="text-cyan-400">CX & CS Executive Leader</span>
                        </>
                      )}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-slate-200/90 font-medium leading-relaxed max-w-sm">
                      {isVi 
                        ? "Lãnh đạo bằng sự thấu hiểu, bứt phá nhờ công nghệ. Tối ưu hóa trải nghiệm khách hàng & quy trình vận hành doanh nghiệp."
                        : "Leading with empathy, driving breakthroughs through technology. Optimizing CX, CS and operational excellence."}
                    </p>

                    <div className="pt-2 flex items-center gap-2.5 flex-wrap">
                      <HeroIntroButton
                        isPlayingIntro={isPlayingIntro}
                        isAudioOn={!isVideoMuted}
                        onToggleAudio={toggleVideoMute}
                        onPlayIntro={handlePlayIntro}
                        onCancelIntro={handleCancelIntro}
                        lang={lang}
                        label={isVi ? "Bắt đầu trải nghiệm" : "Start Experience"}
                        className="h-[44px]"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          playUiSound("click");
                          togglePlayPause();
                        }}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer shadow-md"
                        title={isVideoPaused ? (isVi ? "Tiếp tục phát" : "Play") : (isVi ? "Tạm dừng" : "Pause")}
                      >
                        {isVideoPaused ? <Play className="w-4 h-4 fill-white text-white ml-0.5" /> : <Pause className="w-4 h-4 text-white" />}
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-5 flex flex-col gap-2 w-full max-w-[200px] ml-auto">
                    {ABOUT_PROFILE_STATS.map((stat) => {
                      const IconComp = getLucideIcon(stat.iconName);
                      return (
                        <div 
                          key={stat.id}
                          className="bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 p-2 rounded-xl shadow-md flex items-center gap-2.5 text-left transition-all"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-500/25 border border-blue-400/40 flex items-center justify-center text-cyan-300 shrink-0">
                            <IconComp className="w-4 h-4 stroke-[2.2]" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[10px] font-semibold text-slate-300 truncate">
                              {isVi ? stat.labelVi : stat.labelEn}
                            </span>
                            <span className="text-sm font-black text-white font-mono leading-none">
                              {stat.metric} <span className="text-[10px] text-cyan-400">{isVi ? stat.unitVi : stat.unitEn}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Mascot & Brief Intro Card */}
              <div 
                style={{ borderRadius: "var(--theme-radius-card, 24px)" }}
                className={cn(
                  "lg:col-span-4 w-full p-6 flex flex-col items-center justify-between text-center relative overflow-hidden border transition-all",
                  getGlassCardClass()
                )}
              >
                <CuteMouseMascot />
                <div className="space-y-2 relative z-10 my-auto">
                  <h4 className="text-lg font-black font-play text-slate-900 dark:text-white">
                    {isVi ? "Nguyễn Hùng Thái" : "Nguyen Hung Thai"}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    {isVi 
                      ? "22+ Năm kinh nghiệm kiến tạo văn hóa dịch vụ khách hàng xuất sắc & chuyển đổi số quy trình vận hành."
                      : "22+ Years of experience building customer service excellence and digital operational transformation."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleNextSlide()}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{isVi ? "Xem nhân khẩu học" : "View Demographics"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SLIDE 1: NHÂN KHẨU HỌC & LIÊN HỆ */}
          {currentSlide === 1 && (
            <motion.div
              key="slide-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 w-full items-stretch"
            >
              {/* Demographics Details Grid */}
              <div 
                style={{ borderRadius: "var(--theme-radius-card, 24px)" }}
                className={cn(
                  "lg:col-span-8 w-full p-6 sm:p-8 flex flex-col justify-between border relative overflow-hidden transition-all",
                  getGlassCardClass()
                )}
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                    <h3 className="text-lg font-black font-play text-slate-900 dark:text-white">
                      {isVi ? "Thông tin Nhân khẩu học & Lý lịch" : "Personal Demographics & Background"}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 border border-blue-500/20">
                    22+ Yrs Exp
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
                  {PERSONAL_DEMOGRAPHICS.map((item) => {
                    const IconComponent = getLucideIcon(item.iconName);
                    return (
                      <div
                        key={item.id}
                        className={cn(
                          "p-3.5 rounded-xl border flex items-center gap-3 transition-all",
                          item.colorTheme.bg,
                          item.colorTheme.border
                        )}
                      >
                        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs", item.colorTheme.iconBg)}>
                          <IconComponent className={cn("w-4.5 h-4.5", item.colorTheme.iconColor)} />
                        </div>
                        <div className="flex flex-col min-w-0 text-left">
                          <span className={cn("text-3xs font-bold uppercase tracking-wider", item.colorTheme.labelColor)}>
                            {isVi ? item.labelVi : item.labelEn}
                          </span>
                          <span className={cn("text-xs font-extrabold truncate", item.colorTheme.valueColor)}>
                            {isVi ? item.valueVi : item.valueEn}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-200/80 dark:border-white/10 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleNavigate("contact")}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isVi ? "Gửi tin nhắn trực tiếp" : "Send Direct Message"}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handlePrevSlide()}
                      className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 transition-all cursor-pointer"
                    >
                      {isVi ? "Trờ lại" : "Back"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNextSlide()}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-md hover:from-emerald-500 hover:to-teal-500 transition-all cursor-pointer flex items-center gap-1"
                    >
                      <span>{isVi ? "Xem triết lý" : "View Philosophy"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Direct Quick Contact Card */}
              <div 
                style={{ borderRadius: "var(--theme-radius-card, 24px)" }}
                className={cn(
                  "lg:col-span-4 w-full p-6 flex flex-col justify-between border relative overflow-hidden transition-all",
                  getGlassCardClass()
                )}
              >
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200/80 dark:border-white/10">
                    <Mail className="w-5 h-5 text-indigo-500 dark:text-cyan-400" />
                    <h4 className="text-base font-black font-play text-slate-900 dark:text-white">
                      {isVi ? "Kênh liên hệ chính thức" : "Official Contact Channels"}
                    </h4>
                  </div>

                  <a 
                    href="mailto:trinhan.virtual@gmail.com" 
                    className="p-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/25 flex items-center gap-3 text-left transition-all group"
                  >
                    <Mail className="w-5 h-5 text-indigo-500 dark:text-indigo-400 shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-3xs font-bold text-slate-500 dark:text-slate-400">Email</span>
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white truncate group-hover:text-indigo-500">
                        trinhan.virtual@gmail.com
                      </span>
                    </div>
                  </a>

                  <a 
                    href="tel:0903333333" 
                    className="p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 flex items-center gap-3 text-left transition-all group"
                  >
                    <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-3xs font-bold text-slate-500 dark:text-slate-400">Hotline / Zalo</span>
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white truncate group-hover:text-emerald-500">
                        +84 (0) 903 333 333
                      </span>
                    </div>
                  </a>

                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/25 flex items-center gap-3 text-left transition-all group"
                  >
                    <Linkedin className="w-5 h-5 text-blue-500 shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-3xs font-bold text-slate-500 dark:text-slate-400">LinkedIn Profile</span>
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white truncate group-hover:text-blue-500">
                        linkedin.com/in/nguyenhungthai
                      </span>
                    </div>
                  </a>
                </div>

                <div className="pt-4 text-xs font-semibold text-slate-500 dark:text-slate-400 text-center border-t border-slate-200/80 dark:border-white/10">
                  {isVi ? "Phản hồi tin nhắn trong vòng 2 giờ làm việc" : "Response within 2 working hours"}
                </div>
              </div>
            </motion.div>
          )}

          {/* SLIDE 2: TRIẾT LÝ DỊCH VỤ & GIÁ TRỊ CỐT LÕI */}
          {currentSlide === 2 && (
            <motion.div
              key="slide-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="w-full flex flex-col gap-4"
            >
              <div 
                style={{ borderRadius: "var(--theme-radius-card, 24px)" }}
                className={cn(
                  "w-full p-6 sm:p-8 flex flex-col border relative overflow-hidden transition-all",
                  getGlassCardClass()
                )}
              >
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200/80 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600 dark:text-cyan-400" />
                    <h3 className="text-lg sm:text-xl font-black font-play text-slate-900 dark:text-white">
                      {isVi ? "Triết lý Dịch vụ & 4 Trụ cột Giá trị Cốt lõi" : "Service Philosophy & 4 Core Pillars"}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-cyan-400 border border-purple-500/20">
                    Values & Pillars
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {SERVICE_PHILOSOPHY_VALUES.map((val) => (
                    <div
                      key={val.id}
                      className={cn(
                        "p-5 rounded-2xl border flex flex-col justify-between text-left relative overflow-hidden group hover:scale-[1.02] transition-all duration-300",
                        val.bgGradient,
                        val.borderClass
                      )}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className={cn("text-xs font-mono font-black px-2.5 py-0.5 rounded-full", val.badgeBg, val.badgeText)}>
                          {val.number}
                        </span>
                        <Zap className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors" />
                      </div>

                      <h4 className={cn("text-base font-black font-play mb-2", val.titleColor)}>
                        {isVi ? val.titleVi : val.titleEn}
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                        {isVi ? val.descVi : val.descEn}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 flex items-center justify-between border-t border-slate-200/80 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => handlePrevSlide()}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 transition-all cursor-pointer"
                  >
                    {isVi ? "Trở lại" : "Back"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNextSlide()}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold shadow-md hover:from-blue-500 hover:to-purple-500 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{isVi ? "Xem năng lực vận hành" : "View Operational Mastery"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* SLIDE 3: NĂNG LỰC VẬN HÀNH & THÀNH TỰU */}
          {currentSlide === 3 && (
            <motion.div
              key="slide-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 w-full items-stretch"
            >
              <div 
                style={{ borderRadius: "var(--theme-radius-card, 24px)" }}
                className={cn(
                  "lg:col-span-8 w-full p-6 sm:p-8 flex flex-col justify-between border relative overflow-hidden transition-all",
                  getGlassCardClass()
                )}
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-black font-play text-slate-900 dark:text-white">
                      {isVi ? "Dấu ấn Thành tựu & Năng lực Quản trị Vận hành" : "Career Milestones & Operational Excellence"}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    Operational Mastery
                  </span>
                </div>

                <div className="space-y-3.5 my-4">
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-left flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                        {isVi ? "Quản trị Contact Center Quy mô 500+ Nhân sự" : "Contact Center Leadership 500+ Headcount"}
                      </h4>
                      <p className="text-2xs sm:text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                        {isVi 
                          ? "Điều hành hệ thống tổng đài đa kênh (Voice, Live Chat, Social Media, Email Ticketing) với chỉ số ổn định SLA 99.5%."
                          : "Managing multi-channel contact center systems (Voice, Chat, Email) maintaining 99.5% SLA stability."}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-left flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                        {isVi ? "Tối ưu Chỉ số Giải quyết Lần đầu (FCR > 90%)" : "First Contact Resolution Optimization (FCR > 90%)"}
                      </h4>
                      <p className="text-2xs sm:text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                        {isVi 
                          ? "Chuẩn hóa quy trình xử lý yêu cầu khách hàng, giảm tỷ lệ cuộc gọi lặp lại và gia tăng chỉ số CSAT & NPS."
                          : "Standardizing resolution workflows, reducing call repetition and increasing CSAT & NPS ratings."}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-left flex items-start gap-3">
                    <Bot className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                        {isVi ? "Ứng dụng AI & Tự động hóa CRM 24/7" : "AI & 24/7 CRM Automation Deployment"}
                      </h4>
                      <p className="text-2xs sm:text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                        {isVi 
                          ? "Tích hợp trợ lý ảo Voicebot/Chatbot tự động giải đáp 60%+ thắc mắc thường gặp của khách hàng."
                          : "Integrating virtual Voicebot/Chatbot assistants resolving 60%+ frequent customer inquiries automatically."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-slate-200/80 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => handlePrevSlide()}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 transition-all cursor-pointer"
                  >
                    {isVi ? "Trở lại" : "Back"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigate("projects")}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold shadow-md hover:from-blue-500 hover:to-indigo-500 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{isVi ? "Xem các dự án nổi bật" : "View Featured Projects"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Summary Profile Badge Card */}
              <div 
                style={{ borderRadius: "var(--theme-radius-card, 24px)" }}
                className={cn(
                  "lg:col-span-4 w-full p-6 flex flex-col justify-between border relative overflow-hidden transition-all text-center",
                  getGlassCardClass()
                )}
              >
                <div className="space-y-3 my-auto">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
                    <Award className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-black font-play text-slate-900 dark:text-white">
                    {isVi ? "Cam kết Chất lượng" : "Quality Commitment"}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    {isVi 
                      ? "Mang lại giá trị bền vững cho doanh nghiệp và trải nghiệm tuyệt vời nhất cho từng khách hàng."
                      : "Delivering sustainable business value and extraordinary experiences for every customer."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentSlide(0)}
                  className="w-full py-2.5 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-white font-bold text-xs transition-all cursor-pointer"
                >
                  {isVi ? "Xem lại từ Slide 1" : "Restart from Slide 1"}
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
