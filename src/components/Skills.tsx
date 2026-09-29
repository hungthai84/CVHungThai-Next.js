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
  Compass,
  UserCheck,
  User,
  Settings,
  FileText,
  Heart,
  Star,
  AlertTriangle,
  Calendar,
  ArrowUpRight,
  MessageSquare
} from "lucide-react";
import { cn } from "../lib/utils";
import { PageCardHeader } from "./PageCardHeader";
import { 
  STRENGTHS_DATA, 
  WEAKNESSES_DATA, 
  OPPORTUNITIES_DATA, 
  THREATS_DATA, 
  LANGUAGES_DATA,
  SwotSkillItem
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
    case "UserCheck": return UserCheck;
    case "User": return User;
    case "Settings": return Settings;
    case "FileText": return FileText;
    case "Heart": return Heart;
    case "Star": return Star;
    case "AlertTriangle": return AlertTriangle;
    case "Calendar": return Calendar;
    case "ArrowUpRight": return ArrowUpRight;
    case "MessageSquare": return MessageSquare;
    default: return Gem;
  }
};

// Circular Progress Component for Languages
function CircularProgressRing({ 
  percent, 
  strokeColor, 
  trackColor 
}: { 
  percent: number; 
  strokeColor: string; 
  trackColor: string;
}) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 54 54">
        <circle
          cx="27"
          cy="27"
          r={radius}
          strokeWidth="4"
          fill="none"
          className={cn("stroke-current", trackColor)}
        />
        <circle
          cx="27"
          cy="27"
          r={radius}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          className={cn("stroke-current transition-all duration-1000 ease-out", strokeColor)}
        />
      </svg>
      <span className="absolute text-xs sm:text-sm font-mono font-black text-slate-800 dark:text-white">
        {percent}%
      </span>
    </div>
  );
}

export function Skills() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";
  
  const [selectedSwot, setSelectedSwot] = useState<"S" | "W" | "O" | "T">("S");

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

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-cyan-500/10 border border-blue-500/20 text-blue-700 dark:text-cyan-300 text-xs font-bold font-mono md:ml-auto">
            <Gem className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>{isVi ? "Ma Trận SWOT & Ngôn Ngữ" : "SWOT & Language Matrix"}</span>
          </div>
        </PageCardHeader>

        {/* SWOT 4-QUADRANT BENTO GRID & NĂNG LỰC NGÔN NGỮ */}
        <div className="w-full flex flex-col gap-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch relative w-full justify-center">
              
              {/* 1. ĐIỂM MẠNH (STRENGTHS - BLUE/CYAN THEME) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                style={{ borderRadius: "var(--theme-radius-card, 24px)" }}
                onClick={() => setSelectedSwot('S')}
                className={cn(
                  "p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between overflow-hidden relative text-left",
                  "rounded-[var(--theme-radius-card,24px)] bg-white/95 dark:bg-slate-900/90 border-blue-100 dark:border-blue-900/30 shadow-[0_10px_30px_rgba(37,99,235,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]",
                  selectedSwot === 'S' && "ring-2 ring-blue-500/30 border-blue-400 dark:border-cyan-400"
                )}
              >
                {/* Subtle soft ambient glow in bottom right */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-500/10 rounded-full filter blur-[50px] pointer-events-none" />

                <div className="relative z-10 w-full">
                  {/* Card Header: Icon (không đóng khung) + Tiêu đề 4 chữ format hiệu ứng chuyển động & màu sắc ngẫu nhiên bên trái */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-blue-100/80 dark:border-blue-900/30 gap-3 flex-wrap">
                    <div className="flex items-center gap-3 min-w-0">
                      <motion.div
                        animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.08, 0.96, 1], y: [0, -2, 2, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="shrink-0"
                      >
                        <Gem className="w-7 h-7 stroke-[2.4] text-blue-600 dark:text-cyan-400 drop-shadow-sm" />
                      </motion.div>
                      <motion.h4 
                        animate={{ opacity: [0.94, 1, 0.94] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                        className="text-xl sm:text-2xl font-black font-play tracking-tight truncate"
                      >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-cyan-400 dark:via-blue-300 dark:to-indigo-300">
                          {isVi ? "Điểm Mạnh Cốt Lõi" : "Core Strategic Strengths"}
                        </span>
                      </motion.h4>
                    </div>
                    
                    <div className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center gap-1.5 shadow-2xs shrink-0">
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{isVi ? "Ưu thế nổi bật" : "Key Strengths"}</span>
                    </div>
                  </div>

                  {/* Subtitle / Description */}
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-5">
                    {isVi 
                      ? "Những thế mạnh vượt trội đã được chứng minh và khẳng định qua thực tiễn quản lý, vận hành hệ thống."
                      : "Core outstanding strengths proven and affirmed through hands-on system management and operations."}
                  </p>

                  {/* Inner Skills Grid (Dưới kích thước desktop hiển thị 1 cột, trên desktop 2 cột) */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-3.5">
                    {STRENGTHS_DATA.map((item, index) => {
                      const ItemIcon = getSkillIcon(item.iconName);
                      return (
                        <div 
                          key={item.id} 
                          className="relative bg-white dark:bg-slate-950/70 border border-slate-100 dark:border-white/10 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between gap-2.5 shadow-xs hover:shadow-md hover:border-blue-300 dark:hover:border-cyan-500 transition-all duration-300 group/item cursor-pointer"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <ItemIcon className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 group-hover/item:scale-110 transition-transform" />
                              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 font-play truncate" title={isVi ? item.labelVi : item.labelEn}>
                                {isVi ? item.labelVi : item.labelEn}
                              </span>
                            </div>
                            
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/40 text-blue-600 dark:text-cyan-400 text-xs font-mono font-bold shrink-0">
                              {item.percent}%
                            </span>
                          </div>

                          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.percent}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.85, ease: "easeOut", delay: index * 0.05 }}
                              className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"
                            />
                          </div>

                          {/* Hover Tooltip giải thích chi tiết khi rê chuột vào */}
                          {item.descVi && (
                            <div className="opacity-0 pointer-events-none group-hover/item:opacity-100 transition-all duration-200 absolute left-2 right-2 bottom-[calc(100%+8px)] z-40 p-2.5 rounded-xl bg-slate-950/95 dark:bg-slate-900/95 text-white border border-blue-400/40 dark:border-cyan-400/40 shadow-2xl backdrop-blur-xl text-left">
                              <div className="flex items-center gap-1.5 text-cyan-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                                <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                                <span>{isVi ? item.labelVi : item.labelEn}</span>
                                <span className="ml-auto font-mono text-[9px] text-amber-300 font-bold">{item.percent}%</span>
                              </div>
                              <p className="text-[11px] text-slate-200 leading-relaxed font-normal">
                                {isVi ? item.descVi : item.descEn}
                              </p>
                              {/* Bottom pointer arrow */}
                              <div className="absolute top-full left-6 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-slate-950/95 dark:border-t-slate-900/95" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* 2. PHÁT TRIỂN (OPPORTUNITIES - PURPLE THEME) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                style={{ borderRadius: "var(--theme-radius-card, 24px)" }}
                onClick={() => setSelectedSwot('O')}
                className={cn(
                  "p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between overflow-hidden relative text-left",
                  "rounded-[var(--theme-radius-card,24px)] bg-white/95 dark:bg-slate-900/90 border-purple-100 dark:border-purple-900/30 shadow-[0_10px_30px_rgba(124,58,237,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]",
                  selectedSwot === 'O' && "ring-2 ring-purple-500/30 border-purple-400 dark:border-purple-400"
                )}
              >
                {/* Upward Right Arrow Vector Watermark in bottom right */}
                <div className="absolute -bottom-1 -right-1 pointer-events-none select-none opacity-20 dark:opacity-10 text-purple-600">
                  <ArrowUpRight className="w-24 h-24 stroke-[2.5]" />
                </div>

                <div className="relative z-10 w-full">
                  {/* Card Header: Icon (không đóng khung) + Tiêu đề 4 chữ format hiệu ứng chuyển động & màu sắc ngẫu nhiên bên trái */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-100/80 dark:border-purple-900/30 gap-3 flex-wrap">
                    <div className="flex items-center gap-3 min-w-0">
                      <motion.div
                        animate={{ rotate: [0, -6, 6, 0], scale: [1, 1.07, 0.95, 1], y: [0, 2, -2, 0] }}
                        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                        className="shrink-0"
                      >
                        <Rocket className="w-7 h-7 stroke-[2.4] text-purple-600 dark:text-purple-400 drop-shadow-sm" />
                      </motion.div>
                      <motion.h4 
                        animate={{ opacity: [0.94, 1, 0.94] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                        className="text-xl sm:text-2xl font-black font-play tracking-tight truncate"
                      >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-500 dark:from-purple-400 dark:via-fuchsia-300 dark:to-indigo-300">
                          {isVi ? "Cơ Hội Phát Triển" : "High Growth Opportunities"}
                        </span>
                      </motion.h4>
                    </div>
                    
                    <div className="px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800/40 text-purple-600 dark:text-purple-400 text-xs font-bold flex items-center gap-1.5 shadow-2xs shrink-0">
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{isVi ? "Tiềm năng lớn" : "High Potential"}</span>
                    </div>
                  </div>

                  {/* Subtitle / Description */}
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-5">
                    {isVi 
                      ? "Làn sóng công nghệ và nhu cầu thị trường mở ra các đòn bẩy lớn để tạo bước nhảy vọt trong sự nghiệp."
                      : "Technology waves and market demands unlock powerful levers for career quantum leaps."}
                  </p>

                  {/* Inner Skills Grid (Dưới kích thước desktop hiển thị 1 cột, trên desktop 2 cột) */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-3.5">
                    {OPPORTUNITIES_DATA.map((item, index) => {
                      const ItemIcon = getSkillIcon(item.iconName);
                      return (
                        <div 
                          key={item.id} 
                          className="bg-white dark:bg-slate-950/70 border border-slate-100 dark:border-white/10 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between gap-2.5 shadow-xs hover:shadow-md hover:border-purple-200 dark:hover:border-purple-700/50 transition-all duration-300 group/item"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <ItemIcon className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 font-play truncate" title={isVi ? item.labelVi : item.labelEn}>
                                {isVi ? item.labelVi : item.labelEn}
                              </span>
                            </div>
                            
                            <span className="px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800/40 text-purple-600 dark:text-purple-300 text-xs font-mono font-bold shrink-0">
                              {item.percent}%
                            </span>
                          </div>

                          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.percent}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.85, ease: "easeOut", delay: index * 0.05 }}
                              className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* 3. HOÀN THIỆN (WEAKNESSES / REFINEMENT - AMBER THEME) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                style={{ borderRadius: "var(--theme-radius-card, 24px)" }}
                onClick={() => setSelectedSwot('W')}
                className={cn(
                  "p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between overflow-hidden relative text-left",
                  "rounded-[var(--theme-radius-card,24px)] bg-white/95 dark:bg-slate-900/90 border-amber-100 dark:border-amber-900/30 shadow-[0_10px_30px_rgba(245,158,11,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]",
                  selectedSwot === 'W' && "ring-2 ring-amber-500/30 border-amber-400 dark:border-amber-400"
                )}
              >
                {/* Concentric Bullseye / Target Watermark in bottom right */}
                <div className="absolute -bottom-3 -right-3 pointer-events-none select-none opacity-25 dark:opacity-15 text-amber-500">
                  <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-current fill-none stroke-[2.5]">
                    <circle cx="50" cy="50" r="38" />
                    <circle cx="50" cy="50" r="26" />
                    <circle cx="50" cy="50" r="14" />
                    <circle cx="50" cy="50" r="3.5" fill="currentColor" />
                  </svg>
                </div>

                <div className="relative z-10 w-full">
                  {/* Card Header: Icon (không đóng khung) + Tiêu đề 4 chữ format hiệu ứng chuyển động & màu sắc ngẫu nhiên bên trái */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-100/80 dark:border-amber-900/30 gap-3 flex-wrap">
                    <div className="flex items-center gap-3 min-w-0">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.08, 0.95, 1], y: [0, -2, 2, 0] }}
                        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                        className="shrink-0"
                      >
                        <Target className="w-7 h-7 stroke-[2.4] text-amber-500 dark:text-amber-400 drop-shadow-sm" />
                      </motion.div>
                      <motion.h4 
                        animate={{ opacity: [0.94, 1, 0.94] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                        className="text-xl sm:text-2xl font-black font-play tracking-tight truncate"
                      >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-500 dark:from-amber-400 dark:via-orange-300 dark:to-yellow-300">
                          {isVi ? "Mục Tiêu Hoàn Thiện" : "Refinement Key Objectives"}
                        </span>
                      </motion.h4>
                    </div>
                    
                    <div className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/40 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-1.5 shadow-2xs shrink-0">
                      <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{isVi ? "Mục tiêu rõ ràng" : "Clear Objectives"}</span>
                    </div>
                  </div>

                  {/* Subtitle / Description */}
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-5">
                    {isVi 
                      ? "Mục tiêu hoàn thiện các năng lực chiến lược vượt trội nhằm xây dựng chân dung nhà quản trị vận hành toàn diện."
                      : "Aiming to refine strategic capabilities to build a well-rounded operational leader profile."}
                  </p>

                  {/* Inner Skills Grid (Dưới kích thước desktop hiển thị 1 cột, trên desktop 2 cột) */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-3.5">
                    {WEAKNESSES_DATA.map((item, index) => {
                      const ItemIcon = getSkillIcon(item.iconName);
                      return (
                        <div 
                          key={item.id} 
                          className="bg-white dark:bg-slate-950/70 border border-slate-100 dark:border-white/10 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between gap-2.5 shadow-xs hover:shadow-md hover:border-amber-200 dark:hover:border-amber-700/50 transition-all duration-300 group/item"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <ItemIcon className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 font-play truncate" title={isVi ? item.labelVi : item.labelEn}>
                                {isVi ? item.labelVi : item.labelEn}
                              </span>
                            </div>
                            
                            <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-800/40 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold shrink-0">
                              {item.percent}%
                            </span>
                          </div>

                          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.percent}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.85, ease: "easeOut", delay: index * 0.05 }}
                              className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* 4. THÁCH THỨC (THREATS - ROSE/RED THEME) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
                style={{ borderRadius: "var(--theme-radius-card, 24px)" }}
                onClick={() => setSelectedSwot('T')}
                className={cn(
                  "p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between overflow-hidden relative text-left",
                  "rounded-[var(--theme-radius-card,24px)] bg-white/95 dark:bg-slate-900/90 border-rose-100 dark:border-rose-900/30 shadow-[0_10px_30px_rgba(225,29,72,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]",
                  selectedSwot === 'T' && "ring-2 ring-rose-500/30 border-rose-400 dark:border-rose-400"
                )}
              >
                {/* Mountain Peak with Pink Flag Watermark in bottom right */}
                <div className="absolute -bottom-1 -right-1 pointer-events-none select-none opacity-30 dark:opacity-15 text-rose-400">
                  <svg viewBox="0 0 100 100" className="w-24 h-24 fill-current">
                    <path d="M12 90 Q 50 45 88 90 Z" opacity="0.35" />
                    <path d="M42 90 Q 68 32 96 90 Z" opacity="0.6" />
                    <line x1="68" y1="32" x2="68" y2="12" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M68 14 L86 19 L68 24 Z" fill="#E11D48" />
                  </svg>
                </div>

                <div className="relative z-10 w-full">
                  {/* Card Header: Icon (không đóng khung) + Tiêu đề 4 chữ format hiệu ứng chuyển động & màu sắc ngẫu nhiên bên trái */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-rose-100/80 dark:border-rose-900/30 gap-3 flex-wrap">
                    <div className="flex items-center gap-3 min-w-0">
                      <motion.div
                        animate={{ rotate: [0, -6, 6, 0], scale: [1, 1.07, 0.95, 1], y: [0, 2, -2, 0] }}
                        transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut" }}
                        className="shrink-0"
                      >
                        <ShieldAlert className="w-7 h-7 stroke-[2.4] text-rose-600 dark:text-rose-400 drop-shadow-sm" />
                      </motion.div>
                      <motion.h4 
                        animate={{ opacity: [0.94, 1, 0.94] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                        className="text-xl sm:text-2xl font-black font-play tracking-tight truncate"
                      >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-pink-600 to-red-500 dark:from-rose-400 dark:via-pink-300 dark:to-red-300">
                          {isVi ? "Thách Thức Thị Trường" : "Market Business Challenges"}
                        </span>
                      </motion.h4>
                    </div>
                    
                    <div className="px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200/80 dark:border-rose-800/40 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-1.5 shadow-2xs shrink-0">
                      <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{isVi ? "Cần có giải pháp" : "Requires Strategy"}</span>
                    </div>
                  </div>

                  {/* Subtitle / Description */}
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-5">
                    {isVi 
                      ? "Những yếu tố khách quan từ môi trường kinh doanh đòi hỏi sự chủ động thích ứng và quản trị rủi ro linh hoạt."
                      : "Objective environmental forces demanding proactive agility and flexible risk governance."}
                  </p>

                  {/* Inner Skills Grid (Dưới kích thước desktop hiển thị 1 cột, trên desktop 2 cột) */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-3.5">
                    {THREATS_DATA.map((item, index) => {
                      const ItemIcon = getSkillIcon(item.iconName);
                      return (
                        <div 
                          key={item.id} 
                          className="bg-white dark:bg-slate-950/70 border border-slate-100 dark:border-white/10 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between gap-2.5 shadow-xs hover:shadow-md hover:border-rose-200 dark:hover:border-rose-700/50 transition-all duration-300 group/item"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <ItemIcon className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 font-play truncate" title={isVi ? item.labelVi : item.labelEn}>
                                {isVi ? item.labelVi : item.labelEn}
                              </span>
                            </div>
                            
                            {/* CRITICAL UX: Label 'Mức độ tác động' for Threat percentage */}
                            <span 
                              className="px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200/60 dark:border-rose-800/40 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold shrink-0"
                              title={isVi ? "Mức độ tác động: " + item.percent + "%" : "Impact level: " + item.percent + "%"}
                            >
                              {item.percent}%
                            </span>
                          </div>

                          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.percent}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.85, ease: "easeOut", delay: index * 0.05 }}
                              className="h-full bg-gradient-to-r from-rose-500 to-red-600 rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

            </div>

            {/* 5. NĂNG LỰC NGÔN NGỮ (LANGUAGES PROFICIENCY - EMERALD THEME) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              style={{ borderRadius: "var(--theme-radius-card, 24px)" }}
              className="w-full p-6 sm:p-7 border select-none flex flex-col gap-5 text-left transition-all duration-300 rounded-[var(--theme-radius-card,24px)] bg-white/95 dark:bg-slate-900/90 border-emerald-100 dark:border-emerald-900/30 shadow-[0_10px_30px_rgba(16,185,129,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]"
            >
              {/* Card Header: Icon (không đóng khung) + Tiêu đề 4 chữ format hiệu ứng chuyển động & màu sắc ngẫu nhiên bên trái */}
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100/60 dark:border-emerald-900/30 gap-3 flex-wrap">
                <div className="flex items-center gap-3 min-w-0">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.08, 0.96, 1], y: [0, -2, 2, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="shrink-0"
                  >
                    <MessageSquare className="w-7 h-7 stroke-[2.4] text-emerald-600 dark:text-emerald-400 drop-shadow-sm" />
                  </motion.div>
                  <motion.h4 
                    animate={{ opacity: [0.94, 1, 0.94] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="text-xl sm:text-2xl font-black font-play tracking-tight truncate"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-300">
                      {isVi ? "Năng Lực Ngôn Ngữ" : "Global Language Matrix"}
                    </span>
                  </motion.h4>
                </div>

                <div className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5 shadow-2xs shrink-0">
                  <Globe className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{isVi ? "Giao tiếp toàn cầu" : "Global Communication"}</span>
                </div>
              </div>

              {/* 3 Circular Language Cards Matching image.png */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Column 1: Tiếng Việt */}
                <div className="bg-white dark:bg-slate-950/70 border border-slate-100 dark:border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-4 shadow-xs hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <Star className="w-5 h-5 text-rose-500 fill-rose-500 shrink-0 mt-0.5" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-rose-600 dark:text-rose-400 text-sm sm:text-base font-play">
                          {isVi ? "Tiếng Việt" : "Vietnamese"}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          ({isVi ? "Ngôn ngữ bản xứ" : "Native language"})
                        </span>
                      </div>
                    </div>
                    <CircularProgressRing 
                      percent={90} 
                      strokeColor="text-rose-500" 
                      trackColor="text-rose-100 dark:text-rose-950/40" 
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-150/60 dark:border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-400 font-play">
                      {isVi ? "Thành thạo chuyên sâu" : "Native / Expert fluency"}
                    </span>
                  </div>
                </div>

                {/* Column 2: Tiếng Anh */}
                <div className="bg-white dark:bg-slate-950/70 border border-slate-100 dark:border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-4 shadow-xs hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <Globe className="w-5 h-5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-blue-600 dark:text-cyan-400 text-sm sm:text-base font-play">
                          {isVi ? "Tiếng Anh" : "English"}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          ({isVi ? "Giao tiếp chuyên nghiệp" : "Professional communication"})
                        </span>
                      </div>
                    </div>
                    <CircularProgressRing 
                      percent={60} 
                      strokeColor="text-blue-600 dark:text-cyan-400" 
                      trackColor="text-blue-100 dark:text-blue-950/40" 
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-150/60 dark:border-slate-800/80">
                    <User className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-blue-600 dark:text-cyan-400 font-play">
                      {isVi ? "Làm việc môi trường quốc tế" : "Working in global environments"}
                    </span>
                  </div>
                </div>

                {/* Column 3: Ứng dụng AI */}
                <div className="bg-white dark:bg-slate-950/70 border border-slate-100 dark:border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-4 shadow-xs hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm sm:text-base font-play">
                          {isVi ? "Ứng dụng AI" : "AI Application"}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-tight">
                          ({isVi ? "Hỗ trợ trao đổi & hợp tác đa quốc gia" : "Assisting multi-national collaboration"})
                        </span>
                      </div>
                    </div>
                    <CircularProgressRing 
                      percent={85} 
                      strokeColor="text-emerald-600 dark:text-emerald-400" 
                      trackColor="text-emerald-100 dark:text-emerald-950/40" 
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-150/60 dark:border-slate-800/80">
                    <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 font-play">
                      {isVi ? "Dịch thuật & Trợ lý thời gian thực" : "Real-time translation & AI assistant"}
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

      </div>
    </section>
  );
}

export default Skills;
