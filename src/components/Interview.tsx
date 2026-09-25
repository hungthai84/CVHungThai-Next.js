import React, { useRef, useState, useEffect } from "react";
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
  RotateCcw
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

  // Active Question State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
      className="relative w-full h-full flex flex-col justify-start items-stretch p-[15px] font-sans text-slate-800 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar"
    >
      <div className="w-full flex-grow flex flex-col gap-[15px] max-w-7xl mx-auto justify-start relative z-10">

        {/* Header Card Phỏng vấn */}
        <PageCardHeader pageId="interview" />

        {/* Thẻ Phỏng vấn chứa các thẻ con cách tiêu đề main card 15px */}
        <div className="flex-1 w-full flex items-center justify-center">
          <div className="w-full rounded-[24px] p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md shadow-lg flex flex-col justify-center items-center">
            
            {/* ========================================================================= */}
            {/* BENTO HERO SECTION: VIDEO PLAYER + GIAO DIỆN CÂU ĐANG CHỌN (ACTIVE DETAIL) */}
            {/* ========================================================================= */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 w-full items-stretch">

            {/* BENTO CARD 1: Video Player Hero Card (7 columns on lg) */}
            <div className="w-full lg:col-span-7 flex flex-col h-[340px] xs:h-[400px] sm:h-[480px] lg:h-[560px]">
              <div className="relative w-full h-full rounded-[14px] overflow-hidden border border-slate-200/80 dark:border-cyan-500/30 shadow-md dark:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-xl transition-all duration-300 bg-slate-950 group flex flex-col">
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
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />

                {/* Top Left: Active Question Badge & Timecode */}
                <div className="pointer-events-none absolute left-3 sm:left-4 top-3 sm:top-4 z-20 flex items-center gap-2 max-w-[calc(100%-80px)]">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-white/20 backdrop-blur-md text-xs font-bold text-white shadow-md truncate">
                    <span className={cn(
                      "w-2.5 h-2.5 rounded-full shrink-0", 
                      isInterviewPlaying ? "bg-emerald-400 animate-ping" : "bg-cyan-400"
                    )} />
                    <span className="font-mono text-cyan-300">
                      {isInterviewPlaying 
                        ? (isVi ? `Đang phát câu 0${currentQ.stt}` : `Playing Q0${currentQ.stt}`)
                        : (isVi ? "Video phỏng vấn sẵn sàng" : "Ready to play")}
                    </span>
                    <span className="text-white/40">·</span>
                    <span className="text-slate-300 font-mono text-[11px] truncate">
                      {currentQ.timestamp}
                    </span>
                  </div>
                </div>

                {/* Bottom Bar: Laser Play/Pause Capsule Button */}
                <div className="pointer-events-auto absolute right-3 sm:right-4 bottom-3 sm:bottom-4 z-20">
                  <div 
                    className="relative inline-flex items-center justify-between rounded-full p-[2px] select-none group/container transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] w-auto max-w-fit h-[42px] sm:h-[46px] overflow-hidden shadow-[0_0_20px_rgba(78,86,246,0.5)] ring-2 ring-indigo-400/50"
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
                          "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 p-0 transition-all duration-300 cursor-pointer active:scale-95 shadow-md",
                          isVideoAudioOn 
                            ? "bg-[#4E56F6] hover:bg-[#3b43e3] text-white shadow-[0_0_12px_rgba(78,86,246,0.9)]" 
                            : "bg-[#E60026] hover:bg-red-500 text-white shadow-[0_0_12px_rgba(230,0,38,0.9)]"
                        )}
                        title={isVideoAudioOn ? (isVi ? "Tắt âm thanh video" : "Mute audio") : (isVi ? "Bật âm thanh video" : "Unmute audio")}
                      >
                        {isVideoAudioOn ? (
                          <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-pulse" />
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
                          "flex items-center justify-center gap-2 px-2 py-1 flex-1 min-w-0",
                          "text-white font-extrabold text-xs sm:text-sm tracking-wide transition-all duration-300 cursor-pointer",
                          "hover:opacity-95 active:scale-98"
                        )}
                        title={isInterviewPlaying ? (isVi ? "Dừng phỏng vấn" : "Stop interview") : (isVi ? "Phát phỏng vấn" : "Play interview")}
                      >
                        {isInterviewPlaying ? (
                          <>
                            <span className="drop-shadow-sm font-extrabold uppercase tracking-wider text-xs sm:text-sm truncate">
                              {isVi ? "Dừng phỏng vấn" : "Pause Interview"}
                            </span>
                            <Pause className="w-4 h-4 shrink-0 fill-current text-white" />
                          </>
                        ) : (
                          <>
                            <span className="drop-shadow-sm font-extrabold text-xs sm:text-sm text-white truncate">
                              {isVi ? "Phát phỏng vấn" : "Play Interview"}
                            </span>
                            <SparkleWithPlusDot className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BENTO CARD 2: GIAO DIỆN CÂU ĐANG CHỌN (ACTIVE SELECTED QUESTION CARD - 5 cols on lg) */}
            <div className="w-full lg:col-span-5 flex flex-col h-[500px] sm:h-[530px] lg:h-[560px]">
              <div className="w-full h-full rounded-[14px] border-2 border-indigo-500/80 dark:border-cyan-400/80 bg-white/95 dark:bg-slate-900/90 p-4 sm:p-5 md:p-6 backdrop-blur-2xl shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.25)] transition-all duration-300 text-left flex flex-col justify-between gap-3 overflow-hidden relative">
                
                {/* Glowing Active Ring Halo on Top Right */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-indigo-500/10 via-cyan-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-3 flex-1 flex flex-col min-h-0 relative z-10">
                  
                  {/* Top Bar: Active Indicator + Equalizer + Chapter Tag */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80 dark:border-slate-800/80 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-600 dark:bg-cyan-500 text-white text-xs font-mono font-black shadow-sm">
                        <span>CÂU {currentQ.stt < 10 ? `0${currentQ.stt}` : currentQ.stt}</span>
                      </span>

                      {/* Live Equalizer Pulse */}
                      <div className="flex items-center gap-0.5 px-2 py-1 rounded-md bg-indigo-50 dark:bg-slate-800/80 border border-indigo-200/60 dark:border-cyan-500/30">
                        <span className={cn("w-1 rounded-full transition-all duration-300", isInterviewPlaying ? "bg-cyan-400 h-3.5 animate-pulse" : "bg-slate-400 h-2")} />
                        <span className={cn("w-1 rounded-full transition-all duration-300", isInterviewPlaying ? "bg-indigo-500 h-4.5 animate-bounce" : "bg-slate-400 h-2.5")} />
                        <span className={cn("w-1 rounded-full transition-all duration-300", isInterviewPlaying ? "bg-cyan-400 h-3 animate-pulse" : "bg-slate-400 h-1.5")} />
                        <span className="text-[11px] font-bold text-indigo-700 dark:text-cyan-300 ml-1">
                          {isInterviewPlaying ? (isVi ? "Đang phát" : "Playing") : (isVi ? "Đang chọn" : "Active")}
                        </span>
                      </div>
                    </div>

                    {/* Category Label */}
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 font-mono">
                      {isVi ? currentQ.categoryVi : currentQ.categoryEn}
                    </span>
                  </div>

                  {/* Timecode & Progress Scrubber */}
                  <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 shrink-0">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-700 dark:text-cyan-300">
                      <Clock size={12} className="text-indigo-600 dark:text-cyan-400" />
                      <span>{currentQ.timestamp}</span>
                    </div>

                    {/* Progress Bar of Current Segment */}
                    <div className="flex items-center gap-2 flex-1 max-w-[160px] sm:max-w-[200px]">
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

                  {/* DIALOGUE SECTION (QUESTION + ANSWER) */}
                  <div className="flex-1 space-y-2.5 overflow-y-auto pr-1 custom-scrollbar min-h-0">
                    
                    {/* Asker & Question */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                            {isVi ? currentQ.askerVi : currentQ.askerEn}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {isVi ? "Câu hỏi phỏng vấn" : "Interview Question"}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {isVi ? currentQ.questionVi : currentQ.questionEn}
                      </h3>
                    </div>

                    {/* Answerer & Answer */}
                    <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-slate-800/40 border border-indigo-100 dark:border-slate-700/60 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                            {isVi ? currentQ.answererVi : currentQ.answererEn}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                          {isVi ? "Câu trả lời chiến lược" : "Executive Response"}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                        {isVi ? currentQ.answerVi : currentQ.answerEn}
                      </p>
                    </div>

                    {/* Key Takeaway Callout Box */}
                    {currentQ.keyTakeawayVi && (
                      <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/30 flex items-start gap-2">
                        <Award className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <div className="text-xs text-amber-900 dark:text-amber-300 font-medium leading-relaxed">
                          <span className="font-bold">{isVi ? "🎯 Điểm cốt lõi: " : "🎯 Strategic Takeaway: "}</span>
                          {isVi ? currentQ.keyTakeawayVi : currentQ.keyTakeawayEn}
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* BOTTOM ACTIONS BAR */}
                <div className="pt-2.5 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between mt-auto shrink-0 relative z-10">
                  <button
                    type="button"
                    disabled={currentQuestionIndex === 0}
                    onClick={() => handleSelectQuestion(Math.max(0, currentQuestionIndex - 1))}
                    className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-cyan-400 disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1 transition-colors py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{isVi ? "Câu trước" : "Previous"}</span>
                  </button>

                  {/* Quick Replay current question */}
                  <button
                    type="button"
                    onClick={() => handleSelectQuestion(currentQuestionIndex)}
                    className="text-xs font-bold text-indigo-700 dark:text-cyan-300 hover:underline flex items-center gap-1 cursor-pointer py-1 px-2"
                    title={isVi ? "Phát lại từ đầu câu này" : "Replay this question"}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isVi ? "Phát đoạn này" : "Play Chapter"}</span>
                  </button>

                  <button
                    type="button"
                    disabled={currentQuestionIndex === INTERVIEW_QUESTIONS.length - 1}
                    onClick={() => handleSelectQuestion(Math.min(INTERVIEW_QUESTIONS.length - 1, currentQuestionIndex + 1))}
                    className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-cyan-400 disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1 transition-colors py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <span>{isVi ? "Câu tiếp" : "Next"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
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
