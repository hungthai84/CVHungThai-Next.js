import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { useLayout } from "../context/LayoutContext";
import Hero from "./Hero";
import Letter from "./Letter";
import About from "./About";
import Domains from "./Domains";
import Skills from "./Skills";
import Education from "./Education";
import Experience from "./Experience";
import Projects from "./Projects";
import Interview from "./Interview";
import TuVi from "./TuVi";
import Memories from "./Memories";
import Systems from "./Systems";
import Contact from "./Contact";
import Wallpapers from "./Wallpapers";
import TabErrorsPage from "./TabErrorsPage";
import { cn, getUnifiedSurfaceStyle } from "../lib/utils";
import { 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Mail, 
  User, 
  Briefcase, 
  Brain, 
  Compass, 
  GraduationCap, 
  Video, 
  Server, 
  Images, 
  Bot, 
  Globe, 
  Printer, 
  LayoutGrid, 
  ArrowUp,
  Sliders
} from "lucide-react";
import { SECTIONS } from "../data/sections";

interface LandingPageLayoutProps {
  activeSection?: string;
  onNavigate?: (id: string) => void;
}

export const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({ activeSection, onNavigate }) => {
  const { lang, setLang } = useLanguage();
  const isVi = lang === "vi";
  const { theme, openThemeModal } = useTheme();
  const { setLayoutMode } = useLayout();

  const [activeSectionId, setActiveSectionId] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll for active section highlight and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sectionElements = SECTIONS.map((s) => ({
        id: s.id,
        el: document.getElementById(`landing-section-${s.id}`),
      })).filter((item) => item.el !== null);

      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= scrollPosition) {
          setActiveSectionId(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`landing-section-${id}`);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenAi = () => {
    window.dispatchEvent(new CustomEvent("open-ai-assistant"));
  };

  const handleOpenResumeExport = () => {
    window.dispatchEvent(new CustomEvent("open-resume-export"));
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-transparent pb-32 relative font-sans">
      
      {/* ========================================================================= */}
      {/* NAV GLASS LIQUID: Thanh điều hướng dạng kính lỏng Capsule Sticky           */}
      {/* ========================================================================= */}
      <nav 
        className="sticky top-3 z-50 w-[95%] max-w-[1280px] mx-auto transition-all duration-300"
      >
        <div 
          className={cn(
            "rounded-[999px] p-2 sm:px-4 sm:py-2.5 flex items-center justify-between gap-2 border backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.35),0_0_25px_rgba(0,229,255,0.18)] transition-all",
            "bg-white/70 dark:bg-[#070b18]/75 border-white/60 dark:border-white/18 text-slate-800 dark:text-white"
          )}
        >
          {/* Avatar & Logo Brand */}
          <div 
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2.5 cursor-pointer shrink-0 pl-1 group"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-brand-primary/80 shadow-md">
              <img 
                src="https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif"
                alt="Avatar"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white dark:border-slate-900" />
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-xs font-black font-play text-slate-900 dark:text-white block leading-tight">
                Nguyễn Hùng Thái
              </span>
              <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold block leading-tight">
                Landing Portfolio
              </span>
            </div>
          </div>

          {/* Liquid Glass Navigation Pills (Horizontal Scroll on Mobile) */}
          <div className="flex-1 min-w-0 flex items-center justify-start sm:justify-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-1">
            {SECTIONS.map((sec) => {
              const isActive = activeSectionId === sec.id;
              const Icon = sec.Icon;
              const label = isVi ? sec.labelVi : sec.labelEn;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className={cn(
                    "px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 shrink-0 cursor-pointer",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md scale-105"
                      : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-300 hover:bg-white/50 dark:hover:bg-white/10"
                  )}
                  title={label}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden md:inline">{label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0 pr-1">
            {/* AI Assistant */}
            <button
              type="button"
              onClick={handleOpenAi}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full bg-purple-500/15 hover:bg-purple-500/30 text-purple-700 dark:text-purple-300 border border-purple-400/30 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-xs"
              title="Trợ lý AI"
            >
              <Bot className="w-4 h-4 text-purple-600 dark:text-cyan-400 animate-pulse" />
              <span className="hidden lg:inline">{isVi ? "Trợ Lý AI" : "AI"}</span>
            </button>

            {/* In PDF */}
            <button
              type="button"
              onClick={handleOpenResumeExport}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full bg-rose-500/15 hover:bg-rose-500/30 text-rose-700 dark:text-rose-300 border border-rose-400/30 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-xs"
              title="Xuất PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden lg:inline">PDF</span>
            </button>

            {/* Về Bố Cục khác */}
            <button
              type="button"
              onClick={() => setLayoutMode("card-page")}
              className="p-1.5 rounded-full bg-white/60 dark:bg-white/10 hover:bg-white border border-white/30 text-slate-700 dark:text-white cursor-pointer transition-all"
              title={isVi ? "Về Bố Cục Card Page" : "Back to Card Page"}
            >
              <LayoutGrid className="w-4 h-4 text-cyan-500" />
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* SEQUENTIAL VERTICAL SECTIONS - Cuộn dọc tự nhiên khám phá năng lực          */}
      {/* ========================================================================= */}
      <div className="w-full max-w-[1320px] mx-auto px-3 sm:px-6 pt-6 space-y-16">
        
        {/* 1. Hero */}
        <section id="landing-section-home" className="relative rounded-[26px] overflow-hidden border border-white/40 dark:border-white/10 shadow-xl backdrop-blur-2xl">
          <Hero />
        </section>

        {/* 2. Letter */}
        <section id="landing-section-letter" className="relative rounded-[26px] overflow-hidden border border-white/40 dark:border-white/10 shadow-xl backdrop-blur-2xl p-4 sm:p-8">
          <div className="mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-600 dark:text-cyan-400 text-xs font-mono font-bold">
              02 · {isVi ? "Thư Ngỏ" : "Open Letter"}
            </span>
          </div>
          <Letter />
        </section>

        {/* 3. About */}
        <section id="landing-section-about" className="relative rounded-[26px] overflow-hidden border border-white/40 dark:border-white/10 shadow-xl backdrop-blur-2xl p-4 sm:p-8">
          <div className="mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold">
              03 · {isVi ? "Giới Thiệu" : "About"}
            </span>
          </div>
          <About />
        </section>

        {/* 4. Education */}
        <section id="landing-section-education" className="relative rounded-[26px] overflow-hidden border border-white/40 dark:border-white/10 shadow-xl backdrop-blur-2xl p-4 sm:p-8">
          <div className="mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-mono font-bold">
              04 · {isVi ? "Học Vấn & Chứng Chỉ" : "Education"}
            </span>
          </div>
          <Education />
        </section>

        {/* 5. Domains */}
        <section id="landing-section-domains" className="relative rounded-[26px] overflow-hidden border border-white/40 dark:border-white/10 shadow-xl backdrop-blur-2xl p-4 sm:p-8">
          <div className="mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
              05 · {isVi ? "Lĩnh Vực Chuyên Môn" : "Domains"}
            </span>
          </div>
          <Domains />
        </section>

        {/* 6. Skills */}
        <section id="landing-section-skills" className="relative rounded-[26px] overflow-hidden border border-white/40 dark:border-white/10 shadow-xl backdrop-blur-2xl p-4 sm:p-8">
          <div className="mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold">
              06 · {isVi ? "Khung Năng Lực & Kỹ Năng" : "Skills Matrix"}
            </span>
          </div>
          <Skills />
        </section>

        {/* 7. Experience */}
        <section id="landing-section-experience" className="relative rounded-[26px] overflow-hidden border border-white/40 dark:border-white/10 shadow-xl backdrop-blur-2xl p-4 sm:p-8">
          <div className="mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold">
              07 · {isVi ? "Kinh Nghiệm Thực Chiến 22+ Năm" : "Experience"}
            </span>
          </div>
          <Experience />
        </section>

        {/* 8. Projects */}
        <section id="landing-section-projects" className="relative rounded-[26px] overflow-hidden border border-white/40 dark:border-white/10 shadow-xl backdrop-blur-2xl p-4 sm:p-8">
          <div className="mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-mono font-bold">
              08 · {isVi ? "Dự Án Điển Hình & Case Studies" : "Key Projects"}
            </span>
          </div>
          <Projects />
        </section>

        {/* 9. Interview */}
        <section id="landing-section-interview" className="relative rounded-[26px] overflow-hidden border border-white/40 dark:border-white/10 shadow-xl backdrop-blur-2xl p-4 sm:p-8">
          <div className="mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-600 dark:text-pink-400 text-xs font-mono font-bold">
              09 · {isVi ? "Phỏng Vấn & Q&A Lãnh Đạo" : "Interview"}
            </span>
          </div>
          <Interview />
        </section>

        {/* 10. TuVi */}
        <section id="landing-section-tuvi" className="relative rounded-[26px] overflow-hidden border border-white/40 dark:border-white/10 shadow-xl backdrop-blur-2xl p-4 sm:p-8">
          <div className="mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold">
              10 · {isVi ? "Tử Vi & Triết Lý Nhân Tướng" : "TuVi & Philosophy"}
            </span>
          </div>
          <TuVi />
        </section>

        {/* 11. Memories */}
        <section id="landing-section-memories" className="relative rounded-[26px] overflow-hidden border border-white/40 dark:border-white/10 shadow-xl backdrop-blur-2xl p-4 sm:p-8">
          <div className="mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-400 text-xs font-mono font-bold">
              11 · {isVi ? "Kỷ Niệm Hành Trình" : "Memories"}
            </span>
          </div>
          <Memories />
        </section>

        {/* 12. Systems */}
        <section id="landing-section-systems" className="relative rounded-[26px] overflow-hidden border border-white/40 dark:border-white/10 shadow-xl backdrop-blur-2xl p-4 sm:p-8">
          <div className="mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-mono font-bold">
              12 · {isVi ? "Hệ Thống & Kiến Trúc Công Nghệ" : "Enterprise Systems"}
            </span>
          </div>
          <Systems />
        </section>

        {/* 13. Contact */}
        <section id="landing-section-contact" className="relative rounded-[26px] overflow-hidden border border-white/40 dark:border-white/10 shadow-xl backdrop-blur-2xl p-4 sm:p-8">
          <div className="mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-mono font-bold">
              13 · {isVi ? "Thông Tin Liên Hệ & Kết Nối" : "Contact & Connect"}
            </span>
          </div>
          <Contact />
        </section>

        {/* 14. Wallpapers */}
        <section id="landing-section-wallpapers" className="relative rounded-[26px] overflow-hidden border border-white/40 dark:border-white/10 shadow-xl backdrop-blur-2xl p-4 sm:p-8">
          <div className="mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-mono font-bold">
              14 · {isVi ? "Thư Viện Hình Nền & Đồ Họa" : "Wallpapers Gallery"}
            </span>
          </div>
          <Wallpapers />
        </section>


        {/* 16. Issues / Errors */}
        <section id="landing-section-errors" className="relative rounded-[26px] overflow-hidden border border-white/40 dark:border-white/10 shadow-xl backdrop-blur-2xl p-4 sm:p-8">
          <div className="mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-mono font-bold">
              16 · {isVi ? "Trạng Thái Hệ Thống & Sự Cố" : "System Status & Issues"}
            </span>
          </div>
          <TabErrorsPage />
        </section>

      </div>

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/40"
          title="Lên đầu trang"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
};

export default LandingPageLayout;
