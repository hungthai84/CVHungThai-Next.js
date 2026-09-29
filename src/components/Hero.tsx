import React, { useState, useRef, useEffect, memo } from "react";
import PageBanner from "./PageBanner";
import { 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { cn } from "../lib/utils";
import { useTheme } from "../context/ThemeContext";
import { playUiSound } from "../lib/sound";

const SLIDES_DATA = [
  {
    id: "home-slide-1",
    bgImage: "https://www.themezaa.com/html/muu/black/images/home-slider-1.jpg",
    titleVi: "Xin chào!\nTôi là Nguyễn Hùng Thái",
    titleEn: "Hello!\nI am Nguyen Hung Thai",
    descVi: "Tôi kiến tạo những trải nghiệm số tinh tế & hình ảnh thương hiệu giàu cảm xúc. Cung cấp giải pháp phát triển web chuyên nghiệp, chất lượng cao.",
    descEn: "I create sophisticated digital experiences and emotionally resonant brand identities. Delivering professional, high-quality web solutions.",
    ctaTextVi: "Khám phá ngay",
    ctaTextEn: "Explore now",
    targetSection: "about",
    showSignature: true
  },
  {
    id: "home-slide-2",
    bgImage: "https://www.themezaa.com/html/muu/black/images/home-slider-2.jpg",
    titleVi: "Thiết kế UI/UX\nĐột phá & Sáng tạo",
    titleEn: "UI/UX Design\nBreakthrough & Creative",
    descVi: "Tập trung tối đa vào tính thẩm mỹ và trải nghiệm người dùng liền mạch. Mang đến giải pháp kỹ thuật số giúp thương hiệu bứt phá.",
    descEn: "Maximum focus on aesthetics and seamless user experience. Delivering digital solutions that propel brands forward.",
    ctaTextVi: "Xem Thêm",
    ctaTextEn: "View More",
    targetSection: "skills",
    showSignature: false
  },
  {
    id: "home-slide-3",
    bgImage: "https://www.themezaa.com/html/muu/black/images/home-slider-3.jpg",
    titleVi: "Cam kết\nChất lượng hàng đầu",
    titleEn: "Commitment to\nTop Quality",
    descVi: "Chúng tôi thiết kế với mục tiêu chuyển đổi rõ rệt. Mỗi giao diện không chỉ đẹp mắt mà còn sở hữu mục đích kinh doanh cụ thể.",
    descEn: "We design with clear conversion goals. Every interface is not only stunning but serves a specific business purpose.",
    ctaTextVi: "Xem Dự Án",
    ctaTextEn: "View Projects",
    targetSection: "projects",
    showSignature: false
  }
];

function Hero() {
  const { t, lang } = useLanguage();
  const isVi = lang === "vi";
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
    window.dispatchEvent(new CustomEvent("app-navigate", { detail: id }));
  };

  const handlePrevSlide = () => {
    playUiSound("click");
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : SLIDES_DATA.length - 1));
  };

  const handleNextSlide = () => {
    playUiSound("click");
    setCurrentIndex((prev) => (prev < SLIDES_DATA.length - 1 ? prev + 1 : 0));
  };

  // Auto slide timer & Custom event listeners for edge slide buttons
  useEffect(() => {
    const handleNextEvent = () => handleNextSlide();
    const handlePrevEvent = () => handlePrevSlide();

    window.addEventListener("app-slide-next", handleNextEvent);
    window.addEventListener("app-slide-prev", handlePrevEvent);

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev < SLIDES_DATA.length - 1 ? prev + 1 : 0));
    }, 6000);

    return () => {
      clearInterval(timer);
      window.removeEventListener("app-slide-next", handleNextEvent);
      window.removeEventListener("app-slide-prev", handlePrevEvent);
    };
  }, []);

  const slide = SLIDES_DATA[currentIndex];

  return (
    <section 
      id="home" 
      className="relative w-full h-full flex flex-col justify-stretch items-stretch p-0 font-sans text-slate-800 dark:text-slate-100 select-none overflow-hidden"
    >
      {/* Main Card Slider matching Main Card Dimensions 100% */}
      <div className="w-full h-full flex-1 flex flex-col justify-stretch relative">
        <div 
          style={{ 
            backgroundImage: `url('${slide.bgImage}')`, 
            borderRadius: "var(--theme-radius-card, 10px)" 
          }}
          className="relative w-full h-full flex-1 overflow-hidden p-6 sm:p-10 flex flex-col justify-between border border-white/25 dark:border-white/15 shadow-2xl bg-cover bg-center group text-left transition-all duration-500"
        >
          {/* Transparent Scrim Overlay to clearly show background image */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/20 to-transparent backdrop-blur-none" />

          {/* Top Badge & Number & Controls */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/35 backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 fill-current shrink-0" />
              <span className="font-play">{isVi ? "Mẫu Sáng Tạo" : "Creative Showcase"}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
                0{currentIndex + 1} / 0{SLIDES_DATA.length}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                  title="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                  title="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Middle Content: Title & Description with AnimatePresence */}
          <div className="relative z-10 space-y-4 my-auto py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <h2 className="text-2xl sm:text-4xl font-black font-play tracking-tight text-white leading-snug whitespace-pre-line drop-shadow-lg">
                  {isVi ? slide.titleVi : slide.titleEn}
                </h2>

                <p className="text-sm sm:text-base text-slate-200 dark:text-slate-300 font-medium leading-relaxed max-w-3xl">
                  {isVi ? slide.descVi : slide.descEn}
                </p>

                {slide.showSignature && (
                  <div className="pt-2">
                    <svg 
                      className="w-36 h-12 text-cyan-400 opacity-95 relative select-none pointer-events-none" 
                      viewBox="0 0 220 80" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3.4" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M 30 60 C 45 45, 60 10, 72 32 C 80 52, 85 15, 98 32 C 108 45, 115 58, 128 22 C 135 12, 142 45, 185 28" />
                      <path d="M 38 42 L 185 34" strokeWidth="2" />
                      <path d="M 82 10 L 82 65" strokeWidth="2.8" />
                    </svg>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Action Button & Slide Dots */}
          <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              {SLIDES_DATA.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    playUiSound("click");
                    setCurrentIndex(i);
                  }}
                  className={cn(
                    "transition-all rounded-full cursor-pointer",
                    i === currentIndex 
                      ? "w-8 h-2 bg-emerald-400 shadow-md shadow-emerald-500/50" 
                      : "w-2 h-2 bg-white/40 hover:bg-white/70"
                  )}
                  title={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollTo(slide.targetSection)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer active:scale-95 group"
            >
              <span>{isVi ? slide.ctaTextVi : slide.ctaTextEn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
