import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  Globe,
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  ShoppingCart,
  ShieldCheck,
  Wallet,
  Layers,
  Gamepad2,
  Briefcase,
  CheckCircle2,
  Sparkles,
  X,
  Search,
  ExternalLink,
  Headphones,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sliders,
  Maximize2,
  Minimize2,
  Check,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  FileText,
  Clock,
  Cpu,
  Award,
  Grid,
  BookOpen,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { cn } from "../lib/utils";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";

interface BrandLogo {
  name: string;
  url: string;
  color?: string;
}

const COLOR_PALETTE = [
  "#4f46e5", // Indigo
  "#0284c7", // Sky Blue
  "#059669", // Emerald
  "#d97706", // Amber
  "#9333ea", // Purple
  "#e11d48", // Rose
];

// Bento Grid Container & Card Motion Variants matching Education.tsx
const bentoContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.05,
    },
  },
};

const bentoCardVariants: any = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.97,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Detailed Industry Master Information for Modal & Enhanced Visual Cards
const INDUSTRY_DETAILS_MAP: Record<
  string,
  {
    tagline: string;
    experienceYears: string;
    headcountScope: string;
    keyProjects: string[];
    achievements: string[];
    techStack: string[];
    coreRole: string;
  }
> = {
  "Viễn thông di động": {
    tagline:
      "Nền tảng vận hành & Chăm sóc khách hàng quy mô lớn tiêu chuẩn tập đoàn",
    experienceYears: "10+ Năm",
    headcountScope: "50 - 130+ Nhân sự",
    keyProjects: [
      "1.1 · Xây dựng và vận hành Phòng Dịch vụ Khách hàng",
      "2.1 · Chuẩn hóa quy trình chăm sóc khách hàng",
      "2.2 · Tối ưu hóa các kênh hỗ trợ khách hàng",
    ],
    achievements: [
      "Quản lý & duy trì chỉ số SLA tổng đài luôn đạt trên 98%",
      "Chuẩn hóa 100% kịch bản tư vấn và xử lý khiếu nại cước dịch vụ",
      "Xây dựng đội ngũ tư vấn viên chuyên nghiệp có tỷ lệ nghỉ việc < 3%",
    ],
    techStack: ["Avaya CallCenter", "AICC System", "SOP Matrix", "CRM Telecom"],
    coreRole: "Trưởng phòng CSKH / Quản lý Vận hành Tổng đài",
  },
  "Thương mại điện tử": {
    tagline:
      "Xử lý hàng triệu giao dịch & Chăm sóc khách hàng đa kênh tốc độ cao",
    experienceYears: "6+ Năm",
    headcountScope: "100+ Nhân sự CSKH & Fraud",
    keyProjects: [
      "2.3 · Tự động hóa quy trình chăm sóc khách hàng",
      "3.1 · Xây dựng hệ thống quản lý thông tin khách hàng",
      "5.1 · Thành lập và vận hành Trung tâm Hỗ trợ Khách hàng",
    ],
    achievements: [
      "Tối ưu tỷ lệ phản hồi Chatbot & Live Chat giảm thời gian chờ xuống < 30 giây",
      "Xây dựng bộ quy trình kiểm soát gian lận đơn hàng & thanh toán trực tuyến",
      "Nâng chỉ số hài lòng khách hàng CSAT từ 88% lên 96.5%",
    ],
    techStack: [
      "Zendesk Omnichannel",
      "Shopee Admin CRM",
      "Live Chat Auto-router",
      "Power BI",
    ],
    coreRole: "Customer Service Operations Manager",
  },
  "Bảo hiểm nhân thọ": {
    tagline:
      "Xây dựng sự tin cậy tuyệt đối & Chuẩn hóa quy trình chăm sóc khách hàng cao cấp",
    experienceYears: "3+ Năm",
    headcountScope: "40+ Chuyên viên tư vấn",
    keyProjects: [
      "1.3 · Nâng cao chất lượng trải nghiệm khách hàng",
      "2.5 · Quản lý đối tác thuê ngoài chăm sóc khách hàng",
      "3.3 · Khảo sát và đánh giá mức độ hài lòng",
    ],
    achievements: [
      "Kiến tạo trải nghiệm khách hàng tiêu chuẩn 5 sao ngành tài chính - bảo hiểm",
      "Giảm 45% thời gian xử lý yêu cầu thay đổi thông tin hợp đồng",
      "Đạt tỷ lệ giải quyết khiếu nại thành công ngay từ lần gọi đầu tiên (FCR) > 92%",
    ],
    techStack: [
      "Prudential Life CRM",
      "AS400 System",
      "Voice Recording Quality Checklist",
    ],
    coreRole: "Call Center Project & Quality Manager",
  },
  "Thể thao điện tử": {
    tagline:
      "Hỗ trợ cộng đồng hàng triệu Gamers & Đồng hành cùng các giải đấu eSports đỉnh cao",
    experienceYears: "5+ Năm",
    headcountScope: "80+ Game Supporter",
    keyProjects: [
      "1.4 · Quản lý và triển khai dự án chăm sóc khách hàng",
      "3.4 · Xây dựng trợ lý ảo chăm sóc khách hàng",
      "5.1 · Thành lập và vận hành Trung tâm Hỗ trợ Khách hàng",
    ],
    achievements: [
      "Vận hành hệ thống Ticket hỗ trợ game thủ với lưu lượng xử lý 50,000+ yêu cầu/ngày",
      "Bảo mật tài khoản & hỗ trợ khôi phục vật phẩm game tức thì",
      "Phối hợp tổ chức trực tiếp các điểm hỗ trợ CSKH tại giải đấu eSports lớn",
    ],
    techStack: [
      "Garena Customer Desk",
      "Gcafe Management Tool",
      "AI Ticket Classifier",
    ],
    coreRole: "Head of Game Customer Support",
  },
  "Ví điện tử": {
    tagline:
      "An toàn giao dịch tài chính số & Chăm sóc người dùng FinTech 24/7",
    experienceYears: "5+ Năm",
    headcountScope: "120+ Nhân sự FinTech CS",
    keyProjects: [
      "1.6 · Quản lý khủng hoảng và giảm khách hàng rời bỏ",
      "2.4 · Quản lý hoạt động chăm sóc khách hàng chủ động",
      "3.2 · Phân tích và báo cáo dữ liệu khách hàng",
    ],
    achievements: [
      "Hệ thống giám sát giao dịch trực tuyến & cảnh báo lừa đảo công nghệ cao",
      "Thiết lập quy trình xử lý tra soát khiếu nại tài chính trong vòng 2 giờ",
      "Đạt tỷ lệ đánh giá dịch vụ CSAT 98.2% trên các kênh hỗ trợ số",
    ],
    techStack: [
      "MoMo Admin CRM",
      "ShopeePay Merchant Portal",
      "FinTech Security Gateway",
    ],
    coreRole: "FinTech Customer Care Operations Lead",
  },
  "Xây dựng hệ thống": {
    tagline:
      "Tư vấn giải pháp toàn diện từ con người, quy trình đến chuyển đổi số",
    experienceYears: "22+ Năm",
    headcountScope: "Tư vấn Doanh nghiệp",
    keyProjects: [
      "1.2 · Thiết lập mục tiêu và chỉ tiêu hoạt động",
      "4.1 · Phát triển chương trình đào tạo trực tuyến",
      "4.2 · Xây dựng khung năng lực và lộ trình phát triển",
    ],
    achievements: [
      "Thiết kế trọn gói mô hình Contact Center từ 10 đến 100+ vị trí ngồi",
      "Đóng gói tài liệu SOP, kịch bản giao tiếp & KPI scorecard chuẩn hóa",
      "Đào tạo & chuyển giao công nghệ cho đội ngũ quản lý kế thừa",
    ],
    techStack: [
      "Zoho CRM",
      "Salesforce",
      "Notion SOP Matrix",
      "Process Flowcharting",
    ],
    coreRole: "CX & Service System Consultant",
  },
};

const INDUSTRY_CATEGORIES = [
  { id: "all", titleVi: "Tất cả", titleEn: "All" },
  { id: "telecom", titleVi: "Viễn thông", titleEn: "Telecom" },
  { id: "fintech", titleVi: "FinTech & eCom", titleEn: "FinTech & eCom" },
  { id: "insurance", titleVi: "Bảo hiểm & Khác", titleEn: "Insurance & CX" },
];

const CARD_THEME_STYLES: Record<
  string,
  {
    accentColor: string;
    bgGradient: string;
    borderClass: string;
    iconBgClass: string;
    dotColor: string;
  }
> = {
  "Viễn thông di động": {
    accentColor: "#7c3aed",
    bgGradient: "bg-white/70 dark:bg-slate-900/65 backdrop-blur-2xl hover:bg-white/85 dark:hover:bg-slate-900/80",
    borderClass: "border border-purple-500/35 dark:border-purple-400/30 hover:border-purple-500 dark:hover:border-purple-400 shadow-[0_10px_30px_-5px_rgba(124,58,237,0.12)] hover:shadow-[0_14px_40px_-5px_rgba(124,58,237,0.3)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_14px_40px_-5px_rgba(168,85,247,0.35)]",
    iconBgClass: "bg-purple-100/80 dark:bg-purple-950/70 border-purple-200/90 dark:border-purple-800/80 text-purple-600 dark:text-purple-400",
    dotColor: "#7c3aed",
  },
  "Thương mại điện tử": {
    accentColor: "#ea580c",
    bgGradient: "bg-white/70 dark:bg-slate-900/65 backdrop-blur-2xl hover:bg-white/85 dark:hover:bg-slate-900/80",
    borderClass: "border border-orange-500/35 dark:border-orange-400/30 hover:border-orange-500 dark:hover:border-orange-400 shadow-[0_10px_30px_-5px_rgba(234,88,12,0.12)] hover:shadow-[0_14px_40px_-5px_rgba(234,88,12,0.3)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_14px_40px_-5px_rgba(249,115,22,0.35)]",
    iconBgClass: "bg-orange-100/80 dark:bg-orange-950/70 border-orange-200/90 dark:border-orange-800/80 text-orange-600 dark:text-orange-400",
    dotColor: "#ea580c",
  },
  "Bảo hiểm nhân thọ": {
    accentColor: "#0284c7",
    bgGradient: "bg-white/70 dark:bg-slate-900/65 backdrop-blur-2xl hover:bg-white/85 dark:hover:bg-slate-900/80",
    borderClass: "border border-sky-500/35 dark:border-sky-400/30 hover:border-sky-500 dark:hover:border-sky-400 shadow-[0_10px_30px_-5px_rgba(2,132,199,0.12)] hover:shadow-[0_14px_40px_-5px_rgba(2,132,199,0.3)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_14px_40px_-5px_rgba(56,189,248,0.35)]",
    iconBgClass: "bg-sky-100/80 dark:bg-sky-950/70 border-sky-200/90 dark:border-sky-800/80 text-sky-600 dark:text-sky-400",
    dotColor: "#0284c7",
  },
  "Thể thao điện tử": {
    accentColor: "#059669",
    bgGradient: "bg-white/70 dark:bg-slate-900/65 backdrop-blur-2xl hover:bg-white/85 dark:hover:bg-slate-900/80",
    borderClass: "border border-emerald-500/35 dark:border-emerald-400/30 hover:border-emerald-500 dark:hover:border-emerald-400 shadow-[0_10px_30px_-5px_rgba(5,150,105,0.12)] hover:shadow-[0_14px_40px_-5px_rgba(5,150,105,0.3)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_14px_40px_-5px_rgba(52,211,153,0.35)]",
    iconBgClass: "bg-emerald-100/80 dark:bg-emerald-950/70 border-emerald-200/90 dark:border-emerald-800/80 text-emerald-600 dark:text-emerald-400",
    dotColor: "#059669",
  },
  "Ví điện tử": {
    accentColor: "#eab308",
    bgGradient: "bg-white/70 dark:bg-slate-900/65 backdrop-blur-2xl hover:bg-white/85 dark:hover:bg-slate-900/80",
    borderClass: "border border-amber-500/35 dark:border-amber-400/30 hover:border-amber-500 dark:hover:border-amber-400 shadow-[0_10px_30px_-5px_rgba(234,179,8,0.12)] hover:shadow-[0_14px_40px_-5px_rgba(234,179,8,0.3)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_14px_40px_-5px_rgba(251,191,36,0.35)]",
    iconBgClass: "bg-yellow-300/80 dark:bg-yellow-950/90 border-yellow-400 dark:border-yellow-500 text-yellow-800 dark:text-yellow-300 font-extrabold",
    dotColor: "#eab308",
  },
  "Xây dựng hệ thống": {
    accentColor: "#e11d48",
    bgGradient: "bg-white/70 dark:bg-slate-900/65 backdrop-blur-2xl hover:bg-white/85 dark:hover:bg-slate-900/80",
    borderClass: "border border-rose-500/35 dark:border-rose-400/30 hover:border-rose-500 dark:hover:border-rose-400 shadow-[0_10px_30px_-5px_rgba(225,29,72,0.12)] hover:shadow-[0_14px_40px_-5px_rgba(225,29,72,0.3)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_14px_40px_-5px_rgba(244,63,94,0.35)]",
    iconBgClass: "bg-rose-100/80 dark:bg-rose-950/70 border-rose-200/90 dark:border-rose-800/80 text-rose-600 dark:text-rose-400",
    dotColor: "#e11d48",
  },
};

interface ServiceCardConfig {
  color: string;
  icon: React.ElementType;
  title: string;
  titleEn?: string;
  category: string;
  image: string;
  desc: string;
  descEn?: string;
  logos: BrandLogo[];
}

const cardConfigs: ServiceCardConfig[] = [
  {
    color: "#7c3aed",
    icon: Smartphone,
    title: "Viễn thông di động",
    titleEn: "Mobile Telecom",
    category: "telecom",
    image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=800&q=80",
    desc: "Hơn 10 năm kinh nghiệm trong ngành viễn thông, từ mạng di động đến dịch vụ gọi quốc tế, xây dựng nền tảng vững chắc về vận hành và Chăm Sóc Khách Hàng quy mô lớn.",
    descEn: "Hơn 10 năm kinh nghiệm trong ngành viễn thông, từ mạng di động đến dịch vụ gọi quốc tế, xây dựng nền tảng vững chắc về vận hành và Chăm Sóc Khách Hàng quy mô lớn.",
    logos: [
      {
        name: "Mobifone",
        url: "https://i.ibb.co/hxHm9TsZ/Mobifone.png",
        color: "#2563eb",
      },
      {
        name: "V247",
        url: "https://i.ibb.co/QvtbdnfP/V247.png",
        color: "#f97316",
      },
      {
        name: "LBC",
        url: "https://i.ibb.co/R4YXWyzF/LBC.png",
        color: "#9333ea",
      },
      {
        name: "HTVC",
        url: "https://i.ibb.co/1fNw0hBq/HTVC.png",
        color: "#0284c7",
      },
    ],
  },
  {
    color: "#ea580c",
    icon: ShoppingCart,
    title: "Thương mại điện tử",
    titleEn: "E-Commerce & Retail",
    category: "fintech",
    image: "https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=800&q=80",
    desc: "Tham gia giai đoạn bùng nổ của thương mại điện tử và ví điện tử, xây dựng nền tảng vận hành, xử lý khiếu nại, kiểm soát gian lận và Chăm Sóc Khách Hàng đa kênh.",
    descEn: "Tham gia giai đoạn bùng nổ của thương mại điện tử và ví điện tử, xây dựng nền tảng vận hành, xử lý khiếu nại, kiểm soát gian lận và Chăm Sóc Khách Hàng đa kênh.",
    logos: [
      {
        name: "Shopee",
        url: "https://i.ibb.co/BSVS4xf/Shopee.png",
        color: "#ee4d2d",
      },
      {
        name: "Finviet",
        url: "https://i.ibb.co/7NtSSz4d/Finviet.png",
        color: "#eab308",
      },
    ],
  },
  {
    color: "#0284c7",
    icon: ShieldCheck,
    title: "Bảo hiểm nhân thọ",
    titleEn: "Life Insurance",
    category: "insurance",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    desc: "Quản lý tổng đài, triển khai dự án tích hợp hệ thống Call Center, tối ưu quy trình vận hành, nâng cao chất lượng tư vấn, cải thiện trải nghiệm và hiệu quả khách hàng toàn diện.",
    descEn: "Quản lý tổng đài, triển khai dự án tích hợp hệ thống Call Center, tối ưu quy trình vận hành, nâng cao chất lượng tư vấn, cải thiện trải nghiệm và hiệu quả khách hàng toàn diện.",
    logos: [
      {
        name: "Prudential",
        url: "https://i.ibb.co/XfpQphWF/Prudential.png",
        color: "#dc2626",
      },
    ],
  },
  {
    color: "#059669",
    icon: Gamepad2,
    title: "Thể thao điện tử",
    titleEn: "eSports & Gaming",
    category: "fintech",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    desc: "Xây dựng, quản lý bộ phận Chăm Sóc Khách Hàng cho nhà phát hành game, vận hành hệ thống hỗ trợ quy mô lớn và đồng hành cùng các sự kiện eSports chuyên nghiệp hiệu quả.",
    descEn: "Xây dựng, quản lý bộ phận Chăm Sóc Khách Hàng cho nhà phát hành game, vận hành hệ thống hỗ trợ quy mô lớn và đồng hành cùng các sự kiện eSports chuyên nghiệp hiệu quả.",
    logos: [
      {
        name: "Garena",
        url: "https://i.ibb.co/h1Md65yV/Garena.png",
        color: "#df2027",
      },
      {
        name: "VED",
        url: "https://i.ibb.co/fYPJLfbw/VED.png",
        color: "#ef4444",
      },
      {
        name: "GCafe",
        url: "https://i.ibb.co/FkWk3s4W/GCafe.png",
        color: "#ff6600",
      },
    ],
  },
  {
    color: "#eab308",
    icon: Wallet,
    title: "Ví điện tử",
    titleEn: "Digital Payments & FinTech",
    category: "fintech",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    desc: "Am hiểu vận hành Chăm Sóc Khách Hàng trong lĩnh vực FinTech, từ xác minh người dùng, xử lý giao dịch đến kiểm soát rủi ro và hỗ trợ đối tác tài chính hiệu quả bền vững.",
    descEn: "Am hiểu vận hành Chăm Sóc Khách Hàng trong lĩnh vực FinTech, từ xác minh người dùng, xử lý giao dịch đến kiểm soát rủi ro và hỗ trợ đối tác tài chính hiệu quả bền vững.",
    logos: [
      {
        name: "MoMo",
        url: "https://i.ibb.co/k2QtrgTw/Momo.png",
        color: "#ec4899",
      },
      {
        name: "ShopeePay",
        url: "https://i.ibb.co/LdYv3TJy/Shopee-Paye.png",
        color: "#ee4d2d",
      },
    ],
  },
  {
    color: "#e11d48",
    icon: Layers,
    title: "Xây dựng hệ thống",
    titleEn: "System Architecture & CX",
    category: "insurance",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    desc: "Tư vấn xây dựng, tối ưu hệ thống Chăm Sóc Khách Hàng toàn diện, từ quy trình, nhân sự đến CRM và tự động hóa, nâng cao hiệu quả vận hành doanh nghiệp tổng thể thực tiễn.",
    descEn: "Tư vấn xây dựng, tối ưu hệ thống Chăm Sóc Khách Hàng toàn diện, từ quy trình, nhân sự đến CRM và tự động hóa, nâng cao hiệu quả vận hành doanh nghiệp tổng thể thực tiễn.",
    logos: [
      {
        name: "Power Service",
        url: "https://i.ibb.co/G4QnNzWb/Power-Service.png",
        color: "#16a34a",
      },
      {
        name: "Logo-VED",
        url: "https://i.ibb.co/BKHcWL5R/Logo-VED.gif",
        color: "#ef4444",
      },
    ],
  },
];

export function Services() {
  const { lang, language } = useLanguage();
  const isVi = (lang || language) === "vi";

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCardTitle, setSelectedCardTitle] = useState<string>("Viễn thông di động");
  const [expandedItemTitle, setExpandedItemTitle] = useState<string | null>(null);

  // 3D Tilt Mouse Movement Handler matching Education.tsx
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = Number(((y - centerY) / centerY) * -10).toFixed(2);
    const rotateY = Number(((x - centerX) / centerX) * 10).toFixed(2);
    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
  };

  // Combine items with master detail map
  const combinedItems = useMemo(() => {
    return cardConfigs.map((cfg) => {
      const details =
        INDUSTRY_DETAILS_MAP[cfg.title] ||
        INDUSTRY_DETAILS_MAP["Viễn thông di động"];

      return {
        ...cfg,
        details,
      };
    });
  }, []);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: combinedItems.length };
    combinedItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [combinedItems]);

  // Filter items based on category & search query
  const filteredItems = useMemo(() => {
    return combinedItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        item.title.toLowerCase().includes(q) ||
        (item.titleEn && item.titleEn.toLowerCase().includes(q)) ||
        item.desc.toLowerCase().includes(q) ||
        (item.descEn && item.descEn.toLowerCase().includes(q)) ||
        item.details.tagline.toLowerCase().includes(q) ||
        item.details.coreRole.toLowerCase().includes(q) ||
        item.details.techStack.some((t) => t.toLowerCase().includes(q)) ||
        item.details.keyProjects.some((p) => p.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [combinedItems, selectedCategory, searchQuery]);

  const handleCardClick = (title: string) => {
    playUiSound("click");
    setSelectedCardTitle(title);
    setExpandedItemTitle(title);
  };

  const handleNavigateToContact = (serviceTitle?: string) => {
    if (serviceTitle) {
      sessionStorage.setItem("contact_selected_skill_topic", serviceTitle);
    }
    window.dispatchEvent(new CustomEvent("app-navigate", { detail: "contact" }));
  };

  // Navigate to previous / next item in expanded view
  const handleNavigateItem = useCallback((direction: "prev" | "next") => {
    if (!expandedItemTitle || filteredItems.length <= 1) return;
    const currentIndex = filteredItems.findIndex((i) => i.title === expandedItemTitle);
    if (currentIndex === -1) return;
    
    playUiSound("click");
    let nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= filteredItems.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = filteredItems.length - 1;
    
    setExpandedItemTitle(filteredItems[nextIndex].title);
  }, [expandedItemTitle, filteredItems]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpandedItemTitle(null);
      } else if (expandedItemTitle) {
        if (e.key === "ArrowRight") {
          handleNavigateItem("next");
        } else if (e.key === "ArrowLeft") {
          handleNavigateItem("prev");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedItemTitle, handleNavigateItem]);

  return (
    <section 
      id="services" 
      className="relative w-full h-full min-h-0 flex flex-col justify-between overflow-hidden p-3 sm:p-4 lg:p-5 font-sans text-slate-800 dark:text-slate-100"
    >
      <div id="card-services-list-content" className="w-full h-full min-h-0 flex flex-col justify-between gap-2.5 sm:gap-3 animate-fadeIn overflow-hidden">
        {/* Tiêu đề thẻ cho Thẻ chứa Danh mục Dịch vụ & Lĩnh vực hoạt động (Format giống Học vấn) */}
        <div className="w-full flex flex-col gap-[8px] pb-3 border-b border-slate-200/60 dark:border-slate-800/60 shrink-0">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
              </div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">
                {isVi ? "Danh mục dịch vụ & Lĩnh vực hoạt động" : "Service Portfolio & Core Expertise"}
              </h2>
            </div>
            {expandedItemTitle && (
              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  setExpandedItemTitle(null);
                }}
                className="px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-xs font-bold hover:bg-emerald-100 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>{isVi ? "Xem tất cả dịch vụ" : "View all services"}</span>
              </button>
            )}
          </div>

          {/* Đường line gạch màu giống Học vấn */}
          <div className="h-[2px] w-full bg-emerald-500/30 dark:bg-emerald-500/20" />
        </div>

        {/* Tiêu đề phụ và bộ đếm hiển thị cho thẻ main card dịch vụ */}
        {!expandedItemTitle && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5 shrink-0 animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-5 bg-emerald-600 dark:bg-emerald-400 rounded-full shrink-0" />
              <span className="text-xs font-mono font-black text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-2xs">
                {isVi ? "DANH MỤC DỊCH VỤ CHI TIẾT" : "DETAILED SERVICES DIRECTORY"}
              </span>
            </div>
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
              {isVi ? `Hiển thị ${filteredItems.length} dịch vụ tư vấn & hỗ trợ` : `Showing ${filteredItems.length} consulting & support services`}
            </div>
          </div>
        )}

        {/* Search and Category Filter Bar for Services */}
        {!expandedItemTitle && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full bg-slate-500/5 dark:bg-slate-950/25 p-2.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md shadow-xs shrink-0 animate-fade-in">
            {/* Categories */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
              {([
                { key: "all", label: isVi ? "Tất cả" : "All" },
                { key: "telecom", label: isVi ? "Viễn thông" : "Telecom" },
                { key: "fintech", label: isVi ? "Thương mại & FinTech" : "E-Comm & FinTech" },
                { key: "insurance", label: isVi ? "Bảo hiểm & Hệ thống" : "Insurance & System" }
              ] as const).map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => {
                    playUiSound("click");
                    setSelectedCategory(cat.key);
                  }}
                  className={cn(
                    "px-3 py-1 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer whitespace-nowrap active:scale-95",
                    selectedCategory === cat.key
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20 border border-emerald-500/20"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-500/10"
                  )}
                >
                  {cat.label}
                  <span className="ml-1 text-[10px] opacity-75 font-mono">
                    ({categoryCounts[cat.key] || 0})
                  </span>
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder={isVi ? "Tìm kiếm dịch vụ, kỹ năng, dự án..." : "Search services, skills, projects..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9.5 pr-8 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 text-xs font-semibold text-slate-800 dark:text-slate-100 placeholder-slate-400/80 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500/20 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* DẠNG VIEW THẺ BENTO GRID 3 CỘT 2 HÀNG */}
        <LayoutGroup>
          <div
            id="services-cards-grid"
            className={cn(
              "flex-1 min-h-0 overflow-y-auto custom-scrollbar py-1 pr-1",
              expandedItemTitle
                ? "flex flex-col w-full"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 items-stretch"
            )}
          >
            {(expandedItemTitle 
              ? filteredItems.filter(i => i.title === expandedItemTitle)
              : filteredItems
            ).map((item, index) => {
              const Icon = item.icon || Globe;
              const theme = CARD_THEME_STYLES[item.title] || {
                accentColor: item.color || COLOR_PALETTE[index % COLOR_PALETTE.length],
                bgGradient: "bg-white/70 dark:bg-slate-900/65 backdrop-blur-2xl hover:bg-white/85 dark:hover:bg-slate-900/80",
                borderClass: "border border-slate-300/40 dark:border-slate-700/40 hover:border-slate-400 shadow-md",
                iconBgClass: "bg-slate-100/80 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300",
                dotColor: item.color || "#4f46e5",
              };
              const accentColor = theme.accentColor;
              const isExpanded = expandedItemTitle === item.title;
              const isSelected = selectedCardTitle === item.title;

              return (
                <motion.div
                  key={item.title}
                  layout
                  variants={bentoCardVariants}
                  tabIndex={0}
                  role="button"
                  aria-label={item.title}
                  onClick={() => handleCardClick(item.title)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCardClick(item.title);
                    }
                  }}
                  onMouseMove={!isExpanded ? handleMouseMove : undefined}
                  onMouseLeave={!isExpanded ? handleMouseLeave : undefined}
                  onMouseEnter={() => playUiSound("hover")}
                  className={cn(
                    "group relative flex flex-col transition-all duration-500 select-none cursor-pointer backdrop-blur-2xl overflow-hidden h-full min-h-[250px] sm:min-h-[265px]",
                    isExpanded 
                      ? "w-full p-5 sm:p-6 md:p-7 rounded-[24px] ring-2 ring-emerald-500/50 dark:ring-emerald-400/50" 
                      : cn(
                          "col-span-1 text-left p-4 sm:p-5 rounded-[20px] justify-between h-full",
                          isSelected
                            ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 shadow-2xl scale-[1.01] -translate-y-1"
                            : "hover:-translate-y-1.5 hover:shadow-xl"
                        ),
                    theme.bgGradient,
                    theme.borderClass
                  )}
                  style={!isExpanded ? {
                    transform: 'perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) scale(var(--scale, 1))',
                    transformStyle: 'preserve-3d',
                    borderColor: isSelected ? accentColor : undefined,
                    boxShadow: isSelected 
                      ? `0 14px 36px -4px ${accentColor}35, 0 0 0 2px ${accentColor}80` 
                      : undefined
                  } : undefined}
                >
                  {/* Glassmorphism Inner Top Light Reflection & Neon Glow */}
                  <div 
                    className={cn(
                      "absolute inset-x-0 top-0 h-28 rounded-t-[20px] pointer-events-none transition-opacity duration-500",
                      isSelected ? "opacity-90" : "opacity-40 group-hover:opacity-100"
                    )}
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%, ${accentColor}35 0%, transparent 75%)`
                    }}
                  />

                  {/* Active Selected Badge (Khi thẻ đang được chọn) */}
                  {!isExpanded && isSelected && (
                    <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide bg-white/90 dark:bg-slate-900/90 border shadow-xs"
                      style={{
                        borderColor: `${accentColor}60`,
                        color: accentColor,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                      <span>{isVi ? "Đang chọn" : "Selected"}</span>
                    </div>
                  )}
                  {isExpanded ? (
                    /* BUNG RỘNG KÍCH THƯỚC THẺ BẰNG VỊ TRÍ CÁC THẺ CÒN LẠI */
                    <div className="w-full flex flex-col gap-4 animate-fadeIn">
                      {/* Expanded Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-700/80 gap-3 flex-wrap">
                        <div className="flex items-center gap-3">
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5] shrink-0" style={{ color: accentColor }} />
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-play font-black text-lg sm:text-xl md:text-2xl tracking-tight" style={{ color: accentColor }}>
                                {isVi ? item.title : (item.titleEn || item.title)}
                              </h3>
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300/60 dark:border-slate-700">
                                {item.details.experienceYears} {isVi ? "kinh nghiệm" : "exp"}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
                              {item.details.tagline}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            playUiSound("click");
                            setExpandedItemTitle(null);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
                        >
                          <Minimize2 className="w-3.5 h-3.5" />
                          <span>{isVi ? "Thu gọn" : "Collapse"}</span>
                        </button>
                      </div>

                      {/* Expanded Content Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                        {/* Column 1: Description & Role & Tech Stack */}
                        <div className="flex flex-col gap-3.5">
                          <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
                              <FileText className="w-3.5 h-3.5" style={{ color: accentColor }} />
                              {isVi ? "Mô tả chuyên môn" : "Overview"}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                              {isVi ? item.desc : (item.descEn || item.desc)}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2.5">
                            <div className="p-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60">
                              <div className="text-[10px] font-bold uppercase text-slate-400">{isVi ? "Vai trò chính" : "Core Role"}</div>
                              <div className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5">{item.details.coreRole}</div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60">
                              <div className="text-[10px] font-bold uppercase text-slate-400">{isVi ? "Quy mô đội ngũ" : "Team Headcount"}</div>
                              <div className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5">{item.details.headcountScope}</div>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                              <Cpu className="w-3.5 h-3.5" style={{ color: accentColor }} />
                              {isVi ? "Công nghệ & Công cụ" : "Tech Stack"}
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {item.details.techStack.map((tech, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-2xs"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Column 2: Key Achievements & Projects */}
                        <div className="flex flex-col justify-between gap-3.5">
                          <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                              <Award className="w-3.5 h-3.5 text-amber-500" />
                              {isVi ? "Kết quả & Thành tựu nổi bật" : "Key Achievements"}
                            </h4>
                            <ul className="space-y-1.5">
                              {item.details.achievements.map((ach, aIdx) => (
                                <li key={aIdx} className="text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{ach}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Brand Logos Row */}
                          <div className="flex items-center gap-3 pt-1">
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0">{isVi ? "Đối tác:" : "Partners:"}</span>
                            <div className="flex flex-wrap items-center gap-2">
                              {item.logos && item.logos.map((logoObj: BrandLogo, lIdx: number) => (
                                <div
                                  key={lIdx}
                                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs"
                                >
                                  <img
                                    src={logoObj.url}
                                    alt={logoObj.name}
                                    className="w-4 h-4 rounded-full object-cover"
                                  />
                                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{logoObj.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNavigateToContact(item.title);
                            }}
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer mt-1"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>{isVi ? `Tư vấn & Hợp tác Lĩnh vực ${item.title}` : `Consult & Partner in ${item.title}`}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* THẺ DỊCH VỤ THƯỜNG (FORMAT BỐ CỤC THẺ HỌC VẤN) */
                    <>
                      {/* Header Row: Icon + Title + Experience Year Badge */}
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex items-center justify-between gap-2 w-full">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center shrink-0 shadow-xs">
                              <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" style={{ color: accentColor }} />
                            </div>
                            <h3 
                              className="font-play font-black text-sm sm:text-base md:text-lg tracking-tight leading-snug truncate"
                              style={{ color: accentColor }}
                            >
                              {isVi ? item.title : (item.titleEn || item.title)}
                            </h3>
                          </div>
                          <span className="text-[10px] sm:text-[11px] font-mono font-black px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0 shadow-2xs">
                            {item.details.experienceYears} {isVi ? "năm" : "yrs"}
                          </span>
                        </div>

                        {/* Tagline */}
                        <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mt-1">
                          {item.details.tagline}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="w-full h-[1px] bg-slate-200/80 dark:bg-slate-800/80 my-2" />

                      {/* Footer: Partner Logos */}
                      <div className="flex items-center justify-between gap-2 w-full mt-auto pt-1">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0">{isVi ? "Đối tác:" : "Partners:"}</span>
                        <div className="flex items-center gap-1.5 flex-wrap justify-end">
                          {item.logos && item.logos.map((logoObj: BrandLogo, lIdx: number) => (
                            <div
                              key={lIdx}
                              className="relative flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white p-0 shadow-2xs transition-transform duration-300 hover:scale-110"
                              title={logoObj.name}
                            >
                              <img
                                src={logoObj.url}
                                alt={logoObj.name}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover rounded-full"
                                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                  const target = e.currentTarget;
                                  target.onerror = null;
                                  target.src = `https://placehold.co/80x80/ffffff/${accentColor.replace('#', '')}?text=${encodeURIComponent(logoObj.name)}`;
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
      </LayoutGroup>
      </div>
    </section>
  );
}

export default Services;
