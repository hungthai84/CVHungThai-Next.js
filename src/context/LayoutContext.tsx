import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type LayoutOrientation = "vertical" | "horizontal";
export type LayoutMode = "card-page" | "dashboard" | "slide-stack" | "landing" | "bento-pinterest";

export interface LayoutOption {
  id: LayoutMode;
  nameVi: string;
  nameEn: string;
  taglineVi: string;
  taglineEn: string;
  icon: string;
  defaultThemeDark?: string;
  defaultThemeLight?: string;
}

export const LAYOUT_OPTIONS: LayoutOption[] = [
  {
    id: "card-page",
    nameVi: "Card Page",
    nameEn: "Card Page",
    taglineVi: "Header phía trên, Center Card ở giữa và Footer phía dưới (cách 15px)",
    taglineEn: "Top Header, Center Card & Bottom Footer with 15px gap",
    icon: "LayoutTemplate",
    defaultThemeDark: "glass-light-multicolor",
    defaultThemeLight: "glass-light-multicolor",
  },
  {
    id: "dashboard",
    nameVi: "Dashboard",
    nameEn: "Dashboard",
    taglineVi: "Sidebar trái, Center Card ở giữa và Sidebar phải trong thẻ bao padding 1px",
    taglineEn: "Dual-sidebar unified dashboard inside 1px padding container",
    icon: "LayoutDashboard",
    defaultThemeDark: "glass-light-multicolor",
    defaultThemeLight: "glass-light-multicolor",
  },
  {
    id: "slide-stack",
    nameVi: "Slide Stack",
    nameEn: "Slide Stack",
    taglineVi: "Các slide xếp lớp 3D nhô ra 4 hướng trên, dưới, trái, phải (cách 15px)",
    taglineEn: "3D layered slides peeking in 4 directions (top, bottom, left, right)",
    icon: "Layers",
    defaultThemeDark: "glass-light-multicolor",
    defaultThemeLight: "glass-light-multicolor",
  },
  {
    id: "landing",
    nameVi: "Landing Page Portfolio",
    nameEn: "Landing Page Portfolio",
    taglineVi: "Website giới thiệu năng lực theo chiều dọc với Nav Glass Liquid",
    taglineEn: "Continuous vertical executive portfolio with Liquid Glass Navbar",
    icon: "FileText",
    defaultThemeDark: "glass-light-multicolor",
    defaultThemeLight: "glass-light-multicolor",
  },
  {
    id: "bento-pinterest",
    nameVi: "Bento Pinterest",
    nameEn: "Bento Pinterest",
    taglineVi: "Lưới card đa màu sắc Bento Masonry tự co chiều cao, ẩn Header/Footer",
    taglineEn: "Multicolor masonry card grid with dynamic height & zero whitespace",
    icon: "LayoutGrid",
    defaultThemeDark: "glass-light-multicolor",
    defaultThemeLight: "glass-light-multicolor",
  },
];

export const normalizeLayoutMode = (mode: string | null | undefined): LayoutMode => {
  if (!mode) return "card-page";
  if (mode === "card-page" || mode === "slide") return "card-page";
  if (mode === "dashboard") return "dashboard";
  if (mode === "slide-stack" || mode === "glass-stacked" || mode === "prism-glass") return "slide-stack";
  if (mode === "landing") return "landing";
  if (mode === "bento-pinterest" || mode === "bento") return "bento-pinterest";
  return "card-page";
};

interface LayoutContextType {
  orientation: LayoutOrientation;
  toggleOrientation: () => void;
  setOrientation: (orientation: LayoutOrientation) => void;
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  toggleLayoutMode: () => void;
  isSwitching: boolean;
}

const STORAGE_KEY = "portfolio_layout_orientation_pref";
const LAYOUT_MODE_STORAGE_KEY = "portfolio_layout_mode_pref";

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orientation, setOrientationState] = useState<LayoutOrientation>(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === "horizontal" || saved === "vertical") {
          return saved;
        }
      }
    } catch (e) {
      console.error("Failed to read layout preference", e);
    }
    return "vertical";
  });

  const [layoutMode, setLayoutModeState] = useState<LayoutMode>(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(LAYOUT_MODE_STORAGE_KEY);
        return normalizeLayoutMode(saved);
      }
    } catch (e) {
      console.error("Failed to read layout mode preference", e);
    }
    return "card-page";
  });

  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, orientation);
    } catch (e) {
      console.error("Failed to save layout preference", e);
    }
  }, [orientation]);

  useEffect(() => {
    try {
      localStorage.setItem(LAYOUT_MODE_STORAGE_KEY, layoutMode);
    } catch (e) {
      console.error("Failed to save layout mode preference", e);
    }
  }, [layoutMode]);

  const toggleOrientation = () => {
    setIsSwitching(true);
    setOrientationState((prev) => (prev === "vertical" ? "horizontal" : "vertical"));
    setTimeout(() => {
      setIsSwitching(false);
    }, 600);
  };

  const setOrientation = (newOri: LayoutOrientation) => {
    setIsSwitching(true);
    setOrientationState(newOri);
    setTimeout(() => {
      setIsSwitching(false);
    }, 600);
  };

  const setLayoutMode = (newMode: LayoutMode) => {
    if (newMode === layoutMode) return;
    setIsSwitching(true);
    setLayoutModeState(newMode);
    setTimeout(() => {
      setIsSwitching(false);
    }, 600);
  };

  const toggleLayoutMode = () => {
    setIsSwitching(true);
    setLayoutModeState((prev) => (prev === "card-page" ? "dashboard" : "card-page"));
    setTimeout(() => {
      setIsSwitching(false);
    }, 600);
  };

  return (
    <LayoutContext.Provider
      value={{
        orientation,
        toggleOrientation,
        setOrientation,
        layoutMode,
        setLayoutMode,
        toggleLayoutMode,
        isSwitching,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

const fallbackLayoutContext: LayoutContextType = {
  orientation: "vertical",
  toggleOrientation: () => {},
  setOrientation: () => {},
  layoutMode: "card-page",
  setLayoutMode: () => {},
  toggleLayoutMode: () => {},
  isSwitching: false,
};

export const useLayout = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  return context || fallbackLayoutContext;
};
