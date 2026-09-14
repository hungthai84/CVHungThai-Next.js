import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Type,
  X,
  Sparkles,
  SlidersHorizontal,
  CheckCircle2,
  Info,
  Text,
  Weight,
  MoveHorizontal,
  Columns,
  Minus,
  Plus,
  Target,
  Layers,
  Check,
  RotateCcw,
  Maximize2,
  MousePointerClick
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";
import { GLOBAL_TYPOGRAPHY_TOKENS } from "./XRayInspector";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export const TypographySettings: React.FC = () => {
  const { 
    isTypographyModalOpen, 
    setIsTypographyModalOpen, 
    closeTypographyModal, 
    theme, 
    fontScale, 
    setFontScale,
    borderRadius,
    setBorderRadius,
    resetBorderRadius
  } = useTheme();
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<"typography" | "radius">("typography");
  const [selectedToken, setSelectedToken] = useState<string>("body");
  const [customPreviewText, setCustomPreviewText] = useState<string>("");
  const [applySimilarPage, setApplySimilarPage] = useState(false);
  const [applySimilarWebsite, setApplySimilarWebsite] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);
  
  // Trạng thái theo dõi các đối tượng đang được áp dụng
  type TargetItem = { id: string; desc: string; element?: HTMLElement | null };
  const [customTargets, setCustomTargets] = useState<Record<string, TargetItem[]>>({});
  const [newTarget, setNewTarget] = useState("");
  const [isPickingMode, setIsPickingMode] = useState(false);
  const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);

  const isDark = theme === "glass-dark-neon";
  const isVi = lang === "vi";

  const RADIUS_PRESETS = [
    { value: 0, labelVi: "0px (Vuông)", labelEn: "0px (Sharp)", descVi: "Góc vuông vức" },
    { value: 6, labelVi: "6px (Tối giản)", labelEn: "6px (Minimal)", descVi: "Bo nhẹ thanh thoát" },
    { value: 10, labelVi: "10px (Chuẩn)", labelEn: "10px (Standard)", descVi: "Tiêu chuẩn Master", isDefault: true },
    { value: 16, labelVi: "16px (Hiện đại)", labelEn: "16px (Modern)", descVi: "Bo cong mềm mại" },
    { value: 20, labelVi: "20px (Bo lớn)", labelEn: "20px (Large)", descVi: "Phong cách bento" },
    { value: 24, labelVi: "24px (Luxury)", labelEn: "24px (Luxury)", descVi: "Glassmorphism cao cấp" },
  ];

  // Shortcut 'T' to toggle modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        setIsTypographyModalOpen(!isTypographyModalOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTypographyModalOpen, setIsTypographyModalOpen]);

  // Logic Pick Element
  useEffect(() => {
    if (!isPickingMode) {
      setHoveredRect(null);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (!target || target.closest("#typography-settings-modal")) return;
      setHoveredRect(target.getBoundingClientRect());
    };

    const handleClick = (e: MouseEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (!target || target.closest("#typography-settings-modal")) return;

      e.preventDefault();
      e.stopPropagation();
      playUiSound("click");

      const rawText = target.innerText || "";
      const snippet = rawText.slice(0, 30).replace(/\n/g, ' ') + (rawText.length > 30 ? "..." : "");
      const desc = `<${target.tagName.toLowerCase()}> ${snippet ? `"${snippet}"` : target.className}`;
      
      const newItem: TargetItem = {
        id: Math.random().toString(36).substr(2, 9),
        desc,
        element: target
      };

      setCustomTargets(prev => {
        const current = prev[selectedToken] || [];
        return { ...prev, [selectedToken]: [...current, newItem] };
      });
      setIsPickingMode(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick, { capture: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick, { capture: true });
    };
  }, [isPickingMode, selectedToken]);

  const currentToken = GLOBAL_TYPOGRAPHY_TOKENS.find((t) => t.id === selectedToken) || GLOBAL_TYPOGRAPHY_TOKENS[9]; // default to body

  const currentTargets = customTargets[currentToken.id] 
    || currentToken.targetElements.split(',').map(s => ({ id: Math.random().toString(36).substr(2, 9), desc: s.trim() } as TargetItem)).filter(t => t.desc);

  const handleAddTarget = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (newTarget.trim()) {
      setCustomTargets(prev => ({
        ...prev,
        [currentToken.id]: [...(prev[currentToken.id] || currentTargets), { id: Math.random().toString(36).substr(2, 9), desc: newTarget.trim() }]
      }));
      setNewTarget("");
      playUiSound("click");
    }
  };

  const handleRemoveTarget = (idToRemove: string) => {
    setCustomTargets(prev => ({
      ...prev,
      [currentToken.id]: (prev[currentToken.id] || currentTargets).filter(t => t.id !== idToRemove)
    }));
    playUiSound("click");
  };

  const handleApplySync = () => {
    playUiSound("success");
    const targets = customTargets[currentToken.id] || currentTargets;
    let appliedCount = 0;
    let promptList: string[] = [];

    targets.forEach(t => {
      if (t.element) {
        GLOBAL_TYPOGRAPHY_TOKENS.forEach(tok => {
          tok.cssClass.split(',').forEach(c => {
            const cleanClass = c.trim().replace('.', '');
            if (cleanClass) t.element!.classList.remove(cleanClass);
          });
        });
        
        currentToken.cssClass.split(',').forEach(c => {
          const classToAdd = c.trim().replace('.', '');
          if (classToAdd) t.element!.classList.add(classToAdd);
        });

        appliedCount++;
        promptList.push(`- Đối tượng: ${t.desc}`);
      }
    });

    if (appliedCount > 0) {
      const classListToApply = currentToken.cssClass.split(',').map(c => c.trim().replace('.', '')).join(' ');
      let scopeText = "- Phạm vi áp dụng: ";
      if (applySimilarWebsite) {
        scopeText += "Toàn bộ website (các thành phần tương tự)";
      } else if (applySimilarPage) {
        scopeText += "Trong trang hiện tại (các thành phần tương tự)";
      } else {
        scopeText += "Chỉ các đối tượng đã chọn";
      }

      const promptText = `[Đồng bộ Typography]\nHãy gán class '${classListToApply}' cho các đối tượng sau:\n${promptList.join('\n')}\n${scopeText}\nCảm ơn!`;
      navigator.clipboard.writeText(promptText);
      setSyncFeedback(isVi ? `Đã đồng bộ ${appliedCount} đối tượng trên giao diện!` : `Synced ${appliedCount} elements!`);
      setTimeout(() => setSyncFeedback(null), 3000);
    } else {
      setSyncFeedback(isVi ? "Vui lòng chọn đối tượng từ trang để đồng bộ." : "Please pick elements from page to sync.");
      setTimeout(() => setSyncFeedback(null), 3000);
    }
  };

  const handleApplyRadiusSync = () => {
    playUiSound("success");
    setSyncFeedback(isVi ? `Đã áp dụng bo góc ${borderRadius}px đồng bộ toàn bộ website!` : `Applied ${borderRadius}px border radius system-wide!`);
    setTimeout(() => setSyncFeedback(null), 3000);
  };

  const getPreviewStyles = (tok: typeof currentToken) => {
    return {
      fontFamily: "'Play', sans-serif",
      fontSize: tok.clampValue,
      fontWeight: tok.defaultWeight,
      lineHeight: tok.defaultLineHeight,
      letterSpacing: tok.defaultLetterSpacing,
    };
  };

  return (
    <>
      <AnimatePresence>
        {isTypographyModalOpen && isPickingMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] pointer-events-none"
          >
            {/* Guide Text */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-2 rounded-full font-bold shadow-xl text-sm pointer-events-auto flex items-center gap-3">
              <Target className="w-4 h-4 animate-pulse" />
              {isVi ? "Di chuyển chuột và click vào phần tử cần áp dụng" : "Hover and click an element to pick"}
              <button 
                onClick={() => setIsPickingMode(false)}
                className="ml-2 bg-white/20 hover:bg-white/30 rounded-full p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Hovered Rect Box */}
            {hoveredRect && (
              <div 
                className="absolute border-2 border-indigo-500 bg-indigo-500/20 transition-all duration-75"
                style={{
                  top: hoveredRect.top,
                  left: hoveredRect.left,
                  width: hoveredRect.width,
                  height: hoveredRect.height,
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isTypographyModalOpen && !isPickingMode && (
          <motion.div 
            key="typography-modal-wrapper"
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop overlay */}
            <div
              onClick={() => {
                playUiSound("click");
                closeTypographyModal();
              }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal content card */}
            <motion.div
              id="typography-settings-modal"
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl shadow-2xl text-slate-800 dark:text-slate-100 font-sans z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-200/70 dark:border-slate-800/80 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50 shadow-xs">
                    {activeTab === "typography" ? <Type className="w-5 h-5" /> : <SlidersHorizontal className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-slate-50 flex items-center gap-2">
                      <span>{isVi ? "Tùy Chỉnh Giao Diện & Design System" : "UI Customization & Design System"}</span>
                      <span className="text-3xs font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                        {activeTab === "typography" ? "Typography" : "Border Radius"}
                      </span>
                    </h3>
                    <p className="text-2xs text-slate-500 dark:text-slate-400">
                      {activeTab === "typography" 
                        ? (isVi ? "Phân cấp 16 tokens chuẩn của font 'Play', loại bỏ hardcoded" : "16-token design system hierarchy for Play font")
                        : (isVi ? "Điều chỉnh độ bo cong góc toàn bộ thẻ, nút, modal trên toàn website" : "Customize border radius across all cards, buttons, and modals")}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playUiSound("click");
                    closeTypographyModal();
                  }}
                  className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title={isVi ? "Đóng (Phím T)" : "Close (T key)"}
                >
                  <X className="w-5 h-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 px-5 sm:px-7 pt-3 pb-2 border-b border-slate-200/50 dark:border-white/5 shrink-0 bg-slate-50/60 dark:bg-slate-900/40">
                <button
                  type="button"
                  onClick={() => {
                    playUiSound("click");
                    setActiveTab("typography");
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "typography"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-white/5"
                  }`}
                >
                  <Type className="w-4 h-4" />
                  <span>{isVi ? "Font Chữ (Typography)" : "Typography (Font)"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playUiSound("click");
                    setActiveTab("radius");
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "radius"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-white/5"
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>{isVi ? "Độ Bo Cong Góc (Border Radius)" : "Border Radius"}</span>
                  <span className="text-3xs font-mono font-bold px-1.5 py-0.5 rounded bg-white/20 dark:bg-black/20">
                    {borderRadius}px
                  </span>
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5 no-scrollbar">
                {/* TAB 1: TYPOGRAPHY SETTINGS */}
                {activeTab === "typography" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    {/* 1. Selector Dropdown List */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-700 dark:text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{isVi ? "Chọn Cấp Bậc Token (16 Tokens)" : "Select Token Level (16 Tokens)"}</span>
                      </label>

                      <select
                        value={selectedToken}
                        onChange={(e) => {
                          playUiSound("click");
                          setSelectedToken(e.target.value);
                        }}
                        className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-100 shadow-3xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:border-indigo-300 dark:hover:border-indigo-800"
                      >
                        {GLOBAL_TYPOGRAPHY_TOKENS.map((tok) => (
                          <option key={tok.id} value={tok.id}>
                            {tok.level} — {isVi ? tok.labelVi : tok.labelEn} ({tok.rangePx} | {tok.cssClass})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 2. Token Details Card */}
                    <div className="p-4 rounded-2xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100/60 dark:border-indigo-950/50 pb-2">
                        <span className="text-xs font-black text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                          <span>{isVi ? "Thông số Token kỹ thuật:" : "Technical Token Specs:"}</span>
                        </span>
                        <span className="font-mono text-3xs text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-full font-bold">
                          {currentToken.variable}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-3xs font-medium">
                        <div className="space-y-1">
                          <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1"><Text className="w-3 h-3 text-indigo-400" /> {isVi ? "Cấp bậc" : "Level"}</span>
                          <div className="font-bold text-slate-800 dark:text-slate-200">{currentToken.level}</div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1"><MoveHorizontal className="w-3 h-3 text-indigo-400" /> {isVi ? "Dải đo" : "Range"}</span>
                          <div className="font-bold text-slate-800 dark:text-slate-200 font-mono">{currentToken.rangePx}</div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1"><Weight className="w-3 h-3 text-indigo-400" /> {isVi ? "Độ dày" : "Weight"}</span>
                          <div className="font-bold text-slate-800 dark:text-slate-200 font-mono">{currentToken.defaultWeight}</div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1"><Columns className="w-3 h-3 text-indigo-400" /> CSS Class</span>
                          <div className="font-bold text-indigo-600 dark:text-indigo-400 font-mono underline select-all">{currentToken.cssClass}</div>
                        </div>
                      </div>

                      <p className="text-3xs text-slate-500 dark:text-slate-400 leading-normal border-t border-indigo-100/40 dark:border-indigo-950/30 pt-2 font-medium">
                        <Info className="w-3 h-3 inline-block mr-1 text-indigo-400 shrink-0" />
                        {isVi ? currentToken.desc : "Responsive typography configuration matching the custom system criteria."}
                      </p>
                    </div>

                    {/* 3. Target Elements / Các đối tượng áp dụng */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-700 dark:text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                        <Target className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{isVi ? "Các đối tượng đang áp dụng:" : "Currently Applied Objects:"}</span>
                      </label>

                      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 space-y-3">
                        {/* Danh sách các tag */}
                        <div className="flex flex-wrap gap-2">
                          <AnimatePresence mode="popLayout">
                            {currentTargets.map((target) => (
                              <motion.div
                                key={target.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.15 }}
                                className="flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-800 dark:text-indigo-300 shadow-3xs"
                                title={target.element ? "Đối tượng đã được chọn từ giao diện" : ""}
                              >
                                <span className="truncate max-w-[200px]">{target.desc}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveTarget(target.id)}
                                  className="p-0.5 rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors text-indigo-600 dark:text-indigo-400"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                          {currentTargets.length === 0 && (
                            <span className="text-xs text-slate-400 font-medium italic">
                              {isVi ? "Chưa có đối tượng nào" : "No objects assigned"}
                            </span>
                          )}
                        </div>

                        {/* Form thêm tag mới */}
                        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                          <button
                            type="button"
                            onClick={() => {
                              playUiSound("click");
                              setIsPickingMode(true);
                            }}
                            className="flex-shrink-0 flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold shadow-3xs hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors cursor-pointer"
                          >
                            <Target className="w-3.5 h-3.5" />
                            {isVi ? "Thêm (Chọn trên trang)" : "Add (Pick on page)"}
                          </button>
                          <form onSubmit={handleAddTarget} className="flex flex-1 items-center gap-2">
                            <input
                              type="text"
                              placeholder={isVi ? "Nhập tên đối tượng..." : "Type object name..."}
                              value={newTarget}
                              onChange={(e) => setNewTarget(e.target.value)}
                              className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                            />
                            <button
                              type="submit"
                              disabled={!newTarget.trim()}
                              className="px-3 py-1.5 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-bold shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            >
                              {isVi ? "Thêm" : "Add"}
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>

                    {/* 4. Live Preview Card */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                          {isVi ? "Trực quan xem trước (Play Font Preview):" : "Visual Play Font Preview:"}
                        </label>
                        <input
                          type="text"
                          placeholder={isVi ? "Nhập chữ để test..." : "Type text to preview..."}
                          value={customPreviewText}
                          onChange={(e) => setCustomPreviewText(e.target.value)}
                          className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-3xs font-bold w-40 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="p-6 rounded-2xl border border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-center min-h-[110px] text-center overflow-hidden transition-all duration-150">
                        <div 
                          style={getPreviewStyles(currentToken)}
                          className="text-slate-900 dark:text-slate-50 max-w-full truncate whitespace-normal transition-all"
                        >
                          {customPreviewText || (isVi 
                            ? `Nguyễn Hùng Thái — Giám đốc Chăm Sóc Khách Hàng chuyên nghiệp.` 
                            : `Nguyen Hung Thai — Professional Customer Care Director.`)}
                        </div>
                      </div>
                    </div>

                    {/* 5. Global Font Sizing */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-xs font-black text-slate-900 dark:text-slate-200 block">
                            {isVi ? "Kích Thước Font Toàn Cục" : "Global Font Size Scale"}
                          </label>
                          <span className="text-3xs text-slate-400 dark:text-slate-500 block">
                            {isVi 
                              ? "Áp dụng đồng bộ cho tất cả các đối tượng (80% - 130%)" 
                              : "Synchronously scale all elements system-wide (80% - 130%)"}
                          </span>
                        </div>
                        <div className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
                          {fontScale}%
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            playUiSound("click");
                            setFontScale(Math.max(80, fontScale - 5));
                          }}
                          disabled={fontScale <= 80}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        
                        <input
                          type="range"
                          min="80"
                          max="130"
                          step="1"
                          value={fontScale}
                          onChange={(e) => setFontScale(Number(e.target.value))}
                          onMouseUp={() => playUiSound("click")}
                          onTouchEnd={() => playUiSound("click")}
                          className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                        
                        <button
                          type="button"
                          onClick={() => {
                            playUiSound("click");
                            setFontScale(Math.min(130, fontScale + 5));
                          }}
                          disabled={fontScale >= 130}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Áp dụng và Đồng bộ Typography */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2.5 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={applySimilarPage} 
                            onChange={(e) => setApplySimilarPage(e.target.checked)}
                            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                          />
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {isVi ? "Áp dụng các thành phần tương tự trong trang" : "Apply to similar elements on page"}
                          </span>
                        </label>
                        <label className="flex items-center gap-2.5 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={applySimilarWebsite} 
                            onChange={(e) => setApplySimilarWebsite(e.target.checked)}
                            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                          />
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {isVi ? "Áp dụng các thành phần tương tự toàn Website" : "Apply to similar elements on entire website"}
                          </span>
                        </label>
                      </div>
                      <button
                        type="button"
                        onClick={handleApplySync}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transform transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Target className="w-4 h-4" />
                        {isVi ? "Áp Dụng Đồng Bộ" : "Apply & Sync"}
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 2: BORDER RADIUS SETTINGS */}
                {activeTab === "radius" && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    {/* Header & Token Specifications Card */}
                    <div className="p-4 rounded-2xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100/60 dark:border-indigo-950/50 pb-2">
                        <span className="text-xs font-black text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                          <span>{isVi ? "Hệ thống Tokens Bo Cong Góc (Global Border Radius):" : "Global Border Radius Tokens:"}</span>
                        </span>
                        <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 px-3 py-0.5 rounded-full font-bold">
                          --theme-radius: {borderRadius}px
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-3xs font-medium">
                        <div className="p-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60">
                          <span className="text-slate-400 dark:text-slate-500 block">Thẻ (Cards)</span>
                          <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{borderRadius}px</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60">
                          <span className="text-slate-400 dark:text-slate-500 block">Nút bấm (Buttons)</span>
                          <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{Math.max(6, borderRadius)}px</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60">
                          <span className="text-slate-400 dark:text-slate-500 block">Hộp thoại (Modals)</span>
                          <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{Math.min(28, borderRadius + 4)}px</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60">
                          <span className="text-slate-400 dark:text-slate-500 block">Khung con (Inner)</span>
                          <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{Math.max(2, borderRadius - 4)}px</span>
                        </div>
                      </div>

                      <p className="text-3xs text-slate-500 dark:text-slate-400 leading-normal border-t border-indigo-100/40 dark:border-indigo-950/30 pt-2 font-medium">
                        <Info className="w-3.5 h-3.5 inline-block mr-1 text-indigo-500 shrink-0" />
                        {isVi 
                          ? "Khi thay đổi, giá trị bo cong sẽ được tự động đồng bộ tức thì trên toàn bộ website thông qua các biến CSS (--theme-radius, --radius-card, --radius-button, v.v.)."
                          : "When changed, the border radius synchronously updates across all cards, buttons, modals, and containers via CSS design tokens."}
                      </p>
                    </div>

                    {/* Radius Slider & Controls */}
                    <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/50 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-xs font-black text-slate-900 dark:text-slate-200 block">
                            {isVi ? "Kích Thước Bo Góc Toàn Cục" : "Global Border Radius Scale"}
                          </label>
                          <span className="text-3xs text-slate-500 dark:text-slate-400">
                            {isVi ? "Kéo thanh trượt từ 0px (vuông) đến 28px (bo tròn)" : "Adjust slider from 0px (sharp) to 28px (extra rounded)"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              playUiSound("click");
                              resetBorderRadius();
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 text-3xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                            title="Đặt lại 10px"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>{isVi ? "Mặc định (10px)" : "Reset (10px)"}</span>
                          </button>
                          <span className="font-mono text-sm font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800/40">
                            {borderRadius}px
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            playUiSound("click");
                            setBorderRadius(Math.max(0, borderRadius - 2));
                          }}
                          disabled={borderRadius <= 0}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        
                        <input
                          type="range"
                          min="0"
                          max="28"
                          step="1"
                          value={borderRadius}
                          onChange={(e) => setBorderRadius(Number(e.target.value))}
                          onMouseUp={() => playUiSound("click")}
                          onTouchEnd={() => playUiSound("click")}
                          className="flex-1 h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                        
                        <button
                          type="button"
                          onClick={() => {
                            playUiSound("click");
                            setBorderRadius(Math.min(28, borderRadius + 2));
                          }}
                          disabled={borderRadius >= 28}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Presets Grid */}
                      <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800/60 space-y-2">
                        <span className="text-3xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                          {isVi ? "Các Mức Bo Góc Tiêu Chuẩn Nhanh:" : "Quick Preset Options:"}
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {RADIUS_PRESETS.map((preset) => {
                            const isSelected = borderRadius === preset.value;
                            return (
                              <button
                                key={preset.value}
                                type="button"
                                onClick={() => {
                                  playUiSound("click");
                                  setBorderRadius(preset.value);
                                }}
                                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                                  isSelected
                                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                                    : "bg-white/80 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
                                }`}
                              >
                                <div>
                                  <div className="font-bold text-xs">
                                    {isVi ? preset.labelVi : preset.labelEn}
                                  </div>
                                  <div className={`text-3xs ${isSelected ? "text-indigo-100" : "text-slate-500 dark:text-slate-400"}`}>
                                    {preset.descVi}
                                  </div>
                                </div>
                                {isSelected ? (
                                  <Check className="w-4 h-4 text-white shrink-0" />
                                ) : preset.isDefault ? (
                                  <span className="text-3xs font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                    {isVi ? "Gốc" : "Default"}
                                  </span>
                                ) : null}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Live Component Preview Card */}
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                        {isVi ? "Xem Trước Trực Quan Thành Phần Thực Tế (Live Components Preview):" : "Live Components Visual Preview:"}
                      </label>

                      <div 
                        className="p-5 border bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 backdrop-blur-xl space-y-4 shadow-sm transition-all duration-200"
                        style={{ borderRadius: `${borderRadius}px` }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                              {isVi ? `Thẻ Mẫu (Card) — Bo Góc ${borderRadius}px` : `Sample Card — ${borderRadius}px Radius`}
                            </h4>
                          </div>
                          <span 
                            className="px-2.5 py-1 text-3xs font-bold bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30"
                            style={{ borderRadius: `${Math.max(4, borderRadius - 2)}px` }}
                          >
                            Active Token
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          {isVi 
                            ? "Khung giao diện này đang phản chiếu chính xác giá trị bo góc hiện tại. Thay đổi sẽ lập tức có hiệu lực trên toàn bộ 16 trang của website." 
                            : "This component reflects the current radius value. All elements will adapt synchronously."}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200/50 dark:border-slate-800/60">
                          {/* Inner Input Preview */}
                          <div className="space-y-1">
                            <span className="text-3xs font-bold text-slate-500 dark:text-slate-400">Ô nhập liệu (Input)</span>
                            <input
                              type="text"
                              readOnly
                              value="Nguyễn Hùng Thái - CSKH"
                              style={{ borderRadius: `${Math.max(4, borderRadius - 2)}px` }}
                              className="w-full px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                            />
                          </div>

                          {/* Inner Buttons Preview */}
                          <div className="space-y-1">
                            <span className="text-3xs font-bold text-slate-500 dark:text-slate-400">Nút bấm (Buttons)</span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                style={{ borderRadius: `${Math.max(6, borderRadius)}px` }}
                                className="px-3 py-1.5 text-xs font-bold bg-[var(--color-primary)] text-white shadow-xs"
                              >
                                Primary
                              </button>
                              <button
                                type="button"
                                style={{ borderRadius: `${Math.max(6, borderRadius)}px` }}
                                className="px-3 py-1.5 text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700"
                              >
                                Secondary
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Radius Sync Actions */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>{isVi ? "Tự động áp dụng và lưu vào bộ nhớ trình duyệt" : "Auto-saved and applied across entire website"}</span>
                      </div>

                      <button
                        type="button"
                        onClick={handleApplyRadiusSync}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transform transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        {isVi ? "Xác Nhận & Đồng Bộ Toàn Website" : "Confirm & Sync All"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Toast feedback */}
              <AnimatePresence>
                {syncFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-16 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs shadow-2xl border border-white/20 flex items-center gap-2 z-50 pointer-events-none"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
                    <span>{syncFeedback}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Footer */}
              <div className="px-5 sm:px-7 py-3.5 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/50 shrink-0">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{isVi ? "100% Design Tokens Chuẩn Master" : "100% Master Design Tokens"}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playUiSound("click");
                    closeTypographyModal();
                  }}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
                >
                  {isVi ? "Đóng" : "Close"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TypographySettings;

