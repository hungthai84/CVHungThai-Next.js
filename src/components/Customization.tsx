import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sliders, 
  Palette, 
  Layers, 
  MousePointer, 
  Volume2, 
  PanelBottom, 
  Type, 
  Check, 
  RotateCcw, 
  Copy, 
  Sun, 
  Sparkles, 
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
  Clock, 
  CloudSun, 
  ChevronDown, 
  Globe, 
  Images, 
  Download, 
  Upload, 
  Zap, 
  Settings2,
  RefreshCw,
  SlidersHorizontal,
  Link2,
  Unlink
} from "lucide-react";
import { PageCardHeader } from "./PageCardHeader";
import { useLanguage } from "../i18n";
import { useTheme, COLOR_PRESETS, ThemeType } from "../context/ThemeContext";
import { useBackground } from "../context/BackgroundContext";
import { useCursor } from "../context/CursorContext";
import { useSound } from "../context/SoundContext";
import { useFooter } from "../context/FooterContext";
import { useLayout } from "../context/LayoutContext";
import { CURSOR_STYLE_OPTIONS } from "../data/cursorData";
import { CursorStyleType } from "../types/cursor";
import { SOUND_PACK_OPTIONS, AMBIENT_SOUND_OPTIONS } from "../data/soundData";
import { AmbientSoundType } from "../types/sound";
import { FOOTER_PLACEMENT_OPTIONS } from "../data/footerData";
import { FooterPlacement } from "../types/footer";
import { cn } from "../lib/utils";

const RADIUS_PRESETS = [
  {
    id: "sharp",
    radius: 4,
    nameVi: "Tối Giản / Vuông (Sharp 4px)",
    nameEn: "Minimal Sharp (4px)",
    descVi: "Gọn gàng, chuẩn xác phong cách phẳng",
    descEn: "Clean, flat modern edge",
  },
  {
    id: "standard",
    radius: 10,
    nameVi: "Chuẩn Mực Hệ Thống (Standard 10px)",
    nameEn: "System Standard (10px)",
    descVi: "Mặc định Master Agent Design System",
    descEn: "Standard design system default",
  },
  {
    id: "smooth",
    radius: 14,
    nameVi: "Mềm Mại Hiện Đại (Smooth 14px)",
    nameEn: "Smooth Modern (14px)",
    descVi: "Bo cong mềm mại, thanh lịch",
    descEn: "Soft curved, refined modern look",
  },
  {
    id: "rounded",
    radius: 18,
    nameVi: "Bo Tròn Nổi Bật (Rounded 18px)",
    nameEn: "Rounded Soft (18px)",
    descVi: "Đường cong nổi bật, thân thiện",
    descEn: "Friendly rounded card edges",
  },
  {
    id: "fluid",
    radius: 24,
    nameVi: "Bo Cong Tối Đa (Extra Round 24px)",
    nameEn: "Extra Round Fluid (24px)",
    descVi: "Bento bubble cao cấp, mượt mà",
    descEn: "High curvature bento style",
  },
];

const TYPO_TOKENS = [
  { id: "display", labelVi: "Display (Tiêu đề lớn)", labelEn: "Display Heading", size: "40–52px", weight: "700", leading: "1.15", sampleText: "Nguyễn Hùng Thái" },
  { id: "h1", labelVi: "H1 (Tiêu đề chính)", labelEn: "H1 Heading", size: "36–42px", weight: "700", leading: "1.20", sampleText: "Giám Đốc Chăm Sóc Khách Hàng" },
  { id: "h2", labelVi: "H2 (Tiêu đề mục)", labelEn: "H2 Section Title", size: "28–34px", weight: "700", leading: "1.20", sampleText: "Kinh Nghiệm & Thành Tựu Vận Hành" },
  { id: "h3", labelVi: "H3 (Tiêu đề phụ)", labelEn: "H3 Subtitle", size: "20–24px", weight: "700", leading: "1.25", sampleText: "Kiến trúc hệ thống CSKH chuẩn quốc tế" },
  { id: "card", labelVi: "Card Title (Thẻ)", labelEn: "Card Title", size: "18–20px", weight: "700", leading: "1.30", sampleText: "Dự Án Vận Hành Đa Kênh Omnichannel" },
  { id: "body", labelVi: "Body (Văn bản)", labelEn: "Body Text", size: "15–16px", weight: "400", leading: "1.60", sampleText: "Tối ưu hóa hành trình khách hàng với hiệu suất tăng trưởng vượt bậc qua công nghệ số." },
  { id: "caption", labelVi: "Caption / Label", labelEn: "Caption/Label", size: "12–13px", weight: "600", leading: "1.40", sampleText: "22+ NĂM KINH NGHIỆM VẬN HÀNH" },
];

export default function Customization() {
  const { lang, setLang } = useLanguage();
  const isVi = lang === "vi";

  // Contexts
  const { fixedHeaderFooter, setFixedHeaderFooter } = useLayout();
  const { 
    theme, 
    setTheme, 
    colorPreset, 
    setColorPreset, 
    activePalette, 
    fontScale, 
    setFontScale, 
    resetFontScale, 
    borderRadius, 
    setBorderRadius, 
    borderRadiusCard,
    setBorderRadiusCard,
    footerRadiusTopLeft,
    setFooterRadiusTopLeft,
    footerRadiusTopRight,
    setFooterRadiusTopRight,
  } = useTheme();

  const {
    cursorConfig,
    setCursorStyle,
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
    togglePin,
    toggleElementVisibility,
    resetFooterConfig
  } = useFooter();

  const {
    config: backgroundConfig,
    setOverlayOpacity,
    setBlurAmount,
    resetToDefaultGradient,
    downloadJsonFile,
    importConfigFromJson,
    resetToDefaultJsonLibrary
  } = useBackground();

  // Active Category Filter for navigation
  const [activeCategory, setActiveCategory] = useState<"all" | "theme" | "colors" | "display" | "radius" | "cursor" | "sound" | "footer" | "typography">("all");

  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [copiedCss, setCopiedCss] = useState(false);
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string | null>(null);

  // Unsaved border radius local states
  const [tempBorderRadius, setTempBorderRadius] = useState(borderRadius);
  const [tempBorderRadiusCard, setTempBorderRadiusCard] = useState(borderRadiusCard);
  const [tempFooterRadiusTopLeft, setTempFooterRadiusTopLeft] = useState(footerRadiusTopLeft);
  const [tempFooterRadiusTopRight, setTempFooterRadiusTopRight] = useState(footerRadiusTopRight);
  const [isFooterCornersLinked, setIsFooterCornersLinked] = useState(false);

  // Sync temp values when context values change
  useEffect(() => {
    setTempBorderRadius(borderRadius);
  }, [borderRadius]);

  useEffect(() => {
    setTempBorderRadiusCard(borderRadiusCard);
  }, [borderRadiusCard]);

  useEffect(() => {
    setTempFooterRadiusTopLeft(footerRadiusTopLeft);
  }, [footerRadiusTopLeft]);

  useEffect(() => {
    setTempFooterRadiusTopRight(footerRadiusTopRight);
  }, [footerRadiusTopRight]);

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
      ? `/* DARK NEON GLASS — 5 MÀU CHỦ ĐẠO */\n[data-theme="dark"] {\n  --color-primary: ${p1};   /* Main Action / Primary */\n  --color-secondary: ${p2}; /* Secondary Links / Nav */\n  --color-accent: ${p3};    /* Accent / Glow */\n  --color-highlight: ${p4}; /* Highlight Feature */\n  --color-soft: ${p5};      /* Soft Status / Positive */\n  --theme-radius-card: ${borderRadius}px;\n  --font-scale: ${fontScale}%;\n}`
      : `/* LIGHT GLASS — 5 MÀU CHỦ ĐẠO */\n:root {\n  --color-primary: ${p1};   /* Primary Action */\n  --color-secondary: ${p2}; /* Secondary Indigo */\n  --color-accent: ${p3};    /* Accent Cyan */\n  --color-highlight: ${p4}; /* Highlight Violet */\n  --color-soft: ${p5};      /* Soft Sky */\n  --theme-radius-card: ${borderRadius}px;\n  --font-scale: ${fontScale}%;\n}`;
    navigator.clipboard.writeText(cssCode);
    setCopiedCss(true);
    playSuccess();
    setTimeout(() => setCopiedCss(false), 2000);
  };

  const triggerResetFeedback = (msg: string) => {
    setResetSuccessMessage(msg);
    playSuccess();
    setTimeout(() => setResetSuccessMessage(null), 2500);
  };

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importConfigFromJson(content);
        if (result.success) {
          playSuccess();
          triggerResetFeedback(result.message);
        } else {
          triggerResetFeedback(result.message);
        }
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
      default: return VolumeX;
    }
  };

  // Check section visibility according to active filter
  const isSectionVisible = (category: typeof activeCategory) => {
    return activeCategory === "all" || activeCategory === category;
  };

  return (
    <section 
      id="customization" 
      className="relative w-full h-full flex flex-col justify-start items-stretch p-[var(--grid-margin,15px)] font-sans text-slate-800 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar"
      style={{ '--grid-margin': '15px', '--grid-gutter': '16px' } as React.CSSProperties}
    >
      <div className="w-full flex-grow flex flex-col gap-[15px] max-w-7xl mx-auto justify-start">
        {/* 1. Standard Page Card Header */}
        <PageCardHeader pageId="customization" />

      {/* Floating Confirmation Toast */}
      <AnimatePresence>
        {resetSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            className="mb-4 px-4 py-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center justify-between backdrop-blur-xl shadow-lg"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>{resetSuccessMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Interactive Quick Navigation & Category Switcher (GLASS TAB BAR - Matches Template Page format) */}
      <div className="w-full p-1.5 rounded-[12px] bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 backdrop-blur-2xl shadow-sm flex items-center gap-1.5 overflow-x-auto no-scrollbar mb-6">
        {[
          { id: "all" as const, labelVi: "Tất cả mục", labelEn: "All Modules", icon: Settings2 },
          { id: "theme" as const, labelVi: "1. Chế độ giao diện", labelEn: "1. Theme Mode", icon: Sun },
          { id: "colors" as const, labelVi: "2. Bảng màu chủ đạo", labelEn: "2. Color Palettes", icon: Palette },
          { id: "display" as const, labelVi: "3. Hiệu ứng hiển thị", labelEn: "3. Display FX", icon: Sliders },
          { id: "radius" as const, labelVi: "4. Bo cong góc", labelEn: "4. Border Radius", icon: Layers },
          { id: "cursor" as const, labelVi: "5. Chuột & Vệt sáng", labelEn: "5. Cursor FX", icon: MousePointer },
          { id: "sound" as const, labelVi: "6. Âm thanh & Nhạc nền", labelEn: "6. Audio FX", icon: Volume2 },
          { id: "footer" as const, labelVi: "7. Chân trang Footer", labelEn: "7. Footer Dock", icon: PanelBottom },
          { id: "typography" as const, labelVi: "8. Phông chữ & Tỷ lệ", labelEn: "8. Typography", icon: Type },
        ].map((tab) => {
          const isActive = activeCategory === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveCategory(tab.id);
                playClick();
              }}
              className={cn(
                "px-3.5 py-2 rounded-[9px] text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer shrink-0",
                isActive
                  ? "bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-md shadow-indigo-500/20 scale-[1.02]"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{isVi ? tab.labelVi : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Configuration Modules Displayed Seamlessly */}
      <div className="w-full space-y-6 sm:space-y-8">

        {/* ========================================================================= */}
        {/* MỤC 1: GIAO DIỆN & NGÔN NGỮ (THEME & LANGUAGE) */}
        {/* ========================================================================= */}
        {isSectionVisible("theme") && (
          <section className="p-5 sm:p-6 bg-white/75 dark:bg-slate-900/75 border border-slate-200/90 dark:border-white/10 backdrop-blur-2xl shadow-xs" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sun className="w-5 h-5 text-amber-500" />
                  {isVi ? "1. Chế độ giao diện & Ngôn ngữ hiển thị" : "1. Theme Mode & Display Language"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {isVi ? "Tùy chỉnh thẩm mỹ ánh sáng kính mờ toàn diện và ngôn ngữ song ngữ" : "Curate aesthetic lighting, glassmorphism mode and bilingual system language"}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-2xs font-mono uppercase px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 font-bold border border-indigo-500/20">
                  {theme}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-5">
              {[
                {
                  id: "mritech-digital-growth" as ThemeType,
                  nameVi: "MRITECH Digital Growth 🚀",
                  nameEn: "MRITECH Digital Growth 🚀",
                  descVi: "Giao diện sáng kính mờ thanh lịch, sắc nét chuẩn doanh nghiệp",
                  descEn: "Clean corporate glass aesthetic with modern vibrancy",
                  tagVi: "Khuyên dùng",
                  tagEn: "Recommended",
                  colorPreview: "from-blue-600 to-indigo-600",
                },
                {
                  id: "glass-dark-neon" as ThemeType,
                  nameVi: "Glass Tối Neon (Dark Neon)",
                  nameEn: "Glass Dark Neon",
                  descVi: "Nền tối huyền ảo, ánh sáng neon cyberpunk và tương phản cao",
                  descEn: "Deep dark canvas with vibrant neon glow accents",
                  tagVi: "Chế độ Tối",
                  tagEn: "Dark Mode",
                  colorPreview: "from-cyan-400 to-purple-600",
                }
              ].map((item) => {
                const isSelected = theme === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setTheme(item.id);
                      playClick();
                    }}
                    className={cn(
                      "relative p-4 rounded-xl text-left transition-all duration-200 cursor-pointer border flex flex-col justify-between group/card",
                      isSelected
                        ? "ring-2 ring-indigo-500 dark:ring-cyan-400 bg-indigo-500/5 dark:bg-cyan-500/10 border-indigo-500/40 shadow-sm"
                        : "hover:bg-slate-50 dark:hover:bg-white/5 border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5"
                    )}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-6 h-6 rounded-lg bg-gradient-to-br shadow-xs", item.colorPreview)} />
                        <span className="text-2xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                          {isVi ? item.tagVi : item.tagEn}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-indigo-600 dark:bg-cyan-400 text-white dark:text-slate-950 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover/card:text-indigo-600 dark:group-hover/card:text-cyan-400 transition-colors">
                        {isVi ? item.nameVi : item.nameEn}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {isVi ? item.descVi : item.descEn}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Language Selection Row */}
            <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Globe className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {isVi ? "Ngôn ngữ song ngữ (Bilingual Language)" : "Bilingual Language"}
                  </h4>
                  <p className="text-3xs text-slate-500 dark:text-slate-400">
                    {isVi ? "Chuyển đổi toàn bộ nội dung sang Tiếng Việt hoặc Tiếng Anh" : "Switch website copy between Vietnamese and English"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-white/10 shadow-2xs">
                <button
                  type="button"
                  onClick={() => { setLang("vi"); playClick(); }}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                    lang === "vi" 
                      ? "bg-indigo-600 text-white shadow-xs" 
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  🇻🇳 Tiếng Việt
                </button>
                <button
                  type="button"
                  onClick={() => { setLang("en"); playClick(); }}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                    lang === "en" 
                      ? "bg-indigo-600 text-white shadow-xs" 
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  🇬🇧 English
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* MỤC 2: BẢNG MÀU TOKENS (COLOR SYSTEM & DESIGN TOKENS) */}
        {/* ========================================================================= */}
        {isSectionVisible("colors") && (
          <section className="p-5 sm:p-6 bg-white/75 dark:bg-slate-900/75 border border-slate-200/90 dark:border-white/10 backdrop-blur-2xl shadow-xs" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-indigo-500" />
                  {isVi ? "2. Bảng màu chủ đạo & Design Tokens" : "2. Color Palettes & Design Tokens"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {isVi ? "Các gam màu thiết kế đã được cân chỉnh độ tương phản WCAG AAA" : "Curated color schemes with calibrated WCAG AAA contrast ratios"}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopyCss}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all cursor-pointer w-fit"
              >
                {copiedCss ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Code2 className="w-3.5 h-3.5 text-indigo-500" />}
                <span>{copiedCss ? (isVi ? "Đã sao chép CSS" : "CSS Copied") : (isVi ? "Sao chép CSS Variables" : "Copy CSS Variables")}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
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
                        : "hover:bg-slate-50 dark:hover:bg-white/5 border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5"
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

            {/* Active Palette Details & Token Swatches */}
            <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                {isVi ? "Chi tiết 5 màu Tokens hiện tại (Click để copy HEX):" : "Active 5 Token Palette (Click to copy HEX):"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {activePalette.map((token) => (
                  <button
                    key={token.id}
                    type="button"
                    onClick={() => handleCopy(token.hex, token.id)}
                    className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-white/10 transition-all text-left flex flex-col justify-between cursor-pointer group shadow-2xs"
                  >
                    <div 
                      className="w-full h-10 rounded-lg mb-2 shadow-inner border border-black/10 flex items-end justify-end p-1.5"
                      style={{ backgroundColor: token.hex }}
                    >
                      <span className="p-1 rounded bg-black/40 text-white text-3xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                        {copiedToken === token.id ? "Copied!" : <Copy className="w-3 h-3" />}
                      </span>
                    </div>
                    <div>
                      <div className="text-2xs font-bold uppercase text-slate-400 dark:text-slate-500">{token.name}</div>
                      <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">{token.hex}</div>
                      <div className="text-3xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{token.roleVi}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* MỤC 3: TÙY CHỈNH HIỆU ỨNG HIỂN THỊ HÌNH NỀN (DISPLAY & BACKGROUND TUNING) */}
        {/* ========================================================================= */}
        {isSectionVisible("display") && (
          <section className="p-5 sm:p-6 bg-white/75 dark:bg-slate-900/75 border border-slate-200/90 dark:border-white/10 backdrop-blur-2xl shadow-xs" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-indigo-500" />
                  {isVi ? "3. Tùy chỉnh hiệu ứng hiển thị & Hậu cảnh (Display Tuning)" : "3. Display Tuning & Wallpaper Effects"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {isVi ? "Độ tối lớp phủ (Overlay Dim), độ mờ hậu cảnh (Background Blur) và quản lý sao lưu kho hình nền" : "Overlay dimming, background blur and wallpaper library sync"}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    resetToDefaultGradient();
                    triggerResetFeedback(isVi ? "Đã khôi phục nền Gradient mặc định" : "Reset to default gradient");
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                    backgroundConfig.activeType === 'gradient'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isVi ? "Nền Gradient Mặc Định" : "Default Gradient"}</span>
                </button>
                <button
                  type="button"
                  onClick={downloadJsonFile}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
                  title={isVi ? "Xuất dữ liệu kho hình nền ra file JSON" : "Export wallpaper library to JSON"}
                >
                  <Download className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span>{isVi ? "Tải JSON" : "Export JSON"}</span>
                </button>
                <label 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
                  title={isVi ? "Nhập dữ liệu kho hình nền từ file JSON" : "Import wallpaper library from JSON"}
                >
                  <Upload className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>{isVi ? "Nhập JSON" : "Import JSON"}</span>
                  <input 
                    type="file" 
                    accept=".json,application/json" 
                    onChange={handleImportJsonFile} 
                    className="hidden" 
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Overlay Dim Slider */}
              <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>{isVi ? "Độ tối lớp phủ (Overlay Dim):" : "Overlay Dimming:"}</span>
                  <span className="font-mono text-sm font-black text-blue-600 dark:text-cyan-400 px-2 py-0.5 rounded-md bg-blue-500/10 dark:bg-cyan-500/10">{backgroundConfig.overlayOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={backgroundConfig.overlayOpacity}
                  onChange={(e) => {
                    setOverlayOpacity(Number(e.target.value));
                    playClick();
                  }}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-cyan-400"
                />
                <p className="text-[10px] text-slate-500">
                  {isVi ? "Tăng độ tối để văn bản và thẻ kính nổi bật rõ nét hơn" : "Increase dimness for enhanced text readability over vibrant wallpapers"}
                </p>
              </div>

              {/* Background Blur Slider */}
              <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>{isVi ? "Độ mờ hậu cảnh (Background Blur):" : "Background Blur:"}</span>
                  <span className="font-mono text-sm font-black text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-md bg-purple-500/10 dark:bg-purple-500/10">{backgroundConfig.blurAmount}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={backgroundConfig.blurAmount}
                  onChange={(e) => {
                    setBlurAmount(Number(e.target.value));
                    playClick();
                  }}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600 dark:accent-purple-400"
                />
                <p className="text-[10px] text-slate-500">
                  {isVi ? "Làm mờ ảnh/video nền để tạo chiều sâu quang học glassmorphism" : "Apply gaussian blur filter to the background media"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-2xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-white/10">
              <span>💡 {isVi ? "Hệ thống tự động lưu cấu hình vĩnh viễn vào bộ nhớ trình duyệt." : "Settings are permanently auto-saved in browser storage."}</span>
              <button 
                type="button" 
                onClick={() => {
                  resetToDefaultJsonLibrary();
                  triggerResetFeedback(isVi ? "Đã khôi phục kho hình nền chuẩn hệ thống" : "Restored system wallpaper library");
                }} 
                className="text-blue-500 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{isVi ? "Khôi phục kho vĩnh viễn" : "Restore permanent library"}</span>
              </button>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* MỤC 4: BO GÓC THẺ & KHUNG (BORDER RADIUS SYSTEM) */}
        {/* ========================================================================= */}
        {isSectionVisible("radius") && (
          <section className="p-5 sm:p-6 bg-white/75 dark:bg-slate-900/75 border border-slate-200/90 dark:border-white/10 backdrop-blur-2xl shadow-xs" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-500" />
                  {isVi ? "4. Tùy chỉnh độ bo cong góc (Border Radius)" : "4. Border Radius Customization"}
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
                    setTempFooterRadiusTopLeft(14);
                    setTempFooterRadiusTopRight(14);
                    setBorderRadius(10);
                    if (setBorderRadiusCard) setBorderRadiusCard(14);
                    if (setFooterRadiusTopLeft) setFooterRadiusTopLeft(14);
                    if (setFooterRadiusTopRight) setFooterRadiusTopRight(14);
                    triggerResetFeedback(isVi ? "Đã khôi phục bo góc chuẩn hệ thống 🔄" : "Reset border-radius to defaults 🔄");
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
                    if (setBorderRadiusCard) setBorderRadiusCard(tempBorderRadiusCard);
                    if (setFooterRadiusTopLeft) setFooterRadiusTopLeft(tempFooterRadiusTopLeft);
                    if (setFooterRadiusTopRight) setFooterRadiusTopRight(tempFooterRadiusTopRight);
                    triggerResetFeedback(isVi ? "Đã áp dụng độ bo cong góc mới toàn website! 🎉" : "Applied new corner radius configurations site-wide! 🎉");
                  }}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer w-fit",
                    tempBorderRadius !== borderRadius || 
                    tempBorderRadiusCard !== borderRadiusCard ||
                    tempFooterRadiusTopLeft !== footerRadiusTopLeft ||
                    tempFooterRadiusTopRight !== footerRadiusTopRight
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-cyan-500 dark:hover:bg-cyan-600 dark:text-slate-950 scale-[1.02]"
                      : "bg-slate-100/80 dark:bg-white/5 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                  )}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isVi ? "Lưu & Áp dụng" : "Save & Apply"}</span>
                </button>
              </div>
            </div>

            {/* Sliders Container (Dual Customization Panel) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              {/* Slider 1: System Elements Radius */}
              <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10">
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
              <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10">
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
                    if (setBorderRadiusCard) setBorderRadiusCard(val);
                  }}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500 dark:accent-rose-400"
                />
              </div>
            </div>

            {/* Dedicated Panel: Tùy chỉnh bo cong chân trang Footer (Góc trên trái & Góc trên phải) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-slate-50/80 dark:from-slate-850 dark:via-slate-800/80 dark:to-slate-900 border border-blue-200/80 dark:border-blue-900/50 mb-5 space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-blue-200/60 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/10 dark:bg-cyan-400/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <PanelBottom className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{isVi ? "Tùy chỉnh bo cong góc trên của Footer" : "Footer Top Corners Curvature"}</span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-cyan-300 border border-blue-500/20">
                        {isVi ? "Góc trên trái & Góc trên phải" : "Top-Left & Top-Right"}
                      </span>
                    </h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {isVi 
                        ? "Điều chỉnh linh hoạt bo cong góc trên bên trái và góc trên bên phải của Footer dock" 
                        : "Independently adjust top-left and top-right curvature of the bottom footer dock"}
                    </p>
                  </div>
                </div>

                {/* Link / Unlink Corners Button */}
                <button
                  type="button"
                  onClick={() => {
                    const nextLinked = !isFooterCornersLinked;
                    setIsFooterCornersLinked(nextLinked);
                    if (nextLinked) {
                      setTempFooterRadiusTopRight(tempFooterRadiusTopLeft);
                    }
                    playClick();
                  }}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer w-fit self-start sm:self-auto",
                    isFooterCornersLinked
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-blue-400"
                  )}
                  title={isFooterCornersLinked ? (isVi ? "Đang đồng bộ 2 góc (Bấm để tách riêng)" : "Corners linked (Click to unlink)") : (isVi ? "Đang tách biệt 2 góc (Bấm để đồng bộ)" : "Corners independent (Click to link)")}
                >
                  {isFooterCornersLinked ? <Link2 className="w-3.5 h-3.5" /> : <Unlink className="w-3.5 h-3.5" />}
                  <span>{isFooterCornersLinked ? (isVi ? "Đồng bộ 2 góc" : "Linked Corners") : (isVi ? "Tách biệt từng góc" : "Independent Corners")}</span>
                </button>
              </div>

              {/* Sliders for Top-Left and Top-Right */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Top-Left Slider */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/90 dark:bg-slate-900/70 border border-slate-200/90 dark:border-white/10 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-tl-lg rounded-tr-none rounded-bl-none rounded-br-none border-t-2 border-l-2 border-blue-600 dark:border-cyan-400 bg-blue-500/20" />
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {isVi ? "Bo cong bên trên góc trái Footer:" : "Footer Top-Left Radius:"}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-mono font-black text-blue-600 dark:text-cyan-400 px-2 py-0.5 rounded-md bg-blue-500/10 dark:bg-cyan-500/10 border border-blue-500/20">
                      {tempFooterRadiusTopLeft}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    step={1}
                    value={tempFooterRadiusTopLeft}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setTempFooterRadiusTopLeft(val);
                      if (setFooterRadiusTopLeft) setFooterRadiusTopLeft(val);
                      if (isFooterCornersLinked) {
                        setTempFooterRadiusTopRight(val);
                        if (setFooterRadiusTopRight) setFooterRadiusTopRight(val);
                      }
                    }}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-cyan-400"
                  />
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1 font-mono">
                    <span>0px</span>
                    <span>14px (chuẩn)</span>
                    <span>40px</span>
                  </div>
                </div>

                {/* Top-Right Slider */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/90 dark:bg-slate-900/70 border border-slate-200/90 dark:border-white/10 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-tr-lg rounded-tl-none rounded-bl-none rounded-br-none border-t-2 border-r-2 border-indigo-600 dark:border-indigo-400 bg-indigo-500/20" />
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {isVi ? "Bo cong bên trên góc phải Footer:" : "Footer Top-Right Radius:"}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-mono font-black text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md bg-indigo-500/10 dark:bg-indigo-500/10 border border-indigo-500/20">
                      {tempFooterRadiusTopRight}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    step={1}
                    value={tempFooterRadiusTopRight}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setTempFooterRadiusTopRight(val);
                      if (setFooterRadiusTopRight) setFooterRadiusTopRight(val);
                      if (isFooterCornersLinked) {
                        setTempFooterRadiusTopLeft(val);
                        if (setFooterRadiusTopLeft) setFooterRadiusTopLeft(val);
                      }
                    }}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400"
                  />
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1 font-mono">
                    <span>0px</span>
                    <span>14px (chuẩn)</span>
                    <span>40px</span>
                  </div>
                </div>
              </div>

              {/* Quick Corner Presets for Footer */}
              <div>
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-2">
                  {isVi ? "Mẫu nhanh độ bo cong Footer:" : "Quick Footer Radius Presets:"}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {[
                    { labelVi: "Vuông góc (0px)", labelEn: "Flat (0px)", l: 0, r: 0 },
                    { labelVi: "Thon gọn (10px)", labelEn: "Slim (10px)", l: 10, r: 10 },
                    { labelVi: "Chuẩn (14px)", labelEn: "System (14px)", l: 14, r: 14 },
                    { labelVi: "Mềm mại (20px)", labelEn: "Soft (20px)", l: 20, r: 20 },
                    { labelVi: "Bo lớn (28px)", labelEn: "Curved (28px)", l: 28, r: 28 },
                    { labelVi: "Vát lượn (24-8px)", labelEn: "Asymmetric (24-8)", l: 24, r: 8 },
                  ].map((preset, idx) => {
                    const isActive = tempFooterRadiusTopLeft === preset.l && tempFooterRadiusTopRight === preset.r;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setTempFooterRadiusTopLeft(preset.l);
                          setTempFooterRadiusTopRight(preset.r);
                          if (setFooterRadiusTopLeft) setFooterRadiusTopLeft(preset.l);
                          if (setFooterRadiusTopRight) setFooterRadiusTopRight(preset.r);
                          if (preset.l === preset.r) {
                            setIsFooterCornersLinked(true);
                          } else {
                            setIsFooterCornersLinked(false);
                          }
                          playClick();
                        }}
                        className={cn(
                          "px-2.5 py-1.5 rounded-lg text-2xs font-semibold border transition-all text-center cursor-pointer",
                          isActive
                            ? "bg-blue-600 text-white border-blue-600 shadow-2xs font-bold"
                            : "bg-white/70 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-blue-400"
                        )}
                      >
                        {isVi ? preset.labelVi : preset.labelEn}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Live Footer Preview Component */}
              <div className="pt-1">
                <div className="flex items-center justify-between text-2xs text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="font-semibold">{isVi ? "Mô phỏng hình dáng thanh Footer thực tế:" : "Live Footer Dock Simulation:"}</span>
                  <span className="font-mono text-3xs font-bold text-blue-600 dark:text-cyan-400">
                    Trái: {tempFooterRadiusTopLeft}px • Phải: {tempFooterRadiusTopRight}px • Đáy: 0px
                  </span>
                </div>
                <div className="p-3 bg-slate-200/60 dark:bg-black/40 rounded-xl border border-slate-300/40 dark:border-white/5 flex flex-col justify-end min-h-[64px]">
                  <div
                    className="w-full h-11 bg-white/95 dark:bg-slate-900/95 border-t border-x border-b-0 border-blue-400/40 dark:border-cyan-400/40 backdrop-blur-md shadow-md flex items-center justify-between px-3 sm:px-4 transition-all duration-200"
                    style={{
                      borderTopLeftRadius: `${tempFooterRadiusTopLeft}px`,
                      borderTopRightRadius: `${tempFooterRadiusTopRight}px`,
                      borderBottomLeftRadius: "0px",
                      borderBottomRightRadius: "0px",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-200 hidden xs:inline">
                        12:00 PM • 28°C
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900">
                      <span>↓ {isVi ? "Lộ trang tiếp theo" : "Peek Next"} ↓</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 text-[10px]">
                        ⚙
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preset Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {RADIUS_PRESETS.map((preset) => {
                const isSelected = tempBorderRadius === preset.radius;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      const cardR = Math.min(32, preset.radius + 4);
                      setTempBorderRadius(preset.radius);
                      setTempBorderRadiusCard(cardR);
                      setBorderRadius(preset.radius);
                      if (setBorderRadiusCard) setBorderRadiusCard(cardR);
                      playClick();
                    }}
                    className={cn(
                      "p-4 rounded-xl text-left transition-all duration-200 cursor-pointer border flex flex-col justify-between group",
                      isSelected
                        ? "ring-2 ring-indigo-500 dark:ring-cyan-400 bg-indigo-500/5 dark:bg-cyan-500/10 border-indigo-500/40 shadow-sm"
                        : "hover:bg-slate-50 dark:hover:bg-white/5 border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5"
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
                      radius: {preset.radius}px
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* MỤC 5: CON TRỎ CHUỘT FX (CURSOR FX) */}
        {/* ========================================================================= */}
        {isSectionVisible("cursor") && (
          <section className="p-5 sm:p-6 bg-white/75 dark:bg-slate-900/75 border border-slate-200/90 dark:border-white/10 backdrop-blur-2xl shadow-xs" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <MousePointer className="w-5 h-5 text-indigo-500" />
                  {isVi ? "5. Con trỏ chuột tương tác (Interactive Cursor FX)" : "5. Interactive Cursor FX"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {isVi ? "Hiệu ứng con trỏ chuột độc đáo tạo cảm giác công nghệ cao cấp" : "Unique pointer dynamics and interactive comet trails"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  resetCursorConfig();
                  triggerResetFeedback(isVi ? "Đã khôi phục con trỏ mặc định" : "Reset cursor to defaults");
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-all cursor-pointer w-fit"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isVi ? "Mặc định" : "Default"}</span>
              </button>
            </div>

            {/* Cursor Styles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
              {CURSOR_STYLE_OPTIONS.map((opt) => {
                const isSelected = cursorConfig.style === opt.id;
                const Icon = getCursorStyleIcon(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setCursorStyle(opt.id);
                      playClick();
                    }}
                    className={cn(
                      "p-4 rounded-xl text-left transition-all duration-200 cursor-pointer border flex flex-col justify-between group",
                      isSelected
                        ? "ring-2 ring-indigo-500 dark:ring-cyan-400 bg-indigo-500/5 dark:bg-cyan-500/10 border-indigo-500/40 shadow-sm"
                        : "hover:bg-slate-50 dark:hover:bg-white/5 border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className={cn("w-4 h-4", isSelected ? "text-indigo-600 dark:text-cyan-400" : "text-slate-400")} />
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {isVi ? opt.nameVi : opt.nameEn}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-indigo-600 dark:bg-cyan-400 text-white dark:text-slate-950 flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="text-2xs text-slate-500 dark:text-slate-400">
                      {isVi ? opt.descVi : opt.descEn}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Secondary Cursor Controls: Trail & Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{isVi ? "Hiệu ứng vệt sáng (Trail)" : "Comet Trail Effect"}</div>
                  <div className="text-2xs text-slate-500">{isVi ? "Vệt sáng sao băng lướt theo chuột" : "Smooth comet trail follows cursor movement"}</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEnableTrail(!cursorConfig.enableTrail);
                    playClick();
                  }}
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center",
                    cursorConfig.enableTrail ? "bg-indigo-600 dark:bg-cyan-400 justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
                  )}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{isVi ? "Kích thước con trỏ" : "Cursor Size"}</div>
                  <div className="text-2xs text-slate-500">{isVi ? "Điều chỉnh kích thước vòng sáng" : "Select pointer radius scale"}</div>
                </div>
                <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-white/10">
                  {(["small", "medium", "large"] as const).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => { setCursorSize(size); playClick(); }}
                      className={cn(
                        "px-2.5 py-1 rounded text-2xs font-bold capitalize transition-all cursor-pointer",
                        cursorConfig.size === size 
                          ? "bg-indigo-600 text-white shadow-xs" 
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* MỤC 6: ÂM THANH FX & MÔI TRƯỜNG (AUDIO & SOUNDSCAPE) */}
        {/* ========================================================================= */}
        {isSectionVisible("sound") && (
          <section className="p-5 sm:p-6 bg-white/75 dark:bg-slate-900/75 border border-slate-200/90 dark:border-white/10 backdrop-blur-2xl shadow-xs" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-indigo-500" />
                  {isVi ? "6. Hệ thống âm thanh tương tác & Thư giãn" : "6. Audio FX & Ambient Soundscape"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {isVi ? "Âm thanh click phản hồi UI và âm thanh môi trường thư giãn" : "Tactile UI click feedback and relaxing ambient background sounds"}
                </p>
              </div>
              <div className="flex items-center gap-2">
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              {[
                { labelVi: "Âm lượng tổng (Master)", labelEn: "Master Volume", val: soundConfig.masterVolume, set: setMasterVolume },
                { labelVi: "Âm click UI (Interface)", labelEn: "UI Sound Volume", val: soundConfig.uiVolume, set: setUiVolume },
                { labelVi: "Âm nền môi trường (Ambient)", labelEn: "Ambient Volume", val: soundConfig.ambientVolume, set: setAmbientVolume }
              ].map((vol, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10">
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
              <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2.5 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  {isVi ? "Gói hiệu ứng nhấp chuột (UI Sound Pack):" : "UI Click Sound Pack:"}
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
                            : "hover:bg-slate-100 dark:hover:bg-white/5 border-slate-200/80 dark:border-white/5 text-slate-700 dark:text-slate-300 bg-white/60 dark:bg-slate-800/60"
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
              <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2.5 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-sky-500" />
                  {isVi ? "Âm thanh môi trường thư giãn (Ambient):" : "Relaxing Soundscape:"}
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
                            : "hover:bg-slate-100 dark:hover:bg-white/5 border-slate-200/80 dark:border-white/5 text-slate-700 dark:text-slate-300 bg-white/60 dark:bg-slate-800/60"
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
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* MỤC 7: CHÂN TRANG FOOTER (FOOTER DOCK SETTINGS) */}
        {/* ========================================================================= */}
        {isSectionVisible("footer") && (
          <section className="p-5 sm:p-6 bg-white/75 dark:bg-slate-900/75 border border-slate-200/90 dark:border-white/10 backdrop-blur-2xl shadow-xs" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <PanelBottom className="w-5 h-5 text-indigo-500" />
                  {isVi ? "7. Tùy chỉnh thanh chân trang (Footer Dock)" : "7. Footer Dock Settings"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {isVi ? "Kiểu dáng hiển thị, vị trí ghim và cấu hình các nút tính năng" : "Dock placement, pinned state and widget visibility toggles"}
                </p>
              </div>
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

            {/* Placement Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
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
                        : "hover:bg-slate-50 dark:hover:bg-white/5 border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5"
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

            {/* Header & Footer Sticky Behavior Option */}
            <div className="mb-5 p-4 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-3">
                {isVi ? "Tùy chỉnh Cố định Header & Footer:" : "Header & Footer Pinning Mode:"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setFixedHeaderFooter(true);
                    playClick();
                  }}
                  className={cn(
                    "p-3 rounded-xl text-left transition-all border flex items-center justify-between cursor-pointer",
                    fixedHeaderFooter
                      ? "ring-2 ring-indigo-500 dark:ring-cyan-400 bg-indigo-500/5 dark:bg-cyan-500/10 border-indigo-500/40 shadow-sm"
                      : "hover:bg-slate-50 dark:hover:bg-white/5 border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5"
                  )}
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {isVi ? "Cố định Header & Footer" : "Fixed Header & Footer"}
                    </div>
                    <div className="text-3xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {isVi ? "Luôn hiển thị thanh Header và Footer chuẩn khi qua các trang" : "Always show standard Header and Footer when browsing"}
                    </div>
                  </div>
                  {fixedHeaderFooter && <Check className="w-4 h-4 text-indigo-600 dark:text-cyan-400 shrink-0 ml-2" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFixedHeaderFooter(false);
                    playClick();
                  }}
                  className={cn(
                    "p-3 rounded-xl text-left transition-all border flex items-center justify-between cursor-pointer",
                    !fixedHeaderFooter
                      ? "ring-2 ring-indigo-500 dark:ring-cyan-400 bg-indigo-500/5 dark:bg-cyan-500/10 border-indigo-500/40 shadow-sm"
                      : "hover:bg-slate-50 dark:hover:bg-white/5 border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5"
                  )}
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {isVi ? "Không cố định Header & Footer" : "Unfixed (Peeking) Header & Footer"}
                    </div>
                    <div className="text-3xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {isVi ? "Lộ 1 phần trang trước/tiếp để chuyển trang; dồn menu vào góc phải" : "Peeks prev/next pages; folds all items into top-right menu"}
                    </div>
                  </div>
                  {!fixedHeaderFooter && <Check className="w-4 h-4 text-indigo-600 dark:text-cyan-400 shrink-0 ml-2" />}
                </button>
              </div>
            </div>

            {/* Toggles List */}
            <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 space-y-3">
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
                  <div key={item.key} className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-white/10 shadow-2xs">
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
          </section>
        )}

        {/* ========================================================================= */}
        {/* MỤC 8: PHÔNG CHỮ & TYPOGRAPHY (TYPOGRAPHY SCALE MATRIX) */}
        {/* ========================================================================= */}
        {isSectionVisible("typography") && (
          <section className="p-5 sm:p-6 bg-white/75 dark:bg-slate-900/75 border border-slate-200/90 dark:border-white/10 backdrop-blur-2xl shadow-xs" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Type className="w-5 h-5 text-indigo-500" />
                  {isVi ? "8. Hệ thống phông chữ & Tỷ lệ (Typography Matrix)" : "8. Typography Scale Matrix"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {isVi ? "Tỷ lệ cỡ chữ linh hoạt và bộ mẫu phân cấp trực quan" : "Scalable responsive hierarchy and live preview test arena"}
                </p>
              </div>
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

            {/* Font Scale Selector */}
            <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 mb-5">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">{isVi ? "Tỷ lệ kích thước chữ toàn trang (Font Scale):" : "Global Font Scale:"}</div>
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
                      "p-2.5 rounded-lg text-xs font-bold transition-all border text-center cursor-pointer shadow-2xs",
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
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">{isVi ? "Bảng phân cấp Typography Tokens:" : "Hierarchy Tokens:"}</h4>
              {TYPO_TOKENS.map((token) => (
                <div
                  key={token.id}
                  className="p-3 rounded-xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="min-w-[180px]">
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{isVi ? token.labelVi : token.labelEn}</div>
                    <div className="text-3xs font-mono text-slate-400">Size: {token.size} | Weight: {token.weight}</div>
                  </div>
                  <div className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate flex-1">
                    {token.sampleText}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
      </div>
    </section>
  );
}
