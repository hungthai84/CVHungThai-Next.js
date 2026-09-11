import React from "react";
import { 
  Crown, 
  ShieldCheck, 
  CheckCircle2, 
  PhoneCall, 
  Gift, 
  Sparkles, 
  Star, 
  Gem 
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";
import { CaseStudy6_1_Tools } from "./CaseStudy6_1_Tools";

export function CaseStudy6_1_Sections({ project: _project }: { project: ProjectCard }) {
  return (
    <div id="article-section" className="space-y-[15px] md:space-y-[20px] flex flex-col gap-[15px] md:gap-[20px] max-w-5xl mx-auto text-slate-800 dark:text-slate-100">
      
      {/* SECTION 1: BỐI CẢNH & THÁCH THỨC */}
      <section id="sec-01" className="p-5 sm:p-7 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-sky-100 dark:border-sky-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            01
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">Bối Cảnh Thực Tế</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Quy Luật 80/20 & Nhu Cầu Thành Lập Đội Ngũ Chăm Sóc VIP Chuyên Biệt
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <p>
            Theo nguyên lý Pareto kinh điển trong kinh doanh dịch vụ tài chính & công nghệ, nhóm <strong>20% khách hàng cao cấp (VIP) đóng góp tới hơn 75-80% tổng giá trị giao dịch và lợi nhuận ròng</strong>. Tuy nhiên, trước khi triển khai dự án chuyên biệt hóa:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50">
              <span className="font-bold text-rose-700 dark:text-rose-400 block mb-1">Xếp chung hàng đợi với người dùng phổ thông:</span>
              <p className="text-xs">Khách hàng chi tiêu hàng trăm triệu mỗi tháng vẫn phải bấm phím IVR 1, 2, 3 và nghe nhạc chờ giữ máy 15 phút như bình thường.</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
              <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1">Thiếu tính liên tục & cá nhân hóa:</span>
              <p className="text-xs">Mỗi lần gọi đến lại gặp một nhân viên mới, phải trình bày lại toàn bộ lịch sử vấn đề từ đầu, gây cảm giác không được tôn trọng.</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-rose-950/30 border border-purple-200 dark:border-purple-900/50">
              <span className="font-bold text-purple-700 dark:text-purple-400 block mb-1">Nguy cơ rời bỏ sang đối thủ (Churn Risk):</span>
              <p className="text-xs">Khi có sự cố nghẽn mạng hoặc tranh chấp giao dịch, việc giải quyết chậm trễ khiến nhiều doanh nghiệp lớn ngưng hợp đồng.</p>
            </div>
          </div>
          <p>
            Dự án thiết lập <strong>Đội ngũ VIP Desk & Mô hình Account Manager 1-on-1</strong> được xây dựng nhằm tạo ra chuẩn mực phục vụ đặc quyền, biến dịch vụ khách hàng thành lợi thế cạnh tranh cốt lõi để giữ chân và gia tăng giá trị trọn đời (LTV).
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
              Mục Tiêu Vận Hành & Ma Trận KPI VIP Desk
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block mb-1">Tỷ Lệ Giữ Chân VIP</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">98.2%</div>
            <p className="text-xs text-slate-500 mt-1">Duy trì tỷ lệ gắn bó vượt trội của nhóm Kim Cương & Vàng.</p>
          </div>
          <div className="p-4 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-900/50">
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 block mb-1">Tốc Độ Bắt Máy</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">&lt; 15 Giây</div>
            <p className="text-xs text-slate-500 mt-1">Định tuyến tự động bỏ qua toàn bộ hàng đợi IVR.</p>
          </div>
          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block mb-1">Chỉ Số NPS Nhóm VIP</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">+88 Điểm</div>
            <p className="text-xs text-slate-500 mt-1">Khách hàng VIP trở thành người ủng hộ và giới thiệu đối tác.</p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Tăng Trưởng Doanh Thu</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">+32.6%</div>
            <p className="text-xs text-slate-500 mt-1">Tăng trưởng chi tiêu và mở rộng hợp đồng từ khách VIP.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: PHÂN TẦNG VÀ TIÊU CHÍ */}
      <section id="sec-03" className="p-5 sm:p-7 rounded-3xl bg-rose-50/40 dark:bg-slate-900/80 border border-rose-100 dark:border-rose-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            03
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Khung Tiêu Chí</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Mô Hình Phân Tầng Khách Hàng 4 Cấp Độ (VIP Tiering Model)
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <p>
            Hệ thống tự động phân hạng khách hàng theo thuật toán RFM (Recency, Frequency, Monetary) kết hợp thâm niên gắn bó:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3.5">Hạng Mức</th>
                  <th className="p-3.5">Tiêu Chí Chi Tiêu (GTV/Năm)</th>
                  <th className="p-3.5">Mô Hình Phục Vụ</th>
                  <th className="p-3.5">Cam Kết Thời Gian SLA</th>
                  <th className="p-3.5">Đặc Quyền Tài Chính & Phi Tài Chính</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-cyan-600 flex items-center gap-1.5">
                    <Gem className="w-3.5 h-3.5" /> VIP Kim Cương
                  </td>
                  <td className="p-3.5 font-semibold text-slate-900 dark:text-white">&gt; 500 Triệu VNĐ</td>
                  <td className="p-3.5">1-on-1 Account Manager riêng</td>
                  <td className="p-3.5 font-bold text-emerald-600">&lt; 10s bắt máy • &lt; 1h xử lý</td>
                  <td className="p-3.5">Miễn 100% phí, duyệt ngoại lệ 50Tr, quà VIP 5Tr, sự kiện Gala</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-amber-600 flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5" /> VIP Vàng
                  </td>
                  <td className="p-3.5 font-semibold text-slate-900 dark:text-white">200 - 500 Triệu VNĐ</td>
                  <td className="p-3.5">Đội ngũ VIP Desk ưu tiên</td>
                  <td className="p-3.5 font-bold text-blue-600">&lt; 20s bắt máy • &lt; 3h xử lý</td>
                  <td className="p-3.5">Giảm 70% phí, duyệt ngoại lệ 15Tr, quà sinh nhật 2Tr</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5" /> VIP Bạc
                  </td>
                  <td className="p-3.5 font-semibold text-slate-900 dark:text-white">80 - 200 Triệu VNĐ</td>
                  <td className="p-3.5">Chuyên viên Tuyến 2 hỗ trợ</td>
                  <td className="p-3.5 font-bold text-indigo-600">&lt; 30s bắt máy • &lt; 6h xử lý</td>
                  <td className="p-3.5">Giảm 30% phí giao dịch, voucher quà tặng sinh nhật</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-slate-400">Tiêu Chuẩn</td>
                  <td className="p-3.5 font-semibold text-slate-900 dark:text-white">&lt; 80 Triệu VNĐ</td>
                  <td className="p-3.5">Help Center + Tổng đài chung</td>
                  <td className="p-3.5 text-slate-500">Theo thứ tự hàng đợi</td>
                  <td className="p-3.5">Hưởng các chương trình khuyến mãi đại trà</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 4: QUY TRÌNH ƯU TIÊN & CƠ CHẾ ĐẶC CÁCH */}
      <section id="sec-04" className="p-5 sm:p-7 rounded-3xl bg-purple-50/40 dark:bg-slate-900/80 border border-purple-100 dark:border-purple-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            04
          </div>
          <div>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">Kiến Trúc Vận Hành</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Định Tuyến CTI Thông Minh & Cơ Chế Phê Duyệt Đặc Cách (Empowerment)
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-amber-600" /> Công Nghệ CTI Tự Động Nhận Diện VIP
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Bỏ qua IVR 100%:</strong> Cuộc gọi từ số điện thoại VIP tự động bỏ qua toàn bộ lời chào và phím bấm tự động.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Định tuyến trực tiếp đến AM:</strong> Cuộc gọi đổ chuông thẳng vào bàn làm việc của Account Manager đang quản lý tài khoản.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Màn hình Screen-pop 360°:</strong> Hiển thị ngay tên, sinh nhật, doanh số, lịch sử giao dịch và sở thích của khách hàng.</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Trao Quyền Quyết Định Tại Chỗ (Empowerment)
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Quyền duyệt bồi thường tức thì:</strong> Chuyên viên VIP được phép hoàn tiền / tặng voucher tới 50 triệu mà không cần xin chữ ký Giám đốc.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Hotline khẩn cấp tới Tech Lead:</strong> Có kênh liên lạc riêng để kích hoạt đội kỹ thuật khắc phục lỗi giao dịch VIP trong 15 phút.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Hỗ trợ trực tiếp tận nơi:</strong> Đối với khách hàng Diamond gặp sự cố lớn, Account Manager có thể gặp gỡ giải quyết trực tiếp.</span>
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
              Hệ Thống Mô Phỏng Phân Hạng Đặc Quyền & Định Tuyến VIP
            </h2>
          </div>
        </div>

        <CaseStudy6_1_Tools />
      </section>

      {/* SECTION 6: CHƯƠNG TRÌNH GẮN KẾT & TRI ÂN */}
      <section id="sec-06" className="p-5 sm:p-7 rounded-3xl bg-blue-50/40 dark:bg-slate-900/80 border border-blue-100 dark:border-blue-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
            06
          </div>
          <div>
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest">Nghệ Thuật Giữ Chân</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Chương Trình Tri Ân Tinh Tế & Gắn Kết Cảm Xúc (Emotional Loyalty)
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 space-y-2">
            <Gift className="w-5 h-5 text-rose-600 mb-1" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Quà Tặng Cá Nhân Hóa</h3>
            <p>Không dùng quà đại trà; quà sinh nhật được thiết kế riêng theo sở thích cá nhân (trà thượng hạng, rượu vang tuyển chọn, hoa tươi nghệ thuật).</p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 space-y-2">
            <Star className="w-5 h-5 text-amber-600 mb-1" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Sự Kiện Độc Quyền (Gala)</h3>
            <p>Vé mời VIP tham gia Hội nghị Kinh tế Thường niên, tiệc tối Private Dinner cùng Ban Tổng Giám đốc và các chuyên gia đầu ngành.</p>
          </div>
          <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50 space-y-2">
            <Sparkles className="w-5 h-5 text-purple-600 mb-1" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Đặc Quyền Sản Phẩm Mới</h3>
            <p>Khách hàng VIP được mở quyền trải nghiệm các tính năng thanh toán nâng cao trước 1 tháng và đóng góp ý kiến trực tiếp vào Roadmap sản phẩm.</p>
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
                <th className="p-3">Hạng Mục Quản Trị Nhóm VIP</th>
                <th className="p-3 text-center">C-Level / Head of CS</th>
                <th className="p-3 text-center">VIP Desk Manager</th>
                <th className="p-3 text-center">Dedicated AM</th>
                <th className="p-3 text-center">Tech / CTI Eng</th>
                <th className="p-3 text-center">Finance Team</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="p-3 font-semibold">Phê duyệt chính sách biểu phí & ngân sách tri ân VIP</td>
                <td className="p-3 text-center font-bold text-blue-600">A</td>
                <td className="p-3 text-center font-bold text-emerald-600">R</td>
                <td className="p-3 text-center text-slate-400">C</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center font-bold text-amber-600">C</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Cấu hình định tuyến ưu tiên CTI & bảng điều khiển Screen-pop</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center font-bold text-blue-600">A</td>
                <td className="p-3 text-center text-slate-400">C</td>
                <td className="p-3 text-center font-bold text-emerald-600">R</td>
                <td className="p-3 text-center text-slate-400">I</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Tiếp nhận hỗ trợ 1-on-1 & duyệt hoàn tiền đặc cách</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center font-bold text-blue-600">A</td>
                <td className="p-3 text-center font-bold text-emerald-600">R</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center text-slate-400">I</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Tổ chức sự kiện tri ân Gala & tặng quà sinh nhật VIP</td>
                <td className="p-3 text-center text-slate-400">C</td>
                <td className="p-3 text-center font-bold text-blue-600">A</td>
                <td className="p-3 text-center font-bold text-emerald-600">R</td>
                <td className="p-3 text-center text-slate-400">I</td>
                <td className="p-3 text-center text-slate-400">C</td>
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
              Kết Quả Định Lượng & Tác Động Kinh Doanh
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase">Tỷ Lệ Giữ Chân Khách Hàng VIP</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">98.2%</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Giảm thiểu tỷ lệ rời bỏ tài khoản doanh nghiệp lớn xuống dưới 1.8%/năm.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 space-y-2">
            <span className="text-xs font-bold text-emerald-600 uppercase">Tăng Trưởng Doanh Thu VIP</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">+32.6% GTV</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Khách hàng VIP an tâm tăng hạn mức và mở rộng tần suất giao dịch hàng ngày.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/50 space-y-2">
            <span className="text-xs font-bold text-purple-600 uppercase">Điểm Số Hài Lòng NPS</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">+88 Điểm</div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Mức độ sẵn sàng giới thiệu dịch vụ cho bạn bè và đối tác đạt kỷ lục ngành.
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
              Nguyên Tắc Then Chốt Để Phục Vụ Khách Hàng VIP Xuất Sắc
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block text-sm">1. Thấu cảm và tôn trọng thời gian</span>
            <p>Với khách hàng VIP, thời gian là tiền bạc. Mọi giải thích dài dòng đều vô nghĩa bằng hành động giải quyết sự cố trong tích tắc.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block text-sm">2. Luôn chủ động trước khi khách kịp hỏi</span>
            <p>Khi có bảo trì hệ thống ngân hàng hoặc sự cố đường truyền, AM chủ động gửi tin nhắn riêng cảnh báo trước cho khách VIP.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block text-sm">3. Bảo mật thông tin tuyệt đối</span>
            <p>Toàn bộ hồ sơ giao dịch, số dư tài khoản của khách hàng VIP được mã hóa phân quyền nghiêm ngặt, chỉ AM phụ trách mới được truy cập.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block text-sm">4. Tinh thần trách nhiệm đến cùng (Single Point of Contact)</span>
            <p>Tuyệt đối không chuyển cuộc gọi lòng vòng. Account Manager tiếp nhận sẽ là người theo dõi đến khi khách hàng hoàn toàn hài lòng.</p>
          </div>
        </div>
      </section>

      {/* SECTION 10: BÀI HỌC KINH NGHIỆM */}
      <section id="sec-10" className="p-5 sm:p-7 rounded-3xl bg-teal-50/40 dark:bg-slate-900/80 border border-teal-100 dark:border-teal-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            10
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">Đúc Kết & Lan Tỏa</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Bài Học Kinh Nghiệm Quý Giá
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <blockquote className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border-l-4 border-amber-600 text-slate-800 dark:text-slate-200 italic">
            "Khách hàng VIP không mua sản phẩm của bạn vì giá rẻ, họ gắn bó vì cảm giác được trân trọng, sự an tâm tuyệt đối và đặc quyền được lắng nghe. Chăm sóc khách hàng VIP không phải là chi phí mà là khoản đầu tư sinh lời bền vững nhất của doanh nghiệp."
          </blockquote>
          <p>
            Đội ngũ VIP Desk đã thành công trong việc xây dựng mạng lưới khách hàng thân thiết trung thành, đóng vai trò như những đại sứ thương hiệu uy tín lan tỏa niềm tin tới toàn thể cộng đồng.
          </p>
        </div>
      </section>

    </div>
  );
}
