import React from "react";
import { CaseStudy2_1_Tools } from "./CaseStudy2_1_Tools";
import { 
  FolderKanban, 
  Layers, 
  FileText, 
  Tag, 
  Calendar, 
  Globe, 
  Bookmark, 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  GitPullRequest, 
  Users, 
  HeartCrack, 
  Target, 
  Compass, 
  Flag, 
  Sliders, 
  Smile, 
  Rocket, 
  Cpu, 
  CheckCircle, 
  Share2, 
  GitMerge, 
  ClipboardList, 
  Layout, 
  GraduationCap, 
  Gauge, 
  UserCheck, 
  Award, 
  Crown, 
  Key, 
  Wrench, 
  BookCheck, 
  Database, 
  Bot, 
  ShieldCheck, 
  Landmark, 
  Trophy, 
  BadgeCheck, 
  Check, 
  Sparkles 
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";

export function CaseStudy2_1_Sections({ project }: { project: ProjectCard }) {
  const cs = project.caseStudy;
  const actions = cs?.actions || [];
  const results = cs?.results || [];

  return (
    <div id="article-section" className="space-y-4 md:space-y-5 flex flex-col gap-4 md:gap-5 animate-fadeIn">
      {/* 01 · Tổng quan dự án & EXECUTIVE OVERVIEW */}
      <section id="sec-01" className="p-5 sm:p-7 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-sky-100 dark:border-sky-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center space-x-3 border-b border-sky-200/80 dark:border-sky-800/80 pb-3.5 sm:pb-4">
          <h2 className="text-base sm:text-xl md:text-2xl font-bold text-sky-600 dark:text-sky-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <span>01</span>
            <span className="text-sky-400 dark:text-sky-500 font-normal">·</span>
            <FolderKanban className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400 shrink-0 inline-block" />
            <span>Tổng quan dự án</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-2xl bg-sky-500/10 dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-800/60 space-y-1">
            <span className="text-2xs font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-sky-500" /> Tên Dự Án
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{project.branchTitle}</p>
          </div>
          <div className="p-4 rounded-2xl bg-indigo-500/10 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 space-y-1">
            <span className="text-2xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-indigo-500" /> Nhóm & Chuyên Mục
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{project.groupTitle} <span className="text-xs font-normal text-slate-500">{project.groupHashtag}</span></p>
          </div>
          <div className="p-4 rounded-2xl bg-purple-500/10 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/60 space-y-1">
            <span className="text-2xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-purple-500" /> Vai Trò & Thời Gian
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{project.role} • {project.timeframe} ({project.phase})</p>
          </div>
          <div className="p-4 rounded-2xl bg-blue-500/10 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 space-y-1 md:col-span-2 lg:col-span-1">
            <span className="text-2xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-blue-500" /> Mục Tiêu Chiến Lược
            </span>
            <p className="text-xs font-medium text-slate-700 dark:text-slate-200">{project.description}</p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 space-y-1 md:col-span-2 lg:col-span-2">
            <span className="text-2xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-emerald-500" /> Phạm Vi & Đối Tượng Hưởng Lợi
            </span>
            <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
              Toàn bộ máy CSKH đa kênh, Ban Giám đốc, Đội ngũ Tuyển dụng/HR, Tư vấn viên & Khách hàng người dùng trong hệ sinh thái.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
          <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
            <Bookmark className="w-4 h-4 text-sky-500" />
            <span>Project Executive Summary & Giải Pháp</span>
          </div>
          <p className="text-sm leading-relaxed font-body text-slate-800 dark:text-slate-100 font-normal">
            {cs?.solutionSummary || project.description}
          </p>
        </div>
      </section>

      {/* 02 · Bối cảnh & hiện trạng */}
      <section id="sec-02" className="p-5 sm:p-7 rounded-3xl bg-indigo-50/40 dark:bg-slate-900/80 border border-indigo-100 dark:border-indigo-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center space-x-3 border-b border-indigo-200/80 dark:border-indigo-800/80 pb-3.5 sm:pb-4">
          <h2 className="text-base sm:text-xl md:text-2xl font-bold text-indigo-600 dark:text-indigo-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <span>02</span>
            <span className="text-indigo-400 dark:text-indigo-500 font-normal">·</span>
            <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400 shrink-0 inline-block" />
            <span>Bối cảnh & hiện trạng</span>
          </h2>
        </div>

        <div className="p-5 rounded-2xl glass-inner space-y-2.5">
          <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase flex items-center space-x-1.5">
            <TrendingUp className="w-4 h-4" /> <span>Bối cảnh & Vấn đề cốt lõi</span>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-200 font-body leading-relaxed">
            {cs?.context || project.description}
          </p>
        </div>
      </section>

      {/* 03 · Vấn đề & thách thức */}
      <section id="sec-03" className="p-5 sm:p-7 rounded-3xl bg-rose-50/40 dark:bg-slate-900/80 border border-rose-100 dark:border-rose-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center space-x-3 border-b border-rose-200/80 dark:border-rose-800/80 pb-3.5 sm:pb-4">
          <h2 className="text-base sm:text-xl md:text-2xl font-bold text-rose-600 dark:text-rose-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <span>03</span>
            <span className="text-rose-400 dark:text-rose-500 font-normal">·</span>
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600 dark:text-rose-400 shrink-0 inline-block" />
            <span>Vấn đề & thách thức</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl glass-inner space-y-2.5">
            <div className="font-bold text-rose-800 dark:text-rose-300 text-sm flex items-center space-x-2">
              <GitPullRequest className="w-4 h-4 text-rose-600" /> <span>Thách thức 01: Quy trình & Cấu trúc</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-body">Xử lý đan xen nhiều kênh thiếu nhóm chuyên trách phụ trách từng luồng.</p>
          </div>
          <div className="p-5 rounded-2xl glass-inner space-y-2.5">
            <div className="font-bold text-amber-800 dark:text-amber-300 text-sm flex items-center space-x-2">
              <Users className="w-4 h-4 text-amber-600" /> <span>Thách thức 02: Năng lực & Tiêu chuẩn</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-body">Cần quy hoạch khung năng lực chuẩn mực và quy trình đào tạo bài bản.</p>
          </div>
          <div className="p-5 rounded-2xl glass-inner space-y-2.5">
            <div className="font-bold text-purple-800 dark:text-purple-300 text-sm flex items-center space-x-2">
              <HeartCrack className="w-4 h-4 text-purple-600" /> <span>Thách thức 03: Tối ưu hóa trải nghiệm</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-body">Cần thấu cảm nhu cầu thực sự của khách hàng để đo lường chỉ số hài lòng.</p>
          </div>
        </div>
      </section>

      {/* 04 · SƠ ĐỒ TƯ DUY 4 TRỤ CỘT VẬN HÀNH CSKH */}
      <section id="sec-04" className="p-5 sm:p-7 rounded-3xl bg-purple-50/40 dark:bg-slate-900/80 border border-purple-100 dark:border-purple-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center space-x-3 border-b border-purple-200/80 dark:border-purple-800/80 pb-3.5 sm:pb-4">
          <h2 className="text-base sm:text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <span>04</span>
            <span className="text-purple-400 dark:text-purple-500 font-normal">·</span>
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400 shrink-0 inline-block" />
            <span>Sơ đồ tư duy 4 trụ cột vận hành CSKH</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-2xl bg-blue-500/10 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 space-y-1.5 hover:shadow-md transition duration-300">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center mb-1"><Flag className="w-4 h-4" /></div>
            <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase block">Chiến Lược</span>
            <p className="text-xs text-slate-700 dark:text-slate-200 font-body">Gắn liền mục tiêu phòng ban với chiến lược phát triển toàn diện của công ty.</p>
          </div>
          <div className="p-4 rounded-2xl bg-purple-500/10 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/60 space-y-1.5 hover:shadow-md transition duration-300">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-600 flex items-center justify-center mb-1"><Sliders className="w-4 h-4" /></div>
            <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase block">Vận Hành</span>
            <p className="text-xs text-slate-700 dark:text-slate-200 font-body">Chuẩn hóa ma trận KPI/OKR, tối ưu thời gian phản hồi và tỷ lệ FCR.</p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 space-y-1.5 hover:shadow-md transition duration-300">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center mb-1"><Smile className="w-4 h-4" /></div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase block">Khách Hàng</span>
            <p className="text-xs text-slate-700 dark:text-slate-200 font-body">Nâng cao chỉ số hài lòng CSAT và niềm tin thương hiệu bền vững.</p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 space-y-1.5 hover:shadow-md transition duration-300">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center mb-1"><Rocket className="w-4 h-4" /></div>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase block">Phát Triển</span>
            <p className="text-xs text-slate-700 dark:text-slate-200 font-body">Thiết lập bệ phóng sẵn sàng tích hợp công nghệ và mở rộng linh hoạt.</p>
          </div>
        </div>
      </section>

      {/* 05 · Mô hình & giải pháp thực thi */}
      <section id="sec-05" className="p-5 sm:p-7 rounded-3xl bg-cyan-50/40 dark:bg-slate-900/80 border border-cyan-100 dark:border-cyan-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center space-x-3 border-b border-cyan-200/80 dark:border-cyan-800/80 pb-3.5 sm:pb-4">
          <h2 className="text-base sm:text-xl md:text-2xl font-bold text-cyan-600 dark:text-cyan-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <span>05</span>
            <span className="text-cyan-400 dark:text-cyan-500 font-normal">·</span>
            <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 dark:text-cyan-400 shrink-0 inline-block" />
            <span>Mô hình & giải pháp thực thi</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((act, idx) => {
            const themeStyles = [
              { titleColor: "text-sky-800 dark:text-sky-300", badgeBg: "bg-sky-500/15 text-sky-700 dark:text-sky-300", valBg: "bg-cyan-500/15 text-cyan-800 dark:text-cyan-300", border: "hover:border-sky-400" },
              { titleColor: "text-purple-800 dark:text-purple-300", badgeBg: "bg-purple-500/15 text-purple-700 dark:text-purple-300", valBg: "bg-purple-500/15 text-purple-800 dark:text-purple-300", border: "hover:border-purple-400" },
              { titleColor: "text-emerald-800 dark:text-emerald-300", badgeBg: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300", valBg: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300", border: "hover:border-emerald-400" },
              { titleColor: "text-amber-800 dark:text-amber-300", badgeBg: "bg-amber-500/15 text-amber-700 dark:text-amber-300", valBg: "bg-amber-500/15 text-amber-800 dark:text-amber-300", border: "hover:border-amber-400" },
            ];
            const st = themeStyles[idx % themeStyles.length];
            return (
              <div key={idx} className={`p-5 rounded-2xl glass-inner space-y-2.5 transition duration-300 ${st.border}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold uppercase flex items-center gap-1.5 ${st.titleColor}`}>
                    <Compass className="w-4 h-4" /> Trụ Cột 0{idx + 1}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-3xs font-extrabold ${st.badgeBg}`}>Thực thi</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{act.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-body leading-relaxed">{act.desc}</p>
                <div className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${st.valBg}`}>
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span><strong>Giá trị mang lại:</strong> {act.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 06 · Triển khai & vận hành */}
      <section id="sec-06" className="p-5 sm:p-7 rounded-3xl bg-blue-50/40 dark:bg-slate-900/80 border border-blue-100 dark:border-blue-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center space-x-3 border-b border-blue-200/80 dark:border-blue-800/80 pb-3.5 sm:pb-4">
          <h2 className="text-base sm:text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <span>06</span>
            <span className="text-blue-400 dark:text-blue-500 font-normal">·</span>
            <GitMerge className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 shrink-0 inline-block" />
            <span>Triển khai & vận hành</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-center">
          <div className="p-3.5 rounded-2xl glass-inner space-y-1.5"><div className="w-8 h-8 mx-auto rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center"><ClipboardList className="w-4 h-4"/></div><span className="text-3xs font-extrabold text-blue-600 uppercase">Bước 01</span><div className="font-bold text-xs">Khảo Sát</div></div>
          <div className="p-3.5 rounded-2xl glass-inner space-y-1.5"><div className="w-8 h-8 mx-auto rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center"><Layout className="w-4 h-4"/></div><span className="text-3xs font-extrabold text-blue-600 uppercase">Bước 02</span><div className="font-bold text-xs">Thiết Kế</div></div>
          <div className="p-3.5 rounded-2xl glass-inner space-y-1.5"><div className="w-8 h-8 mx-auto rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center"><Users className="w-4 h-4"/></div><span className="text-3xs font-extrabold text-blue-600 uppercase">Bước 03</span><div className="font-bold text-xs">Tuyển Dụng</div></div>
          <div className="p-3.5 rounded-2xl glass-inner space-y-1.5"><div className="w-8 h-8 mx-auto rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center"><GraduationCap className="w-4 h-4"/></div><span className="text-3xs font-extrabold text-blue-600 uppercase">Bước 04</span><div className="font-bold text-xs">Đào Tạo</div></div>
          <div className="p-3.5 rounded-2xl glass-inner space-y-1.5"><div className="w-8 h-8 mx-auto rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center"><Gauge className="w-4 h-4"/></div><span className="text-3xs font-extrabold text-blue-600 uppercase">Bước 05</span><div className="font-bold text-xs">Vận Hành</div></div>
          <div className="p-3.5 rounded-2xl glass-inner space-y-1.5"><div className="w-8 h-8 mx-auto rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center"><Rocket className="w-4 h-4"/></div><span className="text-3xs font-extrabold text-blue-600 uppercase">Bước 06</span><div className="font-bold text-xs">Mở Rộng</div></div>
        </div>
      </section>

      {/* 07 · Vai trò & đóng góp */}
      <section id="sec-07" className="p-5 sm:p-7 rounded-3xl bg-violet-50/40 dark:bg-slate-900/80 border border-violet-100 dark:border-violet-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center space-x-3 border-b border-violet-200/80 dark:border-violet-800/80 pb-3.5 sm:pb-4">
          <h2 className="text-base sm:text-xl md:text-2xl font-bold text-violet-600 dark:text-violet-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <span>07</span>
            <span className="text-violet-400 dark:text-violet-500 font-normal">·</span>
            <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600 dark:text-violet-400 shrink-0 inline-block" />
            <span>Vai trò & đóng góp</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl glass-inner space-y-1.5">
            <div className="font-bold text-violet-800 dark:text-violet-300 text-sm flex items-center space-x-2">
              <Crown className="w-4 h-4 text-violet-600" /> <span>Chủ Trì Thiết Kế Cấu Trúc</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-body">Xây dựng toàn bộ sơ đồ tổ chức, bản mô tả công việc (JD) và cơ chế phân quyền 3 tuyến.</p>
          </div>
          <div className="p-5 rounded-2xl glass-inner space-y-1.5">
            <div className="font-bold text-indigo-800 dark:text-indigo-300 text-sm flex items-center space-x-2">
              <Key className="w-4 h-4 text-indigo-600" /> <span>Chuẩn Hóa Khung Năng Lực</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-body">Xây dựng ngân hàng câu hỏi phỏng vấn theo chuẩn STAR và bộ tiêu chí đánh giá tuyển dụng.</p>
          </div>
          <div className="p-5 rounded-2xl glass-inner space-y-1.5">
            <div className="font-bold text-pink-800 dark:text-pink-300 text-sm flex items-center space-x-2">
              <Wrench className="w-4 h-4 text-pink-600" /> <span>Lan Tỏa Văn Hóa Dịch Vụ</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-body">Đào tạo văn hóa lấy khách hàng làm trọng tâm cho các bộ phận liên phòng ban.</p>
          </div>
        </div>
      </section>

      {/* 08 · Hệ thống & công cụ tương tác */}
      <section id="sec-08" className="p-5 sm:p-7 rounded-3xl bg-amber-50/40 dark:bg-slate-900/80 border border-amber-100 dark:border-amber-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center space-x-3 border-b border-amber-200/80 dark:border-amber-800/80 pb-3.5 sm:pb-4">
          <h2 className="text-base sm:text-xl md:text-2xl font-bold text-amber-600 dark:text-amber-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <span>08</span>
            <span className="text-amber-400 dark:text-amber-500 font-normal">·</span>
            <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400 shrink-0 inline-block" />
            <span>Hệ thống & công cụ tương tác</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-center">
          <div className="p-4 rounded-2xl glass-inner space-y-1.5"><div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center mx-auto mb-1"><BookCheck className="w-5 h-5"/></div><div className="text-xs font-bold">Phương Pháp Chuẩn</div><p className="text-2xs text-slate-500 font-body">Agile Operations & Standard SOP</p></div>
          <div className="p-4 rounded-2xl glass-inner space-y-1.5"><div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-600 flex items-center justify-center mx-auto mb-1"><Share2 className="w-5 h-5"/></div><div className="text-xs font-bold">Cơ Cấu Quản Trị</div><p className="text-2xs text-slate-500 font-body">Bảng ma trận chỉ số & OKRs</p></div>
          <div className="p-4 rounded-2xl glass-inner space-y-1.5"><div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-600 flex items-center justify-center mx-auto mb-1"><Database className="w-5 h-5"/></div><div className="text-xs font-bold">CRM & Omnichannel</div><p className="text-2xs text-slate-500 font-body">Tích hợp dữ liệu đa kênh</p></div>
          <div className="p-4 rounded-2xl glass-inner space-y-1.5"><div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-600 flex items-center justify-center mx-auto mb-1"><Bot className="w-5 h-5"/></div><div className="text-xs font-bold">AI Bot & Automation</div><p className="text-2xs text-slate-500 font-body">Tự động hóa luồng hỗ trợ</p></div>
        </div>

        <CaseStudy2_1_Tools />
      </section>

      {/* 09 · Kết quả & tác động */}
      <section id="sec-09" className="p-5 sm:p-7 rounded-3xl bg-emerald-50/40 dark:bg-slate-900/80 border border-emerald-100 dark:border-emerald-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center space-x-3 border-b border-emerald-200/80 dark:border-emerald-800/80 pb-3.5 sm:pb-4">
          <h2 className="text-base sm:text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <span>09</span>
            <span className="text-emerald-400 dark:text-emerald-500 font-normal">·</span>
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400 shrink-0 inline-block" />
            <span>Kết quả & tác động</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {results.map((res, idx) => (
            <div key={idx} className="p-4 rounded-2xl glass-inner space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center mb-1">
                <ShieldCheck className="w-4 h-4"/>
              </div>
              <div className="font-bold text-xs text-slate-900 dark:text-white">Thành Tựu 0{idx + 1}</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-body leading-relaxed">{res}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 10 · Giá trị & phát triển */}
      <section id="sec-10" className="p-5 sm:p-7 rounded-3xl bg-teal-50/40 dark:bg-slate-900/80 border border-teal-100 dark:border-teal-900/50 shadow-md hover:shadow-lg space-y-4 transition duration-300">
        <div className="flex items-center space-x-3 border-b border-teal-200/80 dark:border-teal-800/80 pb-3.5 sm:pb-4">
          <h2 className="text-base sm:text-xl md:text-2xl font-bold text-teal-600 dark:text-teal-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <span>10</span>
            <span className="text-teal-400 dark:text-teal-500 font-normal">·</span>
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600 dark:text-teal-400 shrink-0 inline-block" />
            <span>Giá trị & phát triển</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl glass-inner space-y-1.5"><div className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase flex items-center space-x-1.5"><Smile className="w-4 h-4" /><span>Cho Khách Hàng</span></div><p className="text-xs text-slate-600 dark:text-slate-300 font-body">Được phản hồi nhanh chóng, hỗ trợ tận tâm và giải quyết triệt để vấn đề.</p></div>
          <div className="p-5 rounded-2xl glass-inner space-y-1.5"><div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase flex items-center space-x-1.5"><Landmark className="w-4 h-4" /><span>Cho Doanh Nghiệp</span></div><p className="text-xs text-slate-600 dark:text-slate-300 font-body">Tạo lợi thế cạnh tranh, nâng cao lòng trung thành người dùng và bảo vệ thương hiệu.</p></div>
          <div className="p-5 rounded-2xl glass-inner space-y-1.5"><div className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase flex items-center space-x-1.5"><Trophy className="w-4 h-4" /><span>Cho Tổ Chức Nội Bộ</span></div><p className="text-xs text-slate-600 dark:text-slate-300 font-body">Môi trường làm việc chuyên nghiệp, quy trình thông suốt và nhân sự gắn kết.</p></div>
        </div>
      </section>
    </div>
  );
}
