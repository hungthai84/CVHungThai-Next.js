import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getSavedProductionDefaults } from "../services/systemSettingsService";

export interface HeaderConfig {
  isPinned: boolean;
}

interface HeaderContextType {
  headerConfig: HeaderConfig;
  togglePin: () => void;
  isHeaderPinned: boolean;
  isHeaderHovered: boolean;
  setIsHeaderHovered: React.Dispatch<React.SetStateAction<boolean>>;
  isHeaderSlidUp: boolean;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

const STORAGE_KEY = "thai_portfolio_header_config";

const DEFAULT_HEADER_CONFIG: HeaderConfig = {
  isPinned: true,
};

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return { ...DEFAULT_HEADER_CONFIG, ...JSON.parse(saved) };
        }
        const prodDefaults = getSavedProductionDefaults();
        if (prodDefaults?.header) {
          return { ...DEFAULT_HEADER_CONFIG, ...prodDefaults.header };
        }
      } catch (e) {
        console.warn("Could not parse saved header config", e);
      }
    }
    return DEFAULT_HEADER_CONFIG;
  });

  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(headerConfig));
    } catch (e) {
      console.warn("Could not save header config to localStorage", e);
    }
  }, [headerConfig]);

  // Synchronize when system defaults are updated
  useEffect(() => {
    const handleDefaultsUpdated = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.header) {
        setHeaderConfig((prev) => ({ ...prev, ...detail.header }));
      }
    };
    window.addEventListener("thai_portfolio_defaults_updated", handleDefaultsUpdated);
    return () => window.removeEventListener("thai_portfolio_defaults_updated", handleDefaultsUpdated);
  }, []);

  const togglePin = () => {
    setHeaderConfig((prev) => ({ ...prev, isPinned: !prev.isPinned }));
  };

  const isHeaderPinned = headerConfig.isPinned !== false;
  const isHeaderSlidUp = !isHeaderPinned && !isHeaderHovered;

  return (
    <HeaderContext.Provider
      value={{
        headerConfig,
        togglePin,
        isHeaderPinned,
        isHeaderHovered,
        setIsHeaderHovered,
        isHeaderSlidUp,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
}
