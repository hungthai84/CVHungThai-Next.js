/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calculator, DollarSign, Users, Globe, Award, Sparkles, 
  X, Check, Copy, Download, HelpCircle, Briefcase, TrendingUp
} from "lucide-react";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";

export default function AiSalaryCalculatorModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  // Calculator inputs
  const [roleLevel, setRoleLevel] = useState<"director" | "senior_manager" | "ai_lead">("director");
  const [teamSize, setTeamSize] = useState<number>(250);
  const [geography, setGeography] = useState<"vietnam" | "apac" | "global">("vietnam");
  const [includeEquity, setIncludeEquity] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Computations
  const calcResults = useMemo(() => {
    let baseUsdMonth = 4500;
    if (roleLevel === "director") baseUsdMonth = 6500;
    if (roleLevel === "senior_manager") baseUsdMonth = 4800;
    if (roleLevel === "ai_lead") baseUsdMonth = 5200;

    // Team size multiplier
    const teamMultiplier = Math.min(1.8, 1 + (teamSize / 500) * 0.4);
    
    // Geo multiplier
    let geoMultiplier = 1.0;
    if (geography === "apac") geoMultiplier = 1.35;
    if (geography === "global") geoMultiplier = 1.65;

    const adjustedUsdMonth = Math.round(baseUsdMonth * teamMultiplier * geoMultiplier);
    const baseVndMonth = Math.round(adjustedUsdMonth * 25400);

    const bonusPercent = roleLevel === "director" ? 25 : roleLevel === "senior_manager" ? 18 : 20;
    const annualBaseUsd = adjustedUsdMonth * 12;
    const bonusUsd = Math.round((annualBaseUsd * bonusPercent) / 100);
    const totalAnnualUsd = annualBaseUsd + bonusUsd;
    const totalAnnualVnd = Math.round(totalAnnualUsd * 25400);

    return {
      monthlyUsd: adjustedUsdMonth,
      monthlyVnd: baseVndMonth,
      bonusPercent,
      bonusUsd,
      annualTotalUsd: totalAnnualUsd,
      annualTotalVnd: totalAnnualVnd
    };
  }, [roleLevel, teamSize, geography]);

  const handleCopy = () => {
    try { playUiSound("click"); } catch {}
    const text = `
=== AI SALARY & COMPENSATION PROPOSAL ===
Role: ${roleLevel.toUpperCase()}
Managed Team: ${teamSize} FTEs
Geography: ${geography.toUpperCase()}
----------------------------------------
Base Salary (Monthly): $${calcResults.monthlyUsd.toLocaleString()} (~${(calcResults.monthlyVnd / 1000000).toFixed(0)}M VND)
Annual Performance Bonus: ${calcResults.bonusPercent}% ($${calcResults.bonusUsd.toLocaleString()})
Total Annual Budget: $${calcResults.annualTotalUsd.toLocaleString()} (~${(calcResults.annualTotalVnd / 1000000000).toFixed(2)}B VND)
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn font-play"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 text-emerald-500 border border-emerald-500/30">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                <span>{isVi ? "AI Salary & Compensation Calculator" : "AI Executive Salary & Compensation Calculator"}</span>
              </h2>
              <p className="text-caption text-slate-500 dark:text-slate-400">
                {isVi ? "Tính toán ngân sách & đãi ngộ tối ưu theo quy mô vị trí quản lý" : "Calculate optimal salary budget for C-Level & Operations leadership"}
              </p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Position Level */}
          <div className="space-y-1.5">
            <label className="text-2xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-emerald-500" />
              <span>{isVi ? "Vị trí tuyển dụng:" : "Target Position:"}</span>
            </label>
            <select
              value={roleLevel}
              onChange={(e) => setRoleLevel(e.target.value as any)}
              className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none"
            >
              <option value="director">{isVi ? "Operations Director / Giám đốc Vận hành" : "Operations Director"}</option>
              <option value="senior_manager">{isVi ? "BPO Senior Operations Manager" : "BPO Senior Operations Manager"}</option>
              <option value="ai_lead">{isVi ? "AI Solutions & Automation Lead" : "AI Solutions & Automation Lead"}</option>
            </select>
          </div>

          {/* Geography */}
          <div className="space-y-1.5">
            <label className="text-2xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>{isVi ? "Thị trường & Địa điểm:" : "Market Geography:"}</span>
            </label>
            <select
              value={geography}
              onChange={(e) => setGeography(e.target.value as any)}
              className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none"
            >
              <option value="vietnam">{isVi ? "Việt Nam (Hồ Chí Minh / Hà Nội)" : "Vietnam (HCMC / Hanoi)"}</option>
              <option value="apac">{isVi ? "Khu vực APAC (Singapore / Malaysia / Philippines)" : "APAC Region"}</option>
              <option value="global">{isVi ? "Toàn cầu (US / EU Remote Hybrid)" : "Global / US / EU Hybrid"}</option>
            </select>
          </div>

          {/* Team Size Slider */}
          <div className="md:col-span-2 space-y-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-white">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-purple-500" />
                <span>{isVi ? "Quy mô nhân sự quản lý (FTEs):" : "Managed Team Size (FTEs):"}</span>
              </span>
              <span className="font-mono text-emerald-500 font-extrabold text-sm">{teamSize} FTEs</span>
            </div>
            <input 
              type="range" 
              min={20} 
              max={1500} 
              step={10} 
              value={teamSize} 
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-3xs font-mono text-slate-400">
              <span>20 FTEs</span>
              <span>500 FTEs</span>
              <span>1500+ FTEs</span>
            </div>
          </div>

        </div>

        {/* Calculation Output Cards */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/30 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
            
            <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80">
              <span className="text-3xs font-bold text-slate-500 uppercase block mb-1">
                {isVi ? "Lương cứng hàng tháng" : "Monthly Base Salary"}
              </span>
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono block">
                ${calcResults.monthlyUsd.toLocaleString()}
              </span>
              <span className="text-3xs text-slate-400 font-mono">
                ~{(calcResults.monthlyVnd / 1000000).toFixed(0)}M VND
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80">
              <span className="text-3xs font-bold text-slate-500 uppercase block mb-1">
                {isVi ? "Thưởng hiệu suất KPI" : "KPI Annual Bonus"}
              </span>
              <span className="text-lg font-black text-amber-500 font-mono block">
                {calcResults.bonusPercent}%
              </span>
              <span className="text-3xs text-slate-400 font-mono">
                +${calcResults.bonusUsd.toLocaleString()}
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80">
              <span className="text-3xs font-bold text-slate-500 uppercase block mb-1">
                {isVi ? "Tổng Ngân sách / Năm" : "Total Annual Budget"}
              </span>
              <span className="text-lg font-black text-cyan-500 font-mono block">
                ${calcResults.annualTotalUsd.toLocaleString()}
              </span>
              <span className="text-3xs text-slate-400 font-mono">
                ~{(calcResults.annualTotalVnd / 1000000000).toFixed(2)}B VND
              </span>
            </div>

          </div>

          <div className="flex items-center justify-between pt-2 border-t border-emerald-500/20">
            <span className="text-3xs text-slate-500 dark:text-slate-400">
              * {isVi ? "Kết quả được tự động điều chỉnh theo benchmark thị trường BPO 2026." : "Based on 2026 BPO market leadership benchmarks."}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (isVi ? "Đã sao chép!" : "Copied!") : (isVi ? "Sao chép đề xuất" : "Copy Proposal")}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
