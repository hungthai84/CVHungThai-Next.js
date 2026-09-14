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
    case "glass-dark-neon":
      return "bg-[#090D16]/75 dark:bg-[#090D16]/75 border border-white/10 dark:border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.4),0_0_24px_rgba(0,245,255,0.15)] text-white backdrop-blur-[24px] transition-all duration-200";
    case "mritech-digital-growth":
    default:
      return "bg-white/70 dark:bg-slate-900/60 border border-white/80 dark:border-white/15 shadow-[0_32px_64px_rgba(15,23,42,0.06),0_16px_32px_rgba(15,23,42,0.04),inset_0_2px_4px_rgba(255,255,255,0.6)] text-slate-900 dark:text-slate-100 backdrop-blur-[28px] dark:backdrop-blur-[35px] transition-all duration-300";
  }
}

export function getGlassCardClass(variant: "default" | "blue" | "indigo" | "purple" | "cyan" | "emerald" | "amber" | "rose" = "default"): string {
  const base = "backdrop-blur-[24px] dark:backdrop-blur-[28px] transition-all duration-300 rounded-2xl md:rounded-[20px] border ";
  switch (variant) {
    case "blue":
      return `${base} bg-blue-500/8 dark:bg-white/[0.04] border-blue-500/30 dark:border-blue-400/30 shadow-[0_12px_40px_rgba(0,102,255,0.05)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4)] hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:shadow-[0_20px_50px_rgba(0,102,255,0.12)] hover:-translate-y-1.5 hover:scale-[1.01]`;
    case "indigo":
      return `${base} bg-indigo-500/8 dark:bg-white/[0.04] border-indigo-500/30 dark:border-indigo-400/30 shadow-[0_12px_40px_rgba(91,33,255,0.05)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4)] hover:border-indigo-500/50 dark:hover:border-indigo-400/50 hover:shadow-[0_20px_50px_rgba(91,33,255,0.12)] hover:-translate-y-1.5 hover:scale-[1.01]`;
    case "purple":
      return `${base} bg-purple-500/8 dark:bg-white/[0.04] border-purple-500/30 dark:border-purple-400/30 shadow-[0_12px_40px_rgba(123,47,247,0.05)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4)] hover:border-purple-500/50 dark:hover:border-purple-400/50 hover:shadow-[0_20px_50px_rgba(123,47,247,0.12)] hover:-translate-y-1.5 hover:scale-[1.01]`;
    case "cyan":
      return `${base} bg-cyan-500/8 dark:bg-white/[0.04] border-cyan-500/30 dark:border-cyan-400/30 shadow-[0_12px_40px_rgba(0,180,219,0.05)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4)] hover:border-cyan-500/50 dark:hover:border-cyan-400/50 hover:shadow-[0_20px_50px_rgba(0,180,219,0.12)] hover:-translate-y-1.5 hover:scale-[1.01]`;
    case "emerald":
      return `${base} bg-emerald-500/8 dark:bg-white/[0.04] border-emerald-500/30 dark:border-emerald-400/30 shadow-[0_12px_40px_rgba(0,200,83,0.05)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4)] hover:border-emerald-500/50 dark:hover:border-emerald-400/50 hover:shadow-[0_20px_50px_rgba(0,200,83,0.12)] hover:-translate-y-1.5 hover:scale-[1.01]`;
    case "amber":
      return `${base} bg-amber-500/8 dark:bg-white/[0.04] border-amber-500/30 dark:border-amber-400/30 shadow-[0_12px_40px_rgba(255,179,0,0.05)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4)] hover:border-amber-500/50 dark:hover:border-amber-400/50 hover:shadow-[0_20px_50px_rgba(255,179,0,0.12)] hover:-translate-y-1.5 hover:scale-[1.01]`;
    case "rose":
      return `${base} bg-rose-500/8 dark:bg-white/[0.04] border-rose-500/30 dark:border-rose-400/30 shadow-[0_12px_40px_rgba(236,0,140,0.05)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4)] hover:border-rose-500/50 dark:hover:border-rose-400/50 hover:shadow-[0_20px_50px_rgba(236,0,140,0.12)] hover:-translate-y-1.5 hover:scale-[1.01]`;
    default:
      return `${base} bg-white/45 dark:bg-white/[0.04] border-white/50 dark:border-white/12 shadow-[0_12px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)] hover:border-white/80 dark:hover:border-white/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 hover:scale-[1.01]`;
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

