import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type LayoutOrientation = "vertical" | "horizontal";

interface LayoutContextType {
  orientation: LayoutOrientation;
  toggleOrientation: () => void;
  setOrientation: (orientation: LayoutOrientation) => void;
  isSwitching: boolean;
  fixedHeaderFooter: boolean;
  setFixedHeaderFooter: (fixed: boolean) => void;
}

const STORAGE_KEY = "portfolio_layout_orientation_pref";
const STICKY_STORAGE_KEY = "portfolio_layout_fixed_header_footer";

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

  const [fixedHeaderFooter, setFixedHeaderFooterState] = useState<boolean>(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(STICKY_STORAGE_KEY);
        if (saved === "false") {
          return false;
        }
      }
    } catch {}
    return true; // Default is true (Cố định)
  });

  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, orientation);
    } catch (e) {
      console.error("Failed to save layout preference", e);
    }
  }, [orientation]);

  const setFixedHeaderFooter = (fixed: boolean) => {
    setIsSwitching(true);
    setFixedHeaderFooterState(fixed);
    try {
      localStorage.setItem(STICKY_STORAGE_KEY, fixed ? "true" : "false");
    } catch {}
    setTimeout(() => {
      setIsSwitching(false);
    }, 400);
  };

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

  return (
    <LayoutContext.Provider
      value={{
        orientation,
        toggleOrientation,
        setOrientation,
        isSwitching,
        fixedHeaderFooter,
        setFixedHeaderFooter,
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
  isSwitching: false,
  fixedHeaderFooter: true,
  setFixedHeaderFooter: () => {},
};

export const useLayout = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  return context || fallbackLayoutContext;
};
