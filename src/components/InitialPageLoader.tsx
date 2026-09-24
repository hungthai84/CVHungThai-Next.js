import React, { useEffect, useState } from "react";

export function InitialPageLoader() {
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    const t1 = setTimeout(() => setProgress(55), 100);
    const t2 = setTimeout(() => setProgress(82), 260);
    const t3 = setTimeout(() => setProgress(98), 450);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="min-h-screen h-screen w-full flex flex-col items-center justify-center bg-[#070b18] text-slate-100 select-none relative overflow-hidden">
      {/* Subtle ambient background glow */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full filter blur-[120px] opacity-25 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,245,255,0.4) 0%, rgba(255,0,127,0.2) 50%, rgba(139,92,246,0) 70%)"
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-[90%] px-6 py-8 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-2xl shadow-[0_24px_60px_rgba(0,0,0,0.6),0_0_30px_rgba(0,245,255,0.12)]">
        {/* Brand Icon Halo */}
        <div className="relative mb-5 flex items-center justify-center">
          <div 
            className="absolute -inset-2.5 rounded-2xl filter blur-md opacity-70 animate-pulse"
            style={{
              background: "linear-gradient(135deg, #00F5FF, #FF007F, #8B5CF6)"
            }}
          />
          <div className="relative z-10 w-14 h-14 rounded-xl bg-[#090e21] border border-cyan-400/40 flex items-center justify-center shadow-inner">
            <span className="text-xl font-bold font-mono tracking-tight bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              TH
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-base font-semibold tracking-wide text-white mb-1">
          Trần Hoàng Thọ
        </h2>
        <p className="text-xs text-slate-400 font-mono mb-6">
          Enterprise Architecture & Strategic Tech
        </p>

        {/* Theme Gradient Progress Bar */}
        <div className="w-full space-y-2">
          <div className="w-full h-2 rounded-full bg-slate-950/80 border border-cyan-500/20 p-[1.5px] overflow-hidden relative shadow-inner">
            <div
              className="h-full rounded-full relative transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #00F5FF 0%, #FF007F 50%, #8B5CF6 100%)",
                boxShadow: "0 0 12px rgba(0,245,255,0.7), 0 0 20px rgba(255,0,127,0.4)",
              }}
            >
              {/* Shimmer sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent w-full animate-pulse" />
              {/* Tip spark */}
              <div 
                className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white"
                style={{ boxShadow: "0 0 6px 1px #00F5FF" }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>Khởi tạo hệ thống...</span>
            </span>
            <span className="text-cyan-300 font-semibold">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InitialPageLoader;
