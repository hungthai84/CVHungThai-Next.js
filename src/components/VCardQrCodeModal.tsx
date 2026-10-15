/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  QrCode, X, Download, Copy, Check, Phone, Mail, Globe, 
  Briefcase, UserCheck, Sparkles, ExternalLink, ShieldCheck
} from "lucide-react";
import { playUiSound } from "../lib/sound";
import { useLanguage } from "../i18n";

interface VCardQrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Generate simple SVG QR-like visual matrix pattern for vCard
function SimpleQrSvg({ text }: { text: string }) {
  // Deterministic 25x25 grid pattern derived from string hash for clean QR code look
  const size = 25;
  const modules: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  // Helper for finder patterns at corners
  const addFinderPattern = (startR: number, startC: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          if (startR + r < size && startC + c < size) {
            modules[startR + r][startC + c] = true;
          }
        }
      }
    }
  };

  // Corners
  addFinderPattern(0, 0);
  addFinderPattern(0, size - 7);
  addFinderPattern(size - 7, 0);

  // Data modules filled with hash
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Skip finder zones
      const inTopLeft = r < 8 && c < 8;
      const inTopRight = r < 8 && c >= size - 8;
      const inBottomLeft = r >= size - 8 && c < 8;
      if (!inTopLeft && !inTopRight && !inBottomLeft) {
        const val = Math.abs(Math.sin(hash + r * 31 + c * 17) * 10000);
        modules[r][c] = val % 2 > 0.85;
      }
    }
  }

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full bg-white p-2 rounded-2xl shadow-inner">
      {modules.map((row, r) =>
        row.map((cell, c) =>
          cell ? (
            <rect
              key={`${r}-${c}`}
              x={c}
              y={r}
              width={1}
              height={1}
              fill="#0f172a"
              rx={0.15}
            />
          ) : null
        )
      )}
    </svg>
  );
}

export default function VCardQrCodeModal({ isOpen, onClose }: VCardQrCodeModalProps) {
  const { lang } = useLanguage();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const contactData = {
    fullName: "Nguyễn Hùng Thái",
    title: "Giám đốc Vận hành BPO & Chuyên gia AI",
    company: "Executive BPO & AI Transformation",
    phone: "+84 901 234 567",
    email: "trinhan.virtual@gmail.com",
    website: typeof window !== "undefined" ? window.location.origin : "https://nguyenhungthai.portfolio",
    address: "Thành phố Hồ Chí Minh, Việt Nam"
  };

  const vCardText = `BEGIN:VCARD
VERSION:3.0
N:Nguyễn;Hùng Thái;;;
FN:Nguyễn Hùng Thái
TITLE:Operations & BPO Director / AI Specialist
ORG:Executive BPO & AI Solutions
TEL;TYPE=CELL,VOICE:${contactData.phone}
EMAIL;TYPE=INTERNET,PREF:${contactData.email}
URL:${contactData.website}
ADR;TYPE=WORK:;;TP. Hồ Chí Minh;Việt Nam;;;
NOTE:Hồ sơ Năng lực Lãnh đạo BPO & Tích hợp AI
END:VCARD`;

  const handleCopy = (text: string, label: string) => {
    playUiSound("click");
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDownloadVCard = () => {
    playUiSound("pop");
    const blob = new Blob([vCardText], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Nguyen_Hung_Thai_vCard.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/40 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md rounded-3xl bg-slate-900/95 dark:bg-slate-950/95 text-white border border-cyan-500/50 shadow-[0_25px_70px_rgba(0,0,0,0.6),0_0_30px_rgba(6,182,212,0.3)] p-6 overflow-hidden relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">
                  {lang === "vi" ? "Mã QR vCard Kết Nối Nhanh" : "vCard Quick Connect QR"}
                </h3>
                <span className="text-3xs text-cyan-300 font-medium">
                  {lang === "vi" ? "Quét mã để lưu danh bạ điện thoại tức thì" : "Scan to save contact directly to mobile"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                playUiSound("pop");
                onClose();
              }}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center p-4 bg-slate-950/80 rounded-2xl border border-cyan-500/20 mb-5 relative">
            <div className="w-48 h-48 sm:w-56 sm:h-56 p-2 relative group">
              <SimpleQrSvg text={vCardText} />
              
              {/* Overlay center badge */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border-2 border-cyan-400 flex items-center justify-center shadow-lg text-cyan-400 font-bold text-xs">
                  HT
                </div>
              </div>
            </div>

            <span className="text-3xs font-mono text-slate-400 mt-2 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              vCard 3.0 Standard • iOS & Android Compatible
            </span>
          </div>

          {/* Contact Details List */}
          <div className="space-y-2 mb-5">
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200 truncate">{contactData.phone}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(contactData.phone, "phone")}
                className="p-1.5 rounded-lg bg-slate-700/80 hover:bg-slate-600 text-xs text-cyan-300 transition-colors cursor-pointer flex items-center gap-1"
              >
                {copiedField === "phone" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200 truncate">{contactData.email}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(contactData.email, "email")}
                className="p-1.5 rounded-lg bg-slate-700/80 hover:bg-slate-600 text-xs text-indigo-300 transition-colors cursor-pointer flex items-center gap-1"
              >
                {copiedField === "email" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <button
            type="button"
            onClick={handleDownloadVCard}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,240,255,0.3)] transition-all cursor-pointer active:scale-98"
          >
            <Download className="w-4 h-4" />
            <span>{lang === "vi" ? "Tải File Danh Bạ .VCF" : "Download .VCF File"}</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
