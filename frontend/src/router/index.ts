import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../components/HomeView.vue";
import ProjectView from "../components/ProjectView.vue";
import AboutView from "../components/AboutView.vue";
import SkillsView from "../components/SkillsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/projects/:slug",
      name: "project",
      component: ProjectView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/skills",
      name: "skills",
      component: SkillsView,
    },
  ],
});

export default router;
