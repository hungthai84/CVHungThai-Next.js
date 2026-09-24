import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { 
  Heart, 
  Sparkles, 
  Rocket, 
  Shield, 
  Layers, 
  Users, 
  Box, 
  Clock, 
  Target, 
  Mail, 
  BookCheck,
  Building2, 
  Phone, 
  Settings, 
  Network, 
  Bot, 
  LayoutDashboard, 
  Server,
  Star,
  Award,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Handshake,
  CheckCircle2,
  Quote,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Briefcase,
  Signal,
  Headset,
  Tv,
  Gamepad2,
  ShoppingBag,
  ShieldCheck,
  Wallet,
  CreditCard,
  Compass,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  Calendar,
  Send,
  MessageSquare,
  Check,
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Lightbulb,
  Atom,
  BarChart2,
  MountainSnow,
  ShoppingCart
} from "lucide-react";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";
import { PageCardHeader } from "./PageCardHeader";
import {
  DedicatedHeartIcon,
  TargetProfessionalIcon,
  InnovationBulbIcon,
  PartnershipHandshakeIcon,
  GrowthChart3DIcon
} from "./CoreValuesIcons";
import {
  MobiFoneAntennaIllustration,
  V247AgentIllustration,
  LBCGrowthIllustration,
  GarenaControllerIllustration,
  ShopeeBagIllustration,
  PrudentialShieldIllustration,
  MoMoFinanceIllustration,
  FinvietGoldCoinsIllustration
} from "./CareerMilestoneIllustrations";

// ==========================================
// 1. SVG GRAPHICS & CUSTOM ILLUSTRATIONS
// ==========================================

// 3D Minimalist Contact Avatars Icon (Glassmorphism & Electric Blue Clay Style)
export const Contact3DAvatarIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg 
    className={cn("shrink-0 select-none drop-shadow-[0_4px_12px_rgba(0,102,255,0.3)] transition-transform duration-300 hover:scale-110", className)} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Clay Gradient for Back Avatar */}
      <linearGradient id="blueClayGrad" x1="15" y1="15" x2="65" y2="75" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00C6FF" />
        <stop offset="50%" stopColor="#0066FF" />
        <stop offset="100%" stopColor="#0040C0" />
      </linearGradient>

      {/* Frosted Milky Glass Gradient for Front Avatar */}
      <linearGradient id="milkyGlassGrad" x1="35" y1="25" x2="85" y2="85" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
        <stop offset="40%" stopColor="rgba(220, 240, 255, 0.65)" />
        <stop offset="100%" stopColor="rgba(180, 220, 255, 0.45)" />
      </linearGradient>

      {/* Inner Blue Light Bleed Glow */}
      <radialGradient id="blueLightBleed" cx="45%" cy="45%" r="50%">
        <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.85" />
        <stop offset="60%" stopColor="#0066FF" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#0040C0" stopOpacity="0" />
      </radialGradient>

      {/* Soft Drop Shadow for Depth */}
      <filter id="clayShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="5" stdDeviation="3.5" floodColor="#0033aa" floodOpacity="0.3" />
      </filter>
      <filter id="glassGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="6" stdDeviation="5" floodColor="#0066ff" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* BACK AVATAR (Vibrant Electric Blue Clay) */}
    <g filter="url(#clayShadow)">
      <circle cx="36" cy="32" r="14" fill="url(#blueClayGrad)" />
      <path d="M 18 64 C 18 48, 26 44, 36 44 C 46 44, 54 48, 54 64 C 54 68, 50 70, 36 70 C 22 70, 18 68, 18 64 Z" fill="url(#blueClayGrad)" />
      <path d="M 28 24 A 10 10 0 0 1 42 22" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="2.5" strokeLinecap="round" />
    </g>

    {/* BLUE LIGHT BLEED (Glow from Back to Front Avatar) */}
    <ellipse cx="50" cy="48" rx="18" ry="22" fill="url(#blueLightBleed)" />

    {/* FRONT PRIMARY AVATAR (Frosted Translucent Milky Glass) */}
    <g filter="url(#glassGlow)">
      <circle cx="62" cy="38" r="15" fill="url(#milkyGlassGrad)" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.5" />
      <path d="M 54 30 A 11 11 0 0 1 68 28" stroke="rgba(255, 255, 255, 0.95)" strokeWidth="2" strokeLinecap="round" />
      
      <path 
        d="M 42 74 C 42 56, 51 52, 62 52 C 73 52, 82 56, 82 74 C 82 79, 77 82, 62 82 C 47 82, 42 79, 42 74 Z" 
        fill="url(#milkyGlassGrad)" 
        stroke="rgba(255, 255, 255, 0.8)" 
        strokeWidth="1.5" 
      />
      <path d="M 48 64 C 52 56, 58 54, 62 54" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);






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

// ==========================================
// 2. CAREER TIMELINE DATA
// ==========================================
interface CareerMilestoneItem {
  id: string;
  yearNumber: string;
  yearLabelVi: string;
  yearLabelEn: string;
  yearBadgeGradient: string;
  company: string;
  titleColor?: string;
  roleVi: string;
  roleEn: string;
  roleColor?: string;
  color: string;
  borderColor: string;
  logo: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  roleIcon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  illustration: React.ComponentType<{ className?: string }>;
  arrowDesktop?: "right" | "down" | "left" | "compass";
  arrowTablet?: "right" | "down" | "compass";
  desktopGridClass?: string;
  tabletGridClass?: string;
  descVi: string;
  descEn: string;
  highlightVi: string;
  highlightEn: string;
  highlightIcon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  showMoreLink?: boolean;
  isCenterAlign?: boolean;
}

const CAREER_MILESTONES_ZICZAC: CareerMilestoneItem[] = [
  {
    id: "card-2002",
    yearNumber: "2002",
    yearLabelVi: "NĂM 2002",
    yearLabelEn: "YEAR 2002",
    yearBadgeGradient: "bg-gradient-to-r from-blue-600 to-sky-500",
    company: "MobiFone",
    titleColor: "#0284c7",
    roleVi: "Nhân viên Vận hành Viễn thông",
    roleEn: "Telecom Operations Specialist",
    roleColor: "#0284c7",
    color: "#0284c7",
    borderColor: "border-sky-300 dark:border-sky-700/80",
    logo: "https://i.ibb.co/hxHm9TsZ/Mobifone.png",
    icon: Signal,
    roleIcon: Signal,
    illustration: MobiFoneAntennaIllustration,
    descVi: "Tôi bắt đầu sự nghiệp tại **MobiFone** , nơi tôi được đào tạo bài bản về **dịch vụ khách hàng** , quản lý tổng đài, xử lý sự cố và xây dựng quy trình phục vụ theo **tiêu chuẩn ngành viễn thông** . Đây là nền tảng giúp tôi hình thành tư duy **lấy khách hàng làm trung tâm** và hiểu rõ tầm quan trọng của quy trình trong vận hành dịch vụ.",
    descEn: "Started career at **MobiFone**, systematically trained in **customer care**, incident handling, and telecom workflow standardization. Built a solid **customer-centric foundation** and rigorous appreciation for operational standards.",
    highlightVi: "Nền tảng hình thành tư duy lấy khách hàng làm trọng tâm.",
    highlightEn: "Foundation that shaped a customer-centric mindset.",
    highlightIcon: Lightbulb
  },
  {
    id: "card-2007",
    yearNumber: "2007",
    yearLabelVi: "NĂM 2007",
    yearLabelEn: "YEAR 2007",
    yearBadgeGradient: "bg-gradient-to-r from-purple-600 to-indigo-600",
    company: "Viễn Liên V247",
    titleColor: "#7c3aed",
    roleVi: "Giám sát CSKH & Vận hành",
    roleEn: "Customer Service & Operations Supervisor",
    roleColor: "#7c3aed",
    color: "#7c3aed",
    borderColor: "border-purple-300 dark:border-purple-700/80",
    logo: "https://i.ibb.co/QvtbdnfP/V247.png",
    icon: Headset,
    roleIcon: Users,
    illustration: V247AgentIllustration,
    descVi: "Gia nhập **Viễn Liên V247** , tôi tiếp tục phát triển năng lực **quản lý đội ngũ** , giám sát chất lượng dịch vụ và tối ưu hiệu quả vận hành của trung tâm chăm sóc khách hàng. Giai đoạn này giúp tôi tích lũy kinh nghiệm quản lý hoạt động với **quy mô lớn** và xây dựng các **chỉ số đánh giá chất lượng** dịch vụ.",
    descEn: "At **Vien Lien V247**, developed team leadership, **quality supervision**, and operational efficiency for **large-scale contact centers**, establishing comprehensive **KPI frameworks**.",
    highlightVi: "Xây dựng các chỉ số đánh giá KPI vận hành quy mô lớn.",
    highlightEn: "Building comprehensive KPI evaluation frameworks.",
    highlightIcon: BarChart2
  },
  {
    id: "card-2011",
    yearNumber: "2011",
    yearLabelVi: "NĂM 2011",
    yearLabelEn: "YEAR 2011",
    yearBadgeGradient: "bg-gradient-to-r from-emerald-600 to-teal-500",
    company: "LBC – HTV",
    titleColor: "#059669",
    roleVi: "Trưởng phòng CSKH",
    roleEn: "Head of Customer Service",
    roleColor: "#059669",
    color: "#059669",
    borderColor: "border-emerald-300 dark:border-emerald-700/80",
    logo: "https://i.ibb.co/R4YXWyzF/LBC.png",
    icon: Tv,
    roleIcon: Briefcase,
    illustration: LBCGrowthIllustration,
    descVi: "Đây là dấu mốc quan trọng khi tôi lần đầu đảm nhiệm vị trí **Trưởng phòng Chăm sóc Khách hàng** . Từ một nhà quản lý vận hành, tôi chuyển mình trở thành một **nhà quản trị toàn diện** . Tôi trực tiếp điều hành hoạt động của phòng ban, xây dựng và chuẩn hóa quy trình, phát triển đội ngũ, thiết lập **hệ thống KPI** , đồng thời phối hợp với nhiều đơn vị nhằm nâng cao chất lượng dịch vụ và hiệu quả vận hành. Chính giai đoạn này đã giúp tôi hình thành tư duy **quản trị hệ thống** và **phát triển con người** song song với mục tiêu kinh doanh.",
    descEn: "First assumed the role of **Head of Customer Service**, transitioning into a **comprehensive director**. Directly managed departmental operations, standardized workflows, fostered leadership pipelines, and established **KPI metrics** aligned with business targets.",
    highlightVi: "Tư duy quản trị hệ thống và phát triển con người.",
    highlightEn: "Systems governance and human talent development.",
    highlightIcon: Users
  },
  {
    id: "card-2013",
    yearNumber: "2013",
    yearLabelVi: "NĂM 2013",
    yearLabelEn: "YEAR 2013",
    yearBadgeGradient: "bg-gradient-to-r from-rose-600 to-red-500",
    company: "Garena",
    titleColor: "#e11d48",
    roleVi: "Trưởng phòng Vận hành CSKH",
    roleEn: "Customer Service Operations Manager",
    roleColor: "#e11d48",
    color: "#e11d48",
    borderColor: "border-rose-300 dark:border-rose-700/80",
    logo: "https://i.ibb.co/h1Md65yV/Garena.png",
    icon: Gamepad2,
    roleIcon: Gamepad2,
    illustration: GarenaControllerIllustration,
    descVi: "Gia nhập **Garena** , tôi quản lý hoạt động chăm sóc khách hàng trong lĩnh vực **game trực tuyến** (Liên Minh Huyền Thoại, Liên Quân Mobile, AirPay, Gcafe). Trực tiếp quản lý **120 nhân sự** , xây dựng cơ cấu tổ chức, chuẩn hóa quy trình vận hành và đào tạo nguồn nhân lực kế thừa.",
    descEn: "Joined **Garena**, directing customer care for high-speed **online gaming** (League of Legends, Arena of Valor, AirPay, Gcafe). Led **120 personnel**, systematized operations, and trained successor teams.",
    highlightVi: "Triển khai: Xây dựng hệ thống vững chắc trước khi mở rộng.",
    highlightEn: "Execution: Build solid systems before scaling.",
    highlightIcon: Target,
    showMoreLink: true
  },
  {
    id: "card-2013-shopee",
    yearNumber: "2013",
    yearLabelVi: "NĂM 2013",
    yearLabelEn: "YEAR 2013",
    yearBadgeGradient: "bg-gradient-to-r from-orange-500 to-amber-500",
    company: "Shopee",
    titleColor: "#ea580c",
    roleVi: "Quản lý Vận hành CSKH E-Commerce",
    roleEn: "E-Commerce Customer Service Operations Manager",
    roleColor: "#ea580c",
    color: "#ea580c",
    borderColor: "border-orange-300 dark:border-orange-700/80",
    logo: "https://i.ibb.co/BSVS4xf/Shopee.png",
    icon: ShoppingBag,
    roleIcon: ShoppingBag,
    illustration: ShopeeBagIllustration,
    descVi: "Tham gia vào giai đoạn khởi tạo và phát triển ban đầu của **Shopee** , tiếp cận tư duy **quản trị thương mại điện tử hiện đại** , từ hành trình khách hàng, trải nghiệm đa kênh (Omnichannel), vận hành dịch vụ quy mô lớn đến ứng dụng dữ liệu trong quản trị chất lượng và tối ưu hiệu quả hoạt động.",
    descEn: "Participated in the initial formation and growth stages of **Shopee**, embracing modern **e-commerce omnichannel governance**, large-scale service operations, and data-driven quality control.",
    highlightVi: "Tư duy quản trị thương mại điện tử đa kênh hiện đại.",
    highlightEn: "Modern omnichannel e-commerce management mindset.",
    highlightIcon: ShoppingCart
  },
  {
    id: "card-2016",
    yearNumber: "2016",
    yearLabelVi: "NĂM 2016",
    yearLabelEn: "YEAR 2016",
    yearBadgeGradient: "bg-gradient-to-r from-pink-600 to-rose-500",
    company: "Prudential",
    titleColor: "#db2777",
    roleVi: "Trưởng phòng Trải nghiệm Khách hàng",
    roleEn: "Head of Customer Experience",
    roleColor: "#db2777",
    color: "#db2777",
    borderColor: "border-pink-300 dark:border-pink-700/80",
    logo: "https://i.ibb.co/XfpQphWF/Prudential.png",
    icon: ShieldCheck,
    roleIcon: ShieldCheck,
    illustration: PrudentialShieldIllustration,
    descVi: "Tại **Prudential** , tôi có cơ hội làm việc trong lĩnh vực **bảo hiểm** – một ngành dịch vụ đòi hỏi tính chính xác, minh bạch và mức độ tin cậy rất cao. Thời gian này giúp tôi hiểu sâu hơn về **quản trị trải nghiệm khách hàng (CX)** , quản lý chất lượng dịch vụ và xây dựng niềm tin bền vững thông qua quy trình chuyên nghiệp và sự **đồng cảm** trong từng điểm chạm với khách hàng.",
    descEn: "At **Prudential**, specialized in life **insurance CX**, requiring absolute precision, transparency, and deep empathy to build long-term sustainable **brand trust** across every customer touchpoint.",
    highlightVi: "Quản trị trải nghiệm khách hàng (CX) và xây dựng niềm tin.",
    highlightEn: "Customer experience (CX) governance & brand trust.",
    highlightIcon: Heart
  },
  {
    id: "card-2018",
    yearNumber: "2018",
    yearLabelVi: "NĂM 2018",
    yearLabelEn: "YEAR 2018",
    yearBadgeGradient: "bg-gradient-to-r from-pink-500 to-fuchsia-600",
    company: "MoMo FinTech",
    titleColor: "#db2777",
    roleVi: "Trưởng phòng Dịch vụ Khách hàng",
    roleEn: "Customer Service Manager",
    roleColor: "#db2777",
    color: "#db2777",
    borderColor: "border-pink-300 dark:border-pink-700/80",
    logo: "https://i.ibb.co/k2QtrgTw/Momo.png",
    icon: Heart,
    roleIcon: Heart,
    illustration: Heart,
    descVi: "Gia nhập **MoMo** , tôi tiếp tục mở rộng kinh nghiệm trong lĩnh vực **tài chính số** . Với tập trung **tối ưu quy trình hỗ trợ** , nâng cao hiệu quả vận hành, ứng dụng công nghệ vào quản trị dịch vụ và cải thiện **trải nghiệm khách hàng** trên nền tảng số.",
    descEn: "At **MoMo**, expanded digital finance expertise with a focus on **support process optimization**, operational efficiency, and tech-enabled CX enhancement across digital ecosystems.",
    highlightVi: "Tối ưu quy trình vận hành và cải thiện trải nghiệm số.",
    highlightEn: "Optimizing operational workflows and digital experiences.",
    highlightIcon: BarChart2
  },
  {
    id: "card-2023",
    yearNumber: "2023",
    yearLabelVi: "NĂM 2023",
    yearLabelEn: "YEAR 2023",
    yearBadgeGradient: "bg-gradient-to-r from-amber-500 to-yellow-600",
    company: "Finviet",
    titleColor: "#059669",
    roleVi: "Trưởng phòng Dịch vụ Khách hàng",
    roleEn: "Customer Service Manager",
    roleColor: "#d97706",
    color: "#d97706",
    borderColor: "border-amber-300 dark:border-amber-700/80",
    logo: "https://i.ibb.co/7NtSSz4d/Finviet.png",
    icon: CreditCard,
    roleIcon: CreditCard,
    illustration: FinvietGoldCoinsIllustration,
    descVi: "Tại **Finviet** , tôi tiếp tục phát triển chuyên môn trong lĩnh vực **tài chính** , mở rộng hoạt động dịch vụ và các quy trình hỗ trợ, nâng cao bạch và sự tin cậy. Giai đoạn này giúp tôi hoàn thiện hơn tư duy xây dựng **hệ thống dịch vụ khách hàng hiện đại** , kết hợp hài hòa giữa **Quy trình - Công nghệ - Trải nghiệm** người dùng.",
    descEn: "At **Finviet**, honed financial service operations, perfecting the holistic tripartite synergy between **Process - Technology - Customer Experience**.",
    highlightVi: "Kết hợp hài hòa giữa Quy trình, Công nghệ và Trải nghiệm.",
    highlightEn: "Seamless harmony between Process, Technology, and Experience.",
    highlightIcon: Sparkles
  }
];

// ==========================================
// 3. MAIN OPEN LETTER COMPONENT
// ==========================================
export default function OpenLetter() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  // Collapse/Expand state for career milestones
  const [expandedCard, setExpandedCard] = useState<Record<string, boolean>>({
    "card-2013": false
  });

  // Symmetrical Left-Right Pairs of Career Milestones
  const careerPairs = [
    { left: CAREER_MILESTONES_ZICZAC[0], right: CAREER_MILESTONES_ZICZAC[1] }, // MobiFone (2002) vs V247 (2007)
    { left: CAREER_MILESTONES_ZICZAC[2], right: CAREER_MILESTONES_ZICZAC[3] }, // LBC (2011) vs Garena (2013)
    { left: CAREER_MILESTONES_ZICZAC[4], right: CAREER_MILESTONES_ZICZAC[5] }, // Shopee (2013) vs Prudential (2016)
    { left: CAREER_MILESTONES_ZICZAC[6], right: CAREER_MILESTONES_ZICZAC[7] }  // MoMo (2018) vs Finviet (2023)
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

  // Subcomponent to render each career card precisely matching image.png
  const renderCareerCard = (item: CareerMilestoneItem) => {
    const RoleIcon = item.roleIcon || item.icon;
    const Illustration = item.illustration;
    const HighlightIcon = item.highlightIcon || Sparkles;
    const MainIcon = item.icon || RoleIcon;

    return (
      <div
        key={item.id}
        id={item.id}
        style={{
          borderRadius: "18px",
          boxShadow: `0 8px 24px -4px ${item.color}18, 0 2px 6px -1px rgba(0, 0, 0, 0.03)`
        }}
        className={cn(
          "flex flex-col justify-between p-[25px] relative transition-all duration-300 backdrop-blur-md shadow-xs hover:shadow-xl hover:-translate-y-1 overflow-hidden group/mcard border-2 w-full",
          item.borderColor,
          "bg-white/95 dark:bg-slate-900/90"
        )}
      >
        {/* Subtle Brand Color Radial Tint */}
        <div 
          className="absolute inset-0 opacity-10 dark:opacity-[0.08] pointer-events-none mix-blend-multiply dark:mix-blend-color-dodge"
          style={{ background: `radial-gradient(circle at bottom right, ${item.color}, transparent 70%)` }}
        />

        {/* Watermark Background Icon matching Giá trị cốt lõi style */}
        <MainIcon 
          className="absolute -right-6 -bottom-6 w-24 h-24 sm:w-28 sm:h-28 rotate-12 pointer-events-none transition-all duration-500 ease-in-out z-0 select-none opacity-10 dark:opacity-8 group-hover/mcard:rotate-6 group-hover/mcard:scale-110 group-hover/mcard:opacity-20"
          style={{ color: item.color }}
        />

        {/* Header: Company Logo & Name & Role on Left, Year Badge Pill on Right */}
        <div className="w-full flex items-center justify-between gap-2.5 pb-3 mb-2.5 border-b border-slate-100 dark:border-slate-800/80 relative z-10 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 text-left">
            <div 
              className={cn(
                "flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/mcard:scale-105",
                item.id === "card-2018"
                  ? "w-12 h-12 rounded-full bg-purple-500/15 dark:bg-purple-500/20 border border-purple-500/35 shadow-[0_0_15px_rgba(168,85,247,0.25)] p-1.5"
                  : "w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-1 shadow-2xs"
              )}
            >
              <img 
                src={item.logo} 
                alt={item.company} 
                className={cn("w-full h-full object-contain", item.id === "card-2018" && "rounded-full")} 
                referrerPolicy="no-referrer" 
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 
                className="text-base sm:text-lg lg:text-xl font-bold tracking-tight leading-snug truncate"
                style={{ color: item.titleColor || item.color }}
              >
                {item.company}
              </h4>
              <div 
                className="flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold mt-0.5 truncate"
                style={{ color: item.roleColor || item.color }}
              >
                <RoleIcon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{isVi ? `Vị trí: ${item.roleVi}` : `Position: ${item.roleEn}`}</span>
              </div>
            </div>
          </div>

          {/* Year Badge Pill with Gradient */}
          <span 
            className={cn(
              "px-3 sm:px-3.5 py-1 rounded-full text-white text-[11px] sm:text-xs font-black shadow-xs tracking-wider uppercase shrink-0 whitespace-nowrap ml-auto",
              item.yearBadgeGradient
            )}
          >
            {isVi ? item.yearLabelVi : item.yearLabelEn}
          </span>
        </div>

        {/* Body: Text with full width readability */}
        <div className="w-full flex-1 my-1.5 text-left relative z-10">
          <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed text-left">
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
          className="w-full mt-3 p-2.5 sm:p-3 rounded-xl flex items-center gap-2.5 text-xs sm:text-[13px] text-slate-800 dark:text-slate-200 font-medium relative z-10 border"
          style={{ 
            backgroundColor: `${item.color}12`,
            borderColor: `${item.color}35`
          }}
        >
          <HighlightIcon className="w-4 h-4 shrink-0" style={{ color: item.color }} />
          <span className="flex-1 leading-snug text-left">{isVi ? item.highlightVi : item.highlightEn}</span>
        </div>
      </div>
    );
  };

  // SVG Connector đường ziczac giữa các mũi tên thẻ
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const arrowRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [svgPath, setSvgPath] = useState<string>("");

  // Callback chuyển hướng cuộn mượt đến phần CTA
  const scrollToCta = useCallback(() => {
    try {
      playUiSound("click");
    } catch {
      // ignore error
    }
    const ctaElement = document.getElementById("card-open-letter-cta");
    if (ctaElement) {
      ctaElement.scrollIntoView({ behavior: "smooth", block: "center" });
      ctaElement.classList.add("ring-4", "ring-cyan-400/80", "ring-offset-4", "ring-offset-slate-900", "transition-all", "duration-500");
      setTimeout(() => {
        ctaElement.classList.remove("ring-4", "ring-cyan-400/80", "ring-offset-4", "ring-offset-slate-900");
      }, 2500);
    }
  }, []);

  const updateConnectors = useCallback(() => {
    const container = gridContainerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const years = ["2002", "2007", "2011", "2013", "2016", "2018", "2023", "2026"];

    let path = "";
    for (let i = 0; i < years.length - 1; i++) {
      const currentYear = years[i];
      const nextYear = years[i + 1];
      const currEl = arrowRefs.current[currentYear];
      const nextEl = arrowRefs.current[nextYear];
      if (!currEl || !nextEl) continue;

      const currRect = currEl.getBoundingClientRect();
      const nextRect = nextEl.getBoundingClientRect();

      const x1 = currRect.left + currRect.width / 2 - containerRect.left;
      const y1 = currRect.top + currRect.height / 2 - containerRect.top;
      const x2 = nextRect.left + nextRect.width / 2 - containerRect.left;
      const y2 = nextRect.top + nextRect.height / 2 - containerRect.top;

      if (i === 0) {
        path += `M ${x1} ${y1} `;
      }
      path += `L ${x2} ${y2} `;
    }
    setSvgPath(path);
  }, []);

  useEffect(() => {
    updateConnectors();
    const handleResize = () => {
      updateConnectors();
    };
    window.addEventListener("resize", handleResize);

    const timer = setTimeout(updateConnectors, 250);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [updateConnectors]);

  return (
    <section 
      id="letter" 
      className="relative w-full min-h-full flex flex-col justify-start items-center p-3 xs:p-3.5 sm:p-4.5 md:p-6 lg:p-8 font-sans text-slate-800 dark:text-slate-100"
    >
      {/* Container Thư ngỏ chính */}
      <div 
        id="info-card-open-letter"
        className="w-full flex flex-col gap-6 relative z-10"
      >

        {/* ========================================================================= */}
        {/* TIÊU ĐỀ THẺ CHÍNH TRANG THƯ NGỎ (H5 + 2 CHỮ BÊN TRÁI + CÂU NÓI HAY BÊN PHẢI) */}
        {/* ========================================================================= */}
        <PageCardHeader pageId="letter">
          {/* Cụm trái: Chỉ báo chuyên môn & số lượng (Caption / Label: 12px – 13px) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-5 bg-emerald-600 dark:bg-emerald-400 rounded-full shrink-0" />
              <span className="text-caption font-semibold font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-2xs">
                {isVi ? "22+ Năm phụng sự & kiến tạo giá trị" : "22+ Years Service Dedication"}
              </span>
            </div>
          </div>
        </PageCardHeader>

        {/* ========================================================================= */}
        {/* ROW 1: THẺ THÔNG ĐIỆP HỢP TÁC (FULL-WIDTH BENTO CARD) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, ease: "easeOut" }} 
          className="w-full relative z-10"
        >
          {/* THẺ THÔNG ĐIỆP HỢP TÁC */}
          <div
            id="card-main-letter-content"
            style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 24px))" }}
            className="w-full relative overflow-hidden bg-gradient-to-r from-[#e0f7fa] via-[#e0f2fe] to-[#dbeafe] dark:from-[#081f2c] dark:via-[#0c283c] dark:to-[#0f3048] border border-cyan-200/90 dark:border-cyan-800/70 p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6 group z-10"
          >
            {/* Soft Background Wave Gradients matching image */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <div className="absolute -right-10 -bottom-20 w-80 h-80 rounded-full bg-cyan-300/30 dark:bg-cyan-600/10 filter blur-3xl" />
              <div className="absolute left-1/3 -top-20 w-96 h-96 rounded-full bg-blue-200/30 dark:bg-blue-600/10 filter blur-3xl" />
            </div>

            {/* Left Column: Text Content */}
            <div className="flex-1 flex flex-col justify-center relative z-10 text-left w-full">
              {/* Header Title with Green Icon Badge */}
              <div className="flex items-center gap-3 text-left mb-3.5">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#10b981] text-white shadow-md shadow-emerald-500/20 shrink-0 flex items-center justify-center p-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                    <path d="M9 12h6" />
                    <path d="M9 16h6" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-[26px] font-bold text-[#065f46] dark:text-emerald-400 tracking-tight">
                  {isVi ? "Thông điệp hợp tác" : "Cooperation message"}
                </h3>
              </div>

              {/* Salutation Line in Vibrant Orange */}
              <p className="text-[#f95700] dark:text-[#f97316] font-bold text-base sm:text-lg md:text-[19px] leading-snug mb-3">
                {isVi ? "Kính gửi Quý đối tác, Quý khách hàng và toàn thể cộng sự." : "Dear Valued Partners, Customers, and Colleagues."}
              </p>

              {/* Body Content */}
              <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base md:text-[17px] leading-relaxed font-normal text-left max-w-2xl">
                {isVi ? (
                  <>
                    Tôi là <strong className="font-extrabold text-[#0f172a] dark:text-white">Nguyễn Hùng Thái</strong>, Trưởng phòng Chăm sóc khách hàng với hơn <strong className="font-extrabold text-[#0f172a] dark:text-white">22 năm kinh nghiệm</strong> trong lĩnh vực xây dựng, vận hành và phát triển hệ thống dịch vụ khách hàng chuyên nghiệp.
                  </>
                ) : (
                  <>
                    I am <strong className="font-extrabold text-[#0f172a] dark:text-white">Nguyen Hung Thai</strong>, Customer Service Manager with over <strong className="font-extrabold text-[#0f172a] dark:text-white">22 years of experience</strong> in building, operating, and advancing professional customer care systems.
                  </>
                )}
              </p>
            </div>

            {/* Right Column: 3D Robot, Floating Chat Bubbles & Plant Leaves */}
            <div className="relative flex items-center justify-center min-h-[190px] md:w-[42%] shrink-0 overflow-visible w-full select-none">
              {/* Soft Radial Glow */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 sm:w-56 h-48 sm:h-56 rounded-full bg-cyan-200/40 dark:bg-cyan-900/20 pointer-events-none filter blur-xl z-0" />

              {/* Custom Vector Artwork matching image.png */}
              <svg viewBox="0 0 260 180" className="w-full max-w-[290px] h-auto drop-shadow-lg z-10 overflow-visible">
                <defs>
                  {/* Robot Body Gradient */}
                  <linearGradient id="robot3dBody" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="70%" stopColor="#e2e8f0" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                  </linearGradient>

                  {/* Visor Screen Gradient */}
                  <linearGradient id="robot3dScreen" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </linearGradient>

                  {/* Blue Joint Gradient */}
                  <linearGradient id="robot3dJoint" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>

                  {/* Chat Bubble Gradients */}
                  <linearGradient id="pinkBubbleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="100%" stopColor="#db2777" />
                  </linearGradient>
                  <linearGradient id="blueBubbleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>

                  {/* Plant Leaf Gradient */}
                  <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="60%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>
                </defs>

                {/* Background Watermark AI circle */}
                <g opacity="0.35">
                  <circle cx="95" cy="135" r="28" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="95" y="142" fill="#0284c7" fontSize="18" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">AI</text>
                </g>

                {/* Floating Chat Bubbles */}
                {/* Pink Chat Bubble */}
                <g transform="translate(142, 28)">
                  <circle r="13" fill="url(#pinkBubbleGrad)" filter="drop-shadow(0 2px 4px rgba(219,39,119,0.3))" />
                  <circle cx="-5" cy="0" r="1.8" fill="white" />
                  <circle cx="0" cy="0" r="1.8" fill="white" />
                  <circle cx="5" cy="0" r="1.8" fill="white" />
                </g>

                {/* Blue Chat Bubble */}
                <g transform="translate(108, 52)">
                  <circle r="18" fill="url(#blueBubbleGrad)" filter="drop-shadow(0 3px 6px rgba(37,99,235,0.3))" />
                  <circle cx="-7" cy="0" r="2.2" fill="white" />
                  <circle cx="0" cy="0" r="2.2" fill="white" />
                  <circle cx="7" cy="0" r="2.2" fill="white" />
                </g>

                {/* Green Tropical Plant Leaves (Behind Robot on Right Side) */}
                <g transform="translate(205, 10) scale(1.1)">
                  {/* Leaf 1 (Large main leaf) */}
                  <path d="M 0 130 C 20 80, 50 30, 25 0 C -10 30, 0 80, 0 130 Z" fill="url(#leafGrad)" />
                  {/* Leaf vein */}
                  <path d="M 0 130 Q 15 70 25 0" fill="none" stroke="#6ee7b7" strokeWidth="1.5" opacity="0.7" />
                  {/* Leaf 2 (Side leaf) */}
                  <path d="M -10 130 C -25 90, -35 50, -15 20 C 5 50, 0 90, -10 130 Z" fill="url(#leafGrad)" opacity="0.9" />
                </g>

                {/* 3D Waving AI Robot */}
                <g transform="translate(130, 30)">
                  {/* Torso / Body */}
                  <rect x="22" y="68" width="46" height="42" rx="21" fill="url(#robot3dBody)" />
                  {/* Chest Ring Indicator */}
                  <circle cx="45" cy="85" r="8" fill="#f8fafc" stroke="#0284c7" strokeWidth="2" />
                  <circle cx="45" cy="85" r="4" fill="#0284c7" />

                  {/* Right Arm (Resting on side) */}
                  <path d="M 64 74 C 74 80, 75 92, 70 100" fill="none" stroke="url(#robot3dBody)" strokeWidth="9" strokeLinecap="round" />
                  <circle cx="70" cy="100" r="5" fill="url(#robot3dJoint)" />

                  {/* Left Arm (Waving) */}
                  <path d="M 26 74 C 10 65, 0 45, 8 30" fill="none" stroke="url(#robot3dBody)" strokeWidth="9" strokeLinecap="round" />
                  {/* Waving Hand & 5 Fingers */}
                  <g transform="translate(8, 26)">
                    <circle r="7" fill="url(#robot3dBody)" />
                    {/* Fingers */}
                    <line x1="-4" y1="-5" x2="-8" y2="-11" stroke="url(#robot3dBody)" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="-1" y1="-7" x2="-2" y2="-13" stroke="url(#robot3dBody)" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="3" y1="-6" x2="4" y2="-12" stroke="url(#robot3dBody)" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="6" y1="-3" x2="9" y2="-8" stroke="url(#robot3dBody)" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="-6" y1="-1" x2="-11" y2="-3" stroke="url(#robot3dBody)" strokeWidth="2.5" strokeLinecap="round" />
                  </g>

                  {/* Head Neck */}
                  <rect x="39" y="60" width="12" height="10" rx="3" fill="#94a3b8" />

                  {/* Head Outer Shell */}
                  <rect x="10" y="18" width="70" height="46" rx="23" fill="url(#robot3dBody)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
                  {/* Blue Ear Caps */}
                  <rect x="4" y="28" width="7" height="20" rx="3.5" fill="url(#robot3dJoint)" />
                  <rect x="79" y="28" width="7" height="20" rx="3.5" fill="url(#robot3dJoint)" />

                  {/* Blue Screen Visor */}
                  <rect x="17" y="23" width="56" height="34" rx="17" fill="url(#robot3dScreen)" />

                  {/* Expressive Glowing Eyes (As in image: curved blue visor eyes) */}
                  <path d="M 28 38 Q 34 32 40 38" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 50 38 Q 56 32 62 38" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 40 47 Q 45 50 50 47" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                </g>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 1.5: TRỤ CỘT CỐNG HIẾN (FULL-WIDTH BENTO CARD) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, ease: "easeOut" }} 
          className="w-full relative z-10"
        >
          {/* Card: TRỤ CỘT CỐNG HIẾN */}
          <div 
            id="card-dedication-pillars"
            style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 10px))" }}
            className="w-full glass-surface backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-6 md:p-7 shadow-md hover:shadow-xl hover:border-indigo-400/60 dark:hover:border-indigo-400/60 transition-all duration-300 flex flex-col justify-between group/card"
          >
            {/* Header formatted exactly like Thông điệp hợp tác (4-word title in Indigo theme) */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-indigo-200/60 dark:border-indigo-800/60 mb-3">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <h5 className="text-h5 text-indigo-600 dark:text-indigo-400 tracking-wide">
                  {isVi ? "Trụ cột cống hiến" : "Four dedication pillars"}
                </h5>
              </div>
            </div>

            {/* 4 Pillars Cards với màu sắc riêng biệt, nổi bật */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {/* 1. Quy trình */}
              <div 
                style={{ borderRadius: "var(--theme-radius-inner, var(--theme-radius-md, 8px))" }}
                className="p-4 bg-gradient-to-b from-blue-600 via-indigo-600 to-sky-700 text-white flex flex-col items-center justify-center text-center shadow-md shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-blue-300/40"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-1.5 shadow-inner">
                  <Box className="w-5 h-5 text-white" />
                </div>
                <span className="text-card-title font-bold tracking-normal">{isVi ? "Quy trình" : "Process"}</span>
                <span className="text-body-sm sm:text-body font-semibold text-blue-100 mt-1 leading-tight whitespace-nowrap">{isVi ? "Đơn giản & Tận tâm" : "Simple & Dedicated"}</span>
              </div>

              {/* 2. Con người */}
              <div 
                style={{ borderRadius: "var(--theme-radius-inner, var(--theme-radius-md, 8px))" }}
                className="p-4 bg-gradient-to-b from-amber-500 via-orange-600 to-amber-700 text-white flex flex-col items-center justify-center text-center shadow-md shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transform hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-amber-300/40"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-1.5 shadow-inner">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-card-title font-bold tracking-normal">{isVi ? "Con người" : "People"}</span>
                <span className="text-body-sm sm:text-body font-semibold text-amber-100 mt-1 leading-tight whitespace-nowrap">{isVi ? "Trao giá trị & Phát triển" : "Empower & Growth"}</span>
              </div>

              {/* 3. Nhân văn */}
              <div 
                style={{ borderRadius: "var(--theme-radius-inner, var(--theme-radius-md, 8px))" }}
                className="p-4 bg-gradient-to-b from-fuchsia-600 via-rose-600 to-pink-700 text-white flex flex-col items-center justify-center text-center shadow-md shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/40 transform hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-pink-300/40"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-1.5 shadow-inner">
                  <Heart className="w-5 h-5 text-white fill-white/30" />
                </div>
                <span className="text-card-title font-bold tracking-normal">{isVi ? "Nhân văn" : "Humanity"}</span>
                <span className="text-body-sm sm:text-body font-semibold text-pink-100 mt-1 leading-tight whitespace-nowrap">{isVi ? "Thấu hiểu & Đồng cảm" : "Empathy & Care"}</span>
              </div>

              {/* 4. Công nghệ */}
              <div 
                style={{ borderRadius: "var(--theme-radius-inner, var(--theme-radius-md, 8px))" }}
                className="p-4 bg-gradient-to-b from-emerald-500 via-teal-600 to-cyan-700 text-white flex flex-col items-center justify-center text-center shadow-md shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/40 transform hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-teal-300/40"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-1.5 shadow-inner">
                  <Network className="w-5 h-5 text-white" />
                </div>
                <span className="text-card-title font-bold tracking-normal">{isVi ? "Công nghệ" : "Tech"}</span>
                <span className="text-body-sm sm:text-body font-semibold text-teal-100 mt-1 leading-tight whitespace-nowrap">{isVi ? "Cải tiến & Sáng tạo" : "Innovate & Creative"}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 2: TIMELINE (HÀNH TRÌNH SỰ NGHIỆP - CAREER MILESTONES) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, ease: "easeOut" }} 
          id="card-career-milestones"
          className="w-full glass-surface backdrop-blur-3xl border border-sky-200/80 dark:border-slate-800 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white/85 to-blue-50/40 dark:from-slate-900/90 dark:via-slate-900/80 dark:to-slate-950/90 z-10 rounded-3xl p-[25px]"
        >
          <div className="relative z-10 w-full">
            {/* Header: Title on Left with Rocket, Quote Banner on Right */}
            <div className="w-full flex flex-wrap items-center justify-between gap-4 pb-4 sm:pb-5 border-b border-sky-200/70 dark:border-slate-800 mb-5 sm:mb-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-sky-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 shrink-0">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                    {isVi ? "Hành trình sự nghiệp" : "Career journey milestones"}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                    {isVi ? "Những dấu mốc quan trọng kiến tạo nên hành trình phát triển" : "Key milestones shaping the developmental journey"}
                  </p>
                </div>
              </div>

              {/* Quote Banner matching image.png */}
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-sky-100/80 dark:bg-sky-950/50 border border-sky-200/80 dark:border-sky-800/60 shadow-2xs">
                <Quote className="w-5 h-5 text-blue-600 dark:text-blue-400 rotate-180 shrink-0 -mt-1" />
                <div className="text-blue-800 dark:text-blue-300 font-semibold italic text-xs sm:text-sm leading-snug text-left">
                  <div>{isVi ? "Trải nghiệm hôm nay" : "Today's experiences"}</div>
                  <div>{isVi ? "Tạo giá trị ngày mai" : "Shape tomorrow's value"}</div>
                </div>
              </div>
            </div>

            {/* Grid Timeline Container */}
            <div className="relative w-full py-4 px-1 md:px-4" ref={gridContainerRef}>
              {/* Central Vertical Timeline Line (Visible on Desktop only) */}
              <div className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[3px] bg-sky-400 dark:bg-sky-500 rounded-full hidden md:block z-0 opacity-80 shadow-xs" />

              {/* Rows of Symmetrical Pairs */}
              <div className="flex flex-col gap-5 sm:gap-6 relative z-10 w-full">
                {careerPairs.map((pair, pIdx) => {
                  const leftItem = pair.left;
                  const rightItem = pair.right;

                  return (
                    <div key={pIdx} className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-10 lg:gap-x-12 items-stretch">
                      {/* Left Card */}
                      {renderCareerCard(leftItem)}

                      {/* Right Card */}
                      {renderCareerCard(rightItem)}

                      {/* Desktop Timeline Connections */}
                      <div 
                        className="absolute right-1/2 w-8 lg:w-10 h-[2px] top-1/2 -translate-y-1/2 hidden md:block z-0 pointer-events-none"
                        style={{ 
                          background: `linear-gradient(to right, transparent, ${leftItem.color})`,
                          marginRight: "6px"
                        }}
                      />
                      <div 
                        className="absolute left-1/2 w-8 lg:w-10 h-[2px] top-1/2 -translate-y-1/2 hidden md:block z-0 pointer-events-none"
                        style={{ 
                          background: `linear-gradient(to left, transparent, ${rightItem.color})`,
                          marginLeft: "6px"
                        }}
                      />
                      {/* Dual-color Node on Center Timeline Axis */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center gap-1.5 z-20 pointer-events-none">
                        <div 
                          className="w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 shadow-sm transition-transform duration-300"
                          style={{ backgroundColor: leftItem.color }}
                        />
                        <div 
                          className="w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 shadow-sm transition-transform duration-300"
                          style={{ backgroundColor: rightItem.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 3: GIẢI PHÁP CÔNG NGHỆ (TITLE & SUBTITLE) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full flex flex-col items-start gap-1 relative z-10 mt-2"
        >
          <div className="flex items-center gap-2">
            <Atom className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="text-xl sm:text-2xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight">
              {isVi ? "Giải pháp công nghệ" : "Technology Solutions"}
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl text-left">
            {isVi 
              ? "Tối ưu hóa quy trình toàn diện từ đầu đến cuối, kết hợp Trí tuệ nhân tạo (AI) và hệ sinh thái CRM Omni-Channel 360°" 
              : "Comprehensive process optimization from start to finish, integrating Artificial Intelligence (AI) and the CRM Omni-Channel 360° ecosystem"}
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 3.1: 3-COLUMN PILLAR GRID (AUTOMATION, DATA ANALYSIS, AI CHATBOTS) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full relative z-10"
        >
          {/* Column 1: CRM Omni 360° (Tự động hóa) */}
          <div 
            style={{ borderRadius: "var(--theme-radius-inner, var(--theme-radius-md, 16px))" }}
            className="group/pillar relative overflow-hidden flex flex-col justify-between p-6 bg-gradient-to-br from-blue-50/75 to-blue-100/45 dark:from-[#131d35]/40 dark:to-[#0d1527]/30 border border-blue-200/80 dark:border-blue-900/50 hover:border-blue-400 dark:hover:border-blue-600 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[220px] text-left"
          >
            {/* Ambient lighting & graphic decoration */}
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-2xl pointer-events-none z-0" />
            <Layers className="absolute -right-4 -bottom-4 w-20 h-20 text-blue-500/8 dark:text-blue-400/4 rotate-12 pointer-events-none transition-transform duration-500 group-hover/pillar:rotate-6 group-hover/pillar:scale-110" />

            {/* Top row */}
            <div className="flex items-center justify-between relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-sky-500 text-white flex items-center justify-center shadow-md shadow-blue-500/25 transition-transform duration-300 group-hover/pillar:scale-105">
                <Layers className="w-6 h-6" />
              </div>
              <span className="font-mono font-bold text-xs text-blue-500/70 dark:text-blue-400/70 uppercase tracking-widest">{isVi ? "Tự động hóa" : "Automation"}</span>
            </div>

            {/* Title & Body */}
            <div className="mt-5 mb-4 relative z-10 text-left flex-1">
              <h5 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 group-hover/pillar:text-blue-600 dark:group-hover/pillar:text-blue-400 transition-colors">
                CRM Omni 360°
              </h5>
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                {isVi ? "Hợp nhất kênh tương tác Đa kênh, tối ưu hóa quy trình, mang lại trải nghiệm khách hàng vượt trội." : "Omni-channel contact integration, standardizing processes, and creating exceptional client experiences."}
              </p>
            </div>

            {/* Tags footer */}
            <div className="flex flex-wrap gap-1.5 mt-auto relative z-10">
              <span className="px-2 py-0.5 rounded-md bg-blue-100/70 dark:bg-blue-900/50 text-[9px] font-bold text-blue-600 dark:text-blue-400 tracking-wider">ĐA KÊNH</span>
              <span className="px-2 py-0.5 rounded-md bg-blue-100/70 dark:bg-blue-900/50 text-[9px] font-bold text-blue-600 dark:text-blue-400 tracking-wider">TỐI ƯU QUY TRÌNH</span>
            </div>
          </div>

          {/* Column 2: Dashboard BI (Phân tích dữ liệu) */}
          <div 
            style={{ borderRadius: "var(--theme-radius-inner, var(--theme-radius-md, 16px))" }}
            className="group/pillar relative overflow-hidden flex flex-col justify-between p-6 bg-gradient-to-br from-purple-50/75 to-purple-100/45 dark:from-[#1b152d]/40 dark:to-[#120e20]/30 border border-purple-200/80 dark:border-purple-900/50 hover:border-purple-400 dark:hover:border-purple-600 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[220px] text-left"
          >
            {/* Ambient lighting & graphic decoration */}
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-2xl pointer-events-none z-0" />
            <BarChart2 className="absolute -right-4 -bottom-4 w-20 h-20 text-purple-500/8 dark:text-purple-400/4 rotate-12 pointer-events-none transition-transform duration-500 group-hover/pillar:rotate-6 group-hover/pillar:scale-110" />

            {/* Top row */}
            <div className="flex items-center justify-between relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-purple-500/25 transition-transform duration-300 group-hover/pillar:scale-105">
                <BarChart2 className="w-6 h-6" />
              </div>
              <span className="font-mono font-bold text-xs text-purple-500/70 dark:text-purple-400/70 uppercase tracking-widest">{isVi ? "Phân tích dữ liệu" : "Data Analysis"}</span>
            </div>

            {/* Title & Body */}
            <div className="mt-5 mb-4 relative z-10 text-left flex-1">
              <h5 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 group-hover/pillar:text-purple-600 dark:group-hover/pillar:text-purple-400 transition-colors">
                Dashboard BI
              </h5>
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                {isVi ? "Báo cáo phân tích dữ liệu theo thời gian thực trực quan, hỗ trợ đắc lực công tác quản trị và ra quyết định." : "Visual real-time analytics reports providing actionable insights for optimal corporate administration."}
              </p>
            </div>

            {/* Tags footer */}
            <div className="flex flex-wrap gap-1.5 mt-auto relative z-10">
              <span className="px-2 py-0.5 rounded-md bg-purple-100/70 dark:bg-purple-900/50 text-[9px] font-bold text-purple-600 dark:text-purple-400 tracking-wider">REAL-TIME BI</span>
              <span className="px-2 py-0.5 rounded-md bg-purple-100/70 dark:bg-purple-900/50 text-[9px] font-bold text-purple-600 dark:text-purple-400 tracking-wider">TRỰC QUAN</span>
            </div>
          </div>

          {/* Column 3: AI Chatbot (AI Chatbot) */}
          <div 
            style={{ borderRadius: "var(--theme-radius-inner, var(--theme-radius-md, 16px))" }}
            className="group/pillar relative overflow-hidden flex flex-col justify-between p-6 bg-gradient-to-br from-rose-50/75 to-rose-100/45 dark:from-[#2a1b14]/40 dark:to-[#1e120e]/30 border border-rose-200/80 dark:border-rose-900/50 hover:border-rose-400 dark:hover:border-rose-600 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[220px] text-left"
          >
            {/* Ambient lighting & graphic decoration */}
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-rose-400/10 dark:bg-rose-600/10 rounded-full blur-2xl pointer-events-none z-0" />
            <Bot className="absolute -right-4 -bottom-4 w-20 h-20 text-rose-500/8 dark:text-rose-400/4 rotate-12 pointer-events-none transition-transform duration-500 group-hover/pillar:rotate-6 group-hover/pillar:scale-110" />

            {/* Top row */}
            <div className="flex items-center justify-between relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-md shadow-rose-500/25 transition-transform duration-300 group-hover/pillar:scale-105">
                <Bot className="w-6 h-6" />
              </div>
              <span className="font-mono font-bold text-xs text-rose-500/70 dark:text-rose-400/70 uppercase tracking-widest">AI Chatbot</span>
            </div>

            {/* Title & Body */}
            <div className="mt-5 mb-4 relative z-10 text-left flex-1">
              <h5 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 group-hover/pillar:text-rose-600 dark:group-hover/pillar:text-rose-400 transition-colors">
                AI Chatbot
              </h5>
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                {isVi ? "Tự động hóa phản hồi nhanh chóng, hỗ trợ khách hàng đa kênh tự động và chăm sóc 24/7 chuyên nghiệp." : "Fast automated responses, automated omnichannel client support, and 24/7 smart interactions."}
              </p>
            </div>

            {/* Tags footer */}
            <div className="flex flex-wrap gap-1.5 mt-auto relative z-10">
              <span className="px-2 py-0.5 rounded-md bg-rose-100/70 dark:bg-rose-900/50 text-[9px] font-bold text-rose-600 dark:text-rose-400 tracking-wider">TỰ ĐỘNG 24/7</span>
              <span className="px-2 py-0.5 rounded-md bg-rose-100/70 dark:bg-rose-900/50 text-[9px] font-bold text-rose-600 dark:text-rose-400 tracking-wider">AI CHĂM SÓC</span>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 3.2: TÂM THƯ TRI ÂN (FULL-WIDTH ELEGANT 2-COLUMN PANEL) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full relative z-10"
        >
          <div 
            id="card-gratitude-statement"
            style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 24px))" }}
            className="glass-surface backdrop-blur-2xl border border-emerald-100 dark:border-emerald-900/40 p-6 sm:p-8 md:p-10 shadow-lg shadow-emerald-500/5 hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-700/60 transition-all duration-300 flex flex-col md:flex-row items-stretch justify-between gap-8 group/gratitude bg-gradient-to-br from-white/95 to-emerald-50/90 dark:from-slate-900/95 dark:to-emerald-900/90 relative overflow-hidden"
          >
            {/* Ambient lighting & decoration */}
            <div className="absolute top-0 left-0 -ml-16 -mt-16 w-64 h-64 bg-emerald-400/10 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none z-0" />
            
            {/* Left Column - Sincere Content & Quote */}
            <div className="w-full md:w-[55%] flex flex-col justify-between gap-6 relative z-10 text-left">
              <div className="flex flex-col gap-4">
                {/* Header title */}
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/25 text-white shrink-0">
                    <Heart className="w-6 h-6 fill-white/20 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-emerald-800 dark:text-emerald-400">
                      {isVi ? "Tâm thư tri ân" : "Sincere Appreciation"}
                    </h3>
                    <p className="text-[10px] font-bold tracking-[0.15em] text-emerald-500/70 dark:text-emerald-400/70 uppercase mt-0.5">
                      SINCERE APPRECIATION
                    </p>
                  </div>
                </div>

                {/* Sincere message */}
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed max-w-[55ch]">
                  {isVi 
                    ? "Tôi mong muốn được đồng hành cùng Quý Doanh nghiệp để kiến tạo giá trị, lan tỏa sự hài lòng và cùng nhau phát triển bền vững. Với kinh nghiệm, nhiệt huyết và tinh thần thấu hiểu sâu sắc, tôi tin tưởng vào những thành công tốt đẹp sắp tới."
                    : "I look forward to partnering with your esteemed enterprise to co-create values, cultivate deep satisfaction, and sustain mutual development. Backed by experience, dedication, and active empathy, I strongly believe in our future triumphs."}
                </p>
              </div>

              {/* Quote box synthesis */}
              <div className="w-full bg-blue-50/70 dark:bg-blue-950/40 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50 relative flex flex-col justify-center shadow-sm">
                <Quote className="absolute top-3 left-3 w-6 h-6 text-indigo-400/30 dark:text-indigo-400/15 rotate-180" />
                <Quote className="absolute bottom-3 right-3 w-6 h-6 text-indigo-400/30 dark:text-indigo-400/15" />
                
                <div className="text-center space-y-1.5 relative z-10 py-1.5">
                  <p className="text-base sm:text-lg font-bold text-indigo-700 dark:text-indigo-400 italic">
                    {isVi ? "Cùng kết nối · Cùng kiến tạo · Cùng thành công" : "Connect together · Create together · Succeed together"}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-[#f95700] dark:text-[#f97316]">
                    {isVi ? "Cùng nhau, Cùng phát triển, Cùng thành công." : "Together, Grow together, Succeed together."}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Mountain Artwork & Signature Block */}
            <div className="w-full md:w-[40%] flex flex-col justify-between gap-6 relative z-10 text-left md:border-l md:border-slate-200/55 md:dark:border-slate-800/60 md:pl-8">
              {/* Decorative Mountain Area */}
              <div className="w-full rounded-2xl bg-gradient-to-t from-blue-100/60 to-transparent dark:from-blue-950/20 border border-blue-50/50 dark:border-blue-900/30 flex items-end justify-center relative overflow-hidden h-[150px] shadow-sm backdrop-blur-[2px]">
                <span className="absolute top-4 right-4 text-blue-700 dark:text-blue-400 font-handwriting text-[14px] leading-tight rotate-[-12deg] z-20 text-right opacity-95 drop-shadow-xs">
                  {isVi ? "Hành trình\nvẫn tiếp tục..." : "The journey\ncontinues..."}
                </span>
                
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-blue-200/30 to-transparent dark:from-blue-950/30 z-10 pointer-events-none" />
                <MountainSnow className="w-24 h-24 text-blue-400/25 dark:text-blue-600/15 absolute -bottom-2 z-0 pointer-events-none" strokeWidth={1.3} />
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-200/40 dark:bg-yellow-500/10 rounded-full blur-xl z-0 pointer-events-none" />
              </div>

              {/* Signature block with standard labels */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="mb-0.5 -ml-1">
                  <SignatureSvg />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Nguyễn Hùng Thái
                </h4>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 uppercase tracking-wide">
                  {isVi ? "Trưởng phòng Chăm sóc Khách hàng" : "Customer Service Manager"}
                </span>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mt-4 text-[9px] font-black tracking-widest text-emerald-600/80 dark:text-emerald-400/70 uppercase">
                  <span>TRẢI NGHIỆM</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                  <span>KẾT NỐI</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                  <span>PHÁT TRIỂN</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 4: GIÁ TRỊ CỐT LÕI CHÚNG TÔI THEO ĐUỔI (FULL WIDTH BENTO CARD) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, ease: "easeOut" }} 
          id="card-core-values-pursued"
          style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 10px))" }}
          className="w-full glass-surface backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-[25px] shadow-md hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all duration-300 flex flex-col items-start w-full group/values z-10"
        >
          {/* Tiêu đề Khối formatted exactly like Thông điệp hợp tác */}
          <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-indigo-200/60 dark:border-indigo-800/60 mb-3">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <h3 className="text-card-title font-bold text-indigo-600 dark:text-indigo-400 tracking-wide">
                {isVi ? "Giá trị cốt lõi" : "Core values pursued"}
              </h3>
            </div>
          </div>

          {/* 4 Cột Giá Trị Cốt Lõi thiết kế Bento Card Cao Cấp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full mt-4 mb-6">
            {/* 1. Tận tâm */}
            <div 
              style={{ borderRadius: "var(--theme-radius-inner, var(--theme-radius-md, 12px))" }}
              className="relative overflow-hidden flex flex-col justify-between p-6 bg-gradient-to-br from-purple-50/75 to-purple-100/45 dark:from-[#1b152d]/40 dark:to-[#120e20]/30 border border-purple-200/80 dark:border-purple-900/50 hover:border-purple-400 dark:hover:border-purple-600 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[190px] text-left group"
            >
              {/* Subtle Brand Color Radial Tint */}
              <div 
                className="absolute inset-0 opacity-4 dark:opacity-[0.06] pointer-events-none mix-blend-multiply dark:mix-blend-color-dodge"
                style={{ background: "radial-gradient(circle at bottom right, #a855f7, transparent 70%)" }}
              />
              
              {/* Giant Watermark Icon */}
              <Heart className="absolute -right-6 -bottom-6 w-24 h-24 text-purple-500/8 dark:text-purple-400/4 rotate-12 pointer-events-none" />

              {/* Top Row: Icon on Left, Large Index on Right */}
              <div className="flex items-center justify-between relative z-10">
                <div className="w-12 h-12 rounded-full bg-purple-500/15 dark:bg-purple-500/20 border border-purple-500/35 flex items-center justify-center relative shadow-[0_0_15px_rgba(168,85,247,0.25)] transition-transform duration-300 group-hover:scale-110">
                  <Heart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="font-mono font-black text-3xl sm:text-4xl text-purple-500/15 dark:text-purple-400/10 select-none">01</span>
              </div>

              {/* Title & Body */}
              <div className="mt-4 mb-6 relative z-10 text-left">
                <h4 className="text-lg font-bold text-purple-600 dark:text-purple-400 tracking-normal mb-1.5">
                  {isVi ? "Tận tâm" : "Dedication"}
                </h4>
                <p className="text-body-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-[28ch]">
                  {isVi ? "Đặt khách hàng làm trọng tâm mọi quyết định và hành động." : "Put customers at the center of every decision and action."}
                </p>
              </div>

              {/* English Subtitle Label */}
              <span className="text-[10px] tracking-widest font-mono font-bold text-purple-500/60 dark:text-purple-400/50 uppercase mt-auto relative z-10">
                DEDICATION
              </span>
            </div>

            {/* 2. Chuyên nghiệp */}
            <div 
              style={{ borderRadius: "var(--theme-radius-inner, var(--theme-radius-md, 12px))" }}
              className="relative overflow-hidden flex flex-col justify-between p-6 bg-gradient-to-br from-blue-50/75 to-blue-100/45 dark:from-[#131d35]/40 dark:to-[#0d1527]/30 border border-blue-200/80 dark:border-blue-900/50 hover:border-blue-400 dark:hover:border-blue-600 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[190px] text-left group"
            >
              {/* Subtle Brand Color Radial Tint */}
              <div 
                className="absolute inset-0 opacity-4 dark:opacity-[0.06] pointer-events-none mix-blend-multiply dark:mix-blend-color-dodge"
                style={{ background: "radial-gradient(circle at bottom right, #3b82f6, transparent 70%)" }}
              />

              {/* Giant Watermark Icon */}
              <Target className="absolute -right-6 -bottom-6 w-24 h-24 text-blue-500/8 dark:text-blue-400/4 rotate-12 pointer-events-none" />

              {/* Top Row: Icon on Left, Large Index on Right */}
              <div className="flex items-center justify-between relative z-10">
                <div className="w-12 h-12 rounded-full bg-blue-500/15 dark:bg-blue-500/20 border border-blue-500/35 flex items-center justify-center relative shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-transform duration-300 group-hover:scale-110">
                  <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="font-mono font-black text-3xl sm:text-4xl text-blue-500/15 dark:text-blue-400/10 select-none">02</span>
              </div>

              {/* Title & Body */}
              <div className="mt-4 mb-6 relative z-10 text-left">
                <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 tracking-normal mb-1.5">
                  {isVi ? "Chuyên nghiệp" : "Professionalism"}
                </h4>
                <p className="text-body-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-[28ch]">
                  {isVi ? "Đặt chuẩn mực làm nền tảng mọi quy trình và hoạt động." : "Set standards as the foundation for every process and operation."}
                </p>
              </div>

              {/* English Subtitle Label */}
              <span className="text-[10px] tracking-widest font-mono font-bold text-blue-500/60 dark:text-blue-400/50 uppercase mt-auto relative z-10">
                PROFESSIONALISM
              </span>
            </div>

            {/* 3. Đổi mới */}
            <div 
              style={{ borderRadius: "var(--theme-radius-inner, var(--theme-radius-md, 12px))" }}
              className="relative overflow-hidden flex flex-col justify-between p-6 bg-gradient-to-br from-orange-50/75 to-orange-100/45 dark:from-[#2a1b14]/40 dark:to-[#1e120e]/30 border border-orange-200/80 dark:border-orange-900/50 hover:border-orange-400 dark:hover:border-orange-600 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[190px] text-left group"
            >
              {/* Subtle Brand Color Radial Tint */}
              <div 
                className="absolute inset-0 opacity-4 dark:opacity-[0.06] pointer-events-none mix-blend-multiply dark:mix-blend-color-dodge"
                style={{ background: "radial-gradient(circle at bottom right, #f97316, transparent 70%)" }}
              />

              {/* Giant Watermark Icon */}
              <Lightbulb className="absolute -right-6 -bottom-6 w-24 h-24 text-orange-500/8 dark:text-orange-400/4 rotate-12 pointer-events-none" />

              {/* Top Row: Icon on Left, Large Index on Right */}
              <div className="flex items-center justify-between relative z-10">
                <div className="w-12 h-12 rounded-full bg-orange-500/15 dark:bg-orange-500/20 border border-orange-500/35 flex items-center justify-center relative shadow-[0_0_15px_rgba(249,115,22,0.25)] transition-transform duration-300 group-hover:scale-110">
                  <Lightbulb className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <span className="font-mono font-black text-3xl sm:text-4xl text-orange-500/15 dark:text-orange-400/10 select-none">03</span>
              </div>

              {/* Title & Body */}
              <div className="mt-4 mb-6 relative z-10 text-left">
                <h4 className="text-lg font-bold text-orange-600 dark:text-orange-400 tracking-normal mb-1.5">
                  {isVi ? "Đổi mới" : "Innovation"}
                </h4>
                <p className="text-body-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-[28ch]">
                  {isVi ? "Đặt công nghệ làm động lực mọi sáng tạo và cải tiến." : "Drive technology as the catalyst for all creativity and improvement."}
                </p>
              </div>

              {/* English Subtitle Label */}
              <span className="text-[10px] tracking-widest font-mono font-bold text-orange-500/60 dark:text-orange-400/50 uppercase mt-auto relative z-10">
                INNOVATION
              </span>
            </div>

            {/* 4. Đồng hành */}
            <div 
              style={{ borderRadius: "var(--theme-radius-inner, var(--theme-radius-md, 12px))" }}
              className="relative overflow-hidden flex flex-col justify-between p-6 bg-gradient-to-br from-emerald-50/75 to-emerald-100/45 dark:from-[#0f2421]/40 dark:to-[#0a1816]/30 border border-emerald-200/80 dark:border-emerald-900/50 hover:border-emerald-400 dark:hover:border-emerald-600 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[190px] text-left group"
            >
              {/* Subtle Brand Color Radial Tint */}
              <div 
                className="absolute inset-0 opacity-4 dark:opacity-[0.06] pointer-events-none mix-blend-multiply dark:mix-blend-color-dodge"
                style={{ background: "radial-gradient(circle at bottom right, #10b981, transparent 70%)" }}
              />

              {/* Giant Watermark Icon */}
              <Handshake className="absolute -right-6 -bottom-6 w-24 h-24 text-emerald-500/8 dark:text-emerald-400/4 rotate-12 pointer-events-none" />

              {/* Top Row: Icon on Left, Large Index on Right */}
              <div className="flex items-center justify-between relative z-10">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 border border-emerald-500/35 flex items-center justify-center relative shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-transform duration-300 group-hover:scale-110">
                  <Handshake className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="font-mono font-black text-3xl sm:text-4xl text-emerald-500/15 dark:text-emerald-400/10 select-none">04</span>
              </div>

              {/* Title & Body */}
              <div className="mt-4 mb-6 relative z-10 text-left">
                <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 tracking-normal mb-1.5">
                  {isVi ? "Đồng hành" : "Partnership"}
                </h4>
                <p className="text-body-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-[28ch]">
                  {isVi ? "Đặt tin tưởng làm nền tảng mọi hợp tác và phát triển." : "Build trust as the foundation for all collaboration and growth."}
                </p>
              </div>

              {/* English Subtitle Label */}
              <span className="text-[10px] tracking-widest font-mono font-bold text-emerald-500/60 dark:text-emerald-400/50 uppercase mt-auto relative z-10">
                PARTNERSHIP
              </span>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 4.5: BANNER CÂU NÓI ẤN TƯỢNG VÀ ĐẶC SẮC (HERO QUOTE BANNER) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{ borderRadius: "var(--theme-radius-card, 12px)" }}
          className="w-full relative group/banner overflow-hidden z-10"
        >
          {/* Khối Banner Tinh Tế Glass UI */}
          <div 
            style={{ borderRadius: "var(--theme-radius-card, 12px)" }}
            className="relative z-10 w-full bg-linear-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 text-white p-4 sm:p-5 md:p-6 border border-white/20 dark:border-slate-800 shadow-md backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 overflow-hidden text-left"
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
              <p className="text-white text-sm sm:text-base font-medium leading-relaxed tracking-wide font-sans select-none">
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
