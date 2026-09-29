import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { FooterConfig, FooterPlacement, FooterStyleVariant } from "../types/footer";
import { DEFAULT_FOOTER_CONFIG } from "../data/footerData";

interface FooterContextType {
  footerConfig: FooterConfig;
  setFooterConfig: React.Dispatch<React.SetStateAction<FooterConfig>>;
  updateFooterConfig: (partial: Partial<FooterConfig>) => void;
  resetFooterConfig: () => void;
  togglePin: () => void;
  setPlacement: (placement: FooterPlacement) => void;
  setStyleVariant: (variant: FooterStyleVariant) => void;
  toggleElementVisibility: (key: keyof Omit<FooterConfig, "placement" | "styleVariant" | "blurIntensity">) => void;
  isFooterHovered: boolean;
  setIsFooterHovered: React.Dispatch<React.SetStateAction<boolean>>;
  isFooterModalOpen: boolean;
  setIsFooterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openFooterModal: (tab?: string) => void;
  footerRadiusTopLeft: number;
  setFooterRadiusTopLeft: (val: number) => void;
  footerRadiusTopRight: number;
  setFooterRadiusTopRight: (val: number) => void;
  fixedHeaderFooter: boolean;
  setFixedHeaderFooter: (val: boolean) => void;
}

const FooterContext = createContext<FooterContextType | undefined>(undefined);

const STORAGE_KEY = "thai_portfolio_footer_config";
const RADIUS_TL_KEY = "thai_portfolio_footer_radius_tl";
const RADIUS_TR_KEY = "thai_portfolio_footer_radius_tr";
const FIXED_HF_KEY = "thai_portfolio_fixed_hf";

export function FooterProvider({ children }: { children: ReactNode }) {
  const [footerConfig, setFooterConfig] = useState<FooterConfig>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return { ...DEFAULT_FOOTER_CONFIG, ...JSON.parse(saved) };
        }
      } catch (e) {
        console.warn("Could not parse saved footer config", e);
      }
    }
    return DEFAULT_FOOTER_CONFIG;
  });

  const [isFooterHovered, setIsFooterHovered] = useState(false);
  const [isFooterModalOpen, setIsFooterModalOpen] = useState(false);

  const [footerRadiusTopLeft, setFooterRadiusTopLeftState] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(RADIUS_TL_KEY);
      if (saved) return Number(saved);
    }
    return 14;
  });

  const [footerRadiusTopRight, setFooterRadiusTopRightState] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(RADIUS_TR_KEY);
      if (saved) return Number(saved);
    }
    return 14;
  });

  const [fixedHeaderFooter, setFixedHeaderFooterState] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(FIXED_HF_KEY);
      if (saved !== null) return saved === "true";
    }
    return true;
  });

  const setFooterRadiusTopLeft = useCallback((val: number) => {
    setFooterRadiusTopLeftState(val);
    try {
      localStorage.setItem(RADIUS_TL_KEY, String(val));
    } catch {}
  }, []);

  const setFooterRadiusTopRight = useCallback((val: number) => {
    setFooterRadiusTopRightState(val);
    try {
      localStorage.setItem(RADIUS_TR_KEY, String(val));
    } catch {}
  }, []);

  const setFixedHeaderFooter = useCallback((val: boolean) => {
    setFixedHeaderFooterState(val);
    try {
      localStorage.setItem(FIXED_HF_KEY, String(val));
    } catch {}
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(footerConfig));
    } catch (e) {
      console.warn("Could not save footer config to localStorage", e);
    }
  }, [footerConfig]);

  const updateFooterConfig = useCallback((partial: Partial<FooterConfig>) => {
    setFooterConfig((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetFooterConfig = useCallback(() => {
    setFooterConfig(DEFAULT_FOOTER_CONFIG);
    setFooterRadiusTopLeft(14);
    setFooterRadiusTopRight(14);
    setFixedHeaderFooter(true);
  }, [setFooterRadiusTopLeft, setFooterRadiusTopRight, setFixedHeaderFooter]);

  const togglePin = useCallback(() => {
    setFooterConfig((prev) => ({ ...prev, isPinned: !prev.isPinned }));
  }, []);

  const setPlacement = useCallback((placement: FooterPlacement) => {
    setFooterConfig((prev) => ({ ...prev, placement }));
  }, []);

  const setStyleVariant = useCallback((styleVariant: FooterStyleVariant) => {
    setFooterConfig((prev) => ({ ...prev, styleVariant }));
  }, []);

  const toggleElementVisibility = useCallback((key: keyof Omit<FooterConfig, "placement" | "styleVariant" | "blurIntensity">) => {
    setFooterConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const openFooterModal = useCallback((_tab?: string) => {
    setIsFooterModalOpen(true);
  }, []);

  return (
    <FooterContext.Provider
      value={{
        footerConfig,
        setFooterConfig,
        updateFooterConfig,
        resetFooterConfig,
        togglePin,
        setPlacement,
        setStyleVariant,
        toggleElementVisibility,
        isFooterHovered,
        setIsFooterHovered,
        isFooterModalOpen,
        setIsFooterModalOpen,
        openFooterModal,
        footerRadiusTopLeft,
        setFooterRadiusTopLeft,
        footerRadiusTopRight,
        setFooterRadiusTopRight,
        fixedHeaderFooter,
        setFixedHeaderFooter,
      }}
    >
      {children}
    </FooterContext.Provider>
  );
}

export function useFooter() {
  const context = useContext(FooterContext);
  if (!context) {
    throw new Error("useFooter must be used within a FooterProvider");
  }
  return context;
}
