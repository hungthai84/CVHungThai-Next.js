import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  BookOpen,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Award,
  Calendar,
  Building2,
  FileCheck2,
  CheckCircle2,
  Sparkles,
  Wrench,
  RotateCw,
  ExternalLink,
  Sliders,
  Bookmark,
  Layers,
  GraduationCap
} from "lucide-react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/utils";
import { CareerMilestoneItem, EDUCATION_BOOKS_DATA } from "./Education";

interface EducationFlipBookProps {
  onSelectCert: (item: CareerMilestoneItem) => void;
  initialCourseId?: number;
}

export function EducationFlipBook({ onSelectCert, initialCourseId }: EducationFlipBookProps) {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";
  const isDark = theme === "glass-dark-neon";

  // Total spreads:
  // Spread 0: Cover & Table of Contents
  // Spreads 1..14: Courses 1..14 (one spread per course)
  // Spread 15: Summary & Back Cover
  const totalSpreads = EDUCATION_BOOKS_DATA.length + 2; // 16 spreads

  const [currentSpread, setCurrentSpread] = useState<number>(() => {
    if (initialCourseId) {
      const idx = EDUCATION_BOOKS_DATA.findIndex((c) => c.id === initialCourseId);
      return idx >= 0 ? idx + 1 : 0;
    }
    return 0;
  });

  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<"forward" | "backward">("forward");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);
  const [pendingSpread, setPendingSpread] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play presentation mode
  useEffect(() => {
    if (isPlayingAuto) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentSpread((prev) => {
          if (prev >= totalSpreads - 1) {
            setIsPlayingAuto(false);
            return 0;
          }
          return prev + 1;
        });
      }, 4500);
    } else if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlayingAuto, totalSpreads]);

  // Turn to specific spread with 3D flip animation
  const turnToSpread = useCallback(
    (targetSpread: number) => {
      if (targetSpread === currentSpread || isFlipping) return;
      if (targetSpread < 0 || targetSpread >= totalSpreads) return;

      const direction = targetSpread > currentSpread ? "forward" : "backward";
      setFlipDirection(direction);
      setIsFlipping(true);
      setPendingSpread(targetSpread);

      setTimeout(() => {
        setCurrentSpread(targetSpread);
        setIsFlipping(false);
        setPendingSpread(null);
      }, 650);
    },
    [currentSpread, isFlipping, totalSpreads]
  );

  const nextPage = () => {
    if (currentSpread < totalSpreads - 1) {
      turnToSpread(currentSpread + 1);
    }
  };

  const prevPage = () => {
    if (currentSpread > 0) {
      turnToSpread(currentSpread - 1);
    }
  };

  const firstPage = () => turnToSpread(0);
  const lastPage = () => turnToSpread(totalSpreads - 1);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextPage();
      if (e.key === "ArrowLeft") prevPage();
      if (e.key === "Home") firstPage();
      if (e.key === "End") lastPage();
      if (e.key === "Escape" && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSpread, isFullscreen, nextPage, prevPage, firstPage, lastPage]);

  // Active course data if on spread 1..14
  const activeCourse: CareerMilestoneItem | null =
    currentSpread >= 1 && currentSpread <= EDUCATION_BOOKS_DATA.length
      ? EDUCATION_BOOKS_DATA[currentSpread - 1]
      : null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full flex flex-col items-center justify-start select-none transition-all duration-300 font-sans",
        isFullscreen
          ? "fixed inset-0 z-[120] bg-slate-950/95 backdrop-blur-2xl p-4 sm:p-8 overflow-y-auto flex flex-col justify-center"
          : "my-2"
      )}
    >
      {/* ========================================================================= */}
      {/* FLIPBOOK HEADER TOOLBAR                                                  */}
      {/* ========================================================================= */}
      <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-3 mb-3 px-2 z-20">
        {/* Book Title & Badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md">
            <BookOpen className="w-4.5 h-4.5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-play tracking-tight flex items-center gap-1.5">
                <span>{isVi ? "Sách Hồ sơ Học vấn 3D" : "3D Academic Credentials Book"}</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  FlipBook
                </span>
              </h4>
            </div>
            <p className="text-2xs text-slate-500 dark:text-slate-400 font-medium">
              {isVi
                ? "Lật trang tương tác thực tế • 14 chứng chỉ & bằng cấp chính thức"
                : "Interactive page-turning • 14 accredited courses & certificates"}
            </p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 rounded-full px-2 py-1 shadow-sm">
          {/* First page */}
          <button
            type="button"
            onClick={firstPage}
            disabled={currentSpread === 0}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            title={isVi ? "Trang đầu" : "First Page"}
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>

          {/* Previous page */}
          <button
            type="button"
            onClick={prevPage}
            disabled={currentSpread === 0}
            className="px-2.5 py-1 rounded-full bg-blue-50 hover:bg-blue-100 dark:bg-white/10 dark:hover:bg-white/15 text-blue-700 dark:text-cyan-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
            title={isVi ? "Trang trước (←)" : "Previous Page (←)"}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{isVi ? "Trước" : "Prev"}</span>
          </button>

          {/* Spread Indicator */}
          <div className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 font-mono text-2xs font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap">
            {currentSpread === 0
              ? isVi ? "Bìa Sách" : "Cover"
              : currentSpread === totalSpreads - 1
              ? isVi ? "Tổng kết" : "End"
              : `${currentSpread} / ${EDUCATION_BOOKS_DATA.length}`}
          </div>

          {/* Next page */}
          <button
            type="button"
            onClick={nextPage}
            disabled={currentSpread === totalSpreads - 1}
            className="px-2.5 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1 text-xs font-bold shadow-xs"
            title={isVi ? "Trang sau (→)" : "Next Page (→)"}
          >
            <span className="hidden sm:inline">{isVi ? "Sau" : "Next"}</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Last page */}
          <button
            type="button"
            onClick={lastPage}
            disabled={currentSpread === totalSpreads - 1}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            title={isVi ? "Trang cuối" : "Last Page"}
          >
            <ChevronsRight className="w-4 h-4" />
          </button>

          <div className="h-4 w-[1px] bg-slate-300 dark:bg-white/20 mx-0.5" />

          {/* Auto-play toggle */}
          <button
            type="button"
            onClick={() => setIsPlayingAuto(!isPlayingAuto)}
            className={cn(
              "p-1.5 rounded-full transition-all cursor-pointer",
              isPlayingAuto
                ? "bg-amber-500 text-white animate-pulse"
                : "hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300"
            )}
            title={isPlayingAuto ? (isVi ? "Tạm dừng tự động lật" : "Pause Auto-play") : (isVi ? "Tự động lật sách" : "Auto-play Flip")}
          >
            {isPlayingAuto ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
            title={isFullscreen ? (isVi ? "Thu nhỏ" : "Exit Fullscreen") : (isVi ? "Toàn màn hình FlipBook" : "Fullscreen FlipBook")}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* THE 3D BOOK STAGE                                                         */}
      {/* ========================================================================= */}
      <div className="w-full max-w-5xl flex items-center justify-center py-2 sm:py-4 px-1 [perspective:2200px]">
        {/* Book Outer Container with Realistic Book Cover Edge & Shadow */}
        <div 
          className={cn(
            "relative w-full max-w-4xl lg:max-w-5xl h-[540px] sm:h-[600px] md:h-[630px] rounded-[18px] transition-all duration-500",
            "p-2.5 sm:p-3.5 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_40px_rgba(0,0,0,0.3)] border border-amber-900/60"
          )}
        >
          {/* Book Spine Center Crease Shading */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/40 via-black/10 to-black/40 pointer-events-none z-30 hidden md:block" />
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-amber-900/60 pointer-events-none z-30 hidden md:block" />

          {/* Book Bookmark Ribbon */}
          <div className="absolute -top-3 left-[30%] w-5 h-16 bg-rose-600 shadow-md rounded-b-md z-40 pointer-events-none transform -rotate-3 border-x border-rose-700">
            <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[8px] border-b-rose-950" />
          </div>

          {/* Double Page Layout Container */}
          <div className="relative w-full h-full rounded-[14px] overflow-hidden flex flex-col md:flex-row shadow-inner bg-stone-100 dark:bg-slate-900">
            
            {/* =================================================================== */}
            {/* LEFT PAGE (MẶT TRÁI - EVEN NUMBER / COVER / TOC)                   */}
            {/* =================================================================== */}
            <div 
              onClick={() => {
                if (currentSpread > 0) prevPage();
              }}
              className={cn(
                "relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden p-4 sm:p-6 flex flex-col justify-between cursor-pointer group/leftpage transition-all border-b md:border-b-0 md:border-r border-stone-300 dark:border-white/10",
                "bg-gradient-to-r from-white via-stone-50 to-stone-200 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800"
              )}
              style={{
                boxShadow: "inset -8px 0 16px -8px rgba(0,0,0,0.18)"
              }}
            >
              {/* Corner Turn Indicator */}
              <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-amber-400/40 to-transparent pointer-events-none opacity-0 group-hover/leftpage:opacity-100 transition-opacity" />

              {/* Spread 0 Left: Book Front Cover */}
              {currentSpread === 0 ? (
                <div className="w-full h-full flex flex-col items-center justify-between p-3 sm:p-5 text-center bg-gradient-to-br from-amber-900 via-stone-900 to-amber-950 text-amber-100 rounded-xl border border-amber-500/30 relative overflow-hidden shadow-2xl">
                  {/* Gold Border Filigree */}
                  <div className="absolute inset-2 border-2 border-amber-500/40 rounded-lg pointer-events-none" />
                  <div className="absolute inset-3 border border-amber-500/20 rounded-md pointer-events-none" />

                  {/* Top Seal */}
                  <div className="relative z-10 pt-4">
                    <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase font-black px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                      BỘ HỒ SƠ NĂNG LỰC • 2007 - 2026
                    </span>
                  </div>

                  {/* Center Emblem */}
                  <div className="relative z-10 flex flex-col items-center gap-3 my-auto">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 p-1 shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                      <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center border-2 border-amber-300">
                        <GraduationCap className="w-10 h-10 text-amber-400" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-xl sm:text-2xl font-black font-play text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 uppercase tracking-tight">
                        HỌC VẤN & BẰNG CẤP
                      </h2>
                      <p className="text-xs font-serif italic text-amber-300/80">
                        Academic Credentials & Professional Certifications
                      </p>
                    </div>
                  </div>

                  {/* Bottom Stats Badge */}
                  <div className="relative z-10 pb-4 w-full flex items-center justify-around border-t border-amber-500/20 pt-3 text-2xs font-mono">
                    <div>
                      <span className="block text-base font-black text-amber-300">14</span>
                      <span className="text-amber-200/70">Chứng chỉ</span>
                    </div>
                    <div className="h-6 w-[1px] bg-amber-500/30" />
                    <div>
                      <span className="block text-base font-black text-amber-300">22+</span>
                      <span className="text-amber-200/70">Năm thực chiến</span>
                    </div>
                    <div className="h-6 w-[1px] bg-amber-500/30" />
                    <div>
                      <span className="block text-base font-black text-amber-300">100%</span>
                      <span className="text-amber-200/70">Chứng thực</span>
                    </div>
                  </div>
                </div>
              ) : currentSpread === totalSpreads - 1 ? (
                /* Spread 15 Left: Summary & Statistics */
                <div className="w-full h-full flex flex-col justify-between text-left p-2 sm:p-3">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-stone-200 dark:border-white/10">
                      <Award className="w-5 h-5 text-amber-500" />
                      <h4 className="text-base font-bold text-slate-900 dark:text-white font-play">
                        {isVi ? "Tổng kết Học vấn & Chứng chỉ" : "Academic Portfolio Summary"}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {isVi
                        ? "Hành trình tích lũy học vấn liên tục từ năm 2007 đến nay, kết hợp nền tảng Cử nhân CNTT chính quy cùng các chứng chỉ quốc tế và chuyên ngành quản trị cao cấp."
                        : "A continuous lifelong learning journey from 2007 to present, combining a formal IT Degree with international certifications."}
                    </p>

                    {/* Breakdown by Category */}
                    <div className="grid grid-cols-2 gap-2 text-2xs">
                      <div className="p-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50">
                        <span className="font-bold text-blue-700 dark:text-cyan-300 block">Công nghệ & AI</span>
                        <span className="text-xs font-mono font-black text-slate-900 dark:text-white">3 Khóa đào tạo</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50">
                        <span className="font-bold text-purple-700 dark:text-purple-300 block">Quản trị & Lãnh đạo</span>
                        <span className="text-xs font-mono font-black text-slate-900 dark:text-white">4 Khóa đào tạo</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
                        <span className="font-bold text-emerald-700 dark:text-emerald-300 block">Kỹ năng & Đào tạo</span>
                        <span className="text-xs font-mono font-black text-slate-900 dark:text-white">5 Khóa đào tạo</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50">
                        <span className="font-bold text-amber-700 dark:text-amber-300 block">Mạng & Hệ thống</span>
                        <span className="text-xs font-mono font-black text-slate-900 dark:text-white">2 Khóa đào tạo</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Verification Note */}
                  <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-3xs text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block mb-0.5">XÁC THỰC MINH BẠCH</span>
                    Toàn bộ chứng chỉ, học bạ và văn bằng đều có hồ sơ gốc được lưu trữ và sẵn sàng cung cấp bản sao công chứng khi có yêu cầu.
                  </div>

                  {/* Left Page Number */}
                  <div className="text-center font-mono text-3xs text-slate-400 pt-1">
                    Trang {currentSpread * 2} • Lật trước ↺
                  </div>
                </div>
              ) : activeCourse ? (
                /* Course Left Page: Overview, Organization, Year & Certificate Preview */
                <div className="w-full h-full flex flex-col justify-between text-left space-y-2">
                  <div className="space-y-2.5">
                    {/* Top Meta Bar */}
                    <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-stone-200 dark:border-white/10">
                      <div className="flex items-center gap-1.5">
                        <span className="text-3xs font-extrabold uppercase px-2 py-0.5 rounded-full font-mono bg-blue-100 dark:bg-white/10 text-blue-700 dark:text-cyan-300">
                          {activeCourse.category.toUpperCase()}
                        </span>
                        <span className="text-3xs font-mono text-slate-400 font-bold">
                          #{activeCourse.code}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-2xs font-mono font-bold text-slate-600 dark:text-slate-300">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>Năm {activeCourse.year}</span>
                      </div>
                    </div>

                    {/* Course Title & Organization */}
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-play leading-snug line-clamp-2">
                        {activeCourse.title}
                      </h3>
                      <div className="flex items-center gap-1 text-2xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="font-bold text-slate-800 dark:text-slate-200 truncate">{activeCourse.org}</span>
                        <span>•</span>
                        <span className="truncate">{activeCourse.format}</span>
                      </div>
                    </div>

                    {/* High-Resolution Certificate Preview Box */}
                    <div className="w-full h-32 sm:h-36 rounded-xl overflow-hidden relative border border-stone-300 dark:border-white/15 shadow-sm group/certbox bg-slate-950/20">
                      <img
                        src={activeCourse.certImg}
                        alt={activeCourse.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/certbox:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                      {/* Click to zoom badge */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCert(activeCourse);
                        }}
                        className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-blue-600/90 hover:bg-blue-600 text-white text-3xs font-bold flex items-center gap-1 backdrop-blur-md shadow-md transition-all active:scale-95 cursor-pointer"
                        title={isVi ? "Xem chứng chỉ độ phân giải cao" : "View Certificate Full HD"}
                      >
                        <Maximize2 className="w-3 h-3" />
                        <span>{isVi ? "Phóng to HD" : "Zoom Cert"}</span>
                      </button>
                    </div>

                    {/* Focus Summary */}
                    <div className="text-2xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      <strong className="text-slate-900 dark:text-white font-bold">{isVi ? "Trọng tâm: " : "Focus: "}</strong>
                      <span className="line-clamp-2">{activeCourse.focus}</span>
                    </div>

                    {/* Tech Stack */}
                    {activeCourse.techStack && (
                      <div className="text-3xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1 truncate">
                        <Wrench className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{activeCourse.techStack}</span>
                      </div>
                    )}
                  </div>

                  {/* Left Page Footer & Page Number */}
                  <div className="pt-2 border-t border-stone-200 dark:border-white/10 flex items-center justify-between text-3xs text-slate-400 font-mono">
                    <span>{activeCourse.org}</span>
                    <span>Trang {currentSpread * 2}</span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* =================================================================== */}
            {/* RIGHT PAGE (MẶT PHẢI - ODD NUMBER / TOC / CONTENT)                  */}
            {/* =================================================================== */}
            <div 
              onClick={() => {
                if (currentSpread < totalSpreads - 1) nextPage();
              }}
              className={cn(
                "relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden p-4 sm:p-6 flex flex-col justify-between cursor-pointer group/rightpage transition-all",
                "bg-gradient-to-l from-white via-stone-50 to-stone-200 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800"
              )}
              style={{
                boxShadow: "inset 8px 0 16px -8px rgba(0,0,0,0.18)"
              }}
            >
              {/* Corner Turn Indicator */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-blue-500/40 to-transparent pointer-events-none opacity-0 group-hover/rightpage:opacity-100 transition-opacity" />

              {/* Spread 0 Right: Table of Contents */}
              {currentSpread === 0 ? (
                <div className="w-full h-full flex flex-col justify-between text-left p-1 sm:p-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-stone-200 dark:border-white/10">
                      <div className="flex items-center gap-1.5">
                        <Bookmark className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-play">
                          {isVi ? "Mục lục Khóa học" : "Table of Contents"}
                        </h3>
                      </div>
                      <span className="text-3xs font-mono text-slate-400">14 Mục</span>
                    </div>

                    <p className="text-3xs text-slate-500 dark:text-slate-400">
                      {isVi ? "Nhấp vào bất kỳ mục nào để lật nhanh đến trang chứng chỉ:" : "Click any item below to flip directly to its credentials:"}
                    </p>

                    {/* Scrollable Table of Contents List */}
                    <div className="space-y-1 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
                      {EDUCATION_BOOKS_DATA.map((course, idx) => (
                        <button
                          key={course.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            turnToSpread(idx + 1);
                          }}
                          className="w-full text-left p-1.5 rounded-lg hover:bg-white dark:hover:bg-white/10 transition-colors flex items-center justify-between gap-2 border border-transparent hover:border-slate-200 dark:hover:border-white/10 group/tocitem cursor-pointer"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-3xs font-mono font-bold text-blue-600 dark:text-cyan-400 w-5 shrink-0">
                              {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                            </span>
                            <span className="text-2xs font-semibold text-slate-800 dark:text-slate-200 truncate group-hover/tocitem:text-blue-600 dark:group-hover/tocitem:text-cyan-300">
                              {course.title}
                            </span>
                          </div>
                          <span className="text-3xs font-mono text-slate-400 shrink-0">
                            {course.year}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="pt-2 border-t border-stone-200 dark:border-white/10 flex items-center justify-between text-3xs font-mono">
                    <span className="text-blue-600 dark:text-cyan-400 font-bold flex items-center gap-1">
                      <span>Lật trang sau để bắt đầu</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-slate-400">Trang 1</span>
                  </div>
                </div>
              ) : currentSpread === totalSpreads - 1 ? (
                /* Spread 15 Right: Book Back Cover */
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-amber-950 via-stone-900 to-amber-950 text-amber-100 rounded-xl border border-amber-500/30 relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-2 border-2 border-amber-500/40 rounded-lg pointer-events-none" />

                  <div className="space-y-3 my-auto">
                    <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400 shadow-inner">
                      <Sparkles className="w-7 h-7" />
                    </div>

                    <h4 className="text-lg font-black font-play text-amber-200 uppercase">
                      LIFELONG LEARNING
                    </h4>

                    <p className="text-xs font-serif italic text-amber-300/80 max-w-xs mx-auto leading-relaxed">
                      "Không ngừng học hỏi, rèn luyện tư duy và liên tục nâng tầm giá trị thực chiến."
                    </p>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        firstPage();
                      }}
                      className="mt-4 px-4 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all shadow-md cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>{isVi ? "Về Trang Đầu" : "Back to Cover"}</span>
                    </button>
                  </div>
                </div>
              ) : activeCourse ? (
                /* Course Right Page: Modules, Practice & Key Outcome */
                <div className="w-full h-full flex flex-col justify-between text-left space-y-2">
                  <div className="space-y-2.5">
                    {/* Header: Core Modules */}
                    <div className="p-2.5 rounded-xl bg-white/70 dark:bg-white/5 border border-stone-200 dark:border-white/10 space-y-1 text-2xs shadow-2xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block font-mono text-3xs flex items-center gap-1 text-blue-600 dark:text-cyan-400">
                        <BookOpen className="w-3 h-3" />
                        <span>{isVi ? "Học phần chuyên sâu:" : "Core Modules:"}</span>
                      </span>
                      <ul className="space-y-1 max-h-[120px] overflow-y-auto custom-scrollbar pr-0.5">
                        {activeCourse.modules.map((mod, mIdx) => (
                          <li key={mIdx} className="flex items-start gap-1.5 text-slate-700 dark:text-slate-200 font-medium">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="leading-tight">{mod}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Applied in Practice */}
                    {activeCourse.practice && (
                      <div className="p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/40 text-2xs space-y-1 shadow-2xs">
                        <span className="font-bold text-indigo-700 dark:text-cyan-300 uppercase tracking-wider block font-mono text-3xs flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-indigo-500 dark:text-cyan-400" />
                          <span>{isVi ? "Ứng dụng thực chiến:" : "Applied in Practice:"}</span>
                        </span>
                        <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium line-clamp-3">
                          {activeCourse.practice}
                        </p>
                      </div>
                    )}

                    {/* Outcome & Impact */}
                    <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 text-2xs space-y-0.5 shadow-2xs">
                      <span className="font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider block font-mono text-3xs flex items-center gap-1">
                        <Award className="w-3 h-3 text-emerald-500" />
                        <span>{isVi ? "Kết quả đạt được:" : "Key Outcome:"}</span>
                      </span>
                      <p className="text-slate-700 dark:text-slate-200 font-medium leading-snug line-clamp-2">
                        {activeCourse.outcome}
                      </p>
                    </div>
                  </div>

                  {/* Right Page Footer & Actions */}
                  <div className="pt-2 border-t border-stone-200 dark:border-white/10 flex items-center justify-between text-3xs text-slate-400 font-mono">
                    <span className="text-blue-600 dark:text-cyan-400 font-bold flex items-center gap-1">
                      <span>Lật trang tiếp</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                    <span>Trang {currentSpread * 2 + 1}</span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* =================================================================== */}
            {/* 3D TURNING LEAF ANIMATION (FLIP EFFECT)                            */}
            {/* =================================================================== */}
            <AnimatePresence>
              {isFlipping && (
                <motion.div
                  initial={
                    flipDirection === "forward"
                      ? { rotateY: 0, originX: 0 }
                      : { rotateY: 0, originX: 1 }
                  }
                  animate={
                    flipDirection === "forward"
                      ? { rotateY: -180, originX: 0 }
                      : { rotateY: 180, originX: 1 }
                  }
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65, ease: [0.645, 0.045, 0.355, 1.0] }}
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                  }}
                  className={cn(
                    "absolute top-0 bottom-0 w-1/2 z-40 pointer-events-none hidden md:block",
                    flipDirection === "forward" ? "left-1/2 origin-left" : "right-1/2 origin-right",
                    "bg-gradient-to-r from-stone-200 via-stone-100 to-white dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 border border-stone-300 dark:border-white/20 shadow-2xl"
                  )}
                >
                  {/* Dynamic Shading on Turning Leaf */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/15 pointer-events-none" />
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* QUICK THUMBNAIL SLIDER STRIP                                              */}
      {/* ========================================================================= */}
      <div className="w-full max-w-4xl mt-3 px-2 flex items-center gap-2 overflow-x-auto custom-scrollbar py-2 z-10">
        {/* Cover Strip item */}
        <button
          type="button"
          onClick={() => turnToSpread(0)}
          className={cn(
            "px-3 py-1.5 rounded-xl text-3xs font-mono font-bold shrink-0 transition-all cursor-pointer border",
            currentSpread === 0
              ? "bg-amber-500 text-stone-950 border-amber-400 shadow-sm"
              : "bg-white/60 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-100"
          )}
        >
          📖 Bìa Sách
        </button>

        {/* Courses 1..14 strip */}
        {EDUCATION_BOOKS_DATA.map((course, idx) => (
          <button
            key={course.id}
            type="button"
            onClick={() => turnToSpread(idx + 1)}
            className={cn(
              "px-2.5 py-1.5 rounded-xl text-3xs font-mono font-bold shrink-0 transition-all cursor-pointer border max-w-[140px] truncate",
              currentSpread === idx + 1
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white/60 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-100"
            )}
            title={course.title}
          >
            #{course.code} {course.title}
          </button>
        ))}

        {/* Back Cover strip item */}
        <button
          type="button"
          onClick={() => turnToSpread(totalSpreads - 1)}
          className={cn(
            "px-3 py-1.5 rounded-xl text-3xs font-mono font-bold shrink-0 transition-all cursor-pointer border",
            currentSpread === totalSpreads - 1
              ? "bg-amber-500 text-stone-950 border-amber-400 shadow-sm"
              : "bg-white/60 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-100"
          )}
        >
          🏆 Tổng kết
        </button>
      </div>
    </div>
  );
}

export default EducationFlipBook;
