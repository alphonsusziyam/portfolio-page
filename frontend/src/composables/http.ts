/**
 * Kleine Helfer für öffentliche APIs (kein API-Key nötig):
 * - getJson: fetch mit Timeout
 * - readCache / writeCache: sessionStorage-Cache, schont Rate-Limits
 */

interface CacheEntry<T> {
  savedAt: number;
  data: T;
}

export type LoadStatus = "loading" | "ready" | "error";

export function readCache<T>(key: string, maxAgeMs: number): T | null {
  try {
    const raw = sessionStorage.getItem(key);

    if (!raw) {
      return null;
    }

    const entry = JSON.parse(raw) as CacheEntry<T>;

    return Date.now() - entry.savedAt <= maxAgeMs ? entry.data : null;
  } catch {
    return null;
  }
}

export function writeCache<T>(key: string, data: T) {
  try {
    const entry: CacheEntry<T> = { savedAt: Date.now(), data };

    sessionStorage.setItem(key, JSON.stringify(entry));
  } catch {
    /* Speicher nicht verfügbar – ignorieren */
  }
}

export async function getJson<T>(
  url: string,
  headers?: Record<string, string>,
  timeoutMs = 8000,
): Promise<T> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal, headers });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return (await response.json()) as T;
  } finally {
    window.clearTimeout(timer);
  }
}
