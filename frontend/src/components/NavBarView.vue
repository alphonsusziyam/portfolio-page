<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import { RouterLink } from "vue-router";

const menuOpen = ref(false);

function closeMenu() {
  menuOpen.value = false;
}

/* Vollbild-Menü: Seite dahinter nicht scrollen lassen */

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? "hidden" : "";
});

/* Escape schliesst das Menü */

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    closeMenu();
  }
}

/* Wird das Fenster breit (Tablet quer, Desktop), Menü zurücksetzen */

const desktopQuery = window.matchMedia("(min-width: 701px)");

function onBreakpointChange(event: MediaQueryListEvent) {
  if (event.matches) {
    closeMenu();
  }
}

window.addEventListener("keydown", onKeydown);
desktopQuery.addEventListener("change", onBreakpointChange);

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  desktopQuery.removeEventListener("change", onBreakpointChange);

  document.body.style.overflow = "";
});
</script>

<template>
  <header class="navbar">
    <div class="nav-container">
      <RouterLink to="/" class="logo" @click="closeMenu">
        <span>&lt;</span>Z.ALPHONSUS<span>/&gt;</span>
      </RouterLink>

      <button
        class="menu-button"
        :aria-label="menuOpen ? 'Menü schliessen' : 'Menü öffnen'"
        :aria-expanded="menuOpen"
        aria-controls="main-menu"
        @click="menuOpen = !menuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav id="main-menu" :class="{ open: menuOpen }">
        <RouterLink to="/about" @click="closeMenu">Über mich</RouterLink>

        <RouterLink to="/skills" @click="closeMenu">Skills</RouterLink>

        <!-- Anker auf der Startseite: kein "aktiv"-Zustand -->
        <RouterLink
          to="/#projects"
          active-class=""
          exact-active-class=""
          @click="closeMenu"
        >
          Projekte
        </RouterLink>

        <RouterLink to="/qualifications" @click="closeMenu">
          Zertifikate
        </RouterLink>

        <RouterLink
          to="/#contact"
          class="nav-contact"
          active-class=""
          exact-active-class=""
          @click="closeMenu"
        >
          Kontakt
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
