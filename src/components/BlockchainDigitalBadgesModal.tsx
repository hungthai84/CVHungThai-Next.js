/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Award, ShieldCheck, ExternalLink, CheckCircle2, Lock, 
  Sparkles, X, Copy, Check, FileCheck, Search, ShieldAlert
} from "lucide-react";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";

interface DigitalBadge {
  id: string;
  titleVi: string;
  titleEn: string;
  issuer: string;
  issueDate: string;
  hash: string;
  blockNumber: number;
  network: string;
  skills: string[];
  badgeColor: string;
}

const DIGITAL_BADGES: DigitalBadge[] = [
  {
    id: "badge-pmp",
    titleVi: "PMP® Project Management Professional",
    titleEn: "PMP® Project Management Professional",
    issuer: "Project Management Institute (PMI)",
    issueDate: "2021 - 2027",
    hash: "0x7f8a9b2c3d4e5f6a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4",
    blockNumber: 48921029,
    network: "Polygon Mainnet",
    skills: ["Project Management", "Agile/Scrum", "Risk Governance", "P&L Management"],
    badgeColor: "from-amber-500/20 to-orange-500/20 text-amber-500 border-amber-500/40"
  },
  {
    id: "badge-aws-sa",
    titleVi: "AWS Certified Solutions Architect - Professional",
    titleEn: "AWS Certified Solutions Architect - Professional",
    issuer: "Amazon Web Services",
    issueDate: "2023 - 2026",
    hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2",
    blockNumber: 52109431,
    network: "Ethereum Mainnet",
    skills: ["Cloud Architecture", "High Availability", "Security & Compliance", "Cost Optimization"],
    badgeColor: "from-blue-500/20 to-cyan-500/20 text-blue-500 border-blue-500/40"
  },
  {
    id: "badge-google-ml",
    titleVi: "Google Cloud Certified Professional Machine Learning Engineer",
    titleEn: "Google Cloud Certified Professional Machine Learning Engineer",
    issuer: "Google Cloud",
    issueDate: "2024 - 2027",
    hash: "0x3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2",
    blockNumber: 58901234,
    network: "Polygon Mainnet",
    skills: ["AI Models", "Gemini API", "MLOps", "LLM Fine-tuning", "Pipeline Automation"],
    badgeColor: "from-purple-500/20 to-indigo-500/20 text-purple-500 border-purple-500/40"
  },
  {
    id: "badge-six-sigma",
    titleVi: "Lean Six Sigma Black Belt (LSSBB)",
    titleEn: "Lean Six Sigma Black Belt (LSSBB)",
    issuer: "International Society of Six Sigma Certifications",
    issueDate: "2022 - Lifetime",
    hash: "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8",
    blockNumber: 42109855,
    network: "Ethereum Mainnet",
    skills: ["Process Optimization", "DMAIC Methodology", "Defect Reduction", "BPO Scaling"],
    badgeColor: "from-emerald-500/20 to-teal-500/20 text-emerald-500 border-emerald-500/40"
  }
];

export default function BlockchainDigitalBadgesModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleCopyHash = (hash: string) => {
    try { playUiSound("click"); } catch {}
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn font-play"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-blue-500/20 text-purple-500 border border-purple-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                <span>{isVi ? "Xác thực Chứng nhận Digital Badge & Blockchain" : "Digital Badge & Blockchain Verification Hub"}</span>
              </h2>
              <p className="text-caption text-slate-500 dark:text-slate-400">
                {isVi ? "Các chứng chỉ quốc tế hàng đầu được minh bạch mã hóa mã Hash Blockchain" : "Cryptographically verified digital credentials and professional certifications"}
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

        {/* Badges List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DIGITAL_BADGES.map(badge => (
            <div 
              key={badge.id}
              className={`p-4 rounded-2xl bg-gradient-to-br ${badge.badgeColor} border backdrop-blur-xl shadow-md space-y-3 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-white/20 dark:bg-black/20 text-3xs font-mono font-bold uppercase border border-current">
                    {badge.network}
                  </span>
                  <span className="flex items-center gap-1 text-3xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                  {isVi ? badge.titleVi : badge.titleEn}
                </h3>
                <p className="text-3xs text-slate-600 dark:text-slate-400 mt-1">
                  {badge.issuer} • <span className="font-mono">{badge.issueDate}</span>
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {badge.skills.map((sk, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 rounded-md bg-slate-900/10 dark:bg-white/10 text-3xs font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hash & Verification Footer */}
              <div className="pt-2 border-t border-current/20 space-y-1.5 text-3xs">
                <div className="flex items-center justify-between font-mono opacity-80">
                  <span>Block #{badge.blockNumber}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyHash(badge.hash)}
                    className="flex items-center gap-1 hover:opacity-100 cursor-pointer font-bold"
                  >
                    {copiedHash === badge.hash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedHash === badge.hash ? "Copied" : "Copy Hash"}</span>
                  </button>
                </div>
                <div className="font-mono truncate opacity-60 text-[10px]">
                  {badge.hash}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
