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
      return "bg-[#121218]/80 dark:bg-[#121218]/80 border border-white/12 text-slate-100 backdrop-blur-[16px] backdrop-saturate-[180%]";
    case "mritech-digital-growth":
    default:
      return "bg-white/65 dark:bg-[#121218]/80 border border-white/50 dark:border-white/12 text-slate-800 dark:text-slate-100 backdrop-blur-[16px] backdrop-saturate-[180%]";
  }
}

export function getGlassCardClass(variant: "default" | "blue" | "indigo" | "purple" | "cyan" | "emerald" | "amber" | "rose" = "default"): string {
  const base = "backdrop-blur-[16px] backdrop-saturate-[180%] transition-all duration-300 rounded-2xl md:rounded-[20px] border ";
  switch (variant) {
    case "blue":
      return `${base} bg-blue-500/10 dark:bg-[#121218]/60 border-blue-500/35 dark:border-blue-400/30 text-slate-800 dark:text-slate-100 shadow-[0_8px_32px_0_rgba(0,102,255,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-blue-500/55 hover:shadow-[0_12px_36px_rgba(0,102,255,0.15)] hover:-translate-y-1 hover:scale-[1.008]`;
    case "indigo":
      return `${base} bg-indigo-500/10 dark:bg-[#121218]/60 border-indigo-500/35 dark:border-indigo-400/30 text-slate-800 dark:text-slate-100 shadow-[0_8px_32px_0_rgba(91,33,255,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-indigo-500/55 hover:shadow-[0_12px_36px_rgba(91,33,255,0.15)] hover:-translate-y-1 hover:scale-[1.008]`;
    case "purple":
      return `${base} bg-purple-500/10 dark:bg-[#121218]/60 border-purple-500/35 dark:border-purple-400/30 text-slate-800 dark:text-slate-100 shadow-[0_8px_32px_0_rgba(123,47,247,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-purple-500/55 hover:shadow-[0_12px_36px_rgba(123,47,247,0.15)] hover:-translate-y-1 hover:scale-[1.008]`;
    case "cyan":
      return `${base} bg-cyan-500/10 dark:bg-[#121218]/60 border-cyan-500/35 dark:border-cyan-400/30 text-slate-800 dark:text-slate-100 shadow-[0_8px_32px_0_rgba(0,180,219,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-cyan-500/55 hover:shadow-[0_12px_36px_rgba(0,180,219,0.15)] hover:-translate-y-1 hover:scale-[1.008]`;
    case "emerald":
      return `${base} bg-emerald-500/10 dark:bg-[#121218]/60 border-emerald-500/35 dark:border-emerald-400/30 text-slate-800 dark:text-slate-100 shadow-[0_8px_32px_0_rgba(0,200,83,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-emerald-500/55 hover:shadow-[0_12px_36px_rgba(0,200,83,0.15)] hover:-translate-y-1 hover:scale-[1.008]`;
    case "amber":
      return `${base} bg-amber-500/10 dark:bg-[#121218]/60 border-amber-500/35 dark:border-amber-400/30 text-slate-800 dark:text-slate-100 shadow-[0_8px_32px_0_rgba(255,179,0,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-amber-500/55 hover:shadow-[0_12px_36px_rgba(255,179,0,0.15)] hover:-translate-y-1 hover:scale-[1.008]`;
    case "rose":
      return `${base} bg-rose-500/10 dark:bg-[#121218]/60 border-rose-500/35 dark:border-rose-400/30 text-slate-800 dark:text-slate-100 shadow-[0_8px_32px_0_rgba(236,0,140,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-rose-500/55 hover:shadow-[0_12px_36px_rgba(236,0,140,0.15)] hover:-translate-y-1 hover:scale-[1.008]`;
    default:
      return `${base} bg-white/55 dark:bg-[#121218]/60 border-white/50 dark:border-white/12 text-slate-800 dark:text-slate-100 shadow-[0_8px_32px_0_rgba(31,38,135,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-white/80 dark:hover:border-white/25 hover:shadow-[0_12px_36px_rgba(31,38,135,0.12)] hover:-translate-y-1 hover:scale-[1.008]`;
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

