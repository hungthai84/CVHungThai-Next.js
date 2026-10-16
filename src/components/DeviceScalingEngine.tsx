'use client';

import { useEffect } from 'react';

/**
 * DeviceScalingEngine - Dynamic Responsive Scaling for Nguyễn Hùng Thái Portfolio
 * 
 * Automatically calculates and applies a global scale factor based on device size.
 * Uses CSS variables to drive fluid typography, spacing, and component sizing.
 */
export default function DeviceScalingEngine() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateScaling = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // 1. BASE SCALE FACTOR CALCULATION
      // Standard desktop design target: 1440px
      // Standard mobile design target: 390px
      let scaleFactor = 1.0;
      
      if (width >= 1920) {
        // Ultra-wide screens: scale up slightly for better presence
        scaleFactor = 1.05;
      } else if (width >= 1440) {
        scaleFactor = 1.0;
      } else if (width >= 1024) {
        // Laptops/Tablets: scale down slightly to fit content
        scaleFactor = Math.max(0.92, width / 1440);
      } else if (width >= 768) {
        // Tablets
        scaleFactor = 0.95;
      } else if (width < 450) {
        // Small Mobile: maintain readability by preventing too much shrinking
        scaleFactor = Math.max(0.85, width / 450);
      }

      // 2. ASPECT RATIO ADJUSTMENT (Vertical scaling)
      // If the screen is very short (like landscape mobile), scale down everything
      if (height < 500 && width > height) {
        scaleFactor *= 0.85;
      }

      // 3. APPLY TO DOCUMENT ROOT
      const root = document.documentElement;
      
      // Core Scale
      root.style.setProperty('--fluid-scale', scaleFactor.toFixed(3));
      
      // Dynamic Typography Bases (Fluid Type)
      // We use clamp for responsive safety, but multi-plied by our engine's scale
      root.style.setProperty('--fluid-h1', `clamp(2rem, ${5 * scaleFactor}vw, 3.5rem)`);
      root.style.setProperty('--fluid-h2', `clamp(1.5rem, ${3.5 * scaleFactor}vw, 2.5rem)`);
      root.style.setProperty('--fluid-body', `${16 * scaleFactor}px`);
      
      // Global Padding & Gap multipliers
      root.style.setProperty('--fluid-gap', `${1.5 * scaleFactor}rem`);
      root.style.setProperty('--fluid-padding', `${2 * scaleFactor}rem`);
      
      // Visual presence metadata for other components
      root.setAttribute('data-device-size', width < 768 ? 'mobile' : width < 1280 ? 'tablet' : 'desktop');
    };

    // Initial run
    updateScaling();

    // Listen for resize
    window.addEventListener('resize', updateScaling);
    return () => window.removeEventListener('resize', updateScaling);
  }, []);

  return null; // Side-effect only component
}
