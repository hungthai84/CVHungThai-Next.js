import React, { useState, useRef, memo } from "react";
import { 
  ArrowRight, 
  Sparkles,
  Play,
  X
} from "lucide-react";
import { SparkleWithPlusDot } from "./HeroIntroButton";
import { useLanguage } from "../i18n";
import { cn } from "../lib/utils";
import { useTheme } from "../context/ThemeContext";
import { playUiSound } from "../lib/sound";

const SLIDES_DATA = [
  {
    id: "home-slide-1",
    bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    videoUrl: "https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4",
    titleVi: "Xin chào!\nTôi là Nguyễn Hùng Thái",
    titleEn: "Hello!\nI am Nguyen Hung Thai",
    descVi: "Tôi kiến tạo những trải nghiệm số tinh tế & hình ảnh thương hiệu giàu cảm xúc. Cung cấp giải pháp phát triển web chuyên nghiệp, chất lượng cao.",
    descEn: "I create sophisticated digital experiences and emotionally resonant brand identities. Delivering professional, high-quality web solutions.",
    ctaTextVi: "Khám phá ngay",
    ctaTextEn: "Explore now",
    targetSection: "about",
    badgeVi: "Video Giới Thiệu",
    badgeEn: "Intro Video",
    isVideoSlide: true
  },
  {
    id: "home-slide-video",
    bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    videoUrl: "https://cdn.scena.ai/project/8606/5f84521bf5c51ff234fb0f4029fb9fba29e7e386f13912a56bc7ee25aebcbc10.mp4",
    titleVi: "Video Giới thiệu\nNăng lực & Tầm nhìn",
    titleEn: "Video Presentation\nCompetency & Vision",
    descVi: "Thuyết trình tổng quan hành trình 22+ năm lãnh đạo vận hành CX, chiến lược chuyển đổi số và kiến trúc hệ sinh thái dịch vụ khách hàng bền vững.",
    descEn: "Executive presentation covering 22+ years of CX operational leadership, digital transformation strategies, and customer ecosystem architecture.",
    ctaTextVi: "Xem Chi Tiết",
    ctaTextEn: "Learn More",
    targetSection: "about",
    badgeVi: "Tầm Nhìn & Năng Lực",
    badgeEn: "Vision & Skills",
    isVideoSlide: true
  },
  {
    id: "home-slide-2",
    bgImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80",
    videoUrl: "https://cdn.scena.ai/project/8606/ac120a105730c378447fd67f5e8b6aeb9557b5e4e8854ac2e21148d5316f780b.mp4",
    titleVi: "Thiết kế UI/UX\nĐột phá & Sáng tạo",
    titleEn: "UI/UX Design\nBreakthrough & Creative",
    descVi: "Tập trung tối đa vào tính thẩm mỹ và trải nghiệm người dùng liền mạch. Mang đến giải pháp kỹ thuật số giúp thương hiệu bứt phá.",
    descEn: "Maximum focus on aesthetics and seamless user experience. Delivering digital solutions that propel brands forward.",
    ctaTextVi: "Xem Thêm",
    ctaTextEn: "View More",
    targetSection: "skills",
    badgeVi: "Mẫu Sáng Tạo",
    badgeEn: "Creative Showcase",
    isVideoSlide: true
  }
];

function Hero() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";
  const { theme } = useTheme();
  const [activeModalVideo, setActiveModalVideo] = useState<{ url: string; title: string } | null>(null);

  const scrollTo = (id: string) => {
    try { playUiSound("click"); } catch {}
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
    window.dispatchEvent(new CustomEvent("app-navigate", { detail: id }));
  };

  return (
    <section 
      id="home" 
      className="relative w-full h-full flex flex-col justify-stretch items-stretch p-0 font-sans text-slate-800 dark:text-slate-100 select-none overflow-y-auto no-scrollbar"
    >
      {/* 3 Separate Card Boxes arranged horizontally with 15px gap */}
      <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-3 gap-[15px] items-stretch min-h-[520px]">
        {SLIDES_DATA.map((slide, idx) => (
          <div
            key={slide.id}
            style={{ 
              backgroundImage: slide.videoUrl ? undefined : `url('${slide.bgImage}')`, 
              borderRadius: "var(--theme-radius-card, 14px)" 
            }}
            className="relative w-full h-full min-h-[460px] lg:min-h-full overflow-hidden p-5 sm:p-6 md:p-7 flex flex-col justify-between border border-white/25 dark:border-white/15 shadow-xl bg-cover bg-center group text-left transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bento-card bg-transparent"
          >
            {/* Background Video Layer */}
            {slide.videoUrl && (
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <video
                  src={slide.videoUrl}
                  poster={slide.bgImage}
                  autoPlay
                  playsInline
                  loop
                  muted
                  className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            )}

            {/* 100% Transparent Background Layer with subtle gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-slate-950/20 pointer-events-none z-0" />

            {/* Top Badge & Number Counter */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/35 backdrop-blur-md shadow-sm">
                <Sparkles className="w-3.5 h-3.5 fill-current shrink-0" />
                <span className="font-play">
                  {isVi ? slide.badgeVi : slide.badgeEn}
                </span>
              </div>

              <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
                0{idx + 1} / 0{SLIDES_DATA.length}
              </span>
            </div>

            {/* Middle Content: Title, Play Button, Description */}
            <div className="relative z-10 space-y-3.5 my-auto py-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl sm:text-2xl lg:text-[22px] xl:text-2xl font-black font-play tracking-tight text-white leading-snug whitespace-pre-line drop-shadow-lg">
                  {isVi ? slide.titleVi : slide.titleEn}
                </h2>

                {slide.isVideoSlide && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      try { playUiSound("click"); } catch {}
                      setActiveModalVideo({
                        url: slide.videoUrl || "",
                        title: isVi ? slide.titleVi.replace(/\n/g, " · ") : slide.titleEn.replace(/\n/g, " · ")
                      });
                    }}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white flex items-center justify-center shadow-lg shadow-red-500/30 hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/30 shrink-0"
                    title={isVi ? "Xem video toàn màn hình" : "Watch Fullscreen Video"}
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </button>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-200 dark:text-slate-300 font-medium leading-relaxed">
                {isVi ? slide.descVi : slide.descEn}
              </p>
            </div>

            {/* Bottom Action Button */}
            <div className="relative z-10 pt-3 border-t border-white/15 flex items-center justify-between gap-3">
              <div 
                onClick={() => scrollTo(slide.targetSection)}
                className="relative inline-flex items-center justify-between rounded-full p-[2px] select-none group/container transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] w-full h-[42px] overflow-hidden shadow-[0_0_20px_rgba(78,86,246,0.5)] ring-2 ring-indigo-400/50 cursor-pointer"
              >
                {/* Rotating Glowing Laser Beam Border */}
                <div className="absolute -inset-[220%] animate-[spin_4s_linear_infinite] pointer-events-none bg-[conic-gradient(from_0deg,transparent_0_200deg,#4E56F6_250deg,#F125D6_300deg,#ffffff_340deg,#4E56F6_360deg)] opacity-100" />

                {/* Capsule Outer Pill Shell */}
                <div className="relative z-10 inline-flex items-center justify-between w-full h-full rounded-full bg-gradient-to-r from-[#4E56F6] via-[#8938F8] to-[#F125D6] px-4 py-1 gap-2 shadow-inner backdrop-blur-md">
                  <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] text-white font-extrabold text-xs sm:text-sm tracking-wide">
                    {isVi ? slide.ctaTextVi : slide.ctaTextEn}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <SparkleWithPlusDot className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Fullscreen Modal */}
      {activeModalVideo && (
        <div 
          onClick={() => setActiveModalVideo(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl flex flex-col"
          >
            <div className="p-3 bg-slate-900/90 flex items-center justify-between text-white border-b border-white/10 px-4">
              <span className="text-xs sm:text-sm font-bold font-play">
                {activeModalVideo.title}
              </span>
              <button
                type="button"
                onClick={() => setActiveModalVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative flex-1 w-full h-full">
              <video
                src={activeModalVideo.url}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default memo(Hero);
