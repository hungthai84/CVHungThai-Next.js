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
    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 flex items-center justify-center shadow-xs hover:scale-110 transition-transform duration-300 select-none shrink-0 overflow-hidden p-0.5"
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
        className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border border-white/40 dark:border-white/20 backdrop-blur-[16px] bg-white/40 dark:bg-slate-800/60 shadow-[0_8px_24px_rgba(0,0,0,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.8)] flex items-center justify-center"
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
      className="relative w-full h-full flex flex-col justify-start items-stretch p-[15px] font-sans text-slate-900 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar"
    >
      <div className="w-full flex-grow flex flex-col gap-[15px] max-w-7xl mx-auto justify-start">
        
        {/* Navigation & Breadcrumbs Header */}
        <PageCardHeader pageId="domains">
          {/* Experience Summary Badge */}
          <div className="flex items-center gap-2">
            <span className="text-caption font-semibold font-mono text-blue-700 dark:text-cyan-300 bg-blue-500/15 px-2.5 py-0.5 rounded-full border border-blue-500/30 shadow-2xs">
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
                    "px-3 py-1 rounded-full text-xs font-bold font-play tracking-wide transition-all cursor-pointer whitespace-nowrap border",
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
                "w-full p-5 sm:p-7 lg:p-8 border shadow-xl flex flex-col gap-6 relative overflow-hidden text-left",
                getGlassCardClass(),
                selectedDomain.colorTheme.border
              )}
            >
              {/* Top Action Bar */}
              <div className="w-full flex items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <motion.div
                    animate={{ y: [0, -3, 0], rotate: [0, 3, -3, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative flex items-center justify-center shrink-0"
                  >
                    {(() => {
                      const Icon = getIconComponent(selectedDomain.iconName);
                      return <Icon className="w-5 h-5 text-blue-600 dark:text-cyan-400 stroke-[2.2] drop-shadow-sm" />;
                    })()}
                  </motion.div>
                  <h6 className="text-h6 font-bold tracking-tight font-play">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300">
                      {isVi ? `Chi tiết lĩnh vực ${selectedDomain.code}: ${selectedDomain.titleVi}` : `Domain ${selectedDomain.code}: ${selectedDomain.titleEn}`}
                    </span>
                  </h6>
                </div>

                <button
                  onClick={() => setSelectedDomainId(null)}
                  className="px-3.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300/80 dark:border-slate-700 text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>{isVi ? "Đóng chi tiết" : "Close"}</span>
                </button>
              </div>

              {/* Main Content Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column (5 Cols): Title, 3D Icon, Orientation & Specs */}
                <div className="lg:col-span-5 flex flex-col gap-4 text-left">
                  <div className="flex items-center gap-4">
                    <Domain3DIcon iconName={selectedDomain.iconName} primaryColor={selectedDomain.colorTheme.primary} />
                    <div className="space-y-1 min-w-0 flex-1">
                      <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400 block uppercase">
                        LĨNH VỰC {selectedDomain.code}
                      </span>
                      <h3 className={cn("text-h5 sm:text-h4 font-black tracking-tight leading-tight font-play", selectedDomain.colorTheme.text)}>
                        {isVi ? selectedDomain.titleVi : selectedDomain.titleEn}
                      </h3>
                      <span className={cn("inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-mono font-bold shadow-3xs border", selectedDomain.colorTheme.badgeBg, selectedDomain.colorTheme.badgeText)}>
                        {isVi ? selectedDomain.experienceVi : selectedDomain.experienceEn}
                      </span>
                    </div>
                  </div>

                  {/* Strategic Orientation */}
                  <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-1">
                    <div className="flex items-center gap-1.5 text-2xs font-mono font-bold tracking-wider text-slate-400">
                      <Target className="w-3 h-3 text-blue-500" />
                      <span>{isVi ? "ĐỊNH HƯỚNG TẦM NHÌN & VẬN HÀNH" : "STRATEGIC ORIENTATION"}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug">
                      {isVi ? selectedDomain.orientationVi : selectedDomain.orientationEn}
                    </p>
                  </div>

                  {/* Grid of Key Metadata */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 text-left space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-slate-400">
                        <Briefcase className="w-3 h-3 text-blue-500" />
                        <span>{isVi ? "VAI TRÒ CHÍNH" : "PRIMARY ROLE"}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight block">
                        {isVi ? selectedDomain.roleVi : selectedDomain.roleEn}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 text-left space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-slate-400">
                        <Users className="w-3 h-3 text-emerald-500" />
                        <span>{isVi ? "QUY MÔ ĐỘI NGŨ" : "TEAM SIZE"}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight block">
                        {isVi ? selectedDomain.teamSizeVi : selectedDomain.teamSizeEn}
                      </span>
                    </div>
                  </div>

                  {/* Tools & Tech Stack */}
                  <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 text-left space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-slate-400">
                      <Wrench className="w-3 h-3 text-indigo-500" />
                      <span>{isVi ? "CÔNG NGHỆ & CÔNG CỤ" : "TOOLS & TECH STACK"}</span>
                    </div>
                    <span className="text-xs font-bold font-mono text-blue-700 dark:text-cyan-300 leading-tight block">
                      {isVi ? selectedDomain.toolsVi : selectedDomain.toolsEn}
                    </span>
                  </div>
                </div>

                {/* Right Column (7 Cols): Narrative & Achievements */}
                <div className="lg:col-span-7 flex flex-col gap-4 text-left">
                  {/* Narrative Description */}
                  <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2">
                    <span className="text-xs font-mono font-bold tracking-wider text-slate-400 block uppercase">
                      {isVi ? "Mô tả chuyên môn năng lực" : "Professional Description"}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                      {isVi ? selectedDomain.descVi : selectedDomain.descEn}
                    </p>
                  </div>

                  {/* Key Highlights & Achievements */}
                  <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
                    <span className="text-xs font-mono font-bold tracking-wider text-slate-400 block uppercase">
                      {isVi ? "Kết quả & thành tựu nổi bật" : "Key Results & Highlights"}
                    </span>
                    <ul className="space-y-2.5">
                      {(isVi ? selectedDomain.highlightsVi : selectedDomain.highlightsEn).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Brand Partners */}
                  <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-4.5 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-2xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                        {isVi ? "ĐỐI TÁC & THƯƠNG HIỆU TIÊU BIỂU" : "PARTNERS & BRANDS"}
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {isVi ? selectedDomain.partnersVi : selectedDomain.partnersEn}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
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
            /* 6 COMPACT BENTO DOMAIN CARDS (Grid View)                                  */
            /* ========================================================================= */
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[15px] items-stretch">
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
                      "p-[15px] border flex flex-row items-stretch gap-4 shadow-sm hover:shadow-md cursor-pointer group/card overflow-hidden text-left relative transition-all duration-300 hover:-translate-y-1",
                      getGlassCardClass(),
                      domain.colorTheme.border
                    )}
                    title={isVi ? "Bấm để xem chi tiết đầy đủ" : "Click to view full details"}
                  >
                    {/* Left Column: Icon height spanning the 4 rows on the right */}
                    <div className="shrink-0 flex items-center justify-center">
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
                        className={cn(
                          "w-12 sm:w-14 h-24 sm:h-28 rounded-2xl flex items-center justify-center border select-none transition-transform duration-300",
                          domain.colorTheme.iconBg
                        )}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2] drop-shadow-sm" />
                      </motion.div>
                    </div>

                    {/* Right Column: Title, Code, Experience, Description, and Brand Logos */}
                    <div className="flex-1 min-w-0 flex flex-col gap-1.5 h-full">
                      <div className="flex flex-col gap-1">
                        {/* Domain Code Tag */}
                        <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
                          LĨNH VỰC {domain.code}
                        </span>

                        {/* Title H6 Token */}
                        <h6 className={cn("text-h6 font-bold tracking-tight font-play truncate", domain.colorTheme.text)}>
                          {isVi ? domain.titleVi : domain.titleEn}
                        </h6>

                        {/* Experience Badge */}
                        <div className="flex items-center">
                          <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black tracking-wide border shadow-3xs", domain.colorTheme.badgeBg, domain.colorTheme.badgeText)}>
                            {isVi ? domain.experienceVi : domain.experienceEn}
                          </span>
                        </div>
                      </div>

                      {/* Orientation Description */}
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed flex-1">
                        {isVi ? domain.orientationVi : domain.orientationEn}
                      </p>

                      {/* Bottom Row: Connected Brand Logos & Deep Dive Action */}
                      <div className="w-full pt-2.5 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between gap-2 mt-auto">
                        {/* Connected Logos list */}
                        <div className="flex items-center gap-1.5 overflow-hidden flex-1">
                          {domain.logos.map((logo, idx) => (
                            <BrandLogoBadge key={idx} src={logo.src} alt={logo.alt} title={logo.name} />
                          ))}
                        </div>

                        {/* Action Trigger */}
                        <div className="flex items-center gap-1 shrink-0 text-blue-600 dark:text-cyan-400 group-hover/card:translate-x-1 transition-transform">
                          <span className="text-2xs font-mono font-bold">
                            {isVi ? "Chi tiết" : "Details"}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
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
