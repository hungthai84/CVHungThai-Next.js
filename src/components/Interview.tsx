import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  Video,
  Play,
  Pause,
  Clock,
  Volume2,
  VolumeX,
  MessageSquare,
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
      <div className="w-full max-w-full h-full min-h-full flex-grow flex-1 flex flex-col gap-[15px] mx-auto justify-start relative z-10 pb-[15px]">

        {/* Header Card Phỏng vấn */}
        <PageCardHeader pageId="interview">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-4 bg-pink-600 dark:bg-pink-400 rounded-full shrink-0" />
            <span className="text-caption font-semibold font-mono text-pink-700 dark:text-pink-300 bg-pink-500/15 px-2.5 py-0.5 rounded-full border border-pink-500/30 shadow-2xs">
              {isVi ? "Đối thoại Mô phỏng" : "Interactive Simulated AI Q&A"}
            </span>
          </div>
        </PageCardHeader>

        {/* Optimised grid layout: Left for Video Presentation (70%), Right for Response Details (30%) */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 sm:gap-5 w-full items-stretch flex-1 p-[15px] h-full min-h-[520px] lg:h-[600px] overflow-hidden rounded-2xl max-w-full">

          {/* LEFT AREA: Video Presentation Screen Card (70% on Desktop) */}
          <div className="w-full lg:col-span-7 flex flex-col h-full min-h-0">
            
            {/* 1. Video Player Hero Card */}
            <div 
              style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
              className="relative w-full h-full rounded-[var(--theme-radius-card,10px)] overflow-hidden border border-slate-200/80 dark:border-cyan-500/25 shadow-md hover:shadow-lg transition-all duration-300 bg-slate-950 group flex flex-col flex-1 min-h-0"
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

              {/* Bottom Bar: Laser Play/Pause Capsule Button (Phỏng vấn mẫu) */}
              <div className="pointer-events-auto absolute right-3 sm:right-4 bottom-3 sm:bottom-4 z-20">
                <div 
                  className="relative inline-flex items-center justify-between rounded-full p-[2px] select-none group/container transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] w-auto max-w-fit h-[40px] sm:h-[44px] overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.5)] ring-2 ring-cyan-400/50"
                >
                  {/* Rotating Glowing Laser Beam Border */}
                  <div className="absolute -inset-[220%] animate-[spin_4s_linear_infinite] pointer-events-none bg-[conic-gradient(from_0deg,transparent_0_200deg,#06b6d4_250deg,#3b82f6_300deg,#ffffff_340deg,#06b6d4_360deg)] opacity-100" />

                  {/* Subtle Animated Glowing Ring when Audio is Active */}
                  {isVideoAudioOn && isInterviewPlaying && (
                    <div className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 opacity-70 blur-xs animate-pulse pointer-events-none" />
                  )}

                  {/* Capsule Outer Shell */}
                  <div className="relative z-10 inline-flex items-center justify-between w-auto max-w-fit h-full rounded-full bg-gradient-to-r from-[#06b6d4] via-[#2563eb] to-[#7c3aed] px-2.5 py-1 gap-2 shadow-inner backdrop-blur-md">
                    
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
                          ? "bg-[#06b6d4] hover:bg-[#0891b2] text-white shadow-[0_0_12px_rgba(6,182,212,0.9)]" 
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
                      title={isInterviewPlaying ? (isVi ? "Dừng phỏng vấn" : "Pause") : (isVi ? "Phỏng vấn mẫu" : "Sample Interview")}
                    >
                      {isInterviewPlaying ? (
                        <>
                          <span className="drop-shadow-sm font-black uppercase tracking-wider text-2xs sm:text-xs truncate">
                            {isVi ? "Dừng phỏng vấn" : "Pause"}
                          </span>
                          <Pause className="w-3.5 h-3.5 shrink-0 fill-current text-white" />
                        </>
                      ) : (
                        <>
                          <span className="drop-shadow-sm font-black uppercase tracking-wider text-2xs sm:text-xs text-white truncate">
                            {isVi ? "Phỏng vấn mẫu" : "Sample Interview"}
                          </span>
                          <SparkleWithPlusDot className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 shrink-0 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT AREA: Active Response details Card (30% on Desktop, matching height) */}
          <div className="w-full lg:col-span-3 flex flex-col h-full min-h-0">
            <div 
              style={{ borderRadius: "var(--theme-radius-card, 14px)" }}
              className="w-full h-full flex-1 rounded-[var(--theme-radius-card,14px)] border border-white/60 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-4.5 backdrop-blur-2xl shadow-md transition-all duration-300 text-left flex flex-col justify-between gap-3.5 relative overflow-hidden min-h-0"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-indigo-500/5 via-cyan-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-3 flex-1 flex flex-col min-h-0 relative z-10">
                
                {/* Header Tiêu đề thẻ : Dòng 1 (Icon không đóng khung chuyển động + Tiêu đề 4 từ, font 15px, màu giống icon) */}
                <div className="space-y-2 shrink-0">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ y: [0, -3, 0], scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                      className="shrink-0 flex items-center justify-center bg-transparent border-0 p-0 shadow-none"
                    >
                      <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-cyan-400 stroke-[2.3]" />
                    </motion.div>
                    <h3 className="text-[15px] font-bold text-indigo-600 dark:text-cyan-400 font-play tracking-tight leading-none">
                      {isVi ? "Chi tiết câu hỏi" : "Interview response detail"}
                    </h3>
                  </div>

                  {/* Dòng 2 : Line có màu sắc giống icon */}
                  <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500/20 dark:from-cyan-400 dark:via-indigo-400 dark:to-cyan-400/20 shadow-2xs" />
                </div>

                {/* DÒNG CÂU 01 HIỂN THỊ CÙNG HÀNG VỚI THỜI GIAN VÀ TIẾN ĐỘ */}
                <div className="flex items-center justify-between gap-2.5 px-3 py-1.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100/70 dark:border-indigo-900/40 shrink-0 text-xs font-semibold">
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-cyan-300 font-mono">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-600 dark:bg-cyan-500 text-white text-[11px] font-mono font-black shadow-xs tracking-wide shrink-0">
                      CÂU {currentQ.stt < 10 ? `0${currentQ.stt}` : currentQ.stt}
                    </span>
                    <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                      <Clock size={12} className="text-indigo-600 dark:text-cyan-400 shrink-0" />
                      <span>{currentQ.timestamp}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-1 max-w-[140px] ml-auto">
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

                {/* Question & Response Dialogue bubble container: font 15px */}
                <div className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar min-h-0 text-[15px]">
                  
                  {/* Asker and Question */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                        {isVi ? currentQ.askerVi : currentQ.askerEn}
                      </span>
                    </div>
                    <h3 className="text-[15px] font-bold text-slate-900 dark:text-white leading-snug">
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
                    <p className="text-[15px] text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                      {isVi ? currentQ.answerVi : currentQ.answerEn}
                    </p>
                  </div>

                  {/* Key Takeaway Banner */}
                  {currentQ.keyTakeawayVi && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2 shrink-0">
                      <Award className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-[15px] text-amber-950 dark:text-amber-300 font-medium leading-relaxed">
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

        </div>
      </div>
    </section>
  );
}

export default Interview;
