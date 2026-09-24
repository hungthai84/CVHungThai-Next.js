import React, { useState } from "react";
import { useLanguage } from "../i18n";
import { motion, AnimatePresence } from "motion/react";
import { 
  Target, 
  TrendingUp, 
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
  Briefcase, 
  Trophy, 
  Quote,
  ChevronRight,
  Brain
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/utils";
import { PageCardHeader } from "./PageCardHeader";

// Strengths (S) - 95% down to 90%
const STRENGTHS_DATA = [
  { labelVi: "Kiến thức sâu về CRM", labelEn: "Deep CRM Expertise", percent: 95 },
  { labelVi: "Phân tích dữ liệu khách hàng", labelEn: "Customer Data Analytics", percent: 90 },
  { labelVi: "Xây dựng quy trình dịch vụ", labelEn: "Service Process Design", percent: 90 },
  { labelVi: "Tư duy lấy khách hàng làm trung tâm", labelEn: "Customer-Centric Mindset", percent: 90 },
  { labelVi: "Lãnh đạo & Phát triển đội ngũ", labelEn: "Leadership & Team Development", percent: 90 },
  { labelVi: "Giải quyết vấn đề", labelEn: "Complex Problem Solving", percent: 90 },
  { labelVi: "Trải nghiệm khách hàng (CX)", labelEn: "Customer Experience (CX)", percent: 90 }
];

// Weaknesses (W) - 80% and 85%
const WEAKNESSES_DATA = [
  { labelVi: "Tư duy chiến lược & Tầm nhìn dài hạn", labelEn: "Strategic Thinking & Vision", percent: 80 },
  { labelVi: "Quản lý dự án", labelEn: "Project Management", percent: 80 },
  { labelVi: "Thiết kế & Lập trình Web (Responsive)", labelEn: "Responsive Web Design & Coding", percent: 85 },
  { labelVi: "Tự động hóa", labelEn: "Automation Systems", percent: 85 },
  { labelVi: "Quản lý hiệu suất (KPIs, OKRs)", labelEn: "Performance Management (KPIs)", percent: 85 },
  { labelVi: "Giao tiếp", labelEn: "Advanced Communication", percent: 85 },
  { labelVi: "Giải quyết khiếu nại", labelEn: "Complex Escalation Resolution", percent: 85 },
  { labelVi: "Xây dựng văn hóa dịch vụ nội bộ", labelEn: "Internal Service Culture Building", percent: 85 },
  { labelVi: "Quản lý rủi ro dịch vụ", labelEn: "Service Risk Management", percent: 85 },
  { labelVi: "Thích ứng với công nghệ", labelEn: "Rapid Technology Adaptation", percent: 85 }
];

// Opportunities (O) Cards
const OPPORTUNITIES_CARDS = [
  {
    titleVi: "AI & Automation",
    titleEn: "AI & Automation",
    descVi: "Ứng dụng AI, Chatbot, RPA và Automation để tối ưu vận hành & trải nghiệm.",
    descEn: "Implementing AI, Chatbots, RPA and automation tools to streamline workflows & CX.",
    icon: Bot,
    color: "from-purple-500/10 to-indigo-500/5 text-purple-600 dark:text-purple-400 border-purple-500/20"
  },
  {
    titleVi: "CX Strategy & Transformation",
    titleEn: "CX Strategy & Transformation",
    descVi: "Dẫn dắt chiến lược CX, nâng cao trải nghiệm khách hàng toàn diện.",
    descEn: "Pioneering strategic CX updates and full customer satisfaction pipelines.",
    icon: Sparkles,
    color: "from-pink-500/10 to-purple-500/5 text-pink-600 dark:text-pink-400 border-pink-500/20"
  },
  {
    titleVi: "Data-driven CX Management",
    titleEn: "Data-driven CX Management",
    descVi: "Khai thác dữ liệu, đo lường & cá nhân hóa trải nghiệm khách hàng.",
    descEn: "Harnessing diagnostic business intelligence to customize touchpoints.",
    icon: Database,
    color: "from-blue-500/10 to-cyan-500/5 text-blue-600 dark:text-blue-400 border-blue-500/20"
  },
  {
    titleVi: "Digital Transformation",
    titleEn: "Digital Transformation",
    descVi: "Thúc đẩy chuyển đổi số, CRM, self-service và hệ sinh thái số.",
    descEn: "Propelling digital ecosystem deployment and advanced CRM systems.",
    icon: Monitor,
    color: "from-indigo-500/10 to-blue-500/5 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
  }
];

// Threats (T) Cards
const THREATS_CARDS = [
  {
    titleVi: "AI thay đổi ngành CSKH",
    titleEn: "AI Shifting Customer Care",
    descVi: "AI & Automation thay thế nhiều nghiệp vụ, yêu cầu nâng cấp năng lực liên tục.",
    descEn: "AI taking over repetitive tasks, requiring ongoing skill upgrades.",
    icon: Bot,
    color: "from-red-500/10 to-orange-500/5 text-red-600 dark:text-red-400 border-red-500/20"
  },
  {
    titleVi: "Công nghệ thay đổi nhanh",
    titleEn: "Rapid Tech Disruption",
    descVi: "CRM, AI, Data, Automation kiến tạo luật chơi mới, đòi hỏi học hỏi & thích ứng nhanh.",
    descEn: "Rapidly evolving technologies demanding continuous adaptive learning.",
    icon: Cpu,
    color: "from-rose-500/10 to-pink-500/5 text-rose-600 dark:text-rose-400 border-rose-500/20"
  },
  {
    titleVi: "Cạnh tranh nhân sự",
    titleEn: "Talent Competition",
    descVi: "Yêu cầu phối hợp đa kỹ năng: Business + Process + Tech + Leadership ngày càng cao.",
    descEn: "Increasing demand for cross-functional skills: Business, Tech and Leadership.",
    icon: Users,
    color: "from-orange-500/10 to-amber-500/5 text-orange-600 dark:text-orange-400 border-orange-500/20"
  },
  {
    titleVi: "Áp lực tối ưu chi phí",
    titleEn: "Cost Optimization Pressures",
    descVi: "Doanh nghiệp yêu cầu hiệu quả cao hơn với chi phí thấp hơn.",
    descEn: "Demands for higher operational efficiency at lower cost overheads.",
    icon: Coins,
    color: "from-amber-500/10 to-yellow-500/5 text-amber-600 dark:text-amber-400 border-amber-500/20"
  }
];

export function Skills() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  return (
    <section
      id="skills"
      className="relative w-full min-h-full flex flex-col justify-start items-center p-3 xs:p-4 sm:p-6 lg:p-8 font-sans text-slate-900 dark:text-slate-100 transition-all duration-300"
    >
      <div className="w-full flex flex-col gap-6 max-w-7xl">
        {/* Page Header */}
        <PageCardHeader pageId="skills">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-caption font-bold font-mono tracking-wider uppercase text-blue-600 dark:text-sky-400">
              {isVi ? "PHÂN TÍCH SWOT CÁ NHÂN" : "PERSONAL SWOT ANALYSIS"}
            </span>
          </div>
        </PageCardHeader>

        {/* Big Title exactly from Kỹ năng.png */}
        <div className="text-center w-full my-4 flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight select-none flex items-center gap-2">
            <span className="text-slate-800 dark:text-slate-100">PERSONAL</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">SWOT</span>
          </h2>
          <p className="text-base sm:text-lg font-extrabold text-blue-600 dark:text-sky-400 tracking-wider uppercase text-center mt-2 px-4">
            {isVi ? "NĂNG LỰC & ĐỊNH HƯỚNG NGHỀ NGHIỆP" : "COMPETENCY & CAREER ORIENTATION"}
          </p>
          <div className="w-16 h-1 bg-blue-600 dark:bg-sky-400 rounded-full mt-4" />
        </div>

        {/* Value Bullet Row from Kỹ năng.png */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-4 mt-2 select-none backdrop-blur-md">
          <div className="flex items-center gap-3 justify-center md:justify-start px-4">
            <div className="p-2.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-sky-400 shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
              {isVi ? "Đánh giá năng lực hiện tại" : "Current Competency Assessment"}
            </span>
          </div>
          <div className="flex items-center gap-3 justify-center border-y md:border-y-0 md:border-x border-slate-200 dark:border-slate-800 py-3 md:py-0 px-4">
            <div className="p-2.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
              {isVi ? "Xác định cơ hội phát triển" : "Strategic Development Focus"}
            </span>
          </div>
          <div className="flex items-center gap-3 justify-center md:justify-end px-4">
            <div className="p-2.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
              <Rocket className="w-5 h-5 animate-pulse" />
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
              {isVi ? "Chủ động thích ứng & bứt phá" : "Rapid Adaptation & Innovation"}
            </span>
          </div>
        </div>

        {/* 4-Quadrant SWOT Grid Wrapper */}
        <div className="relative w-full mt-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8 items-stretch relative">
            
            {/* Left Column: Strengths (S) & Weaknesses (W) */}
            <div className="flex flex-col gap-6 xl:gap-8">
              
              {/* STRENGTHS (S) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-3xl p-6 md:p-8 border border-blue-100 dark:border-blue-900/50 bg-gradient-to-b from-blue-500/[0.03] to-transparent dark:from-blue-500/[0.01] bg-white/70 dark:bg-slate-950/40 backdrop-blur-xl shadow-xs hover:shadow-md hover:scale-[1.005] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Quadrant Header */}
                  <div className="flex items-center gap-4 border-b border-blue-500/10 pb-4 mb-4">
                    <div className="w-12 h-12 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm shrink-0">
                      <Gem className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xs font-mono font-bold tracking-wider text-slate-400">STRENGTHS</h3>
                      <h4 className="text-lg font-black text-blue-600 dark:text-sky-400">
                        {isVi ? "NĂNG LỰC CỐT LÕI" : "CORE COMPETENCIES"}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    {isVi 
                      ? "Những năng lực cốt lõi đã được rèn luyện và chứng minh qua thực tiễn quản lý & vận hành."
                      : "Core capabilities validated through extensive management and operations practice."}
                  </p>

                  {/* Skills Progress List */}
                  <div className="flex flex-col gap-4">
                    {STRENGTHS_DATA.map((item, index) => (
                      <div key={index} className="flex items-center justify-between gap-4 group/item">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 truncate group-hover/item:text-blue-600 dark:group-hover/item:text-sky-400 transition-colors">
                            {isVi ? item.labelVi : item.labelEn}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-sky-400 text-3xs font-black tracking-wide">
                            {item.percent}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tags */}
                <div className="flex flex-wrap items-center gap-2 mt-8 pt-4 border-t border-blue-500/10">
                  {["#CRM", "#CustomerData", "#CX", "#Leadership"].map((tag, i) => (
                    <span key={i} className="text-3xs font-extrabold tracking-wider px-2 py-1 rounded-md bg-blue-500/5 text-blue-600/80 dark:text-sky-400/80 border border-blue-500/10 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* WEAKNESSES (W) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="relative rounded-3xl p-6 md:p-8 border border-orange-100 dark:border-orange-900/50 bg-gradient-to-b from-orange-500/[0.03] to-transparent dark:from-orange-500/[0.01] bg-white/70 dark:bg-slate-950/40 backdrop-blur-xl shadow-xs hover:shadow-md hover:scale-[1.005] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Quadrant Header */}
                  <div className="flex items-center gap-4 border-b border-orange-500/10 pb-4 mb-4">
                    <div className="w-12 h-12 rounded-full border border-orange-500/30 bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400 shadow-sm shrink-0">
                      <TrendingDown className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xs font-mono font-bold tracking-wider text-slate-400">WEAKNESSES</h3>
                      <h4 className="text-lg font-black text-orange-600 dark:text-amber-500">
                        {isVi ? "ĐIỂM CẦN PHÁT TRIỂN" : "AREAS FOR GROWTH"}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    {isVi 
                      ? "Những năng lực cần tiếp tục nâng cao để đạt đến cấp độ chuyên gia và đáp ứng yêu cầu tương lai."
                      : "Competencies to further upgrade for future leadership demands."}
                  </p>

                  {/* Skills Progress List */}
                  <div className="flex flex-col gap-4">
                    {WEAKNESSES_DATA.map((item, index) => (
                      <div key={index} className="flex items-center justify-between gap-4 group/item">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                          <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 truncate group-hover/item:text-orange-600 dark:group-hover/item:text-amber-500 transition-colors">
                            {isVi ? item.labelVi : item.labelEn}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-600 dark:text-amber-400 text-3xs font-black tracking-wide">
                            {item.percent}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tags */}
                <div className="flex flex-wrap items-center gap-2 mt-8 pt-4 border-t border-orange-500/10">
                  {["#AI", "#Automation", "#Project", "#ProjectManagement", "#GrowthMindset"].map((tag, i) => (
                    <span key={i} className="text-3xs font-extrabold tracking-wider px-2 py-1 rounded-md bg-orange-500/5 text-orange-600/80 dark:text-amber-500/80 border border-orange-500/10 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* Right Column: Opportunities (O) & Threats (T) */}
            <div className="flex flex-col gap-6 xl:gap-8">
              
              {/* OPPORTUNITIES (O) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="relative rounded-3xl p-6 md:p-8 border border-purple-100 dark:border-purple-900/50 bg-gradient-to-b from-purple-500/[0.03] to-transparent dark:from-purple-500/[0.01] bg-white/70 dark:bg-slate-950/40 backdrop-blur-xl shadow-xs hover:shadow-md hover:scale-[1.005] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Quadrant Header */}
                  <div className="flex items-center gap-4 border-b border-purple-500/10 pb-4 mb-4">
                    <div className="w-12 h-12 rounded-full border border-purple-500/30 bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-sm shrink-0">
                      <Rocket className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xs font-mono font-bold tracking-wider text-slate-400">OPPORTUNITIES</h3>
                      <h4 className="text-lg font-black text-purple-600 dark:text-purple-400">
                        {isVi ? "CƠ HỘI PHÁT TRIỂN" : "MARKET OPPORTUNITIES"}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    {isVi 
                      ? "Xu hướng công nghệ & nhu cầu thị trường mở ra nhiều cơ hội để tạo bứt phá và nâng tầm sự nghiệp."
                      : "Evolving technological trends and market demands opening strategic career vectors."}
                  </p>

                  {/* 4 Cards Layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {OPPORTUNITIES_CARDS.map((card, index) => {
                      const CardIcon = card.icon;
                      return (
                        <div
                          key={index}
                          className={cn(
                            "p-4 rounded-2xl border bg-gradient-to-b flex flex-col gap-2 hover:shadow-xs hover:scale-[1.01] transition-all duration-300 select-none",
                            card.color
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <CardIcon className="w-5 h-5 shrink-0" />
                            <h5 className="text-xs sm:text-sm font-black tracking-tight leading-tight">
                              {isVi ? card.titleVi : card.titleEn}
                            </h5>
                          </div>
                          <p className="text-3xs sm:text-2xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                            {isVi ? card.descVi : card.descEn}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Tags */}
                <div className="flex flex-wrap items-center gap-2 mt-8 pt-4 border-t border-purple-500/10">
                  {["#AI", "#CXStrategy", "#DataDriven", "#DigitalTransformation", "#Growth"].map((tag, i) => (
                    <span key={i} className="text-3xs font-extrabold tracking-wider px-2 py-1 rounded-md bg-purple-500/5 text-purple-600/80 dark:text-purple-400/80 border border-purple-500/10 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* THREATS (T) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="relative rounded-3xl p-6 md:p-8 border border-red-100 dark:border-red-900/50 bg-gradient-to-b from-red-500/[0.03] to-transparent dark:from-red-500/[0.01] bg-white/70 dark:bg-slate-950/40 backdrop-blur-xl shadow-xs hover:shadow-md hover:scale-[1.005] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Quadrant Header */}
                  <div className="flex items-center gap-4 border-b border-red-500/10 pb-4 mb-4">
                    <div className="w-12 h-12 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-400 shadow-sm shrink-0">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xs font-mono font-bold tracking-wider text-slate-400">THREATS</h3>
                      <h4 className="text-lg font-black text-red-600 dark:text-red-400">
                        {isVi ? "THÁCH THỨC & RỦI RO" : "THREATS & RISKS"}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    {isVi 
                      ? "Những yếu tố bên ngoài có thể ảnh hưởng đến hiệu quả công việc và lộ trình phát triển."
                      : "External factors and systemic market changes capable of impacting strategic roadmaps."}
                  </p>

                  {/* 4 Cards Layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {THREATS_CARDS.map((card, index) => {
                      const CardIcon = card.icon;
                      return (
                        <div
                          key={index}
                          className={cn(
                            "p-4 rounded-2xl border bg-gradient-to-b flex flex-col gap-2 hover:shadow-xs hover:scale-[1.01] transition-all duration-300 select-none",
                            card.color
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <CardIcon className="w-5 h-5 shrink-0" />
                            <h5 className="text-xs sm:text-sm font-black tracking-tight leading-tight">
                              {isVi ? card.titleVi : card.titleEn}
                            </h5>
                          </div>
                          <p className="text-3xs sm:text-2xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                            {isVi ? card.descVi : card.descEn}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Tags */}
                <div className="flex flex-wrap items-center gap-2 mt-8 pt-4 border-t border-red-500/10">
                  {["#AIImpact", "#TechnologyChange", "#Competition", "#CostOptimization"].map((tag, i) => (
                    <span key={i} className="text-3xs font-extrabold tracking-wider px-2 py-1 rounded-md bg-red-500/5 text-red-600/80 dark:text-red-400/80 border border-red-500/10 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

            </div>

          </div>

          {/* Centered S-W-O-T Ring (Only visible on xl screens exactly at the central intersection) */}
          <div className="hidden xl:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 select-none">
            <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-2xl p-1.5 grid grid-cols-2 grid-rows-2 text-center group hover:scale-105 transition-all duration-500 bg-white/95 backdrop-blur-md">
              {/* S */}
              <div className="flex items-center justify-center font-black text-xl text-blue-600 dark:text-blue-400 bg-blue-500/5 rounded-tl-full border-r border-b border-slate-100 dark:border-slate-800">
                S
              </div>
              {/* O */}
              <div className="flex items-center justify-center font-black text-xl text-purple-600 dark:text-purple-400 bg-purple-500/5 rounded-tr-full border-l border-b border-slate-100 dark:border-slate-800">
                O
              </div>
              {/* W */}
              <div className="flex items-center justify-center font-black text-xl text-orange-600 dark:text-orange-400 bg-orange-500/5 rounded-bl-full border-r border-t border-slate-100 dark:border-slate-800">
                W
              </div>
              {/* T */}
              <div className="flex items-center justify-center font-black text-xl text-red-600 dark:text-red-400 bg-red-500/5 rounded-br-full border-l border-t border-slate-100 dark:border-slate-800">
                T
              </div>
            </div>
          </div>
        </div>

        {/* General Stats / Core KPI Row from Kỹ năng.png */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full bg-white/60 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 mt-6 backdrop-blur-md select-none">
          {/* Donut Capacity Chart 88% */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-100 dark:text-slate-800 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-blue-600 dark:text-sky-400 stroke-current animate-pulse" strokeWidth="3" strokeDasharray="88, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="absolute text-xs font-mono font-black text-slate-800 dark:text-slate-200">88%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xs font-extrabold text-slate-400 tracking-wider uppercase">
                {isVi ? "TỔNG QUAN NĂNG LỰC" : "COMPETENCY OVERVIEW"}
              </span>
              <span className="text-base font-black text-slate-800 dark:text-white mt-0.5 leading-tight">88%</span>
              <span className="text-3xs text-slate-500 dark:text-slate-400 leading-normal">
                {isVi ? "Mức độ thành thạo trung bình" : "Average professional competency"}
              </span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-blue-500/10 shadow-inner">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black text-slate-800 dark:text-white leading-tight">20+</span>
              <span className="text-3xs text-slate-500 dark:text-slate-400 leading-normal">
                {isVi ? "Năm kinh nghiệm" : "Years of experience"}
              </span>
              <span className="text-3xs text-slate-400 leading-normal">
                {isVi ? "Quản lý & vận hành CSKH" : "CSKH Management & operations"}
              </span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/10 shadow-inner">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black text-slate-800 dark:text-white leading-tight">100+</span>
              <span className="text-3xs text-slate-500 dark:text-slate-400 leading-normal">
                {isVi ? "Đội ngũ quản lý" : "Strategic management team"}
              </span>
              <span className="text-3xs text-slate-400 leading-normal">
                {isVi ? "Nhân sự trực tiếp" : "Direct operation agents"}
              </span>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/10 shadow-inner">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black text-emerald-600 dark:text-emerald-400 leading-tight">
                {isVi ? "CX xuất sắc" : "Exceptional CX"}
              </span>
              <span className="text-3xs text-slate-500 dark:text-slate-400 leading-normal">
                {isVi ? "Cam kết giá trị" : "Committed executive values"}
              </span>
              <span className="text-3xs text-slate-400 leading-normal">
                {isVi ? "Kết quả bền vững" : "Sustainable results"}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Languages Section exactly from Kỹ năng.png */}
        <div className="w-full rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-950/40 backdrop-blur-md mt-6 select-none flex flex-col gap-6">
          <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800/60 pb-3">
            <Globe className="w-5 h-5 text-blue-600 dark:text-sky-400" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight uppercase">
              {isVi ? "NGÔN NGỮ" : "LANGUAGES"}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Vietnamese Indicator */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100/50 dark:border-slate-900/40">
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-100 dark:text-slate-800 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-blue-500 stroke-current animate-pulse" strokeWidth="3" strokeDasharray="100, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="absolute text-3xs font-mono font-black text-slate-800 dark:text-slate-200">100%</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-black text-sm text-slate-900 dark:text-white leading-tight">
                  {isVi ? "TIẾNG VIỆT" : "VIETNAMESE"}
                </h4>
                <span className="text-3xs text-slate-400 font-medium leading-relaxed mt-0.5">
                  {isVi ? "(Ngôn ngữ mẹ đẻ)" : "(Mother tongue)"}
                </span>
                <span className="text-2xs font-extrabold text-blue-600 dark:text-sky-400 mt-1 leading-tight">
                  {isVi ? "Thành thạo tuyệt đối" : "Native fluency"}
                </span>
              </div>
            </div>

            {/* English Indicator */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100/50 dark:border-slate-900/40">
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-100 dark:text-slate-800 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-purple-500 stroke-current animate-pulse" strokeWidth="3" strokeDasharray="90, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="absolute text-3xs font-mono font-black text-slate-800 dark:text-slate-200">90%</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-black text-sm text-slate-900 dark:text-white leading-tight">
                  {isVi ? "TIẾNG ANH" : "ENGLISH"}
                </h4>
                <span className="text-3xs text-slate-400 font-medium leading-relaxed mt-0.5">
                  (English)
                </span>
                <span className="text-2xs font-extrabold text-purple-600 dark:text-purple-400 mt-1 leading-tight">
                  {isVi ? "Giao tiếp & Làm việc chuyên nghiệp" : "Professional business proficiency"}
                </span>
              </div>
            </div>

            {/* AI-powered Multi-Language */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100/50 dark:border-slate-900/40">
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-100 dark:text-slate-800 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-emerald-500 stroke-current animate-pulse" strokeWidth="3" strokeDasharray="85, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="absolute text-3xs font-mono font-black text-slate-800 dark:text-slate-200">85%</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-black text-sm text-slate-900 dark:text-white leading-tight uppercase truncate">
                  {isVi ? "DÙNG AI TRAO ĐỔI ĐA NGÔN NGỮ & HỢP TÁC" : "AI-POWERED COMMUNICATION"}
                </h4>
                <span className="text-3xs text-slate-400 font-medium leading-relaxed mt-0.5">
                  (AI-powered Communication)
                </span>
                <span className="text-2xs font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 leading-tight">
                  {isVi ? "Sử dụng AI hỗ trợ trao đổi đa ngôn ngữ & hợp tác quốc tế" : "Leveraging AI models for cross-border integration"}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Elegant Quote Block */}
        <div className="w-full rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900/40 dark:to-indigo-950/20 border border-indigo-100 dark:border-indigo-950/60 p-6 flex items-center gap-4 mt-4 relative overflow-hidden select-none">
          <div className="p-3.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
            <Quote className="w-6 h-6 rotate-180" />
          </div>
          <p className="text-sm sm:text-base font-extrabold italic text-slate-800 dark:text-slate-200 leading-relaxed pr-8">
            {isVi 
              ? "Kỹ năng là nền tảng để hành động hiệu quả, trải nghiệm là chìa khóa để tạo ra giá trị khác biệt."
              : "Skills serve as the bedrock for executive execution; curated experiences are the keys that unlock absolute unique value."}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Skills;
