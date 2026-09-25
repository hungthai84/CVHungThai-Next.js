import React, { useState, useRef } from "react";
import { 
  User, Heart, Leaf, Target, TrendingUp, Building2,
  Briefcase, Bot, MapPin, ChevronRight, ArrowRight,
  Send, FileText, Settings, Database, Cpu, Star, Compass,
  Share2, Users, Calendar, Home, BarChart3, Eye, Quote,
  MessagesSquare, Sparkles, Lightbulb, Handshake, MoreHorizontal
} from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../i18n";
import { HeroIntroButton } from "./HeroIntroButton";
import { MagneticBentoWrapper } from "./MagneticBentoWrapper";
import { PageCardHeader } from "./PageCardHeader";
import { DynamicVideoStoryOverlay } from "./DynamicVideoStoryOverlay";

const ABOUT_IDLE_VIDEO_URL = "https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4";
const ABOUT_INTRO_VIDEO_URL = "https://cdn.scena.ai/project/8606/5f84521bf5c51ff234fb0f4029fb9fba29e7e386f13912a56bc7ee25aebcbc10.mp4";

export default function About() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

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
      className="relative w-full min-h-full flex flex-col justify-start items-center p-3 xs:p-3.5 sm:p-4.5 md:p-6 lg:p-8 font-sans text-slate-800 dark:text-slate-100"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">

        {/* 1. TOP HEADER BANNER CARD */}
        <PageCardHeader pageId="about">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-5 bg-blue-600 dark:bg-cyan-400 rounded-full shrink-0" />
            <span className="text-caption font-semibold font-mono text-blue-700 dark:text-cyan-300 bg-blue-500/15 px-2.5 py-0.5 rounded-full border border-blue-500/30 shadow-2xs">
              {isVi ? "22+ Năm kinh nghiệm CX & CS" : "22+ Years CX & Operations Experience"}
            </span>
          </div>
        </PageCardHeader>

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
            {/* Header formatted like Trụ cột cống hiến */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-blue-200/60 dark:border-blue-800/60 mb-1">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <User className="w-5 h-5 text-blue-600 dark:text-cyan-400 shrink-0" />
                <h6 className="text-h6 font-bold text-blue-600 dark:text-cyan-400 tracking-wide">
                  {isVi ? "Thông tin cá nhân" : "Personal profile"}
                </h6>
              </div>
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

        {/* 3. HERO HIGHLIGHT LANDSCAPE BANNER - GIỚI THIỆU CHUYÊN GIA */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full relative overflow-hidden rounded-3xl border border-[var(--grid-banner-border,rgba(191,219,254,0.85))] bg-gradient-to-r from-[#F0F7FF] via-[#E8F3FF] to-[#D9ECFF] dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-950 p-6 sm:p-8 lg:p-9 shadow-sm flex flex-col gap-5 transition-all duration-300"
        >
          {/* Header */}
          <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-blue-200/60 dark:border-blue-800/60 mb-1">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <User className="w-5 h-5 text-blue-600 dark:text-cyan-400 shrink-0" />
              <h6 className="text-h6 font-bold text-blue-600 dark:text-cyan-400 tracking-wide">
                {isVi ? "Giới thiệu bản thân & Triết lý vận hành" : "Personal Introduction & Operating Philosophy"}
              </h6>
            </div>
            <span className="text-3xs font-mono font-bold text-blue-800 dark:text-cyan-300 bg-blue-50 dark:bg-cyan-950/60 px-2.5 py-1 rounded-full border border-blue-200/80 dark:border-cyan-600/40">
              {isVi ? "22+ Năm kinh nghiệm thực chiến" : "22+ Years Hands-on Experience"}
            </span>
          </div>

          <div className="space-y-4 text-left">
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
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
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

            {/* 3 Core Values Block: Hiệu quả – Nhân văn – Bền vững */}
            <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-blue-200/90 dark:border-blue-800/80 shadow-xs flex flex-col sm:flex-row items-center justify-around gap-3 my-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-sm sm:text-base font-black text-blue-700 dark:text-cyan-300 tracking-wide uppercase">
                  {isVi ? "Hiệu quả" : "Efficiency"}
                </span>
              </div>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700 font-black">–</span>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-sm sm:text-base font-black text-purple-700 dark:text-purple-300 tracking-wide uppercase">
                  {isVi ? "Nhân văn" : "Humanity"}
                </span>
              </div>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700 font-black">–</span>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm sm:text-base font-black text-emerald-700 dark:text-emerald-300 tracking-wide uppercase">
                  {isVi ? "Bền vững" : "Sustainability"}
                </span>
              </div>
            </div>

            {/* Paragraph 3 */}
            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium leading-relaxed pt-1">
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
                  <span className="font-black text-[#0057FF] dark:text-cyan-300">
                    They are always listened to.
                  </span>
                </>
              )}
            </p>
          </div>
        </motion.div>

        {/* 4. TRIẾT LÝ VÀ TẦM NHÌN STRATEGIC VISION */}
        <div className="w-full">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-slate-900/90 border border-[var(--grid-card-border,rgba(226,232,240,0.85))] rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 text-left h-full"
          >
            {/* Header */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-purple-200/60 dark:border-purple-800/60 mb-1">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <Star className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
                <h6 className="text-h6 font-bold text-purple-600 dark:text-purple-400 tracking-wide">
                  {isVi ? "Tầm nhìn chiến lược" : "Strategic Vision"}
                </h6>
              </div>
            </div>

            {/* Tầm nhìn chiến lược Card */}
            <div className="relative p-4 rounded-2xl bg-[#FFF8F0] dark:bg-orange-950/20 border border-[#FFEDD5] dark:border-orange-900/40 shadow-2xs flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6.5 h-6.5 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-xs">
                    <Target className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                  </div>
                  <span className="text-xs sm:text-sm font-black text-orange-600 dark:text-orange-400 uppercase">
                    {isVi ? "Định hướng phát triển" : "Strategic Direction"}
                  </span>
                </div>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                </div>
              </div>

              <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-200 leading-relaxed font-medium text-justify">
                {isVi ? (
                  <>
                    Kiến tạo giá trị thực sự cho doanh nghiệp thông qua việc{" "}
                    <span className="font-black text-rose-600 dark:text-rose-400 underline decoration-rose-400 decoration-2 underline-offset-2">
                      tối ưu quy trình
                    </span>{" "}
                    và{" "}
                    <span className="font-black text-rose-600 dark:text-rose-400 underline decoration-rose-400 decoration-2 underline-offset-2">
                      phát triển năng lực đội ngũ
                    </span>
                    , chăm sóc khách hàng trực diện, hướng tới sự phát triển toàn diện và bền vững.
                  </>
                ) : (
                  <>
                    Creating real business value by{" "}
                    <span className="font-black text-rose-600">optimizing processes</span> and{" "}
                    <span className="font-black text-rose-600">developing customer care team capabilities</span>.
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
