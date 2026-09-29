import React, { useState, useRef, useEffect, memo } from "react";
import { 
  Bot,
  Zap,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  CheckCircle2,
  Cpu
} from "lucide-react";
import { useLanguage } from "../i18n";
import { cn } from "../lib/utils";
import { DynamicVideoStoryOverlay } from "./DynamicVideoStoryOverlay";

const IDLE_2_URL =
  "https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4";
const INTRO_2_URL =
  "https://cdn.scena.ai/project/8606/5f84521bf5c51ff234fb0f4029fb9fba29e7e386f13912a56bc7ee25aebcbc10.mp4";

type VideoState = "idle" | "intro";

export function Home2() {
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
      videoRef.current.src = state === "intro" ? INTRO_2_URL : IDLE_2_URL;
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
      videoRef.current.src = IDLE_2_URL;
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
          src={videoState === "intro" ? INTRO_2_URL : IDLE_2_URL}
          onTimeUpdate={handleHeroTimeUpdate}
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover object-center transition-all duration-700 brightness-105 contrast-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 2. Top-Left Badge Header */}
      <div className="relative z-20 flex flex-wrap items-center gap-2 pt-2 sm:pt-3 px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 dark:bg-slate-900/80 backdrop-blur-md border border-purple-500/30 text-xs font-semibold text-purple-300 shadow-lg">
          <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-ping" />
          <Bot className="w-3.5 h-3.5 text-purple-400" />
          <span>{isVi ? "Trang chủ 2 • Chuyển đổi số CRM & AI" : "Home 2 • Digital CRM & AI"}</span>
        </div>
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/10 text-xs text-slate-300">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isVi ? "Tự động hóa Omni-channel" : "Omni-channel Automation"}</span>
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
              "hover:border-purple-500/70 dark:hover:border-purple-400/70 hover:shadow-[0_16px_36px_rgba(168,85,247,0.22)]"
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
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60">
                        {isVi ? "Trang chủ 2" : "Home 2"}
                      </span>
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate">
                        {isVi ? "Chuyển đổi số CRM & AI" : "Digital CRM & AI"}
                      </span>
                    </div>

                    <button
                      onClick={() => setIsVideoAudioOn(!isVideoAudioOn)}
                      aria-label={isVideoAudioOn ? "Tắt âm thanh" : "Bật âm thanh"}
                      className={cn(
                        "p-1 rounded-md border text-3xs transition-all flex items-center gap-1 shrink-0",
                        isVideoAudioOn
                          ? "bg-purple-500/20 border-purple-500/40 text-purple-600 dark:text-purple-300"
                          : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                      )}
                      title={isVideoAudioOn ? "Tắt âm thanh" : "Bật âm thanh"}
                    >
                      {isVideoAudioOn ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                    </button>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug mb-1 line-clamp-1 flex items-center gap-1">
                    <span>{isVi ? "Đột phá Tự động hóa Dịch vụ" : "Service Automation Breakthrough"}</span>
                    <Sparkles className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  </h3>

                  <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 mb-1.5">
                    {isVi 
                      ? "AI Chatbot 24/7, định tuyến thông minh qua CRM Omni-channel, giảm 35% cuộc gọi lặp và tiết kiệm 400M+/năm chi phí."
                      : "24/7 AI Chatbot & smart CRM routing across Hotline & Zalo OA, cutting repeat queries by 35%."}
                  </p>

                  <div className="grid grid-cols-2 gap-1 py-1 px-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 text-[10px]">
                    <div className="flex items-center gap-1 truncate">
                      <TrendingUp className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span className="truncate">{isVi ? "Giảm 35% lặp cuộc gọi" : "35% Repeat Cut"}</span>
                    </div>
                    <div className="flex items-center gap-1 truncate">
                      <CheckCircle2 className="w-3 h-3 text-purple-500 shrink-0" />
                      <span className="truncate">{isVi ? "Tiết kiệm 400M+/năm" : "400M+/yr Saved"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pt-1.5 border-t border-slate-200/70 dark:border-slate-800">
                  <button
                    onClick={handlePlayIntroVideo}
                    className="flex-1 min-w-0 min-h-[36px] flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-sm active:scale-95 transition-all"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span className="truncate">{isVi ? "Xem video AI" : "Watch AI Video"}</span>
                  </button>

                  <button
                    onClick={() => scrollTo("projects")}
                    className="flex-1 min-w-0 min-h-[36px] flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-xs border border-slate-200 dark:border-slate-700 active:scale-95 transition-all"
                  >
                    <span className="truncate">{isVi ? "Xem dự án" : "Projects"}</span>
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

export default memo(Home2);
