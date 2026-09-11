import React from "react";
import { 
  Bot, 
  Workflow, 
  Clock, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  MessageSquare, 
  BellRing, 
  Sliders, 
  CheckCircle2, 
  Cpu, 
  Headphones, 
  ShieldCheck, 
  BarChart3,
  Flame,
  Layers,
  Send,
  Database
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";

export function CaseStudy2_3_Mindmap({ 
  jumpToSection, 
  project 
}: { 
  jumpToSection: (id: string) => void; 
  project: ProjectCard;
}) {
  return (
    <section className="glass-base p-6 sm:p-10 rounded-3xl space-y-8 relative overflow-hidden bg-gradient-to-b from-white/90 via-emerald-50/30 to-white/80 dark:from-slate-900/90 dark:via-emerald-950/20 dark:to-slate-900/80 border border-emerald-200/80 dark:border-emerald-800/60 shadow-2xl backdrop-blur-xl">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Mindmap Top Header */}      {/* Header section of Mindmap - format chuẩn giống 01 · Tổng quan dự án */}
      <div className="flex items-center space-x-3 border-b border-sky-200/80 dark:border-sky-800/80 pb-3.5 sm:pb-4">
        <h2 className="text-base sm:text-xl md:text-2xl font-bold text-sky-600 dark:text-sky-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <span>00</span>
          <span className="text-sky-400 dark:text-sky-500 font-normal">·</span>
          <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400 shrink-0 inline-block" />
          <span>Sơ đồ tư duy triển khai tự động hóa vận hành CSKH</span>
        </h2>
      </div>

      {/* Central Interactive Mindmap Layout */}
      <div className="relative py-6">
        {/* SVG Connectors desktop */}
        <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="auto-grad-bot" x1="50%" y1="50%" x2="20%" y2="20%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="auto-grad-flow" x1="50%" y1="50%" x2="80%" y2="20%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="auto-grad-pro" x1="50%" y1="50%" x2="20%" y2="80%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="auto-grad-mon" x1="50%" y1="50%" x2="80%" y2="80%">
              <stop offset="0%" stopColor="#d97706" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path d="M 50% 50% Q 35% 35% 25% 25%" stroke="url(#auto-grad-bot)" strokeWidth="3" fill="none" className="mindmap-connector" />
          <path d="M 50% 50% Q 65% 35% 75% 25%" stroke="url(#auto-grad-flow)" strokeWidth="3" fill="none" className="mindmap-connector" />
          <path d="M 50% 50% Q 35% 65% 25% 75%" stroke="url(#auto-grad-pro)" strokeWidth="3" fill="none" className="mindmap-connector" />
          <path d="M 50% 50% Q 65% 65% 75% 75%" stroke="url(#auto-grad-mon)" strokeWidth="3" fill="none" className="mindmap-connector" />
        </svg>

        {/* Central Core Hub */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="group relative cursor-pointer" onClick={() => jumpToSection("sec-05")}>
            <div className="w-64 sm:w-72 p-5 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-sky-700 text-white shadow-xl shadow-emerald-500/30 border-2 border-white/40 dark:border-emerald-400/30 text-center transition-all duration-300 transform group-hover:scale-105">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                <Bot className="w-7 h-7 text-white animate-bounce" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-emerald-900/40 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-white/20">
                Tăng Tốc Độ • Giảm Chi Phí
              </span>
              <h3 className="text-lg font-black tracking-wide uppercase">TỰ ĐỘNG HÓA CSKH</h3>
              <p className="text-xs text-emerald-100/90 mt-1 font-medium">Giải Phóng Con Người • Tối Ưu Hiệu Quả</p>
              <div className="mt-3 pt-2 border-t border-white/20 flex items-center justify-center gap-1.5 text-[11px] text-emerald-200">
                <span>Khám phá 4 trụ cột tự động hóa</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Primary Branches */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 relative z-10">
          
          {/* Branch 1: Chatbot AI & Self-Service 24/7 */}
          <div 
            onClick={() => jumpToSection("sec-05")}
            className="group glass-inner p-5 sm:p-6 rounded-3xl border border-emerald-300/70 dark:border-emerald-700/60 hover:border-emerald-500 bg-white/70 dark:bg-slate-900/70 shadow-lg hover:shadow-glow-emerald transition-all duration-300 cursor-pointer space-y-4"
          >
            <div className="flex items-center justify-between border-b border-emerald-100 dark:border-emerald-900/50 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                  1
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Trụ Cột 01</span>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Chatbot AI &amp; Cổng Self-Service 24/7</h4>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Xử lý tự động 100% câu hỏi thường gặp (FAQ), tra cứu tiến độ đơn hàng và chuyển tiếp thông minh (Seamless Handover) sang nhân viên kèm lịch sử chat.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 space-y-1">
                <span className="font-bold text-emerald-800 dark:text-emerald-200 text-[11px] block">NLP Tự Nhiên</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">Hiểu ý định khách hàng (Intent) kể cả khi gõ tắt hoặc có lỗi chính tả.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 space-y-1">
                <span className="font-bold text-emerald-800 dark:text-emerald-200 text-[11px] block">Tra Cứu Real-Time</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">Tự kết nối API CRM tra cứu mã vận đơn, số dư tài khoản trong 2 giây.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 space-y-1">
                <span className="font-bold text-emerald-800 dark:text-emerald-200 text-[11px] block">Triển Khai Đa Kênh</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">Đồng bộ kịch bản Bot trên Web Widget, Fanpage, Zalo OA và Mobile App.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 space-y-1">
                <span className="font-bold text-emerald-800 dark:text-emerald-200 text-[11px] block">Chuyển Giao Người Thật</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">Tự động gọi Agent khi khách bấm "Gặp tư vấn viên" hoặc bot không hiểu.</p>
              </div>
            </div>
          </div>

          {/* Branch 2: Tự Động Hóa Luồng Công Việc (Workflow Automation) */}
          <div 
            onClick={() => jumpToSection("sec-05")}
            className="group glass-inner p-5 sm:p-6 rounded-3xl border border-sky-300/70 dark:border-sky-700/60 hover:border-sky-500 bg-white/70 dark:bg-slate-900/70 shadow-lg hover:shadow-glow-sky transition-all duration-300 cursor-pointer space-y-4"
          >
            <div className="flex items-center justify-between border-b border-sky-100 dark:border-sky-900/50 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-sky-500/30 group-hover:scale-110 transition-transform">
                  2
                </div>
                <div>
                  <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">Trụ Cột 02</span>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Tự Động Hóa Luồng Công Việc (Workflow)</h4>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-sky-500 group-hover:translate-x-1 transition-transform" />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Tự động phân loại, gán nhãn, điều phối ticket và cảnh báo vi phạm SLA mà không cần sự can thiệp thủ công của quản lý ca trực.
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200/60 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">Auto-Tagging &amp; Categorization</span>
                <span className="text-[11px] text-sky-700 dark:text-sky-300 font-semibold">Tự gán nhãn theo từ khóa</span>
              </div>
              <div className="p-2 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200/60 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">Smart Auto-Assignment</span>
                <span className="text-[11px] text-sky-700 dark:text-sky-300 font-semibold">Phân theo kỹ năng &amp; ca trực</span>
              </div>
              <div className="p-2 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200/60 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">Auto-Escalation Warning</span>
                <span className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">Cảnh báo trước 15p chạm SLA</span>
              </div>
              <div className="p-2 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200/60 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">Macro Actions (1-Click)</span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Thực thi 5 tác vụ trong 1 click</span>
              </div>
            </div>
          </div>

          {/* Branch 3: Chăm Sóc Khách Hàng Chủ Động (Proactive Support) */}
          <div 
            onClick={() => jumpToSection("sec-05")}
            className="group glass-inner p-5 sm:p-6 rounded-3xl border border-purple-300/70 dark:border-purple-700/60 hover:border-purple-500 bg-white/70 dark:bg-slate-900/70 shadow-lg hover:shadow-glow-purple transition-all duration-300 cursor-pointer space-y-4"
          >
            <div className="flex items-center justify-between border-b border-purple-100 dark:border-purple-900/50 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-purple-500/30 group-hover:scale-110 transition-transform">
                  3
                </div>
                <div>
                  <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Trụ Cột 03</span>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Chăm Sóc Khách Hàng Chủ Động (Proactive)</h4>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-500 group-hover:translate-x-1 transition-transform" />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Gửi thông báo trước khi khách hàng kịp hỏi, triệt tiêu đến 70% các cuộc gọi hỏi trạng thái đơn hàng (WISMO - Where Is My Order).
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/60 space-y-1">
                <span className="font-bold text-purple-800 dark:text-purple-200 text-[11px] block">Trigger Đơn Hàng</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">Tự động gửi Zalo ZNS khi hàng xuất kho và khi shipper giao tới.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/60 space-y-1">
                <span className="font-bold text-purple-800 dark:text-purple-200 text-[11px] block">Tri Ân Sinh Nhật</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">Tự động gửi mã giảm giá đặc quyền đúng ngày sinh nhật khách.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/60 space-y-1">
                <span className="font-bold text-purple-800 dark:text-purple-200 text-[11px] block">Auto-Survey CSAT</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">Bắn pop-up 1-chạm đánh giá sao ngay sau khi kết thúc cuộc gọi/chat.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/60 space-y-1">
                <span className="font-bold text-purple-800 dark:text-purple-200 text-[11px] block">Cảnh Báo Gián Đoạn</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">Thông báo sớm lịch bảo trì hệ thống tới người dùng bị ảnh hưởng.</p>
              </div>
            </div>
          </div>

          {/* Branch 4: Giám Sát & Tối Ưu Hóa Liên Tục */}
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
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Giám Sát, Đánh Giá &amp; Tối Ưu Hóa</h4>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Đo lường tỷ lệ giải quyết thành công của Bot (Containment Rate) và liên tục "dạy" thêm tri thức mới từ các câu hỏi bot chưa hiểu.
            </p>

            <div className="space-y-1.5 text-xs">
              <div className="p-2 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">Bot Containment Rate</span>
                <span className="font-extrabold text-amber-700 dark:text-amber-300">Đạt 58.4% (Tự giải quyết dứt điểm)</span>
              </div>
              <div className="p-2 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">Human Handover Rate</span>
                <span className="font-extrabold text-slate-700 dark:text-slate-300">41.6% (Chuyển người thật mượt mà)</span>
              </div>
              <div className="p-2 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">Fall-back Query Mining</span>
                <span className="font-extrabold text-amber-700 dark:text-amber-300">Cập nhật 20-30 mẫu câu hỏi mới / tuần</span>
              </div>
              <div className="p-2 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">A/B Testing Kịch Bản</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">Tối ưu tỷ lệ mở thông báo &gt; 85%</span>
              </div>
            </div>
          </div>

        </div>

        {/* Strategic Impact Bar */}
        <div 
          onClick={() => jumpToSection("sec-09")}
          className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-xl shadow-emerald-500/20 cursor-pointer group hover:scale-[1.01] transition-transform"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 border-b border-white/20 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
              <h4 className="text-base font-extrabold uppercase tracking-wider">Hiệu Quả Đột Phá Sau Khi Ứng Dụng Tự Động Hóa</h4>
            </div>
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold flex items-center gap-1">
              Xem báo cáo chi tiết <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <Bot className="w-5 h-5 mx-auto mb-1 text-emerald-200" />
              <span className="text-2xl font-black">58.4%</span>
              <p className="text-[11px] text-emerald-100 font-medium">Bot giải quyết tự động</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <Clock className="w-5 h-5 mx-auto mb-1 text-sky-200" />
              <span className="text-2xl font-black">&lt; 3 giây</span>
              <p className="text-[11px] text-sky-100 font-medium">Thời gian phản hồi (FRT)</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <TrendingUp className="w-5 h-5 mx-auto mb-1 text-amber-200" />
              <span className="text-2xl font-black">-52%</span>
              <p className="text-[11px] text-amber-100 font-medium">Chi phí mỗi liên hệ (Cost)</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-teal-200" />
              <span className="text-2xl font-black">24/7</span>
              <p className="text-[11px] text-teal-100 font-medium">Khả năng phục vụ tức thì</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 col-span-2 sm:col-span-1">
              <CheckCircle2 className="w-5 h-5 mx-auto mb-1 text-yellow-300" />
              <span className="text-2xl font-black">94.2%</span>
              <p className="text-[11px] text-yellow-100 font-medium">Độ hài lòng CSAT</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
