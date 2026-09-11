import React from "react";
import AppIcon from "./AppIcon";
import { cn } from "../lib/utils";

interface HeroIntroButtonProps {
  isPlayingIntro?: boolean;
  isAudioOn: boolean;
  onToggleAudio: () => void;
  onPlayIntro: () => void;
  onCancelIntro?: () => void;
  className?: string;
  lang?: string;
}

/**
 * 1. Microphone / Voice SVG Icon with gradient fill in <defs>
 */
export const VoiceMicIcon: React.FC<{ className?: string }> = ({ 
  className = "w-5.5 h-5.5 shrink-0" 
}) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width="22"
      height="22"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={cn("shrink-0 flex items-center justify-center transition-all duration-300", className)}
    >
      <defs>
        <linearGradient id="micGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>
      </defs>
      <rect x="9" y="3" width="6" height="11" rx="3" fill="url(#micGrad)" stroke="currentColor" strokeWidth="0.8" />
      <path d="M5 10v1.5a7 7 0 0014 0V10" stroke="url(#micGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="18.5" x2="12" y2="21" stroke="url(#micGrad)" strokeWidth="2" strokeLinecap="round" />
      <line x1="8.5" y1="21" x2="15.5" y2="21" stroke="url(#micGrad)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

/**
 * 2. Search SVG Icon with gradient fill in <defs>
 */
export const SearchIcon: React.FC<{ className?: string }> = ({ 
  className = "w-5.5 h-5.5 shrink-0" 
}) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width="22"
      height="22"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={cn("shrink-0 flex items-center justify-center transition-all duration-300", className)}
    >
      <defs>
        <linearGradient id="searchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
      </defs>
      <circle cx="10.5" cy="10.5" r="6.5" fill="url(#searchGrad)" fillOpacity="0.25" stroke="url(#searchGrad)" strokeWidth="2.2" />
      <path d="M15.5 15.5L20.5 20.5" stroke="url(#searchGrad)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};

/**
 * 3. Location Pin SVG Icon with gradient fill in <defs>
 */
export const LocationIcon: React.FC<{ className?: string }> = ({ 
  className = "w-5.5 h-5.5 shrink-0" 
}) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width="22"
      height="22"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={cn("shrink-0 flex items-center justify-center transition-all duration-300", className)}
    >
      <defs>
        <linearGradient id="locGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>
      </defs>
      <path d="M12 2.5C8.41 2.5 5.5 5.41 5.5 9c0 5.25 6.5 12.5 6.5 12.5s6.5-7.25 6.5-12.5c0-3.59-2.91-6.5-6.5-6.5z" fill="url(#locGrad)" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="12" cy="9" r="2.5" fill="#FFFFFF" />
    </svg>
  );
};

/**
 * 4. Custom Sparkle icon with top-right plus (+) and bottom-left dot (o) with gradient fill in <defs>
 */
export const SparkleWithPlusDot: React.FC<{ className?: string }> = ({ 
  className = "w-5 h-5 sm:w-6 sm:h-6" 
}) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={cn("shrink-0 flex items-center justify-center transition-all duration-300 drop-shadow-sm", className)}
    >
      <defs>
        <linearGradient id="goldSparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF59D" />
          <stop offset="40%" stopColor="#FFD54F" />
          <stop offset="85%" stopColor="#FF9800" />
          <stop offset="100%" stopColor="#F57C00" />
        </linearGradient>
      </defs>
      {/* 4-point Diamond Star Sparkle */}
      <path
        d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z"
        fill="url(#goldSparkleGrad)"
      />
      {/* Top right small 4-point sparkle star */}
      <path
        d="M19 2.5C19 4 20.2 5.2 21.7 5.2C20.2 5.2 19 6.4 19 7.9C19 6.4 17.8 5.2 16.3 5.2C17.8 5.2 19 4 19 2.5Z"
        fill="url(#goldSparkleGrad)"
      />
      {/* Bottom left small glow dot */}
      <circle
        cx="5"
        cy="19"
        r="1.2"
        fill="url(#goldSparkleGrad)"
      />
    </svg>
  );
};

export const HeroIntroButton: React.FC<HeroIntroButtonProps> = ({
  isPlayingIntro = false,
  isAudioOn,
  onToggleAudio,
  onPlayIntro,
  onCancelIntro,
  className,
  lang = "vi",
}) => {
  const isVi = lang === "vi";

  return (
    <div 
      className={cn(
        "relative inline-flex items-center justify-between rounded-full p-[2px] select-none group/container transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] w-auto max-w-fit h-[45px] overflow-hidden shadow-[0_0_20px_rgba(78,86,246,0.5)] ring-2 ring-indigo-400/50",
        className
      )}
    >
      {/* Rotating Glowing Laser Beam Border */}
      <div className="absolute -inset-[220%] animate-[spin_4s_linear_infinite] pointer-events-none bg-[conic-gradient(from_0deg,transparent_0_200deg,#4E56F6_250deg,#F125D6_300deg,#ffffff_340deg,#4E56F6_360deg)] opacity-100" />

      {/* Subtle Animated Glowing Ring when Audio is Active */}
      {isAudioOn && (
        <div className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400 opacity-70 blur-xs animate-pulse pointer-events-none" />
      )}

      {/* Capsule Outer Pill Shell with Rich Gradient matching Video button */}
      <div className="relative z-10 inline-flex items-center justify-between w-auto max-w-fit h-full rounded-full bg-gradient-to-r from-[#4E56F6] via-[#8938F8] to-[#F125D6] px-1.5 py-1 gap-1.5 sm:gap-2 shadow-inner backdrop-blur-md">
        
        {/* Left Circular Red Speaker Button */}
        <div className="p-0.5 rounded-full ring-2 ring-indigo-300/80 border border-white/40 bg-indigo-900/30 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleAudio();
            }}
            className={cn(
              "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 p-0 transition-all duration-300 cursor-pointer active:scale-95 shadow-md",
              isAudioOn 
                ? "bg-[#4E56F6] hover:bg-[#3b43e3] text-white shadow-[0_0_12px_rgba(78,86,246,0.9)]" 
                : "bg-[#E60026] hover:bg-red-500 text-white shadow-[0_0_12px_rgba(230,0,38,0.9)]"
            )}
            title={
              isAudioOn 
                ? (isVi ? "Tắt âm thanh video" : "Mute audio") 
                : (isVi ? "Bật âm thanh video" : "Unmute audio")
            }
            aria-label={isAudioOn ? "Mute sound" : "Unmute sound"}
          >
            {isAudioOn ? (
              <svg 
                viewBox="0 0 24 24" 
                className="w-4 h-4 text-white drop-shadow-xs" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M11 5L6 9H2V15H6L11 19V5Z" 
                  fill="#FFFFFF" 
                  stroke="#FFFFFF" 
                  strokeWidth="1" 
                  strokeLinejoin="round" 
                />
                <path 
                  d="M15.5 8.5C16.5 9.5 17 10.7 17 12C17 13.3 16.5 14.5 15.5 15.5M19 5.5C21 7.5 22 9.7 22 12C22 14.3 21 16.5 19 18.5" 
                  stroke="#FFFFFF" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
            ) : (
              <svg 
                viewBox="0 0 24 24" 
                className="w-4 h-4 text-white drop-shadow-xs" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M11 5L6 9H2V15H6L11 19V5Z" 
                  fill="#FFFFFF" 
                  stroke="#FFFFFF" 
                  strokeWidth="1" 
                  strokeLinejoin="round" 
                />
                <path 
                  d="M16 10L20 14M20 10L16 14" 
                  stroke="#FFFFFF" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                />
              </svg>
            )}
          </button>
        </div>

        {/* Vertical Divider Line */}
        <div className="w-[1.5px] h-4 sm:h-5 bg-white/40 shrink-0 mx-0.5 rounded-full" />

        {/* Main Right Button ("Giới thiệu" + Sparkle Star Icon) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (isPlayingIntro && onCancelIntro) {
              onCancelIntro();
            } else {
              onPlayIntro();
            }
          }}
          className={cn(
            "flex items-center justify-center gap-1.5 sm:gap-2 px-2 py-0.5 flex-1 min-w-0",
            "text-white font-extrabold text-xs sm:text-sm tracking-wide transition-all duration-300 cursor-pointer",
            "hover:opacity-90 active:scale-98"
          )}
          title={
            isPlayingIntro 
              ? (isVi ? "Đang phát lời chào - Bấm để dừng" : "Playing intro - Click to stop") 
              : (isVi ? "Phát Video Lời Chào Giới Thiệu (Kèm âm thanh)" : "Play Introduction Video")
          }
        >
          {isPlayingIntro ? (
            <>
              <span className="drop-shadow-sm font-extrabold text-xs uppercase tracking-wider truncate">
                {isVi ? "Dừng Lời Chào" : "Stop Intro"}
              </span>
              <div className="animate-spin text-white shrink-0 flex items-center justify-center">
                <AppIcon name="rotate-ccw" size={14} ariaLabel="Stop intro" />
              </div>
            </>
          ) : (
            <>
              <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] font-black text-xs sm:text-sm text-white font-sans truncate">
                {isVi ? "Giới thiệu" : "Introduction"}
              </span>
              <SparkleWithPlusDot className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export interface HeroContactButtonProps {
  onContact: () => void;
  className?: string;
  lang?: string;
}

export const HeroContactButton: React.FC<HeroContactButtonProps> = ({
  onContact,
  className,
  lang = "vi",
}) => {
  const isVi = lang === "vi";

  return (
    <div 
      className={cn(
        "relative inline-flex items-center justify-between rounded-full p-[2px] select-none group/container transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] w-auto max-w-fit h-[45px] overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.5)] ring-2 ring-emerald-400/50",
        className
      )}
    >
      {/* Rotating Glowing Laser Beam Border */}
      <div className="absolute -inset-[220%] animate-[spin_4s_linear_infinite] pointer-events-none bg-[conic-gradient(from_0deg,transparent_0_200deg,#059669_250deg,#10B981_300deg,#ffffff_340deg,#059669_360deg)] opacity-100" />

      {/* Capsule Outer Pill Shell with Green Gradient matching video button format */}
      <div className="relative z-10 inline-flex items-center justify-between w-auto max-w-fit h-full rounded-full bg-gradient-to-r from-[#059669] via-[#0D9488] to-[#10B981] px-1.5 py-1 gap-1.5 sm:gap-2 shadow-inner backdrop-blur-md">
        
        {/* Left Circular Green Mail Icon Button */}
        <div className="p-0.5 rounded-full ring-2 ring-emerald-300/80 border border-white/40 bg-emerald-900/30 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onContact();
            }}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 p-0 transition-all duration-300 cursor-pointer active:scale-95 shadow-md bg-[#00B050] hover:bg-emerald-500 text-white shadow-[0_0_12px_rgba(0,176,80,0.9)]"
            title={isVi ? "Gửi thông tin liên hệ" : "Send contact info"}
            aria-label={isVi ? "Liên hệ" : "Contact"}
          >
            <svg 
              viewBox="0 0 24 24" 
              className="w-4 h-4 text-white drop-shadow-xs" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" 
                stroke="#FFFFFF" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </button>
        </div>

        {/* Vertical Divider Line */}
        <div className="w-[1.5px] h-4 sm:h-5 bg-white/40 shrink-0 mx-0.5 rounded-full" />

        {/* Main Right Button ("Liên hệ" + Sparkle Star Icon) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onContact();
          }}
          className={cn(
            "flex items-center justify-center gap-1.5 sm:gap-2 px-2 py-0.5 flex-1 min-w-0",
            "text-white font-extrabold text-xs sm:text-sm tracking-wide transition-all duration-300 cursor-pointer",
            "hover:opacity-90 active:scale-98"
          )}
          title={isVi ? "Chuyển tới phần Liên hệ" : "Go to Contact section"}
        >
          <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] font-black text-xs sm:text-sm text-white font-sans tracking-wide truncate">
            {isVi ? "Liên hệ" : "Contact"}
          </span>
          <SparkleWithPlusDot className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
        </button>
      </div>
    </div>
  );
};

export default HeroIntroButton;
