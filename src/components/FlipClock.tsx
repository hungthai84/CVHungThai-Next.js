import React, { useState, useEffect } from "react";

interface SingleDigitFlipProps {
  digit: string;
}

const SingleDigitFlip: React.FC<SingleDigitFlipProps> = ({ digit }) => {
  const [currentDigit, setCurrentDigit] = useState(digit);
  const [previousDigit, setPreviousDigit] = useState(digit);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (digit !== currentDigit) {
      setPreviousDigit(currentDigit);
      setCurrentDigit(digit);
      setIsFlipping(true);

      const timer = setTimeout(() => {
        setIsFlipping(false);
      }, 550);

      return () => clearTimeout(timer);
    }
  }, [digit, currentDigit]);

  return (
    <div className="relative w-5 h-7 sm:w-6 sm:h-8 md:w-7 md:h-9 bg-slate-950 text-white rounded-md shadow-md select-none perspective-[300px] font-mono font-bold text-xs sm:text-sm md:text-base flex flex-col justify-center items-center overflow-hidden border border-slate-800/80">
      {/* Horizontal Divider Line */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-slate-900/90 z-20 shadow-2xs" />

      {/* Static Top Half (Shows New Digit) */}
      <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-slate-900 flex items-end justify-center rounded-t-md">
        <span className="translate-y-[50%] leading-none text-white drop-shadow-xs">
          {currentDigit}
        </span>
      </div>

      {/* Static Bottom Half (Shows Old Digit during flip, or current digit) */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-slate-900 flex items-start justify-center rounded-b-md">
        <span className="-translate-y-[50%] leading-none text-white drop-shadow-xs">
          {isFlipping ? previousDigit : currentDigit}
        </span>
      </div>

      {/* Animated Top Half (Flips Down) */}
      {isFlipping && (
        <div 
          className="absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-slate-900 flex items-end justify-center rounded-t-md origin-bottom z-10 animate-flip-top"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden"
          }}
        >
          <span className="translate-y-[50%] leading-none text-white">
            {previousDigit}
          </span>
        </div>
      )}

      {/* Animated Bottom Half (Flips Down Reveal) */}
      {isFlipping && (
        <div 
          className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-slate-900 flex items-start justify-center rounded-b-md origin-top z-10 animate-flip-bottom"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden"
          }}
        >
          <span className="-translate-y-[50%] leading-none text-white">
            {currentDigit}
          </span>
        </div>
      )}
    </div>
  );
};

export default function FlipClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  let hours = time.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // convert 0 to 12

  const hoursStr = String(hours).padStart(2, "0");
  const minutesStr = String(time.getMinutes()).padStart(2, "0");
  const secondsStr = String(time.getSeconds()).padStart(2, "0");

  const dayOfWeekVi = ["CN", "THỨ 2", "THỨ 3", "THỨ 4", "THỨ 5", "THỨ 6", "THỨ 7"][time.getDay()];
  const dateNum = time.getDate();
  const monthNum = time.getMonth() + 1;
  const dateStrVi = `${dayOfWeekVi}, ${dateNum} THG ${monthNum}`;

  return (
    <div className="flex flex-col items-start gap-1 p-0.5 select-none font-sans">
      <div className="flex items-center gap-1 sm:gap-1.5">
        {/* Hours Digits */}
        <div className="flex items-center gap-0.5">
          <SingleDigitFlip digit={hoursStr[0]} />
          <SingleDigitFlip digit={hoursStr[1]} />
        </div>

        {/* Separator Colon */}
        <span className="text-blue-600 dark:text-cyan-400 font-extrabold text-xs sm:text-sm animate-pulse font-mono">
          :
        </span>

        {/* Minutes Digits */}
        <div className="flex items-center gap-0.5">
          <SingleDigitFlip digit={minutesStr[0]} />
          <SingleDigitFlip digit={minutesStr[1]} />
        </div>

        {/* Separator Colon */}
        <span className="text-blue-600 dark:text-cyan-400 font-extrabold text-2xs sm:text-xs animate-pulse font-mono">
          :
        </span>

        {/* Seconds Digits */}
        <div className="flex items-center gap-0.5 opacity-90">
          <SingleDigitFlip digit={secondsStr[0]} />
          <SingleDigitFlip digit={secondsStr[1]} />
        </div>

        {/* AM/PM Badge */}
        <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-black bg-blue-600/20 dark:bg-cyan-500/20 text-blue-600 dark:text-cyan-300 border border-blue-500/30 dark:border-cyan-400/30 uppercase tracking-widest font-mono shrink-0 ml-0.5">
          {ampm}
        </span>
      </div>

      {/* Date Subtitle */}
      <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider font-mono">
        {dateStrVi}
      </span>
    </div>
  );
}
