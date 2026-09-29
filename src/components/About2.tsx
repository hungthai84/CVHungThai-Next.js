import React, { useState, memo } from "react";
import { 
  User, 
  Heart, 
  Target, 
  TrendingUp, 
  Building2, 
  MapPin, 
  ChevronRight, 
  ChevronLeft, 
  ArrowRight, 
  Mail, 
  Phone, 
  Globe, 
  Linkedin, 
  Sparkles, 
  Calendar, 
  Home, 
  Users, 
  Briefcase, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Flame, 
  ExternalLink 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";
import { cn } from "../lib/utils";
import { useTheme } from "../context/ThemeContext";
import { PageCardHeader } from "./PageCardHeader";
import { 
  PERSONAL_DEMOGRAPHICS, 
  SERVICE_PHILOSOPHY_VALUES 
} from "../data/aboutData";

const AVATAR_IMG = "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800";
const OFFICE_IMG = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800";
const COLLAB_IMG = "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800";

export interface AboutSlideItem {
  id: string;
  number: string;
  badgeVi: string;
  badgeEn: string;
  tagVi: string;
  tagEn: string;
  titleVi: string;
  titleEn: string;
  headlineVi: string;
  headlineEn: string;
  descVi: string;
  descEn: string;
  image: string;
  accentGradient: string;
  accentBorder: string;
  accentColor: string;
  textColorClass: string;
}

const ABOUT_SLIDES: AboutSlideItem[] = [
  {
    id: "about-slide-profile",
    number: "01",
    badgeVi: "Chân dung & Sứ mệnh",
    badgeEn: "Profile & Mission",
    tagVi: "22+ Năm kinh nghiệm CX",
    tagEn: "22+ Years CX Exp",
    titleVi: "Nguyễn Hùng Thái",
    titleEn: "Nguyen Hung Thai",
    headlineVi: "Senior Customer Experience Leader",
    headlineEn: "Senior Customer Experience Leader",
    descVi: "Chuyên gia Lãnh đạo Vận hành Chăm sóc Khách hàng (CS) & Trải nghiệm Khách hàng (CX) với hơn 22 năm kinh nghiệm thực chiến trong việc quản lý Call Center, chuẩn hóa SOP, nâng cao chỉ số CSAT 94.5% và chuyển đổi số CRM.",
    descEn: "Senior CX Leader with 22+ years of hands-on experience scaling contact centers (150-500+ agents), standardizing SOPs, elevating CSAT to 94.5%, and driving digital CRM transformations.",
    image: AVATAR_IMG,
    accentGradient: "from-blue-600 via-indigo-600 to-cyan-500",
    accentBorder: "border-blue-500/40 hover:border-blue-400",
    accentColor: "#3B82F6",
    textColorClass: "text-blue-600 dark:text-cyan-400"
  },
  {
    id: "about-slide-demographics",
    number: "02",
    badgeVi: "Nhân khẩu học & Kết nối",
    badgeEn: "Demographics & Contact",
    tagVi: "Hồ sơ & Điểm chạm",
    tagEn: "Profile & Touchpoints",
    titleVi: "Thông tin Nhân khẩu học",
    titleEn: "Demographic Information",
    headlineVi: "Lý lịch Bản thân & Kênh Liên lạc",
    headlineEn: "Personal Background & Channels",
    descVi: "Sinh năm 1984, quốc tịch Việt Nam (Dân tộc Kinh). Hiện đang tạm trú tại Q7, TP. Hồ Chí Minh và quê quán tại TP. Mỹ Tho, Tỉnh Đồng Tháp/Tiền Giang. Sẵn sàng kết nối và hợp tác trên các dự án chiến lược.",
    descEn: "Born in 1984, Vietnamese citizen. Currently residing in District 7, Ho Chi Minh City with hometown in My Tho. Open to executive leadership opportunities and consulting partnerships.",
    image: OFFICE_IMG,
    accentGradient: "from-purple-600 via-violet-600 to-pink-500",
    accentBorder: "border-purple-500/40 hover:border-purple-400",
    accentColor: "#8B5CF6",
    textColorClass: "text-purple-600 dark:text-purple-400"
  },
  {
    id: "about-slide-values",
    number: "03",
    badgeVi: "Giá trị Cốt lõi & Triết lý",
    badgeEn: "Core Values & Philosophy",
    tagVi: "4 Trụ cột Dịch vụ",
    tagEn: "4 Service Pillars",
    titleVi: "Triết lý & Giá trị",
    titleEn: "Philosophy & Core Values",
    headlineVi: "4 Giá Trị Cốt Lõi Lấy Khách Hàng Làm Trọng Tâm",
    headlineEn: "4 Customer-Centric Core Values",
    descVi: "Chăm sóc khách hàng không chỉ là giải quyết sự cố, mà là nghệ thuật xây dựng lòng tin bền vững và gia tăng giá trị thương hiệu. Cam kết thực thi 4 giá trị: Tận tâm, Thấu cảm, Hiệu quả và Sáng tạo.",
    descEn: "Customer service is the art of building sustainable trust and brand equity. Committed to 4 core values: Dedication, Empathy, Operational Efficiency, and Innovation.",
    image: COLLAB_IMG,
    accentGradient: "from-emerald-600 via-teal-600 to-cyan-500",
    accentBorder: "border-emerald-500/40 hover:border-emerald-400",
    accentColor: "#10B981",
    textColorClass: "text-emerald-600 dark:text-emerald-400"
  }
];

export function About2() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";
  const { theme } = useTheme();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(1); // Default to Slide 02 to demonstrate the layout
  const totalSlides = ABOUT_SLIDES.length;
  const currentSlide = ABOUT_SLIDES[currentSlideIndex];

  const prevSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
  const nextSlideIndex = (currentSlideIndex + 1) % totalSlides;
  const prevSlide = ABOUT_SLIDES[prevSlideIndex];
  const nextSlide = ABOUT_SLIDES[nextSlideIndex];

  const goToSlide = (newIndex: number) => {
    if (newIndex === currentSlideIndex) return;
    setCurrentSlideIndex(newIndex);
  };

  const goToNextSlide = () => {
    goToSlide(nextSlideIndex);
  };

  const goToPrevSlide = () => {
    goToSlide(prevSlideIndex);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
    window.dispatchEvent(new CustomEvent("app-navigate", { detail: id }));
  };

  return (
    <div className="w-full h-full flex flex-col justify-between overflow-hidden p-2 sm:p-3 md:p-3.5 lg:p-4 font-sans select-none">
      
      {/* 1. TOP TOOLBAR & QUICK SLIDE NAVIGATOR */}
      <div className="relative z-30 w-full flex items-center justify-between pb-2 gap-2 flex-wrap sm:flex-nowrap">
        {/* Left: Section Badge with Page Header */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 text-white shadow-md text-xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span className="font-play font-bold">
              {isVi ? `Giới thiệu 2 • ${currentSlide.badgeVi}` : `About 2 • ${currentSlide.badgeEn}`}
            </span>
          </div>
          <button
            type="button"
            onClick={() => scrollTo("about")}
            className="text-3xs text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-cyan-300 underline font-medium cursor-pointer"
          >
            {isVi ? "← Về Giới thiệu 1" : "← Back to About 1"}
          </button>
        </div>

        {/* Right: Interactive Slide Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-900/75 dark:bg-slate-900/90 backdrop-blur-xl border border-white/15 shadow-md ml-auto">
          {ABOUT_SLIDES.map((slide, idx) => {
            const isActive = currentSlideIndex === idx;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                className={cn(
                  "relative flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer",
                  isActive
                    ? "text-white bg-gradient-to-r shadow-md " + slide.accentGradient
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                )}
                title={isVi ? slide.badgeVi : slide.badgeEn}
              >
                <span className="font-mono">{slide.number}</span>
                <span className="inline-block text-2xs tracking-tight">
                  {isVi ? slide.badgeVi : slide.badgeEn}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="active-about2-pill"
                    className="absolute inset-0 rounded-full ring-2 ring-white/40 pointer-events-none"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. HORIZONTAL SLIDE CAROUSEL WITH ADJACENT SLIDE PEEK */}
      {/*
           SLIDE TRƯỚC          SLIDE HIỆN TẠI          SLIDE SAU
         ┌──────────┐    ┌────────────────────┐    ┌──────────┐
         │  một     │    │   CONTENT SLIDE    │    │  một     │
         │  phần    │    │                    │    │  phần    │
         │  nhìn    │    │  TEXT + IMAGE      │    │  nhìn    │
         │  thấy    │    │                    │    │  thấy    │
         └──────────┘    └────────────────────┘    └──────────┘
      */}
      <div className="relative z-20 w-full flex-grow flex items-center justify-center overflow-hidden">
        
        {/* ========================================================================= */}
        {/* A. SLIDE TRƯỚC (LEFT ADJACENT SLIDE PEEK - Một phần nhìn thấy)             */}
        {/* ========================================================================= */}
        <div 
          onClick={goToPrevSlide}
          className={cn(
            "hidden lg:block absolute left-[-16%] xl:left-[-14%] 2xl:left-[-12%] w-[24%] h-[94%] z-10 cursor-pointer rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500",
            "opacity-55 hover:opacity-95 hover:scale-[1.02] filter blur-[0.5px] hover:blur-none",
            "bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl",
            "group/prev"
          )}
          title={isVi ? `Bấm xem slide trước: ${prevSlide.badgeVi}` : `Previous: ${prevSlide.badgeEn}`}
        >
          {/* Background image preview slice */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none opacity-60">
            <img
              src={prevSlide.image}
              alt={prevSlide.titleVi}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-slate-950/50" />
          </div>

          {/* Left Wing Hover Overlay */}
          <div className="relative z-10 w-full h-full p-4 flex flex-col justify-between items-end text-right">
            <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center shadow-lg border border-white/20 group-hover/prev:scale-110 transition-transform">
              <ChevronLeft className="w-6 h-6 text-white" />
            </div>
            <div className="bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white">
              <span className="text-3xs font-mono font-bold text-rose-400 block">{prevSlide.number} / 03</span>
              <span className="text-xs font-semibold block truncate max-w-[130px]">
                {isVi ? prevSlide.badgeVi : prevSlide.badgeEn}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* B. SLIDE HIỆN TẠI (CENTER ACTIVE CONTENT SLIDE - TEXT + IMAGE)            */}
        {/* ========================================================================= */}
        <div 
          className={cn(
            "relative w-[96%] sm:w-[94%] md:w-[92%] lg:w-[80%] xl:w-[82%] h-[95%] z-20 rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300",
            "bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90",
            "shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)]",
            "flex flex-col justify-between"
          )}
        >
          {/* Main 2-Column Split inside Center Slide Card (Text Left + Image/Media Right) */}
          <div className="relative w-full h-full flex flex-col md:flex-row items-stretch justify-between overflow-hidden">
            
            {/* ----------------- LEFT HALF: TEXT CONTENT ----------------- */}
            <div className="w-full md:w-[52%] lg:w-[50%] xl:w-[48%] h-full p-4 sm:p-6 md:p-7 lg:p-8 flex flex-col justify-between z-20 relative bg-white dark:bg-slate-900 overflow-y-auto">
              
              {/* Top Tag */}
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-3xs font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-700">
                  <Sparkles className="w-3 h-3 text-rose-500" />
                  <span>{isVi ? currentSlide.tagVi : currentSlide.tagEn}</span>
                </div>
              </div>

              {/* Center Content Body */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="my-auto space-y-3 pt-2"
                >
                  {/* Headline */}
                  <div className="space-y-1">
                    <span className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {isVi ? currentSlide.titleVi : currentSlide.titleEn}
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]">
                      {isVi ? currentSlide.headlineVi : currentSlide.headlineEn}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className={cn(
                    "text-xs sm:text-sm leading-relaxed font-normal",
                    currentSlide.textColorClass
                  )}>
                    {isVi ? currentSlide.descVi : currentSlide.descEn}
                  </p>

                  {/* Customized Content Blocks depending on Slide */}
                  {currentSlideIndex === 0 && (
                    /* Slide 1: Quick Stats */
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      <div className="bg-slate-50 dark:bg-slate-800/80 p-2 rounded-xl text-center border border-slate-200/60 dark:border-slate-700/60">
                        <div className="text-sm sm:text-base font-bold text-blue-600 dark:text-cyan-400 font-mono">22+ Năm</div>
                        <div className="text-4xs text-slate-500 dark:text-slate-400">{isVi ? "Kinh nghiệm CX" : "CX Experience"}</div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/80 p-2 rounded-xl text-center border border-slate-200/60 dark:border-slate-700/60">
                        <div className="text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400 font-mono">150+</div>
                        <div className="text-4xs text-slate-500 dark:text-slate-400">{isVi ? "Nhân sự Quản lý" : "Team Managed"}</div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/80 p-2 rounded-xl text-center border border-slate-200/60 dark:border-slate-700/60">
                        <div className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">94.5%</div>
                        <div className="text-4xs text-slate-500 dark:text-slate-400">{isVi ? "Chỉ số CSAT" : "CSAT Score"}</div>
                      </div>
                    </div>
                  )}

                  {currentSlideIndex === 1 && (
                    /* Slide 2: Demographics Pills */
                    <div className="grid grid-cols-2 gap-1.5 pt-1 text-2xs">
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
                        <Calendar className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <div>
                          <span className="text-4xs text-slate-400 block">{isVi ? "Sinh nhật" : "DOB"}</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">22/06/1984</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
                        <MapPin className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <div>
                          <span className="text-4xs text-slate-400 block">{isVi ? "Tạm trú" : "Location"}</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">Q7, TP. HCM</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
                        <Mail className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <div>
                          <span className="text-4xs text-slate-400 block">Email</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200 truncate block max-w-[120px]">hungthai84@gmail.com</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
                        <Phone className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <div>
                          <span className="text-4xs text-slate-400 block">{isVi ? "Điện thoại" : "Phone"}</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">0909097882</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentSlideIndex === 2 && (
                    /* Slide 3: 4 Core Values */
                    <div className="grid grid-cols-2 gap-1.5 pt-1 text-2xs">
                      <div className="p-2 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/40">
                        <span className="font-bold text-emerald-700 dark:text-emerald-300 block">1. Tận tâm (Dedication)</span>
                        <span className="text-4xs text-slate-600 dark:text-slate-400">Khách hàng là trọng tâm</span>
                      </div>
                      <div className="p-2 rounded-xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200/50 dark:border-teal-800/40">
                        <span className="font-bold text-teal-700 dark:text-teal-300 block">2. Thấu cảm (Empathy)</span>
                        <span className="text-4xs text-slate-600 dark:text-slate-400">Lắng nghe góc nhìn người dùng</span>
                      </div>
                      <div className="p-2 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-800/40">
                        <span className="font-bold text-blue-700 dark:text-blue-300 block">3. Hiệu quả (Efficiency)</span>
                        <span className="text-4xs text-slate-600 dark:text-slate-400">Dựa trên dữ liệu thực tế</span>
                      </div>
                      <div className="p-2 rounded-xl bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-200/50 dark:border-cyan-800/40">
                        <span className="font-bold text-cyan-700 dark:text-cyan-300 block">4. Sáng tạo (Innovation)</span>
                        <span className="text-4xs text-slate-600 dark:text-slate-400">Ứng dụng AI & Tự động hóa</span>
                      </div>
                    </div>
                  )}

                  {/* Actions Row */}
                  <div className="pt-2 flex items-center gap-2.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => scrollTo(currentSlideIndex === 1 ? "contact" : currentSlideIndex === 2 ? "skills" : "experience")}
                      className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md hover:translate-x-1"
                    >
                      <span>
                        {currentSlideIndex === 1 
                          ? (isVi ? "Liên hệ ngay" : "Contact Now")
                          : currentSlideIndex === 2
                          ? (isVi ? "Xem Kỹ năng" : "View Skills")
                          : (isVi ? "Xem Kinh nghiệm" : "View Experience")}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollTo("about")}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span>{isVi ? "Chi tiết đầy đủ (Trang 1)" : "Full details (Page 1)"}</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Pagination Inside Card */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                <div className="font-mono text-sm sm:text-base font-bold tracking-widest text-rose-500 dark:text-rose-400">
                  <span>{currentSlide.number}</span>
                  <span className="mx-2 text-slate-400 dark:text-slate-600 font-normal">/</span>
                  <span className="text-slate-400 dark:text-slate-500">03</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {ABOUT_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => goToSlide(idx)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                        idx === currentSlideIndex 
                          ? "w-6 bg-rose-500 dark:bg-rose-400" 
                          : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                      )}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ----------------- RIGHT HALF: IMAGE / MEDIA ----------------- */}
            <div className="w-full md:w-[48%] lg:w-[50%] xl:w-[52%] h-full relative overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide.image}
                  src={currentSlide.image}
                  alt={currentSlide.titleVi}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover object-center brightness-102 contrast-102"
                />
              </AnimatePresence>
              
              {/* Subtle edge fade */}
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white dark:from-slate-900 to-transparent hidden md:block pointer-events-none" />

              {/* Floating Badge on Image */}
              <div className="absolute bottom-4 right-4 z-20 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white shadow-xl flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-bold font-play">{currentSlide.number} • {isVi ? currentSlide.badgeVi : currentSlide.badgeEn}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* C. SLIDE SAU (RIGHT ADJACENT SLIDE PEEK - Một phần nhìn thấy)              */}
        {/* ========================================================================= */}
        <div 
          onClick={goToNextSlide}
          className={cn(
            "hidden lg:block absolute right-[-16%] xl:right-[-14%] 2xl:right-[-12%] w-[24%] h-[94%] z-10 cursor-pointer rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500",
            "opacity-55 hover:opacity-95 hover:scale-[1.02] filter blur-[0.5px] hover:blur-none",
            "bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl",
            "group/next"
          )}
          title={isVi ? `Bấm xem slide tiếp theo: ${nextSlide.badgeVi}` : `Next: ${nextSlide.badgeEn}`}
        >
          {/* Background image preview slice */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none opacity-60">
            <img
              src={nextSlide.image}
              alt={nextSlide.titleVi}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-slate-950/50" />
          </div>

          {/* Right Wing Hover Overlay */}
          <div className="relative z-10 w-full h-full p-4 flex flex-col justify-between items-start text-left">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center shadow-lg border border-white/20 group-hover/next:scale-110 transition-transform">
                <ChevronRight className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xs font-bold text-rose-400 uppercase tracking-wider bg-black/75 px-2 py-1 rounded-md backdrop-blur-sm border border-rose-400/30">
                {isVi ? "Xem tiếp →" : "Next →"}
              </span>
            </div>

            <div className="bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white">
              <span className="text-3xs font-mono font-bold text-rose-400 block">{nextSlide.number} / 03</span>
              <span className="text-xs font-semibold block truncate max-w-[130px]">
                {isVi ? nextSlide.badgeVi : nextSlide.badgeEn}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Arrows */}
        <div className="lg:hidden absolute inset-x-2 top-1/2 -translate-y-1/2 z-30 flex justify-between pointer-events-none px-1">
          <button
            type="button"
            onClick={goToPrevSlide}
            className="pointer-events-auto w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            type="button"
            onClick={goToNextSlide}
            className="pointer-events-auto w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

      </div>

      {/* 3. BOTTOM CAROUSEL FOOTER: Indicator '02 / 03' */}
      <div className="relative z-20 w-full pt-1.5 flex items-center justify-between text-4xs sm:text-3xs text-slate-500 dark:text-slate-400 px-1">
        <div className="flex items-center gap-2">
          <span>{isVi ? `💡 Đang xem Slide ${currentSlide.number}: ${currentSlide.badgeVi} • Nhấp vào hai bên để trượt qua slide khác` : `💡 Slide ${currentSlide.number}: ${currentSlide.badgeEn} • Click adjacent sides to slide`}</span>
        </div>
        <div className="font-mono font-bold text-rose-500 dark:text-rose-400 text-sm">
          {currentSlide.number} / 03
        </div>
      </div>

    </div>
  );
}

export default memo(About2);
