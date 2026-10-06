import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, 
  Maximize2, 
  X, 
  Info, 
  Quote, 
  Layers, 
  Sparkles, 
  MousePointer2, 
  CheckCircle2, 
  Palette, 
  Sun, 
  Moon,
  ChevronDown
} from "lucide-react";
import { CaseStudy1_1_Header } from "./CaseStudy1_1_Header";
import { CaseStudy1_1_Mindmap } from "./CaseStudy1_1_Mindmap";
import { CaseStudy1_1_Sections } from "./CaseStudy1_1_Sections";
import { CaseStudy1_1_TOC } from "./CaseStudy1_1_TOC";
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
import { useTheme } from "../../context/ThemeContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 10 Distinct 33-Degree Gradients for Case Study 1.1 Cards
export const CARD_GRADIENTS_33DEG = [
  "linear-gradient(33deg, #5583EE, #41D8DD)", // Card 1 - Dark/Vibrant
  "linear-gradient(33deg, #F78FAD, #FDEB82)", // Card 2 - Pastel Light
  "linear-gradient(33deg, #41C7AF, #54E38E)", // Card 3 - Dark/Vibrant
  "linear-gradient(33deg, #A16BFE, #DEB0DF)", // Card 4 - Dark/Vibrant
  "linear-gradient(33deg, #D279EE, #F8C390)", // Card 5 - Pastel Light
  "linear-gradient(33deg, #6CACFF, #8DEBFF)", // Card 6 - Pastel Light
  "linear-gradient(33deg, #6DE195, #C4E759)", // Card 7 - Pastel Light
  "linear-gradient(33deg, #A43AB2, #E13680)", // Card 8 - Dark/Vibrant
  "linear-gradient(33deg, #BC3D2F, #A16BFE)", // Card 9 - Dark/Vibrant
  "linear-gradient(33deg, #ABC7FF, #C1E3FF)"  // Card 10 - Pastel Light
];

// Pastel light cards that require Dark Navy text (#171d42 / #242c55)
export const LIGHT_PASTEL_INDICES = [1, 4, 5, 6, 9]; // Card 2, 5, 6, 7, 10 (0-indexed)

export function CaseStudy1_1({ 
  project, 
  onBack, 
  onZoomImage 
}: { 
  project: ProjectCard; 
  onBack: () => void; 
  onZoomImage: (img: string) => void;
}) {
  const { theme, setTheme } = useTheme();
  const isBento = theme === "soft-floating-bento";

  const [viewMode, setViewMode] = useState<"all" | "mindmap">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("project_detail_view_mode") as "all" | "mindmap";
      if (saved === "all" || saved === "mindmap") return saved;
    }
    return "all";
  });

  useEffect(() => {
    localStorage.setItem("project_detail_view_mode", viewMode);
  }, [viewMode]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(1);
  const [isFullyStacked, setIsFullyStacked] = useState(false);
  const [isFannedOut, setIsFannedOut] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  // GSAP 3 Stacking Deck & Accordion Logic
  useEffect(() => {
    const container = document.getElementById("article-section");
    if (!container) return;

    // Sentence case formatting helper
    const toSentenceCase = (str: string) => {
      if (!str) return str;
      const trimmed = str.trim();
      if (!trimmed) return trimmed;
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    };

    // Capitalize H2 and H3 section headings
    const headings = container.querySelectorAll("h2, h3");
    headings.forEach((h) => {
      const spans = h.querySelectorAll("span");
      if (spans.length > 0) {
        spans.forEach((span) => {
          const txt = span.textContent || "";
          if (txt.trim().length > 3 && /[a-zA-ZÀ-Ỹà-ỹ]/.test(txt)) {
            span.textContent = toSentenceCase(txt);
          }
        });
      } else {
        const txt = h.textContent || "";
        if (txt.trim().length > 3 && /[a-zA-ZÀ-Ỹà-ỹ]/.test(txt)) {
          h.textContent = toSentenceCase(txt);
        }
      }
    });

    container.classList.add("accordions", "accordions-stage");
    const sections = Array.from(container.querySelectorAll("section"));
    
    sections.forEach((sec, idx) => {
      sec.classList.add("accordion", "accordion-deck-card");
      sec.style.marginBottom = "15px";
      sec.style.background = CARD_GRADIENTS_33DEG[idx % CARD_GRADIENTS_33DEG.length];
      
      const isPastelLight = LIGHT_PASTEL_INDICES.includes(idx);

      if (isBento) {
        sec.style.border = "1px solid rgba(255, 255, 255, 0.72)";
        sec.style.boxShadow = "0 14px 34px rgba(70, 65, 150, 0.14), inset 0 1px 2px rgba(255, 255, 255, 0.7)";
        sec.style.borderRadius = "24px";

        if (isPastelLight) {
          sec.style.color = "#171d42";
          sec.querySelectorAll("h2, h3, h4, p, span").forEach((el) => {
            (el as HTMLElement).style.color = "#171d42";
          });
          sec.querySelectorAll(".badge, .tag-pill, .glass-pill").forEach((el) => {
            (el as HTMLElement).style.backgroundColor = "rgba(255, 255, 255, 0.85)";
            (el as HTMLElement).style.color = "#171d42";
            (el as HTMLElement).style.fontWeight = "800";
          });
        } else {
          sec.style.color = "#ffffff";
          sec.querySelectorAll("h2, h3, h4, p, span").forEach((el) => {
            (el as HTMLElement).style.color = "#ffffff";
          });
        }
      } else {
        sec.style.border = "1px solid rgba(255, 255, 255, 0.25)";
        sec.style.boxShadow = "0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3)";
        sec.style.borderRadius = "22px";
        sec.style.color = "#ffffff";
      }

      // Wrap body content into an accordion-text container
      if (!sec.querySelector(".accordion-text")) {
        const header = sec.firstElementChild;
        if (header) {
          const wrapper = document.createElement("div");
          wrapper.className = "accordion-text text space-y-6 overflow-hidden transition-all duration-300";
          while (sec.children.length > 1) {
            if (sec.children[1]) {
              wrapper.appendChild(sec.children[1]);
            }
          }
          sec.appendChild(wrapper);
        }
      }
    });

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const firstCard = sections[0];
      if (!firstCard) return;

      const firstCardTop = firstCard.offsetTop;

      // Stacking Timeline pinned at top += 85px
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#article-section",
          start: "top top+=85",
          end: "+=4200",
          scrub: 1.1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const cardCount = sections.length || 10;
            const currentCard = Math.min(cardCount, Math.floor(progress * cardCount) + 1);
            setActiveCardIndex(currentCard);
            setIsFullyStacked(progress >= 0.96);
          }
        }
      });

      // Animate collapsible text content
      tl.to("#article-section .accordion-text", {
        height: 0,
        paddingBottom: 0,
        paddingTop: 0,
        marginTop: 0,
        opacity: 0,
        stagger: 0.1,
        ease: "power1.inOut"
      });

      // Stack each card onto the first card's position with scaling
      sections.forEach((card, i) => {
        if (i === 0) return;
        const diffY = -(card.offsetTop - firstCardTop);

        tl.to(card, {
          y: diffY,
          scale: 0.96,
          filter: "brightness(0.92)",
          duration: 0.8,
          ease: "power2.out"
        }, "<+=0.2");
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [viewMode, project.id, theme, isBento]);

  // Fan-out 3D interactive effect on click
  const handleFanOutClick = () => {
    const container = document.getElementById("article-section");
    if (!container) return;

    const cards = container.querySelectorAll(".accordion-deck-card");
    if (!cards || cards.length === 0) return;

    playUiSound("click");
    setIsFannedOut(true);

    cards.forEach((card, idx) => {
      const mid = (cards.length - 1) / 2;
      const rotation = (idx - mid) * 4; // -18deg to +18deg
      const offsetX = (idx - mid) * 16;
      const offsetY = Math.abs(idx - mid) * 4;

      gsap.to(card, {
        rotate: rotation,
        x: offsetX,
        y: `-=${offsetY}`,
        duration: 0.45,
        ease: "back.out(1.6)"
      });
    });

    // Automatically return smoothly to stacked position
    setTimeout(() => {
      cards.forEach((card) => {
        gsap.to(card, {
          rotate: 0,
          x: 0,
          duration: 0.4,
          ease: "power2.inOut"
        });
      });
      setIsFannedOut(false);
    }, 1800);
  };

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
    <div 
      className={`relative font-sans p-[5px] animate-fadeIn min-h-screen text-slate-800 dark:text-slate-100 w-full overflow-x-hidden border-0 shadow-none transition-all duration-700 ${
        isBento ? "bg-transparent text-[#202858]" : "bg-transparent"
      }`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-[90] px-4 py-2.5 rounded-2xl bg-slate-900/95 text-white border border-cyan-400/40 shadow-xl backdrop-blur-xl text-xs font-bold animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Floating Stacking Deck Real-time Status Header Bar */}
      <div className="sticky top-20 z-40 w-full px-4 sm:px-6 my-2 flex items-center justify-between pointer-events-none">
        {/* Left: Real-time Status Badge */}
        <div 
          onClick={handleFanOutClick}
          className="pointer-events-auto cursor-pointer group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/85 dark:bg-slate-900/85 border border-white/70 dark:border-white/20 shadow-[0_8px_25px_rgba(88,101,232,0.15)] backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95"
          title="Bấm vào để xem hiệu ứng xòe quạt 3D (Fan-out)"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#5865E8] to-[#7C5CDB] text-white flex items-center justify-center shadow-xs">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-2 text-2xs sm:text-xs font-black">
            <span className="text-[#5865E8] dark:text-cyan-400">
              {isFullyStacked ? "Đã nhập trùng 100%" : `Đang nhập trùng: Thẻ #${activeCardIndex} / 10`}
            </span>
            <span className="text-3xs px-1.5 py-0.5 rounded-md bg-[#5865E8]/10 text-[#5865E8] dark:bg-cyan-500/10 dark:text-cyan-300 font-extrabold hidden sm:inline">
              {isFannedOut ? "Xòe quạt 3D" : "Fan-out on Click 🎴"}
            </span>
          </div>
        </div>

        {/* Center: 10 Navigation Dots */}
        <div className="pointer-events-auto hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/75 dark:bg-slate-900/75 border border-white/60 dark:border-white/15 backdrop-blur-xl shadow-xs">
          {Array.from({ length: 10 }).map((_, dIdx) => (
            <button
              key={dIdx}
              type="button"
              onClick={() => jumpToSection(`sec-0${dIdx + 1}`.slice(-6))}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeCardIndex === dIdx + 1
                  ? "w-6 bg-[#5865E8] dark:bg-cyan-400 shadow-sm shadow-[#5865E8]/50"
                  : "bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500"
              }`}
              title={`Thẻ #${dIdx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main Table of Contents & Header */}
      <CaseStudy1_1_TOC 
        viewMode={viewMode}
        setViewMode={setViewMode}
        jumpToSection={jumpToSection}
        openModal={() => setIsModalOpen(true)}
        project={project}
        onBack={onBack}
      />

      <CaseStudy1_1_Header 
        onShowToast={showToast} 
        project={project} 
        onBack={onBack} 
      />

      {/* Scroll Indicator at Hero Level */}
      <div className="flex flex-col items-center justify-center my-4 select-none opacity-80 hover:opacity-100 transition-opacity">
        <div className="w-5 h-8 rounded-full border-2 border-[#5865E8] dark:border-cyan-400 flex items-start justify-center p-1 shadow-xs">
          <div className="w-1 h-2 rounded-full bg-[#5865E8] dark:bg-cyan-400 animate-[bounce_1.5s_infinite]" />
        </div>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5865E8] dark:text-cyan-400 mt-1">
          Cuộn trang để nhập trùng thẻ
        </span>
      </div>

      {/* Mindmap or Full Content Sections */}
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
        </>
      )}

      {/* Case Study Deep-Dive Modal */}
      {isModalOpen && (
        <CaseStudy1_1_Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          project={project} 
        />
      )}
    </div>
  );
}

export default CaseStudy1_1;
