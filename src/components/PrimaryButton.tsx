import React from "react";
import { cn } from "../lib/utils";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large";
  variant?: "cyan" | "magenta" | "lime" | "indigo" | "amber" | "blue";
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  icon,
  className,
  size = "medium",
  variant = "cyan",
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "magenta":
        return "bg-gradient-to-r from-pink-600/90 via-fuchsia-600/95 to-purple-600/90 border-pink-400/80 shadow-[0_4px_16px_rgba(236,0,140,0.3)] hover:shadow-[0_6px_24px_rgba(236,0,140,0.45)] text-white";
      case "lime":
        return "bg-gradient-to-r from-emerald-600/90 via-teal-600/95 to-green-600/90 border-emerald-400/80 shadow-[0_4px_16px_rgba(0,200,83,0.3)] hover:shadow-[0_6px_24px_rgba(0,200,83,0.45)] text-white";
      case "amber":
        return "bg-gradient-to-r from-amber-600/90 via-orange-600/95 to-amber-700/90 border-amber-400/80 shadow-[0_4px_16px_rgba(255,179,0,0.3)] hover:shadow-[0_6px_24px_rgba(255,179,0,0.45)] text-white";
      case "indigo":
        return "bg-gradient-to-r from-indigo-600/90 via-blue-600/95 to-purple-600/90 border-indigo-400/80 shadow-[0_4px_16px_rgba(48,79,254,0.3)] hover:shadow-[0_6px_24px_rgba(48,79,254,0.45)] text-white";
      case "blue":
        return "bg-gradient-to-r from-blue-600/90 via-indigo-600/95 to-blue-700/90 border-blue-400/80 shadow-[0_4px_16px_rgba(0,102,255,0.3)] hover:shadow-[0_6px_24px_rgba(0,102,255,0.45)] text-white";
      case "cyan":
      default:
        return "bg-gradient-to-r from-cyan-600/90 via-sky-600/95 to-blue-600/90 border-cyan-400/80 shadow-[0_4px_16px_rgba(0,180,219,0.3)] hover:shadow-[0_6px_24px_rgba(0,180,219,0.45)] text-white";
    }
  };

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
        "relative inline-flex items-center justify-center font-play font-semibold border backdrop-blur-md active:scale-95 transition-all duration-200 hover:-translate-y-[1px] cursor-pointer overflow-hidden group/btn select-none",
        getSizeStyles(),
        getVariantStyles(),
        className
      )}
      {...props}
    >
      {/* Specular Top-edge reflection */}
      <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
      {/* Subtle Hover Shimmer Pass */}
      <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      {icon && <span className="shrink-0 relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default PrimaryButton;
