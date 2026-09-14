import React from "react";
import { cn } from "../../lib/utils";

export type BadgeVariant = 
  | "default" 
  | "primary" 
  | "success" 
  | "warning" 
  | "info" 
  | "accent";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  size = "sm",
  icon,
  children,
  className,
  ...props
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30";
      case "success":
        return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
      case "warning":
        return "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30";
      case "info":
        return "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30";
      case "accent":
        return "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30";
      case "default":
      default:
        return "bg-slate-100/90 dark:bg-white/10 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/15";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold border backdrop-blur-md select-none whitespace-nowrap",
        size === "sm" ? "px-2.5 py-0.5 text-caption leading-tight" : "px-3 py-1 text-label leading-normal",
        getVariantStyle(),
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
