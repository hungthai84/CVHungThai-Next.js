/**
 * SINGLE SOURCE OF TRUTH DESIGN SYSTEM TOKENS
 * Official Website Dimension & Typography Standards
 */

export const DESIGN_TOKENS = {
  // 01. TYPOGRAPHY SYSTEM
  typography: {
    fontFamily: "'Play', sans-serif",
    body: "16px",
    cardTitle: "20px",
    h3: "24px",
    h2: "32px",
    h1: "clamp(40px, 4vw, 48px)",
    h1Min: "40px",
    h1Max: "48px",

    button: "15px",
    input: "15px",
    caption: "13px",
    label: "13px",
    badge: "12px",

    lineHeights: {
      h1: 1.2,
      h2: 1.25,
      h3: 1.25,
      cardTitle: 1.3,
      body: 1.6,
      caption: 1.4,
      button: 1.2,
      input: 1.2,
    },

    weights: {
      body: 400,
      secondary: 400,
      navigation: 500,
      cardTitle: 600,
      h3: 600,
      h2: 700,
      h1: 700,
      hero: 800,
      button: 600,
    },
  },

  // 02. ICON SYSTEM
  icons: {
    small: "16px",
    medium: "20px",
    large: "24px",
    metadata: "16px",
    textInline: "16px",
    button: "16px",
    navigation: "20px",
    card: "20px",
    sectionTitle: "24px",
  },

  // 03. CONTROLS SYSTEM
  controls: {
    height: "40px",
    buttonHeight: "40px",
    inputHeight: "40px",
    selectHeight: "40px",
    borderRadius: "10px",
    buttonPaddingHorizontal: "16px",
    inputPaddingHorizontal: "14px",
    fontSize: "15px",
    fontWeight: 600,
  },

  // 04. CARD SYSTEM
  card: {
    padding: "20px",
    gap: "16px",
    radius: "20px",
    largeRadius: "24px",
    heroRadius: "28px",
    titleFontSize: "20px",
    titleFontWeight: 600,
    titleLineHeight: 1.3,
    subtitleFontSize: "15px",
    bodyFontSize: "16px",
    bodyLineHeight: 1.6,
    metadataFontSize: "13px",
    badgeFontSize: "12px",
  },

  // 05. PAGE PADDING & CONTAINER
  page: {
    paddingDesktop: "32px",
    paddingMobile: "16px",
    containerDesktopMax: "1200px",
    containerLargeMax: "1400px",
  },

  // 06. SPACING & GAP SYSTEM
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "32px",
    "4xl": "40px",
    "5xl": "48px",

    cardGap: "16px",
    cardInternalGap: "16px",
    iconToText: "8px",
    titleToSubtitle: "8px",
    sectionToSection: "40px",
  },

  // 07. BORDER RADIUS SYSTEM
  radius: {
    input: "10px",
    button: "10px",
    card: "20px",
    largeCard: "24px",
    hero: "28px",
    pill: "999px",
  },

  // 08. GLASS UI SURFACES
  glass: {
    backdropBlur: "16px",
    lightBg: "rgba(255, 255, 255, 0.72)",
    lightBorder: "rgba(255, 255, 255, 0.8)",
    lightShadow: "0 10px 30px 0 rgba(100, 110, 140, 0.08)",
    darkBg: "rgba(18, 18, 24, 0.85)",
    darkBorder: "rgba(255, 255, 255, 0.15)",
    darkShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
  },
} as const;

export type DesignTokens = typeof DESIGN_TOKENS;
