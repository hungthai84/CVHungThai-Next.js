import React from "react";
import {
  Smartphone,
  Globe,
  ShieldCheck,
  Gamepad2,
  Wallet,
  Layers,
  LucideIcon,
} from "lucide-react";
import { cn } from "../lib/utils";

interface ServiceCardBackgroundProps {
  title: string;
  className?: string;
  isExpanded?: boolean;
}

interface DomainThemeConfig {
  gradientClass: string;
  topGlow: string;
  bottomGlow: string;
  icon: LucideIcon;
  wave1: { from: string; to: string };
  wave2: { from: string; to: string };
}

const DOMAIN_THEMES: Record<string, DomainThemeConfig> = {
  "Viễn thông di động": {
    gradientClass: "from-[#8b5cf6] via-[#a855f7] to-[#3b82f6]",
    topGlow: "bg-white/20",
    bottomGlow: "bg-[#c084fc]/30",
    icon: Smartphone,
    wave1: { from: "#ffffff", to: "#ffffff" },
    wave2: { from: "#ffffff", to: "#ffffff" },
  },
  "Thương mại điện tử": {
    gradientClass: "from-[#ea580c] via-[#f97316] to-[#f43f5e]",
    topGlow: "bg-white/20",
    bottomGlow: "bg-[#fed7aa]/30",
    icon: Globe,
    wave1: { from: "#ffffff", to: "#ffffff" },
    wave2: { from: "#ffffff", to: "#ffffff" },
  },
  "Bảo hiểm nhân thọ": {
    gradientClass: "from-[#0284c7] via-[#06b6d4] to-[#2563eb]",
    topGlow: "bg-white/20",
    bottomGlow: "bg-[#bae6fd]/30",
    icon: ShieldCheck,
    wave1: { from: "#ffffff", to: "#ffffff" },
    wave2: { from: "#ffffff", to: "#ffffff" },
  },
  "Thể thao điện tử": {
    gradientClass: "from-[#059669] via-[#10b981] to-[#00f2fe]",
    topGlow: "bg-white/20",
    bottomGlow: "bg-[#a7f3d0]/30",
    icon: Gamepad2,
    wave1: { from: "#ffffff", to: "#ffffff" },
    wave2: { from: "#ffffff", to: "#ffffff" },
  },
  "Ví điện tử": {
    gradientClass: "from-[#d97706] via-[#f59e0b] to-[#fbbf24]",
    topGlow: "bg-white/20",
    bottomGlow: "bg-[#fde68a]/30",
    icon: Wallet,
    wave1: { from: "#ffffff", to: "#ffffff" },
    wave2: { from: "#ffffff", to: "#ffffff" },
  },
  "Xây dựng hệ thống": {
    gradientClass: "from-[#e11d48] via-[#ec4899] to-[#8b5cf6]",
    topGlow: "bg-white/20",
    bottomGlow: "bg-[#fbcfe8]/30",
    icon: Layers,
    wave1: { from: "#ffffff", to: "#ffffff" },
    wave2: { from: "#ffffff", to: "#ffffff" },
  },
};

export const ServiceCardBackground: React.FC<ServiceCardBackgroundProps> = ({
  title,
  className,
}) => {
  const config = DOMAIN_THEMES[title] || DOMAIN_THEMES["Xây dựng hệ thống"];
  const OriginalIcon = config.icon;

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit] transition-all duration-500 select-none",
        className
      )}
      aria-hidden="true"
    >
      {/* 1. Fluid Multi-Color Gradient Background */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-90 dark:opacity-85 transition-opacity duration-300",
          config.gradientClass
        )}
      />

      {/* 2. Ambient Lighting Highlights */}
      <div
        className={cn(
          "absolute -top-10 -right-10 w-48 h-48 rounded-full blur-2xl pointer-events-none",
          config.topGlow
        )}
      />
      <div
        className={cn(
          "absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-xl pointer-events-none",
          config.bottomGlow
        )}
      />

      {/* 3. Thẻ dịch vụ hình nền của thẻ thay bằng Icon Gốc (Original Lucide Icon Watermark Motif) */}
      <div className="absolute -bottom-5 -right-5 w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center pointer-events-none transition-all duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:translate-x-1">
        {/* Soft radial aura glow */}
        <div className="absolute inset-2 rounded-full bg-white/15 blur-xl pointer-events-none transition-opacity duration-500 group-hover:opacity-100" />
        {/* Circular glass ring outline */}
        <div className="absolute inset-4 rounded-full border border-white/25 dark:border-white/20 pointer-events-none transition-transform duration-700 group-hover:scale-105" />
        {/* Original Icon */}
        <OriginalIcon className="w-28 h-28 sm:w-32 sm:h-32 text-white/25 dark:text-white/30 stroke-[1.25] drop-shadow-[0_10px_25px_rgba(0,0,0,0.22)] transition-colors duration-500 group-hover:text-white/35" />
      </div>
    </div>
  );
};

export default ServiceCardBackground;
