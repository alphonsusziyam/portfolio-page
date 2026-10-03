import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../components/HomeView.vue";
import AboutView from "../components/AboutView.vue";
import SkillsView from "../components/SkillsView.vue";
import ProjectView from "../components/ProjectView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
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
    {
      path: "/projects/:id",
      name: "project",
      component: ProjectView,
    },
  ],
});

export default router;
