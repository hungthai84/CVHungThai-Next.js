import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { FooterConfig, FooterPlacement, FooterStyleVariant } from "../types/footer";
import { DEFAULT_FOOTER_CONFIG } from "../data/footerData";
import { getSavedProductionDefaults } from "../services/systemSettingsService";

export type FooterModalTab = "customization" | "colors" | "radius" | "cursor" | "sound" | "footer" | "typography";

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
  footerModalTab: FooterModalTab;
  setFooterModalTab: (tab: FooterModalTab) => void;
  openFooterModal: (tab?: FooterModalTab) => void;
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
        const prodDefaults = getSavedProductionDefaults();
        if (prodDefaults?.footer) {
          return { ...DEFAULT_FOOTER_CONFIG, ...prodDefaults.footer };
        }
      } catch (e) {
        console.warn("Could not parse saved footer config", e);
      }
    }
    return DEFAULT_FOOTER_CONFIG;
  });

  const [isFooterModalOpen, setIsFooterModalOpen] = useState(false);
  const [footerModalTab, setFooterModalTab] = useState<FooterModalTab>("customization");
  const [isFooterHovered, setIsFooterHovered] = useState(false);

  const openFooterModal = (tab: FooterModalTab = "footer") => {
    setFooterModalTab(tab);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("app-navigate", { detail: "customization" }));
    }
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(footerConfig));
    } catch (e) {
      console.warn("Could not save footer config to localStorage", e);
    }
  }, [footerConfig]);

  // Synchronize when system defaults are updated
  useEffect(() => {
    const handleDefaultsUpdated = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.footer) {
        setFooterConfig((prev) => ({ ...prev, ...detail.footer }));
      }
    };
    window.addEventListener("thai_portfolio_defaults_updated", handleDefaultsUpdated);
    return () => window.removeEventListener("thai_portfolio_defaults_updated", handleDefaultsUpdated);
  }, []);

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
