import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";

export function ThemeTransitionOverlay() {
  const { isThemeTransitioning, themeSnapshot, theme } = useTheme();
  const [activeSnapshot, setActiveSnapshot] = useState<string | null>(null);

  useEffect(() => {
    if (themeSnapshot) {
      setActiveSnapshot(themeSnapshot);
    }
  }, [themeSnapshot]);

  const handleAnimationComplete = () => {
    if (!isThemeTransitioning) {
      setActiveSnapshot(null);
    }
  };

  return (
    <AnimatePresence>
      {(isThemeTransitioning || activeSnapshot) && (
        <motion.div
          key="theme-transition-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={handleAnimationComplete}
          className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden select-none"
          style={{ willChange: "opacity, transform, filter" }}
        >
          {/* Captured Screenshot Snapshot for seamless cross-dissolve */}
          {activeSnapshot ? (
            <img
              src={activeSnapshot}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-top select-none pointer-events-none"
              style={{
                imageRendering: "auto",
                transform: "translateZ(0)",
              }}
            />
          ) : (
            <div className="w-full h-full bg-slate-900/15 backdrop-blur-[4px]" />
          )}

          {/* High-fidelity ambient cross-dissolve gradient aura */}
          <motion.div
            initial={{ opacity: 0.8, scale: 0.98 }}
            animate={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-transparent pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ThemeTransitionOverlay;
