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
  ShoppingCart,
  Database,
  Cpu
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
                  ? "w-20 h-20 rounded-full bg-purple-500/15 dark:bg-purple-500/20 border-2 border-purple-500/35 shadow-[0_0_15px_rgba(168,85,247,0.25)] p-2.5"
                  : "w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 p-2 shadow-xs"
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
          <p className="text-body text-slate-700 dark:text-slate-300 leading-relaxed text-left">
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
        <PageCardHeader pageId="letter" />

        {/* ========================================================================= */}
        {/* ROW 1: GRID CONTAINER FOR COOPERATION MESSAGE & DEDICATION PILLARS */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, ease: "easeOut" }} 
          className="w-full relative z-10 flex flex-col"
        >
          {/* THẺ THÔNG ĐIỆP HỢP TÁC VỚI VIDEO NỀN */}
          <div
            id="card-main-letter-content"
            style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 24px))" }}
            className="w-full relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 md:p-9 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row justify-between items-center gap-8 group z-10"
          >
            {/* Ambient Background Video */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
              <video
                src="https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero_robo_video.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                style={{ filter: "brightness(0.92) contrast(1.08)" }}
                className="w-full h-full object-cover opacity-20 dark:opacity-30 scale-105"
              />
              {/* Overlay Glass/Gradient for high contrast and readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70 dark:from-slate-950 dark:via-slate-950/90 dark:to-slate-950/70" />
            </div>

            {/* Left Column: Text Content */}
            <div className="flex-1 flex flex-col justify-center relative z-10 text-left w-full max-w-2xl">
              {/* Header Title formatted like Trụ cột cống hiến */}
              <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-emerald-200/60 dark:border-emerald-800/60 mb-3.5">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <BookCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <h6 className="text-h6 font-bold text-emerald-600 dark:text-emerald-400 tracking-wide">
                    {isVi ? "Thông điệp hợp tác" : "Cooperation message"}
                  </h6>
                </div>
              </div>

              {/* Salutation Line in Vibrant Orange */}
              <p className="text-[#f95700] dark:text-[#f97316] font-bold text-base sm:text-lg md:text-[19px] leading-snug mb-3">
                {isVi ? "Kính gửi Quý đối tác, Quý khách hàng và toàn thể cộng sự." : "Dear Valued Partners, Customers, and Colleagues."}
              </p>

              {/* Body Content */}
              <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base md:text-[17px] leading-relaxed font-normal text-left">
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

            {/* Right Column: Dynamic Floating Badges on top of background */}
            <div className="relative z-10 w-full md:w-[320px] shrink-0 flex flex-col gap-4 sm:gap-5 justify-center py-4 md:py-0 select-none">
              {/* Badge 1 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                animate={{ y: [-3, 3, -3] }}
                transition={{
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.5 }
                }}
                className="w-full pointer-events-auto"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 px-4 py-3 rounded-2xl bg-gradient-to-br from-white/80 to-white/50 dark:from-slate-900/90 dark:to-slate-900/60 border border-white/60 dark:border-white/10 backdrop-blur-md shadow-md transition-all hover:scale-[1.02] duration-300">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="text-left leading-tight">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 dark:text-sky-400 font-mono">
                        {isVi ? "Trí Nhân AI" : "Tri Nhan AI"}
                      </span>
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                      {isVi ? "Trợ lý số đồng hành" : "Digital CX Companion"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Badge 2 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                animate={{ y: [3, -3, 3] }}
                transition={{
                  y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.5, delay: 0.1 }
                }}
                className="w-full pointer-events-auto"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 px-4 py-3 rounded-2xl bg-gradient-to-br from-white/80 to-white/50 dark:from-slate-900/90 dark:to-slate-900/60 border border-white/60 dark:border-white/10 backdrop-blur-md shadow-md transition-all hover:scale-[1.02] duration-300">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="text-left leading-tight">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono block">
                      {isVi ? "22+ Năm Kinh Nghiệm" : "22+ Years CX"}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                      {isVi ? "Xây dựng & Vận hành" : "Care & Operations"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Badge 3 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                animate={{ y: [-4, 4, -4] }}
                transition={{
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.5, delay: 0.2 }
                }}
                className="w-full pointer-events-auto"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 px-4 py-3 rounded-2xl bg-gradient-to-br from-white/80 to-white/50 dark:from-slate-900/90 dark:to-slate-900/60 border border-white/60 dark:border-white/10 backdrop-blur-md shadow-md transition-all hover:scale-[1.02] duration-300">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shrink-0">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div className="text-left leading-tight">
                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-mono block">
                      {isVi ? "Tận Tâm Phụng Sự" : "Dedicated Service"}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                      {isVi ? "Đồng hành cùng khách hàng" : "Partnering for Success"}
                    </p>
                  </div>
                </div>
              </motion.div>
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
            {/* Header formatted like Trụ cột cống hiến */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-sky-200/60 dark:border-sky-800/60 mb-5 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <Rocket className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0" />
                <h6 className="text-h6 font-bold text-sky-600 dark:text-sky-400 tracking-wide">
                  {isVi ? "Hành trình sự nghiệp" : "Career journey milestones"}
                </h6>
              </div>

              {/* Quote Banner */}
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-sky-100/80 dark:bg-sky-950/50 border border-sky-200/80 dark:border-sky-800/60 shadow-2xs">
                <Quote className="w-4 h-4 text-blue-600 dark:text-blue-400 rotate-180 shrink-0 -mt-0.5" />
                <div className="text-blue-800 dark:text-blue-300 font-semibold italic text-xs leading-snug text-left">
                  <span>{isVi ? "Trải nghiệm hôm nay · Tạo giá trị ngày mai" : "Today's experiences · Shape tomorrow's value"}</span>
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
        {/* ROW 3 & 3.2: GIẢI PHÁP CÔNG NGHỆ & TÂM THƯ TRI ÂN (SIDE-BY-SIDE ON SAME ROW) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full relative z-10 items-stretch">
          {/* Card 1: GIẢI PHÁP CÔNG NGHỆ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full flex flex-col"
          >
            <div 
              id="card-tech-solutions"
              className="w-full h-full relative overflow-hidden rounded-[28px] sm:rounded-[32px] bg-gradient-to-br from-[#f4f9ff] via-[#eef6ff] to-[#f8fbff] dark:from-[#0b1b2b] dark:via-[#0c2236] dark:to-[#081726] border border-blue-200/90 dark:border-cyan-500/30 p-6 sm:p-8 md:p-10 shadow-lg dark:shadow-[0_0_30px_rgba(6,182,212,0.12)] transition-all duration-300 group/tech text-left flex flex-col justify-between"
            >
              {/* Ambient Background Glow */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-300/20 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-0" />
              <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-sky-200/25 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-0" />

              {/* Header: Title formatted like Trụ cột cống hiến + Description */}
              <div className="relative z-10 flex flex-col items-start text-left mb-4 sm:mb-5">
                <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-blue-200/60 dark:border-blue-800/60 mb-3">
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <Sparkles className="w-5 h-5 text-[#2563eb] dark:text-cyan-400 shrink-0" />
                    <h6 className="text-h6 font-black text-[#2563eb] dark:text-cyan-400 tracking-wide uppercase">
                      {isVi ? "Triết lý quản trị" : "Management Philosophy"}
                    </h6>
                  </div>
                </div>

                {/* Description Paragraph */}
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-semibold">
                  {isVi 
                    ? "Qua hơn hai thập kỷ làm việc trong nhiều lĩnh vực khác nhau, tôi nhận ra rằng chăm sóc khách hàng không chỉ là giải quyết vấn đề mà là xây dựng một hệ thống giúp doanh nghiệp phát triển bền vững."
                    : "Through over two decades of working across diverse industries, I realized that customer care is not just about solving issues, but about building a system that fosters sustainable business growth."}
                </p>
              </div>

              {/* Content: Three Core Principles */}
              <div className="relative z-10 flex flex-col gap-4 flex-1 w-full mt-2">
                <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {isVi ? "Tôi luôn làm việc dựa trên ba nguyên tắc cốt lõi:" : "I always work based on three core principles:"}
                </p>

                <div className="flex flex-col gap-3">
                  {/* Principle 1 */}
                  <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-blue-100 dark:border-blue-900/50 shadow-2xs text-left flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-[#2563eb] dark:text-cyan-400 flex items-center justify-center shrink-0">
                      <Box className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                        {isVi ? "Quy trình tạo nền tảng." : "Process builds the foundation."}
                      </h4>
                      <p className="text-2xs sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {isVi ? "Định hình chuẩn mực, tối ưu hóa hiệu suất vận hành." : "Defining standards, optimizing operational efficiency."}
                      </p>
                    </div>
                  </div>

                  {/* Principle 2 */}
                  <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-blue-100 dark:border-blue-900/50 shadow-2xs text-left flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                        {isVi ? "Con người tạo giá trị." : "People create value."}
                      </h4>
                      <p className="text-2xs sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {isVi ? "Đào tạo đội ngũ lắng nghe, thấu cảm sâu sắc." : "Training teams to listen and deeply empathize."}
                      </p>
                    </div>
                  </div>

                  {/* Principle 3 */}
                  <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-blue-100 dark:border-blue-900/50 shadow-2xs text-left flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Network className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                        {isVi ? "Công nghệ tạo đòn bẩy." : "Technology provides leverage."}
                      </h4>
                      <p className="text-2xs sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {isVi ? "Tích hợp AI và tự động hóa bức phá năng suất." : "Integrating AI and automation for peak productivity."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: TÂM THƯ TRI ÂN */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full flex flex-col"
          >
            <div 
              id="card-gratitude-statement"
              style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 24px))" }}
              className="glass-surface backdrop-blur-2xl border border-emerald-100 dark:border-emerald-900/40 p-6 sm:p-8 md:p-10 shadow-lg shadow-emerald-500/5 hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-700/60 transition-all duration-300 flex flex-col items-stretch justify-between gap-6 group/gratitude bg-gradient-to-br from-white/95 to-emerald-50/90 dark:from-slate-900/95 dark:to-emerald-900/90 relative overflow-hidden h-full"
            >
              {/* Ambient lighting & decoration */}
              <div className="absolute top-0 left-0 -ml-16 -mt-16 w-64 h-64 bg-emerald-400/10 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none z-0" />
              
              {/* Top - Sincere Content & Quote */}
              <div className="w-full flex flex-col justify-between gap-6 relative z-10 text-left">
                <div className="flex flex-col gap-4">
                  {/* Header title formatted like Trụ cột cống hiến */}
                  <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-emerald-200/60 dark:border-emerald-800/60 mb-1">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <Heart className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 fill-emerald-500/20" />
                      <h6 className="text-h6 font-bold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
                        {isVi ? "Tâm thư tri ân" : "Sincere Appreciation"}
                      </h6>
                    </div>
                  </div>

                  {/* Sincere message */}
                  <div className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed space-y-4 font-medium">
                    <p>
                      {isVi ? (
                        <>
                          Từ đó, tôi tập trung xây dựng các hệ thống <strong className="font-extrabold text-[#0057FF] dark:text-cyan-400">CRM</strong>, <strong className="font-extrabold text-[#0057FF] dark:text-cyan-400">Dashboard quản trị</strong>, <strong className="font-extrabold text-[#0057FF] dark:text-cyan-400">AI Chatbot</strong> và các giải pháp <strong className="font-extrabold text-[#0057FF] dark:text-cyan-400">tự động hóa</strong>, nhằm nâng cao hiệu quả vận hành, tối ưu trải nghiệm khách hàng và hỗ trợ nhà quản lý ra quyết định bằng dữ liệu.
                        </>
                      ) : (
                        <>
                          From there, I focus on building <strong className="font-extrabold text-[#0057FF] dark:text-cyan-400">CRM</strong> systems, <strong className="font-extrabold text-[#0057FF] dark:text-cyan-400">management Dashboards</strong>, <strong className="font-extrabold text-[#0057FF] dark:text-cyan-400">AI Chatbots</strong>, and <strong className="font-extrabold text-[#0057FF] dark:text-cyan-400">automation</strong> solutions to enhance operational efficiency, optimize customer experience, and support managers in making data-driven decisions.
                        </>
                      )}
                    </p>
                    <p>
                      {isVi ? (
                        <>
                          Bên cạnh công nghệ, tôi luôn xem <strong className="font-extrabold text-[#0057FF] dark:text-cyan-400">con người</strong> là yếu tố quyết định thành công. Vì vậy, tôi chú trọng đào tạo đội ngũ biết lắng nghe, thấu hiểu và mang đến những trải nghiệm vượt mong đợi cho khách hàng.
                        </>
                      ) : (
                        <>
                          Beside technology, I always consider <strong className="font-extrabold text-[#0057FF] dark:text-cyan-400">people</strong> as the deciding factor for success. Therefore, I focus on training the team to listen, understand, and bring experiences that exceed customer expectations.
                        </>
                      )}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {isVi ? "Tôi luôn tâm niệm:" : "I always believe:"}
                    </p>
                  </div>
                </div>

                {/* Quote box synthesis */}
                <div className="w-full bg-[#fcfcff] dark:bg-slate-900/50 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 relative flex flex-col justify-center shadow-xs">
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
              <div className="w-full flex flex-col justify-between gap-4 relative z-10 text-left pt-4 border-t border-slate-200/55 dark:border-slate-800/60 mt-auto">
                <div className="flex flex-col items-start text-left">
                  <div className="mb-0.5 -ml-1">
                    <SignatureSvg />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Nguyễn Hùng Thái
                  </h4>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 uppercase tracking-wide">
                    {isVi ? "Trưởng phòng Chăm sóc Khách hàng" : "Customer Service Manager"}
                  </span>

                  <div className="flex flex-wrap items-center justify-start gap-1.5 mt-3 text-[9px] font-black tracking-widest text-emerald-600/80 dark:text-emerald-400/70 uppercase">
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
        </div>

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
              <h6 className="text-h6 font-bold text-indigo-600 dark:text-indigo-400 tracking-wide">
                {isVi ? "Giá trị cốt lõi" : "Core values pursued"}
              </h6>
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
