import React from "react";
import { 
  Sparkles, 
  Target, 
  Briefcase, 
  Users, 
  Cpu, 
  HeartHandshake, 
  BarChart3, 
  CheckCircle2, 
  Layers, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Workflow
} from "lucide-react";
import { ProjectCard } from "../../data/projectsData";
import { getProjectPostcard } from "../../data/projectPostcards";

interface ProjectPostcardProps {
  project: ProjectCard;
  className?: string;
}

export function ProjectPostcard({ project, className }: ProjectPostcardProps) {
  const postcard = getProjectPostcard(project);

  return (
    <section 
      id={`project-postcard-${project.id}`}
      className={`w-full relative z-10 animate-fadeIn font-sans space-y-4 my-2 ${className || ""}`}
    >
      {/* Outer Executive Bento Container */}
      <div className="rounded-2xl sm:rounded-3xl text-white bg-slate-50/95 border border-slate-200/80 text-slate-900 shadow-xl dark:bg-slate-950/90 dark:border-sky-500/30 dark:text-white dark:shadow-2xl backdrop-blur-xl relative overflow-hidden p-5 sm:p-7 md:p-8">
        
        {/* Subtle background glow highlights */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* 1. Header & Executive Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-sky-600 bg-sky-50 border border-sky-200 dark:text-sky-400 dark:bg-sky-500/10 dark:border-sky-400/30 px-2 py-0.5 rounded-md">
                  PROJECT POSTCARD · EXECUTIVE SUMMARY
                </span>
                <span className="text-[10px] font-mono font-extrabold text-slate-500 dark:text-slate-400">
                  Case Study {project.phaseCode}
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-extrabold text-slate-950 dark:text-white mt-1 leading-snug">
                {project.branchTitle}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 dark:bg-slate-800/80 dark:border-slate-700/60 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" /> {postcard.role}
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 dark:bg-slate-800/80 dark:border-slate-700/60 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" /> {postcard.timeframe}
            </span>
          </div>
        </div>

        {/* 2. Core Headline & Context Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-5">
          
          {/* Left Column: Headline & Bối cảnh (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 dark:bg-slate-950/60 dark:border-sky-500/20 space-y-2">
              <span className="text-[10px] font-mono font-extrabold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">
                [ HEADLINE GIÁ TRỊ CỐT LÕI ]
              </span>
              <p className="text-sm sm:text-base font-extrabold text-sky-950 dark:text-sky-100 leading-relaxed">
                {postcard.summary}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100/50 border border-slate-200 dark:bg-slate-800/40 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-mono font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" /> BỐI CẢNH & BÀI TOÁN THỰC TẾ
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {postcard.context}
              </p>
            </div>
          </div>

          {/* Right Column: Key Metrics & KPI (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3 p-4 rounded-2xl bg-gradient-to-br from-emerald-50/30 to-slate-50/30 border border-emerald-200 dark:from-slate-950/80 dark:to-slate-900/80 dark:border-emerald-500/30">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> KẾT QUẢ & CHỈ SỐ XÁC NHẬN
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">AUTHENTIC DATA</span>
            </div>

            {postcard.metrics.length > 0 ? (
              <div className="grid grid-cols-2 gap-2.5 my-auto py-2">
                {postcard.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-emerald-100 dark:bg-slate-900/90 dark:border-emerald-500/20 space-y-1">
                    <span className="text-lg sm:text-2xl font-mono font-black text-emerald-600 dark:text-emerald-400 block leading-none">
                      {m.value}
                    </span>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 block truncate">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2 my-auto py-2">
                {postcard.results.slice(0, 3).map((res, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-emerald-800 dark:text-emerald-200 font-semibold leading-snug">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            )}

            {postcard.scale && postcard.scale.length > 0 && (
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2">
                {postcard.scale.map((sc, idx) => (
                  <span key={idx} className="text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20">
                    {sc.label}: {sc.value}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 3. Four Solution Pillars (PEOPLE, PROCESS, TECH, CUSTOMER) */}
        <div className="pt-5 space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Workflow className="w-4 h-4 text-sky-500 dark:text-sky-400" /> GIẢI PHÁP & TRỤ CỘT THỰC THI
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {postcard.solutions.people && (
              <div className="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100 dark:bg-blue-950/40 dark:border-blue-500/30 space-y-2">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-black text-xs">
                  <Users className="w-4 h-4" /> PEOPLE & CULTURE
                </div>
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  {postcard.solutions.people.map((item, idx) => (
                    <li key={idx} className="line-clamp-2">• {item}</li>
                  ))}
                </ul>
              </div>
            )}

            {postcard.solutions.process && (
              <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-500/30 space-y-2">
                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-black text-xs">
                  <Layers className="w-4 h-4" /> PROCESS & SOP
                </div>
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  {postcard.solutions.process.map((item, idx) => (
                    <li key={idx} className="line-clamp-2">• {item}</li>
                  ))}
                </ul>
              </div>
            )}

            {postcard.solutions.technology && (
              <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 dark:bg-purple-950/40 dark:border-purple-500/30 space-y-2">
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-black text-xs">
                  <Cpu className="w-4 h-4" /> TECHNOLOGY & AI
                </div>
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  {postcard.solutions.technology.map((item, idx) => (
                    <li key={idx} className="line-clamp-2">• {item}</li>
                  ))}
                </ul>
              </div>
            )}

            {postcard.solutions.customer && (
              <div className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100 dark:bg-rose-950/40 dark:border-rose-500/30 space-y-2">
                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-black text-xs">
                  <HeartHandshake className="w-4 h-4" /> CUSTOMER EXPERIENCE
                </div>
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  {postcard.solutions.customer.map((item, idx) => (
                    <li key={idx} className="line-clamp-2">• {item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 4. Implementation Steps Timeline */}
        {postcard.implementation.length > 0 && (
          <div className="pt-5 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-500 dark:text-amber-400" /> HÀNH TRÌNH TRIỂN KHAI THỰC TẾ
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {postcard.implementation.map((act, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-100/50 border border-slate-200 dark:bg-slate-950/50 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black text-amber-600 dark:text-amber-400">{act.step}</span>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-500 truncate max-w-[120px]">{act.title.replace(/^[\d.]+\s*·\s*/, "")}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-snug line-clamp-2">
                    {act.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Key Message Closing */}
        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-sky-600 dark:text-sky-300 italic">
            <ArrowRight className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0" />
            <span>"{postcard.keyMessage}"</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 shrink-0 hidden sm:inline">
            Nguyễn Hùng Thái Portfolio
          </span>
        </div>

      </div>
    </section>
  );
}
