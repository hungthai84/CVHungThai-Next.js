'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Award, Clock, Activity, Cpu, Layers, Zap, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n';
import { cn } from '../lib/utils';

export interface SkillChartData {
  id: string;
  nameVi: string;
  nameEn: string;
  percentage: number;
  yearsOfExperience?: number;
  levelVi?: string;
  levelEn?: string;
  tools?: string[];
  colorGradient?: string;
  accentColor?: string;
  breakdown?: {
    practical: number;
    architecture: number;
    optimization: number;
    automation: number;
  };
}

interface SkillHoverProgressChartProps {
  skill: SkillChartData;
  className?: string;
  barGradient?: string;
  accentColor?: string;
  compact?: boolean;
}

export function SkillHoverProgressChart({
  skill,
  className = '',
  barGradient = 'from-purple-500 via-indigo-500 to-cyan-400',
  accentColor = '#8b5cf6',
  compact = false,
}: SkillHoverProgressChartProps) {
  const { lang, language } = useLanguage();
  const isVi = (language || lang) === 'vi';
  const [isHovered, setIsHovered] = useState(false);

  // Compute realistic years of experience based on percentage if not explicitly passed
  const years = skill.yearsOfExperience ?? Math.max(3, Math.round((skill.percentage / 100) * 10));

  // Compute 4-dimension proficiency breakdown if not explicitly passed
  const breakdown = skill.breakdown ?? {
    practical: Math.min(99, skill.percentage + 2),
    architecture: Math.max(70, skill.percentage - 3),
    optimization: Math.max(75, skill.percentage - 1),
    automation: Math.max(65, skill.percentage - 5),
  };

  // Determine proficiency tier title
  const getTier = (pct: number) => {
    if (pct >= 95) return isVi ? 'Chuyên Gia Cấp Cao (Mastery)' : 'Mastery (Senior Expert)';
    if (pct >= 90) return isVi ? 'Thành Thạo Xuất Sắc (Expert)' : 'Expert Proficiency';
    if (pct >= 85) return isVi ? 'Vận Dụng Nâng Cao (Advanced)' : 'Advanced Specialist';
    return isVi ? 'Chuyên Môn Thực Chiến (Proficient)' : 'Proficient Practitioner';
  };

  const tierTitle = skill.levelVi ? (isVi ? skill.levelVi : (skill.levelEn || skill.levelVi)) : getTier(skill.percentage);

  // Circular gauge calculations
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (skill.percentage / 100) * circumference;

  const skillName = isVi ? skill.nameVi : skill.nameEn;
  const valueText = `${skillName}: ${skill.percentage}%, ${tierTitle}, ${years}+ ${isVi ? 'năm kinh nghiệm' : 'years of experience'}`;

  return (
    <div
      className={cn('relative group/skillbar w-full select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg p-0.5', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      role="region"
      aria-label={valueText}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsHovered((prev) => !prev);
        } else if (e.key === 'Escape') {
          setIsHovered(false);
        }
      }}
    >
      {/* 1. Normal Bar Display (with dynamic hover glow) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-caption font-medium">
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-3xs font-mono font-bold bg-purple-500/10 dark:bg-purple-400/15 text-purple-700 dark:text-purple-300 border border-purple-500/20">
              <Clock className="w-2.5 h-2.5" aria-hidden="true" />
              <span>{years}+ {isVi ? 'năm' : 'yrs'}</span>
            </span>
            <span className="text-3xs text-slate-500 dark:text-slate-400 truncate max-w-[130px] sm:max-w-[170px]">
              {tierTitle}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-3xs font-mono font-black text-slate-700 dark:text-slate-200 tabular-nums">
              {skill.percentage}%
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover/skillbar:animate-ping" aria-hidden="true" />
          </div>
        </div>

        {/* Progress Track */}
        <div 
          role="progressbar"
          aria-valuenow={skill.percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${skillName} - ${tierTitle}`}
          aria-valuetext={valueText}
          className="relative w-full h-2 rounded-full bg-slate-200/80 dark:bg-slate-800/80 overflow-hidden p-[1px]"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.percentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className={cn(
              'h-full rounded-full bg-gradient-to-r relative transition-all duration-300',
              barGradient,
              isHovered && 'shadow-[0_0_12px_rgba(139,92,246,0.8)]'
            )}
          >
            {/* Shimmer light bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]" aria-hidden="true" />
          </motion.div>
        </div>
      </div>

      {/* 2. Hover-Triggered Interactive Modal/Popover Chart Visualizer */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            role="tooltip"
            aria-live="polite"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+10px)] z-50 w-72 sm:w-80 p-3.5 rounded-2xl bg-white/95 dark:bg-slate-950/95 border border-purple-500/40 dark:border-cyan-500/40 shadow-[0_16px_40px_rgba(0,0,0,0.35),0_0_25px_rgba(139,92,246,0.25)] backdrop-blur-2xl pointer-events-none text-left"
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-200/70 dark:border-white/10">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-xs shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-black text-slate-900 dark:text-white truncate">
                    {isVi ? skill.nameVi : skill.nameEn}
                  </h4>
                  <span className="text-3xs font-semibold text-purple-600 dark:text-purple-400 truncate block">
                    {tierTitle}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-base font-black font-mono bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  {skill.percentage}%
                </span>
              </div>
            </div>

            {/* Experience Gauge & Radial Chart Preview */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {/* Box 1: Experience Years */}
              <div className="p-2 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-3xs text-slate-500 dark:text-slate-400 block truncate">
                    {isVi ? 'Kinh Nghiệm' : 'Experience'}
                  </span>
                  <span className="text-xs font-black text-slate-900 dark:text-white font-mono">
                    {years}+ {isVi ? 'Năm Thực Chiến' : 'Years'}
                  </span>
                </div>
              </div>

              {/* Box 2: Mastery Level */}
              <div className="p-2 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-3xs text-slate-500 dark:text-slate-400 block truncate">
                    {isVi ? 'Độ Thành Thạo' : 'Proficiency'}
                  </span>
                  <span className="text-xs font-black text-cyan-600 dark:text-cyan-300 font-mono">
                    Tier {skill.percentage >= 90 ? 'A+' : 'A'} ({skill.percentage}%)
                  </span>
                </div>
              </div>
            </div>

            {/* 4-Dimension Metric Breakdown Progress Bars */}
            <div className="space-y-1.5 mb-2.5">
              <span className="text-3xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <Activity className="w-3 h-3 text-purple-500" />
                {isVi ? 'Biểu Đồ Năng Lực 4 Chiều:' : '4D Skill Matrix Breakdown:'}
              </span>

              {[
                { labelVi: 'Vận hành thực chiến', labelEn: 'Practical Execution', value: breakdown.practical, color: 'from-emerald-500 to-teal-400' },
                { labelVi: 'Kiến trúc & Hệ thống', labelEn: 'System Architecture', value: breakdown.architecture, color: 'from-blue-500 to-indigo-500' },
                { labelVi: 'Tối ưu hóa & Đo lường', labelEn: 'Optimization & QA', value: breakdown.optimization, color: 'from-purple-500 to-pink-500' },
                { labelVi: 'Tự động hóa & GenAI', labelEn: 'Automation & AI', value: breakdown.automation, color: 'from-amber-500 to-orange-400' },
              ].map((dim, dIdx) => (
                <div key={dIdx} className="space-y-0.5">
                  <div className="flex items-center justify-between text-3xs font-medium">
                    <span className="text-slate-600 dark:text-slate-300 truncate">
                      {isVi ? dim.labelVi : dim.labelEn}
                    </span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {dim.value}%
                    </span>
                  </div>
                  <div className="w-full h-1 bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${dim.value}%` }}
                      transition={{ duration: 0.4, delay: dIdx * 0.04 }}
                      className={cn('h-full rounded-full bg-gradient-to-r', dim.color)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Tools chip row if provided */}
            {skill.tools && skill.tools.length > 0 && (
              <div className="pt-2 border-t border-slate-200/60 dark:border-white/10">
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-3xs text-slate-400 mr-1 font-semibold">{isVi ? 'Công cụ:' : 'Tools:'}</span>
                  {skill.tools.slice(0, 4).map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-1.5 py-0.2 rounded text-3xs font-mono font-medium bg-purple-500/10 dark:bg-white/10 text-purple-700 dark:text-purple-300 border border-purple-500/20"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Arrow Pin at bottom */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2.5 h-2.5 bg-white/95 dark:bg-slate-950/95 rotate-45 border-r border-b border-purple-500/40 dark:border-cyan-500/40" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SkillHoverProgressChart;
