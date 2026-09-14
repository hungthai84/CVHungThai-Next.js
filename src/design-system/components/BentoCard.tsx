import React from "react";
import { cn } from "../../lib/utils";

export type BentoCardSize = "small" | "medium" | "large" | "hero";
export type BentoCardVariant = "default" | "featured" | "subtle" | "interactive";
export type BentoCardAccent = 
  | "blue" 
  | "purple" 
  | "pink" 
  | "orange" 
  | "emerald" 
  | "cyan" 
  | "indigo" 
  | "amber" 
  | "violet" 
  | "mint";

export interface BentoCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  size?: BentoCardSize;
  variant?: BentoCardVariant;
  accent?: BentoCardAccent;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  number?: string | number;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  hoverEffect?: boolean;
}

const ACCENT_STYLES: Record<BentoCardAccent, {
  borderLight: string;
  borderDark: string;
  iconBg: string;
  glowHover: string;
  textColor: string;
}> = {
  blue: {
    borderLight: "border-blue-500/25",
    borderDark: "dark:border-blue-400/35",
    iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    glowHover: "hover:shadow-[0_12px_36px_rgba(0,102,255,0.12)] dark:hover:shadow-[0_12px_36px_rgba(0,198,255,0.2)]",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  purple: {
    borderLight: "border-purple-500/25",
    borderDark: "dark:border-purple-400/35",
    iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    glowHover: "hover:shadow-[0_12px_36px_rgba(91,33,255,0.12)] dark:hover:shadow-[0_12px_36px_rgba(176,0,255,0.2)]",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  pink: {
    borderLight: "border-pink-500/25",
    borderDark: "dark:border-pink-400/35",
    iconBg: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
    glowHover: "hover:shadow-[0_12px_36px_rgba(236,0,140,0.12)] dark:hover:shadow-[0_12px_36px_rgba(255,20,147,0.2)]",
    textColor: "text-pink-600 dark:text-pink-400",
  },
  orange: {
    borderLight: "border-orange-500/25",
    borderDark: "dark:border-orange-400/35",
    iconBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    glowHover: "hover:shadow-[0_12px_36px_rgba(255,138,0,0.12)] dark:hover:shadow-[0_12px_36px_rgba(255,82,82,0.2)]",
    textColor: "text-orange-600 dark:text-orange-400",
  },
  emerald: {
    borderLight: "border-emerald-500/25",
    borderDark: "dark:border-emerald-400/35",
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    glowHover: "hover:shadow-[0_12px_36px_rgba(0,200,83,0.12)] dark:hover:shadow-[0_12px_36px_rgba(0,255,135,0.2)]",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  cyan: {
    borderLight: "border-cyan-500/25",
    borderDark: "dark:border-cyan-400/35",
    iconBg: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    glowHover: "hover:shadow-[0_12px_36px_rgba(0,180,219,0.12)] dark:hover:shadow-[0_12px_36px_rgba(0,242,254,0.2)]",
    textColor: "text-cyan-600 dark:text-cyan-400",
  },
  indigo: {
    borderLight: "border-indigo-500/25",
    borderDark: "dark:border-indigo-400/35",
    iconBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    glowHover: "hover:shadow-[0_12px_36px_rgba(48,79,254,0.12)] dark:hover:shadow-[0_12px_36px_rgba(124,77,255,0.2)]",
    textColor: "text-indigo-600 dark:text-indigo-400",
  },
  amber: {
    borderLight: "border-amber-500/25",
    borderDark: "dark:border-amber-400/35",
    iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    glowHover: "hover:shadow-[0_12px_36px_rgba(255,179,0,0.12)] dark:hover:shadow-[0_12px_36px_rgba(255,214,0,0.2)]",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  violet: {
    borderLight: "border-violet-500/25",
    borderDark: "dark:border-violet-400/35",
    iconBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    glowHover: "hover:shadow-[0_12px_36px_rgba(123,47,247,0.12)] dark:hover:shadow-[0_12px_36px_rgba(224,64,251,0.2)]",
    textColor: "text-violet-600 dark:text-violet-400",
  },
  mint: {
    borderLight: "border-teal-500/25",
    borderDark: "dark:border-teal-400/35",
    iconBg: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
    glowHover: "hover:shadow-[0_12px_36px_rgba(0,153,247,0.12)] dark:hover:shadow-[0_12px_36px_rgba(0,217,165,0.2)]",
    textColor: "text-teal-600 dark:text-teal-400",
  },
};

const SIZE_PADDING: Record<BentoCardSize, string> = {
  small: "p-3.5 sm:p-4",       // 14-16px
  medium: "p-4 sm:p-5",        // 16-20px
  large: "p-5 sm:p-6",         // 20-24px
  hero: "p-6 sm:p-8",          // 24-32px
};

export const BentoCard: React.FC<BentoCardProps> = ({
  size = "medium",
  variant = "default",
  accent = "blue",
  icon,
  title,
  subtitle,
  description,
  number,
  badge,
  action,
  hoverEffect = true,
  children,
  className,
  ...props
}) => {
  const accentCfg = ACCENT_STYLES[accent];

  return (
    <div
      className={cn(
        // Modern Glass & Bento Surface
        "relative rounded-[10px] bg-white/65 dark:bg-white/[0.06] backdrop-blur-[16px] dark:backdrop-blur-[20px]",
        "border border-white/65 dark:border-white/12",
        "shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]",
        "text-slate-900 dark:text-white transition-all duration-250 flex flex-col justify-between overflow-hidden",
        SIZE_PADDING[size],
        accentCfg.borderLight,
        accentCfg.borderDark,
        hoverEffect && [
          "hover:-translate-y-1",
          accentCfg.glowHover,
          "hover:border-slate-300/80 dark:hover:border-white/25",
        ],
        className
      )}
      {...props}
    >
      {/* CARD HEADER (ICON + TITLE + NUMBER TAG per Rule 14 & 15) */}
      {(icon || title || subtitle || number !== undefined || badge) && (
        <div className="w-full flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {icon && (
              <div
                className={cn(
                  "shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-[12px] flex items-center justify-center font-bold",
                  accentCfg.iconBg
                )}
              >
                {icon}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                {title && (
                  <h3 className="text-card-title font-bold leading-tight text-slate-900 dark:text-white truncate">
                    {title}
                  </h3>
                )}
                {badge && <div>{badge}</div>}
              </div>
              {subtitle && (
                <p className="text-body-sm font-medium text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Number indicator aligned right per Rule 15 */}
          {number !== undefined && (
            <span
              className={cn(
                "shrink-0 font-bold text-xs tracking-wider px-2 py-0.5 rounded-full bg-slate-100/80 dark:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/10",
                accentCfg.textColor
              )}
            >
              {typeof number === "number" && number < 10 ? `0${number}` : number}
            </span>
          )}
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="text-body font-normal text-slate-700 dark:text-slate-300/90 leading-relaxed mb-3">
          {description}
        </div>
      )}

      {/* Main Children */}
      {children && <div className="flex-1 w-full">{children}</div>}

      {/* Action footer */}
      {action && (
        <div className="mt-3 pt-3 border-t border-slate-200/50 dark:border-white/10 flex items-center justify-between">
          {action}
        </div>
      )}
    </div>
  );
};

export default BentoCard;
