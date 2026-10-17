<script setup lang="ts">
import NavBarView from "./components/NavBarView.vue";
import { RouterView } from "vue-router";
import FooterView from "./components/FooterView.vue";
import PwaToast from "./components/PwaToast.vue";
</script>

<template>
  <NavBarView />
  <RouterView />
  <FooterView />
  <PwaToast />
</template>
