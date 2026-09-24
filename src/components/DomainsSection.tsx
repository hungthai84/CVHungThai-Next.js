import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  Globe,
  Smartphone,
  ShieldCheck,
  Wallet,
  Layers,
  Gamepad2,
  Briefcase,
  Compass,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Calendar,
  Users,
  Check,
  Phone,
  Search,
  Award,
  Activity,
  Zap,
  CheckCircle2,
  Building2,
  ArrowRight,
  MessageSquare,
  Clock,
  ArrowUpRight,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { cn } from "../lib/utils";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";
import { PageCardHeader } from "./PageCardHeader";
import { ServiceCardBackground } from "./ServiceCardBackground";

interface BrandLogo {
  name: string;
  url: string;
  color: string;
}

const INDUSTRY_CATEGORIES = [
  { id: "all", titleVi: "Tất cả", titleEn: "All" },
  { id: "telecom", titleVi: "Viễn thông", titleEn: "Telecom" },
  { id: "digital", titleVi: "TMĐT, FinTech & Game", titleEn: "E-Com, FinTech & Game" },
  { id: "consulting", titleVi: "Bảo hiểm & Hệ thống", titleEn: "Insurance & Systems" },
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
    bgGradient: "bg-gradient-to-b from-purple-100/70 via-white/95 to-purple-50/40 dark:from-purple-950/35 dark:via-slate-900/90 dark:to-purple-950/25",
    borderClass: "border-purple-200/90 dark:border-purple-800/70 hover:border-purple-400 dark:hover:border-purple-500",
    iconBgClass: "bg-purple-100/80 dark:bg-purple-950/70 border-purple-200/90 dark:border-purple-800/80 text-purple-600 dark:text-purple-400",
    dotColor: "#7c3aed",
  },
  "Thương mại điện tử": {
    accentColor: "#ea580c",
    bgGradient: "bg-gradient-to-b from-orange-100/70 via-white/95 to-orange-50/40 dark:from-orange-950/35 dark:via-slate-900/90 dark:to-orange-950/25",
    borderClass: "border-orange-200/90 dark:border-orange-800/70 hover:border-orange-400 dark:hover:border-orange-500",
    iconBgClass: "bg-orange-100/80 dark:bg-orange-950/70 border-orange-200/90 dark:border-orange-800/80 text-orange-600 dark:text-orange-400",
    dotColor: "#ea580c",
  },
  "Bảo hiểm nhân thọ": {
    accentColor: "#0284c7",
    bgGradient: "bg-gradient-to-b from-sky-100/70 via-white/95 to-sky-50/40 dark:from-sky-950/35 dark:via-slate-900/90 dark:to-sky-950/25",
    borderClass: "border-sky-200/90 dark:border-sky-800/70 hover:border-sky-400 dark:hover:border-sky-500",
    iconBgClass: "bg-sky-100/80 dark:bg-sky-950/70 border-sky-200/90 dark:border-sky-800/80 text-sky-600 dark:text-sky-400",
    dotColor: "#0284c7",
  },
  "Thể thao điện tử": {
    accentColor: "#059669",
    bgGradient: "bg-gradient-to-b from-emerald-100/70 via-white/95 to-emerald-50/40 dark:from-emerald-950/35 dark:via-slate-900/90 dark:to-emerald-950/25",
    borderClass: "border-emerald-200/90 dark:border-emerald-800/70 hover:border-emerald-400 dark:hover:border-emerald-500",
    iconBgClass: "bg-emerald-100/80 dark:bg-emerald-950/70 border-emerald-200/90 dark:border-emerald-800/80 text-emerald-600 dark:text-emerald-400",
    dotColor: "#059669",
  },
  "Ví điện tử": {
    accentColor: "#d97706",
    bgGradient: "bg-gradient-to-b from-amber-100/70 via-white/95 to-amber-50/40 dark:from-amber-950/35 dark:via-slate-900/90 dark:to-amber-950/25",
    borderClass: "border-amber-200/90 dark:border-amber-800/70 hover:border-amber-400 dark:hover:border-amber-500",
    iconBgClass: "bg-amber-100/80 dark:bg-amber-950/70 border-amber-200/90 dark:border-amber-800/80 text-amber-600 dark:text-amber-400",
    dotColor: "#d97706",
  },
  "Xây dựng hệ thống": {
    accentColor: "#e11d48",
    bgGradient: "bg-gradient-to-b from-rose-100/70 via-white/95 to-rose-50/40 dark:from-rose-950/35 dark:via-slate-900/90 dark:to-rose-950/25",
    borderClass: "border-rose-200/90 dark:border-rose-800/70 hover:border-rose-400 dark:hover:border-rose-500",
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
  details: {
    tagline: string;
    experienceYears: string;
    experienceYearsEn?: string;
    headcountScope: string;
    headcountScopeEn?: string;
    keyProjects: string[];
    achievements: string[];
    techStack: string[];
    coreRole: string;
    coreRoleEn?: string;
    orientation?: string;
    orientationEn?: string;
  };
}

const DOMAINS_DATA: ServiceCardConfig[] = [
  {
    color: "#7c3aed",
    icon: Smartphone,
    title: "Viễn thông di động",
    titleEn: "Mobile Telecom",
    category: "telecom",
    image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=800&q=80",
    desc: "Hơn 10 năm kinh nghiệm trong ngành viễn thông, từ mạng di động đến dịch vụ gọi quốc tế, tạo nền tảng vững chắc về vận hành và Chăm Sóc Khách Hàng quy mô lớn.",
    descEn: "Over 10 years of experience in telecom, from mobile networks to international calling services, creating a solid foundation in large-scale CX operations.",
    logos: [
      { name: "MobiFone", url: "https://i.ibb.co/hxHm9TsZ/Mobifone.png", color: "#005baa" },
      { name: "V247", url: "https://i.ibb.co/QvtbdnfP/V247.png", color: "#2563eb" },
      { name: "LBC", url: "https://i.ibb.co/R4YXWyzF/LBC.png", color: "#f59e0b" },
      { name: "HTVC", url: "https://i.ibb.co/1fNw0hBq/HTVC.png", color: "#0284c7" },
    ],
    details: {
      tagline: "Nền tảng vận hành & Chăm sóc khách hàng quy mô lớn tiêu chuẩn tập đoàn",
      experienceYears: "10+ Năm kinh nghiệm thực chiến trong ngành viễn thông di động & gọi quốc tế.",
      experienceYearsEn: "10+ Years of hands-on experience in mobile telecom & international calling.",
      headcountScope: "12+ nhân sự trực tiếp điều hành ca",
      headcountScopeEn: "12+ personnel directly managing shifts",
      keyProjects: [
        "1.1 · Xây dựng và vận hành Phòng Dịch vụ Khách hàng",
        "2.1 · Chuẩn hóa quy trình chăm sóc khách hàng",
        "2.2 · Tối ưu hóa các kênh hỗ trợ khách hàng",
      ],
      achievements: [
        "Hoàn thành 100% nhiệm vụ hỗ trợ nghiệp vụ",
        "Biên soạn 100% tài liệu đào tạo nội bộ",
        "Duy trì tỷ lệ hài lòng tư vấn cước trên 95%"
      ],
      techStack: ["Tổng đài PBX", "CTI", "CCNA Network", "Call Center Quality Monitoring System"],
      coreRole: "Trưởng nhóm CSKH / Supervisor / Tổng đài viên cao cấp",
      coreRoleEn: "CS Team Leader / Supervisor / Senior Call Center Agent",
      orientation: "Chuẩn hóa chất lượng dịch vụ Call Center, phát triển quy trình xử lý sự cố mạng & tối ưu hóa cước viễn thông quy mô lớn.",
      orientationEn: "Standardizing Call Center service quality, developing network troubleshooting workflows & optimizing large-scale telecom billing.",
    },
  },
  {
    color: "#ea580c",
    icon: Globe,
    title: "Thương mại điện tử",
    titleEn: "E-Commerce",
    category: "digital",
    image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80",
    desc: "Tham gia giai đoạn bùng nổ của thương mại điện tử và ví điện tử, xây dựng nền tảng vận hành, xử lý khiếu nại, kiểm soát gian lận và Chăm Sóc Khách Hàng đa kênh.",
    descEn: "Participated in the boom of e-commerce and digital wallets, building operational foundations, dispute resolution, fraud control, and omnichannel CS.",
    logos: [
      { name: "Shopee", url: "https://i.ibb.co/BSVS4xf/Shopee.png", color: "#ea580c" },
      { name: "ShopeePay", url: "https://i.ibb.co/LdYv3TJy/Shopee-Paye.png", color: "#00ADEF" },
      { name: "Finviet", url: "https://i.ibb.co/7NtSSz4d/Finviet.png", color: "#0284c7" },
    ],
    details: {
      tagline: "Xử lý hàng triệu tương tác khách hàng & đối tác bán hàng trên nền tảng số",
      experienceYears: "6+ Năm kinh nghiệm trong mảng Thương mại điện tử & Thanh toán trực tuyến.",
      experienceYearsEn: "6+ Years of experience in E-Commerce & Online Payments.",
      headcountScope: "130 nhân sự trực tiếp",
      headcountScopeEn: "130 direct personnel",
      keyProjects: [
        "3.1 · Ứng dụng AI phân tích giọng nói và cảm xúc",
        "2.2 · Tối ưu hóa các kênh hỗ trợ khách hàng",
      ],
      achievements: [
        "Xây dựng quy trình hỗ trợ vận hành thương mại điện tử và giải quyết khiếu nại",
        "Đạt 100% chuẩn hóa quy trình xử lý tranh chấp đơn hàng"
      ],
      techStack: ["CRM nội bộ", "Ticket System", "LiveChat Omnichannel", "Fraud Control Tools"],
      coreRole: "Trưởng Phòng CSKH / VED Operations Lead",
      coreRoleEn: "Head of Customer Service / VED Operations Lead",
      orientation: "Xây dựng trải nghiệm mua sắm không khoảng cách, tối ưu hóa quy trình đổi trả/khiếu nại đơn hàng và tự động hóa giải quyết tranh chấp.",
      orientationEn: "Building frictionless shopping experiences, optimizing return/complaint procedures, and automating dispute resolutions.",
    },
  },
  {
    color: "#0284c7",
    icon: ShieldCheck,
    title: "Bảo hiểm nhân thọ",
    titleEn: "Life Insurance",
    category: "consulting",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    desc: "Quản lý tổng đài, triển khai dự án tích hợp Call Center, tối ưu quy trình vận hành, nâng cao chất lượng tư vấn, cải thiện trải nghiệm và hiệu quả phục vụ khách hàng toàn diện.",
    descEn: "Managing contact centers, implementing integrated Call Center projects, optimizing workflows, elevating advice quality, and improving overall service efficiency.",
    logos: [
      { name: "Prudential", url: "https://i.ibb.co/XfpQphWF/Prudential.png", color: "#dc2626" },
    ],
    details: {
      tagline: "Chuẩn mực bảo mật & dịch vụ khách hàng tài chính cá nhân khắt khe bậc nhất",
      experienceYears: "3+ Năm kinh nghiệm quản lý Call Center trong ngành Bảo hiểm nhân thọ.",
      experienceYearsEn: "3+ Years of managing Call Center in the Life Insurance industry.",
      headcountScope: "12 nhân sự trực tiếp",
      headcountScopeEn: "12 direct personnel",
      keyProjects: [
        "1.1 · Xây dựng và vận hành Phòng Dịch vụ Khách hàng",
        "2.1 · Chuẩn hóa quy trình chăm sóc khách hàng",
      ],
      achievements: [
        "Đạt 90% hiệu quả quản lý Call Center",
        "80% chuyển đổi thương mại điện tử bảo hiểm",
        "Xây dựng quy trình VideoCall tư vấn trực tuyến"
      ],
      techStack: ["VideoCall Platform", "E-Insurance System", "CRM Prudential", "BCP Framework"],
      coreRole: "Trưởng Phòng CallCenter / Quản lý Tổng đài CSKH",
      coreRoleEn: "Call Center Manager / Customer Service Director",
      orientation: "Nâng cao tính minh bạch, chính xác tuyệt đối trong tư vấn hợp đồng bảo hiểm và tích hợp tư vấn VideoCall hiện đại.",
      orientationEn: "Enhancing transparency and absolute accuracy in insurance consultations, integrating modern VideoCall consulting.",
    },
  },
  {
    color: "#059669",
    icon: Gamepad2,
    title: "Thể thao điện tử",
    titleEn: "Gaming & eSports",
    category: "digital",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    desc: "Xây dựng, quản lý bộ phận Chăm Sóc Khách Hàng cho nhà phát hành game, vận hành hệ thống hỗ trợ quy mô lớn và đồng hành cùng các sự kiện thể thao điện tử chuyên nghiệp hiệu quả.",
    descEn: "Building and managing Customer Support for game publishers, operating large-scale support systems, and effectively accompanying professional eSports events.",
    logos: [
      { name: "Garena", url: "https://i.ibb.co/h1Md65yV/Garena.png", color: "#df2027" },
      { name: "VED", url: "https://i.ibb.co/BKHcWL5R/Logo-VED.gif", color: "#e11d48" },
      { name: "GCafe", url: "https://i.ibb.co/FkWk3s4W/GCafe.png", color: "#ff6600" },
    ],
    details: {
      tagline: "Chăm sóc cộng đồng game thủ hàng chục triệu người chơi & hỗ trợ giải đấu eSports đỉnh cao",
      experienceYears: "5+ Năm kinh nghiệm trong ngành Game, eSports & Giải trí kỹ thuật số.",
      experienceYearsEn: "5+ Years of experience in Gaming, eSports & Digital Entertainment.",
      headcountScope: "130 nhân sự trực tiếp",
      headcountScopeEn: "130 direct personnel",
      keyProjects: [
        "1.3 · Xây dựng cơ chế phối hợp liên phòng ban",
        "3.2 · Triển khai hệ thống tự động hóa phản hồi",
      ],
      achievements: [
        "Điều hành CSKH cho LMHT, Liên Quân Mobile",
        "Xử lý hàng trăm nghìn ticket/tháng",
        "Duy trì SLA phản hồi < 3 phút giai đoạn đỉnh điểm"
      ],
      techStack: ["Garena Platform Tools", "In-game Support System", "High-volume Ticket Management"],
      coreRole: "Trưởng Phòng Dịch vụ Khách hàng (Head of CS)",
      coreRoleEn: "Head of Customer Support (CS)",
      orientation: "Phát triển hệ thống CSKH tốc độ cao, khả năng chịu tải cực lớn và đồng bộ các sự kiện thể thao điện tử chuyên nghiệp.",
      orientationEn: "Developing high-speed, ultra-high capacity customer support systems, synchronizing with professional eSports tournaments.",
    },
  },
  {
    color: "#d97706",
    icon: Wallet,
    title: "Ví điện tử",
    titleEn: "Digital Wallets & FinTech",
    category: "digital",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    desc: "Am hiểu vận hành Chăm Sóc Khách Hàng trong lĩnh vực FinTech, từ xác minh người dùng, xử lý giao dịch đến kiểm soát rủi ro và hỗ trợ đối tác tài chính hiệu quả, bền vững.",
    descEn: "Deep expertise in FinTech CS operations, spanning user verification, transaction processing, risk control, and sustainable financial partner support.",
    logos: [
      { name: "Ví MoMo", url: "https://i.ibb.co/k2QtrgTw/Momo.png", color: "#ec4899" },
      { name: "ShopeePay", url: "https://i.ibb.co/LdYv3TJy/Shopee-Paye.png", color: "#00ADEF" },
      { name: "Finviet", url: "https://i.ibb.co/7NtSSz4d/Finviet.png", color: "#0284c7" },
    ],
    details: {
      tagline: "Vận hành hệ thống hỗ trợ giao dịch số, xác thực eKYC & an toàn thanh toán ngân hàng",
      experienceYears: "5+ Năm kinh nghiệm vận hành CSKH trong ngành FinTech & Ví điện tử.",
      experienceYearsEn: "5+ Years of CX operations experience in FinTech & Digital Wallets.",
      headcountScope: "60 nhân sự nội bộ + 150+ nhân sự BPO",
      headcountScopeEn: "60 internal personnel + 150+ BPO agents",
      keyProjects: [
        "3.1 · Ứng dụng AI phân tích giọng nói và cảm xúc",
        "1.2 · Thiết lập mục tiêu và chỉ tiêu hoạt động",
      ],
      achievements: [
        "Xây dựng P.CSKH Ví ECO & MoMo",
        "Quản lý 60 nhân sự nội bộ + hàng trăm nhân sự BPO",
        "Giảm thời gian xử lý sự cố tài chính 35%"
      ],
      techStack: ["Core Banking/Wallet API", "eKYC System", "AI Bot", "Omnichannel CRM"],
      coreRole: "Trưởng Phòng Dịch vụ Khách hàng (Head of CS)",
      coreRoleEn: "Head of Customer Support (CS)",
      orientation: "Số hóa quy trình định danh (eKYC), tối ưu hóa kiểm soát rủi ro giao dịch tài chính và tích hợp AI Bot hỗ trợ 24/7.",
      orientationEn: "Digitizing eKYC identification, optimizing transaction risk controls, and integrating 24/7 AI conversational assistants.",
    },
  },
  {
    color: "#e11d48",
    icon: Layers,
    title: "Xây dựng hệ thống",
    titleEn: "System Architecture & Consulting",
    category: "consulting",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    desc: "Tư vấn xây dựng, tối ưu hệ thống Chăm Sóc Khách Hàng toàn diện, từ quy trình, nhân sự đến công nghệ và tự động hóa, nâng cao hiệu quả vận hành doanh nghiệp trên tổng thể thực tiễn.",
    descEn: "Consulting on building and optimizing end-to-end Customer Care systems, from processes and staffing to technology and automation for overall enterprise efficiency.",
    logos: [
      { name: "Power Service", url: "https://i.ibb.co/G4QnNzWb/Power-Service.png", color: "#16a34a" },
      { name: "Logo-VED", url: "https://i.ibb.co/BKHcWL5R/Logo-VED.gif", color: "#6366f1" },
    ],
    details: {
      tagline: "Tư vấn giải pháp toàn diện từ con người, quy trình đến chuyển đổi số",
      experienceYears: "22+ Năm kinh nghiệm tư vấn, thiết kế & vận hành hệ thống CX/CSKH toàn diện.",
      experienceYearsEn: "22+ Years of experience in consulting, designing & operating end-to-end CX/CS systems.",
      headcountScope: "Lên đến 150+ nhân sự điều hành đa kênh",
      headcountScopeEn: "Up to 150+ personnel managing multi-channel",
      keyProjects: [
        "1.2 · Thiết lập mục tiêu và chỉ tiêu hoạt động",
        "4.1 · Phát triển chương trình đào tạo trực tuyến",
        "4.2 · Xây dựng khung năng lực và lộ trình phát triển",
      ],
      achievements: [
        "Triển khai thành công 21+ dự án chiến lược",
        "Chuẩn hóa SOP 100%",
        "Nâng CSAT/NPS lên 95%-98% qua các nhiệm kỳ"
      ],
      techStack: ["Generative AI Agent Copilot", "Omnichannel CRM", "BI Realtime Dashboard", "RPA Automation"],
      coreRole: "Head of Customer Experience (CX) / CS Director / Specialist Consultant",
      coreRoleEn: "Head of Customer Experience (CX) / CS Director / Specialist Consultant",
      orientation: "Kiến tạo hệ sinh thái CSKH 4.0 kết hợp hài hòa Quy trình (SOP/SLA), Con người (ASK), Công nghệ (AI/CRM) và Dữ liệu (Realtime Dashboard).",
      orientationEn: "Architecting a 4.0 customer service ecosystem that harmonizes Processes (SOP/SLA), People (ASK), Technology (AI/CRM), and Data (Realtime Dashboard).",
    },
  },
];

const getShortExp = (item: ServiceCardConfig, isVi: boolean) => {
  const exp = item.details.experienceYears;
  if (isVi) {
    if (exp.startsWith("10+")) return "10+ Năm kinh nghiệm";
    if (exp.startsWith("6+")) return "6+ Năm kinh nghiệm";
    if (exp.startsWith("3+")) return "3+ Năm kinh nghiệm";
    if (exp.startsWith("5+")) return "5+ Năm kinh nghiệm";
    if (exp.startsWith("22+")) return "22+ Năm kinh nghiệm";
    return exp;
  } else {
    const expEn = item.details.experienceYearsEn || exp;
    if (expEn.startsWith("10+")) return "10+ Years Experience";
    if (expEn.startsWith("6+")) return "6+ Years Experience";
    if (expEn.startsWith("3+")) return "3+ Years Experience";
    if (expEn.startsWith("5+")) return "5+ Years Experience";
    if (expEn.startsWith("22+")) return "22+ Years Experience";
    return expEn;
  }
};

export function DomainsSection() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedItemTitle, setExpandedItemTitle] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredItems = useMemo(() => {
    return DOMAINS_DATA.filter((item) => {
      const matchCat = selectedCategory === "all" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchCat;
      const titleMatch = item.title.toLowerCase().includes(q) || (item.titleEn && item.titleEn.toLowerCase().includes(q));
      const descMatch = item.desc.toLowerCase().includes(q) || (item.descEn && item.descEn.toLowerCase().includes(q));
      const techMatch = item.details.techStack.some(t => t.toLowerCase().includes(q));
      const brandMatch = item.logos.some(l => l.name.toLowerCase().includes(q));
      return matchCat && (titleMatch || descMatch || techMatch || brandMatch);
    });
  }, [selectedCategory, searchQuery]);

  const activeItem = useMemo(() => {
    return DOMAINS_DATA.find((i) => i.title === expandedItemTitle) || null;
  }, [expandedItemTitle]);

  const handleCardClick = (title: string) => {
    playUiSound("click");
    setExpandedItemTitle(title);
  };

  const handleMouseMove = (_e: React.MouseEvent<HTMLDivElement>) => {
    // Keep cards firmly positioned within the main card container without sliding/tilting
  };

  const handleMouseLeave = (_e: React.MouseEvent<HTMLDivElement>) => {
    // Keep cards firmly positioned within the main card container without sliding/tilting
  };

  // Keyboard navigation
  const handleNavigateItem = useCallback(
    (direction: "prev" | "next") => {
      if (!expandedItemTitle || filteredItems.length <= 1) return;
      const currentIndex = filteredItems.findIndex((i) => i.title === expandedItemTitle);
      if (currentIndex === -1) return;
      playUiSound("click");
      let nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex >= filteredItems.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = filteredItems.length - 1;
      setExpandedItemTitle(filteredItems[nextIndex].title);
    },
    [expandedItemTitle, filteredItems]
  );

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
    <div
      id="domains"
      className="w-full min-h-full flex flex-col justify-start gap-3 sm:gap-4 p-2 sm:p-3 lg:p-4 select-none relative overflow-x-hidden overflow-y-auto pb-10"
    >
      {/* Local styles for clean static watermarks & icons within card bounds */}
      <style dangerouslySetInnerHTML={{ __html: `
        .animated-service-icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.16));
        }
        .custom-glass-card-inset {
          background: rgba(0, 0, 0, 0.24);
          border-radius: 14px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.22);
        }
        .dark .custom-glass-card-inset {
          background: rgba(0, 0, 0, 0.38);
          border: 1px solid rgba(255, 255, 255, 0.16);
        }
        .domain-card-description {
          display: -webkit-box !important;
          -webkit-line-clamp: 3 !important;
          -webkit-box-orient: vertical !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          line-clamp: 3 !important;
        }
        .brand-circle-token-node {
          background-color: #ffffff;
          padding: 3px;
          overflow: hidden;
          position: relative;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .brand-circle-token-node img {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
          transition: transform 0.25s ease;
        }
        .brand-circle-token-node:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
        }
      ` }} />

      {/* Background Ribbon Curves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40 dark:opacity-20">
        <svg className="absolute -left-12 -top-12 w-[400px] h-[500px]" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-80 60C100 220 200 480 -40 700C-140 820 -70 940 80 910" stroke="#10b981" strokeWidth="48" strokeLinecap="round" opacity="0.3" />
          <path d="M-50 140C120 280 210 510 0 760" stroke="#34d399" strokeWidth="24" strokeLinecap="round" opacity="0.2" />
        </svg>
      </div>

      {/* 1. Header Thẻ chính Lĩnh vực */}
      <PageCardHeader pageId="domains" id="card-domains-list-content">
        <div className="w-full flex flex-col gap-2.5">
          {/* Top Row of Toolbar: KPI Metric Badges & Search Box */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            {/* Left: Domain Count & Key Experience Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-caption font-bold shadow-2xs">
                <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{isVi ? "6 Lĩnh Vực Chuyên Môn Cốt Lõi" : "6 Key Expertise Domains"}</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 text-caption font-semibold shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{isVi ? "22+ Năm Thực Chiến" : "22+ Years Proven CX"}</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 text-caption font-semibold shadow-2xs">
                <Users className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>{isVi ? "Quy Mô 150+ Nhân Sự" : "Up to 150+ Team Scale"}</span>
              </span>
              <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 text-caption font-semibold shadow-2xs">
                <Building2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{isVi ? "10+ Tập Đoàn Đồng Hành" : "10+ Major Brand Partners"}</span>
              </span>
            </div>

            {/* Right: Search Box */}
            <div className="relative flex items-center w-full sm:w-auto sm:min-w-[230px] max-w-xs ml-auto">
              <Search className="absolute left-3 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isVi ? "Tìm lĩnh vực, công nghệ, thương hiệu..." : "Search domains, stack, brands..."}
                className="w-full pl-9 pr-8 py-1.5 rounded-full bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-body-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-2xs transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  title={isVi ? "Xóa tìm kiếm" : "Clear search"}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Bottom Row of Toolbar: Category Filter Pills & Result Counter */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {INDUSTRY_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count = cat.id === "all" ? 6 : DOMAINS_DATA.filter((d) => d.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      setSelectedCategory(cat.id);
                    }}
                    className={cn(
                      "px-3 py-1 rounded-full text-caption font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap",
                      isActive
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25 ring-2 ring-emerald-500/40"
                        : "bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80"
                    )}
                  >
                    <span>{isVi ? cat.titleVi : cat.titleEn}</span>
                    <span
                      className={cn(
                        "text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold",
                        isActive ? "bg-emerald-700/80 text-emerald-100" : "bg-slate-200/80 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Showing count indicator */}
            <div className="text-caption text-slate-500 dark:text-slate-400 font-medium ml-auto">
              {isVi
                ? `Hiển thị ${filteredItems.length}/6 lĩnh vực`
                : `Showing ${filteredItems.length}/6 domains`}
            </div>
          </div>
        </div>
      </PageCardHeader>

      {/* 4. 6 Cards Grid or Full In-Place Expanded Card */}
      <LayoutGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 py-1 w-full relative z-10">
          <AnimatePresence mode="wait">
            {expandedItemTitle && activeItem ? (
              /* Expanded View: Full width dashboard card */
              <motion.div
                key={`expanded-${activeItem.title}`}
                layoutId={`domain-card-${activeItem.title}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "col-span-1 md:col-span-2 xl:col-span-3 w-full relative p-5 sm:p-6 md:p-8 border-2 transition-all duration-300 shadow-2xl backdrop-blur-2xl flex flex-col gap-5 sm:gap-6 select-none ring-4 ring-emerald-500/40 dark:ring-emerald-400/40 border-white/40 z-20 overflow-hidden"
                )}
                style={{
                  borderRadius: "24px",
                  borderColor: activeItem.color,
                }}
              >
                {/* Embedded Card Background */}
                <ServiceCardBackground title={activeItem.title} className="opacity-95" />

                {/* Top Header Row of Expanded Card */}
                <div className="flex items-center justify-between border-b border-white/20 pb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-white font-mono text-xs font-bold shadow-xs">
                      {isVi
                        ? `LĨNH VỰC ${String(filteredItems.findIndex((i) => i.title === activeItem.title) + 1).padStart(2, "0")} / ${String(filteredItems.length).padStart(2, "0")}`
                        : `DOMAIN ${String(filteredItems.findIndex((i) => i.title === activeItem.title) + 1).padStart(2, "0")} / ${String(filteredItems.length).padStart(2, "0")}`}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs uppercase tracking-wider font-bold text-white/90 hidden sm:inline">
                        {isVi ? "Báo Cáo Chuyên Môn Thực Chiến" : "Operational Expertise Brief"}
                      </span>
                    </div>
                  </div>

                  {/* Navigation controls in Expanded Card */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleNavigateItem("prev")}
                      title={isVi ? "Lĩnh vực trước (Phím ←)" : "Previous Domain (Key ←)"}
                      className="px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 text-white flex items-center gap-1.5 text-xs font-bold backdrop-blur-md border border-white/30 transition-all cursor-pointer shadow-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">{isVi ? "Trước" : "Prev"}</span>
                      <kbd className="hidden md:inline px-1 py-0.2 bg-white/20 rounded text-[10px] font-mono">←</kbd>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavigateItem("next")}
                      title={isVi ? "Lĩnh vực tiếp theo (Phím →)" : "Next Domain (Key →)"}
                      className="px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 text-white flex items-center gap-1.5 text-xs font-bold backdrop-blur-md border border-white/30 transition-all cursor-pointer shadow-sm"
                    >
                      <span className="hidden sm:inline">{isVi ? "Tiếp" : "Next"}</span>
                      <ChevronRight className="w-4 h-4" />
                      <kbd className="hidden md:inline px-1 py-0.2 bg-white/20 rounded text-[10px] font-mono">→</kbd>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playUiSound("close");
                        setExpandedItemTitle(null);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-white text-slate-900 font-bold hover:bg-white/90 active:scale-95 text-xs flex items-center gap-1.5 shadow-lg transition-all ml-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                      <span>{isVi ? "Thu nhỏ" : "Minimize"}</span>
                      <kbd className="hidden sm:inline px-1 py-0.2 bg-slate-200 rounded text-[10px] font-mono">ESC</kbd>
                    </button>
                  </div>
                </div>

                {/* Main 2-Column Responsive Contents */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 relative z-10 text-white">
                  {/* Left Column */}
                  <div className="space-y-4 sm:space-y-5">
                    {/* Header Row */}
                    <div className="flex items-center gap-4">
                      <div className="animated-service-icon-wrapper w-16 h-16 sm:w-18 sm:h-18 rounded-3xl bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center shrink-0 shadow-lg">
                        {React.createElement(activeItem.icon || Globe, {
                          className: "w-9 h-9 sm:w-10 sm:h-10 text-white stroke-[2.2]",
                        })}
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                          {isVi ? activeItem.title : activeItem.titleEn || activeItem.title}
                        </h3>
                        <p className="text-sm font-semibold text-amber-300 dark:text-amber-200 mt-1 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 shrink-0" />
                          <span>{isVi ? activeItem.details.tagline : activeItem.details.tagline}</span>
                        </p>
                      </div>
                    </div>

                    {/* 4-Box Key Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <div className="custom-glass-card-inset p-3 text-center">
                        <span className="block text-[10px] uppercase font-bold text-white/70">
                          {isVi ? "Kinh nghiệm" : "Tenure"}
                        </span>
                        <span className="block text-xs sm:text-sm font-extrabold text-amber-300 mt-0.5">
                          {getShortExp(activeItem, isVi)}
                        </span>
                      </div>
                      <div className="custom-glass-card-inset p-3 text-center">
                        <span className="block text-[10px] uppercase font-bold text-white/70">
                          {isVi ? "Quy mô đội ngũ" : "Team Scale"}
                        </span>
                        <span className="block text-xs sm:text-sm font-extrabold text-white mt-0.5">
                          {isVi ? activeItem.details.headcountScope : activeItem.details.headcountScopeEn || activeItem.details.headcountScope}
                        </span>
                      </div>
                      <div className="custom-glass-card-inset p-3 text-center">
                        <span className="block text-[10px] uppercase font-bold text-white/70">
                          {isVi ? "Vai trò" : "Role"}
                        </span>
                        <span className="block text-xs sm:text-sm font-extrabold text-white mt-0.5 truncate">
                          {isVi ? activeItem.details.coreRole.split("/")[0] : activeItem.details.coreRoleEn?.split("/")[0] || activeItem.details.coreRole}
                        </span>
                      </div>
                      <div className="custom-glass-card-inset p-3 text-center">
                        <span className="block text-[10px] uppercase font-bold text-white/70">
                          {isVi ? "Dự án nòng cốt" : "Key Projects"}
                        </span>
                        <span className="block text-xs sm:text-sm font-extrabold text-emerald-300 mt-0.5">
                          {activeItem.details.keyProjects.length} {isVi ? "Dự án" : "Projects"}
                        </span>
                      </div>
                    </div>

                    {/* Strategic Orientation Block */}
                    {activeItem.details.orientation && (
                      <div className="custom-glass-card-inset p-4 sm:p-5 shadow-inner">
                        <h4 className="text-xs uppercase tracking-wider font-bold text-amber-300 flex items-center gap-1.5 mb-2">
                          <Compass className="w-4 h-4" />
                          <span>{isVi ? "Định hướng chiến lược & triết lý điều hành" : "Strategic Orientation & Operating Philosophy"}</span>
                        </h4>
                        <p className="text-sm sm:text-base font-medium text-white/95 leading-relaxed italic pl-2 border-l-2 border-amber-400/80">
                          "{isVi ? activeItem.details.orientation : activeItem.details.orientationEn || activeItem.details.orientation}"
                        </p>
                      </div>
                    )}

                    {/* Detailed Operational Description */}
                    <div className="custom-glass-card-inset p-4 sm:p-5 shadow-inner">
                      <h4 className="text-xs uppercase tracking-wider font-bold text-white/80 flex items-center gap-1.5 mb-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{isVi ? "Mô tả chuyên môn thực chiến" : "Operational Scope & Delivery"}</span>
                      </h4>
                      <p className="text-sm font-normal text-white/95 leading-relaxed">
                        {isVi ? activeItem.desc : activeItem.descEn || activeItem.desc}
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4 sm:space-y-5 flex flex-col justify-between">
                    {/* Key Projects Block */}
                    <div className="custom-glass-card-inset p-4 sm:p-5 shadow-inner">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs uppercase tracking-wider font-bold text-cyan-300 flex items-center gap-1.5">
                          <Layers className="w-4 h-4" />
                          <span>{isVi ? "Dự án chiến lược tiêu biểu" : "Key Strategic Projects"}</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            playUiSound("click");
                            window.dispatchEvent(new CustomEvent("app-navigate", { detail: "projects" }));
                          }}
                          className="text-[11px] font-bold text-cyan-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <span>{isVi ? "Xem trang Dự án" : "Open Projects Page"}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {activeItem.details.keyProjects.map((proj, pIdx) => (
                          <div
                            key={pIdx}
                            className="p-2.5 rounded-xl bg-black/20 border border-white/15 flex items-start gap-2.5 text-xs sm:text-sm font-medium text-white/95"
                          >
                            <div className="w-5 h-5 rounded-md bg-cyan-500/30 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold">
                              {pIdx + 1}
                            </div>
                            <span>{proj}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Achievements & KPIs Block */}
                    <div className="custom-glass-card-inset p-4 sm:p-5 shadow-inner">
                      <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-300 flex items-center gap-1.5 mb-2.5">
                        <Award className="w-4 h-4 text-amber-300" />
                        <span>{isVi ? "Thành tựu & Kết quả thực chiến vượt trội" : "Key Operational Achievements"}</span>
                      </h4>
                      <ul className="space-y-2">
                        {activeItem.details.achievements.map((ach, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/95 font-medium">
                            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Block */}
                    <div className="custom-glass-card-inset p-4 shadow-inner">
                      <span className="block text-xs text-white/80 font-bold uppercase mb-2 flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-cyan-300" />
                        <span>{isVi ? "Hệ thống & Công cụ vận hành" : "Systems & Technology Stack"}</span>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeItem.details.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-xl text-xs font-bold bg-white/20 border border-white/30 text-white shadow-2xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Partner Brands & Connect CTA */}
                    <div className="custom-glass-card-inset p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="text-xs font-semibold text-white/80 shrink-0">
                          {isVi ? "Thương hiệu:" : "Brands:"}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          {activeItem.logos.map((logo, lIdx) => (
                            <div
                              key={lIdx}
                              className="brand-circle-token-node w-10 h-10 rounded-full shadow-md flex items-center justify-center border-2 border-white/90 bg-white p-1 overflow-hidden hover:scale-110 transition-transform"
                              title={logo.name}
                            >
                              <img
                                src={logo.url}
                                alt={logo.name}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          playUiSound("click");
                          window.dispatchEvent(new CustomEvent("app-navigate", { detail: "contact" }));
                        }}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 active:scale-95"
                      >
                        <MessageSquare className="w-4 h-4 text-emerald-600" />
                        <span>{isVi ? "Liên hệ trao đổi chuyên sâu" : "Connect on this domain"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : filteredItems.length === 0 ? (
              /* Empty state when search/filter returns nothing */
              <div className="col-span-1 md:col-span-2 xl:col-span-3 w-full p-8 rounded-2xl bg-slate-50/80 dark:bg-slate-900/80 border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-center gap-3">
                <Search className="w-10 h-10 text-slate-400 dark:text-slate-600 animate-bounce" />
                <h4 className="text-h4 text-slate-700 dark:text-slate-200 font-bold">
                  {isVi ? "Không tìm thấy lĩnh vực phù hợp" : "No matching domains found"}
                </h4>
                <p className="text-body-sm text-slate-500 dark:text-slate-400 max-w-md">
                  {isVi
                    ? `Không có kết quả nào khớp với "${searchQuery}". Vui lòng thử từ khóa khác hoặc đặt lại bộ lọc.`
                    : `No domains match "${searchQuery}". Please try another keyword or reset filters.`}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="mt-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-caption flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isVi ? "Đặt lại bộ lọc" : "Reset Filters"}</span>
                </button>
              </div>
            ) : (
              /* Collapsed view: 6 Cards Bento Grid */
              filteredItems.map((item, idx) => {
                const IconComponent = item.icon || Globe;
                const theme = CARD_THEME_STYLES[item.title] || {
                  accentColor: item.color,
                  bgGradient: "bg-white dark:bg-slate-900",
                  borderClass: "border-slate-200 dark:border-slate-800",
                  iconBgClass: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
                  dotColor: item.color,
                };

                return (
                  <motion.div
                    key={item.title}
                    layoutId={`domain-card-${item.title}`}
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
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={() => playUiSound("hover")}
                    style={{
                      borderRadius: "20px",
                    }}
                    className={cn(
                      "domain-item group relative flex flex-col justify-between p-4 sm:p-5 text-white border transition-all duration-300 select-none cursor-pointer overflow-hidden w-full h-full shadow-lg hover:shadow-2xl hover:-translate-y-1",
                      theme.borderClass
                    )}
                  >
                    {/* Embedded Colorful Gradient Background */}
                    <ServiceCardBackground title={item.title} className="opacity-95" />

                    {/* Top Row: Index on Left, Experience years & Action on Right */}
                    <div className="w-full flex items-center justify-between z-20 mb-3 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <span className="flex items-center justify-center px-2.5 py-0.5 rounded-full bg-black/30 backdrop-blur-md border border-white/30 text-white font-mono text-[11px] font-bold shadow-xs">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 text-white text-[10.5px] font-semibold shadow-xs">
                          <Clock className="w-3 h-3 text-amber-300 shrink-0" />
                          <span>{getShortExp(item, isVi)}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-[11px] font-bold shadow-xs group-hover:bg-white group-hover:text-slate-900 transition-all">
                        <span>{isVi ? "Chi tiết" : "Details"}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                    <div className="min-w-0 z-10">
                      {/* Header Row: Glass Soft Icon Badge */}
                      <div className="flex items-center gap-3 mb-2.5">
                        <div className="animated-service-icon-wrapper w-11 h-11 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center rounded-2xl bg-white/20 dark:bg-white/15 backdrop-blur-md border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.35)] group-hover:scale-110 group-hover:shadow-[0_0_22px_rgba(255,255,255,0.6)] group-hover:bg-white/30 transition-all duration-300">
                          {React.createElement(IconComponent, {
                            className: "w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[2.2] drop-shadow-md",
                          })}
                        </div>
                        <div className="flex flex-col text-left min-w-0">
                          <h3 className="text-base sm:text-lg font-extrabold tracking-tight leading-snug drop-shadow-md text-white whitespace-nowrap truncate">
                            {isVi ? item.title : item.titleEn || item.title}
                          </h3>
                          <span className="text-[11px] font-semibold text-amber-300/90 dark:text-amber-200/90 flex items-center gap-1 truncate mt-0.5">
                            <Sparkles className="w-3 h-3 shrink-0 text-amber-300" />
                            <span className="truncate">
                              {isVi ? item.details.coreRole : item.details.coreRoleEn || item.details.coreRole}
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Description Glass Bubble */}
                      <div className="w-full custom-glass-card-inset p-3 text-xs sm:text-[12.5px] text-white/95 leading-relaxed font-normal text-left shadow-inner domain-card-description mb-3">
                        {isVi ? item.desc : item.descEn || item.desc}
                      </div>

                      {/* Quick Metrics Pills */}
                      <div className="flex items-center gap-2 flex-wrap mb-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-black/25 backdrop-blur-md border border-white/20 text-[10.5px] font-semibold text-white/90">
                          <Users className="w-3 h-3 text-cyan-300" />
                          <span>
                            {isVi ? item.details.headcountScope : item.details.headcountScopeEn || item.details.headcountScope}
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-black/25 backdrop-blur-md border border-white/20 text-[10.5px] font-semibold text-white/90">
                          <Briefcase className="w-3 h-3 text-emerald-300" />
                          <span>
                            {item.details.keyProjects.length} {isVi ? "Dự án chính" : "Projects"}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Bottom: Partner Logos & Prompt */}
                    <div className="z-10 mt-auto pt-2.5 border-t border-white/20 flex flex-col gap-2">
                      {item.logos && item.logos.length > 0 && (
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] uppercase font-bold text-white/70 tracking-wider">
                            {isVi ? "Đối tác:" : "Brands:"}
                          </span>
                          <div className="flex items-center gap-2 flex-wrap justify-end">
                            {item.logos.map((logoObj, lIdx) => (
                              <div
                                key={lIdx}
                                className="brand-circle-token-node w-8 h-8 sm:w-9 sm:h-9 rounded-full shadow-md flex items-center justify-center border border-white/80 bg-white p-1 overflow-hidden"
                                title={logoObj.name}
                              >
                                <img
                                  src={logoObj.url}
                                  alt={logoObj.name}
                                  loading="lazy"
                                  decoding="async"
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Prompt */}
                      <div className="flex items-center justify-between text-[11px] font-medium text-white/80 group-hover:text-white pt-1">
                        <span>{isVi ? "Xem chi tiết thành tựu & hệ thống" : "View achievements & stack"}</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </div>
  );
}

export default DomainsSection;
