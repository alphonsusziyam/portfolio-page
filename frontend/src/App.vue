<script setup lang="ts">
import NavBarView from "./components/NavBarView.vue";
import { RouterView } from "vue-router";
import FooterView from "./components/FooterView.vue";
</script>

<template>
  <NavBarView />
  <RouterView />
  <FooterView />
</template>
