import React, { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Award, 
  Users, 
  Signal, 
  Headset, 
  Briefcase, 
  Gamepad2, 
  ShoppingBag, 
  ShieldCheck, 
  Heart, 
  CreditCard, 
  Bot, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Quote, 
  Zap, 
  Compass, 
  Lightbulb, 
  BarChart2, 
  ArrowRight, 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  X,
  Phone,
  Mail,
  Calendar,
  Layers,
  Network
} from "lucide-react";
import { useLanguage } from "../i18n";
import { cn } from "../lib/utils";

export interface OverlayScene {
  id: string;
  startTime: number; // in seconds
  endTime: number;   // in seconds
  titleVi: string;
  titleEn: string;
  badgeVi?: string;
  badgeEn?: string;
  subtitleVi?: string;
  subtitleEn?: string;
  company?: string;
  year?: string;
  logo?: string;
  additionalLogos?: { name: string; url: string; size?: "sm" | "md" | "lg" }[];
  keywordsVi?: string[];
  keywordsEn?: string[];
  miniCardsVi?: { title: string; desc?: string; icon: React.ComponentType<{ className?: string }> }[];
  miniCardsEn?: { title: string; desc?: string; icon: React.ComponentType<{ className?: string }> }[];
  quoteVi?: string;
  quoteEn?: string;
  statNumber?: string;
  statLabelVi?: string;
  statLabelEn?: string;
  icon?: React.ComponentType<{ className?: string }>;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "bottom-center" | "side-stack";
  themeColor?: string; // hex or tailwind text color
  bgGradient?: string;
  ctaVi?: string;
  ctaEn?: string;
}

export const OVERLAY_SCENES: OverlayScene[] = [
  // SCENE 01: 00:01 – 00:09
  {
    id: "scene-01",
    startTime: 1,
    endTime: 9,
    titleVi: "NGUYỄN HÙNG THÁI",
    titleEn: "NGUYEN HUNG THAI",
    badgeVi: "22+ NĂM KINH NGHIỆM",
    badgeEn: "22+ YEARS CX EXP",
    subtitleVi: "Xây dựng • Vận hành • Phát triển dịch vụ khách hàng",
    subtitleEn: "Building • Operating • Advancing Customer Services",
    statNumber: "22+",
    statLabelVi: "Năm Quản trị CX & Contact Center",
    statLabelEn: "Years CX & Contact Center Governance",
    keywordsVi: ["Chăm sóc khách hàng", "Quản trị vận hành", "Phát triển đội ngũ"],
    keywordsEn: ["Customer Care", "Operations Governance", "Team Leadership"],
    icon: Award,
    position: "top-left",
    themeColor: "#0284c7"
  },
  // SCENE 02: 00:09 – 00:24
  {
    id: "scene-02",
    startTime: 9,
    endTime: 24,
    year: "2002",
    company: "MOBIFONE",
    titleVi: "NỀN TẢNG DỊCH VỤ KHÁCH HÀNG",
    titleEn: "CUSTOMER SERVICE FOUNDATION",
    subtitleVi: "Đào tạo bài bản theo tiêu chuẩn ngành viễn thông",
    subtitleEn: "Rigorous training under telecom standards",
    logo: "https://i.ibb.co/hxHm9TsZ/Mobifone.png",
    keywordsVi: ["Call Center", "Khung quy trình", "Xử lý sự cố", "Tiêu chuẩn viễn thông"],
    keywordsEn: ["Call Center", "Workflow Standard", "Incident Handling", "Telecom Standard"],
    icon: Signal,
    position: "top-right",
    themeColor: "#0284c7"
  },
  // SCENE 03: 00:24 – 00:32
  {
    id: "scene-03",
    startTime: 24,
    endTime: 32,
    year: "2007",
    company: "VIỄN LIÊN V247",
    titleVi: "QUẢN LÝ ĐỘI NGŨ & CHẤT LƯỢNG",
    titleEn: "TEAM & QUALITY GOVERNANCE",
    subtitleVi: "Giám sát chất lượng và tối ưu hiệu quả vận hành Contact Center quy mô lớn",
    subtitleEn: "Quality supervision & process optimization for large Contact Centers",
    logo: "https://i.ibb.co/QvtbdnfP/V247.png",
    keywordsVi: ["Giám sát chất lượng", "Hệ thống KPI", "Tối ưu vận hành"],
    keywordsEn: ["Quality Control", "KPI System", "Operations Optimization"],
    icon: Headset,
    position: "top-left",
    themeColor: "#7c3aed"
  },
  // SCENE 04: 00:32 – 00:42
  {
    id: "scene-04",
    startTime: 32,
    endTime: 42,
    year: "2011",
    company: "HTVC (LBC)",
    titleVi: "TRƯỞNG PHÒNG CHĂM SÓC KHÁCH HÀNG",
    titleEn: "HEAD OF CUSTOMER SERVICE",
    subtitleVi: "Lần đầu đảm nhiệm quản trị phòng ban toàn diện",
    subtitleEn: "First full-scale departmental director position",
    logo: "https://i.ibb.co/R4YXWyzF/LBC.png",
    quoteVi: "Chuyển mình từ quản lý vận hành → quản trị toàn diện hệ thống & con người.",
    quoteEn: "Transitioning from operation manager → comprehensive systems & human governance.",
    icon: Briefcase,
    position: "bottom-left",
    themeColor: "#059669"
  },
  // SCENE 05: 00:42 – 01:00
  {
    id: "scene-05",
    startTime: 42,
    endTime: 60,
    titleVi: "QUẢN TRỊ TOÀN DIỆN 4 TRỤ CỘT",
    titleEn: "4 PILLARS OF COMPREHENSIVE GOVERNANCE",
    subtitleVi: "Chuẩn hóa quy trình, phát triển đội ngũ và liên kết mục tiêu kinh doanh",
    subtitleEn: "Workflow standardization, talent cultivation & business alignment",
    miniCardsVi: [
      { title: "QUY TRÌNH", desc: "Chuẩn hóa & tối giản", icon: Layers },
      { title: "ĐỘI NGŨ", desc: "Đào tạo & truyền cảm hứng", icon: Users },
      { title: "KPI", desc: "Đo lường & cải tiến liên tục", icon: BarChart2 },
      { title: "PHỐI HỢP", desc: "Liên kết đa phòng ban", icon: Network }
    ],
    miniCardsEn: [
      { title: "PROCESS", desc: "Standardized & streamlined", icon: Layers },
      { title: "PEOPLE", desc: "Training & inspiring", icon: Users },
      { title: "KPIs", desc: "Data-driven improvement", icon: BarChart2 },
      { title: "SYNERGY", desc: "Cross-departmental alignment", icon: Network }
    ],
    icon: Sparkles,
    position: "bottom-center",
    themeColor: "#2563eb"
  },
  // SCENE 06: 01:00 – 01:12
  {
    id: "scene-06",
    startTime: 60,
    endTime: 72,
    year: "2013",
    company: "GARENA",
    titleVi: "CUSTOMER SERVICE FOR GAMING",
    titleEn: "CUSTOMER SERVICE FOR GAMING",
    subtitleVi: "Xử lý khối lượng phản hồi khổng lồ với tốc độ vượt trội",
    subtitleEn: "Handling massive ticket volumes at ultra-fast speeds",
    logo: "https://i.ibb.co/h1Md65yV/Garena.png",
    keywordsVi: ["FAST (Tốc độ)", "ACCURATE (Chính xác)", "HIGH VOLUME (Khối lượng lớn)"],
    keywordsEn: ["FAST", "ACCURATE", "HIGH VOLUME"],
    icon: Gamepad2,
    position: "top-right",
    themeColor: "#e11d48"
  },
  // SCENE 07: 01:12 – 01:30
  {
    id: "scene-07",
    startTime: 72,
    endTime: 88,
    titleVi: "ĐA DẠNG SẢN PHẨM & LĨNH VỰC HỆ E-SPORTS",
    titleEn: "DIVERSE MULTI-PRODUCT ECOSYSTEM",
    subtitleVi: "Đồng hành quản trị dịch vụ trên nhiều nền tảng hàng đầu",
    subtitleEn: "Managing service operations across top-tier platforms",
    additionalLogos: [
      { name: "Garena", url: "https://i.ibb.co/h1Md65yV/Garena.png", size: "lg" },
      { name: "Shopee", url: "https://i.ibb.co/BSVS4xf/Shopee.png", size: "md" },
      { name: "AirPay / MoMo", url: "https://i.ibb.co/k2QtrgTw/Momo.png", size: "md" },
      { name: "Vietnam Esports", url: "https://i.ibb.co/hxHm9TsZ/Mobifone.png", size: "sm" }
    ],
    keywordsVi: ["Garena", "Vietnam Esports", "Shopee", "AirPay", "Liên Quân Mobile"],
    keywordsEn: ["Garena", "Vietnam Esports", "Shopee", "AirPay", "Arena of Valor"],
    icon: Layers,
    position: "side-stack",
    themeColor: "#f97316"
  },
  // SCENE 08: 01:30 – 01:43
  {
    id: "scene-08",
    startTime: 88,
    endTime: 102,
    titleVi: "BẢN LĨNH THÍCH ỨNG & PHÁT TRIỂN",
    titleEn: "ADAPTABILITY & CONTINUOUS GROWTH",
    subtitleVi: "Mỗi lĩnh vực có mô hình vận hành và kỳ vọng khách hàng khác nhau",
    subtitleEn: "Each domain has distinct operational models & customer expectations",
    miniCardsVi: [
      { title: "ADAPT", desc: "Linh hoạt thích ứng môi trường mới", icon: Compass },
      { title: "LEARN", desc: "Liên tục học hỏi tri thức mới", icon: Lightbulb },
      { title: "IMPROVE", desc: "Không ngừng cải tiến trải nghiệm", icon: TrendingUp }
    ],
    miniCardsEn: [
      { title: "ADAPT", desc: "Agile adaptation to new domains", icon: Compass },
      { title: "LEARN", desc: "Continuous learning mindset", icon: Lightbulb },
      { title: "IMPROVE", desc: "Relentless CX improvement", icon: TrendingUp }
    ],
    icon: Compass,
    position: "bottom-center",
    themeColor: "#8b5cf6"
  },
  // SCENE 09: 01:43 – 02:00
  {
    id: "scene-09",
    startTime: 102,
    endTime: 120,
    year: "2013-2016",
    company: "SHOPEE",
    titleVi: "E-COMMERCE & OMNICHANNEL CS",
    titleEn: "E-COMMERCE & OMNICHANNEL CS",
    subtitleVi: "Tư duy quản trị thương mại điện tử hiện đại và hành trình khách hàng",
    subtitleEn: "Modern e-commerce management & end-to-end customer journey",
    logo: "https://i.ibb.co/BSVS4xf/Shopee.png",
    keywordsVi: ["Customer Journey", "Omnichannel Care", "Data-driven QC", "Large Scale Operations"],
    keywordsEn: ["Customer Journey", "Omnichannel Care", "Data-driven QC", "Large Scale Operations"],
    icon: ShoppingBag,
    position: "top-left",
    themeColor: "#ea580c"
  },
  // SCENE 10: 02:00 – 02:18
  {
    id: "scene-10",
    startTime: 120,
    endTime: 135,
    titleVi: "LÃNH ĐẠO ĐỘI NGŨ 129+ NHÂN SỰ",
    titleEn: "LEADING A TEAM OF 129+ SPECIALISTS",
    subtitleVi: "Tổ chức bộ máy, phát triển nguồn nhân lực kế thừa và xây dựng văn hóa phục vụ",
    subtitleEn: "Structuring organizations, training successor pipelines & service culture",
    statNumber: "129+",
    statLabelVi: "Nhân sự quản lý trực tiếp",
    statLabelEn: "Direct personnel managed",
    keywordsVi: ["Xây dựng bộ máy", "Đào tạo kế thừa", "Kết nối liên phòng ban"],
    keywordsEn: ["Organizational Design", "Successor Pipeline", "Cross-functional Alignment"],
    icon: Users,
    position: "bottom-right",
    themeColor: "#059669"
  },
  // SCENE 11: 02:18 – 02:35
  {
    id: "scene-11",
    startTime: 135,
    endTime: 150,
    year: "2016 - 2023",
    company: "PRUDENTIAL • MOMO • FINVIET",
    titleVi: "BẢO HIỂM & TÀI CHÍNH SỐ (FINTECH)",
    titleEn: "INSURANCE & DIGITAL FINTECH",
    subtitleVi: "Đòi hỏi tính chính xác, minh bạch, bảo mật và sự tin cậy tuyệt đối",
    subtitleEn: "Requiring precision, transparency, security & absolute trust",
    additionalLogos: [
      { name: "Prudential", url: "https://i.ibb.co/XfpQphWF/Prudential.png", size: "md" },
      { name: "MoMo", url: "https://i.ibb.co/k2QtrgTw/Momo.png", size: "md" },
      { name: "Finviet", url: "https://i.ibb.co/7NtSSz4d/Finviet.png", size: "md" }
    ],
    keywordsVi: ["Minh bạch & Tin cậy", "Tối ưu dịch vụ số", "Quy trình - Công nghệ - Trải nghiệm"],
    keywordsEn: ["Transparency & Trust", "Digital Service Optimization", "Process - Tech - Experience"],
    icon: ShieldCheck,
    position: "top-right",
    themeColor: "#db2777"
  },
  // SCENE 12: 02:35 – 02:50
  {
    id: "scene-12",
    startTime: 150,
    endTime: 170,
    titleVi: "TRIẾT LÝ QUẢN TRỊ CỐT LÕI",
    titleEn: "CORE MANAGEMENT PHILOSOPHY",
    quoteVi: "Dịch vụ xuất sắc không đến từ may mắn, mà đến từ Quy trình chuẩn mực, Công nghệ hiện đại và Con người tận tâm.",
    quoteEn: "Service excellence never happens by chance; it stems from Standardized Processes, Modern Technology, and Dedicated People.",
    icon: Quote,
    position: "bottom-left",
    themeColor: "#0284c7"
  },
  // SCENE 13: 02:50 – 03:05
  {
    id: "scene-13",
    startTime: 170,
    endTime: 185,
    titleVi: "TIÊN PHONG TỰ ĐỘNG HÓA AI & CRM",
    titleEn: "PIONEERING AI & CRM AUTOMATION",
    subtitleVi: "Tích hợp AI Bot trợ lý số, tối ưu hóa quy trình chăm sóc 24/7",
    subtitleEn: "Integrating AI Bot digital assistants, optimizing 24/7 care workflows",
    keywordsVi: ["24/7 AI Companion", "Omnichannel CRM", "Data-driven Analytics", "Proactive Service"],
    keywordsEn: ["24/7 AI Companion", "Omnichannel CRM", "Data-driven Analytics", "Proactive Service"],
    icon: Bot,
    position: "top-left",
    themeColor: "#06b6d4"
  },
  // SCENE 14: 03:05 – 03:25
  {
    id: "scene-14",
    startTime: 185,
    endTime: 210,
    titleVi: "RẤT MONG ĐƯỢC HỢP TÁC & ĐỒNG HÀNH",
    titleEn: "LOOKING FORWARD TO PARTNERING WITH YOU",
    subtitleVi: "Nguyễn Hùng Thái • Trưởng phòng Chăm sóc Khách hàng",
    subtitleEn: "Nguyen Hung Thai • Head of Customer Service",
    quoteVi: "Sẵn sàng đồng hành cùng Quý Doanh nghiệp kiến tạo trải nghiệm khách hàng xuất sắc.",
    quoteEn: "Ready to join hands with your Enterprise to build exceptional customer experiences.",
    ctaVi: "Liên hệ trao đổi ngay",
    ctaEn: "Contact for Collaboration",
    icon: Heart,
    position: "bottom-center",
    themeColor: "#10b981"
  }
];

export interface DynamicVideoStoryOverlayProps {
  currentTime: number;
  duration?: number;
  isPlaying: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onTogglePlay: () => void;
  onClose?: () => void;
  onSeek?: (time: number) => void;
  className?: string;
  embedded?: boolean;
}

const formatTime = (secs: number) => {
  if (isNaN(secs) || secs < 0) return "00:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export const DynamicVideoStoryOverlay: React.FC<DynamicVideoStoryOverlayProps> = ({
  currentTime,
  duration = 210,
  isPlaying,
  isMuted,
  onToggleMute,
  onTogglePlay,
  onClose,
  onSeek,
  className,
  embedded = false
}) => {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  // Find active scene based on currentTime
  const activeScene = useMemo(() => {
    return OVERLAY_SCENES.find(
      (s) => currentTime >= s.startTime && currentTime < s.endTime
    ) || OVERLAY_SCENES[0];
  }, [currentTime]);

  const activeIndex = OVERLAY_SCENES.findIndex((s) => s.id === activeScene.id);

  const IconComp = activeScene.icon || Award;

  // Embedded Mode (directly inside Hero Intro Card on Home)
  if (embedded) {
    return (
      <div className={cn("w-full h-full flex flex-col justify-between relative z-20 pointer-events-auto text-slate-900 dark:text-white select-none overflow-hidden", className)}>
        {/* Top Header: Live Badge + Mini Timeline Nodes */}
        <div className="flex items-center justify-between gap-1.5 pb-1.5 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />
            <span className="text-3xs font-mono font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
              {isVi ? "Giới thiệu Live Story" : "Live Story Overlay"}
            </span>
          </div>

          {/* Mini Scene Progress Dots */}
          <div className="flex items-center gap-0.5 overflow-x-auto no-scrollbar py-0.5 max-w-[150px] sm:max-w-[200px]">
            {OVERLAY_SCENES.map((scene, idx) => {
              const isActive = idx === activeIndex;
              const isPassed = idx < activeIndex;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => onSeek && onSeek(scene.startTime + 0.1)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300 cursor-pointer shrink-0",
                    isActive
                      ? "w-4 bg-gradient-to-r from-blue-600 to-cyan-500 ring-1 ring-cyan-400"
                      : isPassed
                      ? "w-2 bg-blue-500/80 dark:bg-cyan-500/80"
                      : "w-1.5 bg-slate-300 dark:bg-slate-700"
                  )}
                  title={`${scene.year ? scene.year + ": " : ""}${isVi ? scene.titleVi : scene.titleEn}`}
                />
              );
            })}
          </div>

          <span className="text-3xs font-mono font-bold text-slate-500 dark:text-slate-400 shrink-0">
            {String(activeIndex + 1).padStart(2, "0")}/{String(OVERLAY_SCENES.length).padStart(2, "0")}
          </span>
        </div>

        {/* Animated Active Scene Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-1.5 py-0.5"
          >
            {/* Logo / Icon + Company / Title */}
            <div className="flex items-center gap-2">
              {activeScene.logo ? (
                <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 shadow-2xs shrink-0 flex items-center justify-center">
                  <img src={activeScene.logo} alt={activeScene.company || "Logo"} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
              ) : (
                <div 
                  className="w-8 h-8 rounded-lg text-white flex items-center justify-center shadow-xs shrink-0"
                  style={{ backgroundColor: activeScene.themeColor || "#0284c7" }}
                >
                  <IconComp className="w-4 h-4" />
                </div>
              )}

              <div className="min-w-0 flex-1 text-left">
                {activeScene.company && (
                  <span className="text-3xs font-mono font-black uppercase tracking-wider block truncate" style={{ color: activeScene.themeColor || "#0284c7" }}>
                    {activeScene.company}
                  </span>
                )}
                <h4 className="text-xs sm:text-sm font-extrabold tracking-tight leading-snug truncate text-slate-900 dark:text-white">
                  {isVi ? activeScene.titleVi : activeScene.titleEn}
                </h4>
              </div>

              {(activeScene.year || activeScene.badgeVi) && (
                <span 
                  className="px-2 py-0.5 rounded-full text-white text-[10px] font-black shadow-2xs tracking-wider uppercase shrink-0"
                  style={{ backgroundColor: activeScene.themeColor || "#0284c7" }}
                >
                  {activeScene.year ? activeScene.year : (isVi ? activeScene.badgeVi : activeScene.badgeEn)}
                </span>
              )}
            </div>

            {/* Subtitle or Quote or Stat Number */}
            {activeScene.statNumber ? (
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-blue-50/80 dark:bg-cyan-950/40 border border-blue-200/80 dark:border-cyan-800/50 my-0.5 text-left">
                <span className="text-xl sm:text-2xl font-black text-blue-600 dark:text-cyan-400 tracking-tight shrink-0">
                  {activeScene.statNumber}
                </span>
                <span className="text-3xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  {isVi ? activeScene.statLabelVi : activeScene.statLabelEn}
                </span>
              </div>
            ) : activeScene.quoteVi ? (
              <p className="text-xs font-medium italic text-slate-700 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 p-2 rounded-xl border border-slate-200/80 dark:border-slate-700 leading-tight text-left">
                "{isVi ? activeScene.quoteVi : activeScene.quoteEn}"
              </p>
            ) : (activeScene.subtitleVi || activeScene.subtitleEn) ? (
              <p className="text-xs text-slate-700 dark:text-slate-200 font-medium leading-tight text-left">
                {isVi ? activeScene.subtitleVi : activeScene.subtitleEn}
              </p>
            ) : null}

            {/* Keywords Pills */}
            {((isVi ? activeScene.keywordsVi : activeScene.keywordsEn) || []).length > 0 && (
              <div className="flex flex-wrap items-center gap-1 my-0.5 text-left">
                {(isVi ? activeScene.keywordsVi : activeScene.keywordsEn)!.slice(0, 3).map((kw) => (
                  <span
                    key={kw}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-800 dark:text-slate-200"
                  >
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{kw}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Additional Logos */}
            {(activeScene.additionalLogos || []).length > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {activeScene.additionalLogos!.map((item) => (
                  <div key={item.name} className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold shrink-0 shadow-2xs">
                    <img src={item.url} alt={item.name} className="w-3.5 h-3.5 object-contain" referrerPolicy="no-referrer" />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Timeline Progress Bar & Controls Row */}
        <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 flex flex-col gap-1.5 mt-0.5">
          {/* Progress Slider */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 w-8 text-right shrink-0">
              {formatTime(currentTime)}
            </span>
            <div 
              className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 relative overflow-hidden cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                if (onSeek && duration) onSeek(pos * duration);
              }}
            >
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-150"
                style={{ width: `${Math.min(100, Math.max(0, (currentTime / (duration || 1)) * 100))}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 w-8 text-left shrink-0">
              {formatTime(duration)}
            </span>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between gap-1.5 pt-0.5">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onTogglePlay}
                className="p-1.5 rounded-lg bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 text-blue-600 dark:text-cyan-400 border border-blue-200/80 dark:border-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                title={isPlaying ? "Tạm dừng" : "Phát"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span className="text-3xs hidden xs:inline">{isPlaying ? (isVi ? "Tạm dừng" : "Pause") : (isVi ? "Phát" : "Play")}</span>
              </button>

              <button
                type="button"
                onClick={onToggleMute}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs transition-all cursor-pointer"
                title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-500" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-500" />}
              </button>
            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/40 text-3xs font-bold flex items-center gap-1 transition-all cursor-pointer ml-auto"
              >
                <X className="w-3 h-3" />
                <span>{isVi ? "Thoát video" : "Exit"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Position class mapping
  const getPositionClasses = (pos?: OverlayScene["position"]) => {
    switch (pos) {
      case "top-left":
        return "top-3 left-3 sm:top-6 sm:left-6 max-w-[280px] xs:max-w-[320px] sm:max-w-[400px]";
      case "top-right":
        return "top-3 right-3 sm:top-6 sm:right-6 max-w-[280px] xs:max-w-[320px] sm:max-w-[400px]";
      case "bottom-left":
        return "bottom-16 left-3 sm:bottom-20 sm:left-6 max-w-[280px] xs:max-w-[320px] sm:max-w-[400px]";
      case "bottom-right":
        return "bottom-16 right-3 sm:bottom-20 sm:right-6 max-w-[280px] xs:max-w-[320px] sm:max-w-[400px]";
      case "bottom-center":
        return "bottom-16 left-1/2 -translate-x-1/2 sm:bottom-20 max-w-[90vw] sm:max-w-[560px] w-full";
      case "side-stack":
        return "top-12 right-3 sm:top-16 sm:right-6 max-w-[280px] sm:max-w-[360px]";
      default:
        return "top-3 left-3 sm:top-6 sm:left-6 max-w-[320px] sm:max-w-[400px]";
    }
  };

  return (
    <div className={cn("absolute inset-0 pointer-events-none z-30 select-none overflow-hidden", className)}>
      
      {/* 1. TOP MINI INTERACTIVE SCENE TIMELINE BAR */}
      <div className="absolute top-2 left-2 right-2 sm:top-3 sm:left-4 sm:right-4 z-40 pointer-events-auto flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-2xl bg-slate-950/60 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg">
        <div className="flex items-center gap-1.5 pr-2 border-r border-white/20 shrink-0">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />
          <span className="text-[10px] sm:text-xs font-mono font-bold text-white uppercase tracking-wider">
            STORY OVERLAY
          </span>
        </div>

        {/* Mini Scene Nodes */}
        <div className="flex-1 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar py-0.5 px-1">
          {OVERLAY_SCENES.map((scene, idx) => {
            const isActive = idx === activeIndex;
            const isPassed = idx < activeIndex;
            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => onSeek && onSeek(scene.startTime + 0.1)}
                className={cn(
                  "h-1.5 sm:h-2 rounded-full transition-all duration-300 relative group cursor-pointer shrink-0",
                  isActive
                    ? "w-6 sm:w-8 bg-gradient-to-r from-cyan-400 to-blue-500 ring-2 ring-cyan-300/80 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                    : isPassed
                    ? "w-3 sm:w-4 bg-cyan-500/80"
                    : "w-2 sm:w-3 bg-white/25 hover:bg-white/50"
                )}
                title={`${scene.year ? scene.year + " - " : ""}${isVi ? scene.titleVi : scene.titleEn}`}
              >
                {/* Tooltip on Hover */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block px-2 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-bold whitespace-nowrap shadow-xl border border-white/20 z-50 pointer-events-none">
                  {scene.year ? `${scene.year}: ` : ""}{isVi ? scene.titleVi : scene.titleEn}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scene Indicator Counter */}
        <div className="pl-2 border-l border-white/20 shrink-0 text-[10px] sm:text-xs font-mono font-bold text-cyan-300">
          {String(activeIndex + 1).padStart(2, "0")}/{String(OVERLAY_SCENES.length).padStart(2, "0")}
        </div>
      </div>

      {/* 2. MAIN ACTIVE OVERLAY SCENE CARD (ANIMATED WITH FRAMER MOTION) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScene.id}
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "absolute z-30 pointer-events-auto transition-all duration-500",
            getPositionClasses(activeScene.position)
          )}
        >
          {/* GLASS CARD CONTAINER matching exact CSS spec from prompt */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.82)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.9)",
              borderRadius: "24px",
              boxShadow: "0 10px 30px 0 rgba(100, 110, 140, 0.15)"
            }}
            className="dark:!bg-slate-950/85 dark:!border-white/20 dark:!shadow-[0_16px_40px_rgba(0,0,0,0.6)] p-3.5 sm:p-5 relative overflow-hidden group text-slate-900 dark:text-white"
          >
            {/* Ambient Background Tint */}
            <div 
              className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full opacity-20 pointer-events-none blur-2xl transition-all duration-500"
              style={{ backgroundColor: activeScene.themeColor || "#0284c7" }}
            />

            {/* Header Row: Company Logo / Year / Badge / Main Icon */}
            <div className="flex items-center justify-between gap-2.5 pb-2.5 mb-2.5 border-b border-slate-200/80 dark:border-white/10 relative z-10">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                {activeScene.logo ? (
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 shadow-sm shrink-0 flex items-center justify-center">
                    <img 
                      src={activeScene.logo} 
                      alt={activeScene.company || "Logo"} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div 
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-white flex items-center justify-center shadow-md shrink-0"
                    style={{ backgroundColor: activeScene.themeColor || "#0284c7" }}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                )}

                <div className="min-w-0 flex-1 text-left">
                  {activeScene.company && (
                    <span 
                      className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider block truncate"
                      style={{ color: activeScene.themeColor || "#0284c7" }}
                    >
                      {activeScene.company}
                    </span>
                  )}
                  <h5 className="text-xs sm:text-sm md:text-base font-extrabold tracking-tight leading-snug truncate text-slate-900 dark:text-white">
                    {isVi ? activeScene.titleVi : activeScene.titleEn}
                  </h5>
                </div>
              </div>

              {/* Year Pill / Badge */}
              {(activeScene.year || activeScene.badgeVi) && (
                <span 
                  className="px-2.5 py-1 rounded-full text-white text-[10px] sm:text-xs font-black shadow-xs tracking-wider uppercase shrink-0 whitespace-nowrap ml-auto"
                  style={{ backgroundColor: activeScene.themeColor || "#0284c7" }}
                >
                  {activeScene.year ? activeScene.year : (isVi ? activeScene.badgeVi : activeScene.badgeEn)}
                </span>
              )}
            </div>

            {/* Subtitle / Description */}
            {(activeScene.subtitleVi || activeScene.subtitleEn) && (
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed text-left font-medium mb-3 relative z-10">
                {isVi ? activeScene.subtitleVi : activeScene.subtitleEn}
              </p>
            )}

            {/* Quote Block */}
            {(activeScene.quoteVi || activeScene.quoteEn) && (
              <div className="p-3 rounded-2xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-left my-2.5 relative z-10">
                <div className="flex items-start gap-2">
                  <Quote className="w-4 h-4 text-cyan-500 shrink-0 rotate-180 mt-0.5" />
                  <p className="text-xs sm:text-sm font-semibold italic text-slate-800 dark:text-slate-100 leading-snug">
                    "{isVi ? activeScene.quoteVi : activeScene.quoteEn}"
                  </p>
                </div>
              </div>
            )}

            {/* Big Stat Number Badge */}
            {activeScene.statNumber && (
              <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/20 my-2.5 text-left relative z-10">
                <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-cyan-400 tracking-tight shrink-0">
                  {activeScene.statNumber}
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                  {isVi ? activeScene.statLabelVi : activeScene.statLabelEn}
                </span>
              </div>
            )}

            {/* Sequential Keywords List */}
            {((isVi ? activeScene.keywordsVi : activeScene.keywordsEn) || []).length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 my-2.5 text-left relative z-10">
                {(isVi ? activeScene.keywordsVi : activeScene.keywordsEn)!.map((kw, i) => (
                  <motion.span
                    key={kw}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.25 }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 shadow-2xs"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span>{kw}</span>
                  </motion.span>
                ))}
              </div>
            )}

            {/* Mini Cards Grid (e.g. 4 Pillars or 3 Adaptation Cards) */}
            {((isVi ? activeScene.miniCardsVi : activeScene.miniCardsEn) || []).length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-2.5 text-left relative z-10">
                {(isVi ? activeScene.miniCardsVi : activeScene.miniCardsEn)!.map((card, i) => {
                  const CardIcon = card.icon || Sparkles;
                  return (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + i * 0.08, duration: 0.3 }}
                      className="p-2 sm:p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col items-center text-center group/mcard hover:border-blue-400 transition-all"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-600 dark:text-cyan-400 flex items-center justify-center mb-1">
                        <CardIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider block">
                        {card.title}
                      </span>
                      {card.desc && (
                        <span className="text-[9px] font-medium text-slate-500 dark:text-slate-400 line-clamp-1 leading-tight mt-0.5">
                          {card.desc}
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Stacked Logos (e.g. Scene 07 / 11) */}
            {(activeScene.additionalLogos || []).length > 0 && (
              <div className="flex items-center justify-start gap-2 my-2.5 overflow-x-auto no-scrollbar relative z-10 py-1">
                {activeScene.additionalLogos!.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.1 }}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs shrink-0"
                  >
                    <img src={item.url} alt={item.name} className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
                    <span className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-slate-200">{item.name}</span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Optional Call to Action Button */}
            {(activeScene.ctaVi || activeScene.ctaEn) && (
              <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-800 flex justify-end relative z-10">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    window.dispatchEvent(new CustomEvent("app-navigate", { detail: "contact" }));
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{isVi ? activeScene.ctaVi : activeScene.ctaEn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>
        </motion.div>
      </AnimatePresence>

      {/* 3. BOTTOM FLOATING VIDEO CONTROLS OVERLAY */}
      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-6 sm:right-6 z-40 pointer-events-auto flex items-center justify-between gap-2 p-2 rounded-2xl bg-slate-950/75 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl">
        <div className="flex items-center gap-2">
          {/* Play/Pause */}
          <button
            type="button"
            onClick={onTogglePlay}
            className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
            title={isPlaying ? "Tạm dừng" : "Phát video"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          {/* Mute/Unmute */}
          <button
            type="button"
            onClick={onToggleMute}
            className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Active Scene Title */}
          <div className="hidden sm:flex flex-col text-left ml-2 min-w-0">
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
              {activeScene.year ? `${activeScene.year} • ` : ""}{activeScene.company || "INTRODUCTION"}
            </span>
            <span className="text-xs font-extrabold text-white truncate max-w-[240px]">
              {isVi ? activeScene.titleVi : activeScene.titleEn}
            </span>
          </div>
        </div>

        {/* Close Overlay / Exit Intro Video */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-red-500/80 hover:bg-red-600 text-white font-bold text-xs backdrop-blur-md flex items-center gap-1.5 transition-all shadow-md cursor-pointer ml-auto"
          >
            <X className="w-3.5 h-3.5" />
            <span>{isVi ? "Thoát xem video" : "Exit Video"}</span>
          </button>
        )}
      </div>

    </div>
  );
};

export default DynamicVideoStoryOverlay;
