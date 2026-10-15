import React from "react";
import { cn } from "../../lib/utils";

interface HeroRobotCompanionProps {
  fillCard?: boolean;
  className?: string;
}

export function HeroRobotCompanion({ fillCard = true, className }: HeroRobotCompanionProps) {
  return (
    <div className={cn("relative w-full h-full select-none overflow-hidden flex items-center justify-center pointer-events-auto", className)}>
      {/* Background aura circle */}
      <div className="absolute top-[30%] left-[20%] w-[420px] h-[420px] bg-sky-400/15 rounded-full blur-[110px] -z-10 animate-pulse duration-[7000ms]" />

      {/* Concentric orbital ring lines */}
      <div className="absolute w-[620px] h-[620px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] -z-10 opacity-35 pointer-events-none">
        <svg
          viewBox="0 0 620 620"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="310" cy="310" r="290" stroke="#60B1FF" strokeWidth="1.2" strokeDasharray="6 8" />
          <ellipse cx="310" cy="310" rx="230" ry="180" transform="rotate(-25 310 310)" stroke="#319AFF" strokeWidth="1.5" strokeDasharray="12 6 4 6" />
          <circle cx="310" cy="310" r="140" stroke="#60B1FF" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="4 4" />
          <circle cx="200" cy="80" r="3.5" fill="#60B1FF" />
          <circle cx="490" cy="220" r="2.5" fill="#319AFF" />
          <circle cx="120" cy="400" r="3" fill="#60B1FF" />
        </svg>
      </div>

      <img 
        src="https://i.ibb.co/bRCZdj3Y/33ee5161485a49b6b0c986088425c2cb-1.gif" 
        alt="Robot Companion" 
        className={cn(
          "select-none block max-h-full w-auto h-[90%] m-auto rounded-2xl border border-white/20 shadow-2xl object-contain",
          fillCard && "absolute inset-0"
        )}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default HeroRobotCompanion;
