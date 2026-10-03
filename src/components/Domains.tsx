import React, { useState, useCallback, useEffect, useRef } from "react";
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
  Cpu,
  Filter,
  ChevronDown,
  Check
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
const Domain3DIcon = ({ iconName, primaryColor }: { iconName: string; primaryColor: string }) => {
  const Icon = getIconComponent(iconName as DomainItem["iconName"]);

  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center select-none shrink-0 group-hover:scale-105 transition-transform duration-500">
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-indigo-500/20 to-cyan-400/20 rounded-2xl blur-lg opacity-70 animate-pulse pointer-events-none" />
      
      {/* Glass Container - Frame removed as requested (bỏ khung hình icon) */}
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
        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 dark:text-cyan-400 stroke-[2.2] drop-shadow-sm" />
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
      case "mritech-digital-growth":
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
      className="relative w-full h-full flex flex-col justify-center items-center p-[15px] max-w-7xl mx-auto gap-[15px] font-sans text-slate-900 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-hidden"
    >
        
        {/* Navigation & Breadcrumbs Header */}
        <PageCardHeader pageId="domains">
          {/* Experience Summary Badge */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-4 bg-blue-600 dark:bg-blue-400 rounded-full shrink-0" />
            <span className="text-caption font-semibold font-mono text-blue-700 dark:text-cyan-300 bg-blue-500/15 px-2.5 py-0.5 rounded-full border border-blue-500/30 shadow-2xs">
              {isVi ? "Thực chiến: 22+ Năm" : "Track Record: 22+ Years"}
            </span>
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
                "w-full p-5 sm:p-7 lg:p-8 border shadow-xl flex flex-col gap-6 relative text-left min-h-fit",
                getGlassCardClass(),
                selectedDomain.colorTheme.border
              )}
            >

              {/* ========================================================================= */}
              {/* BENTO GRID UNIFIED LAYOUT FOR DOMAIN DETAIL VIEW                          */}
              {/* ========================================================================= */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 w-full pt-2 items-stretch">
                
                {/* 1. Hero Bento Card (col-span-1 md:col-span-2 lg:col-span-8) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-white/95 via-blue-50/40 to-indigo-50/30 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-indigo-950/40 border border-blue-200/80 dark:border-white/15 shadow-md flex flex-col justify-between gap-4 text-left relative overflow-hidden group">
                  {/* Background glow accent */}
                  <div 
                    className="absolute -right-10 -top-10 w-56 h-56 rounded-full blur-3xl opacity-40 pointer-events-none"
                    style={{ backgroundColor: selectedDomain.colorTheme.primary }}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                    <div className="flex items-center gap-4">
                      <Domain3DIcon iconName={selectedDomain.iconName} primaryColor={selectedDomain.colorTheme.primary} />
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-md bg-blue-600 dark:bg-cyan-500 text-white font-mono font-black text-2xs tracking-wider shadow-xs">
                            LĨNH VỰC {selectedDomain.code}
                          </span>
                          <span className={cn("px-2.5 py-0.5 rounded-full text-2xs font-mono font-bold shadow-xs border", selectedDomain.colorTheme.badgeBg, selectedDomain.colorTheme.badgeText)}>
                            {isVi ? selectedDomain.experienceVi : selectedDomain.experienceEn}
                          </span>
                        </div>
                        <h3 className={cn("text-h5 sm:text-h4 font-black tracking-tight leading-tight font-play bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 dark:from-white dark:via-cyan-200 dark:to-blue-300", selectedDomain.colorTheme.text)}>
                          {isVi ? selectedDomain.titleVi : selectedDomain.titleEn}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Strategic Vision Banner */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-blue-500/15 via-indigo-500/10 to-cyan-500/15 dark:from-blue-900/30 dark:to-cyan-900/30 border border-blue-300/60 dark:border-cyan-500/30 space-y-1 relative z-10 shadow-xs">
                    <div className="flex items-center gap-1.5 text-2xs font-mono font-black tracking-wider text-blue-700 dark:text-cyan-300">
                      <Target className="w-3.5 h-3.5 shrink-0" />
                      <span>{isVi ? "ĐỊNH HƯỚNG TẦM NHÌN & VẬN HÀNH" : "STRATEGIC ORIENTATION"}</span>
                    </div>
                    <p className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {isVi ? selectedDomain.orientationVi : selectedDomain.orientationEn}
                    </p>
                  </div>
                </div>

                {/* 2. Scope & Role Bento Card (col-span-1 md:col-span-2 lg:col-span-4) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col gap-3 justify-between">
                  <div className="grid grid-cols-2 gap-2.5 flex-1">
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-white/90 to-blue-50/50 dark:from-slate-900/90 dark:to-slate-950/90 border border-slate-200/80 dark:border-white/10 text-left space-y-1 flex flex-col justify-center shadow-xs">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-extrabold tracking-wider text-blue-600 dark:text-cyan-400">
                        <Briefcase className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="truncate">{isVi ? "VAI TRÒ CHÍNH" : "ROLE"}</span>
                      </div>
                      <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight block truncate" title={isVi ? selectedDomain.roleVi : selectedDomain.roleEn}>
                        {isVi ? selectedDomain.roleVi : selectedDomain.roleEn}
                      </span>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-white/90 to-emerald-50/50 dark:from-slate-900/90 dark:to-slate-950/90 border border-slate-200/80 dark:border-white/10 text-left space-y-1 flex flex-col justify-center shadow-xs">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-extrabold tracking-wider text-emerald-600 dark:text-emerald-400">
                        <Users className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{isVi ? "QUY MÔ ĐỘI NGŨ" : "TEAM SIZE"}</span>
                      </div>
                      <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight block truncate" title={isVi ? selectedDomain.teamSizeVi : selectedDomain.teamSizeEn}>
                        {isVi ? selectedDomain.teamSizeVi : selectedDomain.teamSizeEn}
                      </span>
                    </div>
                  </div>

                  {/* Tools & Tech Stack Bento Tile */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-white/90 via-purple-50/30 to-indigo-50/30 dark:from-slate-900/90 dark:to-indigo-950/30 border border-indigo-200/80 dark:border-white/10 text-left space-y-1.5 shadow-xs">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-extrabold tracking-wider text-indigo-600 dark:text-indigo-400">
                      <Wrench className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span>{isVi ? "CÔNG NGHỆ & HỆ THỐNG" : "TECH & ECOSYSTEM"}</span>
                    </div>
                    <span className="text-xs font-bold font-mono text-indigo-700 dark:text-cyan-300 leading-tight block line-clamp-2">
                      {isVi ? selectedDomain.toolsVi : selectedDomain.toolsEn}
                    </span>
                  </div>
                </div>

                {/* 3. Card 1: Mô tả chuyên môn năng lực (col-span-1 md:col-span-1 lg:col-span-5) */}
                <div className="col-span-1 md:col-span-1 lg:col-span-5 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-2xl p-[15px] border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between gap-3 text-left">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200/60 dark:border-white/10">
                      <Award className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                      <span className="text-xs font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                        {isVi ? "Mô tả chuyên môn năng lực" : "Professional Expertise"}
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-200 leading-relaxed font-normal pt-1">
                      {isVi ? selectedDomain.descVi : selectedDomain.descEn}
                    </p>
                  </div>
                </div>

                {/* 4. Card 2: Kết quả & thành tựu nổi bật (col-span-1 md:col-span-1 lg:col-span-7) */}
                <div className="col-span-1 md:col-span-1 lg:col-span-7 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3 text-left">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200/60 dark:border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                      {isVi ? "Kết quả & thành tựu nổi bật" : "Key Results & Milestones"}
                    </span>
                  </div>
                  <ul className="grid grid-cols-1 gap-2.5 pt-1">
                    {(isVi ? selectedDomain.highlightsVi : selectedDomain.highlightsEn).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] font-medium text-slate-800 dark:text-slate-100 bg-slate-50/70 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-200/50 dark:border-white/5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 5. PARTNERS & ECOSYSTEM LOGOS BANNER (col-span-1 md:col-span-2 lg:col-span-12) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-12 bg-gradient-to-r from-white/90 via-slate-50/80 to-white/90 dark:from-slate-900/90 dark:via-slate-950/80 dark:to-slate-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                      {isVi ? "ĐỐI TÁC & THƯƠNG HIỆU TIÊU BIỂU" : "PARTNERS & ECOSYSTEM BRANDS"}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {isVi ? selectedDomain.partnersVi : selectedDomain.partnersEn}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    {selectedDomain.logos.map((logo, idx) => (
                      <BrandLogoBadge key={idx} src={logo.src} alt={logo.alt} title={logo.name} />
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ) : (
            /* ========================================================================= */
            /* 6 COMPACT BENTO DOMAIN CARDS (Grid View)                                  */
            /* ========================================================================= */
            <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[15px] auto-rows-fr items-stretch pb-1">
              {filteredDomains.map((domain, index) => {
                const Icon = getIconComponent(domain.iconName);

                return (
                  <motion.div
                    key={domain.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    onClick={() => setSelectedDomainId(domain.id)}
                    style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
                    className={cn(
                      "h-full p-[15px] border flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-xl cursor-pointer group/card overflow-hidden relative transition-all duration-500 hover:-translate-y-1.5",
                      getGlassCardClass(),
                      domain.colorTheme.border
                    )}
                    title={isVi ? "Bấm để xem chi tiết đầy đủ" : "Click to view full details"}
                  >
                    {/* Radiating unique color glow on hover across the card */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl"
                      style={{ background: `radial-gradient(circle at top center, ${domain.colorTheme.glow}, transparent 75%)` }}
                    />

                    {/* Top Icon Centered */}
                    <div className="relative z-10 pt-1">
                      <motion.div
                        animate={{
                          y: [0, -3.5, 0],
                          rotate: [0, 3, -3, 0]
                        }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        className="select-none transition-transform duration-300"
                      >
                        <Icon className={cn("w-12 h-12 stroke-[2] drop-shadow-md", domain.colorTheme.text)} />
                      </motion.div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 min-w-0 flex flex-col items-center gap-2 relative z-10 w-full">
                      <h6 className={cn("text-h6 font-bold tracking-tight font-play line-clamp-1", domain.colorTheme.text)}>
                        {isVi ? domain.titleVi : domain.titleEn}
                      </h6>

                      <div className="flex items-center justify-center">
                        <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black tracking-wide border shadow-3xs", domain.colorTheme.badgeBg, domain.colorTheme.badgeText)}>
                          {isVi ? domain.experienceVi : domain.experienceEn}
                        </span>
                      </div>

                      <p className="text-xs font-medium text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {isVi ? domain.orientationVi : domain.orientationEn}
                      </p>

                      {/* Bottom Row: Connected Brand Logos Centered */}
                      <div className="w-full pt-2.5 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-center gap-2 mt-auto">
                        <div className="flex items-center gap-1.5 justify-center overflow-hidden">
                          {domain.logos.map((logo, idx) => (
                            <BrandLogoBadge key={idx} src={logo.src} alt={logo.alt} title={logo.name} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
    </section>
  );
}

export default Domains;
