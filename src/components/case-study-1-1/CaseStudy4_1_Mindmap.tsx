import React from "react";
import { 
  GraduationCap, 
  Layers, 
  Video, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Sparkles, 
  BookOpen, 
  FileText, 
  Compass, 
  Laptop, 
  Smartphone, 
  Clock, 
  Users, 
  DollarSign, 
  Target, 
  HelpCircle,
  PlayCircle,
  Flame
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";

export function CaseStudy4_1_Mindmap({ 
  jumpToSection, 
  project 
}: { 
  jumpToSection: (id: string) => void; 
  project: ProjectCard;
}) {
  return (
    <section className="glass-base p-6 sm:p-10 rounded-3xl space-y-8 relative overflow-hidden bg-gradient-to-b from-white/90 via-blue-50/30 to-white/80 dark:from-slate-900/90 dark:via-blue-950/20 dark:to-slate-900/80 border border-blue-200/80 dark:border-blue-800/60 shadow-2xl backdrop-blur-xl">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />      {/* Header section of Mindmap - format chuẩn giống 01 · Tổng quan dự án */}
      <div className="flex items-center space-x-3 border-b border-sky-200/80 dark:border-sky-800/80 pb-3.5 sm:pb-4">
        <h2 className="text-h6 font-bold text-sky-600 dark:text-sky-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <span>00</span>
          <span className="text-sky-400 dark:text-sky-500 font-normal">·</span>
          <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400 shrink-0 inline-block" />
          <span>Sơ đồ tư duy hệ thống đào tạo trực tuyến (E-Learning)</span>
        </h2>
      </div>

      {/* Central Interactive Mindmap Layout */}
      <div className="relative py-6">
        {/* Central Core Hub */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="group relative cursor-pointer" onClick={() => jumpToSection("sec-05")}>
            <div className="w-64 sm:w-80 p-5 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 text-white shadow-xl shadow-blue-500/30 border-2 border-white/40 dark:border-blue-400/30 text-center transition-all duration-300 transform group-hover:scale-105">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                <GraduationCap className="w-7 h-7 text-white animate-pulse" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-blue-900/40 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-white/20">
                Học Viện CSKH Nội Bộ
              </span>
              <h3 className="text-lg font-bold">HỆ THỐNG ĐÀO TẠO TRỰC TUYẾN</h3>
              <p className="text-xs text-blue-100 mt-1 font-medium leading-relaxed">
                Học chủ động – Phát triển liên tục – Nâng cao chất lượng dịch vụ
              </p>
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-blue-700 text-[10px] font-bold text-white px-3 py-0.5 rounded-full border border-blue-400 shadow-md">
              Lõi Đào Tạo & Phát Triển
            </div>
          </div>
        </div>

        {/* 4 Main Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {/* Branch 1: XÂY DỰNG KHUNG CHƯƠNG TRÌNH ĐÀO TẠO */}
          <div 
            onClick={() => jumpToSection("sec-03")}
            className="group cursor-pointer p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-blue-200/60 dark:border-blue-800/50 shadow-lg hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-base border border-blue-500/20">
                  1
                </div>
                <div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    XÂY DỰNG KHUNG CHƯƠNG TRÌNH
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Hệ thống hóa module học tập theo lộ trình</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
                <span className="font-bold text-blue-700 dark:text-blue-300">5 Module Cốt Lõi:</span>
                <div className="grid grid-cols-2 gap-1.5 mt-1.5 text-[11px]">
                  <span className="flex items-center gap-1">• M1: Onboarding hội nhập</span>
                  <span className="flex items-center gap-1">• M2: Quy trình khiếu nại</span>
                  <span className="flex items-center gap-1">• M3: Kỹ năng điện thoại</span>
                  <span className="flex items-center gap-1">• M4: Thành thạo CRM/App</span>
                  <span className="col-span-2 flex items-center gap-1">• M5: Cập nhật sản phẩm & chính sách mới</span>
                </div>
              </div>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <span><strong>Lộ trình bậc thang:</strong> Đi từ cơ bản nền tảng đến kỹ năng xử lý ca khó nâng cao.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <span><strong>Bám sát SOP:</strong> Đảm bảo 100% nội dung khớp với quy trình tác nghiệp thực tế.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Branch 2: SỐ HÓA NỘI DUNG ĐA DẠNG */}
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
                    SỐ HÓA NỘI DUNG ĐA DẠNG
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Micro-learning, video, quiz & tình huống</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40">
                <span className="font-bold text-indigo-700 dark:text-indigo-300">Định dạng số hóa chuẩn:</span>
                <div className="grid grid-cols-2 gap-1.5 mt-1.5 text-[11px]">
                  <span className="flex items-center gap-1"><Video className="w-3 h-3 text-indigo-500" /> Video ngắn (3-5 phút)</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3 text-indigo-500" /> Slide tương tác SCORM</span>
                  <span className="flex items-center gap-1"><HelpCircle className="w-3 h-3 text-indigo-500" /> Quiz trắc nghiệm nhanh</span>
                  <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-indigo-500" /> Case study thực chiến</span>
                </div>
              </div>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                  <span><strong>Dễ học - Dễ nhớ:</strong> Tối ưu theo nguyên lý nhận thức não bộ, tránh quá tải thông tin.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                  <span><strong>Đánh giá tức thì:</strong> Nhận kết quả và giải thích chi tiết ngay sau mỗi bài kiểm tra.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Branch 3: TRIỂN KHAI NỀN TẢNG LMS */}
          <div 
            onClick={() => jumpToSection("sec-04")}
            className="group cursor-pointer p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-emerald-200/60 dark:border-emerald-800/50 shadow-lg hover:shadow-xl hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-base border border-emerald-500/20">
                  3
                </div>
                <div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    TRIỂN KHAI NỀN TẢNG LMS
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Hệ thống quản lý học tập đa thiết bị</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                <span className="font-bold text-emerald-700 dark:text-emerald-300">Tính năng quản trị chính:</span>
                <div className="grid grid-cols-2 gap-1.5 mt-1.5 text-[11px]">
                  <span>• Quản lý kho khóa học</span>
                  <span>• Theo dõi tiến độ học tập</span>
                  <span>• Tự động cấp chứng chỉ</span>
                  <span>• Nhắc học & thông báo đẩy</span>
                </div>
              </div>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Học mọi lúc mọi nơi:</strong> Đồng bộ liền mạch giữa Web và Mobile App.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Nền tảng tương thích:</strong> Moodle, TalentLMS, Docebo, LearnUpon chuẩn DN.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Branch 4: TÍCH HỢP VÀO LỘ TRÌNH PHÁT TRIỂN */}
          <div 
            onClick={() => jumpToSection("sec-06")}
            className="group cursor-pointer p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-amber-200/60 dark:border-amber-800/50 shadow-lg hover:shadow-xl hover:border-amber-400 dark:hover:border-amber-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-base border border-amber-500/20">
                  4
                </div>
                <div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    TÍCH HỢP LỘ TRÌNH PHÁT TRIỂN
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Gắn kết đào tạo với thăng tiến & nhân sự</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
                <span className="font-bold text-amber-700 dark:text-amber-300">Luồng tích hợp nhân sự (5 bước):</span>
                <div className="text-[11px] mt-1 space-y-0.5 text-slate-600 dark:text-slate-300">
                  <span>Khoảng cách năng lực ➔ Lộ trình cá nhân ➔ Học & Đánh giá ➔ Chứng chỉ ➔ Xét thăng chức</span>
                </div>
              </div>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Công bằng & minh bạch:</strong> Tiêu chí thăng chức được định lượng bằng số tín chỉ hoàn thành.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Giữ chân nhân tài:</strong> Tạo động lực gắn bó dài lâu nhờ cơ hội phát triển nghề nghiệp rõ ràng.</span>
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
              6 Kết Quả Đột Phá Sau Khi Chuyển Đổi Sang E-Learning
            </h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
              <div className="text-h6 text-blue-700 dark:text-blue-300">-45%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Thời gian & chi phí</div>
            </div>
            <div className="p-3 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/30">
              <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mx-auto mb-1" />
              <div className="text-h6 text-indigo-700 dark:text-indigo-300">96.4%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Tỷ lệ hoàn thành</div>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
              <div className="text-h6 text-emerald-700 dark:text-emerald-300">100%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Chuẩn hóa SOP</div>
            </div>
            <div className="p-3 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/30">
              <Laptop className="w-4 h-4 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
              <div className="text-h6 text-purple-700 dark:text-purple-300">24/7</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Học chủ động</div>
            </div>
            <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/30">
              <Users className="w-4 h-4 text-rose-600 dark:text-rose-400 mx-auto mb-1" />
              <div className="text-h6 text-rose-700 dark:text-rose-300">-60%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Tỷ lệ nghỉ việc</div>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/30">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 mx-auto mb-1" />
              <div className="text-h6 text-amber-700 dark:text-amber-300">Top 1</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Văn hóa học tập</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
