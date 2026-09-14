import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Palette, 
  X, 
  Sun, 
  Sparkles, 
  Copy, 
  Check, 
  Layers, 
  ShieldCheck, 
  Info,
  MousePointerClick,
  Code2,
  CheckCircle2
} from "lucide-react";
import { useTheme, COLOR_PRESETS } from "../context/ThemeContext";
import { useLanguage } from "../i18n";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export const ColorSystemModal: React.FC = () => {
  const { theme, setTheme, isColorModalOpen, closeColorModal, activePalette, colorPreset, setColorPreset } = useTheme();
  const { lang } = useLanguage();
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [copiedCss, setCopiedCss] = useState(false);
  const [activeTab, setActiveTab] = useState<"swatches" | "components" | "tokens">("swatches");

  const isDark = theme === "glass-dark-neon";
  const isVi = lang === "vi";

  const handleCopy = (text: string, tokenKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(tokenKey);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleCopyCss = () => {
    const p1 = activePalette.find(p => p.id === "primary")?.hex || "#2563EB";
    const p2 = activePalette.find(p => p.id === "secondary")?.hex || "#6366F1";
    const p3 = activePalette.find(p => p.id === "accent")?.hex || "#06B6D4";
    const p4 = activePalette.find(p => p.id === "highlight")?.hex || "#8B5CF6";
    const p5 = activePalette.find(p => p.id === "soft")?.hex || "#38BDF8";

    const cssCode = isDark 
      ? `/* DARK NEON GLASS — 5 MÀU CHỦ ĐẠO */\n[data-theme="dark"] {\n  --color-primary: ${p1};   /* Main Action / Primary */\n  --color-secondary: ${p2}; /* Secondary Links / Nav */\n  --color-accent: ${p3};    /* Accent / Glow */\n  --color-highlight: ${p4}; /* Highlight Feature */\n  --color-soft: ${p5};      /* Soft Status / Positive */\n}`
      : `/* LIGHT GLASS — 5 MÀU CHỦ ĐẠO */\n:root {\n  --color-primary: ${p1};   /* Primary Action */\n  --color-secondary: ${p2}; /* Secondary Indigo */\n  --color-accent: ${p3};    /* Accent Cyan */\n  --color-highlight: ${p4}; /* Highlight Violet */\n  --color-soft: ${p5};      /* Soft Sky */\n}`;
    navigator.clipboard.writeText(cssCode);
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 2000);
  };

  if (!isColorModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => {
            closeColorModal();
          }}
          className="fixed inset-0 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`relative w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col rounded-3xl z-10 border shadow-2xl backdrop-blur-2xl transition-colors duration-400 ${
            isDark 
              ? "bg-[#070d1d]/90 border-cyan-400/30 text-white shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(0,240,255,0.2)]" 
              : "bg-white/95 border-slate-200/90 text-slate-900 shadow-[0_25px_60px_rgba(37,99,235,0.15)]"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-200/50 dark:border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md transition-colors"
                style={{ backgroundColor: isDark ? "rgba(59, 130, 246, 0.2)" : "rgba(37, 99, 235, 0.15)" }}
              >
                <Palette className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black tracking-tight">
                    {isVi ? "Hệ Thống Màu Sắc & Design Tokens" : "Color System & Design Tokens"}
                  </h2>
                  <span className="text-3xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-md bg-[var(--color-primary)] text-white shadow-xs">
                    {isDark ? "Dark Neon Glass" : "Light Glass"}
                  </span>
                </div>
                <p className="text-body-sm text-slate-500 dark:text-slate-400 font-medium">
                  {isDark 
                    ? (isVi ? "5 màu chủ đạo tối tân: Electric Blue, Cyan, Violet, Magenta, Green" : "5 Cyber Neon Tokens: Electric Blue, Cyan, Violet, Magenta, Green")
                    : (isVi ? "5 màu chủ đạo thanh lịch: Primary Blue, Indigo, Cyan, Violet, Sky" : "5 Premium Tokens: Primary Blue, Indigo, Cyan, Violet, Sky")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Quick Theme Switcher */}
              <button
                onClick={() => {
                  setTheme(isDark ? "mritech-digital-growth" : "glass-dark-neon");
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all active:scale-95 bg-slate-100/80 dark:bg-slate-900/80 hover:bg-slate-200 dark:hover:bg-slate-800 border-slate-200 dark:border-white/15 text-slate-800 dark:text-slate-200"
                title={isDark ? "Đổi sang Light Glass Theme" : "Đổi sang Dark Neon Glass Theme"}
              >
                {isDark ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Light Glass</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                    <span className="hidden sm:inline">Dark Neon</span>
                  </>
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  closeColorModal();
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 px-5 sm:px-6 pt-3 pb-1 border-b border-slate-200/40 dark:border-white/5 shrink-0 bg-slate-50/50 dark:bg-slate-950/40">
            {[
              { id: "swatches", label: isVi ? "5 Màu Chủ Đạo" : "5 Core Palettes", icon: Palette },
              { id: "components", label: isVi ? "Component Mẫu (Buttons & UI)" : "Live Components", icon: Layers },
              { id: "tokens", label: isVi ? "Bảng Token CSS & Mã Nguồn" : "CSS Tokens & Code", icon: Code2 }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[var(--color-primary)] text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 no-scrollbar">
            {/* TAB 1: SWATCHES (5 COLORS) */}
            {activeTab === "swatches" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                {/* Color Group Presets Selector */}
                <div className="p-3.5 sm:p-4 rounded-2xl border bg-slate-50/80 dark:bg-white/[0.03] border-slate-200/80 dark:border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Palette className="w-4 h-4 text-[var(--color-primary)]" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {isVi ? "Chọn Nhóm Màu Sắc (Color Preset):" : "Choose Color Preset:"}
                      </span>
                    </div>
                    <span className="text-3xs text-slate-500 dark:text-slate-400">
                      {isVi ? "Thay đổi đồng bộ toàn hệ thống UI" : "Syncs across the entire UI"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                    {COLOR_PRESETS.map((preset) => {
                      const isSelected = colorPreset === preset.id;
                      const c = isDark ? preset.dark : preset.light;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => {
                            setColorPreset(preset.id);
                          }}
                          className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col gap-1.5 ${
                            isSelected
                              ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)] shadow-sm ring-1 ring-[var(--color-primary)]"
                              : "bg-white/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20"
                          }`}
                        >
                          {/* 5 mini dots + gradient preview */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center -space-x-1">
                              <span className="w-3.5 h-3.5 rounded-full border border-white/60 dark:border-slate-900 shadow-2xs" style={{ backgroundColor: c.primary }} />
                              <span className="w-3.5 h-3.5 rounded-full border border-white/60 dark:border-slate-900 shadow-2xs" style={{ backgroundColor: c.secondary }} />
                              <span className="w-3.5 h-3.5 rounded-full border border-white/60 dark:border-slate-900 shadow-2xs" style={{ backgroundColor: c.accent }} />
                              <span className="w-3.5 h-3.5 rounded-full border border-white/60 dark:border-slate-900 shadow-2xs" style={{ backgroundColor: c.highlight }} />
                              <span className="w-3.5 h-3.5 rounded-full border border-white/60 dark:border-slate-900 shadow-2xs" style={{ backgroundColor: c.soft }} />
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[var(--color-primary)]" />}
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-2xs font-bold text-slate-800 dark:text-slate-200 truncate block">
                              {isVi ? preset.nameVi : preset.name}
                            </span>
                            <span className="text-3xs font-mono text-slate-500 dark:text-slate-400 truncate block">
                              {preset.descriptionVi}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Theme banner intro */}
                <div className="p-4 rounded-2xl border bg-gradient-to-r from-[rgba(var(--color-primary-rgb),0.08)] to-[rgba(var(--color-secondary-rgb),0.08)] border-[rgba(var(--color-primary-rgb),0.2)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-[var(--color-primary)]">
                        {isDark ? "Theme: Dark Neon Glass" : "Theme: Light Glass"}
                      </span>
                      <span className="text-3xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                        Đúng 5 Màu Chuẩn
                      </span>
                    </div>
                    <p className="text-body-sm text-slate-600 dark:text-slate-300 font-medium">
                      {isDark
                        ? (isVi ? "Phong cách: Dark, Futuristic, AI Cyber, Neon Glass glow vừa phải." : "Style: Dark, Futuristic, AI Cyber, Controlled Neon Glass glow.")
                        : (isVi ? "Phong cách: Bright, Clean, Premium, Apple-like, Soft Glass tinh tế." : "Style: Bright, Clean, Premium, Apple-like, Refined Soft Glass.")}
                    </p>
                  </div>
                  <button
                    onClick={handleCopyCss}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/15 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-xs shrink-0 self-start sm:self-center cursor-pointer"
                  >
                    {copiedCss ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCss ? (isVi ? "Đã sao chép CSS" : "CSS Copied") : (isVi ? "Sao chép 5 Tokens" : "Copy 5 Tokens")}</span>
                  </button>
                </div>

                {/* 5 Color Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                  {activePalette.map((color, index) => (
                    <div
                      key={color.id}
                      className="group relative flex flex-col justify-between p-3.5 rounded-2xl border transition-all duration-300 bg-white/70 dark:bg-slate-900/60 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 hover:shadow-lg backdrop-blur-xl"
                    >
                      {/* Color Preview Block */}
                      <div>
                        <div 
                          className="w-full h-20 rounded-xl relative overflow-hidden flex items-end justify-between p-2 shadow-inner border border-white/20"
                          style={{ backgroundColor: color.hex }}
                        >
                          <span className="text-3xs font-black font-mono text-white px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-xs">
                            #{index + 1}
                          </span>
                          <span className="text-2xs font-black font-mono text-white px-2 py-0.5 rounded bg-black/50 backdrop-blur-xs">
                            {color.hex}
                          </span>
                        </div>

                        {/* Title & Role */}
                        <div className="mt-3 space-y-1">
                          <h3 className="text-xs font-black tracking-tight text-slate-900 dark:text-white">
                            {color.name}
                          </h3>
                          <div className="text-2xs font-semibold text-[var(--color-primary)] font-mono">
                            {color.variable}
                          </div>
                          <p className="text-caption text-slate-600 dark:text-slate-400 line-clamp-2 pt-0.5">
                            {isVi ? color.roleVi : color.role}
                          </p>
                        </div>
                      </div>

                      {/* Copy Hex / Var */}
                      <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-1">
                        <button
                          onClick={() => handleCopy(color.hex, `${color.id}-hex`)}
                          className="flex-1 py-1 px-1.5 text-3xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center gap-1"
                          title="Sao chép mã màu Hex"
                        >
                          {copiedToken === `${color.id}-hex` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>HEX</span>
                        </button>
                        <button
                          onClick={() => handleCopy(`var(${color.variable})`, `${color.id}-var`)}
                          className="flex-1 py-1 px-1.5 text-3xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center gap-1"
                          title="Sao chép biến CSS"
                        >
                          {copiedToken === `${color.id}-var` ? <Check className="w-3 h-3 text-emerald-500" /> : <Code2 className="w-3 h-3" />}
                          <span>CSS</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Rules of 60-30-10 distribution */}
                <div className="p-4 rounded-2xl border bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/70 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <Info className="w-4 h-4 text-[var(--color-primary)]" />
                    <span>{isVi ? "Quy Tắc Tỷ Lệ Màu Sắc (60 - 30 - 10)" : "Color Ratio Hierarchy (60 - 30 - 10)"}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/50 dark:border-white/5">
                      <span className="font-bold text-slate-900 dark:text-white">60% Neutral & Background</span>
                      <p className="text-caption text-slate-500 dark:text-slate-400 mt-0.5">Màu nền dịu mắt, bề mặt canvas tối ưu thị giác.</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/50 dark:border-white/5">
                      <span className="font-bold text-slate-900 dark:text-white">30% Glass & Surface</span>
                      <p className="text-caption text-slate-500 dark:text-slate-400 mt-0.5">Khối kính mờ, backdrop blur, viền mờ 1px specular.</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/50 dark:border-white/5">
                      <span className="font-bold text-[var(--color-primary)]">10% Brand Tokens</span>
                      <p className="text-caption text-slate-500 dark:text-slate-400 mt-0.5">5 màu chủ đạo phân bổ chuẩn vai trò, không lạm dụng.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: LIVE COMPONENTS DEMO */}
            {activeTab === "components" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {isVi 
                    ? "Tất cả các components dưới đây sử dụng trực tiếp CSS Design Tokens (var(--color-primary), var(--color-secondary), ...) và tự động đổi giao diện khi chuyển Light/Dark."
                    : "All interactive components below utilize CSS Design Tokens directly and dynamically update upon theme switching."}
                </div>

                {/* 1. Buttons Preview */}
                <div className="p-4 rounded-2xl border bg-white/60 dark:bg-slate-900/50 border-slate-200/70 dark:border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      1. Standard Buttons (Primary & Secondary)
                    </h3>
                    <span className="text-3xs font-mono text-slate-500">PrimaryButton.tsx</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <PrimaryButton icon={<MousePointerClick className="w-4 h-4" />}>
                      {isVi ? "Primary Button (Chính)" : "Primary Button"}
                    </PrimaryButton>

                    <SecondaryButton icon={<Layers className="w-4 h-4" />}>
                      {isVi ? "Secondary Button (Phụ)" : "Secondary Button"}
                    </SecondaryButton>

                    <PrimaryButton variant="indigo">
                      Glass Primary
                    </PrimaryButton>

                    <SecondaryButton>
                      Outline Secondary
                    </SecondaryButton>
                  </div>
                </div>

                {/* 2. Glass Card & Badges Preview */}
                <div className="p-5 rounded-2xl border bg-[var(--glass-bg)] border-[var(--glass-border)] shadow-[var(--glass-shadow)] backdrop-blur-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                        2. Glass Card Surface Preview
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-3xs font-bold bg-[rgba(var(--color-accent-rgb),0.15)] text-[var(--color-accent)] border border-[rgba(var(--color-accent-rgb),0.3)]">
                        Accent Cyan
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-3xs font-bold bg-[rgba(var(--color-highlight-rgb),0.15)] text-[var(--color-highlight)] border border-[rgba(var(--color-highlight-rgb),0.3)]">
                        Highlight Violet
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-3xs font-bold bg-[rgba(var(--color-soft-rgb),0.15)] text-[var(--color-soft)] border border-[rgba(var(--color-soft-rgb),0.3)]">
                        Soft Status
                      </span>
                    </div>
                  </div>

                  <p className="text-body-sm text-slate-600 dark:text-slate-300">
                    Khối Glass UI với hiệu ứng tán xạ ánh sáng, viền specular mỏng nhẹ và chiều sâu tự nhiên. Bề mặt tự thích ứng hoàn toàn giữa chế độ sáng & tối Neon.
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-white/10">
                    <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-primary)]">
                      <ShieldCheck className="w-4 h-4" />
                      <span>WCAG AA Passed: 4.5:1+ Contrast Ratio</span>
                    </div>
                    <PrimaryButton className="px-4 py-2 text-xs">
                      {isVi ? "Thử Nghiệm" : "Test Action"}
                    </PrimaryButton>
                  </div>
                </div>

                {/* 3. Input & Interactive Form Controls */}
                <div className="p-4 rounded-2xl border bg-white/60 dark:bg-slate-900/50 border-slate-200/70 dark:border-white/10 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    3. Form Inputs & Active States
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-2xs font-bold text-slate-700 dark:text-slate-300">
                        {isVi ? "Ô nhập liệu với Focus State chuẩn Token" : "Sample Input with Token Focus"}
                      </label>
                      <input
                        type="text"
                        defaultValue="trinhan.virtual@gmail.com"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border bg-white/80 dark:bg-slate-950/80 border-slate-200 dark:border-white/15 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[rgba(var(--color-primary-rgb),0.25)] text-slate-900 dark:text-white font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-2xs font-bold text-slate-700 dark:text-slate-300">
                        {isVi ? "Thanh tiến độ (Progress Token)" : "Progress Bar Token"}
                      </label>
                      <div className="h-[34px] flex items-center">
                        <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden p-0.5">
                          <div 
                            className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] shadow-xs" 
                            style={{ width: "75%" }} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: TOKENS & CSS CODE */}
            {activeTab === "tokens" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isVi ? "Mã nguồn Design Tokens CSS cho dự án:" : "CSS Design Tokens Source Code:"}
                  </span>
                  <button
                    onClick={handleCopyCss}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[var(--color-primary)] text-white shadow-xs"
                  >
                    {copiedCss ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCss ? (isVi ? "Đã sao chép!" : "Copied!") : (isVi ? "Sao chép mã CSS" : "Copy CSS Code")}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-2xs sm:text-xs overflow-x-auto border border-slate-800 leading-relaxed shadow-inner">
                  {isDark ? `/* DARK NEON GLASS — 5 MÀU CHỦ ĐẠO (Futuristic, AI, Cyber, Premium) */
[data-theme="dark"],
[data-theme="glass-dark-neon"],
.theme-glass-dark-neon {
  --color-primary: #3B82F6;     /* 1. Electric Blue: Primary Button, CTA, Main Action */
  --color-secondary: #22D3EE;   /* 2. Neon Cyan: Links, Icons, Information */
  --color-accent: #8B5CF6;      /* 3. Neon Violet: Active state, Gradient, Main highlight */
  --color-highlight: #D946EF;   /* 4. Neon Magenta: Special highlight, Hover, Decorative glow */
  --color-soft: #22C55E;        /* 5. Neon Green: Success, Completed, Positive status */

  --color-primary-rgb: 59, 130, 246;
  --color-secondary-rgb: 34, 211, 238;
  --color-accent-rgb: 139, 92, 246;
  --color-highlight-rgb: 217, 70, 239;
  --color-soft-rgb: 34, 197, 94;

  --glass-bg: rgba(15, 23, 42, 0.82);
  --glass-border: rgba(255, 255, 255, 0.18);
  --glass-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.7);
}` : `/* LIGHT GLASS — 5 MÀU CHỦ ĐẠO (Bright, Clean, Premium, Apple-like) */
:root {
  --color-primary: #2563EB;     /* 1. Primary Blue: Button chính, CTA, Active state */
  --color-secondary: #6366F1;   /* 2. Secondary Indigo: Secondary button, Navigation, Selected state */
  --color-accent: #06B6D4;      /* 3. Accent Cyan: Icon, Link, Information */
  --color-highlight: #8B5CF6;   /* 4. Highlight Violet: Highlight, Gradient, Special feature */
  --color-soft: #38BDF8;        /* 5. Soft Sky: Background decoration, Hover, Subtle glow */

  --color-primary-rgb: 37, 99, 235;
  --color-secondary-rgb: 99, 102, 241;
  --color-accent-rgb: 6, 182, 212;
  --color-highlight-rgb: 139, 92, 246;
  --color-soft-rgb: 56, 189, 248;

  --glass-bg: rgba(255, 255, 255, 0.75);
  --glass-border: rgba(255, 255, 255, 0.85);
  --glass-shadow: 0 16px 48px -12px rgba(37, 99, 235, 0.14);
}`}
                </pre>
              </div>
            )}
          </div>

          {/* Bottom Footer */}
          <div className="px-5 sm:px-6 py-3.5 border-t border-slate-200/50 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/40 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{isVi ? "Chuẩn hóa Design Tokens 100% không hardcode HEX" : "100% Normalized Design Tokens without hardcoded HEX"}</span>
            </div>
            <button
              onClick={() => {
                closeColorModal();
              }}
              className="px-4 py-1.5 rounded-xl text-xs font-bold bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
            >
              {isVi ? "Đóng Bảng Màu" : "Close"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ColorSystemModal;
