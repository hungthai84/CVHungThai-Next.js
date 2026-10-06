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
import CustomCursor from "./components/CustomCursor";
import ThemeTransitionOverlay from "./components/ThemeTransitionOverlay";
import About from "./components/About";
import Domains from "./components/Domains";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Interview from "./components/Interview";
import TuVi from "./components/TuVi";
import Memories from "./components/Memories";
import Contact from "./components/Contact";
import Wallpapers from "./components/Wallpapers";
import Systems from "./components/Systems";
import Customization from "./components/Customization";
import Letter from "./components/Letter";
import TabErrorsPage from "./components/TabErrorsPage";
import ErrorBoundaryHandler from "./components/ErrorBoundaryHandler";
import XRayInspector from "./components/XRayInspector";
import AIAssistant from "./components/ai/AIAssistant";
import ColorSystemModal from "./components/ColorSystemModal";
import CursorSettingsModal from "./components/CursorSettingsModal";
import SoundSettingsModal from "./components/SoundSettingsModal";
import FooterSettingsModal from "./components/FooterSettingsModal";
import TypographySettings from "./components/TypographySettings";
import ExecutiveResumeExportModal from "./components/ExecutiveResumeExportModal";
import ThemeModal from "./components/ThemeModal";
import CommandPalette from "./components/CommandPalette";
import ImageStudioModal from "./components/ai/ImageStudioModal";
import { LanguageProvider, useLanguage } from "./i18n";
import { BackgroundProvider } from "./context/BackgroundContext";
import { LayoutProvider, useLayout } from "./context/LayoutContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";
import { CursorProvider } from "./context/CursorContext";
import { SoundProvider, useSound } from "./context/SoundContext";
import { FooterProvider, useFooter } from "./context/FooterContext";
import { HeaderProvider, useHeader } from "./context/HeaderContext";
import { SectionProvider, SectionMeta } from "./context/SectionContext";
import { getUnifiedSurfaceStyle } from "./lib/utils";
import { 
  Monitor, MailOpen, User, GraduationCap, Compass, 
  Briefcase, Brain, ClipboardList, Video,
  Sparkles, Images, LayoutGrid, MessagesSquare, Film, ChevronDown, Headphones, Server,
  LayoutTemplate, Sliders, ShieldAlert
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

// Memoize Hero component
const MemoHero = memo(Hero);

const SECTIONS: SectionMeta[] = [
  { id: "home", labelKey: "nav.home", Icon: Monitor, Component: MemoHero, padding: "p-0 overflow-hidden" },
  { id: "letter", labelKey: "nav.letter", Icon: MailOpen, Component: Letter, padding: "p-0 overflow-y-auto" },
  { id: "about", labelKey: "nav.about", Icon: User, Component: About, padding: "p-0 overflow-y-auto" },
  { id: "domains", labelKey: "nav.domains", Icon: Compass, Component: Domains, padding: "p-0 overflow-y-auto" },
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
  { id: "customization", labelKey: "nav.customization", Icon: Sliders, Component: Customization, padding: "p-0 overflow-y-auto" },
  { id: "errors", labelKey: "nav.errors", Icon: ShieldAlert, Component: TabErrorsPage, padding: "p-0 overflow-y-auto" },
];

function MainContent() {
  const themeContext = useTheme();
  const { theme, setTheme } = themeContext;
  const { t, lang } = useLanguage();
  const { isSwitching } = useLayout();
  const { footerConfig, isFooterHovered } = useFooter();
  const { isHeaderPinned, isHeaderSlidUp } = useHeader();
  const isFooterPinned = footerConfig.isPinned !== false;
  const isFooterSlidDown = !isFooterPinned && !isFooterHovered;

  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash) return hash;
      const savedSession = sessionStorage.getItem("portfolio_active_section");
      if (savedSession) return savedSession;
      const savedLocal = localStorage.getItem("portfolio_active_section");
      if (savedLocal) return savedLocal;
    }
    return "home";
  });
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollReminder, setShowScrollReminder] = useState(false);

  // Sync active section to sessionStorage, localStorage and URL hash
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("portfolio_active_section", activeSection);
      localStorage.setItem("portfolio_active_section", activeSection);
    }
    if (typeof window !== "undefined" && window.location.hash.replace(/^#/, "") !== activeSection) {
      window.location.hash = activeSection;
    }
  }, [activeSection]);

  // Sync navigation on browser back/forward and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash && hash !== activeSection) {
        navigateToSection(hash);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [activeSection]);

  // States for Proactive Feature Modals
  const [isResumeExportOpen, setIsResumeExportOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isImageStudioOpen, setIsImageStudioOpen] = useState(false);

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

    // Cleanly strip all previous theme classes (e.g. theme-*, dark)
    Array.from(root.classList).forEach((cls) => {
      if (cls === "dark" || cls.startsWith("theme-")) {
        root.classList.remove(cls);
      }
    });

    root.setAttribute("data-theme", theme);
    root.dataset.theme = theme;

    if (theme === "dark" || theme === "glass-dark-neon") {
      root.classList.add("dark", `theme-${theme}`);
    } else {
      root.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  // Smoothly switch to specific section with direct instant transition (không hiển thị màn hình loader)
  const navigateToSection = (id: string) => {
    let cleanId = id.replace(/^#/, "");
    if (cleanId === "tab-errors") cleanId = "errors";
    const targetSection = SECTIONS.find((s) => s.id === cleanId);
    if (targetSection && cleanId !== activeSection) {
      playTransition();
      setActiveSection(cleanId);
      if (cardContainerRef.current) {
        cardContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
      setTimeout(() => {
        const activeEl = document.getElementById(cleanId);
        if (activeEl) {
          activeEl.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 50);
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
    const handleOpenCommandPalette = () => setIsCommandPaletteOpen(true);
    const handleOpenImageStudio = () => setIsImageStudioOpen(true);

    window.addEventListener("app-navigate", handleAppNavigate);
    window.addEventListener("open-resume-export", handleOpenResumeExport);
    window.addEventListener("open-command-palette", handleOpenCommandPalette);
    window.addEventListener("open-image-studio", handleOpenImageStudio);

    return () => {
      window.removeEventListener("app-navigate", handleAppNavigate);
      window.removeEventListener("open-resume-export", handleOpenResumeExport);
      window.removeEventListener("open-command-palette", handleOpenCommandPalette);
      window.removeEventListener("open-image-studio", handleOpenImageStudio);
    };
  }, [activeSection]);


  // Keyboard navigation & direct section jump shortcuts (1..9, 0, and Ctrl+K / Cmd+K)
  useEffect(() => {
    const shortcutMap: Record<string, { id: string; nameVi: string; nameEn: string }> = {
      "1": { id: "home", nameVi: "Trang chủ", nameEn: "Home" },
      "2": { id: "letter", nameVi: "Thư ngỏ", nameEn: "Open Letter" },
      "3": { id: "about", nameVi: "Giới thiệu", nameEn: "About" },
      "5": { id: "skills", nameVi: "Kỹ năng chuyên môn", nameEn: "Skills" },
      "6": { id: "experience", nameVi: "Kinh nghiệm làm việc", nameEn: "Experience" },
      "7": { id: "projects", nameVi: "Dự án tiêu biểu", nameEn: "Projects" },
      "8": { id: "interview", nameVi: "Phỏng vấn AI", nameEn: "AI Interview" },
      "9": { id: "tuvi", nameVi: "Tử Vi & Chiêm Tinh", nameEn: "TuVi & Astrology" },
      "0": { id: "contact", nameVi: "Liên hệ", nameEn: "Contact" },
      "u": { id: "customization", nameVi: "Tùy chỉnh hệ thống", nameEn: "Customization" },
      "U": { id: "customization", nameVi: "Tùy chỉnh hệ thống", nameEn: "Customization" },
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Global Quick Search / Command Palette shortcut (Ctrl+K or Cmd+K)
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      // Global AI Image Studio shortcut (Ctrl+I or Cmd+I)
      if ((e.ctrlKey || e.metaKey) && (e.key === "i" || e.key === "I")) {
        e.preventDefault();
        setIsImageStudioOpen((prev) => !prev);
        return;
      }

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
    <SectionProvider activeSection={activeSection} setActiveSection={setActiveSection} sections={SECTIONS}>
      <div className="min-h-screen h-screen w-full flex flex-col items-center justify-between relative overflow-hidden p-0 bg-transparent">
        {/* CodePen Glassmorphism Ambient Floating Layer */}
        <div className="codepen-glass-wrap">
          <div className="codepen-glass-drop codepen-glass-drop-1 hidden md:block opacity-60" />
          <div className="codepen-glass-drop codepen-glass-drop-2 opacity-70" />
          <div className="codepen-glass-drop codepen-glass-drop-3 opacity-60" />
          <div className="codepen-glass-drop codepen-glass-drop-4 opacity-75" />
        </div>

        {/* Dynamic Persistent Background Renderer (Video / Image / Gradient) */}
        <BackgroundRenderer />

        {/* Global Header (Bám sát bên trên website 0px, cách thẻ 10px, chiều dài bằng chiều dài thẻ, bo cong góc dưới trái & phải) */}
        <Header 
          theme={theme} 
          setTheme={setTheme} 
          activeSection={activeSection}
          onNavigate={navigateToSection}
        />

        {/* Center Main Container Wrapper (Cách Header đúng 15px, cách Footer đúng 15px khi ghim hoặc trượt) */}
        <div 
          className={cn(
            "mx-auto flex flex-col items-center relative z-10 w-[calc(100%-16px)] sm:w-[94%] md:w-[90%] lg:w-[88%] xl:w-[85%] max-w-[1250px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isHeaderSlidUp ? "mt-[24px]" : "mt-[90px]",
            isFooterSlidDown ? "mb-[24px]" : "mb-[90px]"
          )}
        >
          {/* Glass Container with Fluid Responsive Height (Kéo dài khi header/footer trượt ẩn để đảm bảo cách đúng 15px) */}
          <div 
            ref={cardContainerRef}
            className={cn(
              "w-full rounded-[14px] overflow-hidden relative flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] floating-glass-main-card z-20 shadow-none !shadow-none",
              isHeaderSlidUp && isFooterSlidDown
                ? "h-[calc(100vh-48px)]"
                : isHeaderSlidUp || isFooterSlidDown
                ? "h-[calc(100vh-105px)]" 
                : "h-[calc(100vh-180px)]",
              getMainCardStyle(),
              isSwitching ? "opacity-80" : "opacity-100"
            )}
            style={{
              borderRadius: "var(--theme-radius-card, 14px)",
              boxShadow: "none"
            }}
          >
            <main className="relative w-full h-full overflow-hidden flex-grow select-auto">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeSection}
                  id={`panel-${activeSection}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${activeSection}`}
                  tabIndex={0}
                  className={`w-full h-full min-h-full flex flex-col focus:outline-none ${currentSection.padding} no-scrollbar scroll-smooth`}
                  initial={
                    theme === "soft-floating-bento"
                      ? { y: 28, opacity: 0, scale: 0.97, filter: "blur(8px)" }
                      : { y: 35, opacity: 0, scale: 1, filter: "blur(4px)" }
                  }
                  animate={{ 
                    y: 0, 
                    opacity: 1, 
                    scale: 1, 
                    filter: "blur(0px)" 
                  }}
                  exit={
                    theme === "soft-floating-bento"
                      ? { y: -20, opacity: 0, scale: 0.97, filter: "blur(6px)" }
                      : { y: -25, opacity: 0, scale: 1, filter: "blur(4px)" }
                  }
                  transition={
                    theme === "soft-floating-bento"
                      ? {
                          type: "spring",
                          damping: 22,
                          stiffness: 240,
                          mass: 0.8,
                          staggerChildren: 0.09,
                          delayChildren: 0.05
                        }
                      : {
                          duration: 0.4, 
                          ease: [0.16, 1, 0.3, 1],
                          staggerChildren: 0.08,
                          delayChildren: 0.04
                        }
                  }
                >
                  <Suspense fallback={null}>
                    <CurrentComponent />
                  </Suspense>
                </motion.div>
              </AnimatePresence>
            </main>
          </div>

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
          <ThemeModal
            isOpen={themeContext.isThemeModalOpen}
            onClose={themeContext.closeThemeModal}
          />
          <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            onNavigate={navigateToSection}
          />
          <ImageStudioModal
            isOpen={isImageStudioOpen}
            onClose={() => setIsImageStudioOpen(false)}
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
    <ErrorBoundaryHandler>
      <ThemeProvider>
        <NotificationProvider>
          <BackgroundProvider>
            <LayoutProvider>
              <LanguageProvider>
                <CursorProvider>
                  <SoundProvider>
                    <FooterProvider>
                      <HeaderProvider>
                        <ErrorBoundaryHandler>
                          <MainContent />
                        </ErrorBoundaryHandler>
                      </HeaderProvider>
                    </FooterProvider>
                  </SoundProvider>
                </CursorProvider>
              </LanguageProvider>
            </LayoutProvider>
          </BackgroundProvider>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundaryHandler>
  );
}


