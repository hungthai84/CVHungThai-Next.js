import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Sliders, PanelBottom, Maximize2, Columns, EyeOff, RotateCcw, Check, Pin, 
  CloudSun, Clock, MousePointer, Volume2, VolumeX, Bot, ChevronDown,
  Sparkles, Flame, Crosshair, CircleDot, Dot, Play, CloudRain, Wind, Radio,
  Palette, Globe, Sun, Moon, Type, Images, Rocket, Layers, Minus, Plus, Box,
  Square, CheckCircle2, AlignLeft, ShieldCheck, Sparkle, SlidersHorizontal, Monitor
} from "lucide-react";
import { useFooter, FooterModalTab } from "../context/FooterContext";
import { useLanguage } from "../i18n";
import { FOOTER_PLACEMENT_OPTIONS, FOOTER_STYLE_OPTIONS } from "../data/footerData";
import { FooterPlacement, FooterConfig } from "../types/footer";
import { useCursor } from "../context/CursorContext";
import { CURSOR_STYLE_OPTIONS, CURSOR_COLOR_OPTIONS } from "../data/cursorData";
import { CursorStyleType, CursorSize } from "../types/cursor";
import { useSound } from "../context/SoundContext";
import { SOUND_PACK_OPTIONS, AMBIENT_SOUND_OPTIONS } from "../data/soundData";
import { AmbientSoundType } from "../types/sound";
import { useTheme, COLOR_PRESETS, ThemeType } from "../context/ThemeContext";
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
  { id: "display", labelVi: "Display (Tiêu đề lớn)", labelEn: "Display", size: "40–52px", weight: "700", leading: "1.15", sampleText: "Nguyễn Hùng Thái" },
  { id: "h1", labelVi: "H1 (Tiêu đề chính)", labelEn: "H1 Heading", size: "36–42px", weight: "700", leading: "1.20", sampleText: "Giám Đốc Chăm Sóc Khách Hàng" },
  { id: "h2", labelVi: "H2 (Tiêu đề mục)", labelEn: "H2 Section", size: "28–34px", weight: "700", leading: "1.20", sampleText: "Kinh Nghiệm & Thành Tựu" },
  { id: "h3", labelVi: "H3 (Tiêu đề phụ)", labelEn: "H3 Subtitle", size: "20–24px", weight: "700", leading: "1.25", sampleText: "Kiến trúc hệ thống CSKH chuẩn quốc tế" },
  { id: "card", labelVi: "Card Title (Thẻ)", labelEn: "Card Title", size: "18–20px", weight: "700", leading: "1.30", sampleText: "Dự Án Vận Hành Đa Kênh" },
  { id: "body", labelVi: "Body (Văn bản)", labelEn: "Body Text", size: "15–16px", weight: "400", leading: "1.60", sampleText: "Tối ưu hóa hành trình khách hàng với hiệu suất tăng trưởng vượt bậc." },
  { id: "caption", labelVi: "Caption / Label", labelEn: "Caption/Label", size: "12–13px", weight: "600", leading: "1.40", sampleText: "22+ NĂM KINH NGHIỆM" },
];

export default function FooterSettingsModal() {
  const {
    footerConfig,
    setPlacement,
    setStyleVariant,
    toggleElementVisibility,
    resetFooterConfig,
    isFooterModalOpen,
    setIsFooterModalOpen,
    footerModalTab,
    setFooterModalTab
  } = useFooter();

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
    updateSoundConfig,
    resetSoundConfig,
    playClick,
    playSuccess
  } = useSound();

  const { 
    theme, 
    setTheme, 
    themeMode,
    setThemeMode,
    colorPreset, 
    setColorPreset, 
    activePalette, 
    openColorModal, 
    openTypographyModal,
    fontScale,
    setFontScale,
    borderRadius,
    setBorderRadius,
    resetBorderRadius
  } = useTheme();

  const { lang, setLang } = useLanguage();
  const isVi = lang === "vi";

  // Tab state synced with footerModalTab
  const [currentTab, setCurrentTab] = useState<FooterModalTab>("footer");
  const [customTestText, setCustomTestText] = useState("");
  const [activeTypoToken, setActiveTypoToken] = useState("body");

  useEffect(() => {
    if (footerModalTab) {
      setCurrentTab(footerModalTab);
    }
  }, [footerModalTab, isFooterModalOpen]);

  if (!isFooterModalOpen) return null;

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

  const tabs = [
    {
      id: "footer" as const,
      nameVi: "Chân trang",
      nameEn: "Footer",
      Icon: Sliders,
    },
    {
      id: "cursor" as const,
      nameVi: "Con trỏ",
      nameEn: "Cursor",
      Icon: MousePointer,
    },
    {
      id: "sound" as const,
      nameVi: "Âm thanh",
      nameEn: "Audio",
      Icon: Volume2,
    },
    {
      id: "customization" as const,
      nameVi: "Giao diện",
      nameEn: "Theme & Colors",
      Icon: Palette,
    },
    {
      id: "typography" as const,
      nameVi: "Font chữ",
      nameEn: "Typography",
      Icon: Type,
    },
    {
      id: "radius" as const,
      nameVi: "Bo cong góc",
      nameEn: "Radius",
      Icon: Layers,
    },
  ];

  const getTitleInfo = () => {
    switch (currentTab) {
      case "footer":
        return {
          title: isVi ? "Tùy chỉnh đặt chân trang (Footer)" : "Footer Customization",
          desc: isVi ? "Vị trí hiển thị, phong cách và các thành phần trên Footer" : "Customize footer placement, style and components",
          colorClass: "text-purple-600 dark:text-purple-400",
          bgClass: "bg-purple-500/10 border-purple-500/20",
          Icon: Sliders,
        };
      case "cursor":
        return {
          title: isVi ? "Tùy chỉnh con trỏ chuột (Cursor)" : "Cursor Customization",
          desc: isVi ? "Kiểu dáng, vệt sao băng, kích thước và màu sắc con trỏ" : "Customize cursor style, trail effect, size and palette",
          colorClass: "text-indigo-600 dark:text-cyan-400",
          bgClass: "bg-indigo-500/10 dark:bg-cyan-500/10 border-indigo-500/20 dark:border-cyan-500/20",
          Icon: MousePointer,
        };
      case "sound":
        return {
          title: isVi ? "Tùy chỉnh hệ thống âm thanh (Audio)" : "Audio Customization",
          desc: isVi ? "Âm lượng tổng, bộ hiệu ứng UI và âm thanh môi trường thư giãn" : "Master volume, UI sound packs and relaxing ambient soundscapes",
          colorClass: "text-sky-600 dark:text-sky-400",
          bgClass: "bg-sky-500/10 border-sky-500/20",
          Icon: Volume2,
        };
      case "customization":
        return {
          title: isVi ? "Tùy chỉnh Giao diện, Màu sắc & Ngôn ngữ" : "Theme, Color & Customization",
          desc: isVi ? "Chuyển đổi giao diện, bộ màu sắc tokens, ngôn ngữ và tùy chọn hiển thị" : "Switch themes, design color tokens, language and display options",
          colorClass: "text-emerald-600 dark:text-emerald-400",
          bgClass: "bg-emerald-500/10 border-emerald-500/20",
          Icon: Palette,
        };
      case "typography":
        return {
          title: isVi ? "Tùy chỉnh Font chữ & Phân cấp (Play Font)" : "Typography & Scale Settings",
          desc: isVi ? "Kích thước tỷ lệ toàn cục (80%-130%), Typography Tokens và kiểm tra Tiếng Việt" : "Global font scaling, typography tokens and live text preview",
          colorClass: "text-amber-600 dark:text-amber-400",
          bgClass: "bg-amber-500/10 border-amber-500/20",
          Icon: Type,
        };
      case "radius":
        return {
          title: isVi ? "Tùy chỉnh độ bo cong góc (Border Radius)" : "Border Radius Customization",
          desc: isVi ? "Bộ mẫu bo góc, tinh chỉnh pixel và xem trước trực quan quy tắc lồng nhau" : "Radius presets, custom slider and real-time nested component preview",
          colorClass: "text-rose-600 dark:text-rose-400",
          bgClass: "bg-rose-500/10 border-rose-500/20",
          Icon: Layers,
        };
    }
  };

  const currentInfo = getTitleInfo();
  const CurrentIcon = currentInfo.Icon;

  const handleResetCurrentTab = () => {
    if (currentTab === "footer") {
      resetFooterConfig();
    } else if (currentTab === "cursor") {
      resetCursorConfig();
    } else if (currentTab === "sound") {
      resetSoundConfig();
    } else if (currentTab === "customization") {
      setTheme("mritech-digital-growth");
      setColorPreset("neon");
      setLang("vi");
    } else if (currentTab === "typography") {
      setFontScale(100);
    } else if (currentTab === "radius") {
      resetBorderRadius();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsFooterModalOpen(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="px-5 pt-5 pb-3 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center border shadow-xs transition-all", currentInfo.bgClass, currentInfo.colorClass)}>
                  <CurrentIcon className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight flex items-center gap-2">
                    <span>{currentInfo.title}</span>
                    <span className="text-3xs font-black uppercase px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      v2.6
                    </span>
                  </h3>
                  <p className="text-body-sm text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                    {currentInfo.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {currentTab === "sound" && (
                  <button
                    type="button"
                    onClick={toggleMute}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border shadow-2xs active:scale-95",
                      soundConfig.isMuted
                        ? "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
                        : "bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400"
                    )}
                  >
                    {soundConfig.isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{soundConfig.isMuted ? (isVi ? "Đang tắt âm" : "Muted") : (isVi ? "Đang bật âm" : "Active")}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsFooterModalOpen(false)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-300 dark:hover:border-slate-700"
                  title={isVi ? "Đóng cài đặt" : "Close"}
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* TAB SELECTOR BAR (Cohesive 6-Tab Navigation) */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 p-1 bg-slate-200/70 dark:bg-slate-800/90 rounded-2xl border border-slate-300/60 dark:border-slate-700/60 mt-4 shadow-inner">
              {tabs.map((tab) => {
                const isTabActive = currentTab === tab.id;
                const TabIcon = tab.Icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setCurrentTab(tab.id);
                      setFooterModalTab(tab.id);
                      playClick();
                    }}
                    className={cn(
                      "flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer relative",
                      isTabActive
                        ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200/80 dark:border-slate-700/90 scale-[1.02]"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800/40"
                    )}
                  >
                    <TabIcon className={cn(
                      "w-3.5 h-3.5 shrink-0 transition-transform",
                      isTabActive 
                        ? (tab.id === "footer" 
                            ? "text-purple-600 dark:text-purple-400 scale-110" 
                            : tab.id === "cursor" 
                              ? "text-indigo-600 dark:text-cyan-400 scale-110" 
                              : tab.id === "sound" 
                                ? "text-sky-600 dark:text-sky-400 scale-110" 
                                : tab.id === "customization"
                                  ? "text-emerald-600 dark:text-emerald-400 scale-110"
                                  : tab.id === "typography"
                                    ? "text-amber-600 dark:text-amber-400 scale-110"
                                    : "text-rose-600 dark:text-rose-400 scale-110")
                        : "opacity-70"
                    )} />
                    <span className="truncate text-3xs sm:text-2xs">{isVi ? tab.nameVi : tab.nameEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">

            {/* ========================================================================= */}
            {/* TAB 1: CHÂN TRANG (FOOTER SETTINGS) */}
            {/* ========================================================================= */}
            {currentTab === "footer" && (
              <div className="space-y-6">
                {/* 1. Placement Selection */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 block">
                    {isVi ? "1. Kiểu đặt vị trí Footer (Placement)" : "1. Footer Placement"}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {FOOTER_PLACEMENT_OPTIONS.map((opt) => {
                      const Icon = getPlacementIcon(opt.id);
                      const isSelected = footerConfig.placement === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setPlacement(opt.id)}
                          className={cn(
                            "flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer relative",
                            isSelected
                              ? "bg-purple-500/10 dark:bg-purple-500/15 border-purple-500 dark:border-purple-400 shadow-xs ring-1 ring-purple-500/30"
                              : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                          )}
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                            isSelected
                              ? "bg-purple-600 dark:bg-purple-400 text-white dark:text-slate-950 shadow-xs"
                              : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                          )}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0 pr-4">
                            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                              {isVi ? opt.nameVi : opt.nameEn}
                            </div>
                            <div className="text-2xs text-slate-500 dark:text-slate-400 leading-snug mt-0.5 line-clamp-2">
                              {isVi ? opt.descVi : opt.descEn}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-purple-600 dark:bg-purple-400 text-white dark:text-slate-950 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Style Variant */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 block">
                    {isVi ? "2. Phong cách bề mặt (Style Variant)" : "2. Surface Style"}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {FOOTER_STYLE_OPTIONS.map((style) => {
                      const isSelected = footerConfig.styleVariant === style.id;
                      return (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => setStyleVariant(style.id)}
                          className={cn(
                            "p-3 rounded-xl border text-left transition-all cursor-pointer",
                            isSelected
                              ? "bg-purple-50 dark:bg-purple-950/20 border-purple-500 dark:border-purple-400 text-purple-900 dark:text-purple-300 ring-1 ring-purple-500/30"
                              : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                          )}
                        >
                          <div className="text-xs font-bold">{isVi ? style.nameVi : style.nameEn}</div>
                          <div className="text-3xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-tight">
                            {isVi ? style.descVi : style.descEn}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Component Toggles */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 block">
                    {isVi ? "3. Bật / Tắt thành phần trên Footer" : "3. Footer Components"}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { key: "showWeather" as keyof FooterConfig, labelVi: "Tiện ích thời tiết", labelEn: "Weather widget", Icon: CloudSun },
                      { key: "showClock" as keyof FooterConfig, labelVi: "Đồng hồ & ngày tháng", labelEn: "Live clock & date", Icon: Clock },
                      { key: "showNextPageButton" as keyof FooterConfig, labelVi: "Nút chuyển trang tiếp", labelEn: "Next page button", Icon: ChevronDown },
                      { key: "showCursorControl" as keyof FooterConfig, labelVi: "Nút đổi con trỏ chuột", labelEn: "Cursor switcher button", Icon: MousePointer },
                      { key: "showSoundControl" as keyof FooterConfig, labelVi: "Nút điều khiển âm thanh", labelEn: "Audio control button", Icon: Volume2 },
                      { key: "showAIAssistant" as keyof FooterConfig, labelVi: "Nút trợ lý AI", labelEn: "AI assistant button", Icon: Bot },
                      { key: "isPinned" as keyof FooterConfig, labelVi: "Ghim giữ chân trang cố định", labelEn: "Pin footer to screen", Icon: Pin },
                    ].map((item) => {
                      const isChecked = !!footerConfig[item.key];
                      const Icon = item.Icon;
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => toggleElementVisibility(item.key)}
                          className={cn(
                            "flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer",
                            isChecked
                              ? "bg-purple-50 dark:bg-purple-950/20 border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-300"
                              : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-3.5 h-3.5 opacity-80" />
                            <span>{isVi ? item.labelVi : item.labelEn}</span>
                          </div>
                          <span className={cn(
                            "px-1.5 py-0.5 rounded text-3xs font-black uppercase",
                            isChecked ? "bg-purple-600 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                          )}>
                            {isChecked ? (isVi ? "Hiện" : "Show") : (isVi ? "Ẩn" : "Hide")}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 2: CON TRỎ CHUỘT (CURSOR SETTINGS) */}
            {/* ========================================================================= */}
            {currentTab === "cursor" && (
              <div className="space-y-6">
                {/* 1. Cursor Style Selection */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 block">
                    {isVi ? "1. Kiểu dáng con trỏ (Cursor Style)" : "1. Cursor Style"}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {CURSOR_STYLE_OPTIONS.map((opt) => {
                      const Icon = getCursorStyleIcon(opt.id);
                      const isSelected = cursorConfig.style === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setCursorStyle(opt.id)}
                          className={cn(
                            "flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer relative",
                            isSelected
                              ? "bg-indigo-500/10 dark:bg-cyan-500/10 border-indigo-500 dark:border-cyan-400 shadow-xs ring-1 ring-indigo-500/30 dark:ring-cyan-400/30"
                              : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                          )}
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                            isSelected
                              ? "bg-indigo-600 dark:bg-cyan-400 text-white dark:text-slate-950 shadow-xs"
                              : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                          )}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0 pr-4">
                            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                              {isVi ? opt.nameVi : opt.nameEn}
                            </div>
                            <div className="text-2xs text-slate-500 dark:text-slate-400 leading-snug mt-0.5 line-clamp-2">
                              {isVi ? opt.descVi : opt.descEn}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-indigo-600 dark:bg-cyan-400 text-white dark:text-slate-950 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Color Options */}
                {cursorConfig.style !== "system" && (
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 block">
                      {isVi ? "2. Màu sắc con trỏ" : "2. Cursor Color"}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {CURSOR_COLOR_OPTIONS.map((c) => {
                        const isSelected = cursorConfig.colorPreset === c.id;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setCursorColor(c.id)}
                            className={cn(
                              "flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all cursor-pointer",
                              isSelected
                                ? "border-indigo-500 dark:border-cyan-400 bg-indigo-50/50 dark:bg-cyan-950/20 shadow-2xs ring-1 ring-indigo-500/30 dark:ring-cyan-400/30"
                                : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900"
                            )}
                          >
                            <span
                              className="w-4 h-4 rounded-full shrink-0 shadow-xs border border-white/20"
                              style={{
                                backgroundColor: c.id === "auto" ? "#00f0ff" : c.hex,
                                backgroundImage: c.id === "auto" ? "linear-gradient(135deg, #00f0ff, #a855f7, #ec4899)" : undefined
                              }}
                            />
                            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                              {isVi ? c.nameVi : c.nameEn}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. Size & Features */}
                {cursorConfig.style !== "system" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {/* Size */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
                        {isVi ? "3. Kích thước" : "3. Cursor Size"}
                      </label>
                      <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                        {(["small", "medium", "large"] as CursorSize[]).map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setCursorSize(size)}
                            className={cn(
                              "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all capitalize cursor-pointer",
                              cursorConfig.size === size
                                ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-cyan-400 shadow-xs"
                                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                            )}
                          >
                            {size === "small" ? (isVi ? "Nhỏ" : "Small") : size === "medium" ? (isVi ? "Vừa" : "Medium") : (isVi ? "Lớn" : "Large")}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Trail Toggle */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
                        {isVi ? "4. Vệt sao & Hào quang" : "4. Trail Effect"}
                      </label>
                      <button
                        type="button"
                        onClick={() => setEnableTrail(!cursorConfig.enableTrail)}
                        className={cn(
                          "w-full flex items-center justify-between px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer",
                          cursorConfig.enableTrail
                            ? "bg-indigo-500/10 dark:bg-cyan-500/10 border-indigo-500 dark:border-cyan-400 text-indigo-700 dark:text-cyan-300"
                            : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                        )}
                      >
                        <span>{isVi ? "Vệt sáng theo chuyển động" : "Motion Stardust Trail"}</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded-md text-3xs font-black uppercase",
                          cursorConfig.enableTrail ? "bg-indigo-600 dark:bg-cyan-400 text-white dark:text-slate-950" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                        )}>
                          {cursorConfig.enableTrail ? (isVi ? "Bật" : "On") : (isVi ? "Tắt" : "Off")}
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Interactive Preview Sandbox */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-850 dark:to-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-2">
                    {isVi ? "Khu vực thử nghiệm tương tác con trỏ" : "Interactive Testing Sandbox"}
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-2.5">
                    <button
                      type="button"
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-transform hover:scale-105"
                    >
                      {isVi ? "Rê chuột vào đây" : "Hover Me"}
                    </button>
                    <input
                      type="text"
                      placeholder={isVi ? "Thử nhập văn bản..." : "Test input..."}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-white outline-none"
                    />
                    <button
                      type="button"
                      className="px-3.5 py-2 rounded-xl border border-indigo-400 dark:border-cyan-400 text-indigo-600 dark:text-cyan-400 text-xs font-bold cursor-pointer transition-transform hover:scale-105"
                    >
                      {isVi ? "Nút viền mỏng" : "Ghost Button"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 3: ÂM THANH (AUDIO / SOUND SETTINGS) */}
            {/* ========================================================================= */}
            {currentTab === "sound" && (
              <div className="space-y-6">
                {/* 1. Master Volume Sliders */}
                <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-sky-500" />
                      {isVi ? "Âm lượng tổng (Master Volume)" : "Master Volume"}
                    </span>
                    <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                      {Math.round(soundConfig.masterVolume * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={soundConfig.masterVolume}
                    onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                  />

                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div>
                      <div className="flex justify-between text-2xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        <span>{isVi ? "Âm hiệu ứng (UI)" : "UI Effects"}</span>
                        <span className="font-mono">{Math.round(soundConfig.uiVolume * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={soundConfig.uiVolume}
                        onChange={(e) => setUiVolume(parseFloat(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-2xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        <span>{isVi ? "Âm môi trường (Ambient)" : "Ambient"}</span>
                        <span className="font-mono">{Math.round(soundConfig.ambientVolume * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={soundConfig.ambientVolume}
                        onChange={(e) => setAmbientVolume(parseFloat(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Sound Packs Grid */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {isVi ? "2. Bộ âm thanh tương tác (Sound Pack)" : "2. Sound Pack"}
                    </label>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={playClick}
                        className="px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-3xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="w-2.5 h-2.5" />
                        <span>{isVi ? "Thử Click" : "Audition Click"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={playSuccess}
                        className="px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-3xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="w-2.5 h-2.5" />
                        <span>{isVi ? "Thử Chime" : "Audition Chime"}</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SOUND_PACK_OPTIONS.map((pack) => {
                      const isSelected = soundConfig.soundPack === pack.id;
                      return (
                        <button
                          key={pack.id}
                          type="button"
                          onClick={() => setSoundPack(pack.id)}
                          className={cn(
                            "flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer relative",
                            isSelected
                              ? "bg-sky-500/10 dark:bg-sky-500/15 border-sky-500 dark:border-sky-400 shadow-xs ring-1 ring-sky-500/30"
                              : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                          )}
                        >
                          <div className="flex-1 min-w-0 pr-4">
                            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                              {isVi ? pack.nameVi : pack.nameEn}
                            </div>
                            <div className="text-2xs text-slate-500 dark:text-slate-400 leading-snug mt-0.5 line-clamp-2">
                              {isVi ? pack.descVi : pack.descEn}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-sky-600 dark:bg-sky-400 text-white dark:text-slate-950 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Event Sound Toggles */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 block">
                    {isVi ? "3. Bật / Tắt theo từng sự kiện" : "3. Event Toggles"}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { key: "enableClickSound", labelVi: "Âm click nút & liên kết", labelEn: "Button Click Sound" },
                      { key: "enableHoverSound", labelVi: "Âm lướt chuột (Hover tick)", labelEn: "Hover Tick Sound" },
                      { key: "enablePageTransitionSound", labelVi: "Âm chuyển trang (Transition)", labelEn: "Page Transition Sound" },
                      { key: "enableSuccessSound", labelVi: "Âm hoàn thành & thông báo", labelEn: "Success & Chime Sound" },
                    ].map((item) => {
                      const isChecked = (soundConfig as any)[item.key];
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => updateSoundConfig({ [item.key]: !isChecked })}
                          className={cn(
                            "flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer",
                            isChecked
                              ? "bg-sky-50 dark:bg-sky-950/20 border-sky-300 dark:border-sky-800 text-sky-900 dark:text-sky-300"
                              : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                          )}
                        >
                          <span>{isVi ? item.labelVi : item.labelEn}</span>
                          <span className={cn(
                            "px-1.5 py-0.5 rounded text-3xs font-black uppercase",
                            isChecked ? "bg-sky-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                          )}>
                            {isChecked ? (isVi ? "Bật" : "On") : (isVi ? "Tắt" : "Off")}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Ambient Soundscape */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 block">
                    {isVi ? "4. Âm thanh môi trường nền (Ambient Focus)" : "4. Ambient Soundscape"}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {AMBIENT_SOUND_OPTIONS.map((ambient) => {
                      const Icon = getAmbientIcon(ambient.id);
                      const isSelected = soundConfig.ambientSound === ambient.id;
                      return (
                        <button
                          key={ambient.id}
                          type="button"
                          onClick={() => setAmbientSound(ambient.id)}
                          className={cn(
                            "flex flex-col items-center p-3 rounded-xl border text-center transition-all cursor-pointer",
                            isSelected
                              ? "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500 dark:border-emerald-400 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30"
                              : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                          )}
                        >
                          <Icon className="w-5 h-5 mb-1.5" />
                          <span className="text-xs font-bold">{isVi ? ambient.nameVi : ambient.nameEn}</span>
                          <span className="text-3xs text-slate-400 mt-0.5 line-clamp-1">
                            {ambient.id === "none" ? (isVi ? "Im lặng" : "Silent") : (isVi ? "Thư thái" : "Calm")}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 4: TÙY CHỈNH & GIAO DIỆN (CUSTOMIZATION & THEME) */}
            {/* ========================================================================= */}
            {currentTab === "customization" && (
              <div className="space-y-6">
                {/* 1. Language Toggle */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 block">
                    {isVi ? "1. Ngôn ngữ hiển thị (Language)" : "1. Display Language"}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
                      { id: "en", label: "English", flag: "🇬🇧" },
                    ].map((l) => {
                      const isSelected = lang === l.id;
                      return (
                        <button
                          key={l.id}
                          type="button"
                          onClick={() => setLang(l.id as any)}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer",
                            isSelected
                              ? "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500 dark:border-emerald-400 text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-500/30"
                              : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">{l.flag}</span>
                            <span>{l.label}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Theme Toggle (Light / Dark / System) */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 block">
                    {isVi ? "2. Chế độ giao diện (Theme Mode)" : "2. Theme Mode Engine"}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      {
                        mode: "light" as const,
                        nameVi: "MRITECH Sáng (Light)",
                        nameEn: "Light Glass",
                        descVi: "Nền kính sáng cao cấp, tương phản chuẩn AAA",
                        descEn: "Clean Pearl Glass canvas",
                        Icon: Sun,
                      },
                      {
                        mode: "dark" as const,
                        nameVi: "Glass Tối Neon (Dark)",
                        nameEn: "Dark Neon",
                        descVi: "Giao diện tối chuyên nghiệp với viền neon",
                        descEn: "Dark glassmorphism with neon",
                        Icon: Moon,
                      },
                      {
                        mode: "system" as const,
                        nameVi: "Hệ thống (System Auto)",
                        nameEn: "System Auto",
                        descVi: "Tự động đồng bộ theo cấu hình máy (OS)",
                        descEn: "Sync with OS prefers-color-scheme",
                        Icon: Monitor,
                      },
                    ].map((th) => {
                      const isSelected = themeMode === th.mode;
                      return (
                        <button
                          key={th.mode}
                          type="button"
                          onClick={() => setThemeMode(th.mode)}
                          className={cn(
                            "flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer relative",
                            isSelected
                              ? "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500 dark:border-emerald-400 shadow-xs ring-1 ring-emerald-500/30"
                              : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300"
                          )}
                        >
                          <div className={cn(
                            "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                            isSelected ? "bg-emerald-600 text-white shadow-xs" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                          )}>
                            <th.Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0 pr-3">
                            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {isVi ? th.nameVi : th.nameEn}
                            </div>
                            <div className="text-3xs text-slate-500 dark:text-slate-400 leading-snug mt-0.5 line-clamp-2">
                              {isVi ? th.descVi : th.descEn}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2 h-2 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Color Tokens Grid */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {isVi ? "3. Bộ màu sắc & Design Tokens" : "3. Color Presets & Tokens"}
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsFooterModalOpen(false);
                        openColorModal();
                      }}
                      className="text-3xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isVi ? "Tùy chỉnh nâng cao" : "Advanced Tokens"}</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {COLOR_PRESETS.map((preset) => {
                      const isSelected = colorPreset === preset.id;
                      const isDark = theme === "glass-dark-neon";
                      const c = isDark ? preset.dark : preset.light;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setColorPreset(preset.id)}
                          className={cn(
                            "flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer",
                            isSelected
                              ? "bg-emerald-50 dark:bg-emerald-950/25 border-emerald-500 dark:border-emerald-400 ring-1 ring-emerald-500/30"
                              : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                          )}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="flex items-center -space-x-1 shrink-0">
                              <span className="w-3 h-3 rounded-full border border-white/40" style={{ backgroundColor: c.primary }} />
                              <span className="w-3 h-3 rounded-full border border-white/40" style={{ backgroundColor: c.secondary }} />
                              <span className="w-3 h-3 rounded-full border border-white/40" style={{ backgroundColor: c.accent }} />
                            </div>
                            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                              {isVi ? preset.nameVi : preset.name}
                            </span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Quick Actions / Links */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 block">
                    {isVi ? "4. Lối tắt cài đặt khác" : "4. Other Settings Shortcuts"}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentTab("typography");
                        setFooterModalTab("typography");
                      }}
                      className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-xs font-semibold text-slate-800 dark:text-white cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                        <Type className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate">{isVi ? "Tab Font chữ" : "Typography Tab"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCurrentTab("radius");
                        setFooterModalTab("radius");
                      }}
                      className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-xs font-semibold text-slate-800 dark:text-white cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                        <Layers className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate">{isVi ? "Tab Bo cong góc" : "Radius Tab"}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: TYPOGRAPHY (FONT CHỮ) */}
            {currentTab === "typography" && (
              <div className="space-y-6">
                {/* 1. Master Font Banner */}
                <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Type className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase text-amber-800 dark:text-amber-300">
                        {isVi ? "Phông Chữ Chuẩn Toàn Cục:" : "Global Typography Standard:"}
                      </span>
                      <span className="font-mono text-xs font-black px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-900 dark:text-amber-200">
                        Play, sans-serif
                      </span>
                    </div>
                    <p className="text-2xs text-amber-700/80 dark:text-amber-300/80 mt-1 leading-relaxed">
                      {isVi 
                        ? "Áp dụng đồng bộ font chữ 'Play' chuẩn Master Agent Design System cho tất cả tiêu đề, nội dung và thẻ thành phần."
                        : "Strictly unified 'Play' Google Font across all titles, body elements, stats and bento cards."}
                    </p>
                  </div>
                </div>

                {/* 2. Global Font Scale */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {isVi ? "1. Tỷ lệ kích thước chữ toàn cục" : "1. Global Font Scale"}
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                        {fontScale}%
                      </span>
                    </div>
                  </div>

                  {/* Preset Buttons */}
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {[
                      { scale: 90, labelVi: "90% Gọn", labelEn: "90% Compact" },
                      { scale: 100, labelVi: "100% Chuẩn", labelEn: "100% Default" },
                      { scale: 110, labelVi: "110% Rộng", labelEn: "110% Medium" },
                      { scale: 120, labelVi: "120% Lớn", labelEn: "120% Large" },
                    ].map((p) => {
                      const isSelected = fontScale === p.scale;
                      return (
                        <button
                          key={p.scale}
                          type="button"
                          onClick={() => setFontScale(p.scale)}
                          className={cn(
                            "py-2 px-1 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer",
                            isSelected
                              ? "bg-amber-500/15 border-amber-500 text-amber-900 dark:text-amber-200 ring-1 ring-amber-500/30"
                              : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                          )}
                        >
                          {isVi ? p.labelVi : p.labelEn}
                        </button>
                      );
                    })}
                  </div>

                  {/* Range Slider with Controls */}
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30">
                    <button
                      type="button"
                      onClick={() => setFontScale(Math.max(80, fontScale - 5))}
                      disabled={fontScale <= 80}
                      className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200 dark:border-slate-600 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <input
                      type="range"
                      min="80"
                      max="130"
                      step="1"
                      value={fontScale}
                      onChange={(e) => setFontScale(Number(e.target.value))}
                      className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />

                    <button
                      type="button"
                      onClick={() => setFontScale(Math.min(130, fontScale + 5))}
                      disabled={fontScale >= 130}
                      className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200 dark:border-slate-600 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 3. Typography Hierarchy Inspector */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 block">
                    {isVi ? "2. Phân cấp Typography Tokens & Thử Nghiệm" : "2. Typography Token Hierarchy"}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {TYPO_TOKENS.map((tk) => {
                      const isSelected = activeTypoToken === tk.id;
                      return (
                        <button
                          key={tk.id}
                          type="button"
                          onClick={() => setActiveTypoToken(tk.id)}
                          className={cn(
                            "p-2.5 rounded-xl border text-left transition-all cursor-pointer",
                            isSelected
                              ? "bg-amber-500/10 dark:bg-amber-500/15 border-amber-500 text-amber-950 dark:text-amber-200 ring-1 ring-amber-500/30"
                              : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                          )}
                        >
                          <div className="text-xs font-black text-slate-900 dark:text-white truncate">
                            {isVi ? tk.labelVi : tk.labelEn}
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-3xs font-mono text-slate-500 dark:text-slate-400">
                            <span>{tk.size}</span>
                            <span>•</span>
                            <span>w{tk.weight}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Live Text Preview Sandbox */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {isVi ? "3. Khung xem trước trực tiếp tiếng Việt" : "3. Live Vietnamese Preview Sandbox"}
                    </label>
                    <input
                      type="text"
                      placeholder={isVi ? "Nhập chữ để test..." : "Type text to test..."}
                      value={customTestText}
                      onChange={(e) => setCustomTestText(e.target.value)}
                      className="px-2.5 py-1 text-2xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500 w-48"
                    />
                  </div>

                  <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 min-h-[90px] flex items-center justify-center text-center">
                    {(() => {
                      const currentTk = TYPO_TOKENS.find((t) => t.id === activeTypoToken) || TYPO_TOKENS[5];
                      const displayText = customTestText || currentTk.sampleText;
                      return (
                        <div
                          className="font-play text-slate-900 dark:text-white transition-all max-w-full"
                          style={{
                            fontWeight: currentTk.weight,
                            fontSize: currentTk.id === "display" ? "28px" : currentTk.id === "h1" ? "24px" : currentTk.id === "h2" ? "20px" : currentTk.id === "h3" ? "17px" : currentTk.id === "card" ? "16px" : currentTk.id === "caption" ? "12px" : "14px",
                            lineHeight: currentTk.leading,
                          }}
                        >
                          {displayText}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: RADIUS (BO CONG GÓC) */}
            {currentTab === "radius" && (
              <div className="space-y-6">
                {/* 1. Master Radius Banner */}
                <div className="p-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-700 dark:text-rose-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Layers className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase text-rose-800 dark:text-rose-300">
                        {isVi ? "Quy Chuẩn Bo Góc Master Agent:" : "Master Agent Radius Standard:"}
                      </span>
                      <span className="font-mono text-xs font-black px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-900 dark:text-rose-200">
                        {borderRadius}px
                      </span>
                    </div>
                    <p className="text-2xs text-rose-700/80 dark:text-rose-300/80 mt-1 leading-relaxed">
                      {isVi 
                        ? "Điều chỉnh độ bo cong góc toàn bộ 16 trang với quy tắc toán học lồng nhau (Inner Radius = Outer Radius - Padding)."
                        : "Dynamically tune corner radius across all 16 pages with nested mathematical scaling."}
                    </p>
                  </div>
                </div>

                {/* 2. Radius Presets Grid */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 block">
                    {isVi ? "1. Bộ cài đặt mẫu nhanh (Radius Presets)" : "1. Radius Presets"}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {RADIUS_PRESETS.map((rp) => {
                      const isSelected = borderRadius === rp.radius;
                      return (
                        <button
                          key={rp.id}
                          type="button"
                          onClick={() => setBorderRadius(rp.radius)}
                          className={cn(
                            "flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer relative",
                            isSelected
                              ? "bg-rose-500/10 dark:bg-rose-500/15 border-rose-500 text-rose-950 dark:text-rose-200 ring-1 ring-rose-500/30"
                              : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300"
                          )}
                        >
                          <div 
                            className={cn(
                              "w-8 h-8 flex items-center justify-center shrink-0 border-2 mt-0.5 transition-all",
                              isSelected 
                                ? "bg-rose-500 text-white border-rose-600 shadow-xs" 
                                : "bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300"
                            )}
                            style={{ borderRadius: `${rp.radius}px` }}
                          >
                            <Box className="w-4 h-4" />
                          </div>

                          <div className="flex-1 min-w-0 pr-4">
                            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <span>{isVi ? rp.nameVi : rp.nameEn}</span>
                            </div>
                            <div className="text-2xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                              {isVi ? rp.descVi : rp.descEn}
                            </div>
                          </div>

                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Manual Fine-Tuning Range Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {isVi ? "2. Tinh chỉnh bán kính bo góc thủ công" : "2. Manual Corner Radius Slider"}
                    </label>
                    <span className="font-mono text-xs font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-0.5 rounded-full border border-rose-500/30">
                      {borderRadius}px
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30">
                    <button
                      type="button"
                      onClick={() => setBorderRadius(Math.max(0, borderRadius - 2))}
                      disabled={borderRadius <= 0}
                      className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200 dark:border-slate-600 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <input
                      type="range"
                      min="0"
                      max="28"
                      step="1"
                      value={borderRadius}
                      onChange={(e) => setBorderRadius(Number(e.target.value))}
                      className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />

                    <button
                      type="button"
                      onClick={() => setBorderRadius(Math.min(28, borderRadius + 2))}
                      disabled={borderRadius >= 28}
                      className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200 dark:border-slate-600 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 4. Live Interactive Component Preview */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 block">
                    {isVi ? "3. Khung xem trước tương tác thực tế" : "3. Live Nested Component Preview"}
                  </label>

                  <div 
                    className="p-5 border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/80 space-y-3.5 transition-all shadow-sm"
                    style={{ borderRadius: `${borderRadius}px` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-7 h-7 bg-rose-500 text-white flex items-center justify-center font-bold text-xs"
                          style={{ borderRadius: `${Math.max(4, borderRadius - 2)}px` }}
                        >
                          HT
                        </div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {isVi ? "Thẻ Bento Card Mẫu" : "Sample Bento Card"}
                        </span>
                      </div>

                      <span 
                        className="px-2.5 py-0.5 text-3xs font-black uppercase bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                        style={{ borderRadius: "9999px" }}
                      >
                        {isVi ? "Đang áp dụng" : "Live Token"}
                      </span>
                    </div>

                    {/* Nested Sub Container */}
                    <div 
                      className="p-3 border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-800/90 transition-all flex flex-col sm:flex-row items-center justify-between gap-3"
                      style={{ borderRadius: `${Math.max(2, borderRadius - 4)}px` }}
                    >
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <input
                          type="text"
                          readOnly
                          value={isVi ? "Ô nhập liệu mẫu" : "Sample Input Box"}
                          className="px-3 py-1.5 text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 w-full sm:w-36 focus:outline-none"
                          style={{ borderRadius: `${Math.max(4, borderRadius - 2)}px` }}
                        />
                      </div>

                      <button
                        type="button"
                        className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs w-full sm:w-auto cursor-pointer"
                        style={{ borderRadius: `${Math.max(6, borderRadius)}px` }}
                      >
                        {isVi ? "Nút Hành Động" : "Action Button"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70">
            <button
              type="button"
              onClick={handleResetCurrentTab}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>
                {isVi 
                  ? (currentTab === "footer" 
                      ? "Đặt lại Footer" 
                      : currentTab === "cursor" 
                        ? "Đặt lại Con trỏ" 
                        : currentTab === "sound" 
                          ? "Đặt lại Âm thanh" 
                          : currentTab === "customization"
                            ? "Đặt lại Giao diện"
                            : currentTab === "typography"
                              ? "Đặt lại Font chữ"
                              : "Đặt lại Bo góc") 
                  : "Reset Tab Defaults"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsFooterModalOpen(false)}
              className={cn(
                "px-4 py-2 rounded-xl text-white text-xs font-bold shadow-sm transition-all cursor-pointer",
                currentTab === "footer" 
                  ? "bg-purple-600 hover:bg-purple-700" 
                  : currentTab === "cursor" 
                    ? "bg-indigo-600 hover:bg-indigo-700" 
                    : currentTab === "sound"
                      ? "bg-sky-600 hover:bg-sky-700"
                      : currentTab === "customization"
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : currentTab === "typography"
                          ? "bg-amber-600 hover:bg-amber-700"
                          : "bg-rose-600 hover:bg-rose-700"
              )}
            >
              {isVi ? "Hoàn tất & Đóng" : "Done & Close"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
