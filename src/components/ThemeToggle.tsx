'use client';

import React, { useEffect, useState } from 'react';
import { useTheme, ThemeMode } from '../context/ThemeContext';
import { Sun, Moon, Sparkles, Monitor, Check } from 'lucide-react';

export interface ThemeToggleProps {
  /** Display variant: 'segmented' (3-button pill), 'cycle' (single button), or 'dropdown' */
  variant?: 'segmented' | 'cycle' | 'dropdown';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Extra CSS classes */
  className?: string;
  /** Whether to show text label alongside icon */
  showLabel?: boolean;
}

/**
 * Unified ThemeToggle Component
 * - 3-Way Mode: Light (Sáng) | Dark (Tối) | System (Hệ thống OS)
 * - Persists choice in localStorage ('portfolio_theme_mode')
 * - Synchronizes root HTML element with data-theme & data-theme-mode attributes
 * - Fluid Glassmorphism aesthetic matching the design tokens & Play typography
 */
export function ThemeToggle({
  variant = 'segmented',
  size = 'md',
  className = '',
  showLabel = true,
}: ThemeToggleProps) {
  const { themeMode, setThemeMode, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`rounded-full border border-slate-200/20 bg-slate-100/10 animate-pulse ${
          variant === 'segmented' ? 'w-48 h-9' : 'w-9 h-9'
        } ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === 'dark';

  const modes: { id: ThemeMode; labelVi: string; labelEn: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'light',
      labelVi: 'Sáng',
      labelEn: 'Light',
      icon: <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 transition-transform group-hover:rotate-45" />,
      desc: 'MRITECH Growth (Light Glass)',
    },
    {
      id: 'dark',
      labelVi: 'Tối',
      labelEn: 'Dark',
      icon: <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 transition-transform group-hover:-rotate-12" />,
      desc: 'Glass Tối Neon (Dark Neon Glass)',
    },
    {
      id: 'system',
      labelVi: 'Hệ thống',
      labelEn: 'System',
      icon: <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500 dark:text-cyan-400" />,
      desc: 'Tự động theo cấu hình OS thiết bị',
    },
  ];

  // Size mapping
  const sizeClasses = {
    sm: 'text-xs p-1 gap-1',
    md: 'text-xs sm:text-sm p-1 gap-1.5',
    lg: 'text-sm p-1.5 gap-2',
  };

  const itemPadding = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1.5 text-xs font-medium',
    lg: 'px-3.5 py-2 text-sm font-medium',
  };

  // 1. CYCLE VARIANT (Single button cycling Light -> Dark -> System)
  if (variant === 'cycle') {
    const cycleMode = () => {
      const nextMode: ThemeMode =
        themeMode === 'system' ? 'light' : themeMode === 'light' ? 'dark' : 'system';
      setThemeMode(nextMode);
    };

    const currentModeObj = modes.find((m) => m.id === themeMode) || modes[0];

    return (
      <button
        id="theme-toggle-cycle-btn"
        type="button"
        onClick={cycleMode}
        aria-label={`Chế độ giao diện: ${currentModeObj.labelVi} (Click để đổi sang chế độ tiếp theo)`}
        title={`Chế độ: ${currentModeObj.labelVi} (${currentModeObj.desc}) - Click để chuyển Sáng ☀️ / Tối 🌙 / Hệ thống 💻`}
        className={`group relative inline-flex items-center justify-center rounded-full border transition-all duration-300 active:scale-95 cursor-pointer select-none backdrop-blur-xl ${
          isDark
            ? 'bg-slate-900/80 border-white/20 text-slate-100 hover:border-cyan-400/60 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_15px_rgba(0,240,255,0.25)]'
            : 'bg-white/80 border-slate-200/90 text-slate-800 hover:border-blue-400/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_0_15px_rgba(37,99,235,0.2)]'
        } ${size === 'sm' ? 'px-2.5 py-1 text-xs gap-1.5' : size === 'lg' ? 'px-4 py-2 text-sm gap-2.5' : 'px-3 py-1.5 text-xs sm:text-sm gap-2'} ${className}`}
      >
        <span className="flex items-center justify-center shrink-0">
          {currentModeObj.icon}
        </span>
        {showLabel && (
          <span className="font-semibold tracking-tight whitespace-nowrap">
            {currentModeObj.labelVi}
          </span>
        )}
      </button>
    );
  }

  // 2. DROPDOWN VARIANT (Trigger + Popover menu)
  if (variant === 'dropdown') {
    const currentModeObj = modes.find((m) => m.id === themeMode) || modes[0];

    return (
      <div className={`relative inline-block text-left ${className}`}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className={`group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-xl transition-all duration-300 active:scale-95 cursor-pointer ${
            isDark
              ? 'bg-slate-900/85 border-white/20 text-slate-100 hover:border-cyan-400/60 shadow-md'
              : 'bg-white/85 border-slate-200/90 text-slate-800 hover:border-blue-400/70 shadow-xs'
          }`}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          {currentModeObj.icon}
          {showLabel && <span>{currentModeObj.labelVi}</span>}
        </button>

        {isDropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsDropdownOpen(false)}
              aria-hidden="true"
            />
            <div
              className={`absolute right-0 mt-2 w-48 rounded-2xl border p-1.5 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150 ${
                isDark
                  ? 'bg-slate-900/95 border-white/20 text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
                  : 'bg-white/95 border-slate-200 text-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.12)]'
              }`}
              role="menu"
            >
              <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 border-b border-slate-200/50 dark:border-white/10 mb-1">
                Chế độ giao diện
              </div>
              {modes.map((mode) => {
                const isSelected = themeMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => {
                      setThemeMode(mode.id);
                      setIsDropdownOpen(false);
                    }}
                    role="menuitem"
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? isDark
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                        : isDark
                        ? 'hover:bg-white/10 text-slate-300'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {mode.icon}
                      <span>{mode.labelVi}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-current" />}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }

  // 3. SEGMENTED VARIANT (Default 3-Way Pill Segmented Control)
  return (
    <div
      role="radiogroup"
      aria-label="Chế độ giao diện (Theme mode switcher)"
      className={`relative inline-flex items-center rounded-full border backdrop-blur-2xl transition-all duration-300 ${
        isDark
          ? 'bg-slate-900/80 border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-white/80 border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
      } ${sizeClasses[size]} ${className}`}
    >
      {modes.map((mode) => {
        const isSelected = themeMode === mode.id;

        return (
          <button
            key={mode.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => setThemeMode(mode.id)}
            title={`${mode.labelVi} - ${mode.desc}`}
            className={`group relative flex items-center justify-center gap-1.5 rounded-full transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
              itemPadding[size]
            } ${
              isSelected
                ? isDark
                  ? 'bg-gradient-to-r from-cyan-500/25 to-blue-500/25 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(0,240,255,0.25)] font-bold'
                  : 'bg-white text-blue-600 border border-blue-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.08)] font-bold'
                : isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 border border-transparent'
            }`}
          >
            <span className="flex items-center justify-center shrink-0">
              {mode.icon}
            </span>
            {showLabel && (
              <span className="tracking-tight whitespace-nowrap">
                {mode.labelVi}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ThemeToggle;
