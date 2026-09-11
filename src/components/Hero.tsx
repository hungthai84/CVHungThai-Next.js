import React, { useState, useRef, useEffect, memo } from "react";
import PageBanner from "./PageBanner";
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

const TRANSITION_1_TO_2_URL =
  "https://cdn.scena.ai/project/10124/2c5df2cd27cd1bcaa6fdf3b3aca254988d34a2933c461281b1332dabd1d1c89b.mp4";
const TRANSITION_2_TO_1_URL =
  "https://cdn.scena.ai/project/10124/a2f3d2280da33e96bd8c66c95d1192f2fe192c1fec1357b24bf23c9a85494e22.mp4";

type VideoState =
  | "idle_1"
  | "intro_1"
  | "transition_1_to_2"
  | "idle_2"
  | "intro_2"
  | "transition_2_to_1";

function Hero() {
  const { t, lang } = useLanguage();
  const isVi = lang === "vi";
  const { theme, setTheme } = useTheme();

  // Video State Management
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoState, setVideoState] = useState<VideoState>("idle_1");
  const [isVideoAudioOn, setIsVideoAudioOn] = useState(false);

  // Card Video State (Imported from About.tsx to Home / Hero)
  const cardVideoRef = useRef<HTMLVideoElement>(null);
  const [isCardPlaying, setIsCardPlaying] = useState(false);
  const [isCardAudioOn, setIsCardAudioOn] = useState(false);
  const [cardCurrentTime, setCardCurrentTime] = useState(0);
  const [cardDuration, setCardDuration] = useState(105); // 1:45 default

  const togglePlayCardVideo = () => {
    if (!cardVideoRef.current) return;
    if (cardVideoRef.current.paused) {
      cardVideoRef.current.play().catch(() => {});
      setIsCardPlaying(true);
    } else {
      cardVideoRef.current.pause();
      setIsCardPlaying(false);
    }
  };

  const handleCardTimeUpdate = () => {
    if (cardVideoRef.current) {
      setCardCurrentTime(cardVideoRef.current.currentTime);
      if (cardVideoRef.current.duration && !isNaN(cardVideoRef.current.duration)) {
        setCardDuration(cardVideoRef.current.duration);
      }
    }
  };

  const handleCardSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCardCurrentTime(time);
    if (cardVideoRef.current) {
      cardVideoRef.current.currentTime = time;
    }
  };

  const toggleCardMute = () => {
    const nextMute = !isCardAudioOn;
    setIsCardAudioOn(nextMute);
    if (cardVideoRef.current) {
      cardVideoRef.current.muted = !nextMute;
    }
  };

  const handleCardFullscreen = () => {
    if (cardVideoRef.current) {
      if (cardVideoRef.current.requestFullscreen) {
        cardVideoRef.current.requestFullscreen().catch(() => {});
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getVideoUrl = (state: VideoState) => {
    switch (state) {
      case "idle_1": return IDLE_1_URL;
      case "intro_1": return INTRO_1_URL;
      case "transition_1_to_2": return TRANSITION_1_TO_2_URL;
      case "idle_2": return IDLE_2_URL;
      case "intro_2": return INTRO_2_URL;
      case "transition_2_to_1": return TRANSITION_2_TO_1_URL;
    }
  };

  const changeVideoState = (state: VideoState) => {
    setVideoState(state);

    let shouldAudioBeOn = isVideoAudioOn;
    if (state.startsWith("intro_") || state.startsWith("transition_")) {
      shouldAudioBeOn = true;
      setIsVideoAudioOn(true);
    }

    if (videoRef.current) {
      videoRef.current.src = getVideoUrl(state);
      videoRef.current.currentTime = 0;
      videoRef.current.muted = !shouldAudioBeOn;
      videoRef.current.loop = state.startsWith("idle_");
      videoRef.current.play().catch(() => {});
    }
  };

  const handlePlayIntroVideo = () => {
    if (videoState === "idle_2" || videoState === "intro_2") {
      changeVideoState("intro_2");
    } else {
      changeVideoState("intro_1");
    }
  };

  const handleCancelIntro = () => {
    if (videoState === "intro_1") {
      changeVideoState("idle_1");
    } else if (videoState === "intro_2") {
      changeVideoState("idle_2");
    }
  };

  const handleVideoEnded = () => {
    if (videoState === "intro_1" || videoState === "transition_2_to_1") {
      changeVideoState("idle_1");
    } else if (videoState === "intro_2" || videoState === "transition_1_to_2") {
      changeVideoState("idle_2");
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoAudioOn;
    }
  }, [isVideoAudioOn]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = getVideoUrl("idle_1");
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

  const isIntro = videoState.startsWith("intro_");
  const isTransitioning = videoState.startsWith("transition_");

  return (
    <section 
      id="home" 
      className="relative w-full h-full flex flex-col justify-between overflow-hidden p-0 m-0 font-sans text-slate-800 dark:text-slate-100 select-none"
    >
      {/* 1. Main Fullscreen / Full-Card Background Video Player - 100% Fills Home */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted={!isVideoAudioOn}
          playsInline
          loop={videoState.startsWith("idle_")}
          src={getVideoUrl(videoState)}
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover object-center transition-all duration-700 brightness-105 contrast-102"
        />
        {/* Subtle Atmospheric Gradient Overlays for crisp video visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 2. Top Controls & Identity Bar (Floating over video) */}
      <div className="relative z-20 w-full flex items-center justify-between p-3.5 sm:p-5 lg:p-6 pointer-events-none">
        {/* Floating Top Left Live Status Pill */}
        <div className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 dark:bg-slate-950/80 border border-white/20 dark:border-cyan-500/30 text-white shadow-xl backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-cyan-300">
            {isVi ? "LIVE PORTFOLIO • CX ARCHITECT & AI INNOVATOR" : "LIVE PORTFOLIO • CX ARCHITECT & AI INNOVATOR"}
          </span>
        </div>
      </div>

      {/* 3. Middle-Right Screen Navigation Arrow (Chuyển màn hình 1 / 2) - Glass 50% Opacity Centered Right */}
      <div className="absolute top-1/2 right-3 -translate-y-1/2 z-30 pointer-events-auto flex flex-col items-center gap-1.5 group/nav-btn">
        <MagneticButton
          id="hero-screen-navigation-btn"
          onClick={() => {
            changeVideoState(
              videoState === "idle_1" || videoState === "intro_1"
                ? "transition_1_to_2"
                : "transition_2_to_1"
            );
          }}
          strength={0.45}
          textStrength={0.25}
          glowColor="rgba(59, 130, 246, 0.7)"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/50 dark:border-white/30 bg-white/50 dark:bg-slate-900/50 hover:bg-white/80 dark:hover:bg-slate-900/80 text-slate-900 dark:text-cyan-300 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-md opacity-50 hover:opacity-100 transition-all duration-300 active:scale-90 flex items-center justify-center cursor-pointer"
          title={
            videoState.includes("1")
              ? (isVi ? "Chuyển sang Màn hình 2" : "Switch to Screen 2")
              : (isVi ? "Quay lại Màn hình 1" : "Back to Screen 1")
          }
        >
          {videoState.includes("1") ? (
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          ) : (
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          )}
        </MagneticButton>
        <span className="text-[9.5px] sm:text-[10.5px] font-bold px-2.5 py-1 rounded-full bg-slate-900/90 dark:bg-white/95 text-white dark:text-slate-900 shadow-lg backdrop-blur-md opacity-0 group-hover/nav-btn:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none">
          {videoState.includes("1") ? (isVi ? "Chuyển sang Màn hình 2" : "Switch to Screen 2") : (isVi ? "Quay lại Màn hình 1" : "Back to Screen 1")}
        </span>
      </div>

      {/* 4. Bottom Welcome Note Card (Nằm phía dưới bên phải / responsive, thiết kế tối ưu) */}
      <div className="relative z-20 w-full flex justify-end items-end p-3 sm:p-5 lg:p-6 pointer-events-none mt-auto">
        <div className="w-fit max-w-[480px] sm:max-w-[540px] pointer-events-auto">
          <div 
            id="hero-intro-card"
            className={cn(
              "w-fit max-w-full group relative p-4 sm:p-5 rounded-2xl transition-all duration-300 overflow-hidden flex flex-col items-stretch gap-3.5",
              "glass-surface backdrop-blur-2xl border border-slate-200/90 dark:border-slate-700/90 bg-white/95 dark:bg-slate-900/95",
              "shadow-[0_16px_40px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.12)] text-slate-900 dark:text-white",
              "hover:border-blue-500/70 dark:hover:border-cyan-400/70 hover:shadow-[0_20px_48px_rgba(37,99,235,0.28)]"
            )}
          >
            {/* Glowing Ambient Light */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br from-blue-500/20 to-cyan-500/0 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

            {/* Text Content Area */}
            <div className="relative z-20 w-full space-y-2 text-left">
              {/* Header Badges */}
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-[10px] shadow-xs">
                  <Sparkles className="w-3 h-3 fill-current shrink-0" />
                  <span className="truncate font-play">{isVi ? "Giới thiệu" : "Introduction"}</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-800 dark:text-cyan-300 bg-blue-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded-full border border-blue-200/80 dark:border-cyan-600/40 shadow-2xs">
                  {isVi ? "22+ Năm kinh nghiệm" : "22+ Years exp"}
                </span>
              </div>
              
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 block tracking-wide">
                  {isVi ? "Xin chào! Tôi là" : "Welcome! I am"}
                </span>
                <h2 className="text-base sm:text-xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
                  <span className="text-blue-700 dark:text-cyan-400">Nguyễn Hùng Thái</span>
                </h2>
                <p className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  {isVi 
                    ? "Trưởng phòng Chăm sóc Khách hàng" 
                    : "Head of Customer Support & CX"}
                </p>
              </div>
            </div>

            {/* Actions Area - Bottom Row with Action Buttons */}
            <div className="relative z-20 flex flex-row flex-wrap items-center justify-end gap-2 sm:gap-2.5 w-full shrink-0 pt-2.5 border-t border-slate-200/90 dark:border-slate-800/90">
              <HeroIntroButton
                className="w-auto max-w-fit shrink-0 min-h-[44px]"
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
                className="w-auto max-w-fit shrink-0 min-h-[44px]"
                onContact={() => {
                  scrollTo('contact');
                }}
                lang={lang}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
