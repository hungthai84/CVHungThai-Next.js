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
        return "h-[36px] px-3.5 text-xs rounded-[6px] gap-1.5";
      case "large":
        return "h-[48px] px-6 text-base rounded-[6px] gap-2.5";
      case "medium":
      default:
        return "h-[42px] px-5 text-[15px] rounded-[6px] gap-2";
    }
  };

  return (
    <button
      className={cn(
        "btn--secondary inline-flex items-center justify-center font-['Open_Sans',sans-serif] font-semibold text-[15px] leading-tight text-[#2b6cb0] bg-[#ffffff] border border-[#cbd5e0] rounded-[6px] shadow-[0_2px_4px_rgba(45,55,72,0.12)] hover:shadow-[0_6px_16px_rgba(45,55,72,0.16)] hover:-translate-y-[1px] active:translate-y-0 active:shadow-none focus-visible:outline-2 focus-visible:outline-[#3182ce] focus-visible:outline-offset-2 transition-all duration-200 ease-out cursor-pointer select-none",
        getSizeStyles(),
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0 relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default SecondaryButton;
