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
  Target
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../i18n";
import { playUiSound } from "../lib/sound";
import { GLOBAL_TYPOGRAPHY_TOKENS } from "./XRayInspector";

export const TypographySettings: React.FC = () => {
  const { isTypographyModalOpen, setIsTypographyModalOpen, closeTypographyModal, theme, fontScale, setFontScale } = useTheme();
  const { lang } = useLanguage();
  const [selectedToken, setSelectedToken] = useState<string>("body");
  const [customPreviewText, setCustomPreviewText] = useState<string>("");
  const [applySimilarPage, setApplySimilarPage] = useState(false);
  const [applySimilarWebsite, setApplySimilarWebsite] = useState(false);
  
  // Trạng thái theo dõi các đối tượng đang được áp dụng
  type TargetItem = { id: string; desc: string; element?: HTMLElement | null };
  const [customTargets, setCustomTargets] = useState<Record<string, TargetItem[]>>({});
  const [newTarget, setNewTarget] = useState("");
  const [isPickingMode, setIsPickingMode] = useState(false);
  const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);

  const isDark = theme === "glass-dark-neon";
  const isVi = lang === "vi";

  // Shortcut 'T' to toggle modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input or textarea
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
    let promptList = [];

    targets.forEach(t => {
      if (t.element) {
        // Remove other typography token classes (text-display, text-h1, text-body, etc.)
        GLOBAL_TYPOGRAPHY_TOKENS.forEach(tok => {
          tok.cssClass.split(',').forEach(c => {
            const cleanClass = c.trim().replace('.', '');
            if (cleanClass) t.element!.classList.remove(cleanClass);
          });
        });
        
        // Apply immediately to the DOM element
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
      alert(isVi ? `Đã đồng bộ ${appliedCount} đối tượng trên giao diện! (Mã lệnh đã được copy)` : `Synced ${appliedCount} elements! (Prompt copied)`);
    } else {
      alert(isVi ? "Chưa có đối tượng nào được chọn trên trang để đồng bộ." : "No elements picked from the page to sync.");
    }
  };

  // Get inline styles matching token for the preview
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
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-2xl p-5 sm:p-7 space-y-5 text-slate-800 dark:text-slate-100 font-sans z-10"
          >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50 shadow-xs">
                <Type className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-slate-50">
                  {isVi ? "Thiết Lập Typography Toàn Cục" : "Global Typography Settings"}
                </h3>
                <p className="text-2xs text-slate-500 dark:text-slate-400">
                  {isVi 
                    ? "Hệ thống phân cấp 16 tokens chuẩn của font 'Play', loại bỏ hardcoded" 
                    : "16-token design system hierarchy for Play font, no hardcoded sizes"}
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

          {/* Body content */}
          <div className="space-y-4">
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
                    className="flex-shrink-0 flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold shadow-3xs hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
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
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-bold shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

              <div className="p-6 rounded-2xl border border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-center min-h-[120px] text-center overflow-hidden transition-all duration-150">
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
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Áp dụng và Đồng bộ */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col gap-2.5">
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
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transform transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <Target className="w-4 h-4" />
                {isVi ? "Áp Dụng Đồng Bộ" : "Apply & Sync"}
              </button>
            </div>
          </div>
        </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TypographySettings;
