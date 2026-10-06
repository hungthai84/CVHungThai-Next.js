import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Monitor, 
  MailOpen, 
  User, 
  GraduationCap, 
  Compass, 
  Brain, 
  Briefcase, 
  ClipboardList, 
  Video, 
  Sparkles, 
  Images, 
  Server, 
  MessagesSquare, 
  Sliders, 
  Palette, 
  Volume2, 
  VolumeX, 
  MousePointer, 
  Globe, 
  Sun, 
  Moon, 
  CornerDownLeft, 
  X,
  FileText,
  ShieldCheck,
  ChevronRight,
  Wand2
} from "lucide-react";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { useSound } from "../context/SoundContext";
import { useCursor } from "../context/CursorContext";
import { playUiSound } from "../lib/sound";
import { THEME_LIST } from "../data/themesData";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export function CommandPalette({ isOpen, onClose, onNavigate }: CommandPaletteProps) {
  const { lang, setLang } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { soundConfig, toggleMute } = useSound();
  const { setIsCursorModalOpen } = useCursor();
  const isVi = lang === "vi";

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const navigationItems = useMemo(() => [
    { id: "home", titleVi: "Trang chủ (Home)", titleEn: "Home", category: "Nav", icon: Monitor, key: "1" },
    { id: "letter", titleVi: "Thư ngỏ tâm huyết", titleEn: "Open Letter", category: "Nav", icon: MailOpen, key: "2" },
    { id: "about", titleVi: "Hồ sơ giới thiệu & Profile", titleEn: "About Profile", category: "Nav", icon: User, key: "3" },
    { id: "domains", titleVi: "Lĩnh vực chuyên môn & CX", titleEn: "Domains & Specializations", category: "Nav", icon: Compass, key: "4" },
    { id: "skills", titleVi: "Kỹ năng & Ma trận SWOT", titleEn: "Skills & SWOT Matrix", category: "Nav", icon: Brain, key: "5" },
    { id: "education", titleVi: "Học vấn & Chứng chỉ", titleEn: "Education & Certifications", category: "Nav", icon: GraduationCap, key: "E" },
    { id: "experience", titleVi: "Kinh nghiệm làm việc 22+ năm", titleEn: "Work Experience Timeline", category: "Nav", icon: Briefcase, key: "6" },
    { id: "projects", titleVi: "Dự án & Sáng kiến chuyển đổi số", titleEn: "Key Projects & Case Studies", category: "Nav", icon: ClipboardList, key: "7" },
    { id: "interview", titleVi: "Phỏng vấn AI tương tác", titleEn: "AI Interactive Interview", category: "Nav", icon: Video, key: "8" },
    { id: "tuvi", titleVi: "Tử vi bản mệnh & Quản trị nhân tâm", titleEn: "Astrology & Human Wisdom", category: "Nav", icon: Sparkles, key: "9" },
    { id: "memories", titleVi: "Hồi ức kỷ niệm & Hoạt động nhóm", titleEn: "Team Memories Gallery", category: "Nav", icon: Images, key: "M" },
    { id: "systems", titleVi: "Hệ thống vận hành C-Level (12 Cổng)", titleEn: "12 Enterprise Systems Hub", category: "Nav", icon: Server, key: "S" },
    { id: "contact", titleVi: "Thông tin liên hệ & Hợp tác", titleEn: "Contact & Networking Hub", category: "Nav", icon: MessagesSquare, key: "0" },
    { id: "customization", titleVi: "Tùy chỉnh diện mạo hệ thống", titleEn: "System Customization", category: "Nav", icon: Sliders, key: "U" },
  ], []);

  const actionItems = useMemo(() => [
    {
      id: "action-open-image-studio",
      titleVi: "AI Image Studio - Tạo & Chỉnh sửa ảnh bằng Gemini 3.1",
      titleEn: "AI Image Studio - Create & Edit Images with Gemini 3.1",
      category: "AI Tools",
      icon: Wand2,
      action: () => {
        window.dispatchEvent(new CustomEvent('open-image-studio'));
        onClose();
      }
    },
    {
      id: "action-toggle-theme-dark",
      titleVi: "Chuyển giao diện Tối (Dark Neon)",
      titleEn: "Switch to Dark Neon Theme",
      category: "Theme",
      icon: Moon,
      action: () => { setTheme("glass-dark-neon"); onClose(); }
    },
    {
      id: "action-toggle-theme-light",
      titleVi: "Chuyển giao diện Sáng (Soft Bento)",
      titleEn: "Switch to Soft Light Bento Theme",
      category: "Theme",
      icon: Sun,
      action: () => { setTheme("soft-floating-bento"); onClose(); }
    },
    {
      id: "action-toggle-sound",
      titleVi: soundConfig.isMuted ? "Bật âm thanh giao diện" : "Tắt âm thanh giao diện (Mute)",
      titleEn: soundConfig.isMuted ? "Unmute UI Sound Effects" : "Mute UI Sound Effects",
      category: "Settings",
      icon: soundConfig.isMuted ? Volume2 : VolumeX,
      action: () => { toggleMute(); onClose(); }
    },
    {
      id: "action-toggle-cursor",
      titleVi: "Cấu hình con trỏ chuột (Cursor Settings)",
      titleEn: "Configure Custom Cursor Settings",
      category: "Settings",
      icon: MousePointer,
      action: () => { setIsCursorModalOpen(true); onClose(); }
    },
    {
      id: "action-toggle-lang",
      titleVi: lang === "vi" ? "Đổi sang Tiếng Anh (English)" : "Switch to Vietnamese (Tiếng Việt)",
      titleEn: lang === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt",
      category: "Language",
      icon: Globe,
      action: () => { setLang(lang === "vi" ? "en" : "vi"); onClose(); }
    },
    {
      id: "action-ai-chat",
      titleVi: "Mở Trợ lý AI Hỗ trợ (AIAssistant)",
      titleEn: "Open AI Career Assistant",
      category: "AI",
      icon: Sparkles,
      action: () => {
        onClose();
        window.dispatchEvent(new CustomEvent("open-ai-assistant"));
      }
    }
  ], [soundConfig.isMuted, lang, setTheme, toggleMute, setIsCursorModalOpen, setLang, onClose]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return [...navigationItems, ...actionItems];
    }
    return [...navigationItems, ...actionItems].filter((item) => {
      const matchVi = item.titleVi.toLowerCase().includes(q);
      const matchEn = item.titleEn.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      const matchKey = (item as any).key ? (item as any).key.toLowerCase() === q : false;
      return matchVi || matchEn || matchCat || matchKey;
    });
  }, [query, navigationItems, actionItems]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems.length]);

  const handleSelect = (item: any) => {
    try { playUiSound("click"); } catch {}
    if (item.action) {
      item.action();
    } else if (item.id) {
      onNavigate(item.id);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[99999] flex items-start justify-center pt-[10vh] sm:pt-[14vh] px-4 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 border border-white/80 dark:border-white/15 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col max-h-[75vh] backdrop-blur-2xl"
        >
          {/* Header Input Search */}
          <div className="flex items-center px-4 sm:px-5 py-3.5 border-b border-slate-200/80 dark:border-white/10 gap-3">
            <Search className="w-5 h-5 text-blue-600 dark:text-cyan-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isVi ? "Tìm trang, tính năng, tùy chỉnh nhanh... (Ctrl+K)" : "Search sections, commands, settings... (Ctrl+K)"}
              className="w-full bg-transparent border-none outline-none text-sm sm:text-base font-medium text-slate-900 dark:text-white placeholder:text-slate-400 font-sans"
            />
            {query ? (
              <button 
                type="button" 
                onClick={() => setQuery("")}
                className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 hover:text-slate-800 flex items-center justify-center shrink-0 cursor-pointer text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex items-center gap-1 text-3xs font-mono font-bold px-2 py-0.8 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                <span>ESC</span>
              </div>
            )}
          </div>

          {/* List of Actions & Navigation Targets */}
          <div ref={listRef} className="overflow-y-auto p-2 sm:p-3 flex-1 custom-scrollbar space-y-1">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-xs sm:text-sm">
                {isVi ? "Không tìm thấy kết quả phù hợp" : "No results found"}
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl cursor-pointer transition-all ${
                      isSelected 
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 translate-x-1" 
                        : "hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected 
                          ? "bg-white/20 text-white" 
                          : "bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-cyan-400 border border-slate-200/60 dark:border-slate-700/60"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs sm:text-sm font-bold truncate">
                          {isVi ? item.titleVi : item.titleEn}
                        </span>
                        <span className={`text-3xs uppercase tracking-wider font-mono ${
                          isSelected ? "text-blue-200" : "text-slate-400"
                        }`}>
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {(item as any).key && (
                        <span className={`text-3xs font-mono font-bold px-2 py-0.5 rounded ${
                          isSelected ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700"
                        }`}>
                          {(item as any).key}
                        </span>
                      )}
                      <ChevronRight className={`w-4 h-4 ${isSelected ? "text-white" : "text-slate-400 opacity-60"}`} />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Quick Hint */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-3xs text-slate-500 font-medium">
            <div className="flex items-center gap-3">
              <span>↑↓ {isVi ? "Di chuyển" : "Navigate"}</span>
              <span>↵ {isVi ? "Chọn" : "Select"}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-blue-600 dark:text-cyan-400">
              <Sparkles className="w-3 h-3" />
              <span>Command Palette · Quick Search</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default CommandPalette;
