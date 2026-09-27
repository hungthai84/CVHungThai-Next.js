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
  Moon, 
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
  Bot, 
  Clock, 
  CloudSun, 
  Printer, 
  ChevronDown, 
  LayoutTemplate,
  Monitor,
  ShieldCheck,
  Zap,
  Play
} from "lucide-react";
import { PageCardHeader } from "./PageCardHeader";
import { useLanguage } from "../i18n";
import { useTheme, COLOR_PRESETS, ThemeType } from "../context/ThemeContext";
import { useCursor } from "../context/CursorContext";
import { useSound } from "../context/SoundContext";
import { useFooter, FooterModalTab } from "../context/FooterContext";
import { CURSOR_STYLE_OPTIONS, CURSOR_COLOR_OPTIONS } from "../data/cursorData";
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
    resetBorderRadius 
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
    resetFooterConfig,
    footerModalTab,
    setFooterModalTab
  } = useFooter();

  // Active Tab state
  const [activeTab, setActiveTab] = useState<FooterModalTab>("customization");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [copiedCss, setCopiedCss] = useState(false);
  const [customTestText, setCustomTestText] = useState("");
  const [activeTypoToken, setActiveTypoToken] = useState("body");
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string | null>(null);

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
      ? `/* DARK NEON GLASS — 5 MÀU CHỦ ĐẠO */\n[data-theme="dark"] {\n  --color-primary: ${p1};   /* Main Action / Primary */\n  --color-secondary: ${p2}; /* Secondary Links / Nav */\n  --color-accent: ${p3};    /* Accent / Glow */\n  --color-highlight: ${p4}; /* Highlight Feature */\n  --color-soft: ${p5};      /* Soft Status / Positive */\n  --theme-radius-card: ${borderRadius}px;\n  --font-scale: ${fontScale};\n}`
      : `/* LIGHT GLASS — 5 MÀU CHỦ ĐẠO */\n:root {\n  --color-primary: ${p1};   /* Primary Action */\n  --color-secondary: ${p2}; /* Secondary Indigo */\n  --color-accent: ${p3};    /* Accent Cyan */\n  --color-highlight: ${p4}; /* Highlight Violet */\n  --color-soft: ${p5};      /* Soft Sky */\n  --theme-radius-card: ${borderRadius}px;\n  --font-scale: ${fontScale};\n}`;
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

  const TABS: { id: FooterModalTab; nameVi: string; nameEn: string; Icon: React.ElementType }[] = [
    { id: "customization", nameVi: "Giao diện & Chế độ", nameEn: "Theme & Mode", Icon: Sun },
    { id: "colors", nameVi: "Bảng màu Tokens", nameEn: "Color System", Icon: Palette },
    { id: "radius", nameVi: "Bo góc thẻ", nameEn: "Border Radius", Icon: Layers },
    { id: "cursor", nameVi: "Con trỏ FX", nameEn: "Cursor FX", Icon: MousePointer },
    { id: "sound", nameVi: "Âm thanh FX", nameEn: "Audio & FX", Icon: Volume2 },
    { id: "footer", nameVi: "Chân trang Footer", nameEn: "Footer Dock", Icon: PanelBottom },
    { id: "typography", nameVi: "Phông chữ Typography", nameEn: "Typography", Icon: Type },
  ];

  return (
    <div className="w-full h-full min-h-full flex flex-col justify-start pb-12 pt-2 px-3 sm:px-6 md:px-8 max-w-[1240px] mx-auto select-none">
      {/* 1. Standard Page Card Header */}
      <PageCardHeader pageId="customization" />

      {/* Reset confirmation toast */}
      <AnimatePresence>
        {resetSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            className="mb-4 px-4 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center justify-between backdrop-blur-md shadow-sm"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{resetSuccessMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Top Navigation Tabs Bar (Sticky Glass Container) */}
      <div className="sticky top-0 z-30 w-full mb-6 py-2 px-1 rounded-2xl bg-slate-100/90 dark:bg-[#121218]/90 border border-slate-200/80 dark:border-white/10 backdrop-blur-2xl shadow-md overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 min-w-max">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.Icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 relative",
                  isActive
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-cyan-400 shadow-sm border border-slate-200/80 dark:border-white/15 scale-[1.02]"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/5"
                )}
              >
                <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-indigo-600 dark:text-cyan-400" : "text-slate-400")} />
                <span>{isVi ? tab.nameVi : tab.nameEn}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-cyan-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Customization Panels Container */}
      <div className="w-full">
        {/* TAB 1: GIAO DIỆN & CHẾ ĐỘ (THEME & DISPLAY MODE) */}
        {activeTab === "customization" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Theme Presets Selection */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sun className="w-5 h-5 text-amber-500" />
                    {isVi ? "Chế độ giao diện chính" : "Primary Theme Mode"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {isVi ? "Lựa chọn phong cách hiển thị thẩm mỹ và ánh sáng kính mờ toàn diện" : "Choose aesthetic display style and pervasive glassmorphism lighting"}
                  </p>
                </div>
                <span className="text-2xs font-mono uppercase px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 font-bold border border-indigo-500/20 w-fit">
                  {theme}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
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
                    bgClass: "bg-white/80 border-slate-200"
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
                    bgClass: "bg-slate-950/80 border-cyan-500/30 text-white"
                  },
                  {
                    id: "modern-light-glass" as ThemeType,
                    nameVi: "Kính Mờ Hiện Đại (Modern Glass)",
                    nameEn: "Modern Light Glass",
                    descVi: "Kính bán trong suốt nhẹ nhàng, chuyển sắc mượt mà",
                    descEn: "Soft translucency with gentle gradient touches",
                    tagVi: "Tối giản",
                    tagEn: "Minimal",
                    colorPreview: "from-sky-500 to-teal-500",
                    bgClass: "bg-slate-50/80 border-slate-200"
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
                          : "hover:bg-slate-50 dark:hover:bg-white/5 border-slate-200 dark:border-white/10"
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
            </div>

            {/* Language Selection Bar */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs">
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
          </motion.div>
        )}

        {/* TAB 2: BẢNG MÀU & COLOR TOKENS */}
        {(activeTab as string) === "colors" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Color Presets */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs">
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
                <button
                  type="button"
                  onClick={handleCopyCss}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all cursor-pointer w-fit"
                >
                  {copiedCss ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Code2 className="w-3.5 h-3.5 text-indigo-500" />}
                  <span>{copiedCss ? (isVi ? "Đã sao chép CSS" : "CSS Copied") : (isVi ? "Sao chép CSS Variables" : "Copy CSS Variables")}</span>
                </button>
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

            {/* Active Palette Details & Token Swatches */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                {isVi ? "Chi tiết 5 màu Tokens hiện tại (Click để copy HEX)" : "Active 5 Token Palette (Click to copy HEX)"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {activePalette.map((token) => (
                  <button
                    key={token.id}
                    type="button"
                    onClick={() => handleCopy(token.hex, token.id)}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all text-left flex flex-col justify-between cursor-pointer group"
                  >
                    <div 
                      className="w-full h-12 rounded-lg mb-2.5 shadow-inner border border-black/10 flex items-end justify-end p-1.5"
                      style={{ backgroundColor: token.hex }}
                    >
                      <span className="p-1 rounded bg-black/40 text-white text-3xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                        {copiedToken === token.id ? "Copied!" : <Copy className="w-3 h-3" />}
                      </span>
                    </div>
                    <div>
                      <div className="text-2xs font-bold uppercase text-slate-400 dark:text-slate-500">{token.name}</div>
                      <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">{token.hex}</div>
                      <div className="text-3xs text-slate-500 dark:text-slate-400 truncate mt-1">{token.usage}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: BO GÓC THẺ & KHUNG (BORDER RADIUS) */}
        {activeTab === "radius" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="p-5 sm:p-6 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-indigo-500" />
                    {isVi ? "Tùy chỉnh độ bo cong góc (Border Radius)" : "Border Radius Customization"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {isVi ? "Áp dụng đồng bộ cho thẻ chính, nút bấm, header, footer và toàn bộ hệ thống" : "Synchronously applied to cards, buttons, header, footer dock and modals"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    resetBorderRadius();
                    triggerResetFeedback(isVi ? "Đã khôi phục bo góc chuẩn (10px)" : "Reset to default radius (10px)");
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-all cursor-pointer w-fit"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isVi ? "Mặc định (10px)" : "Default (10px)"}</span>
                </button>
              </div>

              {/* Slider Control */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isVi ? "Điều chỉnh độ bo cong tùy ý:" : "Custom Radius Slider:"}
                  </span>
                  <span className="text-sm font-mono font-black text-indigo-600 dark:text-cyan-400 px-2 py-0.5 rounded-md bg-indigo-500/10 dark:bg-cyan-500/10">
                    {borderRadius}px
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={32}
                  step={1}
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-cyan-400"
                />
              </div>

              {/* Preset Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {RADIUS_PRESETS.map((preset) => {
                  const isSelected = borderRadius === preset.radius;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setBorderRadius(preset.radius);
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
                        radius: {preset.radius}px
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: CON TRỎ CHUỘT FX (CURSOR FX) */}
        {activeTab === "cursor" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="p-5 sm:p-6 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <MousePointer className="w-5 h-5 text-indigo-500" />
                    {isVi ? "Tùy chỉnh con trỏ chuột tương tác (Cursor FX)" : "Interactive Cursor FX"}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
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
                          : "hover:bg-slate-50 dark:hover:bg-white/5 border-slate-200 dark:border-white/10"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
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
                  <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-white/10 p-1 rounded-lg">
                    {(["small", "medium", "large"] as const).map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => { setCursorSize(size); playClick(); }}
                        className={cn(
                          "px-2.5 py-1 rounded text-2xs font-bold capitalize transition-all cursor-pointer",
                          cursorConfig.size === size 
                            ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-cyan-400 shadow-xs" 
                            : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 5: ÂM THANH FX & MÔI TRƯỜNG (AUDIO & FX) */}
        {activeTab === "sound" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="p-5 sm:p-6 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs">
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
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 6: CHÂN TRANG FOOTER (FOOTER DOCK) */}
        {activeTab === "footer" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="p-5 sm:p-6 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <PanelBottom className="w-5 h-5 text-indigo-500" />
                    {isVi ? "Tùy chỉnh thanh chân trang (Footer Dock)" : "Footer Dock Settings"}
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
          </motion.div>
        )}

        {/* TAB 7: PHÔNG CHỮ & TYPOGRAPHY */}
        {activeTab === "typography" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="p-5 sm:p-6 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs">
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
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-6">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">{isVi ? "Tỷ lệ kích thước chữ toàn trang (Font Scale):" : "Global Font Scale:"}</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { scale: 0.9, labelVi: "Gọn gàng (90%)", labelEn: "Compact (90%)" },
                    { scale: 1.0, labelVi: "Tiêu chuẩn (100%)", labelEn: "Standard (100%)" },
                    { scale: 1.1, labelVi: "Rõ nét (110%)", labelEn: "Clear (110%)" },
                    { scale: 1.2, labelVi: "Lớn dễ đọc (120%)", labelEn: "Large (120%)" },
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
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">{isVi ? "Bảng phân cấp Typography Tokens:" : "Hierarchy Tokens:"}</h4>
                {TYPO_TOKENS.map((token) => (
                  <div
                    key={token.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
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
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
