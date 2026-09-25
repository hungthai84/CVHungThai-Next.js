import React from "react";
import { Sparkles, Bot, ShieldCheck, Zap, MessageSquare } from "lucide-react";

interface HeroRobotCompanionProps {
  className?: string;
  isCompact?: boolean;
}

export const HeroRobotCompanion: React.FC<HeroRobotCompanionProps> = ({
  className = "",
  isCompact = false,
}) => {
  return (
    <div
      className={`relative w-full flex items-center justify-center lg:justify-end py-10 pointer-events-none select-none overflow-hidden ${className}`}
    >
      {/* ========================================================================= */}
      {/* 1. DECORATIVE ORBIT ART */}
      {/* ========================================================================= */}
      {/* Background aura circle */}
      <div className="absolute top-[30%] left-[20%] w-[420px] h-[420px] bg-sky-400/15 rounded-full blur-[110px] -z-10 animate-pulse duration-[7000ms]" />

      {/* Thin orbital concentric ring lines using vector blueprint */}
      <div className="absolute w-[620px] h-[620px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] -z-10 opacity-35 pointer-events-none">
        <svg
          viewBox="0 0 620 620"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="skyOrbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60B1FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#319AFF" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="skyOrbitGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#319AFF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#60B1FF" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Outer Orbit Ring */}
          <circle
            cx="310"
            cy="310"
            r="290"
            stroke="url(#skyOrbitGrad1)"
            strokeWidth="1.2"
            strokeDasharray="6 8"
          />

          {/* Middle Elliptical Orbit */}
          <ellipse
            cx="310"
            cy="310"
            rx="230"
            ry="180"
            transform="rotate(-25 310 310)"
            stroke="url(#skyOrbitGrad2)"
            strokeWidth="1.5"
            strokeDasharray="12 6 4 6"
          />

          {/* Inner Accent Ring */}
          <circle
            cx="310"
            cy="310"
            r="140"
            stroke="#60B1FF"
            strokeWidth="0.8"
            strokeOpacity="0.4"
            strokeDasharray="4 4"
          />

          {/* Planetary Node Dots */}
          <circle cx="200" cy="80" r="3.5" fill="#60B1FF" />
          <circle cx="490" cy="220" r="2.5" fill="#319AFF" />
          <circle cx="120" cy="400" r="3" fill="#60B1FF" />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 2. CENTERED ROBOT COMPANION VIDEO */}
      {/* ========================================================================= */}
      <div className="relative w-full max-w-[600px] flex items-center justify-center">
        <video
          src="https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero_robo_video.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          style={{ filter: "brightness(1.02) contrast(1.04)" }}
          className="w-full h-auto rounded-[24px] select-none block object-contain"
        />

        {/* ========================================================================= */}
        {/* 3. DYNAMIC FLOATING BADGES (Three liquid-glass tasking cards) */}
        {/* ========================================================================= */}
        
        {/* Floating Card 1: Top-Left Companion Indicator */}
        <div
          className={`absolute -top-3 left-4 sm:left-6 flex items-center gap-2.5 px-3.5 py-2 rounded-[16px]
            bg-gradient-to-br from-white/75 to-white/45 dark:from-slate-900/80 dark:to-slate-800/60
            border border-white/70 dark:border-white/20 ring-1 ring-black/5 dark:ring-white/10
            backdrop-blur-[20px] shadow-[inset_0_2.5px_4px_rgba(255,255,255,0.8)]
            transform hover:scale-105 transition-all duration-300 pointer-events-auto
            ${isCompact ? "scale-90" : ""}`}
        >
          <div className="w-7 h-7 rounded-[10px] bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-xs shrink-0">
            <Bot className="w-4 h-4" />
          </div>
          <div className="text-left leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[11px] font-black text-slate-800 dark:text-white tracking-wide">
                Trí Nhân AI
              </span>
            </div>
            <p className="text-[9.5px] font-semibold text-sky-600 dark:text-sky-400">
              Trợ lý đồng hành 24/7
            </p>
          </div>
        </div>

        {/* Floating Card 2: Right-Center CX Intelligence */}
        <div
          className={`absolute top-[42%] -right-2 sm:right-2 flex items-center gap-2.5 px-3.5 py-2 rounded-[16px]
            bg-gradient-to-br from-white/75 to-white/45 dark:from-slate-900/80 dark:to-slate-800/60
            border border-white/70 dark:border-white/20 ring-1 ring-black/5 dark:ring-white/10
            backdrop-blur-[20px] shadow-[inset_0_2.5px_4px_rgba(255,255,255,0.8)]
            transform hover:scale-105 transition-all duration-300 pointer-events-auto
            ${isCompact ? "scale-90" : ""}`}
        >
          <div className="w-7 h-7 rounded-[10px] bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-xs shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div className="text-left leading-tight">
            <span className="text-[11px] font-black text-slate-800 dark:text-white tracking-wide block">
              Dữ liệu 22+ năm
            </span>
            <p className="text-[9.5px] font-semibold text-indigo-600 dark:text-indigo-400">
              Quản trị CX & Công nghệ
            </p>
          </div>
        </div>

        {/* Floating Card 3: Bottom-Left Interactive Live Chat */}
        <div
          className={`absolute -bottom-2 left-6 sm:left-10 flex items-center gap-2.5 px-3.5 py-2 rounded-[16px]
            bg-gradient-to-br from-white/75 to-white/45 dark:from-slate-900/80 dark:to-slate-800/60
            border border-white/70 dark:border-white/20 ring-1 ring-black/5 dark:ring-white/10
            backdrop-blur-[20px] shadow-[inset_0_2.5px_4px_rgba(255,255,255,0.8)]
            transform hover:scale-105 transition-all duration-300 pointer-events-auto
            ${isCompact ? "scale-90" : ""}`}
        >
          <div className="w-7 h-7 rounded-[10px] bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xs shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-left leading-tight">
            <span className="text-[11px] font-black text-slate-800 dark:text-white tracking-wide block">
              Hỏi đáp thông minh
            </span>
            <p className="text-[9.5px] font-semibold text-emerald-600 dark:text-emerald-400">
              Tra cứu hồ sơ & phỏng vấn
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroRobotCompanion;
