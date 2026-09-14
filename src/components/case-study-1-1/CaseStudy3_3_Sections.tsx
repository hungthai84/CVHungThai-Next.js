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
  Award, 
  Database, 
  Filter,
  RefreshCw,
  Building2,
  Calendar,
  AlertTriangle,
  Flame,
  Star,
  Cpu
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";
import { CaseStudy3_3_Tools } from "./CaseStudy3_3_Tools";

export function CaseStudy3_3_Sections({ project }: { project: ProjectCard }) {
  return (
    <div id="article-section" className="space-y-4 md:space-y-5 flex flex-col gap-4 md:gap-5 animate-fadeIn">
      {/* SECTION 01: BỐI CẢNH & VẤN ĐỀ */}
      <section id="sec-01" className="p-5 sm:p-7 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-sky-100 dark:border-sky-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
            01. Bối Cảnh Thực Tế &amp; Vấn Đề
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Sự Phân Mảnh Điểm Chạm (Multichannel Rời Rạc) &amp; Trải Nghiệm Khách Hàng Bị Đứt Đoạn
        </h3>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Khách hàng ngày nay kỳ vọng có thể tương tác với doanh nghiệp qua bất kỳ kênh nào họ muốn, bất cứ lúc nào, và nhận được trải nghiệm nhất quán, liền mạch. Tuy nhiên, mô hình đa kênh cũ (Multichannel) lại tạo ra những "bức tường ngăn cách" lớn:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <Share2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Mỗi Kênh Một Phần Mềm Rời</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Nhân viên phải bật đồng thời ứng dụng Zalo, giao diện Fanpage Facebook, Webmail và phần mềm Softphone. Hội thoại bị trôi, trả lời trùng lặp hoặc bỏ sót tin nhắn của khách hàng.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Khách Hàng Phải Lặp Lại Vấn Đề</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Khi khách nhắn tin trên Zalo không giải quyết xong và phải gọi lên Hotline, nhân viên tổng đài hoàn toàn không biết nội dung khách đã chat trước đó, buộc khách hàng phải trình bày lại từ đầu trong sự bực tức.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Workflow className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Quá Tải Vì Tác Vụ Thủ Công Lặp Lại</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Hơn 45% thời gian của nhân viên bị tiêu tốn cho các câu hỏi đơn giản như "Đơn hàng của tôi đến đâu rồi?", "Làm sao để đổi mật khẩu?", khiến các ca khiếu nại nghiêm trọng bị tắc nghẽn.
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
          Xóa Bỏ Ranh Giới Kênh &amp; Kiến Tạo Trải Nghiệm Khách Hàng Liền Mạch
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Hợp nhất kênh</span>
            <p className="text-h6 text-slate-900 dark:text-white">100% Trên 1 Nền Tảng</p>
            <p className="text-xs text-slate-500">Gom toàn bộ Hotline, Chat, Email, Zalo, Fanpage về một Unified Inbox duy nhất.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">Tự động hóa</span>
            <p className="text-h6 text-slate-900 dark:text-white">45% Tự Phục Vụ (Self-Service)</p>
            <p className="text-xs text-slate-500">AI Chatbot giải quyết tức thì các yêu cầu tra cứu và câu hỏi thường gặp 24/7.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">Tốc độ phản hồi</span>
            <p className="text-h6 text-slate-900 dark:text-white">Giảm 60% Thời Gian FRT</p>
            <p className="text-xs text-slate-500">Tự động định tuyến thông minh (Skill-based Routing) đến đúng chuyên viên phù hợp.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">Năng suất nhân sự</span>
            <p className="text-h6 text-slate-900 dark:text-white">+40% Sản Lượng Xử Lý</p>
            <p className="text-xs text-slate-500">Giảm tối đa thao tác nhập liệu thủ công nhờ Macro 1-chạm và AI Copilot.</p>
          </div>
        </div>
      </section>

      {/* SECTION 03: PHƯƠNG PHÁP TIẾP CẬN */}
      <section id="sec-03" className="p-5 sm:p-7 rounded-3xl bg-rose-50/40 dark:bg-slate-900/80 border border-rose-100 dark:border-rose-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 uppercase tracking-widest">
            03. Phương Pháp Tiếp Cận: Sự Khác Biệt Giữa Multi-channel &amp; Omnichannel
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Chuyển Đổi Từ "Nhiều Kênh Rời Rạc" Sang "Một Trải Nghiệm Hợp Nhất"
        </h3>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold">
              <tr>
                <th className="p-3.5">Tiêu Chí So Sánh</th>
                <th className="p-3.5">Mô Hình Cũ: Multi-channel</th>
                <th className="p-3.5 text-emerald-600 dark:text-emerald-400">Mô Hình Mới: True Omnichannel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300">
              <tr>
                <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Trải nghiệm khách hàng</td>
                <td className="p-3.5 text-rose-600">Bị đứt đoạn, phải lặp lại thông tin khi đổi kênh</td>
                <td className="p-3.5 font-bold text-emerald-600">Liền mạch 100%, bảo lưu lịch sử giao tiếp xuyên kênh</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Giao diện làm việc của Agent</td>
                <td className="p-3.5 text-rose-600">Mở 4 - 6 tab trình duyệt riêng biệt</td>
                <td className="p-3.5 font-bold text-emerald-600">1 Unified Workspace duy nhất cho mọi kênh</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Cơ chế phân phối công việc</td>
                <td className="p-3.5">Nhận việc thủ công, dễ bỏ sót vé</td>
                <td className="p-3.5 font-bold text-emerald-600">Skill-based Routing &amp; Cân bằng tải tự động</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Ứng dụng AI &amp; Tự động hóa</td>
                <td className="p-3.5">Không có hoặc Chatbot trả lời theo kịch bản cứng</td>
                <td className="p-3.5 font-bold text-emerald-600">AI Bot thế hệ mới + Chuyển giao thông minh (Seamless Handoff)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 04: KIẾN TRÚC TÍCH HỢP */}
      <section id="sec-04" className="p-5 sm:p-7 rounded-3xl bg-purple-50/40 dark:bg-slate-900/80 border border-purple-100 dark:border-purple-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
            04. Kiến Trúc Hợp Nhất Đa Điểm Chạm (Omnichannel Architecture)
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Sơ Đồ Kết Nối Đa Kênh Tới Động Cơ Định Tuyến Trung Tâm
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-800/60 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              <PhoneCall className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Voice CTI &amp; IVR</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Nhánh phím IVR phân luồng tự động; popup thông tin khách hàng ngay khi chuông reo; lưu trữ file ghi âm vào thẻ lịch sử.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/70 dark:border-purple-800/60 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Livechat &amp; OTT (Zalo / FB)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Kết nối Webhook thời gian thực; tự động gom tin nhắn từ Zalo OA, Messenger và Webchat về một luồng hội thoại duy nhất.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/60 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              <Mail className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Email to Ticket</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Tự động phân tích tiêu đề và nội dung email để bóc tách thông tin, gán nhãn ưu tiên và gửi thư xác nhận tự động cho khách.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/60 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
              <Globe className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Self-service Help Center</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Cổng tra cứu kiến thức và gửi yêu cầu trực tuyến; kết nối trực tiếp với cơ sở tri thức KB để giải quyết ngay lập tức.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 05: BỘ CÔNG CỤ TƯƠNG TÁC */}
      <section id="sec-05" className="p-5 sm:p-7 rounded-3xl bg-cyan-50/40 dark:bg-slate-900/80 border border-cyan-100 dark:border-cyan-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-widest flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> 05. Bộ Công Cụ Trực Quan &amp; Mô Phỏng Tương Tác
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Trải Nghiệm Thực Tế Hộp Thư Hợp Nhất, Động Cơ Định Tuyến &amp; Chatbot AI
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Tương tác trực tiếp với Hộp thư Omnichannel, thử nghiệm bộ điều khiển phân luồng tự động và trò chuyện với Trợ lý ảo AI.
        </p>

        {/* Embedded Interactive Tools Component */}
        <CaseStudy3_3_Tools />
      </section>

      {/* SECTION 06: LỘ TRÌNH TRIỂN KHAI */}
      <section id="sec-06" className="p-5 sm:p-7 rounded-3xl bg-blue-50/40 dark:bg-slate-900/80 border border-blue-100 dark:border-blue-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase tracking-widest">
            06. Lộ Trình Triển Khai
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          4 Giai Đoạn Hợp Nhất Đa Kênh &amp; Triển Khai Tự Động Hóa
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">Giai Đoạn 1</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Tích Hợp Cổng Giao Tiếp</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Kết nối API Tổng đài Voice, Zalo OA, Fanpage, Email về nền tảng hợp nhất; thử nghiệm nhận và gửi thông điệp hai chiều.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">Giai Đoạn 2</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Cấu Hình Rule Phân Luồng</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Thiết lập ma trận kỹ năng nhân viên (Skill Matrix), quy tắc điều phối theo ngôn ngữ, phân khúc VIP và cơ chế cảnh báo vi phạm SLA.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">Giai Đoạn 3</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Huấn Luyện AI Chatbot</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Xây dựng kịch bản hội thoại tự phục vụ cho Top 10 vấn đề phổ biến nhất; thiết lập cơ chế chuyển giao người thật kèm ngữ cảnh.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">Giai Đoạn 4</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Đào Tạo &amp; Go-Live</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Tổ chức đào tạo sử dụng Unified Workspace cho toàn bộ 80+ nhân sự; theo dõi sát sao tỷ lệ tự giải quyết của Chatbot.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 07: MA TRẬN RACI */}
      <section id="sec-07" className="p-5 sm:p-7 rounded-3xl bg-violet-50/40 dark:bg-slate-900/80 border border-violet-100 dark:border-violet-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 uppercase tracking-widest">
            07. Ma Trận Phân Công RACI
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Phân Định Trách Nhiệm Vận Hành Đa Kênh &amp; Tự Động Hóa
        </h3>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold">
              <tr>
                <th className="p-3">Hạng Mục</th>
                <th className="p-3 text-center">Trưởng Dự Án Omnichannel</th>
                <th className="p-3 text-center">Kỹ Sư AI / Tự Động Hóa</th>
                <th className="p-3 text-center">Team Lead CSKH</th>
                <th className="p-3 text-center">Đối Tác Kênh (Zalo/Telco)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white/50 dark:bg-slate-900/50">
              <tr>
                <td className="p-3 font-medium">Thiết kế kịch bản Chatbot &amp; Cây quyết định</td>
                <td className="p-3 text-center font-bold text-emerald-600">A / R</td>
                <td className="p-3 text-center font-semibold text-slate-500">C</td>
                <td className="p-3 text-center font-semibold text-slate-500">C</td>
                <td className="p-3 text-center text-slate-400">I</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Kết nối Webhook &amp; Cổng API Đa kênh</td>
                <td className="p-3 text-center font-semibold text-slate-500">C</td>
                <td className="p-3 text-center font-bold text-emerald-600">A / R</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center font-semibold text-slate-500">R</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Đào tạo nhân sự thao tác Unified Inbox</td>
                <td className="p-3 text-center font-semibold text-slate-500">C</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center font-bold text-emerald-600">A / R</td>
                <td className="p-3 text-center text-slate-400">I</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 08: KẾT QUẢ ĐỊNH LƯỢNG */}
      <section id="sec-08" className="p-5 sm:p-7 rounded-3xl bg-amber-50/40 dark:bg-slate-900/80 border border-amber-100 dark:border-amber-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
            08. Kết Quả Định Lượng Trước &amp; Sau
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Tác Động Chuyển Đổi Vận Hành Đa Kênh
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Thời gian phản hồi đầu tiên (FRT)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base line-through text-rose-500 font-semibold">15 phút</span>
              <span className="text-2xl font-black text-emerald-600">&lt; 30 giây</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Giảm 60-90% nhờ AI Bot &amp; Định tuyến tự động</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Tỷ lệ tự giải quyết (Self-service Rate)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base line-through text-rose-500 font-semibold">0%</span>
              <span className="text-2xl font-black text-emerald-600">45.2%</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">AI Bot xử lý trọn vẹn không cần con người</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Năng suất nhân viên xử lý</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base line-through text-rose-500 font-semibold">45 vé/ngày</span>
              <span className="text-2xl font-black text-emerald-600">+40%</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Nhờ Macro 1-chạm &amp; AI gợi ý câu trả lời</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Điểm hài lòng CSAT đa kênh</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base line-through text-rose-500 font-semibold">3.6/5</span>
              <span className="text-2xl font-black text-emerald-600">4.7/5 ⭐</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Khách hàng khen ngợi sự nhanh chóng và liền mạch</p>
          </div>
        </div>
      </section>

      {/* SECTION 09: YẾU TỐ THÀNH CÔNG */}
      <section id="sec-09" className="p-5 sm:p-7 rounded-3xl bg-emerald-50/40 dark:bg-slate-900/80 border border-emerald-100 dark:border-emerald-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 uppercase tracking-widest">
            09. Yếu Tố Thành Công Then Chốt
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Nguyên Tắc "Human + AI" Trong Chăm Sóc Khách Hàng Hiện Đại
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">1. AI Để Hỗ Trợ, Không Phải Để Trốn Tránh</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Luôn cung cấp tùy chọn "Gặp nhân viên hỗ trợ" rõ ràng, không làm khách hàng ức chế khi bị kẹt trong vòng lặp của Bot.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">2. Chuyển Giao Trọn Vẹn Ngữ Cảnh (Seamless Handoff)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Khi chuyển từ Bot sang người, toàn bộ thông tin khách vừa trao đổi phải được truyền tải nguyên vẹn cho nhân viên.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">3. Tối Ưu Hóa Kịch Bản Liên Tục</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Rà soát các câu hỏi Bot không trả lời được hàng tuần để bổ sung dữ liệu vào cơ sở tri thức KB.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 10: BÀI HỌC KINH NGHIỆM */}
      <section id="sec-10" className="p-5 sm:p-7 rounded-3xl bg-teal-50/40 dark:bg-slate-900/80 border border-teal-100 dark:border-teal-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
            10. Bài Học Kinh Nghiệm &amp; Tầm Nhìn
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Tương Lai Của Dịch Vụ Khách Hàng Đa Kênh Tự Động
        </h3>

        <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/60 space-y-2">
          <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-300">
            • Omnichannel không đơn thuần là công nghệ, đó là cam kết tôn trọng thời gian của khách hàng
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Bằng việc loại bỏ những rào cản phân mảnh giữa các kênh và trao quyền cho khách hàng tự phục vụ thông qua tự động hóa thông minh, doanh nghiệp không chỉ tiết kiệm được hàng tỷ đồng chi phí vận hành mà còn tạo dựng được mối quan hệ gắn kết và lòng trung thành vững chắc từ phía người tiêu dùng.
          </p>
        </div>
      </section>
    </div>
  );
}
