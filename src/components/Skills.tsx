import React, { useState, useEffect, lazy, Suspense } from "react";
import { useLanguage } from "../i18n";
import { motion, AnimatePresence } from "motion/react";
import { 
  Printer, 
  Brain,
  Target, 
  TrendingUp, 
  Zap, 
  ChevronsUpDown, 
  Gem, 
  Rocket, 
  Bot, 
  HeartHandshake, 
  BarChart3, 
  Monitor, 
  ShieldAlert, 
  Cpu, 
  Users, 
  BadgeDollarSign, 
  Award, 
  Globe,
  Database,
  Workflow,
  UserCheck,
  ShieldCheck,
  FolderKanban,
  MessageSquare,
  Languages,
  Sparkles,
  CheckCircle2,
  Maximize2,
  Minimize2
} from "lucide-react";

// Lazy load heavy expanded card modal views for fast code splitting
const ExpandedCardStrengths = lazy(() => import("./SkillCardExpandedViews").then(m => ({ default: m.ExpandedCardStrengths })));
const ExpandedCardOpportunities = lazy(() => import("./SkillCardExpandedViews").then(m => ({ default: m.ExpandedCardOpportunities })));
const ExpandedCardWeaknesses = lazy(() => import("./SkillCardExpandedViews").then(m => ({ default: m.ExpandedCardWeaknesses })));
const ExpandedCardThreats = lazy(() => import("./SkillCardExpandedViews").then(m => ({ default: m.ExpandedCardThreats })));
const ExpandedCardLanguages = lazy(() => import("./SkillCardExpandedViews").then(m => ({ default: m.ExpandedCardLanguages })));
import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/utils";
import { playUiSound } from "../lib/sound";
import { PageCardHeader } from "./PageCardHeader";

type CardKey = "swot-s" | "swot-o" | "swot-w" | "swot-t";
export type SkillCardKey = "swot-s" | "swot-o" | "swot-w" | "swot-t" | "languages";

export function Skills() {
  const { theme, setTheme } = useTheme();
  const { language, lang } = useLanguage();
  const isVi = (language || lang) === "vi";

  // Category filter state for skills page
  const [selectedCategory, setSelectedCategory] = useState<"all" | "swot" | "languages">("all");

  // Full 5-card expansion mode: clicking a card expands it to 5-card size, temporarily hiding the other cards
  const [expandedSkillCardKey, setExpandedSkillCardKey] = useState<SkillCardKey | null>(null);

  // Manage individual card collapse states (true = collapsed, false = expanded)
  const [collapsedCards, setCollapsedCards] = useState<Record<CardKey, boolean>>({
    "swot-s": false,
    "swot-o": false,
    "swot-w": false,
    "swot-t": false,
  });

  // Keyboard shortcut: Escape to collapse expanded card
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expandedSkillCardKey) {
        setExpandedSkillCardKey(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedSkillCardKey]);

  const handleExpandCard = (cardKey: SkillCardKey) => {
    playUiSound("click");
    if (expandedSkillCardKey === cardKey) {
      setExpandedSkillCardKey(null);
    } else {
      setExpandedSkillCardKey(cardKey);
    }
  };

  const toggleSingleCard = (cardKey: CardKey) => {
    setCollapsedCards((prev) => ({
      ...prev,
      [cardKey]: !prev[cardKey],
    }));
  };

  const areAllCollapsed = Object.values(collapsedCards).every(Boolean);

  const toggleAllCards = () => {
    const nextState = !areAllCollapsed;
    setCollapsedCards({
      "swot-s": nextState,
      "swot-o": nextState,
      "swot-w": nextState,
      "swot-t": nextState,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleNavigateToContact = (topic?: string) => {
    playUiSound("click");
    if (topic) {
      sessionStorage.setItem("contact_selected_skill_topic", topic);
    }
    window.dispatchEvent(new CustomEvent("app-navigate", { detail: "contact" }));
  };

  return (
    <section
      id="skills"
      className="relative w-full min-h-full flex flex-col justify-start items-center p-2 sm:p-4 lg:p-6 font-sans text-slate-800 dark:text-slate-100 transition-all duration-300"
    >
      {/* Main Container Kỹ năng */}
      <div className="w-full flex flex-col gap-4">
        {/* Component Specific Style Injector for Pixel-Exact Glassmorphism & Animations */}
      <style>{`
        /* Hiệu ứng Kính Mờ (Glassmorphism) chuẩn đồng bộ với Education */
        .skills-glass-panel {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.08);
        }

        .dark .skills-glass-panel {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(0, 240, 255, 0.35);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 240, 255, 0.18), inset 0 1.5px 2px rgba(255, 255, 255, 0.18);
        }

        /* Thẻ Phủ Màu Chuyên Biệt Cho 4 Nhánh SWOT */
        .skills-glass-swot-blue {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 10px 30px -5px rgba(37, 99, 235, 0.08);
        }
        .dark .skills-glass-swot-blue {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(0, 240, 255, 0.35);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 240, 255, 0.18), inset 0 1.5px 2px rgba(255, 255, 255, 0.18);
        }

        .skills-glass-swot-purple {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 10px 30px -5px rgba(124, 58, 237, 0.08);
        }
        .dark .skills-glass-swot-purple {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(0, 240, 255, 0.35);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 240, 255, 0.18), inset 0 1.5px 2px rgba(255, 255, 255, 0.18);
        }

        .skills-glass-swot-amber {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 10px 30px -5px rgba(217, 119, 6, 0.08);
        }
        .dark .skills-glass-swot-amber {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(0, 240, 255, 0.35);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 240, 255, 0.18), inset 0 1.5px 2px rgba(255, 255, 255, 0.18);
        }

        .skills-glass-swot-rose {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 10px 30px -5px rgba(225, 29, 72, 0.08);
        }
        .dark .skills-glass-swot-rose {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(0, 240, 255, 0.35);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 240, 255, 0.18), inset 0 1.5px 2px rgba(255, 255, 255, 0.18);
        }

        /* Thẻ con bên trong */
        .skills-glass-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .dark .skills-glass-card {
          background: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.08);
        }

        /* Nền trong suốt 100% theo yêu cầu */
        #swot-languages-overview {
          background: transparent !important;
          background-color: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border: none !important;
          box-shadow: none !important;
        }

        #swot-s li.p-2,
        #swot-w li.p-2 {
          background: transparent !important;
          background-color: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }

        #swot-s li.p-2 span {
          font-size: 16px !important;
        }

        .skills-hover-lift {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
        }
        .skills-hover-lift:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.1);
        }
        .dark .skills-hover-lift:hover {
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.5);
        }

        /* Hoạt họa Thu Gọn / Mở Rộng Chuyên Nghiệp */
        .skills-swot-collapse-grid {
          display: grid;
          grid-template-rows: 1fr;
          transition: grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease;
          opacity: 1;
        }

        .skills-swot-collapse-grid.is-collapsed {
          grid-template-rows: 0fr;
          opacity: 0;
          pointer-events: none;
        }

        .skills-swot-collapse-inner {
          overflow: hidden;
          min-height: 0;
        }

        /* Tối ưu hóa khi In / Xuất PDF */
        @media print {
          .skills-glass-panel, .skills-glass-card, [class*="skills-glass-swot-"] { 
            background: #fff !important; 
            border: 1px solid #ddd !important; 
            box-shadow: none !important; 
          }
          #printBtn, #themeToggle, #toggleAllSwot, .swot-toggle-btn { 
            display: none !important; 
          }
          .skills-swot-collapse-grid { 
            grid-template-rows: 1fr !important; 
            opacity: 1 !important; 
          }
        }
      `}</style>

      {/* Tiêu đề thẻ cho thẻ chính kỹ năng (H5 + 2 chữ bên trái + Câu nói hay bên phải) */}
      <PageCardHeader pageId="skills">
        {/* Cụm trái: Chỉ báo chuyên đề (Caption / Label: 12px – 13px) */}
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-5 bg-purple-600 dark:bg-purple-400 rounded-full shrink-0" />
          <span className="text-caption font-semibold font-mono text-purple-700 dark:text-purple-300 bg-purple-500/15 px-2.5 py-0.5 rounded-full border border-purple-500/30 shadow-2xs">
            {isVi ? "4 Khối SWOT & 3 Ngôn ngữ" : "4 SWOT Quadrants & 3 Languages"}
          </span>
        </div>

        {/* Nút thu gọn tất cả nằm dưới đường line bên phải */}
        <div className="flex items-center gap-2 ml-auto">
          {!expandedSkillCardKey && (
            <button
              type="button"
              onClick={() => {
                playUiSound("toggle");
                toggleAllCards();
              }}
              className="px-3 py-1 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-800/80 text-caption font-bold text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 active:scale-95 shrink-0"
            >
              <ChevronsUpDown className="w-3.5 h-3.5 text-purple-500" />
              <span>
                {areAllCollapsed
                  ? (isVi ? "Mở rộng tất cả" : "Expand all")
                  : (isVi ? "Thu gọn tất cả" : "Collapse all")}
              </span>
            </button>
          )}

          {expandedSkillCardKey && (
            <button
              type="button"
              onClick={() => {
                playUiSound("click");
                setExpandedSkillCardKey(null);
              }}
              className="px-3 py-1 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-caption font-black transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 active:scale-95 shrink-0"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>{isVi ? "Thu nhỏ về 5 thẻ (ESC)" : "Restore 5 cards (ESC)"}</span>
            </button>
          )}
        </div>
      </PageCardHeader>

      {/* SWOT Sub-Section */}
      {(selectedCategory === "all" || selectedCategory === "swot") && (!expandedSkillCardKey || expandedSkillCardKey !== "languages") && (
        <div className="w-full py-2.5 space-y-4 font-['Play',sans-serif]">
          <Suspense fallback={<div className="w-full h-64 rounded-2xl bg-slate-200/50 dark:bg-slate-800/50 animate-pulse flex items-center justify-center text-xs opacity-60">Đang tải chi tiết...</div>}>
            {expandedSkillCardKey === "swot-s" ? (
              <ExpandedCardStrengths
                isVi={isVi}
                onClose={() => setExpandedSkillCardKey(null)}
                onContact={() => handleNavigateToContact("Điểm Mạnh")}
              />
            ) : expandedSkillCardKey === "swot-o" ? (
              <ExpandedCardOpportunities
                isVi={isVi}
                onClose={() => setExpandedSkillCardKey(null)}
                onContact={() => handleNavigateToContact("Cơ hội phát triển")}
              />
            ) : expandedSkillCardKey === "swot-w" ? (
              <ExpandedCardWeaknesses
                isVi={isVi}
                onClose={() => setExpandedSkillCardKey(null)}
                onContact={() => handleNavigateToContact("Hoàn Thiện")}
              />
            ) : expandedSkillCardKey === "swot-t" ? (
              <ExpandedCardThreats
                isVi={isVi}
                onClose={() => setExpandedSkillCardKey(null)}
                onContact={() => handleNavigateToContact("Thách Thức")}
              />
            ) : (
              /* 4 Khối SWOT Ghép Thành Vòng Tròn Tâm - Fluid Responsive Grid */
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4.5 md:gap-5 lg:gap-6 auto-rows-fr items-stretch w-full">

        {/* 1. ĐIỂM MẠNH (S - Strengths) */}
        <section
          id="swot-s"
          onClick={() => handleExpandCard("swot-s")}
          className={`skills-glass-swot-blue rounded-2xl p-3 xs:p-3.5 sm:p-4.5 md:p-5 lg:p-6 flex flex-col justify-between skills-hover-lift relative overflow-hidden group cursor-pointer transition-all duration-300 w-full ${
            collapsedCards["swot-s"] ? "h-auto min-h-[90px]" : "h-full min-h-0"
          }`}
        >
          {/* Góc Phần Tư S */}
          <div
            className="absolute bottom-0 right-0 w-12 h-12 sm:w-14 sm:h-14 rounded-tl-full rounded-br-2xl bg-gradient-to-br from-blue-500/30 via-blue-500/50 to-blue-600/70 dark:from-blue-500/35 dark:via-blue-500/50 dark:to-blue-600/70 border-t-2 border-l-2 border-blue-400/70 dark:border-blue-400/70 backdrop-blur-md flex items-center justify-center pl-2 pt-2 text-blue-900 dark:text-blue-100 font-extrabold text-sm sm:text-base shadow-sm select-none z-10 transition-transform duration-300 group-hover:scale-105"
            title="S - Điểm Mạnh"
          >
            <span>S</span>
          </div>

          <div className="h-full flex flex-col justify-between">
            {/* Header Thẻ S */}
            <div className="flex items-center justify-between pb-3 border-b border-blue-200/70 dark:border-blue-800/70 mb-3 w-full select-none">
              <div className="flex items-center gap-2.5">
                <Gem className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 transform transition-transform group-hover:scale-110 duration-300" />
                <h6 className="text-h6 text-blue-600 dark:text-blue-400 tracking-wide">
                  {isVi ? "Điểm Mạnh" : "Strengths"}
                </h6>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExpandCard("swot-s");
                  }}
                  className="p-1 rounded-full bg-blue-100/80 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/80 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer shadow-2xs"
                  title={isVi ? "Mở rộng kích thước 5 thẻ (các thẻ khác tạm ẩn)" : "Expand to 5-card view (hide others)"}
                  aria-label="Mở rộng 5 thẻ"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Nội Dung Thu Gọn / Mở Rộng Thẻ S */}
            <div
              className={`skills-swot-collapse-grid flex-1 flex flex-col justify-between ${
                collapsedCards["swot-s"] ? "is-collapsed" : "h-full"
              }`}
            >
              <div className="skills-swot-collapse-inner flex-1 flex flex-col justify-start h-full">
                <div className="flex-1 flex flex-col justify-between">
                  <p className="text-body text-slate-700 dark:text-slate-300 mb-2 sm:mb-3 leading-relaxed">
                    Những thế mạnh vượt trội đã được chứng minh và khẳng định qua thực tiễn quản lý, vận hành hệ thống.
                  </p>

                  <ul className="grid grid-cols-1 xl:grid-cols-2 gap-1.5 xs:gap-2 text-body font-medium">
                    {[
                      { icon: Database, label: "CRM & Contact Center", percent: 95 },
                      { icon: BarChart3, label: "Phân tích Dữ liệu CX", percent: 90 },
                      { icon: Workflow, label: "SOPs & QA/QC", percent: 90 },
                      { icon: UserCheck, label: "Tư duy Customer-Centric", percent: 90 },
                      { icon: Users, label: "Quản lý Đội ngũ", percent: 90 },
                      { icon: ShieldCheck, label: "Xử lý Khủng hoảng", percent: 90 },
                      { icon: HeartHandshake, label: "Quản trị Trải nghiệm CX", percent: 90 }
                    ].map((skill, idx) => {
                      const IconComp = skill.icon;
                      return (
                        <li key={idx} className="p-2 rounded-[10px] skills-glass-card border-blue-200/60 dark:border-blue-500/30 space-y-1.5 transition-all hover:bg-white/90 dark:hover:bg-slate-800/90 shadow-2xs text-body">
                          <div className="flex items-center justify-between text-body">
                            <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold min-w-0">
                              <IconComp className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                              <span className="truncate text-body">{skill.label}</span>
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-blue-500/15 dark:bg-blue-500/25 text-blue-800 dark:text-blue-300 font-mono font-black text-xs shrink-0 ml-2">
                              {skill.percent}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-blue-100/80 dark:bg-slate-800/80 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.percent}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: idx * 0.05, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 rounded-full relative"
                            >
                              <div className="absolute inset-0 bg-white/20 animate-pulse" />
                            </motion.div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CƠ HỘI (O - Opportunities) */}
        <section
          id="swot-o"
          onClick={() => handleExpandCard("swot-o")}
          className={`skills-glass-swot-purple rounded-2xl p-3 xs:p-3.5 sm:p-4.5 md:p-5 lg:p-6 flex flex-col justify-between skills-hover-lift relative overflow-hidden group cursor-pointer transition-all duration-300 w-full ${
            collapsedCards["swot-o"] ? "h-auto min-h-[90px]" : "h-full min-h-0"
          }`}
        >
          {/* Góc Phần Tư O */}
          <div
            className="absolute bottom-0 left-0 w-12 h-12 sm:w-14 sm:h-14 rounded-tr-full rounded-bl-2xl bg-gradient-to-bl from-purple-500/30 via-purple-500/50 to-purple-600/70 dark:from-purple-500/35 dark:via-purple-500/50 dark:to-purple-600/70 border-t-2 border-r-2 border-purple-400/70 dark:border-purple-400/70 backdrop-blur-md flex items-center justify-center pr-2 pt-2 text-purple-900 dark:text-purple-100 font-extrabold text-sm sm:text-base shadow-sm select-none z-10 transition-transform duration-300 group-hover:scale-105"
            title="O - Cơ Hội"
          >
            <span>O</span>
          </div>

          <div className="h-full flex flex-col justify-between">
            {/* Header Thẻ O */}
            <div className="flex items-center justify-between pb-3 border-b border-purple-200/70 dark:border-purple-800/70 mb-3 w-full select-none">
              <div className="flex items-center gap-2.5">
                <Rocket className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 transform transition-transform group-hover:scale-110 duration-300" />
                <h6 className="text-h6 text-purple-600 dark:text-purple-400 tracking-wide">
                  {isVi ? "Phát Triển" : "Development & Growth"}
                </h6>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExpandCard("swot-o");
                  }}
                  className="p-1 rounded-full bg-purple-100/80 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/80 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer shadow-2xs"
                  title={isVi ? "Mở rộng kích thước 5 thẻ (các thẻ khác tạm ẩn)" : "Expand to 5-card view (hide others)"}
                  aria-label="Mở rộng 5 thẻ"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Nội Dung Thu Gọn / Mở Rộng Thẻ O */}
            <div
              className={`skills-swot-collapse-grid flex-1 flex flex-col justify-between ${
                collapsedCards["swot-o"] ? "is-collapsed" : "h-full"
              }`}
            >
              <div className="skills-swot-collapse-inner flex-1 flex flex-col justify-start h-full">
                <div className="flex-1 flex flex-col justify-between">
                  <p className="text-body text-slate-700 dark:text-slate-300 mb-2 sm:mb-3 leading-relaxed">
                    Làn sóng công nghệ và nhu cầu thị trường mở ra các đòn bẩy lớn để tạo bước nhảy vọt trong sự nghiệp.
                  </p>

                  <ul className="grid grid-cols-1 xl:grid-cols-2 gap-1.5 xs:gap-2 text-body font-medium">
                    {[
                      { icon: Bot, title: "AI & Tự Động Hóa Vận Hành Toàn Diện", meter: 95 },
                      { icon: HeartHandshake, title: "Chiến Lược CX", meter: 92 },
                      { icon: BarChart3, title: "Quản Trị Dữ Liệu CX", meter: 88 },
                      { icon: Monitor, title: "Chuyển Đổi Số", meter: 90 }
                    ].map((opp, idx) => {
                      const IconComp = opp.icon;
                      return (
                        <li key={idx} className="p-2 rounded-[10px] skills-glass-card border-purple-200/60 dark:border-purple-500/20 space-y-1.5 transition-all hover:bg-white/90 dark:hover:bg-slate-800/90 shadow-2xs text-body">
                          <div className="flex items-center justify-between text-body">
                            <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold min-w-0">
                              <IconComp className="w-4 h-4 text-purple-700 dark:text-purple-400 shrink-0" />
                              <span className="truncate text-body">{opp.title}</span>
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-purple-500/15 dark:bg-purple-500/25 text-purple-800 dark:text-purple-300 font-mono font-black text-xs shrink-0 ml-2">
                              {opp.meter}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-purple-100/80 dark:bg-slate-800/80 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${opp.meter}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: idx * 0.08, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full relative"
                            >
                              <div className="absolute inset-0 bg-white/20 animate-pulse" />
                            </motion.div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ĐIỂM CẦN PHÁT TRIỂN (W - Weaknesses) */}
        <section
          id="swot-w"
          onClick={() => handleExpandCard("swot-w")}
          className={`skills-glass-swot-amber rounded-2xl p-3 xs:p-3.5 sm:p-4.5 md:p-5 lg:p-6 flex flex-col justify-between skills-hover-lift relative overflow-hidden group cursor-pointer transition-all duration-300 w-full ${
            collapsedCards["swot-w"] ? "h-auto min-h-[90px]" : "h-full min-h-0"
          }`}
        >
          {/* Góc Phần Tư W */}
          <div
            className="absolute top-0 right-0 w-12 h-12 sm:w-14 sm:h-14 rounded-bl-full rounded-tr-2xl bg-gradient-to-tr from-amber-500/30 via-amber-500/50 to-amber-600/70 dark:from-amber-500/35 dark:via-amber-500/50 dark:to-amber-600/70 border-b-2 border-l-2 border-amber-400/70 dark:border-amber-400/70 backdrop-blur-md flex items-center justify-center pl-2 pb-2 text-amber-900 dark:text-amber-100 font-extrabold text-sm sm:text-base shadow-sm select-none z-10 transition-transform duration-300 group-hover:scale-105"
            title="W - Hoàn Thiện"
          >
            <span>W</span>
          </div>

          <div className="h-full flex flex-col justify-between">
            {/* Header Thẻ W định dạng chuẩn thẻ Chi tiết phỏng vấn */}
            <div className="flex items-center justify-between pb-3 border-b border-amber-200/70 dark:border-amber-800/70 mb-3 w-full select-none pr-12">
              <div className="flex items-center gap-2.5">
                <Target className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 transform transition-transform group-hover:scale-110 duration-300" />
                <h6 className="text-h6 text-amber-600 dark:text-amber-400 tracking-wide">
                  {isVi ? "Hoàn Thiện" : "Growth Areas"}
                </h6>
              </div>

              {/* Nút thu/mở rộng */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExpandCard("swot-w");
                  }}
                  className="p-1 rounded-full bg-amber-100/80 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/80 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer shadow-2xs"
                  title={isVi ? "Mở rộng kích thước 5 thẻ (các thẻ khác tạm ẩn)" : "Expand to 5-card view (hide others)"}
                  aria-label="Mở rộng 5 thẻ"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Nội Dung Thu Gọn / Mở Rộng Thẻ W */}
            <div
              className={`skills-swot-collapse-grid flex-1 flex flex-col ${
                collapsedCards["swot-w"] ? "is-collapsed" : ""
              }`}
            >
              <div className="skills-swot-collapse-inner flex-1 flex flex-col justify-between pt-1">
                <div>
                  <p className="text-body text-slate-700 dark:text-slate-300 mb-2 sm:mb-3 leading-relaxed font-semibold">
                    Mục tiêu hoàn thiện các năng lực chiến lược vượt trội nhằm xây dựng chân dung nhà quản trị vận hành toàn diện.
                  </p>

                  <ul className="grid grid-cols-1 xl:grid-cols-2 gap-1.5 xs:gap-2 text-body font-medium">
                    {[
                      { icon: Target, label: "Tư duy chiến lược & Hoạch định", percent: 80 },
                      { icon: FolderKanban, label: "Quản trị dự án chuyển đổi số", percent: 80 },
                      { icon: Globe, label: "Cổng tự phục vụ Self-Service", percent: 85 },
                      { icon: Cpu, label: "Tự động hóa quy trình (RPA/AI)", percent: 85 },
                      { icon: TrendingUp, label: "Quản trị hiệu suất (KPIs/OKRs)", percent: 85 },
                      { icon: MessageSquare, label: "Thương thuyết & Khủng hoảng", percent: 85 },
                      { icon: Zap, label: "Đón đầu công nghệ mới (AI Agent)", percent: 85 }
                    ].map((skill, idx) => {
                      const IconComp = skill.icon;
                      return (
                        <li key={idx} className="p-2 rounded-[10px] skills-glass-card border-amber-200/60 dark:border-amber-500/30 space-y-1.5 transition-all hover:bg-white/90 dark:hover:bg-slate-800/90 shadow-2xs text-body">
                          <div className="flex items-center justify-between text-body">
                            <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold min-w-0">
                              <IconComp className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                              <span className="truncate text-body">{skill.label}</span>
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-amber-500/15 dark:bg-amber-500/25 text-amber-800 dark:text-amber-300 font-mono font-black text-xs shrink-0 ml-2">
                              {skill.percent}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-amber-100/80 dark:bg-slate-800/80 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.percent}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: idx * 0.05, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-full relative"
                            >
                              <div className="absolute inset-0 bg-white/20 animate-pulse" />
                            </motion.div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. THÁCH THỨC & RỦI RO (T - Threats) */}
        <section
          id="swot-t"
          onClick={() => handleExpandCard("swot-t")}
          className={`skills-glass-swot-rose rounded-2xl p-3 xs:p-3.5 sm:p-4.5 md:p-5 lg:p-6 flex flex-col justify-between skills-hover-lift relative overflow-hidden group cursor-pointer transition-all duration-300 w-full ${
            collapsedCards["swot-t"] ? "h-auto min-h-[90px]" : "h-full min-h-0"
          }`}
        >
          {/* Góc Phần Tư T */}
          <div
            className="absolute top-0 left-0 w-12 h-12 sm:w-14 sm:h-14 rounded-br-full rounded-tl-2xl bg-gradient-to-tl from-rose-500/30 via-rose-500/50 to-rose-600/70 dark:from-rose-500/35 dark:via-rose-500/50 dark:to-rose-600/70 border-b-2 border-r-2 border-rose-400/70 dark:border-rose-400/70 backdrop-blur-md flex items-center justify-center pr-2 pb-2 text-rose-900 dark:text-rose-100 font-extrabold text-sm sm:text-base shadow-sm select-none z-10 transition-transform duration-300 group-hover:scale-105"
            title="T - Thách Thức"
          >
            <span>T</span>
          </div>

          <div className="h-full flex flex-col justify-between">
            {/* Header Thẻ T định dạng chuẩn thẻ Chi tiết phỏng vấn */}
            <div className="flex items-center justify-between pb-3 border-b border-rose-200/70 dark:border-rose-800/70 mb-3 w-full select-none pl-12">
              {/* Nút thu/mở rộng */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExpandCard("swot-t");
                  }}
                  className="p-1 rounded-full bg-rose-100/80 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-800/80 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer shadow-2xs"
                  title={isVi ? "Mở rộng kích thước 5 thẻ (các thẻ khác tạm ẩn)" : "Expand to 5-card view (hide others)"}
                  aria-label="Mở rộng 5 thẻ"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <h6 className="text-h6 text-rose-600 dark:text-rose-400 tracking-wide text-right">
                  {isVi ? "Thách Thức" : "Challenges"}
                </h6>
                <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 transform transition-transform group-hover:scale-110 duration-300" />
              </div>
            </div>

            {/* Nội Dung Thu Gọn / Mở Rộng Thẻ T */}
            <div
              className={`skills-swot-collapse-grid flex-1 flex flex-col ${
                collapsedCards["swot-t"] ? "is-collapsed" : ""
              }`}
            >
              <div className="skills-swot-collapse-inner flex-1 flex flex-col justify-between pt-1">
                <div>
                  <p className="text-body text-slate-700 dark:text-slate-300 mb-2 sm:mb-3 leading-relaxed">
                    Những yếu tố khách quan từ môi trường kinh doanh đòi hỏi sự chủ động thích ứng và quản trị rủi ro linh hoạt.
                  </p>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-1.5 xs:gap-2 text-body font-medium">
                    {[
                      { icon: Cpu, title: "AI định hình lại CSKH", meter: 85 },
                      { icon: BarChart3, title: "Công nghệ đổi mới nhanh", meter: 90 },
                      { icon: Users, title: "Cạnh tranh nhân sự cao cấp", meter: 88 },
                      { icon: BadgeDollarSign, title: "Áp lực tối ưu chi phí", meter: 82 }
                    ].map((threat, idx) => {
                      const IconComp = threat.icon;
                      return (
                        <div key={idx} className="p-2 rounded-[10px] skills-glass-card border-rose-200/60 dark:border-rose-500/20 space-y-1.5 transition-all hover:bg-white/90 dark:hover:bg-slate-800/90 shadow-2xs text-body">
                          <div className="flex items-center justify-between text-body">
                            <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold min-w-0">
                              <IconComp className="w-4 h-4 text-rose-700 dark:text-rose-400 shrink-0" />
                              <span className="truncate text-body">{threat.title}</span>
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-rose-500/15 dark:bg-rose-500/25 text-rose-800 dark:text-rose-300 font-mono font-black text-xs shrink-0 ml-2">
                              {threat.meter}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-rose-100/80 dark:bg-slate-800/80 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${threat.meter}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: idx * 0.08, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full relative"
                              key={idx}
                            >
                              <div className="absolute inset-0 bg-white/20 animate-pulse" />
                            </motion.div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )}
    </Suspense>
    </div>
    )}

        {/* Ngôn Ngữ & Năng Lực Giao Tiếp Quốc Tế - Phân mục với tiêu đề chuẩn hóa */}
      {(selectedCategory === "all" || selectedCategory === "languages") && (!expandedSkillCardKey || expandedSkillCardKey === "languages") && (
        <div className="w-full py-2.5 pb-6 space-y-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/50 font-['Play',sans-serif]">
          <Suspense fallback={<div className="w-full h-48 rounded-2xl bg-slate-200/50 dark:bg-slate-800/50 animate-pulse flex items-center justify-center text-xs opacity-60">Đang tải...</div>}>
            {expandedSkillCardKey === "languages" ? (
              <ExpandedCardLanguages
                isVi={isVi}
                onClose={() => setExpandedSkillCardKey(null)}
                onContact={() => handleNavigateToContact("Năng lực ngôn ngữ & Giao tiếp quốc tế")}
              />
            ) : (
              <div
                id="swot-languages-overview"
                onClick={() => handleExpandCard("languages")}
                className="!bg-transparent !border-none !shadow-none rounded-2xl p-4 sm:p-5 flex flex-col gap-3 cursor-pointer group transition-all duration-300 relative overflow-hidden"
              >
                {/* Tiêu đề phân mục Ngôn ngữ đồng bộ format Chi tiết phỏng vấn */}
                <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-emerald-200/60 dark:border-emerald-800/60 mb-1">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <h6 className="text-h6 text-emerald-600 dark:text-emerald-400 tracking-wide">
                      {isVi ? "Năng lực ngôn ngữ" : "International language proficiency"}
                    </h6>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-h6 font-mono px-3 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 shrink-0 shadow-2xs">
                      <span className="text-xs sm:text-sm font-sans font-bold">{isVi ? "3 Ngôn ngữ" : "3 Languages"}</span>
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExpandCard("languages");
                      }}
                      className="p-1 rounded-full bg-emerald-100/80 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800/80 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer shadow-2xs"
                      title={isVi ? "Mở rộng kích thước 5 thẻ (các thẻ khác tạm ẩn)" : "Expand to 5-card view (hide others)"}
                      aria-label="Mở rộng 5 thẻ"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="skills-glass-card rounded-xl p-3.5 flex flex-col justify-between gap-2.5 skills-hover-lift shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                        <Languages className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                        <h4 className="font-bold text-body text-rose-700 dark:text-rose-300">Tiếng Việt</h4>
                        <span className="text-body-sm text-slate-600 dark:text-slate-400">(Ngôn ngữ bản xứ)</span>
                      </div>
                      <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center font-bold text-sm text-rose-600 dark:text-rose-400">
                        <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-slate-200 dark:text-slate-800 stroke-current"
                            strokeWidth="3.5"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="text-rose-600 dark:text-rose-500 stroke-current"
                            strokeWidth="3.5"
                            strokeDasharray="90, 100"
                            strokeLinecap="round"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="absolute text-2xs font-bold text-rose-600 dark:text-rose-400">90%</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-rose-100/70 dark:border-rose-900/40 flex items-center justify-between">
                      <span className="text-body-sm text-rose-700 dark:text-rose-400 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        Thành thạo chuyên sâu
                      </span>
                    </div>
                  </div>

                  <div className="skills-glass-card rounded-xl p-3.5 flex flex-col justify-between gap-2.5 skills-hover-lift shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                        <Globe className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                        <h4 className="font-bold text-body text-sky-700 dark:text-sky-300">Tiếng Anh</h4>
                        <span className="text-body-sm text-slate-600 dark:text-slate-400">(Giao tiếp chuyên nghiệp)</span>
                      </div>
                      <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center font-bold text-sm text-sky-600 dark:text-sky-400">
                        <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-slate-200 dark:text-slate-800 stroke-current"
                            strokeWidth="3.5"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="text-sky-600 dark:text-sky-500 stroke-current"
                            strokeWidth="3.5"
                            strokeDasharray="60, 100"
                            strokeLinecap="round"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="absolute text-2xs font-bold text-sky-600 dark:text-sky-400">60%</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-sky-100/70 dark:border-sky-900/40 flex items-center justify-between">
                      <span className="text-body-sm text-sky-700 dark:text-sky-400 font-semibold flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 shrink-0" />
                        Làm việc môi trường quốc tế
                      </span>
                    </div>
                  </div>

                  <div className="skills-glass-card rounded-xl p-3.5 flex flex-col justify-between gap-2.5 skills-hover-lift shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                        <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <h4 className="font-bold text-body text-emerald-600 dark:text-emerald-400 leading-tight">
                          Ứng dụng AI
                        </h4>
                        <span className="text-body-sm text-slate-600 dark:text-slate-400">(Hỗ trợ trao đổi &amp; họp đa quốc gia)</span>
                      </div>
                      <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center font-bold text-sm text-emerald-700 dark:text-emerald-400">
                        <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-slate-200 dark:text-slate-800 stroke-current"
                            strokeWidth="3.5"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="text-emerald-600 stroke-current"
                            strokeWidth="3.5"
                            strokeDasharray="85, 100"
                            strokeLinecap="round"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="absolute text-2xs font-bold text-emerald-600 dark:text-emerald-400">85%</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-emerald-100/70 dark:border-emerald-900/40 flex items-center justify-between">
                      <span className="text-body-sm text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        Dịch thuật &amp; Trợ lý thời gian thực
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Suspense>
          </div>
        )}
      </div>
    </section>
  );
}

export default Skills;
