'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Crosshair, 
  X, 
  Copy, 
  Check, 
  Save, 
  Bookmark, 
  Trash2, 
  Edit3, 
  Sparkles, 
  Layers, 
  Compass, 
  Eye, 
  EyeOff, 
  Maximize2,
  FileCode2,
  ListFilter
} from 'lucide-react';
import { cn } from '../lib/utils';
import { playUiSound } from '../lib/sound';

interface SavedTemplate {
  id: string;
  page: string;
  selector: string;
  scope: 'Riêng' | 'Chung';
  action: string;
  prompt: string;
  createdAt: string;
}

export default function XRayInspector() {
  const [isActive, setIsActive] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [tooltipData, setTooltipData] = useState<{
    tag: string;
    selector: string;
    dims: string;
    x: number;
    y: number;
  } | null>(null);

  // Modal edit state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [pageName, setPageName] = useState('Trang Chủ');
  const [selectorString, setSelectorString] = useState('');
  const [scope, setScope] = useState<'Riêng' | 'Chung'>('Riêng');
  const [actionContent, setActionContent] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  // Tabs in modal: 'editor' | 'templates'
  const [activeTab, setActiveTab] = useState<'editor' | 'templates'>('editor');
  
  // Persistent saved templates
  const [savedTemplates, setSavedTemplates] = useState<SavedTemplate[]>([]);
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);

  // Session quick history
  const [sessionHistory, setSessionHistory] = useState<string[]>([]);

  // Load templates from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('xray_saved_templates');
      if (stored) {
        setSavedTemplates(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }
  }, []);

  const saveTemplatesToStorage = (templates: SavedTemplate[]) => {
    setSavedTemplates(templates);
    try {
      localStorage.setItem('xray_saved_templates', JSON.stringify(templates));
    } catch {
      // Ignore
    }
  };

  // Helper to generate a clean, optimal CSS selector
  const generateSelector = (el: HTMLElement): string => {
    if (el.id) {
      return `#${el.id}`;
    }
    
    // Check for distinctive classes or attributes
    const tagName = el.tagName.toLowerCase();
    const role = el.getAttribute('role');
    const ariaLabel = el.getAttribute('aria-label');
    
    if (ariaLabel) {
      return `${tagName}[aria-label="${ariaLabel.slice(0, 24)}"]`;
    }
    if (role) {
      return `${tagName}[role="${role}"]`;
    }

    // Try finding unique class
    if (el.classList && el.classList.length > 0) {
      const meaningfulClasses = Array.from(el.classList).filter(
        c => !c.includes(':') && !c.startsWith('w-') && !c.startsWith('h-') && !c.startsWith('p-') && !c.startsWith('m-')
      );
      if (meaningfulClasses.length > 0) {
        const classSelector = `.${meaningfulClasses.slice(0, 2).join('.')}`;
        return `${tagName}${classSelector}`;
      }
    }

    // Fallback to parent path
    const parent = el.parentElement;
    if (parent && parent.id) {
      return `#${parent.id} > ${tagName}`;
    }

    return tagName;
  };

  // Helper to detect current page/section
  const detectPageName = (el?: HTMLElement | null): string => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash) {
        const map: Record<string, string> = {
          home: 'Trang Chủ',
          letter: 'Thư Ngỏ',
          about: 'Giới Thiệu',
          education: 'Học Vấn',
          domains: 'Lĩnh Vực',
          skills: 'Kỹ Năng',
          experience: 'Kinh Nghiệm',
          projects: 'Dự Án',
          systems: 'Hệ Thống',
          interview: 'Phỏng Vấn',
          tuvi: 'Tử Vi',
          memories: 'Kỷ Niệm',
          contact: 'Liên Hệ',
          wallpapers: 'Hình Nền',
        };
        if (map[hash]) return map[hash];
      }
    }

    if (el) {
      const closestSection = el.closest('section');
      if (closestSection && closestSection.id) {
        return closestSection.id.replace('landing-section-', '').toUpperCase();
      }
    }

    return 'Trang Chủ';
  };

  // 1. Toggle mechanism: Press 'X' / 'x' key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in form inputs
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable ||
          target.tagName === 'SELECT')
      ) {
        return;
      }

      if (e.key === 'x' || e.key === 'X') {
        if (!isModalOpen) {
          e.preventDefault();
          setIsActive(prev => {
            const next = !prev;
            try { playUiSound('click'); } catch {}
            return next;
          });
        }
      } else if (e.key === 'Escape') {
        if (isModalOpen) {
          setIsModalOpen(false);
        } else if (isActive) {
          setIsActive(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, isActive]);

  // 2. Mouse movement and hover highlight when X-Ray is ON
  useEffect(() => {
    if (!isActive || isModalOpen) {
      setHoveredElement(null);
      setTooltipData(null);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (!target) return;

      // Ignore our own floating inspector elements
      if (target.closest('#xray-inspector-root')) return;

      setHoveredElement(target);

      const rect = target.getBoundingClientRect();
      const selector = generateSelector(target);

      setTooltipData({
        tag: target.tagName.toLowerCase(),
        selector,
        dims: `${Math.round(rect.width)} × ${Math.round(rect.height)} px`,
        x: Math.min(window.innerWidth - 240, Math.max(10, e.clientX + 14)),
        y: Math.min(window.innerHeight - 80, Math.max(10, e.clientY + 18)),
      });
    };

    const handleClick = (e: MouseEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (!target || target.closest('#xray-inspector-root')) return;

      e.preventDefault();
      e.stopPropagation();

      try { playUiSound('click'); } catch {}

      // Capture element details and open popup editor
      setSelectedElement(target);
      const detectedPage = detectPageName(target);
      const sel = generateSelector(target);

      setPageName(detectedPage);
      setSelectorString(sel);
      setActionContent('');
      setGeneratedPrompt('');
      setCopied(false);
      setActiveTab('editor');

      // Pause hovering and open modal
      setIsModalOpen(true);
      setIsActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick, true);
    };
  }, [isActive, isModalOpen]);

  // Generate standard 1-line prompt
  const handleGeneratePrompt = useCallback(() => {
    if (!actionContent.trim()) return;

    // Standard single-line format:
    // [Trang: <Tên trang>] [Đối tượng: <Selector/Tag>] [Phạm vi: Riêng/Chung] -> Hành động: <Nội dung yêu cầu edit>
    const line = `[Trang: ${pageName.trim()}] [Đối tượng: ${selectorString.trim()}] [Phạm vi: ${scope}] -> Hành động: ${actionContent.trim()}`;
    setGeneratedPrompt(line);
    try { playUiSound('click'); } catch {}
  }, [pageName, selectorString, scope, actionContent]);

  // Copy prompt to clipboard
  const handleCopyPrompt = async (textToCopy?: string) => {
    const text = textToCopy || generatedPrompt;
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      try { playUiSound('haptic'); } catch {}
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Save prompt to session history
  const handleSaveToSession = () => {
    if (!generatedPrompt) return;
    setSessionHistory(prev => [generatedPrompt, ...prev.filter(p => p !== generatedPrompt)].slice(0, 15));
    try { playUiSound('haptic'); } catch {}
  };

  // Save prompt to persistent templates
  const handleSaveToTemplates = () => {
    if (!generatedPrompt) return;

    if (editingTemplateId) {
      // Update existing
      const updated = savedTemplates.map(item =>
        item.id === editingTemplateId
          ? {
              ...item,
              page: pageName,
              selector: selectorString,
              scope,
              action: actionContent,
              prompt: generatedPrompt,
            }
          : item
      );
      saveTemplatesToStorage(updated);
      setEditingTemplateId(null);
    } else {
      // Add new
      const newTemplate: SavedTemplate = {
        id: `tpl-${Date.now()}`,
        page: pageName,
        selector: selectorString,
        scope,
        action: actionContent,
        prompt: generatedPrompt,
        createdAt: new Date().toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      saveTemplatesToStorage([newTemplate, ...savedTemplates]);
    }

    try { playUiSound('haptic'); } catch {}
  };

  // Delete saved template
  const handleDeleteTemplate = (id: string) => {
    const filtered = savedTemplates.filter(t => t.id !== id);
    saveTemplatesToStorage(filtered);
    try { playUiSound('click'); } catch {}
  };

  // Edit template
  const handleEditTemplate = (tpl: SavedTemplate) => {
    setPageName(tpl.page);
    setSelectorString(tpl.selector);
    setScope(tpl.scope);
    setActionContent(tpl.action);
    setGeneratedPrompt(tpl.prompt);
    setEditingTemplateId(tpl.id);
    setActiveTab('editor');
    try { playUiSound('click'); } catch {}
  };

  // Apply outline highlight to hovered element in DOM
  useEffect(() => {
    if (!hoveredElement || !isActive) return;

    const originalOutline = hoveredElement.style.outline;
    const originalOutlineOffset = hoveredElement.style.outlineOffset;

    hoveredElement.style.outline = '2px dashed #00E5FF';
    hoveredElement.style.outlineOffset = '2px';

    return () => {
      hoveredElement.style.outline = originalOutline;
      hoveredElement.style.outlineOffset = originalOutlineOffset;
    };
  }, [hoveredElement, isActive]);

  return (
    <div id="xray-inspector-root">
      {/* ========================================================================= */}
      {/* 1. FLOATING ACTION BUTTON (TOGGLE ON/OFF)                                 */}
      {/* ========================================================================= */}
      <div className="fixed bottom-20 right-4 sm:right-6 z-[9990] flex items-center gap-2 select-none font-play">
        <button
          type="button"
          onClick={() => {
            try { playUiSound('click'); } catch {}
            setIsActive(prev => !prev);
          }}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-full border shadow-2xl backdrop-blur-xl transition-all duration-300 cursor-pointer text-xs font-bold active:scale-95',
            isActive
              ? 'bg-cyan-500 text-slate-950 border-white shadow-[0_0_20px_#00E5FF] scale-105'
              : 'bg-slate-900/85 hover:bg-slate-800 border-white/20 text-slate-200 hover:text-cyan-400'
          )}
          title="Bật/Tắt chế độ X-Ray Inspector (Phím tắt: 'X')"
        >
          <Crosshair className={cn('w-4 h-4 shrink-0', isActive && 'animate-spin')} />
          <span>X-Ray: {isActive ? 'ON' : 'OFF'}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-black/30 font-mono font-bold">
            X
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. LIVE ELEMENT HOVER TOOLTIP                                             */}
      {/* ========================================================================= */}
      {isActive && tooltipData && (
        <div
          style={{
            position: 'fixed',
            left: `${tooltipData.x}px`,
            top: `${tooltipData.y}px`,
            pointerEvents: 'none',
          }}
          className="z-[9995] max-w-[280px] p-2 rounded-xl bg-slate-950/90 text-white border border-cyan-400/80 shadow-[0_8px_25px_rgba(0,0,0,0.5),0_0_15px_rgba(0,229,255,0.4)] backdrop-blur-md text-left font-mono text-3xs select-none"
        >
          <div className="flex items-center justify-between gap-2 pb-1 border-b border-white/10 font-bold">
            <span className="text-cyan-300 font-extrabold uppercase">&lt;{tooltipData.tag}&gt;</span>
            <span className="text-slate-400 font-normal">{tooltipData.dims}</span>
          </div>
          <div className="text-emerald-300 truncate mt-1 font-semibold" title={tooltipData.selector}>
            {tooltipData.selector}
          </div>
          <div className="text-slate-400 text-[9px] mt-0.5">
            Click chuột để chọn & tạo Prompt
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. POPUP MODAL: X-RAY OBJECT EDITOR & PROMPT GENERATOR                    */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md select-none font-play"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="w-full max-w-xl max-h-[92vh] overflow-hidden rounded-3xl bg-white/95 dark:bg-[#0c1222]/95 border border-slate-200 dark:border-cyan-500/30 text-slate-900 dark:text-slate-100 shadow-[0_25px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(0,229,255,0.15)] backdrop-blur-2xl flex flex-col text-left transition-all"
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between bg-slate-50/80 dark:bg-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-md">
                  <Crosshair className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                    X-Ray Object Editor
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Trích xuất thông tin phần tử & Tạo Prompt chỉnh sửa nhanh
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200/60 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Đóng (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 px-5 pt-3 border-b border-slate-200/60 dark:border-white/10 bg-slate-100/50 dark:bg-white/2">
              <button
                type="button"
                onClick={() => setActiveTab('editor')}
                className={cn(
                  'px-3.5 py-1.5 text-xs font-bold rounded-t-xl transition-all border-b-2 cursor-pointer flex items-center gap-1.5',
                  activeTab === 'editor'
                    ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 bg-white dark:bg-[#0c1222]'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                )}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Tạo Prompt Sửa</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('templates')}
                className={cn(
                  'px-3.5 py-1.5 text-xs font-bold rounded-t-xl transition-all border-b-2 cursor-pointer flex items-center gap-1.5',
                  activeTab === 'templates'
                    ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 bg-white dark:bg-[#0c1222]'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                )}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Kho Mẫu Đã Lưu ({savedTemplates.length})</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto no-scrollbar space-y-4">
              {activeTab === 'editor' ? (
                <>
                  {/* Extracted Object Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 font-mono text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                        Trang Hiện Tại
                      </span>
                      <input
                        type="text"
                        value={pageName}
                        onChange={e => setPageName(e.target.value)}
                        className="w-full px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                        Bộ Chọn / Đối Tượng (Selector)
                      </span>
                      <input
                        type="text"
                        value={selectorString}
                        onChange={e => setSelectorString(e.target.value)}
                        className="w-full px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-emerald-300 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Scope Selector */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      Phạm vi áp dụng (Scope):
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setScope('Riêng')}
                        className={cn(
                          'p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer',
                          scope === 'Riêng'
                            ? 'bg-cyan-500/15 border-cyan-500 text-cyan-600 dark:text-cyan-400 shadow-xs'
                            : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                        )}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                        <span>Chỉ phần tử này (Riêng)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setScope('Chung')}
                        className={cn(
                          'p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer',
                          scope === 'Chung'
                            ? 'bg-purple-500/15 border-purple-500 text-purple-600 dark:text-purple-400 shadow-xs'
                            : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                        )}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                        <span>Tất cả phần tử cùng loại (Chung)</span>
                      </button>
                    </div>
                  </div>

                  {/* Action content input */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      Hành động & Nội dung yêu cầu chỉnh sửa:
                    </label>
                    <textarea
                      rows={3}
                      value={actionContent}
                      onChange={e => setActionContent(e.target.value)}
                      placeholder="Ví dụ: Đổi màu nền sang tím pastel, tăng padding lên 16px, bo cong góc 24px..."
                      className="w-full p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/15 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 leading-relaxed font-sans"
                    />
                  </div>

                  {/* Generate Button */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      disabled={!actionContent.trim()}
                      onClick={handleGeneratePrompt}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Tạo Prompt Chuẩn</span>
                    </button>
                  </div>

                  {/* Generated Prompt Output (Single Line Output Standard) */}
                  {generatedPrompt && (
                    <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 space-y-2.5 text-left">
                      <div className="flex items-center justify-between text-3xs font-mono font-bold text-cyan-400">
                        <span>ĐỊNH DẠNG PROMPT 1 DÒNG DUY NHẤT:</span>
                        {copied && (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Đã sao chép!
                          </span>
                        )}
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-950 border border-cyan-500/30 font-mono text-xs text-cyan-200 select-all break-all leading-relaxed">
                        {generatedPrompt}
                      </div>

                      {/* Actions for Prompt */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => handleCopyPrompt()}
                          className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                        >
                          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copied ? 'Đã sao chép' : 'Sao chép Prompt'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleSaveToSession}
                          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Lưu Quick History</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleSaveToTemplates}
                          className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 text-purple-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ml-auto"
                        >
                          <Bookmark className="w-3.5 h-3.5 text-purple-400" />
                          <span>Lưu trữ mẫu lâu dài</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Session Quick History */}
                  {sessionHistory.length > 0 && (
                    <div className="pt-2 border-t border-slate-200 dark:border-white/10">
                      <span className="text-3xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Lịch sử phiên làm việc ({sessionHistory.length}):
                      </span>
                      <div className="space-y-1.5 max-h-28 overflow-y-auto no-scrollbar font-mono text-3xs">
                        {sessionHistory.map((hist, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleCopyPrompt(hist)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-cyan-500/10 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 truncate cursor-pointer flex items-center justify-between gap-2"
                            title="Bấm để copy nhanh"
                          >
                            <span className="truncate">{hist}</span>
                            <Copy className="w-3 h-3 shrink-0 text-cyan-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* TAB 2: KHO MẪU ĐÃ LƯU (PERSISTENT TEMPLATES) */
                <div className="space-y-3">
                  {savedTemplates.length === 0 ? (
                    <div className="py-10 text-center text-slate-400 space-y-2">
                      <Bookmark className="w-8 h-8 mx-auto opacity-40 text-cyan-400" />
                      <p className="text-xs">Chưa có mẫu nào được lưu.</p>
                      <p className="text-3xs text-slate-500">
                        Tạo prompt và bấm &quot;Lưu trữ mẫu lâu dài&quot; để lưu lại dùng nhiều lần.
                      </p>
                    </div>
                  ) : (
                    savedTemplates.map(tpl => (
                      <div
                        key={tpl.id}
                        className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 space-y-2 text-left transition-all hover:border-cyan-500/40"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-3xs font-bold font-mono">
                              {tpl.page}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-600 dark:text-purple-400 text-3xs font-bold font-mono">
                              {tpl.scope}
                            </span>
                          </div>
                          <span className="text-3xs text-slate-400 font-mono">{tpl.createdAt}</span>
                        </div>

                        <div className="font-mono text-3xs text-slate-800 dark:text-slate-200 bg-white/70 dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-white/10 select-all break-all">
                          {tpl.prompt}
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => handleCopyPrompt(tpl.prompt)}
                            className="px-2.5 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-3xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copy 1 chạm</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleEditTemplate(tpl)}
                            className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/15 text-slate-700 dark:text-slate-300 text-3xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Chỉnh sửa</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteTemplate(tpl.id)}
                            className="px-2 py-1 rounded-lg hover:bg-rose-500/15 text-rose-500 text-3xs font-bold flex items-center gap-1 transition-all cursor-pointer ml-auto"
                            title="Xóa mẫu"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Xóa</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
