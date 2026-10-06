import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Wind,
  Droplets,
  MapPin,
  RefreshCw,
  ChevronDown,
  Navigation,
  X,
  Umbrella
} from "lucide-react";
import GlassWeatherIcon from "./GlassWeatherIcon";
import FlipClock from "./FlipClock";
import { useLanguage } from "../i18n";
import { cn } from "../lib/utils";

interface WeatherData {
  city: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  weatherCode: number;
  isDay: boolean;
  time: string;
}

const CITIES = [
  { id: "hcm", nameVi: "TP. Hồ Chí Minh", nameEn: "Ho Chi Minh City", shortName: "TP.HCM", lat: 10.8231, lon: 106.6297 },
  { id: "hn", nameVi: "Hà Nội", nameEn: "Hanoi", shortName: "Hà Nội", lat: 21.0285, lon: 105.8542 },
  { id: "dn", nameVi: "Đà Nẵng", nameEn: "Da Nang", shortName: "Đà Nẵng", lat: 16.0544, lon: 108.2022 },
  { id: "ct", nameVi: "Cần Thơ", nameEn: "Can Tho", shortName: "Cần Thơ", lat: 10.0452, lon: 105.7469 },
  { id: "hp", nameVi: "Hải Phòng", nameEn: "Hai Phong", shortName: "Hải Phòng", lat: 20.8449, lon: 106.6881 },
];

function getWeatherInfo(code: number, isDay: boolean, lang: "vi" | "en") {
  if (code === 0) {
    return {
      text: lang === "vi" ? (isDay ? "Nắng quang đãng" : "Đêm quang đãng") : (isDay ? "Clear Sky" : "Clear Night"),
      color: isDay ? "text-amber-500" : "text-indigo-400",
      bgGradient: isDay ? "from-amber-500/20 to-orange-500/10" : "from-indigo-900/40 to-slate-900/40",
    };
  }
  if (code <= 3) {
    return {
      text: lang === "vi" ? (code === 1 ? "Ít mây, trời đẹp" : "Nhiều mây rải rác") : (code === 1 ? "Mainly Clear" : "Partly Cloudy"),
      color: isDay ? "text-sky-500" : "text-sky-300",
      bgGradient: "from-sky-500/20 to-blue-500/10",
    };
  }
  if (code === 45 || code === 48) {
    return {
      text: lang === "vi" ? "Sương mù nhẹ" : "Foggy",
      color: "text-slate-400",
      bgGradient: "from-slate-500/20 to-slate-700/10",
    };
  }
  if (code >= 51 && code <= 57) {
    return {
      text: lang === "vi" ? "Mưa phùn nhỏ" : "Light Drizzle",
      color: "text-cyan-500",
      bgGradient: "from-cyan-500/20 to-blue-500/10",
    };
  }
  if (code >= 61 && code <= 67) {
    return {
      text: lang === "vi" ? "Có mưa rào" : "Rain Showers",
      color: "text-blue-500",
      bgGradient: "from-blue-500/20 to-indigo-500/10",
    };
  }
  if (code >= 71 && code <= 77) {
    return {
      text: lang === "vi" ? "Tuyết rơi" : "Snowy",
      color: "text-indigo-300",
      bgGradient: "from-indigo-400/20 to-blue-300/10",
    };
  }
  if (code >= 80 && code <= 82) {
    return {
      text: lang === "vi" ? "Mưa rào nặng hạt" : "Heavy Rain",
      color: "text-blue-600",
      bgGradient: "from-blue-600/20 to-cyan-600/10",
    };
  }
  if (code >= 95) {
    return {
      text: lang === "vi" ? "Dông sét & mưa rào" : "Thunderstorm",
      color: "text-amber-400",
      bgGradient: "from-amber-500/20 to-purple-600/20",
    };
  }
  return {
    text: lang === "vi" ? "Thời tiết mát mẻ" : "Pleasant Weather",
    color: "text-sky-500",
    bgGradient: "from-sky-500/20 to-blue-500/10",
  };
}

interface FooterWeatherProps {
  layoutMode?: "vertical" | "horizontal";
  timeString?: string;
  dateString?: string;
}

export default function FooterWeather({ layoutMode = "vertical", timeString, dateString }: FooterWeatherProps) {
  const { lang } = useLanguage();
  const [selectedCityId, setSelectedCityId] = useState<string>("hcm");
  const [customLocationName, setCustomLocationName] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherData>({
    city: "TP. Hồ Chí Minh",
    temp: 31,
    feelsLike: 33,
    humidity: 72,
    windSpeed: 12,
    precipitation: 0,
    weatherCode: 1,
    isDay: true,
    time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popup on click outside
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent | TouchEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Fetch weather data via API proxy route with fallback
  const fetchWeather = async (lat: number, lon: number, cityName: string) => {
    setIsLoading(true);
    try {
      // First try internal Next.js API proxy to avoid CORS/network sandbox blocks
      let current: any = null;
      try {
        const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.current) {
            current = data.current;
          }
        }
      } catch {
        // Silently try direct fallback
      }

      // If internal proxy was not reachable or failed, try direct Open-Meteo
      if (!current) {
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`
          );
          if (res.ok) {
            const data = await res.json();
            current = data.current;
          }
        } catch {
          // Handled below with default state
        }
      }

      const now = new Date();
      const vnHour = (now.getUTCHours() + 7) % 24;
      const isDayDefault = vnHour >= 6 && vnHour < 18;
      const timeStr = now.toLocaleTimeString(lang === "vi" ? "vi-VN" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (current) {
        setWeather({
          city: cityName,
          temp: Math.round(current.temperature_2m ?? 30),
          feelsLike: Math.round(current.apparent_temperature ?? current.temperature_2m ?? 32),
          humidity: Math.round(current.relative_humidity_2m ?? 70),
          windSpeed: Math.round(current.wind_speed_10m ?? 12),
          precipitation: current.precipitation || 0,
          weatherCode: current.weather_code ?? 1,
          isDay: typeof current.is_day === "number" ? current.is_day === 1 : isDayDefault,
          time: timeStr,
        });
      } else {
        // Sensible fallback for Vietnam regions
        setWeather((prev) => ({
          ...prev,
          city: cityName,
          isDay: isDayDefault,
          time: timeStr,
        }));
      }
    } catch {
      // Catch-all safe handling
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    const city = CITIES.find((c) => c.id === selectedCityId) || CITIES[0];
    fetchWeather(city.lat, city.lon, lang === "vi" ? city.nameVi : city.nameEn);
  }, [selectedCityId, lang]);

  // Periodic weather refresh every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      const city = CITIES.find((c) => c.id === selectedCityId) || CITIES[0];
      fetchWeather(city.lat, city.lon, customLocationName || (lang === "vi" ? city.nameVi : city.nameEn));
    }, 600000);
    return () => clearInterval(interval);
  }, [selectedCityId, customLocationName, lang]);

  // GPS Geolocation Handler
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert(lang === "vi" ? "Trình duyệt không hỗ trợ định vị GPS." : "Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const locName = lang === "vi" ? "Vị trí của bạn" : "Current Location";
        setCustomLocationName(locName);
        setSelectedCityId("custom");
        fetchWeather(latitude, longitude, locName);
        setIsLocating(false);
      },
      (error) => {
        console.warn("Geolocation error:", error);
        setIsLocating(false);
        alert(
          lang === "vi"
            ? "Không thể lấy vị trí hiện tại. Vui lòng cho phép quyền truy cập vị trí."
            : "Could not access current location. Please allow location permissions."
        );
      },
      { timeout: 8000 }
    );
  };

  const weatherInfo = getWeatherInfo(weather.weatherCode, weather.isDay, lang);

  const currentCityObj = CITIES.find((c) => c.id === selectedCityId);
  const displayCityShort = customLocationName 
    ? (lang === "vi" ? "Vị trí" : "Live") 
    : (currentCityObj?.shortName || "TP.HCM");

  const weatherCard = useMemo(() => {
    const code = weather.weatherCode;
    if (code === 0) {
      return {
        gradient: "bg-gradient-to-r from-[#17c5d9] via-[#21b7f0] to-[#2e9ef2]",
        condition: "Sunny",
        conditionVi: "Nắng đẹp",
        sunAura: true,
      };
    }
    if (code <= 3) {
      return {
        gradient: "bg-gradient-to-r from-[#29aaf4] via-[#3d8ef4] to-[#4670e8]",
        condition: code === 1 ? "Mainly Clear" : "Cloudy",
        conditionVi: code === 1 ? "Trời trong" : "Có mây",
        sunAura: false,
      };
    }
    if (code === 45 || code === 48) {
      return {
        gradient: "bg-gradient-to-r from-[#7c91b5] via-[#6f83a7] to-[#5e7194]",
        condition: "Overcast",
        conditionVi: "Nhiều mây",
        sunAura: false,
      };
    }
    if (code >= 51 && code <= 82) {
      return {
        gradient: "bg-gradient-to-r from-[#274885] via-[#1c3563] to-[#122240]",
        condition: "Heavy Rain",
        conditionVi: "Mưa rào",
        sunAura: false,
      };
    }
    return {
      gradient: "bg-gradient-to-r from-[#5a2eab] via-[#6b25aa] to-[#882194]",
      condition: "Thunder Storm",
      conditionVi: "Dông sét",
      sunAura: false,
    };
  }, [weather.weatherCode]);

  return (
    <div className="relative inline-flex items-center" ref={popoverRef}>
      {/* ========================================================================= */}
      {/* GLOSSY GLASS WEATHER CARD AS IN REFERENCE ATTACHED IMAGE */}
      {/* ========================================================================= */}
      {layoutMode === "vertical" ? (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative group flex items-center gap-2 xs:gap-2.5 px-3 py-1.5 rounded-[14px] overflow-hidden text-left cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_16px_rgba(0,0,0,0.18)] border border-white/30 active:scale-95 shrink-0 select-none",
            weatherCard.gradient
          )}
          style={{ height: "46px" }}
          title={lang === "vi" ? `Thời tiết: ${weather.temp}°C tại ${weather.city}` : `Weather: ${weather.temp}°C in ${weather.city}`}
        >
          {/* Top glossy glass reflection highlight line */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 via-white/10 to-transparent pointer-events-none rounded-t-[14px]" />

          {/* Left: 3D Weather Icon visual with soft aura */}
          <div className="relative flex items-center justify-center shrink-0">
            {weatherCard.sunAura && (
              <div className="absolute w-8 h-8 rounded-full bg-amber-300/40 blur-md -z-10 animate-pulse" />
            )}
            <GlassWeatherIcon 
              weatherCode={weather.weatherCode} 
              isDay={weather.isDay} 
              className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-md group-hover:scale-110 transition-transform duration-300" 
            />
          </div>

          {/* Center: Big Bold Temperature */}
          <span className="text-[22px] sm:text-[24px] font-black text-white leading-none tracking-tight drop-shadow-sm font-sans shrink-0">
            {weather.temp}°
          </span>

          {/* Right: Weather condition and Location Current Time */}
          <div className="flex flex-col justify-center min-w-0 pr-1 text-left">
            <span className="text-[12px] sm:text-[13px] font-bold text-white leading-tight drop-shadow-xs truncate font-sans">
              {lang === "vi" ? weatherCard.conditionVi : weatherCard.condition}
            </span>
            <span className="text-[9px] sm:text-[9.5px] font-medium text-white/85 leading-tight truncate whitespace-nowrap">
              {displayCityShort} · {weather.time}
            </span>
          </div>

          <ChevronDown className={`w-3.5 h-3.5 text-white/70 group-hover:text-white transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
        </button>
      ) : (
        /* HORIZONTAL SIDEBAR RIGHT TRIGGER */
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group flex flex-col items-center gap-1 p-2 rounded-2xl glass-surface hover:bg-slate-200/90 dark:hover:bg-slate-700/90 border border-slate-200/80 dark:border-slate-700 transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer w-full text-center"
          title={lang === "vi" ? `Thời tiết: ${weather.temp}°C tại ${weather.city}` : `Weather: ${weather.temp}°C in ${weather.city}`}
        >
          <div className="w-9 h-9 rounded-full glass-surface border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform p-0.5">
            <GlassWeatherIcon weatherCode={weather.weatherCode} isDay={weather.isDay} className="w-7 h-7 drop-shadow" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-black text-slate-800 dark:text-slate-100">
              {weather.temp}°C
            </span>
            <span className="text-3xs font-bold text-slate-500 dark:text-slate-400 truncate max-w-[70px]">
              {displayCityShort}
            </span>
          </div>
        </button>
      )}

      {/* ========================================================================= */}
      {/* EXPANDED WEATHER POPOVER CARD */}
      {/* ========================================================================= */}
      {isOpen && (
        <div 
          className={`absolute z-[9999] ${
            layoutMode === "vertical" 
              ? "bottom-full left-0 mb-2.5 origin-bottom-left" 
              : "right-full top-0 mr-2.5 origin-top-right"
          } w-[280px] sm:w-[320px] rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#0c101d]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-cyan-500/25 shadow-2xl dark:shadow-[0_16px_50px_rgba(0,0,0,0.8)] p-4 text-slate-800 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-200`}
        >
          {/* Header: Location & Close Button */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-white/10">
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-cyan-500/20 text-blue-600 dark:text-cyan-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate">
                  {weather.city}
                </h4>
                <p className="text-3xs text-slate-500 dark:text-slate-400 font-medium">
                  {lang === "vi" ? `Cập nhật lúc ${weather.time}` : `Updated at ${weather.time}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  const city = CITIES.find((c) => c.id === selectedCityId) || CITIES[0];
                  fetchWeather(city.lat, city.lon, customLocationName || (lang === "vi" ? city.nameVi : city.nameEn));
                }}
                className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors ${isLoading ? "animate-spin text-blue-500" : ""}`}
                title={lang === "vi" ? "Làm mới dữ liệu" : "Refresh"}
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                title={lang === "vi" ? "Đóng" : "Close"}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Big Temperature Hero Section */}
          <div className="my-3 p-3 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-[#13192b] dark:to-[#0f1424] border border-slate-100 dark:border-white/10 flex items-center justify-between shadow-xs">
            <div className="space-y-0.5">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {weather.temp}°
                </span>
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                  C
                </span>
              </div>
              <p className="text-xs font-bold text-blue-600 dark:text-cyan-400">
                {weatherInfo.text}
              </p>
              <p className="text-3xs font-medium text-slate-500 dark:text-slate-400">
                {lang === "vi" ? `Cảm giác như: ${weather.feelsLike}°C` : `Feels like: ${weather.feelsLike}°C`}
              </p>
            </div>

            <div className="p-2.5 rounded-2xl bg-white/70 dark:bg-white/10 border border-slate-200/80 dark:border-white/15 shadow-sm flex items-center justify-center">
              <GlassWeatherIcon 
                weatherCode={weather.weatherCode} 
                isDay={weather.isDay} 
                className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-xl hover:scale-105 transition-transform" 
              />
            </div>
          </div>

          {/* 3 Detail Metric Pills (Humidity, Wind, Precipitation) */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {/* Humidity */}
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex flex-col items-center text-center">
              <Droplets className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400 mb-0.5" />
              <span className="text-3xs text-slate-500 dark:text-slate-400 font-medium">
                {lang === "vi" ? "Độ ẩm" : "Humidity"}
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                {weather.humidity}%
              </span>
            </div>

            {/* Wind */}
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex flex-col items-center text-center">
              <Wind className="w-3.5 h-3.5 text-teal-500 dark:text-emerald-400 mb-0.5" />
              <span className="text-3xs text-slate-500 dark:text-slate-400 font-medium">
                {lang === "vi" ? "Gió" : "Wind"}
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                {weather.windSpeed} km/h
              </span>
            </div>

            {/* Precipitation */}
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex flex-col items-center text-center">
              <Umbrella className="w-3.5 h-3.5 text-cyan-500 dark:text-sky-400 mb-0.5" />
              <span className="text-3xs text-slate-500 dark:text-slate-400 font-medium">
                {lang === "vi" ? "Lượng mưa" : "Precip"}
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                {weather.precipitation} mm
              </span>
            </div>
          </div>

          {/* City Selection Pills + GPS Locate Button */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-3xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {lang === "vi" ? "Chọn tỉnh / thành phố" : "Select location"}
              </span>
              <button
                type="button"
                onClick={handleGetLocation}
                disabled={isLocating}
                className="inline-flex items-center gap-1 text-3xs font-bold text-blue-600 dark:text-cyan-400 hover:underline cursor-pointer"
                title={lang === "vi" ? "Lấy vị trí hiện tại qua GPS" : "Use GPS location"}
              >
                <Navigation className={`w-3 h-3 ${isLocating ? "animate-spin" : ""}`} />
                <span>{lang === "vi" ? "Định vị GPS" : "GPS"}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1">
              {CITIES.map((c) => {
                const isSelected = selectedCityId === c.id && !customLocationName;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setCustomLocationName(null);
                      setSelectedCityId(c.id);
                    }}
                    className={`px-2 py-1 rounded-lg text-3xs font-bold transition-all ${
                      isSelected
                        ? "bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-2xs font-extrabold"
                        : "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/15"
                    }`}
                  >
                    {c.shortName}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
