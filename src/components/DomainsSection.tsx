import React from "react";
import { useLanguage } from "../i18n";
import { PageCardHeader } from "./PageCardHeader";
import { 
  Globe, 
  Smartphone, 
  ShoppingCart, 
  Shield, 
  Gamepad2, 
  Wallet, 
  Layers, 
  Briefcase, 
  Users, 
  ArrowRight, 
  Trophy, 
  Quote 
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

// --- HIGH-FIDELITY BRAND LOGOS ---
const MobiFoneLogo = () => (
  <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-xs hover:scale-110 transition-transform duration-300 select-none p-1 shrink-0">
    <span className="text-[10px] font-black tracking-tight text-blue-600">mobi<span className="text-red-500">fone</span></span>
  </div>
);

const Call247Logo = () => (
  <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-xs hover:scale-110 transition-transform duration-300 select-none p-1 shrink-0">
    <span className="text-[10px] font-extrabold tracking-tight text-amber-500">Call<span className="text-red-500">247</span></span>
  </div>
);

const LbcLogo = () => (
  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 border border-emerald-400/30 flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300 select-none p-2.5 shrink-0">
    <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M10 6h4" />
      <path d="M8 10h8" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
    </svg>
  </div>
);

const ShopeeLogo = () => (
  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shadow-xs hover:scale-110 transition-transform duration-300 select-none p-1 shrink-0">
    <span className="text-white font-extrabold text-lg">S</span>
  </div>
);

const ShopeePayLogo = () => (
  <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center shadow-xs hover:scale-110 transition-transform duration-300 select-none p-1 text-center shrink-0">
    <span className="text-white font-black text-[8px] leading-none">Shopee<br/>Pay</span>
  </div>
);

const MomoLogo = () => (
  <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center shadow-xs hover:scale-110 transition-transform duration-300 select-none p-1 text-center shrink-0">
    <span className="text-white font-black text-[10px] leading-tight">mo<br/>mo</span>
  </div>
);

const FinvietLogo = () => (
  <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-xs hover:scale-110 transition-transform duration-300 select-none p-1 shrink-0">
    <span className="text-[9px] font-black text-amber-500">Finviet</span>
  </div>
);

const PrudentialLogo = () => (
  <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-xs hover:scale-110 transition-transform duration-300 select-none p-1 shrink-0">
    <span className="text-[8px] font-extrabold text-red-600 leading-none text-center tracking-tighter">PRUDENTIAL</span>
  </div>
);

const GarenaLogo = () => (
  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-xs hover:scale-110 transition-transform duration-300 select-none p-1 shrink-0">
    <span className="text-white font-black text-sm">G</span>
  </div>
);

const VietnamEsportsLogo = () => (
  <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex flex-col items-center justify-center shadow-xs hover:scale-110 transition-transform duration-300 select-none p-1 shrink-0">
    <span className="text-[7px] font-black text-red-600 leading-none">Vietnam</span>
    <span className="text-[7px] font-black text-emerald-600 leading-none">Esports</span>
  </div>
);

const GCafeLogo = () => (
  <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-xs hover:scale-110 transition-transform duration-300 select-none p-1 shrink-0">
    <span className="text-[10px] font-black text-sky-600">GCafé</span>
  </div>
);

const AirPayLogo = () => (
  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-xs hover:scale-110 transition-transform duration-300 select-none p-1 shrink-0">
    <span className="text-white font-black text-[9px]">AirPay</span>
  </div>
);

const SystemHubLogo = () => (
  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 border border-blue-400/30 flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300 select-none p-2 shrink-0">
    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v10" />
      <path d="M18.4 6.4a9 9 0 1 1-12.8 0" />
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" strokeWidth="1.5" className="opacity-80" />
    </svg>
  </div>
);

// --- DOMAINS STATIC DATA ---
const DOMAINS_DATA = [
  {
    id: "01",
    titleVi: "Viễn thông di động",
    titleEn: "Mobile Telecom",
    experienceVi: "10+ Năm kinh nghiệm",
    experienceEn: "10+ Years Experience",
    descVi: "Hơn 10 năm kinh nghiệm trong ngành viễn thông, từ mạng di động đến dịch vụ gọi quốc tế, nhắn tin và giải pháp kết nối toàn diện.",
    descEn: "Over 10 years of robust experience in telecom, scaling mobile connectivity, international voice nodes, and enterprise message hubs.",
    icon: Smartphone,
    logos: [MobiFoneLogo, Call247Logo, LbcLogo],
    accentClass: "border-blue-100 dark:border-blue-900/40 bg-blue-500/5 text-blue-600",
    themeColor: "text-blue-600 dark:text-sky-400",
    dotColor: "bg-blue-500"
  },
  {
    id: "02",
    titleVi: "Thương mại điện tử",
    titleEn: "E-Commerce",
    experienceVi: "6+ Năm kinh nghiệm",
    experienceEn: "6+ Years Experience",
    descVi: "Tham gia giai đoạn bùng nổ của thương mại điện tử và ví điện tử, xây dựng nền tảng vững chắc và tăng trưởng bền vững.",
    descEn: "Harnessing the rapid growth of e-commerce and e-wallets, building resilient platforms and sustainable business models.",
    icon: ShoppingCart,
    logos: [ShopeeLogo, ShopeePayLogo, MomoLogo, FinvietLogo],
    accentClass: "border-orange-100 dark:border-orange-900/40 bg-orange-500/5 text-orange-600",
    themeColor: "text-orange-600 dark:text-amber-500",
    dotColor: "bg-orange-500"
  },
  {
    id: "03",
    titleVi: "Bảo hiểm nhân thọ",
    titleEn: "Life Insurance",
    experienceVi: "3+ Năm kinh nghiệm",
    experienceEn: "3+ Years Experience",
    descVi: "Quản lý tổng đài và triển khai các dự án tích hợp hệ thống Call Center, tối ưu quy trình vận hành và nâng cao trải nghiệm khách hàng.",
    descEn: "Managing high-availability hotlines and deploying core integrated Call Center infrastructure, optimizing workflows and elevating CX.",
    icon: Shield,
    logos: [PrudentialLogo],
    accentClass: "border-cyan-100 dark:border-cyan-900/40 bg-cyan-500/5 text-cyan-600",
    themeColor: "text-cyan-600 dark:text-sky-400",
    dotColor: "bg-cyan-500"
  },
  {
    id: "04",
    titleVi: "Thể thao điện tử",
    titleEn: "Esports",
    experienceVi: "5+ Năm kinh nghiệm",
    experienceEn: "5+ Years Experience",
    descVi: "Xây dựng và quản lý bộ phận Chăm Sóc Khách Hàng cho nhà phát hành game, vận hành hệ thống game và cộng đồng người chơi.",
    descEn: "Establishing and supervising dedicated player support divisions, operating game services and moderating active gaming communities.",
    icon: Gamepad2,
    logos: [GarenaLogo, VietnamEsportsLogo, GCafeLogo],
    accentClass: "border-emerald-100 dark:border-emerald-900/40 bg-emerald-500/5 text-emerald-600",
    themeColor: "text-emerald-600 dark:text-emerald-400",
    dotColor: "bg-emerald-500"
  },
  {
    id: "05",
    titleVi: "Ví điện tử",
    titleEn: "E-Wallet",
    experienceVi: "5+ Năm kinh nghiệm",
    experienceEn: "5+ Years Experience",
    descVi: "Am hiểu vận hành Chăm Sóc Khách Hàng trong lĩnh vực FinTech, từ xác minh người dùng đến xử lý giao dịch và khiếu nại.",
    descEn: "Expertise in managing customer support operations for digital financial services, KYC verification, transactions, and escalations.",
    icon: Wallet,
    logos: [MomoLogo, ShopeePayLogo, AirPayLogo, FinvietLogo],
    accentClass: "border-amber-100 dark:border-amber-900/40 bg-amber-500/5 text-amber-600",
    themeColor: "text-amber-600 dark:text-amber-500",
    dotColor: "bg-amber-500"
  },
  {
    id: "06",
    titleVi: "Xây dựng hệ thống",
    titleEn: "Systems Architecture",
    experienceVi: "8+ Năm kinh nghiệm",
    experienceEn: "8+ Years Experience",
    descVi: "Tư vấn xây dựng và tối ưu hệ thống Chăm Sóc Khách Hàng toàn diện, từ quy trình, nhân sự đến công nghệ và dữ liệu.",
    descEn: "Consulting on the blueprint and optimization of comprehensive customer care architectures, spanning processes, agents, tech, and data.",
    icon: Layers,
    logos: [SystemHubLogo],
    accentClass: "border-indigo-100 dark:border-indigo-900/40 bg-indigo-500/5 text-indigo-600",
    themeColor: "text-indigo-600 dark:text-indigo-400",
    dotColor: "bg-indigo-500"
  }
];

export function DomainsSection() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  return (
    <section
      id="domains"
      className="relative w-full min-h-full flex flex-col justify-start items-center p-3 xs:p-4 sm:p-6 lg:p-8 font-sans text-slate-900 dark:text-slate-100 transition-all duration-300"
    >
      <div className="w-full flex flex-col gap-6 max-w-7xl">
        {/* Navigation & Header */}
        <PageCardHeader pageId="domains">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600 dark:text-sky-400 animate-spin-slow" />
            <span className="text-xs sm:text-caption font-bold font-mono tracking-wider uppercase text-blue-600 dark:text-sky-400">
              {isVi ? "DỊCH VỤ & LĨNH VỰC" : "SERVICES & DOMAINS"}
            </span>
          </div>
        </PageCardHeader>

        {/* Header Block from Lĩnh vực.png */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center w-full my-4 select-none">
          {/* Title & Slogan (Left side) */}
          <div className="md:col-span-8 flex flex-col justify-center text-left">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight select-none flex items-center gap-2.5">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">LĨNH VỰC</span>
            </h2>
            <p className="text-sm sm:text-base font-extrabold italic text-slate-500 dark:text-slate-400 mt-3 select-none leading-relaxed">
              {isVi 
                ? '"Sự đa dạng mang lại góc nhìn đa chiều và đột phá."' 
                : '"Diversity provides a multidimensional and breakthrough perspective."'}
            </p>
            <div className="w-16 h-1 bg-blue-600 dark:bg-sky-400 rounded-full mt-4" />
          </div>

          {/* Decorative Artwork Representation (Right side) */}
          <div className="md:col-span-4 hidden md:flex justify-end relative">
            <div className="w-32 h-32 rounded-full bg-blue-500/5 dark:bg-sky-400/5 absolute -top-4 -right-4 animate-pulse duration-3000" />
            <div className="relative z-10 flex flex-col items-center">
              {/* Globe structure */}
              <div className="relative w-28 h-28 rounded-full border-4 border-dashed border-blue-500/20 dark:border-sky-400/20 flex items-center justify-center animate-spin-slow">
                <Globe className="w-16 h-16 text-blue-600/70 dark:text-sky-400/70" />
              </div>
              {/* Overlay graphics badge */}
              <div className="absolute bottom-1 right-1 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-md">
                <span className="text-2xs font-mono font-black text-blue-600 dark:text-sky-400">GLOBAL CX</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6-Card Domain Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {DOMAINS_DATA.map((card, index) => {
            const CardIcon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={cn(
                  "relative rounded-3xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950/40 backdrop-blur-xl shadow-xs hover:shadow-lg hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between"
                )}
              >
                <div>
                  {/* Top Identifier Badge (Index) */}
                  <div className="flex items-center justify-between w-full mb-6">
                    <span className="px-3 py-1 rounded-lg text-xs font-mono font-black tracking-wider bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 text-slate-500 dark:text-slate-400">
                      {card.id}
                    </span>
                    
                    {/* Circle Card Icon */}
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shadow-xs shrink-0 border border-slate-100 dark:border-slate-800", card.accentClass)}>
                      <CardIcon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Experience */}
                  <div className="flex flex-col mb-4">
                    <h3 className={cn("text-xl font-black tracking-tight", card.themeColor)}>
                      {isVi ? card.titleVi : card.titleEn}
                    </h3>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-700 dark:text-slate-200 mt-1">
                      {isVi ? card.experienceVi : card.experienceEn}
                    </span>
                    
                    {/* Separator Line with Centered Dot */}
                    <div className="flex items-center gap-2 mt-3 mb-1">
                      <div className="h-px bg-slate-100 dark:bg-slate-800/80 flex-1" />
                      <span className={cn("w-2 h-2 rounded-full shrink-0 animate-pulse", card.dotColor)} />
                      <div className="h-px bg-slate-100 dark:bg-slate-800/80 flex-1" />
                    </div>
                  </div>

                  {/* Paragraph Description */}
                  <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-6 min-h-[60px]">
                    {isVi ? card.descVi : card.descEn}
                  </p>

                  {/* "Dự án tiêu biểu" Subheader */}
                  <div className="flex flex-col gap-3 select-none">
                    <span className="text-2xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">
                      {isVi ? "Dự án tiêu biểu" : "Key projects"}
                    </span>
                    
                    {/* Brand Logos Row */}
                    <div className="flex flex-wrap items-center justify-center gap-3 py-2">
                      {card.logos.map((LogoComponent, i) => (
                        <LogoComponent key={i} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom detail action link */}
                <div className="flex items-center justify-end mt-8 pt-4 border-t border-slate-50 dark:border-slate-800/40 w-full select-none">
                  <a
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      const projSection = document.getElementById("projects");
                      if (projSection) {
                        projSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={cn(
                      "flex items-center gap-1.5 text-xs font-black tracking-wider uppercase transition-colors hover:gap-2 duration-300",
                      card.themeColor
                    )}
                  >
                    <span>{isVi ? "Xem chi tiết" : "View details"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* General Stats / Core KPI Row from Lĩnh vực.png */}
        <div className="flex flex-col gap-4 mt-8 w-full select-none">
          {/* Header row with CTA button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-800/60 pb-3">
            <span className="text-xs font-mono font-black tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              {isVi ? "TỔNG QUAN LĨNH VỰC" : "DOMAINS OVERVIEW"}
            </span>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("projects");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-center self-start sm:self-auto shadow-2xs hover:scale-105 duration-300 flex items-center gap-1"
            >
              <span>{isVi ? "Xem tất cả lĩnh vực" : "View all domains"}</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white/60 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 backdrop-blur-md select-none">
            {/* Stat 1 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/10 shadow-inner">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-slate-800 dark:text-white leading-tight">06+</span>
                <span className="text-3xs text-slate-500 dark:text-slate-400 leading-normal font-bold">
                  {isVi ? "Lĩnh vực hoạt động" : "Operational Domains"}
                </span>
                <span className="text-3xs text-slate-400 leading-normal">
                  {isVi ? "Đa dạng & Chuyên sâu" : "Diverse & Specialized"}
                </span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/10 shadow-inner">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-slate-800 dark:text-white leading-tight">10+</span>
                <span className="text-3xs text-slate-500 dark:text-slate-400 leading-normal font-bold">
                  {isVi ? "Năm kinh nghiệm" : "Years of Experience"}
                </span>
                <span className="text-3xs text-slate-400 leading-normal">
                  {isVi ? "Trong nhiều ngành nghề" : "Across Multiple Industries"}
                </span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-blue-500/10 shadow-inner">
                <Layers className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-slate-800 dark:text-white leading-tight">50+</span>
                <span className="text-3xs text-slate-500 dark:text-slate-400 leading-normal font-bold">
                  {isVi ? "Dự án đã triển khai" : "Projects Deployed"}
                </span>
                <span className="text-3xs text-slate-400 leading-normal">
                  {isVi ? "Thành công & Hiệu quả" : "Successful & Efficient"}
                </span>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/10 shadow-inner">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 leading-tight">100%</span>
                <span className="text-3xs text-slate-500 dark:text-slate-400 leading-normal font-bold">
                  {isVi ? "Cam kết chất lượng" : "Quality Commitment"}
                </span>
                <span className="text-3xs text-slate-400 leading-normal">
                  {isVi ? "Uy tín & Đồng hành" : "Reputation & Partnership"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Personalized Quote Banner from Lĩnh vực.png */}
        <div className="w-full rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900/40 dark:to-indigo-950/20 border border-indigo-100 dark:border-indigo-950/60 p-6 flex items-center gap-4 mt-6 relative overflow-hidden select-none">
          <div className="p-3.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
            <Quote className="w-6 h-6 rotate-180" />
          </div>
          <p className="text-sm sm:text-base font-extrabold italic text-slate-800 dark:text-slate-200 leading-relaxed pr-8">
            {isVi 
              ? "Chúng tôi không ngừng mở rộng và chuyên sâu ở nhiều lĩnh vực để mang đến giải pháp tối ưu và giá trị bền vững cho khách hàng."
              : "We continuously expand and deepen our expertise across domains to deliver optimal solutions and sustainable values."}
          </p>
          
          {/* Target bullseye graphics representing charts and target with arrow on the right */}
          <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none items-center gap-3">
            <div className="flex items-end gap-1 h-12">
              <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
              <div className="w-1.5 h-10 bg-indigo-600 rounded-full" />
              <div className="w-1.5 h-8 bg-indigo-600 rounded-full animate-pulse" />
            </div>
            <svg className="w-16 h-16 text-indigo-600" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
              <circle cx="50" cy="50" r="35" strokeDasharray="6 6" />
              <circle cx="50" cy="50" r="20" />
              <path d="M50 10L50 90M10 50L90 50" />
              <circle cx="50" cy="50" r="5" fill="currentColor" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}

export default DomainsSection;
