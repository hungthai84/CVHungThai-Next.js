/* Lucian UX/UI Prompt #041 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#041 */
import React, { useEffect, useRef, useState, useCallback } from "react";
import { 
  Monitor, 
  MailOpen, 
  User, 
  Compass, 
  Briefcase, 
  Brain, 
  ClipboardList, 
  Video, 
  MessagesSquare,
  Sparkles,
  Server,
  Images,
  GraduationCap
} from "lucide-react";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";
import { cn } from "../lib/utils";

interface NotchedTabBarProps {
  activeSection?: string;
  onNavigate?: (id: string) => void;
  className?: string;
}

export const NAV_ITEMS = [
  { id: "home", labelVi: "Trang chủ", labelEn: "Home", Icon: Monitor },
  { id: "letter", labelVi: "Thư ngỏ", labelEn: "Letter", Icon: MailOpen },
  { id: "about", labelVi: "Giới thiệu", labelEn: "About", Icon: User },
  { id: "education", labelVi: "Học vấn", labelEn: "Education", Icon: GraduationCap },
  { id: "domains", labelVi: "Lĩnh vực", labelEn: "Domains", Icon: Compass },
  { id: "experience", labelVi: "Kinh nghiệm", labelEn: "Exp", Icon: Briefcase },
  { id: "skills", labelVi: "Kỹ năng", labelEn: "Skills", Icon: Brain },
  { id: "projects", labelVi: "Dự án", labelEn: "Projects", Icon: ClipboardList },
  { id: "systems", labelVi: "Hệ thống", labelEn: "Systems", Icon: Server },
  { id: "interview", labelVi: "Phỏng vấn", labelEn: "Interview", Icon: Video },
  { id: "tuvi", labelVi: "Tử vi", labelEn: "Astrology", Icon: Sparkles },
  { id: "memories", labelVi: "Kỷ niệm", labelEn: "Memories", Icon: Images },
  { id: "contact", labelVi: "Liên hệ", labelEn: "Contact", Icon: MessagesSquare },
];

export const NotchedTabBar: React.FC<NotchedTabBarProps> = ({
  activeSection = "home",
  onNavigate,
  className,
}) => {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.id === activeSection)
  );

  const xRef = useRef(0);
  const vRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const updateTabPosition = useCallback((index: number, immediate = false) => {
    const rootEl = rootRef.current;
    if (!rootEl) return;

    const item = NAV_ITEMS[index] || NAV_ITEMS[0];
    const tabEl = tabRefs.current[item.id];
    if (!tabEl) return;

    const newTarget = tabEl.offsetLeft + tabEl.offsetWidth / 2;
    targetRef.current = newTarget;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (immediate || prefersReducedMotion) {
      xRef.current = newTarget;
      vRef.current = 0;
      rootEl.style.setProperty("--x", `${newTarget.toFixed(2)}px`);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    if (rafRef.current === null) {
      const step = () => {
        const a = (targetRef.current - xRef.current) * 0.18 - vRef.current * 0.44;
        vRef.current += a;
        xRef.current += vRef.current;

        if (rootEl) {
          rootEl.style.setProperty("--x", `${xRef.current.toFixed(2)}px`);
        }

        if (
          Math.abs(targetRef.current - xRef.current) > 0.2 ||
          Math.abs(vRef.current) > 0.2
        ) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          xRef.current = targetRef.current;
          vRef.current = 0;
          if (rootEl) {
            rootEl.style.setProperty("--x", `${xRef.current.toFixed(2)}px`);
          }
          rafRef.current = null;
        }
      };
      rafRef.current = requestAnimationFrame(step);
    }
  }, []);

  useEffect(() => {
    updateTabPosition(activeIndex);
    const timer = setTimeout(() => updateTabPosition(activeIndex, true), 60);
    window.addEventListener("resize", () => updateTabPosition(activeIndex, true));
    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", () => updateTabPosition(activeIndex, true));
    };
  }, [activeIndex, updateTabPosition]);

  const handleSelect = (index: number) => {
    try { playUiSound("click"); } catch {}
    const item = NAV_ITEMS[index];
    if (!item) return;

    if (onNavigate) {
      onNavigate(item.id);
    } else {
      const el = document.getElementById(item.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIdx = (index + 1) % NAV_ITEMS.length;
      handleSelect(nextIdx);
      tabRefs.current[NAV_ITEMS[nextIdx].id]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIdx = (index - 1 + NAV_ITEMS.length) % NAV_ITEMS.length;
      handleSelect(prevIdx);
      tabRefs.current[NAV_ITEMS[prevIdx].id]?.focus();
    }
  };

  return (
    <div className={cn("u041-root-wrapper w-full flex items-center justify-center font-sans", className)}>
      <style>{`
        .u041-root-wrapper {
          --ux-surface: #101524;
          --ux-ink: #FFFFFF;
          --ux-ink-3: rgba(255, 255, 255, 0.55);
          --ux-line: rgba(255, 255, 255, 0.15);
          --ux-accent-ink: #FFFFFF;
          --ux-grad: linear-gradient(135deg, #06b6d4, #3b82f6 55%, #8b5cf6);
          --ux-spring: cubic-bezier(.34, 1.45, .64, 1);
        }
        .u041 {
          --x: 34px;
          position: relative;
          width: 100%;
          max-width: 720px;
          height: 56px;
          display: flex;
          align-items: flex-end;
          box-sizing: border-box;
          user-select: none;
        }
        .u041-bar {
          position: relative;
          width: 100%;
          height: 44px;
          border-radius: 999px;
          background: var(--ux-surface);
          backdrop-filter: blur(20px);
          -webkit-mask: radial-gradient(circle 26px at var(--x) -2px, transparent 96%, #000 100%);
          mask: radial-gradient(circle 26px at var(--x) -2px, transparent 96%, #000 100%);
          box-shadow: 0 0 0 1px var(--ux-line), 0 10px 30px rgba(0,0,0,0.35);
        }
        .u041-shadow {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 44px;
          border-radius: 999px;
          box-shadow: 0 12px 28px -12px rgba(0,240,255,0.3);
          pointer-events: none;
        }
        .u041-bub {
          position: absolute;
          left: var(--x);
          top: calc(100% - 44px - 20px);
          width: 40px;
          height: 40px;
          margin-left: -20px;
          border-radius: 50%;
          background: var(--ux-grad);
          box-shadow: 0 8px 20px -6px rgba(6,182,212,0.8);
          pointer-events: none;
          z-index: 2;
        }
        .u041-tabs {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 44px;
          display: flex;
          margin: 0;
          padding: 0 6px;
          list-style: none;
          z-index: 3;
          align-items: center;
        }
        .u041-tabs > li {
          flex: 1;
          display: flex;
          height: 100%;
          min-width: 0;
        }
        .u041-tab {
          position: relative;
          flex: 1;
          height: 100%;
          border: 0;
          padding: 0;
          background: none;
          color: var(--ux-ink-3);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-center;
          min-width: 0;
          outline: none;
        }
        .u041-tab:hover .u041-ic {
          color: #06b6d4;
        }
        .u041-tab:focus-visible {
          outline: 2px solid #06b6d4;
          outline-offset: -4px;
          border-radius: 999px;
        }
        .u041-ic {
          position: absolute;
          left: 50%;
          top: 12px;
          width: 20px;
          height: 20px;
          margin-left: -10px;
          transition: transform .45s var(--ux-spring), color .3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .u041-lab {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 4px;
          font-size: 9.5px;
          font-weight: 800;
          color: var(--ux-ink);
          opacity: 0;
          transform: translateY(4px);
          transition: opacity .3s, transform .45s var(--ux-spring);
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .u041-tab[aria-selected="true"] .u041-ic {
          transform: translateY(-22px);
          color: var(--ux-accent-ink);
        }
        .u041-tab[aria-selected="true"] .u041-lab {
          opacity: 1;
          transform: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .u041-ic, .u041-lab, .u041-bub {
            transition: none !important;
          }
        }
      `}</style>

      <div ref={rootRef} className="ux u041" role="region" aria-label="Notched Bottom Navigation Bar">
        <span className="u041-shadow" aria-hidden="true" />
        <div className="u041-bar" aria-hidden="true" />
        <span className="u041-bub" aria-hidden="true" />
        <ul className="u041-tabs" role="tablist" aria-label="Notched Navigation Tabs">
          {NAV_ITEMS.map((item, idx) => {
            const isSelected = idx === activeIndex;
            const label = isVi ? item.labelVi : item.labelEn;
            const Icon = item.Icon;

            return (
              <li key={item.id} role="none">
                <button
                  ref={(el) => { tabRefs.current[item.id] = el; }}
                  type="button"
                  className="u041-tab"
                  role="tab"
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => handleSelect(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  title={label}
                >
                  <span className="u041-ic" aria-hidden="true">
                    <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
                  </span>
                  <span className="u041-lab">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default NotchedTabBar;
