import React, { memo } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { SectionMeta } from "../context/SectionContext";
import {
  useSectionProfiling,
  getSectionPerformanceTier,
  StepperHeatmapDot,
  StepperHeatmapBadge,
} from "./SectionHeatmapIndicator";

export interface SectionProgressStepperProps {
  sections: SectionMeta[];
  activeSection: string;
  activeIndex: number;
  onNavigate: (id: string) => void;
  theme?: string;
  lang?: "vi" | "en";
  t: (key: string) => string;
}

export const SectionProgressStepper: React.FC<SectionProgressStepperProps> = memo(
  ({ sections, activeSection, activeIndex, onNavigate, theme = "glass-dark-neon", lang = "vi", t }) => {
    const { getSectionMetrics } = useSectionProfiling();

    return (
      <div
        className={cn(
          "fixed right-3 lg:right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center p-2 sm:p-2.5 rounded-2xl sm:rounded-full space-y-3 transition-all duration-300 backdrop-blur-xl border shadow-xl select-none",
          theme === "glass-dark-neon"
            ? "bg-slate-950/80 border-slate-800/80 text-white shadow-indigo-950/40"
            : "bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white shadow-lg"
        )}
        aria-label="Điều hướng tiến trình các phần"
      >
        {/* Progress Line with Glass effect */}
        <div className="absolute top-5 bottom-5 w-0.5 bg-slate-300/50 dark:bg-white/10 pointer-events-none backdrop-blur-xs">
          <div
            className="w-full bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            style={{
              height: `${(activeIndex / Math.max(1, sections.length - 1)) * 100}%`,
            }}
          />
        </div>

        {sections.map((sec, idx) => {
          const isActive = activeSection === sec.id;
          const Icon = sec.Icon;
          const metric = getSectionMetrics(sec.id);
          const tier = getSectionPerformanceTier(metric?.avgActualMs);

          return (
            <div key={sec.id} className="relative group/step flex items-center justify-center py-0.5">
              {/* Tooltip Badge (Slide to the Left with Theme Glassmorphism & Heatmap Metrics) */}
              <div
                className={cn(
                  "absolute right-9 px-3 py-1.5 rounded-xl border text-2xs font-black tracking-wide whitespace-nowrap opacity-0 translate-x-3 scale-95 group-hover/step:opacity-100 group-hover/step:translate-x-0 group-hover/step:scale-100 transition-all duration-200 pointer-events-none flex items-center gap-2 backdrop-blur-md shadow-2xl",
                  theme === "glass-dark-neon"
                    ? "bg-slate-950/95 border-indigo-500/40 text-white shadow-indigo-950/50"
                    : "bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                )}
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-blue-500/20 text-blue-500 dark:text-blue-400">
                  <Icon className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <span>{t(sec.labelKey)}</span>
                <span className="text-3xs text-blue-600 dark:text-blue-400 font-mono bg-blue-500/10 px-1.5 py-0.5 rounded-md">
                  ({idx + 1}/{sections.length})
                </span>

                {/* Heatmap Performance Tooltip Badge */}
                <StepperHeatmapBadge metric={metric} tier={tier} lang={lang} />
              </div>

              {/* Stepper Item Button with Heatmap Micro-Indicator */}
              <div className="relative flex items-center justify-center">
                {/* Subtle color-coded Heatmap Micro-Dot */}
                <span className="absolute -left-2.5 flex items-center justify-center">
                  <StepperHeatmapDot
                    sectionId={sec.id}
                    isActive={isActive}
                    tier={tier}
                  />
                </span>

                {/* Target Indicator Button with Vertical Bars (Dấu gạch dọc) */}
                <button
                  onClick={() => onNavigate(sec.id)}
                  className={cn(
                    "relative z-10 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center",
                    isActive
                      ? "w-1.5 h-6.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 shadow-md shadow-indigo-500/60 ring-2 ring-indigo-400/80 scale-105"
                      : "w-1 h-3.5 bg-slate-400/80 dark:bg-slate-600 hover:w-1.5 hover:h-6 hover:bg-indigo-500 dark:hover:bg-indigo-400"
                  )}
                  style={
                    !isActive && tier
                      ? {
                          backgroundColor: tier.color,
                          opacity: 0.85,
                          boxShadow: `0 0 6px ${tier.color}40`,
                        }
                      : undefined
                  }
                  title={`${t(sec.labelKey)}${metric ? ` • Render: ${metric.avgActualMs}ms (${tier?.labelVi})` : ""}`}
                >
                  {/* Shared ping wave effect for active item with heatmap tint */}
                  {isActive && (
                    <motion.span
                      layoutId="active-stepper-glow"
                      className="absolute -inset-1 rounded-full border border-indigo-500/60 animate-ping opacity-60 pointer-events-none"
                      style={tier ? { borderColor: tier.color } : undefined}
                    />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

SectionProgressStepper.displayName = "SectionProgressStepper";

export default SectionProgressStepper;
