import React, { useState, useEffect, useRef } from "react";
import { cn } from "../lib/utils";

export interface PerformanceTier {
  color: string;
  bgClass: string;
  borderClass: string;
  glowShadow: string;
  textClass: string;
  labelEn: string;
  labelVi: string;
  badgeBg: string;
}

/**
 * Maps React Profiler duration (in ms) to a color-coded performance tier from Green to Red:
 * - Green (< 8ms): Ultra-responsive (Optimal)
 * - Lime (8ms - 16ms): Under 60fps frame budget (Smooth)
 * - Amber (16ms - 32ms): Moderate overhead (Moderate)
 * - Red (> 32ms): Heavier component load (Heavy)
 */
export function getSectionPerformanceTier(durationMs: number | undefined | null): PerformanceTier | null {
  if (durationMs === undefined || durationMs === null || isNaN(durationMs)) {
    return null;
  }
  if (durationMs <= 8) {
    return {
      color: "#10b981", // Emerald Green
      bgClass: "bg-emerald-500",
      borderClass: "border-emerald-500/40",
      glowShadow: "0 0 8px rgba(16, 185, 129, 0.75)",
      textClass: "text-emerald-500 dark:text-emerald-400",
      labelEn: "Optimal (<8ms)",
      labelVi: "Tối ưu (<8ms)",
      badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    };
  }
  if (durationMs <= 16) {
    return {
      color: "#84cc16", // Lime Green
      bgClass: "bg-lime-500",
      borderClass: "border-lime-500/40",
      glowShadow: "0 0 8px rgba(132, 204, 22, 0.75)",
      textClass: "text-lime-500 dark:text-lime-400",
      labelEn: "Smooth (<16ms)",
      labelVi: "Mượt mà (<16ms)",
      badgeBg: "bg-lime-500/10 dark:bg-lime-500/15",
    };
  }
  if (durationMs <= 32) {
    return {
      color: "#f59e0b", // Amber Orange
      bgClass: "bg-amber-500",
      borderClass: "border-amber-500/40",
      glowShadow: "0 0 8px rgba(245, 158, 11, 0.75)",
      textClass: "text-amber-500 dark:text-amber-400",
      labelEn: "Moderate (16-32ms)",
      labelVi: "Trung bình (16-32ms)",
      badgeBg: "bg-amber-500/10 dark:bg-amber-500/15",
    };
  }
  return {
    color: "#ef4444", // Crimson Red
    bgClass: "bg-rose-500",
    borderClass: "border-rose-500/40",
    glowShadow: "0 0 8px rgba(239, 68, 68, 0.75)",
    textClass: "text-rose-500 dark:text-rose-400",
    labelEn: "Heavy (>32ms)",
    labelVi: "Tải nặng (>32ms)",
    badgeBg: "bg-rose-500/10 dark:bg-rose-500/15",
  };
}

export interface SectionProfilingMetric {
  mounts: number;
  updates: number;
  avgActualMs: number;
  totalActualMs: number;
  lastCommit: number;
}

/**
 * Hook to consume real-time section profiling records stored on window.__REACT_SECTION_PROFILING__
 * Uses throttling and debouncing to prevent infinite render loops during Profiler commits.
 */
export function useSectionProfiling() {
  const [summary, setSummary] = useState<Record<string, SectionProfilingMetric>>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateSummarySafely = () => {
      if (timerRef.current) return; // Throttled

      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        if (typeof window !== "undefined") {
          const w = window as any;
          if (w.__REACT_SECTION_PROFILING__?.getSummary) {
            const fresh = w.__REACT_SECTION_PROFILING__.getSummary();
            setSummary((prev) => {
              // Quick check if values differ before triggering state update
              const prevKeys = Object.keys(prev);
              const freshKeys = Object.keys(fresh);
              if (prevKeys.length !== freshKeys.length) {
                return { ...fresh };
              }
              for (const k of freshKeys) {
                if (
                  !prev[k] ||
                  prev[k].avgActualMs !== fresh[k].avgActualMs ||
                  prev[k].mounts !== fresh[k].mounts ||
                  prev[k].updates !== fresh[k].updates
                ) {
                  return { ...fresh };
                }
              }
              return prev; // No change
            });
          }
        }
      }, 120);
    };

    // Initial load
    const initTimer = setTimeout(updateSummarySafely, 50);

    // Listen to decoupled dispatch event
    window.addEventListener("react-section-profile", updateSummarySafely);
    return () => {
      clearTimeout(initTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener("react-section-profile", updateSummarySafely);
    };
  }, []);

  const getSectionMetrics = (sectionId: string): SectionProfilingMetric | undefined => {
    return summary[`section-${sectionId}`] || summary[sectionId];
  };

  return { summary, getSectionMetrics };
}

/**
 * Subtle Micro-Heatmap Dot placed on the stepper item
 */
export interface StepperHeatmapDotProps {
  sectionId: string;
  isActive: boolean;
  tier: PerformanceTier | null;
  className?: string;
}

export const StepperHeatmapDot: React.FC<StepperHeatmapDotProps> = ({
  tier,
  isActive,
  className,
}) => {
  if (!tier) {
    return (
      <span
        className={cn(
          "w-1 h-1 rounded-full bg-slate-400/25 dark:bg-slate-600/30 transition-all duration-300",
          className
        )}
        title="Chưa kích hoạt render (Unprofiled)"
      />
    );
  }

  return (
    <span
      className={cn(
        "w-1.5 h-1.5 rounded-full transition-all duration-300",
        tier.bgClass,
        isActive ? "scale-110" : "opacity-85 group-hover/step:opacity-100",
        className
      )}
      style={{
        boxShadow: tier.glowShadow,
      }}
      title={`Render: ${tier.labelVi}`}
    />
  );
};

/**
 * Tooltip Heatmap Performance Badge displaying render execution metrics
 */
export interface StepperHeatmapBadgeProps {
  metric: SectionProfilingMetric | undefined;
  tier: PerformanceTier | null;
  lang?: "vi" | "en";
}

export const StepperHeatmapBadge: React.FC<StepperHeatmapBadgeProps> = ({
  metric,
  tier,
  lang = "vi",
}) => {
  if (!metric || !tier) {
    return (
      <span className="text-[9px] font-mono text-slate-400/60 dark:text-slate-500/60 px-1 select-none">
        ~unprofiled
      </span>
    );
  }

  const label = lang === "vi" ? tier.labelVi : tier.labelEn;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-md border backdrop-blur-md shadow-xs transition-colors",
        tier.textClass,
        tier.borderClass,
        tier.badgeBg
      )}
      title={`Số lần kết xuất: ${metric.mounts} mount, ${metric.updates} update • Tổng: ${metric.totalActualMs.toFixed(1)}ms`}
    >
      <span
        className={cn("w-1.5 h-1.5 rounded-full shrink-0 animate-pulse", tier.bgClass)}
        style={{ boxShadow: tier.glowShadow }}
      />
      <span className="font-bold tracking-tight">{metric.avgActualMs}ms</span>
      <span className="text-[9px] opacity-75 hidden sm:inline-block">({label})</span>
    </div>
  );
};
