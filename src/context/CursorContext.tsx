import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CursorConfig, CursorStyleType, CursorColorPreset, CursorSize } from "../types/cursor";
import { DEFAULT_CURSOR_CONFIG } from "../data/cursorData";

interface CursorContextType {
  cursorConfig: CursorConfig;
  setCursorStyle: (style: CursorStyleType) => void;
  setCursorColor: (color: CursorColorPreset) => void;
  setCursorSize: (size: CursorSize) => void;
  setEnableTrail: (enable: boolean) => void;
  updateCursorConfig: (partial: Partial<CursorConfig>) => void;
  resetCursorConfig: () => void;
  isCursorModalOpen: boolean;
  setIsCursorModalOpen: (open: boolean) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

const STORAGE_KEY = "thai_portfolio_cursor_config";

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorConfig, setCursorConfig] = useState<CursorConfig>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return { ...DEFAULT_CURSOR_CONFIG, ...JSON.parse(saved) };
        }
      } catch (e) {
        console.warn("Could not parse saved cursor config", e);
      }
    }
    return DEFAULT_CURSOR_CONFIG;
  });

  const [isCursorModalOpen, setIsCursorModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cursorConfig));
    } catch (e) {
      console.warn("Could not save cursor config to localStorage", e);
    }
  }, [cursorConfig]);

  const setCursorStyle = (style: CursorStyleType) => {
    setCursorConfig((prev) => ({ ...prev, style }));
  };

  const setCursorColor = (colorPreset: CursorColorPreset) => {
    setCursorConfig((prev) => ({ ...prev, colorPreset }));
  };

  const setCursorSize = (size: CursorSize) => {
    setCursorConfig((prev) => ({ ...prev, size }));
  };

  const setEnableTrail = (enableTrail: boolean) => {
    setCursorConfig((prev) => ({ ...prev, enableTrail }));
  };

  const updateCursorConfig = (partial: Partial<CursorConfig>) => {
    setCursorConfig((prev) => ({ ...prev, ...partial }));
  };

  const resetCursorConfig = () => {
    setCursorConfig(DEFAULT_CURSOR_CONFIG);
  };

  return (
    <CursorContext.Provider
      value={{
        cursorConfig,
        setCursorStyle,
        setCursorColor,
        setCursorSize,
        setEnableTrail,
        updateCursorConfig,
        resetCursorConfig,
        isCursorModalOpen,
        setIsCursorModalOpen
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

const fallbackCursorContext: CursorContextType = {
  cursorConfig: DEFAULT_CURSOR_CONFIG,
  setCursorStyle: () => {},
  setCursorColor: () => {},
  setCursorSize: () => {},
  setEnableTrail: () => {},
  updateCursorConfig: () => {},
  resetCursorConfig: () => {},
  isCursorModalOpen: false,
  setIsCursorModalOpen: () => {},
};

export function useCursor() {
  const context = useContext(CursorContext);
  return context || fallbackCursorContext;
}
