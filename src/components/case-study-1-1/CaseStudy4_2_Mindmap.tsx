import React from "react";
import { 
  Compass, 
  TrendingUp, 
  Users, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Target, 
  BookOpen, 
  Briefcase, 
  ShieldCheck, 
  Star, 
  Layers, 
  DollarSign, 
  Sparkles,
  GraduationCap
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";

export function CaseStudy4_2_Mindmap({ 
  jumpToSection, 
  project 
}: { 
  jumpToSection: (id: string) => void; 
  project: ProjectCard;
}) {
  return (
    <section className="glass-base p-6 sm:p-10 rounded-3xl space-y-8 relative overflow-hidden bg-gradient-to-b from-white/90 via-purple-50/30 to-white/80 dark:from-slate-900/90 dark:via-purple-950/20 dark:to-slate-900/80 border border-purple-200/80 dark:border-purple-800/60 shadow-2xl backdrop-blur-xl">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />      {/* Header section of Mindmap - format chuẩn giống 01 · Tổng quan dự án */}
      <div className="flex items-center space-x-3 border-b border-sky-200/80 dark:border-sky-800/80 pb-3.5 sm:pb-4">
        <h2 className="text-base sm:text-xl md:text-2xl font-bold text-sky-600 dark:text-sky-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <span>00</span>
          <span className="text-sky-400 dark:text-sky-500 font-normal">·</span>
          <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400 shrink-0 inline-block" />
          <span>Sơ đồ tư duy khung năng lực & lộ trình phát triển CSKH</span>
        </h2>
      </div>

      {/* Central Interactive Mindmap Layout */}
      <div className="relative py-6">
        {/* Central Core Hub */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="group relative cursor-pointer" onClick={() => jumpToSection("sec-05")}>
            <div className="w-64 sm:w-80 p-5 rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 text-white shadow-xl shadow-purple-500/30 border-2 border-white/40 dark:border-purple-400/30 text-center transition-all duration-300 transform group-hover:scale-105">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                <Compass className="w-7 h-7 text-white animate-spin-slow" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-purple-900/40 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-white/20">
                Chuẩn Hóa Năng Lực ASK
              </span>
              <h3 className="text-lg font-bold">LỘ TRÌNH PHÁT TRIỂN NGHỀ NGHIỆP</h3>
              <p className="text-xs text-purple-100 mt-1 font-medium leading-relaxed">
                Minh bạch – Công bằng – Đa hướng – Bền vững
              </p>
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-purple-700 text-[10px] font-bold text-white px-3 py-0.5 rounded-full border border-purple-400 shadow-md">
              Giữ Chân & Phát Triển Nhân Tài
            </div>
          </div>
        </div>

        {/* 4 Main Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {/* Branch 1: KHUNG NĂNG LỰC ASK */}
          <div 
            onClick={() => jumpToSection("sec-03")}
            className="group cursor-pointer p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-purple-200/60 dark:border-purple-800/50 shadow-lg hover:shadow-xl hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black text-base border border-purple-500/20">
                  1
                </div>
                <div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    TỪ ĐIỂN NĂNG LỰC ASK
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Attitude (Thái độ) • Skill (Kỹ năng) • Knowledge (Kiến thức)</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40">
                <span className="font-bold text-purple-700 dark:text-purple-300">Chuẩn hóa 5 cấp bậc phát triển:</span>
                <div className="text-[11px] mt-1 space-y-0.5 text-slate-600 dark:text-slate-300">
                  <span>Level 1: Trainee ➔ L2: Junior Agent ➔ L3: Senior Agent ➔ L4: SME/Team Lead ➔ L5: CS Manager</span>
                </div>
              </div>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                  <span><strong>Xóa bỏ cảm tính:</strong> Tiêu chí xét bậc lương và thăng chức định lượng 100% qua điểm số KPI & sát hạch.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                  <span><strong>Ma trận kỹ năng rõ ràng:</strong> Định nghĩa cụ thể từng hành vi biểu hiện cho từng vị trí công việc.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Branch 2: LỘ TRÌNH THĂNG TIẾN KÉP */}
          <div 
            onClick={() => jumpToSection("sec-04")}
            className="group cursor-pointer p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-indigo-200/60 dark:border-indigo-800/50 shadow-lg hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-base border border-indigo-500/20">
                  2
                </div>
                <div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    LỘ TRÌNH KÉP (DUAL CAREER LADDER)
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Nhánh Quản lý (Management) & Nhánh Chuyên gia (Specialist)</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40">
                <span className="font-bold text-indigo-700 dark:text-indigo-300">2 Hướng Đi Tương Đương Đãi Ngộ:</span>
                <div className="grid grid-cols-2 gap-1.5 mt-1.5 text-[11px]">
                  <span>• Nhánh Quản trị: Lead ➔ Manager</span>
                  <span>• Nhánh Kỹ năng: QA ➔ Trainer ➔ SME</span>
                </div>
              </div>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                  <span><strong>Tôn trọng thiên hướng:</strong> Người giỏi chuyên môn không bị ép làm quản trị nhân sự vẫn hưởng lương cao.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                  <span><strong>Cơ chế luân chuyển linh hoạt:</strong> Cho phép chuyển đổi giữa các nhánh sau mỗi kỳ đánh giá năm.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Branch 3: ĐÁNH GIÁ KHOẢNG CÁCH NĂNG LỰC */}
          <div 
            onClick={() => jumpToSection("sec-04")}
            className="group cursor-pointer p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-blue-200/60 dark:border-blue-800/50 shadow-lg hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-base border border-blue-500/20">
                  3
                </div>
                <div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    ĐÁNH GIÁ NĂNG LỰC 360°
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Skill Gap Analysis & Cá nhân hóa kế hoạch phát triển (IDP)</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
                <span className="font-bold text-blue-700 dark:text-blue-300">Đánh giá đa chiều khách quan:</span>
                <div className="text-[11px] mt-1 space-y-0.5 text-slate-600 dark:text-slate-300">
                  <span>Tự đánh giá (Self) + Quản lý trực tiếp (Lead) + Chấm điểm QA + Khách hàng (CSAT)</span>
                </div>
              </div>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <span><strong>Kế hoạch phát triển cá nhân (IDP):</strong> Tự động gợi ý các khóa học bổ trợ cho phần năng lực còn yếu.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <span><strong>Huấn luyện 1-on-1 hàng tháng:</strong> Quản lý đóng vai trò Mentor hỗ trợ nhân viên đạt mục tiêu nghề nghiệp.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Branch 4: QUY HOẠCH KẾ THỪA LÃNH ĐẠO */}
          <div 
            onClick={() => jumpToSection("sec-06")}
            className="group cursor-pointer p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-emerald-200/60 dark:border-emerald-800/50 shadow-lg hover:shadow-xl hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-base border border-emerald-500/20">
                  4
                </div>
                <div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    QUY HOẠCH KẾ THỪA (SUCCESSION)
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Future Leader Fast-track & Giữ chân nhân tài nòng cốt</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                <span className="font-bold text-emerald-700 dark:text-emerald-300">Chương trình đào tạo cán bộ nguồn:</span>
                <div className="text-[11px] mt-1 space-y-0.5 text-slate-600 dark:text-slate-300">
                  <span>Huấn luyện kỹ năng quản trị, tư duy dữ liệu và giải quyết xung đột cho Top 10% Agent xuất sắc.</span>
                </div>
              </div>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Bổ nhiệm nội bộ 85%:</strong> Triệt tiêu rủi ro thiếu hụt nhân sự quản lý khi mở rộng quy mô.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Giảm tỷ lệ nghỉ việc (Turnover):</strong> Nhân sự nhìn thấy tương lai rõ ràng, gắn bó trung thành dài lâu.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 6 Key Results Pillars */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-purple-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              6 Thành Tựu Sau Khi Chuẩn Hóa Lộ Trình Phát Triển Nhân Tài
            </h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/30">
              <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
              <div className="text-h6 text-purple-700 dark:text-purple-300">85%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Bổ nhiệm nội bộ</div>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
              <div className="text-h6 text-emerald-700 dark:text-emerald-300">-60%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Tỷ lệ nhảy việc</div>
            </div>
            <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30">
              <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
              <div className="text-h6 text-blue-700 dark:text-blue-300">100%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Có lộ trình IDP</div>
            </div>
            <div className="p-3 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/30">
              <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mx-auto mb-1" />
              <div className="text-h6 text-indigo-700 dark:text-indigo-300">Dual Track</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Quản lý & Chuyên gia</div>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/30">
              <Star className="w-4 h-4 text-amber-600 dark:text-amber-400 mx-auto mb-1" />
              <div className="text-h6 text-amber-700 dark:text-amber-300">92%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Gắn kết eNPS</div>
            </div>
            <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/30">
              <Sparkles className="w-4 h-4 text-rose-600 dark:text-rose-400 mx-auto mb-1" />
              <div className="text-h6 text-rose-700 dark:text-rose-300">ASK Matrix</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Định lượng 100%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
