import React, { useState, useCallback } from "react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { PageCardHeader } from "./PageCardHeader";
import { DOMAINS_DATA, DomainItem } from "../data/domainsData";
import { 
  Smartphone, 
  ShoppingCart, 
  ShieldCheck, 
  Wallet, 
  Layers, 
  Gamepad2,
  CheckCircle2,
  Users,
  Wrench,
  Building2,
  Sparkles,
  ArrowRight,
  X,
  Target,
  ChevronRight,
  Briefcase,
  ExternalLink,
  Award,
  Zap,
  Lock,
  Wifi,
  CreditCard,
  Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

// --- BRAND LOGO BADGE COMPONENT ---
const BrandLogoBadge = ({ src, alt, title }: { src: string; alt: string; title: string }) => (
  <div 
    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 dark:bg-slate-800/95 flex items-center justify-center hover:scale-110 transition-transform duration-300 select-none shrink-0 overflow-hidden p-0.5"
    title={title}
  >
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-contain rounded-full" 
      referrerPolicy="no-referrer"
      loading="lazy"
    />
  </div>
);

// Map icon string to Lucide component
const getIconComponent = (iconName: DomainItem["iconName"]) => {
  switch (iconName) {
    case "Smartphone": return Smartphone;
    case "ShoppingCart": return ShoppingCart;
    case "ShieldCheck": return ShieldCheck;
    case "Gamepad2": return Gamepad2;
    case "Wallet": return Wallet;
    case "Layers": return Layers;
    default: return Briefcase;
  }
};

// --- HIGH-FIDELITY 3D DOMAIN ILLUSTRATIONS ---
const Domain3DIcon = ({ iconName, primaryColor, textClass, glowColor }: { iconName: string; primaryColor?: string; textClass?: string; glowColor?: string }) => {
  const Icon = getIconComponent(iconName as DomainItem["iconName"]);

  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center select-none shrink-0 group-hover:scale-105 transition-transform duration-500">
      {/* Ambient Glow */}
      <div 
        className="absolute inset-0 rounded-2xl blur-lg opacity-70 animate-pulse pointer-events-none" 
        style={{ background: glowColor || "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)" }}
      />
      
      {/* Glass Container */}
      <motion.div 
        animate={{
          y: [0, -4, 0],
          rotate: [0, 1.5, -1.5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center"
      >
        <Icon className={cn("w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2] drop-shadow-sm", textClass || "text-blue-600 dark:text-cyan-400")} />
      </motion.div>
    </div>
  );
};

export function Domains() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const selectedDomain = DOMAINS_DATA.find(d => d.id === selectedDomainId);

  // Dynamic theme-aware Glass Card classes
  const getGlassCardClass = useCallback(() => {
    switch (theme as string) {
      case "glass-dark-neon":
        return "bg-[#121218]/85 dark:bg-[#121218]/85 border-cyan-400/25 dark:border-white/15 backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[0_0_20px_rgba(0,240,255,0.12)] hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.22)]";
      case "modern-light-glass":
        return "bg-white/75 dark:bg-slate-900/80 border-white/80 dark:border-white/15 backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[0_10px_30px_0_rgba(100,110,140,0.08)] hover:shadow-[0_16px_40px_0_rgba(100,110,140,0.14)]";
      case "glass-light-multicolor":
      default:
        return "bg-white/75 dark:bg-[#121218]/80 border-white/70 dark:border-white/12 backdrop-blur-[18px] backdrop-saturate-[180%] shadow-[0_8px_32px_0_rgba(31,38,135,0.08)] hover:shadow-[0_14px_40px_0_rgba(31,38,135,0.14)]";
    }
  }, [theme]);

  // Filtered domains
  const filteredDomains = DOMAINS_DATA.filter(d => {
    if (activeFilter === "all") return true;
    if (activeFilter === "telecom") return d.id === "01";
    if (activeFilter === "commerce") return d.id === "02" || d.id === "05";
    if (activeFilter === "finance") return d.id === "03" || d.id === "05";
    if (activeFilter === "gaming") return d.id === "04";
    if (activeFilter === "systems") return d.id === "06";
    return true;
  });

  return (
    <section
      id="domains"
      className="relative w-full h-full flex flex-col justify-start items-stretch p-3 sm:p-4 md:p-5 font-sans text-slate-900 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar box-border min-w-0 max-w-full"
    >
      <style>{`
        .domains-container-root {
          container-type: inline-size;
          container-name: domains-root;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }
        .domains-cards-grid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: clamp(10px, 1.8cqi, 18px);
          width: 100%;
          max-width: 100%;
          min-width: 0;
          box-sizing: border-box;
          align-items: stretch;
          justify-content: center;
          justify-items: center;
        }
        @container domains-root (min-width: 480px) {
          .domains-cards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @container domains-root (min-width: 768px) {
          .domains-cards-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
      `}</style>
      <div className="domains-container-root w-full max-w-full h-full min-h-full flex-grow flex-1 flex flex-col gap-3 sm:gap-4 mx-auto justify-start box-border min-w-0">
        
        {/* Navigation & Breadcrumbs Header */}
        <PageCardHeader pageId="domains">
          {/* Experience Summary Badge */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-4 bg-blue-600 dark:bg-blue-400 rounded-full shrink-0" />
            <span className="text-body-sm font-normal font-mono text-blue-700 dark:text-cyan-300 bg-blue-500/15 px-2.5 py-0.5 rounded-full border border-blue-500/30 shadow-2xs">
              {isVi ? "Thực chiến: 22+ Năm" : "Track Record: 22+ Years"}
            </span>
          </div>

          {/* Quick Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 md:ml-auto">
            {[
              { id: "all", labelVi: "Tất cả (6)", labelEn: "All (6)" },
              { id: "telecom", labelVi: "Viễn thông", labelEn: "Telecom" },
              { id: "commerce", labelVi: "E-Commerce", labelEn: "E-Commerce" },
              { id: "finance", labelVi: "FinTech & Bảo hiểm", labelEn: "FinTech & Insur" },
              { id: "gaming", labelVi: "eSports", labelEn: "eSports" },
              { id: "systems", labelVi: "Xây dựng hệ thống", labelEn: "Systems" }
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={cn(
                    "px-3 py-1 rounded-full text-body-sm font-normal font-play tracking-wide transition-all cursor-pointer whitespace-nowrap border",
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:bg-white dark:hover:bg-slate-800"
                  )}
                >
                  {isVi ? tab.labelVi : tab.labelEn}
                </button>
              );
            })}
          </div>
        </PageCardHeader>

        {/* ========================================================================= */}
        {/* DETAIL DEEP DIVE VIEW (When a domain card is clicked)                     */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          {selectedDomain ? (
            <motion.div
              key={selectedDomain.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
              className={cn(
                "w-full p-[15px] sm:p-6 border shadow-xl flex flex-col gap-4 sm:gap-5 relative overflow-hidden text-left",
                getGlassCardClass(),
                selectedDomain.colorTheme.border
              )}
            >
              {/* Top Action Bar */}
              <div className="w-full flex items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-500/10 flex items-center justify-center p-1.5 shadow-inner border border-blue-200/30">
                     {(() => {
                        const Icon = getIconComponent(selectedDomain.iconName);
                        return <Icon className={cn("w-7 h-7 stroke-[2.2] drop-shadow-sm", selectedDomain.colorTheme.text)} />;
                      })()}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] sm:text-xs font-mono font-black text-blue-600 dark:text-cyan-400 uppercase tracking-widest block">
                      {isVi ? `Chi tiết lĩnh vực ${selectedDomain.code}:` : `Domain ${selectedDomain.code} Details:`}
                    </span>
                    <h6 className="text-base sm:text-xl font-bold tracking-tight font-play">
                      <span className={cn("bg-clip-text text-transparent bg-gradient-to-r", (selectedDomain.colorTheme as any).textGradient || "from-blue-600 via-indigo-600 to-cyan-500")}>
                        {isVi ? selectedDomain.titleVi : selectedDomain.titleEn}
                      </span>
                    </h6>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block">
                      {isVi ? "Kinh nghiệm thực chiến • Kiến tạo giá trị bền vững" : "Practical Experience • Creating Sustainable Value"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedDomainId(null)}
                  className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300/80 dark:border-slate-700 text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>{isVi ? "Đóng chi tiết" : "Close"}</span>
                </button>
              </div>

              {/* Colorful Bento Grid Layout matching the image reference */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                
                {/* Bento Card 1: Title & Illustration (lg:col-span-6) */}
                <div 
                  style={{ borderRadius: "var(--theme-radius-inner, 12px)" }}
                  className={cn(
                    "lg:col-span-6 p-5 sm:p-6 border flex flex-col justify-between gap-5 text-left relative overflow-hidden backdrop-blur-xl shadow-xs",
                    "bg-gradient-to-br from-white/95 via-white/80 to-blue-50/60 dark:from-slate-900/95 dark:via-slate-900/85 dark:to-slate-950/95",
                    selectedDomain.colorTheme.border
                  )}
                >
                  {/* Decorative background pattern/GIF if available */}
                  {selectedDomain.gifUrl && (
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none mix-blend-overlay">
                       <img src={selectedDomain.gifUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-3 shadow-lg shadow-blue-500/20">
                         {(() => {
                            const Icon = getIconComponent(selectedDomain.iconName);
                            return <Icon className="w-9 h-9 text-white stroke-[2.2]" />;
                          })()}
                      </div>
                      <div className="space-y-1">
                        <h3 className={cn("text-xl sm:text-2xl font-black tracking-tight leading-tight font-play", selectedDomain.colorTheme.text)}>
                          {isVi ? selectedDomain.titleVi : selectedDomain.titleEn}
                        </h3>
                        <span className={cn("inline-block px-3 py-0.5 rounded-full text-xs font-mono font-bold shadow-3xs border", selectedDomain.colorTheme.badgeBg, selectedDomain.colorTheme.badgeText)}>
                          {isVi ? selectedDomain.experienceVi : selectedDomain.experienceEn}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-1.5 mt-2">
                      <div className="flex items-center gap-2 text-[10px] font-mono font-black tracking-wider text-blue-600 dark:text-cyan-400 uppercase">
                        <Target className="w-4 h-4" />
                        <span>{isVi ? "ĐỊNH HƯỚNG TẦM NHÌN & VẬN HÀNH" : "STRATEGIC ORIENTATION"}</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                        {isVi ? selectedDomain.orientationVi : selectedDomain.orientationEn}
                      </p>
                    </div>
                  </div>

                  {/* 3D Illustration representation on the right if needed, but the layout is already balanced */}
                  <div className="absolute bottom-4 right-4 w-32 h-32 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                     {(() => {
                        const Icon = getIconComponent(selectedDomain.iconName);
                        return <Icon className={cn("w-full h-full stroke-[1.5]", selectedDomain.colorTheme.text)} />;
                      })()}
                  </div>
                </div>

                {/* Right Bento Cards: Meta Specs (lg:col-span-6) */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 items-stretch">
                   {/* Row of 3 mini cards if we want to follow the exact "VAI TRÒ", "QUY MÔ", "CÔNG NGHỆ" row */}
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 h-full">
                      {/* Role Card */}
                      <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-[9px] font-mono font-black tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-2">
                          <Building2 className="w-5 h-5 bg-blue-100 dark:bg-blue-900/40 p-1 rounded-lg" />
                          <span>{isVi ? "VAI TRÒ CHÍNH" : "ROLE"}</span>
                        </div>
                        <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight block font-play">
                          {isVi ? selectedDomain.roleVi : selectedDomain.roleEn}
                        </span>
                        <div className="mt-2 flex justify-end">
                           <ArrowRight className="w-4 h-4 text-blue-500 bg-blue-500/10 rounded-full p-1 cursor-pointer" />
                        </div>
                      </div>

                      {/* Team Size Card */}
                      <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-white/10 shadow-xs flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-[9px] font-mono font-black tracking-widest text-emerald-600 dark:text-emerald-400 uppercase mb-2">
                          <Users className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/40 p-1 rounded-lg" />
                          <span>{isVi ? "QUY MÔ ĐỘI NGŨ" : "TEAM SIZE"}</span>
                        </div>
                        <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight block font-play">
                          {isVi ? selectedDomain.teamSizeVi : selectedDomain.teamSizeEn}
                        </span>
                        <div className="mt-2 flex justify-end">
                           <ArrowRight className="w-4 h-4 text-emerald-500 bg-emerald-500/10 rounded-full p-1 cursor-pointer" />
                        </div>
                      </div>

                      {/* Tools Card */}
                      <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-white/10 shadow-xs flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-[9px] font-mono font-black tracking-widest text-purple-600 dark:text-purple-400 uppercase mb-2">
                          <Zap className="w-5 h-5 bg-purple-100 dark:bg-purple-900/40 p-1 rounded-lg" />
                          <span>{isVi ? "CÔNG NGHỆ" : "TECH STACK"}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight block">
                          {isVi ? selectedDomain.toolsVi : selectedDomain.toolsEn}
                        </span>
                        <div className="mt-2 flex justify-end">
                           <ArrowRight className="w-4 h-4 text-purple-500 bg-purple-500/10 rounded-full p-1 cursor-pointer" />
                        </div>
                      </div>
                   </div>
                </div>

                {/* Row 3: Professional Description & Highlights (Bento wide cards) */}
                <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                   {/* Description Card */}
                   <div 
                    style={{ borderRadius: "var(--theme-radius-inner, 12px)" }}
                    className="p-5 rounded-2xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col gap-3"
                  >
                    <span className="text-[10px] font-mono font-black tracking-wider text-blue-600 dark:text-cyan-400 uppercase flex items-center gap-2">
                      <Star className="w-5 h-5 text-blue-500" />
                      {isVi ? "Mô tả chuyên môn năng lực" : "Professional Description"}
                    </span>
                    <div className="flex gap-4">
                       <div className="w-1.5 h-auto bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full opacity-50 shrink-0" />
                       <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-relaxed font-semibold">
                        {isVi ? selectedDomain.descVi : selectedDomain.descEn}
                      </p>
                    </div>
                  </div>

                  {/* Highlights Card */}
                  <div 
                    style={{ borderRadius: "var(--theme-radius-inner, 12px)" }}
                    className="p-5 rounded-2xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col gap-3"
                  >
                    <span className="text-[10px] font-mono font-black tracking-wider text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-emerald-500" />
                      {isVi ? "Kết quả & thành tựu nổi bật" : "Key Results & Highlights"}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                      {(isVi ? selectedDomain.highlightsVi : selectedDomain.highlightsEn).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 list-none">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Banner: Partners & Brands */}
                <div 
                  style={{ borderRadius: "var(--theme-radius-inner, 12px)" }}
                  className="lg:col-span-12 p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-slate-800 dark:to-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center p-2">
                      <Building2 className="w-full h-full text-white" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-black uppercase tracking-widest text-white/70 block">
                        {isVi ? "ĐỐI TÁC & THƯƠNG HIỆU TIÊU BIỂU" : "PARTNERS & BRANDS"}
                      </span>
                      <span className="text-sm sm:text-lg font-black font-play">
                        {isVi ? selectedDomain.partnersVi : selectedDomain.partnersEn}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
                    <div className="flex items-center gap-2">
                       {selectedDomain.logos.map((logo, idx) => (
                         <BrandLogoBadge key={idx} src={logo.src} alt={logo.alt} title={logo.name} />
                       ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ========================================================================= */
            /* 6 COMPACT BENTO DOMAIN CARDS (Container Query Auto-Fit Grid View)         */
            /* ========================================================================= */
            <div className="domains-cards-grid w-full h-full flex-1 auto-rows-fr items-stretch pb-2 min-w-0 max-w-full box-border">
              {filteredDomains.map((domain, index) => {
                const Icon = getIconComponent(domain.iconName);

                return (
                  <motion.div
                    key={domain.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    onClick={() => setSelectedDomainId(domain.id)}
                    style={{ borderRadius: "var(--theme-radius-card, 12px)" }}
                    className={cn(
                      "content-fit-card h-full p-3 sm:p-4 border flex flex-col items-center text-center justify-between gap-2.5 shadow-sm hover:shadow-xl cursor-pointer group/card overflow-hidden relative transition-all duration-300 hover:-translate-y-1 w-full max-w-[360px] sm:max-w-none mx-auto min-w-0 box-border",
                      getGlassCardClass(),
                      domain.colorTheme.border
                    )}
                    title={isVi ? "Bấm để xem chi tiết đầy đủ" : "Click to view full details"}
                  >
                    {/* Radiating unique color glow on hover across the entire card */}
                    <div 
                      className="absolute -inset-4 opacity-0 group-hover/card:opacity-100 transition-all duration-700 pointer-events-none blur-2xl scale-75 group-hover/card:scale-110"
                      style={{ background: `radial-gradient(circle at center, ${domain.colorTheme.glow || "rgba(59,130,246,0.3)"}, transparent 80%)` }}
                    />
                    <div 
                      className="absolute inset-0 opacity-0 group-hover/card:opacity-20 transition-opacity duration-700 pointer-events-none"
                      style={{ background: `linear-gradient(135deg, ${domain.colorTheme.glow || "rgba(59,130,246,0.3)"}, transparent)` }}
                    />

                    {/* Top Icon Centered with Distinct Color and Floating Animation */}
                    <div className="relative z-10 pt-1 sm:pt-2 pb-1 shrink-0">
                      <motion.div
                        animate={{
                          y: [0, -5, 0],
                          rotate: [0, 3, -3, 0]
                        }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        whileHover={{ scale: 1.25, rotate: 8 }}
                        className="select-none transition-transform duration-300 flex items-center justify-center bg-transparent border-0 shadow-none p-0"
                      >
                        <Icon 
                          className={cn(
                            "w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 stroke-[2.2] drop-shadow-md",
                            domain.id === "01" ? "text-blue-500 dark:text-blue-400" :
                            domain.id === "02" ? "text-amber-500 dark:text-amber-400" :
                            domain.id === "03" ? "text-emerald-500 dark:text-emerald-400" :
                            domain.id === "04" ? "text-purple-500 dark:text-purple-400" :
                            domain.id === "05" ? "text-rose-500 dark:text-rose-400" :
                            "text-cyan-500 dark:text-cyan-400"
                          )} 
                        />
                      </motion.div>
                    </div>

                    {/* Content Section with Content Fit System */}
                    <div className="flex-1 min-w-0 max-w-full flex flex-col items-center justify-between gap-2.5 relative z-10 w-full">
                      <div className="space-y-1.5 w-full min-w-0 max-w-full">
                        <h6 className={cn("card-title text-sm sm:text-base font-bold tracking-tight font-play break-words [overflow-wrap:anywhere] line-clamp-2", domain.colorTheme.text)}>
                          {isVi ? domain.titleVi : domain.titleEn}
                        </h6>

                        <div className="badge-group flex items-center justify-center flex-wrap gap-1 max-w-full">
                          <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-black tracking-wide border shadow-3xs break-words max-w-full", domain.colorTheme.badgeBg, domain.colorTheme.badgeText)}>
                            {isVi ? domain.experienceVi : domain.experienceEn}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm font-normal text-slate-600 dark:text-slate-300 break-words [overflow-wrap:anywhere] line-clamp-2 sm:line-clamp-3 leading-relaxed">
                          {isVi ? domain.orientationVi : domain.orientationEn}
                        </p>
                      </div>

                      {/* Bottom Row: Connected Brand Logos Centered & Wrapped */}
                      <div className="w-full pt-2.5 border-t border-slate-200/70 dark:border-white/10 flex flex-wrap items-center justify-center gap-1.5 mt-auto max-w-full">
                        {domain.logos.map((logo, idx) => (
                          <BrandLogoBadge key={idx} src={logo.src} alt={logo.alt} title={logo.name} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

export default Domains;
