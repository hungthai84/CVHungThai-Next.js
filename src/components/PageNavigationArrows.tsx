'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { useLanguage } from '../i18n';
import { playUiSound } from '../lib/sound';
import { SectionMeta } from '../context/SectionContext';
import { cn } from '../lib/utils';

interface PageNavigationArrowsProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  sections: SectionMeta[];
}

export function PageNavigationArrows({
  activeSection,
  onNavigate,
  sections,
}: PageNavigationArrowsProps) {
  const { lang, language } = useLanguage();
  const isVi = (language || lang) === 'vi';

  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);

  const currentIndex = sections.findIndex((s) => s.id === activeSection);
  const totalSections = sections.length;

  // Previous and Next calculations with wrap-around
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : totalSections - 1;
  const nextIndex = currentIndex < totalSections - 1 ? currentIndex + 1 : 0;

  const prevSection = sections[prevIndex];
  const nextSection = sections[nextIndex];

  // Section names
  const getSectionName = useCallback(
    (sec: SectionMeta | undefined) => {
      if (!sec) return '';
      // Map section id to readable localized title
      const titleMap: Record<string, { vi: string; en: string }> = {
        home: { vi: 'Trang Chủ', en: 'Hero Home' },
        letter: { vi: 'Thư Ngỏ', en: 'Open Letter' },
        about: { vi: 'Giới Thiệu', en: 'Executive Profile' },
        domains: { vi: 'Lĩnh Vực', en: 'Core Domains' },
        experience: { vi: 'Kinh Nghiệm', en: 'Career Experience' },
        education: { vi: 'Học Vấn', en: 'Education & Certs' },
        skills: { vi: 'Kỹ Năng', en: 'Skills & Competencies' },
        projects: { vi: 'Dự Án', en: 'Key Projects' },
        interview: { vi: 'Phỏng Vấn AI', en: 'AI Interview' },
        tuvi: { vi: 'Tử Vi & Vận Mệnh', en: 'Destiny Matrix' },
        systems: { vi: 'Hệ Thống', en: 'Systems & Architecture' },
        memories: { vi: 'Kỷ Niệm', en: 'Career Memories' },
        contact: { vi: 'Liên Hệ', en: 'Contact & Connect' },
        wallpapers: { vi: 'Hình Nền', en: 'Wallpaper Gallery' },
      };

      if (titleMap[sec.id]) {
        return isVi ? titleMap[sec.id].vi : titleMap[sec.id].en;
      }
      return sec.id;
    },
    [isVi]
  );

  const handlePrev = useCallback(() => {
    if (prevSection) {
      playUiSound('click');
      onNavigate(prevSection.id);
    }
  }, [prevSection, onNavigate]);

  const handleNext = useCallback(() => {
    if (nextSection) {
      playUiSound('click');
      onNavigate(nextSection.id);
    }
  }, [nextSection, onNavigate]);

  // Global Keyboard Listener for Left / Right Arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid intercepting arrow keys if typing in input, textarea or search
      const activeEl = document.activeElement;
      const isInput =
        activeEl?.tagName === 'INPUT' ||
        activeEl?.tagName === 'TEXTAREA' ||
        activeEl?.tagName === 'SELECT' ||
        (activeEl as HTMLElement)?.isContentEditable;

      if (isInput) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <nav aria-label={isVi ? 'Điều hướng chuyển nhanh trang' : 'Quick Page Navigation'}>
      {/* 1. LEFT SCREEN EDGE - PREVIOUS SECTION ARROW */}
      <div
        className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 flex items-center select-none"
        onMouseEnter={() => setHoveredSide('left')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <div className="relative flex items-center">
          <button
            type="button"
            onClick={handlePrev}
            aria-label={`${isVi ? 'Chuyển về trang trước' : 'Go to previous page'}: ${getSectionName(prevSection)}`}
            aria-keyshortcuts="ArrowLeft"
            title={`${isVi ? 'Trang trước' : 'Previous Section'}: ${getSectionName(prevSection)} (Phím ←)`}
            className={cn(
              'group/prev relative flex items-center justify-center w-9 h-11 sm:w-11 sm:h-14 rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-300 active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500',
              'bg-white/70 dark:bg-slate-900/75 backdrop-blur-xl border border-slate-200/80 dark:border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]',
              'hover:bg-white/95 dark:hover:bg-slate-900/95 hover:border-purple-500/50 dark:hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.35)]',
              hoveredSide === 'left' && 'scale-105'
            )}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 dark:text-slate-200 group-hover/prev:text-purple-600 dark:group-hover/prev:text-cyan-400 transition-transform duration-200 group-hover/prev:-translate-x-0.5" aria-hidden="true" />
            
            {/* Subtle glow dot */}
            <span className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1 h-3 rounded-r-full bg-purple-500 dark:bg-cyan-400 opacity-0 group-hover/prev:opacity-100 transition-opacity" aria-hidden="true" />
          </button>

          {/* Left Hover Popover Preview */}
          <AnimatePresence>
            {hoveredSide === 'left' && (
              <motion.div
                role="tooltip"
                aria-live="polite"
                initial={{ opacity: 0, x: -10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap pl-1"
              >
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-900/95 dark:bg-slate-950/95 text-white border border-purple-500/30 dark:border-cyan-500/30 shadow-2xl backdrop-blur-2xl">
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-3xs uppercase font-bold tracking-wider text-purple-400 dark:text-cyan-300">
                        {isVi ? '← Trang trước' : '← Previous Page'}
                      </span>
                      <span className="px-1.5 py-0.2 rounded font-mono text-3xs bg-white/10 text-slate-300">
                        Phím [←]
                      </span>
                    </div>
                    <span className="text-xs font-bold text-white">
                      #{String(prevIndex + 1).padStart(2, '0')} · {getSectionName(prevSection)}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. RIGHT SCREEN EDGE - NEXT SECTION ARROW */}
      <div
        className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 flex items-center select-none"
        onMouseEnter={() => setHoveredSide('right')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <div className="relative flex items-center">
          {/* Right Hover Popover Preview */}
          <AnimatePresence>
            {hoveredSide === 'right' && (
              <motion.div
                role="tooltip"
                aria-live="polite"
                initial={{ opacity: 0, x: 10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-[calc(100%+8px)] top-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap pr-1"
              >
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-900/95 dark:bg-slate-950/95 text-white border border-purple-500/30 dark:border-cyan-500/30 shadow-2xl backdrop-blur-2xl">
                  <div className="flex flex-col text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="px-1.5 py-0.2 rounded font-mono text-3xs bg-white/10 text-slate-300">
                        Phím [→]
                      </span>
                      <span className="text-3xs uppercase font-bold tracking-wider text-purple-400 dark:text-cyan-300">
                        {isVi ? 'Trang tiếp →' : 'Next Page →'}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-white">
                      #{String(nextIndex + 1).padStart(2, '0')} · {getSectionName(nextSection)}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={handleNext}
            aria-label={`${isVi ? 'Chuyển sang trang tiếp theo' : 'Go to next page'}: ${getSectionName(nextSection)}`}
            aria-keyshortcuts="ArrowRight"
            title={`${isVi ? 'Trang tiếp theo' : 'Next Section'}: ${getSectionName(nextSection)} (Phím →)`}
            className={cn(
              'group/next relative flex items-center justify-center w-9 h-11 sm:w-11 sm:h-14 rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-300 active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500',
              'bg-white/70 dark:bg-slate-900/75 backdrop-blur-xl border border-slate-200/80 dark:border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]',
              'hover:bg-white/95 dark:hover:bg-slate-900/95 hover:border-purple-500/50 dark:hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.35)]',
              hoveredSide === 'right' && 'scale-105'
            )}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 dark:text-slate-200 group-hover/next:text-purple-600 dark:group-hover/next:text-cyan-400 transition-transform duration-200 group-hover/next:translate-x-0.5" aria-hidden="true" />
            
            {/* Subtle glow dot */}
            <span className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-1 h-3 rounded-l-full bg-purple-500 dark:bg-cyan-400 opacity-0 group-hover/next:opacity-100 transition-opacity" aria-hidden="true" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default PageNavigationArrows;
