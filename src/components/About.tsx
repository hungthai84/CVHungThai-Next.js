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
                  <span className="text-h6 text-cyan-600 dark:text-cyan-400 font-sans tracking-tight drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(0,245,255,0.4)]">
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
                  <span className="text-h6 text-purple-600 dark:text-purple-400 font-sans tracking-tight drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
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
                  <span className="text-h6 text-rose-600 dark:text-rose-400 font-sans tracking-tight drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]">
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
                  <span className="text-h6 text-emerald-600 dark:text-emerald-400 font-sans tracking-tight drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">
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
                  <h6 className="text-h6 tracking-tight text-blue-600 dark:text-cyan-400">
                    {isVi ? "Thông tin cá nhân" : "Personal profile"}
                  </h6>
                </div>

              </div>
              <div className="h-[2px] w-full bg-blue-500/30 dark:bg-cyan-500/20" />
            </div>

            {/* 6 Thông tin nhân khẩu & lý lịch hiển thị 1 CỘT (grid-cols-1) */}
            <div className="grid grid-cols-1 gap-1.5 sm:gap-2 pr-0.5">
              
              {/* 1. Giới tính */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100/80 dark:border-blue-900/45 flex items-center gap-2.5 shadow-2xs hover:border-blue-400/60 dark:hover:border-cyan-400/60 transition-all min-w-0">
                <div className="w-8 h-8 rounded-lg border border-blue-400/30 bg-blue-500/15 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-3xs font-bold text-blue-600/70 dark:text-cyan-400/70 uppercase tracking-wider truncate">
                    {isVi ? "Giới tính" : "Gender"}
                  </span>
                  <span className="text-xs font-bold text-blue-800 dark:text-cyan-300 truncate">
                    {isVi ? "Nam giới" : "Male"}
                  </span>
                </div>
              </div>

              {/* 2. Dân tộc */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100/80 dark:border-indigo-900/45 flex items-center gap-2.5 shadow-2xs hover:border-indigo-400/60 transition-all min-w-0">
                <div className="w-8 h-8 rounded-lg border border-indigo-400/30 bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-3xs font-bold text-indigo-600/70 dark:text-indigo-400/70 uppercase tracking-wider truncate">
                    {isVi ? "Dân tộc" : "Ethnicity"}
                  </span>
                  <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300 truncate">
                    {isVi ? "Kinh" : "Kinh"}
                  </span>
                </div>
              </div>

              {/* 3. Tình trạng */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100/80 dark:border-rose-900/45 flex items-center gap-2.5 shadow-2xs hover:border-rose-400/60 transition-all min-w-0">
                <div className="w-8 h-8 rounded-lg border border-rose-400/30 bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-3xs font-bold text-rose-600/70 dark:text-rose-400/70 uppercase tracking-wider truncate">
                    {isVi ? "Tình trạng" : "Status"}
                  </span>
                  <span className="text-xs font-bold text-rose-800 dark:text-rose-300 truncate">
                    {isVi ? "Độc thân" : "Single"}
                  </span>
                </div>
              </div>

              {/* 4. Sinh nhật */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-100/80 dark:border-amber-900/45 flex items-center gap-2.5 shadow-2xs hover:border-amber-400/60 transition-all min-w-0">
                <div className="w-8 h-8 rounded-lg border border-amber-400/30 bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-3xs font-bold text-amber-600/70 dark:text-amber-400/70 uppercase tracking-wider truncate">
                    {isVi ? "Sinh nhật" : "Date of Birth"}
                  </span>
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-300 truncate">
                    22/06/1984
                  </span>
                </div>
              </div>

              {/* 5. Tạm trú */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-purple-50/40 dark:bg-purple-950/20 border border-purple-100/80 dark:border-purple-900/45 flex items-center gap-2.5 shadow-2xs hover:border-purple-400/60 transition-all min-w-0">
                <div className="w-8 h-8 rounded-lg border border-purple-400/30 bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-3xs font-bold text-purple-600/70 dark:text-purple-400/70 uppercase tracking-wider truncate">
                    {isVi ? "Tạm trú" : "Temp. Residence"}
                  </span>
                  <span className="text-xs font-bold text-purple-800 dark:text-purple-300 truncate" title="Q7, Hồ Chí Minh">
                    Q7, Hồ Chí Minh
                  </span>
                </div>
              </div>

              {/* 6. Cư trú */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100/80 dark:border-emerald-900/45 flex items-center gap-2.5 shadow-2xs hover:border-emerald-400/60 transition-all min-w-0">
                <div className="w-8 h-8 rounded-lg border border-emerald-400/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Home className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-3xs font-bold text-emerald-600/70 dark:text-emerald-400/70 uppercase tracking-wider truncate">
                    {isVi ? "Cư trú" : "Hometown"}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 truncate" title="Mỹ Tho, Tiền Giang">
                    Mỹ Tho, Tiền Giang
                  </span>
                </div>
              </div>

            </div>

          </motion.div>

        </div>

        {/* 4. CHÂN DUNG & TRIẾT LÝ VẬN HÀNH (KHỐI BENTO 3 CỘT NGUYÊN MẪU CHÍNH XÁC NHƯ HÌNH ĐÍNH KÈM) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 24px))" }}
          className="w-full relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white/95 to-blue-50/30 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-950/95 backdrop-blur-2xl border border-blue-200/80 dark:border-cyan-500/30 p-4 sm:p-6 lg:p-7 shadow-[0_20px_50px_rgba(37,99,235,0.08),inset_0_1.5px_2px_rgba(255,255,255,0.95)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(0,240,255,0.15)] flex flex-col gap-5 sm:gap-6 text-slate-800 dark:text-slate-100"
        >


          {/* B. Bố cục Bento 3 Cột (Giới thiệu bản thân | Ba trụ cột vận hành | Triết lý & tầm nhìn) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch w-full">
            
            {/* CỘT 1: GIỚI THIỆU BẢN THÂN TÔI (ABOUT ME) */}
            <div 
              style={{ borderRadius: "calc(var(--theme-radius-card, var(--theme-radius, 24px)) - 4px)" }}
              className="bg-white/90 dark:bg-slate-900/85 border border-slate-200/90 dark:border-slate-800/90 p-4 sm:p-5.5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-4 text-left"
            >
              {/* Header Cột 1 */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25 shrink-0">
                  <User className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-base sm:text-lg font-bold text-blue-950 dark:text-white leading-tight">
                    {isVi ? "Giới thiệu bản thân tôi" : "About Me"}
                  </h4>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                    ABOUT ME
                  </span>
                </div>
              </div>

              {/* Đoạn văn giới thiệu với badge "22 năm kinh nghiệm" */}
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed text-justify space-y-2">
                <p>
                  {isVi ? (
                    <>
                      Một chuyên gia dịch vụ khách hàng với hơn{" "}
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-cyan-300 font-bold mx-0.5 shadow-2xs">
                        22 năm kinh nghiệm
                      </span>{" "}
                      thực chiến. Với tôi, Chăm Sóc Khách Hàng không chỉ là phục vụ, mà là sự đồng hành. Mỗi cuộc trò chuyện, mỗi khoảnh khắc, dù là nhỏ nhất, đều là một cơ hội quý giá: để lắng nghe, để thấu hiểu, và để tạo ra những trải nghiệm vượt trên cả sự mong đợi.
                    </>
                  ) : (
                    <>
                      A customer service expert with over{" "}
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-cyan-300 font-bold mx-0.5 shadow-2xs">
                        22 years of experience
                      </span>{" "}
                      in real-world operations. For me, Customer Service is not just support, but true companionship.
                    </>
                  )}
                </p>
              </div>



              {/* Hộp "Giá trị cốt lõi" màu cam viền bo tròn có dấu ngoặc kép */}
              <div className="relative p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-orange-50/90 via-amber-50/60 to-orange-50/80 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-amber-950/30 border border-amber-300/80 dark:border-amber-500/40 shadow-2xs flex flex-col gap-1.5">
                {/* Header Giá trị cốt lõi */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-xs">
                      <Heart className="w-3.5 h-3.5 fill-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-orange-600 dark:text-orange-400">
                      {isVi ? "Giá trị cốt lõi" : "Core Value"}
                    </span>
                  </div>
                  <span className="text-xl font-serif text-amber-300 dark:text-amber-500/60 font-black leading-none">””</span>
                </div>

                {/* Nội dung giá trị cốt lõi */}
                <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                  {isVi ? (
                    <>
                      Tôi tin rằng sự hài lòng không đến từ sự hoàn hảo tuyệt đối, mà đến từ{" "}
                      <span className="font-black text-orange-600 dark:text-orange-400 underline decoration-orange-300 decoration-1 underline-offset-2">
                        sự tận tâm kịp thời
                      </span>{" "}
                      và{" "}
                      <span className="font-black text-rose-600 dark:text-rose-400 underline decoration-rose-300 decoration-1 underline-offset-2">
                        đồng cảm chân thành
                      </span>
                      .
                    </>
                  ) : (
                    <>
                      I believe satisfaction comes from{" "}
                      <span className="font-bold text-orange-600">timely dedication</span> and{" "}
                      <span className="font-bold text-rose-600">heartfelt empathy</span>.
                    </>
                  )}
                </p>

                {/* Dấu trích dẫn trang trí góc dưới */}
                <span className="absolute bottom-1 left-2 text-xl font-serif text-amber-300/70 dark:text-amber-600/40 font-black leading-none pointer-events-none">““</span>
              </div>
            </div>

            {/* CỘT 2: BA TRỤ CỘT VẬN HÀNH (OPERATIONAL PILLARS) */}
            <div 
              style={{ borderRadius: "calc(var(--theme-radius-card, var(--theme-radius, 24px)) - 4px)" }}
              className="bg-white/90 dark:bg-slate-900/85 border border-slate-200/90 dark:border-slate-800/90 p-4 sm:p-5.5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-4 text-left"
            >
              {/* Header Cột 2 */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25 shrink-0">
                  <Target className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-base sm:text-lg font-bold text-blue-950 dark:text-white leading-tight">
                    {isVi ? "Ba trụ cột vận hành" : "Operational Pillars"}
                  </h4>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                    OPERATIONAL PILLARS
                  </span>
                </div>
              </div>

              {/* 3 Thẻ Trụ Cột Gradient Rực Rỡ (01 Hiệu quả, 02 Nhân văn, 03 Bền vững) */}
              <div className="flex-1 flex flex-col justify-between gap-3.5">
                
                {/* 1. HIỆU QUẢ (01 - Gradient Xanh Dương/Tím) */}
                <div className="relative rounded-2xl p-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
                  {/* Số 01 góc trái mờ */}
                  <span className="absolute top-2 left-3 text-2xl sm:text-3xl font-black text-white/35 font-mono pointer-events-none select-none">
                    01
                  </span>

                  {/* Nút mũi tên tròn mờ góc phải */}
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white text-xs">
                    <span>›</span>
                  </div>

                  {/* Đồ họa biểu đồ cột mờ nền */}
                  <div className="absolute right-3 bottom-2 opacity-25 pointer-events-none flex items-end gap-1">
                    <div className="w-2 h-4 bg-white rounded-t-xs" />
                    <div className="w-2 h-7 bg-white rounded-t-xs" />
                    <div className="w-2 h-10 bg-white rounded-t-xs" />
                    <TrendingUp className="w-6 h-6 text-white stroke-[2.5] -ml-2 mb-4" />
                  </div>

                  {/* Nội dung Trụ cột 01 */}
                  <div className="flex flex-col items-center text-center mt-2 relative z-10">
                    <div className="w-10 h-10 rounded-full border border-white/50 bg-white/15 backdrop-blur-xs flex items-center justify-center mb-1 shadow-inner">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-base sm:text-lg font-black tracking-wider uppercase text-white drop-shadow-xs">
                      {isVi ? "HIỆU QUẢ" : "EFFICIENCY"}
                    </span>
                    <span className="text-xs font-semibold text-blue-100 mt-0.5">
                      {isVi ? "Tối ưu & Kết quả" : "Optimization & Results"}
                    </span>
                    <p className="text-[11px] text-blue-50/90 mt-1 leading-snug max-w-[240px]">
                      {isVi ? "Tối ưu hiệu suất, tạo kết quả đo lường được." : "Optimize performance, create measurable results."}
                    </p>
                  </div>
                </div>

                {/* 2. NHÂN VĂN (02 - Gradient Hồng/Đỏ/Tím) */}
                <div className="relative rounded-2xl p-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white shadow-md shadow-rose-500/25 overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
                  {/* Số 02 góc trái mờ */}
                  <span className="absolute top-2 left-3 text-2xl sm:text-3xl font-black text-white/35 font-mono pointer-events-none select-none">
                    02
                  </span>

                  {/* Nút mũi tên tròn mờ góc phải */}
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white text-xs">
                    <span>›</span>
                  </div>

                  {/* Đồ họa bóng người 3D mờ nền */}
                  <div className="absolute right-2 bottom-1 opacity-25 pointer-events-none flex items-center">
                    <Users className="w-12 h-12 text-white" />
                  </div>

                  {/* Nội dung Trụ cột 02 */}
                  <div className="flex flex-col items-center text-center mt-2 relative z-10">
                    <div className="w-10 h-10 rounded-full border border-white/50 bg-white/15 backdrop-blur-xs flex items-center justify-center mb-1 shadow-inner">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-base sm:text-lg font-black tracking-wider uppercase text-white drop-shadow-xs">
                      {isVi ? "NHÂN VĂN" : "HUMANITY"}
                    </span>
                    <span className="text-xs font-semibold text-rose-100 mt-0.5">
                      {isVi ? "Đồng cảm & Thấu hiểu" : "Empathy & Understanding"}
                    </span>
                    <p className="text-[11px] text-rose-50/90 mt-1 leading-snug max-w-[240px]">
                      {isVi ? "Lắng nghe, thấu hiểu và đặt con người làm trung tâm." : "Listen, empathize, and put people at the center."}
                    </p>
                  </div>
                </div>

                {/* 3. BỀN VỮNG (03 - Gradient Xanh Ngọc/Lá) */}
                <div className="relative rounded-2xl p-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-teal-700 text-white shadow-md shadow-teal-500/25 overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
                  {/* Số 03 góc trái mờ */}
                  <span className="absolute top-2 left-3 text-2xl sm:text-3xl font-black text-white/35 font-mono pointer-events-none select-none">
                    03
                  </span>

                  {/* Nút mũi tên tròn mờ góc phải */}
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white text-xs">
                    <span>›</span>
                  </div>

                  {/* Đồ họa chiếc lá mờ nền */}
                  <div className="absolute right-2 bottom-1 opacity-30 pointer-events-none flex items-center">
                    <Leaf className="w-12 h-12 text-white" />
                  </div>

                  {/* Nội dung Trụ cột 03 */}
                  <div className="flex flex-col items-center text-center mt-2 relative z-10">
                    <div className="w-10 h-10 rounded-full border border-white/50 bg-white/15 backdrop-blur-xs flex items-center justify-center mb-1 shadow-inner">
                      <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-base sm:text-lg font-black tracking-wider uppercase text-white drop-shadow-xs">
                      {isVi ? "BỀN VỮNG" : "SUSTAINABILITY"}
                    </span>
                    <span className="text-xs font-semibold text-teal-100 mt-0.5">
                      {isVi ? "Giá trị & Tin cậy" : "Value & Trust"}
                    </span>
                    <p className="text-[11px] text-teal-50/90 mt-1 leading-snug max-w-[240px]">
                      {isVi ? "Xây dựng niềm tin và giá trị bền vững." : "Build enduring trust and sustainable value."}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* CỘT 3: TRIẾT LÝ VÀ TẦM NHÌN (PHILOSOPHY & VISION) */}
            <div 
              style={{ borderRadius: "calc(var(--theme-radius-card, var(--theme-radius, 24px)) - 4px)" }}
              className="bg-white/90 dark:bg-slate-900/85 border border-slate-200/90 dark:border-slate-800/90 p-4 sm:p-5.5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-4 text-left"
            >
              {/* Header Cột 3 */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25 shrink-0">
                  <Star className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-base sm:text-lg font-bold text-blue-950 dark:text-white leading-tight">
                    {isVi ? "Triết lý và tầm nhìn" : "Philosophy & Vision"}
                  </h4>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                    PHILOSOPHY & VISION
                  </span>
                </div>
              </div>

              {/* Banner Triết lý nổi bật có viền xanh bên trái & dấu ngoặc kép */}
              <div className="relative p-3.5 sm:p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border-l-4 border-blue-600 border-y border-r border-blue-200/60 dark:border-blue-800/50 shadow-2xs">
                <span className="text-base sm:text-lg font-serif text-blue-600 dark:text-cyan-400 font-black leading-none">““</span>
                <p className="text-sm sm:text-[15px] font-black italic text-blue-700 dark:text-cyan-300 text-center leading-snug px-2">
                  {isVi 
                    ? "“Tận Tâm & Đồng Hành Cùng Trải Nghiệm Khách Hàng”" 
                    : "“Dedication & Companionship in Customer Experience”"}
                </p>
                <span className="text-base sm:text-lg font-serif text-blue-600 dark:text-cyan-400 font-black leading-none float-right -mt-2">””</span>
              </div>

              {/* Đoạn văn giải thích triết lý với "Họ luôn được lắng nghe" */}
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed text-justify">
                {isVi ? (
                  <>
                    Tôi luôn nỗ lực để mang lại sản phẩm, dịch vụ chất lượng cao với chi phí hợp lý. Và trên hết, để mỗi khách hàng cảm nhận được một điều đơn giản mà cốt lõi:{" "}
                    <span className="font-bold text-blue-700 dark:text-cyan-300">
                      Họ luôn được lắng nghe.
                    </span>
                  </>
                ) : (
                  <>
                    I always strive to deliver high-quality products and services at reasonable costs. And above all, so that every customer feels one simple yet core value:{" "}
                    <span className="font-bold text-blue-700 dark:text-cyan-300">
                      They are always listened to.
                    </span>
                  </>
                )}
              </p>

              {/* Khối Tầm nhìn có icon Mắt */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-blue-50/50 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700/60 flex items-start gap-2.5 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-200 leading-relaxed">
                  {isVi ? (
                    <>
                      <span className="font-black text-blue-800 dark:text-cyan-300">Tầm nhìn:</span> Kiến tạo giá trị thực sự cho doanh nghiệp thông qua việc tối ưu quy trình và phát triển năng lực của đội ngũ chăm sóc khách hàng trực diện, hướng tới sự phát triển toàn diện.
                    </>
                  ) : (
                    <>
                      <span className="font-black text-blue-800 dark:text-cyan-300">Vision:</span> Creating real business value by optimizing processes and developing customer care team capabilities.
                    </>
                  )}
                </p>
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
