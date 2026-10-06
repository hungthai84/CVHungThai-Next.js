import React from "react";
import { cn } from "../lib/utils";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large";
  variant?: "blue" | "teal" | "warm" | "cyan" | "magenta" | "lime" | "indigo" | "amber";
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  icon,
  className,
  size = "medium",
  variant = "blue",
  ...props
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return "h-[36px] px-3.5 text-xs rounded-[6px] gap-1.5";
      case "large":
        return "h-[48px] px-6 text-base rounded-[6px] gap-2.5";
      case "medium":
      default:
        return "h-[42px] px-5 text-[15px] rounded-[6px] gap-2";
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "teal":
        return "bg-gradient-to-b from-[#38b2ac] to-[#2c7a7b] shadow-[0_2px_4px_rgba(56,178,172,0.35)] hover:shadow-[0_6px_16px_rgba(56,178,172,0.35)] text-white";
      case "warm":
        return "bg-gradient-to-b from-[#ed8936] to-[#c05621] shadow-[0_2px_4px_rgba(237,137,54,0.35)] hover:shadow-[0_6px_16px_rgba(237,137,54,0.35)] text-white";
      case "blue":
      default:
        return "bg-gradient-to-b from-[#3182ce] to-[#2b6cb0] shadow-[0_2px_4px_rgba(49,130,206,0.35)] hover:shadow-[0_6px_16px_rgba(49,130,206,0.35)] text-white";
    }
  };

  return (
    <button
      className={cn(
        "btn inline-flex items-center justify-center font-['Open_Sans',sans-serif] font-semibold text-[15px] leading-tight text-white border-0 rounded-[6px] cursor-pointer transition-all duration-200 ease-out hover:-translate-y-[1px] active:translate-y-0 active:shadow-none focus-visible:outline-2 focus-visible:outline-[#3182ce] focus-visible:outline-offset-2 select-none",
        getSizeStyles(),
        getVariantStyles(),
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0 relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default PrimaryButton;
