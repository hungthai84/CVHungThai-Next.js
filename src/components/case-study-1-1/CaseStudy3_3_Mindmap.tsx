import React from "react";
import { 
  Layers, 
  Workflow, 
  Bot, 
  MessageSquare, 
  PhoneCall, 
  Mail, 
  Globe, 
  Smartphone, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Headphones, 
  Share2, 
  Cpu
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";

export function CaseStudy3_3_Mindmap({ 
  jumpToSection, 
  project 
}: { 
  jumpToSection: (id: string) => void; 
  project: ProjectCard;
}) {
  return (
    <section className="glass-base p-6 sm:p-10 rounded-3xl space-y-8 relative overflow-hidden bg-gradient-to-b from-white/90 via-emerald-50/30 to-white/80 dark:from-slate-900/90 dark:via-emerald-950/20 dark:to-slate-900/80 border border-emerald-200/80 dark:border-emerald-800/60 shadow-2xl backdrop-blur-xl">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />      {/* Header section of Mindmap - format chuẩn giống 01 · Tổng quan dự án */}
      <div className="flex items-center space-x-3 border-b border-sky-200/80 dark:border-sky-800/80 pb-3.5 sm:pb-4">
        <h2 className="text-h6 font-bold text-sky-600 dark:text-sky-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <span>00</span>
          <span className="text-sky-400 dark:text-sky-500 font-normal">·</span>
          <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400 shrink-0 inline-block" />
          <span>Sơ đồ tư duy chiến lược Omnichannel & Automation</span>
        </h2>
      </div>

      {/* Central Interactive Mindmap Layout */}
      <div className="relative py-6">
        {/* SVG Connector Lines */}
        <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="omni-grad-blue" x1="50%" y1="50%" x2="20%" y2="20%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="omni-grad-purple" x1="50%" y1="50%" x2="80%" y2="20%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="omni-grad-emerald" x1="50%" y1="50%" x2="20%" y2="80%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="omni-grad-amber" x1="50%" y1="50%" x2="80%" y2="80%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path d="M 50% 50% Q 35% 35% 25% 25%" stroke="url(#omni-grad-blue)" strokeWidth="3" fill="none" />
          <path d="M 50% 50% Q 65% 35% 75% 25%" stroke="url(#omni-grad-purple)" strokeWidth="3" fill="none" />
          <path d="M 50% 50% Q 35% 65% 25% 75%" stroke="url(#omni-grad-emerald)" strokeWidth="3" fill="none" />
          <path d="M 50% 50% Q 65% 65% 75% 75%" stroke="url(#omni-grad-amber)" strokeWidth="3" fill="none" />
        </svg>

        {/* Central Core Hub */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="group relative cursor-pointer" onClick={() => jumpToSection("sec-05")}>
            <div className="w-64 sm:w-72 p-5 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 text-white shadow-xl shadow-emerald-500/30 border-2 border-white/40 dark:border-emerald-400/30 text-center transition-all duration-300 transform group-hover:scale-105">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                <Share2 className="w-7 h-7 text-white animate-pulse" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-emerald-900/40 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-white/20">
                Nền Tảng Hợp Nhất Đa Điểm Chạm
              </span>
              <h3 className="text-xl font-black text-white">OMNICHANNEL</h3>
              <p className="text-xs text-emerald-100 mt-1 font-medium">&amp; Tự Động Hóa Vận Hành</p>
              
              <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-emerald-100 group-hover:text-white">
                <span>Khám phá Mô phỏng</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
          {/* Branch 1: Omnichannel Hub */}
          <div 
            onClick={() => jumpToSection("sec-04")} 
            className="group cursor-pointer rounded-2xl p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 border border-blue-200 dark:border-blue-800/60 shadow-lg hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    1
                  </div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Hệ Thống Giao Tiếp Hợp Nhất
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  Omnichannel Hub
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Khách hàng có thể chuyển đổi giữa các kênh mà không bị mất ngữ cảnh hay phải lặp lại thông tin đã cung cấp.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs mb-3">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">Voice CTI &amp; IVR</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">Live Chat Widget</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-purple-500" />
                  <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">Email to Ticket</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5 text-sky-500" />
                  <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">Zalo OA &amp; FB</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-2 col-span-2 sm:col-span-2">
                  <Globe className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">Self-service Help Center</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500 dark:text-slate-400">
                Tính năng: Unified Inbox • Cross-channel ID • Seamless Handoff
              </span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                Chi tiết <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>

          {/* Branch 2: Smart Automation */}
          <div 
            onClick={() => jumpToSection("sec-05")} 
            className="group cursor-pointer rounded-2xl p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 border border-purple-200 dark:border-purple-800/60 shadow-lg hover:shadow-xl hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    2
                  </div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    Tự Động Hóa Vận Hành
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                  Smart Workflow
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Tự động hóa các tác vụ lặp lại, quy trình phê duyệt phức tạp và điều phối công việc thông minh.
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start gap-2">
                  <Workflow className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Skill-based Routing:</span>
                    <p className="text-[11px] text-slate-500">Phân luồng ticket thông minh theo chuyên môn, ngôn ngữ và hạn mức VIP.</p>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start gap-2">
                  <Zap className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">SLA Escalation Engine:</span>
                    <p className="text-[11px] text-slate-500">Tự động leo thang cảnh báo khi ticket gần chạm ngưỡng vi phạm thời gian cam kết.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500 dark:text-slate-400">
                Hiệu quả: Giảm 40% thao tác thủ công của Agent
              </span>
              <span className="text-purple-600 dark:text-purple-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                Chi tiết <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>

          {/* Branch 3: AI Chatbot & Virtual Assistant */}
          <div 
            onClick={() => jumpToSection("sec-05")} 
            className="group cursor-pointer rounded-2xl p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 border border-emerald-200 dark:border-emerald-800/60 shadow-lg hover:shadow-xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    3
                  </div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Chatbot &amp; Trợ Lý AI
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  AI-Powered 24/7
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Hỗ trợ 24/7, tự giải quyết các yêu cầu phổ biến và trợ giúp nhân viên tóm tắt nội dung hội thoại tức thì.
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <Bot className="w-3.5 h-3.5 text-emerald-500" /> Tự Phục Vụ
                  </span>
                  <p className="text-[10px] text-slate-500">Tra cứu đơn hàng, đổi mật khẩu, FAQ</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Agent Co-pilot
                  </span>
                  <p className="text-[10px] text-slate-500">Gợi ý câu trả lời &amp; Tóm tắt ticket</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500 dark:text-slate-400">
                Tỷ lệ giải quyết tự động: 45% tổng volume
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                Chi tiết <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>

          {/* Branch 4: Results & Business Impact */}
          <div 
            onClick={() => jumpToSection("sec-08")} 
            className="group cursor-pointer rounded-2xl p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 border border-amber-200 dark:border-amber-800/60 shadow-lg hover:shadow-xl hover:border-amber-400 dark:hover:border-amber-500 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    4
                  </div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Kết Quả &amp; Giá Trị Mang Lại
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                  Business ROI
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                Tối ưu hóa chi phí vận hành, loại bỏ điểm nghẽn và đưa sự hài lòng của khách hàng lên tầm cao mới.
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Thời gian phản hồi đầu (FRT)</span>
                  <strong className="text-h6 text-emerald-600">-60% Thời gian</strong>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Điểm hài lòng CSAT</span>
                  <strong className="text-h6 text-amber-600">4.7 / 5.0 ⭐</strong>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500 dark:text-slate-400">
                100% Kênh hợp nhất • 24/7 Phục vụ liên tục
              </span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                Chi tiết <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>
        </div>

        {/* 5 Core Pillars Banner */}
        <div className="mt-8 pt-6 border-t border-emerald-100 dark:border-emerald-900/50 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center">
          <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/40">
            <Layers className="w-4 h-4 mx-auto text-blue-600 dark:text-blue-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Trải Nghiệm Nhất Quán</p>
            <span className="text-[10px] text-slate-500">Mọi điểm chạm</span>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/40">
            <Clock className="w-4 h-4 mx-auto text-purple-600 dark:text-purple-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Phản Hồi Tức Thì</p>
            <span className="text-[10px] text-slate-500">FRT &lt; 30 giây</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40">
            <TrendingUp className="w-4 h-4 mx-auto text-emerald-600 dark:text-emerald-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Tăng Năng Suất +40%</p>
            <span className="text-[10px] text-slate-500">Giảm tải thủ công</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40">
            <Bot className="w-4 h-4 mx-auto text-amber-600 dark:text-amber-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Tự Phục Vụ 45%</p>
            <span className="text-[10px] text-slate-500">Bot &amp; Self-service</span>
          </div>
          <div className="p-2.5 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800/40 col-span-2 sm:col-span-1">
            <Sparkles className="w-4 h-4 mx-auto text-teal-600 dark:text-teal-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Quy Mô Không Giới Hạn</p>
            <span className="text-[10px] text-slate-500">Scale 24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
}
