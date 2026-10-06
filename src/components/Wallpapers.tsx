import React, { useState, useRef, useMemo } from "react";
import { 
  Plus, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Trash2, 
  Check, 
  Download, 
  Upload, 
  Sliders, 
  Sparkles, 
  Copy, 
  CheckCheck,
  FileJson,
  Maximize2,
  RefreshCw,
  X,
  Code,
  Search,
  Eye,
  ArrowUpRight,
  Info
} from "lucide-react";
import { useBackground } from "../context/BackgroundContext";
import { BackgroundItem } from "../types/background";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { PageCardHeader } from "./PageCardHeader";
import { WALLPAPER_CATEGORIES, CSS_PRESET_TEMPLATES } from "../data/wallpapers";
import { playUiSound } from "../lib/sound";
import FloatingParticlesCanvasBg from "./FloatingParticlesCanvasBg";

// Helper to format scoped CSS for preview containers
function formatScopedCss(cssCode: string, scopeClass: string): string {
  if (!cssCode) return "";
  let formatted = cssCode.trim();
  if (!formatted.includes("{")) {
    return `.${scopeClass} { ${formatted} }`;
  }
  formatted = formatted.replace(/\bbody::/g, `.${scopeClass}::`);
  formatted = formatted.replace(/\bbody\b/g, `.${scopeClass}`);
  formatted = formatted.replace(/&/g, `.${scopeClass}`);
  return formatted;
}

export default function Wallpapers() {
  const { 
    config, 
    addBackgroundLink, 
    addCssBackground,
    removeBackground, 
    setActiveBackground, 
    setOverlayOpacity, 
    setBlurAmount, 
    resetToDefaultGradient,
    exportConfigToJson,
    importConfigFromJson,
    downloadJsonFile,
    resetToDefaultJsonLibrary
  } = useBackground();

  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";

  // Search & Category Filters
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Input states
  const [urlInput, setUrlInput] = useState("");
  const [selectedType, setSelectedType] = useState<'auto' | 'image' | 'video' | 'css' | 'codepen'>('auto');
  const [inputError, setInputError] = useState("");
  const [successToast, setSuccessToast] = useState("");

  // CSS Code Input state
  const [cssNameInput, setCssNameInput] = useState("");
  const [cssCodeInput, setCssCodeInput] = useState(CSS_PRESET_TEMPLATES[0].code);
  const [inspectingCssItem, setInspectingCssItem] = useState<BackgroundItem | null>(null);
  const [copiedInspectCode, setCopiedInspectCode] = useState(false);

  // Preview Lightbox
  const [previewItem, setPreviewItem] = useState<BackgroundItem | null>(null);

  // Expandable Control Drawers
  const [showAddControls, setShowAddControls] = useState(false);
  const [showJsonStudio, setShowJsonStudio] = useState(false);
  const [jsonPasteInput, setJsonPasteInput] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [copiedJson, setCopiedJson] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(""), 3200);
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    setInputError("");

    if (selectedType === 'css') {
      if (!cssCodeInput.trim()) {
        setInputError(isVi ? "Vui lòng nhập đoạn mã CSS cho hình nền." : "Please enter CSS code for wallpaper.");
        return;
      }
      const ok = addCssBackground(cssNameInput.trim() || "Hình nền CSS Custom", cssCodeInput.trim(), "css");
      if (ok) {
        setCssNameInput("");
        try { playUiSound("click"); } catch {}
        showToast(isVi ? "Đã thêm và kích hoạt hình nền CSS thành công!" : "CSS Wallpaper created and applied successfully!");
      }
      return;
    }

    const trimmed = urlInput.trim();
    if (!trimmed) {
      setInputError(isVi ? "Vui lòng dán liên kết ảnh, video hoặc CodePen." : "Please enter a valid image, video or CodePen URL.");
      return;
    }

    try {
      new URL(trimmed);
    } catch {
      setInputError(isVi ? "Định dạng URL không hợp lệ (cần bắt đầu bằng http:// hoặc https://)" : "Invalid URL format.");
      return;
    }

    const isCp = trimmed.includes('codepen.io') || trimmed.includes('cdpn.io');
    const explicitType = selectedType === 'auto' ? (isCp ? 'codepen' : undefined) : selectedType;
    const ok = addBackgroundLink(trimmed, explicitType);
    if (ok) {
      setUrlInput("");
      try { playUiSound("click"); } catch {}
      showToast(
        isCp || explicitType === 'codepen'
          ? (isVi ? "Đã thêm và kích hoạt hình nền CodePen thành công!" : "CodePen Live Wallpaper applied successfully!")
          : (isVi ? "Đã thêm và kích hoạt hình nền thành công!" : "Background added and applied successfully!")
      );
    }
  };

  const handleCopyJson = () => {
    const json = exportConfigToJson();
    navigator.clipboard.writeText(json);
    setCopiedJson(true);
    try { playUiSound("click"); } catch {}
    showToast(isVi ? "Đã sao chép cấu hình JSON vào bộ nhớ tạm!" : "Copied JSON configuration to clipboard!");
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importConfigFromJson(content);
        if (result.success) {
          try { playUiSound("click"); } catch {}
          showToast(result.message);
          setJsonError("");
        } else {
          setJsonError(result.message);
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImportPastedJson = () => {
    setJsonError("");
    if (!jsonPasteInput.trim()) {
      setJsonError(isVi ? "Vui lòng dán chuỗi JSON vào ô bên dưới." : "Please paste a JSON string.");
      return;
    }
    const result = importConfigFromJson(jsonPasteInput);
    if (result.success) {
      try { playUiSound("click"); } catch {}
      showToast(result.message);
      setJsonPasteInput("");
      setShowJsonStudio(false);
    } else {
      setJsonError(result.message);
    }
  };

  // Filtered List
  const filteredWallpapers = useMemo(() => {
    return config.items.filter((item) => {
      const matchCat =
        activeCategory === "all" ||
        (activeCategory === "css" && (item.type === "css" || item.type === "floating-particles")) ||
        (activeCategory === "codepen" && item.type === "codepen") ||
        (activeCategory === "video" && item.type === "video") ||
        (activeCategory === "image" && (item.type === "image" || !item.type));

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchCat;

      const matchSearch =
        (item.name || "").toLowerCase().includes(query) ||
        (item.category || "").toLowerCase().includes(query) ||
        (item.tags || []).some((t) => t.toLowerCase().includes(query));

      return matchCat && matchSearch;
    });
  }, [config.items, activeCategory, searchQuery]);

  // Statistics
  const totalImages = useMemo(() => config.items.filter(item => item.type === 'image' || !item.type).length, [config.items]);
  const totalVideos = useMemo(() => config.items.filter(item => item.type === 'video').length, [config.items]);
  const totalCss = useMemo(() => config.items.filter(item => item.type === 'css' || item.type === 'floating-particles').length, [config.items]);
  const totalCodePen = useMemo(() => config.items.filter(item => item.type === 'codepen').length, [config.items]);

  return (
    <section 
      id="wallpapers" 
      className="relative w-full h-auto overflow-y-auto flex flex-col justify-start items-stretch p-3.5 sm:p-5 font-sans text-slate-800 dark:text-slate-100 transition-colors duration-500 select-none"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFileUpload}
        className="hidden"
      />

      <div className="w-full max-w-full h-full min-h-full flex-grow flex-1 flex flex-col gap-4 sm:gap-5 mx-auto justify-start relative z-10">

        {/* Header Card */}
        <PageCardHeader pageId="wallpapers">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1 w-full">
            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2 md:justify-end ml-auto">
              <button
                type="button"
                onClick={() => {
                  try { playUiSound("click"); } catch {}
                  setShowAddControls(!showAddControls);
                }}
                className={`py-1.5 px-3 rounded-xl font-bold text-caption flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer border ${
                  showAddControls 
                    ? "bg-blue-600 text-white border-blue-500 shadow-blue-500/30" 
                    : "bg-white hover:bg-slate-50 dark:bg-slate-900/80 dark:hover:bg-slate-800 text-slate-800 dark:text-white border-slate-200 dark:border-slate-800"
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isVi ? "Thêm nền mới" : "Add Wallpaper"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  try { playUiSound("click"); } catch {}
                  setShowJsonStudio(!showJsonStudio);
                }}
                className={`py-1.5 px-3 rounded-xl font-bold text-caption flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer border ${
                  showJsonStudio 
                    ? "bg-purple-600 text-white border-purple-500 shadow-purple-500/30" 
                    : "bg-white hover:bg-slate-50 dark:bg-slate-900/80 dark:hover:bg-slate-800 text-slate-800 dark:text-white border-slate-200 dark:border-slate-800"
                }`}
              >
                <FileJson className="w-3.5 h-3.5 text-purple-500" />
                <span>JSON Studio</span>
              </button>
            </div>
          </div>
        </PageCardHeader>

        {/* Toast Notification */}
        {successToast && (
          <div className="bg-emerald-500/15 border border-emerald-500/30 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-2.5 shadow-sm animate-fadeIn">
            <CheckCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="w-full p-3.5 sm:p-4 rounded-2xl bg-white/75 dark:bg-slate-900/80 border border-white/70 dark:border-white/10 backdrop-blur-md shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {WALLPAPER_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    try { playUiSound("click"); } catch {}
                    setActiveCategory(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 flex items-center gap-1.5 cursor-pointer border ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-md shadow-blue-500/20 scale-[1.02]"
                      : "bg-white/40 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 border-slate-200/60 dark:border-white/10 hover:bg-white/80 dark:hover:bg-slate-800/80"
                  }`}
                >
                  <span>{isVi ? cat.labelVi : cat.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 sm:w-60 md:max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isVi ? "Tìm tên, mã, thẻ hình nền..." : "Search name, tag..."}
              className="w-full pl-8 pr-3 py-1.5 rounded-full text-xs bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all font-play"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* QUICK ADD BY URL CONTROLS */}
        {showAddControls && (
          <div className="w-full animate-fadeIn">
            
            {/* Quick Add Form */}
            <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 font-play">
                  {isVi ? "Thêm liên kết hình nền mới:" : "Add New Background:"}
                </span>

                {/* Type Switcher */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700 text-2xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setSelectedType('auto')}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${selectedType === 'auto' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}
                  >
                    Auto
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedType('image')}
                    className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors ${selectedType === 'image' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}
                  >
                    <ImageIcon className="w-3 h-3" />
                    <span>Ảnh</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedType('video')}
                    className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors ${selectedType === 'video' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'}`}
                  >
                    <VideoIcon className="w-3 h-3" />
                    <span>Video</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedType('css')}
                    className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors ${selectedType === 'css' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-500'}`}
                  >
                    <Code className="w-3 h-3" />
                    <span>Code CSS</span>
                  </button>
                </div>
              </div>

              {selectedType === 'css' ? (
                <form onSubmit={handleAddLink} className="space-y-3">
                  {/* Preset chips */}
                  <div className="space-y-1.5">
                    <span className="text-2xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{isVi ? "Mẫu CSS nền có sẵn:" : "CSS Presets:"}</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {CSS_PRESET_TEMPLATES.map((tpl, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setCssNameInput(tpl.name);
                            setCssCodeInput(tpl.code);
                          }}
                          className="px-2.5 py-1 rounded-lg text-2xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20 transition-all cursor-pointer"
                        >
                          {tpl.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder={isVi ? "Tên hình nền CSS (VD: Cực quang Neon...)" : "CSS Wallpaper Name..."}
                    value={cssNameInput}
                    onChange={(e) => setCssNameInput(e.target.value)}
                    className="w-full px-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-8">
                      <textarea
                        rows={4}
                        placeholder={isVi ? "Nhập mã CSS..." : "Enter CSS rules..."}
                        value={cssCodeInput}
                        onChange={(e) => setCssCodeInput(e.target.value)}
                        className="w-full p-3 text-xs font-mono rounded-xl bg-slate-100 dark:bg-slate-800 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="sm:col-span-4 flex flex-col gap-1">
                      <span className="text-3xs font-bold text-slate-400">Preview:</span>
                      <div className="w-full h-20 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden relative shadow-inner bg-slate-950">
                        <style dangerouslySetInnerHTML={{ __html: `
                          .quick-preview-css-box {
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            inset: 0;
                          }
                          ${formatScopedCss(cssCodeInput, 'quick-preview-css-box')}
                        `}} />
                        <div className="quick-preview-css-box w-full h-full" />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Code className="w-4 h-4" />
                    <span>{isVi ? "Thêm & Áp dụng nền CSS" : "Add & Apply CSS Wallpaper"}</span>
                  </button>

                  {inputError && (
                    <p className="text-xs text-red-500 font-medium pl-1">{inputError}</p>
                  )}
                </form>
              ) : (
                <form onSubmit={handleAddLink} className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder={isVi ? "Dán link ảnh (.jpg, .png, Unsplash...) hoặc video (.mp4)..." : "Paste image or video URL..."}
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isVi ? "Thêm & Áp dụng" : "Add & Apply"}</span>
                    </button>
                  </div>

                  {inputError && (
                    <p className="text-xs text-red-500 font-medium pl-1">{inputError}</p>
                  )}
                </form>
              )}

              <div className="flex items-center justify-between text-2xs text-slate-500 dark:text-slate-400 pt-1">
                <span>💡 {isVi ? "Hệ thống tự động lưu vĩnh viễn vào bộ nhớ trình duyệt." : "Auto-saved permanently in browser storage."}</span>
                <button 
                  type="button" 
                  onClick={() => resetToDefaultJsonLibrary()} 
                  className="text-blue-500 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{isVi ? "Khôi phục kho vĩnh viễn" : "Restore permanent library"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* JSON STUDIO PANEL */}
        {showJsonStudio && (
          <div className="bg-purple-900/10 dark:bg-purple-950/30 p-5 sm:p-6 rounded-3xl border border-purple-500/30 shadow-xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
              <div className="flex items-center gap-2.5">
                <FileJson className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
                <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white uppercase tracking-wide font-play">
                  {isVi ? "JSON Studio • Quản lý & Đồng bộ dữ liệu" : "JSON Studio • Raw Config"}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isVi ? "Tải file .json" : "Upload .json"}</span>
                </button>
                <button
                  onClick={downloadJsonFile}
                  className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isVi ? "Tải về .json" : "Download .json"}</span>
                </button>
              </div>
            </div>

            <textarea
              rows={5}
              placeholder={isVi ? "Dán nội dung file JSON vào đây..." : "Paste JSON string here..."}
              value={jsonPasteInput}
              onChange={(e) => setJsonPasteInput(e.target.value)}
              className="w-full p-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner"
            />

            {jsonError && (
              <p className="text-xs text-red-500 font-bold">{jsonError}</p>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setJsonPasteInput(exportConfigToJson())}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                {isVi ? "Nạp JSON hiện tại" : "Fill current JSON"}
              </button>
              <button
                onClick={handleImportPastedJson}
                className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-md transition-all hover:opacity-90 cursor-pointer"
              >
                {isVi ? "Áp dụng JSON vừa dán" : "Import & Sync Now"}
              </button>
            </div>
          </div>
        )}

        {/* WALLPAPERS BENTO GRID */}
        {filteredWallpapers.length === 0 ? (
          <div className="w-full py-12 px-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center gap-3 font-play">
            <ImageIcon className="w-10 h-10 text-slate-400" />
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">
              {isVi ? "Không tìm thấy hình nền phù hợp" : "No matching wallpaper found"}
            </h4>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-1 px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
            >
              {isVi ? "Hiển thị tất cả hình nền" : "Show all wallpapers"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
            
            {/* Wallpaper Cards */}
            {filteredWallpapers.map((item, idx) => {
              const isActive = config.activeId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    try { playUiSound("click"); } catch {}
                    setActiveBackground(item.id, item.type, item.url, item.cssCode);
                  }}
                  className={`group cursor-pointer aspect-video p-0 border overflow-hidden transition-all duration-300 relative shadow-md hover:shadow-xl hover:scale-103 ${
                    isActive
                      ? 'border-blue-500 ring-2 ring-blue-500/40 bg-blue-50/20 dark:bg-blue-950/20'
                      : 'border-slate-200/90 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 hover:border-blue-400'
                  }`}
                  style={{ borderRadius: 'var(--theme-radius-card, 12px)' }}
                  title={`${item.name || `Wallpaper #${idx + 1}`}`}
                >
                  {/* Media Preview */}
                  <div className="w-full h-full bg-slate-950 relative overflow-hidden">
                    {item.type === 'floating-particles' ? (
                      <div className="w-full h-full relative overflow-hidden bg-slate-950">
                        <FloatingParticlesCanvasBg container={true} />
                      </div>
                    ) : item.type === 'css' ? (
                      <div className="w-full h-full relative overflow-hidden bg-slate-950">
                        <style dangerouslySetInnerHTML={{ __html: `
                          .preview-tile-css-${item.id.replace(/[^a-zA-Z0-9_-]/g, '')} {
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            inset: 0;
                          }
                          ${formatScopedCss(item.cssCode || '', `preview-tile-css-${item.id.replace(/[^a-zA-Z0-9_-]/g, '')}`)}
                        `}} />
                        <div className={`preview-tile-css-${item.id.replace(/[^a-zA-Z0-9_-]/g, '')} w-full h-full`} />
                      </div>
                    ) : item.type === 'codepen' ? (
                      <div className="w-full h-full relative overflow-hidden bg-slate-950">
                        <img
                          src={item.previewUrl || item.url}
                          alt={item.name || "CodePen Wallpaper"}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400";
                          }}
                        />
                      </div>
                    ) : item.type === 'video' ? (
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        muted
                        autoPlay
                        loop
                        playsInline
                        poster={item.previewUrl || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400"}
                        onError={(e) => {
                          const target = e.target as HTMLVideoElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <img
                        src={item.previewUrl || item.url}
                        alt={item.name || "Wallpaper"}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400";
                        }}
                      />
                    )}

                    {/* Active Overlay */}
                    {isActive && (
                      <div className="absolute inset-0 bg-blue-600/25 flex items-center justify-center">
                        <div className="p-1.5 rounded-full bg-blue-600 text-white shadow-md">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    )}

                    {/* Type Badge */}
                    <div className={`absolute top-1 left-1 px-1.5 py-0.5 rounded backdrop-blur-xs text-[9px] font-bold z-10 ${
                      item.type === 'floating-particles'
                        ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-xs'
                        : item.type === 'css'
                        ? 'bg-emerald-600/90 text-white'
                        : item.type === 'codepen'
                        ? 'bg-amber-600/90 text-white'
                        : item.type === 'video'
                        ? 'bg-cyan-600/90 text-white'
                        : 'bg-slate-900/70 text-white'
                    }`}>
                      {item.type === 'floating-particles' ? 'CANVAS FX' : item.type === 'css' ? 'CSS' : item.type === 'codepen' ? 'CODEPEN' : item.type === 'video' ? 'VIDEO' : '4K'}
                    </div>

                    {/* Hover Action Overlay */}
                    <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2 z-20 font-play">
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewItem(item);
                          }}
                          className="p-1 rounded-md bg-white/20 hover:bg-white/40 text-white transition cursor-pointer"
                          title={isVi ? "Xem trước toàn màn hình" : "Full Screen Preview"}
                        >
                          <Maximize2 className="w-3 h-3" />
                        </button>

                        {/* Delete wallpaper button for all wallpaper items */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeBackground(item.id);
                            showToast(isVi ? "Đã xóa hình nền khỏi thư viện!" : "Wallpaper removed from library!");
                          }}
                          className="p-1.5 rounded-md bg-rose-600/80 hover:bg-rose-600 text-white transition cursor-pointer"
                          title={isVi ? "Xóa hình nền này" : "Delete Wallpaper"}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold text-white truncate leading-tight">
                          {item.name}
                        </p>
                        <p className="text-[9px] text-blue-300 font-medium">
                          {isVi ? "Nhấp để kích hoạt" : "Click to apply"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* FULL SCREEN PREVIEW LIGHTBOX */}
      {previewItem && (
        <div 
          onClick={() => setPreviewItem(null)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-8"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-950 flex flex-col"
          >
            {/* Header */}
            <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-white font-play z-10">
              <span className="text-xs font-bold flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-400" />
                <span>{previewItem.name}</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveBackground(previewItem.id, previewItem.type, previewItem.url, previewItem.cssCode);
                    setPreviewItem(null);
                    showToast(isVi ? "Đã áp dụng hình nền thành công!" : "Applied wallpaper successfully!");
                  }}
                  className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isVi ? "Áp dụng làm nền" : "Apply as Background"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    removeBackground(previewItem.id);
                    setPreviewItem(null);
                    showToast(isVi ? "Đã xóa hình nền khỏi thư viện!" : "Wallpaper removed from library!");
                  }}
                  className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  title={isVi ? "Xóa hình nền này" : "Delete Wallpaper"}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isVi ? "Xóa nền" : "Delete"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewItem(null)}
                  className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Preview Frame */}
            <div className="relative flex-1 w-full h-full overflow-hidden bg-slate-950 flex items-center justify-center">
              {previewItem.type === 'floating-particles' ? (
                <div className="w-full h-full relative overflow-hidden bg-slate-950">
                  <FloatingParticlesCanvasBg container={true} />
                </div>
              ) : previewItem.type === 'css' ? (
                <div className="w-full h-full relative overflow-hidden bg-slate-950">
                  <style dangerouslySetInnerHTML={{ __html: `
                    .preview-modal-css-${previewItem.id.replace(/[^a-zA-Z0-9_-]/g, '')} {
                      width: 100%;
                      height: 100%;
                      position: absolute;
                      inset: 0;
                    }
                    ${formatScopedCss(previewItem.cssCode || '', `preview-modal-css-${previewItem.id.replace(/[^a-zA-Z0-9_-]/g, '')}`)}
                  `}} />
                  <div className={`preview-modal-css-${previewItem.id.replace(/[^a-zA-Z0-9_-]/g, '')} w-full h-full`} />
                </div>
              ) : previewItem.type === 'video' ? (
                <video
                  src={previewItem.url}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={previewItem.previewUrl || previewItem.url}
                  alt={previewItem.name}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
