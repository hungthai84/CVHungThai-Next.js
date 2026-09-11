import React from "react";
import { GlassIconSvg } from "./GlassIcons";

export interface AppIconProps {
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number | string;
  glassContainer?: boolean;
  active?: boolean;
  className?: string;
  ariaLabel?: string;
  variant?: "default" | "neon" | "minimal" | "active" | "pill";
  onClick?: (e: React.MouseEvent) => void;
  title?: string;
}

export const AppIcon: React.FC<AppIconProps> = ({
  name,
  size = "md",
  glassContainer = false,
  active = false,
  className = "",
  ariaLabel,
  variant = "default",
  onClick,
  title
}) => {
  // Map size tokens to numeric pixel sizes for SVG & container
  let numericSize = 24;
  if (typeof size === "number") {
    numericSize = size;
  } else if (typeof size === "string") {
    switch (size) {
      case "xs":
        numericSize = 16;
        break;
      case "sm":
        numericSize = 20;
        break;
      case "md":
        numericSize = 24;
        break;
      case "lg":
        numericSize = 32;
        break;
      case "xl":
        numericSize = 40;
        break;
      default:
        numericSize = parseInt(size, 10) || 24;
    }
  }

  // Calculate container dimensions when glassContainer is true
  const containerPadding = Math.max(6, Math.round(numericSize * 0.35));
  const containerSize = numericSize + containerPadding * 2;

  const accessibleProps = {
    "aria-label": ariaLabel || title || `${name} icon`,
    role: onClick ? "button" : "img"
  };

  if (glassContainer) {
    return (
      <span
        onClick={onClick}
        title={title}
        {...accessibleProps}
        style={{
          width: `${containerSize}px`,
          height: `${containerSize}px`,
          borderRadius: "var(--icon-radius, 12px)"
        }}
        className={`glass-icon-container ${active || variant === "active" ? "active" : ""} ${onClick ? "cursor-pointer" : ""} ${className}`}
      >
        <GlassIconSvg name={name} size={numericSize} />
      </span>
    );
  }

  return (
    <span
      onClick={onClick}
      title={title}
      {...accessibleProps}
      className={`inline-flex items-center justify-center transition-transform duration-300 hover:scale-105 ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      <GlassIconSvg name={name} size={numericSize} />
    </span>
  );
};

export default AppIcon;
