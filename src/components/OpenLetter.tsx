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
  Lightbulb
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
    color: "#0284c7",
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
    color: "#0891b2",
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
    color: "#d97706",
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
    color: "#ea580c",
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
    yearNumber: "2014",
    yearLabelVi: "Năm 2014",
    yearLabelEn: "Year 2014",
    company: "Shopee",
    roleVi: "Quản lý Vận hành CSKH E-Commerce",
    roleEn: "E-Commerce CSKH Operations Manager",
    color: "#ee4d2d",
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
    color: "#e11d48",
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
    color: "#9333ea",
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
    color: "#059669",
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
  },
  {
    id: "card-2026",
    yearNumber: "2026",
    yearLabelVi: "Năm 2026",
    yearLabelEn: "Year 2026",
    company: "Khám Phá Mới",
    roleVi: "Chuyên gia / Quản lý CX cấp cao",
    roleEn: "Senior CX Expert & Leader",
    color: "#4f46e5",
    logo: "https://i.ibb.co/G4QnNzWb/Power-Service.png",
    icon: Compass,
    arrowDesktop: "compass",
    arrowTablet: "compass",
    desktopGridClass: "lg:col-start-1 lg:row-start-2",
    tabletGridClass: "md:col-start-2 md:row-start-4",
    descVi: "Sẵn sàng đón nhận thách thức, cơ hội công việc mới trong môi trường **chuyển đổi số toàn cầu** và ứng dụng **trí tuệ nhân tạo (AI)**.",
    descEn: "Ready to embrace fresh leadership challenges in **global digital transformation** and **AI-driven** environments.",
    highlightVi: "Mở ra chương mới với những tầm cao và giá trị vượt trội.",
    highlightEn: "Embarking on a new chapter reaching higher peaks and outstanding value."
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
            className="w-full glass-surface backdrop-blur-2xl rounded-[10px] border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-6 md:p-7 shadow-md hover:shadow-xl hover:border-emerald-400/60 dark:hover:border-emerald-400/60 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group z-10"
          >

            {/* Card Header formatted like Chi tiết phỏng vấn (Emerald theme, 4-word title) */}
            <div className="relative z-10 mb-3.5">
              <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-emerald-200/60 dark:border-emerald-800/60 mb-3">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <h3 className="text-card-title font-bold text-emerald-600 dark:text-emerald-400 tracking-wide">
                    {isVi ? "Thông điệp hợp tác" : "Partnership message"}
                  </h3>
                </div>
              </div>

              {/* Greeting */}
              <p className="text-amber-700 dark:text-amber-300 font-bold text-body-bold italic pl-1 leading-normal">
                {isVi ? "Kính gửi Quý đối tác, Quý khách hàng và toàn thể cộng sự," : "Dear Valued Partners, Customers, and Colleagues,"}
              </p>
            </div>

            {/* Body Content - Tối ưu bố cục chữ gọn gàng, trang nhã, tăng khả năng đọc */}
            <div className="relative z-10 flex flex-col w-full flex-1 justify-between space-y-4 my-2">
              <p className="tracking-normal text-slate-800 dark:text-slate-100 text-body leading-relaxed font-normal">
                {isVi ? (
                  <>
                    Tôi là <strong className="font-extrabold text-emerald-700 dark:text-emerald-400">Nguyễn Hùng Thái</strong>, Trưởng phòng Chăm sóc Khách hàng với hơn <strong className="font-extrabold text-emerald-700 dark:text-emerald-400">22 năm kinh nghiệm</strong> trong lĩnh vực xây dựng, vận hành và phát triển hệ thống dịch vụ khách hàng chuyên nghiệp.
                  </>
                ) : (
                  <>
                    I am <strong className="font-extrabold text-emerald-700 dark:text-emerald-400">Nguyen Hung Thai</strong>, Head of Customer Support with over <strong className="font-extrabold text-emerald-700 dark:text-emerald-400">22 years of experience</strong> in building, operating, and advancing professional customer service operations.
                  </>
                )}
              </p>
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
          <div className="w-full glass-surface backdrop-blur-2xl rounded-[10px] border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-6 md:p-7 shadow-md hover:shadow-xl hover:border-indigo-400/60 dark:hover:border-indigo-400/60 transition-all duration-300 flex flex-col justify-between group/card">
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
              <div className="rounded-[10px] p-4 bg-gradient-to-b from-blue-600 via-indigo-600 to-sky-700 text-white flex flex-col items-center justify-center text-center shadow-md shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-blue-300/40">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-1.5 shadow-inner">
                  <Box className="w-5 h-5 text-white" />
                </div>
                <span className="text-card-title font-bold tracking-normal">{isVi ? "Quy trình" : "Process"}</span>
                <span className="text-body-sm sm:text-body font-semibold text-blue-100 mt-1 leading-tight whitespace-nowrap">{isVi ? "Đơn giản & Tận tâm" : "Simple & Dedicated"}</span>
              </div>

              {/* 2. Con người */}
              <div className="rounded-[10px] p-4 bg-gradient-to-b from-amber-500 via-orange-600 to-amber-700 text-white flex flex-col items-center justify-center text-center shadow-md shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transform hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-amber-300/40">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-1.5 shadow-inner">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-card-title font-bold tracking-normal">{isVi ? "Con người" : "People"}</span>
                <span className="text-body-sm sm:text-body font-semibold text-amber-100 mt-1 leading-tight whitespace-nowrap">{isVi ? "Trao giá trị & Phát triển" : "Empower & Growth"}</span>
              </div>

              {/* 3. Nhân văn */}
              <div className="rounded-[10px] p-4 bg-gradient-to-b from-fuchsia-600 via-rose-600 to-pink-700 text-white flex flex-col items-center justify-center text-center shadow-md shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/40 transform hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-pink-300/40">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-1.5 shadow-inner">
                  <Heart className="w-5 h-5 text-white fill-white/30" />
                </div>
                <span className="text-card-title font-bold tracking-normal">{isVi ? "Nhân văn" : "Humanity"}</span>
                <span className="text-body-sm sm:text-body font-semibold text-pink-100 mt-1 leading-tight whitespace-nowrap">{isVi ? "Thấu hiểu & Đồng cảm" : "Empathy & Care"}</span>
              </div>

              {/* 4. Công nghệ */}
              <div className="rounded-[10px] p-4 bg-gradient-to-b from-emerald-500 via-teal-600 to-cyan-700 text-white flex flex-col items-center justify-center text-center shadow-md shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/40 transform hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-teal-300/40">
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
          className="w-full glass-surface backdrop-blur-3xl rounded-[10px] border border-slate-200/60 dark:border-slate-800/60 p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col relative overflow-hidden bg-white/20 dark:bg-slate-900/20 z-10"
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
            <div className="relative w-full py-4 px-1 xs:px-2" ref={gridContainerRef}>
              {/* Real 2-column Grid with Equal-Height Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch relative z-10 w-full">
                {CAREER_MILESTONES_ZICZAC.map((item, idx) => {
                  const IconComp = item.icon;

                  return (
                    <div
                      key={item.id}
                      className="flex flex-col justify-between rounded-2xl p-4.5 relative transition-all duration-300 backdrop-blur-md shadow-2xs hover:shadow-lg hover:-translate-y-1 overflow-hidden group/mcard border min-h-[220px] w-full"
                      style={{
                        borderColor: `${item.color}50`,
                        boxShadow: `0 4px 16px -2px ${item.color}18, 0 2px 6px -2px rgba(0, 0, 0, 0.04)`
                      }}
                    >
                      {/* Background Tint Layer */}
                      <div 
                        className="absolute inset-0 pointer-events-none rounded-2xl opacity-20 dark:opacity-25"
                        style={{
                          background: `linear-gradient(145deg, ${item.color}30 0%, ${item.color}10 45%, transparent 80%)`
                        }}
                      />
                      <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 -z-10 rounded-2xl" />

                      {/* Card Header Row: Arrow & Year on top, Company below */}
                      <div className="w-full flex flex-col gap-2 pb-2 mb-2 border-b border-dashed border-slate-200/80 dark:border-slate-800/80 relative z-10 shrink-0">
                        {/* Arrow Button / Compass & Year Tag on top */}
                        <div className="flex items-center justify-between gap-2 shrink-0">
                          <div className="flex items-center gap-2">
                            <div 
                              className="flex items-center justify-center text-caption font-bold shrink-0 px-2 py-1 rounded-md bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs relative transition-all duration-300 group-hover/mcard:scale-110 group-hover/mcard:shadow-md"
                              style={{ color: item.color }}
                            >
                              <span 
                                className="absolute -inset-0.5 rounded-md opacity-0 group-hover/mcard:opacity-70 blur-xs transition-opacity duration-300 -z-10 animate-pulse"
                                style={{ backgroundColor: item.color }}
                              />
                              {item.yearNumber === "2026" ? (
                                <Compass className="w-4 h-4 animate-spin-slow text-rose-500" />
                              ) : (
                                <ArrowRight className="w-3.5 h-3.5" />
                              )}
                            </div>

                            <span 
                              className="px-2.5 py-0.5 rounded-full text-white text-caption font-semibold shadow-2xs tracking-wide uppercase"
                              style={{ backgroundColor: item.color }}
                            >
                              {isVi ? item.yearLabelVi : item.yearLabelEn}
                            </span>
                          </div>
                        </div>

                        {/* Company Logo & Company Name */}
                        <div className="flex items-center gap-2.5 shrink-0 min-w-0">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center border bg-white dark:bg-slate-950 p-0 overflow-hidden shadow-2xs shrink-0 transition-transform duration-300 group-hover/mcard:scale-110"
                            style={{ borderColor: item.color }}
                          >
                            <img src={item.logo} alt={item.company} className="w-full h-full object-cover scale-110 rounded-full" referrerPolicy="no-referrer" />
                          </div>
                          <h4 
                            className="text-card-title font-bold tracking-tight leading-snug line-clamp-1"
                            style={{ color: item.color }}
                          >
                            {item.company}
                          </h4>
                        </div>
                      </div>

                      {/* Role */}
                      <div className="flex flex-col mb-2 relative z-10 shrink-0 text-left">
                        <div 
                          className="text-body-sm font-semibold tracking-wide line-clamp-1"
                          style={{ color: item.color }}
                        >
                          {isVi ? `Vị trí: ${item.roleVi}` : `Position: ${item.roleEn}`}
                        </div>
                      </div>

                      <div className="card-body text-slate-700 dark:text-slate-300 flex-1 flex flex-col justify-between text-left relative z-10">
                        <div className={cn("relative overflow-hidden transition-all duration-300 mb-3", 
                          item.id === "card-2013" && !expandedCard[item.id] && "max-h-[220px] line-clamp-[7]"
                        )}>
                          <p className="text-body text-slate-800 dark:text-slate-100 text-left">
                            {renderFormattedText(isVi ? item.descVi : item.descEn)}
                          </p>
                          {item.id === "card-2013" && !expandedCard[item.id] && (
                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/95 dark:from-slate-900/95 to-transparent pointer-events-none" />
                          )}
                        </div>

                        {item.id === "card-2013" && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              try { playUiSound("click"); } catch {}
                              setExpandedCard(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                            }}
                            className="text-2xs font-bold text-indigo-600 dark:text-cyan-400 hover:underline mb-3 self-start cursor-pointer inline-flex items-center gap-1"
                          >
                            {expandedCard[item.id] ? (
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
                          style={{ borderLeftColor: item.color }}
                        >
                          {isVi ? item.highlightVi : item.highlightEn}
                        </div>
                      </div>
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
          <div className="glass-surface backdrop-blur-2xl rounded-[10px] border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-7 shadow-md hover:shadow-xl hover:border-blue-400/60 dark:hover:border-blue-400/60 transition-all duration-300 flex flex-col justify-between group/tech">
            <div>
              {/* Header formatted exactly like Thông điệp hợp tác (Card Title / H6: 15px - 16px, bold, color matching icon) */}
              <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-blue-200/60 dark:border-blue-800/60 mb-3">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <h3 className="text-card-title font-bold text-blue-600 dark:text-blue-400 tracking-wide">
                    {isVi ? "Giải pháp công nghệ" : "Technology solutions"}
                  </h3>
                </div>
              </div>

              {/* Enhanced Description with Bold Highlighted Text */}
              <p className="text-body text-slate-700 dark:text-slate-200 text-left mb-4">
                {isVi ? (
                  <>
                    <strong className="font-extrabold text-slate-900 dark:text-white">Tối ưu hóa quy trình toàn diện</strong> từ đầu đến cuối, kết hợp <strong className="font-extrabold text-blue-600 dark:text-blue-400">Trí tuệ nhân tạo (AI)</strong> và hệ sinh thái <strong className="font-extrabold text-blue-600 dark:text-blue-400">CRM Omni–Channel 360°</strong> nhằm mang lại trải nghiệm khách hàng vượt trội, tự động hóa và nâng cao hiệu suất chăm sóc khách hàng bền vững.
                  </>
                ) : (
                  <>
                    <strong className="font-extrabold text-slate-900 dark:text-white">End-to-end workflow optimization</strong>, seamlessly combining <strong className="font-extrabold text-blue-600 dark:text-blue-400">Artificial Intelligence (AI)</strong> and <strong className="font-extrabold text-blue-600 dark:text-blue-400">Omni-Channel CRM 360°</strong> ecosystems to deliver superior customer experiences, smart automation, and sustainable service performance.
                  </>
                )}
              </p>

              {/* Tech Solution Pillars Feature Cards - Subcard 1 cột giúp thẻ thoáng đãng, dễ đọc */}
              <div className="grid grid-cols-1 gap-2.5 sm:gap-3 my-4 w-full">
                <div className="w-full p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/70 flex items-center gap-3 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 backdrop-blur-md">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Layers className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-body-sm font-bold text-slate-900 dark:text-slate-100 truncate">CRM Omni 360°</h5>
                    <p className="text-caption text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                      {isVi ? "Hợp nhất kênh tương tác Đa kênh" : "Unified omnichannel touchpoints"}
                    </p>
                  </div>
                </div>

                <div className="w-full p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/70 flex items-center gap-3 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 backdrop-blur-md">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <LayoutDashboard className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-body-sm font-bold text-slate-900 dark:text-slate-100 truncate">Dashboard BI</h5>
                    <p className="text-caption text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                      {isVi ? "Báo cáo phân tích dữ liệu theo thời gian thực" : "Real-time analytics & reporting"}
                    </p>
                  </div>
                </div>

                <div className="w-full p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/70 flex items-center gap-3 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 backdrop-blur-md">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Bot className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-body-sm font-bold text-slate-900 dark:text-slate-100 truncate">AI Chatbot</h5>
                    <p className="text-caption text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                      {isVi ? "Tự động hóa phản hồi & chăm sóc 24/7" : "24/7 Automated support & routing"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: TÂM THƯ TRI ÂN */}
          <div className="glass-surface backdrop-blur-2xl rounded-[10px] border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-7 shadow-md hover:shadow-xl hover:border-emerald-400/60 dark:hover:border-emerald-400/60 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Header formatted exactly like Thông điệp hợp tác (Card Title / H6: 15px - 16px, bold, color matching icon) */}
              <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-emerald-200/60 dark:border-emerald-800/60 mb-3">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <h3 className="text-card-title font-bold text-emerald-600 dark:text-emerald-400 tracking-wide">
                    {isVi ? "Tâm thư tri ân" : "Gratitude statement"}
                  </h3>
                </div>
              </div>

              <p className="text-body text-slate-700 dark:text-slate-200 text-left mb-4">
                {isVi 
                  ? "Tôi mong muốn được đồng hành cùng Quý Doanh nghiệp để kiến tạo giá trị, lan tỏa sự hài lòng và cùng nhau phát triển bền vững. Với kinh nghiệm, nhiệt huyết và tinh thần thấu hiểu sâu sắc, tôi tin tưởng vào những thành công tốt đẹp sắp tới."
                  : "I look forward to partnering with your organization to create enduring value, promote customer satisfaction, and achieve sustainable growth together. With experience, passion, and deep empathy, I believe in our upcoming success."}
              </p>
            </div>

            {/* Bottom Section: Signature on Right */}
            <div className="flex items-center justify-end pt-2">
              {/* Right Signature Block */}
              <div className="flex flex-col items-center sm:items-end text-center sm:text-right shrink-0 min-w-[135px] pl-1">
                <SignatureSvg />
                <h4 className="text-card-title font-bold text-slate-900 dark:text-white mt-0.5">
                  Nguyễn Hùng Thái
                </h4>
                <span className="text-caption font-semibold text-slate-500 dark:text-slate-400">
                  {isVi ? "Trưởng phòng Chăm sóc Khách hàng" : "Head of Customer Support"}
                </span>
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
          className="w-full glass-surface backdrop-blur-2xl rounded-[10px] border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-7 shadow-md hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all duration-300 flex flex-col items-start w-full group/values z-10"
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

          {/* 4 Cột Giá Trị Cốt Lõi với đường vạch phân cách mờ ở giữa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 dark:divide-slate-800">
            {/* 1. Tận tâm */}
            <div className="flex flex-col items-center text-center px-3 sm:px-4 py-3 sm:py-0 group hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 flex items-center justify-center mb-2.5 transition-transform duration-300 group-hover:scale-110">
                <DedicatedHeartIcon className="w-12 h-12" />
              </div>
              <h4 className="text-[16px] font-bold text-indigo-600 dark:text-indigo-400 tracking-normal mb-1">
                {isVi ? "Tận tâm" : "Dedication"}
              </h4>
              <p className="text-body-sm text-slate-700 dark:text-slate-300 text-center max-w-[30ch]">
                {isVi ? "Đặt khách hàng làm trọng tâm mọi quyết định và hành động." : "Put customers at the center of every decision and action."}
              </p>
            </div>

            {/* 2. Chuyên nghiệp */}
            <div className="flex flex-col items-center text-center px-3 sm:px-4 py-3 sm:py-0 group hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 flex items-center justify-center mb-2.5 transition-transform duration-300 group-hover:scale-110">
                <TargetProfessionalIcon className="w-12 h-12" />
              </div>
              <h4 className="text-sm font-extrabold text-purple-600 dark:text-purple-400 tracking-normal mb-1">
                {isVi ? "Chuyên nghiệp" : "Professionalism"}
              </h4>
              <p className="text-body-sm text-slate-700 dark:text-slate-300 text-center max-w-[30ch]">
                {isVi ? "Đặt chuẩn mực làm nền tảng mọi quy trình và hoạt động." : "Set standards as the foundation for every process and operation."}
              </p>
            </div>

            {/* 3. Đổi mới */}
            <div className="flex flex-col items-center text-center px-3 sm:px-4 py-3 sm:py-0 group hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 flex items-center justify-center mb-2.5 transition-transform duration-300 group-hover:scale-110">
                <InnovationBulbIcon className="w-12 h-12" />
              </div>
              <h4 className="text-sm font-extrabold text-amber-500 dark:text-amber-400 tracking-normal mb-1">
                {isVi ? "Đổi mới" : "Innovation"}
              </h4>
              <p className="text-body-sm text-slate-700 dark:text-slate-300 text-center max-w-[30ch]">
                {isVi ? "Đặt công nghệ làm động lực mọi sáng tạo và cải tiến." : "Drive technology as the catalyst for all creativity and improvement."}
              </p>
            </div>

            {/* 4. Đồng hành */}
            <div className="flex flex-col items-center text-center px-3 sm:px-4 py-3 sm:py-0 group hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 flex items-center justify-center mb-2.5 transition-transform duration-300 group-hover:scale-110">
                <PartnershipHandshakeIcon className="w-12 h-12" />
              </div>
              <h4 className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 tracking-normal mb-1">
                {isVi ? "Đồng hành" : "Partnership"}
              </h4>
              <p className="text-body-sm text-slate-700 dark:text-slate-300 text-center max-w-[30ch]">
                {isVi ? "Đặt tin tưởng làm nền tảng mọi hợp tác và phát triển." : "Build trust as the foundation for all collaboration and growth."}
              </p>
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
          className="w-full relative group/banner overflow-hidden rounded-[10px] z-10"
        >
          {/* Lớp viền neon quang học phát sáng ngoài (Neon Glow Aura) */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-fuchsia-500/30 rounded-[10px] blur-xl opacity-60 group-hover/banner:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Khối Banner Kính Mờ Glass UI Neon */}
          <div className="relative z-10 w-full rounded-[10px] bg-gradient-to-br from-slate-900/95 via-indigo-950/90 to-slate-950/95 dark:from-[#090D16]/95 dark:via-[#0B0F19]/90 dark:to-[#090D16]/95 text-white p-6 sm:p-8 md:p-9 border border-cyan-400/40 dark:border-cyan-400/50 shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_30px_rgba(0,245,255,0.18),inset_0_1.5px_2px_rgba(255,255,255,0.22)] backdrop-blur-2xl flex flex-col items-center justify-center text-center overflow-hidden">
            
            {/* Ambient Radial Lighting Blobs */}
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-44 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Subtle Top Specular Light Line */}
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

            {/* Giant Glowing Quote Container */}
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center px-2 sm:px-6">
              {/* Top Quote Icon */}
              <div className="mb-2 text-cyan-400/60 dark:text-cyan-400/70">
                <Quote className="w-9 h-9 sm:w-11 sm:h-11 transform scale-x-[-1] drop-shadow-[0_0_12px_rgba(0,245,255,0.4)]" />
              </div>

              {/* Main Vietnamese Quote with Shimmer Gradient */}
              <h3 className="text-base sm:text-xl md:text-2xl lg:text-2xl font-black tracking-tight leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-indigo-100 dark:from-white dark:via-cyan-200 dark:to-teal-100 drop-shadow-sm font-sans mb-2 select-none">
                “{isVi 
                  ? "Thành công không chỉ đến từ năng lực, mà từ sự chân thành và tinh thần phụng sự." 
                  : "Success comes not only from competence, but from sincerity and a spirit of service."}”
              </h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
