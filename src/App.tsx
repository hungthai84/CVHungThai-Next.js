/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, memo, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "./lib/utils";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import BackgroundRenderer from "./components/BackgroundRenderer";
import BentoSkeleton from "./components/BentoSkeleton";
import CustomCursor from "./components/CustomCursor";
import ThemeTransitionOverlay from "./components/ThemeTransitionOverlay";
import OpenLetter from "./components/OpenLetter";
import About from "./components/About";
import DomainsSection from "./components/DomainsSection";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Interview from "./components/Interview";
import TuVi from "./components/TuVi";
import Memories from "./components/Memories";
import Contact from "./components/Contact";
import Wallpapers from "./components/Wallpapers";
import Systems from "./components/Systems";
import { LanguageProvider, useLanguage } from "./i18n";
import { BackgroundProvider } from "./context/BackgroundContext";
import { LayoutProvider, useLayout } from "./context/LayoutContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";
import { CursorProvider } from "./context/CursorContext";
import { SoundProvider, useSound } from "./context/SoundContext";
import { FooterProvider, useFooter } from "./context/FooterContext";
import { SectionProvider, SectionMeta } from "./context/SectionContext";
import { getUnifiedSurfaceStyle } from "./lib/utils";
import { 
  Monitor, MailOpen, User, GraduationCap, Compass, 
  Briefcase, Brain, ClipboardList, Video,
  Sparkles, Images, LayoutGrid, MessagesSquare, Film, ChevronDown, Headphones, Server
} from "lucide-react";

// Helper function to dynamically import modules with automatic retry on chunk load errors
function lazyWithRetry<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    try {
      return await factory();
    } catch (error) {
      console.warn("Retrying dynamic module import failure:", error);
      await new Promise((resolve) => setTimeout(resolve, 500));
      try {
        return await factory();
      } catch (retryErr) {
        try {
          const hasReloaded = typeof window !== "undefined" && window.sessionStorage
            ? window.sessionStorage.getItem("dynamic_import_reloaded")
            : null;
          if (!hasReloaded && typeof window !== "undefined") {
            window.sessionStorage?.setItem("dynamic_import_reloaded", "true");
            window.location.reload();
            return new Promise<{ default: T }>(() => {});
          }
        } catch {}
        throw retryErr;
      }
    }
  });
}

// Lazy load non-hero sections for dynamic code splitting & reduced initial bundle
// Statically imported section components above

// Lazy load heavy overlays & settings modals
const XRayInspector = lazyWithRetry(() => import("./components/XRayInspector"));
const AIAssistant = lazyWithRetry(() => import("./components/ai/AIAssistant"));
const ColorSystemModal = lazyWithRetry(() => import("./components/ColorSystemModal"));
const CursorSettingsModal = lazyWithRetry(() => import("./components/CursorSettingsModal"));
const SoundSettingsModal = lazyWithRetry(() => import("./components/SoundSettingsModal"));
const FooterSettingsModal = lazyWithRetry(() => import("./components/FooterSettingsModal"));
const TypographySettings = lazyWithRetry(() => import("./components/TypographySettings"));
const ExecutiveResumeExportModal = lazyWithRetry(() => import("./components/ExecutiveResumeExportModal"));
const PresentationModeModal = lazyWithRetry(() => import("./components/PresentationModeModal"));

// Memoize Hero component
const MemoHero = memo(Hero);

const SECTIONS: SectionMeta[] = [
  { id: "home", labelKey: "nav.home", Icon: Monitor, Component: MemoHero, padding: "p-0 overflow-hidden" },
  { id: "letter", labelKey: "nav.letter", Icon: MailOpen, Component: OpenLetter, padding: "p-0 overflow-y-auto" },
  { id: "about", labelKey: "nav.about", Icon: User, Component: About, padding: "p-0 overflow-y-auto" },
  { id: "domains", labelKey: "nav.domains", Icon: Compass, Component: DomainsSection, padding: "p-0 overflow-y-auto" },
  { id: "skills", labelKey: "nav.skills", Icon: Brain, Component: Skills, padding: "p-0 overflow-y-auto" },
  { id: "education", labelKey: "nav.education", Icon: GraduationCap, Component: Education, padding: "p-0 overflow-y-auto" },
  { id: "experience", labelKey: "nav.experience", Icon: Briefcase, Component: Experience, padding: "p-0 overflow-y-auto" },
  { id: "projects", labelKey: "nav.projects", Icon: ClipboardList, Component: Projects, padding: "p-0 overflow-y-auto" },
  { id: "interview", labelKey: "nav.interview", Icon: Video, Component: Interview, padding: "p-0 overflow-y-auto" },
  { id: "tuvi", labelKey: "nav.tuvi", Icon: Sparkles, Component: TuVi, padding: "p-0 overflow-y-auto" },
  { id: "memories", labelKey: "nav.memories", Icon: Images, Component: Memories, padding: "p-0 overflow-y-auto" },
  { id: "systems", labelKey: "nav.systems", Icon: Server, Component: Systems, padding: "p-0 overflow-y-auto" },
  { id: "contact", labelKey: "nav.contact", Icon: MessagesSquare, Component: Contact, padding: "p-0 overflow-y-auto" },
  { id: "wallpapers", labelKey: "nav.wallpapers", Icon: Film, Component: Wallpapers, padding: "p-0 overflow-y-auto" },
];

function MainContent() {
  const { theme, setTheme } = useTheme();
  const { t, lang } = useLanguage();
  const { isSwitching } = useLayout();
  const { footerConfig, isFooterHovered } = useFooter();
  const isFooterPinned = footerConfig.isPinned !== false;
  const isFooterSlidDown = !isFooterPinned && !isFooterHovered;

  const [activeSection, setActiveSection] = useState("home");
  const [isSectionLoading, setIsSectionLoading] = useState(false);
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollReminder, setShowScrollReminder] = useState(false);

  // States for Proactive Feature Modals
  const [isResumeExportOpen, setIsResumeExportOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  const { playTransition } = useSound();

  // State for Keyboard Shortcut Toast notification
  const [shortcutToast, setShortcutToast] = useState<{ key: string; nameVi: string; nameEn: string } | null>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerShortcutToast = (key: string, nameVi: string, nameEn: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setShortcutToast({ key, nameVi, nameEn });
    toastTimerRef.current = setTimeout(() => {
      setShortcutToast(null);
    }, 2500);
  };

  // Trigger scroll reminder after 10s of no action/navigation (PROMPT #8), auto-hide after 5s
  useEffect(() => {
    setShowScrollReminder(false);
    let hideTimer: NodeJS.Timeout;
    const showTimer = setTimeout(() => {
      setShowScrollReminder(true);
      hideTimer = setTimeout(() => {
        setShowScrollReminder(false);
      }, 5000); // Auto hide after 5 seconds
    }, 10000); // 10 seconds delay before showing

    return () => {
      clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [activeSection]);

  // Atomic synchronization of theme classes on root element to prevent layout shifts & hydration mismatches
  useEffect(() => {
    const root = document.documentElement;
    const allThemeClasses = [
      "dark",
      "theme-light",
      "theme-glass-dark-neon",
      "theme-modern-light-glass",
      "theme-mritech-aurora-glass",
      "theme-mritech-digital-growth",
      "theme-dark"
    ];

    root.classList.remove(...allThemeClasses);
    root.setAttribute("data-theme", theme);

    if (theme === "glass-dark-neon") {
      root.classList.add("dark", `theme-${theme}`);
    } else {
      root.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  // Smoothly switch to specific section with subtle pulse loading state
  const navigateToSection = (id: string) => {
    const cleanId = id.replace(/^#/, "");
    const targetSection = SECTIONS.find((s) => s.id === cleanId);
    if (targetSection && cleanId !== activeSection) {
      playTransition();
      if (cleanId !== "home") {
        setIsSectionLoading(true);
        if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
        loadingTimerRef.current = setTimeout(() => {
          setIsSectionLoading(false);
        }, 220);
      }
      setActiveSection(cleanId);
    }
  };

  const handleScrollReminderClick = () => {
    const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
    if (currentIndex < SECTIONS.length - 1) {
      navigateToSection(SECTIONS[currentIndex + 1].id);
    } else {
      navigateToSection(SECTIONS[0].id);
    }
    setShowScrollReminder(false);
  };

  // Listen for custom app-navigate & feature modal events
  useEffect(() => {
    const handleAppNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        navigateToSection(customEvent.detail);
      }
    };
    const handleOpenResumeExport = () => setIsResumeExportOpen(true);
    const handleOpenPresentationMode = () => setIsPresentationOpen(true);

    window.addEventListener("app-navigate", handleAppNavigate);
    window.addEventListener("open-resume-export", handleOpenResumeExport);
    window.addEventListener("open-presentation-mode", handleOpenPresentationMode);

    return () => {
      window.removeEventListener("app-navigate", handleAppNavigate);
      window.removeEventListener("open-resume-export", handleOpenResumeExport);
      window.removeEventListener("open-presentation-mode", handleOpenPresentationMode);
    };
  }, [activeSection]);


  // Keyboard navigation & direct section jump shortcuts (1..9 and 0)
  useEffect(() => {
    const shortcutMap: Record<string, { id: string; nameVi: string; nameEn: string }> = {
      "1": { id: "home", nameVi: "Trang chủ", nameEn: "Home" },
      "2": { id: "letter", nameVi: "Thư ngỏ", nameEn: "Open Letter" },
      "3": { id: "about", nameVi: "Giới thiệu", nameEn: "About" },
      "4": { id: "education", nameVi: "Học vấn & Bằng cấp", nameEn: "Education" },
      "5": { id: "skills", nameVi: "Kỹ năng chuyên môn", nameEn: "Skills" },
      "6": { id: "experience", nameVi: "Kinh nghiệm làm việc", nameEn: "Experience" },
      "7": { id: "projects", nameVi: "Dự án tiêu biểu", nameEn: "Projects" },
      "8": { id: "interview", nameVi: "Phỏng vấn AI", nameEn: "AI Interview" },
      "9": { id: "tuvi", nameVi: "Tử Vi & Chiêm Tinh", nameEn: "TuVi & Astrology" },
      "0": { id: "contact", nameVi: "Liên hệ", nameEn: "Contact" },
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.tagName === "SELECT" ||
          (activeEl as HTMLElement).isContentEditable)
      ) {
        return;
      }

      const key = e.key;
      if (shortcutMap[key]) {
        const item = shortcutMap[key];
        navigateToSection(item.id);
        triggerShortcutToast(key, item.nameVi, item.nameEn);
        return;
      }

      const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
      if ((e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") && currentIndex < SECTIONS.length - 1) {
        navigateToSection(SECTIONS[currentIndex + 1].id);
      } else if ((e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") && currentIndex > 0) {
        navigateToSection(SECTIONS[currentIndex - 1].id);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection]);

  // Touch Swipe Navigation for Responsive Web (Mobile & Tablet)
  // Handles high-velocity swipes, varying screen aspect ratios, and dynamic thresholds
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let isIgnoredTarget = false;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return; // Only track single-finger gestures
      
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchStartTime = Date.now();

      // Check if user initiated touch inside an element that handles its own horizontal scroll
      const target = e.target as HTMLElement | null;
      if (target) {
        const scrollableParent = target.closest(
          '.no-swipe, [data-no-swipe], pre, code, .overflow-x-auto, input, textarea, select, [role="slider"]'
        );
        isIgnoredTarget = Boolean(scrollableParent);
      } else {
        isIgnoredTarget = false;
      }
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (isIgnoredTarget || e.changedTouches.length === 0) return;
      
      const touch = e.changedTouches[0];
      const touchEndX = touch.clientX;
      const touchEndY = touch.clientY;
      const touchEndTime = Date.now();
      
      handleSwipeGesture(touchEndX, touchEndY, touchEndTime);
    };
    
    const handleSwipeGesture = (touchEndX: number, touchEndY: number, touchEndTime: number) => {
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);
      const elapsedTime = Math.max(1, touchEndTime - touchStartTime); // in milliseconds
      
      // Calculate velocity in pixels per millisecond
      const velocityX = absDeltaX / elapsedTime;

      // Screen aspect ratio normalization (tall phone ~2.0+, tablet ~1.3, landscape < 1.0)
      const viewportWidth = window.innerWidth || 390;
      const viewportHeight = window.innerHeight || 844;
      const screenAspectRatio = viewportHeight / Math.max(1, viewportWidth);

      // Adaptive distance threshold: proportional to viewport width but capped
      // Normal swipe: ~14% of width (min 45px, max 85px)
      // Fast flick (velocity > 0.42 px/ms): lower threshold (35px) for quick responsiveness
      const isHighVelocity = velocityX >= 0.42 && elapsedTime < 400;
      const dynamicSwipeThreshold = isHighVelocity 
        ? 35 
        : Math.min(85, Math.max(45, viewportWidth * 0.14));

      // Adaptive vertical tolerance based on aspect ratio
      // Taller screens have a more natural diagonal thumb arc, so relax horizontal dominance ratio slightly
      const horizontalDominanceRatio = screenAspectRatio > 1.8 ? 1.35 : 1.65;
      const maxVerticalTolerance = isHighVelocity 
        ? Math.min(140, viewportHeight * 0.22) 
        : Math.min(90, viewportHeight * 0.15);

      // Validate gesture intentionality
      const isHorizontalIntent = absDeltaX >= dynamicSwipeThreshold && 
                                 absDeltaX > absDeltaY * horizontalDominanceRatio &&
                                 absDeltaY < maxVerticalTolerance;

      if (isHorizontalIntent) {
        const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
        
        if (deltaX < 0) {
          // Swipe left -> Next section
          if (currentIndex < SECTIONS.length - 1) {
            navigateToSection(SECTIONS[currentIndex + 1].id);
          }
        } else if (deltaX > 0) {
          // Swipe right -> Previous section
          if (currentIndex > 0) {
            navigateToSection(SECTIONS[currentIndex - 1].id);
          }
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSection]);




  const activeIndex = SECTIONS.findIndex((s) => s.id === activeSection);
  const currentSection = SECTIONS[activeIndex] || SECTIONS[0];
  const CurrentComponent = currentSection.Component;

  const getMainCardStyle = () => {
    return getUnifiedSurfaceStyle(theme);
  };

  return (
    <SectionProvider activeSection={activeSection} sections={SECTIONS}>
      <div className="min-h-screen h-screen w-full flex flex-col items-center justify-between relative overflow-hidden p-0 bg-transparent">
        {/* Dynamic Persistent Background Renderer (Video / Image / Gradient) */}
        <BackgroundRenderer />

        {/* Global Header (Bám sát bên trên website 0px, cách thẻ 10px, chiều dài bằng chiều dài thẻ, bo cong góc dưới trái & phải) */}
        <Header 
          theme={theme} 
          setTheme={setTheme} 
          activeSection={activeSection}
          onNavigate={navigateToSection}
        />

        {/* Center Main Container Wrapper (Cách Header đúng 10px, cách Footer đúng 10px khi ghim hoặc trượt) */}
        <div 
          className={cn(
            "mx-auto flex flex-col items-center relative z-10 w-[calc(100%-16px)] sm:w-[94%] md:w-[90%] lg:w-[88%] xl:w-[85%] max-w-[1250px] mt-[70px] sm:mt-[74px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isFooterSlidDown ? "mb-[24px]" : "mb-[70px] sm:mb-[74px]"
          )}
        >
          {/* Glass Container with Fluid Responsive Height (Kéo dài khi footer trượt ẩn để đảm bảo cách footer 10px) */}
          <div 
            ref={cardContainerRef}
            className={cn(
              "w-full rounded-2xl md:rounded-[24px] lg:rounded-[32px] overflow-hidden relative flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] floating-glass-main-card z-20",
              isFooterSlidDown 
                ? "h-[calc(100vh-94px)] sm:h-[calc(100vh-98px)]" 
                : "h-[calc(100vh-140px)] sm:h-[calc(100vh-148px)]",
              getMainCardStyle(),
              isSwitching ? "scale-[0.985] opacity-80" : "scale-100 opacity-100"
            )}
          >
            <main className="relative w-full h-full overflow-hidden flex-grow">
              <AnimatePresence mode="wait" initial={false}>
                {isSectionLoading ? (
                  <motion.div
                    key="section-skeleton-loading"
                    layoutId="section-card-wrapper"
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.985 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="w-full h-full p-4 sm:p-6 overflow-hidden"
                  >
                    <BentoSkeleton />
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeSection}
                    id={activeSection}
                    layoutId="section-card-wrapper"
                    initial={{ 
                      y: 40, 
                      opacity: 0, 
                      scale: 0.985,
                      filter: "blur(4px)" 
                    }}
                    animate={{ 
                      y: 0, 
                      opacity: 1, 
                      scale: 1,
                      filter: "blur(0px)" 
                    }}
                    exit={{ 
                      y: -30, 
                      opacity: 0, 
                      scale: 0.985,
                      filter: "blur(4px)" 
                    }}
                    transition={{ 
                      duration: 0.35, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    className={`w-full h-full ${currentSection.padding} no-scrollbar scroll-smooth`}
                  >
                    <Suspense fallback={<BentoSkeleton />}>
                      <CurrentComponent />
                    </Suspense>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </div>

        </div>

        {/* RIGHT FLOATING PAGE PROGRESS STEPPER - ADAPTS TO WEBSITE THEME */}
        <div className={cn(
          "fixed right-3 lg:right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center p-2 sm:p-2.5 rounded-2xl sm:rounded-full space-y-3 transition-all duration-300 backdrop-blur-xl border shadow-xl",
          theme === "glass-dark-neon"
            ? "bg-slate-950/80 border-slate-800/80 text-white shadow-indigo-950/40"
            : "bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white shadow-lg"
        )}>
          {/* Progress Line with Glass effect */}
          <div className="absolute top-5 bottom-5 w-0.5 bg-slate-300/50 dark:bg-white/10 pointer-events-none backdrop-blur-xs">
            <div 
              className="w-full bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
              style={{ height: `${(activeIndex / (SECTIONS.length - 1)) * 100}%` }}
            />
          </div>
          
          {SECTIONS.map((sec, idx) => {
            const isActive = activeSection === sec.id;
            const Icon = sec.Icon;
            return (
              <div key={sec.id} className="relative group/step flex items-center justify-center py-0.5">
                {/* Tooltip Badge (Slide to the Left with Theme Glassmorphism) */}
                <div className={cn(
                  "absolute right-9 px-3 py-1.5 rounded-xl border text-2xs font-black tracking-wide whitespace-nowrap opacity-0 translate-x-3 scale-95 group-hover/step:opacity-100 group-hover/step:translate-x-0 group-hover/step:scale-100 transition-all duration-200 pointer-events-none flex items-center gap-2 backdrop-blur-md shadow-2xl",
                  theme === "glass-dark-neon"
                    ? "bg-slate-950/95 border-indigo-500/40 text-white shadow-indigo-950/50"
                    : "bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                )}>
                  <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-blue-500/20 text-blue-500 dark:text-blue-400">
                    <Icon className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <span>{t(sec.labelKey)}</span>
                  <span className="text-3xs text-blue-600 dark:text-blue-400 font-mono bg-blue-500/10 px-1.5 py-0.5 rounded-md">({idx + 1}/{SECTIONS.length})</span>
                </div>
                
                {/* Target Indicator Button with Vertical Bars (Dấu gạch dọc) */}
                <button
                  onClick={() => navigateToSection(sec.id)}
                  className={`relative z-10 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center ${
                    isActive 
                      ? "w-1.5 h-6.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 shadow-md shadow-indigo-500/60 ring-2 ring-indigo-400/80 scale-105" 
                      : "w-1 h-3.5 bg-slate-400/80 dark:bg-slate-600 hover:w-1.5 hover:h-6 hover:bg-indigo-500 dark:hover:bg-indigo-400"
                  }`}
                  title={t(sec.labelKey)}
                >
                  {/* Shared ping wave effect for active item */}
                  {isActive && (
                    <motion.span
                      layoutId="active-stepper-glow"
                      className="absolute -inset-1 rounded-full border border-indigo-500/60 animate-ping opacity-60 pointer-events-none"
                    />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Global Footer (Full on Home / Collapsed Edge with Slide-up on Other Pages) */}
        <Footer 
          theme={theme}
          activeSection={activeSection}
          onNavigate={navigateToSection}
        />

        {/* Lazy Loaded Heavy Overlays & Modals */}
        <Suspense fallback={null}>
          <XRayInspector />
          <AIAssistant />
          <ColorSystemModal />
          <CursorSettingsModal />
          <SoundSettingsModal />
          <FooterSettingsModal />
          <TypographySettings />
          <ExecutiveResumeExportModal
            isOpen={isResumeExportOpen}
            onClose={() => setIsResumeExportOpen(false)}
          />
          <PresentationModeModal
            isOpen={isPresentationOpen}
            onClose={() => setIsPresentationOpen(false)}
            onNavigate={navigateToSection}
          />
        </Suspense>

        {/* Floating Keyboard Shortcut Notification Toast */}
        <AnimatePresence>
          {shortcutToast && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/90 text-white border border-cyan-400/40 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(0,240,255,0.35)] backdrop-blur-2xl pointer-events-none select-none"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 text-white font-mono font-black text-sm border border-cyan-300/40 shadow-sm shrink-0">
                {shortcutToast.key}
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className="text-3xs uppercase font-bold tracking-wider text-cyan-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  {lang === "vi" ? "Phím tắt chuyển trang" : "Shortcut Jump"}
                </span>
                <span className="text-xs font-bold text-white truncate">
                  {lang === "vi" ? shortcutToast.nameVi : shortcutToast.nameEn}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Scroll Reminder Button centered, footer-level, displayed after 10s (PROMPT #8) */}
        <AnimatePresence>
          {showScrollReminder && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={cn(
                "fixed left-1/2 -translate-x-1/2 z-[45] pointer-events-auto transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isFooterSlidDown 
                  ? "bottom-[34px] sm:bottom-[38px] md:bottom-[42px]" 
                  : "bottom-[74px] sm:bottom-[80px] md:bottom-[84px]"
              )}
            >
              <div className="relative inline-flex items-center rounded-full p-[1.5px] overflow-hidden select-none group/scrollrem transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-[0_8px_25px_rgba(99,102,241,0.55)]">
                {/* Rotating border aura */}
                <div className="absolute -inset-[220%] animate-[spin_5s_linear_infinite] pointer-events-none bg-[conic-gradient(from_0deg,transparent_0_180deg,#6366f1_240deg,#d946ef_300deg,#ffffff_340deg,#6366f1_360deg)] opacity-90" />
                
                <button
                  type="button"
                  onClick={handleScrollReminderClick}
                  className="relative z-10 px-5 py-2 sm:py-2.5 rounded-full bg-slate-900/90 dark:bg-slate-950/90 border border-white/10 text-white font-extrabold text-3xs sm:text-xs uppercase tracking-wider backdrop-blur-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  <span>{lang === "vi" ? "Khám phá tiếp" : "Explore More"}</span>
                  <ChevronDown className="w-4 h-4 text-indigo-400 animate-bounce" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Futuristic Custom Cursor */}
        <CustomCursor />

        {/* Global Smooth Theme Snapshot Dissolve Overlay */}
        <ThemeTransitionOverlay />
      </div>
    </SectionProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <BackgroundProvider>
          <LayoutProvider>
            <LanguageProvider>
              <CursorProvider>
                <SoundProvider>
                  <FooterProvider>
                    <MainContent />
                  </FooterProvider>
                </SoundProvider>
              </CursorProvider>
            </LanguageProvider>
          </LayoutProvider>
        </BackgroundProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}


