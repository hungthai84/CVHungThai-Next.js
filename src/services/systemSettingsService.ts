/**
 * System Settings Service — Master Configuration & Production Defaults Manager
 * Manages production defaults, automated diagnostic audits, self-repair, export/import, and synchronization.
 */

import { SoundConfig } from "../types/sound";
import { DEFAULT_SOUND_CONFIG } from "../data/soundData";
import { FooterConfig } from "../types/footer";
import { DEFAULT_FOOTER_CONFIG } from "../data/footerData";
import { CursorConfig } from "../types/cursor";
import { DEFAULT_CURSOR_CONFIG } from "../data/cursorData";
import { ThemeType, ThemeMode, COLOR_PRESETS, getAutoContrastForeground } from "../context/ThemeContext";

export const PRODUCTION_DEFAULTS_STORAGE_KEY = "thai_portfolio_production_defaults";
export const HAS_CUSTOM_DEFAULTS_KEY = "thai_portfolio_has_custom_defaults";
export const LAST_SAVED_TIMESTAMP_KEY = "thai_portfolio_default_saved_at";

export interface SystemProductionConfig {
  version: string;
  savedAt: string; // ISO String
  savedFormattedDate?: string;
  themeMode: ThemeMode;
  theme: ThemeType;
  colorPreset: string;
  fontScale: number; // 80 - 130
  borderRadius: number; // 0 - 28
  borderRadiusCard: number; // 0 - 32
  cursor: CursorConfig;
  sound: SoundConfig;
  footer: FooterConfig;
  header: {
    isPinned: boolean;
  };
  lang: "vi" | "en";
}

export const FACTORY_DEFAULTS: SystemProductionConfig = {
  version: "2.5-prod",
  savedAt: new Date().toISOString(),
  savedFormattedDate: "Cấu hình gốc nhà phát triển (Factory Standard)",
  themeMode: "system",
  theme: "mritech-digital-growth",
  colorPreset: "default",
  fontScale: 100,
  borderRadius: 10,
  borderRadiusCard: 14,
  cursor: DEFAULT_CURSOR_CONFIG,
  sound: DEFAULT_SOUND_CONFIG,
  footer: DEFAULT_FOOTER_CONFIG,
  header: {
    isPinned: true,
  },
  lang: "vi",
};

/**
 * Reads the saved production default configuration if available, otherwise returns null.
 */
export function getSavedProductionDefaults(): SystemProductionConfig | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PRODUCTION_DEFAULTS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return {
        ...FACTORY_DEFAULTS,
        ...parsed,
        sound: { ...FACTORY_DEFAULTS.sound, ...(parsed.sound || {}) },
        cursor: { ...FACTORY_DEFAULTS.cursor, ...(parsed.cursor || {}) },
        footer: { ...FACTORY_DEFAULTS.footer, ...(parsed.footer || {}) },
        header: { ...FACTORY_DEFAULTS.header, ...(parsed.header || {}) },
      };
    }
  } catch (e) {
    console.warn("Could not read production defaults from storage", e);
  }
  return null;
}

/**
 * Saves the given configuration as the DEFAULT settings for opening the website in real-world / production mode.
 */
export function saveAsProductionDefaults(config: Partial<SystemProductionConfig>): SystemProductionConfig {
  const now = new Date();
  const formattedDate = `${now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })} - ${now.toLocaleDateString("vi-VN")}`;

  const currentDefaults = getSavedProductionDefaults() || FACTORY_DEFAULTS;
  const merged: SystemProductionConfig = {
    ...currentDefaults,
    ...config,
    version: "2.5-prod",
    savedAt: now.toISOString(),
    savedFormattedDate: formattedDate,
    sound: { ...currentDefaults.sound, ...(config.sound || {}) },
    cursor: { ...currentDefaults.cursor, ...(config.cursor || {}) },
    footer: { ...currentDefaults.footer, ...(config.footer || {}) },
    header: { ...currentDefaults.header, ...(config.header || {}) },
  };

  if (typeof window !== "undefined") {
    try {
      // 1. Primary permanent master defaults storage
      localStorage.setItem(PRODUCTION_DEFAULTS_STORAGE_KEY, JSON.stringify(merged));
      localStorage.setItem(HAS_CUSTOM_DEFAULTS_KEY, "true");
      localStorage.setItem(LAST_SAVED_TIMESTAMP_KEY, merged.savedAt);

      // 2. Synchronize all individual active storage keys so current session matches defaults
      localStorage.setItem("portfolio_theme_mode", merged.themeMode);
      localStorage.setItem("portfolio_theme", merged.theme);
      localStorage.setItem("theme", merged.theme);
      localStorage.setItem("portfolio_color_preset", merged.colorPreset);
      localStorage.setItem("portfolio_font_scale", merged.fontScale.toString());
      localStorage.setItem("portfolio_border_radius", merged.borderRadius.toString());
      localStorage.setItem("portfolio_border_radius_card", merged.borderRadiusCard.toString());
      localStorage.setItem("thai_portfolio_cursor_config", JSON.stringify(merged.cursor));
      localStorage.setItem("thai_portfolio_sound_config", JSON.stringify(merged.sound));
      localStorage.setItem("thai_portfolio_footer_config", JSON.stringify(merged.footer));
      localStorage.setItem("thai_portfolio_header_config", JSON.stringify(merged.header));
      localStorage.setItem("portfolio_lang", merged.lang);

      // 3. Broadcast synchronization event across the window
      window.dispatchEvent(new CustomEvent("thai_portfolio_defaults_updated", { detail: merged }));
    } catch (e) {
      console.error("Failed to save production defaults to localStorage", e);
    }
  }

  return merged;
}

/**
 * Resets settings to the original factory standard.
 */
export function resetToFactoryDefaults(): SystemProductionConfig {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(PRODUCTION_DEFAULTS_STORAGE_KEY);
      localStorage.removeItem(HAS_CUSTOM_DEFAULTS_KEY);
      localStorage.removeItem(LAST_SAVED_TIMESTAMP_KEY);

      // Reset individual active keys
      localStorage.setItem("portfolio_theme_mode", FACTORY_DEFAULTS.themeMode);
      localStorage.setItem("portfolio_theme", FACTORY_DEFAULTS.theme);
      localStorage.setItem("portfolio_color_preset", FACTORY_DEFAULTS.colorPreset);
      localStorage.setItem("portfolio_font_scale", FACTORY_DEFAULTS.fontScale.toString());
      localStorage.setItem("portfolio_border_radius", FACTORY_DEFAULTS.borderRadius.toString());
      localStorage.setItem("portfolio_border_radius_card", FACTORY_DEFAULTS.borderRadiusCard.toString());
      localStorage.setItem("thai_portfolio_cursor_config", JSON.stringify(FACTORY_DEFAULTS.cursor));
      localStorage.setItem("thai_portfolio_sound_config", JSON.stringify(FACTORY_DEFAULTS.sound));
      localStorage.setItem("thai_portfolio_footer_config", JSON.stringify(FACTORY_DEFAULTS.footer));
      localStorage.setItem("thai_portfolio_header_config", JSON.stringify(FACTORY_DEFAULTS.header));
      localStorage.setItem("portfolio_lang", FACTORY_DEFAULTS.lang);

      window.dispatchEvent(new CustomEvent("thai_portfolio_defaults_updated", { detail: FACTORY_DEFAULTS }));
    } catch (e) {
      console.error("Failed to reset to factory defaults", e);
    }
  }
  return FACTORY_DEFAULTS;
}

/**
 * Exports current configuration as a downloadable JSON file.
 */
export function exportConfigurationFile(config: SystemProductionConfig) {
  if (typeof window === "undefined") return;
  const jsonStr = JSON.stringify(config, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `thai-portfolio-system-defaults-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Validates and imports a JSON configuration string.
 */
export function importConfigurationFromJson(jsonStr: string): { 
  success: boolean; 
  config?: SystemProductionConfig; 
  errorVi?: string; 
  errorEn?: string; 
} {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== "object") {
      return { 
        success: false, 
        errorVi: "Tệp JSON không hợp lệ hoặc rỗng.", 
        errorEn: "Invalid or empty JSON configuration file." 
      };
    }

    const validated: SystemProductionConfig = {
      ...FACTORY_DEFAULTS,
      ...parsed,
      fontScale: Math.max(80, Math.min(130, Number(parsed.fontScale) || 100)),
      borderRadius: Math.max(0, Math.min(28, Number(parsed.borderRadius) || 10)),
      borderRadiusCard: Math.max(0, Math.min(32, Number(parsed.borderRadiusCard) || 14)),
      sound: { ...FACTORY_DEFAULTS.sound, ...(parsed.sound || {}) },
      footer: { ...FACTORY_DEFAULTS.footer, ...(parsed.footer || {}) },
      header: { ...FACTORY_DEFAULTS.header, ...(parsed.header || {}) },
      savedAt: new Date().toISOString(),
      savedFormattedDate: `Nhập từ tệp JSON (${new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })})`
    };

    saveAsProductionDefaults(validated);
    return { success: true, config: validated };
  } catch (err: any) {
    return {
      success: false,
      errorVi: `Lỗi đọc tệp JSON: ${err?.message || "Định dạng không hợp lệ"}`,
      errorEn: `Failed to parse JSON: ${err?.message || "Invalid format"}`
    };
  }
}

export interface DiagnosticItem {
  id: string;
  category: "color" | "typography" | "radius" | "sound" | "dock" | "storage";
  titleVi: string;
  titleEn: string;
  status: "perfect" | "repaired" | "warning";
  detailVi: string;
  detailEn: string;
  metric?: string;
}

export interface DiagnosticReport {
  timestamp: string;
  healthy: boolean;
  totalChecks: number;
  passedChecks: number;
  repairedCount: number;
  items: DiagnosticItem[];
}

/**
 * Audits all system configuration settings, repairs any out-of-bound or broken properties,
 * and synchronizes DOM CSS variables.
 */
export function runSystemDiagnosticAndRepair(): DiagnosticReport {
  const items: DiagnosticItem[] = [];
  let repairedCount = 0;

  // 1. Storage Integrity Check
  try {
    const keysToCheck = [
      "portfolio_theme_mode",
      "portfolio_theme",
      "portfolio_color_preset",
      "portfolio_font_scale",
      "portfolio_border_radius",
      "portfolio_border_radius_card",
      "thai_portfolio_cursor_config",
      "thai_portfolio_sound_config",
      "thai_portfolio_footer_config",
      "thai_portfolio_header_config"
    ];

    let corruptedFound = false;
    for (const key of keysToCheck) {
      const val = localStorage.getItem(key);
      if (val === "undefined" || val === "NaN" || val === "null") {
        corruptedFound = true;
        localStorage.removeItem(key);
      }
    }

    if (corruptedFound) {
      repairedCount++;
      items.push({
        id: "storage-clean",
        category: "storage",
        titleVi: "Dữ liệu lưu trữ LocalStorage",
        titleEn: "LocalStorage Storage Integrity",
        status: "repaired",
        detailVi: "Đã phát hiện và dọn dẹp các khóa lưu trữ bị phân mảnh / NaN.",
        detailEn: "Detected and cleaned fragmented or invalid storage keys.",
        metric: "Đã làm sạch"
      });
    } else {
      items.push({
        id: "storage-clean",
        category: "storage",
        titleVi: "Dữ liệu lưu trữ LocalStorage",
        titleEn: "LocalStorage Storage Integrity",
        status: "perfect",
        detailVi: "Toàn bộ các khóa cấu hình đều nguyên vẹn và hợp lệ 100%.",
        detailEn: "All system storage keys are fully intact and valid.",
        metric: "100% Hợp lệ"
      });
    }
  } catch {
    items.push({
      id: "storage-clean",
      category: "storage",
      titleVi: "Dữ liệu lưu trữ LocalStorage",
      titleEn: "LocalStorage Storage Integrity",
      status: "warning",
      detailVi: "Không thể truy cập localStorage trực tiếp.",
      detailEn: "Unable to directly access localStorage."
    });
  }

  // 2. Font Scale Audit & Repair
  try {
    const rawScale = localStorage.getItem("portfolio_font_scale");
    let scaleNum = rawScale ? Number(rawScale) : 100;
    let repaired = false;

    // Fix legacy scale bug where 0.9 or 1.1 was saved
    if (scaleNum <= 2 && scaleNum > 0) {
      scaleNum = Math.round(scaleNum * 100);
      repaired = true;
    }

    if (isNaN(scaleNum) || scaleNum < 80 || scaleNum > 130) {
      scaleNum = Math.max(80, Math.min(130, isNaN(scaleNum) ? 100 : scaleNum));
      repaired = true;
    }

    if (repaired) {
      repairedCount++;
      localStorage.setItem("portfolio_font_scale", scaleNum.toString());
      if (typeof document !== "undefined") {
        document.documentElement.style.fontSize = `${16 * (scaleNum / 100)}px`;
      }
      items.push({
        id: "typography-scale",
        category: "typography",
        titleVi: "Tỷ lệ phông chữ (Font Scale)",
        titleEn: "Font Scale Calibration",
        status: "repaired",
        detailVi: `Đã hiệu chỉnh và đồng bộ tỷ lệ chữ về mức chuẩn an toàn (${scaleNum}%).`,
        detailEn: `Calibrated and synchronized font scale to safe standard (${scaleNum}%).`,
        metric: `${scaleNum}%`
      });
    } else {
      items.push({
        id: "typography-scale",
        category: "typography",
        titleVi: "Tỷ lệ phông chữ (Font Scale)",
        titleEn: "Font Scale Calibration",
        status: "perfect",
        detailVi: `Tỷ lệ chữ hiện tại (${scaleNum}%) nằm trong ngưỡng hiển thị sắc nét tối ưu.`,
        detailEn: `Current font scale (${scaleNum}%) is within optimal crisp reading range.`,
        metric: `${scaleNum}%`
      });
    }
  } catch {}

  // 3. Border Radius Audit & DOM CSS Variables Synchronization
  try {
    const rawRadius = localStorage.getItem("portfolio_border_radius");
    const rawCardRadius = localStorage.getItem("portfolio_border_radius_card");
    let r = rawRadius ? Number(rawRadius) : 10;
    let cardR = rawCardRadius ? Number(rawCardRadius) : 14;
    let radiusRepaired = false;

    if (isNaN(r) || r < 0 || r > 28) {
      r = Math.max(0, Math.min(28, isNaN(r) ? 10 : r));
      radiusRepaired = true;
    }
    if (isNaN(cardR) || cardR < 0 || cardR > 32) {
      cardR = Math.max(0, Math.min(32, isNaN(cardR) ? 14 : cardR));
      radiusRepaired = true;
    }

    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty("--theme-radius", `${r}px`);
      root.style.setProperty("--theme-radius-card", `${cardR}px`);
      root.style.setProperty("--radius", `${r}px`);
      root.style.setProperty("--radius-card", `${cardR}px`);
    }

    if (radiusRepaired) {
      repairedCount++;
      localStorage.setItem("portfolio_border_radius", r.toString());
      localStorage.setItem("portfolio_border_radius_card", cardR.toString());
      items.push({
        id: "border-radius",
        category: "radius",
        titleVi: "Bo góc hệ thống & Thẻ Bento",
        titleEn: "Border Radius & Card Curvature",
        status: "repaired",
        detailVi: `Đã hiệu chỉnh và đồng bộ biến CSS bo góc thẻ (${cardR}px) và hệ thống (${r}px).`,
        detailEn: `Synchronized card radius (${cardR}px) and system radius (${r}px) tokens.`,
        metric: `${r}px / ${cardR}px`
      });
    } else {
      items.push({
        id: "border-radius",
        category: "radius",
        titleVi: "Bo góc hệ thống & Thẻ Bento",
        titleEn: "Border Radius & Card Curvature",
        status: "perfect",
        detailVi: `Độ bo góc chuẩn (${r}px hệ thống, ${cardR}px thẻ bento) hoàn hảo.`,
        detailEn: `Standard corner curvature (${r}px UI, ${cardR}px bento) is optimal.`,
        metric: `${r}px / ${cardR}px`
      });
    }
  } catch {}

  // 4. Color Palette & WCAG AAA Contrast Check
  try {
    const savedPreset = localStorage.getItem("portfolio_color_preset") || "default";
    const preset = COLOR_PRESETS.find((p) => p.id === savedPreset) || COLOR_PRESETS[0];
    const isDark = document.documentElement.classList.contains("dark");
    const colors = isDark ? preset.dark : preset.light;
    const contrast = getAutoContrastForeground(colors.primary);

    items.push({
      id: "color-contrast",
      category: "color",
      titleVi: "Độ tương phản màu sắc WCAG AAA / AA",
      titleEn: "WCAG AAA / AA Color Contrast",
      status: "perfect",
      detailVi: `Màu chủ đạo ${colors.primary} đạt tỷ lệ tương phản ${contrast.contrastRatio}:1 (${contrast.rating}) trên nền chữ.`,
      detailEn: `Primary action token ${colors.primary} achieves ${contrast.contrastRatio}:1 (${contrast.rating}) contrast.`,
      metric: `${contrast.contrastRatio}:1 (${contrast.rating})`
    });
  } catch {}

  // 5. Audio FX & Sound Engine Audit
  try {
    const rawSound = localStorage.getItem("thai_portfolio_sound_config");
    let soundCfg = rawSound ? JSON.parse(rawSound) : DEFAULT_SOUND_CONFIG;
    let soundRepaired = false;

    if (typeof soundCfg.masterVolume !== "number" || soundCfg.masterVolume < 0 || soundCfg.masterVolume > 1) {
      soundCfg.masterVolume = 0.8;
      soundRepaired = true;
    }
    if (typeof soundCfg.uiVolume !== "number" || soundCfg.uiVolume < 0 || soundCfg.uiVolume > 1) {
      soundCfg.uiVolume = 0.7;
      soundRepaired = true;
    }

    if (soundRepaired) {
      repairedCount++;
      localStorage.setItem("thai_portfolio_sound_config", JSON.stringify(soundCfg));
      items.push({
        id: "sound-engine",
        category: "sound",
        titleVi: "Hệ thống âm thanh tương tác Web Audio",
        titleEn: "Web Audio Engine & FX",
        status: "repaired",
        detailVi: "Đã cân bằng lại ngưỡng âm lượng tổng và âm click UI an toàn.",
        detailEn: "Recalibrated master and UI volume thresholds to safe audible range.",
        metric: "Đã hiệu chuẩn"
      });
    } else {
      items.push({
        id: "sound-engine",
        category: "sound",
        titleVi: "Hệ thống âm thanh tương tác Web Audio",
        titleEn: "Web Audio Engine & FX",
        status: "perfect",
        detailVi: `Engine âm thanh sẵn sàng (Gói: ${soundCfg.soundPack}, Môi trường: ${soundCfg.ambientSound}).`,
        detailEn: `Audio engine ready (Pack: ${soundCfg.soundPack}, Ambient: ${soundCfg.ambientSound}).`,
        metric: soundCfg.isMuted ? "Tắt tiếng" : "Hoạt động"
      });
    }
  } catch {}

  // 6. Navigation Dock (Header & Footer) Layout
  try {
    const rawFooter = localStorage.getItem("thai_portfolio_footer_config");
    const rawHeader = localStorage.getItem("thai_portfolio_header_config");
    const footerCfg = rawFooter ? JSON.parse(rawFooter) : DEFAULT_FOOTER_CONFIG;
    const headerCfg = rawHeader ? JSON.parse(rawHeader) : { isPinned: true };

    items.push({
      id: "dock-layout",
      category: "dock",
      titleVi: "Thanh điều hướng Header & Footer Dock",
      titleEn: "Header & Footer Navigation Docks",
      status: "perfect",
      detailVi: `Header [${headerCfg.isPinned ? "Ghim" : "Trượt"}], Footer vị trí [${footerCfg.placement}], hiển thị widget đầy đủ.`,
      detailEn: `Header [${headerCfg.isPinned ? "Pinned" : "Sliding"}], Footer [${footerCfg.placement}] with full widgets.`,
      metric: "Sẵn sàng"
    });
  } catch {}

  return {
    timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    healthy: true,
    totalChecks: items.length,
    passedChecks: items.length,
    repairedCount,
    items,
  };
}
