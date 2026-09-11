import React from "react";
import { 
  BookOpen, 
  Cpu, 
  RefreshCw, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Layers, 
  Zap, 
  Database, 
  Eye, 
  Sliders, 
  Award, 
  ThumbsUp, 
  AlertTriangle,
  Check,
  Building2,
  Calendar,
  Flame,
  Star,
  Globe
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";
import { CaseStudy3_4_Tools } from "./CaseStudy3_4_Tools";

export function CaseStudy3_4_Sections({ project }: { project: ProjectCard }) {
  return (
    <div id="article-section" className="space-y-[15px] md:space-y-[20px] flex flex-col gap-[15px] md:gap-[20px] animate-fadeIn">
      {/* SECTION 01: BỐI CẢNH & VẤN ĐỀ */}
      <section id="sec-01" className="p-5 sm:p-7 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-sky-100 dark:border-sky-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase tracking-widest">
            01. Bối Cảnh Thực Tế &amp; Thách Thức
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Thực Trạng Phân Tán Tri Thức Tổ Chức &amp; Rủi Ro "Chảy Máu Chất Xám"
        </h3>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Tri thức là tài sản quý giá nhất của tổ chức, nhưng trước khi xây dựng hệ thống Knowledge Base &amp; Huấn luyện AI tập trung, doanh nghiệp đối mặt với những thách thức nghiêm trọng:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Tri Thức Nằm Rải Rác</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Tài liệu hướng dẫn nằm trong các file Word cũ trên Google Drive, ghi chú cá nhân của nhân viên kỳ cựu hoặc tin nhắn trôi nổi trong nhóm chat. Mỗi người trả lời khách hàng theo một cách khác nhau.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Thời Gian Tra Cứu Quá Lâu</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Nhân viên mới mất từ 3 - 5 phút cho mỗi câu hỏi nghiệp vụ phức tạp vì phải "hỏi xin tài liệu" từ các bạn đồng nghiệp, làm kéo dài thời gian xử lý cuộc gọi (AHT) và gây ức chế cho khách hàng.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">AI Bị "Ảo Giác" (Hallucination)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Các mô hình Chatbot thế hệ cũ thường tự bịa ra thông tin chính sách hoàn tiền không có thật do không được tiếp cận cơ sở tri thức chuẩn xác theo cơ chế RAG (Retrieval-Augmented Generation).
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
          Xây Dựng "Bộ Não Số" (Digital Brain) Cho Toàn Bộ Doanh Nghiệp
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">Chuẩn hóa tri thức</span>
            <p className="text-base font-extrabold text-slate-900 dark:text-white">1.200+ Bài Viết KB</p>
            <p className="text-xs text-slate-500">Số hóa 100% quy trình SOP, chính sách và tài liệu kỹ thuật.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">Độ chính xác AI</span>
            <p className="text-base font-extrabold text-slate-900 dark:text-white">94% Chuẩn Xác</p>
            <p className="text-xs text-slate-500">Ứng dụng RAG Pipeline giảm ảo giác xuống dưới 2%.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">Tốc độ tra cứu</span>
            <p className="text-base font-extrabold text-slate-900 dark:text-white">&lt; 15 Giây / Tra Cứu</p>
            <p className="text-xs text-slate-500">Semantic Search giúp nhân viên tìm đúng câu trả lời tức thì.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Tự giải quyết web</span>
            <p className="text-base font-extrabold text-slate-900 dark:text-white">88% Thành Công</p>
            <p className="text-xs text-slate-500">Khách hàng tự tra cứu thành công trên Cổng Trợ Giúp.</p>
          </div>
        </div>
      </section>

      {/* SECTION 03: PHƯƠNG PHÁP TIẾP CẬN */}
      <section id="sec-03" className="p-5 sm:p-7 rounded-3xl bg-rose-50/40 dark:bg-slate-900/80 border border-rose-100 dark:border-rose-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 uppercase tracking-widest">
            03. Phương Pháp Tiếp Cận &amp; Kiến Trúc RAG
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Quy Trình Biến Tài Liệu Thành Vector Embeddings &amp; Grounded AI
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase">Bước 1: Chuẩn Hóa &amp; Bóc Tách</span>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Document Parsing &amp; Chunking</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Chuyển đổi tài liệu PDF/Word thành các đoạn văn bản có cấu trúc (Chunks 300-500 tokens) với đầy đủ siêu dữ liệu (Metadata: Phiên bản, Ngày ban hành, Đối tượng áp dụng).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold text-purple-600 uppercase">Bước 2: Vector Hóa &amp; Lưu Trữ</span>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Vector Embeddings Database</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Mã hóa các đoạn văn bản thành vector đa chiều và lưu trữ trên Vector DB, hỗ trợ tìm kiếm theo ngữ nghĩa (Semantic Similarity Search) thay vì so khớp từ khóa đơn thuần.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold text-emerald-600 uppercase">Bước 3: Truy Xuất &amp; Sinh Câu Trả Lời</span>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">RAG Retrieval &amp; Guardrails</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Khi người dùng đặt câu hỏi, hệ thống chỉ lấy đúng các đoạn trích dẫn nguồn uy tín nạp vào Context của LLM để tạo câu trả lời chính xác, kèm đường link trích dẫn nguồn.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 04: CẤU TRÚC PHÂN CẤP */}
      <section id="sec-04" className="p-5 sm:p-7 rounded-3xl bg-purple-50/40 dark:bg-slate-900/80 border border-purple-100 dark:border-purple-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase tracking-widest">
            04. Cấu Trúc Phân Cấp &amp; Quản Trị Phiên Bản (Version Control)
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Phân Quyền Public KB vs. Internal Wiki &amp; Quy Trình Duyệt 3 Bước
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-800/60 space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" /> Cổng Tri Thức Dành Cho Khách Hàng (Public Help Center)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Chứa các bài viết hướng dẫn sử dụng, chính sách bảo hành/hoàn tiền, câu hỏi thường gặp FAQ, có ngôn từ thân thiện, hình ảnh minh họa và video trực quan.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/70 dark:border-purple-800/60 space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-600" /> Cơ Sở Tri Thức Nội Bộ (Internal Agent Wiki)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Chứa các tài liệu xử lý sự cố lỗi kỹ thuật (Troubleshooting), kịch bản đàm phán khiếu nại (HEAT Model), quy trình thao tác trên các tool quản trị hệ thống.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 05: BỘ CÔNG CỤ TƯƠNG TÁC */}
      <section id="sec-05" className="p-5 sm:p-7 rounded-3xl bg-cyan-50/40 dark:bg-slate-900/80 border border-cyan-100 dark:border-cyan-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase tracking-widest flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> 05. Bộ Công Cụ Trực Quan &amp; Mô Phỏng Tương Tác
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Trải Nghiệm Thực Tế Hệ Thống KB, RAG Simulator &amp; Phát Hiện Lỗ Hổng Tri Thức
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Tương tác trực tiếp với cổng tra cứu tài liệu, chạy thử đường ống RAG chống ảo giác và quan sát cơ chế tự phát hiện khoảng trống tri thức.
        </p>

        {/* Embedded Interactive Tools Component */}
        <CaseStudy3_4_Tools />
      </section>

      {/* SECTION 06: LỘ TRÌNH TRIỂN KHAI */}
      <section id="sec-06" className="p-5 sm:p-7 rounded-3xl bg-blue-50/40 dark:bg-slate-900/80 border border-blue-100 dark:border-blue-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase tracking-widest">
            06. Lộ Trình Triển Khai
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          4 Giai Đoạn Số Hóa Tri Thức &amp; Huấn Luyện AI Liên Tục
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">Giai Đoạn 1</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Tổng Kiểm Kê Tri Thức</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Thu thập toàn bộ tài liệu từ các phòng ban, loại bỏ tài liệu hết hạn, chuẩn hóa format bài viết mẫu theo chuẩn SOP.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">Giai Đoạn 2</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Thiết Lập Cổng KB &amp; Vector DB</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Triển khai hệ thống Knowledge Portal, cấu hình phân quyền truy cập và cài đặt Vector Database để phục vụ RAG.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">Giai Đoạn 3</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Huấn Luyện &amp; Đánh Giá AI</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Chạy 500+ bộ câu hỏi kiểm thử (Benchmarking), tinh chỉnh prompt và guardrails để đảm bảo độ chính xác &ge; 94%.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">Giai Đoạn 4</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Vận Hành Vòng Lặp Học Tập</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Thiết lập quy trình rà soát lỗ hổng tri thức hàng tuần; tự động tái huấn luyện khi có bài viết mới được duyệt.
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
          Phân Định Trách Nhiệm Quản Trị Tri Thức &amp; Huấn Luyện AI
        </h3>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold">
              <tr>
                <th className="p-3">Nhiệm Vụ</th>
                <th className="p-3 text-center">Knowledge Manager</th>
                <th className="p-3 text-center">Subject Matter Expert (SME)</th>
                <th className="p-3 text-center">Kỹ Sư AI/ML</th>
                <th className="p-3 text-center">Team Lead CSKH</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white/50 dark:bg-slate-900/50">
              <tr>
                <td className="p-3 font-medium">Biên soạn và cập nhật nội dung bài viết KB</td>
                <td className="p-3 text-center font-bold text-amber-600">A (Accountable)</td>
                <td className="p-3 text-center font-bold text-emerald-600">R (Responsible)</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center font-semibold text-slate-500">C</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Kiểm duyệt tính chính xác &amp; Ký duyệt phát hành</td>
                <td className="p-3 text-center font-semibold text-slate-500">C</td>
                <td className="p-3 text-center font-bold text-emerald-600">A / R</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center text-slate-400">I</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Đánh giá độ chính xác của AI &amp; Tinh chỉnh RAG</td>
                <td className="p-3 text-center font-semibold text-slate-500">C</td>
                <td className="p-3 text-center font-semibold text-slate-500">C</td>
                <td className="p-3 text-center font-bold text-emerald-600">A / R</td>
                <td className="p-3 text-center font-semibold text-slate-500">C</td>
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
          Tác Động Chuyển Đổi Khi Chuẩn Hóa Tri Thức &amp; Ứng Dụng AI
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Thời gian tra cứu tài liệu của Agent</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base line-through text-rose-500 font-semibold">4.5 phút</span>
              <span className="text-2xl font-black text-emerald-600">&lt; 15 giây</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Giảm 70% nhờ Semantic Search và AI Co-pilot</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Độ chính xác thông tin tư vấn</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base line-through text-rose-500 font-semibold">72.3%</span>
              <span className="text-2xl font-black text-emerald-600">99.5%</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Loại bỏ hoàn toàn thông tin mâu thuẫn</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Thời gian đào tạo Onboarding nhân viên mới</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base line-through text-rose-500 font-semibold">4 tuần</span>
              <span className="text-2xl font-black text-emerald-600">10 ngày</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Nhân viên mới có thể tự học qua KB Portal</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Độ tin cậy của câu trả lời AI</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base line-through text-rose-500 font-semibold">60%</span>
              <span className="text-2xl font-black text-emerald-600">94.0%</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Căn cứ 100% tài liệu nguồn chính thống</p>
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
          3 Quy Tắc Vàng Giữ Cho Cơ Sở Tri Thức Luôn "Sống"
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">1. Cập Nhật Ngay Tại Nguồn</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Mọi thay đổi chính sách từ phòng Sản phẩm/Kỹ thuật phải được cập nhật lên KB trước khi công bố ra thị trường.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">2. Lắng Nghe Phản Hồi Thumbs Up/Down</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Bất kỳ bài viết nào nhận trên 3 lượt "Chưa rõ" sẽ tự động được gửi về tác giả để viết lại dễ hiểu hơn.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">3. Tự Động Hóa Đồng Bộ Vector</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Ngay khi bài viết mới được ký duyệt, hệ thống tự động chạy quy trình Chunking và nạp vào Vector DB cho AI.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 10: BÀI HỌC KINH NGHIỆM */}
      <section id="sec-10" className="p-5 sm:p-7 rounded-3xl bg-teal-50/40 dark:bg-slate-900/80 border border-teal-100 dark:border-teal-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase tracking-widest">
            10. Bài Học Kinh Nghiệm &amp; Tầm Nhìn
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Tri Thức Chuẩn Xác Là Nền Tảng Của Mọi Ứng Dụng AI Thành Công
        </h3>

        <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/60 space-y-2">
          <h4 className="font-bold text-sm text-amber-900 dark:text-amber-300">
            • AI chỉ thông minh khi nó được nạp dữ liệu tri thức chất lượng cao
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Nhiều doanh nghiệp thất bại trong việc ứng dụng AI không phải vì mô hình kém, mà vì dữ liệu tri thức nội bộ quá hỗn loạn và thiếu chuẩn hóa. Đầu tư vào xây dựng một Cơ sở tri thức chuẩn xác, có cấu trúc và cập nhật liên tục chính là bước đệm vững chắc nhất để khai phóng sức mạnh thực sự của Trí tuệ nhân tạo trong vận hành doanh nghiệp.
          </p>
        </div>
      </section>
    </div>
  );
}
