import React, { useState, useEffect } from "react";
import { ArrowLeft, Maximize2, X, Info, Quote } from "lucide-react";
import { CaseStudy1_1_Header } from "./CaseStudy1_1_Header";
import { CaseStudy1_1_Mindmap } from "./CaseStudy1_1_Mindmap";
import { CaseStudy1_1_Sections } from "./CaseStudy1_1_Sections";
import { CaseStudy1_2_Mindmap } from "./CaseStudy1_2_Mindmap";
import { CaseStudy1_2_Sections } from "./CaseStudy1_2_Sections";
import { CaseStudy1_3_Mindmap } from "./CaseStudy1_3_Mindmap";
import { CaseStudy1_3_Sections } from "./CaseStudy1_3_Sections";
import { CaseStudy1_4_Mindmap } from "./CaseStudy1_4_Mindmap";
import { CaseStudy1_4_Sections } from "./CaseStudy1_4_Sections";
import { CaseStudy1_5_Mindmap } from "./CaseStudy1_5_Mindmap";
import { CaseStudy1_5_Sections } from "./CaseStudy1_5_Sections";
import { CaseStudy2_1_Mindmap } from "./CaseStudy2_1_Mindmap";
import { CaseStudy2_1_Sections } from "./CaseStudy2_1_Sections";
import { CaseStudy2_2_Mindmap } from "./CaseStudy2_2_Mindmap";
import { CaseStudy2_2_Sections } from "./CaseStudy2_2_Sections";
import { CaseStudy2_3_Mindmap } from "./CaseStudy2_3_Mindmap";
import { CaseStudy2_3_Sections } from "./CaseStudy2_3_Sections";
import { CaseStudy2_4_Mindmap } from "./CaseStudy2_4_Mindmap";
import { CaseStudy2_4_Sections } from "./CaseStudy2_4_Sections";
import { CaseStudy3_1_Mindmap } from "./CaseStudy3_1_Mindmap";
import { CaseStudy3_1_Sections } from "./CaseStudy3_1_Sections";
import { CaseStudy3_2_Mindmap } from "./CaseStudy3_2_Mindmap";
import { CaseStudy3_2_Sections } from "./CaseStudy3_2_Sections";
import { CaseStudy3_3_Mindmap } from "./CaseStudy3_3_Mindmap";
import { CaseStudy3_3_Sections } from "./CaseStudy3_3_Sections";
import { CaseStudy3_4_Mindmap } from "./CaseStudy3_4_Mindmap";
import { CaseStudy3_4_Sections } from "./CaseStudy3_4_Sections";
import { CaseStudy4_1_Mindmap } from "./CaseStudy4_1_Mindmap";
import { CaseStudy4_1_Sections } from "./CaseStudy4_1_Sections";
import { CaseStudy4_2_Mindmap } from "./CaseStudy4_2_Mindmap";
import { CaseStudy4_2_Sections } from "./CaseStudy4_2_Sections";
import { CaseStudy5_1_Mindmap } from "./CaseStudy5_1_Mindmap";
import { CaseStudy5_1_Sections } from "./CaseStudy5_1_Sections";
import { CaseStudy6_1_Mindmap } from "./CaseStudy6_1_Mindmap";
import { CaseStudy6_1_Sections } from "./CaseStudy6_1_Sections";
import { CaseStudy1_1_Modal } from "./CaseStudy1_1_Modal";
import { cn } from "../../lib/utils";
import { ProjectCard } from "../../data/projectsData";
import { playUiSound } from "../../lib/sound";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function CaseStudy1_1({ project, onBack, onZoomImage }: { project: ProjectCard, onBack: () => void, onZoomImage: (img: string) => void }) {
  const [viewMode, setViewMode] = useState<"all" | "mindmap">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Dynamic setup to prepare sections for GSAP Accordion ScrollTrigger
    const container = document.getElementById("article-section");
    if (!container) return;

    // Sentence case transformation helper
    const toSentenceCase = (str: string) => {
      if (!str) return str;
      const trimmed = str.trim();
      if (!trimmed) return trimmed;
      const lower = trimmed.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    // Capitalize H2 and H3 section headings to Sentence Case
    const headings = container.querySelectorAll("h2, h3");
    headings.forEach((h) => {
      // If heading contains spans, capitalize text spans
      const spans = h.querySelectorAll("span");
      if (spans.length > 0) {
        spans.forEach((span) => {
          const txt = span.textContent || "";
          if (txt.trim().length > 3 && /[a-zA-ZÀ-Ỹà-ỹ]/.test(txt)) {
            span.textContent = toSentenceCase(txt);
          }
        });
      } else {
        // If it's a plain text heading
        const txt = h.textContent || "";
        if (txt.trim().length > 3 && /[a-zA-ZÀ-Ỹà-ỹ]/.test(txt)) {
          h.textContent = toSentenceCase(txt);
        }
      }
    });

    const cardThemes = [
      {
        bg: "bg-white/80 dark:bg-slate-900/80",
        border: "border-sky-100 dark:border-sky-900/50",
      },
      {
        bg: "bg-indigo-50/40 dark:bg-indigo-950/20",
        border: "border-indigo-100 dark:border-indigo-900/40",
      },
      {
        bg: "bg-rose-50/40 dark:bg-rose-950/20",
        border: "border-rose-100 dark:border-rose-900/40",
      },
      {
        bg: "bg-purple-50/40 dark:bg-purple-950/20",
        border: "border-purple-100 dark:border-purple-900/40",
      },
      {
        bg: "bg-cyan-50/40 dark:bg-cyan-950/20",
        border: "border-cyan-100 dark:border-cyan-900/40",
      },
      {
        bg: "bg-blue-50/40 dark:bg-blue-950/20",
        border: "border-blue-100 dark:border-blue-900/40",
      },
      {
        bg: "bg-violet-50/40 dark:bg-violet-950/20",
        border: "border-violet-100 dark:border-violet-900/40",
      },
      {
        bg: "bg-amber-50/40 dark:bg-amber-950/20",
        border: "border-amber-100 dark:border-amber-900/40",
      },
      {
        bg: "bg-emerald-50/40 dark:bg-emerald-950/20",
        border: "border-emerald-100 dark:border-emerald-900/40",
      },
      {
        bg: "bg-teal-50/40 dark:bg-teal-950/20",
        border: "border-teal-100 dark:border-teal-900/40",
      },
    ];

    container.classList.add("accordions");
    const sections = container.querySelectorAll("section");
    sections.forEach((sec, idx) => {
      sec.classList.add("accordion");

      // Set different background & border colors for each card
      const theme = cardThemes[idx % cardThemes.length];
      
      // Clean old backgrounds and borders to avoid duplicate utility styles
      const classesToRemove: string[] = [];
      sec.classList.forEach((cls) => {
        if (cls.startsWith("bg-") || cls.startsWith("border-") || cls === "border") {
          classesToRemove.push(cls);
        }
      });
      classesToRemove.forEach((cls) => sec.classList.remove(cls));

      // Inject the beautiful specific background and border classes
      theme.bg.split(" ").forEach(c => sec.classList.add(c));
      theme.border.split(" ").forEach(c => sec.classList.add(c));
      sec.classList.add("border");
      
      // Wrap everything except the header/first child inside a text container
      if (!sec.querySelector(".accordion-text")) {
        const header = sec.firstElementChild;
        if (header) {
          const wrapper = document.createElement("div");
          wrapper.className = "accordion-text text space-y-6 overflow-hidden transition-all duration-300";
          // Move all elements after header into the wrapper
          while (sec.children.length > 1) {
            if (sec.children[1]) {
              wrapper.appendChild(sec.children[1]);
            }
          }
          sec.appendChild(wrapper);
        }
      }
    });

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Responsive ScrollTrigger: Only animate stacked accordion on desktop (>= 1024px)
    // On mobile & tablet (< 1024px), keep all sections cleanly readable and non-collapsing
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#article-section",
          start: "top 12%",
          end: "bottom 30%",
          scrub: 1.5,
          pin: false,
          anticipatePin: 1,
        }
      });

      // Animate section collapsible content to height 0 on desktop scrub
      tl.to("#article-section .accordion-text", {
        height: 0,
        paddingBottom: 0,
        paddingTop: 0,
        marginTop: 0,
        opacity: 0,
        stagger: 0.5,
      });

      // Overlap cards smoothly to create stack effect
      tl.to("#article-section .accordion", {
        marginBottom: -45,
        scale: 0.96,
        stagger: 0.5,
      }, "<");
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [viewMode, project.id]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const jumpToSection = (id: string) => {
    if (viewMode === "mindmap") {
      setViewMode("all");
    }
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="relative font-sans animate-fadeIn min-h-screen text-slate-800 dark:text-slate-100 w-full overflow-x-hidden bg-transparent border-0 shadow-none">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-base {
            backdrop-filter: blur(20px) saturate(190%);
            -webkit-backdrop-filter: blur(20px) saturate(190%);
            border: 1px solid rgba(255, 255, 255, 0.85);
            box-shadow: 0 16px 40px rgba(31, 38, 135, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.9);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .dark .glass-base {
            background: rgba(10, 15, 30, 0.82);
            backdrop-filter: blur(24px) saturate(180%);
            -webkit-backdrop-filter: blur(24px) saturate(180%);
            border: 1px solid rgba(0, 240, 255, 0.35);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.75), 0 0 25px rgba(0, 240, 255, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.18);
        }
        .glass-base:hover {
            transform: translateY(-2px);
            box-shadow: 0 22px 50px rgba(31, 38, 135, 0.12), inset 0 1px 2px rgba(255, 255, 255, 1);
        }
        .dark .glass-base:hover {
            border-color: rgba(0, 240, 255, 0.6);
            box-shadow: 0 22px 50px rgba(0, 0, 0, 0.85), 0 0 35px rgba(0, 240, 255, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.25);
        }

        .glass-nav {
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(24px) saturate(200%);
            -webkit-backdrop-filter: blur(24px) saturate(200%);
            border-bottom: 1px solid rgba(255, 255, 255, 0.9);
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05);
        }
        .dark .glass-nav {
            background: rgba(10, 15, 30, 0.85);
            backdrop-filter: blur(24px) saturate(180%);
            -webkit-backdrop-filter: blur(24px) saturate(180%);
            border-bottom: 1px solid rgba(0, 240, 255, 0.3);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 240, 255, 0.15);
        }

        .glass-pill {
            background: rgba(255, 255, 255, 0.65);
            backdrop-filter: blur(14px) saturate(180%);
            -webkit-backdrop-filter: blur(14px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.85);
            box-shadow: 0 4px 12px rgba(31, 38, 135, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.8);
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .dark .glass-pill {
            background: rgba(15, 23, 42, 0.75);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(0, 240, 255, 0.25);
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.15);
        }
        .glass-pill:hover, .glass-pill.active {
            background: rgba(255, 255, 255, 0.95);
            transform: translateY(-1.5px);
            box-shadow: 0 8px 20px rgba(99, 102, 241, 0.18), inset 0 1px 2px rgba(255, 255, 255, 1);
        }
        .dark .glass-pill:hover, .dark .glass-pill.active {
            background: rgba(30, 41, 59, 0.9);
            border-color: rgba(0, 240, 255, 0.6);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 240, 255, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }

        .glass-inner {
            background: rgba(255, 255, 255, 0.72);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.9);
            box-shadow: 0 6px 18px rgba(31, 38, 135, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.8);
        }
        .dark .glass-inner {
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.12);
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }

        .shadow-glow-sky { box-shadow: 0 0 35px -5px rgba(2, 132, 199, 0.35); }
        .shadow-glow-indigo { box-shadow: 0 0 35px -5px rgba(99, 102, 241, 0.35); }
        .shadow-glow-rose { box-shadow: 0 0 35px -5px rgba(244, 63, 94, 0.35); }
        .shadow-glow-purple { box-shadow: 0 0 35px -5px rgba(168, 85, 247, 0.35); }
        .shadow-glow-cyan { box-shadow: 0 0 35px -5px rgba(6, 182, 212, 0.35); }
        .shadow-glow-emerald { box-shadow: 0 0 35px -5px rgba(16, 185, 129, 0.35); }
        .shadow-glow-amber { box-shadow: 0 0 35px -5px rgba(245, 158, 11, 0.35); }
        .shadow-glow-teal { box-shadow: 0 0 35px -5px rgba(20, 184, 166, 0.35); }

        .mindmap-connector {
            stroke-dasharray: 8;
            animation: dash 20s linear infinite;
        }
        @keyframes dash {
            to { stroke-dashoffset: -1000; }
        }
        
        @keyframes float-slow {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(25px, -30px) scale(1.08); }
        }
        @keyframes float-reverse {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(-30px, 20px) scale(0.95); }
        }
        .animate-float-1 { animation: float-slow 14s ease-in-out infinite; }
        .animate-float-2 { animation: float-reverse 18s ease-in-out infinite; }

        .custom-scrollbar::-webkit-scrollbar,
        ::-webkit-scrollbar {
            width: 7px;
            height: 7px;
        }
        .custom-scrollbar::-webkit-scrollbar-track,
        ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb,
        ::-webkit-scrollbar-thumb {
            background: rgba(99, 102, 241, 0.4);
            border-radius: 999px;
            backdrop-filter: blur(8px);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover,
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(99, 102, 241, 0.7);
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

      `}} />

      {/* Floating orbs */}
      <div className="fixed -top-40 -left-40 w-[480px] h-[480px] bg-gradient-to-br from-sky-400/35 via-blue-500/25 to-transparent rounded-full blur-3xl pointer-events-none z-0 animate-float-1"></div>
      <div className="fixed top-1/4 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-transparent rounded-full blur-3xl pointer-events-none z-0 animate-float-2"></div>
      <div className="fixed top-2/3 -left-32 w-[450px] h-[450px] bg-gradient-to-br from-emerald-400/25 via-teal-500/20 to-transparent rounded-full blur-3xl pointer-events-none z-0 animate-float-1"></div>
      <div className="fixed -bottom-40 right-1/4 w-[480px] h-[480px] bg-gradient-to-br from-amber-400/25 via-orange-500/20 to-transparent rounded-full blur-3xl pointer-events-none z-0 animate-float-2"></div>

      {/* Main Card Wrapper removed, contents brought directly outside */}
        <CaseStudy1_1_Header onShowToast={showToast} project={project} onBack={onBack} />
        
        {viewMode === "mindmap" && (
          <>
            {(project.phaseCode === "1.2" || project.id === "p1_2" || project.id === "1.2") ? (
              <CaseStudy1_2_Mindmap jumpToSection={jumpToSection} project={project} />
            ) : (project.phaseCode === "1.3" || project.id === "p1_3" || project.id === "1.3") ? (
              <CaseStudy1_3_Mindmap jumpToSection={jumpToSection} project={project} />
            ) : (project.phaseCode === "1.4" || project.id === "p1_4" || project.id === "1.4") ? (
              <CaseStudy1_4_Mindmap jumpToSection={jumpToSection} project={project} />
            ) : (project.phaseCode === "1.5" || project.id === "p1_5" || project.id === "1.5") ? (
              <CaseStudy1_5_Mindmap jumpToSection={jumpToSection} project={project} />
            ) : (project.phaseCode === "2.1" || project.id === "p2_1" || project.id === "2.1") ? (
              <CaseStudy2_1_Mindmap jumpToSection={jumpToSection} project={project} />
            ) : (project.phaseCode === "2.2" || project.id === "p2_2" || project.id === "2.2") ? (
              <CaseStudy2_2_Mindmap jumpToSection={jumpToSection} project={project} />
            ) : (project.phaseCode === "2.3" || project.id === "p2_3" || project.id === "2.3") ? (
              <CaseStudy2_3_Mindmap jumpToSection={jumpToSection} project={project} />
            ) : (project.phaseCode === "2.4" || project.id === "p2_4" || project.id === "2.4") ? (
              <CaseStudy2_4_Mindmap jumpToSection={jumpToSection} project={project} />
            ) : (project.phaseCode === "3.1" || project.id === "p3_1" || project.id === "3.1") ? (
              <CaseStudy3_1_Mindmap jumpToSection={jumpToSection} project={project} />
            ) : (project.phaseCode === "3.2" || project.id === "p3_2" || project.id === "3.2") ? (
              <CaseStudy3_2_Mindmap jumpToSection={jumpToSection} project={project} />
            ) : (project.phaseCode === "3.3" || project.id === "p3_3" || project.id === "3.3") ? (
              <CaseStudy3_3_Mindmap jumpToSection={jumpToSection} project={project} />
            ) : (project.phaseCode === "3.4" || project.id === "p3_4" || project.id === "3.4") ? (
              <CaseStudy3_4_Mindmap jumpToSection={jumpToSection} project={project} />
            ) : (project.phaseCode === "4.1" || project.id === "p4_1" || project.id === "4.1") ? (
              <CaseStudy4_1_Mindmap jumpToSection={jumpToSection} project={project} />
            ) : (project.phaseCode === "4.2" || project.id === "p4_2" || project.id === "4.2") ? (
              <CaseStudy4_2_Mindmap jumpToSection={jumpToSection} project={project} />
            ) : (project.phaseCode === "5.1" || project.id === "p5_1" || project.id === "5.1") ? (
              <CaseStudy5_1_Mindmap jumpToSection={jumpToSection} project={project} />
            ) : (project.phaseCode === "6.1" || project.id === "p6_1" || project.id === "6.1") ? (
              <CaseStudy6_1_Mindmap jumpToSection={jumpToSection} project={project} />
            ) : (
              <CaseStudy1_1_Mindmap jumpToSection={jumpToSection} project={project} />
            )}
          </>
        )}
        
        {viewMode === "all" && (
          <>
            {(project.phaseCode === "1.2" || project.id === "p1_2" || project.id === "1.2") ? (
              <>
                <CaseStudy1_2_Mindmap jumpToSection={jumpToSection} project={project} />
                <CaseStudy1_2_Sections project={project} />
              </>
            ) : (project.phaseCode === "1.3" || project.id === "p1_3" || project.id === "1.3") ? (
              <>
                <CaseStudy1_3_Mindmap jumpToSection={jumpToSection} project={project} />
                <CaseStudy1_3_Sections project={project} />
              </>
            ) : (project.phaseCode === "1.4" || project.id === "p1_4" || project.id === "1.4") ? (
              <>
                <CaseStudy1_4_Mindmap jumpToSection={jumpToSection} project={project} />
                <CaseStudy1_4_Sections project={project} />
              </>
            ) : (project.phaseCode === "1.5" || project.id === "p1_5" || project.id === "1.5") ? (
              <>
                <CaseStudy1_5_Mindmap jumpToSection={jumpToSection} project={project} />
                <CaseStudy1_5_Sections project={project} />
              </>
            ) : (project.phaseCode === "2.1" || project.id === "p2_1" || project.id === "2.1") ? (
              <>
                <CaseStudy2_1_Mindmap jumpToSection={jumpToSection} project={project} />
                <CaseStudy2_1_Sections project={project} />
              </>
            ) : (project.phaseCode === "2.2" || project.id === "p2_2" || project.id === "2.2") ? (
              <>
                <CaseStudy2_2_Mindmap jumpToSection={jumpToSection} project={project} />
                <CaseStudy2_2_Sections project={project} />
              </>
            ) : (project.phaseCode === "2.3" || project.id === "p2_3" || project.id === "2.3") ? (
              <>
                <CaseStudy2_3_Mindmap jumpToSection={jumpToSection} project={project} />
                <CaseStudy2_3_Sections project={project} />
              </>
            ) : (project.phaseCode === "2.4" || project.id === "p2_4" || project.id === "2.4") ? (
              <>
                <CaseStudy2_4_Mindmap jumpToSection={jumpToSection} project={project} />
                <CaseStudy2_4_Sections project={project} />
              </>
            ) : (project.phaseCode === "3.1" || project.id === "p3_1" || project.id === "3.1") ? (
              <>
                <CaseStudy3_1_Mindmap jumpToSection={jumpToSection} project={project} />
                <CaseStudy3_1_Sections project={project} />
              </>
            ) : (project.phaseCode === "3.2" || project.id === "p3_2" || project.id === "3.2") ? (
              <>
                <CaseStudy3_2_Mindmap jumpToSection={jumpToSection} project={project} />
                <CaseStudy3_2_Sections project={project} />
              </>
            ) : (project.phaseCode === "3.3" || project.id === "p3_3" || project.id === "3.3") ? (
              <>
                <CaseStudy3_3_Mindmap jumpToSection={jumpToSection} project={project} />
                <CaseStudy3_3_Sections project={project} />
              </>
            ) : (project.phaseCode === "3.4" || project.id === "p3_4" || project.id === "3.4") ? (
              <>
                <CaseStudy3_4_Mindmap jumpToSection={jumpToSection} project={project} />
                <CaseStudy3_4_Sections project={project} />
              </>
            ) : (project.phaseCode === "4.1" || project.id === "p4_1" || project.id === "4.1") ? (
              <>
                <CaseStudy4_1_Mindmap jumpToSection={jumpToSection} project={project} />
                <CaseStudy4_1_Sections project={project} />
              </>
            ) : (project.phaseCode === "4.2" || project.id === "p4_2" || project.id === "4.2") ? (
              <>
                <CaseStudy4_2_Mindmap jumpToSection={jumpToSection} project={project} />
                <CaseStudy4_2_Sections project={project} />
              </>
            ) : (project.phaseCode === "5.1" || project.id === "p5_1" || project.id === "5.1") ? (
              <>
                <CaseStudy5_1_Mindmap jumpToSection={jumpToSection} project={project} />
                <CaseStudy5_1_Sections project={project} />
              </>
            ) : (project.phaseCode === "6.1" || project.id === "p6_1" || project.id === "6.1") ? (
              <>
                <CaseStudy6_1_Mindmap jumpToSection={jumpToSection} project={project} />
                <CaseStudy6_1_Sections project={project} />
              </>
            ) : (
              <>
                <CaseStudy1_1_Mindmap jumpToSection={jumpToSection} project={project} />
                <CaseStudy1_1_Sections project={project} />
              </>
            )}

            {/* DYNAMIC CONCLUDING QUOTE FOR ALL OTHER PROJECTS */}
            {project.phaseCode !== "1.1" && (() => {
              const cq = getConcludingQuote(project.phaseCode);
              if (!cq) return null;
              return (
                <section id="sec-concluding-quote" className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white shadow-2xl shadow-indigo-500/25 border-2 border-indigo-400/50 relative overflow-hidden space-y-4 mt-4 md:mt-5 clear-both">
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex items-center gap-3 border-b border-indigo-500/40 pb-3">
                    <Quote className="w-8 h-8 text-amber-400 shrink-0 animate-pulse" />
                    <h3 className="text-base sm:text-lg font-bold tracking-wide text-amber-300">
                      Lời kết & triết lý vận hành
                    </h3>
                  </div>
                  <blockquote className="text-sm sm:text-base italic text-slate-200 font-serif leading-relaxed pl-2 border-l-2 border-amber-400">
                    "{cq.quote}"
                  </blockquote>
                  {cq.author && (
                    <div className="flex justify-end text-xs font-bold text-indigo-300 tracking-wider">
                      — {cq.author}
                    </div>
                  )}
                </section>
              );
            })()}
          </>
        )}

      {isModalOpen && <CaseStudy1_1_Modal onClose={() => setIsModalOpen(false)} />}
      
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none animate-in fade-in slide-in-from-bottom-4">
          <div className="glass-base bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 font-bold text-xs backdrop-blur-2xl border border-slate-200 dark:border-slate-800">
            <Info className="w-4 h-4 text-sky-500 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function getConcludingQuote(phaseCode: string) {
  switch (phaseCode) {
    case "1.2":
      return {
        quote: "Chỉ số không chỉ để đo lường, mà để định hướng. Ma trận KPI & OKR hiệu quả là khi mỗi nhân viên thấu hiểu nỗ lực của họ đóng góp trực tiếp thế nào vào sự thịnh vượng của doanh nghiệp.",
        author: ""
      };
    case "1.3":
      return {
        quote: "Trải nghiệm khách hàng không nằm ở những khẩu hiệu sáo rỗng, mà được khắc họa bằng sự thấu cảm chủ động trên từng bước chân của hành trình khách hàng.",
        author: "CHIEF EXPERIENCE OFFICER (CXO)"
      };
    case "1.4":
      return {
        quote: "Quản lý dự án CSKH xuất sắc là sự giao thoa hoàn hảo giữa tư duy Agile linh hoạt và sự kỷ luật trong thực thi quy trình cải tiến liên tục.",
        author: "CS PROJECT MANAGEMENT PROFESSIONAL (PMP)"
      };
    case "1.5":
      return {
        quote: "Ý kiến của khách hàng là món quà vô giá của sản phẩm. Một tổ chức nhạy bén luôn biết cách biến mỗi lời phàn nàn thành động lực cải tiến sản phẩm không ngừng.",
        author: "PRODUCT & CUSTOMER VOICE STRATEGIST"
      };
    case "1.6":
      return {
        quote: "Quản trị khủng hoảng và giữ chân khách hàng là phép thử tối cao cho năng lực của một tổ chức. Hãy biến mỗi sự cố thành cơ hội để chứng minh lòng trung thành bền vững.",
        author: "RETENTION & CRISIS MANAGEMENT LEAD"
      };
    case "2.1":
      return {
        quote: "Quy trình chuẩn hóa SOP chính là nền móng của sự nhất quán. Khi mọi tương tác được đóng gói bài bản, tổ chức mới có thể mở rộng quy mô mà không làm mất đi bản sắc dịch vụ.",
        author: "HEAD OF PROCESS & SERVICE STANDARDIZATION"
      };
    case "2.2":
      return {
        quote: "Hợp nhất đa kênh Omnichannel không chỉ là việc kết nối công nghệ, mà là cam kết mang lại một trải nghiệm không đứt gãy, nhất quán và cá nhân hóa cho mọi khách hàng.",
        author: "OMNICHANNEL ARCHITECT & STRATEGIST"
      };
    case "2.3":
      return {
        quote: "Tự động hóa không phải là thay thế con người, mà là giải phóng họ khỏi những tác vụ lặp lại để tập trung vào những tương tác cần sự thấu cảm và trí tuệ cao nhất.",
        author: "AUTOMATION & AI WORKFLOW SPECIALIST"
      };
    case "2.4":
      return {
        quote: "Dịch vụ khách hàng chủ động là nghệ thuật giải quyết vấn đề trước khi nó kịp phát sinh. Hãy tiếp cận khách hàng khi họ cần, chứ không chỉ khi họ hỏi.",
        author: "PROACTIVE CUSTOMER ENGAGEMENT DIRECTOR"
      };
    case "2.5":
      return {
        quote: "Hợp tác thuê ngoài (BPO) thành công khi đối tác thấu hiểu sâu sắc và chia sẻ chung một cam kết chất lượng như chính tổ chức của bạn.",
        author: "BPO QUALITY & OPERATIONS LEAD"
      };
    case "3.1":
      return {
        quote: "Dữ liệu khách hàng là tài sản quý giá nhất của kỷ nguyên số. Sở hữu một hệ thống CRM thông suốt là chìa khóa mở ra cánh cửa thấu hiểu và cá nhân hóa sâu sắc.",
        author: "CUSTOMER DATA PLATFORM (CDP) LEAD"
      };
    case "3.2":
      return {
        quote: "Phân tích dữ liệu không chỉ là nhìn lại quá khứ qua những con số khô khan, mà là dự báo tương lai và kiến tạo các hành động mang lại giá trị gia tăng vượt trội.",
        author: "CHIEF CUSTOMER INSIGHTS & ANALYTICS"
      };
    case "3.3":
      return {
        quote: "Khảo sát không chỉ để lấy điểm số đẹp, mà là cầu nối chân thành để lắng nghe tiếng nói thực sự của khách hàng và biến nó thành năng lượng cải tiến hành động.",
        author: "VOICE OF THE CUSTOMER (VOC) SPECIALIST"
      };
    case "3.4":
      return {
        quote: "Trợ lý ảo xuất sắc là sự kết hợp nhịp nhàng giữa phản hồi nhanh chóng của AI và sự ấm áp, kịp thời của con người khi đối diện với các tình huống phức tạp.",
        author: "CONVERSATIONAL AI & CHATBOT STRATEGIST"
      };
    case "4.1":
      return {
        quote: "Đào tạo số hóa là chìa khóa của sự chuyển mình bền vững. Một hệ thống E-learning xuất sắc giúp lan tỏa tri thức vượt qua mọi rào cản địa lý và thời gian.",
        author: "LEARNING & DEVELOPMENT (L&D) DIGITAL LEAD"
      };
    case "4.2":
      return {
        quote: "Khung năng lực rõ ràng là bệ phóng cho nhân tài. Khi nhân sự nhìn thấy lộ trình phát triển rõ ràng, họ sẽ cống hiến hết mình với lòng trung thành bền chặt nhất.",
        author: "TALENT DEVELOPMENT & COMPETENCY ARCHITECT"
      };
    case "5.1":
      return {
        quote: "Một Helpcenter tối ưu không chỉ giải quyết yêu cầu, mà là nơi trao quyền cho khách hàng tự phục vụ một cách dễ dàng và nhanh chóng nhất.",
        author: "HELP CENTER OPERATIONS DIRECTOR"
      };
    case "6.1":
      return {
        quote: "Kiểm soát chất lượng theo chuẩn COPC là cam kết tối cao về sự hoàn hảo. Hãy quản trị từng cuộc gọi với tinh thần không thỏa hiệp để giữ vững uy tín thương hiệu.",
        author: "SERVICE QUALITY ASSURANCE (QA) LEAD & COPC AUDITOR"
      };
    case "6.2":
      return {
        quote: "Quản trị biến động thành công đòi hỏi một văn hóa thích ứng nhanh nhạy, nơi sự chuẩn bị chu đáo và khả năng phản ứng linh hoạt đi đôi với nhau.",
        author: "CHANGE MANAGEMENT & CRISIS LEADER"
      };
    case "6.3":
      return {
        quote: "Sự kết hợp giữa Generative AI và phân tích giọng nói (Speech-to-Text) giúp nâng tầm trải nghiệm lên một tầm cao mới, nơi mọi cuộc gọi đều là một kiệt tác dịch vụ.",
        author: "GENERATIVE AI & VOICE QA INNOVATOR"
      };
    default:
      return null;
  }
}
