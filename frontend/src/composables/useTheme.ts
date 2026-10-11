import { readonly, ref } from "vue";

export type Theme = "dark" | "light";

const STORAGE_KEY = "theme";

const theme = ref<Theme>("dark");

let initialised = false;

/* -------------------------------------------------------
   Hilfsfunktionen
------------------------------------------------------- */

function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);

    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function storeTheme(value: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* Speicher nicht verfügbar (z. B. privater Modus) – ignorieren */
  }
}

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* Browserleiste (Smartphone) passend zur Seitenfarbe einfärben */

function updateThemeColorMeta() {
  let meta = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );

  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }

  meta.content = getComputedStyle(document.documentElement)
    .getPropertyValue("--background")
    .trim();
}

function applyTheme(next: Theme, animate: boolean) {
  const root = document.documentElement;

  if (animate && !prefersReducedMotion()) {
    root.classList.add("theme-transition");

    window.setTimeout(() => root.classList.remove("theme-transition"), 400);
  }

  theme.value = next;
  root.dataset.theme = next;

  updateThemeColorMeta();
}

/* -------------------------------------------------------
   Öffentliche API
------------------------------------------------------- */

/**
 * Einmal in main.ts vor createApp() aufrufen.
 * Reihenfolge: gespeicherte Auswahl → Systemeinstellung → Dark.
 */
export function initTheme() {
  if (initialised) {
    return;
  }

  initialised = true;

  applyTheme(readStoredTheme() ?? systemTheme(), false);

  /* Folgt dem System, solange die Person nie selbst umgeschaltet hat */

  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (event) => {
      if (!readStoredTheme()) {
        applyTheme(event.matches ? "light" : "dark", true);
      }
    });
}

export function useTheme() {
  function setTheme(next: Theme) {
    storeTheme(next);
    applyTheme(next, true);
  }

  function toggleTheme() {
    setTheme(theme.value === "dark" ? "light" : "dark");
  }

  return {
    theme: readonly(theme),
    setTheme,
    toggleTheme,
  };
}
