<script setup lang="ts">
import { ref } from "vue";

const menuOpen = ref(false);

function closeMenu() {
  menuOpen.value = false;
}
</script>

<template>
  <header class="navbar">
    <div class="nav-container">
      <a href="/" class="logo" @click="closeMenu">
        <span>&lt;</span>Z.ALPHONSUS<span>/&gt;</span>
      </a>

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
        <a href="/about" @click="closeMenu"> Über mich </a>

        <a href="/skills" @click="closeMenu"> Skills </a>

        <a href="/#projects" @click="closeMenu"> Projekte </a>

        <a href="#contact" class="nav-contact" @click="closeMenu"> Kontakt </a>
      </nav>
    </div>
  </header>
</template>
