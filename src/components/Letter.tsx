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
  ChevronRight
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

  const messageCardRef = useRef<HTMLDivElement>(null);
  const [messageCardHeight, setMessageCardHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const updateHeight = () => {
      if (messageCardRef.current) {
        setMessageCardHeight(messageCardRef.current.offsetHeight);
      }
    };
    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    if (messageCardRef.current) {
      ro.observe(messageCardRef.current);
    }
    window.addEventListener("resize", updateHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const letters = [
    {
      id: 0,
      icon: BookCheck,
      colorPreset: "emerald",
      salutation: isVi ? "Kính gửi Quý đối tác, Quý khách hàng và toàn thể cộng sự." : "Dear Valued Partners, Customers, and Colleagues.",
      title: isVi ? "Thông điệp hợp tác chiến lược" : "Strategic Cooperation Message",
      subtitle: isVi ? "Tầm nhìn & Định hướng phát triển bền vững" : "Vision & Strategic Growth Orientation",
      body: isVi ? (
        <>
          Tôi là <strong className="font-black text-slate-900 dark:text-white">Nguyễn Hùng Thái</strong>, Trưởng phòng Chăm sóc khách hàng với hơn <strong className="font-black text-slate-950 dark:text-white">22 năm kinh nghiệm</strong> trong lĩnh vực xây dựng, vận hành và phát triển hệ thống dịch vụ khách hàng chuyên nghiệp. Với triết lý lấy khách hàng làm trọng tâm, tôi cam kết đồng hành cùng quý doanh nghiệp kiến tạo những giải pháp tối ưu.
        </>
      ) : (
        <>
          I am <strong className="font-black text-slate-900 dark:text-white">Nguyen Hung Thai</strong>, Customer Service Manager with over <strong className="font-black text-slate-950 dark:text-white">22 years of experience</strong> in building, operating, and advancing professional customer care systems.
        </>
      )
    }
  ];

  // Dynamic theme-aware Glass Card classes for both Light and Dark modes
  const getGlassCardClass = useCallback(() => {
    switch (theme as string) {
      case "glass-dark-neon":
        return "bg-[#121218]/85 dark:bg-[#121218]/85 border-cyan-400/25 dark:border-white/15 backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[0_0_20px_rgba(0,240,255,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.25)]";
      case "modern-light-glass":
        return "bg-white/70 dark:bg-slate-900/75 border-white/80 dark:border-white/15 backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[0_10px_30px_0_rgba(100,110,140,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_14px_40px_0_rgba(100,110,140,0.15)]";
      case "mritech-digital-growth":
      default:
        return "bg-white/75 dark:bg-[#121218]/80 border-white/70 dark:border-white/12 backdrop-blur-[18px] backdrop-saturate-[180%] shadow-[0_8px_32px_0_rgba(31,38,135,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.12)]";
    }
  }, [theme]);

  // Collapse/Expand state for career milestones
  const [expandedCard, setExpandedCard] = useState<Record<string, boolean>>({
    "card-2013": false
  });

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

  // Subcomponent to render each career card
  const renderCareerCard = (item: CareerMilestoneItem) => {
    const RoleIcon = getMilestoneIcon(item.roleIconName);
    const HighlightIcon = getMilestoneIcon(item.highlightIconName || "Sparkles");
    const MainIcon = getMilestoneIcon(item.iconName);

    return (
      <div
        key={item.id}
        id={item.id}
        className={cn(
          "flex flex-col justify-between p-5 sm:p-6 relative transition-all duration-300 overflow-hidden group/mcard border w-full hover:-translate-y-1 text-left",
          "rounded-[var(--theme-radius-card,10px)]",
          getGlassCardClass()
        )}
      >
        {/* Subtle Brand Color Radial Tint */}
        <div 
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.06] pointer-events-none mix-blend-multiply dark:mix-blend-color-dodge"
          style={{ background: `radial-gradient(circle at bottom right, ${item.color}, transparent 70%)` }}
        />

        {/* Watermark Background Icon */}
        <MainIcon 
          className="absolute -right-6 -bottom-6 w-24 h-24 sm:w-28 sm:h-28 rotate-12 pointer-events-none transition-all duration-500 ease-in-out z-0 select-none opacity-10 dark:opacity-8 group-hover/mcard:rotate-6 group-hover/mcard:scale-110 group-hover/mcard:opacity-20"
          style={{ color: item.color }}
        />

        {/* Header: Company Logo & Name & Role on Left, Year Badge Pill on Right */}
        <div className="w-full flex items-center justify-between gap-2.5 pb-3 mb-2.5 border-b border-slate-200/60 dark:border-slate-800/80 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 text-left">
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
                className="text-[16px] sm:text-[18px] font-black tracking-tight leading-snug truncate text-slate-900 dark:text-white font-play"
                style={{ color: item.titleColor }}
              >
                {item.company}
              </h4>
              <div 
                className="flex items-center gap-1.5 text-xs sm:text-[13px] font-bold mt-0.5 truncate"
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
              "px-3 py-1 rounded-full text-white text-[11px] sm:text-xs font-black font-mono shadow-sm tracking-wider uppercase shrink-0 whitespace-nowrap ml-auto",
              item.yearBadgeGradient
            )}
          >
            {isVi ? item.yearLabelVi : item.yearLabelEn}
          </span>
        </div>

        {/* Body: Text with full width readability */}
        <div className="w-full flex-1 my-1.5 text-left relative z-10">
          <p className="text-[13.5px] sm:text-[14.5px] leading-relaxed text-slate-800 dark:text-slate-200 text-left font-medium">
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
              className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline mt-2 inline-flex items-center gap-1 cursor-pointer"
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

        {/* Bottom Highlight Box */}
        <div 
          className="w-full mt-3.5 p-3 rounded-xl flex items-center gap-2.5 text-xs sm:text-[13px] text-slate-800 dark:text-slate-200 font-semibold relative z-10 border"
          style={{ 
            backgroundColor: `${item.color}12`,
            borderColor: `${item.color}30`
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
      className="relative w-full h-full flex flex-col justify-start items-stretch p-[15px] font-sans text-slate-800 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar"
    >
      {/* Container Thư ngỏ chính */}
      <div 
        id="info-card-open-letter"
        className="w-full flex-grow flex flex-col gap-[15px] max-w-7xl mx-auto justify-start relative z-10"
      >

        {/* Tiêu đề trang Thư ngỏ */}
        <PageCardHeader pageId="letter" />

        {/* ========================================================================= */}
        {/* ROW 1: COOPERATION MESSAGE & DEDICATION PILLARS                          */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-[15px] items-stretch"
        >
          {/* CÁC BỨC TÂM THƯ RIÊNG BIỆT (Dạng đứng độc lập, không slide) */}
          <div
            id="card-main-letter-content"
            className="lg:col-span-8 w-full flex flex-col gap-[15px] z-10"
          >
            {letters.map((letter) => (
              <div
                key={letter.id}
                ref={messageCardRef}
                style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
                className={cn(
                  "p-5 sm:p-6 border flex flex-col justify-center transition-all duration-300 shadow-xs text-left w-full relative overflow-hidden",
                  getGlassCardClass()
                )}
              >
                {/* Subtle Brand Color Radial Tint */}
                <div 
                  className="absolute -right-12 -bottom-12 w-32 h-32 rounded-full opacity-[0.06] pointer-events-none"
                  style={{ backgroundColor: "var(--color-primary)" }}
                />

                <div className="w-full flex flex-col justify-center relative z-10 text-left">
                  {/* Header Title with Animated Icon */}
                  <AnimatedCardTitle
                    icon={letter.icon}
                    title={letter.title}
                    subtitle={letter.subtitle}
                    colorPreset={letter.colorPreset as any}
                  />

                  {/* Salutation Line in Vibrant Orange */}
                  <p className="text-[#f95700] dark:text-[#f97316] font-extrabold text-[14px] sm:text-[16px] md:text-[17px] leading-snug mb-2.5 font-play">
                    {letter.salutation}
                  </p>

                  {/* Body Content */}
                  <p className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm md:text-[14.5px] leading-relaxed font-semibold text-left">
                    {letter.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* THẺ VIDEO RIÊNG BIỆT (Standalone Video Showcase Card) */}
          <div
            id="card-letter-video-showcase"
            style={{ 
              borderRadius: "var(--theme-radius-card, 10px)",
              height: messageCardHeight ? `${messageCardHeight}px` : undefined,
              maxHeight: messageCardHeight ? `${messageCardHeight}px` : undefined,
            }}
            className={cn(
              "lg:col-span-4 w-full relative overflow-hidden transition-all duration-300 flex flex-col justify-center items-stretch group z-10 border text-left",
              "rounded-[var(--theme-radius-card,10px)]",
              getGlassCardClass()
            )}
          >
            <HeroRobotCompanion fillCard={true} className="absolute inset-0 w-full h-full pointer-events-auto" />
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 2: TIMELINE (HÀNH TRÌNH SỰ NGHIỆP - CAREER MILESTONES)               */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          id="card-career-milestones"
          style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
          className={cn(
            "w-full transition-all duration-300 flex flex-col relative overflow-hidden p-[15px] my-[15px] gap-[15px] z-10 border",
            "rounded-[var(--theme-radius-card,10px)]",
            getGlassCardClass()
          )}
        >
          <div className="relative z-10 w-full">
            {/* Header with Animated Icon */}
            <AnimatedCardTitle
              icon={Rocket}
              title={isVi ? "Hành trình sự nghiệp đột phá" : "Breakthrough Career Journey Milestones"}
              colorPreset="cyan"
              actionRight={
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-sky-100/80 dark:bg-sky-950/50 border border-sky-200/80 dark:border-sky-800/60 shadow-2xs">
                  <Quote className="w-4 h-4 text-blue-600 dark:text-blue-400 rotate-180 shrink-0 -mt-0.5" />
                  <div className="text-blue-800 dark:text-blue-300 font-bold italic text-[12px] leading-snug text-left">
                    <span>{isVi ? "Trải nghiệm hôm nay · Tạo giá trị ngày mai" : "Today's experiences · Shape tomorrow's value"}</span>
                  </div>
                </div>
              }
            />

            {/* Grid Timeline Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-10 lg:gap-x-12 relative z-10 w-full items-stretch">
              {CAREER_MILESTONES_DATA.map((item) => renderCareerCard(item))}
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 3: SEPARATE OPERATIONAL PHILOSOPHY & APPRECIATION LETTER (SAME ROW)   */}
        {/* ========================================================================= */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-[15px] items-stretch z-10">
          {/* THẺ 1: Triết lý quản trị vận hành */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            id="card-operational-philosophy"
            style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
            className={cn(
              "w-full h-full relative overflow-hidden p-5 sm:p-7 md:p-8 transition-all duration-300 z-10 border text-left flex flex-col justify-between",
              "rounded-[var(--theme-radius-card,10px)]",
              getGlassCardClass()
            )}
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-300/15 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

            <div className="relative z-10 w-full flex flex-col justify-between h-full">
              <div>
                <AnimatedCardTitle
                  icon={Sparkles}
                  title={isVi ? "Triết lý quản trị vận hành" : "Operational Management Philosophy"}
                  subtitle={isVi ? "Kiến trúc hệ thống phụng sự bền vững" : "Sustainable service ecosystem"}
                  colorPreset="purple"
                />

                <p className="text-[14px] sm:text-[15px] text-slate-800 dark:text-slate-200 leading-relaxed font-semibold mt-2 mb-4">
                  {isVi 
                    ? "Qua hơn hai thập kỷ làm việc trong nhiều lĩnh vực khác nhau, tôi nhận ra rằng chăm sóc khách hàng không chỉ là giải quyết vấn đề mà là xây dựng một hệ thống giúp doanh nghiệp phát triển bền vững."
                    : "Through over two decades across diverse industries, I realized customer care is not just about solving issues, but about building an ecosystem for sustainable growth."}
                </p>

                <div className="flex flex-col gap-2.5">
                  {OPERATIONAL_PRINCIPLES_DATA.map((principle, idx) => {
                    const PrincipleIcon = idx === 0 ? Box : idx === 1 ? Users : Network;
                    return (
                      <div 
                        key={principle.id}
                        className={cn(
                          "p-3 rounded-xl bg-white/60 dark:bg-slate-900/40 border shadow-xs text-left flex items-center gap-3 transition-transform hover:scale-[1.01] duration-300",
                          principle.borderClass
                        )}
                      >
                        <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-3xs", principle.bgClass)}>
                          <PrincipleIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white font-play">
                            {isVi ? principle.titleVi : principle.titleEn}
                          </h4>
                          <p className="text-3xs sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                            {isVi ? principle.descVi : principle.descEn}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* THẺ 2: Tâm thư tri ân phụng sự & Chữ ký */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            id="card-appreciation-letter"
            style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
            className={cn(
              "w-full h-full relative overflow-hidden p-5 sm:p-7 md:p-8 transition-all duration-300 z-10 border text-left flex flex-col justify-between",
              "rounded-[var(--theme-radius-card,10px)]",
              getGlassCardClass()
            )}
          >
            {/* Ambient Background Glow */}
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-400/10 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -z-0" />

            <div className="relative z-10 w-full flex flex-col justify-between h-full">
              <div className="space-y-3.5">
                <AnimatedCardTitle
                  icon={Heart}
                  title={isVi ? "Tâm thư tri ân phụng sự" : "Sincere Appreciation Letter"}
                  subtitle={isVi ? "Đồng hành & Kiến tạo giá trị" : "Companionship & Value Creation"}
                  colorPreset="rose"
                />

                <div className="text-[13.5px] sm:text-[14.5px] text-slate-800 dark:text-slate-200 leading-relaxed space-y-2.5 font-semibold">
                  <p>
                    {isVi ? (
                      <>
                        Tôi tập trung xây dựng hệ thống <strong className="font-black text-[#0057FF] dark:text-cyan-400">CRM</strong>, <strong className="font-black text-[#0057FF] dark:text-cyan-400">Dashboard quản trị</strong>, <strong className="font-black text-[#0057FF] dark:text-cyan-400">AI Chatbot</strong> và các giải pháp <strong className="font-black text-[#0057FF] dark:text-cyan-400">tự động hóa</strong> nhằm nâng cao hiệu quả vận hành và hỗ trợ ra quyết định bằng dữ liệu thực chiến.
                      </>
                    ) : (
                      <>
                        I focus on developing <strong className="font-black text-[#0057FF] dark:text-cyan-400">CRM</strong> systems, <strong className="font-black text-[#0057FF] dark:text-cyan-400">Dashboards</strong>, <strong className="font-black text-[#0057FF] dark:text-cyan-400">AI Chatbots</strong>, and <strong className="font-black text-[#0057FF] dark:text-cyan-400">automation</strong> solutions for data-driven decisions.
                      </>
                    )}
                  </p>
                  <p>
                    {isVi ? (
                      <>
                        Bên cạnh công nghệ, tôi luôn xem <strong className="font-black text-[#0057FF] dark:text-cyan-400">con người</strong> là yếu tố quyết định. Đội ngũ được đào tạo chuyên sâu biết lắng nghe và mang đến trải nghiệm vượt trên cả sự mong đợi.
                      </>
                    ) : (
                      <>
                        Beyond technology, <strong className="font-black text-[#0057FF] dark:text-cyan-400">people</strong> are the deciding factor—teams coached in empathy to deliver exceptional experiences.
                      </>
                    )}
                  </p>
                </div>

                {/* Quote box */}
                <div className="w-full bg-[#fcfcff]/80 dark:bg-slate-900/50 p-3.5 rounded-xl border border-indigo-100 dark:border-indigo-900/40 relative flex items-center shadow-xs">
                  <Quote className="w-4 h-4 text-indigo-400/40 rotate-180 shrink-0 mr-2" />
                  <p className="text-xs sm:text-sm font-extrabold text-indigo-700 dark:text-cyan-300 italic leading-snug">
                    {isVi 
                      ? "“Sự hài lòng của khách hàng không đến từ sự hoàn hảo, mà đến từ sự đồng cảm kịp thời.”"
                      : "“Customer satisfaction comes from timely empathy rather than absolute perfection.”"}
                  </p>
                </div>
              </div>

              {/* Signature Block */}
              <div className="pt-3 border-t border-slate-200/55 dark:border-slate-800/60 mt-4 flex items-center justify-between">
                <div className="flex flex-col text-left">
                  <div className="-ml-1">
                    <SignatureSvg />
                  </div>
                  <h4 className="text-[15px] sm:text-[16px] font-black text-slate-900 dark:text-white font-play">
                    Nguyễn Hùng Thái
                  </h4>
                  <span className="text-3xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide font-mono">
                    {isVi ? "Trưởng phòng Chăm sóc Khách hàng" : "Customer Service Manager"}
                  </span>
                </div>

                <div className="hidden sm:flex flex-col items-end gap-1 text-[9px] font-black tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-mono">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">22+ NĂM THỰC CHIẾN</span>
                  <span>TRẢI NGHIỆM · KẾT NỐI · PHÁT TRIỂN</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 4: CORE VALUES PURSUED (BENTO GRID CARDS)                             */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          id="card-core-values-pursued"
          style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
          className={cn(
            "w-full p-5 sm:p-6 shadow-md transition-all duration-300 flex flex-col items-start group/values z-10 border text-left",
            "rounded-[var(--theme-radius-card,10px)]",
            getGlassCardClass()
          )}
        >
          {/* Tiêu đề Khối with Animated Icon */}
          <AnimatedCardTitle
            icon={Award}
            title={isVi ? "Giá trị cốt lõi phát triển" : "Core Values Pursued"}
            colorPreset="orange"
          />

          {/* 4 Cột Giá Trị Cốt Lõi thiết kế Bento Card Cao Cấp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[15px] w-full mt-4">
            {CORE_VALUES_DATA.map((val) => {
              const ValueIcon = val.number === "01" ? Heart : val.number === "02" ? Target : val.number === "03" ? Lightbulb : Handshake;
              return (
                <div 
                  key={val.number}
                  style={{ borderRadius: "var(--theme-radius-inner, var(--theme-radius-md, 12px))" }}
                  className={cn(
                    "relative overflow-hidden flex flex-col justify-between p-5 sm:p-6 bg-gradient-to-br border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[190px] text-left group",
                    val.colorTheme.bgGradient,
                    val.colorTheme.border
                  )}
                >
                  <div 
                    className="absolute inset-0 opacity-4 dark:opacity-[0.06] pointer-events-none mix-blend-multiply dark:mix-blend-color-dodge"
                    style={{ background: `radial-gradient(circle at bottom right, ${val.colorTheme.primary}, transparent 70%)` }}
                  />
                  <ValueIcon className="absolute -right-6 -bottom-6 w-24 h-24 opacity-8 rotate-12 pointer-events-none" />
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className={cn("w-11 h-11 rounded-full border flex items-center justify-center relative transition-transform duration-300 group-hover:scale-110", val.colorTheme.iconBg)}>
                      <ValueIcon className="w-5.5 h-5.5" />
                    </div>
                    <span className={cn("font-mono font-black text-3xl sm:text-4xl select-none", val.colorTheme.numberText)}>{val.number}</span>
                  </div>

                  <div className="mt-4 mb-4 relative z-10 text-left">
                    <h4 className={cn("text-lg font-black tracking-normal mb-1.5 font-play", val.colorTheme.titleText)}>
                      {isVi ? val.titleVi : val.titleEn}
                    </h4>
                    <p className="text-[13.5px] sm:text-[14px] text-slate-700 dark:text-slate-300 leading-relaxed max-w-[28ch] font-semibold">
                      {isVi ? val.descVi : val.descEn}
                    </p>
                  </div>

                  <span className={cn("text-[10px] tracking-widest font-mono font-bold uppercase mt-auto relative z-10", val.colorTheme.tagText)}>
                    {val.idName}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 5: HERO QUOTE BANNER                                                 */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="w-full relative group/banner overflow-hidden z-10"
        >
          {/* Khối Banner Tinh Tế Glass UI */}
          <div 
            style={{ borderRadius: "var(--theme-radius-card, 10px)" }}
            className={cn(
              "relative z-10 w-full bg-linear-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 text-white p-4 sm:p-5 md:p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 overflow-hidden text-left border",
              "rounded-[var(--theme-radius-card,10px)]",
              "border-white/20 dark:border-slate-800",
              "backdrop-blur-[16px] backdrop-saturate-[180%]"
            )}
          >
            {/* Ambient Lighting Layer */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* Left Column: Quote Icon Badge */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/15 dark:bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-xs backdrop-blur-md relative z-10 transition-transform duration-300 group-hover/banner:scale-105">
              <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>

            {/* Middle Column: Quotes text */}
            <div className="flex-1 min-w-0 relative z-10 text-center md:text-left">
              <p className="text-white text-sm sm:text-base font-bold leading-relaxed tracking-wide font-play select-none">
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
                    but from sincerity and a spirit of service."
                  </>
                )}
              </p>
            </div>

            {/* Horizontally aligned three dots at bottom right as decorator */}
            <div className="flex items-center gap-1 opacity-60 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
