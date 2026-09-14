import React from "react";
import { motion } from "motion/react";
import {
  Database,
  BarChart3,
  Workflow,
  UserCheck,
  Users,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Send,
  X,
  Minimize2,
  CheckCircle2,
  Award,
  Globe,
  Bot,
  Cpu,
  FolderKanban,
  Target,
  TrendingUp,
  Zap,
  MessageSquare,
  BadgeDollarSign,
  Monitor,
  Languages,
  ShieldAlert,
  PieChart,
  Rocket
} from "lucide-react";

interface ExpandedCardProps {
  isVi: boolean;
  onClose: () => void;
  onContact: () => void;
}

// 1. EXPANDED VIEW - CARD S (Điểm Mạnh)
export function ExpandedCardStrengths({ isVi, onClose, onContact }: ExpandedCardProps) {
  const competencies = [
    {
      icon: HeartHandshake,
      title: isVi ? "Customer-Centric & CX" : "Customer-Centric & CX Leadership",
      percent: 98,
      desc: isVi 
        ? "Lắng nghe tiếng nói khách hàng (Voice of Customer), thấu cảm các điểm chạm đau (pain-points) và biến khiếu nại thành cơ hội gắn kết lâu dài."
        : "Leveraged Voice of Customer (VoC) analytics to turn customer friction points into loyalty moments."
    },
    {
      icon: Database,
      title: isVi ? "CRM & Contact Center" : "CRM & Contact Center Systems",
      percent: 96,
      desc: isVi 
        ? "Vận hành và tối ưu hóa Salesforce Service Cloud, Zendesk, Genesys Cloud, Asterisk/FreePBX. Quản trị dữ liệu khách hàng 360 độ và điều phối luồng cuộc gọi thông minh."
        : "Operational mastery in Salesforce, Zendesk, Genesys, and Asterisk PBX with unified 360-degree customer profiling."
    },
    {
      icon: BarChart3,
      title: isVi ? "Quản trị Hiệu suất" : "Performance Governance & Analytics",
      percent: 96,
      desc: isVi 
        ? "Thiết lập hệ thống báo cáo thời gian thực, đo lường toàn diện các chỉ số CSAT, FCR, NPS, AHT, SLA và Churn Rate bằng SQL, Power BI và Python."
        : "Real-time dashboard architectures measuring CSAT, FCR, NPS, AHT, and retention rates via SQL, Power BI and Python."
    },
    {
      icon: Users,
      title: isVi ? "Lãnh đạo & Đội ngũ" : "Team Leadership & Talent Coaching",
      percent: 95,
      desc: isVi 
        ? "Trực tiếp tuyển dụng, huấn luyện và truyền cảm hứng cho 100+ nhân sự. Xây dựng lộ trình thăng tiến minh bạch, giữ tỷ lệ thôi việc dưới 15%."
        : "Coached 100+ personnel, designed career tracks, and maintained an attrition rate well below 15%."
    },
    {
      icon: Workflow,
      title: isVi ? "SOP & Chuẩn hóa" : "SOP & Service Standardization",
      percent: 95,
      desc: isVi 
        ? "Soạn thảo và ban hành hơn 50+ bộ SOPs vận hành, khung kiểm soát chất lượng (QA/QC) và kịch bản xử lý khiếu nại phức tạp đa cấp độ."
        : "Authored 50+ enterprise SOPs, quality assurance frameworks, and multi-tier escalation protocols."
    },
    {
      icon: ShieldCheck,
      title: isVi ? "Xử lý Khủng hoảng" : "Crisis Management & Resolution",
      percent: 94,
      desc: isVi 
        ? "Xử lý thành công các khủng hoảng vận hành, lỗi hệ thống diện rộng và khiếu nại khách hàng VIP với tỷ lệ giải quyết thành công đạt 98%."
        : "Successfully mitigated operational outages and critical VIP escalations with a 98% resolution rate."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full skills-glass-swot-blue rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-xl border border-blue-400/80 dark:border-blue-500/80 flex flex-col justify-between"
    >
      {/* Quadrant identifier badge */}
      <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full bg-gradient-to-br from-blue-500/30 to-blue-600/60 border-b border-l border-blue-400/80 flex items-center justify-center pl-3 pb-3 text-blue-900 dark:text-blue-100 font-black text-xl select-none">
        <span>S</span>
      </div>

      <div>
        {/* Compact Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-blue-200/80 dark:border-blue-800/80 mb-3 pr-14">
          <div className="flex flex-wrap items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500 text-white shadow-xs shrink-0">
              <Database className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-400 tracking-wide">
              {isVi ? "Điểm Mạnh (S - Strengths)" : "Strengths (S)"}
            </h2>
            <span className="text-2xs font-black px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700 shadow-2xs">
              91% {isVi ? "Năng lực" : "Capacity"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <button
              type="button"
              onClick={onContact}
              className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-2xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer active:scale-95"
            >
              <Send className="w-3 h-3" />
              <span>{isVi ? "Liên hệ" : "Contact"}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-rose-500 hover:text-white transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1 text-2xs font-bold px-2.5"
              title={isVi ? "Thu nhỏ (ESC)" : "Collapse (ESC)"}
            >
              <X className="w-3.5 h-3.5" />
              <span>{isVi ? "Thu nhỏ" : "Close"}</span>
            </button>
          </div>
        </div>

        {/* Competencies 2-Column Grid */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
            {competencies.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="p-2.5 sm:p-3 rounded-xl skills-glass-card border-blue-200/70 dark:border-blue-500/30 flex flex-col justify-between space-y-1.5 transition-all hover:bg-white/95 dark:hover:bg-slate-800/95 shadow-2xs">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 shrink-0">
                        <IconComp className="w-4 h-4" />
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        {item.title}
                      </h4>
                    </div>
                    <span className="text-2xs font-mono font-black px-2 py-0.5 rounded bg-blue-500/15 text-blue-800 dark:text-blue-200 shrink-0">
                      {item.percent}%
                    </span>
                  </div>

                  <p className="text-body-sm text-slate-600 dark:text-slate-300">
                    {item.desc}
                  </p>

                  <div className="w-full h-1 bg-blue-100/80 dark:bg-slate-800/80 rounded-full overflow-hidden mt-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percent}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.04 }}
                      className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Compact Bottom Row: KPIs + Tech Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 pt-1">
            {/* KPI Stat Cards (4 cols) */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-blue-200/50 dark:border-blue-700/50 text-center">
                <div className="text-sm font-black text-blue-600 dark:text-blue-400">92%+</div>
                <div className="text-3xs font-bold text-slate-700 dark:text-slate-300">CSAT TB</div>
              </div>
              <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-blue-200/50 dark:border-blue-700/50 text-center">
                <div className="text-sm font-black text-blue-600 dark:text-blue-400">88%+</div>
                <div className="text-3xs font-bold text-slate-700 dark:text-slate-300">FCR Lần Đầu</div>
              </div>
              <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-blue-200/50 dark:border-blue-700/50 text-center">
                <div className="text-sm font-black text-blue-600 dark:text-blue-400">+24%</div>
                <div className="text-3xs font-bold text-slate-700 dark:text-slate-300">Duy Trì KH</div>
              </div>
              <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-blue-200/50 dark:border-blue-700/50 text-center">
                <div className="text-sm font-black text-blue-600 dark:text-blue-400">&lt;15%</div>
                <div className="text-3xs font-bold text-slate-700 dark:text-slate-300">Thôi Việc</div>
              </div>
            </div>

            {/* Tech Stack Chips (6 cols) */}
            <div className="lg:col-span-6 p-2 rounded-xl skills-glass-card border-blue-200/70 dark:border-blue-500/30 flex items-center flex-wrap gap-1.5 text-2xs">
              <span className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1 shrink-0 mr-1">
                <Cpu className="w-3 h-3 text-blue-500" />
                <span>Tech Stack:</span>
              </span>
              {["Salesforce", "Genesys", "Zendesk", "Asterisk", "Power BI", "SQL/Python", "Looker", "Dify AI"].map((tool, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800/80 font-semibold text-blue-800 dark:text-blue-200">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Controls */}
      <div className="pt-2.5 mt-2.5 border-t border-blue-200/80 dark:border-blue-800/80 flex flex-wrap items-center justify-between gap-2 text-2xs">
        <div className="flex flex-wrap gap-1 font-semibold text-blue-800 dark:text-blue-300">
          <span className="px-2 py-0.5 rounded-md bg-blue-100/70 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800">QuanTriCRM</span>
          <span className="px-2 py-0.5 rounded-md bg-blue-100/70 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800">DuLieuKhachHang</span>
          <span className="px-2 py-0.5 rounded-md bg-blue-100/70 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800">TraiNghiemCX</span>
          <span className="px-2 py-0.5 rounded-md bg-blue-100/70 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800">LanhDaoDoiNgu</span>
        </div>
      </div>
    </motion.div>
  );
}

// 2. EXPANDED VIEW - CARD O (Cơ hội phát triển)
export function ExpandedCardOpportunities({ isVi, onClose, onContact }: ExpandedCardProps) {
  const pillars = [
    {
      icon: Bot,
      title: isVi ? "AI & Tự động hóa" : "AI & Workflow Automation",
      percent: 94,
      desc: isVi 
        ? "Triển khai GenAI Agents hỗ trợ tóm tắt cuộc gọi, phân loại ticket tự động và soạn câu trả lời chuẩn xác trong 3 giây."
        : "Deploy GenAI copilots to summarize calls, route tickets, and suggest instant accurate responses."
    },
    {
      icon: Sparkles,
      title: isVi ? "Cải tiến liên tục" : "Kaizen & Continuous Improvement",
      percent: 94,
      desc: isVi 
        ? "Áp dụng triết lý Kaizen trong cải tiến quy trình dịch vụ, loại bỏ lãng phí và liên tục nâng cao trải nghiệm khách hàng."
        : "Applying Kaizen methodologies to streamline service workflows and minimize operational waste."
    },
    {
      icon: BadgeDollarSign,
      title: isVi ? "Tối ưu Chi phí" : "OPEX Optimization & Efficiency",
      percent: 93,
      desc: isVi 
        ? "Tối ưu hóa ngân sách vận hành CSKH bằng mô hình chuyển đổi số và công nghệ tự động hóa tinh gọn."
        : "Optimizing CSKH operating budgets via digital transformation and lean automation models."
    },
    {
      icon: Monitor,
      title: isVi ? "Chuyển đổi Số" : "Digital Transformation & Cloud CX",
      percent: 92,
      desc: isVi 
        ? "Chuyển dịch hạ tầng tổng đài truyền thống sang Cloud Contact Center linh hoạt, đáp ứng xu hướng làm việc đa kênh."
        : "Migrating legacy call center infrastructure to agile Cloud Contact Center solutions."
    },
    {
      icon: BarChart3,
      title: isVi ? "Quản trị Dữ liệu" : "CX Data Governance & VoC Analytics",
      percent: 91,
      desc: isVi 
        ? "Xây dựng hệ thống quản trị dữ liệu trải nghiệm khách hàng 360 độ và phân tích VoC thời gian thực."
        : "Building 360-degree customer experience data governance and real-time VoC analytics."
    },
    {
      icon: Workflow,
      title: isVi ? "Thiết kế Hệ thống" : "Service Architecture & System Design",
      percent: 87,
      desc: isVi 
        ? "Thiết kế kiến trúc hệ thống dịch vụ đa điểm chạm, bảo đảm khả năng mở rộng linh hoạt theo quy mô doanh nghiệp."
        : "Architecting multi-touchpoint service systems built for enterprise scalability."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full skills-glass-swot-purple rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-xl border border-purple-400/80 dark:border-purple-500/80 flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full bg-gradient-to-br from-purple-500/30 to-purple-600/60 border-b border-l border-purple-400/80 flex items-center justify-center pl-3 pb-3 text-purple-900 dark:text-purple-100 font-black text-xl select-none">
        <span>O</span>
      </div>

      <div>
        {/* Compact Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-purple-200/80 dark:border-purple-800/80 mb-3 pr-14">
          <div className="flex flex-wrap items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-600 text-white shadow-xs shrink-0">
              <Rocket className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-black text-purple-600 dark:text-purple-400 tracking-wide">
              {isVi ? "Cơ hội phát triển (O - Opportunities)" : "Growth Opportunities (O)"}
            </h2>
            <span className="text-2xs font-black px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-200 border border-purple-300 dark:border-purple-700 shadow-2xs">
              91% {isVi ? "Tiềm năng" : "Potential"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <button
              type="button"
              onClick={onContact}
              className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-2xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer active:scale-95"
            >
              <Send className="w-3 h-3" />
              <span>{isVi ? "Liên hệ" : "Contact"}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-rose-500 hover:text-white transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1 text-2xs font-bold px-2.5"
              title={isVi ? "Thu nhỏ (ESC)" : "Collapse (ESC)"}
            >
              <X className="w-3.5 h-3.5" />
              <span>{isVi ? "Thu nhỏ" : "Close"}</span>
            </button>
          </div>
        </div>

        {/* 4 Pillars Compact 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {pillars.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="p-2.5 sm:p-3 rounded-xl skills-glass-card border-purple-200/70 dark:border-purple-500/30 flex flex-col justify-between space-y-1.5 transition-all hover:bg-white/95 dark:hover:bg-slate-800/95 shadow-2xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 shrink-0">
                      <IconComp className="w-4 h-4" />
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {item.title}
                    </h4>
                  </div>
                  <span className="text-2xs font-mono font-black px-2 py-0.5 rounded bg-purple-500/15 text-purple-800 dark:text-purple-200 shrink-0">
                    {item.percent}%
                  </span>
                </div>

                <p className="text-body-sm text-slate-600 dark:text-slate-300">
                  {item.desc}
                </p>

                <div className="w-full h-1 bg-purple-100/80 dark:bg-slate-800/80 rounded-full overflow-hidden mt-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ duration: 1, delay: 0.1 + idx * 0.1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 4-Stage Compact Roadmap Banner */}
        <div className="mt-2.5 p-2.5 rounded-xl skills-glass-card border-purple-200/80 dark:border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-transparent">
          <h4 className="text-2xs font-black text-purple-900 dark:text-purple-200 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>{isVi ? "Lộ trình triển khai 4 giai đoạn" : "4-Phase Transformation Roadmap"}</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-center text-2xs">
            <div className="p-1.5 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-purple-200/50 dark:border-purple-800/50">
              <div className="font-bold text-purple-700 dark:text-purple-300">P1: Thử Nghiệm AI</div>
              <div className="text-3xs text-slate-500 dark:text-slate-400">PoC 30 ngày</div>
            </div>
            <div className="p-1.5 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-purple-200/50 dark:border-purple-800/50">
              <div className="font-bold text-purple-700 dark:text-purple-300">P2: Tích Hợp Đa Kênh</div>
              <div className="text-3xs text-slate-500 dark:text-slate-400">Hotline, Zalo, App</div>
            </div>
            <div className="p-1.5 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-purple-200/50 dark:border-purple-800/50">
              <div className="font-bold text-purple-700 dark:text-purple-300">P3: VoC &amp; Data AI</div>
              <div className="text-3xs text-slate-500 dark:text-slate-400">Real-time Alert</div>
            </div>
            <div className="p-1.5 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-purple-200/50 dark:border-purple-800/50">
              <div className="font-bold text-purple-700 dark:text-purple-300">P4: Chuẩn Hóa Cấp Tập Đoàn</div>
              <div className="text-3xs text-slate-500 dark:text-slate-400">Nhân rộng quy mô</div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2.5 mt-2.5 border-t border-purple-200/80 dark:border-purple-800/80 flex flex-wrap items-center justify-between gap-2 text-2xs">
        <div className="flex flex-wrap gap-1 font-semibold text-purple-800 dark:text-purple-300">
          <span className="px-2 py-0.5 rounded-md bg-purple-100/70 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800">TriTueNhanTao</span>
          <span className="px-2 py-0.5 rounded-md bg-purple-100/70 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800">ChienLuocCX</span>
          <span className="px-2 py-0.5 rounded-md bg-purple-100/70 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800">QuanTriDuLieu</span>
          <span className="px-2 py-0.5 rounded-md bg-purple-100/70 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800">ChuyenDoiSo</span>
        </div>
      </div>
    </motion.div>
  );
}

// 3. EXPANDED VIEW - CARD W (Hoàn Thiện)
export function ExpandedCardWeaknesses({ isVi, onClose, onContact }: ExpandedCardProps) {
  const growthAreas = [
    {
      icon: HeartHandshake,
      label: isVi ? "Service Mindset" : "Service Mindset & Customer Empathy",
      percent: 92,
      target: 98,
      desc: isVi ? "Nâng tầm văn hóa phục vụ từ giải quyết vấn đề sang chủ động tạo giá trị cảm xúc cho khách hàng." : "Elevating service culture from problem solving to proactive emotional value creation."
    },
    {
      icon: MessageSquare,
      label: isVi ? "Giao tiếp & Đàm phán" : "Executive Communication & Negotiation",
      percent: 90,
      target: 95,
      desc: isVi ? "Rèn giũa kỹ năng thương thuyết với các đối tác lớn và đàm phán giải quyết khiếu nại cấp cao." : "Sharpening high-stakes negotiations and C-level escalation resolution."
    },
    {
      icon: Target,
      label: isVi ? "Tư duy Chiến lược" : "Strategic Thinking & Governance",
      percent: 88,
      target: 95,
      desc: isVi ? "Nâng cao năng lực gắn kết mục tiêu CX với chiến lược tăng trưởng doanh thu và lợi nhuận cấp tập đoàn." : "Aligning CX roadmaps directly with corporate P&L and revenue growth strategies."
    },
    {
      icon: FolderKanban,
      label: isVi ? "Quản trị Dự án" : "Project Management & Execution",
      percent: 88,
      target: 95,
      desc: isVi ? "Chuẩn hóa phương pháp quản trị dự án theo chuẩn Agile/Scrum và kiểm soát tiến độ chuyển đổi số." : "Standardizing project management according to Agile/Scrum and digital transformation practices."
    },
    {
      icon: Cpu,
      label: isVi ? "Công nghệ & Đổi mới" : "Technology & Innovation Adoption",
      percent: 86,
      target: 95,
      desc: isVi ? "Cập nhật và tích hợp liên tục các công nghệ mới như GenAI, Cloud Native và tự động hóa quy trình." : "Continuous integration of emerging technologies like GenAI, Cloud Native, and workflow automation."
    },
    {
      icon: Monitor,
      label: isVi ? "Thiết kế & Lập trình" : "Design & Software Engineering",
      percent: 78,
      target: 90,
      desc: isVi ? "Phát triển năng lực lập trình và thiết kế giao diện ứng dụng web/mobile phục vụ quản trị dịch vụ." : "Building coding and UI design capabilities for custom service management applications."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full skills-glass-swot-amber rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-xl border border-amber-400/80 dark:border-amber-500/80 flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full bg-gradient-to-br from-amber-500/30 to-amber-600/60 border-b border-l border-amber-400/80 flex items-center justify-center pl-3 pb-3 text-amber-900 dark:text-amber-100 font-black text-xl select-none">
        <span>W</span>
      </div>

      <div>
        {/* Compact Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-amber-200/80 dark:border-amber-800/80 mb-3 pr-14">
          <div className="flex flex-wrap items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500 text-white shadow-xs shrink-0">
              <Target className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-black text-amber-600 dark:text-amber-400 tracking-wide">
              {isVi ? "Hoàn Thiện (W - Growth Areas)" : "Growth Areas (W)"}
            </h2>
            <span className="text-2xs font-black px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700 shadow-2xs">
              84% {isVi ? "Mục tiêu" : "Target"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <button
              type="button"
              onClick={onContact}
              className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-2xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer active:scale-95"
            >
              <Send className="w-3 h-3" />
              <span>{isVi ? "Liên hệ" : "Contact"}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-rose-500 hover:text-white transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1 text-2xs font-bold px-2.5"
              title={isVi ? "Thu nhỏ (ESC)" : "Collapse (ESC)"}
            >
              <X className="w-3.5 h-3.5" />
              <span>{isVi ? "Thu nhỏ" : "Close"}</span>
            </button>
          </div>
        </div>

        {/* Growth Areas 2-Column Grid */}
        <div className="space-y-2.5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
            {growthAreas.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="p-2.5 sm:p-3 rounded-xl skills-glass-card border-amber-200/70 dark:border-amber-500/30 flex flex-col justify-between space-y-1.5 transition-all hover:bg-white/95 dark:hover:bg-slate-800/95 shadow-2xs">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 shrink-0">
                        <IconComp className="w-4 h-4" />
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        {item.label}
                      </h4>
                    </div>
                    <span className="text-3xs font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-200 shrink-0">
                      {item.percent}% → {item.target}%
                    </span>
                  </div>

                  <p className="text-body-sm text-slate-600 dark:text-slate-300">
                    {item.desc}
                  </p>

                  <div className="w-full h-1 bg-amber-100/80 dark:bg-slate-800/80 rounded-full overflow-hidden mt-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percent}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.04 }}
                      className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Upskilling Plan Strip */}
          <div className="p-2 rounded-xl skills-glass-card border-amber-200/80 dark:border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent flex items-center flex-wrap gap-2 text-2xs">
            <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1 shrink-0 mr-1">
              <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{isVi ? "Kế hoạch nâng cấp:" : "Upskilling Plan:"}</span>
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-800/80 border border-amber-200/50 dark:border-amber-700/50 font-medium text-slate-800 dark:text-slate-200">
                PMP &amp; ITIL 4
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-800/80 border border-amber-200/50 dark:border-amber-700/50 font-medium text-slate-800 dark:text-slate-200">
                AI Architecture
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-800/80 border border-amber-200/50 dark:border-amber-700/50 font-medium text-slate-800 dark:text-slate-200">
                Executive Negotiation
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="pt-2.5 mt-2.5 border-t border-amber-200/80 dark:border-amber-800/80 flex flex-wrap items-center justify-between gap-2 text-2xs">
        <div className="flex flex-wrap gap-1 font-semibold text-amber-800 dark:text-amber-300">
          <span className="px-2 py-0.5 rounded-md bg-amber-100/70 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800">TuDuyChienLuoc</span>
          <span className="px-2 py-0.5 rounded-md bg-amber-100/70 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800">TuDongHoa</span>
          <span className="px-2 py-0.5 rounded-md bg-amber-100/70 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800">QuanTriDuAn</span>
          <span className="px-2 py-0.5 rounded-md bg-amber-100/70 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800">HocHoiKhongNgung</span>
        </div>
      </div>
    </motion.div>
  );
}

// 4. EXPANDED VIEW - CARD T (Thách thức & Rủi ro)
export function ExpandedCardThreats({ isVi, onClose, onContact }: ExpandedCardProps) {
  const threats = [
    {
      icon: BadgeDollarSign,
      title: isVi ? "Tối ưu Chi phí" : "OPEX Optimization Pressures",
      impact: 94,
      risk: isVi 
        ? "Kinh tế biến động đòi hỏi thắt chặt ngân sách và nâng cao hiệu suất trên từng chi phí bỏ ra." 
        : "Macroeconomic pressures demand tight budget controls and maximized cost efficiency.",
      mitigation: isVi 
        ? "Chuẩn hóa quy trình tinh gọn (Lean CX) và tự động hóa thông minh giúp tối ưu ngân sách." 
        : "Deploying Lean CX principles and intelligent automation to optimize budget allocation."
    },
    {
      icon: Cpu,
      title: isVi ? "AI & Thay đổi CSKH" : "AI Disruption in CSKH",
      impact: 92,
      risk: isVi 
        ? "Sự bùng nổ của AI thay thế các tác vụ lặp lại, đòi hỏi nhân sự và hệ thống phải liên tục thích ứng." 
        : "Rapid AI proliferation replacing repetitive tasks, demanding fast organizational adaptation.",
      mitigation: isVi 
        ? "Đào tạo nâng chuẩn nhân sự thành Chuyên viên tư vấn trải nghiệm (CX Specialist) cao cấp." 
        : "Upskilling workforce into high-touch CX specialists handling complex emotional cases."
    },
    {
      icon: BarChart3,
      title: isVi ? "Công nghệ Đổi mới" : "Rapid Technological Obsolescence",
      impact: 90,
      risk: isVi 
        ? "Các nền tảng CRM, AI và Cloud tiến hóa nhanh chóng, nguy cơ tụt hậu nếu không nâng cấp kịp thời." 
        : "Fast-evolving CRM and AI stacks risking technology lag without timely updates.",
      mitigation: isVi 
        ? "Xây dựng kiến trúc mô-đun linh hoạt (Composable Architecture) và thử nghiệm công nghệ định kỳ." 
        : "Building agile modular architectures and running regular technology validation pilots."
    },
    {
      icon: ShieldAlert,
      title: isVi ? "Quản trị Rủi ro" : "Operational Risk Governance",
      impact: 90,
      risk: isVi 
        ? "Rủi ro gián đoạn dịch vụ, sự cố bảo mật dữ liệu và biến động vận hành không lường trước." 
        : "Service downtime risks, data security vulnerabilities, and unforeseen operational disruptions.",
      mitigation: isVi 
        ? "Thiết lập kế hoạch liên tục kinh doanh (BCP) và các kịch bản ứng phó sự cố khẩn cấp." 
        : "Establishing robust Business Continuity Plans (BCP) and emergency response playbooks."
    },
    {
      icon: Users,
      title: isVi ? "Cạnh tranh Nhân sự" : "Talent Competition & Retention",
      impact: 88,
      risk: isVi 
        ? "Cạnh tranh thu hút nhân sự quản lý và chuyên gia CSKH chất lượng cao ngày càng gay gắt." 
        : "Heightened competition for top-tier CSKH operational leaders and specialists.",
      mitigation: isVi 
        ? "Xây dựng văn hóa làm việc minh bạch, chính sách đãi ngộ linh hoạt và lộ trình thăng tiến rõ ràng." 
        : "Cultivating transparent workplace culture, flexible benefits, and clear promotion pathways."
    },
    {
      icon: Workflow,
      title: isVi ? "Phối hợp Liên phòng" : "Cross-Departmental Alignment",
      impact: 86,
      risk: isVi 
        ? "Rào cản giao tiếp và thiếu đồng bộ quy trình giữa CSKH với Product, Marketing và Operations." 
        : "Siloed communication and misaligned SLAs between CSKH, Product, Marketing, and Operations.",
      mitigation: isVi 
        ? "Chuẩn hóa SLA liên phòng ban và thiết lập cơ chế phản hồi thông tin hai chiều thời gian thực." 
        : "Standardizing inter-departmental SLAs and establishing real-time feedback loops."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full skills-glass-swot-rose rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-xl border border-rose-400/80 dark:border-rose-500/80 flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full bg-gradient-to-br from-rose-500/30 to-rose-600/60 border-b border-l border-rose-400/80 flex items-center justify-center pl-3 pb-3 text-rose-900 dark:text-rose-100 font-black text-xl select-none">
        <span>T</span>
      </div>

      <div>
        {/* Compact Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-rose-200/80 dark:border-rose-800/80 mb-3 pr-14">
          <div className="flex flex-wrap items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-600 text-white shadow-xs shrink-0">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-black text-rose-600 dark:text-rose-400 tracking-wide">
              {isVi ? "Thách Thức (T - External Risks)" : "Challenges (T)"}
            </h2>
            <span className="text-2xs font-black px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-700 shadow-2xs">
              86% {isVi ? "Tác động" : "Impact"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <button
              type="button"
              onClick={onContact}
              className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-2xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer active:scale-95"
            >
              <Send className="w-3 h-3" />
              <span>{isVi ? "Liên hệ" : "Contact"}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-rose-500 hover:text-white transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1 text-2xs font-bold px-2.5"
              title={isVi ? "Thu nhỏ (ESC)" : "Collapse (ESC)"}
            >
              <X className="w-3.5 h-3.5" />
              <span>{isVi ? "Thu nhỏ" : "Close"}</span>
            </button>
          </div>
        </div>

        {/* Threats 4-Column / 2-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
          {threats.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="p-2.5 rounded-xl skills-glass-card border-rose-200/70 dark:border-rose-500/30 space-y-2 transition-all hover:bg-white/95 dark:hover:bg-slate-800/95 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 shrink-0">
                        <IconComp className="w-3.5 h-3.5" />
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        {item.title}
                      </h4>
                    </div>
                    <span className="text-3xs font-mono font-black px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-800 dark:text-rose-200 shrink-0">
                      {item.impact}%
                    </span>
                  </div>

                  <div className="space-y-1.5 text-2xs">
                    <div className="p-1.5 rounded-lg bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/50 dark:border-rose-800/50">
                      <span className="font-black text-rose-800 dark:text-rose-300 block mb-0.5 text-3xs">
                        {isVi ? "⚠️ Rủi ro:" : "⚠️ Risk:"}
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-snug line-clamp-2">{item.risk}</p>
                    </div>

                    <div className="p-1.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/50">
                      <span className="font-black text-emerald-800 dark:text-emerald-300 block mb-0.5 text-3xs">
                        {isVi ? "🛡️ Giải pháp:" : "🛡️ Solution:"}
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-snug line-clamp-2">{item.mitigation}</p>
                    </div>
                  </div>
                </div>

                <div className="w-full h-1 bg-rose-100/80 dark:bg-slate-800/80 rounded-full overflow-hidden mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.impact}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.08 }}
                    className="h-full bg-gradient-to-r from-rose-500 to-pink-600 rounded-full"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2.5 mt-2.5 border-t border-rose-200/80 dark:border-rose-800/80 flex flex-wrap items-center justify-between gap-2 text-2xs">
        <div className="flex flex-wrap gap-1 font-semibold text-rose-800 dark:text-rose-300">
          <span className="px-2 py-0.5 rounded-md bg-rose-100/70 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800">TacDongAI</span>
          <span className="px-2 py-0.5 rounded-md bg-rose-100/70 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800">BienDongCongNghe</span>
          <span className="px-2 py-0.5 rounded-md bg-rose-100/70 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800">CanhTranhNhanSu</span>
          <span className="px-2 py-0.5 rounded-md bg-rose-100/70 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800">ToiUuChiPhi</span>
        </div>
      </div>
    </motion.div>
  );
}

// 5. EXPANDED VIEW - CARD LANGUAGES (Ngôn ngữ & Toàn cầu)
export function ExpandedCardLanguages({ isVi, onClose, onContact }: ExpandedCardProps) {
  const languagePillars = [
    {
      title: "Tiếng Việt",
      subtitle: isVi ? "Ngôn ngữ bản xứ (Native)" : "Native Proficiency",
      percent: 90,
      icon: Languages,
      color: "rose",
      desc: isVi 
        ? "Diễn đạt lưu loát, truyền cảm hứng và tự tin thuyết trình trước đám đông 100+ nhân sự. Kỹ năng soạn thảo văn bản quy phạm, SOPs, kịch bản dịch vụ và tài liệu đào tạo chuyên sâu."
        : "Native fluency with exceptional oration, public speaking, and authorship of enterprise operating policies."
    },
    {
      title: "Tiếng Anh",
      subtitle: isVi ? "Giao tiếp & Làm việc chuyên nghiệp (Intermediate / B1-B2)" : "Professional Working Proficiency",
      percent: 60,
      icon: Globe,
      color: "sky",
      desc: isVi 
        ? "Làm việc độc lập và phối hợp nhịp nhàng trong môi trường quốc tế. Đọc hiểu tài liệu kỹ thuật chuyên sâu (Salesforce, Genesys), trao đổi email và báo cáo công việc tự tin."
        : "Fluent business communication, technical documentation mastery, and executive reporting with foreign counterparts."
    },
    {
      title: isVi ? "Ứng dụng AI Đa Ngôn Ngữ" : "Real-Time Multilingual AI Systems",
      subtitle: isVi ? "Trợ lý phiên dịch & đàm thoại thời gian thực" : "Live Translation & Global Copilots",
      percent: 85,
      icon: Bot,
      color: "emerald",
      desc: isVi 
        ? "Tích hợp công nghệ dịch thuật thời gian thực và LLM prompt engineering hỗ trợ giao tiếp với khách hàng đa quốc gia (Nhật, Hàn, Trung). Hỗ trợ tóm tắt biên bản họp và dịch văn bản chuẩn xác."
        : "Leveraging LLM translation APIs and voice synthesis to facilitate real-time multilingual customer interactions."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full skills-glass-card rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-xl border border-emerald-400/80 dark:border-emerald-500/80 flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full bg-gradient-to-br from-emerald-500/30 to-emerald-600/60 border-b border-l border-emerald-400/80 flex items-center justify-center pl-3 pb-3 text-emerald-900 dark:text-emerald-100 font-black text-xl select-none">
        <Globe className="w-6 h-6" />
      </div>

      <div>
        {/* Compact Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-emerald-200/80 dark:border-emerald-800/80 mb-3 pr-14">
          <div className="flex flex-wrap items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-600 text-white shadow-xs shrink-0">
              <Globe className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400 tracking-wide">
              {isVi ? "Năng lực ngôn ngữ & Giao tiếp quốc tế" : "International Language & AI Proficiency"}
            </h2>
            <span className="text-2xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 shadow-2xs">
              {isVi ? "3 Trụ cột" : "3 Pillars"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <button
              type="button"
              onClick={onContact}
              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-2xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer active:scale-95"
            >
              <Send className="w-3 h-3" />
              <span>{isVi ? "Liên hệ" : "Contact"}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-rose-500 hover:text-white transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1 text-2xs font-bold px-2.5"
              title={isVi ? "Thu nhỏ (ESC)" : "Collapse (ESC)"}
            >
              <X className="w-3.5 h-3.5" />
              <span>{isVi ? "Thu nhỏ" : "Close"}</span>
            </button>
          </div>
        </div>

        {/* 3 Language Pillars Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {languagePillars.map((item, idx) => {
            const IconComp = item.icon;
            const isRose = item.color === "rose";
            const isSky = item.color === "sky";

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl skills-glass-card space-y-2 transition-all hover:bg-white/95 dark:hover:bg-slate-800/95 shadow-2xs flex flex-col justify-between ${
                  isRose
                    ? "border-rose-200/70 dark:border-rose-500/30"
                    : isSky
                    ? "border-sky-200/70 dark:border-sky-500/30"
                    : "border-emerald-200/70 dark:border-emerald-500/30"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`p-1 rounded-md shrink-0 ${
                          isRose
                            ? "bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300"
                            : isSky
                            ? "bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300"
                            : "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300"
                        }`}
                      >
                        <IconComp className="w-3.5 h-3.5" />
                      </span>
                      <div className="min-w-0">
                        <h4
                          className={`text-xs font-black truncate ${
                            isRose
                              ? "text-rose-700 dark:text-rose-300"
                              : isSky
                              ? "text-sky-700 dark:text-sky-300"
                              : "text-slate-900 dark:text-white"
                          }`}
                        >
                          {item.title}
                        </h4>
                        <p className="text-3xs text-slate-500 dark:text-slate-400 truncate">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-2xs font-mono font-black px-1.5 py-0.5 rounded shrink-0 ${
                        isRose
                          ? "bg-rose-500/15 text-rose-800 dark:text-rose-200"
                          : isSky
                          ? "bg-sky-500/15 text-sky-800 dark:text-sky-200"
                          : "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200"
                      }`}
                    >
                      {item.percent}%
                    </span>
                  </div>

                  <p className="text-caption text-slate-600 dark:text-slate-300 line-clamp-3">
                    {item.desc}
                  </p>
                </div>

                <div className="w-full h-1 bg-slate-100/80 dark:bg-slate-800/80 rounded-full overflow-hidden mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className={`h-full rounded-full bg-gradient-to-r ${
                      isRose
                        ? "from-rose-500 to-red-600"
                        : isSky
                        ? "from-sky-500 to-blue-600"
                        : "from-emerald-500 to-teal-500"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2.5 mt-2.5 border-t border-emerald-200/80 dark:border-emerald-800/80 flex flex-wrap items-center justify-between gap-2 text-2xs">
        <div className="flex flex-wrap gap-1 font-semibold text-emerald-800 dark:text-emerald-300">
          <span className="px-2 py-0.5 rounded-md bg-emerald-100/70 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800">TiengVietBanXu</span>
          <span className="px-2 py-0.5 rounded-md bg-emerald-100/70 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800">TiengAnhChuyenNghiep</span>
          <span className="px-2 py-0.5 rounded-md bg-emerald-100/70 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800">PhiendichAI</span>
          <span className="px-2 py-0.5 rounded-md bg-emerald-100/70 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800">HoiNhapToanCau</span>
        </div>
      </div>
    </motion.div>
  );
}
