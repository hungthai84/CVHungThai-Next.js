import React, { memo } from "react";
import { motion } from "motion/react";
import { 
  User, 
  Briefcase, 
  Brain, 
  GraduationCap, 
  Compass, 
  ClipboardList, 
  Video, 
  Sparkles, 
  Server, 
  Images, 
  MessagesSquare, 
  MailOpen, 
  ArrowUpRight, 
  ChevronRight, 
  ShieldCheck, 
  TrendingUp, 
  Bot, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  Printer, 
  Award, 
  CheckCircle2, 
  Layers, 
  LayoutGrid, 
  Send,
  Film,
  Sliders,
  ShieldAlert
} from "lucide-react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { useLayout } from "../context/LayoutContext";
import { cn, getUnifiedSurfaceStyle } from "../lib/utils";
import { playUiSound } from "../lib/sound";
import profileData from "../data/profile.json";
import { DOMAINS_DATA } from "../data/domainsData";
import { SYSTEMS_12_DATA } from "./Systems";

interface BentoGridLayoutProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
}

const bentoContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.03,
    },
  },
};

const bentoItemVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 22,
      stiffness: 260,
      mass: 0.8,
    },
  },
};

export const BentoGridLayout: React.FC<BentoGridLayoutProps> = ({ onNavigate }) => {
  const { lang, setLang } = useLanguage();
  const { theme, openThemeModal } = useTheme();
  const { setLayoutMode } = useLayout();
  const isVi = lang === "vi";
  const [isLayoutDropdownOpen, setIsLayoutDropdownOpen] = React.useState(false);

  const handleGoTo = (id: string) => {
    try {
      playUiSound("click");
    } catch {}
    if (onNavigate) {
      onNavigate(id);
    } else {
      window.dispatchEvent(new CustomEvent("app-navigate", { detail: id }));
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const profile = profileData.profile;

  // Adaptive glass card style that works cleanly across both Light and Dark themes
  const getGlassStyle = () => {
    switch (theme as string) {
      case "glass-dark-neon":
        return "bg-slate-950/80 border-cyan-400/25 dark:border-white/15 backdrop-blur-[20px] shadow-[0_0_25px_rgba(0,240,255,0.12)] hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(0,240,255,0.22)]";
      case "soft-floating-bento":
        return "bg-white/80 dark:bg-slate-900/80 border-white/70 dark:border-white/15 backdrop-blur-[18px] shadow-[0_10px_30px_rgba(88,101,232,0.1)] hover:shadow-[0_16px_40px_rgba(88,101,232,0.18)]";
      case "modern-light-glass":
        return "bg-white/75 dark:bg-slate-900/80 border-white/80 dark:border-white/15 backdrop-blur-[20px] shadow-[0_10px_30px_rgba(100,110,140,0.08)] hover:shadow-[0_16px_40px_rgba(100,110,140,0.16)]";
      case "glass-ui-layout":
        return "bg-white/75 dark:bg-[#13172e]/85 border-white/80 dark:border-white/15 backdrop-blur-[20px] shadow-[0_10px_30px_rgba(167,139,250,0.12)] hover:shadow-[0_16px_40px_rgba(167,139,250,0.22)]";
      default:
        return "bg-white/75 dark:bg-slate-900/80 border-white/70 dark:border-white/15 backdrop-blur-[18px] shadow-[0_8px_32px_rgba(31,38,135,0.08)] hover:shadow-[0_14px_38px_rgba(31,38,135,0.16)]";
    }
  };

  return (
    <div 
      className={cn(
        "bento-grid-layout-root w-full h-full min-h-full overflow-y-auto p-3.5 sm:p-5 font-play select-auto no-scrollbar",
        getUnifiedSurfaceStyle(theme)
      )}
    >
      <motion.div
        variants={bentoContainerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-[1280px] mx-auto columns-1 md:columns-2 lg:columns-3 gap-4.5 [column-fill:_balance] pb-28"
      >
        {/* ========================================================================= */}
        {/* CARD 1: HERO & EXECUTIVE IDENTITY (Span 8 trên Desktop)                   */}
        {/* ========================================================================= */}
        <motion.div
          variants={bentoItemVariants}
          style={{ borderRadius: "var(--theme-radius-card, 16px)" }}
          className={cn(
            "bento-card break-inside-avoid mb-4.5 w-full inline-block p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group",
            getGlassStyle()
          )}
        >
          {/* Ambient decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-500/15 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Top Tag & Status */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 relative z-10">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 dark:bg-cyan-500/20 text-blue-700 dark:text-cyan-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isVi ? "Giám Đốc Dịch Vụ Khách Hàng (CX / CS)" : "Senior CX / CS Director"}</span>
              </div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>TP. Hồ Chí Minh, Việt Nam</span>
              </span>
            </div>

            {/* Profile Avatar & Headline Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-5 relative z-10">
              <div className="relative shrink-0">
                <img
                  src="https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif"
                  alt="Nguyễn Hùng Thái"
                  className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl object-cover border-2 border-brand-primary/80 shadow-lg group-hover:scale-105 transition-transform duration-300 ring-4 ring-brand-primary/20"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" title="Online" />
              </div>

              <div className="flex flex-col min-w-0">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1.5">
                  {profile.name}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-cyan-400 leading-snug">
                  {profile.title}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed mt-2 line-clamp-2 max-w-2xl">
                  {profile.introduction}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-slate-200/60 dark:border-white/10 relative z-10">
            <button
              type="button"
              onClick={() => handleGoTo("about")}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold shadow-md hover:shadow-blue-500/30 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <User className="w-3.5 h-3.5" />
              <span>{isVi ? "Xem Hồ Sơ Chi Tiết" : "View Full Story"}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => {
                try { playUiSound("click"); } catch {}
                window.dispatchEvent(new CustomEvent("open-resume-export"));
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/15 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Printer className="w-3.5 h-3.5 text-rose-500" />
              <span>{isVi ? "In PDF Profile" : "Print PDF"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleGoTo("contact")}
              className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-400/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ml-auto"
            >
              <MessagesSquare className="w-3.5 h-3.5" />
              <span>{isVi ? "Kết Nối Nhanh" : "Quick Contact"}</span>
            </button>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CARD 2: FAST METRICS 4 TRỤ CỘT (Span 4 trên Desktop)                     */}
        {/* ========================================================================= */}
        <motion.div
          variants={bentoItemVariants}
          style={{ borderRadius: "var(--theme-radius-card, 16px)" }}
          className={cn(
            "bento-card break-inside-avoid mb-4.5 w-full inline-block p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
            getGlassStyle()
          )}
        >
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200/60 dark:border-white/10">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {isVi ? "Chỉ Số Vận Hành Cốt Lõi" : "Key Executive Metrics"}
              </h4>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-400">2002–2026</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 flex-1">
            {/* Metric 1 */}
            <div className="p-3 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 border border-blue-400/25 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase">
                {isVi ? "Kinh nghiệm" : "Experience"}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-blue-900 dark:text-cyan-300 my-0.5">
                22+
              </span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                {isVi ? "Năm quản trị CSKH" : "Years leadership"}
              </span>
            </div>

            {/* Metric 2 */}
            <div className="p-3 rounded-xl bg-purple-500/10 dark:bg-purple-500/15 border border-purple-400/25 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase">
                {isVi ? "Quy mô đội ngũ" : "Team Size"}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-purple-900 dark:text-purple-300 my-0.5">
                500+
              </span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                {isVi ? "Nhân sự điều hành" : "Staff led"}
              </span>
            </div>

            {/* Metric 3 */}
            <div className="p-3 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-400/25 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-cyan-700 dark:text-cyan-300 uppercase">
                {isVi ? "Dự án CS & AI" : "Projects"}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-cyan-900 dark:text-cyan-300 my-0.5">
                100+
              </span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                {isVi ? "Dự án triển khai" : "Delivered"}
              </span>
            </div>

            {/* Metric 4 */}
            <div className="p-3 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-400/25 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase">
                {isVi ? "Hài lòng CSAT" : "CSAT & NPS"}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-900 dark:text-emerald-300 my-0.5">
                98%
              </span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                {isVi ? "Tỷ lệ chuẩn 5 sao" : "5-star benchmark"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CARD 3: KINH NGHIỆM & HÀNH TRÌNH QUẢN TRỊ (Span 6 trên Desktop)          */}
        {/* ========================================================================= */}
        <motion.div
          variants={bentoItemVariants}
          style={{ borderRadius: "var(--theme-radius-card, 16px)" }}
          onClick={() => handleGoTo("experience")}
          className={cn(
            "bento-card break-inside-avoid mb-4.5 w-full inline-block p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer group",
            getGlassStyle()
          )}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                    {isVi ? "Kinh Nghiệm Vận Hành" : "Executive Experience"}
                  </h3>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {isVi ? "Hành trình 22+ năm cống hiến thực chiến" : "22+ years career milestones"}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2.5 my-3">
              {profileData.experiences.slice(0, 2).map((exp, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-left">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {exp.position}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-700 dark:text-cyan-300 font-bold shrink-0">
                      {exp.period}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium block">
                    {exp.company}
                  </span>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-1">
                    {exp.responsibilities?.[0]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-white/10 text-xs font-bold text-blue-600 dark:text-cyan-400">
            <span>{isVi ? "Xem toàn bộ 14 mốc kinh nghiệm →" : "View all career history →"}</span>
            <span className="text-[10px] text-slate-400 font-normal">{profileData.experiences.length} {isVi ? "giai đoạn" : "phases"}</span>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CARD 4: LĨNH VỰC MŨI NHỌN (DOMAINS) (Span 6 trên Desktop)                 */}
        {/* ========================================================================= */}
        <motion.div
          variants={bentoItemVariants}
          style={{ borderRadius: "var(--theme-radius-card, 16px)" }}
          onClick={() => handleGoTo("domains")}
          className={cn(
            "bento-card break-inside-avoid mb-4.5 w-full inline-block p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer group",
            getGlassStyle()
          )}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                    {isVi ? "Lĩnh Vực Mũi Nhọn" : "Core Domains"}
                  </h3>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {isVi ? "6 trụ cột chiến lược vận hành CSKH" : "6 strategic operational domains"}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-2.5">
              {DOMAINS_DATA.slice(0, 6).map((domain, i) => (
                <div 
                  key={domain.id || i}
                  className="p-2.5 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 flex flex-col items-start justify-between min-h-[72px]"
                >
                  <span className="text-[9px] font-mono font-bold text-amber-600 dark:text-amber-400">
                    0{i + 1}
                  </span>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 line-clamp-2 text-left leading-tight mt-1">
                    {isVi ? domain.titleVi : domain.titleEn}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-white/10 text-xs font-bold text-amber-600 dark:text-amber-400">
            <span>{isVi ? "Khám phá chi tiết 6 lĩnh vực →" : "Explore all 6 domains →"}</span>
            <span className="text-[10px] text-slate-400 font-normal">Contact Center · CRM · FinTech</span>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CARD 5: KỸ NĂNG & SWOT CHIẾN LƯỢC (Span 6 trên Desktop)                  */}
        {/* ========================================================================= */}
        <motion.div
          variants={bentoItemVariants}
          style={{ borderRadius: "var(--theme-radius-card, 16px)" }}
          onClick={() => handleGoTo("skills")}
          className={cn(
            "bento-card break-inside-avoid mb-4.5 w-full inline-block p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer group",
            getGlassStyle()
          )}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                    {isVi ? "Hệ Thống Kỹ Năng & SWOT" : "Skills Matrix & SWOT"}
                  </h3>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {isVi ? "Ma trận 4 nhóm năng lực điều hành" : "4-tier competency matrix"}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2 my-2.5">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  {isVi ? "Điểm mạnh (Strengths)" : "Core Strengths"}
                </span>
                <span className="text-xs font-mono font-black text-emerald-700 dark:text-emerald-300">
                  96%
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-between">
                <span className="text-xs font-bold text-blue-800 dark:text-blue-300">
                  {isVi ? "Hoàn thiện (Opportunities)" : "Refinement & Growth"}
                </span>
                <span className="text-xs font-mono font-black text-blue-700 dark:text-blue-300">
                  94%
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-between">
                <span className="text-xs font-bold text-purple-800 dark:text-purple-300">
                  {isVi ? "Phát triển công nghệ (AI & Tech)" : "Tech Innovation"}
                </span>
                <span className="text-xs font-mono font-black text-purple-700 dark:text-purple-300">
                  92%
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-white/10 text-xs font-bold text-purple-600 dark:text-purple-400">
            <span>{isVi ? "Xem biểu đồ radar & phân tích SWOT →" : "View SWOT & Radar Charts →"}</span>
            <span className="text-[10px] text-slate-400 font-normal">{isVi ? "Đầy đủ 4 trụ cột" : "Full 4 pillars"}</span>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CARD 6: DỰ ÁN CHIẾN LƯỢC (PROJECTS) (Span 6 trên Desktop)                */}
        {/* ========================================================================= */}
        <motion.div
          variants={bentoItemVariants}
          style={{ borderRadius: "var(--theme-radius-card, 16px)" }}
          onClick={() => handleGoTo("projects")}
          className={cn(
            "bento-card break-inside-avoid mb-4.5 w-full inline-block p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer group",
            getGlassStyle()
          )}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                    {isVi ? "Dự Án Tiêu Biểu" : "Key CX Projects"}
                  </h3>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {isVi ? "Hơn 20 dự án chuyển đổi số & tự động hóa" : "20+ automation & digital projects"}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2.5 my-2.5">
              <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 flex items-center justify-between">
                <div className="flex flex-col text-left min-w-0 pr-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {isVi ? "Dự án 01: Xây Dựng & Vận Hành Phòng CSKH" : "Project 01: Setup CS Department"}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    {isVi ? "Quy mô 150+ nhân sự, chuẩn SOP quốc tế" : "150+ staff, SOP international standards"}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 font-bold shrink-0">
                  Audio & Video
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 flex items-center justify-between">
                <div className="flex flex-col text-left min-w-0 pr-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {isVi ? "Dự án 03: Ứng Dụng AI Chatbot & Auto Routing" : "Project 03: AI Chatbot & Routing"}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    {isVi ? "Giảm 35% cuộc gọi lặp, FCR > 85%" : "35% call deflection, FCR > 85%"}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold shrink-0">
                  AI Applied
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-white/10 text-xs font-bold text-cyan-600 dark:text-cyan-400">
            <span>{isVi ? "Nghe Audio & xem 20 case study dự án →" : "Listen to audio & 20 case studies →"}</span>
            <span className="text-[10px] text-slate-400 font-normal">Audio Player · Video Pitch</span>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CARD 7: HỌC VẤN & CHỨNG CHỈ (Span 4 trên Desktop)                        */}
        {/* ========================================================================= */}
        <motion.div
          variants={bentoItemVariants}
          style={{ borderRadius: "var(--theme-radius-card, 16px)" }}
          onClick={() => handleGoTo("education")}
          className={cn(
            "bento-card break-inside-avoid mb-4.5 w-full inline-block p-5 flex flex-col justify-between relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer group",
            getGlassStyle()
          )}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                    {isVi ? "Học Vấn & Chứng Chỉ" : "Education & Certs"}
                  </h3>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {isVi ? "COPC, PMP, Six Sigma" : "International standards"}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2 my-2 text-left">
              <div className="p-2.5 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/10">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {isVi ? "Đại học Chính quy" : "Bachelor's Degree"}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  {isVi ? "Cử nhân Quản trị & Công nghệ" : "Management & Technology"}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/10">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  COPC & Six Sigma Black Belt
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  {isVi ? "Tiêu chuẩn quản trị Contact Center" : "Contact center standards"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-white/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <span>{isVi ? "Mở FlipBook Chứng chỉ →" : "Open Certificate FlipBook →"}</span>
            <Award className="w-3.5 h-3.5" />
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CARD 8: 12 HỆ THỐNG CÔNG NGHỆ (Span 4 trên Desktop)                      */}
        {/* ========================================================================= */}
        <motion.div
          variants={bentoItemVariants}
          style={{ borderRadius: "var(--theme-radius-card, 16px)" }}
          onClick={() => handleGoTo("systems")}
          className={cn(
            "bento-card break-inside-avoid mb-4.5 w-full inline-block p-5 flex flex-col justify-between relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer group",
            getGlassStyle()
          )}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                    {isVi ? "12 Hệ Thống Công Nghệ" : "12 Systems Hub"}
                  </h3>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {isVi ? "CRM, Contact Center, Omnichannel" : "Production SaaS links"}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-2 my-2 text-left">
              {SYSTEMS_12_DATA.slice(0, 4).map((sys) => (
                <div key={sys.id} className="p-2 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/10">
                  <span className="text-[11px] font-bold text-slate-900 dark:text-white block truncate">
                    {isVi ? sys.titleVi : sys.titleEn}
                  </span>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 block truncate">
                    powerservice.one
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-white/10 text-xs font-bold text-sky-600 dark:text-sky-400">
            <span>{isVi ? "Xem toàn bộ 12 hệ thống →" : "Explore all 12 systems →"}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CARD 9: THƯ NGỎ & TRIẾT LÝ LÃNH ĐẠO (Span 4 trên Desktop)                 */}
        {/* ========================================================================= */}
        <motion.div
          variants={bentoItemVariants}
          style={{ borderRadius: "var(--theme-radius-card, 16px)" }}
          onClick={() => handleGoTo("letter")}
          className={cn(
            "bento-card break-inside-avoid mb-4.5 w-full inline-block p-5 flex flex-col justify-between relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer group",
            getGlassStyle()
          )}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <MailOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                    {isVi ? "Thư Ngỏ & Cam Kết" : "Open Letter & Philosophy"}
                  </h3>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {isVi ? "4 giá trị cốt lõi & cam kết" : "4 core commitments"}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed my-2 text-left line-clamp-3">
              {profile.philosophy}
            </p>

            <div className="flex flex-wrap gap-1.5 my-1">
              <span className="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-700 dark:text-rose-300 text-[10px] font-bold">Tận tâm</span>
              <span className="px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-700 dark:text-blue-300 text-[10px] font-bold">Chuyên nghiệp</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">Đổi mới</span>
              <span className="px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-700 dark:text-purple-300 text-[10px] font-bold">Đồng hành</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-white/10 text-xs font-bold text-rose-600 dark:text-rose-400">
            <span>{isVi ? "Đọc thư ngỏ đầy đủ →" : "Read full letter →"}</span>
            <span className="font-[Caveat,cursive] text-sm">Hùng Thái ♡</span>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CARD 10: TÙY BIẾN, HÌNH NỀN & SỰ CỐ HỆ THỐNG (Span 4 trên Desktop)         */}
        {/* ========================================================================= */}
        <motion.div
          variants={bentoItemVariants}
          style={{ borderRadius: "var(--theme-radius-card, 16px)" }}
          className={cn(
            "bento-card break-inside-avoid mb-4.5 w-full inline-block p-5 flex flex-col justify-between relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
            getGlassStyle()
          )}
        >
          <div>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200/60 dark:border-white/10">
              <div className="w-8 h-8 rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                  {isVi ? "Bộ Tiện Ích & Tùy Biến" : "Utilities & Studio"}
                </h3>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  {isVi ? "Hình nền, font chữ & sự cố" : "Wallpapers, themes, issues"}
                </span>
              </div>
            </div>

            <div className="space-y-2 my-2 text-left">
              {/* Wallpapers */}
              <button
                type="button"
                onClick={() => handleGoTo("wallpapers")}
                className="w-full p-2.5 rounded-xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 hover:border-purple-400/50 flex items-center justify-between text-xs font-bold transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-800 dark:text-slate-200">{isVi ? "Thư Viện Hình Nền" : "Wallpapers Gallery"}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Customization */}
              <button
                type="button"
                onClick={() => handleGoTo("customization")}
                className="w-full p-2.5 rounded-xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 hover:border-cyan-400/50 flex items-center justify-between text-xs font-bold transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-500 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-800 dark:text-slate-200">{isVi ? "Tùy Biến Giao Diện & Font" : "Theme & Font Studio"}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Errors System Status */}
              <button
                type="button"
                onClick={() => handleGoTo("errors")}
                className="w-full p-2.5 rounded-xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 hover:border-rose-400/50 flex items-center justify-between text-xs font-bold transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-800 dark:text-slate-200">{isVi ? "Sự Cố System Status" : "System Issues Tracker"}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CARD 11: BANNER LIÊN HỆ & KẾT NỐI HỢP TÁC (Span 12 trên Desktop)          */}
        {/* ========================================================================= */}
        <motion.div
          variants={bentoItemVariants}
          style={{ borderRadius: "var(--theme-radius-card, 16px)" }}
          className={cn(
            "bento-card break-inside-avoid mb-4.5 w-full inline-block p-5 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
            getGlassStyle()
          )}
        >
          <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0 text-left">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
              <Send className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                {isVi ? "Sẵn Sàng Hợp Tác & Kiến Tạo Trải Nghiệm Khách Hàng 5 Sao" : "Ready to Partner & Architect 5-Star CX Systems"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal mt-1 leading-relaxed">
                {isVi 
                  ? "Kết nối với Nguyễn Hùng Thái để cùng trao đổi chiến lược CSKH, tối ưu hóa Call Center và chuyển đổi số CRM bền vững."
                  : "Connect with Nguyen Hung Thai to strategize customer service, optimize call centers, and execute digital CRM transformation."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto justify-end">
            <button
              type="button"
              onClick={() => handleGoTo("contact")}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 hover:brightness-105 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <MessagesSquare className="w-4 h-4" />
              <span>{isVi ? "Gửi Tin Nhắn / Liên Hệ" : "Get In Touch"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* ========================================================================= */}
      {/* BENTO PINTEREST FLOATING QUICK ACCESS DOCK (Thay thế Header & Footer)     */}
      {/* ========================================================================= */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-1.5 px-3.5 rounded-full bg-slate-900/90 dark:bg-black/92 backdrop-blur-2xl border border-cyan-400/40 shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(0,229,255,0.25)] text-white select-none">
        {/* Avatar Mini */}
        <div 
          onClick={() => handleGoTo("home")}
          className="flex items-center gap-2 cursor-pointer pr-2 border-r border-white/20 group"
          title="Trang Chủ"
        >
          <img 
            src="https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif"
            alt="Avatar"
            className="w-7 h-7 rounded-full object-cover border border-cyan-400/50 group-hover:scale-105 transition-transform"
            referrerPolicy="no-referrer"
          />
          <span className="text-xs font-black font-play hidden sm:inline">Hùng Thái</span>
        </div>

        {/* Nút Đổi Bố Cục Popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsLayoutDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/25 hover:bg-purple-500/40 text-purple-200 border border-purple-400/40 text-xs font-bold cursor-pointer transition-all"
            title="Đổi Bố Cục"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isVi ? "Bố Cục (Bento)" : "Layout"}</span>
          </button>

          {isLayoutDropdownOpen && (
            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-[240px] rounded-2xl bg-slate-950/95 border border-cyan-400/40 p-2 shadow-2xl z-50 text-left space-y-1 backdrop-blur-2xl">
              <span className="text-[10px] font-mono font-bold text-slate-400 px-2 block">
                {isVi ? "Chọn 5 Bố Cục:" : "Choose 5 Layouts:"}
              </span>
              <button
                type="button"
                onClick={() => { setLayoutMode("card-page"); setIsLayoutDropdownOpen(false); }}
                className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-bold hover:bg-white/10 text-white flex items-center justify-between"
              >
                <span>1. Card Page</span>
                <span className="text-[9px] text-cyan-400">Mặc định</span>
              </button>
              <button
                type="button"
                onClick={() => { setLayoutMode("dashboard"); setIsLayoutDropdownOpen(false); }}
                className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-bold hover:bg-white/10 text-white"
              >
                2. Dashboard
              </button>
              <button
                type="button"
                onClick={() => { setLayoutMode("slide-stack"); setIsLayoutDropdownOpen(false); }}
                className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-bold hover:bg-white/10 text-white"
              >
                3. Slide Stack
              </button>
              <button
                type="button"
                onClick={() => { setLayoutMode("landing"); setIsLayoutDropdownOpen(false); }}
                className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-bold hover:bg-white/10 text-white"
              >
                4. Landing Page
              </button>
              <button
                type="button"
                onClick={() => { setLayoutMode("bento-pinterest"); setIsLayoutDropdownOpen(false); }}
                className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-bold bg-cyan-500/25 text-cyan-300 flex items-center justify-between"
              >
                <span>5. Bento Pinterest</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          )}
        </div>

        {/* In PDF */}
        <button
          type="button"
          onClick={() => { window.dispatchEvent(new CustomEvent("open-resume-export")); }}
          className="p-1.5 rounded-full hover:bg-white/15 text-rose-300 transition-colors"
          title="In PDF"
        >
          <Printer className="w-4 h-4" />
        </button>

        {/* Ngôn ngữ */}
        <button
          type="button"
          onClick={() => setLang(isVi ? "en" : "vi")}
          className="px-2 py-1 rounded-full hover:bg-white/15 text-xs font-bold font-mono text-emerald-300 transition-colors"
          title="Đổi ngôn ngữ"
        >
          {lang.toUpperCase()}
        </button>

        {/* AI Assistant */}
        <button
          type="button"
          onClick={() => { window.dispatchEvent(new CustomEvent("open-ai-assistant")); }}
          className="p-1.5 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md hover:scale-105 transition-transform"
          title="Trợ lý AI"
        >
          <Bot className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default memo(BentoGridLayout);
