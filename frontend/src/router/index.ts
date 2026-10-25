import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../components/HomeView.vue";
import AboutView from "../components/AboutView.vue";
import SkillsView from "../components/SkillsView.vue";
import ProjectView from "../components/ProjectView.vue";
import QualificationsView from "../components/QualificationsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }

    return { top: 0 };
  },

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
    {
      path: "/qualifications",
      name: "qualifications",
      component: QualificationsView,
    },
  ],
});

export default router;
