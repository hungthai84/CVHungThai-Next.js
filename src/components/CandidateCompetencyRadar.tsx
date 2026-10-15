/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Target, Award, Sparkles, CheckCircle2, ChevronRight, BarChart3, HelpCircle } from "lucide-react";
import { playUiSound } from "../lib/sound";
import { useLanguage } from "../i18n";

interface CompetencyItem {
  key: string;
  labelVi: string;
  labelEn: string;
  score: number; // 0-100
}

interface BenchmarkRole {
  id: string;
  nameVi: string;
  nameEn: string;
  scores: Record<string, number>;
}

const COMPETENCIES: CompetencyItem[] = [
  { key: "ops", labelVi: "Vận hành BPO", labelEn: "BPO Operations", score: 98 },
  { key: "people", labelVi: "Quản trị Nhân sự", labelEn: "People & Scale", score: 95 },
  { key: "ai", labelVi: "Tích hợp AI & Bot", labelEn: "AI & Automation", score: 96 },
  { key: "leadership", labelVi: "Lãnh đạo Chiến lược", labelEn: "Strategic Leadership", score: 92 },
  { key: "optimization", labelVi: "Tối ưu Quy trình", labelEn: "Process Optimization", score: 94 },
  { key: "tech", labelVi: "Công nghệ & Sub-systems", labelEn: "Tech Architecture", score: 90 },
  { key: "comm", labelVi: "Tiếng Anh & Đối ngoại", labelEn: "English & Stakeholder", score: 95 },
];

const BENCHMARK_ROLES: BenchmarkRole[] = [
  {
    id: "bpo_director",
    nameVi: "Giám đốc Vận hành BPO (BPO Director)",
    nameEn: "BPO Operations Director",
    scores: { ops: 95, people: 90, ai: 85, leadership: 90, optimization: 90, tech: 80, comm: 90 }
  },
  {
    id: "ai_lead",
    nameVi: "Chuyên gia Tích hợp AI (AI Lead)",
    nameEn: "AI Integration Lead",
    scores: { ops: 80, people: 75, ai: 95, leadership: 85, optimization: 90, tech: 95, comm: 85 }
  },
  {
    id: "coo",
    nameVi: "Giám đốc Điều hành (COO)",
    nameEn: "Chief Operating Officer (COO)",
    scores: { ops: 92, people: 92, ai: 88, leadership: 95, optimization: 92, tech: 82, comm: 92 }
  }
];

export default function CandidateCompetencyRadar() {
  const { lang } = useLanguage();
  const [selectedRoleId, setSelectedRoleId] = useState<string>("bpo_director");
  const [activeHoverKey, setActiveHoverKey] = useState<string | null>(null);

  const selectedRole = BENCHMARK_ROLES.find((r) => r.id === selectedRoleId) || BENCHMARK_ROLES[0];

  // SVG Radar Dimensions
  const size = 320;
  const center = size / 2;
  const radius = size * 0.38;
  const numItems = COMPETENCIES.length;

  // Compute polar coordinates
  const getCoordinates = (index: number, valuePct: number) => {
    const angle = (Math.PI * 2 * index) / numItems - Math.PI / 2;
    const r = (valuePct / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Generate SVG Polygon path for Candidate scores
  const candidatePoints = COMPETENCIES.map((c, i) => {
    const { x, y } = getCoordinates(i, c.score);
    return `${x},${y}`;
  }).join(" ");

  // Generate SVG Polygon path for Benchmark scores
  const benchmarkPoints = COMPETENCIES.map((c, i) => {
    const benchmarkScore = selectedRole.scores[c.key] || 80;
    const { x, y } = getCoordinates(i, benchmarkScore);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="w-full rounded-3xl bg-slate-900/90 text-white border border-cyan-500/30 p-4 sm:p-6 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] my-4">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span>{lang === "vi" ? "Biểu Đồ So Sánh Năng Lực Cốt Lõi" : "Competency Radar Comparison"}</span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </h3>
            <p className="text-xs text-slate-300">
              {lang === "vi" ? "Đối chiếu chỉ số năng lực Hùng Thái với tiêu chuẩn các vị trí cấp cao" : "Benchmark Hung Thai's competencies against executive roles"}
            </p>
          </div>
        </div>

        {/* Role Selector Dropdown */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-cyan-500/30">
          <span className="text-3xs uppercase font-bold text-cyan-300 pl-2">
            {lang === "vi" ? "Đối chiếu với:" : "Benchmark:"}
          </span>
          <select
            value={selectedRoleId}
            onChange={(e) => {
              playUiSound("pop");
              setSelectedRoleId(e.target.value);
            }}
            className="bg-slate-800 text-white text-xs font-bold py-1.5 px-3 rounded-xl border-none outline-none cursor-pointer focus:ring-2 focus:ring-cyan-400"
          >
            {BENCHMARK_ROLES.map((r) => (
              <option key={r.id} value={r.id}>
                {lang === "vi" ? r.nameVi : r.nameEn}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Radar SVG Column */}
        <div className="md:col-span-7 flex flex-col items-center justify-center relative">
          <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
            <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
              {/* Concentric Grid Rings (20%, 40%, 60%, 80%, 100%) */}
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, ringIdx) => (
                <polygon
                  key={ringIdx}
                  points={COMPETENCIES.map((_, i) => {
                    const { x, y } = getCoordinates(i, level * 100);
                    return `${x},${y}`;
                  }).join(" ")}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="1"
                  strokeDasharray={level < 1 ? "3 3" : undefined}
                />
              ))}

              {/* Axis Rays */}
              {COMPETENCIES.map((_, i) => {
                const { x, y } = getCoordinates(i, 100);
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="rgba(255, 255, 255, 0.12)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Benchmark Role Polygon (Dashed Indigo) */}
              <polygon
                points={benchmarkPoints}
                fill="rgba(99, 102, 241, 0.2)"
                stroke="#6366f1"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Candidate Score Polygon (Solid Cyan Glow) */}
              <polygon
                points={candidatePoints}
                fill="rgba(6, 182, 212, 0.35)"
                stroke="#06b6d4"
                strokeWidth="3"
                className="transition-all duration-300"
              />

              {/* Candidate Points Circles */}
              {COMPETENCIES.map((c, i) => {
                const { x, y } = getCoordinates(i, c.score);
                const isHovered = activeHoverKey === c.key;
                return (
                  <g key={i} className="cursor-pointer" onMouseEnter={() => setActiveHoverKey(c.key)}>
                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered ? 7 : 4.5}
                      fill="#06b6d4"
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="transition-all duration-200"
                    />
                  </g>
                );
              })}

              {/* Labels around chart */}
              {COMPETENCIES.map((c, i) => {
                const { x, y, angle } = getCoordinates(i, 118);
                const isHovered = activeHoverKey === c.key;
                return (
                  <text
                    key={i}
                    x={x}
                    y={y}
                    textAnchor={Math.abs(Math.cos(angle)) < 0.1 ? "middle" : Math.cos(angle) > 0 ? "start" : "end"}
                    dominantBaseline="middle"
                    className={`text-[9.5px] font-bold transition-colors cursor-pointer ${
                      isHovered ? "fill-cyan-300 font-black" : "fill-slate-300"
                    }`}
                    onMouseEnter={() => setActiveHoverKey(c.key)}
                  >
                    {lang === "vi" ? c.labelVi : c.labelEn}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-bold">
              <span className="w-3 h-3 rounded-full bg-cyan-500 border border-white" />
              <span>Hùng Thái (Actual)</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-bold">
              <span className="w-3 h-3 rounded-full bg-indigo-500 border border-white border-dashed" />
              <span>{lang === "vi" ? selectedRole.nameVi : selectedRole.nameEn}</span>
            </div>
          </div>
        </div>

        {/* Details Metrics Column */}
        <div className="md:col-span-5 space-y-2">
          {COMPETENCIES.map((c) => {
            const bench = selectedRole.scores[c.key] || 80;
            const diff = c.score - bench;
            const isHovered = activeHoverKey === c.key;

            return (
              <div
                key={c.key}
                onMouseEnter={() => setActiveHoverKey(c.key)}
                onMouseLeave={() => setActiveHoverKey(null)}
                className={`p-2.5 rounded-2xl transition-all cursor-pointer border ${
                  isHovered 
                    ? "bg-cyan-950/80 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]" 
                    : "bg-slate-950/60 border-white/5 hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className={isHovered ? "text-cyan-300" : "text-slate-200"}>
                    {lang === "vi" ? c.labelVi : c.labelEn}
                  </span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-cyan-400">{c.score}%</span>
                    <span className="text-slate-400 text-3xs">vs {bench}%</span>
                    {diff >= 0 ? (
                      <span className="text-emerald-400 text-3xs font-bold">+{diff}%</span>
                    ) : (
                      <span className="text-rose-400 text-3xs font-bold">{diff}%</span>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-800 relative overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                    style={{ width: `${c.score}%` }}
                  />
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-10"
                    style={{ left: `${bench}%` }}
                    title={`Benchmark: ${bench}%`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
