import { NextRequest, NextResponse } from "next/server";

// Approximate weather defaults for major regions if external API is unreachable
const DEFAULT_FALLBACKS: Record<string, { temp: number; feelsLike: number; humidity: number; windSpeed: number; precipitation: number; weatherCode: number }> = {
  hcm: { temp: 31, feelsLike: 34, humidity: 75, windSpeed: 12, precipitation: 0, weatherCode: 1 },
  hn: { temp: 28, feelsLike: 30, humidity: 70, windSpeed: 10, precipitation: 0, weatherCode: 2 },
  dn: { temp: 29, feelsLike: 32, humidity: 72, windSpeed: 14, precipitation: 0, weatherCode: 1 },
  ct: { temp: 30, feelsLike: 33, humidity: 78, windSpeed: 11, precipitation: 0, weatherCode: 1 },
  hp: { temp: 27, feelsLike: 29, humidity: 74, windSpeed: 13, precipitation: 0, weatherCode: 2 },
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat") || "10.8231";
  const lon = searchParams.get("lon") || "106.6297";

  const targetUrl = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(
    lat
  )}&longitude=${encodeURIComponent(
    lon
  )}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "Portfolio-Weather-Widget/1.0",
      },
      next: { revalidate: 300 }, // Cache 5 minutes
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data, {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      });
    }
  } catch (error) {
    // Graceful server-side fallback
    console.warn("Server weather fetch error (using fallback):", error instanceof Error ? error.message : error);
  }

  // Determine daylight based on current Vietnam time (GMT+7)
  const now = new Date();
  const utcHours = now.getUTCHours();
  const vnHour = (utcHours + 7) % 24;
  const isDay = vnHour >= 6 && vnHour < 18;

  // Provide realistic fallback current object matching open-meteo structure
  return NextResponse.json(
    {
      current: {
        time: now.toISOString(),
        temperature_2m: isDay ? 31.0 : 26.5,
        apparent_temperature: isDay ? 33.5 : 28.0,
        relative_humidity_2m: isDay ? 70 : 82,
        is_day: isDay ? 1 : 0,
        precipitation: 0.0,
        weather_code: 1, // Mainly clear / nice weather
        wind_speed_10m: 11.5,
      },
      is_fallback: true,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
      },
    }
  );
}
