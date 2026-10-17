import { computed, onBeforeUnmount, onMounted, ref } from "vue";

import { getJson, readCache, writeCache } from "./http";
import type { LoadStatus } from "./http";

/**
 * Lokale Zeit (Intl, ohne API) und aktuelles Wetter in Bern.
 * API: Open-Meteo (https://open-meteo.com) – kostenlos, kein Key, CORS erlaubt.
 */

export interface BernWeather {
  temperature: number;
  label: string;
  isDay: boolean;
}

interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
    is_day: number;
  };
}

const CACHE_KEY = "weather:bern";
const CACHE_MS = 15 * 60 * 1000;

const API_URL =
  "https://api.open-meteo.com/v1/forecast" +
  "?latitude=46.948&longitude=7.4474" +
  "&current=temperature_2m,weather_code,is_day" +
  "&timezone=Europe%2FZurich";

const timeFormatter = new Intl.DateTimeFormat("de-CH", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Zurich",
});

/* WMO-Wettercodes → deutsche Beschreibung */

function describeWeather(code: number): string {
  if (code === 0) return "Klar";
  if (code === 1) return "Überwiegend klar";
  if (code === 2) return "Teils bewölkt";
  if (code === 3) return "Bedeckt";
  if (code === 45 || code === 48) return "Nebel";
  if (code >= 51 && code <= 57) return "Nieselregen";
  if (code >= 61 && code <= 67) return "Regen";
  if (code >= 71 && code <= 77) return "Schnee";
  if (code >= 80 && code <= 82) return "Regenschauer";
  if (code === 85 || code === 86) return "Schneeschauer";
  if (code >= 95) return "Gewitter";

  return "Wechselhaft";
}

export function useBernWeather() {
  const now = ref(new Date());
  const weather = ref<BernWeather | null>(null);
  const status = ref<LoadStatus>("loading");

  const time = computed(() => timeFormatter.format(now.value));

  let timer: number | undefined;

  onMounted(async () => {
    timer = window.setInterval(() => {
      now.value = new Date();
    }, 15000);

    const cached = readCache<BernWeather>(CACHE_KEY, CACHE_MS);

    if (cached) {
      weather.value = cached;
      status.value = "ready";

      return;
    }

    try {
      const data = await getJson<OpenMeteoResponse>(API_URL);

      const result: BernWeather = {
        temperature: Math.round(data.current.temperature_2m),
        label: describeWeather(data.current.weather_code),
        isDay: data.current.is_day === 1,
      };

      weather.value = result;
      status.value = "ready";

      writeCache(CACHE_KEY, result);
    } catch {
      status.value = "error";
    }
  });

  onBeforeUnmount(() => {
    window.clearInterval(timer);
  });

  return { time, weather, status };
}
