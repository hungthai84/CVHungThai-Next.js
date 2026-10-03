import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  Rocket, 
  Users, 
  Box, 
  Target, 
  BookCheck, 
  Network, 
  Bot, 
  Award, 
  ChevronUp, 
  Handshake, 
  Quote, 
  Briefcase, 
  Signal, 
  Headset, 
  Tv, 
  Gamepad2, 
  ShoppingBag, 
  ShieldCheck, 
  CreditCard, 
  Lightbulb, 
  BarChart2, 
  ShoppingCart, 
  Heart,
  ChevronRight,
  Video
} from "lucide-react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { playUiSound } from "../lib/sound";
import { PageCardHeader } from "./PageCardHeader";
import { cn } from "../lib/utils";
import { AnimatedCardTitle } from "./AnimatedCardTitle";
import { 
  CAREER_MILESTONES_DATA, 
  CORE_VALUES_DATA, 
  OPERATIONAL_PRINCIPLES_DATA, 
  CareerMilestoneItem 
} from "../data/letterData";
import { HeroRobotCompanion } from "./ai/HeroRobotCompanion";

// Authentic Signature vector for Nguyễn Hùng Thái
const SignatureSvg = () => (
  <svg 
    className="w-36 h-12 text-blue-600 dark:text-cyan-400 opacity-95 relative select-none pointer-events-none my-0.5" 
    viewBox="0 0 220 80" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3.4" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M 30 60 C 45 45, 60 10, 72 32 C 80 52, 85 15, 98 32 C 108 45, 115 58, 128 22 C 135 12, 142 45, 185 28" />
    <path d="M 38 42 L 185 34" strokeWidth="2" />
    <path d="M 82 10 L 82 65" strokeWidth="2.8" />
  </svg>
);

// Map icon string name to component
const getMilestoneIcon = (name: string) => {
  switch (name) {
    case "Signal": return Signal;
    case "Headset": return Headset;
    case "Tv": return Tv;
    case "Gamepad2": return Gamepad2;
    case "ShoppingBag": return ShoppingBag;
    case "ShieldCheck": return ShieldCheck;
    case "CreditCard": return CreditCard;
    case "Heart": return Heart;
    case "Lightbulb": return Lightbulb;
    case "BarChart2": return BarChart2;
    case "Users": return Users;
    case "Target": return Target;
    case "ShoppingCart": return ShoppingCart;
    case "Sparkles": return Sparkles;
    default: return Briefcase;
  }
};

// ==========================================
// MAIN OPEN LETTER COMPONENT
// ==========================================
export default function OpenLetter() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";

  // Dynamic theme-aware Glass Bento Card classes with enhanced backdrop-blur and luxury lighting
  const getGlassCardClass = useCallback(() => {
    switch (theme as string) {
      case "glass-dark-neon":
        return "bg-[#121218]/85 dark:bg-[#121218]/85 border-cyan-400/30 dark:border-white/15 backdrop-blur-[24px] backdrop-saturate-[200%] shadow-[0_0_30px_rgba(0,240,255,0.18)] dark:shadow-[0_12px_40px_0_rgba(0,0,0,0.6)] hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(0,240,255,0.3)]";
      case "modern-light-glass":
        return "bg-white/80 dark:bg-slate-900/80 border-white/90 dark:border-white/15 backdrop-blur-[24px] backdrop-saturate-[200%] shadow-[0_15px_35px_0_rgba(100,110,140,0.1)] dark:shadow-[0_12px_40px_0_rgba(0,0,0,0.4)] hover:shadow-[0_20px_45px_0_rgba(100,110,140,0.18)]";
      case "mritech-digital-growth":
      default:
        return "bg-white/80 dark:bg-[#121218]/85 border-white/80 dark:border-white/15 backdrop-blur-[24px] backdrop-saturate-[200%] shadow-[0_12px_35px_0_rgba(31,38,135,0.1)] dark:shadow-[0_12px_40px_0_rgba(0,0,0,0.4)] hover:shadow-[0_18px_45px_0_rgba(31,38,135,0.15)]";
    }
  }, [theme]);

  // Collapse/Expand state for career milestones
  const [expandedCard, setExpandedCard] = useState<Record<string, boolean>>({
    "card-2013": false
  });

  // Symmetrical Left-Right Pairs of Career Milestones
  const careerPairs = [
    { left: CAREER_MILESTONES_DATA[0], right: CAREER_MILESTONES_DATA[1] }, // MobiFone (2002) vs V247 (2007)
    { left: CAREER_MILESTONES_DATA[2], right: CAREER_MILESTONES_DATA[3] }, // LBC (2011) vs Garena (2013)
    { left: CAREER_MILESTONES_DATA[4], right: CAREER_MILESTONES_DATA[5] }, // Shopee (2013) vs Prudential (2016)
    { left: CAREER_MILESTONES_DATA[6], right: CAREER_MILESTONES_DATA[7] }  // MoMo (2018) vs Finviet (2023)
  ];

  // Helper to format bold text split by ** for outstanding and professional highlights
  const renderFormattedText = (text: string) => {
    if (!text) return "";
    const tokens = text.split("**");
    return tokens.map((part, i) => {
      if (i % 2 === 1) {
        return (
          <strong key={i} className="font-bold text-slate-900 dark:text-white">
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  // Subcomponent to render each career bento card
  const renderCareerCard = (item: CareerMilestoneItem) => {
    const RoleIcon = getMilestoneIcon(item.roleIconName);
    const HighlightIcon = getMilestoneIcon(item.highlightIconName || "Sparkles");
    const MainIcon = getMilestoneIcon(item.iconName);

    return (
      <div
        key={item.id}
        id={item.id}
        className={cn(
          "flex flex-col justify-between p-5 sm:p-7 relative transition-all duration-300 overflow-hidden group/mcard border w-full hover:-translate-y-1.5 text-left bento-card",
          "rounded-[var(--theme-radius-card,12px)]",
          getGlassCardClass()
        )}
      >
        {/* Subtle Brand Color Radial Tint */}
        <div 
          className="absolute inset-0 opacity-[0.09] dark:opacity-[0.07] pointer-events-none mix-blend-multiply dark:mix-blend-color-dodge"
          style={{ background: `radial-gradient(circle at bottom right, ${item.color}, transparent 75%)` }}
        />

        {/* Watermark Background Icon */}
        <MainIcon 
          className="absolute -right-6 -bottom-6 w-24 h-24 sm:w-28 sm:h-28 rotate-12 pointer-events-none transition-all duration-500 ease-in-out z-0 select-none opacity-10 dark:opacity-8 group-hover/mcard:rotate-6 group-hover/mcard:scale-110 group-hover/mcard:opacity-20"
          style={{ color: item.color }}
        />

        {/* Header: Company Logo & Name & Role on Left, Year Badge Pill on Right */}
        <div className="w-full flex items-center justify-between gap-3 pb-3.5 mb-3 border-b border-slate-200/60 dark:border-slate-800/80 shrink-0 relative z-10">
          <div className="flex items-center gap-3 min-w-0 flex-1 text-left">
            <div 
              className={cn(
                "flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/mcard:scale-105",
                item.id === "card-2018"
                  ? "w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-purple-500/15 dark:bg-purple-500/20 border-2 border-purple-500/35 shadow-[0_0_15px_rgba(168,85,247,0.25)] p-2"
                  : "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/90 dark:bg-slate-950/90 border border-slate-200/80 dark:border-slate-800 p-2 shadow-xs"
              )}
            >
              <img 
                src={item.logo} 
                alt={item.company} 
                className={cn("w-full h-full object-contain", item.id === "card-2018" && "rounded-full")} 
                referrerPolicy="no-referrer" 
                loading="lazy"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 
                className="text-[17px] sm:text-[19px] font-black tracking-tight leading-snug truncate text-slate-900 dark:text-white font-play"
                style={{ color: item.titleColor }}
              >
                {item.company}
              </h4>
              <div 
                className="flex items-center gap-1.5 text-xs sm:text-[13.5px] font-bold mt-0.5 truncate"
                style={{ color: item.color }}
              >
                <RoleIcon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{isVi ? `Vị trí: ${item.roleVi}` : `Position: ${item.roleEn}`}</span>
              </div>
            </div>
          </div>

          {/* Year Badge Pill with Gradient */}
          <span 
            className={cn(
              "px-3.5 py-1.5 rounded-full text-white text-[11px] sm:text-xs font-black font-mono shadow-md tracking-wider uppercase shrink-0 whitespace-nowrap ml-auto",
              item.yearBadgeGradient
            )}
          >
            {isVi ? item.yearLabelVi : item.yearLabelEn}
          </span>
        </div>

        {/* Body: Text with enhanced mobile readability */}
        <div className="w-full flex-1 my-2 text-left relative z-10">
          <p className="text-[14px] sm:text-[15px] leading-relaxed text-slate-800 dark:text-slate-200 text-left font-medium">
            {renderFormattedText(isVi ? item.descVi : item.descEn)}
          </p>

          {item.showMoreLink && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                try { playUiSound("click"); } catch {}
                setExpandedCard(prev => ({ ...prev, [item.id]: !prev[item.id] }));
              }}
              className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline mt-2.5 inline-flex items-center gap-1 cursor-pointer"
            >
              {expandedCard[item.id] ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>{isVi ? "Thu gọn" : "Show less"}</span>
                </>
              ) : (
                <>
                  <span>{isVi ? "Xem thêm →" : "Read more →"}</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Bottom Highlight Bento Box */}
        <div 
          className="w-full mt-4 p-3.5 rounded-xl flex items-center gap-2.5 text-xs sm:text-[13.5px] text-slate-800 dark:text-slate-200 font-semibold relative z-10 border backdrop-blur-md"
          style={{ 
            backgroundColor: `${item.color}15`,
            borderColor: `${item.color}35`
          }}
        >
          <HighlightIcon className="w-4 h-4 shrink-0" style={{ color: item.color }} />
          <span className="flex-1 leading-snug text-left">{isVi ? item.highlightVi : item.highlightEn}</span>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="letter" 
      className="relative w-full h-full flex flex-col justify-start items-center p-3 sm:p-5 md:p-6 max-w-7xl mx-auto gap-5 sm:gap-6 font-sans text-slate-800 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar"
    >
        {/* Tiêu đề trang Thư ngỏ */}
        <PageCardHeader pageId="letter" />

        {/* ========================================================================= */}
        {/* ROW 1: COOPERATION MESSAGE & VIDEO INTRO - BENTO CARD WITH BACKDROP BLUR  */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          id="card-main-letter-content"
          style={{ borderRadius: "var(--theme-radius-card, 12px)" }}
          className={cn(
            "w-full h-auto relative z-10 overflow-hidden p-6 sm:p-8 md:p-10 transition-all duration-300 flex flex-col group border bento-card",
            "rounded-[var(--theme-radius-card,12px)]",
            getGlassCardClass()
          )}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Unified Layout Inside the Single Bento Card */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
            {/* Left Column: Text Content */}
            <div className="lg:col-span-8 flex flex-col justify-center text-left space-y-4">
              {/* Header Title with Animated Icon */}
              <AnimatedCardTitle
                icon={BookCheck}
                title={isVi ? "Thư Ngỏ Hợp Tác" : "New Cooperation Letter"}
                colorPreset="auto"
                indexForAutoColor={0}
              />

              {/* Salutation Line in Vibrant Orange */}
              <p className="text-[#f95700] dark:text-[#f97316] font-extrabold text-[17px] sm:text-[19px] md:text-[21px] leading-snug font-play">
                {isVi ? "Kính gửi Quý đối tác, Quý khách hàng và toàn thể cộng sự." : "Dear Valued Partners, Customers, and Colleagues."}
              </p>

              {/* Body Content with enhanced mobile readability */}
              <p className="text-slate-800 dark:text-slate-200 text-[15px] sm:text-[16px] leading-relaxed font-semibold">
                {isVi ? (
                  <>
                    Tôi là <strong className="font-black text-[#0f172a] dark:text-white">Nguyễn Hùng Thái</strong>, Trưởng phòng Chăm sóc khách hàng với hơn <strong className="font-black text-[#0f172a] dark:text-white">22 năm kinh nghiệm</strong> trong lĩnh vực xây dựng, vận hành và phát triển hệ thống dịch vụ khách hàng chuyên nghiệp.
                  </>
                ) : (
                  <>
                    I am <strong className="font-black text-[#0f172a] dark:text-white">Nguyen Hung Thai</strong>, Customer Service Manager with over <strong className="font-black text-[#0f172a] dark:text-white">22 years of experience</strong> in building, operating, and advancing professional customer care systems.
                  </>
                )}
              </p>

              {/* Additional Highlight Banner with Luxury Backdrop Blur */}
              <div className="pt-2 flex items-center gap-2.5 text-xs sm:text-sm font-mono font-bold text-slate-600 dark:text-slate-300 flex-wrap p-3 rounded-xl bg-white/50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-white/10 backdrop-blur-md">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {isVi ? "Hành trình thực chiến: 2003 - 2026+" : "Operational Journey: 2003 - 2026+"}
                </span>
                <span>•</span>
                <span>{isVi ? "Lãnh đạo tận tâm • Phụng sự bền vững" : "Empathetic Leadership • Dedicated Service"}</span>
              </div>
            </div>

            {/* Right Column: Embedded Video Companion Inside the Bento Card */}
            <div className="lg:col-span-4 flex flex-col justify-center items-stretch">
              <div className="w-full h-full min-h-[220px] sm:min-h-[240px] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-inner relative bg-slate-950/25 backdrop-blur-xl">
                <HeroRobotCompanion fillCard={true} className="absolute inset-0 w-full h-full pointer-events-auto" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 2: TIMELINE (HÀNH TRÌNH SỰ NGHIỆP - CAREER MILESTONES BENTO SECTION)   */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          id="card-career-milestones"
          style={{ borderRadius: "var(--theme-radius-card, 12px)" }}
          className={cn(
            "w-full h-auto transition-all duration-300 flex flex-col relative overflow-hidden p-4 sm:p-6 md:p-8 z-10 border bento-card",
            "rounded-[var(--theme-radius-card,12px)]",
            getGlassCardClass()
          )}
        >
          <div className="relative z-10 w-full">
            {/* Header with Animated Icon */}
            <AnimatedCardTitle
              icon={Rocket}
              title={isVi ? "Hành Trình Sự Nghiệp" : "Career Milestones Journey"}
              colorPreset="auto"
              indexForAutoColor={1}
              actionRight={
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-sky-100/90 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-800/60 shadow-2xs backdrop-blur-md">
                  <Quote className="w-4 h-4 text-blue-600 dark:text-blue-400 rotate-180 shrink-0 -mt-0.5" />
                  <div className="text-blue-800 dark:text-blue-300 font-bold italic text-[12.5px] leading-snug text-left">
                    <span>{isVi ? "Trải nghiệm hôm nay · Tạo giá trị ngày mai" : "Today's experiences · Shape tomorrow's value"}</span>
                  </div>
                </div>
              }
            />

            {/* Central Vertical Timeline Line (Visible on Desktop only) */}
            <div className="absolute left-1/2 top-[70px] bottom-2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-sky-400 via-indigo-500 to-cyan-400 rounded-full hidden md:block z-0 opacity-80 shadow-xs" />

            {/* Rows of Symmetrical Pairs */}
            <div className="flex flex-col gap-6 sm:gap-8 relative z-10 w-full mt-6">
              {careerPairs.map((pair, pIdx) => {
                const leftItem = pair.left;
                const rightItem = pair.right;

                return (
                  <div key={pIdx} className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12 lg:gap-x-16 items-stretch">
                    {/* Left Card */}
                    {renderCareerCard(leftItem)}

                    {/* Right Card */}
                    {renderCareerCard(rightItem)}

                    {/* Desktop Timeline Connections */}
                    <div 
                      className="absolute right-1/2 w-8 lg:w-12 h-[2px] top-1/2 -translate-y-1/2 hidden md:block z-0 pointer-events-none"
                      style={{ 
                        background: `linear-gradient(to right, transparent, ${leftItem.color})`,
                        marginRight: "6px"
                      }}
                    />
                    <div 
                      className="absolute left-1/2 w-8 lg:w-12 h-[2px] top-1/2 -translate-y-1/2 hidden md:block z-0 pointer-events-none"
                      style={{ 
                        background: `linear-gradient(to left, transparent, ${rightItem.color})`,
                        marginLeft: "6px"
                      }}
                    />
                    {/* Dual-color Node on Center Timeline Axis */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center gap-2 z-20 pointer-events-none">
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 shadow-md transition-transform duration-300"
                        style={{ backgroundColor: leftItem.color }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 shadow-md transition-transform duration-300"
                        style={{ backgroundColor: rightItem.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 3: UNIFIED BENTO CARD (TRIẾT LÝ VẬN HÀNH & TÂM THƯ TRI ÂN)             */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          style={{ borderRadius: "var(--theme-radius-card, 12px)" }}
          className={cn(
            "w-full relative overflow-hidden p-6 sm:p-8 md:p-10 transition-all duration-300 text-left border shadow-xl bento-card",
            "rounded-[var(--theme-radius-card,12px)]",
            getGlassCardClass()
          )}
        >
          {/* Ambient Background Glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-400/15 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-emerald-400/15 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch relative z-10">
            {/* Cột 1: TRIẾT LÝ VẬN HÀNH BENTO BOX */}
            <div id="card-tech-solutions" className="flex flex-col justify-between h-full text-left p-2 sm:p-4 rounded-2xl bg-white/40 dark:bg-slate-900/30 border border-slate-200/60 dark:border-white/10 backdrop-blur-xl">
              {/* Header with Animated Icon */}
              <div className="flex flex-col items-start text-left mb-4 w-full">
                <AnimatedCardTitle
                  icon={Sparkles}
                  title={isVi ? "Triết Lý Vận Hành" : "Operational Philosophy"}
                  colorPreset="auto"
                  indexForAutoColor={2}
                />

                {/* Description Paragraph with enhanced mobile readability */}
                <p className="text-[14.5px] sm:text-[15.5px] text-slate-800 dark:text-slate-200 leading-relaxed font-semibold mt-2">
                  {isVi 
                    ? "Qua hơn hai thập kỷ làm việc trong nhiều lĩnh vực khác nhau, tôi nhận ra rằng chăm sóc khách hàng không chỉ là giải quyết vấn đề mà là xây dựng một hệ thống giúp doanh nghiệp phát triển bền vững."
                    : "Through over two decades of working across diverse industries, I realized that customer care is not just about solving issues, but about building a system that fosters sustainable business growth."}
                </p>
              </div>

              {/* Content: Three Core Principles */}
              <div className="flex flex-col gap-3.5 flex-1 w-full mt-2">
                <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                  {isVi ? "Tôi luôn làm việc dựa trên ba nguyên tắc cốt lõi:" : "I always work based on three core principles:"}
                </p>

                <div className="flex flex-col gap-3">
                  {OPERATIONAL_PRINCIPLES_DATA.map((principle, idx) => {
                    const PrincipleIcon = idx === 0 ? Box : idx === 1 ? Users : Network;
                    return (
                      <div 
                        key={principle.id}
                        className={cn(
                          "p-4 rounded-xl bg-white/70 dark:bg-slate-900/60 border shadow-xs text-left flex items-center gap-3.5 transition-all hover:scale-[1.01] duration-300 backdrop-blur-md",
                          principle.borderClass
                        )}
                      >
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-3xs", principle.bgClass)}>
                          <PrincipleIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-[14.5px] sm:text-[15.5px] text-slate-900 dark:text-white font-play">
                            {isVi ? principle.titleVi : principle.titleEn}
                          </h4>
                          <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 mt-0.5 font-medium">
                            {isVi ? principle.descVi : principle.descEn}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Cột 2: TÂM THƯ TRI ÂN BENTO BOX */}
            <div id="card-gratitude-statement" className="flex flex-col justify-between h-full text-left p-2 sm:p-4 rounded-2xl bg-white/40 dark:bg-slate-900/30 border border-slate-200/60 dark:border-white/10 backdrop-blur-xl">
              {/* Top - Sincere Content & Quote */}
              <div className="w-full flex flex-col justify-between gap-4 text-left">
                <div className="flex flex-col gap-3">
                  {/* Header title with Animated Icon */}
                  <AnimatedCardTitle
                    icon={Heart}
                    title={isVi ? "Tâm Thư Tri Ân" : "Appreciation Letter"}
                    colorPreset="auto"
                    indexForAutoColor={3}
                  />

                  {/* Sincere message with enhanced mobile readability */}
                  <div className="text-[14.5px] sm:text-[15.5px] text-slate-800 dark:text-slate-200 leading-relaxed space-y-3 font-semibold">
                    <p>
                      {isVi ? (
                        <>
                          Từ đó, tôi tập trung xây dựng các hệ thống <strong className="font-black text-[#0057FF] dark:text-cyan-400">CRM</strong>, <strong className="font-black text-[#0057FF] dark:text-cyan-400">Dashboard quản trị</strong>, <strong className="font-black text-[#0057FF] dark:text-cyan-400">AI Chatbot</strong> và các giải pháp <strong className="font-black text-[#0057FF] dark:text-cyan-400">tự động hóa</strong>, nhằm nâng cao hiệu quả vận hành, tối ưu trải nghiệm khách hàng và hỗ trợ nhà quản lý ra quyết định bằng dữ liệu.
                        </>
                      ) : (
                        <>
                          From there, I focus on building <strong className="font-black text-[#0057FF] dark:text-cyan-400">CRM</strong> systems, <strong className="font-black text-[#0057FF] dark:text-cyan-400">management Dashboards</strong>, <strong className="font-black text-[#0057FF] dark:text-cyan-400">AI Chatbots</strong>, and <strong className="font-black text-[#0057FF] dark:text-cyan-400">automation</strong> solutions to enhance operational efficiency, optimize customer experience, and support managers in making data-driven decisions.
                        </>
                      )}
                    </p>
                    <p>
                      {isVi ? (
                        <>
                          Bên cạnh công nghệ, tôi luôn xem <strong className="font-black text-[#0057FF] dark:text-cyan-400">con người</strong> là yếu tố quyết định thành công. Vì vậy, tôi chú trọng đào tạo đội ngũ biết lắng nghe, thấu hiểu và mang đến những trải nghiệm vượt mong đợi cho khách hàng.
                        </>
                      ) : (
                        <>
                          Beside technology, I always consider <strong className="font-black text-[#0057FF] dark:text-cyan-400">people</strong> as the deciding factor for success. Therefore, I focus on training the team to listen, understand, and bring experiences that exceed customer expectations.
                        </>
                      )}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono pt-1">
                      {isVi ? "Tôi luôn tâm niệm:" : "I always believe:"}
                    </p>
                  </div>
                </div>

                {/* Quote box synthesis with Luxury Backdrop Blur */}
                <div className="w-full bg-white/70 dark:bg-slate-900/60 p-4.5 rounded-xl border border-indigo-100/80 dark:border-indigo-900/40 relative flex flex-col justify-center shadow-xs backdrop-blur-md">
                  <Quote className="absolute top-3 left-3 w-5 h-5 text-indigo-400/30 dark:text-indigo-400/15 rotate-180" />
                  
                  <div className="relative z-10 text-left pl-5">
                    <p className="text-sm sm:text-base font-extrabold text-indigo-700 dark:text-cyan-400 italic">
                      {isVi 
                        ? "“Sự hài lòng của khách hàng không đến từ sự hoàn hảo, mà đến từ sự đồng cảm kịp thời.”"
                        : "“Customer satisfaction does not come from perfection, but from timely empathy.”"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom - Signature Block */}
              <div className="w-full flex flex-col justify-between gap-3 text-left pt-4 border-t border-slate-200/60 dark:border-slate-800/80 mt-5">
                <div className="flex flex-col items-start text-left">
                  <div className="mb-0.5 -ml-1">
                    <SignatureSvg />
                  </div>
                  <h4 className="text-[17px] sm:text-[18px] font-black text-slate-900 dark:text-white font-play">
                    Nguyễn Hùng Thái
                  </h4>
                  <span className="text-xs sm:text-[13px] font-semibold text-slate-600 dark:text-slate-300 mt-0.5 uppercase tracking-wide font-mono">
                    {isVi ? "Trưởng phòng Chăm sóc Khách hàng" : "Customer Service Manager"}
                  </span>

                  <div className="flex flex-wrap items-center justify-start gap-1.5 mt-3 text-[10px] font-black tracking-widest text-emerald-600/90 dark:text-emerald-400 uppercase font-mono">
                    <span>TRẢI NGHIỆM</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    <span>KẾT NỐI</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    <span>PHÁT TRIỂN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 4: CORE VALUES PURSUED (BENTO GRID CARDS)                             */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          id="card-core-values-pursued"
          style={{ borderRadius: "var(--theme-radius-card, 12px)" }}
          className={cn(
            "w-full p-6 sm:p-8 shadow-xl transition-all duration-300 flex flex-col items-start group/values z-10 border text-left bento-card",
            "rounded-[var(--theme-radius-card,12px)]",
            getGlassCardClass()
          )}
        >
          {/* Tiêu đề Khối with Animated Icon */}
          <AnimatedCardTitle
            icon={Award}
            title={isVi ? "Giá Trị Cốt Lõi" : "Core Values Pursued"}
            colorPreset="auto"
            indexForAutoColor={4}
          />

          {/* 4 Cột Giá Trị Cốt Lõi thiết kế Bento Card Cao Cấp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full mt-5">
            {CORE_VALUES_DATA.map((val) => {
              const ValueIcon = val.number === "01" ? Heart : val.number === "02" ? Target : val.number === "03" ? Lightbulb : Handshake;
              return (
                <div 
                  key={val.number}
                  style={{ borderRadius: "var(--theme-radius-inner, var(--theme-radius-md, 14px))" }}
                  className={cn(
                    "relative overflow-hidden flex flex-col justify-between p-5 sm:p-6 bg-gradient-to-br border shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer min-h-[200px] text-left group backdrop-blur-md bento-card",
                    val.colorTheme.bgGradient,
                    val.colorTheme.border
                  )}
                >
                  <div 
                    className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08] pointer-events-none mix-blend-multiply dark:mix-blend-color-dodge"
                    style={{ background: `radial-gradient(circle at bottom right, ${val.colorTheme.primary}, transparent 75%)` }}
                  />
                  <ValueIcon className="absolute -right-6 -bottom-6 w-24 h-24 opacity-10 rotate-12 pointer-events-none" />
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className={cn("w-12 h-12 rounded-2xl border flex items-center justify-center relative transition-transform duration-300 group-hover:scale-110 shadow-sm backdrop-blur-md", val.colorTheme.iconBg)}>
                      <ValueIcon className="w-6 h-6" />
                    </div>
                    <span className={cn("font-mono font-black text-3xl sm:text-4xl select-none", val.colorTheme.numberText)}>{val.number}</span>
                  </div>

                  <div className="mt-4 mb-4 relative z-10 text-left">
                    <h4 className={cn("text-[17px] sm:text-[18px] font-black tracking-normal mb-1.5 font-play", val.colorTheme.titleText)}>
                      {isVi ? val.titleVi : val.titleEn}
                    </h4>
                    <p className="text-[14px] sm:text-[14.5px] text-slate-700 dark:text-slate-300 leading-relaxed max-w-[30ch] font-semibold">
                      {isVi ? val.descVi : val.descEn}
                    </p>
                  </div>

                  <span className={cn("text-[11px] tracking-widest font-mono font-bold uppercase mt-auto relative z-10", val.colorTheme.tagText)}>
                    {val.idName}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 5: HERO QUOTE BANNER (LUXURY BENTO BANNER)                            */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="w-full relative group/banner overflow-hidden z-10"
        >
          {/* Khối Banner Tinh Tế Glass Bento UI */}
          <div 
            style={{ borderRadius: "var(--theme-radius-card, 12px)" }}
            className={cn(
              "relative z-10 w-full bg-linear-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 text-white p-5 sm:p-6 md:p-7 shadow-xl flex flex-col md:flex-row items-center justify-between gap-5 overflow-hidden text-left border bento-card",
              "rounded-[var(--theme-radius-card,12px)]",
              "border-white/20 dark:border-slate-800",
              "backdrop-blur-[24px] backdrop-saturate-[200%]"
            )}
          >
            {/* Ambient Lighting Layer */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            {/* Left Column: Quote Icon Badge */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 dark:bg-white/10 border border-white/30 flex items-center justify-center shrink-0 shadow-md backdrop-blur-xl relative z-10 transition-transform duration-300 group-hover/banner:scale-105">
              <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Middle Column: Quotes text */}
            <div className="flex-1 min-w-0 relative z-10 text-center md:text-left">
              <p className="text-white text-base sm:text-lg font-bold leading-relaxed tracking-wide font-play select-none">
                {isVi ? (
                  <>
                    "Thành công không chỉ đến từ năng lực,
                    <br className="hidden sm:block" />
                    mà từ sự chân thành và tinh thần phụng sự."
                  </>
                ) : (
                  <>
                    "Success comes not only from competence,
                    <br className="hidden sm:block" />
                    from sincerity and a spirit of service."
                  </>
                )}
              </p>
            </div>

            {/* Horizontally aligned three dots at bottom right as decorator */}
            <div className="flex items-center gap-1.5 opacity-70 shrink-0">
              <span className="w-2 h-2 rounded-full bg-white/80" />
              <span className="w-2 h-2 rounded-full bg-white/80" />
              <span className="w-2 h-2 rounded-full bg-white/80" />
            </div>
          </div>
        </motion.div>
    </section>
  );
}
