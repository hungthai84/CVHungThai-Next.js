import React, { useState, useRef } from "react";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { PageCardHeader } from "./PageCardHeader";
import { IndustrialSubSection, industrialContainerVariants, industrialSubSectionVariants } from "./IndustrialStaggerContainer";
import { MagneticBentoWrapper } from "./MagneticBentoWrapper";
import {
  Server,
  Monitor,
  Scale,
  HeartPulse,
  UserCheck,
  Network,
  Target,
  Crown,
  BookOpen,
  Headphones,
  PieChart,
  Bot,
  Store,
  LogIn,
  Calculator,
  Eye,
  Settings,
  Layers,
  Gem,
  GraduationCap,
  TrendingUp,
  Sparkles,
  CreditCard,
  CheckCircle2,
  Play,
  X
} from "lucide-react";

interface SystemItem {
  id: string;
  category: "cskh" | "management" | "data-ai";
  code: string;
  nameVi: string;
  nameEn: string;
  descVi: string;
  descEn: string;
  url: string | null;
  gradientClass: string;
  icon: React.ComponentType<any>;
  watermarkIcon: React.ComponentType<any>;
}

const SYSTEMS_DATA: SystemItem[] = [
  {
    id: "sdp",
    category: "cskh",
    code: "SDP",
    nameVi: "Cổng làm việc CSKH",
    nameEn: "Service Delivery Platform",
    descVi: "Cổng làm việc tập trung chính của Phòng CSKH, cổng truy cập trung tâm cho mọi quy trình nghiệp vụ.",
    descEn: "Service Delivery Platform: Centered portal for all Customer Service operations and integrations.",
    url: "https://www.sdpplatfrom.powerservice.one",
    gradientClass: "from-[#6366f1] via-[#4f46e5] to-[#3730a3]",
    icon: Monitor,
    watermarkIcon: LogIn
  },
  {
    id: "erp",
    category: "management",
    code: "ERP",
    nameVi: "Tài chính kế toán",
    nameEn: "Enterprise Resource Planning",
    descVi: "Quản lý nguồn lực doanh nghiệp, tài chính kế toán, kho và sản xuất tập trung.",
    descEn: "Enterprise Resource Planning: Central business finance, accounting, and resource planning.",
    url: "https://www.erpplatfrom.powerservice.one",
    gradientClass: "from-[#059669] via-[#0d9488] to-[#115e59]",
    icon: Scale,
    watermarkIcon: Calculator
  },
  {
    id: "crm",
    category: "cskh",
    code: "CRM",
    nameVi: "Quản lý Quan hệ Khách hàng",
    nameEn: "Customer Relationship Management",
    descVi: "Quản lý thông tin khách hàng 360 độ, tối ưu hóa tương tác đa kênh và hành trình trải nghiệm.",
    descEn: "Customer Relationship Management: 360-degree customer profiling, workflow and journey optimization.",
    url: "https://www.crmplatfrom.powerservice.one",
    gradientClass: "from-[#e11d48] via-[#be123c] to-[#881337]",
    icon: HeartPulse,
    watermarkIcon: Eye
  },
  {
    id: "hrm",
    category: "management",
    code: "HRM",
    nameVi: "Quản lý Nguồn nhân lực",
    nameEn: "Human Resource Management",
    descVi: "Quản lý vòng đời nhân sự, tuyển dụng, đào tạo phát triển và chấm công tự động.",
    descEn: "Human Resource Management: Seamless tracking of human assets, payroll, and recruitment workflows.",
    url: "https://www.hrmplatfrom.powerservice.one",
    gradientClass: "from-[#d97706] via-[#b45309] to-[#78350f]",
    icon: UserCheck,
    watermarkIcon: Settings
  },
  {
    id: "bpm",
    category: "management",
    code: "BPM",
    nameVi: "Quản lý Quy trình Nghiệp vụ",
    nameEn: "Business Process Management",
    descVi: "Số hóa và tự động hóa quy trình phối hợp liên phòng ban nhằm tăng cao hiệu suất.",
    descEn: "Business Process Management: Digitize operational procedures for frictionless departmental collaboration.",
    url: "https://www.bmpplatform.powerservice.one",
    gradientClass: "from-[#0284c7] via-[#0369a1] to-[#075985]",
    icon: Network,
    watermarkIcon: Layers
  },
  {
    id: "okr",
    category: "management",
    code: "OKR",
    nameVi: "Quản lý Mục tiêu & Kết quả",
    nameEn: "Objectives & Key Results",
    descVi: "Thiết lập mục tiêu chiến lược và theo dõi kết quả then chốt minh bạch.",
    descEn: "Objectives & Key Results: Set strategic targets and transparent progress measurement frameworks.",
    url: "https://www.okrplatfrom.powerservice.one",
    gradientClass: "from-[#7c3aed] via-[#6d28d9] to-[#4c1d95]",
    icon: Target,
    watermarkIcon: Target
  },
  {
    id: "clp",
    category: "cskh",
    code: "CLP",
    nameVi: "Khách hàng Thân thiết (Loyalty)",
    nameEn: "Customer Loyalty Program",
    descVi: "Xây dựng chương trình thành viên, tích lũy điểm thưởng và tối ưu ưu đãi voucher.",
    descEn: "Customer Loyalty Program: Member programs, rewarding actions, and tailored promotional retention.",
    url: "https://www.clpplatform.powerservice.one",
    gradientClass: "from-[#ea580c] via-[#c2410c] to-[#9a3412]",
    icon: Crown,
    watermarkIcon: Gem
  },
  {
    id: "lms",
    category: "management",
    code: "LMS",
    nameVi: "Quản lý Đào tạo (Learning)",
    nameEn: "Learning Management System",
    descVi: "Kho khóa học trực tuyến, tự động hóa kiểm tra đánh giá chất lượng nhân sự.",
    descEn: "Learning Management System: Automated training platform, online exams, and talent upskilling.",
    url: "https://www.lmsplatfrom.powerservice.one",
    gradientClass: "from-[#0d9488] via-[#0f766e] to-[#134e4a]",
    icon: BookOpen,
    watermarkIcon: GraduationCap
  },
  {
    id: "csc",
    category: "cskh",
    code: "CSC",
    nameVi: "Trung tâm Chăm sóc Khách hàng",
    nameEn: "Customer Service Center",
    descVi: "Hệ thống quản trị tương tác đa kênh, phân loại Ticket tự động và giám sát cam kết SLA.",
    descEn: "Customer Service Center: Centralized ticketing engine and customer helpdesk with strict SLA monitoring.",
    url: "https://www.cscplatform.powerservice.one",
    gradientClass: "from-[#2563eb] via-[#1d4ed8] to-[#1e40af]",
    icon: Headphones,
    watermarkIcon: Headphones
  },
  {
    id: "bi",
    category: "data-ai",
    code: "BI Dashboard",
    nameVi: "Báo cáo & Phân tích",
    nameEn: "Business Intelligence",
    descVi: "Trực quan hóa chỉ số dữ liệu theo thời gian thực (Real-time Wallboard) hỗ trợ quản trị.",
    descEn: "Business Intelligence: Real-time visual metrics dashboard to accelerate data-backed decisions.",
    url: null,
    gradientClass: "from-[#334155] via-[#1e293b] to-[#0f172a]",
    icon: PieChart,
    watermarkIcon: TrendingUp
  },
  {
    id: "ai",
    category: "data-ai",
    code: "AI Assistant",
    nameVi: "Trợ lý Trí tuệ Nhân tạo",
    nameEn: "Artificial Intelligence Platform",
    descVi: "Hỗ trợ nhân sự bằng AI thông minh trong tra cứu, tự động hóa phản hồi và xử lý tác vụ 24/7.",
    descEn: "Artificial Intelligence Platform: Automated intelligence, content lookup, and seamless 24/7 assistance.",
    url: "https://www.aiplatfrom.powerservice.one",
    gradientClass: "from-[#9333ea] via-[#7928ca] to-[#4c0519]",
    icon: Bot,
    watermarkIcon: Sparkles
  },
  {
    id: "pos",
    category: "management",
    code: "POS",
    nameVi: "Quản lý Bán hàng tại Quầy",
    nameEn: "Point of Sale",
    descVi: "Quản lý giao dịch, bán lẻ, thanh toán hóa đơn và đồng bộ hóa tồn kho thời gian thực.",
    descEn: "Point of Sale: Smooth billing, payment processes, and real-time inventory synchronization.",
    url: "https://www.posplatform.powerservice.one",
    gradientClass: "from-[#f97316] via-[#ea580c] to-[#c2410c]",
    icon: Store,
    watermarkIcon: CreditCard
  }
];

export function Systems() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  // Lightbox & feedback state
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleCardClick = (url: string | null, name: string) => {
    if (!url) {
      try { playUiSound("alert"); } catch {}
      triggerToast(isVi ? `Hệ thống ${name} đang được hoàn thiện tích hợp kết nối API thời gian thực!` : `${name} is integrating real-time API integrations!`);
      return;
    }
    try { playUiSound("click"); } catch {}
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openVideo = () => {
    try { playUiSound("click"); } catch {}
    setIsVideoOpen(true);
    triggerToast(isVi ? "Đang phát video giới thiệu hệ thống MP4..." : "Playing system presentation MP4 video...");
    setTimeout(() => {
      if (videoPlayerRef.current) {
        videoPlayerRef.current.play().catch(() => {});
      }
    }, 150);
  };

  const closeVideo = () => {
    try { playUiSound("click"); } catch {}
    if (videoPlayerRef.current) {
      videoPlayerRef.current.pause();
    }
    setIsVideoOpen(false);
  };

  return (
    <section
      id="systems"
      className="relative w-full h-full flex flex-col justify-start items-stretch p-[15px] font-sans text-slate-800 dark:text-slate-100 transition-colors duration-500 select-none overflow-y-auto no-scrollbar"
    >
      <div className="w-full flex-grow flex flex-col gap-[15px] max-w-7xl mx-auto justify-start relative z-10">
        
        {/* ========================================================================= */}
        {/* FLOATING ACTION VIDEO POPUP COMPONENT (TOP-RIGHT ABOVE ALL LAYERS) */}
        {/* ========================================================================= */}
        <div className="absolute -top-6 right-2 sm:right-4 z-40 flex flex-col items-center justify-center">
          <div 
            onClick={openVideo}
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-0.5 bg-gradient-to-tr from-indigo-600 via-purple-500 to-rose-500 shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center"
          >
            <span className="absolute inset-0 rounded-full bg-indigo-500/15 animate-ping opacity-55 pointer-events-none" />
            
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border border-white/95 dark:border-slate-800 relative shadow-inner">
              <img 
                src="https://i.ibb.co/BKHcWL5R/Logo-VED.gif" 
                alt="System Presentation" 
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-white/10 pointer-events-none rounded-full" />
            </div>

            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 border border-white dark:border-slate-900" />
            </span>
          </div>

          <button 
            type="button"
            onClick={openVideo}
            className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 text-white text-[9px] font-extrabold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
          >
            <Play className="w-2 h-2 text-yellow-300 animate-pulse fill-yellow-300" />
            <span className="tracking-wider uppercase">Play Video</span>
          </button>
        </div>

        {/* Header Card Hệ thống giống tiêu đề thẻ chính */}
        <PageCardHeader pageId="systems" />

        {/* ========================================================================= */}
        {/* 12 SYSTEMS BENTO GRID: COMPACT EQUAL-HEIGHT CARDS & ELEGANT GRADIENTS     */}
        {/* [MẪU ÁP DỤNG 16: ĐỒNG BỘ CÙNG GIAO DIỆN ĐANG CHỌN & CHIỀU CAO BẰNG NHAU]   */}
        {/* Outer radius: 24px (rounded-[24px]), padding: 16px (p-4)                 */}
        {/* Inner element radius = 24px - 16px = 8px (rounded-[8px])                */}
        {/* Equal height: h-[126px] sm:h-[130px] & grid auto-rows-fr items-stretch    */}
        {/* ========================================================================= */}
        <IndustrialSubSection className="flex-1 flex flex-col">
          <div className="w-full flex-grow rounded-[24px] p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md shadow-lg flex flex-col justify-center items-center">
            <AnimatePresence mode="popLayout">
              <motion.div 
                layout
                variants={industrialContainerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[15px] w-full h-full auto-rows-fr items-stretch"
              >
              {SYSTEMS_DATA.map((item, idx) => {
                const IconComponent = item.icon;
                const WatermarkComponent = item.watermarkIcon;

                return (
                  <MagneticBentoWrapper key={item.id} className="h-full w-full">
                    <motion.article
                      layout
                      variants={industrialSubSectionVariants}
                      onClick={() => handleCardClick(item.url, isVi ? item.nameVi : item.nameEn)}
                      onMouseEnter={() => { try { playUiSound("hover"); } catch {} }}
                      style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 10px))" }}
                      className={cn(
                        "group cursor-pointer relative overflow-hidden p-3.5 sm:p-4 flex flex-col justify-between h-full min-h-[126px] sm:min-h-[130px] w-full shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl text-slate-900 dark:text-white hover:border-indigo-400/60 dark:hover:border-indigo-500/60"
                      )}
                    >
                    {/* Watermark Floating Back Icon */}
                    <div className="absolute -right-2 -bottom-2 text-[3rem] opacity-10 dark:opacity-15 group-hover:opacity-25 pointer-events-none transform -rotate-12 group-hover:rotate-[-6deg] group-hover:scale-110 transition-all duration-500 ease-in-out text-indigo-600 dark:text-indigo-400">
                      <WatermarkComponent className="w-14 h-14 stroke-[1.2]" />
                    </div>

                    {/* Standard Content Surface wrapping */}
                    <div className="relative z-10 flex-1 flex flex-col justify-between h-full w-full">
                      
                      {/* Dòng 1 : Tên hệ thống (Tiêu đề card cấp 7) */}
                      <div className="w-full text-left">
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 tracking-wide leading-snug truncate">
                          {isVi ? item.nameVi : item.nameEn}
                        </p>
                      </div>

                      {/* Dòng 2 : Bên trái chữ viết tắt , bên phải icon (Kích thước H3) */}
                      <div className="flex items-center justify-between gap-2 my-auto">
                        <h3 className="text-xl sm:text-2xl font-black tracking-wider text-slate-900 dark:text-white font-mono select-none leading-none truncate">
                          {item.code}
                        </h3>
                        <div 
                          style={{ borderRadius: "8px" }}
                          className={cn(
                            "w-9 h-9 sm:w-10 sm:h-10 rounded-[8px] bg-gradient-to-br text-white shadow-md flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shrink-0",
                            item.gradientClass
                          )}
                        >
                          <IconComponent className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2] drop-shadow-sm text-white" />
                        </div>
                      </div>

                      {/* Dòng 3 : Tên tiếng anh đầy đủ (Tiêu đề card cấp 7) */}
                      <div className="w-full text-left pt-1 border-t border-slate-200/60 dark:border-slate-800 mt-auto">
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium italic tracking-tight leading-tight truncate">
                          {item.nameEn}
                        </p>
                      </div>

                    </div>
                  </motion.article>
                </MagneticBentoWrapper>
              );
            })}
          </motion.div>
          </AnimatePresence>
          </div>
        </IndustrialSubSection>

      </div>

      {/* ========================================================================= */}
      {/* VIDEO PLAYER LIGHTBOX MODAL: MP4 STREAMING PRESENTATION */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideo}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col relative z-50 text-left"
            >
              {/* Lightbox Header */}
              <div className="p-4 bg-slate-800/90 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-400/50 flex items-center justify-center text-indigo-400">
                    <Play className="w-3.5 h-3.5 fill-indigo-400 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wide">
                      {isVi ? "Video Giới Thiệu Hệ Thống Vận Hành" : "System Operations Overview"}
                    </h4>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                      PowerService Enterprise Digital Architecture
                    </p>
                  </div>
                </div>
                
                <button 
                  type="button"
                  onClick={closeVideo} 
                  className="w-8 h-8 rounded-full bg-slate-700 text-slate-300 hover:text-white hover:bg-slate-600 flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Responsive Video Canvas Frame */}
              <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                <video 
                  ref={videoPlayerRef}
                  controls 
                  playsInline 
                  preload="auto"
                  className="w-full h-full object-contain"
                  poster="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
                  {isVi 
                    ? "Trình duyệt của bạn không hỗ trợ thẻ phát video HTML5." 
                    : "Your browser does not support the HTML5 video tag."}
                </video>
              </div>

              {/* Lightbox Footer */}
              <div className="p-4 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between text-caption text-slate-400 font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  {isVi ? "Định dạng: MP4 Full HD 1080p" : "Format: MP4 Full HD 1080p"}
                </span>
                
                <button 
                  type="button"
                  onClick={closeVideo} 
                  className="px-4 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition font-bold text-caption cursor-pointer"
                >
                  {isVi ? "Đóng Video" : "Close Player"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* FLOATING TOAST NOTIFIER COMPONENT */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 15, x: "-50%" }}
            transition={{ type: "spring", damping: 18, stiffness: 220 }}
            className="fixed bottom-16 left-1/2 -translate-x-1/2 z-55 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-slate-700/80 pointer-events-none select-none max-w-sm text-center"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

export default Systems;
