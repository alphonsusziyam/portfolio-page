<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

import { projects } from "../data/projects";

const route = useRoute();

const project = computed(() => {
  return projects[route.params.id as string];
});
</script>

<template>
  <main v-if="project" class="project-page">
    <!-- ========================================
         HERO
    ========================================= -->

    <section class="project-hero">
      <div class="project-container">
        <RouterLink to="/#projects" class="back-link">
          <span>←</span>
          Zurück zu Projekten
        </RouterLink>

        <div class="project-hero-content">
          <p class="eyebrow">
            {{ project.type }}
          </p>

          <h1>
            {{ project.title }}
          </h1>

          <p class="project-subtitle">
            {{ project.subtitle }}
          </p>

          <p class="project-intro">
            {{ project.description }}
          </p>

          <div class="project-tags">
            <span v-for="technology in project.technologies" :key="technology">
              {{ technology }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================
         SCREENSHOTS
    ========================================= -->

    <section class="screenshots-section">
      <div class="project-container">
        <div class="section-heading">
          <p class="eyebrow">EINBLICKE</p>

          <h2>Die Anwendung im Einsatz.</h2>
        </div>

        <div class="screenshots">
          <article
            v-for="(screenshot, index) in project.screenshots"
            :key="screenshot.title"
            class="screenshot-item"
          >
            <div class="screenshot-image">
              <img
                :src="screenshot.image"
                :alt="`${project.title} – ${screenshot.title}`"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div class="screenshot-info">
              <span class="screenshot-number">
                {{ String(index + 1).padStart(2, "0") }}
              </span>

              <div>
                <h3>
                  {{ screenshot.title }}
                </h3>

                <p>
                  {{ screenshot.description }}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ========================================
         PROJECT INFORMATION
    ========================================= -->

    <section class="project-information">
      <div class="project-container">
        <div class="information-grid">
          <!-- About -->

          <div class="information-main">
            <div class="project-section">
              <p class="eyebrow">01 / ÜBER DAS PROJEKT</p>

              <h2>Was ist {{ project.title }}?</h2>

              <p>
                {{ project.description }}
              </p>
            </div>

            <!-- Goal -->

            <div class="project-section">
              <p class="eyebrow">02 / PROBLEM & ZIEL</p>

              <h2>Die Idee dahinter.</h2>

              <p>
                {{ project.goal }}
              </p>
            </div>

            <!-- Role -->

            <div class="project-section">
              <p class="eyebrow">03 / MEINE AUFGABE</p>

              <h2>Mein Beitrag zum Projekt.</h2>

              <p>
                {{ project.role }}
              </p>
            </div>
          </div>

          <!-- Sidebar -->

          <aside class="information-sidebar">
            <div class="sidebar-block">
              <p class="sidebar-label">TECHNOLOGIEN</p>

              <div class="technology-list">
                <span
                  v-for="technology in project.technologies"
                  :key="technology"
                >
                  {{ technology }}
                </span>
              </div>
            </div>

            <div class="sidebar-block">
              <p class="sidebar-label">PROJEKT</p>

              <p class="sidebar-text">Webapplikation / PWA</p>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- ========================================
         FEATURES
    ========================================= -->

    <section class="features-section">
      <div class="project-container">
        <div class="section-heading">
          <p class="eyebrow">FUNKTIONEN</p>

          <h2>Was die Anwendung kann.</h2>
        </div>

        <div class="features-grid">
          <div
            v-for="(feature, index) in project.features"
            :key="feature"
            class="feature-card"
          >
            <span class="feature-number">
              {{ String(index + 1).padStart(2, "0") }}
            </span>

            <p>
              {{ feature }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================
         CHALLENGES
    ========================================= -->

    <section class="challenges-section">
      <div class="project-container">
        <div class="challenge-grid">
          <div>
            <p class="eyebrow">HERAUSFORDERUNGEN</p>

            <h2>Was technisch anspruchsvoll war.</h2>
          </div>

          <div class="challenge-list">
            <div
              v-for="(challenge, index) in project.challenges"
              :key="challenge"
              class="challenge-item"
            >
              <span>
                {{ String(index + 1).padStart(2, "0") }}
              </span>

              <p>
                {{ challenge }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================
         LINKS
    ========================================= -->

    <section class="project-links-section">
      <div class="project-container">
        <div class="project-links">
          <div>
            <p class="eyebrow">PROJEKT</p>

            <h2>Mehr entdecken.</h2>
          </div>

          <div class="links">
            <a
              v-if="project.demo"
              :href="project.demo"
              target="_blank"
              rel="noopener noreferrer"
              class="project-button primary"
            >
              Live Demo
              <span>↗</span>
            </a>

            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="project-button secondary"
            >
              GitLab
              <span>↗</span>
            </a>
            <a
              v-if="project.documentation"
              :href="project.documentation"
              target="_blank"
              rel="noopener noreferrer"
              class="project-button secondary"
            >
              Dokumentation
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================
         NEXT PROJECT
    ========================================= -->

    <section class="next-project">
      <div class="project-container">
        <RouterLink to="/#projects" class="next-project-link">
          <span> Zurück zu allen Projekten </span>

          <strong> Projekte → </strong>
        </RouterLink>
      </div>
    </section>
  </main>

  <!-- ========================================
       PROJECT NOT FOUND
  ======================================== -->

  <main v-else class="project-not-found">
    <p class="eyebrow">404</p>

    <h1>Projekt nicht gefunden.</h1>

    <RouterLink to="/"> Zurück zur Startseite </RouterLink>
  </main>
</template>
