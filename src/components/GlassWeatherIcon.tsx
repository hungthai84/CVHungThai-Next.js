import React from "react";

export type WeatherIconType = 
  | "sun" 
  | "moon" 
  | "cloud-sun" 
  | "cloud-moon" 
  | "cloud" 
  | "rain-drop" 
  | "rain-heavy" 
  | "lightning" 
  | "snow" 
  | "fog";

interface GlassWeatherIconProps {
  type?: WeatherIconType;
  weatherCode?: number;
  isDay?: boolean;
  className?: string;
  size?: number | string;
}

export function getIconTypeFromCode(code: number, isDay: boolean): WeatherIconType {
  if (code === 0) {
    return isDay ? "sun" : "moon";
  }
  if (code <= 3) {
    return isDay ? "cloud-sun" : "cloud-moon";
  }
  if (code === 45 || code === 48) {
    return "fog";
  }
  if (code >= 51 && code <= 57) {
    return "rain-drop";
  }
  if (code >= 61 && code <= 67) {
    return "rain-drop";
  }
  if (code >= 71 && code <= 77) {
    return "snow";
  }
  if (code >= 80 && code <= 82) {
    return "rain-heavy";
  }
  if (code >= 95) {
    return "lightning";
  }
  return isDay ? "cloud-sun" : "cloud-moon";
}

export default function GlassWeatherIcon({
  type,
  weatherCode,
  isDay = true,
  className = "w-8 h-8",
  size
}: GlassWeatherIconProps) {
  const iconType: WeatherIconType = type || (weatherCode !== undefined ? getIconTypeFromCode(weatherCode, isDay) : (isDay ? "sun" : "moon"));

  const idSuffix = React.useId().replace(/:/g, "_");

  return (
    <svg
      viewBox="0 0 120 100"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* ================= FILTERS ================= */}
        {/* Soft Shadow Filter for Back Elements */}
        <filter id={`elementGlow_${idSuffix}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Frosted Cloud Drop Shadow */}
        <filter id={`cloudShadow_${idSuffix}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0f172a" floodOpacity="0.18" />
        </filter>

        {/* Rain Drops Glow */}
        <filter id={`rainGlow_${idSuffix}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* ================= GRADIENTS ================= */}
        {/* 1. SUN GRADIENT */}
        <radialGradient id={`sunGrad_${idSuffix}`} cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="35%" stopColor="#fde047" />
          <stop offset="70%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ea580c" />
        </radialGradient>

        <linearGradient id={`sunRaysGrad_${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>

        {/* 2. MOON GRADIENT */}
        <linearGradient id={`moonGrad_${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>

        {/* 3. LIGHTNING GRADIENT */}
        <linearGradient id={`lightningGrad_${idSuffix}`} x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>

        {/* 4. RAINDROP GRADIENT */}
        <linearGradient id={`raindropGrad_${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="40%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>

        {/* 5. RAIN BARS GRADIENTS */}
        <linearGradient id={`rainBar1_${idSuffix}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id={`rainBar2_${idSuffix}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id={`rainBar3_${idSuffix}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>

        {/* 6. SNOWFLAKE GRADIENT */}
        <linearGradient id={`snowGrad_${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>

        {/* 7. FROSTED CLOUD GLASS GRADIENT (Front Face) */}
        <linearGradient id={`cloudGlassGrad_${idSuffix}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.88" />
          <stop offset="60%" stopColor="#f8fafc" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.82" />
        </linearGradient>

        {/* Cloud Specular Highlight Stroke */}
        <linearGradient id={`cloudBorderGrad_${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* ================= 1. BACKGROUND METEOROLOGICAL ELEMENT ================= */}
      
      {/* 1.1 SUN / CLOUD-SUN */}
      {(iconType === "sun" || iconType === "cloud-sun") && (
        <g filter={`url(#elementGlow_${idSuffix})`}>
          {/* Sun Rays */}
          <g stroke={`url(#sunRaysGrad_${idSuffix})`} strokeWidth="3.5" strokeLinecap="round">
            <line x1="84" y1="8" x2="84" y2="15" />
            <line x1="102" y1="16" x2="97" y2="21" />
            <line x1="109" y1="34" x2="102" y2="34" />
            <line x1="102" y1="51" x2="97" y2="47" />
            <line x1="66" y1="16" x2="71" y2="21" />
          </g>
          {/* Glowing Sun Orb */}
          <circle cx="84" cy="34" r="18" fill={`url(#sunGrad_${idSuffix})`} />
          <circle cx="80" cy="30" r="16" fill="#ffffff" fillOpacity="0.25" />
        </g>
      )}

      {/* 1.2 MOON / CLOUD-MOON */}
      {(iconType === "moon" || iconType === "cloud-moon") && (
        <g filter={`url(#elementGlow_${idSuffix})`}>
          <path
            d="M 68 12 
               C 84 14, 98 28, 98 46 
               C 98 62, 85 76, 68 78 
               C 78 72, 84 60, 84 46 
               C 84 31, 77 19, 68 12 Z"
            fill={`url(#moonGrad_${idSuffix})`}
          />
          {/* Crescent glossy rim highlight */}
          <path
            d="M 70 14 
               C 83 17, 95 29, 95 46 
               C 95 59, 85 71, 71 75"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />
        </g>
      )}

      {/* 1.3 LIGHTNING */}
      {iconType === "lightning" && (
        <g filter={`url(#elementGlow_${idSuffix})`}>
          <polygon
            points="62,28 48,52 60,52 52,86 74,48 60,48"
            fill={`url(#lightningGrad_${idSuffix})`}
            stroke="#ffffff"
            strokeWidth="0.8"
            strokeOpacity="0.7"
          />
        </g>
      )}

      {/* 1.4 RAIN BARS (Heavy Rain) */}
      {iconType === "rain-heavy" && (
        <g filter={`url(#rainGlow_${idSuffix})`}>
          {/* Bar 1 */}
          <rect x="36" y="58" width="5.5" height="26" rx="2.75" fill={`url(#rainBar1_${idSuffix})`} />
          <rect x="36" y="87" width="5.5" height="7" rx="2.75" fill={`url(#rainBar1_${idSuffix})`} />
          {/* Bar 2 */}
          <rect x="49" y="54" width="5.5" height="28" rx="2.75" fill={`url(#rainBar2_${idSuffix})`} />
          <rect x="49" y="85" width="5.5" height="9" rx="2.75" fill={`url(#rainBar2_${idSuffix})`} />
          {/* Bar 3 */}
          <rect x="62" y="58" width="5.5" height="24" rx="2.75" fill={`url(#rainBar3_${idSuffix})`} />
          <rect x="62" y="85" width="5.5" height="8" rx="2.75" fill={`url(#rainBar3_${idSuffix})`} />
          {/* Bar 4 */}
          <rect x="75" y="54" width="5.5" height="27" rx="2.75" fill={`url(#rainBar1_${idSuffix})`} />
          <rect x="75" y="84" width="5.5" height="8" rx="2.75" fill={`url(#rainBar1_${idSuffix})`} />
        </g>
      )}

      {/* 1.5 SINGLE BIG RAINDROP */}
      {iconType === "rain-drop" && (
        <g filter={`url(#elementGlow_${idSuffix})`}>
          <path
            d="M 60 48 
               C 60 48, 44 68, 44 78 
               C 44 87, 51 94, 60 94 
               C 69 94, 76 87, 76 78 
               C 76 68, 60 48, 60 48 Z"
            fill={`url(#raindropGrad_${idSuffix})`}
          />
          {/* Glossy Drop Highlight */}
          <path
            d="M 50 74 C 50 68, 56 58, 58 54"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.75"
          />
        </g>
      )}

      {/* 1.6 SNOWFLAKE */}
      {iconType === "snow" && (
        <g filter={`url(#elementGlow_${idSuffix})`}>
          <g transform="translate(60, 68)" stroke={`url(#snowGrad_${idSuffix})`} strokeWidth="3" strokeLinecap="round">
            {/* 6 Radial Axes with branches */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <g key={i} transform={`rotate(${angle})`}>
                <line x1="0" y1="0" x2="0" y2="24" />
                <line x1="0" y1="14" x2="-6" y2="20" />
                <line x1="0" y1="14" x2="6" y2="20" />
              </g>
            ))}
            <circle cx="0" cy="0" r="3.5" fill="#38bdf8" />
          </g>
        </g>
      )}

      {/* 1.7 FOG LINES */}
      {iconType === "fog" && (
        <g stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" opacity="0.8">
          <line x1="30" y1="72" x2="90" y2="72" />
          <line x1="38" y1="80" x2="82" y2="80" />
          <line x1="46" y1="88" x2="74" y2="88" />
        </g>
      )}

      {/* ================= 2. FOREGROUND FROSTED GLASS CLOUD ================= */}
      {/* If pure sun without cloud, we render a standalone luminous sun; otherwise render the signature glass cloud */}
      {iconType !== "sun" && (
        <g filter={`url(#cloudShadow_${idSuffix})`}>
          {/* Cloud Back Plate Shape */}
          <path
            d="M 38 72 
               L 82 72 
               A 16 16 0 0 0 94 46 
               A 20 20 0 0 0 68 28 
               A 24 24 0 0 0 28 42 
               A 16 16 0 0 0 38 72 Z"
            fill={`url(#cloudGlassGrad_${idSuffix})`}
          />

          {/* Inner Gloss / Depth Dome */}
          <circle cx="48" cy="46" r="18" fill="#ffffff" fillOpacity="0.25" />
          <circle cx="74" cy="50" r="14" fill="#ffffff" fillOpacity="0.15" />

          {/* Glass Contour Specular Stroke */}
          <path
            d="M 38 72 
               L 82 72 
               A 16 16 0 0 0 94 46 
               A 20 20 0 0 0 68 28 
               A 24 24 0 0 0 28 42 
               A 16 16 0 0 0 38 72 Z"
            stroke={`url(#cloudBorderGrad_${idSuffix})`}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Glass Top Highlight Arc */}
          <path
            d="M 32 40 A 22 22 0 0 1 64 30"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeOpacity="0.8"
          />
        </g>
      )}

      {/* Standalone Sun Foreground (when iconType is "sun") */}
      {iconType === "sun" && (
        <g filter={`url(#cloudShadow_${idSuffix})`}>
          {/* Subtle decorative glass puff */}
          <path
            d="M 32 74 
               L 72 74 
               A 14 14 0 0 0 82 52 
               A 18 18 0 0 0 58 36 
               A 20 20 0 0 0 24 48 
               A 14 14 0 0 0 32 74 Z"
            fill={`url(#cloudGlassGrad_${idSuffix})`}
            stroke={`url(#cloudBorderGrad_${idSuffix})`}
            strokeWidth="1.5"
            opacity="0.85"
          />
        </g>
      )}
    </svg>
  );
}
