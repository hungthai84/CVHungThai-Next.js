import React from "react";
import { 
  CheckCircle2, 
  Search, 
  Send 
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";
import { CaseStudy5_1_Tools } from "./CaseStudy5_1_Tools";

export function CaseStudy5_1_Sections({ project: _project }: { project: ProjectCard }) {
  return (
    <div id="article-section" className="space-y-[15px] md:space-y-[20px] flex flex-col gap-[15px] md:gap-[20px] max-w-5xl mx-auto text-slate-800 dark:text-slate-100">
      
      {/* SECTION 1: BỐI CẢNH & THÁCH THỨC */}
      <section id="sec-01" className="p-5 sm:p-7 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-sky-100 dark:border-sky-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            01
          </div>
          <div>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">Bối Cảnh Thực Tế</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Sự Cần Thiết Thành Lập Trung Tâm Hỗ Trợ Tự Phục Vụ (Help Center)
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <p>
            Theo nghiên cứu hành vi người tiêu dùng hiện đại từ Forrester và Gartner, hơn <strong>76% khách hàng ưu tiên tự tìm kiếm câu trả lời</strong> trên cổng trợ giúp trước khi quyết định gọi điện hoặc nhắn tin cho nhân viên hỗ trợ. Tuy nhiên, trước khi triển khai dự án:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50">
              <span className="font-bold text-rose-700 dark:text-rose-400 block mb-1">Tổng đài nghẽn vì câu hỏi lặp lại:</span>
              <p className="text-xs">Hơn 40% cuộc gọi đến tổng đài chỉ xoay quanh các câu hỏi cơ bản: "Làm sao đổi mật khẩu?", "Hạn mức nạp tiền là bao nhiêu?", "Bao lâu thì nhận được tiền hoàn?".</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
              <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1">Khách hàng bức xúc vì chờ đợi:</span>
              <p className="text-xs">Vào ban đêm hoặc giờ cao điểm, khách hàng phải chờ hàng chục phút giữ máy chỉ để hỏi một thủ tục giấy tờ đơn giản.</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-rose-950/30 border border-purple-200 dark:border-purple-900/50">
              <span className="font-bold text-purple-700 dark:text-purple-400 block mb-1">Thiếu kênh gửi & theo dõi ticket:</span>
              <p className="text-xs">Khách hàng gửi yêu cầu qua email hoặc mạng xã hội không biết ai đang xử lý, trạng thái hồ sơ ra sao, dẫn đến việc gọi giục liên tục.</p>
            </div>
          </div>
          <p>
            Dự án thành lập <strong>Trung Tâm Trợ Giúp (Help Center)</strong> trực tuyến là lời giải toàn diện: vừa trao quyền tự giải quyết cho khách hàng 24/7, vừa tạo cổng ticket minh bạch và giải phóng nguồn lực quý báu cho đội ngũ hỗ trợ.
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
              Mục Tiêu Vận Hành & Ma Trận KPI Tự Phục Vụ
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/50">
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 block mb-1">Ticket Deflection Rate</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">35.4%</div>
            <p className="text-xs text-slate-500 mt-1">Giảm tải 35% lượng yêu cầu lặp lại dồn về Agent.</p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Thời Gian Tìm Kiếm</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">&lt; 10 Giây</div>
            <p className="text-xs text-slate-500 mt-1">Gợi ý bài viết chính xác ngay từ 3 ký tự đầu tiên.</p>
          </div>
          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block mb-1">Độ Hài Lòng Help Center</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">94.8%</div>
            <p className="text-xs text-slate-500 mt-1">Đánh giá "Hữu ích" (Helpful Thumbs-up) từ người dùng.</p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block mb-1">Cost Per Contact</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">-45%</div>
            <p className="text-xs text-slate-500 mt-1">Tối ưu chi phí bình quân trên mỗi lượt tiếp xúc khách hàng.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: CƠ SỞ KIẾN THỨC (KNOWLEDGE BASE) */}
      <section id="sec-03" className="p-5 sm:p-7 rounded-3xl bg-rose-50/40 dark:bg-slate-900/80 border border-rose-100 dark:border-rose-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            03
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Trái Tim Hệ Thống</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Kiến Trúc Cơ Sở Kiến Thức (Knowledge Base Architecture)
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <p>
            Cơ sở kiến thức được cấu trúc theo mô hình phân tầng hình cây (Taxonomy Tree) với hơn 650 bài viết chuẩn SEO/Semantic, bao phủ trọn vẹn mọi hành trình của người dùng:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-teal-600 dark:text-teal-400 block text-xs uppercase tracking-wider">1. Tài Khoản & Bảo Mật</span>
              <p className="text-xs leading-relaxed">Đăng ký, xác thực sinh trắc học eKYC, đổi mật khẩu, mở khóa OTP, bảo mật 2 lớp 2FA và quyền riêng tư dữ liệu.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-blue-600 dark:text-blue-400 block text-xs uppercase tracking-wider">2. Thanh Toán & Hóa Đơn</span>
              <p className="text-xs leading-relaxed">Nạp/rút tiền, chuyển tiền liên ngân hàng 24/7, tra soát lệnh trừ tiền lỗi, hoàn tiền giao dịch và xuất hóa đơn điện tử VAT.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 block text-xs uppercase tracking-wider">3. Sản Phẩm & Tính Năng</span>
              <p className="text-xs leading-relaxed">Hướng dẫn sử dụng các gói dịch vụ, kích hoạt voucher ưu đãi, tích điểm thưởng Loyalty và liên kết ví đối tác.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-purple-600 dark:text-purple-400 block text-xs uppercase tracking-wider">4. Kỹ Thuật & Xử Lý Lỗi</span>
              <p className="text-xs leading-relaxed">Khắc phục sự cố không mở được ứng dụng, lỗi gián đoạn mạng, xung đột hệ điều hành iOS/Android và cập nhật phiên bản.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-amber-600 dark:text-amber-400 block text-xs uppercase tracking-wider">5. Chính Sách & Điều Khoản</span>
              <p className="text-xs leading-relaxed">Biểu phí chi tiết, quy chế bồi thường thiệt hại, điều khoản sử dụng và cam kết mức độ dịch vụ SLA chính thức.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-rose-600 dark:text-rose-400 block text-xs uppercase tracking-wider">6. Video & Infographic</span>
              <p className="text-xs leading-relaxed">Các video clip 60 giây và ảnh infographic trực quan minh họa từng thao tác nhấp chuột cho người lớn tuổi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: TÌM KIẾM & CỔNG TICKET */}
      <section id="sec-04" className="p-5 sm:p-7 rounded-3xl bg-purple-50/40 dark:bg-slate-900/80 border border-purple-100 dark:border-purple-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            04
          </div>
          <div>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">Tính Năng Cốt Lõi</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Tìm Kiếm Thông Minh & Cổng Quản Trị Ticket Minh Bạch
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-teal-600" /> Công Cụ Tìm Kiếm Ngữ Nghĩa (Semantic Search)
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                <span><strong>Gợi ý từ khóa tức thì (Type-ahead):</strong> Hiển thị 5 bài viết khớp nhất ngay khi người dùng gõ từ khóa đầu tiên.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                <span><strong>Xử lý từ đồng nghĩa & lỗi chính tả:</strong> Nhận diện các biến thể từ khóa tiếng Việt (vd: "quên pass", "mất mật khẩu", "quen pass").</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                <span><strong>Đề xuất theo ngữ cảnh (Contextual Widget):</strong> Nhúng trực tiếp bài viết liên quan ngay tại màn hình người dùng gặp sự cố.</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-blue-600" /> Cổng Ticket Minh Bạch (Ticket Tracking Portal)
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span><strong>Biểu mẫu gửi yêu cầu trực quan:</strong> Cho phép đính kèm tệp log, ảnh chụp màn hình hoặc video lỗi.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span><strong>Theo dõi tiến độ thời gian thực:</strong> Xem chính xác ticket đang ở trạng thái nào (Mới ➔ Xử lý ➔ Hoàn tất) và ai đang phụ trách.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span><strong>Đếm ngược SLA minh bạch:</strong> Hiển thị thời gian cam kết có kết quả xử lý, triệt tiêu sự sốt ruột của khách hàng.</span>
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
              Hệ Thống Mô Phỏng Help Center & Cổng Ticket Trực Tiếp
            </h2>
          </div>
        </div>

        <CaseStudy5_1_Tools />
      </section>

      {/* SECTION 6: TÍCH HỢP HỆ SINH THÁI ĐA KÊNH */}
      <section id="sec-06" className="p-5 sm:p-7 rounded-3xl bg-blue-50/40 dark:bg-slate-900/80 border border-blue-100 dark:border-blue-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            06
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Hợp Nhất Đa Kênh</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Quy Trình Tích Hợp Help Center Với Chatbot & Agent Tuyến Đầu
            </h2>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-indigo-500/10 border border-teal-200 dark:border-teal-800/60 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Vòng Lặp Chuyển Giao Liền Mạch (Seamless Deflection & Escalation Loop):
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-teal-600 block">Bước 1: Khách hàng tìm kiếm</span>
              <p className="text-slate-600 dark:text-slate-300">Khách tra cứu trên Help Center hoặc bắt đầu khung chat.</p>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-blue-600 block">Bước 2: AI Bot gợi ý bài viết</span>
              <p className="text-slate-600 dark:text-slate-300">AI tự động trích dẫn đoạn văn giải quyết vấn đề từ Help Center.</p>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-indigo-600 block">Bước 3: Chuyển Agent nếu cần</span>
              <p className="text-slate-600 dark:text-slate-300">Nếu khách chưa hiểu, chuyển tiếp đến nhân viên kèm lịch sử tra cứu.</p>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-purple-600 block">Bước 4: Chèn link 1-Click</span>
              <p className="text-slate-600 dark:text-slate-300">Agent gửi link bài viết chính thức để khách hàng đối chiếu.</p>
            </div>
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
                <th className="p-3">Hạng Mục Quản Trị Help Center</th>
                <th className="p-3 text-center">Head of CS</th>
                <th className="p-3 text-center">Knowledge Manager</th>
                <th className="p-3 text-center">Product Team</th>
                <th className="p-3 text-center">Tech / DevOps</th>
                <th className="p-3 text-center">Frontline Agent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="p-3 font-semibold">Quy hoạch cấu trúc thư mục & kiến trúc thông tin</td>
                <td className="p-3 text-center font-bold text-blue-600">A</td>
                <td className="p-3 text-center font-bold text-emerald-600">R</td>
                <td className="p-3 text-center text-slate-400">C</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center text-slate-400">I</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Biên soạn & duyệt bài viết tính năng sản phẩm mới</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center font-bold text-blue-600">A</td>
                <td className="p-3 text-center font-bold text-emerald-600">R</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center text-slate-400">C</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Vận hành hạ tầng tìm kiếm, Portal & bảo mật API</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center text-slate-400">C</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center font-bold text-emerald-600">R / A</td>
                <td className="p-3 text-center text-slate-400">I</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Phát hiện khoảng trống tri thức & gửi đề xuất bài mới</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center font-bold text-blue-600">A</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center font-bold text-emerald-600">R</td>
              </tr>
            </tbody>
          </table>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 text-[10px] text-slate-500 flex gap-4">
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
              Kết Quả Định Lượng & Tác Động Vận Hành
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/50 space-y-2">
            <span className="text-xs font-bold text-teal-600 uppercase">Lượng Truy Cập Help Center</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">850,000+</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Lượt xem trang mỗi tháng với hơn 650 bài viết chất lượng cao được chuẩn hóa.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 space-y-2">
            <span className="text-xs font-bold text-emerald-600 uppercase">Giảm Tải Tổng Đài</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">-35.4% Ticket</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Hơn 14,000 lượt yêu cầu được khách hàng tự giải quyết thành công mỗi tháng.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/50 space-y-2">
            <span className="text-xs font-bold text-purple-600 uppercase">Tiết Kiệm Chi Phí Vận Hành</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">6.4 Tỷ VNĐ/Năm</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Cắt giảm trực tiếp chi phí nhân sự phát sinh ngoài giờ và cước thoại viễn thông.
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
              4 Trụ Cột Đảm Bảo Trung Tâm Trợ Giúp Vận Hành Hiệu Quả
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block text-sm">1. Ngôn từ đơn giản, hướng dẫn từng bước</span>
            <p>Tránh dùng thuật ngữ kỹ thuật phức tạp. Trình bày bài viết theo dạng Step 1, 2, 3 kèm ảnh chụp màn hình khoanh đỏ vị trí cần nhấp.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block text-sm">2. Cơ chế phản hồi hữu ích (Feedback Loop)</span>
            <p>Liên tục theo dõi các bài viết nhận nhiều lượt "Thumbs Down" để chỉnh sửa nội dung rõ ràng hơn trong vòng 24 giờ.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block text-sm">3. Tích hợp sâu vào trong ứng dụng (In-app SDK)</span>
            <p>Khách hàng không cần phải mở trình duyệt web riêng biệt, họ có thể tra cứu ngay trong ứng dụng khi đang thực hiện giao dịch.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block text-sm">4. Đường dẫn thoát hiểm êm đẹp (Graceful Escalation)</span>
            <p>Nếu tự phục vụ không giải quyết được, luôn có nút "Chat với nhân viên" hoặc "Gửi ticket" ngay cuối bài để khách không bị mắc kẹt.</p>
          </div>
        </div>
      </section>

      {/* SECTION 10: BÀI HỌC KINH NGHIỆM */}
      <section id="sec-10" className="p-5 sm:p-7 rounded-3xl bg-teal-50/40 dark:bg-slate-900/80 border border-teal-100 dark:border-teal-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            10
          </div>
          <div>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">Đúc Kết & Lan Tỏa</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Bài Học Kinh Nghiệm Quý Giá
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <blockquote className="p-4 rounded-2xl bg-teal-50/80 dark:bg-teal-950/40 border-l-4 border-teal-600 text-slate-800 dark:text-slate-200 italic">
            "Dịch vụ khách hàng xuất sắc nhất là dịch vụ giúp khách hàng không bao giờ phải nhấc máy gọi đến để hỏi những điều hiển nhiên. Một Help Center hoàn hảo là cây cầu kết nối sự tự chủ của khách hàng với sự thảnh thơi của đội ngũ vận hành."
          </blockquote>
          <p>
            Help Center không chỉ là công cụ cắt giảm chi phí mà đã trở thành điểm chạm then chốt giúp xây dựng niềm tin, sự chuyên nghiệp và định hình đẳng cấp trải nghiệm của thương hiệu trong lòng người dùng.
          </p>
        </div>
      </section>

    </div>
  );
}
