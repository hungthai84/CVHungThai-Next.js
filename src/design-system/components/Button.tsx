import React from "react";
import { cn } from "../../lib/utils";

export type ButtonVariant = 
  | "primary" 
  | "secondary" 
  | "ghost" 
  | "outline" 
  | "icon" 
  | "pill";

export type ButtonSize = "small" | "medium" | "large";
export type ButtonAccent = "blue" | "purple" | "pink" | "orange" | "emerald" | "cyan" | "indigo" | "amber";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  accent?: ButtonAccent;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
}

const SIZE_STYLES: Record<ButtonSize, string> = {
  small: "h-[36px] px-3.5 text-xs rounded-[12px] gap-1.5",
  medium: "h-[44px] px-4 sm:px-5 text-sm rounded-[14px] gap-2",
  large: "h-[48px] px-5 sm:px-6 text-base rounded-[16px] gap-2.5",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  accent = "blue",
  icon,
  iconRight,
  loading = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-[0_4px_16px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.35)] border border-blue-400/30";
      
      case "secondary":
        return "bg-white/70 dark:bg-white/10 text-slate-800 dark:text-slate-100 font-semibold border border-slate-200/80 dark:border-white/15 hover:bg-white/90 dark:hover:bg-white/20 shadow-xs";

      case "ghost":
        return "bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/10 font-medium";

      case "outline":
        return "bg-transparent border border-slate-300 dark:border-white/20 text-slate-800 dark:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-white/10 font-semibold";

      case "icon":
        return "p-0 aspect-square flex items-center justify-center bg-white/60 dark:bg-white/10 border border-slate-200/80 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:bg-white/90 dark:hover:bg-white/20";

      case "pill":
        return "rounded-full bg-slate-100/90 dark:bg-white/10 border border-slate-200/80 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-white/20 font-semibold";
    }
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "relative inline-flex items-center justify-center font-play transition-all duration-200 select-none cursor-pointer outline-none whitespace-nowrap",
        "hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98]",
        "disabled:opacity-50 disabled:pointer-events-none disabled:transform-none",
        SIZE_STYLES[size],
        getVariantStyles(),
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      {children && <span>{children}</span>}
      {!loading && iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
};

export default Button;
