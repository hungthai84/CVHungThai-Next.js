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
  },
  {
    id: "soft-floating-bento",
    num: "02",
    name: "Soft Floating Bento Style",
    nameVi: "Bento Nổi Mềm Mại",
    tagline: "Soft Glass Cards + Pastel Gradient + Floating Bento Depth",
    taglineVi: "Thẻ Bento kính mờ nổi, nền gradient pastel lavender & chiều sâu đa tầng mềm mại",
    description: "Soft glass cards, lavender periwinkle pastel gradient, 3-level elevated floating shadows, and refined modern bento aesthetics.",
    descriptionVi: "Phong cách Bento nổi mềm mại: nền gradient pastel Lavender - Periwinkle - Sky Blue êm dịu, thẻ kính trắng mờ 78% (Blur 16px), hiệu ứng đổ bóng nổi 3 cấp độ (Elevated Floating Depth) và các điểm nhấn màu sắc tươi sáng.",
    badge: "Soft Bento",
    badgeVi: "Bento Nổi Mềm Mại",
    isDark: false,
    colors: {
      primary: "#5865E8",
      secondary: "#7C5CDB",
      accent: "#39BFC5",
      background: "#ECEFFC",
      surface: "rgba(255, 255, 255, 0.78)",
      surfaceSecondary: "rgba(255, 255, 255, 0.55)",
      text: "#202858",
      textSecondary: "#596080",
      border: "rgba(255, 255, 255, 0.65)",
    },
    featuresVi: [
      "Nền Gradient Pastel Lavender (#B9A8F2) → Periwinkle (#AFC8F4) → Sky Blue (#B8DCF2)",
      "Thẻ Kính Nổi Mềm Mại (Surface 78% white, Blur 16px, Border trắng trong 65%)",
      "Độ Nổi 3 Cấp Độ (Level 1: 6px/20px → Level 2: 12px/30px → Level 3: 20px/45px)",
      "Hệ màu sắc hài hòa: Primary #5865E8, Secondary #7C5CDB, Cyan #39BFC5, Pink #D778E8",
      "Typography & Button Soft Floating thanh lịch, bo cong mượt mà 18px–24px"
    ],
    featuresEn: [
      "Soft Lavender (#B9A8F2) → Periwinkle (#AFC8F4) → Sky Blue (#B8DCF2) pastel gradient background",
      "Soft Floating Glass Cards (78% white translucent surface, 16px blur, 65% white border)",
      "3-Tier Elevated Depth (Level 1: 6px/20px → Level 2: 12px/30px → Level 3: 20px/45px soft shadows)",
      "Harmonious Color Palette: Primary #5865E8, Secondary #7C5CDB, Cyan #39BFC5, Pink #D778E8",
      "Refined Soft Floating Buttons, Badges and 18px-24px rounded bento corners"
    ]
  },
  {
    id: "glass-dark-neon",
    num: "03",
    name: "Dark Glass Neon Style",
    nameVi: "Kính Đen Ánh Neon",
    tagline: "Ultra-Premium Dark Glass with Cyberpunk Neon Glows",
    taglineVi: "Kính mờ bóng đêm siêu cấp, dải quầng sáng phát quang & viền neon sặc sỡ",
    description: "Premium dark obsidian glass aesthetic with toxic lime, neon cyan, electric magenta, and warm amber reactive highlights.",
    descriptionVi: "Phong cách thiết kế đỉnh cao của thời đại: nền kính đen sâu thẳm obsidian kết hợp cùng các quầng sáng phản lực neon đa sắc sặc sỡ.",
    badge: "Dark Neon",
    badgeVi: "Kính Đen Ánh Neon",
    isDark: true,
    colors: {
      primary: "#00F5FF",
      secondary: "#FF007F",
      accent: "#8B5CF6",
      background: "#090d16",
      surface: "rgba(17, 24, 39, 0.85)",
      surfaceSecondary: "rgba(31, 41, 55, 0.90)",
      text: "#ffffff",
      textSecondary: "#9ca3af",
      border: "rgba(255, 255, 255, 0.12)",
    },
    featuresVi: [
      "Nền kính đen sâu thẳm cực kỳ êm dịu mắt ban đêm",
      "Hệ thống màu điểm nhấn phát quang phản lực (Reactive Neon)",
      "Độ mờ đục cao kết hợp bo góc 14px tinh xảo",
      "Giữ nguyên 100% bản sắc tương tác điện quang"
    ],
    featuresEn: [
      "Ultra-luxurious dark obsidian backdrop designed for night use",
      "Reactive neon glowing accent indicators",
      "High glass translucency paired with meticulous 14px corners",
      "100% original cyberpunk cybernetic interaction design"
    ]
  }
];

export const DEFAULT_THEME_ID = "glass-light-multicolor";
