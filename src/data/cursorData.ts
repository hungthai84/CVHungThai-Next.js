import { CursorConfig, CursorStyleType } from "../types/cursor";

export const CURSOR_STYLE_OPTIONS = [
  {
    id: "system" as CursorStyleType,
    nameVi: "Mặc Định Hệ Thống (Standard System)",
    nameEn: "Standard System",
    descVi: "Con trỏ gốc từ hệ điều hành",
    descEn: "Default OS cursor pointer",
  },
  {
    id: "minimal-dot" as CursorStyleType,
    nameVi: "Chấm Nhỏ Tối Giản (Minimal Dot)",
    nameEn: "Minimal Dot",
    descVi: "Chấm tròn nhỏ gọn tinh tế",
    descEn: "Sleek, minimal precision dot",
  },
  {
    id: "crosshair" as CursorStyleType,
    nameVi: "Tâm Ngắm Kỹ Thuật (Crosshair)",
    nameEn: "Precision Crosshair",
    descVi: "Tâm ngắm kỹ thuật số chính xác",
    descEn: "Technical crosshair reticle",
  },
];

export const CURSOR_COLOR_OPTIONS = [
  { id: "default", nameVi: "Mặc định (Default Cyan)", nameEn: "Default Cyan", hex: "#06b6d4" },
  { id: "indigo", nameVi: "Xanh Indigo", nameEn: "Indigo Ray", hex: "#6366f1" },
  { id: "rose", nameVi: "Hồng Rose", nameEn: "Rose Glow", hex: "#f43f5e" },
  { id: "emerald", nameVi: "Lục Emerald", nameEn: "Emerald Pulse", hex: "#10b981" },
  { id: "amber", nameVi: "Vàng Amber", nameEn: "Amber Spark", hex: "#f59e0b" },
  { id: "purple", nameVi: "Tím Purple", nameEn: "Purple Aura", hex: "#a855f7" },
];

export const DEFAULT_CURSOR_CONFIG: CursorConfig = {
  style: "system",
  size: "medium",
  colorPreset: "default",
  enableTrail: false,
  enableMagnetic: false,
  speed: 1,
};
