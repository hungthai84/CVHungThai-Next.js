import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";

export function ThemeTransitionOverlay() {
  const { isThemeTransitioning, themeSnapshot } = useTheme();
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
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={handleAnimationComplete}
          className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden"
          style={{ willChange: "opacity, transform, filter" }}
        >
          {/* Captured Screenshot Snapshot */}
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
            <div className="w-full h-full bg-slate-900/10 backdrop-blur-[2px]" />
          )}

          {/* Futuristic ambient liquid dissolve light wave */}
          <motion.div
            initial={{ opacity: 0.6, scale: 0.95 }}
            animate={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-tr from-[rgba(var(--color-primary-rgb),0.15)] via-[rgba(var(--color-accent-rgb),0.1)] to-transparent pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ThemeTransitionOverlay;
