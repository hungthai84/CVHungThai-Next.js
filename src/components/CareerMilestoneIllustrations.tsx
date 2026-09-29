import React from "react";

// =========================================================================
// 1. MOBIFONE: TELECOM ANTENNA BROADCAST TOWER (BLUE)
// =========================================================================
export const MobiFoneAntennaIllustration: React.FC<{ className?: string }> = ({
  className = "w-24 h-24 sm:w-28 sm:h-28"
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 select-none drop-shadow-md transition-transform duration-300 group-hover/mcard:scale-105 ${className}`}
  >
    <defs>
      <linearGradient id="mobiTowerGrad" x1="60" y1="20" x2="60" y2="105" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      <linearGradient id="mobiWaveGrad" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
        <stop offset="50%" stopColor="#0284c7" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
      </linearGradient>
      <radialGradient id="mobiBeaconGlow" cx="60" cy="22" r="14" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
        <stop offset="60%" stopColor="#0284c7" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="mobiCloudGrad" x1="20" y1="95" x2="100" y2="115" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.7" />
      </linearGradient>
    </defs>

    {/* Concentric Signal Wave Arcs (Emitting outward) */}
    <path d="M 46 22 A 16 16 0 0 1 74 22" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
    <path d="M 38 18 A 26 26 0 0 1 82 18" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
    <path d="M 30 14 A 36 36 0 0 1 90 14" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
    <path d="M 22 10 A 46 46 0 0 1 98 10" stroke="#0369a1" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />

    {/* Signal Wave left & right rings */}
    <path d="M 44 26 C 36 28 32 36 32 44" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
    <path d="M 76 26 C 84 28 88 36 88 44" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
    <path d="M 38 22 C 26 26 20 38 20 50" stroke="#0ea5e9" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
    <path d="M 82 22 C 94 26 100 38 100 50" stroke="#0ea5e9" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />

    {/* Beacon Light Glow */}
    <circle cx="60" cy="22" r="12" fill="url(#mobiBeaconGlow)" />
    <circle cx="60" cy="22" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />

    {/* Antenna Mast / Tower Spire */}
    <line x1="60" y1="12" x2="60" y2="28" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />

    {/* Main Tower Truss Body */}
    {/* Left leg */}
    <line x1="60" y1="28" x2="38" y2="102" stroke="url(#mobiTowerGrad)" strokeWidth="3" strokeLinecap="round" />
    {/* Right leg */}
    <line x1="60" y1="28" x2="82" y2="102" stroke="url(#mobiTowerGrad)" strokeWidth="3" strokeLinecap="round" />
    {/* Center support */}
    <line x1="60" y1="28" x2="60" y2="102" stroke="url(#mobiTowerGrad)" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 2" opacity="0.8" />

    {/* Horizontal Platforms & Cross Bracing */}
    {/* Level 1 (top) */}
    <line x1="55" y1="42" x2="65" y2="42" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="55" y1="42" x2="65" y2="56" stroke="#38bdf8" strokeWidth="1.6" />
    <line x1="65" y1="42" x2="55" y2="56" stroke="#38bdf8" strokeWidth="1.6" />

    {/* Level 2 (mid) */}
    <line x1="51" y1="56" x2="69" y2="56" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="51" y1="56" x2="73" y2="74" stroke="#38bdf8" strokeWidth="1.6" />
    <line x1="69" y1="56" x2="47" y2="74" stroke="#38bdf8" strokeWidth="1.6" />

    {/* Level 3 (lower mid) */}
    <line x1="46" y1="74" x2="74" y2="74" stroke="#0284c7" strokeWidth="2.8" strokeLinecap="round" />
    <line x1="46" y1="74" x2="78" y2="94" stroke="#38bdf8" strokeWidth="1.8" />
    <line x1="74" y1="74" x2="42" y2="94" stroke="#38bdf8" strokeWidth="1.8" />

    {/* Level 4 (base) */}
    <line x1="41" y1="94" x2="79" y2="94" stroke="#0369a1" strokeWidth="3" strokeLinecap="round" />

    {/* Soft Stylized Clouds at Base */}
    <path
      d="M 22 108 C 22 101, 29 97, 36 99 C 40 93, 50 93, 55 98 C 60 92, 72 92, 77 98 C 84 94, 95 97, 98 104 C 102 106, 102 112, 97 114 C 92 116, 26 116, 22 108 Z"
      fill="url(#mobiCloudGrad)"
    />
  </svg>
);

// =========================================================================
// 2. VIỄN LIÊN V247: CUSTOMER SERVICE AGENT WITH HEADSET (PURPLE)
// =========================================================================
export const V247AgentIllustration: React.FC<{ className?: string }> = ({
  className = "w-24 h-24 sm:w-28 sm:h-28"
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 select-none drop-shadow-md transition-transform duration-300 group-hover/mcard:scale-105 ${className}`}
  >
    <defs>
      <linearGradient id="v247FaceGrad" x1="40" y1="35" x2="80" y2="75" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fed7aa" />
        <stop offset="100%" stopColor="#fbcfe8" />
      </linearGradient>
      <linearGradient id="v247SuitGrad" x1="25" y1="78" x2="95" y2="115" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#6d28d9" />
      </linearGradient>
      <linearGradient id="v247HeadsetGrad" x1="30" y1="20" x2="90" y2="60" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <radialGradient id="v247Glow" cx="60" cy="55" r="45" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#c084fc" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Background Soft Glow */}
    <circle cx="60" cy="55" r="42" fill="url(#v247Glow)" />

    {/* Radiating Sound Waves around headset */}
    <path d="M 22 45 A 14 14 0 0 0 22 65" stroke="#8b5cf6" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />
    <path d="M 16 38 A 24 24 0 0 0 16 72" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
    <path d="M 98 45 A 14 14 0 0 1 98 65" stroke="#8b5cf6" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />
    <path d="M 104 38 A 24 24 0 0 1 104 72" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />

    {/* Shoulders & Business Attire */}
    <path
      d="M 28 108 C 28 88, 44 80, 60 80 C 76 80, 92 88, 92 108 L 28 108 Z"
      fill="url(#v247SuitGrad)"
    />
    {/* Inner White Shirt Collar */}
    <path d="M 52 80 L 60 92 L 68 80 Z" fill="#ffffff" />
    <path d="M 60 92 L 60 108" stroke="#e2e8f0" strokeWidth="1.5" />

    {/* Neck */}
    <rect x="53" y="68" width="14" height="14" rx="4" fill="#fbcfe8" />

    {/* Head / Face */}
    <ellipse cx="60" cy="52" rx="20" ry="22" fill="url(#v247FaceGrad)" />

    {/* Neat Stylized Hair */}
    <path
      d="M 38 50 C 38 34, 46 25, 60 25 C 74 25, 82 34, 82 50 C 82 43, 76 33, 60 33 C 44 33, 38 43, 38 50 Z"
      fill="#1e1b4b"
    />
    <path d="M 40 42 C 48 35, 65 35, 76 43" stroke="#312e81" strokeWidth="3" strokeLinecap="round" />

    {/* Friendly Eyes and Smile */}
    <ellipse cx="52" cy="51" rx="2.5" ry="3" fill="#1e1b4b" />
    <ellipse cx="68" cy="51" rx="2.5" ry="3" fill="#1e1b4b" />
    <path d="M 54 62 Q 60 67 66 62" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* Professional Headset Band */}
    <path
      d="M 36 50 A 25 25 0 0 1 84 50"
      stroke="url(#v247HeadsetGrad)"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />

    {/* Headset Left Ear Cup (with metallic silver core) */}
    <rect x="30" y="44" width="8" height="16" rx="4" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
    {/* Headset Right Ear Cup */}
    <rect x="82" y="44" width="8" height="16" rx="4" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />

    {/* Microphone Boom Arm curving to Mouth */}
    <path
      d="M 36 56 C 36 68, 45 71, 54 71"
      stroke="#1e293b"
      strokeWidth="2.4"
      strokeLinecap="round"
      fill="none"
    />
    {/* Mic Capsule with Red LED */}
    <rect x="52" y="68" width="6" height="5" rx="2" fill="#0f172a" stroke="#ffffff" strokeWidth="0.8" />
    <circle cx="55" cy="70.5" r="1" fill="#22c55e" />
  </svg>
);

// =========================================================================
// 3. LBC - HTV: UPWARD GREEN GROWTH ARROW WITH CRYSTAL SPHERE (GREEN)
// =========================================================================
export const LBCGrowthIllustration: React.FC<{ className?: string }> = ({
  className = "w-24 h-24 sm:w-28 sm:h-28"
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 select-none drop-shadow-md transition-transform duration-300 group-hover/mcard:scale-105 ${className}`}
  >
    <defs>
      <linearGradient id="lbcArrowGrad" x1="25" y1="95" x2="95" y2="25" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="60%" stopColor="#059669" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <radialGradient id="lbcSphereGrad" cx="72" cy="72" r="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#10b981" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#047857" stopOpacity="0.9" />
      </radialGradient>
      <linearGradient id="lbcBarGrad" x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#a7f3d0" />
        <stop offset="100%" stopColor="#34d399" />
      </linearGradient>
    </defs>

    {/* Background Growth Pedestal / Bars */}
    <rect x="25" y="85" width="12" height="22" rx="3" fill="#d1fae5" opacity="0.8" />
    <rect x="42" y="70" width="12" height="37" rx="3" fill="#a7f3d0" opacity="0.9" />
    <rect x="59" y="52" width="12" height="55" rx="3" fill="#6ee7b7" opacity="0.95" />

    {/* Translucent 3D Crystal Sphere at Bottom Right */}
    <circle cx="78" cy="78" r="20" fill="url(#lbcSphereGrad)" />
    {/* Sphere Specular Highlight */}
    <ellipse cx="72" cy="70" rx="7" ry="4" fill="#ffffff" opacity="0.6" transform="rotate(-30 72 70)" />

    {/* Large Bold Dynamic Upward Growth Arrow */}
    <path
      d="M 28 92 C 38 88, 55 76, 70 54 L 70 42 L 95 62 L 84 25 L 50 36 L 61 46 C 48 64, 35 78, 25 82 Z"
      fill="url(#lbcArrowGrad)"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinejoin="round"
      filter="drop-shadow(0 4px 6px rgba(5, 150, 105, 0.4))"
    />

    {/* Success Stars / Sparkles */}
    <polygon points="98,18 100,24 106,26 100,28 98,34 96,28 90,26 96,24" fill="#34d399" />
    <polygon points="32,46 34,50 38,51 34,53 32,57 30,53 26,51 30,50" fill="#10b981" opacity="0.7" />
  </svg>
);

// =========================================================================
// 4. GARENA: 3D GAMING CONTROLLER / GAMEPAD (ROSE/RED)
// =========================================================================
export const GarenaControllerIllustration: React.FC<{ className?: string }> = ({
  className = "w-24 h-24 sm:w-28 sm:h-28"
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 select-none drop-shadow-md transition-transform duration-300 group-hover/mcard:scale-105 ${className}`}
  >
    <defs>
      <linearGradient id="garenaPadGrad" x1="30" y1="30" x2="90" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fb7185" />
        <stop offset="50%" stopColor="#f43f5e" />
        <stop offset="100%" stopColor="#e11d48" />
      </linearGradient>
      <linearGradient id="garenaHighlight" x1="40" y1="35" x2="80" y2="45" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="garenaGlow" cx="60" cy="60" r="45" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fda4af" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#fda4af" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Background Soft Glow */}
    <circle cx="60" cy="60" r="42" fill="url(#garenaGlow)" />

    {/* Motion Streaks / Game Power Aura */}
    <path d="M 18 35 Q 26 26 38 22" stroke="#fb7185" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    <path d="M 82 22 Q 94 26 102 35" stroke="#fb7185" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />

    {/* Main Gamepad Ergonomic Body */}
    <path
      d="M 38 38 C 48 36, 72 36, 82 38 C 96 40, 106 52, 102 78 C 99 94, 88 98, 76 84 C 70 76, 66 74, 60 74 C 54 74, 50 76, 44 84 C 32 98, 21 94, 18 78 C 14 52, 24 40, 38 38 Z"
      fill="url(#garenaPadGrad)"
      stroke="#ffffff"
      strokeWidth="2.5"
      strokeLinejoin="round"
      filter="drop-shadow(0 6px 12px rgba(225, 29, 72, 0.35))"
    />

    {/* Top Curved Gloss Highlight */}
    <path
      d="M 40 42 C 50 40, 70 40, 80 42"
      stroke="url(#garenaHighlight)"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* Left Directional D-Pad (Cross) */}
    <g transform="translate(36, 54)">
      <rect x="-3" y="-9" width="6" height="18" rx="2" fill="#1e1b4b" stroke="#ffffff" strokeWidth="0.8" />
      <rect x="-9" y="-3" width="18" height="6" rx="2" fill="#1e1b4b" stroke="#ffffff" strokeWidth="0.8" />
    </g>

    {/* Right Action ABXY Buttons */}
    <g transform="translate(84, 54)">
      {/* Top Button Y (Yellow) */}
      <circle cx="0" cy="-7" r="3.2" fill="#facc15" stroke="#ffffff" strokeWidth="0.8" />
      {/* Right Button B (Red) */}
      <circle cx="7" cy="0" r="3.2" fill="#ef4444" stroke="#ffffff" strokeWidth="0.8" />
      {/* Bottom Button A (Green) */}
      <circle cx="0" cy="7" r="3.2" fill="#22c55e" stroke="#ffffff" strokeWidth="0.8" />
      {/* Left Button X (Blue) */}
      <circle cx="-7" cy="0" r="3.2" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.8" />
    </g>

    {/* Left Analog Stick */}
    <circle cx="50" cy="65" r="6" fill="#0f172a" stroke="#ffffff" strokeWidth="1" />
    <circle cx="50" cy="65" r="3.5" fill="#334155" />

    {/* Center Menu & Home Buttons */}
    <circle cx="60" cy="50" r="3.5" fill="#ffffff" />
    <rect x="54" y="44" width="4" height="2" rx="1" fill="#ffffff" opacity="0.8" />
    <rect x="62" y="44" width="4" height="2" rx="1" fill="#ffffff" opacity="0.8" />

    {/* Action Sparkle */}
    <polygon points="102,28 104,33 109,35 104,37 102,42 100,37 95,35 100,33" fill="#f43f5e" />
  </svg>
);

// =========================================================================
// 5. SHOPEE: 3D ORANGE SHOPPING BAG WITH EMBOSSED LOGO (ORANGE)
// =========================================================================
export const ShopeeBagIllustration: React.FC<{ className?: string }> = ({
  className = "w-24 h-24 sm:w-28 sm:h-28"
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 select-none drop-shadow-md transition-transform duration-300 group-hover/mcard:scale-105 ${className}`}
  >
    <defs>
      <linearGradient id="shopeeBagGrad" x1="35" y1="42" x2="85" y2="105" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fb923c" />
        <stop offset="40%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="shopeeFoldGrad" x1="30" y1="42" x2="90" y2="42" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fdba74" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
      <radialGradient id="shopeeGlow" cx="60" cy="65" r="45" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#fed7aa" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Background Soft Glow */}
    <circle cx="60" cy="65" r="42" fill="url(#shopeeGlow)" />

    {/* Floating Ecommerce Sparkles */}
    <polygon points="26,38 28,42 32,44 28,46 26,50 24,46 20,44 24,42" fill="#f97316" />
    <polygon points="96,44 98,48 102,49 98,51 96,55 94,51 90,49 94,48" fill="#f59e0b" />
    <circle cx="94" cy="74" r="3" fill="#fb923c" opacity="0.6" />

    {/* White Shopping Bag Handles (Arched) */}
    <path
      d="M 48 48 C 48 28, 72 28, 72 48"
      stroke="#ffffff"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
      filter="drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))"
    />
    {/* Handle Attachments */}
    <rect x="45" y="44" width="6" height="7" rx="2" fill="#c2410c" />
    <rect x="69" y="44" width="6" height="7" rx="2" fill="#c2410c" />

    {/* Main Shopping Bag Body (Trapezoidal 3D Bag) */}
    <path
      d="M 36 46 L 84 46 L 92 102 C 92 106, 88 108, 84 108 L 36 108 C 32 108, 28 106, 28 102 Z"
      fill="url(#shopeeBagGrad)"
      stroke="#ffffff"
      strokeWidth="2.5"
      strokeLinejoin="round"
      filter="drop-shadow(0 6px 14px rgba(234, 88, 12, 0.35))"
    />

    {/* Top Fold Lip */}
    <path d="M 35 46 L 85 46 L 83 52 L 37 52 Z" fill="url(#shopeeFoldGrad)" opacity="0.9" />

    {/* Embossed Shopee 'S' Bag Motif */}
    <g transform="translate(60, 77)">
      {/* Mini White Bag Silhouette */}
      <path
        d="M -15 -14 L 15 -14 L 18 18 C 18 20, 16 22, 14 22 L -14 22 C -16 22, -18 20, -18 18 Z"
        fill="#ffffff"
        opacity="0.95"
      />
      {/* Handle on mini bag */}
      <path d="M -7 -14 C -7 -22, 7 -22, 7 -14" stroke="#ffffff" strokeWidth="2.2" fill="none" />
      {/* Shopee 'S' Mark */}
      <path
        d="M 7 -6 C 7 -10, -5 -10, -5 -4 C -5 2, 6 1, 6 7 C 6 13, -7 13, -7 7"
        stroke="#ea580c"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
    </g>

    {/* Text Label "Shopee" below logo */}
    <text
      x="60"
      y="104"
      textAnchor="middle"
      fill="#ffffff"
      fontSize="7.5"
      fontWeight="bold"
      letterSpacing="0.5"
    >
      Shopee
    </text>
  </svg>
);

// =========================================================================
// 6. PRUDENTIAL: PROTECTION SHIELD & HEART (PINK/MAGENTA)
// =========================================================================
export const PrudentialShieldIllustration: React.FC<{ className?: string }> = ({
  className = "w-24 h-24 sm:w-28 sm:h-28"
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 select-none drop-shadow-md transition-transform duration-300 group-hover/mcard:scale-105 ${className}`}
  >
    <defs>
      <linearGradient id="prudentialShieldGrad" x1="30" y1="20" x2="90" y2="105" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f472b6" />
        <stop offset="50%" stopColor="#db2777" />
        <stop offset="100%" stopColor="#be185d" />
      </linearGradient>
      <linearGradient id="prudentialHeartGrad" x1="45" y1="45" x2="75" y2="75" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#fce7f3" />
      </linearGradient>
      <radialGradient id="prudentialGlow" cx="60" cy="55" r="45" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fbcfe8" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#fbcfe8" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Background Soft Glow */}
    <circle cx="60" cy="55" r="42" fill="url(#prudentialGlow)" />

    {/* Protection Halo Waves */}
    <path d="M 28 28 A 45 45 0 0 1 92 28" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <path d="M 22 22 A 55 55 0 0 1 98 22" stroke="#fbcfe8" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />

    {/* Main Protection Shield */}
    <path
      d="M 60 22 C 78 22, 92 26, 92 46 C 92 74, 76 96, 60 106 C 44 96, 28 74, 28 46 C 28 26, 42 22, 60 22 Z"
      fill="url(#prudentialShieldGrad)"
      stroke="#ffffff"
      strokeWidth="2.5"
      strokeLinejoin="round"
      filter="drop-shadow(0 6px 12px rgba(219, 39, 119, 0.35))"
    />

    {/* Inner Subtle Border */}
    <path
      d="M 60 28 C 74 28, 85 31, 85 47 C 85 70, 72 88, 60 96 C 48 88, 35 70, 35 47 C 35 31, 46 28, 60 28 Z"
      stroke="#ffffff"
      strokeWidth="1.2"
      strokeDasharray="4 2"
      opacity="0.6"
      fill="none"
    />

    {/* White Gloss Reflection on Left Edge */}
    <path
      d="M 38 46 C 38 34, 46 30, 56 29"
      stroke="#ffffff"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.7"
    />

    {/* Central Empathy Heart Symbol */}
    <path
      d="M 60 74 C 60 74, 46 64, 46 53 C 46 47, 51 43, 56 43 C 58.5 43, 60 45, 60 45 C 60 45, 61.5 43, 64 43 C 69 43, 74 47, 74 53 C 74 64, 60 74, 60 74 Z"
      fill="url(#prudentialHeartGrad)"
      stroke="#ffffff"
      strokeWidth="1.5"
      filter="drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))"
    />

    {/* Caring Hands / Shield Sparkle */}
    <polygon points="86,30 88,34 92,35 88,37 86,41 84,37 80,35 84,34" fill="#ffffff" />
    <polygon points="34,70 36,73 39,74 36,75 34,78 32,75 29,74 32,73" fill="#f472b6" />
  </svg>
);

// =========================================================================
// 7. MOMO FINTECH: 3D SMARTPHONE & DIGITAL WALLET CARDS (PINK/FUCHSIA)
// =========================================================================
export const MoMoFinanceIllustration: React.FC<{ className?: string }> = ({
  className = "w-24 h-24 sm:w-28 sm:h-28"
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 select-none drop-shadow-md transition-transform duration-300 group-hover/mcard:scale-105 ${className}`}
  >
    <defs>
      <linearGradient id="momoPhoneGrad" x1="45" y1="20" x2="85" y2="105" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="60%" stopColor="#db2777" />
        <stop offset="100%" stopColor="#a21caf" />
      </linearGradient>
      <linearGradient id="momoCardGrad" x1="15" y1="50" x2="60" y2="85" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#c084fc" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <radialGradient id="momoGlow" cx="60" cy="60" r="45" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f472b6" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Background Soft Glow */}
    <circle cx="60" cy="60" r="42" fill="url(#momoGlow)" />

    {/* 3D Modern Smartphone */}
    <g transform="rotate(8 68 62)">
      {/* Phone Body */}
      <rect
        x="48"
        y="22"
        width="44"
        height="78"
        rx="9"
        fill="url(#momoPhoneGrad)"
        stroke="#ffffff"
        strokeWidth="2.5"
        filter="drop-shadow(0 6px 14px rgba(219, 39, 119, 0.4))"
      />
      {/* Screen Inset */}
      <rect x="52" y="27" width="36" height="68" rx="6" fill="#1e1b4b" />

      {/* Screen Notch / Speaker */}
      <rect x="64" y="29" width="12" height="2.5" rx="1.2" fill="#475569" />

      {/* MoMo Emblem on Screen */}
      <rect x="57" y="38" width="26" height="26" rx="6" fill="#db2777" />
      <text x="70" y="55" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900" fontFamily="sans-serif">
        mo
      </text>
      <text x="70" y="62" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
        mo
      </text>

      {/* Digital Pay Balance Pill */}
      <rect x="56" y="70" width="28" height="6" rx="3" fill="#ffffff" opacity="0.9" />
      <circle cx="61" cy="73" r="1.8" fill="#22c55e" />
    </g>

    {/* Floating 3D Credit Card (Foreground Left) */}
    <g transform="rotate(-15 36 78)">
      <rect
        x="16"
        y="58"
        width="44"
        height="28"
        rx="5"
        fill="url(#momoCardGrad)"
        stroke="#ffffff"
        strokeWidth="2"
        filter="drop-shadow(0 4px 10px rgba(124, 58, 237, 0.4))"
      />
      {/* EMV Chip */}
      <rect x="22" y="65" width="8" height="6" rx="1.5" fill="#facc15" stroke="#ffffff" strokeWidth="0.6" />
      {/* Card Magnetic Stripe / Lines */}
      <line x1="22" y1="76" x2="48" y2="76" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
      <circle cx="50" cy="65" r="3" fill="#f43f5e" opacity="0.8" />
      <circle cx="53" cy="65" r="3" fill="#fbbf24" opacity="0.8" />
    </g>

    {/* Floating Gold Fintech Coin */}
    <circle cx="30" cy="40" r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
    <circle cx="30" cy="40" r="4.5" fill="#fbbf24" />
    <text x="30" y="43" textAnchor="middle" fill="#78350f" fontSize="7" fontWeight="bold">
      $
    </text>

    {/* Sparkle */}
    <polygon points="98,40 100,44 104,45 100,47 98,51 96,47 92,45 96,44" fill="#f472b6" />
  </svg>
);

// =========================================================================
// 8. FINVIET: GOLD COIN STACK WITH ASCENDING TREND ARROW (GOLD/AMBER)
// =========================================================================
export const FinvietGoldCoinsIllustration: React.FC<{ className?: string }> = ({
  className = "w-24 h-24 sm:w-28 sm:h-28"
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 select-none drop-shadow-md transition-transform duration-300 group-hover/mcard:scale-105 ${className}`}
  >
    <defs>
      <linearGradient id="finvietCoinGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="finvietArrowGrad" x1="30" y1="90" x2="95" y2="25" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="60%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <radialGradient id="finvietGlow" cx="60" cy="65" r="45" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fde68a" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Background Soft Glow */}
    <circle cx="60" cy="65" r="42" fill="url(#finvietGlow)" />

    {/* Coin Stack 1 (Back Left, 3 coins) */}
    <g transform="translate(36, 68)">
      {/* Base coin 1 */}
      <ellipse cx="0" cy="20" rx="14" ry="5.5" fill="#d97706" />
      <ellipse cx="0" cy="18" rx="14" ry="5.5" fill="url(#finvietCoinGrad)" stroke="#ffffff" strokeWidth="0.8" />
      {/* Coin 2 */}
      <ellipse cx="0" cy="14" rx="14" ry="5.5" fill="#d97706" />
      <ellipse cx="0" cy="12" rx="14" ry="5.5" fill="url(#finvietCoinGrad)" stroke="#ffffff" strokeWidth="0.8" />
      {/* Coin 3 */}
      <ellipse cx="0" cy="8" rx="14" ry="5.5" fill="#d97706" />
      <ellipse cx="0" cy="6" rx="14" ry="5.5" fill="url(#finvietCoinGrad)" stroke="#ffffff" strokeWidth="0.8" />
    </g>

    {/* Coin Stack 2 (Main Center, 5 coins) */}
    <g transform="translate(68, 62)">
      {/* Coin 1 */}
      <ellipse cx="0" cy="26" rx="18" ry="7" fill="#b45309" />
      <ellipse cx="0" cy="24" rx="18" ry="7" fill="url(#finvietCoinGrad)" stroke="#ffffff" strokeWidth="1" />
      {/* Coin 2 */}
      <ellipse cx="0" cy="19" rx="18" ry="7" fill="#b45309" />
      <ellipse cx="0" cy="17" rx="18" ry="7" fill="url(#finvietCoinGrad)" stroke="#ffffff" strokeWidth="1" />
      {/* Coin 3 */}
      <ellipse cx="0" cy="12" rx="18" ry="7" fill="#b45309" />
      <ellipse cx="0" cy="10" rx="18" ry="7" fill="url(#finvietCoinGrad)" stroke="#ffffff" strokeWidth="1" />
      {/* Coin 4 */}
      <ellipse cx="0" cy="5" rx="18" ry="7" fill="#b45309" />
      <ellipse cx="0" cy="3" rx="18" ry="7" fill="url(#finvietCoinGrad)" stroke="#ffffff" strokeWidth="1" />
      {/* Coin 5 (Top coin with gold dollar / star symbol) */}
      <ellipse cx="0" cy="-2" rx="18" ry="7" fill="#b45309" />
      <ellipse cx="0" cy="-4" rx="18" ry="7" fill="url(#finvietCoinGrad)" stroke="#ffffff" strokeWidth="1.2" />
      <ellipse cx="0" cy="-4" rx="12" ry="4.5" fill="none" stroke="#fef08a" strokeWidth="1" />
    </g>

    {/* Dynamic Ascending Growth Trend Arrow */}
    <path
      d="M 28 96 C 42 90, 58 74, 76 46 L 76 34 L 102 54 L 92 16 L 56 26 L 68 38 C 54 58, 40 76, 26 84 Z"
      fill="url(#finvietArrowGrad)"
      stroke="#ffffff"
      strokeWidth="2.2"
      strokeLinejoin="round"
      filter="drop-shadow(0 6px 12px rgba(217, 119, 6, 0.4))"
    />

    {/* Sparkles */}
    <polygon points="100,12 102,17 107,18 102,20 100,25 98,20 93,18 98,17" fill="#f59e0b" />
    <polygon points="25,58 27,62 31,63 27,65 25,69 23,65 19,63 23,62" fill="#10b981" />
  </svg>
);
