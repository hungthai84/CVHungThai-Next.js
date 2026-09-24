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
import { IndustrialSubSection, industrialSubSectionVariants } from "./IndustrialStaggerContainer";

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
        <IndustrialSubSection hasIndustrialAccent>
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
        </IndustrialSubSection>


        {/* 2. HERO PROFILE, QUOTE & CONTACT ROW (Responsive Bento Grid: 1 col on mobile, 10 cols on large screens: Video 70% = 7 cols, Contact Card 30% = 3 cols) */}
        <IndustrialSubSection>
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-3 sm:gap-4 lg:gap-6 items-stretch w-full">
          
          {/* Left Column: Video Card (Single column on mobile, 7/10 cols on large screens) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="col-span-1 lg:col-span-7 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/60 dark:border-white/15 bg-slate-950/90 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.4)] min-h-[360px] xs:min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] flex items-center justify-center group"
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
              aria-label={isVi ? "Video chân dung giới thiệu chuyên gia CX & CS" : "Executive CX & CS profile portrait video"}
              onEnded={handleVideoEnded}
            />

            {/* Subtle Gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" aria-hidden="true" />

            {/* ========================================================================= */}
            {/* CÁC THẺ DẤU ẤN VẬN HÀNH LƠ LỬNG CHUYỂN ĐỘNG TẠI CHỖ XUNG QUANH VIDEO */}
            {/* ========================================================================= */}

            {/* 1. Top-Left Floating Badge: 22+ Năm (CX & CS Leadership) */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-20 pointer-events-auto bg-white/95 dark:bg-slate-950/90 backdrop-blur-xl border border-cyan-400/30 dark:border-cyan-400/40 rounded-xl p-2 sm:p-2.5 shadow-lg hover:scale-105 hover:border-cyan-400 hover:shadow-[0_8px_25px_rgba(6,182,212,0.35)] transition-all group flex items-center gap-2 sm:gap-2.5 max-w-[140px] xs:max-w-[155px] sm:max-w-[190px]"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-400/30 dark:border-cyan-400/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 shadow-xs">
                <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" aria-hidden="true" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-3xs sm:text-2xs font-bold text-slate-700 dark:text-slate-300 truncate leading-tight">
                  {isVi ? "Kinh nghiệm CX & CS" : "CX Leadership"}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-sm sm:text-base font-black text-cyan-600 dark:text-cyan-400 font-sans tracking-tight">
                    22+
                  </span>
                  <span className="text-3xs font-black text-cyan-600 dark:text-cyan-400 tracking-wider uppercase">
                    {isVi ? "NĂM" : "YRS"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 2. Top-Right Floating Badge: 8+ Môi trường (Enterprise Scale) */}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-20 pointer-events-auto bg-white/95 dark:bg-slate-950/90 backdrop-blur-xl border border-purple-400/30 dark:border-purple-400/40 rounded-xl p-2 sm:p-2.5 shadow-lg hover:scale-105 hover:border-purple-400 hover:shadow-[0_8px_25px_rgba(168,85,247,0.35)] transition-all group flex items-center gap-2 sm:gap-2.5 max-w-[140px] xs:max-w-[155px] sm:max-w-[190px]"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/10 dark:bg-purple-500/20 border border-purple-400/30 dark:border-purple-400/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-xs">
                <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" aria-hidden="true" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-3xs sm:text-2xs font-bold text-slate-700 dark:text-slate-300 truncate leading-tight">
                  {isVi ? "Quy mô lớn" : "Enterprise"}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-sm sm:text-base font-black text-purple-600 dark:text-purple-400 font-sans tracking-tight">
                    8+
                  </span>
                  <span className="text-3xs font-black text-purple-600 dark:text-purple-400 tracking-wider uppercase">
                    {isVi ? "TẬP ĐOÀN" : "CORPS"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 3. Middle-Right Floating Badge: 24/7 AI CRM (Smart Automation) */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1.0 }}
              className="absolute top-1/2 -translate-y-1/2 right-2.5 sm:right-4 z-20 pointer-events-auto bg-white/95 dark:bg-slate-950/90 backdrop-blur-xl border border-rose-400/30 dark:border-rose-400/40 rounded-xl p-2 sm:p-2.5 shadow-lg hover:scale-105 hover:border-rose-400 hover:shadow-[0_8px_25px_rgba(244,63,94,0.35)] transition-all group flex items-center gap-2 sm:gap-2.5 max-w-[140px] xs:max-w-[155px] sm:max-w-[190px]"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-500/10 dark:bg-rose-500/20 border border-rose-400/30 dark:border-rose-400/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" aria-hidden="true" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-3xs sm:text-2xs font-bold text-slate-700 dark:text-slate-300 truncate leading-tight">
                  {isVi ? "Tự động hóa" : "AI Automation"}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-sm sm:text-base font-black text-rose-600 dark:text-rose-400 font-sans tracking-tight">
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
              className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 z-20 pointer-events-auto bg-white/95 dark:bg-slate-950/90 backdrop-blur-xl border border-emerald-400/30 dark:border-emerald-400/40 rounded-xl p-2 sm:p-2.5 shadow-lg hover:scale-105 hover:border-emerald-400 hover:shadow-[0_8px_25px_rgba(16,185,129,0.35)] transition-all group flex items-center gap-2 sm:gap-2.5 max-w-[140px] xs:max-w-[155px] sm:max-w-[190px]"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-400/30 dark:border-emerald-400/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" aria-hidden="true" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-3xs sm:text-2xs font-bold text-slate-700 dark:text-slate-300 truncate leading-tight">
                  {isVi ? "Hài lòng KH" : "Satisfaction"}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400 font-sans tracking-tight">
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

          {/* Right Column: Contact Info Card (Single column on mobile, 3/10 cols on large screens) */}
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="col-span-1 lg:col-span-3 h-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-blue-200/80 dark:border-cyan-400/35 p-3.5 sm:p-4.5 shadow-[0_16px_40px_rgba(99,102,241,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(0,240,255,0.15)] hover:dark:border-cyan-400/60 transition-all duration-300 flex flex-col justify-start gap-3 min-w-0"
          >
            {/* Header */}
            <div className="flex flex-col gap-2 pb-2.5 border-b border-slate-200/70 dark:border-slate-800/80 font-['Play',sans-serif]">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 dark:bg-cyan-500/20 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-blue-500/20 dark:border-cyan-400/30 shadow-xs">
                    <User className="w-4.5 h-4.5 stroke-[2.5]" aria-hidden="true" />
                  </div>
                  <h6 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-cyan-300">
                    {isVi ? "Thông tin cá nhân" : "Personal profile"}
                  </h6>
                </div>
                <span className="text-3xs font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/10 dark:bg-cyan-500/15 text-blue-700 dark:text-cyan-300 border border-blue-500/20 dark:border-cyan-400/30">
                  EXECUTIVE BIO
                </span>
              </div>
            </div>

            {/* 6 Thông tin nhân khẩu & lý lịch hiển thị responsive (1 cột trên mobile/lg, 2 cột trên sm tablet) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 pr-0.5">
              
              {/* 1. Giới tính */}
              <div className="p-2.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/25 border border-blue-100/90 dark:border-blue-900/50 flex items-center gap-2.5 shadow-2xs hover:border-blue-400/60 dark:hover:border-cyan-400/60 hover:bg-white/90 dark:hover:bg-slate-800/80 transition-all min-w-0 group">
                <div className="w-8 h-8 rounded-lg border border-blue-400/30 bg-blue-500/15 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <User className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-3xs font-bold text-blue-600/80 dark:text-cyan-400/80 uppercase tracking-wider truncate">
                    {isVi ? "Giới tính" : "Gender"}
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                    {isVi ? "Nam giới" : "Male"}
                  </span>
                </div>
              </div>

              {/* 2. Dân tộc */}
              <div className="p-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/25 border border-indigo-100/90 dark:border-indigo-900/50 flex items-center gap-2.5 shadow-2xs hover:border-indigo-400/60 dark:hover:border-indigo-400/60 hover:bg-white/90 dark:hover:bg-slate-800/80 transition-all min-w-0 group">
                <div className="w-8 h-8 rounded-lg border border-indigo-400/30 bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Users className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-3xs font-bold text-indigo-600/80 dark:text-indigo-400/80 uppercase tracking-wider truncate">
                    {isVi ? "Dân tộc" : "Ethnicity"}
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                    {isVi ? "Kinh" : "Kinh"}
                  </span>
                </div>
              </div>

              {/* 3. Tình trạng */}
              <div className="p-2.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/25 border border-rose-100/90 dark:border-rose-900/50 flex items-center gap-2.5 shadow-2xs hover:border-rose-400/60 dark:hover:border-rose-400/60 hover:bg-white/90 dark:hover:bg-slate-800/80 transition-all min-w-0 group">
                <div className="w-8 h-8 rounded-lg border border-rose-400/30 bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Heart className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-3xs font-bold text-rose-600/80 dark:text-rose-400/80 uppercase tracking-wider truncate">
                    {isVi ? "Tình trạng" : "Status"}
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                    {isVi ? "Độc thân" : "Single"}
                  </span>
                </div>
              </div>

              {/* 4. Sinh nhật */}
              <div className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/25 border border-amber-100/90 dark:border-amber-900/50 flex items-center gap-2.5 shadow-2xs hover:border-amber-400/60 dark:hover:border-amber-400/60 hover:bg-white/90 dark:hover:bg-slate-800/80 transition-all min-w-0 group">
                <div className="w-8 h-8 rounded-lg border border-amber-400/30 bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-3xs font-bold text-amber-600/80 dark:text-amber-400/80 uppercase tracking-wider truncate">
                    {isVi ? "Sinh nhật" : "Date of Birth"}
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 font-mono truncate">
                    22/06/1984
                  </span>
                </div>
              </div>

              {/* 5. Tạm trú */}
              <div className="p-2.5 rounded-xl bg-purple-50/50 dark:bg-purple-950/25 border border-purple-100/90 dark:border-purple-900/50 flex items-center gap-2.5 shadow-2xs hover:border-purple-400/60 dark:hover:border-purple-400/60 hover:bg-white/90 dark:hover:bg-slate-800/80 transition-all min-w-0 group">
                <div className="w-8 h-8 rounded-lg border border-purple-400/30 bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-3xs font-bold text-purple-600/80 dark:text-purple-400/80 uppercase tracking-wider truncate">
                    {isVi ? "Tạm trú" : "Temp. Residence"}
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate" title="Q7, Hồ Chí Minh">
                    Q7, Hồ Chí Minh
                  </span>
                </div>
              </div>

              {/* 6. Cư trú */}
              <div className="p-2.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/25 border border-emerald-100/90 dark:border-emerald-900/50 flex items-center gap-2.5 shadow-2xs hover:border-emerald-400/60 dark:hover:border-emerald-400/60 hover:bg-white/90 dark:hover:bg-slate-800/80 transition-all min-w-0 group">
                <div className="w-8 h-8 rounded-lg border border-emerald-400/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Home className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-3xs font-bold text-emerald-600/80 dark:text-emerald-400/80 uppercase tracking-wider truncate">
                    {isVi ? "Cư trú" : "Hometown"}
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate" title="Mỹ Tho, Tiền Giang">
                    Mỹ Tho, Tiền Giang
                  </span>
                </div>
              </div>

            </div>

          </motion.div>

        </div>
        </IndustrialSubSection>

        {/* 4. CHÂN DUNG & TRIẾT LÝ VẬN HÀNH (KHỐI BENTO 3 CỘT NGUYÊN MẪU CHÍNH XÁC NHƯ HÌNH ĐÍNH KÈM) */}
        <IndustrialSubSection>
          <div 
            style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 24px))" }}
            className="w-full relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white/95 to-blue-50/30 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-950/95 backdrop-blur-2xl border border-blue-200/80 dark:border-cyan-500/30 p-4 sm:p-6 lg:p-7 shadow-[0_20px_50px_rgba(37,99,235,0.08),inset_0_1.5px_2px_rgba(255,255,255,0.95)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(0,240,255,0.15)] flex flex-col gap-5 sm:gap-6 text-slate-800 dark:text-slate-100"
          >


          {/* B. Bố cục Bento 3 Cột (Giới thiệu bản thân | Ba trụ cột vận hành | Triết lý & tầm nhìn) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch w-full">
            
            {/* CỘT 1: GIỚI THIỆU BẢN THÂN TÔI (ABOUT ME) */}
            <div 
              style={{ borderRadius: "calc(var(--theme-radius-card, var(--theme-radius, 24px)) - 4px)" }}
              className="bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 p-4.5 sm:p-6 shadow-md hover:shadow-lg hover:border-blue-300/60 dark:hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between gap-4 text-left"
            >
              {/* Header Cột 1 */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25 shrink-0">
                  <User className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    {isVi ? "Giới thiệu bản thân tôi" : "About Me"}
                  </h4>
                  <span className="text-3xs font-mono font-bold tracking-widest text-blue-600 dark:text-cyan-400 uppercase mt-0.5">
                    EXECUTIVE PROFILE
                  </span>
                </div>
              </div>

              {/* Đoạn văn giới thiệu với badge "22 năm kinh nghiệm" */}
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed text-justify space-y-2.5">
                <p>
                  {isVi ? (
                    <>
                      Một chuyên gia dịch vụ khách hàng với hơn{" "}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-500/10 dark:bg-cyan-500/15 border border-blue-500/25 dark:border-cyan-400/30 text-blue-700 dark:text-cyan-300 font-bold mx-0.5 shadow-2xs">
                        22 năm kinh nghiệm
                      </span>{" "}
                      thực chiến. Với tôi, Chăm Sóc Khách Hàng không chỉ là phục vụ, mà là sự đồng hành. Mỗi cuộc trò chuyện, mỗi khoảnh khắc, dù là nhỏ nhất, đều là một cơ hội quý giá: để lắng nghe, để thấu hiểu, và để tạo ra những trải nghiệm vượt trên cả sự mong đợi.
                    </>
                  ) : (
                    <>
                      A customer service expert with over{" "}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-500/10 dark:bg-cyan-500/15 border border-blue-500/25 dark:border-cyan-400/30 text-blue-700 dark:text-cyan-300 font-bold mx-0.5 shadow-2xs">
                        22 years of experience
                      </span>{" "}
                      in real-world operations. For me, Customer Service is not just support, but true companionship. Every conversation and touchpoint is a genuine opportunity to listen, empathize, and craft exceptional experiences that exceed expectations.
                    </>
                  )}
                </p>
              </div>

              {/* Hộp "Giá trị cốt lõi" màu cam viền bo tròn có dấu ngoặc kép */}
              <div className="relative p-4 rounded-2xl bg-gradient-to-r from-orange-50/90 via-amber-50/60 to-orange-50/80 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-amber-950/40 border border-amber-300/80 dark:border-amber-500/50 shadow-sm flex flex-col gap-2">
                {/* Header Giá trị cốt lõi */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-orange-500 text-white flex items-center justify-center shadow-xs">
                      <Heart className="w-3.5 h-3.5 fill-white" aria-hidden="true" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-orange-700 dark:text-orange-300 uppercase tracking-wide">
                      {isVi ? "Giá trị cốt lõi" : "Core Value"}
                    </span>
                  </div>
                  <span className="text-2xl font-serif text-amber-400 dark:text-amber-500/70 font-black leading-none select-none">””</span>
                </div>

                {/* Nội dung giá trị cốt lõi */}
                <p className="text-xs sm:text-[13px] text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                  {isVi ? (
                    <>
                      Tôi tin rằng sự hài lòng không đến từ sự hoàn hảo tuyệt đối, mà đến từ{" "}
                      <span className="font-bold text-orange-600 dark:text-orange-400 underline decoration-orange-400 decoration-1 underline-offset-2">
                        sự tận tâm kịp thời
                      </span>{" "}
                      và{" "}
                      <span className="font-bold text-rose-600 dark:text-rose-400 underline decoration-rose-400 decoration-1 underline-offset-2">
                        đồng cảm chân thành
                      </span>
                      .
                    </>
                  ) : (
                    <>
                      I believe satisfaction comes from{" "}
                      <span className="font-bold text-orange-600 dark:text-orange-400">timely dedication</span> and{" "}
                      <span className="font-bold text-rose-600 dark:text-rose-400">heartfelt empathy</span>.
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* CỘT 2: BA TRỤ CỘT VẬN HÀNH (OPERATIONAL PILLARS) */}
            <div 
              style={{ borderRadius: "calc(var(--theme-radius-card, var(--theme-radius, 24px)) - 4px)" }}
              className="bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 p-4.5 sm:p-6 shadow-md hover:shadow-lg hover:border-blue-300/60 dark:hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between gap-4 text-left"
            >
              {/* Header Cột 2 */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25 shrink-0">
                  <Target className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    {isVi ? "Ba trụ cột vận hành" : "Operational Pillars"}
                  </h4>
                  <span className="text-3xs font-mono font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase mt-0.5">
                    CORE FRAMEWORK
                  </span>
                </div>
              </div>

              {/* 3 Thẻ Trụ Cột Gradient Rực Rỡ (01 Hiệu quả, 02 Nhân văn, 03 Bền vững) */}
              <div className="flex-1 flex flex-col justify-between gap-3">
                
                {/* 1. HIỆU QUẢ (01 - Gradient Xanh Dương/Tím) */}
                <div 
                  tabIndex={0}
                  role="article"
                  aria-label={isVi ? "Trụ cột 01: Hiệu quả - Tối ưu & Kết quả" : "Pillar 01: Efficiency - Optimization & Results"}
                  className="relative rounded-2xl p-3.5 sm:p-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {/* Số 01 góc trái mờ */}
                  <span className="absolute top-2 left-3 text-2xl sm:text-3xl font-black text-white/35 font-mono pointer-events-none select-none">
                    01
                  </span>

                  {/* Nút mũi tên tròn mờ góc phải */}
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white text-xs" aria-hidden="true">
                    <span>›</span>
                  </div>

                  {/* Đồ họa biểu đồ cột mờ nền */}
                  <div className="absolute right-3 bottom-2 opacity-25 pointer-events-none flex items-end gap-1" aria-hidden="true">
                    <div className="w-2 h-4 bg-white rounded-t-xs" />
                    <div className="w-2 h-7 bg-white rounded-t-xs" />
                    <div className="w-2 h-10 bg-white rounded-t-xs" />
                    <TrendingUp className="w-6 h-6 text-white stroke-[2.5] -ml-2 mb-4" />
                  </div>

                  {/* Nội dung Trụ cột 01 */}
                  <div className="flex flex-col items-center text-center mt-1 relative z-10">
                    <div className="w-9 h-9 rounded-full border border-white/50 bg-white/15 backdrop-blur-xs flex items-center justify-center mb-1 shadow-inner">
                      <Target className="w-4.5 h-4.5 text-white" aria-hidden="true" />
                    </div>
                    <span className="text-sm sm:text-base font-black tracking-wider uppercase text-white drop-shadow-xs">
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
                <div 
                  tabIndex={0}
                  role="article"
                  aria-label={isVi ? "Trụ cột 02: Nhân văn - Đồng cảm & Thấu hiểu" : "Pillar 02: Humanity - Empathy & Understanding"}
                  className="relative rounded-2xl p-3.5 sm:p-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white shadow-md shadow-rose-500/25 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {/* Số 02 góc trái mờ */}
                  <span className="absolute top-2 left-3 text-2xl sm:text-3xl font-black text-white/35 font-mono pointer-events-none select-none">
                    02
                  </span>

                  {/* Nút mũi tên tròn mờ góc phải */}
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white text-xs" aria-hidden="true">
                    <span>›</span>
                  </div>

                  {/* Đồ họa bóng người 3D mờ nền */}
                  <div className="absolute right-2 bottom-1 opacity-25 pointer-events-none flex items-center" aria-hidden="true">
                    <Users className="w-12 h-12 text-white" />
                  </div>

                  {/* Nội dung Trụ cột 02 */}
                  <div className="flex flex-col items-center text-center mt-1 relative z-10">
                    <div className="w-9 h-9 rounded-full border border-white/50 bg-white/15 backdrop-blur-xs flex items-center justify-center mb-1 shadow-inner">
                      <Heart className="w-4.5 h-4.5 text-white" aria-hidden="true" />
                    </div>
                    <span className="text-sm sm:text-base font-black tracking-wider uppercase text-white drop-shadow-xs">
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
                <div 
                  tabIndex={0}
                  role="article"
                  aria-label={isVi ? "Trụ cột 03: Bền vững - Giá trị & Tin cậy" : "Pillar 03: Sustainability - Value & Trust"}
                  className="relative rounded-2xl p-3.5 sm:p-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-teal-700 text-white shadow-md shadow-teal-500/25 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {/* Số 03 góc trái mờ */}
                  <span className="absolute top-2 left-3 text-2xl sm:text-3xl font-black text-white/35 font-mono pointer-events-none select-none">
                    03
                  </span>

                  {/* Nút mũi tên tròn mờ góc phải */}
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white text-xs" aria-hidden="true">
                    <span>›</span>
                  </div>

                  {/* Đồ họa chiếc lá mờ nền */}
                  <div className="absolute right-2 bottom-1 opacity-30 pointer-events-none flex items-center" aria-hidden="true">
                    <Leaf className="w-12 h-12 text-white" />
                  </div>

                  {/* Nội dung Trụ cột 03 */}
                  <div className="flex flex-col items-center text-center mt-1 relative z-10">
                    <div className="w-9 h-9 rounded-full border border-white/50 bg-white/15 backdrop-blur-xs flex items-center justify-center mb-1 shadow-inner">
                      <Leaf className="w-4.5 h-4.5 text-white" aria-hidden="true" />
                    </div>
                    <span className="text-sm sm:text-base font-black tracking-wider uppercase text-white drop-shadow-xs">
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
              className="bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 p-4.5 sm:p-6 shadow-md hover:shadow-lg hover:border-blue-300/60 dark:hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between gap-4 text-left"
            >
              {/* Header Cột 3 */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/25 shrink-0">
                  <Star className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    {isVi ? "Triết lý và tầm nhìn" : "Philosophy & Vision"}
                  </h4>
                  <span className="text-3xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mt-0.5">
                    CORE GUIDING PRINCIPLES
                  </span>
                </div>
              </div>

              {/* Banner Triết lý nổi bật có viền xanh bên trái & dấu ngoặc kép */}
              <div className="relative p-4 rounded-2xl bg-blue-50/90 dark:bg-blue-950/40 border-l-4 border-blue-600 border-y border-r border-blue-200/70 dark:border-blue-800/60 shadow-2xs">
                <span className="text-lg font-serif text-blue-600 dark:text-cyan-400 font-black leading-none select-none">““</span>
                <p className="text-sm sm:text-[15px] font-black italic text-blue-800 dark:text-cyan-300 text-center leading-snug px-2">
                  {isVi 
                    ? "“Tận Tâm & Đồng Hành Cùng Trải Nghiệm Khách Hàng”" 
                    : "“Dedication & Companionship in Customer Experience”"}
                </p>
                <span className="text-lg font-serif text-blue-600 dark:text-cyan-400 font-black leading-none float-right -mt-2 select-none">””</span>
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
              <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-slate-800/70 border border-blue-100 dark:border-slate-700/70 flex items-start gap-3 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-blue-500/15 dark:bg-cyan-500/20 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/20 dark:border-cyan-400/30">
                  <Compass className="w-4 h-4" aria-hidden="true" />
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
          </div>
        </IndustrialSubSection>

        {/* 5. BOTTOM CTA BANNER CARD */}
        <IndustrialSubSection>
          <div 
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
              aria-label={isVi ? "Chuyển đến trang liên hệ kết nối hợp tác" : "Navigate to Contact page for collaboration"}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_25px_rgba(37,99,235,0.45)] transition-all flex items-center justify-center gap-3 active:scale-95 cursor-pointer text-left backdrop-blur-md border border-white/20 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
            >
              <MessagesSquare className="w-5 h-5 text-white shrink-0" aria-hidden="true" />
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
          </div>
        </IndustrialSubSection>

      </div>
    </section>
  );
}
