import React from "react";
import { cn } from "../lib/utils";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  variant?: "cyan" | "magenta" | "lime" | "indigo" | "amber";
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  icon,
  className,
  variant = "cyan",
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "magenta":
        return "bg-gradient-to-r from-pink-600/85 via-fuchsia-600/90 to-purple-600/85 border-pink-400/80 shadow-[0_0_20px_rgba(255,0,127,0.35)] hover:shadow-[0_0_30px_rgba(255,0,127,0.55)] text-white";
      case "lime":
        return "bg-gradient-to-r from-emerald-600/85 via-teal-600/90 to-green-600/85 border-emerald-400/80 shadow-[0_0_20px_rgba(0,255,136,0.35)] hover:shadow-[0_0_30px_rgba(0,255,136,0.55)] text-white";
      case "amber":
        return "bg-gradient-to-r from-amber-600/85 via-orange-600/90 to-amber-700/85 border-amber-400/80 shadow-[0_0_20px_rgba(255,184,0,0.35)] hover:shadow-[0_0_30px_rgba(255,184,0,0.55)] text-white";
      case "indigo":
        return "bg-gradient-to-r from-indigo-600/85 via-blue-600/90 to-purple-600/85 border-indigo-400/80 shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_30px_rgba(99,102,241,0.55)] text-white";
      case "cyan":
      default:
        return "bg-gradient-to-r from-cyan-600/85 via-sky-600/90 to-blue-600/85 border-cyan-400/80 shadow-[0_0_20px_rgba(0,245,255,0.35)] hover:shadow-[0_0_30px_rgba(0,245,255,0.55)] text-white";
    }
  };

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border backdrop-blur-md active:scale-95 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer overflow-hidden group/btn",
        getVariantStyles(),
        className
      )}
      {...props}
    >
      {/* Specular Top-edge reflection */}
      <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
      {/* Subtle Hover Shimmer Pass */}
      <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      {icon && <span className="shrink-0 relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default PrimaryButton;
