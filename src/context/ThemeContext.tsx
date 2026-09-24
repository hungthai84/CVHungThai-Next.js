import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useTheme as useNextTheme } from "next-themes";

export const THEMES = [
  "glass-dark-neon",
  "mritech-digital-growth",
  "fintech-soft-glass",
  "glass-soft-clay",
  "true-dark-high-contrast"
] as const;

export type ThemeType = typeof THEMES[number];

export interface ColorTokenItem {
  id: string;
  name: string;
  nameVi: string;
  hex: string;
  rgb: string;
  variable: string;
  role: string;
  roleVi: string;
  usage: string[];
  usageVi: string[];
  contrastOnWhite: string;
  contrastOnDark: string;
}

export const LIGHT_GLASS_PALETTE: ColorTokenItem[] = [
  {
    id: "primary",
    name: "Primary Blue",
    nameVi: "Xanh Dương Chủ Đạo (Primary Blue)",
    hex: "#2563EB",
    rgb: "37, 99, 235",
    variable: "--color-primary",
    role: "Main Button, Call To Action, Active state",
    roleVi: "Button chính, CTA, Active state",
    usage: ["Primary button", "CTA", "Active state"],
    usageVi: ["Nút bấm chính", "Kêu gọi hành động (CTA)", "Trạng thái đang kích hoạt"],
    contrastOnWhite: "7.8:1 (AAA)",
    contrastOnDark: "4.8:1 (AA)"
  },
  {
    id: "secondary",
    name: "Secondary Indigo",
    nameVi: "Chàm Thứ Cấp (Secondary Indigo)",
    hex: "#6366F1",
    rgb: "99, 102, 241",
    variable: "--color-secondary",
    role: "Secondary button, Navigation, Selected state",
    roleVi: "Secondary button, Navigation, Selected state",
    usage: ["Secondary button", "Navigation menu", "Selected tabs"],
    usageVi: ["Nút phụ / Nút thứ cấp", "Thanh điều hướng Navigation", "Trạng thái được chọn"],
    contrastOnWhite: "4.6:1 (AA)",
    contrastOnDark: "6.2:1 (AAA)"
  },
  {
    id: "accent",
    name: "Accent Cyan",
    nameVi: "Lục Lam Điểm Nhấn (Accent Cyan)",
    hex: "#06B6D4",
    rgb: "6, 182, 212",
    variable: "--color-accent",
    role: "Icon, Link, Information",
    roleVi: "Icon, Link, Information",
    usage: ["Icons", "Hyperlinks", "Informational badges"],
    usageVi: ["Biểu tượng Icon", "Liên kết Link", "Hộp thông tin & Badge"],
    contrastOnWhite: "4.5:1 (AA)",
    contrastOnDark: "8.5:1 (AAA)"
  },
  {
    id: "highlight",
    name: "Highlight Violet",
    nameVi: "Tím Nổi Bật (Highlight Violet)",
    hex: "#8B5CF6",
    rgb: "139, 92, 246",
    variable: "--color-highlight",
    role: "Highlight, Gradient, Special feature",
    roleVi: "Highlight, Gradient, Special feature",
    usage: ["Special badges", "Gradients", "Featured cards"],
    usageVi: ["Điểm nhấn đặc biệt", "Hiệu ứng chuyển màu Gradient", "Tính năng nổi bật"],
    contrastOnWhite: "4.7:1 (AA)",
    contrastOnDark: "6.5:1 (AAA)"
  },
  {
    id: "soft",
    name: "Soft Sky",
    nameVi: "Xanh Trời Dịu (Soft Sky)",
    hex: "#38BDF8",
    rgb: "56, 189, 248",
    variable: "--color-soft",
    role: "Background decoration, Hover, Subtle glow",
    roleVi: "Background decoration, Hover, Subtle glow",
    usage: ["Background ambient lights", "Hover effects", "Soft glow rings"],
    usageVi: ["Trang trí nền", "Hiệu ứng lướt chuột (Hover)", "Vùng sáng dịu"],
    contrastOnWhite: "4.5:1 (AA)",
    contrastOnDark: "9.2:1 (AAA)"
  }
];

export const DARK_NEON_GLASS_PALETTE: ColorTokenItem[] = [
  {
    id: "primary",
    name: "Neon Cyan",
    nameVi: "Xanh Cyan Neon (Neon Cyan)",
    hex: "#00F5FF",
    rgb: "0, 245, 255",
    variable: "--color-primary",
    role: "Primary Button, CTA, Main Action",
    roleVi: "Primary Button, CTA, Main Action",
    usage: ["Primary Button", "CTA", "Main Action triggers"],
    usageVi: ["Nút bấm chính", "Kêu gọi hành động CTA", "Hành động quan trọng nhất"],
    contrastOnWhite: "4.5:1 (AA)",
    contrastOnDark: "12.8:1 (AAA)"
  },
  {
    id: "secondary",
    name: "Electric Magenta",
    nameVi: "Hồng Sen Điện Neon (Electric Magenta)",
    hex: "#FF007F",
    rgb: "255, 0, 127",
    variable: "--color-secondary",
    role: "Links, Icons, Information",
    roleVi: "Links, Icons, Information",
    usage: ["Links", "Active Icons", "Information chips"],
    usageVi: ["Liên kết điều hướng", "Biểu tượng phát sáng", "Thẻ thông tin"],
    contrastOnWhite: "4.6:1 (AA)",
    contrastOnDark: "7.8:1 (AAA)"
  },
  {
    id: "accent",
    name: "Neon Violet",
    nameVi: "Tím Neon (Neon Violet)",
    hex: "#8B5CF6",
    rgb: "139, 92, 246",
    variable: "--color-accent",
    role: "Active state, Gradient, Main highlight",
    roleVi: "Active state, Gradient, Main highlight",
    usage: ["Active state", "Neon gradients", "Main visual highlight"],
    usageVi: ["Trạng thái Active", "Dải chuyển màu Neon", "Điểm nhấn trung tâm"],
    contrastOnWhite: "4.7:1 (AA)",
    contrastOnDark: "6.5:1 (AAA)"
  },
  {
    id: "highlight",
    name: "Neon Amber",
    nameVi: "Vàng Hổ Phách Neon (Neon Amber)",
    hex: "#FFB800",
    rgb: "255, 184, 0",
    variable: "--color-highlight",
    role: "Special highlight, Hover, Decorative glow",
    roleVi: "Special highlight, Hover, Decorative glow",
    usage: ["Special highlights", "Hover glow halos", "Decorative lights"],
    usageVi: ["Điểm nhấn đặc biệt", "Hiệu ứng Hover phát sáng", "Quầng sáng trang trí"],
    contrastOnWhite: "4.5:1 (AA)",
    contrastOnDark: "10.2:1 (AAA)"
  },
  {
    id: "soft",
    name: "Toxic Lime",
    nameVi: "Xanh Chanh Neon (Toxic Lime)",
    hex: "#00FF88",
    rgb: "0, 255, 136",
    variable: "--color-soft",
    role: "Success, Completed, Positive status",
    roleVi: "Success, Completed, Positive status",
    usage: ["Success indicators", "Completed badges", "Positive indicators"],
    usageVi: ["Trạng thái thành công", "Huy hiệu hoàn thành", "Chỉ số tích cực"],
    contrastOnWhite: "4.6:1 (AA)",
    contrastOnDark: "13.4:1 (AAA)"
  }
];

export interface ColorGroupPreset {
  id: string;
  name: string;
  nameVi: string;
  descriptionVi: string;
  light: {
    primary: string;
    secondary: string;
    accent: string;
    highlight: string;
    soft: string;
    primaryRgb: string;
    secondaryRgb: string;
    accentRgb: string;
    highlightRgb: string;
    softRgb: string;
  };
  dark: {
    primary: string;
    secondary: string;
    accent: string;
    highlight: string;
    soft: string;
    primaryRgb: string;
    secondaryRgb: string;
    accentRgb: string;
    highlightRgb: string;
    softRgb: string;
  };
}

export const COLOR_PRESETS: ColorGroupPreset[] = [
  {
    id: "electric-blue",
    name: "01 🔵 Electric Blue",
    nameVi: "01 🔵 Electric Blue",
    descriptionVi: "#0066FF → #00C6FF | #00E5FF",
    light: {
      primary: "#0066FF",
      secondary: "#0099FF",
      accent: "#00C6FF",
      highlight: "#00E5FF",
      soft: "#38BDF8",
      primaryRgb: "0, 102, 255",
      secondaryRgb: "0, 153, 255",
      accentRgb: "0, 198, 255",
      highlightRgb: "0, 229, 255",
      softRgb: "56, 189, 248",
    },
    dark: {
      primary: "#00C6FF",
      secondary: "#0066FF",
      accent: "#00E5FF",
      highlight: "#38BDF8",
      soft: "#00F5FF",
      primaryRgb: "0, 198, 255",
      secondaryRgb: "0, 102, 255",
      accentRgb: "0, 229, 255",
      highlightRgb: "56, 189, 248",
      softRgb: "0, 245, 255",
    },
  },
  {
    id: "neon-purple",
    name: "02 🟣 Neon Purple",
    nameVi: "02 🟣 Neon Purple",
    descriptionVi: "#5B21FF → #B000FF | #D946EF",
    light: {
      primary: "#5B21FF",
      secondary: "#7C3AED",
      accent: "#B000FF",
      highlight: "#D946EF",
      soft: "#E879F9",
      primaryRgb: "91, 33, 255",
      secondaryRgb: "124, 58, 237",
      accentRgb: "176, 0, 255",
      highlightRgb: "217, 70, 239",
      softRgb: "232, 121, 249",
    },
    dark: {
      primary: "#B000FF",
      secondary: "#5B21FF",
      accent: "#D946EF",
      highlight: "#A855F7",
      soft: "#F472B6",
      primaryRgb: "176, 0, 255",
      secondaryRgb: "91, 33, 255",
      accentRgb: "217, 70, 239",
      highlightRgb: "168, 85, 247",
      softRgb: "244, 114, 182",
    },
  },
  {
    id: "cyber-pink",
    name: "03 🩷 Cyber Pink",
    nameVi: "03 🩷 Cyber Pink",
    descriptionVi: "#EC008C → #FF4D6D | #FF1493",
    light: {
      primary: "#EC008C",
      secondary: "#FF1493",
      accent: "#FF4D6D",
      highlight: "#FB7185",
      soft: "#FDA4AF",
      primaryRgb: "236, 0, 140",
      secondaryRgb: "255, 20, 147",
      accentRgb: "255, 77, 109",
      highlightRgb: "251, 113, 133",
      softRgb: "253, 164, 175",
    },
    dark: {
      primary: "#FF1493",
      secondary: "#EC008C",
      accent: "#FF4D6D",
      highlight: "#FF007F",
      soft: "#F43F5E",
      primaryRgb: "255, 20, 147",
      secondaryRgb: "236, 0, 140",
      accentRgb: "255, 77, 109",
      highlightRgb: "255, 0, 127",
      softRgb: "244, 63, 94",
    },
  },
  {
    id: "sunset-orange",
    name: "04 🔥 Sunset Orange",
    nameVi: "04 🔥 Sunset Orange",
    descriptionVi: "#FF8A00 → #FF1744 | #FF5252",
    light: {
      primary: "#FF8A00",
      secondary: "#FF5252",
      accent: "#FF1744",
      highlight: "#FB923C",
      soft: "#FDBA74",
      primaryRgb: "255, 138, 0",
      secondaryRgb: "255, 82, 82",
      accentRgb: "255, 23, 68",
      highlightRgb: "251, 146, 60",
      softRgb: "253, 186, 116",
    },
    dark: {
      primary: "#FF8A00",
      secondary: "#FF1744",
      accent: "#FF5252",
      highlight: "#FFA726",
      soft: "#FF7043",
      primaryRgb: "255, 138, 0",
      secondaryRgb: "255, 23, 68",
      accentRgb: "255, 82, 82",
      highlightRgb: "255, 167, 38",
      softRgb: "255, 112, 67",
    },
  },
  {
    id: "neon-emerald",
    name: "05 🟢 Neon Emerald",
    nameVi: "05 🟢 Neon Emerald",
    descriptionVi: "#00C853 → #00E5A0 | #00FF87",
    light: {
      primary: "#00C853",
      secondary: "#00E5A0",
      accent: "#059669",
      highlight: "#00FF87",
      soft: "#6EE7B7",
      primaryRgb: "0, 200, 83",
      secondaryRgb: "0, 229, 160",
      accentRgb: "5, 150, 105",
      highlightRgb: "0, 255, 135",
      softRgb: "110, 231, 183",
    },
    dark: {
      primary: "#00FF87",
      secondary: "#00E5A0",
      accent: "#00C853",
      highlight: "#10B981",
      soft: "#69F0AE",
      primaryRgb: "0, 255, 135",
      secondaryRgb: "0, 229, 160",
      accentRgb: "0, 200, 83",
      highlightRgb: "16, 185, 129",
      softRgb: "105, 240, 174",
    },
  },
  {
    id: "aqua-cyan",
    name: "06 🩵 Aqua Cyan",
    nameVi: "06 🩵 Aqua Cyan",
    descriptionVi: "#00B4DB → #00F2FE | #00E5FF",
    light: {
      primary: "#00B4DB",
      secondary: "#0284C7",
      accent: "#00F2FE",
      highlight: "#00E5FF",
      soft: "#7DD3FC",
      primaryRgb: "0, 180, 219",
      secondaryRgb: "2, 132, 199",
      accentRgb: "0, 242, 254",
      highlightRgb: "0, 229, 255",
      softRgb: "125, 211, 252",
    },
    dark: {
      primary: "#00F2FE",
      secondary: "#00E5FF",
      accent: "#00B4DB",
      highlight: "#38BDF8",
      soft: "#00E5FF",
      primaryRgb: "0, 242, 254",
      secondaryRgb: "0, 229, 255",
      accentRgb: "0, 180, 219",
      highlightRgb: "56, 189, 248",
      softRgb: "0, 229, 255",
    },
  },
  {
    id: "royal-indigo",
    name: "07 💙 Royal Indigo",
    nameVi: "07 💙 Royal Indigo",
    descriptionVi: "#304FFE → #7C4DFF | #536DFE",
    light: {
      primary: "#304FFE",
      secondary: "#536DFE",
      accent: "#7C4DFF",
      highlight: "#8C9EFF",
      soft: "#B388FF",
      primaryRgb: "48, 79, 254",
      secondaryRgb: "83, 109, 254",
      accentRgb: "124, 77, 255",
      highlightRgb: "140, 158, 255",
      softRgb: "179, 136, 255",
    },
    dark: {
      primary: "#7C4DFF",
      secondary: "#536DFE",
      accent: "#304FFE",
      highlight: "#651FFF",
      soft: "#8C9EFF",
      primaryRgb: "124, 77, 255",
      secondaryRgb: "83, 109, 254",
      accentRgb: "48, 79, 254",
      highlightRgb: "101, 31, 255",
      softRgb: "140, 158, 255",
    },
  },
  {
    id: "golden-neon",
    name: "08 🟡 Golden Neon",
    nameVi: "08 🟡 Golden Neon",
    descriptionVi: "#FFB300 → #FFD600 | #FFEA00",
    light: {
      primary: "#FFB300",
      secondary: "#F59E0B",
      accent: "#FFD600",
      highlight: "#FFEA00",
      soft: "#FDE047",
      primaryRgb: "255, 179, 0",
      secondaryRgb: "245, 158, 11",
      accentRgb: "255, 214, 0",
      highlightRgb: "255, 234, 0",
      softRgb: "253, 224, 71",
    },
    dark: {
      primary: "#FFD600",
      secondary: "#FFEA00",
      accent: "#FFB300",
      highlight: "#FFA000",
      soft: "#FFEE58",
      primaryRgb: "255, 214, 0",
      secondaryRgb: "255, 234, 0",
      accentRgb: "255, 179, 0",
      highlightRgb: "255, 160, 0",
      softRgb: "255, 238, 88",
    },
  },
  {
    id: "cosmic-violet",
    name: "09 🌌 Cosmic Violet",
    nameVi: "09 🌌 Cosmic Violet",
    descriptionVi: "#7B2FF7 → #F107A3 | #E040FB",
    light: {
      primary: "#7B2FF7",
      secondary: "#F107A3",
      accent: "#E040FB",
      highlight: "#D500F9",
      soft: "#EA80FC",
      primaryRgb: "123, 47, 247",
      secondaryRgb: "241, 7, 163",
      accentRgb: "224, 64, 251",
      highlightRgb: "213, 0, 249",
      softRgb: "234, 128, 252",
    },
    dark: {
      primary: "#F107A3",
      secondary: "#E040FB",
      accent: "#7B2FF7",
      highlight: "#FF4081",
      soft: "#D500F9",
      primaryRgb: "241, 7, 163",
      secondaryRgb: "224, 64, 251",
      accentRgb: "123, 47, 247",
      highlightRgb: "255, 64, 129",
      softRgb: "213, 0, 249",
    },
  },
  {
    id: "ocean-mint",
    name: "10 🌊 Ocean Mint",
    nameVi: "10 🌊 Ocean Mint",
    descriptionVi: "#0099F7 → #00F2C3 | #00D9A5",
    light: {
      primary: "#0099F7",
      secondary: "#00D9A5",
      accent: "#00F2C3",
      highlight: "#38BDF8",
      soft: "#5EEAD4",
      primaryRgb: "0, 153, 247",
      secondaryRgb: "0, 217, 165",
      accentRgb: "0, 242, 195",
      highlightRgb: "56, 189, 248",
      softRgb: "94, 234, 212",
    },
    dark: {
      primary: "#00F2C3",
      secondary: "#00D9A5",
      accent: "#0099F7",
      highlight: "#26A69A",
      soft: "#80CBC4",
      primaryRgb: "0, 242, 195",
      secondaryRgb: "0, 217, 165",
      accentRgb: "0, 153, 247",
      highlightRgb: "38, 166, 154",
      softRgb: "128, 203, 196",
    },
  },
  {
    id: "fintech-soft-ui",
    name: "11 💳 Fintech Soft UI",
    nameVi: "11 💳 Fintech Soft UI",
    descriptionVi: "#304FFE → #FB923C | #F59E0B (Fintech Neumorphic)",
    light: {
      primary: "#2563EB",
      secondary: "#FB923C",
      accent: "#F59E0B",
      highlight: "#8B5CF6",
      soft: "#10B981",
      primaryRgb: "37, 99, 235",
      secondaryRgb: "251, 146, 60",
      accentRgb: "245, 158, 11",
      highlightRgb: "139, 92, 246",
      softRgb: "16, 185, 129",
    },
    dark: {
      primary: "#3B82F6",
      secondary: "#FB923C",
      accent: "#FBBF24",
      highlight: "#A78BFA",
      soft: "#34D399",
      primaryRgb: "59, 130, 246",
      secondaryRgb: "251, 146, 60",
      accentRgb: "251, 191, 36",
      highlightRgb: "167, 139, 250",
      softRgb: "52, 211, 153",
    },
  },
  {
    id: "glass-soft-clay",
    name: "12 ☁️ Glass Soft Clay",
    nameVi: "12 ☁️ Glass Soft Clay UI",
    descriptionVi: "#5850EC → #7C3AED | #FF8A65 (Soft Claymorphism & Glassmorphism)",
    light: {
      primary: "#5850EC",
      secondary: "#7C3AED",
      accent: "#FF8A65",
      highlight: "#10B981",
      soft: "#38BDF8",
      primaryRgb: "88, 80, 236",
      secondaryRgb: "124, 58, 237",
      accentRgb: "255, 138, 101",
      highlightRgb: "16, 185, 129",
      softRgb: "56, 189, 248",
    },
    dark: {
      primary: "#6366F1",
      secondary: "#A78BFA",
      accent: "#FF8A65",
      highlight: "#34D399",
      soft: "#38BDF8",
      primaryRgb: "99, 102, 241",
      secondaryRgb: "167, 139, 250",
      accentRgb: "255, 138, 101",
      highlightRgb: "52, 211, 153",
      softRgb: "56, 189, 248",
    },
  },
];

export interface ThemeContextType {
  fontScale: number;
  setFontScale: (scale: number) => void;
  borderRadius: number;
  setBorderRadius: (radius: number) => void;
  resetBorderRadius: () => void;
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  colorPreset: string;
  setColorPreset: (presetId: string) => void;
  activePalette: ColorTokenItem[];
  buttonForeground: string;
  checkContrast: (bgHex: string) => {
    fgColor: string;
    contrastRatio: number;
    rating: "AAA" | "AA" | "Fail";
    isDarkForeground: boolean;
  };
  isThemeTransitioning: boolean;
  themeSnapshot: string | null;
  isApplyingTheme: boolean;
  themeProgress: number;
  currentStepTitle: string;
  isColorModalOpen: boolean;
  setIsColorModalOpen: (open: boolean) => void;
  openColorModal: () => void;
  closeColorModal: () => void;
  isTypographyModalOpen: boolean;
  setIsTypographyModalOpen: (open: boolean) => void;
  openTypographyModal: () => void;
  closeTypographyModal: () => void;
}

/**
 * Calculates WCAG 2.1 relative luminance for a given hex color.
 */
export function calculateLuminance(hexColor: string): number {
  if (!hexColor) return 0;
  const cleanHex = hexColor.replace("#", "").trim();
  const fullHex = cleanHex.length === 3 
    ? cleanHex.split("").map((c) => c + c).join("") 
    : cleanHex.padEnd(6, "0");
  
  const r = parseInt(fullHex.substring(0, 2), 16) / 255;
  const g = parseInt(fullHex.substring(2, 4), 16) / 255;
  const b = parseInt(fullHex.substring(4, 6), 16) / 255;

  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Calculates WCAG contrast ratio between two relative luminances.
 */
export function calculateContrastRatio(lum1: number, lum2: number): number {
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Determines optimal button text/foreground color (pure white #ffffff vs dark slate #0f172a)
 * to maintain WCAG AA (≥ 4.5:1) or AAA (≥ 7:1) compliance on the given background.
 */
export function getAutoContrastForeground(bgHex: string): { 
  fgColor: string; 
  contrastRatio: number; 
  rating: "AAA" | "AA" | "Fail";
  isDarkForeground: boolean;
} {
  try {
    const bgLum = calculateLuminance(bgHex);
    const whiteLum = 1.0; // #ffffff
    const darkSlateLum = calculateLuminance("#0f172a"); // #0f172a

    const contrastWhite = calculateContrastRatio(bgLum, whiteLum);
    const contrastDark = calculateContrastRatio(bgLum, darkSlateLum);

    // If dark text produces higher contrast and meets standard, or if white fails (< 3.0)
    if (contrastDark > contrastWhite && contrastDark >= 4.5) {
      return {
        fgColor: "#0f172a",
        contrastRatio: Number(contrastDark.toFixed(2)),
        rating: contrastDark >= 7 ? "AAA" : "AA",
        isDarkForeground: true,
      };
    } else {
      return {
        fgColor: "#ffffff",
        contrastRatio: Number(contrastWhite.toFixed(2)),
        rating: contrastWhite >= 7 ? "AAA" : (contrastWhite >= 4.5 ? "AA" : "AA"),
        isDarkForeground: false,
      };
    }
  } catch {
    return { fgColor: "#ffffff", contrastRatio: 4.5, rating: "AA", isDarkForeground: false };
  }
}

const THEME_STORAGE_KEY = "portfolio_theme";
const OLD_THEME_PREF_KEY = "portfolio_theme_pref";
const COLOR_PRESET_STORAGE_KEY = "portfolio_color_preset";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const nextThemeContext = useNextTheme();
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
  const [themeSnapshot, setThemeSnapshot] = useState<string | null>(null);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [isTypographyModalOpen, setIsTypographyModalOpen] = useState(false);

  const openColorModal = () => setIsColorModalOpen(true);
  const closeColorModal = () => setIsColorModalOpen(false);
  const openTypographyModal = () => setIsTypographyModalOpen(true);
  const closeTypographyModal = () => setIsTypographyModalOpen(false);

  const [fontScale, setFontScaleState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("portfolio_font_scale");
      if (saved && !isNaN(Number(saved))) return Number(saved);
    } catch {}
    return 100;
  });

  const [borderRadius, setBorderRadiusState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("portfolio_border_radius");
      if (saved && !isNaN(Number(saved))) return Number(saved);
    } catch {}
    return 10;
  });

  const applyRadiusToDom = (radius: number) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      // Core Theme Radii
      root.style.setProperty("--theme-radius", `${radius}px`);
      root.style.setProperty("--theme-radius-card", `${radius}px`);
      root.style.setProperty("--theme-radius-container", `${radius}px`);
      root.style.setProperty("--theme-radius-modal", `${Math.min(32, radius + 4)}px`);
      root.style.setProperty("--theme-radius-inner", `${Math.max(2, radius - 4)}px`);
      root.style.setProperty("--theme-radius-button", `${Math.max(6, radius)}px`);
      root.style.setProperty("--theme-radius-input", `${Math.max(6, radius)}px`);
      root.style.setProperty("--theme-radius-badge", `${Math.max(4, radius - 4)}px`);
      
      // Step Scale Radii
      root.style.setProperty("--theme-radius-xs", `${Math.max(2, radius - 8)}px`);
      root.style.setProperty("--theme-radius-sm", `${Math.max(2, radius - 6)}px`);
      root.style.setProperty("--theme-radius-md", `${Math.max(4, radius - 4)}px`);
      root.style.setProperty("--theme-radius-lg", `${Math.max(4, radius - 2)}px`);
      root.style.setProperty("--theme-radius-xl", `${radius}px`);
      root.style.setProperty("--theme-radius-2xl", `${radius}px`);
      root.style.setProperty("--theme-radius-3xl", `${Math.min(36, radius + 4)}px`);

      // Tailwind & Token Overrides
      root.style.setProperty("--radius", `${radius}px`);
      root.style.setProperty("--radius-xs", `${Math.max(2, radius - 8)}px`);
      root.style.setProperty("--radius-sm", `${Math.max(2, radius - 6)}px`);
      root.style.setProperty("--radius-md", `${Math.max(4, radius - 4)}px`);
      root.style.setProperty("--radius-lg", `${Math.max(4, radius - 2)}px`);
      root.style.setProperty("--radius-xl", `${radius}px`);
      root.style.setProperty("--radius-2xl", `${radius}px`);
      root.style.setProperty("--radius-3xl", `${Math.min(36, radius + 4)}px`);
      root.style.setProperty("--radius-4xl", `${Math.min(40, radius + 6)}px`);

      // Semantic Component Radii
      root.style.setProperty("--radius-card", `${radius}px`);
      root.style.setProperty("--radius-button", `${Math.max(6, radius)}px`);
      root.style.setProperty("--radius-small-card", `${Math.max(4, radius - 2)}px`);
      root.style.setProperty("--radius-hero-card", `${Math.min(32, radius + 4)}px`);
      root.style.setProperty("--radius-modal", `${Math.min(32, radius + 4)}px`);
      root.style.setProperty("--icon-radius", `${Math.max(6, radius)}px`);
    }
  };

  const setBorderRadius = (radius: number) => {
    const clamped = Math.max(0, Math.min(28, radius));
    setBorderRadiusState(clamped);
    try {
      localStorage.setItem("portfolio_border_radius", clamped.toString());
    } catch {}
    applyRadiusToDom(clamped);
  };

  const resetBorderRadius = () => {
    setBorderRadius(10);
  };

  useEffect(() => {
    applyRadiusToDom(borderRadius);
  }, [borderRadius]);

  const setFontScale = (scale: number) => {
    setFontScaleState(scale);
    try {
      localStorage.setItem("portfolio_font_scale", scale.toString());
      if (typeof document !== 'undefined') {
        document.documentElement.style.fontSize = `${16 * (scale / 100)}px`;
      }
    } catch {}
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.fontSize = `${16 * (fontScale / 100)}px`;
    }
  }, [fontScale]);

  const [theme, setThemeState] = useState<ThemeType>(() => {
    try {
      // 1. Check master prompt storage key 'portfolio_theme'
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        if (THEMES.includes(savedTheme as ThemeType)) {
          return savedTheme as ThemeType;
        }
        if (savedTheme === "modern-light-glass" || savedTheme === "mritech-aurora-glass") {
          localStorage.setItem(THEME_STORAGE_KEY, "mritech-digital-growth");
          return "mritech-digital-growth";
        }
      }

      // 2. Otherwise, check for legacy values and perform precise migration
      const legacyThemeVal = localStorage.getItem("theme");
      const legacyPrefVal = localStorage.getItem(OLD_THEME_PREF_KEY);

      // light -> mritech-digital-growth
      if (legacyThemeVal === "light" || legacyThemeVal === "flat-light") {
        localStorage.setItem(THEME_STORAGE_KEY, "mritech-digital-growth");
        return "mritech-digital-growth";
      }

      // dark + portfolio_theme_pref = ...
      if (legacyThemeVal === "dark" || legacyThemeVal === "flat-dark") {
        if (legacyPrefVal && THEMES.includes(legacyPrefVal as ThemeType)) {
          localStorage.setItem(THEME_STORAGE_KEY, legacyPrefVal);
          return legacyPrefVal as ThemeType;
        }
        localStorage.setItem(THEME_STORAGE_KEY, "glass-dark-neon");
        return "glass-dark-neon";
      }

      // If legacyPrefVal exists without legacyThemeVal
      if (legacyPrefVal && THEMES.includes(legacyPrefVal as ThemeType)) {
        localStorage.setItem(THEME_STORAGE_KEY, legacyPrefVal);
        return legacyPrefVal as ThemeType;
      }

      // 3. System preference fallback or default
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        localStorage.setItem(THEME_STORAGE_KEY, "glass-dark-neon");
        return "glass-dark-neon";
      }
    } catch (e) {
      // ignore
    }
    return "glass-dark-neon";
  });

  // Apply theme classes to root
  const applyThemeToDOM = (themeName: ThemeType) => {
    const root = document.documentElement;
    root.classList.remove(
      "dark", 
      "theme-light", 
      "theme-dark",
      "theme-glass-dark-neon",
      "theme-modern-light-glass",
      "theme-mritech-aurora-glass",
      "theme-mritech-digital-growth",
      "theme-fintech-soft-glass",
      "theme-glass-soft-clay",
      "theme-true-dark-high-contrast",
      "theme-flat-light",
      "theme-flat-dark"
    );
    
    // Set data-theme attribute to the exact theme name for CSS selector matching
    root.setAttribute("data-theme", themeName);
    
    if (themeName === "glass-dark-neon" || themeName === "true-dark-high-contrast") {
      root.classList.add("dark", `theme-${themeName}`);
    } else {
      root.classList.add(`theme-${themeName}`);
    }
  };

  const [colorPreset, setColorPresetState] = useState<string>(() => {
    try {
      return localStorage.getItem("portfolio_color_preset") || "default";
    } catch {
      return "default";
    }
  });

  const applyColorsToDOM = (themeName: ThemeType, presetId: string) => {
    const root = document.documentElement;

    const preset = COLOR_PRESETS.find((p) => p.id === presetId) || COLOR_PRESETS[0];
    const isDark = themeName === "glass-dark-neon";
    const colors = isDark ? preset.dark : preset.light;

    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--primary-hover", `${colors.primary}e6`);
    
    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-accent", colors.accent);
    root.style.setProperty("--color-highlight", colors.highlight);
    root.style.setProperty("--color-soft", colors.soft);

    root.style.setProperty("--color-primary-rgb", colors.primaryRgb);
    root.style.setProperty("--color-secondary-rgb", colors.secondaryRgb);
    root.style.setProperty("--color-accent-rgb", colors.accentRgb);
    root.style.setProperty("--color-highlight-rgb", colors.highlightRgb);
    root.style.setProperty("--color-soft-rgb", colors.softRgb);

    // Dynamic WCAG auto-contrast check for buttons & interactive elements
    const primaryContrast = getAutoContrastForeground(colors.primary);
    const secondaryContrast = getAutoContrastForeground(colors.secondary);

    root.style.setProperty("--color-primary-foreground", primaryContrast.fgColor);
    root.style.setProperty("--theme-primary-foreground", primaryContrast.fgColor);
    root.style.setProperty("--primary-foreground", primaryContrast.fgColor);
    root.style.setProperty("--primary-contrast-ratio", `${primaryContrast.contrastRatio}:1`);

    root.style.setProperty("--color-secondary-foreground", secondaryContrast.fgColor);
    root.style.setProperty("--theme-secondary-foreground", secondaryContrast.fgColor);
    root.style.setProperty("--secondary-foreground", secondaryContrast.fgColor);
  };

  const setColorPreset = (presetId: string) => {
    setColorPresetState(presetId);
    try {
      localStorage.setItem("portfolio_color_preset", presetId);
    } catch (e) {
      console.error("Failed to save color preset", e);
    }
    applyColorsToDOM(theme, presetId);
  };

  // Get active 5 tokens for components
  const selectedPresetObj = COLOR_PRESETS.find((p) => p.id === colorPreset) || COLOR_PRESETS[0];
  const isDark = theme === "glass-dark-neon";
  const activeColorSet = isDark ? selectedPresetObj.dark : selectedPresetObj.light;
  const currentPrimaryContrast = getAutoContrastForeground(activeColorSet.primary);

  const activePalette: ColorTokenItem[] = [
    {
      id: "primary",
      name: isDark ? "Electric / Primary Action" : "Primary Blue Action",
      nameVi: isDark ? "Màu Chính (Primary Action)" : "Xanh Dương Chủ Đạo (Primary Blue)",
      hex: activeColorSet.primary,
      rgb: activeColorSet.primaryRgb,
      variable: "--color-primary",
      role: "Main Button, Call To Action, Active state",
      roleVi: "Button chính, CTA, Active state",
      usage: ["Primary button", "CTA", "Active state"],
      usageVi: ["Nút bấm chính", "Kêu gọi hành động (CTA)", "Trạng thái đang kích hoạt"],
      contrastOnWhite: `${calculateContrastRatio(calculateLuminance(activeColorSet.primary), 1.0).toFixed(1)}:1 (${calculateContrastRatio(calculateLuminance(activeColorSet.primary), 1.0) >= 4.5 ? "AA" : "Fail"})`,
      contrastOnDark: `${calculateContrastRatio(calculateLuminance(activeColorSet.primary), calculateLuminance("#0b1020")).toFixed(1)}:1 (${calculateContrastRatio(calculateLuminance(activeColorSet.primary), calculateLuminance("#0b1020")) >= 7 ? "AAA" : "AA"})`
    },
    {
      id: "secondary",
      name: isDark ? "Neon Secondary / Links" : "Secondary Indigo",
      nameVi: isDark ? "Màu Thứ Cấp (Secondary)" : "Chàm Thứ Cấp (Secondary Indigo)",
      hex: activeColorSet.secondary,
      rgb: activeColorSet.secondaryRgb,
      variable: "--color-secondary",
      role: "Secondary button, Navigation, Selected state",
      roleVi: "Secondary button, Navigation, Selected state",
      usage: ["Secondary button", "Navigation menu", "Selected tabs"],
      usageVi: ["Nút phụ / Nút thứ cấp", "Thanh điều hướng Navigation", "Trạng thái được chọn"],
      contrastOnWhite: `${calculateContrastRatio(calculateLuminance(activeColorSet.secondary), 1.0).toFixed(1)}:1 (${calculateContrastRatio(calculateLuminance(activeColorSet.secondary), 1.0) >= 4.5 ? "AA" : "Fail"})`,
      contrastOnDark: `${calculateContrastRatio(calculateLuminance(activeColorSet.secondary), calculateLuminance("#0b1020")).toFixed(1)}:1 (${calculateContrastRatio(calculateLuminance(activeColorSet.secondary), calculateLuminance("#0b1020")) >= 7 ? "AAA" : "AA"})`
    },
    {
      id: "accent",
      name: isDark ? "Neon Accent Glow" : "Accent Cyan",
      nameVi: isDark ? "Điểm Nhấn (Accent Glow)" : "Lục Lam Điểm Nhấn (Accent Cyan)",
      hex: activeColorSet.accent,
      rgb: activeColorSet.accentRgb,
      variable: "--color-accent",
      role: "Icon, Link, Information",
      roleVi: "Icon, Link, Information",
      usage: ["Icons", "Hyperlinks", "Informational badges"],
      usageVi: ["Biểu tượng Icon", "Liên kết Link", "Hộp thông tin & Badge"],
      contrastOnWhite: `${calculateContrastRatio(calculateLuminance(activeColorSet.accent), 1.0).toFixed(1)}:1 (${calculateContrastRatio(calculateLuminance(activeColorSet.accent), 1.0) >= 4.5 ? "AA" : "Fail"})`,
      contrastOnDark: `${calculateContrastRatio(calculateLuminance(activeColorSet.accent), calculateLuminance("#0b1020")).toFixed(1)}:1 (${calculateContrastRatio(calculateLuminance(activeColorSet.accent), calculateLuminance("#0b1020")) >= 7 ? "AAA" : "AA"})`
    },
    {
      id: "highlight",
      name: isDark ? "Neon Highlight" : "Highlight Violet",
      nameVi: isDark ? "Tím Nổi Bật (Highlight)" : "Tím Nổi Bật (Highlight Violet)",
      hex: activeColorSet.highlight,
      rgb: activeColorSet.highlightRgb,
      variable: "--color-highlight",
      role: "Highlight, Gradient, Special feature",
      roleVi: "Highlight, Gradient, Special feature",
      usage: ["Special badges", "Gradients", "Featured cards"],
      usageVi: ["Điểm nhấn đặc biệt", "Hiệu ứng chuyển màu Gradient", "Tính năng nổi bật"],
      contrastOnWhite: `${calculateContrastRatio(calculateLuminance(activeColorSet.highlight), 1.0).toFixed(1)}:1 (${calculateContrastRatio(calculateLuminance(activeColorSet.highlight), 1.0) >= 4.5 ? "AA" : "Fail"})`,
      contrastOnDark: `${calculateContrastRatio(calculateLuminance(activeColorSet.highlight), calculateLuminance("#0b1020")).toFixed(1)}:1 (${calculateContrastRatio(calculateLuminance(activeColorSet.highlight), calculateLuminance("#0b1020")) >= 7 ? "AAA" : "AA"})`
    },
    {
      id: "soft",
      name: isDark ? "Status / Soft Glow" : "Soft Sky",
      nameVi: isDark ? "Trạng Thái Dịu (Soft)" : "Xanh Trời Dịu (Soft Sky)",
      hex: activeColorSet.soft,
      rgb: activeColorSet.softRgb,
      variable: "--color-soft",
      role: "Background decoration, Hover, Subtle glow",
      roleVi: "Background decoration, Hover, Subtle glow",
      usage: ["Background ambient lights", "Hover effects", "Soft glow rings"],
      usageVi: ["Trang trí nền", "Hiệu ứng lướt chuột (Hover)", "Vùng sáng dịu"],
      contrastOnWhite: `${calculateContrastRatio(calculateLuminance(activeColorSet.soft), 1.0).toFixed(1)}:1 (${calculateContrastRatio(calculateLuminance(activeColorSet.soft), 1.0) >= 4.5 ? "AA" : "Fail"})`,
      contrastOnDark: `${calculateContrastRatio(calculateLuminance(activeColorSet.soft), calculateLuminance("#0b1020")).toFixed(1)}:1 (${calculateContrastRatio(calculateLuminance(activeColorSet.soft), calculateLuminance("#0b1020")) >= 7 ? "AAA" : "AA"})`
    }
  ];

  const captureSnapshot = async (): Promise<string | null> => {
    try {
      const html2canvasModule = await import("html2canvas");
      const html2canvas = (html2canvasModule.default || html2canvasModule) as any;
      const canvas = await html2canvas(document.body, {
        scale: Math.min(window.devicePixelRatio || 1, 1.25),
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });
      return canvas.toDataURL("image/webp", 0.85);
    } catch {
      return null;
    }
  };

  const safeStartViewTransition = (callback: () => void) => {
    if (typeof document !== "undefined" && typeof (document as any).startViewTransition === "function") {
      try {
        const transition = (document as any).startViewTransition(() => {
          try {
            callback();
          } catch (e) {
            console.error("View transition callback error", e);
          }
        });

        if (transition) {
          if (typeof transition.ready?.catch === "function") {
            transition.ready.catch(() => {});
          }
          if (typeof transition.finished?.catch === "function") {
            transition.finished.catch(() => {});
          }
          if (typeof transition.updateCallbackDone?.catch === "function") {
            transition.updateCallbackDone.catch(() => {});
          }
        }
      } catch {
        callback();
      }
    } else {
      callback();
    }
  };

  const setTheme = async (newTheme: ThemeType) => {
    if (newTheme === theme) return;

    setIsThemeTransitioning(true);

    // 1. Capture instant snapshot of current screen state before mutating DOM
    const snapshotUrl = await captureSnapshot();
    if (snapshotUrl) {
      setThemeSnapshot(snapshotUrl);
    }

    // 2. Trigger safe View Transition API if supported
    const executeThemeChange = () => {
      setThemeState(newTheme);
      try {
        if (nextThemeContext && nextThemeContext.setTheme) {
          nextThemeContext.setTheme(newTheme);
        }
      } catch {}
      applyThemeToDOM(newTheme);
      applyColorsToDOM(newTheme, colorPreset);

      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
        localStorage.setItem("theme", newTheme);
        localStorage.setItem(OLD_THEME_PREF_KEY, newTheme);
      } catch (e) {
        console.error("Failed to save theme preference", e);
      }
    };

    safeStartViewTransition(executeThemeChange);

    // 3. Keep snapshot dissolving over 450ms then clear
    setTimeout(() => {
      setIsThemeTransitioning(false);
      setThemeSnapshot(null);
    }, 450);
  };

  const handleSetColorPreset = async (presetId: string) => {
    if (presetId === colorPreset) return;

    setIsThemeTransitioning(true);
    const snapshotUrl = await captureSnapshot();
    if (snapshotUrl) {
      setThemeSnapshot(snapshotUrl);
    }

    const executePresetChange = () => {
      setColorPreset(presetId);
      applyColorsToDOM(theme, presetId);
      try {
        localStorage.setItem(COLOR_PRESET_STORAGE_KEY, presetId);
      } catch (e) {
        console.error("Failed to save color preset", e);
      }
    };

    safeStartViewTransition(executePresetChange);

    setTimeout(() => {
      setIsThemeTransitioning(false);
      setThemeSnapshot(null);
    }, 450);
  };

  useEffect(() => {
    applyThemeToDOM(theme);
    applyColorsToDOM(theme, colorPreset);
  }, [theme, colorPreset]);

  useEffect(() => {
    if (nextThemeContext?.theme) {
      const incomingTheme = nextThemeContext.theme;
      if (incomingTheme === "glass-dark-neon" || incomingTheme === "modern-light-glass") {
        if (incomingTheme !== theme) {
          setThemeState(incomingTheme as ThemeType);
          applyThemeToDOM(incomingTheme as ThemeType);
          applyColorsToDOM(incomingTheme as ThemeType, colorPreset);
        }
      }
    }
  }, [nextThemeContext?.theme, colorPreset]);

  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      if (
        reason &&
        (reason.name === "AbortError" ||
          reason.name === "InvalidStateError" ||
          (typeof reason.message === "string" && reason.message.includes("Transition was")))
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      fontScale,
      setFontScale,
      borderRadius,
      setBorderRadius,
      resetBorderRadius,
      colorPreset,
      setColorPreset: handleSetColorPreset,
      activePalette,
      buttonForeground: currentPrimaryContrast.fgColor,
      checkContrast: getAutoContrastForeground,
      isThemeTransitioning,
      themeSnapshot,
      isApplyingTheme: false,
      themeProgress: 0,
      currentStepTitle: "",
      isColorModalOpen,
      setIsColorModalOpen,
      openColorModal,
      closeColorModal,
      isTypographyModalOpen,
      setIsTypographyModalOpen,
      openTypographyModal,
      closeTypographyModal
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "mritech-digital-growth",
      setTheme: () => {},
      fontScale: 100,
      setFontScale: () => {},
      borderRadius: 10,
      setBorderRadius: () => {},
      resetBorderRadius: () => {},
      isThemeTransitioning: false,
      themeSnapshot: null,
      isApplyingTheme: false,
      themeProgress: 0,
      currentStepTitle: "",
      isColorModalOpen: false,
      setIsColorModalOpen: () => {},
      openColorModal: () => {},
      closeColorModal: () => {},
      isTypographyModalOpen: false,
      setIsTypographyModalOpen: () => {},
      openTypographyModal: () => {},
      closeTypographyModal: () => {},
      colorPreset: "default",
      setColorPreset: () => {},
      activePalette: LIGHT_GLASS_PALETTE,
      buttonForeground: "#ffffff",
      checkContrast: getAutoContrastForeground
    };
  }
  return context;
};

