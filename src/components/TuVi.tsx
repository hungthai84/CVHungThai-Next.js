import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Star, Calendar, User, Palette, 
  Briefcase, Wallet, Plane, Users, Heart,
  Sun, Droplets, Sprout, Flame, Mountain,
  TrendingUp, CheckCircle2, Moon, Clock, Hash,
  Sparkles, Play, Pause, Compass, Shield, Target,
  Search, ArrowRight, Check, Award, Layers, Zap, Eye,
  Navigation, AlertTriangle, ShieldCheck, HelpCircle,
  Activity, BarChart3, Radio, RefreshCw
} from "lucide-react";
import { useLanguage } from "../i18n";
import { 
  TU_VI_PROFILE, 
  WORK_PERSONALITY_TRAITS, 
  SIX_CORE_PALACES, 
  FIVE_ELEMENTS_GOVERNANCE, 
  ZODIAC_SYNERGY_LIST, 
  ACTION_PHILOSOPHY_CARDS,
  ZodiacSynergyItem 
} from "../data/tuviData";
import { playUiSound } from "../lib/sound";
import { PageCardHeader } from "./PageCardHeader";
import { cn } from "../lib/utils";

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

  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = useCallback(() => {
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
  }, [isAudioPlaying]);

  // Memoize active zodiac data
  const currentZodiac = useMemo(() => {
    return ZODIAC_SYNERGY_LIST.find(z => z.id === selectedZodiacId) || ZODIAC_SYNERGY_LIST[0];
  }, [selectedZodiacId]);

  // Handle year search
  const handleYearSearch = useCallback(() => {
    const year = parseInt(searchYearInput.trim(), 10);
    if (!isNaN(year) && year >= 1920 && year <= 2040) {
      playUiSound("click");
      const zodiacOrder = ["than", "dau", "tuat", "hoi", "ty", "suu", "dan", "mao", "thin", "ty_snake", "ngo", "mui"];
      const targetId = zodiacOrder[year % 12];
      setSelectedZodiacId(targetId);
    }
  }, [searchYearInput]);

  const filteredZodiacList = useMemo(() => {
    return ZODIAC_SYNERGY_LIST.filter(item => {
      if (zodiacFilterTier === "all") return true;
      return item.tier === zodiacFilterTier;
    });
  }, [zodiacFilterTier]);

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
      <div className="w-full bg-transparent flex flex-col gap-5 sm:gap-6 max-w-7xl mx-auto">

        {/* Container Tử vi */}
        <div 
          id="info-card-tuvi" 
          className="w-full flex flex-col gap-5 sm:gap-6 relative z-10"
        >
          {/* Header Card Tử vi */}
          <PageCardHeader pageId="tuvi" />

          {/* ================= PHẦN 1: THÔNG TIN CHUNG & BÁT TRẠCH PHONG THỦY ================= */}
          <div id="tuvi-section-1" className="w-full bg-white/85 dark:bg-slate-900/85 border border-slate-200/90 dark:border-purple-400/30 rounded-2xl md:rounded-3xl p-4.5 sm:p-6 shadow-sm dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(168,85,247,0.15)] hover:dark:border-purple-400/50 backdrop-blur-2xl transition-all duration-300 space-y-5">
            <div className="flex items-center justify-between pb-3.5 border-b border-purple-200/50 dark:border-purple-800/50">
              <div className="flex items-center gap-2.5">
                <span className="text-base sm:text-lg font-black font-mono text-purple-700 dark:text-purple-300">1.</span>
                <div className="w-6 h-6 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-purple-700 dark:text-purple-300 tracking-wide">
                    {isVi ? "Thông tin chung & Bản mệnh phong thủy" : "General Profile & Feng Shui Destiny"}
                  </h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* Cột trái: La Bàn Âm Dương & Trình phát âm thanh thiền định */}
              <div className="lg:col-span-4 bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-slate-900/5 dark:from-purple-950/40 dark:via-indigo-950/30 dark:to-slate-900/60 border border-purple-200/60 dark:border-purple-800/50 rounded-2xl p-5 flex flex-col items-center justify-between text-center space-y-4 shadow-2xs">
                {/* Header định dạng giống Chi tiết phỏng vấn */}
                <div className="flex items-center justify-between pb-3 border-b border-purple-200/40 dark:border-purple-800/40 w-full text-left">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-4 bg-purple-600 rounded-full shrink-0" />
                    <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                    <h4 className="text-xs sm:text-sm font-black text-purple-700 dark:text-purple-300 tracking-wide">
                      {isVi ? "La Bàn Âm Dương Lưỡng Lâm" : "Yin Yang Compass"}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                    1984 - 2025
                  </span>
                </div>

                {/* Vòng quay Âm Dương tương tác */}
                <div className="relative my-2">
                  <div 
                    role="button"
                    tabIndex={0}
                    aria-label={isAudioPlaying ? (isVi ? "Tắt âm thanh tĩnh tâm" : "Pause meditation audio") : (isVi ? "Phát âm thanh thiền định" : "Play meditation audio")}
                    onClick={toggleAudio}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleAudio();
                      }
                    }}
                    className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full p-2.5 shadow-lg flex items-center justify-center cursor-pointer transition-all duration-500 group relative ${
                      isAudioPlaying 
                        ? "bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 ring-4 ring-amber-400/60 shadow-[0_0_35px_rgba(245,158,11,0.65)]" 
                        : "bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 ring-2 ring-amber-300/40 hover:scale-105"
                    }`}
                    title={isAudioPlaying ? (isVi ? "Tắt âm thanh tĩnh tâm" : "Pause meditation audio") : (isVi ? "Phát âm thanh thiền định" : "Play meditation audio")}
                  >
                    <div className="w-full h-full rounded-full bg-slate-950 border-2 border-amber-300 flex items-center justify-center relative overflow-hidden shadow-inner">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src="https://i.ibb.co/nsKpgT8V/Yin-Yan.jpg"
                          alt="Yin Yang Compass"
                          className={`w-full h-full rounded-full object-cover transition-all duration-700 ${
                            isAudioPlaying ? "animate-[spin_10s_linear_infinite]" : ""
                          }`}
                        />
                      </div>
                      
                      {/* Nút Play/Pause ở tâm */}
                      <div className="absolute inset-0 bg-slate-950/20 dark:bg-slate-950/30 rounded-full flex items-center justify-center transition-opacity group-hover:bg-slate-950/45">
                        <div className={`p-3 rounded-full text-white shadow-xl backdrop-blur-sm border border-white/50 transition-all ${
                            isAudioPlaying ? "bg-amber-500 scale-110 shadow-amber-500/50 ring-2 ring-white" : "bg-black/70 group-hover:scale-110"
                        }`}>
                          {isAudioPlaying ? <Pause className="w-4.5 h-4.5 fill-current" /> : <Play className="w-4.5 h-4.5 ml-0.5 fill-current" />}
                        </div>
                      </div>

                      <span className="absolute top-1 text-[10px] font-black text-amber-300 z-10 pointer-events-none drop-shadow">N</span>
                      <span className="absolute bottom-1 text-[10px] font-black text-amber-300 z-10 pointer-events-none drop-shadow">S</span>
                      <span className="absolute left-1.5 text-[10px] font-black text-amber-300 z-10 pointer-events-none drop-shadow">W</span>
                      <span className="absolute right-1.5 text-[10px] font-black text-amber-300 z-10 pointer-events-none drop-shadow">E</span>
                    </div>
                  </div>
                </div>

                {/* Sóng âm thanh động khi phát */}
                <div className="w-full flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1.5 h-3.5">
                    {[40, 70, 100, 60, 90, 50, 80, 40].map((height, i) => (
                      <span 
                        key={i} 
                        className={`w-1 rounded-full transition-all duration-300 ${
                          isAudioPlaying 
                            ? "bg-amber-500 animate-pulse" 
                            : "bg-slate-300 dark:bg-slate-700"
                        }`}
                        style={{ height: isAudioPlaying ? `${height}%` : "30%" }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {isAudioPlaying ? "Đang phát âm thanh thiền định tĩnh tâm" : "Bấm vào la bàn để thưởng thức âm thanh thiền định."}
                  </p>
                </div>
              </div>

              {/* Cột phải: Thẻ chi tiết thông tin nhân thân */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                <div className="space-y-4 p-4.5 sm:p-5 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-purple-200/80 dark:border-purple-800/60 shadow-2xs backdrop-blur-xl h-full flex flex-col justify-between">
                  {/* Header hồ sơ nhân thân */}
                  <div className="w-full flex flex-col gap-2 pb-3 border-b border-purple-200/40 dark:border-purple-800/40">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4.5 h-4.5 text-purple-600 dark:text-purple-400 shrink-0" />
                        <h4 className="text-sm sm:text-base font-black text-purple-800 dark:text-purple-300 tracking-wide">
                          {TU_VI_PROFILE.fullName}
                        </h4>
                      </div>

                      <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-100/90 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 rounded-full text-[11px] font-bold shrink-0">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500 shrink-0" />
                        <span>Cung Mệnh: Tý • Thân cư Quan Lộc (Thìn)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap pt-0.5">
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shrink-0 shadow-2xs">
                        Hải Trung Kim • Đoài Kim (Tây Tứ Mệnh) • Kim Tứ Cục
                      </span>
                    </div>
                  </div>

                  {/* Lưới 6 thẻ thông số nhân thân với Icon minh họa trực quan */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {/* 1. Dương lịch */}
                    <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-xl border border-indigo-200/50 dark:border-indigo-800/40 flex items-start gap-2.5 transition-all hover:border-indigo-400 shadow-2xs">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">DƯƠNG LỊCH</div>
                        <div className="text-xs font-black text-slate-900 dark:text-slate-100">{TU_VI_PROFILE.birthDateSolar}</div>
                        <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">(Đinh Hợi 17/05 Giáp Tý)</div>
                      </div>
                    </div>

                    {/* 2. Âm lịch */}
                    <div className="p-3 bg-purple-50/70 dark:bg-purple-950/30 rounded-xl border border-purple-200/50 dark:border-purple-800/40 flex items-start gap-2.5 transition-all hover:border-purple-400 shadow-2xs">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Moon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400">ÂM LỊCH</div>
                        <div className="text-xs font-black text-slate-900 dark:text-slate-100">{TU_VI_PROFILE.birthDateLunar}</div>
                        <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">(Năm Giáp Tý 1984)</div>
                      </div>
                    </div>

                    {/* 3. Giờ sinh can chi */}
                    <div className="p-3 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200/50 dark:border-amber-800/40 flex items-start gap-2.5 transition-all hover:border-amber-400 shadow-2xs">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">GIỜ SINH CAN CHI</div>
                        <div className="text-xs font-black text-slate-900 dark:text-slate-100">{TU_VI_PROFILE.birthHourLunar}</div>
                        <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">(Thiên Can: Quý, Địa Chi: Dậu)</div>
                      </div>
                    </div>

                    {/* 4. Bản mệnh nạp âm */}
                    <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/50 dark:border-emerald-800/40 flex items-start gap-2.5 transition-all hover:border-emerald-400 shadow-2xs">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">NĂM SINH (NẠP ÂM)</div>
                        <div className="text-xs font-black text-emerald-800 dark:text-emerald-300">{TU_VI_PROFILE.elementNapAm}</div>
                        <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">(Vàng ròng đáy biển sâu)</div>
                      </div>
                    </div>

                    {/* 5. Cung mệnh phi */}
                    <div className="p-3 bg-cyan-50/70 dark:bg-cyan-950/30 rounded-xl border border-cyan-200/50 dark:border-cyan-800/40 flex items-start gap-2.5 transition-all hover:border-cyan-400 shadow-2xs">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">CUNG MỆNH QUÁI</div>
                        <div className="text-xs font-black text-cyan-800 dark:text-cyan-300">{TU_VI_PROFILE.menhQuai}</div>
                        <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">(Đoài Kim - Tây Tứ Mệnh)</div>
                      </div>
                    </div>

                    {/* 6. Con số may mắn / Cục vận */}
                    <div className="p-3 bg-rose-50/70 dark:bg-rose-950/30 rounded-xl border border-rose-200/50 dark:border-rose-800/40 flex items-start gap-2.5 transition-all hover:border-rose-400 shadow-2xs">
                      <div className="w-8 h-8 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Hash className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400">CỤC VẬN HÀM SỐ</div>
                        <div className="text-xs font-black text-rose-700 dark:text-rose-300">Kim Tứ Cục (Số 4)</div>
                        <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">(Khởi đại vận năm 4 tuổi)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= PHẦN 2: TÍNH CÁCH TRONG CÔNG VIỆC ================= */}
          <div id="tuvi-section-2" className="w-full bg-white/85 dark:bg-slate-900/85 border border-slate-200/90 dark:border-blue-400/30 rounded-2xl md:rounded-3xl p-4.5 sm:p-6 shadow-sm dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(59,130,246,0.15)] hover:dark:border-blue-400/50 backdrop-blur-2xl transition-all duration-300 space-y-5">
            {/* Tiêu đề section 2 */}
            <div className="flex items-center justify-between pb-3.5 border-b border-blue-200/50 dark:border-blue-800/50">
              <div className="flex items-center gap-2.5">
                <span className="text-base sm:text-lg font-black font-mono text-blue-600 dark:text-blue-400">2.</span>
                <div className="w-6 h-6 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-400 tracking-wide">
                    {isVi ? "Tính cách & Phong cách quản trị trong công việc" : "Workplace Personality & Governance Style"}
                  </h3>
                </div>
              </div>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
                4 Trụ Cột Quản Trị
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {WORK_PERSONALITY_TRAITS.map((trait, index) => {
                const colorPalette = [
                  { 
                    bar: "bg-sky-600", 
                    text: "text-sky-700 dark:text-sky-300", 
                    bg: "bg-sky-500/10", 
                    badgeText: "text-sky-800 dark:text-sky-300", 
                    border: "border-sky-500/25 dark:border-sky-500/35",
                    glow: "hover:border-sky-400 dark:hover:border-sky-400/70"
                  },
                  { 
                    bar: "bg-violet-600", 
                    text: "text-violet-700 dark:text-violet-300", 
                    bg: "bg-violet-500/10", 
                    badgeText: "text-violet-800 dark:text-violet-300", 
                    border: "border-violet-500/25 dark:border-violet-500/35",
                    glow: "hover:border-violet-400 dark:hover:border-violet-400/70"
                  },
                  { 
                    bar: "bg-emerald-600", 
                    text: "text-emerald-700 dark:text-emerald-300", 
                    bg: "bg-emerald-500/10", 
                    badgeText: "text-emerald-800 dark:text-emerald-300", 
                    border: "border-emerald-500/25 dark:border-emerald-500/35",
                    glow: "hover:border-emerald-400 dark:hover:border-emerald-400/70"
                  },
                  { 
                    bar: "bg-amber-600", 
                    text: "text-amber-700 dark:text-amber-300", 
                    bg: "bg-amber-500/10", 
                    badgeText: "text-amber-800 dark:text-amber-300", 
                    border: "border-amber-500/25 dark:border-amber-500/35",
                    glow: "hover:border-amber-400 dark:hover:border-amber-400/70"
                  },
                ][index % 4];

                return (
                  <div 
                    key={trait.id}
                    className={`p-5 rounded-2xl bg-white/90 dark:bg-slate-900/75 border ${colorPalette.border} ${colorPalette.glow} shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-3.5 backdrop-blur-md`}
                  >
                    <div className="space-y-2.5">
                      {/* Tiêu đề sub card */}
                      <div className={`w-full flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b ${colorPalette.border}`}>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-5 ${colorPalette.bar} rounded-full shrink-0`} />
                          <Sparkles className={`w-4 h-4 ${colorPalette.text} shrink-0`} />
                          <h4 className={`text-sm sm:text-[15px] font-black ${colorPalette.text} tracking-wide`}>
                            {trait.title}
                          </h4>
                        </div>
                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${colorPalette.bg} ${colorPalette.badgeText} border ${colorPalette.border} shrink-0`}>
                          {trait.tag}
                        </span>
                      </div>

                      <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {trait.subtitle}
                      </div>

                      <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-200 text-justify pt-1 leading-relaxed">
                        {trait.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-wrap gap-2">
                      {trait.highlights.map((h, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-500/10 text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border border-slate-200/60 dark:border-slate-800/60">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[2.5]" />
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
          <div id="tuvi-section-3" className="w-full bg-white/85 dark:bg-slate-900/85 border border-slate-200/90 dark:border-emerald-400/30 rounded-2xl md:rounded-3xl p-4.5 sm:p-6 shadow-sm dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(16,185,129,0.15)] hover:dark:border-emerald-400/50 backdrop-blur-2xl transition-all duration-300 space-y-5">
            <div className="flex items-center justify-between pb-3.5 border-b border-emerald-200/50 dark:border-emerald-800/50">
              <div className="flex items-center gap-2.5">
                <span className="text-base sm:text-lg font-black font-mono text-emerald-700 dark:text-emerald-300">3.</span>
                <div className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-emerald-700 dark:text-emerald-300 tracking-wide">
                    {isVi ? "Chân dung tử vi & Ứng dụng ngũ hành trong quản trị" : "Astrological Portrait & Five Elements in Governance"}
                  </h3>
                </div>
              </div>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                Lục Cung & Ngũ Hành
              </span>
            </div>

            {/* 6 Cung cốt lõi */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-500 rounded-full shrink-0" />
                <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Lục cung trọng yếu (Tam hợp Thân – Tý – Thìn)
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SIX_CORE_PALACES.map((palace, index) => {
                  const palette = [
                    { bar: "bg-rose-600", text: "text-rose-700 dark:text-rose-300", bg: "bg-rose-500/10", badgeText: "text-rose-800 dark:text-rose-300", border: "border-rose-500/25 dark:border-rose-500/35" },
                    { bar: "bg-amber-600", text: "text-amber-700 dark:text-amber-300", bg: "bg-amber-500/10", badgeText: "text-amber-800 dark:text-amber-300", border: "border-amber-500/25 dark:border-amber-500/35" },
                    { bar: "bg-emerald-600", text: "text-emerald-700 dark:text-emerald-300", bg: "bg-emerald-500/10", badgeText: "text-emerald-800 dark:text-emerald-300", border: "border-emerald-500/25 dark:border-emerald-500/35" },
                    { bar: "bg-cyan-600", text: "text-cyan-700 dark:text-cyan-300", bg: "bg-cyan-500/10", badgeText: "text-cyan-800 dark:text-cyan-300", border: "border-cyan-500/25 dark:border-cyan-500/35" },
                    { bar: "bg-indigo-600", text: "text-indigo-700 dark:text-indigo-300", bg: "bg-indigo-500/10", badgeText: "text-indigo-800 dark:text-indigo-300", border: "border-indigo-500/25 dark:border-indigo-500/35" },
                    { bar: "bg-fuchsia-600", text: "text-fuchsia-700 dark:text-fuchsia-300", bg: "bg-fuchsia-500/10", badgeText: "text-fuchsia-800 dark:text-fuchsia-300", border: "border-fuchsia-500/25 dark:border-fuchsia-500/35" },
                  ][index % 6];

                  return (
                    <div 
                      key={palace.id}
                      className={`p-4 sm:p-4.5 rounded-2xl bg-white/90 dark:bg-slate-900/75 border ${palette.border} flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-md transition-all backdrop-blur-md`}
                    >
                      <div className="space-y-2">
                        {/* Header */}
                        <div className={`w-full flex flex-wrap items-center justify-between gap-2 pb-2 border-b ${palette.border}`}>
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-4 ${palette.bar} rounded-full shrink-0`} />
                            <Target className={`w-4 h-4 ${palette.text} shrink-0`} />
                            <h5 className={`font-black text-sm ${palette.text}`}>
                              {palace.name}
                            </h5>
                          </div>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${palette.bg} ${palette.badgeText} border ${palette.border} shrink-0`}>
                            {palace.tag}
                          </span>
                        </div>

                        <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-200 text-justify leading-relaxed">
                          {palace.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {palace.stars.map((star, i) => (
                            <span 
                              key={i} 
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                star.main 
                                  ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-extrabold" 
                                  : "bg-slate-500/10 text-slate-600 dark:text-slate-400"
                              }`}
                            >
                              ★ {star.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2.5 border-t border-slate-200/50 dark:border-slate-800/50 space-y-1.5">
                        {palace.checkpoints.map((cp, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
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
            <div className="space-y-3.5 pt-3 border-t border-emerald-200/40 dark:border-emerald-800/40">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-teal-500 rounded-full shrink-0" />
                <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Ứng dụng ngũ hành trong quản trị vận hành (SOP - CRM - CX)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {FIVE_ELEMENTS_GOVERNANCE.map((el, i) => (
                  <div key={i} className={`p-4 rounded-2xl border flex flex-col justify-between shadow-2xs transition-all hover:scale-[1.02] ${el.bgColor} ${el.borderColor} backdrop-blur-md`}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${el.iconBg}`}>
                          {el.element}
                        </span>
                      </div>
                      <h5 className={`text-xs font-black ${el.titleColor}`}>
                        {el.subtitle}
                      </h5>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {el.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= PHẦN 4: CÁC TUỔI HỢP TÁC LÀM VIỆC ================= */}
          <div id="tuvi-section-4" className="w-full bg-white/85 dark:bg-slate-900/85 border border-slate-200/90 dark:border-teal-400/30 rounded-2xl md:rounded-3xl p-4.5 sm:p-6 shadow-sm dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(20,184,166,0.15)] hover:dark:border-teal-400/50 backdrop-blur-2xl transition-all duration-300 space-y-5">
            <div className="flex items-center justify-between pb-3.5 border-b border-teal-200/50 dark:border-teal-800/50">
              <div className="flex items-center gap-2.5">
                <span className="text-base sm:text-lg font-black font-mono text-teal-700 dark:text-teal-300">4.</span>
                <div className="w-6 h-6 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-teal-700 dark:text-teal-300 tracking-wide">
                    {isVi ? "Các tuổi hợp tác làm việc (Tam Hợp • Lục Hợp • Tương Trợ)" : "Zodiac Synergy & Collaboration (Trine • Hexagram • Support)"}
                  </h3>
                </div>
              </div>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
                Ma trận 12 Con Giáp
              </span>
            </div>

            {/* 2-Column Layout: Left Column = Search & Zodiac Ribbon Grid; Right Column = Detailed Result */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* LEFT COLUMN: Search & Selection Grid */}
              <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
                {/* Filter pills & Year Search */}
                <div className="flex flex-col gap-2.5 bg-slate-500/5 border border-slate-200/70 dark:border-slate-800/70 p-3.5 rounded-2xl">
                  <div className="flex items-center gap-2 shrink-0 w-full">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="number"
                        placeholder="Nhập năm sinh tra cứu (vd: 1992, 1988, 1976)..."
                        value={searchYearInput}
                        onChange={(e) => setSearchYearInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleYearSearch()}
                        className="w-full pl-9 pr-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-2xs font-semibold"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleYearSearch}
                      className="px-4 py-2 rounded-xl text-xs font-black bg-teal-600 hover:bg-teal-700 text-white transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
                    >
                      Tra cứu
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
                    {[
                      { id: "all", label: "Tất cả 12 Giáp" },
                      { id: "best", label: "Tam Hợp / Lục Hợp" },
                      { id: "support", label: "Tương Trợ" },
                      { id: "caution", label: "Cần tránh xung" }
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => {
                          playUiSound("click");
                          setZodiacFilterTier(f.id);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-black transition-all shrink-0 cursor-pointer ${
                          zodiacFilterTier === f.id
                            ? "bg-teal-600 text-white shadow-xs scale-102"
                            : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
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
                        className={`p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer border backdrop-blur-md relative ${
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
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                          ({item.animalVi})
                        </span>
                        <span className={`mt-1.5 text-[10px] font-black px-2 py-0.5 rounded-full leading-tight ${theme.badge}`}>
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
                    <div className={`p-5 rounded-2xl md:rounded-3xl bg-gradient-to-br ${activeTheme.gradientBox} border space-y-4 h-full flex flex-col justify-between shadow-md backdrop-blur-xl transition-all duration-300`}>
                      <div className="space-y-3.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-200/50 dark:border-slate-800/60">
                          <div className="flex items-center gap-3">
                            <span className="text-4xl sm:text-5xl drop-shadow-md">{currentZodiac.icon}</span>
                            <div>
                              <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                                Tuổi {currentZodiac.nameVi} ({currentZodiac.animalVi}) • {currentZodiac.relationshipVi}
                              </h4>
                              <div id="card-zodiac-years-detail" className="mt-1.5 p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-2xs inline-block">
                                <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5">
                                  <span>📅 Năm sinh tiêu biểu:</span>
                                  <span className="font-black text-slate-900 dark:text-white">{currentZodiac.years}</span>
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
                          <div className="p-3.5 rounded-2xl bg-white/85 dark:bg-slate-900/85 border border-slate-200/60 dark:border-slate-800/60 shadow-2xs">
                            <span className="font-extrabold text-slate-800 dark:text-slate-200 block mb-1">🏢 Môi trường hợp nhất:</span>
                            <p className="font-semibold text-slate-900 dark:text-white leading-relaxed">{currentZodiac.workplaceFitVi}</p>
                          </div>
                          <div className="p-3.5 rounded-2xl bg-white/85 dark:bg-slate-900/85 border border-slate-200/60 dark:border-slate-800/60 shadow-2xs">
                            <span className="font-extrabold text-slate-800 dark:text-slate-200 block mb-1">🧭 Hướng bàn tương thích:</span>
                            <p className="font-semibold text-slate-900 dark:text-white leading-relaxed">{currentZodiac.deskDirectionVi}</p>
                          </div>
                        </div>

                        <div className={`p-4 rounded-2xl ${activeTheme.accentBg} border text-xs leading-relaxed space-y-1.5 shadow-2xs`}>
                          <span className={`font-black ${activeTheme.textColor} flex items-center gap-1.5 text-xs sm:text-sm`}>
                            <span>💡 Đánh giá tương hợp & Lời khuyên phối hợp:</span>
                          </span>
                          <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">{currentZodiac.workplaceAdviceVi}</p>
                        </div>
                      </div>

                      {/* Thẻ % tạo thành thẻ nằm cuối cùng */}
                      <div className={`p-3.5 rounded-2xl bg-gradient-to-r ${activeTheme.gradientBox} border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 mt-3`}>
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full ${activeTheme.badge} flex items-center justify-center font-black text-sm shadow-md shrink-0`}>
                            <Sparkles className="w-4 h-4 fill-current" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                              Dự báo tương hợp & Cơ hội hợp tác thành công
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-xl sm:text-2xl font-black bg-white dark:bg-slate-900 px-4 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-700 shadow-xs ${activeTheme.textColor}`}>
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

          {/* ================= PHẦN 5: NGUYÊN TẮC & TRIẾT LÝ HÀNH ĐỘNG LÃNH ĐẠO ================= */}
          <div 
            id="tuvi-section-5" 
            className="w-full bg-white/85 dark:bg-slate-900/85 border border-slate-200/90 dark:border-amber-400/30 rounded-2xl md:rounded-3xl p-4.5 sm:p-6 shadow-sm dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(245,158,11,0.15)] hover:dark:border-amber-400/50 backdrop-blur-2xl transition-all duration-300 space-y-5"
          >
            {/* Tiêu đề section 5 */}
            <div className="flex items-center justify-between pb-3.5 border-b border-amber-200/50 dark:border-amber-800/50">
              <div className="flex items-center gap-2.5">
                <span className="text-base sm:text-lg font-black font-mono text-amber-700 dark:text-amber-300">5.</span>
                <div className="w-6 h-6 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-amber-700 dark:text-amber-300 tracking-wide">
                    {isVi ? "Nguyên tắc & Triết lý hành động lãnh đạo" : "Core Action Principles & Leadership Philosophy"}
                  </h3>
                </div>
              </div>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                {isVi ? "5 Giá Trị Cốt Lõi" : "5 Core Values"}
              </span>
            </div>

            {/* Grid 5 thẻ nguyên tắc & triết lý hành động */}
            <div id="tuvi-philosophy-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4 w-full">
              {ACTION_PHILOSOPHY_CARDS.map((card, idx) => {
                const renderIcon = () => {
                  switch (card.iconType) {
                    case "target":
                      return <Target className="w-4.5 h-4.5 text-amber-600 dark:text-amber-400 stroke-[2.2]" />;
                    case "trending":
                      return <TrendingUp className="w-4.5 h-4.5 text-amber-600 dark:text-amber-400 stroke-[2.2]" />;
                    case "heart":
                      return <Heart className="w-4.5 h-4.5 text-amber-600 dark:text-amber-400 stroke-[2.2]" />;
                    case "compass":
                      return <Compass className="w-4.5 h-4.5 text-amber-600 dark:text-amber-400 stroke-[2.2]" />;
                    case "award":
                      return <Award className="w-4.5 h-4.5 text-amber-600 dark:text-amber-400 stroke-[2.2]" />;
                    default:
                      return <Sparkles className="w-4.5 h-4.5 text-amber-600 dark:text-amber-400" />;
                  }
                };

                return (
                  <div 
                    key={card.id}
                    className="rounded-2xl p-4 sm:p-4.5 bg-white dark:bg-slate-900/90 border border-amber-200/90 dark:border-amber-500/25 shadow-2xs hover:shadow-md hover:border-amber-400 dark:hover:border-amber-400/50 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between text-left gap-3 group"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/80 dark:border-amber-700/50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          {renderIcon()}
                        </div>
                        <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-full bg-amber-100/70 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40">
                          0{idx + 1}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-amber-950 dark:text-amber-200 tracking-tight leading-snug pt-0.5">
                        {card.title}
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {card.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-amber-100 dark:border-amber-900/40 flex items-center gap-1.5 text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 shrink-0" />
                      <span>{isVi ? "Giá trị cốt lõi" : "Core Value"}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= HERO QUOTE BANNER ================= */}
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl p-6 sm:p-7 bg-[#1c1842] dark:bg-[#120e33] text-white border border-indigo-900/60 shadow-xl backdrop-blur-xl mt-4">
            <div className="relative z-10 flex flex-col gap-3.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-amber-300">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-black uppercase tracking-widest text-amber-300">
                    CHÂM NGÔN DẪN MỆNH - HẢI TRUNG KIM
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-xs text-slate-200 transition-all cursor-pointer">
                  <Compass className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                  <span className="font-semibold text-[11px]">Tùy Tơ Mệnh - Đoán Kim</span>
                </div>
              </div>

              <h2 className="text-base sm:text-lg md:text-xl font-bold text-white leading-relaxed">
                “Giáp Tý 1984 - Hải Trung Kim: Vàng ròng lắng đọng trong lòng biển cả, nội lực thâm sâu, trọng chữ Tín, lấy Tâm làm gốc và kiên định kiến tạo giá trị dài lâu.”
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-normal italic">
                Trí tuệ - Nhân tâm - Kỷ luật - Phát triển - Thành công bền vững
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

