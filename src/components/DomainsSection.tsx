import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Globe,
  Smartphone,
  ShieldCheck,
  Wallet,
  Layers,
  Gamepad2,
  Briefcase,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Calendar,
  Users,
  Check,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { cn } from "../lib/utils";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";

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
  "Thanh toán điện tử": {
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
    headcountScope: string;
    keyProjects: string[];
    achievements: string[];
    techStack: string[];
    coreRole: string;
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
    desc: "Hơn 10 năm kinh nghiệm trong ngành viễn thông, từ mạng di động đến dịch vụ gọi quốc tế, nhắn tin và giải pháp kết nối toàn diện.",
    descEn: "Over 10 years of experience in telecom, from mobile networks to international calling services, building a solid foundation in large-scale CX operations.",
    logos: [
      { name: "Mobifone", url: "https://i.ibb.co/VWVjVj5T/Mobifone.png", color: "#005baa" },
      { name: "Vinaphone", url: "https://i.ibb.co/21kP4Z5b/Vinaphone.png", color: "#00a1e4" },
      { name: "Viettel", url: "https://i.ibb.co/JFF3sR4P/Viettel.png", color: "#ee0000" },
      { name: "FPT Telecom", url: "https://i.ibb.co/Z68H14v6/FPT.png", color: "#f37021" },
    ],
    details: {
      tagline: "Nền tảng vận hành & Chăm sóc khách hàng quy mô lớn tiêu chuẩn tập đoàn",
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
  },
  {
    color: "#ea580c",
    icon: Globe,
    title: "Thương mại điện tử",
    titleEn: "E-Commerce",
    category: "fintech",
    image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80",
    desc: "Vận hành Chăm Sóc Khách Hàng cho các sàn thương mại điện tử hàng đầu, xử lý khiếu nại đơn hàng, vận chuyển và hoàn tiền.",
    descEn: "Driving CX operations for top-tier E-commerce platforms, orchestrating high-volume dispute resolutions, logistics SLAs, and buyer protection.",
    logos: [
      { name: "Shopee", url: "https://i.ibb.co/BSVS4xf/Shopee.png", color: "#ee4d2d" },
      { name: "Finviet", url: "https://i.ibb.co/7NtSSz4d/Finviet.png", color: "#eab308" },
    ],
    details: {
      tagline: "Xử lý hàng triệu tương tác khách hàng & đối tác bán hàng trong các mùa Mega Sale",
      experienceYears: "4+ Năm",
      headcountScope: "30 - 80+ Nhân sự",
      keyProjects: [
        "3.1 · Ứng dụng AI phân tích giọng nói và cảm xúc",
        "2.2 · Tối ưu hóa các kênh hỗ trợ khách hàng",
      ],
      achievements: [
        "Tối ưu tỷ lệ giải quyết khiếu nại lần đầu (FCR) đạt 89.5%",
        "Vận hành thông suốt các chiến dịch Mega Sale 11.11, 12.12 không nghẽn kênh",
        "Giảm 35% thời gian phản hồi tin nhắn Live Chat cho người mua",
      ],
      techStack: ["Zendesk", "Shopee Internal CRM", "LiveChat Engine", "AI NLP Parser"],
      coreRole: "E-Commerce Customer Support Operations Manager",
    },
  },
  {
    color: "#0284c7",
    icon: ShieldCheck,
    title: "Bảo hiểm nhân thọ",
    titleEn: "Life Insurance",
    category: "insurance",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    desc: "Quản lý tổng đài và triển khai các dự án tích hợp hệ thống Call Center, tối ưu quy trình vận hành và nâng cao trải nghiệm khách hàng.",
    descEn: "Managing contact centers and implementing integrated Call Center projects, optimizing workflows, and elevating customer experience.",
    logos: [
      { name: "Prudential", url: "https://i.ibb.co/XfpQphWF/Prudential.png", color: "#dc2626" },
    ],
    details: {
      tagline: "Chuẩn mực bảo mật & dịch vụ khách hàng tài chính cá nhân khắt khe bậc nhất",
      experienceYears: "3+ Năm",
      headcountScope: "20 - 50+ Chuyên viên",
      keyProjects: [
        "1.1 · Xây dựng và vận hành Phòng Dịch vụ Khách hàng",
        "2.1 · Chuẩn hóa quy trình chăm sóc khách hàng",
      ],
      achievements: [
        "Nâng chỉ số hài lòng khách hàng CSAT ngành bảo hiểm lên mức 94.8%",
        "Số hóa 100% hồ sơ giải quyết quyền lợi bảo hiểm trực tuyến",
        "Đảm bảo tuân thủ 100% các tiêu chuẩn pháp lý & bảo mật dữ liệu khách hàng",
      ],
      techStack: ["Genesys Cloud", "Financial Core ERP", "Audit Logger", "Quality Assurance Suite"],
      coreRole: "Contact Center Manager - Insurance Operations",
    },
  },
  {
    color: "#059669",
    icon: Gamepad2,
    title: "Thể thao điện tử",
    titleEn: "eSports & Gaming",
    category: "fintech",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    desc: "Xây dựng và quản lý bộ phận Chăm Sóc Khách Hàng cho nhà phát hành game, vận hành hệ thống game và cộng đồng người chơi.",
    descEn: "Building and managing Customer Support for top game publishers, operating large-scale ticket desks and accompanying major eSports tournaments.",
    logos: [
      { name: "Garena", url: "https://i.ibb.co/h1Md65yV/Garena.png", color: "#df2027" },
      { name: "VED", url: "https://i.ibb.co/fYPJLfbw/VED.png", color: "#ef4444" },
      { name: "GCafe", url: "https://i.ibb.co/FkWk3s4W/GCafe.png", color: "#ff6600" },
    ],
    details: {
      tagline: "Chăm sóc cộng đồng game thủ hàng chục triệu người chơi & hỗ trợ giải đấu eSports đỉnh cao",
      experienceYears: "5+ Năm",
      headcountScope: "40 - 100+ Game Masters",
      keyProjects: [
        "1.3 · Xây dựng cơ chế phối hợp liên phòng ban",
        "3.2 · Triển khai hệ thống tự động hóa phản hồi",
      ],
      achievements: [
        "Xây dựng đội ngũ Game Master hỗ trợ 24/7 cho các tựa game eSports hàng đầu",
        "Phát hiện & ngăn chặn hàng ngàn vụ gian lận tài khoản và vi phạm điều khoản",
        "Tổ chức trung tâm hỗ trợ trực tiếp tại các sự kiện chung kết giải đấu quốc gia",
      ],
      techStack: ["Garena Desk CRM", "Anti-Cheat Monitor", "Ticketing Engine", "Discord Hub"],
      coreRole: "Customer Support & Community Manager",
    },
  },
  {
    color: "#d97706",
    icon: Wallet,
    title: "Thanh toán điện tử",
    titleEn: "Digital Payments & FinTech",
    category: "fintech",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    desc: "Am hiểu vận hành Chăm Sóc Khách Hàng trong lĩnh vực FinTech, từ xác minh người dùng đến xử lý giao dịch và khiếu nại.",
    descEn: "Deep expertise in FinTech CS operations, spanning eKYC identity verification, transaction resolution, risk control, and merchant support.",
    logos: [
      { name: "MoMo", url: "https://i.ibb.co/k2QtrgTw/Momo.png", color: "#ec4899" },
      { name: "ShopeePay", url: "https://i.ibb.co/LdYv3TJy/Shopee-Paye.png", color: "#ee4d2d" },
    ],
    details: {
      tagline: "Vận hành hệ thống hỗ trợ giao dịch số, xác thực eKYC & an toàn thanh toán ngân hàng",
      experienceYears: "3+ Năm",
      headcountScope: "25 - 60+ Chuyên viên",
      keyProjects: [
        "3.1 · Ứng dụng AI phân tích giọng nói và cảm xúc",
        "1.2 · Thiết lập mục tiêu và chỉ tiêu hoạt động",
      ],
      achievements: [
        "Xử lý hàng triệu lượt xác minh tài khoản định danh điện tử eKYC",
        "Thiết lập quy trình xử lý tra soát khiếu nại tài chính trong vòng 2 giờ",
        "Đạt tỷ lệ đánh giá dịch vụ CSAT 98.2% trên các kênh hỗ trợ số",
      ],
      techStack: ["MoMo Admin CRM", "ShopeePay Merchant Portal", "FinTech Security Gateway"],
      coreRole: "FinTech Customer Care Operations Lead",
    },
  },
  {
    color: "#e11d48",
    icon: Layers,
    title: "Xây dựng hệ thống",
    titleEn: "System Architecture & CX",
    category: "insurance",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    desc: "Tư vấn xây dựng và tối ưu hệ thống Chăm Sóc Khách Hàng toàn diện, từ quy trình, nhân sự đến công nghệ và dữ liệu.",
    descEn: "Consulting on end-to-end Customer Care system setup, from SOP processes and staffing to CRM and AI automation for enterprise efficiency.",
    logos: [
      { name: "Power Service", url: "https://i.ibb.co/G4QnNzWb/Power-Service.png", color: "#16a34a" },
      { name: "Logo-VED", url: "https://i.ibb.co/BKHcWL5R/Logo-VED.gif", color: "#ef4444" },
    ],
    details: {
      tagline: "Tư vấn giải pháp toàn diện từ con người, quy trình đến chuyển đổi số",
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
      techStack: ["Zoho CRM", "Salesforce", "Notion SOP Matrix", "Process Flowcharting"],
      coreRole: "CX & Service System Consultant",
    },
  },
];

export function DomainsSection() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedItemTitle, setExpandedItemTitle] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return DOMAINS_DATA.filter((item) => {
      if (selectedCategory === "all") return true;
      return item.category === selectedCategory;
    });
  }, [selectedCategory]);

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
      className="w-full flex flex-col gap-3.5 pt-4 pb-2 border-t border-slate-200/60 dark:border-slate-800/60 animate-fadeIn select-none"
    >
      {/* Header Lĩnh vực chuyên môn */}
      <div className="w-full flex flex-col gap-2 pb-2.5 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </div>
            <h2 className="text-base sm:text-lg font-black tracking-tight text-emerald-600 dark:text-emerald-400">
              {isVi ? "Lĩnh vực chuyên môn" : "Core Domains & Industry Expertise"}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-2xs">
              {isVi ? "6 Ngành thực chiến" : "6 Key Industries"}
            </span>
            <span className="hidden sm:inline-flex text-xs font-mono font-black text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-2xs">
              {isVi ? `Hiển thị ${filteredItems.length} lĩnh vực` : `Showing ${filteredItems.length} domains`}
            </span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <div className="flex bg-slate-100/90 dark:bg-slate-900/90 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs">
            {INDUSTRY_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const label = isVi ? cat.titleVi : cat.titleEn;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playUiSound("click");
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                  }`}
                >
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 6 Cards Bento Grid with Distinct Color per Card */}
      <LayoutGroup>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 py-1">
          {filteredItems.map((item) => {
            const Icon = item.icon || Globe;
            const theme = CARD_THEME_STYLES[item.title] || {
              accentColor: item.color,
              bgGradient: "bg-white dark:bg-slate-900",
              borderClass: "border-slate-200 dark:border-slate-800",
              iconBgClass: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
              dotColor: item.color,
            };
            const accentColor = theme.accentColor;

            return (
              <div
                key={item.title}
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
                className={cn(
                  "group relative flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 select-none cursor-pointer shadow-xs hover:shadow-xl hover:-translate-y-1 backdrop-blur-xl",
                  theme.bgGradient,
                  theme.borderClass
                )}
                style={{
                  transform:
                    "perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) scale(var(--scale, 1))",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* 1. Top Circular Icon Badge */}
                <div
                  className={cn(
                    "w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center mb-2.5 transition-transform duration-300 group-hover:scale-110 shadow-xs",
                    theme.iconBgClass
                  )}
                >
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
                </div>

                {/* 2. Main Title with Distinct Accent Color */}
                <h3
                  className="font-play font-black text-base sm:text-lg tracking-tight leading-snug"
                  style={{ color: accentColor }}
                >
                  {isVi ? item.title : item.titleEn || item.title}
                </h3>

                {/* 3. Experience Years Subtitle */}
                <div className="text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5">
                  {item.details.experienceYears} {isVi ? "kinh nghiệm" : "experience"}
                </div>

                {/* 4. Center Dot Divider */}
                <div className="flex items-center justify-center gap-1.5 my-2">
                  <div className="w-4 h-[1.5px] rounded-full opacity-30" style={{ backgroundColor: accentColor }} />
                  <div className="w-1.5 h-1.5 rounded-full opacity-80" style={{ backgroundColor: accentColor }} />
                  <div className="w-4 h-[1.5px] rounded-full opacity-30" style={{ backgroundColor: accentColor }} />
                </div>

                {/* 5. Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 text-center leading-relaxed line-clamp-2 px-1">
                  {isVi ? item.desc : item.descEn || item.desc}
                </p>

                {/* 6. Projects Divider */}
                <div className="w-full flex items-center gap-2 my-2.5">
                  <div className="h-[1px] flex-1 opacity-25" style={{ backgroundColor: accentColor }} />
                  <span className="text-[10px] font-bold tracking-wide shrink-0" style={{ color: accentColor }}>
                    {isVi ? "Dự án tiêu biểu" : "Featured Projects"}
                  </span>
                  <div className="h-[1px] flex-1 opacity-25" style={{ backgroundColor: accentColor }} />
                </div>

                {/* 7. Brand Logos */}
                <div className="flex items-center justify-center flex-wrap gap-2 max-w-full mt-auto pt-1">
                  {item.logos &&
                    item.logos.map((logoObj: BrandLogo, lIdx: number) => (
                      <div
                        key={lIdx}
                        className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200/90 dark:border-slate-700 bg-white p-0 shadow-xs transition-transform duration-300 group-hover:scale-105 hover:!scale-115"
                        title={logoObj.name}
                      >
                        <img
                          src={logoObj.url}
                          alt={logoObj.name}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover rounded-full"
                          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </LayoutGroup>

      {/* Expanded Modal View with Full Detail */}
      <AnimatePresence>
        {activeItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-md"
            onClick={() => {
              playUiSound("close");
              setExpandedItemTitle(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white dark:bg-slate-900 border-2 rounded-2xl shadow-2xl p-5 sm:p-6 flex flex-col gap-4 text-left"
              style={{
                borderColor: activeItem.color,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md"
                    style={{ backgroundColor: activeItem.color }}
                  >
                    {React.createElement(activeItem.icon || Globe, { className: "w-6 h-6 stroke-[2.5]" })}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black" style={{ color: activeItem.color }}>
                      {isVi ? activeItem.title : activeItem.titleEn || activeItem.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {activeItem.details.tagline}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    playUiSound("close");
                    setExpandedItemTitle(null);
                  }}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-all cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                    {isVi ? "Thời gian" : "Experience"}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mt-0.5">
                    {activeItem.details.experienceYears}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                    {isVi ? "Quy mô quản lý" : "Team Scope"}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mt-0.5 truncate">
                    {activeItem.details.headcountScope}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                    {isVi ? "Vai trò nòng cốt" : "Core Role"}
                  </span>
                  <span className="text-xs font-black text-slate-900 dark:text-white mt-0.5 truncate">
                    {activeItem.details.coreRole}
                  </span>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: activeItem.color }} />
                  <span>{isVi ? "Thành tựu vận hành tiêu biểu" : "Key Operational Milestones"}</span>
                </h4>
                <ul className="space-y-1.5">
                  {activeItem.details.achievements.map((ach, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: activeItem.color }} />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 mb-2">
                  {isVi ? "Hệ thống & Công nghệ" : "Tech Stack & Systems"}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeItem.details.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    playUiSound("close");
                    setExpandedItemTitle(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer"
                >
                  {isVi ? "Đóng" : "Close"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playUiSound("click");
                    setExpandedItemTitle(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-4 py-2 rounded-xl text-white text-xs font-black transition-all cursor-pointer shadow-md flex items-center gap-1.5 active:scale-95"
                  style={{ backgroundColor: activeItem.color }}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{isVi ? "Liên hệ trao đổi ngay" : "Contact About This Domain"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DomainsSection;
