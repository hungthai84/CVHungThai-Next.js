import React from "react";
import { 
  Network, 
  UserCheck, 
  Clock, 
  GraduationCap, 
  ArrowRight, 
  Sparkles, 
  PhoneCall, 
  Mail, 
  MessageSquare, 
  Share2, 
  CheckCircle2, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Database,
  Smartphone,
  Eye,
  Inbox
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";

export function CaseStudy2_2_Mindmap({ 
  jumpToSection, 
  project 
}: { 
  jumpToSection: (id: string) => void; 
  project: ProjectCard;
}) {
  return (
    <section className="glass-base p-6 sm:p-10 rounded-3xl space-y-8 relative overflow-hidden bg-gradient-to-b from-white/90 via-indigo-50/30 to-white/80 dark:from-slate-900/90 dark:via-indigo-950/20 dark:to-slate-900/80 border border-indigo-200/80 dark:border-indigo-800/60 shadow-2xl backdrop-blur-xl">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-400/10 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />      {/* Header section of Mindmap - format chuẩn giống 01 · Tổng quan dự án */}
      <div className="flex items-center space-x-3 border-b border-sky-200/80 dark:border-sky-800/80 pb-3.5 sm:pb-4">
        <h2 className="text-h6 font-bold text-sky-600 dark:text-sky-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <span>00</span>
          <span className="text-sky-400 dark:text-sky-500 font-normal">·</span>
          <Network className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400 shrink-0 inline-block" />
          <span>Sơ đồ tư duy tối ưu hóa & hợp nhất kênh hỗ trợ</span>
        </h2>
      </div>

      {/* Central Interactive Mindmap Layout */}
      <div className="relative py-6">
        {/* SVG Connectors desktop */}
        <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="omni-grad-blue" x1="50%" y1="50%" x2="20%" y2="20%">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="omni-grad-purple" x1="50%" y1="50%" x2="80%" y2="20%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="omni-grad-emerald" x1="50%" y1="50%" x2="20%" y2="80%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="omni-grad-amber" x1="50%" y1="50%" x2="80%" y2="80%">
              <stop offset="0%" stopColor="#d97706" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path d="M 50% 50% Q 35% 35% 25% 25%" stroke="url(#omni-grad-blue)" strokeWidth="3" fill="none" className="mindmap-connector" />
          <path d="M 50% 50% Q 65% 35% 75% 25%" stroke="url(#omni-grad-purple)" strokeWidth="3" fill="none" className="mindmap-connector" />
          <path d="M 50% 50% Q 35% 65% 25% 75%" stroke="url(#omni-grad-emerald)" strokeWidth="3" fill="none" className="mindmap-connector" />
          <path d="M 50% 50% Q 65% 65% 75% 75%" stroke="url(#omni-grad-amber)" strokeWidth="3" fill="none" className="mindmap-connector" />
        </svg>

        {/* Central Core Hub */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="group relative cursor-pointer" onClick={() => jumpToSection("sec-05")}>
            <div className="w-64 sm:w-72 p-5 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-sky-700 text-white shadow-xl shadow-indigo-500/30 border-2 border-white/40 dark:border-indigo-400/30 text-center transition-all duration-300 transform group-hover:scale-105">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                <Network className="w-7 h-7 text-white animate-pulse" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-indigo-900/40 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-white/20">
                Trải Nghiệm Liền Mạch
              </span>
              <h3 className="text-lg font-black tracking-wide uppercase">OMNI-CHANNEL</h3>
              <p className="text-xs text-indigo-100/90 mt-1 font-medium">Một Khách Hàng • Một Trải Nghiệm Thống Nhất</p>
              <div className="mt-3 pt-2 border-t border-white/20 flex items-center justify-center gap-1.5 text-[11px] text-indigo-200">
                <span>Khám phá 4 trụ cột hợp nhất</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Primary Branches */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 relative z-10">
          
          {/* Branch 1: Tích hợp các kênh vào một nền tảng */}
          <div 
            onClick={() => jumpToSection("sec-05")}
            className="group glass-inner p-5 sm:p-6 rounded-3xl border border-blue-300/70 dark:border-blue-700/60 hover:border-blue-500 bg-white/70 dark:bg-slate-900/70 shadow-lg hover:shadow-glow-sky transition-all duration-300 cursor-pointer space-y-4"
          >
            <div className="flex items-center justify-between border-b border-blue-100 dark:border-blue-900/50 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/30 group-hover:scale-110 transition-transform">
                  1
                </div>
                <div>
                  <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Trụ Cột 01</span>
                  <h4 className="text-h6 text-slate-900 dark:text-white">Tích Hợp Kênh Vào Một Nền Tảng Duy Nhất</h4>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Triển khai hệ thống CRM/Helpdesk hợp nhất, gom mọi tương tác từ Hotline, Email, Livechat, Facebook, Zalo về một màn hình làm việc duy nhất (Single Pane of Glass).
            </p>

            {/* Channels badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center text-xs font-semibold">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 flex items-center justify-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5" /> Hotline (CTI)
              </div>
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 flex items-center justify-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Email Helpdesk
              </div>
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 flex items-center justify-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> Live Chat Web/App
              </div>
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 flex items-center justify-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" /> Facebook Fanpage
              </div>
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 flex items-center justify-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" /> Zalo Official Account
              </div>
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 flex items-center justify-center gap-1.5">
                <Inbox className="w-3.5 h-3.5" /> SMS &amp; In-app
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 font-medium">
              ✨ <strong>Single Agent Workspace:</strong> Loại bỏ hoàn toàn việc nhân viên phải mở 5-6 tab trình duyệt cùng lúc.
            </div>
          </div>

          {/* Branch 2: Xây dựng hồ sơ khách hàng hợp nhất (Customer 360) */}
          <div 
            onClick={() => jumpToSection("sec-05")}
            className="group glass-inner p-5 sm:p-6 rounded-3xl border border-purple-300/70 dark:border-purple-700/60 hover:border-purple-500 bg-white/70 dark:bg-slate-900/70 shadow-lg hover:shadow-glow-purple transition-all duration-300 cursor-pointer space-y-4"
          >
            <div className="flex items-center justify-between border-b border-purple-100 dark:border-purple-900/50 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-purple-500/30 group-hover:scale-110 transition-transform">
                  2
                </div>
                <div>
                  <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Trụ Cột 02</span>
                  <h4 className="text-h6 text-slate-900 dark:text-white">Xây Dựng Hồ Sơ Khách Hàng Hợp Nhất (360°)</h4>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-500 group-hover:translate-x-1 transition-transform" />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Tự động nhận diện danh tính khách hàng dựa trên SĐT/Email/User ID và hiển thị toàn bộ dòng thời gian lịch sử tương tác xuyên suốt các kênh.
            </p>

            {/* Customer 360 Visual Mockup */}
            <div className="p-3 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/40 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-purple-900 dark:text-purple-200">
                <span className="flex items-center gap-1.5"><UserCheck className="w-3.5 h-3.5 text-purple-600" /> Nguyễn Anh Thư (ID: CUS-10086)</span>
                <span className="text-[10px] bg-purple-200 dark:bg-purple-900 px-2 py-0.5 rounded-full">Khách hàng VIP</span>
              </div>
              <div className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300">
                <div className="flex items-center justify-between py-1 border-b border-purple-100 dark:border-purple-900/50">
                  <span className="flex items-center gap-1 text-sky-600"><MessageSquare className="w-3 h-3" /> Live Chat Web: Hỏi giao hàng</span>
                  <span className="text-[10px] text-slate-400">10:32 AM hôm nay</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-purple-100 dark:border-purple-900/50">
                  <span className="flex items-center gap-1 text-indigo-600"><PhoneCall className="w-3 h-3" /> Hotline: Đàm thoại 5p12s</span>
                  <span className="text-[10px] text-slate-400">10:27 AM hôm nay</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="flex items-center gap-1 text-emerald-600"><Mail className="w-3 h-3" /> Email: Yêu cầu hoàn tiền</span>
                  <span className="text-[10px] text-slate-400">2 ngày trước</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-purple-700 dark:text-purple-300 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" /> Khách hàng không bao giờ phải lặp lại câu chuyện khi đổi kênh liên hệ.
            </div>
          </div>

          {/* Branch 3: Chuẩn hóa quy trình và SLA cho từng kênh */}
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
                  <h4 className="text-h6 text-slate-900 dark:text-white">Chuẩn Hóa Quy Trình &amp; SLA Từng Kênh</h4>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Thiết lập chuẩn mực đặc thù và SLA đo lường riêng biệt cho từng kênh nhằm tối ưu hóa trải nghiệm tương tác tự nhiên.
            </p>

            <div className="space-y-1.5 text-xs">
              <div className="p-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" /> Hotline (Trao đổi trực tiếp)
                </span>
                <span className="font-extrabold text-emerald-700 dark:text-emerald-300">SLA Phản hồi ≤ 20s | Xử lý ≤ 24h</span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" /> Live Chat (Tốc độ, ngắn gọn)
                </span>
                <span className="font-extrabold text-emerald-700 dark:text-emerald-300">SLA Phản hồi ≤ 30s | Xử lý ≤ 24h</span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-600" /> Email (Chi tiết, chính thức)
                </span>
                <span className="font-extrabold text-emerald-700 dark:text-emerald-300">SLA Phản hồi ≤ 2h | Xử lý ≤ 48h</span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-emerald-600" /> Facebook / Zalo OA
                </span>
                <span className="font-extrabold text-emerald-700 dark:text-emerald-300">SLA Phản hồi ≤ 15m | Xử lý ≤ 24h</span>
              </div>
            </div>
          </div>

          {/* Branch 4: Đào tạo kỹ năng đa kênh cho nhân viên */}
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
                  <h4 className="text-h6 text-slate-900 dark:text-white">Đào Tạo Kỹ Năng Đa Kênh (Omni-Agent)</h4>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Trang bị kỹ năng linh hoạt để mỗi nhân viên có thể xử lý mượt mà trên tất cả các kênh (Blended Agent Model).
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-200 text-[11px] block">Kỹ Năng Thoại</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">Lắng nghe tích cực, điều chỉnh ngữ điệu và giải tỏa cảm xúc.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-200 text-[11px] block">Kỹ Năng Chat &amp; MXH</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">Gõ phím nhanh, câu từ súc tích, văn phong hiện đại &amp; thân thiện.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-200 text-[11px] block">Viết Email Chuẩn</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">Cấu trúc rõ ràng, lập luận chặt chẽ, đầy đủ bằng chứng giải quyết.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-200 text-[11px] block">Am Hiểu Nghiệp Vụ</span>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">Tư vấn chính xác, thống nhất một chính sách duy nhất trên mọi kênh.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Strategic Impact Bar */}
        <div 
          onClick={() => jumpToSection("sec-09")}
          className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 text-white shadow-xl shadow-indigo-500/20 cursor-pointer group hover:scale-[1.01] transition-transform"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 border-b border-white/20 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
              <h4 className="text-h6 uppercase tracking-wider">Kết Quả Định Lượng Sau Khi Hợp Nhất Đa Kênh</h4>
            </div>
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold flex items-center gap-1">
              Xem báo cáo chi tiết <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <TrendingUp className="w-5 h-5 mx-auto mb-1 text-sky-200" />
              <span className="text-2xl font-black">+140%</span>
              <p className="text-[11px] text-sky-100 font-medium">Năng suất xử lý Agent</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <Clock className="w-5 h-5 mx-auto mb-1 text-emerald-200" />
              <span className="text-2xl font-black">-42%</span>
              <p className="text-[11px] text-emerald-100 font-medium">Giảm AHT trung bình</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <CheckCircle2 className="w-5 h-5 mx-auto mb-1 text-amber-200" />
              <span className="text-2xl font-black">89.4%</span>
              <p className="text-[11px] text-amber-100 font-medium">Tỷ lệ FCR đa kênh</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-teal-200" />
              <span className="text-2xl font-black">0%</span>
              <p className="text-[11px] text-teal-100 font-medium">Tỷ lệ sót lọt tin nhắn</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 col-span-2 sm:col-span-1">
              <Zap className="w-5 h-5 mx-auto mb-1 text-yellow-300" />
              <span className="text-2xl font-black">-35%</span>
              <p className="text-[11px] text-yellow-100 font-medium">Chi phí cước viễn thông</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
