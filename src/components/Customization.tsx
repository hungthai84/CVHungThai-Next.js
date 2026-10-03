import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sliders, 
  Palette, 
  Layers, 
  MousePointer, 
  Volume2, 
  PanelBottom, 
  PanelTop,
  Type, 
  Check, 
  RotateCcw, 
  Copy, 
  Sun, 
  Moon, 
  Monitor,
  Minus,
  Plus,
  Sparkles, 
  Eye, 
  CheckCircle2, 
  VolumeX, 
  CloudRain, 
  Wind, 
  Radio, 
  Flame, 
  Crosshair, 
  CircleDot, 
  Dot, 
  Maximize2, 
  Columns, 
  EyeOff, 
  Pin, 
  Code2, 
  SlidersHorizontal, 
  Clock, 
  CloudSun, 
  ChevronDown, 
  ShieldCheck,
  Zap,
  Save,
  Download,
  Upload,
  RefreshCw,
  FileJson,
  Wrench,
  AlertTriangle,
  X,
  Play,
  Music,
  Menu,
  LayoutTemplate,
  FileText,
  Tag
} from "lucide-react";
import { PageCardHeader } from "./PageCardHeader";
import { useLanguage } from "../i18n";
import { useTheme, COLOR_PRESETS, ThemeType, ThemeMode } from "../context/ThemeContext";
import { useCursor } from "../context/CursorContext";
import { useSound } from "../context/SoundContext";
import { useFooter, FooterModalTab } from "../context/FooterContext";
import { useHeader } from "../context/HeaderContext";
import { CURSOR_STYLE_OPTIONS, CURSOR_COLOR_OPTIONS } from "../data/cursorData";
import { CursorStyleType } from "../types/cursor";
import { SOUND_PACK_OPTIONS, AMBIENT_SOUND_OPTIONS } from "../data/soundData";
import { AmbientSoundType } from "../types/sound";
import { FOOTER_PLACEMENT_OPTIONS } from "../data/footerData";
import { FooterPlacement } from "../types/footer";
import { 
  saveAsProductionDefaults, 
  getSavedProductionDefaults, 
  resetToFactoryDefaults, 
  exportConfigurationFile, 
  importConfigurationFromJson, 
  runSystemDiagnosticAndRepair,
  DiagnosticReport,
  SystemProductionConfig,
  FACTORY_DEFAULTS
} from "../services/systemSettingsService";
import { cn } from "../lib/utils";

const RADIUS_PRESETS = [
  {
    id: "sharp",
    radius: 4,
    cardRadius: 6,
    nameVi: "Tối Giản / Vuông (Sharp 4px)",
    nameEn: "Minimal Sharp (4px)",
    descVi: "Gọn gàng, chuẩn xác phong cách phẳng",
    descEn: "Clean, flat modern edge",
  },
  {
    id: "standard",
    radius: 10,
    cardRadius: 14,
    nameVi: "Chuẩn Mực Hệ Thống (Standard 10px)",
    nameEn: "System Standard (10px)",
    descVi: "Mặc định Master Agent Design System",
    descEn: "Standard design system default",
  },
  {
    id: "smooth",
    radius: 14,
    cardRadius: 18,
    nameVi: "Mềm Mại Hiện Đại (Smooth 14px)",
    nameEn: "Smooth Modern (14px)",
    descVi: "Bo cong mềm mại, thanh lịch",
    descEn: "Soft curved, refined modern look",
  },
  {
    id: "rounded",
    radius: 18,
    cardRadius: 22,
    nameVi: "Bo Tròn Nổi Bật (Rounded 18px)",
    nameEn: "Rounded Soft (18px)",
    descVi: "Đường cong nổi bật, thân thiện",
    descEn: "Friendly rounded card edges",
  },
  {
    id: "fluid",
    radius: 24,
    cardRadius: 28,
    nameVi: "Bo Cong Tối Đa (Extra Round 24px)",
    nameEn: "Extra Round Fluid (24px)",
    descVi: "Bento bubble cao cấp, mượt mà",
    descEn: "High curvature bento style",
  },
];

const TYPO_TOKENS = [
  { id: "display", labelVi: "Display (Tiêu đề lớn)", labelEn: "Display Heading", basePx: 48, size: "40–52px", weight: "700", leading: "1.15", sampleText: "Nguyễn Hùng Thái", Icon: Sparkles },
  { id: "h1", labelVi: "H1 (Tiêu đề chính)", labelEn: "H1 Heading", basePx: 36, size: "36–42px", weight: "700", leading: "1.20", sampleText: "Giám Đốc Chăm Sóc Khách Hàng", Icon: Type },
  { id: "h2", labelVi: "H2 (Tiêu đề mục)", labelEn: "H2 Section Title", basePx: 30, size: "28–34px", weight: "700", leading: "1.20", sampleText: "Kinh Nghiệm & Thành Tựu Vận Hành", Icon: Layers },
  { id: "h3", labelVi: "H3 (Tiêu đề phụ)", labelEn: "H3 Subtitle", basePx: 22, size: "20–24px", weight: "700", leading: "1.25", sampleText: "Kiến trúc hệ thống CSKH chuẩn quốc tế", Icon: SlidersHorizontal },
  { id: "card", labelVi: "Card Title (Thẻ)", labelEn: "Card Title", basePx: 19, size: "18–20px", weight: "700", leading: "1.30", sampleText: "Dự Án Vận Hành Đa Kênh Omnichannel", Icon: LayoutTemplate },
  { id: "nav-menu", labelVi: "Tiêu đề icon menu (Nav Menu)", labelEn: "Icon Menu Title", basePx: 13, size: "12–14px", weight: "600", leading: "1.25", sampleText: "Trang Chủ · Giới Thiệu · Học Vấn · Kinh Nghiệm", Icon: Menu },
  { id: "body", labelVi: "Body (Văn bản)", labelEn: "Body Text", basePx: 15, size: "15–16px", weight: "400", leading: "1.60", sampleText: "Tối ưu hóa hành trình khách hàng với hiệu suất tăng trưởng vượt bậc qua công nghệ số.", Icon: FileText },
  { id: "caption", labelVi: "Caption / Label", labelEn: "Caption/Label", basePx: 12, size: "12–13px", weight: "600", leading: "1.40", sampleText: "22+ NĂM KINH NGHIỆM VẬN HÀNH", Icon: Tag },
];

export default function Customization() {
  const { lang, setLang } = useLanguage();
  const isVi = lang === "vi";

  // Contexts
  const { 
    theme, 
    setTheme, 
    themeMode,
    setThemeMode,
    colorPreset, 
    setColorPreset, 
    activePalette, 
    fontScale, 
    setFontScale, 
    resetFontScale, 
    borderRadius, 
    setBorderRadius, 
    resetBorderRadius,
    borderRadiusCard,
    setBorderRadiusCard,
    resetBorderRadiusCard
  } = useTheme();

  const {
    cursorConfig,
    setCursorStyle,
    setCursorColor,
    setCursorSize,
    setEnableTrail,
    resetCursorConfig
  } = useCursor();

  const {
    soundConfig,
    setMasterVolume,
    setUiVolume,
    setAmbientVolume,
    setSoundPack,
    setAmbientSound,
    toggleMute,
    resetSoundConfig,
    playClick,
    playSuccess
  } = useSound();

  const {
    footerConfig,
    setPlacement,
    setStyleVariant,
    togglePin,
    toggleElementVisibility,
    updateFooterConfig,
    resetFooterConfig,
    footerModalTab,
    setFooterModalTab
  } = useFooter();

  const {
    headerConfig,
    isHeaderPinned,
    togglePin: toggleHeaderPin
  } = useHeader();

  // Active Tab state
  const [activeTab, setActiveTab] = useState<FooterModalTab>("customization");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [copiedCss, setCopiedCss] = useState(false);
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string | null>(null);

  // Typography Token Size Adjustments (±px per token)
  const [tokenAdjustments, setTokenAdjustments] = useState<Record<string, number>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("portfolio_typo_token_adjustments");
        return saved ? JSON.parse(saved) : {};
      } catch {
        return {};
      }
    }
    return {};
  });

  const handleAdjustTokenSize = (tokenId: string, delta: number) => {
    playClick();
    setTokenAdjustments(prev => {
      const current = prev[tokenId] || 0;
      const next = Math.max(-8, Math.min(12, current + delta));
      const updated = { ...prev, [tokenId]: next };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("portfolio_typo_token_adjustments", JSON.stringify(updated));
          document.documentElement.style.setProperty(`--token-adjust-${tokenId}`, `${next}px`);
        } catch {}
      }
      return updated;
    });
  };

  const handleResetTokenSize = (tokenId: string) => {
    playClick();
    setTokenAdjustments(prev => {
      const updated = { ...prev };
      delete updated[tokenId];
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("portfolio_typo_token_adjustments", JSON.stringify(updated));
          document.documentElement.style.removeProperty(`--token-adjust-${tokenId}`);
        } catch {}
      }
      return updated;
    });
  };

  // Border radius state
  const [tempBorderRadius, setTempBorderRadius] = useState(borderRadius);
  const [tempBorderRadiusCard, setTempBorderRadiusCard] = useState(borderRadiusCard);

  // Sync temp values when context values change
  useEffect(() => {
    setTempBorderRadius(borderRadius);
  }, [borderRadius]);

  useEffect(() => {
    setTempBorderRadiusCard(borderRadiusCard);
  }, [borderRadiusCard]);

  // Production Defaults Status State
  const [productionDefaultsStatus, setProductionDefaultsStatus] = useState<string>(() => {
    const saved = getSavedProductionDefaults();
    return saved?.savedFormattedDate || (isVi ? "Mặc định gốc nhà phát triển" : "Factory Standard Default");
  });

  // Diagnostic Report Modal State
  const [diagnosticReport, setDiagnosticReport] = useState<DiagnosticReport | null>(null);
  const [isDiagnosticModalOpen, setIsDiagnosticModalOpen] = useState(false);

  // Import JSON Modal State
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync tab with external requested tab (if any)
  useEffect(() => {
    if (footerModalTab) {
      setActiveTab(footerModalTab);
    }
  }, [footerModalTab]);

  const handleTabChange = (tabId: FooterModalTab) => {
    setActiveTab(tabId);
    setFooterModalTab(tabId);
    playClick();
  };

  const handleCopy = (text: string, tokenKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(tokenKey);
    playSuccess();
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleCopyCss = () => {
    const p1 = activePalette.find(p => p.id === "primary")?.hex || "#2563EB";
    const p2 = activePalette.find(p => p.id === "secondary")?.hex || "#6366F1";
    const p3 = activePalette.find(p => p.id === "accent")?.hex || "#06B6D4";
    const p4 = activePalette.find(p => p.id === "highlight")?.hex || "#8B5CF6";
    const p5 = activePalette.find(p => p.id === "soft")?.hex || "#38BDF8";

    const cssCode = theme === "glass-dark-neon" 
      ? `/* DARK NEON GLASS — 5 MÀU CHỦ ĐẠO */\n[data-theme="dark"] {\n  --color-primary: ${p1};   /* Main Action / Primary */\n  --color-secondary: ${p2}; /* Secondary Links / Nav */\n  --color-accent: ${p3};    /* Accent / Glow */\n  --color-highlight: ${p4}; /* Highlight Feature */\n  --color-soft: ${p5};      /* Soft Status / Positive */\n  --theme-radius: ${borderRadius}px;\n  --theme-radius-card: ${borderRadiusCard}px;\n  --font-scale: ${fontScale}%;\n}`
      : `/* LIGHT GLASS — 5 MÀU CHỦ ĐẠO */\n:root {\n  --color-primary: ${p1};   /* Primary Action */\n  --color-secondary: ${p2}; /* Secondary Indigo */\n  --color-accent: ${p3};    /* Accent Cyan */\n  --color-highlight: ${p4}; /* Highlight Violet */\n  --color-soft: ${p5};      /* Soft Sky */\n  --theme-radius: ${borderRadius}px;\n  --theme-radius-card: ${borderRadiusCard}px;\n  --font-scale: ${fontScale}%;\n}`;
    navigator.clipboard.writeText(cssCode);
    setCopiedCss(true);
    playSuccess();
    setTimeout(() => setCopiedCss(false), 2000);
  };

  const triggerResetFeedback = (msg: string) => {
    setResetSuccessMessage(msg);
    playSuccess();
    setTimeout(() => setResetSuccessMessage(null), 3000);
  };

  // 1. SAVE AS PRODUCTION DEFAULT HANDLER
  const handleSaveAsProductionDefault = () => {
    const configToSave: Partial<SystemProductionConfig> = {
      themeMode,
      theme,
      colorPreset,
      fontScale,
      borderRadius: tempBorderRadius,
      borderRadiusCard: tempBorderRadiusCard,
      cursor: cursorConfig,
      sound: soundConfig,
      footer: footerConfig,
      header: {
        isPinned: isHeaderPinned,
      },
      lang,
    };

    const saved = saveAsProductionDefaults(configToSave);
    setProductionDefaultsStatus(saved.savedFormattedDate || "Vừa cập nhật");
    triggerResetFeedback(
      isVi 
        ? "✅ Đã lưu cấu hình làm Cài đặt Mặc định Thực tế thành công! Mọi lượt mở website mới sẽ tự động nạp cấu hình này." 
        : "✅ Successfully saved as Production Defaults! All future visits will open with these settings."
    );
  };

  // 2. RELOAD PRODUCTION DEFAULTS HANDLER
  const handleReloadProductionDefaults = () => {
    const saved = getSavedProductionDefaults();
    if (!saved) {
      triggerResetFeedback(isVi ? "Hệ thống đang sử dụng cấu hình gốc xuất xưởng." : "Using factory standard defaults.");
      return;
    }

    if (saved.themeMode) setThemeMode(saved.themeMode);
    if (saved.theme) setTheme(saved.theme);
    if (saved.colorPreset) setColorPreset(saved.colorPreset);
    if (typeof saved.fontScale === "number") setFontScale(saved.fontScale);
    if (typeof saved.borderRadius === "number") {
      setTempBorderRadius(saved.borderRadius);
      setBorderRadius(saved.borderRadius);
    }
    if (typeof saved.borderRadiusCard === "number") {
      setTempBorderRadiusCard(saved.borderRadiusCard);
      setBorderRadiusCard(saved.borderRadiusCard);
    }
    if (saved.lang) setLang(saved.lang);

    triggerResetFeedback(
      isVi 
        ? "🔄 Đã nạp lại Cài đặt Mặc định Thực tế đã lưu trước đó!" 
        : "🔄 Reloaded saved production defaults successfully!"
    );
  };

  // 3. RESET TO FACTORY DEFAULTS
  const handleResetToFactoryDefaults = () => {
    resetToFactoryDefaults();
    setThemeMode(FACTORY_DEFAULTS.themeMode);
    setTheme(FACTORY_DEFAULTS.theme);
    setColorPreset(FACTORY_DEFAULTS.colorPreset);
    setFontScale(FACTORY_DEFAULTS.fontScale);
    setTempBorderRadius(FACTORY_DEFAULTS.borderRadius);
    setBorderRadius(FACTORY_DEFAULTS.borderRadius);
    setTempBorderRadiusCard(FACTORY_DEFAULTS.borderRadiusCard);
    setBorderRadiusCard(FACTORY_DEFAULTS.borderRadiusCard);
    resetCursorConfig();
    resetSoundConfig();
    resetFooterConfig();
    setLang(FACTORY_DEFAULTS.lang);
    setProductionDefaultsStatus(isVi ? "Mặc định gốc nhà phát triển" : "Factory Standard Default");

    triggerResetFeedback(
      isVi 
        ? "🔄 Đã khôi phục toàn bộ cài đặt về Chuẩn Gốc Xuất Xưởng ban đầu!" 
        : "🔄 System restored to pristine Factory Default configuration!"
    );
  };

  // 4. RUN DIAGNOSTIC & AUTO REPAIR
  const handleRunDiagnostic = () => {
    playClick();
    const report = runSystemDiagnosticAndRepair();
    setDiagnosticReport(report);
    setIsDiagnosticModalOpen(true);
    playSuccess();
  };

  // 5. EXPORT CONFIG JSON
  const handleExportConfig = () => {
    const currentConfig: SystemProductionConfig = {
      version: "2.5-prod",
      savedAt: new Date().toISOString(),
      savedFormattedDate: `${new Date().toLocaleTimeString("vi-VN")} - ${new Date().toLocaleDateString("vi-VN")}`,
      themeMode,
      theme,
      colorPreset,
      fontScale,
      borderRadius: tempBorderRadius,
      borderRadiusCard: tempBorderRadiusCard,
      cursor: cursorConfig,
      sound: soundConfig,
      footer: footerConfig,
      header: { isPinned: isHeaderPinned },
      lang,
    };
    exportConfigurationFile(currentConfig);
    triggerResetFeedback(isVi ? "📥 Đã tải xuống tệp cấu hình JSON thành công!" : "📥 Exported configuration JSON file successfully!");
  };

  // 6. IMPORT CONFIG JSON
  const handleImportJson = () => {
    if (!importJsonText.trim()) return;
    const result = importConfigurationFromJson(importJsonText);
    if (!result.success) {
      setImportError(isVi ? (result.errorVi || "Lỗi tệp") : (result.errorEn || "Error"));
      return;
    }
    setImportError(null);
    setIsImportModalOpen(false);
    setImportJsonText("");
    setProductionDefaultsStatus(result.config?.savedFormattedDate || "Vừa nạp từ JSON");
    triggerResetFeedback(isVi ? "🎉 Đã nhập và áp dụng tệp cấu hình JSON thành công!" : "🎉 Successfully imported and applied JSON configuration!");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setImportJsonText(text);
      }
    };
    reader.readAsText(file);
  };

  const getPlacementIcon = (id: FooterPlacement) => {
    switch (id) {
      case "fixed-bottom": return PanelBottom;
      case "floating-pill": return Maximize2;
      case "full-width": return Columns;
      case "auto-hide": return EyeOff;
      default: return PanelBottom;
    }
  };

  const getCursorStyleIcon = (style: CursorStyleType) => {
    switch (style) {
      case "neon-ring": return Sparkles;
      case "minimal-dot": return CircleDot;
      case "crosshair": return Crosshair;
      case "liquid-bubble": return Dot;
      case "trailing-comet": return Flame;
      case "system": return MousePointer;
      default: return Sparkles;
    }
  };

  const getAmbientIcon = (id: AmbientSoundType) => {
    switch (id) {
      case "rain": return CloudRain;
      case "zen-breeze": return Wind;
      case "space-drone": return Radio;
      case "website-bg-music": return Music;
      default: return VolumeX;
    }
  };

  const TABS: { id: FooterModalTab; nameVi: string; nameEn: string; Icon: React.ElementType }[] = [
    { id: "customization", nameVi: "Giao diện & Chế độ", nameEn: "Theme & Mode", Icon: Sun },
    { id: "colors", nameVi: "Bảng màu Tokens", nameEn: "Color System", Icon: Palette },
    { id: "radius", nameVi: "Bo góc thẻ", nameEn: "Border Radius", Icon: Layers },
    { id: "typography", nameVi: "Phông chữ Typography", nameEn: "Typography", Icon: Type },
    { id: "footer", nameVi: "Header & Footer Dock", nameEn: "Header & Footer Dock", Icon: PanelBottom },
    { id: "cursor", nameVi: "Con trỏ FX", nameEn: "Cursor FX", Icon: MousePointer },
    { id: "sound", nameVi: "Âm thanh FX", nameEn: "Audio & FX", Icon: Volume2 },
  ];

  return (
    <section 
      id="customization" 
      className="relative w-full h-full flex flex-col justify-start items-center p-3 sm:p-5 md:p-6 max-w-7xl mx-auto gap-6 font-sans text-slate-900 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar scroll-smooth"
    >
        {/* 1. Standard Page Card Header */}
        <PageCardHeader pageId="customization" />

      {/* Global Success Feedback Banner */}
      <AnimatePresence>
        {resetSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.96 }}
            className="px-4 py-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center justify-between backdrop-blur-md shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>{resetSuccessMessage}</span>
            </div>
            <button 
              type="button" 
              onClick={() => setResetSuccessMessage(null)}
              className="p-1 rounded-lg hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MASTER ACTION BAR: QUẢN LÝ CẤU HÌNH & LƯU MẶC ĐỊNH THỰC TẾ (SẮP XẾP GỌN GÀNG) */}
      <div 
        className="p-3.5 sm:p-4 bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-cyan-500/10 dark:from-indigo-950/40 dark:via-blue-950/40 dark:to-cyan-950/40 border border-indigo-500/30 dark:border-cyan-500/30 backdrop-blur-xl shadow-xs"
        style={{ borderRadius: "var(--theme-radius-card, 16px)" }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                  {isVi ? "Quản lý Cấu hình & Thiết lập Mặc định" : "Production Defaults Manager"}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {productionDefaultsStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons Cluster - Sắp xếp gọn gàng theo 2 cụm: Chính & Tiện ích */}
          <div className="flex items-center gap-1.5 flex-wrap self-end md:self-auto">
            {/* Primary Save button */}
            <button
              type="button"
              onClick={handleSaveAsProductionDefault}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xs font-bold shadow-xs hover:shadow-indigo-500/25 transition-all cursor-pointer active:scale-95"
              title={isVi ? "Lưu làm Cài đặt Mặc định Thực tế" : "Save as Production Default"}
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isVi ? "Lưu Mặc Định" : "Save Default"}</span>
            </button>

            {/* Diagnostic Auto Repair */}
            <button
              type="button"
              onClick={handleRunDiagnostic}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold transition-all cursor-pointer"
              title={isVi ? "Rà soát tính năng & tự động sửa chữa hệ thống" : "Audit & Auto-repair system settings"}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isVi ? "Sửa chữa" : "Repair"}</span>
            </button>

            {/* Compact Tool Actions Group */}
            <div className="flex items-center gap-1 bg-white/70 dark:bg-white/10 p-0.5 rounded-xl border border-slate-200/80 dark:border-white/10">
              <button
                type="button"
                onClick={handleReloadProductionDefaults}
                className="p-1.5 rounded-lg hover:bg-slate-200/70 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 text-xs transition-all cursor-pointer"
                title={isVi ? "Nạp lại cấu hình mặc định thực tế" : "Reload saved defaults"}
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleExportConfig}
                className="p-1.5 rounded-lg hover:bg-slate-200/70 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 text-xs transition-all cursor-pointer"
                title={isVi ? "Xuất cấu hình ra tệp JSON" : "Export config to JSON file"}
              >
                <Download className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => { setIsImportModalOpen(true); playClick(); }}
                className="p-1.5 rounded-lg hover:bg-slate-200/70 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 text-xs transition-all cursor-pointer"
                title={isVi ? "Nhập cấu hình từ tệp JSON" : "Import config from JSON file"}
              >
                <Upload className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleResetToFactoryDefaults}
                className="p-1.5 rounded-lg hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs transition-all cursor-pointer"
                title={isVi ? "Khôi phục chuẩn xuất xưởng ban đầu" : "Reset to factory defaults"}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Main Customization Panels Container */}
      <div className="w-full space-y-12">
        {/* PHẦN 1: GIAO DIỆN & CHẾ ĐỘ (THEME & DISPLAY MODE) */}
        <section id="sec-theme" className="space-y-6 scroll-mt-28">
          <div className="space-y-6">
            {/* Theme Mode Selector (Light / Dark / Auto System) */}
            <div className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sun className="w-5 h-5 text-amber-500" />
                    {isVi ? "Chế độ hiển thị chính (Light / Dark / Auto)" : "Primary Display Mode"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {isVi ? "Tự động kích hoạt chế độ sáng, tối hoặc theo cài đặt hệ điều hành" : "Select light, dark or follow operating system preferences automatically"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveAsProductionDefault}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-cyan-950/30 text-indigo-600 dark:text-cyan-400 border border-indigo-200 dark:border-cyan-800/50 text-xs font-bold hover:bg-indigo-100 transition-all cursor-pointer w-fit"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isVi ? "Lưu làm mặc định" : "Save as Default"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "light" as ThemeMode, nameVi: "Sáng (Light Mode)", nameEn: "Light Mode", descVi: "Nền kính sáng, sạch sẽ và rõ nét", descEn: "Crisp bright glass background", Icon: Sun, iconColor: "text-amber-500" },
                  { id: "dark" as ThemeMode, nameVi: "Tối (Dark Neon)", nameEn: "Dark Neon", descVi: "Nền tối huyền ảo, ánh sáng neon", descEn: "Dark neon atmosphere & contrast", Icon: Moon, iconColor: "text-indigo-400" },
                  { id: "system" as ThemeMode, nameVi: "Theo Hệ Thống (Auto)", nameEn: "Auto System", descVi: "Tự động đồng bộ theo hệ điều hành", descEn: "Sync with OS light/dark mode", Icon: Monitor, iconColor: "text-cyan-400" },
                ].map((m) => {
                  const isSelected = themeMode === m.id;
                  const ThemeIcon = m.Icon;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => { setThemeMode(m.id); playClick(); }}
                      className={cn(
                        "p-4 rounded-xl text-left transition-all border flex flex-col justify-between cursor-pointer",
                        isSelected
                          ? "ring-2 ring-indigo-500 dark:ring-cyan-400 bg-indigo-500/5 dark:bg-cyan-500/10 border-indigo-500/40 shadow-sm"
                          : "hover:bg-slate-50 dark:hover:bg-white/5 border-slate-200 dark:border-white/10"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <ThemeIcon className={cn("w-4 h-4 shrink-0", m.iconColor)} />
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{isVi ? m.nameVi : m.nameEn}</span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />}
                      </div>
                      <p className="text-2xs text-slate-500 dark:text-slate-400">{isVi ? m.descVi : m.descEn}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language Selection Bar */}
            <div className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {isVi ? "Ngôn ngữ hiển thị (Language)" : "Display Language"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {isVi ? "Hỗ trợ đầy đủ song ngữ Tiếng Việt chuẩn và Tiếng Anh quốc tế" : "Fully supports Vietnamese and English translations across all sections"}
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => { setLang("vi"); playClick(); }}
                    className={cn(
                      "px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer",
                      lang === "vi" 
                        ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs" 
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    🇻🇳 Tiếng Việt
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLang("en"); playClick(); }}
                    className={cn(
                      "px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer",
                      lang === "en" 
                        ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs" 
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    🇬🇧 English
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PHẦN 2: BẢNG MÀU & COLOR TOKENS */}
        <section id="sec-colors" className="space-y-6 scroll-mt-28">
          <div className="space-y-6">
            {/* Color Presets */}
            <div className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Palette className="w-5 h-5 text-indigo-500" />
                    {isVi ? "Bộ màu sắc chủ đạo (Design Tokens)" : "Color Preset Tokens"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {isVi ? "Các gam màu thiết kế đã được cân chỉnh độ tương phản WCAG AAA" : "Curated color schemes with calibrated WCAG AAA contrast ratios"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveAsProductionDefault}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-cyan-950/30 text-indigo-600 dark:text-cyan-400 border border-indigo-200 dark:border-cyan-800/50 text-xs font-bold hover:bg-indigo-100 transition-all cursor-pointer w-fit"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isVi ? "Lưu làm mặc định" : "Save as Default"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyCss}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all cursor-pointer w-fit"
                  >
                    {copiedCss ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Code2 className="w-3.5 h-3.5 text-indigo-500" />}
                    <span>{copiedCss ? (isVi ? "Đã sao chép CSS" : "CSS Copied") : (isVi ? "Sao chép CSS Variables" : "Copy CSS Variables")}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {COLOR_PRESETS.map((preset) => {
                  const isSelected = colorPreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setColorPreset(preset.id);
                        playClick();
                      }}
                      className={cn(
                        "p-4 rounded-xl text-left transition-all duration-200 cursor-pointer border flex flex-col justify-between group",
                        isSelected
                          ? "ring-2 ring-indigo-500 dark:ring-cyan-400 bg-indigo-500/5 dark:bg-cyan-500/10 border-indigo-500/40 shadow-sm"
                          : "hover:bg-slate-50 dark:hover:bg-white/5 border-slate-200 dark:border-white/10"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {preset.name}
                        </span>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-indigo-600 dark:bg-cyan-400 text-white dark:text-slate-950 flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-2">
                        {(() => {
                          const c = theme === "glass-dark-neon" ? preset.dark : preset.light;
                          const colors = [c.primary, c.secondary, c.accent, c.highlight, c.soft];
                          return colors.map((hex, idx) => (
                            <div
                              key={idx}
                              className="flex-1 h-5 rounded-md shadow-2xs transition-transform group-hover:scale-105"
                              style={{ backgroundColor: hex }}
                              title={hex}
                            />
                          ));
                        })()}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* PHẦN 3: BO GÓC THẺ & KHUNG (BORDER RADIUS) */}
        <section id="sec-radius" className="space-y-6 scroll-mt-28">
          <div className="space-y-6">
            <div className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-indigo-500" />
                    {isVi ? "Tùy chỉnh độ bo cong góc (Border Radius)" : "Border Radius Customization"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {isVi ? "Điều chỉnh linh hoạt các giá trị bo cong của hệ thống và thẻ bento" : "Adjust corner curvature for system details and card frames independently"}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTempBorderRadius(10);
                      setTempBorderRadiusCard(14);
                      setBorderRadius(10);
                      setBorderRadiusCard(14);
                      triggerResetFeedback(isVi ? "Đã khôi phục bo góc chuẩn hệ thống (10px / 14px) 🔄" : "Reset border-radius to defaults 🔄");
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-all cursor-pointer w-fit"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isVi ? "Mặc định" : "Default"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setBorderRadius(tempBorderRadius);
                      setBorderRadiusCard(tempBorderRadiusCard);
                      handleSaveAsProductionDefault();
                    }}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer w-fit bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-cyan-500 dark:hover:bg-cyan-600 dark:text-slate-950 scale-[1.02]"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isVi ? "Lưu làm Mặc định" : "Save as Default"}</span>
                  </button>
                </div>
              </div>

              {/* Sliders Container (Dual Customization Panel) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Slider 1: System Elements Radius */}
                <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {isVi ? "Bo góc hệ thống (Nút, Input, Badges):" : "System Radius (Buttons, Badges):"}
                      </span>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {isVi ? "Bo góc nút bấm chính, trường văn bản & các tag trạng thái" : "Applies to UI buttons, fields, & status badges"}
                      </p>
                    </div>
                    <span className="text-sm font-mono font-black text-indigo-600 dark:text-cyan-400 px-2 py-0.5 rounded-md bg-indigo-500/10 dark:bg-cyan-500/10">
                      {tempBorderRadius}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={28}
                    step={1}
                    value={tempBorderRadius}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setTempBorderRadius(val);
                      setBorderRadius(val);
                    }}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-cyan-400"
                  />
                </div>

                {/* Slider 2: Card Radius (--theme-radius-card) */}
                <div 
                  style={{ borderRadius: "var(--theme-radius-card, 14px)" }}
                  className="p-4 bg-slate-50/50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {isVi ? "Bo góc thẻ chứa (Cards, Bento Blocks):" : "Card Frame Radius (Bento Blocks):"}
                      </span>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {isVi ? "Điều chỉnh trực tiếp biến CSS --theme-radius-card toàn website" : "Directly adjust the --theme-radius-card CSS token website-wide"}
                      </p>
                    </div>
                    <span className="text-sm font-mono font-black text-rose-500 dark:text-rose-400 px-2 py-0.5 rounded-md bg-rose-500/10 dark:bg-rose-500/10">
                      {tempBorderRadiusCard}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={32}
                    step={1}
                    value={tempBorderRadiusCard}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setTempBorderRadiusCard(val);
                      setBorderRadiusCard(val);
                    }}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500 dark:accent-rose-400"
                  />
                </div>
              </div>

              {/* Preset Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {RADIUS_PRESETS.map((preset) => {
                  const isSelected = tempBorderRadius === preset.radius && tempBorderRadiusCard === preset.cardRadius;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setTempBorderRadius(preset.radius);
                        setTempBorderRadiusCard(preset.cardRadius);
                        setBorderRadius(preset.radius);
                        setBorderRadiusCard(preset.cardRadius);
                        playClick();
                      }}
                      className={cn(
                        "p-4 rounded-xl text-left transition-all duration-200 cursor-pointer border flex flex-col justify-between group",
                        isSelected
                          ? "ring-2 ring-indigo-500 dark:ring-cyan-400 bg-indigo-500/5 dark:bg-cyan-500/10 border-indigo-500/40 shadow-sm"
                          : "hover:bg-slate-50 dark:hover:bg-white/5 border-slate-200 dark:border-white/10"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {isVi ? preset.nameVi : preset.nameEn}
                        </span>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-indigo-600 dark:bg-cyan-400 text-white dark:text-slate-950 flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-2xs text-slate-500 dark:text-slate-400 mb-3">
                        {isVi ? preset.descVi : preset.descEn}
                      </p>
                      {/* Geometric Preview Box */}
                      <div 
                        className="w-full h-8 bg-indigo-500/20 dark:bg-cyan-400/20 border-2 border-indigo-500/50 dark:border-cyan-400/50 flex items-center justify-center text-3xs font-mono font-bold text-indigo-600 dark:text-cyan-300"
                        style={{ borderRadius: `${preset.radius}px` }}
                      >
                        UI: {preset.radius}px | Card: {preset.cardRadius}px
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* PHẦN 5: ÂM THANH FX & MÔI TRƯỜNG (AUDIO & FX) */}
        <section id="sec-sound" className="space-y-6 scroll-mt-28">
          <div className="space-y-6">
            <div className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-indigo-500" />
                    {isVi ? "Hệ thống âm thanh tương tác & Thư giãn" : "Audio FX & Ambient Soundscape"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {isVi ? "Âm thanh click phản hồi UI và âm thanh môi trường thư giãn" : "Tactile UI click feedback and relaxing ambient background sounds"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveAsProductionDefault}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-cyan-950/30 text-indigo-600 dark:text-cyan-400 border border-indigo-200 dark:border-cyan-800/50 text-xs font-bold hover:bg-indigo-100 transition-all cursor-pointer w-fit"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isVi ? "Lưu làm mặc định" : "Save as Default"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { toggleMute(); playClick(); }}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer",
                      soundConfig.isMuted 
                        ? "bg-rose-500/15 text-rose-600 border border-rose-500/30" 
                        : "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30"
                    )}
                  >
                    {soundConfig.isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{soundConfig.isMuted ? (isVi ? "Đang tắt tiếng" : "Muted") : (isVi ? "Đang bật tiếng" : "Audio Active")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetSoundConfig();
                      triggerResetFeedback(isVi ? "Đã khôi phục cài đặt âm thanh" : "Reset audio to defaults");
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isVi ? "Mặc định" : "Default"}</span>
                  </button>
                </div>
              </div>

              {/* Volume Sliders Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {[
                  { labelVi: "Âm lượng tổng (Master)", labelEn: "Master Volume", val: soundConfig.masterVolume, set: setMasterVolume },
                  { labelVi: "Âm click UI (Interface)", labelEn: "UI Sound Volume", val: soundConfig.uiVolume, set: setUiVolume },
                  { labelVi: "Âm nền môi trường (Ambient)", labelEn: "Ambient Volume", val: soundConfig.ambientVolume, set: setAmbientVolume }
                ].map((vol, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-2xs font-bold text-slate-700 dark:text-slate-300">{isVi ? vol.labelVi : vol.labelEn}</span>
                      <span className="text-2xs font-mono font-bold text-indigo-600 dark:text-cyan-400">{Math.round(vol.val * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={vol.val}
                      onChange={(e) => vol.set(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-cyan-400"
                    />
                  </div>
                ))}
              </div>

              {/* Sound Packs & Ambient Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Click Packs */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2.5 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    {isVi ? "Gói hiệu ứng nhấp chuột (UI Sound Pack)" : "UI Click Sound Pack"}
                  </h4>
                  <div className="space-y-2">
                    {SOUND_PACK_OPTIONS.map((pack) => {
                      const isSelected = soundConfig.soundPack === pack.id;
                      return (
                        <button
                          key={pack.id}
                          type="button"
                          onClick={() => { setSoundPack(pack.id); playClick(); }}
                          className={cn(
                            "w-full p-2.5 rounded-lg text-left transition-all border flex items-center justify-between cursor-pointer",
                            isSelected
                              ? "bg-indigo-500/10 dark:bg-cyan-500/10 border-indigo-500/40 text-indigo-600 dark:text-cyan-400"
                              : "hover:bg-slate-100 dark:hover:bg-white/5 border-slate-200/80 dark:border-white/5 text-slate-700 dark:text-slate-300"
                          )}
                        >
                          <div>
                            <div className="text-xs font-bold">{isVi ? pack.nameVi : pack.nameEn}</div>
                            <div className="text-3xs text-slate-500 dark:text-slate-400">{isVi ? pack.descVi : pack.descEn}</div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Ambient Soundscapes */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2.5 flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-sky-500" />
                    {isVi ? "Âm thanh môi trường thư giãn (Ambient)" : "Relaxing Soundscape"}
                  </h4>
                  <div className="space-y-2">
                    {AMBIENT_SOUND_OPTIONS.map((amb) => {
                      const isSelected = soundConfig.ambientSound === amb.id;
                      const Icon = getAmbientIcon(amb.id);
                      return (
                        <button
                          key={amb.id}
                          type="button"
                          onClick={() => { setAmbientSound(amb.id); playClick(); }}
                          className={cn(
                            "w-full p-2.5 rounded-lg text-left transition-all border flex items-center justify-between cursor-pointer",
                            isSelected
                              ? "bg-sky-500/10 dark:bg-cyan-500/10 border-sky-500/40 text-sky-600 dark:text-cyan-400"
                              : "hover:bg-slate-100 dark:hover:bg-white/5 border-slate-200/80 dark:border-white/5 text-slate-700 dark:text-slate-300"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-sky-500" />
                            <div>
                              <div className="text-xs font-bold">{isVi ? amb.nameVi : amb.nameEn}</div>
                              <div className="text-3xs text-slate-500 dark:text-slate-400">{isVi ? amb.descVi : amb.descEn}</div>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-sky-600 dark:text-cyan-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Website Background Music Player Card */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10 dark:from-indigo-950/40 dark:to-cyan-950/30 border border-indigo-200/80 dark:border-indigo-500/30 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-md">
                        <Music className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight font-play">
                          {isVi ? "Âm thanh nền Website chính thức" : "Official Website Background Audio"}
                        </h4>
                        <p className="text-3xs text-slate-500 dark:text-slate-400 font-mono">
                          Scena Audio • Ambient Soundscape MP3
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (soundConfig.ambientSound === "website-bg-music") {
                          setAmbientSound("none");
                        } else {
                          setAmbientSound("website-bg-music");
                        }
                        playClick();
                      }}
                      className={cn(
                        "px-3.5 py-1.5 rounded-full text-xs font-bold font-play flex items-center gap-1.5 transition-all shadow-sm cursor-pointer",
                        soundConfig.ambientSound === "website-bg-music"
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/30 ring-2 ring-indigo-400/40"
                          : "bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700"
                      )}
                    >
                      {soundConfig.ambientSound === "website-bg-music" ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>{isVi ? "Tạm dừng" : "Pause Audio"}</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{isVi ? "Phát âm nền" : "Play Soundtrack"}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pt-1 text-3xs text-slate-600 dark:text-slate-400 font-mono bg-white/60 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-200/60 dark:border-white/5 truncate">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                    <span className="truncate">https://cdn.scena.ai/project/10169/b831e310df79c84abab30fc7ee7fc5939213230d5895a09b3617382849f52afe.mp3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PHẦN 6: HEADER & FOOTER DOCK (THANH ĐIỀU HƯỚNG & CHÂN TRANG) */}
        <section id="sec-footer" className="space-y-6 scroll-mt-28">
          <div className="space-y-6">
            {/* 1. Header Dock Settings Card */}
            <div className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <PanelTop className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                    {isVi ? "Thanh điều hướng đầu trang (Header Dock)" : "Top Navigation Header Dock"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {isVi ? "Cấu hình ghim cố định hoặc tự động trượt ẩn để tối đa không gian màn hình" : "Configure pinned state or auto-slide up to maximize content viewport"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveAsProductionDefault}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-cyan-950/30 text-indigo-600 dark:text-cyan-400 border border-indigo-200 dark:border-cyan-800/50 text-xs font-bold hover:bg-indigo-100 transition-all cursor-pointer w-fit"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isVi ? "Lưu làm mặc định" : "Save as Default"}</span>
                  </button>
                  <span className={cn(
                    "text-2xs font-mono font-bold px-3 py-1 rounded-full border shadow-2xs w-fit",
                    isHeaderPinned
                      ? "bg-blue-500/10 text-blue-700 dark:text-cyan-300 border-blue-500/30"
                      : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30"
                  )}>
                    {isHeaderPinned ? (isVi ? "📌 Đang ghim cố định" : "📌 Pinned Fixed") : (isVi ? "⚡ Tự động trượt ẩn" : "⚡ Auto-Slide Up")}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {/* 1. Header Pin Toggle */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all",
                      isHeaderPinned ? "bg-blue-600/20 text-blue-600 dark:text-cyan-400 border-blue-500/30 shadow-xs" : "bg-slate-200/60 dark:bg-white/10 text-slate-500 border-slate-300 dark:border-white/10"
                    )}>
                      <Pin className={cn("w-5 h-5 transition-transform", isHeaderPinned ? "rotate-45" : "")} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {isVi ? "Ghim cố định Header (Không tự trượt ẩn)" : "Pin Header (Prevent auto-slide up)"}
                      </div>
                      <div className="text-2xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {isVi ? "Khi bỏ ghim, thanh Header tự động trượt lên trên và xuất hiện thanh gạt chỉ báo xanh nhẹ" : "When unpinned, Header slides up leaving a sleek peek indicator at the top"}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => { toggleHeaderPin(); playClick(); }}
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center shrink-0 self-end sm:self-center",
                      isHeaderPinned ? "bg-blue-600 dark:bg-cyan-400 justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
                    )}
                  >
                    <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                  </button>
                </div>

                {/* 2. Footer Pin Toggle (Tính năng Ghim cố định footer) */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all",
                      footerConfig.isPinned !== false ? "bg-indigo-600/20 text-indigo-600 dark:text-cyan-400 border-indigo-500/30 shadow-xs" : "bg-slate-200/60 dark:bg-white/10 text-slate-500 border-slate-300 dark:border-white/10"
                    )}>
                      <PanelBottom className={cn("w-5 h-5 transition-transform", footerConfig.isPinned !== false ? "rotate-12" : "")} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {isVi ? "Ghim cố định Footer (Không tự trượt ẩn)" : "Pin Footer (Prevent auto-slide down)"}
                      </div>
                      <div className="text-2xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {isVi ? "Thanh Footer Dock luôn nằm cố định ở đáy trang, áp dụng hiển thị toàn hệ thống" : "Footer Dock remains pinned at bottom without auto sliding down"}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => { togglePin(); playClick(); }}
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center shrink-0 self-end sm:self-center",
                      footerConfig.isPinned !== false ? "bg-indigo-600 dark:bg-cyan-400 justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
                    )}
                  >
                    <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Footer Dock Settings Card (Vị trí & Tiện ích Widgets) */}
            <div className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <PanelBottom className="w-5 h-5 text-indigo-500" />
                    {isVi ? "Tùy chỉnh thanh chân trang (Footer Dock)" : "Footer Dock Settings"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {isVi ? "Kiểu dáng vị trí ghim và cấu hình bật/tắt các nút tính năng" : "Dock placement and widget visibility toggles"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveAsProductionDefault}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-cyan-950/30 text-indigo-600 dark:text-cyan-400 border border-indigo-200 dark:border-cyan-800/50 text-xs font-bold hover:bg-indigo-100 transition-all cursor-pointer w-fit"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isVi ? "Lưu làm mặc định" : "Save as Default"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetFooterConfig();
                      triggerResetFeedback(isVi ? "Đã khôi phục cài đặt chân trang" : "Reset footer to defaults");
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-all cursor-pointer w-fit"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isVi ? "Mặc định" : "Default"}</span>
                  </button>
                </div>
              </div>

              {/* Placement Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {FOOTER_PLACEMENT_OPTIONS.map((opt) => {
                  const isSelected = footerConfig.placement === opt.id;
                  const Icon = getPlacementIcon(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => { setPlacement(opt.id); playClick(); }}
                      className={cn(
                        "p-3.5 rounded-xl text-left transition-all border flex flex-col justify-between cursor-pointer",
                        isSelected
                          ? "ring-2 ring-indigo-500 dark:ring-cyan-400 bg-indigo-500/5 dark:bg-cyan-500/10 border-indigo-500/40 shadow-sm"
                          : "hover:bg-slate-50 dark:hover:bg-white/5 border-slate-200 dark:border-white/10"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={cn("w-4 h-4", isSelected ? "text-indigo-600 dark:text-cyan-400" : "text-slate-400")} />
                        {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{isVi ? opt.nameVi : opt.nameEn}</div>
                        <div className="text-3xs text-slate-500 dark:text-slate-400 mt-0.5">{isVi ? opt.descVi : opt.descEn}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Toggles List */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {isVi ? "Bật/Tắt các thành phần trên Footer:" : "Toggle Footer Widgets:"}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: "isPinned" as const, labelVi: "Ghim cố định Footer (Không tự trượt ẩn)", labelEn: "Pin Footer (Prevent auto-slide down)", icon: Pin, val: footerConfig.isPinned !== false, toggle: togglePin },
                    { key: "showClock" as const, labelVi: "Đồng hồ thời gian & Ngày tháng", labelEn: "Clock & Date Widget", icon: Clock, val: footerConfig.showClock, toggle: () => toggleElementVisibility("showClock") },
                    { key: "showWeather" as const, labelVi: "Dự báo thời tiết TP.HCM / Tỉnh thành", labelEn: "Real-time Weather Widget", icon: CloudSun, val: footerConfig.showWeather, toggle: () => toggleElementVisibility("showWeather") },
                    { key: "showNextPageButton" as const, labelVi: "Nút chuyển trang tiếp theo ở giữa", labelEn: "Next Page Center Trigger", icon: ChevronDown, val: footerConfig.showNextPageButton, toggle: () => toggleElementVisibility("showNextPageButton") },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-2.5 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-white/10">
                      <div className="flex items-center gap-2 min-w-0">
                        <item.icon className="w-4 h-4 text-slate-500 shrink-0" />
                        <span className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">{isVi ? item.labelVi : item.labelEn}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => { item.toggle(); playClick(); }}
                        className={cn(
                          "w-10 h-5 rounded-full transition-colors p-0.5 cursor-pointer flex items-center shrink-0 ml-2",
                          item.val ? "bg-indigo-600 dark:bg-cyan-400 justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
                        )}
                      >
                        <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PHẦN 7: PHÔNG CHỮ & TYPOGRAPHY */}
        <section id="sec-typography" className="space-y-6 scroll-mt-28">
          <div className="space-y-6">
            <div className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Type className="w-5 h-5 text-indigo-500" />
                    {isVi ? "Hệ thống phông chữ & Tỷ lệ (Typography Matrix)" : "Typography Scale Matrix"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {isVi ? "Tỷ lệ cỡ chữ linh hoạt và bộ mẫu phân cấp trực quan" : "Scalable responsive hierarchy and live preview test arena"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveAsProductionDefault}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-cyan-950/30 text-indigo-600 dark:text-cyan-400 border border-indigo-200 dark:border-cyan-800/50 text-xs font-bold hover:bg-indigo-100 transition-all cursor-pointer w-fit"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isVi ? "Lưu làm mặc định" : "Save as Default"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetFontScale();
                      triggerResetFeedback(isVi ? "Đã khôi phục cỡ chữ chuẩn 100%" : "Reset font scale to 100%");
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-all cursor-pointer w-fit"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isVi ? "Mặc định (100%)" : "Default (100%)"}</span>
                  </button>
                </div>
              </div>

              {/* Font Scale Selector & Slider */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {isVi ? "Tỷ lệ kích thước chữ toàn trang (Global Font Scale):" : "Global Font Scale:"}
                    </span>
                    <p className="text-3xs text-slate-500 mt-0.5">
                      {isVi ? "Tự động co giãn toàn bộ phân cấp typography theo tỷ lệ chuẩn" : "Scales all typographic tokens fluidly"}
                    </p>
                  </div>
                  <span className="text-sm font-mono font-black text-indigo-600 dark:text-cyan-400 px-2.5 py-1 rounded-md bg-indigo-500/10 dark:bg-cyan-500/10">
                    {fontScale}%
                  </span>
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min={80}
                  max={130}
                  step={1}
                  value={fontScale}
                  onChange={(e) => setFontScale(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-cyan-400 mb-4"
                />

                {/* Quick Presets */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { scale: 90, labelVi: "Gọn gàng (90%)", labelEn: "Compact (90%)" },
                    { scale: 100, labelVi: "Tiêu chuẩn (100%)", labelEn: "Standard (100%)" },
                    { scale: 110, labelVi: "Rõ nét (110%)", labelEn: "Clear (110%)" },
                    { scale: 120, labelVi: "Lớn dễ đọc (120%)", labelEn: "Large (120%)" },
                  ].map((s) => (
                    <button
                      key={s.scale}
                      type="button"
                      onClick={() => { setFontScale(s.scale); playClick(); }}
                      className={cn(
                        "p-2.5 rounded-lg text-xs font-bold transition-all border text-center cursor-pointer",
                        fontScale === s.scale
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                          : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-100"
                      )}
                    >
                      {isVi ? s.labelVi : s.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Typography Hierarchy Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-indigo-500 dark:text-cyan-400" />
                      <span>{isVi ? "Bảng phân cấp Typography Tokens (Tùy chỉnh tăng giảm kích thước):" : "Typography Hierarchy Tokens (Custom Size Adjusters):"}</span>
                    </h4>
                    <p className="text-3xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {isVi ? "Hiển thị thông số kích thước thực tế đang áp dụng và tinh chỉnh linh hoạt từng token" : "Real-time active font size in pixels with per-token scale adjusters"}
                    </p>
                  </div>
                  {Object.keys(tokenAdjustments).length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setTokenAdjustments({});
                        if (typeof window !== "undefined") {
                          try {
                            localStorage.removeItem("portfolio_typo_token_adjustments");
                            TYPO_TOKENS.forEach(t => document.documentElement.style.removeProperty(`--token-adjust-${t.id}`));
                          } catch {}
                        }
                      }}
                      className="text-3xs text-rose-500 hover:underline cursor-pointer flex items-center gap-1 shrink-0"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      <span>{isVi ? "Đặt lại tất cả tokens" : "Reset all tokens"}</span>
                    </button>
                  )}
                </div>
                {TYPO_TOKENS.map((token) => {
                  const IconComp = token.Icon;
                  const adjustment = tokenAdjustments[token.id] || 0;
                  const currentComputedPx = Math.round(token.basePx * (fontScale / 100) + adjustment);

                  return (
                    <div
                      key={token.id}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-indigo-400/40 transition-all"
                    >
                      <div className="flex items-center gap-2.5 min-w-[260px]">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span>{isVi ? token.labelVi : token.labelEn}</span>
                            {/* Current Real-time Size Badge */}
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md font-black bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-2xs">
                              {currentComputedPx}px
                            </span>
                            {adjustment !== 0 && (
                              <span className={cn(
                                "text-[10px] font-mono px-1.5 py-0.2 rounded-md font-extrabold",
                                adjustment > 0 ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                              )}>
                                {adjustment > 0 ? `+${adjustment}px` : `${adjustment}px`}
                              </span>
                            )}
                          </div>
                          <div className="text-3xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                            {isVi ? `Gốc: ${token.size} | Weight: ${token.weight} | Leading: ${token.leading} | Tỷ lệ: ${fontScale}%` : `Base: ${token.size} | Weight: ${token.weight} | Leading: ${token.leading} | Scale: ${fontScale}%`}
                          </div>
                        </div>
                      </div>

                      {/* Sample Preview Text with live applied size */}
                      <div 
                        className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate flex-1 font-play px-2"
                        style={{ fontSize: `${currentComputedPx}px` }}
                      >
                        {token.sampleText}
                      </div>

                      {/* Interactive Size Increase / Decrease Controller */}
                      <div className="flex items-center gap-1 shrink-0 bg-white dark:bg-slate-900/90 p-1 rounded-xl border border-slate-200 dark:border-white/10 shadow-2xs self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => handleAdjustTokenSize(token.id, -1)}
                          className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                          title={isVi ? `Giảm kích thước ${token.labelVi} (-1px)` : `Decrease ${token.labelEn} (-1px)`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex flex-col items-center px-1.5 min-w-[42px] leading-tight">
                          <span className={cn(
                            "text-2xs font-mono font-bold text-center",
                            adjustment !== 0 ? "text-indigo-600 dark:text-cyan-400 font-extrabold" : "text-slate-700 dark:text-slate-300"
                          )}>
                            {currentComputedPx}px
                          </span>
                          <span className="text-3xs font-mono text-slate-400 text-center scale-90">
                            {adjustment > 0 ? `+${adjustment}` : adjustment < 0 ? `${adjustment}` : "±0"}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAdjustTokenSize(token.id, 1)}
                          className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                          title={isVi ? `Tăng kích thước ${token.labelVi} (+1px)` : `Increase ${token.labelEn} (+1px)`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        {adjustment !== 0 && (
                          <button
                            type="button"
                            onClick={() => handleResetTokenSize(token.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-500 transition-colors ml-0.5 cursor-pointer"
                            title={isVi ? "Khôi phục kích thước chuẩn" : "Reset to default"}
                          >
                            <RotateCcw className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 5. DIAGNOSTIC REPORT MODAL */}
      <AnimatePresence>
        {isDiagnosticModalOpen && diagnosticReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {isVi ? "Báo Cáo Rà Soát & Sửa Chữa Hệ Thống" : "System Audit & Auto-Repair Report"}
                      <span className="px-2 py-0.5 rounded-full text-3xs font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                        {diagnosticReport.passedChecks}/{diagnosticReport.totalChecks} {isVi ? "Đạt chuẩn" : "Passed"}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      {isVi ? `Thời gian rà soát: ${diagnosticReport.timestamp} • Đã hiệu chỉnh: ${diagnosticReport.repairedCount} mục` : `Audited at: ${diagnosticReport.timestamp} • Repaired: ${diagnosticReport.repairedCount} items`}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDiagnosticModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body / Checklist */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
                {diagnosticReport.items.map((item) => (
                  <div 
                    key={item.id}
                    className="p-3.5 rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      {item.status === "perfect" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />}
                      {item.status === "repaired" && <Zap className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />}
                      {item.status === "warning" && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />}
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {isVi ? item.titleVi : item.titleEn}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                          {isVi ? item.detailVi : item.detailEn}
                        </p>
                      </div>
                    </div>
                    {item.metric && (
                      <span className="shrink-0 px-2 py-0.5 rounded-md text-3xs font-mono font-bold bg-slate-200/60 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                        {item.metric}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-slate-500 font-medium">
                  {isVi ? "Hệ thống đã tự động đồng bộ toàn bộ biến CSS & LocalStorage." : "System has synchronized all CSS tokens & storage keys."}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleSaveAsProductionDefault();
                      setIsDiagnosticModalOpen(false);
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
                  >
                    {isVi ? "Lưu kết quả làm mặc định" : "Save as Production Default"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDiagnosticModalOpen(false)}
                    className="px-4 py-2 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    {isVi ? "Đóng" : "Close"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. IMPORT CONFIG JSON MODAL */}
      <AnimatePresence>
        {isImportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-cyan-400 flex items-center justify-center">
                    <FileJson className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {isVi ? "Nhập Cấu Hình Từ Tệp JSON" : "Import Configuration JSON"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {isVi ? "Dán mã JSON hoặc chọn tệp cấu hình đã xuất" : "Paste JSON string or select an exported configuration file"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 block">
                    {isVi ? "Chọn tệp JSON từ máy tính:" : "Select JSON file from computer:"}
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileUpload}
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 dark:file:bg-white/10 dark:file:text-cyan-300 hover:file:bg-indigo-100 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 block">
                    {isVi ? "Hoặc dán nội dung JSON vào đây:" : "Or paste JSON payload below:"}
                  </label>
                  <textarea
                    rows={6}
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    placeholder='{"themeMode": "light", "colorPreset": "default", ...}'
                    className="w-full p-3 font-mono text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>

                {importError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{importError}</span>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  {isVi ? "Hủy" : "Cancel"}
                </button>
                <button
                  type="button"
                  onClick={handleImportJson}
                  disabled={!importJsonText.trim()}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-1.5",
                    importJsonText.trim()
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-slate-200 dark:bg-white/5 text-slate-400 cursor-not-allowed"
                  )}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isVi ? "Nhập & Áp dụng ngay" : "Import & Apply"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
