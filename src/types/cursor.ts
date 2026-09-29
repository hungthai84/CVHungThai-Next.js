export type CursorStyleType = 
  | "default" 
  | "minimal" 
  | "glow" 
  | "neon" 
  | "crosshair" 
  | "ring" 
  | "magnetic" 
  | "spotlight"
  | "neon-ring"
  | "minimal-dot"
  | "liquid-bubble"
  | "trailing-comet"
  | "system";

export type CursorSizeType = "small" | "medium" | "large";

export interface CursorConfig {
  style: CursorStyleType;
  size: CursorSizeType;
  colorPreset: string;
  enableTrail: boolean;
  enableMagnetic: boolean;
  speed?: number;
}
