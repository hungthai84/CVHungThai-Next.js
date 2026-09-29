import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Target, 
  Award, 
  Compass, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  Heart,
  Calendar,
  Building2,
  Clock,
  Play,
  Pause
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";

export interface PeekSlideItem {
  id: string;
  tagVi: string;
  tagEn: string;
  tagColor: string;
  titleVi: string;
  titleEn: string;
  subtitleVi: string;
  subtitleEn: string;
  descVi: string;
  descEn: string;
  badgeVi: string;
  badgeEn: string;
  metric: string;
  metricLabelVi: string;
  metricLabelEn: string;
  iconName: "Calendar" | "Target" | "Zap" | "Heart" | "Compass";
  gradient: string;
  accentColor: string;
  borderGlow: string;
  highlightsVi: string[];
  highlightsEn: string[];
}

export const ABOUT_PEEK_SLIDES: PeekSlideItem[] = [
  {
    id: "experience-mastery",
    tagVi: "Hành Trình 22+ Năm",
    tagEn: "22+ Years Journey",
    tagColor: "from-blue-600 to-cyan-500",
    titleVi: "Dấu Ấn Vận Hành & Lãnh Đạo CX",
    titleEn: "CX Leadership & Operational Mastery",
    subtitleVi: "Hơn hai thập kỷ gắn bó cùng chuyển đổi số và nâng tầm chất lượng dịch vụ khách hàng",
    subtitleEn: "Over two decades championing digital transformation and elevating customer experience excellence",
    descVi: "Xây dựng và tối ưu hoá hệ thống chăm sóc khách hàng đa kênh tại hơn 8 môi trường doanh nghiệp quy mô lớn, kiến tạo chuẩn mực trải nghiệm khách hàng vượt trội.",
    descEn: "Architected and optimized omnichannel customer care ecosystems across 8+ major enterprise environments, establishing superior benchmarks.",
    badgeVi: "Thực Chiến Đỉnh Cao",
    badgeEn: "Proven Track Record",
    metric: "22+",
    metricLabelVi: "Năm kinh nghiệm thực chiến",
    metricLabelEn: "Years hands-on leadership",
    iconName: "Calendar",
    gradient: "from-blue-600/20 via-indigo-600/10 to-transparent",
    accentColor: "text-blue-600 dark:text-cyan-400",
    borderGlow: "group-hover:border-blue-500/50",
    highlightsVi: [
      "Quản trị & chuẩn hoá quy trình CS đa kênh Omnichannel",
      "Điều phối đội ngũ quy mô lớn vận hành 24/7 ổn định",
      "Chuyển đổi số số hoá luồng tiếp nhận & giải quyết yêu cầu"
    ],
    highlightsEn: [
      "Omnichannel CS process standardization & governance",
      "Large-scale 24/7 high-reliability team management",
      "Digital transformation of customer inquiry workflows"
    ]
  },
  {
    id: "operational-pillars",
    tagVi: "3 Trụ Cột Vận Hành",
    tagEn: "3 Strategic Pillars",
    tagColor: "from-purple-600 to-pink-500",
    titleVi: "Hiệu Quả · Nhân Văn · Bền Vững",
    titleEn: "Efficiency · Humanity · Sustainability",
    subtitleVi: "Mô hình kiềng 3 chân bảo đảm tăng trưởng vững chắc và gắn kết lâu dài",
    subtitleEn: "A tripartite operational framework guaranteeing solid growth and long-lasting customer bonding",
    descVi: "Kết hợp giữa tư duy tối ưu chi phí hiệu quả, sự thấu cảm tôn trọng con người và chiến lược phát triển bền vững tạo ra giá trị thực chất cho mọi bên tham gia.",
    descEn: "Synthesizing cost efficiency, human-centric empathy, and sustainable development strategy to generate real tangible value for all stakeholders.",
    badgeVi: "Giá Trị Cốt Lõi",
    badgeEn: "Core Strategy",
    metric: "3",
    metricLabelVi: "Trụ cột chiến lược",
    metricLabelEn: "Strategic pillars",
    iconName: "Target",
    gradient: "from-purple-600/20 via-pink-600/10 to-transparent",
    accentColor: "text-purple-600 dark:text-pink-400",
    borderGlow: "group-hover:border-purple-500/50",
    highlightsVi: [
      "Tối ưu hoá chỉ số SLA & FCR (First Contact Resolution)",
      "Lấy trải nghiệm con người và sự thấu cảm làm trọng tâm",
      "Xây dựng văn hoá dịch vụ gắn kết và niềm tin thương hiệu"
    ],
    highlightsEn: [
      "Optimization of SLA and First Contact Resolution (FCR)",
      "Centering human empathy and customer emotion",
      "Cultivating service culture and lasting brand trust"
    ]
  },
  {
    id: "digital-crm-ai",
    tagVi: "Công Nghệ & Tự Động Hoá",
    tagEn: "Technology & AI CRM",
    tagColor: "from-cyan-500 to-emerald-500",
    titleVi: "Hệ Thống 24/7 AI CRM Tự Động Hoá",
    titleEn: "24/7 AI-Powered CRM & Automation",
    subtitleVi: "Ứng dụng công nghệ thông minh rút ngắn 80% thời gian phản hồi",
    subtitleEn: "Leveraging smart AI technologies to reduce 80% inquiry response and turnaround time",
    descVi: "Số hoá luồng dữ liệu khách hàng, tích hợp trợ lý AI thông minh hỗ trợ 24/7, phân loại tự động và báo cáo phân tích dữ liệu chuyên sâu theo thời gian thực.",
    descEn: "Digitizing customer data streams, deploying 24/7 smart conversational AI assistants, automated ticketing classification, and real-time operational analytics.",
    badgeVi: "Đột Phá Công Nghệ",
    badgeEn: "Tech Breakthrough",
    metric: "24/7",
    metricLabelVi: "Vận hành tự động liên tục",
    metricLabelEn: "Continuous AI automation",
    iconName: "Zap",
    gradient: "from-cyan-600/20 via-emerald-600/10 to-transparent",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    borderGlow: "group-hover:border-emerald-500/50",
    highlightsVi: [
      "Tích hợp luồng phân luồng tự động đa kênh thông minh",
      "Phân tích dữ liệu & dự báo xu hướng nhu cầu khách hàng",
      "Giảm thiểu sai sót quy trình vận hành và tiết kiệm chi phí"
    ],
    highlightsEn: [
      "Smart multichannel automatic ticket routing",
      "Deep analytics and customer demand trend forecasting",
      "Minimizing human error and operational overhead"
    ]
  },
  {
    id: "csat-satisfaction",
    tagVi: "Chất Lượng Phụng Sự",
    tagEn: "Service Excellence",
    tagColor: "from-rose-500 to-amber-500",
    titleVi: "99% Mức Độ Hài Lòng Khách Hàng (CSAT)",
    titleEn: "99% Customer Satisfaction (CSAT)",
    subtitleVi: "Thước đo cao nhất cho sự tận tâm, đồng hành và thấu cảm sâu sắc",
    subtitleEn: "The ultimate metric reflecting dedication, companionship, and authentic empathy",
    descVi: "Mỗi cuộc trò chuyện, mỗi điểm chạm dịch vụ là một cam kết về sự lắng nghe chân thành, giải quyết thấu đáo và đem lại sự an tâm tuyệt đối.",
    descEn: "Every interaction and touchpoint embodies our sincere commitment to listening, resolving thoroughly, and providing total peace of mind.",
    badgeVi: "Chuẩn Mực Xuất Sắc",
    badgeEn: "Excellence Standard",
    metric: "99%",
    metricLabelVi: "Chỉ số hài lòng khách hàng",
    metricLabelEn: "Customer CSAT rating",
    iconName: "Heart",
    gradient: "from-rose-600/20 via-amber-600/10 to-transparent",
    accentColor: "text-rose-600 dark:text-rose-400",
    borderGlow: "group-hover:border-rose-500/50",
    highlightsVi: [
      "Thang điểm đánh giá dịch vụ đạt mức tín nhiệm tuyệt đối",
      "Cá nhân hoá trải nghiệm cho từng phân khúc khách hàng",
      "Xử lý nhanh chóng các khiếu nại phức tạp với sự chuyên nghiệp"
    ],
    highlightsEn: [
      "Service rating reaching outstanding reliability benchmarks",
      "Hyper-personalized experiences tailored per segment",
      "Swift resolution of complex cases with utmost professionalism"
    ]
  },
  {
    id: "vision-partnership",
    tagVi: "Tầm Nhìn & Hợp Tác",
    tagEn: "Vision & Partnership",
    tagColor: "from-indigo-600 to-blue-500",
    titleVi: "Kiến Tạo Giá Trị Mới Cùng Doanh Nghiệp",
    titleEn: "Co-Creating Lasting Value with Enterprises",
    subtitleVi: "Đồng hành tư vấn, thiết kế và tối ưu trải nghiệm dịch vụ thế hệ mới",
    subtitleEn: "Partnering to consult, architect, and optimize next-generation customer experience",
    descVi: "Sẵn sàng đồng hành cùng các tổ chức và doanh nghiệp để chuyển đổi dịch vụ khách hàng từ chi phí sang đòn bẩy tăng trưởng doanh thu và lòng trung thành.",
    descEn: "Ready to partner with forward-looking organizations to transform customer care from an expense center into a strategic engine of growth and loyalty.",
    badgeVi: "Đồng Hành Phát Triển",
    badgeEn: "Future Readiness",
    metric: "8+",
    metricLabelVi: "Môi trường doanh nghiệp quy mô",
    metricLabelEn: "Large enterprise environments",
    iconName: "Compass",
    gradient: "from-indigo-600/20 via-blue-600/10 to-transparent",
    accentColor: "text-indigo-600 dark:text-cyan-300",
    borderGlow: "group-hover:border-indigo-500/50",
    highlightsVi: [
      "Tư vấn giải pháp kiến trúc trải nghiệm khách hàng tổng thể",
      "Đào tạo và chuyển giao năng lực cho đội ngũ vận hành",
      "Đồng hành lâu dài bảo đảm hiệu quả đo lường được"
    ],
    highlightsEn: [
      "Holistic CX architecture and organizational consulting",
      "Operational upskilling and capability transfer",
      "Long-term partnership with measurable business outcomes"
    ]
  }
];

export function AboutPeekCarousel() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<number>(0);
  const touchStartXRef = useRef<number | null>(null);

  const totalSlides = ABOUT_PEEK_SLIDES.length;

  const handlePrev = useCallback(() => {
    playUiSound("click");
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    playUiSound("click");
    setDirection(1);
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const handleSelectSlide = (index: number) => {
    if (index === currentIndex) return;
    playUiSound("click");
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-slide effect
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, totalSlides]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diffX > 40) {
      handleNext();
    } else if (diffX < -40) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  const getSlideIcon = (iconName: string) => {
    switch (iconName) {
      case "Calendar": return Calendar;
      case "Target": return Target;
      case "Zap": return Zap;
      case "Heart": return Heart;
      case "Compass": return Compass;
      default: return Sparkles;
    }
  };

  // Glass card styling matching app themes
  const getCardStyle = () => {
    switch (theme as string) {
      case "glass-dark-neon":
        return "bg-[#101322]/90 dark:bg-[#101322]/90 border-cyan-400/25 dark:border-white/15 backdrop-blur-[20px] shadow-[0_0_25px_rgba(0,240,255,0.12)]";
      case "modern-light-glass":
        return "bg-white/80 dark:bg-slate-900/80 border-white/90 dark:border-white/15 backdrop-blur-[22px] shadow-[0_12px_35px_rgba(100,110,140,0.10)]";
      case "mritech-digital-growth":
      default:
        return "bg-white/85 dark:bg-[#121628]/85 border-white/75 dark:border-white/12 backdrop-blur-[20px] shadow-[0_10px_35px_rgba(31,38,135,0.08)]";
    }
  };

  // Compute indices for previous, current, next, and peek neighbors
  const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  const nextIndex = (currentIndex + 1) % totalSlides;

  return (
    <div 
      className="w-full flex flex-col gap-3 relative py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Section Subheader & Controls */}
      <div className="flex items-center justify-between px-1 flex-wrap gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <motion.div
            animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 0.95, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="shrink-0"
          >
            <Layers className="w-5 h-5 text-blue-600 dark:text-cyan-400 stroke-[2.2] drop-shadow-sm" />
          </motion.div>
          <div className="flex flex-col min-w-0">
            <motion.h4 
              animate={{ opacity: [0.92, 1, 0.92] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="text-sm sm:text-base font-black font-play tracking-tight truncate"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 dark:from-cyan-300 dark:via-blue-300 dark:to-indigo-300">
                {isVi ? "Điểm Nhấn Nổi Bật & Năng Lực Cốt Lõi" : "Core Capabilities & Leadership Highlights"}
              </span>
            </motion.h4>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
              {isVi ? "Trình chiếu xem trước đa chiều liền kề (Adjacent Slide Peek Effect)" : "Interactive adjacent preview slider"}
            </span>
          </div>
        </div>

        {/* Carousel controls: Auto-play toggle, Counter, Prev & Next Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              playUiSound("click");
              setIsAutoPlaying(!isAutoPlaying);
            }}
            className="w-8 h-8 rounded-full bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-white/10 hover:bg-white dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-all text-xs cursor-pointer shadow-2xs"
            title={isAutoPlaying ? (isVi ? "Tạm dừng tự động chạy" : "Pause auto-slide") : (isVi ? "Bật tự động chạy" : "Play auto-slide")}
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>

          <div className="px-2.5 py-1 rounded-full bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-white/10 text-[11px] font-bold font-mono text-slate-700 dark:text-slate-200 shadow-2xs">
            <span className="text-blue-600 dark:text-cyan-400">{currentIndex + 1}</span>
            <span className="text-slate-400 mx-1">/</span>
            <span>{totalSlides}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-white/10 hover:bg-white dark:hover:bg-slate-700 hover:border-blue-400/50 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-all active:scale-95 cursor-pointer shadow-2xs"
              title={isVi ? "Slide trước" : "Previous slide"}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-white/10 hover:bg-white dark:hover:bg-slate-700 hover:border-blue-400/50 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-all active:scale-95 cursor-pointer shadow-2xs"
              title={isVi ? "Slide kế tiếp" : "Next slide"}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ADJACENT SLIDE PREVIEW / PEEK STAGE                                       */}
      {/* ========================================================================= */}
      <div 
        className="relative w-full overflow-hidden py-3 px-1 select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full flex items-center justify-center min-h-[360px] sm:min-h-[380px] md:min-h-[390px]">
          
          {/* LEFT PEEK SLIDE (Adjacent Previous Slide) */}
          <div 
            onClick={() => handleSelectSlide(prevIndex)}
            className="absolute left-0 sm:left-2 md:left-4 z-10 w-[78%] sm:w-[55%] md:w-[42%] lg:w-[35%] -translate-x-[45%] sm:-translate-x-[40%] md:-translate-x-[35%] transition-all duration-500 ease-out cursor-pointer group"
          >
            <div 
              style={{ borderRadius: "var(--theme-radius-card, 20px)" }}
              className={cn(
                "p-4 sm:p-5 border transition-all duration-500 transform scale-[0.88] sm:scale-[0.90] opacity-45 hover:opacity-75 blur-[0.8px] hover:blur-0 rounded-2xl shadow-md",
                getCardStyle()
              )}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/50 dark:border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200/60 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">
                  {isVi ? ABOUT_PEEK_SLIDES[prevIndex].tagVi : ABOUT_PEEK_SLIDES[prevIndex].tagEn}
                </span>
                <span className="text-xs font-black font-play text-slate-500">
                  {ABOUT_PEEK_SLIDES[prevIndex].metric}
                </span>
              </div>
              <h5 className="text-xs sm:text-sm font-bold font-play mt-2 text-slate-700 dark:text-slate-300 line-clamp-2">
                {isVi ? ABOUT_PEEK_SLIDES[prevIndex].titleVi : ABOUT_PEEK_SLIDES[prevIndex].titleEn}
              </h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {isVi ? ABOUT_PEEK_SLIDES[prevIndex].subtitleVi : ABOUT_PEEK_SLIDES[prevIndex].subtitleEn}
              </p>
            </div>
          </div>

          {/* CENTER ACTIVE SLIDE */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, scale: 0.94, x: direction * 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.94, x: direction * -40 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{ borderRadius: "var(--theme-radius-card, 24px)" }}
              className={cn(
                "relative z-20 w-[92%] sm:w-[82%] md:w-[76%] lg:w-[68%] p-5 sm:p-6 md:p-7 border rounded-3xl transition-all duration-300 shadow-xl overflow-hidden group",
                getCardStyle(),
                ABOUT_PEEK_SLIDES[currentIndex].borderGlow
              )}
            >
              {/* Background ambient gradient */}
              <div 
                className={cn(
                  "absolute -right-20 -bottom-20 w-80 h-80 rounded-full filter blur-[80px] pointer-events-none opacity-40 transition-all duration-700",
                  `bg-gradient-to-br ${ABOUT_PEEK_SLIDES[currentIndex].gradient}`
                )} 
              />

              {/* Top Row: Tag badge + Icon + Metric Pill */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10 relative z-10 flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <span className={cn(
                    "text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white bg-gradient-to-r shadow-xs",
                    ABOUT_PEEK_SLIDES[currentIndex].tagColor
                  )}>
                    {isVi ? ABOUT_PEEK_SLIDES[currentIndex].tagVi : ABOUT_PEEK_SLIDES[currentIndex].tagEn}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-200/60 dark:border-white/10 hidden sm:inline-block">
                    {isVi ? ABOUT_PEEK_SLIDES[currentIndex].badgeVi : ABOUT_PEEK_SLIDES[currentIndex].badgeEn}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-end">
                    <span className="text-base sm:text-lg md:text-xl font-black font-play leading-none text-slate-900 dark:text-white">
                      {ABOUT_PEEK_SLIDES[currentIndex].metric}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                      {isVi ? ABOUT_PEEK_SLIDES[currentIndex].metricLabelVi : ABOUT_PEEK_SLIDES[currentIndex].metricLabelEn}
                    </span>
                  </div>
                  {(() => {
                    const CurrentIcon = getSlideIcon(ABOUT_PEEK_SLIDES[currentIndex].iconName);
                    return (
                      <div className={cn(
                        "w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center border shadow-xs transition-transform group-hover:scale-110",
                        "bg-white/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-white/15",
                        ABOUT_PEEK_SLIDES[currentIndex].accentColor
                      )}>
                        <CurrentIcon className="w-5 h-5" />
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="mt-4 space-y-1.5 relative z-10 text-left">
                <h4 className="text-base sm:text-lg md:text-xl font-black font-play text-slate-900 dark:text-white tracking-tight leading-snug">
                  {isVi ? ABOUT_PEEK_SLIDES[currentIndex].titleVi : ABOUT_PEEK_SLIDES[currentIndex].titleEn}
                </h4>
                <p className="text-xs sm:text-[13px] font-semibold text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isVi ? ABOUT_PEEK_SLIDES[currentIndex].subtitleVi : ABOUT_PEEK_SLIDES[currentIndex].subtitleEn}
                </p>
              </div>

              {/* Detailed Description */}
              <p className="mt-3 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300/90 leading-relaxed font-normal text-left relative z-10">
                {isVi ? ABOUT_PEEK_SLIDES[currentIndex].descVi : ABOUT_PEEK_SLIDES[currentIndex].descEn}
              </p>

              {/* Key Bullet Highlights */}
              <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-white/10 flex flex-col gap-2 relative z-10 text-left">
                {(isVi ? ABOUT_PEEK_SLIDES[currentIndex].highlightsVi : ABOUT_PEEK_SLIDES[currentIndex].highlightsEn).map((hl, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    <span className="truncate">{hl}</span>
                  </div>
                ))}
              </div>

            </motion.div>
          </AnimatePresence>

          {/* RIGHT PEEK SLIDE (Adjacent Next Slide) */}
          <div 
            onClick={() => handleSelectSlide(nextIndex)}
            className="absolute right-0 sm:right-2 md:right-4 z-10 w-[78%] sm:w-[55%] md:w-[42%] lg:w-[35%] translate-x-[45%] sm:translate-x-[40%] md:translate-x-[35%] transition-all duration-500 ease-out cursor-pointer group"
          >
            <div 
              style={{ borderRadius: "var(--theme-radius-card, 20px)" }}
              className={cn(
                "p-4 sm:p-5 border transition-all duration-500 transform scale-[0.88] sm:scale-[0.90] opacity-45 hover:opacity-75 blur-[0.8px] hover:blur-0 rounded-2xl shadow-md",
                getCardStyle()
              )}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/50 dark:border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200/60 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">
                  {isVi ? ABOUT_PEEK_SLIDES[nextIndex].tagVi : ABOUT_PEEK_SLIDES[nextIndex].tagEn}
                </span>
                <span className="text-xs font-black font-play text-slate-500">
                  {ABOUT_PEEK_SLIDES[nextIndex].metric}
                </span>
              </div>
              <h5 className="text-xs sm:text-sm font-bold font-play mt-2 text-slate-700 dark:text-slate-300 line-clamp-2">
                {isVi ? ABOUT_PEEK_SLIDES[nextIndex].titleVi : ABOUT_PEEK_SLIDES[nextIndex].titleEn}
              </h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {isVi ? ABOUT_PEEK_SLIDES[nextIndex].subtitleVi : ABOUT_PEEK_SLIDES[nextIndex].subtitleEn}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Slide Pagination Indicator Dots & Titles Bar */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-1 flex-wrap px-2">
        {ABOUT_PEEK_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => handleSelectSlide(index)}
              className={cn(
                "group relative flex items-center gap-1.5 py-1 px-2 rounded-full transition-all duration-300 cursor-pointer",
                isActive 
                  ? "bg-blue-600 text-white shadow-sm scale-105" 
                  : "bg-slate-200/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700"
              )}
            >
              <div 
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  isActive ? "bg-white scale-110" : "bg-slate-400 dark:bg-slate-500"
                )}
              />
              <span className="text-[10px] font-bold font-play hidden md:inline-block whitespace-nowrap">
                {isVi ? slide.tagVi : slide.tagEn}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
