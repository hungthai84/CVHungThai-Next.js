export type CursorStyleType =
  | "neon-ring"
  | "minimal-dot"
  | "crosshair"
  | "liquid-bubble"
  | "trailing-comet"
  | "system";

export type CursorSize = "small" | "medium" | "large";

export type CursorColorType =
  | "default"
  | "cyan"
  | "indigo"
  | "rose"
  | "emerald"
  | "amber"
  | "purple";

export interface CursorConfig {
  style: CursorStyleType;
  size: CursorSize;
  color: CursorColorType | string;
  enableTrail: boolean;
  enabled: boolean;
}

export interface CursorStyleOption {
  id: CursorStyleType;
  nameVi: string;
  nameEn: string;
  descVi: string;
  descEn: string;
}

export interface CursorColorOption {
  id: string;
  nameVi: string;
  nameEn: string;
  hex: string;
  glow: string;
}
