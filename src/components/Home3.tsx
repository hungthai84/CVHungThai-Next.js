import React, { useState, useRef, useEffect, memo } from "react";
import { 
  Award,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  CheckCircle2,
  Users
} from "lucide-react";
import { useLanguage } from "../i18n";
import { cn } from "../lib/utils";
import { DynamicVideoStoryOverlay } from "./DynamicVideoStoryOverlay";

const IDLE_3_URL =
  "https://cdn.scena.ai/project/10169/eae59f7007421658e611c298c206755ca060c878d07087694c06935208b9d8f9.mp4";
const INTRO_3_URL =
  "https://cdn.scena.ai/project/10169/0f6e39f01533134c70012f61be38d29126100c0300c9c0ea607adb305b5f7102.mp4";

type VideoState = "idle" | "intro";

export function Home3() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  // Video state management
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoState, setVideoState] = useState<VideoState>("idle");
  const [isVideoAudioOn, setIsVideoAudioOn] = useState(false);
  const [heroCurrentTime, setHeroCurrentTime] = useState(0);

  const handleHeroTimeUpdate = () => {
    if (videoRef.current) {
      setHeroCurrentTime(videoRef.current.currentTime);
    }
  };

  const changeVideoState = (state: VideoState) => {
    setVideoState(state);

    let shouldAudioBeOn = isVideoAudioOn;
    if (state === "intro") {
      shouldAudioBeOn = true;
      setIsVideoAudioOn(true);
    }

    if (videoRef.current) {
      videoRef.current.src = state === "intro" ? INTRO_3_URL : IDLE_3_URL;
      videoRef.current.currentTime = 0;
      videoRef.current.muted = !shouldAudioBeOn;
      videoRef.current.loop = state === "idle";
      videoRef.current.play().catch(() => {});
    }
  };

  const handlePlayIntroVideo = () => {
    changeVideoState("intro");
  };

  const handleCancelIntro = () => {
    changeVideoState("idle");
  };

  const handleVideoEnded = () => {
    changeVideoState("idle");
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoAudioOn;
    }
  }, [isVideoAudioOn]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = IDLE_3_URL;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
    window.dispatchEvent(new CustomEvent("app-navigate", { detail: id }));
  };

  const isIntro = videoState === "intro";

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden p-2.5 sm:p-4 font-sans text-slate-800 dark:text-slate-100 select-none">
      {/* 1. Main Fullscreen Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted={!isVideoAudioOn}
          playsInline
          loop={videoState === "idle"}
          src={videoState === "intro" ? INTRO_3_URL : IDLE_3_URL}
          onTimeUpdate={handleHeroTimeUpdate}
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover object-center transition-all duration-700 brightness-105 contrast-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 2. Top-Left Badge Header */}
      <div className="relative z-20 flex flex-wrap items-center gap-2 pt-2 sm:pt-3 px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 dark:bg-slate-900/80 backdrop-blur-md border border-emerald-500/30 text-xs font-semibold text-emerald-300 shadow-lg">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <Award className="w-3.5 h-3.5 text-emerald-400" />
          <span>{isVi ? "Trang chủ 3 • Chiến lược, Huấn luyện & Chuẩn QA" : "Home 3 • Strategy, QA & Training"}</span>
        </div>
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/10 text-xs text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{isVi ? "Chuẩn COPC® & ISO QA" : "COPC® & ISO QA Standards"}</span>
        </div>
      </div>

      {/* 3. Bottom Welcome Note Card */}
      <div className="relative z-20 w-full flex justify-end items-end p-2 sm:p-3 lg:p-4 pointer-events-none mt-auto">
        <div className="w-[340px] sm:w-[390px] md:w-[430px] max-w-[calc(100vw-2rem)]">
          <div
            style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 10px))" }}
            className={cn(
              "w-full h-[210px] sm:h-[220px] group relative p-3 sm:p-3.5 transition-all duration-300 overflow-hidden pointer-events-auto flex flex-col justify-between items-stretch",
              "glass-surface backdrop-blur-2xl border border-slate-200/90 dark:border-slate-700/90 bg-white/95 dark:bg-slate-900/95",
              "shadow-[0_12px_32px_rgba(0,0,0,0.14),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.12)] text-slate-900 dark:text-white",
              "hover:border-emerald-500/70 dark:hover:border-emerald-400/70 hover:shadow-[0_16px_36px_rgba(16,185,129,0.22)]"
            )}
          >
            {isIntro ? (
              <DynamicVideoStoryOverlay
                embedded={true}
                className="h-full flex flex-col justify-between"
                currentTime={heroCurrentTime}
                duration={videoRef.current?.duration || 210}
                isPlaying={!videoRef.current?.paused}
                isMuted={!isVideoAudioOn}
                onToggleMute={() => setIsVideoAudioOn(!isVideoAudioOn)}
                onTogglePlay={() => {
                  if (videoRef.current) {
                    if (videoRef.current.paused) {
                      videoRef.current.play();
                    } else {
                      videoRef.current.pause();
                    }
                  }
                }}
                onClose={handleCancelIntro}
              />
            ) : (
              <>
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                        {isVi ? "Trang chủ 3" : "Home 3"}
                      </span>
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate">
                        {isVi ? "Chiến lược QA & Đào tạo" : "QA Strategy & Training"}
                      </span>
                    </div>

                    <button
                      onClick={() => setIsVideoAudioOn(!isVideoAudioOn)}
                      aria-label={isVideoAudioOn ? "Tắt âm thanh" : "Bật âm thanh"}
                      className={cn(
                        "p-1 rounded-md border text-3xs transition-all flex items-center gap-1 shrink-0",
                        isVideoAudioOn
                          ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-600 dark:text-emerald-300"
                          : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                      )}
                      title={isVideoAudioOn ? "Tắt âm thanh" : "Bật âm thanh"}
                    >
                      {isVideoAudioOn ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                    </button>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug mb-1 line-clamp-1 flex items-center gap-1">
                    <span>{isVi ? "Chuẩn mực Vận hành & Đào tạo" : "Operations Standard & Training"}</span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  </h3>

                  <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 mb-1.5">
                    {isVi 
                      ? "Kiểm soát chất lượng theo chuẩn COPC®, đào tạo trực tiếp 1,200+ nhân sự và kiểm soát khiếu nại dưới 1.2%."
                      : "COPC® QA framework, directly trained 1,200+ staff, maintaining complaint rate under 1.2%."}
                  </p>

                  <div className="grid grid-cols-2 gap-1 py-1 px-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 text-[10px]">
                    <div className="flex items-center gap-1 truncate">
                      <Users className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span className="truncate">{isVi ? "1,200+ Nhân sự đào tạo" : "1,200+ Staff Trained"}</span>
                    </div>
                    <div className="flex items-center gap-1 truncate">
                      <ShieldCheck className="w-3 h-3 text-teal-500 shrink-0" />
                      <span className="truncate">{isVi ? "Khiếu nại < 1.2%" : "Complaints < 1.2%"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pt-1.5 border-t border-slate-200/70 dark:border-slate-800">
                  <button
                    onClick={handlePlayIntroVideo}
                    className="flex-1 min-w-0 min-h-[36px] flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs shadow-sm active:scale-95 transition-all"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span className="truncate">{isVi ? "Xem video QA" : "Watch QA Video"}</span>
                  </button>

                  <button
                    onClick={() => scrollTo("experience")}
                    className="flex-1 min-w-0 min-h-[36px] flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-xs border border-slate-200 dark:border-slate-700 active:scale-95 transition-all"
                  >
                    <span className="truncate">{isVi ? "Kinh nghiệm" : "Experience"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Home3);
