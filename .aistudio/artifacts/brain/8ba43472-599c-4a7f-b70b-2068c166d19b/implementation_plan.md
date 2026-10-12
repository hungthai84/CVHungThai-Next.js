# Implementation Plan - Glass Stacked Card Slide Layout

## Overview
Add a new layout mode called **Glass Stacked Card Slide** to the Portfolio website. This layout combines a Stacked Card Carousel with modern Glassmorphism design, allowing users to switch between the traditional layout and the new carousel layout seamlessly without losing data or functionality.

---

## Proposed Changes

### 1. Layout Context / State (`src/context/LayoutContext.tsx` or layout options)
- Add `"glass-stacked"` to the available layout modes (`layoutMode`: `"slide" | "bento" | "glass-stacked"`).
- Provide toggle / selector methods to switch to `"glass-stacked"`.

### 2. Styling & CSS (`src/index.css`)
- Define `.glass-stacked-card-slide` class and related CSS rules for:
  - Center active card (z-index highest, full scale, prominent glass effect).
  - Left adjacent preview card (translated left, scaled down, partially visible).
  - Right adjacent preview card (translated right, scaled down, partially visible).
  - Smooth transitions (`300ms cubic-bezier(0.16, 1, 0.3, 1)`).
  - Light mode and Dark mode color tokens and glass surfaces.

### 3. Component Implementation (`src/components/GlassStackedCardSlide.tsx`)
- Create a reusable carousel wrapper component that takes items (e.g. sections/cards) and renders them in the Stacked Card Slide layout.
- Include:
  - Previous / Next navigation buttons.
  - Slide pagination indicators (dots).
  - Clickable side preview cards to bring them to center.
  - Touch swipe / drag gesture support.
  - Responsive adaptations for Desktop, Tablet, and Mobile.

### 4. Integration (`src/components/Footer.tsx` & `src/app/page.tsx`)
- Update layout toggle buttons in the Footer and Header to include **Glass Stacked Card Slide**.
- Conditionally render sections using `GlassStackedCardSlide` when `layoutMode === "glass-stacked"`.

---

## Verification Plan
1. Compile applet using `compile_applet` to verify zero TypeScript / syntax errors.
2. Test layout switching between Slide, Bento Grid, and Glass Stacked Card Slide.
3. Test Light Mode and Dark Mode rendering across desktop and mobile viewports.
