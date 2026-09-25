import React, { useState, useRef, useEffect, memo } from "react";
import PageBanner from "./PageBanner";
import { PageCardHeader } from "./PageCardHeader";
import { 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  Code, 
  Briefcase, 
  Star, 
  Award, 
  Heart, 
  ShieldCheck, 
  Zap, 
  Users, 
  Layers, 
  FileText, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  PhoneCall,
  Download,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Smile,
  Brain,
  Flame,
  User,
  Sun,
  Moon,
  Maximize,
  Video as VideoIcon,
  RotateCcw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { cn } from "../lib/utils";
import { useTheme } from "../context/ThemeContext";
import { MagneticButton } from "./MagneticButton";
import { HeroIntroButton, HeroContactButton } from "./HeroIntroButton";
import { DynamicVideoStoryOverlay } from "./DynamicVideoStoryOverlay";

const DEMO_VIDEO_URL = "https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4";
const PROFESSIONAL_AVATAR = "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=600";

const IDLE_1_URL =
  "https://cdn.scena.ai/project/9741/73e39b037268a364ed0bac9563119e5c5ea6d6294e8b4a50052653303b75c52f.mp4";
const INTRO_1_URL =
  "https://cdn.scena.ai/project/9306/95e20a75c4af34a76d83b97ffc7ddc0b099bd815eebaad65a9ceef3c73fa19dd.mp4";

const IDLE_2_URL =
  "https://cdn.scena.ai/project/10112/bd20d7cafa2d764146ab362cf1c4473ded1f79ae87b789f0ba689056ca1b2904.mp4";
const INTRO_2_URL =
  "https://cdn.scena.ai/project/8606/87d892c1c37f70cfae99aa55e5888f93ea6b7015050fe44e5d1f54418f0b06b9.mp4";

const IDLE_3_URL =
  "https://cdn.scena.ai/project/10169/eae59f7007421658e611c298c206755ca060c878d07087694c06935208b9d8f9.mp4";
const INTRO_3_URL =
  "https://cdn.scena.ai/project/10169/0f6e39f01533134c70012f61be38d29126100c0300c9c0ea607adb305b5f7102.mp4";

const TRANSITION_1_TO_2_URL =
  "https://cdn.scena.ai/project/10124/2c5df2cd27cd1bcaa6fdf3b3aca254988d34a2933c461281b1332dabd1d1c89b.mp4";
const TRANSITION_2_TO_1_URL =
  "https://cdn.scena.ai/project/10124/a2f3d2280da33e96bd8c66c95d1192f2fe192c1fec1357b24bf23c9a85494e22.mp4";

type VideoState = "idle_3" | "intro_3";

function Hero() {
  const { t, lang } = useLanguage();
  const isVi = lang === "vi";
  const { theme, setTheme } = useTheme();

  // Video State Management - Exclusively Screen 3
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoState, setVideoState] = useState<VideoState>("idle_3");
  const [isVideoAudioOn, setIsVideoAudioOn] = useState(false);
  const [heroCurrentTime, setHeroCurrentTime] = useState(0);

  const handleHeroTimeUpdate = () => {
    if (videoRef.current) {
      setHeroCurrentTime(videoRef.current.currentTime);
    }
  };

  const getVideoUrl = (state: VideoState) => {
    switch (state) {
      case "idle_3": return IDLE_3_URL;
      case "intro_3": return INTRO_3_URL;
      default: return IDLE_3_URL;
    }
  };

  const changeVideoState = (state: VideoState) => {
    setVideoState(state);

    let shouldAudioBeOn = isVideoAudioOn;
    if (state === "intro_3") {
      shouldAudioBeOn = true;
      setIsVideoAudioOn(true);
    }

    if (videoRef.current) {
      videoRef.current.src = getVideoUrl(state);
      videoRef.current.currentTime = 0;
      videoRef.current.muted = !shouldAudioBeOn;
      videoRef.current.loop = state === "idle_3";
      videoRef.current.play().catch(() => {});
    }
  };

  const handlePlayIntroVideo = () => {
    changeVideoState("intro_3");
  };

  const handleCancelIntro = () => {
    changeVideoState("idle_3");
  };

  const handleVideoEnded = () => {
    changeVideoState("idle_3");
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

  const isIntro = videoState === "intro_3";

  return (
    <section 
      id="home" 
      className="relative w-full h-full flex flex-col justify-between overflow-hidden p-0 m-0 font-sans text-slate-800 dark:text-slate-100 select-none"
    >
      {/* 1. Main Fullscreen / Full-Card Background Video Player - 100% Fills Home (Screen 3) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted={!isVideoAudioOn}
          playsInline
          loop={videoState === "idle_3"}
          src={getVideoUrl(videoState)}
          onTimeUpdate={handleHeroTimeUpdate}
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover object-center transition-all duration-700 brightness-105 contrast-102"
        />
        {/* Subtle Atmospheric Gradient Overlays for crisp video visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 2. Bottom Welcome Note Card */}
      <div className="relative z-20 w-full flex justify-end items-end p-2.5 sm:p-4 lg:p-5 pointer-events-none mt-auto">
        <div className="w-[340px] sm:w-[380px] md:w-[420px] max-w-[calc(100vw-2rem)]">
          <div 
            id="hero-intro-card"
            style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 10px))" }}
            className={cn(
              "w-full h-[210px] sm:h-[220px] group relative p-3 sm:p-3.5 transition-all duration-300 overflow-hidden pointer-events-auto flex flex-col justify-between items-stretch",
              "glass-surface backdrop-blur-2xl border border-slate-200/90 dark:border-slate-700/90 bg-white/95 dark:bg-slate-900/95",
              "shadow-[0_12px_32px_rgba(0,0,0,0.14),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.12)] text-slate-900 dark:text-white",
              "hover:border-blue-500/70 dark:hover:border-cyan-400/70 hover:shadow-[0_16px_36px_rgba(37,99,235,0.22)]"
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
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/0 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                {/* Text Content Area */}
                <div className="relative z-20 w-full space-y-1 text-left">
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
                    <span className="text-h5 text-blue-700 dark:text-blue-300 block tracking-wide">
                      {isVi ? "Xin chào! Tôi là" : "Welcome! I am"}
                    </span>
                    <h1 className="text-h3 tracking-tight text-slate-900 dark:text-white">
                      <span className="text-h3 text-blue-700 dark:text-cyan-400 font-bold">Nguyễn Hùng Thái</span>
                    </h1>
                    <p className="text-h3 text-slate-800 dark:text-slate-200 leading-tight">
                      {isVi 
                        ? "Trưởng phòng Chăm sóc Khách hàng" 
                        : "Head of Customer Support & CX"}
                    </p>
                  </div>
                </div>

                {/* Actions Area - Bottom Row with Action Buttons */}
                <div className="relative z-20 flex flex-row flex-wrap items-center justify-end gap-1.5 sm:gap-2 w-full shrink-0 pt-2 border-t border-slate-200/90 dark:border-slate-800/90">
                  <HeroIntroButton
                    className="w-auto max-w-fit shrink-0 min-h-[38px] text-xs"
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
                    className="w-auto max-w-fit shrink-0 min-h-[38px] text-xs"
                    onContact={() => {
                      scrollTo('contact');
                    }}
                    lang={lang}
                  />
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
