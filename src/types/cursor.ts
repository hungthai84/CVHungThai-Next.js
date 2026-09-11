export type CursorStyleType = 
  | "neon-ring" 
  | "minimal-dot" 
  | "crosshair" 
  | "liquid-bubble" 
  | "trailing-comet" 
  | "system";

export type CursorColorPreset = 
  | "auto" 
  | "cyan" 
  | "indigo" 
  | "emerald" 
  | "rose" 
  | "amber";

export type CursorSize = "small" | "medium" | "large";

export interface CursorConfig {
  style: CursorStyleType;
  colorPreset: CursorColorPreset;
  customColor?: string;
  size: CursorSize;
  enableTrail: boolean;
  enableHoverEffect: boolean;
  blendMode: "screen" | "difference" | "normal";
}
