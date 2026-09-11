import React from "react";
import { 
  Database, 
  Layers, 
  Settings, 
  GitMerge, 
  Users, 
  PhoneCall, 
  Globe, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Workflow, 
  Share2, 
  FileText, 
  Award, 
  RefreshCw,
  Clock,
  Laptop
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";

export function CaseStudy3_1_Mindmap({ 
  jumpToSection, 
  project 
}: { 
  jumpToSection: (id: string) => void; 
  project: ProjectCard;
}) {
  return (
    <section className="glass-base p-6 sm:p-10 rounded-3xl space-y-8 relative overflow-hidden bg-gradient-to-b from-white/90 via-blue-50/30 to-white/80 dark:from-slate-900/90 dark:via-blue-950/20 dark:to-slate-900/80 border border-blue-200/80 dark:border-blue-800/60 shadow-2xl backdrop-blur-xl">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />      {/* Header section of Mindmap - format chuẩn giống 01 · Tổng quan dự án */}
      <div className="flex items-center space-x-3 border-b border-sky-200/80 dark:border-sky-800/80 pb-3.5 sm:pb-4">
        <h2 className="text-base sm:text-xl md:text-2xl font-bold text-sky-600 dark:text-sky-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <span>00</span>
          <span className="text-sky-400 dark:text-sky-500 font-normal">·</span>
          <Database className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400 shrink-0 inline-block" />
          <span>Sơ đồ tư duy xây dựng hệ thống CRM trung tâm</span>
        </h2>
      </div>

      {/* Central Interactive Mindmap Layout */}
      <div className="relative py-6">
        {/* SVG Connector Lines */}
        <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="crm-grad-blue" x1="50%" y1="50%" x2="20%" y2="20%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="crm-grad-purple" x1="50%" y1="50%" x2="80%" y2="20%">
              <stop offset="0%" stopColor="#9333ea" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="crm-grad-emerald" x1="50%" y1="50%" x2="20%" y2="80%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="crm-grad-amber" x1="50%" y1="50%" x2="80%" y2="80%">
              <stop offset="0%" stopColor="#d97706" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path d="M 50% 50% Q 35% 35% 25% 25%" stroke="url(#crm-grad-blue)" strokeWidth="3" fill="none" />
          <path d="M 50% 50% Q 65% 35% 75% 25%" stroke="url(#crm-grad-purple)" strokeWidth="3" fill="none" />
          <path d="M 50% 50% Q 35% 65% 25% 75%" stroke="url(#crm-grad-emerald)" strokeWidth="3" fill="none" />
          <path d="M 50% 50% Q 65% 65% 75% 75%" stroke="url(#crm-grad-amber)" strokeWidth="3" fill="none" />
        </svg>

        {/* Central Core Hub */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="group relative cursor-pointer" onClick={() => jumpToSection("sec-05")}>
            <div className="w-64 sm:w-72 p-5 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 text-white shadow-xl shadow-blue-500/30 border-2 border-white/40 dark:border-blue-400/30 text-center transition-all duration-300 transform group-hover:scale-105">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                <Database className="w-7 h-7 text-white animate-pulse" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-blue-900/40 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-white/20">
                Lõi Dữ Liệu Doanh Nghiệp
              </span>
              <h3 className="text-xl font-black text-white">CRM TRUNG TÂM</h3>
              <p className="text-xs text-blue-100 mt-1 font-medium">Quản lý • Khai thác • Tạo giá trị</p>
              
              <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-blue-100 group-hover:text-white">
                <span>Xem kiến trúc 360°</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
          {/* Branch 1: Phân tích nhu cầu & Lựa chọn nền tảng */}
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
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Phân Tích Nhu Cầu &amp; Chọn Nền Tảng
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  Nghiệp vụ &amp; Đánh giá
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Làm việc với các bên liên quan để xác định yêu cầu nghiệp vụ và lựa chọn nền tảng CRM phù hợp nhất.
              </p>

              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1">
                    <Users className="w-3.5 h-3.5 text-blue-500" /> Các bên liên quan (Stakeholders):
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    <span className="px-2 py-0.5 rounded-md bg-blue-100/70 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[11px]">CSKH</span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-100/70 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[11px]">Kinh doanh (Sales)</span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-100/70 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[11px]">Marketing</span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-100/70 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[11px]">IT / Vận hành</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1">
                    <Laptop className="w-3.5 h-3.5 text-blue-500" /> Lựa chọn giải pháp nền tảng:
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Thương mại có sẵn (Salesforce, Zendesk, HubSpot, Freshdesk) hoặc Tự phát triển nội bộ (In-house proprietary).
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-blue-500" /> Đầu ra: Bộ BRD &amp; Quyết định nền tảng
              </span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                Chi tiết <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>

          {/* Branch 2: Thiết kế & Tùy chỉnh (Customization) */}
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
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    Thiết Kế &amp; Tùy Chỉnh (Customization)
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                  Cấu hình &amp; Luồng xử lý
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Tùy chỉnh hệ thống để phù hợp tuyệt đối với quy trình vận hành độc nhất của công ty và nhu cầu thực tế.
              </p>

              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-purple-500" /> Thiết kế trường dữ liệu (Custom Fields)
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    Phân tầng định danh KH, mã định danh đa kênh, trạng thái hợp đồng, nhóm VIP.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Workflow className="w-3.5 h-3.5 text-purple-500" /> Cấu hình luồng xử lý ticket (Ticket Workflows)
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    Định tuyến tự động theo kỹ năng (Skill-based routing), phân cấp ưu tiên SLA P1-P4.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-purple-500" /> Thiết lập quy tắc tự động hóa (Triggers &amp; Automations)
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    Macro 1-click phản hồi, tự động leo thang vi phạm thời hạn, tự gửi khảo sát CSAT.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Settings className="w-3.5 h-3.5 text-purple-500" /> Đầu ra: Hệ thống CRM may đo theo doanh nghiệp
              </span>
              <span className="text-purple-600 dark:text-purple-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                Chi tiết <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>

          {/* Branch 3: Tích hợp hệ thống (Integration) */}
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
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Tích Hợp Hệ Thống (Integration)
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  Góc nhìn 360°
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Tích hợp CRM với các hệ thống khác để tạo ra cái nhìn 360 độ về khách hàng trên mọi điểm chạm.
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-500" /> Tổng đài (CTI)
                  </span>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Ghi âm cuộc gọi, Screen Pop-up thông tin</p>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-emerald-500" /> Website / App
                  </span>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Đồng bộ lịch sử duyệt, tài khoản người dùng</p>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-emerald-500" /> Email &amp; Chat
                  </span>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Đồng bộ luồng email, chat transcript</p>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5 text-emerald-500" /> Mạng xã hội &amp; ERP
                  </span>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Zalo, FB, Billing, Thanh toán, Kho vận</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Đầu ra: Dữ liệu đồng bộ, cái nhìn 360°
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                Chi tiết <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>

          {/* Branch 4: Di chuyển dữ liệu & Đào tạo người dùng */}
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
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Di Chuyển Dữ Liệu &amp; Đào Tạo
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                  Thực thi &amp; Chuyển giao
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Đảm bảo dữ liệu được chuyển đổi chính xác và người dùng có thể khai thác tối đa hệ thống mới.
              </p>

              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1">
                    <RefreshCw className="w-3.5 h-3.5 text-amber-500" /> Quy trình di chuyển dữ liệu (Data Migration):
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-400">
                    <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700">Dữ liệu cũ / Excel</span>
                    <ArrowRight className="w-3 h-3 text-amber-500 shrink-0" />
                    <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">Làm sạch &amp; chuẩn hóa</span>
                    <ArrowRight className="w-3 h-3 text-amber-500 shrink-0" />
                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">Nạp CRM mới</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1">
                    <Users className="w-3.5 h-3.5 text-amber-500" /> Đào tạo &amp; Đồng hành người dùng:
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Tài liệu hướng dẫn trực quan, đào tạo chuyên sâu thực chiến, hỗ trợ sau go-live, đánh giá năng lực định kỳ.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-500" /> Đầu ra: Dữ liệu sạch &amp; Người dùng thành thạo
              </span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                Chi tiết <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>
        </div>

        {/* Key Impact & Success Factors Banner */}
        <div className="mt-8 pt-6 border-t border-blue-100 dark:border-blue-900/50 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
          <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/40">
            <Clock className="w-4 h-4 mx-auto text-blue-600 dark:text-blue-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Tăng hiệu suất</p>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">-65% thời gian tìm kiếm</span>
          </div>
          <div className="p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40">
            <Sparkles className="w-4 h-4 mx-auto text-indigo-600 dark:text-indigo-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Cái nhìn 360°</p>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Hợp nhất 100% điểm chạm</span>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/40">
            <Users className="w-4 h-4 mx-auto text-purple-600 dark:text-purple-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Cá nhân hóa</p>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Chào tên &amp; thấu hiểu</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40">
            <TrendingUp className="w-4 h-4 mx-auto text-emerald-600 dark:text-emerald-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Báo cáo chính xác</p>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Single Source of Truth</span>
          </div>
          <div className="p-2.5 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800/40">
            <ShieldCheck className="w-4 h-4 mx-auto text-teal-600 dark:text-teal-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Tuân thủ &amp; Bảo mật</p>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">RBAC &amp; Audit Log</span>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-800/40">
            <Award className="w-4 h-4 mx-auto text-rose-600 dark:text-rose-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Tăng hài lòng</p>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">CSAT 4.85/5</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 col-span-2 sm:col-span-1">
            <Zap className="w-4 h-4 mx-auto text-amber-600 dark:text-amber-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Tăng trưởng</p>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Giảm chi phí vận hành</span>
          </div>
        </div>
      </div>
    </section>
  );
}
