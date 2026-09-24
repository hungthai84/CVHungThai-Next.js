'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Sparkles, Clock } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

/**
 * Reusable ThemeToggle Component
 * - Integrates with ThemeContext & Solar scheduling
 * - Uses mounted guard to prevent Next.js hydration mismatch
 * - Instant toggle between Light ('mritech-digital-growth') and Dark Neon ('glass-dark-neon')
 * - Supports keyboard navigation and accessibility (aria-label)
 */
export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, setTheme, autoThemeMode, toggleAutoThemeMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch: render placeholder until mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-xl border border-slate-200/20 bg-slate-100/10 animate-pulse ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === 'glass-dark-neon';

  const toggleTheme = () => {
    const nextTheme = isDark ? 'mritech-digital-growth' : 'glass-dark-neon';
    setTheme(nextTheme);
  };

  return (
    <button
      id="theme-toggle-btn"
      type="button"
      onClick={toggleTheme}
      aria-label={`Chuyển sang giao diện ${isDark ? 'Sáng (MRITECH Growth)' : 'Tối Neon (Dark Neon)'}`}
      title={isDark ? 'Chuyển sang Giao diện Sáng' : 'Chuyển sang Giao diện Tối Neon'}
      className={`relative inline-flex items-center justify-center gap-2 p-2 rounded-xl border transition-all duration-300 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
        isDark
          ? 'bg-slate-900/80 border-cyan-500/30 text-cyan-400 hover:border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
          : 'bg-white/80 border-slate-200/80 text-amber-600 hover:border-amber-400/80 shadow-sm'
      } ${className}`}
    >
      <span className="relative flex items-center justify-center w-5 h-5">
        {isDark ? (
          <Sparkles className="w-4 h-4 text-cyan-400 transition-transform duration-300 hover:rotate-45" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500 transition-transform duration-300 hover:rotate-90" />
        )}
      </span>

      {showLabel && (
        <span className="text-xs font-semibold select-none pr-1">
          {autoThemeMode ? 'Auto' : isDark ? 'Neon Dark' : 'MRITECH Light'}
        </span>
      )}

      {autoThemeMode && (
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
        </span>
      )}
    </button>
  );
}

export default ThemeToggle;
