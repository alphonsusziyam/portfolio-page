<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import { RouterLink } from "vue-router";

import { FALLBACK, GREETING, faq } from "../data/faq";
import type { FaqLink } from "../data/faq";
import { findAnswer } from "../utils/faqMatcher";

/* =========================================
   CHAT-ASSISTENT (FAQ)
   Antworten kommen aus src/data/faq.ts und werden im Browser
   gefunden. Es wird nichts an einen Server gesendet.
========================================= */

interface ChatMessage {
  id: number;
  role: "bot" | "user";
  text: string;
  links?: FaqLink[];
}

const open = ref(false);
const draft = ref("");
const typing = ref(false);

const messages = ref<ChatMessage[]>([{ id: 1, role: "bot", text: GREETING }]);
const askedIds = ref<string[]>([]);

const listElement = ref<HTMLElement | null>(null);
const inputElement = ref<HTMLInputElement | null>(null);
const fabElement = ref<HTMLButtonElement | null>(null);

let nextId = 2;
let replyTimer: number | undefined;

/* Noch nicht gestellte Fragen als Vorschläge (max. 6) */

const suggestions = computed(() =>
  faq.filter((entry) => !askedIds.value.includes(entry.id)).slice(0, 6),
);

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isPhone(): boolean {
  return window.matchMedia("(max-width: 700px)").matches;
}

function scrollToEnd() {
  void nextTick(() => {
    if (listElement.value) {
      listElement.value.scrollTop = listElement.value.scrollHeight;
    }
  });
}

function push(role: ChatMessage["role"], text: string, links?: FaqLink[]) {
  messages.value.push({ id: nextId++, role, text, links });

  scrollToEnd();
}

/**
 * Stellt eine Frage. Mit faqId wird direkt die Antwort des Vorschlags
 * gezeigt, sonst sucht findAnswer() die passendste.
 *
 * Später austauschbar: Hier könnte statt findAnswer() ein Aufruf an einen
 * eigenen Server mit Sprachmodell stehen (der API-Schlüssel gehört dorthin,
 * niemals in den Browser).
 */
function ask(question: string, faqId?: string) {
  const text = question.trim();

  if (!text || typing.value) {
    return;
  }

  push("user", text);

  draft.value = "";
  typing.value = true;

  scrollToEnd();

  const entry = faqId
    ? (faq.find((item) => item.id === faqId) ?? null)
    : findAnswer(text, faq);

  replyTimer = window.setTimeout(
    () => {
      typing.value = false;

      if (entry) {
        askedIds.value.push(entry.id);

        push("bot", entry.answer, entry.links);
      } else {
        push("bot", FALLBACK.text, FALLBACK.links);
      }
    },
    prefersReducedMotion() ? 0 : 500,
  );
}

async function toggle() {
  open.value = !open.value;

  if (open.value) {
    await nextTick();

    scrollToEnd();

    /* Tastatur am Handy nicht automatisch öffnen */

    if (!isPhone()) {
      inputElement.value?.focus();
    }
  } else {
    fabElement.value?.focus();
  }
}

function close() {
  if (open.value) {
    void toggle();
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    close();
  }
}

/* Handy: Seite hinter dem Sheet nicht scrollen lassen */

watch(open, (isOpen) => {
  document.body.style.overflow = isOpen && isPhone() ? "hidden" : "";
});

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  window.clearTimeout(replyTimer);

  document.body.style.overflow = "";
});
</script>

<template>
  <div class="chat">
    <!-- Handy: abgedunkelter Hintergrund hinter dem Sheet -->
    <Transition name="chat-fade">
      <div v-if="open" class="chat-backdrop" @click="close"></div>
    </Transition>

    <Transition name="chat">
      <section
        v-if="open"
        id="chat-panel"
        class="chat-panel"
        role="dialog"
        aria-label="Fragen und Antworten"
      >
        <header class="chat-header">
          <div>
            <h2>Fragen &amp; Antworten</h2>

            <p>Automatischer Assistent</p>
          </div>

          <button
            class="chat-close"
            type="button"
            aria-label="Chat schliessen"
            @click="close"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div ref="listElement" class="chat-messages" aria-live="polite">
          <div
            v-for="message in messages"
            :key="message.id"
            class="chat-bubble"
            :class="message.role"
          >
            <p>{{ message.text }}</p>

            <div v-if="message.links?.length" class="chat-links">
              <template v-for="link in message.links" :key="link.label">
                <RouterLink
                  v-if="link.to"
                  :to="link.to"
                  class="chat-link"
                  @click="close"
                >
                  {{ link.label }} →
                </RouterLink>

                <a
                  v-else
                  :href="link.href"
                  class="chat-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ link.label }} ↗
                </a>
              </template>
            </div>
          </div>

          <div
            v-if="typing"
            class="chat-bubble bot chat-typing"
            aria-label="Der Assistent schreibt"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div v-if="suggestions.length" class="chat-suggestions">
          <button
            v-for="item in suggestions"
            :key="item.id"
            type="button"
            class="chat-chip"
            @click="ask(item.question, item.id)"
          >
            {{ item.question }}
          </button>
        </div>

        <form class="chat-form" @submit.prevent="ask(draft)">
          <input
            ref="inputElement"
            v-model="draft"
            type="text"
            placeholder="Frage stellen …"
            aria-label="Deine Frage"
            autocomplete="off"
            maxlength="200"
            enterkeyhint="send"
          />

          <button
            class="chat-send"
            type="submit"
            aria-label="Frage senden"
            :disabled="!draft.trim()"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </form>
      </section>
    </Transition>

    <button
      ref="fabElement"
      class="chat-fab"
      type="button"
      :aria-expanded="open"
      aria-controls="chat-panel"
      :aria-label="open ? 'Chat schliessen' : 'Fragen stellen'"
      @click="toggle"
    >
      <svg v-if="!open" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M21 11.5a8.5 8.5 0 0 1-12.4 7.55L3 20.5l1.45-5.2A8.5 8.5 0 1 1 21 11.5z"
        />
      </svg>

      <svg v-else viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  </div>
</template>
