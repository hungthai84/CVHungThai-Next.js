import React from "react";
import { 
  Crown, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Award, 
  Gem, 
  Star 
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";

export function CaseStudy6_1_Mindmap({ 
  jumpToSection, 
  project: _project 
}: { 
  jumpToSection: (id: string) => void; 
  project: ProjectCard;
}) {
  return (
    <section className="glass-base p-6 sm:p-10 rounded-3xl space-y-8 relative overflow-hidden bg-gradient-to-b from-white/90 via-amber-50/30 to-white/80 dark:from-slate-900/90 dark:via-amber-950/20 dark:to-slate-900/80 border border-amber-200/80 dark:border-amber-800/60 shadow-2xl backdrop-blur-xl">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-400/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />      {/* Header section of Mindmap - format chuẩn giống 01 · Tổng quan dự án */}
      <div className="flex items-center space-x-3 border-b border-sky-200/80 dark:border-sky-800/80 pb-3.5 sm:pb-4">
        <h2 className="text-h6 font-bold text-sky-600 dark:text-sky-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <span>00</span>
          <span className="text-sky-400 dark:text-sky-500 font-normal">·</span>
          <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400 shrink-0 inline-block" />
          <span>Sơ đồ tư duy thiết lập & quản trị nhóm khách hàng VIP</span>
        </h2>
      </div>

      {/* Central Interactive Mindmap Layout */}
      <div className="relative py-6">
        {/* Central Core Hub */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="group relative cursor-pointer" onClick={() => jumpToSection("sec-05")}>
            <div className="w-64 sm:w-80 p-5 rounded-3xl bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-800 text-white shadow-xl shadow-amber-500/30 border-2 border-white/40 dark:border-amber-400/30 text-center transition-all duration-300 transform group-hover:scale-105">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                <Crown className="w-7 h-7 text-yellow-200 animate-bounce" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-amber-900/40 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-white/20">
                Trải Nghiệm Đặc Quyền
              </span>
              <h3 className="text-lg font-bold">QUẢN TRỊ KHÁCH HÀNG VIP</h3>
              <p className="text-xs text-amber-100 mt-1 font-medium leading-relaxed">
                Chuyên biệt – Đẳng cấp – Tận tâm – Giá trị cao
              </p>
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-700 text-[10px] font-bold text-white px-3 py-0.5 rounded-full border border-amber-400 shadow-md">
              Dịch Vụ Cá Nhân Hóa 1-on-1
            </div>
          </div>
        </div>

        {/* 4 Main Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {/* Branch 1: PHÂN LOẠI & TIÊU CHÍ KHÁCH HÀNG VIP */}
          <div 
            onClick={() => jumpToSection("sec-03")}
            className="group cursor-pointer p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-amber-200/60 dark:border-amber-800/50 shadow-lg hover:shadow-xl hover:border-amber-400 dark:hover:border-amber-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-base border border-amber-500/20">
                  1
                </div>
                <div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    PHÂN LOẠI & TIÊU CHÍ VIP
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Xếp hạng minh bạch dựa trên dữ liệu giao dịch</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
                <span className="font-bold text-amber-700 dark:text-amber-300">4 Hạng Mức Phân Tầng:</span>
                <div className="grid grid-cols-2 gap-1.5 mt-1.5 text-[11px]">
                  <span>• VIP Kim Cương (Diamond)</span>
                  <span>• VIP Vàng (Gold)</span>
                  <span>• VIP Bạc (Silver)</span>
                  <span>• Khách Tiêu Chuẩn (Standard)</span>
                </div>
              </div>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Tiêu chí định lượng:</strong> Tổng doanh số chi tiêu (GTV), tần suất giao dịch và thâm niên gắn bó.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Tối ưu hóa nguồn lực:</strong> Phân bổ ngân sách và nhân sự tập trung vào nhóm tạo ra 80% doanh thu.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Branch 2: ĐỘI NGŨ HỖ TRỢ CHUYÊN BIỆT */}
          <div 
            onClick={() => jumpToSection("sec-04")}
            className="group cursor-pointer p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-yellow-200/60 dark:border-yellow-800/50 shadow-lg hover:shadow-xl hover:border-yellow-400 dark:hover:border-yellow-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 flex items-center justify-center font-black text-base border border-yellow-500/20">
                  2
                </div>
                <div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                    ĐỘI NGŨ CHUYÊN BIỆT (VIP DESK)
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Account Manager riêng biệt & Senior CS Agents</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-yellow-50/50 dark:bg-yellow-950/30 border border-yellow-100 dark:border-yellow-900/40">
                <span className="font-bold text-yellow-700 dark:text-yellow-300">Mô hình Account Manager (1-on-1):</span>
                <div className="text-[11px] mt-1 space-y-0.5 text-slate-600 dark:text-slate-300">
                  <span>Mỗi chuyên viên quản lý nhóm 30-50 khách hàng VIP, nắm rõ thói quen, sở thích và nhu cầu kinh doanh.</span>
                </div>
              </div>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
                  <span><strong>Tiêu chuẩn khắt khe:</strong> Tối thiểu 3 năm kinh nghiệm, kỹ năng giao tiếp tinh tế và bảo mật tuyệt đối.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
                  <span><strong>Đồng hành 24/7:</strong> Hỗ trợ trực tiếp qua kênh liên lạc riêng biệt (Hotline VIP, Zalo/Telegram VIP).</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Branch 3: QUY TRÌNH HỖ TRỢ ƯU TIÊN */}
          <div 
            onClick={() => jumpToSection("sec-04")}
            className="group cursor-pointer p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-orange-200/60 dark:border-orange-800/50 shadow-lg hover:shadow-xl hover:border-orange-400 dark:hover:border-orange-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center font-black text-base border border-orange-500/20">
                  3
                </div>
                <div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    QUY TRÌNH ƯU TIÊN (PRIORITY SLA)
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Định tuyến cuộc gọi tức thì & Xử lý thần tốc</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-orange-50/50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/40">
                <span className="font-bold text-orange-700 dark:text-orange-300">Cam kết SLA VIP vượt trội:</span>
                <div className="grid grid-cols-2 gap-1.5 mt-1.5 text-[11px]">
                  <span>• Bắt máy trong &lt; 15 giây</span>
                  <span>• Xử lý khiếu nại &lt; 2 giờ</span>
                  <span>• Quyền duyệt hoàn tiền tức thì</span>
                  <span>• Liên kết ban giám đốc</span>
                </div>
              </div>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                  <span><strong>Ưu tiên hàng đợi (Zero-Wait):</strong> Cuộc gọi từ VIP tự động đẩy lên đầu hàng đợi và gán cho Account Manager.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                  <span><strong>Cơ chế đặc cách ngoại lệ:</strong> Chuyên viên VIP được trao quyền phê duyệt đền bù/hỗ trợ mà không cần qua nhiều cấp.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Branch 4: CHƯƠNG TRÌNH TRI ÂN & GẮN KẾT */}
          <div 
            onClick={() => jumpToSection("sec-06")}
            className="group cursor-pointer p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-rose-200/60 dark:border-rose-800/50 shadow-lg hover:shadow-xl hover:border-rose-400 dark:hover:border-rose-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-black text-base border border-rose-500/20">
                  4
                </div>
                <div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    TRI ÂN & GẮN KẾT (LOYALTY)
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Xây dựng quan hệ bền chặt & Đại sứ thương hiệu</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
                <span className="font-bold text-rose-700 dark:text-rose-300">Đặc quyền phi tài chính:</span>
                <div className="text-[11px] mt-1 space-y-0.5 text-slate-600 dark:text-slate-300">
                  <span>Quà sinh nhật cá nhân hóa • Vé tham dự sự kiện cao cấp • Trải nghiệm thử tính năng Beta độc quyền</span>
                </div>
              </div>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Tăng tỷ lệ giữ chân (Retention):</strong> Triệt tiêu nguy cơ khách hàng lớn chuyển sang đối thủ cạnh tranh.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Gia tăng giá trị trọn đời (LTV):</strong> Thúc đẩy khách hàng VIP mở rộng hợp đồng và giới thiệu đối tác mới.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 6 Key Results Pillars */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-amber-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              6 Thành Tựu Đột Phá Sau Khi Vận Hành Đội Ngũ VIP Desk
            </h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/30">
              <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400 mx-auto mb-1" />
              <div className="text-h6 text-amber-700 dark:text-amber-300">+32.6%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Doanh thu VIP</div>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
              <div className="text-h6 text-emerald-700 dark:text-emerald-300">98.2%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Giữ chân VIP</div>
            </div>
            <div className="p-3 rounded-2xl bg-yellow-50/60 dark:bg-yellow-950/40 border border-yellow-100 dark:border-yellow-900/30">
              <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mx-auto mb-1" />
              <div className="text-h6 text-yellow-700 dark:text-yellow-300">98.7%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">CSAT Hài lòng</div>
            </div>
            <div className="p-3 rounded-2xl bg-orange-50/60 dark:bg-orange-950/40 border border-orange-100 dark:border-orange-900/30">
              <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400 mx-auto mb-1" />
              <div className="text-h6 text-orange-700 dark:text-orange-300">&lt; 15s</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Thời gian nhấc máy</div>
            </div>
            <div className="p-3 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/30">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
              <div className="text-h6 text-purple-700 dark:text-purple-300">+88</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Chỉ số NPS</div>
            </div>
            <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/30">
              <Gem className="w-4 h-4 text-rose-600 dark:text-rose-400 mx-auto mb-1" />
              <div className="text-h6 text-rose-700 dark:text-rose-300">1-on-1</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Quản lý riêng biệt</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
