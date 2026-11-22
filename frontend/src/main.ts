import { createApp } from "vue";
import "./style.css";
import "./mobile.css";
import App from "./App.vue";
import router from "./router";
import { initTheme } from "./composables/useTheme";
import { initPwaInstall } from "./composables/usePwaInstall";

initTheme();
initPwaInstall();

createApp(App).use(router).mount("#app");
