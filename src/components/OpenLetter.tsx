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
  MountainSnow
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
  company: string;
  roleVi: string;
  roleEn: string;
  color: string;
  logo: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  arrowDesktop: "right" | "down" | "left" | "compass";
  arrowTablet: "right" | "down" | "compass";
  desktopGridClass: string;
  tabletGridClass: string;
  descVi: string;
  descEn: string;
  highlightVi: string;
  highlightEn: string;
  isCenterAlign?: boolean;
}

const CAREER_MILESTONES_ZICZAC: CareerMilestoneItem[] = [
  {
    id: "card-2002",
    yearNumber: "2002",
    yearLabelVi: "Năm 2002",
    yearLabelEn: "Year 2002",
    company: "MobiFone",
    roleVi: "Nhân viên Vận hành Viễn thông",
    roleEn: "Telecom Operations Specialist",
    color: "#0066FF",
    logo: "https://i.ibb.co/hxHm9TsZ/Mobifone.png",
    icon: Signal,
    arrowDesktop: "right",
    arrowTablet: "right",
    desktopGridClass: "lg:col-start-1 lg:row-start-1",
    tabletGridClass: "md:col-start-1 md:row-start-1",
    descVi: "Tôi bắt đầu sự nghiệp tại **MobiFone**, nơi tôi được đào tạo bài bản về **dịch vụ khách hàng**, quản lý tổng đài, xử lý sự cố và xây dựng quy trình phục vụ theo **tiêu chuẩn ngành viễn thông**. Đây là nền tảng giúp tôi hình thành tư duy **lấy khách hàng làm trung tâm** và hiểu rõ tầm quan trọng của quy trình trong vận hành dịch vụ.",
    descEn: "Started career at **MobiFone**, systematically trained in **customer care**, incident handling, and telecom workflow standardization.",
    highlightVi: "Nền tảng hình thành tư duy lấy khách hàng làm trọng tâm.",
    highlightEn: "Foundation that shaped a customer-centric mindset."
  },
  {
    id: "card-2007",
    yearNumber: "2007",
    yearLabelVi: "Năm 2007",
    yearLabelEn: "Year 2007",
    company: "Viễn Liên V247",
    roleVi: "Giám sát CSKH & Vận hành",
    roleEn: "Customer Service & Operations Supervisor",
    color: "#7c3aed",
    logo: "https://i.ibb.co/QvtbdnfP/V247.png",
    icon: Headset,
    arrowDesktop: "right",
    arrowTablet: "down",
    desktopGridClass: "lg:col-start-2 lg:row-start-1",
    tabletGridClass: "md:col-start-2 md:row-start-1",
    descVi: "Gia nhập **Viễn Liên V247**, tôi tiếp tục phát triển năng lực **quản lý đội ngũ**, giám sát chất lượng dịch vụ và tối ưu hiệu quả vận hành của trung tâm chăm sóc khách hàng Giai đoạn này giúp tôi tích lũy kinh nghiệm quản lý hoạt động với **quy mô lớn** và xây dựng các **chỉ số đánh giá chất lượng** dịch vụ.",
    descEn: "Developed team management, **quality supervision**, and operational efficiency for **large-scale contact centers**.",
    highlightVi: "Xây dựng các chỉ số đánh giá KPI vận hành quy mô lớn.",
    highlightEn: "Building comprehensive KPI evaluation frameworks."
  },
  {
    id: "card-2011",
    yearNumber: "2011",
    yearLabelVi: "Năm 2011",
    yearLabelEn: "Year 2011",
    company: "LBC – HTV",
    roleVi: "Trưởng phòng CSKH",
    roleEn: "Head of Customer Service",
    color: "#16a34a",
    logo: "https://i.ibb.co/R4YXWyzF/LBC.png",
    icon: Tv,
    arrowDesktop: "right",
    arrowTablet: "right",
    desktopGridClass: "lg:col-start-3 lg:row-start-1",
    tabletGridClass: "md:col-start-1 md:row-start-2",
    descVi: "Đây là dấu mốc quan trọng khi tôi lần đầu đảm nhiệm vị trí **Trưởng phòng Chăm sóc Khách hàng**. Từ một nhà quản lý vận hành, tôi chuyển mình trở thành một **nhà quản trị toàn diện**. Tôi trực tiếp điều hành hoạt động của phòng ban, xây dựng và chuẩn hóa quy trình, phát triển đội ngũ, thiết lập **hệ thống KPI**, đồng thời phối hợp với nhiều đơn vị nhằm nâng cao chất lượng dịch vụ và hiệu quả vận hành. Chính giai đoạn này đã giúp tôi hình thành tư duy **quản trị hệ thống** và **phát triển con người** song song với mục tiêu kinh doanh.",
    descEn: "Managed customer service department at **LBC - HTV Cable**, directly leading teams, **standardizing workflows**, and setting **KPIs**.",
    highlightVi: "Tư duy quản trị hệ thống và phát triển con người.",
    highlightEn: "Systems governance and human talent development."
  },
  {
    id: "card-2013",
    yearNumber: "2013",
    yearLabelVi: "Năm 2013",
    yearLabelEn: "Year 2013",
    company: "Garena",
    roleVi: "Trưởng phòng Vận hành CSKH",
    roleEn: "Customer Service Operations Manager",
    color: "#334155",
    logo: "https://i.ibb.co/fYPJLfbw/VED.png",
    icon: Gamepad2,
    arrowDesktop: "down",
    arrowTablet: "down",
    desktopGridClass: "lg:col-start-4 lg:row-start-1",
    tabletGridClass: "md:col-start-2 md:row-start-2",
    descVi: "Gia nhập **Garena**, tôi quản lý hoạt động chăm sóc khách hàng trong lĩnh vực **game trực tuyến** (Liên Minh Huyền Thoại, Liên Quân Mobile, AirPay, Gcafe). Trực tiếp quản lý **129 nhân sự**, xây dựng cơ cấu tổ chức, chuẩn hóa quy trình vận hành và đào tạo nguồn nhân lực kế thừa.",
    descEn: "Joined **Garena**, managing **129 CSKH personnel** for high-speed online gaming (**LoL, AirPay, Gcafe, Arena of Valor**).",
    highlightVi: "Triết lý: Xây dựng hệ thống vững chắc trước khi mở rộng.",
    highlightEn: "Philosophy: Build solid systems before scaling up."
  },
  {
    id: "card-2014",
    yearNumber: "2013",
    yearLabelVi: "Năm 2013",
    yearLabelEn: "Year 2013",
    company: "Shopee",
    roleVi: "Quản lý Vận hành CSKH E-Commerce",
    roleEn: "E-Commerce CSKH Operations Manager",
    color: "#ea580c",
    logo: "https://i.ibb.co/BSVS4xf/Shopee.png",
    icon: ShoppingBag,
    arrowDesktop: "left",
    arrowTablet: "down",
    desktopGridClass: "lg:col-start-4 lg:row-start-2",
    tabletGridClass: "md:col-start-1 md:row-start-3",
    descVi: "Tham gia vào giai đoạn khởi tạo và phát triển ban đầu của **Shopee**, tiếp cận tư duy **quản trị thương mại điện tử hiện đại**, từ hành trình khách hàng, trải nghiệm đa kênh (Omnichannel), vận hành dịch vụ quy mô lớn đến ứng dụng dữ liệu trong quản trị chất lượng và tối ưu hiệu quả hoạt động.",
    descEn: "Participated in early stage of **Shopee**, mastering modern **e-commerce CX governance**, omnichannel customer journeys, and large-scale operations.",
    highlightVi: "Tư duy quản trị thương mại điện tử đa kênh hiện đại.",
    highlightEn: "Modern omnichannel e-commerce management mindset."
  },
  {
    id: "card-2016",
    yearNumber: "2016",
    yearLabelVi: "Năm 2016",
    yearLabelEn: "Year 2016",
    company: "Prudential",
    roleVi: "Trưởng phòng Trải nghiệm Khách hàng",
    roleEn: "Head of Customer Experience",
    color: "#dc2626",
    logo: "https://i.ibb.co/XfpQphWF/Prudential.png",
    icon: ShieldCheck,
    arrowDesktop: "left",
    arrowTablet: "right",
    desktopGridClass: "lg:col-start-4 lg:row-start-2",
    tabletGridClass: "md:col-start-1 md:row-start-3",
    descVi: "Tại **Prudential**, tôi có cơ hội làm việc trong lĩnh vực **bảo hiểm** – một ngành dịch vụ đòi hỏi tính chính xác, minh bạch và mức độ tin cậy rất cao. Thời gian này giúp tôi hiểu sâu hơn về **quản trị trải nghiệm khách hàng (CX)**, quản lý chất lượng dịch vụ và xây dựng niềm tin bền vững thông qua quy trình chuyên nghiệp và sự **đồng cảm** trong từng điểm chạm với khách hàng.",
    descEn: "Managed **CX in life insurance** – requiring high precision, transparency, and reinforcing long-term **brand trust**.",
    highlightVi: "Quản trị trải nghiệm khách hàng (CX) và xây dựng niềm tin.",
    highlightEn: "Customer experience (CX) governance & brand trust."
  },
  {
    id: "card-2018",
    yearNumber: "2018",
    yearLabelVi: "Năm 2018",
    yearLabelEn: "Year 2018",
    company: "MoMo FinTech",
    roleVi: "Trưởng phòng Dịch vụ Khách hàng",
    roleEn: "Customer Service Manager",
    color: "#db2777",
    logo: "https://i.ibb.co/k2QtrgTw/Momo.png",
    icon: Wallet,
    arrowDesktop: "left",
    arrowTablet: "down",
    desktopGridClass: "lg:col-start-3 lg:row-start-2",
    tabletGridClass: "md:col-start-2 md:row-start-3",
    descVi: "Gia nhập **MoMo**, tôi tiếp tục mở rộng kinh nghiệm trong lĩnh vực **tài chính số**. Tôi tập trung **tối ưu quy trình hỗ trợ**, nâng cao hiệu quả vận hành, ứng dụng công nghệ vào quản trị dịch vụ và cải thiện **trải nghiệm khách hàng** trên nền tảng số.",
    descEn: "Broadened **digital finance** expertise at **MoMo**, optimizing support workflows, boosting operational efficiency, and elevating CX.",
    highlightVi: "Tối ưu quy trình vận hành và cải thiện trải nghiệm số.",
    highlightEn: "Optimizing operational workflows and digital experiences."
  },
  {
    id: "card-2023",
    yearNumber: "2023",
    yearLabelVi: "Năm 2023",
    yearLabelEn: "Year 2023",
    company: "Finviet",
    roleVi: "Trưởng phòng Dịch vụ Khách hàng",
    roleEn: "Customer Service Manager",
    color: "#eab308",
    logo: "https://i.ibb.co/7NtSSz4d/Finviet.png",
    icon: CreditCard,
    arrowDesktop: "left",
    arrowTablet: "right",
    desktopGridClass: "lg:col-start-2 lg:row-start-2",
    tabletGridClass: "md:col-start-1 md:row-start-4",
    descVi: "Tại **Finviet**, tôi tiếp tục phát triển chuyên môn trong lĩnh vực **tài chính**, nơi mọi hoạt động đều đặt yêu cầu cao về tính chính xác, minh bạch và sự tin cậy. Giai đoạn này giúp tôi hoàn thiện hơn tư duy xây dựng **hệ thống dịch vụ khách hàng hiện đại**, kết hợp hài hòa giữa **Quy trình - Công nghệ - Trải nghiệm** người dùng.",
    descEn: "Advanced secure **digital finance** specialization, perfecting the harmony between **Process - Technology - Experience**.",
    highlightVi: "Kết hợp hài hòa giữa Quy trình, Công nghệ và Trải nghiệm.",
    highlightEn: "Seamless harmony between Process, Technology, and Experience."
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
    { left: CAREER_MILESTONES_ZICZAC[0], right: CAREER_MILESTONES_ZICZAC[1] }, // 2003 vs 2007
    { left: CAREER_MILESTONES_ZICZAC[2], right: CAREER_MILESTONES_ZICZAC[3] }, // 2011 vs 2013 (Garena)
    { left: CAREER_MILESTONES_ZICZAC[4], right: CAREER_MILESTONES_ZICZAC[5] }, // 2013 (Shopee) vs 2016
    { left: CAREER_MILESTONES_ZICZAC[6], right: CAREER_MILESTONES_ZICZAC[7] }  // 2018 vs 2023
  ];

  // Helper to format bold text split by ** for outstanding and professional highlights
  const renderFormattedText = (text: string) => {
    if (!text) return "";
    const tokens = text.split("**");
    return tokens.map((part, i) => {
      if (i % 2 === 1) {
        return (
          <strong key={i} className="font-extrabold text-slate-900 dark:text-white bg-slate-100/60 dark:bg-slate-800/60 px-1.5 py-0.5 rounded-md mx-0.5 shadow-3xs">
            {part}
          </strong>
        );
      }
      return part;
    });
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
            style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 16px))" }}
            className="w-full bg-gradient-to-r from-cyan-50/75 via-indigo-50/60 to-blue-50/50 dark:from-slate-950 dark:via-slate-900/90 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col md:flex-row items-center gap-6 group z-10"
          >
            {/* Background Abstract Fluid Waves using pure Tailwind and glowing radial circles */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-85 dark:opacity-40">
              {/* Turquoise fluid circle */}
              <div className="absolute -left-10 -bottom-20 w-80 h-80 rounded-full bg-teal-200/35 filter blur-3xl" />
              {/* Blue fluid circle */}
              <div className="absolute left-1/3 -top-20 w-96 h-96 rounded-full bg-cyan-200/30 filter blur-3xl animate-pulse" />
              {/* Soft purple fluid glow */}
              <div className="absolute right-1/4 -bottom-10 w-80 h-80 rounded-full bg-indigo-200/25 filter blur-3xl" />
            </div>

            {/* Left Column: Text and pill buttons */}
            <div className="flex-1 flex flex-col justify-between relative z-10 text-left w-full">
              {/* Header Title with Chat Bubble Icon */}
              <div className="flex items-center gap-3 text-left mb-4">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-2xs shrink-0 flex items-center justify-center">
                  <MessageSquare className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
                  {isVi ? "Thông điệp hợp tác" : "Cooperation message"}
                </h3>
              </div>

              {/* Greeting in vibrant orange italic */}
              <p className="text-[#FF5252] dark:text-[#FF7A00] font-bold text-body-bold italic pl-1 leading-normal mb-3">
                {isVi ? "Kính gửi Quý đối tác, Quý khách hàng và toàn thể cộng sự." : "Dear Valued Partners, Customers, and Colleagues."}
              </p>

              {/* Body Content with highlighted texts */}
              <p className="tracking-normal text-slate-700 dark:text-slate-200 text-body leading-relaxed font-normal mb-6 max-w-xl text-left">
                {isVi ? (
                  <>
                    Tôi là <strong className="font-extrabold text-slate-900 dark:text-white">Nguyễn Hùng Thái</strong>, Trưởng phòng Chăm sóc khách hàng <strong className="font-extrabold text-slate-900 dark:text-white">với hơn 22 năm kinh nghiệm</strong> trong lĩnh vực xây dựng, vận hành và phát triển hệ thống dịch vụ khách hàng chuyên nghiệp.
                  </>
                ) : (
                  <>
                    I am <strong className="font-extrabold text-slate-900 dark:text-white">Nguyen Hung Thai</strong>, Customer Service Manager <strong className="font-extrabold text-slate-900 dark:text-white">with over 22 years of experience</strong> in building, operating, and advancing professional customer care systems.
                  </>
                )}
              </p>


            </div>

            {/* Right Column: Glowing Sun, Robot, Cursive handwriting, speech bubble and plant leaves */}
            <div className="relative flex items-center justify-center min-h-[220px] md:w-[45%] shrink-0 overflow-visible w-full select-none">
              
              {/* Glowing golden-yellow sun circle */}
              <div className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-amber-100/35 dark:bg-amber-950/20 border border-amber-200/40 dark:border-amber-900/20 filter blur-[2px] z-0" />

              {/* Handwritten cursive text "Better Customer Happier Tomorrow" in glowing gradient style */}
              <div className="absolute right-0 top-[22%] z-10 w-44 select-none pointer-events-none transform rotate-12">
                <svg viewBox="0 0 160 80" className="w-full h-auto text-indigo-500/80 dark:text-indigo-400/80 opacity-95">
                  {/* Cursive cursive styles */}
                  <path d="M 12 25 C 25 15, 45 10, 55 22 C 60 28, 55 35, 40 30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
                  <path d="M 32 45 C 45 35, 65 30, 75 42 C 80 48, 75 55, 60 50" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
                  <text x="15" y="24" fill="currentColor" fontSize="15" fontWeight="600" fontFamily="Play, 'Caveat', 'Dancing Script', cursive, sans-serif" className="italic tracking-wide">Better</text>
                  <text x="28" y="41" fill="currentColor" fontSize="15" fontWeight="600" fontFamily="Play, 'Caveat', 'Dancing Script', cursive, sans-serif" className="italic tracking-wide">Customer</text>
                  <text x="42" y="58" fill="currentColor" fontSize="15" fontWeight="600" fontFamily="Play, 'Caveat', 'Dancing Script', cursive, sans-serif" className="italic tracking-wide">Happier</text>
                  <text x="56" y="74" fill="currentColor" fontSize="12" fontWeight="500" fontFamily="Play, 'Caveat', 'Dancing Script', cursive, sans-serif" className="italic tracking-wide">Tomorrow</text>
                </svg>
              </div>

              {/* Waving AI Robot Illustration */}
              <div className="relative z-10 w-40 sm:w-44 h-40 sm:h-44 flex items-center justify-center transform hover:scale-105 transition-transform duration-300 overflow-visible mt-2">
                
                {/* Floating green plant leaves surrounding the robot */}
                <div className="absolute right-[-15px] bottom-[-20px] w-24 h-24 text-emerald-500/40 dark:text-emerald-500/20 pointer-events-none select-none z-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                    <path d="M 80 100 C 60 60, 40 50, 0 50 C 20 70, 40 80, 80 100" />
                    <path d="M 50 100 C 30 75, 20 65, 0 80 C 15 90, 30 95, 50 100" />
                  </svg>
                </div>

                {/* Main Waving Robot Component using custom React SVG */}
                <svg viewBox="0 0 100 100" className="w-32 sm:w-36 h-32 sm:h-36 drop-shadow-xl z-10 overflow-visible">
                  <defs>
                    <linearGradient id="robotBodyGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#E2E8F0" />
                    </linearGradient>
                    <linearGradient id="robotScreenGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#0F172A" />
                      <stop offset="100%" stopColor="#1E293B" />
                    </linearGradient>
                    <linearGradient id="robotBlueGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="100%" stopColor="#0284C7" />
                    </linearGradient>
                    <filter id="robotShadow" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.15" />
                    </filter>
                  </defs>

                  {/* Body Torso */}
                  <rect x="35" y="48" width="30" height="28" rx="14" fill="url(#robotBodyGrad)" filter="url(#robotShadow)" />
                  <circle cx="50" cy="62" r="6" fill="#F8FAFC" stroke="#38BDF8" strokeWidth="1.5" />
                  <circle cx="50" cy="62" r="3" fill="#38BDF8" />

                  {/* Left Arm (Waving) */}
                  <g className="origin-[35px_54px]">
                    <path 
                      d="M 35 54 C 28 50, 20 40, 24 34 C 28 28, 33 34, 35 40" 
                      fill="none" 
                      stroke="url(#robotBodyGrad)" 
                      strokeWidth="6" 
                      strokeLinecap="round" 
                    />
                    <circle cx="24" cy="34" r="4.5" fill="#38BDF8" />
                  </g>

                  {/* Right Arm (Resting) */}
                  <path 
                    d="M 65 54 C 70 58, 72 65, 71 70" 
                    fill="none" 
                    stroke="url(#robotBodyGrad)" 
                    strokeWidth="6" 
                    strokeLinecap="round" 
                  />
                  <circle cx="71" cy="70" r="4" fill="#64748B" />

                  {/* Head Neck */}
                  <rect x="46" y="42" width="8" height="8" rx="2" fill="#CBD5E1" />

                  {/* Head */}
                  <rect x="25" y="18" width="50" height="28" rx="14" fill="url(#robotBodyGrad)" filter="url(#robotShadow)" />
                  {/* Ear details */}
                  <rect x="21" y="26" width="4" height="12" rx="2" fill="#38BDF8" />
                  <rect x="75" y="26" width="4" height="12" rx="2" fill="#38BDF8" />

                  {/* Blue Face Screen */}
                  <rect x="30" y="22" width="40" height="20" rx="10" fill="url(#robotScreenGrad)" />
                  {/* Glowing Smiling Eyes */}
                  <path d="M 37 32 Q 41 28 45 32" fill="none" stroke="url(#robotBlueGlow)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 55 32 Q 59 28 63 32" fill="none" stroke="url(#robotBlueGlow)" strokeWidth="3" strokeLinecap="round" />
                  {/* Smiling Mouth */}
                  <path d="M 47 38 Q 50 40 53 38" fill="none" stroke="url(#robotBlueGlow)" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Speech Bubble Floating to the Left of the Robot */}
              <motion.div 
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-[-5px] sm:left-[-15px] top-[15%] z-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white rounded-2xl p-3 shadow-md max-w-[130px] sm:max-w-[145px] border border-blue-400/30 text-left"
              >
                <p className="text-[10px] sm:text-[11px] font-bold leading-tight flex flex-col gap-0.5 whitespace-nowrap">
                  <span>{isVi ? "● Kết nối" : "● Connect"}</span>
                  <span>{isVi ? "● Kiến tạo giá trị" : "● Create Value"}</span>
                  <span>{isVi ? "● Cùng phát triển" : "● Grow Together"}</span>
                </p>
                {/* Speech Bubble Tail pointing to the robot */}
                <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-l-[6px] border-l-indigo-600" />
              </motion.div>
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
        {/* ROW 2: TIMELINE ZICZAC (HÀNH TRÌNH SỰ NGHIỆP VỚI TIMELINE ĐỨT KHÚC) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, ease: "easeOut" }} 
          id="card-career-milestones"
          style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 10px))", padding: "15px" }}
          className="w-full glass-surface backdrop-blur-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col relative overflow-hidden bg-white/20 dark:bg-slate-900/20 z-10"
        >
          <div className="relative z-10 w-full">
            {/* Title Header formatted exactly like Thông điệp hợp tác */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-indigo-200/60 dark:border-indigo-800/60 mb-3">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <Rocket className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <h3 className="text-card-title font-bold text-indigo-600 dark:text-indigo-400 tracking-wide">
                  {isVi ? "Hành trình sự nghiệp" : "Career journey milestones"}
                </h3>
              </div>
            </div>

            {/* Grid Timeline Container */}
            <div className="relative w-full py-6 px-1 md:px-6" ref={gridContainerRef}>
              
              {/* Colorful Central Vertical Timeline Line (Visible on Desktop only) */}
              <div className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[3px] bg-gradient-to-b from-blue-500 via-indigo-500 via-purple-500 via-pink-500 via-rose-500 to-amber-500 rounded-full hidden md:block z-0 opacity-70" />

              {/* Rows of Symmetrical Pairs */}
              <div className="flex flex-col gap-[15px] relative z-10 w-full">
                {careerPairs.map((pair, pIdx) => {
                  const leftItem = pair.left;
                  const rightItem = pair.right;
                  const LeftIcon = leftItem.icon;
                  const RightIcon = rightItem.icon;

                  return (
                    <div key={pIdx} className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-[15px] md:gap-x-[40px] items-stretch">
                      
                      {/* LEFT CARD */}
                      <div
                        style={{
                          borderRadius: "var(--theme-radius-inner, var(--theme-radius-md, 12px))",
                          borderColor: `${leftItem.color}60`,
                          backgroundColor: `${leftItem.color}0D`,
                          boxShadow: `0 4px 20px -2px ${leftItem.color}15, 0 2px 8px -2px rgba(0, 0, 0, 0.04)`
                        }}
                        className="flex flex-col justify-between p-5 relative transition-all duration-300 backdrop-blur-md shadow-2xs hover:shadow-lg hover:-translate-y-1.5 overflow-hidden group/mcard border min-h-[220px] w-full"
                      >
                        {/* Subtle Brand Color Radial Tint Layer */}
                        <div 
                          className="absolute inset-0 opacity-4 dark:opacity-[0.06] pointer-events-none mix-blend-multiply dark:mix-blend-color-dodge"
                          style={{ 
                            background: `radial-gradient(circle at bottom right, ${leftItem.color}, transparent 65%)` 
                          }}
                        />

                        {/* Header: Company Name & Logo on Left, Year Tag on Right (facing center axis) */}
                        <div className="w-full flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-dashed border-slate-200/80 dark:border-slate-800/80 relative z-10 shrink-0 flex-nowrap">
                          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1 text-left">
                            <div 
                              className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center border bg-white dark:bg-slate-950 p-0 overflow-hidden shadow-2xs shrink-0 transition-transform duration-300 group-hover/mcard:scale-110"
                              style={{ borderColor: leftItem.color }}
                            >
                              <img src={leftItem.logo} alt={leftItem.company} className="w-full h-full object-cover scale-110 rounded-full" referrerPolicy="no-referrer" />
                            </div>
                            <h4 
                              className="text-card-title font-bold tracking-tight leading-snug truncate whitespace-nowrap min-w-0"
                              style={{ color: leftItem.color }}
                            >
                              {leftItem.company}
                            </h4>
                          </div>

                          {/* Year Tag on Left card is positioned to the right (closest to center timeline) */}
                          <span 
                            className="px-2.5 py-0.5 rounded-full text-white text-caption font-semibold shadow-2xs tracking-wide uppercase shrink-0 whitespace-nowrap ml-auto"
                            style={{ backgroundColor: leftItem.color }}
                          >
                            {isVi ? leftItem.yearLabelVi : leftItem.yearLabelEn}
                          </span>
                        </div>

                        {/* Position / Role */}
                        <div className="flex items-center gap-2 mb-2 relative z-10 shrink-0 text-left">
                          <div 
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-caption font-bold shrink-0 rounded-lg bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs relative transition-all duration-300 group-hover/mcard:scale-110"
                            style={{ color: leftItem.color }}
                          >
                            {leftItem.yearNumber === "2026" ? (
                              <Compass className="w-4 h-4 animate-spin-slow text-rose-500" />
                            ) : (
                              <LeftIcon className="w-4 h-4" />
                            )}
                          </div>
                          <div className="text-body-sm font-semibold tracking-wide line-clamp-1" style={{ color: leftItem.color }}>
                            {isVi ? `Vị trí: ${leftItem.roleVi}` : `Position: ${leftItem.roleEn}`}
                          </div>
                        </div>

                        {/* Content text */}
                        <div className="card-body text-slate-700 dark:text-slate-300 flex-1 flex flex-col justify-between text-left relative z-10">
                          <div className="relative overflow-hidden transition-all duration-300 mb-3">
                            <p className="text-body text-slate-800 dark:text-slate-100 text-left">
                              {renderFormattedText(isVi ? leftItem.descVi : leftItem.descEn)}
                            </p>
                          </div>
                          <div 
                            className="highlight-box p-2.5 rounded-lg border-l-4 text-body font-normal leading-relaxed bg-slate-100/90 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 text-left mt-auto border border-slate-200/60 dark:border-slate-700/60 shadow-2xs"
                            style={{ 
                              borderLeftColor: leftItem.color,
                              borderRadius: "var(--theme-radius-inner, var(--theme-radius-md, 8px))"
                            }}
                          >
                            {isVi ? leftItem.highlightVi : leftItem.highlightEn}
                          </div>
                        </div>
                      </div>

                      {/* RIGHT CARD */}
                      <div
                        style={{
                          borderRadius: "var(--theme-radius-inner, var(--theme-radius-md, 12px))",
                          borderColor: `${rightItem.color}60`,
                          backgroundColor: `${rightItem.color}0D`,
                          boxShadow: `0 4px 20px -2px ${rightItem.color}15, 0 2px 8px -2px rgba(0, 0, 0, 0.04)`
                        }}
                        className="flex flex-col justify-between p-5 relative transition-all duration-300 backdrop-blur-md shadow-2xs hover:shadow-lg hover:-translate-y-1.5 overflow-hidden group/mcard border min-h-[220px] w-full"
                      >
                        {/* Subtle Brand Color Radial Tint Layer */}
                        <div 
                          className="absolute inset-0 opacity-4 dark:opacity-[0.06] pointer-events-none mix-blend-multiply dark:mix-blend-color-dodge"
                          style={{ 
                            background: `radial-gradient(circle at bottom right, ${rightItem.color}, transparent 65%)` 
                          }}
                        />

                        {/* Header: Year Tag on Left (facing center axis), Company Name & Logo on Right */}
                        <div className="w-full flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-dashed border-slate-200/80 dark:border-slate-800/80 relative z-10 shrink-0 flex-nowrap">
                          {/* Year Tag on Right card is positioned to the left (closest to center timeline) */}
                          <span 
                            className="px-2.5 py-0.5 rounded-full text-white text-caption font-semibold shadow-2xs tracking-wide uppercase shrink-0 whitespace-nowrap mr-auto"
                            style={{ backgroundColor: rightItem.color }}
                          >
                            {isVi ? rightItem.yearLabelVi : rightItem.yearLabelEn}
                          </span>

                          <div className="flex items-center justify-end gap-2 sm:gap-2.5 min-w-0 flex-1 ml-auto text-right">
                            <h4 
                              className="text-card-title font-bold tracking-tight leading-snug truncate whitespace-nowrap min-w-0"
                              style={{ color: rightItem.color }}
                            >
                              {rightItem.company}
                            </h4>
                            <div 
                              className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center border bg-white dark:bg-slate-950 p-0 overflow-hidden shadow-2xs shrink-0 transition-transform duration-300 group-hover/mcard:scale-110"
                              style={{ borderColor: rightItem.color }}
                            >
                              <img src={rightItem.logo} alt={rightItem.company} className="w-full h-full object-cover scale-110 rounded-full" referrerPolicy="no-referrer" />
                            </div>
                          </div>
                        </div>

                        {/* Position / Role */}
                        <div className="flex items-center gap-2 mb-2 relative z-10 shrink-0 text-left">
                          <div 
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-caption font-bold shrink-0 rounded-lg bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs relative transition-all duration-300 group-hover/mcard:scale-110"
                            style={{ color: rightItem.color }}
                          >
                            <RightIcon className="w-4 h-4" />
                          </div>
                          <div className="text-body-sm font-semibold tracking-wide line-clamp-1" style={{ color: rightItem.color }}>
                            {isVi ? `Vị trí: ${rightItem.roleVi}` : `Position: ${rightItem.roleEn}`}
                          </div>
                        </div>

                        {/* Content text */}
                        <div className="card-body text-slate-700 dark:text-slate-300 flex-1 flex flex-col justify-between text-left relative z-10">
                          <div className={cn("relative overflow-hidden transition-all duration-300 mb-3", 
                            rightItem.id === "card-2013" && !expandedCard[rightItem.id] && "max-h-[220px] line-clamp-[7]"
                          )}>
                            <p className="text-body text-slate-800 dark:text-slate-100 text-left">
                              {renderFormattedText(isVi ? rightItem.descVi : rightItem.descEn)}
                            </p>
                            {rightItem.id === "card-2013" && !expandedCard[rightItem.id] && (
                              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/95 dark:from-slate-900/95 to-transparent pointer-events-none" />
                            )}
                          </div>

                          {rightItem.id === "card-2013" && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                try { playUiSound("click"); } catch {}
                                setExpandedCard(prev => ({ ...prev, [rightItem.id]: !prev[rightItem.id] }));
                              }}
                              className="text-2xs font-bold text-indigo-600 dark:text-cyan-400 hover:underline mb-3 self-start cursor-pointer inline-flex items-center gap-1"
                            >
                              {expandedCard[rightItem.id] ? (
                                <>
                                  <ChevronUp className="w-3.5 h-3.5" />
                                  {isVi ? "Thu gọn" : "Show less"}
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-3.5 h-3.5" />
                                  {isVi ? "Xem thêm" : "Read more"}
                                </>
                              )}
                            </button>
                          )}

                          <div 
                            className="highlight-box p-2.5 rounded-lg border-l-4 text-body font-normal leading-relaxed bg-slate-100/90 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 text-left mt-auto border border-slate-200/60 dark:border-slate-700/60 shadow-2xs"
                            style={{ 
                              borderLeftColor: rightItem.color,
                              borderRadius: "var(--theme-radius-inner, var(--theme-radius-md, 8px))"
                            }}
                          >
                            {isVi ? rightItem.highlightVi : rightItem.highlightEn}
                          </div>
                        </div>
                      </div>

                      {/* CONNECTIONS (Visible on Desktop only) */}
                      {/* Left horizontal line connecting from card edge to timeline */}
                      <div 
                        className="absolute right-1/2 w-10 lg:w-12 h-[2px] top-[40px] hidden md:block z-0 pointer-events-none"
                        style={{ 
                          background: `linear-gradient(to right, transparent, ${leftItem.color})`,
                          marginRight: "10px"
                        }}
                      />
                      {/* Right horizontal line connecting from card edge to timeline */}
                      <div 
                        className="absolute left-1/2 w-10 lg:w-12 h-[2px] top-[40px] hidden md:block z-0 pointer-events-none"
                        style={{ 
                          background: `linear-gradient(to left, transparent, ${rightItem.color})`,
                          marginLeft: "10px"
                        }}
                      />
                      {/* Interactive glowing central dot on the vertical timeline axis */}
                      <div 
                        className="absolute left-1/2 -translate-x-1/2 top-[30px] w-5.5 h-5.5 rounded-full border-4 border-white dark:border-slate-900 shadow-md hidden md:flex items-center justify-center z-20 transition-all duration-300 hover:scale-125"
                        style={{ 
                          backgroundColor: leftItem.color,
                          borderColor: rightItem.color,
                          boxShadow: `0 0 14px ${leftItem.color}80`
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 3: 2-COLUMN BENTO GRID (TECH SOLUTIONS & COOPERATION MESSAGE) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, ease: "easeOut" }} 
          className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full relative z-10"
        >
          {/* CARD 1: GIẢI PHÁP CÔNG NGHỆ */}
          <div 
            id="card-tech-solutions"
            style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 10px))" }}
            className="glass-surface backdrop-blur-2xl border border-blue-100 dark:border-blue-900/40 p-6 sm:p-7 shadow-lg shadow-blue-500/5 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700/60 transition-all duration-300 flex flex-col justify-between group/tech bg-gradient-to-br from-white/95 to-blue-50/90 dark:from-slate-900/95 dark:to-blue-900/90 relative overflow-hidden"
          >
            {/* Background Image (User will upload to /assets/bg-tech.png) */}
            <div className="absolute inset-0 z-0 bg-cover bg-right-top bg-no-repeat opacity-40 dark:opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-lighten" style={{ backgroundImage: "url('/assets/bg-tech.png')" }} />
            
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none z-0" />
            
            <div className="relative z-10 flex flex-col h-full">
              {/* Header */}
              <div className="w-full flex items-start justify-between mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 text-white shrink-0">
                    <Atom className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-400">
                      {isVi ? "Giải pháp công nghệ" : "Technology Solutions"}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] text-blue-500/70 dark:text-blue-400/70 uppercase mt-0.5">
                      TECHNOLOGY SOLUTIONS
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block absolute right-2 top-2 opacity-80 rotate-[-12deg]">
                   <span className="text-blue-600 dark:text-blue-400 font-handwriting text-lg leading-tight block text-center opacity-80">
                      Smart<br/>Customer<br/>Journey
                   </span>
                   <svg className="w-6 h-6 text-blue-500 absolute -bottom-4 right-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </div>
              </div>

              {/* Tags below header */}
              <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 mb-5">
                 <span>Công nghệ tạo trải nghiệm</span>
                 <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                 <span>Dữ liệu tạo giá trị</span>
                 <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                 <span>Con người tạo khác biệt</span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-700 dark:text-slate-200 text-left mb-6 leading-relaxed max-w-[85%] md:max-w-full lg:max-w-[85%]">
                Tối ưu hóa quy trình toàn diện từ đầu đến cuối, kết hợp <strong className="font-extrabold text-blue-700 dark:text-blue-400">Trí tuệ nhân tạo (AI)</strong> và hệ sinh thái <strong className="font-extrabold text-blue-700 dark:text-blue-400">CRM Omni-Channel 360°</strong> nhằm mang lại trải nghiệm khách hàng vượt trội, tự động hóa và nâng cao hiệu suất chăm sóc khách hàng bền vững.
              </p>

              {/* Tech Solution Pillars Feature Cards */}
              <div className="grid grid-cols-1 gap-3 sm:gap-4 w-full flex-1">
                {/* Item 1 */}
                <div className="w-full p-3.5 sm:p-4 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-blue-100/80 dark:border-blue-800/40 flex items-center gap-4 hover:border-blue-300 dark:hover:border-blue-600 transition-all shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-sky-500 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">CRM Omni 360°</h5>
                    <p className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400 leading-tight mt-0.5 mb-2">
                      Hợp nhất kênh tương tác Đa kênh
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-blue-100/70 dark:bg-blue-900/50 text-[9px] font-bold text-blue-600 dark:text-blue-400 tracking-wider">ĐA KÊNH</span>
                      <span className="px-2 py-0.5 rounded-md bg-blue-100/70 dark:bg-blue-900/50 text-[9px] font-bold text-blue-600 dark:text-blue-400 tracking-wider">KHÁCH HÀNG 360°</span>
                      <span className="px-2 py-0.5 rounded-md bg-blue-100/70 dark:bg-blue-900/50 text-[9px] font-bold text-blue-600 dark:text-blue-400 tracking-wider">TỐI ƯU QUY TRÌNH</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Item 2 */}
                <div className="w-full p-3.5 sm:p-4 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-purple-100/80 dark:border-purple-800/40 flex items-center gap-4 hover:border-purple-300 dark:hover:border-purple-600 transition-all shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 text-white flex items-center justify-center shrink-0 shadow-md">
                    <BarChart2 className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">Dashboard BI</h5>
                    <p className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400 leading-tight mt-0.5 mb-2">
                      Báo cáo phân tích dữ liệu theo thời gian thực
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-purple-100/70 dark:bg-purple-900/50 text-[9px] font-bold text-purple-600 dark:text-purple-400 tracking-wider">DỮ LIỆU THỜI GIAN THỰC</span>
                      <span className="px-2 py-0.5 rounded-md bg-purple-100/70 dark:bg-purple-900/50 text-[9px] font-bold text-purple-600 dark:text-purple-400 tracking-wider">TRỰC QUAN</span>
                      <span className="px-2 py-0.5 rounded-md bg-purple-100/70 dark:bg-purple-900/50 text-[9px] font-bold text-purple-600 dark:text-purple-400 tracking-wider">RA QUYẾT ĐỊNH</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-500 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Item 3 */}
                <div className="w-full p-3.5 sm:p-4 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-rose-100/80 dark:border-rose-800/40 flex items-center gap-4 hover:border-rose-300 dark:hover:border-rose-600 transition-all shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">AI Chatbot</h5>
                    <p className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400 leading-tight mt-0.5 mb-2">
                      Tự động hóa phản hồi & chăm sóc 24/7
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-rose-100/70 dark:bg-rose-900/50 text-[9px] font-bold text-rose-600 dark:text-rose-400 tracking-wider">TỰ ĐỘNG HÓA</span>
                      <span className="px-2 py-0.5 rounded-md bg-rose-100/70 dark:bg-rose-900/50 text-[9px] font-bold text-rose-600 dark:text-rose-400 tracking-wider">HỖ TRỢ 24/7</span>
                      <span className="px-2 py-0.5 rounded-md bg-rose-100/70 dark:bg-rose-900/50 text-[9px] font-bold text-rose-600 dark:text-rose-400 tracking-wider">TRẢI NGHIỆM VƯỢT TRỘI</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-500 dark:text-rose-400 flex items-center justify-center shrink-0">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Bottom footer text */}
              <div className="mt-6 pt-4 border-t border-blue-100/50 dark:border-blue-800/30 flex items-center justify-center gap-3 text-[10px] sm:text-[11px] font-bold tracking-widest text-blue-500/70 dark:text-blue-400/70 uppercase">
                <span>INNOVATION</span>
                <span className="w-1 h-1 rounded-full bg-blue-300 dark:bg-blue-600"></span>
                <span>AUTOMATION</span>
                <span className="w-1 h-1 rounded-full bg-blue-300 dark:bg-blue-600"></span>
                <span>CUSTOMER EXPERIENCE</span>
              </div>
            </div>
          </div>

          {/* CARD 2: TÂM THƯ TRI ÂN */}
          <div 
            id="card-gratitude-statement"
            style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 10px))" }}
            className="glass-surface backdrop-blur-2xl border border-emerald-100 dark:border-emerald-900/40 p-6 sm:p-7 shadow-lg shadow-emerald-500/5 hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-700/60 transition-all duration-300 flex flex-col justify-between group/gratitude bg-gradient-to-br from-white/95 to-emerald-50/90 dark:from-slate-900/95 dark:to-emerald-900/90 relative overflow-hidden"
          >
            {/* Background Image (User will upload to /assets/bg-gratitude.png) */}
            <div className="absolute inset-0 z-0 bg-cover bg-right-bottom bg-no-repeat opacity-40 dark:opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-lighten" style={{ backgroundImage: "url('/assets/bg-gratitude.png')" }} />

            <div className="absolute top-0 left-0 -ml-16 -mt-16 w-48 h-48 bg-emerald-400/10 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none z-0" />

            <div className="relative z-10 flex flex-col h-full">
              {/* Header */}
              <div className="w-full flex items-start justify-between mb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 text-white shrink-0">
                    <Heart className="w-7 h-7" fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                      {isVi ? "Tâm thư tri ân" : "Sincere Appreciation"}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] text-emerald-500/70 dark:text-emerald-400/70 uppercase mt-0.5">
                      SINCERE APPRECIATION
                    </p>
                  </div>
                </div>

                <div className="text-right flex flex-col gap-0.5 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-slate-400 dark:text-slate-500 uppercase">
                   <span>PEOPLE</span>
                   <span>CREATE</span>
                   <span>VALUE</span>
                   <div className="w-full h-px bg-slate-300 dark:bg-slate-700 mt-1" />
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-700 dark:text-slate-200 text-left mb-6 leading-relaxed">
                Tôi mong muốn được đồng hành cùng Quý Doanh nghiệp để kiến tạo giá trị, lan tỏa sự hài lòng và cùng nhau phát triển bền vững. Với kinh nghiệm, nhiệt huyết và tinh thần thấu hiểu sâu sắc, tôi tin tưởng vào những thành công tốt đẹp sắp tới.
              </p>

              {/* Layout for Quote and Mountain */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Quote Box */}
                <div className="flex-1 sm:w-1/2 bg-blue-50/70 dark:bg-blue-900/30 backdrop-blur-sm p-5 rounded-2xl border border-blue-100 dark:border-blue-800/40 relative flex flex-col justify-center shadow-sm">
                  <Quote className="absolute top-3 left-3 w-6 h-6 text-indigo-400/40 dark:text-indigo-400/20 rotate-180" />
                  <Quote className="absolute bottom-16 right-3 w-6 h-6 text-indigo-400/40 dark:text-indigo-400/20" />
                  
                  <div className="text-center space-y-1.5 relative z-10 py-3">
                     <p className="text-[15px] sm:text-base font-bold text-indigo-700 dark:text-indigo-400 italic">Cùng kết nối</p>
                     <p className="text-[15px] sm:text-base font-bold text-indigo-700 dark:text-indigo-400 italic">Cùng kiến tạo</p>
                     <p className="text-[15px] sm:text-base font-bold text-indigo-700 dark:text-indigo-400 italic">Cùng thành công</p>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-indigo-200/50 dark:border-indigo-800/50 text-center">
                     <p className="text-[9px] font-bold tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase leading-tight mb-1">
                        BETTER CUSTOMERS
                     </p>
                     <p className="text-[9px] font-bold tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase leading-tight">
                        BRIGHTER TOMORROW
                     </p>
                  </div>
                </div>

                {/* Decorative Mountain area (Will combine with user's background image) */}
                <div className="flex-1 sm:w-1/2 rounded-2xl bg-gradient-to-t from-blue-100/60 to-transparent dark:from-blue-900/20 border border-blue-50/50 dark:border-blue-800/30 flex items-end justify-center relative overflow-hidden min-h-[160px] shadow-sm backdrop-blur-[2px]">
                  <span className="absolute top-4 right-4 text-blue-700 dark:text-blue-400 font-handwriting text-[15px] leading-tight rotate-[-12deg] z-20 text-right opacity-90 drop-shadow-sm">Hành trình<br/>vẫn tiếp tục...</span>
                  
                  {/* Decorative Elements for mountain (kept subtle in case image is missing) */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-blue-200/40 to-transparent dark:from-blue-800/20 z-10 pointer-events-none" />
                  <MountainSnow className="w-28 h-28 text-blue-400/30 dark:text-blue-600/20 absolute -bottom-3 z-0 pointer-events-none" strokeWidth={1.5} />
                  
                  {/* Sun */}
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-14 h-14 bg-yellow-200/50 dark:bg-yellow-500/10 rounded-full blur-xl z-0 pointer-events-none" />
                </div>
              </div>

              {/* Bottom Footer Section */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Signature Block */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left shrink-0">
                  <div className="-ml-2 mb-1">
                    <SignatureSvg />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Nguyễn Hùng Thái
                  </h4>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                    Trưởng phòng Chăm sóc Khách hàng
                  </span>
                </div>

                {/* Right Tags */}
                <div className="flex flex-col gap-1 text-[9px] font-bold tracking-[0.15em] text-blue-600/70 dark:text-blue-400/70 text-right uppercase">
                  <span>TRẢI NGHIỆM</span>
                  <span>KẾT NỐI</span>
                  <span>PHÁT TRIỂN</span>
                  <span>BỀN VỮNG</span>
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
          className="w-full glass-surface backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-7 shadow-md hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all duration-300 flex flex-col items-start w-full group/values z-10"
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
          {/* Lớp viền neon quang học phát sáng ngoài (Neon Glow Aura) */}
          <div 
            style={{ borderRadius: "var(--theme-radius-card, 12px)" }}
            className="absolute -inset-1 bg-gradient-to-r from-blue-500/35 via-cyan-500/35 to-purple-500/35 blur-xl opacity-75 group-hover/banner:opacity-100 transition-opacity duration-700 pointer-events-none" 
          />

          {/* Khối Banner Kính Mờ Glass UI Neon từ hình đính kèm */}
          <div 
            style={{ borderRadius: "var(--theme-radius-card, 12px)" }}
            className="relative z-10 w-full bg-gradient-to-r from-blue-600 via-sky-500 via-indigo-500 to-purple-600 text-white p-5 sm:p-7 md:p-8 border border-white/20 shadow-[0_16px_48px_rgba(0,0,0,0.3),0_0_30px_rgba(0,102,255,0.15),inset_0_1.5px_2px_rgba(255,255,255,0.25)] backdrop-blur-3xl flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 overflow-hidden text-left"
          >
            
            {/* Ambient Radial Lighting Blobs */}
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-cyan-400/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-fuchsia-500/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-44 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />

            {/* Subtle Top Specular Light Line */}
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            {/* Left Column: Glowing Circular Quote Badge */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 border border-white/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.25)] backdrop-blur-md relative z-10 transition-transform duration-300 group-hover/banner:scale-110">
              <Quote className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            </div>

            {/* Middle Column: Quotes text formatted exactly like image.png */}
            <div className="flex-1 min-w-0 relative z-10 text-center md:text-left">
              <p className="text-white text-sm sm:text-base md:text-[17px] font-medium leading-relaxed tracking-wide font-sans select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
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

            {/* Horizontally aligned three dots at bottom right as decorator from image.png */}
            <div className="absolute bottom-4 right-5 flex items-center gap-1 opacity-55 hidden md:flex">
              <span className="w-1.5 h-1.5 rounded-full bg-white/85 shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/85 shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/85 shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
