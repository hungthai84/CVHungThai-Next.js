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
  FileText, 
  Award, 
  RefreshCw,
  Clock,
  Laptop,
  Check,
  Building2,
  Calendar,
  AlertTriangle,
  Flame,
  Star,
  Cpu,
  Workflow
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";
import { CaseStudy3_1_Tools } from "./CaseStudy3_1_Tools";

export function CaseStudy3_1_Sections({ project }: { project: ProjectCard }) {
  return (
    <div id="article-section" className="space-y-4 md:space-y-5 flex flex-col gap-4 md:gap-5 animate-fadeIn">
      {/* SECTION 01: BỐI CẢNH & VẤN ĐỀ */}
      <section id="sec-01" className="p-5 sm:p-7 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-sky-100 dark:border-sky-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 uppercase tracking-widest">
            01. Bối Cảnh Thực Tế &amp; Vấn Đề
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Thực Trạng Phân Mảnh Dữ Liệu Khách Hàng (Data Silos) &amp; Tổn Thất Vận Hành
        </h3>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Trong kỷ nguyên số, dữ liệu khách hàng chính là tài sản quý giá nhất của doanh nghiệp. Tuy nhiên, trước khi triển khai hệ sinh thái CRM Trung tâm, doanh nghiệp đối mặt với cuộc khủng hoảng "Ốc đảo dữ liệu" (Data Silos) trầm trọng:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Dữ Liệu Bị Phân Mảnh Ở 5+ Nơi</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Thông tin giao dịch nằm ở Core Backend, đơn hàng nằm ở Web/App, lịch sử gọi điện nằm ở Tổng đài, email nằm ở hộp thư cá nhân và phản hồi nằm ở các file Excel rời rạc.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Thao Tác Chậm Chạp &amp; Lãng Phí</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Mỗi cuộc gọi hỗ trợ, nhân viên phải mở 4-6 tab trình duyệt khác nhau để tra cứu. Thời gian tra cứu thông tin chiếm đến 40-50% tổng thời lượng cuộc gọi (AHT kéo dài 8-10 phút).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Trải Nghiệm Khách Hàng Bị Đứt Gãy</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Khách hàng phải lặp lại vấn đề từ đầu mỗi khi chuyển kênh từ Chat sang Gọi Hotline. Không nhận diện được khách hàng VIP để ưu tiên phục vụ.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 02: Mục tiêu chiến lược */}
      <section id="sec-02" className="p-5 sm:p-7 rounded-3xl bg-indigo-50/40 dark:bg-slate-900/80 border border-indigo-100 dark:border-indigo-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-widest">
            02. Mục Tiêu Chiến Lược
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Xây Dựng Nền Tảng Hợp Nhất &amp; Góc Nhìn 360 Độ Toàn Diện
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">Góc nhìn 360°</span>
            <p className="text-base font-extrabold text-slate-900 dark:text-white">Hợp nhất 100% điểm chạm</p>
            <p className="text-xs text-slate-500">Mọi lịch sử giao dịch &amp; tương tác nằm trên 1 màn hình duy nhất.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Tốc độ tra cứu</span>
            <p className="text-base font-extrabold text-slate-900 dark:text-white">&lt; 3 Giây / Tra cứu</p>
            <p className="text-xs text-slate-500">CTI Screen Pop-up tự động hiển thị hồ sơ khách hàng ngay khi chuông reo.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">Tự động hóa</span>
            <p className="text-base font-extrabold text-slate-900 dark:text-white">60% Tác vụ lặp lại</p>
            <p className="text-xs text-slate-500">Macro 1-click, tự động leo thang vi phạm SLA và khảo sát CSAT.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">Độ tin cậy dữ liệu</span>
            <p className="text-base font-extrabold text-slate-900 dark:text-white">99.98% Toàn vẹn</p>
            <p className="text-xs text-slate-500">Single Source of Truth cho toàn bộ các phòng ban CSKH, Sales, Marketing.</p>
          </div>
        </div>
      </section>

      {/* SECTION 03: PHƯƠNG PHÁP TIẾP CẬN & PHÂN TÍCH */}
      <section id="sec-03" className="p-5 sm:p-7 rounded-3xl bg-rose-50/40 dark:bg-slate-900/80 border border-rose-100 dark:border-rose-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 uppercase tracking-widest">
            03. Phương Pháp Tiếp Cận &amp; Lựa Chọn Nền Tảng
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Ma Trận Lựa Chọn Nền Tảng &amp; Khảo Sát Nghiệp Vụ (BRD)
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Thay vì vội vã mua phần mềm theo cảm tính, dự án bắt đầu bằng việc thành lập Tổ đặc nhiệm liên phòng ban (Cross-functional Taskforce) gồm CSKH, Kinh doanh, Marketing, IT và Pháp chế để lập Bộ Yêu Cầu Nghiệp Vụ (Business Requirements Document - BRD).
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-bold">
              <tr>
                <th className="p-3.5">Tiêu Chí Đánh Giá</th>
                <th className="p-3.5">SaaS Thương Mại (Salesforce / Zendesk)</th>
                <th className="p-3.5">Phát Triển Nội Bộ (In-house Proprietary)</th>
                <th className="p-3.5">Quyết Định Tối Ưu Được Chọn</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300">
              <tr>
                <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Thời gian triển khai (Time to Market)</td>
                <td className="p-3.5 text-emerald-600 font-medium">Nhanh (2 – 3 tháng)</td>
                <td className="p-3.5 text-rose-600">Rất chậm (9 – 14 tháng)</td>
                <td className="p-3.5 font-bold text-blue-600">SaaS Platform lõi</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Khả năng may đo &amp; tích hợp Core Banking / ERP</td>
                <td className="p-3.5">Hỗ trợ qua REST API / Webhook</td>
                <td className="p-3.5 text-emerald-600 font-medium">Tùy biến 100% theo ý muốn</td>
                <td className="p-3.5 font-bold text-blue-600">SaaS kết hợp Middleware tùy biến</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Chi phí bảo trì &amp; nâng cấp (TCO 3 năm)</td>
                <td className="p-3.5">Chi phí license cố định hàng năm</td>
                <td className="p-3.5 text-rose-600">Tốn đội ngũ Dev bảo trì liên tục</td>
                <td className="p-3.5 font-bold text-blue-600">Tối ưu chi phí dài hạn</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 04: KIẾN TRÚC HỆ THỐNG */}
      <section id="sec-04" className="p-5 sm:p-7 rounded-3xl bg-purple-50/40 dark:bg-slate-900/80 border border-purple-100 dark:border-purple-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
            04. Kiến Trúc Tích Hợp Hệ Thống
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Sơ Đồ Luồng Dữ Liệu Tích Hợp Đa Điểm Chạm (Integration Architecture)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-800/60 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              <PhoneCall className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Tổng Đài Voice CTI</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Tích hợp CTI Connector: Bắt sự kiện chuông reo, tự động bung hồ sơ (Screen Pop-up), nhấp để gọi (Click-to-Call), ghi âm và lưu trữ link cuộc gọi vào Ticket.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/70 dark:border-purple-800/60 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
              <Globe className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Website &amp; Mobile App</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Đồng bộ thông tin đăng ký tài khoản, phiên đăng nhập, lịch sử giỏ hàng, thông báo In-app và trạng thái đơn hàng thời gian thực.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/60 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Mạng Xã Hội (Zalo / FB)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Kết nối Zalo OA, Facebook Messenger, Livechat qua Webhook để gom toàn bộ hội thoại về một Hộp thư hợp nhất trên CRM.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/60 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
              <Database className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Billing &amp; ERP Core</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Đồng bộ lịch sử thanh toán, hóa đơn GTGT, trạng thái công nợ và kích hoạt gói dịch vụ tự động hai chiều qua API.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 05: BỘ CÔNG CỤ TƯƠNG TÁC */}
      <section id="sec-05" className="p-5 sm:p-7 rounded-3xl bg-cyan-50/40 dark:bg-slate-900/80 border border-cyan-100 dark:border-cyan-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 uppercase tracking-widest flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> 05. Bộ Công Cụ Trực Quan &amp; Mô Phỏng Tương Tác
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Trải Nghiệm Thực Tế Hệ Thống CRM 360 &amp; Động Cơ Tự Động Hóa
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Tương tác trực tiếp với hồ sơ khách hàng 360°, chạy thử cơ chế kích hoạt tự động hóa sự kiện và tính toán kế hoạch làm sạch dữ liệu trước Go-Live.
        </p>

        {/* Embedded Interactive Tools Component */}
        <CaseStudy3_1_Tools />
      </section>

      {/* SECTION 06: LỘ TRÌNH TRIỂN KHAI */}
      <section id="sec-06" className="p-5 sm:p-7 rounded-3xl bg-blue-50/40 dark:bg-slate-900/80 border border-blue-100 dark:border-blue-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase tracking-widest">
            06. Lộ Trình Triển Khai 4 Giai Đoạn
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Tiến Trình Chuyển Đổi Trong 16 Tuần Không Làm Gián Đoạn Vận Hành
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">Tuần 1 – 4</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Khảo Sát &amp; Chuẩn Hóa BRD</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Phỏng vấn chuyên sâu các phòng ban, thống kê 100% trường dữ liệu cần quản lý, ký duyệt BRD và lựa chọn giải pháp nền tảng.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">Tuần 5 – 8</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Cấu Hình &amp; Tích Hợp API</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Thiết lập Custom Fields, Ticket Workflows, Automations; viết API kết nối CTI Tổng đài, Web/App, ERP và Cổng thanh toán.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">Tuần 9 – 12</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Data Cleansing &amp; Pilot Test</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Làm sạch hơn 500,000 bản ghi lịch sử, loại bỏ trùng lặp, nạp dữ liệu lên CRM mới và chạy thử nghiệm (Pilot) trên 20 nhân viên.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">Tuần 13 – 16</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Đào Tạo &amp; Go-Live Toàn Diện</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Đào tạo 100% nhân sự kèm bài thi sát hạch thực hành, hỗ trợ on-site ca trực và chính thức chuyển giao hệ thống mới.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 07: MA TRẬN PHÂN CÔNG RACI */}
      <section id="sec-07" className="p-5 sm:p-7 rounded-3xl bg-violet-50/40 dark:bg-slate-900/80 border border-violet-100 dark:border-violet-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 uppercase tracking-widest">
            07. Ma Trận Phân Công RACI
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Phân Định Rõ Trách Nhiệm Giữa Nghiệp Vụ, Kỹ Thuật &amp; Ban Lãnh Đạo
        </h3>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold">
              <tr>
                <th className="p-3">Hạng Mục Công Việc</th>
                <th className="p-3 text-center">Trưởng Dự Án CRM</th>
                <th className="p-3 text-center">Đội Kỹ Thuật / IT</th>
                <th className="p-3 text-center">Team Lead CSKH</th>
                <th className="p-3 text-center">Ban Giám Đốc</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white/50 dark:bg-slate-900/50">
              <tr>
                <td className="p-3 font-medium">Xây dựng BRD &amp; Thiết kế luồng Ticket</td>
                <td className="p-3 text-center font-bold text-blue-600">A (Accountable)</td>
                <td className="p-3 text-center font-semibold text-slate-500">C (Consulted)</td>
                <td className="p-3 text-center font-semibold text-emerald-600">R (Responsible)</td>
                <td className="p-3 text-center text-slate-400">I (Informed)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Phát triển API tích hợp CTI &amp; ERP</td>
                <td className="p-3 text-center font-semibold text-slate-500">C (Consulted)</td>
                <td className="p-3 text-center font-bold text-emerald-600">A / R</td>
                <td className="p-3 text-center text-slate-400">I (Informed)</td>
                <td className="p-3 text-center text-slate-400">I (Informed)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Làm sạch dữ liệu &amp; Nạp dữ liệu cũ</td>
                <td className="p-3 text-center font-bold text-blue-600">A (Accountable)</td>
                <td className="p-3 text-center font-semibold text-emerald-600">R (Responsible)</td>
                <td className="p-3 text-center font-semibold text-slate-500">C (Consulted)</td>
                <td className="p-3 text-center text-slate-400">I (Informed)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Đào tạo &amp; Đánh giá năng lực Agent</td>
                <td className="p-3 text-center font-semibold text-slate-500">C (Consulted)</td>
                <td className="p-3 text-center text-slate-400">I (Informed)</td>
                <td className="p-3 text-center font-bold text-emerald-600">A / R</td>
                <td className="p-3 text-center text-slate-400">I (Informed)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 08: Kết quả & tác động */}
      <section id="sec-08" className="p-5 sm:p-7 rounded-3xl bg-amber-50/40 dark:bg-slate-900/80 border border-amber-100 dark:border-amber-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
            08. Kết Quả Định Lượng Trước &amp; Sau
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Bảng So Sánh Hiệu Quả Vận Hành Trước &amp; Sau Khi Triển Khai CRM
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Thời gian tra cứu hồ sơ (AHT Search)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base line-through text-rose-500 font-semibold">120s</span>
              <span className="text-2xl font-black text-emerald-600">3s</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Giảm 97.5% nhờ CTI Pop-up tự động</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Tỷ lệ giải quyết lần đầu (FCR)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base line-through text-rose-500 font-semibold">62.4%</span>
              <span className="text-2xl font-black text-emerald-600">84.8%</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Agent nắm trọn lịch sử giao dịch tức thì</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Năng suất xử lý ticket / Agent / ngày</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base line-through text-rose-500 font-semibold">45</span>
              <span className="text-2xl font-black text-emerald-600">110+</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Tăng gấp 2.4 lần nhờ Macro &amp; Tự động hóa</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Điểm hài lòng khách hàng (CSAT)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base line-through text-rose-500 font-semibold">3.8/5</span>
              <span className="text-2xl font-black text-emerald-600">4.85/5</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Cá nhân hóa lời chào và thấu hiểu nhu cầu</p>
          </div>
        </div>
      </section>

      {/* SECTION 09: YẾU TỐ THÀNH CÔNG */}
      <section id="sec-09" className="p-5 sm:p-7 rounded-3xl bg-emerald-50/40 dark:bg-slate-900/80 border border-emerald-100 dark:border-emerald-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 uppercase tracking-widest">
            09. Yếu Tố Thành Công Chìa Khóa
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          6 Trụ Cột Đảm Bảo Dự Án CRM Thành Công Vượt Trội
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">1. Sự Đồng Thuận Các Bên</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Lôi kéo sự tham gia của Sales, Marketing, IT ngay từ ngày đầu để tránh xung đột lợi ích dữ liệu.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-500" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">2. Nhu Cầu Rõ Ràng, Ưu Tiên</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Áp dụng phương pháp Agile: Triển khai các tính năng cốt lõi trước, tránh "tham lam" tính năng gây chậm tiến độ.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <div className="flex items-center gap-2">
              <Workflow className="w-4 h-4 text-emerald-500" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">3. Chuẩn Hóa Trước Khi Số Hóa</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Số hóa một quy trình rác chỉ tạo ra rác tự động. Cần tinh gọn và chuẩn hóa SOP trước khi cấu hình lên CRM.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-500" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">4. Dữ Liệu Sạch &amp; Nhất Quán</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Đầu tư nghiêm túc vào khâu Data Cleansing và chuẩn hóa quy tắc nhập liệu để duy trì chất lượng dữ liệu.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-500" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">5. Đào Tạo &amp; Change Management</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Phần mềm chỉ tốt khi nhân viên dùng thành thạo. Kèm cặp 1-1 và ghi nhận các nhân viên thích ứng nhanh.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-rose-500" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">6. Cải Tiến Liên Tục (Kaizen)</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Thu thập feedback hàng tuần từ Agent để tiếp tục tinh chỉnh giao diện, phím tắt và bộ lọc.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 10: BÀI HỌC KINH NGHIỆM */}
      <section id="sec-10" className="p-5 sm:p-7 rounded-3xl bg-teal-50/40 dark:bg-slate-900/80 border border-teal-100 dark:border-teal-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 uppercase tracking-widest">
            10. Bài Học Kinh Nghiệm &amp; Khuyến Nghị Triển Khai
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Những Bài Học Thực Tiễn Dành Cho Doanh Nghiệp Muốn Xây Dựng CRM
        </h3>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-800/60 space-y-1">
            <h4 className="font-bold text-sm text-blue-900 dark:text-blue-300">
              • Đừng biến CRM thành gánh nặng báo cáo hành chính của nhân viên
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Nếu một form tạo ticket bắt nhân viên điền 20 trường thông tin thủ công, họ sẽ chống đối hoặc điền bừa. Hãy tận dụng tối đa API để tự động điền (Auto-fill) ít nhất 70% thông tin.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/70 dark:border-purple-800/60 space-y-1">
            <h4 className="font-bold text-sm text-purple-900 dark:text-purple-300">
              • Phân quyền bảo mật (RBAC) và Audit Trail là yếu tố sống còn
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Dữ liệu tập trung đi kèm rủi ro rò rỉ thông tin. Cần thiết lập phân quyền nghiêm ngặt theo vai trò (Role-based Access Control), ẩn số điện thoại/CMND khách hàng với nhân viên thông thường và lưu nhật ký truy vết 100% lượt tra cứu (Audit Log).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/60 space-y-1">
            <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-300">
              • CRM không phải là một dự án phần mềm một lần, đó là một hành trình văn hóa dữ liệu
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Sức mạnh thực sự của CRM không nằm ở phần mềm đắt tiền, mà nằm ở việc toàn thể công ty cam kết duy trì dữ liệu đúng, đủ, sạch và sống mỗi ngày.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
