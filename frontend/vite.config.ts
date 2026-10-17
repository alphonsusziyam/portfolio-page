import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

/** GitHub Pages: https://alphonsusziyam.github.io/portfolio-page/ */
const BASE = "/portfolio-page/";

const DAY = 60 * 60 * 24;

export default defineConfig({
  base: BASE,

  plugins: [
    vue(),

    VitePWA({
      /* "prompt": neue Version wird erst nach Klick auf "Neu laden" aktiv (siehe PwaToast.vue) */
      registerType: "prompt",

      includeAssets: [
        "favicon.svg",
        "apple-touch-icon.png",
        "pwa-192x192.png",
        "pwa-512x512.png",
        "pwa-maskable-512x512.png",
      ],

      manifest: {
        id: BASE,
        name: "Ziyam Alphonsus – Portfolio",
        short_name: "Z.Alphonsus",
        description:
          "Portfolio von Ziyam Alphonsus: Informatiker EFZ, Softwareentwicklung und Systemtechnik.",
        lang: "de-CH",

        start_url: BASE,
        scope: BASE,
        display: "standalone",

        theme_color: "#0a0a0a",
        background_color: "#0a0a0a",

        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
          {
            src: "pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],

        /* Long-Press auf das App-Icon (Android / Desktop) */
        shortcuts: [
          { name: "Über mich", url: `${BASE}about` },
          { name: "Skills", url: `${BASE}skills` },
          { name: "Projekte", url: `${BASE}#projects` },
        ],
      },

      workbox: {
        /* App-Shell vorab cachen. Grosse Bilder (Screenshots) bewusst NICHT,
           sie werden erst beim Ansehen gecacht (siehe "images" unten). */
        globPatterns: ["**/*.{js,css,html,svg,ico,woff2}"],

        cleanupOutdatedCaches: true,
        clientsClaim: true,

        /* Vue-Router-Seiten (/skills, /about …) funktionieren auch offline */
        navigateFallback: "index.html",

        runtimeCaching: [
          {
            /* Eigene Bilder: nach dem ersten Laden offline verfügbar */
            urlPattern: ({ request, sameOrigin }) =>
              sameOrigin && request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: { maxEntries: 60, maxAgeSeconds: 30 * DAY },
              cacheableResponse: { statuses: [200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts-styles",
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-files",
              expiration: { maxEntries: 20, maxAgeSeconds: 365 * DAY },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            /* Wetter: offline nur eine Stunde lang als Notlösung */
            urlPattern: /^https:\/\/api\.open-meteo\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-weather",
              networkTimeoutSeconds: 4,
              expiration: { maxEntries: 5, maxAgeSeconds: 60 * 60 },
              cacheableResponse: { statuses: [200] },
            },
          },
          {
            urlPattern: /^https:\/\/api\.github\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-github",
              networkTimeoutSeconds: 4,
              expiration: { maxEntries: 10, maxAgeSeconds: DAY },
              cacheableResponse: { statuses: [200] },
            },
          },
        ],
      },

      /* Im Dev-Server kein Service Worker (sonst verwirrendes Caching beim Entwickeln) */
      devOptions: { enabled: false },
    }),
  ],
});
