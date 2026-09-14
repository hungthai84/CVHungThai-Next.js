import React from "react";
import { 
  GraduationCap, 
  Target, 
  Layers, 
  Cpu, 
  Workflow, 
  Calendar, 
  Users2, 
  Award, 
  ShieldCheck, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Video, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  FileText, 
  Building2,
  Flame,
  Star,
  Globe
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";
import { CaseStudy4_1_Tools } from "./CaseStudy4_1_Tools";

export function CaseStudy4_1_Sections({ project }: { project: ProjectCard }) {
  return (
    <div id="article-section" className="space-y-4 md:space-y-5 flex flex-col gap-4 md:gap-5 max-w-5xl mx-auto text-slate-800 dark:text-slate-100">
      
      {/* SECTION 1: BỐI CẢNH & THÁCH THỨC */}
      <section id="sec-01" className="p-5 sm:p-7 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-sky-100 dark:border-sky-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            01
          </div>
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Bối Cảnh Thực Tế</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Sự Cần Thiết Của Việc Chuyển Đổi Sang E-Learning & CS Academy
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <p>
            Trong mô hình đào tạo CSKH truyền thống tại các doanh nghiệp quy mô lớn, việc đào tạo nhân viên mới (Onboarding) và cập nhật kiến thức thường diễn ra trong phòng họp tập trung (Classroom Training). Phương pháp này bộc lộ những rào cản chí mạng:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50">
              <span className="font-bold text-rose-700 dark:text-rose-400 block mb-1">Thời gian kéo dài 28 ngày:</span>
              <p className="text-xs">Nhân sự mới mất gần 1 tháng ngồi nghe giảng lý thuyết mới được bắt đầu nhận cuộc gọi thật, gây tốn kém chi phí cơ hội và gián đoạn vận hành.</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
              <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1">Tài liệu nhanh lỗi thời:</span>
              <p className="text-xs">Mỗi khi sản phẩm thay đổi tính năng hoặc chính sách biểu phí cập nhật, tài liệu in giấy và slide giảng viên không đồng bộ kịp thời, dẫn đến Agent tư vấn sai sót.</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-rose-950/30 border border-purple-200 dark:border-purple-900/50">
              <span className="font-bold text-purple-700 dark:text-purple-400 block mb-1">Thiếu tính linh hoạt & cá nhân hóa:</span>
              <p className="text-xs">Nhân viên làm việc theo ca kíp 24/7 không thể tập hợp đủ mặt để học, giảng viên quá tải và việc đánh giá năng lực còn mang nặng cảm tính.</p>
            </div>
          </div>
          <p>
            Vì vậy, việc kiến tạo <strong>Học Viện Chăm Sóc Khách Hàng (CS Academy)</strong> trên nền tảng <strong>E-Learning</strong> là bước chuyển mình mang tính chiến lược, biến đào tạo từ việc tổ chức sự kiện đơn lẻ thành một hệ sinh thái học tập liên tục, chủ động và có thể đo lường định lượng.
          </p>
        </div>
      </section>

      {/* SECTION 2: MỤC TIÊU & CHỈ SỐ ĐO LƯỜNG */}
      <section id="sec-02" className="p-5 sm:p-7 rounded-3xl bg-indigo-50/40 dark:bg-slate-900/80 border border-indigo-100 dark:border-indigo-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            02
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Định Hướng Chiến Lược</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Mục Tiêu Trọng Tâm & Ma Trận KPI Đào Tạo
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block mb-1">Rút Ngắn Onboarding</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">9 Ngày</div>
            <p className="text-xs text-slate-500 mt-1">Giảm từ 28 ngày xuống 9 ngày (nhanh hơn 67.8%).</p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Tỷ Lệ Hoàn Thành</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">96.4%</div>
            <p className="text-xs text-slate-500 mt-1">Hoàn thành 100% các khóa học bắt buộc đúng hạn.</p>
          </div>
          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block mb-1">Tiết Kiệm Ngân Sách</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">45-60%</div>
            <p className="text-xs text-slate-500 mt-1">Cắt giảm chi phí in ấn, thuê địa điểm và giờ giảng.</p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block mb-1">QA Score Đạt Chuẩn</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">&gt; 92%</div>
            <p className="text-xs text-slate-500 mt-1">Điểm chất lượng cuộc gọi tháng đầu tiên của Agent mới.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: KHUNG CHƯƠNG TRÌNH ĐÀO TẠO */}
      <section id="sec-03" className="p-5 sm:p-7 rounded-3xl bg-rose-50/40 dark:bg-slate-900/80 border border-rose-100 dark:border-rose-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            03
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Phương Pháp Tiếp Cận</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Cấu Trúc Khung Chương Trình Đào Tạo 5 Module
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <p>
            Chương trình được chuẩn hóa theo mô hình phân tầng bậc thang (Scaffolding Pedagogy), giúp nhân viên tiếp thu từ tư duy cốt lõi đến kỹ năng thực chiến nâng cao:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3.5">Module</th>
                  <th className="p-3.5">Tên Chương Trình</th>
                  <th className="p-3.5">Mục Tiêu Đầu Ra</th>
                  <th className="p-3.5">Định Dạng Học Liệu</th>
                  <th className="p-3.5">Thời Lượng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-blue-600">Module 01</td>
                  <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Hòa nhập cho nhân viên mới</td>
                  <td className="p-3.5">Hiểu rõ văn hóa Customer-Centric, quy chuẩn đạo đức và tác phong</td>
                  <td className="p-3.5">Video 4K + Slide SCORM</td>
                  <td className="p-3.5">45 Phút</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-indigo-600">Module 02</td>
                  <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Quy trình xử lý khiếu nại</td>
                  <td className="p-3.5">Làm chủ mô hình L.A.S.T và kỹ năng hạ nhiệt khách hàng giận dữ</td>
                  <td className="p-3.5">Case Study + Video đóng vai</td>
                  <td className="p-3.5">60 Phút</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-emerald-600">Module 03</td>
                  <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Kỹ năng giao tiếp qua điện thoại</td>
                  <td className="p-3.5">Làm chủ cao độ giọng nói, nụ cười thoại và câu hỏi gợi mở 5W1H</td>
                  <td className="p-3.5">Audio Lab + Thực hành giả lập</td>
                  <td className="p-3.5">50 Phút</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-purple-600">Module 04</td>
                  <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Sử dụng hệ thống CRM & CTI</td>
                  <td className="p-3.5">Thành thạo tra cứu hồ sơ 360°, gắn tag, chèn Macro và đóng ticket</td>
                  <td className="p-3.5">Interactive Screen Sandbox</td>
                  <td className="p-3.5">75 Phút</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-amber-600">Module 05</td>
                  <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Cập nhật sản phẩm & chính sách</td>
                  <td className="p-3.5">Nắm bắt tính năng app mới, chính sách hoàn tiền và biểu phí cập nhật</td>
                  <td className="p-3.5">Micro-learning 3 phút + Quiz</td>
                  <td className="p-3.5">30 Phút/tháng</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 4: SỐ HÓA NỘI DUNG & NỀN TẢNG LMS */}
      <section id="sec-04" className="p-5 sm:p-7 rounded-3xl bg-purple-50/40 dark:bg-slate-900/80 border border-purple-100 dark:border-purple-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            04
          </div>
          <div>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">Kiến Trúc Kỹ Thuật</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Số Hóa Nội Dung Đa Dạng & Triển Khai LMS Doanh Nghiệp
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300">
          <div className="p-5 rounded-2xl bg-purple-500/10 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/60 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Video className="w-4 h-4 text-purple-600" /> 5 Định Dạng Số Hóa Nội Dung
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Video Hướng Dẫn Ngắn (Micro-learning):</strong> Các video 3-5 phút cô đọng kiến thức, dễ xem trên điện thoại khi di chuyển.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Slide Tương Tác (SCORM / xAPI):</strong> Cho phép người học nhấp chọn câu trả lời trực tiếp trên slide bài giảng.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Bài Trắc Nghiệm Tức Thì (Quiz):</strong> Củng cố ghi nhớ ngay sau mỗi chương với giải thích nguyên lý chi tiết.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Tình Huống Thực Tế (Case Study & Role-play):</strong> Ghi âm các ca xử lý xuất sắc để học viên phân tích.</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-blue-500/10 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600" /> Nền Tảng Quản Lý Học Tập (LMS)
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span><strong>Quản trị khóa học tập trung:</strong> Phân quyền lộ trình học tự động theo vai trò (Tuyến 1, Tuyến 2, QA, Lead).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span><strong>Theo dõi tiến độ thời gian thực:</strong> Dashboard cho Quản lý biết chính xác % hoàn thành của từng nhân viên.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span><strong>Tự động cấp chứng chỉ số:</strong> Khóa học kết thúc thành công sẽ tự kích hoạt cấp chứng chỉ chuẩn xác thực.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span><strong>Học mọi lúc mọi nơi (Mobile App):</strong> Hỗ trợ ứng dụng di động cho nhân viên học chủ động ngoài giờ trực.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 5: CÔNG CỤ THỰC NGHIỆM */}
      <section id="sec-05" className="p-5 sm:p-7 rounded-3xl bg-cyan-50/40 dark:bg-slate-900/80 border border-cyan-100 dark:border-cyan-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            05
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">Trải Nghiệm Tương Tác</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Hệ Thống Mô Phỏng Học Viện CSKH & Đo Lường ROI
            </h2>
          </div>
        </div>

        <CaseStudy4_1_Tools />
      </section>

      {/* SECTION 6: LỘ TRÌNH TRIỂN KHAI */}
      <section id="sec-06" className="p-5 sm:p-7 rounded-3xl bg-blue-50/40 dark:bg-slate-900/80 border border-blue-100 dark:border-blue-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            06
          </div>
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Thực Thi Chiến Lược</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Lộ Trình 4 Giai Đoạn Chuyển Đổi Sang E-Learning
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-3xs font-bold">Giai đoạn 1</span>
            <h3 className="font-bold text-slate-900 dark:text-white text-xs">Khảo Sát & Khung Năng Lực</h3>
            <p className="text-2xs text-slate-600 dark:text-slate-400">
              Xác định khoảng cách kỹ năng (Skill Gap), chuẩn hóa từ điển năng lực và thiết kế đề cương 5 module.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-3xs font-bold">Giai đoạn 2</span>
            <h3 className="font-bold text-slate-900 dark:text-white text-xs">Số Hóa & Triển Khai LMS</h3>
            <p className="text-2xs text-slate-600 dark:text-slate-400">
              Sản xuất video bài giảng, đóng gói SCORM, triển khai máy chủ LMS và kiểm thử bảo mật người dùng.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50 space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-600 text-white text-3xs font-bold">Giai đoạn 3</span>
            <h3 className="font-bold text-slate-900 dark:text-white text-xs">Thử Nghiệm & Tích Hợp HR</h3>
            <p className="text-2xs text-slate-600 dark:text-slate-400">
              Chạy thí điểm cho 2 khóa tân tuyển, hiệu chuẩn nội dung và liên kết tín chỉ học tập với quy chế tăng lương/thăng chức.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-3xs font-bold">Giai đoạn 4</span>
            <h3 className="font-bold text-slate-900 dark:text-white text-xs">Vận Hành Toàn Diện</h3>
            <p className="text-2xs text-slate-600 dark:text-slate-400">
              Mở rộng 100% phòng ban, thiết lập văn hóa học tập tự nguyện và định kỳ cập nhật bài giảng hàng tháng.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: MA TRẬN TRÁCH NHIỆM RACI */}
      <section id="sec-07" className="p-5 sm:p-7 rounded-3xl bg-violet-50/40 dark:bg-slate-900/80 border border-violet-100 dark:border-violet-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            07
          </div>
          <div>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">Quản Trị Tổ Chức</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Ma Trận Phân Định Trách Nhiệm RACI
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                <th className="p-3">Hạng Mục Công Việc</th>
                <th className="p-3 text-center">Head of CS</th>
                <th className="p-3 text-center">Training Lead</th>
                <th className="p-3 text-center">Instructional Designer</th>
                <th className="p-3 text-center">IT / LMS Admin</th>
                <th className="p-3 text-center">QA Specialist</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="p-3 font-semibold">Phê duyệt khung năng lực & ngân sách</td>
                <td className="p-3 text-center font-bold text-blue-600">A</td>
                <td className="p-3 text-center font-bold text-emerald-600">R</td>
                <td className="p-3 text-center text-slate-400">C</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center text-slate-400">C</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Biên soạn kịch bản bài giảng & SOP</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center font-bold text-blue-600">A</td>
                <td className="p-3 text-center font-bold text-emerald-600">R</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center font-bold text-amber-600">C</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Sản xuất video, SCORM & câu hỏi Quiz</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center font-bold text-blue-600">A</td>
                <td className="p-3 text-center font-bold text-emerald-600">R</td>
                <td className="p-3 text-center text-slate-400">C</td>
                <td className="p-3 text-center text-slate-400">C</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Cài đặt, bảo mật & tích hợp hệ thống LMS</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center text-slate-400">C</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center font-bold text-emerald-600">R / A</td>
                <td className="p-3 text-center text-slate-400">I</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Đo lường chất lượng sau đào tạo (QA Audit)</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center font-bold text-amber-600">C</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center font-bold text-emerald-600">R / A</td>
              </tr>
            </tbody>
          </table>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 text-3xs text-slate-500 flex gap-4">
            <span><strong>R:</strong> Responsible (Thực hiện)</span>
            <span><strong>A:</strong> Accountable (Chịu trách nhiệm)</span>
            <span><strong>C:</strong> Consulted (Tham vấn)</span>
            <span><strong>I:</strong> Informed (Nhận thông tin)</span>
          </div>
        </div>
      </section>

      {/* SECTION 8: KẾT QUẢ ĐỊNH LƯỢNG */}
      <section id="sec-08" className="p-5 sm:p-7 rounded-3xl bg-amber-50/40 dark:bg-slate-900/80 border border-amber-100 dark:border-amber-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            08
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">Thành Tựu Đạt Được</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Kết Quả Định Lượng & Tác Động Kinh Doanh
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 space-y-2">
            <span className="text-xs font-bold text-emerald-600 uppercase">Hiệu Quả Vận Hành</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">-67.8%</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Thời gian đưa một nhân viên mới vào vận hành thực tế rút ngắn từ 28 ngày xuống 9 ngày.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/50 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase">Tiết Kiệm Chi Phí</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">1.8 Tỷ VNĐ/Năm</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Cắt giảm chi phí tổ chức lớp học tập trung và giờ làm thêm cho giảng viên nội bộ.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/50 space-y-2">
            <span className="text-xs font-bold text-purple-600 uppercase">Giữ Chân Nhân Tài</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">-42% Turnover</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Tỷ lệ nghỉ việc của nhân viên CSKH giảm mạnh nhờ lộ trình thăng tiến nghề nghiệp minh bạch.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9: YẾU TỐ THEN CHỐT */}
      <section id="sec-09" className="p-5 sm:p-7 rounded-3xl bg-emerald-50/40 dark:bg-slate-900/80 border border-emerald-100 dark:border-emerald-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
            09
          </div>
          <div>
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest">Yếu Tố Thành Công</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Nguyên Tắc Then Chốt Để E-Learning Không Trở Thành Hình Thức
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block text-sm">1. Micro-learning thay vì khóa học dài lê thê</span>
            <p>Tuyệt đối không đưa bài giảng 2-3 tiếng lên hệ thống. Tách nhỏ thành các bài học 3-5 phút giải quyết đúng 1 vấn đề cụ thể.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block text-sm">2. Gắn chặt với quyền lợi thăng tiến</span>
            <p>Chứng chỉ LMS phải là điều kiện tiên quyết trong xét bậc lương và nâng cấp từ Agent lên Senior/Team Lead.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block text-sm">3. Môi trường giả lập an toàn (Sandbox)</span>
            <p>Cho phép nhân viên thao tác thử nghiệm trên hệ thống phần mềm ảo trước khi chính thức tiếp xúc với khách hàng thật.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block text-sm">4. Vòng lặp cập nhật liên tục (Continuous Loop)</span>
            <p>Các lỗi sai phổ biến được đội QA phát hiện hàng tuần phải được số hóa thành bài học micro-quiz cập nhật ngay trên LMS.</p>
          </div>
        </div>
      </section>

      {/* SECTION 10: BÀI HỌC KINH NGHIỆM */}
      <section id="sec-10" className="p-5 sm:p-7 rounded-3xl bg-teal-50/40 dark:bg-slate-900/80 border border-teal-100 dark:border-teal-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            10
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Đúc Kết & Lan Tỏa</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Bài Học Kinh Nghiệm Quý Giá
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <blockquote className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border-l-4 border-blue-600 text-slate-800 dark:text-slate-200 italic">
            "Đào tạo trực tuyến không phải là thay thế con người bằng máy móc, mà là giải phóng con người khỏi những công việc truyền đạt lý thuyết lặp đi lặp lại để dành thời gian quý báu cho việc huấn luyện thấu cảm và truyền cảm hứng phục vụ."
          </blockquote>
          <p>
            Việc xây dựng Học Viện CSKH E-Learning đã tạo nền tảng vững chắc để tổ chức mở rộng quy mô từ hàng chục lên hàng trăm nhân sự mà chất lượng phục vụ vẫn giữ vững tính đồng nhất, chuyên nghiệp và chuẩn mực.
          </p>
        </div>
      </section>

    </div>
  );
}
