import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { 
  Star, Calendar, User, Palette, 
  Briefcase, Wallet, Plane, Users, Heart,
  Sun, Droplets, Sprout, Flame, Mountain,
  TrendingUp, CheckCircle2, Moon, Clock, Hash,
  Sparkles, Play, Pause, Compass, Shield, Target,
  Search, ArrowRight, Check, Award, Layers, Zap, Eye
} from "lucide-react";
import { useLanguage } from "../i18n";
import { 
  TU_VI_PROFILE, 
  WORK_PERSONALITY_TRAITS, 
  SIX_CORE_PALACES, 
  FIVE_ELEMENTS_GOVERNANCE, 
  ZODIAC_SYNERGY_LIST, 
  FINAL_PHILOSOPHY,
  ZodiacSynergyItem 
} from "../data/tuviData";
import { playUiSound } from "../lib/sound";
import { PageCardHeader } from "./PageCardHeader";

export default function TuVi() {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  // Audio Playback State for Yin-Yang Circle
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Zodiac Synergy Tab / Interactive Lookup State
  const [selectedZodiacId, setSelectedZodiacId] = useState<string>("than");
  const [searchYearInput, setSearchYearInput] = useState<string>("");
  const [zodiacFilterTier, setZodiacFilterTier] = useState<string>("all");

  const toggleAudio = () => {
    playUiSound("click");
    if (!audioRef.current) {
      audioRef.current = new Audio("https://cdn.scena.ai/project/9626/b40b848d5a2ad108760073e8c64bd80f963850ab7e79c19af228c82a83f6419d.mp3");
      audioRef.current.loop = true;
    }
    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsAudioPlaying(true);
    }
  };

  // Find active zodiac data
  const currentZodiac = ZODIAC_SYNERGY_LIST.find(z => z.id === selectedZodiacId) || ZODIAC_SYNERGY_LIST[0];

  // Handle year search
  const handleYearSearch = () => {
    const year = parseInt(searchYearInput.trim(), 10);
    if (!isNaN(year) && year >= 1920 && year <= 2040) {
      playUiSound("click");
      const zodiacOrder = ["than", "dau", "tuat", "hoi", "ty", "suu", "dan", "mao", "thin", "ty_snake", "ngo", "mui"];
      const targetId = zodiacOrder[year % 12];
      setSelectedZodiacId(targetId);
    }
  };

  const filteredZodiacList = ZODIAC_SYNERGY_LIST.filter(item => {
    if (zodiacFilterTier === "all") return true;
    return item.tier === zodiacFilterTier;
  });

  const getZodiacTheme = (tier: string) => {
    if (tier === "best") {
      return {
        accent: "emerald",
        badge: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs",
        bgUnselected: "bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-100",
        bgSelected: "bg-gradient-to-br from-emerald-500/25 via-teal-500/20 to-emerald-600/30 border-emerald-400 dark:border-emerald-400 ring-2 ring-emerald-400/80 shadow-[0_0_20px_rgba(16,185,129,0.35)] scale-105",
        textColor: "text-emerald-700 dark:text-emerald-300",
        accentBg: "bg-emerald-500/10 border-emerald-500/30",
        gradientBox: "from-emerald-500/15 via-teal-500/10 to-emerald-500/15 border-emerald-500/40 dark:border-emerald-400/50",
      };
    }
    if (tier === "support") {
      return {
        accent: "cyan",
        badge: "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-xs",
        bgUnselected: "bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/30 dark:border-cyan-500/40 text-cyan-900 dark:text-cyan-100",
        bgSelected: "bg-gradient-to-br from-cyan-500/25 via-sky-500/20 to-blue-600/30 border-cyan-400 dark:border-cyan-400 ring-2 ring-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.35)] scale-105",
        textColor: "text-cyan-700 dark:text-cyan-300",
        accentBg: "bg-cyan-500/10 border-cyan-500/30",
        gradientBox: "from-cyan-500/15 via-sky-500/10 to-blue-500/15 border-cyan-500/40 dark:border-cyan-400/50",
      };
    }
    if (tier === "luc_hop") {
      return {
        accent: "purple",
        badge: "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-xs",
        bgUnselected: "bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30 dark:border-purple-500/40 text-purple-900 dark:text-purple-100",
        bgSelected: "bg-gradient-to-br from-purple-500/25 via-fuchsia-500/20 to-pink-600/30 border-purple-400 dark:border-purple-400 ring-2 ring-purple-400/80 shadow-[0_0_20px_rgba(168,85,247,0.35)] scale-105",
        textColor: "text-purple-700 dark:text-purple-300",
        accentBg: "bg-purple-500/10 border-purple-500/30",
        gradientBox: "from-purple-500/15 via-fuchsia-500/10 to-pink-500/15 border-purple-500/40 dark:border-purple-400/50",
      };
    }
    return {
      accent: "amber",
      badge: "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xs",
      bgUnselected: "bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 dark:border-amber-500/40 text-amber-900 dark:text-amber-100",
      bgSelected: "bg-gradient-to-br from-amber-500/25 via-orange-500/20 to-amber-600/30 border-amber-400 dark:border-amber-400 ring-2 ring-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.35)] scale-105",
      textColor: "text-amber-700 dark:text-amber-300",
      accentBg: "bg-amber-500/10 border-amber-500/30",
      gradientBox: "from-amber-500/15 via-orange-500/10 to-amber-500/15 border-amber-500/40 dark:border-amber-400/50",
    };
  };

  return (
    <section 
      id="tuvi" 
      className="relative w-full min-h-full flex flex-col justify-start items-center p-3 sm:p-4.5 md:p-6 lg:p-6 font-sans text-slate-800 dark:text-slate-100"
    >
      {/* Main Container - Thẻ chứa toàn bộ trang Tử vi */}
      <div className="w-full bg-transparent flex flex-col gap-4 sm:gap-6">

        {/* Container Tử vi - đem nội dung ra ngoài thẻ chứa */}
        <div 
          id="info-card-tuvi" 
          className="w-full flex flex-col gap-6 relative z-10"
        >
          {/* Header Card Tử vi (Caption / Label: 12px – 13px) */}
          <PageCardHeader pageId="tuvi">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-5 bg-purple-600 dark:bg-purple-400 rounded-full shrink-0" />
              <span className="text-caption font-mono font-black text-purple-700 dark:text-purple-400 bg-purple-500/15 px-2.5 py-0.5 rounded-full border border-purple-500/30 shadow-2xs">
                {isVi ? "Giáp Tý 1984 • Hải Trung Kim • 5 Phân khúc chuyên sâu" : "1984 Wood Rat • Sea Metal • 5 In-depth Sections"}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:ml-auto">
              <span className="text-caption font-semibold text-slate-600 dark:text-slate-400">
                {isVi ? "Nguyễn Hùng Thái • Giáp Tý 1984" : "Nguyen Hung Thai • Wood Rat 1984"}
              </span>
            </div>
          </PageCardHeader>

          {/* ================= PHẦN 1: THÔNG TIN CHUNG ================= */}
          <div id="tuvi-section-1" className="w-full bg-white/70 dark:bg-slate-900/80 border border-slate-200/80 dark:border-purple-400/35 rounded-2xl p-3 sm:p-4.5 md:p-6 shadow-xs dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(168,85,247,0.2),inset_0_1.5px_2px_rgba(255,255,255,0.18)] hover:dark:border-purple-400/60 backdrop-blur-2xl transition-all duration-300 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-purple-200/50 dark:border-purple-800/50">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 shrink-0">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-purple-600 dark:text-purple-400">
                1. Thông tin chung
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Cột trái: La Bàn Âm Dương & Trình phát âm thanh thiền định */}
              <div className="lg:col-span-4 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 dark:from-purple-500/10 dark:to-indigo-500/10 rounded-xl p-5 flex flex-col items-center justify-between text-center space-y-4">
                {/* Header định dạng giống Chi tiết phỏng vấn */}
                <div className="flex items-center justify-between pb-3 border-b border-purple-200/40 dark:border-purple-800/40 mb-1 w-full text-left">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-5 bg-purple-600 rounded-full shrink-0" />
                    <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                    <h3 className="text-sm font-black text-purple-600 dark:text-purple-400 tracking-wide">
                      {isVi ? "Âm dương la bàn" : "Yin yang compass"}
                    </h3>
                  </div>
                  <span className="text-3xs font-black px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                    1984 - 2026+
                  </span>
                </div>

                {/* Vòng quay Âm Dương tương tác */}
                <div className="relative my-2">
                  <div 
                    onClick={toggleAudio}
                    className={`w-28 h-28 xs:w-36 xs:h-36 sm:w-40 sm:h-40 rounded-full p-1.5 shadow-md flex items-center justify-center cursor-pointer transition-all duration-500 group ${
                      isAudioPlaying 
                        ? "bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 ring-2 ring-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" 
                        : "bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 ring-2 ring-amber-300/30 hover:scale-105"
                    }`}
                    title={isAudioPlaying ? "Tắt âm thanh tĩnh tâm" : "Phát âm thanh thiền định"}
                  >
                    <div className="w-full h-full rounded-full bg-slate-900 border border-amber-300 flex items-center justify-center relative overflow-hidden shadow-inner">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src="https://i.ibb.co/nsKpgT8V/Yin-Yan.jpg"
                          alt="Yin Yang Compass"
                          className={`w-full h-full rounded-full object-cover transition-all duration-700 ${
                            isAudioPlaying ? "animate-[spin_12s_linear_infinite]" : ""
                          }`}
                        />
                      </div>
                      
                      {/* Nút Play/Pause ở tâm */}
                      <div className="absolute inset-0 bg-slate-950/20 dark:bg-slate-950/30 rounded-full flex items-center justify-center transition-opacity group-hover:bg-slate-950/40">
                        <div className={`p-2.5 rounded-full text-white shadow-lg backdrop-blur-xs border border-white/40 transition-all ${
                            isAudioPlaying ? "bg-amber-500/90 scale-110 shadow-amber-500/40" : "bg-black/60 group-hover:scale-110"
                        }`}>
                          {isAudioPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />}
                        </div>
                      </div>

                      <span className="absolute top-1 text-3xs font-bold text-amber-300 z-10 pointer-events-none">N</span>
                      <span className="absolute bottom-1 text-3xs font-bold text-amber-300 z-10 pointer-events-none">S</span>
                      <span className="absolute left-1.5 text-3xs font-bold text-amber-300 z-10 pointer-events-none">W</span>
                      <span className="absolute right-1.5 text-3xs font-bold text-amber-300 z-10 pointer-events-none">E</span>
                    </div>
                  </div>
                </div>

                <p className="text-body-sm font-semibold text-slate-700 dark:text-slate-300 italic text-center">
                  Nghe luận giải lá số
                </p>
              </div>

              {/* Cột phải: Thẻ chi tiết thông tin nhân thân & phong thủy */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                {/* Thẻ chứa thông tin nhân thân & phong thủy */}
                <div className="space-y-4 p-4 sm:p-5 rounded-2xl bg-white/75 dark:bg-slate-900/75 border border-purple-200/80 dark:border-purple-800/60 shadow-md backdrop-blur-xl">
                  {/* Header hồ sơ nhân thân - formatted like Chi tiết phỏng vấn (Purple theme) */}
                  <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-purple-200/40 dark:border-purple-800/40">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-5 bg-purple-600 rounded-full shrink-0" />
                      <User className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                      <h3 className="text-sm sm:text-base font-black text-purple-600 dark:text-purple-400 tracking-wide">
                        {TU_VI_PROFILE.fullName}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-3xs font-black px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 shrink-0">
                        {TU_VI_PROFILE.elementNapAm} • {TU_VI_PROFILE.zodiacAnimal}
                      </span>
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 rounded-full text-3xs font-black shrink-0">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500 shrink-0" />
                        <span>{TU_VI_PROFILE.cungPhi}</span>
                      </div>
                    </div>
                  </div>

                  {/* Lưới 6 thẻ thông số nhân thân với Icon minh họa trực quan */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {/* 1. Dương lịch */}
                    <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl border border-indigo-200/30 flex items-start gap-2.5 transition-all hover:border-indigo-300/60 shadow-2xs">
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-3xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Dương lịch</div>
                        <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100">{TU_VI_PROFILE.birthDateSolar}</div>
                        <div className="text-2xs font-semibold text-slate-500 dark:text-slate-400">Giờ: {TU_VI_PROFILE.birthTimeSolar}</div>
                      </div>
                    </div>

                    {/* 2. Âm lịch */}
                    <div className="p-3 bg-purple-50/50 dark:bg-purple-950/20 rounded-xl border border-purple-200/30 flex items-start gap-2.5 transition-all hover:border-purple-300/60 shadow-2xs">
                      <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Moon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-3xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Âm lịch</div>
                        <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100">{TU_VI_PROFILE.birthDateLunar}</div>
                      </div>
                    </div>

                    {/* 3. Giờ sinh can chi */}
                    <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200/30 flex items-start gap-2.5 transition-all hover:border-amber-300/60 shadow-2xs">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-3xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Giờ sinh can chi</div>
                        <div className="text-xs font-extrabold text-slate-800 dark:text-slate-100">{TU_VI_PROFILE.birthHourLunar}</div>
                      </div>
                    </div>

                    {/* 4. Bản mệnh nạp âm */}
                    <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200/30 flex items-start gap-2.5 transition-all hover:border-emerald-300/60 shadow-2xs">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-3xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Bản mệnh nạp âm</div>
                        <div className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300">{TU_VI_PROFILE.elementNapAm}</div>
                      </div>
                    </div>

                    {/* 5. Cung mệnh phi */}
                    <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-200/30 flex items-start gap-2.5 transition-all hover:border-blue-300/60 shadow-2xs">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-3xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Cung mệnh phi</div>
                        <div className="text-xs font-extrabold text-blue-700 dark:text-blue-300">{TU_VI_PROFILE.menhQuai}</div>
                      </div>
                    </div>

                    {/* 6. Con số may mắn */}
                    <div className="p-3 bg-rose-50/50 dark:bg-rose-950/20 rounded-xl border border-rose-200/30 flex items-start gap-2.5 transition-all hover:border-rose-300/60 shadow-2xs">
                      <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Hash className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-3xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Con số may mắn</div>
                        <div className="text-xs font-extrabold text-rose-700 dark:text-rose-300">{TU_VI_PROFILE.luckyNumbers.join(", ")}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= PHẦN 2: TÍNH CÁCH TRONG CÔNG VIỆC ================= */}
          <div id="tuvi-section-2" className="w-full bg-white/70 dark:bg-slate-900/80 border border-slate-200/80 dark:border-blue-400/35 rounded-2xl p-3 sm:p-4.5 md:p-6 shadow-xs dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(59,130,246,0.2),inset_0_1.5px_2px_rgba(255,255,255,0.18)] hover:dark:border-blue-400/60 backdrop-blur-2xl transition-all duration-300 space-y-4 sm:space-y-5">
            {/* Tiêu đề section 2 định dạng giống thẻ Danh mục 13 câu hỏi */}
            <div className="flex items-center justify-between pb-3 border-b border-blue-200/50 dark:border-blue-800/50">
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <h3 className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-400 tracking-wide">
                  2. Tính cách trong công việc
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {WORK_PERSONALITY_TRAITS.map((trait, index) => {
                const colorPalette = [
                  { bar: "bg-sky-600", text: "text-sky-600 dark:text-sky-400", bg: "bg-sky-500/10", badgeText: "text-sky-700 dark:text-sky-300", border: "border-sky-500/20" },
                  { bar: "bg-violet-600", text: "text-violet-600 dark:text-violet-400", bg: "bg-violet-500/10", badgeText: "text-violet-700 dark:text-violet-300", border: "border-violet-500/20" },
                  { bar: "bg-rose-600", text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-500/10", badgeText: "text-rose-700 dark:text-rose-300", border: "border-rose-500/20" },
                  { bar: "bg-emerald-600", text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10", badgeText: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-500/20" },
                ][index % 4];

                return (
                  <div 
                    key={trait.id}
                    className="p-4 sm:p-5 rounded-xl bg-slate-500/5 border border-slate-200/40 dark:border-slate-800/40 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2.5">
                      {/* Tiêu đề sub card */}
                      <div className={`w-full flex flex-wrap items-center justify-between gap-3 pb-2 border-b ${colorPalette.border}`}>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-5 ${colorPalette.bar} rounded-full shrink-0`} />
                          <Sparkles className={`w-4 h-4 ${colorPalette.text} shrink-0`} />
                          <h4 className={`text-sm sm:text-base font-black ${colorPalette.text} tracking-wide`}>
                            {trait.title}
                          </h4>
                        </div>
                        <span className={`text-3xs font-black px-2 py-0.5 rounded-full ${colorPalette.bg} ${colorPalette.badgeText} border ${colorPalette.border} shrink-0`}>
                          {trait.tag}
                        </span>
                      </div>

                      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {trait.subtitle}
                      </div>

                      <p className="text-body-sm text-slate-600 dark:text-slate-300 text-justify pt-1">
                        {trait.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/20 flex flex-wrap gap-1.5">
                      {trait.highlights.map((h, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md text-3xs font-bold bg-slate-500/10 text-slate-700 dark:text-slate-300 flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span>{h}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= PHẦN 3: CHÂN DUNG TỬ VI TRONG CÔNG VIỆC ================= */}
          <div id="tuvi-section-3" className="w-full bg-white/70 dark:bg-slate-900/80 border border-slate-200/80 dark:border-emerald-400/35 rounded-2xl p-3 sm:p-4.5 md:p-6 shadow-xs dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(16,185,129,0.2),inset_0_1.5px_2px_rgba(255,255,255,0.18)] hover:dark:border-emerald-400/60 backdrop-blur-2xl transition-all duration-300 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-200/50 dark:border-emerald-800/50">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">
                3. Chân dung tử vi trong công việc
              </h3>
            </div>

            {/* 6 Cung cốt lõi */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Lục cung trọng yếu (Tam hợp Thân – Tý – Thìn)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SIX_CORE_PALACES.map((palace, index) => {
                  const palette = [
                    { bar: "bg-rose-600", text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-500/10", badgeText: "text-rose-700 dark:text-rose-300", border: "border-rose-500/20" },
                    { bar: "bg-amber-600", text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10", badgeText: "text-amber-700 dark:text-amber-300", border: "border-amber-500/20" },
                    { bar: "bg-emerald-600", text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10", badgeText: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-500/20" },
                    { bar: "bg-cyan-600", text: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-500/10", badgeText: "text-cyan-700 dark:text-cyan-300", border: "border-cyan-500/20" },
                    { bar: "bg-indigo-600", text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-500/10", badgeText: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-500/20" },
                    { bar: "bg-fuchsia-600", text: "text-fuchsia-600 dark:text-fuchsia-400", bg: "bg-fuchsia-500/10", badgeText: "text-fuchsia-700 dark:text-fuchsia-300", border: "border-fuchsia-500/20" },
                  ][index % 6];

                  return (
                    <div 
                      key={palace.id}
                      className="p-4 rounded-xl bg-slate-500/5 border border-slate-200/40 dark:border-slate-800/40 flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        {/* Header formatted like Chi tiết phỏng vấn */}
                        <div className={`w-full flex flex-wrap items-center justify-between gap-2 pb-2 border-b ${palette.border}`}>
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-5 ${palette.bar} rounded-full shrink-0`} />
                            <Target className={`w-4 h-4 ${palette.text} shrink-0`} />
                            <h5 className={`font-extrabold text-sm ${palette.text}`}>
                              {palace.name}
                            </h5>
                          </div>
                          <span className={`text-3xs font-black px-2 py-0.5 rounded-full ${palette.bg} ${palette.badgeText} border ${palette.border} shrink-0`}>
                            {palace.tag}
                          </span>
                        </div>

                        <p className="text-body-sm text-slate-600 dark:text-slate-300 text-justify">
                          {palace.description}
                        </p>

                        <div className="flex flex-wrap gap-1 pt-1">
                          {palace.stars.map((star, i) => (
                            <span 
                              key={i} 
                              className={`text-3xs font-bold px-1.5 py-0.2 rounded ${
                                star.main 
                                  ? "bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20" 
                                  : "bg-slate-500/10 text-slate-600 dark:text-slate-400"
                              }`}
                            >
                              ★ {star.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-200/20 space-y-1">
                        {palace.checkpoints.map((cp, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-2xs font-semibold text-slate-600 dark:text-slate-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                            <span className="truncate">{cp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ma trận 5 hành tố trong vận hành quản trị */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Ứng dụng ngũ hành trong quản trị vận hành (SOP - CRM - CX)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {FIVE_ELEMENTS_GOVERNANCE.map((el, i) => (
                  <div key={i} className={`p-3 rounded-xl border flex flex-col justify-between shadow-2xs ${el.bgColor} ${el.borderColor}`}>
                    <div className="space-y-1.5">
                      <span className={`text-3xs font-extrabold uppercase ${el.titleColor}`}>
                        {el.element}
                      </span>
                      <h5 className={`text-xs font-black ${el.titleColor}`}>
                        {el.subtitle}
                      </h5>
                      <p className="text-caption text-slate-600 dark:text-slate-300">
                        {el.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= PHẦN 4: CÁC TUỔI HỢP TÁC LÀM VIỆC ================= */}
          <div id="tuvi-section-4" className="w-full bg-white/70 dark:bg-slate-900/80 border border-slate-200/80 dark:border-teal-400/35 rounded-2xl p-3 sm:p-4.5 md:p-6 shadow-xs dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(20,184,166,0.2),inset_0_1.5px_2px_rgba(255,255,255,0.18)] hover:dark:border-teal-400/60 backdrop-blur-2xl transition-all duration-300 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-teal-200/50 dark:border-teal-800/50">
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-teal-600 dark:text-teal-400">
                4. Các tuổi hợp tác làm việc
              </h3>
            </div>

            {/* 2-Column Layout: Left Column = Search & Zodiac Ribbon Grid; Right Column = Detailed Result */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* LEFT COLUMN: Search & Selection Grid */}
              <div className="lg:col-span-6 space-y-4">
                {/* Filter pills & Year Search */}
                <div className="flex flex-col gap-2.5 bg-slate-500/5 border border-slate-200/40 dark:border-slate-700/40 p-3 rounded-xl">
                  <div className="flex items-center gap-1.5 shrink-0 w-full">
                    <input
                      type="number"
                      placeholder="Nhập năm sinh (vd: 1992)..."
                      value={searchYearInput}
                      onChange={(e) => setSearchYearInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleYearSearch()}
                      className="px-2.5 py-1.5 rounded-lg text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex-1 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    <button
                      type="button"
                      onClick={handleYearSearch}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white transition-colors cursor-pointer shrink-0"
                    >
                      Tra cứu
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
                    {[
                      { id: "all", label: "12 con giáp" },
                      { id: "best", label: "Tam Hợp / Lục Hợp" },
                      { id: "support", label: "Tương Trợ" },
                      { id: "caution", label: "Cần phân định" }
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => {
                          playUiSound("click");
                          setZodiacFilterTier(f.id);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-2xs font-extrabold transition-all shrink-0 cursor-pointer ${
                          zodiacFilterTier === f.id
                            ? "bg-teal-600 text-white shadow-xs"
                            : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid 12 Con Giáp Ribbon */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {filteredZodiacList.map((item) => {
                    const isSelected = selectedZodiacId === item.id;
                    const theme = getZodiacTheme(item.tier);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          playUiSound("click");
                          setSelectedZodiacId(item.id);
                        }}
                        className={`p-2.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer border backdrop-blur-md ${
                          isSelected
                            ? theme.bgSelected
                            : `${theme.bgUnselected} hover:scale-102 hover:shadow-md`
                        }`}
                      >
                        <span className={`text-2.5xl transition-transform duration-300 ${isSelected ? "scale-110 drop-shadow-md" : ""}`}>
                          {item.icon}
                        </span>
                        <span className="text-xs font-black text-slate-900 dark:text-white mt-1">
                          Tuổi {item.nameVi}
                        </span>
                        <span className="text-3xs text-slate-500 dark:text-slate-400 font-semibold">
                          ({item.animalVi})
                        </span>
                        <span className={`mt-1.5 text-3xs font-black px-2 py-0.5 rounded-full leading-tight ${theme.badge}`}>
                          {item.score}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT COLUMN: Detailed Zodiac Result Info */}
              <div className="lg:col-span-6 h-full">
                {currentZodiac ? (() => {
                  const activeTheme = getZodiacTheme(currentZodiac.tier);
                  return (
                    <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${activeTheme.gradientBox} border space-y-4 h-full flex flex-col justify-between shadow-md backdrop-blur-xl transition-all duration-300`}>
                      <div className="space-y-3.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200/40 dark:border-slate-800/60">
                          <div className="flex items-center gap-3">
                            <span className="text-4xl drop-shadow-md">{currentZodiac.icon}</span>
                            <div>
                              <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                                Tuổi {currentZodiac.nameVi} ({currentZodiac.animalVi}) • {currentZodiac.relationshipVi}
                              </h4>
                              <div id="card-zodiac-years-detail" className="mt-1.5 p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-2xs inline-block">
                                <p className="text-body-sm text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5">
                                  <span>📅 Năm sinh tiêu biểu:</span>
                                  <span className="font-bold text-slate-900 dark:text-white">{currentZodiac.years}</span>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-black ${activeTheme.badge}`}>
                              {currentZodiac.tierLabelVi}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800/50 shadow-2xs">
                            <span className="font-bold text-slate-800 dark:text-slate-200">🏢 Môi trường hợp nhất:</span>
                            <p className="font-semibold text-slate-900 dark:text-white mt-1 leading-snug">{currentZodiac.workplaceFitVi}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800/50 shadow-2xs">
                            <span className="font-bold text-slate-800 dark:text-slate-200">🧭 Hướng bàn tương thích:</span>
                            <p className="font-semibold text-slate-900 dark:text-white mt-1 leading-snug">{currentZodiac.deskDirectionVi}</p>
                          </div>
                        </div>

                        <div className={`p-3.5 rounded-xl ${activeTheme.accentBg} border text-xs leading-relaxed space-y-1.5 shadow-2xs`}>
                          <span className={`font-black ${activeTheme.textColor} flex items-center gap-1.5`}>
                            <span>💡 Đánh giá tương hợp & Lời khuyên phối hợp:</span>
                          </span>
                          <p className="text-slate-800 dark:text-slate-200 font-medium">{currentZodiac.workplaceAdviceVi}</p>
                        </div>
                      </div>

                      {/* Thẻ % tạo thành thẻ nằm cuối cùng */}
                      <div className={`p-3.5 sm:p-4 rounded-xl bg-gradient-to-r ${activeTheme.gradientBox} border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 mt-3`}>
                        <div className="flex items-center gap-2.5">
                          <div className={`w-9 h-9 rounded-xl ${activeTheme.badge} flex items-center justify-center font-black text-sm shadow-md shrink-0`}>
                            %
                          </div>
                          <div>
                            <span className={`text-2xs font-extrabold uppercase tracking-wider ${activeTheme.textColor} block`}>
                              Tỷ Lệ Tương Hợp & Hiệu Quả Hợp Tác
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-base sm:text-lg font-black bg-white/95 dark:bg-slate-900/95 px-3.5 py-1 rounded-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs ${activeTheme.textColor}`}>
                            {currentZodiac.score}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })() : (
                  <div className="p-6 rounded-2xl bg-slate-500/5 border border-slate-200/20 text-center flex flex-col items-center justify-center h-full text-slate-500 text-xs">
                    Chọn một con giáp hoặc nhập năm sinh ở cột trái để xem chi tiết kết quả.
                  </div>
                )}
              </div>
            </div>
          </div>

            {/* ================= PHẦN 5: CÂU NÓI CUỐI CÙNG VỀ TUỔI NÀY ================= */}
          <div id="tuvi-section-5" className="w-full bg-white/70 dark:bg-slate-900/80 border border-slate-200/80 dark:border-amber-400/35 rounded-2xl p-3 sm:p-4.5 md:p-6 shadow-xs dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(245,158,11,0.2),inset_0_1.5px_2px_rgba(255,255,255,0.18)] hover:dark:border-amber-400/60 backdrop-blur-2xl transition-all duration-300 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-amber-200/50 dark:border-amber-800/50">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-amber-600 dark:text-amber-400">
                5. Câu nói cuối cùng về tuổi này
              </h3>
            </div>

            {/* Sub-card 2: Phương châm hành động cốt lõi */}
            <div 
              style={{ borderRadius: "var(--theme-radius-card, var(--theme-radius, 16px))" }}
              className="w-full glass-surface backdrop-blur-2xl border border-amber-300/80 dark:border-amber-500/40 p-4 sm:p-5 md:p-6 shadow-2xs transition-all duration-300 relative overflow-hidden bg-gradient-to-r from-amber-500/10 via-orange-500/15 to-amber-600/10 dark:from-amber-950/60 dark:via-orange-950/50 dark:to-amber-950/60 space-y-3"
            >
              <div className="w-full flex items-center justify-between gap-2 pb-2 border-b border-amber-200/60 dark:border-amber-800/60">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <h4 className="text-card-title font-bold text-amber-700 dark:text-amber-300 tracking-wide">
                    Phương châm hành động cốt lõi
                  </h4>
                </div>
              </div>

              <div className="relative z-10 py-1 text-center">
                <p className="text-base sm:text-lg md:text-xl font-black text-amber-950 dark:text-amber-100 leading-snug max-w-4xl mx-auto drop-shadow-xs">
                  “{FINAL_PHILOSOPHY.actionPrinciple.replace(/^“|”$/g, '')}”
                </p>
              </div>
            </div>

            {/* Sub-card 3: 6 Trụ cột tư duy & hành động cốt lõi */}
            <div className="space-y-2.5 pt-1">
              <h4 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                6 Trụ cột tư duy & hành động cốt lõi
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {FINAL_PHILOSOPHY.actionGuidelines.map((item, idx) => {
                  const icons = [Target, TrendingUp, Heart, Compass, Zap, Award];
                  const IconComp = icons[idx % icons.length] || CheckCircle2;
                  return (
                    <div 
                      key={idx} 
                      className="p-3.5 rounded-xl bg-slate-500/5 border border-slate-200/40 dark:border-slate-800/40 shadow-2xs text-xs space-y-1.5 transition-all duration-300 hover:border-amber-400/70 hover:shadow-md hover:-translate-y-0.5"
                    >
                      <div className="font-extrabold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs">{item.title}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-body-sm pl-8">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sub-card 1: Châm ngôn bản mệnh Giáp Tý 1984 */}
            <div className="p-4 sm:p-5 rounded-xl bg-amber-500/10 border border-amber-300/60 dark:border-amber-800/60 space-y-2">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-extrabold text-sm">
                <span className="text-2xl font-serif">“</span>
                <span>Châm ngôn bản mệnh Giáp Tý 1984 (Hải Trung Kim)</span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 italic leading-relaxed text-justify pl-4 border-l-2 border-amber-500">
                {FINAL_PHILOSOPHY.coreCreed}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
