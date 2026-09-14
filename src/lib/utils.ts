export function cn(...classes: (string | boolean | undefined | null | Record<string, any>)[]) {
  return classes
    .filter(Boolean)
    .map((c) => {
      if (typeof c === "string") return c;
      if (typeof c === "object" && c !== null) {
        return Object.entries(c)
          .filter(([_, v]) => Boolean(v))
          .map(([k]) => k)
          .join(" ");
      }
      return "";
    })
    .join(" ")
    .trim();
}

export function getUnifiedSurfaceStyle(theme: string): string {
  switch (theme) {
    case "mritech-digital-growth":
      return "bg-white/85 dark:bg-slate-900/85 border border-white/95 dark:border-amber-500/25 shadow-[0_20px_50px_rgba(249,115,22,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] text-slate-900 dark:text-slate-100 backdrop-blur-2xl transition-all duration-300";
    case "mritech-aurora-glass":
      return "bg-white/85 dark:bg-slate-900/85 border border-white/90 dark:border-indigo-500/25 shadow-[0_20px_50px_rgba(99,102,241,0.14)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] text-slate-900 dark:text-slate-100 backdrop-blur-2xl transition-all duration-300";
    case "glass-dark-neon":
      return "bg-slate-900/90 dark:bg-slate-900/90 border border-slate-800/90 dark:border-slate-800/90 shadow-[0_8px_30px_rgba(0,0,0,0.35)] text-white backdrop-blur-md transition-all duration-200";
    case "modern-light-glass":
    default:
      return "bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-sm text-slate-900 dark:text-slate-100 backdrop-blur-md transition-all duration-200";
  }
}

export function getGlassCardClass(variant: "default" | "blue" | "indigo" | "purple" | "cyan" | "emerald" | "amber" | "rose" = "default"): string {
  const base = "backdrop-blur-[16px] dark:backdrop-blur-[20px] transition-all duration-200 rounded-[10px] border ";
  switch (variant) {
    case "blue":
      return `${base} bg-blue-500/10 dark:bg-white/[0.06] border-blue-500/25 dark:border-blue-400/35 shadow-[0_8px_30px_rgba(0,102,255,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:border-blue-500/40 dark:hover:border-blue-400/60 hover:-translate-y-1`;
    case "indigo":
      return `${base} bg-indigo-500/10 dark:bg-white/[0.06] border-indigo-500/25 dark:border-indigo-400/35 shadow-[0_8px_30px_rgba(48,79,254,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:border-indigo-500/40 dark:hover:border-indigo-400/60 hover:-translate-y-1`;
    case "purple":
      return `${base} bg-purple-500/10 dark:bg-white/[0.06] border-purple-500/25 dark:border-purple-400/35 shadow-[0_8px_30px_rgba(91,33,255,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:border-purple-500/40 dark:hover:border-purple-400/60 hover:-translate-y-1`;
    case "cyan":
      return `${base} bg-cyan-500/10 dark:bg-white/[0.06] border-cyan-500/25 dark:border-cyan-400/35 shadow-[0_8px_30px_rgba(0,180,219,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:border-cyan-500/40 dark:hover:border-cyan-400/60 hover:-translate-y-1`;
    case "emerald":
      return `${base} bg-emerald-500/10 dark:bg-white/[0.06] border-emerald-500/25 dark:border-emerald-400/35 shadow-[0_8px_30px_rgba(0,200,83,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:border-emerald-500/40 dark:hover:border-emerald-400/60 hover:-translate-y-1`;
    case "amber":
      return `${base} bg-amber-500/10 dark:bg-white/[0.06] border-amber-500/25 dark:border-amber-400/35 shadow-[0_8px_30px_rgba(255,179,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:border-amber-500/40 dark:hover:border-amber-400/60 hover:-translate-y-1`;
    case "rose":
      return `${base} bg-rose-500/10 dark:bg-white/[0.06] border-rose-500/25 dark:border-rose-400/35 shadow-[0_8px_30px_rgba(236,0,140,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:border-rose-500/40 dark:hover:border-rose-400/60 hover:-translate-y-1`;
    default:
      return `${base} bg-white/65 dark:bg-white/[0.06] border-white/65 dark:border-white/12 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:border-slate-300/80 dark:hover:border-white/25 hover:-translate-y-1`;
  }
}

export const safeStorage = {
  getItem(key: string, fallback: string | null = null): string | null {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {
      // Storage unavailable or blocked
    }
    return fallback;
  },
  setItem(key: string, value: string): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // Storage unavailable or blocked
    }
  },
  removeItem(key: string): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Storage unavailable or blocked
    }
  }
};

