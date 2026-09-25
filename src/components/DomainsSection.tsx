import React from "react";
import { useLanguage } from "../i18n";
import { PageCardHeader } from "./PageCardHeader";
import { 
  Globe, 
  Smartphone, 
  ShoppingCart, 
  ShieldCheck, 
  Wallet, 
  Layers, 
  Box, 
  Quote,
  Wifi,
  Zap,
  Radio,
  ShoppingBag,
  Tag,
  Truck,
  Heart,
  Lock,
  CheckCircle2,
  Gamepad2,
  CreditCard,
  Sparkles,
  Coins,
  QrCode,
  ArrowUpRight,
  Cpu,
  Database,
  Cloud
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

// --- HIGH-FIDELITY BRAND LOGOS USING USER ASSETS ---

// Generic Brand Logo Badge Container - Logos fill circular container completely
const BrandLogoBadge = ({ src, alt, title }: { src: string; alt: string; title: string }) => (
  <div 
    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200/90 flex items-center justify-center shadow-xs hover:scale-110 transition-transform duration-300 select-none shrink-0 overflow-hidden p-0"
    title={title}
  >
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-cover" 
      referrerPolicy="no-referrer"
      loading="lazy"
    />
  </div>
);

// 1. Mobifone
const MobiFoneLogo = () => (
  <BrandLogoBadge 
    src="https://i.ibb.co/hxHm9TsZ/Mobifone.png" 
    alt="Mobifone" 
    title="Mobifone" 
  />
);

// 2. V247
const V247Logo = () => (
  <BrandLogoBadge 
    src="https://i.ibb.co/QvtbdnfP/V247.png" 
    alt="V247" 
    title="V247 Telecom" 
  />
);

// 3. HTVC
const HTVCLogo = () => (
  <BrandLogoBadge 
    src="https://i.ibb.co/1fNw0hBq/HTVC.png" 
    alt="HTVC" 
    title="HTVC Television" 
  />
);

// 4. Shopee
const ShopeeLogo = () => (
  <BrandLogoBadge 
    src="https://i.ibb.co/BSVS4xf/Shopee.png" 
    alt="Shopee" 
    title="Shopee" 
  />
);

// 5. ShopeePay
const ShopeePayLogo = () => (
  <BrandLogoBadge 
    src="https://i.ibb.co/LdYv3TJy/Shopee-Paye.png" 
    alt="Shopee Pay" 
    title="ShopeePay" 
  />
);

// 6. LBC
const LBCLogo = () => (
  <BrandLogoBadge 
    src="https://i.ibb.co/R4YXWyzF/LBC.png" 
    alt="LBC" 
    title="LBC Express" 
  />
);

// 7. Prudential
const PrudentialLogo = () => (
  <BrandLogoBadge 
    src="https://i.ibb.co/XfpQphWF/Prudential.png" 
    alt="Prudential" 
    title="Prudential Life Insurance" 
  />
);

// 8. Garena
const GarenaLogo = () => (
  <BrandLogoBadge 
    src="https://i.ibb.co/h1Md65yV/Garena.png" 
    alt="Garena" 
    title="Garena" 
  />
);

// 9. GCafe
const GCafeLogo = () => (
  <BrandLogoBadge 
    src="https://i.ibb.co/FkWk3s4W/GCafe.png" 
    alt="GCafe" 
    title="GCafé" 
  />
);

// 10. VED
const VEDLogo = () => (
  <BrandLogoBadge 
    src="https://i.ibb.co/fYPJLfbw/VED.png" 
    alt="VED" 
    title="VED Corp" 
  />
);

// 11. VED Animated Gif Logo
const VEDGifLogo = () => (
  <BrandLogoBadge 
    src="https://i.ibb.co/BKHcWL5R/Logo-VED.gif" 
    alt="Logo-VED" 
    title="VED Group" 
  />
);

// 12. Momo
const MomoLogo = () => (
  <BrandLogoBadge 
    src="https://i.ibb.co/k2QtrgTw/Momo.png" 
    alt="Momo" 
    title="MoMo E-Wallet" 
  />
);

// 13. Finviet
const FinvietLogo = () => (
  <BrandLogoBadge 
    src="https://i.ibb.co/7NtSSz4d/Finviet.png" 
    alt="Finviet" 
    title="Finviet" 
  />
);

// 14. Power Service
const PowerServiceLogo = () => (
  <BrandLogoBadge 
    src="https://i.ibb.co/G4QnNzWb/Power-Service.png" 
    alt="Power Service" 
    title="Power Service" 
  />
);

// Card 4 Header Icon: Payment Card with Controller Plus
const PaymentCardIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="3" />
    <line x1="2" y1="10" x2="22" y2="10" />
    <circle cx="6.5" cy="14.5" r="1" fill="currentColor" />
    <path d="M16 13v3" />
    <path d="M14.5 14.5h3" />
  </svg>
);

// --- HIGH-FIDELITY 3D DOMAIN BANNER ILLUSTRATIONS WITH DYNAMIC 3-ICON ORBITING MOTION ---

interface OrbitingIconItem {
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const OrbitingThreeIcons = ({
  icons,
  speed = 14,
  radius = 48,
}: {
  icons: [OrbitingIconItem, OrbitingIconItem, OrbitingIconItem];
  speed?: number;
  radius?: number;
}) => (
  <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      className="relative w-full h-full flex items-center justify-center"
    >
      {icons.map((item, idx) => {
        // Angles: -90° (top), 30° (bottom-right), 150° (bottom-left) for an equilateral triangle
        const angleDeg = -90 + idx * 120;
        const angleRad = (angleDeg * Math.PI) / 180;
        const x = Math.round(Math.cos(angleRad) * radius);
        const y = Math.round(Math.sin(angleRad) * radius);
        const Icon = item.icon;

        return (
          <div
            key={idx}
            className="absolute flex items-center justify-center"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full ${item.gradient} border-2 border-white shadow-md flex items-center justify-center text-white backdrop-blur-xs`}
            >
              <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.3]" />
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  </div>
);

// 1. Telecom 3D Illustration (Modern Frosted Glassmorphism 3D App Icon)
const TelecomIllustration = () => (
  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center select-none hover:scale-110 transition-transform duration-500">
    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/30 to-cyan-400/30 rounded-3xl blur-xl opacity-75 animate-pulse pointer-events-none" />
    <div className="absolute bottom-1 w-16 h-3 bg-emerald-500/30 rounded-full blur-md" />
    <div style={{ animation: "levitateFloat 4.5s ease-in-out infinite alternate" }}>
      <div 
        className="glass-gleam-effect relative z-10 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl border border-white/30 backdrop-blur-[16px] bg-[rgba(16,185,129,0.16)] shadow-[0_12px_36px_rgba(16,185,129,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.7)] flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/25 via-transparent to-cyan-400/20 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center gap-0.5">
          <Wifi className="w-7 h-7 text-cyan-200 drop-shadow-[0_0_12px_rgba(52,211,153,1)] stroke-[2.5]" />
          <div className="flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-emerald-950/80 border border-emerald-400/50 shadow-[0_0_8px_rgba(6,182,212,0.8)]">
            <Zap className="w-2 h-2 text-white animate-pulse" />
            <span className="text-[8.5px] font-mono font-black text-white tracking-widest">5G</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// E-Commerce Glassmorphism Bag Icon Component (100% Converted from HTML/CSS)
const GlassmorphismEcommerceBag = () => (
  <div className="relative flex flex-col items-center justify-center scale-[0.52] sm:scale-[0.58] origin-center z-10">
    {/* Style tag for sweepGleam, bagSwing, cartRoll, levitateFloat */}
    <style>{`
      @keyframes sweepGleam {
        0%, 20% { left: -110%; }
        70%, 100% { left: 160%; }
      }
      @keyframes levitateFloat {
        0% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-7px) rotate(0.8deg); }
        100% { transform: translateY(3px) rotate(-0.8deg); }
      }
      @keyframes bagSwing {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-3deg) translateY(-2px); }
        75% { transform: rotate(3deg) translateY(-2px); }
      }
      @keyframes cartRoll {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-7px) scale(1.06); filter: drop-shadow(0 0 12px #fbbf24); }
      }
      .glass-gleam-effect {
        position: relative;
        overflow: hidden;
      }
      .glass-gleam-effect::before {
        content: "";
        position: absolute;
        top: -60%;
        left: -90%;
        width: 50%;
        height: 220%;
        background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.03) 70%, transparent 100%);
        transform: rotate(25deg);
        pointer-events: none;
        animation: sweepGleam 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        z-index: 5;
      }
      .neon-cart-element {
        width: 48px;
        height: 38px;
        border: 3.5px solid #f59e0b;
        border-top: none;
        border-radius: 0 0 10px 10px;
        position: relative;
        box-shadow: 0 0 22px #d97706;
        animation: cartRoll 2.6s infinite ease-in-out;
      }
      .neon-cart-element::before {
        content: "";
        position: absolute;
        top: -14px;
        left: -12px;
        width: 14px;
        height: 4px;
        background: #f59e0b;
        box-shadow: 0 0 8px #f59e0b;
      }
      .neon-cart-element::after {
        content: "";
        position: absolute;
        bottom: -12px;
        left: 6px;
        width: 10px;
        height: 10px;
        background: #f59e0b;
        border-radius: 50%;
        box-shadow: 20px 0 0 #f59e0b, 0 0 12px #f59e0b;
      }
    `}</style>

    {/* Levitate & Swing Bag Structure */}
    <div style={{ animation: "levitateFloat 4.5s ease-in-out infinite alternate" }}>
      <div 
        id="icon-ecommerce"
        style={{
          width: "170px",
          height: "180px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          animation: "bagSwing 4.2s infinite ease-in-out",
          transformOrigin: "top center"
        }}
      >
        {/* Bag Handle */}
        <div 
          style={{
            width: "50px",
            height: "40px",
            border: "5px solid rgba(255, 255, 255, 0.28)",
            borderBottom: "none",
            borderRadius: "25px 25px 0 0",
            marginBottom: "-4px",
            zIndex: 1,
            filter: "drop-shadow(0 2px 6px rgba(255,255,255,0.3))"
          }}
        />

        {/* Bag Body with Glass Gleam */}
        <div 
          className="glass-gleam-effect"
          style={{
            width: "125px",
            height: "110px",
            background: "rgba(245, 158, 11, 0.16)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "2px solid rgba(255, 255, 255, 0.28)",
            borderRadius: "18px 18px 24px 24px",
            position: "relative",
            zIndex: 2,
            boxShadow: "0 20px 42px rgba(0,0,0,0.4), inset 0 2px 10px rgba(255,255,255,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {/* Neon Cart Element */}
          <div className="neon-cart-element" />
        </div>
      </div>
    </div>
  </div>
);

// 2. E-Commerce 3D Illustration (Converted Glassmorphism E-Commerce Bag Icon)
const EcommerceIllustration = () => (
  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center select-none hover:scale-110 transition-transform duration-500">
    {/* Glow shadow & ambient dispersion */}
    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/30 via-orange-500/30 to-yellow-400/30 rounded-3xl blur-xl opacity-75 animate-pulse pointer-events-none" />
    <div className="absolute bottom-1 w-16 h-3 bg-orange-500/30 rounded-full blur-md" />

    {/* Converted Glassmorphism E-Commerce Bag Icon */}
    <GlassmorphismEcommerceBag />
  </div>
);

// 3. Insurance 3D Illustration (Glassmorphism Shield Icon)
const InsuranceIllustration = () => (
  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center select-none hover:scale-110 transition-transform duration-500">
    <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/30 via-blue-500/30 to-indigo-400/30 rounded-3xl blur-xl opacity-75 animate-pulse pointer-events-none" />
    <div className="absolute bottom-1 w-16 h-3 bg-sky-500/30 rounded-full blur-md" />
    <div style={{ animation: "levitateFloat 4.5s ease-in-out infinite alternate" }}>
      <div 
        className="glass-gleam-effect relative z-10 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl border border-white/30 backdrop-blur-[16px] bg-[rgba(2,132,199,0.16)] shadow-[0_12px_36px_rgba(2,132,199,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.7)] flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/25 via-transparent to-sky-400/20 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center gap-0.5">
          <ShieldCheck className="w-7 h-7 text-sky-200 drop-shadow-[0_0_12px_rgba(56,189,248,1)] stroke-[2.4]" />
          <div className="flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-sky-950/80 border border-sky-400/50 shadow-[0_0_8px_rgba(56,189,248,0.8)]">
            <Lock className="w-2 h-2 text-white animate-pulse" />
            <span className="text-[8.5px] font-mono font-black text-white tracking-widest">CARE</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 4. Payment Cards / Gaming 3D Illustration (Glassmorphism Gamepad/Card Icon)
const GamingCardsIllustration = () => (
  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center select-none hover:scale-110 transition-transform duration-500">
    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/30 via-green-500/30 to-teal-400/30 rounded-3xl blur-xl opacity-75 animate-pulse pointer-events-none" />
    <div className="absolute bottom-1 w-16 h-3 bg-emerald-500/30 rounded-full blur-md" />
    <div style={{ animation: "levitateFloat 4.5s ease-in-out infinite alternate" }}>
      <div 
        className="glass-gleam-effect relative z-10 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl border border-white/30 backdrop-blur-[16px] bg-[rgba(22,163,74,0.16)] shadow-[0_12px_36px_rgba(22,163,74,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.7)] flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/25 via-transparent to-emerald-400/20 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center gap-0.5">
          <CreditCard className="w-7 h-7 text-emerald-200 drop-shadow-[0_0_12px_rgba(74,222,128,1)] stroke-[2.3]" />
          <div className="flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-emerald-950/80 border border-emerald-400/50 shadow-[0_0_8px_rgba(74,222,128,0.8)]">
            <Gamepad2 className="w-2 h-2 text-white animate-pulse" />
            <span className="text-[8.5px] font-mono font-black text-white tracking-widest">GAME</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 5. Digital Wallet 3D Illustration (Smart Digital Wallet Glassmorphism Icon)
const DigitalWalletIllustration = () => (
  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center select-none hover:scale-110 transition-transform duration-500">
    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/30 via-yellow-500/30 to-orange-400/30 rounded-3xl blur-xl opacity-75 animate-pulse pointer-events-none" />
    <div className="absolute bottom-1 w-16 h-3 bg-amber-500/30 rounded-full blur-md" />
    <div style={{ animation: "levitateFloat 4.5s ease-in-out infinite alternate" }}>
      <div 
        className="glass-gleam-effect relative z-10 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl border border-white/30 backdrop-blur-[16px] bg-[rgba(217,119,6,0.16)] shadow-[0_12px_36px_rgba(217,119,6,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.7)] flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/25 via-transparent to-amber-400/20 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center gap-0.5">
          <Wallet className="w-7 h-7 text-amber-200 drop-shadow-[0_0_12px_rgba(251,191,36,1)] stroke-[2.3]" />
          <div className="flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-amber-950/80 border border-amber-400/50 shadow-[0_0_8px_rgba(251,191,36,0.8)]">
            <Sparkles className="w-2 h-2 text-white animate-pulse" />
            <span className="text-[8.5px] font-mono font-black text-white tracking-widest">SMART</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 6. Systems Architecture 3D Illustration (Glassmorphism Systems Icon)
const SystemsIllustration = () => (
  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center select-none hover:scale-110 transition-transform duration-500">
    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 via-purple-500/30 to-blue-400/30 rounded-3xl blur-xl opacity-75 animate-pulse pointer-events-none" />
    <div className="absolute bottom-1 w-16 h-3 bg-indigo-500/30 rounded-full blur-md" />
    <div style={{ animation: "levitateFloat 4.5s ease-in-out infinite alternate" }}>
      <div 
        className="glass-gleam-effect relative z-10 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl border border-white/30 backdrop-blur-[16px] bg-[rgba(99,102,241,0.16)] shadow-[0_12px_36px_rgba(99,102,241,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.7)] flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/25 via-transparent to-indigo-400/20 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center gap-0.5">
          <Layers className="w-7 h-7 text-indigo-200 drop-shadow-[0_0_12px_rgba(129,140,248,1)] stroke-[2.3]" />
          <div className="flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-indigo-950/80 border border-indigo-400/50 shadow-[0_0_8px_rgba(129,140,248,0.8)]">
            <Cpu className="w-2 h-2 text-white animate-pulse" />
            <span className="text-[8.5px] font-mono font-black text-white tracking-widest">ARCH</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- BOTTOM RIGHT TARGET & CHART ILLUSTRATION ---
const TargetGrowthIllustration = () => (
  <div className="relative w-28 h-20 sm:w-36 sm:h-24 hidden md:flex items-center justify-center shrink-0 select-none">
    {/* Bar chart behind target */}
    <div className="absolute bottom-2 left-1 flex items-end gap-1.5 opacity-60">
      <div className="w-2.5 h-6 bg-gradient-to-t from-blue-500 to-sky-300 rounded-t-xs" />
      <div className="w-2.5 h-10 bg-gradient-to-t from-blue-600 to-indigo-300 rounded-t-xs" />
      <div className="w-2.5 h-14 bg-gradient-to-t from-indigo-600 to-purple-300 rounded-t-xs" />
    </div>

    {/* Dartboard Target */}
    <div className="relative z-10 w-16 h-16 rounded-full border-4 border-indigo-600 bg-white dark:bg-slate-900 flex items-center justify-center shadow-md">
      <div className="w-11 h-11 rounded-full border-3 border-sky-400 bg-sky-50 dark:bg-sky-950/40 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-indigo-600 bg-indigo-600 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>
      </div>
      {/* Arrow hitting bullseye */}
      <div className="absolute -top-3.5 -right-3.5 transform rotate-45">
        <div className="w-8 h-1 bg-indigo-800 dark:bg-indigo-400" />
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-indigo-800 dark:border-indigo-400 transform rotate-45 -translate-y-1 -translate-x-0.5" />
      </div>
    </div>
  </div>
);

// --- 6 EXACT DOMAINS DATA AS IN USER SPEC ---
interface DomainItem {
  id: string;
  code: string;
  titleVi: string;
  titleEn: string;
  experienceVi: string;
  experienceEn: string;
  orientationVi: string;
  orientationEn: string;
  descVi: string;
  descEn: string;
  highlightsVi: string[];
  highlightsEn: string[];
  roleVi: string;
  roleEn: string;
  teamSizeVi: string;
  teamSizeEn: string;
  toolsVi: string;
  toolsEn: string;
  partnersVi: string;
  partnersEn: string;
  IconComponent: React.ElementType;
  IllustrationComponent?: React.ComponentType;
  logos: React.FC[];
  cardBorder: string;
  cardBgGradient: string;
  iconBg: string;
  titleColor: string;
  expColor: string;
  dividerColor: string;
  lineAccent: string;
}

const DOMAINS: DomainItem[] = [
  // 6.1. Viễn thông di động
  {
    id: "01",
    code: "6.1",
    titleVi: "Viễn thông di động",
    titleEn: "Mobile Telecom",
    experienceVi: "10+ Năm kinh nghiệm",
    experienceEn: "10+ Years Experience",
    orientationVi: "Nền tảng vận hành & Chăm sóc khách hàng quy mô lớn tiêu chuẩn tập đoàn",
    orientationEn: "Large-scale operation & corporate standard customer care platform",
    descVi: "Hơn 10 năm kinh nghiệm trong ngành viễn thông, từ mạng di động đến dịch vụ gọi quốc tế, xây dựng nền tảng vững chắc về vận hành và Chăm Sóc Khách Hàng quy mô lớn.",
    descEn: "Over 10 years of experience in telecom, from mobile networks to international voice services, building a solid foundation for large-scale operations and Customer Care.",
    highlightsVi: [
      "Quản lý & duy trì chỉ số SLA tổng đài luôn đạt trên 98%",
      "Chuẩn hóa 100% kịch bản tư vấn và xử lý khiếu nại cước dịch vụ",
      "Xây dựng đội ngũ tư vấn viên chuyên nghiệp có tỷ lệ nghỉ việc < 3%"
    ],
    highlightsEn: [
      "Maintained Call Center SLA index consistently above 98%",
      "Standardized 100% of consultation scripts & billing complaint workflows",
      "Built a professional agent team with attrition rate < 3%"
    ],
    roleVi: "Trưởng phòng CSKH / Quản lý Vận hành Tổng đài",
    roleEn: "Head of Customer Service / Call Center Operations Manager",
    teamSizeVi: "50 - 130+ Nhân sự",
    teamSizeEn: "50 - 130+ Staff",
    toolsVi: "Avaya CallCenter, AICC System, SOP Matrix, CRM Telecom",
    toolsEn: "Avaya CallCenter, AICC System, SOP Matrix, CRM Telecom",
    partnersVi: "MobiFone · V247 · LBC · HTVC",
    partnersEn: "MobiFone · V247 · LBC · HTVC",
    IconComponent: Smartphone,
    IllustrationComponent: TelecomIllustration,
    logos: [MobiFoneLogo, V247Logo, LBCLogo, HTVCLogo],
    cardBorder: "border-emerald-300/80 dark:border-emerald-600/50 shadow-emerald-500/10",
    cardBgGradient: "bg-gradient-to-b from-emerald-100/90 via-teal-50/70 to-cyan-100/60 dark:from-emerald-950/80 dark:via-slate-900/90 dark:to-cyan-950/40",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-700/60 text-emerald-600 dark:text-emerald-400",
    titleColor: "text-emerald-600 dark:text-emerald-400",
    expColor: "text-[#1E3A8A] dark:text-cyan-300",
    dividerColor: "text-emerald-600 dark:text-emerald-400",
    lineAccent: "bg-emerald-300 dark:bg-emerald-700"
  },
  // 6.2. Thương mại điện tử
  {
    id: "02",
    code: "6.2",
    titleVi: "Thương mại điện tử",
    titleEn: "E-Commerce",
    experienceVi: "6+ Năm kinh nghiệm",
    experienceEn: "6+ Years Experience",
    orientationVi: "Xử lý hàng triệu giao dịch & Chăm sóc khách hàng đa kênh tốc độ cao",
    orientationEn: "High-speed omnichannel customer care & processing millions of transactions",
    descVi: "Tham gia giai đoạn bùng nổ của thương mại điện tử và ví điện tử, xây dựng nền tảng vận hành, xử lý khiếu nại, kiểm soát gian lận và Chăm Sóc Khách Hàng đa kênh.",
    descEn: "Participated in the boom of e-commerce & e-wallets, establishing operational foundations, complaint resolution, fraud prevention, and omnichannel care.",
    highlightsVi: [
      "Tối ưu tỷ lệ phản hồi Chatbot & Live Chat giảm thời gian chờ xuống < 30 giây",
      "Xây dựng bộ quy trình kiểm soát gian lận đơn hàng & thanh toán trực tuyến",
      "Nâng chỉ số hài lòng khách hàng CSAT từ 88% lên 96.5%"
    ],
    highlightsEn: [
      "Optimized Chatbot & Live Chat response, reducing wait time to < 30s",
      "Established fraud control processes for online orders & payments",
      "Elevated CSAT customer satisfaction score from 88% to 96.5%"
    ],
    roleVi: "Customer Service Operations Manager",
    roleEn: "Customer Service Operations Manager",
    teamSizeVi: "100+ Nhân sự CSKH & Fraud",
    teamSizeEn: "100+ CS & Fraud Personnel",
    toolsVi: "Zendesk Omnichannel, Shopee Admin CRM, Live Chat Auto-router, Power BI",
    toolsEn: "Zendesk Omnichannel, Shopee Admin CRM, Live Chat Auto-router, Power BI",
    partnersVi: "Shopee · Finviet",
    partnersEn: "Shopee · Finviet",
    IconComponent: ShoppingCart,
    IllustrationComponent: EcommerceIllustration,
    logos: [ShopeeLogo, FinvietLogo],
    cardBorder: "border-orange-300/80 dark:border-orange-600/50 shadow-orange-500/10",
    cardBgGradient: "bg-gradient-to-b from-orange-100/90 via-orange-50/70 to-orange-100/60 dark:from-orange-950/80 dark:via-slate-900/90 dark:to-orange-900/40",
    iconBg: "bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-700/60 text-orange-600 dark:text-orange-400",
    titleColor: "text-[#EA580C] dark:text-orange-400",
    expColor: "text-[#1E3A8A] dark:text-sky-300",
    dividerColor: "text-[#EA580C] dark:text-orange-400",
    lineAccent: "bg-orange-300 dark:bg-orange-700"
  },
  // 6.3. Bảo hiểm nhân thọ
  {
    id: "03",
    code: "6.3",
    titleVi: "Bảo hiểm nhân thọ",
    titleEn: "Life Insurance",
    experienceVi: "3+ Năm kinh nghiệm",
    experienceEn: "3+ Years Experience",
    orientationVi: "Xây dựng sự tin cậy tuyệt đối & Chuẩn hóa quy trình chăm sóc khách hàng cao cấp",
    orientationEn: "Building absolute trust & standardizing premium customer care",
    descVi: "Quản lý tổng đài, triển khai dự án tích hợp hệ thống Call Center, tối ưu quy trình vận hành, nâng cao chất lượng tư vấn, cải thiện trải nghiệm và hiệu quả khách hàng toàn diện.",
    descEn: "Call center management, Call Center system integration deployment, workflow optimization, elevating advice quality, and comprehensive customer experience.",
    highlightsVi: [
      "Kiến tạo trải nghiệm khách hàng tiêu chuẩn 5 sao ngành tài chính - bảo hiểm",
      "Giảm 45% thời gian xử lý yêu cầu thay đổi thông tin hợp đồng",
      "Đạt tỷ lệ giải quyết khiếu nại thành công ngay từ lần gọi đầu tiên (FCR) > 92%"
    ],
    highlightsEn: [
      "Created 5-star standard customer experience in financial insurance",
      "Reduced policy information change processing time by 45%",
      "Achieved First Call Resolution (FCR) > 92% for complaint handling"
    ],
    roleVi: "Call Center Project & Quality Manager",
    roleEn: "Call Center Project & Quality Manager",
    teamSizeVi: "40+ Chuyên viên tư vấn",
    teamSizeEn: "40+ Consultants",
    toolsVi: "Prudential Life CRM, AS400 System, Voice Recording Quality Checklist",
    toolsEn: "Prudential Life CRM, AS400 System, Voice Recording Quality Checklist",
    partnersVi: "Prudential",
    partnersEn: "Prudential",
    IconComponent: ShieldCheck,
    IllustrationComponent: InsuranceIllustration,
    logos: [PrudentialLogo],
    cardBorder: "border-sky-300/80 dark:border-sky-600/50 shadow-sky-500/10",
    cardBgGradient: "bg-gradient-to-b from-sky-100/90 via-sky-50/70 to-sky-100/60 dark:from-sky-950/80 dark:via-slate-900/90 dark:to-sky-900/40",
    iconBg: "bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-700/60 text-[#0284C7] dark:text-sky-400",
    titleColor: "text-[#0284C7] dark:text-sky-400",
    expColor: "text-[#1E3A8A] dark:text-sky-300",
    dividerColor: "text-[#0284C7] dark:text-sky-400",
    lineAccent: "bg-sky-300 dark:bg-sky-700"
  },
  // 6.4. Thể thao điện tử
  {
    id: "04",
    code: "6.4",
    titleVi: "Thể thao điện tử",
    titleEn: "Esports & Gaming",
    experienceVi: "5+ Năm kinh nghiệm",
    experienceEn: "5+ Years Experience",
    orientationVi: "Hỗ trợ cộng đồng hàng triệu Gamers & Đồng hành cùng các giải đấu eSports đỉnh cao",
    orientationEn: "Supporting millions of gamers & accompanying premier eSports tournaments",
    descVi: "Xây dựng, quản lý bộ phận Chăm Sóc Khách Hàng cho nhà phát hành game, vận hành hệ thống hỗ trợ quy mô lớn và đồng hành cùng các sự kiện eSports chuyên nghiệp hiệu quả.",
    descEn: "Building and managing CS for game publishers, operating large-scale support infrastructure and accompanying top eSports events.",
    highlightsVi: [
      "Vận hành hệ thống Ticket hỗ trợ game thủ với lưu lượng xử lý 50,000+ yêu cầu/ngày",
      "Bảo mật tài khoản & hỗ trợ khôi phục vật phẩm game tức thì",
      "Phối hợp tổ chức trực tiếp các điểm hỗ trợ CSKH tại giải đấu eSports lớn"
    ],
    highlightsEn: [
      "Operated gamer support ticket system handling 50,000+ requests/day",
      "Account security & instant in-game item recovery support",
      "Coordinated direct CS booths at major professional eSports tournaments"
    ],
    roleVi: "Head of Game Customer Support",
    roleEn: "Head of Game Customer Support",
    teamSizeVi: "80+ Game Supporter",
    teamSizeEn: "80+ Game Supporters",
    toolsVi: "Garena Customer Desk, Gcafe Management Tool, AI Ticket Classifier",
    toolsEn: "Garena Customer Desk, Gcafe Management Tool, AI Ticket Classifier",
    partnersVi: "Garena · VED · GCafe",
    partnersEn: "Garena · VED · GCafe",
    IconComponent: PaymentCardIcon,
    IllustrationComponent: GamingCardsIllustration,
    logos: [GarenaLogo, VEDLogo, GCafeLogo],
    cardBorder: "border-emerald-300/80 dark:border-emerald-600/50 shadow-emerald-500/10",
    cardBgGradient: "bg-gradient-to-b from-emerald-100/90 via-emerald-50/70 to-emerald-100/60 dark:from-emerald-950/80 dark:via-slate-900/90 dark:to-emerald-900/40",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-700/60 text-[#16A34A] dark:text-emerald-400",
    titleColor: "text-[#16A34A] dark:text-emerald-400",
    expColor: "text-[#1E3A8A] dark:text-sky-300",
    dividerColor: "text-[#16A34A] dark:text-emerald-400",
    lineAccent: "bg-emerald-300 dark:bg-emerald-700"
  },
  // 6.5. Ví điện tử
  {
    id: "05",
    code: "6.5",
    titleVi: "Ví điện tử",
    titleEn: "Digital Wallets",
    experienceVi: "5+ Năm kinh nghiệm",
    experienceEn: "5+ Years Experience",
    orientationVi: "An toàn giao dịch tài chính số & Chăm sóc người dùng FinTech 24/7",
    orientationEn: "Digital financial transaction security & 24/7 FinTech user care",
    descVi: "Am hiểu vận hành Chăm Sóc Khách Hàng trong lĩnh vực FinTech, từ xác minh người dùng, xử lý giao dịch đến kiểm soát rủi ro và hỗ trợ đối tác tài chính hiệu quả bền vững.",
    descEn: "In-depth FinTech CS operations, from KYC user verification and transaction handling to risk control and financial partner support.",
    highlightsVi: [
      "Hệ thống giám sát giao dịch trực tuyến & cảnh báo lừa đảo công nghệ cao",
      "Thiết lập quy trình xử lý tra soát khiếu nại tài chính trong vòng 2 giờ",
      "Đạt tỷ lệ đánh giá dịch vụ CSAT 98.2% trên các kênh hỗ trợ số"
    ],
    highlightsEn: [
      "Real-time transaction monitoring & high-tech fraud alert system",
      "Established financial complaint investigation process within 2 hours",
      "Achieved 98.2% CSAT service rating across digital support channels"
    ],
    roleVi: "FinTech Customer Care Operations Lead",
    roleEn: "FinTech Customer Care Operations Lead",
    teamSizeVi: "120+ Nhân sự FinTech CS",
    teamSizeEn: "120+ FinTech CS Personnel",
    toolsVi: "MoMo Admin CRM, ShopeePay Merchant Portal, FinTech Security Gateway",
    toolsEn: "MoMo Admin CRM, ShopeePay Merchant Portal, FinTech Security Gateway",
    partnersVi: "MoMo · ShopeePay",
    partnersEn: "MoMo · ShopeePay",
    IconComponent: Wallet,
    IllustrationComponent: DigitalWalletIllustration,
    logos: [MomoLogo, ShopeePayLogo],
    cardBorder: "border-amber-300/80 dark:border-amber-600/50 shadow-amber-500/10",
    cardBgGradient: "bg-gradient-to-b from-amber-100/90 via-amber-50/70 to-amber-100/60 dark:from-amber-950/80 dark:via-slate-900/90 dark:to-amber-900/40",
    iconBg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-700/60 text-[#D97706] dark:text-amber-400",
    titleColor: "text-[#D97706] dark:text-amber-400",
    expColor: "text-[#1E3A8A] dark:text-sky-300",
    dividerColor: "text-[#D97706] dark:text-amber-400",
    lineAccent: "bg-amber-300 dark:bg-amber-700"
  },
  // 6.6. Xây dựng hệ thống
  {
    id: "06",
    code: "6.6",
    titleVi: "Xây dựng hệ thống",
    titleEn: "Systems Architecture",
    experienceVi: "22+ Năm kinh nghiệm",
    experienceEn: "22+ Years Experience",
    orientationVi: "Tư vấn giải pháp toàn diện từ con người, quy trình đến chuyển đổi số",
    orientationEn: "End-to-end solution consulting from people and processes to digital transformation",
    descVi: "Tư vấn xây dựng, tối ưu hệ thống Chăm Sóc Khách Hàng toàn diện, từ quy trình, nhân sự đến CRM và tự động hóa, nâng cao hiệu quả vận hành doanh nghiệp tổng thể thực tiễn.",
    descEn: "Consulting on building & optimizing end-to-end Customer Care systems, from SOPs and personnel to CRM and automation, elevating overall enterprise efficiency.",
    highlightsVi: [
      "Thiết kế trọn gói mô hình Contact Center từ 10 đến 100+ vị trí ngồi",
      "Đóng gói tài liệu SOP, kịch bản giao tiếp & KPI scorecard chuẩn hóa",
      "Đào tạo & chuyển giao công nghệ cho đội ngũ quản lý kế thừa"
    ],
    highlightsEn: [
      "Turnkey Contact Center design from 10 to 100+ agent seats",
      "Packaged SOP documents, interaction scripts & standardized KPI scorecards",
      "Training & tech transfer for successor management teams"
    ],
    roleVi: "CX & Service System Consultant",
    roleEn: "CX & Service System Consultant",
    teamSizeVi: "Tư vấn Doanh nghiệp",
    teamSizeEn: "Enterprise Consulting",
    toolsVi: "Zoho CRM, Salesforce, Notion SOP Matrix, Process Flowcharting",
    toolsEn: "Zoho CRM, Salesforce, Notion SOP Matrix, Process Flowcharting",
    partnersVi: "Power Service · Logo-VED",
    partnersEn: "Power Service · Logo-VED",
    IconComponent: Layers,
    IllustrationComponent: SystemsIllustration,
    logos: [PowerServiceLogo, VEDGifLogo],
    cardBorder: "border-indigo-300/80 dark:border-indigo-600/50 shadow-indigo-500/10",
    cardBgGradient: "bg-gradient-to-b from-indigo-100/90 via-indigo-50/70 to-indigo-100/60 dark:from-indigo-950/80 dark:via-slate-900/90 dark:to-indigo-900/40",
    iconBg: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-700/60 text-[#6366F1] dark:text-indigo-400",
    titleColor: "text-[#6366F1] dark:text-indigo-400",
    expColor: "text-[#1E3A8A] dark:text-sky-300",
    dividerColor: "text-[#6366F1] dark:text-indigo-400",
    lineAccent: "bg-indigo-300 dark:bg-indigo-700"
  }
];

export function DomainsSection() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";
  const [expandedDomainId, setExpandedDomainId] = React.useState<string | null>(null);

  const selectedDomain = DOMAINS.find(d => d.id === expandedDomainId);

  return (
    <section
      id="domains"
      className="relative w-full h-full flex flex-col justify-start items-stretch p-[15px] font-sans text-slate-900 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar"
    >
      <div className="w-full flex-grow flex flex-col gap-[15px] max-w-7xl mx-auto justify-start">
        
        {/* Navigation & Breadcrumbs Header */}
        <PageCardHeader pageId="domains" />

        {/* ========================================================================= */}
        {/* 2. EXPANDED DOMAIN VIEW (Takes up full space of 6 cards when clicked)     */}
        {/* ========================================================================= */}
        {selectedDomain ? (
          <motion.div
            key={selectedDomain.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className={cn(
              "w-full rounded-3xl p-5 sm:p-7 lg:p-9 border shadow-2xl flex flex-col justify-between gap-6 transition-all duration-300 relative overflow-hidden text-left",
              selectedDomain.cardBorder,
              selectedDomain.cardBgGradient
            )}
          >
            {/* Top Close Button & Quick Navigation Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 dark:border-white/10 pb-4">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {DOMAINS.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setExpandedDomainId(d.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap",
                      d.id === selectedDomain.id
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
                        : "bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/60"
                    )}
                  >
                    {d.code}. {isVi ? d.titleVi : d.titleEn}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setExpandedDomainId(null)}
                className="px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300/80 dark:border-slate-700 text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <span>✕ {isVi ? "Thu gọn về 6 thẻ" : "Collapse view"}</span>
              </button>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: 3D Illustration, Big Title, Orientation & Key Info */}
              <div className="lg:col-span-5 flex flex-col gap-4 text-left">
                <div className="flex items-center gap-4">
                  {selectedDomain.IllustrationComponent ? (
                    <div className="shrink-0 p-2">
                      <selectedDomain.IllustrationComponent />
                    </div>
                  ) : null}
                  <div className="space-y-1 min-w-0 flex-1">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400 block uppercase">
                      LĨNH VỰC {selectedDomain.code}
                    </span>
                    <h3 className={cn("text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight", selectedDomain.titleColor)}>
                      {isVi ? selectedDomain.titleVi : selectedDomain.titleEn}
                    </h3>
                    <span className={cn("inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-extrabold bg-white/80 dark:bg-slate-800/80 shadow-xs border border-black/5 dark:border-white/10", selectedDomain.expColor)}>
                      {isVi ? selectedDomain.experienceVi : selectedDomain.experienceEn}
                    </span>
                  </div>
                </div>

                {/* Orientation Block (Định hướng) */}
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-black/10 dark:border-white/10 shadow-2xs space-y-1">
                  <span className="text-2xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    {isVi ? "ĐỊNH HƯỚNG TẦM NHÌN & VẬN HÀNH" : "STRATEGIC ORIENTATION"}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug">
                    {isVi ? selectedDomain.orientationVi : selectedDomain.orientationEn}
                  </p>
                </div>

                {/* Grid of Key Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 text-left">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                      {isVi ? "VAI TRÒ CHÍNH" : "PRIMARY ROLE"}
                    </span>
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white leading-tight block mt-0.5">
                      {isVi ? selectedDomain.roleVi : selectedDomain.roleEn}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 text-left">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                      {isVi ? "QUY MÔ ĐỘI NGŨ" : "TEAM SIZE"}
                    </span>
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white leading-tight block mt-0.5">
                      {isVi ? selectedDomain.teamSizeVi : selectedDomain.teamSizeEn}
                    </span>
                  </div>
                </div>

                {/* Tools & Tech */}
                <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 text-left">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    {isVi ? "CÔNG NGHỆ & CÔNG CỤ" : "TOOLS & TECH STACK"}
                  </span>
                  <span className="text-xs font-bold text-blue-700 dark:text-cyan-300 leading-tight block mt-0.5">
                    {isVi ? selectedDomain.toolsVi : selectedDomain.toolsEn}
                  </span>
                </div>
              </div>

              {/* Right Column: Full Narrative Description & Key Achievements */}
              <div className="lg:col-span-7 flex flex-col gap-4 text-left">
                {/* Description */}
                <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-2xl p-4.5 sm:p-5 border border-black/5 dark:border-white/10 shadow-xs space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    {isVi ? "MÔ TẢ CHUYÊN MÔN NĂNG LỰC" : "PROFESSIONAL DESCRIPTION"}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                    {isVi ? selectedDomain.descVi : selectedDomain.descEn}
                  </p>
                </div>

                {/* Key Achievements & Highlights */}
                <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-2xl p-4.5 sm:p-5 border border-black/5 dark:border-white/10 shadow-xs space-y-2.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    {isVi ? "KẾT QUẢ & THÀNH TỰU NỔI BẬT" : "KEY RESULTS & HIGHLIGHTS"}
                  </span>
                  <ul className="space-y-2">
                    {(isVi ? selectedDomain.highlightsVi : selectedDomain.highlightsEn).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Brand Partners */}
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 border border-black/5 dark:border-white/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-2xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                      {isVi ? "ĐỐI TÁC & THƯƠNG HIỆU TIÊU BIỂU" : "PARTNERS & BRANDS"}
                    </span>
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                      {isVi ? selectedDomain.partnersVi : selectedDomain.partnersEn}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {selectedDomain.logos.map((Logo, idx) => (
                      <Logo key={idx} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ========================================================================= */
          /* 2. SIX COMPACT DOMAIN CARDS (Description hidden, click to expand)         */
          /* ========================================================================= */
          <div className="flex-1 w-full flex items-center justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 w-full justify-center items-stretch">
              {DOMAINS.map((domain, index) => {
                const Illustration = domain.IllustrationComponent;
                return (
                  <motion.div
                    key={domain.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    onClick={() => setExpandedDomainId(domain.id)}
                    className={cn(
                      "relative rounded-2xl sm:rounded-3xl p-3 sm:p-4 border flex flex-col items-center justify-between gap-2 shadow-sm hover:shadow-xl hover:scale-[1.015] transition-all duration-300 cursor-pointer group overflow-hidden text-center",
                      domain.cardBorder,
                      domain.cardBgGradient
                    )}
                    title={isVi ? "Bấm để xem chi tiết đầy đủ" : "Click to view full details"}
                  >
                    {/* Code Badge */}
                    <div className="w-full flex items-center justify-between text-3xs sm:text-2xs font-mono font-bold">
                      <span className="px-1.5 py-0.5 rounded-full bg-black/10 dark:bg-white/10 text-slate-800 dark:text-slate-200">
                        {domain.code}
                      </span>
                      <span className={cn("font-extrabold text-[10px]", domain.expColor)}>
                        {isVi ? domain.experienceVi : domain.experienceEn}
                      </span>
                    </div>

                    {/* 3D Glassmorphism Illustration Icon */}
                    {Illustration && (
                      <div className="w-full flex items-center justify-center my-0.5 select-none pointer-events-none scale-90 sm:scale-100">
                        <Illustration />
                      </div>
                    )}

                    <div className="w-full space-y-1">
                      {/* Title */}
                      <h2 
                        className={cn(
                          "text-sm sm:text-base lg:text-md font-black tracking-tight leading-snug truncate w-full block", 
                          domain.titleColor
                        )}
                        title={isVi ? domain.titleVi : domain.titleEn}
                      >
                        {isVi ? domain.titleVi : domain.titleEn}
                      </h2>
                      
                      {/* Orientation Quote Tag */}
                      <p className="text-[10px] sm:text-2xs font-bold text-slate-700 dark:text-slate-200 line-clamp-2 leading-relaxed px-1">
                        "{isVi ? domain.orientationVi : domain.orientationEn}"
                      </p>

                      {/* Role Tag */}
                      <span className="inline-block text-[9px] sm:text-[10px] font-mono font-bold text-blue-800 dark:text-cyan-300 bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded-full border border-black/5 dark:border-white/10 truncate max-w-full">
                        {isVi ? domain.roleVi : domain.roleEn}
                      </span>
                    </div>

                    {/* Bottom Section: Round Brand Logos on 1 Single Row */}
                    <div className="mt-1 pt-1.5 select-none border-t border-black/5 dark:border-white/10 w-full flex items-center justify-between gap-1">
                      <div className="flex flex-nowrap items-center justify-center gap-1 py-0.5 min-h-[34px] overflow-hidden flex-1">
                        {domain.logos.map((Logo, idx) => (
                          <Logo key={idx} />
                        ))}
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold text-blue-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform shrink-0">
                        →
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default DomainsSection;
