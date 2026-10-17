import { computed, shallowRef, ref } from "vue";

/**
 * "App installieren": fängt das Browser-Event beforeinstallprompt ab
 * (Chrome, Edge, Android). Safari/iOS kennt das Event nicht, dort
 * installiert man über Teilen → "Zum Home-Bildschirm".
 */

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const installEvent = shallowRef<BeforeInstallPromptEvent | null>(null);
const installed = ref(false);

let initialised = false;

function isStandalone(): boolean {
  const nav = navigator as Navigator & { standalone?: boolean };

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    nav.standalone === true
  );
}

/** Einmal in main.ts vor createApp() aufrufen – das Event kommt früh. */
export function initPwaInstall() {
  if (initialised) {
    return;
  }

  initialised = true;
  installed.value = isStandalone();

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();

    installEvent.value = event as BeforeInstallPromptEvent;
  });

  window.addEventListener("appinstalled", () => {
    installed.value = true;
    installEvent.value = null;
  });
}

export function usePwaInstall() {
  const canInstall = computed(
    () => installEvent.value !== null && !installed.value,
  );

  async function promptInstall() {
    const event = installEvent.value;

    if (!event) {
      return;
    }

    await event.prompt();
    await event.userChoice;

    /* Das Event ist nur einmal verwendbar */
    installEvent.value = null;
  }

  return { canInstall, promptInstall };
}
