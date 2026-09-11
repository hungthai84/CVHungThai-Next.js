import React, { useState, useRef, useMemo, Suspense, lazy } from "react";
import { 
  X, 
  FolderKanban,
  Search,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Check
} from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../i18n";
import { cn } from "../lib/utils";
import { PROJECTS_LIST, ProjectCard } from "../data/projectsData";

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

const staggerCardVariants: any = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    scale: 0.96,
    filter: "blur(4px)"
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 22,
    }
  },
};

import { ProjectArticle } from "./ProjectArticle";

const PROJECT_PHASE_TABS = [
  { id: "all", nameVi: "Tất cả", nameEn: "All" },
  { id: "Giai đoạn 1", nameVi: "Giai đoạn 1", nameEn: "Phase 1" },
  { id: "Giai đoạn 2", nameVi: "Giai đoạn 2", nameEn: "Phase 2" },
  { id: "Giai đoạn 3", nameVi: "Giai đoạn 3", nameEn: "Phase 3" },
  { id: "Xuyên suốt", nameVi: "Xuyên suốt", nameEn: "Continuous" },
];

/**
 * Keyframers 3D Tilt Card Component with Interactive Dynamic Specular Reflection
 * Inspired by Keyframers (bGdebPM) interactive card animation physics
 */
interface KeyframersTiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  key?: React.Key;
}

function KeyframersTiltCard({
  children,
  className,
  onClick,
  style,
}: KeyframersTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -6.5;
    const tiltY = ((x - centerX) / centerX) * 6.5;

    card.style.setProperty("--keyframe-mx", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--keyframe-my", `${(y / rect.height) * 100}%`);
    card.style.setProperty("--keyframe-tilt-x", `${tiltX.toFixed(2)}deg`);
    card.style.setProperty("--keyframe-tilt-y", `${tiltY.toFixed(2)}deg`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--keyframe-tilt-x", `0deg`);
    card.style.setProperty("--keyframe-tilt-y", `0deg`);
    card.style.setProperty("--keyframe-mx", `50%`);
    card.style.setProperty("--keyframe-my", `50%`);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        transform: isHovered
          ? "perspective(1000px) rotateX(var(--keyframe-tilt-x, 0deg)) rotateY(var(--keyframe-tilt-y, 0deg)) translateZ(8px)"
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease",
      }}
      className={cn("relative keyframers-tilt-card group/kfc will-change-transform", className)}
    >
      {/* Glare and Specular Light Layer from Keyframers */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover/kfc:opacity-100 transition-opacity duration-300 z-30 overflow-hidden"
        style={{
          background:
            "radial-gradient(600px circle at var(--keyframe-mx, 50%) var(--keyframe-my, 50%), rgba(255, 255, 255, 0.25), transparent 45%)",
        }}
      />
      {children}
    </div>
  );
}

const BADGE_COLOR_PALETTES = [
  { bg: "bg-blue-600/90 dark:bg-blue-700/90 border-blue-300/40 text-white shadow-blue-500/30", text: "text-blue-100" },
  { bg: "bg-emerald-600/90 dark:bg-emerald-700/90 border-emerald-300/40 text-white shadow-emerald-500/30", text: "text-emerald-100" },
  { bg: "bg-purple-600/90 dark:bg-purple-700/90 border-purple-300/40 text-white shadow-purple-500/30", text: "text-purple-100" },
  { bg: "bg-amber-600/90 dark:bg-amber-700/90 border-amber-300/40 text-white shadow-amber-500/30", text: "text-amber-100" },
  { bg: "bg-rose-600/90 dark:bg-rose-700/90 border-rose-300/40 text-white shadow-rose-500/30", text: "text-rose-100" },
  { bg: "bg-cyan-600/90 dark:bg-cyan-700/90 border-cyan-300/40 text-white shadow-cyan-500/30", text: "text-cyan-100" },
  { bg: "bg-indigo-600/90 dark:bg-indigo-700/90 border-indigo-300/40 text-white shadow-indigo-500/30", text: "text-indigo-100" },
  { bg: "bg-orange-600/90 dark:bg-orange-700/90 border-orange-300/40 text-white shadow-orange-500/30", text: "text-orange-100" },
  { bg: "bg-teal-600/90 dark:bg-teal-700/90 border-teal-300/40 text-white shadow-teal-500/30", text: "text-teal-100" },
  { bg: "bg-pink-600/90 dark:bg-pink-700/90 border-pink-300/40 text-white shadow-pink-500/30", text: "text-pink-100" },
  { bg: "bg-violet-600/90 dark:bg-violet-700/90 border-violet-300/40 text-white shadow-violet-500/30", text: "text-violet-100" },
  { bg: "bg-lime-600/90 dark:bg-lime-700/90 border-lime-300/40 text-white shadow-lime-500/30", text: "text-lime-100" },
  { bg: "bg-fuchsia-600/90 dark:bg-fuchsia-700/90 border-fuchsia-300/40 text-white shadow-fuchsia-500/30", text: "text-fuchsia-100" },
  { bg: "bg-sky-600/90 dark:bg-sky-700/90 border-sky-300/40 text-white shadow-sky-500/30", text: "text-sky-100" },
  { bg: "bg-red-600/90 dark:bg-red-700/90 border-red-300/40 text-white shadow-red-500/30", text: "text-red-100" },
  { bg: "bg-green-600/90 dark:bg-green-700/90 border-green-300/40 text-white shadow-green-500/30", text: "text-green-100" },
  { bg: "bg-yellow-600/90 dark:bg-yellow-700/90 border-yellow-300/40 text-white shadow-yellow-100", text: "text-yellow-100" },
];

export default function Projects() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  const [activeCard, setActiveCard] = useState<ProjectCard | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(PROJECTS_LIST[0]?.id || null);
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string } | null>(null);

  const gridContainerRef = useRef<HTMLDivElement>(null);

  // Compute sequential index of each card within its phase for color gradation
  const cardPhaseIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    const counts = new Map<string, number>();
    PROJECTS_LIST.forEach((card) => {
      const current = counts.get(card.phase) || 0;
      map.set(card.id, current);
      counts.set(card.phase, current + 1);
    });
    return map;
  }, []);

  // Card color styles per phase with decreasing intensity (nhạt dần)
  const getCardColorTheme = (card: ProjectCard) => {
    const idx = cardPhaseIndexMap.get(card.id) ?? 0;
    
    // Giai đoạn 1: Sắc xanh dương (Blue -> Sky -> Cyan) nhạt dần
    if (card.phase === "Giai đoạn 1") {
      const shades = [
        {
          border: "border-blue-600/90 dark:border-blue-500/90",
          cardBg: "bg-blue-50/60 dark:bg-blue-950/35",
          ring: "ring-blue-500/20",
          title: "text-blue-700 dark:text-blue-300 group-hover:text-blue-800 dark:group-hover:text-blue-200",
          bar: "bg-blue-600",
          phaseBadge: "bg-blue-600 text-white border-blue-500 shadow-blue-500/30",
          tagBg: "bg-blue-100/90 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300/80 dark:border-blue-700/60",
          shadow: "shadow-blue-500/10 hover:shadow-blue-500/25",
        },
        {
          border: "border-blue-500/80 dark:border-blue-400/80",
          cardBg: "bg-blue-50/45 dark:bg-blue-950/25",
          ring: "ring-blue-400/20",
          title: "text-blue-600 dark:text-blue-300 group-hover:text-blue-700 dark:group-hover:text-blue-200",
          bar: "bg-blue-500",
          phaseBadge: "bg-blue-500 text-white border-blue-400 shadow-blue-500/20",
          tagBg: "bg-blue-50/90 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border-blue-200/80 dark:border-blue-800/60",
          shadow: "shadow-blue-400/10 hover:shadow-blue-400/20",
        },
        {
          border: "border-sky-500/75 dark:border-sky-400/75",
          cardBg: "bg-sky-50/40 dark:bg-sky-950/20",
          ring: "ring-sky-400/20",
          title: "text-sky-700 dark:text-sky-300 group-hover:text-sky-800 dark:group-hover:text-sky-200",
          bar: "bg-sky-500",
          phaseBadge: "bg-sky-500 text-white border-sky-400 shadow-sky-500/20",
          tagBg: "bg-sky-50/90 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border-sky-200/80 dark:border-sky-800/60",
          shadow: "shadow-sky-400/10 hover:shadow-sky-400/20",
        },
        {
          border: "border-sky-400/70 dark:border-sky-500/50",
          cardBg: "bg-sky-50/30 dark:bg-sky-950/15",
          ring: "ring-sky-300/15",
          title: "text-sky-600 dark:text-sky-300 group-hover:text-sky-700 dark:group-hover:text-sky-200",
          bar: "bg-sky-400",
          phaseBadge: "bg-sky-400 text-white border-sky-300 shadow-sky-400/20",
          tagBg: "bg-sky-50/70 dark:bg-sky-950/50 text-sky-600 dark:text-sky-300 border-sky-200/60 dark:border-sky-800/40",
          shadow: "shadow-sky-300/10 hover:shadow-sky-300/20",
        },
        {
          border: "border-cyan-400/60 dark:border-cyan-500/40",
          cardBg: "bg-cyan-50/25 dark:bg-cyan-950/10",
          ring: "ring-cyan-300/15",
          title: "text-cyan-700 dark:text-cyan-300 group-hover:text-cyan-800 dark:group-hover:text-cyan-200",
          bar: "bg-cyan-400",
          phaseBadge: "bg-cyan-500/90 text-white border-cyan-400 shadow-cyan-400/20",
          tagBg: "bg-cyan-50/60 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border-cyan-200/60 dark:border-cyan-800/40",
          shadow: "shadow-cyan-300/10 hover:shadow-cyan-300/20",
        },
        {
          border: "border-cyan-300/50 dark:border-cyan-600/30",
          cardBg: "bg-cyan-50/15 dark:bg-cyan-950/5",
          ring: "ring-cyan-200/10",
          title: "text-cyan-600 dark:text-cyan-300 group-hover:text-cyan-700 dark:group-hover:text-cyan-200",
          bar: "bg-cyan-300",
          phaseBadge: "bg-cyan-400 text-white border-cyan-300 shadow-cyan-300/15",
          tagBg: "bg-cyan-50/50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-300 border-cyan-100/50 dark:border-cyan-900/30",
          shadow: "shadow-cyan-200/10 hover:shadow-cyan-200/15",
        }
      ];
      return shades[Math.min(idx, shades.length - 1)];
    }

    // Giai đoạn 2: Sắc xanh lục / ngọc bích (Emerald -> Teal -> Mint) nhạt dần
    if (card.phase === "Giai đoạn 2") {
      const shades = [
        {
          border: "border-emerald-600/90 dark:border-emerald-500/90",
          cardBg: "bg-emerald-50/60 dark:bg-emerald-950/35",
          ring: "ring-emerald-500/20",
          title: "text-emerald-700 dark:text-emerald-300 group-hover:text-emerald-800 dark:group-hover:text-emerald-200",
          bar: "bg-emerald-600",
          phaseBadge: "bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/30",
          tagBg: "bg-emerald-100/90 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300/80 dark:border-emerald-700/60",
          shadow: "shadow-emerald-500/10 hover:shadow-emerald-500/25",
        },
        {
          border: "border-emerald-500/80 dark:border-emerald-400/80",
          cardBg: "bg-emerald-50/45 dark:bg-emerald-950/25",
          ring: "ring-emerald-400/20",
          title: "text-emerald-600 dark:text-emerald-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-200",
          bar: "bg-emerald-500",
          phaseBadge: "bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/20",
          tagBg: "bg-emerald-50/90 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60",
          shadow: "shadow-emerald-400/10 hover:shadow-emerald-400/20",
        },
        {
          border: "border-teal-500/75 dark:border-teal-400/75",
          cardBg: "bg-teal-50/40 dark:bg-teal-950/20",
          ring: "ring-teal-400/20",
          title: "text-teal-700 dark:text-teal-300 group-hover:text-teal-800 dark:group-hover:text-teal-200",
          bar: "bg-teal-500",
          phaseBadge: "bg-teal-500 text-white border-teal-400 shadow-teal-500/20",
          tagBg: "bg-teal-50/90 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300 border-teal-200/80 dark:border-teal-800/60",
          shadow: "shadow-teal-400/10 hover:shadow-teal-400/20",
        },
        {
          border: "border-teal-400/70 dark:border-teal-500/50",
          cardBg: "bg-teal-50/30 dark:bg-teal-950/15",
          ring: "ring-teal-300/15",
          title: "text-teal-600 dark:text-teal-300 group-hover:text-teal-700 dark:group-hover:text-teal-200",
          bar: "bg-teal-400",
          phaseBadge: "bg-teal-400 text-white border-teal-300 shadow-teal-400/20",
          tagBg: "bg-teal-50/70 dark:bg-teal-950/50 text-teal-600 dark:text-teal-300 border-teal-200/60 dark:border-teal-800/40",
          shadow: "shadow-teal-300/10 hover:shadow-teal-300/20",
        },
        {
          border: "border-green-400/60 dark:border-green-500/40",
          cardBg: "bg-green-50/25 dark:bg-green-950/10",
          ring: "ring-green-300/15",
          title: "text-green-700 dark:text-green-300 group-hover:text-green-800 dark:group-hover:text-green-200",
          bar: "bg-green-400",
          phaseBadge: "bg-green-500/90 text-white border-green-400 shadow-green-400/20",
          tagBg: "bg-green-50/60 dark:bg-green-950/40 text-green-700 dark:text-green-300 border-green-200/60 dark:border-green-800/40",
          shadow: "shadow-green-300/10 hover:shadow-green-300/20",
        },
        {
          border: "border-green-300/50 dark:border-green-600/30",
          cardBg: "bg-green-50/15 dark:bg-green-950/5",
          ring: "ring-green-200/10",
          title: "text-green-600 dark:text-green-300 group-hover:text-green-700 dark:group-hover:text-green-200",
          bar: "bg-green-300",
          phaseBadge: "bg-green-400 text-white border-green-300 shadow-green-300/15",
          tagBg: "bg-green-50/50 dark:bg-green-950/30 text-green-600 dark:text-green-300 border-green-100/50 dark:border-green-900/30",
          shadow: "shadow-green-200/10 hover:shadow-green-200/15",
        }
      ];
      return shades[Math.min(idx, shades.length - 1)];
    }

    // Giai đoạn 3: Sắc cam / hổ phách / vàng đồng (Amber -> Orange -> Warm Yellow) nhạt dần
    if (card.phase === "Giai đoạn 3") {
      const shades = [
        {
          border: "border-amber-600/90 dark:border-amber-500/90",
          cardBg: "bg-amber-50/60 dark:bg-amber-950/35",
          ring: "ring-amber-500/20",
          title: "text-amber-700 dark:text-amber-300 group-hover:text-amber-800 dark:group-hover:text-amber-200",
          bar: "bg-amber-600",
          phaseBadge: "bg-amber-600 text-white border-amber-500 shadow-amber-500/30",
          tagBg: "bg-amber-100/90 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300/80 dark:border-amber-700/60",
          shadow: "shadow-amber-500/10 hover:shadow-amber-500/25",
        },
        {
          border: "border-amber-500/80 dark:border-amber-400/80",
          cardBg: "bg-amber-50/45 dark:bg-amber-950/25",
          ring: "ring-amber-400/20",
          title: "text-amber-600 dark:text-amber-300 group-hover:text-amber-700 dark:group-hover:text-amber-200",
          bar: "bg-amber-500",
          phaseBadge: "bg-amber-500 text-white border-amber-400 shadow-amber-500/20",
          tagBg: "bg-amber-50/90 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/60",
          shadow: "shadow-amber-400/10 hover:shadow-amber-400/20",
        },
        {
          border: "border-orange-500/75 dark:border-orange-400/75",
          cardBg: "bg-orange-50/40 dark:bg-orange-950/20",
          ring: "ring-orange-400/20",
          title: "text-orange-700 dark:text-orange-300 group-hover:text-orange-800 dark:group-hover:text-orange-200",
          bar: "bg-orange-500",
          phaseBadge: "bg-orange-500 text-white border-orange-400 shadow-orange-500/20",
          tagBg: "bg-orange-50/90 dark:bg-orange-950/70 text-orange-700 dark:text-orange-300 border-orange-200/80 dark:border-orange-800/60",
          shadow: "shadow-orange-400/10 hover:shadow-orange-400/20",
        },
        {
          border: "border-orange-400/70 dark:border-orange-500/50",
          cardBg: "bg-orange-50/30 dark:bg-orange-950/15",
          ring: "ring-orange-300/15",
          title: "text-orange-600 dark:text-orange-300 group-hover:text-orange-700 dark:group-hover:text-orange-200",
          bar: "bg-orange-400",
          phaseBadge: "bg-orange-400 text-white border-orange-300 shadow-orange-400/20",
          tagBg: "bg-orange-50/70 dark:bg-orange-950/50 text-orange-600 dark:text-orange-300 border-orange-200/60 dark:border-orange-800/40",
          shadow: "shadow-orange-300/10 hover:shadow-orange-300/20",
        },
        {
          border: "border-yellow-400/60 dark:border-yellow-500/40",
          cardBg: "bg-yellow-50/25 dark:bg-yellow-950/10",
          ring: "ring-yellow-300/15",
          title: "text-yellow-700 dark:text-yellow-300 group-hover:text-yellow-800 dark:group-hover:text-yellow-200",
          bar: "bg-yellow-400",
          phaseBadge: "bg-yellow-500/90 text-white border-yellow-400 shadow-yellow-400/20",
          tagBg: "bg-yellow-50/60 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-300 border-yellow-200/60 dark:border-yellow-800/40",
          shadow: "shadow-yellow-300/10 hover:shadow-yellow-300/20",
        },
        {
          border: "border-yellow-300/50 dark:border-yellow-600/30",
          cardBg: "bg-yellow-50/15 dark:bg-yellow-950/5",
          ring: "ring-yellow-200/10",
          title: "text-yellow-600 dark:text-yellow-300 group-hover:text-yellow-700 dark:group-hover:text-yellow-200",
          bar: "bg-yellow-300",
          phaseBadge: "bg-yellow-400 text-white border-yellow-300 shadow-yellow-300/15",
          tagBg: "bg-yellow-50/50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-300 border-yellow-100/50 dark:border-yellow-900/30",
          shadow: "shadow-yellow-200/10 hover:shadow-yellow-200/15",
        }
      ];
      return shades[Math.min(idx, shades.length - 1)];
    }

    // Xuyên suốt: Sắc tím / hoa cà / tím khói (Purple -> Violet -> Fuchsia) nhạt dần
    const shades = [
      {
        border: "border-purple-600/90 dark:border-purple-500/90",
        cardBg: "bg-purple-50/60 dark:bg-purple-950/35",
        ring: "ring-purple-500/20",
        title: "text-purple-700 dark:text-purple-300 group-hover:text-purple-800 dark:group-hover:text-purple-200",
        bar: "bg-purple-600",
        phaseBadge: "bg-purple-600 text-white border-purple-500 shadow-purple-500/30",
        tagBg: "bg-purple-100/90 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-300/80 dark:border-purple-700/60",
        shadow: "shadow-purple-500/10 hover:shadow-purple-500/25",
      },
      {
        border: "border-purple-500/80 dark:border-purple-400/80",
        cardBg: "bg-purple-50/45 dark:bg-purple-950/25",
        ring: "ring-purple-400/20",
        title: "text-purple-600 dark:text-purple-300 group-hover:text-purple-700 dark:group-hover:text-purple-200",
        bar: "bg-purple-500",
        phaseBadge: "bg-purple-500 text-white border-purple-400 shadow-purple-500/20",
        tagBg: "bg-purple-50/90 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border-purple-200/80 dark:border-purple-800/60",
        shadow: "shadow-purple-400/10 hover:shadow-purple-400/20",
      },
      {
        border: "border-violet-500/75 dark:border-violet-400/75",
        cardBg: "bg-violet-50/40 dark:bg-violet-950/20",
        ring: "ring-violet-400/20",
        title: "text-violet-700 dark:text-violet-300 group-hover:text-violet-800 dark:group-hover:text-violet-200",
        bar: "bg-violet-500",
        phaseBadge: "bg-violet-500 text-white border-violet-400 shadow-violet-500/20",
        tagBg: "bg-violet-50/90 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300 border-violet-200/80 dark:border-violet-800/60",
        shadow: "shadow-violet-400/10 hover:shadow-violet-400/20",
      },
      {
        border: "border-violet-400/70 dark:border-violet-500/50",
        cardBg: "bg-violet-50/30 dark:bg-violet-950/15",
        ring: "ring-violet-300/15",
        title: "text-violet-600 dark:text-violet-300 group-hover:text-violet-700 dark:group-hover:text-violet-200",
        bar: "bg-violet-400",
        phaseBadge: "bg-violet-400 text-white border-violet-300 shadow-violet-400/20",
        tagBg: "bg-violet-50/70 dark:bg-violet-950/50 text-violet-600 dark:text-violet-300 border-violet-200/60 dark:border-violet-800/40",
        shadow: "shadow-violet-300/10 hover:shadow-violet-300/20",
      },
      {
        border: "border-fuchsia-400/60 dark:border-fuchsia-500/40",
        cardBg: "bg-fuchsia-50/25 dark:bg-fuchsia-950/10",
        ring: "ring-fuchsia-300/15",
        title: "text-fuchsia-700 dark:text-fuchsia-300 group-hover:text-fuchsia-800 dark:group-hover:text-fuchsia-200",
        bar: "bg-fuchsia-400",
        phaseBadge: "bg-fuchsia-500/90 text-white border-fuchsia-400 shadow-fuchsia-400/20",
        tagBg: "bg-fuchsia-50/60 dark:bg-fuchsia-950/40 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-200/60 dark:border-fuchsia-800/40",
        shadow: "shadow-fuchsia-300/10 hover:shadow-fuchsia-300/20",
      },
      {
        border: "border-fuchsia-300/50 dark:border-fuchsia-600/30",
        cardBg: "bg-fuchsia-50/15 dark:bg-fuchsia-950/5",
        ring: "ring-fuchsia-200/10",
        title: "text-fuchsia-600 dark:text-fuchsia-300 group-hover:text-fuchsia-700 dark:group-hover:text-fuchsia-200",
        bar: "bg-fuchsia-300",
        phaseBadge: "bg-fuchsia-400 text-white border-fuchsia-300 shadow-fuchsia-300/15",
        tagBg: "bg-fuchsia-50/50 dark:bg-fuchsia-950/30 text-fuchsia-600 dark:text-fuchsia-300 border-fuchsia-100/50 dark:border-fuchsia-900/30",
        shadow: "shadow-fuchsia-200/10 hover:shadow-fuchsia-200/15",
      }
    ];
    return shades[Math.min(idx, shades.length - 1)];
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [activePhase, setActivePhase] = useState("all");

  const filteredProjects = useMemo(() => {
    return PROJECTS_LIST.filter((card) => {
      // Lọc theo giai đoạn (Phase filter)
      if (activePhase !== "all" && card.phase !== activePhase) {
        return false;
      }
      // Lọc theo từ khóa tìm kiếm (Search filter)
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        card.branchTitle.toLowerCase().includes(q) ||
        card.description.toLowerCase().includes(q) ||
        card.role.toLowerCase().includes(q) ||
        card.groupTitle.toLowerCase().includes(q) ||
        card.tags.some((t) => t.toLowerCase().includes(q)) ||
        (card.caseStudy?.solutionSummary && card.caseStudy.solutionSummary.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, activePhase]);

  const handleCardClick = (card: ProjectCard) => {
    setSelectedCardId(card.id);
    setActiveCard(card);
  };

  return (
    <section 
      id="projects" 
      className="relative w-full min-h-full flex flex-col justify-start items-center p-2 sm:p-4 lg:p-6 font-sans text-slate-800 dark:text-slate-100 transition-all duration-300"
    >
      {/* Scoped CSS to format project card background exactly like Education cards */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .project-edu-glass-card {
          background: rgba(255, 255, 255, 0.78) !important;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12), inset 0 1.5px 2px rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(24px) saturate(140%) !important;
          -webkit-backdrop-filter: blur(24px) saturate(140%) !important;
          border: 1px solid rgba(255, 255, 255, 0.85) !important;
          border-radius: 1.5rem !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .dark .project-edu-glass-card {
          background: rgba(15, 23, 42, 0.82) !important;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1.5px 2px rgba(255, 255, 255, 0.2) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
        }
        `
      }} />

      {/* Main Container Dự án */}
      <div className="w-full flex flex-col gap-[15px]">

      {/* Nội dung hiển thị Dự án */}
      <div 
        id="info-card-projects" 
        style={{ padding: '10px' }}
        className="w-full max-h-full overflow-y-auto"
      >
        {activeCard ? (
          <Suspense fallback={
            <div className="w-full py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
              <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-medium">{isVi ? "Đang tải bài viết dự án..." : "Loading project article..."}</p>
            </div>
          }>
            <ProjectArticle
              project={activeCard}
              onBack={() => {
                setActiveCard(null);
              }}
              onSelectProject={(newProj) => {
                setActiveCard(newProj);
              }}
            />
          </Suspense>
        ) : (
          <div className="w-full flex flex-col gap-[15px]">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12 glass-surface rounded-3xl border border-slate-200/90 dark:border-slate-800 space-y-3 p-6 shadow-sm backdrop-blur-xl">
                <FolderKanban className="w-10 h-10 text-slate-500 dark:text-slate-400 mx-auto animate-bounce" />
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  {isVi ? "Không tìm thấy dự án phù hợp" : "No matching projects found"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  {isVi ? "Thử điều chỉnh từ khóa tìm kiếm hoặc chọn lại giai đoạn dự án." : "Try adjusting your search query or selecting a different project phase."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActivePhase("all");
                  }}
                  className="px-4 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full border border-blue-200 dark:border-blue-800/60 transition-all cursor-pointer"
                >
                  {isVi ? "Đặt lại bộ lọc" : "Reset filters"}
                </button>
              </div>
            ) : (
              <div 
                id="card-projects-list-content"
                className="w-full flex flex-col gap-[15px]"
              >
                {/* Tiêu đề thẻ cho Thẻ chứa Danh sách Dự án */}
                <div className="w-full flex flex-col gap-[8px] pb-3 border-b border-slate-200/60 dark:border-slate-800/60">
                  {/* Dòng chính: Icon tiêu đề thẻ & Tiêu đề H2 cùng màu icon */}
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                        <FolderKanban className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
                      </div>
                      <h2 className="text-lg sm:text-xl font-black tracking-tight text-blue-600 dark:text-blue-400">
                        {isVi ? "Danh mục dự án" : "Strategic project portfolio solutions"}
                      </h2>
                    </div>
                  </div>

                  {/* Dòng 3 : Đường line Gạch màu như màu icon */}
                  <div className="h-[2px] w-full bg-blue-500/30 dark:bg-blue-500/20" />

                  {/* Dòng 4 : Tìm kiếm & Bộ lọc (Tabs) */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-5 bg-blue-600 rounded-full shrink-0" />
                      <span className="text-xs font-mono font-black text-blue-700 dark:text-blue-400 bg-blue-500/15 px-2.5 py-0.5 rounded-full border border-blue-500/30 shadow-2xs">
                        {isVi ? `Hiển thị: ${filteredProjects.length} dự án` : `Showing: ${filteredProjects.length} projects`}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 sm:ml-auto">
                      {/* Search input with glow container effect */}
                      <div className="relative flex items-center w-full sm:w-[220px]">
                        <Search className="absolute left-3 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder={isVi ? "Tìm dự án..." : "Search projects..."}
                          className="w-full text-xs pl-8.5 pr-3 py-1.5 rounded-full bg-slate-100/75 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-800 dark:text-slate-100 outline-hidden focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 p-0.5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full text-slate-400 hover:text-slate-600 transition cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {/* Filter Tabs matching Domains layout */}
                      <div className="flex flex-nowrap sm:flex-wrap gap-1 bg-slate-100/50 dark:bg-white/5 p-1 rounded-full border border-slate-200/50 dark:border-white/5 shadow-2xs max-w-full overflow-x-auto scrollbar-none">
                        {PROJECT_PHASE_TABS.map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActivePhase(tab.id)}
                            className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-300 cursor-pointer shrink-0 ${
                              activePhase === tab.id
                                ? "bg-blue-600 text-white shadow-xs scale-102"
                                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-white/5"
                            }`}
                          >
                            {isVi ? tab.nameVi : tab.nameEn}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div id="projects-grid-content" style={{ padding: '25px' }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 w-full">
                  {filteredProjects.map((card, cardIndex) => {
                    const theme = getCardColorTheme(card);
                    const isSelected = selectedCardId === card.id;
                    const formattedIndex = String(cardIndex + 1).padStart(2, "0");
                    const badgeVariant = BADGE_COLOR_PALETTES[cardIndex % BADGE_COLOR_PALETTES.length];
                    return (
                      <motion.div
                        key={card.id}
                        variants={staggerCardVariants}
                        className="w-full min-w-0 flex flex-col h-full"
                      >
                      <KeyframersTiltCard
                        onClick={() => handleCardClick(card)}
                        className={cn(
                          "card-item project-card project-edu-glass-card rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer w-full min-w-0 flex flex-col h-full relative",
                          isSelected 
                            ? "ring-4 ring-blue-500/60 dark:ring-blue-400/60 shadow-2xl scale-[1.015] border-blue-500 dark:border-blue-400 bg-white/95 dark:bg-slate-900/95 z-20"
                            : cn("hover:shadow-2xl hover:border-blue-400/80 dark:hover:border-blue-500/80", theme.border, theme.ring)
                        )}
                      >


                          {/* Media Area - Framed Inside Padded Container */}
                          <div className={cn("shrink-0", cardIndex === 10 ? "p-[10px]" : "p-3 pb-0")}>
                            <div className={cn(
                              "project-card-media relative w-full aspect-[16/9] overflow-hidden rounded-[10px] border bg-slate-100 dark:bg-slate-950 group/img transition-all duration-300",
                              isSelected ? "border-blue-400/80 dark:border-blue-500/80 shadow-inner" : "border-slate-200/80 dark:border-slate-800/80"
                            )}>
                              <img
                                src={card.image}
                                alt={card.branchTitle}
                                className="w-full h-full object-cover rounded-[10px] group-hover/img:scale-105 transition-transform duration-500"
                                loading="lazy"
                                decoding="async"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>

                              {/* Bento Grid Index Badge (Góc trên cùng bên trái) - Dạng hình tròn với màu sắc đa dạng */}
                              <div className={cn(
                                "absolute top-2.5 left-2.5 z-20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border shadow-lg transition-transform duration-300 group-hover/img:scale-110",
                                isSelected ? "bg-blue-600 text-white border-white/40 shadow-blue-500/40 scale-105" : badgeVariant.bg
                              )}>
                                <span className={cn("font-mono text-[11px] font-black", isSelected ? "text-white" : badgeVariant.text)}>
                                  {formattedIndex}
                                </span>
                              </div>

                              {/* Group Title Badge (Góc trên cùng bên phải) */}
                              <div className="absolute top-2.5 right-2.5 z-20 max-w-[68%] px-2.5 py-1 rounded-full bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/60 shadow-md">
                                <span className="font-bold text-[10px] text-slate-800 dark:text-slate-200 truncate block">
                                  {card.groupTitle}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Standardized Content Area with Color Bar Header & Description */}
                          <div className="project-card-content p-4 sm:p-5 flex-1 flex flex-col justify-between min-w-0 text-left gap-3">
                            {/* Standardized Subcard Header with Sleek Color Bar */}
                            <div className="w-full flex items-start gap-3 pb-2.5 border-b border-slate-200/50 dark:border-slate-800/50 z-10">
                              <div className={cn("w-2.5 h-8 sm:h-9 rounded-full shrink-0 shadow-xs transition-all duration-300 mt-0.5", isSelected ? "bg-blue-600 shadow-md shadow-blue-500/40" : theme.bar)} />
                              <div className="flex-1 min-w-0 text-left">
                                <h3 className={cn("text-xs sm:text-sm font-extrabold tracking-tight line-clamp-2 leading-snug min-h-[2.25rem] sm:min-h-[2.5rem]", isSelected ? "text-blue-700 dark:text-blue-300 font-black" : theme.title)}>
                                  {card.branchTitle}
                                </h3>
                              </div>
                            </div>

                            {/* Project Description Paragraph */}
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 font-medium">
                              {card.description}
                            </p>

                            {/* Tags & Action Link Footer */}
                            <div className="space-y-2.5 mt-auto pt-1">
                              {/* Tags Footer - Always on 1 single row */}
                              <div className="project-tags flex flex-nowrap items-center gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap">
                                {card.tags.slice(0, 3).map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className={cn(
                                      "text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md border h-fit flex items-center leading-normal shrink-0 transition-colors",
                                      isSelected 
                                        ? "bg-blue-100/90 dark:bg-blue-950/80 text-blue-800 dark:text-blue-200 border-blue-300/80 dark:border-blue-700/60 font-bold"
                                        : theme.tagBg
                                    )}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>

                              {/* Interactive Action Row */}
                              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-bold">
                                {isSelected && (
                                  <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
                                    Active
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </KeyframersTiltCard>
                        </motion.div>
                      );
                    })}
                </div>
                </div>
            )}
          </div>
        )}
      </div>

      {/* ================= FULLSCREEN IMAGE PREVIEW MODAL ================= */}
      {previewImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 bg-slate-100 dark:bg-slate-950 flex items-center justify-between border-b border-slate-200 dark:border-white/10 px-4">
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate max-w-[80vw]">
                {previewImage.title}
              </span>
              <button
                onClick={() => setPreviewImage(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 sm:p-4 overflow-auto flex items-center justify-center">
              <img
                src={previewImage.src}
                alt={previewImage.title}
                decoding="async"
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
      </div>
    </section>
  );
}
