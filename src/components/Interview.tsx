import React, { useRef, useState, useEffect } from "react";
import {
  Video,
  Play,
  Pause,
  Clock,
  Volume2,
  VolumeX,
  CheckCircle2,
  MessageSquare,
  HelpCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
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
  const { language } = useLanguage();
  const isVi = language === "vi";
  const videoRef = useRef<HTMLVideoElement>(null);

  // States for Video & Audio
  const [isInterviewPlaying, setIsInterviewPlaying] = useState(false);
  const [isVideoAudioOn, setIsVideoAudioOn] = useState(false);

  // Active Question State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hoveredQuestionIndex, setHoveredQuestionIndex] = useState<number | null>(null);
  const [isQuestionsTimelineExpanded, setIsQuestionsTimelineExpanded] = useState(false);

  // Sync Active Question with Video Playback Time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!isInterviewPlaying) return;
      const time = video.currentTime;
      let idx = INTERVIEW_QUESTIONS.findIndex(
        (q) => time >= q.startSec && time <= q.endSec
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
  const previewIndex = hoveredQuestionIndex !== null ? hoveredQuestionIndex : currentQuestionIndex;
  const previewQ = INTERVIEW_QUESTIONS[previewIndex] || currentQ;

  return (
    <section 
      id="interview" 
      className="relative w-full min-h-full flex flex-col justify-start items-center p-3 xs:p-3.5 sm:p-4.5 md:p-6 lg:p-8 font-sans text-slate-800 dark:text-slate-100"
    >
      {/* Main Card Phỏng Vấn */}
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-5 sm:gap-6">

        {/* Container Phỏng Vấn - đem nội dung ra ngoài thẻ chứa */}
        <div 
          id="info-card-interview" 
          className="relative z-10 w-full flex flex-col gap-4 sm:gap-5 md:gap-6"
        >
          {/* Header Card Phỏng vấn (Caption / Label: 12px – 13px) */}
          <PageCardHeader pageId="interview">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-5 bg-cyan-600 dark:bg-cyan-400 rounded-full shrink-0" />
              <span className="text-caption font-semibold font-mono text-cyan-700 dark:text-cyan-300 bg-cyan-500/15 px-2.5 py-0.5 rounded-full border border-cyan-500/30 shadow-2xs">
                {isInterviewPlaying ? (isVi ? "Đang phát phỏng vấn trực tiếp" : "Playing Live Interview") : (isVi ? "8 Câu hỏi phỏng vấn chuyên sâu" : "8 Key Interview Questions")}
              </span>
            </div>
          </PageCardHeader>



          {/* ========================================================================= */}
          {/* THẺ VIDEO VÀ THẺ CHI TIẾT PHỎNG VẤN (KHÓA CHIỀU CAO TRÁNH TRƯỢT LÊN XUỐNG) */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 md:gap-6 w-full items-stretch">

            {/* BENTO CARD 1: Video Player Hero Card (8 columns on lg) */}
            <div className="w-full lg:col-span-8 flex flex-col h-[320px] xs:h-[380px] sm:h-[460px] lg:h-[540px]">
              <div className="relative w-full h-full rounded-[10px] overflow-hidden border border-slate-200/60 dark:border-slate-800/60 shadow-md hover:shadow-xl transition-all duration-300 bg-slate-950 group flex flex-col">
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

                {/* Minimal light Gradient overlay for contrast */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30" />

                {/* Top Left Status Badge */}
                <div className="pointer-events-none absolute left-2.5 sm:left-4 top-2.5 sm:top-4 z-20 flex items-center gap-2 max-w-[calc(100%-80px)]">
                  <div className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-slate-900/85 border border-white/20 backdrop-blur-md text-3xs sm:text-2xs font-bold text-white shadow-md truncate">
                    <span className={cn("w-2 h-2 rounded-full shrink-0", isInterviewPlaying ? "bg-emerald-400 animate-ping" : "bg-indigo-400")} />
                    <span className="truncate">
                      {isInterviewPlaying 
                        ? (isVi ? "Đang phát: Câu " + currentQ.stt : "Playing: Q" + currentQ.stt)
                        : (isVi ? "Video giới thiệu sẵn sàng" : "Ready to play")}
                    </span>
                  </div>
                </div>

                {/* Bottom Right Play / Pause Action Capsule Bar - Formatted like HeroIntroButton */}
                <div className="pointer-events-auto absolute right-2.5 sm:right-4 bottom-2.5 sm:bottom-4 z-20">
                  <div 
                    className="relative inline-flex items-center justify-between rounded-full p-[2px] select-none group/container transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] w-auto max-w-fit h-[38px] sm:h-[45px] overflow-hidden shadow-[0_0_20px_rgba(78,86,246,0.5)] ring-2 ring-indigo-400/50"
                  >
                    {/* Rotating Glowing Laser Beam Border */}
                    <div className="absolute -inset-[220%] animate-[spin_4s_linear_infinite] pointer-events-none bg-[conic-gradient(from_0deg,transparent_0_200deg,#4E56F6_250deg,#F125D6_300deg,#ffffff_340deg,#4E56F6_360deg)] opacity-100" />

                    {/* Subtle Animated Glowing Ring when Audio is Active */}
                    {isVideoAudioOn && isInterviewPlaying && (
                      <div className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400 opacity-70 blur-xs animate-pulse pointer-events-none" />
                    )}

                    {/* Capsule Outer Pill Shell */}
                    <div className="relative z-10 inline-flex items-center justify-between w-auto max-w-fit h-full rounded-full bg-gradient-to-r from-[#4E56F6] via-[#8938F8] to-[#F125D6] px-1.5 py-1 gap-1.5 sm:gap-2 shadow-inner backdrop-blur-md">
                      
                      {/* Left Circular Speaker Button */}
                      <div className="p-0.5 rounded-full ring-2 ring-indigo-300/80 border border-white/40 bg-indigo-900/30 shrink-0">
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
                            "w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 p-0 transition-all duration-300 cursor-pointer active:scale-95 shadow-md",
                            isVideoAudioOn 
                              ? "bg-[#4E56F6] hover:bg-[#3b43e3] text-white shadow-[0_0_12px_rgba(78,86,246,0.9)]" 
                              : "bg-[#E60026] hover:bg-red-500 text-white shadow-[0_0_12px_rgba(230,0,38,0.9)]"
                          )}
                          title={isVideoAudioOn ? (isVi ? "Tắt âm thanh video" : "Mute audio") : (isVi ? "Bật âm thanh video" : "Unmute audio")}
                        >
                          {isVideoAudioOn ? (
                            <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white animate-pulse" />
                          ) : (
                            <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                          )}
                        </button>
                      </div>

                      {/* Vertical Divider Line */}
                      <div className="w-[1.5px] h-3.5 sm:h-5 bg-white/40 shrink-0 mx-0.5 rounded-full" />

                      {/* Main Right Button ("Phát phỏng vấn" / "Dừng" + Sparkle Star Icon) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleInterview();
                        }}
                        className={cn(
                          "flex items-center justify-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-0.5 flex-1 min-w-0",
                          "text-white font-extrabold text-2xs sm:text-xs md:text-sm tracking-wide transition-all duration-300 cursor-pointer",
                          "hover:opacity-90 active:scale-98"
                        )}
                        title={isInterviewPlaying ? (isVi ? "Dừng phỏng vấn" : "Stop interview") : (isVi ? "Phát phỏng vấn" : "Play interview")}
                      >
                        {isInterviewPlaying ? (
                          <>
                            <span className="drop-shadow-sm font-extrabold text-3xs sm:text-xs uppercase tracking-wider truncate">
                              {isVi ? "Dừng phỏng vấn" : "Stop interview"}
                            </span>
                            <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 fill-current text-white" />
                          </>
                        ) : (
                          <>
                            <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] font-black text-2xs sm:text-xs md:text-sm text-white font-sans truncate">
                              {isVi ? "Phát phỏng vấn" : "Play interview"}
                            </span>
                            <SparkleWithPlusDot className="w-3.5 h-3.5 sm:w-5 sm:h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BENTO CARD 2: Active Question & Answer Detail Card (4 columns on lg = 1/3 width) */}
            <div className="w-full lg:col-span-4 flex flex-col h-[480px] sm:h-[520px] lg:h-[540px]">
              <div className="w-full h-full rounded-[10px] border border-slate-200/60 dark:border-cyan-400/35 bg-white/95 dark:bg-slate-900/80 p-3 xs:p-4 sm:p-5 md:p-6 backdrop-blur-2xl shadow-md dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(0,240,255,0.2),0_0_35px_rgba(217,70,239,0.15),inset_0_1.5px_2px_rgba(255,255,255,0.18)] hover:shadow-xl hover:dark:border-cyan-400/60 transition-all duration-300 text-left flex flex-col justify-between gap-3 sm:gap-4 overflow-hidden">
                <div className="space-y-2.5 sm:space-y-3 flex-1 flex flex-col min-h-0">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-slate-200/60 dark:border-slate-800/60 mb-1 shrink-0">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <h3 className="text-sm sm:text-base md:text-lg font-black text-indigo-600 dark:text-indigo-400 tracking-wide">
                        {isVi ? "Chi tiết phỏng vấn" : "Interview Q&A detail"}
                      </h3>
                    </div>
                  </div>

                  {/* Header: STT, Timestamp, and Summary Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 bg-indigo-50/60 dark:bg-indigo-950/40 p-2 sm:p-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900/40 shrink-0">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="flex h-5.5 w-5.5 sm:h-6 sm:w-6 items-center justify-center rounded-lg bg-indigo-600 text-2xs sm:text-xs font-black text-white shadow-2xs">
                        {currentQ.stt}
                      </span>
                      <span className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-indigo-950/80 px-2 sm:px-2.5 py-0.5 text-3xs sm:text-xs font-bold text-indigo-700 dark:text-indigo-300 font-mono">
                        <Clock size={11} />
                        {currentQ.timestamp} ({currentQ.startSec}s – {currentQ.endSec}s)
                      </span>
                    </div>

                    <span className="rounded-full border border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 px-2 sm:px-2.5 py-0.5 text-3xs sm:text-xs font-black text-amber-800 dark:text-amber-300 shadow-2xs truncate max-w-[180px] xs:max-w-[220px] sm:max-w-none">
                      {isVi ? "Cốt lõi: " : "Core: "}
                      {isVi ? currentQ.summaryVi : currentQ.summaryEn}
                    </span>
                  </div>

                  {/* Question title & Asker badge */}
                  <div className="space-y-1.5 shrink-0 min-h-[50px] sm:min-h-[56px]">
                    <div className="flex items-center gap-1.5">
                      <span className={cn(
                        "text-3xs font-extrabold px-2 py-0.5 rounded-md border",
                        (currentQ.askerVi === "Ứng viên")
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                          : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30"
                      )}>
                        {isVi 
                          ? `${currentQ.askerVi || "Người hỏi"}`
                          : `${currentQ.askerEn || "Interviewer"}`}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base md:text-lg font-black text-slate-900 dark:text-white leading-snug">
                      {isVi ? currentQ.questionVi : currentQ.questionEn}
                    </h3>
                  </div>

                  {/* Answer Content & Answerer badge */}
                  <div className="flex-1 py-1 space-y-1.5 flex flex-col justify-start min-h-[140px] sm:min-h-[160px] overflow-y-auto custom-scrollbar">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={cn(
                        "text-3xs font-extrabold px-2 py-0.5 rounded-md border",
                        (currentQ.answererVi === "Nhà tuyển dụng")
                          ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30"
                          : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                      )}>
                        {isVi 
                          ? `${currentQ.answererVi || "Người trả lời"}`
                          : `${currentQ.answererEn || "Respondent"}`}
                      </span>
                    </div>
                    <p className="text-body text-slate-700 dark:text-slate-300 text-justify">
                      {isVi ? currentQ.answerVi : currentQ.answerEn}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-2.5 sm:pt-3 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-800/60 mt-auto">
                  <button
                    type="button"
                    disabled={currentQuestionIndex === 0}
                    onClick={() => handleSelectQuestion(Math.max(0, currentQuestionIndex - 1))}
                    className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1 transition-colors py-1 px-1.5 rounded-md active:bg-slate-100 dark:active:bg-slate-800 min-h-[36px]"
                  >
                    ← {isVi ? "Câu trước" : "Previous"}
                  </button>

                  <span className="text-2xs font-extrabold text-slate-500 dark:text-slate-400 font-mono">
                    {currentQuestionIndex + 1} / {INTERVIEW_QUESTIONS.length}
                  </span>

                  <button
                    type="button"
                    disabled={currentQuestionIndex === INTERVIEW_QUESTIONS.length - 1}
                    onClick={() => handleSelectQuestion(Math.min(INTERVIEW_QUESTIONS.length - 1, currentQuestionIndex + 1))}
                    className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1 transition-colors py-1 px-1.5 rounded-md active:bg-slate-100 dark:active:bg-slate-800 min-h-[36px]"
                  >
                    {isVi ? "Câu tiếp theo" : "Next"} →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Interview;
