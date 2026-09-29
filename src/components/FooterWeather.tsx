import React, { useState, useEffect } from "react";
import { CloudSun, CloudRain, Sun, Wind, MapPin } from "lucide-react";
import { useLanguage } from "../i18n";

interface FooterWeatherProps {
  layoutMode?: "horizontal" | "vertical";
  showWeather?: boolean;
  timeString?: string;
}

export function FooterWeather({ layoutMode = "horizontal", showWeather = true, timeString }: FooterWeatherProps) {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  const [weatherData, setWeatherData] = useState({
    temp: 29,
    condition: isVi ? "Nắng nhẹ" : "Partly Sunny",
    location: "TP.HCM",
    humidity: 72
  });

  return (
    <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold">
      {showWeather && (
        <div className="flex items-center gap-1.5">
          <CloudSun className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
          <span>{weatherData.temp}°C</span>
          <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">• {weatherData.location}</span>
        </div>
      )}

      {showWeather && timeString && (
        <span className="text-slate-300 dark:text-slate-600 font-normal">•</span>
      )}

      {timeString && (
        <span className="font-mono text-[11px] font-bold text-blue-600 dark:text-cyan-400">
          {timeString}
        </span>
      )}
    </div>
  );
}

export default FooterWeather;
