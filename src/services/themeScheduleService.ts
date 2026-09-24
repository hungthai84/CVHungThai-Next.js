/**
 * Solar & Geolocation Theme Schedule Service
 * Calculates accurate astronomical sunrise/sunset times based on geolocation (or fallback to local OS time)
 * and provides theme transition recommendations.
 */

export interface SolarTimes {
  sunrise: Date;
  sunset: Date;
  isDaytime: boolean;
  source: "geolocation" | "os-time";
  latitude?: number;
  longitude?: number;
  locationName?: string;
}

export interface ThemeSuggestion {
  targetTheme: "glass-dark-neon" | "mritech-digital-growth";
  period: "day" | "night";
  titleVi: string;
  titleEn: string;
  messageVi: string;
  messageEn: string;
  sunriseTimeStr: string;
  sunsetTimeStr: string;
  source: "geolocation" | "os-time";
}

/**
 * Astronomical Sunrise / Sunset calculation using standard zenith (90.8333 degrees)
 */
function calculateSolarTimesForCoords(lat: number, lng: number, date: Date = new Date()): { sunrise: Date; sunset: Date } {
  const zenith = 90.83333; // Official zenith for sunrise/sunset
  const D2R = Math.PI / 180;
  const R2D = 180 / Math.PI;

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 1. First calculate the day of the year
  const N1 = Math.floor((275 * month) / 9);
  const N2 = Math.floor((month + 9) / 12);
  const N3 = 1 + Math.floor((year - 4 * Math.floor(year / 4) + 2) / 3);
  const N = N1 - N2 * N3 + day - 30;

  const calculateEvent = (isSunrise: boolean): Date => {
    // 2. convert the longitude to hour value and calculate an approximate time
    const lngHour = lng / 15;
    const t = isSunrise ? N + (6 - lngHour) / 24 : N + (18 - lngHour) / 24;

    // 3. calculate the Sun's mean anomaly
    const M = 0.9856 * t - 3.289;

    // 4. calculate the Sun's true longitude
    let L = M + 1.916 * Math.sin(M * D2R) + 0.02 * Math.sin(2 * M * D2R) + 282.634;
    L = (L + 360) % 360;

    // 5a. calculate the Sun's right ascension
    let RA = R2D * Math.atan(0.91764 * Math.tan(L * D2R));
    RA = (RA + 360) % 360;

    // 5b. right ascension value needs to be in the same quadrant as L
    const Lquadrant = Math.floor(L / 90) * 90;
    const RAquadrant = Math.floor(RA / 90) * 90;
    RA = RA + (Lquadrant - RAquadrant);

    // 5c. right ascension value needs to be converted into hours
    RA = RA / 15;

    // 6. calculate the Sun's declination
    const sinDec = 0.39782 * Math.sin(L * D2R);
    const cosDec = Math.cos(Math.asin(sinDec));

    // 7a. calculate the Sun's local hour angle
    const cosH = (Math.cos(zenith * D2R) - sinDec * Math.sin(lat * D2R)) / (cosDec * Math.cos(lat * D2R));

    // Sun never rises/sets at extreme latitudes on this date
    if (cosH > 1) {
      // Midnight sun / polar night fallback
      const fallback = new Date(date);
      fallback.setHours(isSunrise ? 6 : 18, 0, 0, 0);
      return fallback;
    }
    if (cosH < -1) {
      const fallback = new Date(date);
      fallback.setHours(isSunrise ? 6 : 18, 0, 0, 0);
      return fallback;
    }

    // 7b. finish calculating H and convert into hours
    const H = isSunrise ? 360 - R2D * Math.acos(cosH) : R2D * Math.acos(cosH);
    const HHours = H / 15;

    // 8. calculate local mean time of rising/setting
    const T = HHours + RA - 0.06571 * t - 6.622;

    // 9. adjust back to UTC
    let UT = T - lngHour;
    UT = (UT + 24) % 24;

    // Convert UT hours to local time
    const result = new Date(Date.UTC(year, month - 1, day, Math.floor(UT), Math.floor((UT % 1) * 60)));
    return result;
  };

  const sunrise = calculateEvent(true);
  const sunset = calculateEvent(false);

  return { sunrise, sunset };
}

/**
 * Fallback calculation based on standard seasonal OS time
 */
function calculateFallbackOSTimes(date: Date = new Date()): { sunrise: Date; sunset: Date } {
  const sunrise = new Date(date);
  sunrise.setHours(6, 0, 0, 0);

  const sunset = new Date(date);
  sunset.setHours(18, 30, 0, 0);

  return { sunrise, sunset };
}

/**
 * Format Date to HH:MM format
 */
export function formatTimeHM(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

const GEO_STORAGE_KEY = "user_geo_solar_coords";

/**
 * Get cached geolocation from localStorage if valid (within 7 days)
 */
function getCachedGeo(): { lat: number; lng: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(GEO_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.lat === "number" && typeof parsed.lng === "number") {
      // 7 days validity
      if (Date.now() - (parsed.timestamp || 0) < 7 * 24 * 60 * 60 * 1000) {
        return { lat: parsed.lat, lng: parsed.lng };
      }
    }
  } catch {}
  return null;
}

/**
 * Save coordinates to localStorage
 */
function cacheGeo(lat: number, lng: number) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(GEO_STORAGE_KEY, JSON.stringify({ lat, lng, timestamp: Date.now() }));
  } catch {}
}

/**
 * Main function to evaluate current solar times
 */
export function getSolarTimes(customCoords?: { lat: number; lng: number }): SolarTimes {
  const now = new Date();
  const coords = customCoords || getCachedGeo();

  if (coords) {
    try {
      const { sunrise, sunset } = calculateSolarTimesForCoords(coords.lat, coords.lng, now);
      const isDaytime = now >= sunrise && now < sunset;
      return {
        sunrise,
        sunset,
        isDaytime,
        source: "geolocation",
        latitude: coords.lat,
        longitude: coords.lng,
      };
    } catch (e) {
      console.warn("Solar calculation with coordinates failed, using OS fallback", e);
    }
  }

  // OS local time fallback
  const { sunrise, sunset } = calculateFallbackOSTimes(now);
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const isDaytime = currentHour >= 6.0 && currentHour < 18.5;

  return {
    sunrise,
    sunset,
    isDaytime,
    source: "os-time",
  };
}

/**
 * Request user geolocation in browser
 */
export async function requestUserGeolocation(): Promise<{ lat: number; lng: number } | null> {
  if (typeof window === "undefined" || !navigator.geolocation) return null;

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        cacheGeo(coords.lat, coords.lng);
        resolve(coords);
      },
      () => {
        resolve(null);
      },
      { timeout: 8000, maximumAge: 600000 }
    );
  });
}

/**
 * Evaluate if theme suggestion should be shown based on current theme vs solar status
 */
export function evaluateThemeSuggestion(currentTheme: string, solar: SolarTimes): ThemeSuggestion | null {
  const isCurrentlyDark = currentTheme === "glass-dark-neon";
  const shouldBeDark = !solar.isDaytime;

  // If theme matches current solar period, no suggestion needed
  if (isCurrentlyDark === shouldBeDark) {
    return null;
  }

  const sunriseStr = formatTimeHM(solar.sunrise);
  const sunsetStr = formatTimeHM(solar.sunset);

  if (solar.isDaytime) {
    // It's daytime, but user is on dark theme
    return {
      targetTheme: "mritech-digital-growth",
      period: "day",
      titleVi: "Chuyển sang Giao diện Sáng (Ban Ngày)?",
      titleEn: "Switch to Day Theme?",
      messageVi: `Mặt trời đã mọc (${sunriseStr}). Chuyển sang giao diện Sáng để bảo vệ mắt và tăng cường khả năng tập trung.`,
      messageEn: `Sunrise has begun (${sunriseStr}). Switch to Day theme for optimal clarity and focus.`,
      sunriseTimeStr: sunriseStr,
      sunsetTimeStr: sunsetStr,
      source: solar.source,
    };
  } else {
    // It's night, but user is on light theme
    return {
      targetTheme: "glass-dark-neon",
      period: "night",
      titleVi: "Chuyển sang Giao diện Tối Neon (Ban Đêm)?",
      titleEn: "Switch to Night Theme?",
      messageVi: `Mặt trời đã lặn (${sunsetStr}). Chuyển sang giao diện Tối Neon để dịu mắt và tiết kiệm năng lượng.`,
      messageEn: `Sunset has passed (${sunsetStr}). Switch to Dark Neon theme for reduced eye fatigue.`,
      sunriseTimeStr: sunriseStr,
      sunsetTimeStr: sunsetStr,
      source: solar.source,
    };
  }
}
