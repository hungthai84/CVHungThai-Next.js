import React from "react";
import { 
  Compass, 
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
  Briefcase, 
  GraduationCap, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  FileText, 
  Building2,
  Flame,
  Star,
  Gem,
  HeartHandshake
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";
import { CaseStudy4_2_Tools } from "./CaseStudy4_2_Tools";

export function CaseStudy4_2_Sections({ project }: { project: ProjectCard }) {
  return (
    <div id="article-section" className="space-y-4 md:space-y-5 flex flex-col gap-4 md:gap-5 max-w-5xl mx-auto text-slate-800 dark:text-slate-100">
      
      {/* SECTION 1: BỐI CẢNH & THÁCH THỨC */}
      <section id="sec-01" className="p-5 sm:p-7 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-sky-100 dark:border-sky-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            01
          </div>
          <div>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">Bối Cảnh Thực Tế</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Nghịch Lý Ngành CSKH: Tỷ Lệ Nhảy Việc Cao & Thiếu Hụt Lộ Trình Nghề Nghiệp Rõ Ràng
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <p>
            Trong nhiều năm, vị trí Chăm sóc Khách hàng thường bị xem là một "công việc tạm bợ" (stopgap job) dành cho sinh viên mới ra trường trước khi tìm được công việc khác. Doanh nghiệp phải đối mặt với 3 thách thức nhức nhối:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50">
              <span className="font-bold text-rose-700 dark:text-rose-400 block mb-1">Tỷ lệ nghỉ việc (Turnover) lên tới 40-50%/năm:</span>
              <p className="text-xs">Chi phí tuyển dụng và đào tạo người mới liên tục đốt cháy ngân sách mà chất lượng dịch vụ luôn bấp bênh.</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
              <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1">Đánh giá thăng tiến mang tính cảm tính:</span>
              <p className="text-xs">Không có tiêu chí rõ ràng, việc tăng lương hay lên vị trí mới phụ thuộc vào sự ưu ái chủ quan của Quản lý trực tiếp.</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-rose-950/30 border border-purple-200 dark:border-purple-900/50">
              <span className="font-bold text-purple-700 dark:text-purple-400 block mb-1">Bế tắc con đường phát triển chuyên môn:</span>
              <p className="text-xs">Những nhân sự giỏi nghiệp vụ nhưng không có khiếu làm sếp quản lý người thì không có cơ hội thăng tiến và tăng lương xứng đáng.</p>
            </div>
          </div>
          <p>
            Dự án thiết lập <strong>Khung Năng Lực ASK & Lộ Trình Thăng Tiến Kép (Dual Career Ladder)</strong> được triển khai nhằm tái cấu trúc toàn diện chính sách nhân tài, biến khối CSKH thành cái nôi ươm mầm lãnh đạo và chuyên gia xuất sắc cho toàn tập đoàn.
          </p>
        </div>
      </section>

      {/* SECTION 2: MỤC TIÊU & CHỈ SỐ ĐO LƯỜNG */}
      <section id="sec-02" className="p-5 sm:p-7 rounded-3xl bg-indigo-50/40 dark:bg-slate-900/80 border border-indigo-100 dark:border-indigo-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            02
          </div>
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Định Hướng Chiến Lược</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Mục Tiêu Phát Triển Nhân Tài & Chỉ Số KPI Dự Án
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block mb-1">Tỷ Lệ Bổ Nhiệm Nội Bộ</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">85.4%</div>
            <p className="text-xs text-slate-500 mt-1">Các vị trí Lead, QA, Trainer và Manager được cất nhắc từ Agent.</p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Giảm Tỷ Lệ Nhảy Việc</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">-60%</div>
            <p className="text-xs text-slate-500 mt-1">Tỷ lệ thôi việc giảm từ 45% xuống mức ổn định 14%/năm.</p>
          </div>
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block mb-1">Độ Phủ Kế Hoạch IDP</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">100%</div>
            <p className="text-xs text-slate-500 mt-1">Mỗi nhân sự đều có bản kế hoạch phát triển cá nhân riêng biệt.</p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block mb-1">Điểm Gắn Kết Nhân Viên (eNPS)</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">+74 Điểm</div>
            <p className="text-xs text-slate-500 mt-1">Mức độ tự hào và yêu mến tổ chức đạt đỉnh cao trong khảo sát nội bộ.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: TỪ ĐIỂN NĂNG LỰC ASK */}
      <section id="sec-03" className="p-5 sm:p-7 rounded-3xl bg-rose-50/40 dark:bg-slate-900/80 border border-rose-100 dark:border-rose-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            03
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Khung Năng Lực Chuẩn Hóa</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Mô Hình ASK: Attitude (Thái Độ) – Skill (Kỹ Năng) – Knowledge (Kiến Thức)
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <p>
            Mọi chức danh trong phòng CSKH đều được định lượng và chuẩn hóa hành vi cụ thể dựa trên 3 trụ cột năng lực cốt lõi:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-2">
              <span className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                <Star className="w-4 h-4" /> 1. Attitude (Thái Độ - 40% Trọng Số)
              </span>
              <p className="text-xs">
                Tinh thần phụng sự, sự thấu cảm chân thành, tính kỷ luật ca trực, lòng trung thực và khả năng chịu đựng áp lực tâm lý trong môi trường tiếp xúc liên tục với khách hàng khó tính.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2">
              <span className="font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> 2. Skill (Kỹ Năng - 35% Trọng Số)
              </span>
              <p className="text-xs">
                Kỹ năng đàm phán giải quyết khiếu nại, kỹ năng gõ phím & thao tác phần mềm đa nhiệm, lắng nghe chủ động, phân tích nguyên nhân gốc rễ và kỹ năng huấn luyện kèm cặp đồng đội.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" /> 3. Knowledge (Kiến Thức - 25% Trọng Số)
              </span>
              <p className="text-xs">
                Sự am hiểu sâu sắc về sản phẩm, chính sách bồi hoàn, các quy định pháp luật liên quan, hệ thống viễn thông CTI và các tiêu chuẩn kiểm toán chất lượng quốc tế COPC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: LỘ TRÌNH THĂNG TIẾN KÉP */}
      <section id="sec-04" className="p-5 sm:p-7 rounded-3xl bg-purple-50/40 dark:bg-slate-900/80 border border-purple-100 dark:border-purple-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            04
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Kiến Trúc Nhân Sự</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Mô Hình Lộ Trình Kép: Nhánh Quản Lý vs Nhánh Chuyên Gia (Dual Career Ladder)
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <p>
            Nhằm giải quyết điểm nghẽn "chỉ làm sếp mới được tăng lương cao", mô hình Lộ trình kép cho phép nhân sự tự chọn hướng phát triển phù hợp nhất với thế mạnh cá nhân:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 space-y-3">
              <h3 className="font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
                <Users2 className="w-5 h-5 text-indigo-600" /> Nhánh Quản Trị Vận Hành (Management Track)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Dành cho nhân sự có thiên hướng lãnh đạo, tổ chức, giao việc và tạo động lực cho tập thể:
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-800/40">
                  <strong>Agent ➔ Senior Agent ➔ Shift Leader ➔ Team Lead ➔ CS Operations Manager ➔ Head of CX</strong>
                </div>
                <p className="text-2xs text-slate-500">Chịu trách nhiệm trực tiếp về KPI ca trực, tỷ lệ nhân viên gắn kết và quản trị năng suất đội ngũ.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 space-y-3">
              <h3 className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" /> Nhánh Chuyên Môn & Kỹ Năng Sâu (Specialist Track)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Dành cho nhân sự đam mê nghiên cứu, chuẩn hóa quy trình, chấm điểm chất lượng và đào tạo:
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-800/40">
                  <strong>Agent ➔ Senior Specialist ➔ QA Auditor / CS Trainer / SME ➔ Principal CX Architect</strong>
                </div>
                <p className="text-2xs text-slate-500">Mức lương và chế độ đãi ngộ tương đương 100% với cấp bậc Quản lý cùng cấp mà không cần gánh nặng quản lý con người.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CÔNG CỤ THỰC NGHIỆM */}
      <section id="sec-05" className="p-5 sm:p-7 rounded-3xl bg-cyan-50/40 dark:bg-slate-900/80 border border-cyan-100 dark:border-cyan-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            05
          </div>
          <div>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">Trải Nghiệm Tương Tác</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Hệ Thống Tra Cứu Từ Điển ASK & Mô Phỏng Lộ Trình Nghề Nghiệp
            </h2>
          </div>
        </div>

        <CaseStudy4_2_Tools />
      </section>

      {/* SECTION 6: QUY HOẠCH KẾ THỪA */}
      <section id="sec-06" className="p-5 sm:p-7 rounded-3xl bg-blue-50/40 dark:bg-slate-900/80 border border-blue-100 dark:border-blue-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            06
          </div>
          <div>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">Kế Hoạch Bền Vững</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Chương Trình Bồi Dưỡng Lãnh Đạo Tương Lai (Succession Fast-Track)
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/50 space-y-2">
            <Target className="w-5 h-5 text-teal-600 mb-1" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Tuyển Chọn Cán Bộ Nguồn</h3>
            <p>Hàng quý, Top 10% Agent đạt thành tích xuất sắc và có tư duy lãnh đạo được đưa vào nhóm hạt giống (Talent Pool).</p>
          </div>
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 space-y-2">
            <BookOpen className="w-5 h-5 text-blue-600 mb-1" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Huấn Luyện Quản Trị Mini-MBA</h3>
            <p>Được tham gia các khóa đào tạo chuyên sâu về kỹ năng điều hành, phân tích dữ liệu Tableau, luật lao động và giải quyết xung đột.</p>
          </div>
          <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50 space-y-2">
            <Users2 className="w-5 h-5 text-purple-600 mb-1" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Thực Tập Làm Quyền Trưởng Nhóm</h3>
            <p>Thực chiến điều hành ca trực dưới sự bảo trợ (Mentorship) của Quản lý kỳ cựu trước khi chính thức bổ nhiệm.</p>
          </div>
        </div>
      </section>

      {/* SECTION 7: MA TRẬN TRÁCH NHIỆM RACI */}
      <section id="sec-07" className="p-5 sm:p-7 rounded-3xl bg-violet-50/40 dark:bg-slate-900/80 border border-violet-100 dark:border-violet-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            07
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Quản Trị Tổ Chức</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Ma Trận Phân Định Trách Nhiệm RACI
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                <th className="p-3">Hạng Mục Phát Triển Năng Lực</th>
                <th className="p-3 text-center">Head of CS</th>
                <th className="p-3 text-center">HR & Talent Lead</th>
                <th className="p-3 text-center">CS Team Lead</th>
                <th className="p-3 text-center">QA & Trainer</th>
                <th className="p-3 text-center">CS Agent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="p-3 font-semibold">Phê duyệt Từ điển Năng lực ASK & Khung Lương thăng cấp</td>
                <td className="p-3 text-center font-bold text-blue-600">A</td>
                <td className="p-3 text-center font-bold text-emerald-600">R</td>
                <td className="p-3 text-center text-slate-400">C</td>
                <td className="p-3 text-center text-slate-400">C</td>
                <td className="p-3 text-center text-slate-400">I</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Thiết lập Kế hoạch Phát triển Cá nhân (IDP) & Huấn luyện 1-on-1</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center text-slate-400">C</td>
                <td className="p-3 text-center font-bold text-blue-600">A</td>
                <td className="p-3 text-center font-bold text-emerald-600">R</td>
                <td className="p-3 text-center font-bold text-emerald-600">R</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Tổ chức Hội đồng Đánh giá Sát hạch Thăng Cấp định kỳ</td>
                <td className="p-3 text-center font-bold text-blue-600">A</td>
                <td className="p-3 text-center font-bold text-emerald-600">R</td>
                <td className="p-3 text-center font-bold text-emerald-600">R</td>
                <td className="p-3 text-center text-slate-400">C</td>
                <td className="p-3 text-center text-slate-400">I</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Đào tạo Lớp Kế Thừa Lãnh Đạo Tương Lai (Succession)</td>
                <td className="p-3 text-center font-bold text-blue-600">A</td>
                <td className="p-3 text-center text-slate-400">C</td>
                <td className="p-3 text-center text-slate-400">C</td>
                <td className="p-3 text-center font-bold text-emerald-600">R</td>
                <td className="p-3 text-center text-slate-400">I</td>
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
              Kết Quả Định Lượng & Tác Động Thực Tế
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/50 space-y-2">
            <span className="text-xs font-bold text-purple-600 uppercase">Tỷ Lệ Bổ Nhiệm Nội Bộ</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">85.4%</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Chủ động 100% nguồn nhân lực quản lý chất lượng cao mà không cần tốn tiền tỷ thuê Headhunter bên ngoài.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 space-y-2">
            <span className="text-xs font-bold text-emerald-600 uppercase">Tiết Kiệm Chi Phí Tuyển Dụng</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">-60% Tỷ Lệ Nghỉ Việc</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Nhân viên gắn bó lâu năm giúp năng suất làm việc tăng gấp 2 lần so với đội ngũ nhân sự mới.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/50 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase">Mức Độ Tự Hào Nghề Nghiệp</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">+74 eNPS</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Tạo dựng niềm tự hào và động lực phấn đấu mạnh mẽ cho toàn thể đội ngũ CSKH.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9: NGUYÊN TẮC THEN CHỐT */}
      <section id="sec-09" className="p-5 sm:p-7 rounded-3xl bg-emerald-50/40 dark:bg-slate-900/80 border border-emerald-100 dark:border-emerald-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
            09
          </div>
          <div>
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest">Yếu Tố Thành Công</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Nguyên Tắc Then Chốt Để Giữ Chân & Phát Triển Nhân Tài CSKH
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block text-sm">1. Minh bạch tuyệt đối trong tiêu chí đánh giá</span>
            <p>Mọi chỉ tiêu xét bậc lương và thăng cấp phải có số liệu minh chứng rõ ràng, không có chỗ cho cảm tính cá nhân.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block text-sm">2. Tôn trọng sự đa dạng về thiên hướng</span>
            <p>Không ép buộc người giỏi chuyên môn phải làm quản lý, trân trọng và tưởng thưởng xứng đáng cho các Chuyên gia nghiệp vụ.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block text-sm">3. Quản lý là người đồng hành (Coach/Mentor)</span>
            <p>Vai trò của Team Lead không phải là cảnh sát giám sát lỗi, mà là người thầy tận tâm chỉ bảo và gỡ khó cho nhân viên.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block text-sm">4. Công nhận và tôn vinh kịp thời</span>
            <p>Những nỗ lực xoa dịu khách hàng khó tính hay sáng kiến cải tiến nhỏ đều được vinh danh trong bảng tin nội bộ hàng tháng.</p>
          </div>
        </div>
      </section>

      {/* SECTION 10: BÀI HỌC KINH NGHIỆM */}
      <section id="sec-10" className="p-5 sm:p-7 rounded-3xl bg-teal-50/40 dark:bg-slate-900/80 border border-teal-100 dark:border-teal-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            10
          </div>
          <div>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">Đúc Kết & Lan Tỏa</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Bài Học Kinh Nghiệm Quý Giá
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <blockquote className="p-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border-l-4 border-purple-600 text-slate-800 dark:text-slate-200 italic">
            "Nếu bạn chăm sóc nhân viên của mình thật tốt, họ sẽ tự khắc chăm sóc khách hàng của bạn vượt trên cả mong đợi. Đầu tư vào con đường sự nghiệp của đội ngũ tuyến đầu là cách nhanh nhất và bền vững nhất để xây dựng văn hóa lấy khách hàng làm trung tâm."
          </blockquote>
          <p>
            Khung năng lực ASK và Lộ trình thăng tiến kép đã chuyển hóa thành công đội ngũ CSKH thành trung tâm phát triển tài năng năng động, cung ứng nguồn cán bộ chất lượng cao cho toàn bộ các phòng ban trong tổ chức.
          </p>
        </div>
      </section>

    </div>
  );
}
