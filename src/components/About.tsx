import React, { useState, useRef } from "react";
import { 
  User, Heart, Leaf, Target, TrendingUp, Building2,
  Briefcase, Bot, MapPin, ChevronRight, ArrowRight, Clock,
  Send, FileText, Settings, Database, Cpu, Star, Compass,
  Share2, Users, Calendar, Home, BarChart3, Eye, Quote,
  MessagesSquare, Sparkles
} from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../i18n";
import { HeroIntroButton } from "./HeroIntroButton";

const ABOUT_IDLE_VIDEO_URL = "https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4";
const ABOUT_INTRO_VIDEO_URL = "https://cdn.scena.ai/project/8606/5f84521bf5c51ff234fb0f4029fb9fba29e7e386f13912a56bc7ee25aebcbc10.mp4";

export default function About() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  // Video State & Controls
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingIntro, setIsPlayingIntro] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const handlePlayIntro = () => {
    setIsPlayingIntro(true);
    setIsVideoMuted(false);
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

  const handleNavigate = (sectionId: string) => {
    window.dispatchEvent(new CustomEvent("app-navigate", { detail: sectionId }));
  };

  return (
    <section 
      id="about" 
      className="relative w-full min-h-full flex flex-col justify-start items-center p-3 xs:p-3.5 sm:p-4.5 md:p-6 lg:p-8 font-sans text-slate-800 dark:text-slate-100"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">

        {/* 1. TOP HEADER BANNER CARD - HIGH-FIDELITY RECONSTRUCTION OF HEADER */}
        <div className="w-full flex flex-col gap-3 pb-2 shrink-0 font-sans">
          <div className="flex items-center justify-between gap-3 flex-wrap md:flex-nowrap">
            {/* Left side: Giới thiệu & Clock Pill */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40">
                <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center text-blue-600 dark:text-cyan-400">
                  <Home className="w-4 h-4" />
                </div>
                <h4 className="text-lg font-extrabold text-blue-700 dark:text-cyan-300">
                  {isVi ? "Giới thiệu" : "About Me"}
                </h4>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 dark:bg-cyan-500/15 border border-blue-200/50 dark:border-cyan-500/30 text-xs font-mono font-bold text-blue-700 dark:text-cyan-300 shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400 shrink-0" />
                <span className="whitespace-nowrap">{isVi ? "-3 phút đọc" : "~3 min read"}</span>
              </div>
            </div>

            {/* Right side: Quote container */}
            <div className="flex items-center gap-2 md:ml-auto min-w-0 max-w-full">
              <div className="px-4 py-2 rounded-full bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-xs sm:text-sm font-bold italic text-blue-700 dark:text-cyan-300 flex items-center gap-2.5 max-w-full shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-blue-600 dark:bg-cyan-500 flex items-center justify-center shrink-0">
                  <Quote className="w-3 h-3 text-white fill-white stroke-[2]" />
                </div>
                <span className="truncate max-w-[260px] xs:max-w-[320px] sm:max-w-[420px] md:max-w-[540px] lg:max-w-[660px]">
                  {isVi 
                    ? "Lãnh đạo bằng sự thấu cảm, tối ưu hóa hiệu suất vận hành và gắn kết con người."
                    : "Leading with empathy, optimizing operations, and fostering human connections."}
                </span>
              </div>
            </div>
          </div>

          {/* Separating line */}
          <div className="h-[1.5px] w-full bg-blue-500/20 dark:bg-cyan-500/15" />

          {/* Subtitle / Subheader indicator with bookmark */}
          <div className="flex items-center gap-2 pt-1 w-full relative">
            <div className="flex items-center">
              {/* Bookmark Flag shape */}
              <div className="w-2.5 h-6 bg-blue-600 dark:bg-cyan-400 rounded-l-md shrink-0 relative">
                <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-blue-700 dark:bg-cyan-500 rounded-l-sm" />
              </div>
              <span className="text-xs font-bold text-blue-700 dark:text-cyan-300 bg-blue-500/10 dark:bg-cyan-500/10 px-3 py-1 rounded-r-full border-y border-r border-blue-500/20 dark:border-cyan-500/20 shadow-3xs">
                {isVi ? "22+ Năm kinh nghiệm CX & CS" : "22+ Years CX & Operations Experience"}
              </span>
            </div>

            {/* Subtle dots layout on right */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex gap-1.5 opacity-25">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            </div>
          </div>
        </div>

        {/* 2. HERO PROFILE VIDEO & PERSONAL INFORMATION ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 lg:gap-6 items-stretch w-full">
          
          {/* Left Column: Video Card (7 columns) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-white/60 dark:border-white/15 bg-slate-950/90 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.15)] min-h-[320px] sm:min-h-[460px] flex items-center justify-center group"
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
              onEnded={handleVideoEnded}
            />

            {/* Subtle Gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* ========================================================================= */}
            {/* CÁC THẺ DẤU ẤN VẬN HÀNH LƠ LỬNG CHUYỂN ĐỘNG TẠI CHỖ XUNG QUANH VIDEO */}
            {/* ========================================================================= */}

            {/* 1. Top-Left Floating Badge: 22+ Năm (CX & CS Leadership) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 pointer-events-auto bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-blue-400/30 dark:border-cyan-400/40 rounded-2xl p-2 sm:p-3 shadow-lg hover:scale-105 transition-all flex items-center gap-3 max-w-[170px] sm:max-w-[210px]"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 shadow-inner">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 truncate leading-none uppercase">
                  {isVi ? "Kinh nghiệm CX & CS" : "CX & CS Exp"}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5 sm:mt-1">
                  <span className="text-base sm:text-xl font-black text-blue-600 dark:text-cyan-400 tracking-tight">
                    22+
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-black text-blue-500 dark:text-cyan-400 tracking-wider">
                    {isVi ? "NĂM" : "YEARS"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 2. Top-Right Floating Badge: 8+ Môi trường (Enterprise Scale) */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 pointer-events-auto bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-purple-400/30 dark:border-purple-400/40 rounded-2xl p-2 sm:p-3 shadow-lg hover:scale-105 transition-all flex items-center gap-3 max-w-[170px] sm:max-w-[210px]"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-inner">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 truncate leading-none uppercase">
                  {isVi ? "Quy mô lớn" : "Large Scale"}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5 sm:mt-1">
                  <span className="text-base sm:text-xl font-black text-purple-600 dark:text-purple-400 tracking-tight">
                    8+
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-black text-purple-500 dark:text-purple-400 tracking-wider">
                    {isVi ? "MÔI TRƯỜNG" : "ENV."}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 3. Middle-Right Floating Badge: 24/7 AI CRM (Smart Automation) */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1.0 }}
              className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-5 z-20 pointer-events-auto bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-rose-400/30 dark:border-rose-400/40 rounded-2xl p-2 sm:p-3 shadow-lg hover:scale-105 transition-all flex items-center gap-3 max-w-[170px] sm:max-w-[210px]"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 shadow-inner">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 truncate leading-none uppercase">
                  {isVi ? "Tự động hóa" : "Automation"}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5 sm:mt-1">
                  <span className="text-base sm:text-xl font-black text-rose-600 dark:text-rose-400 tracking-tight">
                    24/7
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-black text-rose-500 dark:text-rose-400 tracking-wider">
                    AI CRM
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 4. Bottom-Right Floating Badge: 99% CSAT (Customer Satisfaction) */}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4.0, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 z-20 pointer-events-auto bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-emerald-400/30 dark:border-emerald-400/40 rounded-2xl p-2 sm:p-3 shadow-lg hover:scale-105 transition-all flex items-center gap-3 max-w-[170px] sm:max-w-[210px]"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 truncate leading-none uppercase">
                  {isVi ? "Hài lòng KH" : "Satisfaction"}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5 sm:mt-1">
                  <span className="text-base sm:text-xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                    99%
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-black text-emerald-500 dark:text-emerald-400 tracking-wider">
                    CSAT
                  </span>
                </div>
              </div>
            </motion.div>

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

          {/* Right Column: Contact Info Card (3 columns) */}
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-3 h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-white/80 dark:border-cyan-400/35 p-4 sm:p-5 shadow-[0_16px_40px_rgba(99,102,241,0.06)] hover:dark:border-cyan-400/60 transition-all duration-300 flex flex-col justify-start gap-4 min-w-0"
          >
            {/* Header */}
            <div className="flex flex-col gap-2 pb-1 font-sans">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center text-blue-600 dark:text-cyan-400 shrink-0">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                  </div>
                  <h6 className="text-base sm:text-lg font-extrabold tracking-tight text-blue-600 dark:text-cyan-400">
                    {isVi ? "Thông tin cá nhân" : "Personal profile"}
                  </h6>
                </div>
                <ChevronRight className="w-5 h-5 text-blue-500/70" />
              </div>
              <div className="h-[2px] w-full bg-blue-500/30 dark:bg-cyan-500/20" />
            </div>

            {/* List of Demographic info */}
            <div className="flex flex-col gap-2 pr-0.5">
              
              {/* 1. Giới tính */}
              <div className="p-2.5 rounded-2xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100/80 dark:border-blue-900/45 flex items-center justify-between hover:border-blue-300 transition-all min-w-0 group/item">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8.5 h-8.5 rounded-xl border border-blue-400/30 bg-blue-500/15 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 shadow-2xs">
                    <User className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">
                      {isVi ? "GIỚI TÍNH" : "GENDER"}
                    </span>
                    <span className="text-xs font-black text-blue-900 dark:text-cyan-300">
                      {isVi ? "Nam giới" : "Male"}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-400 group-hover/item:translate-x-1 transition-transform shrink-0" />
              </div>

              {/* 2. Dân tộc */}
              <div className="p-2.5 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100/80 dark:border-indigo-900/45 flex items-center justify-between hover:border-indigo-300 transition-all min-w-0 group/item">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8.5 h-8.5 rounded-xl border border-indigo-400/30 bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 shadow-2xs">
                    <Users className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">
                      {isVi ? "DÂN TỘC" : "ETHNICITY"}
                    </span>
                    <span className="text-xs font-black text-indigo-900 dark:text-indigo-300">
                      {isVi ? "Kinh" : "Kinh"}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-indigo-400 group-hover/item:translate-x-1 transition-transform shrink-0" />
              </div>

              {/* 3. Tình trạng */}
              <div className="p-2.5 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100/80 dark:border-rose-900/45 flex items-center justify-between hover:border-rose-300 transition-all min-w-0 group/item">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8.5 h-8.5 rounded-xl border border-rose-400/30 bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 shadow-2xs">
                    <Heart className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">
                      {isVi ? "TÌNH TRẠNG" : "STATUS"}
                    </span>
                    <span className="text-xs font-black text-rose-900 dark:text-rose-300">
                      {isVi ? "Độc thân" : "Single"}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-rose-400 group-hover/item:translate-x-1 transition-transform shrink-0" />
              </div>

              {/* 4. Sinh nhật */}
              <div className="p-2.5 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-100/80 dark:border-amber-900/45 flex items-center justify-between hover:border-amber-300 transition-all min-w-0 group/item">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8.5 h-8.5 rounded-xl border border-amber-400/30 bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-2xs">
                    <Calendar className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
                      {isVi ? "SINH NHẬT" : "DATE OF BIRTH"}
                    </span>
                    <span className="text-xs font-black text-amber-900 dark:text-amber-300">
                      22/06/1984
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-400 group-hover/item:translate-x-1 transition-transform shrink-0" />
              </div>

              {/* 5. Tạm trú */}
              <div className="p-2.5 rounded-2xl bg-purple-50/40 dark:bg-purple-950/20 border border-purple-100/80 dark:border-purple-900/45 flex items-center justify-between hover:border-purple-300 transition-all min-w-0 group/item">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8.5 h-8.5 rounded-xl border border-purple-400/30 bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-2xs">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-purple-500 uppercase tracking-wider">
                      {isVi ? "TẠM TRÚ" : "RESIDENCE"}
                    </span>
                    <span className="text-xs font-black text-purple-900 dark:text-purple-300" title="Q7, Hồ Chí Minh">
                      Q7, Hồ Chí Minh
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-purple-400 group-hover/item:translate-x-1 transition-transform shrink-0" />
              </div>

              {/* 6. Cư trú */}
              <div className="p-2.5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100/80 dark:border-emerald-900/45 flex items-center justify-between hover:border-emerald-300 transition-all min-w-0 group/item">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8.5 h-8.5 rounded-xl border border-emerald-400/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-2xs">
                    <Home className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
                      {isVi ? "CƯ TRÚ" : "HOMETOWN"}
                    </span>
                    <span className="text-xs font-black text-emerald-900 dark:text-emerald-300" title="Mỹ Tho, Tiền Giang">
                      Mỹ Tho, Tiền Giang
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-400 group-hover/item:translate-x-1 transition-transform shrink-0" />
              </div>

            </div>

          </motion.div>

        </div>

        {/* 3. BENTO GRID 3 COLUMNS: ABOUT ME | OPERATIONAL PILLARS | PHILOSOPHY & VISION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch w-full">
          
          {/* COLUMN 1: GIỚI THIỆU BẢN THÂN TÔI (ABOUT ME) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/90 dark:bg-slate-900/85 border border-slate-200/90 dark:border-slate-800/90 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-5 text-left"
          >
            {/* Header Cột 1 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25 shrink-0">
                    <User className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-base sm:text-lg font-black text-blue-950 dark:text-white leading-tight">
                      {isVi ? "Giới thiệu bản thân tôi" : "About Me"}
                    </h4>
                    <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                      ABOUT ME
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              </div>
              <div className="h-[1.5px] w-full bg-slate-100 dark:bg-slate-800" />
            </div>

            {/* Paragraph with inline badge for 22 năm kinh nghiệm */}
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed text-justify flex-1">
              <p>
                {isVi ? (
                  <>
                    Một chuyên gia dịch vụ khách hàng với hơn{" "}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-black text-xs mx-1 shadow-sm">
                      22 năm kinh nghiệm
                    </span>{" "}
                    thực chiến. Với tôi, Chăm Sóc Khách Hàng không chỉ là phục vụ, mà là sự đồng hành. Mỗi cuộc trò chuyện, mỗi khoảnh khắc, dù là nhỏ nhất, đều là một cơ hội quý giá: để lắng nghe, để thấu hiểu, và để tạo ra những trải nghiệm vượt trên cả sự mong đợi.
                  </>
                ) : (
                  <>
                    A customer service expert with over{" "}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-black text-xs mx-1 shadow-sm">
                      22 years of experience
                    </span>{" "}
                    in real-world operations. For me, Customer Service is not just support, but true companionship.
                  </>
                )}
              </p>
            </div>

            {/* Giá trị cốt lõi Card */}
            <div className="relative p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 shadow-2xs flex flex-col gap-2 mt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6.5 h-6.5 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-xs">
                    <Heart className="w-3.5 h-3.5 fill-white" />
                  </div>
                  <span className="text-xs sm:text-sm font-black text-orange-600 dark:text-orange-400 uppercase">
                    {isVi ? "Giá trị cốt lõi" : "Core Value"}
                  </span>
                </div>
                {/* 3 yellow/orange dots in right */}
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                </div>
              </div>

              <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                {isVi ? (
                  <>
                    Tôi tin rằng sự hài lòng không đến từ sự hoàn hảo tuyệt đối, mà đến từ{" "}
                    <span className="font-black text-orange-600 dark:text-orange-400 underline decoration-orange-300 decoration-2 underline-offset-2">
                      sự tận tâm kịp thời
                    </span>{" "}
                    và{" "}
                    <span className="font-black text-rose-600 dark:text-rose-400 underline decoration-rose-300 decoration-2 underline-offset-2">
                      đồng cảm chân thành
                    </span>
                    .
                  </>
                ) : (
                  <>
                    I believe satisfaction comes from{" "}
                    <span className="font-black text-orange-600">timely dedication</span> and{" "}
                    <span className="font-black text-rose-600">heartfelt empathy</span>.
                  </>
                )}
              </p>
            </div>
          </motion.div>

          {/* COLUMN 2: BA TRỤ CỘT VẬN HÀNH (OPERATIONAL PILLARS) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/90 dark:bg-slate-900/85 border border-slate-200/90 dark:border-slate-800/90 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-5 text-left"
          >
            {/* Header Cột 2 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25 shrink-0">
                    <Target className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-base sm:text-lg font-black text-blue-950 dark:text-white leading-tight">
                      {isVi ? "Ba trụ cột vận hành" : "Operational Pillars"}
                    </h4>
                    <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                      OPERATIONAL PILLARS
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              </div>
              <div className="h-[1.5px] w-full bg-slate-100 dark:bg-slate-800" />
            </div>

            {/* 3 Pillars Gradient Stack */}
            <div className="flex-1 flex flex-col gap-3.5 mt-1 justify-center">
              
              {/* 1. HIỆU QUẢ */}
              <div className="relative rounded-2xl p-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-md overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] cursor-pointer group/pillar">
                {/* Big number on left */}
                <span className="absolute top-1 left-2.5 text-3xl font-black text-white/20 font-mono select-none">
                  01
                </span>

                {/* Top chevron/arrow in circle */}
                <div className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white text-xs group-hover/pillar:translate-x-1.5 group-hover/pillar:-translate-y-0.5 transition-transform">
                  <span>→</span>
                </div>

                {/* Column graph illustration in corner */}
                <div className="absolute right-3.5 bottom-1.5 opacity-20 pointer-events-none flex items-end gap-1">
                  <div className="w-1.5 h-3 bg-white rounded-t-xs" />
                  <div className="w-1.5 h-5.5 bg-white rounded-t-xs" />
                  <div className="w-1.5 h-8 bg-white rounded-t-xs" />
                </div>

                {/* Center Content */}
                <div className="flex flex-col items-center text-center mt-1 relative z-10">
                  <div className="w-9 h-9 rounded-full border border-white/40 bg-white/10 backdrop-blur-xs flex items-center justify-center mb-1">
                    <Target className="w-4.5 h-4.5 text-white" />
                  </div>
                  <span className="text-sm sm:text-base font-black tracking-wider uppercase text-white drop-shadow-xs">
                    {isVi ? "HIỆU QUẢ" : "EFFICIENCY"}
                  </span>
                  <span className="text-[11px] font-semibold text-blue-100 leading-none mt-0.5">
                    {isVi ? "Tối ưu & Kết quả" : "Optimization & Results"}
                  </span>
                  <p className="text-[10px] text-blue-50/85 mt-1 leading-snug max-w-[210px]">
                    {isVi ? "Tối ưu hiệu suất, tạo kết quả đo lường được." : "Optimize performance, create measurable results."}
                  </p>
                </div>
              </div>

              {/* 2. NHÂN VĂN */}
              <div className="relative rounded-2xl p-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white shadow-md overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] cursor-pointer group/pillar">
                {/* Big number */}
                <span className="absolute top-1 left-2.5 text-3xl font-black text-white/20 font-mono select-none">
                  02
                </span>

                <div className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white text-xs group-hover/pillar:translate-x-1.5 group-hover/pillar:-translate-y-0.5 transition-transform">
                  <span>→</span>
                </div>

                {/* Users icon illustration */}
                <div className="absolute right-3 bottom-1.5 opacity-15 pointer-events-none">
                  <Users className="w-10 h-10 text-white" />
                </div>

                <div className="flex flex-col items-center text-center mt-1 relative z-10">
                  <div className="w-9 h-9 rounded-full border border-white/40 bg-white/10 backdrop-blur-xs flex items-center justify-center mb-1">
                    <Heart className="w-4.5 h-4.5 text-white" />
                  </div>
                  <span className="text-sm sm:text-base font-black tracking-wider uppercase text-white drop-shadow-xs">
                    {isVi ? "NHÂN VĂN" : "HUMANITY"}
                  </span>
                  <span className="text-[11px] font-semibold text-rose-100 leading-none mt-0.5">
                    {isVi ? "Đồng cảm & Thấu hiểu" : "Empathy & Understanding"}
                  </span>
                  <p className="text-[10px] text-rose-50/85 mt-1 leading-snug max-w-[210px]">
                    {isVi ? "Lắng nghe, thấu hiểu và đặt con người làm trung tâm." : "Listen, empathize, and put people at the center."}
                  </p>
                </div>
              </div>

              {/* 3. BỀN VỮNG */}
              <div className="relative rounded-2xl p-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-teal-700 text-white shadow-md overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] cursor-pointer group/pillar">
                {/* Big number */}
                <span className="absolute top-1 left-2.5 text-3xl font-black text-white/20 font-mono select-none">
                  03
                </span>

                <div className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white text-xs group-hover/pillar:translate-x-1.5 group-hover/pillar:-translate-y-0.5 transition-transform">
                  <span>→</span>
                </div>

                {/* Leaf icon illustration */}
                <div className="absolute right-3.5 bottom-1.5 opacity-20 pointer-events-none">
                  <Leaf className="w-9 h-9 text-white" />
                </div>

                <div className="flex flex-col items-center text-center mt-1 relative z-10">
                  <div className="w-9 h-9 rounded-full border border-white/40 bg-white/10 backdrop-blur-xs flex items-center justify-center mb-1">
                    <Leaf className="w-4.5 h-4.5 text-white" />
                  </div>
                  <span className="text-sm sm:text-base font-black tracking-wider uppercase text-white drop-shadow-xs">
                    {isVi ? "BỀN VỮNG" : "SUSTAINABILITY"}
                  </span>
                  <span className="text-[11px] font-semibold text-teal-100 leading-none mt-0.5">
                    {isVi ? "Giá trị & Tin cậy" : "Value & Trust"}
                  </span>
                  <p className="text-[10px] text-teal-50/85 mt-1 leading-snug max-w-[210px]">
                    {isVi ? "Xây dựng niềm tin và giá trị bền vững." : "Build enduring trust and sustainable value."}
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* COLUMN 3: TRIẾT LÝ VÀ TẦM NHÌN (PHILOSOPHY & VISION) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/90 dark:bg-slate-900/85 border border-slate-200/90 dark:border-slate-800/90 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-5 text-left"
          >
            {/* Header Cột 3 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25 shrink-0">
                    <Star className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-base sm:text-lg font-black text-blue-950 dark:text-white leading-tight">
                      {isVi ? "Triết lý và tầm nhìn" : "Philosophy & Vision"}
                    </h4>
                    <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                      PHILOSOPHY & VISION
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              </div>
              <div className="h-[1.5px] w-full bg-slate-100 dark:bg-slate-800" />
            </div>

            {/* Blue outlined quote container */}
            <div className="relative p-4 rounded-2xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 shadow-3xs flex flex-col gap-1 text-center">
              <span className="text-2xl font-serif text-blue-600 dark:text-cyan-400 font-extrabold leading-none text-left h-3 block">“</span>
              <p className="text-sm sm:text-base font-extrabold text-blue-800 dark:text-cyan-300 italic px-2 leading-tight">
                {isVi 
                  ? "“Tận Tâm & Đồng Hành Cùng Trải Nghiệm Khách Hàng”" 
                  : "“Dedication & Companionship in Customer Experience”"}
              </p>
              <span className="text-2xl font-serif text-blue-600 dark:text-cyan-400 font-extrabold leading-none text-right h-3 block -mt-1">”</span>
            </div>

            {/* Paragraph text with bold blue key message */}
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed text-justify flex-1">
              {isVi ? (
                <>
                  Tôi luôn nỗ lực để mang lại sản phẩm, dịch vụ chất lượng cao với chi phí hợp lý. Và trên hết, để mỗi khách hàng cảm nhận được một điều đơn giản mà cốt lõi:{" "}
                  <span className="font-extrabold text-blue-700 dark:text-cyan-300">
                    Họ luôn được lắng nghe.
                  </span>
                </>
              ) : (
                <>
                  I always strive to deliver high-quality products and services at reasonable costs. And above all, so that every customer feels one simple yet core value:{" "}
                  <span className="font-extrabold text-blue-700 dark:text-cyan-300">
                    They are always listened to.
                  </span>
                </>
              )}
            </p>

            {/* Vision container with Eye/Compass Icon */}
            <div className="p-3.5 rounded-2xl bg-blue-50/30 dark:bg-slate-800/40 border border-blue-100/60 dark:border-slate-800 flex items-start gap-3 mt-1 shadow-3xs">
              <div className="w-8 h-8 rounded-full bg-blue-100/80 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                <Compass className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                {isVi ? (
                  <>
                    <span className="font-black text-blue-700 dark:text-cyan-300">Tầm nhìn:</span> Kiến tạo giá trị thực sự cho doanh nghiệp thông qua việc tối ưu quy trình và phát triển năng lực của đội ngũ chăm sóc khách hàng trực diện, hướng tới sự phát triển toàn diện.
                  </>
                ) : (
                  <>
                    <span className="font-black text-blue-700 dark:text-cyan-300">Vision:</span> Creating real business value by optimizing processes and developing customer care team capabilities.
                  </>
                )}
              </p>
            </div>
          </motion.div>

        </div>

        {/* 4. BOTTOM CTA COLLABORATION BANNER - HIGH-FIDELITY LUXURY GLASS BANNER */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="w-full relative overflow-hidden rounded-3xl border border-transparent p-6 sm:p-8 shadow-[0_24px_50px_rgba(99,102,241,0.08)] flex flex-col lg:flex-row items-center justify-between gap-6 group/ctabanner"
        >
          {/* Ambient glow decoration */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 via-purple-500 to-rose-500 rounded-3xl blur-xl opacity-10 group-hover/ctabanner:opacity-20 transition-opacity duration-700 pointer-events-none" />
          
          {/* Main glass card background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-blue-50/50 to-indigo-50/85 dark:from-[#090D16]/95 dark:via-[#0B0F19]/90 dark:to-[#090D16]/95 text-slate-900 dark:text-white -z-10 rounded-3xl border border-blue-200/80 dark:border-cyan-400/50 shadow-[0_16px_48px_rgba(99,102,241,0.08),inset_0_1.5px_2px_rgba(255,255,255,0.95)] backdrop-blur-3xl" />
          
          {/* Left Portion: Icon + Badge + Title + Subtitle */}
          <div className="relative z-10 flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
            {/* Paper Airplane circular icon */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-blue-500/30 dark:border-cyan-400/30 bg-blue-500/10 dark:bg-cyan-500/20 backdrop-blur-md flex items-center justify-center text-blue-600 dark:text-cyan-300 shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-transform duration-300 group-hover/ctabanner:scale-110">
              <Send className="w-5.5 h-5.5 sm:w-6.5 sm:h-6.5 stroke-[2] text-blue-600 dark:text-cyan-300" />
            </div>

            <div className="flex flex-col min-w-0 text-left">
              {/* Top Indigo Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-cyan-500/20 border border-blue-500/20 dark:border-cyan-400/30 text-blue-700 dark:text-cyan-200 text-[10px] font-bold tracking-wider mb-2 self-start uppercase">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-300 animate-pulse" />
                <span>{isVi ? "Hợp tác & Đồng hành" : "Collaboration & Partnership"}</span>
              </div>

              {/* Title and subtitle */}
              <h3 className="text-base sm:text-lg md:text-xl font-black tracking-tight text-blue-950 dark:text-white leading-tight">
                {isVi ? "Cùng tạo ra trải nghiệm khách hàng tốt hơn" : "Let's shape better customer experiences"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 mt-1.5 max-w-2xl font-medium">
                {isVi 
                  ? "Tôi luôn sẵn sàng kết nối để cùng doanh nghiệp xây dựng hệ thống Customer Experience hiệu quả, nhân văn và bền vững."
                  : "Always ready to partner with forward-thinking enterprises to architect sustainable, human-centric CX ecosystems."}
              </p>
            </div>
          </div>

          {/* Right Portion: Target-aligned gradient connect button */}
          <div className="relative z-10 flex items-center shrink-0 lg:ml-auto">
            <button
              type="button"
              onClick={() => handleNavigate("contact")}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 hover:brightness-105 hover:shadow-[0_8px_30px_rgba(244,63,94,0.3)] transition-all flex items-center gap-3.5 active:scale-95 cursor-pointer text-left border border-white/20 shadow-md group/btn shrink-0"
            >
              {/* Left Chat Icon with glowing background */}
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
                <MessagesSquare className="w-5 h-5 text-white" />
              </div>

              <div className="flex flex-col pr-1 min-w-0">
                <span className="text-sm font-black text-white leading-none tracking-wide whitespace-nowrap uppercase">
                  {isVi ? "Kết nối với tôi" : "Connect with me"}
                </span>
                <span className="text-[10px] text-white/80 font-bold leading-none whitespace-nowrap mt-1">
                  {isVi ? "Trao đổi, chia sẻ cơ hội hợp tác" : "Explore partnership options"}
                </span>
              </div>

              {/* Arrow circle on right */}
              <div className="w-7 h-7 rounded-full bg-white text-orange-600 flex items-center justify-center shrink-0 shadow-md group-hover/btn:translate-x-1 transition-transform">
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </div>
            </button>
          </div>

          {/* Dotted target board decoration on bottom right of banner */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none w-32 h-32 border-4 border-dashed border-blue-500 rounded-full translate-x-12 translate-y-12" />
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none w-20 h-20 border-4 border-dashed border-blue-500 rounded-full translate-x-8 translate-y-8" />
        </motion.div>

      </div>
    </section>
  );
}
