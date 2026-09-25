import React from "react";
import { useLanguage } from "../i18n";
import { motion } from "motion/react";
import { 
  Target, 
  Rocket, 
  Gem, 
  TrendingDown, 
  Bot, 
  Sparkles, 
  Database, 
  Monitor, 
  Cpu, 
  Users, 
  Coins, 
  Globe, 
  Quote,
  BarChart3,
  Brain,
  Workflow,
  HeartHandshake,
  TrendingUp,
  Lightbulb,
  ShieldAlert
} from "lucide-react";
import { cn } from "../lib/utils";
import { PageCardHeader } from "./PageCardHeader";

// Strengths (S) - 7.1. Điểm mạnh: Nền tảng vận hành & lãnh đạo
const STRENGTHS_DATA = [
  { labelVi: "Trải nghiệm khách hàng", labelEn: "Customer Experience (CX)", percent: 98, icon: Sparkles },
  { labelVi: "CRM Contact Center", labelEn: "CRM & Contact Center", percent: 96, icon: Database },
  { labelVi: "Quản trị Hiệu suất", labelEn: "Performance Management", percent: 96, icon: BarChart3 },
  { labelVi: "Lãnh đạo & Đội ngũ", labelEn: "Leadership & Team Management", percent: 95, icon: Users },
  { labelVi: "SOP & Chuẩn hóa", labelEn: "SOP & Standardization", percent: 95, icon: Workflow },
  { labelVi: "Xử lý Khủng hoảng", labelEn: "Crisis Management", percent: 94, icon: ShieldAlert }
];

// Weaknesses / Growth (W) - 7.2. Hoàn thiện: Nâng cao năng lực quản trị
const WEAKNESSES_DATA = [
  { labelVi: "Tư duy dịch vụ", labelEn: "Service Mindset", percent: 92, icon: HeartHandshake },
  { labelVi: "Giao tiếp & Đàm phán", labelEn: "Communication & Negotiation", percent: 90, icon: Lightbulb },
  { labelVi: "Tư duy Chiến lược", labelEn: "Strategic Thinking", percent: 88, icon: Target },
  { labelVi: "Quản trị Dự án", labelEn: "Project Management", percent: 88, icon: Rocket },
  { labelVi: "Công nghệ Đổi mới", labelEn: "Innovative Technology", percent: 86, icon: Cpu },
  { labelVi: "Thiết kế & Lập trình", labelEn: "Design & Programming", percent: 78, icon: Monitor }
];

// Opportunities (O) Cards - 7.3. Cơ hội phát triển: Công nghệ & chuyển đổi dịch vụ
const OPPORTUNITIES_CARDS = [
  {
    titleVi: "AI & Tự động hóa",
    titleEn: "AI & Automation",
    percent: 94,
    descVi: "Ứng dụng AI, Chatbot, RPA và Tự động hóa để tối ưu vận hành & nâng tầm trải nghiệm.",
    descEn: "Implementing AI, Chatbots, RPA and automation tools to streamline workflows & CX.",
    icon: Bot,
    color: "bg-purple-50/80 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border-purple-200/80 dark:border-purple-800/60"
  },
  {
    titleVi: "Kaizen & Cải tiến",
    titleEn: "Kaizen & Continuous Improvement",
    percent: 94,
    descVi: "Cải tiến liên tục quy trình, loại bỏ lãng phí và tối ưu điểm nghẽn vận hành.",
    descEn: "Continuous process optimization and bottleneck elimination.",
    icon: TrendingUp,
    color: "bg-pink-50/80 dark:bg-pink-950/30 text-pink-700 dark:text-pink-300 border-pink-200/80 dark:border-pink-800/60"
  },
  {
    titleVi: "Tối ưu Chi phí",
    titleEn: "Cost Optimization",
    percent: 93,
    descVi: "Tối ưu hóa Cost-to-Serve, nâng cao hiệu quả hoạt động với nguồn lực hợp lý.",
    descEn: "Optimizing Cost-to-Serve while elevating service quality.",
    icon: Coins,
    color: "bg-amber-50/80 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/60"
  },
  {
    titleVi: "Chuyển đổi Số",
    titleEn: "Digital Transformation",
    percent: 92,
    descVi: "Thúc đẩy chuyển đổi số, Omnichannel CRM và hệ sinh thái dịch vụ số.",
    descEn: "Driving digital transformation, Omnichannel CRM, and digital service ecosystems.",
    icon: Monitor,
    color: "bg-indigo-50/80 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-800/60"
  },
  {
    titleVi: "Quản trị Dữ liệu",
    titleEn: "Data Governance & BI",
    percent: 91,
    descVi: "Khai thác dữ liệu, đo lường Realtime Dashboard & cá nhân hóa trải nghiệm.",
    descEn: "Leveraging operational data and real-time dashboards for touchpoint personalization.",
    icon: Database,
    color: "bg-cyan-50/80 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-300 border-cyan-200/80 dark:border-cyan-800/60"
  },
  {
    titleVi: "Thiết kế Hệ thống",
    titleEn: "System Architecture Design",
    percent: 87,
    descVi: "Tư vấn và kiến tạo hệ thống Contact Center & CSKH toàn diện.",
    descEn: "Consulting and building holistic Contact Center & CX architectures.",
    icon: Workflow,
    color: "bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60"
  }
];

// Threats (T) Cards - 7.4. Thách thức: Thích ứng & quản trị biến động
const THREATS_CARDS = [
  {
    titleVi: "Tối ưu Chi phí",
    titleEn: "Cost Optimization Pressures",
    percent: 94,
    descVi: "Yêu cầu hiệu quả vận hành cao hơn với chi phí tối ưu trong nền kinh tế biến động.",
    descEn: "Higher efficiency requirements under tight operating budgets.",
    icon: Coins,
    color: "bg-amber-50/80 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/60"
  },
  {
    titleVi: "AI & Thay đổi CSKH",
    titleEn: "AI & CSKH Transformation",
    percent: 92,
    descVi: "AI & Automation thay thế tác vụ lặp lại, đòi hỏi liên tục nâng cấp năng lực.",
    descEn: "AI automation shifting customer care roles towards higher level empathy.",
    icon: Bot,
    color: "bg-red-50/80 dark:bg-red-950/30 text-red-700 dark:text-red-300 border-red-200/80 dark:border-red-800/60"
  },
  {
    titleVi: "Công nghệ Đổi mới",
    titleEn: "Rapid Tech Disruption",
    percent: 90,
    descVi: "Công nghệ thay đổi nhanh chóng, đòi hỏi khả năng học hỏi và thích ứng liên tục.",
    descEn: "Fast evolving tech landscape requiring rapid continuous adaptation.",
    icon: Cpu,
    color: "bg-rose-50/80 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border-rose-200/80 dark:border-rose-800/60"
  },
  {
    titleVi: "Quản trị Rủi ro",
    titleEn: "Risk Management & Compliance",
    percent: 90,
    descVi: "Nhận diện, phòng ngừa và kiểm soát rủi ro vận hành & bảo mật dữ liệu.",
    descEn: "Proactive risk identification, operational controls, and data security.",
    icon: ShieldAlert,
    color: "bg-purple-50/80 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border-purple-200/80 dark:border-purple-800/60"
  },
  {
    titleVi: "Cạnh tranh Nhân sự",
    titleEn: "Talent Competition & Retention",
    percent: 88,
    descVi: "Áp lực giữ chân và phát triển nhân tài có tư duy dịch vụ & công nghệ.",
    descEn: "Competitive market demand for skilled service & tech talent.",
    icon: Users,
    color: "bg-orange-50/80 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 border-orange-200/80 dark:border-orange-800/60"
  },
  {
    titleVi: "Phối hợp Liên phòng",
    titleEn: "Cross-Functional Collaboration",
    percent: 86,
    descVi: "Xóa bỏ rào cản phòng ban, xây dựng Vòng lặp phản hồi (Closed-Loop VoC).",
    descEn: "Breaking department silos and embedding Closed-Loop VoC feedback loops.",
    icon: HeartHandshake,
    color: "bg-blue-50/80 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200/80 dark:border-blue-800/60"
  }
];

export function Skills() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";
  const [selectedSwot, setSelectedSwot] = React.useState<'S' | 'W' | 'O' | 'T'>('S');

  return (
    <section
      id="skills"
      className="relative w-full h-full flex flex-col justify-start items-stretch p-[15px] font-sans text-slate-900 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar"
    >
      <div className="w-full flex-grow flex flex-col gap-[15px] max-w-7xl mx-auto justify-start">
        
        {/* Page Header */}
        <PageCardHeader pageId="skills">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-caption font-bold font-mono tracking-wider uppercase text-blue-600 dark:text-cyan-400">
              {isVi ? "Phân tích SWOT cá nhân" : "Personal SWOT analysis"}
            </span>
          </div>
        </PageCardHeader>

        {/* SWOT TAB SWITCHER - "update giao diện đang chọn" */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-2 bg-slate-100/50 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 max-w-lg mx-auto select-none w-full">
          {[
            { id: "S", labelVi: "S · Thế mạnh", labelEn: "S · Strengths", color: "bg-blue-600 text-white shadow-blue-500/15" },
            { id: "W", labelVi: "W · Hoàn thiện", labelEn: "W · Weaknesses", color: "bg-orange-500 text-white shadow-orange-500/15" },
            { id: "O", labelVi: "O · Cơ hội", labelEn: "O · Opportunities", color: "bg-purple-600 text-white shadow-purple-500/15" },
            { id: "T", labelVi: "T · Thách thức", labelEn: "T · Threats", color: "bg-red-600 text-white shadow-red-500/15" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                try {
                  const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav");
                  audio.volume = 0.2;
                  audio.play();
                } catch {}
                setSelectedSwot(tab.id as any);
              }}
              className={cn(
                "flex-1 min-w-[90px] py-2 px-3.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer",
                selectedSwot === tab.id
                  ? tab.color + " shadow-md scale-102 ring-1 ring-white/10"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100/30 dark:hover:bg-slate-800/30"
              )}
            >
              {isVi ? tab.labelVi : tab.labelEn}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* 4-QUADRANT SWOT GRID: 2 CỘT 2 HÀNG Ở MỌI KÍCH THƯỚC [MẪU ÁP DỤNG 16]     */}
        {/* Outer Card: rounded-[24px] sm:rounded-[28px], padding: p-3.5 sm:p-5 md:p-6*/}
        {/* Inner Card / Mini Cards: r_inner = 28px - 20px = 8px (rounded-[8px])      */}
        {/* Inner Icon in Mini Card: r = 8px - 4px = 4px (rounded-[4px])              */}
        {/* ========================================================================= */}
        <div className="flex-1 w-full flex items-center justify-center">
          <div className="grid grid-cols-2 gap-[15px] items-stretch relative w-full justify-center">
            
            {/* 1. STRENGTHS (S) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 10px))" }}
              onClick={() => setSelectedSwot('S')}
              className={cn(
                "glass-card relative p-4 sm:p-5 md:p-6 border bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group/main cursor-pointer",
                selectedSwot === 'S'
                  ? "border-blue-400 dark:border-cyan-400 ring-4 ring-blue-500/15 dark:ring-cyan-500/25 scale-[1.015] z-10 dark:shadow-[0_0_25px_rgba(6,182,212,0.35)]"
                  : "border-blue-200/40 dark:border-cyan-500/10 opacity-60 saturate-[0.7] hover:opacity-95"
              )}
            >
              {/* Corner Letter S (Bottom Right) with Pulsing Glow */}
              <div className="absolute bottom-2.5 right-3 sm:bottom-3.5 sm:right-4 z-0 select-none pointer-events-none flex items-center justify-center">
                <span className="font-mono font-black text-3xl sm:text-4xl md:text-5xl text-blue-500/20 dark:text-cyan-400/25 group-hover/main:scale-110 group-hover/main:text-blue-500/30 dark:group-hover/main:text-cyan-400/35 transition-all duration-500">
                  S
                </span>
              </div>

              {/* Glass background reflection shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/5 to-transparent pointer-events-none opacity-0 group-hover/main:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10 w-full">
                {/* Quadrant Header */}
                <div className="flex items-center justify-between border-b border-blue-100 dark:border-slate-800 pb-3 sm:pb-4 mb-3.5 sm:mb-4.5">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 dark:from-cyan-500/20 dark:to-blue-500/20 flex items-center justify-center border border-blue-200/40 dark:border-cyan-500/30 shrink-0">
                      <Gem className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 text-blue-600 dark:text-cyan-400" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm md:text-md lg:text-[15px] font-black text-blue-700 dark:text-cyan-300 truncate font-play">
                        {isVi ? "7.1. THẾ MẠNH: NỀN TẢNG VẬN HÀNH & LÃNH ĐẠO" : "7.1. STRENGTHS: OPERATIONAL & LEADERSHIP FOUNDATION"}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Subtle Badge */}
                  <span className="hidden sm:inline-block px-2.5 py-1 text-[10px] font-bold text-blue-700 dark:text-cyan-300 bg-blue-500/10 dark:bg-cyan-500/10 rounded-full border border-blue-200/30 dark:border-cyan-500/20 uppercase tracking-wider scale-90">
                    {isVi ? "Ưu thế" : "Core"}
                  </span>
                </div>

                <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-300 leading-relaxed mb-4 sm:mb-5 line-clamp-3 sm:line-clamp-none">
                  {isVi 
                    ? "Những thế mạnh cốt lõi nổi bật nhất đã được chứng minh qua thực tiễn quản trị, vận hành và nâng cấp hệ thống CSKH."
                    : "Core outstanding strengths proven through management, operation, and CX system elevation."}
                </p>

                {/* Skills Progress List with Custom Premium Layout & Real Animated Bars */}
                <div className="flex flex-col gap-2.5 sm:gap-3">
                  {STRENGTHS_DATA.map((item, index) => {
                    const ItemIcon = item.icon;
                    return (
                      <div 
                        key={index} 
                        className="flex flex-col gap-1.5 p-2 sm:p-2.5 rounded-xl border border-transparent hover:border-blue-100 dark:hover:border-cyan-500/15 bg-transparent hover:bg-blue-50/20 dark:hover:bg-cyan-500/5 shadow-none hover:shadow-2xs transition-all duration-300 group/item cursor-pointer"
                      >
                        {/* Upper row: Label & Percent */}
                        <div className="flex items-center justify-between gap-2.5 w-full">
                          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                            <div className="w-5.5 h-5.5 rounded-md bg-blue-500/5 dark:bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover/item:bg-blue-500/10 dark:group-hover/item:bg-cyan-500/20 transition-colors">
                              <ItemIcon className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0 group-hover/item:scale-110 transition-transform" />
                            </div>
                            <span className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 truncate group-hover/item:text-blue-600 dark:group-hover/item:text-cyan-300 transition-colors">
                              {isVi ? item.labelVi : item.labelEn}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                            <span className="px-1.5 sm:px-2 py-0.5 rounded-[6px] bg-blue-500/10 text-blue-700 dark:text-cyan-300 border border-blue-500/25 dark:border-cyan-500/20 text-[10px] sm:text-xs font-mono font-black tracking-wide">
                              {item.percent}%
                            </span>
                          </div>
                        </div>

                        {/* Lower row: Custom Animated Progress Bar */}
                        <div className="w-full h-1 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.85, ease: "easeOut", delay: index * 0.08 }}
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-cyan-500 dark:to-blue-600 rounded-full relative"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                          </motion.div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* 2. WEAKNESSES (W) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 10px))" }}
              onClick={() => setSelectedSwot('W')}
              className={cn(
                "glass-card relative p-3.5 sm:p-5 md:p-6 border bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer",
                selectedSwot === 'W'
                  ? "border-orange-400 dark:border-amber-400 ring-4 ring-orange-500/15 dark:ring-amber-500/25 scale-[1.015] z-10 dark:shadow-[0_0_25px_rgba(245,158,11,0.35)]"
                  : "border-orange-200/40 dark:border-amber-500/10 opacity-60 saturate-[0.7] hover:opacity-95"
              )}
            >
              {/* Corner Letter W (Bottom Left) */}
              <div className="absolute bottom-2.5 left-3 sm:bottom-3.5 sm:left-4 z-0 select-none pointer-events-none flex items-center justify-center">
                <span className="font-mono font-black text-3xl sm:text-4xl md:text-5xl text-orange-500/20 dark:text-amber-400/25">
                  W
                </span>
              </div>

              <div className="relative z-10">
                {/* Quadrant Header */}
                <div className="flex items-center justify-between gap-2 sm:gap-3 border-b border-orange-100 dark:border-slate-800 pb-3 sm:pb-4 mb-3 sm:mb-4">
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm md:text-md lg:text-[15px] font-black text-orange-700 dark:text-amber-300 truncate font-play">
                      {isVi ? "7.2. HOÀN THIỆN: NÂNG CAO NĂNG LỰC QUẢN TRỊ" : "7.2. GROWTH: ELEVATING GOVERNANCE COMPETENCIES"}
                    </h3>
                  </div>
                  <TrendingDown className="w-5 h-5 sm:w-7 sm:h-7 text-orange-600 dark:text-amber-400 shrink-0" />
                </div>

                <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-none">
                  {isVi 
                    ? "Những khía cạnh cần liên tục hoàn thiện nhằm nâng tầm kỹ năng quản lý thực thi sang quản trị định hướng chiến lược."
                    : "Capabilities to continuously refine to elevate management from execution to strategic governance."}
                </p>

                {/* Skills Progress List with matching styling and animated bars */}
                <div className="flex flex-col gap-2.5 sm:gap-3.5">
                  {WEAKNESSES_DATA.map((item, index) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={index} className="flex flex-col gap-1.5 p-2 sm:p-2.5 rounded-xl border border-transparent hover:border-orange-100 dark:hover:border-amber-500/15 bg-transparent hover:bg-orange-50/20 dark:hover:bg-amber-500/5 shadow-none hover:shadow-2xs transition-all duration-300 group/item cursor-pointer">
                        <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">
                          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                            <div className="w-5.5 h-5.5 rounded-md bg-orange-500/5 dark:bg-amber-500/10 flex items-center justify-center shrink-0 group-hover/item:bg-orange-500/10 dark:group-hover/item:bg-amber-500/20 transition-colors">
                              <ItemIcon className="w-3.5 h-3.5 text-orange-600 dark:text-amber-400 shrink-0 group-hover/item:scale-110 transition-transform" />
                            </div>
                            <span className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 truncate group-hover/item:text-orange-600 dark:group-hover/item:text-amber-400 transition-colors">
                              {isVi ? item.labelVi : item.labelEn}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                            <span className="px-1.5 sm:px-2 py-0.5 rounded-[6px] bg-orange-500/10 text-orange-700 dark:text-amber-300 border border-orange-500/25 dark:border-amber-500/20 text-[10px] sm:text-xs font-mono font-black tracking-wide">
                              {item.percent}%
                            </span>
                          </div>
                        </div>

                        {/* Lower row: Custom Animated Progress Bar */}
                        <div className="w-full h-1 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.85, ease: "easeOut", delay: index * 0.08 }}
                            className="h-full bg-gradient-to-r from-orange-500 to-amber-600 dark:from-amber-500 dark:to-orange-600 rounded-full relative"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                          </motion.div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* 3. OPPORTUNITIES (O) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 10px))" }}
              onClick={() => setSelectedSwot('O')}
              className={cn(
                "glass-card relative p-3.5 sm:p-5 md:p-6 border bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer",
                selectedSwot === 'O'
                  ? "border-purple-400 dark:border-purple-500/50 ring-4 ring-purple-500/15 dark:ring-purple-500/25 scale-[1.015] z-10 dark:shadow-[0_0_25px_rgba(168,85,247,0.35)]"
                  : "border-purple-200/40 dark:border-purple-500/10 opacity-60 saturate-[0.7] hover:opacity-95"
              )}
            >
              {/* Corner Letter O (Top Right) */}
              <div className="absolute top-2.5 right-3 sm:top-3.5 sm:right-4 z-0 select-none pointer-events-none flex items-center justify-center">
                <span className="font-mono font-black text-3xl sm:text-4xl md:text-5xl text-purple-500/20 dark:text-purple-400/25">
                  O
                </span>
              </div>

              <div className="relative z-10">
                {/* Quadrant Header */}
                <div className="flex items-center gap-2 sm:gap-3 border-b border-purple-100 dark:border-slate-800 pb-3 sm:pb-4 mb-3 sm:mb-4">
                  <Rocket className="w-5 h-5 sm:w-7 sm:h-7 text-purple-600 dark:text-purple-400 shrink-0" />
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm md:text-md lg:text-[15px] font-black text-purple-700 dark:text-purple-300 truncate font-play">
                      {isVi ? "7.3. CƠ HỘI PHÁT TRIỂN: CÔNG NGHỆ & CHUYỂN ĐỔI DỊCH VỤ" : "7.3. OPPORTUNITIES: TECH & SERVICE TRANSFORMATION"}
                    </h3>
                  </div>
                </div>

                <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-none">
                  {isVi 
                    ? "Những cơ hội đón đầu làn sóng số, chuyển đổi dịch vụ sang kênh thông minh và ứng dụng AI nâng cao hiệu năng."
                    : "Excellent avenues to capture digital waves, automating workflows, and leveraging AI models."}
                </p>

                {/* Skills Progress List with consistent layouts and animated bars */}
                <div className="flex flex-col gap-2.5 sm:gap-3.5">
                  {OPPORTUNITIES_CARDS.slice(0, 5).map((item, index) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={index} className="flex flex-col gap-1.5 p-2 sm:p-2.5 rounded-xl border border-transparent hover:border-purple-100 dark:hover:border-purple-500/15 bg-transparent hover:bg-purple-50/20 dark:hover:bg-purple-500/5 shadow-none hover:shadow-2xs transition-all duration-300 group/item cursor-pointer">
                        <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">
                          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                            <div className="w-5.5 h-5.5 rounded-md bg-purple-500/5 dark:bg-purple-500/10 flex items-center justify-center shrink-0 group-hover/item:bg-purple-500/10 dark:group-hover/item:bg-purple-500/20 transition-colors">
                              <ItemIcon className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0 group-hover/item:scale-110 transition-transform" />
                            </div>
                            <span className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 truncate group-hover/item:text-purple-600 dark:group-hover/item:text-purple-300 transition-colors">
                              {isVi ? item.titleVi : item.titleEn}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                            <span className="px-1.5 sm:px-2 py-0.5 rounded-[6px] bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/25 dark:border-purple-500/20 text-[10px] sm:text-xs font-mono font-black tracking-wide">
                              {item.percent}%
                            </span>
                          </div>
                        </div>

                        {/* Lower row: Custom Animated Progress Bar */}
                        <div className="w-full h-1 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.85, ease: "easeOut", delay: index * 0.08 }}
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-500 dark:to-pink-600 rounded-full relative"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                          </motion.div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* 4. THREATS (T) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 10px))" }}
              onClick={() => setSelectedSwot('T')}
              className={cn(
                "glass-card relative p-3.5 sm:p-5 md:p-6 border bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer",
                selectedSwot === 'T'
                  ? "border-red-400 dark:border-red-500/50 ring-4 ring-red-500/15 dark:ring-red-500/25 scale-[1.015] z-10 dark:shadow-[0_0_25px_rgba(239,68,68,0.35)]"
                  : "border-red-200/40 dark:border-red-500/10 opacity-60 saturate-[0.7] hover:opacity-95"
              )}
            >
              {/* Corner Letter T (Top Left) */}
              <div className="absolute top-2.5 left-3 sm:top-3.5 sm:left-4 z-0 select-none pointer-events-none flex items-center justify-center">
                <span className="font-mono font-black text-3xl sm:text-4xl md:text-5xl text-red-500/20 dark:text-red-400/25">
                  T
                </span>
              </div>

              <div className="relative z-10">
                {/* Quadrant Header */}
                <div className="flex items-center justify-between gap-2 sm:gap-3 border-b border-red-100 dark:border-slate-800 pb-3 sm:pb-4 mb-3 sm:mb-4">
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm md:text-md lg:text-[15px] font-black text-red-700 dark:text-red-300 truncate font-play">
                      {isVi ? "7.4. THÁCH THỨC: THÍCH ỨNG & QUẢN TRỊ BIẾN ĐỘNG" : "7.4. THREATS: ADAPTATION & VOLATILITY MANAGEMENT"}
                    </h3>
                  </div>
                  <Target className="w-5 h-5 sm:w-7 sm:h-7 text-red-600 dark:text-red-400 shrink-0" />
                </div>

                <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-none">
                  {isVi 
                    ? "Những thách thức khách quan từ môi trường kinh tế và thay đổi công nghệ đột phá tác động trực tiếp đến dịch vụ."
                    : "Key external risks from volatile economy and rapid technical changes demanding persistent agility."}
                </p>

                {/* Skills Progress List with consistent layouts and animated bars */}
                <div className="flex flex-col gap-2.5 sm:gap-3.5">
                  {THREATS_CARDS.slice(0, 5).map((item, index) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={index} className="flex flex-col gap-1.5 p-2 sm:p-2.5 rounded-xl border border-transparent hover:border-red-100 dark:hover:border-red-500/15 bg-transparent hover:bg-red-50/20 dark:hover:bg-red-500/5 shadow-none hover:shadow-2xs transition-all duration-300 group/item cursor-pointer">
                        <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">
                          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                            <div className="w-5.5 h-5.5 rounded-md bg-red-500/5 dark:bg-red-500/10 flex items-center justify-center shrink-0 group-hover/item:bg-red-500/10 dark:group-hover/item:bg-red-500/20 transition-colors">
                              <ItemIcon className="w-3.5 h-3.5 text-red-600 dark:text-red-400 shrink-0 group-hover/item:scale-110 transition-transform" />
                            </div>
                            <span className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 truncate group-hover/item:text-red-600 dark:group-hover/item:text-red-300 transition-colors">
                              {isVi ? item.titleVi : item.titleEn}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                            <span className="px-1.5 sm:px-2 py-0.5 rounded-[6px] bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/25 dark:border-red-500/20 text-[10px] sm:text-xs font-mono font-black tracking-wide">
                              {item.percent}%
                            </span>
                          </div>
                        </div>

                        {/* Lower row: Custom Animated Progress Bar */}
                        <div className="w-full h-1 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.85, ease: "easeOut", delay: index * 0.08 }}
                            className="h-full bg-gradient-to-r from-red-500 to-rose-600 dark:from-red-500 dark:to-rose-600 rounded-full relative"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                          </motion.div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* LANGUAGES SECTION: 7.5. NĂNG LỰC NGÔN NGỮ                                  */}
        {/* ========================================================================= */}
        <div 
          style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 10px))" }}
          className="glass-card w-full p-6 border border-slate-200/90 dark:border-cyan-500/30 bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl mt-4 select-none flex flex-col gap-5 shadow-xs dark:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300"
        >
          <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Globe className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
            <h3 className="font-black text-base text-slate-900 dark:text-white tracking-tight uppercase">
              {isVi ? "7.5. Năng lực ngôn ngữ" : "7.5. Language proficiency"}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            
            {/* Vietnamese Indicator: 90% */}
            <div className="flex items-center gap-4 p-4 rounded-[8px] bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-200 dark:text-slate-700 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-blue-500 dark:text-cyan-400 stroke-current animate-pulse" strokeWidth="3" strokeDasharray="90, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="absolute text-xs font-mono font-black text-slate-900 dark:text-white">90%</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-black text-sm text-slate-900 dark:text-white leading-tight">
                  {isVi ? "Tiếng Việt" : "Vietnamese"}
                </h4>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-0.5">
                  {isVi ? "Ngôn ngữ bản xứ" : "Native language"}
                </span>
                <span className="text-xs font-extrabold text-blue-700 dark:text-cyan-400 mt-1 leading-tight">
                  {isVi ? "Thành thạo chuyên sâu" : "Native / Expert fluency"}
                </span>
              </div>
            </div>

            {/* English Indicator: 60% */}
            <div className="flex items-center gap-4 p-4 rounded-[8px] bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-200 dark:text-slate-700 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-purple-500 stroke-current animate-pulse" strokeWidth="3" strokeDasharray="60, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="absolute text-xs font-mono font-black text-slate-900 dark:text-white">60%</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-black text-sm text-slate-900 dark:text-white leading-tight">
                  {isVi ? "Tiếng Anh" : "English"}
                </h4>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-0.5">
                  {isVi ? "Giao tiếp chuyên nghiệp" : "Professional communication"}
                </span>
                <span className="text-xs font-extrabold text-purple-700 dark:text-purple-400 mt-1 leading-tight">
                  {isVi ? "Làm việc môi trường quốc tế" : "Working in global environments"}
                </span>
              </div>
            </div>

            {/* AI-powered Multi-Language: 85% */}
            <div className="flex items-center gap-4 p-4 rounded-[8px] bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-200 dark:text-slate-700 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-emerald-500 stroke-current animate-pulse" strokeWidth="3" strokeDasharray="85, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="absolute text-xs font-mono font-black text-slate-900 dark:text-white">85%</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-black text-sm text-slate-900 dark:text-white leading-tight uppercase truncate">
                  {isVi ? "Ứng dụng AI" : "AI application"}
                </h4>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-0.5">
                  {isVi ? "Hỗ trợ trao đổi & hợp tác đa quốc gia" : "Assisting multi-national collaboration"}
                </span>
                <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 mt-1 leading-tight">
                  {isVi ? "Dịch thuật & Trợ lý thời gian thực" : "Real-time translation & AI assistant"}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Skills;
