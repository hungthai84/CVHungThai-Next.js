import React from "react";
import { 
  FileText, 
  GitMerge, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  Zap, 
  HelpCircle, 
  Workflow, 
  PhoneCall, 
  Mail, 
  AlertTriangle, 
  DollarSign, 
  Database, 
  Search, 
  RefreshCw,
  Users
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";

export function CaseStudy2_1_Mindmap({ 
  jumpToSection, 
  project 
}: { 
  jumpToSection: (id: string) => void; 
  project: ProjectCard;
}) {
  return (
    <section className="glass-base p-6 sm:p-10 rounded-3xl space-y-8 relative overflow-hidden bg-gradient-to-b from-white/90 via-sky-50/30 to-white/80 dark:from-slate-900/90 dark:via-sky-950/20 dark:to-slate-900/80 border border-sky-200/80 dark:border-sky-800/60 shadow-2xl backdrop-blur-xl">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-400/10 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header section of Mindmap - format chuẩn giống 01 · Tổng quan dự án */}
      <div className="flex items-center space-x-3 border-b border-sky-200/80 dark:border-sky-800/80 pb-3.5 sm:pb-4">
        <h2 className="text-base sm:text-xl md:text-2xl font-bold text-sky-600 dark:text-sky-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <span>00</span>
          <span className="text-sky-400 dark:text-sky-500 font-normal">·</span>
          <Workflow className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400 shrink-0 inline-block" />
          <span>Sơ đồ tư duy chuẩn hóa quy trình vận hành CSKH</span>
        </h2>
      </div>

      {/* Central Interactive Mindmap Layout */}
      <div className="relative py-6">
        {/* SVG Connectors desktop */}
        <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sop-grad-blue" x1="50%" y1="50%" x2="20%" y2="20%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="sop-grad-purple" x1="50%" y1="50%" x2="80%" y2="20%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="sop-grad-emerald" x1="50%" y1="50%" x2="20%" y2="80%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="sop-grad-amber" x1="50%" y1="50%" x2="80%" y2="80%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Connecting curves to 4 pillars */}
          <path d="M 50% 50% Q 35% 35% 25% 25%" stroke="url(#sop-grad-blue)" strokeWidth="3" fill="none" className="mindmap-connector" />
          <path d="M 50% 50% Q 65% 35% 75% 25%" stroke="url(#sop-grad-purple)" strokeWidth="3" fill="none" className="mindmap-connector" />
          <path d="M 50% 50% Q 35% 65% 25% 75%" stroke="url(#sop-grad-emerald)" strokeWidth="3" fill="none" className="mindmap-connector" />
          <path d="M 50% 50% Q 65% 65% 75% 75%" stroke="url(#sop-grad-amber)" strokeWidth="3" fill="none" className="mindmap-connector" />
        </svg>

        {/* Central Core Hub */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="group relative cursor-pointer" onClick={() => jumpToSection("sec-05")}>
            <div className="w-64 sm:w-72 p-5 rounded-3xl bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 text-white shadow-xl shadow-sky-500/30 border-2 border-white/40 dark:border-sky-400/30 text-center transition-all duration-300 transform group-hover:scale-105">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                <Workflow className="w-7 h-7 text-white animate-pulse" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-sky-900/40 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-white/20">
                Lõi Vận Hành Tiêu Chuẩn
              </span>
              <h3 className="text-lg font-black tracking-wide uppercase">SOP FRAMEWORK</h3>
              <p className="text-xs text-sky-100/90 mt-1 font-medium">Nhất quán • Hiệu quả • Chuyên nghiệp • Mở rộng</p>
              <div className="mt-3 pt-2 border-t border-white/20 flex items-center justify-center gap-1.5 text-[11px] text-sky-200">
                <span>Khám phá 4 trụ cột nghiệp vụ</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Primary Mindmap Branches (2x2 Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 relative z-10">
          
          {/* Branch 1: Phân tích & Ghi lại quy trình */}
          <div 
            onClick={() => jumpToSection("sec-05")}
            className="group glass-inner p-5 sm:p-6 rounded-3xl border border-sky-300/70 dark:border-sky-700/60 hover:border-sky-500 bg-white/70 dark:bg-slate-900/70 shadow-lg hover:shadow-glow-sky transition-all duration-300 cursor-pointer space-y-4"
          >
            <div className="flex items-center justify-between border-b border-sky-100 dark:border-sky-900/50 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-sky-500/30 group-hover:scale-110 transition-transform">
                  1
                </div>
                <div>
                  <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">Trụ Cột 01</span>
                  <h4 className="text-h6 text-slate-900 dark:text-white">Phân Tích &amp; Ghi Lại Quy Trình</h4>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-sky-500 group-hover:translate-x-1 transition-transform" />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Làm việc trực tiếp với các Trưởng nhóm và chuyên viên thâm niên để ghi lại chi tiết các bước xử lý thực tế của từng loại công việc.
            </p>

            {/* Scope tags */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-semibold">
              <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/40 flex items-center justify-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5" /> Tiếp nhận cuộc gọi
              </div>
              <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/40 flex items-center justify-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Xử lý email
              </div>
              <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/40 flex items-center justify-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Xử lý khiếu nại
              </div>
              <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/40 flex items-center justify-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5" /> Quy trình hoàn tiền
              </div>
            </div>

            {/* Core activities */}
            <div className="p-3 rounded-2xl bg-sky-500/5 dark:bg-sky-500/10 border border-sky-200/50 dark:border-sky-800/30 text-xs space-y-1.5">
              <span className="font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider block text-[10px]">Hoạt Động Trọng Tâm</span>
              <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-200">
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" /> Phỏng vấn &amp; quan sát thực tế</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" /> Thu thập tài liệu hiện có</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" /> Ghi lại từng bước chi tiết</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" /> Xác định hệ thống &amp; dữ liệu liên quan</div>
              </div>
            </div>
          </div>

          {/* Branch 2: Thiết kế luồng công việc (Workflow) */}
          <div 
            onClick={() => jumpToSection("sec-05")}
            className="group glass-inner p-5 sm:p-6 rounded-3xl border border-indigo-300/70 dark:border-indigo-700/60 hover:border-indigo-500 bg-white/70 dark:bg-slate-900/70 shadow-lg hover:shadow-glow-indigo transition-all duration-300 cursor-pointer space-y-4"
          >
            <div className="flex items-center justify-between border-b border-indigo-100 dark:border-indigo-900/50 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                  2
                </div>
                <div>
                  <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Trụ Cột 02</span>
                  <h4 className="text-h6 text-slate-900 dark:text-white">Thiết Kế Luồng Công Việc &amp; SLA</h4>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-500 group-hover:translate-x-1 transition-transform" />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Vẽ sơ đồ luồng công việc tối ưu cho từng tình huống, xác định rõ điểm quyết định (Decision Points), bước thực hiện và cam kết SLA.
            </p>

            {/* Workflow Visual steps */}
            <div className="p-3 rounded-2xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-200/50 dark:border-indigo-800/30 space-y-2">
              <span className="font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block text-[10px]">Luồng Xử Lý Chuẩn</span>
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-slate-800 dark:text-slate-200">
                <span className="px-2 py-1 bg-white dark:bg-slate-800 rounded-lg border border-indigo-200 dark:border-indigo-700">Tiếp nhận</span>
                <ArrowRight className="w-3 h-3 text-indigo-400" />
                <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/60 rounded-lg text-indigo-800 dark:text-indigo-200 font-bold">Phân loại</span>
                <ArrowRight className="w-3 h-3 text-indigo-400" />
                <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-lg">Đơn giản (Xử lý ngay)</span>
                <span className="text-slate-400">/</span>
                <span className="px-2 py-1 bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 rounded-lg">Phức tạp (Chuyển cấp)</span>
                <ArrowRight className="w-3 h-3 text-indigo-400" />
                <span className="px-2 py-1 bg-white dark:bg-slate-800 rounded-lg border border-indigo-200 dark:border-indigo-700">Xác nhận KH</span>
              </div>
            </div>

            {/* SLA Badges */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/60 dark:border-indigo-800/40">
                <span className="text-[10px] text-slate-500 block">Phản hồi đầu</span>
                <span className="font-extrabold text-indigo-700 dark:text-indigo-300 text-sm">≤ 2 giờ</span>
              </div>
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/60 dark:border-indigo-800/40">
                <span className="text-[10px] text-slate-500 block">Cập nhật tiến độ</span>
                <span className="font-extrabold text-indigo-700 dark:text-indigo-300 text-sm">≤ 24 giờ</span>
              </div>
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/60 dark:border-indigo-800/40">
                <span className="text-[10px] text-slate-500 block">Giải quyết dứt điểm</span>
                <span className="font-extrabold text-indigo-700 dark:text-indigo-300 text-sm">≤ 48 giờ</span>
              </div>
            </div>
          </div>

          {/* Branch 3: Soạn thảo bộ tài liệu SOP */}
          <div 
            onClick={() => jumpToSection("sec-05")}
            className="group glass-inner p-5 sm:p-6 rounded-3xl border border-emerald-300/70 dark:border-emerald-700/60 hover:border-emerald-500 bg-white/70 dark:bg-slate-900/70 shadow-lg hover:shadow-glow-emerald transition-all duration-300 cursor-pointer space-y-4"
          >
            <div className="flex items-center justify-between border-b border-emerald-100 dark:border-emerald-900/50 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                  3
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Trụ Cột 03</span>
                  <h4 className="text-h6 text-slate-900 dark:text-white">Soạn Thảo Bộ Tài Liệu SOP &amp; KMS</h4>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Soạn thảo bộ tài liệu dễ hiểu, cấu trúc chuẩn hóa, kịch bản mẫu và lưu trữ trên nền tảng Knowledge Base tập trung.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 space-y-1.5">
                <span className="font-bold text-emerald-700 dark:text-emerald-300 uppercase text-[10px] flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> Cấu Trúc Nội Dung
                </span>
                <ul className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                  <li>• Quy trình chi tiết từng bước</li>
                  <li>• Sơ đồ luồng công việc (Workflow)</li>
                  <li>• Kịch bản mẫu (Call/Email/Chat)</li>
                  <li>• Hướng dẫn hệ thống &amp; FAQ</li>
                </ul>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 space-y-1.5">
                <span className="font-bold text-emerald-700 dark:text-emerald-300 uppercase text-[10px] flex items-center gap-1">
                  <Database className="w-3.5 h-3.5" /> Nền Tảng Lưu Trữ (KMS)
                </span>
                <ul className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                  <li>• <strong>Dễ tìm kiếm:</strong> Search tức thì trong 3s</li>
                  <li>• <strong>Dễ truy cập:</strong> Đa thiết bị 24/7</li>
                  <li>• <strong>Luôn cập nhật:</strong> Version control rõ ràng</li>
                  <li>• <strong>Phân quyền:</strong> Agent / Lead / Admin</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Branch 4: Đào tạo & Cập nhật */}
          <div 
            onClick={() => jumpToSection("sec-05")}
            className="group glass-inner p-5 sm:p-6 rounded-3xl border border-amber-300/70 dark:border-amber-700/60 hover:border-amber-500 bg-white/70 dark:bg-slate-900/70 shadow-lg hover:shadow-glow-amber transition-all duration-300 cursor-pointer space-y-4"
          >
            <div className="flex items-center justify-between border-b border-amber-100 dark:border-amber-900/50 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-amber-500/30 group-hover:scale-110 transition-transform">
                  4
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Trụ Cột 04</span>
                  <h4 className="text-h6 text-slate-900 dark:text-white">Đào Tạo &amp; Chu Trình Cập Nhật PDCA</h4>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              SOP không phải là tài liệu "chết". Đào tạo liên tục và thiết lập chu trình xem xét định kỳ để luôn tương thích với sản phẩm và chính sách mới.
            </p>

            {/* Training & PDCA cycle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 space-y-1.5">
                <span className="font-bold text-amber-700 dark:text-amber-300 uppercase text-[10px] flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" /> Hoạt Động Đào Tạo
                </span>
                <ul className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                  <li>• Đào tạo tân tuyển hội nhập nhanh</li>
                  <li>• Huấn luyện định kỳ hàng tháng</li>
                  <li>• Đánh giá &amp; bài test nghiệp vụ</li>
                  <li>• Workshop chia sẻ Best Practices</li>
                </ul>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 space-y-1.5">
                <span className="font-bold text-amber-700 dark:text-amber-300 uppercase text-[10px] flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5" /> Vòng Cập Nhật PDCA
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                  <div className="p-1.5 bg-white dark:bg-slate-800 rounded-lg text-center border border-amber-200 dark:border-amber-700">1. Xem xét (Review)</div>
                  <div className="p-1.5 bg-white dark:bg-slate-800 rounded-lg text-center border border-amber-200 dark:border-amber-700">2. Cập nhật (Update)</div>
                  <div className="p-1.5 bg-white dark:bg-slate-800 rounded-lg text-center border border-amber-200 dark:border-amber-700">3. Phê duyệt (Approve)</div>
                  <div className="p-1.5 bg-white dark:bg-slate-800 rounded-lg text-center border border-amber-200 dark:border-amber-700">4. Truyền thông (Comm)</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Quantitative Outcomes Banner */}
        <div 
          onClick={() => jumpToSection("sec-09")}
          className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-emerald-600 text-white shadow-xl shadow-indigo-500/20 cursor-pointer group hover:scale-[1.01] transition-transform"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 border-b border-white/20 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
              <h4 className="text-h6 uppercase tracking-wider">Kết Quả Đột Phá Đạt Được Sau Khi Chuẩn Hóa SOP</h4>
            </div>
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold flex items-center gap-1">
              Xem bảng số liệu chi tiết <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <Clock className="w-5 h-5 mx-auto mb-1 text-sky-200" />
              <span className="text-2xl font-black">20 – 30%</span>
              <p className="text-[11px] text-sky-100 font-medium">Giảm thời gian xử lý ticket</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <TrendingUp className="w-5 h-5 mx-auto mb-1 text-emerald-200" />
              <span className="text-2xl font-black">15 – 25%</span>
              <p className="text-[11px] text-emerald-100 font-medium">Tăng tỷ lệ FCR giải quyết lần đầu</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <Users className="w-5 h-5 mx-auto mb-1 text-amber-200" />
              <span className="text-2xl font-black">30 – 40%</span>
              <p className="text-[11px] text-amber-100 font-medium">Nhân viên mới hòa nhập nhanh hơn</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-teal-200" />
              <span className="text-2xl font-black">98.5%</span>
              <p className="text-[11px] text-teal-100 font-medium">Độ tin cậy &amp; Tính nhất quán</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 col-span-2 sm:col-span-1">
              <Zap className="w-5 h-5 mx-auto mb-1 text-yellow-300" />
              <span className="text-2xl font-black">+18 pts</span>
              <p className="text-[11px] text-yellow-100 font-medium">Tăng điểm CSAT &amp; NPS</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
