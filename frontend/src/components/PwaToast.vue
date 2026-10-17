<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRegisterSW } from "virtual:pwa-register/vue";

const UPDATE_CHECK_MS = 60 * 60 * 1000; // stündlich nach neuer Version suchen

/* Service Worker registrieren (vite-plugin-pwa) */

const { needRefresh, offlineReady, updateServiceWorker } = useRegisterSW({
  onRegisteredSW(_url, registration) {
    if (registration) {
      window.setInterval(() => {
        void registration.update();
      }, UPDATE_CHECK_MS);
    }
  },
});

/* Online-Status */

const online = ref(true);
const offlineDismissed = ref(false);

function handleOnline() {
  online.value = true;
  offlineDismissed.value = false;
}

function handleOffline() {
  online.value = false;
}

onMounted(() => {
  online.value = navigator.onLine;

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);
});

onBeforeUnmount(() => {
  window.removeEventListener("online", handleOnline);
  window.removeEventListener("offline", handleOffline);
});

/* Anzeige */

type ToastState = "update" | "offline" | "ready";

const state = computed<ToastState | null>(() => {
  if (needRefresh.value) return "update";
  if (!online.value && !offlineDismissed.value) return "offline";
  if (offlineReady.value) return "ready";

  return null;
});

const messages: Record<ToastState, { title: string; text: string }> = {
  update: {
    title: "Neue Version verfügbar",
    text: "Lade neu, um die neuesten Änderungen zu sehen.",
  },
  offline: {
    title: "Du bist offline",
    text: "Bereits besuchte Seiten sind weiterhin verfügbar.",
  },
  ready: {
    title: "Offline verfügbar",
    text: "Die Seite funktioniert jetzt auch ohne Internet.",
  },
};

function close() {
  if (state.value === "offline") {
    offlineDismissed.value = true;
  }

  needRefresh.value = false;
  offlineReady.value = false;
}
</script>

<template>
  <aside v-if="state" class="pwa-toast" role="status" aria-live="polite">
    <p class="pwa-toast-text">
      <strong>{{ messages[state].title }}</strong>
      <span>{{ messages[state].text }}</span>
    </p>

    <div class="pwa-toast-actions">
      <button
        v-if="state === 'update'"
        type="button"
        class="button primary"
        @click="updateServiceWorker(true)"
      >
        Neu laden
      </button>

      <button type="button" class="button secondary" @click="close">
        {{ state === "update" ? "Später" : "OK" }}
      </button>
    </div>
  </aside>
</template>
