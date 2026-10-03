import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Home, 
  MailOpen, 
  User, 
  Compass, 
  Brain, 
  GraduationCap, 
  Briefcase, 
  ClipboardList, 
  Video, 
  Sparkles, 
  Images, 
  Server, 
  MessagesSquare, 
  Film, 
  Sliders, 
  LayoutTemplate,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award
} from "lucide-react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/utils";
import { playUiSound } from "../lib/sound";

interface LeftSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (id: string) => void;
  onPrev?: () => void;
  onNext?: () => void;
  isHeaderSlidUp?: boolean;
  isFooterSlidDown?: boolean;
}

const SIDEBAR_SECTIONS = [
  { id: "home", labelVi: "Trang chủ", labelEn: "Home", Icon: Home },
  { id: "letter", labelVi: "Thư ngỏ", labelEn: "Cover Letter", Icon: MailOpen },
  { id: "about", labelVi: "Giới thiệu", labelEn: "About Me", Icon: User },
  { id: "domains", labelVi: "Lĩnh vực", labelEn: "Domains", Icon: Compass },
  { id: "skills", labelVi: "Kỹ năng & SWOT", labelEn: "Skills & SWOT", Icon: Brain },
  { id: "education", labelVi: "Học vấn & Chứng chỉ", labelEn: "Education", Icon: GraduationCap },
  { id: "experience", labelVi: "Kinh nghiệm thực chiến", labelEn: "Experience", Icon: Briefcase },
  { id: "projects", labelVi: "Dự án tiêu biểu", labelEn: "Projects", Icon: ClipboardList },
  { id: "interview", labelVi: "Phỏng vấn & Q&A", labelEn: "Interview", Icon: Video },
  { id: "tuvi", labelVi: "Góc Tử Vi CX & Lộc", labelEn: "Tu Vi Insights", Icon: Sparkles },
  { id: "memories", labelVi: "Khoảnh khắc & Kỷ niệm", labelEn: "Memories", Icon: Images },
  { id: "systems", labelVi: "Hệ thống tùy chỉnh", labelEn: "Systems", Icon: Server },
  { id: "contact", labelVi: "Liên hệ trực tiếp", labelEn: "Contact", Icon: MessagesSquare },
  { id: "wallpapers", labelVi: "Thư viện Wallpapers", labelEn: "Wallpapers", Icon: Film },
  { id: "customization", labelVi: "Tùy chỉnh hệ thống", labelEn: "Customization", Icon: Sliders },
];

export default function LeftSidebar({ 
  isOpen, 
  onClose, 
  activeSection, 
  onNavigate, 
  onPrev, 
  onNext,
  isHeaderSlidUp = false,
  isFooterSlidDown = false 
}: LeftSidebarProps) {
  const { lang } = useLanguage();
  const isVi = lang === "vi";
  const { theme } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden"
          />

          {/* Sidebar Panel */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className={cn(
              "fixed z-50 flex flex-col flex-grow shadow-2xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isHeaderSlidUp ? "top-[24px]" : "top-[70px] sm:top-[74px]",
              isFooterSlidDown ? "bottom-[24px]" : "bottom-[70px] sm:bottom-[74px]",
              "bg-white/80 dark:bg-slate-900/80 border-y border-r border-slate-200/90 dark:border-white/15 border-l-0 text-slate-800 dark:text-slate-100 backdrop-blur-2xl shadow-[0_10px_35px_0_rgba(31,38,135,0.12)] dark:shadow-[0_10px_35px_0_rgba(0,0,0,0.4)]"
            )}
            style={{
              left: 0,
              right: "calc(100vw - max(16px, 50vw - 640px) + 10px)",
              borderTopRightRadius: "var(--theme-radius-card, 16px)",
              borderBottomRightRadius: "var(--theme-radius-card, 16px)",
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px"
            }}
          >
            {/* Header section matching Header capsule bar */}
            <div className="flex items-center justify-between p-3.5 border-b border-slate-200/90 dark:border-white/15 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black flex items-center justify-center shadow-md ring-2 ring-blue-500/30">
                  HT
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-black font-play tracking-tight">Nguyễn Hùng Thái</span>
                  <span className="text-3xs font-semibold text-slate-500 dark:text-slate-400">
                    {isVi ? "Trưởng phòng CX & CS" : "CX & CS Manager"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  playUiSound("click");
                  onClose();
                }}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shadow-2xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Slide Navigation Buttons Bar - Capsule matching Header controls */}
            <div className="p-3 shrink-0">
              <div className="p-1.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/15 shadow-2xs backdrop-blur-2xl flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    playUiSound("click");
                    onPrev?.();
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl hover:bg-blue-500/15 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 text-3xs font-extrabold cursor-pointer transition-all duration-200"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span>{isVi ? "Slide trước" : "Prev Slide"}</span>
                </button>
                <div className="w-px h-4 bg-slate-200 dark:bg-white/15 shrink-0" />
                <button
                  type="button"
                  onClick={() => {
                    playUiSound("click");
                    onNext?.();
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl hover:bg-blue-500/15 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 text-3xs font-extrabold cursor-pointer transition-all duration-200"
                >
                  <span>{isVi ? "Slide sau" : "Next Slide"}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                </button>
              </div>
            </div>

            {/* Navigation List */}
            <div className="flex-1 flex-grow overflow-y-auto no-scrollbar p-3 space-y-1">
              <div className="px-3 py-1.5 text-3xs font-black uppercase tracking-widest text-slate-400 font-mono">
                {isVi ? "Danh mục điều hướng" : "Navigation Menu"}
              </div>
              {SIDEBAR_SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                const Icon = sec.Icon;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => {
                      playUiSound("click");
                      onNavigate(sec.id);
                      onClose();
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer group text-left",
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-[1.01]"
                        : "text-slate-700 dark:text-slate-300 hover:bg-blue-500/15 hover:text-blue-600 dark:hover:text-cyan-400"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={cn("w-4.5 h-4.5 shrink-0 transition-transform", isActive ? "text-white scale-110" : "text-blue-500 dark:text-cyan-400 group-hover:scale-110")} />
                      <span className="truncate">{isVi ? sec.labelVi : sec.labelEn}</span>
                    </div>
                    <ChevronRight className={cn("w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform", isActive ? "text-white" : "text-slate-400")} />
                  </button>
                );
              })}
            </div>

            {/* Footer Badge */}
            <div className="p-4 border-t border-slate-200/60 dark:border-white/10 shrink-0 bg-slate-50/50 dark:bg-slate-950/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-3xs font-bold text-slate-500 dark:text-slate-400">
                  {isVi ? "Hệ thống bảo mật 24/7" : "Secure System 24/7"}
                </span>
              </div>
              <span className="text-3xs font-mono font-black text-blue-600 dark:text-cyan-400">v3.5</span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
