import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
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
import Customization from "./Customization";
import { cn } from "../lib/utils";
import { Sparkles, ArrowRight, FileText, Download, Mail, User, Briefcase, Brain, Compass, GraduationCap, Video, Server, Images } from "lucide-react";

interface LandingPageLayoutProps {
  onNavigate?: (id: string) => void;
}

export default function LandingPageLayout({ onNavigate }: LandingPageLayoutProps) {
  const { lang } = useLanguage();
  const isVi = lang === "vi";
  const themeContext = useTheme();

  return (
    <div className="w-full min-h-screen flex flex-col bg-transparent overflow-y-auto no-scrollbar pb-24">
      {/* Landing Page Banner Header Intro */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-cyan-500/10 dark:from-cyan-950/40 dark:via-indigo-950/40 dark:to-blue-950/40 border border-white/40 dark:border-white/10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden"
        >
          {/* Ambient glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-bold mb-3 w-fit">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>{isVi ? "Bố cục Landing Page Chuyên nghiệp" : "Professional Landing Page Layout"}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              NGUYỄN HÙNG THÁI
            </h1>
            <p className="text-base sm:text-lg font-bold text-blue-600 dark:text-cyan-400 mb-3">
              {isVi ? "Trải nghiệm Dịch vụ Khách hàng & Quản lý Vận hành" : "Customer Service Experience & Operations Management"}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {isVi 
                ? "Hơn 22 năm kinh nghiệm lãnh đạo vận hành Contact Center, quản trị chất lượng toàn diện và chuyển đổi dịch vụ khách hàng đa kênh. Hồ sơ năng lực cuộn dọc xuyên suốt giúp nhà tuyển dụng nắm bắt toàn diện giá trị chuyên môn."
                : "Over 22 years of leadership in Contact Center operations, comprehensive quality management, and multi-channel customer service transformation."}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("section-experience") || document.getElementById("experience");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{isVi ? "Xem Kinh nghiệm" : "View Experience"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("section-contact") || document.getElementById("contact");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-5 py-2.5 rounded-xl bg-white/80 dark:bg-white/10 hover:bg-white text-slate-800 dark:text-white border border-slate-200/80 dark:border-white/20 font-bold text-xs backdrop-blur-md shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-500" />
                <span>{isVi ? "Liên hệ ngay" : "Contact Now"}</span>
              </button>
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-2 shrink-0 w-full md:w-auto">
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-xl flex flex-col gap-2 shadow-sm">
              <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isVi ? "Mục lục Nhanh" : "Quick Table of Contents"}
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200">
                <a href="#about" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-blue-500/10">
                  <User className="w-3 h-3 text-blue-500" />
                  <span>{isVi ? "Giới thiệu" : "About"}</span>
                </a>
                <a href="#skills" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-blue-500/10">
                  <Brain className="w-3 h-3 text-indigo-500" />
                  <span>{isVi ? "Kỹ năng" : "Skills"}</span>
                </a>
                <a href="#experience" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-blue-500/10">
                  <Briefcase className="w-3 h-3 text-rose-500" />
                  <span>{isVi ? "Kinh nghiệm" : "Experience"}</span>
                </a>
                <a href="#projects" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-blue-500/10">
                  <FileText className="w-3 h-3 text-teal-500" />
                  <span>{isVi ? "Dự án" : "Projects"}</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sequential Landing Sections */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 space-y-12">
        {/* 1. Hero Section */}
        <section id="landing-home" className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg bg-white/40 dark:bg-[#0c101d]/40 backdrop-blur-xl">
          <Hero />
        </section>

        {/* 2. Letter Section */}
        <section id="landing-letter" className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg bg-white/40 dark:bg-[#0c101d]/40 backdrop-blur-xl p-6 sm:p-10">
          <Letter />
        </section>

        {/* 3. About Section */}
        <section id="about" className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg bg-white/40 dark:bg-[#0c101d]/40 backdrop-blur-xl p-6 sm:p-10">
          <About />
        </section>

        {/* 4. Domains Section */}
        <section id="domains" className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg bg-white/40 dark:bg-[#0c101d]/40 backdrop-blur-xl p-6 sm:p-10">
          <Domains />
        </section>

        {/* 5. Skills Section */}
        <section id="skills" className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg bg-white/40 dark:bg-[#0c101d]/40 backdrop-blur-xl p-6 sm:p-10">
          <Skills />
        </section>

        {/* 6. Education Section */}
        <section id="education" className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg bg-white/40 dark:bg-[#0c101d]/40 backdrop-blur-xl p-6 sm:p-10">
          <Education />
        </section>

        {/* 7. Experience Section */}
        <section id="section-experience" className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg bg-white/40 dark:bg-[#0c101d]/40 backdrop-blur-xl p-6 sm:p-10">
          <Experience />
        </section>

        {/* 8. Projects Section */}
        <section id="projects" className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg bg-white/40 dark:bg-[#0c101d]/40 backdrop-blur-xl p-6 sm:p-10">
          <Projects />
        </section>

        {/* 9. Interview Section */}
        <section id="interview" className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg bg-white/40 dark:bg-[#0c101d]/40 backdrop-blur-xl p-6 sm:p-10">
          <Interview />
        </section>

        {/* 10. TuVi Section */}
        <section id="tuvi" className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg bg-white/40 dark:bg-[#0c101d]/40 backdrop-blur-xl p-6 sm:p-10">
          <TuVi />
        </section>

        {/* 11. Memories Section */}
        <section id="memories" className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg bg-white/40 dark:bg-[#0c101d]/40 backdrop-blur-xl p-6 sm:p-10">
          <Memories />
        </section>

        {/* 12. Systems Section */}
        <section id="systems" className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg bg-white/40 dark:bg-[#0c101d]/40 backdrop-blur-xl p-6 sm:p-10">
          <Systems />
        </section>

        {/* 13. Contact Section */}
        <section id="section-contact" className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg bg-white/40 dark:bg-[#0c101d]/40 backdrop-blur-xl p-6 sm:p-10">
          <Contact />
        </section>
      </div>
    </div>
  );
}
