<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from "vue";

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

import { useTheme } from "../composables/useTheme";

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
   THEME-FARBEN
   Das Canvas kennt kein CSS, deshalb lesen wir
   die Farben aus den CSS-Variablen in style.css.
========================================= */

const { theme } = useTheme();

function cssVar(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

function chartColors() {
  return {
    line: cssVar("--accent-ink"),
    fill: cssVar("--chart-fill"),
    pointBorder: cssVar("--surface"),
    grid: cssVar("--chart-grid"),
    label: cssVar("--text-muted"),
  };
}

/* Beschriftung skaliert mit der Basisschrift (TV / 4K) */

function labelFontSize(): number {
  const rootSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );

  return (rootSize || 16) * 0.75;
}

/* =========================================
   RADAR CHART
========================================= */

const radarChart = ref<HTMLCanvasElement | null>(null);

let radarChartInstance: Chart | null = null;

function createChart(animate: boolean) {
  if (!radarChart.value) {
    return;
  }

  const colors = chartColors();

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

          backgroundColor: colors.fill,
          borderColor: colors.line,

          borderWidth: 2,

          pointBackgroundColor: colors.line,
          pointBorderColor: colors.pointBorder,
          pointBorderWidth: 2,

          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: true,

      ...(animate ? {} : { animation: false as const }),

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
            color: colors.grid,
            lineWidth: 1,
          },

          angleLines: {
            color: colors.grid,
            lineWidth: 1,
          },

          pointLabels: {
            color: colors.label,

            font: {
              family: "Inter",
              size: labelFontSize(),
              weight: 500,
            },

            padding: 12,
          },
        },
      },
    },
  });
}

onMounted(() => {
  createChart(true);
});

/* Beim Wechsel Hell / Dunkel Chart mit neuen Farben neu aufbauen */

watch(theme, () => {
  radarChartInstance?.destroy();
  radarChartInstance = null;

  createChart(false);
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
