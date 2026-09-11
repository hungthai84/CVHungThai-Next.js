import { CursorConfig, CursorStyleType, CursorColorPreset } from "../types/cursor";

export const DEFAULT_CURSOR_CONFIG: CursorConfig = {
  style: "neon-ring",
  colorPreset: "auto",
  size: "medium",
  enableTrail: true,
  enableHoverEffect: true,
  blendMode: "screen"
};

export interface CursorStyleOption {
  id: CursorStyleType;
  nameVi: string;
  nameEn: string;
  descVi: string;
  descEn: string;
  iconName: string;
}

export const CURSOR_STYLE_OPTIONS: CursorStyleOption[] = [
  {
    id: "neon-ring",
    nameVi: "Vòng Neon & Chấm sáng",
    nameEn: "Neon Ring & Dot",
    descVi: "Vòng xoay công nghệ phát sáng theo chuyển động mượt mà",
    descEn: "Futuristic dual-ring with smooth lagging center dot",
    iconName: "CircleDot"
  },
  {
    id: "minimal-dot",
    nameVi: "Chấm tròn tối giản",
    nameEn: "Minimal Smooth Dot",
    descVi: "Chấm mượt mà tinh gọn, mở rộng vầng hào quang nhẹ khi chạm",
    descEn: "Clean, ultra-smooth magnetic dot that scales gracefully",
    iconName: "Dot"
  },
  {
    id: "crosshair",
    nameVi: "Tâm ngắm kỹ thuật",
    nameEn: "Precision Crosshair",
    descVi: "Kiểu tâm ngắm Sci-Fi chuẩn xác với vạch định vị công nghệ",
    descEn: "Cybernetic reticle crosshair with precision aiming ticks",
    iconName: "Crosshair"
  },
  {
    id: "liquid-bubble",
    nameVi: "Bong bóng chất lỏng",
    nameEn: "Fluid Aura Bubble",
    descVi: "Vầng hào quang lỏng mềm mại, tự biến đổi khi tương tác",
    descEn: "Soft morphing fluid aura bubble with dynamic ambient glow",
    iconName: "Sparkles"
  },
  {
    id: "trailing-comet",
    nameVi: "Sao băng vệt sáng",
    nameEn: "Trailing Comet",
    descVi: "Chấm sáng để lại đuôi hạt bụi sao lấp lánh khi di chuyển",
    descEn: "Stardust particle trail following your cursor movements",
    iconName: "Flame"
  },
  {
    id: "system",
    nameVi: "Con trỏ mặc định",
    nameEn: "System Default",
    descVi: "Sử dụng con trỏ chuột tiêu chuẩn của hệ điều hành máy tính",
    descEn: "Standard operating system native arrow cursor",
    iconName: "MousePointer"
  }
];

export interface CursorColorOption {
  id: CursorColorPreset;
  nameVi: string;
  nameEn: string;
  hex: string;
  hoverHex: string;
}

export const CURSOR_COLOR_OPTIONS: CursorColorOption[] = [
  { id: "auto", nameVi: "Theo giao diện", nameEn: "Auto Theme", hex: "var(--color-primary, #00d9ff)", hoverHex: "#ff00ff" },
  { id: "cyan", nameVi: "Xanh Neon", nameEn: "Electric Cyan", hex: "#00d9ff", hoverHex: "#ec4899" },
  { id: "indigo", nameVi: "Tím Indigo", nameEn: "Deep Indigo", hex: "#6366f1", hoverHex: "#a855f7" },
  { id: "emerald", nameVi: "Xanh Ngọc", nameEn: "Emerald Green", hex: "#10b981", hoverHex: "#06b6d4" },
  { id: "rose", nameVi: "Hồng Ruby", nameEn: "Rose Ruby", hex: "#f43f5e", hoverHex: "#fbbf24" },
  { id: "amber", nameVi: "Vàng Hoàng Kim", nameEn: "Amber Gold", hex: "#f59e0b", hoverHex: "#ef4444" }
];
