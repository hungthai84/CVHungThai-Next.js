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
      return "bg-[#090D16]/85 dark:bg-[#090D16]/85 border border-cyan-400/50 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,240,255,0.35),0_0_55px_rgba(217,70,239,0.25),inset_0_1.5px_2px_rgba(255,255,255,0.22)] text-slate-100 backdrop-blur-[40px] transition-all duration-300";
    case "modern-light-glass":
    default:
      return "bg-white/80 border border-white/80 dark:border-cyan-400/30 shadow-[0_16px_48px_rgba(99,102,241,0.14),0_4px_16px_rgba(6,182,212,0.08),inset_0_1.5px_2px_rgba(255,255,255,0.95)] text-slate-900 dark:text-slate-100 backdrop-blur-[40px] transition-all duration-300";
  }
}

export function getGlassCardClass(variant: "default" | "blue" | "indigo" | "purple" | "cyan" | "emerald" | "amber" | "rose" = "default"): string {
  const base = "backdrop-blur-[40px] transition-all duration-300 rounded-2xl border ";
  switch (variant) {
    case "blue":
      return `${base} bg-blue-500/10 dark:bg-slate-900/85 border-blue-500/30 dark:border-blue-400/50 shadow-[0_10px_30px_rgba(37,99,235,0.12),inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(59,130,246,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.2)] hover:dark:border-blue-300 hover:dark:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(59,130,246,0.55)]`;
    case "indigo":
      return `${base} bg-indigo-500/10 dark:bg-slate-900/85 border-indigo-500/30 dark:border-indigo-400/50 shadow-[0_10px_30px_rgba(99,102,241,0.12),inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(99,102,241,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.2)] hover:dark:border-indigo-300 hover:dark:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(99,102,241,0.55)]`;
    case "purple":
      return `${base} bg-purple-500/10 dark:bg-slate-900/85 border-purple-500/30 dark:border-purple-400/50 shadow-[0_10px_30px_rgba(168,85,247,0.12),inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(168,85,247,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.2)] hover:dark:border-purple-300 hover:dark:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(168,85,247,0.55)]`;
    case "cyan":
      return `${base} bg-cyan-500/10 dark:bg-slate-900/85 border-cyan-500/30 dark:border-cyan-400/60 shadow-[0_10px_30px_rgba(6,182,212,0.12),inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(0,245,255,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.2)] hover:dark:border-cyan-300 hover:dark:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_45px_rgba(0,245,255,0.6)]`;
    case "emerald":
      return `${base} bg-emerald-500/10 dark:bg-slate-900/85 border-emerald-500/30 dark:border-emerald-400/60 shadow-[0_10px_30px_rgba(16,185,129,0.12),inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(0,255,136,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.2)] hover:dark:border-emerald-300 hover:dark:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_45px_rgba(0,255,136,0.6)]`;
    case "amber":
      return `${base} bg-amber-500/10 dark:bg-slate-900/85 border-amber-500/30 dark:border-amber-400/60 shadow-[0_10px_30px_rgba(245,158,11,0.12),inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(255,184,0,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.2)] hover:dark:border-amber-300 hover:dark:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_45px_rgba(255,184,0,0.6)]`;
    case "rose":
      return `${base} bg-rose-500/10 dark:bg-slate-900/85 border-rose-500/30 dark:border-rose-400/60 shadow-[0_10px_30px_rgba(244,63,94,0.12),inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(255,0,127,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.2)] hover:dark:border-rose-300 hover:dark:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_45px_rgba(255,0,127,0.6)]`;
    default:
      return `${base} bg-white/75 dark:bg-slate-900/85 border-white/80 dark:border-cyan-400/50 shadow-[0_10px_30px_rgba(99,102,241,0.08),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(0,245,255,0.3),inset_0_1.5px_2px_rgba(255,255,255,0.2)] hover:dark:border-cyan-300 hover:dark:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(0,245,255,0.5)]`;
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

