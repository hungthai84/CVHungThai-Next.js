import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type LayoutOrientation = "vertical" | "horizontal";
export type LayoutMode = "slide" | "bento" | "glass-stacked" | "prism-glass" | "landing";

export interface LayoutOption {
  id: LayoutMode;
  nameVi: string;
  nameEn: string;
  taglineVi: string;
  taglineEn: string;
  icon: string;
}

export const LAYOUT_OPTIONS: LayoutOption[] = [
  {
    id: "slide",
    nameVi: "Bố cục Thẻ Slide",
    nameEn: "Slide Card Layout",
    taglineVi: "Duyệt từng trang slide mượt mà, trực quan & tập trung",
    taglineEn: "Smooth section-by-section slide navigation",
    icon: "LayoutTemplate",
  },
  {
    id: "bento",
    nameVi: "Bố cục Bento Grid",
    nameEn: "Bento Grid Layout",
    taglineVi: "Lưới thẻ đa kích thước hiện đại, trực quan toàn diện",
    taglineEn: "Modern multi-scale card grid overview",
    icon: "LayoutGrid",
  },
  {
    id: "glass-stacked",
    nameVi: "Glass Stacked Card Slide",
    nameEn: "Glass Stacked Card Slide",
    taglineVi: "Hiệu ứng thẻ xếp lớp Glassmorphism 3D mượt mà",
    taglineEn: "Smooth 3D stacked glass card carousel slide",
    icon: "Layers",
  },
  {
    id: "prism-glass",
    nameVi: "Prism Glass Slide",
    nameEn: "Prism Glass Slide",
    taglineVi: "Trình chiếu kính đa sắc Prism Glassmorphism mượt mà",
    taglineEn: "Multicolor prism glassmorphism slide presentation",
    icon: "Sparkles",
  },
  {
    id: "landing",
    nameVi: "Landing Page Layout Portfolio",
    nameEn: "Landing Page Portfolio Layout",
    taglineVi: "Bố cục cuộn dọc xuyên suốt chuyên nghiệp cho nhà tuyển dụng",
    taglineEn: "Professional continuous vertical landing page layout",
    icon: "FileText",
  },
];

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
        if (saved === "slide" || saved === "bento" || saved === "glass-stacked" || saved === "prism-glass" || saved === "landing") {
          return saved;
        }
      }
    } catch (e) {
      console.error("Failed to read layout mode preference", e);
    }
    return "slide";
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
    setLayoutModeState((prev) => (prev === "slide" ? "bento" : "slide"));
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
  layoutMode: "slide",
  setLayoutMode: () => {},
  toggleLayoutMode: () => {},
  isSwitching: false,
};

export const useLayout = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  return context || fallbackLayoutContext;
};
