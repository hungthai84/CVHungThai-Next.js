import React, { useState, useRef } from "react";
import { 
  User, Heart, Leaf, Target, TrendingUp, Building2,
  Briefcase, Bot, MapPin,
  Send, FileText, Settings, Database, Cpu, Star, Compass,
  Share2, Users, Calendar, Home,
  MessagesSquare, Sparkles
} from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../i18n";
import { HeroIntroButton } from "./HeroIntroButton";
import { PageCardHeader } from "./PageCardHeader";

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

        {/* 1. TOP HEADER BANNER CARD - TIÊU ĐỀ THẺ CHÍNH GIỚI THIỆU */}
        <PageCardHeader pageId="about">
          {/* Cụm trái: Chỉ báo kinh nghiệm (Caption / Label: 12px – 13px) */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-5 bg-blue-600 dark:bg-cyan-400 rounded-full shrink-0" />
              <span className="text-caption font-semibold font-mono text-blue-700 dark:text-cyan-300 bg-blue-500/15 px-2.5 py-0.5 rounded-full border border-blue-500/30 shadow-2xs">
                {isVi ? "22+ Năm kinh nghiệm CX & CS" : "22+ Years CX & Operations"}
              </span>
            </div>
          </div>
        </PageCardHeader>


        {/* 2. HERO PROFILE, QUOTE & CONTACT ROW (Video 70% = 7 cols, Contact Card 30% = 3 cols trên mọi kích thước) */}
        <div className="grid grid-cols-10 gap-2.5 sm:gap-4 lg:gap-6 items-stretch w-full">
          
          {/* Left Column: Video Card chiếm 70% (7/10 cols) trên mọi kích thước */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="col-span-7 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/60 dark:border-white/15 bg-slate-950/90 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.4)] h-full flex items-center justify-center group"
          >
            {/* The Portrait Video with Mouse Avatar */}
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

            {/* ========================================================================= */}
            {/* CÁC THẺ DẤU ẤN VẬN HÀNH LƠ LỬNG CHUYỂN ĐỘNG TẠI CHỖ XUNG QUANH VIDEO */}
            {/* ========================================================================= */}

            {/* 1. Top-Left Floating Badge: 22+ Năm (CX & CS Leadership) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 pointer-events-auto bg-white/95 dark:bg-slate-950/85 backdrop-blur-xl border border-cyan-400/30 dark:border-cyan-400/40 rounded-[10px] p-2 sm:p-2.5 shadow-md dark:shadow-[0_8px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(0,245,255,0.25)] hover:scale-105 hover:border-cyan-400 transition-all group flex items-center gap-2 sm:gap-2.5 max-w-[150px] sm:max-w-[190px]"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-400/30 dark:border-cyan-400/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 shadow-xs">
                <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-3xs sm:text-2xs font-bold text-slate-700 dark:text-slate-300 truncate leading-tight">
                  {isVi ? "Kinh nghiệm CX & CS" : "CX Leadership"}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-sm sm:text-base font-black text-cyan-600 dark:text-cyan-400 font-sans tracking-tight drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(0,245,255,0.4)]">
                    22+
                  </span>
                  <span className="text-3xs font-black text-cyan-600 dark:text-cyan-400 tracking-wider uppercase">
                    {isVi ? "NĂM" : "YEARS"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 2. Top-Right Floating Badge: 8+ Môi trường (Enterprise Scale) */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 pointer-events-auto bg-white/95 dark:bg-slate-950/85 backdrop-blur-xl border border-purple-400/30 dark:border-purple-400/40 rounded-[10px] p-2 sm:p-2.5 shadow-md dark:shadow-[0_8px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(168,85,247,0.25)] hover:scale-105 hover:border-purple-400 transition-all group flex items-center gap-2 sm:gap-2.5 max-w-[150px] sm:max-w-[190px]"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/10 dark:bg-purple-500/20 border border-purple-400/30 dark:border-purple-400/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-xs">
                <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-3xs sm:text-2xs font-bold text-slate-700 dark:text-slate-300 truncate leading-tight">
                  {isVi ? "Quy mô lớn" : "Enterprise"}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-sm sm:text-base font-black text-purple-600 dark:text-purple-400 font-sans tracking-tight drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                    8+
                  </span>
                  <span className="text-3xs font-black text-purple-600 dark:text-purple-400 tracking-wider uppercase">
                    {isVi ? "MÔI TRƯỜNG" : "ENV."}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 3. Middle-Right Floating Badge: 24/7 AI CRM (Smart Automation) */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1.0 }}
              className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-4 z-20 pointer-events-auto bg-white/95 dark:bg-slate-950/85 backdrop-blur-xl border border-rose-400/30 dark:border-rose-400/40 rounded-[10px] p-2 sm:p-2.5 shadow-md dark:shadow-[0_8px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(244,63,94,0.25)] hover:scale-105 hover:border-rose-400 transition-all group flex items-center gap-2 sm:gap-2.5 max-w-[150px] sm:max-w-[190px]"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-500/10 dark:bg-rose-500/20 border border-rose-400/30 dark:border-rose-400/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-3xs sm:text-2xs font-bold text-slate-700 dark:text-slate-300 truncate leading-tight">
                  {isVi ? "Tự động hóa" : "AI Automation"}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-sm sm:text-base font-black text-rose-600 dark:text-rose-400 font-sans tracking-tight drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]">
                    24/7
                  </span>
                  <span className="text-3xs font-black text-rose-600 dark:text-rose-400 tracking-wider uppercase">
                    AI CRM
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 4. Bottom-Right Floating Badge: 99% CSAT (Customer Satisfaction) */}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4.0, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 pointer-events-auto bg-white/95 dark:bg-slate-950/85 backdrop-blur-xl border border-emerald-400/30 dark:border-emerald-400/40 rounded-[10px] p-2 sm:p-2.5 shadow-md dark:shadow-[0_8px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(16,185,129,0.25)] hover:scale-105 hover:border-emerald-400 transition-all group flex items-center gap-2 sm:gap-2.5 max-w-[150px] sm:max-w-[190px]"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-400/30 dark:border-emerald-400/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-3xs sm:text-2xs font-bold text-slate-700 dark:text-slate-300 truncate leading-tight">
                  {isVi ? "Hài lòng KH" : "Satisfaction"}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400 font-sans tracking-tight drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">
                    99%
                  </span>
                  <span className="text-3xs font-black text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
                    CSAT
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bottom Left Video Intro Controls */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 pointer-events-auto">
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

          {/* Right Column: Contact Info Card chiếm 30% (3/10 cols) trên mọi kích thước */}
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="col-span-3 h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/80 dark:border-cyan-400/35 p-2.5 sm:p-4 shadow-[0_16px_40px_rgba(99,102,241,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.95)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(0,240,255,0.2),inset_0_1.5px_2px_rgba(255,255,255,0.18)] hover:dark:border-cyan-400/60 transition-all duration-300 flex flex-col justify-start gap-2.5 min-w-0"
          >
            {/* Header */}
            <div className="flex flex-col gap-2 pb-3 border-b border-slate-200/60 dark:border-slate-800/80 font-['Play',sans-serif]">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="flex items-center justify-center text-blue-600 dark:text-cyan-400 shrink-0">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                  </div>
                  <h6 className="text-h6 font-bold tracking-tight text-blue-600 dark:text-cyan-400">
                    {isVi ? "Thông tin cá nhân" : "Personal profile"}
                  </h6>
                </div>

              </div>
              <div className="h-[2px] w-full bg-blue-500/30 dark:bg-cyan-500/20" />
            </div>

            {/* 6 Thông tin nhân khẩu & lý lịch hiển thị 1 CỘT (grid-cols-1) */}
            <div className="grid grid-cols-1 gap-1.5 sm:gap-2 pr-0.5">
              
              {/* 1. Giới tính */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2.5 shadow-2xs hover:border-blue-400/50 transition-all min-w-0">
                <div className="w-8 h-8 rounded-lg border border-blue-400/30 bg-blue-500/15 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-3xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
                    {isVi ? "Giới tính" : "Gender"}
                  </span>
                  <span className="text-xs font-bold text-blue-700 dark:text-cyan-300 truncate">
                    {isVi ? "Nam giới" : "Male"}
                  </span>
                </div>
              </div>

              {/* 2. Dân tộc */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2.5 shadow-2xs hover:border-indigo-400/50 transition-all min-w-0">
                <div className="w-8 h-8 rounded-lg border border-indigo-400/30 bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-3xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
                    {isVi ? "Dân tộc" : "Ethnicity"}
                  </span>
                  <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 truncate">
                    {isVi ? "Kinh" : "Kinh"}
                  </span>
                </div>
              </div>

              {/* 3. Tình trạng */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2.5 shadow-2xs hover:border-rose-400/50 transition-all min-w-0">
                <div className="w-8 h-8 rounded-lg border border-rose-400/30 bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-3xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
                    {isVi ? "Tình trạng" : "Status"}
                  </span>
                  <span className="text-xs font-bold text-rose-700 dark:text-rose-300 truncate">
                    {isVi ? "Độc thân" : "Single"}
                  </span>
                </div>
              </div>

              {/* 4. Sinh nhật */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2.5 shadow-2xs hover:border-amber-400/50 transition-all min-w-0">
                <div className="w-8 h-8 rounded-lg border border-amber-400/30 bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-3xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
                    {isVi ? "Sinh nhật" : "Date of Birth"}
                  </span>
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-300 truncate">
                    22/06/1984
                  </span>
                </div>
              </div>

              {/* 5. Tạm trú */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2.5 shadow-2xs hover:border-purple-400/50 transition-all min-w-0">
                <div className="w-8 h-8 rounded-lg border border-purple-400/30 bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-3xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
                    {isVi ? "Tạm trú" : "Temp. Residence"}
                  </span>
                  <span className="text-xs font-bold text-purple-700 dark:text-purple-300 truncate" title="Q7, Hồ Chí Minh">
                    Q7, Hồ Chí Minh
                  </span>
                </div>
              </div>

              {/* 6. Cư trú */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2.5 shadow-2xs hover:border-emerald-400/50 transition-all min-w-0">
                <div className="w-8 h-8 rounded-lg border border-emerald-400/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Home className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-3xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
                    {isVi ? "Cư trú" : "Hometown"}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 truncate" title="Mỹ Tho, Tiền Giang">
                    Mỹ Tho, Tiền Giang
                  </span>
                </div>
              </div>

            </div>

          </motion.div>

        </div>

        {/* 4. 3-COLUMN DETAILS: TÔI LÀ AI? | 3 TRỤ CỘT VẬN HÀNH | TRIẾT LÝ & TẦM NHÌN */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full relative overflow-hidden bg-white/80 dark:bg-slate-900/85 backdrop-blur-2xl rounded-3xl border border-white/90 dark:border-cyan-400/40 p-5 sm:p-7 md:p-8 shadow-[0_16px_40px_rgba(99,102,241,0.1),inset_0_1.5px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(0,240,255,0.18),inset_0_1.5px_2px_rgba(255,255,255,0.12)] hover:border-blue-400/40 dark:hover:border-cyan-400/60 transition-all duration-300 group/portrait"
        >
          {/* Subtle Ambient Background Glows */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Main Card Header */}
          <div className="relative z-10 flex flex-col gap-2 pb-4 mb-6 border-b border-slate-200/70 dark:border-slate-800/80 font-['Play',sans-serif]">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 dark:bg-cyan-500/20 border border-blue-400/30 dark:border-cyan-400/40 flex items-center justify-center text-blue-600 dark:text-cyan-400 shrink-0 shadow-2xs">
                  <Compass className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h5 className="text-h5 font-bold tracking-tight text-blue-600 dark:text-cyan-400">
                    {isVi ? "Chân dung & triết lý vận hành" : "Profile & operational philosophy"}
                  </h5>
                  <p className="text-caption font-semibold text-slate-500 dark:text-slate-400">
                    {isVi ? "Tư duy quản trị & Trụ cột định hướng dịch vụ xuất sắc" : "Executive mindset & core pillars of service excellence"}
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-cyan-500/15 border border-blue-400/30 dark:border-cyan-400/30 text-blue-700 dark:text-cyan-300 text-caption font-bold shadow-2xs self-start sm:self-center">
                <Sparkles className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-300 animate-pulse" />
                <span>{isVi ? "Định hướng khách hàng" : "Customer-Centricity"}</span>
              </div>
            </div>
            <div className="h-[2px] w-full bg-gradient-to-r from-blue-500/40 via-cyan-400/30 to-transparent dark:from-cyan-400/50 dark:via-blue-500/30 dark:to-transparent mt-1.5 rounded-full" />
          </div>

          <div 
            className="relative z-10 grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80 dark:divide-slate-800/80 items-stretch w-full gap-6 lg:gap-0 font-['Play',sans-serif]"
          >
            
            {/* Column 1: Giới thiệu bản thân tôi */}
            <div className="flex flex-col justify-between pt-6 first:pt-0 lg:pt-0 lg:pr-6.5 h-full w-full min-w-0">
              <div className="flex flex-col h-full justify-between w-full space-y-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/15 dark:bg-cyan-500/20 border border-blue-400/30 dark:border-cyan-400/40 flex items-center justify-center text-blue-600 dark:text-cyan-400 shrink-0 shadow-2xs">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="px-3 py-1 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                      <h6 className="text-h6 font-bold text-slate-900 dark:text-white tracking-wide">
                        {isVi ? "Giới thiệu bản thân tôi" : "About my professional profile"}
                      </h6>
                    </div>
                  </div>
                  
                  <div className="space-y-3.5 text-body text-slate-700 dark:text-slate-200">
                    <p className="leading-relaxed text-justify">
                      {isVi ? (
                        <>
                          Một chuyên gia dịch vụ khách hàng với hơn <span className="font-extrabold px-2 py-0.5 rounded bg-blue-500/15 dark:bg-cyan-400/20 text-blue-700 dark:text-cyan-300 border border-blue-400/30 dark:border-cyan-400/30 inline-block my-0.5">22 năm kinh nghiệm</span> thực chiến. Với tôi, Chăm Sóc Khách Hàng không chỉ là phục vụ, mà là sự đồng hành. Mỗi cuộc trò chuyện, mỗi khoảnh khắc, dù là nhỏ nhất, đều là một cơ hội quý giá: để lắng nghe, để thấu hiểu, và để tạo ra những trải nghiệm vượt trên cả sự mong đợi.
                        </>
                      ) : (
                        <>
                          A customer service expert with over <span className="font-extrabold px-2 py-0.5 rounded bg-blue-500/15 dark:bg-cyan-400/20 text-blue-700 dark:text-cyan-300 border border-blue-400/30 dark:border-cyan-400/30 inline-block my-0.5">22 years</span> of practical experience. For me, Customer Service is not just serving, but accompanying. Every conversation, every moment, no matter how small, is a precious opportunity: to listen, to understand, and to create experiences that exceed expectations.
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Callout box cho phương châm đồng cảm */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-rose-500/10 dark:from-amber-500/15 dark:via-rose-500/10 dark:to-transparent border-l-4 border-amber-500 dark:border-amber-400 border-y border-r border-amber-300/40 dark:border-amber-500/30 shadow-2xs space-y-1 mt-auto">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-caption">
                    <Heart className="w-3.5 h-3.5 fill-amber-500/30 shrink-0" />
                    <span>{isVi ? "Giá trị cốt lõi" : "Core Value"}</span>
                  </div>
                  <p className="text-body-sub text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                    {isVi ? (
                      <>
                        Tôi tin rằng sự hài lòng không đến từ sự hoàn hảo tuyệt đối, mà đến từ <span className="font-bold text-amber-700 dark:text-amber-300 underline decoration-amber-400/40 decoration-2 underline-offset-2">sự tận tâm kịp thời</span> và <span className="font-bold text-rose-700 dark:text-rose-300 underline decoration-rose-400/40 decoration-2 underline-offset-2">đồng cảm chân thành</span>.
                      </>
                    ) : (
                      <>
                        I believe satisfaction does not come from absolute perfection, but from <span className="font-bold text-amber-700 dark:text-amber-300 underline decoration-amber-400/40 decoration-2 underline-offset-2">timely dedication</span> and <span className="font-bold text-rose-700 dark:text-rose-300 underline decoration-rose-400/40 decoration-2 underline-offset-2">heartfelt empathy</span>.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2: Ba trụ cột vận hành */}
            <div className="flex flex-col justify-between pt-6 lg:pt-0 lg:px-6.5 h-full w-full min-w-0">
              <div className="flex flex-col h-full justify-between w-full space-y-4">
                <div className="flex items-center gap-2.5 mb-0.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/15 dark:bg-cyan-500/20 border border-blue-400/30 dark:border-cyan-400/40 flex items-center justify-center text-blue-600 dark:text-cyan-400 shrink-0 shadow-2xs">
                    <Target className="w-4 h-4" />
                  </div>
                  <div className="px-3 py-1 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                    <h6 className="text-h6 font-bold text-slate-900 dark:text-white tracking-wide">
                      {isVi ? "Ba trụ cột vận hành" : "Three core operational pillars"}
                    </h6>
                  </div>
                </div>

                <div className="flex flex-col gap-3 flex-1 justify-between">
                  {/* Pillar 1 Card (Màu xanh dương) */}
                  <div className="p-3.5 rounded-2xl bg-blue-500/10 dark:bg-blue-950/40 border border-blue-300/60 dark:border-blue-700/60 shadow-2xs backdrop-blur-md flex items-start gap-3.5 hover:border-blue-400 hover:-translate-y-0.5 transition-all duration-200 flex-1 group/p1">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/20 dark:bg-blue-900/60 border border-blue-400/50 flex items-center justify-center text-blue-600 dark:text-cyan-400 shrink-0 shadow-2xs group-hover/p1:scale-110 transition-transform">
                      <Target className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-body-sm font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wide">
                          {isVi ? "01. HIỆU QUẢ" : "01. EFFICIENCY"}
                        </h4>
                        <span className="text-caption font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-700 dark:text-cyan-300 border border-blue-400/30">
                          {isVi ? "Tối ưu & Kết quả" : "Optimization & Results"}
                        </span>
                      </div>
                      <p className="text-body-sub text-slate-700 dark:text-slate-300 mt-1 leading-snug">
                        {isVi ? "Tối ưu hiệu suất, tạo kết quả đo lường được." : "Optimize performance, create measurable outcomes."}
                      </p>
                    </div>
                  </div>

                  {/* Pillar 2 Card (Màu hồng đỏ) */}
                  <div className="p-3.5 rounded-2xl bg-rose-500/10 dark:bg-rose-950/40 border border-rose-300/60 dark:border-rose-700/60 shadow-2xs backdrop-blur-md flex items-start gap-3.5 hover:border-rose-400 hover:-translate-y-0.5 transition-all duration-200 flex-1 group/p2">
                    <div className="w-9 h-9 rounded-xl bg-rose-500/20 dark:bg-rose-900/60 border border-rose-400/50 flex items-center justify-center text-rose-500 dark:text-rose-400 shrink-0 shadow-2xs group-hover/p2:scale-110 transition-transform">
                      <Heart className="w-4.5 h-4.5 fill-rose-500/20" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-body-sm font-bold text-rose-500 dark:text-rose-400 uppercase tracking-wide">
                          {isVi ? "02. NHÂN VĂN" : "02. HUMANITY"}
                        </h4>
                        <span className="text-caption font-semibold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-400/30">
                          {isVi ? "Đồng cảm & Thấu hiểu" : "Empathy & Understanding"}
                        </span>
                      </div>
                      <p className="text-body-sub text-slate-700 dark:text-slate-300 mt-1 leading-snug">
                        {isVi ? "Lắng nghe, thấu hiểu và đặt con người làm trung tâm." : "Listen, empathize, and place people at the center."}
                      </p>
                    </div>
                  </div>

                  {/* Pillar 3 Card (Màu xanh ngọc) */}
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-300/60 dark:border-emerald-700/60 shadow-2xs backdrop-blur-md flex items-start gap-3.5 hover:border-emerald-400 hover:-translate-y-0.5 transition-all duration-200 flex-1 group/p3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 dark:bg-emerald-900/60 border border-emerald-400/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 shadow-2xs group-hover/p3:scale-110 transition-transform">
                      <Leaf className="w-4.5 h-4.5 fill-emerald-600/20" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-body-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                          {isVi ? "03. BỀN VỮNG" : "03. SUSTAINABILITY"}
                        </h4>
                        <span className="text-caption font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-400/30">
                          {isVi ? "Giá trị & Tin cậy" : "Value & Reliability"}
                        </span>
                      </div>
                      <p className="text-body-sub text-slate-700 dark:text-slate-300 mt-1 leading-snug">
                        {isVi ? "Xây dựng niềm tin và giá trị bền vững." : "Build enduring trust and sustainable value."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Triết lý và tầm nhìn */}
            <div className="flex flex-col justify-between pt-6 lg:pt-0 lg:pl-6.5 h-full w-full min-w-0">
              <div className="flex flex-col h-full justify-between w-full space-y-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/15 dark:bg-amber-500/20 border border-amber-400/30 dark:border-amber-400/40 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 shadow-2xs">
                      <Star className="w-4 h-4 fill-amber-500/20" />
                    </div>
                    <div className="px-3 py-1 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                      <h6 className="text-h6 font-bold text-slate-900 dark:text-white tracking-wide">
                        {isVi ? "Triết lý và tầm nhìn" : "Core philosophy and vision"}
                      </h6>
                    </div>
                  </div>

                  <div className="space-y-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Banner triết lý nổi bật */}
                      <div className="mb-3.5 p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/15 via-blue-500/10 to-cyan-500/15 dark:from-amber-500/20 dark:via-cyan-500/15 dark:to-blue-500/20 border border-amber-400/40 dark:border-cyan-400/40 backdrop-blur-xl text-center shadow-2xs">
                        <p className="text-body font-bold italic text-blue-700 dark:text-cyan-300 leading-snug drop-shadow-xs">
                          {isVi 
                            ? "“Tận Tâm & Đồng Hành Cùng Trải Nghiệm Khách Hàng”" 
                            : "“Dedication & Partnership with Customer Experience”"}
                        </p>
                      </div>

                      <p className="text-body text-slate-700 dark:text-slate-200 text-justify leading-relaxed">
                        {isVi ? (
                          <>
                            Tôi luôn nỗ lực để mang lại sản phẩm, dịch vụ chất lượng cao với chi phí hợp lý. Và trên hết, để mỗi khách hàng cảm nhận được một điều đơn giản mà cốt lõi: Họ luôn được lắng nghe.
                          </>
                        ) : (
                          <>
                            I always strive to deliver high-quality products and services at reasonable costs. And above all, so that every customer feels a simple yet core value: They are always listened to.
                          </>
                        )}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 shadow-2xs mt-auto">
                      <p className="text-body-sub text-slate-700 dark:text-slate-200 text-justify leading-relaxed">
                        {isVi ? (
                          <>
                            <span className="font-bold text-blue-600 dark:text-cyan-400">Tầm nhìn:</span> Kiến tạo giá trị thực sự cho doanh nghiệp thông qua việc tối ưu quy trình và phát triển năng lực của đội ngũ chăm sóc khách hàng trực diện, hướng tới sự phát triển toàn diện.
                          </>
                        ) : (
                          <>
                            <span className="font-bold text-blue-600 dark:text-cyan-400">Vision:</span> Creating real business value by optimizing processes and developing frontend customer care team competencies, aiming for comprehensive development.
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* 5. BOTTOM CTA BANNER CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="w-full relative overflow-hidden rounded-3xl border border-transparent p-6 sm:p-8 shadow-[0_24px_50px_rgba(99,102,241,0.18)] flex flex-col lg:flex-row items-center justify-between gap-6 group/ctabanner"
        >
          {/* Rainbow neon background with blur-xl aura */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 via-purple-500 via-pink-500 to-rose-500 rounded-3xl blur-xl opacity-15 group-hover/ctabanner:opacity-30 transition-opacity duration-700 pointer-events-none" />
          
          {/* Glassy, gradient premium background panel with light theme support */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-blue-50/90 to-indigo-50/95 dark:from-[#090D16]/95 dark:via-[#0B0F19]/90 dark:to-[#090D16]/95 text-slate-900 dark:text-white -z-10 rounded-3xl border border-blue-200/80 dark:border-cyan-400/50 shadow-[0_16px_48px_rgba(99,102,241,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.95)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.22)] backdrop-blur-3xl" />
          
          {/* Ambient colorful light blobs inside */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-rose-500/10 dark:bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Title & Subtitle */}
          <div className="relative z-10 flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-blue-500/30 dark:border-cyan-400/30 bg-blue-500/10 dark:bg-cyan-500/20 backdrop-blur-md flex items-center justify-center text-blue-600 dark:text-cyan-300 shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.2)] dark:shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-transform duration-300 group-hover/ctabanner:scale-110">
              <Send className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2] text-blue-600 dark:text-cyan-300" />
            </div>
            <div className="flex flex-col min-w-0 text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 dark:bg-cyan-500/20 border border-blue-500/20 dark:border-cyan-400/30 text-blue-700 dark:text-cyan-200 text-3xs font-bold tracking-wide mb-2 self-start">
                <Sparkles className="w-3 h-3 animate-pulse text-blue-600 dark:text-cyan-300" />
                <span>{isVi ? "Hợp tác & Đồng hành" : "Collaboration & Partnership"}</span>
              </div>
              <h3 className="text-sm sm:text-base md:text-xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                {isVi ? "Cùng tạo ra trải nghiệm khách hàng tốt hơn" : "Let's shape better customer experiences"}
              </h3>
              <p className="text-body text-slate-600 dark:text-slate-300 mt-1.5 max-w-2xl font-normal">
                {isVi 
                  ? "Tôi luôn sẵn sàng kết nối để cùng doanh nghiệp xây dựng hệ thống Customer Experience hiệu quả, nhân văn và bền vững."
                  : "Always ready to partner with forward-thinking enterprises to architect sustainable, human-centric CX ecosystems."}
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="relative z-10 flex items-center gap-2.5 sm:gap-3 shrink-0 lg:ml-auto">
            {/* Button 1: Kết nối với tôi */}
            <button
              type="button"
              onClick={() => handleNavigate("contact")}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_25px_rgba(37,99,235,0.45)] transition-all flex items-center justify-center gap-3 active:scale-95 cursor-pointer text-left backdrop-blur-md border border-white/20 shrink-0"
            >
              <MessagesSquare className="w-5 h-5 text-white shrink-0" />
              <div className="flex flex-col">
                <span className="text-button font-bold tracking-wide leading-tight whitespace-nowrap">
                  {isVi ? "Kết nối với tôi" : "Connect with me"}
                </span>
                <span className="text-caption text-blue-100 font-semibold leading-tight whitespace-nowrap mt-0.5">
                  {isVi ? "Trao đổi, chia sẻ cơ hội hợp tác" : "Explore collaborative opportunities"}
                </span>
              </div>
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
