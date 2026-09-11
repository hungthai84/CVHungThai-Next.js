import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Server,
  Globe,
  Cpu,
  Sun,
  Moon,
  Search,
  X,
  Sparkles,
  Play,
  Minimize2,
  Pause,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowUpRight,
  Info,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Code,
  FileCode,
  Phone,
  Users,
  Briefcase,
  User,
  ClipboardList,
  Trophy,
  Heart,
  BookOpen,
  BarChart3,
  Bot,
  Package,
  GripVertical,
  RotateCcw,
  SlidersHorizontal,
  Check,
  Move,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { PageLayout } from "./PageLayout";
import { PageBanner } from "./PageBanner";
import { useLanguage } from "../i18n";
import { cn } from "../lib/utils";

// Lazy load SVG moving pattern generator for performance code-splitting
const CardSystemMovingPattern = lazy(() => import("./SystemsMovingPatterns").then(m => ({ default: m.CardSystemMovingPattern })));

export interface SystemItem {
  key: string;
  name: string;
  nameEn: string;
  shortDesc: string;
  shortDescEn: string;
  pillTag: string;
  pillTagEn: string;
  pillColor: string;
  desc: string;
  features: string[];
  link: string;
  icon: string;
  color: string;
  gradient: string;
  borderGlow: string;
  category: "platform" | "enterprise" | "growth";
}

export type Language = "vi" | "en";

const systemsData: SystemItem[] = [
  {
    key: "SDP",
    name: "Trang làm việc chính",
    nameEn: "Main Workspace (SDP)",
    shortDesc: "Trang làm việc chính của hệ thống",
    shortDescEn: "Main Workspace Portal",
    pillTag: "Trang làm việc chính",
    pillTagEn: "Main Workspace",
    pillColor: "#f43f5e",
    desc: "Trang làm việc chính của cán bộ nhân viên, đóng vai trò là cổng truy cập tập trung (Portal) để nhân viên điều hướng và sử dụng toàn bộ các hệ thống nghiệp vụ.",
    features: [
      "Cổng thông tin tập trung cho nhân viên",
      "Tích hợp điều hướng linh hoạt liên hệ thống",
      "Tối ưu hóa thời gian thao tác và tra cứu dữ liệu",
      "Quản lý phân quyền truy cập người dùng"
    ],
    link: "https://www.sdpplatfrom.powerservice.one",
    icon: "headset",
    color: "#2563eb",
    gradient: "from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]",
    borderGlow: "rgba(59, 130, 246, 0.4)",
    category: "platform",
  },
  {
    key: "ERP",
    name: "Tài chính, Kế toán & Nguồn lực",
    nameEn: "Enterprise Resource Planning",
    shortDesc: "Tài chính, Kế toán & Nguồn lực",
    shortDescEn: "Finance, Accounting & Resources",
    pillTag: "Kho, Mua hàng & Tài sản",
    pillTagEn: "Inventory, Purchasing & Assets",
    pillColor: "#10b981",
    desc: "Quản lý nguồn lực và hoạt động nội bộ của doanh nghiệp như tài chính, kế toán, mua hàng, kho, sản xuất, tài sản và các hoạt động vận hành.",
    features: [
      "Quản lý tài chính, kế toán tổng hợp & báo cáo thuế",
      "Quản lý mua hàng, tồn kho & tài sản cố định",
      "Theo dõi luồng tiền và chi phí hoạt động",
      "Số hóa chứng từ và phê duyệt ngân sách"
    ],
    link: "https://www.erpplatfrom.powerservice.one",
    icon: "chart",
    color: "#059669",
    gradient: "from-[#10b981] via-[#059669] to-[#047857]",
    borderGlow: "rgba(16, 185, 129, 0.4)",
    category: "enterprise",
  },
  {
    key: "CRM",
    name: "Quan hệ Khách hàng Toàn diện",
    nameEn: "Customer Relationship Management",
    shortDesc: "Quan hệ Khách hàng Toàn diện",
    shortDescEn: "Comprehensive Customer Relationship",
    pillTag: "Bán hàng & Marketing",
    pillTagEn: "Sales & Marketing",
    pillColor: "#0ea5e9",
    desc: "Quản lý khách hàng, bán hàng, marketing, chăm sóc khách hàng và toàn bộ hành trình trải nghiệm khách hàng.",
    features: [
      "Quản lý hồ sơ 360 độ khách hàng",
      "Theo dõi cơ hội bán hàng & Lead funnel",
      "Tự động hóa chiến dịch Marketing & Re-marketing",
      "Báo cáo tỷ lệ chuyển đổi khách hàng"
    ],
    link: "https://www.crmplatfrom.powerservice.one",
    icon: "shield-star",
    color: "#0284c7",
    gradient: "from-[#0ea5e9] via-[#0284c7] to-[#0369a1]",
    borderGlow: "rgba(14, 165, 233, 0.4)",
    category: "platform",
  },
  {
    key: "HRM",
    name: "Quản lý Nguồn nhân lực",
    nameEn: "Human Resource Management",
    shortDesc: "Quản lý Nguồn nhân lực",
    shortDescEn: "Human Resource Management",
    pillTag: "Tuyển dụng & Tiền lương",
    pillTagEn: "Recruitment & Payroll",
    pillColor: "#8b5cf6",
    desc: "Quản lý toàn bộ vòng đời nhân viên từ tuyển dụng, hồ sơ nhân sự, chấm công, tính lương, đào tạo, đánh giá năng lực đến phát triển nghề nghiệp.",
    features: [
      "Quản lý hồ sơ nhân sự số hóa & hợp đồng",
      "Tự động chấm công và tính lương chuẩn xác",
      "Đánh giá nhân sự KPI/OKRs định kỳ",
      "Cổng thông tin tự phục vụ dành cho nhân viên"
    ],
    link: "https://www.hrmplatfrom.powerservice.one",
    icon: "id-badge",
    color: "#6366f1",
    gradient: "from-[#818cf8] via-[#6366f1] to-[#4f46e5]",
    borderGlow: "rgba(99, 102, 241, 0.4)",
    category: "enterprise",
  },
  {
    key: "BPM",
    name: "Quản lý Quy trình Nghiệp vụ",
    nameEn: "Business Process Management",
    shortDesc: "Quản lý Quy trình Nghiệp vụ",
    shortDescEn: "Business Process Management",
    pillTag: "Số hóa & Tự động hóa",
    pillTagEn: "Digitalization & Automation",
    pillColor: "#f97316",
    desc: "Chuẩn hóa, số hóa và tự động hóa các quy trình nghiệp vụ nhằm nâng cao hiệu quả quản lý và vận hành doanh nghiệp.",
    features: [
      "Thiết kế sơ đồ quy trình dạng kéo thả linh hoạt",
      "Tự động hóa phê duyệt đề xuất đa cấp",
      "Giám sát tiến độ xử lý công việc trực thời gian thực",
      "Phân tích nghẽn cổ chai trong vận hành"
    ],
    link: "https://www.bmpplatform.powerservice.one",
    icon: "gear-lightning",
    color: "#ea580c",
    gradient: "from-[#f97316] via-[#ea580c] to-[#c2410c]",
    borderGlow: "rgba(249, 115, 22, 0.4)",
    category: "enterprise",
  },
  {
    key: "OKR",
    name: "Mục tiêu & Kết quả Then chốt",
    nameEn: "Objectives and Key Results",
    shortDesc: "Mục tiêu & Kết quả Then chốt",
    shortDescEn: "Objectives & Key Results",
    pillTag: "Đo lường hiệu suất 100%",
    pillTagEn: "100% Performance Tracking",
    pillColor: "#f43f5e",
    desc: "Thiết lập mục tiêu chiến lược, theo dõi kết quả then chốt (Key Results), quản lý kế hoạch, dự án và đánh giá hiệu suất của cá nhân, phòng ban và doanh nghiệp.",
    features: [
      "Thiết lập mục tiêu chiến lược OKRs toàn công ty",
      "Kết nối mục tiêu phòng ban với cá nhân",
      "Theo dõi tiến độ theo tuần/tháng với chỉ số trực quan",
      "Báo cáo đánh giá hiệu suất minh bạch"
    ],
    link: "https://www.okrplatfrom.powerservice.one",
    icon: "target",
    color: "#e11d48",
    gradient: "from-[#f43f5e] via-[#e11d48] to-[#be185d]",
    borderGlow: "rgba(225, 29, 72, 0.4)",
    category: "enterprise",
  },
  {
    key: "CLP",
    name: "Khách hàng Thân thiết (Loyalty)",
    nameEn: "Customer Loyalty Platform",
    shortDesc: "Khách hàng Thân thiết (Loyalty)",
    shortDescEn: "Customer Loyalty Platform",
    pillTag: "Tích điểm, Voucher & Quà",
    pillTagEn: "Points, Vouchers & Gifts",
    pillColor: "#f59e0b",
    desc: "Quản lý chương trình thành viên, tích điểm, phân hạng khách hàng, ưu đãi, voucher, chiến dịch chăm sóc và gia tăng mức độ trung thành của khách hàng.",
    features: [
      "Phân hạng thành viên (Silver, Gold, Platinum...)",
      "Tích điểm tự động và đổi quà / voucher",
      "Gửi ưu đãi sinh nhật và ngày lễ cá nhân hóa",
      "Gia tăng giá trị trọn đời khách hàng (LTV)"
    ],
    link: "https://www.clpplatform.powerservice.one",
    icon: "wheel",
    color: "#d97706",
    gradient: "from-[#f59e0b] via-[#d97706] to-[#b45309]",
    borderGlow: "rgba(217, 119, 6, 0.4)",
    category: "growth",
  },
  {
    key: "LMS",
    name: "Quản lý Đào tạo Trực tuyến",
    nameEn: "Learning Management System",
    shortDesc: "Quản lý Đào tạo Trực tuyến",
    shortDescEn: "Online Learning Management",
    pillTag: "Khóa học & Năng lực",
    pillTagEn: "Courses & Competency",
    pillColor: "#6366f1",
    desc: "Xây dựng và quản lý khóa học trực tuyến, kiểm tra, đánh giá năng lực, cấp chứng chỉ và phát triển nguồn nhân lực.",
    features: [
      "Kho bài giảng và tài liệu học tập trực tuyến",
      "Tổ chức bài kiểm tra & thi trắc nghiệm tự động",
      "Theo dõi tiến độ học tập của nhân viên",
      "Cấp chứng chỉ hoàn thành khóa học nội bộ"
    ],
    link: "https://www.lmsplatfrom.powerservice.one",
    icon: "grad-cap",
    color: "#4f46e5",
    gradient: "from-[#6366f1] via-[#4f46e5] to-[#3730a3]",
    borderGlow: "rgba(79, 70, 229, 0.4)",
    category: "growth",
  },
  {
    key: "BI",
    name: "Báo cáo & Phân tích Dữ liệu",
    nameEn: "Business Intelligence",
    shortDesc: "Báo cáo & Phân tích Dữ liệu",
    shortDescEn: "Analytics & Reporting",
    pillTag: "Đang triển khai",
    pillTagEn: "Under Development",
    pillColor: "#eab308",
    desc: "Thu thập, tổng hợp, phân tích và trực quan hóa dữ liệu theo thời gian thực, hỗ trợ lãnh đạo đưa ra quyết định dựa trên dữ liệu.",
    features: [
      "Trực quan hóa chỉ số KPI kinh doanh real-time",
      "Báo cáo doanh thu, chi phí và lợi nhuận tự động",
      "Dự báo xu hướng dựa trên lịch sử dữ liệu",
      "Tùy chỉnh biểu đồ & xuất báo cáo đa dạng"
    ],
    link: "(Đang triển khai)",
    icon: "gauge",
    color: "#334155",
    gradient: "from-[#475569] via-[#334155] to-[#1e293b]",
    borderGlow: "rgba(71, 85, 105, 0.4)",
    category: "growth",
  },
  {
    key: "AI",
    name: "Trợ lý Trí tuệ Nhân tạo",
    nameEn: "Artificial Intelligence Assistant",
    shortDesc: "Trợ lý Trí tuệ Nhân tạo",
    shortDescEn: "Artificial Intelligence Assistant",
    pillTag: "Phân tích & Tự động hóa",
    pillTagEn: "Analytics & Automation",
    pillColor: "#a855f7",
    desc: "Hỗ trợ người dùng bằng AI trong việc tìm kiếm tri thức, phân tích dữ liệu, tạo nội dung, tự động hóa quy trình, hỗ trợ ra quyết định và nâng cao năng suất làm việc.",
    features: [
      "Hỏi đáp tri thức doanh nghiệp tự động",
      "Soạn thảo văn bản và tóm tắt tài liệu thông minh",
      "Hỗ trợ phân tích dữ liệu nhanh chóng",
      "Tích hợp bot tự động hỗ trợ nhân viên"
    ],
    link: "https://www.aiplatfrom.powerservice.one",
    icon: "cpu-ai",
    color: "#9333ea",
    gradient: "from-[#a855f7] via-[#9333ea] to-[#7e22ce]",
    borderGlow: "rgba(147, 51, 234, 0.4)",
    category: "growth",
  },
  {
    key: "POS",
    name: "Quản lý Bán hàng tại Quầy",
    nameEn: "Point of Sale",
    shortDesc: "Quản lý Bán hàng tại Quầy",
    shortDescEn: "Point of Sale Management",
    pillTag: "Hóa đơn & Đồng bộ ERP",
    pillTagEn: "Invoicing & ERP Sync",
    pillColor: "#0ea5e9",
    desc: "Quản lý bán hàng tại quầy, đơn hàng, thanh toán, hóa đơn, tồn kho và đồng bộ dữ liệu với CRM, ERP và các hệ thống quản trị khác.",
    features: [
      "Giao diện thu ngân tối ưu tốc độ tính tiền",
      "In hóa đơn và quét mã QR thanh toán tức thì",
      "Đồng bộ tồn kho trực tiếp với ERP & CRM",
      "Báo cáo ca làm việc & ca thu ngân"
    ],
    link: "https://www.posplatform.powerservice.one",
    icon: "pos-terminal",
    color: "#0284c7",
    gradient: "from-[#38bdf8] via-[#0284c7] to-[#0369a1]",
    borderGlow: "rgba(2, 132, 199, 0.4)",
    category: "growth",
  },
  {
    key: "CSC",
    name: "Cổng làm việc CSKH tập trung",
    nameEn: "Customer Service Center",
    shortDesc: "Cổng làm việc CSKH tập trung",
    shortDescEn: "Focused Customer Service Portal",
    pillTag: "Cổng CSKH tập trung",
    pillTagEn: "Focused CSKH Portal",
    pillColor: "#14b8a6",
    desc: "Cổng làm việc CSKH tập trung tiếp nhận và xử lý yêu cầu hỗ trợ, quản lý Ticket, SLA, lịch sử liên hệ, Zalo OA, Call Center và Helpdesk.",
    features: [
      "Quản lý tương tác CSKH Omnichannel (Zalo, Facebook, Call Center)",
      "Hệ thống ticket tự động điều phối tác vụ",
      "Theo dõi cam kết chất lượng dịch vụ SLA",
      "Cổng tiếp nhận và xử lý yêu cầu CSKH tập trung"
    ],
    link: "https://www.cscplatform.powerservice.one",
    icon: "chat-check",
    color: "#0d9488",
    gradient: "from-[#14b8a6] via-[#0d9488] to-[#0f766e]",
    borderGlow: "rgba(13, 148, 136, 0.4)",
    category: "platform",
  },
];

const translations = {
  vi: {
    bannerTitle: "Hệ thống vận hành",
    bannerSubtitle: "Hệ sinh thái nền tảng và các hệ thống vận hành doanh nghiệp PowerService.",
    searchPlaceholder: "Tìm kiếm hệ thống, mã hệ thống (CRM, ERP, AI...)...",
    allCategories: "Tất cả hệ thống",
    catPlatform: "Nền tảng & CSKH",
    catEnterprise: "Quản trị Doanh nghiệp",
    catGrowth: "Tăng trưởng & AI",
    underDevelopment: "Đang triển khai",
    details: "Xem chi tiết",
    close: "Đóng",
    noResults: "Không tìm thấy hệ thống phù hợp với từ khóa.",
    allSystemsOperational: "Tất cả hệ thống hoạt động ổn định",
    featuresTitle: "Các tính năng nổi bật & Nhiệm vụ chính",
    accessNow: "Vào website",
    videoIntroTitle: "Video Giới thiệu PowerService Ecosystem",
    pause: "Tạm dừng",
    playVideo: "PLAY VIDEO",
  },
  en: {
    bannerTitle: "Core enterprise operational systems",
    bannerSubtitle: "The platform ecosystem and enterprise operational management systems by PowerService.",
    searchPlaceholder: "Search systems, codes (CRM, ERP, AI...)...",
    allCategories: "All Systems",
    catPlatform: "Platform & Care",
    catEnterprise: "Enterprise Admin",
    catGrowth: "Growth & AI",
    underDevelopment: "Under Development",
    details: "View Details",
    close: "Close",
    noResults: "No systems matched your search query.",
    allSystemsOperational: "All Systems Operational",
    featuresTitle: "Key Features & Core Capabilities",
    accessNow: "Visit Website",
    videoIntroTitle: "PowerService Ecosystem Intro Video",
    pause: "Pause",
    playVideo: "PLAY VIDEO",
  }
};

export function SystemGradientIcon({ itemKey, extraClass = "w-9 h-9" }: { itemKey: string; extraClass?: string }) {
  const iconClass = `${extraClass} system-card-icon-animated drop-shadow-md text-white transition-transform duration-300`;

  switch (itemKey) {
    case "SDP":
      return <Server className={iconClass} />;
    case "ERP":
      return <BarChart3 className={iconClass} />;
    case "CRM":
      return <ShieldCheck className={iconClass} />;
    case "HRM":
      return <Briefcase className={iconClass} />;
    case "BPM":
      return <Code className={iconClass} />;
    case "OKR":
      return <Trophy className={iconClass} />;
    case "CLP":
      return <Heart className={iconClass} />;
    case "LMS":
      return <BookOpen className={iconClass} />;
    case "BI":
      return <BarChart3 className={iconClass} />;
    case "AI":
      return <Bot className={iconClass} />;
    case "POS":
      return <Package className={iconClass} />;
    case "CSC":
      return <Phone className={iconClass} />;
    default:
      return <Layers className={iconClass} />;
  }
}

/**
 * CODEPEN #07 ORBIT ANIMATION SYSTEM ICON
 * Ambient continuous orbiting rings and satellites around the central system icon
 */
export function SystemOrbitIcon({ itemKey, size = "md", extraClass = "" }: { itemKey: string; size?: "sm" | "md" | "lg"; extraClass?: string }) {
  const satColors = React.useMemo(() => {
    switch (itemKey) {
      case "SDP": return { main: "#60a5fa", sub: "#93c5fd", glow: "rgba(96,165,250,0.9)" };
      case "ERP": return { main: "#34d399", sub: "#6ee7b7", glow: "rgba(52,211,153,0.9)" };
      case "CRM": return { main: "#a78bfa", sub: "#c4b5fd", glow: "rgba(167,139,250,0.9)" };
      case "HRM": return { main: "#fb923c", sub: "#fdba74", glow: "rgba(251,146,60,0.9)" };
      case "BPM": return { main: "#22d3ee", sub: "#67e8f9", glow: "rgba(34,211,238,0.9)" };
      case "OKR": return { main: "#fb7185", sub: "#fda4af", glow: "rgba(251,113,133,0.9)" };
      case "CLP": return { main: "#fbbf24", sub: "#fde68a", glow: "rgba(251,191,36,0.9)" };
      case "LMS": return { main: "#818cf8", sub: "#a5b4fc", glow: "rgba(129,140,248,0.9)" };
      case "CSC": return { main: "#38bdf8", sub: "#7dd3fc", glow: "rgba(56,189,248,0.9)" };
      case "BI":  return { main: "#facc15", sub: "#fef08a", glow: "rgba(250,204,21,0.9)" };
      case "AI":  return { main: "#e879f9", sub: "#f0abfc", glow: "rgba(232,121,249,0.9)" };
      case "POS": return { main: "#a3e635", sub: "#bef264", glow: "rgba(163,230,53,0.9)" };
      default:   return { main: "#60a5fa", sub: "#bfdbfe", glow: "rgba(96,165,250,0.9)" };
    }
  }, [itemKey]);

  const sizeClasses = {
    sm: { stage: "w-10 h-10", center: "w-6 h-6", inner: "w-8 h-8", outer: "w-10 h-10", icon: "w-3.5 h-3.5" },
    md: { stage: "w-12 h-12 sm:w-14 sm:h-14", center: "w-8 h-8 sm:w-9 sm:h-9", inner: "w-10 h-10 sm:w-11 sm:h-11", outer: "w-12 h-12 sm:w-13.5 sm:h-13.5", icon: "w-4 h-4 sm:w-5 sm:h-5" },
    lg: { stage: "w-16 h-16", center: "w-10 h-10", inner: "w-13 h-13", outer: "w-16 h-16", icon: "w-5 h-5 sm:w-6 sm:h-6" }
  }[size];

  return (
    <div className={cn("orbit-stage-wrapper relative flex items-center justify-center shrink-0 select-none", sizeClasses.stage, extraClass)}>
      {/* 1. Outer Orbit Ring (Counter-Clockwise Rotation) */}
      <div className={cn("orbit-ring-outer absolute rounded-full border border-white/25 pointer-events-none", sizeClasses.outer)}>
        {/* Orbit Satellite 2 (Top of Outer Ring) */}
        <span 
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full shadow-md"
          style={{ backgroundColor: satColors.main, boxShadow: `0 0 8px ${satColors.glow}` }}
        />
        {/* Orbit Satellite 3 (Bottom of Outer Ring) */}
        <span 
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full shadow-xs"
          style={{ backgroundColor: satColors.sub, boxShadow: `0 0 6px ${satColors.glow}` }}
        />
      </div>

      {/* 2. Inner Orbit Ring (Clockwise Rotation) */}
      <div className={cn("orbit-ring-inner absolute rounded-full border border-white/45 pointer-events-none", sizeClasses.inner)}>
        {/* Orbit Satellite 1 (Right of Inner Ring) */}
        <span 
          className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full shadow-md bg-white"
          style={{ boxShadow: `0 0 8px #ffffff, 0 0 12px ${satColors.glow}` }}
        />
      </div>

      {/* 3. Orbit Center Node */}
      <div className={cn("orbit-center-node relative z-10 flex items-center justify-center rounded-2xl bg-white/20 dark:bg-slate-900/50 backdrop-blur-md border border-white/40 shadow-md transition-all duration-300", sizeClasses.center)}>
        <SystemGradientIcon itemKey={itemKey} extraClass={sizeClasses.icon} />
      </div>
    </div>
  );
}

export function CardTrajectoryMotifs({ itemKey }: { itemKey: string }) {
  switch (itemKey) {
    case 'SDP':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1] opacity-70 group-hover:opacity-95 transition-opacity">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 pattern-trajectory-elliptical-orbit opacity-40">
            <svg viewBox="0 0 100 100" className="w-full h-full text-blue-300 fill-none stroke-current" strokeWidth="1.5">
              <circle cx="50" cy="50" r="35" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="22" strokeOpacity="0.6" />
              <circle cx="50" cy="50" r="8" fill="currentColor" fillOpacity="0.4" />
            </svg>
          </div>
          <div className="absolute left-1/4 top-1 w-28 h-10 pattern-trajectory-sin-wave opacity-35">
            <svg viewBox="0 0 120 40" className="w-full h-full text-blue-200 fill-none stroke-current" strokeWidth="1.2">
              <path d="M 0 20 Q 30 5 60 20 T 120 20" strokeDasharray="3 3" />
            </svg>
          </div>
          <div className="absolute right-12 top-3 w-3 h-3 rounded-full bg-blue-300/60 pattern-trajectory-diagonal-glide" />
          <div className="absolute right-24 bottom-3 w-2 h-2 rounded-full bg-blue-200/50 pattern-trajectory-breathing-pulse" />
        </div>
      );
    case 'ERP':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1] opacity-70 group-hover:opacity-95 transition-opacity">
          <div className="absolute -right-6 -bottom-6 w-36 h-36 pattern-trajectory-matrix-spiral opacity-40">
            <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-300 fill-none stroke-current" strokeWidth="1.5">
              <rect x="20" y="20" width="60" height="60" rx="10" strokeDasharray="5 3" />
              <rect x="35" y="35" width="30" height="30" rx="6" strokeOpacity="0.7" />
              <rect x="44" y="44" width="12" height="12" rx="3" fill="currentColor" fillOpacity="0.5" />
            </svg>
          </div>
          <div className="absolute left-16 bottom-2 w-20 h-20 pattern-trajectory-quantum-drift opacity-30">
            <svg viewBox="0 0 60 60" className="w-full h-full text-emerald-200 fill-none stroke-current" strokeWidth="1">
              <line x1="0" y1="15" x2="60" y2="15" strokeDasharray="2 4" />
              <line x1="0" y1="45" x2="60" y2="45" strokeDasharray="2 4" />
            </svg>
          </div>
          <div className="absolute right-16 top-4 w-2.5 h-2.5 rounded-xs bg-emerald-300/60 pattern-trajectory-counter-spin" />
        </div>
      );
    case 'CRM':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1] opacity-70 group-hover:opacity-95 transition-opacity">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 pattern-trajectory-hex-ripple opacity-40">
            <svg viewBox="0 0 100 100" className="w-full h-full text-purple-300 fill-none stroke-current" strokeWidth="1.5">
              <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" strokeDasharray="4 4" />
              <polygon points="50,28 70,40 70,60 50,72 30,60 30,40" strokeOpacity="0.7" />
              <circle cx="50" cy="50" r="6" fill="currentColor" fillOpacity="0.5" />
            </svg>
          </div>
          <div className="absolute left-20 top-2 w-28 h-12 pattern-trajectory-starlight-flow opacity-35">
            <svg viewBox="0 0 100 40" className="w-full h-full text-violet-200 fill-none stroke-current" strokeWidth="1.2">
              <path d="M 10 30 C 30 10, 70 35, 90 15" strokeDasharray="3 3" />
            </svg>
          </div>
          <div className="absolute right-20 bottom-3 w-3 h-3 rounded-full bg-purple-300/50 pattern-trajectory-breathing-pulse" />
        </div>
      );
    case 'HRM':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1] opacity-70 group-hover:opacity-95 transition-opacity">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 pattern-trajectory-pendulum-arc opacity-40">
            <svg viewBox="0 0 100 100" className="w-full h-full text-orange-300 fill-none stroke-current" strokeWidth="1.5">
              <polygon points="35,15 65,15 85,35 85,65 65,85 35,85 15,65 15,35" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="18" strokeOpacity="0.6" />
              <circle cx="50" cy="50" r="6" fill="currentColor" fillOpacity="0.5" />
            </svg>
          </div>
          <div className="absolute left-1/3 top-2 w-24 h-16 pattern-trajectory-vertical-float opacity-30">
            <svg viewBox="0 0 80 40" className="w-full h-full text-amber-200 fill-none stroke-current" strokeWidth="1">
              <circle cx="20" cy="20" r="3" fill="currentColor" />
              <circle cx="60" cy="20" r="3" fill="currentColor" />
              <line x1="20" y1="20" x2="60" y2="20" strokeDasharray="2 3" />
            </svg>
          </div>
        </div>
      );
    case 'BPM':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1] opacity-70 group-hover:opacity-95 transition-opacity">
          <div className="absolute -right-5 -bottom-5 w-36 h-36 pattern-trajectory-elliptical-orbit opacity-45">
            <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-300 fill-none stroke-current" strokeWidth="1.5">
              <rect x="25" y="25" width="50" height="50" rx="6" transform="rotate(45 50 50)" strokeDasharray="4 4" />
              <rect x="36" y="36" width="28" height="28" rx="4" transform="rotate(45 50 50)" strokeOpacity="0.7" />
              <circle cx="50" cy="50" r="6" fill="currentColor" fillOpacity="0.5" />
            </svg>
          </div>
          <div className="absolute left-1/4 bottom-1 w-32 h-10 pattern-trajectory-sin-wave opacity-35">
            <svg viewBox="0 0 120 40" className="w-full h-full text-teal-200 fill-none stroke-current" strokeWidth="1.2">
              <path d="M 0 15 Q 30 30 60 15 T 120 15" strokeDasharray="3 3" />
            </svg>
          </div>
        </div>
      );
    case 'OKR':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1] opacity-70 group-hover:opacity-95 transition-opacity">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 pattern-trajectory-breathing-pulse opacity-45">
            <svg viewBox="0 0 100 100" className="w-full h-full text-rose-300 fill-none stroke-current" strokeWidth="1.5">
              <circle cx="50" cy="50" r="38" strokeDasharray="5 3" />
              <circle cx="50" cy="50" r="26" strokeOpacity="0.7" />
              <circle cx="50" cy="50" r="14" strokeOpacity="0.9" />
              <circle cx="50" cy="50" r="5" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute left-12 top-2 w-28 h-12 pattern-trajectory-diagonal-glide opacity-30">
            <svg viewBox="0 0 100 40" className="w-full h-full text-pink-200 fill-none stroke-current" strokeWidth="1">
              <line x1="10" y1="10" x2="80" y2="30" strokeDasharray="3 4" />
            </svg>
          </div>
        </div>
      );
    case 'CLP':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1] opacity-70 group-hover:opacity-95 transition-opacity">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 pattern-trajectory-counter-spin opacity-40">
            <svg viewBox="0 0 100 100" className="w-full h-full text-amber-300 fill-none stroke-current" strokeWidth="1.5">
              <polygon points="50,15 59,36 82,36 63,50 71,72 50,58 29,72 37,50 18,36 41,36" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="15" strokeOpacity="0.6" />
              <circle cx="50" cy="50" r="5" fill="currentColor" fillOpacity="0.5" />
            </svg>
          </div>
          <div className="absolute left-20 bottom-2 w-28 h-10 pattern-trajectory-starlight-flow opacity-35">
            <svg viewBox="0 0 100 40" className="w-full h-full text-yellow-200 fill-none stroke-current" strokeWidth="1.2">
              <circle cx="30" cy="20" r="2.5" fill="currentColor" />
              <circle cx="70" cy="15" r="3" fill="currentColor" />
              <path d="M 0 25 Q 50 5 100 25" strokeDasharray="2 3" />
            </svg>
          </div>
        </div>
      );
    case 'LMS':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1] opacity-70 group-hover:opacity-95 transition-opacity">
          <div className="absolute -right-5 -bottom-5 w-34 h-34 pattern-trajectory-matrix-spiral opacity-40">
            <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-300 fill-none stroke-current" strokeWidth="1.5">
              <path d="M 50 15 L 80 28 L 80 58 Q 80 82 50 92 Q 20 82 20 58 L 20 28 Z" strokeDasharray="4 4" />
              <circle cx="50" cy="52" r="14" strokeOpacity="0.7" />
              <circle cx="50" cy="52" r="5" fill="currentColor" fillOpacity="0.5" />
            </svg>
          </div>
          <div className="absolute left-16 top-1 w-24 h-12 pattern-trajectory-pendulum-arc opacity-30">
            <svg viewBox="0 0 80 40" className="w-full h-full text-indigo-200 fill-none stroke-current" strokeWidth="1">
              <path d="M 10 30 Q 40 5 70 30" strokeDasharray="3 3" />
            </svg>
          </div>
        </div>
      );
    case 'BI':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1] opacity-70 group-hover:opacity-95 transition-opacity">
          <div className="absolute -right-5 -bottom-5 w-36 h-36 pattern-trajectory-quantum-drift opacity-40">
            <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-300 fill-none stroke-current" strokeWidth="1.4">
              <line x1="20" y1="20" x2="80" y2="80" strokeDasharray="3 3" />
              <line x1="20" y1="80" x2="80" y2="20" strokeDasharray="3 3" />
              <rect x="30" y="30" width="40" height="40" rx="8" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="7" fill="currentColor" fillOpacity="0.5" />
            </svg>
          </div>
          <div className="absolute left-1/4 top-2 w-28 h-12 pattern-trajectory-vertical-float opacity-35">
            <svg viewBox="0 0 100 40" className="w-full h-full text-amber-200 fill-none stroke-current" strokeWidth="1">
              <line x1="10" y1="20" x2="90" y2="20" strokeDasharray="4 3" />
              <circle cx="30" cy="20" r="3" fill="currentColor" />
              <circle cx="70" cy="20" r="3" fill="currentColor" />
            </svg>
          </div>
        </div>
      );
    case 'AI':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1] opacity-70 group-hover:opacity-95 transition-opacity">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 pattern-trajectory-breathing-pulse opacity-45">
            <svg viewBox="0 0 100 100" className="w-full h-full text-fuchsia-300 fill-none stroke-current" strokeWidth="1.5">
              <path d="M 50 15 C 75 15, 85 35, 85 55 C 85 75, 65 85, 45 85 C 25 85, 15 65, 15 45 C 15 25, 30 15, 50 15 Z" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="16" strokeOpacity="0.7" />
              <circle cx="50" cy="50" r="6" fill="currentColor" fillOpacity="0.6" />
            </svg>
          </div>
          <div className="absolute left-16 bottom-2 w-32 h-10 pattern-trajectory-starlight-flow opacity-35">
            <svg viewBox="0 0 120 40" className="w-full h-full text-pink-200 fill-none stroke-current" strokeWidth="1.2">
              <circle cx="25" cy="18" r="2.5" fill="currentColor" />
              <circle cx="55" cy="25" r="3" fill="currentColor" />
              <circle cx="95" cy="15" r="2" fill="currentColor" />
              <path d="M 10 20 L 110 20" strokeDasharray="3 4" />
            </svg>
          </div>
        </div>
      );
    case 'POS':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1] opacity-70 group-hover:opacity-95 transition-opacity">
          <div className="absolute -right-5 -bottom-5 w-34 h-34 pattern-trajectory-counter-spin opacity-40">
            <svg viewBox="0 0 100 100" className="w-full h-full text-lime-300 fill-none stroke-current" strokeWidth="1.4">
              <rect x="22" y="32" width="56" height="36" rx="8" strokeDasharray="4 4" />
              <rect x="32" y="22" width="36" height="56" rx="8" strokeOpacity="0.6" strokeDasharray="2 3" />
              <circle cx="50" cy="50" r="7" fill="currentColor" fillOpacity="0.5" />
            </svg>
          </div>
          <div className="absolute left-20 top-2 w-28 h-12 pattern-trajectory-diagonal-glide opacity-30">
            <svg viewBox="0 0 100 40" className="w-full h-full text-emerald-200 fill-none stroke-current" strokeWidth="1">
              <path d="M 10 30 L 90 10" strokeDasharray="4 4" />
            </svg>
          </div>
        </div>
      );
    case 'CSC':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1] opacity-70 group-hover:opacity-95 transition-opacity">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 pattern-trajectory-radar-sweep opacity-45">
            <svg viewBox="0 0 100 100" className="w-full h-full text-sky-300 fill-none stroke-current" strokeWidth="1.5">
              <circle cx="50" cy="50" r="38" strokeDasharray="5 3" />
              <circle cx="50" cy="50" r="24" strokeOpacity="0.6" />
              <line x1="50" y1="50" x2="50" y2="12" strokeWidth="2" strokeLinecap="round" />
              <circle cx="50" cy="50" r="5" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute left-1/4 bottom-1 w-28 h-10 pattern-trajectory-sin-wave opacity-35">
            <svg viewBox="0 0 100 40" className="w-full h-full text-cyan-200 fill-none stroke-current" strokeWidth="1.2">
              <path d="M 0 20 Q 25 5 50 20 T 100 20" strokeDasharray="3 3" />
            </svg>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function CardArtisticBorderPattern({ itemKey, color }: { itemKey: string; color: string }) {
  return <CardTrajectoryMotifs itemKey={itemKey} />;
}

function getCardThemeClasses(key: string) {
  switch (key) {
    case 'SDP': return 'theme-sdp shape-circles';
    case 'ERP': return 'theme-erp shape-squares';
    case 'CRM': return 'theme-crm shape-hexagons';
    case 'HRM': return 'theme-hrm shape-octagons';
    case 'BPM': return 'theme-bpm shape-diamonds';
    case 'OKR': return 'theme-okr shape-target';
    case 'CLP': return 'theme-clp shape-stars';
    case 'LMS': return 'theme-lms shape-shields';
    case 'BI': return 'theme-bi shape-mesh';
    case 'AI': return 'theme-ai shape-quantum';
    case 'POS': return 'theme-pos shape-cards';
    case 'CSC': return 'theme-csc shape-radar';
    default: return 'theme-sdp shape-circles';
  }
}

export function Systems() {
  const { lang } = useLanguage();
  const currentLang = lang as Language;
  const isVi = currentLang === 'vi';
  
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  const [modalSystem, setModalSystem] = useState<SystemItem | null>(null);
  const [toastText, setToastText] = useState<string | null>(null);

  /* Video player states */
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [fullVideoPaused, setFullVideoPaused] = useState<boolean>(false);
  const [fullVideoMuted, setFullVideoMuted] = useState<boolean>(false);

  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const fullVideoRef = useRef<HTMLVideoElement>(null);

  const t = translations[currentLang];

  const showNotification = (msg: string) => {
    setToastText(msg);
    setTimeout(() => {
      setToastText(null);
    }, 3200);
  };

  /* Handle preview video autoplay on mount */
  useEffect(() => {
    if (previewVideoRef.current && !isVideoPlaying) {
      previewVideoRef.current.play().catch(() => {});
    }
  }, [isVideoPlaying]);

  const handleCardClick = (key: string, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.action-btn')) return;

    setExpandedKeys(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const openSystemLink = (url: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    window.open(url, '_blank');
  };

  const openModal = (sys: SystemItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setModalSystem(sys);
  };

  const closeModal = () => {
    setModalSystem(null);
  };

  /* Full Banner Video Controls */
  const toggleVideoPlay = () => {
    if (!isVideoPlaying) {
      setIsVideoPlaying(true);
      setFullVideoPaused(false);
      setTimeout(() => {
        if (fullVideoRef.current) {
          fullVideoRef.current.currentTime = 0;
          fullVideoRef.current.muted = fullVideoMuted;
          fullVideoRef.current.play().catch(() => {});
        }
      }, 50);
      if (previewVideoRef.current) {
        previewVideoRef.current.pause();
      }
    } else {
      setIsVideoPlaying(false);
      setFullVideoPaused(true);
      if (fullVideoRef.current) {
        fullVideoRef.current.pause();
      }
      if (previewVideoRef.current) {
        previewVideoRef.current.currentTime = 0;
        previewVideoRef.current.play().catch(() => {});
      }
    }
  };

  const toggleFullVideoPlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fullVideoRef.current) {
      if (fullVideoRef.current.paused) {
        fullVideoRef.current.play();
        setFullVideoPaused(false);
      } else {
        fullVideoRef.current.pause();
        setFullVideoPaused(true);
        // Tạm dừng sẽ thu gọn lại và hiển thị lại các thẻ hệ thống theo yêu cầu
        setIsVideoPlaying(false);
      }
    }
  };

  const toggleVideoMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fullVideoRef.current) {
      fullVideoRef.current.muted = !fullVideoRef.current.muted;
      setFullVideoMuted(fullVideoRef.current.muted);
    }
  };

  /* Filter Systems based on Category and Search Query */
  const filteredSystems = systemsData.filter(sys => {
    const matchesCat = currentCategory === 'all' || sys.category === currentCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      sys.key.toLowerCase().includes(q) ||
      sys.name.toLowerCase().includes(q) ||
      sys.nameEn.toLowerCase().includes(q) ||
      sys.desc.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <section 
      id="systems" 
      className="relative w-full h-full max-h-full flex flex-col justify-start items-center p-3 xs:p-3.5 sm:p-4.5 md:p-6 lg:p-8 font-sans text-slate-800 dark:text-slate-100 overflow-hidden"
    >
      {/* Hệ thống - Bố cục trực quan không khung bọc ngoài, giữ nguyên cấu trúc và nội dung */}
      <div className="w-full h-full flex flex-col gap-2 overflow-hidden">
        <style>{`
          /* Ambient Background Orbs for Glassmorphism Effect */
          .bg-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(90px);
            pointer-events: none;
            opacity: 0.5;
            animation: floatOrb 18s ease-in-out infinite alternate;
          }
          .bg-orb-1 {
            top: -10%;
            left: -5%;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.2) 100%);
          }
          .bg-orb-2 {
            top: 30%;
            right: -10%;
            width: 550px;
            height: 550px;
            background: radial-gradient(circle, rgba(236, 72, 153, 0.35) 0%, rgba(239, 68, 68, 0.15) 100%);
            animation-delay: -6s;
          }
          .bg-orb-3 {
            bottom: -10%;
            left: 20%;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(6, 182, 212, 0.15) 100%);
            animation-delay: -12s;
          }

          @keyframes floatOrb {
            0% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(40px, -50px) scale(1.1); }
            100% { transform: translate(-30px, 30px) scale(0.95); }
          }

          /* Cards Grid Container - Format thẻ Học vấn Responsive Grid */
          .cards-grid {
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            gap: 20px;
            width: 100%;
            flex: 1 1 0%;
            min-height: 0;
            overflow-y: auto;
            overflow-x: hidden;
            align-content: start;
            align-items: start;
            padding-right: 2px;
            -webkit-overflow-scrolling: touch;
          }
          @media (min-width: 640px) {
            .cards-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 20px;
            }
          }
          @media (min-width: 1024px) {
            .cards-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 24px;
            }
          }
          @media (min-width: 1280px) {
            .cards-grid {
              grid-template-columns: repeat(4, minmax(0, 1fr));
              gap: 24px;
            }
          }

          /* Base System Card Formatting */
          .format-card {
            position: relative;
            border-radius: 14px;
            text-decoration: none;
            overflow: hidden;
            transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
            cursor: pointer;
            display: flex;
            flex-direction: column;
            outline: none;
            height: 100%;
          }

          .format-card:not(.card-expanded) {
            height: 100%;
            min-height: 62px;
            max-height: none;
          }

          .format-card.card-expanded {
            height: auto;
            min-height: 200px;
            grid-column: 1 / -1;
          }

          .format-card:hover {
            transform: translateY(-2px) scale(1.01);
            z-index: 10;
          }

          /* Ambient Glow Shadow Layer */
          .card-ambient-shadow {
            position: absolute;
            inset: 0;
            border-radius: 14px;
            opacity: 0.35;
            filter: blur(12px);
            transition: opacity 0.35s ease;
            pointer-events: none;
          }
          .format-card:hover .card-ambient-shadow {
            opacity: 0.75;
            filter: blur(16px);
          }

          /* Surface Layer */
          .card-surface {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 14px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 8px 12px;
            box-sizing: border-box;
            border: 1px solid rgba(255, 255, 255, 0.22);
            overflow: hidden;
            backdrop-filter: blur(10px);
          }

          /* Geometric Background Layer Container */
          .geometric-bg {
            position: absolute;
            right: -20px;
            top: 50%;
            transform: translateY(-50%);
            width: 180px;
            height: 180px;
            pointer-events: none;
            z-index: 1;
            opacity: 0.85;
            transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s ease;
          }
          .format-card:hover .geometric-bg {
            transform: translateY(-50%) scale(1.08);
            opacity: 1;
          }

          .geo-layer {
            position: absolute;
            inset: 0;
            margin: auto;
            border-style: solid;
            transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
            box-sizing: border-box;
          }

          /* Geometric Layer Sizing */
          .layer-core { width: 40px; height: 40px; }
          .layer-2 { width: 70px; height: 70px; opacity: 0.6; }
          .layer-3 { width: 105px; height: 105px; opacity: 0.35; }
          .layer-4 { width: 145px; height: 145px; opacity: 0.15; }

          /* Geometric Shapes & Animations */
          /* 1. Circles */
          .shape-circles .geo-layer { border-radius: 50%; }
          .shape-circles .layer-core { animation: pulseCircle 3s ease-in-out infinite alternate; }
          .shape-circles .layer-2 { animation: spinCW 12s linear infinite; stroke-dasharray: 4 4; }
          .shape-circles .layer-3 { animation: spinCCW 18s linear infinite; }
          .shape-circles .layer-4 { animation: pulseCircle 4s ease-in-out infinite alternate-reverse; }

          /* 2. Squares */
          .shape-squares .geo-layer { border-radius: 12px; }
          .shape-squares .layer-core { animation: rotateSquare 6s ease-in-out infinite; }
          .shape-squares .layer-2 { animation: spinCW 20s linear infinite; }
          .shape-squares .layer-3 { animation: rotateSquare 9s ease-in-out infinite reverse; border-radius: 20px; }
          .shape-squares .layer-4 { animation: spinCCW 25s linear infinite; border-radius: 30px; }

          /* 3. Hexagons */
          .shape-hexagons .geo-layer { clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%); }
          .shape-hexagons .layer-core { animation: spinCW 8s linear infinite; }
          .shape-hexagons .layer-2 { animation: spinCCW 14s linear infinite; }
          .shape-hexagons .layer-3 { animation: spinCW 22s linear infinite; }
          .shape-hexagons .layer-4 { animation: spinCCW 30s linear infinite; }

          /* 4. Octagons */
          .shape-octagons .geo-layer { clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%); }
          .shape-octagons .layer-core { animation: spinCCW 10s linear infinite; }
          .shape-octagons .layer-2 { animation: spinCW 16s linear infinite; }
          .shape-octagons .layer-3 { animation: spinCCW 24s linear infinite; }
          .shape-octagons .layer-4 { animation: spinCW 32s linear infinite; }

          /* 5. Diamonds */
          .shape-diamonds .geo-layer { transform: rotate(45deg); border-radius: 8px; }
          .shape-diamonds .layer-core { animation: pulseDiamond 2.5s ease-in-out infinite alternate; }
          .shape-diamonds .layer-2 { animation: spinCW 15s linear infinite; }
          .shape-diamonds .layer-3 { animation: pulseDiamond 4s ease-in-out infinite alternate-reverse; }
          .shape-diamonds .layer-4 { animation: spinCCW 22s linear infinite; }

          /* 6. Target */
          .shape-target .geo-layer { border-radius: 50%; }
          .shape-target .layer-core { animation: targetPing 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
          .shape-target .layer-2 { animation: spinCW 10s linear infinite; }
          .shape-target .layer-3 { animation: spinCCW 16s linear infinite; }
          .shape-target .layer-4 { animation: spinCW 25s linear infinite; }

          /* 7. Stars */
          .shape-stars .geo-layer { clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); }
          .shape-stars .layer-core { animation: spinCW 6s linear infinite; }
          .shape-stars .layer-2 { animation: spinCCW 12s linear infinite; }
          .shape-stars .layer-3 { animation: spinCW 18s linear infinite; }
          .shape-stars .layer-4 { animation: spinCCW 24s linear infinite; }

          /* 8. Shields */
          .shape-shields .geo-layer { clip-path: polygon(50% 0%, 100% 20%, 100% 70%, 50% 100%, 0% 70%, 0% 20%); }
          .shape-shields .layer-core { animation: shieldPulse 3s ease-in-out infinite alternate; }
          .shape-shields .layer-2 { animation: spinCW 14s linear infinite; }
          .shape-shields .layer-3 { animation: shieldPulse 4.5s ease-in-out infinite alternate-reverse; }
          .shape-shields .layer-4 { animation: spinCCW 26s linear infinite; }

          /* 9. Radar */
          .shape-radar .geo-layer { border-radius: 50%; }
          .shape-radar .layer-core { animation: spinCW 4s linear infinite; }
          .shape-radar .layer-2 { animation: spinCW 8s linear infinite; }
          .shape-radar .layer-3 { animation: spinCCW 15s linear infinite; }
          .shape-radar .layer-4 { animation: spinCW 22s linear infinite; }

          /* 10. Mesh */
          .shape-mesh .geo-layer { border-radius: 16px; transform: rotate(15deg); }
          .shape-mesh .layer-core { animation: spinCCW 7s linear infinite; }
          .shape-mesh .layer-2 { animation: spinCW 13s linear infinite; }
          .shape-mesh .layer-3 { animation: spinCCW 19s linear infinite; }
          .shape-mesh .layer-4 { animation: spinCW 28s linear infinite; }

          /* 11. Quantum */
          .shape-quantum .geo-layer { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          .shape-quantum .layer-core { animation: quantumMorph 6s ease-in-out infinite alternate; }
          .shape-quantum .layer-2 { animation: spinCW 11s linear infinite; }
          .shape-quantum .layer-3 { animation: quantumMorph 8s ease-in-out infinite alternate-reverse; }
          .shape-quantum .layer-4 { animation: spinCCW 20s linear infinite; }

          /* 12. Cards */
          .shape-cards .geo-layer { border-radius: 10px; }
          .shape-cards .layer-core { animation: spinCW 9s linear infinite; }
          .shape-cards .layer-2 { animation: spinCCW 15s linear infinite; }
          .shape-cards .layer-3 { animation: spinCW 21s linear infinite; }
          .shape-cards .layer-4 { animation: spinCCW 27s linear infinite; }

          /* Keyframe Animations */
          @keyframes spinCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes spinCCW { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
          @keyframes pulseCircle { 0% { transform: scale(0.85); } 100% { transform: scale(1.15); } }
          @keyframes rotateSquare { 0% { transform: rotate(0deg) scale(0.9); } 50% { transform: rotate(90deg) scale(1.1); } 100% { transform: rotate(180deg) scale(0.9); } }
          @keyframes pulseDiamond { 0% { transform: rotate(45deg) scale(0.8); } 100% { transform: rotate(45deg) scale(1.2); } }
          @keyframes targetPing { 0% { transform: scale(0.7); opacity: 0.8; } 100% { transform: scale(1.3); opacity: 0.2; } }
          @keyframes shieldPulse { 0% { transform: scale(0.9); } 100% { transform: scale(1.1); } }
          @keyframes quantumMorph {
            0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
            50% { border-radius: 60% 40% 30% 70% / 50% 30% 70% 40%; }
            100% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          }

          /* 12 Trajectory Keyframe Animations for Random Pattern Movements */
          .pattern-trajectory-sin-wave { animation: trajectorySinWave 8s ease-in-out infinite; }
          @keyframes trajectorySinWave {
            0% { transform: translate(0px, 0px) rotate(0deg); }
            25% { transform: translate(14px, -8px) rotate(2deg); }
            50% { transform: translate(0px, -14px) rotate(0deg); }
            75% { transform: translate(-14px, -6px) rotate(-2deg); }
            100% { transform: translate(0px, 0px) rotate(0deg); }
          }

          .pattern-trajectory-elliptical-orbit { animation: trajectoryElliptical 14s linear infinite; }
          @keyframes trajectoryElliptical {
            0% { transform: rotate(0deg) translate(12px) rotate(0deg); }
            100% { transform: rotate(360deg) translate(12px) rotate(-360deg); }
          }

          .pattern-trajectory-diagonal-glide { animation: trajectoryDiagonal 9s ease-in-out infinite alternate; }
          @keyframes trajectoryDiagonal {
            0% { transform: translate(-12px, 10px) scale(0.95); }
            50% { transform: translate(4px, -4px) scale(1.02); }
            100% { transform: translate(16px, -12px) scale(1.08); }
          }

          .pattern-trajectory-breathing-pulse { animation: trajectoryBreathing 6s ease-in-out infinite alternate; }
          @keyframes trajectoryBreathing {
            0% { transform: scale(0.88) translate(-4px, 4px); }
            50% { transform: scale(1.05) translate(2px, -2px); }
            100% { transform: scale(1.2) translate(8px, -6px); }
          }

          .pattern-trajectory-matrix-spiral { animation: trajectorySpiral 12s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          @keyframes trajectorySpiral {
            0% { transform: rotate(0deg) scale(0.9) translate(0px, 0px); }
            50% { transform: rotate(180deg) scale(1.15) translate(8px, -6px); }
            100% { transform: rotate(360deg) scale(0.9) translate(0px, 0px); }
          }

          .pattern-trajectory-pendulum-arc { animation: trajectoryPendulum 5s ease-in-out infinite alternate; }
          @keyframes trajectoryPendulum {
            0% { transform: rotate(-18deg) translate(-10px, 0); }
            100% { transform: rotate(18deg) translate(10px, 0); }
          }

          .pattern-trajectory-quantum-drift { animation: trajectoryQuantumDrift 11s ease-in-out infinite alternate; }
          @keyframes trajectoryQuantumDrift {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(10px, -12px) scale(1.06); }
            66% { transform: translate(-8px, 8px) scale(0.94); }
            100% { transform: translate(12px, 6px) scale(1.08); }
          }

          .pattern-trajectory-radar-sweep { animation: trajectoryRadarSweep 7s linear infinite; }
          @keyframes trajectoryRadarSweep {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .pattern-trajectory-hex-ripple { animation: trajectoryHexRipple 6s ease-in-out infinite alternate; }
          @keyframes trajectoryHexRipple {
            0% { transform: scale(0.92) translate(0, 0); }
            50% { transform: scale(1.12) translate(6px, -4px); }
            100% { transform: scale(0.98) translate(-4px, 4px); }
          }

          .pattern-trajectory-counter-spin { animation: trajectoryCounterSpin 16s linear infinite; }
          @keyframes trajectoryCounterSpin {
            0% { transform: rotate(0deg) scale(0.95); }
            50% { transform: rotate(-180deg) scale(1.1); }
            100% { transform: rotate(-360deg) scale(0.95); }
          }

          .pattern-trajectory-vertical-float { animation: trajectoryVerticalFloat 6s ease-in-out infinite alternate; }
          @keyframes trajectoryVerticalFloat {
            0% { transform: translateY(8px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(6px); }
          }

          .pattern-trajectory-starlight-flow { animation: trajectoryStarlightFlow 10s ease-in-out infinite alternate; }
          @keyframes trajectoryStarlightFlow {
            0% { transform: translate(-10px, -6px) rotate(-3deg); }
            50% { transform: translate(8px, 8px) rotate(4deg); }
            100% { transform: translate(14px, -10px) rotate(-2deg); }
          }

          /* Dynamic Theme Palettes */
          /* 1. SDP (Royal Blue) */
          .theme-sdp .card-ambient-shadow { background: #2563eb; }
          .theme-sdp .card-surface { background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1d4ed8 100%); }
          .theme-sdp .geo-layer { border-color: rgba(96, 165, 250, 0.45); }
          .theme-sdp .layer-core { background: rgba(147, 197, 253, 0.25); }

          /* 2. ERP (Emerald Green) */
          .theme-erp .card-ambient-shadow { background: #059669; }
          .theme-erp .card-surface { background: linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%); }
          .theme-erp .geo-layer { border-color: rgba(52, 211, 153, 0.45); }
          .theme-erp .layer-core { background: rgba(110, 231, 183, 0.25); }

          /* 3. CRM (Deep Violet) */
          .theme-crm .card-ambient-shadow { background: #7c3aed; }
          .theme-crm .card-surface { background: linear-gradient(135deg, #4c1d95 0%, #5b21b6 50%, #6d28d9 100%); }
          .theme-crm .geo-layer { border-color: rgba(167, 139, 250, 0.45); }
          .theme-crm .layer-core { background: rgba(196, 181, 253, 0.25); }

          /* 4. HRM (Sunset Orange) */
          .theme-hrm .card-ambient-shadow { background: #ea580c; }
          .theme-hrm .card-surface { background: linear-gradient(135deg, #7c2d12 0%, #9a3412 50%, #c2410c 100%); }
          .theme-hrm .geo-layer { border-color: rgba(251, 146, 60, 0.45); }
          .theme-hrm .layer-core { background: rgba(255, 237, 213, 0.25); }

          /* 5. BPM (Cyan Teal) */
          .theme-bpm .card-ambient-shadow { background: #0891b2; }
          .theme-bpm .card-surface { background: linear-gradient(135deg, #164e63 0%, #155e75 50%, #0e7490 100%); }
          .theme-bpm .geo-layer { border-color: rgba(34, 211, 238, 0.45); }
          .theme-bpm .layer-core { background: rgba(165, 243, 252, 0.25); }

          /* 6. OKR (Crimson Rose) */
          .theme-okr .card-ambient-shadow { background: #e11d48; }
          .theme-okr .card-surface { background: linear-gradient(135deg, #881337 0%, #9f1239 50%, #be123c 100%); }
          .theme-okr .geo-layer { border-color: rgba(251, 113, 133, 0.45); }
          .theme-okr .layer-core { background: rgba(254, 205, 211, 0.25); }

          /* 7. CLP (Gold Amber) */
          .theme-clp .card-ambient-shadow { background: #d97706; }
          .theme-clp .card-surface { background: linear-gradient(135deg, #78350f 0%, #92400e 50%, #b45309 100%); }
          .theme-clp .geo-layer { border-color: rgba(251, 191, 36, 0.45); }
          .theme-clp .layer-core { background: rgba(254, 243, 199, 0.25); }

          /* 8. LMS (Indigo Electric) */
          .theme-lms .card-ambient-shadow { background: #4f46e5; }
          .theme-lms .card-surface { background: linear-gradient(135deg, #312e81 0%, #3730a3 50%, #4338ca 100%); }
          .theme-lms .geo-layer { border-color: rgba(129, 140, 248, 0.45); }
          .theme-lms .layer-core { background: rgba(224, 231, 255, 0.25); }

          /* 9. CSC (Sky Azure) */
          .theme-csc .card-ambient-shadow { background: #0284c7; }
          .theme-csc .card-surface { background: linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0369a1 100%); }
          .theme-csc .geo-layer { border-color: rgba(56, 189, 248, 0.45); }
          .theme-csc .layer-core { background: rgba(224, 242, 254, 0.25); }

          /* 10. BI (Neon Yellow/Dark) */
          .theme-bi .card-ambient-shadow { background: #ca8a04; }
          .theme-bi .card-surface { background: linear-gradient(135deg, #422006 0%, #713f12 50%, #854d0e 100%); }
          .theme-bi .geo-layer { border-color: rgba(250, 204, 21, 0.55); }
          .theme-bi .layer-core { background: rgba(254, 240, 138, 0.3); }

          /* 11. AI (Cosmic Fuchsia) */
          .theme-ai .card-ambient-shadow { background: #c026d3; }
          .theme-ai .card-surface { background: linear-gradient(135deg, #701a75 0%, #86198f 50%, #a21caf 100%); }
          .theme-ai .geo-layer { border-color: rgba(232, 121, 249, 0.45); }
          .theme-ai .layer-core { background: rgba(250, 232, 255, 0.25); }

          /* 12. POS (Lime Emerald) */
          .theme-pos .card-ambient-shadow { background: #65a30d; }
          .theme-pos .card-surface { background: linear-gradient(135deg, #365314 0%, #3f6212 50%, #4d7c0f 100%); }
          .theme-pos .geo-layer { border-color: rgba(163, 230, 53, 0.45); }
          .theme-pos .layer-core { background: rgba(236, 252, 203, 0.25); }

          /* Left Content Area */
          .card-left {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            justify-content: center;
            max-width: 68%;
          }

          .card-code {
            font-size: 1.45rem;
            font-weight: 900;
            color: #ffffff;
            line-height: 1.1;
            letter-spacing: 0.5px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          }

          .card-subtext {
            font-size: 0.75rem;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.88);
            margin-top: 3px;
            line-height: 1.25;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .card-status {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 0.68rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.72);
            margin-top: 0px;
            letter-spacing: 0.2px;
          }

          .status-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #4ade80;
            box-shadow: 0 0 6px #4ade80;
            animation: statusPulse 2s infinite ease-in-out;
          }

          /* Right Vector Art Icon Container */
          .card-right {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
          }

          .vector-art {
            width: 40px;
            height: 40px;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.35));
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.35s ease;
            animation: gentleFloat 4s ease-in-out infinite alternate;
          }

          .format-card:hover .vector-art,
          .format-card:hover .system-card-icon-animated {
            transform: scale(1.15) rotate(3deg);
            filter: drop-shadow(0 8px 16px rgba(0,0,0,0.5)) drop-shadow(0 0 12px rgba(255,255,255,0.4));
          }

          @keyframes gentleFloat {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-4px); }
          }

          @keyframes statusPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.85); }
          }

          /* Circular Video Thumbnail Hover Glow & Pulsing */
          .video-circle-thumb {
            animation: circlePulse 2.2s infinite alternate ease-in-out;
          }
          @keyframes circlePulse {
            0% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.4), 0 10px 25px -5px rgba(0, 0, 0, 0.3); }
            100% { box-shadow: 0 0 25px 8px rgba(244, 63, 94, 0.35), 0 15px 30px -5px rgba(225, 29, 72, 0.4); }
          }

          /* Optimal Video Character Framing */
          .video-character-frame {
            object-fit: cover;
            object-position: center 22%;
            filter: contrast(1.08) brightness(1.04) saturate(1.06);
            image-rendering: -webkit-optimize-contrast;
          }
        `}</style>

        {/* Container Systems - đem nội dung ra ngoài thẻ chứa */}
        <div id="info-card-systems" className="w-full h-full flex-1 min-h-0 flex flex-col justify-between gap-2 relative z-10 overflow-hidden">
          {/* Header Card Hệ thống bên trong thẻ chứa */}
          <div className="w-full shrink-0 flex flex-col gap-1 pb-1.5 border-b border-slate-200/60 dark:border-slate-800/60">
            {/* Dòng 1 : Icon tiêu đề thẻ & Tiêu đề H2 cùng màu icon */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <Cpu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                </div>
                <h2 className="text-base sm:text-lg lg:text-xl font-black tracking-tight text-blue-600 dark:text-blue-400">
                  {isVi ? "Hệ thống công nghệ" : "Enterprise technology systems architecture"}
                </h2>
              </div>

              {/* Play / Pause Video Action Button - Circular Popup Style with tech GIF */}
              <div className="flex items-center gap-2 ml-auto shrink-0">
                <button
                  type="button"
                  onClick={toggleVideoPlay}
                  className={cn(
                    "relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 shadow-lg transition-all duration-300 active:scale-95 group cursor-pointer focus:outline-none flex items-center justify-center",
                    isVideoPlaying 
                      ? "border-amber-500 ring-2 ring-rose-500/50 scale-105" 
                      : "border-blue-500/40 hover:border-rose-500 dark:border-blue-400/40 dark:hover:border-rose-400 shadow-rose-500/10"
                  )}
                  title={isVideoPlaying ? (isVi ? "Tạm dừng & Thu gọn thẻ hệ thống" : "Pause & Collapse Video") : (isVi ? "Phát Video toàn khung hệ thống" : "Play Fullscreen Ecosystem Video")}
                  aria-label={isVideoPlaying ? t.pause : t.playVideo}
                >
                  {/* Technology Looping GIF in background */}
                  <img
                    src="https://media.giphy.com/media/3o7qE1YN7aBOFPRw8E/giphy.gif"
                    alt="Ecosystem GIF Preview"
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.65] group-hover:brightness-[0.8] transition-all duration-300 scale-110 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all" />

                  {/* Play Button at the bottom center of the circle */}
                  <div className="absolute bottom-1 sm:bottom-1.5 left-1/2 -translate-x-1/2 z-10 bg-rose-600/90 group-hover:bg-rose-500 text-white rounded-full px-2.5 py-0.5 flex items-center justify-center gap-1 shadow-md border border-white/20 transition-all scale-95 group-hover:scale-105 max-w-[95%] truncate">
                    {isVideoPlaying ? (
                      <>
                        <Pause className="w-2.5 h-2.5 fill-current animate-pulse" />
                        <span className="text-[8px] font-black tracking-wider uppercase">{isVi ? "DỪNG" : "PAUSE"}</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-2.5 h-2.5 ml-0.5 fill-current" />
                        <span className="text-[8px] font-black tracking-wider uppercase">{isVi ? "PHÁT" : "PLAY"}</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Dòng 3 : Đường line Gạch màu như màu icon */}
            <div className="h-[2px] w-full bg-blue-500/30 dark:bg-blue-500/20 my-0.5" />

            {/* Dòng 4 : Tiện ích & Thông số */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 pt-0.5 w-full">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-4 bg-blue-600 dark:bg-blue-400 rounded-full shrink-0" />
                <span className="text-[11px] font-mono font-black text-blue-700 dark:text-blue-400 bg-blue-500/15 px-2 py-0.5 rounded-full border border-blue-500/30 shadow-2xs">
                  {isVi ? `${filteredSystems.length} Nền tảng chuyên sâu` : `${filteredSystems.length} Core Platforms`}
                </span>
                {isVideoPlaying && (
                  <span className="text-[11px] font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/30 animate-pulse flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
                    Đang phát video giới thiệu hệ sinh thái
                  </span>
                )}
              </div>

              {/* Category Filter Pills (chỉ hiển thị khi không phát video) */}
              {!isVideoPlaying && (
                <div className="flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900/90 backdrop-blur-md p-0.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs sm:ml-auto">
                  {(['all', 'platform', 'enterprise', 'growth'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => { setCurrentCategory(cat); }}
                      className={cn(
                        "px-2 py-0.5 rounded-lg text-[11px] font-bold tracking-wide transition-all cursor-pointer active:scale-95",
                        currentCategory === cat
                          ? "bg-blue-600 text-white shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      {cat === 'all' ? (currentLang === 'vi' ? "Tất cả" : "All") :
                       cat === 'platform' ? (currentLang === 'vi' ? "Nền tảng" : "Platform") :
                       cat === 'enterprise' ? (currentLang === 'vi' ? "Quản trị" : "Enterprise") :
                       (currentLang === 'vi' ? "Tăng trưởng" : "Growth")}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Khi phát video: Hiện popup video nổi ở trung tâm màn hình */}
          {isVideoPlaying && (
            <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
              <div className="relative w-full max-w-4xl rounded-3xl bg-slate-950 border border-rose-500/50 shadow-[0_20px_60px_rgba(225,29,72,0.35)] overflow-hidden flex flex-col justify-between aspect-video max-h-[85vh] group animate-scale-in">
              {/* Full Video Stream */}
              <video
                ref={fullVideoRef}
                playsInline
                autoPlay
                className="w-full h-full object-contain absolute inset-0 z-0 bg-black cursor-pointer"
                src="https://cdn.scena.ai/project/8606/ac120a105730c378447fd67f5e8b6aeb9557b5e4e8854ac2e21148d5316f780b.mp4"
                onClick={toggleFullVideoPlayback}
                onEnded={() => {
                  setIsVideoPlaying(false);
                  setFullVideoPaused(true);
                }}
              />

              {/* Gradient Vignette Overlays */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/70 z-10" />

              {/* Top Video Overlay Bar */}
              <div className="relative z-20 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-black/70 to-transparent">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/85 border border-rose-500/40 backdrop-blur-md text-white">
                  <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping"></span>
                  <span className="text-xs font-black tracking-wider uppercase text-rose-300">
                    {t.videoIntroTitle} • ECOSYSTEM ARCHITECTURE
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleVideoMute}
                    className="p-2 rounded-full bg-slate-900/85 hover:bg-slate-800 border border-white/20 text-white text-xs transition-transform active:scale-90 cursor-pointer shadow-md"
                    title={fullVideoMuted ? "Bật âm thanh" : "Tắt âm thanh"}
                  >
                    {fullVideoMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-rose-400" />}
                  </button>

                  <button
                    onClick={toggleVideoPlay}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-transform active:scale-95 cursor-pointer shadow-md"
                    title="Tạm dừng và trở lại thẻ hệ thống"
                  >
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>Thu gọn</span>
                  </button>
                </div>
              </div>

              {/* Center Play/Pause Indicator Button on Hover */}
              <div className="relative z-20 flex-1 flex items-center justify-center pointer-events-none">
                <button
                  type="button"
                  onClick={toggleFullVideoPlayback}
                  className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 backdrop-blur-md shadow-2xl cursor-pointer border-2 border-white/40 active:scale-90"
                  title={fullVideoPaused ? t.playVideo : t.pause}
                >
                  {fullVideoPaused ? <Play className="w-8 h-8 ml-1 fill-current" /> : <Pause className="w-8 h-8 fill-current" />}
                </button>
              </div>

              {/* Bottom Video Info & Control Bar */}
              <div className="relative z-20 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-t from-black/85 to-transparent">
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-black text-white drop-shadow-md">
                    Hệ sinh thái nền tảng chuyển đổi số toàn diện SDP - ERP - CRM - HRM
                  </span>
                  <span className="text-[11px] text-white/70">
                    Nhấn vào video hoặc nút tạm dừng để quay lại danh sách thẻ hệ thống
                  </span>
                </div>

                <button
                  onClick={toggleFullVideoPlayback}
                  className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  {fullVideoPaused ? <Play className="w-3.5 h-3.5 fill-current text-rose-400" /> : <Pause className="w-3.5 h-3.5 fill-current text-rose-400" />}
                  <span>{fullVideoPaused ? "Tiếp tục phát" : "Tạm dừng & Thu gọn"}</span>
                </button>
              </div>
            </div>
          </div>
          )}

          <div className="cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 py-2 w-full flex-1 min-h-0 overflow-y-auto">
              {filteredSystems.map((item) => {
                const isExpanded = expandedKeys.has(item.key);
                const themeClasses = getCardThemeClasses(item.key);

                return (
                  <div
                    key={item.key}
                    onClick={(e) => handleCardClick(item.key, e)}
                  className={cn(
                    "format-card cursor-pointer transition-all duration-500 select-none relative overflow-hidden",
                    themeClasses,
                    isExpanded ? "card-expanded z-20 shadow-2xl ring-2 ring-white/60" : ""
                  )}
                >
                  <div className={cn("card-ambient-shadow transition-all duration-500", isExpanded && "opacity-90 blur-xl")} />

                  <div className={cn(
                    "card-surface relative z-10 p-3.5 sm:p-4 transition-all duration-500 overflow-hidden",
                    isExpanded ? "flex flex-col justify-between h-auto gap-3.5" : "flex flex-col justify-between h-full w-full"
                  )}>
                    {/* Hiệu ứng hoa văn ngẫu nhiên chuyển động theo các tuyến khác nhau */}
                    <CardTrajectoryMotifs itemKey={item.key} />
                    {!isExpanded ? (
                      /* Collapsed State:
                         Dòng 1 : Trang làm việc chính (Tên hệ thống)
                         Dòng 2 : SDP bên trái và Icon bên phải (Mã hệ thống + Icon)
                         Dòng 3 : Trang làm việc chính (Tag phân loại / Trạng thái)
                      */
                      <div className="flex flex-col justify-between h-full w-full relative z-10 select-none py-0.5">
                        {/* Dòng 1 : Trang làm việc chính */}
                        <div className="w-full text-xs sm:text-[13px] font-semibold text-white/95 leading-tight truncate tracking-wide drop-shadow-xs">
                          {currentLang === 'vi' ? item.name : item.nameEn}
                        </div>

                        {/* Dòng 2 : SDP bên trái và Icon bên phải */}
                        <div className="flex items-center justify-between w-full py-0.5 my-auto">
                          <span className="card-code text-xl sm:text-2xl font-black text-white tracking-tight leading-none font-mono drop-shadow-sm">
                            {item.key}
                          </span>
                          <div className="card-right shrink-0 flex items-center justify-center">
                            <SystemOrbitIcon itemKey={item.key} size="md" />
                          </div>
                        </div>

                        {/* Dòng 3 : Trang làm việc chính */}
                        <div className="card-status flex items-center gap-1.5 text-[11px] font-medium text-white/80 leading-none">
                          <span className="status-dot shrink-0" />
                          <span className="truncate">{currentLang === 'vi' ? item.pillTag : item.pillTagEn}</span>
                        </div>
                      </div>
                    ) : (
                      /* Expanded State: Icon moves to Left, card reveals description & link button */
                      <div className="flex flex-col w-full gap-3">
                        {/* Top header row: Icon moved to the Left */}
                        <div className="flex items-center justify-between w-full border-b border-white/20 pb-2.5">
                          <div className="flex items-center gap-3">
                            <motion.div
                              initial={{ x: 25, scale: 0.8, opacity: 0 }}
                              animate={{ x: 0, scale: 1, opacity: 1 }}
                              transition={{ type: "spring", stiffness: 350, damping: 25 }}
                              className="shrink-0 p-1 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-md"
                            >
                              <SystemOrbitIcon itemKey={item.key} size="md" />
                            </motion.div>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="card-code text-xl font-black tracking-tight">{item.key}</span>
                                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-white/25 border border-white/30 font-bold text-white shadow-xs">
                                  {currentLang === 'vi' ? item.pillTag : item.pillTagEn}
                                </span>
                              </div>
                              <div className="text-xs sm:text-sm font-bold text-white/95 mt-0.5 line-clamp-1">
                                {currentLang === 'vi' ? item.name : item.nameEn}
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleCardClick(item.key, e); }}
                            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer shrink-0"
                            title="Thu gọn"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Revealed Content Body */}
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="flex flex-col gap-2.5"
                        >
                          <p className="text-xs sm:text-sm text-white/95 leading-relaxed bg-black/30 p-3.5 rounded-xl border border-white/15 backdrop-blur-md shadow-inner font-normal">
                            {item.desc}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] sm:text-xs font-medium text-white/90">
                            {item.features.map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span className="truncate">{feat}</span>
                              </div>
                            ))}
                          </div>

                          {/* Footer Action Button */}
                          <div className="flex items-center justify-between pt-2 border-t border-white/15 mt-1">
                            <span className="text-[11px] text-emerald-300 font-bold flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                              {t.allSystemsOperational}
                            </span>

                            {item.link && item.link !== "(Đang triển khai)" ? (
                              <button
                                type="button"
                                onClick={(e) => openSystemLink(item.link, e)}
                                className="action-btn inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-900 font-extrabold text-xs shadow-xl hover:bg-slate-100 active:scale-95 transition-all cursor-pointer border border-white/40"
                              >
                                <span>{currentLang === 'vi' ? "Truy cập hệ thống" : "Access System"}</span>
                                <ArrowUpRight className="w-4 h-4 text-blue-600" />
                              </button>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-white/70 text-xs font-semibold border border-white/20">
                                <Info className="w-3.5 h-3.5" />
                                <span>{t.underDevelopment}</span>
                              </span>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalSystem && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg glass-card bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-2xl overflow-hidden p-6 text-slate-900 dark:text-slate-100">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 p-1.5 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-100/50 dark:bg-slate-800/50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <div 
                className="p-1.5 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-sm border bg-white/50 dark:bg-slate-800/50"
                style={{
                  borderColor: `${modalSystem.color}40`
                }}
              >
                <SystemOrbitIcon itemKey={modalSystem.key} size="lg" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider" style={{ color: modalSystem.color }}>
                    {modalSystem.key}
                  </span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    ({modalSystem.nameEn})
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                  {currentLang === 'vi' ? modalSystem.name : modalSystem.nameEn}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed bg-slate-100/50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm">
              {modalSystem.desc}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                {t.featuresTitle}
              </h4>
              <ul className="space-y-2.5">
                {modalSystem.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-100/50 dark:bg-slate-800/50 rounded-xl transition-colors"
              >
                {t.close}
              </button>
              
              {modalSystem.link && modalSystem.link !== "(Đang triển khai)" ? (
                <a
                  href={modalSystem.link.startsWith('http') ? modalSystem.link : 'https://' + modalSystem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-900 dark:text-white rounded-xl shadow-lg transition-all hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: modalSystem.color }}
                >
                  <span>{t.accessNow}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="px-3 py-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-200/50 dark:bg-slate-800/50 rounded-xl border border-slate-200/20 dark:border-slate-700">
                  {t.underDevelopment}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Systems;
