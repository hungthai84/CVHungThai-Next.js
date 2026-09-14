import { PageBanner } from "./PageBanner";
import React, { useState, useRef, useMemo } from "react";
import { 
  Plus, 
  Image as ImageIcon, 
  Images,
  Video as VideoIcon, 
  Trash2, 
  Check, 
  Download, 
  Upload, 
  RotateCcw, 
  Sliders, 
  Sparkles, 
  Copy, 
  CheckCheck,
  FileJson,
  Layers,
  ExternalLink,
  Maximize2,
  RefreshCw,
  Palette,
  Eye,
  Film,
  X,
  Code,
  Terminal,
  Play
} from "lucide-react";
import { useBackground, PRESET_BACKGROUNDS, INITIAL_WALLPAPERS_FROM_JSON } from "../context/BackgroundContext";
import { BackgroundItem } from "../types/background";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { PageCardHeader } from "./PageCardHeader";

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

const CSS_PRESET_TEMPLATES = [
  {
    name: "Cực quang Bryce 4 Màu (CodePen)",
    category: "css",
    code: `background-color: #0b0f19;
position: absolute;
inset: 0;
width: 100%;
height: 100%;
overflow: hidden;

&::before {
  content: "";
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000");
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  z-index: 1;
}

&::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 400%;
  height: 400%;
  opacity: 0.82;
  background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
  -webkit-animation: gradient_transition_bryce 15s ease infinite;
  animation: gradient_transition_bryce 15s ease infinite;
  mix-blend-mode: hard-light;
  z-index: 2;
}

@keyframes gradient_transition_bryce {
  0% { top: 0; left: 0; }
  50% { top: -200%; left: -200%; }
  100% { top: 0; left: 0; }
}
@-webkit-keyframes gradient_transition_bryce {
  0% { top: 0; left: 0; }
  50% { top: -200%; left: -200%; }
  100% { top: 0; left: 0; }
}`
  },
  {
    name: "Cực quang Aurora Mesh",
    category: "css",
    code: `background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #064e3b 100%);
position: relative;
box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.8);`
  },
  {
    name: "Lưới Neon Cyberpunk 3D",
    category: "css",
    code: `background-color: #05050d;
background-image: 
  linear-gradient(rgba(0, 242, 254, 0.25) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0, 242, 254, 0.25) 1px, transparent 1px),
  radial-gradient(circle at 50% 50%, rgba(255, 0, 128, 0.25) 0%, transparent 70%);
background-size: 40px 40px, 40px 40px, 100% 100%;`
  },
  {
    name: "Hoàng hôn Sunset Mesh Flow",
    category: "css",
    code: `background: radial-gradient(at 0% 0%, #ff5e62 0px, transparent 50%),
radial-gradient(at 100% 0%, #ff9966 0px, transparent 50%),
radial-gradient(at 100% 100%, #6b11ff 0px, transparent 50%),
radial-gradient(at 0% 100%, #3a1c71 0px, transparent 50%),
#0b0c10;`
  },
  {
    name: "Vũ trụ Sao Cosmic Starfield",
    category: "css",
    code: `background-color: #030014;
background-image: 
  radial-gradient(1.5px 1.5px at 20px 30px, #ffffff, rgba(0,0,0,0)),
  radial-gradient(1.5px 1.5px at 40px 70px, #ffffff, rgba(0,0,0,0)),
  radial-gradient(2px 2px at 90px 40px, #f472b6, rgba(0,0,0,0)),
  radial-gradient(ellipse at 70% 30%, rgba(99, 102, 241, 0.3) 0%, transparent 60%),
  radial-gradient(ellipse at 20% 80%, rgba(236, 72, 153, 0.25) 0%, transparent 60%);
background-size: 150px 150px, 150px 150px, 150px 150px, 100% 100%, 100% 100%;`
  },
  {
    name: "Ma trận Lục bảo Emerald Matrix",
    category: "css",
    code: `background: #022c22;
background-image: 
  radial-gradient(circle at 100% 150%, #022c22 24%, #059669 25%, #059669 28%, #022c22 29%, #022c22 36%, #059669 36%, #059669 40%, transparent 40%),
  radial-gradient(circle at 0% 150%, #022c22 24%, #059669 25%, #059669 28%, #022c22 29%, #022c22 36%, #059669 36%, #059669 40%, transparent 40%),
  radial-gradient(circle at 50% 100%, #10b981 10%, #047857 11%, #047857 23%, #064e3b 24%, #059669 31%, #022c22 44%, transparent 53%);
background-size: 80px 40px;`
  },
  {
    name: "Lăng kính Tối giản Dark Prism",
    category: "css",
    code: `background: radial-gradient(circle at 30% 30%, #312e81 0%, transparent 45%),
radial-gradient(circle at 70% 70%, #4c1d95 0%, transparent 50%),
radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%);`
  }
];

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
  const isLightMode = theme === 'mritech-digital-growth';

  const [urlInput, setUrlInput] = useState("");
  const [selectedType, setSelectedType] = useState<'auto' | 'image' | 'video' | 'css' | 'codepen'>('auto');
  const [inputError, setInputError] = useState("");
  const [successToast, setSuccessToast] = useState("");

  // CODEPEN PRESETS
  const CODEPEN_PRESETS = [
    { name: "WebGL Metaballs", url: "https://codepen.io/TC5550/pen/WNNWoaO" },
    { name: "Aurora Shader", url: "https://codepen.io/yuhomyan/pen/OJMejWJ" },
    { name: "Plasma Fluid", url: "https://codepen.io/RAFA-R3/pen/JjXbWwo" },
    { name: "Synthwave Grid", url: "https://codepen.io/P1N34PPL3/pen/eYpYmOp" },
    { name: "Particle Network", url: "https://codepen.io/juliangarnier/pen/LpWpbe" },
  ];

  // CSS Code Wallpaper state
  const [cssNameInput, setCssNameInput] = useState("");
  const [cssCodeInput, setCssCodeInput] = useState(CSS_PRESET_TEMPLATES[0].code);
  const [inspectingCssItem, setInspectingCssItem] = useState<BackgroundItem | null>(null);
  const [copiedInspectCode, setCopiedInspectCode] = useState(false);
  
  // Filtering and Searching (PROMPT #9)
  const [showAddControls, setShowAddControls] = useState(false);
  const [showJsonStudio, setShowJsonStudio] = useState(false);
  const [jsonPasteInput, setJsonPasteInput] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [copiedJson, setCopiedJson] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(""), 3500);
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    setInputError("");

    if (selectedType === 'css') {
      if (!cssCodeInput.trim()) {
        setInputError(lang === "vi" ? "Vui lòng nhập đoạn mã CSS cho hình nền." : "Please enter CSS code for wallpaper.");
        return;
      }
      const ok = addCssBackground(cssNameInput.trim() || "Hình nền CSS Custom", cssCodeInput.trim(), "css");
      if (ok) {
        setCssNameInput("");
        showToast(lang === "vi" ? "Đã thêm và kích hoạt hình nền CSS thành công!" : "CSS Wallpaper created and applied successfully!");
      }
      return;
    }

    const trimmed = urlInput.trim();
    if (!trimmed) {
      setInputError(lang === "vi" ? "Vui lòng dán liên kết ảnh, video hoặc CodePen." : "Please enter a valid image, video or CodePen URL.");
      return;
    }

    try {
      new URL(trimmed);
    } catch {
      setInputError(lang === "vi" ? "Định dạng URL không hợp lệ (cần bắt đầu bằng http:// hoặc https://)" : "Invalid URL format.");
      return;
    }

    const isCp = trimmed.includes('codepen.io') || trimmed.includes('cdpn.io');
    const explicitType = selectedType === 'auto' ? (isCp ? 'codepen' : undefined) : selectedType;
    const ok = addBackgroundLink(trimmed, explicitType);
    if (ok) {
      setUrlInput("");
      showToast(
        isCp || explicitType === 'codepen'
          ? (lang === "vi" ? "Đã thêm và kích hoạt hình nền CodePen thành công!" : "CodePen Live Wallpaper applied successfully!")
          : (lang === "vi" ? "Đã thêm và kích hoạt hình nền thành công!" : "Background added and applied successfully!")
      );
    }
  };

  const handleCopyJson = () => {
    const json = exportConfigToJson();
    navigator.clipboard.writeText(json);
    setCopiedJson(true);
    showToast(lang === "vi" ? "Đã sao chép cấu hình JSON vào bộ nhớ tạm!" : "Copied JSON configuration to clipboard!");
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
      setJsonError(lang === "vi" ? "Vui lòng dán chuỗi JSON vào ô bên dưới." : "Please paste a JSON string.");
      return;
    }
    const result = importConfigFromJson(jsonPasteInput);
    if (result.success) {
      showToast(result.message);
      setJsonPasteInput("");
      setShowJsonStudio(false);
    } else {
      setJsonError(result.message);
    }
  };

  // Filtered List (PROMPT #9)
  const filteredWallpapers = useMemo(() => {
    return config.items;
  }, [config.items]);

  const totalImages = useMemo(() => config.items.filter(item => item.type === 'image' || !item.type).length, [config.items]);
  const totalVideos = useMemo(() => config.items.filter(item => item.type === 'video').length, [config.items]);
  const totalCss = useMemo(() => config.items.filter(item => item.type === 'css').length, [config.items]);
  const totalCodePen = useMemo(() => config.items.filter(item => item.type === 'codepen').length, [config.items]);

  return (
    <section 
      id="wallpapers" 
      className="relative w-full min-h-full flex flex-col justify-start items-center p-2 sm:p-4 lg:p-6 font-sans text-slate-800 dark:text-slate-100"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFileUpload}
        className="hidden"
      />
      {/* Main Card Hình nền */}
      <div className="w-full bg-transparent flex flex-col gap-4">

        {/* Container Hình nền - đem nội dung ra ngoài thẻ chứa */}
        <div 
          id="info-card-wallpapers" 
          className="w-full flex flex-col gap-6 relative z-10"
        >
          {/* Header Card Hình nền */}
          <PageCardHeader pageId="wallpapers">
            {/* Dòng 4: Header Action Bar & Thống kê */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1 w-full">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-5 bg-sky-600 dark:bg-sky-400 rounded-full shrink-0" />
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xs">
                  <div className="px-2.5 py-1 rounded-lg bg-white dark:bg-white/5 border border-slate-200/60 dark:border-transparent flex items-center gap-1.5 text-center shadow-xs">
                    <ImageIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span className="text-caption font-black text-slate-800 dark:text-white">{totalImages}</span>
                    <span className="text-3xs text-slate-600 dark:text-slate-400 font-medium">{lang === "vi" ? "ảnh" : "img"}</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-white dark:bg-white/5 border border-slate-200/60 dark:border-transparent flex items-center gap-1.5 text-center shadow-xs">
                    <VideoIcon className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-caption font-black text-slate-800 dark:text-white">{totalVideos}</span>
                    <span className="text-3xs text-slate-600 dark:text-slate-400 font-medium">vid</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-white dark:bg-white/5 border border-slate-200/60 dark:border-transparent flex items-center gap-1.5 text-center shadow-xs">
                    <Code className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-caption font-black text-slate-800 dark:text-white">{totalCss}</span>
                    <span className="text-3xs text-slate-600 dark:text-slate-400 font-medium">CSS</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-white dark:bg-white/5 border border-slate-200/60 dark:border-transparent flex items-center gap-1.5 text-center shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                    <span className="text-caption font-black text-slate-800 dark:text-white">{totalCodePen}</span>
                    <span className="text-3xs text-slate-600 dark:text-slate-400 font-medium">CodePen</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 md:justify-end ml-auto">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddControls(!showAddControls);
                  }}
                  className={`py-1.5 px-3 rounded-xl font-bold text-caption flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer border ${
                    showAddControls 
                      ? "bg-blue-600 text-white border-blue-500 shadow-blue-500/30" 
                      : "bg-white hover:bg-slate-50 dark:bg-slate-900/80 dark:hover:bg-slate-800 text-slate-800 dark:text-white border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === "vi" ? "Thêm nền" : "Add"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                  className="py-1.5 px-3 rounded-xl font-bold text-caption flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer border bg-white hover:bg-slate-50 dark:bg-slate-900/80 dark:hover:bg-slate-800 text-slate-800 dark:text-white border-slate-200 dark:border-slate-800"
                >
                  <Upload className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  <span>{lang === "vi" ? "Nhập JSON" : "Import"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    downloadJsonFile();
                  }}
                  className="py-1.5 px-3 rounded-xl font-bold text-caption flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer border bg-white hover:bg-slate-50 dark:bg-slate-900/80 dark:hover:bg-slate-800 text-slate-800 dark:text-white border-slate-200 dark:border-slate-800"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  <span>{lang === "vi" ? "Xuất JSON" : "Export"}</span>
                </button>
              </div>
            </div>
          </PageCardHeader>
          {/* Toast Alert */}
        {successToast && (
          <div className="bg-emerald-500/15 border border-emerald-500/30 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-2.5 shadow-sm animate-fadeIn">
            <CheckCheck className="w-5 h-5 text-emerald-500" />
            <span>{successToast}</span>
          </div>
        )}

        {/* ================= 2. QUICK ADD BY URL & DISPLAY TUNING CONTROLS ================= */}
        {showAddControls && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-fadeIn">
            
            {/* LEFT: Quick Add URL Box (7 Cols) */}
            <div className="lg:col-span-7 glass-card p-5 sm:p-6 rounded-3xl border border-brand-border/60 shadow-md space-y-4">
              <div className="flex items-center justify-end">
                {/* Type Switcher */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-brand-border/40 text-2xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setSelectedType('auto')}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${selectedType === 'auto' ? 'bg-blue-600 text-white shadow-xs' : 'text-brand-text-muted hover:text-brand-text-light'}`}
                  >
                    Auto
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedType('image')}
                    className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors ${selectedType === 'image' ? 'bg-blue-600 text-white shadow-xs' : 'text-brand-text-muted hover:text-brand-text-light'}`}
                  >
                    <ImageIcon className="w-3 h-3" />
                    <span>Ảnh</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedType('video')}
                    className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors ${selectedType === 'video' ? 'bg-blue-600 text-white shadow-xs' : 'text-brand-text-muted hover:text-brand-text-light'}`}
                  >
                    <VideoIcon className="w-3 h-3" />
                    <span>Video</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedType('css')}
                    className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors ${selectedType === 'css' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-500 hover:text-emerald-400 font-bold'}`}
                  >
                    <Code className="w-3 h-3" />
                    <span>Code CSS</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedType('codepen')}
                    className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors ${selectedType === 'codepen' ? 'bg-amber-600 text-white shadow-xs' : 'text-amber-500 hover:text-amber-400 font-bold'}`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>CodePen</span>
                  </button>
                </div>
              </div>

              {/* Form depending on selectedType */}
              {selectedType === 'codepen' ? (
                <form onSubmit={handleAddLink} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder={lang === "vi" ? "Dán link CodePen (VD: https://codepen.io/user/pen/abc123)..." : "Paste CodePen URL (e.g., https://codepen.io/user/pen/abc123)..."}
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-2xl glass-surface border border-amber-500/40 text-brand-text-light placeholder-brand-text-muted focus:outline-hidden focus:ring-2 focus:ring-amber-500 shadow-inner"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{lang === "vi" ? "Thêm nền CodePen" : "Add CodePen Wallpaper"}</span>
                    </button>
                  </div>

                  {inputError && (
                    <p className="text-xs text-red-500 font-medium pl-1">{inputError}</p>
                  )}
                </form>
              ) : selectedType === 'css' ? (
                <form onSubmit={handleAddLink} className="space-y-3">
                  {/* Preset chips */}
                  <div className="space-y-1.5">
                    <span className="text-2xs font-bold text-brand-text-muted flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{lang === "vi" ? "Mẫu CSS nền có sẵn (nhấp để nạp code):" : "CSS Wallpaper Presets (click to load):"}</span>
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

                  {/* Name Input */}
                  <input
                    type="text"
                    placeholder={lang === "vi" ? "Tên hình nền CSS (VD: Cực quang Neon...)" : "CSS Wallpaper Name..."}
                    value={cssNameInput}
                    onChange={(e) => setCssNameInput(e.target.value)}
                    className="w-full px-4 py-2 text-xs sm:text-sm rounded-xl glass-surface border border-brand-border text-brand-text-light placeholder-brand-text-muted focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-inner"
                  />

                  {/* Code Editor with Live Thumbnail Preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-8">
                      <textarea
                        rows={5}
                        placeholder={lang === "vi" ? "Nhập mã CSS (VD: background: linear-gradient(...); hoặc @keyframes...)" : "Enter CSS rules..."}
                        value={cssCodeInput}
                        onChange={(e) => setCssCodeInput(e.target.value)}
                        className="w-full p-3 text-xs font-mono rounded-xl glass-surface border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 placeholder-brand-text-muted focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-inner"
                      />
                    </div>
                    {/* Live mini preview */}
                    <div className="sm:col-span-4 flex flex-col gap-1">
                      <span className="text-3xs font-bold text-brand-text-muted">Live Preview:</span>
                      <div className="w-full h-24 rounded-xl border border-brand-border/60 overflow-hidden relative shadow-inner bg-slate-950">
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

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Code className="w-4 h-4" />
                      <span>{lang === "vi" ? "Thêm & Áp dụng nền CSS" : "Add & Apply CSS Wallpaper"}</span>
                    </button>
                  </div>

                  {inputError && (
                    <p className="text-xs text-red-500 font-medium pl-1">{inputError}</p>
                  )}
                </form>
              ) : (
                <form onSubmit={handleAddLink} className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder={lang === "vi" ? "Dán link ảnh (.jpg, .png, Unsplash, Pinterest...) hoặc video (.mp4)..." : "Paste image (.jpg, .png...) or video (.mp4, stream) URL..."}
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-2xl glass-surface border border-brand-border text-brand-text-light placeholder-brand-text-muted focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-inner"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === "vi" ? "Thêm & Áp dụng" : "Add & Apply"}</span>
                    </button>
                  </div>

                  {inputError && (
                    <p className="text-xs text-red-500 font-medium pl-1">{inputError}</p>
                  )}
                </form>
              )}

              <div className="flex items-center justify-between text-2xs text-brand-text-muted pt-1">
                <span>💡 {lang === "vi" ? "Hệ thống tự động lưu vĩnh viễn vào bộ nhớ trình duyệt." : "Auto-saved permanently in browser storage."}</span>
                <button 
                  type="button" 
                  onClick={resetToDefaultJsonLibrary} 
                  className="text-blue-500 hover:underline flex items-center gap-1 font-semibold"
                  title="Khôi phục toàn bộ danh sách 25+ hình nền gốc từ file JSON"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{lang === "vi" ? "Khôi phục kho JSON gốc" : "Restore original JSON library"}</span>
                </button>
              </div>
            </div>

            {/* RIGHT: Live Visual Display Tuning (5 Cols) */}
            <div className="lg:col-span-5 glass-card p-5 sm:p-6 rounded-3xl border border-brand-border/60 shadow-md flex flex-col justify-between space-y-4">
              <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                <span>{lang === "vi" ? "Tùy chỉnh hiệu ứng hiển thị:" : "Display Tuning:"}</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Overlay Dim Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-brand-text-light">
                    <span>{lang === "vi" ? "Độ tối lớp phủ" : "Overlay Dim"}</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{config.overlayOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    value={config.overlayOpacity}
                    onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Blur Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-brand-text-light">
                    <span>{lang === "vi" ? "Độ mờ hậu cảnh" : "Background Blur"}</span>
                    <span className="font-mono text-purple-600 dark:text-purple-400">{config.blurAmount}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={config.blurAmount}
                    onChange={(e) => setBlurAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-brand-border/50">
                <button
                  onClick={resetToDefaultGradient}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                    config.activeType === 'gradient'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'glass-surface border-brand-border text-brand-text-light hover:border-blue-400'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === "vi" ? "Nền Gradient Mặc Định" : "Default Gradient"}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={downloadJsonFile}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-brand-text-light border border-brand-border text-xs transition-colors"
                    title="Tải file JSON cấu hình"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleCopyJson}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-brand-text-light border border-brand-border text-xs transition-colors"
                    title="Sao chép JSON"
                  >
                    {copiedJson ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================= 3. JSON STUDIO EXPANDABLE DRAWER ================= */}
        {showJsonStudio && (
          <div className="glass-card p-6 rounded-3xl border border-purple-500/30 shadow-xl bg-purple-50/20 dark:bg-purple-950/20 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-purple-200/50 dark:border-purple-800/50">
              <div className="flex items-center gap-2.5">
                <FileJson className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
                <h3 className="text-sm sm:text-base font-black text-brand-text-light uppercase tracking-wide">
                  {lang === "vi" ? "JSON Studio • Nhập / Xuất & Chỉnh sửa trực tiếp" : "JSON Studio • Raw Config & Live Import"}
                </h3>
              </div>
              <div className="flex items-center gap-2">

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{lang === "vi" ? "Tải lên file .json" : "Upload .json"}</span>
                </button>
                <button
                  onClick={downloadJsonFile}
                  className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-brand-text-light rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === "vi" ? "Tải về .json" : "Download .json"}</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-brand-text-muted">
              {lang === "vi" 
                ? "Dán chuỗi JSON chứa danh sách hình nền (định dạng `customWallpapers` hoặc `allLinks`) để nhập tự động vào hệ thống:" 
                : "Paste raw JSON data containing wallpaper links to import directly:"}
            </p>

            <textarea
              rows={5}
              placeholder={lang === "vi" ? "Dán nội dung file JSON vào đây..." : "Paste JSON string here..."}
              value={jsonPasteInput}
              onChange={(e) => setJsonPasteInput(e.target.value)}
              className="w-full p-3 rounded-2xl glass-surface border border-brand-border text-xs font-mono text-brand-text-light placeholder-brand-text-muted focus:outline-hidden focus:ring-2 focus:ring-purple-500 shadow-inner"
            />

            {jsonError && (
              <p className="text-xs text-red-500 font-bold">{jsonError}</p>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setJsonPasteInput(exportConfigToJson())}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-brand-text-light text-xs font-bold rounded-xl transition-all"
              >
                {lang === "vi" ? "Nạp JSON hiện tại vào ô" : "Fill current JSON"}
              </button>
              <button
                onClick={handleImportPastedJson}
                className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-md transition-all hover:opacity-90"
              >
                {lang === "vi" ? "Áp dụng JSON vừa dán" : "Import & Sync Now"}
              </button>
            </div>
          </div>
        )}

        {/* ================= 4. WALLPAPERS INTERACTIVE GALLERY BENTO GRID ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
          
          {/* Default Gradient Card */}
          <div 
            onDoubleClick={() => {
              resetToDefaultGradient();
            }}
            className={`group cursor-pointer aspect-video p-0 border overflow-hidden transition-all duration-300 relative shadow-md hover:shadow-xl hover:scale-103 ${
              config.activeType === 'gradient'
                ? 'border-blue-500 ring-2 ring-blue-500/40 bg-blue-50/20 dark:bg-blue-950/20'
                : 'border-slate-200/90 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 hover:border-blue-400'
            }`}
            style={{ padding: 0, borderRadius: 'var(--theme-radius-card, 10px)' }}
            title={lang === "vi" ? "Mặc định (Plain Mica Gradient) • Nhấp đúp để áp dụng" : "Default Mica Gradient • Double click to apply"}
          >
            <div className="w-full h-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white/80 animate-pulse" />
              
              {config.activeType === 'gradient' && (
                <div className="absolute inset-0 bg-blue-600/25 flex items-center justify-center">
                  <div className="p-1.5 rounded-full bg-blue-600 text-white shadow-md">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </div>

            {/* Hover Tooltip Overlay */}
            <div className="absolute inset-0 bg-white/95 dark:bg-slate-950/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 pointer-events-none z-10 backdrop-blur-xs">
              <span className="text-3xs font-black text-slate-900 dark:text-white truncate">
                {lang === "vi" ? "Mặc định (Gradient)" : "Default Gradient"}
              </span>
              <span className="text-3xs text-blue-600 dark:text-blue-300 font-extrabold">
                {lang === "vi" ? "Nháy đúp để áp dụng" : "Double click to set"}
              </span>
            </div>
          </div>

          {/* Wallpapers List from JSON */}
          {filteredWallpapers.map((item, idx) => {
            const isActive = config.activeId === item.id;
            return (
              <div
                key={item.id}
                onDoubleClick={() => {
                  setActiveBackground(item.id, item.type, item.url, item.cssCode);
                }}
                className={`group cursor-pointer aspect-video p-0 border overflow-hidden transition-all duration-300 relative shadow-md hover:shadow-xl hover:scale-103 ${
                  isActive
                    ? 'border-blue-500 ring-2 ring-blue-500/40 bg-blue-50/20 dark:bg-blue-950/20'
                    : 'border-slate-200/90 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 hover:border-blue-400'
                }`}
                style={{ padding: 0, borderRadius: 'var(--theme-radius-card, 10px)' }}
                title={`${item.name || `Wallpaper #${idx + 1}`} • ${lang === "vi" ? "Nhấp đúp để áp dụng" : "Double click to apply"}`}
              >
                {/* Media Preview Container */}
                <div className="w-full h-full bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
                  {item.type === 'css' ? (
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
                      {item.previewUrl && item.previewUrl.startsWith('http') ? (
                        <img
                          src={item.previewUrl}
                          alt={item.name || "CodePen Wallpaper"}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-950 via-slate-900 to-black p-3 text-center">
                          <Sparkles className="w-6 h-6 text-amber-400 mb-1 animate-pulse" />
                          <span className="text-3xs font-bold text-amber-300">CodePen Live</span>
                        </div>
                      )}
                    </div>
                  ) : item.type === 'video' ? (
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                      muted
                      autoPlay
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={item.previewUrl || item.url}
                      alt={item.name || "Wallpaper"}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Active Indicator Overlay */}
                  {isActive && (
                    <div className="absolute inset-0 bg-blue-600/25 flex items-center justify-center">
                      <div className="p-1.5 rounded-full bg-blue-600 text-white shadow-md">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}

                  {/* Type Badge top left (very tiny) */}
                  <div className={`absolute top-1 left-1 px-1 py-0.2 rounded backdrop-blur-xs text-3xs font-black scale-90 origin-top-left z-10 ${
                    item.type === 'css'
                      ? 'bg-emerald-600/90 text-white shadow-xs'
                      : item.type === 'codepen'
                      ? 'bg-amber-600/90 text-white shadow-xs'
                      : 'bg-white/60 dark:bg-black/60 text-slate-900 dark:text-white'
                  }`}>
                    {item.type === 'css' ? 'CSS' : item.type === 'codepen' ? 'CODEPEN' : item.type === 'video' ? 'LIVE' : (item.type === 'animated-gradient' || item.type === 'beach') ? 'DYNAMIC' : '4K'}
                  </div>

                  {/* Floating Action Buttons */}
                  <div className="absolute top-1 right-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    {item.type === 'css' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setInspectingCssItem(item);
                        }}
                        className="p-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                        title="Xem / Sao chép mã CSS"
                      >
                        <Code className="w-2.5 h-2.5" />
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeBackground(item.id);
                      }}
                      className="p-1 rounded bg-rose-600/90 hover:bg-rose-700 text-white transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                  </div>

                  {/* Hover Tooltip Overlay with Title */}
                  <div className="absolute inset-0 bg-white/95 dark:bg-slate-950/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 pointer-events-none z-10 backdrop-blur-xs">
                    <span className="text-3xs font-black text-slate-900 dark:text-white truncate">
                      {item.name || `Wallpaper #${idx + 1}`}
                    </span>
                    <span className="text-3xs text-slate-600 dark:text-slate-300 font-semibold capitalize truncate">
                      {item.category || "custom"} • {item.type}
                    </span>
                    <span className="text-3xs text-blue-600 dark:text-blue-300 font-extrabold">
                      {lang === "vi" ? "Nháy đúp để áp dụng" : "Double click to set"}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* ================= 5. CSS CODE INSPECTOR & COPY MODAL ================= */}
      {inspectingCssItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-slate-800 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{inspectingCssItem.name}</h4>
              </div>
              <button
                onClick={() => setInspectingCssItem(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Live Preview Box */}
            <div className="w-full h-32 rounded-2xl overflow-hidden relative border border-slate-700 shadow-inner bg-slate-950">
              <style dangerouslySetInnerHTML={{ __html: `
                .modal-inspect-css-box {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  inset: 0;
                }
                ${formatScopedCss(inspectingCssItem.cssCode || '', 'modal-inspect-css-box')}
              `}} />
              <div className="modal-inspect-css-box w-full h-full" />
            </div>

            {/* Code Block */}
            <div className="space-y-1">
              <span className="text-2xs font-bold text-slate-400">CSS Code:</span>
              <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto max-h-48 whitespace-pre-wrap">
                {inspectingCssItem.cssCode}
              </pre>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  if (inspectingCssItem.cssCode) {
                    navigator.clipboard.writeText(inspectingCssItem.cssCode);
                    setCopiedInspectCode(true);
                    setTimeout(() => setCopiedInspectCode(false), 2000);
                  }
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                {copiedInspectCode ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedInspectCode ? "Đã chép CSS!" : "Sao chép mã CSS"}</span>
              </button>

              <button
                onClick={() => {
                  setActiveBackground(inspectingCssItem.id, inspectingCssItem.type, inspectingCssItem.url, inspectingCssItem.cssCode);
                  setInspectingCssItem(null);
                  showToast(lang === "vi" ? "Đã áp dụng hình nền CSS!" : "Applied CSS Wallpaper!");
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{lang === "vi" ? "Áp dụng làm hình nền" : "Apply as Wallpaper"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      </div>

    </section>
  );
}
