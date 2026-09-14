import React from "react";
import { 
  HelpCircle, 
  BookOpen, 
  Send, 
  Search, 
  Share2, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  CreditCard, 
  Award
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";

export function CaseStudy5_1_Mindmap({ 
  jumpToSection, 
  project: _project 
}: { 
  jumpToSection: (id: string) => void; 
  project: ProjectCard;
}) {
  return (
    <section className="glass-base p-6 sm:p-10 rounded-3xl space-y-8 relative overflow-hidden bg-gradient-to-b from-white/90 via-teal-50/30 to-white/80 dark:from-slate-900/90 dark:via-teal-950/20 dark:to-slate-900/80 border border-teal-200/80 dark:border-teal-800/60 shadow-2xl backdrop-blur-xl">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-teal-400/10 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />      {/* Header section of Mindmap - format chuẩn giống 01 · Tổng quan dự án */}
      <div className="flex items-center space-x-3 border-b border-sky-200/80 dark:border-sky-800/80 pb-3.5 sm:pb-4">
        <h2 className="text-base sm:text-xl md:text-2xl font-bold text-sky-600 dark:text-sky-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <span>00</span>
          <span className="text-sky-400 dark:text-sky-500 font-normal">·</span>
          <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400 shrink-0 inline-block" />
          <span>Sơ đồ tư duy thành lập trung tâm hỗ trợ (Help Center)</span>
        </h2>
      </div>

      {/* Central Interactive Mindmap Layout */}
      <div className="relative py-6">
        {/* Central Core Hub */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="group relative cursor-pointer" onClick={() => jumpToSection("sec-05")}>
            <div className="w-64 sm:w-80 p-5 rounded-3xl bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-800 text-white shadow-xl shadow-teal-500/30 border-2 border-white/40 dark:border-teal-400/30 text-center transition-all duration-300 transform group-hover:scale-105">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                <HelpCircle className="w-7 h-7 text-white animate-pulse" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-teal-900/40 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-white/20">
                Cổng Tự Phục Vụ 24/7
              </span>
              <h3 className="text-lg font-bold">TRUNG TÂM TRỢ GIÚP (HELP CENTER)</h3>
              <p className="text-xs text-teal-100 mt-1 font-medium leading-relaxed">
                Tự phục vụ – Nhanh chóng – 24/7 – Hiệu quả
              </p>
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-teal-700 text-[10px] font-bold text-white px-3 py-0.5 rounded-full border border-teal-400 shadow-md">
              Trao Quyền Cho Khách Hàng
            </div>
          </div>
        </div>

        {/* 4 Main Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {/* Branch 1: XÂY DỰNG CƠ SỞ KIẾN THỨC (KNOWLEDGE BASE) */}
          <div 
            onClick={() => jumpToSection("sec-03")}
            className="group cursor-pointer p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-teal-200/60 dark:border-teal-800/50 shadow-lg hover:shadow-xl hover:border-teal-400 dark:hover:border-teal-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-black text-base border border-teal-500/20">
                  1
                </div>
                <div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    XÂY DỰNG CƠ SỞ KIẾN THỨC
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Trái tim trung tâm trợ giúp – FAQ & Hướng dẫn</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/40">
                <span className="font-bold text-teal-700 dark:text-teal-300">5 Danh Mục Chủ Đề Chính:</span>
                <div className="grid grid-cols-2 gap-1.5 mt-1.5 text-[11px]">
                  <span>• Tài khoản & Bảo mật</span>
                  <span>• Thanh toán & Hóa đơn</span>
                  <span>• Sản phẩm & Tính năng</span>
                  <span>• Kỹ thuật & Xử lý lỗi</span>
                  <span className="col-span-2">• Chính sách, Điều khoản & Hoàn tiền</span>
                </div>
              </div>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                  <span><strong>Đa định dạng:</strong> Hướng dẫn từng bước (Step-by-step), hình ảnh minh họa và video ngắn.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                  <span><strong>Cập nhật liên tục:</strong> Đảm bảo 100% tài liệu luôn đồng bộ với phiên bản app mới nhất.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Branch 2: CỔNG THÔNG TIN GỬI TICKET */}
          <div 
            onClick={() => jumpToSection("sec-04")}
            className="group cursor-pointer p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-blue-200/60 dark:border-blue-800/50 shadow-lg hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-base border border-blue-500/20">
                  2
                </div>
                <div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    CỔNG THÔNG TIN GỬI TICKET
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Gửi yêu cầu & theo dõi tiến độ minh bạch</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
                <span className="font-bold text-blue-700 dark:text-blue-300">Quy trình gửi & theo dõi 4 bước:</span>
                <div className="text-[11px] mt-1 space-y-0.5 text-slate-600 dark:text-slate-300">
                  <span>1. Điền biểu mẫu ➔ 2. Gửi ticket thành công ➔ 3. Theo dõi trạng thái ➔ 4. Xem lịch sử hỗ trợ</span>
                </div>
              </div>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <span><strong>Gửi yêu cầu 24/7 thuận tiện:</strong> Khách hàng chủ động gửi đính kèm ảnh/video lỗi.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <span><strong>Giảm thời gian chờ:</strong> Xem trực tiếp nhân viên phụ trách và hạn chót cam kết SLA.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Branch 3: TỐI ƯU HÓA KHẢ NĂNG TÌM KIẾM */}
          <div 
            onClick={() => jumpToSection("sec-04")}
            className="group cursor-pointer p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-amber-200/60 dark:border-amber-800/50 shadow-lg hover:shadow-xl hover:border-amber-400 dark:hover:border-amber-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-base border border-amber-500/20">
                  3
                </div>
                <div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    TỐI ƯU HÓA KHẢ NĂNG TÌM KIẾM
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Công cụ tìm kiếm thông minh & Gợi ý từ khóa</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
                <span className="font-bold text-amber-700 dark:text-amber-300">Tính năng tìm kiếm thông minh:</span>
                <div className="grid grid-cols-2 gap-1.5 mt-1.5 text-[11px]">
                  <span>• Gợi ý từ khóa tức thì</span>
                  <span>• Hiển thị kết quả liên quan</span>
                  <span>• Bộ lọc theo chủ đề</span>
                  <span>• Đề xuất bài viết hữu ích</span>
                </div>
              </div>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Tăng tỷ lệ tự giải quyết:</strong> Khách tìm thấy câu trả lời chỉ sau 10 giây tìm kiếm.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Phát hiện khoảng trống:</strong> Tự động ghi nhận từ khóa tìm kiếm không có kết quả để bổ sung bài.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Branch 4: TÍCH HỢP HỆ SINH THÁI ĐA KÊNH */}
          <div 
            onClick={() => jumpToSection("sec-06")}
            className="group cursor-pointer p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-indigo-200/60 dark:border-indigo-800/50 shadow-lg hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-base border border-indigo-500/20">
                  4
                </div>
                <div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    TÍCH HỢP CÁC KÊNH HỖ TRỢ
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Trải nghiệm liền mạch Chatbot - Agent - Help Center</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40">
                <span className="font-bold text-indigo-700 dark:text-indigo-300">Luồng hỗ trợ liên kết liền mạch:</span>
                <div className="text-[11px] mt-1 space-y-0.5 text-slate-600 dark:text-slate-300">
                  <span>Chat ➔ Chatbot gợi ý bài viết ➔ Không xong ➔ Chuyển Agent ➔ Agent gửi link bài chuẩn</span>
                </div>
              </div>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                  <span><strong>Giảm chuyển đổi kênh:</strong> Khách hàng giải quyết ngay trên widget nhúng trong app.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                  <span><strong>Hỗ trợ chuẩn xác:</strong> Agent chỉ cần 1 nhấp chuột để chèn bài viết KB vào tin nhắn thoại/chat.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 6 Key Results Pillars */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-teal-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              6 Kết Quả Vượt Trội Sau Khi Vận Hành Help Center
            </h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/30">
              <TrendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400 mx-auto mb-1" />
              <div className="text-h6 text-teal-700 dark:text-teal-300">-30%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Ticket lặp lại</div>
            </div>
            <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
              <div className="text-h6 text-blue-700 dark:text-blue-300">24/7</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Tự phục vụ tức thì</div>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
              <div className="text-h6 text-emerald-700 dark:text-emerald-300">94.8%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Độ hài lòng CSAT</div>
            </div>
            <div className="p-3 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/30">
              <DollarSign className="w-4 h-4 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
              <div className="text-h6 text-purple-700 dark:text-purple-300">-45%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Cost per Contact</div>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/30">
              <Users className="w-4 h-4 text-amber-600 dark:text-amber-400 mx-auto mb-1" />
              <div className="text-h6 text-amber-700 dark:text-amber-300">Tập trung</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Ca khó & VIP</div>
            </div>
            <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/30">
              <Sparkles className="w-4 h-4 text-rose-600 dark:text-rose-400 mx-auto mb-1" />
              <div className="text-h6 text-rose-700 dark:text-rose-300">10 Giây</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Tìm thấy câu trả lời</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
