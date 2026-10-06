import { CursorConfig, CursorStyleOption, CursorColorOption } from "../types/cursor";

export const DEFAULT_CURSOR_CONFIG: CursorConfig = {
  style: "neon-ring",
  size: "medium",
  color: "default",
  enableTrail: true,
  enabled: true,
};

export const CURSOR_STYLE_OPTIONS: CursorStyleOption[] = [
  {
    id: "neon-ring",
    nameVi: "Vòng Sáng Neon (Mặc định)",
    nameEn: "Neon Ring (Default)",
    descVi: "Vòng tròn phát sáng hiện đại theo phong cách cyberpunk",
    descEn: "Modern glowing halo ring with smooth trailing dynamics",
  },
  {
    id: "minimal-dot",
    nameVi: "Chấm Nhỏ Tối Giản",
    nameEn: "Minimal Dot",
    descVi: "Chấm tròn tinh tế, không làm che khuất nội dung",
    descEn: "Subtle, refined dot pointer for distraction-free reading",
  },
  {
    id: "crosshair",
    nameVi: "Tâm Ngắm Công Nghệ",
    nameEn: "Precision Crosshair",
    descVi: "Tâm ngắm kỹ thuật chính xác cao",
    descEn: "Target reticle with high accuracy alignment lines",
  },
  {
    id: "liquid-bubble",
    nameVi: "Bóng Nước Động Lực",
    nameEn: "Liquid Bubble",
    descVi: "Hiệu ứng bóng nước co giãn theo tốc độ chuột",
    descEn: "Organic fluid bubble responding with velocity physics",
  },
  {
    id: "trailing-comet",
    nameVi: "Sao Băng Rực Rỡ",
    nameEn: "Trailing Comet",
    descVi: "Đuôi sao băng phát sáng lấp lánh khi di chuyển",
    descEn: "Vibrant starry trail bursting behind fast cursor motion",
  },
  {
    id: "system",
    nameVi: "Chuột Mặc Định Hệ Thống",
    nameEn: "Standard System Pointer",
    descVi: "Sử dụng con trỏ chuột gốc của hệ điều hành",
    descEn: "Standard OS native pointer without visual overlays",
  },
];

export const CURSOR_COLOR_OPTIONS: CursorColorOption[] = [
  {
    id: "default",
    nameVi: "Cyan Neon",
    nameEn: "Cyan Neon",
    hex: "#06B6D4",
    glow: "rgba(6, 182, 212, 0.45)",
  },
  {
    id: "indigo",
    nameVi: "Indigo Electric",
    nameEn: "Indigo Electric",
    hex: "#6366F1",
    glow: "rgba(99, 102, 241, 0.45)",
  },
  {
    id: "rose",
    nameVi: "Rose Crimson",
    nameEn: "Rose Crimson",
    hex: "#F43F5E",
    glow: "rgba(244, 63, 94, 0.45)",
  },
  {
    id: "emerald",
    nameVi: "Emerald Bright",
    nameEn: "Emerald Bright",
    hex: "#10B981",
    glow: "rgba(16, 185, 129, 0.45)",
  },
  {
    id: "amber",
    nameVi: "Amber Flame",
    nameEn: "Amber Flame",
    hex: "#F59E0B",
    glow: "rgba(245, 158, 11, 0.45)",
  },
  {
    id: "purple",
    nameVi: "Purple Galaxy",
    nameEn: "Purple Galaxy",
    hex: "#A855F7",
    glow: "rgba(168, 85, 247, 0.45)",
  },
];
