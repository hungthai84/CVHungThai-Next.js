import React from "react";

interface SVGIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const GlassIconSvg: React.FC<{ name: string; size?: number | string; className?: string }> = ({
  name,
  size = 32,
  className = ""
}) => {
  const normName = (name || "").toLowerCase().trim();
  const pxSize = typeof size === "number" ? `${size}px` : size;

  // Base SVG wrapper props
  const svgProps = {
    width: pxSize,
    height: pxSize,
    viewBox: "0 0 64 64",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: `inline-block shrink-0 transition-transform duration-300 ${className}`
  };

  switch (normName) {
    case "home":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="home-roof" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>
            <linearGradient id="home-glass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="home-door" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          {/* Glass Base */}
          <path d="M12 28L32 10L52 28V52C52 54.2091 50.2091 56 48 56H16C13.7909 56 12 54.2091 12 52V28Z" fill="url(#home-glass)" />
          {/* 3D Roof */}
          <path d="M8 28L32 7L56 28L51 32L32 15L13 32L8 28Z" fill="url(#home-roof)" />
          {/* Glowing Door */}
          <rect x="25" y="34" width="14" height="22" rx="4" fill="url(#home-door)" />
          {/* Glossy Reflection */}
          <path d="M16 28L32 14L48 28" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
          <circle cx="37" cy="45" r="1.5" fill="#FEF3C7" />
        </svg>
      );

    case "about":
    case "user":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="user-head" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="user-glass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F472B6" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#C084FC" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path d="M14 54C14 44.0589 22.0589 36 32 36C41.9411 36 50 44.0589 50 54V56H14V54Z" fill="url(#user-glass)" />
          <circle cx="32" cy="22" r="12" fill="url(#user-head)" />
          <path d="M24 18C26 14 30 12 34 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
          <path d="M20 50C24 44 30 40 38 41" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
        </svg>
      );

    case "skills":
    case "target":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="target-ring" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="target-center" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="26" fill="#06B6D4" fillOpacity="0.2" stroke="url(#target-ring)" strokeWidth="3" />
          <circle cx="32" cy="32" r="16" fill="#3B82F6" fillOpacity="0.3" stroke="white" strokeWidth="2" strokeOpacity="0.6" />
          <circle cx="32" cy="32" r="8" fill="url(#target-center)" />
          <path d="M32 6V14M32 50V58M6 32H14M50 32H58" stroke="url(#target-ring)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case "education":
    case "graduation":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="grad-cap" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4338CA" />
            </linearGradient>
            <linearGradient id="grad-glass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818CF8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#C7D2FE" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {/* Cap Top Diamond */}
          <polygon points="32,10 58,22 32,34 6,22" fill="url(#grad-cap)" />
          {/* Glass Base Under Cap */}
          <path d="M18 30V44C18 47.3137 24.268 50 32 50C39.732 50 46 47.3137 46 44V30" fill="url(#grad-glass)" stroke="#818CF8" strokeWidth="2" />
          {/* Tassel */}
          <path d="M50 23V40L54 44" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <circle cx="54" cy="45" r="3" fill="#F59E0B" />
          <polygon points="32,13 52,22 32,31 12,22" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
        </svg>
      );

    case "experience":
    case "briefcase":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="case-body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="case-glass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0.25" />
            </linearGradient>
          </defs>
          {/* Handle */}
          <path d="M24 16V12C24 9.79086 25.7909 8 28 8H36C38.2091 8 40 9.79086 40 12V16" stroke="#059669" strokeWidth="3" fill="none" />
          {/* Case Main Body */}
          <rect x="8" y="16" width="48" height="38" rx="8" fill="url(#case-glass)" />
          <path d="M8 28H56" stroke="url(#case-body)" strokeWidth="4" />
          <rect x="27" y="24" width="10" height="8" rx="2" fill="#F59E0B" stroke="white" strokeWidth="1" />
          <path d="M12 20H52" stroke="white" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round" />
        </svg>
      );

    case "projects":
    case "kanban":
    case "folder":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="folder-back" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="folder-glass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path d="M8 18C8 15.7909 9.79086 14 12 14H24L29 20H52C54.2091 20 56 21.7909 56 24V48C56 50.2091 54.2091 52 52 52H12C9.79086 52 8 50.2091 8 48V18Z" fill="url(#folder-back)" />
          <path d="M8 26C8 23.7909 9.79086 22 12 22H52C54.2091 22 56 23.7909 56 26V48C56 50.2091 54.2091 52 52 52H12C9.79086 52 8 50.2091 8 48V26Z" fill="url(#folder-glass)" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
          <rect x="18" y="32" width="12" height="12" rx="3" fill="#3B82F6" />
          <rect x="34" y="32" width="12" height="12" rx="3" fill="#10B981" />
        </svg>
      );

    case "memories":
    case "camera":
    case "gallery":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="cam-body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#BE185D" />
            </linearGradient>
            <linearGradient id="cam-glass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#67E8F9" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path d="M22 14L26 10H38L42 14H50C53.3137 14 56 16.6863 56 20V48C56 51.3137 53.3137 54 50 54H14C10.6863 54 8 51.3137 8 48V20C8 16.6863 10.6863 14 14 14H22Z" fill="url(#cam-body)" />
          <circle cx="32" cy="34" r="14" fill="url(#cam-glass)" stroke="white" strokeWidth="2" strokeOpacity="0.7" />
          <circle cx="32" cy="34" r="7" fill="#1E293B" />
          <circle cx="48" cy="22" r="2.5" fill="#F59E0B" />
        </svg>
      );

    case "interview":
    case "video":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="video-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="video-glass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <rect x="8" y="16" width="34" height="32" rx="8" fill="url(#video-glass)" stroke="url(#video-grad)" strokeWidth="2" />
          <path d="M42 26L56 18V46L42 38V26Z" fill="url(#video-grad)" stroke="white" strokeWidth="1.5" />
          <circle cx="25" cy="32" r="6" fill="white" />
          <polygon points="23,29 29,32 23,35" fill="#047857" />
        </svg>
      );

    case "cover-letter":
    case "letter":
    case "envelope":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="env-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="env-glass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <rect x="8" y="16" width="48" height="36" rx="6" fill="url(#env-glass)" stroke="url(#env-grad)" strokeWidth="2" />
          <path d="M8 18L32 36L56 18" fill="none" stroke="url(#env-grad)" strokeWidth="3" strokeLinejoin="round" />
          <path d="M10 20L32 37L54 20" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.8" />
        </svg>
      );

    case "ai-chat":
    case "chat":
    case "messages":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="ai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          <path d="M12 14C12 10.6863 14.6863 8 18 8H46C49.3137 8 52 10.6863 52 14V36C52 39.3137 49.3137 42 46 42H24L14 52V42H18C14.6863 42 12 39.3137 12 36V14Z" fill="url(#ai-grad)" fillOpacity="0.3" stroke="url(#ai-grad)" strokeWidth="2" />
          {/* Sparkles inside */}
          <path d="M32 16L34 22L40 24L34 26L32 32L30 26L24 24L30 22L32 16Z" fill="#F43F5E" />
          <path d="M42 28L43 31L46 32L43 33L42 36L41 33L38 32L41 31L42 28Z" fill="#3B82F6" />
        </svg>
      );

    case "scheduler":
    case "calendar":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="cal-top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
          </defs>
          <rect x="8" y="16" width="48" height="40" rx="6" fill="#FEE2E2" fillOpacity="0.3" stroke="#EF4444" strokeWidth="2" />
          <path d="M8 20C8 17.7909 9.79086 16 12 16H52C54.2091 16 56 17.7909 56 20V26H8V20Z" fill="url(#cal-top)" />
          <rect x="18" y="10" width="4" height="10" rx="2" fill="#B91C1C" />
          <rect x="42" y="10" width="4" height="10" rx="2" fill="#B91C1C" />
          <circle cx="20" cy="34" r="3" fill="#3B82F6" />
          <circle cx="32" cy="34" r="3" fill="#EF4444" />
          <circle cx="44" cy="34" r="3" fill="#10B981" />
          <circle cx="20" cy="46" r="3" fill="#F59E0B" />
          <circle cx="32" cy="46" r="3" fill="#8B5CF6" />
        </svg>
      );

    case "systems":
    case "server":
    case "cpu":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="cpu-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
          </defs>
          <rect x="14" y="14" width="36" height="36" rx="8" fill="#38BDF8" fillOpacity="0.3" stroke="url(#cpu-grad)" strokeWidth="3" />
          <rect x="24" y="24" width="16" height="16" rx="4" fill="url(#cpu-grad)" />
          <path d="M22 6V14M32 6V14M42 6V14M22 50V58M32 50V58M42 50V58M6 22H14M6 32H14M6 42H14M50 22H58M50 32H58M50 42H58" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case "settings":
    case "sliders":
    case "gear":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="gear-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="18" fill="#94A3B8" fillOpacity="0.3" stroke="url(#gear-grad)" strokeWidth="3" />
          <circle cx="32" cy="32" r="8" fill="url(#gear-grad)" />
          <path d="M32 8V14M32 50V56M8 32H14M50 32H56M15 15L19 19M45 45L49 49M15 49L19 45M45 19L49 15" stroke="url(#gear-grad)" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case "contact":
    case "phone":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="phone-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <path d="M18 10C16 10 14 12 14 14C14 30 34 50 50 50C52 50 54 48 54 46V38L42 34L36 40C28 35 25 28 20 22L26 16L22 4H18Z" fill="url(#phone-grad)" fillOpacity="0.4" stroke="url(#phone-grad)" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="44" cy="20" r="10" fill="#3B82F6" />
          <path d="M40 20L43 23L48 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "tuvi":
    case "sparkle":
    case "sparkles":
      return (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="star-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          <path d="M32 4L37.5 21.5L55 27L37.5 32.5L32 50L26.5 32.5L9 27L26.5 21.5L32 4Z" fill="url(#star-gold)" stroke="white" strokeWidth="1.5" />
          <path d="M48 40L50.5 48L58.5 50.5L50.5 53L48 61L45.5 53L37.5 50.5L45.5 48L48 40Z" fill="#8B5CF6" />
          <path d="M16 10L17.5 15L22.5 16.5L17.5 18L16 23L14.5 18L9.5 16.5L14.5 15L16 10Z" fill="#38BDF8" />
        </svg>
      );

    case "search":
      return (
        <svg {...svgProps}>
          <circle cx="28" cy="28" r="18" fill="#38BDF8" fillOpacity="0.3" stroke="#0284C7" strokeWidth="4" />
          <path d="M41 41L56 56" stroke="#0284C7" strokeWidth="5" strokeLinecap="round" />
          <circle cx="24" cy="22" r="6" fill="white" fillOpacity="0.5" />
        </svg>
      );

    case "menu":
      return (
        <svg {...svgProps}>
          <rect x="10" y="14" width="44" height="6" rx="3" fill="#3B82F6" />
          <rect x="10" y="29" width="44" height="6" rx="3" fill="#8B5CF6" />
          <rect x="10" y="44" width="44" height="6" rx="3" fill="#EC4899" />
        </svg>
      );

    case "close":
    case "x":
      return (
        <svg {...svgProps}>
          <circle cx="32" cy="32" r="26" fill="#EF4444" fillOpacity="0.25" stroke="#EF4444" strokeWidth="2" />
          <path d="M20 20L44 44M44 20L20 44" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case "arrow-left":
    case "chevron-left":
      return (
        <svg {...svgProps}>
          <path d="M38 14L20 32L38 50" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "arrow-right":
    case "chevron-right":
      return (
        <svg {...svgProps}>
          <path d="M26 14L44 32L26 50" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "chevron-down":
      return (
        <svg {...svgProps}>
          <path d="M14 24L32 42L50 24" stroke="#6366F1" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "check":
      return (
        <svg {...svgProps}>
          <circle cx="32" cy="32" r="24" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="3" />
          <path d="M18 32L28 42L46 22" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "plus":
      return (
        <svg {...svgProps}>
          <circle cx="32" cy="32" r="24" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="3" />
          <path d="M32 16V48M16 32H48" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case "edit":
    case "pencil":
      return (
        <svg {...svgProps}>
          <path d="M42 10L54 22L24 52H12V40L42 10Z" fill="#F59E0B" fillOpacity="0.4" stroke="#D97706" strokeWidth="3" strokeLinejoin="round" />
          <path d="M36 16L48 28" stroke="white" strokeWidth="2" />
        </svg>
      );

    case "delete":
    case "trash":
      return (
        <svg {...svgProps}>
          <path d="M16 20H48V52C48 54.2 46.2 56 44 56H20C17.8 56 16 54.2 16 52V20Z" fill="#EF4444" fillOpacity="0.3" stroke="#EF4444" strokeWidth="3" />
          <path d="M10 20H54M24 20V12C24 10 26 8 28 8H36C38 8 40 10 40 12V20" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case "download":
      return (
        <svg {...svgProps}>
          <path d="M32 10V38M32 38L20 26M32 38L44 26" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 48H52" stroke="#6366F1" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case "external-link":
    case "external":
      return (
        <svg {...svgProps}>
          <path d="M26 14H14V50H50V38M36 14H50V28M50 14L28 36" stroke="#06B6D4" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "play":
      return (
        <svg {...svgProps}>
          <circle cx="32" cy="32" r="26" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2.5" />
          <polygon points="25,20 45,32 25,44" fill="#10B981" stroke="white" strokeWidth="1.5" />
        </svg>
      );

    case "pause":
      return (
        <svg {...svgProps}>
          <circle cx="32" cy="32" r="26" fill="#F59E0B" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="2.5" />
          <rect x="22" y="20" width="7" height="24" rx="3" fill="#F59E0B" />
          <rect x="35" y="20" width="7" height="24" rx="3" fill="#F59E0B" />
        </svg>
      );

    case "palette":
      return (
        <svg {...svgProps}>
          <path d="M32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56C36 56 38 53 38 50C38 48.5 38.5 47 39.5 46C40.5 45 42 44.5 44 44.5C49 44.5 56 40 56 32C56 18.7452 45.2548 8 32 8Z" fill="#EC4899" fillOpacity="0.25" stroke="#EC4899" strokeWidth="3" />
          <circle cx="20" cy="24" r="4" fill="#EF4444" />
          <circle cx="32" cy="18" r="4" fill="#F59E0B" />
          <circle cx="44" cy="24" r="4" fill="#10B981" />
          <circle cx="48" cy="36" r="4" fill="#3B82F6" />
        </svg>
      );

    case "sun":
      return (
        <svg {...svgProps}>
          <circle cx="32" cy="32" r="14" fill="#F59E0B" />
          <circle cx="32" cy="32" r="20" stroke="#FBBF24" strokeWidth="2" strokeDasharray="4 4" fill="none" />
          <path d="M32 6V12M32 52V58M6 32H12M52 32H58M13.6 13.6L17.8 17.8M46.2 46.2L50.4 50.4M13.6 50.4L17.8 46.2M46.2 17.8L50.4 13.6" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case "moon":
      return (
        <svg {...svgProps}>
          <path d="M42 54C25.4315 54 12 40.5685 12 24C12 17.0673 14.3482 10.6833 18.3 5.5C12.1 9.5 8 16.3 8 24C8 37.2548 18.7452 48 32 48C39.7 48 46.5 43.9 50.5 37.7C45.3167 41.6518 38.9327 44 32 44Z" fill="#6366F1" fillOpacity="0.4" stroke="#818CF8" strokeWidth="3" />
          <path d="M46 12L48 18L54 20L48 22L46 28L44 22L38 20L44 18L46 12Z" fill="#F59E0B" />
        </svg>
      );

    case "globe":
      return (
        <svg {...svgProps}>
          <circle cx="32" cy="32" r="24" fill="#38BDF8" fillOpacity="0.3" stroke="#0284C7" strokeWidth="3" />
          <ellipse cx="32" cy="32" rx="12" ry="24" stroke="#0284C7" strokeWidth="2" fill="none" />
          <line x1="8" y1="32" x2="56" y2="32" stroke="#0284C7" strokeWidth="2" />
          <line x1="14" y1="20" x2="50" y2="20" stroke="#0284C7" strokeWidth="1.5" />
          <line x1="14" y1="44" x2="50" y2="44" stroke="#0284C7" strokeWidth="1.5" />
        </svg>
      );

    case "volume":
    case "volume-2":
      return (
        <svg {...svgProps}>
          <path d="M14 24H24L38 12V52L24 40H14V24Z" fill="#3B82F6" stroke="#2563EB" strokeWidth="2" />
          <path d="M46 20C49 24 49 40 46 44" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M54 14C60 21 60 43 54 50" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );

    case "volume-x":
    case "mute":
      return (
        <svg {...svgProps}>
          <path d="M14 24H24L38 12V52L24 40H14V24Z" fill="#EF4444" stroke="#DC2626" strokeWidth="2" />
          <path d="M46 24L58 36M58 24L46 36" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case "pin":
      return (
        <svg {...svgProps}>
          <path d="M38 10L54 26L42 32L34 50L26 42L14 34L32 26L38 10Z" fill="#F59E0B" fillOpacity="0.4" stroke="#D97706" strokeWidth="3" />
          <line x1="20" y1="44" x2="8" y2="56" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case "file-pdf":
    case "file":
      return (
        <svg {...svgProps}>
          <path d="M14 10C14 7.79086 15.7909 6 18 6H38L50 18V54C50 56.2091 48.2091 58 46 58H18C15.7909 58 14 56.2091 14 54V10Z" fill="#EF4444" fillOpacity="0.3" stroke="#DC2626" strokeWidth="3" />
          <polygon points="38,6 50,18 38,18" fill="#DC2626" />
          <rect x="22" y="30" width="20" height="18" rx="3" fill="#EF4444" />
          <text x="32" y="43" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">PDF</text>
        </svg>
      );

    case "layers":
      return (
        <svg {...svgProps}>
          <polygon points="32,8 56,20 32,32 8,20" fill="#3B82F6" stroke="white" strokeWidth="1.5" />
          <polygon points="32,22 56,34 32,46 8,34" fill="#8B5CF6" fillOpacity="0.7" stroke="white" strokeWidth="1.5" />
          <polygon points="32,36 56,48 32,60 8,48" fill="#EC4899" fillOpacity="0.7" stroke="white" strokeWidth="1.5" />
        </svg>
      );

    case "maximize":
    case "expand":
      return (
        <svg {...svgProps}>
          <path d="M12 24V12H24M52 24V12H40M12 40V52H24M52 40V52H40" stroke="#06B6D4" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "minimize":
    case "compress":
      return (
        <svg {...svgProps}>
          <path d="M24 12V24H12M40 12V24H52M24 52V40H12M40 52V40H52" stroke="#06B6D4" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "refresh":
    case "rotate":
      return (
        <svg {...svgProps}>
          <path d="M52 24C48.5 16 41 10 32 10C19.8 10 10 19.8 10 32C10 44.2 19.8 54 32 54C42 54 50 47.5 53 38" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" fill="none" />
          <polygon points="52,14 54,26 42,24" fill="#3B82F6" />
        </svg>
      );

    case "info":
      return (
        <svg {...svgProps}>
          <circle cx="32" cy="32" r="24" fill="#38BDF8" fillOpacity="0.3" stroke="#0284C7" strokeWidth="3" />
          <circle cx="32" cy="20" r="3.5" fill="#0284C7" />
          <line x1="32" y1="28" x2="32" y2="44" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case "star":
    default:
      return (
        <svg {...svgProps}>
          <polygon points="32,6 40,22 58,24 44,36 48,54 32,44 16,54 20,36 6,24 24,22" fill="#F59E0B" fillOpacity="0.4" stroke="#D97706" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      );
  }
};
