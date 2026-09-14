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
  FileText, 
  Award, 
  Database, 
  Filter, 
  FileSpreadsheet,
  Check,
  Building2,
  Calendar,
  AlertTriangle,
  Flame,
  Star,
  Eye,
  Sliders,
  Mail
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";
import { CaseStudy3_2_Tools } from "./CaseStudy3_2_Tools";

export function CaseStudy3_2_Sections({ project }: { project: ProjectCard }) {
  return (
    <div id="article-section" className="space-y-4 md:space-y-5 flex flex-col gap-4 md:gap-5 animate-fadeIn">
      {/* SECTION 01: BỐI CẢNH & VẤN ĐỀ */}
      <section id="sec-01" className="p-5 sm:p-7 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-sky-100 dark:border-sky-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 uppercase tracking-widest">
            01. Bối Cảnh Thực Tế &amp; Thách Thức
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Thực Trạng "Mù Dữ Liệu" &amp; Sự Phụ Thuộc Vào Báo Cáo Excel Thủ Công
        </h3>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Dữ liệu chỉ thực sự có giá trị khi nó được chuyển hóa thành thông tin chi tiết (insight) và hỗ trợ cho việc ra quyết định. Trước khi xây dựng hệ thống phân tích &amp; báo cáo BI toàn diện, doanh nghiệp rơi vào tình trạng "mù số" nghiêm trọng:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Tổng Hợp Excel Thủ Công &amp; Trễ Hạn</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Mỗi tuần, các Team Lead phải mất 15-20 giờ làm việc để gom file Excel từ 4 nguồn khác nhau. Khi báo cáo đến tay Ban Giám đốc thì số liệu đã trễ 3-5 ngày, không còn giá trị can thiệp.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Không Giám Sát Được Thời Gian Thực</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Tổng đài bị nghẽn mạch hoặc có đợt bùng nổ khiếu nại do sự cố phần mềm nhưng cấp quản lý chỉ phát hiện ra khi khách hàng đã phản ứng dữ dội trên mạng xã hội.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Đánh Giá Nhân Viên Theo Cảm Tính</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Thiếu bộ chỉ số KPI minh bạch (Volume, AHT, CSAT, QA Score), dẫn đến việc đánh giá nhân viên thiếu khách quan và gây bất đồng nội bộ.
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
          Kiến Tạo Hệ Thống Báo Cáo Thời Gian Thực &amp; Ra Quyết Định Dựa Trên Dữ Liệu
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">Real-time Wallboard</span>
            <p className="text-base font-extrabold text-slate-900 dark:text-white">Độ trễ &lt; 2 Giây</p>
            <p className="text-xs text-slate-500">Giám sát liên tục lưu lượng ticket, thời gian chờ, nhân viên online và cảnh báo SLA.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">Báo cáo nhân viên</span>
            <p className="text-base font-extrabold text-slate-900 dark:text-white">Weekly 360° Scorecard</p>
            <p className="text-xs text-slate-500">Tự động xuất bảng xếp hạng và phát hiện nhu cầu đào tạo kèm cặp.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Phân tích CX</span>
            <p className="text-base font-extrabold text-slate-900 dark:text-white">Pareto Root Cause</p>
            <p className="text-xs text-slate-500">Tìm ra 20% nguyên nhân gốc rễ gây ra 80% sự bức xúc của khách hàng.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">Tự động hóa báo cáo</span>
            <p className="text-base font-extrabold text-slate-900 dark:text-white">100% Không Excel Thủ Công</p>
            <p className="text-xs text-slate-500">Tiết kiệm 80+ giờ làm việc mỗi tháng cho toàn bộ đội ngũ quản lý.</p>
          </div>
        </div>
      </section>

      {/* SECTION 03: PHƯƠNG PHÁP TIẾP CẬN */}
      <section id="sec-03" className="p-5 sm:p-7 rounded-3xl bg-rose-50/40 dark:bg-slate-900/80 border border-rose-100 dark:border-rose-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 uppercase tracking-widest">
            03. Phương Pháp Tiếp Cận &amp; Tháp Chỉ Số Đo Lường
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Tháp Chỉ Số Đo Lường 3 Tầng: Vận Hành • Hiệu Suất • Trải Nghiệm Khách Hàng
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-600 uppercase">Tầng 1: Vận Hành (Operational)</span>
              <span className="text-3xs bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-mono">Real-time</span>
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Chỉ Số Sức Khỏe Hàng Đợi</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-4">
              <li>Lưu lượng cuộc gọi &amp; ticket đang chờ (Backlog)</li>
              <li>Thời gian phản hồi đầu tiên (FRT) &amp; Thời gian chờ TB (ASA)</li>
              <li>Tỷ lệ nhân viên bận rộn (Occupancy Rate &amp; Adherence)</li>
              <li>Số lượng cảnh báo vi phạm cam kết SLA</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-600 uppercase">Tầng 2: Nhân Sự (Agent KPI)</span>
              <span className="text-3xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-mono">Weekly</span>
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Chỉ Số Năng Suất &amp; Chất Lượng</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-4">
              <li>Sản lượng ticket xử lý thành công (Resolved Volume)</li>
              <li>Thời gian xử lý trung bình mỗi vụ việc (AHT)</li>
              <li>Điểm kiểm soát chất lượng nghiệp vụ (QA Audit Score)</li>
              <li>Điểm đánh giá hài lòng trực tiếp theo nhân viên (Agent CSAT)</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600 uppercase">Tầng 3: Trải Nghiệm (Strategic CX)</span>
              <span className="text-3xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">Monthly</span>
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Chỉ Số Cảm Xúc &amp; Lòng Trung Thành</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-4">
              <li>Điểm hài lòng tổng thể CSAT (Customer Satisfaction)</li>
              <li>Chỉ số đo lường nỗ lực của khách hàng CES (Customer Effort Score)</li>
              <li>Chỉ số người ủng hộ thương hiệu NPS (Net Promoter Score)</li>
              <li>Ma trận phân loại nguyên nhân gốc rễ (Root Cause Driver)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 04: KIẾN TRÚC PIPELINE & BI */}
      <section id="sec-04" className="p-5 sm:p-7 rounded-3xl bg-purple-50/40 dark:bg-slate-900/80 border border-purple-100 dark:border-purple-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
            04. Kiến Trúc Data Pipeline &amp; Công Cụ BI
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Luồng Xử Lý Dữ Liệu Tự Động Từ Nguồn Tới Báo Cáo Điều Hành
        </h3>

        <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Nguồn Dữ Liệu (Sources)</span>
            <ArrowRight className="w-4 h-4 text-sky-500" />
            <span>Xử Lý &amp; Kho Dữ Liệu (ETL / DWH)</span>
            <ArrowRight className="w-4 h-4 text-sky-500" />
            <span>Trực Quan Hóa (Power BI / Looker)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <strong className="text-slate-800 dark:text-slate-200 block mb-1">1. Đa Nguồn Phân Tán</strong>
              <p className="text-slate-600 dark:text-slate-400">CRM Ticket, Call CDRs, Chat Transcripts, Survey CSAT, Billing Database.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <strong className="text-slate-800 dark:text-slate-200 block mb-1">2. ETL Tự Động Định Kỳ</strong>
              <p className="text-slate-600 dark:text-slate-400">Làm sạch, khử trùng, gắn nhãn định danh khách hàng 360 và tổng hợp chỉ số.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <strong className="text-slate-800 dark:text-slate-200 block mb-1">3. Trực Quan Hóa Tức Thời</strong>
              <p className="text-slate-600 dark:text-slate-400">Wallboard màn hình LED phòng ca, Dashboard trên Mobile cho Ban Giám đốc.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05: BỘ CÔNG CỤ TƯƠNG TÁC */}
      <section id="sec-05" className="p-5 sm:p-7 rounded-3xl bg-cyan-50/40 dark:bg-slate-900/80 border border-cyan-100 dark:border-cyan-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 uppercase tracking-widest flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> 05. Bộ Công Cụ Trực Quan &amp; Báo Cáo Tương Tác
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Trải Nghiệm Trực Quan Dashboard Vận Hành, Bảng Điểm Nhân Viên &amp; Phân Tích Pareto
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Chuyển đổi giữa 3 giao diện phân tích thực tế: Live Wallboard, Weekly Agent Leaderboard và Ma trận phân tích nguyên nhân gốc rễ để thấy rõ sức mạnh của quản trị dữ liệu.
        </p>

        {/* Embedded Interactive Tools Component */}
        <CaseStudy3_2_Tools />
      </section>

      {/* SECTION 06: LỘ TRÌNH TRIỂN KHAI */}
      <section id="sec-06" className="p-5 sm:p-7 rounded-3xl bg-blue-50/40 dark:bg-slate-900/80 border border-blue-100 dark:border-blue-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase tracking-widest">
            06. Lộ Trình Triển Khai
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          4 Giai Đoạn Xây Dựng Hệ Thống Phân Tích &amp; BI Tự Động
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300">Giai Đoạn 1</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Định Nghĩa Dictionary Chỉ Số</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Chuẩn hóa công thức tính toán AHT, FRT, FCR, CSAT, QA giữa các phòng ban để đảm bảo tính nhất quán của số liệu.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">Giai Đoạn 2</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Xây Dựng Data Pipeline</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Kết nối cơ sở dữ liệu các hệ thống, thiết lập luồng trích xuất tự động và cấu hình Data Warehouse trung tâm.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">Giai Đoạn 3</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Thiết Kế BI Dashboard</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Thiết kế giao diện Live Wallboard, Executive Dashboard và Weekly Scorecard trên nền tảng Power BI / Looker Studio.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">Giai Đoạn 4</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Vận Hành &amp; Action-trigger</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Đưa vào sử dụng trong các cuộc họp giao ban hàng ngày; thiết lập cơ chế gửi cảnh báo tự động khi chỉ số vi phạm ngưỡng.
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
          Phân Định Trách Nhiệm Vận Hành Hệ Thống Báo Cáo
        </h3>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold">
              <tr>
                <th className="p-3">Hạng Mục Quản Trị</th>
                <th className="p-3 text-center">CX Analytics Lead</th>
                <th className="p-3 text-center">Data Engineer</th>
                <th className="p-3 text-center">Team Lead CSKH</th>
                <th className="p-3 text-center">C-Level / Ban Giám Đốc</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white/50 dark:bg-slate-900/50">
              <tr>
                <td className="p-3 font-medium">Giám sát Real-time Wallboard &amp; Điều phối ca</td>
                <td className="p-3 text-center font-semibold text-slate-500">C</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center font-bold text-emerald-600">A / R</td>
                <td className="p-3 text-center text-slate-400">I</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Duy trì độ ổn định Pipeline &amp; Kết nối DWH</td>
                <td className="p-3 text-center font-semibold text-slate-500">C</td>
                <td className="p-3 text-center font-bold text-emerald-600">A / R</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center text-slate-400">I</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Phân tích chuyên sâu CX &amp; Họp cải tiến liên phòng ban</td>
                <td className="p-3 text-center font-bold text-blue-600">A / R</td>
                <td className="p-3 text-center font-semibold text-slate-500">C</td>
                <td className="p-3 text-center font-semibold text-slate-500">C</td>
                <td className="p-3 text-center font-bold text-amber-600">C / I</td>
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
          Tác Động Chuyển Đổi Vận Hành Dựa Trên Dữ Liệu
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Thời gian lập báo cáo tuần</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base line-through text-rose-500 font-semibold">18 giờ</span>
              <span className="text-2xl font-black text-emerald-600">0 giây</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Tự động hóa 100% bằng Power BI Pipeline</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Tỷ lệ đạt SLA cuộc gọi &amp; chat</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base line-through text-rose-500 font-semibold">78.5%</span>
              <span className="text-2xl font-black text-emerald-600">96.2%</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Phát hiện và điều phối ca kịp thời</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Thời gian phát hiện sự cố hệ thống</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base line-through text-rose-500 font-semibold">4 giờ</span>
              <span className="text-2xl font-black text-emerald-600">3 phút</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Cảnh báo tự động khi lượng ticket tăng bất thường</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Điểm chất lượng QA trung bình</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base line-through text-rose-500 font-semibold">76%</span>
              <span className="text-2xl font-black text-emerald-600">92%</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Phản hồi và đào tạo chính xác theo điểm yếu</p>
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
          Chuyển Đổi Từ "Xem Báo Cáo" Sang "Hành Động Theo Dữ Liệu"
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">1. Quản Trị Dựa Trên Dữ Liệu Thực</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Loại bỏ hoàn toàn các nhận định cảm tính như "hôm nay có vẻ đông khách", thay bằng các con số định lượng chính xác.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">2. Trực Quan Hóa Thân Thiện</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Thiết kế Dashboard theo nguyên tắc 5 giây: Nhìn vào là biết ngay tình trạng tốt (Xanh), cảnh báo (Vàng), nguy hiểm (Đỏ).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">3. Gắn Dữ Liệu Với Trách Nhiệm</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Mỗi chỉ số báo cáo đều có một đầu mối chịu trách nhiệm cải tiến rõ ràng, tránh tình trạng "báo cáo xong để đó".
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 10: BÀI HỌC KINH NGHIỆM */}
      <section id="sec-10" className="p-5 sm:p-7 rounded-3xl bg-teal-50/40 dark:bg-slate-900/80 border border-teal-100 dark:border-teal-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 uppercase tracking-widest">
            10. Bài Học Kinh Nghiệm &amp; Tầm Nhìn
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Biến Dữ Liệu CSKH Thành Tài Sản Chiến Lược Của Doanh Nghiệp
        </h3>

        <div className="p-5 rounded-2xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200/70 dark:border-sky-800/60 space-y-2">
          <h4 className="font-bold text-sm text-sky-900 dark:text-sky-300">
            • CSKH không chỉ là trung tâm chi phí (Cost Center), mà là mỏ vàng Insight của doanh nghiệp
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Hàng trăm ngàn cuộc gọi và tin nhắn hỗ trợ mỗi tháng chính là tiếng nói chân thực nhất của người dùng. Một hệ thống phân tích &amp; báo cáo toàn diện giúp biến các khiếu nại thành đề xuất cải tiến sản phẩm, ngăn ngừa rủi ro rời bỏ khách hàng và tạo ra lợi thế cạnh tranh bền vững cho doanh nghiệp.
          </p>
        </div>
      </section>
    </div>
  );
}
