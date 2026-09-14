import React from "react";
import { 
  PhoneCall, 
  Target, 
  Users, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  PhoneForwarded, 
  Sliders, 
  CheckCircle2, 
  ShieldCheck, 
  BarChart3, 
  Flame, 
  Zap, 
  Filter, 
  Headphones, 
  DollarSign,
  Radio,
  FileSpreadsheet
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";

export function CaseStudy2_4_Mindmap({ 
  jumpToSection, 
  project 
}: { 
  jumpToSection: (id: string) => void; 
  project: ProjectCard;
}) {
  return (
    <section className="glass-base p-6 sm:p-10 rounded-3xl space-y-8 relative overflow-hidden bg-gradient-to-b from-white/90 via-amber-50/30 to-white/80 dark:from-slate-900/90 dark:via-amber-950/20 dark:to-slate-900/80 border border-amber-200/80 dark:border-amber-800/60 shadow-2xl backdrop-blur-xl">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-400/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Mindmap Top Header */}      {/* Header section of Mindmap - format chuẩn giống 01 · Tổng quan dự án */}
      <div className="flex items-center space-x-3 border-b border-sky-200/80 dark:border-sky-800/80 pb-3.5 sm:pb-4">
        <h2 className="text-base sm:text-xl md:text-2xl font-bold text-sky-600 dark:text-sky-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <span>00</span>
          <span className="text-sky-400 dark:text-sky-500 font-normal">·</span>
          <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400 shrink-0 inline-block" />
          <span>Sơ đồ tư duy quản lý chiến dịch outbound chuyên nghiệp</span>
        </h2>
      </div>

      {/* Central Interactive Mindmap Layout */}
      <div className="relative py-6">
        {/* SVG Connectors desktop */}
        <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="outbound-grad-target" x1="50%" y1="50%" x2="20%" y2="20%">
              <stop offset="0%" stopColor="#d97706" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="outbound-grad-script" x1="50%" y1="50%" x2="80%" y2="20%">
              <stop offset="0%" stopColor="#ea580c" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="outbound-grad-tech" x1="50%" y1="50%" x2="20%" y2="80%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="outbound-grad-kpi" x1="50%" y1="50%" x2="80%" y2="80%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path d="M 50% 50% Q 35% 35% 25% 25%" stroke="url(#outbound-grad-target)" strokeWidth="3" fill="none" className="mindmap-connector" />
          <path d="M 50% 50% Q 65% 35% 75% 25%" stroke="url(#outbound-grad-script)" strokeWidth="3" fill="none" className="mindmap-connector" />
          <path d="M 50% 50% Q 35% 65% 25% 75%" stroke="url(#outbound-grad-tech)" strokeWidth="3" fill="none" className="mindmap-connector" />
          <path d="M 50% 50% Q 65% 65% 75% 75%" stroke="url(#outbound-grad-kpi)" strokeWidth="3" fill="none" className="mindmap-connector" />
        </svg>

        {/* Central Core Hub */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="group relative cursor-pointer" onClick={() => jumpToSection("sec-05")}>
            <div className="w-64 sm:w-72 p-5 rounded-3xl bg-gradient-to-br from-amber-600 via-orange-600 to-rose-700 text-white shadow-xl shadow-amber-500/30 border-2 border-white/40 dark:border-amber-400/30 text-center transition-all duration-300 transform group-hover:scale-105">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                <PhoneCall className="w-7 h-7 text-white animate-pulse" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-amber-900/40 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-white/20">
                Chủ Động Tiếp Cận
              </span>
              <h3 className="text-lg font-black tracking-wide uppercase">CHIẾN DỊCH OUTBOUND</h3>
              <p className="text-xs text-amber-100/90 mt-1 font-medium">Tạo Cơ Hội Mới • Tối Ưu Chuyển Đổi</p>
              <div className="mt-3 pt-2 border-t border-white/20 flex items-center justify-center gap-1.5 text-[11px] text-amber-200">
                <span>Khám phá 4 trụ cột chiến dịch</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Primary Branches */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 relative z-10">
          
          {/* Branch 1: Xác Định Mục Tiêu & Phân Khúc (Targeting & Segmentation) */}
          <div 
            onClick={() => jumpToSection("sec-05")}
            className="group glass-inner p-5 sm:p-6 rounded-3xl border border-amber-300/70 dark:border-amber-700/60 hover:border-amber-500 bg-white/70 dark:bg-slate-900/70 shadow-lg hover:shadow-glow-amber transition-all duration-300 cursor-pointer space-y-4"
          >
            <div className="flex items-center justify-between border-b border-amber-100 dark:border-amber-900/50 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-amber-500/30 group-hover:scale-110 transition-transform">
                  1
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Trụ Cột 01</span>
                  <h4 className="text-h6 text-slate-900 dark:text-white">Mục Tiêu &amp; Phân Khúc Dữ Liệu Khách Hàng</h4>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Phân loại 4 nhóm mục tiêu chiến dịch và lọc dữ liệu chính xác theo mô hình RFM, loại trừ danh sách Do-Not-Call để tránh gọi trùng lặp hoặc làm phiền.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-200 text-[11px] block">Khảo Sát Sau Bán</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">Đo lường CSAT/NPS và giải quyết khiếu nại tiềm ẩn sau khi nhận hàng.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-200 text-[11px] block">Chăm Sóc VIP &amp; Tái Ký</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">Nhắc hạn gia hạn dịch vụ và tặng quà tri ân khách hàng thân thiết.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-200 text-[11px] block">Win-Back Khách Cũ</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">Kích hoạt lại khách hàng không tương tác trong 90-180 ngày bằng ưu đãi.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-200 text-[11px] block">Bán Thêm / Bán Chéo</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">Giới thiệu gói nâng cấp (Upsell) dựa trên lịch sử sử dụng thực tế.</p>
              </div>
            </div>
          </div>

          {/* Branch 2: Thiết Kế Kịch Bản & Đào Tạo Nhân Sự (Script & Training) */}
          <div 
            onClick={() => jumpToSection("sec-05")}
            className="group glass-inner p-5 sm:p-6 rounded-3xl border border-orange-300/70 dark:border-orange-700/60 hover:border-orange-500 bg-white/70 dark:bg-slate-900/70 shadow-lg hover:shadow-glow-orange transition-all duration-300 cursor-pointer space-y-4"
          >
            <div className="flex items-center justify-between border-b border-orange-100 dark:border-orange-900/50 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-orange-500/30 group-hover:scale-110 transition-transform">
                  2
                </div>
                <div>
                  <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Trụ Cột 02</span>
                  <h4 className="text-h6 text-slate-900 dark:text-white">Thiết Kế Kịch Bản Linh Hoạt &amp; Huấn Luyện</h4>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Xây dựng kịch bản đàm thoại động (Dynamic Scripting) với công thức Hook 15s đầu + Xử lý từ chối khéo léo và không ép buộc.
            </p>

            <div className="space-y-1.5 text-xs">
              <div className="p-2 rounded-xl bg-orange-50/70 dark:bg-orange-950/40 border border-orange-200/60 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">Hook 15 Giây Đầu Tiên</span>
                <span className="text-[11px] text-orange-700 dark:text-orange-300 font-semibold">Nêu bật giá trị và lý do gọi ngắn gọn</span>
              </div>
              <div className="p-2 rounded-xl bg-orange-50/70 dark:bg-orange-950/40 border border-orange-200/60 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">Đặt Câu Hỏi Khám Phá (SPIN)</span>
                <span className="text-[11px] text-orange-700 dark:text-orange-300 font-semibold">Tìm hiểu khó khăn thực tế của khách</span>
              </div>
              <div className="p-2 rounded-xl bg-orange-50/70 dark:bg-orange-950/40 border border-orange-200/60 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">Objection Handling Matrix</span>
                <span className="text-[11px] text-orange-700 dark:text-orange-300 font-semibold">Bộ 20 tình huống giải tỏa lo ngại</span>
              </div>
              <div className="p-2 rounded-xl bg-orange-50/70 dark:bg-orange-950/40 border border-orange-200/60 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">Call-to-Action (CTA) &amp; Follow-up</span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Chốt lịch hẹn &amp; gửi tài liệu qua Zalo</span>
              </div>
            </div>
          </div>

          {/* Branch 3: Công Nghệ Auto-Dialer & Tích Hợp CRM */}
          <div 
            onClick={() => jumpToSection("sec-05")}
            className="group glass-inner p-5 sm:p-6 rounded-3xl border border-sky-300/70 dark:border-sky-700/60 hover:border-sky-500 bg-white/70 dark:bg-slate-900/70 shadow-lg hover:shadow-glow-sky transition-all duration-300 cursor-pointer space-y-4"
          >
            <div className="flex items-center justify-between border-b border-sky-100 dark:border-sky-900/50 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-sky-500/30 group-hover:scale-110 transition-transform">
                  3
                </div>
                <div>
                  <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">Trụ Cột 03</span>
                  <h4 className="text-h6 text-slate-900 dark:text-white">Công Nghệ Auto-Dialer &amp; Quản Lý Dữ Liệu</h4>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-sky-500 group-hover:translate-x-1 transition-transform" />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Ứng dụng công nghệ quay số tự động Predictive Dialer, loại bỏ hoàn toàn thời gian chờ chuông reo, máy bận hoặc số không liên lạc được.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200/60 space-y-1">
                <span className="font-bold text-sky-800 dark:text-sky-200 text-[11px] block">Predictive Dialing</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">Tự quay số ngầm, chỉ nối máy cho Agent khi có người thực sự nhấc máy.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200/60 space-y-1">
                <span className="font-bold text-sky-800 dark:text-sky-200 text-[11px] block">Preview Mode</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">Hiển thị trước toàn bộ hồ sơ khách hàng 15s trước khi kết nối.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200/60 space-y-1">
                <span className="font-bold text-sky-800 dark:text-sky-200 text-[11px] block">Call Disposition</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">1-click ghi nhận kết quả: Thành công, Hẹn gọi lại, Không nhu cầu.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200/60 space-y-1">
                <span className="font-bold text-sky-800 dark:text-sky-200 text-[11px] block">Đồng Bộ CRM 2 Chiều</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">Tự động gắn file ghi âm và cập nhật đơn hàng thành công lên CRM.</p>
              </div>
            </div>
          </div>

          {/* Branch 4: Theo Dõi, Đo Lường KPI & Tối Ưu Chiến Dịch */}
          <div 
            onClick={() => jumpToSection("sec-05")}
            className="group glass-inner p-5 sm:p-6 rounded-3xl border border-emerald-300/70 dark:border-emerald-700/60 hover:border-emerald-500 bg-white/70 dark:bg-slate-900/70 shadow-lg hover:shadow-glow-emerald transition-all duration-300 cursor-pointer space-y-4"
          >
            <div className="flex items-center justify-between border-b border-emerald-100 dark:border-emerald-900/50 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                  4
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Trụ Cột 04</span>
                  <h4 className="text-h6 text-slate-900 dark:text-white">Theo Dõi KPI &amp; Tối Ưu Hóa Chiến Dịch</h4>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Đo lường các chỉ số kết nối (Reach Rate), tỷ lệ chốt đơn (Conversion Rate) và liên tục A/B Testing khung giờ gọi tối ưu.
            </p>

            <div className="space-y-1.5 text-xs">
              <div className="p-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">Reach Rate (Tỷ lệ kết nối)</span>
                <span className="font-extrabold text-emerald-700 dark:text-emerald-300">Đạt 72.5% (Tăng từ 35%)</span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">Conversion Rate (Chuyển đổi)</span>
                <span className="font-extrabold text-emerald-700 dark:text-emerald-300">Đạt 18.2% (Tăng từ 6.5%)</span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">A/B Testing Khung Giờ</span>
                <span className="font-extrabold text-slate-700 dark:text-slate-300">9h-10h30 &amp; 14h30-16h30 đạt hiệu quả cao nhất</span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">Complaint Rate (Khiếu nại)</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">&lt; 0.2% (Tuyệt đối không spam)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Strategic Impact Bar */}
        <div 
          onClick={() => jumpToSection("sec-09")}
          className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white shadow-xl shadow-amber-500/20 cursor-pointer group hover:scale-[1.01] transition-transform"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 border-b border-white/20 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
              <h4 className="text-h6 uppercase tracking-wider">Kết Quả Đột Phá Chiến Dịch Outbound</h4>
            </div>
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold flex items-center gap-1">
              Xem báo cáo chi tiết <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <TrendingUp className="w-5 h-5 mx-auto mb-1 text-yellow-200" />
              <span className="text-2xl font-black">18.2%</span>
              <p className="text-[11px] text-yellow-100 font-medium">Tỷ lệ chuyển đổi thành công</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <PhoneForwarded className="w-5 h-5 mx-auto mb-1 text-sky-200" />
              <span className="text-2xl font-black">72.5%</span>
              <p className="text-[11px] text-sky-100 font-medium">Tỷ lệ kết nối thành công</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <Zap className="w-5 h-5 mx-auto mb-1 text-emerald-200" />
              <span className="text-2xl font-black">150 cuộc</span>
              <p className="text-[11px] text-emerald-100 font-medium">Năng suất Agent / ngày</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-teal-200" />
              <span className="text-2xl font-black">&lt; 0.2%</span>
              <p className="text-[11px] text-teal-100 font-medium">Tỷ lệ khiếu nại làm phiền</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 col-span-2 sm:col-span-1">
              <DollarSign className="w-5 h-5 mx-auto mb-1 text-yellow-300" />
              <span className="text-2xl font-black">+280%</span>
              <p className="text-[11px] text-yellow-100 font-medium">Doanh thu gia hạn &amp; Win-back</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
