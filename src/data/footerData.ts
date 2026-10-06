import { FooterConfig, FooterPlacement, FooterStyleVariant } from "../types/footer";

export const DEFAULT_FOOTER_CONFIG: FooterConfig = {
  placement: "fixed-bottom",
  styleVariant: "glass",
  isPinned: true,
  showWeather: true,
  showClock: true,
  showQuickNav: true,
  showCursorControl: true,
  showSoundControl: true,
  showAIAssistant: true,
  showNextPageButton: true,
  showCopyright: false,
  blurIntensity: "high"
};

export interface FooterPlacementOption {
  id: FooterPlacement;
  nameVi: string;
  nameEn: string;
  descVi: string;
  descEn: string;
  icon: string;
}

export const FOOTER_PLACEMENT_OPTIONS: FooterPlacementOption[] = [
  {
    id: "fixed-bottom",
    nameVi: "Ghim cố định đáy",
    nameEn: "Fixed Bottom Dock",
    descVi: "Thanh Dock sang trọng áp sát mép dưới với góc bo tròn trên mềm mại",
    descEn: "Signature dock attached to screen bottom with rounded upper corners",
    icon: "PanelBottom"
  },
  {
    id: "floating-pill",
    nameVi: "Thanh đảo nổi",
    nameEn: "Floating Island",
    descVi: "Lơ lửng cách mép đáy 12px, bo tròn hoàn toàn 4 góc như Dynamic Island",
    descEn: "Elevated floating capsule hovering above the bottom edge with 360° border",
    icon: "Maximize2"
  },
  {
    id: "full-width",
    nameVi: "Trải rộng toàn màn hình",
    nameEn: "Full-Width Bar",
    descVi: "Trải dài 100% cạnh dưới màn hình, phù hợp bố cục truyền thống",
    descEn: "Spans 100% of screen width with a clean, continuous horizontal divider",
    icon: "Columns"
  },
  {
    id: "auto-hide",
    nameVi: "Tự động ẩn thông minh",
    nameEn: "Smart Auto-Hide",
    descVi: "Tự động trượt xuống mép màn hình khi đọc, trượt lên khi di chuột gần đáy",
    descEn: "Slides away while viewing content and smoothly reappears upon hovering",
    icon: "EyeOff"
  }
];

export interface FooterStyleOption {
  id: FooterStyleVariant;
  nameVi: string;
  nameEn: string;
  descVi: string;
  descEn: string;
}

export const FOOTER_STYLE_OPTIONS: FooterStyleOption[] = [
  {
    id: "glass",
    nameVi: "Kính mờ Neon (Glassmorphism)",
    nameEn: "Frosted Glass",
    descVi: "Hiệu ứng kính mờ trong suốt phản chiếu màu nền thời thượng",
    descEn: "Translucent frosted glass with blurred backdrop reflection"
  },
  {
    id: "solid",
    nameVi: "Đậm màu tương phản cao",
    nameEn: "Solid High Contrast",
    descVi: "Nền đục màu sắc nét, tách bạch rõ ràng khỏi nền trang",
    descEn: "Opaque background with crisp contrast and solid borders"
  },
  {
    id: "minimal",
    nameVi: "Tối giản không viền",
    nameEn: "Minimal Clean",
    descVi: "Đường nét thanh mảnh, viền mỏng siêu nhẹ tinh giản tối đa",
    descEn: "Ultra-thin border with subtle translucency for minimal distraction"
  }
];
