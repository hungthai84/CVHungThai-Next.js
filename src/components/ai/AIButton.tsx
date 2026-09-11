import React from 'react';
import { Sparkles, Bot, X, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';

interface AIButtonProps {
  onClick: () => void;
  isOpen: boolean;
  aiName?: string;
  isSpeaking?: boolean;
}

export const AIButton: React.FC<AIButtonProps> = ({
  onClick,
  isOpen,
  aiName = "Trí Nhân AI",
  isSpeaking = false
}) => {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9990] flex items-center gap-2.5 pointer-events-auto group">
      {/* Floating Tooltip Glass Tag */}
      {!isOpen && (
        <motion.div 
          initial={{ opacity: 0, x: 10, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          className="hidden xs:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 dark:bg-black/90 text-white text-xs font-black border border-purple-500/30 dark:border-purple-400/40 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:border-purple-400 group-hover:scale-105 pointer-events-none select-none"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-amber-200 bg-clip-text text-transparent">
            AI Hỗ Trợ • {aiName}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </motion.div>
      )}

      {/* Main Floating Trigger Button with Animated Glowing Border */}
      <motion.button
        id="btn-open-ai-assistant"
        onClick={onClick}
        aria-label={`Mở Trợ lý AI Hỗ trợ ${aiName}`}
        animate={!isOpen ? { y: [0, -4, 0] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className={`relative w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer backdrop-blur-2xl ${
          isOpen
            ? 'bg-slate-950 text-indigo-300 border-2 border-indigo-400 rotate-90 scale-105 shadow-indigo-500/30'
            : 'bg-slate-900/95 text-purple-300 hover:scale-110 active:scale-95 shadow-purple-500/30'
        }`}
      >
        {/* Animated Multi-color Rotating Gradient Halo Ring */}
        {!isOpen && (
          <>
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 opacity-70 blur-md group-hover:opacity-100 transition-opacity animate-pulse" />
            <span className="absolute -inset-[3px] rounded-full p-[2px] overflow-hidden pointer-events-none z-0">
              <span className="absolute inset-[-200%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,#8b5cf6_0deg,#ec4899_120deg,#f59e0b_240deg,#8b5cf6_360deg)]" />
            </span>
          </>
        )}

        <div className="relative z-10 flex items-center justify-center w-full h-full rounded-full bg-slate-900/90 dark:bg-slate-950/90">
          {isOpen ? (
            <X className="w-5 h-5 text-indigo-300" />
          ) : isSpeaking ? (
            <Volume2 className="w-5 h-5 text-amber-300 animate-bounce" />
          ) : (
            <div className="relative">
              <Bot className="w-6 h-6 text-purple-300 group-hover:text-amber-200 transition-colors" />
              <Sparkles className="w-3 h-3 text-amber-300 absolute -top-1 -right-1 animate-ping" />
            </div>
          )}
        </div>

        {/* Live Online Dot */}
        {!isOpen && (
          <span className="absolute top-0 right-0 z-20 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900 shadow-xs" />
          </span>
        )}
      </motion.button>
    </div>
  );
};
