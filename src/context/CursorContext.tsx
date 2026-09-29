import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CursorConfig, CursorStyleType, CursorSizeType } from "../types/cursor";
import { DEFAULT_CURSOR_CONFIG } from "../data/cursorData";

interface CursorContextType {
  cursorConfig: CursorConfig;
  setCursorConfig: React.Dispatch<React.SetStateAction<CursorConfig>>;
  setCursorStyle: (style: CursorStyleType) => void;
  setCursorSize: (size: CursorSizeType) => void;
  setCursorColor: (colorPreset: string) => void;
  setEnableTrail: (enable: boolean) => void;
  setEnableMagnetic: (enable: boolean) => void;
  resetCursorDefaults: () => void;
  resetCursorConfig: () => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

const STORAGE_KEY = "portfolio_cursor_config";

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorConfig, setCursorConfig] = useState<CursorConfig>(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error("Error clearing cursor config from localStorage", e);
      }
    }
    return DEFAULT_CURSOR_CONFIG;
  });

  const setCursorStyle = (style: CursorStyleType) => {
    setCursorConfig((prev) => ({ ...prev, style }));
  };

  const setCursorSize = (size: CursorSizeType) => {
    setCursorConfig((prev) => ({ ...prev, size }));
  };

  const setCursorColor = (colorPreset: string) => {
    setCursorConfig((prev) => ({ ...prev, colorPreset }));
  };

  const setEnableTrail = (enableTrail: boolean) => {
    setCursorConfig((prev) => ({ ...prev, enableTrail }));
  };

  const setEnableMagnetic = (enableMagnetic: boolean) => {
    setCursorConfig((prev) => ({ ...prev, enableMagnetic }));
  };

  const resetCursorDefaults = () => {
    setCursorConfig(DEFAULT_CURSOR_CONFIG);
  };

  const resetCursorConfig = () => {
    setCursorConfig(DEFAULT_CURSOR_CONFIG);
  };

  return (
    <CursorContext.Provider
      value={{
        cursorConfig,
        setCursorConfig,
        setCursorStyle,
        setCursorSize,
        setCursorColor,
        setEnableTrail,
        setEnableMagnetic,
        resetCursorDefaults,
        resetCursorConfig,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}
