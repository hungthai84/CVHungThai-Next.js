import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sun,
  CloudRain,
  Snowflake,
  CloudSun,
  Wind,
  Zap,
  Volume2,
  VolumeX,
  Compass,
  Clock,
  ChevronRight,
  Maximize2,
  Sparkles,
  RefreshCw,
  X,
  Thermometer,
  Droplets,
  Eye,
  ShieldAlert,
  Share2,
  Check
} from "lucide-react";
import GlassWeatherIcon from "./GlassWeatherIcon";
import { cn } from "../lib/utils";
import { useLanguage } from "../i18n";

export interface WeatherCardData {
  id: string;
  city: string;
  country: string;
  timeStr: string;
  tempC: number;
  tempF: number;
  conditionVi: string;
  conditionEn: string;
  iconType: "sun" | "rain-heavy" | "snow" | "cloud-sun" | "fog" | "lightning";
  bgGradient: string;
  cardGlow: string;
  accentColor: string;
  badgeBg: string;
  uvIndex: number;
  humidity: number;
  windKm: number;
  airQuality: string;
  forecast24h: { time: string; temp: number; icon: string }[];
}

export const WEATHER_3D_CARDS: WeatherCardData[] = [
  {
    id: "card-1",
    city: "Tokyo",
    country: "Japan",
    timeStr: "Tokyo Current · 03:00PM",
    tempC: 28,
    tempF: 82,
    conditionVi: "Nắng rực rỡ",
    conditionEn: "Sunny",
    iconType: "sun",
    bgGradient: "from-amber-400 via-orange-400 to-amber-500",
    cardGlow: "shadow-amber-500/25 border-amber-200/50",
    accentColor: "text-amber-300",
    badgeBg: "bg-amber-500/30 text-amber-100 border-amber-300/40",
    uvIndex: 8,
    humidity: 45,
    windKm: 12,
    airQuality: "Tốt (32 AQI)",
    forecast24h: [
      { time: "12:00", temp: 26, icon: "sun" },
      { time: "15:00", temp: 28, icon: "sun" },
      { time: "18:00", temp: 25, icon: "cloud-sun" },
      { time: "21:00", temp: 22, icon: "moon" },
    ]
  },
  {
    id: "card-2",
    city: "London",
    country: "UK",
    timeStr: "London Current · 08:30AM",
    tempC: 18,
    tempF: 64,
    conditionVi: "Mưa lớn",
    conditionEn: "Heavy Rain",
    iconType: "rain-heavy",
    bgGradient: "from-blue-600 via-sky-600 to-indigo-700",
    cardGlow: "shadow-blue-500/25 border-sky-300/50",
    accentColor: "text-sky-300",
    badgeBg: "bg-blue-500/30 text-sky-100 border-sky-300/40",
    uvIndex: 2,
    humidity: 88,
    windKm: 24,
    airQuality: "Rất Tốt (18 AQI)",
    forecast24h: [
      { time: "08:00", temp: 17, icon: "rain-heavy" },
      { time: "11:00", temp: 18, icon: "rain-heavy" },
      { time: "14:00", temp: 19, icon: "cloud" },
      { time: "17:00", temp: 18, icon: "cloud-sun" },
    ]
  },
  {
    id: "card-3",
    city: "Sapporo",
    country: "Japan",
    timeStr: "Sapporo Current · 06:15PM",
    tempC: -2,
    tempF: 28,
    conditionVi: "Tuyết rơi",
    conditionEn: "Snowfall",
    iconType: "snow",
    bgGradient: "from-cyan-400 via-teal-400 to-blue-500",
    cardGlow: "shadow-cyan-500/25 border-cyan-200/50",
    accentColor: "text-cyan-200",
    badgeBg: "bg-cyan-500/30 text-cyan-100 border-cyan-300/40",
    uvIndex: 1,
    humidity: 92,
    windKm: 18,
    airQuality: "Tuyệt vời (12 AQI)",
    forecast24h: [
      { time: "18:00", temp: -2, icon: "snow" },
      { time: "21:00", temp: -4, icon: "snow" },
      { time: "00:00", temp: -5, icon: "snow" },
      { time: "03:00", temp: -6, icon: "snow" },
    ]
  },
  {
    id: "card-4",
    city: "Paris",
    country: "France",
    timeStr: "Paris Current · 05:40PM",
    tempC: 22,
    tempF: 72,
    conditionVi: "Nhiều mây",
    conditionEn: "Cloudy",
    iconType: "cloud-sun",
    bgGradient: "from-orange-400 via-pink-400 to-purple-500",
    cardGlow: "shadow-pink-500/25 border-pink-200/50",
    accentColor: "text-orange-200",
    badgeBg: "bg-pink-500/30 text-pink-100 border-pink-300/40",
    uvIndex: 5,
    humidity: 60,
    windKm: 14,
    airQuality: "Vừa phải (45 AQI)",
    forecast24h: [
      { time: "17:00", temp: 23, icon: "cloud-sun" },
      { time: "20:00", temp: 20, icon: "cloud" },
      { time: "23:00", temp: 18, icon: "moon" },
      { time: "02:00", temp: 16, icon: "moon" },
    ]
  },
  {
    id: "card-5",
    city: "Chicago",
    country: "USA",
    timeStr: "Chicago Current · 02:20PM",
    tempC: 15,
    tempF: 59,
    conditionVi: "Nhiều gió",
    conditionEn: "Windy",
    iconType: "fog",
    bgGradient: "from-emerald-400 via-teal-500 to-cyan-600",
    cardGlow: "shadow-emerald-500/25 border-emerald-200/50",
    accentColor: "text-emerald-200",
    badgeBg: "bg-emerald-500/30 text-emerald-100 border-emerald-300/40",
    uvIndex: 4,
    humidity: 55,
    windKm: 38,
    airQuality: "Tốt (28 AQI)",
    forecast24h: [
      { time: "14:00", temp: 15, icon: "fog" },
      { time: "17:00", temp: 14, icon: "fog" },
      { time: "20:00", temp: 12, icon: "cloud" },
      { time: "23:00", temp: 10, icon: "cloud" },
    ]
  },
  {
    id: "card-6",
    city: "Shanghai",
    country: "China",
    timeStr: "Shanghai Current · 11:00PM",
    tempC: 24,
    tempF: 75,
    conditionVi: "Dông sét",
    conditionEn: "Lightning",
    iconType: "lightning",
    bgGradient: "from-purple-600 via-pink-600 to-indigo-700",
    cardGlow: "shadow-purple-500/25 border-purple-200/50",
    accentColor: "text-purple-200",
    badgeBg: "bg-purple-500/30 text-purple-100 border-purple-300/40",
    uvIndex: 0,
    humidity: 95,
    windKm: 30,
    airQuality: "Trung bình (58 AQI)",
    forecast24h: [
      { time: "23:00", temp: 24, icon: "lightning" },
      { time: "02:00", temp: 22, icon: "rain-heavy" },
      { time: "05:00", temp: 21, icon: "cloud" },
      { time: "08:00", temp: 23, icon: "cloud-sun" },
    ]
  }
];

interface Weather3DCardsShowcaseProps {
  onClose?: () => void;
  isModal?: boolean;
}

export default function Weather3DCardsShowcase({
  onClose,
  isModal = false
}: Weather3DCardsShowcaseProps) {
  const { lang } = useLanguage();
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<WeatherCardData | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Web Audio Synth for ambient soundscape
  const audioCtxRef = useRef<AudioContext | null>(null);
  const soundGainRef = useRef<GainNode | null>(null);
  const soundOscRef = useRef<any>(null);

  const stopSound = () => {
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {
        // ignore
      }
      audioCtxRef.current = null;
    }
    setActiveSound(null);
  };

  const playAmbientSound = (type: string) => {
    if (activeSound === type) {
      stopSound();
      return;
    }
    stopSound();

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);
      soundGainRef.current = masterGain;

      // Synthetic ambient sounds
      if (type === "sun") {
        // High soft chime tone (chirp effect)
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 1);
        osc.connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 2);
      } else if (type === "rain-heavy" || type === "lightning") {
        // White noise rain filter
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1000, ctx.currentTime);

        noise.connect(filter);
        filter.connect(masterGain);
        noise.start();
        soundOscRef.current = noise;
      } else {
        // Soft wind sweep
        const osc = ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(300, ctx.currentTime + 1.5);
        osc.connect(masterGain);
        osc.start();
        soundOscRef.current = osc;
      }

      setActiveSound(type);
    } catch (err) {
      console.warn("Audio playback not supported", err);
    }
  };

  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  const handleCopyCode = (card: WeatherCardData) => {
    const snippet = `<WeatherCard city="${card.city}" temp="${card.tempC}°C" condition="${card.conditionEn}" />`;
    navigator.clipboard.writeText(snippet);
    setCopiedId(card.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 rounded-[36px]",
        "bg-slate-900/90 dark:bg-slate-950/95 backdrop-blur-2xl border border-white/20 shadow-2xl text-white",
        isModal && "my-4"
      )}
    >
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-cyan-500/20 border border-white/20 text-xs font-semibold text-amber-300 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>{lang === "vi" ? "Bộ sưu tập Thẻ Thời Tiết 3D Glass" : "3D Glass Weather Card Gallery"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
            {lang === "vi" ? "Thiết kế Thẻ Thời Tiết 3D Giống 100% Ảnh Đính Kèm" : "100% Faithful 3D Glass Weather Cards"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            {lang === "vi"
              ? "Tái hiện chính xác 6 thẻ thời tiết với hiệu ứng Glassmorphic, khối 3D nhô khỏi khung, đổ bóng sinh động và âm thanh thiên nhiên tương tác."
              : "Precision 3D Glassmorphism cards with popping elements, vibrant soft glows, real-time audio soundscapes, and full unit toggles."}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* C / F Unit Toggle */}
          <div className="flex items-center p-1 rounded-full bg-slate-800/80 border border-white/20">
            <button
              onClick={() => setUnit("C")}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold transition-all",
                unit === "C" ? "bg-cyan-500 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
              )}
            >
              °C
            </button>
            <button
              onClick={() => setUnit("F")}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold transition-all",
                unit === "F" ? "bg-cyan-500 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
              )}
            >
              °F
            </button>
          </div>

          {/* Close modal if applicable */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-white/20 transition-colors"
              title={lang === "vi" ? "Đóng" : "Close"}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid of 6 Weather 3D Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {WEATHER_3D_CARDS.map((card, index) => {
          const displayTemp = unit === "C" ? `${card.tempC}°` : `${card.tempF}°`;
          const conditionText = lang === "vi" ? card.conditionVi : card.conditionEn;
          const isAudioPlaying = activeSound === card.iconType;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={cn(
                "group relative rounded-[32px] p-6 sm:p-7 overflow-visible transition-all duration-500 cursor-pointer",
                "bg-gradient-to-br border shadow-xl backdrop-blur-xl",
                card.bgGradient,
                card.cardGlow
              )}
              onClick={() => setSelectedCard(card)}
            >
              {/* Glass Reflection Highlight overlay */}
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-60 pointer-events-none" />

              {/* Card Header: Location Capsule & Audio trigger */}
              <div className="relative z-10 flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 backdrop-blur-md border border-white/20">
                  <Compass className="w-3.5 h-3.5 text-white/90 animate-spin-slow" />
                  <span className="text-xs font-medium text-white/90 truncate max-w-[170px]">
                    {card.timeStr}
                  </span>
                </div>

                {/* Sound Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playAmbientSound(card.iconType);
                  }}
                  className={cn(
                    "p-2 rounded-full border transition-all backdrop-blur-md",
                    isAudioPlaying
                      ? "bg-amber-400 text-slate-950 border-amber-300 animate-pulse"
                      : "bg-black/20 text-white/80 border-white/20 hover:bg-black/40 hover:text-white"
                  )}
                  title={lang === "vi" ? "Bật âm thanh thời tiết" : "Toggle ambient sound"}
                >
                  {isAudioPlaying ? (
                    <Volume2 className="w-4 h-4 animate-bounce" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Main Content Area with 3D Popping Element */}
              <div className="relative z-10 flex items-center justify-between min-h-[120px] my-2">
                {/* Temperature & Condition Text */}
                <div>
                  <div className="text-5xl sm:text-6xl font-black text-white tracking-tight drop-shadow-md">
                    {displayTemp}
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm">
                    <span className={card.badgeBg}>{conditionText}</span>
                  </div>
                </div>

                {/* 3D Glass Weather Icon Popping Out */}
                <div className="relative group-hover:scale-125 group-hover:-translate-y-3 transition-transform duration-500 ease-out drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)]">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                    <GlassWeatherIcon
                      type={card.iconType}
                      className="w-full h-full filter drop-shadow-2xl"
                    />
                  </div>
                  {/* Subtle 3D shadow ellipse under icon */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-black/30 rounded-full blur-md opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500" />
                </div>
              </div>

              {/* Card Footer Metrics */}
              <div className="relative z-10 grid grid-cols-3 gap-2 pt-4 mt-2 border-t border-white/20 text-xs text-white/90">
                <div className="flex flex-col items-center p-1.5 rounded-xl bg-black/15 backdrop-blur-sm border border-white/10">
                  <span className="text-[10px] text-white/70">{lang === "vi" ? "Độ ẩm" : "Humidity"}</span>
                  <span className="font-bold text-white mt-0.5">{card.humidity}%</span>
                </div>
                <div className="flex flex-col items-center p-1.5 rounded-xl bg-black/15 backdrop-blur-sm border border-white/10">
                  <span className="text-[10px] text-white/70">{lang === "vi" ? "Gió" : "Wind"}</span>
                  <span className="font-bold text-white mt-0.5">{card.windKm} km/h</span>
                </div>
                <div className="flex flex-col items-center p-1.5 rounded-xl bg-black/15 backdrop-blur-sm border border-white/10">
                  <span className="text-[10px] text-white/70">{lang === "vi" ? "Chỉ số UV" : "UV Index"}</span>
                  <span className="font-bold text-white mt-0.5">{card.uvIndex}/10</span>
                </div>
              </div>

              {/* Hover Details Button */}
              <div className="relative z-10 flex items-center justify-between mt-3 text-xs text-white/80 opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="text-[11px] font-medium flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {lang === "vi" ? "Xem chi tiết 24h" : "View 24h forecast"}
                </span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Forecast Modal when a card is selected */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "relative w-full max-w-xl p-6 sm:p-8 rounded-[36px] text-white shadow-2xl border border-white/30 backdrop-blur-2xl bg-gradient-to-br",
                selectedCard.bgGradient
              )}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white border border-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16">
                  <GlassWeatherIcon type={selectedCard.iconType} className="w-full h-full" />
                </div>
                <div>
                  <h3 className="text-2xl font-black">{selectedCard.city}, {selectedCard.country}</h3>
                  <p className="text-xs text-white/80">{selectedCard.timeStr}</p>
                </div>
              </div>

              <div className="flex items-baseline gap-4 my-4">
                <span className="text-6xl font-black tracking-tight">
                  {unit === "C" ? `${selectedCard.tempC}°C` : `${selectedCard.tempF}°F`}
                </span>
                <span className="text-lg font-bold px-3 py-1 rounded-full bg-black/30 border border-white/20">
                  {lang === "vi" ? selectedCard.conditionVi : selectedCard.conditionEn}
                </span>
              </div>

              {/* Detailed metrics grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
                <div className="p-3 rounded-2xl bg-black/25 border border-white/15 text-center">
                  <Droplets className="w-5 h-5 mx-auto mb-1 text-cyan-300" />
                  <div className="text-[10px] text-white/70">{lang === "vi" ? "Độ ẩm" : "Humidity"}</div>
                  <div className="font-bold text-sm">{selectedCard.humidity}%</div>
                </div>
                <div className="p-3 rounded-2xl bg-black/25 border border-white/15 text-center">
                  <Wind className="w-5 h-5 mx-auto mb-1 text-teal-300" />
                  <div className="text-[10px] text-white/70">{lang === "vi" ? "Tốc độ gió" : "Wind Speed"}</div>
                  <div className="font-bold text-sm">{selectedCard.windKm} km/h</div>
                </div>
                <div className="p-3 rounded-2xl bg-black/25 border border-white/15 text-center">
                  <Sun className="w-5 h-5 mx-auto mb-1 text-amber-300" />
                  <div className="text-[10px] text-white/70">{lang === "vi" ? "Tia UV" : "UV Index"}</div>
                  <div className="font-bold text-sm">{selectedCard.uvIndex}/10</div>
                </div>
                <div className="p-3 rounded-2xl bg-black/25 border border-white/15 text-center">
                  <ShieldAlert className="w-5 h-5 mx-auto mb-1 text-emerald-300" />
                  <div className="text-[10px] text-white/70">{lang === "vi" ? "Chất lượng KK" : "Air Quality"}</div>
                  <div className="font-bold text-xs truncate">{selectedCard.airQuality}</div>
                </div>
              </div>

              {/* 24-Hour Forecast strip */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-white/90 mb-3 uppercase tracking-wider">
                  {lang === "vi" ? "Dự báo 24 giờ tới" : "24-Hour Hourly Forecast"}
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {selectedCard.forecast24h.map((f, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-black/20 border border-white/15 flex flex-col items-center">
                      <span className="text-[11px] text-white/80 font-medium">{f.time}</span>
                      <div className="w-8 h-8 my-1">
                        <GlassWeatherIcon type={f.icon as any} className="w-full h-full" />
                      </div>
                      <span className="text-xs font-bold">{f.temp}°</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Embed & Copy Code */}
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <span className="text-xs text-white/80">
                  {lang === "vi" ? "Tích hợp Widget cho Portfolio" : "Embed Widget Component"}
                </span>
                <button
                  onClick={() => handleCopyCode(selectedCard)}
                  className="px-4 py-2 rounded-xl bg-white text-slate-950 font-bold text-xs flex items-center gap-2 hover:bg-slate-200 transition-colors shadow-lg"
                >
                  {copiedId === selectedCard.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{lang === "vi" ? "Đã sao chép!" : "Copied!"}</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>{lang === "vi" ? "Sao chép Code Widget" : "Copy Widget Code"}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggested 5 Features List Box at Bottom */}
      <div className="relative z-10 mt-8 p-5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300">
        <h4 className="font-bold text-white text-sm flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{lang === "vi" ? "Gợi ý 5 Tính năng Đột phá cho Hệ thống Thời tiết Portfolio:" : "5 Suggested Next-Gen Features for Weather System:"}</span>
        </h4>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-2.5 list-decimal list-inside text-slate-300">
          <li><strong>{lang === "vi" ? "Soundscape Âm thanh 3D:" : "3D Soundscape:"}</strong> {lang === "vi" ? "Phát tiếng mưa, tiếng chim hót, gió bão khi click thẻ." : "Play ambient sound effects per weather condition."}</li>
          <li><strong>{lang === "vi" ? "Nghiêng 3D Gyroscope/Mouse Tilt:" : "3D Gyroscope/Mouse Tilt:"}</strong> {lang === "vi" ? "Tương tác chiều sâu 3D linh hoạt khi di chuột qua thẻ." : "Dynamic depth perspective rotation on hover."}</li>
          <li><strong>{lang === "vi" ? "Dự báo Chi tiết 24h & Chỉ số UV:" : "Detailed 24h & UV Forecast:"}</strong> {lang === "vi" ? "Xem chi tiết AQI, độ ẩm, tốc độ gió và dự báo theo giờ." : "Inspect AQI, humidity, wind speed, and hourly breakdown."}</li>
          <li><strong>{lang === "vi" ? "Chuyển đổi Đơn vị °C / °F Realtime:" : "Realtime °C / °F Converter:"}</strong> {lang === "vi" ? "Đổi đơn vị tức thì kèm giờ hiện tại địa phương." : "Instant temperature unit conversion with local city time."}</li>
          <li><strong>{lang === "vi" ? "Xuất Mã Nhúng React Widget:" : "Export React Widget Code:"}</strong> {lang === "vi" ? "Sao chép snippet widget để tái sử dụng trên website khác." : "Copy widget snippet for embedding across other apps."}</li>
        </ol>
      </div>
    </div>
  );
}
