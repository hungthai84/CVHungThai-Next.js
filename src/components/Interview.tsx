import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  Video,
  Play,
  Pause,
  Clock,
  Volume2,
  VolumeX,
  MessageSquare,
  MessagesSquare,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Building2,
  Layers,
  Award,
  RotateCcw,
  ListVideo
} from "lucide-react";
import { useLanguage } from "../i18n";
import { cn } from "../lib/utils";
import { PageCardHeader } from "./PageCardHeader";
import { motion, AnimatePresence } from "motion/react";

import {
  INTERVIEW_QUESTIONS,
  INTERVIEW_VIDEO_1_URL as VIDEO_1_URL,
  INTERVIEW_VIDEO_2_URL as VIDEO_2_URL,
} from "../data/interviewQuestions";
import { SparkleWithPlusDot } from "./HeroIntroButton";

export function Interview() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";
  const videoRef = useRef<HTMLVideoElement>(null);

  // States for Video & Audio
  const [isInterviewPlaying, setIsInterviewPlaying] = useState(false);
  const [isVideoAudioOn, setIsVideoAudioOn] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);

  // Active Question State (0 to 13)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Category Filter State with sessionStorage persistence
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("interview_active_tab") || "all";
    }
    return "all";
  });

  const handleSetActiveTab = (tabKey: string) => {
    setActiveTab(tabKey);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("interview_active_tab", tabKey);
    }
  };

  const TABS = useMemo(() => [
    { key: "all", labelVi: "Tất cả", labelEn: "All" },
    { key: "intro", labelVi: "Định vị", labelEn: "Intro" },
    { key: "management", labelVi: "Vận hành", labelEn: "Ops" },
    { key: "tech", labelVi: "Công nghệ", labelEn: "Tech" },
    { key: "strategy", labelVi: "Chiến lược", labelEn: "Strategy" },
    { key: "inquiry", labelVi: "Chất vấn", labelEn: "Inquiry" },
    { key: "closing", labelVi: "Lời kết", labelEn: "Closing" },
  ], []);

  // Filtered Questions list based on Category tab selection
  const filteredQuestions = useMemo(() => {
    if (activeTab === "all") return INTERVIEW_QUESTIONS;
    return INTERVIEW_QUESTIONS.filter((q) => q.categoryKey === activeTab);
  }, [activeTab]);

  // Sync Active Question with Video Playback Time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const time = video.currentTime;
      setCurrentTimeSec(time);

      if (!isInterviewPlaying) return;
      let idx = INTERVIEW_QUESTIONS.findIndex(
        (q) => time >= q.startSec && time < q.endSec
      );
      if (idx === -1) {
        // Fallback: find the last question that started before current time
        for (let i = INTERVIEW_QUESTIONS.length - 1; i >= 0; i--) {
          if (time >= INTERVIEW_QUESTIONS[i].startSec) {
            idx = i;
            break;
          }
        }
      }
      if (idx !== -1 && idx !== currentQuestionIndex) {
        setCurrentQuestionIndex(idx);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isInterviewPlaying, currentQuestionIndex]);

  // Handle video end event
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      if (isInterviewPlaying) {
        setIsInterviewPlaying(false);
        video.src = VIDEO_1_URL;
        video.loop = true;
        video.muted = true;
        video.load();
        video.play().catch(() => {});
      }
    };

    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [isInterviewPlaying]);

  const toggleInterview = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isInterviewPlaying) {
      setIsInterviewPlaying(false);
      video.src = VIDEO_1_URL;
      video.loop = true;
      video.muted = true;
      video.load();
      video.play().catch(() => {});
    } else {
      setIsInterviewPlaying(true);
      setIsVideoAudioOn(true);
      video.src = VIDEO_2_URL;
      video.loop = false;
      video.muted = false;
      video.load();
      video.currentTime = INTERVIEW_QUESTIONS[currentQuestionIndex].startSec;
      video.play().catch(() => {});
    }
  };

  // Seek video to specific question
  const handleSelectQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    const q = INTERVIEW_QUESTIONS[index];
    const video = videoRef.current;
    if (!video) return;

    if (!isInterviewPlaying || video.src !== VIDEO_2_URL) {
      setIsInterviewPlaying(true);
      setIsVideoAudioOn(true);
      video.src = VIDEO_2_URL;
      video.loop = false;
      video.muted = false;
      video.load();
      video.currentTime = q.startSec;
      video.play().catch(() => {});
    } else {
      video.currentTime = q.startSec;
      if (video.paused) {
        video.play().catch(() => {});
      }
    }
  };

  const currentQ = INTERVIEW_QUESTIONS[currentQuestionIndex] || INTERVIEW_QUESTIONS[0];

  // Calculate current question playback progress
  const questionDuration = Math.max(1, currentQ.endSec - currentQ.startSec);
  const elapsedInQuestion = Math.max(0, Math.min(questionDuration, currentTimeSec - currentQ.startSec));
  const progressPercent = isInterviewPlaying 
    ? Math.min(100, Math.max(0, (elapsedInQuestion / questionDuration) * 100))
    : 0;

  return (
    <section 
      id="interview" 
      className="relative w-full h-full flex flex-col justify-start items-stretch p-[15px] pb-[15px] font-sans text-slate-800 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar"
    >
      <div className="w-full flex-grow flex flex-col gap-[15px] max-w-7xl mx-auto justify-start relative z-10 pb-[15px]">

        {/* Header Card Phỏng vấn */}
        <PageCardHeader pageId="interview">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-4 bg-pink-600 dark:bg-pink-400 rounded-full shrink-0" />
            <span className="text-caption font-semibold font-mono text-pink-700 dark:text-pink-300 bg-pink-500/15 px-2.5 py-0.5 rounded-full border border-pink-500/30 shadow-2xs">
              {isVi ? "Đối thoại Mô phỏng" : "Interactive Simulated AI Q&A"}
            </span>
          </div>
        </PageCardHeader>

        {/* Optimised grid layout: Left (7 cols on lg) for video & response, Right (5 cols on lg) for playlist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 w-full items-stretch flex-1">

          {/* LEFT AREA: Video Player + Response (7 columns on lg) */}
          <div className="w-full lg:col-span-7 flex flex-col gap-4 sm:gap-5 min-h-0">
            
            {/* 1. Video Player Hero Card */}
            <div 
              style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] lg:h-[350px] rounded-[var(--theme-radius-card,10px)] overflow-hidden border border-slate-200/80 dark:border-cyan-500/25 shadow-md hover:shadow-lg transition-all duration-300 bg-slate-950 group flex flex-col shrink-0"
            >
              <video
                ref={videoRef}
                controls={isInterviewPlaying}
                autoPlay
                loop={!isInterviewPlaying}
                muted={!isInterviewPlaying || !isVideoAudioOn}
                playsInline
                className="h-full w-full object-cover transition-transform duration-700 brightness-105 contrast-100 flex-1 min-h-0"
                src={isInterviewPlaying ? VIDEO_2_URL : VIDEO_1_URL}
              />

              {/* Subtle Gradient overlay for visual clarity */}
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/45" />

              {/* Top Left: Active Question Badge & Timecode */}
              <div className="pointer-events-none absolute left-3 sm:left-4 top-3 sm:top-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-white/20 backdrop-blur-md text-xs font-bold text-white shadow-md truncate max-w-[calc(100%-80px)]">
                <span className={cn(
                  "w-2 h-2 rounded-full shrink-0", 
                  isInterviewPlaying ? "bg-emerald-400 animate-ping" : "bg-cyan-400"
                )} />
                <span className="font-mono text-cyan-300 tracking-wide">
                  {isInterviewPlaying 
                    ? (isVi ? `Đang phát câu 0${currentQ.stt}` : `Playing Q0${currentQ.stt}`)
                    : (isVi ? "Sẵn sàng phỏng vấn" : "Interview Session Ready")}
                </span>
                <span className="text-white/40">·</span>
                <span className="text-slate-300 font-mono text-[11px] truncate">
                  {currentQ.timestamp}
                </span>
              </div>

              {/* Bottom Bar: Laser Play/Pause Capsule Button */}
              <div className="pointer-events-auto absolute right-3 sm:right-4 bottom-3 sm:bottom-4 z-20">
                <div 
                  className="relative inline-flex items-center justify-between rounded-full p-[2px] select-none group/container transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] w-auto max-w-fit h-[40px] sm:h-[44px] overflow-hidden shadow-[0_0_20px_rgba(78,86,246,0.5)] ring-2 ring-indigo-400/50"
                >
                  {/* Rotating Glowing Laser Beam Border */}
                  <div className="absolute -inset-[220%] animate-[spin_4s_linear_infinite] pointer-events-none bg-[conic-gradient(from_0deg,transparent_0_200deg,#4E56F6_250deg,#F125D6_300deg,#ffffff_340deg,#4E56F6_360deg)] opacity-100" />

                  {/* Subtle Animated Glowing Ring when Audio is Active */}
                  {isVideoAudioOn && isInterviewPlaying && (
                    <div className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400 opacity-70 blur-xs animate-pulse pointer-events-none" />
                  )}

                  {/* Capsule Outer Shell */}
                  <div className="relative z-10 inline-flex items-center justify-between w-auto max-w-fit h-full rounded-full bg-gradient-to-r from-[#4E56F6] via-[#8938F8] to-[#F125D6] px-2 py-1 gap-2 shadow-inner backdrop-blur-md">
                    
                    {/* Speaker Toggle Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const nextAudio = !isVideoAudioOn;
                        setIsVideoAudioOn(nextAudio);
                        if (videoRef.current) {
                          videoRef.current.muted = !nextAudio;
                        }
                      }}
                      className={cn(
                        "w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center shrink-0 p-0 transition-all duration-300 cursor-pointer active:scale-95 shadow-md",
                        isVideoAudioOn 
                          ? "bg-[#4E56F6] hover:bg-[#3b43e3] text-white shadow-[0_0_12px_rgba(78,86,246,0.9)]" 
                          : "bg-[#E60026] hover:bg-red-500 text-white shadow-[0_0_12px_rgba(230,0,38,0.9)]"
                      )}
                      title={isVideoAudioOn ? (isVi ? "Tắt âm thanh" : "Mute audio") : (isVi ? "Bật âm thanh" : "Unmute audio")}
                    >
                      {isVideoAudioOn ? (
                        <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      ) : (
                        <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      )}
                    </button>

                    {/* Divider */}
                    <div className="w-[1.5px] h-4 sm:h-5 bg-white/40 shrink-0 mx-0.5 rounded-full" />

                    {/* Main Play / Pause Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleInterview();
                      }}
                      className={cn(
                        "flex items-center justify-center gap-1.5 px-2.5 py-1 flex-1 min-w-0",
                        "text-white font-extrabold text-xs sm:text-xs tracking-wide transition-all duration-300 cursor-pointer",
                        "hover:opacity-95 active:scale-98"
                      )}
                      title={isInterviewPlaying ? (isVi ? "Dừng" : "Pause") : (isVi ? "Phát" : "Play")}
                    >
                      {isInterviewPlaying ? (
                        <>
                          <span className="drop-shadow-sm font-black uppercase tracking-wider text-2xs sm:text-xs truncate">
                            {isVi ? "Dừng phát" : "Pause"}
                          </span>
                          <Pause className="w-3.5 h-3.5 shrink-0 fill-current text-white" />
                        </>
                      ) : (
                        <>
                          <span className="drop-shadow-sm font-black uppercase tracking-wider text-2xs sm:text-xs text-white truncate">
                            {isVi ? "Phát phỏng vấn" : "Play Interview"}
                          </span>
                          <SparkleWithPlusDot className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 shrink-0 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Active Response details Card (Always displayed directly under video) */}
            <div 
              style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
              className="flex-1 rounded-[var(--theme-radius-card,10px)] border border-white/60 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-4.5 backdrop-blur-2xl shadow-md transition-all duration-300 text-left flex flex-col justify-between gap-4 relative min-h-[220px]"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-indigo-500/5 via-cyan-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 flex-1 flex flex-col min-h-0 relative z-10">
                
                {/* Top Bar inside Active Response: Icon không đóng khung & Tiêu đề 4 chữ hiệu ứng chuyển động bên trái */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800/80 shrink-0 flex-wrap gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <motion.div
                      animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 0.95, 1], y: [0, -2, 2, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                      className="shrink-0"
                    >
                      <MessagesSquare className="w-5.5 h-5.5 text-indigo-600 dark:text-cyan-400 stroke-[2.2] drop-shadow-sm" />
                    </motion.div>
                    <motion.h4 
                      animate={{ opacity: [0.92, 1, 0.92] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                      className="text-sm sm:text-base font-black font-play tracking-tight truncate"
                    >
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-cyan-300 dark:via-blue-300 dark:to-indigo-300">
                        {isVi ? "Chi Tiết Phỏng Vấn" : "Interview Details"}
                      </span>
                    </motion.h4>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-auto">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-600 dark:bg-cyan-500 text-white text-[11px] font-mono font-black shadow-xs tracking-wide">
                      <span>CÂU {currentQ.stt < 10 ? `0${currentQ.stt}` : currentQ.stt}</span>
                    </span>

                    {/* Equalizer Wavelet Indicator */}
                    <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200/50 dark:border-white/5 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      <span className={cn("w-1 rounded-full transition-all duration-300", isInterviewPlaying ? "bg-cyan-500 h-3 animate-pulse" : "bg-slate-400 h-1.5")} />
                      <span className={cn("w-1 rounded-full transition-all duration-300", isInterviewPlaying ? "bg-indigo-500 h-4.5 animate-bounce" : "bg-slate-400 h-2.5")} style={{ animationDelay: "0.1s" }} />
                      <span className="ml-1 text-xs">
                        {isInterviewPlaying ? (isVi ? "Đang phát" : "Playing") : (isVi ? "Đang chọn" : "Active")}
                      </span>
                    </div>

                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 font-mono tracking-wide hidden sm:inline-block">
                      {isVi ? currentQ.categoryVi : currentQ.categoryEn}
                    </span>
                  </div>
                </div>

                {/* Progress bar of current segment */}
                <div className="flex items-center justify-between gap-3 px-3 py-1.5 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/30 shrink-0 text-xs font-semibold">
                  <div className="flex items-center gap-1.5 text-indigo-700 dark:text-cyan-300 font-mono">
                    <Clock size={12} className="text-indigo-600 dark:text-cyan-400" />
                    <span>{currentQ.timestamp}</span>
                  </div>

                  <div className="flex items-center gap-2 flex-1 max-w-[200px]">
                    <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-200"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 shrink-0">
                      {Math.round(questionDuration)}s
                    </span>
                  </div>
                </div>

                {/* Question & Response Dialogue bubble container */}
                <div className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar min-h-0 text-xs sm:text-sm">
                  
                  {/* Asker and Question */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                        {isVi ? currentQ.askerVi : currentQ.askerEn}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {isVi ? currentQ.questionVi : currentQ.questionEn}
                    </h3>
                  </div>

                  {/* Answerer and Answer */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-indigo-50/40 dark:bg-slate-800/30 border border-indigo-100/40 dark:border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                        {isVi ? currentQ.answererVi : currentQ.answererEn}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                      {isVi ? currentQ.answerVi : currentQ.answerEn}
                    </p>
                  </div>

                  {/* Key Takeaway Banner */}
                  {currentQ.keyTakeawayVi && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2 shrink-0">
                      <Award className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-xs text-amber-950 dark:text-amber-300 font-medium leading-relaxed">
                        <span className="font-bold">{isVi ? "🎯 Trọng tâm: " : "🎯 Strategic focus: "}</span>
                        {isVi ? currentQ.keyTakeawayVi : currentQ.keyTakeawayEn}
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Navigation Controls inside Response Area */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between mt-auto shrink-0 relative z-10">
                <button
                  type="button"
                  disabled={currentQuestionIndex === 0}
                  onClick={() => handleSelectQuestion(Math.max(0, currentQuestionIndex - 1))}
                  className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-cyan-400 disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1 transition-colors py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{isVi ? "Câu trước" : "Previous"}</span>
                </button>

                {/* Quick Replay current chapter */}
                <button
                  type="button"
                  onClick={() => handleSelectQuestion(currentQuestionIndex)}
                  className="text-xs font-bold text-indigo-700 dark:text-cyan-300 hover:underline flex items-center gap-1.5 cursor-pointer py-1 px-2.5"
                  title={isVi ? "Phát lại từ đầu" : "Replay this question"}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isVi ? "Phát lại đoạn" : "Replay Chapter"}</span>
                </button>

                <button
                  type="button"
                  disabled={currentQuestionIndex === INTERVIEW_QUESTIONS.length - 1}
                  onClick={() => handleSelectQuestion(Math.min(INTERVIEW_QUESTIONS.length - 1, currentQuestionIndex + 1))}
                  className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-cyan-400 disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1 transition-colors py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <span>{isVi ? "Câu tiếp" : "Next"}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT AREA: Interactive Question Playlist & Category Filters (5 columns on lg) */}
          {/* This is a beautifully designed, highly functional, always-visible navigation system that fully solves the lost tabs bug! */}
          <div className="w-full lg:col-span-5 flex flex-col h-full min-h-[420px] sm:min-h-[480px] lg:h-full">
            <div 
              style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
              className="w-full h-full rounded-[var(--theme-radius-card,10px)] border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-4 backdrop-blur-2xl shadow-md transition-all duration-300 text-left flex flex-col gap-3 relative overflow-hidden"
            >
              {/* Header of Playlist Card */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800/80 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-cyan-400">
                    <ListVideo className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-play">
                    {isVi ? "Nội dung phỏng vấn" : "Interview Playlist"}
                  </h4>
                </div>
                <span className="text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400">
                  {filteredQuestions.length} {isVi ? "câu hỏi" : "questions"}
                </span>
              </div>

              {/* Category Filter Tabs (Uncollapsed & Always visible, resolving the user's specific complaint) */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 bg-slate-100/80 dark:bg-slate-950/60 rounded-xl border border-slate-200/40 dark:border-white/5 shrink-0 select-none">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => handleSetActiveTab(tab.key)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-[11px] font-extrabold transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0",
                        isActive
                          ? "bg-indigo-600 dark:bg-cyan-500 text-white shadow-md shadow-indigo-600/20 dark:shadow-cyan-500/10"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/40"
                      )}
                    >
                      {isVi ? tab.labelVi : tab.labelEn}
                    </button>
                  );
                })}
              </div>

              {/* Scrollable Questions list matching active category tab (giao diện bento-grid, tăng độ tương phản, hiệu ứng hover) */}
              <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 custom-scrollbar min-h-0">
                {filteredQuestions.map((q) => {
                  const absoluteIndex = INTERVIEW_QUESTIONS.findIndex(item => item.id === q.id);
                  const isCurrent = currentQuestionIndex === absoluteIndex;
                  return (
                    <motion.button
                      whileHover={{ y: -2, scale: 1.012 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      key={q.id}
                      type="button"
                      onClick={() => handleSelectQuestion(absoluteIndex)}
                      className={cn(
                        "w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex flex-col gap-2 group/item cursor-pointer relative overflow-hidden",
                        isCurrent
                          ? "bg-indigo-500/10 dark:bg-cyan-500/10 border-indigo-500/60 dark:border-cyan-400/60 shadow-[0_4px_12px_rgba(78,86,246,0.12)] ring-1 ring-indigo-500/20"
                          : "bg-white/40 dark:bg-slate-950/25 border-slate-200/80 dark:border-white/5 hover:bg-white/80 dark:hover:bg-slate-800/40 hover:border-indigo-400/50 dark:hover:border-cyan-400/50 hover:shadow-md"
                      )}
                    >
                      {/* Active Left Indicator Line */}
                      {isCurrent && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-cyan-400" />
                      )}

                      {/* Question Index Badge & Time stamp */}
                      <div className="flex items-center justify-between gap-2 w-full select-none">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={cn(
                            "text-[10px] font-mono font-black px-1.5 py-0.5 rounded-md tracking-wider shadow-2xs shrink-0",
                            isCurrent
                              ? "bg-indigo-600 dark:bg-cyan-500 text-white"
                              : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                          )}>
                            {isVi ? `CÂU 0${q.stt}` : `Q0${q.stt}`}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold">
                            {q.timestamp}
                          </span>
                        </div>

                        {/* Audio wave pulse icon */}
                        {isCurrent && isInterviewPlaying && (
                          <div className="flex items-end gap-0.5 h-3 shrink-0 mr-1">
                            <span className="w-0.75 bg-indigo-600 dark:bg-cyan-400 rounded-full animate-bounce h-3" style={{ animationDuration: "0.8s", animationDelay: "0s" }} />
                            <span className="w-0.75 bg-indigo-600 dark:bg-cyan-400 rounded-full animate-bounce h-2" style={{ animationDuration: "0.6s", animationDelay: "0.2s" }} />
                            <span className="w-0.75 bg-indigo-600 dark:bg-cyan-400 rounded-full animate-bounce h-4" style={{ animationDuration: "0.9s", animationDelay: "0.1s" }} />
                          </div>
                        )}
                      </div>

                      {/* Question Text with high contrast */}
                      <h5 className={cn(
                        "text-xs sm:text-sm font-extrabold leading-tight transition-colors duration-200 line-clamp-2",
                        isCurrent
                          ? "text-indigo-950 dark:text-cyan-300 font-black"
                          : "text-slate-900 dark:text-slate-100 group-hover/item:text-indigo-600 dark:group-hover/item:text-cyan-400"
                      )}>
                        {isVi ? q.questionVi : q.questionEn}
                      </h5>

                      {/* Summary text and Category Key label */}
                      <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-slate-250/50 dark:border-white/10 mt-0.5 select-none text-[10px]">
                        <span className="text-slate-650 dark:text-slate-350 font-semibold truncate max-w-[75%]">
                          {isVi ? q.summaryVi : q.summaryEn}
                        </span>
                        <span className={cn(
                          "font-black uppercase tracking-wider shrink-0 transition-colors",
                          isCurrent ? "text-indigo-600 dark:text-cyan-400" : "text-slate-500 dark:text-slate-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-cyan-400"
                        )}>
                          {isVi ? q.categoryVi.split(" ")[0] : q.categoryEn.split(" ")[0]}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}

                {/* Empty State when no questions match filter */}
                {filteredQuestions.length === 0 && (
                  <div className="text-center py-10 px-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {isVi ? "Không tìm thấy câu hỏi phù hợp." : "No matching questions found."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Interview;
