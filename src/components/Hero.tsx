import React, { useState, useRef, useEffect, memo } from "react";
import { Sparkles, Monitor, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../i18n";
import { cn } from "../lib/utils";
import { useTheme } from "../context/ThemeContext";
import { HeroIntroButton, HeroContactButton } from "./HeroIntroButton";
import { DynamicVideoStoryOverlay } from "./DynamicVideoStoryOverlay";

// Screen 1 Video URLs
const IDLE_1_URL =
  "https://cdn.scena.ai/project/10169/eae59f7007421658e611c298c206755ca060c878d07087694c06935208b9d8f9.mp4";
const INTRO_1_URL =
  "https://cdn.scena.ai/project/10169/0f6e39f01533134c70012f61be38d29126100c0300c9c0ea607adb305b5f7102.mp4";

// Screen 3 Video URLs
const IDLE_3_URL =
  "https://cdn.scena.ai/project/10169/eae59f7007421658e611c298c206755ca060c878d07087694c06935208b9d8f9.mp4";
const INTRO_3_URL =
  "https://cdn.scena.ai/project/10169/0f6e39f01533134c70012f61be38d29126100c0300c9c0ea607adb305b5f7102.mp4";

type ScreenNumber = 1 | 3;
type VideoMode = "idle" | "intro";

function Hero() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";
  const { theme } = useTheme();

  // Screen Slider State: Screen 1 vs Screen 3
  const [currentScreen, setCurrentScreen] = useState<ScreenNumber>(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoMode, setVideoMode] = useState<VideoMode>("idle");
  const [isVideoAudioOn, setIsVideoAudioOn] = useState(false);
  const [heroCurrentTime, setHeroCurrentTime] = useState(0);

  const handleHeroTimeUpdate = () => {
    if (videoRef.current) {
      setHeroCurrentTime(videoRef.current.currentTime);
    }
  };

  const getVideoUrl = (screen: ScreenNumber, mode: VideoMode) => {
    if (screen === 1) {
      return mode === "intro" ? INTRO_1_URL : IDLE_1_URL;
    }
    return mode === "intro" ? INTRO_3_URL : IDLE_3_URL;
  };

  const switchScreen = (newScreen: ScreenNumber) => {
    if (newScreen === currentScreen) return;
    setCurrentScreen(newScreen);
    setVideoMode("idle");
    if (videoRef.current) {
      videoRef.current.src = getVideoUrl(newScreen, "idle");
      videoRef.current.currentTime = 0;
      videoRef.current.loop = true;
      videoRef.current.muted = !isVideoAudioOn;
      videoRef.current.play().catch(() => {});
    }
  };

  const changeVideoMode = (mode: VideoMode) => {
    setVideoMode(mode);

    let shouldAudioBeOn = isVideoAudioOn;
    if (mode === "intro") {
      shouldAudioBeOn = true;
      setIsVideoAudioOn(true);
    }

    if (videoRef.current) {
      videoRef.current.src = getVideoUrl(currentScreen, mode);
      videoRef.current.currentTime = 0;
      videoRef.current.muted = !shouldAudioBeOn;
      videoRef.current.loop = mode === "idle";
      videoRef.current.play().catch(() => {});
    }
  };

  const handlePlayIntroVideo = () => {
    changeVideoMode("intro");
  };

  const handleCancelIntro = () => {
    changeVideoMode("idle");
  };

  const handleVideoEnded = () => {
    changeVideoMode("idle");
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoAudioOn;
    }
  }, [isVideoAudioOn]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = getVideoUrl(currentScreen, "idle");
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

  const isIntro = videoMode === "intro";

  return (
    <section 
      id="home" 
      className="relative w-full h-full overflow-hidden p-0 font-sans text-slate-800 dark:text-slate-100 select-none bg-slate-950/20 rounded-[10px]"
    >
      {/* Video Background Layer */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted={!isVideoAudioOn}
          playsInline
          loop={videoMode === "idle"}
          src={getVideoUrl(currentScreen, videoMode)}
          onTimeUpdate={handleHeroTimeUpdate}
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover object-center transition-all duration-700 brightness-105 contrast-102"
        />
        {/* Subtle Atmospheric Gradient Overlays for crisp video visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Screen Slider Switcher (Màn hình 1 & Màn hình 3) */}
      <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-30 flex items-center gap-1.5 p-1 rounded-full bg-slate-900/75 dark:bg-black/80 backdrop-blur-xl border border-white/20 shadow-lg pointer-events-auto">
        <button
          type="button"
          onClick={() => switchScreen(1)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer",
            currentScreen === 1
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30 scale-105"
              : "text-slate-300 hover:text-white hover:bg-white/10"
          )}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>{isVi ? "Màn hình 1" : "Screen 1"}</span>
        </button>

        <button
          type="button"
          onClick={() => switchScreen(3)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer",
            currentScreen === 3
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30 scale-105"
              : "text-slate-300 hover:text-white hover:bg-white/10"
          )}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>{isVi ? "Màn hình 3" : "Screen 3"}</span>
        </button>
      </div>

      {/* Bottom Welcome Note Card - Horizontal Orientation */}
      <div className="relative z-20 w-full h-full flex flex-col justify-end items-end p-2.5 sm:p-4 lg:p-5 pointer-events-none">
        <div className="w-[360px] sm:w-[520px] md:w-[600px] lg:w-[660px] max-w-[calc(100vw-2.5rem)]">
          <div 
            id="hero-intro-card"
            style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 10px))" }}
            className={cn(
              "w-full group relative p-3 sm:p-4 transition-all duration-300 overflow-hidden pointer-events-auto flex flex-col justify-between items-stretch",
              "glass-surface backdrop-blur-2xl border border-slate-200/90 dark:border-slate-700/90 bg-white/95 dark:bg-slate-900/95",
              "shadow-[0_12px_32px_rgba(0,0,0,0.14),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.12)] text-slate-900 dark:text-white",
              "hover:border-blue-500/70 dark:hover:border-cyan-400/70 hover:shadow-[0_16px_36px_rgba(37,99,235,0.22)]"
            )}
          >
            {isIntro ? (
              <DynamicVideoStoryOverlay
                embedded={true}
                className="h-[180px] sm:h-[190px] flex flex-col justify-between"
                currentTime={heroCurrentTime}
                duration={videoRef.current?.duration || 210}
                isPlaying={!videoRef.current?.paused}
                isMuted={!isVideoAudioOn}
                onToggleMute={() => setIsVideoAudioOn(!isVideoAudioOn)}
                onTogglePlay={() => {
                  if (!videoRef.current) return;
                  if (videoRef.current.paused) {
                    videoRef.current.play().catch(() => {});
                  } else {
                    videoRef.current.pause();
                  }
                }}
                onClose={handleCancelIntro}
                onSeek={(time) => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = time;
                    setHeroCurrentTime(time);
                  }
                }}
              />
            ) : (
              <>
                {/* Glowing Ambient Light */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br from-blue-500/20 to-cyan-500/0 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                {/* Horizontal Content Area */}
                <div className="relative z-20 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-left">
                  {/* Left Column: Badges + Greetings + Name + Role */}
                  <div className="space-y-1 min-w-0 flex-1">
                    {/* Header Badges */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-3xs shadow-xs">
                        <Sparkles className="w-2.5 h-2.5 fill-current shrink-0" />
                        <span className="truncate font-play">{isVi ? "Giới thiệu" : "Introduction"}</span>
                      </div>
                      <span className="text-3xs font-mono font-bold text-blue-800 dark:text-cyan-300 bg-blue-50 dark:bg-cyan-950/60 px-1.5 py-0.5 rounded-full border border-blue-200/80 dark:border-cyan-600/40 shadow-2xs">
                        {isVi ? "22+ Năm kinh nghiệm" : "22+ Years exp"}
                      </span>
                    </div>
                    
                    <div className="space-y-0.5">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300 tracking-wide">
                          {isVi ? "Xin chào! Tôi là" : "Welcome! I am"}
                        </span>
                        <h1 className="text-sm sm:text-base md:text-lg tracking-tight text-slate-900 dark:text-white font-bold font-play inline">
                          <span className="text-blue-700 dark:text-cyan-400 font-bold">Nguyễn Hùng Thái</span>
                        </h1>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 leading-tight">
                        {isVi 
                          ? "Trưởng phòng Chăm sóc Khách hàng" 
                          : "Head of Customer Support & CX"}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Action Buttons (Horizontal layout) */}
                  <div className="relative z-20 flex flex-row items-center gap-2 shrink-0 sm:self-center w-auto sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-200/90 dark:border-slate-800/90 sm:pl-3">
                    <HeroIntroButton
                      className="flex-initial w-auto max-w-fit min-h-[36px] px-3 text-xs justify-center"
                      isPlayingIntro={isIntro}
                      isAudioOn={isVideoAudioOn}
                      onToggleAudio={() => {
                        setIsVideoAudioOn(!isVideoAudioOn);
                      }}
                      onPlayIntro={handlePlayIntroVideo}
                      onCancelIntro={handleCancelIntro}
                      lang={lang}
                    />
                    
                    <HeroContactButton 
                      className="flex-initial w-auto max-w-fit min-h-[36px] px-3 text-xs justify-center"
                      onContact={() => {
                        scrollTo('contact');
                      }}
                      lang={lang}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
