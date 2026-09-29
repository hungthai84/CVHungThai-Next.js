import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle2,
  Copy,
  ExternalLink,
  Send,
  ShieldCheck,
  TrendingUp,
  Building2,
  Bot,
  BarChart3,
  Heart,
  Target,
  Zap,
  Award,
  MessagesSquare,
  GraduationCap
} from "lucide-react";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";
import { ABOUT_PROFILE_STATS, PERSONAL_DEMOGRAPHICS } from "../data/aboutData";
import { cn } from "../lib/utils";

interface IntroductionCardProps {
  className?: string;
  viewLayout?: "single-row" | "bento";
  onNavigateSection?: (sectionId: string) => void;
}

export default function IntroductionCard({
  className = "",
  viewLayout = "single-row",
  onNavigateSection
}: IntroductionCardProps) {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  // Profile Status
  const [profileStatus, setProfileStatus] = useState<"online" | "busy" | "focus" | "dnd">("online");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "values" | "competencies">("overview");

  const copyToClipboard = (text: string, fieldName: string) => {
    playUiSound("click");
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleNavigate = (sectionId: string) => {
    playUiSound("click");
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      window.dispatchEvent(new CustomEvent("app-navigate", { detail: sectionId }));
    }
  };

  // Find relevant demographic items
  const dobItem = PERSONAL_DEMOGRAPHICS.find((d) => d.id === "dob");
  const genderItem = PERSONAL_DEMOGRAPHICS.find((d) => d.id === "gender");
  const locationItem = PERSONAL_DEMOGRAPHICS.find((d) => d.id === "temp_address");
  const emailItem = PERSONAL_DEMOGRAPHICS.find((d) => d.id === "email");
  const phoneItem = PERSONAL_DEMOGRAPHICS.find((d) => d.id === "phone");

  const statusConfigs = {
    online: {
      labelVi: "Đang trực tuyến",
      labelEn: "Available Online",
      dotClass: "bg-emerald-400 animate-pulse",
      badgeClass: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
    },
    busy: {
      labelVi: "Đang họp điều hành",
      labelEn: "In Executive Meeting",
      dotClass: "bg-amber-400",
      badgeClass: "bg-amber-500/15 border-amber-500/30 text-amber-300"
    },
    focus: {
      labelVi: "Tập trung CSKH",
      labelEn: "CX Focus Time",
      dotClass: "bg-purple-400",
      badgeClass: "bg-purple-500/15 border-purple-500/30 text-purple-300"
    },
    dnd: {
      labelVi: "Đừng làm phiền",
      labelEn: "Do Not Disturb",
      dotClass: "bg-rose-400",
      badgeClass: "bg-rose-500/15 border-rose-500/30 text-rose-300"
    }
  };

  const currentStatus = statusConfigs[profileStatus];

  return (
    <section
      id="template-introduction-card"
      style={{ borderRadius: "var(--theme-radius-card, 16px)" }}
      className={cn(
        "w-full relative overflow-hidden transition-all duration-300 border border-white/60 dark:border-white/10 shadow-2xl backdrop-blur-2xl",
        "bg-gradient-to-br from-[#0c1329]/95 via-[#0f172a]/95 to-[#080d1e]/95 text-white",
        "p-5 sm:p-6 md:p-8 flex flex-col justify-between group",
        viewLayout === "bento" ? "col-span-1 md:col-span-2 lg:col-span-3" : "col-span-1",
        className
      )}
    >
      {/* =======================================================================
          AMBIENT GLOWS & BACKGROUND EFFECTS
          ======================================================================= */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-600/25 rounded-full filter blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-600/25 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-[110px] pointer-events-none" />
      
      {/* Subtle Mesh Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      <div className="relative z-10 w-full flex flex-col gap-6">
        
        {/* =======================================================================
            1. TOP HEADER ROW: Pill Badge, Title, Status Selector & Quick Actions
            ======================================================================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Badge Giới thiệu bản thân */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-md shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                <span className="text-3xs sm:text-2xs font-mono font-bold tracking-wider text-cyan-300 uppercase">
                  {isVi ? "Giới thiệu bản thân" : "About myself"}
                </span>
              </div>

              {/* Verified Badge */}
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-3xs font-semibold">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>{isVi ? "Hồ sơ chính thức" : "Verified Profile"}</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300">
                {isVi ? "Giới thiệu bản thân tôi" : "About myself"}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300/90 font-medium">
              {isVi 
                ? "Chuyên gia Quản trị Vận hành & Dịch vụ Khách hàng (Customer Experience Leader)" 
                : "Customer Experience & Operations Executive Leader"}
            </p>
          </div>

          {/* Right Header: Status Switcher & Full Profile CTA */}
          <div className="flex items-center gap-2.5 flex-wrap self-start md:self-center">
            {/* Status Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-md transition-all cursor-pointer shadow-xs",
                  currentStatus.badgeClass
                )}
              >
                <span className={cn("w-2 h-2 rounded-full", currentStatus.dotClass)} />
                <span>{isVi ? currentStatus.labelVi : currentStatus.labelEn}</span>
              </button>

              <AnimatePresence>
                {isStatusDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                    className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-slate-900/95 border border-white/20 p-2 shadow-2xl z-30 backdrop-blur-2xl space-y-1"
                  >
                    {(Object.keys(statusConfigs) as (keyof typeof statusConfigs)[]).map((key) => {
                      const cfg = statusConfigs[key];
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            playUiSound("click");
                            setProfileStatus(key);
                            setIsStatusDropdownOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer",
                            profileStatus === key ? "bg-white/15 text-white font-bold" : "text-slate-300 hover:bg-white/10"
                          )}
                        >
                          <span className={cn("w-2 h-2 rounded-full", cfg.dotClass)} />
                          <span>{isVi ? cfg.labelVi : cfg.labelEn}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Navigate to Section About */}
            <button
              type="button"
              onClick={() => handleNavigate("about")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-all cursor-pointer shadow-xs"
              title={isVi ? "Xem trang Giới thiệu đầy đủ" : "View full About page"}
            >
              <span>{isVi ? "Chi tiết trang About" : "Full About Page"}</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-300" />
            </button>
          </div>
        </div>

        {/* =======================================================================
            2. MAIN 3-ZONE CONTENT GRID
            ======================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ===================================================================
              ZONE A: PROFILE CARD & DEMOGRAPHICS (lg:col-span-4)
              =================================================================== */}
          <div className="lg:col-span-4 flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-4">
            
            {/* Top Identity Block */}
            <div className="flex items-center gap-4">
              {/* Avatar Frame with Gradient Border */}
              <div className="relative shrink-0 w-20 h-20 sm:w-22 sm:h-22 rounded-2xl p-0.5 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 shadow-xl shadow-cyan-500/20">
                <div className="w-full h-full rounded-[14px] bg-slate-900 flex flex-col items-center justify-center text-white overflow-hidden relative">
                  <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 flex flex-col items-center justify-center font-black">
                    <span className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-blue-200">
                      HT
                    </span>
                    <span className="text-[9px] font-mono tracking-wider text-cyan-300 uppercase mt-0.5">
                      Thái
                    </span>
                  </div>
                  <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900" />
                </div>
              </div>

              {/* Name & Primary Role */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                    Nguyễn Hùng Thái
                  </h3>
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                </div>
                <p className="text-xs font-semibold text-cyan-300 mt-0.5 leading-snug">
                  Customer Care & CX Director
                </p>
                <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md bg-blue-500/15 border border-blue-400/25 text-3xs font-mono font-bold text-blue-200">
                  <BarChart3 className="w-3 h-3 text-cyan-300" />
                  <span>22+ Năm Kinh Nghiệm</span>
                </div>
              </div>
            </div>

            {/* Demographics Information List */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              {/* DOB */}
              <div className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-slate-400 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isVi ? "Sinh nhật" : "Date of Birth"}</span>
                </span>
                <span className="font-semibold text-slate-100">{dobItem?.valueVi || "22/06/1984 (Giáp Tý)"}</span>
              </div>

              {/* Gender */}
              <div className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-slate-400 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  <span>{isVi ? "Giới tính" : "Gender"}</span>
                </span>
                <span className="font-semibold text-slate-100">{genderItem?.valueVi || "Nam giới"}</span>
              </div>

              {/* Location */}
              <div className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-slate-400 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  <span>{isVi ? "Tạm trú" : "Location"}</span>
                </span>
                <span className="font-semibold text-slate-100">{locationItem?.valueVi || "Q7, Hồ Chí Minh"}</span>
              </div>

              {/* Education */}
              <div className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-slate-400 flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isVi ? "Học vấn" : "Education"}</span>
                </span>
                <span className="font-semibold text-slate-100">Cử nhân ĐH Mở TP.HCM</span>
              </div>
            </div>

            {/* Quick Contact Action Bar */}
            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => copyToClipboard(emailItem?.valueVi || "hungthai84@gmail.com", "email")}
                className="flex-1 py-2 px-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                title={isVi ? "Sao chép Email" : "Copy Email"}
              >
                {copiedField === "email" ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">{isVi ? "Đã chép" : "Copied"}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Email</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => copyToClipboard(phoneItem?.valueVi || "0909097882", "phone")}
                className="flex-1 py-2 px-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                title={isVi ? "Sao chép số điện thoại" : "Copy phone number"}
              >
                {copiedField === "phone" ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">{isVi ? "Đã chép" : "Copied"}</span>
                  </>
                ) : (
                  <>
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>0909097882</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  window.location.href = `mailto:${emailItem?.valueVi || "hungthai84@gmail.com"}`;
                }}
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all cursor-pointer shadow-md shadow-indigo-600/30"
                title={isVi ? "Gửi email trực tiếp" : "Send direct email"}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ===================================================================
              ZONE B: NARRATIVE, CORE VALUES & COMPETENCIES (lg:col-span-5)
              =================================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-4">
            
            {/* Tab navigation */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/60 border border-white/10">
              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  setActiveTab("overview");
                }}
                className={cn(
                  "flex-1 py-1 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-center",
                  activeTab === "overview"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {isVi ? "Tổng quan" : "Overview"}
              </button>

              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  setActiveTab("values");
                }}
                className={cn(
                  "flex-1 py-1 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-center",
                  activeTab === "values"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {isVi ? "Triết lý" : "Philosophy"}
              </button>

              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  setActiveTab("competencies");
                }}
                className={cn(
                  "flex-1 py-1 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-center",
                  activeTab === "competencies"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {isVi ? "Năng lực" : "Skills"}
              </button>
            </div>

            {/* Tab Content 1: Overview Narrative */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-3 flex-1 flex flex-col justify-center"
              >
                <div className="relative p-3.5 rounded-xl bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border border-cyan-500/20">
                  <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    {isVi ? (
                      <>
                        Một chuyên gia dịch vụ khách hàng với hơn{" "}
                        <span className="font-black text-cyan-300 underline decoration-cyan-400/50 decoration-2 underline-offset-4">
                          22 năm kinh nghiệm
                        </span>{" "}
                        thực chiến. Với tôi, Chăm Sóc Khách Hàng không chỉ là phục vụ, mà là sự đồng hành. Mỗi cuộc trò chuyện, mỗi khoảnh khắc, dù là nhỏ nhất, đều là một cơ hội quý giá để lắng nghe, để thấu hiểu, và để tạo ra những trải nghiệm vượt trên cả sự mong đợi.
                      </>
                    ) : (
                      <>
                        A customer service expert with over{" "}
                        <span className="font-black text-cyan-300 underline decoration-cyan-400/50 decoration-2 underline-offset-4">
                          22 years of experience
                        </span>{" "}
                        hands-on. For me, Customer Care is not just service, but true companionship. Every conversation is a precious opportunity to listen, understand, and exceed expectations.
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-3xs font-extrabold uppercase tracking-wider text-slate-400 block">
                    {isVi ? "Điểm nổi bật trong sự nghiệp:" : "Career Highlights:"}
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-3xs font-medium text-slate-300">
                    <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/[0.02] border border-white/5">
                      <Target className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">Quản trị SLA & Escalation</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/[0.02] border border-white/5">
                      <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">Tối ưu hoá AI Contact Center</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/[0.02] border border-white/5">
                      <Award className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">CSAT & NPS đạt 99%</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/[0.02] border border-white/5">
                      <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span className="truncate">Huấn luyện & Đào tạo CX</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab Content 2: Service Philosophy */}
            {activeTab === "values" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-2.5 flex-1 flex flex-col justify-center"
              >
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-400/20">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500/30 text-cyan-300 flex items-center justify-center text-3xs font-bold">1</span>
                    <h4 className="text-xs font-bold text-white">Khách hàng là trọng tâm</h4>
                  </div>
                  <p className="text-3xs text-slate-300 mt-1 pl-7 leading-relaxed">
                    Mọi cải tiến quy trình và công nghệ đều hướng đến sự hài lòng và trải nghiệm mượt mà của khách hàng.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-400/20">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-500/30 text-purple-300 flex items-center justify-center text-3xs font-bold">2</span>
                    <h4 className="text-xs font-bold text-white">Vận hành chuẩn xác & Kỷ luật SLA</h4>
                  </div>
                  <p className="text-3xs text-slate-300 mt-1 pl-7 leading-relaxed">
                    Xử lý triệt để từng điểm nghẽn, kiểm soát chất lượng phản hồi FCR & giảm thời gian chờ đợi.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-400/20">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/30 text-emerald-300 flex items-center justify-center text-3xs font-bold">3</span>
                    <h4 className="text-xs font-bold text-white">Đồng hành & Thấu cảm</h4>
                  </div>
                  <p className="text-3xs text-slate-300 mt-1 pl-7 leading-relaxed">
                    Lắng nghe chân thành, biến khiếu nại thành sự trung thành dài lâu của đối tác và khách hàng.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Tab Content 3: Core Competencies */}
            {activeTab === "competencies" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-2 flex-1 flex flex-col justify-center"
              >
                <span className="text-3xs font-extrabold uppercase tracking-wider text-slate-400 block">
                  {isVi ? "Kỹ năng chuyên môn cốt lõi:" : "Core Competencies:"}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Omnichannel CRM",
                    "Contact Center Operations",
                    "SLA Escalation Matrix",
                    "AI Chatbot Routing",
                    "CSAT / NPS / FCR Analytics",
                    "Incident & Crisis Management",
                    "QA & Auditing ISO 27001",
                    "Team Leadership & Coaching",
                    "Jira Service Desk",
                    "Zendesk Enterprise"
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-3xs font-bold bg-white/10 border border-white/15 text-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Bottom Button to Start Conversation */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleNavigate("contact")}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
              >
                <MessagesSquare className="w-3.5 h-3.5 text-cyan-200" />
                <span>{isVi ? "Bắt đầu kết nối & trò chuyện" : "Start Connection & Conversation"}</span>
              </button>
            </div>
          </div>

          {/* ===================================================================
              ZONE C: 4 STATS METRICS & DIRECT CTAS (lg:col-span-3)
              =================================================================== */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-3">
            
            {/* 4 Profile Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5">
              {ABOUT_PROFILE_STATS.map((stat) => {
                let StatIcon = BarChart3;
                if (stat.iconName === "Building2") StatIcon = Building2;
                if (stat.iconName === "Bot") StatIcon = Bot;
                if (stat.iconName === "TrendingUp") StatIcon = TrendingUp;

                return (
                  <motion.div
                    key={stat.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex items-center justify-between transition-all"
                  >
                    <div>
                      <span className="text-3xs font-semibold text-slate-400 block">
                        {isVi ? stat.labelVi : stat.labelEn}
                      </span>
                      <div className="text-lg sm:text-xl font-black text-white flex items-baseline gap-1 mt-0.5">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
                          {stat.metric}
                        </span>
                        <span className="text-3xs font-medium text-cyan-300">
                          {isVi ? stat.unitVi : stat.unitEn}
                        </span>
                      </div>
                    </div>

                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shadow-inner"
                      style={{ backgroundColor: `${stat.color}25`, borderColor: `${stat.color}50` }}
                    >
                      <StatIcon className="w-4 h-4" style={{ color: stat.color }} />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Direct Quick Action Box */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900/60 border border-indigo-500/25 space-y-2">
              <div className="flex items-center justify-between text-3xs font-mono text-cyan-300 font-bold">
                <span>Trạng thái kết nối</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Sẵn sàng
                </span>
              </div>
              <p className="text-3xs text-slate-300 leading-snug">
                Sẵn sàng tiếp nhận cơ hội hợp tác và tư vấn vận hành trung tâm dịch vụ khách hàng chuyên nghiệp.
              </p>
              <button
                type="button"
                onClick={() => handleNavigate("experience")}
                className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-3xs font-bold text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{isVi ? "Xem lịch sử kinh nghiệm" : "View Work Experience"}</span>
                <ExternalLink className="w-3 h-3 text-cyan-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
