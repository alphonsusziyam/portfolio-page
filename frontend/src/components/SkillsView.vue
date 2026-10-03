<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";

import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

/* =========================================
   CHART.JS
========================================= */

Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

/* =========================================
   SKILLS
========================================= */

const itSkills = [
  { name: "HTML / CSS", level: 90 },
  { name: "JavaScript / TypeScript", level: 85 },
  { name: "Vue.js", level: 80 },
  { name: "SQL", level: 80 },
  { name: "Git", level: 80 },
  { name: "PHP", level: 75 },
  { name: "Systemtechnik", level: 75 },
  { name: "Python", level: 65 },
];

const languages = [
  { name: "Deutsch", level: 95 },
  { name: "Englisch", level: 85 },
  { name: "Französisch", level: 70 },
  { name: "Tamil", level: 100 },
];

/* =========================================
   RADAR CHART
========================================= */

const radarChart = ref<HTMLCanvasElement | null>(null);

let radarChartInstance: Chart | null = null;

/* =========================================
   CREATE CHART
========================================= */

onMounted(() => {
  if (!radarChart.value) {
    return;
  }

  radarChartInstance = new Chart(radarChart.value, {
    type: "radar",

    data: {
      labels: [
        "Webentwicklung",
        "Programmierung",
        "DevOps",
        "Datenbanken",
        "Systemtechnik",
        "IT-Security",
        "Netzwerk",
      ],

      datasets: [
        {
          label: "Skill-Profil",

          data: [90, 85, 75, 85, 75, 80, 60],

          backgroundColor: "rgba(0, 229, 160, 0.12)",
          borderColor: "#00e5a0",

          borderWidth: 2,

          pointBackgroundColor: "#00e5a0",
          pointBorderColor: "#101010",
          pointBorderWidth: 2,

          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: true,

      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          callbacks: {
            label: (context) => {
              return ` ${context.raw}%`;
            },
          },
        },
      },

      scales: {
        r: {
          min: 0,
          max: 100,

          beginAtZero: true,

          ticks: {
            display: false,
            stepSize: 20,
          },

          grid: {
            color: "#292929",
            lineWidth: 1,
          },

          angleLines: {
            color: "#292929",
            lineWidth: 1,
          },

          pointLabels: {
            color: "#999999",

            font: {
              family: "Inter",
              size: 12,
              weight: 500,
            },

            padding: 12,
          },
        },
      },
    },
  });
});

/* =========================================
   CLEANUP
========================================= */

onBeforeUnmount(() => {
  radarChartInstance?.destroy();
});
</script>

<template>
  <main class="page">
    <!-- =====================================
         HERO
    ====================================== -->

    <section class="page-hero">
      <div class="container">
        <p class="section-label">03 / SKILLS</p>

        <h1>
          Meine
          <span>Kompetenzen.</span>
        </h1>

        <p class="page-intro">
          Ein Überblick über meine technischen Fähigkeiten und Sprachkenntnisse.
        </p>
      </div>
    </section>

    <!-- =====================================
         SKILLS
    ====================================== -->

    <section class="skills-page">
      <!-- ===================================
           IT SKILLS
      ==================================== -->

      <div class="skills-section">
        <div class="container">
          <div class="skills-header">
            <span class="section-number"> 01 </span>

            <div>
              <p class="section-label">TECHNOLOGIEN</p>

              <h2>IT-Kenntnisse</h2>
            </div>
          </div>

          <div class="skills-list">
            <div v-for="skill in itSkills" :key="skill.name" class="skill-item">
              <div class="skill-top">
                <span class="skill-name">
                  {{ skill.name }}
                </span>

                <span class="skill-level"> {{ skill.level }}% </span>
              </div>

              <div class="skill-bar">
                <div
                  class="skill-progress"
                  :style="{
                    width: `${skill.level}%`,
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===================================
           RADAR CHART
      ==================================== -->

      <div class="skills-section radar-section">
        <div class="container">
          <div class="skills-header">
            <span class="section-number"> 02 </span>

            <div>
              <p class="section-label">PROFIL</p>

              <h2>Mein Skill-Profil</h2>
            </div>
          </div>

          <div class="radar-wrapper">
            <div class="radar-chart">
              <canvas ref="radarChart"></canvas>
            </div>

            <div class="radar-info">
              <div
                v-for="skill in [
                  { name: 'Webentwicklung', level: 90 },
                  { name: 'Programmierung', level: 85 },
                  { name: 'DevOps', level: 75 },
                  { name: 'Datenbanken', level: 85 },
                  { name: 'Systemtechnik', level: 75 },
                  { name: 'IT-Security', level: 80 },
                  { name: 'Netzwerk', level: 60 },
                ]"
                :key="skill.name"
                class="radar-info-item"
              >
                <div class="radar-info-top">
                  <span>
                    {{ skill.name }}
                  </span>

                  <strong> {{ skill.level }}% </strong>
                </div>

                <div class="mini-bar">
                  <div
                    class="mini-progress"
                    :style="{
                      width: `${skill.level}%`,
                    }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <p class="radar-description">
            Das Profil zeigt meine Kenntnisse auf übergeordneter Ebene und
            ergänzt die detaillierte Übersicht der einzelnen Technologien.
          </p>
        </div>
      </div>

      <!-- ===================================
           LANGUAGES
      ==================================== -->

      <div class="skills-section languages-section">
        <div class="container">
          <div class="skills-header">
            <span class="section-number"> 03 </span>

            <div>
              <p class="section-label">SPRACHEN</p>

              <h2>Sprachkenntnisse</h2>
            </div>
          </div>

          <div class="skills-list">
            <div
              v-for="language in languages"
              :key="language.name"
              class="skill-item"
            >
              <div class="skill-top">
                <span class="skill-name">
                  {{ language.name }}
                </span>

                <span class="skill-level"> {{ language.level }}% </span>
              </div>

              <div class="skill-bar">
                <div
                  class="skill-progress"
                  :style="{
                    width: `${language.level}%`,
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===================================
           NOTE
      ==================================== -->

      <div class="container">
        <div class="skill-note">
          <span class="note-icon"> i </span>

          <p>
            Die dargestellten Werte dienen als visuelle Einschätzung meiner
            Kenntnisse und stellen keine formale Zertifizierung oder
            standardisierte Bewertung dar.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* =========================================
   SKILLS PAGE
========================================= */

.skills-page {
  padding-bottom: 100px;
}

.skills-section {
  padding: 80px 0;

  border-top: 1px solid #272727;
}

.languages-section {
  margin-top: 20px;
}

/* =========================================
   SECTION HEADER
========================================= */

.skills-header {
  display: flex;
  align-items: flex-start;

  gap: 30px;

  margin-bottom: 55px;
}

.section-number {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;

  flex-shrink: 0;

  border: 1px solid #333;
  border-radius: 50%;

  color: #00e5a0;

  font-size: 13px;
  font-weight: 600;
}

.skills-header .section-label {
  margin-bottom: 8px;
}

.skills-header h2 {
  margin: 0;

  font-size: clamp(28px, 4vw, 42px);

  font-weight: 600;

  letter-spacing: -1px;
}

/* =========================================
   SKILL LIST
========================================= */

.skills-list {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 42px 70px;

  max-width: 1100px;
}

.skill-item {
  width: 100%;

  transition: transform 0.2s ease;
}

/* =========================================
   SKILL TEXT
========================================= */

.skill-top {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 12px;
}

.skill-name {
  color: #eeeeee;

  font-size: 15px;
  font-weight: 500;
}

.skill-level {
  color: #888888;

  font-size: 13px;

  font-variant-numeric: tabular-nums;
}

/* =========================================
   SKILL BAR
========================================= */

.skill-bar {
  position: relative;

  width: 100%;
  height: 5px;

  overflow: hidden;

  background: #252525;

  border-radius: 10px;
}

.skill-progress {
  height: 100%;

  background: #00e5a0;

  border-radius: 10px;

  transform-origin: left;

  animation: skillLoad 1s ease-out both;
}

/* =========================================
   RADAR
========================================= */

.radar-section {
  padding-top: 70px;
}

.radar-wrapper {
  display: grid;

  grid-template-columns:
    minmax(350px, 1fr)
    minmax(280px, 0.7fr);

  align-items: center;

  gap: 70px;

  max-width: 1100px;
}

.radar-chart {
  width: 100%;
  max-width: 520px;

  margin: 0 auto;
}

.radar-chart canvas {
  display: block;

  width: 100% !important;
  height: auto !important;
}

/* =========================================
   RADAR INFO
========================================= */

.radar-info {
  display: flex;
  flex-direction: column;

  gap: 24px;

  width: 100%;
}

.radar-info-item {
  width: 100%;
}

.radar-info-top {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 9px;
}

.radar-info-item span {
  color: #eeeeee;

  font-size: 14px;
}

.radar-info-item strong {
  color: #888888;

  font-size: 13px;

  font-weight: 500;
}

/* =========================================
   MINI BARS
========================================= */

.mini-bar {
  width: 100%;
  height: 3px;

  overflow: hidden;

  background: #252525;

  border-radius: 10px;
}

.mini-progress {
  height: 100%;

  background: #00e5a0;

  border-radius: 10px;

  animation: skillLoad 1s ease-out both;
}

/* =========================================
   RADAR DESCRIPTION
========================================= */

.radar-description {
  max-width: 700px;

  margin: 35px 0 0;

  color: #777777;

  font-size: 13px;

  line-height: 1.6;
}

/* =========================================
   NOTE
========================================= */

.skill-note {
  display: flex;
  align-items: flex-start;

  gap: 16px;

  max-width: 900px;

  margin-top: 30px;

  padding: 22px 24px;

  border: 1px solid #292929;

  border-radius: 8px;

  background: #151515;
}

.note-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 22px;
  height: 22px;

  flex-shrink: 0;

  border: 1px solid #555;

  border-radius: 50%;

  color: #999999;

  font-size: 12px;
  font-weight: 600;
}

.skill-note p {
  margin: 0;

  color: #777777;

  font-size: 13px;

  line-height: 1.6;
}

/* =========================================
   ANIMATIONS
========================================= */

@keyframes skillLoad {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}

/* =========================================
   HOVER
========================================= */

@media (hover: hover) and (pointer: fine) {
  .skill-item:hover {
    transform: translateX(4px);
  }

  .skill-item:hover .skill-progress,
  .radar-info-item:hover .mini-progress {
    filter: brightness(1.15);
  }
}

/* =========================================
   TABLET
========================================= */

@media (max-width: 850px) {
  .radar-wrapper {
    grid-template-columns: 1fr;

    gap: 50px;
  }

  .radar-chart {
    max-width: 500px;
  }

  .radar-info {
    max-width: 600px;

    margin: 0 auto;
  }

  .skills-list {
    grid-template-columns: 1fr;

    gap: 30px;
  }
}

/* =========================================
   MOBILE
========================================= */

@media (max-width: 600px) {
  .skills-page {
    padding-bottom: 70px;
  }

  .skills-section {
    padding: 50px 0;
  }

  .skills-header {
    gap: 18px;

    margin-bottom: 35px;
  }

  .section-number {
    width: 36px;
    height: 36px;

    font-size: 11px;
  }

  .skills-header h2 {
    font-size: 28px;
  }

  .skill-name {
    font-size: 14px;
  }

  .skill-level {
    font-size: 12px;
  }

  .skill-bar {
    height: 4px;
  }

  .radar-wrapper {
    gap: 35px;
  }

  .radar-chart {
    width: 100%;
  }

  .radar-info {
    gap: 20px;
  }

  .radar-info-item span {
    font-size: 13px;
  }

  .skill-note {
    padding: 18px;

    gap: 12px;
  }

  .skill-note p {
    font-size: 12px;
  }
}
</style>
