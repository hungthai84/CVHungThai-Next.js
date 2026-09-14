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
  AlertTriangle
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";

export function CaseStudy3_4_Mindmap({ 
  jumpToSection, 
  project 
}: { 
  jumpToSection: (id: string) => void; 
  project: ProjectCard;
}) {
  return (
    <section className="glass-base p-6 sm:p-10 rounded-3xl space-y-8 relative overflow-hidden bg-gradient-to-b from-white/90 via-amber-50/30 to-white/80 dark:from-slate-900/90 dark:via-amber-950/20 dark:to-slate-900/80 border border-amber-200/80 dark:border-amber-800/60 shadow-2xl backdrop-blur-xl">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-400/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />      {/* Header section of Mindmap - format chuẩn giống 01 · Tổng quan dự án */}
      <div className="flex items-center space-x-3 border-b border-sky-200/80 dark:border-sky-800/80 pb-3.5 sm:pb-4">
        <h2 className="text-base sm:text-xl md:text-2xl font-bold text-sky-600 dark:text-sky-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <span>00</span>
          <span className="text-sky-400 dark:text-sky-500 font-normal">·</span>
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400 shrink-0 inline-block" />
          <span>Sơ đồ tư duy quản lý cơ sở tri thức & huấn luyện AI</span>
        </h2>
      </div>

      {/* Central Interactive Mindmap Layout */}
      <div className="relative py-6">
        {/* SVG Connector Lines */}
        <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="kb-grad-blue" x1="50%" y1="50%" x2="20%" y2="20%">
              <stop offset="0%" stopColor="#d97706" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="kb-grad-purple" x1="50%" y1="50%" x2="80%" y2="20%">
              <stop offset="0%" stopColor="#d97706" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="kb-grad-emerald" x1="50%" y1="50%" x2="20%" y2="80%">
              <stop offset="0%" stopColor="#d97706" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="kb-grad-amber" x1="50%" y1="50%" x2="80%" y2="80%">
              <stop offset="0%" stopColor="#d97706" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path d="M 50% 50% Q 35% 35% 25% 25%" stroke="url(#kb-grad-blue)" strokeWidth="3" fill="none" />
          <path d="M 50% 50% Q 65% 35% 75% 25%" stroke="url(#kb-grad-purple)" strokeWidth="3" fill="none" />
          <path d="M 50% 50% Q 35% 65% 25% 75%" stroke="url(#kb-grad-emerald)" strokeWidth="3" fill="none" />
          <path d="M 50% 50% Q 65% 65% 75% 75%" stroke="url(#kb-grad-amber)" strokeWidth="3" fill="none" />
        </svg>

        {/* Central Core Hub */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="group relative cursor-pointer" onClick={() => jumpToSection("sec-05")}>
            <div className="w-64 sm:w-72 p-5 rounded-3xl bg-gradient-to-br from-amber-600 via-orange-600 to-amber-800 text-white shadow-xl shadow-amber-500/30 border-2 border-white/40 dark:border-amber-400/30 text-center transition-all duration-300 transform group-hover:scale-105">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                <BookOpen className="w-7 h-7 text-white animate-pulse" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-amber-900/40 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-white/20">
                Bộ Não Số Doanh Nghiệp
              </span>
              <h3 className="text-xl font-black text-white">QUẢN TRỊ TRI THỨC</h3>
              <p className="text-xs text-amber-100 mt-1 font-medium">&amp; Huấn Luyện AI Thông Minh</p>
              
              <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-amber-100 group-hover:text-white">
                <span>Khám phá Hệ thống KB</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
          {/* Branch 1: Knowledge Base Core */}
          <div 
            onClick={() => jumpToSection("sec-04")} 
            className="group cursor-pointer rounded-2xl p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 border border-blue-200 dark:border-blue-800/60 shadow-lg hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    1
                  </div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Cơ Sở Tri Thức Tập Trung
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  Single Source of Truth
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Nơi lưu trữ duy nhất, chuẩn xác cho toàn bộ thông tin sản phẩm, quy trình SOP và chính sách của doanh nghiệp.
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-blue-500" /> Cây thư mục phân cấp
                  </span>
                  <p className="text-[10px] text-slate-500">Public KB &amp; Internal Wiki riêng biệt</p>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <Search className="w-3.5 h-3.5 text-blue-500" /> Tìm kiếm ngữ nghĩa
                  </span>
                  <p className="text-[10px] text-slate-500">Semantic Search &amp; Gắn thẻ Tags</p>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Quy trình kiểm duyệt
                  </span>
                  <p className="text-[10px] text-slate-500">Soạn thảo &rarr; Review &rarr; Duyệt</p>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-500" /> Quản lý phiên bản
                  </span>
                  <p className="text-[10px] text-slate-500">Version History &amp; Rollback 1-click</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500 dark:text-slate-400">
                Quy mô: 1.200+ bài viết chuẩn hóa
              </span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                Chi tiết <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>

          {/* Branch 2: AI Training & Fine-tuning */}
          <div 
            onClick={() => jumpToSection("sec-05")} 
            className="group cursor-pointer rounded-2xl p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 border border-purple-200 dark:border-purple-800/60 shadow-lg hover:shadow-xl hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    2
                  </div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    Huấn Luyện &amp; Tinh Chỉnh AI
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                  RAG &amp; Vector Embeddings
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Biến tài liệu tri thức tĩnh thành dữ liệu huấn luyện vector chất lượng cao cho các mô hình AI/LLM.
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start gap-2">
                  <Cpu className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">RAG Pipeline Hiện Đại:</span>
                    <p className="text-[11px] text-slate-500">Truy xuất chính xác văn bản gốc, giảm ảo giác (hallucination) xuống &lt; 2%.</p>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Vector Embeddings &amp; Chunking:</span>
                    <p className="text-[11px] text-slate-500">Tự động phân tách tài liệu PDF/Word và đánh chỉ mục vector tự động.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500 dark:text-slate-400">
                Độ chính xác AI: 94% câu trả lời chuẩn xác
              </span>
              <span className="text-purple-600 dark:text-purple-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                Chi tiết <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>

          {/* Branch 3: Continuous Learning Loop */}
          <div 
            onClick={() => jumpToSection("sec-05")} 
            className="group cursor-pointer rounded-2xl p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 border border-emerald-200 dark:border-emerald-800/60 shadow-lg hover:shadow-xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    3
                  </div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Vòng Lặp Học Tập Liên Tục
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  Continuous Learning Loop
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Hệ thống tự hoàn thiện và thông minh hơn theo thời gian thông qua phản hồi thực tế từ người dùng.
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-500" /> User Feedback
                  </span>
                  <p className="text-[10px] text-slate-500">Đánh giá Thích / Không thích &amp; lý do</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Knowledge Gap
                  </span>
                  <p className="text-[10px] text-slate-500">Phát hiện từ khóa không có kết quả</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500 dark:text-slate-400">
                Tự động đề xuất chủ đề bài viết mới
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                Chi tiết <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>

          {/* Branch 4: Results & Impact */}
          <div 
            onClick={() => jumpToSection("sec-08")} 
            className="group cursor-pointer rounded-2xl p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 border border-amber-200 dark:border-amber-800/60 shadow-lg hover:shadow-xl hover:border-amber-400 dark:hover:border-amber-500 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    4
                  </div>
                  <h4 className="text-h6 text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Kết Quả &amp; Giá Trị Mang Lại
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                  Knowledge ROI
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                Chuẩn hóa tri thức, giải phóng thời gian tra cứu và bảo toàn tài sản trí tuệ doanh nghiệp.
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Thời gian tra cứu của Agent</span>
                  <strong className="text-h6 text-emerald-600">&lt; 15 Giây (giảm 70%)</strong>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Tự giải quyết trên Web</span>
                  <strong className="text-h6 text-amber-600">88% Thành Công</strong>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500 dark:text-slate-400">
                100% Đồng nhất thông tin quy trình
              </span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                Chi tiết <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>
        </div>

        {/* 5 Core Pillars Banner */}
        <div className="mt-8 pt-6 border-t border-amber-100 dark:border-amber-900/50 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center">
          <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40">
            <BookOpen className="w-4 h-4 mx-auto text-amber-600 dark:text-amber-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Đồng Nhất Tri Thức</p>
            <span className="text-[10px] text-slate-500">Chuẩn 100%</span>
          </div>
          <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/40">
            <Clock className="w-4 h-4 mx-auto text-blue-600 dark:text-blue-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Tiết Kiệm Thời Gian</p>
            <span className="text-[10px] text-slate-500">Tra cứu tức thì</span>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/40">
            <ShieldCheck className="w-4 h-4 mx-auto text-purple-600 dark:text-purple-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Bảo Tồn Tài Sản</p>
            <span className="text-[10px] text-slate-500">Không phụ thuộc người cũ</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40">
            <Cpu className="w-4 h-4 mx-auto text-emerald-600 dark:text-emerald-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">AI Chuẩn Xác 94%</p>
            <span className="text-[10px] text-slate-500">RAG không ảo giác</span>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-800/40 col-span-2 sm:col-span-1">
            <RefreshCw className="w-4 h-4 mx-auto text-rose-600 dark:text-rose-400 mb-1" />
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Học Hỏi Không Ngừng</p>
            <span className="text-[10px] text-slate-500">Feedback loop</span>
          </div>
        </div>
      </div>
    </section>
  );
}
