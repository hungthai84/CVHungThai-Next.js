import React from "react";
import {
  Sparkle,
  ArrowUpRight,
  Figma,
  Framer,
  Palette,
  PenTool,
  Layers,
  Type,
  Aperture,
  Chrome,
  Camera,
  Brush,
  Box,
  Wand2
} from "lucide-react";

export function MaxReedPortfolioFeatures() {
  const row1Icons = [
    { Icon: Figma, label: "Figma" },
    { Icon: Framer, label: "Framer" },
    { Icon: Palette, label: "Palette" },
    { Icon: PenTool, label: "PenTool" },
    { Icon: Layers, label: "Layers" },
    { Icon: Type, label: "Type" },
    { Icon: Aperture, label: "Aperture" },
    { Icon: Chrome, label: "Chrome" },
  ];

  const row2Icons = [
    { Icon: Camera, label: "Camera" },
    { Icon: Brush, label: "Brush" },
    { Icon: Box, label: "Box" },
    { Icon: Wand2, label: "Wand2" },
    { Icon: Figma, label: "Figma" },
    { Icon: Framer, label: "Framer" },
    { Icon: Type, label: "Type" },
    { Icon: Layers, label: "Layers" },
  ];

  return (
    <div className="w-full min-h-screen lg:h-screen bg-white/95 dark:bg-[#0a0a0a] text-slate-900 dark:text-white antialiased font-sans flex flex-col justify-between px-4 sm:px-6 md:px-10 lg:px-14 py-6 sm:py-8 md:py-10 rounded-[28px] overflow-hidden shadow-xs dark:shadow-[0_0_20px_rgba(6,182,212,0.25)] border border-slate-200/90 dark:border-cyan-500/30 backdrop-blur-xl transition-colors duration-300">
      {/* Top Header Row */}
      <div className="w-full flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 md:pb-8">
        <div className="max-w-3xl space-y-3">
          <h1 className="text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] leading-[1.15] font-normal tracking-tight text-slate-900 dark:text-white">
            Hi, I'm Max Reed!
          </h1>
          <p className="text-sm md:text-[15px] leading-[1.6] text-slate-600 dark:text-white/60 max-w-3xl">
            A London-based independent creator shaping sharp visual systems, web-ready products, and story-first campaigns. With a decade of craft behind me, I help ideas move with focus and intention.
          </p>
        </div>

        <div className="shrink-0 pt-1">
          <button
            type="button"
            className="rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-medium bg-slate-900 text-white dark:bg-white/15 dark:text-white hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-md border border-slate-700/20 dark:border-white/20 backdrop-blur-md"
          >
            Let's Team Up Today
          </button>
        </div>
      </div>

      {/* Grid: 3 columns on lg, 2 on md, 1 on mobile, gap-4 md:gap-5 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 flex-1 w-full items-stretch">
        
        {/* Column 1 - Background card (r_inner = 28 - 10 = 18px) */}
        <div className="relative rounded-[18px] bg-slate-950 dark:bg-black overflow-hidden flex flex-col justify-between p-5 md:p-6 min-h-[360px] md:min-h-[420px] lg:min-h-[460px] shadow-md border border-slate-300/40 dark:border-white/10">
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_150203_44a5bd32-516a-47ce-a077-8acbf9aa8991.mp4"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/40 z-0" />

          {/* Top Label */}
          <div className="relative z-10 flex items-center justify-center gap-2">
            <Sparkle className="h-3 w-3 text-white/70" strokeWidth={1.5} />
            <span className="uppercase tracking-[0.22em] text-[11px] text-white/70 font-mono font-medium">
              BACKGROUND
            </span>
            <Sparkle className="h-3 w-3 text-white/70" strokeWidth={1.5} />
          </div>

          {/* Bottom Career Timeline: r_inner = 18 - 8 = 10px */}
          <div className="relative z-10 w-full grid grid-cols-[auto_auto_1fr_auto] gap-x-2.5 sm:gap-x-3 gap-y-2.5 items-center text-xs sm:text-[13px] text-white/90 bg-black/40 backdrop-blur-md p-3 rounded-[10px] border border-white/10">
            <span className="font-mono text-white/70">2023-Now</span>
            <Sparkle className="h-3 w-3 text-white/60" strokeWidth={1.5} />
            <span className="font-medium truncate">Freelance Creative</span>
            <span className="text-white/60 text-right truncate">Solo Studio</span>

            <span className="font-mono text-white/70">2020-2023</span>
            <Sparkle className="h-3 w-3 text-white/60" strokeWidth={1.5} />
            <span className="font-medium truncate">Head of Brand Design</span>
            <span className="text-white/60 text-right truncate">Rove Studio</span>

            <span className="font-mono text-white/70">2017-2020</span>
            <Sparkle className="h-3 w-3 text-white/60" strokeWidth={1.5} />
            <span className="font-medium truncate">Visual Stylist</span>
            <span className="text-white/60 text-right truncate">Ember Works</span>
          </div>
        </div>

        {/* Column 2 (stacked rows, md:grid-rows-[auto_1fr]) */}
        <div className="flex flex-col gap-4 md:gap-5 h-full">
          {/* Top - Client Voice card */}
          <div className="relative rounded-[18px] bg-slate-100 dark:bg-[#1e2e2e] border border-slate-200/90 dark:border-teal-500/25 p-5 md:p-6 noise-overlay flex flex-col justify-between gap-4 shadow-sm dark:shadow-md">
            <div className="flex items-center justify-start gap-2">
              <Sparkle className="h-3 w-3 text-teal-600 dark:text-teal-400" strokeWidth={1.5} />
              <span className="uppercase tracking-[0.22em] text-[11px] text-teal-700 dark:text-teal-300 font-mono font-bold">
                CLIENT VOICE
              </span>
              <Sparkle className="h-3 w-3 text-teal-600 dark:text-teal-400" strokeWidth={1.5} />
            </div>

            <p className="text-[13px] sm:text-[13.5px] leading-[1.6] text-slate-700 dark:text-white/85">
              "Max reshaped our image with a degree of finesse and vision that surpassed what we'd hoped for. The process felt graceful, and the outcomes speak for themselves."
            </p>

            <div className="text-xs sm:text-[13px] text-slate-800 dark:text-white/90 pt-1">
              <span className="font-bold text-slate-900 dark:text-white">Elena Brooks</span>, Creative Director — Halcyon
            </div>
          </div>

          {/* Bottom - 10M+ card */}
          <div className="relative rounded-[18px] bg-slate-950 dark:bg-black overflow-hidden flex-1 flex flex-col items-center justify-center p-5 md:p-6 min-h-[200px] shadow-md border border-slate-300/40 dark:border-white/10">
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-black/45 z-0" />

            <div className="relative z-10 flex flex-col items-center justify-center my-auto">
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-light tracking-tight text-white drop-shadow-md leading-none">
                10M+
              </span>
            </div>

            <div className="relative z-10 w-full text-center">
              <span className="text-xs sm:text-sm text-white/85 font-normal tracking-wide">
                Raised for startups
              </span>
            </div>
          </div>
        </div>

        {/* Column 3 (stacked) */}
        <div className="flex flex-col gap-4 md:gap-5 h-full md:col-span-2 lg:col-span-1">
          {/* Top - Daily Software card */}
          <div className="relative rounded-[18px] bg-slate-950 dark:bg-black overflow-hidden flex flex-col justify-between p-5 md:p-6 min-h-[220px] shadow-md border border-slate-300/40 dark:border-white/10">
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-black/50 z-0" />

            <div className="relative z-10 flex items-center justify-center gap-2">
              <Sparkle className="h-3 w-3 text-white/70" strokeWidth={1.5} />
              <span className="uppercase tracking-[0.22em] text-[11px] text-white/70 font-mono font-medium">
                DAILY SOFTWARE
              </span>
              <Sparkle className="h-3 w-3 text-white/70" strokeWidth={1.5} />
            </div>

            {/* Marquee Rows */}
            <div className="relative z-10 flex flex-col gap-3 py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] overflow-hidden">
              {/* Row 1 - Left Marquee */}
              <div className="flex items-center gap-3 w-max animate-marquee-left">
                {[...row1Icons, ...row1Icons].map((item, idx) => (
                  <div
                    key={`r1-${idx}`}
                    className="h-14 w-14 md:h-16 md:w-16 rounded-[10px] bg-white/20 dark:bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shrink-0 text-white shadow-md hover:scale-105 transition-transform"
                    title={item.label}
                  >
                    <item.Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                ))}
              </div>

              {/* Row 2 - Right Marquee */}
              <div className="flex items-center gap-3 w-max animate-marquee-right">
                {[...row2Icons, ...row2Icons].map((item, idx) => (
                  <div
                    key={`r2-${idx}`}
                    className="h-14 w-14 md:h-16 md:w-16 rounded-[10px] bg-white/20 dark:bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shrink-0 text-white shadow-md hover:scale-105 transition-transform"
                    title={item.label}
                  >
                    <item.Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom - Reach Me card */}
          <div className="relative rounded-[18px] bg-slate-100 dark:bg-[#1e2e2e] border border-slate-200/90 dark:border-teal-500/25 p-5 md:p-6 noise-overlay flex flex-col justify-between gap-4 shadow-sm dark:shadow-md">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-start gap-2">
                <Sparkle className="h-3 w-3 text-teal-600 dark:text-teal-400" strokeWidth={1.5} />
                <span className="uppercase tracking-[0.22em] text-[11px] text-teal-700 dark:text-teal-300 font-mono font-bold">
                  REACH ME
                </span>
                <Sparkle className="h-3 w-3 text-teal-600 dark:text-teal-400" strokeWidth={1.5} />
              </div>

              <a
                href="mailto:hi@maxreed.com"
                className="h-9 w-9 rounded-full bg-white dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border border-slate-200 dark:border-white/20 flex items-center justify-center text-slate-800 dark:text-white transition-all hover:scale-105 active:scale-95 shadow-2xs"
                title="Send Email"
              >
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>

            <div className="space-y-1 pt-1 text-sm md:text-[15px] font-mono">
              <div className="text-slate-900 dark:text-white/90 font-bold">
                hi@maxreed.com
              </div>
              <div className="text-slate-500 dark:text-white/60">
                +44 207 81 63
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MaxReedPortfolioFeatures;
