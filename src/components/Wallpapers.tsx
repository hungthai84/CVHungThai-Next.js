import React, { useState, useMemo } from "react";
import { 
  Plus, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Trash2, 
  Check, 
  Sliders, 
  Sparkles, 
  Copy, 
  CheckCheck,
  Maximize2,
  RefreshCw,
  X,
  Code,
  Search,
  Eye,
  ArrowUpRight,
  Info,
  Filter,
  Upload,
  Cloud,
  FileJson,
  FileUp,
  Download
} from "lucide-react";
import { useBackground } from "../context/BackgroundContext";
import { BackgroundItem } from "../types/background";
import { useLanguage } from "../i18n";
import { useTheme } from "../context/ThemeContext";
import { PageCardHeader } from "./PageCardHeader";
import { WALLPAPER_CATEGORIES, CSS_PRESET_TEMPLATES } from "../data/wallpapers";
import { LazyImage } from "./LazyImage";
import { playUiSound } from "../lib/sound";
import { AnimatePresence, motion } from "framer-motion";

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
    resetToDefaultJsonLibrary,
    uploadWallpaperFile,
    importConfigFromJson,
    exportConfigToJson,
    downloadJsonFile
  } = useBackground();

  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isVi = lang === "vi";

  // Search & Category Filters
  const [activeCategory, setActiveCategory] = useState<string>("image");
  const [searchQuery, setSearchQuery] = useState("");

  // Input states
  const [urlInput, setUrlInput] = useState("");
  const [selectedType, setSelectedType] = useState<'auto' | 'image' | 'video' | 'css' | 'codepen'>('auto');
  const [inputError, setInputError] = useState("");
  const [successToast, setSuccessToast] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      playUiSound("pop");
      if (uploadWallpaperFile) {
        const url = await uploadWallpaperFile(file);
        if (url) {
          showToast(isVi ? `Đã lưu vĩnh viễn hình nền "${file.name}" lên Cloud Database!` : `Saved "${file.name}" to Cloud Database!`);
        }
      }
    } catch (err) {
      console.error(err);
      setInputError(isVi ? "Lỗi tải ảnh lên Cloud!" : "Failed to upload image to Cloud!");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  // CSS Code Input state
  const [cssNameInput, setCssNameInput] = useState("");
  const [cssCodeInput, setCssCodeInput] = useState(CSS_PRESET_TEMPLATES[0].code);
  const [inspectingCssItem, setInspectingCssItem] = useState<BackgroundItem | null>(null);
  const [copiedInspectCode, setCopiedInspectCode] = useState(false);

  // Preview Lightbox
  const [previewItem, setPreviewItem] = useState<BackgroundItem | null>(null);

  // Expandable Control Drawers
  const [showAddControls, setShowAddControls] = useState(false);

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

  // JSON List Box Modal State
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [jsonInputText, setJsonInputText] = useState("");
  const [jsonStatusMsg, setJsonStatusMsg] = useState("");

  const handleExportJson = () => {
    try {
      const dataStr = exportConfigToJson ? exportConfigToJson() : JSON.stringify(config.items, null, 2);
      setJsonInputText(dataStr);
      navigator.clipboard.writeText(dataStr);
      setJsonStatusMsg(isVi ? "Đã sao chép cấu trúc JSON vào bộ nhớ tạm!" : "Copied JSON to clipboard!");
      try { playUiSound("click"); } catch {}
    } catch (err) {
      setJsonStatusMsg(isVi ? "Lỗi trích xuất JSON" : "Failed to export JSON");
    }
  };

  const handleDownloadJson = () => {
    try {
      if (downloadJsonFile) {
        downloadJsonFile();
      } else {
        const dataStr = JSON.stringify(config.items, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `wallpapers-config-${new Date().toISOString().slice(0, 10)}.json`;
        link.click();
        URL.revokeObjectURL(url);
      }
      setJsonStatusMsg(isVi ? "Đã tải xuống tệp JSON!" : "Downloaded JSON file!");
      try { playUiSound("click"); } catch {}
    } catch (err) {
      setJsonStatusMsg(isVi ? "Lỗi tải tệp" : "Download failed");
    }
  };

  const handleImportJson = (overwrite: boolean = false) => {
    if (!jsonInputText.trim()) {
      setJsonStatusMsg(isVi ? "Vui lòng nhập hoặc dán nội dung JSON trước khi áp dụng." : "Please paste JSON before applying.");
      return;
    }

    try {
      if (importConfigFromJson) {
        const res = importConfigFromJson(jsonInputText, overwrite);
        if (res.success) {
          setJsonStatusMsg(res.message);
          showToast(res.message);
          try { playUiSound("click"); } catch {}
        } else {
          setJsonStatusMsg(res.message);
        }
      } else {
        const parsed = JSON.parse(jsonInputText);
        const list = Array.isArray(parsed) ? parsed : (parsed.items || parsed.allLinks || parsed.customWallpapers || []);
        if (!Array.isArray(list) || list.length === 0) {
          setJsonStatusMsg(isVi ? "Dữ liệu JSON phải chứa danh sách hình nền hợp lệ." : "JSON must contain valid wallpapers.");
          return;
        }
        setJsonStatusMsg(isVi ? `Đã nhập thành công ${list.length} hình nền!` : `Imported ${list.length} wallpapers!`);
        showToast(isVi ? `Đã nhập thành công ${list.length} hình nền!` : `Imported ${list.length} wallpapers!`);
      }
    } catch (err: any) {
      setJsonStatusMsg(isVi ? `Cú pháp JSON không hợp lệ: ${err.message || "Lỗi đọc dữ liệu"}` : "Invalid JSON syntax.");
    }
  };

  // List of wallpapers
  const filteredWallpapers = useMemo(() => {
    return config.items;
  }, [config.items]);

  return (
    <section 
      id="wallpapers" 
      className="relative w-full h-auto overflow-hidden flex flex-col gap-4 sm:gap-5 max-w-7xl mx-auto p-3.5 sm:p-5 font-sans text-slate-800 dark:text-slate-100 transition-colors duration-500 select-none relative z-10 items-center"
    >

        {/* Header Card */}
        <PageCardHeader pageId="wallpapers">
          <div className="flex flex-col md:flex-row md:items-center justify-end gap-2.5 pt-1 w-full">
            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2 md:justify-end ml-auto">
              <button
                type="button"
                onClick={() => {
                  try { playUiSound("click"); } catch {}
                  setJsonInputText(JSON.stringify(config.items, null, 2));
                  setJsonStatusMsg("");
                  setShowJsonModal(!showJsonModal);
                }}
                className="py-1.5 px-3 rounded-xl font-bold text-caption flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer border bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-500 shadow-indigo-500/20"
                title={isVi ? "Nhập/Xuất cấu hình danh sách hình nền dạng JSON" : "Import/Export Wallpapers JSON"}
              >
                <FileJson className="w-3.5 h-3.5" />
                <span>{isVi ? "Cấu hình JSON" : "JSON Box"}</span>
              </button>

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

        {/* INLINE JSON CONFIGURATION BOX */}
        {showJsonModal && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ borderRadius: "var(--theme-radius-card, 16px)" }}
            className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 overflow-hidden"
          >
            {/* Header / Title */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <FileJson className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                    {isVi ? "Cấu hình JSON Danh sách Hình Nền" : "Wallpapers JSON Configuration"}
                  </h3>
                  <p className="text-2xs text-slate-500 dark:text-slate-400 font-mono">
                    {isVi ? "Sao chép mã JSON danh sách hình nền hoặc dán JSON để nhập vào hệ thống" : "Export or import wallpapers JSON payload"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowJsonModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Status Message */}
            {jsonStatusMsg && (
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-xs font-semibold text-indigo-700 dark:text-indigo-300 font-play">
                {jsonStatusMsg}
              </div>
            )}

            {/* JSON Textarea */}
            <div className="flex flex-col gap-2">
              <label className="text-2xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                {isVi ? "Dữ liệu JSON Hình Nền (Array of Wallpaper Objects):" : "Wallpaper JSON Array Payload:"}
              </label>
              <textarea
                value={jsonInputText}
                onChange={(e) => setJsonInputText(e.target.value)}
                placeholder='[ { "id": "custom-1", "name": "...", "url": "...", "type": "image" } ]'
                className="w-full min-h-[180px] p-3.5 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-y"
                spellCheck={false}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{isVi ? "Sao chép JSON" : "Copy JSON"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadJson}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isVi ? "Tải xuống file" : "Download JSON"}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    try { playUiSound("click"); } catch {}
                    setJsonInputText(JSON.stringify(config.items, null, 2));
                    setJsonStatusMsg(isVi ? "Đã đặt lại dữ liệu cấu hình gốc!" : "Reset to active config!");
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 text-xs font-bold cursor-pointer"
                >
                  {isVi ? "Đặt lại" : "Reset"}
                </button>

                {/* Import from JSON File Button */}
                <label className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs">
                  <FileUp className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{isVi ? "Nhập file" : "Upload JSON"}</span>
                  <input
                    type="file"
                    accept=".json,application/json"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        try {
                          const content = event.target?.result as string;
                          setJsonInputText(content);
                          try {
                            const parsed = JSON.parse(content);
                            const count = Array.isArray(parsed) 
                              ? parsed.length 
                              : (parsed.items?.length || parsed.allLinks?.length || parsed.customWallpapers?.length || (parsed.url ? 1 : 0));
                            setJsonStatusMsg(isVi ? `✓ Đã đọc tệp "${file.name}" (phát hiện ${count} hình nền). Nhấn "Áp dụng / Nhập JSON" để hoàn tất.` : `✓ Loaded "${file.name}" (${count} wallpapers).`);
                          } catch {
                            setJsonStatusMsg(isVi ? `✓ Đã nạp nội dung tệp "${file.name}".` : `✓ Loaded file "${file.name}".`);
                          }
                          try { playUiSound("click"); } catch {}
                        } catch {
                          setJsonStatusMsg(isVi ? "Không thể đọc tệp JSON." : "Failed to read JSON file.");
                        }
                      };
                      reader.readAsText(file);
                      e.target.value = "";
                    }}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => handleImportJson(false)}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
                  title={isVi ? "Cập nhật hình nền trùng lặp và thêm hình nền mới" : "Update existing and add new wallpapers"}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isVi ? "Cập nhật & Nạp" : "Merge JSON"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleImportJson(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
                  title={isVi ? "Thay thế toàn bộ danh sách hiện tại bằng danh sách trong JSON" : "Replace entire current wallpaper list with JSON payload"}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{isVi ? "Ghi đè" : "Overwrite All"}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* QUICK ADD BY URL CONTROLS */}
        {showAddControls && (
          <div 
            style={{ borderRadius: "var(--theme-radius-card, 16px)" }}
            className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 animate-fadeIn"
          >

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

                  {/* File Upload Button to Cloud */}
                  <label 
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm rounded-2xl transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer active:scale-95 shadow-xs"
                    title={isVi ? "Tải file ảnh từ máy và lưu vào Cloud lâu dài" : "Upload image file to Cloud"}
                  >
                    <Upload className="w-4 h-4 text-cyan-500" />
                    <span>{isUploading ? (isVi ? "Đang tải..." : "Uploading...") : (isVi ? "Tải file lên" : "Upload File")}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      disabled={isUploading}
                      onChange={handleFileUpload} 
                    />
                  </label>

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

            <div className="flex flex-wrap items-center justify-between gap-2 text-2xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/50 dark:border-white/5">
              <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-semibold">
                <Cloud className="w-3.5 h-3.5 text-cyan-500" />
                <span>{isVi ? "Lưu trữ lâu dài trên Cloud Database Firestore (không mất khi xóa cookie/cache hay đổi trình duyệt)." : "Permanently synced to Cloud Firestore (never lost on cache clear)."}</span>
              </span>
              <button 
                type="button" 
                onClick={() => resetToDefaultJsonLibrary()} 
                className="text-blue-500 hover:underline flex items-center gap-1 font-semibold cursor-pointer shrink-0"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{isVi ? "Khôi phục kho vĩnh viễn" : "Restore permanent library"}</span>
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
            
            {/* Default Gradient Card */}
            <div 
              onClick={() => {
                try { playUiSound("click"); } catch {}
                resetToDefaultGradient();
              }}
              className={`group cursor-pointer aspect-video p-0 border overflow-hidden transition-all duration-300 relative shadow-md hover:shadow-xl hover:scale-103 ${
                config.activeType === 'gradient'
                  ? 'border-blue-500 ring-2 ring-blue-500/40 bg-blue-50/20 dark:bg-blue-950/20'
                  : 'border-slate-200/90 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 hover:border-blue-400'
              }`}
              style={{ borderRadius: 'var(--theme-radius-card, 12px)' }}
              title={isVi ? "Nền Gradient mặc định" : "Default Gradient"}
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
              <div className="absolute inset-0 bg-white/95 dark:bg-slate-950/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 pointer-events-none z-10 backdrop-blur-xs font-play">
                <span className="text-3xs font-black text-slate-900 dark:text-white truncate">
                  {isVi ? "Mặc định (Gradient)" : "Default Gradient"}
                </span>
                <span className="text-3xs text-blue-600 dark:text-blue-300 font-extrabold">
                  {isVi ? "Nhấp để kích hoạt" : "Click to apply"}
                </span>
              </div>
            </div>

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
                        <LazyImage
                          src={item.previewUrl || item.url}
                          alt={item.name || "CodePen Wallpaper"}
                          className="w-full h-full object-cover"
                          fallbackSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400"
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
                      <LazyImage
                        src={item.previewUrl || item.url}
                        alt={item.name || "Wallpaper"}
                        className="w-full h-full object-cover"
                        fallbackSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400"
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
                      item.type === 'css'
                        ? 'bg-emerald-600/90 text-white'
                        : item.type === 'codepen'
                        ? 'bg-amber-600/90 text-white'
                        : item.type === 'video'
                        ? 'bg-cyan-600/90 text-white'
                        : 'bg-slate-900/70 text-white'
                    }`}>
                      {item.type === 'css' ? 'CSS' : item.type === 'codepen' ? 'CODEPEN' : item.type === 'video' ? 'VIDEO' : '4K'}
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

                        {item.isCustom && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeBackground(item.id);
                            }}
                            className="p-1 rounded-md bg-rose-600/80 hover:bg-rose-600 text-white transition cursor-pointer"
                            title={isVi ? "Xóa hình nền này" : "Delete Wallpaper"}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
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
                  onClick={() => setPreviewItem(null)}
                  className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Preview Frame */}
            <div className="relative flex-1 w-full h-full overflow-hidden bg-slate-950 flex items-center justify-center">
              {previewItem.type === 'css' ? (
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
                <LazyImage
                  src={previewItem.previewUrl || previewItem.url}
                  alt={previewItem.name}
                  className="w-full h-full object-contain"
                  objectFit="contain"
                />
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
