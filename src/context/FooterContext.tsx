import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { FooterConfig, FooterPlacement, FooterStyleVariant } from "../types/footer";
import { DEFAULT_FOOTER_CONFIG } from "../data/footerData";

interface FooterContextType {
  footerConfig: FooterConfig;
  setPlacement: (placement: FooterPlacement) => void;
  setStyleVariant: (variant: FooterStyleVariant) => void;
  togglePin: () => void;
  toggleElementVisibility: (key: keyof FooterConfig) => void;
  updateFooterConfig: (partial: Partial<FooterConfig>) => void;
  resetFooterConfig: () => void;
  isFooterModalOpen: boolean;
  setIsFooterModalOpen: (open: boolean) => void;
  footerModalTab: "footer" | "cursor" | "sound" | "customization";
  setFooterModalTab: (tab: "footer" | "cursor" | "sound" | "customization") => void;
  openFooterModal: (tab?: "footer" | "cursor" | "sound" | "customization") => void;
  isFooterHovered: boolean;
  setIsFooterHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

const FooterContext = createContext<FooterContextType | undefined>(undefined);

const STORAGE_KEY = "thai_portfolio_footer_config";

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

  const [isFooterModalOpen, setIsFooterModalOpen] = useState(false);
  const [footerModalTab, setFooterModalTab] = useState<"footer" | "cursor" | "sound" | "customization">("footer");
  const [isFooterHovered, setIsFooterHovered] = useState(false);

  const openFooterModal = (tab: "footer" | "cursor" | "sound" | "customization" = "footer") => {
    setFooterModalTab(tab);
    setIsFooterModalOpen(true);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(footerConfig));
    } catch (e) {
      console.warn("Could not save footer config to localStorage", e);
    }
  }, [footerConfig]);

  const setPlacement = (placement: FooterPlacement) => {
    setFooterConfig((prev) => ({ ...prev, placement }));
  };

  const setStyleVariant = (styleVariant: FooterStyleVariant) => {
    setFooterConfig((prev) => ({ ...prev, styleVariant }));
  };

  const togglePin = () => {
    setFooterConfig((prev) => ({ ...prev, isPinned: !prev.isPinned }));
  };

  const toggleElementVisibility = (key: keyof FooterConfig) => {
    setFooterConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateFooterConfig = (partial: Partial<FooterConfig>) => {
    setFooterConfig((prev) => ({ ...prev, ...partial }));
  };

  const resetFooterConfig = () => {
    setFooterConfig(DEFAULT_FOOTER_CONFIG);
  };

  return (
    <FooterContext.Provider
      value={{
        footerConfig,
        setPlacement,
        setStyleVariant,
        togglePin,
        toggleElementVisibility,
        updateFooterConfig,
        resetFooterConfig,
        isFooterModalOpen,
        setIsFooterModalOpen,
        footerModalTab,
        setFooterModalTab,
        openFooterModal,
        isFooterHovered,
        setIsFooterHovered
      }}
    >
      {children}
    </FooterContext.Provider>
  );
}

const fallbackFooterContext: FooterContextType = {
  footerConfig: DEFAULT_FOOTER_CONFIG,
  setPlacement: () => {},
  setStyleVariant: () => {},
  togglePin: () => {},
  toggleElementVisibility: () => {},
  updateFooterConfig: () => {},
  resetFooterConfig: () => {},
  isFooterModalOpen: false,
  setIsFooterModalOpen: () => {},
  footerModalTab: "footer",
  setFooterModalTab: () => {},
  openFooterModal: () => {},
  isFooterHovered: false,
  setIsFooterHovered: () => {},
};

export function useFooter() {
  const context = useContext(FooterContext);
  return context || fallbackFooterContext;
}
