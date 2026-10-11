<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const menuOpen = ref(false);

function closeMenu() {
  menuOpen.value = false;
}
</script>

<template>
  <header class="navbar">
    <div class="nav-container">
      <RouterLink to="/" class="logo" @click="closeMenu">
        <span>&lt;</span>Z.ALPHONSUS<span>/&gt;</span>
      </RouterLink>

      <button
        class="menu-button"
        aria-label="Menü öffnen"
        @click="menuOpen = !menuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav :class="{ open: menuOpen }">
        <RouterLink to="/about" @click="closeMenu"> Über mich </RouterLink>

        <RouterLink to="/skills" @click="closeMenu"> Skills </RouterLink>

        <RouterLink to="/#projects" @click="closeMenu"> Projekte </RouterLink>

        <RouterLink to="/#contact" class="nav-contact" @click="closeMenu">
          Kontakt
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
