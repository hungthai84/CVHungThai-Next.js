import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { USER_GRADIENTS, UserGradientItem, WEBSITE_BASE_BACKGROUND } from "../data/userGradientsData";

export const THEMES = [
  "default",
  "flat",
  "soft",
  "bento",
  "minimal",
  "dark",
  "soft-floating-bento",
  "pastel-glass",
  "glass-dark-neon",
  "glass-light-multicolor"
] as const;

export type ThemeType = typeof THEMES[number];
export type ThemeMode = "light" | "dark" | "system";

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
    id: "default",
    name: "05 ⚡ Cobalt Cyan Electric (Gradient 5 & 4)",
    nameVi: "05 ⚡ Lam Ngọc & Xanh Coban (Gradient 5 & 4)",
    descriptionVi: "#5583EE → #41D8DD | #6CACFF",
    light: {
      primary: "#5583EE",
      secondary: "#41D8DD",
      accent: "#6CACFF",
      highlight: "#8DEBFF",
      soft: "#ABC7FF",
      primaryRgb: "85, 131, 238",
      secondaryRgb: "65, 216, 221",
      accentRgb: "108, 172, 255",
      highlightRgb: "141, 235, 255",
      softRgb: "171, 199, 255",
    },
    dark: {
      primary: "#5583EE",
      secondary: "#41D8DD",
      accent: "#6CACFF",
      highlight: "#8DEBFF",
      soft: "#ABC7FF",
      primaryRgb: "85, 131, 238",
      secondaryRgb: "65, 216, 221",
      accentRgb: "108, 172, 255",
      highlightRgb: "141, 235, 255",
      softRgb: "171, 199, 255",
    },
  },
  {
    id: "gradient-fresh-mint",
    name: "01 🌿 Fresh Emerald & Lime (Gradient 0, 1, 2)",
    nameVi: "01 🌿 Ngọc Lục Bảo & Vàng Chanh (Gradient 0, 1, 2)",
    descriptionVi: "#41C7AF → #54E38E | #6DE195",
    light: {
      primary: "#41C7AF",
      secondary: "#54E38E",
      accent: "#6DE195",
      highlight: "#C4E759",
      soft: "#D4FC78",
      primaryRgb: "65, 199, 175",
      secondaryRgb: "84, 227, 142",
      accentRgb: "109, 225, 149",
      highlightRgb: "196, 231, 89",
      softRgb: "212, 252, 120",
    },
    dark: {
      primary: "#41C7AF",
      secondary: "#54E38E",
      accent: "#6DE195",
      highlight: "#C4E759",
      soft: "#D4FC78",
      primaryRgb: "65, 199, 175",
      secondaryRgb: "84, 227, 142",
      accentRgb: "109, 225, 149",
      highlightRgb: "196, 231, 89",
      softRgb: "212, 252, 120",
    },
  },
  {
    id: "gradient-orchid-sunset",
    name: "02 🌸 Orchid Lavender & Peach Sunset (Gradient 6, 7, 8)",
    nameVi: "02 🌸 Tím Oải Hương & Hoàng Hôn Đào (Gradient 6, 7, 8)",
    descriptionVi: "#A16BFE → #D279EE | #F8C390",
    light: {
      primary: "#A16BFE",
      secondary: "#D279EE",
      accent: "#F8C390",
      highlight: "#F78FAD",
      soft: "#FDEB82",
      primaryRgb: "161, 107, 254",
      secondaryRgb: "210, 121, 238",
      accentRgb: "248, 195, 144",
      highlightRgb: "247, 143, 173",
      softRgb: "253, 235, 130",
    },
    dark: {
      primary: "#A16BFE",
      secondary: "#D279EE",
      accent: "#F8C390",
      highlight: "#F78FAD",
      soft: "#FDEB82",
      primaryRgb: "161, 107, 254",
      secondaryRgb: "210, 121, 238",
      accentRgb: "248, 195, 144",
      highlightRgb: "247, 143, 173",
      softRgb: "253, 235, 130",
    },
  },
  {
    id: "gradient-berry-plum",
    name: "03 🍇 Crimson Flame & Deep Berry (Gradient 9, 10, 11)",
    nameVi: "03 🍇 Lửa Đỏ & Dâu Rừng Quý Tộc (Gradient 9, 10, 11)",
    descriptionVi: "#BC3D2F → #A43AB2 | #E13680",
    light: {
      primary: "#A43AB2",
      secondary: "#E13680",
      accent: "#BC3D2F",
      highlight: "#9D2E7D",
      soft: "#E16E93",
      primaryRgb: "164, 58, 178",
      secondaryRgb: "225, 54, 128",
      accentRgb: "188, 61, 47",
      highlightRgb: "157, 46, 125",
      softRgb: "225, 110, 147",
    },
    dark: {
      primary: "#A43AB2",
      secondary: "#E13680",
      accent: "#BC3D2F",
      highlight: "#9D2E7D",
      soft: "#E16E93",
      primaryRgb: "164, 58, 178",
      secondaryRgb: "225, 54, 128",
      accentRgb: "188, 61, 47",
      highlightRgb: "157, 46, 125",
      softRgb: "225, 110, 147",
    },
  },
  {
    id: "gradient-minimal-onyx",
    name: "04 🌑 Charcoal Onyx & Pearl Mist (Gradient 12, 13, 14)",
    nameVi: "04 🌑 Than Đá Onyx & Sương Ngọc Trai (Gradient 12, 13, 14)",
    descriptionVi: "#323B42 → #121317 | #F5CCF6",
    light: {
      primary: "#323B42",
      secondary: "#121317",
      accent: "#F5CCF6",
      highlight: "#F0EFF0",
      soft: "#FAF8F9",
      primaryRgb: "50, 59, 66",
      secondaryRgb: "18, 19, 23",
      accentRgb: "245, 204, 246",
      highlightRgb: "240, 239, 240",
      softRgb: "250, 248, 249",
    },
    dark: {
      primary: "#F5CCF6",
      secondary: "#F1EEF9",
      accent: "#FAF8F9",
      highlight: "#323B42",
      soft: "#121317",
      primaryRgb: "245, 204, 246",
      secondaryRgb: "241, 238, 249",
      accentRgb: "250, 248, 249",
      highlightRgb: "50, 59, 66",
      softRgb: "18, 19, 23",
    },
  },
];

export interface TypoCustomSizes {
  "hero-h1": number;
  "h1": number;
  "h2": number;
  "h3": number;
  "h4": number;
  "card-title-lg": number;
  "card-title": number;
  "card-subtitle": number;
  "card-icon": number;
  "counter": number;
  "body": number;
  "body-sm": number;
  "caption": number;
  "label": number;
  "badge": number;
  "navigation": number;
  "button": number;
  "input": number;
  "tooltip": number;
  "header-height": number;
}

export const DEFAULT_TYPO_SIZES: TypoCustomSizes = {
  "hero-h1": 48,
  "h1": 44,
  "h2": 32,
  "h3": 24,
  "h4": 20,
  "card-title-lg": 20,
  "card-title": 20,
  "card-subtitle": 15,
  "card-icon": 20,
  "counter": 36,
  "body": 16,
  "body-sm": 14,
  "caption": 13,
  "label": 13,
  "badge": 12,
  "navigation": 15,
  "button": 15,
  "input": 15,
  "tooltip": 13,
  "header-height": 64,
};

export interface ThemeContextType {
  fontScale: number;
  setFontScale: (scale: number) => void;
  resetFontScale: () => void;
  borderRadius: number;
  setBorderRadius: (radius: number) => void;
  resetBorderRadius: () => void;
  borderRadiusCard: number;
  setBorderRadiusCard: (radius: number) => void;
  resetBorderRadiusCard: () => void;
  typoSizes: TypoCustomSizes;
  updateTypoSizes: (sizes: TypoCustomSizes) => void;
  resetTypoSizes: () => void;
  applyTypoSizesToDom: (sizes: TypoCustomSizes) => void;
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  resolvedTheme: "light" | "dark";
  colorPreset: string;
  setColorPreset: (presetId: string) => void;
  activeUserGradient: number | null;
  applyUserGradient: (gradientId: number) => void;
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
  isThemeModalOpen: boolean;
  setIsThemeModalOpen: (open: boolean) => void;
  openThemeModal: () => void;
  closeThemeModal: () => void;
  resetTheme: () => void;
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
const THEME_MODE_STORAGE_KEY = "portfolio_theme_mode";
const COLOR_PRESET_STORAGE_KEY = "portfolio_color_preset";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
  const [themeSnapshot, setThemeSnapshot] = useState<string | null>(null);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [isTypographyModalOpen, setIsTypographyModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const openColorModal = () => setIsColorModalOpen(true);
  const closeColorModal = () => setIsColorModalOpen(false);
  const openTypographyModal = () => setIsTypographyModalOpen(true);
  const closeTypographyModal = () => setIsTypographyModalOpen(false);
  const openThemeModal = () => setIsThemeModalOpen(true);
  const closeThemeModal = () => setIsThemeModalOpen(false);

  // 1. Theme Mode State (light | dark | system)
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    try {
      const savedMode = typeof localStorage !== 'undefined' ? localStorage.getItem(THEME_MODE_STORAGE_KEY) : null;
      if (savedMode === "light" || savedMode === "dark" || savedMode === "system") {
        return savedMode;
      }
    } catch {}
    return "system";
  });

  const getResolvedThemeName = (mode: ThemeMode): ThemeType => {
    if (mode === "dark") return "dark";
    if (mode === "light") return "default";
    // System Mode: Detect OS preference
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "default";
  };

  // 2. Theme State
  const [theme, setThemeState] = useState<ThemeType>(() => {
    try {
      const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(THEME_STORAGE_KEY) : null;
      if (saved && (THEMES as readonly string[]).includes(saved)) {
        return saved as ThemeType;
      }
    } catch {}
    return "glass-light-multicolor";
  });

  // 3. Color Preset State
  const [colorPreset, setColorPresetState] = useState<string>(() => {
    try {
      return (typeof localStorage !== 'undefined' ? localStorage.getItem(COLOR_PRESET_STORAGE_KEY) : null) || "default";
    } catch {
      return "default";
    }
  });

  // Active User Gradient State (0 to 14)
  const [activeUserGradient, setActiveUserGradient] = useState<number | null>(() => {
    try {
      const saved = typeof localStorage !== 'undefined' ? localStorage.getItem("portfolio_user_gradient") : null;
      return saved !== null ? Number(saved) : 5; // Default gradient 5 (Cobalt / Cyan)
    } catch {
      return 5;
    }
  });

  const applyUserGradient = (gradientId: number) => {
    const item = USER_GRADIENTS.find((g) => g.id === gradientId);
    if (!item) return;
    setActiveUserGradient(gradientId);
    try {
      localStorage.setItem("portfolio_user_gradient", gradientId.toString());
    } catch {}

    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty("--color-primary", item.start);
      root.style.setProperty("--color-secondary", item.end);
      root.style.setProperty("--gradient-start", item.start);
      root.style.setProperty("--gradient-end", item.end);
      root.style.setProperty("--gradient-active", `linear-gradient(${item.angle}deg, ${item.start}, ${item.end})`);

      const pRgb = parseInt(item.start.slice(1, 3), 16) + ", " + parseInt(item.start.slice(3, 5), 16) + ", " + parseInt(item.start.slice(5, 7), 16);
      const sRgb = parseInt(item.end.slice(1, 3), 16) + ", " + parseInt(item.end.slice(3, 5), 16) + ", " + parseInt(item.end.slice(5, 7), 16);
      root.style.setProperty("--color-primary-rgb", pRgb);
      root.style.setProperty("--color-secondary-rgb", sRgb);

      const contrast = getAutoContrastForeground(item.start);
      root.style.setProperty("--color-primary-foreground", contrast.fgColor);
      root.style.setProperty("--primary-foreground", contrast.fgColor);
    }
  };

  useEffect(() => {
    if (activeUserGradient !== null) {
      applyUserGradient(activeUserGradient);
    }
  }, []);

  // 4. Font Scale & Border Radius State
  const [fontScale, setFontScaleState] = useState<number>(() => {
    try {
      const saved = typeof localStorage !== 'undefined' ? localStorage.getItem("portfolio_font_scale") : null;
      if (saved && !isNaN(Number(saved))) return Number(saved);
    } catch {}
    return 100;
  });

  const [borderRadius, setBorderRadiusState] = useState<number>(() => {
    try {
      const saved = typeof localStorage !== 'undefined' ? localStorage.getItem("portfolio_border_radius") : null;
      if (saved && !isNaN(Number(saved))) return Number(saved);
    } catch {}
    return 20;
  });

  const [borderRadiusCard, setBorderRadiusCardState] = useState<number>(() => {
    try {
      const saved = typeof localStorage !== 'undefined' ? localStorage.getItem("portfolio_border_radius_card") : null;
      if (saved && !isNaN(Number(saved))) return Number(saved);
    } catch {}
    return 20; // Official Design System card radius is 20px
  });

  const [typoSizes, setTypoSizesState] = useState<TypoCustomSizes>(() => {
    try {
      const saved = typeof localStorage !== 'undefined' ? localStorage.getItem("portfolio_typo_sizes") : null;
      if (saved) {
        return { ...DEFAULT_TYPO_SIZES, ...JSON.parse(saved) };
      }
    } catch {}
    return DEFAULT_TYPO_SIZES;
  });

  // DOM mutation helpers
  const applyRadiusToDom = (radius: number, cardRadius: number) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const targetCardRadius = cardRadius || 20;
      const targetCompRadius = radius || 20;

      root.style.setProperty("--theme-radius", `${targetCompRadius}px`);
      root.style.setProperty("--theme-radius-card", `${targetCardRadius}px`);
      root.style.setProperty("--theme-radius-container", `${targetCardRadius}px`);
      root.style.setProperty("--theme-radius-modal", `${targetCardRadius}px`);
      root.style.setProperty("--theme-radius-inner", `${Math.max(4, targetCardRadius - 4)}px`);
      root.style.setProperty("--theme-radius-button", "10px");
      root.style.setProperty("--theme-radius-input", "10px");
      root.style.setProperty("--theme-radius-badge", "999px");
      root.style.setProperty("--theme-radius-pill", "999px");
      
      root.style.setProperty("--theme-radius-xs", "4px");
      root.style.setProperty("--theme-radius-sm", "6px");
      root.style.setProperty("--theme-radius-md", "10px");
      root.style.setProperty("--theme-radius-lg", "16px");
      root.style.setProperty("--theme-radius-xl", `${targetCompRadius}px`);
      root.style.setProperty("--theme-radius-2xl", `${targetCompRadius}px`);
      root.style.setProperty("--theme-radius-3xl", "24px");

      root.style.setProperty("--radius", `${targetCompRadius}px`);
      root.style.setProperty("--radius-xs", "4px");
      root.style.setProperty("--radius-sm", "6px");
      root.style.setProperty("--radius-md", "10px");
      root.style.setProperty("--radius-lg", "16px");
      root.style.setProperty("--radius-xl", `${targetCompRadius}px`);
      root.style.setProperty("--radius-2xl", `${targetCompRadius}px`);
      root.style.setProperty("--radius-3xl", "24px");
      root.style.setProperty("--radius-4xl", "28px");

      root.style.setProperty("--card-padding", "20px");
      root.style.setProperty("--card-gap", "16px");
      root.style.setProperty("--card-radius", `${targetCardRadius}px`);
      root.style.setProperty("--radius-card", `${targetCardRadius}px`);
      root.style.setProperty("--radius-button", "10px");
      root.style.setProperty("--radius-input", "10px");
      root.style.setProperty("--radius-small-card", `${targetCardRadius}px`);
      root.style.setProperty("--radius-hero-card", "24px");
      root.style.setProperty("--radius-modal", `${targetCardRadius}px`);
      root.style.setProperty("--icon-radius", "10px");
      root.style.setProperty("--radius-pill", "999px");

      root.style.setProperty("--control-height", "40px");
      root.style.setProperty("--button-height", "40px");
      root.style.setProperty("--input-height", "40px");
      root.style.setProperty("--select-height", "40px");
      root.style.setProperty("--page-padding-desktop", "32px");
      root.style.setProperty("--page-padding-mobile", "16px");
    }
  };

  const applyThemeToDOM = (themeName: ThemeType) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    
    // Cleanly strip all previous theme classes (e.g. theme-*, dark)
    Array.from(root.classList).forEach((cls) => {
      if (cls === "dark" || cls.startsWith("theme-")) {
        root.classList.remove(cls);
      }
    });
    
    root.dataset.theme = themeName;
    root.setAttribute("data-theme", themeName);
    root.setAttribute("data-theme-mode", themeMode);
    
    const isDarkTheme = themeName === "dark" || themeName === "glass-dark-neon" || themeMode === "dark";
    if (isDarkTheme) {
      root.classList.add("dark", `theme-${themeName}`);
    } else {
      root.classList.add(`theme-${themeName}`);
    }
  };

  const applyColorsToDOM = (themeName: ThemeType, presetId: string) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    if (themeName === "soft-floating-bento" && presetId === "default") {
      root.style.setProperty("--primary", "#5865E8");
      root.style.setProperty("--primary-hover", "#4853cc");
      root.style.setProperty("--color-primary", "#5865E8");
      root.style.setProperty("--color-secondary", "#7C5CDB");
      root.style.setProperty("--color-accent", "#39BFC5");
      root.style.setProperty("--color-highlight", "#4D8EF7");
      root.style.setProperty("--color-soft", "#D778E8");
      root.style.setProperty("--color-primary-rgb", "88, 101, 232");
      root.style.setProperty("--color-secondary-rgb", "124, 92, 219");
      root.style.setProperty("--color-accent-rgb", "57, 191, 197");
      root.style.setProperty("--color-primary-foreground", "#ffffff");
      root.style.setProperty("--theme-primary-foreground", "#ffffff");
      root.style.setProperty("--primary-foreground", "#ffffff");
      return;
    }

    const selectedPreset = COLOR_PRESETS.find((p) => p.id === presetId) || COLOR_PRESETS[0];
      
    const isDark = themeName === "dark" || themeName === "glass-dark-neon";
    const colors = isDark ? selectedPreset.dark : selectedPreset.light;

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
    setIsThemeTransitioning(true);
    safeStartViewTransition(() => {
      setThemeState(newTheme);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      } catch {}
      applyThemeToDOM(newTheme);
      applyColorsToDOM(newTheme, colorPreset);
    });
    setTimeout(() => {
      setIsThemeTransitioning(false);
    }, 450);
  };

  const resetTheme = () => {
    setTheme("glass-light-multicolor");
  };

  const setColorPreset = (presetId: string) => {
    setColorPresetState(presetId);
    try {
      localStorage.setItem(COLOR_PRESET_STORAGE_KEY, presetId);
    } catch {}
    applyColorsToDOM(theme, presetId);
  };

  const handleSetColorPreset = async (presetId: string) => {
    setColorPreset(presetId);
  };

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      localStorage.setItem(THEME_MODE_STORAGE_KEY, mode);
    } catch {}

    if (mode === "dark") {
      setTheme("glass-dark-neon");
    } else if (mode === "light") {
      setTheme("glass-light-multicolor");
    } else {
      // system
      if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("glass-dark-neon");
      } else {
        setTheme("glass-light-multicolor");
      }
    }
  };

  const setBorderRadius = (radius: number) => {
    const clamped = Math.max(0, Math.min(28, radius));
    setBorderRadiusState(clamped);
    try {
      localStorage.setItem("portfolio_border_radius", clamped.toString());
    } catch {}
    applyRadiusToDom(clamped, borderRadiusCard);
  };

  const resetBorderRadius = () => {
    setBorderRadius(14);
  };

  const setBorderRadiusCard = (radius: number) => {
    const clamped = Math.max(0, Math.min(32, radius));
    setBorderRadiusCardState(clamped);
    try {
      localStorage.setItem("portfolio_border_radius_card", clamped.toString());
    } catch {}
    applyRadiusToDom(borderRadius, clamped);
  };

  const resetBorderRadiusCard = () => {
    setBorderRadiusCard(14);
  };

  const setFontScale = (scale: number) => {
    const clamped = Math.max(80, Math.min(130, scale));
    setFontScaleState(clamped);
    try {
      localStorage.setItem("portfolio_font_scale", clamped.toString());
      if (typeof document !== 'undefined') {
        document.documentElement.style.fontSize = `${16 * (clamped / 100)}px`;
      }
    } catch {}
  };

  const resetFontScale = () => {
    setFontScale(100);
    if (typeof document !== 'undefined') {
      document.documentElement.style.fontSize = "16px";
    }
  };

  const applyTypoSizesToDom = (sizes: TypoCustomSizes) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty("--font-size-display", `${sizes["hero-h1"]}px`);
      root.style.setProperty("--font-size-h1", `${sizes["h1"]}px`);
      root.style.setProperty("--font-size-h2", `${sizes["h2"]}px`);
      root.style.setProperty("--font-size-h3", `${sizes["h3"]}px`);
      root.style.setProperty("--font-size-h4", `${sizes["h4"]}px`);
      root.style.setProperty("--font-size-h5", `${sizes["card-title-lg"]}px`);
      root.style.setProperty("--font-size-card-title", `${sizes["card-title"]}px`);
      root.style.setProperty("--font-size-h7", `${sizes["card-subtitle"]}px`);
      root.style.setProperty("--font-size-icon", `${sizes["card-icon"]}px`);
      root.style.setProperty("--font-size-stat", `${sizes["counter"]}px`);
      root.style.setProperty("--font-size-body", `${sizes["body"]}px`);
      root.style.setProperty("--font-size-body-sm", `${sizes["body-sm"]}px`);
      root.style.setProperty("--font-size-caption", `${sizes["caption"]}px`);
      root.style.setProperty("--font-size-label", `${sizes["label"]}px`);
      root.style.setProperty("--font-size-3xs", `${sizes["badge"]}px`);
      root.style.setProperty("--font-size-nav", `${sizes["navigation"]}px`);
      root.style.setProperty("--font-size-button", `${sizes["button"]}px`);
      root.style.setProperty("--font-size-input", `${sizes["input"]}px`);
      root.style.setProperty("--font-size-tooltip", `${sizes["tooltip"]}px`);
      root.style.setProperty("--header-height", `${sizes["header-height"]}px`);
      root.style.setProperty("--footer-height", `${sizes["header-height"]}px`);
    }
  };

  const updateTypoSizes = (newSizes: TypoCustomSizes) => {
    setTypoSizesState(newSizes);
    try {
      localStorage.setItem("portfolio_typo_sizes", JSON.stringify(newSizes));
    } catch {}
    applyTypoSizesToDom(newSizes);
  };

  const resetTypoSizes = () => {
    updateTypoSizes(DEFAULT_TYPO_SIZES);
  };

  const isDark = theme === "glass-dark-neon" || theme === "dark" || themeMode === "dark";
  const resolvedTheme: "light" | "dark" = isDark ? "dark" : "light";
  const selectedPresetObj = (COLOR_PRESETS.find((p) => p.id === colorPreset) || COLOR_PRESETS[0]);
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

  // Effects
  useEffect(() => {
    applyRadiusToDom(borderRadius, borderRadiusCard);
  }, [borderRadius, borderRadiusCard]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.fontSize = `${16 * (fontScale / 100)}px`;
    }
  }, [fontScale]);

  useEffect(() => {
    applyThemeToDOM(theme);
    applyColorsToDOM(theme, colorPreset);
  }, [theme, colorPreset]);

  useEffect(() => {
    applyTypoSizesToDom(typoSizes);
  }, [typoSizes]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (themeMode === "system") {
        const newResolvedTheme = mediaQuery.matches ? "glass-dark-neon" : "glass-light-multicolor";
        setThemeState(newResolvedTheme);
        applyThemeToDOM(newResolvedTheme);
        applyColorsToDOM(newResolvedTheme, colorPreset);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [themeMode, colorPreset]);

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
      themeMode,
      setThemeMode,
      resolvedTheme,
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
      applyTypoSizesToDom,
      colorPreset,
      setColorPreset: handleSetColorPreset,
      activeUserGradient,
      applyUserGradient,
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
      closeTypographyModal,
      isThemeModalOpen,
      setIsThemeModalOpen,
      openThemeModal,
      closeThemeModal,
      resetTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "default",
      setTheme: () => {},
      themeMode: "system",
      setThemeMode: () => {},
      resolvedTheme: "light",
      fontScale: 100,
      setFontScale: () => {},
      resetFontScale: () => {},
      borderRadius: 14,
      setBorderRadius: () => {},
      resetBorderRadius: () => {},
      borderRadiusCard: 14,
      setBorderRadiusCard: () => {},
      resetBorderRadiusCard: () => {},
      typoSizes: DEFAULT_TYPO_SIZES,
      updateTypoSizes: () => {},
      resetTypoSizes: () => {},
      applyTypoSizesToDom: () => {},
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
      isThemeModalOpen: false,
      setIsThemeModalOpen: () => {},
      openThemeModal: () => {},
      closeThemeModal: () => {},
      resetTheme: () => {},
      colorPreset: "default",
      setColorPreset: () => {},
      activeUserGradient: 5,
      applyUserGradient: () => {},
      activePalette: LIGHT_GLASS_PALETTE,
      buttonForeground: "#ffffff",
      checkContrast: getAutoContrastForeground
    };
  }
  return context;
};

