<script setup lang="ts">
import NavBarView from "./components/NavBarView.vue";
import { RouterView } from "vue-router";
import FooterView from "./components/FooterView.vue";
import PwaToast from "./components/PwaToast.vue";
import ChatWidget from "./components/ChatWidget.vue";
</script>

<template>
  <NavBarView />
  <RouterView />
  <FooterView />
  <ChatWidget />
  <PwaToast />
</template>
