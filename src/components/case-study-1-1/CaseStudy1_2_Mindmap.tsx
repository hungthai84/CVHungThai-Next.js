import React, { useEffect, useRef, useState } from "react";
import { Network, Sparkles, Target, ShieldCheck, Compass, Sliders, LineChart, Award, BarChart3 } from "lucide-react";
import { playUiSound } from "../../lib/sound";
import { ProjectCard } from "../../data/projectsData";

export function CaseStudy1_2_Mindmap({ jumpToSection, project }: { jumpToSection: (id: string) => void; project?: ProjectCard }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState({ p1: "", p2: "", p3: "", p4: "" });

  const updatePaths = () => {
    if (!containerRef.current || !centerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const centerRect = centerRef.current.getBoundingClientRect();

    const cX = centerRect.left + centerRect.width / 2 - containerRect.left;
    const cY = centerRect.top + centerRect.height / 2 - containerRect.top;

    const newPaths = { p1: "", p2: "", p3: "", p4: "" };

    [1, 2, 3, 4].forEach(i => {
      const card = document.getElementById(`pillar-card-1-2-${i}`);
      if (card) {
        const cardRect = card.getBoundingClientRect();
        let tX = 0, tY = 0;

        if (i === 1) {
          tX = cardRect.right - containerRect.left;
          tY = cardRect.bottom - containerRect.top - (cardRect.height / 2);
        } else if (i === 2) {
          tX = cardRect.left - containerRect.left;
          tY = cardRect.bottom - containerRect.top - (cardRect.height / 2);
        } else if (i === 3) {
          tX = cardRect.right - containerRect.left;
          tY = cardRect.top - containerRect.top + (cardRect.height / 2);
        } else if (i === 4) {
          tX = cardRect.left - containerRect.left;
          tY = cardRect.top - containerRect.top + (cardRect.height / 2);
        }

        const ctrlX = (cX + tX) / 2;
        (newPaths as any)[`p${i}`] = `M ${cX} ${cY} Q ${ctrlX} ${tY} ${tX} ${tY}`;
      }
    });
    setPaths(newPaths);
  };

  useEffect(() => {
    updatePaths();
    const to = setTimeout(updatePaths, 250);
    window.addEventListener('resize', updatePaths);
    return () => {
      clearTimeout(to);
      window.removeEventListener('resize', updatePaths);
    };
  }, []);

  return (
    <article id="mindmap-section" className="p-5 sm:p-7 rounded-3xl bg-[#f0f9ff]/90 dark:bg-[#0c1e35]/90 border border-sky-200/80 dark:border-sky-800/60 shadow-md hover:shadow-lg space-y-4 sm:space-y-6 transition duration-300 mb-8 mt-8">
      <div className="flex items-center space-x-3 border-b border-sky-200/80 dark:border-sky-800/80 pb-3.5 sm:pb-4">
        <h2 className="text-h6 font-bold text-sky-600 dark:text-sky-400 tracking-wide flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <span>00</span>
          <span className="text-sky-400 dark:text-sky-500 font-normal">·</span>
          <Network className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400 shrink-0 inline-block" />
          <span>Sơ đồ tư duy 4 trụ cột quản trị mục tiêu & KPI/OKR</span>
        </h2>
      </div>

      <div className="w-full overflow-hidden">
        <div className="w-full overflow-x-auto custom-scrollbar touch-pan-x pb-4">
          <div ref={containerRef} id="mindmap-container" className="w-full min-w-[850px] relative py-8 flex flex-col items-center mx-auto">
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
            <path d={paths.p1} stroke="#0284c7" strokeWidth="3.5" fill="none" className="mindmap-connector" opacity="0.8"/>
            <path d={paths.p2} stroke="#8b5cf6" strokeWidth="3.5" fill="none" className="mindmap-connector" opacity="0.8"/>
            <path d={paths.p3} stroke="#10b981" strokeWidth="3.5" fill="none" className="mindmap-connector" opacity="0.8"/>
            <path d={paths.p4} stroke="#f97316" strokeWidth="3.5" fill="none" className="mindmap-connector" opacity="0.8"/>
          </svg>

          <div className="flex justify-center my-12 relative z-10">
            <div ref={centerRef} id="mindmap-center" className="group cursor-pointer p-6 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white shadow-2xl shadow-indigo-500/40 text-center w-72 h-72 flex flex-col items-center justify-center border-4 border-white/90 dark:border-slate-700 transform hover:scale-105 transition duration-300 backdrop-blur-2xl ring-8 ring-indigo-400/20">
              <div className="w-12 h-12 mb-2 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md group-hover:bg-white/30 transition shadow-inner">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-h6 uppercase tracking-tight leading-snug">
                THIẾT LẬP MỤC TIÊU<br/>&amp; CHỈ TIÊU HOẠT ĐỘNG<br/>
                <span className="font-normal text-xs text-sky-100">(OKR &amp; KPI Matrix System)</span>
              </h3>
              <div className="mt-2 text-[11px] font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-300" /> Định lượng - Cân bằng - Minh bạch
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-32 gap-y-16 absolute inset-0 z-10 pointer-events-none">
            <div className="pointer-events-auto flex justify-start items-start">
              <div id="pillar-card-1-2-1" onClick={() => { playUiSound("click"); jumpToSection('sec-05'); }} className="w-80 group block p-4 rounded-2xl glass-base bg-gradient-to-br from-sky-500/20 to-sky-400/5 border-2 border-sky-400/60 hover:border-sky-500 hover:shadow-glow-sky cursor-pointer">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-sky-500 text-white font-extrabold flex items-center justify-center shrink-0 shadow-md text-xs">
                    <Compass className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-sky-700 dark:text-sky-300 group-hover:text-sky-500 transition uppercase flex items-center gap-1">MA TRẬN CHỈ SỐ ĐA CHIỀU</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 font-body">Năng suất (Volume/AHT), Tốc độ (FRT/SLA), Chất lượng (CSAT/FCR/QA).</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-auto flex justify-end items-start">
              <div id="pillar-card-1-2-2" onClick={() => { playUiSound("click"); jumpToSection('sec-05'); }} className="w-80 group block p-4 rounded-2xl glass-base bg-gradient-to-br from-purple-500/20 to-purple-400/5 border-2 border-purple-400/60 hover:border-purple-500 hover:shadow-glow-purple cursor-pointer">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-extrabold flex items-center justify-center shrink-0 shadow-md text-xs">
                    <Sliders className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-purple-700 dark:text-purple-300 group-hover:text-purple-500 transition uppercase flex items-center gap-1">KHUNG MỤC TIÊU THAM VỌNG (OKR)</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 font-body">Thác đổ mục tiêu từ Company xuống Team và KRs đột phá chuyển đổi số.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-auto flex justify-start items-end">
              <div id="pillar-card-1-2-3" onClick={() => { playUiSound("click"); jumpToSection('sec-05'); }} className="w-80 group block p-4 rounded-2xl glass-base bg-gradient-to-br from-emerald-500/20 to-emerald-400/5 border-2 border-emerald-400/60 hover:border-emerald-500 hover:shadow-glow-emerald cursor-pointer">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center shrink-0 shadow-md text-xs">
                    <LineChart className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-emerald-700 dark:text-emerald-300 group-hover:text-emerald-500 transition uppercase flex items-center gap-1">REALTIME OPS DASHBOARD</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 font-body">Bảng điều khiển trực quan Live Queue &amp; cảnh báo sớm nghẽn tải.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-auto flex justify-end items-end">
              <div id="pillar-card-1-2-4" onClick={() => { playUiSound("click"); jumpToSection('sec-05'); }} className="w-80 group block p-4 rounded-2xl glass-base bg-gradient-to-br from-orange-500/20 to-orange-400/5 border-2 border-orange-400/60 hover:border-orange-500 hover:shadow-glow-amber cursor-pointer">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-orange-600 text-white font-extrabold flex items-center justify-center shrink-0 shadow-md text-xs">
                    <Award className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-orange-700 dark:text-orange-300 group-hover:text-orange-500 transition uppercase flex items-center gap-1">THẺ ĐIỂM CÂN BẰNG &amp; THƯỞNG ĐỘNG</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 font-body">Balanced Scorecard 4 khía cạnh và cơ chế thưởng nóng CSAT/FCR.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
);
}
