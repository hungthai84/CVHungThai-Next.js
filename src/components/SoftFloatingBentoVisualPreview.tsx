import React from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  Layers, 
  TrendingUp, 
  CheckCircle2, 
  ArrowUpRight, 
  LayoutGrid, 
  Palette, 
  Zap, 
  Star,
  Activity
} from "lucide-react";

interface BentoPreviewProps {
  compact?: boolean;
  className?: string;
  showDetails?: boolean;
}

/**
 * Visual preview component for "Soft Floating Bento" Theme.
 * Faithfully represents:
 * - Pastel Lavender/Periwinkle/Sky Blue gradient background
 * - Soft Floating Glass Cards (78% white, 16px blur, 65% white border)
 * - 3-Tier Elevated Floating Shadows (Level 1, 2, 3)
 * - Harmonious Pastel Color System (#5865E8, #7C5CDB, #39BFC5, #D778E8)
 * - Modern Floating Bento Cards with dummy layout, metrics, avatar, pills and micro-charts
 */
export const SoftFloatingBentoVisualPreview: React.FC<BentoPreviewProps> = ({
  compact = false,
  className = "",
  showDetails = true
}) => {
  if (compact) {
    // Compact thumbnail preview for cards in theme lists
    return (
      <div 
        className={`w-full rounded-2xl p-2.5 overflow-hidden relative border border-white/60 shadow-[0_10px_25px_rgba(88,101,232,0.12)] select-none transition-all duration-300 ${className}`}
        style={{
          background: "linear-gradient(135deg, #B9A8F2 0%, #C7B9F4 35%, #AFC8F4 70%, #B8DCF2 100%)"
        }}
      >
        {/* Soft Background Blobs */}
        <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-[#7C5CDB]/30 blur-xl pointer-events-none" />
        <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-[#39BFC5]/35 blur-xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-[#D778E8]/25 blur-lg pointer-events-none" />

        {/* Floating Bento Grid Content */}
        <div className="relative z-10 flex flex-col gap-1.5 h-full">
          {/* Top Bar: Floating Glass Pill */}
          <div className="flex items-center justify-between px-2 py-1 rounded-xl bg-white/80 backdrop-blur-md border border-white/70 shadow-[0_4px_12px_rgba(88,101,232,0.08)]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/30 animate-pulse" />
              <span className="text-[9px] font-bold text-[#202858] tracking-tight">Bento Studio</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5865E8]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CDB]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#39BFC5]" />
            </div>
          </div>

          {/* Bento Main Grid: 2 Columns */}
          <div className="grid grid-cols-12 gap-1.5 flex-1">
            {/* Bento Card 1: Profile & Identity (Span 7) - Level 1 Elevation */}
            <div 
              className="col-span-7 rounded-xl p-2 flex flex-col justify-between"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.78)",
                border: "1px solid rgba(255, 255, 255, 0.65)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                boxShadow: "0 6px 20px rgba(70, 65, 150, 0.08)"
              }}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#5865E8] via-[#7C5CDB] to-[#D778E8] text-white flex items-center justify-center text-[9px] font-black shadow-xs">
                  HT
                </div>
                <div className="flex-1 min-w-0">
                  <div className="h-1.5 w-12 rounded-full bg-[#202858] mb-1" />
                  <div className="h-1 w-8 rounded-full bg-[#596080]/60" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-1.5">
                <span className="px-1.5 py-0.5 rounded-md text-[7px] font-extrabold bg-[#5865E8]/10 text-[#5865E8] border border-[#5865E8]/20">
                  UI/UX
                </span>
                <span className="px-1.5 py-0.5 rounded-md text-[7px] font-extrabold bg-[#39BFC5]/15 text-[#0d9488] border border-[#39BFC5]/25">
                  Next.js
                </span>
              </div>
            </div>

            {/* Bento Card 2: Stats Metric & Mini Chart (Span 5) - Level 2 Elevation */}
            <div 
              className="col-span-5 rounded-xl p-2 flex flex-col justify-between"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.78)",
                border: "1px solid rgba(255, 255, 255, 0.65)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                boxShadow: "0 12px 30px rgba(70, 65, 150, 0.12)"
              }}
            >
              <div>
                <span className="text-[7px] font-bold text-[#596080] uppercase tracking-wider block">Impact</span>
                <div className="text-xs font-black text-[#5865E8] tracking-tight flex items-baseline gap-0.5">
                  98%
                  <TrendingUp className="w-2.5 h-2.5 text-emerald-500 stroke-[3]" />
                </div>
              </div>
              {/* Mini Equalizer Bar Chart */}
              <div className="flex items-end gap-1 h-3 mt-1">
                <div className="w-1.5 h-2 rounded-t-sm bg-[#5865E8]/70" />
                <div className="w-1.5 h-3 rounded-t-sm bg-[#7C5CDB]" />
                <div className="w-1.5 h-2.5 rounded-t-sm bg-[#39BFC5]" />
                <div className="w-1.5 h-3.5 rounded-t-sm bg-[#D778E8]" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Style Pill */}
        <div className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-full text-[8px] font-extrabold tracking-wider bg-white/90 text-[#5865E8] border border-white/80 shadow-[0_4px_12px_rgba(88,101,232,0.18)] flex items-center gap-1 z-20">
          <Sparkles className="w-2.5 h-2.5 text-[#D778E8]" />
          <span>Soft Bento</span>
        </div>
      </div>
    );
  }

  // Full Expanded Interactive Preview
  return (
    <div 
      className={`w-full rounded-3xl p-4 sm:p-5 overflow-hidden relative border border-white/70 shadow-[0_20px_50px_rgba(88,101,232,0.16)] select-none ${className}`}
      style={{
        background: "linear-gradient(135deg, #B9A8F2 0%, #C7B9F4 35%, #AFC8F4 70%, #B8DCF2 100%)"
      }}
    >
      {/* Dynamic Background Ambient Blobs */}
      <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[#7C5CDB]/35 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-10 w-56 h-56 rounded-full bg-[#39BFC5]/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 left-1/4 w-60 h-60 rounded-full bg-[#D778E8]/25 blur-3xl pointer-events-none" />

      {/* Decorative Floating Glass Badges */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-white/80 shadow-[0_6px_20px_rgba(88,101,232,0.15)]">
        <Sparkles className="w-3.5 h-3.5 text-[#7C5CDB]" />
        <span className="text-3xs sm:text-xs font-black text-[#202858] tracking-wider uppercase">
          Soft Floating Bento
        </span>
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        {/* Top Header Floating Pill Navigation */}
        <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/80 shadow-[0_8px_24px_rgba(88,101,232,0.08)]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#5865E8] to-[#7C5CDB] text-white flex items-center justify-center font-black text-xs shadow-md shadow-[#5865E8]/25">
              <LayoutGrid className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black text-[#202858] flex items-center gap-1.5">
                <span>Nguyen Hung Thai</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-400/40 animate-pulse" />
              </div>
              <span className="text-3xs text-[#596080] font-medium">Senior Full-Stack & UI/UX Designer</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="hidden sm:inline-flex px-2.5 py-1 rounded-xl text-3xs font-extrabold bg-[#5865E8]/10 text-[#5865E8] border border-[#5865E8]/20">
              Interactive Preview
            </span>
            <div className="w-7 h-7 rounded-xl bg-white/90 text-[#5865E8] flex items-center justify-center shadow-xs border border-white/80">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Bento Grid: 4 Layered Floating Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Card 1: Hero Storytelling (Span 7) - Elevation Level 1 */}
          <div 
            className="sm:col-span-7 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.78)",
              border: "1px solid rgba(255, 255, 255, 0.65)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 6px 20px rgba(70, 65, 150, 0.08)"
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-lg text-3xs font-extrabold uppercase tracking-wider bg-[#7C5CDB]/15 text-[#7C5CDB] border border-[#7C5CDB]/20">
                  Feature Highlight
                </span>
                <span className="text-3xs font-bold text-[#596080]">Level 1 Elevation (6px/20px)</span>
              </div>
              <h4 className="text-sm sm:text-base font-black text-[#202858] leading-snug">
                Modern Floating Cards with Soft Pastel Depth
              </h4>
              <p className="text-xs text-[#596080] mt-1 leading-relaxed">
                Card kính mờ 78% (rgba 255,255,255,0.78), border trắng trong 65% và blur 16px.
              </p>
            </div>

            {/* Floating Tags */}
            <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-200/50">
              <span className="px-2 py-0.5 rounded-lg text-3xs font-bold bg-[#5865E8]/10 text-[#5865E8] border border-[#5865E8]/20 flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 text-[#5865E8]" />
                Next.js 15
              </span>
              <span className="px-2 py-0.5 rounded-lg text-3xs font-bold bg-[#39BFC5]/15 text-[#0d9488] border border-[#39BFC5]/25 flex items-center gap-1">
                <Palette className="w-2.5 h-2.5 text-[#0d9488]" />
                Glass UI
              </span>
              <span className="px-2 py-0.5 rounded-lg text-3xs font-bold bg-[#D778E8]/15 text-[#c026d3] border border-[#D778E8]/25 flex items-center gap-1">
                <Star className="w-2.5 h-2.5 text-[#c026d3]" />
                Bento
              </span>
            </div>
          </div>

          {/* Card 2: Metrics & Stat (Span 5) - Elevation Level 2 */}
          <div 
            className="sm:col-span-5 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.78)",
              border: "1px solid rgba(255, 255, 255, 0.65)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 12px 30px rgba(70, 65, 150, 0.12)"
            }}
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-[#5865E8]/10 text-[#5865E8] flex items-center justify-center border border-[#5865E8]/20">
                <Activity className="w-4 h-4" />
              </div>
              <span className="px-2 py-0.5 rounded-full text-3xs font-black bg-emerald-500/15 text-emerald-600 border border-emerald-500/20">
                +24% Growth
              </span>
            </div>

            <div className="my-2">
              <div className="text-2xl sm:text-3xl font-black text-[#5865E8] tracking-tight">
                98.6%
              </div>
              <div className="text-3xs sm:text-xs font-bold text-[#596080]">
                Client Satisfaction Index
              </div>
            </div>

            {/* Mini Progress Equalizer */}
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] font-bold text-[#596080]">
                <span>Level 2 Elevation</span>
                <span className="text-[#5865E8]">12px/30px</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200/70 overflow-hidden p-0.5">
                <div className="h-full rounded-full bg-gradient-to-r from-[#5865E8] via-[#7C5CDB] to-[#39BFC5] w-[94%]" />
              </div>
            </div>
          </div>

          {/* Card 3: Color System Swatches (Span 6) - Elevation Level 2 */}
          <div 
            className="sm:col-span-6 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.78)",
              border: "1px solid rgba(255, 255, 255, 0.65)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 12px 30px rgba(70, 65, 150, 0.12)"
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-[#39BFC5]/15 text-[#0d9488] flex items-center justify-center border border-[#39BFC5]/30">
                <Palette className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#202858] block">Pastel Color Harmony</span>
                <span className="text-3xs text-[#596080]">Primary, Secondary, Cyan & Pink</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#5865E8] border-2 border-white shadow-xs" title="Primary #5865E8" />
              <span className="w-4 h-4 rounded-full bg-[#7C5CDB] border-2 border-white shadow-xs" title="Secondary #7C5CDB" />
              <span className="w-4 h-4 rounded-full bg-[#39BFC5] border-2 border-white shadow-xs" title="Cyan #39BFC5" />
              <span className="w-4 h-4 rounded-full bg-[#D778E8] border-2 border-white shadow-xs" title="Pink #D778E8" />
            </div>
          </div>

          {/* Card 4: Action / Live Pill (Span 6) - Elevation Level 3 */}
          <div 
            className="sm:col-span-6 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.90)",
              border: "1px solid rgba(255, 255, 255, 0.75)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 20px 45px rgba(70, 65, 150, 0.16)"
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#5865E8] to-[#D778E8] text-white flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-black text-[#202858] block">Level 3 Elevation</span>
                <span className="text-3xs text-[#5865E8] font-bold">20px/45px Shadow</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-xl text-3xs font-black bg-[#5865E8] text-white shadow-sm shadow-[#5865E8]/30">
              Soft Bento
            </span>
          </div>
        </div>

        {/* Feature Checkpoints footer */}
        {showDetails && (
          <div className="mt-1 p-2.5 rounded-2xl bg-white/75 backdrop-blur-md border border-white/70 flex flex-wrap items-center justify-between gap-2 text-3xs font-semibold text-[#596080]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#5865E8]" />
              <span>Soft Floating Shadows (3-Tier)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#7C5CDB]" />
              <span>Lavender → Sky Pastel Gradient</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#39BFC5]" />
              <span>18–24px Smooth Bento Radius</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoftFloatingBentoVisualPreview;
