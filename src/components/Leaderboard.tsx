import React from "react";
import { Brain, Cpu, ShieldCheck, Code2 } from "lucide-react";
import { useLanguage } from "../i18n";
import { cn } from "../lib/utils";
import LeaderboardRow from "./LeaderboardRow";

interface LeaderboardPlayer {
  nameVi: string;
  nameEn: string;
  score: string;
}

interface LeaderboardConfig {
  id: string;
  titleVi: string;
  titleEn: string;
  badge: string;
  icon: React.ElementType;
  iconColor: string;
  gradientTheme: {
    row1: string;
    row2: string;
    row3: string;
    row4: string;
    row5: string;
  };
  players: LeaderboardPlayer[];
}

const LEADERBOARDS: LeaderboardConfig[] = [
  {
    id: "board-1",
    titleVi: "7.6. LẬP TRÌNH: FRONTEND & UI CODE",
    titleEn: "7.6. CODING: FRONTEND & UI CODE",
    badge: "Top 5",
    icon: Code2,
    iconColor: "text-rose-500",
    gradientTheme: {
      row1: "bg-gradient-to-r from-rose-500 to-rose-700",
      row2: "bg-gradient-to-r from-rose-500/90 to-rose-700/90",
      row3: "bg-gradient-to-r from-rose-600/90 to-rose-800/90",
      row4: "bg-gradient-to-r from-rose-600/80 to-rose-900/80",
      row5: "bg-gradient-to-r from-rose-700/75 to-rose-950/75 rounded-b-2xl",
    },
    players: [
      { nameVi: "React & Next.js", nameEn: "React & Next.js", score: "98%" },
      { nameVi: "TypeScript & ESNext", nameEn: "TypeScript & ESNext", score: "95%" },
      { nameVi: "CSS 3D & WebGL/Three.js", nameEn: "CSS 3D & WebGL/Three.js", score: "92%" },
      { nameVi: "Tailwind & Motion", nameEn: "Tailwind & Motion", score: "90%" },
      { nameVi: "Performance & Web Vitals", nameEn: "Performance & Web Vitals", score: "88%" },
    ]
  },
  {
    id: "board-2",
    titleVi: "7.7. TRÍ TUỆ NHÂN TẠO: AI PROMPTING & AGENTS",
    titleEn: "7.7. AI & AGENTS: AI PROMPTING & AGENTS",
    badge: "AI Elite",
    icon: Brain,
    iconColor: "text-purple-500",
    gradientTheme: {
      row1: "bg-gradient-to-r from-purple-500 to-indigo-700",
      row2: "bg-gradient-to-r from-purple-500/90 to-indigo-700/90",
      row3: "bg-gradient-to-r from-purple-600/90 to-indigo-800/90",
      row4: "bg-gradient-to-r from-purple-600/80 to-indigo-900/80",
      row5: "bg-gradient-to-r from-purple-700/75 to-indigo-950/75 rounded-b-2xl",
    },
    players: [
      { nameVi: "Gemini 2.5 Flash & Pro APIs", nameEn: "Gemini 2.5 Flash & Pro APIs", score: "99%" },
      { nameVi: "Agentic Workflows & RAG", nameEn: "Agentic Workflows & RAG", score: "96%" },
      { nameVi: "Structured JSON Generation", nameEn: "Structured JSON Generation", score: "93%" },
      { nameVi: "Function Calling & Tools", nameEn: "Function Calling & Tools", score: "91%" },
      { nameVi: "Real-time Multimodal Live", nameEn: "Real-time Multimodal Live", score: "89%" },
    ]
  },
  {
    id: "board-3",
    titleVi: "7.8. HỆ THỐNG: CRM & SYSTEM ARCHITECTURE",
    titleEn: "7.8. ARCHITECTURE: CRM & SYSTEM ARCHITECTURE",
    badge: "Architecture",
    icon: Cpu,
    iconColor: "text-blue-500",
    gradientTheme: {
      row1: "bg-gradient-to-r from-blue-500 to-cyan-700",
      row2: "bg-gradient-to-r from-blue-500/90 to-cyan-700/90",
      row3: "bg-gradient-to-r from-blue-600/90 to-cyan-800/90",
      row4: "bg-gradient-to-r from-blue-600/80 to-cyan-900/80",
      row5: "bg-gradient-to-r from-blue-700/75 to-cyan-950/75 rounded-b-2xl",
    },
    players: [
      { nameVi: "Enterprise Contact Center", nameEn: "Enterprise Contact Center", score: "97%" },
      { nameVi: "Salesforce & Zoho Integration", nameEn: "Salesforce & Zoho Integration", score: "94%" },
      { nameVi: "Omnichannel Routing Engine", nameEn: "Omnichannel Routing Engine", score: "92%" },
      { nameVi: "PostgreSQL & Drizzle ORM", nameEn: "PostgreSQL & Drizzle ORM", score: "89%" },
      { nameVi: "Firebase Auth & Firestore", nameEn: "Firebase Auth & Firestore", score: "87%" },
    ]
  },
  {
    id: "board-4",
    titleVi: "7.9. CHẤT LƯỢNG: QUALITY ASSURANCE & SLA",
    titleEn: "7.9. STANDARDS: QUALITY ASSURANCE & SLA",
    badge: "Standards",
    icon: ShieldCheck,
    iconColor: "text-emerald-500",
    gradientTheme: {
      row1: "bg-gradient-to-r from-emerald-500 to-teal-700",
      row2: "bg-gradient-to-r from-emerald-500/90 to-teal-700/90",
      row3: "bg-gradient-to-r from-emerald-600/90 to-teal-800/90",
      row4: "bg-gradient-to-r from-emerald-600/80 to-teal-900/80",
      row5: "bg-gradient-to-r from-emerald-700/75 to-teal-950/75 rounded-b-2xl",
    },
    players: [
      { nameVi: "COPC Standard Auditing", nameEn: "COPC Standard Auditing", score: "98%" },
      { nameVi: "Voice Analytics & Speech AI", nameEn: "Voice Analytics & Speech AI", score: "95%" },
      { nameVi: "SLA Risk Control & FCR", nameEn: "SLA Risk Control & FCR", score: "92%" },
      { nameVi: "SOP & Process Documentation", nameEn: "SOP & Process Documentation", score: "90%" },
      { nameVi: "Agent Coaching & 1-on-1", nameEn: "Agent Coaching & 1-on-1", score: "88%" },
    ]
  }
];

export function Leaderboard() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  return (
    <div className="w-full mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {LEADERBOARDS.map((board) => {
        const IconComponent = board.icon;
        const rows = [
          board.gradientTheme.row1,
          board.gradientTheme.row2,
          board.gradientTheme.row3,
          board.gradientTheme.row4,
          board.gradientTheme.row5,
        ];

        return (
          <div 
            key={board.id}
            className={cn(
              "w-full overflow-hidden flex flex-col justify-between transition-all duration-300 border",
              "rounded-[var(--theme-radius-card,24px)]",
              "bg-white/55 dark:bg-[#121218]/55 border-white/50 dark:border-white/12",
              "backdrop-blur-[16px] backdrop-saturate-[180%]",
              "shadow-[0_8px_32px_0_rgba(31,38,135,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]",
              "hover:shadow-[0_12px_40px_0_rgba(31,38_135,0.12)] dark:hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:border-indigo-500/40 dark:hover:border-indigo-400/40"
            )}
          >
            {/* Header Card matching uploaded image with NO icon framing box */}
            <div className="p-4 sm:p-5 flex items-center justify-between bg-transparent border-b border-black/5 dark:border-white/10">
              <div className="flex items-center gap-3">
                <IconComponent className={cn("w-6 h-6 stroke-[2.5] shrink-0", board.iconColor)} />
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight font-play">
                  {isVi ? board.titleVi : board.titleEn}
                </h3>
              </div>

              <span className="px-2.5 py-1 text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-white/10 uppercase tracking-wider">
                {board.badge}
              </span>
            </div>

            {/* Leaderboard List Container with Distinct Color Themes */}
            <div className="w-full flex flex-col overflow-hidden">
              {board.players.map((player, index) => (
                <LeaderboardRow
                  key={index}
                  rank={index + 1}
                  name={isVi ? player.nameVi : player.nameEn}
                  score={player.score}
                  gradientClass={rows[index] || rows[4]}
                  delay={index}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Leaderboard;
