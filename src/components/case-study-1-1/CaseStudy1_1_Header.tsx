import React from "react";
import { Briefcase, CheckCircle2, ArrowLeft } from "lucide-react";
import { ProjectCard } from "../../data/projectsData";
import { playUiSound } from "../../lib/sound";
import { getProjectAudioSlug, getProjectAudioScript } from "../../data/projectPostcards";

export function CaseStudy1_1_Header({ onShowToast, project, onBack }: { onShowToast: (msg: string) => void; project?: ProjectCard; onBack: () => void }) {
  const bannerImg = project?.image || "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=1200&auto=format&fit=crop";
  const phaseCode = project?.phaseCode || "1.1";
  const title = project?.branchTitle || "XÂY DỰNG & VẬN HÀNH PHÒNG DỊCH VỤ KHÁCH HÀNG";
  const desc = project?.description || "Quy hoạch hoàn chỉnh bộ máy CSKH từ nền móng ban đầu: Chuẩn hóa cơ cấu 6 khối chuyên trách, quy hoạch khung năng lực 3 cấp, xây dựng quy trình SOP và lan tỏa văn hóa Customer-Centric bền vững.";
  const tags = project?.tags || ["Chủ động", "Thấu hiểu", "Kết nối", "Giá trị bền vững"];

  // Compute audio URL and script for Nam Puck voice
  const audioFileName = project ? getProjectAudioSlug(project) : "project-01-1-xay-dung-va-van-hanh-phong-dich-vu-khach-hang.mp3";
  const audioSrc = `/audio/projects/${audioFileName}`;
  const scriptText = project ? getProjectAudioScript(project) : desc;

  return (
    <>
      <header className="relative rounded-2xl sm:rounded-3xl bg-slate-950/20 text-white py-4 xs:py-5 sm:py-8 md:py-10 px-3 xs:px-3.5 sm:px-6 md:px-10 min-h-[220px] xs:min-h-[260px] sm:min-h-[340px] flex flex-col justify-between shadow-xl border border-white/20 overflow-hidden backdrop-blur-xs w-full gap-4">
        <img src={bannerImg} alt="Banner" className="absolute inset-0 w-full h-full object-cover object-center opacity-95 pointer-events-none transition-opacity duration-300" onError={(e) => { e.currentTarget.src = 'https://placehold.co/1200x500/0f172a/ffffff?text=Case+Study+CSKH'; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/30 pointer-events-none"></div>

        {/* Responsive Header Top Bar with Back Button & Case Study Badge */}
        <div className="relative z-20 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <span className="text-sky-300 font-extrabold tracking-wider uppercase text-[9px] xs:text-[10px] sm:text-xs md:text-sm drop-shadow-sm break-words sm:truncate">
            CASE STUDY {phaseCode} · SENIOR CX ARCHITECT & STRATEGIST
          </span>

          {/* Nút trở về */}
          <button
            onClick={() => {
              playUiSound("click");
              onBack();
            }}
            className="self-end sm:self-auto inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/95 border border-sky-400/50 text-white font-extrabold text-xs shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-300" />
            <span>Trở về</span>
          </button>
        </div>

        <div className="relative z-10 max-w-4xl flex flex-col gap-2.5 sm:gap-3.5">
          <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug drop-shadow-[0_4px_20px_rgba(0,0,0,1)] break-words">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white via-indigo-100 to-purple-200">{title}</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-100 leading-relaxed max-w-3xl font-medium font-body drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
            {desc}
          </p>

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


