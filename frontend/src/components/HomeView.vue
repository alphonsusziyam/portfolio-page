<script setup lang="ts">
import { RouterLink } from "vue-router";

import { projectList } from "../data/projects";
import { vReveal } from "../directives/reveal";

/* =========================================
   DATEN (alles aus src/data/projects.ts)
========================================= */

const IT_START = new Date(2020, 7, 1); // August 2020

const portrait = new URL("../assets/ziyam.jpg", import.meta.url).href;

/* Alle verwendeten Technologien (ohne Doppelte) für den Ticker */

const technologies = [
  "HTML",
  "CSS",
  "PHP",
  "JavaScript",
  "MySQL",
  "Vue",
  "TypeScript",
  "Strapi",
  "Python",
  "Git",
  "PowerShell",
  "Bash",
  "Windows",
  "Ubuntu",
  "MacOS / iOS",
];

const featureCount = projectList.reduce(
  (sum, project) => sum + project.features.length,
  0,
);

const yearsInIt = Math.floor(
  (Date.now() - IT_START.getTime()) / (365.25 * 24 * 3600 * 1000),
);

const stats = [
  { label: "Projekte", value: projectList.length },
  { label: "Funktionen umgesetzt", value: featureCount },
  { label: "Technologien", value: technologies.length },
  { label: "Jahre in der IT", value: yearsInIt },
];

/* Fehlt ein Bild, verschwindet es und die Karte zeigt nur den Verlauf */

function hideBrokenImage(event: Event) {
  (event.target as HTMLImageElement).style.display = "none";
}
</script>

<template>
  <div class="page">
    <main>
      <!-- Hero -->
      <section class="hero">
        <div class="container hero-grid">
          <div class="hero-copy">
            <p class="hero-label">INFORMATIKER EFZ · BETRIEBSINFORMATIK</p>

            <h1>
              Software&shy;entwicklung<br />
              <span>& Systemtechnik</span>
            </h1>

            <p class="hero-text">
              Ich entwickle digitale Lösungen und beschäftige mich gleichzeitig
              mit Systemadministration, IT-Infrastrukturen und der technischen
              Umsetzung von IT-Projekten.
            </p>

            <div class="hero-buttons">
              <RouterLink to="/#projects" class="button primary">
                Projekte ansehen
              </RouterLink>

              <RouterLink to="/about" class="button secondary">
                Über mich
              </RouterLink>
            </div>

            <!-- Zahlen aus den Projekten -->
            <dl class="hero-stats" aria-label="Auf einen Blick">
              <div v-for="stat in stats" :key="stat.label">
                <dt>{{ stat.label }}</dt>
                <dd>{{ stat.value }}</dd>
              </div>
            </dl>
          </div>

          <!-- Porträt (Über mich) -->
          <div class="hero-portrait">
            <div class="portrait-glow" aria-hidden="true"></div>

            <figure class="portrait-card">
              <img
                :src="portrait"
                alt="Portrait von Ziyam Alphonsus"
                width="736"
                height="736"
                decoding="async"
              />

              <figcaption>
                <p class="portrait-name">Ziyam Alphonsus</p>

                <p class="portrait-role">
                  Informatiker mit vielseitigem IT-Fokus
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <!-- Technologien (laufendes Band) -->
      <section class="ticker" aria-label="Verwendete Technologien">
        <div class="ticker-track">
          <ul class="ticker-group">
            <li v-for="technology in technologies" :key="technology">
              {{ technology }}
            </li>
          </ul>

          <ul class="ticker-group" aria-hidden="true">
            <li v-for="technology in technologies" :key="`copy-${technology}`">
              {{ technology }}
            </li>
          </ul>
        </div>
      </section>

      <!-- Projects -->
      <section id="projects" class="section projects">
        <div v-reveal class="section-heading">
          <p class="eyebrow">PROJEKTE</p>

          <h2>Projekte, an denen ich gearbeitet habe.</h2>
        </div>

        <div v-reveal class="projects-grid">
          <article
            v-for="(project, index) in projectList"
            :key="project.id"
            class="project-card"
          >
            <div class="project-image" :class="`project-${project.id}`">
              <span>{{ String(index + 1).padStart(2, "0") }}</span>

              <img
                :src="project.thumbnail"
                :alt="`Vorschau von ${project.title}`"
                loading="lazy"
                decoding="async"
                @error="hideBrokenImage"
              />
            </div>

            <div class="project-content">
              <p class="project-type">{{ project.type }}</p>

              <h3>
                <!-- Der ganze Kartenbereich ist über diesen Link klickbar -->
                <RouterLink
                  :to="`/projects/${project.id}`"
                  class="project-card-link"
                >
                  {{ project.title }}
                </RouterLink>
              </h3>

              <p>{{ project.summary }}</p>

              <div class="tags">
                <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
              </div>

              <div class="project-footer">
                <span class="project-link">Mehr Informationen →</span>

                <a
                  v-if="project.demo"
                  :href="project.demo"
                  class="project-demo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo ↗
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- WHAT I DO -->
      <section class="what-i-do">
        <div class="container">
          <div v-reveal class="section-heading">
            <p class="section-label">WAS ICH MACHE</p>
            <h2>Von der Idee bis zur Umsetzung.</h2>
          </div>

          <div v-reveal class="focus-grid">
            <div class="focus-item">
              <span class="focus-number">01</span>

              <div>
                <h3>Softwareentwicklung</h3>

                <p>
                  Ich entwickle Webanwendungen und digitale Lösungen und
                  beschäftige mich dabei mit Programmierung, Datenbanken und der
                  technischen Umsetzung.
                </p>

                <div class="focus-tags">
                  <span>Webentwicklung</span>
                  <span>Programmierung</span>
                  <span>SQL</span>
                </div>
              </div>
            </div>

            <div class="focus-item">
              <span class="focus-number">02</span>

              <div>
                <h3>Systemtechnik</h3>

                <p>
                  Durch meine Ausbildung in Betriebsinformatik kenne ich auch
                  die technische Seite hinter Anwendungen: Systemadministration,
                  IT-Infrastrukturen und Problembehebung.
                </p>

                <div class="focus-tags">
                  <span>Systemadministration</span>
                  <span>IT-Infrastruktur</span>
                  <span>Support</span>
                </div>
              </div>
            </div>
          </div>

          <RouterLink to="/skills" class="project-link">
            Alle Skills ansehen →
          </RouterLink>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" class="section contact">
        <div v-reveal class="contact-box">
          <p class="eyebrow">KONTAKT</p>

          <h2>
            Lass uns etwas
            <span>entwickeln.</span>
          </h2>

          <p>
            Du möchtest mehr über mich oder meine Projekte erfahren? Ich freue
            mich auf deine Nachricht.
          </p>

          <a href="mailto:ziyam2@icloud.com" class="button primary">
            E-Mail schreiben
          </a>
        </div>
      </section>
    </main>
  </div>
</template>
