import React from "react";
import { Briefcase, CheckCircle2, ArrowLeft, Headphones, Radio, Download, Play } from "lucide-react";
import { ProjectCard } from "../../data/projectsData";
import { playUiSound } from "../../lib/sound";
import { getProjectAudioSlug, getProjectAudioScript } from "../../data/projectPostcards";

export function CaseStudy1_1_Header({ 
  onShowToast, 
  project, 
  onBack,
  onListenPostcard 
}: { 
  onShowToast: (msg: string) => void; 
  project?: ProjectCard; 
  onBack: () => void;
  onListenPostcard?: () => void;
}) {
  const bannerImg = project?.image || "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=1200&auto=format&fit=crop";
  const phaseCode = project?.phaseCode || "1.1";
  const title = project?.branchTitle || "XÂY DỰNG & VẬN HÀNH PHÒNG DỊCH VỤ KHÁCH HÀNG";
  const desc = project?.description || "Quy hoạch hoàn chỉnh bộ máy CSKH từ nền móng ban đầu: Chuẩn hóa cơ cấu 6 khối chuyên trách, quy hoạch khung năng lực 3 cấp, xây dựng quy trình SOP và lan tỏa văn hóa Customer-Centric bền vững.";
  const tags = project?.tags || ["Chủ động", "Thấu hiểu", "Kết nối", "Giá trị bền vững"];

  // Compute audio URL and script for Nam Puck voice
  const audioFileName = project ? getProjectAudioSlug(project) : "project-01-1-xay-dung-va-van-hanh-phong-dich-vu-khach-hang.mp3";
  const audioSrc = `/audio/projects/${audioFileName}`;
  const scriptText = project ? getProjectAudioScript(project) : desc;

  const handleListenPostcard = () => {
    playUiSound("click");
    onShowToast?.("Đang mở Bản ghi âm Podcast & Postcard Audio cho Dự án 1.1...");
    if (onListenPostcard) {
      onListenPostcard();
    } else {
      const el = document.getElementById("sec-podcast");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <>
      <header className="relative rounded-2xl sm:rounded-3xl bg-slate-950/20 text-white py-4 xs:py-5 sm:py-8 md:py-10 px-3 xs:px-3.5 sm:px-6 md:px-10 min-h-[240px] xs:min-h-[280px] sm:min-h-[360px] flex flex-col justify-between shadow-xl border border-white/20 overflow-hidden backdrop-blur-xs w-full gap-4">
        <img src={bannerImg} alt="Banner" className="absolute inset-0 w-full h-full object-cover object-center opacity-95 pointer-events-none transition-opacity duration-300" onError={(e) => { e.currentTarget.src = 'https://placehold.co/1200x500/0f172a/ffffff?text=Case+Study+CSKH'; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-slate-950/35 pointer-events-none"></div>

        {/* Responsive Header Top Bar with Back Button & Case Study Badge */}
        <div className="relative z-20 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <span className="text-sky-300 font-extrabold tracking-wider uppercase text-[9px] xs:text-[10px] sm:text-xs md:text-sm drop-shadow-sm break-words sm:truncate flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse hidden xs:inline" />
            CASE STUDY {phaseCode} · SENIOR CX ARCHITECT & STRATEGIST
          </span>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Nút Nghe Postcard nổi bật trên thanh Top Banner */}
            <button
              onClick={handleListenPostcard}
              type="button"
              className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/90 via-amber-600/90 to-cyan-600/90 hover:from-amber-400 hover:to-cyan-500 border border-amber-300/60 text-white font-extrabold text-xs shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shrink-0 group ring-2 ring-amber-400/30"
              title="Nghe Postcard & Bản tin Podcast dự án 1.1"
            >
              <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-200 group-hover:rotate-12 transition-transform duration-300" />
              <span>Nghe Postcard</span>
              <span className="hidden xs:inline px-1.5 py-0.2 rounded bg-black/40 text-[10px] font-mono text-amber-200 border border-amber-300/40">01:15</span>
            </button>

            {/* Nút trở về */}
            <button
              onClick={() => {
                playUiSound("click");
                onBack();
              }}
              className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/95 border border-sky-400/50 text-white font-extrabold text-xs shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-300" />
              <span>Trở về</span>
            </button>
          </div>
        </div>

        <div className="relative z-10 max-w-4xl flex flex-col gap-2.5 sm:gap-3.5">
          <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug drop-shadow-[0_4px_20px_rgba(0,0,0,1)] break-words">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white via-indigo-100 to-purple-200">{title}</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-100 leading-relaxed max-w-3xl font-medium font-body drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
            {desc}
          </p>

          {/* Dòng Nút Nghe Postcard & Lưu File MP3 trực tiếp trong Banner Hình */}
          <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
            <button
              onClick={handleListenPostcard}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/90 via-blue-600/90 to-indigo-600/90 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-xs sm:text-sm border border-cyan-300/60 shadow-[0_4px_20px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md group"
            >
              <div className="relative flex items-center justify-center w-5 h-5 rounded-full bg-white/20">
                <Play className="w-3 h-3 text-white fill-white ml-0.5 group-hover:scale-110 transition-transform" />
              </div>
              <span className="tracking-wide">Nghe Postcard Audio</span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-400/30 text-[10px] font-mono border border-cyan-300/40 text-cyan-100">MP3 01:15</span>
              
              {/* Sound waves animation bars */}
              <div className="flex items-end gap-0.5 h-3 ml-0.5">
                <span className="w-0.5 h-1.5 bg-cyan-200 rounded-full animate-pulse"></span>
                <span className="w-0.5 h-3 bg-cyan-200 rounded-full animate-pulse delay-75"></span>
                <span className="w-0.5 h-2 bg-cyan-200 rounded-full animate-pulse delay-150"></span>
              </div>
            </button>

            <a
              href={audioSrc}
              download={audioFileName}
              onClick={() => {
                playUiSound("click");
                onShowToast?.("Đang tải file MP3 bài viết về máy...");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs border border-white/20 hover:border-white/40 shadow-md transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-md cursor-pointer"
              title="Lưu file MP3 bài viết vào máy"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Lưu MP3 bài viết</span>
              <span className="text-[10px] text-slate-400">(320kbps)</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5">
            {tags.map((tag, idx) => {
              const styles = [
                "bg-sky-500/25 border-sky-400/60 text-sky-100 font-black",
                "bg-purple-500/25 border-purple-400/60 text-purple-100 font-black",
                "bg-emerald-500/25 border-emerald-400/60 text-emerald-100 font-black",
                "bg-amber-500/25 border-amber-400/60 text-amber-100 font-black"
              ];
              const s = styles[idx % styles.length];
              return (
                <span key={idx} className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg border backdrop-blur-md text-[10px] sm:text-xs flex items-center gap-1 sm:gap-1.5 shadow-md ${s}`}>
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> {tag.replace(/^#/, '')}
                </span>
              );
            })}
          </div>
        </div>
      </header>
    </>
  );
}


