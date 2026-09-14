import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { 
  LayoutGrid, 
  Network, 
  Calculator, 
  Sparkles, 
  FolderKanban, 
  Activity, 
  AlertTriangle, 
  Target, 
  Cpu, 
  GitMerge, 
  UserCheck, 
  Wrench, 
  TrendingUp, 
  Award, 
  ShieldCheck, 
  Bookmark, 
  X, 
  ChevronRight,
  BookOpen,
  Map
} from "lucide-react";
import { playUiSound } from "../../lib/sound";
import { ProjectCard } from "../../data/projectsData";
import { cn } from "../../lib/utils";

export function CaseStudy1_1_TOC({ 
  viewMode, 
  setViewMode, 
  jumpToSection,
  openModal,
  project,
  onBack
}: { 
  viewMode: "all" | "mindmap", 
  setViewMode: (v: "all" | "mindmap") => void, 
  jumpToSection: (id: string) => void,
  openModal: () => void,
  project?: ProjectCard,
  onBack?: () => void
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const phaseCode = project?.phaseCode || "1.1";
  const title = project?.branchTitle || "Xây Dựng & Vận Hành Phòng Dịch Vụ Khách Hàng";

  // Auto close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const menuItems = [
    { id: "sec-01", num: "01", label: "Tổng Quan Dự Án", icon: FolderKanban, color: "text-sky-500 bg-sky-500/10" },
    { id: "sec-02", num: "02", label: "Bối Cảnh Thực Tế", icon: Activity, color: "text-indigo-500 bg-indigo-500/10" },
    { id: "sec-03", num: "03", label: "Thách Thức Toàn Diện", icon: AlertTriangle, color: "text-rose-500 bg-rose-500/10" },
    { id: "sec-04", num: "04", label: "Mục Tiêu Vận Hành", icon: Target, color: "text-purple-500 bg-purple-500/10" },
    { id: "sec-05", num: "05", label: "Giải Pháp Quy Hoạch", icon: Cpu, color: "text-cyan-500 bg-cyan-500/10" },
    { id: "sec-06", num: "06", label: "Triển Khai & Thực Thi", icon: GitMerge, color: "text-blue-500 bg-blue-500/10" },
    { id: "sec-07", num: "07", label: "Vai Trò Trách Nhiệm", icon: UserCheck, color: "text-violet-500 bg-violet-500/10" },
    { id: "sec-08", num: "08", label: "Công Cụ Vận Hành", icon: Wrench, color: "text-amber-500 bg-amber-500/10" },
    { id: "sec-09", num: "09", label: "Kết Quả Đột Phá", icon: TrendingUp, color: "text-emerald-500 bg-emerald-500/10" },
    { id: "sec-10", num: "10", label: "Giá Trị Cốt Lõi", icon: Award, color: "text-teal-500 bg-teal-500/10" },
  ];

  const handleItemClick = (id: string) => {
    playUiSound("click");
    jumpToSection(id);
    setIsOpen(false);
  };

  return (
    <div 
      ref={dropdownRef} 
      className="fixed left-2 sm:left-4 lg:left-6 xl:left-[calc((100vw-1280px)/2+12px)] 2xl:left-[calc((100vw-1440px)/2+20px)] top-1/2 -translate-y-1/2 z-[9999] flex items-center select-none pointer-events-auto transition-all duration-300"
    >
      {/* 1. Floating Action Icon Button (Icon Nổi Cố Định Bám Mép Trái Thẻ Bài Viết) */}
      <div className="relative shrink-0 flex items-center">
        <button
          onClick={() => {
            playUiSound("click");
            setIsOpen(!isOpen);
          }}
          aria-label={isOpen ? "Đóng mục lục" : "Mở mục lục"}
          title={isOpen ? "Đóng mục lục" : "Mục lục bài viết"}
          className={cn(
            "w-12 h-12 sm:w-14 sm:h-14 rounded-full text-white flex items-center justify-center cursor-pointer transition-all duration-300 transform active:scale-95 group relative shadow-[0_10px_30px_rgba(79,70,229,0.5)] hover:shadow-[0_15px_35px_rgba(79,70,229,0.75)] hover:scale-110 border-2 backdrop-blur-2xl ring-4 ring-black/10 dark:ring-cyan-500/20",
            isOpen 
              ? "bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 border-rose-300 shadow-[0_10px_30px_rgba(244,63,94,0.6)] rotate-90" 
              : "bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 border-white/50 hover:from-indigo-500 hover:to-purple-700"
          )}
        >
          {/* Icon nổi */}
          <div className="relative z-10 transition-transform duration-300 flex items-center justify-center">
            {isOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            ) : (
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 drop-shadow animate-pulse" />
            )}
          </div>

          {/* Floating Tooltip / Label khi hover */}
          {!isOpen && (
            <span className="absolute left-full ml-2 px-3 py-1 rounded-xl bg-slate-950/90 text-white text-[11px] font-black tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-2xl border border-cyan-400/40 whitespace-nowrap -translate-x-1 group-hover:translate-x-0 backdrop-blur-md">
              Mục lục bài viết
            </span>
          )}
        </button>

        {/* Small badge count */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-rose-500 text-[8px] sm:text-[9px] font-black text-white border-2 border-white shadow-md pointer-events-none animate-bounce">
            10
          </span>
        )}
      </div>

      {/* 2. Floating Chapter Index Drawer */}
      {isOpen && (
        <div 
          className="ml-3 sm:ml-4 w-72 sm:w-80 rounded-3xl p-4.5 sm:p-5 glass-base bg-white/95 dark:bg-slate-900/95 border border-indigo-200/50 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl animate-in fade-in slide-in-from-left-4 duration-300 flex flex-col max-h-[75vh] overflow-hidden"
        >
          {/* Header */}
          <div className="pb-3 border-b border-slate-200/80 dark:border-white/10">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span className="text-[10px] font-bold tracking-wider text-indigo-500">Mục lục chi tiết</span>
            </div>
            <h3 className="text-h6 text-slate-900 dark:text-white mt-1 leading-snug font-play">
              Case Study {phaseCode}
            </h3>
            <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
              {title}
            </p>
          </div>

          {/* Navigation ViewMode Toggle */}
          <div className="my-3 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-white/5 flex items-center justify-between gap-1 shrink-0">
            <button
              onClick={() => { playUiSound("click"); setViewMode("all"); }}
              className={cn(
                "flex-1 py-1 px-2.5 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer",
                viewMode === "all" 
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs" 
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              )}
            >
              <BookOpen className="w-3 h-3" />
              <span>Toàn bộ</span>
            </button>
            <button
              onClick={() => { playUiSound("click"); setViewMode("mindmap"); }}
              className={cn(
                "flex-1 py-1 px-2.5 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer",
                viewMode === "mindmap" 
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs" 
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              )}
            >
              <Map className="w-3 h-3" />
              <span>Sơ đồ tư duy</span>
            </button>
          </div>

          {/* Vertical items index list */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-1.5 custom-scrollbar py-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="w-full group/item text-left p-2 rounded-xl transition-all border border-transparent hover:border-indigo-100 dark:hover:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center justify-between gap-2.5 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Circle icon label */}
                    <div className={cn("w-7.5 h-7.5 rounded-lg flex items-center justify-center shrink-0 shadow-xs", item.color)}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    {/* Label metadata */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-[9.5px] font-bold text-indigo-500 dark:text-sky-400 font-mono">{item.num}</span>
                        <span className="text-xs font-black text-slate-800 dark:text-slate-200 group-hover/item:text-indigo-600 dark:group-hover/item:text-cyan-400 truncate">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:translate-x-0.5 transition-transform" />
                </button>
              );
            })}
          </div>

          {/* Quick interactive utility button */}
          <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 mt-2 flex items-center justify-between shrink-0">
            <span className="text-[9px] font-medium text-slate-400">Copyright © Nguyễn Hùng Thái</span>
            <button
              onClick={() => { playUiSound("click"); openModal(); }}
              className="text-[10px] font-black text-indigo-500 dark:text-sky-400 hover:underline cursor-pointer"
            >
              Xem tóm tắt AI
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
