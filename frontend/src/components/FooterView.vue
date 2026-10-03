<script setup lang="ts">
import { onMounted } from "vue";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

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

      <!-- Rechts -->
      <div class="footer-languages">
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
      </div>

      <!-- Google Translate -->
      <div id="google_translate_element"></div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  width: 100%;
  margin-top: 80px;

  border-top: 1px solid var(--border);
  background: var(--background);
}

.footer-container {
  width: 100%;
  max-width: var(--container);

  min-height: 90px;

  margin: 0 auto;
  padding: 0 var(--padding);

  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

/* Linksbündig */

.footer-name {
  justify-self: start;

  color: var(--text-muted);
  font-size: 11px;
  white-space: nowrap;
}

/* Exakt zentriert */

.footer-tech {
  justify-self: center;

  color: var(--text-muted);
  font-size: 11px;
  white-space: nowrap;
}

/* Rechtsbündig */

.footer-languages {
  justify-self: end;

  display: flex;
  align-items: center;
  gap: 8px;
}

/* Sprachbuttons */

.language-button {
  width: 34px;
  height: 24px;

  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid var(--border);
  border-radius: 4px;

  background: var(--surface);

  cursor: pointer;

  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    background 0.2s ease;
}

.language-button svg {
  display: block;

  width: 22px;
  height: 15px;

  border-radius: 2px;
}

.language-button:hover {
  border-color: var(--accent);
  background: var(--surface-light);
  transform: translateY(-1px);
}

.language-button:active {
  transform: translateY(0);
}

/* Google Translate verstecken */

#google_translate_element {
  display: none;
}

:deep(.goog-te-gadget) {
  display: none !important;
}

:deep(.goog-te-banner-frame) {
  display: none !important;
}

/* Mobile */

@media (max-width: 700px) {
  .site-footer {
    margin-top: 60px;
  }

  .footer-container {
    min-height: auto;

    padding-top: 24px;
    padding-bottom: 24px;

    display: grid;

    grid-template-columns: 1fr;
    gap: 16px;

    text-align: center;
  }

  .footer-name,
  .footer-tech,
  .footer-languages {
    justify-self: center;
  }

  .footer-name {
    order: 1;
  }

  .footer-tech {
    order: 2;
  }

  .footer-languages {
    order: 3;
  }
}
</style>
