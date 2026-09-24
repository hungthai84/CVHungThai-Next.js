import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import {
  LucideIcon,
  Maximize2,
  X,
  Quote,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Command,
  ArrowRight,
} from "lucide-react";
import { getThemeGradientConfig } from "./SectionNavigationLoader";
import { PAGE_HEADER_DATA } from "../data/pageHeaderData";

export interface FloatingSectionTitleLabelProps {
  sectionId: string;
  sectionTitle: string;
  sectionIndex: number;
  totalSections: number;
  Icon?: LucideIcon;
  theme?: string;
  lang?: "vi" | "en";
  className?: string;
}

// Extra structured metadata for each specific section in the expandable view
const SECTION_EXTRA_DETAILS: Record<
  string,
  {
    tagVi: string;
    tagEn: string;
    shortcut: string;
    descriptionVi: string;
    descriptionEn: string;
    highlightsVi: string[];
    highlightsEn: string[];
  }
> = {
  home: {
    tagVi: "Tổng quan điều hành",
    tagEn: "Executive Dashboard",
    shortcut: "1",
    descriptionVi: "Trung tâm diện kiến tổng quan hồ sơ năng lực 22+ năm, triết lý quản trị dịch vụ khách hàng và các chỉ số đo lường hiệu suất CX/CS chủ chốt.",
    descriptionEn: "Central executive hub featuring 22+ years of professional leadership, CX philosophy, and key performance metrics.",
    highlightsVi: [
      "Chỉ số năng lực quản trị CX cốt lõi & thành tựu nổi bật",
      "Tầm nhìn & Định vị chiến lược chuyển đổi số bền vững",
      "Tổng quan hành trình 22+ năm phụng sự và cống hiến",
    ],
    highlightsEn: [
      "Core CX Management Indicators & Executive Achievements",
      "Sustainable Strategic Digital Transformation Vision",
      "22+ Years Service Journey & Leadership Overview",
    ],
  },
  about: {
    tagVi: "Hồ sơ cá nhân & Triết lý",
    tagEn: "Profile & Philosophy",
    shortcut: "2",
    descriptionVi: "Hồ sơ chân dung lãnh đạo, nguyên tắc quản trị thấu cảm (Servant Leadership), cam kết chất lượng dịch vụ và các giá trị văn hóa tổ chức cốt lõi.",
    descriptionEn: "Executive portrait, Servant Leadership principles, commitment to service excellence, and organizational culture values.",
    highlightsVi: [
      "Triết lý lãnh đạo phục vụ (Servant Leadership)",
      "Bộ giá trị văn hóa ứng xử chuyên nghiệp và tận tâm",
      "Hành trình tôi luyện bản lĩnh quản trị qua các thời kỳ",
    ],
    highlightsEn: [
      "Servant Leadership Philosophy & Empathic Management",
      "Professional Code of Cultural Values & Dedication",
      "Executive Resilience & Leadership Evolution Journey",
    ],
  },
  skills: {
    tagVi: "Khung năng lực chuyên môn",
    tagEn: "Competency Framework",
    shortcut: "3",
    descriptionVi: "Bản đồ năng lực quản trị CX toàn diện, ma trận kỹ năng chuyên môn, bảng phân tích SWOT cá nhân và hệ sinh thái công nghệ hỗ trợ.",
    descriptionEn: "Comprehensive CX management competency map, domain skill matrix, personal SWOT analysis, and modern tech stack tooling.",
    highlightsVi: [
      "Khung năng lực CX & Vận hành quy mô lớn",
      "Bảng phân tích SWOT năng lực thực chiến",
      "Hệ sinh thái công nghệ & Công cụ quản trị hiện đại",
    ],
    highlightsEn: [
      "Enterprise CX & Operations Framework",
      "Practical SWOT Competency Analysis",
      "Operations Tooling & Modern Tech Stack Ecosystem",
    ],
  },
  education: {
    tagVi: "Văn bằng & Chứng chỉ",
    tagEn: "Academic & Certifications",
    shortcut: "4",
    descriptionVi: "Nền tảng học thuật đại học, hệ thống chứng chỉ quản trị quốc tế và lộ trình nâng cao năng lực liên tục trong kỷ nguyên số hóa.",
    descriptionEn: "Academic university degrees, international professional certificates, and continuous upskilling path in the digital age.",
    highlightsVi: [
      "Văn bằng Cử nhân Quản trị chính quy",
      "Chứng chỉ quốc tế uy tín về CX, IT & Lãnh đạo",
      "Hồ sơ xác thực số hóa & Đào tạo nâng cao liên tục",
    ],
    highlightsEn: [
      "Formal Academic Bachelor's Degrees",
      "Accredited International CX & Leadership Certs",
      "Digital Credential Verification Portfolio",
    ],
  },
  experience: {
    tagVi: "Dấu ấn sự nghiệp 22+ năm",
    tagEn: "22+ Years Career Journey",
    shortcut: "5",
    descriptionVi: "Dòng thời gian sự nghiệp thực chiến tại các tập đoàn lớn, các cột mốc thăng tiến vượt bậc và những dấu ấn dẫn dắt đội ngũ thành công.",
    descriptionEn: "Hands-on corporate leadership timeline, notable promotions, and key milestones in driving high-performing operational teams.",
    highlightsVi: [
      "22+ năm kinh nghiệm quản trị thực chiến",
      "Lãnh đạo đội ngũ vận hành quy mô lớn",
      "Chuyển giao và chuẩn hóa quy trình xuất sắc",
    ],
    highlightsEn: [
      "22+ Years Hands-on Leadership Experience",
      "Large-Scale Team Management & Coaching",
      "Operational Process Standardization",
    ],
  },
  projects: {
    tagVi: "Dự án chuyển đổi số",
    tagEn: "Key Digital Projects",
    shortcut: "6",
    descriptionVi: "Bộ sưu tập các dự án tiêu biểu về tối ưu luồng CSKH, tự động hóa tương tác đa kênh và các sáng kiến nâng cao chỉ số NPS/CSAT.",
    descriptionEn: "Showcase of breakthrough projects in CS workflow optimization, omnichannel automation, and measurable NPS/CSAT enhancements.",
    highlightsVi: [
      "Tự động hóa luồng tiếp nhận & Xử lý khiếu nại",
      "Tối ưu hóa hành trình khách hàng đa kênh (Omnichannel)",
      "Giải pháp đo lường ROI và chuyển đổi số thực chất",
    ],
    highlightsEn: [
      "Automated Inquiry & Escalation Routing",
      "Omnichannel Journey Streamlining",
      "Measurable ROI & Digital Innovation Metrics",
    ],
  },
  interview: {
    tagVi: "Phỏng vấn tình huống AI",
    tagEn: "AI Interactive Interview",
    shortcut: "7",
    descriptionVi: "Môi trường tương tác phỏng vấn đa chiều với trợ lý AI, giải đáp các câu hỏi thực chiến về tình huống quản trị và điều phối dự án khó.",
    descriptionEn: "Multidimensional interactive interview environment powered by AI, addressing executive operational scenarios and complex challenges.",
    highlightsVi: [
      "Tình huống xử lý khủng hoảng truyền thông CX",
      "Nghệ thuật xây dựng và truyền cảm hứng cho đội ngũ",
      "Góc nhìn chuyên sâu về quản trị vận hành",
    ],
    highlightsEn: [
      "CX Crisis Resolution Scenarios",
      "Team Motivation & Alignment Artistry",
      "In-depth Operational Perspectives",
    ],
  },
  tuvi: {
    tagVi: "Hồ sơ Tử vi & Chiêm tinh",
    tagEn: "Wisdom Profile & Astrology",
    shortcut: "8",
    descriptionVi: "Khám phá bản mệnh, thiên thời địa lợi và phong cách lãnh đạo tự nhiên thông qua góc nhìn minh triết phương Đông và chiêm tinh học.",
    descriptionEn: "Exploring personality traits, strategic timing, and authentic leadership style through Eastern astrology and ancient wisdom.",
    highlightsVi: [
      "Lá số Tử vi cá nhân & Định vị phong cách",
      "Nghệ thuật ứng biến nhân tâm trong quản trị",
      "Thuận theo thiên thời để tạo đột phá bền vững",
    ],
    highlightsEn: [
      "Personal Natal Chart & Leadership Style",
      "Human Understanding in Management",
      "Harmonizing Strategic Timing for Growth",
    ],
  },
  systems: {
    tagVi: "Hệ sinh thái công cụ số",
    tagEn: "Systems Hub & Tooling",
    shortcut: "9",
    descriptionVi: "Kho giải pháp phần mềm, công cụ quản lý nội bộ và các nền tảng số hóa do tác giả nghiên cứu, ứng dụng vào doanh nghiệp.",
    descriptionEn: "Curated ecosystem of software tools, internal systems, and digital platforms researched and deployed to power enterprise operations.",
    highlightsVi: [
      "Hệ thống giám sát KPI & Hiệu suất tức thời",
      "Nền tảng tri thức & Đào tạo nội bộ chuẩn hóa",
      "Giải pháp số hóa tương tác khách hàng thông minh",
    ],
    highlightsEn: [
      "Real-time KPI & SLA Monitoring Tools",
      "Standardized Internal Knowledge Base",
      "Intelligent Customer Interaction Systems",
    ],
  },
  contact: {
    tagVi: "Cổng kết nối hợp tác",
    tagEn: "Collaboration & Contact",
    shortcut: "0",
    descriptionVi: "Kênh liên lạc trực tiếp, gửi lời nhắn, đặt lịch hẹn trao đổi công việc và mở rộng mạng lưới đối tác chiến lược trong ngành.",
    descriptionEn: "Direct channels to connect, send messages, schedule executive discussions, and expand strategic partnerships in the industry.",
    highlightsVi: [
      "Thông tin liên lạc bảo mật & Nhanh chóng",
      "Biểu mẫu gửi tin nhắn trao đổi cơ hội hợp tác",
      "Kết nối qua mạng xã hội chuyên nghiệp LinkedIn",
    ],
    highlightsEn: [
      "Fast & Secure Direct Contacts",
      "Instant Collaboration Inquiry Form",
      "Professional Social & LinkedIn Networking",
    ],
  },
  wallpapers: {
    tagVi: "Không gian thị giác số",
    tagEn: "Visual Space & Media",
    shortcut: "W",
    descriptionVi: "Thư viện thị giác chọn lọc với hình nền độ phân giải cao và video nghệ thuật, mang đến không gian làm việc số đầy cảm hứng.",
    descriptionEn: "Curated visual gallery featuring high-resolution wallpapers and cinematic ambient videos, elevating the digital workspace.",
    highlightsVi: [
      "Bộ sưu tập hình nền 4K tinh tế",
      "Video ambient chuyển động mượt mà",
      "Tùy biến phong cách thị giác theo cảm xúc",
    ],
    highlightsEn: [
      "Curated 4K High-Res Wallpapers",
      "Smooth Ambient Motion Videos",
      "Customizable Visual Workspace Experience",
    ],
  },
};

/**
 * Floating, hover-effect-enabled card container positioned at top-left.
 * On hover: 3D tilt, border glow pulse, scale(1.01).
 * On click: Transforms/expands into a centered, full-screen-modal-like view showing rich details of that specific card.
 */
export const FloatingSectionTitleLabel: React.FC<FloatingSectionTitleLabelProps> = ({
  sectionId,
  sectionTitle,
  sectionIndex,
  totalSections,
  Icon,
  theme = "glass-dark-neon",
  lang = "vi",
  className,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const themeConfig = getThemeGradientConfig(theme);

  // Trigger auto-fade on section transition
  useEffect(() => {
    setIsVisible(true);

    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    hideTimerRef.current = setTimeout(() => {
      if (!isHovered && !isExpanded) {
        setIsVisible(false);
      }
    }, 3200); // Visible for 3.2s before fading

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [sectionId, isHovered, isExpanded]);

  // Delayed content loading transition with skeleton shimmer for 300ms on modal expansion
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isExpanded) {
      setIsLoading(true);
      timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
    } else {
      setIsLoading(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isExpanded, sectionId]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false);
      }
    };
    if (isExpanded) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsVisible(true);
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = setTimeout(() => {
      if (!isExpanded) {
        setIsVisible(false);
      }
    }, 1800);
  };

  const handleCardClick = () => {
    setIsExpanded(true);
    setIsLoading(true);
  };

  // Human-readable 2-digit index (e.g. 01 / 11)
  const formattedIndex = String(sectionIndex + 1).padStart(2, "0");
  const formattedTotal = String(totalSections).padStart(2, "0");

  const headerItem = PAGE_HEADER_DATA[sectionId];
  const extraDetails = SECTION_EXTRA_DETAILS[sectionId] || {
    tagVi: "Chuyên mục",
    tagEn: "Section",
    shortcut: String(sectionIndex + 1),
    descriptionVi: "Thông tin chi tiết và nội dung trọng tâm của chuyên mục này trong ứng dụng.",
    descriptionEn: "Detailed information and key focus areas of this section within the application.",
    highlightsVi: ["Nội dung chuyên môn", "Giao diện tối ưu", "Tương tác trực quan"],
    highlightsEn: ["Domain Expertise", "Optimized Interface", "Intuitive Interaction"],
  };

  const quote = lang === "vi" ? headerItem?.quoteVi : headerItem?.quoteEn;
  const tag = lang === "vi" ? extraDetails.tagVi : extraDetails.tagEn;
  const description = lang === "vi" ? extraDetails.descriptionVi : extraDetails.descriptionEn;
  const highlights = lang === "vi" ? extraDetails.highlightsVi : extraDetails.highlightsEn;

  const isCollapsed = !isVisible && !isHovered && !isExpanded;

  return (
    <>
      <div
        className={cn(
          "absolute top-3 left-3 sm:top-4 sm:left-4 z-30 pointer-events-none select-none",
          className
        )}
        aria-live="polite"
        aria-label={`Mục hiện tại: ${sectionTitle}`}
      >
        <motion.div
          layout
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleCardClick}
          whileHover={{
            transform: "perspective(1000px) rotateX(1deg) rotateY(1deg) scale(1.01)",
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
          }}
          title={
            lang === "vi"
              ? "Nhấp để mở rộng chi tiết toàn màn hình về mục này"
              : "Click to expand full details in a centered view"
          }
          className={cn(
            "pointer-events-auto flex items-center gap-2 sm:gap-2.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl",
            "border backdrop-blur-xl transition-all duration-300 shadow-lg cursor-pointer group select-none",
            theme === "glass-dark-neon"
              ? "bg-[#060b18]/85 border-cyan-500/30 text-white shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_16px_rgba(0,245,255,0.15)] hover:border-cyan-400/50"
              : "bg-white/85 dark:bg-slate-900/85 border-slate-200/80 dark:border-slate-800/80 text-slate-800 dark:text-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.08)] hover:border-slate-300 dark:hover:border-slate-700"
          )}
        >
          {/* Ambient theme glow indicator */}
          <div
            className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
            style={{
              backgroundColor: themeConfig.sparkColor,
              boxShadow: `0 0 8px 1px ${themeConfig.glowColor}`,
            }}
          />

          {/* Section Index metadata */}
          <span className="text-[10px] sm:text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 tracking-wider">
            {formattedIndex}
            <span className="opacity-40 mx-0.5">/</span>
            {formattedTotal}
          </span>

          {/* Section Icon if provided */}
          {Icon && (
            <span
              className={cn(
                "p-0.5 rounded-md flex items-center justify-center transition-colors",
                themeConfig.accentText
              )}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
            </span>
          )}

          {/* Dynamic Section Title (Collapsible after 3.2s, blooms on hover) */}
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 overflow-hidden whitespace-nowrap"
              >
                {/* Separator line */}
                <span className="w-px h-3 bg-slate-300 dark:bg-slate-700/80 shrink-0" />

                {/* Section Title */}
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-slate-900 dark:text-white truncate max-w-[150px] sm:max-w-[210px]">
                  {sectionTitle}
                </span>

                {/* Expand Hint Icon on Hover */}
                <span className="opacity-50 group-hover:opacity-100 text-slate-400 hover:text-cyan-400 transition-all transform group-hover:scale-110 shrink-0">
                  <Maximize2 className="w-3 h-3 stroke-[2.2]" />
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subtle bottom theme-gradient accent line */}
          <div
            className="absolute bottom-0 left-3 right-3 h-[1.5px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ background: themeConfig.gradient }}
          />
        </motion.div>
      </div>

      {/* Expanded Full-Screen Modal-like Centered View */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isExpanded && (
              <div
                className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-8 no-tilt-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="expanded-card-title"
              >
                {/* Backdrop with blur & click-to-dismiss */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setIsExpanded(false)}
                  className="absolute inset-0 bg-black/75 backdrop-blur-md"
                />

                {/* Centered Expanded Card View */}
                <motion.div
                  layoutId="expandable-section-card-container"
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 14 }}
                  transition={{ type: "spring", damping: 25, stiffness: 320 }}
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    "relative w-full max-w-xl sm:max-w-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden no-tilt-card border z-10",
                    theme === "glass-dark-neon"
                      ? "bg-[#070d1d]/95 border-cyan-500/40 text-white shadow-[0_24px_64px_rgba(0,0,0,0.85),0_0_32px_rgba(6,182,212,0.2)]"
                      : "bg-white/95 dark:bg-slate-900/95 border-slate-200/90 dark:border-slate-800/90 text-slate-900 dark:text-slate-100 shadow-[0_24px_64px_rgba(0,0,0,0.3)]"
                  )}
                >
                  {/* Subtle Background Glow Spheres */}
                  <div
                    className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl opacity-30 pointer-events-none"
                    style={{ backgroundColor: themeConfig.sparkColor }}
                  />
                  <div
                    className="absolute -bottom-24 -left-24 w-56 h-56 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: themeConfig.glowColor }}
                  />

                  {/* Top Bar: Badges + Close Button */}
                  <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-200/60 dark:border-slate-800/60">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
                        <span
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: themeConfig.sparkColor }}
                        />
                        {lang === "vi" ? "MỤC" : "SECTION"} {formattedIndex} / {formattedTotal}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50">
                        {tag}
                      </span>
                      {extraDetails.shortcut && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 dark:text-slate-500 px-2 py-0.5 rounded bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-slate-700/40">
                          <Command className="w-2.5 h-2.5" /> {extraDetails.shortcut}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setIsExpanded(false)}
                      className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100/70 dark:bg-slate-800/60 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-all group"
                      aria-label="Đóng chi tiết thẻ"
                    >
                      <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                    </button>
                  </div>

                  {/* Content Container: Skeleton Loading Transition (300ms) vs Real Details */}
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        key="skeleton-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="flex-1 flex flex-col justify-between relative overflow-hidden"
                      >
                        {/* Shimmer sweep effect overlay across the entire skeleton card */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 dark:via-cyan-400/15 to-transparent -skew-x-12 animate-shimmer-fast" />
                        </div>

                        {/* Skeleton Header: Glowing Icon + Title Lines */}
                        <div className="flex items-start gap-4 sm:gap-5 mb-5">
                          <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-slate-200/80 dark:bg-slate-800/90 border border-slate-300/60 dark:border-slate-700/60 shrink-0 relative overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 dark:via-cyan-400/20 to-transparent -skew-x-12 animate-shimmer-fast" />
                          </div>
                          <div className="flex-1 space-y-2.5 pt-1">
                            <div className="h-3 w-28 rounded-full bg-slate-200 dark:bg-slate-800/80 animate-pulse" />
                            <div className="h-6 w-3/4 max-w-[260px] rounded-lg bg-slate-200 dark:bg-slate-800/80 animate-pulse" />
                            <div className="h-3.5 w-1/2 max-w-[180px] rounded-md bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
                          </div>
                        </div>

                        {/* Skeleton Quote Box */}
                        <div className="relative mb-5 p-4 rounded-xl sm:rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 flex items-start gap-3 overflow-hidden">
                          <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700/70 shrink-0 animate-pulse" />
                          <div className="flex-1 space-y-2">
                            <div className="h-3.5 w-full rounded bg-slate-200 dark:bg-slate-700/60 animate-pulse" />
                            <div className="h-3.5 w-4/5 rounded bg-slate-200 dark:bg-slate-700/60 animate-pulse" />
                          </div>
                        </div>

                        {/* Skeleton Overview */}
                        <div className="mb-5 space-y-2.5">
                          <div className="h-3 w-36 rounded-full bg-slate-200 dark:bg-slate-800/80 animate-pulse" />
                          <div className="h-3.5 w-full rounded bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
                          <div className="h-3.5 w-5/6 rounded bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
                        </div>

                        {/* Skeleton Highlights: 3 Cards */}
                        <div className="mb-6">
                          <div className="h-3 w-28 rounded-full bg-slate-200 dark:bg-slate-800/80 mb-2.5 animate-pulse" />
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            {[1, 2, 3].map((idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
                              >
                                <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0 animate-pulse mt-0.5" />
                                <div className="flex-1 space-y-1.5">
                                  <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-700/70 animate-pulse" />
                                  <div className="h-2.5 w-2/3 rounded bg-slate-200 dark:bg-slate-700/60 animate-pulse" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Skeleton Footer Actions */}
                        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex-wrap">
                          <div className="h-3 w-40 rounded bg-slate-100 dark:bg-slate-800/60 hidden sm:block animate-pulse" />
                          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                            <div className="h-9 w-20 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
                            <div className="h-9 w-36 rounded-xl bg-cyan-500/20 border border-cyan-500/30 animate-pulse" />
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="detailed-content-view"
                        initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 flex flex-col justify-between"
                      >
                        {/* Header Title with Glowing Icon */}
                        <div className="flex items-start gap-4 sm:gap-5 mb-5">
                          {Icon && (
                            <div
                              className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border border-white/20 dark:border-cyan-500/30"
                              style={{
                                background: themeConfig.gradient,
                              }}
                            >
                              <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white stroke-[2.2]" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                                {lang === "vi" ? "Chi tiết chuyên mục" : "Section Insights"}
                              </span>
                              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
                            </div>
                            <h2
                              id="expanded-card-title"
                              className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-0.5"
                            >
                              {sectionTitle}
                            </h2>
                            {headerItem && (
                              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                {lang === "vi" ? headerItem.titleEn : headerItem.titleVi}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Inspiring Section Quote Box */}
                        {quote && (
                          <div className="relative mb-5 p-4 rounded-xl sm:rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 flex items-start gap-3">
                            <Quote className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5 opacity-80" />
                            <p className="text-xs sm:text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed">
                              "{quote}"
                            </p>
                          </div>
                        )}

                        {/* Section Overview / Role in Portfolio */}
                        <div className="mb-5">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                            {lang === "vi" ? "Tổng quan mục tiêu & Nội dung" : "Overview & Strategic Purpose"}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {description}
                          </p>
                        </div>

                        {/* Key Highlights / Pillars */}
                        <div className="mb-6">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                            {lang === "vi" ? "Điểm nhấn & Trọng tâm" : "Core Highlights"}
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            {highlights.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 hover:border-cyan-500/40 transition-colors"
                              >
                                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                                <span className="text-xs text-slate-700 dark:text-slate-200 font-medium leading-snug">
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex-wrap">
                          <span className="text-[11px] text-slate-400 dark:text-slate-500 hidden sm:inline-block">
                            {lang === "vi" ? "Nhấn [ESC] hoặc nhấp ra ngoài để đóng" : "Press [ESC] or click outside to dismiss"}
                          </span>

                          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                            <button
                              onClick={() => setIsExpanded(false)}
                              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            >
                              {lang === "vi" ? "Đóng" : "Close"}
                            </button>

                            <button
                              onClick={() => setIsExpanded(false)}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white shadow-lg transition-transform active:scale-95"
                              style={{
                                background: themeConfig.gradient,
                              }}
                            >
                              <span>{lang === "vi" ? "Tiếp tục khám phá" : "Continue Exploring"}</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default FloatingSectionTitleLabel;
