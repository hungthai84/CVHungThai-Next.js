import React, { useMemo } from "react";

// Định nghĩa 12 tuyến chuyển động với các quỹ đạo hình học khác nhau
export type TrajectoryType =
  | "sin-wave"         // Tuyến 1: Lượn sóng hình sin ngang & nhấp nhô
  | "elliptical-orbit" // Tuyến 2: Xoay vòng quanh quỹ đạo elip 360 độ
  | "diagonal-glide"   // Tuyến 3: Trôi chéo góc 45 độ bồng bềnh
  | "breathing-pulse"  // Tuyến 4: Phóng to thu nhỏ nhịp thở đa chiều
  | "matrix-spiral"    // Tuyến 5: Xoắn ốc vi mạch ma trận
  | "pendulum-arc"     // Tuyến 6: Con lắc hình cánh quạt đu đưa
  | "quantum-drift"    // Tuyến 7: Trôi dạt bồng bềnh 4 phương
  | "radar-sweep"      // Tuyến 8: Tia quét radar 360 độ kèm xung sóng
  | "hex-ripple"       // Tuyến 9: Sóng xung lực tổ ong lục giác
  | "counter-spin"     // Tuyến 10: Xoay đảo chiều giữa 2 tầng hoa văn
  | "vertical-float"   // Tuyến 11: Trôi dọc dập dềnh thẳng đứng
  | "starlight-flow";  // Tuyến 12: Dải tinh thể đa giác trôi lững lờ

// Danh sách các loại hoa văn
export type PatternShape =
  | "circuit-board"    // Vi mạch điện tử
  | "celestial-rings"  // Vành đai thiên văn
  | "quantum-lattice"  // Lưới lượng tử
  | "hex-hive"         // Tổ ong công nghệ
  | "octagram-core"    // Bát giác đa lớp
  | "geometric-mandala"// Hoa sen hình học
  | "radar-target"     // Tọa độ radar
  | "diamond-prism"    // Lăng kính kim cương
  | "radial-sunburst"  // Nan hoa mặt trời
  | "cyber-mesh"       // Lưới toạ độ viễn thám
  | "flow-ribbon"      // Sóng spline mềm mại
  | "origami-poly";    // Đa giác origami

interface CardMovingPatternProps {
  itemKey: string;
  color?: string;
  seedIndex?: number;
}

// Bảng màu gradient hòa hợp theo từng hệ thống
const THEME_ACCENTS: Record<string, { stroke: string; glow: string; secondary: string }> = {
  SDP: { stroke: "#60a5fa", glow: "rgba(96, 165, 250, 0.4)", secondary: "#93c5fd" },
  ERP: { stroke: "#34d399", glow: "rgba(52, 211, 153, 0.4)", secondary: "#6ee7b7" },
  CRM: { stroke: "#a78bfa", glow: "rgba(167, 139, 250, 0.4)", secondary: "#c4b5fd" },
  HRM: { stroke: "#fb923c", glow: "rgba(251, 146, 60, 0.4)", secondary: "#fdba74" },
  BPM: { stroke: "#22d3ee", glow: "rgba(34, 211, 238, 0.4)", secondary: "#67e8f9" },
  OKR: { stroke: "#fb7185", glow: "rgba(251, 113, 133, 0.4)", secondary: "#fda4af" },
  CLP: { stroke: "#fbbf24", glow: "rgba(251, 191, 36, 0.4)", secondary: "#fde68a" },
  LMS: { stroke: "#818cf8", glow: "rgba(129, 140, 248, 0.4)", secondary: "#a5b4fc" },
  CSC: { stroke: "#38bdf8", glow: "rgba(56, 189, 248, 0.4)", secondary: "#7dd3fc" },
  BI:  { stroke: "#facc15", glow: "rgba(250, 204, 21, 0.4)", secondary: "#fef08a" },
  AI:  { stroke: "#e879f9", glow: "rgba(232, 121, 249, 0.4)", secondary: "#f0abfc" },
  POS: { stroke: "#a3e635", glow: "rgba(163, 230, 53, 0.4)", secondary: "#bef264" },
};

const TRAJECTORIES: TrajectoryType[] = [
  "sin-wave",
  "elliptical-orbit",
  "diagonal-glide",
  "breathing-pulse",
  "matrix-spiral",
  "pendulum-arc",
  "quantum-drift",
  "radar-sweep",
  "hex-ripple",
  "counter-spin",
  "vertical-float",
  "starlight-flow"
];

const PATTERNS: PatternShape[] = [
  "circuit-board",
  "celestial-rings",
  "quantum-lattice",
  "hex-hive",
  "octagram-core",
  "geometric-mandala",
  "radar-target",
  "diamond-prism",
  "radial-sunburst",
  "cyber-mesh",
  "flow-ribbon",
  "origami-poly"
];

export function CardSystemMovingPattern({ itemKey }: CardMovingPatternProps) {
  // Tính toán hoa văn ngẫu nhiên hoặc gán theo seed ổn định cho từng thẻ
  const { pattern, trajectory, theme } = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < itemKey.length; i++) {
      hash = (hash << 5) - hash + itemKey.charCodeAt(i);
      hash |= 0;
    }
    const absHash = Math.abs(hash);
    const selectedPattern = PATTERNS[absHash % PATTERNS.length];
    const selectedTrajectory = TRAJECTORIES[(absHash + 3) % TRAJECTORIES.length];
    const selectedTheme = THEME_ACCENTS[itemKey] || {
      stroke: "#93c5fd",
      glow: "rgba(147, 197, 253, 0.35)",
      secondary: "#bfdbfe"
    };

    return {
      pattern: selectedPattern,
      trajectory: selectedTrajectory,
      theme: selectedTheme
    };
  }, [itemKey]);

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 opacity-25 dark:opacity-35 group-hover:opacity-60 transition-opacity duration-700"
      aria-hidden="true"
    >
      {/* Container chuyển động theo tuyến đặc trưng */}
      <div className={`w-full h-full relative pattern-trajectory-${trajectory}`}>
        {/* Render Vector hoa văn sắc nét theo từng mẫu */}
        {renderPatternSvg(pattern, theme)}
      </div>
    </div>
  );
}

// Hàm render chi tiết các loại hoa văn vector tinh tế
function renderPatternSvg(pattern: PatternShape, theme: { stroke: string; glow: string; secondary: string }) {
  const { stroke, secondary } = theme;

  switch (pattern) {
    case "circuit-board":
      return (
        <svg viewBox="0 0 300 120" className="w-full h-full object-cover">
          <g fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.8">
            <path d="M 10 30 L 60 30 L 80 50 L 140 50 L 160 30 L 220 30 L 240 60 L 290 60" />
            <path d="M 30 90 L 70 90 L 90 70 L 130 70 L 150 90 L 210 90 L 230 70 L 280 70" strokeDasharray="4 4" />
            <path d="M 100 10 L 100 40 L 120 60 L 120 110" />
            <path d="M 200 10 L 200 40 L 180 60 L 180 110" strokeDasharray="3 3" />
            <circle cx="60" cy="30" r="3" fill={stroke} />
            <circle cx="140" cy="50" r="3" fill={secondary} />
            <circle cx="220" cy="30" r="3" fill={stroke} />
            <circle cx="70" cy="90" r="3" fill={secondary} />
            <circle cx="150" cy="90" r="3" fill={stroke} />
            <circle cx="120" cy="60" r="4" fill="none" stroke={secondary} strokeWidth="1.5" />
            <circle cx="180" cy="60" r="4" fill="none" stroke={stroke} strokeWidth="1.5" />
          </g>
        </svg>
      );

    case "celestial-rings":
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full object-cover">
          <g fill="none" stroke={stroke} strokeWidth="1" opacity="0.75" transform="translate(140, 60)">
            <ellipse cx="0" cy="0" rx="80" ry="35" strokeDasharray="6 3" />
            <ellipse cx="0" cy="0" rx="60" ry="25" />
            <ellipse cx="0" cy="0" rx="40" ry="16" strokeDasharray="3 3" />
            <ellipse cx="0" cy="0" rx="20" ry="8" />
            <circle cx="0" cy="0" r="6" fill={stroke} />
            <circle cx="60" cy="0" r="3.5" fill={secondary} />
            <circle cx="-40" cy="0" r="3" fill={stroke} />
          </g>
        </svg>
      );

    case "quantum-lattice":
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full object-cover">
          <g fill="none" stroke={stroke} strokeWidth="1" opacity="0.7">
            <polygon points="40,20 80,15 110,45 70,60" />
            <polygon points="110,45 160,30 190,65 140,80" />
            <polygon points="70,60 140,80 120,110 50,95" />
            <polygon points="160,30 220,25 250,70 190,65" strokeDasharray="3 3" />
            <circle cx="40" cy="20" r="2.5" fill={secondary} />
            <circle cx="80" cy="15" r="3" fill={stroke} />
            <circle cx="110" cy="45" r="3.5" fill={secondary} />
            <circle cx="70" cy="60" r="3" fill={stroke} />
            <circle cx="140" cy="80" r="3" fill={secondary} />
            <circle cx="190" cy="65" r="3" fill={stroke} />
          </g>
        </svg>
      );

    case "hex-hive":
      return (
        <svg viewBox="0 0 260 120" className="w-full h-full object-cover">
          <g fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.75">
            <path d="M 60 30 L 75 20 L 90 30 L 90 50 L 75 60 L 60 50 Z" />
            <path d="M 90 30 L 105 20 L 120 30 L 120 50 L 105 60 L 90 50 Z" />
            <path d="M 75 60 L 90 50 L 105 60 L 105 80 L 90 90 L 75 80 Z" />
            <path d="M 105 60 L 120 50 L 135 60 L 135 80 L 120 90 L 105 80 Z" strokeDasharray="3 2" />
            <path d="M 120 30 L 135 20 L 150 30 L 150 50 L 135 60 L 120 50 Z" />
            <path d="M 150 30 L 165 20 L 180 30 L 180 50 L 165 60 L 150 50 Z" strokeDasharray="4 3" />
            <circle cx="90" cy="50" r="3" fill={secondary} />
            <circle cx="105" cy="60" r="3" fill={stroke} />
            <circle cx="120" cy="50" r="3" fill={secondary} />
          </g>
        </svg>
      );

    case "octagram-core":
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full object-cover">
          <g fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.75" transform="translate(150, 60)">
            <rect x="-35" y="-35" width="70" height="70" rx="6" />
            <rect x="-35" y="-35" width="70" height="70" rx="6" transform="rotate(45)" stroke={secondary} />
            <rect x="-22" y="-22" width="44" height="44" rx="4" strokeDasharray="4 2" />
            <rect x="-22" y="-22" width="44" height="44" rx="4" transform="rotate(45)" stroke={stroke} />
            <circle cx="0" cy="0" r="12" fill="none" stroke={secondary} strokeWidth="1.5" />
            <circle cx="0" cy="0" r="4" fill={stroke} />
          </g>
        </svg>
      );

    case "geometric-mandala":
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full object-cover">
          <g fill="none" stroke={stroke} strokeWidth="1" opacity="0.8" transform="translate(150, 60)">
            <circle cx="0" cy="0" r="45" strokeDasharray="5 3" />
            <circle cx="0" cy="0" r="30" />
            <circle cx="0" cy="0" r="16" stroke={secondary} />
            <path d="M 0 -45 L 0 45 M -45 0 L 45 0" strokeDasharray="2 2" />
            <path d="M -32 -32 L 32 32 M -32 32 L 32 -32" stroke={secondary} strokeDasharray="2 2" />
            <polygon points="0,-25 18,-18 25,0 18,18 0,25 -18,18 -25,0 -18,-18" stroke={stroke} />
          </g>
        </svg>
      );

    case "radar-target":
      return (
        <svg viewBox="0 0 220 120" className="w-full h-full object-cover">
          <g fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.75" transform="translate(150, 60)">
            <circle cx="0" cy="0" r="50" strokeDasharray="4 4" />
            <circle cx="0" cy="0" r="35" />
            <circle cx="0" cy="0" r="20" stroke={secondary} />
            <circle cx="0" cy="0" r="5" fill={stroke} />
            <line x1="-55" y1="0" x2="55" y2="0" strokeWidth="0.8" />
            <line x1="0" y1="-55" x2="0" y2="55" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="40" y2="-25" stroke={secondary} strokeWidth="1.6" />
            <circle cx="28" cy="-17" r="3" fill={stroke} />
          </g>
        </svg>
      );

    case "diamond-prism":
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full object-cover">
          <g fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.75">
            <polygon points="80,60 130,20 180,60 130,100" />
            <polygon points="95,60 130,32 165,60 130,88" stroke={secondary} strokeDasharray="3 3" />
            <line x1="80" y1="60" x2="180" y2="60" strokeDasharray="4 2" />
            <line x1="130" y1="20" x2="130" y2="100" strokeDasharray="4 2" />
            <circle cx="130" cy="60" r="4" fill={stroke} />
            <polygon points="170,40 195,20 220,40 195,60" stroke={secondary} />
          </g>
        </svg>
      );

    case "radial-sunburst":
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full object-cover">
          <g fill="none" stroke={stroke} strokeWidth="1" opacity="0.7" transform="translate(150, 60)">
            <circle cx="0" cy="0" r="42" />
            <circle cx="0" cy="0" r="24" stroke={secondary} />
            <line x1="0" y1="-48" x2="0" y2="48" />
            <line x1="-48" y1="0" x2="48" y2="0" />
            <line x1="-34" y1="-34" x2="34" y2="34" strokeDasharray="3 2" />
            <line x1="-34" y1="34" x2="34" y2="-34" strokeDasharray="3 2" />
            <circle cx="0" cy="0" r="5" fill={stroke} />
          </g>
        </svg>
      );

    case "cyber-mesh":
      return (
        <svg viewBox="0 0 260 120" className="w-full h-full object-cover">
          <g fill="none" stroke={stroke} strokeWidth="0.8" opacity="0.65">
            <line x1="20" y1="20" x2="240" y2="20" />
            <line x1="20" y1="50" x2="240" y2="50" />
            <line x1="20" y1="80" x2="240" y2="80" />
            <line x1="20" y1="110" x2="240" y2="110" strokeDasharray="4 4" />
            <line x1="40" y1="10" x2="40" y2="115" />
            <line x1="80" y1="10" x2="80" y2="115" strokeDasharray="3 2" />
            <line x1="120" y1="10" x2="120" y2="115" />
            <line x1="160" y1="10" x2="160" y2="115" strokeDasharray="3 2" />
            <line x1="200" y1="10" x2="200" y2="115" />
            <circle cx="120" cy="50" r="3.5" fill={secondary} />
            <circle cx="160" cy="80" r="3.5" fill={stroke} />
          </g>
        </svg>
      );

    case "flow-ribbon":
      return (
        <svg viewBox="0 0 260 120" className="w-full h-full object-cover">
          <g fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.75">
            <path d="M 10 70 Q 70 20 130 65 T 250 50" />
            <path d="M 10 85 Q 70 35 130 80 T 250 65" stroke={secondary} strokeDasharray="4 3" />
            <path d="M 10 55 Q 70 5 130 50 T 250 35" opacity="0.5" />
            <circle cx="130" cy="65" r="3" fill={stroke} />
            <circle cx="190" cy="58" r="2.5" fill={secondary} />
          </g>
        </svg>
      );

    case "origami-poly":
    default:
      return (
        <svg viewBox="0 0 240 120" className="w-full h-full object-cover">
          <g fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.75">
            <polygon points="60,30 110,20 140,70 90,80" />
            <polygon points="110,20 170,30 200,80 140,70" stroke={secondary} strokeDasharray="4 2" />
            <line x1="60" y1="30" x2="140" y2="70" strokeDasharray="3 3" />
            <line x1="110" y1="20" x2="90" y2="80" />
            <circle cx="110" cy="20" r="3" fill={stroke} />
            <circle cx="140" cy="70" r="3.5" fill={secondary} />
          </g>
        </svg>
      );
  }
}
