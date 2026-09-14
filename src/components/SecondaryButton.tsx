import React from "react";
import { cn } from "../lib/utils";

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large";
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  icon,
  className,
  size = "medium",
  ...props
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return "h-[36px] px-3.5 text-xs rounded-[12px] gap-1.5";
      case "large":
        return "h-[48px] px-6 text-base rounded-[16px] gap-2.5";
      case "medium":
      default:
        return "h-[44px] px-5 text-sm rounded-[14px] gap-2";
    }
  };

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center font-play font-semibold text-slate-800 dark:text-slate-100 bg-white/70 dark:bg-white/10 hover:bg-white/90 dark:hover:bg-white/20 active:scale-95 border border-slate-200/80 dark:border-white/15 hover:dark:border-cyan-400/50 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xs hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:-translate-y-[1px] overflow-hidden group/sec select-none",
        getSizeStyles(),
        className
      )}
      {...props}
    >
      {/* Top reflection line */}
      <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent pointer-events-none" />
      {/* Shimmer sweep */}
      <span className="absolute inset-0 -translate-x-full group-hover/sec:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      {icon && <span className="shrink-0 relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default SecondaryButton;
