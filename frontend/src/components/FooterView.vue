<script setup lang="ts">
import { onMounted } from "vue";
import { useTheme } from "../composables/useTheme";
import { usePwaInstall } from "../composables/usePwaInstall";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const { theme, toggleTheme } = useTheme();
const { canInstall, promptInstall } = usePwaInstall();

const changeLanguage = (language: string) => {
  const select = document.querySelector(
    ".goog-te-combo",
  ) as HTMLSelectElement | null;

  if (!select) {
    console.warn("Google Translate ist noch nicht geladen.");
    return;
  }

  select.value = language;
  select.dispatchEvent(new Event("change"));
};

onMounted(() => {
  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "de",
        includedLanguages: "de,en,fr",
        autoDisplay: false,
      },
      "google_translate_element",
    );
  };

  if (
    document.querySelector(
      'script[src*="translate.google.com/translate_a/element.js"]',
    )
  ) {
    return;
  }

  const script = document.createElement("script");

  script.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

  script.async = true;

  document.head.appendChild(script);
});
</script>

<template>
  <footer class="site-footer">
    <div class="footer-container">
      <!-- Links -->
      <div class="footer-name">© 2026 Ziyam Alphonsus</div>

      <!-- Exakt Mitte -->
      <div class="footer-tech">Built with Vue & TypeScript</div>

      <!-- Rechts: Sprache & Design -->
      <div class="footer-controls">
        <!-- App installieren (nur wenn der Browser es anbietet) -->
        <template v-if="canInstall">
          <button class="install-button" type="button" @click="promptInstall">
            App installieren
          </button>

          <span class="footer-divider" aria-hidden="true"></span>
        </template>

        <!-- Deutschland -->
        <button
          class="language-button"
          title="Deutsch"
          aria-label="Deutsch"
          @click="changeLanguage('de')"
        >
          <svg viewBox="0 0 24 16" aria-hidden="true">
            <rect width="24" height="5.33" fill="#000" />
            <rect y="5.33" width="24" height="5.34" fill="#DD0000" />
            <rect y="10.67" width="24" height="5.33" fill="#FFCE00" />
          </svg>
        </button>

        <!-- Grossbritannien -->
        <button
          class="language-button"
          title="English"
          aria-label="English"
          @click="changeLanguage('en')"
        >
          <svg viewBox="0 0 24 16" aria-hidden="true">
            <rect width="24" height="16" fill="#012169" />

            <path d="M0 0L24 16M24 0L0 16" stroke="#fff" stroke-width="4" />

            <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" stroke-width="2" />

            <path d="M12 0V16M0 8H24" stroke="#fff" stroke-width="6" />

            <path d="M12 0V16M0 8H24" stroke="#C8102E" stroke-width="3" />
          </svg>
        </button>

        <!-- Frankreich -->
        <button
          class="language-button"
          title="Français"
          aria-label="Français"
          @click="changeLanguage('fr')"
        >
          <svg viewBox="0 0 24 16" aria-hidden="true">
            <rect width="8" height="16" fill="#0055A4" />
            <rect x="8" width="8" height="16" fill="#fff" />
            <rect x="16" width="8" height="16" fill="#EF4135" />
          </svg>
        </button>

        <span class="footer-divider" aria-hidden="true"></span>

        <!-- Hell- / Dunkelmodus -->
        <button
          class="theme-toggle"
          type="button"
          :title="
            theme === 'dark'
              ? 'Zum hellen Modus wechseln'
              : 'Zum dunklen Modus wechseln'
          "
          :aria-label="
            theme === 'dark'
              ? 'Zum hellen Modus wechseln'
              : 'Zum dunklen Modus wechseln'
          "
          @click="toggleTheme"
        >
          <!-- Sonne (im Dunkelmodus sichtbar) -->
          <svg v-if="theme === 'dark'" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            />
          </svg>

          <!-- Mond (im Hellmodus sichtbar) -->
          <svg v-else viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
      </div>

      <!-- Google Translate -->
      <div id="google_translate_element"></div>
    </div>
  </footer>
</template>
