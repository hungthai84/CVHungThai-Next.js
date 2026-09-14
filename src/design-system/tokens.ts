/**
 * GLOBAL UI DESIGN SYSTEM TOKENS
 * Website CV Portfolio Nguyễn Hùng Thái
 * 
 * Phong cách chủ đạo: Modern Multicolor Glass UI + Bento Layout
 * Thống nhất toàn bộ Spacing, Radius, Typography, Shadows, Colors & Components
 */

export const DESIGN_TOKENS = {
  // 04. COLOR SYSTEM - 10 BỘ MÀU CHỦ ĐẠO
  colors: {
    // 01 Electric Blue
    electricBlue: {
      id: "electric-blue",
      name: "Electric Blue",
      primary: "#0066FF",
      secondary: "#00C6FF",
      accent: "#00E5FF",
      rgb: "0, 102, 255",
    },
    // 02 Neon Purple
    neonPurple: {
      id: "neon-purple",
      name: "Neon Purple",
      primary: "#5B21FF",
      secondary: "#B000FF",
      accent: "#D946EF",
      rgb: "91, 33, 255",
    },
    // 03 Cyber Pink
    cyberPink: {
      id: "cyber-pink",
      name: "Cyber Pink",
      primary: "#EC008C",
      secondary: "#FF4D6D",
      accent: "#FF1493",
      rgb: "236, 0, 140",
    },
    // 04 Sunset Orange
    sunsetOrange: {
      id: "sunset-orange",
      name: "Sunset Orange",
      primary: "#FF8A00",
      secondary: "#FF1744",
      accent: "#FF5252",
      rgb: "255, 138, 0",
    },
    // 05 Neon Emerald
    neonEmerald: {
      id: "neon-emerald",
      name: "Neon Emerald",
      primary: "#00C853",
      secondary: "#00E5A0",
      accent: "#00FF87",
      rgb: "0, 200, 83",
    },
    // 06 Aqua Cyan
    aquaCyan: {
      id: "aqua-cyan",
      name: "Aqua Cyan",
      primary: "#00B4DB",
      secondary: "#00F2FE",
      accent: "#00E5FF",
      rgb: "0, 180, 219",
    },
    // 07 Royal Indigo
    royalIndigo: {
      id: "royal-indigo",
      name: "Royal Indigo",
      primary: "#304FFE",
      secondary: "#7C4DFF",
      accent: "#536DFE",
      rgb: "48, 79, 254",
    },
    // 08 Golden Neon
    goldenNeon: {
      id: "golden-neon",
      name: "Golden Neon",
      primary: "#FFB300",
      secondary: "#FFD600",
      accent: "#FFEA00",
      rgb: "255, 179, 0",
    },
    // 09 Cosmic Violet
    cosmicViolet: {
      id: "cosmic-violet",
      name: "Cosmic Violet",
      primary: "#7B2FF7",
      secondary: "#F107A3",
      accent: "#E040FB",
      rgb: "123, 47, 247",
    },
    // 10 Ocean Mint
    oceanMint: {
      id: "ocean-mint",
      name: "Ocean Mint",
      primary: "#0099F7",
      secondary: "#00F2C3",
      accent: "#00D9A5",
      rgb: "0, 153, 247",
    },
  },

  // 06. LIGHT GLASS UI
  lightGlass: {
    bg: "#F7F9FC",
    surface: "rgba(255, 255, 255, 0.65)",
    border: "rgba(255, 255, 255, 0.65)",
    backdropFilter: "blur(16px)",
    shadow: "0 8px 30px rgba(0, 0, 0, 0.06)",
    textMain: "#0F172A",
    textMuted: "#475569",
  },

  // 07. DARK GLASS UI
  darkGlass: {
    bg: "#0B1020",
    surface: "rgba(255, 255, 255, 0.06)",
    border: "rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(20px)",
    shadow: "0 8px 30px rgba(0, 0, 0, 0.4)",
    textMain: "#FFFFFF",
    textMuted: "rgba(255, 255, 255, 0.70)",
  },

  // 08. BORDER RADIUS SYSTEM
  radius: {
    sm: "6px",
    md: "8px",
    lg: "10px",
    xl: "10px",
    "2xl": "10px",
    "3xl": "10px",
    pill: "999px",
    // Component assignments
    button: "10px",
    smallCard: "10px",
    card: "10px",
    heroCard: "10px",
    modal: "10px",
    badge: "999px",
  },

  // 09. SPACING SYSTEM
  spacing: {
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    8: "32px",
    10: "40px",
    12: "48px",
    16: "64px",
    20: "80px",
    24: "96px",
    // Semantic rules
    cardPadding: "20px",
    sectionGap: "36px",
    cardGap: "20px",
    titleToSubtitle: "10px",
    subtitleToBody: "12px",
    bodyToButton: "20px",
    headerToContent: "28px",
  },

  // 10. GLOBAL CONTAINER
  container: {
    desktopMax: "1200px",
    largeDesktopMax: "1280px",
    tabletPadding: "24px",
    mobilePadding: "16px",
  },

  // 11. GRID SYSTEM
  grid: {
    desktopCols: 4,
    tabletCols: 2,
    mobileCols: 1,
  },

  // 13. CARD PADDING
  cardPadding: {
    small: "16px",
    medium: "20px",
    large: "24px",
    hero: "32px",
    mobileOffset: "-4px",
  },

  // 14. ICON SYSTEM
  icons: {
    small: "16px",
    medium: "20px",
    large: "24px",
    featured: "32px",
    hero: "40px",
  },

  // 16. TYPOGRAPHY
  typography: {
    fontFamily: "'Play', sans-serif",
    stepRatio: 1.25,
    baseFontSize: "16px",
    display: "clamp(1.875rem, 3.5vw + 0.875rem, 3.25rem)", // 40-52px - 700 - Line-height 1.15
    h1: "clamp(1.75rem, 2.5vw + 0.75rem, 2.625rem)",       // 36-42px - 700 - Line-height 1.20
    h2: "clamp(1.5rem, 1.8vw + 0.75rem, 2.125rem)",        // 28-34px - 700 - Line-height 1.20
    h3: "clamp(1.125rem, 1vw + 0.75rem, 1.5rem)",           // 20-24px - 700 - Line-height 1.25
    h4: "clamp(1.0625rem, 0.4vw + 0.9rem, 1.25rem)",        // 18-20px - 700 - Line-height 1.30
    cardTitle: "clamp(1.0625rem, 0.4vw + 0.9rem, 1.25rem)", // 18-20px - 700 - Line-height 1.30
    body: "clamp(0.9375rem, 0.25vw + 0.875rem, 1rem)",        // 15-16px - 400 - Line-height 1.60
    bodySmall: "clamp(0.875rem, 0.2vw + 0.825rem, 0.9375rem)", // 14-15px - 400/500 - Line-height 1.55
    caption: "0.8125rem",                                    // 12-13px - 600 - Line-height 1.40 - Spacing 0.02em
    label: "0.8125rem",                                      // 12-13px - 600 - Line-height 1.40 - Spacing 0.02em
    badge2xs: "0.6875rem",                                   // 11px micro badge / pill
    badge3xs: "0.625rem",                                    // 10px tiny badge / mono metadata
    button: "clamp(0.875rem, 0.25vw + 0.8125rem, 1rem)",     // 14-16px - 600 - Line-height 1.20
    statistic: "clamp(1.75rem, 2.5vw + 1rem, 2.5rem)",      // 28-40px - 700 - Line-height 1.10
    navigation: "clamp(0.875rem, 0.2vw + 0.825rem, 1rem)",  // 14-16px - 500 - Line-height 1.20
    lineHeights: {
      display: 1.15,
      h1: 1.20,
      h2: 1.20,
      h3: 1.25,
      h4: 1.30,
      cardTitle: 1.30,
      body: 1.60,
      bodySmall: 1.55,
      caption: 1.40,
      button: 1.20,
      statistic: 1.10,
      navigation: 1.20
    },
    letterSpacing: {
      normal: "0",
      heading: "-0.01em",
      label: "0.02em"
    },
    weights: {
      display: 700,
      h1: 700,
      h2: 700,
      h3: 700,
      h4: 700,
      cardTitle: 700,
      statistic: 700,
      body: 400,
      bodySmall: 400,
      caption: 600,
      label: 600,
      button: 600,
      navigation: 500
    }
  },

  // 19. BUTTON SYSTEM
  buttons: {
    heightSmall: "36px",
    heightMedium: "44px",
    heightLarge: "48px",
    padding: "12px 20px",
    radius: "12px",
    fontWeight: 600,
    fontSize: "15px",
    hoverTranslate: "translateY(-1px)",
    transition: "200ms cubic-bezier(0.16, 1, 0.3, 1)",
  },

  // 20. INTERACTION SYSTEM
  transitions: {
    fast: "150ms cubic-bezier(0.16, 1, 0.3, 1)",
    normal: "200ms cubic-bezier(0.16, 1, 0.3, 1)",
    base: "250ms cubic-bezier(0.16, 1, 0.3, 1)",
    slow: "300ms cubic-bezier(0.16, 1, 0.3, 1)",
    hoverCard: "translateY(-3px)",
    hoverButton: "translateY(-1px)",
  },

  // 21. SHADOW SYSTEM
  shadows: {
    xs: "0 2px 8px rgba(0, 0, 0, 0.04)",
    sm: "0 4px 16px rgba(0, 0, 0, 0.05)",
    md: "0 8px 30px rgba(0, 0, 0, 0.06)",
    lg: "0 16px 50px rgba(0, 0, 0, 0.08)",
  },

  // 24. MODAL / POPUP
  modal: {
    maxWidth: "840px",
    desktopPadding: "28px",
    mobilePadding: "18px",
    radius: "24px",
    overlay: "rgba(0, 0, 0, 0.55)",
    backdropBlur: "12px",
  },
} as const;

export type DesignTokens = typeof DESIGN_TOKENS;
