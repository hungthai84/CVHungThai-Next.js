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
    category: "fintech",
    image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80",
    desc: "Tham gia giai đoạn bùng nổ của thương mại điện tử và ví điện tử, xây dựng nền tảng vận hành, xử lý khiếu nại, kiểm soát gian lận và Chăm Sóc Khách Hàng đa kênh.",
    descEn: "Participated in the boom of e-commerce and digital wallets, building operational foundations, dispute resolution, fraud control, and omnichannel CS.",
    logos: [
      { name: "Shopee", url: "https://i.ibb.co/BSVS4xf/Shopee.png", color: "#ee4d2d" },
      { name: "Finviet", url: "https://i.ibb.co/7NtSSz4d/Finviet.png", color: "#0284c7" },
    ],
    details: {
      tagline: "Xử lý hàng triệu tương tác khách hàng & đối tác bán hàng trong các mùa Mega Sale",
      experienceYears: "6+ Năm kinh nghiệm trong mảng Thương mại điện tử & Thanh toán trực tuyến.",
      experienceYearsEn: "6+ Years of experience in E-Commerce & Online Payments.",
      headcountScope: "130 nhân sự trực tiếp",
      headcountScopeEn: "130 direct personnel",
      keyProjects: [
        "3.1 · Ứng dụng AI phân tích giọng nói và cảm xúc",
        "2.2 · Tối ưu hóa các kênh hỗ trợ khách hàng",
      ],
      achievements: [
        "Xây dựng quy trình hỗ trợ cho siêu ứng dụng TMĐT Shopee giai đoạn đầu",
        "Đạt 100% chuẩn hóa quy trình xử lý tranh chấp đơn hàng"
      ],
      techStack: ["CRM nội bộ", "Ticket System", "LiveChat Omnichannel", "Fraud Control Tools"],
      coreRole: "Trưởng Phòng CSKH / VED & Shopee Project Lead",
      coreRoleEn: "Head of Customer Service / VED & Shopee Project Lead",
      orientation: "Xây dựng trải nghiệm mua sắm không khoảng cách, tối ưu hóa quy trình đổi trả/khiếu nại đơn hàng và tự động hóa giải quyết tranh chấp.",
      orientationEn: "Building frictionless shopping experiences, optimizing return/complaint procedures, and automating dispute resolutions.",
    },
  },
  {
    color: "#0284c7",
    icon: ShieldCheck,
    title: "Bảo hiểm nhân thọ",
    titleEn: "Life Insurance",
    category: "insurance",
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
    category: "fintech",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    desc: "Xây dựng, quản lý bộ phận Chăm Sóc Khách Hàng cho nhà phát hành game, vận hành hệ thống hỗ trợ quy mô lớn và đồng hành cùng các sự kiện thể thao điện tử chuyên nghiệp hiệu quả.",
    descEn: "Building and managing Customer Support for game publishers, operating large-scale support systems, and effectively accompanying professional eSports events.",
    logos: [
      { name: "Garena", url: "https://i.ibb.co/h1Md65yV/Garena.png", color: "#df2027" },
      { name: "VED", url: "https://i.ibb.co/fYPJLfbw/VED.png", color: "#e11d48" },
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
    category: "fintech",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    desc: "Am hiểu vận hành Chăm Sóc Khách Hàng trong lĩnh vực FinTech, từ xác minh người dùng, xử lý giao dịch đến kiểm soát rủi ro và hỗ trợ đối tác tài chính hiệu quả, bền vững.",
    descEn: "Deep expertise in FinTech CS operations, spanning user verification, transaction processing, risk control, and sustainable financial partner support.",
    logos: [
      { name: "Ví MoMo", url: "https://i.ibb.co/k2QtrgTw/Momo.png", color: "#ec4899" },
      { name: "ShopeePay", url: "https://i.ibb.co/LdYv3TJy/Shopee-Paye.png", color: "#ee4d2d" },
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
    category: "insurance",
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
    card.style.setProperty("--scale", "1.02");
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
    card.style.setProperty("--scale", "1");
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
      className="w-full flex flex-col gap-5 p-2 sm:p-4 lg:p-6 animate-fadeIn select-none relative"
    >
      {/* Local styles for smooth, hardware-accelerated watermarks & floating icons */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes watermark-drift {
          0%, 100% {
            transform: rotate(-12deg) translate(0px, 0px) scale(1);
          }
          33% {
            transform: rotate(-7deg) translate(-10px, -12px) scale(1.05);
          }
          66% {
            transform: rotate(-15deg) translate(8px, -6px) scale(0.98);
          }
        }
        @keyframes icon-floating {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-6px) rotate(2deg) scale(1.06);
          }
        }
        .card-watermark-icon {
          position: absolute;
          right: -10px;
          bottom: -15px;
          font-size: 8rem;
          opacity: 0.12;
          pointer-events: none;
          transform-origin: center center;
          animation: watermark-drift 8s ease-in-out infinite;
          transition: opacity 0.45s ease;
        }
        .animated-service-icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          animation: icon-floating 3.2s ease-in-out infinite;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
        }
        .custom-glass-card-inset {
          background: rgba(255, 255, 255, 0.22);
          border-radius: 12px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }
        .dark .custom-glass-card-inset {
          background: rgba(15, 23, 42, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .brand-circle-token-node {
          background-color: #ffffff;
          padding: 0;
          overflow: hidden;
          position: relative;
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .brand-circle-token-node:hover {
          transform: scale(1.15) translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }
      ` }} />

      {/* Background Ribbon Curves matching the source design */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40 dark:opacity-20">
        <svg className="absolute -left-12 -top-12 w-[400px] h-[500px]" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-80 60C100 220 200 480 -40 700C-140 820 -70 940 80 910" stroke="#10b981" strokeWidth="48" strokeLinecap="round" opacity="0.3" />
          <path d="M-50 140C120 280 210 510 0 760" stroke="#34d399" strokeWidth="24" strokeLinecap="round" opacity="0.2" />
        </svg>
      </div>

      {/* 1. Header Thẻ chính Lĩnh vực */}
      <PageCardHeader pageId="domains" id="card-domains-list-content">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-5 bg-emerald-600 dark:bg-emerald-400 rounded-full shrink-0" />
            <span className="text-caption font-semibold font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-2xs">
              {isVi ? "6 Lĩnh Vực Chuyên Môn Nòng Cốt" : "6 Key Operational Expertise Domains"}
            </span>
          </div>
        </div>
      </PageCardHeader>

      {/* 4. 6 Cards Bento Grid or Full In-Place Expanded Card */}
      <LayoutGroup>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 py-1 w-full relative z-10">
          <AnimatePresence mode="wait">
            {expandedItemTitle && activeItem ? (
              /* Khi click vào thẻ dịch vụ: tăng kích thước thẻ bằng kích thước 6 thẻ cộng lại */
              <motion.div
                key={`expanded-${activeItem.title}`}
                layoutId={`domain-card-${activeItem.title}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "col-span-1 sm:col-span-2 lg:col-span-3 w-full relative p-5 sm:p-7 md:p-8 border-2 transition-all duration-300 shadow-2xl backdrop-blur-xl flex flex-col gap-6 select-none ring-2 sm:ring-4 ring-emerald-500/60 dark:ring-emerald-400/60 border-emerald-500 dark:border-emerald-400 z-20 min-h-[600px] overflow-hidden"
                )}
                style={{
                  borderRadius: "20px",
                  borderColor: activeItem.color,
                }}
              >
                {/* Embedded Card Background */}
                <ServiceCardBackground title={activeItem.title} className="opacity-95" />

                {/* Giant Animated Watermark Icon inside expanded card */}
                {React.createElement(activeItem.icon || Globe, {
                  className: "card-watermark-icon !text-[16rem] !opacity-8 !-right-10 !-bottom-10 text-white/10 dark:text-white/5",
                })}

                {/* Top Header Row of Expanded Card */}
                <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-2 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider font-bold text-white/85">
                      {isVi ? "Chi tiết lĩnh vực chuyên môn" : "Expertise Domain Details"}
                    </span>
                  </div>

                  {/* Navigation controls in Expanded Card */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleNavigateItem("prev")}
                      title={isVi ? "Lĩnh vực trước" : "Previous Domain"}
                      className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center text-sm backdrop-blur-md transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavigateItem("next")}
                      title={isVi ? "Lĩnh vực tiếp theo" : "Next Domain"}
                      className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center text-sm backdrop-blur-md transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playUiSound("close");
                        setExpandedItemTitle(null);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-white text-slate-900 font-bold hover:bg-white/90 active:scale-95 text-xs flex items-center gap-1.5 shadow-lg transition-all ml-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>{isVi ? "Thu nhỏ" : "Minimize"}</span>
                    </button>
                  </div>
                </div>

                {/* Main 2-Column Responsive Contents */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 relative z-10 text-white">
                  
                  {/* Left Column */}
                  <div className="space-y-4 md:space-y-5">
                    
                    {/* Header Row */}
                    <div className="flex items-center gap-4">
                      <div className="animated-service-icon-wrapper w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center shrink-0">
                        {React.createElement(activeItem.icon || Globe, { className: "w-8 h-8 sm:w-9 sm:h-9 text-white stroke-[2.2]" })}
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight">
                          {isVi ? activeItem.title : activeItem.titleEn || activeItem.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-white/85 mt-0.5">
                          {isVi ? activeItem.details.experienceYears : activeItem.details.experienceYearsEn || activeItem.details.experienceYears}
                        </p>
                      </div>
                    </div>

                    {/* Orientation Block */}
                    {activeItem.details.orientation && (
                      <div className="custom-glass-card-inset p-4 sm:p-5 shadow-inner">
                        <h4 className="text-xs uppercase tracking-wider font-bold text-yellow-300 flex items-center gap-1.5 mb-2">
                          <Compass className="w-4 h-4" />
                          <span>{isVi ? "Định hướng chiến lược" : "Strategic Orientation"}</span>
                        </h4>
                        <p className="text-sm font-medium text-white/95 leading-relaxed italic">
                          "{isVi ? activeItem.details.orientation : activeItem.details.orientationEn || activeItem.details.orientation}"
                        </p>
                      </div>
                    )}

                    {/* Description Block */}
                    <div className="custom-glass-card-inset p-4 sm:p-5 shadow-inner">
                      <h4 className="text-xs uppercase tracking-wider font-bold text-white/80 flex items-center gap-1.5 mb-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{isVi ? "Mô tả chuyên môn thực chiến" : "Operational Description"}</span>
                      </h4>
                      <p className="text-sm font-normal text-white/95 leading-relaxed">
                        {isVi ? activeItem.desc : activeItem.descEn || activeItem.desc}
                      </p>
                    </div>

                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="custom-glass-card-inset p-3.5 shadow-inner">
                        <span className="block text-[10px] text-white/70 font-bold uppercase mb-1">
                          {isVi ? "Vai trò chính" : "Core Role"}
                        </span>
                        <span className="block font-bold text-xs sm:text-sm text-white">
                          {isVi ? activeItem.details.coreRole : activeItem.details.coreRoleEn || activeItem.details.coreRole}
                        </span>
                      </div>
                      <div className="custom-glass-card-inset p-3.5 shadow-inner">
                        <span className="block text-[10px] text-white/70 font-bold uppercase mb-1">
                          {isVi ? "Quy mô đội ngũ" : "Team Scope"}
                        </span>
                        <span className="block font-bold text-xs sm:text-sm text-yellow-300">
                          {isVi ? activeItem.details.headcountScope : activeItem.details.headcountScopeEn || activeItem.details.headcountScope}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Right Column */}
                  <div className="space-y-4 md:space-y-5 flex flex-col justify-between">
                    
                    {/* Achievements Block */}
                    <div className="custom-glass-card-inset p-4 sm:p-5 shadow-inner">
                      <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-300 flex items-center gap-1.5 mb-2">
                        <Award className="w-4 h-4 text-amber-300" />
                        <span>{isVi ? "Thành tựu & Kết quả nổi bật" : "Key Operational Achievements"}</span>
                      </h4>
                      <ul className="space-y-2">
                        {activeItem.details.achievements.map((ach, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-white/95 font-medium">
                            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-300 mt-0.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tools / Tech Stack Block */}
                    <div className="custom-glass-card-inset p-4 shadow-inner">
                      <span className="block text-xs text-white/70 font-bold uppercase mb-2 flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-cyan-300" />
                        <span>{isVi ? "Hệ thống & Công cụ" : "Systems & Technology Stack"}</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeItem.details.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/15 border border-white/25 text-white shadow-2xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Direct Contact Button */}
                    <div className="custom-glass-card-inset p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
                      <div className="text-xs text-white/85 text-center sm:text-left">
                        {isVi ? "Liên hệ trao đổi sâu về lĩnh vực này?" : "Get consulting on this vertical?"}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href="#contact"
                          onClick={() => {
                            playUiSound("click");
                            setExpandedItemTitle(null);
                          }}
                          className="px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>{isVi ? "Kết nối ngay" : "Connect Now"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Bottom Brand Logos inside expanded container */}
                {activeItem.logos && activeItem.logos.length > 0 && (
                  <div className="mt-auto pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10 text-white">
                    <div className="text-xs font-semibold text-white/85">
                      {isVi ? "Đối tác & Thương hiệu tiêu biểu:" : "Key Client Brands & Partners:"}
                    </div>
                    <div className="flex items-center gap-3 flex-wrap justify-center">
                      {activeItem.logos.map((logo, lIdx) => (
                        <div
                          key={lIdx}
                          className="brand-circle-token-node w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-md flex items-center justify-center border-2 border-white/80 p-0.5"
                          title={logo.name}
                        >
                          <img
                            src={logo.url}
                            alt={logo.name}
                            className="w-full h-full object-contain rounded-full"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              /* Khi ở dạng lưới 6 ô (Collapsed view) */
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
                      borderRadius: "16px",
                      transform:
                        "perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) scale(var(--scale, 1))",
                      transformStyle: "preserve-3d",
                    }}
                    className={cn(
                      "domain-item group relative flex flex-col justify-between p-5 sm:p-6 text-white border transition-all duration-300 select-none cursor-pointer overflow-hidden w-full h-auto shadow-lg hover:shadow-2xl"
                    )}
                  >
                    {/* Embedded Colorful Gradient Background */}
                    <ServiceCardBackground title={item.title} className="opacity-95" />

                    {/* Background Swaying Watermark Icon matching HTML specs */}
                    {React.createElement(item.icon || Globe, {
                      className: cn(
                        "card-watermark-icon text-white/10 dark:text-white/5",
                        idx === 0 && "card-wm-1",
                        idx === 1 && "card-wm-2",
                        idx === 2 && "card-wm-3",
                        idx === 3 && "card-wm-4",
                        idx === 4 && "card-wm-5",
                        idx === 5 && "card-wm-6"
                      )
                    })}

                    {/* Top Row: Index on Left, Experience years on Right */}
                    <div className="w-full flex items-center justify-between z-20 mb-3 shrink-0">
                      {/* Left Index */}
                      <div className="flex items-center justify-center px-2.5 py-0.5 rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/40 dark:border-white/20 text-white font-mono text-[11px] font-bold shadow-xs">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      {/* Right Experience Years Badge */}
                      <div className="flex items-center justify-center px-2.5 py-0.5 rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/40 dark:border-white/20 text-white text-[10px] sm:text-[11px] font-semibold shadow-xs">
                        {getShortExp(item, isVi)}
                      </div>
                    </div>

                    <div>
                      {/* Header Row: Frameless Animated Icon */}
                      <div className="flex items-center gap-3.5 mb-4 mt-1">
                        <div className="animated-service-icon-wrapper w-11 h-11 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center">
                          {React.createElement(IconComponent, { className: "w-8 h-8 sm:w-9 sm:h-9 text-white stroke-[2.2] drop-shadow-md" })}
                        </div>
                        <div className="flex flex-col text-left min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold tracking-tight leading-snug drop-shadow-md text-white whitespace-nowrap truncate">
                            {isVi ? item.title : item.titleEn || item.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description Glass Bubble matching 'css-glass-card' */}
                      <div className="w-full custom-glass-card-inset p-3.5 text-xs text-white/95 leading-relaxed font-normal text-left shadow-inner line-clamp-3 hidden">
                        {isVi ? item.desc : item.descEn || item.desc}
                      </div>
                    </div>

                    {/* Bottom Partner Brand Logos inside each card */}
                    {item.logos && item.logos.length > 0 && (
                      <div className="mt-4 pt-3.5 border-t border-white/20 flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap relative z-10">
                        {item.logos.map((logoObj, lIdx) => (
                          <div
                            key={lIdx}
                            className="brand-circle-token-node w-10 h-10 sm:w-11 sm:h-11 rounded-full shadow-md flex items-center justify-center border-2 border-white/80 p-0.5"
                            title={logoObj.name}
                          >
                            <img
                              src={logoObj.url}
                              alt={logoObj.name}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-contain rounded-full"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
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
