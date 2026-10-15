export interface ThemeConfig {
  id: string;
  num: string;
  name: string;
  nameVi: string;
  tagline: string;
  taglineVi: string;
  description: string;
  descriptionVi: string;
  badge: string;
  badgeVi: string;
  isDark?: boolean;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    surfaceSecondary: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  featuresVi: string[];
  featuresEn: string[];
}

export const THEME_LIST: ThemeConfig[] = [
  {
    id: "glass-light-multicolor",
    num: "01",
    name: "Glass UI Light Multicolor",
    nameVi: "Kính Sáng Đa Sắc",
    tagline: "Bright Glassmorphism + Multicolor Ambient Gradient + Modern Depth",
    taglineVi: "Giao diện kính sáng trong suốt, gradient pastel đa màu sắc & chiều sâu đa tầng",
    description: "Light Glass UI with soft ambient multicolor glow (Cyan, Blue, Purple, Pink, Green, Orange), layered sub-cards, and refined reflections.",
    descriptionVi: "Phong cách thiết kế kính sáng tinh tế: nền kính sáng trong suốt kết hợp ánh sáng môi trường đa sắc (Cyan, Blue, Purple, Pink, Green, Orange), phân tầng Card - Sub-card - Micro-card rõ rệt và phản chiếu kính sang trọng.",
    badge: "Light Multicolor",
    badgeVi: "Kính Sáng Đa Sắc",
    isDark: false,
    colors: {
      primary: "#00B8D9",
      secondary: "#3B82F6",
      accent: "#8B5CF6",
      background: "#F5F7FB",
      surface: "rgba(255, 255, 255, 0.62)",
      surfaceSecondary: "rgba(255, 255, 255, 0.38)",
      text: "#172033",
      textSecondary: "#475569",
      border: "rgba(255, 255, 255, 0.75)",
    },
    featuresVi: [
      "Nền sáng #F5F7FB kết hợp quầng sáng Ambient Multicolor 4 góc",
      "Kính mờ siêu cấp (Blur 26px, Saturate 140%, Border trong suốt)",
      "Phân cấp 3 tầng kính rõ rệt: Primary Card (100%) → Sub-card (70%) → Micro-card (45%)",
      "Lớp phản quang kính phía trên (Glass Top Reflection) & Ambient Accent Glow",
      "Hệ màu đa sắc pastel cao cấp: Cyan, Blue, Purple, Pink, Green, Orange"
    ],
    featuresEn: [
      "Bright #F5F7FB base with 4-corner Multicolor Ambient Radial Gradients",
      "Ultra-fine glassmorphism (Blur 26px, Saturate 140%, Translucent border)",
      "Clear 3-tier glass hierarchy: Primary Card (100%) → Sub-card (70%) → Micro-card (45%)",
      "Subtle top rim glass reflection line & ambient accent corner glow",
      "Pastel + vibrant multicolor system: Cyan, Blue, Purple, Pink, Green, Orange"
    ]
  }
];

export const DEFAULT_THEME_ID = "glass-light-multicolor";
