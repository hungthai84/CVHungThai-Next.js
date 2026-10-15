'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import App from '../src/App';
import ErrorBoundaryHandler from '../src/components/ErrorBoundaryHandler';

// Các câu tips/châm ngôn công nghệ truyền cảm hứng
const TECH_TIPS = [
  "Tối ưu trải nghiệm UI/UX — Nâng tầm giá trị sản phẩm số.",
  "Xây dựng hệ thống hiện đại, chuẩn hóa & tối ưu hiệu năng tối đa.",
  "Phong cách Dark Neon Glass UI — Sáng tạo không giới hạn.",
  "Thiết kế chuẩn Responsive — Tối ưu hoàn hảo trên mọi thiết bị.",
  "Đồng bộ hóa dữ liệu & Tương tác thông minh vượt trội."
];

// Lấy lời chào theo thời gian trong ngày
const getGreetingByTime = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) {
    return {
      title: "Chào buổi sáng!",
      sub: "Chúc bạn một ngày mới đầy năng lượng & ý tưởng sáng tạo ☀️"
    };
  } else if (hour >= 11 && hour < 18) {
    return {
      title: "Chào buổi chiều!",
      sub: "Chúc bạn một ngày làm việc hiệu quả & tràn đầy cảm hứng 🌤️"
    };
  } else {
    return {
      title: "Chào buổi tối!",
      sub: "Thư giãn & cùng khám phá không gian tương tác độc đáo 🌙"
    };
  }
};

// Hàm phát âm thanh haptic hoàn thành nhẹ nhàng bằng Web Audio API
const playCompletionChime = () => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    
    // Hợp âm C Major Triad mượt mà
    const freqs = [523.25, 659.25, 783.99, 1046.50];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);
      
      gain.gain.setValueAtTime(0.04, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.35);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.4);
    });
  } catch {
    // Bỏ qua nếu chính sách trình duyệt chặn tự động phát âm thanh
  }
};

export default function Page() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [greeting, setGreeting] = useState({ title: "Xin chào!", sub: "Đang khởi tạo không gian tương tác..." });

  // 1. Nhận diện Theme Sáng / Tối từ localStorage & System Settings
  useEffect(() => {
    setGreeting(getGreetingByTime());

    try {
      const savedMode = localStorage.getItem("portfolio_theme_mode");
      const savedTheme = localStorage.getItem("portfolio_theme");

      if (savedMode === "light" || savedTheme === "glass-light-multicolor" || savedTheme === "soft" || savedTheme === "pastel-glass") {
        setIsDark(false);
      } else if (savedMode === "dark" || savedTheme === "glass-dark-neon" || savedTheme === "dark") {
        setIsDark(true);
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDark(prefersDark);
      }
    } catch {
      setIsDark(true);
    }
  }, []);

  // 2. Chuyển đổi Tip công nghệ mỗi 2.5 giây
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TECH_TIPS.length);
    }, 2500);
    return () => clearInterval(tipInterval);
  }, []);

  // 3. Tiến trình đếm phần trăm tải mượt mà (0% -> 100%)
  useEffect(() => {
    const duration = 1800; // 1.8s
    const startTime = performance.now();

    const animateProgress = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const calculatedProgress = Math.min(100, Math.floor((elapsedTime / duration) * 100));
      
      setProgress(calculatedProgress);

      if (calculatedProgress < 100) {
        requestAnimationFrame(animateProgress);
      } else {
        playCompletionChime();
        // Giữ lại 150ms ở mốc 100% trước khi kích hoạt hiệu ứng chuyển cảnh
        setTimeout(() => {
          setLoadingComplete(true);
        }, 200);
      }
    };

    const frameId = requestAnimationFrame(animateProgress);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden select-none font-sans">
      <AnimatePresence mode="wait">
        {!loadingComplete ? (
          <motion.div
            key="splash-screen"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between p-6 sm:p-10 transition-colors duration-500 ${
              isDark 
                ? "bg-[#050B1A] text-slate-100" 
                : "bg-[#F5F7FD] text-slate-800"
            }`}
          >
            {/* Background Ambient Glow Lights */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div 
                className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-40 transition-all duration-700 ${
                  isDark ? "bg-cyan-500/30" : "bg-sky-400/25"
                }`} 
              />
              <div 
                className={`absolute -bottom-32 right-10 w-[450px] h-[450px] rounded-full blur-[120px] opacity-35 transition-all duration-700 ${
                  isDark ? "bg-violet-600/30" : "bg-purple-300/30"
                }`} 
              />
            </div>

            {/* Top Bar - Header nhận diện ngắn gọn */}
            <div className="w-full max-w-2xl flex items-center justify-between text-xs font-semibold tracking-wider uppercase opacity-80 z-10 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00E5FF]"></span>
                <span className={isDark ? "text-cyan-300" : "text-sky-600"}>Portfolio System</span>
              </div>
              <div className={isDark ? "text-slate-400" : "text-slate-500"}>
                Nguyễn Hùng Thái
              </div>
            </div>

            {/* Center Area - Logo 3D Neon Glass & Glow Ring + Dynamic Greetings */}
            <div className="my-auto flex flex-col items-center text-center z-10 max-w-lg px-4">
              
              {/* Logo 3D Neon Container with Rotating Glow Ring */}
              <div className="relative mb-8 flex items-center justify-center">
                {/* Neon Glow Ring xoay 360 độ */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 rounded-[32px] p-[2px] opacity-80 blur-sm bg-gradient-to-tr from-cyan-400 via-blue-500 via-violet-500 to-pink-500"
                />

                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 rounded-[28px] p-[1.5px] opacity-60 bg-gradient-to-r from-teal-300 via-cyan-400 to-indigo-500"
                />

                {/* Khung Kính Glassmorphism chính */}
                <div className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-2xl border transition-all duration-500 ${
                  isDark 
                    ? "bg-slate-900/60 border-cyan-400/30 shadow-cyan-500/20" 
                    : "bg-white/70 border-white/90 shadow-sky-200/50"
                }`}>
                  {/* Biểu tượng HT Typography Neon */}
                  <span className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]">
                    HT
                  </span>
                </div>
              </div>

              {/* Lời chào động theo buổi trong ngày */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-1.5"
              >
                <h1 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
                  isDark ? "text-white" : "text-slate-900"
                }`}>
                  {greeting.title}
                </h1>
                <p className={`text-xs sm:text-sm font-medium max-w-sm mx-auto leading-relaxed ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}>
                  {greeting.sub}
                </p>
              </motion.div>
            </div>

            {/* Bottom Area - Progress Bar 0-100% & Tech Tips Carousel */}
            <div className="w-full max-w-md flex flex-col items-center gap-5 z-10 pb-4">
              
              {/* Tech Tips Carousel */}
              <div className="h-10 flex items-center justify-center px-4 text-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={tipIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className={`text-xs font-medium italic ${
                      isDark ? "text-cyan-300/90" : "text-sky-700"
                    }`}
                  >
                    "{TECH_TIPS[tipIndex]}"
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Floating Percentage Counter */}
              <div className="w-full flex items-center justify-between text-xs font-bold px-1">
                <span className={isDark ? "text-slate-400" : "text-slate-500"}>
                  Đang khởi tạo không gian...
                </span>
                <span className="font-mono text-sm bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  {progress}%
                </span>
              </div>

              {/* Progress Bar Container Glass */}
              <div className={`w-full h-2.5 rounded-full p-0.5 overflow-hidden backdrop-blur-md border transition-all duration-500 ${
                isDark 
                  ? "bg-slate-900/80 border-slate-700/60 shadow-inner" 
                  : "bg-slate-200/80 border-white shadow-inner"
              }`}>
                {/* Progress Fill Indicator */}
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 via-violet-500 to-pink-500 shadow-[0_0_12px_#00E5FF]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full min-h-screen"
          >
            <App />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
