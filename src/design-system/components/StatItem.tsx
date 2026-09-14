import React from "react";
import { cn } from "../../lib/utils";

export interface StatItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  accentColor?: string;
}

export const StatItem: React.FC<StatItemProps> = ({
  value,
  label,
  sublabel,
  icon,
  accentColor = "text-blue-600 dark:text-cyan-400",
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-end p-3.5 sm:p-4 rounded-[16px] bg-white/50 dark:bg-white/[0.04] border border-white/60 dark:border-white/10 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 w-full mb-1">
        {icon && <span className="shrink-0 text-slate-500 dark:text-slate-400">{icon}</span>}
        <span
          className={cn(
            "text-stat font-bold tracking-tight font-play leading-none",
            accentColor
          )}
        >
          {value}
        </span>
      </div>
      <div className="text-body-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5 leading-snug">
        {label}
      </div>
      {sublabel && (
        <div className="text-caption font-normal text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
          {sublabel}
        </div>
      )}
    </div>
  );
};

export default StatItem;
