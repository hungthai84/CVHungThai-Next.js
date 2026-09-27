import React, { useState, useCallback } from "react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "motion/react";
import { 
  Target, 
  Rocket, 
  Gem, 
  TrendingDown, 
  Bot, 
  Sparkles, 
  Database, 
  Monitor, 
  Cpu, 
  Users, 
  Coins, 
  Globe, 
  BarChart3, 
  Brain, 
  Workflow, 
  HeartHandshake, 
  TrendingUp, 
  Lightbulb, 
  ShieldAlert,
  Headphones,
  Zap,
  Languages,
  Layers,
  PieChart,
  ShieldCheck,
  LayoutGrid,
  CheckCircle2,
  ChevronRight,
  SlidersHorizontal,
  Compass
} from "lucide-react";
import { cn } from "../lib/utils";
import { PageCardHeader } from "./PageCardHeader";
import { 
  STRENGTHS_DATA, 
  WEAKNESSES_DATA, 
  OPPORTUNITIES_DATA, 
  THREATS_DATA, 
  LANGUAGES_DATA,
  SKILL_GROUPS,
  SwotSkillItem,
  SkillGroup
} from "../data/skillsData";

// Helper map to resolve icon components from strings
const getSkillIcon = (name: string) => {
  switch (name) {
    case "Sparkles": return Sparkles;
    case "Database": return Database;
    case "BarChart3": return BarChart3;
    case "Users": return Users;
    case "Workflow": return Workflow;
    case "ShieldAlert": return ShieldAlert;
    case "HeartHandshake": return HeartHandshake;
    case "Lightbulb": return Lightbulb;
    case "Target": return Target;
    case "Rocket": return Rocket;
    case "Cpu": return Cpu;
    case "Monitor": return Monitor;
    case "Bot": return Bot;
    case "TrendingUp": return TrendingUp;
    case "Coins": return Coins;
    case "Headphones": return Headphones;
    case "Brain": return Brain;
    case "Zap": return Zap;
    case "Globe": return Globe;
    case "Languages": return Languages;
    case "Layers": return Layers;
    case "PieChart": return PieChart;
    case "ShieldCheck": return ShieldCheck;
    case "LayoutGrid": return LayoutGrid;
    case "Compass": return Compass;
    default: return Gem;
  }
};

export function Skills() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";
  
  // Tab view mode: 'swot' (SWOT 4-Quadrant View) or 'detailed' (Detailed 5 Professional Domains)
  const [viewMode, setViewMode] = useState<"swot" | "detailed">("swot");
  const [selectedSwot, setSelectedSwot] = useState<"S" | "W" | "O" | "T">("S");
  const [activeSkillGroupId, setActiveSkillGroupId] = useState<string>("crm-contact-center");

  // Dynamic theme-aware Glass Card classes
  const getGlassCardClass = useCallback(() => {
    switch (theme as string) {
      case "glass-dark-neon":
        return "bg-[#121218]/85 dark:bg-[#121218]/85 border-cyan-400/25 dark:border-white/15 backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[0_0_20px_rgba(0,240,255,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.25)]";
      case "modern-light-glass":
        return "bg-white/70 dark:bg-slate-900/75 border-white/80 dark:border-white/15 backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[0_10px_30px_0_rgba(100,110,140,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_14px_40px_0_rgba(100,110,140,0.15)]";
      case "mritech-digital-growth":
      default:
        return "bg-white/75 dark:bg-[#121218]/80 border-white/70 dark:border-white/12 backdrop-blur-[18px] backdrop-saturate-[180%] shadow-[0_8px_32px_0_rgba(31,38,135,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.12)]";
    }
  }, [theme]);

  const activeSkillGroup = SKILL_GROUPS.find(g => g.id === activeSkillGroupId) || SKILL_GROUPS[0];

  return (
    <section
      id="skills"
      className="relative w-full h-full flex flex-col justify-start items-stretch p-[15px] font-sans text-slate-900 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar"
    >
      <div className="w-full flex-grow flex flex-col gap-[15px] max-w-7xl mx-auto justify-start">
        
        {/* Page Header with Floating Animated Icon & Metrics */}
        <PageCardHeader pageId="skills">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2 h-4 bg-blue-600 dark:bg-cyan-400 rounded-full shrink-0" />
            <span className="text-caption font-semibold font-mono text-blue-700 dark:text-cyan-300 bg-blue-500/15 px-2.5 py-0.5 rounded-full border border-blue-500/30 shadow-2xs">
              {isVi ? "Khung Năng Lực Toàn Diện" : "Comprehensive Skills & SWOT Analysis"}
            </span>
            <span className="text-[10px] font-mono font-black text-blue-600 dark:text-cyan-400 bg-blue-500/10 dark:bg-cyan-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
              SOP · CRM · AI · CX
            </span>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/70 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-xs md:ml-auto">
            <button
              onClick={() => setViewMode("swot")}
              className={cn(
                "px-3.5 py-1 rounded-full text-xs font-bold font-play tracking-wide transition-all cursor-pointer flex items-center gap-1.5",
                viewMode === "swot"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <Gem className="w-3.5 h-3.5" />
              <span>{isVi ? "Phân tích SWOT (4 Trụ cột)" : "SWOT Matrix View"}</span>
            </button>
            <button
              onClick={() => setViewMode("detailed")}
              className={cn(
                "px-3.5 py-1 rounded-full text-xs font-bold font-play tracking-wide transition-all cursor-pointer flex items-center gap-1.5",
                viewMode === "detailed"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{isVi ? "Chuyên môn chi tiết (5 Nhóm)" : "Detailed Competency Groups"}</span>
            </button>
          </div>
        </PageCardHeader>

        {/* ========================================================================= */}
        {/* VIEW 1: SWOT 4-QUADRANT BENTO GRID                                        */}
        {/* ========================================================================= */}
        {viewMode === "swot" && (
          <div className="w-full flex flex-col gap-[15px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px] items-stretch relative w-full justify-center">
              
              {/* 1. STRENGTHS (S) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
                onClick={() => setSelectedSwot('S')}
                className={cn(
                  "p-[15px] border transition-all duration-300 flex flex-col justify-between overflow-hidden group/main cursor-pointer relative text-left",
                  "rounded-[var(--theme-radius-card,10px)]",
                  getGlassCardClass(),
                  selectedSwot === 'S' && "ring-2 ring-blue-500/30 border-blue-400 dark:border-cyan-400"
                )}
              >
                {/* Corner Letter S (Bottom Right) with Subtle Glow */}
                <div className="absolute bottom-2.5 right-3 sm:bottom-3.5 sm:right-4 z-0 select-none pointer-events-none flex items-center justify-center">
                  <span className="font-mono font-black text-4xl sm:text-5xl md:text-6xl text-blue-500/15 dark:text-cyan-400/20 group-hover/main:scale-110 transition-transform duration-500">
                    S
                  </span>
                </div>

                <div className="relative z-10 w-full">
                  {/* Quadrant Header */}
                  <div className="flex items-center justify-between border-b border-blue-100 dark:border-slate-800 pb-3 mb-3">
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 text-left">
                      <motion.div
                        animate={{ y: [0, -3, 0], scale: [1, 1.08, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="shrink-0"
                      >
                        <Gem className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                      </motion.div>
                      <div className="min-w-0 text-left">
                        <motion.h6 
                          animate={{ opacity: [0.9, 1, 0.9] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="text-h6 font-bold text-blue-600 dark:text-cyan-400 truncate font-play text-left"
                        >
                          {isVi ? "7.1. Thế mạnh vận hành" : "7.1. Operational Core Strengths"}
                        </motion.h6>
                      </div>
                    </div>
                    
                    <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold text-blue-700 dark:text-cyan-300 bg-blue-500/10 dark:bg-cyan-500/10 rounded-full border border-blue-200/30 dark:border-cyan-500/20 uppercase tracking-wider">
                      {isVi ? "Ưu thế" : "Core"}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-300 leading-relaxed mb-3.5">
                    {isVi 
                      ? "Những thế mạnh cốt lõi nổi bật nhất đã được chứng minh qua thực tiễn quản trị, vận hành và nâng cấp hệ thống CSKH."
                      : "Core outstanding strengths proven through hands-on management, operation, and CX system elevation."}
                  </p>

                  {/* Skills Progress List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {STRENGTHS_DATA.map((item, index) => {
                      const ItemIcon = getSkillIcon(item.iconName);
                      return (
                        <div 
                          key={item.id} 
                          className="flex flex-col gap-1.5 p-2 rounded-xl border border-transparent hover:border-blue-100 dark:hover:border-cyan-500/15 bg-transparent hover:bg-blue-50/30 dark:hover:bg-cyan-500/5 transition-all duration-300 group/item"
                        >
                          <div className="flex items-center justify-between gap-2.5 w-full">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-5.5 h-5.5 rounded-md bg-blue-500/10 dark:bg-cyan-500/15 flex items-center justify-center shrink-0">
                                <ItemIcon className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0" />
                              </div>
                              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate font-play">
                                {isVi ? item.labelVi : item.labelEn}
                              </span>
                            </div>
                            
                            <span className="px-2 py-0.5 rounded-[6px] bg-blue-500/10 text-blue-700 dark:text-cyan-300 border border-blue-500/25 dark:border-cyan-500/20 text-xs font-mono font-black tracking-wide">
                              {item.percent}%
                            </span>
                          </div>

                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.percent}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.85, ease: "easeOut", delay: index * 0.06 }}
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* 2. WEAKNESSES / GROWTH (W) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
                onClick={() => setSelectedSwot('W')}
                className={cn(
                  "p-[15px] border transition-all duration-300 flex flex-col justify-between overflow-hidden group/main cursor-pointer relative text-left",
                  "rounded-[var(--theme-radius-card,10px)]",
                  getGlassCardClass(),
                  selectedSwot === 'W' && "ring-2 ring-orange-500/30 border-orange-400 dark:border-amber-400"
                )}
              >
                {/* Corner Letter W (Bottom Left) */}
                <div className="absolute bottom-2.5 left-3 sm:bottom-3.5 sm:left-4 z-0 select-none pointer-events-none flex items-center justify-center">
                  <span className="font-mono font-black text-4xl sm:text-5xl md:text-6xl text-orange-500/15 dark:text-amber-400/20 group-hover/main:scale-110 transition-transform duration-500">
                    W
                  </span>
                </div>

                <div className="relative z-10 w-full">
                  <div className="flex items-center justify-between border-b border-orange-100 dark:border-slate-800 pb-3 mb-3">
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 text-left">
                      <motion.div
                        animate={{ rotate: [0, -6, 6, 0], scale: [1, 1.04, 1] }}
                        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                        className="shrink-0"
                      >
                        <TrendingDown className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      </motion.div>
                      <div className="min-w-0 text-left">
                        <motion.h6 
                          animate={{ opacity: [0.9, 1, 0.9] }}
                          transition={{ duration: 4.2, repeat: Infinity }}
                          className="text-h6 font-bold text-amber-600 dark:text-amber-400 truncate font-play text-left"
                        >
                          {isVi ? "7.2. Hoàn thiện quản trị" : "7.2. Strategic Management Refinements"}
                        </motion.h6>
                      </div>
                    </div>
                    
                    <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold text-orange-700 dark:text-amber-300 bg-orange-500/10 dark:bg-amber-500/10 rounded-full border border-orange-200/30 dark:border-amber-500/20 uppercase tracking-wider">
                      {isVi ? "Phát triển" : "Growth"}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-300 leading-relaxed mb-3.5">
                    {isVi 
                      ? "Những khía cạnh cần liên tục hoàn thiện nhằm nâng tầm kỹ năng quản lý thực thi sang quản trị định hướng chiến lược."
                      : "Capabilities to continuously refine to elevate management from execution to strategic governance."}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {WEAKNESSES_DATA.map((item, index) => {
                      const ItemIcon = getSkillIcon(item.iconName);
                      return (
                        <div key={item.id} className="flex flex-col gap-1.5 p-2 rounded-xl border border-transparent hover:border-orange-100 dark:hover:border-amber-500/15 bg-transparent hover:bg-orange-50/30 dark:hover:bg-amber-500/5 transition-all duration-300 group/item">
                          <div className="flex items-center justify-between gap-2.5 w-full">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-5.5 h-5.5 rounded-md bg-orange-500/10 dark:bg-amber-500/15 flex items-center justify-center shrink-0">
                                <ItemIcon className="w-3.5 h-3.5 text-orange-600 dark:text-amber-400 shrink-0" />
                              </div>
                              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate font-play">
                                {isVi ? item.labelVi : item.labelEn}
                              </span>
                            </div>
                            <span className="px-2 py-0.5 rounded-[6px] bg-orange-500/10 text-orange-700 dark:text-amber-300 border border-orange-500/25 dark:border-amber-500/20 text-xs font-mono font-black tracking-wide">
                              {item.percent}%
                            </span>
                          </div>

                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.percent}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.85, ease: "easeOut", delay: index * 0.06 }}
                              className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* 3. OPPORTUNITIES (O) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
                onClick={() => setSelectedSwot('O')}
                className={cn(
                  "p-[15px] border transition-all duration-300 flex flex-col justify-between overflow-hidden group/main cursor-pointer relative text-left",
                  "rounded-[var(--theme-radius-card,10px)]",
                  getGlassCardClass(),
                  selectedSwot === 'O' && "ring-2 ring-purple-500/30 border-purple-400 dark:border-purple-400"
                )}
              >
                {/* Corner Letter O (Top Right) */}
                <div className="absolute top-2.5 right-3 sm:top-3.5 sm:right-4 z-0 select-none pointer-events-none flex items-center justify-center">
                  <span className="font-mono font-black text-4xl sm:text-5xl md:text-6xl text-purple-500/15 dark:text-purple-400/20 group-hover/main:scale-110 transition-transform duration-500">
                    O
                  </span>
                </div>

                <div className="relative z-10 w-full">
                  <div className="flex items-center justify-between border-b border-purple-100 dark:border-slate-800 pb-3 mb-3">
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 text-left">
                      <motion.div
                        animate={{ y: [0, -4, 0], x: [0, 2, 0] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                        className="shrink-0"
                      >
                        <Rocket className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </motion.div>
                      <div className="min-w-0 text-left">
                        <motion.h6 
                          animate={{ opacity: [0.9, 1, 0.9] }}
                          transition={{ duration: 3.8, repeat: Infinity }}
                          className="text-h6 font-bold text-emerald-600 dark:text-emerald-400 truncate font-play text-left"
                        >
                          {isVi ? "7.3. Cơ hội bứt phá" : "7.3. Innovative Digital Paths"}
                        </motion.h6>
                      </div>
                    </div>
                    
                    <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-500/10 dark:bg-purple-500/10 rounded-full border border-purple-200/30 dark:border-purple-500/20 uppercase tracking-wider">
                      {isVi ? "Cơ hội" : "Opp"}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-300 leading-relaxed mb-3.5">
                    {isVi 
                      ? "Những cơ hội đón đầu làn sóng số, chuyển đổi dịch vụ sang kênh thông minh và ứng dụng AI nâng cao hiệu năng."
                      : "Excellent avenues to capture digital waves, automating workflows, and leveraging AI models."}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {OPPORTUNITIES_DATA.map((item, index) => {
                      const ItemIcon = getSkillIcon(item.iconName);
                      return (
                        <div key={item.id} className="flex flex-col gap-1.5 p-2 rounded-xl border border-transparent hover:border-purple-100 dark:hover:border-purple-500/15 bg-transparent hover:bg-purple-50/30 dark:hover:bg-purple-500/5 transition-all duration-300 group/item">
                          <div className="flex items-center justify-between gap-2.5 w-full">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-5.5 h-5.5 rounded-md bg-purple-500/10 dark:bg-purple-500/15 flex items-center justify-center shrink-0">
                                <ItemIcon className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                              </div>
                              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate font-play">
                                {isVi ? item.labelVi : item.labelEn}
                              </span>
                            </div>
                            <span className="px-2 py-0.5 rounded-[6px] bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/25 dark:border-purple-500/20 text-xs font-mono font-black tracking-wide">
                              {item.percent}%
                            </span>
                          </div>

                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.percent}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.85, ease: "easeOut", delay: index * 0.06 }}
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* 4. THREATS (T) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
                style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
                onClick={() => setSelectedSwot('T')}
                className={cn(
                  "p-[15px] border transition-all duration-300 flex flex-col justify-between overflow-hidden group/main cursor-pointer relative text-left",
                  "rounded-[var(--theme-radius-card,10px)]",
                  getGlassCardClass(),
                  selectedSwot === 'T' && "ring-2 ring-red-500/30 border-red-400 dark:border-rose-400"
                )}
              >
                {/* Corner Letter T (Top Left) */}
                <div className="absolute top-2.5 left-3 sm:top-3.5 sm:left-4 z-0 select-none pointer-events-none flex items-center justify-center">
                  <span className="font-mono font-black text-4xl sm:text-5xl md:text-6xl text-red-500/15 dark:text-rose-400/20 group-hover/main:scale-110 transition-transform duration-500">
                    T
                  </span>
                </div>

                <div className="relative z-10 w-full">
                  <div className="flex items-center justify-between border-b border-red-100 dark:border-slate-800 pb-3 mb-3">
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 text-left">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="shrink-0"
                      >
                        <Target className="w-5 h-5 text-violet-600 dark:text-fuchsia-400" />
                      </motion.div>
                      <div className="min-w-0 text-left">
                        <motion.h6 
                          animate={{ opacity: [0.9, 1, 0.9] }}
                          transition={{ duration: 3.5, repeat: Infinity }}
                          className="text-h6 font-bold text-violet-600 dark:text-fuchsia-400 truncate font-play text-left"
                        >
                          {isVi ? "7.4. Thách thức thích ứng" : "7.4. Agility Under Pressure"}
                        </motion.h6>
                      </div>
                    </div>
                    
                    <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold text-red-700 dark:text-rose-300 bg-red-500/10 dark:bg-rose-500/10 rounded-full border border-red-200/30 dark:border-rose-500/20 uppercase tracking-wider">
                      {isVi ? "Thách thức" : "Threats"}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-300 leading-relaxed mb-3.5">
                    {isVi 
                      ? "Những thách thức khách quan từ môi trường kinh tế và thay đổi công nghệ đột phá tác động trực tiếp đến dịch vụ."
                      : "Key external risks from volatile economy and rapid technical changes demanding persistent agility."}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {THREATS_DATA.map((item, index) => {
                      const ItemIcon = getSkillIcon(item.iconName);
                      return (
                        <div key={item.id} className="flex flex-col gap-1.5 p-2 rounded-xl border border-transparent hover:border-red-100 dark:hover:border-rose-500/15 bg-transparent hover:bg-red-50/30 dark:hover:bg-rose-500/5 transition-all duration-300 group/item">
                          <div className="flex items-center justify-between gap-2.5 w-full">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-5.5 h-5.5 rounded-md bg-red-500/10 dark:bg-rose-500/15 flex items-center justify-center shrink-0">
                                <ItemIcon className="w-3.5 h-3.5 text-red-600 dark:text-rose-400 shrink-0" />
                              </div>
                              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate font-play">
                                {isVi ? item.labelVi : item.labelEn}
                              </span>
                            </div>
                            
                            {/* CRITICAL: Must use label 'Mức độ tác động' instead of 'Mức độ kỹ năng' */}
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="hidden xs:inline-block text-[10px] text-red-600/80 dark:text-rose-400/80 font-mono font-medium">
                                {isVi ? "Mức độ tác động" : "Impact level"}
                              </span>
                              <span className="px-2 py-0.5 rounded-[6px] bg-red-500/10 text-red-700 dark:text-rose-300 border border-red-500/25 dark:border-rose-500/20 text-xs font-mono font-black tracking-wide">
                                {item.percent}%
                              </span>
                            </div>
                          </div>

                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.percent}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.85, ease: "easeOut", delay: index * 0.06 }}
                              className="h-full bg-gradient-to-r from-red-500 to-rose-600 rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: 5 DETAILED SPECIALIZED COMPETENCY DOMAINS                         */}
        {/* ========================================================================= */}
        {viewMode === "detailed" && (
          <div className="w-full flex flex-col gap-[15px]">
            {/* Category Sub-Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {SKILL_GROUPS.map((group) => {
                const isActive = activeSkillGroupId === group.id;
                const GroupIcon = getSkillIcon(group.iconName);
                return (
                  <button
                    key={group.id}
                    onClick={() => setActiveSkillGroupId(group.id)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-xs font-bold font-play tracking-wide transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border",
                      isActive
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-white/70 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:bg-white dark:hover:bg-slate-800"
                    )}
                  >
                    <GroupIcon className="w-3.5 h-3.5" />
                    <span>{isVi ? `Khối ${group.code}: ${group.titleVi.replace(/KỸ NĂNG CHUYÊN MÔN|NĂNG LỰC|ĐỔI MỚI SÁNG TẠO &/i, "").trim()}` : `Group ${group.code}`}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Group Showcase Card */}
            <motion.div
              key={activeSkillGroup.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
              className={cn(
                "p-5 sm:p-7 border flex flex-col gap-5 text-left relative overflow-hidden",
                "rounded-[var(--theme-radius-card,10px)]",
                getGlassCardClass()
              )}
            >
              {/* Group Header */}
              <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-white/10">
                <div>
                  <span className="text-2xs font-mono font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider block">
                    {isVi ? `NHÓM CHUYÊN MÔN ${activeSkillGroup.code}` : `COMPETENCY GROUP ${activeSkillGroup.code}`}
                  </span>
                  <h5 className="text-h6 font-bold text-slate-900 dark:text-white font-play mt-0.5">
                    {isVi ? activeSkillGroup.titleVi : activeSkillGroup.titleEn}
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-300 font-medium mt-1 max-w-3xl">
                    {isVi ? activeSkillGroup.subtitleVi : activeSkillGroup.subtitleEn}
                  </p>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeSkillGroup.skills.map((skill) => {
                  const SkillIcon = getSkillIcon(skill.iconName);
                  return (
                    <div
                      key={skill.id}
                      className="p-4 rounded-2xl bg-white/60 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between gap-3 shadow-2xs hover:border-blue-300 dark:hover:border-cyan-500/40 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-blue-500/10 dark:bg-cyan-500/20 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                            <SkillIcon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <h6 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-play truncate">
                              {isVi ? skill.nameVi : skill.nameEn}
                            </h6>
                            <span className="text-[10px] font-mono text-blue-600 dark:text-cyan-400 font-bold block truncate">
                              {isVi ? skill.levelVi : skill.levelEn}
                            </span>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded-[6px] bg-blue-500/10 text-blue-700 dark:text-cyan-300 text-xs font-mono font-black shrink-0 border border-blue-500/20">
                          {skill.percentage}%
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        {isVi ? skill.descriptionVi : skill.descriptionEn}
                      </p>

                      {/* Tool Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/50 dark:border-white/5 mt-auto">
                        {skill.tools.map((tool, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-300 font-semibold">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 7.5: NĂNG LỰC NGÔN NGỮ (LANGUAGES PROFICIENCY)                   */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
          className={cn(
            "w-full p-5 sm:p-6 border select-none flex flex-col gap-4 text-left transition-all duration-300",
            "rounded-[var(--theme-radius-card,10px)]",
            getGlassCardClass()
          )}
        >
          {/* Section Header */}
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <motion.div
                animate={{ y: [0, -3, 0], rotate: [0, 4, -4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-8 h-8 rounded-xl bg-blue-500/10 dark:bg-cyan-500/20 flex items-center justify-center text-blue-600 dark:text-cyan-400 shrink-0"
              >
                <Globe className="w-4.5 h-4.5" />
              </motion.div>
              <h6 className="text-h6 font-bold text-slate-900 dark:text-white font-play">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300">
                  {isVi ? "7.5. Năng lực ngôn ngữ & Giao tiếp quốc tế" : "7.5. Language Proficiency & Global Communication"}
                </span>
              </h6>
            </div>

            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
              Native · Professional · AI
            </span>
          </div>

          {/* 3 Circular Language Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LANGUAGES_DATA.map((langItem) => (
              <div 
                key={langItem.id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:scale-[1.01] transition-transform"
              >
                {/* SVG Progress Circle */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-200 dark:text-slate-800 stroke-current" strokeWidth="3.2" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path 
                      className={cn("stroke-current", langItem.color)} 
                      strokeWidth="3.2" 
                      strokeDasharray={`${langItem.percent}, 100`} 
                      strokeLinecap="round" 
                      fill="none" 
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    />
                  </svg>
                  <span className="absolute text-xs font-mono font-black text-slate-900 dark:text-white">
                    {langItem.percent}%
                  </span>
                </div>

                <div className="flex flex-col min-w-0 text-left">
                  <h6 className="font-bold text-sm text-slate-900 dark:text-white leading-tight font-play">
                    {isVi ? langItem.nameVi : langItem.nameEn}
                  </h6>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-0.5">
                    {isVi ? langItem.roleVi : langItem.roleEn}
                  </span>
                  <span className={cn("text-xs font-extrabold mt-1 leading-tight font-play", langItem.color)}>
                    {isVi ? langItem.levelVi : langItem.levelEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default Skills;
