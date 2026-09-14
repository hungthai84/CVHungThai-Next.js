import React from "react";
import { 
  LineChart, 
  BarChart3, 
  PieChart, 
  Activity, 
  Clock, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Database, 
  Filter, 
  Eye, 
  Award, 
  Sliders, 
  Mail, 
  MessageSquare, 
  PhoneCall, 
  AlertTriangle,
  FileSpreadsheet
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";

export function CaseStudy3_2_Mindmap({ 
  jumpToSection, 
  project 
}: { 
  jumpToSection: (id: string) => void; 
  project: ProjectCard;
}) {
  return (
    <section className="glass-base p-6 sm:p-10 rounded-3xl space-y-8 relative overflow-hidden bg-gradient-to-b from-white/90 via-sky-50/30 to-white/80 dark:from-slate-900/90 dark:via-sky-950/20 dark:to-slate-900/80 border border-sky-200/80 dark:border-sky-800/60 shadow-2xl backdrop-blur-xl">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-400/10 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10" />      {/* Header section of Mindmap - format chuẩn giống 01 · Tổng quan dự án */}
      <div className="flex items-center space-x-3 border-b border-sky-200/80 dark:border-sky-800/80 pb-3.5 sm:pb-4">
        <h2 className="text-h6 font-bold text-sky-600 dark:text-sky-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <span>00</span>
          <span className="text-sky-400 dark:text-sky-500 font-normal">·</span>
          <LineChart className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400 shrink-0 inline-block" />
          <span>Sơ đồ tư duy hệ thống phân tích & báo cáo toàn diện</span>
        </h2>
      </div>

      {/* Central Interactive Mindmap Layout */}
      <div className="relative py-6">
        {/* SVG Connector Lines */}
        <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bi-grad-blue" x1="50%" y1="50%" x2="20%" y2="20%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="bi-grad-purple" x1="50%" y1="50%" x2="80%" y2="20%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="bi-grad-emerald" x1="50%" y1="50%" x2="20%" y2="80%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="bi-grad-amber" x1="50%" y1="50%" x2="80%" y2="80%">
              <stop offset="0%" stopColor="#d97706" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path d="M 50% 50% Q 35% 35% 25% 25%" stroke="url(#bi-grad-blue)" strokeWidth="3" fill="none" />
          <path d="M 50% 50% Q 65% 35% 75% 25%" stroke="url(#bi-grad-purple)" strokeWidth="3" fill="none" />
          <path d="M 50% 50% Q 35% 65% 25% 75%" stroke="url(#bi-grad-emerald)" strokeWidth="3" fill="none" />
          <path d="M 50% 50% Q 65% 65% 75% 75%" stroke="url(#bi-grad-amber)" strokeWidth="3" fill="none" />
        </svg>

        {/* Central Core Hub */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="group relative cursor-pointer" onClick={() => jumpToSection("sec-05")}>
            <div className="w-64 sm:w-72 p-5 rounded-3xl bg-gradient-to-br from-sky-600 via-indigo-600 to-sky-800 text-white shadow-xl shadow-sky-500/30 border-2 border-white/40 dark:border-sky-400/30 text-center transition-all duration-300 transform group-hover:scale-105">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                <LineChart className="w-7 h-7 text-white animate-pulse" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-sky-900/40 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-white/20">
                Tháp Phân Tích Toàn Diện
              </span>
              <h3 className="text-xl font-black text-white">HỆ THỐNG BÁO CÁO</h3>
              <p className="text-xs text-sky-100 mt-1 font-medium">Dữ liệu • Insight • Quyết định</p>
              
              <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-sky-100 group-hover:text-white">
                <span>Khám phá Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
          {/* Branch 1: Real-time Operational Dashboard */}
          <div 
            onClick={() => jumpToSection("sec-04")} 
            className="group cursor-pointer rounded-2xl p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 border border-sky-200 dark:border-sky-800/60 shadow-lg hover:shadow-xl hover:border-sky-400 dark:hover:border-sky-500 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    1
                  </div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    Dashboard Vận Hành Thời Gian Thực
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800">
                  Real-time Wallboard
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Công cụ cho Trưởng nhóm (Team Lead) &amp; Giám sát viên để theo dõi và điều phối công việc tức thời từng giây.
              </p>

              {/* Real-time metrics from image */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center">
                <div>
                  <span className="text-[10px] text-slate-500 block">Chờ xử lý</span>
                  <strong className="text-xs font-bold text-blue-600 dark:text-blue-400">1.248</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Thời gian chờ</span>
                  <strong className="text-xs font-bold text-indigo-600 dark:text-indigo-400">02:35</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Agent Online</span>
                  <strong className="text-xs font-bold text-emerald-600 dark:text-emerald-400">85</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">SLA Đạt</span>
                  <strong className="text-xs font-bold text-teal-600 dark:text-teal-400">96%</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">SLA Cảnh báo</span>
                  <strong className="text-xs font-bold text-rose-600 dark:text-rose-400">12</strong>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-sky-500" /> Mục đích: Giám sát tức thời &amp; Điều phối nguồn lực
              </span>
              <span className="text-sky-600 dark:text-sky-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                Chi tiết <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>

          {/* Branch 2: Agent Performance Report */}
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
                    Báo Cáo Hiệu Suất Nhân Viên
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                  Agent Weekly KPI
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Đánh giá hiệu suất chi tiết của từng nhân viên, xem xét hàng tuần phục vụ phản hồi và khen thưởng.
              </p>

              {/* Weekly metrics from image */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center">
                <div>
                  <span className="text-[10px] text-slate-500 block">Đã xử lý</span>
                  <strong className="text-xs font-bold text-purple-600 dark:text-purple-400">156 ticket</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Thời gian TB</span>
                  <strong className="text-xs font-bold text-indigo-600 dark:text-indigo-400">08:42</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Điểm CSAT</span>
                  <strong className="text-xs font-bold text-amber-600 dark:text-amber-400">4.6 / 5</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">QA Score</span>
                  <strong className="text-xs font-bold text-emerald-600 dark:text-emerald-400">92%</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Tăng trưởng</span>
                  <strong className="text-xs font-bold text-emerald-600 dark:text-emerald-400">+15%</strong>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-purple-500" /> Mục đích: Đánh giá – Phản hồi – Đào tạo – Khen thưởng
              </span>
              <span className="text-purple-600 dark:text-purple-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                Chi tiết <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>

          {/* Branch 3: CX Analytics Report */}
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
                    Báo Cáo Phân Tích Trải Nghiệm (CX)
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  CX Strategic Monthly
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                Báo cáo chiến lược hàng tháng cho C-Level &amp; các phòng ban: CSAT (4.3/5), NPS (32), CES (2.1).
              </p>

              {/* Categorization & Top Driver breakdown */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">Top chủ đề phản hồi (Driver Categories):</span>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 dark:text-slate-400">Lỗi đăng nhập</span>
                    <span className="font-bold text-rose-600">28%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: "28%" }} />
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 dark:text-slate-400">Thanh toán &amp; Hoàn tiền</span>
                    <span className="font-bold text-amber-600">20%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "20%" }} />
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 dark:text-slate-400">Giao hàng &amp; Logistics</span>
                    <span className="font-bold text-blue-600">16%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "16%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <PieChart className="w-3.5 h-3.5 text-emerald-500" /> Mục đích: Định hướng cải tiến sản phẩm &amp; Hệ thống
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                Chi tiết <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>

          {/* Branch 4: Data Sources & BI Analytics Tools */}
          <div 
            onClick={() => jumpToSection("sec-06")} 
            className="group cursor-pointer rounded-2xl p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 border border-amber-200 dark:border-amber-800/60 shadow-lg hover:shadow-xl hover:border-amber-400 dark:hover:border-amber-500 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    4
                  </div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Nguồn Dữ Liệu &amp; Công Cụ BI
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                  Data Pipeline &amp; BI
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Kết nối dữ liệu từ mọi điểm chạm (CRM, Tổng đài, Chat, Khảo sát, App) và trực quan hóa bằng Power BI, Tableau, Looker Studio.
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-amber-500" /> Biểu đồ động
                  </span>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Tương tác trực quan, bộ lọc đa chiều</p>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-amber-500" /> Drill-down
                  </span>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Phân tích sâu đến từng cuộc gọi/ticket</p>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5 text-amber-500" /> Bộ lọc linh hoạt
                  </span>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Theo ca, kỹ năng, kênh, mức độ ưu tiên</p>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-amber-500" /> Xuất tự động
                  </span>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Email định kỳ 08:00 mỗi sáng cho BOD</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-amber-500" /> Nền tảng: Power BI • Tableau • Looker
              </span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                Chi tiết <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>
        </div>

        {/* Key Values & Impact Banner */}
        <div className="mt-8 pt-6 border-t border-sky-100 dark:border-sky-900/50 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
          <div className="p-2.5 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200/60 dark:border-sky-800/40">
            <Clock className="w-4 h-4 mx-auto text-sky-600 dark:text-sky-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Quản trị dữ liệu</p>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Không cảm tính</span>
          </div>
          <div className="p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40">
            <Zap className="w-4 h-4 mx-auto text-indigo-600 dark:text-indigo-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Quyết định nhanh</p>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Chính xác tức thì</span>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/40">
            <TrendingUp className="w-4 h-4 mx-auto text-purple-600 dark:text-purple-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Tăng hiệu suất</p>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Tối ưu SLA 96%</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40">
            <CheckCircle2 className="w-4 h-4 mx-auto text-emerald-600 dark:text-emerald-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Tăng hài lòng</p>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">CSAT 4.6 / 5.0</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40">
            <Award className="w-4 h-4 mx-auto text-amber-600 dark:text-amber-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Chứng minh giá trị</p>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Tạo doanh thu &amp; giữ chân</span>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-800/40">
            <Sparkles className="w-4 h-4 mx-auto text-rose-600 dark:text-rose-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Phát hiện xu hướng</p>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Cải tiến sản phẩm</span>
          </div>
        </div>
      </div>
    </section>
  );
}
