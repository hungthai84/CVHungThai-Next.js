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
      className="relative w-full h-full flex flex-col justify-start items-stretch p-[15px] font-sans text-slate-900 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar"
    >
      <div className="w-full max-w-full h-full min-h-full flex-grow flex-1 flex flex-col gap-[15px] mx-auto justify-start">
        
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
                  <motion.div
                    animate={{ y: [0, -3, 0], rotate: [0, 3, -3, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative flex items-center justify-center shrink-0"
                  >
                    {(() => {
                      const Icon = getIconComponent(selectedDomain.iconName);
                      return <Icon className={cn("w-6 h-6 stroke-[2.2] drop-shadow-sm", selectedDomain.colorTheme.text)} />;
                    })()}
                  </motion.div>
                  <h6 className="text-sm sm:text-base font-bold tracking-tight font-play">
                    <span className={cn("bg-clip-text text-transparent bg-gradient-to-r", (selectedDomain.colorTheme as { textGradient?: string }).textGradient || "from-blue-600 via-indigo-600 to-cyan-500")}>
                      {isVi ? `Chi tiết lĩnh vực ${selectedDomain.code}: ${selectedDomain.titleVi}` : `Domain ${selectedDomain.code}: ${selectedDomain.titleEn}`}
                    </span>
                  </h6>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedDomainId(null)}
                  className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300/80 dark:border-slate-700 text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>{isVi ? "Đóng chi tiết" : "Close"}</span>
                </button>
              </div>

              {/* Colorful Bento Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
                {/* Bento Card 1: Title & 3D Icon Badge (lg:col-span-5) */}
                <div 
                  style={{ borderRadius: "var(--theme-radius-inner, 12px)" }}
                  className={cn(
                    "lg:col-span-5 p-4 sm:p-5 border flex flex-col justify-between gap-4 text-left relative overflow-hidden backdrop-blur-xl shadow-xs",
                    "bg-gradient-to-br from-white/90 via-white/70 to-blue-50/50 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-slate-950/90",
                    selectedDomain.colorTheme.border
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <Domain3DIcon 
                      iconName={selectedDomain.iconName} 
                      primaryColor={selectedDomain.colorTheme.primary}
                      textClass={selectedDomain.colorTheme.text}
                      glowColor={selectedDomain.colorTheme.glow}
                    />
                    <div className="space-y-1 min-w-0 flex-1">
                      <h3 className={cn("text-base sm:text-lg font-black tracking-tight leading-tight font-play", selectedDomain.colorTheme.text)}>
                        {isVi ? selectedDomain.titleVi : selectedDomain.titleEn}
                      </h3>
                      <span className={cn("inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-bold shadow-3xs border", selectedDomain.colorTheme.badgeBg, selectedDomain.colorTheme.badgeText)}>
                        {isVi ? selectedDomain.experienceVi : selectedDomain.experienceEn}
                      </span>
                    </div>
                  </div>

                  {/* Strategic Orientation Bento Subcard */}
                  <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-1">
                    <div className="flex items-center gap-1.5 text-3xs font-mono font-black tracking-wider text-blue-600 dark:text-cyan-400 uppercase">
                      <Target className="w-3.5 h-3.5" />
                      <span>{isVi ? "ĐỊNH HƯỚNG TẦM NHÌN & VẬN HÀNH" : "STRATEGIC ORIENTATION"}</span>
                    </div>
                    <p className="text-body-sm font-normal text-slate-800 dark:text-slate-100 leading-snug">
                      {isVi ? selectedDomain.orientationVi : selectedDomain.orientationEn}
                    </p>
                  </div>
                </div>

                {/* Bento Card 2: 3-Col Meta Specs: Role, Team Size, Tech Stack (lg:col-span-7) */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
                  {/* Role Card */}
                  <div 
                    style={{ borderRadius: "var(--theme-radius-inner, 12px)" }}
                    className="p-3.5 rounded-xl bg-gradient-to-br from-blue-50/80 via-white/80 to-indigo-50/80 dark:from-slate-900/90 dark:to-blue-950/50 border border-blue-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2 text-3xs font-mono font-black tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-2">
                      <Briefcase className="w-4 h-4" />
                      <span>{isVi ? "VAI TRÒ CHÍNH" : "ROLE"}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight block font-play">
                      {isVi ? selectedDomain.roleVi : selectedDomain.roleEn}
                    </span>
                  </div>

                  {/* Team Size Card */}
                  <div 
                    style={{ borderRadius: "var(--theme-radius-inner, 12px)" }}
                    className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-50/80 via-white/80 to-teal-50/80 dark:from-slate-900/90 dark:to-emerald-950/50 border border-emerald-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2 text-3xs font-mono font-black tracking-wider text-emerald-600 dark:text-emerald-400 uppercase mb-2">
                      <Users className="w-4 h-4" />
                      <span>{isVi ? "QUY MÔ ĐỘI NGŨ" : "TEAM SIZE"}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight block font-play">
                      {isVi ? selectedDomain.teamSizeVi : selectedDomain.teamSizeEn}
                    </span>
                  </div>

                  {/* Tools Card */}
                  <div 
                    style={{ borderRadius: "var(--theme-radius-inner, 12px)" }}
                    className="p-3.5 rounded-xl bg-gradient-to-br from-purple-50/80 via-white/80 to-fuchsia-50/80 dark:from-slate-900/90 dark:to-purple-950/50 border border-purple-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2 text-3xs font-mono font-black tracking-wider text-purple-600 dark:text-purple-400 uppercase mb-2">
                      <Wrench className="w-4 h-4" />
                      <span>{isVi ? "CÔNG NGHỆ" : "TECH STACK"}</span>
                    </div>
                    <span className="text-xs font-bold font-mono text-purple-700 dark:text-purple-300 leading-tight block truncate">
                      {isVi ? selectedDomain.toolsVi : selectedDomain.toolsEn}
                    </span>
                  </div>
                </div>

                {/* Bento Card 3: Narrative & Professional Description (lg:col-span-6) */}
                <div 
                  style={{ borderRadius: "var(--theme-radius-inner, 12px)" }}
                  className="lg:col-span-6 p-4 sm:p-5 rounded-xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between gap-2"
                >
                  <span className="text-3xs font-mono font-black tracking-wider text-indigo-600 dark:text-cyan-400 uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {isVi ? "Mô tả chuyên môn năng lực" : "Professional Description"}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed font-semibold">
                    {isVi ? selectedDomain.descVi : selectedDomain.descEn}
                  </p>
                </div>

                {/* Bento Card 4: Key Results & Highlights (lg:col-span-6) */}
                <div 
                  style={{ borderRadius: "var(--theme-radius-inner, 12px)" }}
                  className="lg:col-span-6 p-4 sm:p-5 rounded-xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col justify-between gap-2.5"
                >
                  <span className="text-3xs font-mono font-black tracking-wider text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    {isVi ? "Kết quả & thành tựu nổi bật" : "Key Results & Highlights"}
                  </span>
                  <ul className="space-y-2">
                    {(isVi ? selectedDomain.highlightsVi : selectedDomain.highlightsEn).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bento Card 5: Brand Partners Banner (lg:col-span-12) */}
                <div 
                  style={{ borderRadius: "var(--theme-radius-inner, 12px)" }}
                  className="lg:col-span-12 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-blue-50/80 via-white/90 to-cyan-50/80 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-slate-950/90 border border-slate-200/80 dark:border-white/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                    <div>
                      <span className="text-3xs font-mono font-black uppercase tracking-wider text-slate-400 block">
                        {isVi ? "ĐỐI TÁC & THƯƠNG HIỆU TIÊU BIỂU" : "PARTNERS & BRANDS"}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-play">
                        {isVi ? selectedDomain.partnersVi : selectedDomain.partnersEn}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
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
            <div className="w-full h-full flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[15px] auto-rows-fr items-stretch pb-1">
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
                      "h-full p-[15px] border flex flex-col items-center text-center justify-between gap-3 shadow-sm hover:shadow-xl cursor-pointer group/card overflow-hidden relative transition-all duration-500 hover:-translate-y-1.5",
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

                    {/* Top Icon Centered with Distinct Color and Floating Animation (Bỏ khung, mỗi icon màu khác nhau) */}
                    <div className="relative z-10 pt-2 pb-1">
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
                            "w-11 h-11 sm:w-12 sm:h-12 stroke-[2.2] drop-shadow-md",
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

                    {/* Content Section */}
                    <div className="flex-1 min-w-0 flex flex-col items-center justify-between gap-2 relative z-10 w-full">
                      <div className="space-y-1.5 w-full">
                        <h6 className={cn("text-h6 font-bold tracking-tight font-play line-clamp-1", domain.colorTheme.text)}>
                          {isVi ? domain.titleVi : domain.titleEn}
                        </h6>

                        <div className="flex items-center justify-center">
                          <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black tracking-wide border shadow-3xs", domain.colorTheme.badgeBg, domain.colorTheme.badgeText)}>
                            {isVi ? domain.experienceVi : domain.experienceEn}
                          </span>
                        </div>

                        <p className="text-body-sm font-normal text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                          {isVi ? domain.orientationVi : domain.orientationEn}
                        </p>
                      </div>

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

      </div>
    </section>
  );
}

export default Domains;
