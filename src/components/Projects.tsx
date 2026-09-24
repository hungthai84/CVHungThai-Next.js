import React, { useState, useRef, useMemo, Suspense, lazy } from "react";
import { 
  X, 
  FolderKanban,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Check,
  Search
} from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../i18n";
import { cn } from "../lib/utils";
import { playUiSound } from "../lib/sound";
import { PageCardHeader } from "./PageCardHeader";
import { PROJECTS_LIST, ProjectCard } from "../data/projectsData";

const projectCardRevealVariants: any = {
  hidden: { 
    opacity: 0, 
    y: 24,
  },
  visible: (index: number) => ({ 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      delay: (index % 4) * 0.06,
    }
  }),
};

import { ProjectArticle } from "./ProjectArticle";

/**
 * Keyframers 3D Tilt Card Component with Interactive Dynamic Specular Reflection
 * Inspired by Keyframers (bGdebPM) interactive card animation physics
 */
interface KeyframersTiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  style?: React.CSSProperties;
  key?: React.Key;
  tabIndex?: number;
  role?: string;
  "aria-label"?: string;
}

function KeyframersTiltCard({
  children,
  className,
  onClick,
  onKeyDown,
  style,
  tabIndex,
  role,
  "aria-label": ariaLabel,
}: KeyframersTiltCardProps) {
  return (
    <div
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={onKeyDown}
      style={style}
      className={cn("relative keyframers-tilt-card group/kfc", className)}
    >
      {children}
    </div>
  );
}

// 15 MÀU SẮC ĐẸP extracted from user image (Modern · Bright · Multi-color)
const PRESET_15_COLORS = [
  {
    hex: "#9B5DE5",
    name: "Soft Purple",
    border: "border-[#9B5DE5]/70 dark:border-[#9B5DE5]/60",
    cardBg: "bg-[#9B5DE5]/10 dark:bg-[#9B5DE5]/20",
    ring: "ring-[#9B5DE5]/40",
    title: "text-[#7b35c7] dark:text-[#c492ff] group-hover:text-[#6724b0] dark:group-hover:text-[#d3aaff]",
    bar: "bg-[#9B5DE5]",
    phaseBadge: "bg-[#9B5DE5] text-white border-white/30 shadow-[#9B5DE5]/40",
    tagBg: "bg-[#9B5DE5]/15 dark:bg-[#9B5DE5]/25 text-[#7b35c7] dark:text-[#d3a8ff] border-[#9B5DE5]/40",
    shadow: "shadow-[#9B5DE5]/15 hover:shadow-[#9B5DE5]/30",
    badgeBg: "bg-[#9B5DE5] text-white border-white/40 shadow-[#9B5DE5]/40",
    badgeText: "text-white"
  },
  {
    hex: "#F15BB5",
    name: "Hot Pink",
    border: "border-[#F15BB5]/70 dark:border-[#F15BB5]/60",
    cardBg: "bg-[#F15BB5]/10 dark:bg-[#F15BB5]/20",
    ring: "ring-[#F15BB5]/40",
    title: "text-[#c7278d] dark:text-[#ff80cf] group-hover:text-[#a81472] dark:group-hover:text-[#ffa6df]",
    bar: "bg-[#F15BB5]",
    phaseBadge: "bg-[#F15BB5] text-white border-white/30 shadow-[#F15BB5]/40",
    tagBg: "bg-[#F15BB5]/15 dark:bg-[#F15BB5]/25 text-[#b01377] dark:text-[#ffa3dd] border-[#F15BB5]/40",
    shadow: "shadow-[#F15BB5]/15 hover:shadow-[#F15BB5]/30",
    badgeBg: "bg-[#F15BB5] text-white border-white/40 shadow-[#F15BB5]/40",
    badgeText: "text-white"
  },
  {
    hex: "#FEE440",
    name: "Bright Yellow",
    border: "border-[#FEE440]/80 dark:border-[#FEE440]/60",
    cardBg: "bg-[#FEE440]/15 dark:bg-[#FEE440]/20",
    ring: "ring-[#FEE440]/40",
    title: "text-[#a38a00] dark:text-[#FEE440] group-hover:text-[#806c00] dark:group-hover:text-[#ffea66]",
    bar: "bg-[#FEE440]",
    phaseBadge: "bg-[#FEE440] text-slate-900 border-white/40 shadow-[#FEE440]/40",
    tagBg: "bg-[#FEE440]/20 dark:bg-[#FEE440]/25 text-[#857000] dark:text-[#ffe859] border-[#FEE440]/50",
    shadow: "shadow-[#FEE440]/15 hover:shadow-[#FEE440]/30",
    badgeBg: "bg-[#FEE440] text-slate-900 border-slate-900/20 shadow-[#FEE440]/40",
    badgeText: "text-slate-900"
  },
  {
    hex: "#00BBF9",
    name: "Electric Cyan",
    border: "border-[#00BBF9]/70 dark:border-[#00BBF9]/60",
    cardBg: "bg-[#00BBF9]/10 dark:bg-[#00BBF9]/20",
    ring: "ring-[#00BBF9]/40",
    title: "text-[#008dbd] dark:text-[#4dd5ff] group-hover:text-[#007097] dark:group-hover:text-[#80e0ff]",
    bar: "bg-[#00BBF9]",
    phaseBadge: "bg-[#00BBF9] text-white border-white/30 shadow-[#00BBF9]/40",
    tagBg: "bg-[#00BBF9]/15 dark:bg-[#00BBF9]/25 text-[#006f97] dark:text-[#7ce3ff] border-[#00BBF9]/40",
    shadow: "shadow-[#00BBF9]/15 hover:shadow-[#00BBF9]/30",
    badgeBg: "bg-[#00BBF9] text-white border-white/40 shadow-[#00BBF9]/40",
    badgeText: "text-white"
  },
  {
    hex: "#00F5D4",
    name: "Turquoise Mint",
    border: "border-[#00F5D4]/70 dark:border-[#00F5D4]/60",
    cardBg: "bg-[#00F5D4]/10 dark:bg-[#00F5D4]/20",
    ring: "ring-[#00F5D4]/40",
    title: "text-[#009e89] dark:text-[#52ffe8] group-hover:text-[#007a6a] dark:group-hover:text-[#85ffef]",
    bar: "bg-[#00F5D4]",
    phaseBadge: "bg-[#00F5D4] text-slate-900 border-white/40 shadow-[#00F5D4]/40",
    tagBg: "bg-[#00F5D4]/15 dark:bg-[#00F5D4]/25 text-[#007a6a] dark:text-[#76ffec] border-[#00F5D4]/40",
    shadow: "shadow-[#00F5D4]/15 hover:shadow-[#00F5D4]/30",
    badgeBg: "bg-[#00F5D4] text-slate-900 border-slate-900/20 shadow-[#00F5D4]/40",
    badgeText: "text-slate-900"
  },
  {
    hex: "#FF6F61",
    name: "Bright Coral",
    border: "border-[#FF6F61]/70 dark:border-[#FF6F61]/60",
    cardBg: "bg-[#FF6F61]/10 dark:bg-[#FF6F61]/20",
    ring: "ring-[#FF6F61]/40",
    title: "text-[#d94436] dark:text-[#ff948a] group-hover:text-[#b32e22] dark:group-hover:text-[#ffb1a8]",
    bar: "bg-[#FF6F61]",
    phaseBadge: "bg-[#FF6F61] text-white border-white/30 shadow-[#FF6F61]/40",
    tagBg: "bg-[#FF6F61]/15 dark:bg-[#FF6F61]/25 text-[#b8271a] dark:text-[#ffab9d] border-[#FF6F61]/40",
    shadow: "shadow-[#FF6F61]/15 hover:shadow-[#FF6F61]/30",
    badgeBg: "bg-[#FF6F61] text-white border-white/40 shadow-[#FF6F61]/40",
    badgeText: "text-white"
  },
  {
    hex: "#7B61FF",
    name: "Royal Violet",
    border: "border-[#7B61FF]/70 dark:border-[#7B61FF]/60",
    cardBg: "bg-[#7B61FF]/10 dark:bg-[#7B61FF]/20",
    ring: "ring-[#7B61FF]/40",
    title: "text-[#553ad9] dark:text-[#aa99ff] group-hover:text-[#3f25b5] dark:group-hover:text-[#c4b8ff]",
    bar: "bg-[#7B61FF]",
    phaseBadge: "bg-[#7B61FF] text-white border-white/30 shadow-[#7B61FF]/40",
    tagBg: "bg-[#7B61FF]/15 dark:bg-[#7B61FF]/25 text-[#4226b8] dark:text-[#b8a8ff] border-[#7B61FF]/40",
    shadow: "shadow-[#7B61FF]/15 hover:shadow-[#7B61FF]/30",
    badgeBg: "bg-[#7B61FF] text-white border-white/40 shadow-[#7B61FF]/40",
    badgeText: "text-white"
  },
  {
    hex: "#00C896",
    name: "Emerald Mint",
    border: "border-[#00C896]/70 dark:border-[#00C896]/60",
    cardBg: "bg-[#00C896]/10 dark:bg-[#00C896]/20",
    ring: "ring-[#00C896]/40",
    title: "text-[#008f6b] dark:text-[#45e6bd] group-hover:text-[#006e52] dark:group-hover:text-[#75f0cf]",
    bar: "bg-[#00C896]",
    phaseBadge: "bg-[#00C896] text-white border-white/30 shadow-[#00C896]/40",
    tagBg: "bg-[#00C896]/15 dark:bg-[#00C896]/25 text-[#006e52] dark:text-[#68ffd3] border-[#00C896]/40",
    shadow: "shadow-[#00C896]/15 hover:shadow-[#00C896]/30",
    badgeBg: "bg-[#00C896] text-white border-white/40 shadow-[#00C896]/40",
    badgeText: "text-white"
  },
  {
    hex: "#4FC3F7",
    name: "Cerulean Blue",
    border: "border-[#4FC3F7]/70 dark:border-[#4FC3F7]/60",
    cardBg: "bg-[#4FC3F7]/10 dark:bg-[#4FC3F7]/20",
    ring: "ring-[#4FC3F7]/40",
    title: "text-[#0277bd] dark:text-[#7bd7ff] group-hover:text-[#01579b] dark:group-hover:text-[#a0e3ff]",
    bar: "bg-[#4FC3F7]",
    phaseBadge: "bg-[#4FC3F7] text-slate-900 border-white/40 shadow-[#4FC3F7]/40",
    tagBg: "bg-[#4FC3F7]/15 dark:bg-[#4FC3F7]/25 text-[#01579b] dark:text-[#9ee5ff] border-[#4FC3F7]/40",
    shadow: "shadow-[#4FC3F7]/15 hover:shadow-[#4FC3F7]/30",
    badgeBg: "bg-[#4FC3F7] text-slate-900 border-slate-900/20 shadow-[#4FC3F7]/40",
    badgeText: "text-slate-900"
  },
  {
    hex: "#EC407A",
    name: "Crimson Rose",
    border: "border-[#EC407A]/70 dark:border-[#EC407A]/60",
    cardBg: "bg-[#EC407A]/10 dark:bg-[#EC407A]/20",
    ring: "ring-[#EC407A]/40",
    title: "text-[#c2185b] dark:text-[#ff77a4] group-hover:text-[#880e4f] dark:group-hover:text-[#ffa3c0]",
    bar: "bg-[#EC407A]",
    phaseBadge: "bg-[#EC407A] text-white border-white/30 shadow-[#EC407A]/40",
    tagBg: "bg-[#EC407A]/15 dark:bg-[#EC407A]/25 text-[#880e4f] dark:text-[#ff80ab] border-[#EC407A]/40",
    shadow: "shadow-[#EC407A]/15 hover:shadow-[#EC407A]/30",
    badgeBg: "bg-[#EC407A] text-white border-white/40 shadow-[#EC407A]/40",
    badgeText: "text-white"
  },
  {
    hex: "#FB8C00",
    name: "Amber Orange",
    border: "border-[#FB8C00]/70 dark:border-[#FB8C00]/60",
    cardBg: "bg-[#FB8C00]/10 dark:bg-[#FB8C00]/20",
    ring: "ring-[#FB8C00]/40",
    title: "text-[#d86000] dark:text-[#ffaa40] group-hover:text-[#a84700] dark:group-hover:text-[#ffc273]",
    bar: "bg-[#FB8C00]",
    phaseBadge: "bg-[#FB8C00] text-white border-white/30 shadow-[#FB8C00]/40",
    tagBg: "bg-[#FB8C00]/15 dark:bg-[#FB8C00]/25 text-[#e65100] dark:text-[#ffb74d] border-[#FB8C00]/40",
    shadow: "shadow-[#FB8C00]/15 hover:shadow-[#FB8C00]/30",
    badgeBg: "bg-[#FB8C00] text-white border-white/40 shadow-[#FB8C00]/40",
    badgeText: "text-white"
  },
  {
    hex: "#AED581",
    name: "Lime Leaf",
    border: "border-[#AED581]/80 dark:border-[#AED581]/60",
    cardBg: "bg-[#AED581]/15 dark:bg-[#AED581]/20",
    ring: "ring-[#AED581]/40",
    title: "text-[#558b2f] dark:text-[#c5e1a5] group-hover:text-[#33691e] dark:group-hover:text-[#dcedc8]",
    bar: "bg-[#AED581]",
    phaseBadge: "bg-[#AED581] text-slate-900 border-white/40 shadow-[#AED581]/40",
    tagBg: "bg-[#AED581]/20 dark:bg-[#AED581]/25 text-[#33691e] dark:text-[#d4e157] border-[#AED581]/50",
    shadow: "shadow-[#AED581]/15 hover:shadow-[#AED581]/30",
    badgeBg: "bg-[#AED581] text-slate-900 border-slate-900/20 shadow-[#AED581]/40",
    badgeText: "text-slate-900"
  },
  {
    hex: "#5C6BC0",
    name: "Indigo Blue",
    border: "border-[#5C6BC0]/70 dark:border-[#5C6BC0]/60",
    cardBg: "bg-[#5C6BC0]/10 dark:bg-[#5C6BC0]/20",
    ring: "ring-[#5C6BC0]/40",
    title: "text-[#3949ab] dark:text-[#8e99f3] group-hover:text-[#283593] dark:group-hover:text-[#b0b8f7]",
    bar: "bg-[#5C6BC0]",
    phaseBadge: "bg-[#5C6BC0] text-white border-white/30 shadow-[#5C6BC0]/40",
    tagBg: "bg-[#5C6BC0]/15 dark:bg-[#5C6BC0]/25 text-[#283593] dark:text-[#9fa8da] border-[#5C6BC0]/40",
    shadow: "shadow-[#5C6BC0]/15 hover:shadow-[#5C6BC0]/30",
    badgeBg: "bg-[#5C6BC0] text-white border-white/40 shadow-[#5C6BC0]/40",
    badgeText: "text-white"
  },
  {
    hex: "#BA68C8",
    name: "Orchid Lavender",
    border: "border-[#BA68C8]/70 dark:border-[#BA68C8]/60",
    cardBg: "bg-[#BA68C8]/10 dark:bg-[#BA68C8]/20",
    ring: "ring-[#BA68C8]/40",
    title: "text-[#9c27b0] dark:text-[#e1bee7] group-hover:text-[#6a1b9a] dark:group-hover:text-[#f3e5f5]",
    bar: "bg-[#BA68C8]",
    phaseBadge: "bg-[#BA68C8] text-white border-white/30 shadow-[#BA68C8]/40",
    tagBg: "bg-[#BA68C8]/15 dark:bg-[#BA68C8]/25 text-[#6a1b9a] dark:text-[#e1bee7] border-[#BA68C8]/40",
    shadow: "shadow-[#BA68C8]/15 hover:shadow-[#BA68C8]/30",
    badgeBg: "bg-[#BA68C8] text-white border-white/40 shadow-[#BA68C8]/40",
    badgeText: "text-white"
  },
  {
    hex: "#26A69A",
    name: "Teal Emerald",
    border: "border-[#26A69A]/70 dark:border-[#26A69A]/60",
    cardBg: "bg-[#26A69A]/10 dark:bg-[#26A69A]/20",
    ring: "ring-[#26A69A]/40",
    title: "text-[#00796b] dark:text-[#80cbc4] group-hover:text-[#004d40] dark:group-hover:text-[#b2dfdb]",
    bar: "bg-[#26A69A]",
    phaseBadge: "bg-[#26A69A] text-white border-white/30 shadow-[#26A69A]/40",
    tagBg: "bg-[#26A69A]/15 dark:bg-[#26A69A]/25 text-[#004d40] dark:text-[#80cbc4] border-[#26A69A]/40",
    shadow: "shadow-[#26A69A]/15 hover:shadow-[#26A69A]/30",
    badgeBg: "bg-[#26A69A] text-white border-white/40 shadow-[#26A69A]/40",
    badgeText: "text-white"
  }
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

  // Helper to retrieve color theme from 15 preset colors
  const getCardColorTheme = (card: ProjectCard, index?: number) => {
    const cardIndex = index ?? PROJECTS_LIST.findIndex((p) => p.id === card.id);
    const colorIndex = (cardIndex >= 0 ? cardIndex : 0) % PRESET_15_COLORS.length;
    return PRESET_15_COLORS[colorIndex];
  };

  const [selectedPhase, setSelectedPhase] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const phaseCounts = useMemo(() => {
    const map: Record<string, number> = { all: PROJECTS_LIST.length };
    PROJECTS_LIST.forEach((card) => {
      map[card.phase] = (map[card.phase] || 0) + 1;
    });
    return map;
  }, []);

  const PHASE_FILTERS = useMemo(() => [
    { id: "all", labelVi: "Tất cả dự án", labelEn: "All Projects", shortVi: "Tất cả", count: phaseCounts.all || 0 },
    { id: "Giai đoạn 1", labelVi: "GĐ 1 · Xây dựng & Vận hành CSKH", labelEn: "Phase 1 · Setup & Operations", shortVi: "Giai đoạn 1", count: phaseCounts["Giai đoạn 1"] || 0 },
    { id: "Giai đoạn 2", labelVi: "GĐ 2 · Chuẩn hóa & Tối ưu kênh", labelEn: "Phase 2 · Standardization", shortVi: "Giai đoạn 2", count: phaseCounts["Giai đoạn 2"] || 0 },
    { id: "Giai đoạn 3", labelVi: "GĐ 3 · Quản trị, Dữ liệu & AI", labelEn: "Phase 3 · Governance & AI", shortVi: "Giai đoạn 3", count: phaseCounts["Giai đoạn 3"] || 0 },
    { id: "Xuyên suốt", labelVi: "Xuyên suốt · Đào tạo & Văn hóa", labelEn: "Continuous · Training", shortVi: "Xuyên suốt", count: phaseCounts["Xuyên suốt"] || 0 },
  ], [phaseCounts]);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROJECTS_LIST.filter((card) => {
      if (selectedPhase !== "all" && card.phase !== selectedPhase) {
        return false;
      }
      if (!q) return true;
      const matchTitle = card.branchTitle.toLowerCase().includes(q);
      const matchDesc = card.description.toLowerCase().includes(q);
      const matchGroup = card.groupTitle.toLowerCase().includes(q);
      const matchTags = card.tags?.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchGroup || matchTags;
    });
  }, [selectedPhase, searchQuery]);

  const handleCardClick = (card: ProjectCard) => {
    playUiSound("click");
    setSelectedCardId(card.id);
    setActiveCard(card);
  };

  return (
    <section 
      id="projects" 
      className="relative w-full min-h-full flex flex-col justify-start items-center p-3 xs:p-3.5 sm:p-4.5 md:p-6 lg:p-8 font-sans text-slate-800 dark:text-slate-100 transition-all duration-300"
    >
      {/* Scoped CSS to format project card background exactly like Education cards */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .project-edu-glass-card,
        .project-card {
          height: auto !important;
          background: rgba(255, 255, 255, 0.78) !important;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12), inset 0 1.5px 2px rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(24px) saturate(140%) !important;
          -webkit-backdrop-filter: blur(24px) saturate(140%) !important;
          border: 1px solid rgba(255, 255, 255, 0.85) !important;
          border-radius: var(--theme-radius-card, var(--theme-radius, 10px)) !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .dark .project-edu-glass-card,
        .dark .project-card {
          height: auto !important;
          background: rgba(15, 23, 42, 0.82) !important;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1.5px 2px rgba(255, 255, 255, 0.2) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          border-radius: var(--theme-radius-card, var(--theme-radius, 10px)) !important;
        }
        `
      }} />

      {/* Main Container Dự án */}
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header Card Dự án (H5 + 2 chữ bên trái + Câu nói hay bên phải) */}
        <PageCardHeader pageId="projects">
          {/* Cụm trái: Số lượng dự án */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-5 bg-blue-600 dark:bg-blue-400 rounded-full shrink-0" />
            <span className="text-caption text-label font-semibold font-mono text-blue-700 dark:text-blue-400 bg-blue-500/15 px-2.5 py-0.5 rounded-full border border-blue-500/30 shadow-2xs">
              {isVi ? `Hiển thị ${filteredProjects.length} dự án` : `Showing ${filteredProjects.length} projects`}
            </span>
          </div>

          {/* Cụm phải: Ô tìm kiếm + Bộ lọc giai đoạn */}
          <div className="flex items-center gap-2 ml-auto flex-wrap">
            {/* Ô tìm kiếm nhanh */}
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 absolute left-2.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isVi ? "Tìm kiếm dự án..." : "Search projects..."}
                className="pl-8 pr-3 py-1 text-xs rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-800/80 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 w-36 sm:w-48 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Nút lọc danh mục */}
            <div className="flex bg-slate-100/90 dark:bg-slate-900/90 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs">
              {PHASE_FILTERS.map((tab) => {
                const isActive = selectedPhase === tab.id;
                const label = isVi ? tab.shortVi : tab.labelEn;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      setSelectedPhase(tab.id);
                    }}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-caption font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                      isActive
                        ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    <span>{label}</span>
                    <span className={cn("text-3xs font-mono px-1.5 py-0.2 rounded-full", isActive ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300" : "bg-slate-200/60 dark:bg-slate-800 text-slate-500")}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </PageCardHeader>

        {activeCard ? (
          <Suspense fallback={
            <div className="w-full py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
              <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-body-sm font-medium">{isVi ? "Đang tải bài viết dự án..." : "Loading project article..."}</p>
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
          <div className="w-full flex flex-col gap-4">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12 glass-surface rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-3 p-6 shadow-sm backdrop-blur-xl">
                <FolderKanban className="w-10 h-10 text-slate-500 dark:text-slate-400 mx-auto animate-bounce" />
                <h3 className="text-h6 text-slate-800 dark:text-slate-200">
                  {isVi ? "Không tìm thấy dự án phù hợp" : "No matching projects found"}
                </h3>
                <p className="text-body-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  {isVi ? "Thử điều chỉnh từ khóa tìm kiếm hoặc chọn lại giai đoạn dự án." : "Try adjusting your search query or selecting a different project phase."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPhase("all");
                  }}
                  className="px-4 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full border border-blue-200 dark:border-blue-800/60 transition-all cursor-pointer"
                >
                  {isVi ? "Xem tất cả giai đoạn" : "Show all phases"}
                </button>
              </div>
            ) : (
              <div 
                id="card-projects-list-content"
                className="w-full flex flex-col gap-4"
              >
                <div id="projects-grid-content" className="p-1 sm:p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-[15px] w-full items-start">
                  {filteredProjects.map((card, cardIndex) => {
                    const theme = getCardColorTheme(card, cardIndex);
                    const isSelected = selectedCardId === card.id;
                    const formattedIndex = String(cardIndex + 1).padStart(2, "0");
                    return (
                      <motion.div
                        key={card.id}
                        custom={cardIndex}
                        variants={projectCardRevealVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.12, margin: "0px 0px -30px 0px" }}
                        className="w-full min-w-0 flex flex-col h-auto"
                      >
                      <KeyframersTiltCard
                        role="button"
                        tabIndex={0}
                        aria-label={card.branchTitle}
                        onClick={() => handleCardClick(card)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleCardClick(card);
                          }
                        }}
                        style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 10px))" }}
                        className={cn(
                          "card-item project-card project-edu-glass-card overflow-hidden transition-all duration-300 cursor-pointer w-full min-w-0 flex flex-col h-auto relative border shadow-md hover:shadow-xl hover:scale-[1.02] hover:z-20",
                          theme.border,
                          theme.cardBg,
                          theme.shadow,
                          isSelected ? "ring-2 ring-blue-500 dark:ring-blue-400 scale-[1.01] shadow-xl" : ""
                        )}
                      >


                          {/* Media Area - Framed Inside Padded Container */}
                          <div className={cn("shrink-0", cardIndex === 10 ? "p-2.5" : "p-3 pb-0")}>
                            <div className={cn(
                              "project-card-media relative w-full aspect-[16/9] overflow-hidden rounded-[10px] border bg-slate-100 dark:bg-slate-950 group/img transition-all duration-300",
                              isSelected ? "border-blue-400/80 dark:border-blue-500/80 shadow-inner" : "border-slate-200/80 dark:border-slate-800/80"
                            )} style={{ height: "200px", borderRadius: "var(--theme-radius-inner, 8px)" }}>
                              <img
                                src={card.image}
                                alt={card.branchTitle}
                                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                                style={{ borderRadius: "var(--theme-radius-inner, 8px)" }}
                                loading="lazy"
                                decoding="async"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop";
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>

                              {/* Bento Grid Index Badge (Góc trên cùng bên trái) - Dạng hình tròn với 15 màu sắc ngẫu nhiên/chuẩn hóa */}
                              <div className={cn(
                                "absolute top-2.5 left-2.5 z-20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border shadow-lg transition-transform duration-300 group-hover/img:scale-110",
                                theme.badgeBg
                              )}>
                                <span className={cn("font-mono text-2xs font-black", theme.badgeText)}>
                                  {formattedIndex}
                                </span>
                              </div>

                            </div>
                          </div>

                          {/* Standardized Content Area with Color Bar Header & Description */}
                          <div className="project-card-content p-[25px] flex flex-col min-w-0 text-left gap-3">
                            {/* Standardized Subcard Header with Sleek Color Bar */}
                            <div className="w-full flex items-start gap-3 pb-2.5 border-b border-slate-200/50 dark:border-slate-800/50 z-10">
                              <div className={cn("w-2.5 h-8 sm:h-9 rounded-full shrink-0 shadow-xs transition-all duration-300 mt-0.5", theme.bar)} />
                              <div className="flex-1 min-w-0 text-left">
                                <h3 className={cn("text-h6 tracking-tight line-clamp-2 leading-snug font-bold", theme.title)}>
                                  {card.branchTitle}
                                </h3>
                              </div>
                            </div>

                            {/* Project Description Paragraph */}
                            <p className="text-body-sub text-subcontent text-slate-600 dark:text-slate-300 line-clamp-2 font-normal">
                              {card.description}
                            </p>

                            {/* Tags & Action Link Footer (Hidden per request) */}
                            <div className="space-y-2.5 pt-1 hidden">
                              {/* Tags Footer - Always on 1 single row */}
                              <div className="project-tags flex flex-nowrap items-center gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap">
                                {card.tags.slice(0, 3).map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className={cn(
                                      "text-3xs font-mono font-semibold px-2 py-0.5 rounded-md border h-fit flex items-center leading-normal shrink-0 transition-colors",
                                      theme.tagBg
                                    )}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Group Title Badge at bottom of card */}
                            <div className={cn(
                              "w-full mt-1.5 px-3 py-1.5 rounded-xl backdrop-blur-md border shadow-xs text-center",
                              theme.phaseBadge
                            )}>
                              <span className="font-bold text-caption text-white truncate block">
                                {card.groupTitle}
                              </span>
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

      {/* ================= FULLSCREEN IMAGE PREVIEW MODAL ================= */}
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