import React from "react";
import { cn } from "../lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  textStrength?: number;
  glowColor?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  onClick,
  strength,
  textStrength,
  glowColor,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default MagneticButton;
