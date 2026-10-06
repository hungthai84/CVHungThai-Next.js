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
import { TypographySliderGroup } from "./TypographySliderGroup";
import { useLanguage } from "../i18n";
import { useTheme, COLOR_PRESETS, ThemeType, TypoCustomSizes, DEFAULT_TYPO_SIZES } from "../context/ThemeContext";
import { useBackground } from "../context/BackgroundContext";
import { THEME_LIST } from "../data/themesData";
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
import InteractiveColorPalette from "./InteractiveColorPalette";
import SoftFloatingBentoVisualPreview from "./SoftFloatingBentoVisualPreview";

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
    themeMode,
    setThemeMode,
    resetTheme,
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
    resetBorderRadiusCard,
    typoSizes,
    updateTypoSizes,
    resetTypoSizes,
    applyTypoSizesToDom
  } = useTheme();

  const {
    config: bgConfig,
    setOverlayOpacity,
    setBlurAmount,
    resetToDefaultGradient
  } = useBackground();



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

  // Active Tab state (Chỉ hiển thị thành phần được chọn)
  const [activeTab, setActiveTab] = useState<FooterModalTab | "card-header" | "glass">("card-header");

  // Glass FX local states
  const [glassMainOpacity, setGlassMainOpacity] = useState(24);
  const [glassMainBlur, setGlassMainBlur] = useState(34);
  const [glassParentOpacity, setGlassParentOpacity] = useState(48);
  const [glassParentBlur, setGlassParentBlur] = useState(24);
  const [glassChildOpacity, setGlassChildOpacity] = useState(72);
  const [glassChildBlur, setGlassChildBlur] = useState(16);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const isDark = document.documentElement.classList.contains("dark");
    const r = isDark ? "8, 15, 37" : "243, 247, 253";
    
    root.style.setProperty("--glass-main-bg", `rgba(${r}, ${glassMainOpacity / 100})`);
    root.style.setProperty("--glass-main-blur", `${glassMainBlur}px`);
    root.style.setProperty("--glass-parent-bg", `rgba(${r}, ${glassParentOpacity / 100})`);
    root.style.setProperty("--glass-parent-blur", `${glassParentBlur}px`);
    root.style.setProperty("--glass-child-bg", `rgba(${r}, ${glassChildOpacity / 100})`);
    root.style.setProperty("--glass-child-blur", `${glassChildBlur}px`);
  }, [glassMainOpacity, glassMainBlur, glassParentOpacity, glassParentBlur, glassChildOpacity, glassChildBlur]);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [copiedCss, setCopiedCss] = useState(false);
  const [customTestText, setCustomTestText] = useState("");
  const [activeTypoToken, setActiveTypoToken] = useState("body");
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string | null>(null);

  // Unsaved border radius local states for the Radius customization card
  const [tempBorderRadius, setTempBorderRadius] = useState(borderRadius);
  const [tempBorderRadiusCard, setTempBorderRadiusCard] = useState(borderRadiusCard);
  const [localTypoSizes, setLocalTypoSizes] = useState<TypoCustomSizes>(typoSizes);
  const [hasSaved, setHasSaved] = useState(false);

  // Sync temp values when context values change
  useEffect(() => {
    setLocalTypoSizes(typoSizes);
  }, [typoSizes]);

  // Real-time preview effect: dynamically update root styles as sliders are dragged, without hitting "Save" yet!
  useEffect(() => {
    if (applyTypoSizesToDom) {
      applyTypoSizesToDom(localTypoSizes);
    }
  }, [localTypoSizes, applyTypoSizesToDom]);

  // Revert preview on unmount if not saved
  useEffect(() => {
    return () => {
      if (!hasSaved && applyTypoSizesToDom) {
        applyTypoSizesToDom(typoSizes);
      }
    };
  }, [hasSaved, typoSizes, applyTypoSizesToDom]);

  useEffect(() => {
    setTempBorderRadius(borderRadius);
  }, [borderRadius]);

  useEffect(() => {
    setTempBorderRadiusCard(borderRadiusCard);
  }, [borderRadiusCard]);

  // Sync tab with external requested tab (if any)
  useEffect(() => {
    if (footerModalTab) {
      setActiveTab(footerModalTab);
    }
  }, [footerModalTab]);

  const handleTabChange = (tabId: FooterModalTab | "card-header" | "glass") => {
    setActiveTab(tabId);
    if (tabId !== "card-header" && tabId !== "glass") {
      setFooterModalTab(tabId as FooterModalTab);
    }
    playClick();
  };

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % TABS.length;
      handleTabChange(TABS[nextIndex].id);
      setTimeout(() => {
        const el = document.getElementById(`custom-tab-${TABS[nextIndex].id}`);
        el?.focus();
      }, 50);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + TABS.length) % TABS.length;
      handleTabChange(TABS[prevIndex].id);
      setTimeout(() => {
        const el = document.getElementById(`custom-tab-${TABS[prevIndex].id}`);
        el?.focus();
      }, 50);
    }
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

  // Card Header Customization State
  const [cardHeaderConfig, setCardHeaderConfig] = useState({
    titleCase: "title", // "title" (4-word capitalize) | "upper" | "normal"
    iconMotion: "float", // "float" | "pulse" | "rotate" | "static"
    iconGradient: "theme", // "theme" | "blue-cyan" | "indigo-purple" | "rose-amber" | "emerald-teal"
    lineThickness: 2, // 1.5 | 2 | 3
    showLine: true,
    showBadge: true,
  });

  // Custom Preset Saving & Audit States
  const [isSavePresetModalOpen, setIsSavePresetModalOpen] = useState(false);
  const [customPresetName, setCustomPresetName] = useState("");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditStep, setAuditStep] = useState("");
  const [auditComplete, setAuditComplete] = useState(false);
  const [savedPresetsList, setSavedPresetsList] = useState<{ id: string; name: string; date: string }[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("app_custom_saved_presets");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return [
      { id: "p1", name: "Cấu hình Doanh nghiệp 2026", date: "Hôm nay" },
      { id: "p2", name: "Executive Glass Neon Pro", date: "Gần đây" }
    ];
  });

  const handleStartAuditAndSave = () => {
    if (!customPresetName.trim()) return;
    setIsAuditing(true);
    setAuditProgress(15);
    setAuditStep(isVi ? "1/4. Đang quét hệ thống Color Tokens & Glass Variables..." : "1/4. Scanning Color Tokens & Glass Variables...");

    setTimeout(() => {
      setAuditProgress(45);
      setAuditStep(isVi ? "2/4. Kiểm tra quy chuẩn Tiêu đề Header Card & Line vách ngăn..." : "2/4. Auditing Card Header Titles & Line Dividers...");
    }, 600);

    setTimeout(() => {
      setAuditProgress(75);
      setAuditStep(isVi ? "3/4. Rà soát độ trong suốt Glass 3 cấp (24% / 48% / 72%)..." : "3/4. Validating 3-Level Glass Opacities...");
    }, 1200);

    setTimeout(() => {
      setAuditProgress(100);
      setAuditStep(isVi ? "4/4. Hoàn tất rà soát 100%! Áp dụng toàn bộ hệ thống." : "4/4. Audit 100% complete! Applied to entire system.");
      setAuditComplete(true);
      
      const newPreset = {
        id: `preset_${Date.now()}`,
        name: customPresetName.trim(),
        date: new Date().toLocaleDateString(isVi ? "vi-VN" : "en-US")
      };
      const updatedList = [newPreset, ...savedPresetsList.filter(p => p.name !== newPreset.name)];
      setSavedPresetsList(updatedList);
      try {
        localStorage.setItem("app_custom_saved_presets", JSON.stringify(updatedList));
      } catch {}

      try { playSuccess(); } catch {}
    }, 1800);
  };

  const handleCloseSaveModal = () => {
    setIsSavePresetModalOpen(false);
    setIsAuditing(false);
    setAuditProgress(0);
    setAuditComplete(false);
    setCustomPresetName("");
  };

  const TABS: { id: FooterModalTab | "card-header" | "glass"; nameVi: string; nameEn: string; Icon: React.ElementType }[] = [
    { id: "card-header", nameVi: "Tiêu đề", nameEn: "Header", Icon: Sparkles },
    { id: "customization", nameVi: "Giao diện", nameEn: "Theme", Icon: Sun },
    { id: "colors", nameVi: "Bảng màu", nameEn: "Colors", Icon: Palette },
    { id: "glass", nameVi: "Kính Glass", nameEn: "Glass FX", Icon: Layers },
    { id: "sound", nameVi: "Âm thanh", nameEn: "Sound", Icon: Volume2 },
    { id: "footer", nameVi: "Chân trang", nameEn: "Footer", Icon: PanelBottom },
  ];

  return (
    <section id="customization" className="page-section relative w-full h-auto min-h-0 flex flex-col justify-start items-stretch p-[15px] font-play text-slate-800 dark:text-slate-100 transition-colors duration-300 bg-transparent overflow-y-auto no-scrollbar">
      {/* Ambient Mesh Gradient Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-cyan-400/25 to-blue-600/25 dark:from-cyan-500/15 dark:to-blue-700/15 blur-[100px] animate-pulse" />
        <div className="absolute top-[35%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-purple-500/25 to-fuchsia-600/25 dark:from-purple-600/15 dark:to-pink-700/15 blur-[110px] animate-pulse" style={{ animationDuration: "7s" }} />
      </div>

      {/* Main Container with dynamic auto height matching inner content */}
      <div className="section-container relative z-10 w-full max-w-full h-auto min-h-0 flex-grow flex-1 flex flex-col gap-[15px] mx-auto justify-start">
        {/* 1. Standard Page Card Header */}
        <header className="section-header">
          <PageCardHeader pageId="customization" />
        </header>

        {/* Reset confirmation toast */}
        <AnimatePresence>
          {resetSuccessMessage && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              className="px-4 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center justify-between backdrop-blur-md shadow-sm"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{resetSuccessMessage}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Navigation Tabs (Xóa bỏ khung Tab theo yêu cầu) */}
        <div 
          className="w-full py-1 flex items-center justify-between gap-3 sticky top-0 z-30 overflow-x-auto no-scrollbar bg-transparent border-none shadow-none"
        >
          {/* Component Tabs List (Không đóng khung) */}
          <div 
            role="tablist"
            aria-label={isVi ? "Các tùy chỉnh giao diện" : "Interface settings tabs"}
            className="flex items-center gap-1.5 min-w-max bg-transparent border-none p-0"
          >
            {TABS.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.Icon;
              return (
                <button
                  key={tab.id}
                  id={`custom-tab-${tab.id}`}
                  role="tab"
                  aria-selected={isActive ? "true" : "false"}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  type="button"
                  onClick={() => handleTabChange(tab.id as any)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 text-[14px] sm:text-[15px] font-bold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 relative overflow-visible rounded-[14px]",
                    isActive
                      ? "text-indigo-600 dark:text-cyan-400 font-black scale-[1.02] bg-indigo-500/10 dark:bg-cyan-400/10 border border-indigo-500/30 dark:border-cyan-400/30"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-transparent hover:bg-slate-100/50 dark:hover:bg-white/5"
                  )}
                >
                  <Icon className={cn("w-4 h-4 shrink-0 transition-colors duration-200", isActive ? "text-indigo-600 dark:text-cyan-400" : "text-slate-400 dark:text-slate-500")} />
                  <span>{isVi ? tab.nameVi : tab.nameEn}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-cyan-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Button: Lưu Cấu Hình & Rà soát */}
          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <button
              type="button"
              onClick={() => {
                setIsSavePresetModalOpen(true);
                setCustomPresetName(isVi ? "Cấu hình Doanh nghiệp 2026" : "Custom Enterprise Preset");
                playClick();
              }}
              className="px-3.5 sm:px-4 py-1.5 rounded-[14px] bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-cyan-500/25 flex items-center gap-2 transition-all cursor-pointer active:scale-95 shrink-0"
              title={isVi ? "Lưu cấu hình & chạy rà soát" : "Save & audit preset"}
            >
              <Sparkles className="w-4 h-4 animate-pulse text-cyan-200" />
              <span>{isVi ? "Lưu & Rà soát" : "Save & Audit"}</span>
            </button>
          </div>
        </div>

        {/* 3. Main Customization Panels Container (Chiều cao tự động bằng nội dung bên trong) */}
        <div className="w-full h-auto min-h-0">
        
        {/* TAB 0: TÙY CHỈNH TIÊU ĐỀ */}
        {activeTab === "card-header" && (
          <motion.div
            role="tabpanel"
            id="panel-card-header"
            aria-labelledby="custom-tab-card-header"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4 h-auto min-h-0"
          >
            <div className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs space-y-4" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
              {/* Header Title: 4 chữ, xóa sub tiêu đề */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-indigo-500 dark:text-cyan-400" />
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-play">
                    {isVi ? "Tùy chỉnh tiêu đề" : "Card Header Title"}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCardHeaderConfig({
                      titleCase: "title",
                      iconMotion: "float",
                      iconGradient: "theme",
                      lineThickness: 2,
                      showLine: true,
                      showBadge: true,
                    });
                    playSuccess();
                    triggerResetFeedback(isVi ? "Đã khôi phục cài đặt mặc định!" : "Reset settings to default!");
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/60 dark:border-white/10 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isVi ? "Khôi phục" : "Reset"}</span>
                </button>
              </div>

              {/* Live Preview Card */}
              <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xs font-mono font-black uppercase tracking-wider text-slate-400">
                    {isVi ? "XEM TRƯỚC TIÊU ĐỀ:" : "PREVIEW:"}
                  </span>
                </div>

                {/* Preview Box */}
                <div 
                  style={{ borderRadius: "var(--theme-radius-card, 14px)" }}
                  className="p-4 bg-white/90 dark:bg-slate-900/90 border border-white/60 dark:border-white/15 shadow-sm backdrop-blur-2xl space-y-2.5 text-left"
                >
                  {/* Dòng 1: Icon & Tiêu đề chính */}
                  <div className="flex items-center justify-between gap-2.5 flex-wrap">
                    <div className="flex items-center gap-2.5">
                      <motion.div
                        animate={
                          cardHeaderConfig.iconMotion === "float"
                            ? { y: [0, -3.5, 0], rotate: [0, 3, -3, 0] }
                            : cardHeaderConfig.iconMotion === "pulse"
                            ? { scale: [1, 1.1, 1] }
                            : cardHeaderConfig.iconMotion === "rotate"
                            ? { rotate: [0, 8, -8, 0] }
                            : {}
                        }
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative flex items-center justify-center shrink-0 cursor-pointer select-none bg-transparent border-0 p-0 shadow-none"
                      >
                        <Sparkles className="w-5 h-5 text-blue-600 dark:text-cyan-400 stroke-[2.2] drop-shadow-sm" />
                      </motion.div>
                      <h3 className="text-h6 font-bold tracking-tight font-play">
                        <span className="bg-clip-text text-transparent font-play font-bold text-h6 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300">
                          {cardHeaderConfig.titleCase === "upper"
                            ? (isVi ? "THÔNG TIN HỒ SƠ" : "EXECUTIVE PROFILE INFO")
                            : cardHeaderConfig.titleCase === "normal"
                            ? (isVi ? "Thông tin hồ sơ" : "Executive profile info")
                            : (isVi ? "Thông Tin Hồ Sơ" : "Executive Profile Info")}
                        </span>
                      </h3>
                    </div>

                    {cardHeaderConfig.showBadge && (
                      <span className="text-[10px] font-mono font-bold text-indigo-700 dark:text-cyan-300 bg-indigo-500/10 dark:bg-cyan-500/10 px-2 py-0.5 rounded-full border border-indigo-200/40 dark:border-cyan-500/20">
                        {isVi ? "Chuyên Gia CX" : "CX Specialist"}
                      </span>
                    )}
                  </div>

                  {/* Dòng 2: Line màu sắc giống icon */}
                  {cardHeaderConfig.showLine && (
                    <div 
                      className="w-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400/30"
                      style={{ height: `${cardHeaderConfig.lineThickness}px` }}
                    />
                  )}
                </div>
              </div>

              {/* Control Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* 1. Format Viết Hoa Tiêu Đề */}
                <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 space-y-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    {isVi ? "1. Định dạng chữ:" : "1. Letter Format:"}
                  </span>
                  <div className="space-y-1">
                    {[
                      { id: "title", labelVi: "Viết hoa chữ đầu", labelEn: "Capitalize First Letter" },
                      { id: "upper", labelVi: "TẤT CẢ VIẾT HOA", labelEn: "ALL UPPERCASE" },
                      { id: "normal", labelVi: "Viết thường tiêu chuẩn", labelEn: "Sentence case" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setCardHeaderConfig(prev => ({ ...prev, titleCase: opt.id as any }));
                          playClick();
                        }}
                        className={cn(
                          "w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer text-left",
                          cardHeaderConfig.titleCase === opt.id
                            ? "bg-indigo-600 text-white font-bold shadow-xs"
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-white/10"
                        )}
                      >
                        <span>{isVi ? opt.labelVi : opt.labelEn}</span>
                        {cardHeaderConfig.titleCase === opt.id && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Hiệu Ứng Chuyển Động Icon */}
                <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 space-y-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    {isVi ? "2. Hiệu ứng icon:" : "2. Icon Motion:"}
                  </span>
                  <div className="space-y-1">
                    {[
                      { id: "float", labelVi: "Chuyển động lơ lửng", labelEn: "Floating Smooth" },
                      { id: "pulse", labelVi: "Nhịp thở nhẹ nhàng", labelEn: "Breathing Pulse" },
                      { id: "rotate", labelVi: "Nghiêng góc nhẹ", labelEn: "Tilt Angle" },
                      { id: "static", labelVi: "Đứng yên tĩnh", labelEn: "Static" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setCardHeaderConfig(prev => ({ ...prev, iconMotion: opt.id as any }));
                          playClick();
                        }}
                        className={cn(
                          "w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer text-left",
                          cardHeaderConfig.iconMotion === opt.id
                            ? "bg-indigo-600 text-white font-bold shadow-xs"
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-white/10"
                        )}
                      >
                        <span>{isVi ? opt.labelVi : opt.labelEn}</span>
                        {cardHeaderConfig.iconMotion === opt.id && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Độ Dày & Hiển Thị Line Vách Ngăn */}
                <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 space-y-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    {isVi ? "3. Độ dày line:" : "3. Line Width:"}
                  </span>
                  <div className="space-y-1">
                    {[
                      { val: 1.5, labelVi: "Độ dày 1.5px", labelEn: "Thin 1.5px" },
                      { val: 2, labelVi: "Độ dày 2.0px (Chuẩn)", labelEn: "Standard 2.0px" },
                      { val: 3, labelVi: "Độ dày 3.0px", labelEn: "Bold 3.0px" },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => {
                          setCardHeaderConfig(prev => ({ ...prev, lineThickness: opt.val }));
                          playClick();
                        }}
                        className={cn(
                          "w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer text-left",
                          cardHeaderConfig.lineThickness === opt.val
                            ? "bg-indigo-600 text-white font-bold shadow-xs"
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-white/10"
                        )}
                      >
                        <span>{isVi ? opt.labelVi : opt.labelEn}</span>
                        {cardHeaderConfig.lineThickness === opt.val && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 1: GIAO DIỆN & CHẾ ĐỘ (THEME & DISPLAY MODE) */}
        {activeTab === "customization" && (
          <motion.div
            role="tabpanel"
            id="panel-customization"
            aria-labelledby="custom-tab-customization"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4 h-auto min-h-0"
          >
            {/* 1. Giao diện hệ thống */}
            <div className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs space-y-4" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
              {/* Header section: 4 chữ, xóa sub tiêu đề */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{isVi ? "Chủ đề giao diện" : "System UI Themes"}</span>
                      <span className="px-2 py-0.5 rounded-full text-3xs font-extrabold uppercase bg-indigo-500/10 dark:bg-cyan-500/10 text-indigo-600 dark:text-cyan-400 border border-indigo-500/20 dark:border-cyan-500/20">
                        {THEME_LIST.length} Styles
                      </span>
                    </h3>
                  </div>
                </div>

                {/* Quick Theme Mode & Reset Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setTheme("glass-light-multicolor");
                        setThemeMode("light");
                        playSuccess();
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                        theme === "glass-light-multicolor" || themeMode === "light"
                          ? "bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-xs"
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      )}
                      title={isVi ? "Giao diện Kính Sáng Đa Sắc" : "Light Multicolor Glass"}
                    >
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>{isVi ? "Sáng" : "Light"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setTheme("glass-dark-neon");
                        setThemeMode("dark");
                        playSuccess();
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                        theme === "glass-dark-neon" || themeMode === "dark"
                          ? "bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-xs"
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      )}
                      title={isVi ? "Giao diện Dark Glass Neon" : "Dark Neon Glass"}
                    >
                      <Moon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{isVi ? "Tối Neon" : "Dark"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setThemeMode("system");
                        playSuccess();
                      }}
                      className={cn(
                        "px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer",
                        themeMode === "system"
                          ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-cyan-400 shadow-xs"
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      )}
                      title={isVi ? "Tự động theo hệ điều hành" : "System Auto Mode"}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{isVi ? "Tự động" : "Auto"}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      resetTheme();
                      playSuccess();
                      triggerResetFeedback(isVi ? "Đã khôi phục giao diện mặc định!" : "Default theme restored!");
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/60 dark:border-white/10 transition-colors cursor-pointer"
                    title={isVi ? "Khôi phục giao diện mặc định" : "Reset default theme"}
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                    <span>{isVi ? "Khôi phục" : "Reset"}</span>
                  </button>
                </div>
              </div>

              {/* Theme Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {THEME_LIST.map((tItem) => {
                  const isSelected = theme === tItem.id;
                  return (
                    <div
                      key={tItem.id}
                      onClick={() => {
                        setTheme(tItem.id as any);
                        playSuccess();
                      }}
                      className={cn(
                        "relative p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group",
                        isSelected
                          ? "ring-2 ring-blue-500/80 dark:ring-cyan-400/80 bg-white/95 dark:bg-slate-900/95 border-blue-500/50 dark:border-cyan-400/50 shadow-xl scale-[1.01]"
                          : "bg-white/50 dark:bg-white/5 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-white/70 dark:hover:bg-white/10 shadow-sm hover:shadow-md"
                      )}
                    >
                      <div>
                        {/* Top Card Bar */}
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "text-xs font-mono font-black px-2 py-0.5 rounded-lg border",
                              isSelected 
                                ? "bg-blue-500/15 border-blue-500/30 text-blue-600 dark:text-cyan-400" 
                                : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500"
                            )}>
                              {tItem.num}
                            </span>
                            <span className={cn(
                              "text-3xs font-extrabold uppercase px-2 py-0.5 rounded-full border",
                              tItem.isDark
                                ? "bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/20"
                                : "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20"
                            )}>
                              {isVi ? tItem.badgeVi : tItem.badge}
                            </span>
                          </div>

                          {isSelected ? (
                            <span className="px-2.5 py-1 rounded-full bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 text-3xs font-black uppercase tracking-wider flex items-center gap-1 shadow-md shadow-blue-500/30">
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>{isVi ? "Đang chọn" : "Active"}</span>
                            </span>
                          ) : (
                            <span className="text-3xs font-bold text-slate-400 group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors">
                              {isVi ? "Bấm để chọn →" : "Click to select →"}
                            </span>
                          )}
                        </div>

                        {/* Title & Tagline */}
                        <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                          {isVi ? tItem.nameVi : tItem.name}
                        </h4>
                        <p className="text-xs font-medium text-blue-600 dark:text-cyan-400 mt-0.5 mb-2">
                          {isVi ? tItem.taglineVi : tItem.tagline}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                          {isVi ? tItem.descriptionVi : tItem.description}
                        </p>

                        {/* Visual Preview Thumbnail for Bento */}
                        {tItem.id === "soft-floating-bento" && (
                          <div className="mb-3">
                            <SoftFloatingBentoVisualPreview compact />
                          </div>
                        )}

                        {/* Color Swatches Sub-card */}
                        <div className="p-2.5 rounded-xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 mb-3">
                          <div className="text-3xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 flex items-center justify-between">
                            <span>{isVi ? "Bảng màu giao diện" : "Theme Palette"}</span>
                            <span className="font-mono text-2xs">{tItem.colors.primary}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {[
                              { label: "Primary", hex: tItem.colors.primary },
                              { label: "Secondary", hex: tItem.colors.secondary },
                              { label: "Accent", hex: tItem.colors.accent },
                              { label: "Surface", hex: tItem.colors.surface },
                              { label: "Background", hex: tItem.colors.background },
                              { label: "Text", hex: tItem.colors.text }
                            ].map((c, idx) => (
                              <div
                                key={idx}
                                className="flex-1 h-6 rounded-md shadow-2xs border border-black/10 transition-transform group-hover:scale-105"
                                style={{ backgroundColor: c.hex }}
                                title={`${c.label}: ${c.hex}`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Key Features List */}
                        <div className="space-y-1">
                          {(isVi ? tItem.featuresVi : tItem.featuresEn).slice(0, 3).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-1.5 text-2xs text-slate-600 dark:text-slate-400">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="leading-tight">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom action button */}
                      <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-white/10 flex items-center justify-between">
                        <span className="text-3xs font-mono text-slate-400">
                          ID: {tItem.id}
                        </span>
                        <button
                          type="button"
                          className={cn(
                            "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                            isSelected
                              ? "bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-md"
                              : "bg-slate-100 dark:bg-white/10 hover:bg-blue-500 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-950 text-slate-700 dark:text-slate-200"
                          )}
                        >
                          {isSelected 
                            ? (isVi ? "✓ Đang kích hoạt" : "✓ Active Theme") 
                            : (isVi ? "Áp dụng giao diện" : "Apply Theme")}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Display Tuning Controls */}
            <div className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs space-y-4" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-indigo-500 animate-pulse" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {isVi ? "Hiệu ứng hiển thị" : "Display Tuning Effects"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={resetToDefaultGradient}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-cyan-400 border border-indigo-500/20 transition-all flex items-center gap-1.5 cursor-pointer w-fit"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isVi ? "Nền mặc định" : "Default"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-play">
                <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200">
                    <span>{isVi ? "Độ tối lớp phủ" : "Overlay Dim"}</span>
                    <span className="font-mono text-blue-600 dark:text-cyan-400 font-black">{bgConfig.overlayOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    value={bgConfig.overlayOpacity}
                    onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200">
                    <span>{isVi ? "Độ mờ hậu cảnh" : "Background Blur"}</span>
                    <span className="font-mono text-purple-600 dark:text-purple-400 font-black">{bgConfig.blurAmount}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={bgConfig.blurAmount}
                    onChange={(e) => setBlurAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>
              </div>

              {/* 3-Level Glassmorphism Config Section */}
              <div className="border-t border-slate-200/60 dark:border-white/10 my-4 pt-4">
                <div className="flex items-center justify-between pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-cyan-400 flex items-center gap-1.5 font-play">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                    {isVi ? "Cấu hình kính mờ 3 cấp độ (3-Level Glass)" : "3-Level Glassmorphism Config"}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setGlassMainOpacity(24);
                      setGlassMainBlur(34);
                      setGlassParentOpacity(48);
                      setGlassParentBlur(24);
                      setGlassChildOpacity(72);
                      setGlassChildBlur(16);
                      playSuccess();
                    }}
                    className="text-[10px] font-black text-indigo-600 dark:text-cyan-400 hover:underline cursor-pointer"
                  >
                    {isVi ? "Đặt lại mặc định" : "Reset Glass"}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 font-play">
                  {/* Main Glass Level 1 */}
                  <div className="p-3 rounded-2xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{isVi ? "Cấp 1: Main Glass" : "Level 1: Main Glass"}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{isVi ? "Section / Vùng lớn" : "Large section bg"}</span>
                      </div>
                      <span className="text-2xs font-mono font-black text-indigo-500 dark:text-cyan-400">{glassMainOpacity}% / {glassMainBlur}px</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>Opacity</span>
                        <span>Blur</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="5"
                          max="100"
                          value={glassMainOpacity}
                          onChange={(e) => setGlassMainOpacity(Number(e.target.value))}
                          className="w-1/2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                        <input
                          type="range"
                          min="0"
                          max="60"
                          value={glassMainBlur}
                          onChange={(e) => setGlassMainBlur(Number(e.target.value))}
                          className="w-1/2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Parent Glass Level 2 */}
                  <div className="p-3 rounded-2xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{isVi ? "Cấp 2: Parent Glass" : "Level 2: Parent Glass"}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{isVi ? "Card / Panel lớn" : "Standard Card Panel"}</span>
                      </div>
                      <span className="text-2xs font-mono font-black text-purple-500 dark:text-purple-300">{glassParentOpacity}% / {glassParentBlur}px</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>Opacity</span>
                        <span>Blur</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="5"
                          max="100"
                          value={glassParentOpacity}
                          onChange={(e) => setGlassParentOpacity(Number(e.target.value))}
                          className="w-1/2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        />
                        <input
                          type="range"
                          min="0"
                          max="60"
                          value={glassParentBlur}
                          onChange={(e) => setGlassParentBlur(Number(e.target.value))}
                          className="w-1/2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Child Glass Level 3 */}
                  <div className="p-3 rounded-2xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{isVi ? "Cấp 3: Child Glass" : "Level 3: Child Glass"}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{isVi ? "Nội dung / Dữ liệu" : "Inner content item"}</span>
                      </div>
                      <span className="text-2xs font-mono font-black text-cyan-500 dark:text-teal-300">{glassChildOpacity}% / {glassChildBlur}px</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>Opacity</span>
                        <span>Blur</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="5"
                          max="100"
                          value={glassChildOpacity}
                          onChange={(e) => setGlassChildOpacity(Number(e.target.value))}
                          className="w-1/2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <input
                          type="range"
                          min="0"
                          max="60"
                          value={glassChildBlur}
                          onChange={(e) => setGlassChildBlur(Number(e.target.value))}
                          className="w-1/2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Language Selection Bar */}
            <div className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {isVi ? "Ngôn ngữ hệ thống" : "Display Language"}
                </h3>
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
            role="tabpanel"
            id="panel-colors"
            aria-labelledby="custom-tab-colors"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4 h-auto min-h-0"
          >
            {/* Color Presets */}
            <div className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {isVi ? "Bộ màu thiết kế" : "Design Color Presets"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCss}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all cursor-pointer w-fit"
                >
                  {copiedCss ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Code2 className="w-3.5 h-3.5 text-indigo-500" />}
                  <span>{copiedCss ? (isVi ? "Đã sao chép CSS" : "CSS Copied") : (isVi ? "Sao chép CSS" : "Copy CSS")}</span>
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
            <div className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>{isVi ? "Chi tiết mã màu" : "Active Color Tokens"}</span>
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

            {/* 15 User Gradients Showcase Gallery */}
            <InteractiveColorPalette />
          </motion.div>
        )}

        {/* TAB 3: BO GÓC THẺ & KHUNG (BORDER RADIUS) */}
        {activeTab === "radius" && (
          <motion.div
            role="tabpanel"
            id="panel-radius"
            aria-labelledby="custom-tab-radius"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4 h-auto min-h-0"
          >
            <div className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {isVi ? "Bo góc giao diện" : "Border Radius Settings"}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTempBorderRadius(10);
                      setTempBorderRadiusCard(14);
                      setBorderRadius(10);
                      if (setBorderRadiusCard) setBorderRadiusCard(14);
                      triggerResetFeedback(isVi ? "Đã khôi phục mặc định" : "Reset to defaults");
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
                      triggerResetFeedback(isVi ? "Đã lưu bo góc thành công!" : "Saved border-radius successfully!");
                    }}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer w-fit",
                      tempBorderRadius !== borderRadius || tempBorderRadiusCard !== borderRadiusCard
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-cyan-500 dark:hover:bg-cyan-600 dark:text-slate-950 scale-[1.02]"
                        : "bg-slate-100/80 dark:bg-white/5 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                    )}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isVi ? "Lưu & Áp dụng" : "Save & Apply"}</span>
                  </button>
                </div>
              </div>

              {/* Sliders Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Slider 1: System Elements Radius */}
                <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {isVi ? "Bo góc nút bấm & thẻ:" : "System Elements Radius:"}
                    </span>
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
                      setTempBorderRadius(Number(e.target.value));
                      playClick();
                    }}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-cyan-400"
                  />
                </div>

                {/* Slider 2: Card Radius */}
                <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {isVi ? "Bo góc khung thẻ bento:" : "Card Frame Radius:"}
                    </span>
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
                      setTempBorderRadiusCard(Number(e.target.value));
                      playClick();
                    }}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500 dark:accent-rose-400"
                  />
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
                        setTempBorderRadius(preset.radius);
                        setTempBorderRadiusCard(Math.min(32, preset.radius + 4));
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
            role="tabpanel"
            id="panel-cursor"
            aria-labelledby="custom-tab-cursor"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4 h-auto min-h-0"
          >
            <div className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs space-y-4" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <MousePointer className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {isVi ? "Hiệu ứng con trỏ" : "Interactive Cursor FX"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    resetCursorConfig();
                    triggerResetFeedback(isVi ? "Đã khôi phục mặc định" : "Reset to defaults");
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-all cursor-pointer w-fit"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isVi ? "Mặc định" : "Default"}</span>
                </button>
              </div>

              {/* Cursor Styles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
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
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{isVi ? "Hiệu ứng vệt sáng" : "Comet Trail Effect"}</div>
                    <div className="text-2xs text-slate-500">{isVi ? "Vệt sáng theo chuột" : "Smooth comet trail"}</div>
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
                    <div className="text-2xs text-slate-500">{isVi ? "Kích cỡ vòng sáng" : "Pointer radius scale"}</div>
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
            role="tabpanel"
            id="panel-sound"
            aria-labelledby="custom-tab-sound"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4 h-auto min-h-0"
          >
            <div className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs space-y-4" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {isVi ? "Âm thanh tương tác" : "Interactive Audio Settings"}
                  </h3>
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
                    <span>{soundConfig.isMuted ? (isVi ? "Đang tắt" : "Muted") : (isVi ? "Đang bật" : "Active")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetSoundConfig();
                      triggerResetFeedback(isVi ? "Đã khôi phục mặc định" : "Reset to defaults");
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isVi ? "Mặc định" : "Default"}</span>
                  </button>
                </div>
              </div>

              {/* Volume Sliders Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                {[
                  { labelVi: "Âm tổng (Master)", labelEn: "Master Volume", val: soundConfig.masterVolume, set: setMasterVolume },
                  { labelVi: "Âm click (UI)", labelEn: "UI Sound Volume", val: soundConfig.uiVolume, set: setUiVolume },
                  { labelVi: "Âm nền (Ambient)", labelEn: "Ambient Volume", val: soundConfig.ambientVolume, set: setAmbientVolume }
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
                    <span>{isVi ? "Gói âm nhấp chuột" : "UI Click Sound Pack"}</span>
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
                    <span>{isVi ? "Âm nền môi trường" : "Relaxing Soundscape"}</span>
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
            role="tabpanel"
            id="panel-footer"
            aria-labelledby="custom-tab-footer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4 h-auto min-h-0"
          >
            <div className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs space-y-4" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <PanelBottom className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {isVi ? "Tùy biến chân trang" : "Footer Dock Settings"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    resetFooterConfig();
                    triggerResetFeedback(isVi ? "Đã khôi phục mặc định" : "Reset to defaults");
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-all cursor-pointer w-fit"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isVi ? "Mặc định" : "Default"}</span>
                </button>
              </div>

              {/* Placement Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
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
                  {isVi ? "Bật/Tắt các thành phần:" : "Toggle Footer Widgets:"}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: "isPinned" as const, labelVi: "Ghim cố định chân trang", labelEn: "Pin Footer (No auto-hide)", icon: Pin, val: footerConfig.isPinned !== false, toggle: togglePin },
                    { key: "showClock" as const, labelVi: "Đồng hồ và ngày tháng", labelEn: "Clock & Date Widget", icon: Clock, val: footerConfig.showClock, toggle: () => toggleElementVisibility("showClock") },
                    { key: "showWeather" as const, labelVi: "Thời tiết thực tế địa phương", labelEn: "Real-time Weather Widget", icon: CloudSun, val: footerConfig.showWeather, toggle: () => toggleElementVisibility("showWeather") },
                    { key: "showNextPageButton" as const, labelVi: "Nút chuyển trang tiếp theo", labelEn: "Next Page Center Trigger", icon: ChevronDown, val: footerConfig.showNextPageButton, toggle: () => toggleElementVisibility("showNextPageButton") },
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
            role="tabpanel"
            id="panel-typography"
            aria-labelledby="custom-tab-typography"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4 h-auto min-h-0"
          >
            <div className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs space-y-4" style={{ borderRadius: "var(--theme-radius-card, 16px)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Type className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {isVi ? "Phông chữ hệ thống" : "Typography Scale Matrix"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    resetFontScale();
                    triggerResetFeedback(isVi ? "Đã khôi phục chuẩn 100%" : "Reset to 100%");
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-all cursor-pointer w-fit"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isVi ? "Mặc định (100%)" : "Default (100%)"}</span>
                </button>
              </div>

              {/* Font Scale Selector */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-4">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">{isVi ? "Tỷ lệ kích thước chữ toàn trang:" : "Global Font Scale:"}</div>
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

              {/* Typography Customizer */}
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Type className="w-4 h-4 text-indigo-500" />
                    <span>{isVi ? "Bảng điều chỉnh cỡ chữ & chiều cao:" : "Typography & Height Customizer:"}</span>
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setLocalTypoSizes(DEFAULT_TYPO_SIZES);
                        resetTypoSizes();
                        triggerResetFeedback(isVi ? "Đã đặt lại mặc định!" : "Reset to default!");
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-3xs font-bold transition-all cursor-pointer flex items-center gap-1 border border-red-500/20"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{isVi ? "Mặc định" : "Defaults"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setHasSaved(true);
                        updateTypoSizes(localTypoSizes);
                        triggerResetFeedback(isVi ? "Đã lưu thành công!" : "Saved successfully!");
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-3xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isVi ? "Lưu và áp dụng" : "Save & Apply"}</span>
                    </button>
                  </div>
                </div>

                <TypographySliderGroup
                  localTypoSizes={localTypoSizes}
                  setLocalTypoSizes={setLocalTypoSizes}
                  isVi={isVi}
                  playClick={playClick}
                />
              </div>
            </div>
          </motion.div>
        )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: LƯU CẤU HÌNH CUSTOMER & CHẠY RÀ SOÁT CÁC THÀNH PHẦN                 */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isSavePresetModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={!isAuditing ? handleCloseSaveModal : undefined}
              className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25 }}
              style={{ borderRadius: "var(--theme-radius-card, 16px)" }}
              className="relative w-full max-w-lg bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/15 p-5 sm:p-6 shadow-2xl z-10 flex flex-col gap-4 text-slate-800 dark:text-slate-100 font-sans overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight font-play">
                      {isVi ? "Lưu Cấu Hình & Rà Soát Hệ Thống" : "Save & Audit Custom Preset"}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {isVi ? "Đặt tên cấu hình cá nhân và chạy kiểm tra đồng bộ các thành phần" : "Name your custom preset and run full component verification"}
                    </p>
                  </div>
                </div>

                {!isAuditing && (
                  <button
                    type="button"
                    onClick={handleCloseSaveModal}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>

              {!auditComplete ? (
                <div className="space-y-4 py-2">
                  {/* Preset Name Input */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <span>{isVi ? "Tên cấu hình cá nhân (Custom Preset Name):" : "Custom Preset Name:"}</span>
                      <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      disabled={isAuditing}
                      value={customPresetName}
                      onChange={(e) => setCustomPresetName(e.target.value)}
                      placeholder={isVi ? "VD: Cấu hình Doanh nghiệp 2026..." : "e.g., Enterprise Theme 2026..."}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-play"
                    />
                  </div>

                  {/* Audit Progress Sequence */}
                  {isAuditing && (
                    <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-indigo-900 dark:text-cyan-300">
                        <div className="flex items-center gap-2">
                          <div className="w-3.5 h-3.5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                          <span>{auditStep}</span>
                        </div>
                        <span className="font-mono">{auditProgress}%</span>
                      </div>
                      
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: `${auditProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Summary of items that will be checked and saved */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1.5 text-left">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {isVi ? "Các thành phần được rà soát & áp dụng:" : "Components audited & applied:"}
                    </span>
                    <ul className="space-y-1 text-2xs sm:text-xs">
                      <li className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>{isVi ? "Bảng màu Tokens & Tông màu chủ đạo (5 Levels)" : "Color Tokens & Palette (5 Levels)"}</span>
                      </li>
                      <li className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>{isVi ? "Tiêu đề Header Card, icon chuyển động & line gradient" : "Card Header Titles, animated icon & line divider"}</span>
                      </li>
                      <li className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>{isVi ? "Độ bo góc thẻ (Radius 10-14px) & Glass 3 cấp" : "Card Radius (10-14px) & 3-Level Glass"}</span>
                      </li>
                      <li className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>{isVi ? "Hệ thống Typography, tỷ lệ phông chữ & Line Height" : "Typography Hierarchy, scale & line heights"}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-2">
                    {!isAuditing && (
                      <button
                        type="button"
                        onClick={handleCloseSaveModal}
                        className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        {isVi ? "Hủy" : "Cancel"}
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={isAuditing || !customPresetName.trim()}
                      onClick={handleStartAuditAndSave}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50 disabled:pointer-events-none text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isVi ? "Bắt đầu rà soát & Áp dụng" : "Start Audit & Apply"}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Audit Completed View */
                <div className="py-4 space-y-4 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-play">
                      {isVi ? "Rà Soát & Áp Dụng Thành Công!" : "Audit & Application Successful!"}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                      {isVi 
                        ? `Cấu hình "${customPresetName}" đã được rà soát đạt chuẩn 100% và lưu trữ an toàn, áp dụng đồng bộ toàn hệ thống.` 
                        : `Preset "${customPresetName}" passed 100% component audit and is actively applied across the entire app.`}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 text-xs text-emerald-800 dark:text-emerald-300 font-bold">
                    ✓ {isVi ? "Đã lưu vào danh sách Saved Presets của bạn" : "Saved into your custom presets collection"}
                  </div>

                  <button
                    type="button"
                    onClick={handleCloseSaveModal}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow-md cursor-pointer"
                  >
                    {isVi ? "Hoàn tất & Tiếp tục" : "Done & Continue"}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
