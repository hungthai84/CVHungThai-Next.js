import React from "react";
import { cn } from "../lib/utils";

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  icon,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-slate-800 dark:text-slate-100 bg-white/70 dark:bg-slate-900/60 hover:bg-white/90 dark:hover:bg-slate-800/80 active:scale-95 border border-slate-200/80 dark:border-white/15 hover:dark:border-cyan-400/50 backdrop-blur-xl transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(0,245,255,0.2)] hover:-translate-y-0.5 overflow-hidden group/sec",
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
