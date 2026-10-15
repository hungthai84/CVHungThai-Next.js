'use client';
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
import Letter from "./components/Letter";
import TabErrorsPage from "./components/TabErrorsPage";
import BentoGridLayout from "./components/BentoGridLayout";
import GlassStackedCardSlide from "./components/GlassStackedCardSlide";
import DashboardLayout from "./components/DashboardLayout";
import LandingPageLayout from "./components/LandingPageLayout";
import CardPageLayout from "./components/CardPageLayout";
import TopRightLayoutSwitcher from "./components/TopRightLayoutSwitcher";
import ErrorBoundaryHandler from "./components/ErrorBoundaryHandler";

import FooterSettingsModal from "./components/FooterSettingsModal";
import ExecutiveResumeExportModal from "./components/ExecutiveResumeExportModal";
import ThemeModal from "./components/ThemeModal";
import CommandPalette from "./components/CommandPalette";
import ImageStudioModal from "./components/ai/ImageStudioModal";
import VCardQrCodeModal from "./components/VCardQrCodeModal";
import QuickCalendarBooking from "./components/QuickCalendarBooking";
import BpoVideoVoiceHighlightsModal from "./components/BpoVideoVoiceHighlightsModal";
import AiSalaryCalculatorModal from "./components/AiSalaryCalculatorModal";
import VoiceCommandAssistantWidget from "./components/VoiceCommandAssistantWidget";
import BlockchainDigitalBadgesModal from "./components/BlockchainDigitalBadgesModal";
import Weather3DCardsShowcase from "./components/Weather3DCardsShowcase";

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
  Sliders, ShieldAlert, Tv, QrCode
} from "lucide-react";

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
  { id: "errors", labelKey: "nav.errors", Icon: ShieldAlert, Component: TabErrorsPage, padding: "p-0 overflow-y-auto" },
];

function MainContent() {
  const themeContext = useTheme();
  const { theme, setTheme, themeMode, resolvedTheme } = themeContext;
  const { lang } = useLanguage();
  const { isSwitching, layoutMode } = useLayout();
  const { footerConfig, isFooterHovered } = useFooter();
  const { isHeaderSlidUp } = useHeader();
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

  // States for Feature Modals & Widgets
  const [isResumeExportOpen, setIsResumeExportOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isImageStudioOpen, setIsImageStudioOpen] = useState(false);
  const [isVCardQrOpen, setIsVCardQrOpen] = useState(false);
  const [isCalendarBookingOpen, setIsCalendarBookingOpen] = useState(false);
  const [isBpoVideoOpen, setIsBpoVideoOpen] = useState(false);
  const [isSalaryCalcOpen, setIsSalaryCalcOpen] = useState(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);
  const [is3DWeatherModalOpen, setIs3DWeatherModalOpen] = useState(false);

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

  // Apply default color theme per layout mode
  useEffect(() => {
    setTheme("glass-light-multicolor");
  }, [layoutMode]);

  // Header and Footer visibility based on layout rules
  const firstSectionId = SECTIONS[0]?.id || "home";
  const lastSectionId = SECTIONS[SECTIONS.length - 1]?.id || "errors";

  const isHeaderVisible = 
    layoutMode === "card-page" || 
    (layoutMode === "slide-stack" && activeSection === firstSectionId);

  const isFooterVisible = 
    layoutMode === "card-page" || 
    (layoutMode === "slide-stack" && activeSection === lastSectionId);

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

  // Scrollspy navigation feature using IntersectionObserver
  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) return;

    const observerOptions = {
      root: cardContainerRef.current || null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0.15,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          let mappedId = id.replace(/^landing-/, "").replace(/^section-/, "");
          if (SECTIONS.some((s) => s.id === mappedId)) {
            setActiveSection(mappedId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id) || document.getElementById(`landing-${section.id}`) || document.getElementById(`section-${section.id}`);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [layoutMode]);

  // Trigger scroll reminder after 10s of no action
  useEffect(() => {
    setShowScrollReminder(false);
    let hideTimer: NodeJS.Timeout;
    const showTimer = setTimeout(() => {
      setShowScrollReminder(true);
      hideTimer = setTimeout(() => {
        setShowScrollReminder(false);
      }, 5000);
    }, 10000);

    return () => {
      clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [activeSection]);

  // Synchronize theme classes on root
  useEffect(() => {
    const root = document.documentElement;

    Array.from(root.classList).forEach((cls) => {
      if (cls === "dark" || cls.startsWith("theme-")) {
        root.classList.remove(cls);
      }
    });

    root.setAttribute("data-theme", theme);
    root.dataset.theme = theme;
    root.setAttribute("data-theme-mode", themeMode);

    const isDark = resolvedTheme === "dark" || theme === "dark";
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    if (theme.startsWith("theme-")) {
      root.classList.add(theme);
    }
  }, [theme, themeMode, resolvedTheme]);

  const navigateToSection = (id: string) => {
    if (id === activeSection) return;
    playTransition();
    setActiveSection(id);

    if (layoutMode === "card-page") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
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
    const handleOpenVCardQr = () => setIsVCardQrOpen(true);
    const handleOpenCalendarBooking = () => setIsCalendarBookingOpen(true);
    const handleOpenBpoVideo = () => setIsBpoVideoOpen(true);
    const handleOpenSalaryCalc = () => setIsSalaryCalcOpen(true);
    const handleOpenBadges = () => setIsBadgesOpen(true);
    const handleOpen3DWeather = () => setIs3DWeatherModalOpen(true);

    window.addEventListener("app-navigate", handleAppNavigate);
    window.addEventListener("open-resume-export", handleOpenResumeExport);
    window.addEventListener("open-command-palette", handleOpenCommandPalette);
    window.addEventListener("open-image-studio", handleOpenImageStudio);
    window.addEventListener("open-vcard-qr", handleOpenVCardQr);
    window.addEventListener("open-calendar-booking", handleOpenCalendarBooking);
    window.addEventListener("open-bpo-video", handleOpenBpoVideo);
    window.addEventListener("open-salary-calc", handleOpenSalaryCalc);
    window.addEventListener("open-digital-badges", handleOpenBadges);
    window.addEventListener("open-3d-weather-modal", handleOpen3DWeather);

    return () => {
      window.removeEventListener("app-navigate", handleAppNavigate);
      window.removeEventListener("open-resume-export", handleOpenResumeExport);
      window.removeEventListener("open-command-palette", handleOpenCommandPalette);
      window.removeEventListener("open-image-studio", handleOpenImageStudio);
      window.removeEventListener("open-vcard-qr", handleOpenVCardQr);
      window.removeEventListener("open-calendar-booking", handleOpenCalendarBooking);
      window.removeEventListener("open-bpo-video", handleOpenBpoVideo);
      window.removeEventListener("open-salary-calc", handleOpenSalaryCalc);
      window.removeEventListener("open-digital-badges", handleOpenBadges);
      window.removeEventListener("open-3d-weather-modal", handleOpen3DWeather);
    };
  }, []);

  return (
    <SectionProvider activeSection={activeSection} setActiveSection={navigateToSection} sections={SECTIONS}>
      <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 text-slate-100 font-play">
        {/* Animated Dynamic Background */}
        <BackgroundRenderer />

        {/* Right-Edge Vertically Centered Controls Dock - Clings flush against the right edge */}
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[95] flex flex-col items-end gap-2.5 pointer-events-auto select-none">
          {/* 1. Nút Bố Cục (Layout Switcher Button - Clings flush right) */}
          <TopRightLayoutSwitcher />

          {/* 2. Nút Ra lệnh Trợ lý AI (Voice Command Assistant Button) */}
          <VoiceCommandAssistantWidget 
            onNavigateTab={navigateToSection}
            onOpenSalaryCalc={() => setIsSalaryCalcOpen(true)}
            onOpenVideoHighlights={() => setIsBpoVideoOpen(true)}
            onOpenBadges={() => setIsBadgesOpen(true)}
          />
        </div>

        {/* Header */}
        {isHeaderVisible && <Header activeSection={activeSection} onNavigate={navigateToSection} />}

        {/* Dynamic Multi-Layout Rendering Core */}
        <main className="relative w-full h-full overflow-hidden">
          {layoutMode === "card-page" && (
            <CardPageLayout 
              activeSection={activeSection} 
              onNavigate={navigateToSection} 
            />
          )}

          {layoutMode === "landing" && (
            <LandingPageLayout 
              activeSection={activeSection} 
              onNavigate={navigateToSection} 
            />
          )}

          {layoutMode === "dashboard" && (
            <DashboardLayout 
              activeSection={activeSection} 
              onNavigate={navigateToSection} 
            />
          )}

          {layoutMode === "bento-pinterest" && (
            <BentoGridLayout 
              activeSection={activeSection} 
              onNavigate={navigateToSection} 
            />
          )}

          {layoutMode === "slide-stack" && (
            <GlassStackedCardSlide 
              activeSection={activeSection} 
              onNavigate={navigateToSection} 
            />
          )}
        </main>

        {/* Footer */}
        {isFooterVisible && (
          <Footer 
            activeSection={activeSection} 
            onNavigate={navigateToSection} 
            showScrollReminder={showScrollReminder}
            onScrollReminderClick={handleScrollReminderClick}
          />
        )}

        {/* Modals & Dialogs */}
        <Suspense fallback={null}>
          <ExecutiveResumeExportModal
            isOpen={isResumeExportOpen}
            onClose={() => setIsResumeExportOpen(false)}
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
          <VCardQrCodeModal
            isOpen={isVCardQrOpen}
            onClose={() => setIsVCardQrOpen(false)}
          />
          <QuickCalendarBooking
            isOpen={isCalendarBookingOpen}
            onClose={() => setIsCalendarBookingOpen(false)}
          />
          <BpoVideoVoiceHighlightsModal
            isOpen={isBpoVideoOpen}
            onClose={() => setIsBpoVideoOpen(false)}
          />
          <AiSalaryCalculatorModal
            isOpen={isSalaryCalcOpen}
            onClose={() => setIsSalaryCalcOpen(false)}
          />
          <BlockchainDigitalBadgesModal
            isOpen={isBadgesOpen}
            onClose={() => setIsBadgesOpen(false)}
          />

          {/* 3D Weather Glass Cards Modal */}
          <AnimatePresence>
            {is3DWeatherModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl overflow-y-auto"
                onClick={() => setIs3DWeatherModalOpen(false)}
              >
                <div onClick={(e) => e.stopPropagation()} className="w-full my-auto">
                  <Weather3DCardsShowcase isModal onClose={() => setIs3DWeatherModalOpen(false)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Suspense>


        {/* Keyboard Shortcut Toast */}
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



        {/* Custom Cursor */}
        <CustomCursor />

        {/* Theme Transition Overlay */}
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
                    <HeaderProvider>
                      <MainContent />
                    </HeaderProvider>
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
