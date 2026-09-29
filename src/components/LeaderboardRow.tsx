import React from "react";
import { motion } from "motion/react";
import { Award } from "lucide-react";
import { cn } from "../lib/utils";


interface LeaderboardRowProps {
  rank: number;
  name: string;
  score: string;
  gradientClass?: string;
  delay?: number;
}

export const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
  rank,
  name,
  score,
  gradientClass = "bg-gradient-to-r from-rose-500 to-rose-700 text-white shadow-md",
  delay = 0
}) => {
  const formattedScore = score.includes("%") ? score : `${score}%`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: delay * 0.05 }}
      whileHover={{ scale: 1.01, x: 2 }}
      className={cn(
        "relative px-4 py-3.5 sm:py-4 flex items-center justify-between cursor-pointer font-play transition-all duration-200 border-b border-white/10 last:border-b-0",
        gradientClass
      )}
    >
      <div className="flex items-center gap-3.5 relative z-10 min-w-0">
        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-slate-900 font-black text-xs sm:text-sm flex items-center justify-center shadow-md shrink-0">
          {rank}
        </span>
        <div className="flex items-center gap-2.5 min-w-0">
          <Award className="w-4 h-4 text-white/90 shrink-0" />
          <span className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
            {name}
          </span>
        </div>
      </div>

      <span className="font-mono font-black text-sm sm:text-base text-white tracking-wide shrink-0 relative z-10 pl-2">
        {formattedScore}
      </span>
    </motion.div>
  );
};

export default LeaderboardRow;
