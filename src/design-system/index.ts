/**
 * GLOBAL UI DESIGN SYSTEM
 * Central Export for Website CV Portfolio Nguyễn Hùng Thái
 * 
 * Một website – Một Design System – Một ngôn ngữ thị giác – Một hệ thống spacing – Một typography system – Một component system.
 */

export * from "./tokens";
export * from "./components/Heading";
export * from "./components/BentoCard";
export * from "./components/Button";
export * from "./components/Badge";
export * from "./components/StatItem";

import { cn } from "../lib/utils";
import { DESIGN_TOKENS } from "./tokens";

/**
 * Standard Global Container Classes per Rule 10:
 * Desktop max-width: 1200px / Large Desktop: 1280px (max-w-7xl)
 * Tablet: padding 24px (px-6)
 * Mobile: padding 16px (px-4)
 */
export function getContainerClasses(extraClass?: string): string {
  return cn(
    "w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6",
    extraClass
  );
}

/**
 * Standard Bento Grid Classes per Rule 11:
 * Desktop: 4 columns
 * Tablet: 2 columns
 * Mobile: 1 column
 * Card gap: 16-24px
 */
export function getBentoGridClasses(extraClass?: string): string {
  return cn(
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full",
    extraClass
  );
}

/**
 * Standard Glass Surface Style per Rules 06 & 07:
 * Light: background #F7F9FC, glass card rgba(255,255,255,0.65), blur 16px, border rgba(255,255,255,0.65), shadow 0 8px 30px rgba(0,0,0,0.06)
 * Dark: background #0B1020, glass card rgba(255,255,255,0.06), blur 16-24px, border rgba(255,255,255,0.12), shadow 0 8px 30px rgba(0,0,0,0.35)
 */
export function getModernGlassClasses(extraClass?: string): string {
  return cn(
    "bg-white/65 dark:bg-white/[0.06] backdrop-blur-[16px] dark:backdrop-blur-[20px] border border-white/65 dark:border-white/12 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] rounded-[10px] text-slate-900 dark:text-white transition-all duration-200",
    extraClass
  );
}
